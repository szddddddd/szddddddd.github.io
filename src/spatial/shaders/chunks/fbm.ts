export const fbmGLSL = /* glsl */ `
float spatialFbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    value += spatialNoise(point) * amplitude;
    point = mat2(0.8, 0.6, -0.6, 0.8) * point * 2.02 + 13.7;
    amplitude *= 0.5;
  }
  return value / 0.9375;
}
`;
