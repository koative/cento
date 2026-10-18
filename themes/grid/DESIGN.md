---
name: Grid
colors:
  paper: "#f5f1e8"
  paper-2: "#fcfaf4"
  paper-3: "#ebe5d7"
  ink: "#17211c"
  ink-2: "#4a554e"
  line: "#d9d1c1"
  line-2: "#b5ab97"
  sun: "#f2a33a"
  sun-soft: "#f9dcae"
  sun-ink: "#a8420c"
  cell: "#1d2a3a"
  leaf: "#2d7a58"
  wire-grid: "#44609e"
  night: "#131b17"
typography:
  display:
    {
      family: Lexend,
      weight: 600,
      size: "clamp(2.5rem, 1.55rem + 3.7vw, 5rem)",
      tracking: "-0.025em",
    }
  heading:
    {
      family: Lexend,
      weight: 600,
      size: "clamp(1.75rem, 1.3rem + 1.7vw, 2.75rem)",
    }
  body: { family: Lexend, weight: 400, size: "1.0625rem", lineHeight: 1.6 }
rounded: { card: 14px, control: 8px, statement: 4px, chip: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4.5rem, 3rem + 6vw, 8rem)",
  }
---

## Overview

Daylight paper and panel-cell ink: the site reads like an installer's survey pack, with a roof plan, a single-line wiring diagram, datasheet elevations and the utility bill itself as its main images. Homeowners look at it in daylight, often next to their own bill, so it is light, calm and very legible, and every number on it is shown with its working.

## Colors

Warm paper (`paper`) with near-black green ink. One sun accent in two strengths: `sun` for fills (generation, the sun, highlights on dark) and `sun-ink` for text, links and primary buttons (AA on paper and paper-2). `cell` is the dark blue of photovoltaic glass and is used only for panels. `leaf` means battery and money saved; `wire-grid` marks power bought from the utility. `night` is kept for the planner readout and the closing band.

## Typography

Lexend throughout, chosen for reading figures at a glance: 600 for headings with −0.025em tracking, 400 body, 300 for the large step numerals. Tabular numerals on every price, kWh and time. Measures are capped at 60–68ch.

## Layout

A 1320px wrap with fluid gutters. Pages open with a large left-aligned title and lead. Content alternates between dense, ruled passages (bills, specs, timelines, tables) and photographic breathers. Hairlines and 1–2px ink rules organise lists instead of cards; cards are used only for working tools (planner, energy day, calculator, quote form).

## Components

- Roof planner: a shingle-course roof face with toggle slots, blocked chimney/skylight/vent cells, roving-tabindex keyboard control.
- Energy day: an orthogonal single-line diagram (roof, battery, grid, home) whose wires carry moving current in the direction of flow, beside a 24-hour production/demand chart and a time slider.
- Datasheet drawings: SVG front elevations of each product with dimension lines.
- Utility statements, bill bar charts, cumulative cost chart, spec tables, segmented controls, chips, switches, steppers.

## Motion

One language: current. Wires animate a dash offset along their path, the sun slides along its arc, the chart cursor eases between hours, panels settle onto the roof with a short scale-in. Pages rise in from an already visible state. `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do show the assumptions next to any estimate and label illustrative values.
- Do keep `sun-ink` for interactive text; `sun` only as fill or on `night`.
- Don't add icon-card grids, kickers above headings or decorative gradients.
- Don't use `cell` blue for anything that is not a panel.
