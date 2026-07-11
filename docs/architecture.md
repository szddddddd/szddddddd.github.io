# Architecture Guide

## Entry Points

`src/pages/` and `src/pages/zh/` are thin locale wrappers. Standard routes render `components/layout/LocalizedPage.astro`; project detail wrappers render their existing dedicated components with a locale prop.

`layouts/BaseLayout.astro` owns metadata, `ClientRouter`, theme/motion initialization, skip navigation, and `AppShell`. `AppShell` renders the shared Spatial Ribbon, persisted `SpatialUIRoot`, main landmark, and footer.

## Routing and Localization

Use `src/config/routes.ts` for all route questions:

- `routes` defines the five primary sections.
- `pagePaths` defines primary, detail, and legacy compatibility paths.
- `getRouteForPath()` resolves active navigation and spatial preset ownership.
- `getPath()` resolves localized links.

Do not create another navigation array or duplicate path strings in a component. `/coursework/` and `/zh/coursework/` are retained compatibility pages with Projects canonical metadata; they are not navigation items.

## Spatial Lifecycle

`SpatialUIRoot` persists through Astro transitions. `bootSpatialUI()` creates the singleton only when a spatial host exists. The engine starts once and is not recreated after route swaps.

`SpatialRouteController` observes `astro:before-preparation`, `astro:after-swap`, and `astro:page-load`, then maps the current URL to `routeStates`. Astro retains ownership of history and page DOM. `RouteTransition` owns only camera/uniform tweening.

For a new primary route, add a route config entry and matching `routeStates` entry, then create the page wrapper/component. Do not add a second renderer, RAF loop, router, or global event bus.

## Performance Rules

- Keep one `WebGLRenderer`, one canvas, and one `AnimationLoop`.
- Reuse materials through `ShaderRegistry` and release acquired resources through `ResourceManager`.
- Do not construct vectors, colors, shader strings, textures, or materials every frame.
- Keep mobile/reduced quality at DPR `1`; full quality is capped at `1.5`.
- Do not add full-screen post-process stacks without profiling.
- Canvas failure must leave the CSS fallback and semantic DOM fully usable.

## Content Boundaries

`public/projects/` is the only source for browser-facing images, PDFs, PPTX files, and downloadable assets. `source-materials/` preserves original reports, TeX, slides, and documents but is never a web asset source.

`data/projects.ts` is the fact source for project listings and links. `data/publications.ts` uses project IDs for course technical reports. Long project prose stays in the matching locale data module.
