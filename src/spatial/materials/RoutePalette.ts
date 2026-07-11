import { Color } from 'three';
import type { RouteState } from '../config/routeStates';
import type { NeuralFieldUniforms } from '../shaders/programs/neural-field/uniforms';

/** Applies route visual values to one persistent shader material. */
export function applyRoutePalette(uniforms: NeuralFieldUniforms, state: RouteState): void {
  uniforms.uPrimary.value.set(state.primaryColor);
  uniforms.uSecondary.value.set(state.secondaryColor);
  uniforms.uDensity.value = state.particleDensity;
  uniforms.uFlow.value = state.flowStrength;
  uniforms.uNoiseScale.value = state.noiseScale;
  uniforms.uBloom.value = state.bloomIntensity;
  uniforms.uVignette.value = state.vignetteIntensity;
}

export type RoutePaletteValues = {
  primary: Color;
  secondary: Color;
  density: number;
  flow: number;
  noiseScale: number;
  bloom: number;
  vignette: number;
};

export function createRoutePaletteValues(state: RouteState): RoutePaletteValues {
  return {
    primary: new Color(state.primaryColor),
    secondary: new Color(state.secondaryColor),
    density: state.particleDensity,
    flow: state.flowStrength,
    noiseScale: state.noiseScale,
    bloom: state.bloomIntensity,
    vignette: state.vignetteIntensity,
  };
}
