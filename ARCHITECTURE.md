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
- `SpatialRenderer` caps DPR at `1.5` for full quality and `1` for reduced/mobile quality.
- `ViewportInput` owns the one resize, scroll, and pointer input boundary.
- Context loss changes the root to the CSS spatial fallback while DOM content remains usable.
- `ResourceManager` reference-counts geometry and material ownership. `ShaderRegistry` caches program materials by key.

Typed events are `ROUTE_PREPARE`, `ROUTE_ENTER`, `ROUTE_LEAVE`, `NAV_PREVIEW`, `NAV_PREVIEW_END`, `THEME_CHANGE`, `MOTION_CHANGE`, `QUALITY_CHANGE`, `VIEWPORT_RESIZE`, and `DOCUMENT_VISIBILITY_CHANGE`.

## Scene and Shaders

`src/spatial/config/routeStates.ts` defines each route's camera, field density, flow, noise scale, colors, bloom/vignette response, scene preset, and tween duration. `RouteTransition` uses `@tweenjs/tween.js` to interpolate these values without recompiling shaders.

The active neural-field program is organized under `src/spatial/shaders/programs/neural-field/` with separate vertex, fragment, uniforms, material factory, shared chunks, and `ShaderRegistry`. The field consolidates low-cost particle and flow behavior into one cached program. It uses shader-level glow/grain rather than a stack of expensive full-screen post-process passes.

## Content and UI

- `components/pages/` contains shared English/Chinese page structures.
- `components/navigation/` owns DOM navigation: the Spatial Ribbon, responsive dock, and accessible index dialog.
- `components/projects/` owns detail presentations and the project index row.
- `data/projects.ts` is the project fact source; `data/publications.ts` references projects for reports instead of duplicating URLs.
- `i18n/en.ts` and `i18n/zh.ts` own localized UI and project-detail prose.

Canvas is decorative and `aria-hidden`; headings, descriptions, links, filters, toggles, and dialog controls stay in the DOM.
