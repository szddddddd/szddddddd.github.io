import type { RouteId } from '../../config/routes';

export type RouteScenePreset = 'research-map' | 'identity-field' | 'media-flow' | 'citation-grid' | 'knowledge-network';

export type RouteTransitionPreset = Readonly<{
  duration: number;
}>;

/**
 * A structural preset index consumed by the neural-field shader.
 *
 * Values are intentionally kept on the existing scene-preset scale (0..4)
 * so the shader can smoothly interpolate between adjacent vocabularies.
 */
export type RouteStructure = number;

export type RouteState = Readonly<{
  camera: Readonly<{
    position: readonly [number, number, number];
    target: readonly [number, number, number];
  }>;
  particleDensity: number;
  flowStrength: number;
  noiseScale: number;
  primaryColor: string;
  secondaryColor: string;
  bloomIntensity: number;
  vignetteIntensity: number;
  scenePreset: RouteScenePreset;
  transition: RouteTransitionPreset;
}>;

export type ProjectCategorySceneId = 'all' | '3d-vision' | 'medical-imaging' | 'creative-coding' | 'coursework';

export type ProjectCategorySceneState = Readonly<Pick<
  RouteState,
  'particleDensity' | 'flowStrength' | 'noiseScale' | 'primaryColor' | 'secondaryColor' | 'bloomIntensity' | 'vignetteIntensity'
>>;

/** Maps the existing semantic scene presets to a stable shader structure bias. */
export const scenePresetStructures: Record<RouteScenePreset, RouteStructure> = {
  'research-map': 0,
  'identity-field': 1,
  'media-flow': 2,
  'citation-grid': 3,
  'knowledge-network': 4,
};

export function getSceneStructure(preset: RouteScenePreset): RouteStructure {
  return scenePresetStructures[preset];
}

export const routeStates: Record<RouteId, RouteState> = {
  home: {
    camera: { position: [0, 1.4, 11], target: [0, 0, 0] },
    particleDensity: 0.86,
    flowStrength: 0.16,
    noiseScale: 2.55,
    primaryColor: '#77e0f5',
    secondaryColor: '#8b7cff',
    bloomIntensity: 0.32,
    vignetteIntensity: 0.28,
    scenePreset: 'research-map',
    transition: { duration: 560 },
  },
  about: {
    camera: { position: [4.8, 1.8, 9.2], target: [1.4, 0.2, 0] },
    particleDensity: 0.64,
    flowStrength: 0.08,
    noiseScale: 2.05,
    primaryColor: '#65d8cb',
    secondaryColor: '#77e0f5',
    bloomIntensity: 0.22,
    vignetteIntensity: 0.22,
    scenePreset: 'identity-field',
    transition: { duration: 520 },
  },
  projects: {
    camera: { position: [10.4, 2.5, 10.6], target: [7, 0.25, 0] },
    particleDensity: 0.78,
    flowStrength: 0.28,
    noiseScale: 3.1,
    primaryColor: '#8b7cff',
    secondaryColor: '#77e0f5',
    bloomIntensity: 0.3,
    vignetteIntensity: 0.24,
    scenePreset: 'media-flow',
    transition: { duration: 600 },
  },
  publications: {
    camera: { position: [15.6, 1.4, 10.2], target: [12, 0, 0] },
    particleDensity: 0.32,
    flowStrength: 0.035,
    noiseScale: 1.6,
    primaryColor: '#e7c46a',
    secondaryColor: '#f2f0e9',
    bloomIntensity: 0.12,
    vignetteIntensity: 0.18,
    scenePreset: 'citation-grid',
    transition: { duration: 520 },
  },
  humanities: {
    camera: { position: [18.1, 1.7, 10.4], target: [14.8, 0.2, 0] },
    particleDensity: 0.46,
    flowStrength: 0.06,
    noiseScale: 1.92,
    primaryColor: '#a6c48a',
    secondaryColor: '#77e0f5',
    bloomIntensity: 0.16,
    vignetteIntensity: 0.24,
    scenePreset: 'knowledge-network',
    transition: { duration: 540 },
  },
  notes: {
    camera: { position: [20.4, 1.8, 10.4], target: [17.2, 0.3, 0] },
    particleDensity: 0.58,
    flowStrength: 0.11,
    noiseScale: 2.25,
    primaryColor: '#d98ec8',
    secondaryColor: '#8b7cff',
    bloomIntensity: 0.2,
    vignetteIntensity: 0.27,
    scenePreset: 'knowledge-network',
    transition: { duration: 540 },
  },
};

export const projectCategoryStates: Record<Exclude<ProjectCategorySceneId, 'all'>, ProjectCategorySceneState> = {
  '3d-vision': {
    particleDensity: 0.86,
    flowStrength: 0.31,
    noiseScale: 3.22,
    primaryColor: '#8b7cff',
    secondaryColor: '#77e0f5',
    bloomIntensity: 0.34,
    vignetteIntensity: 0.22,
  },
  'medical-imaging': {
    particleDensity: 0.56,
    flowStrength: 0.12,
    noiseScale: 2.18,
    primaryColor: '#e7c46a',
    secondaryColor: '#65d8cb',
    bloomIntensity: 0.2,
    vignetteIntensity: 0.2,
  },
  'creative-coding': {
    particleDensity: 0.8,
    flowStrength: 0.33,
    noiseScale: 3.38,
    primaryColor: '#d98ec8',
    secondaryColor: '#8b7cff',
    bloomIntensity: 0.3,
    vignetteIntensity: 0.27,
  },
  coursework: {
    particleDensity: 0.7,
    flowStrength: 0.18,
    noiseScale: 2.72,
    primaryColor: '#77e0f5',
    secondaryColor: '#8b7cff',
    bloomIntensity: 0.24,
    vignetteIntensity: 0.24,
  },
};

export function isProjectCategorySceneId(value: string): value is ProjectCategorySceneId {
  return value === 'all' || value in projectCategoryStates;
}
