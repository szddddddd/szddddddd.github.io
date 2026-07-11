import { PAGE_TO_STATE, type EngineSnapshot, type RSUIPage, type RSUITheme } from './EngineState';

export class StateManager {
  private state: EngineSnapshot;

  constructor(initialState: EngineSnapshot) {
    this.state = initialState;
  }

  get snapshot(): EngineSnapshot {
    return this.state;
  }

  setPage(page: RSUIPage, route: string): EngineSnapshot {
    this.state = {
      ...this.state,
      previousPage: this.state.page,
      previousState: this.state.state,
      page,
      state: PAGE_TO_STATE[page],
      route,
      transitionActive: true,
      transitionProgress: 0,
    };
    return this.state;
  }

  setTheme(theme: RSUITheme): EngineSnapshot {
    this.state = { ...this.state, theme };
    return this.state;
  }

  setMotionEnabled(motionEnabled: boolean): EngineSnapshot {
    this.state = { ...this.state, motionEnabled };
    return this.state;
  }

  setScroll(scroll: number): EngineSnapshot {
    this.state = { ...this.state, scroll: Math.max(0, Math.min(1, scroll)) };
    return this.state;
  }

  setTransitionProgress(transitionProgress: number): EngineSnapshot {
    const progress = Math.max(0, Math.min(1, transitionProgress));
    this.state = {
      ...this.state,
      transitionProgress: progress,
      transitionActive: progress < 1,
    };
    return this.state;
  }
}
