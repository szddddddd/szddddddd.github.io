/**
 * Requires noiseGLSL to be present before this source in a shader string.
 */
export const curlGLSL = /* glsl */ `
vec2 rsuiCurl(vec2 point) {
  const float epsilon = 0.0125;

  float left = rsuiNoise(point - vec2(epsilon, 0.0));
  float right = rsuiNoise(point + vec2(epsilon, 0.0));
  float bottom = rsuiNoise(point - vec2(0.0, epsilon));
  float top = rsuiNoise(point + vec2(0.0, epsilon));
  vec2 gradient = vec2(right - left, top - bottom) / (2.0 * epsilon);

  return normalize(vec2(gradient.y, -gradient.x) + vec2(0.00001));
}
`;
