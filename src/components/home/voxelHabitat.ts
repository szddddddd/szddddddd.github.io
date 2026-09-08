import * as THREE from "three";
import { buildHabitat } from "./coastalScene";

export class VoxelHabitat extends HTMLElement {
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private habitat?: ReturnType<typeof buildHabitat>;
  private resize?: ResizeObserver;
  private intersection?: IntersectionObserver;
  private preferences?: MutationObserver;
  private events?: AbortController;
  private frame = 0;
  private visible = false;
  private angle = 0.67;
  private zoom = 1.07;
  private last = 0;
  private time = 0;
  private drawnTime = -1;

  connectedCallback() {
    const canvas = this.querySelector("canvas")!;
    this.events = new AbortController();
    const options = { signal: this.events.signal };
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.scene = new THREE.Scene();
    this.renderer.setClearColor(0x000000, 0);
    this.camera = new THREE.OrthographicCamera(-12, 12, 9, -9, .5, 180);
    this.scene.add(new THREE.HemisphereLight("#e0eeff", "#78664a", 2.6));
    const sun = new THREE.DirectionalLight("#ffe0ab", 3.8);
    sun.position.set(-7, 14, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -17,
      right: 17,
      top: 17,
      bottom: -17,
      near: 1,
      far: 40,
    });
    sun.shadow.normalBias = 0.035;
    sun.shadow.bias = -0.00015;
    this.scene.add(sun);
    this.habitat = buildHabitat(this.scene);
    this.drawnTime = -1;
    const fit = () => {
      if (!this.renderer || !this.camera) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const aspect = bounds.width / bounds.height;
      const halfHeight = Math.max(14.8, 19.7 / aspect);
      this.camera.left = -halfHeight * aspect;
      this.camera.right = halfHeight * aspect;
      this.camera.top = halfHeight;
      this.camera.bottom = -halfHeight;
      this.renderer.setSize(bounds.width, bounds.height, false);
      this.draw();
    };
    this.resize = new ResizeObserver(fit);
    this.resize.observe(canvas);
    fit();
    let drag: { id: number; x: number; angle: number } | undefined;
    canvas.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button !== 0 || !event.isPrimary) return;
        drag = { id: event.pointerId, x: event.clientX, angle: this.angle };
        canvas.setPointerCapture(event.pointerId);
      },
      options,
    );
    canvas.addEventListener(
      "pointermove",
      (event) => {
        if (!drag || drag.id !== event.pointerId) return;
        this.angle = drag.angle - (event.clientX - drag.x) * 0.009;
        this.draw();
      },
      options,
    );
    const endDrag = () => {
      drag = undefined;
    };
    canvas.addEventListener("pointerup", endDrag, options);
    canvas.addEventListener("pointercancel", endDrag, options);
    canvas.addEventListener("lostpointercapture", endDrag, options);
    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        delete this.dataset.ready;
        cancelAnimationFrame(this.frame);
      },
      options,
    );
    canvas.addEventListener(
      "webglcontextrestored",
      () => {
        this.draw();
        this.dataset.ready = "";
        this.sync();
      },
      options,
    );
    this.intersection = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.sync();
    });
    this.intersection.observe(this);
    this.preferences = new MutationObserver(this.sync);
    this.preferences.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    document.addEventListener("visibilitychange", this.sync, options);
    this.dataset.ready = "";
  }
  private draw() {
    if (!this.renderer || !this.scene || !this.camera || !this.habitat) return;
    this.camera.position.set(
      Math.sin(this.angle) * 19,
      13,
      Math.cos(this.angle) * 19,
    );
    this.camera.lookAt(0, 2, 0);
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();
    if (this.drawnTime !== this.time) {
      this.habitat.update(this.time);
      this.drawnTime = this.time;
    }
    this.renderer.render(this.scene, this.camera);
  }
  private sync = () => {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    if (
      this.visible &&
      !document.hidden &&
      document.documentElement.dataset.motion !== "reduced" &&
      this.renderer &&
      !this.renderer.getContext().isContextLost()
    )
      this.frame = requestAnimationFrame(this.tick);
  };
  private tick = (now: number) => {
    if (now - this.last >= 1000 / 30) {
      this.time += this.last ? Math.min(now - this.last, 100) / 1000 : 0;
      this.last = now;
      this.draw();
    }
    this.frame = requestAnimationFrame(this.tick);
  };
  disconnectedCallback() {
    cancelAnimationFrame(this.frame);
    this.events?.abort();
    this.resize?.disconnect();
    this.intersection?.disconnect();
    this.preferences?.disconnect();
    this.habitat?.dispose();
    this.scene?.traverse((object) => {
      if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
    });
    this.renderer?.dispose();
    this.renderer = undefined;
    this.scene = undefined;
    this.habitat = undefined;
    delete this.dataset.ready;
  }
}
