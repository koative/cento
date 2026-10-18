---
name: Bloom
colors:
  paper: "#f8f3ee"
  tissue: "#f2e7ea"
  lilac: "#e7def0"
  ink: "#23322a"
  ink-2: "#4e5c54"
  accent: "#a8325e"
  accent-deep: "#85244a"
  leaf: "#4f6e4c"
  line: "#e3d7d4"
typography:
  display: "Gilda Display, 400, h1 clamp(2.6rem → 5.4rem), h2 clamp(1.9rem → 3.2rem), h3 1.45rem"
  body: "Lato 400/700, 1.0625rem / 1.65"
rounded:
  card: 14px
  control: 999px
  arch: "999px 999px 14px 14px"
spacing:
  section: "clamp(3.5rem, 7vw, 6.5rem)"
  gutter: "max(clamp(1.25rem, 4vw, 3.5rem), (100% - 1320px) / 2)"
---

## Overview

Bloom is the wrapping counter of a narrow florist's studio: blush tissue, kraft, cotton ties and the little tags hung on bucket flowers. The page is light because people order flowers on a phone in daylight, often in a hurry before the 1 pm cut-off, so the shop and the countdown are in the first screen.

## Colors

Warm petal-white paper with a blush tissue surface and a lilac finale, carried over from the original Bloom. Ink is a deep stem green rather than black. The single accent is the raspberry of the double tulips in the hero photo; sage green marks success and the progress of the builder. The weddings band and footer flip to the stem-green ink for contrast.

## Typography

Gilda Display, one weight, for headings, prices and stem names; its high-contrast serif reads like a florist's card. Lato for body, labels and data. Table and price numerals are tabular. No eyebrow labels; headings stand alone.

## Layout

Full-bleed sections with content held to 1320px by a gutter in padding. Portrait photos in the hero, the quiet statement and the enquiry use an arched top, like a glasshouse window; everything else uses 14px corners. Dense passages (the stem table, the shop grid) alternate with quiet ones (the iris statement, the close).

## Components

- Stem tag: the price label with a clipped point and punched hole.
- Product card: 4:5 photo, name as stretched link, short line, stem tag.
- Option cards: radio labels that turn raspberry-washed when chosen (sizes, vases, wraps, delivery windows, plans).
- Spiral bouquet: authored SVG, stems placed on a golden-angle spiral, eight flower glyphs, wrap petals behind.
- Grower map: concentric distance rings with growers plotted by miles.
- FAQ: native details with a drawn plus that turns into a cross.

## Motion

Each page unfurls once (fade, 12px rise, slight blur). In the builder each new stem blooms in with a scale-and-turn while the rest of the spiral glides to its new place. Product photos drift slowly on hover. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep one raspberry accent; let photos bring the other colours.
- Do keep the cut-off message wherever the decision to order is made.
- Don't add icon-card rows; use lists, tables and photos.
- Don't use the arch on landscape images.
