# Changelog

## Unreleased

### Spatial Research Atlas refactor

- Replaced the old pill navigation and custom router with the responsive Spatial Ribbon, native index dialog, Mobile Dock, and Astro `ClientRouter`.
- Added one persisted `SpatialEngine` under `src/spatial/` with one renderer, canvas, RAF loop, typed events, route-state presets, tween.js route transitions, resource ownership, adaptive DPR, motion-off rendering, and CSS/WebGL context-loss fallback.
- Consolidated route metadata in `src/config/routes.ts`; project details and legacy Coursework routes now resolve to Projects without duplicating content.
- Rebuilt Home, About, Projects, Publications, and Notes as shared bilingual page components.
- Converted Projects to indexed alternating rows with filters, meaningful cover alt text, and preserved public report/code/slides/Shadertoy links.
- Added factual Technical Reports while keeping peer-reviewed publications empty and Research Notebook entries at zero.
- Removed obsolete RSUI, custom history/router, old renderer/shader trees, unused visual components, old Navbar, unused project card, and empty scaffold directories.
- Updated architecture, maintenance, audit, build, and deployment documentation.
