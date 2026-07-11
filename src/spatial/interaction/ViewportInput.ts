export type ViewportInputCallbacks = Readonly<{
  onResize(): void;
  onScroll(scroll: number): void;
  onPointerMove(clientX: number, clientY: number): void;
}>;

/** One DOM input boundary for the persistent spatial canvas. */
export class ViewportInput {
  private readonly abortController = new AbortController();

  constructor(private readonly callbacks: ViewportInputCallbacks) {}

  start(): void {
    const { signal } = this.abortController;
    window.addEventListener('resize', this.callbacks.onResize, { passive: true, signal });
    window.addEventListener('scroll', this.handleScroll, { passive: true, signal });
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true, signal });
    this.handleScroll();
  }

  destroy(): void {
    this.abortController.abort();
  }

  private readonly handleScroll = (): void => {
    const root = document.documentElement;
    const maxScroll = Math.max(root.scrollHeight, document.body.scrollHeight) - window.innerHeight;
    this.callbacks.onScroll(maxScroll > 0 ? window.scrollY / maxScroll : 0);
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.callbacks.onPointerMove(event.clientX, event.clientY);
  };
}
