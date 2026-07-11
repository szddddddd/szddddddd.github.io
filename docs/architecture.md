# Architecture

## Rendering layers

`src/pages/` is the route entry layer. English pages keep their established paths and Chinese pages keep their `/zh/` paths. Most standard pages render `components/layout/LocalizedPage.astro`; project detail routes render their dedicated component in `components/projects/` because their research content and visual structure differ.

`layouts/BaseLayout.astro` owns document metadata, theme initialization, skip navigation, the shared header, background decoration, and the page footer. It receives locale and page keys from page-level components.

## Data and localization

`src/data/profile.ts` contains personal information and publication records. `src/data/projects.ts` is the single project registry and owns stable slugs, ordering, list metadata, covers, and public links. Long-form English and Chinese project copy remains in `src/i18n/en.ts` and `src/i18n/zh.ts`.

`src/i18n/index.ts` owns locale types, route mapping, localized path generation, and language detection. Do not duplicate public route strings in components.

## Components and styles

- `components/navigation/` owns navigation controls.
- `components/ui/` contains reusable UI primitives without page-specific content.
- `components/projects/` contains project list and detail presentation.
- `components/visual/` owns background and homepage visual components.
- `styles/tokens.css` defines global design tokens and theme values.
- `styles/global.css` contains global layout and shared component styles.
- `styles/visual/` contains visual-effect-specific CSS.
- `scripts/visual/` contains the WebGL field implementations.

This separation is organizational only: visual rules and scripts keep their existing behavior and are imported by the same visual components.

## Asset boundary

Only `public/` is copied to stable public URLs. Original course assets live under `source-materials/` and are not site build inputs. When a report should be public, place the intended public copy under `public/projects/<slug>/` and reference it with its root-relative URL.
