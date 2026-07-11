import { ShaderMaterial } from 'three';
import { neuralFieldFragmentShader } from './fragment';
import { neuralFieldVertexShader } from './vertex';
import { createNeuralFieldUniforms, type NeuralFieldUniforms } from './uniforms';

export type NeuralFieldMaterial = ShaderMaterial & { uniforms: NeuralFieldUniforms };

export function createNeuralFieldMaterial(): NeuralFieldMaterial {
  return new ShaderMaterial({
    uniforms: createNeuralFieldUniforms(),
    vertexShader: neuralFieldVertexShader,
    fragmentShader: neuralFieldFragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  }) as NeuralFieldMaterial;
}
