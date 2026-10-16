# Forma

Architecture / portfolio template from the Elseform collection. Built with React, TypeScript, Vite, and Lucide icons.

## Design

Warm bone paper, charcoal ink, Manrope display typography, and asymmetric photographic index. A clipped photograph reveal and restrained project-row motion reinforce the architectural composition.

**Type:** Manrope and DM Sans. Fonts are sourced from Google Fonts and bundled locally.

- Background: `#eeeee8`
- Ink: `#292b26`
- Contact Surface: `#d9ddcd`

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

The relative Vite base supports deployment at `/elseform/themes/forma/` or another subdirectory. The theme has no dependency on the gallery or other templates. `src/main.tsx` is the entry point. Edit `src/App.tsx` for content and `src/styles.css` for the visual system.

## Working interactions

- Switch the hero photograph between three projects.
- Filter the project index by discipline, then expand a project for more detail.
- Submit the local inquiry form to display an explicit demonstration confirmation.

State is held in memory and resets on reload. Forms use native validation; no server, payment processor, or external message service is connected. All business names, projects, prices, offerings, and availability are **fictional demonstration content**. Replace these and connect your own services before production use.

## Accessibility and motion

Semantic navigation and forms, visible keyboard focus, accessible button names, pressed/expanded control states, explicit confirmation messages, mobile reflow, and `prefers-reduced-motion` support. Photographs include descriptive alternative text. The intentionally authored motion is disabled for reduced-motion preferences.

## Photography and icons

The following photographs are stored locally under `src/assets` and imported by Vite, so nested deployments do not depend on remote photo URLs. Sources:

- [house — original Unsplash image](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c)
- [interior — original Unsplash image](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0)
- [building — original Unsplash image](https://images.unsplash.com/photo-1511818966892-d7d671e672a2)

Photography: [Unsplash license](https://unsplash.com/license). Fonts: [Google Fonts](https://fonts.google.com/), under the respective open font licenses. Icons: [Lucide](https://lucide.dev/), ISC license. Verify the terms for your intended use and replace editorial demonstration photographs before using them to imply a real business, product, or property.

## Validation

Standalone production build verified with `bun run build`. Collection-wide responsive and interaction verification is maintained at the repository level.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
