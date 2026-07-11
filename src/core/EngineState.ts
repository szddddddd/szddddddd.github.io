export const RSUI_PAGES = ['home', 'about', 'projects', 'publications', 'notes'] as const;
export const RSUI_STATES = ['HOME', 'ABOUT', 'PROJECTS', 'PUBLICATIONS', 'NOTES'] as const;

export type RSUIPage = (typeof RSUI_PAGES)[number];
export type RSUIState = (typeof RSUI_STATES)[number];
export type RSUITheme = 'dark' | 'light';

export const PAGE_TO_STATE: Record<RSUIPage, RSUIState> = {
  home: 'HOME',
  about: 'ABOUT',
  projects: 'PROJECTS',
  publications: 'PUBLICATIONS',
  notes: 'NOTES',
};

export const STATE_TO_PAGE: Record<RSUIState, RSUIPage> = {
  HOME: 'home',
  ABOUT: 'about',
  PROJECTS: 'projects',
  PUBLICATIONS: 'publications',
  NOTES: 'notes',
};

export type EngineSnapshot = Readonly<{
  page: RSUIPage;
  state: RSUIState;
  previousPage: RSUIPage;
  previousState: RSUIState;
  route: string;
  theme: RSUITheme;
  motionEnabled: boolean;
  scroll: number;
  transitionProgress: number;
  transitionActive: boolean;
}>;

export const pageIndex = (page: RSUIPage) => RSUI_PAGES.indexOf(page);

export function isRSUIPage(value: string | null | undefined): value is RSUIPage {
  return value !== undefined && value !== null && RSUI_PAGES.includes(value as RSUIPage);
}

export function getInitialEngineState(): EngineSnapshot {
  const page = getPageFromDocument();

  return {
    page,
    state: PAGE_TO_STATE[page],
    previousPage: page,
    previousState: PAGE_TO_STATE[page],
    route: window.location.pathname,
    theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
    motionEnabled: document.documentElement.dataset.motion !== 'reduced',
    scroll: 0,
    transitionProgress: 1,
    transitionActive: false,
  };
}

function getPageFromDocument(): RSUIPage {
  const page = document.querySelector<HTMLElement>('[data-rsui-page]')?.dataset.rsuiPage;
  return isRSUIPage(page) ? page : 'home';
}
