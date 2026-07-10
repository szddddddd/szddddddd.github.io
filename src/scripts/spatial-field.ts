import * as THREE from 'three';

const ROOT_SELECTOR = '[data-spatial-home]';
const CANVAS_SELECTOR = '[data-spatial-canvas]';
const PORTAL_SELECTOR = '[data-spatial-portal]';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type SpatialRoot = HTMLElement & { dataset: DOMStringMap };
type SpatialPortal = HTMLAnchorElement & { dataset: DOMStringMap };

type PortalName = 'none' | 'about' | 'projects' | 'publications' | 'notes';

const portalTargets: Record<PortalName, number> = {
  none: 0,
  about: 1,
  projects: 2,
  publications: 3,
  notes: 4,
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHoverTarget;
  uniform float uTheme;
  uniform float uIntensity;

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.82, -0.58, 0.58, 0.82);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rot * p * 2.02 + 17.3;
      amplitude *= 0.52;
    }

    return value;
  }

  float targetMask(float target) {
    return 1.0 - smoothstep(0.18, 0.55, abs(uHoverTarget - target));
  }

  float starLayer(vec2 p, float scale, float speed, float threshold) {
    vec2 grid = p * scale + vec2(0.0, uTime * speed);
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    float rnd = hash(cell);
    vec2 offset = vec2(hash(cell + 5.7), hash(cell + 19.2)) - 0.5;
    float dist = length(local - offset * 0.54);
    float star = smoothstep(0.035, 0.0, dist) * smoothstep(threshold, 1.0, rnd);
    return star * (0.35 + rnd * 0.95);
  }

  vec3 palette(float t, float lightMode) {
    vec3 cyan = mix(vec3(0.18, 0.72, 1.0), vec3(0.24, 0.48, 0.86), lightMode);
    vec3 violet = mix(vec3(0.72, 0.42, 1.0), vec3(0.56, 0.42, 0.86), lightMode);
    vec3 white = mix(vec3(0.92, 0.98, 1.0), vec3(0.44, 0.52, 0.66), lightMode);
    return mix(mix(cyan, violet, smoothstep(0.18, 0.92, t)), white, smoothstep(0.84, 1.0, t) * 0.22);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
    vec2 p = uv * 2.0 - 1.0;
    float aspect = uResolution.x / max(1.0, uResolution.y);
    p.x *= aspect;

    vec2 mouse = uMouse * 2.0 - 1.0;
    mouse.x *= aspect;
    vec2 delta = p - mouse;
    float mouseDist = length(delta);
    float mouseField = exp(-mouseDist * mouseDist * 2.35);

    float hAbout = targetMask(1.0);
    float hProjects = targetMask(2.0);
    float hPublications = targetMask(3.0);
    float hNotes = targetMask(4.0);
    float hover = clamp(hAbout + hProjects + hPublications + hNotes, 0.0, 1.0);

    vec2 warped = p;
    warped += normalize(delta + 0.0001) * mouseField * (0.028 + hover * 0.035);
    warped.x += sin(warped.y * 2.4 + uTime * 0.22) * 0.025;
    warped.y += cos(warped.x * 1.9 - uTime * 0.18) * 0.018;

    float radial = length(warped);
    float depth = 1.0 / (0.52 + radial * 1.2);
    float fieldNoise = fbm(warped * 1.45 + vec2(uTime * 0.035, -uTime * 0.026));
    float highNoise = fbm(warped * 4.2 - vec2(uTime * 0.055, uTime * 0.03));

    float contourSource = fieldNoise * 2.2 + warped.x * 0.42 - warped.y * 0.28 + sin(uTime * 0.16) * 0.12;
    float fieldLines = 1.0 - smoothstep(0.015, 0.085, abs(fract(contourSource * 8.0) - 0.5));
    fieldLines *= smoothstep(1.42, 0.12, radial) * (0.34 + 0.46 * highNoise);

    float gridX = 1.0 - smoothstep(0.0, 0.018, abs(fract((warped.x + uTime * 0.018) * 10.0) - 0.5));
    float gridY = 1.0 - smoothstep(0.0, 0.018, abs(fract((warped.y - uTime * 0.012) * 10.0) - 0.5));
    float archiveGrid = (gridX + gridY) * smoothstep(1.25, 0.05, radial) * (0.16 + hPublications * 0.38);

    float wave = sin((warped.x * 2.0 + fieldNoise * 1.7 + uTime * 0.45) * 6.0);
    float noteWave = (1.0 - smoothstep(0.02, 0.16, abs(wave))) * smoothstep(1.45, 0.18, radial) * hNotes;

    float stars = 0.0;
    stars += starLayer(warped + mouse * 0.05, 28.0, 0.018, 0.975);
    stars += starLayer(warped * 1.2 - mouse * 0.025, 48.0, -0.012, 0.985);
    stars += starLayer(warped * 1.7, 78.0, 0.008, 0.992) * (0.8 + hProjects * 1.2);

    float constellation = 0.0;
    vec2 lattice = warped * 6.0 + vec2(sin(uTime * 0.11), cos(uTime * 0.13));
    vec2 latticeCell = fract(lattice) - 0.5;
    float latticeRnd = hash(floor(lattice));
    constellation = smoothstep(0.92, 1.0, latticeRnd) * smoothstep(0.18, 0.0, length(latticeCell));
    constellation *= hProjects * (0.9 + mouseField * 1.2);

    float core = exp(-radial * radial * 1.72);
    float hoverCore = exp(-mouseDist * mouseDist * (4.2 - hover * 1.3)) * hover;
    float scan = (0.5 + 0.5 * sin((uv.y + uTime * 0.055) * 780.0)) * hPublications * 0.045;

    vec3 darkBg = mix(vec3(0.008, 0.012, 0.026), vec3(0.035, 0.025, 0.07), uv.y + fieldNoise * 0.18);
    vec3 lightBg = mix(vec3(0.955, 0.94, 0.9), vec3(0.9, 0.93, 0.97), uv.y + fieldNoise * 0.08);
    vec3 color = mix(darkBg, lightBg, uTheme);

    vec3 fieldColor = palette(fieldNoise + radial * 0.18, uTheme);
    vec3 warm = mix(vec3(1.0, 0.72, 0.33), vec3(0.78, 0.48, 0.22), uTheme);
    vec3 projectColor = mix(vec3(0.36, 0.9, 1.0), vec3(0.1, 0.45, 0.72), uTheme);
    vec3 publicationColor = mix(vec3(0.68, 0.82, 1.0), vec3(0.23, 0.34, 0.56), uTheme);
    vec3 noteColor = mix(vec3(0.78, 0.48, 1.0), vec3(0.5, 0.34, 0.74), uTheme);
    vec3 hoverColor = normalize(fieldColor + warm * hAbout + projectColor * hProjects + publicationColor * hPublications + noteColor * hNotes + 0.001);

    float lightDampen = mix(1.0, 0.58, uTheme);
    color += fieldColor * fieldLines * 0.24 * lightDampen * uIntensity;
    color += fieldColor * stars * (0.54 + hProjects * 0.28) * lightDampen;
    color += projectColor * constellation * 0.72 * lightDampen;
    color += publicationColor * archiveGrid * 0.52 * lightDampen;
    color += noteColor * noteWave * 0.28 * lightDampen;
    color += hoverColor * hoverCore * (0.32 + hAbout * 0.16) * lightDampen;
    color += palette(0.7, uTheme) * core * 0.11 * lightDampen;
    color += scan;

    float vignette = smoothstep(1.62, 0.18, radial);
    color = mix(color * mix(0.45, 0.88, uTheme), color, vignette);

    float grain = hash(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
    color += grain * mix(0.018, 0.008, uTheme);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const instances = new Map<SpatialRoot, SpatialField>();

class SpatialField {
  private readonly root: SpatialRoot;
  private readonly canvas: HTMLCanvasElement;
  private readonly portals: SpatialPortal[];
  private readonly reducedMotion: MediaQueryList;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.Camera;
  private material?: THREE.ShaderMaterial;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private mutationObserver?: MutationObserver;
  private eventController?: AbortController;
  private rafId = 0;
  private disposed = false;
  private inViewport = false;
  private documentVisible = document.visibilityState === 'visible';
  private readonly clock = new THREE.Clock(false);
  private readonly mouse = new THREE.Vector2(0.5, 0.5);
  private readonly mouseTarget = new THREE.Vector2(0.5, 0.5);
  private hoverTarget = 0;
  private hoverCurrent = 0;

  constructor(root: SpatialRoot, canvas: HTMLCanvasElement) {
    this.root = root;
    this.canvas = canvas;
    this.portals = Array.from(root.querySelectorAll<SpatialPortal>(PORTAL_SELECTOR));
    this.reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    if (this.reducedMotion.matches) {
      this.root.dataset.spatialState = 'reduced';
      return;
    }

    if (!supportsWebGL()) {
      this.root.dataset.spatialState = 'fallback';
      return;
    }

    try {
      this.setupScene();
      this.bindEvents();
      this.resize();
      this.drawFrame();
      this.syncRenderLoop();
    } catch (error) {
      console.warn('[SpatialField] Falling back to static spatial background.', error);
      this.dispose();
      this.root.dataset.spatialState = 'fallback';
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    this.eventController?.abort();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.mutationObserver?.disconnect();

    this.scene?.traverse((object) => {
      const renderable = object as THREE.Object3D & {
        geometry?: THREE.BufferGeometry;
        material?: THREE.Material | THREE.Material[];
      };
      renderable.geometry?.dispose();
      if (Array.isArray(renderable.material)) {
        renderable.material.forEach((material) => material.dispose());
      } else {
        renderable.material?.dispose();
      }
    });

    this.renderer?.dispose();
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.material = undefined;
    this.clock.stop();
  }

  private setupScene() {
    this.root.dataset.spatialState = 'booting';

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: this.mouse },
        uHoverTarget: { value: 0 },
        uTheme: { value: getThemeAmount() },
        uIntensity: { value: 1 },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(mesh);
    this.clock.start();
  }

  private bindEvents() {
    this.eventController = new AbortController();
    const { signal } = this.eventController;

    window.addEventListener('pointermove', this.handlePointerMove, { passive: true, signal });
    window.addEventListener('pointerleave', this.handlePointerLeave, { passive: true, signal });
    document.addEventListener('visibilitychange', this.handleVisibilityChange, { signal });

    this.portals.forEach((portal) => {
      portal.addEventListener('pointerenter', this.handlePortalEnter, { passive: true, signal });
      portal.addEventListener('pointerleave', this.handlePortalLeave, { passive: true, signal });
      portal.addEventListener('focus', this.handlePortalEnter, { passive: true, signal });
      portal.addEventListener('blur', this.handlePortalLeave, { passive: true, signal });
      portal.addEventListener('click', this.handlePortalClick, { signal });
    });

    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.root);
    } else {
      window.addEventListener('resize', this.resize, { passive: true, signal });
    }

    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          this.inViewport = entries.some((entry) => entry.isIntersecting);
          this.syncRenderLoop();
        },
        { rootMargin: '120px', threshold: 0.01 },
      );
      this.intersectionObserver.observe(this.root);
    } else {
      this.inViewport = true;
    }

    this.mutationObserver = new MutationObserver(this.handleThemeMutation);
    this.mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  private readonly resize = () => {
    if (!this.renderer || !this.material || this.disposed) return;

    const rect = this.root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.material.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
    this.material.uniforms.uIntensity.value = isMobile ? 0.78 : 1;

    this.drawFrame();
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);

    this.mouseTarget.set(x, y);
    this.root.style.setProperty('--spatial-pointer-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--spatial-pointer-y', `${Math.round((1 - y) * 100)}%`);
  };

  private readonly handlePointerLeave = () => {
    this.mouseTarget.set(0.5, 0.5);
    this.root.style.setProperty('--spatial-pointer-x', '50%');
    this.root.style.setProperty('--spatial-pointer-y', '48%');
  };

  private readonly handlePortalEnter = (event: Event) => {
    const portal = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    const name = normalizePortalName(portal?.dataset.portal);
    this.setHover(name);
  };

  private readonly handlePortalLeave = () => {
    this.setHover('none');
  };

  private readonly handlePortalClick = (event: Event) => {
    const portal = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    if (!portal) return;

    portal.dataset.active = 'true';
    window.setTimeout(() => {
      if (portal.isConnected) delete portal.dataset.active;
    }, 420);
  };

  private readonly handleVisibilityChange = () => {
    this.documentVisible = document.visibilityState === 'visible';
    this.syncRenderLoop();
  };

  private readonly handleThemeMutation = () => {
    if (this.material) {
      this.material.uniforms.uTheme.value = getThemeAmount();
      this.drawFrame();
    }
  };

  private setHover(name: PortalName) {
    this.hoverTarget = portalTargets[name];
    this.root.dataset.spatialHover = name;
  }

  private syncRenderLoop() {
    if (!this.renderer || this.disposed) return;

    const shouldRun = this.inViewport && this.documentVisible;
    if (shouldRun) {
      this.root.dataset.spatialState = 'running';
      if (!this.rafId) this.rafId = requestAnimationFrame(this.render);
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.root.dataset.spatialState = 'paused';
  }

  private readonly render = () => {
    this.rafId = 0;
    if (!this.renderer || this.disposed) return;

    if (!this.inViewport || !this.documentVisible) {
      this.syncRenderLoop();
      return;
    }

    this.drawFrame();
    this.rafId = requestAnimationFrame(this.render);
  };

  private drawFrame() {
    if (!this.renderer || !this.scene || !this.camera || !this.material || this.disposed) return;

    this.mouse.lerp(this.mouseTarget, 0.055);
    this.hoverCurrent = THREE.MathUtils.lerp(this.hoverCurrent, this.hoverTarget, 0.075);

    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.material.uniforms.uHoverTarget.value = this.hoverCurrent;
    this.material.uniforms.uTheme.value = getThemeAmount();

    this.renderer.render(this.scene, this.camera);
  }
}

