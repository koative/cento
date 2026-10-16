# Vector

A cinematic automotive concept with trim, finish and engineering views.

A standalone, responsive React + TypeScript + Vite template from [Elseform](https://github.com/koative/elseform).

## Run independently

```sh
cd themes/vector
bun install
bun run dev
bun run build
bun run preview
```

The production output is `dist/`. Vite uses a relative base, so the output can be served from any static subdirectory.

## Working interactions

Choose a trim and finish, switch between exterior and CSS engineering views, and save a local configuration.

All business names, prices, specifications, data and availability are **fictional demonstration content**. State stays in memory and resets on reload. No backend, booking, email, payment or external operation is connected. Replace demonstration content and implement real integrations before production use.

## Design and accessibility

A cinematic road journal: full-width editorial vehicle photography, lean condensed headings, sage engineering surfaces and an integrated trim configurator.

Responsive layouts, semantic controls, visible focus, meaningful labels, native form validation where relevant, and reduced-motion support. Motion follows the material of each theme; reduced-motion disables decorative animation.

## Self-hosted fonts and icons

Fonts are bundled in `src/assets/fonts/` with their Open Font License notices. Font assets are reused from this repository's licensed font collection. No external font request is made. [Lucide](https://lucide.dev/) icons use the ISC license. CSS and SVG geometry are authored for this template.

## Photography

Locally bundled editorial vehicle photograph: [original Unsplash image](https://images.unsplash.com/photo-1503376780353-7e6692767b70), under the [Unsplash license](https://unsplash.com/license). The photograph depicts an existing vehicle; V.01 is fictional and has no affiliation with the pictured manufacturer. Paint changes are image treatments, not accurate product renders.

## Validation

Standalone build verified with `bun run build`. The root repository maintains interaction tests and responsive screenshot checks.
