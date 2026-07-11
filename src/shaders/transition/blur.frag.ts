import { easingGLSL } from '../common/easing';
import { globalUniformsGLSL } from '../common/uniforms';

export const blurFragmentShader = [
  globalUniformsGLSL,
  easingGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

vec4 rsuiBlurSample(vec2 uv, vec2 direction) {
  vec4 color = texture2D(inputTexture, uv) * 0.227027;
  color += texture2D(inputTexture, uv + direction * 1.384615) * 0.316216;
  color += texture2D(inputTexture, uv - direction * 1.384615) * 0.316216;
  color += texture2D(inputTexture, uv + direction * 3.230769) * 0.070270;
  color += texture2D(inputTexture, uv - direction * 3.230769) * 0.070270;
  return color;
}

void main() {
  float progress = rsuiEaseInOutCubic(transitionProgress);
  float phase = sin(progress * 3.14159265);
  vec2 texel = 1.0 / max(resolution, vec2(1.0));
  vec2 radial = normalize(vUv - mouse + vec2(0.0001));
  float radius = phase * (1.4 + min(velocity * 0.018, 2.2));
  vec2 direction = texel * radial * radius;

  vec4 blurred = rsuiBlurSample(vUv, direction);
  vec4 clear = texture2D(inputTexture, vUv);
  gl_FragColor = mix(clear, blurred, phase);
}
`,
].join('\n');
