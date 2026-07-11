# Adding a Project

Project facts, long-form copy, public assets, and original source materials have separate owners. Follow this workflow to preserve the bilingual index, report aggregation, spatial route behavior, and existing public URLs.

## 1. Choose a stable slug

Use a lowercase URL-safe slug such as `example-project`. A published slug is part of the public API. Add it to the `ProjectSlug` union in `src/data/projects.ts`; do not rename an existing slug.

## 2. Register the project fact record

Add one record to `src/data/projects.ts` and include:

```ts
{
  id: 'example-project',
  number: '07',
  slug: 'example-project',
  sortOrder: 70,
  featured: false,
  isPublic: true,
  title: { en: 'English title', zh: '中文标题' },
  summary: { en: 'Short summary.', zh: '简短摘要。' },
  description: { en: 'Short summary.', zh: '简短摘要。' },
  year: '2026',
  categories: ['3d-vision', 'coursework'],
  displayTags: [
    { en: '3D Vision', zh: '三维视觉' },
    { en: 'Method', zh: '方法' },
    { en: 'Coursework', zh: '课程项目' },
  ],
  allTags: ['3D Vision', 'Method', 'Coursework'],
  tags: ['3D Vision', 'Method', 'Coursework'],
  image: '/projects/example-project/cover.png',
  cover: {
    src: '/projects/example-project/cover.png',
    alt: { en: 'Describe the actual cover image.', zh: '描述真实封面内容。' },
  },
  spatialAccent: '#8b7cff',
  links: {
    details: { en: '/projects/example-project/', zh: '/zh/projects/example-project/' },
    report: '/projects/example-project/report.pdf',
  },
}
```

Use only factual categories: `3d-vision`, `medical-imaging`, `creative-coding`, and/or `coursework`. Limit `displayTags` to three. `allTags` can retain the complete factual list. Omit a link when it is not public; never use an empty string. Add `previewVideo` only when there is a real public video and poster.

Add the record to both `projects` and `projectsBySlug`. Keep public paths root-relative and preserve trailing slash conventions for HTML routes.

## 3. Add the cover and downloads

Put web-facing images, PDFs, PPTX files, and videos under:

```text
public/projects/example-project/
```

Use descriptive alt text and preserve the native image ratio. Put editable reports, TeX, source code snapshots, raw data, and course handouts under:

```text
source-materials/projects/example-project/
```

Do not link the website directly to `source-materials/`.

If fixing a publicly visible filename such as `comparsion.png`, retain the legacy file or URL in addition to a corrected internal name.

## 4. Add bilingual detail content and wrappers

Add English and Chinese project prose with the same shape in `src/i18n/en.ts` and `src/i18n/zh.ts`. Preserve real metrics, figures, contributions, and report context; do not infer authors, venues, awards, or results.

Add thin public entry points:

```text
src/pages/projects/example-project.astro
src/pages/zh/projects/example-project.astro
```

Both wrappers render the same project component with `lang="en"` or `lang="zh"`. Detail pages automatically inherit the Projects spatial preset through `routes.ts`; do not add a new primary navigation entry or spatial engine.

Use `data-astro-reload` for PDF, PPTX, and external links so Astro client transitions are not used for downloads or off-site navigation.

## 5. Add a technical report only when real

For a course report, add a `technicalReports` record in `src/data/publications.ts` with `projectId`. The item resolves title, course, year, PDF, code, and project URL from the project registry. Add `authors` only when they are known. Do not put coursework in `peerReviewed`.

## 6. Verify

```bash
npm run check
npm run build
npm run preview
git diff --check
```

Check both locale index and detail paths, the language toggle, cover alt text, filter membership, every public download, and the route's active Projects navigation state. Confirm that the project is visible with JavaScript disabled and that no asset path points outside `public/`.
