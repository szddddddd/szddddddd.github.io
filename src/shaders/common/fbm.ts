/**
 * Requires noiseGLSL to be present before this source in a shader string.
 */
export const fbmGLSL = /* glsl */ `
float rsuiFbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int octave = 0; octave < 5; octave++) {
    value += amplitude * rsuiNoise(point);
    point = mat2(0.80, 0.60, -0.60, 0.80) * point * 2.02 + 13.7;
    amplitude *= 0.5;
  }

  return value / 0.96875;
}
`;
