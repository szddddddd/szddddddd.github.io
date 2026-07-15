export type NoteText = Readonly<Record<'en' | 'zh', string>>;

export type NoteTopics = Readonly<Record<'en' | 'zh', readonly string[]>>;

export type NoteVersion = Readonly<{
  label: NoteText;
  href: string;
}>;

export type NoteVersions = readonly [NoteVersion, NoteVersion, ...NoteVersion[]];

type NoteMetadata = Readonly<{
  id: string;
  publishedAt: string;
  format: NoteText;
  title: NoteText;
  summary: NoteText;
  topics: NoteTopics;
  order?: number;
}>;

type SingleNoteLink = Readonly<{
  href: string;
  versions?: never;
}>;

type VersionedNoteLinks = Readonly<{
  href?: never;
  versions: NoteVersions;
}>;

export type NoteEntry = NoteMetadata & (SingleNoteLink | VersionedNoteLinks);

export function defineNote<const T extends NoteEntry>(entry: T): T {
  return entry;
}
