# Song Zidong Spatial Research Atlas

Static bilingual academic portfolio for Song Zidong, built with Astro, Three.js, and a progressive spatial UI engine. It is published at <https://szddddddd.github.io>.

## Development

```bash
npm install
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321`.

## Verification and Build

```bash
npm run check
npm run build
npm run preview
```

`npm run build` writes static output to `dist/`. The GitHub Pages workflow runs `npm ci` and `npm run build` on Node 22. `dist/`, `node_modules/`, and `.astro/` are generated and ignored.

## Structure

```text
src/
  components/
    layout/        App shell and locale dispatcher
    navigation/    Spatial Ribbon, index dialog, mobile dock, language control
    pages/         Shared bilingual Home/About/Projects/Publications/Notes structures
    projects/      Project index and dedicated detail views
    publications/  Technical report presentation
    spatial/       Persisted canvas root
    ui/            Reusable semantic primitives and controls
  config/          Site and authoritative route configuration
  data/            Profile, project, publication, and Shadertoy facts
  i18n/            English/Chinese UI and project-detail prose
  layouts/         Metadata, ClientRouter, and page shell
  pages/           Thin English and Chinese public entry points
  spatial/         Engine, routing, scene, shader, resource, and rendering code
  styles/          Tokens, navigation, page, and spatial fallback styles
public/projects/   Stable public assets and reports
source-materials/  Preserved originals, excluded from the website build
docs/              Architecture, refactor audit, and maintenance guides
```

## Content Ownership

- Profile and contact facts: `src/data/profile.ts`
- Project registry, public links, covers, filters, and display tags: `src/data/projects.ts`
- Peer-reviewed and technical-report grouping: `src/data/publications.ts`
- Localized interface and long project copy: `src/i18n/en.ts`, `src/i18n/zh.ts`
- Public downloads: `public/projects/<slug>/`
- Source archive: `source-materials/projects/<slug>/`

`src/config/routes.ts` is the sole source for primary navigation and bilingual route mapping. Project details map to the Projects spatial preset. Legacy `/coursework/` routes remain compatible but do not duplicate the project index.

See [docs/architecture.md](docs/architecture.md), [docs/refactor-audit.md](docs/refactor-audit.md), and [docs/adding-a-project.md](docs/adding-a-project.md).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. Configure GitHub Pages to use GitHub Actions as the deployment source.
