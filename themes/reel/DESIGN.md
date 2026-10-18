---
name: Reel
colors:
  bg: "#131210"
  surface: "#1c1a17"
  surface-2: "#24211d"
  line: "#34312b"
  line-strong: "#514c42"
  ink: "#f2ecdc"
  muted: "#b5ac98"
  accent: "#e8a463"
  accent-ink: "#1a1107"
  subtitle: "#fff4cf"
  ok: "#b4d69a"
  danger: "#ff9f8a"
typography:
  display:
    fontFamily: "Bebas Neue"
    fontSize: "clamp(3.25rem, 1.6rem + 5.4vw, 6rem)"
    lineHeight: 0.9
    letterSpacing: "0.005em"
  section:
    fontFamily: "Bebas Neue"
    fontSize: "clamp(2.1rem, 1.5rem + 2.1vw, 3.4rem)"
  body:
    fontFamily: "Inter Tight"
    fontSize: "1.0625rem"
    lineHeight: 1.6
rounded:
  default: "2px"
  chip: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 3rem + 4vw, 7.5rem)"
  wrap: "1320px"
---

# Reel

## Overview

The world is a grading suite and a village-hall screening: a warm, unlit auditorium black, cream like projected light and one amber for the projector lamp. Documentary audiences browse in the evening and decide by watching, so the first viewport is a trailer, and the site borrows its furniture from film itself — letterboxes, timecode, subtitles, poster billing blocks and a production board.

## Colors

`bg` and `surface` are two steps of auditorium black separated by hairline `line` rules. `ink` (cream) carries text; `muted` is a warm grey that stays above 7:1 on `bg`. `accent` amber marks the one thing to do next (buttons, the current production stage, active subtitles' speaker), never decoration. `subtitle` is the slightly yellowed white of burnt-in subtitles. `ok` and `danger` are reserved for ticket and form states.

## Typography

Bebas Neue, condensed caps, sets every title the way a poster or a title card would: page titles, film names, dates, credits. Inter Tight sets everything people read at length, at 17 px with a 65–75ch measure. Timecode, dates and rates use tabular numerals.

## Layout

A 1320 px wrap with fluid gutters. Pages alternate dense bands (dates, programme, rate card) with quiet ones (pull quote, close). The home slate is a zig-zag of wide and narrow frames; film pages run head → player → facts beside synopsis → stills mosaic → centred billing block. Below 900 px everything stacks; below 600 px the programme and dates collapse to two columns.

## Components

- **Trailer player** (signature): 16:9 frame with stills that drift and dissolve, 2.39:1 letterbox bars that close in when playing, burnt-in subtitles, a scrubber marked with every cut, `HH:MM:SS:FF` timecode, subtitle toggle, full screen, keyboard (Space/K, J/L, C), a transcript with jump-to-line timecodes and an end card linking to screenings.
- **Production board**: four stage cells per film in progress, the current stage in amber.
- **Film card**: still, Bebas title, status chip for unreleased films, meta line, logline.
- **Programme row**: date and time, film, venue, kind and a ticket state.
- **Billing block**: role labels over names, centred like a poster.
- Hairline lists instead of cards for services, team, festivals and facts; `details` disclosures for FAQ and transcript.

## Motion

One language: the letterbox. Each page opens from a 7% letterbox with a soft fade, the player's bars close to 2.39:1 when it starts, and stills drift slowly while dissolving. With reduced motion the stills hold still and every animation is cut to a single frame.

## Do's and Don'ts

- Do let the films' images and titles carry the page; keep amber for the next action.
- Do write subtitles, credits and dates in the film world's own conventions.
- Don't add eyebrows above headings, icon-card grids or decorative gradients.
- Don't use real festivals, venues or press in sample content.
