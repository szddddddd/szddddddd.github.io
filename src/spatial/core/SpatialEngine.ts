import type { RouteId } from '../../config/routes';
import { routeStates, type ProjectCategorySceneId } from '../config/routeStates';
import { SpatialRenderer } from '../rendering/SpatialRenderer';
import { ViewportInput } from '../interaction/ViewportInput';
import { ResourceManager } from '../resources/ResourceManager';
import { RouteTransition } from '../routing/RouteTransition';
import { SpatialRouteController, type SpatialRouteTarget } from '../routing/SpatialRouteController';
import { SpatialScene } from '../scenes/SpatialScene';
import { AnimationLoop, type Frame } from './AnimationLoop';
import { EventBus, type SpatialEventMap, type SpatialQuality, type SpatialTheme } from './EventBus';
import { StateManager } from './StateManager';

export class SpatialEngine implements SpatialRouteTarget {
  readonly events = new EventBus<SpatialEventMap>();
  readonly resources = new ResourceManager();

  private readonly state: StateManager;
  private readonly loop: AnimationLoop;
  private readonly renderer: SpatialRenderer;
  private readonly scene: SpatialScene;
  private readonly transition = new RouteTransition();
  private readonly routeController = new SpatialRouteController(this);
  private readonly abortController = new AbortController();
  private readonly input: ViewportInput;
  private readonly themeObserver: MutationObserver;
  private contextLost = false;
  private projectCategory: ProjectCategorySceneId = 'all';
  private started = false;
  private destroyed = false;

  constructor(private readonly host: HTMLElement, initialRoute: RouteId) {
    const theme = getTheme();
    const motionEnabled = getMotionEnabled();
    const quality = getQuality();
    this.state = new StateManager({
      currentRoute: initialRoute,
      targetRoute: initialRoute,
      theme,
      motionEnabled,
      quality,
    });
    this.loop = new AnimationLoop((hidden) => {
      this.events.emit('DOCUMENT_VISIBILITY_CHANGE', { hidden });
    });
    this.renderer = new SpatialRenderer(host, quality, {
      onContextLost: this.handleContextLost,
      onContextRestored: this.handleContextRestored,
    });
    this.scene = new SpatialScene(this.resources);
    this.scene.setQuality(quality);
    this.scene.applyRoute(routeStates[initialRoute]);
    this.scene.setTheme(theme);
    this.input = new ViewportInput({
      onResize: this.resize,
      onScroll: this.handleScroll,
      onPointerMove: this.handlePointerMove,
    });
    this.themeObserver = new MutationObserver(this.handleThemeMutation);
  }

  start(): void {
    if (this.started || this.destroyed) return;
    this.started = true;
    this.host.dataset.spatialEngine = 'ready';
    document.documentElement.dataset.spatialWebgl = 'ready';
    document.body.dataset.spatialRoute = this.state.snapshot.currentRoute;
    this.bindEvents();
    this.loop.add(this.update);
    this.resize();
    this.routeController.start();
    this.loop.setContinuous(this.state.snapshot.motionEnabled);
    this.loop.invalidate();
  }

  requestRoute(route: RouteId): void {
    if (this.destroyed) return;
    const current = this.state.snapshot.currentRoute;
    const target = this.state.snapshot.targetRoute;
    if (route === target) return;

    this.transition.stop();
    if (route !== 'projects') this.clearProjectCategory();
    if (current !== route) this.events.emit('ROUTE_LEAVE', { route: current });
    this.events.emit('ROUTE_PREPARE', { from: current, to: route });
    this.state.setTargetRoute(route);
    document.body.dataset.spatialTargetRoute = route;
    this.transition.begin(this.scene, route, this.state.snapshot.motionEnabled, () => this.finishRoute(route));
    this.loop.setContinuous(this.state.snapshot.motionEnabled);
    this.loop.invalidate();
  }

  previewRoute(route: RouteId): void {
    if (route === this.state.snapshot.currentRoute || this.state.snapshot.targetRoute !== this.state.snapshot.currentRoute) return;
    this.state.setPreviewRoute(route);
    document.documentElement.dataset.spatialPreview = route;
    this.events.emit('NAV_PREVIEW', { route });
    this.transition.previewRoute(this.scene, this.state.snapshot.currentRoute, route, this.state.snapshot.motionEnabled);
    this.loop.invalidate();
  }

  clearPreview(): void {
    const route = this.state.snapshot.previewRoute;
    if (!route) return;
    this.state.setPreviewRoute(undefined);
    delete document.documentElement.dataset.spatialPreview;
    this.events.emit('NAV_PREVIEW_END', { route });
    if (this.state.snapshot.currentRoute === 'projects') {
      this.transition.previewProjectCategory(this.scene, this.projectCategory, this.state.snapshot.motionEnabled);
    } else {
      this.transition.clearPreview(this.scene, this.state.snapshot.currentRoute, this.state.snapshot.motionEnabled);
    }
    this.loop.invalidate();
  }

