# Spatial Refactor Audit

Date: 2026-07-11

## Baseline

- Repository branch: `main`, three commits ahead of `origin/main`.
- Pre-existing worktree change: untracked `tree.md`; it was not read, changed, or removed.
- Runtime versions: Astro `6.4.8`, Three.js `0.185.1`, TypeScript `6.0.3`. `@tweenjs/tween.js` was initially only an indirect dependency of `@types/three`; it is now a direct runtime dependency at `23.1.3`.
- `npm run build` completed before the refactor, generating 24 static routes. Vite emitted a chunk-size advisory only.
- `npm run check` completed before the refactor with zero diagnostics.
- `package.json` has no `lint` or `test` scripts. The supported verification commands are `check`, `build`, `dev`, and `preview`.
- `.gitignore` ignores `node_modules/`, `dist/`, `.astro/`, environment files, logs, editor files, and system temporary files. None of `node_modules/`, `dist/`, or `.astro/` is tracked by Git.

The requested baseline routes were captured at `1440x900` and `390x844` from a detached `HEAD` export under `/tmp/szd-refactor-baseline/screenshots/`:

```text
/
/about/
/projects/
/publications/
/notes/
/zh/
/zh/about/
/zh/projects/
/zh/publications/
/zh/notes/
/projects/cs182/
/projects/bme1312/
/projects/bme1312-proj2/
/projects/si140a/
/projects/si100b/
/projects/arts1308/
```

The live-route audit returned `200` for the listed English and Chinese pages and project details. All local public images, PDFs, and PPTX assets referenced by project data existed. The Shadertoy URLs returned `403` to a command-line client, consistent with anti-bot protection; they were retained rather than treated as broken. The baseline browser pass found no application exception. A temporary baseline server using a symlinked `node_modules` emitted Vite filesystem warnings for KaTeX font paths; that was an isolated test-fixture condition and not a production-build warning.

## Previous Runtime

```text
Astro route wrapper
  -> LocalizedPage / project detail component
  -> BaseLayout
     -> Navbar + RSUIRoot + VisualBackground
     -> bootRSUI()
        -> RSUIEngine
           -> Renderer + SceneGraph + Camera + PostProcess
           -> AnimationLoop
           -> custom SpatialRouter
```

Static inspection found one `WebGLRenderer` constructor and one RAF owner in the old implementation. `VisualBackground`, `SpatialHero`, and `NeuralIonHero` were CSS/DOM-only and did not create canvases. The custom router intercepted primary links, fetched HTML, replaced `header/main/footer`, called `history.pushState`, and dispatched a synthetic `astro:page-load`. That duplicated Astro's client-router responsibility and only kept the renderer alive for a subset of routes.

## Findings

- Route facts were duplicated in `i18n/index.ts`, `navigation/PageState.ts`, `core/EngineState.ts`, and `navigation/SpatialRouter.ts`.
- The old `PageState`, uppercase engine states, and page lifecycle classes duplicated route ownership. Most page lifecycle classes were empty.
- Both Engine hover binding and the Projects lifecycle class bound project hover listeners.
- The previous post-process chain created five full-screen passes on desktop.
- `TextureCache`, `GeometryCache`, and `ShaderCache` existed but were not connected to scene ownership.
- The old router/history layer conflicted with Astro navigation; it had to be removed rather than run in parallel with `ClientRouter`.
- Confirmed unused components were the old `Navbar`, `Hero`, `VisualBackground`, `SpatialHero`, `NeuralIonHero`, `ProjectCard`, and the empty page/script directories.
- Confirmed unused shader/material candidates included the old particle/wave variants, SDF/lighting chunks, and `GradientMaterial`. The new neural field consolidates the active particle/flow response in one cached program instead of retaining unused programs.

## Migration Record

| Previous area | Final ownership |
| --- | --- |
| `src/core`, `src/three`, `src/interaction` | `src/spatial/core`, `src/spatial/rendering`, `src/spatial/interaction` |
| `src/resources`, `src/materials` | `src/spatial/resources`, `src/spatial/materials` |
| `src/navigation` | `src/spatial/routing` |
| `src/shaders` | `src/spatial/shaders` |
| `src/rsui/pages` | removed; route presets and `SpatialScene` own visual state |
| `components/rsui/RSUIRoot` | `components/spatial/SpatialUIRoot` |
| `styles/rsui/engine.css` | `styles/spatial/engine.css` |
| i18n route table | `src/config/routes.ts` |

The retained facts are `src/data/profile.ts`, `src/data/projects.ts`, bilingual long-form project copy, all project route wrappers, all public project assets, and `source-materials/`.

## Final Boundaries

- Astro `ClientRouter` owns document swapping, browser history, and fallback behavior.
- `src/config/routes.ts` owns primary navigation, localized paths, active-route resolution, route indexes, labels, accents, and spatial preset selection.
- `SpatialRouteController` observes Astro lifecycle events and maps a path to a spatial preset. It never fetches HTML, mutates history, or swaps DOM.
- `SpatialEngine` owns exactly one renderer, canvas, scene, camera, resource manager, and animation loop for the browser session.
- `RouteTransition` only tweens camera and shader uniforms through `@tweenjs/tween.js`.
- Semantic DOM navigation remains real links and works when JavaScript or WebGL is unavailable.

## Cleanup Decision

The legacy runtime directories, empty scaffold directories, unused visual components, old navbar, unused project card, and old RSUI style tree were removed after import verification. No files under `public/projects/` or `source-materials/` were removed. The legacy public filename `/projects/cs182/comparsion.png` remains untouched for URL compatibility.

## Post-refactor Validation

- `npm run check`: zero errors, warnings, and hints.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run build`: generated all 24 static routes. The only output warning is Vite's advisory for the dynamically loaded Three.js engine chunk exceeding 500 kB.
- Production preview returned `200` for all English and Chinese primary, compatibility, and project-detail routes.
- Browser tests confirmed one canvas, one persistent engine across Home-to-About and Projects-to-detail transitions, correct Projects ownership for details, active navigation, and localized detail language switching.
- Theme and Motion preferences persisted through client navigation. Medical Imaging filtering left two rows visible and four hidden; without JavaScript all six project detail anchors remained functional.
- The native index dialog opened, closed via Escape, and restored focus to its trigger.
- No horizontal overflow was found at `1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`, or `360x800`.
- Reduced Motion produced `data-motion="reduced"`. Chromium with WebGL disabled produced the CSS fallback with a complete main landmark and no canvas.
- All 40 files in `public/projects/` returned `200` from production preview. GitHub profile and project links returned `200`; Shadertoy returned `403` to automated clients and remains retained as an external anti-bot limitation.
