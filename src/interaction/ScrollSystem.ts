export type ScrollState = Readonly<{
  position: number;
  normalized: number;
  velocity: number;
}>;

export type ScrollCallback = (state: ScrollState) => void;

export type ScrollSystemOptions = Readonly<{
  onScroll: ScrollCallback;
  target?: Window | HTMLElement;
}>;

/** Emits document or element scroll state. Velocity is normalized-scroll units per second. */
export class ScrollSystem {
  private readonly abortController = new AbortController();
  private readonly callback: ScrollCallback;
  private readonly target: Window | HTMLElement;
  private lastTimestamp = 0;
  private value: ScrollState = { position: 0, normalized: 0, velocity: 0 };

  constructor(options: ScrollSystemOptions) {
    this.callback = options.onScroll;
    this.target = options.target ?? window;

    this.target.addEventListener('scroll', this.onScroll, { passive: true, signal: this.abortController.signal });
    if (this.target === window) {
      window.addEventListener('resize', this.onResize, { signal: this.abortController.signal });
    }
    this.update();
  }

  get state(): ScrollState {
    return this.value;
  }

  update(): ScrollState {
    this.publish(0);
    return this.value;
  }

  destroy(): void {
    this.abortController.abort();
  }

  private readonly onScroll = (): void => {
    const now = performance.now();
    const delta = this.lastTimestamp > 0 ? Math.max((now - this.lastTimestamp) / 1000, 0) : 0;
    this.lastTimestamp = now;
    this.publish(delta);
  };

  private readonly onResize = (): void => {
    this.lastTimestamp = 0;
    this.publish(0);
  };

  private publish(delta: number): void {
    const position = this.getPosition();
    const maxScroll = this.getMaxScroll();
    const normalized = maxScroll > 0 ? clamp(position / maxScroll, 0, 1) : 0;
    const velocity = delta > 0 ? (normalized - this.value.normalized) / delta : 0;

    this.value = { position, normalized, velocity };
    this.callback(this.value);
  }

  private getPosition(): number {
    if (this.target instanceof HTMLElement) return Math.max(this.target.scrollTop, 0);
    return Math.max(window.scrollY || document.documentElement.scrollTop, 0);
  }

  private getMaxScroll(): number {
    if (this.target instanceof HTMLElement) return Math.max(this.target.scrollHeight - this.target.clientHeight, 0);

    const root = document.documentElement;
    const height = Math.max(root.scrollHeight, document.body.scrollHeight);
    return Math.max(height - window.innerHeight, 0);
  }
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}
