---
name: Whisker
colors:
  paper: "#f4efe3"
  card: "#fbf8f1"
  white: "#fffdf8"
  ink: "#1d2a27"
  ink-2: "#4a5955"
  rule: "#d9cdb6"
  rule-blue: "#c2d3df"
  green: "#1d5e4f"
  sage: "#dfe7dc"
  stamp: "#c43c26"
  stamp-deep: "#9c2e1c"
  sticker: "#f1c84b"
  ballpoint: "#27467a"
typography:
  display:
    {
      family: Gabarito,
      weights: "650–800",
      h1: "clamp(2.5rem, 5.4vw, 4.75rem)",
      h2: "clamp(1.75rem, 3.2vw, 2.6rem)",
      tracking: "-0.02 to -0.03em",
    }
  body: { family: Nunito Sans, size: 1.0625rem, line-height: 1.6 }
rounded: { card: 14px, record: 8px, control: 10–12px, chip: 99px }
spacing:
  {
    section: "clamp(4rem, 9vw, 7.5rem)",
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    wrap: 1240px,
  }
---

## Overview

Whisker is built from the front-desk paperwork of a neighbourhood vet: the index-card health record with blue rules and a red header line, a round rubber stamp, details filled in with a ballpoint pen, and the polaroids of staff pets pinned behind the desk. People use the site on a phone, often anxious, sometimes late at night, so the page is light and calm, and the emergency number sits in a dark bar above every page.

## Colors

Warm card-stock paper and deep green-black ink carry everything. Scrub green is the one action colour (buttons, links, focus). Stamp vermilion is kept for the stamp and for urgency: the emergency band, emergency page and error messages. Sticker yellow marks "due soon" and highlights today in the hours. Ballpoint blue is only used for values written onto record cards.

## Typography

Gabarito (rounded geometric, heavy) for headings, prices, dates and controls; Nunito Sans for reading text. Headings are balanced with tight tracking; prices and tables use tabular numerals.

## Layout

A 1240px column with asymmetric two-column splits (heading left, context right). The services list is a ruled fee board, not cards. Sections alternate density: the dense fee board is followed by a quiet sage band, the planner by the polaroid wall, then a full-bleed vermilion emergency band.

## Components

- **Record card**: white index card with a double red header rule, blue row lines and ballpoint values. Used by the care planner and the booking page's live appointment card.
- **Stamp**: SVG rubber stamp with ring text; marks doses as given, the hero visit note as seen, and a booking as booked.
- **Polaroid**: each clinician is introduced by a photo of their own pet, slightly tilted, straightening on hover.
- **Fee board**: ruled rows with name, summary, species icons and the starting price.
- Segmented radios, day and time pickers built on native radio inputs; FAQ on native `<details>`.

## Motion

Pages rise in with a short exponential ease. The signature moment is the stamp press: a stamp drops in from 160% scale and settles with a small overshoot when a dose is marked as given or a booking is confirmed. Polaroids straighten on hover. With `prefers-reduced-motion`, all animation and transitions are turned off.

## Do's and Don'ts

- Do keep vermilion for urgency and stamps; never use it for decoration.
- Do write card values in ballpoint blue, never body text.
- Do keep the emergency number one tap away on every page.
- Don't add eyebrow labels, icon-card grids or gradient effects.
- Don't put the stamp on anything that isn't a record of something done.
