import { en } from './en';
import { zh } from './zh';

export type Locale = 'en' | 'zh';
export type Lang = Locale;
export type PageKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'projectSi140a'
  | 'projectBme1312'
  | 'projectBme1312Proj2'
  | 'projectCs182'
  | 'projectSi100b'
  | 'projectArts1308'
  | 'publications'
  | 'coursework'
  | 'notes';

export const i18n = { en, zh } as const;

export const primaryNavPageKeys = ['home', 'about', 'projects', 'publications', 'notes'] as const;
export type PrimaryNavPageKey = (typeof primaryNavPageKeys)[number];

export const pages: Record<PageKey, { en: string; zh: string }> = {
  home: { en: '/', zh: '/zh/' },
  about: { en: '/about', zh: '/zh/about' },
  projects: { en: '/projects', zh: '/zh/projects' },
  projectSi140a: { en: '/projects/si140a', zh: '/zh/projects/si140a' },
  projectBme1312: { en: '/projects/bme1312', zh: '/zh/projects/bme1312' },
  projectBme1312Proj2: { en: '/projects/bme1312-proj2', zh: '/zh/projects/bme1312-proj2' },
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

export function getPath(lang: Locale, page: PageKey) {
  return pages[page][lang];
}

export function localizedPath(locale: Locale, page: PageKey) {
  return getPath(locale, page);
}

export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? new URL(url, 'https://locale.invalid').pathname : url.pathname;
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en';
}

export function getOppositeLang(lang: Locale): Locale {
  return lang === 'en' ? 'zh' : 'en';
}
