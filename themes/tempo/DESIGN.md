---
name: Tempo
colors:
  paper: "#f4f2ea"
  paper-2: "#e8e5d8"
  ink: "#1d1b36"
  ink-2: "#4a4766"
  lime: "#d9ff66"
  lime-soft: "#f0ffc4"
  cobalt: "#4d42ba"
  cobalt-light: "#9b93ff"
  on-ink: "#f4f2ea"
  on-ink-2: "#bdbad6"
  alert: "#b8320d"
typography:
  display:
    fontFamily: '"Dela Gothic One", sans-serif'
    fontWeight: "400"
    hero: clamp(2.5rem, 8.4vw, 6rem)
    page: clamp(2.3rem, 6.2vw, 5.25rem)
    section: clamp(1.9rem, 4.2vw, 3.4rem)
    lineHeight: "1.02"
    letterSpacing: -0.01em
  body:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: 1.0625rem
    lede: clamp(1.1rem, 1.5vw, 1.3rem)
    lineHeight: "1.6"
rounded:
  control: 999px
  sm: 6px
  lg: 14px
spacing:
  gutter: clamp(1rem, 4vw, 3rem)
  section: clamp(4rem, 9vw, 7.5rem)
---

# Tempo

## Overview

The front-desk timetable board of a busy neighbourhood dance studio, set like a club flyer: acid-lime paper, deep ink-indigo type, heavy Dela Gothic One headlines and a cobalt beat running underneath. People check it on a phone between work and class, so the schedule, spots left and the $15 trial are always one tap away, and the site is light because it is read in daylight and studio fluorescents, not at the club.

## Colors

- **Paper `#f4f2ea`** is the default surface; **paper-2** marks quieter bands (pass helper, home close).
- **Lime `#d9ff66`** is the poster colour: the hero, the tap pad, selection, picked classes (`lime-soft`) and every accent on ink.
- **Ink `#1d1b36`** carries text, primary buttons and the dark bands (tap-tempo finder, My week panel, footer). On ink, secondary text uses `on-ink-2`, never grey.
- **Cobalt `#4d42ba`** is hover, caret and the scrolling style band; `alert` is reserved for validation errors.

## Typography

Dela Gothic One (one weight) sets h1/h2 only, tracked at −0.01em and balanced, max 6rem. Outfit (300–800) does everything else: h3 at 650, body 17px at 1.6, measure held to ~70ch. Prices, times and spot counts use tabular numerals.

## Layout

A 1376px (86rem) wrap with fluid gutters. Home opens on a two-column hero (headline, tilted studio photo, "tonight on the floor" board) and alternates paper, ink and paper-2 bands of different density. The timetable is a seven-column board beside a sticky My week panel; below 1100px it collapses to day tabs, below 1200px the panel drops under the board. Style and event pages lead with a full-bleed photo and a facts strip.

## Components

- **Class item**: time, title linked to its style, teacher/studio meta, level and spots (low counts highlighted), an Add toggle (`aria-pressed`) and an overlap warning.
- **My week panel** (signature): pinned classes, cost bars for every pass that covers the habit, cheapest flagged, persisted in localStorage.
- **Tap-tempo finder**: a round lime pad that turns taps into BPM and lights the matching styles on an authored SVG/CSS tempo map, with a ring pulsing at the tapped beat.
- **Chips and toggles**: pill radio groups for styles, the month/6-month pass toggle.
- **Forms**: labelled fields with hints, inline errors naming the fix, loading spinner and an `aria-live` confirmation.
- **Buttons**: pill shaped, ink with lime text, line variant, lime variant on ink.

## Motion

One rhythm language: pages enter with a short rise, the cobalt band scrolls style names like a marquee, the tap ring pulses at the tapped tempo and the logo's four count-in bars beat on hover. Everything is visible without JS; `prefers-reduced-motion` stops all animation and transitions.

## Do's and Don'ts

- Do keep lime for the poster moments and selection; never set body text in lime on paper.
- Do keep real schedule data (times, spots, prices) in the first viewport of Home and Timetable.
- Don't add eyebrow labels, section numbers or stat rows; headings carry the voice.
- Don't round cards beyond 14px or add shadows; elevation comes from ink/lime surfaces and 1–2px rules.
