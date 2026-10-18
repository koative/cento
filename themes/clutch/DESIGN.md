---
name: Clutch
colors:
  night: "#0b0d12"
  deck: "#12161e"
  deck-2: "#1a1f2a"
  line: "#262d3a"
  line-strong: "#3a4352"
  bone: "#eceae3"
  mute: "#a3abb9"
  flare: "#ff5a1f"
  flare-ink: "#1a0800"
  ice: "#7cc4ff"
  error: "#ff8f8f"
typography:
  display:
    {
      family: "Tomorrow",
      weights: [600, 700, 800],
      h1: "clamp(2.6rem, 6.2vw, 5.75rem)",
      h2: "clamp(1.7rem, 3.4vw, 2.75rem)",
      case: "uppercase",
    }
  body:
    {
      family: "Chakra Petch",
      weights: [400, 500, 600],
      size: "1.0625rem",
      lineHeight: 1.6,
    }
rounded: "0 — corners are cut (12px diagonal on top-right and bottom-left), never rounded"
spacing:
  {
    gutter: "clamp(1rem, 4vw, 2.5rem)",
    section: "clamp(3.5rem, 8vw, 6.5rem)",
    wrap: "1320px",
  }
---

## Overview

Clutch is built like a match broadcast: a dark arena, two team colours and the scorebug graphics fans read every weekend. Fans visit at night, often on a phone with a stream open, so the site is dark, dense where the data is (schedules, tables, stats) and calm where the story is. The signature is the round tape — every round of a map as a coloured strip you can play or scrub, with the score, the round-difference line and the key moments updating as you go.

## Colors

Night `#0b0d12` is the arena; deck surfaces step up for panels. Flare orange `#ff5a1f` is Clutch — used for our side of every scorebug, won rounds, primary buttons and focus rings. Ice `#7cc4ff` is always the opponent. Bone `#eceae3` is text and the result ticker; mute `#a3abb9` is secondary text (≈ 8:1 on night). Errors use a soft red distinct from flare.

## Typography

Tomorrow (800, uppercase, −0.015em) for headings, handles, scores and tags — angular like HUD lettering. Chakra Petch for body, with tabular numerals on every score, stat and price. Display stays ≤ 6rem.

## Layout

12-column feel on a 1320px wrap; asymmetric two-column splits (copy vs. data) that collapse to one column under 960px. Lists are hairline-ruled rows (schedule, standings, partners, career), not card grids. Full-bleed bands for Clutch House and the orange matchday close.

## Components

Scorebug tags (CLT flare / opponent ice), big match scorebug, match rows (date · game/event · opponent · result or format), player plates with outline jersey numbers, round tape, standings table with the playoff cut, segmented filters, chamfered buttons, merch flats drawn in SVG from each product's colours, crosshair preview with copy code.

## Motion

Page change: a thin flare "sting" sweeps across the top of the page while content settles 10px. Round tape: cells light up as the playhead passes, scores tick in from above, moment text settles in. Bag count pops on change. All of it is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep flare for Clutch and ice for opponents — never swap them.
- Do cut corners with the shared diagonal clip; don't round them.
- Do set numbers in tabular figures.
- Don't add eyebrow labels, glow, gradients on text or neon effects — the photographs bring the light.
- Don't use player photos: players are presented through numbers, handles and stats.
