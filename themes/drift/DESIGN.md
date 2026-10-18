---
name: Drift
colors:
  sand: "#f6efe2"
  sand-2: "#ece1cc"
  paper: "#fffaf0"
  foam: "#d8ebe8"
  ink: "#0d3341"
  ink-2: "#43616b"
  ink-soft: "#9bb8bf"
  sea: "#0b6b77"
  wax: "#f5c34a"
  wax-deep: "#e6ac25"
  error: "#a63a1c"
typography:
  display: "Lilita One, 400 — hero clamp(2.9rem → 5.75rem), h1 clamp(2.6rem → 4.75rem), h2 clamp(2rem → 3.25rem), h3 clamp(1.3rem → 1.65rem)"
  body: "Albert Sans 400–700 — 1rem/1.6, lede clamp(1.1rem → 1.3rem)"
rounded:
  card: 14px
  panel: 18px
  field: 10px
  control: 999px
spacing:
  page-gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 3rem + 5vw, 7.5rem)"
  max-width: 1240px
---

## Overview

Drift is a surf school's beach hut turned into a website: sun-bleached sand paper, deep-water ink, and surf-wax yellow for anything you can act on. The display face is chunky and friendly like hand-painted board-rack signage, and the signature is the thing every surf coach does at dawn: reading the forecast. Visitors plan on phones in daylight, so the world is light, high-contrast and numeric where it matters.

## Colors

Sand is the page; sand-2 and foam alternate as section grounds (camps, forecast, practical info). Ink carries text, primary buttons and the dark "night" bands (a day on camp, the forecast readout, the footer). Wax yellow is reserved for calls to action, the current-hour cursor and key numbers on dark grounds. Sea marks "good" conditions, links-as-labels and offshore wind. Error red is only used for validation.

## Typography

Lilita One for every heading, prices, wave heights and timeline times; never below 1.2rem. Albert Sans for everything else, 650–700 for labels and buttons. Numerals in prices, forecasts and summaries use tabular figures. Headings balance; body measure stays under ~65ch.

## Layout

Wide 1240px wrap with generous section rhythm. Home alternates dense and quiet passages: split hero with the live "today" card, a lesson rack (horizontal rows, not cards), the forecast panel on foam, a three-stage method with a beach-profile diagram, a featured camp plus cards, a single large quote, an ink timeline band, a coach strip, a practical list and a photo close. Detail pages pair a main column with a sticky aside (camp dates, coach sessions, booking summary).

## Components

- **Forecast widget**: spot and level radio pills, seven day buttons with per-hour rating strips, an SVG chart (wave bars coloured by rating for the chosen level, dashed tide curve, wind arrows and mph), a range scrubber, and an ink readout with a coach's verdict and a prefilled booking link.
- **Lesson rack** rows, **camp cards** with a stretched link, **pills** for every segmented choice, **departure list** with places left and struck-through full dates, **itinerary** with numbered stops on a foam line.
- **Forms**: labelled fields, hints under inputs, inline errors that name the fix, disabled loading button, polite live success.

## Motion

Pages rise in on route change. Hero wave contours drift slowly. The forecast is the authored moment: bars grow from the baseline when the day, spot or level changes, and the wax cursor glides between hours. Hover states lift cards and coach portraits slightly. Everything collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep wax yellow for actions and the selected hour; don't use it as decoration.
- Do let numbers (ft, mph, $) carry the display face; don't set paragraphs in Lilita One.
- Do keep forecast colours paired with words (Good / Fair / Poor); never colour alone.
- Don't add eyebrow labels above headings or icon-card grids; use rows, timelines and photos.
