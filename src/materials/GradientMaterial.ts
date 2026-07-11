import { Color, ShaderMaterial, type ColorRepresentation } from 'three';

export type GradientMaterialOptions = Readonly<{
  colorA?: ColorRepresentation;
  colorB?: ColorRepresentation;
  opacity?: number;
  angle?: number;
}>;

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uAngle;

  varying vec2 vUv;

  void main() {
    vec2 direction = vec2(cos(uAngle), sin(uAngle));
    float blend = clamp(0.5 + dot(vUv - 0.5, direction), 0.0, 1.0);
    gl_FragColor = vec4(mix(uColorA, uColorB, blend), uOpacity);
  }
`;

export function createGradientMaterial(options: GradientMaterialOptions = {}): ShaderMaterial {
  const {
    colorA = 0x08111e,
    colorB = 0x253f69,
    opacity = 1,
    angle = 0.78,
  } = options;

  return new ShaderMaterial({
    transparent: opacity < 1,
    depthWrite: false,
    uniforms: {
      uColorA: { value: new Color(colorA) },
      uColorB: { value: new Color(colorB) },
      uOpacity: { value: opacity },
      uAngle: { value: angle },
    },
    vertexShader,
    fragmentShader,
  });
}
