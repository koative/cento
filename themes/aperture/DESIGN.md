---
name: Aperture
colors:
  paper: "#efe8d8"
  paper-2: "#e4dbc6"
  rule-soft: "#cbbfa6"
  ink: "#17130e"
  ink-2: "#4b4236"
  red: "#b42d17"
  red-deep: "#8e2311"
  house: "#121015"
  house-3: "#2f2a33"
  glow: "#f4ead2"
  glow-2: "#b9ad97"
  red-lit: "#e2553a"
typography:
  display:
    fontFamily: Oswald
    weights: [400, 500, 600]
    h1: clamp(2.75rem, 7vw, 6rem) / 0.95, uppercase
    h2: clamp(1.9rem, 3.6vw, 3rem) / 1, uppercase
    label: 0.95rem, uppercase, 0.06em tracking
  body:
    fontFamily: Crimson Pro
    size: 1.1875rem / 1.55
rounded:
  default: 0
  seat: 0.5rem 0.5rem 0.2rem 0.2rem
spacing:
  gutter: clamp(1.25rem, 4vw, 3rem)
  section: clamp(4rem, 9vw, 7.5rem)
  wrap: 1320px
---

## Overview

Aperture is set like a repertory cinema's printed monthly programme: warm newsprint, black ink, a single spot red, condensed listing type and hairline rules. The one dark room on the site is the auditorium itself — the listings board, the film-page projection band, the seat map and the footer go "house lights down". It fits how people use a cinema site: a quick scan for tonight's times on a phone, then a careful choice of seat.

## Colors

Paper and ink carry everything; `red` is the spot colour for actions, formats and dates (5.2:1 on paper). The `house` family is the dark auditorium: `glow` is projected light (selected seats, the screen line), `glow-2` secondary text, `red-lit` the red that survives on black. No gradients except the legibility scrim on the projected still and the ribbed listings board, which is a literal letterboard.

## Typography

Oswald is the marquee and listings voice: uppercase headings, times, labels, buttons, all with tabular numerals. Crimson Pro is the programme-notes voice for synopses, ledes and forms, with italics for programmers' asides. Display tops out at 6rem; tracking never below −0.01em.

## Layout

A 1320px column with section breaks marked by a 3px ink rule, the way a printed programme separates pages. Listings are ruled rows (still · title and credits · times); film pages run a 2.39:1 scope still above a two-column body with screenings and specs in the margin. Pages collapse to one column at 800–960px; the seat map scrolls sideways inside its own frame on phones.

## Components

- Logo: six-blade iris drawn from exact geometry, red pupil.
- Time buttons: square outlined chips with the note (Q&A, Captioned) in red; struck through when started or sold out.
- Listings board: ribbed black letterboard with today's screenings.
- Seat map (signature): curved rows, gangways, wheelchair spaces, roving-tabindex keyboard control; picked seats light up.
- Sightline: top-down SVG showing distance and viewing angle for the active row, also on Home as a row slider.
- Basket: ticket-type steppers that always sum to the seats chosen, Cheap Tuesday pricing.
- Ticket stubs with a perforated tear-off for the confirmation.
- Tiers: one ruled frame, the featured tier inverted.

## Motion

A projector shutter: stills open from a horizontal slit with an overexposed flash (home projection, film pages). Seats flash on when picked, stubs print down, the logo iris turns on hover, pages ease in. All of it drops to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep the dark palette for auditorium moments only; the rest is paper.
- Do keep times in Oswald with tabular numerals.
- Don't add rounded cards or shadows; edges are square and rules do the separating.
- Don't put labels above headings; context goes in the meta line beneath.
