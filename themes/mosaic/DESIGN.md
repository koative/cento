---
name: Mosaic
colors:
  paper: "#f3efe7"
  paper-2: "#e9e3d6"
  card: "#faf8f3"
  ink: "#2c2e28"
  ink-2: "#55564d"
  line: "#d6cdbd"
  clay: "#8a4630"
  clay-deep: "#6c3624"
  sage: "#7d8570"
  stone: "#c9bfae"
  grout: "#e3dccd"
typography:
  display:
    fontFamily: Marcellus
    fontWeight: 400
    h1: "clamp(2.6rem, 5.4vw, 5.25rem) / 1.04"
    h2: "clamp(1.85rem, 3.2vw, 2.9rem) / 1.1"
    h3: "1.3rem / 1.25"
    letterSpacing: "-0.01em"
  body:
    fontFamily: Jost
    fontWeight: 400
    fontSize: "1.0625rem"
    lineHeight: 1.6
rounded:
  default: 2px
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  section: "clamp(3.5rem, 8vw, 7rem)"
  wrap: "1360px"
---

# Mosaic design

## Overview

The studio's sample table: a pale linen surface where stone, timber, plaster, metal and cloth are laid out as square tesserae with hairline grout between them. Interior design is sold by touch and light, so the site leads with real rooms and real material swatches, and lets visitors compose and re-light a board themselves. Light mode, because clients browse it by day, often on a phone in the room they want to change.

## Colors

Warm paper (`paper`, `card`) under a green-black `ink`. `clay` (fired terracotta) is the single accent: links, selection, focus rings, the caret, active filters and the role labels on the board. `sage` and `stone` are quiet secondary surfaces; `grout` is the gap colour between tiles. Body text is `ink` or `ink-2` on paper, both above 4.5:1.

## Typography

Marcellus, a flared Roman capital face, carries headings and the spaced wordmark like lettering cut on a showroom plaque. Jost, a geometric sans, carries body, controls and data with tabular numerals for fees, sizes, prices and times. Headings stay at regular weight; scale does the work.

## Layout

A 1360px wrap with fluid gutters. Asymmetric 5/7 and 7/5 splits pair copy with photography; the material library and board use a square-tile grid with 2–4px grout gaps. Below 900px everything linearizes into one column with the image after the heading; the header collapses to a menu button and a board counter.

## Components

- Header with tessera logo, nav with active underline, consultation CTA and a live board counter (four-square glyph that fills as samples are added).
- Project cards (large lead card plus smaller ones), filter chips, selects and search.
- Material cards with a square swatch and a compact add-to-board toggle; material spec lists.
- Sample board: weighted tile composition (field, secondary, accents), daylight dial (range input) that re-lights every swatch, legend with reorder/remove.
- Process timeline drawn as bars across months, redrawn per project scale.
- Booking form with radio tiles for meeting type, day and time; inline errors; confirmation summary.
- Footer with sitemap, contact, hours, newsletter form and the fictional-brand line.

## Motion

One language: materials being set. The hero photograph unveils with a clip-path wipe, board tiles settle in with a short scale-and-fade when added, and the daylight dial shifts warmth and brightness across the board in real time. Everything is visible without JS; `prefers-reduced-motion` removes the wipe and tile animation.

## Do's and Don'ts

- Do show real rooms and real swatches before any claim; name every material with its origin, finish and price.
- Do keep clay to one job per view.
- Don't round corners beyond 2px, add drop-shadowed cards, gradients or icon-card grids.
- Don't put labels above headings or number sections that have no real order; the process stages are numbered because they are a sequence.
