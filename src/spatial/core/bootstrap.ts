import { getRouteForPath } from '../../config/routes';
import type { SpatialEngine } from './SpatialEngine';

declare global {
  interface Window {
    __spatialEngine?: SpatialEngine;
  }
}

let booting: Promise<void> | undefined;

export function bootSpatialUI(): Promise<void> {
  if (window.__spatialEngine) return Promise.resolve();
  if (booting) return booting;

  booting = (async () => {
    const host = document.querySelector<HTMLElement>('[data-spatial-host]');
    if (!host) return;

    try {
      const { SpatialEngine } = await import('./SpatialEngine');
      const engine = new SpatialEngine(host, getRouteForPath(window.location.pathname).id);
      window.__spatialEngine = engine;
      engine.start();
    } catch (error) {
      host.dataset.spatialEngine = 'fallback';
      document.documentElement.dataset.spatialWebgl = 'unavailable';
      console.warn('[SpatialEngine] WebGL enhancement is unavailable; semantic content remains available.', error);
    }
  })();

  return booting;
}
