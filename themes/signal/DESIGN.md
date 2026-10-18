---
name: Signal
colors:
  paper: "#f4f5f1"
  surface: "#ffffff"
  sunk: "#eaece6"
  ink: "#111513"
  ink-2: "#474f4a"
  ink-3: "#5f6862"
  line: "#dadfd8"
  signal: "#0d7a5a"
  signal-deep: "#095c43"
  signal-soft: "#d9eee4"
  signal-glow: "#43d39a"
  compare: "#c9532b"
  trace-3: "#4a5cc4"
  down: "#b03b20"
  night: "#0f1412"
typography:
  display:
    {
      family: "Geist",
      weight: 600,
      size: "clamp(2.5rem, 1.5rem + 3.6vw, 4.75rem)",
      tracking: "-0.035em",
    }
  h2:
    {
      family: "Geist",
      weight: 600,
      size: "clamp(1.75rem, 1.25rem + 1.7vw, 2.75rem)",
      tracking: "-0.03em",
    }
  body: { family: "Geist", weight: 400, size: "1.0625rem", lineHeight: 1.6 }
  data:
    {
      family: "Geist Mono",
      use: "numbers, event names, code, queries, axis labels",
    }
rounded:
  control: 8px
  card: 12px
  composer: 16px
  chip: 99px
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(72px, 9vw, 136px)"
  wrap: 1240px
---

## Overview

Signal is a product analytics tool, so the site is set like an instrument: porcelain paper, hairline rules and one measured green trace. Product managers and engineers read it at a desk in daylight between standups, which is why it is light, dense where data is shown and quiet everywhere else. The proof is the product itself: the first viewport is a working query composer, and the `/app` demo is a full workspace.

## Colors

Paper (`#f4f5f1`) and white surfaces carry ink text; green (`#0d7a5a`) is the only brand accent and the primary data series. Vermilion (`#c9532b`) is reserved for comparison series, indigo for a third series, and a darker red for negative deltas. A near-black night (`#0f1412`) frames code, the install band, the closing call and the footer, where the bright glow green (`#43d39a`) replaces the brand green. Selection, caret, focus ring, scrollbar and range/checkbox accents all come from these tokens.

## Typography

Geist for all prose and headings: 600 weight, tight tracking (−0.03 to −0.035em), balanced wrapping. Geist Mono only where something is measured or typed: numbers (tabular), event names, code, the generated query, axis labels and deltas. Body is 17px with a 60–64ch measure.

## Layout

A 1240px wrap with fluid gutters. Pages alternate 5/7 and 4/7 splits with full-bleed bands (night for code and closes, signal-soft for the customer quote) to vary density. Data is shown in white panels with one 1px border and no shadow; only the composer and the featured plan get a soft offset shadow. The app demo has its own shell: a 248px sidebar that collapses to a top bar below 900px.

## Components

Query composer (sentence of four selects → chart + generated query), line chart (SVG paths with HTML axes, hover/arrow-key cursor as an ARIA slider, release annotations), vertical funnel with drop ribbons, retention cohort grid tinted by `color-mix`, bar list, data tables with sortable headers and status pills, chips with `aria-pressed`, segmented radios, switches, code blocks with copy, accessible tabs, `<details>` FAQ, forms with inline errors and `role="status"` success messages.

## Motion

One language: the trace. Every chart draws in left-to-right with a `clip-path` reveal (1.1s, exponential ease-out) when it mounts or its data changes, and pages fade up 6px on route change. Everything is visible without JS-driven reveals; `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do show the product (charts, funnels, tables) instead of describing it.
- Do keep mono for data and code only.
- Do label every demo number as fictional sample data.
- Don't add a second accent colour or gradient; green is the signal.
- Don't add stat rows, icon-card grids or eyebrow labels above headings.
- Don't put shadows on bordered panels; one elevation per surface.
