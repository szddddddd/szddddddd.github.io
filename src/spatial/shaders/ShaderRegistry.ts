import type { ResourceManager } from '../resources/ResourceManager';
import { createNeuralFieldMaterial, type NeuralFieldMaterial } from './programs/neural-field/createMaterial';

export type ShaderProgramKey = 'neural-field';

/** Keeps shader creation keyed and owned without recompiling on route changes. */
export class ShaderRegistry {
  constructor(private readonly resources: ResourceManager) {}

  createNeuralFieldMaterial(): NeuralFieldMaterial {
    return this.resources.acquire('material:neural-field', createNeuralFieldMaterial);
  }

  release(program: ShaderProgramKey): void {
    this.resources.release(`material:${program}`);
  }
}
