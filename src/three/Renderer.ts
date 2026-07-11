import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

export type RendererQuality = 'full' | 'reduced';

export class Renderer {
  readonly instance: WebGLRenderer;
  readonly canvas: HTMLCanvasElement;

  private quality: RendererQuality;

  constructor(host: HTMLElement, quality: RendererQuality) {
    this.quality = quality;
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: quality === 'full',
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.canvas = this.instance.domElement;
    this.canvas.className = 'rsui-engine-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.canvas.setAttribute('role', 'presentation');
    this.instance.outputColorSpace = SRGBColorSpace;
    this.instance.toneMapping = ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.92;
    this.instance.setClearAlpha(0);
    host.replaceChildren(this.canvas);
  }

  resize(width: number, height: number): void {
    const pixelRatio = this.getPixelRatio();
    this.instance.setPixelRatio(pixelRatio);
    this.instance.setSize(Math.max(1, width), Math.max(1, height), false);
  }

  get pixelRatio(): number {
    return this.instance.getPixelRatio();
  }

  setQuality(quality: RendererQuality): void {
    this.quality = quality;
    this.resize(window.innerWidth, window.innerHeight);
  }

  render(scene: Parameters<WebGLRenderer['render']>[0], camera: Parameters<WebGLRenderer['render']>[1]): void {
    this.instance.render(scene, camera);
  }

  dispose(): void {
    this.instance.dispose();
    this.canvas.remove();
  }

  private getPixelRatio(): number {
    const devicePixelRatio = window.devicePixelRatio || 1;
    if (this.quality === 'reduced' || window.innerWidth < 768) return 1;
    return Math.min(devicePixelRatio, 1.5);
  }
}