function normalizePortalName(value: string | undefined): PortalName {
  if (value === 'about' || value === 'projects' || value === 'publications' || value === 'notes') {
    return value;
  }
  return 'none';
}

function getThemeAmount() {
  return document.documentElement.dataset.theme === 'light' ? 1 : 0;
}

function supportsWebGL() {
  if (!('WebGLRenderingContext' in window)) return false;

  const testCanvas = document.createElement('canvas');
  try {
    return Boolean(testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function initSpatialFields() {
  document.querySelectorAll<SpatialRoot>(ROOT_SELECTOR).forEach((root) => {
    if (instances.has(root)) return;

    const canvas = root.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
    if (!canvas) {
      root.dataset.spatialState = 'fallback';
      return;
    }

    instances.set(root, new SpatialField(root, canvas));
  });

  instances.forEach((instance, root) => {
    if (!root.isConnected) {
      instance.dispose();
      instances.delete(root);
    }
  });
}

function disposeAll() {
  instances.forEach((instance) => instance.dispose());
  instances.clear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpatialFields, { once: true });
} else {
  initSpatialFields();
}

document.addEventListener('astro:page-load', initSpatialFields);
document.addEventListener('astro:before-swap', disposeAll);
window.addEventListener('pagehide', disposeAll);

const reducedMotionWatcher = window.matchMedia(REDUCED_MOTION_QUERY);
const handleMotionPreferenceChange = () => {
  disposeAll();
  initSpatialFields();
};

if ('addEventListener' in reducedMotionWatcher) {
  reducedMotionWatcher.addEventListener('change', handleMotionPreferenceChange);
} else {
  reducedMotionWatcher.addListener(handleMotionPreferenceChange);
}
