import { Easing, Group, Tween } from '@tweenjs/tween.js';
import type { RouteId } from '../../config/routes';
import { routeStates } from '../config/routeStates';
import type { SpatialScene, SceneTransitionValues } from '../scenes/SpatialScene';

/** Coordinates only WebGL state. Astro remains responsible for document navigation. */
export class RouteTransition {
  readonly tweens = new Group();

  private active?: Tween<SceneTransitionValues>;
  private preview?: Tween<SceneTransitionValues>;

  begin(scene: SpatialScene, route: RouteId, animate: boolean, onComplete: () => void): void {
    this.stop();
    if (!animate) {
      scene.applyRoute(routeStates[route]);
      onComplete();
      return;
    }

    const values = scene.getTransitionValues();
    values.routeMix = 0;
    scene.applyTransitionValues(values);
    this.active = new Tween(values, this.tweens)
      .to(scene.getTargetTransitionValues(route), routeStates[route].transition.duration)
      .easing(Easing.Cubic.InOut)
      .onUpdate(() => scene.applyTransitionValues(values))
      .onComplete(() => {
        this.active = undefined;
        onComplete();
      })
      .start();
  }

  update(now: number): void {
    this.tweens.update(now);
  }

  previewRoute(scene: SpatialScene, from: RouteId, to: RouteId, animate: boolean): void {
    this.preview?.stop();
    const target = blendValues(scene.getTargetTransitionValues(from), scene.getTargetTransitionValues(to), 0.13);
    if (!animate) {
      scene.applyTransitionValues(target);
      return;
    }

    const values = scene.getTransitionValues();
    this.preview = new Tween(values, this.tweens)
      .to(target, 160)
      .easing(Easing.Cubic.Out)
      .onUpdate(() => scene.applyTransitionValues(values))
      .onComplete(() => {
        this.preview = undefined;
      })
      .start();
  }

  clearPreview(scene: SpatialScene, route: RouteId, animate: boolean): void {
    this.preview?.stop();
    const target = scene.getTargetTransitionValues(route);
    if (!animate) {
      scene.applyTransitionValues(target);
      return;
    }

    const values = scene.getTransitionValues();
    this.preview = new Tween(values, this.tweens)
      .to(target, 160)
      .easing(Easing.Cubic.Out)
      .onUpdate(() => scene.applyTransitionValues(values))
      .onComplete(() => {
        this.preview = undefined;
      })
      .start();
  }

  stop(): void {
    this.active?.stop();
    this.preview?.stop();
    this.active = undefined;
    this.preview = undefined;
    this.tweens.removeAll();
  }
}

function blendValues(from: SceneTransitionValues, to: SceneTransitionValues, amount: number): SceneTransitionValues {
  const blend = (start: number, end: number) => start + (end - start) * amount;
  return {
    cameraX: blend(from.cameraX, to.cameraX),
    cameraY: blend(from.cameraY, to.cameraY),
    cameraZ: blend(from.cameraZ, to.cameraZ),
    targetX: blend(from.targetX, to.targetX),
    targetY: blend(from.targetY, to.targetY),
    targetZ: blend(from.targetZ, to.targetZ),
    primaryR: blend(from.primaryR, to.primaryR),
    primaryG: blend(from.primaryG, to.primaryG),
    primaryB: blend(from.primaryB, to.primaryB),
    secondaryR: blend(from.secondaryR, to.secondaryR),
    secondaryG: blend(from.secondaryG, to.secondaryG),
    secondaryB: blend(from.secondaryB, to.secondaryB),
    density: blend(from.density, to.density),
    flow: blend(from.flow, to.flow),
    noiseScale: blend(from.noiseScale, to.noiseScale),
    bloom: blend(from.bloom, to.bloom),
    vignette: blend(from.vignette, to.vignette),
    routeMix: 1,
  };
}
