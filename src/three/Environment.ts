import { Color, FogExp2, Scene } from 'three';
import type { RSUITheme } from '../core/EngineState';

export class Environment {
  private readonly dark = new Color('#050914');
  private readonly light = new Color('#edf1f4');

  constructor(private readonly scene: Scene) {
    this.scene.fog = new FogExp2(this.dark, 0.013);
    this.setTheme('dark');
  }

  setTheme(theme: RSUITheme): void {
    const color = theme === 'light' ? this.light : this.dark;
    this.scene.background = color;
    const fog = this.scene.fog;
    if (fog instanceof FogExp2) fog.color.copy(color);
  }
}
