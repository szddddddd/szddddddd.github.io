import { MeshPhysicalMaterial, type MeshPhysicalMaterialParameters } from 'three';

export type GlassMaterialOptions = MeshPhysicalMaterialParameters;

export function createGlassMaterial(options: GlassMaterialOptions = {}): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: 0xd9ebff,
    roughness: 0.16,
    metalness: 0,
    transmission: 0.16,
    thickness: 0.35,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    ...options,
  });
}
