---
name: Chroma
colors:
  paper: "#f7dccf"
  paper-2: "#fcefe8"
  rose: "#e9b4a4"
  ink: "#3d1621"
  muted: "#74404c"
  accent: "#9b2f45"
  accent-deep: "#7e2438"
  wine: "#4a1a27"
  on-wine: "#f7dccf"
typography:
  display:
    {
      family: "Yeseva One",
      weight: 400,
      sizes: "clamp(2.6rem…5.4rem) h1, clamp(1.95rem…3.1rem) h2",
    }
  body:
    {
      family: "Montserrat",
      weight: "400–700",
      size: "clamp(1rem…1.0625rem)",
      lineHeight: 1.65,
    }
rounded:
  card: 14px
  arch: "999px 999px 14px 14px"
  controls: 999px
spacing:
  s: "clamp(0.75rem…1rem)"
  m: "clamp(1.25rem…2rem)"
  l: "clamp(2.5rem…4.5rem)"
  xl: "clamp(4rem…7.5rem)"
---

## Overview

A colour-led salon seen through its own tools: the colourist's level chart, the formula card every client keeps, the printed price card at the desk, and the arched mirrors at each station. Clients browse on their phones in the evening deciding whether to book, so the site is light, warm and calm, and it answers the question salons usually dodge: how long will I be in the chair?

## Colors

Peach paper and cream cards with wine-burgundy ink, a berry accent for actions and a rose tint for processing time. Wine bands carry the shade chart, careers and the closing call. The ten level swatches (blue-black to lightest blonde) are the only other colours and appear as real data. Body and muted text pass AA on paper and cream (12:1 and 6.2:1).

## Typography

Yeseva One, a fat-face Didone, for headings, prices, quotes and the wordmark; it reads like salon signage. Montserrat for everything else, with tabular numerals for times, prices and durations. Tracking stays at −0.01em.

## Layout

Wide 1280px wrap with generous section spacing. Home alternates dense passages (menu card, timeline, shelf) with quiet ones (a single quote, the shade band). Detail pages split photo and information; the photo sticks while the formula and timeline scroll.

## Components

- Arched portrait frames (stylists, hero, look photo) after the station mirrors.
- Printed price card with dotted leaders.
- Chair timeline: totals, proportional bar (solid = in the chair, rose = developing, free to step out), hour ticks or clock times, step list.
- Shade chart: ten toggle buttons as hair tufts with a live reading.
- Choice tiles, arched day buttons and time slots in booking; inline errors that name the fix.
- Authored SVG packaging for the product range.

## Motion

Page enter rises 14px with an exponential ease-out. Timeline segments grow in and re-flow their widths when the plan changes; the picked shade tuft lifts; the booking count pops. All reduced to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep times and prices derived from `content.ts` steps, never typed by hand.
- Do use the arch only for people and finished looks.
- Don't add eyebrow labels, gradient text or card grids of icons.
- Don't use the level swatches decoratively; they always mean a level.
