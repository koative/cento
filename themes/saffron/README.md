# Saffron

A seasonal neighborhood market with a working basket and pickup summary.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Publish `dist`; relative asset paths support subdirectory hosting.

## Design and interaction

A lively market order sheet in aubergine, tomato and butter. A photographic produce masthead leads to a compact grocery ledger with quantity controls, live total and pickup slot selection. The basket changes as real line items, never a fake checkout.

The controls demonstrate complete local state changes. All brands, people, addresses, prices, dates and offerings are fictional demo content. No information is submitted, no booking or order is made, and no service or advice is provided. Replace demo content and connect an appropriate backend before real use.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for styles, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. Keyboard focus, semantic controls, mobile layouts and reduced-motion preferences are supported.

## Assets

Self-hosted bricolage and dm fonts copied from the collection's licensed assets; OFL notices in `src/assets/fonts`. Lucide icons are ISC licensed. Photos are bundled from Unsplash under its license and are illustrative, without endorsement:

- `market.jpg`: https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85
