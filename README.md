# Song Zidong Academic Portfolio

Static bilingual academic portfolio for Song Zidong. The site is built with Astro and published to GitHub Pages at <https://szddddddd.github.io>.

## Local development

```bash
npm install
npm run dev
```

Astro prints the local development URL, usually `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. The GitHub Pages workflow runs `npm ci` followed by `npm run build` on Node 22. This is a user-site repository, so Astro intentionally has no `base` configuration.

## Repository layout

```text
src/
  components/
    layout/        Shared page composition
    navigation/    Header and language navigation
    projects/      Project index, project cards, and project detail views
    publications/  Publication presentation
    ui/            Reusable controls and content primitives
    visual/        Home and background visual components
  data/            Profile, project registry, and Shadertoy data
  i18n/            English and Chinese copy plus route mapping
  pages/           Thin English and /zh/ route entry points
  scripts/visual/  WebGL visual field scripts
  styles/          Global styles, tokens, and visual-specific styles
public/projects/   Files available at stable public website URLs
source-materials/  Original course materials, excluded from site builds
docs/              Architecture and maintenance guides
```

Generated directories such as `node_modules/`, `.astro/`, and `dist/` are ignored. Original course reports, TeX sources, slides, and documents are intentionally retained under `source-materials/`; they are not web build inputs. Publicly downloadable reports and images must remain in `public/projects/` so their existing URLs stay valid.

## Localization and routes

English routes live at `/`; Chinese routes live under `/zh/`. Route entry files only select a locale and render shared components. `src/i18n/index.ts` is the authoritative mapping for localized paths, canonical links, alternates, and language switching.

## Content ownership

- Personal profile and contact information: `src/data/profile.ts`
- Project metadata, stable slugs, ordering, and public links: `src/data/projects.ts`
- English and Chinese UI text and long project copy: `src/i18n/en.ts` and `src/i18n/zh.ts`
- Public images, PDFs, and slides: `public/projects/<slug>/`
- Original project materials: `source-materials/projects/<slug>/`

See [docs/adding-a-project.md](docs/adding-a-project.md) for the complete new-project workflow and [docs/architecture.md](docs/architecture.md) for dependency boundaries.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. Configure GitHub Pages to use GitHub Actions as its deployment source.
