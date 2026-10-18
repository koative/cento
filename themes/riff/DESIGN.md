---
name: Riff
colors:
  paper: "#ece5d5"
  paper-hi: "#f5f0e4"
  stock: "#e0d6c0"
  ink: "#1a1714"
  ink-2: "#4a433a"
  red: "#bd2d17"
  red-ink: "#a32512"
  red-hot: "#ff5a3c"
typography:
  display: "Six Caps, uppercase, 2.5–6rem, line-height 0.82–0.9"
  body: "Work Sans 400/600/700, 1.0625rem/1.6"
  labels: "Work Sans 600–700 uppercase, 0.75–0.8125rem, tracking 0.08–0.1em"
rounded: "0 everywhere; 50% only on round play buttons; 999px on the cart count"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(4rem, 3rem + 4vw, 7.5rem)"
  wrap: "1320px"
---

## Overview

Riff is set like a two-ink show bill: black ink and riso red pulled on newsprint stock, wood-type-tall Six Caps headlines stacked between rules, and every photograph printed as a one-ink halftone. It comes from the culture the band lives in — gig posters on venue walls, hand-pulled tour prints, setlists taped to the stage — and stays light because fans check dates and buy tickets on their phones in daylight; the player and the record get a black-ink band of their own, the way a stage goes dark.

## Colors

Paper is the ground; ink does the text and rules. Red is the second ink: buttons, the “low” ticket status, the date band on posters, the stage-lit hero photo. `red-ink` is the small-text red on paper (AA), `red-hot` is the red used on black (player progress, timeline years, footer mark). Paper text on red passes AA.

## Typography

Six Caps for anything a poster would print: page titles, section heads, dates in the tour ledger, setlists, quotes, prices. Work Sans for reading and controls, with uppercase tracked labels for meta (never above headings). Display tops out at 6rem.

## Layout

12-column feel inside a 1320px wrap. Ledgers rule everything: tour dates, tracklists, credits, details and contacts are ruled lists with a 2px ink top rule and hairline separators. Detail pages split art (poster, cover, product drawing) and information; the art stays sticky on desktop. Mobile stacks with ledger rows compressing date / place / status.

## Components

- **Show bill** — a poster set from show data with container-query type; sold-out and played nights get a rubber stamp.
- **Record player** — deck with play, waveform scrubber (a native range over printed bars) and tracklist; previews continue in the **dock** across routes.
- **Covers and merch drawings** — authored two-ink SVG compositions (ceiling bars, copper wire, parking lines, rings, halftone, dawn) reused on records, cassettes, tees and posters.
- **Ledger row** — whole-row link that inverts to ink on hover with a status block (tickets, few left, sold out, setlist).
- Segmented filters, chip selectors, quantity steppers, ticket stubs in the cart, square-cornered buttons.

## Motion

Pages ink in with a short rise; the sold-out stamp lands with a scale-down thunk; the dock rises in when a preview starts and its red progress line runs across the top; the mobile menu wipes down with clip-path. Hover lifts records and inverts ledger rows. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep to two inks plus paper; photographs always go through the print treatment.
- Do set dates, prices and setlists in Six Caps with tabular figures in body text.
- Don't round corners or add soft cards — rules and stock colour do the grouping.
- Don't put red small text on black or paper; use `red-hot` on black and `red-ink` on paper.
