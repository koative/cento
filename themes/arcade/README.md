# Oddbox / Arcade

An indie game studio with a playable browser memory game, tactile lilac game cabinet, playful catalog artwork, and an orange studio introduction.

## Run independently

```sh
cd themes/arcade
bun install
bun run dev
```

Run `bun run build` for a static production build and `bun run preview` to inspect it. The Vite base is relative (`./`), so the built `dist` folder can be hosted below any path. React, Vite, TypeScript, and Lucide are the only dependencies.

## Included interactions

Pair Up is a working randomized memory game with six pairs, move count, match state, keyboard support, and reset. Read expandable game concepts and try a clearly disclosed local demo email form. No information is collected.

## Design

Cream #faf2de / purple #6848bd / candy pink #edc6e6 / orange #e98c5d. Typography: Space Grotesk and DM Sans. Responsive mobile layouts, native controls, visible keyboard focus, and reduced-motion support are included.

## Sources and reuse

All game symbols are Lucide icons (ISC); all cabinet and catalog graphics are original CSS. No third-party images or audio.

Fonts are from Google Fonts, distributed under their respective open font licenses. Icons use Lucide (ISC). See the repository license for template code.

## Demo disclosure

The brand, content, people, events, product specifications, prices, and availability are fictional demonstrations. There is no commerce, booking, email collection, or backend integration. Replace the example content and connect real services before production use.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
