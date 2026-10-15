# Kiln — Ceramics studio commerce

Terracotta and cream, expressive Cormorant typography, generous product photography, and a moving CSS 3D display plinth.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm equivalents also work. The production `dist/` directory uses relative asset paths and can be hosted at any static subdirectory.

## Interactions

Filter the collection, add objects to the sample bag, open the bag, adjust quantities, and remove all items.

## Customize

- `src/App.tsx`: content, demo data, interactions, and sections.
- `src/styles.css`: independent visual system, responsive layout, and reduced motion.
- `src/assets/`: local photography and self-hosted fonts.

React + Vite + TypeScript. This folder is standalone and requires no backend, environment variables, or shared runtime from another template.

## Demo boundaries

All businesses, products, prices, customers, shipments, events, metrics, dates, and account details are fictional demonstration content. State lives in memory and resets on reload. No orders, payments, reservations, tracking requests, subscriptions, or messages are sent. Form values are not transmitted or persisted.

## Accessibility and motion

Semantic landmarks, visible keyboard focus, native controls and form validation, descriptive labels, responsive layouts, and reduced-motion overrides are included. Animations are decorative; all content remains accessible without motion.

## Asset provenance

src/assets/pottery.jpg: https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1600&q=85&fit=crop

src/assets/ceramics.jpg: https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&q=85&fit=crop

Photos sourced from Unsplash; the collection uses crops as illustrative studio imagery, not exact product photographs. The display plinth is authored CSS 3D geometry.

Unsplash photos are subject to the [Unsplash license](https://unsplash.com/license). Replace illustrative imagery as appropriate.

Fonts are bundled in `src/assets/fonts/` with their OFL licenses: DM Sans and Cormorant Garamond, sourced from Google Fonts. No external fonts are requested at runtime. Icons are from [Lucide](https://lucide.dev), ISC license.

Part of [Koative Templates](https://koative.github.io/templates/).

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
