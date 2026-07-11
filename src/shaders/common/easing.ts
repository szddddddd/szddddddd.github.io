export const easingGLSL = /* glsl */ `
float rsuiSaturate(float value) {
  return clamp(value, 0.0, 1.0);
}

float rsuiEaseOutCubic(float value) {
  float t = 1.0 - rsuiSaturate(value);
  return 1.0 - t * t * t;
}

float rsuiEaseInOutCubic(float value) {
  float t = rsuiSaturate(value);
  return t < 0.5
    ? 4.0 * t * t * t
    : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5;
}
`;
