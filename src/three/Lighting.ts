import { AmbientLight, DirectionalLight, HemisphereLight, Scene } from 'three';

export class Lighting {
  private readonly lights = [
    new HemisphereLight(0x91d8ff, 0x110b2c, 1.4),
    new AmbientLight(0xdbeeff, 0.42),
    new DirectionalLight(0xb08cff, 2.1),
  ];

  constructor(scene: Scene) {
    const key = this.lights[2] as DirectionalLight;
    key.position.set(-8, 11, 8);
    scene.add(...this.lights);
  }

  setIntensity(multiplier: number): void {
    this.lights[0].intensity = 1.4 * multiplier;
    this.lights[1].intensity = 0.42 * multiplier;
    this.lights[2].intensity = 2.1 * multiplier;
  }

  dispose(): void {
    this.lights.forEach((light) => light.removeFromParent());
  }
}
