import { ShaderMaterial, Vector2, type IUniform } from 'three';
import type { RSUIPage, RSUITheme } from '../core/EngineState';
import { pageIndex } from '../core/EngineState';
import { flowFieldFragmentShader, neuralFieldFragmentShader, neuralFieldVertexShader } from '../shaders/background';

export type SharedUniforms = Record<string, IUniform>;

export class ShaderPipeline {
  readonly uniforms: SharedUniforms = {
    time: { value: 0 },
    resolution: { value: new Vector2(1, 1) },
    mouse: { value: new Vector2(0.5, 0.5) },
    scroll: { value: 0 },
    theme: { value: 0 },
    page: { value: 0 },
    velocity: { value: 0 },
    transitionProgress: { value: 1 },
  };

  constructor(private readonly quality: 'full' | 'reduced' = 'full') {}

  createBackgroundMaterial(): ShaderMaterial {
    return new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: neuralFieldVertexShader,
      fragmentShader: this.quality === 'full' ? neuralFieldFragmentShader : flowFieldFragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
  }

  setResolution(width: number, height: number, pixelRatio: number): void {
    (this.uniforms.resolution.value as Vector2).set(width * pixelRatio, height * pixelRatio);
  }

  setPointer(clientX: number, clientY: number): void {
    const pointer = this.uniforms.mouse.value as Vector2;
    pointer.set(
      clientX / Math.max(1, window.innerWidth),
      1 - clientY / Math.max(1, window.innerHeight),
    );
  }

  setScroll(scroll: number): void {
    this.uniforms.scroll.value = scroll;
  }

  setTheme(theme: RSUITheme): void {
    this.uniforms.theme.value = theme === 'light' ? 1 : 0;
  }

  setPage(page: RSUIPage): void {
    this.uniforms.page.value = pageIndex(page);
  }

  setTransition(progress: number): void {
    this.uniforms.transitionProgress.value = progress;
  }

  update(elapsed: number, velocity: number): void {
    this.uniforms.time.value = elapsed;
    this.uniforms.velocity.value = velocity;
  }
}
