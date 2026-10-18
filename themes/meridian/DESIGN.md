---
name: Meridian
colors:
  paper: "#f2efe7"
  paper-2: "#e8e3d6"
  card: "#fbfaf6"
  ink: "#1d2b24"
  ink-2: "#4a5850"
  line: "#d3cdbd"
  line-strong: "#7d8378"
  accent: "#a3401f"
  forest: "#23392f"
  ok: "#2f6340"
  error: "#9f2a1b"
  map-land: "#e7e2d2"
  map-park: "#c9d6b7"
  map-water: "#aecbc8"
typography:
  display:
    family: Noto Serif Display
    weights: [300, 400]
    sizes: "h1 clamp(2.4rem → 4.6rem), h2 clamp(1.7rem → 2.6rem), prices 1.55–3rem"
  body:
    family: Albert Sans
    weights: [400, 600, 650, 700]
    sizes: "1.0625rem body, 0.92rem labels, 0.8rem table heads"
rounded: "3px controls and images, 4px panels, 50% avatars and icon buttons"
spacing: "sections clamp(3.5rem → 6rem); gutter clamp(1.1rem → 3rem); max width 1320px"
---

## Overview

Meridian is drawn from the printed world of a local estate agent: the property particulars sheet, the measured floor plan and the hand-drawn city map pinned to the office wall. Survey-paper ground, forest-green ink and a single brick accent keep it calm enough for people comparing homes on a phone in the evening, while the map and floor plans make the business tangible at a glance.

## Colors

Warm paper (`paper`) is the page; `card` lifts forms, the viewing panel and popovers. `ink` carries text and primary buttons, `ink-2` secondary text (6.5:1 on paper). Brick `accent` marks the one action that matters (Book a valuation, Search, Request viewing), active map districts, hot pins and status tags. `forest` is reserved for closing bands and the desk-estimate slip. The map has its own muted land/park/water set.

## Typography

Noto Serif Display, light and high-contrast, sets headlines, prices, guide names and the testimonial in italic, the way an agency sets its window cards. Albert Sans does everything functional: navigation, labels, facts, tables. All figures use tabular lining numerals.

## Layout

A 1320px column with generous gutters. Pages alternate dense passages (the search grid, sold-prices ledger, particulars, room schedule) with quiet ones (the quote, guide introductions). Search is a two-pane list + sticky map; listing pages pair a long reading column with a sticky viewing panel. Below 1000px everything stacks and search gains a list/map toggle.

## Components

- **City map** (authored SVG, 1000×700): districts as dashed survey boundaries that tint and outline in brick when active; river, harbor, park, rail with ties, contours on Kestrel Hill, scale bar and north arrow. Price pins are HTML buttons or links positioned by percentage, with a preview popover.
- **Floor plan**: rooms drawn from feet-based rectangles with labels and dimensions; the room schedule beside it highlights each room on hover or focus.
- **Listing card**: 4:3 photo, status tag, save heart, serif price, address as a stretched link, facts with icons.
- **Particulars**: two-column ruled definition list.
- **Forms**: 48px fields, radio/checkbox chips, inline errors that name the fix, disabled loading state and a green-ruled success panel announced politely.
- **Stepper** for the three-step valuation, with a live estimate slip on forest.

## Motion

Pages rise 12px into place; pins drop onto the map; the map preview unrolls with a clip-path; district fills and the estimate range bar ease with an exponential curve; gallery photos settle from a slight zoom. All of it is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep brick for one action per view and for active map state.
- Do write particulars plainly: the steep stairs as well as the cornices.
- Do keep figures tabular and right-aligned in ruled lists.
- Don't add eyebrow labels, stat rows or icon-card grids.
- Don't introduce a second accent or gradients; the map colours stay muted.
- Don't use the serif below ~1.2rem; small text belongs to Albert Sans.
