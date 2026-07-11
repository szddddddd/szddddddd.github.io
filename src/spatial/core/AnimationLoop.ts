export type Frame = Readonly<{
  now: number;
  delta: number;
  elapsed: number;
}>;

export type AnimationCallback = (frame: Frame) => void;

export class AnimationLoop {
  private readonly callbacks = new Set<AnimationCallback>();
  private readonly abortController = new AbortController();
  private frameId = 0;
  private previous = 0;
  private elapsed = 0;
  private continuous = false;
  private invalidated = true;
  private hidden = document.hidden;
  private destroyed = false;

  constructor(private readonly onVisibilityChange?: (hidden: boolean) => void) {
    document.addEventListener('visibilitychange', this.handleVisibilityChange, { signal: this.abortController.signal });
  }

  add(callback: AnimationCallback): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  setContinuous(continuous: boolean): void {
    if (this.continuous === continuous) return;
    this.continuous = continuous;
    this.resetClock();
    if (!continuous) this.cancelFrame();
    this.schedule();
  }

  invalidate(): void {
    this.invalidated = true;
    this.schedule();
  }

  destroy(): void {
    this.destroyed = true;
    this.cancelFrame();
    this.callbacks.clear();
    this.abortController.abort();
  }

  private readonly handleVisibilityChange = (): void => {
    this.hidden = document.hidden;
    this.onVisibilityChange?.(this.hidden);
    if (this.hidden) {
      this.cancelFrame();
      return;
    }

    this.resetClock();
    this.schedule();
  };

  private schedule(): void {
    if (this.destroyed || this.hidden || this.frameId || (!this.continuous && !this.invalidated)) return;
    this.frameId = window.requestAnimationFrame(this.render);
  }

  private cancelFrame(): void {
    if (!this.frameId) return;
    window.cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  private readonly render = (now: number): void => {
    this.frameId = 0;
    if (this.destroyed || this.hidden) return;

    const delta = this.previous === 0 ? 0 : Math.min((now - this.previous) / 1000, 0.05);
    this.previous = now;
    this.elapsed += delta;
    this.invalidated = false;
    const frame = { now, delta, elapsed: this.elapsed } as const;
    this.callbacks.forEach((callback) => callback(frame));
    this.schedule();
  };

  private resetClock(): void {
    this.previous = 0;
  }
}
