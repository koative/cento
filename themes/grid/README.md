# Grid

A sun-filled home energy planner with adjustable solar capacity and battery modeling.

A standalone, responsive React + TypeScript + Vite template from [Elseform](https://github.com/koative/elseform).

## Run independently

```sh
cd themes/grid
bun install
bun run dev
bun run build
bun run preview
```

The production output is `dist/`. Vite uses a relative base, so the output can be served from any static subdirectory.

## Working interactions

Change solar panel count, monthly bill and battery selection. The simplified estimate recalculates and a local concept can be saved.

All business names, prices, specifications, data and availability are **fictional demonstration content**. State stays in memory and resets on reload. No backend, booking, email, payment or external operation is connected. Replace demonstration content and implement real integrations before production use.

## Design and accessibility

A sunlit domestic planning sheet: saturated apricot, warm paper, bold Bricolage lettering, real home photograph and an inline energy calculator.

Responsive layouts, semantic controls, visible focus, meaningful labels, native form validation where relevant, and reduced-motion support. Motion follows the material of each theme; reduced-motion disables decorative animation.

## Self-hosted fonts and icons

Fonts are bundled in `src/assets/fonts/` with their Open Font License notices. Font assets are reused from this repository's licensed font collection. No external font request is made. [Lucide](https://lucide.dev/) icons use the ISC license. CSS and SVG geometry are authored for this template.

## Photography

Locally bundled editorial house photograph: [original Unsplash image](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c), under the [Unsplash license](https://unsplash.com/license). No implied endorsement or real installation claim.

## Validation

Standalone build verified with `bun run build`. The root repository maintains interaction tests and responsive screenshot checks.
