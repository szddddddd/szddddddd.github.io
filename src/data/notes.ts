import type { NoteEntry } from './noteSchema';

export type { NoteEntry, NoteText, NoteTopics, NoteVersion } from './noteSchema';

const noteModules = import.meta.glob<{ default: NoteEntry }>('./notes/*.ts', {
  eager: true,
});
const loadedNotes = Object.entries(noteModules).map(([source, module]) => {
  const note = module.default;

  if (!note?.id || !/^\d{4}-\d{2}-\d{2}$/.test(note.publishedAt)) {
    throw new Error(`Invalid note manifest: ${source}`);
  }

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
