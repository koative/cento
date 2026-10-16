# Haven

Alpine retreat / travel template from the Elseform collection. Built with React, TypeScript, Vite, and Lucide icons.

## Design

Deep forest, warm limestone, Italiana typography, immersive mountain photography, a slow landscape reveal, and a compact stay configurator.

**Type:** Italiana and DM Sans. Fonts are sourced from Google Fonts and bundled locally.

- Forest: `#233c32`
- Cream: `#f2f0e8`
- Sage: `#d9decf`

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

The relative Vite base supports deployment at `/elseform/themes/haven/` or another subdirectory. The theme has no dependency on the gallery or other templates. `src/main.tsx` is the entry point. Edit `src/App.tsx` for content and `src/styles.css` for the visual system.

## Working interactions

- Select a room or cabin and see its imagery, details, and illustrative rate.
- Set an arrival date, one to fourteen nights, and party size; the total recalculates immediately.
- Four guests automatically selects the suite; choosing a smaller room adjusts the party to two.
- Submit to produce a local demonstration confirmation.

State is held in memory and resets on reload. Forms use native validation; no server, payment processor, or external message service is connected. All business names, projects, prices, offerings, and availability are **fictional demonstration content**. Replace these and connect your own services before production use.

## Accessibility and motion

Semantic navigation and forms, visible keyboard focus, accessible button names, pressed/expanded control states, explicit confirmation messages, mobile reflow, and `prefers-reduced-motion` support. Photographs include descriptive alternative text. The intentionally authored motion is disabled for reduced-motion preferences.

## Photography and icons

The following photographs are stored locally under `src/assets` and imported by Vite, so nested deployments do not depend on remote photo URLs. Sources:

- [mountain — original Unsplash image](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b)
- [cabin — original Unsplash image](https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8)
- [room — original Unsplash image](https://images.unsplash.com/photo-1611892440504-42a792e24d32)

Photography: [Unsplash license](https://unsplash.com/license). Fonts: [Google Fonts](https://fonts.google.com/), under the respective open font licenses. Icons: [Lucide](https://lucide.dev/), ISC license. Verify the terms for your intended use and replace editorial demonstration photographs before using them to imply a real business, product, or property.

## Validation

Standalone production build verified with `bun run build`. Collection-wide responsive and interaction verification is maintained at the repository level.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
