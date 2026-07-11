import { GeometryCache } from './GeometryCache';
import { ShaderCache } from './ShaderCache';
import { TextureCache } from './TextureCache';

/** Central owner for cache lifetime; future page modules should request assets here. */
export class ResourceManager {
  readonly textures = new TextureCache();
  readonly shaders = new ShaderCache();
  readonly geometries = new GeometryCache();

  dispose(): void {
    this.textures.dispose();
    this.shaders.clear();
    this.geometries.dispose();
  }
}
