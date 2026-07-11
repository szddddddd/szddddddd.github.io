/**
 * The single value-noise implementation used by all RSUI shader sources.
 */
export const noiseGLSL = /* glsl */ `
float rsuiHash12(vec2 point) {
  point = fract(point * vec2(443.8975, 397.2973));
  point += dot(point, point.yx + 19.19);
  return fract(point.x * point.y);
}

float rsuiNoise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  vec2 curve = local * local * (3.0 - 2.0 * local);

  float a = rsuiHash12(cell);
  float b = rsuiHash12(cell + vec2(1.0, 0.0));
  float c = rsuiHash12(cell + vec2(0.0, 1.0));
  float d = rsuiHash12(cell + vec2(1.0, 1.0));

  return mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y);
}
`;
