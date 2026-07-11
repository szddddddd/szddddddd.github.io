export type Locale = 'en' | 'zh';

export type SpatialPreset = 'home' | 'about' | 'projects' | 'publications' | 'notes';

export type RouteDefinition = Readonly<{
  id: SpatialPreset;
  index: string;
  path: Readonly<Record<Locale, string>>;
  label: Readonly<Record<Locale, string>>;
  shortLabel: Readonly<Record<Locale, string>>;
  description: Readonly<Record<Locale, string>>;
  accent: string;
  spatialPreset: SpatialPreset;
  showInPrimaryNavigation: boolean;
}>;

export const routes = [
  {
    id: 'home',
    index: '00',
    path: { en: '/', zh: '/zh/' },
    label: { en: 'Home', zh: '首页' },
    shortLabel: { en: 'HOME', zh: '首页' },
    description: { en: 'Spatial research map', zh: '空间研究图谱' },
    accent: '#77e0f5',
    spatialPreset: 'home',
    showInPrimaryNavigation: true,
  },
  {
    id: 'about',
    index: '01',
    path: { en: '/about/', zh: '/zh/about/' },
    label: { en: 'About', zh: '关于' },
    shortLabel: { en: 'ABOUT', zh: '关于' },
    description: { en: 'Profile and research focus', zh: '个人信息与研究方向' },
    accent: '#65d8cb',
    spatialPreset: 'about',
    showInPrimaryNavigation: true,
  },
  {
    id: 'projects',
    index: '02',
    path: { en: '/projects/', zh: '/zh/projects/' },
    label: { en: 'Projects', zh: '项目' },
    shortLabel: { en: 'PROJECTS', zh: '项目' },
    description: { en: 'Indexed research and coursework', zh: '研究项目与课程作品' },
    accent: '#8b7cff',
    spatialPreset: 'projects',
    showInPrimaryNavigation: true,
  },
  {
    id: 'publications',
    index: '03',
    path: { en: '/publications/', zh: '/zh/publications/' },
    label: { en: 'Publications', zh: '出版物' },
    shortLabel: { en: 'PUBLICATIONS', zh: '出版物' },
    description: { en: 'Reports and technical work', zh: '报告与技术文稿' },
    accent: '#e7c46a',
    spatialPreset: 'publications',
    showInPrimaryNavigation: true,
  },
  {
    id: 'notes',
    index: '04',
    path: { en: '/notes/', zh: '/zh/notes/' },
    label: { en: 'Notes', zh: '笔记' },
    shortLabel: { en: 'NOTES', zh: '笔记' },
    description: { en: 'Research notebook', zh: '研究笔记' },
    accent: '#d98ec8',
    spatialPreset: 'notes',
    showInPrimaryNavigation: true,
  },
] as const satisfies readonly RouteDefinition[];

export type RouteId = (typeof routes)[number]['id'];

export const routesById = Object.fromEntries(routes.map((route) => [route.id, route])) as Record<RouteId, RouteDefinition>;

export const primaryRoutes = routes.filter((route) => route.showInPrimaryNavigation) as readonly RouteDefinition[];

export const pagePaths = {
  home: { en: '/', zh: '/zh/' },
  about: { en: '/about/', zh: '/zh/about/' },
  projects: { en: '/projects/', zh: '/zh/projects/' },
  projectSi140a: { en: '/projects/si140a/', zh: '/zh/projects/si140a/' },
  projectBme1312: { en: '/projects/bme1312/', zh: '/zh/projects/bme1312/' },
  projectBme1312Proj2: { en: '/projects/bme1312-proj2/', zh: '/zh/projects/bme1312-proj2/' },
  projectCs182: { en: '/projects/cs182/', zh: '/zh/projects/cs182/' },
  projectSi100b: { en: '/projects/si100b/', zh: '/zh/projects/si100b/' },
  projectArts1308: { en: '/projects/arts1308/', zh: '/zh/projects/arts1308/' },
  publications: { en: '/publications/', zh: '/zh/publications/' },
  coursework: { en: '/coursework/', zh: '/zh/coursework/' },
  notes: { en: '/notes/', zh: '/zh/notes/' },
} as const satisfies Record<string, Readonly<Record<Locale, string>>>;

export type PageKey = keyof typeof pagePaths;

const routeForPage: Record<PageKey, RouteId> = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  projectSi140a: 'projects',
  projectBme1312: 'projects',
  projectBme1312Proj2: 'projects',
  projectCs182: 'projects',
  projectSi100b: 'projects',
  projectArts1308: 'projects',
  publications: 'publications',
  coursework: 'projects',
  notes: 'notes',
};

export function getPath(locale: Locale, page: PageKey): string {
  return pagePaths[page][locale];
}

export function getRouteForPage(page: PageKey): RouteDefinition {
  return routesById[routeForPage[page]];
}

export function getRouteForPath(pathname: string): RouteDefinition {
  const normalized = normalizePath(pathname);
  const exact = routes.find((route) => Object.values(route.path).some((path) => normalizePath(path) === normalized));
  if (exact) return exact;

  if (normalized === '/coursework' || normalized === '/zh/coursework' || normalized.startsWith('/projects/') || normalized.startsWith('/zh/projects/')) {
    return routesById.projects;
  }

  return routesById.home;
}

export function getLocaleFromPath(pathname: string): Locale {
  const normalized = normalizePath(pathname);
  return normalized === '/zh' || normalized.startsWith('/zh/') ? 'zh' : 'en';
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === 'en' ? 'zh' : 'en';
}

export function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
}

export function isPrimaryRouteId(value: string): value is RouteId {
  return routes.some((route) => route.id === value);
}
