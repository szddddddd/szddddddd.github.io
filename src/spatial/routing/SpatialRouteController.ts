import { getRouteForPath, isPrimaryRouteId, type RouteId } from '../../config/routes';

export type SpatialRouteTarget = Readonly<{
  requestRoute(route: RouteId): void;
  previewRoute(route: RouteId): void;
  clearPreview(): void;
}>;

type AstroNavigationEvent = Event & {
  to?: URL;
};

type PreviewEvent = CustomEvent<{ route?: string }>;

/** Maps Astro lifecycle URLs to spatial state without owning browser history. */
export class SpatialRouteController {
  private readonly abortController = new AbortController();

  constructor(private readonly target: SpatialRouteTarget) {}

  start(): void {
    const { signal } = this.abortController;
    document.addEventListener('astro:before-preparation', this.onBeforePreparation as EventListener, { signal });
    document.addEventListener('astro:after-swap', this.onAfterSwap, { signal });
    document.addEventListener('astro:page-load', this.onPageLoad, { signal });
    document.addEventListener('spatial:nav-preview', this.onPreview as EventListener, { signal });
    document.addEventListener('spatial:nav-preview-end', this.onPreviewEnd, { signal });
    this.sync(window.location.pathname);
  }

  destroy(): void {
    this.abortController.abort();
  }

  private readonly onBeforePreparation = (event: AstroNavigationEvent): void => {
    this.sync(event.to?.pathname ?? window.location.pathname);
  };

  private readonly onAfterSwap = (): void => {
    this.sync(window.location.pathname);
  };

  private readonly onPageLoad = (): void => {
    this.sync(window.location.pathname);
  };

  private readonly onPreview = (event: PreviewEvent): void => {
    const route = event.detail?.route;
    if (route && isPrimaryRouteId(route)) this.target.previewRoute(route);
  };

  private readonly onPreviewEnd = (): void => {
    this.target.clearPreview();
  };

  private sync(pathname: string): void {
    this.target.requestRoute(getRouteForPath(pathname).id);
  }
}
