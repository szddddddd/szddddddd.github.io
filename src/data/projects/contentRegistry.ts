import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ProjectContent } from './contentSchema';

export type { ProjectContent, ProjectContentBlock, ProjectContentSection, ProjectDocument } from './contentSchema';

const contentModules = import.meta.glob<{ default: ProjectContent }>('./content/*.ts', { eager: true });
const loadedContent = Object.entries(contentModules).map(([source, module]) => {
  const content = module.default;

  if (!content?.id || !content.documents?.en || !content.documents?.zh || content.sections.length === 0) {
    throw new Error(`Invalid project content module: ${source}`);
  }

  for (const locale of ['en', 'zh'] as const) {
    const document = content.documents[locale];
    if (!document.metaTitle || !document.metaDescription || !document.hero?.title || document.details.length === 0) {
      throw new Error(`Incomplete ${locale} project content: ${source}`);
    }
    validateFigures(document, source);
  }

  return content;
});

const duplicateIds = loadedContent.map((content) => content.id).filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate project content id(s): ${[...new Set(duplicateIds)].join(', ')}`);
}

export const projectContentEntries = loadedContent as readonly ProjectContent[];
export const projectContentBySlug = Object.fromEntries(loadedContent.map((content) => [content.id, content])) as Readonly<Record<string, ProjectContent>>;

export function getProjectContent(slug: string): ProjectContent {
  const content = projectContentBySlug[slug];
  if (!content) throw new Error(`Missing project content: ${slug}`);
  return content;
}

function validateFigures(value: unknown, source: string): void {
  if (Array.isArray(value)) {
    value.forEach((item) => validateFigures(item, source));
    return;
  }
  if (!value || typeof value !== 'object') return;

  const record = value as Record<string, unknown>;
  if (typeof record.src === 'string' && record.src.startsWith('/projects/')) {
    const assetPath = resolve(process.cwd(), 'public', record.src.slice(1));
    if (!existsSync(assetPath)) throw new Error(`Missing project figure: ${source} -> ${record.src}`);
  }
  Object.values(record).forEach((item) => validateFigures(item, source));
}
