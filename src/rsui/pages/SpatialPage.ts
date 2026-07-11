import type { ClockFrame } from '../../core/Clock';
import type { RSUIPage } from '../../core/EngineState';

export type SpatialPageContext = Readonly<{
  setRegion(page: RSUIPage): void;
  setProjectHover(slug: string | undefined): void;
  setProjectSelection(slug: string | undefined): void;
}>;

export interface SpatialPage {
  enter(context: SpatialPageContext): void;
  leave(context: SpatialPageContext): void;
  update(context: SpatialPageContext, frame: ClockFrame): void;
  destroy(): void;
  onDomChange?(context: SpatialPageContext): void;
}
