import { MagneticSystem } from '../interaction/MagneticSystem';
import { RaycastSystem } from '../interaction/RaycastSystem';
import { ScrollSystem } from '../interaction/ScrollSystem';
import { CursorController } from '../interaction/CursorController';
import { HoverManager } from '../interaction/HoverManager';
import { SpatialRouter } from '../navigation/SpatialRouter';
import { PageTransition } from '../navigation/PageTransition';
import { AboutPage } from '../rsui/pages/About/AboutPage';
import { HomePage } from '../rsui/pages/Home/HomePage';
import { NotesPage } from '../rsui/pages/Notes/NotesPage';
import { ProjectsPage } from '../rsui/pages/Projects/ProjectsPage';
import { PublicationsPage } from '../rsui/pages/Publications/PublicationsPage';
import type { SpatialPage, SpatialPageContext } from '../rsui/pages/SpatialPage';
import { ResourceManager } from '../resources/ResourceManager';
import { CameraController } from '../three/CameraController';
import { Environment } from '../three/Environment';
import { Lighting } from '../three/Lighting';
import { PostProcess } from '../three/PostProcess';
import { Renderer, type RendererQuality } from '../three/Renderer';
import { SceneGraph } from '../three/SceneGraph';
import { ShaderPipeline } from '../three/ShaderPipeline';
import { AnimationLoop } from './AnimationLoop';
import { type ClockFrame } from './Clock';
import { EventBus } from './EventBus';
import { getInitialEngineState, type EngineSnapshot, type RSUIPage, type RSUITheme } from './EngineState';
import { StateManager } from './StateManager';
import { TaskQueue } from './TaskQueue';

type EngineEvents = {
  ready: EngineSnapshot;
  statechange: EngineSnapshot;
  projecthover: { slug?: string };
  projectselect: { slug?: string };
};

type InspectorElements = {
  root: HTMLElement;
  title: HTMLElement;
  body: HTMLElement;
  links: HTMLElement;
};

export class RSUIEngine {
  readonly events = new EventBus<EngineEvents>();
  readonly resources = new ResourceManager();

  private readonly state = new StateManager(getInitialEngineState());
  private readonly loop = new AnimationLoop();
  private readonly tasks = new TaskQueue();
  private readonly transition = new PageTransition();
  private readonly shaderPipeline: ShaderPipeline;
  private readonly renderer: Renderer;
  private readonly sceneGraph: SceneGraph;
  private readonly camera: CameraController;
  private readonly environment: Environment;
  private readonly lighting: Lighting;
  private readonly postProcess: PostProcess;
  private readonly cursor = new CursorController();
  private readonly hover = new HoverManager();
  private readonly magnetic: MagneticSystem;
  private readonly raycast: RaycastSystem;
  private readonly scroll: ScrollSystem;
  private readonly pages: Record<RSUIPage, SpatialPage> = {
    home: new HomePage(),
    about: new AboutPage(),
    projects: new ProjectsPage(),
    publications: new PublicationsPage(),
    notes: new NotesPage(),
  };
  private readonly abortController = new AbortController();
  private themeObserver?: MutationObserver;
  private readonly pageContext: SpatialPageContext;
  private readonly inspector?: InspectorElements;
  private router?: SpatialRouter;
  private magneticUnbind?: () => void;
  private activePage: RSUIPage;
  private domHoveredProject?: string;
  private raycastHoveredProject?: string;
  private destroyed = false;

  constructor(private readonly host: HTMLElement) {
    const initial = this.state.snapshot;
    const quality = getRendererQuality();
    this.shaderPipeline = new ShaderPipeline(quality);
    this.renderer = new Renderer(host, quality);
    this.sceneGraph = new SceneGraph(this.shaderPipeline, quality);
    this.camera = new CameraController(this.sceneGraph.getFocus(initial.page));
    this.environment = new Environment(this.sceneGraph.scene);
    this.lighting = new Lighting(this.sceneGraph.scene);
    this.postProcess = new PostProcess(
      this.renderer.instance,
      this.sceneGraph.scene,
      this.camera.camera,
      quality === 'full',
    );
    this.magnetic = new MagneticSystem({ reducedMotion: !initial.motionEnabled, strength: 5 });
    this.raycast = new RaycastSystem(this.camera.camera, { objects: this.sceneGraph.getInteractiveObjects() });
    this.scroll = new ScrollSystem({ onScroll: this.onScroll });
    this.activePage = initial.page;
    this.inspector = getInspectorElements();
    this.pageContext = {
      setRegion: (page) => this.setRegion(page),
      setProjectHover: (slug) => this.setProjectHover(slug),
      setProjectSelection: (slug) => this.selectProject(slug),
    };
  }

