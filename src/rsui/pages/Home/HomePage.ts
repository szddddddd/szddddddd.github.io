import type { ClockFrame } from '../../../core/Clock';
import type { SpatialPage, SpatialPageContext } from '../SpatialPage';

export class HomePage implements SpatialPage {
  enter(context: SpatialPageContext): void {
    context.setRegion('home');
  }

  leave(_context: SpatialPageContext): void {}

  update(_context: SpatialPageContext, _frame: ClockFrame): void {}

  destroy(): void {}
}
