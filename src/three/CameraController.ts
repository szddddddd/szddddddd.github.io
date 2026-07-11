import {
  MathUtils,
  PerspectiveCamera,
  Vector2,
  Vector3,
} from 'three';

export type CameraFocus = Readonly<{
  position: Vector3;
  lookAt: Vector3;
}>;

const CAMERA_DAMPING = 3.8;
const LOOK_AT_DAMPING = 5.2;

export class CameraController {
  readonly camera = new PerspectiveCamera(42, 1, 0.1, 160);
  readonly velocity = new Vector3();

  private readonly positionTarget = new Vector3(0, 1.3, 11);
  private readonly lookAtCurrent = new Vector3();
  private readonly lookAtTarget = new Vector3();
  private readonly pointer = new Vector2();
  private readonly previousPosition = new Vector3();
  private readonly parallax = new Vector3();
  private readonly resolvedPosition = new Vector3();
  private readonly resolvedLookAt = new Vector3();
  private scroll = 0;

  constructor(initialFocus: CameraFocus) {
    this.camera.position.copy(initialFocus.position);
    this.positionTarget.copy(initialFocus.position);
    this.lookAtCurrent.copy(initialFocus.lookAt);
    this.lookAtTarget.copy(initialFocus.lookAt);
    this.camera.lookAt(this.lookAtCurrent);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = Math.max(1, width) / Math.max(1, height);
    this.camera.updateProjectionMatrix();
  }

  setFocus(focus: CameraFocus, immediate = false): void {
    this.positionTarget.copy(focus.position);
    this.lookAtTarget.copy(focus.lookAt);

    if (immediate) {
      this.camera.position.copy(this.positionTarget);
      this.lookAtCurrent.copy(this.lookAtTarget);
      this.camera.lookAt(this.lookAtCurrent);
      this.velocity.set(0, 0, 0);
    }
  }

  setPointer(clientX: number, clientY: number): void {
    this.pointer.set(
      MathUtils.clamp(clientX / Math.max(1, window.innerWidth) - 0.5, -0.5, 0.5),
      MathUtils.clamp(0.5 - clientY / Math.max(1, window.innerHeight), -0.5, 0.5),
    );
  }

  setScroll(scroll: number): void {
    this.scroll = MathUtils.clamp(scroll, 0, 1);
  }

  update(delta: number, motionEnabled: boolean): void {
    this.previousPosition.copy(this.camera.position);
    this.parallax.set(
      motionEnabled ? this.pointer.x * 0.52 : 0,
      motionEnabled ? this.pointer.y * 0.32 + (this.scroll - 0.5) * 0.22 : 0,
      0,
    );
    this.resolvedPosition.copy(this.positionTarget).add(this.parallax);
    this.resolvedLookAt.copy(this.lookAtTarget).addScaledVector(this.parallax, 0.16);

    if (motionEnabled) {
      this.camera.position.lerp(this.resolvedPosition, 1 - Math.exp(-CAMERA_DAMPING * delta));
      this.lookAtCurrent.lerp(this.resolvedLookAt, 1 - Math.exp(-LOOK_AT_DAMPING * delta));
    } else {
      this.camera.position.copy(this.resolvedPosition);
      this.lookAtCurrent.copy(this.resolvedLookAt);
    }

    this.velocity.copy(this.camera.position).sub(this.previousPosition).multiplyScalar(1 / Math.max(delta, 0.0001));
    this.camera.lookAt(this.lookAtCurrent);
  }
}
