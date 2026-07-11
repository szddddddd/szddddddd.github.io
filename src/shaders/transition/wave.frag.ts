import { easingGLSL } from '../common/easing';
import { globalUniformsGLSL } from '../common/uniforms';

export const waveFragmentShader = [
  globalUniformsGLSL,
  easingGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

void main() {
  float progress = rsuiEaseInOutCubic(transitionProgress);
  float phase = sin(progress * 3.14159265);
  float wave = sin((vUv.y + scroll * 0.16) * 18.0 + time * 0.33 + mouse.x * 4.0);
  float offset = wave * 0.026 * phase;
  vec2 displacement = vec2(offset, wave * 0.004) * phase;

  gl_FragColor = texture2D(inputTexture, vUv + displacement);
}
`,
].join('\n');
