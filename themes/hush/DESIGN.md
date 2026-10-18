---
name: Hush
colors:
  paper: "#e9e7e1"
  paper-2: "#f3f2ee"
  tile: "#dcd9d1"
  ink: "#17191b"
  ink-2: "#4b4f53"
  line: "#cbc7be"
  signal: "#e0552b"
  signal-ink: "#b23f1a"
  night: "#131517"
  mist: "#b4bcc1"
typography:
  display:
    {
      family: "SUSE",
      weight: 300,
      size: "clamp(2.6rem, 6vw, 5.5rem)",
      tracking: "-0.035em",
    }
  heading: { family: "SUSE", weight: 350, size: "clamp(1.85rem, 3.4vw, 3rem)" }
  body: { family: "SUSE", weight: 400, size: "1.0625rem", lineHeight: 1.6 }
rounded: { card: "14px", media: "20px", control: "999px", field: "10px" }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4.5rem, 9vw, 8.5rem)",
    wrap: "1320px",
  }
---

## Overview

Hush is set in the quiet room: the felt-grey of acoustic foam and packaging pulp, graphite ink, and one signal-orange LED, the colour of the light that says cancelling is on. The site speaks the language of acoustic measurement (log-frequency charts, dB(A) readouts, microphone maps) because that is how this sector proves its claims, while the photography shows the loud places people actually wear headphones: the metro, the cabin, the open office, the café.

## Colors

Paper `#e9e7e1` is the page; `paper-2` lifts forms and summaries; `tile` holds product drawings. Ink `#17191b` for text and primary buttons, `ink-2` for secondary text (6.9:1 on paper). Signal `#e0552b` is used only for the LED, the residual-noise line, active-nav underlines and best-in-row dots; `signal-ink` `#b23f1a` is its AA-safe text form for errors and focus rings. Night `#131517` with mist text carries the noise lab and footer: the one dark room on the page.

## Typography

SUSE throughout. Display at weight 300 with −0.035em tracking so headings feel hushed rather than shouted; headings 350; body 400 at 17px; medium 500 for names, prices and labels. All figures use tabular numerals.

## Layout

A 1320px wrap with fluid gutters, asymmetric 5/7 and 7/5 splits, and full-bleed bands only for the noise lab and the night-train image. Lists are hairline-ruled rather than boxed; cards are reserved for product tiles.

## Components

Authored SVG product elevations (over-ear, folding, on-ear with boom, buds, sleep buds, cushions, case) recolour from `--shell`/`--trim`; radio-based swatches, chips and scene pickers; pill buttons; quantity stepper; hairline spec and compare tables; disclosure FAQ with drawn plus/minus; step list with tick-off progress; sticky order summary.

## Motion

Pages arrive slightly blurred and sharpen into focus (noise settling into quiet). The noise lab animates its spectrum paths with `d` transitions; microphones pulse like listening sensors; the frequency-response line draws itself once. The mobile menu unrolls with clip-path. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep signal orange rare: it means "on", "best" or "error".
- Do label modelled figures honestly, as the noise lab does.
- Don't add eyebrow labels, icon-card rows or glassy overlays.
- Don't use stock photos of branded headphones; product imagery is drawn so colourways stay exact.
