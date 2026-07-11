export type CursorState = Readonly<{
  x: number;
  y: number;
  ndcX: number;
  ndcY: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  visible: boolean;
}>;

export type CursorControllerOptions = Readonly<{
  root?: ParentNode;
  cursor?: HTMLElement | null;
  target?: Window;
}>;

const CURSOR_SELECTOR = '[data-rsui-cursor]';
const VELOCITY_DAMPING = 14;

/** Tracks pointer input; call update from the engine animation loop to decay velocity. */
export class CursorController {
  private readonly abortController = new AbortController();
  private readonly cursor: HTMLElement | null;
  private readonly target: Window;
  private readonly initialTransform: string | undefined;
  private readonly initialOpacity: string | undefined;
  private lastTimestamp = 0;
  private value: CursorState = {
    x: 0,
    y: 0,
    ndcX: 0,
    ndcY: 0,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
    visible: false,
  };

  constructor(options: CursorControllerOptions = {}) {
    const root = options.root ?? document;
    this.cursor = options.cursor ?? root.querySelector<HTMLElement>(CURSOR_SELECTOR);
    this.target = options.target ?? window;
    this.initialTransform = this.cursor?.style.transform;
    this.initialOpacity = this.cursor?.style.opacity;

    this.target.addEventListener('pointermove', this.onPointerMove, { signal: this.abortController.signal });
    this.target.addEventListener('pointerleave', this.onPointerLeave, { signal: this.abortController.signal });
    this.target.addEventListener('blur', this.onPointerLeave, { signal: this.abortController.signal });
    this.render();
  }

  get state(): CursorState {
    return this.value;
  }

  /** Decays velocity without owning a requestAnimationFrame loop. */
  update(delta: number): CursorState {
    if (!this.value.visible || delta <= 0) return this.value;

    const damping = Math.exp(-VELOCITY_DAMPING * Math.min(delta, 1));
    const velocityX = this.value.velocityX * damping;
    const velocityY = this.value.velocityY * damping;
    this.value = {
      ...this.value,
      velocityX,
      velocityY,
      speed: Math.hypot(velocityX, velocityY),
    };
    this.render();

    return this.value;
  }

  render(): void {
    if (!this.cursor) return;

    const { speed, velocityX, velocityY, visible, x, y } = this.value;
    const stretch = Math.min(speed / 1800, 0.22);
    const angle = speed > 0.01 ? Math.atan2(velocityY, velocityX) : 0;

    this.cursor.style.setProperty('--rsui-cursor-x', `${x}px`);
    this.cursor.style.setProperty('--rsui-cursor-y', `${y}px`);
    this.cursor.style.setProperty('--rsui-cursor-speed', `${speed}`);
    this.cursor.style.opacity = visible ? '1' : '0';
    this.cursor.style.transform = [
      `translate3d(${x}px, ${y}px, 0)`,
      'translate(-50%, -50%)',
      `rotate(${angle}rad)`,
      `scale(${1 + stretch}, ${1 - stretch * 0.28})`,
    ].join(' ');
  }

  destroy(): void {
    this.abortController.abort();

    if (!this.cursor) return;
    this.cursor.style.transform = this.initialTransform ?? '';
    this.cursor.style.opacity = this.initialOpacity ?? '';
    this.cursor.style.removeProperty('--rsui-cursor-x');
    this.cursor.style.removeProperty('--rsui-cursor-y');
    this.cursor.style.removeProperty('--rsui-cursor-speed');
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    const now = performance.now();
    const delta = this.lastTimestamp > 0 ? Math.max((now - this.lastTimestamp) / 1000, 0) : 0;
    const velocityX = delta > 0 ? (event.clientX - this.value.x) / delta : 0;
    const velocityY = delta > 0 ? (event.clientY - this.value.y) / delta : 0;
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);

    this.lastTimestamp = now;
    this.value = {
      x: event.clientX,
      y: event.clientY,
      ndcX: (event.clientX / width) * 2 - 1,
      ndcY: 1 - (event.clientY / height) * 2,
      velocityX,
      velocityY,
      speed: Math.hypot(velocityX, velocityY),
      visible: true,
    };
    this.render();
  };

  private readonly onPointerLeave = (): void => {
    this.lastTimestamp = 0;
    this.value = {
      ...this.value,
      velocityX: 0,
      velocityY: 0,
      speed: 0,
      visible: false,
    };
    this.render();
  };
}
