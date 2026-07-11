# Spatial Research Atlas Architecture

This portfolio is a static Astro site with a progressive spatial rendering layer. Research content is always semantic HTML; WebGL enriches the document but never owns navigation, content, or accessibility.

## Runtime

```text
Astro route wrapper
  -> LocalizedPage / project detail component
  -> BaseLayout + ClientRouter
     -> AppShell
        -> SpatialRibbon + semantic main content
        -> persisted SpatialUIRoot
           -> one SpatialEngine
              -> one WebGLRenderer and canvas
              -> one AnimationLoop
              -> one SpatialScene and CameraRig
              -> ResourceManager + ShaderRegistry
```

`SpatialUIRoot` uses Astro `transition:persist`, so the renderer remains mounted across all Astro client-route transitions, including project detail pages. A normal multi-page navigation still works when JavaScript or View Transitions are unavailable.

## Route Ownership

`src/config/routes.ts` is the only route configuration for primary navigation, bilingual paths, indexes, labels, descriptions, accents, and active-route resolution. Project details and legacy Coursework paths resolve to the Projects spatial preset.

Astro `ClientRouter` owns URL changes, browser history, fetches, DOM swaps, scroll behavior, and ordinary fallback navigation. `SpatialRouteController` only observes Astro lifecycle events and asks the engine to apply a route preset. It never calls `fetch`, `DOMParser`, or the History API.

## Spatial Engine

`SpatialEngine` is the session singleton. It owns the renderer, camera, scene, resource manager, input boundary, and `AnimationLoop`.

- `AnimationLoop` is the only RAF owner. It pauses while the document is hidden.
- Motion Off stops continuous animation and renders only after state changes.
- `SpatialRenderer` caps DPR at `1.5` for full quality and `1` for reduced/mobile quality; `SpatialScene` also scales field density and glow down in reduced quality.
- `ViewportInput` owns the one resize, scroll, and pointer input boundary.
- Context loss changes the root to the CSS spatial fallback while DOM content remains usable.
- `ResourceManager` reference-counts geometry and material ownership. `ShaderRegistry` caches program materials by key.

Typed events are `ROUTE_PREPARE`, `ROUTE_ENTER`, `ROUTE_LEAVE`, `NAV_PREVIEW`, `NAV_PREVIEW_END`, `THEME_CHANGE`, `MOTION_CHANGE`, `QUALITY_CHANGE`, `VIEWPORT_RESIZE`, and `DOCUMENT_VISIBILITY_CHANGE`.

## Scene and Shaders

`src/spatial/config/routeStates.ts` defines each route's camera, field density, flow, noise scale, colors, bloom/vignette response, scene preset, and tween duration. The precompiled neural field derives its identity trajectory, scan bands, archive grid, and knowledge-network motif from the already-tweened camera/palette state; route changes and previews never compile or replace a shader.

Projects also has factual category scene overrides for `all`, `3d-vision`, `medical-imaging`, `creative-coding`, and `coursework`. `spatial:project-filter` only adjusts the same persistent scene's palette values, then clears when Astro swaps away from the project index.

The active neural-field program is organized under `src/spatial/shaders/programs/neural-field/` with separate vertex, fragment, uniforms, material factory, shared chunks, and `ShaderRegistry`. The field consolidates low-cost particle and flow behavior into one cached program. It uses shader-level glow/grain rather than a stack of expensive full-screen post-process passes.

## Content and UI

- `components/pages/` contains shared English/Chinese page structures.
- `components/navigation/` owns DOM navigation: the Spatial Ribbon, responsive dock, and accessible index dialog.
- `components/projects/` owns detail presentations and the project index row; `ProjectsPage` owns the 4/12 sticky Research Index Rail and progressive filter enhancement.
- `data/projects.ts` is the project fact source; `data/publications.ts` references projects for reports instead of duplicating URLs.
- `i18n/en.ts` and `i18n/zh.ts` own localized UI and project-detail prose.

Canvas is decorative and `aria-hidden`; headings, descriptions, links, filters, toggles, and dialog controls stay in the DOM.

## Navigation and Reading Offset

`SpatialRibbon` is a direct `body` child with no transformed, filtered, or contained ancestor. Its fixed position must not be overridden by global body-child rules. `html` and `#main-content` reserve the ribbon height for anchor targets, while the page shell retains the maximum reading clearance during the 64px-to-52px visual compression. The compact ribbon gets the same global progress value, and the mobile dock adds safe-area bottom clearance.
