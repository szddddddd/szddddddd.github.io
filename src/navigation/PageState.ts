import type { RSUIPage } from '../core/EngineState';

const SPATIAL_PAGE_KEYS: Record<string, RSUIPage> = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  publications: 'publications',
  notes: 'notes',
  projectSi140a: 'projects',
  projectBme1312: 'projects',
  projectBme1312Proj2: 'projects',
  projectCs182: 'projects',
  projectSi100b: 'projects',
  projectArts1308: 'projects',
  coursework: 'projects',
};

export function getSpatialPage(pageKey: string | undefined): RSUIPage {
  return SPATIAL_PAGE_KEYS[pageKey ?? ''] ?? 'home';
}

export function getDocumentSpatialPage(documentRoot: ParentNode = document): RSUIPage {
  const page = documentRoot.querySelector<HTMLElement>('[data-rsui-page]')?.dataset.rsuiPage;
  return getSpatialPage(page);
}
