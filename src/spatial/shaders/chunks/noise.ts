export const noiseGLSL = /* glsl */ `
float spatialHash(vec2 point) {
  point = fract(point * vec2(443.8975, 397.2973));
  point += dot(point, point.yx + 19.19);
  return fract(point.x * point.y);
}

float spatialNoise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  vec2 curve = local * local * (3.0 - 2.0 * local);
  float a = spatialHash(cell);
  float b = spatialHash(cell + vec2(1.0, 0.0));
  float c = spatialHash(cell + vec2(0.0, 1.0));
  float d = spatialHash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y);
}
`;
