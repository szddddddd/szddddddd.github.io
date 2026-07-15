export type NoteText = Readonly<Record<'en' | 'zh', string>>;

export type NoteTopics = Readonly<Record<'en' | 'zh', readonly string[]>>;

export type NoteVersion = Readonly<{
  label: NoteText;
  href: string;
}>;

export type NoteEntry = Readonly<{
  id: string;
  publishedAt: string;
  format: NoteText;
  title: NoteText;
  summary: NoteText;
  topics: NoteTopics;
  href: string;
  versions?: readonly NoteVersion[];
  order?: number;
}>;

export function defineNote<const T extends NoteEntry>(entry: T): T {
  return entry;
}
