# Tide — Ocean conservation community

Turquoise, sea green, and ivory; a gently moving ocean photograph, editorial narrative, location-led volunteering, and a sample season report.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm equivalents also work. The production `dist/` directory uses relative asset paths and can be hosted at any static subdirectory.

## Interactions

Select a cleanup location, inspect event details, submit a locally validated signup, and edit the signup. Selecting another event resets the confirmation.

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

src/assets/ocean.jpg: https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1800&q=85&fit=crop

Photo sourced from Unsplash. Events, available spaces, and impact data are explicitly illustrative. No cleanup events are actually organized or reserved.

Unsplash photos are subject to the [Unsplash license](https://unsplash.com/license). Replace illustrative imagery as appropriate.

Fonts are bundled in `src/assets/fonts/` with their OFL licenses: DM Sans and Manrope, sourced from Google Fonts. No external fonts are requested at runtime. Icons are from [Lucide](https://lucide.dev), ISC license.

Part of [Koative Templates](https://koative.github.io/templates/).

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
