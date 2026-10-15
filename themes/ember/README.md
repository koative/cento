# Ember

Restaurant / hospitality template from the Koative collection. Built with React, TypeScript, Vite, and Lucide icons.

## Design

Tomato red and buttercream, Bricolage Grotesque display typography, full food photography, a tilted menu note, and a paper-menu interaction.

**Type:** Bricolage Grotesque and DM Sans. Fonts are sourced from Google Fonts and bundled locally.

- Cream: `#fff4df`
- Tomato: `#b32f21`
- Ink: `#402019`

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

The relative Vite base supports deployment at `/templates/themes/ember/` or another subdirectory. The theme has no dependency on the gallery or other templates. `src/main.tsx` is the entry point. Edit `src/App.tsx` for content and `src/styles.css` for the visual system.

## Working interactions

- Switch between oven dishes, small plates, and sweet endings.
- Choose a future date, party size, and service time; enter a name to generate a local reservation preview.
- Navigate directly to menu, story, and booking sections.

State is held in memory and resets on reload. Forms use native validation; no server, payment processor, or external message service is connected. All business names, projects, prices, offerings, and availability are **fictional demonstration content**. Replace these and connect your own services before production use.

## Accessibility and motion

Semantic navigation and forms, visible keyboard focus, accessible button names, pressed/expanded control states, explicit confirmation messages, mobile reflow, and `prefers-reduced-motion` support. Photographs include descriptive alternative text. The intentionally authored motion is disabled for reduced-motion preferences.

## Photography and icons

The following photographs are stored locally under `src/assets` and imported by Vite, so nested deployments do not depend on remote photo URLs. Sources:

- [pizza — original Unsplash image](https://images.unsplash.com/photo-1513104890138-7c749659a591)
- [pasta — original Unsplash image](https://images.unsplash.com/photo-1473093295043-cdd812d0e601)
- [restaurant — original Unsplash image](https://images.unsplash.com/photo-1414235077428-338989a2e8c0)

Photography: [Unsplash license](https://unsplash.com/license). Fonts: [Google Fonts](https://fonts.google.com/), under the respective open font licenses. Icons: [Lucide](https://lucide.dev/), ISC license. Verify the terms for your intended use and replace editorial demonstration photographs before using them to imply a real business, product, or property.

## Validation

Standalone production build verified with `bun run build`. Collection-wide responsive and interaction verification is maintained at the repository level.

## Self-hosted fonts

Fonts are bundled under `src/assets/fonts/`, with their OFL license notices. No external font service is needed at runtime.
