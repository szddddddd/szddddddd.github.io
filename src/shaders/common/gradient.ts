export const gradientGLSL = /* glsl */ `
float rsuiRemap(float value, float inMin, float inMax, float outMin, float outMax) {
  float normalized = (value - inMin) / max(inMax - inMin, 0.00001);
  return mix(outMin, outMax, normalized);
}

vec3 rsuiGradient(float value, vec3 startColor, vec3 middleColor, vec3 endColor) {
  float t = clamp(value, 0.0, 1.0);
  float firstHalf = smoothstep(0.0, 0.58, t);
  float secondHalf = smoothstep(0.42, 1.0, t);
  return mix(mix(startColor, middleColor, firstHalf), endColor, secondHalf);
}

vec3 rsuiSpectrum(float value) {
  return rsuiGradient(
    value,
    vec3(0.028, 0.075, 0.145),
    vec3(0.120, 0.690, 0.920),
    vec3(0.835, 0.355, 0.950)
  );
}
`;
