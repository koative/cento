---
name: Lumen
colors:
  paper: "#f3f4ee"
  paper-2: "#e6e8de"
  card: "#fbfbf7"
  ink: "#1a1e19"
  ink-2: "#4a5147"
  line: "#c9cdc0"
  lime: "#d6e13b"
  lime-soft: "#edf1c4"
  green: "#34502e"
  danger: "#a3311f"
typography:
  display:
    {
      family: "Host Grotesk",
      weight: 600,
      size: "clamp(2.5rem, 5.2vw, 4.9rem)",
      tracking: "-0.03em",
    }
  h2:
    { family: "Host Grotesk", weight: 600, size: "clamp(1.75rem, 3vw, 2.7rem)" }
  body:
    { family: "Host Grotesk", weight: 400, size: "1.0625rem", lineHeight: 1.55 }
rounded:
  control: 6px
  card: 12px
  pill: 999px
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(3.5rem, 7vw, 6rem)"
  max: 1360px
---

## Overview

An optician's shop in daylight: pale cool-white trays, frames drawn in ink, and a chartreuse lens cloth as the one loud colour. The world borrows the trade's own print: the temple stamp (`49□21-145 C.02`), the itemised order ticket, the prescription card and the Snellen chart. Shoppers browse on phones in bright light and in store under daylight lamps, so the theme is light, high-contrast and calm, with the product drawn crisply rather than photographed on a model.

## Colors

Paper `#f3f4ee` and tray `#e6e8de` carry the page; ink `#1a1e19` is text, frames and primary buttons. Lime `#d6e13b` is a surface only (announcement bar, finder teaser, mirror result, selected badges), never text on paper. Forest green `#34502e` is the interactive accent: focus rings, hover, success text, the range thumb. The eye-exam band and the closing eye chart switch to ink, because refraction happens in a dimmed room.

## Typography

Host Grotesk throughout. Display at 600 with -0.03em tracking, body at 400 and 1.55 line height, measure capped at 68ch. Prices, measurements, stamps, hours and table figures use tabular numerals. The eye-chart close and the 404 set uppercase lines in descending sizes like a Snellen chart.

## Layout

12-column hero with copy beside a photo and a four-frame tray beneath it, so the product is visible in the first viewport. Sections alternate density: the itemised ticket, a card grid, a full-width lime band, an overlapping photo and panel, a dark exam band, a dense store table, quiet quotes. Listing uses a sticky filter rail (a toggled panel below 900px); detail uses a sticky stage beside the options.

## Components

- `FrameArt`: authored SVG front view per shape (round, panto, oval, square, rectangle, cat-eye, aviator, hexagon, browline), mirrored lenses, acetate vs metal rim weights, a tortoise pattern, clear acetate opacity and sun lens tints. Colour variants redraw it live.
- `FaceOutline`: six geometric face outlines with eye-line guides; a frame drops onto it in the finder.
- Order ticket, prescription card, spec table and hours tables with today highlighted.
- Choice cards (radio inputs) for sizes, lenses, delivery and exams; pill radios for the finder; date and time chips with booked slots struck through.
- Accessible disclosures (`details`/`summary`), quantity stepper, persisted bag with a polite live count.

## Motion

Route changes pull into focus: `main` enters from a 6px blur to sharp. The frame on the product stage and on the face outline settles down into place on each change, and colour changes fade fill and stroke. The mobile menu drops in with a clip-path. All of it is disabled under `prefers-reduced-motion`; content is visible by default.

## Do's and Don'ts

- Do draw frames with `FrameArt` and keep the measurement stamp next to every frame.
- Do keep lime as a surface with ink text on it.
- Do label illustrative figures (lens thickness) as estimates.
- Don't use lime or gold as text colours on paper; they fail contrast.
- Don't add eyebrow labels, stat rows or icon-card grids; the trade's own artefacts carry the structure.
