import { globalUniformsGLSL } from '../common/uniforms';

export const vignetteFragmentShader = [
  globalUniformsGLSL,
  /* glsl */ `
uniform sampler2D inputTexture;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(inputTexture, vUv);
  float aspect = resolution.x / max(resolution.y, 1.0);
  vec2 point = (vUv - 0.5) * vec2(aspect, 1.0);
  float distanceToCenter = length(point);
  float cursorLift = 1.0 - smoothstep(0.0, 0.85, length(vUv - mouse));
  float edge = smoothstep(0.28, 0.86, distanceToCenter);
  float strength = mix(0.23, 0.13, clamp(theme, 0.0, 1.0));
  strength *= mix(0.76, 1.0, transitionProgress);
  strength *= 1.0 - cursorLift * 0.18;

  color.rgb *= 1.0 - edge * strength;
  gl_FragColor = color;
}
`,
].join('\n');
