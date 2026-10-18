---
name: Kettle
colors:
  paper: "#f3ead8"
  paper-2: "#eadcc1"
  paper-3: "#fbf6ec"
  ink: "#241710"
  ink-2: "#5a4636"
  copper: "#a8461c"
  copper-deep: "#86340f"
  copper-bright: "#e0874f"
  hop: "#4a6626"
  error: "#a3221a"
  board: "#1f1611"
  chalk: "#f1e6d0"
  chalk-2: "#cbbba2"
  wood: "#6e4329"
typography:
  display:
    {
      family: "Ultra",
      weight: 400,
      sizes: "h1 clamp(2.4rem → 4.6rem), hero clamp(2.5rem → 4.75rem), close clamp(2.6rem → 6rem)",
    }
  body:
    {
      family: "Work Sans",
      weight: "400–700",
      size: "1.0625rem / 1.6",
      small: "0.875rem",
    }
rounded: { sm: 6px, card: 12px }
spacing:
  {
    1: 0.5rem,
    2: 1rem,
    3: 1.5rem,
    4: 2.5rem,
    5: "clamp(3rem, 2rem + 4vw, 6rem)",
    wrap: 1240px,
  }
---

## Overview

Kettle is a taproom on a working brewhouse floor: grain-sack paper, porter-brown ink, polished copper and the dark tap board behind the bar. Ultra's slab wedges read like painted brewery signage and keg stencils, while the beer itself is drawn, not photographed: every glass is filled with its real SRM colour. Light by default because people read it in daylight on their phone deciding whether to come over; the tap list sits on a dark board the way it does in the room.

## Colors

Paper (`#f3ead8`) and ink (`#241710`) carry the page. Copper (`#a8461c`) is the single action colour (primary buttons, links, selection, caret, focus ring); copper-bright takes over on the dark board. The board (`#1f1611`) with chalk text frames the tap list, timeline, footer and closing call. Hop green marks positive states (on tap, success). Beer colours come from the SRM scale in `lib/util.ts`, never from the palette.

## Typography

Ultra for h1/h2, beer and product names, prices and big dates only: always weight 400, tight leading, never tracked below −0.02em. Work Sans for everything else, 650–700 for labels and spec values, tabular numerals for ABV/IBU/prices/times. Body measure capped near 65ch.

## Layout

Content sits in a 1240px wrap; pages open with a split head (title + lede beside one photograph) and alternate paper, paper-2 bands and the dark board for rhythm. The beers list is a shelf: glasses stand on a wood rail, five across on desktop, two on phones. Detail pages lead with the glass or product art beside a spec strip.

## Components

Tap board table (tap number, swatch, beer, style, ABV, IBU, pour), flight builder (paddle with four glass slots and a 1–11 tap picker), beer tiles on a shelf, SVG cans/bottles/glassware for products, event rows with a dark date block, chip filters, select sort, booking form with date/time chips showing places left, sticky order summary, pickup cart lines with steppers, a native `<dialog>` age gate, hours table that highlights today.

## Motion

Pages rise in 14px on enter. The signature motion is the pour: glasses on the flight paddle fill from the bottom and a foam cap settles on top. Tiles tilt slightly on hover, the cart badge bumps when an item is added, grain-bill bars grow in on the beer page, the mobile menu drops in and the age gate lifts into place. `prefers-reduced-motion: reduce` removes all animation and transition.

## Do's and Don'ts

- Do draw beer in its SRM colour; do keep copper for actions.
- Do keep the tap board dark and the reading pages light.
- Don't add eyebrow labels, gradient text, glass blur or icon-card grids.
- Don't use photographs of competitors' branding; crop third-party marks.
- Don't track Ultra tighter than −0.02em or set it above 6rem.
