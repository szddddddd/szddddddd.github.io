import { Raycaster, Vector2, type Camera, type Intersection, type Object3D } from 'three';

export type RaycastSystemOptions = Readonly<{
  objects?: Iterable<Object3D>;
  recursive?: boolean;
  raycaster?: Raycaster;
}>;

/** Keeps the engine's camera, pointer, and interactive scene objects in one raycasting boundary. */
export class RaycastSystem {
  readonly raycaster: Raycaster;

  private readonly pointer = new Vector2();
  private readonly objects = new Set<Object3D>();
  private camera: Camera;
  private pointerActive = false;
  private recursive: boolean;

  constructor(camera: Camera, options: RaycastSystemOptions = {}) {
    this.camera = camera;
    this.raycaster = options.raycaster ?? new Raycaster();
    this.recursive = options.recursive ?? true;
    if (options.objects) this.setInteractive(options.objects);
  }

  setCamera(camera: Camera): void {
    this.camera = camera;
  }

  setInteractive(objects: Iterable<Object3D>): void {
    this.objects.clear();
    for (const object of objects) this.objects.add(object);
  }

  setRecursive(recursive: boolean): void {
    this.recursive = recursive;
  }

  setPointer(x: number, y: number): void {
    this.pointer.set(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
    this.pointerActive = true;
  }

  clearPointer(): void {
    this.pointerActive = false;
  }

  pick(): Intersection<Object3D>[] {
    if (!this.pointerActive || this.objects.size === 0) return [];

    this.raycaster.setFromCamera(this.pointer, this.camera);
    return this.raycaster.intersectObjects([...this.objects], this.recursive);
  }

  destroy(): void {
    this.objects.clear();
    this.pointerActive = false;
  }
}
