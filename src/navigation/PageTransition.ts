export class PageTransition {
  private elapsed = 0;
  private active = false;
  private resolve?: () => void;
  private completion = Promise.resolve();

  constructor(private readonly duration = 0.86) {}

  begin(animated: boolean): Promise<void> {
    if (this.active) this.finish();
    this.elapsed = animated ? 0 : this.duration;
    this.active = animated;
    this.completion = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    if (!animated) this.finish();
    return this.completion;
  }

  update(delta: number): number {
    if (!this.active) return 1;
    this.elapsed = Math.min(this.elapsed + delta, this.duration);
    const progress = smootherstep(this.elapsed / this.duration);
    if (this.elapsed >= this.duration) this.finish();
    return progress;
  }

  get progress(): number {
    return this.active ? smootherstep(this.elapsed / this.duration) : 1;
  }

  get isActive(): boolean {
    return this.active;
  }

  private finish(): void {
    this.active = false;
    this.resolve?.();
    this.resolve = undefined;
  }
}

function smootherstep(value: number): number {
  const progress = Math.min(1, Math.max(0, value));
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}
