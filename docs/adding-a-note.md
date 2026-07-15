# Adding a Note

Notes are discovered automatically from `src/data/notes/*.ts`. Each file is one index entry, so adding a note does not require editing a shared registry or the Notes page component.

## Workflow

1. Put the standalone article at `public/paper-analysis/<slug>/index.html` and keep its local assets under the same directory. Every HTML file linked from a note manifest must include the shared theme resources before `</head>` so it follows the site's saved day/night preference and exposes the in-page theme toggle:

   ```html
   <link rel="stylesheet" href="/paper-analysis/theme.css">
   <script src="/paper-analysis/theme.js"></script>
   ```

2. Add `src/data/notes/<slug>.ts` with `defineNote()`.
3. Set `publishedAt` to the paper's first public publication date (`YYYY-MM-DD`), normally the arXiv v1 submission date. Do not use the date you wrote or revised the note. Newer publication dates appear first. Use `order` only to control the order of notes with the same date.
4. Run `npm run check` and `npm run build`.

Minimal manifest:

```ts
import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'my-paper-analysis',
  publishedAt: '2025-05-08',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'My paper title',
    zh: '我的论文标题',
  },
  summary: {
    en: 'A short summary shown in the Notes index.',
    zh: '显示在笔记索引中的简短摘要。',
  },
  topics: {
    en: ['Topic one', 'Topic two'],
    zh: ['主题一', '主题二'],
  },
  href: '/paper-analysis/my-paper-analysis/',
});
```

For multiple editions of one article, keep one index entry, omit `href`, and provide at least two `versions`:

```ts
versions: [
  {
    label: { en: 'Academic version', zh: '学术版' },
    href: '/paper-analysis/my-paper-analysis/academic/',
  },
  {
    label: { en: 'Concise version', zh: '精炼版' },
    href: '/paper-analysis/my-paper-analysis/concise/',
  },
],
```

Choose exactly one link shape per entry:

- `href` for a single article page.
- `versions` for two or more labeled versions. Version URLs must be unique.

The shared theme supports the legacy paper tokens (`--ink`, `--paper`, `--surface`, `--line`) and the neutral document tokens (`--text`, `--bg`, `--paper`, `--accent`, `--soft`, `--code`). Prefer these variables over hard-coded colors for page-sized surfaces. Add a page-specific `html[data-theme="dark"]` override only for components with custom colors.

During the Astro build, the loader rejects missing or duplicate IDs, invalid link shapes, duplicate version URLs, missing local article files, and linked pages that omit `theme.css` or `theme.js`. `NoteEntry`, `NoteVersion`, `NoteVersions`, and `defineNote` are exported from `src/data/noteSchema.ts`.
