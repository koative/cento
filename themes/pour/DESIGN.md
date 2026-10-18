---
name: Pour
colors:
  paper: "#f3e6d1"
  paper-2: "#ead8bc"
  tag: "#f8efdf"
  ink: "#34151f"
  muted: "#69434f"
  plum: "#662b42"
  blush: "#da977c"
  rule: "#cdb197"
  leaf: "#3f5a44"
  pine: "#b4875c"
  night: "#2a1219"
  night-ink: "#f3e6d1"
typography:
  display:
    fontFamily: "Ibarra Real Nova"
    fontWeight: 500
    sizes: "h1 clamp(2.75rem, 1.4rem + 5.2vw, 5.75rem) / h2 clamp(2rem, 1.35rem + 2.4vw, 3.25rem) / h3 1.4rem"
    letterSpacing: "-0.03em to -0.01em"
  body:
    fontFamily: "Figtree"
    fontSize: "1.0625rem"
    lineHeight: 1.6
rounded:
  card: 14px
  control: 8px
  pill: 99px
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(3rem, 7vw, 6rem)"
  max: 1240px
---

## Overview

Pour is drawn from the two lives of a natural wine shop: the bottle list on butcher paper by day and the chalkboard by night. Daytime pages sit on warm kraft paper with plum ink; the bar, the "open tonight" note, the club call-to-action and the footer switch to the dark night surface. Products are authored SVG bottles with hand-chosen label colours and motifs, standing on a pine shelf with hanging price tags, because natural wine is bought by its label art and its producer, not by stock photography.

## Colors

Paper `#f3e6d1` and ink `#34151f` carry everything; plum `#662b42` is the single action colour (buttons, links, focus, selection, caret). Blush `#da977c` is reserved for accents on the night surface. Each wine colour has a swatch (white, orange, rosé, red, sparkling) used only for small dots, chips and the palate map. Secondary text is `#69434f`, AA on paper.

## Typography

Ibarra Real Nova (a transitional book face with a lively italic) sets headings, wine names, prices on tags and the logo in italic lowercase. Figtree sets body, labels and controls. Numerals are tabular wherever prices line up.

## Layout

12-ish column freedom inside a 1240px frame. Home alternates dense passages (the shelf, the finder, the event list) with quiet ones (the manifesto line, the close). Listings use a sticky filter rail; detail pages use a sticky bottle stage. Below 960px everything stacks; below 640px the shelf shows four bottles and lists collapse to two columns.

## Components

Bottle (SVG silhouettes: burgundy, bordeaux, sparkling with crown cap, litre), WineCard (bottle on a pine ledge + tag), TasteFinder (palate map, mood presets, colour chips, price range, ranked matches), price tags, event date blocks, chalkboard menu rows with dotted leaders, club tiers with bottle counts, case meter (six slots), Field with inline errors, Qty stepper, FAQ disclosures.

## Motion

One language: things are placed, not faded. Bottles drop onto the shelf with a slight tilt, tilt when picked up (hover/focus), the glass marker glides across the palate map, the cart count bumps. Page content settles 10px on route change. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep wine data in `content.ts`, including each bottle's shape, glass, label, ink, cap and motif.
- Do keep the night surface for the bar and evening moments only.
- Don't add stock bottle photos for products; the authored bottles are the catalogue.
- Don't use the blush accent for body text on paper (it fails contrast).
- Don't add eyebrow labels above headings or decorative stat rows.
