export type MagneticSystemOptions = Readonly<{
  root?: ParentNode;
  reducedMotion?: boolean;
  strength?: number;
}>;

export type MagneticBindingOptions = Readonly<{
  strength?: number;
}>;

type MagneticEntry = {
  element: HTMLElement;
  initialTranslate: string;
  initialWillChange: string;
  strength: number;
};

const DEFAULT_STRENGTH = 8;

/** Applies a small pointer-relative offset without replacing an element's transform. */
export class MagneticSystem {
  private readonly entries = new Set<MagneticEntry>();
  private readonly bindings = new Set<() => void>();
  private reducedMotion: boolean;
  private readonly root: ParentNode;
  private readonly strength: number;

  constructor(options: MagneticSystemOptions = {}) {
    this.root = options.root ?? document;
    this.reducedMotion = options.reducedMotion ?? false;
    this.strength = Math.max(options.strength ?? DEFAULT_STRENGTH, 0);
  }

  bind(selector: string, options: MagneticBindingOptions = {}): () => void {
    const controller = new AbortController();
    const entries = Array.from(this.root.querySelectorAll<HTMLElement>(selector)).map((element) => ({
      element,
      initialTranslate: element.style.translate,
      initialWillChange: element.style.willChange,
      strength: Math.max(options.strength ?? this.strength, 0),
    }));

    entries.forEach((entry) => {
      this.entries.add(entry);
      entry.element.addEventListener('pointermove', (event) => this.move(entry, event), { signal: controller.signal });
      entry.element.addEventListener('pointerleave', () => this.reset(entry), { signal: controller.signal });
      entry.element.addEventListener('pointercancel', () => this.reset(entry), { signal: controller.signal });
    });

    const unbind = (): void => {
      if (!this.bindings.delete(unbind)) return;
      controller.abort();
      entries.forEach((entry) => {
        this.reset(entry);
        this.entries.delete(entry);
      });
    };
    this.bindings.add(unbind);

    return unbind;
  }

  setReducedMotion(reducedMotion: boolean): void {
    if (this.reducedMotion === reducedMotion) return;
    this.reducedMotion = reducedMotion;
    if (reducedMotion) this.entries.forEach((entry) => this.reset(entry));
  }

  destroy(): void {
    [...this.bindings].forEach((unbind) => unbind());
  }

  private move(entry: MagneticEntry, event: PointerEvent): void {
    if (this.reducedMotion) return;

    const bounds = entry.element.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;

    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * entry.strength * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * entry.strength * 2;

    entry.element.style.willChange = 'translate';
    entry.element.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
  }

  private reset(entry: MagneticEntry): void {
    entry.element.style.translate = entry.initialTranslate;
    entry.element.style.willChange = entry.initialWillChange;
  }
}
