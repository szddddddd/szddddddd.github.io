import {
  AdditiveBlending,
  PointsMaterial,
  type PointsMaterialParameters,
} from 'three';

export type PointCloudMaterialOptions = PointsMaterialParameters;

export function createPointCloudMaterial(options: PointCloudMaterialOptions = {}): PointsMaterial {
  return new PointsMaterial({
    color: 0x91d4ff,
    size: 0.028,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: AdditiveBlending,
    ...options,
  });
}
