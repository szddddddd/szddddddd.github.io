import { PerspectiveCamera, Vector3 } from 'three';
import type { RouteState } from '../config/routeStates';

export class CameraRig {
  readonly camera = new PerspectiveCamera(42, 1, 0.1, 100);
  readonly target = new Vector3();

  applyRoute(state: RouteState): void {
    this.camera.position.set(...state.camera.position);
    this.target.set(...state.camera.target);
    this.camera.lookAt(this.target);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = Math.max(width, 1) / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
  }

  update(): void {
    this.camera.lookAt(this.target);
  }
}
