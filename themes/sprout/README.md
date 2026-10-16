# Sprout

A cheerful nursery with light-aware plant discovery and a small-space growing plan.

[Live demo](https://koative.github.io/elseform/themes/sprout/)

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`; preview with `bun run preview`. The relative Vite base supports nested hosting. This folder is self-contained.

## Design and interaction

Nursery planner: garden greens, Space lettering, simple botanical geometry, sunlight selection and planted shortlist.

Sunny/shady filters, plant add/remove, growing-space choice and plan save. All state is local to the current page visit and resets on reload. All businesses, products, prices, schedules and services are fictional. No order, payment, booking or inquiry is sent.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the visual system, and `index.html` for metadata. React 19, TypeScript and Vite. Semantic controls, visible keyboard focus, mobile reflow and reduced-motion handling are included.

## Assets and licensing

`src/assets/photo.jpg`: [original Unsplash photograph](https://images.unsplash.com/photo-1416879595882-3373a0480b5b), under the [Unsplash license](https://unsplash.com/license). Sourced directly and bundled locally. Editorial inspiration only; no endorsement or exact inventory is implied.

Self-hosted DM Sans, Libre Caslon Text and Space Grotesk originate from [Google Fonts](https://fonts.google.com/). Their OFL notices ship in `src/assets/fonts`. Icons are [Lucide](https://lucide.dev/), ISC licensed. Template code is MIT licensed; see `LICENSE`. Replace demonstration content and connect real services before production use.
