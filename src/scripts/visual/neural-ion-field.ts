import * as THREE from 'three';

const ROOT_SELECTOR = '[data-neural-ion-hero]';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TAU = Math.PI * 2;

type NeuralRoot = HTMLElement & { dataset: DOMStringMap };

type RuntimeConfig = {
  cloudCount: number;
  ionHeads: number;
  trailSteps: number;
  pixelRatioCap: number;
};

const cloudVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseActive;

  attribute vec4 aSeed;
  attribute vec3 aColor;
  attribute float aScale;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec3 p = position;
    float radius = length(position);
    float phase = aSeed.w * 6.28318530718;

    float breath = 1.0 + 0.032 * sin(uTime * 0.52 + phase);
    p *= breath;

    p.xz = rotate2d(uTime * 0.075 + aSeed.x * 0.055) * p.xz;
    p.yz = rotate2d(0.16 * sin(uTime * 0.045 + aSeed.y * 6.28318530718)) * p.yz;

    vec3 flow = vec3(
      sin(p.y * 3.7 + uTime * 0.52 + phase),
      cos(p.z * 3.2 - uTime * 0.41 + aSeed.x * 6.28318530718),
      sin(p.x * 4.15 + uTime * 0.34 + aSeed.y * 6.28318530718)
    );
    float edge = smoothstep(0.18, 1.52, radius);
    p += flow * (0.018 + edge * 0.034);

    vec2 mouse = uMouse * vec2(0.95, 0.72);
    vec2 delta = p.xy - mouse;
    float dist = length(delta);
    float pull = exp(-dist * dist * 2.55) * uMouseActive;
    p.xy -= delta / max(dist, 0.001) * pull * 0.038;
    p.z += pull * 0.065 * sin(phase + uTime * 0.9);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float attenuation = 1.0 / max(0.48, -mvPosition.z);
    float shimmer = 0.86 + 0.14 * sin(uTime * 0.82 + phase + radius * 2.0);
    gl_PointSize = aScale * shimmer * uPixelRatio * 12.6 * attenuation;

    vColor = aColor;
    vAlpha = mix(0.34, 0.16, edge) * (0.82 + 0.18 * sin(uTime * 0.37 + phase));
    vGlow = 1.0 - edge * 0.55;
  }
`;

const cloudFragmentShader = /* glsl */ `
  precision mediump float;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d = dot(uv, uv);
    if (d > 1.0) discard;

    float core = exp(-d * 5.8);
    float halo = exp(-d * 1.75);
    float alpha = (core * 0.74 + halo * 0.2) * vAlpha;
    vec3 whiteCore = vec3(0.78, 0.9, 1.0) * core * 0.16;
    vec3 color = vColor * (0.42 + core * 1.34 + halo * 0.22 * vGlow) + whiteCore;

    gl_FragColor = vec4(color, alpha);
  }
`;

const ionVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseActive;

  attribute vec4 aOrbit;
  attribute vec3 aTilt;
  attribute vec3 aTint;
  attribute float aScale;
  attribute float aTrail;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vTrail;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    float phase = uTime * aOrbit.z + aOrbit.w - aTrail * 0.48;
    float radius = aOrbit.x;
    float ratio = aOrbit.y;

    vec3 p = vec3(
      cos(phase) * radius,
      sin(phase * 1.31 + aTilt.z) * 0.17,
      sin(phase) * radius * ratio
    );

    p.xy = rotate2d(aTilt.x) * p.xy;
    p.xz = rotate2d(aTilt.y + uTime * 0.028) * p.xz;
    p.yz = rotate2d(aTilt.z) * p.yz;

    vec2 delta = p.xy - uMouse * vec2(0.82, 0.62);
    float dist = length(delta);
    float pull = exp(-dist * dist * 3.2) * uMouseActive;
    p.xy -= delta / max(dist, 0.001) * pull * 0.025;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float attenuation = 1.0 / max(0.48, -mvPosition.z);
    float head = pow(1.0 - aTrail, 1.65);
    gl_PointSize = aScale * mix(4.2, 13.5, head) * uPixelRatio * attenuation;

    vColor = aTint;
    vAlpha = (0.05 + 0.56 * head) * (0.86 + 0.14 * sin(uTime * 1.1 + aOrbit.w));
    vTrail = aTrail;
  }
`;

