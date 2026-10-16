# Aperture

A late-night cinema programme, cinematic image frames, and a working ticket selector.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`. Deploy `dist/` to any static host. Relative Vite asset paths support subdirectories.

## Design and interactions

Film programme / ink, warm paper and electric orange. Reel-window crop animation; session selection and local ticket calculation.

Edit `src/App.tsx` for content and behavior, `src/styles.css` for the design system, and `index.html` for metadata. React, TypeScript, Vite and Lucide icons. No backend required.

## Accessibility

Semantic landmarks, visible focus, labeled controls, mobile reflow and reduced-motion preferences. All interaction state is local to this visit and resets on reload.

## Demonstration content

All brands, people, schedules, products, prices and availability are fictional sample content. No booking, payment, message, or personal data leaves the page. Replace example content and connect your own services for production.

## Assets

Fonts are self-hosted in `src/assets/fonts/`, copied from the collection's pulse template with their OFL notices. DM Sans is also bundled. Fonts originate from [Google Fonts](https://fonts.google.com/). Icons: [Lucide](https://lucide.dev/), ISC license. Original vector diagrams and CSS graphics are part of this MIT-licensed template.

Photography `screen.jpg`: [photo-1519608487953-e999c86e7455](https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85), [Unsplash license](https://unsplash.com/license). Bundled locally; illustrative use does not imply endorsement.
