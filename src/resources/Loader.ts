import { LoadingManager, Texture, TextureLoader } from 'three';

export type LoaderOptions = Readonly<{
  crossOrigin?: string;
}>;

/**
 * Small ownership boundary around Three's loaders. Caches decide resource
 * lifetime; this class only creates resources.
 */
export class Loader {
  readonly manager: LoadingManager;
  private readonly textureLoader: TextureLoader;

  constructor(options: LoaderOptions = {}, manager = new LoadingManager()) {
    this.manager = manager;
    this.textureLoader = new TextureLoader(manager);

    if (options.crossOrigin !== undefined) {
      this.textureLoader.setCrossOrigin(options.crossOrigin);
    }
  }

  loadTexture(url: string): Promise<Texture> {
    return this.textureLoader.loadAsync(url);
  }
}
