---
name: Frame
colors:
  paper: "#eeece6"
  wall: "#e2dfd6"
  mat: "#f8f7f3"
  ink: "#1c1b18"
  ink-2: "#57534a"
  line: "#cdc8bc"
  red: "#b0301d"
  film: "#171614"
  film-ink: "#ddd7c9"
  edge: "#e2a346"
typography:
  display:
    { family: "Tenor Sans", weight: 400, sizes: "clamp 1.25rem → 5.25rem" }
  body:
    {
      family: "Spectral",
      weights: [300, 400, 500],
      size: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)",
      lineHeight: 1.6,
    }
  label: { family: "Tenor Sans", size: "0.8125rem", tracking: "0.04–0.14em" }
rounded: { controls: 2px, chips: 2rem }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3.5rem)",
    section: "clamp(4rem, 9vw, 8rem)",
    max: 88rem,
  }
---

## Overview

Frame is a photographer's studio seen the way an editor or collector meets it: pictures hung on a warm gallery wall with a museum label beside each, and the working tools behind them — a black contact sheet with amber edge codes and a red china marker. Light, because the visitors (photo editors, architects, collectors) look at work in daylight offices and galleries, and because prints are judged on white.

## Colors

Paper and a slightly darker wall tone carry every page; photographs sit on the wall colour with a soft cast shadow, as if pinned up. Ink for text and solid buttons, a warm grey for secondary copy (6.4:1 on paper). Red is the grease pencil only: marks, active nav, dates, edition counts, focus rings (5.4:1 on paper). Film black is reserved for the contact sheet, the studio statement and the footer, with amber edge-print type.

## Typography

Tenor Sans, a humanist display face with gallery-signage proportions, sets headings, labels, prices and controls; uppercase with wide tracking for buttons and small labels. Spectral, a screen serif with a light weight, carries ledes, essays and quotes, in italic for testimonials and series titles inside labels.

## Layout

Wide asymmetric grids (5/7 hero, 4/5/3 featured series) with generous separation and hairline rules instead of cards. Lists (disciplines, process, rates, CV, order lines) are ruled rows. Series covers crop; prints are always shown whole, contained on the wall tone. Breakpoints at 1100, 900 (mobile menu) and 600px.

## Components

- Series viewer (signature): stage on the wall tone, frame sized to its own ratio, gallery label, prev/next and counter; a film-black contact sheet with edge codes; ← → keys move, M marks. Marked frames get a hand-drawn red box on the stage and the sheet, persist in localStorage, and appear in a tray on every series page and inside the contact form.
- Wall preview: an SVG wall drawn in inches with an 84 in sofa; the chosen print size and framing animate to scale with a dimension line.
- Print options as bordered radio rows, quantity stepper capped by the remaining edition, order page with live totals and a delivery form.
- Forms use native constraint validation with messages that name the fix, a sending state and an aria-live confirmation.

## Motion

Images "develop": they arrive overexposed and soft and settle into contrast over 900 ms, on the hero, the viewer stage and page entry. The grease mark draws itself around a frame. The wall preview resizes smoothly. Everything is visible by default; `prefers-reduced-motion` removes all animation and transition.

## Do's and Don'ts

- Do show prints whole on the wall tone; crop only covers and thumbnails.
- Do keep red for marks, dates and state — never as a background fill.
- Do write labels like a gallery: title, place, date, negative number.
- Don't add cards, gradients or icon rows; rules and whitespace carry the structure.
- Don't put text over photographs.
