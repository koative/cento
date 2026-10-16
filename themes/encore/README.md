# Encore

An evening theatre programme with an interactive seating plan and ticket totals.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Deploy `dist/` to any static host. Relative Vite asset paths support subdirectories.

## Design and interactions

Burgundy theatre programme with gold paper, arch typography and seat geometry. Curtain-inspired horizontal reveal; keyboard-operable seating plan and local ticket summary.

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the design system, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. No backend required.

## Accessibility

Semantic landmarks, visible focus, labeled controls, mobile reflow and reduced-motion preferences. All interaction state is local to this visit and resets on reload.

## Demonstration content

All brands, people, schedules, products, prices and availability are fictional sample content. No booking, payment, message, or personal data leaves the page. Replace example content and connect your own services for production.

## Assets

Fonts are self-hosted in `src/assets/fonts/`, copied from the collection's nocturne template with their OFL notices. DM Sans is also bundled. Fonts originate from [Google Fonts](https://fonts.google.com/). Icons: [Lucide](https://lucide.dev/), ISC license. Original vector diagrams and CSS graphics are part of this MIT-licensed template.

Photography `theatre.jpg`: [photo-1503095396549-807759245b35](https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=85), [Unsplash license](https://unsplash.com/license). Bundled locally; illustrative use does not imply endorsement.
