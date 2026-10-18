---
name: Odyssey
colors:
  paper: "#ebe4d6"
  paper-2: "#e2d9c6"
  sheet: "#f5f0e6"
  ink: "#1f3e4b"
  ink-2: "#4b6470"
  line: "#c8bea9"
  accent: "#9b4a2a"
  accent-hover: "#823c20"
  accent-light: "#e08a5f"
  night: "#16303a"
  on-night: "#ebe4d6"
  on-night-2: "#b6c4c2"
  sea: "#dfe2d5"
typography:
  display:
    fontFamily: Playfair Display
    fontWeight: 500
    h1: clamp(2.6rem, 1.5rem + 4.2vw, 5.4rem)
    h2: clamp(1.9rem, 1.35rem + 1.9vw, 3rem)
    h3: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)
    letterSpacing: -0.025em to -0.015em
  body:
    fontFamily: Kumbh Sans
    fontSize: 1.0625rem
    lineHeight: 1.6
    measure: 68ch
rounded:
  control: 3px
  sheet: 12px
spacing:
  gutter: clamp(20px, 4vw, 48px)
  section: clamp(64px, 9vw, 128px)
  wrap: 1280px
---

# Odyssey — design

## Overview

A travel dossier: the sand-coloured paper of a printed itinerary, harbour-blue ink, a terracotta stamp for the one thing to press. People plan a long trip slowly, on a laptop in the evening, coming back several times, so the site is light, quiet and legible, with photographs doing the travel and an authored navigator's chart doing the planning.

## Colors

Paper (`#ebe4d6`) is the page, sheet (`#f5f0e6`) the raised route sheet and form fields, ink (`#1f3e4b`) all text and rules, ink-2 secondary copy. Terracotta accent (`#9b4a2a`) is reserved for primary buttons, route stops and errors. Night (`#16303a`) carries the destination strip, the chart teaser and the footer, with on-night text. Sea (`#dfe2d5`) fills the chart. Selection, caret, scrollbar and focus ring all come from this palette.

## Typography

Playfair Display (500, italic for place names and captions) for headings, place names and the big estimate; Kumbh Sans for everything that has to be read or operated. Display tops out at 5.4rem, tracking never tighter than −0.025em, tabular numerals in prices, dates and the season chart.

## Layout

A 1280px wrap with fluid gutters; asymmetric section heads (heading left, short note right). Home alternates dense passages (destination grid, journeys table) with quiet ones (a single quote, the close). Lists are ledgers and tables rather than card grids; the destination grid leads with one tall image. Below 760px everything stacks; the planner chart keeps its working scale and scrolls sideways.

## Components

- **Route chart** (`RouteMap`): an equirectangular graticule with every destination as a fix, the route drawn as numbered northward arcs; interactive in the planner, compact on journey pages.
- **Route sheet**: sticky summary with date, travellers, stay level, proportional nights bar, length, legs and per-person estimate.
- **Season chart**: twelve bars per destination, coloured by our pick / good / off season, with daytime highs.
- Ledger rows for journeys and stays, segmented filters, accessible FAQ `<details>`, enquiry form with error summary, inline errors and a reference-numbered confirmation.

## Motion

Pages fade up once on arrival (0.6s exponential ease-out); route arcs draw themselves when stops change and new stops pop in; the mobile menu drops down. Content is visible without JavaScript-gated reveals, and `prefers-reduced-motion: reduce` removes all animation.

## Do's and Don'ts

- Do let photographs and the chart carry the page; keep chrome to hairlines.
- Do keep terracotta for actions, stops and errors only.
- Don't add eyebrow labels, card grids of icons, gradients or glass.
- Don't draw coastlines or fake illustrations on the chart; it stays pure geometry.