const ionFragmentShader = /* glsl */ `
  precision mediump float;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vTrail;

  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d = dot(uv, uv);
    if (d > 1.0) discard;

    float core = exp(-d * 7.2);
    float halo = exp(-d * 1.85);
    float trailFade = pow(1.0 - vTrail, 1.25);
    float alpha = (core * 0.88 + halo * 0.24) * vAlpha * trailFade;
    vec3 color = vColor * (0.5 + core * 1.65 + halo * 0.38) + vec3(0.85, 0.95, 1.0) * core * 0.22;

    gl_FragColor = vec4(color, alpha);
  }
`;

const instances = new Map<NeuralRoot, NeuralIonField>();

class NeuralIonField {
  private readonly root: NeuralRoot;
  private readonly canvas: HTMLCanvasElement;
  private readonly reducedMotion: MediaQueryList;
  private readonly config: RuntimeConfig;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private fieldGroup?: THREE.Group;
  private cloudMaterial?: THREE.ShaderMaterial;
  private ionMaterial?: THREE.ShaderMaterial;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private rafId = 0;
  private disposed = false;
  private inViewport = false;
  private documentVisible = document.visibilityState === 'visible';
  private readonly clock = new THREE.Clock(false);
  private readonly mouse = new THREE.Vector2(0, 0);
  private readonly mouseTarget = new THREE.Vector2(0, 0);
  private mouseActive = 0;
  private mouseActiveTarget = 0;

