# Vault

A warm insurance concept with an adjustable plan explorer and transparent local summaries.

A standalone, responsive React + TypeScript + Vite template from [Elseform](https://github.com/koative/elseform).

## Run independently

```sh
cd themes/vault
bun install
bun run dev
bun run build
bun run preview
```

The production output is `dist/`. Vite uses a relative base, so the output can be served from any static subdirectory.

## Working interactions

Change home type, belongings value and billing period, compare plans, save a local summary and expand answers.

All business names, prices, specifications, data and availability are **fictional demonstration content**. State stays in memory and resets on reload. No backend, booking, email, payment or external operation is connected. Replace demonstration content and implement real integrations before production use.

## Design and accessibility

A reassuring household booklet: warm paper, earthy modular forms, expressive Instrument Serif and visible insurance comparisons.

Responsive layouts, semantic controls, visible focus, meaningful labels, native form validation where relevant, and reduced-motion support. Motion follows the material of each theme; reduced-motion disables decorative animation.

## Self-hosted fonts and icons

Fonts are bundled in `src/assets/fonts/` with their Open Font License notices. Font assets are reused from this repository's licensed font collection. No external font request is made. [Lucide](https://lucide.dev/) icons use the ISC license. CSS and SVG geometry are authored for this template.

## Validation

Standalone build verified with `bun run build`. The root repository maintains interaction tests and responsive screenshot checks.

## Additional local photograph

`src/assets/interior.jpg` is reused from the Forma template: [original Unsplash photograph](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0), under the [Unsplash license](https://unsplash.com/license). It is an illustrative scene, not a photograph of a real business represented by this demo.
