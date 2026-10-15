# Muse

Fashion / editorial commerce template from the Koative collection. Built with React, TypeScript, Vite, and Lucide icons.

## Design

Oxblood and warm ivory, expressive Cormorant Garamond typography, a split campaign spread, a moving editorial line, and a tactile product study.

**Type:** Cormorant Garamond and DM Sans. Fonts are loaded from Google Fonts.

- Background: `#f6f1e9`
- Oxblood: `#4a1524`
- Secondary Surface: `#e8dfd4`

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

The relative Vite base supports deployment at `/templates/themes/muse/` or another subdirectory. The theme has no dependency on the gallery or other templates. `src/main.tsx` is the entry point. Edit `src/App.tsx` for content and `src/styles.css` for the visual system.

## Working interactions

- Cycle through three editorial looks.
- Select a size and add demonstration pieces to the bag. Open or clear the local bag.
- Submit a local newsletter signup and receive a demonstration confirmation.

State is held in memory and resets on reload. Forms use native validation; no server, payment processor, or external message service is connected. All business names, projects, prices, offerings, and availability are **fictional demonstration content**. Replace these and connect your own services before production use.

## Accessibility and motion

Semantic navigation and forms, visible keyboard focus, accessible button names, pressed/expanded control states, explicit confirmation messages, mobile reflow, and `prefers-reduced-motion` support. Photographs include descriptive alternative text. The intentionally authored motion is disabled for reduced-motion preferences.

## Photography and icons

The following photographs are stored locally under `src/assets` and imported by Vite, so nested deployments do not depend on remote photo URLs. Sources:

- [fashion — original Unsplash image](https://images.unsplash.com/photo-1539109136881-3be0616acf4b)
- [portrait — original Unsplash image](https://images.unsplash.com/photo-1483985988355-763728e1935b)
- [detail — original Unsplash image](https://images.unsplash.com/photo-1532453288672-3a27e9be9efd)

Photography: [Unsplash license](https://unsplash.com/license). Fonts: [Google Fonts](https://fonts.google.com/), under the respective open font licenses. Icons: [Lucide](https://lucide.dev/), ISC license. Verify the terms for your intended use and replace editorial demonstration photographs before using them to imply a real business, product, or property.

## Validation

Standalone production build verified with `bun run build`. Collection-wide responsive and interaction verification is maintained at the repository level.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
