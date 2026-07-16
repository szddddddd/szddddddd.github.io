# Changelog

## Unreleased

### Manifest-driven project content

- Split project facts and bilingual long-form content into one auto-discovered module per project.
- Added build-time validation for duplicate project IDs/numbers, bilingual content metadata, and local project figure paths.
- Replaced seven bespoke detail components and fourteen locale wrappers with one data-driven renderer and two dynamic locale routes.
- Reduced the shared i18n modules to interface copy and removed project-specific metadata/page exceptions.
- Removed legacy RSUI style remnants and consolidated architecture and project-authoring documentation.

### Repository cleanup

- Moved non-public editable sources and raw paper workspaces into the ignored local `.local-archive/` directory without deleting local data.
- Kept only build sources, maintenance documentation, and browser-facing `public/` assets in version control.

### Spatial Research Atlas visual upgrade

- Fixed the Spatial Ribbon's fixed positioning, added a global reading-progress line, compact progress, desktop 64px-to-52px compression, anchor clearance, and mobile safe-area handling.
- Exposed the existing single spatial field behind subpages and added route-specific identity, scan/media, archive, and knowledge-network motifs without runtime shader recompilation.
- Rebuilt Home as four distinct semantic research-entry links with shared-transition names and spatial hover/focus/click previews.
- Reworked Projects into a 4/12 sticky Research Index Rail plus 8/12 alternating media index; factual category counts, live status, category descriptions, cover previews, short filter motion, and spatial category previews now update together.
- Reframed About as a coordinate/relationship atlas, Publications as a gold archive that preserves the real peer-reviewed `00` state, and Notes as a rose knowledge network that preserves its real `0 entries` state.
- Added mobile field-density/glow scaling, manual Motion Off transition reduction, light-theme accent contrast, and mobile horizontal-overflow protection.

### Spatial Research Atlas refactor

- Replaced the old pill navigation and custom router with the responsive Spatial Ribbon, native index dialog, Mobile Dock, and Astro `ClientRouter`.
- Added one persisted `SpatialEngine` under `src/spatial/` with one renderer, canvas, RAF loop, typed events, route-state presets, tween.js route transitions, resource ownership, adaptive DPR, motion-off rendering, and CSS/WebGL context-loss fallback.
- Consolidated route metadata in `src/config/routes.ts`; project details and legacy Coursework routes now resolve to Projects without duplicating content.
- Rebuilt Home, About, Projects, Publications, and Notes as shared bilingual page components.
- Converted Projects to indexed alternating rows with filters, meaningful cover alt text, and preserved public report/code/slides/Shadertoy links.
- Added factual Technical Reports while keeping peer-reviewed publications empty and Research Notebook entries at zero.
- Removed obsolete RSUI, custom history/router, old renderer/shader trees, unused visual components, old Navbar, unused project card, and empty scaffold directories.
- Updated architecture, maintenance, audit, build, and deployment documentation.
