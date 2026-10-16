# Nectar

A seasonal honey tasting counter with a dimensional jar and quantity-aware demo basket.

[Live demo](https://koative.github.io/elseform/themes/nectar/)

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`; preview with `bun run preview`. The relative Vite base supports nested hosting. This folder is self-contained.

## Design and interaction

Apiary tasting: golden paper, meadow green, a floating dimensional jar and a flavor-to-pairing index.

Harvest switching, jar quantities and demo basket confirmation. All state is local to the current page visit and resets on reload. All businesses, products, prices, schedules and services are fictional. No order, payment, booking or inquiry is sent.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the visual system, and `index.html` for metadata. React 19, TypeScript and Vite. Semantic controls, visible keyboard focus, mobile reflow and reduced-motion handling are included.

## Assets and licensing

No photography. Original CSS geometry is included under the template MIT license.

Self-hosted DM Sans, Libre Caslon Text and Space Grotesk originate from [Google Fonts](https://fonts.google.com/). Their OFL notices ship in `src/assets/fonts`. Icons are [Lucide](https://lucide.dev/), ISC licensed. Template code is MIT licensed; see `LICENSE`. Replace demonstration content and connect real services before production use.
