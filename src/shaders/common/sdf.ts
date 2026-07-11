export const sdfGLSL = /* glsl */ `
float rsuiSdCircle(vec2 point, float radius) {
  return length(point) - radius;
}

float rsuiSdRoundedBox(vec2 point, vec2 halfSize, float radius) {
  vec2 distance = abs(point) - halfSize + radius;
  return min(max(distance.x, distance.y), 0.0) + length(max(distance, 0.0)) - radius;
}

float rsuiSmoothUnion(float firstDistance, float secondDistance, float softness) {
  float blend = clamp(0.5 + 0.5 * (secondDistance - firstDistance) / softness, 0.0, 1.0);
  return mix(secondDistance, firstDistance, blend) - softness * blend * (1.0 - blend);
}
`;
