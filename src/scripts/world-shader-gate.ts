import * as THREE from 'three';

const ROOT_SELECTOR = '[data-world-shader-gate]';
const CANVAS_SELECTOR = '[data-world-shader-canvas]';
const ENTER_SELECTOR = '[data-world-gate-enter]';
const REPLAY_SELECTOR = '[data-replay-intro]';
const SESSION_KEY = 'szdShaderEntered';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

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
  uniform float uTheme;

  varying vec2 vUv;

  #define PI 3.14159265359
  #define TAU 6.28318530718

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
    float v = 0.0;
    float a = 0.52;
    mat2 r = mat2(0.82, -0.57, 0.57, 0.82);

    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = r * p * 2.03 + 17.13;
      a *= 0.5;
    }

    return v;
  }

  mat2 rotate2d(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  float rectMask(vec2 p, vec2 c, vec2 b) {
    vec2 d = abs(p - c) - b;
    float edge = max(d.x, d.y);
    return 1.0 - smoothstep(-0.004, 0.006, edge);
  }

  float ellipseMask(vec2 p, vec2 c, vec2 r) {
    vec2 q = (p - c) / r;
    float d = dot(q, q);
    return 1.0 - smoothstep(0.96, 1.02, d);
  }

  float triangleMask(vec2 p, vec2 c, float w, float h) {
    float y = (p.y - c.y) / h;
    float halfWidth = w * (1.0 - clamp(y, 0.0, 1.0));
    float side = 1.0 - smoothstep(-0.004, 0.008, abs(p.x - c.x) - halfWidth);
    float bottom = smoothstep(-0.02, 0.01, y);
    float top = 1.0 - smoothstep(0.985, 1.02, y);
    return side * bottom * top;
  }

  float castleMask(vec2 p) {
    float m = 0.0;

    m = max(m, ellipseMask(p, vec2(0.0, -0.58), vec2(0.57, 0.16)));
    m = max(m, ellipseMask(p, vec2(-0.14, -0.65), vec2(0.38, 0.08)));
    m = max(m, ellipseMask(p, vec2(0.22, -0.65), vec2(0.31, 0.07)));

    m = max(m, rectMask(p, vec2(0.0, -0.18), vec2(0.22, 0.34)));
    m = max(m, rectMask(p, vec2(-0.34, -0.22), vec2(0.095, 0.42)));
    m = max(m, rectMask(p, vec2(0.34, -0.22), vec2(0.095, 0.42)));
    m = max(m, rectMask(p, vec2(-0.17, -0.08), vec2(0.075, 0.28)));
    m = max(m, rectMask(p, vec2(0.17, -0.08), vec2(0.075, 0.28)));

    m = max(m, triangleMask(p, vec2(0.0, 0.16), 0.22, 0.30));
    m = max(m, triangleMask(p, vec2(-0.34, 0.20), 0.12, 0.28));
    m = max(m, triangleMask(p, vec2(0.34, 0.20), 0.12, 0.28));
    m = max(m, triangleMask(p, vec2(-0.17, 0.18), 0.09, 0.23));
    m = max(m, triangleMask(p, vec2(0.17, 0.18), 0.09, 0.23));

    for (int i = 0; i < 7; i++) {
      float x = -0.18 + float(i) * 0.06;
      m = max(m, rectMask(p, vec2(x, 0.18), vec2(0.018, 0.055)));
    }

    for (int i = 0; i < 3; i++) {
      float x = -0.38 + float(i) * 0.04;
      m = max(m, rectMask(p, vec2(x, 0.23), vec2(0.014, 0.045)));
      m = max(m, rectMask(p, vec2(-x, 0.23), vec2(0.014, 0.045)));
    }

    return clamp(m, 0.0, 1.0);
  }

  float windowMask(vec2 p) {
    float w = 0.0;
    w = max(w, rectMask(p, vec2(-0.065, -0.06), vec2(0.014, 0.055)));
    w = max(w, rectMask(p, vec2(0.065, -0.06), vec2(0.014, 0.055)));
    w = max(w, rectMask(p, vec2(0.0, -0.25), vec2(0.018, 0.07)));
    w = max(w, rectMask(p, vec2(-0.34, -0.16), vec2(0.013, 0.052)));
    w = max(w, rectMask(p, vec2(0.34, -0.16), vec2(0.013, 0.052)));
    w = max(w, rectMask(p, vec2(-0.17, -0.02), vec2(0.01, 0.042)));
    w = max(w, rectMask(p, vec2(0.17, -0.02), vec2(0.01, 0.042)));
    return w;
  }

  float starField(vec2 uv, float time) {
    vec2 grid = uv * vec2(150.0, 95.0);
    vec2 cell = floor(grid);
    vec2 f = fract(grid) - 0.5;
    float rnd = hash(cell);
    float star = smoothstep(0.995, 1.0, rnd);
    float core = exp(-dot(f, f) * 46.0);
    float twinkle = 0.68 + 0.32 * sin(time * (0.5 + rnd * 1.6) + rnd * TAU);
    return star * core * twinkle;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / max(uResolution.y, 1.0);
    vec2 screen = gl_FragCoord.xy / max(uResolution.xy, vec2(1.0));
    float theme = clamp(uTheme, 0.0, 1.0);
    float time = uTime;

    vec2 pointer = uPointer * vec2(0.09, 0.06);
    vec2 driftUv = uv + pointer;
    float atmosphere = fbm(driftUv * 1.55 + vec2(time * 0.018, -time * 0.014));
    float fineNoise = fbm(driftUv * 7.8 + vec2(-time * 0.055, time * 0.034));

    vec3 darkBg = mix(vec3(0.015, 0.014, 0.012), vec3(0.09, 0.075, 0.055), smoothstep(-0.7, 0.85, uv.y));
    vec3 lightBg = mix(vec3(0.86, 0.80, 0.70), vec3(0.98, 0.94, 0.86), smoothstep(-0.8, 0.9, uv.y));
    vec3 color = mix(darkBg, lightBg, theme);

    float radial = 1.0 - smoothstep(0.0, 1.23, length(uv * vec2(0.92, 1.16)));
    vec3 warmGlow = mix(vec3(0.78, 0.58, 0.30), vec3(0.48, 0.31, 0.12), theme);
    vec3 blueGlow = mix(vec3(0.20, 0.42, 0.78), vec3(0.22, 0.34, 0.58), theme);
    color += warmGlow * radial * (0.20 + 0.08 * sin(time * 0.58));
    color += blueGlow * exp(-length((uv - vec2(0.28, 0.02)) * vec2(1.5, 2.4)) * 2.2) * 0.20;

    float horizon = smoothstep(-0.72, -0.08, uv.y) * (1.0 - smoothstep(-0.08, 0.55, uv.y));
    color += mix(vec3(0.38, 0.29, 0.18), vec3(0.72, 0.58, 0.36), theme) * horizon * (0.11 + atmosphere * 0.17);
    color += mix(vec3(0.55, 0.46, 0.32), vec3(0.35, 0.27, 0.18), theme) * fineNoise * 0.035;

    vec2 p = uv;
    p.y += 0.10;
    p -= vec2(pointer.x * 0.32, pointer.y * 0.14);
    p = rotate2d(0.018 * sin(time * 0.28) + pointer.x * 0.035) * p;
    p *= 1.0 + 0.018 * sin(time * 0.42);

    float castle = castleMask(p);
    float halo = 0.0;
    for (int i = 0; i < 14; i++) {
      float a = float(i) / 14.0 * TAU;
      vec2 o = vec2(cos(a), sin(a)) * (0.018 + 0.012 * sin(time * 0.3));
      halo += castleMask(p + o);
    }
    halo = max(halo / 14.0 - castle, 0.0);

    float windows = windowMask(p) * castle;
    vec3 silhouette = mix(vec3(0.013, 0.012, 0.010), vec3(0.25, 0.20, 0.15), theme);
    color = mix(color, silhouette, castle * 0.96);
    color += mix(vec3(0.92, 0.68, 0.34), vec3(0.64, 0.40, 0.17), theme) * halo * 1.65;
    color += mix(vec3(1.0, 0.82, 0.44), vec3(0.70, 0.42, 0.14), theme) * windows * (0.64 + 0.18 * sin(time * 1.7));

    float ring = abs(length((uv - pointer * 0.25) * vec2(1.0, 1.28)) - (0.54 + 0.01 * sin(time * 0.5)));
    color += mix(vec3(0.62, 0.50, 0.32), vec3(0.35, 0.27, 0.18), theme) * (1.0 - smoothstep(0.0, 0.011, ring)) * 0.24;

    color += starField(uv + vec2(0.0, time * 0.006), time) * mix(vec3(0.80, 0.88, 1.0), vec3(0.35, 0.30, 0.22), theme) * (1.0 - smoothstep(-0.05, 0.48, uv.y));

    float scanline = sin((screen.y + time * 0.018) * uResolution.y * 1.15);
    color += scanline * mix(0.012, 0.006, theme);
    color *= 0.90 + radial * 0.16;
    color = mix(color, color * color * (3.0 - 2.0 * color), 0.18);

    float vignette = smoothstep(1.08, 0.26, length(uv * vec2(0.86, 1.12)));
    color = mix(color * 0.42, color, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

type ShaderRoot = HTMLElement & { dataset: DOMStringMap };

class WorldShaderGate {
  private readonly root: ShaderRoot;
  private readonly canvas: HTMLCanvasElement;
  private readonly enterButton: HTMLButtonElement | null;
  private readonly reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.Camera;
  private material?: THREE.ShaderMaterial;
  private resizeObserver?: ResizeObserver;
  private themeObserver?: MutationObserver;
  private rafId = 0;
  private active = false;
  private rendererReady = false;
  private documentVisible = document.visibilityState === 'visible';
  private readonly clock = new THREE.Clock(false);
  private readonly pointer = new THREE.Vector2(0, 0);
  private readonly pointerTarget = new THREE.Vector2(0, 0);

  constructor(root: ShaderRoot) {
    const canvas = root.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
    if (!canvas) throw new Error('World shader gate canvas is missing.');

    this.root = root;
    this.canvas = canvas;
    this.enterButton = root.querySelector<HTMLButtonElement>(ENTER_SELECTOR);

    this.bindEvents();

    if (this.hasEnteredThisSession()) {
      this.markEntered();
    } else {
      this.activate();
    }
  }

  activate() {
    this.active = true;
    document.documentElement.classList.remove('world-gate-session-entered', 'world-gate-entered', 'world-gate-pending');
    document.documentElement.classList.add('world-gate-active');
    this.root.dataset.worldShaderState = this.reducedMotion.matches ? 'reduced' : 'active';

    if (!this.reducedMotion.matches) {
      this.ensureRenderer();
    }

    window.setTimeout(() => this.enterButton?.focus({ preventScroll: true }), 80);
    this.syncRenderLoop();
  }

  enter() {
    if (!this.active) return;
    this.active = false;
    this.setEnteredThisSession();
    this.root.dataset.worldShaderState = 'exiting';
    document.documentElement.classList.remove('world-gate-active', 'world-gate-pending');
    document.documentElement.classList.add('world-gate-entered', 'world-gate-session-entered');
    this.syncRenderLoop();

    window.setTimeout(() => {
      if (this.root.dataset.worldShaderState === 'exiting') {
        this.root.dataset.worldShaderState = 'entered';
      }
    }, 720);
  }

  private bindEvents() {
    this.root.addEventListener('click', this.handleRootClick);
    this.root.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.root.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
    this.enterButton?.addEventListener('click', this.handleEnterButtonClick);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('szd:theme-change', this.handleThemeChange as EventListener);
    window.addEventListener('szd:replay-world-gate', this.handleReplay as EventListener);

    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.root);
    } else {
      window.addEventListener('resize', this.resize, { passive: true });
    }

    if ('MutationObserver' in window) {
      this.themeObserver = new MutationObserver(this.syncTheme);
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }

  private ensureRenderer() {
    if (this.rendererReady || this.reducedMotion.matches) return;

    if (!supportsWebGL()) {
      this.root.dataset.worldShaderState = 'fallback';
      return;
    }

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: false,
        alpha: false,
        depth: false,
        powerPreference: 'high-performance',
      });
      this.renderer.setClearColor(0x050505, 1);

      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: this.pointer },
          uTheme: { value: getThemeUniform() },
        },
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
      this.scene.add(mesh);
      this.rendererReady = true;
      this.clock.start();
      this.resize();
    } catch (error) {
      console.warn('[WorldShaderGate] Falling back to static entrance.', error);
      this.disposeRenderer();
      this.root.dataset.worldShaderState = 'fallback';
    }
  }

  private readonly resize = () => {
    if (!this.renderer || !this.material) return;

    const rect = this.root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width || window.innerWidth));
    const height = Math.max(1, Math.round(rect.height || window.innerHeight));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.material.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
    this.drawFrame();
  };

  private readonly handleRootClick = () => {
    this.enter();
  };

  private readonly handleEnterButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.enter();
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.pointerTarget.set((x - 0.5) * 2, -(y - 0.5) * 2);
    this.root.style.setProperty('--gate-pointer-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--gate-pointer-y', `${Math.round(y * 100)}%`);
  };

  private readonly handlePointerLeave = () => {
    this.pointerTarget.set(0, 0);
    this.root.style.setProperty('--gate-pointer-x', '50%');
    this.root.style.setProperty('--gate-pointer-y', '48%');
  };

  private readonly handleVisibilityChange = () => {
    this.documentVisible = document.visibilityState === 'visible';
    this.syncRenderLoop();
  };

  private readonly handleThemeChange = () => {
    this.syncTheme();
  };

  private readonly handleReplay = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Non-persistent replay still works.
    }
    this.activate();
  };

  private readonly syncTheme = () => {
    if (this.material) this.material.uniforms.uTheme.value = getThemeUniform();
  };

  private syncRenderLoop() {
    if (!this.renderer || !this.rendererReady) return;

    const shouldRun = this.active && this.documentVisible && !this.reducedMotion.matches;
    if (shouldRun) {
      if (!this.rafId) this.rafId = requestAnimationFrame(this.render);
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  private readonly render = () => {
    this.rafId = 0;
    if (!this.active || !this.renderer || !this.rendererReady) return;

    this.drawFrame();
    this.rafId = requestAnimationFrame(this.render);
  };

  private drawFrame() {
    if (!this.renderer || !this.scene || !this.camera || !this.material) return;

    this.pointer.lerp(this.pointerTarget, 0.055);
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.material.uniforms.uTheme.value = getThemeUniform();
    this.renderer.render(this.scene, this.camera);
  }

  private disposeRenderer() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

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
    this.rendererReady = false;
    this.clock.stop();
  }

  private markEntered() {
    this.active = false;
    this.root.dataset.worldShaderState = 'entered';
    document.documentElement.classList.remove('world-gate-active', 'world-gate-pending');
    document.documentElement.classList.add('world-gate-session-entered');
  }

  private hasEnteredThisSession() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private setEnteredThisSession() {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Session persistence is progressive enhancement.
    }
  }
}

function getThemeUniform() {
  return document.documentElement.dataset.theme === 'light' ? 1 : 0;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function initWorldGate() {
  const root = document.querySelector<ShaderRoot>(ROOT_SELECTOR);
  if (!root || root.dataset.worldShaderReady === 'true') return;

  root.dataset.worldShaderReady = 'true';
  new WorldShaderGate(root);
}

function initReplayButtons() {
  document.querySelectorAll<HTMLButtonElement>(REPLAY_SELECTOR).forEach((button) => {
    if (button.dataset.replayReady === 'true') return;
    button.dataset.replayReady = 'true';
    button.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('szd:replay-world-gate'));
    });
  });
}

function init() {
  initWorldGate();
  initReplayButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
