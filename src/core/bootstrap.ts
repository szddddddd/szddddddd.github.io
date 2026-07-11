import type { RSUIEngine } from './Engine';

declare global {
  interface Window {
    __rsuiEngine?: RSUIEngine;
  }
}

let booting: Promise<void> | undefined;

export function bootRSUI(): Promise<void> {
  if (window.__rsuiEngine) return Promise.resolve();
  if (booting) return booting;

  booting = (async () => {
    const host = document.querySelector<HTMLElement>('[data-rsui-host]');
    if (!host) return;

    try {
      const { RSUIEngine } = await import('./Engine');
      const engine = new RSUIEngine(host);
      window.__rsuiEngine = engine;
      engine.start();
    } catch (error) {
      host.dataset.rsuiEngine = 'fallback';
      console.warn('[RSUIEngine] WebGL enhancement is unavailable; semantic interface remains active.', error);
    }
  })();

  return booting;
}
