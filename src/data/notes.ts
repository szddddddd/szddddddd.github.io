import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { NoteEntry } from './noteSchema';

export type { NoteEntry, NoteText, NoteTopics, NoteVersion, NoteVersions } from './noteSchema';

const publicRoot = resolve(process.cwd(), 'public');
const requiredThemeResources = ['/paper-analysis/theme.css', '/paper-analysis/theme.js'] as const;

function assertThemedNotePage(source: string, href: string): void {
  if (!href.startsWith('/paper-analysis/')) {
    throw new Error(`Note links must use /paper-analysis/: ${source} -> ${href}`);
  }

  const pathname = new URL(href, 'https://notes.local').pathname;
  const relativePath = pathname.endsWith('/') ? `${pathname.slice(1)}index.html` : pathname.slice(1);
  const htmlPath = resolve(publicRoot, relativePath);

  let html: string;

  try {
    html = readFileSync(htmlPath, 'utf8');
  } catch {
    throw new Error(`Missing note page: ${source} -> ${href}`);
  }

  const missingResources = requiredThemeResources.filter((resource) => !html.includes(resource));

  if (missingResources.length > 0) {
    throw new Error(`Note page is missing shared theme resources: ${href} (${missingResources.join(', ')})`);
  }
}

const noteModules = import.meta.glob<{ default: NoteEntry }>('./notes/*.ts', {
  eager: true,
});
const loadedNotes = Object.entries(noteModules).map(([source, module]) => {
  const note = module.default;

  if (!note?.id || !/^\d{4}-\d{2}-\d{2}$/.test(note.publishedAt)) {
    throw new Error(`Invalid note manifest: ${source}`);
  }

  const hasSingleHref = typeof note.href === 'string' && note.href.length > 0;
  const hasVersions = Array.isArray(note.versions);

  if (hasSingleHref === hasVersions) {
    throw new Error(`Note manifest must define either href or versions: ${source}`);
  }

  const hrefs = hasVersions
    ? note.versions.map((version) => version.href)
    : typeof note.href === 'string'
      ? [note.href]
      : [];

  if (hasVersions && hrefs.length < 2) {
    throw new Error(`Versioned note manifests require at least two links: ${source}`);
  }

  if (new Set(hrefs).size !== hrefs.length) {
    throw new Error(`Duplicate note version href(s): ${source}`);
  }

  hrefs.forEach((href) => assertThemedNotePage(source, href));

  return note;
});

const duplicateIds = loadedNotes
  .map((note) => note.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  throw new Error(`Duplicate note manifest id(s): ${[...new Set(duplicateIds)].join(', ')}`);
}

export const noteEntries: readonly NoteEntry[] = [...loadedNotes].sort((a, b) => {
  const dateOrder = b.publishedAt.localeCompare(a.publishedAt);

  if (dateOrder !== 0) {
    return dateOrder;
  }

  const manualOrder = (b.order ?? 0) - (a.order ?? 0);
  return manualOrder !== 0 ? manualOrder : a.id.localeCompare(b.id);
});
