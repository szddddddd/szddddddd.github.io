import { easingGLSL } from '../common/easing';
import { fbmGLSL } from '../common/fbm';
import { gradientGLSL } from '../common/gradient';
import { noiseGLSL } from '../common/noise';
import { globalUniformsGLSL } from '../common/uniforms';

export const particleFieldFragmentShader = [
  globalUniformsGLSL,
  noiseGLSL,
  fbmGLSL,
  gradientGLSL,
  easingGLSL,
  /* glsl */ `
varying vec2 vUv;

void main() {
  float density = mix(21.0, 46.0, clamp(resolution.x / 1800.0, 0.0, 1.0));
  vec2 grid = vUv * density;
  vec2 cell = floor(grid);
  float seed = rsuiHash12(cell + page * 7.13);
  vec2 direction = vec2(cos(seed * 6.28318), sin(seed * 6.28318));
  vec2 local = fract(grid + direction * (time * (0.012 + seed * 0.018) + scroll * 0.14)) - 0.5;
  vec2 offset = direction * (seed - 0.5) * 0.23;
  float radius = mix(0.026, 0.105, seed);
  float particle = 1.0 - smoothstep(radius, radius + 0.028, length(local - offset));
  float field = rsuiFbm(cell * 0.16 + time * 0.018);
  float pointer = 1.0 - smoothstep(0.0, 0.25, length(vUv - mouse));
  float intensity = particle * (0.42 + field * 0.58 + pointer * 0.28);

  vec3 color = rsuiGradient(
    seed + field * 0.24,
    vec3(0.100, 0.300, 0.550),
    vec3(0.250, 0.860, 0.900),
    vec3(0.920, 0.440, 0.920)
  );
  color = mix(color, vec3(0.480, 0.540, 0.620), clamp(theme, 0.0, 1.0) * 0.42);

  float alpha = intensity * 0.62 * rsuiEaseOutCubic(transitionProgress);
  gl_FragColor = vec4(color, alpha);
}
`,
].join('\n');
