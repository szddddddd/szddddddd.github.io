import * as THREE from 'three';

const ROOT_SELECTOR = '[data-spatial-home]';
const CANVAS_SELECTOR = '[data-spatial-canvas]';
const PORTAL_SELECTOR = '[data-spatial-portal]';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type SpatialRoot = HTMLElement;
type SpatialPortal = HTMLAnchorElement;
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
  uniform vec2 uPointer;
  uniform vec2 uFocus;
  uniform float uHoveredPortal;
  uniform float uTheme;
  uniform float uMotionEnabled;

  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rot * p * 2.03 + 13.7;
      amplitude *= 0.52;
    }

    return value;
  }

  float portalMask(float target) {
    return 1.0 - smoothstep(0.18, 0.54, abs(uHoveredPortal - target));
  }

  float segment(vec2 p, vec2 a, vec2 b, float width) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return 1.0 - smoothstep(width, width * 2.2, length(pa - ba * h));
  }

  float pointField(vec2 p, float scale, float threshold) {
    vec2 cell = floor(p * scale);
    vec2 local = fract(p * scale) - 0.5;
    float seed = hash21(cell);
    vec2 offset = vec2(hash21(cell + 3.1), hash21(cell + 9.7)) - 0.5;
    float dotMask = 1.0 - smoothstep(0.018, 0.05, length(local - offset * 0.54));
    return dotMask * smoothstep(threshold, 1.0, seed);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
    vec2 p = uv * 2.0 - 1.0;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    p.x *= aspect;

    float time = uTime * uMotionEnabled;
    float about = portalMask(1.0);
    float projects = portalMask(2.0);
    float publications = portalMask(3.0);
    float notes = portalMask(4.0);
    float hover = clamp(about + projects + publications + notes, 0.0, 1.0);

    vec2 pointer = uPointer * 2.0 - 1.0;
    vec2 focus = uFocus * 2.0 - 1.0;
    pointer.x *= aspect;
    focus.x *= aspect;
    vec2 focal = mix(pointer, focus, hover * 0.84);
    vec2 delta = p - focal;
    float focalDistance = length(delta);
    float focalLight = exp(-focalDistance * focalDistance * 3.2);

    vec2 warped = p;
    warped += normalize(delta + 0.0001) * focalLight * 0.026;
    warped.x += sin(warped.y * 2.6 + time * 0.2) * 0.014;
    warped.y += cos(warped.x * 2.1 - time * 0.16) * 0.011;

    float radial = length(warped);
    float field = fbm(warped * 1.7 + vec2(time * 0.025, -time * 0.018));
    float fineField = fbm(warped * 4.8 - vec2(time * 0.03, time * 0.02));

    vec2 perspective = vec2(warped.x / max(0.35, 1.1 - warped.y * 0.42), warped.y);
    float verticals = 1.0 - smoothstep(0.006, 0.018, abs(fract(perspective.x * 8.5) - 0.5));
    float horizontals = 1.0 - smoothstep(0.006, 0.018, abs(fract((perspective.y + 0.18) * 11.0) - 0.5));
    float spatialGrid = (verticals + horizontals) * smoothstep(1.55, 0.14, radial) * 0.11;

    float contourSource = field * 2.1 + warped.x * 0.52 - warped.y * 0.34;
    float contours = 1.0 - smoothstep(0.018, 0.07, abs(fract(contourSource * 8.5) - 0.5));
    contours *= smoothstep(1.42, 0.08, radial) * (0.28 + fineField * 0.26) * (0.22 + about * 0.9);

    float particles = 0.0;
    particles += pointField(warped + vec2(time * 0.005, -time * 0.004), 25.0, 0.978);
    particles += pointField(warped * 1.28 - vec2(time * 0.003, time * 0.006), 45.0, 0.988) * 0.78;
    particles *= 0.35 + projects * 0.92;

    vec2 cameraOrigin = focus + vec2(-0.24, -0.12);
    vec2 cameraTop = focus + vec2(0.25, 0.22);
    vec2 cameraBottom = focus + vec2(0.32, -0.2);
    float frustum = segment(p, cameraOrigin, cameraTop, 0.006);
    frustum += segment(p, cameraOrigin, cameraBottom, 0.006);
    frustum += segment(p, cameraTop, cameraBottom, 0.006);
    frustum += segment(p, cameraOrigin, focus + vec2(0.03, 0.01), 0.005);
    frustum *= projects * smoothstep(1.4, 0.05, focalDistance);

    float paperWindow = smoothstep(0.46, 0.08, abs(warped.x - focus.x * 0.36));
    float scanLine = 1.0 - smoothstep(0.007, 0.025, abs(fract((warped.y + time * 0.022) * 21.0) - 0.5));
    float scan = scanLine * paperWindow * publications * 0.42;
    float typeBaselines = (1.0 - smoothstep(0.005, 0.019, abs(fract((warped.y + 0.12) * 9.0) - 0.5))) * paperWindow * publications * 0.36;

    vec2 dotGrid = warped * 13.0;
    vec2 dotCell = fract(dotGrid) - 0.5;
    float noteDots = (1.0 - smoothstep(0.04, 0.1, length(dotCell))) * notes;
    float noteRipple = 1.0 - smoothstep(0.012, 0.064, abs(fract((focalDistance * 4.3 - time * 0.13) * 4.0) - 0.5));
    noteRipple *= notes * smoothstep(1.2, 0.1, focalDistance) * 0.28;

    vec3 darkBackground = mix(vec3(0.018, 0.027, 0.052), vec3(0.045, 0.025, 0.075), uv.y + field * 0.16);
    vec3 lightBackground = mix(vec3(0.94, 0.93, 0.89), vec3(0.89, 0.92, 0.94), uv.y + field * 0.08);
    vec3 color = mix(darkBackground, lightBackground, uTheme);

    vec3 cyan = mix(vec3(0.41, 0.85, 0.96), vec3(0.09, 0.42, 0.5), uTheme);
    vec3 violet = mix(vec3(0.59, 0.47, 1.0), vec3(0.38, 0.25, 0.67), uTheme);
    vec3 warm = mix(vec3(0.95, 0.75, 0.42), vec3(0.62, 0.43, 0.18), uTheme);
    vec3 paper = mix(vec3(0.72, 0.82, 1.0), vec3(0.32, 0.39, 0.58), uTheme);
    float contrast = mix(1.0, 0.64, uTheme);

    color += cyan * spatialGrid * contrast;
    color += mix(cyan, warm, about) * contours * 0.68 * contrast;
    color += cyan * particles * 0.7 * contrast;
    color += cyan * frustum * 0.86 * contrast;
    color += paper * (scan + typeBaselines) * contrast;
    color += violet * (noteDots * 0.32 + noteRipple) * contrast;
    color += mix(cyan, violet, notes) * focalLight * (0.1 + hover * 0.16) * contrast;

    float vignette = smoothstep(1.68, 0.2, radial);
    color = mix(color * mix(0.56, 0.9, uTheme), color, vignette);
    float grain = hash21(gl_FragCoord.xy + floor(time * 12.0)) - 0.5;
    color += grain * mix(0.012, 0.005, uTheme);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const instances = new Map<SpatialRoot, SpatialField>();

class SpatialField {
  private readonly root: SpatialRoot;
  private readonly canvas: HTMLCanvasElement;
  private readonly portals: SpatialPortal[];
  private readonly reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.Camera;
  private material?: THREE.ShaderMaterial;
  private mesh?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private mutationObserver?: MutationObserver;
  private eventController?: AbortController;
  private rafId = 0;
  private lastFrame = 0;
  private disposed = false;
  private inViewport = false;
  private documentVisible = document.visibilityState === 'visible';
  private readonly clock = new THREE.Clock(false);
  private readonly pointer = new THREE.Vector2(0.5, 0.48);
  private readonly pointerTarget = new THREE.Vector2(0.5, 0.48);
  private readonly focus = new THREE.Vector2(0.5, 0.48);
  private readonly focusTarget = new THREE.Vector2(0.5, 0.48);
  private hoverTarget = 0;
  private hoverCurrent = 0;

  constructor(root: SpatialRoot, canvas: HTMLCanvasElement) {
    this.root = root;
    this.canvas = canvas;
    this.portals = Array.from(root.querySelectorAll<SpatialPortal>(PORTAL_SELECTOR));

    if (!isMotionEnabled() || this.reducedMotion.matches) {
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
      this.syncRenderLoop();
    } catch {
      this.failToFallback();
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
    this.mesh?.geometry.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
    this.clock.stop();
    this.root.style.setProperty('--spatial-pointer-x', '50%');
    this.root.style.setProperty('--spatial-pointer-y', '48%');
    this.root.style.setProperty('--spatial-focus-x', '50%');
    this.root.style.setProperty('--spatial-focus-y', '48%');
  }

  private failToFallback() {
    this.dispose();
    this.root.dataset.spatialState = 'fallback';
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
    this.renderer.setClearColor(0x05070c, 1);
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: this.pointer },
        uFocus: { value: this.focus },
        uHoveredPortal: { value: 0 },
        uTheme: { value: getThemeAmount() },
        uMotionEnabled: { value: 1 },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(this.mesh);
    this.clock.start();
  }

  private bindEvents() {
    this.eventController = new AbortController();
    const { signal } = this.eventController;

    window.addEventListener('pointermove', this.handlePointerMove, { passive: true, signal });
    this.root.addEventListener('pointerleave', this.handlePointerLeave, { passive: true, signal });
    document.addEventListener('visibilitychange', this.handleVisibilityChange, { signal });
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost, { signal });

    this.portals.forEach((portal) => {
      portal.addEventListener('pointerenter', this.handlePortalEnter, { passive: true, signal });
      portal.addEventListener('pointerleave', this.handlePortalLeave, { passive: true, signal });
      portal.addEventListener('focus', this.handlePortalEnter, { passive: true, signal });
      portal.addEventListener('blur', this.handlePortalLeave, { passive: true, signal });
    });

    const ResizeObserverConstructor = (window as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    if (ResizeObserverConstructor) {
      this.resizeObserver = new ResizeObserverConstructor(this.resize);
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
    this.drawFrame();
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);
    this.pointerTarget.set(x, y);
    this.root.style.setProperty('--spatial-pointer-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--spatial-pointer-y', `${Math.round((1 - y) * 100)}%`);
  };

  private readonly handlePointerLeave = () => {
    this.pointerTarget.set(0.5, 0.48);
    this.root.style.setProperty('--spatial-pointer-x', '50%');
    this.root.style.setProperty('--spatial-pointer-y', '48%');
  };

  private readonly handlePortalEnter = (event: Event) => {
    const portal = event.currentTarget instanceof HTMLAnchorElement ? event.currentTarget : null;
    if (!portal) return;
    this.setHover(normalizePortalName(portal.dataset.portal));
    this.setFocusFromPortal(portal);
  };

  private readonly handlePortalLeave = () => {
    this.setHover('none');
    this.focusTarget.set(0.5, 0.48);
    this.root.style.setProperty('--spatial-focus-x', '50%');
    this.root.style.setProperty('--spatial-focus-y', '48%');
  };

  private readonly handleVisibilityChange = () => {
    this.documentVisible = document.visibilityState === 'visible';
    this.syncRenderLoop();
  };

  private readonly handleContextLost = (event: Event) => {
    event.preventDefault();
    this.failToFallback();
  };

  private readonly handleThemeMutation = () => {
    if (!this.material) return;
    this.material.uniforms.uTheme.value = getThemeAmount();
    this.drawFrame();
  };

  private setHover(name: PortalName) {
    this.hoverTarget = portalTargets[name];
    this.root.dataset.spatialHover = name;
  }

  private setFocusFromPortal(portal: SpatialPortal) {
    const rootRect = this.root.getBoundingClientRect();
    const portalRect = portal.getBoundingClientRect();
    if (!rootRect.width || !rootRect.height) return;

    const x = THREE.MathUtils.clamp((portalRect.left + portalRect.width / 2 - rootRect.left) / rootRect.width, 0, 1);
    const y = THREE.MathUtils.clamp(1 - (portalRect.top + portalRect.height / 2 - rootRect.top) / rootRect.height, 0, 1);
    this.focusTarget.set(x, y);
    this.root.style.setProperty('--spatial-focus-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--spatial-focus-y', `${Math.round((1 - y) * 100)}%`);
  }

  private syncRenderLoop() {
    if (!this.renderer || this.disposed) return;

    const shouldRun = this.inViewport && this.documentVisible && isMotionEnabled() && !this.reducedMotion.matches;
    if (shouldRun) {
      if (!this.clock.running) this.clock.start();
      this.root.dataset.spatialState = 'running';
      if (!this.rafId) this.rafId = requestAnimationFrame(this.render);
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.clock.stop();
    this.root.dataset.spatialState = isMotionEnabled() ? 'paused' : 'reduced';
  }

  private readonly render = (timestamp: number) => {
    this.rafId = 0;
    if (!this.renderer || this.disposed) return;

    if (!this.inViewport || !this.documentVisible || !isMotionEnabled() || this.reducedMotion.matches) {
      this.syncRenderLoop();
      return;
    }

    const frameInterval = window.innerWidth < 768 ? 1000 / 30 : 0;
    if (!frameInterval || timestamp - this.lastFrame >= frameInterval) {
      this.lastFrame = timestamp;
      this.drawFrame();
    }
    this.rafId = requestAnimationFrame(this.render);
  };

  private drawFrame() {
    if (!this.renderer || !this.scene || !this.camera || !this.material || this.disposed) return;

    this.pointer.lerp(this.pointerTarget, 0.06);
    this.focus.lerp(this.focusTarget, 0.08);
    this.hoverCurrent = THREE.MathUtils.lerp(this.hoverCurrent, this.hoverTarget, 0.085);
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.material.uniforms.uHoveredPortal.value = this.hoverCurrent;
    this.material.uniforms.uTheme.value = getThemeAmount();
    this.material.uniforms.uMotionEnabled.value = isMotionEnabled() ? 1 : 0;
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

function isMotionEnabled() {
  return document.documentElement.dataset.motion !== 'reduced';
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

function refreshSpatialFields() {
  disposeAll();
  initSpatialFields();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpatialFields, { once: true });
} else {
  initSpatialFields();
}

document.addEventListener('astro:page-load', initSpatialFields);
document.addEventListener('astro:before-swap', disposeAll);
document.addEventListener('site:motionchange', refreshSpatialFields);
window.addEventListener('pagehide', disposeAll);

const reducedMotionWatcher = window.matchMedia(REDUCED_MOTION_QUERY);
const mediaQueryChangeApi = reducedMotionWatcher as unknown as {
  addEventListener?: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};
if (mediaQueryChangeApi.addEventListener) {
  mediaQueryChangeApi.addEventListener('change', refreshSpatialFields);
} else if (mediaQueryChangeApi.addListener) {
  mediaQueryChangeApi.addListener(refreshSpatialFields);
}
