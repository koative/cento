# Ripple

A bright swimming academy with animated lanes and a filterable weekly lesson planner.

[Live demo](https://koative.github.io/elseform/themes/ripple/)

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`; preview with `bun run preview`. The relative Vite base supports nested hosting. This folder is self-contained.

## Design and interaction

Pool timetable: cyan swim lanes, deep teal Space type, user-group/day filters and lesson selection.

Audience/day filters, empty-state recovery, lesson selection and saved plan. All state is local to the current page visit and resets on reload. All businesses, products, prices, schedules and services are fictional. No order, payment, booking or inquiry is sent.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the visual system, and `index.html` for metadata. React 19, TypeScript and Vite. Semantic controls, visible keyboard focus, mobile reflow and reduced-motion handling are included.

## Assets and licensing

No photography. Original CSS geometry is included under the template MIT license.

Self-hosted DM Sans, Libre Caslon Text and Space Grotesk originate from [Google Fonts](https://fonts.google.com/). Their OFL notices ship in `src/assets/fonts`. Icons are [Lucide](https://lucide.dev/), ISC licensed. Template code is MIT licensed; see `LICENSE`. Replace demonstration content and connect real services before production use.
