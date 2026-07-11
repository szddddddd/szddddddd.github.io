export const gradientGLSL = /* glsl */ `
vec3 spatialGradient(float value, vec3 primary, vec3 secondary) {
  float blend = smoothstep(0.08, 0.92, clamp(value, 0.0, 1.0));
  return mix(primary, secondary, blend);
}
`;
