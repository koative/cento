---
name: Enamel
colors:
  paper: "#f5f3ee"
  paper-2: "#ebe7de"
  surface: "#fdfcf9"
  ink: "#14262b"
  ink-2: "#475559"
  rule: "#d9d3c7"
  chart: "#1f45b5"
  chart-wash: "#dfe5f5"
  mark: "#c23a28"
  gum: "#f2e0d9"
  gum-2: "#e6c4b8"
  alert: "#7f2418"
typography:
  display:
    {
      family: "Albert Sans",
      weight: 620,
      size: "clamp(2.5rem, 1.6rem + 3.4vw, 4.75rem)",
      tracking: "-0.032em",
    }
  body:
    { family: "Albert Sans", weight: 400, size: "1.0625rem", lineHeight: 1.6 }
rounded: { card: "14px", field: "10px", control: "999px" }
spacing:
  {
    section: "clamp(4rem, 3rem + 4vw, 7rem)",
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    wrap: "1240px",
  }
---

## Overview

Enamel borrows from the two printed objects every dental patient knows: the dental chart and the appointment card. Charting conventions set the colour logic — blue ink for planned or cosmetic work, red for what needs attention — on a porcelain paper ground, with gum pink as the one warm surface. Patients mostly arrive on a phone in daylight, often anxious, so the page is light, calm and literal: prices in plain sight, no mood shots.

## Colors

Paper `#f5f3ee` and surface `#fdfcf9` carry the page; ink `#14262b` for text, ink-2 for secondary copy (6.9:1 on paper). Chart blue `#1f45b5` is the single action colour (buttons, links, prices, focus ring, selection). Mark red `#c23a28` only appears where something needs attention: marked teeth, errors, the map pin. Gum `#f2e0d9` bands hold the tooth chart, the plan and the principles; the footer and plan teaser sit on ink.

## Typography

Albert Sans throughout, variable 300–800. Headings at 620 weight with −0.025 to −0.032em tracking; prices at 650 with tabular numerals; tooth numbers and the timeline at small bold sizes. Body 17px, measure capped near 62ch.

## Layout

A 1240px wrap with hairline-ruled lists instead of card grids: the treatment index, team rows, price tables, hours and policies all read like a printed chart. Cards are reserved for objects that are cards in real life (appointment card, price card, plan card) and for the dentist collection. Breakpoints at 1100, 960 (mobile menu), 900 (single column) and 640.

## Components

- Tooth chart: FDI-numbered upper and lower arches placed by arc length on an ellipse, each tooth a 40px+ button; concern "pens" mark teeth red or blue; a live panel totals suggested treatments and a price range and deep-links to booking with the teeth in the notes.
- Tooth cross-section: authored SVG molar whose treated layer (enamel, crown, pulp, root, gum, bite) is inked per treatment.
- Appointment card: blue header strip, dashed write-in lines; previews live in the booking aside and becomes the confirmation.
- Booking: four fieldsets, day grid with free counts, time pills, native + custom validation with inline fixes.
- Price tables with a member toggle; plan card with monthly/yearly toggle; FAQ as native details.
- Authored street map; live open/closed status from hours.

## Motion

One page-enter fade-rise (520ms expo-out). Marked teeth ink in with a short scale; the confirmed appointment card is handed over with a rise and tilt. Hover moves are small (row inset, arrow nudge). `prefers-reduced-motion: reduce` removes all animation and transition.

## Do's and Don'ts

- Do show a price next to every treatment mention, with tabular numerals.
- Do keep red for attention only; everything actionable is chart blue.
- Don't add eyebrow labels, icon-card rows or decorative gradients.
- Don't use stock smiles; photography stays on rooms, instruments and x-rays.
