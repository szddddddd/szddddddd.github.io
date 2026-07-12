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

const float PI = 3.14159265359;

mat2 spatialRotate(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float spatialSegment(vec2 point, vec2 start, vec2 end, float width) {
  vec2 offset = point - start;
  vec2 segment = end - start;
  float projection = clamp(dot(offset, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
  float distanceToSegment = length(offset - segment * projection);
  return 1.0 - smoothstep(width, width * 2.25, distanceToSegment);
}

float spatialStructureWeight(float index) {
  return max(0.0, 1.0 - abs(uStructure - index));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float pixel = 1.0 / max(min(uResolution.x, uResolution.y), 1.0);
  vec2 basePoint = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
  vec2 pointerShift = pointer * 0.018;
  float cameraShift = (uCameraPosition.x + uCameraPosition.y * 0.5) * 0.018;
  float orbit = sin(uTime * (0.22 + uFlow * 0.25)) * 0.065 + cameraShift * 0.08;
  vec2 point = spatialRotate(orbit) * (basePoint + pointerShift);
  float fieldTime = uTime * uFlow;

  float researchWeight = spatialStructureWeight(0.0);
  float identityWeight = spatialStructureWeight(1.0);
  float mediaWeight = spatialStructureWeight(2.0);
  float citationWeight = spatialStructureWeight(3.0);
  float networkWeight = spatialStructureWeight(4.0);

  vec2 focus = vec2(aspect * 0.31, -0.18);
  float focusDistance = length((point - focus) * vec2(0.84, 1.08));
  float observatoryVolume = 1.0 - smoothstep(0.18, 0.72, focusDistance);
  float observatoryShell = 1.0 - smoothstep(0.018, 0.055, abs(focusDistance - 0.52));

  vec2 fieldDrift = vec2(fieldTime * 0.045 + cameraShift, uScroll * 0.075 - fieldTime * 0.028);
  float field = spatialFbm((point - focus * 0.18) * uNoiseScale + fieldDrift);
  float ridge = pow(max(0.0, 1.0 - abs(field * 2.0 - 1.0)), 3.0);
  float contourDistance = abs(fract(field * 6.0 + uStructure * 0.035) - 0.5);
  float contour = 1.0 - smoothstep(0.025, 0.065, contourDistance);
  contour *= observatoryVolume;

  float sampleScale = mix(7.0, 16.0, clamp(uDensity, 0.0, 1.0));
  vec2 cells = (point + vec2(fieldTime * 0.008, 0.0)) * sampleScale;
  vec2 cell = floor(cells);
  vec2 local = fract(cells) - 0.5;
  float seed = spatialHash(cell + vec2(17.0, 31.0));
  vec2 sampleOffset = vec2(spatialHash(cell + 7.0), spatialHash(cell + 43.0)) - 0.5;
  sampleOffset *= 0.42;
  float sampleAngle = seed * PI * 2.0 + fieldTime * 0.025;
  vec2 samplePoint = spatialRotate(sampleAngle) * (local - sampleOffset);
  vec2 sampleAxes = vec2(mix(3.4, 5.4, spatialHash(cell + 67.0)), mix(12.0, 19.0, spatialHash(cell + 83.0)));
  float gaussianDistance = dot(samplePoint * sampleAxes, samplePoint * sampleAxes);
  float gaussian = exp(-gaussianDistance * 0.72);
  float gaussianOutline = 1.0 - smoothstep(0.055, 0.13, abs(gaussian - 0.24));
  float sampleGate = step(mix(0.82, 0.4, clamp(uDensity, 0.0, 1.0)), seed);
  gaussian *= sampleGate;
  gaussianOutline *= sampleGate;
  float sampleCore = (1.0 - smoothstep(0.035, 0.105, length(samplePoint))) * sampleGate;
  float rayWidth = max(0.006, pixel * sampleScale * 1.15);
  float sampleRay = spatialSegment(samplePoint, vec2(-0.31, 0.0), vec2(0.31, 0.0), rayWidth) * sampleGate;

  float perspective = 1.42 - point.y * 0.62;
  vec2 gridPoint = vec2(point.x / perspective, 1.0 / perspective + uScroll * 0.035);
  gridPoint = spatialRotate(-orbit * 0.34) * gridPoint;
  vec2 gridCells = abs(fract(gridPoint * 7.0) - 0.5);
  float gridWidth = max(0.012, pixel * 7.0 * 1.4);
  float registrationGrid = 1.0 - smoothstep(gridWidth, gridWidth * 1.9, min(gridCells.x, gridCells.y));
  vec2 majorCells = abs(fract(gridPoint * 1.4) - 0.5);
  float majorGrid = 1.0 - smoothstep(gridWidth * 0.55, gridWidth * 1.35, min(majorCells.x, majorCells.y));

  vec2 frustumOrigin = vec2(aspect * 0.47, -0.43);
  float frustumWidth = max(0.0012, pixel * 1.45);
  float frustum = spatialSegment(point, frustumOrigin, focus + vec2(-0.24, 0.18), frustumWidth);
  frustum += spatialSegment(point, frustumOrigin, focus + vec2(-0.14, -0.29), frustumWidth);
  frustum += spatialSegment(point, focus + vec2(-0.24, 0.18), focus + vec2(-0.14, -0.29), frustumWidth);
  frustum = min(frustum, 1.0);
  float cameraNode = 1.0 - smoothstep(0.008, 0.025, length(point - frustumOrigin));

  float scanPhase = fract(uTime * (0.035 + uFlow * 0.12) + uScroll * 0.12);
  float scanPosition = mix(-0.78, 0.78, scanPhase);
  float scanDistance = abs(dot(point - focus * 0.2, normalize(vec2(0.32, 1.0))) - scanPosition);
  float scanLine = 1.0 - smoothstep(max(0.004, pixel * 1.5), max(0.018, pixel * 5.0), scanDistance);
  float scanWash = (1.0 - smoothstep(0.0, 0.13, scanDistance)) * 0.16;

  float pointerReveal = 1.0 - smoothstep(0.055, 0.18, length(basePoint - pointer));
  float edgeDistance = length((vUv - 0.5) * vec2(1.28, 1.0)) * 2.0;
  float readingMask = mix(0.24, 1.0, smoothstep(0.34, 0.9, edgeDistance));
  readingMask = min(1.0, readingMask + pointerReveal * 0.22);

  float gridPresence = researchWeight * 0.42 + identityWeight * 0.34 + mediaWeight * 0.18 + citationWeight * 0.82 + networkWeight * 0.26;
  float contourPresence = researchWeight * 0.76 + identityWeight * 0.34 + mediaWeight * 0.92 + citationWeight * 0.38 + networkWeight * 0.45;
  float samplePresence = researchWeight * 0.72 + identityWeight * 0.3 + mediaWeight + citationWeight * 0.12 + networkWeight * 0.62;
  float frustumPresence = researchWeight * 0.52 + identityWeight + mediaWeight * 0.8 + citationWeight * 0.1 + networkWeight * 0.28;
  float scanPresence = researchWeight * 0.34 + identityWeight * 0.18 + mediaWeight * 0.72 + citationWeight * 0.14 + networkWeight * 0.36;
  float networkPresence = researchWeight * 0.16 + identityWeight * 0.32 + mediaWeight * 0.18 + citationWeight * 0.06 + networkWeight;

  float gridSignal = (registrationGrid * 0.72 + majorGrid) * gridPresence;
  float fieldSignal = (contour * 0.78 + ridge * observatoryVolume * 0.34 + observatoryShell * 0.26) * contourPresence;
  float sampleSignal = (gaussian * 0.78 + gaussianOutline * 0.38) * samplePresence;
  float networkSignal = (sampleCore + sampleRay * 0.3) * networkPresence;
  float instrumentSignal = (frustum + cameraNode) * frustumPresence;
  float scanSignal = (scanLine + scanWash) * scanPresence;

  vec3 palette = spatialGradient(field, uPrimary, uSecondary);
  vec3 sampleColor = spatialGradient(seed, uPrimary, uSecondary);
  vec3 instrumentBlue = mix(uPrimary, vec3(0.18, 0.47, 0.72), 0.32);
  vec3 observationAmber = vec3(0.914, 0.659, 0.357);
  vec3 color = palette * (0.58 + ridge * 0.24);
  color = mix(color, instrumentBlue, clamp((gridSignal + instrumentSignal) * 0.38, 0.0, 0.5));
  color = mix(color, sampleColor, clamp(sampleSignal * 0.46, 0.0, 0.62));
  color = mix(color, observationAmber, clamp(scanSignal * 0.24 + cameraNode * 0.18, 0.0, 0.36));
  color = mix(color, color * 0.52, uTheme * 0.52);

  float detailSignal = gridSignal * 0.08 + fieldSignal * 0.2 + sampleSignal * (0.2 + uBloom * 0.08);
  detailSignal += networkSignal * 0.15 + instrumentSignal * 0.12 + scanSignal * 0.09;
  float alpha = 0.045 + ridge * 0.035 + detailSignal * readingMask;
  alpha *= mix(0.72, 1.0, uRouteMix);
  alpha *= mix(1.0, 0.56, uTheme);

  float vignette = smoothstep(0.32, 1.04, edgeDistance);
  color *= 1.0 - vignette * uVignette;
  float grain = spatialHash(floor(vUv * uResolution * 0.55) + uTime * 0.1) - 0.5;
  color += grain * mix(0.008, 0.002, uTheme);
  gl_FragColor = vec4(color, clamp(alpha, 0.035, 0.46));
}
`,
].join('\n');
