type Disposable = { dispose(): void };

type Entry<Resource extends Disposable> = {
  resource: Resource;
  references: number;
};

/** Owns GPU resources created by the persistent spatial engine. */
export class ResourceManager {
  private readonly entries = new Map<string, Entry<Disposable>>();

  acquire<Resource extends Disposable>(key: string, create: () => Resource): Resource {
    const existing = this.entries.get(key) as Entry<Resource> | undefined;
    if (existing) {
      existing.references += 1;
      return existing.resource;
    }

    const resource = create();
    this.entries.set(key, { resource, references: 1 });
    return resource;
  }

  release(key: string): void {
    const entry = this.entries.get(key);
    if (!entry) return;

    entry.references -= 1;
    if (entry.references > 0) return;
    entry.resource.dispose();
    this.entries.delete(key);
  }

  dispose(): void {
    this.entries.forEach((entry) => entry.resource.dispose());
    this.entries.clear();
  }
}
