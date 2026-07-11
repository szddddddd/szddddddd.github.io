import { Clock, type ClockFrame } from './Clock';

export type AnimationCallback = (frame: ClockFrame) => void;

export class AnimationLoop {
  private readonly clock = new Clock();
  private readonly callbacks = new Set<AnimationCallback>();
  private readonly abortController = new AbortController();
  private frameId = 0;
  private running = false;
  private hidden = document.hidden;

  constructor() {
    document.addEventListener(
      'visibilitychange',
      () => {
        this.hidden = document.hidden;
        if (this.hidden) {
          this.cancelFrame();
        } else if (this.running) {
          this.clock.reset();
          this.requestFrame();
        }
      },
      { signal: this.abortController.signal },
    );
  }

  add(callback: AnimationCallback): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.clock.reset();
    this.requestFrame();
  }

  stop(): void {
    this.running = false;
    this.cancelFrame();
  }

  destroy(): void {
    this.stop();
    this.callbacks.clear();
    this.abortController.abort();
  }

  private requestFrame(): void {
    if (!this.running || this.hidden || this.frameId) return;
    this.frameId = window.requestAnimationFrame(this.render);
  }

  private cancelFrame(): void {
    if (!this.frameId) return;
    window.cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  private readonly render = (now: number): void => {
    this.frameId = 0;
    if (!this.running || this.hidden) return;

    const frame = this.clock.tick(now);
    this.callbacks.forEach((callback) => callback(frame));
    this.requestFrame();
  };
}
