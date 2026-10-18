---
name: Nocturne
colors:
  night: "#110d0b"
  walnut: "#1a1310"
  walnut-2: "#241a15"
  line: "#3b2d24"
  cream: "#f2e7d2"
  cream-2: "#c9b99e"
  brass: "#d4a55a"
  brass-2: "#e8c27f"
  ember: "#e8714a"
  paper: "#efe4cc"
  ink: "#1d1611"
  ink-2: "#5a4838"
typography:
  display:
    {
      family: Limelight,
      sizes: "h1 clamp(2.75rem → 6rem), h2 clamp(2rem → 3.4rem), h3 clamp(1.3rem → 1.6rem)",
    }
  body:
    {
      family: Josefin Sans,
      size: 1.125rem,
      lineHeight: 1.62,
      weights: "300–700",
    }
rounded: { card: 14px, controls: 999px }
spacing: { gutter: "clamp(1.25rem, 4vw, 3rem)", max: 82rem }
---

# Nocturne

## Overview

A basement listening bar after dark: walnut, brass rail, low amber light, and the paper slip where the selector writes down every side played. Guests check it on a phone in a dim room or on the way there, so the site is dark and warm, with paper cards for anything you read closely (menu, slip, confirmation).

## Colors

Near-black `night` with two walnut surfaces and a brown `line`. Text is `cream`, secondary text `cream-2`. `brass` is the single accent for actions, active nav, prices and focus; `ember` marks live states (the open-now lamp, the playing light). Paper surfaces flip to `paper` / `ink` / `ink-2`. Selection, scrollbar, caret, focus ring and form accent all come from these tokens.

## Typography

Limelight, a 1930s nightclub display face, for headings, drink names and the wordmark, never below h3 size. Josefin Sans for body, labels and uppercase button lettering; tabular numerals for prices, times and hours.

## Layout

Wide 82rem frame with generous gutters. Pages open with a large title and a lede, then alternate dense passages (menu lists, specs, slips, forms) with quiet ones (the house rules line, the regular's quote). Grids collapse to one column below 860px; the header switches to a drop-down menu below 900px.

## Components

Menu card on paper with price leaders, drawn glass icons for drinks without photos, date tiles on event rows, spec lists with brass terms, pill chips and selects for filters, a booking form with arrival-time slots and a seat-zone floor plan (authored SVG), a live hire estimate card, and the signature **record-of-the-night player**: a top-down SVG turntable whose arm tracks through each side while a colour-coded timeline of the night can be played or scrubbed.

## Motion

Each page arrives with the lights coming up (opacity, blur and brightness easing out over 0.6s). The record spins and the tonearm moves only while the night is playing. `prefers-reduced-motion: reduce` removes the page transition, the spin and all transitions.

## Do's and Don'ts

- Do keep one brass accent per view and let photographs stay dark and warm.
- Do write every drink and record in the bar's voice, with real specs and times.
- Don't use Limelight for body copy or small labels.
- Don't add eyebrow labels, glows or decorative gradients; the light in the photos is enough.
