import { ACESFilmicToneMapping, SRGBColorSpace, WebGLRenderer } from 'three';
import type { SpatialQuality } from '../core/EventBus';

export type RendererCallbacks = Readonly<{
  onContextLost(): void;
  onContextRestored(): void;
}>;

export class SpatialRenderer {
  readonly instance: WebGLRenderer;
  readonly canvas: HTMLCanvasElement;

  private readonly abortController = new AbortController();
  private quality: SpatialQuality;

  constructor(host: HTMLElement, quality: SpatialQuality, callbacks: RendererCallbacks) {
    this.quality = quality;
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: quality === 'full',
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.canvas = this.instance.domElement;
    this.canvas.className = 'spatial-engine-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.canvas.setAttribute('role', 'presentation');
    this.instance.outputColorSpace = SRGBColorSpace;
    this.instance.toneMapping = ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.9;
    this.instance.setClearAlpha(0);
    this.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      callbacks.onContextLost();
    }, { signal: this.abortController.signal });
    this.canvas.addEventListener('webglcontextrestored', callbacks.onContextRestored, { signal: this.abortController.signal });
    host.replaceChildren(this.canvas);
  }

  resize(width: number, height: number): void {
    this.instance.setPixelRatio(this.getPixelRatio());
    this.instance.setSize(Math.max(1, width), Math.max(1, height), false);
  }

  setQuality(quality: SpatialQuality): void {
    this.quality = quality;
  }

  get pixelRatio(): number {
    return this.instance.getPixelRatio();
  }

  dispose(): void {
    this.abortController.abort();
    this.instance.dispose();
    this.canvas.remove();
  }

  private getPixelRatio(): number {
    const devicePixelRatio = window.devicePixelRatio || 1;
    return this.quality === 'reduced' ? 1 : Math.min(devicePixelRatio, 1.5);
  }
}
