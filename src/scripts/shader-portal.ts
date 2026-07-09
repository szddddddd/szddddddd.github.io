import * as THREE from 'three';

const ROOT_SELECTOR = '[data-shader-portal]';
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
  uniform vec2 uMouse;
  uniform float uHover;

  varying vec2 vUv;

  const int MAX_STEPS = 64;
  const float MAX_DIST = 8.0;
  const float SURF_DIST = 0.0016;

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  float sdRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }

  float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
  }

  float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
    vec3 pa = p - a;
    vec3 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }

  float opSmoothUnion(float d1, float d2, float k) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) - k * h * (1.0 - h);
  }

  vec3 portalSpace(vec3 p) {
    float t = uTime * 0.085;
    p.xz = rot(t + uMouse.x * 0.18 * uHover) * p.xz;
    p.yz = rot(-0.12 + sin(uTime * 0.07) * 0.08 + uMouse.y * 0.12 * uHover) * p.yz;
    return p;
  }

  float kifsDetail(vec3 p) {
    vec3 q = p;
    float scale = 1.0;

    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      q = abs(q) - vec3(0.42, 0.25, 0.36);
      q.xz = rot(0.78 + fi * 0.43 + sin(uTime * 0.11 + fi) * 0.045) * q.xz;
      q.xy = rot(-0.36 + fi * 0.19) * q.xy;
      scale *= 1.26;
    }

    return sdRoundBox(q, vec3(0.18, 0.105, 0.18), 0.028) / scale;
  }

  float sceneSdf(vec3 p) {
    vec3 q = portalSpace(p);
    float drift = sin(uTime * 0.17) * 0.035;

    float hull = sdRoundBox(q + vec3(0.0, 0.07, 0.0), vec3(0.86, 0.23, 0.42), 0.085);
    float cabin = sdRoundBox(q - vec3(0.0, 0.28 + drift, 0.0), vec3(0.36, 0.22, 0.27), 0.055);

    vec3 roofP = q - vec3(0.0, 0.57 + drift, 0.0);
    roofP.y *= 1.42;
    float roof = sdOctahedron(roofP, 0.52);
    roof = max(roof, -(q.y - 0.31));

    float mast = sdCapsule(q, vec3(0.0, 0.28, 0.0), vec3(0.0, 0.88, 0.0), 0.022);
    float wingA = sdRoundBox(q - vec3(0.0, -0.02, 0.48), vec3(0.62, 0.035, 0.16), 0.025);
    float wingB = sdRoundBox(q - vec3(0.0, -0.02, -0.48), vec3(0.62, 0.035, 0.16), 0.025);
    float house = opSmoothUnion(hull, cabin, 0.18);
    house = opSmoothUnion(house, roof, 0.11);
    house = opSmoothUnion(house, mast, 0.06);

    float craft = opSmoothUnion(hull, wingA, 0.11);
    craft = opSmoothUnion(craft, wingB, 0.11);
    craft = opSmoothUnion(craft, sdCapsule(q, vec3(-0.72, -0.02, 0.0), vec3(0.72, -0.02, 0.0), 0.16), 0.08);

    float morph = 0.5 + 0.5 * sin(uTime * 0.105);
    float body = mix(house, craft, morph * 0.55);
    float folded = kifsDetail(q + vec3(0.0, -0.03, 0.0)) + 0.012;
    body = opSmoothUnion(body, folded, 0.13);

    return body;
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0017, 0.0);
    return normalize(vec3(
      sceneSdf(p + e.xyy) - sceneSdf(p - e.xyy),
      sceneSdf(p + e.yxy) - sceneSdf(p - e.yxy),
      sceneSdf(p + e.yyx) - sceneSdf(p - e.yyx)
    ));
  }

  float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * t;
      float d = sceneSdf(p);
      if (d < SURF_DIST || t > MAX_DIST) break;
      t += d * 0.86;
    }

    return t;
  }

  float gridLine(vec2 p, float scale) {
    vec2 coord = p * scale;
    vec2 width = max(fwidth(coord), vec2(0.001));
    vec2 g = abs(fract(coord - 0.5) - 0.5) / width;
    return 1.0 - clamp(min(g.x, g.y), 0.0, 1.0);
  }

  vec3 background(vec3 ro, vec3 rd, vec2 uv) {
    float horizon = smoothstep(-0.65, 0.72, rd.y);
    vec3 color = mix(vec3(0.018, 0.038, 0.085), vec3(0.045, 0.095, 0.19), horizon);
    color += vec3(0.03, 0.095, 0.17) * exp(-dot(uv, uv) * 1.5);

    float sphereGlow = exp(-abs(length(uv * vec2(1.0, 1.18)) - 0.64) * 13.0);
    color += vec3(0.08, 0.28, 0.45) * sphereGlow * 0.08;

    float planeT = (-0.86 - ro.y) / rd.y;
    if (planeT > 0.0) {
      vec3 gp = ro + rd * planeT;
      float fade = exp(-planeT * 0.18) * (1.0 - smoothstep(5.8, 8.0, planeT));
      float primary = gridLine(gp.xz, 0.82);
      float secondary = gridLine(gp.xz, 0.205);
      color += vec3(0.18, 0.54, 0.78) * primary * 0.16 * fade;
      color += vec3(0.28, 0.66, 0.95) * secondary * 0.07 * fade;
    }

    vec2 starCell = floor(gl_FragCoord.xy / 3.0);
    float star = step(0.996, hash21(starCell + floor(uTime * 0.04)));
    color += vec3(0.55, 0.78, 1.0) * star * 0.22;

    return color;
  }

  float objectGrid(vec3 p) {
    vec3 q = portalSpace(p) * 5.0;
    vec3 w = max(fwidth(q), vec3(0.001));
    vec3 g = abs(fract(q - 0.5) - 0.5) / w;
    return 1.0 - clamp(min(g.x, min(g.y, g.z)), 0.0, 1.0);
  }

  float hatch(vec2 p, float shade) {
    float stripe = abs(fract((p.x + p.y) * 19.0 + uTime * 0.035) - 0.5);
    float line = 1.0 - smoothstep(0.055, 0.083, stripe);
    return line * smoothstep(0.0, 0.52, 1.0 - shade);
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = (fragCoord * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

    float yaw = 0.18 * sin(uTime * 0.06) + uMouse.x * 0.24 * uHover;
    float pitch = uMouse.y * 0.12 * uHover;
    vec3 ro = vec3(0.0, 0.18 + pitch, 4.25);
    ro.xz = rot(yaw) * ro.xz;
    vec3 target = vec3(0.0, 0.04, 0.0);

    vec3 ww = normalize(target - ro);
    vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
    vec3 vv = cross(ww, uu);
    vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.78 * ww);

    vec3 color = background(ro, rd, uv);
    float t = raymarch(ro, rd);

    if (t < MAX_DIST) {
      vec3 p = ro + rd * t;
      vec3 n = calcNormal(p);
      vec3 lightDir = normalize(vec3(-0.42 + uMouse.x * 0.18 * uHover, 0.72, 0.48));
      float diff = clamp(dot(n, lightDir), 0.0, 1.0);
      float band = floor(diff * 3.2) / 3.0;
      float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.35);
      float fresnel = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);

      vec3 low = vec3(0.035, 0.09, 0.16);
      vec3 mid = vec3(0.20, 0.48, 0.69);
      vec3 high = vec3(0.70, 0.88, 0.98);
      vec3 toon = mix(low, mid, band);
      toon = mix(toon, high, smoothstep(0.72, 0.98, diff) * 0.48);

      float wire = objectGrid(p);
      float h = hatch(fragCoord / min(uResolution.x, uResolution.y) + p.xz * 0.09, band);
      toon = mix(toon, toon * 0.62, h * 0.58);
      toon += vec3(0.42, 0.78, 1.0) * wire * 0.26;
      toon += vec3(0.12, 0.45, 0.74) * rim * 0.42;
      toon = mix(toon, vec3(0.004, 0.018, 0.038), smoothstep(0.56, 0.96, rim) * 0.3);
      toon += vec3(0.65, 0.88, 1.0) * fresnel * 0.22;

      float fog = smoothstep(2.8, 7.2, t);
      color = mix(toon, color, fog);
    }

    float vignette = smoothstep(1.55, 0.24, length(uv * vec2(0.9, 1.08)));
    color *= 0.64 + 0.36 * vignette;
    color += vec3(0.025, 0.06, 0.11) * (1.0 - vignette);
    color = pow(color, vec3(0.92));

    gl_FragColor = vec4(color, 1.0);
  }
