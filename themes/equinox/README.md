# Equinox

A night beyond the everyday. An interactive celestial atlas and an evening under the dome.

**[Live demo](https://koative.github.io/elseform/themes/equinox/)** · Planetarium

## Run independently

Copy this folder, then run:

```sh
bun install
bun run dev
bun run build
```

The build uses a relative base and outputs `dist/`. React, TypeScript, Vite and Lucide are the only required runtime/build dependencies. The folder does not import any shared repository components.

## Design

A dark auditorium with a wide celestial planisphere, off-axis serif title and constellation selection. A slow authored chart rotation can be explicitly toggled; visit planning sits in a contrasting ticket sheet.

## Working interactions

Change the constellation; rotate or pause the sky; choose showtime and visitor count to create a local visit plan. The star chart is illustrative, not astronomical navigation.

## Customize

Edit `src/App.tsx` for data and behavior, `src/styles.css` for type, layout, color and motion, and `index.html` for metadata. All state stays in memory and resets on refresh.

## Accessibility and motion

Semantic landmarks, named controls, visible focus, mobile layouts and reduced-motion overrides. Original chart/floorplan geometry is paired with textual controls and outcomes.

## Assets and licenses

DM Sans and Libre Caslon Text are self-hosted in `src/assets/fonts/`, with OFL notices copied alongside them. Original sources are documented in the root font provenance file. Icons: Lucide, ISC license. CSS/SVG geometry is original template work.

No external photography or 3D models are required.

## Demonstration boundaries

The brand, venue, routes, inventory, prices and activities are fictional sample content. No reservation, purchase, payment or message is sent. Connect your own backend and replace illustrative data before real commercial use. Template source is MIT licensed as part of Elseform.
