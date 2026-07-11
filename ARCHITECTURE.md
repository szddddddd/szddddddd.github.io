# RSUI Engine Architecture

RSUI Engine is a lightweight spatial rendering runtime for this research portfolio. It treats the HTML document as the semantic information layer and a single persistent WebGL world as the interactive application layer.

## Runtime model

`RSUIEngine` owns one renderer, one scene graph, one perspective camera, and one animation loop for the lifetime of a browser session. Astro continues to statically generate every route, so all research content remains readable, indexable, and reachable without JavaScript.

When JavaScript and WebGL are available, `SpatialRouter` intercepts only the five primary same-language research routes. It swaps the semantic contents of `main`, updates browser history, and asks the existing engine to move through the corresponding region. The canvas is never removed or recreated during those navigations. Direct visits, external links, project-detail routes, and JavaScript-disabled browsing retain normal static-page behavior.

```
semantic DOM ───── accessibility, SEO, keyboard and fallback navigation
       │
       └── SpatialRouter ── RSUIEngine ── one WebGL renderer
                                      ├── one scene graph / world regions
                                      ├── one camera controller
                                      ├── one animation scheduler
                                      └── one post-processing chain
```

## Module boundaries

| Area | Responsibility |
| --- | --- |
| `src/core` | Engine lifecycle, finite state, time, event bus, and scheduled tasks. |
| `src/navigation` | URL-to-page mapping, history, spatial route changes, and transition coordination. |
| `src/three` | The only layer that talks directly to Three.js: renderer, scene graph, camera, environment, lighting, post process, and shader pipeline. |
| `src/resources` | Lazy texture loading and cached shader/geometry ownership. |
| `src/materials` | Reusable visual material factories. |
| `src/shaders` | Composable GLSL modules and background, transition, and post-process programs. |
| `src/interaction` | Pointer, cursor, hover, magnetic DOM movement, raycasting, and scroll signals. |
| `src/pages` | Page-region lifecycles with `enter()`, `leave()`, `update()`, and `destroy()`. They configure the engine scene API rather than importing Three.js. |

## Scene graph

The world has five named regions:

- `HOME` is the central research hub.
- `ABOUT` is an identity field with a neural cluster.
- `PROJECTS` is a research-node constellation.
- `PUBLICATIONS` is a path-like knowledge timeline.
- `NOTES` is a notebook field.

Each region is a durable group inside one `SceneGraph`. Page changes change group emphasis, camera focus, shader uniforms, and interaction targets; they do not construct a new scene, camera, or renderer.

## State machine and transitions

`EngineState` defines the finite page state: `HOME`, `ABOUT`, `PROJECTS`, `PUBLICATIONS`, and `NOTES`. `PageTransition` changes the state through a transition progress signal. The camera uses damped position and look-at targets, while the shader pipeline receives the same progress for a dissolve/depth-blur response. Reduced-motion users receive an immediate, non-animated state update.

## Shader pipeline

All engine shaders receive shared global uniforms:

`time`, `resolution`, `mouse`, `scroll`, `theme`, `page`, `velocity`, and `transitionProgress`.

GLSL helpers for noise, FBM, curl, SDF, gradient, easing, and lighting are defined once in `src/shaders/common`. The neural-field background and subtle post-process passes compose those helpers rather than duplicating noise code.

## Animation and performance

`AnimationLoop` is the only `requestAnimationFrame` owner. It uses a bounded delta time, pauses when the document is hidden, caps pixel density, and reduces particle density on smaller screens. `ResourceManager` owns cache disposal so future modules can unload textures, geometries, and materials without changing engine core behavior.

## Interaction and accessibility

Canvas content is decorative to assistive technology. The DOM retains headings, links, labels, descriptions, keyboard focus, and a live route announcement. Hover and raycast events enrich matching DOM controls, while keyboard activation always uses the original links. The motion toggle and `prefers-reduced-motion` control both DOM and rendering motion.

## Future extensions

Future features should be implemented as an engine page region, renderer plugin, or resource-backed scene module. 3D Gaussian Splatting viewers, WebGPU experiments, interactive papers, embodied-AI simulations, and custom post-process passes can plug into the scene graph and event bus without replacing the engine lifecycle.
