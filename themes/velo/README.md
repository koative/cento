# Vélo

A steel cycling editorial with a full-bleed bicycle photograph, scarlet race strip, perspective frame geometry configurator, and quiet manifesto.

## Run independently

```sh
cd themes/velo
bun install
bun run dev
```

Run `bun run build` for a static production build and `bun run preview` to inspect it. The Vite base is relative (`./`), so the built `dist` folder can be hosted below any path. React, Vite, TypeScript, and Lucide are the only dependencies.

## Included interactions

Choose Road or All-road, a finish, and a frame size. The geometry, price, saved-build summary, and expandable specifications update together. Saved configurations last only for this visit.

## Design

Bone #f2f0e7 / racing red #d42d22 / graphite #242924. Typography: Barlow Condensed and DM Sans. Responsive mobile layouts, native controls, visible keyboard focus, and reduced-motion support are included.

## Sources and reuse

Bicycle photograph: https://images.unsplash.com/photo-1485965120184-e220f721d03e (Unsplash, downloaded locally as `src/assets/bicycle.jpg`). Used as an editorial reference; the photograph is explicitly not the configured product. Frame geometry is original SVG.

Fonts are from Google Fonts, distributed under their respective open font licenses. Icons use Lucide (ISC). See the repository license for template code.

## Demo disclosure

The brand, content, people, events, product specifications, prices, and availability are fictional demonstrations. There is no commerce, booking, email collection, or backend integration. Replace the example content and connect real services before production use.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
