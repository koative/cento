---
name: Patina
colors:
  paper: "#f1ebe0"
  paper-2: "#e8e0d1"
  field: "#fbf8f2"
  ink: "#2a211b"
  ink-2: "#5a4c40"
  line: "#cdbfa9"
  control: "#8a7a66"
  verdigris: "#2f6b5e"
  verdigris-deep: "#23524a"
  verdigris-pale: "#dbe7e0"
  rust: "#a3462c"
  manila: "#e3cf9f"
typography:
  display:
    fontFamily: "Sorts Mill Goudy"
    sizes: "h1 clamp(2.6rem → 5.25rem), h2 clamp(2rem → 3.25rem), h3 clamp(1.3rem → 1.6rem)"
    tracking: "-0.025em to -0.015em"
  body:
    fontFamily: "Work Sans"
    fontSize: "1.0625rem"
    lineHeight: 1.6
    numerals: "tabular"
rounded: "3px (controls, images); 999px only for filter chips"
spacing: "section rhythm clamp(4rem → 7.5rem); gutter clamp(1rem → 3rem); max width 1320px"
---

# Patina

## Overview

A dealer's stock book on aged paper. Every piece wears the manila tag it has on the warehouse floor — stock number, price, condition grade — hung from a string and swinging when you reach for it. The accent is verdigris, the green that copper earns with age, which is literally what the shop is named for. Light theme: people browse with a tape measure in hand, at home, in daylight.

## Colors

Paper and paper-2 are the page and its quieter panels; walnut ink carries text and rules. Verdigris is the only action colour (buttons, selection, focus, chosen options, a fit that works). Rust marks what does not work: sold pieces, errors, a piece too big for the door. Manila exists only on stock tags. The footer and restoration band invert to ink with paper text.

## Typography

Sorts Mill Goudy for headings, prices on tags, totals and the italic captions — an old-style book face that suits a catalogue of old things. Work Sans for body, labels and every measurement, with tabular numerals throughout so dimensions and prices line up in ledgers.

## Layout

Editorial two-column splits (copy against a photograph) alternate with dense ledgers: dotted-rule price lists, specs tables, room inventories. The home page runs hero → arrivals → browse-by-kind index → a staged room → the fit check → restoration band → sell steps → condition grades → a customer note → visiting hours. Mobile collapses every split to one column, shows cards two-up, and puts the warehouse photograph first.

## Components

- **Stock tag** — clipped manila tag with a masked string hole; small on cards and the hero, large on the piece page.
- **Piece card** — 4:5 photograph, hanging tag, name, date and origin, W·D·H in inches.
- **Fit check (signature)** — doorway and wall inputs drive a to-scale SVG: the piece's cross-section passes through the door in the first orientation that clears it (or in parts, for pieces that come apart), and its front elevation stands against the wall.
- **Finish options** — radio cards with price deltas and lead-time notes; quantity stepper only for sets sold singly.
- **Ledger** — dotted-rule rows with right-aligned prices, used for room sets, restoration services and order summaries.
- Forms use native validation with messages that name the fix, a sending state, and a success panel.

## Motion

Tags swing like a pendulum on hover and settle into place on load; the fit drawing eases between orientations and sizes; pages rise in once. Everything is visible without animation and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do list every mark and dimension; the copy is the dealer talking.
- Do keep verdigris for actions and good news, rust for problems.
- Don't add new accent colours, card shadows or eyebrow labels.
- Don't show a price without its stock number and grade.
