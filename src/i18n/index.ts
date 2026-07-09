import { en } from './en';
import { zh } from './zh';

export type Lang = 'en' | 'zh';
export type PageKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'projectBme1312'
  | 'projectCs182'
  | 'projectSi100b'
  | 'projectArts1308'
  | 'publications'
  | 'coursework'
  | 'notes';

export const i18n = { en, zh } as const;

export const pages: Record<PageKey, { en: string; zh: string }> = {
  home: { en: '/', zh: '/zh/' },
  about: { en: '/about', zh: '/zh/about' },
  projects: { en: '/projects', zh: '/zh/projects' },
  projectBme1312: { en: '/projects/bme1312', zh: '/zh/projects/bme1312' },
  projectCs182: { en: '/projects/cs182', zh: '/zh/projects/cs182' },
  projectSi100b: { en: '/projects/si100b', zh: '/zh/projects/si100b' },
  projectArts1308: { en: '/projects/arts1308', zh: '/zh/projects/arts1308' },
  publications: { en: '/publications', zh: '/zh/publications' },
  coursework: { en: '/coursework', zh: '/zh/coursework' },
  notes: { en: '/notes', zh: '/zh/notes' },
};

export function getCopy(lang: Lang) {
  return i18n[lang];
}

export function getPath(lang: Lang, page: PageKey) {
  return pages[page][lang];
}

export function getOppositeLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}
