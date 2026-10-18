---
name: Quad
colors:
  paper: "#f5f0e6"
  stone: "#ebe3d2"
  stone-2: "#ddd1b9"
  ink: "#1d232c"
  ink-2: "#4a4f58"
  rule: "#c9bba1"
  crimson: "#8f1c2f"
  crimson-dark: "#6c1322"
  crimson-tint: "#f3dcd8"
  lawn: "#2f5b38"
  lawn-tint: "#c9d4b2"
  water: "#b7c5c4"
  slate-text: "#efe8da"
typography:
  display: "Domine, 600, tracking -0.02em"
  body: "Source Sans 3, 400–700, 1.0625rem / 1.6"
  sizes:
    display: "clamp(2.6rem, 1.5rem + 4.6vw, 5.6rem)"
    h1: "clamp(2.35rem, 1.6rem + 3.2vw, 4.4rem)"
    h2: "clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem)"
    h3: "clamp(1.15rem, 1.05rem + 0.4vw, 1.35rem)"
    small: "0.875rem"
rounded: "2px"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 2.6vw, 3rem)"
  section: "clamp(3.5rem, 2.4rem + 4.4vw, 7rem)"
  max: "1320px"
---

# Quad — design notes

## Overview

Quadwell University set as a printed prospectus: sandstone paper, slate ink, crimson from an academic hood and one lawn green taken from the Old Quad. Prospective students and parents read it on phones and laptops in daylight, comparing programmes and fees, so it is light, calm and dense with facts. It reads like a prospectus, not a campaign.

## Colors

`paper` is the page and `stone` / `stone-2` mark alternate bands, tool panels and empty timetable cells. `ink` is text and the dark research/footer bands (`slate-text` on top). `crimson` is the one action colour: buttons, active nav, the rule under every h1, focus rings, text selection, caret, optional modules. `lawn` stands only for "done": success panels and a planner year that adds up. `water` is the river on the campus plan. Rules are `rule`, 1px.

## Typography

Domine (600) for headings, set large and balanced with a short crimson rule beneath each h1. Source Sans 3 for everything else, 65–75ch measure, tabular numerals (`.num`) for fees, credits, dates and places left. Uppercase tracked labels appear only in fact lists (`dt`) and the award line below a programme title, never above a heading.

## Layout

A 1320px column with fluid gutters. Pages open with a text/photo split head; content runs as ruled lists and tables (faculty index, programme rows, halls, findings, event rows) rather than cards. Bands alternate paper, stone and ink to pace long pages. Below 960px the nav collapses to a drop-down panel; below 640px grids stack to one column.

## Components

Header with crest + wordmark, primary nav and an Apply button; mobile menu button with `aria-expanded`. Programme rows (code, title, award, duration, typical offer). Fact strips with ruled cells. Date tiles for events. Segmented controls and chips with `aria-pressed`. The module planner: core and optional module lists, a 120-credit ledger drawn in 15-credit blocks, a Mon–Fri timetable that marks clashes, and "Save plan and apply". The SVG campus plan with a linked place list. Three-step application form with stepper, inline errors and a success panel. FAQ as native `<details>`. Ink footer with sitemap columns, newsletter form and the fictional-brand line.

## Motion

Pages rise 14px from 35% opacity on route change (content stays visible by default) while the crimson rule under each h1 draws in. In the module planner, ledger blocks fill and each module code stamps into its timetable cell with a clip-path wipe; chart bars grow from the left; success panels rise; the mobile menu drops in. All of it is cut to near-zero under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

- Do keep crimson for actions and the selected state; lawn only for success.
- Do write facts as numbers people compare: fees, grades, credits, weeks, minutes to the quad.
- Do use ruled rows and tables for collections; one photo per section at most.
- Don't add kicker labels, icon-card grids, gradients or rounded pill cards.
- Don't round corners past 2px or add shadows beyond the two soft panel shadows.
- Don't show real universities' names, crests or rankings.
