# Atelier

A standalone **independent creative studio** template from the Koative collection.

Cobalt, citron, playful typographic projects, asymmetric portfolio columns, and an interactive studio sculpture.

## Run locally

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
bun run preview
```

The production output is written to `dist/`. The Vite configuration uses a relative asset base so the site can be hosted under any static subdirectory. React, TypeScript, and Vite; no backend required.

## Interactions

Turn the studio sculpture, filter projects by discipline, expand each project, and copy the demo email to the clipboard. Clipboard failure provides a manual fallback.

Keyboard focus, semantic buttons, responsive mobile layouts, and reduced-motion preferences are supported. State is local to this visit and resets on reload.

## Customize

Edit `src/App.tsx` for copy, content, and interactions. Edit `src/styles.css` for typography, color, layout, and motion. Images are imported from `src/assets/` so Vite rewrites their URLs correctly.

## Assets

No stock images. Project posters, product mockups, and studio sculpture are original CSS/SVG compositions. Fonts: Space Grotesk and DM Sans from Google Fonts.

Icons use Lucide React. Fonts and their licenses are bundled locally. Any photographic assets are bundled locally as well. Review the relevant provider license before reusing assets outside this template.

## Demonstration status

All brands, products, artists, missions, routes, prices, schedules, and claims are fictional sample content. This template does not sell products, take payments, make bookings, send messages, or connect to a backend. Replace the example content and contact address before launch.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
