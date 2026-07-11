import { curlGLSL } from '../common/curl';
import { easingGLSL } from '../common/easing';
import { gradientGLSL } from '../common/gradient';
import { noiseGLSL } from '../common/noise';
import { globalUniformsGLSL } from '../common/uniforms';

export const flowFieldFragmentShader = [
  globalUniformsGLSL,
  noiseGLSL,
  curlGLSL,
  gradientGLSL,
  easingGLSL,
  /* glsl */ `
varying vec2 vUv;

void main() {
  float aspect = resolution.x / max(resolution.y, 1.0);
  vec2 point = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 flow = rsuiCurl(point * 2.35 + vec2(time * 0.052, -time * 0.038) + page * 0.11);
  float lanes = sin(
    (point.x + flow.x * 0.34) * 28.0
    + (point.y + flow.y * 0.58 + scroll * 0.32) * 17.0
    + time * 0.24
  );
  float filament = smoothstep(0.84, 1.0, 0.5 + 0.5 * lanes);
  float cursorLift = 1.0 - smoothstep(0.0, 0.72, length(vUv - mouse));
  float intensity = filament * (0.44 + cursorLift * 0.56 + min(velocity * 0.025, 0.2));

  vec3 color = rsuiGradient(
    0.34 + flow.x * 0.32 + cursorLift * 0.18,
    vec3(0.030, 0.090, 0.170),
    vec3(0.130, 0.730, 0.810),
    vec3(0.830, 0.340, 0.900)
  );
  color = mix(color, vec3(0.400, 0.520, 0.600), clamp(theme, 0.0, 1.0) * 0.34);

  float alpha = intensity * 0.38 * rsuiEaseInOutCubic(transitionProgress);
  gl_FragColor = vec4(color, alpha);
}
`,
].join('\n');
