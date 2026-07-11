import { Color, Vector2, Vector3 } from 'three';

export type NeuralFieldUniforms = {
  uTime: { value: number };
  uResolution: { value: Vector2 };
  uPointer: { value: Vector2 };
  uScroll: { value: number };
  uDensity: { value: number };
  uFlow: { value: number };
  uNoiseScale: { value: number };
  uBloom: { value: number };
  uVignette: { value: number };
  uTheme: { value: number };
  uRouteMix: { value: number };
  uPrimary: { value: Color };
  uSecondary: { value: Color };
  uCameraPosition: { value: Vector3 };
};

export function createNeuralFieldUniforms(): NeuralFieldUniforms {
  return {
    uTime: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uPointer: { value: new Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uDensity: { value: 0.72 },
    uFlow: { value: 0.18 },
    uNoiseScale: { value: 2.5 },
    uBloom: { value: 0.25 },
    uVignette: { value: 0.3 },
    uTheme: { value: 0 },
    uRouteMix: { value: 1 },
    uPrimary: { value: new Color('#77e0f5') },
    uSecondary: { value: new Color('#8b7cff') },
    uCameraPosition: { value: new Vector3() },
  };
}
