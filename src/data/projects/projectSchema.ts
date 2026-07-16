import type { Locale } from '../../config/routes';

export type LocalizedText = Readonly<Record<Locale, string>>;
export type LinkValue = string | LocalizedText;

export type ProjectCategory = '3d-vision' | 'medical-imaging' | 'creative-coding' | 'coursework';

export type ProjectCover = Readonly<{
  src: string;
  alt: LocalizedText;
}>;

export type ProjectLinkSet = Readonly<{
  details?: LinkValue;
  shadertoy?: LinkValue;
  report?: LinkValue;
  slides?: LinkValue;
  paper?: LinkValue;
  code?: LinkValue;
  demo?: LinkValue;
  readme?: LinkValue;
}>;

export type Project = Readonly<{
  id: string;
  number: string;
  slug: string;
  sortOrder: number;
  featured: boolean;
  isPublic: boolean;
  title: LocalizedText;
  type?: LocalizedText;
  course?: string | LocalizedText;
  year: string;
  description: LocalizedText;
  summary: LocalizedText;
  role?: LocalizedText;
  categories: readonly ProjectCategory[];
  displayTags: readonly LocalizedText[];
  allTags: readonly string[];
  tags: readonly string[];
  image: string;
  cover: ProjectCover;
  previewVideo?: string;
  spatialAccent: string;
  links: ProjectLinkSet;
}>;

export function defineProject<const T extends Project>(project: T): T {
  return project;
}
