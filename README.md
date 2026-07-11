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

`package.json` deliberately exposes `check`, `dev`, `build`, and `preview`. It does not currently define separate `lint` or `test` scripts.

## Atlas Interaction

- The fixed Spatial Ribbon reserves a 64px reading offset and compresses visually to 52px after scrolling. Its global progress line remains visible in desktop and compact navigation; Mobile Dock adds safe-area-aware bottom navigation below 700px.
- Home exposes four semantic links with route-specific DOM objects: identity coordinates, real project-cover slices, archive documents, and a knowledge network. Hover and keyboard focus send a 160ms spatial preview; click locks the selected entry before Astro's shared transition.
- Projects is a server-rendered research index. Without JavaScript all six projects remain visible and navigable. With JavaScript, the sticky Research Index Rail updates the selected category, result count, accessible live status, cover preview, short layout animation, and the persistent engine's category palette.
- WebGL is decorative. Context loss, unavailable WebGL, reduced motion, and JavaScript-free navigation retain readable DOM content and the CSS spatial fallback.

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

The four route visuals are configuration-driven: About uses a teal identity field, Projects a violet scan/media flow, Publications a low-density gold archive grid, and Notes a rose-violet network. They share one precompiled material and one engine session.

See [docs/architecture.md](docs/architecture.md), [docs/refactor-audit.md](docs/refactor-audit.md), and [docs/adding-a-project.md](docs/adding-a-project.md).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. Configure GitHub Pages to use GitHub Actions as the deployment source.
