---
name: Pipeline
colors:
  paper: "#f6f4ee"
  paper-2: "#ece8dd"
  sheet: "#fffefa"
  ink: "#161a33"
  ink-2: "#454a66"
  ink-3: "#5f637a"
  rule: "#dcd7c9"
  ruling: "#d3dbf0"
  margin: "#d9574a"
  ballpoint: "#2638b8"
  canary: "#f2d65c"
  canary-soft: "#faf0c4"
  won: "#1d6b45"
  lost: "#b23a2c"
typography:
  display:
    {
      family: Figtree,
      weight: 800,
      size: "clamp(2.5rem, 1.5rem + 4vw, 5rem)",
      tracking: "-0.035em",
    }
  h2:
    {
      family: Figtree,
      weight: 800,
      size: "clamp(1.7rem, 1.3rem + 1.5vw, 2.6rem)",
    }
  body: { family: Figtree, weight: 400, size: "1rem", lineHeight: 1.6 }
  numerals: tabular
rounded: { sheet: 12px, card: 10px, control: 8px, stamp: 4px }
spacing:
  {
    section: "clamp(3.5rem, 7vw, 6.5rem)",
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    wrap: 1240px,
  }
---

## Overview

The world is the sales team's order book and the Thursday forecast call. Off-white pad paper, carbon-navy ink, ballpoint blue for everything you can act on, the canary yellow of a duplicate sheet for best case, a red margin rule, and rubber stamps for closed deals. It is light because CRMs are read all day at a desk in office daylight, and because a forecast is a sheet of paper people argue over.

## Colors

Paper and sheet are the two surfaces: pages sit on paper, working documents (forecast, forms, charts, tables) on a lifted sheet. Ballpoint is the only action color (links, primary buttons, focus, commit). Canary marks best case, highlights text selection and backs the setup band. The red margin rule is reserved for quota markers and target lines. Won green and lost red appear only as stamps, status chips and won columns.

## Typography

Figtree for everything: 800 for display and figures, 700 for headings and labels, 400 for reading text. Figures are always tabular. Display tracking −0.035em, never tighter; body measure held to ~65ch.

## Layout

A 1240px wrap with editorial splits (copy 5 : visual 7) alternating sides, ruled lists instead of card grids (stories, specs, stages, steps, releases), one ink band for the quote and principles, one canary band for setup. The /app demo swaps the site header for a paper sidebar that becomes a top bar under 900px.

## Components

- Forecast call (signature): a ledger sheet with a blue ruling and red margin; each open deal has a Commit / Best case / Omit radio group; a stacked bar shows won, commit and best case against a quota marker, with the stage-weighted total as a dashed check and a sentence that names the gap.
- Deals board: seven stage columns with count, total and weighted total; cards drag between columns or move with arrow keys and chevron buttons; closed deals get WON / LOST stamps.
- Contacts table with status filter, search and sortable headers (aria-sort); contact page with stage selects, timeline and a log-a-touch form.
- SVG charts: won by month with target rules, horizontal stage bars, attainment table.
- Segmented radio controls, stamped status chips, validated forms with inline errors.

## Motion

One moment: when a deal lands in a column the WON / LOST stamp hits the card (scale from 2.4× with a slight rotation, exponential ease-out); the demo booking confirmation and the 404 use the same stamp. Forecast bars, markers and chart bars glide to new values. Everything is visible by default; `prefers-reduced-motion` removes animation and transitions.

## Do's and Don'ts

- Do keep numbers tabular and right-aligned in tables.
- Do keep ballpoint blue for action and commit only; don't use it decoratively.
- Do use ruled lists before cards; cards are for deals, plans and stories only.
- Don't add gradient text, glows, eyebrow labels or stat rows.
- Don't use canary for text; it is a fill (pair with ink text).
