import type { ClockFrame } from '../../../core/Clock';
import type { SpatialPage, SpatialPageContext } from '../SpatialPage';

export class ProjectsPage implements SpatialPage {
  private abortController?: AbortController;

  enter(context: SpatialPageContext): void {
    context.setRegion('projects');
    this.bindProjectSurfaces(context);
  }

  leave(context: SpatialPageContext): void {
    context.setProjectHover(undefined);
    this.abortController?.abort();
    this.abortController = undefined;
  }

  update(_context: SpatialPageContext, _frame: ClockFrame): void {}

  onDomChange(context: SpatialPageContext): void {
    this.bindProjectSurfaces(context);
  }

  destroy(): void {
    this.abortController?.abort();
  }

  private bindProjectSurfaces(context: SpatialPageContext): void {
    this.abortController?.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    document.querySelectorAll<HTMLElement>('[data-rsui-project]').forEach((project) => {
      const slug = project.dataset.rsuiProject;
      if (!slug) return;
      const activate = () => context.setProjectHover(slug);
      const deactivate = () => context.setProjectHover(undefined);
      project.addEventListener('pointerenter', activate, { signal });
      project.addEventListener('pointerleave', deactivate, { signal });
      project.addEventListener('focusin', activate, { signal });
      project.addEventListener('focusout', deactivate, { signal });
    });
  }
}
