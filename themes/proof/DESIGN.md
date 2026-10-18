---
name: Proof
colors:
  flour: "#f7efe1"
  paper: "#fffaf1"
  kraft: "#ecd9b8"
  kraft-deep: "#d4b483"
  crust: "#3a2116"
  crumb: "#6b4a36"
  oven: "#b03f1c"
  oven-deep: "#8c2f12"
  butter: "#f3c14f"
  felt: "#2a1a12"
  line: "#dcc8a6"
typography:
  display:
    family: Caprasimo
    sizes:
      {
        h1: "clamp(2.5rem, 1.5rem + 4.2vw, 5.25rem)",
        hero: "up to 6rem",
        h2: "clamp(1.75rem, 1.25rem + 1.9vw, 2.9rem)",
        h3: "1.2–1.4rem",
      }
  body:
    family: Nunito
    sizes:
      {
        body: "1.0625rem / 1.6",
        lede: "clamp(1.1rem, 1.02rem + 0.35vw, 1.3rem)",
        small: "0.85–0.95rem",
      }
rounded:
  { card: 16px, field: 12px, control: 999px, arch: "999px 999px 16px 16px" }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 3rem)",
    section: "clamp(3.5rem, 2rem + 6vw, 7rem)",
    wrap: "1260px",
  }
---

## Overview

A neighbourhood sourdough bakery seen the way regulars see it: early, on a phone, on the way to the counter. The world is the bakery's own printed matter — flour-white paper, kraft bags, a felt letterboard of oven times, price tags, a receipt — set in a soft, heavy 1970s shop-front serif. Light, because the scene is daylight and a bright shop window.

## Colors

Flour paper and a warmer paper for raised surfaces; crust brown for ink; crumb brown for secondary text (≥ 6:1 on flour). Oven red is the single action colour (buttons, active nav, the oven segment). Butter yellow marks warmth only: warm-now badges, the price tag, highlights, selection. Kraft carries the footer, method band and filled tracks; felt is reserved for the letterboard.

## Typography

Caprasimo for headings, prices, big numerals (day tiles, the board clock, years). Nunito for everything else; uppercase tracked Nunito only on the letterboard, where it imitates changeable letters. Tabular numerals on prices, hours and times.

## Layout

A 1260px wrap with fluid gutters. Images use an oven-mouth arch (fully rounded top, square-ish bottom) carried over from the earlier Proof. Sections alternate dense lists (letterboard, sessions, price tables) with quiet full-bleed bands (method, wholesale). Lists use ruled rows rather than cards; cards appear only for products.

## Components

Pill buttons (solid oven, ghost crust, light on dark), chips for filters, option rows for variants and dates, a quantity pill, receipt lists with dashed rules, a day-tile pickup planner with disabled reasons, the oven board (range clock, hour scale, per-row Gantt track with oven/warm/rack segments and a now line), details-based FAQ, an authored SVG street map.

## Motion

Pages rise into place (short translate + fade from partly visible). Hero and header images unveil from an arch clip. Warm items on the oven board breathe with a soft butter halo. The mobile menu drops with a clip-path. All of it switches off under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep butter for warmth and oven red for action; never swap them.
- Do write times and prices as the bakery would chalk them (5:40, $4.25).
- Don't add eyebrow labels, icon-card rows or decorative gradients.
- Don't put the letterboard texture anywhere except the letterboard.
