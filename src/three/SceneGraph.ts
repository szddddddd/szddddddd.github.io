import {
  AdditiveBlending,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import type { ClockFrame } from '../core/Clock';
import type { RSUIPage } from '../core/EngineState';
import { projects } from '../data/projects';
import { createGlassMaterial } from '../materials/GlassMaterial';
import { createGlowMaterial } from '../materials/GlowMaterial';
import { createPointCloudMaterial } from '../materials/PointCloudMaterial';
import type { CameraFocus } from './CameraController';
import type { ShaderPipeline } from './ShaderPipeline';

type Region = {
  group: Group;
  materials: Material[];
  baseOpacities: Map<Material, number>;
  emphasis: number;
  targetEmphasis: number;
};

type ProjectNode = {
  slug: string;
  object: Group;
  focus: CameraFocus;
};

const REGION_FOCUSES: Record<RSUIPage, CameraFocus> = {
  home: { position: new Vector3(0, 1.4, 11), lookAt: new Vector3(0, 0, 0) },
  about: { position: new Vector3(14, 1.8, 10.5), lookAt: new Vector3(14, 0.3, 0) },
  projects: { position: new Vector3(29, 2.6, 12), lookAt: new Vector3(29, 0.2, 0) },
  publications: { position: new Vector3(44, 1.5, 11), lookAt: new Vector3(44, 0, 0) },
  notes: { position: new Vector3(59, 1.8, 10.5), lookAt: new Vector3(59, 0, 0) },
};

export class SceneGraph {
  readonly scene = new Scene();

  private readonly regions = new Map<RSUIPage, Region>();
  private readonly projectNodes = new Map<string, ProjectNode>();
  private readonly interactiveObjects: Object3D[] = [];
  private readonly background: Mesh<PlaneGeometry>;
  private readonly backgroundDirection = new Vector3();
  private readonly backgroundPosition = new Vector3();
  private readonly nodeScale = new Vector3();
  private readonly particleCount: number;
  private activePage: RSUIPage = 'home';
  private hoveredProject?: string;
  private selectedProject?: string;

  constructor(shaderPipeline: ShaderPipeline, quality: 'full' | 'reduced' = 'full') {
    this.particleCount = quality === 'full' ? 1 : 0.38;
    this.background = new Mesh(new PlaneGeometry(2, 2), shaderPipeline.createBackgroundMaterial());
    this.background.renderOrder = -1000;
    this.background.frustumCulled = false;
    this.scene.add(this.background);
    this.createWorld();
    this.setActivePage('home', true);
  }

  getFocus(page: RSUIPage): CameraFocus {
    return REGION_FOCUSES[page];
  }

  getProjectFocus(slug: string): CameraFocus | undefined {
    return this.projectNodes.get(slug)?.focus;
  }

  getInteractiveObjects(): readonly Object3D[] {
    return this.interactiveObjects;
  }

  getProjectSlug(object: Object3D | undefined): string | undefined {
    let target = object;
    while (target) {
      const slug = target.userData.rsuiProjectSlug;
      if (typeof slug === 'string') return slug;
      target = target.parent ?? undefined;
    }
    return undefined;
  }

  setActivePage(page: RSUIPage, immediate = false): void {
    this.activePage = page;
    this.regions.forEach((region, key) => {
      region.targetEmphasis = key === page ? 1 : 0.08;
      if (immediate) region.emphasis = region.targetEmphasis;
    });
  }

  setHoveredProject(slug: string | undefined): void {
    this.hoveredProject = slug;
  }

  setSelectedProject(slug: string | undefined): void {
    this.selectedProject = slug;
  }

  update(frame: ClockFrame, camera: PerspectiveCamera, motionEnabled: boolean): void {
    this.updateBackground(camera);
    this.updateRegions(frame, motionEnabled);
  }

  resize(camera: PerspectiveCamera): void {
    this.updateBackground(camera);
  }

  dispose(): void {
    this.scene.traverse((object) => {
      const mesh = object as Mesh;
      mesh.geometry?.dispose?.();
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => material?.dispose());
    });
    this.scene.clear();
  }

  private createWorld(): void {
    this.createStarField();
    this.createHomeRegion();
    this.createAboutRegion();
    this.createProjectsRegion();
    this.createPublicationsRegion();
    this.createNotesRegion();
  }

  private createHomeRegion(): void {
    const region = this.createRegion('home');
    const core = new Mesh(
      new IcosahedronGeometry(0.7, 3),
      createGlassMaterial({ color: 0x83d9ff, emissive: 0x143e66, emissiveIntensity: 0.55 }),
    );
    region.group.add(core);
    this.track(region, core.material);

    [1.25, 1.9, 2.65].forEach((radius, index) => {
      const ring = new Mesh(
        new TorusGeometry(radius, 0.012, 8, 96),
        new MeshBasicMaterial({
          color: index === 1 ? 0xb991ff : 0x78d7ff,
          transparent: true,
          opacity: 0.54 - index * 0.09,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      );
      ring.rotation.x = index === 1 ? Math.PI * 0.56 : Math.PI * (0.24 + index * 0.23);
      ring.rotation.y = index * 0.34;
      region.group.add(ring);
      this.track(region, ring.material);
    });
  }

  private createAboutRegion(): void {
    const region = this.createRegion('about');
    region.group.position.x = 14;
    const count = Math.round(580 * this.particleCount);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new Color(0x7bdcff);
    const colorB = new Color(0xbc91ff);

    for (let index = 0; index < count; index += 1) {
      const seed = seeded(index + 73);
      const theta = seed * Math.PI * 2;
      const phi = seeded(index + 114) * Math.PI;
      const radius = 0.72 + seeded(index + 332) * 1.65;
      const offset = index * 3;
      positions[offset] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[offset + 1] = Math.cos(phi) * radius * 0.78;
      positions[offset + 2] = Math.sin(phi) * Math.sin(theta) * radius;
      const color = colorA.clone().lerp(colorB, seeded(index + 801));
      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    const material = createPointCloudMaterial({ vertexColors: true, size: 0.045, opacity: 0.78 });
    const cloud = new Points(geometry, material);
    region.group.add(cloud);
    this.track(region, material);

    const halo = new Mesh(new SphereGeometry(1.75, 32, 32), createGlowMaterial({ color: 0x9adaff, opacity: 0.22, power: 1.7 }));
    region.group.add(halo);
    this.track(region, halo.material);
  }

  private createProjectsRegion(): void {
    const region = this.createRegion('projects');
    region.group.position.x = 29;
    const orbit = new Mesh(
      new TorusGeometry(4.1, 0.01, 6, 160),
      new MeshBasicMaterial({ color: 0x7cd8ff, transparent: true, opacity: 0.22, depthWrite: false }),
    );
    orbit.rotation.x = Math.PI * 0.47;
    region.group.add(orbit);
    this.track(region, orbit.material);

    projects.forEach((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2 - Math.PI * 0.18;
      const radius = 2.25 + (index % 2) * 1.1;
      const localPosition = new Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.8) * 1.15, Math.sin(angle) * radius * 0.55);
      const node = new Group();
      node.position.copy(localPosition);
      node.userData.rsuiProjectSlug = project.slug;
      node.userData.rsuiInteractive = true;

      const orb = new Mesh(
        new IcosahedronGeometry(0.34 + (index % 3) * 0.05, 2),
        createGlassMaterial({
          color: index % 2 ? 0xbc93ff : 0x81dfff,
          emissive: index % 2 ? 0x29154a : 0x0d3652,
          emissiveIntensity: 0.72,
        }),
      );
      const halo = new Mesh(
        new TorusGeometry(0.58 + (index % 2) * 0.08, 0.012, 6, 48),
        new MeshBasicMaterial({ color: 0x92dcff, transparent: true, opacity: 0.62, depthWrite: false }),
      );
      halo.rotation.x = Math.PI * 0.5;
      node.add(orb, halo);
      region.group.add(node);
      this.track(region, orb.material);
      this.track(region, halo.material);
      this.interactiveObjects.push(orb, halo);
      this.projectNodes.set(project.slug, {
        slug: project.slug,
        object: node,
        focus: {
          position: new Vector3(29 + localPosition.x * 0.45, localPosition.y + 0.7, 6.2 + localPosition.z * 0.45),
          lookAt: new Vector3(29 + localPosition.x, localPosition.y, localPosition.z),
        },
      });
    });
  }

  private createPublicationsRegion(): void {
    const region = this.createRegion('publications');
    region.group.position.x = 44;
    const curve = new CatmullRomCurve3([
      new Vector3(-4.2, -1.1, 0),
      new Vector3(-2.2, 0.7, -0.5),
      new Vector3(0, -0.15, 0.32),
      new Vector3(2.35, 1.05, -0.42),
      new Vector3(4.2, -0.32, 0),
    ]);
    const line = new Line(
      new BufferGeometry().setFromPoints(curve.getPoints(96)),
      new LineBasicMaterial({ color: 0x9edfff, transparent: true, opacity: 0.62 }),
    );
    region.group.add(line);
    this.track(region, line.material);

    curve.getPoints(5).forEach((point, index) => {
      const dot = new Mesh(
        new SphereGeometry(index === 2 ? 0.22 : 0.13, 16, 16),
        createGlowMaterial({ color: index === 2 ? 0xc49bff : 0x8bdcff, opacity: 0.9, intensity: 1.3 }),
      );
      dot.position.copy(point);
      region.group.add(dot);
      this.track(region, dot.material);
    });
  }

  private createNotesRegion(): void {
    const region = this.createRegion('notes');
    region.group.position.x = 59;
    [-2.1, 0, 2.1].forEach((x, index) => {
      const sheet = new Mesh(
        new PlaneGeometry(1.55, 2.15),
        createGlassMaterial({
          color: index === 1 ? 0x9ccfff : 0xc3a4ff,
          opacity: 0.3,
          roughness: 0.25,
          emissive: 0x11274b,
          emissiveIntensity: 0.2,
        }),
      );
      sheet.position.set(x, Math.sin(index) * 0.42, -index * 0.35);
      sheet.rotation.set(-0.05 + index * 0.07, index * 0.18, 0.03 * index);
      region.group.add(sheet);
      this.track(region, sheet.material);

      for (let row = 0; row < 5; row += 1) {
        const line = new Mesh(
          new PlaneGeometry(0.93 - (row % 2) * 0.18, 0.018),
          new MeshBasicMaterial({ color: 0xc8e9ff, transparent: true, opacity: 0.46, depthWrite: false }),
        );
        line.position.set(x - 0.12, 0.57 - row * 0.25 + Math.sin(index) * 0.42, 0.025 - index * 0.35);
        line.rotation.copy(sheet.rotation);
        region.group.add(line);
        this.track(region, line.material);
      }
    });
  }

  private createStarField(): void {
    const count = Math.round(720 * this.particleCount);
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positions[offset] = seeded(index + 11) * 78 - 10;
      positions[offset + 1] = seeded(index + 64) * 19 - 8.5;
      positions[offset + 2] = seeded(index + 127) * -20 - 3;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const stars = new Points(geometry, createPointCloudMaterial({ color: 0x9adfff, size: 0.018, opacity: 0.32 }));
    stars.userData.rsuiAmbient = true;
    this.scene.add(stars);
  }

  private createRegion(page: RSUIPage): Region {
    const group = new Group();
    group.name = `rsui-region-${page}`;
    const region: Region = { group, materials: [], baseOpacities: new Map(), emphasis: 1, targetEmphasis: 1 };
    this.regions.set(page, region);
    this.scene.add(group);
    return region;
  }

  private track(region: Region, material: Material): void {
    region.materials.push(material);
    region.baseOpacities.set(material, 'opacity' in material ? material.opacity : 1);
  }

  private updateBackground(camera: PerspectiveCamera): void {
    const distance = 22;
    const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
    this.background.getWorldDirection(this.backgroundDirection);
    camera.getWorldDirection(this.backgroundDirection);
    this.backgroundPosition.copy(camera.position).addScaledVector(this.backgroundDirection, distance);
    this.background.position.copy(this.backgroundPosition);
    this.background.quaternion.copy(camera.quaternion);
    this.background.scale.set(height * camera.aspect, height, 1);
  }

  private updateRegions(frame: ClockFrame, motionEnabled: boolean): void {
    this.regions.forEach((region, page) => {
      region.emphasis += (region.targetEmphasis - region.emphasis) * Math.min(1, frame.delta * 4.4);
      region.group.scale.setScalar(0.83 + region.emphasis * 0.17);
      region.group.visible = region.emphasis > 0.03;
      region.materials.forEach((material) => {
        if (!('opacity' in material)) return;
        const baseOpacity = region.baseOpacities.get(material) ?? 1;
        material.opacity = baseOpacity * (0.14 + region.emphasis * 0.86);
      });

      if (!motionEnabled) return;
      const direction = page === this.activePage ? 1 : 0.2;
      region.group.rotation.y += frame.delta * 0.07 * direction;
      region.group.rotation.x = Math.sin(frame.elapsed * 0.19 + region.group.position.x) * 0.035 * direction;
    });

    this.projectNodes.forEach((node) => {
      const highlighted = node.slug === this.hoveredProject || node.slug === this.selectedProject;
      const scale = highlighted ? 1.38 : 1;
      node.object.scale.lerp(this.nodeScale.setScalar(scale), Math.min(1, frame.delta * 7));
      if (motionEnabled) node.object.rotation.y += frame.delta * (highlighted ? 0.64 : 0.2);
    });
  }
}

function seeded(value: number): number {
  const result = Math.sin(value * 12.9898) * 43758.5453;
  return result - Math.floor(result);
}

export { REGION_FOCUSES };
