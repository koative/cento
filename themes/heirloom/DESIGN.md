---
name: Heirloom
colors:
  velvet: "#171413"
  velvet-2: "#201b19"
  night: "#100e0d"
  line: "#3a312d"
  line-strong: "#5d4f47"
  bone: "#f0e3cf"
  bone-2: "#cdbca6"
  gold: "#c9a46a"
  gold-2: "#e5c891"
  card: "#ece0cb"
  card-ink: "#2a201b"
  error: "#f19a83"
typography:
  display:
    {
      family: "Cinzel",
      weight: "400–600",
      sizes: "h1 clamp(2.4rem, 1.5rem + 3.4vw, 4.75rem); h2 clamp(1.6rem, 1.2rem + 1.5vw, 2.6rem); h3 1.05–1.25rem; labels 0.72–0.82rem at 0.12–0.14em",
    }
  body:
    {
      family: "Cormorant Garamond",
      weight: "500–600, italic",
      size: "clamp(1.1875rem, 1.12rem + 0.25vw, 1.3125rem) / 1.55",
    }
rounded: { control: 2px, swatch: 50%, inscription: 32px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3.5rem)",
    section: "clamp(3.5rem, 7vw, 7rem)",
    max: 1320px,
  }
---

## Overview

Heirloom is a jeweller's velvet tray under a bench lamp. Rings are judged on dark felt in warm, low light, and the people shopping for one usually do it in the evening, slowly, on a sofa or at a consultation table, so the site is dark: brown-black velvet, bone text and one warm gold. Every catalogue piece is drawn rather than photographed, like the gouache renderings jewellers paint before a commission, so a metal or stone change redraws the piece on the spot.

## Colors

Velvet (#171413) is the ground and velvet-2 the raised surfaces (ledgers, asides, trays). Bone (#f0e3cf) carries body text at ~15:1, bone-2 (#cdbca6) secondary text at ~9:1, and gold (#c9a46a) is the single accent for buttons, rules, hallmark marks and focus. The cream card (#ece0cb with #2a201b ink) appears only where a page closes and as the mat around the engravings, like a print in a frame. Metal and gem colours live in the drawing plates, not in the UI.

## Typography

Cinzel, the inscriptional Roman capital, sets headings, labels, buttons and the logo: it is the lettering of hallmarks and engraved shanks. Cormorant Garamond sets the body at 19–21px and weight 500 so it holds on a dark ground; its italic carries captions, hints, prices-as-prose and the engraving previews. Numbers in prices, ledgers and the size chart are tabular lining figures.

## Layout

A 1320px measure with full-bleed bands for the ring-builder teaser and the cream close. The home hero pairs the house solitaire photograph with the statement, followed by a hairline collection index so the catalogue is reachable in the first screen. Detail pages use a sticky drawing tray beside a scrolling column of options; checkout and booking use a form column with a ledger or visit aside. Information is set in hairline lists and definition rows rather than card grids.

## Components

- **Plate:** an SVG drawing generated from each piece's `art` record (kind, gem, cut, carat, band finish) and metal: solitaire, trilogy, halo, plain/knife-edge/milgrain bands, half eternity, signet with engraved initials, studs, drops, pendants and a loose stone from above.
- **Ring builder:** native radio groups for setting, stone, cut, band and metal, a carat slider, size and engraving; the side view, top view and inside-band inscription redraw live with an itemised ledger.
- **Inscription strip:** the inside of the band unrolled in the chosen metal, showing the engraving in italic.
- **Maker's mark:** an elongated hexagon punch with H (logo, favicon) and oval cartouches for each maker.
- Metal and gem swatches, option pills, appointment type cards, slot picker with taken times, quantity stepper, `<details>` FAQ with a CSS plus, size table with live match.

## Motion

Pages arrive like a stone coming into focus under the loupe: a 0.7s blur-to-sharp with an exponential ease-out, from an already-visible state. In the builder a newly chosen stone drops into its claws, and metal changes cross-fade through the gradient stops. Hover lifts the drawing slightly in its tray. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep gold as the only UI accent; let metals and stones speak inside the plates.
- Do give every new piece an `art` record so it can be drawn, priced per metal and shown in the bag.
- Don't use the cream card for anything but closes and print mats.
- Don't add eyebrow labels, icon-card rows, gradient text or glass.