  start(): void {
    if (this.destroyed) return;

    this.host.dataset.rsuiEngine = 'ready';
    document.body.dataset.rsuiEngine = 'ready';
    this.shaderPipeline.setTheme(this.state.snapshot.theme);
    this.shaderPipeline.setPage(this.activePage);
    this.sceneGraph.setActivePage(this.activePage, true);
    this.environment.setTheme(this.state.snapshot.theme);
    this.pages[this.activePage].enter(this.pageContext);
    this.bindEvents();
    this.resize();
    this.loop.add(this.update);
    this.router = new SpatialRouter(this);
    this.router.start();
    this.refreshDom(this.activePage);
    this.renderStatic();
    if (this.state.snapshot.motionEnabled) this.loop.start();
    this.events.emit('ready', this.state.snapshot);
  }

  navigate(page: RSUIPage, route: string): Promise<void> {
    return this.tasks.enqueue(async () => {
      if (this.destroyed) return;
      const previousPage = this.activePage;
      const previousSnapshot = this.state.snapshot;
      const hasChanged = previousPage !== page || previousSnapshot.route !== route;

      if (hasChanged) {
        this.pages[previousPage].leave(this.pageContext);
        this.hideInspector();
        const snapshot = this.state.setPage(page, route);
        this.activePage = page;
        this.sceneGraph.setActivePage(page);
        this.camera.setFocus(this.sceneGraph.getFocus(page), !snapshot.motionEnabled);
        this.shaderPipeline.setPage(page);
        this.pages[page].enter(this.pageContext);
        this.refreshDom(page);
        this.events.emit('statechange', snapshot);
      }

      const animated = this.state.snapshot.motionEnabled && hasChanged;
      const completion = this.transition.begin(animated);
      this.state.setTransitionProgress(animated ? 0 : 1);
      if (!this.state.snapshot.motionEnabled) this.renderStatic();
      await completion;
    });
  }

  refreshDom(page: RSUIPage): void {
    if (this.destroyed) return;
    this.activePage = page;
    this.pages[page].onDomChange?.(this.pageContext);
    this.magneticUnbind?.();
    this.magneticUnbind = this.magnetic.bind('[data-rsui-magnetic]');
    this.announceCurrentRoute();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.router?.destroy();
    this.abortController.abort();
    this.themeObserver?.disconnect();
    this.loop.destroy();
    this.scroll.destroy();
    this.cursor.destroy();
    this.hover.destroy();
    this.magneticUnbind?.();
    this.magnetic.destroy();
    this.raycast.destroy();
    Object.values(this.pages).forEach((page) => page.destroy());
    this.postProcess.dispose();
    this.lighting.dispose();
    this.sceneGraph.dispose();
    this.renderer.dispose();
    this.resources.dispose();
    this.events.clear();
  }

