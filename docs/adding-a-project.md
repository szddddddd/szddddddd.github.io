# Adding a Project

This site keeps project list metadata, long-form content, public assets, and
original course materials in separate places. Follow the steps below so the
English and Chinese pages stay aligned and existing public URLs remain stable.

## 1. Choose a stable slug

Use a lowercase, URL-safe slug such as `example-project`. A published slug is
part of the public URL, so do not rename it after release. Add the slug to the
`ProjectSlug` union in `src/data/projects.ts`.

## 2. Register list metadata

Add one `Project` record in `src/data/projects.ts`. Include both language
variants for `title`, `description`, and any localized `type` or `role`, along
with its `sortOrder`, `featured`, `isPublic`, tags, cover image, and links.
Then add the record to both `projects` and `projectsBySlug`.

Use root-relative paths for public files, for example:

```ts
image: '/projects/example-project/cover.png',
links: {
  details: {
    en: '/projects/example-project',
    zh: '/zh/projects/example-project',
  },
  report: '/projects/example-project/report.pdf',
  code: 'https://github.com/owner/repository',
}
```

`report`, `slides`, `paper`, `code`, `demo`, and `readme` are optional. Omit a
link that is not public rather than pointing it at source material.

## 3. Add bilingual project content

Add the English long-form copy in `src/i18n/en.ts` and the matching Chinese
copy in `src/i18n/zh.ts`. Keep the same content shape in both files so the
shared project component can render either locale. List metadata belongs in
the registry; project-specific narrative, tables, formulae, and galleries stay
in the locale files and project presentation component.

## 4. Add the project presentation and routes

Create a project component under `src/components/projects/` when the project
needs a dedicated detail layout. Reuse `BaseLayout`, `Section`, `MathBlock`,
and existing project components where their structure fits; preserve any
project-specific experimental content rather than forcing it into a generic
template.

Add thin route entries for both public URLs:

```text
src/pages/projects/example-project.astro
src/pages/zh/projects/example-project.astro
```

The English entry passes `lang="en"`; the Chinese entry passes `lang="zh"` to
the same project component. Keep the `details` links in the registry aligned
with those two routes. Do not remove an old public route without an explicit
compatibility plan.

## 5. Place assets in the correct boundary

Put every image, PDF, slide deck, or other downloadable file intended for the
website in `public/projects/example-project/`. Reference those files using
`/projects/example-project/...` paths.

Put editable reports, source code snapshots, raw data, and course handouts in
`source-materials/projects/example-project/`. This directory is retained in
the repository but is not copied into the static site and must not be used as a
website asset source.

## 6. Verify both locales

Run the supported build command:

```bash
npm run build
npm run preview
```

Check the following paths in the preview server:

```text
/projects/
/zh/projects/
/projects/example-project/
/zh/projects/example-project/
```

Confirm the project appears once in each index, the cover and optional public
links load, the language switcher reaches the equivalent route, and no page
references files outside `public/`. Finish with `git diff --check` before
requesting review.
