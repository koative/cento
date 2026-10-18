---
name: Tide
colors:
  paper: "#f3f0e7"
  paper-2: "#e8e3d3"
  card: "#fbf9f3"
  ink: "#0e2a31"
  ink-2: "#33494e"
  ink-3: "#50666a"
  sea: "#0f5c63"
  sea-deep: "#0a4248"
  sea-glass: "#6f9f97"
  shallow: "#d7e7e1"
  sand: "#e4d4a9"
  buoy: "#c2461d"
  buoy-deep: "#a2380f"
typography:
  display: "Zilla Slab 400–700"
  body: "Atkinson Hyperlegible 400/700"
  sizes: "body 1.0625rem; h2 clamp(1.8rem → 2.7rem); h1 clamp(2.4rem → 4.6rem), hero to 5.4rem"
rounded: "8px controls, 14–16px images and panels, pills only for filter chips"
spacing: "section padding clamp(4rem → 7rem); gutter clamp(1.25rem → 3rem); max width 1280px"
---

## Overview

Tide is set like a tide table and a survey clipboard: chart paper, deep-water ink, ruled rows and tabular figures. A coastal charity lives by the tide table, so the site does too: every event shows its low-water window, and the signature tide planner draws the day's curve and floods a beach section as you scrub through it. Light, because the site is read on phones on a bright beach and on laptops planning a weekend.

## Colors

Paper `#f3f0e7` with a darker `#e8e3d3` band and `#fbf9f3` panels. Ink `#0e2a31` for text and rules. Sea `#0f5c63` is the action and data colour (primary buttons, links, bars). Shallow `#d7e7e1` tints bands and water fills. Buoy `#c2461d` is reserved for what must not be missed: Donate, the work window, places running low, errors. Seven chart categories are drawn from the same palette.

## Typography

Zilla Slab carries headings, numbers in charts and the big statements; its slab serifs echo printed tide tables and survey forms. Atkinson Hyperlegible, designed for low-vision readers, sets everything else, which suits a charity that wants anyone on the beach. Lining, tabular numerals everywhere figures line up.

## Layout

Ruled ledgers instead of card grids: programmes, events and reports are rows with a 1.5px ink top rule and hairlines between. Pages alternate dense data passages (event tables, five-year table, sortable top-ten) with quiet ones (the statement quote, photo splits). Detail pages pair a large image with a spec list. Breakpoints at 1100, 900, 700 and 480.

## Components

Header with typographic wordmark and swell mark, buoy Donate button, mobile panel menu. Ledger rows, event tide-table rows, atlas list with a lead item, spec lists, steps with meaningful numbers, composition bar, year bars, money rows, sortable data tables, filter chips, labelled selects, form fields with inline errors, segmented frequency control, amount tiles, stepper, sticky booking and gift panels, FAQ disclosures, dark footer with newsletter.

## Motion

Pages arrive like a falling tide uncovering the shore: a short rise with a clip from the bottom. Year bars grow from the baseline. In the planner the sea section's water level eases to its new height; "Run the day" animates a whole day in eight seconds. All motion is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

- Do tie every event to its tide: low water and the work window are content, not decoration.
- Do keep buoy orange rare; if everything is orange, nothing is urgent.
- Do use rules and rows for lists; save panels for the planner, booking and gift summary.
- Don't add stock icons in tiles or stat rows; numbers live in tables and charts with labels.
- Don't present illustrative tide predictions as navigation data; the planner says so.
