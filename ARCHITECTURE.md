# Spatial Research Atlas Architecture

This repository is a static bilingual Astro site with a progressively enhanced Three.js spatial layer. Semantic HTML owns content, navigation, and accessibility; WebGL remains decorative.

## Runtime

```text
Astro route
  -> LocalizedPage or dynamic ProjectDetail
  -> BaseLayout + ClientRouter
     -> AppShell
        -> SpatialRibbon + semantic main content
        -> persisted SpatialUIRoot
           -> one SpatialEngine
              -> one WebGLRenderer and canvas
              -> one AnimationLoop
              -> SpatialScene + CameraRig
              -> ResourceManager + ShaderRegistry
```

`SpatialUIRoot` uses `transition:persist`, so the engine remains mounted across Astro client transitions. Normal multi-page navigation remains available without JavaScript, View Transitions, or WebGL.

## Ownership Boundaries

- `src/config/routes.ts` owns primary routes, localized paths, labels, active-route resolution, accents, and spatial presets.
- Astro `ClientRouter` owns URL changes, history, document fetching, DOM swaps, and fallback navigation.
- `src/spatial/` owns the persistent visual engine. It never replaces page DOM or mutates browser history.
- `src/i18n/en.ts` and `src/i18n/zh.ts` contain shared interface copy only.
- `src/data/projects/facts/` contains one factual project manifest per project.
- `src/data/projects/content/` contains one bilingual long-form project document and layout manifest per project.
- `src/data/notes/` contains one note manifest per note.
- `public/` contains browser-facing assets.
- `.local-archive/` preserves editable originals, raw paper workspaces, dependencies, and generated builds locally; Git ignores the entire directory.

## Project Content Pipeline

Project detail pages use the same pattern as Notes:

```text
facts/<slug>.ts --------------------┐
                                   ├─> dynamic /projects/[slug] routes
content/<slug>.ts ------------------┘      -> ProjectDetail.astro
                                             -> ProjectContentBlock.astro
```

`src/data/projects.ts` discovers fact modules with `import.meta.glob`, validates IDs and numbers, sorts them, and derives `projectsBySlug`. `src/data/projects/contentRegistry.ts` discovers content modules, validates bilingual metadata, rejects duplicate IDs, and verifies local `/projects/` figure paths during the Astro build.

`contentSchema.ts` defines discriminated section blocks including groups, bullet panels, narratives, figures, card grids, metric cards, metric tables, galleries, highlights, math panels, links, and Shadertoy galleries. `ProjectDetail.astro` is the only project detail page renderer; adding a project does not require a new Astro component or route wrapper.

Dynamic English and Chinese routes pass explicit localized paths into `BaseLayout`. This keeps canonical URLs, hreflang metadata, and the language toggle aligned while both locales share the Projects spatial preset.

## Spatial Engine

- `SpatialEngine` owns one renderer, canvas, scene, resource manager, input boundary, and animation loop per browser session.
- `AnimationLoop` is the only RAF owner and pauses while the document is hidden.
- Motion Off disables continuous rendering and redraws only on invalidation.
- `SpatialRenderer` caps DPR at `1.5` for full quality and `1` for reduced/mobile quality.
- `ViewportInput` owns resize, scroll, and pointer input.
- Context loss falls back to CSS while semantic content remains usable.
- `routeStates.ts` owns camera, palette, density, flow, noise, bloom, vignette, scene preset, and transition duration.
- `SpatialRouteController` observes Astro lifecycle events and maps the current path to a route preset; it does not fetch pages or mutate history.

## Interaction Rules

- Keep one `WebGLRenderer`, one canvas, and one animation loop.
- Do not construct vectors, colors, shader strings, textures, or materials every frame.
- Reuse programs through `ShaderRegistry` and release resources through `ResourceManager`.
- Keep all navigation as real anchors and all filters as progressive enhancement.
- Keep the fixed Spatial Ribbon as a direct body child and preserve top/bottom safe areas.
- Keep reading content on local translucent surfaces rather than covering the decorative spatial field with an opaque page background.

## Verification

```bash
npm run check
npm run build
git diff --check
```

The build is also the content-integrity check: it discovers every project and note manifest, validates unique identifiers, and verifies required local article and figure assets.
