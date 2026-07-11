import { noiseGLSL } from '../common/noise';
import { globalUniformsGLSL } from '../common/uniforms';

export const grainFragmentShader = [
  globalUniformsGLSL,
  noiseGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(inputTexture, vUv);
  float noise = rsuiNoise(vUv * resolution * 0.72 + vec2(time * 19.0, scroll * 43.0)) - 0.5;
  float amount = mix(0.018, 0.007, clamp(theme, 0.0, 1.0));
  amount *= mix(0.55, 1.0, transitionProgress);

  color.rgb += noise * amount;
  gl_FragColor = color;
}
`,
].join('\n');
