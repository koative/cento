# Relay — Logistics operations workspace

Porcelain surfaces, precise blue/orange details, a responsive workspace rail, authored animated route geometry, and a dense shipment table.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm equivalents also work. The production `dist/` directory uses relative asset paths and can be hosted at any static subdirectory.

## Interactions

Search by shipment ID, customer, or city; filter by status; inspect individual tracking details; export the currently filtered rows as a real CSV download; recover from empty searches.

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

All map/network graphics are authored SVG geometry. The network is a schematic, not a geographic map, and route progress is sample data. No photography is used.

Unsplash photos are subject to the [Unsplash license](https://unsplash.com/license). Replace illustrative imagery as appropriate.

Fonts are bundled in `src/assets/fonts/` with their OFL licenses: DM Sans and Manrope, sourced from Google Fonts. No external fonts are requested at runtime. Icons are from [Lucide](https://lucide.dev), ISC license.

Part of [Elseform](https://koative.github.io/elseform/).

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
