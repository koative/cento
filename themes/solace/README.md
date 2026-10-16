# Solace

A warm, appointment-first clinic with a calm visit planner.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Publish `dist`; relative asset paths support subdirectory hosting.

## Design and interaction

A sage appointment sheet: a friendly circular portrait paired with a four-step visit planner, clean service rows, and an unfolding care note. The booking form shows a local confirmation with selected visit type and time.

The controls demonstrate complete local state changes. All brands, people, addresses, prices, dates and offerings are fictional demo content. No information is submitted, no booking or order is made, and no service or advice is provided. Replace demo content and connect an appropriate backend before real use.

## Customize

Edit `src/App.tsx` for content and behavior, `src/styles.css` for styles, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. Keyboard focus, semantic controls, mobile layouts and reduced-motion preferences are supported.

## Assets

Self-hosted lora and dm fonts copied from the collection's licensed assets; OFL notices in `src/assets/fonts`. Lucide icons are ISC licensed. Photos are bundled from Unsplash under its license and are illustrative, without endorsement:

- `care.jpg`: https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85
