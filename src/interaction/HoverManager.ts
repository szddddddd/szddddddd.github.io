export type HoverSource = 'pointer' | 'focus';

export type HoverPayload = Readonly<{
  element: HTMLElement;
  event: PointerEvent | FocusEvent;
  source: HoverSource;
}>;

export type HoverCallbacks = Readonly<{
  onEnter?: (payload: HoverPayload) => void;
  onLeave?: (payload: HoverPayload) => void;
}>;

type HoverRoot = Document | HTMLElement;

/** Delegated hover and focus bindings that continue to work after DOM swaps. */
export class HoverManager {
  private readonly bindings = new Set<() => void>();

  constructor(private readonly root: HoverRoot = document) {}

  bind(selector: string, callbacks: HoverCallbacks): () => void {
    const controller = new AbortController();
    const signal = controller.signal;
    const enter = (event: Event, source: HoverSource): void => this.emit(selector, callbacks.onEnter, event, source);
    const leave = (event: Event, source: HoverSource): void => this.emit(selector, callbacks.onLeave, event, source);

    this.root.addEventListener('pointerover', (event) => enter(event, 'pointer'), { signal });
    this.root.addEventListener('pointerout', (event) => leave(event, 'pointer'), { signal });
    this.root.addEventListener('focusin', (event) => enter(event, 'focus'), { signal });
    this.root.addEventListener('focusout', (event) => leave(event, 'focus'), { signal });

    const unbind = (): void => {
      if (!this.bindings.delete(unbind)) return;
      controller.abort();
    };
    this.bindings.add(unbind);

    return unbind;
  }

  destroy(): void {
    [...this.bindings].forEach((unbind) => unbind());
  }

  private emit(
    selector: string,
    callback: ((payload: HoverPayload) => void) | undefined,
    event: Event,
    source: HoverSource,
  ): void {
    if (!callback) return;

    const element = this.getElement(selector, event.target);
    if (!element || this.containsRelatedTarget(element, event)) return;

    callback({
      element,
      event: event as PointerEvent | FocusEvent,
      source,
    });
  }

  private getElement(selector: string, target: EventTarget | null): HTMLElement | null {
    if (!(target instanceof Element)) return null;

    const element = target.closest<HTMLElement>(selector);
    return element && this.root.contains(element) ? element : null;
  }

  private containsRelatedTarget(element: HTMLElement, event: Event): boolean {
    const relatedTarget = (event as PointerEvent | FocusEvent).relatedTarget;
    return relatedTarget instanceof Node && element.contains(relatedTarget);
  }
}
