import type { Locale } from '../../config/routes';
import type { ProjectLinkSet } from './projectSchema';

export type ProjectDocument = Readonly<{
  metaTitle: string;
  metaDescription: string;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    subtitle: string;
    affiliation?: string;
  }>;
  metadata: readonly string[];
  details: readonly Readonly<{ label: string; value: string }>[];
  [key: string]: unknown;
}>;

export type ProjectValueRef = string;

export type ProjectContentBlock =
  | Readonly<{ type: 'group'; className: string; blocks: readonly ProjectContentBlock[] }>
  | Readonly<{ type: 'bullet-panel'; items: ProjectValueRef; label?: ProjectValueRef; className?: string }>
  | Readonly<{ type: 'narrative'; text: ProjectValueRef; label?: ProjectValueRef; className?: string }>
  | Readonly<{ type: 'figure'; item?: ProjectValueRef; src?: string; alt?: ProjectValueRef; caption?: ProjectValueRef; className?: string }>
  | Readonly<{ type: 'card-grid'; items: ProjectValueRef; label?: ProjectValueRef; className?: string; cardClassName?: string }>
  | Readonly<{ type: 'metric-cards'; items: ProjectValueRef; className?: string; ariaLabel?: ProjectValueRef }>
  | Readonly<{ type: 'metric-table'; columns: ProjectValueRef; rows: ProjectValueRef; className?: string; ariaLabel: string }>
  | Readonly<{ type: 'gallery'; items: ProjectValueRef; className?: string; figureClassName?: string; start?: number }>
  | Readonly<{ type: 'highlight'; items: ProjectValueRef; label?: ProjectValueRef; className?: string }>
  | Readonly<{ type: 'future-grid'; items: ProjectValueRef }>
  | Readonly<{ type: 'math-panel'; formula: ProjectValueRef; intro?: ProjectValueRef; highlights?: ProjectValueRef; label?: ProjectValueRef }>
  | Readonly<{ type: 'links'; text?: ProjectValueRef; links: readonly (keyof ProjectLinkSet)[]; className?: string }>
  | Readonly<{ type: 'shadertoy-gallery'; labels: ProjectValueRef }>;

export type ProjectContentSection = Readonly<{
  id?: string;
  eyebrow?: string;
  title: ProjectValueRef;
  intro?: ProjectValueRef;
  introSource?: 'content' | 'project-description';
  blocks: readonly ProjectContentBlock[];
}>;

export type ProjectHeroAction =
  | Readonly<{ type: 'email' }>
  | Readonly<{ type: 'project-link'; link: keyof ProjectLinkSet; label: string; optional?: boolean }>
  | Readonly<{ type: 'anchor'; href: string; label: ProjectValueRef }>
  | Readonly<{ type: 'external'; href: string; label: ProjectValueRef }>;

export type ProjectContent = Readonly<{
  id: string;
  articleClass?: string;
  heroFigureClass?: string;
  heroImageClass?: string;
  heroCaption?: ProjectValueRef;
  heroCaptionFallback?: 'project-title';
  heroActions?: readonly ProjectHeroAction[];
  documents: Readonly<Record<Locale, ProjectDocument>>;
  sections: readonly ProjectContentSection[];
}>;

export function defineProjectContent<const T extends ProjectContent>(content: T): T {
  return content;
}
