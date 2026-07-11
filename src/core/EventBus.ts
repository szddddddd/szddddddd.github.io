export type EventMap = Record<string, unknown>;
export type Unsubscribe = () => void;

export class EventBus<Events extends EventMap> {
  private readonly listeners = new Map<keyof Events, Set<(payload: never) => void>>();

  on<Key extends keyof Events>(event: Key, listener: (payload: Events[Key]) => void): Unsubscribe {
    const listeners = this.listeners.get(event) ?? new Set<(payload: never) => void>();
    listeners.add(listener as (payload: never) => void);
    this.listeners.set(event, listeners);

    return () => listeners.delete(listener as (payload: never) => void);
  }

  once<Key extends keyof Events>(event: Key, listener: (payload: Events[Key]) => void): Unsubscribe {
    const unsubscribe = this.on(event, (payload) => {
      unsubscribe();
      listener(payload);
    });

    return unsubscribe;
  }

  emit<Key extends keyof Events>(event: Key, payload: Events[Key]): void {
    this.listeners.get(event)?.forEach((listener) => listener(payload as never));
  }

  clear(): void {
    this.listeners.clear();
  }
}
