import { pages, primaryNavPageKeys, type PageKey } from '../i18n';
import type { RSUIPage } from '../core/EngineState';
import { HistoryManager } from './HistoryManager';
import { getSpatialPage } from './PageState';

export type SpatialNavigationEngine = {
  navigate(page: RSUIPage, route: string): Promise<void>;
};

type NavigationOptions = Readonly<{
  history?: 'push' | 'replace' | 'none';
}>;

export class SpatialRouter {
  private readonly history = new HistoryManager();
  private readonly routeMap = createRouteMap();
  private readonly abortController = new AbortController();
  private navigation?: AbortController;

  constructor(private readonly engine: SpatialNavigationEngine) {}

  start(): void {
    document.addEventListener('click', this.onDocumentClick, { signal: this.abortController.signal });
    window.addEventListener('popstate', this.onPopState, { signal: this.abortController.signal });
  }

  destroy(): void {
    this.navigation?.abort();
    this.abortController.abort();
  }

  private readonly onDocumentClick = (event: MouseEvent): void => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!target || target.target || target.hasAttribute('download')) return;

    const url = new URL(target.href, window.location.href);
    if (url.origin !== window.location.origin || url.hash || !this.routeMap.has(normalizePath(url.pathname))) return;

    event.preventDefault();
    void this.navigate(url, { history: 'push' });
  };

  private readonly onPopState = (): void => {
    const url = new URL(window.location.href);
    if (!this.routeMap.has(normalizePath(url.pathname))) return;
    void this.navigate(url, { history: 'none' });
  };

  private async navigate(url: URL, options: NavigationOptions): Promise<void> {
    if (normalizePath(url.pathname) === normalizePath(window.location.pathname) && !this.navigation) return;

    this.navigation?.abort();
    const controller = new AbortController();
    this.navigation = controller;

    try {
      const response = await fetch(url, { signal: controller.signal, headers: { 'X-RSUI-Navigation': '1' } });
      if (!response.ok) throw new Error(`Unable to load ${url.pathname}`);
      const html = await response.text();
      if (controller.signal.aborted) return;

      const nextDocument = new DOMParser().parseFromString(html, 'text/html');
      const pageKey = this.routeMap.get(normalizePath(url.pathname));
      if (!pageKey) return;

      const transition = this.engine.navigate(getSpatialPage(pageKey), url.pathname);
      this.swapDocument(nextDocument, pageKey);
      if (options.history === 'push') this.history.push(url);
      if (options.history === 'replace') this.history.replace(url);
      window.scrollTo(0, 0);
      await transition;
    } catch (error) {
      if (!controller.signal.aborted) window.location.assign(url);
    } finally {
      if (this.navigation === controller) this.navigation = undefined;
    }
  }

  private swapDocument(nextDocument: Document, pageKey: PageKey): void {
    const nextHeader = nextDocument.querySelector<HTMLElement>('[data-rsui-navigation]');
    const nextMain = nextDocument.querySelector<HTMLElement>('[data-rsui-main]');
    const nextFooter = nextDocument.querySelector<HTMLElement>('[data-rsui-footer]');
    const currentHeader = document.querySelector<HTMLElement>('[data-rsui-navigation]');
    const currentMain = document.querySelector<HTMLElement>('[data-rsui-main]');
    const currentFooter = document.querySelector<HTMLElement>('[data-rsui-footer]');

    if (!nextHeader || !nextMain || !nextFooter || !currentHeader || !currentMain || !currentFooter) {
      window.location.assign(nextDocument.URL);
      return;
    }

    currentHeader.replaceWith(nextHeader);
    currentMain.replaceWith(nextMain);
    currentFooter.replaceWith(nextFooter);
    document.title = nextDocument.title;
    document.documentElement.lang = nextDocument.documentElement.lang;
    document.body.dataset.rsuiPage = getSpatialPage(pageKey);
    document.body.dataset.rsuiRouteKey = pageKey;
    syncHead(nextDocument);

    document.dispatchEvent(new CustomEvent('rsui:dom-swapped', { detail: { pageKey } }));
    document.dispatchEvent(new Event('astro:page-load'));
  }
}

function createRouteMap(): Map<string, PageKey> {
  const routes = new Map<string, PageKey>();
  primaryNavPageKeys.forEach((pageKey) => {
    routes.set(normalizePath(pages[pageKey].en), pageKey);
    routes.set(normalizePath(pages[pageKey].zh), pageKey);
  });
  return routes;
}

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
}

function syncHead(nextDocument: Document): void {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:url"]',
    'link[rel="canonical"]',
    'link[rel="alternate"][hreflang="en"]',
    'link[rel="alternate"][hreflang="zh-CN"]',
    'link[rel="alternate"][hreflang="x-default"]',
  ];

  selectors.forEach((selector) => {
    const current = document.head.querySelector<HTMLElement>(selector);
    const next = nextDocument.head.querySelector<HTMLElement>(selector);
    if (current && next) current.replaceWith(next.cloneNode(true));
  });
}
