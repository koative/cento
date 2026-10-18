---
name: Surge
colors:
  paper: "#f4f3ee"
  paper-2: "#e9e8e0"
  card: "#fbfaf6"
  ink: "#111412"
  ink-2: "#454c48"
  ink-3: "#6a716d"
  rule: "#d2d1c7"
  lift: "#d7ff3c"
  control: "#b7bdb9"
  drop: "#b02f1b"
typography:
  display:
    {
      family: Kanit,
      weights: [500, 600, 700, 800],
      italic: "figures, lifts, day names",
    }
  body: { family: Inter Tight, size: 1.0625rem, line-height: 1.6 }
  sizes:
    {
      h1: "clamp(2.5rem, 1.45rem + 4.2vw, 5.5rem)",
      xl: "clamp(2rem, 1.35rem + 2.6vw, 3.75rem)",
      lg: "clamp(1.7rem, 1.25rem + 1.6vw, 2.6rem)",
    }
rounded: { card: 14px, control: 8px, chip: 999px }
spacing:
  {
    section: "clamp(4rem, 3rem + 4vw, 7.5rem)",
    gutter: "clamp(1.25rem, 4vw, 3rem)",
  }
---

# Surge — design

## Overview

The Monday readout. Growth teams live by the weekly results sheet: a hypothesis, a control, a variant, a lift and a confidence. Surge's site is printed on that sheet — bright paper, ink rules, big numbers — with one fluorescent highlighter reserved for what won. It is light because the audience (founders and marketing leads comparing agencies) reads it on laptops at a desk in daylight, scanning for proof.

## Colors

Paper and ink carry everything. `lift` (#d7ff3c) is a highlighter, never text on paper: it fills winning variant bars, headline figures, the active nav mark, selected options and the primary button, always with ink on top or an ink edge. `control` grey is the A bar. `drop` red is only for errors and negative returns. Dark ink sections (the hero board, ROI teaser, page close) are the "screen in the meeting room".

## Typography

Kanit 700 for headings, tight leading (0.95) and −0.025em tracking at display size. Kanit italic 700–800 is the "surge" voice for figures: lifts, case headline numbers, day names, the wordmark. Inter Tight for body and UI. Tabular numerals in every readout, table, price and output.

## Layout

A 1320px sheet with ink rules between rows instead of cards: the service index, service sheet, roles list and experiment logs are ruled lists. Cards appear only where an object is held (plans, funnel, ROI controls). Split heads put the heading left and the argument right. Sections alternate paper and paper-2; dark bands close.

## Components

- Readout row — test name, hypothesis, metric; A and B bars where B grows out of A's length; signed lift, confidence and a "Ship it" / "Inconclusive" call computed from the data.
- Case card — photo with a lift chip, client and headline; whole card is one link.
- Funnel — before/after bars on a square-root scale with the numbers printed.
- ROI model — sliders and option cards on the left; revenue band chart (SVG with HTML labels), cumulative-return bars crossing zero at payback, facts row, monthly table, "attach to proposal".
- Forms — labelled fields, ink focus with a lime halo, red dot errors that name the fix, option cards for checkboxes/radios.

## Motion

One language: the variant bar grows from the control's length to its own (staggered per row), and the ROI chart wipes in from the left. Pages rise 10px on route change; the mobile menu unrolls with clip-path. Everything is visible without motion and `prefers-reduced-motion` removes it.

## Do's and Don'ts

- Do put a number next to every claim and leave the losing tests in.
- Do keep lime as a fill under ink; never as text on paper.
- Don't add cards around rows that a rule already separates.
- Don't add eyebrow labels; the readout's client line is data, not a kicker.
- Don't decorate charts — every mark is a value.
