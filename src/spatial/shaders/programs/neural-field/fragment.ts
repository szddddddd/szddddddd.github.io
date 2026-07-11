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

  // Route motifs intentionally derive from the camera coordinate that RouteTransition already tweens.
  // This keeps every route inside the same compiled program and material instance.
  float routeCoordinate = clamp((uCameraPosition.x + 0.5) / 5.0, 0.0, 4.0);
  float aboutRoute = 1.0 - smoothstep(0.28, 0.72, abs(routeCoordinate - 1.0));
  float projectsRoute = 1.0 - smoothstep(0.28, 0.72, abs(routeCoordinate - 2.0));
  float publicationsRoute = 1.0 - smoothstep(0.28, 0.72, abs(routeCoordinate - 3.0));
  float notesRoute = 1.0 - smoothstep(0.28, 0.72, abs(routeCoordinate - 4.0));

  vec2 identityPoint = point - vec2(-0.16, 0.02);
  float identityOrbit = 1.0 - smoothstep(0.008, 0.022, abs(length(identityPoint * vec2(1.12, 0.76)) - 0.31));
  float identityOrbitInner = 1.0 - smoothstep(0.006, 0.018, abs(length(identityPoint * vec2(0.74, 1.3)) - 0.18));
  float identityAxis = max(1.0 - smoothstep(0.004, 0.018, abs(identityPoint.x)), 1.0 - smoothstep(0.004, 0.018, abs(identityPoint.y)));
  float identityMarkers = step(0.96, spatialHash(floor(identityPoint * 18.0) + 11.0)) * (1.0 - smoothstep(0.012, 0.048, length(fract(identityPoint * 9.0) - 0.5)));

  float scanCoordinate = point.y * 8.0 - time * 0.8;
  float scanLine = 1.0 - smoothstep(0.012, 0.06, abs(fract(scanCoordinate) - 0.5));
  float scanWindow = smoothstep(0.18, 0.44, sin(point.x * 2.4 + time * 0.4) * 0.5 + 0.5);
  float scanBands = scanLine * (0.36 + scanWindow * 0.64);

  vec2 archiveCells = abs(fract((point + vec2(0.04, 0.01)) * vec2(10.0, 7.0)) - 0.5);
  float archiveGrid = max(1.0 - smoothstep(0.46, 0.495, archiveCells.x), 1.0 - smoothstep(0.45, 0.49, archiveCells.y));
  float citationLine = 1.0 - smoothstep(0.004, 0.018, abs(point.y + point.x * 0.22 - 0.1));
  float citationTicks = step(0.72, fract(point.x * 4.0 + 0.4)) * citationLine;

  vec2 noteA = vec2(-0.44, 0.14);
  vec2 noteB = vec2(-0.1, -0.12);
  vec2 noteC = vec2(0.22, 0.18);
  vec2 noteD = vec2(0.48, -0.16);
  float noteNodes = 0.0;
  noteNodes += 1.0 - smoothstep(0.018, 0.042, length(point - noteA));
  noteNodes += 1.0 - smoothstep(0.018, 0.042, length(point - noteB));
  noteNodes += 1.0 - smoothstep(0.018, 0.042, length(point - noteC));
  noteNodes += 1.0 - smoothstep(0.018, 0.042, length(point - noteD));
  float noteLinks = 0.0;
  noteLinks += 1.0 - smoothstep(0.004, 0.016, abs((point.y - noteA.y) * (noteB.x - noteA.x) - (point.x - noteA.x) * (noteB.y - noteA.y)));
  noteLinks += 1.0 - smoothstep(0.004, 0.016, abs((point.y - noteB.y) * (noteC.x - noteB.x) - (point.x - noteB.x) * (noteC.y - noteB.y)));
  noteLinks += 1.0 - smoothstep(0.004, 0.016, abs((point.y - noteC.y) * (noteD.x - noteC.x) - (point.x - noteC.x) * (noteD.y - noteC.y)));
  noteLinks *= step(-0.5, point.x) * step(point.x, 0.55);

  vec3 color = spatialGradient(field + cursorGlow * 0.24, uPrimary, uSecondary);
  color += spatialGradient(seed, uPrimary, uSecondary) * particle * (0.35 + uBloom * 0.2);
  color += uPrimary * contour * (0.13 + cursorGlow * 0.14);
  color += uPrimary * (identityOrbit + identityOrbitInner + identityAxis * 0.46 + identityMarkers * 0.8) * aboutRoute * 0.42;
  color += spatialGradient(point.x * 0.25 + time * 0.08, uPrimary, uSecondary) * scanBands * projectsRoute * 0.52;
  color += uPrimary * (archiveGrid * 0.34 + citationLine * 0.45 + citationTicks * 0.38) * publicationsRoute;
  color += spatialGradient(point.x + point.y, uPrimary, uSecondary) * (noteNodes * 0.8 + noteLinks * 0.34) * notesRoute;
  color = mix(color, color * 0.76 + vec3(0.2), uTheme * 0.36);

  float vignette = smoothstep(0.22, 0.94, length(point));
  color *= 1.0 - vignette * uVignette;
  float grain = spatialHash(floor(vUv * uResolution * 0.55) + uTime * 0.1) - 0.5;
  color += grain * 0.012;
  float routeDetail = aboutRoute * (identityOrbit + identityOrbitInner + identityAxis * 0.4)
    + projectsRoute * scanBands
    + publicationsRoute * (archiveGrid * 0.45 + citationLine * 0.45)
    + notesRoute * (noteNodes * 0.72 + noteLinks * 0.3);
  float alpha = 0.28 + contour * 0.28 + particle * 0.22 + routeDetail * 0.34;
  alpha *= mix(0.78, 1.0, uRouteMix);
  gl_FragColor = vec4(color, alpha);
}
`,
].join('\n');