`;

type ShaderPortalRoot = HTMLElement & { dataset: DOMStringMap };
type PortalVariant = 'compact' | 'large';

const instances = new Map<ShaderPortalRoot, ShaderPortalRenderer>();

class ShaderPortalRenderer {
  private readonly root: ShaderPortalRoot;
  private readonly canvas: HTMLCanvasElement;
  private readonly surface: HTMLElement;
  private readonly reducedMotion: MediaQueryList;
  private readonly variant: PortalVariant;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private material?: THREE.ShaderMaterial;
  private mesh?: THREE.Mesh;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private rafId = 0;
  private disposed = false;
  private inViewport = false;
  private documentVisible = document.visibilityState === 'visible';
  private readonly clock = new THREE.Clock(false);
  private readonly mouse = new THREE.Vector2(0, 0);
  private readonly mouseTarget = new THREE.Vector2(0, 0);
  private hover = 0;
  private hoverTarget = 0;
  private lastFrameTime = 0;
  private readonly frameIntervalMs: number;
  private readonly pixelRatioCap: number;

  constructor(root: ShaderPortalRoot, canvas: HTMLCanvasElement) {
    this.root = root;
    this.canvas = canvas;
    this.surface = canvas.closest<HTMLElement>('.shader-portal-stage') ?? root;
    this.reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    this.variant = root.dataset.shaderPortalVariant === 'large' ? 'large' : 'compact';
    const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 720;
    this.pixelRatioCap = mobile ? 1.15 : this.variant === 'large' ? 1.35 : 1.25;
    this.frameIntervalMs = mobile ? 1000 / 30 : this.variant === 'large' ? 1000 / 42 : 1000 / 36;

    if (!supportsWebGL()) {
      this.root.dataset.shaderPortalState = 'fallback';
      return;
    }

    try {
      this.setupScene();
      this.bindResize();
      this.resize();
      this.drawFrame(this.reducedMotion.matches ? 14.2 : 0.0);

      if (this.reducedMotion.matches) {
        this.root.dataset.shaderPortalState = 'reduced';
        return;
      }

      this.bindInteraction();
      this.bindVisibility();
      this.clock.start();
      this.syncRenderLoop();
    } catch (error) {
      console.warn('[ShaderPortal] Falling back to static visual.', error);
      this.dispose();
      this.root.dataset.shaderPortalState = 'fallback';
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    this.root.removeEventListener('pointermove', this.handlePointerMove);
    this.root.removeEventListener('pointerenter', this.handlePointerEnter);
    this.root.removeEventListener('pointerleave', this.handlePointerLeave);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    window.removeEventListener('resize', this.resize);

    this.mesh?.geometry.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.material = undefined;
    this.mesh = undefined;
    this.clock.stop();
  }

  private setupScene() {
    this.root.dataset.shaderPortalState = 'booting';

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x050816, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: this.mouse },
        uHover: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(this.mesh);
  }

  private bindResize() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.surface);
    } else {
      window.addEventListener('resize', this.resize, { passive: true });
    }
  }

  private bindInteraction() {
    this.root.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.root.addEventListener('pointerenter', this.handlePointerEnter, { passive: true });
    this.root.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
  }

  private bindVisibility() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

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
  }

  private readonly resize = () => {
    if (!this.renderer || !this.material || this.disposed) return;

    const rect = this.surface.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap);

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.material.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
    this.drawFrame(this.reducedMotion.matches ? 14.2 : this.clock.getElapsedTime());
  };

  private readonly handlePointerEnter = () => {
    this.hoverTarget = 1;
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.mouseTarget.set((x - 0.5) * 2, -(y - 0.5) * 2);
    this.hoverTarget = 1;
    this.root.style.setProperty('--portal-pointer-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--portal-pointer-y', `${Math.round(y * 100)}%`);
  };

  private readonly handlePointerLeave = () => {
    this.mouseTarget.set(0, 0);
    this.hoverTarget = 0;
    this.root.style.setProperty('--portal-pointer-x', '52%');
    this.root.style.setProperty('--portal-pointer-y', '34%');
  };

  private readonly handleVisibilityChange = () => {
    this.documentVisible = document.visibilityState === 'visible';
    this.syncRenderLoop();
  };

  private syncRenderLoop() {
    if (!this.renderer || this.disposed || this.reducedMotion.matches) return;

    const shouldRun = this.inViewport && this.documentVisible;
    if (shouldRun) {
      this.root.dataset.shaderPortalState = 'running';
      if (!this.rafId) this.rafId = requestAnimationFrame(this.render);
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.root.dataset.shaderPortalState = 'paused';
  }

  private readonly render = (now: number) => {
    this.rafId = 0;
    if (!this.renderer || this.disposed) return;
    if (!this.inViewport || !this.documentVisible) {
      this.syncRenderLoop();
      return;
    }

    if (now - this.lastFrameTime >= this.frameIntervalMs) {
      this.lastFrameTime = now;
      this.drawFrame(this.clock.getElapsedTime());
    }

    this.rafId = requestAnimationFrame(this.render);
  };

  private drawFrame(time: number) {
    if (!this.renderer || !this.scene || !this.camera || !this.material || this.disposed) return;

    this.mouse.lerp(this.mouseTarget, 0.07);
    this.hover = THREE.MathUtils.lerp(this.hover, this.hoverTarget, 0.07);
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uHover.value = this.hover;
    this.renderer.render(this.scene, this.camera);
  }
}

function supportsWebGL() {
  if (!('WebGLRenderingContext' in window)) return false;

  const testCanvas = document.createElement('canvas');
  try {
    return Boolean(testCanvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function initShaderPortals() {
  document.querySelectorAll<ShaderPortalRoot>(ROOT_SELECTOR).forEach((root) => {
    if (instances.has(root)) return;
    const canvas = root.querySelector<HTMLCanvasElement>('.shader-portal-canvas');
    if (!canvas) {
      root.dataset.shaderPortalState = 'fallback';
      return;
    }
    instances.set(root, new ShaderPortalRenderer(root, canvas));
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
  document.addEventListener('DOMContentLoaded', initShaderPortals, { once: true });
} else {
  initShaderPortals();
}

document.addEventListener('astro:page-load', initShaderPortals);
document.addEventListener('astro:before-swap', disposeAll);
window.addEventListener('pagehide', disposeAll);

const reducedMotionWatcher = window.matchMedia(REDUCED_MOTION_QUERY);
const handleMotionPreferenceChange = () => {
  disposeAll();
  initShaderPortals();
};

if ('addEventListener' in reducedMotionWatcher) {
  reducedMotionWatcher.addEventListener('change', handleMotionPreferenceChange);
} else {
  reducedMotionWatcher.addListener(handleMotionPreferenceChange);
}
