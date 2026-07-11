import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
  type Blending,
  type ColorRepresentation,
} from 'three';

export type GlowMaterialOptions = Readonly<{
  color?: ColorRepresentation;
  opacity?: number;
  intensity?: number;
  power?: number;
  blending?: Blending;
  depthTest?: boolean;
  depthWrite?: boolean;
}>;

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uIntensity;
  uniform float uPower;

  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    float edge = 1.0 - max(dot(normalize(vWorldNormal), normalize(vViewDirection)), 0.0);
    float glow = pow(edge, uPower) * uOpacity * uIntensity;
    gl_FragColor = vec4(uColor * glow, glow);
  }
`;

export function createGlowMaterial(options: GlowMaterialOptions = {}): ShaderMaterial {
  const {
    color = 0x8ed5ff,
    opacity = 0.72,
    intensity = 1,
    power = 2.2,
    blending = AdditiveBlending,
    depthTest = true,
    depthWrite = false,
  } = options;

  return new ShaderMaterial({
    transparent: true,
    blending,
    depthTest,
    depthWrite,
    uniforms: {
      uColor: { value: new Color(color) },
      uOpacity: { value: opacity },
      uIntensity: { value: intensity },
      uPower: { value: power },
    },
    vertexShader,
    fragmentShader,
  });
}
