---
name: Nest
colors:
  paper: "#fbf6ec"
  oat: "#f3ead8"
  peach: "#f7d9c8"
  card: "#fffdf8"
  ink: "#2b2340"
  ink-2: "#574e6b"
  line: "#e2d6bf"
  tomato: "#c2461f"
  sun: "#f2bf6e"
  leaf: "#3d6b35"
  error: "#b3261e"
  wren: "#eeb49b"
  robin: "#e8c766"
  finch: "#a3c98a"
  lark: "#a8cbe6"
  owl: "#c1aedf"
  swift: "#f2bf6e"
typography:
  display:
    {
      family: Fredoka,
      weight: 600,
      sizes: "h1 clamp(2.6rem…5.4rem), h2 clamp(1.75rem…2.8rem), h3 clamp(1.15rem…1.4rem)",
    }
  body:
    {
      family: Nunito,
      weight: "400–800",
      size: "clamp(1rem…1.1rem)",
      lineHeight: 1.6,
    }
rounded: { small: 10px, card: 16px, photo: 28px, pill: 999px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 2.5rem)",
    section: "clamp(3.75rem…7rem)",
    wrap: 1240px,
  }
---

## Overview

Nest is drawn from the nursery hallway: coat-peg labels with a punched hole and a symbol for every child, the height chart on the wall, the menu board by the door and the daily diary sheet. Warm paper and aubergine ink in daylight, because parents read this on a phone at lunch or in the evening, and every room gets its own peg colour so the site and the building speak the same language.

## Colors

Paper and oat surfaces, ink for type and the menu board/fees section, tomato for the one primary action and live markers, sun for the closing tour band and selected states. Six room colours (wren, robin, finch, lark, owl, swift) are used only to identify rooms: peg tags, growth-chart bands, room heroes, calculator day bars. Ink on every room colour is above 7:1; white on tomato is 5:1.

## Typography

Fredoka 600 for headings, prices, times and pegs: rounded like a nursery label maker but not childish. Nunito for reading, with 800 for labels and small facts. Tabular numerals on every price, time and total.

## Layout

A 1240px wrap with 5/7 split sections that alternate paper, oat, peach and ink bands. The home page runs dense (growth chart, menu board, rate table) against quiet (principles, single quote). Room list rows alternate photo side; detail pages lead with a room-coloured hero and a ruled facts strip.

## Components

Coat-peg label (hole, Lucide symbol, first name), growth chart (rooms as bands on a birth-to-eight ruler with a tomato age marker), fees calculator (room pills, per-day segmented session pickers with hour bars, receipt-style slip with dashed rules), day timeline (age tabs, scrubber, live "now" step), tour slot grid with full slots, FAQ disclosures, tour CTA with the next real free slots, ink footer with a validated newsletter form.

## Motion

One soft language: pages rise 12px into place, the day panel and the tour confirmation turn in like a page, calculator day bars grow from the left and the age marker glides along the ruler. Peg tags tilt a degree on hover. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do give each room its colour everywhere it appears, and nowhere else.
- Do keep prices, times and totals in tabular Fredoka.
- Do use real nursery language: key person, settling in, pickup, Forest Friday.
- Don't add eyebrow labels, icon-card rows or gradient decoration.
- Don't use the room colours as generic accents or for text.
- Don't hide content behind scroll-triggered reveals.
