import type { ClockFrame } from '../../../core/Clock';
import type { SpatialPage, SpatialPageContext } from '../SpatialPage';

export class NotesPage implements SpatialPage {
  enter(context: SpatialPageContext): void {
    context.setRegion('notes');
  }

  leave(_context: SpatialPageContext): void {}

  update(_context: SpatialPageContext, _frame: ClockFrame): void {}

  destroy(): void {}
}
