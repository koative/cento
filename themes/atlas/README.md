# Atlas

A city within reach. A route-finding workspace built around a clear, moving transit map.

**[Live demo](https://koative.github.io/elseform/themes/atlas/)** · Public transport

## Run independently

Copy this folder, then run:

```sh
bun install
bun run dev
bun run build
```

The build uses a relative base and outputs `dist/`. React, TypeScript, Vite and Lucide are the only required runtime/build dependencies. The folder does not import any shared repository components.

## Design

A civic yellow journey rail beside a schematic network. Two actual lines intersect at a transfer; dash motion carries the computed route. The phone stacks the planner above the map, preserving readable stop names.

## Working interactions

Choose endpoints and calculate the connected route; swap stops; handle identical endpoints; opt into the step-free label; browse a sample departure board.

## Customize

Edit `src/App.tsx` for data and behavior, `src/styles.css` for type, layout, color and motion, and `index.html` for metadata. All state stays in memory and resets on refresh.

## Accessibility and motion

Semantic landmarks, named controls, visible focus, mobile layouts and reduced-motion overrides. Original chart/floorplan geometry is paired with textual controls and outcomes.

## Assets and licenses

DM Sans and Manrope are self-hosted in `src/assets/fonts/`, with OFL notices copied alongside them. Original sources are documented in the root font provenance file. Icons: Lucide, ISC license. CSS/SVG geometry is original template work.

No external photography or 3D models are required.

## Demonstration boundaries

The brand, venue, routes, inventory, prices and activities are fictional sample content. No reservation, purchase, payment or message is sent. Connect your own backend and replace illustrative data before real commercial use. Template source is MIT licensed as part of Elseform.
