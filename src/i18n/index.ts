import {
  getLocaleFromPath,
  getOppositeLocale,
  getPath as getConfiguredPath,
  pagePaths,
  primaryRoutes,
  routes,
  type Locale,
  type PageKey,
  type RouteId,
} from '../config/routes';
import { en } from './en';
import { zh } from './zh';

export type { Locale, PageKey } from '../config/routes';
export type Lang = Locale;
export type PrimaryNavPageKey = RouteId;

export const i18n = { en, zh } as const;

// Navigation derives from the route configuration; no component owns a second list.
export const primaryNavPageKeys = primaryRoutes.map((route) => route.id) as readonly RouteId[];
export const pages = pagePaths;
export { primaryRoutes, routes };

export function getCopy(lang: Lang) {
  return i18n[lang];
}

export function getPath(lang: Locale, page: PageKey) {
  return getConfiguredPath(lang, page);
}

export function localizedPath(locale: Locale, page: PageKey) {
  return getConfiguredPath(locale, page);
}

export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? new URL(url, 'https://locale.invalid').pathname : url.pathname;
  return getLocaleFromPath(pathname);
}

export function getOppositeLang(lang: Locale): Locale {
  return getOppositeLocale(lang);
}
