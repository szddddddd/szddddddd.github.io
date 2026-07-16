# Adding a Project

Projects use the same manifest-driven workflow as Notes. A new project requires one factual manifest, one bilingual content manifest, and its public assets. Do not add route wrappers, project-specific Astro components, i18n top-level keys, or registry entries.

## 1. Choose a stable slug

Use a lowercase URL-safe slug such as `example-project`. Published slugs are public API and must not be renamed.

The generated routes are automatic:

```text
/projects/example-project/
/zh/projects/example-project/
```

## 2. Add the factual manifest

Create `src/data/projects/facts/example-project.ts`:

```ts
import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'example-project',
  slug: 'example-project',
  number: '08',
  sortOrder: 80,
  featured: false,
  isPublic: true,
  title: { en: 'English title', zh: '中文标题' },
  type: { en: 'Research Project', zh: '研究项目' },
  course: { en: 'Course or context', zh: '课程或项目背景' },
  year: '2026',
  description: { en: 'Method description.', zh: '方法描述。' },
  summary: { en: 'Index summary.', zh: '索引摘要。' },
  categories: ['3d-vision', 'coursework'],
  displayTags: [
    { en: '3D Vision', zh: '三维视觉' },
    { en: 'Method', zh: '方法' },
  ],
  allTags: ['3D Vision', 'Method'],
  tags: ['3D Vision', 'Method'],
  image: '/projects/example-project/cover.png',
  cover: {
    src: '/projects/example-project/cover.png',
    alt: { en: 'Describe the real cover.', zh: '描述真实封面。' },
  },
  spatialAccent: '#8b7cff',
  links: {
    details: { en: '/projects/example-project/', zh: '/zh/projects/example-project/' },
    report: '/projects/example-project/report.pdf',
  },
});
```

IDs and numbers must be unique. Use only factual categories: `3d-vision`, `medical-imaging`, `creative-coding`, and `coursework`. Omit unavailable links instead of using empty strings.

## 3. Add the content manifest

Create `src/data/projects/content/example-project.ts` with `defineProjectContent()`.

Each locale document must provide `metaTitle`, `metaDescription`, `hero`, `metadata`, and `details`. The shared `sections` array defines presentation with discriminated blocks:

```ts
import { defineProjectContent } from '../contentSchema';

const en = {
  metaTitle: 'Example Project — Song Zidong',
  metaDescription: 'Search description.',
  hero: {
    eyebrow: 'Research Project / 3D Vision',
    title: 'Example Project',
    subtitle: 'One-sentence project statement.',
    affiliation: 'Research context · 2026',
  },
  metadata: ['3D Vision', 'Method'],
  details: [
    { label: 'Type', value: 'Research Project' },
    { label: 'Year', value: '2026' },
  ],
  labels: { summary: 'Summary', method: 'Method' },
  sections: { overview: 'Overview', method: 'Method', gallery: 'Visuals' },
  overview: 'Overview paragraph.',
  overviewBullets: ['First contribution.', 'Second contribution.'],
  methodCards: [{ title: 'Stage one', items: ['Step A', 'Step B'] }],
  gallery: [{ src: '/projects/example-project/result.png', alt: 'Result description.', caption: 'Result caption.' }],
} as const;

const zh = {
  ...en,
  metaTitle: '示例项目 — 宋梓冬',
  metaDescription: '中文搜索描述。',
  hero: { eyebrow: '研究项目 / 三维视觉', title: '示例项目', subtitle: '一句话项目说明。', affiliation: '项目背景 · 2026' },
  metadata: ['三维视觉', '方法'],
  details: [{ label: '类型', value: '研究项目' }, { label: '年份', value: '2026' }],
  labels: { summary: '摘要', method: '方法' },
  sections: { overview: '概览', method: '方法', gallery: '图像' },
  overview: '中文概览。',
  overviewBullets: ['贡献一。', '贡献二。'],
  methodCards: [{ title: '阶段一', items: ['步骤 A', '步骤 B'] }],
  gallery: [{ src: '/projects/example-project/result.png', alt: '结果描述。', caption: '结果图。' }],
} as const;

export default defineProjectContent({
  id: 'example-project',
  heroActions: [{ type: 'project-link', link: 'report', label: 'report', optional: true }],
  documents: { en, zh },
  sections: [
    {
      eyebrow: 'EXAMPLE',
      title: 'sections.overview',
      intro: 'overview',
      blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }],
    },
    {
      title: 'sections.method',
      blocks: [{ type: 'card-grid', items: 'methodCards', label: 'labels.method' }],
    },
    {
      title: 'sections.gallery',
      blocks: [{ type: 'gallery', items: 'gallery' }],
    },
  ],
});
```

Available block types are defined in `src/data/projects/contentSchema.ts`. Prefer existing block types and CSS classes; extend the schema only when a genuinely new semantic presentation cannot be represented.

## 4. Add assets

Put web-facing images, PDFs, slides, and videos under:

```text
public/projects/example-project/
```

Put editable reports, TeX, source snapshots, raw data, and course material under:

```text
.local-archive/reference/source-materials/projects/example-project/
```

Never link the website directly to `.local-archive/`. The directory is intentionally ignored and does not exist in CI or on GitHub Pages. The build rejects missing local figure paths referenced from content documents.

## 5. Optional publication record

For a real course report, add a `technicalReports` entry in `src/data/publications.ts` using the project ID. The publication item resolves project facts and links from the project registry.

## 6. Verify

```bash
npm run check
npm run build
git diff --check
```

Check both locale URLs, language switching, canonical and hreflang metadata, cover alt text, category filtering, downloads, and the Projects active navigation state. Confirm the page remains readable without JavaScript and WebGL.
