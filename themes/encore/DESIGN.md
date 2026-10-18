---
name: Encore
colors:
  paper: "#f3ead8"
  paper-2: "#e9dcc3"
  card: "#fbf6ec"
  ink: "#1f1517"
  ink-2: "#57443f"
  rule: "#b9a68f"
  red: "#a51d2d"
  red-deep: "#7c1220"
  gilt: "#c99a48"
  house: "#1a1012"
  house-2: "#2a1a1e"
  house-mute: "#cdbba6"
  seat-premium: "#d6a64f"
  seat-standard: "#cf7a68"
  seat-value: "#b3a48c"
  seat-wheelchair: "#8fb0d6"
typography:
  display:
    family: Abril Fatface
    sizes: "clamp(2.6rem, 1.5rem + 4.6vw, 6rem) display; clamp(1.85rem, 1.3rem + 2.2vw, 3.1rem) h2; clamp(1.35rem, 1.15rem + 0.8vw, 1.85rem) h3"
  body:
    family: Karla
    sizes: "clamp(1rem, 0.96rem + 0.2vw, 1.0875rem) body; 0.8rem uppercase data lines at 0.12em tracking"
rounded:
  card: 14px
  input: 6px
  control: 999px
spacing:
  gutter: "clamp(1.1rem, 0.6rem + 2.4vw, 2.75rem)"
  section: "clamp(3.75rem, 2.5rem + 5vw, 7.5rem)"
  wrap: 1240px
---

## Overview

A nineteenth-century playbill brought online: fat Didone titles stacked over cream paper, double rules between billings, and crimson used the way theatres use it — on the curtain and the ticket. Browsing happens with the house lights up (paper); choosing seats happens with them down (the booking page fades to the dark auditorium), because that is where the decision is really made.

## Colors

Cream paper and near-black ink carry everything. Theatre red is the only action colour (primary buttons, current step, ticket stubs). Gilt appears only on dark surfaces: the stage edge, the proscenium in the seat-view drawing, focus rings and footer headings. Seat colours encode price zones and stay inside the same warm family; wheelchair spaces are the single cool hue so they are findable at a glance.

## Typography

Abril Fatface for every title, production name, date numeral on tickets and the large total — the playbill voice. Karla for reading, controls and tabular data, with tabular lining numerals for prices and times. Small uppercase tracked lines are reserved for dates and data (run dates, table headers), never placed as labels above headings.

## Layout

Playbill rows (image, billing, side column with dates, tags, price and a seat button) separated by hairlines and closed by double rules. Pages alternate paper, deeper paper tint and dark house bands so density varies: dense playbill and tables, then a quiet spotlight. The home hero frames the current production in a proscenium arch.

## Components

Header with typographic wordmark and arch mark, sticky with a double-rule underline; mobile menu as a full-width paper sheet. Production row, facts strip, credits definition lists, performance list with availability dots, segmented control and filter chips, disclosure FAQs, the keyboard-operable seat map, the SightLine SVG, the basket, three-step stepper, form fields with inline errors, ticket stubs, membership tier columns and comparison table, footer with newsletter.

## Motion

The curtain opens once over the hero arch on first load (two drapes slide apart). Pages rise slightly on route change. Choosing seats dims the house (background fades to dark over 0.9s); taking a seat pops it, and the view-from-seat drawing re-frames on every hover or focus. Confirmation tickets slide up in sequence. All of it collapses under `prefers-reduced-motion`, and the drapes are not drawn at all.

## Do's and Don'ts

- Do keep red for actions and tickets only; never for decoration.
- Do keep gilt to dark surfaces; it fails contrast on paper.
- Do describe access performances wherever dates are listed.
- Don't put labels above headings; dates go below the title or in the side column.
- Don't add new seat colours without adding them to the legend.
- Don't replace the SightLine drawing with a photo per seat; it is meant to be illustrative and honest about it.
