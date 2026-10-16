# Odyssey

A destination journal with a buildable day-by-day itinerary.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Publish `dist`; relative asset paths support subdirectory hosting.

## Design and interaction

A blue-and-sand travel notebook: panoramic destination imagery, tabbed daily plans and a trip packing sheet. The itinerary behaves like a practical journal and each selected activity changes a visible route summary.

The controls demonstrate complete local state changes. All brands, people, addresses, prices, dates and offerings are fictional demo content. No information is submitted, no booking or order is made, and no service or advice is provided. Replace demo content and connect an appropriate backend before real use.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for styles, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. Keyboard focus, semantic controls, mobile layouts and reduced-motion preferences are supported.

## Assets

Self-hosted instrument and dm fonts copied from the collection's licensed assets; OFL notices in `src/assets/fonts`. Lucide icons are ISC licensed. Photos are bundled from Unsplash under its license and are illustrative, without endorsement:

- `coast.jpg`: https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1800&q=85
- `town.jpg`: https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85
