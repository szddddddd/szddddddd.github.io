export const lightingGLSL = /* glsl */ `
float rsuiFresnel(vec3 normal, vec3 viewDirection, float power) {
  float facing = 1.0 - max(dot(normalize(normal), normalize(viewDirection)), 0.0);
  return pow(facing, power);
}

float rsuiRimLight(vec3 normal, vec3 viewDirection, float width) {
  return smoothstep(1.0 - width, 1.0, rsuiFresnel(normal, viewDirection, 1.0));
}

vec3 rsuiSoftLight(vec3 baseColor, vec3 lightColor, float amount) {
  float strength = clamp(amount, 0.0, 1.0);
  return mix(baseColor, 1.0 - (1.0 - baseColor) * (1.0 - lightColor), strength);
}
`;