  private bindEvents(): void {
    const { signal } = this.abortController;
    window.addEventListener('resize', this.resize, { passive: true, signal });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true, signal });
    window.addEventListener('pointerdown', this.onPointerDown, { passive: true, signal });
    document.addEventListener('site:motionchange', this.onMotionChange as EventListener, { signal });
    document.addEventListener('rsui:dom-swapped', this.onDomSwapped as EventListener, { signal });
    this.themeObserver = new MutationObserver(this.onThemeMutation);
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    this.hover.bind('[data-rsui-project]', {
      onEnter: ({ element }) => this.setDomProjectHover(element.dataset.rsuiProject),
      onLeave: () => this.setDomProjectHover(undefined),
    });
    this.hover.bind('[data-rsui-portal]', {
      onEnter: ({ element }) => document.body.dataset.rsuiPortal = element.dataset.portal ?? '',
      onLeave: () => delete document.body.dataset.rsuiPortal,
    });
  }

  private readonly update = (frame: ClockFrame): void => {
    const cursor = this.cursor.update(frame.delta);
    if (cursor.visible) this.raycast.setPointer(cursor.ndcX, cursor.ndcY);
    else this.raycast.clearPointer();
    const hit = this.raycast.pick()[0]?.object;
    this.raycastHoveredProject = this.activePage === 'projects' ? this.sceneGraph.getProjectSlug(hit) : undefined;
    this.applyProjectHover();

    const transitionProgress = this.transition.update(frame.delta);
    this.state.setTransitionProgress(transitionProgress);
    this.camera.update(frame.delta, this.state.snapshot.motionEnabled);
    this.shaderPipeline.update(frame.elapsed, this.camera.velocity.length());
    this.shaderPipeline.setTransition(transitionProgress);
    this.sceneGraph.update(frame, this.camera.camera, this.state.snapshot.motionEnabled);
    this.pages[this.activePage].update(this.pageContext, frame);
    this.postProcess.sync(this.shaderPipeline.uniforms);
    this.postProcess.render(this.renderer.instance, this.sceneGraph.scene, this.camera.camera);
  };

  private readonly resize = (): void => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    this.renderer.resize(width, height);
    this.camera.resize(width, height);
    this.shaderPipeline.setResolution(width, height, this.renderer.pixelRatio);
    this.sceneGraph.resize(this.camera.camera);
    this.postProcess.resize(width, height, this.renderer.pixelRatio);
    if (!this.state.snapshot.motionEnabled) this.renderStatic();
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.camera.setPointer(event.clientX, event.clientY);
    this.shaderPipeline.setPointer(event.clientX, event.clientY);
  };

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (this.activePage !== 'projects' || isInteractiveDomTarget(event.target)) return;
    const slug = this.sceneGraph.getProjectSlug(this.raycast.pick()[0]?.object);
    if (slug) this.selectProject(slug);
  };

  private readonly onScroll = ({ normalized }: { normalized: number }): void => {
    this.state.setScroll(normalized);
    this.camera.setScroll(normalized);
    this.shaderPipeline.setScroll(normalized);
  };

  private readonly onMotionChange = (event: CustomEvent<{ enabled?: boolean }>): void => {
    const enabled = event.detail?.enabled ?? document.documentElement.dataset.motion !== 'reduced';
    this.state.setMotionEnabled(enabled);
    this.magnetic.setReducedMotion(!enabled);
    if (enabled) {
      this.loop.start();
    } else {
      this.loop.stop();
      this.renderStatic();
    }
  };

  private readonly onDomSwapped = (): void => {
    const page = document.querySelector<HTMLElement>('[data-rsui-page]')?.dataset.rsuiPage;
    if (page === this.activePage) this.refreshDom(this.activePage);
  };

  private readonly onThemeMutation = (): void => {
    const theme: RSUITheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    this.state.setTheme(theme);
    this.shaderPipeline.setTheme(theme);
    this.environment.setTheme(theme);
    if (!this.state.snapshot.motionEnabled) this.renderStatic();
  };

  private setRegion(page: RSUIPage): void {
    document.body.dataset.rsuiRegion = page;
  }

  private setDomProjectHover(slug: string | undefined): void {
    this.domHoveredProject = slug;
    this.applyProjectHover();
  }

  private setProjectHover(slug: string | undefined): void {
    this.domHoveredProject = slug;
    this.applyProjectHover();
  }

  private applyProjectHover(): void {
    const slug = this.domHoveredProject ?? this.raycastHoveredProject;
    this.sceneGraph.setHoveredProject(slug);
    document.body.dataset.rsuiHoveredProject = slug ?? '';
    this.events.emit('projecthover', { slug });
  }

  private selectProject(slug: string | undefined): void {
    this.sceneGraph.setSelectedProject(slug);
    this.events.emit('projectselect', { slug });
    if (!slug) {
      this.hideInspector();
      return;
    }

    const focus = this.sceneGraph.getProjectFocus(slug);
    if (focus) this.camera.setFocus(focus, !this.state.snapshot.motionEnabled);
    this.showInspector(slug);
  }

  private showInspector(slug: string): void {
    const inspector = this.inspector;
    if (!inspector) return;
    const source = document.querySelector<HTMLElement>(`[data-rsui-project="${slug}"]`);
    if (!source) return;

    const title = source.querySelector('h2')?.textContent?.trim() ?? slug;
    const description = source.querySelector<HTMLElement>('.project-row-description')?.textContent?.trim() ?? '';
    inspector.title.textContent = title;
    inspector.body.textContent = description;
    inspector.links.replaceChildren();
    source.querySelectorAll<HTMLAnchorElement>('.project-row-links a').forEach((link) => {
      const action = document.createElement('a');
      action.href = link.href;
      action.target = link.target;
      action.rel = link.rel;
      action.textContent = link.textContent?.trim() ?? 'Open';
      inspector.links.append(action);
    });
    inspector.root.hidden = false;
  }

  private hideInspector(): void {
    if (this.inspector) this.inspector.root.hidden = true;
  }

  private announceCurrentRoute(): void {
    const status = document.querySelector<HTMLElement>('[data-rsui-route-status]');
    const title = document.querySelector('main h1')?.textContent?.trim();
    if (status && title) status.textContent = `${title} loaded`;
  }

  private renderStatic(): void {
    const frame: ClockFrame = { now: performance.now(), delta: 0, elapsed: 0 };
    this.camera.update(0, false);
    this.shaderPipeline.setTransition(this.transition.progress);
    this.sceneGraph.update(frame, this.camera.camera, false);
    this.postProcess.sync(this.shaderPipeline.uniforms);
    this.postProcess.render(this.renderer.instance, this.sceneGraph.scene, this.camera.camera);
  }
}

function getRendererQuality(): RendererQuality {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return window.innerWidth < 768 || (memory !== undefined && memory <= 4) ? 'reduced' : 'full';
}

function getInspectorElements(): InspectorElements | undefined {
  const root = document.querySelector<HTMLElement>('[data-rsui-project-inspector]');
  const title = document.querySelector<HTMLElement>('[data-rsui-project-inspector-title]');
  const body = document.querySelector<HTMLElement>('[data-rsui-project-inspector-body]');
  const links = document.querySelector<HTMLElement>('[data-rsui-project-inspector-links]');
  return root && title && body && links ? { root, title, body, links } : undefined;
}

function isInteractiveDomTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, summary, label'));
}
