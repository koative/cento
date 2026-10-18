---
name: Flux
colors:
  paper: "#f5f3ee"
  paper-2: "#ece8df"
  card: "#fffdf9"
  ink: "#1d1a26"
  ink-2: "#534d60"
  line: "#ddd7cc"
  line-strong: "#b4ac9f"
  plum: "#5b3fa8"
  plum-deep: "#45308a"
  plum-soft: "#ebe5f7"
  signal: "#f2b544"
  go: "#1c7146"
  halt: "#8f5208"
  fail: "#b42318"
typography:
  display:
    family: Wix Madefor Display
    weights: [500, 600, 700, 800]
    sizes:
      {
        h1: "clamp(2.5rem, 1.5rem + 3.8vw, 4.75rem)",
        h2: "clamp(1.75rem, 1.3rem + 1.6vw, 2.75rem)",
        h3: "1.25rem",
      }
    tracking: "-0.025em to -0.035em"
  body:
    family: Wix Madefor Text
    size: "1.0625rem / 1.6"
rounded:
  control: 10px
  card: 14px
  panel: 20px
  close: 24px
spacing:
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  band: "clamp(3.5rem, 7vw, 6.5rem)"
  max-width: 1240px
---

## Overview

Flux is drawn from the thing ops people actually stare at: a run of steps joined by a wire on a dotted canvas, with a record moving through it. Light warm paper because it is a daytime office tool used at a desk next to spreadsheets and chat; plum ink carried over from the previous Flux, and one amber "signal" colour reserved for the record in motion. The whole site shows the product working rather than describing it.

## Colors

Paper and card are warm off-whites; ink is a plum-black used for text, the footer, the guardrails band and the app sidebar. Plum is the only accent (actions, active wires, links). Amber `signal` appears only as the travelling pulse, the logo's second node and the footer button. Run states use go/halt/fail with their soft tints, never as decoration.

## Typography

Wix Madefor Display for headings, prices, figures and the logo wordmark, set tight (−0.025 to −0.035em). Wix Madefor Text for body and UI at 17px. Tabular numerals on all figures, times and table data. Monospace only for run IDs.

## Layout

12-ish column feel without a grid system: split heads (heading left, context right), alternating text-and-figure rows on Product, editorial rows for pillars and stories, a full-width ink band for guardrails and a plum close panel that ends each long page. The app uses a 252px ink sidebar that becomes a top bar under 960px.

## Components

- **FlowCanvas** — the signature: nodes (connector mark, kind · app, title, state badge) joined by wires that turn plum when done, amber-brown when stopped, dashed when skipped.
- **LiveFlow** — FlowCanvas plus a sample slider, Run test button and an `aria-live` result line (Home hero, template pages).
- **Connector marks** — authored 40px SVG tiles: colour per app plus one geometric glyph.
- Template tiles with compact step lists, chips with `aria-pressed`, sortable data tables, role switches, `details` FAQ, validated forms with inline errors.

## Motion

One authored moment: during a test run a pulse travels down the wire into the step being run (520ms per step, expo-out), and nodes settle into their state. Pages fade up 10px on route change. `prefers-reduced-motion` removes all animation and test runs resolve instantly.

## Do's and Don'ts

- Do show a real workflow wherever a feature is explained.
- Do keep the amber signal for things in motion only.
- Don't add icon-tile feature grids, stat rows or gradient decoration.
- Don't put labels above headings; metadata goes below the heading.
- Don't use real app names or logos for connectors.
