import type { RouteId } from '../../config/routes';
import type { SpatialQuality, SpatialTheme } from './EventBus';

export type SpatialState = Readonly<{
  currentRoute: RouteId;
  targetRoute: RouteId;
  previewRoute?: RouteId;
  theme: SpatialTheme;
  motionEnabled: boolean;
  quality: SpatialQuality;
}>;

export class StateManager {
  private state: SpatialState;

  constructor(initial: SpatialState) {
    this.state = initial;
  }

  get snapshot(): SpatialState {
    return this.state;
  }

  setTargetRoute(targetRoute: RouteId): SpatialState {
    this.state = { ...this.state, targetRoute };
    return this.state;
  }

  commitRoute(currentRoute: RouteId): SpatialState {
    this.state = { ...this.state, currentRoute, targetRoute: currentRoute, previewRoute: undefined };
    return this.state;
  }

  setPreviewRoute(previewRoute: RouteId | undefined): SpatialState {
    this.state = { ...this.state, previewRoute };
    return this.state;
  }

  setTheme(theme: SpatialTheme): SpatialState {
    this.state = { ...this.state, theme };
    return this.state;
  }

  setMotionEnabled(motionEnabled: boolean): SpatialState {
    this.state = { ...this.state, motionEnabled };
    return this.state;
  }

  setQuality(quality: SpatialQuality): SpatialState {
    this.state = { ...this.state, quality };
    return this.state;
  }
}