  previewProjectCategory(category: ProjectCategorySceneId): void {
    if (this.destroyed || this.state.snapshot.currentRoute !== 'projects' || this.state.snapshot.targetRoute !== 'projects') return;
    this.projectCategory = category;
    if (category === 'all') {
      delete document.documentElement.dataset.spatialProjectFilter;
    } else {
      document.documentElement.dataset.spatialProjectFilter = category;
    }
    this.transition.previewProjectCategory(this.scene, category, this.state.snapshot.motionEnabled);
    this.loop.invalidate();
  }

  clearProjectCategory(): void {
    if (this.projectCategory === 'all') return;
    this.projectCategory = 'all';
    delete document.documentElement.dataset.spatialProjectFilter;
    if (this.state.snapshot.currentRoute === 'projects' && this.state.snapshot.targetRoute === 'projects') {
      this.transition.previewProjectCategory(this.scene, 'all', this.state.snapshot.motionEnabled);
      this.loop.invalidate();
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.routeController.destroy();
    this.abortController.abort();
    this.input.destroy();
    this.themeObserver.disconnect();
    this.transition.stop();
    this.loop.destroy();
    this.scene.dispose();
    this.renderer.dispose();
    this.resources.dispose();
    this.events.clear();
  }

  private bindEvents(): void {
    const { signal } = this.abortController;
    document.addEventListener('site:motionchange', this.handleMotionChange as EventListener, { signal });
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    this.input.start();
  }

  private readonly update = (frame: Frame): void => {
    if (this.contextLost) return;
    this.transition.update(frame.now);
    this.scene.update(frame);
    this.renderer.instance.render(this.scene.scene, this.scene.camera.camera);
  };

  private readonly resize = (): void => {
    if (this.destroyed) return;
    const quality = getQuality();
    if (quality !== this.state.snapshot.quality) {
      this.state.setQuality(quality);
      this.renderer.setQuality(quality);
      this.scene.setQuality(quality);
      this.events.emit('QUALITY_CHANGE', { quality });
    }

    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    this.renderer.resize(width, height);
    this.scene.resize(width, height, this.renderer.pixelRatio);
    this.events.emit('VIEWPORT_RESIZE', { width, height, pixelRatio: this.renderer.pixelRatio });
    this.loop.invalidate();
  };

  private readonly handlePointerMove = (clientX: number, clientY: number): void => {
    this.scene.setPointer(clientX, clientY);
    if (!this.state.snapshot.motionEnabled) this.loop.invalidate();
  };

  private readonly handleScroll = (scroll: number): void => {
    this.scene.setScroll(scroll);
    if (!this.state.snapshot.motionEnabled) this.loop.invalidate();
  };

  private readonly handleThemeMutation = (): void => {
    const theme = getTheme();
    if (theme === this.state.snapshot.theme) return;
    this.state.setTheme(theme);
    this.scene.setTheme(theme);
    this.events.emit('THEME_CHANGE', { theme });
    this.loop.invalidate();
  };

  private readonly handleMotionChange = (event: CustomEvent<{ enabled?: boolean }>): void => {
    const enabled = event.detail?.enabled ?? getMotionEnabled();
    if (enabled === this.state.snapshot.motionEnabled) return;

    this.state.setMotionEnabled(enabled);
    this.events.emit('MOTION_CHANGE', { enabled });
    if (!enabled && this.state.snapshot.targetRoute !== this.state.snapshot.currentRoute) {
      const route = this.state.snapshot.targetRoute;
      this.transition.stop();
      this.scene.applyRoute(routeStates[route]);
      this.finishRoute(route);
    }
    this.loop.setContinuous(enabled && !this.contextLost);
    this.loop.invalidate();
  };

  private readonly handleContextLost = (): void => {
    if (this.destroyed) return;
    this.contextLost = true;
    this.host.dataset.spatialEngine = 'fallback';
    document.documentElement.dataset.spatialWebgl = 'unavailable';
    this.loop.setContinuous(false);
    this.events.emit('WEBGL_CONTEXT_LOST', undefined);
  };

  private readonly handleContextRestored = (): void => {
    if (this.destroyed) return;
    this.contextLost = false;
    this.host.dataset.spatialEngine = 'ready';
    document.documentElement.dataset.spatialWebgl = 'ready';
    this.events.emit('WEBGL_CONTEXT_RESTORED', undefined);
    this.loop.setContinuous(this.state.snapshot.motionEnabled);
    this.loop.invalidate();
  };

  private finishRoute(route: RouteId): void {
    if (this.destroyed || this.state.snapshot.targetRoute !== route) return;
    this.state.commitRoute(route);
    document.body.dataset.spatialRoute = route;
    delete document.body.dataset.spatialTargetRoute;
    this.events.emit('ROUTE_ENTER', { route });
    this.loop.invalidate();
  }
}

function getTheme(): SpatialTheme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getMotionEnabled(): boolean {
  return document.documentElement.dataset.motion !== 'reduced';
}

function getQuality(): SpatialQuality {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return window.innerWidth < 768 || (memory !== undefined && memory <= 4) ? 'reduced' : 'full';
}
