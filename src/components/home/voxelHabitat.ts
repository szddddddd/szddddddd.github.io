import * as THREE from "three";
import { islandBounds } from "./islandTerrain";
import { buildHabitat } from "./coastalScene";
import { createLighthouseVolume } from "./lighthouseVolume";

export class VoxelHabitat extends HTMLElement {
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private habitat?: ReturnType<typeof buildHabitat>;
  private volume?: ReturnType<typeof createLighthouseVolume>;
  private resize?: ResizeObserver;
  private intersection?: IntersectionObserver;
  private preferences?: MutationObserver;
  private events?: AbortController;
  private frame = 0;
  private visible = false;
  private angle = 0.67;
  private zoom = 1.07;
  private viewTarget = islandBounds.getCenter(new THREE.Vector3());
  private last = 0;
  private time = 0;
  private drawnTime = -1;
  private fisheryUI = '';
  private raycaster = new THREE.Raycaster();
  private hoverAction?: 'sail'|'collect';
  private pickFishery(clientX:number,clientY:number) {
    if(!this.camera||!this.habitat)return;
    const rect=this.querySelector('canvas')!.getBoundingClientRect();
    this.scene!.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1),this.camera);
    return this.raycaster.intersectObjects(this.habitat.fishery.targets,false)[0]?.object.userData.fisheryAction as 'sail'|'collect'|undefined;
  }
  private fisheryAction(action:'sail'|'collect') {
    if(!this.habitat)return;
    if(action==='sail')this.habitat.fishery.start(document.documentElement.dataset.motion==='reduced');
    else this.habitat.fishery.collect();
    this.drawnTime=-1;this.draw();
  }
  private updateFisheryUI() {
    if(!this.habitat)return;
    const state=this.habitat.fishery.getState();
    const key=JSON.stringify(state);if(key===this.fisheryUI)return;this.fisheryUI=key;
    this.querySelector<HTMLButtonElement>('[data-fishery="sail"]')!.disabled=state.busy||state.pending>0;
    this.querySelector<HTMLButtonElement>('[data-fishery="collect"]')!.disabled=state.busy;
  }

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
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -48,
      right: 48,
      top: 48,
      bottom: -48,
      near: 1,
      far: 140,
    });
    sun.shadow.normalBias = 0.01;
    sun.shadow.bias = -0.00015;
    this.scene.add(sun);
    this.habitat = buildHabitat(this.scene);
    this.habitat.setReducedMotion(document.documentElement.dataset.motion==='reduced');
    islandBounds.getCenter(this.viewTarget);
    this.volume = createLighthouseVolume(this.scene.getObjectByName("lighthouse-spotlight") as THREE.SpotLight);
    this.drawnTime = -1;
    const fit = () => {
      if (!this.renderer || !this.camera) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const aspect = bounds.width / bounds.height;
      const size=islandBounds.getSize(new THREE.Vector3());
      const radius=Math.hypot(size.x,size.z)/2;
      const halfHeight = Math.max(25, radius / aspect, size.y*.5+radius*.6);
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
    const setZoom = (value: number) => { this.zoom = THREE.MathUtils.clamp(value,.75,4.5); this.draw(); };
    this.querySelectorAll<HTMLButtonElement>('[data-zoom]').forEach(button => button.addEventListener('click', () => {
      if(button.dataset.zoom==='reset') { islandBounds.getCenter(this.viewTarget); this.angle=.67; setZoom(1.07); }
      else setZoom(this.zoom*(button.dataset.zoom==='in'?1.25:.8));
    },options));
    canvas.addEventListener('wheel',event=>{event.preventDefault();setZoom(this.zoom*Math.exp(-event.deltaY*.0015));},{...options,passive:false});
    canvas.addEventListener('contextmenu',event=>event.preventDefault(),options);
    this.querySelectorAll<HTMLButtonElement>('[data-fishery]').forEach(button=>button.addEventListener('click',()=>this.fisheryAction(button.dataset.fishery as 'sail'|'collect'),options));
    let drag: { moved:boolean; id: number; x: number; y:number; angle: number; pan:boolean; focus:THREE.Vector3 } | undefined;
    canvas.addEventListener(
      "pointerdown",
      (event) => {
        if ((event.button !== 0 && event.button !== 2) || !event.isPrimary) return;
        drag = { moved:false,id: event.pointerId, x: event.clientX, y:event.clientY, angle: this.angle, pan:event.button===2||event.shiftKey, focus:this.viewTarget.clone() };
        canvas.setPointerCapture(event.pointerId);
      },
      options,
    );
    canvas.addEventListener(
      "pointermove",
      (event) => {
        if(!drag) {
          const action=this.pickFishery(event.clientX,event.clientY);
          if(action!==this.hoverAction){this.hoverAction=action;this.habitat?.fishery.hover(action);canvas.style.cursor=action?'pointer':'grab';
this.draw();}
          return;
        }
        if(drag.id!==event.pointerId)return;
        if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6)drag.moved=true;
        if(!drag.moved)return;
        if(drag.pan) {
          const dx=(event.clientX-drag.x)*.045/this.zoom,dy=(event.clientY-drag.y)*.065/this.zoom;
          this.viewTarget.set(drag.focus.x-dx*Math.cos(this.angle)-dy*Math.sin(this.angle),drag.focus.y,drag.focus.z+dx*Math.sin(this.angle)-dy*Math.cos(this.angle));
        } else this.angle = drag.angle - (event.clientX - drag.x) * 0.009;
        this.draw();
      },
      options,
    );
    const endDrag = () => {
      drag = undefined;
    };
    canvas.addEventListener('pointerup',event=>{
      if(drag&&drag.id===event.pointerId&&!drag.moved&&!drag.pan&&event.button===0){const action=this.pickFishery(event.clientX,event.clientY);if(action)this.fisheryAction(action);}
      endDrag();
    },options);
    canvas.addEventListener('pointerleave',()=>{if(!drag){this.hoverAction=undefined;this.habitat?.fishery.hover(undefined);canvas.title='';canvas.style.cursor='grab';this.draw();}},options);
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
      Math.sin(this.angle) * 57 + this.viewTarget.x,
      48,
      Math.cos(this.angle) * 57 + this.viewTarget.z,
    );
    this.camera.lookAt(this.viewTarget);
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();
    if (this.drawnTime !== this.time) {
      this.habitat.update(this.time);
      this.drawnTime = this.time;
    }
    this.updateFisheryUI();
    this.volume!.render(this.renderer, this.scene, this.camera);
  }
  private sync = () => {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    this.habitat?.setReducedMotion(document.documentElement.dataset.motion==='reduced');
    if(document.documentElement.dataset.motion==='reduced'){this.habitat?.fishery.setReduced();this.drawnTime=-1;this.draw();}
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
    this.volume?.dispose();
    this.volume = undefined;
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
