import type { RouteId } from '../../config/routes';

export type SpatialTheme = 'dark' | 'light';
export type SpatialQuality = 'full' | 'reduced';

export type SpatialEventMap = {
  ROUTE_PREPARE: { from: RouteId; to: RouteId };
  ROUTE_ENTER: { route: RouteId };
  ROUTE_LEAVE: { route: RouteId };
  NAV_PREVIEW: { route: RouteId };
  NAV_PREVIEW_END: { route: RouteId | undefined };
  THEME_CHANGE: { theme: SpatialTheme };
  MOTION_CHANGE: { enabled: boolean };
  QUALITY_CHANGE: { quality: SpatialQuality };
  VIEWPORT_RESIZE: { width: number; height: number; pixelRatio: number };
  DOCUMENT_VISIBILITY_CHANGE: { hidden: boolean };
  WEBGL_CONTEXT_LOST: undefined;
  WEBGL_CONTEXT_RESTORED: undefined;
};

type Listener<Payload> = (payload: Payload) => void;

export class EventBus<Events extends object> {
  private readonly listeners = new Map<keyof Events, Set<Listener<never>>>();

  on<Key extends keyof Events>(event: Key, listener: Listener<Events[Key]>): () => void {
    const listeners = this.listeners.get(event) ?? new Set<Listener<never>>();
    listeners.add(listener as Listener<never>);
    this.listeners.set(event, listeners);

    return () => {
      listeners.delete(listener as Listener<never>);
      if (listeners.size === 0) this.listeners.delete(event);
    };
  }

  emit<Key extends keyof Events>(event: Key, payload: Events[Key]): void {
    this.listeners.get(event)?.forEach((listener) => listener(payload as never));
  }

  clear(): void {
    this.listeners.clear();
  }
}
