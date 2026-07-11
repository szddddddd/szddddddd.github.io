import { globalUniformsGLSL } from '../common/uniforms';

export const bloomFragmentShader = [
  globalUniformsGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

vec3 rsuiBrightSample(vec2 uv) {
  vec3 color = texture2D(inputTexture, uv).rgb;
  float brightness = max(max(color.r, color.g), color.b);
  return color * smoothstep(0.54, 1.0, brightness);
}

void main() {
  vec2 texel = 1.0 / max(resolution, vec2(1.0));
  vec3 base = texture2D(inputTexture, vUv).rgb;
  vec3 bloom = rsuiBrightSample(vUv) * 0.28;
  bloom += rsuiBrightSample(vUv + vec2(texel.x * 2.0, 0.0)) * 0.18;
  bloom += rsuiBrightSample(vUv - vec2(texel.x * 2.0, 0.0)) * 0.18;
  bloom += rsuiBrightSample(vUv + vec2(0.0, texel.y * 2.0)) * 0.18;
  bloom += rsuiBrightSample(vUv - vec2(0.0, texel.y * 2.0)) * 0.18;

  float strength = mix(0.13, 0.08, clamp(theme, 0.0, 1.0));
  strength += min(velocity * 0.0015, 0.025);
  gl_FragColor = vec4(base + bloom * strength, 1.0);
}
`,
].join('\n');
