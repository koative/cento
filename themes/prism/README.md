# Prism

A creative conference expressed through lavender Swiss-influenced type, a perspective folded-paper sculpture, a generous agenda, and a perforated ticket.

## Run independently

```sh
cd themes/prism
bun install
bun run dev
```

Run `bun run build` for a static production build and `bun run preview` to inspect it. The Vite base is relative (`./`), so the built `dist` folder can be hosted below any path. React, Vite, TypeScript, and Lucide are the only dependencies.

## Included interactions

Switch days and filter the agenda by track. Choose a pass and quantity (1–4) to see a calculated illustrative total and demo selection confirmation.

## Design

Lavender #c8aff1 / deep plum #2b163e / orange #ff8a51. Typography: Space Grotesk and Inter. Responsive mobile layouts, native controls, visible keyboard focus, and reduced-motion support are included.

## Sources and reuse

All folded-paper geometry and speaker artwork are original CSS. No third-party image assets.

Fonts are from Google Fonts, distributed under their respective open font licenses. Icons use Lucide (ISC). See the repository license for template code.

## Demo disclosure

The brand, content, people, events, product specifications, prices, and availability are fictional demonstrations. There is no commerce, booking, email collection, or backend integration. Replace the example content and connect real services before production use.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
