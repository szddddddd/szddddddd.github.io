import type { Camera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { bloomFragmentShader, grainFragmentShader, vignetteFragmentShader } from '../shaders/post';
import { blurFragmentShader, dissolveFragmentShader } from '../shaders/transition';
import type { SharedUniforms } from './ShaderPipeline';

type SharedPass = ShaderPass & { uniforms: SharedUniforms & { inputTexture: { value: unknown } } };

const fullscreenVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export class PostProcess {
  private readonly composer?: EffectComposer;
  private readonly sharedPasses: SharedPass[] = [];

  constructor(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: Camera,
    enabled: boolean,
  ) {
    if (!enabled) return;

    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.sharedPasses.push(
      this.createSharedPass(bloomFragmentShader),
      this.createSharedPass(dissolveFragmentShader),
      this.createSharedPass(blurFragmentShader),
      this.createSharedPass(vignetteFragmentShader),
      this.createSharedPass(grainFragmentShader),
    );
    this.sharedPasses.forEach((pass) => this.composer?.addPass(pass));
    this.composer.addPass(new OutputPass());
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.composer?.setPixelRatio(pixelRatio);
    this.composer?.setSize(width, height);
  }

  sync(uniforms: SharedUniforms): void {
    this.sharedPasses.forEach((pass) => {
      Object.entries(uniforms).forEach(([key, uniform]) => {
        if (pass.uniforms[key]) pass.uniforms[key].value = uniform.value;
      });
    });
  }

  render(renderer: WebGLRenderer, scene: Scene, camera: Camera): void {
    if (this.composer) {
      this.composer.render();
      return;
    }
    renderer.render(scene, camera);
  }

  dispose(): void {
    this.composer?.dispose();
  }

  private createSharedPass(fragmentShader: string): SharedPass {
    const uniforms: SharedUniforms & { inputTexture: { value: null } } = {
      time: { value: 0 },
      resolution: { value: null },
      mouse: { value: null },
      scroll: { value: 0 },
      theme: { value: 0 },
      page: { value: 0 },
      velocity: { value: 0 },
      transitionProgress: { value: 1 },
      inputTexture: { value: null },
    };

    return new ShaderPass({ uniforms, vertexShader: fullscreenVertexShader, fragmentShader }, 'inputTexture') as SharedPass;
  }
}
