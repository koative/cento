# Pulse

A standalone **electronic music festival** template from the Elseform collection.

Acid green, violet, condensed poster typography, and a kinetic concentric speaker sculpture.

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

Day tabs change the artist schedule. Ticket type and quantity controls update the total; selection produces an inline demo confirmation.

Keyboard focus, semantic buttons, responsive mobile layouts, and reduced-motion preferences are supported. State is local to this visit and resets on reload.

## Customize

Edit `src/App.tsx` for copy, content, and interactions. Edit `src/styles.css` for typography, color, layout, and motion. Images are imported from `src/assets/` so Vite rewrites their URLs correctly.

## Assets

Festival photo: [Unsplash](https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3), downloaded via `images.unsplash.com/photo-1470229722913-7c0e2dbbafd3`. Fonts: Barlow Condensed and Space Grotesk from Google Fonts.

Icons use Lucide React. Fonts and their licenses are bundled locally. Any photographic assets are bundled locally as well. Review the relevant provider license before reusing assets outside this template.

## Demonstration status

All brands, products, artists, missions, routes, prices, schedules, and claims are fictional sample content. This template does not sell products, take payments, make bookings, send messages, or connect to a backend. Replace the example content and contact address before launch.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
