import { fbmGLSL } from '../../chunks/fbm';
import { gradientGLSL } from '../../chunks/gradient';
import { noiseGLSL } from '../../chunks/noise';
import { fieldUniformsGLSL } from '../../chunks/uniforms';

export const neuralFieldFragmentShader = [
  'precision highp float;',
  fieldUniformsGLSL,
  noiseGLSL,
  fbmGLSL,
  gradientGLSL,
  /* glsl */ `
varying vec2 vUv;

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 point = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
  float cameraShift = (uCameraPosition.x + uCameraPosition.y * 0.5) * 0.018;
  float time = uTime * uFlow;
  float field = spatialFbm(point * uNoiseScale + vec2(time * 0.11 + cameraShift, uScroll * 0.38 - time * 0.06));
  float contour = smoothstep(0.48, 0.8, field);
  float cursorGlow = 1.0 - smoothstep(0.0, 0.48, length(point - pointer));

  float density = mix(13.0, 38.0, clamp(uDensity, 0.0, 1.0));
  vec2 cells = point * density;
  vec2 cell = floor(cells);
  vec2 local = fract(cells) - 0.5;
  float seed = spatialHash(cell + 17.0);
  float particle = 1.0 - smoothstep(0.022, 0.072, length(local - vec2(sin(time + seed * 6.28), cos(time * 0.7 + seed * 6.28)) * 0.16));

  vec3 color = spatialGradient(field + cursorGlow * 0.24, uPrimary, uSecondary);
  color += spatialGradient(seed, uPrimary, uSecondary) * particle * (0.35 + uBloom * 0.2);
  color += uPrimary * contour * (0.13 + cursorGlow * 0.14);
  color = mix(color, color * 0.76 + vec3(0.2), uTheme * 0.36);

  float vignette = smoothstep(0.22, 0.94, length(point));
  color *= 1.0 - vignette * uVignette;
  float grain = spatialHash(floor(vUv * uResolution * 0.55) + uTime * 0.1) - 0.5;
  color += grain * 0.012;
  float alpha = 0.36 + contour * 0.34 + particle * 0.31;
  alpha *= mix(0.78, 1.0, uRouteMix);
  gl_FragColor = vec4(color, alpha);
}
`,
].join('\n');
