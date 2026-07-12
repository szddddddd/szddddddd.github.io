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

  float pixel = 1.0 / max(min(uResolution.x, uResolution.y), 1.0);
  float density = mix(7.0, 21.0, clamp(uDensity, 0.0, 1.0));
  float perspective = 1.45 - point.y * 0.58;
  vec2 gridPoint = vec2(point.x / perspective, 1.0 / perspective) * density;
  gridPoint += vec2(field * 0.55 + time * 0.06 + cameraShift, field * 0.24 + uScroll * 0.26 - time * 0.02);

  vec2 minorCell = abs(fract(gridPoint) - 0.5);
  float minorWidth = max(0.0045, pixel * density * 0.56);
  float minorGrid = 1.0 - smoothstep(minorWidth, minorWidth * 2.15, min(minorCell.x, minorCell.y));

  vec2 majorCell = abs(fract(gridPoint * 0.25) - 0.5);
  float majorWidth = max(0.0038, minorWidth * 0.72);
  float majorGrid = 1.0 - smoothstep(majorWidth, majorWidth * 2.25, min(majorCell.x, majorCell.y));

  vec3 color = spatialGradient(field + cursorGlow * 0.1, uPrimary, uSecondary);
  color += uPrimary * minorGrid * (0.07 + uBloom * 0.05);
  color += spatialGradient(field, uPrimary, uSecondary) * majorGrid * (0.12 + cursorGlow * 0.06);
  color += uSecondary * contour * (0.08 + cursorGlow * 0.08);
  color = mix(color, color * 0.76 + vec3(0.2), uTheme * 0.36);

  float vignette = smoothstep(0.22, 0.94, length(point));
  color *= 1.0 - vignette * uVignette;
  float grain = spatialHash(floor(vUv * uResolution * 0.55) + uTime * 0.1) - 0.5;
  color += grain * 0.012;
  float alpha = 0.045 + contour * 0.12 + minorGrid * 0.09 + majorGrid * 0.13;
  alpha *= mix(0.78, 1.0, uRouteMix);
  gl_FragColor = vec4(color, alpha);
}
`,
].join('\n');
