import type { BufferGeometry } from 'three';

type GeometryEntry<Geometry extends BufferGeometry> = {
  geometry: Geometry;
  references: number;
};

/**
 * Reference-counted geometry cache. A geometry stays alive while one or more
 * scene modules have acquired its key and is disposed at the final release.
 */
export class GeometryCache<Geometry extends BufferGeometry = BufferGeometry> {
  private readonly entries = new Map<string, GeometryEntry<Geometry>>();

  acquire(key: string, create: () => Geometry): Geometry {
    const entry = this.entries.get(key);
    if (entry) {
      entry.references += 1;
      return entry.geometry;
    }

    const geometry = create();
    this.entries.set(key, { geometry, references: 1 });
    return geometry;
  }

  get(key: string): Geometry | undefined {
    return this.entries.get(key)?.geometry;
  }

  getReferenceCount(key: string): number {
    return this.entries.get(key)?.references ?? 0;
  }

  release(key: string): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;

    entry.references -= 1;
    if (entry.references > 0) return false;

    entry.geometry.dispose();
    this.entries.delete(key);
    return true;
  }

  dispose(): void {
    this.entries.forEach(({ geometry }) => geometry.dispose());
    this.entries.clear();
  }
}