  constructor(root: NeuralRoot, canvas: HTMLCanvasElement) {
    this.root = root;
    this.canvas = canvas;
    this.reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    this.config = getRuntimeConfig();

    if (this.reducedMotion.matches) {
      this.root.dataset.neuralIonState = 'reduced';
      return;
    }

    if (!supportsWebGL()) {
      this.root.dataset.neuralIonState = 'fallback';
      return;
    }

    try {
      this.setupScene();
      this.bindEvents();
      this.resize();
      this.drawFrame();
      this.syncRenderLoop();
    } catch (error) {
      console.warn('[NeuralIonField] Falling back to static visual.', error);
      this.dispose();
      this.root.dataset.neuralIonState = 'fallback';
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
    this.root.removeEventListener('pointerleave', this.handlePointerLeave);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();

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

    window.removeEventListener('resize', this.resize);

    this.renderer?.dispose();
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.fieldGroup = undefined;
    this.cloudMaterial = undefined;
    this.ionMaterial = undefined;
    this.clock.stop();
  }

  private setupScene() {
    this.root.dataset.neuralIonState = 'booting';

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      depth: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 32);
    this.camera.position.set(0, 0, 4.35);

    this.fieldGroup = new THREE.Group();
    this.fieldGroup.rotation.set(-0.05, 0.08, -0.03);

    const cloudGeometry = createCloudGeometry(this.config.cloudCount);
    this.cloudMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uMouse: { value: this.mouse },
        uMouseActive: { value: 0 },
      },
      vertexShader: cloudVertexShader,
      fragmentShader: cloudFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    });
    const cloud = new THREE.Points(cloudGeometry, this.cloudMaterial);
    this.fieldGroup.add(cloud);

    this.fieldGroup.add(createOrbitLines());

    const ionGeometry = createIonGeometry(this.config.ionHeads, this.config.trailSteps);
    this.ionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uMouse: { value: this.mouse },
        uMouseActive: { value: 0 },
      },
      vertexShader: ionVertexShader,
      fragmentShader: ionFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    });
    const ions = new THREE.Points(ionGeometry, this.ionMaterial);
    this.fieldGroup.add(ions);

    this.scene.add(this.fieldGroup);
    this.clock.start();
  }

  private bindEvents() {
    this.root.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.root.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    const ResizeObserverConstructor = (window as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    if (ResizeObserverConstructor) {
      this.resizeObserver = new ResizeObserverConstructor(this.resize);
      this.resizeObserver.observe(this.root);
    } else {
      window.addEventListener('resize', this.resize, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          this.inViewport = entries.some((entry) => entry.isIntersecting);
          this.syncRenderLoop();
        },
        { rootMargin: '96px', threshold: 0.01 },
      );
      this.intersectionObserver.observe(this.root);
    } else {
      this.inViewport = true;
    }
  }

  private readonly resize = () => {
    if (!this.renderer || !this.camera || this.disposed) return;

    const rect = this.root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.config.pixelRatioCap);

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.position.z = width < 420 ? 4.75 : 4.35;
    this.camera.updateProjectionMatrix();

    if (this.cloudMaterial) this.cloudMaterial.uniforms.uPixelRatio.value = pixelRatio;
    if (this.ionMaterial) this.ionMaterial.uniforms.uPixelRatio.value = pixelRatio;

    if (this.fieldGroup) {
      const scale = width < 420 ? 0.86 : width < 620 ? 0.93 : 1;
      this.fieldGroup.scale.setScalar(scale);
    }

    this.drawFrame();
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.mouseTarget.set((x - 0.5) * 2, -(y - 0.5) * 2);
    this.mouseActiveTarget = 1;
    this.root.style.setProperty('--ion-pointer-x', `${Math.round(x * 100)}%`);
    this.root.style.setProperty('--ion-pointer-y', `${Math.round(y * 100)}%`);
  };

  private readonly handlePointerLeave = () => {
    this.mouseTarget.set(0, 0);
    this.mouseActiveTarget = 0;
    this.root.style.setProperty('--ion-pointer-x', '50%');
    this.root.style.setProperty('--ion-pointer-y', '48%');
  };

  private readonly handleVisibilityChange = () => {
    this.documentVisible = document.visibilityState === 'visible';
    this.syncRenderLoop();
  };

  private syncRenderLoop() {
    if (!this.renderer || this.disposed) return;

    const shouldRun = this.inViewport && this.documentVisible;
    if (shouldRun) {
      this.root.dataset.neuralIonState = 'running';
      if (!this.rafId) this.rafId = requestAnimationFrame(this.render);
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.root.dataset.neuralIonState = 'paused';
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
    if (!this.renderer || !this.scene || !this.camera || this.disposed) return;

    const elapsed = this.clock.getElapsedTime();
    this.mouse.lerp(this.mouseTarget, 0.055);
    this.mouseActive = THREE.MathUtils.lerp(this.mouseActive, this.mouseActiveTarget, 0.06);

    if (this.fieldGroup) {
      this.fieldGroup.rotation.x = THREE.MathUtils.lerp(this.fieldGroup.rotation.x, -0.05 + this.mouse.y * 0.095, 0.035);
      this.fieldGroup.rotation.y = THREE.MathUtils.lerp(this.fieldGroup.rotation.y, 0.08 + this.mouse.x * 0.14, 0.035);
      this.fieldGroup.rotation.z = -0.03 + Math.sin(elapsed * 0.06) * 0.018;
    }

    if (this.cloudMaterial) {
      this.cloudMaterial.uniforms.uTime.value = elapsed;
      this.cloudMaterial.uniforms.uMouseActive.value = this.mouseActive;
    }
    if (this.ionMaterial) {
      this.ionMaterial.uniforms.uTime.value = elapsed;
      this.ionMaterial.uniforms.uMouseActive.value = this.mouseActive;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

function getRuntimeConfig(): RuntimeConfig {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  const lowCore = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const mobile = width < 720 || coarsePointer;

  if (mobile) {
    return {
      cloudCount: width < 430 || lowMemory ? 2800 : 4200,
      ionHeads: 7,
      trailSteps: 12,
      pixelRatioCap: 1.35,
    };
  }

  if (lowMemory || lowCore || width < 1080) {
    return {
      cloudCount: 7200,
      ionHeads: 9,
      trailSteps: 14,
      pixelRatioCap: 1.5,
    };
  }

  return {
    cloudCount: 11200,
    ionHeads: 12,
    trailSteps: 16,
    pixelRatioCap: 1.5,
  };
}

function createCloudGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset3 = index * 3;
    const offset4 = index * 4;
    const u = (index + 0.5) / count;
    const z = 1 - 2 * u;
    const ring = Math.sqrt(Math.max(0, 1 - z * z));
    const theta = index * GOLDEN_ANGLE + randomSigned(0.035);

    const gaussianRadius = Math.pow(Math.random(), 2.18) * 1.58 + Math.random() * 0.025;
    const lobe =
      1 +
      0.13 * Math.sin(theta * 3 + z * 2.4) +
      0.08 * Math.sin(theta * 5.0 - z * 3.0) +
      0.04 * Math.cos(theta * 8.0 + z);

    let x = Math.cos(theta) * ring * gaussianRadius * lobe;
    let y = z * gaussianRadius * (0.82 + 0.07 * Math.sin(theta * 2.0));
    let zz = Math.sin(theta) * ring * gaussianRadius * (1.08 + 0.06 * Math.cos(theta * 4.0));

    const coreJitter = 0.018 + gaussianRadius * 0.012;
    x += randomNormal() * coreJitter;
    y += randomNormal() * coreJitter;
    zz += randomNormal() * coreJitter;

    positions[offset3] = x;
    positions[offset3 + 1] = y;
    positions[offset3 + 2] = zz;

    seeds[offset4] = Math.random();
    seeds[offset4 + 1] = Math.random();
    seeds[offset4 + 2] = Math.random();
    seeds[offset4 + 3] = Math.random();

    const radial = THREE.MathUtils.clamp(gaussianRadius / 1.58, 0, 1);
    const tint = colorForRadius(radial, Math.random());
    colors[offset3] = tint[0];
    colors[offset3 + 1] = tint[1];
    colors[offset3 + 2] = tint[2];

    const splatBias = Math.random() > 0.935 ? 1.55 : 1;
    scales[index] = (0.68 + Math.pow(Math.random(), 1.8) * 1.55 + (1 - radial) * 0.36) * splatBias;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function createIonGeometry(heads: number, trailSteps: number) {
  const count = heads * trailSteps;
  const positions = new Float32Array(count * 3);
  const orbits = new Float32Array(count * 4);
  const tilts = new Float32Array(count * 3);
  const tints = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const trails = new Float32Array(count);

  for (let head = 0; head < heads; head += 1) {
    const radius = 1.02 + Math.random() * 0.42;
    const ratio = 0.36 + Math.random() * 0.38;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const speed = direction * (0.16 + Math.random() * 0.075);
    const offset = (head / heads) * TAU + Math.random() * 0.38;
    const tiltX = randomSigned(0.52);
    const tiltY = randomSigned(0.9);
    const tiltZ = randomSigned(0.72);
    const tint = ionTint(head);

    for (let trail = 0; trail < trailSteps; trail += 1) {
      const index = head * trailSteps + trail;
      const offset3 = index * 3;
      const offset4 = index * 4;
      const trailAmount = trail / Math.max(1, trailSteps - 1);

      positions[offset3] = 0;
      positions[offset3 + 1] = 0;
      positions[offset3 + 2] = 0;

      orbits[offset4] = radius;
      orbits[offset4 + 1] = ratio;
      orbits[offset4 + 2] = speed;
      orbits[offset4 + 3] = offset;

      tilts[offset3] = tiltX;
      tilts[offset3 + 1] = tiltY;
      tilts[offset3 + 2] = tiltZ;

      tints[offset3] = tint[0];
      tints[offset3 + 1] = tint[1];
      tints[offset3 + 2] = tint[2];

      scales[index] = 1.05 + Math.random() * 0.44;
      trails[index] = trailAmount;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aOrbit', new THREE.BufferAttribute(orbits, 4));
  geometry.setAttribute('aTilt', new THREE.BufferAttribute(tilts, 3));
  geometry.setAttribute('aTint', new THREE.BufferAttribute(tints, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aTrail', new THREE.BufferAttribute(trails, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function createOrbitLines() {
  const group = new THREE.Group();
  const colors = [0x7dd3fc, 0xc084fc, 0xe0f2fe];

  for (let orbit = 0; orbit < 3; orbit += 1) {
    const segments = 168;
    const vertices = new Float32Array(segments * 3);
    const radius = 1.08 + orbit * 0.16;
    const ratio = 0.38 + orbit * 0.1;

    for (let segment = 0; segment < segments; segment += 1) {
      const phase = (segment / segments) * TAU;
      const offset = segment * 3;
      vertices[offset] = Math.cos(phase) * radius;
      vertices[offset + 1] = Math.sin(phase * 2.0 + orbit) * 0.018;
      vertices[offset + 2] = Math.sin(phase) * radius * ratio;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.LineBasicMaterial({
      color: colors[orbit],
      transparent: true,
      opacity: orbit === 2 ? 0.11 : 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.LineLoop(geometry, material);
    line.rotation.set(0.36 + orbit * 0.42, -0.58 + orbit * 0.34, 0.28 + orbit * 0.88);
    group.add(line);
  }

  return group;
}

function colorForRadius(radius: number, randomValue: number): [number, number, number] {
  const center: [number, number, number] = [0.82, 0.94, 1.0];
  const cyan: [number, number, number] = [0.36, 0.78, 1.0];
  const violet: [number, number, number] = [0.68, 0.48, 1.0];
  const blue: [number, number, number] = [0.42, 0.62, 1.0];
  const outer = randomValue > 0.62 ? violet : randomValue > 0.28 ? cyan : blue;
  const t = THREE.MathUtils.smoothstep(radius, 0.05, 1.0);
  return mixRgb(center, outer, t);
}

function ionTint(index: number): [number, number, number] {
  const palette: [number, number, number][] = [
    [0.82, 0.94, 1.0],
    [0.48, 0.82, 1.0],
    [0.72, 0.58, 1.0],
    [0.92, 0.88, 1.0],
  ];
  return palette[index % palette.length];
}

function mixRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  const amount = THREE.MathUtils.clamp(t, 0, 1);
  return [
    THREE.MathUtils.lerp(a[0], b[0], amount),
    THREE.MathUtils.lerp(a[1], b[1], amount),
    THREE.MathUtils.lerp(a[2], b[2], amount),
  ];
}

function randomSigned(scale: number) {
  return (Math.random() * 2 - 1) * scale;
}

function randomNormal() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
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

function initNeuralIonFields() {
  document.querySelectorAll<NeuralRoot>(ROOT_SELECTOR).forEach((root) => {
    if (instances.has(root)) return;
    const canvas = root.querySelector<HTMLCanvasElement>('.neural-ion-canvas');
    if (!canvas) {
      root.dataset.neuralIonState = 'fallback';
      return;
    }
    instances.set(root, new NeuralIonField(root, canvas));
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
  document.addEventListener('DOMContentLoaded', initNeuralIonFields, { once: true });
} else {
  initNeuralIonFields();
}

document.addEventListener('astro:page-load', initNeuralIonFields);
document.addEventListener('astro:before-swap', disposeAll);
window.addEventListener('pagehide', disposeAll);

const reducedMotionWatcher = window.matchMedia(REDUCED_MOTION_QUERY);
const mediaQueryChangeApi = reducedMotionWatcher as unknown as {
  addEventListener?: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};
const handleMotionPreferenceChange = () => {
  disposeAll();
  initNeuralIonFields();
};

if (mediaQueryChangeApi.addEventListener) {
  mediaQueryChangeApi.addEventListener('change', handleMotionPreferenceChange);
} else if (mediaQueryChangeApi.addListener) {
  mediaQueryChangeApi.addListener(handleMotionPreferenceChange);
}
