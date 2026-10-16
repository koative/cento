# Delta

A living reservoir study turns rainfall and catchment area into a water capture model.

[Live demo](https://koative.github.io/elseform/themes/delta/) · [Collection](https://koative.github.io/elseform/)

## Run independently

```sh
bun install
bun run dev
```

```sh
bun run build
bun run preview
```

Production output is `dist/`. The Vite base is relative, so this folder can be deployed to any static subdirectory. React, TypeScript, Vite and Lucide.

## Working interactions

Adjust rainfall and catchment; calculate capture and watering equivalent; save a local scenario.

All brands, people, pricing, locations, figures and availability are fictional demonstration content. State stays in memory and resets on reload. Nothing is submitted to a backend. Replace example content and wire your own services before production use.

## Customize

`src/App.tsx` owns content and behavior. `src/styles.css` owns the independent visual system. `DESIGN.md` records the direction, tokens and responsive behavior.

## Assets and licenses

Self-hosted DM Sans, Space Grotesk, Manrope and Libre Caslon Text originate from Google Fonts, reused from this repository's licensed collection. OFL notices are included beside the fonts. Lucide icons are ISC licensed. Original CSS and SVG geometry is part of this MIT-licensed template.

## Accessibility

Semantic landmarks, descriptive labels, visible keyboard focus, reduced-motion preferences, and mobile reflow. Interactive calculations and confirmations use local state and accessible status messages.
