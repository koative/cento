# Proof

A daily bakery order sheet with loaf quantities and a pickup receipt.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Deploy `dist/` to any static host. Relative Vite asset paths support subdirectories.

## Design and interactions

Bakery order ledger with honey paper and flour-white typography. Bread photograph slowly unfolds; quantities produce a clear itemized local receipt.

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the design system, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. No backend required.

## Accessibility

Semantic landmarks, visible focus, labeled controls, mobile reflow and reduced-motion preferences. All interaction state is local to this visit and resets on reload.

## Demonstration content

All brands, people, schedules, products, prices and availability are fictional sample content. No booking, payment, message, or personal data leaves the page. Replace example content and connect your own services for production.

## Assets

Fonts are self-hosted in `src/assets/fonts/`, copied from the collection's nocturne template with their OFL notices. DM Sans is also bundled. Fonts originate from [Google Fonts](https://fonts.google.com/). Icons: [Lucide](https://lucide.dev/), ISC license. Original vector diagrams and CSS graphics are part of this MIT-licensed template.

Photography `bread.jpg`: [photo-1509440159596-0249088772ff](https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85), [Unsplash license](https://unsplash.com/license). Bundled locally; illustrative use does not imply endorsement.
