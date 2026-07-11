import { easingGLSL } from '../common/easing';
import { noiseGLSL } from '../common/noise';
import { globalUniformsGLSL } from '../common/uniforms';

export const dissolveFragmentShader = [
  globalUniformsGLSL,
  noiseGLSL,
  easingGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

void main() {
  float progress = rsuiEaseInOutCubic(transitionProgress);
  float phase = sin(progress * 3.14159265);
  float noise = rsuiNoise(vUv * 4.3 + vec2(time * 0.035, page * 0.21));
  float mask = smoothstep(0.22, 0.78, noise);
  float edge = 1.0 - smoothstep(0.0, 0.16, abs(mask - 0.5));
  vec2 push = (vUv - mouse) * (0.006 + min(velocity * 0.0005, 0.012));

  vec4 color = texture2D(inputTexture, vUv + push * (mask - 0.5) * phase * 2.0);
  color.rgb += mix(vec3(0.050, 0.650, 1.000), vec3(0.980, 0.430, 0.900), theme) * edge * phase * 0.11;

  gl_FragColor = color;
}
`,
].join('\n');
