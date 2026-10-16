# Gavel

Objects with another chapter. A considered auction catalog with an interactive local bidding rhythm.

**[Live demo](https://koative.github.io/elseform/themes/gavel/)** · Auctions

## Run independently

Copy this folder, then run:

```sh
bun install
bun run dev
bun run build
```

The build uses a relative base and outputs `dist/`. React, TypeScript, Vite and Lucide are the only required runtime/build dependencies. The folder does not import any shared repository components.

## Design

An auction folio in persimmon and old paper. Three lots occupy one expansive photographic plate with a stamped lot number; the bid ledger sits beside it. Changing lots changes both content and local state.

## Working interactions

Switch lots, keep a local watchlist, increment a bid, submit a valid demo offer and expand condition notes. Bids affect only the selected lot and are not sent to a server.

## Customize

Edit `src/App.tsx` for data and behavior, `src/styles.css` for type, layout, color and motion, and `index.html` for metadata. All state stays in memory and resets on refresh.

## Accessibility and motion

Semantic landmarks, named controls, visible focus, mobile layouts and reduced-motion overrides. Original chart/floorplan geometry is paired with textual controls and outcomes.

## Assets and licenses

DM Sans and Libre Caslon Text are self-hosted in `src/assets/fonts/`, with OFL notices copied alongside them. Original sources are documented in the root font provenance file. Icons: Lucide, ISC license. CSS/SVG geometry is original template work.

- camera.jpg: https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=85&fit=crop
- ceramics.jpg: https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&q=85&fit=crop
- landscape.jpg: https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85

Photography is locally included and subject to the [Unsplash license](https://unsplash.com/license). It illustrates fictional content and does not identify real items for sale.

## Demonstration boundaries

The brand, venue, routes, inventory, prices and activities are fictional sample content. No reservation, purchase, payment or message is sent. Connect your own backend and replace illustrative data before real commercial use. Template source is MIT licensed as part of Elseform.
