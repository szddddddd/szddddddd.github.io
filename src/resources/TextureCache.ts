import type { Texture } from 'three';
import { Loader } from './Loader';

/**
 * Keeps each texture URL to one in-flight request and gives the cache sole
 * responsibility for disposing textures it retains.
 */
export class TextureCache {
  private readonly textures = new Map<string, Texture>();
  private readonly pending = new Map<string, Promise<Texture>>();

  constructor(private readonly loader = new Loader()) {}

  get(key: string): Texture | undefined {
    return this.textures.get(key);
  }

  load(url: string): Promise<Texture> {
    const cached = this.textures.get(url);
    if (cached) return Promise.resolve(cached);

    const loading = this.pending.get(url);
    if (loading) return loading;

    const request = this.loader.loadTexture(url).then(
      (texture) => {
        this.pending.delete(url);
        this.textures.set(url, texture);
        return texture;
      },
      (error: unknown) => {
        this.pending.delete(url);
        throw error;
      },
    );

    this.pending.set(url, request);
    return request;
  }

  set(key: string, texture: Texture): Texture {
    const previous = this.textures.get(key);
    if (previous && previous !== texture) previous.dispose();
    this.textures.set(key, texture);
    return texture;
  }

  delete(key: string): boolean {
    const texture = this.textures.get(key);
    if (!texture) return false;

    this.textures.delete(key);
    texture.dispose();
    return true;
  }

  dispose(): void {
    this.textures.forEach((texture) => texture.dispose());
    this.textures.clear();
    this.pending.clear();
  }
}
