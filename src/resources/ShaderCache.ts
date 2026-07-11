export type ShaderSource = Readonly<{
  vertex: string;
  fragment: string;
}>;

/** Stores immutable shader source pairs by stable engine key. */
export class ShaderCache {
  private readonly sources = new Map<string, ShaderSource>();

  get(key: string): ShaderSource | undefined {
    return this.sources.get(key);
  }

  has(key: string): boolean {
    return this.sources.has(key);
  }

  set(key: string, source: ShaderSource): ShaderSource {
    this.sources.set(key, source);
    return source;
  }

  delete(key: string): boolean {
    return this.sources.delete(key);
  }

  clear(): void {
    this.sources.clear();
  }
}
