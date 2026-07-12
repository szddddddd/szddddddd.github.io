import { Mesh, PlaneGeometry, Scene } from 'three';
import type { RouteId } from '../../config/routes';
import { applyRoutePalette, createRoutePaletteValues } from '../materials/RoutePalette';
import { projectCategoryStates, routeStates, type ProjectCategorySceneId, type RouteState } from '../config/routeStates';
import type { Frame } from '../core/AnimationLoop';
import type { SpatialQuality, SpatialTheme } from '../core/EventBus';
import type { ResourceManager } from '../resources/ResourceManager';
import { ShaderRegistry, type NeuralFieldMaterial } from '../shaders';
import { CameraRig } from '../rendering/CameraRig';

export type SceneTransitionValues = {
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  primaryR: number;
  primaryG: number;
  primaryB: number;
  secondaryR: number;
  secondaryG: number;
  secondaryB: number;
  density: number;
  flow: number;
  noiseScale: number;
  bloom: number;
  vignette: number;
  structure: number;
  routeMix: number;
};

export class SpatialScene {
  readonly scene = new Scene();
  readonly camera = new CameraRig();

  private readonly registry: ShaderRegistry;
  private readonly material: NeuralFieldMaterial;
  private readonly field: Mesh<PlaneGeometry, NeuralFieldMaterial>;
  private quality: SpatialQuality = 'full';

  constructor(private readonly resources: ResourceManager) {
    this.registry = new ShaderRegistry(resources);
    const geometry = resources.acquire('geometry:spatial-field', () => new PlaneGeometry(2, 2));
    this.material = this.registry.createNeuralFieldMaterial();
    this.field = new Mesh(geometry, this.material);
    this.field.frustumCulled = false;
    this.field.renderOrder = -1000;
    this.scene.add(this.field);
    this.applyRoute(routeStates.home);
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.camera.resize(width, height);
    this.material.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
  }

  setTheme(theme: SpatialTheme): void {
    this.material.uniforms.uTheme.value = theme === 'light' ? 1 : 0;
  }

  setQuality(quality: SpatialQuality): void {
    if (quality === this.quality) return;
    const values = this.getTransitionValues();
    this.quality = quality;
    this.applyTransitionValues(values);
  }

  setPointer(clientX: number, clientY: number): void {
    this.material.uniforms.uPointer.value.set(
      clientX / Math.max(window.innerWidth, 1),
      1 - clientY / Math.max(window.innerHeight, 1),
    );
  }

  setScroll(scroll: number): void {
    this.material.uniforms.uScroll.value = Math.min(1, Math.max(0, scroll));
  }

  applyRoute(state: RouteState): void {
    this.camera.applyRoute(state);
    applyRoutePalette(this.material.uniforms, state);
    this.material.uniforms.uDensity.value *= this.densityScale;
    this.material.uniforms.uBloom.value *= this.bloomScale;
    this.material.uniforms.uRouteMix.value = 1;
    this.material.uniforms.uCameraPosition.value.copy(this.camera.camera.position);
  }

  getTransitionValues(): SceneTransitionValues {
    const uniforms = this.material.uniforms;
    return {
      cameraX: this.camera.camera.position.x,
      cameraY: this.camera.camera.position.y,
      cameraZ: this.camera.camera.position.z,
      targetX: this.camera.target.x,
      targetY: this.camera.target.y,
      targetZ: this.camera.target.z,
      primaryR: uniforms.uPrimary.value.r,
      primaryG: uniforms.uPrimary.value.g,
      primaryB: uniforms.uPrimary.value.b,
      secondaryR: uniforms.uSecondary.value.r,
      secondaryG: uniforms.uSecondary.value.g,
      secondaryB: uniforms.uSecondary.value.b,
      density: uniforms.uDensity.value / this.densityScale,
      flow: uniforms.uFlow.value,
      noiseScale: uniforms.uNoiseScale.value,
      bloom: uniforms.uBloom.value / this.bloomScale,
      vignette: uniforms.uVignette.value,
      structure: uniforms.uStructure.value,
      routeMix: uniforms.uRouteMix.value,
    };
  }

  getTargetTransitionValues(route: RouteId): SceneTransitionValues {
    const state = routeStates[route];
    const palette = createRoutePaletteValues(state);
    return {
      cameraX: state.camera.position[0],
      cameraY: state.camera.position[1],
      cameraZ: state.camera.position[2],
      targetX: state.camera.target[0],
      targetY: state.camera.target[1],
      targetZ: state.camera.target[2],
      primaryR: palette.primary.r,
      primaryG: palette.primary.g,
      primaryB: palette.primary.b,
      secondaryR: palette.secondary.r,
      secondaryG: palette.secondary.g,
      secondaryB: palette.secondary.b,
      density: palette.density,
      flow: palette.flow,
      noiseScale: palette.noiseScale,
      bloom: palette.bloom,
      vignette: palette.vignette,
      structure: palette.structure,
      routeMix: 1,
    };
  }

  getProjectCategoryTransitionValues(category: ProjectCategorySceneId): SceneTransitionValues {
    if (category === 'all') return this.getTargetTransitionValues('projects');

    const state = { ...routeStates.projects, ...projectCategoryStates[category] };
    const palette = createRoutePaletteValues(state);
    const target = this.getTargetTransitionValues('projects');
    return {
      ...target,
      primaryR: palette.primary.r,
      primaryG: palette.primary.g,
      primaryB: palette.primary.b,
      secondaryR: palette.secondary.r,
      secondaryG: palette.secondary.g,
      secondaryB: palette.secondary.b,
      density: palette.density,
      flow: palette.flow,
      noiseScale: palette.noiseScale,
      bloom: palette.bloom,
      vignette: palette.vignette,
      structure: palette.structure,
    };
  }

  applyTransitionValues(values: SceneTransitionValues): void {
    const uniforms = this.material.uniforms;
    this.camera.camera.position.set(values.cameraX, values.cameraY, values.cameraZ);
    this.camera.target.set(values.targetX, values.targetY, values.targetZ);
    uniforms.uPrimary.value.setRGB(values.primaryR, values.primaryG, values.primaryB);
    uniforms.uSecondary.value.setRGB(values.secondaryR, values.secondaryG, values.secondaryB);
    uniforms.uDensity.value = values.density * this.densityScale;
    uniforms.uFlow.value = values.flow;
    uniforms.uNoiseScale.value = values.noiseScale;
    uniforms.uBloom.value = values.bloom * this.bloomScale;
    uniforms.uVignette.value = values.vignette;
    uniforms.uStructure.value = values.structure;
    uniforms.uRouteMix.value = values.routeMix;
  }

  update(frame: Frame): void {
    this.camera.update();
    this.material.uniforms.uTime.value = frame.elapsed;
    this.material.uniforms.uCameraPosition.value.copy(this.camera.camera.position);
  }

  dispose(): void {
    this.scene.remove(this.field);
    this.registry.release('neural-field');
    this.resources.release('geometry:spatial-field');
  }

  private get densityScale(): number {
    return this.quality === 'reduced' ? 0.62 : 1;
  }

  private get bloomScale(): number {
    return this.quality === 'reduced' ? 0.35 : 1;
  }
}
