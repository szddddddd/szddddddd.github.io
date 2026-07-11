export class HistoryManager {
  push(url: URL): void {
    window.history.pushState({ rsui: true }, '', url);
  }

  replace(url: URL): void {
    window.history.replaceState({ rsui: true }, '', url);
  }
}
