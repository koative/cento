# Nocturne

A warm, late-night listening bar with restrained serif lettering, a three-dimensional turntable, a small record collection, a drinks menu, and a table request.

## Run independently

```sh
cd themes/nocturne
bun install
bun run dev
```

Run `bun run build` for a static production build and `bun run preview` to inspect it. The Vite base is relative (`./`), so the built `dist` folder can be hosted below any path. React, Vite, TypeScript, and Lucide are the only dependencies.

## Included interactions

Select a fictional record. Play/pause the silent turntable simulation and advance to another record. Playback is visual only, with no audio file. Submit a table request to display an on-page demo summary. Nothing is sent.

## Design

Charcoal brown #211e19 / amber #cfad73 / warm tan #b99a6b. Typography: Cormorant Garamond and Manrope. Responsive mobile layouts, native controls, visible keyboard focus, and reduced-motion support are included.

## Sources and reuse

Turntable, records, sleeves, glass, and menu artwork are original CSS. All artists, albums and drinks are fictional examples. No audio or third-party imagery.

Fonts are from Google Fonts, distributed under their respective open font licenses. Icons use Lucide (ISC). See the repository license for template code.

## Demo disclosure

The brand, content, people, events, product specifications, prices, and availability are fictional demonstrations. There is no commerce, booking, email collection, or backend integration. Replace the example content and connect real services before production use.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
