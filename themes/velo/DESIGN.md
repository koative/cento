---
name: Velo
colors:
  paper: "#f2f0e7"
  paper-2: "#e9e6d9"
  sheet: "#e2e5dc"
  ink: "#1f2421"
  ink-2: "#3f4640"
  muted: "#59605a"
  rule: "#cdc9b9"
  red: "#d42d22"
  red-ink: "#b3241b"
  graphite: "#232825"
  on-dark: "#eeebe0"
typography:
  display:
    {
      family: "Saira Condensed",
      weights: [600, 700, 800],
      transform: uppercase,
      sizes: "h1 clamp(2.75rem, 6.4vw, 5.75rem) / h2 clamp(2rem, 3.8vw, 3.25rem) / h3 1.25–1.5rem",
    }
  body:
    { family: "Saira", weight: 400, size: "1rem / 1.62", lead: "1.075–1.25rem" }
rounded: { control: 4px, pill: 2rem }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 3rem)",
    section: "clamp(4rem, 9vw, 7.5rem)",
    wrap: 1360px,
  }
---

## Overview

A frame builder's back room behind a working bike shop. Bone paper, graphite ink and the racing red of the old Velo strip, with the frame-builder's full-size drawing as the signature object: every custom frame is drawn to scale in millimetres, the way a builder sends it to a customer to argue with. Light, because people browse it on a phone at the shop counter or at the café stop, in daylight.

## Colors

Bone `paper` is the page; `paper-2` lifts summaries and empty states; the cooler `sheet` is reserved for drawings and confirmation tickets. `ink` carries text and rules, `graphite` the dark bands (rides teaser, close, footer, build summary). `red` is for actions, the band and drawing dimensions; `red-ink` is the AA-safe red for small text. A green dot means the shop is open now.

## Typography

Saira Condensed, uppercase and heavy, reads like frame decals and race numbers; it sets headings, buttons, legends, prices and table heads. Saira sets body copy at 1rem with a 62–70ch measure. All prices, geometry and times use tabular lining numerals.

## Layout

A 1360px wrap with fluid gutters. Thick 2px ink rules open lists, tables and steps instead of card boxes. Asymmetric 7/5 splits (hero, teaser, product, builder) collapse to one column below 900px; the builder's drawing becomes a compact sticky strip below 1024px.

## Components

Frame drawing (authored SVG computed from stack, reach, angles, chainstay, BB drop, fork offset and tyre width; mudguards, rack and deep rims as add-ons; dimension lines). Bike card with photo, rule, price and finish dots. Swatch and size radios built on native inputs. Choice rows for options. Dotted-leader price lists. Workshop calendar strip with slots left. Elevation profiles. Ticket-style confirmations. Accessible `<details>` FAQ.

## Motion

One authored moment: the frame tubes draw themselves in (stroke-dashoffset) whenever the platform or size changes, while paint colour cross-fades. Pages enter with a short rise; the mobile menu wipes down with clip-path. Everything is visible without motion and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep red for action and measurement; never as a decorative fill on text blocks.
- Do draw products from real geometry numbers; label illustrative values.
- Do use rules and whitespace for structure; don't box sections into cards.
- Don't add eyebrows above headings or system fonts as the display voice.
- Don't use photos that show third-party brand marks prominently.
