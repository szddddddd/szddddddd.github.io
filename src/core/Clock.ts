export type ClockFrame = Readonly<{
  now: number;
  delta: number;
  elapsed: number;
}>;

export class Clock {
  private previous = 0;
  private elapsed = 0;

  tick(now: number): ClockFrame {
    if (this.previous === 0) {
      this.previous = now;
    }

    const delta = Math.min((now - this.previous) / 1000, 0.05);
    this.previous = now;
    this.elapsed += delta;

    return { now, delta, elapsed: this.elapsed };
  }

  reset(): void {
    this.previous = 0;
    this.elapsed = 0;
  }
}
