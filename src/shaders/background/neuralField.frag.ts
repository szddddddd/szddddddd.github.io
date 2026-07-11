import { easingGLSL } from '../common/easing';
import { fbmGLSL } from '../common/fbm';
import { gradientGLSL } from '../common/gradient';
import { noiseGLSL } from '../common/noise';
import { globalUniformsGLSL } from '../common/uniforms';

export const neuralFieldFragmentShader = [
  globalUniformsGLSL,
  noiseGLSL,
  fbmGLSL,
  gradientGLSL,
  easingGLSL,
  /* glsl */ `
varying vec2 vUv;

void main() {
  float aspect = resolution.x / max(resolution.y, 1.0);
  vec2 point = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 cursor = (mouse - 0.5) * vec2(aspect, 1.0);
  float slowTime = time * 0.045;

  float field = rsuiFbm(point * 2.65 + vec2(slowTime, scroll * 0.45 - slowTime * 0.6) + page * 0.17);
  float detail = rsuiFbm(point * 7.4 + vec2(-slowTime * 1.9, slowTime) + field);
  float contour = smoothstep(0.58, 0.79, field + detail * 0.23);
  float cursorGlow = 1.0 - smoothstep(0.0, 0.48, length(point - cursor));
  float motion = clamp(velocity * 0.035, 0.0, 0.22);
  float energy = contour * (0.76 + motion) + cursorGlow * 0.42;

  vec3 color = rsuiGradient(
    clamp(0.22 + energy, 0.0, 1.0),
    vec3(0.012, 0.029, 0.075),
    vec3(0.075, 0.500, 0.730),
    vec3(0.740, 0.260, 0.900)
  );
  color = mix(color, vec3(0.570, 0.710, 0.790), clamp(theme, 0.0, 1.0) * 0.42);

  float reveal = rsuiEaseOutCubic(transitionProgress);
  float alpha = (0.16 + energy * 0.58) * reveal;
  gl_FragColor = vec4(color * (0.62 + energy * 0.62), alpha);
}
`,
].join('\n');
