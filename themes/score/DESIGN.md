---
name: Score
colors:
  paper: "#f4efe3"
  paper-2: "#ebe4d3"
  sheet: "#fbf8f0"
  ink: "#1c1915"
  ink-2: "#4e473d"
  rule: "#cdc3ae"
  rule-strong: "#8a8070"
  pencil: "#b0322a"
  urtext: "#1c3657"
  on-urtext-2: "#c5d0de"
typography:
  display:
    fontFamily: "Brygada 1918"
    fontWeight: 500
    h1: "clamp(2.6rem, 5.6vw, 5.25rem)"
    h2: "clamp(1.9rem, 3.4vw, 3rem)"
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Albert Sans"
    fontSize: "1.0625rem"
    lineHeight: 1.6
rounded:
  photo: "14px"
  field: "6px"
  sheet: "4px"
  control: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 9vw, 7.5rem)"
  wrap: "1240px"
---

# Score design

## Overview

The edition. Score is set like a printed music edition: ivory engraving paper, black ink, a teacher's red pencil for the marks that matter, and the deep blue of an urtext cover for the moments you play. Parents and adult learners browse it at home, often on a phone in the evening, so the site is light, calm and legible; the music school's own objects (staff lines, bar numbers, contents pages with dotted leaders, concert programmes) do the structural work instead of generic cards.

## Colors

- `paper` is the page, `paper-2` the slightly darker sheet behind recitals, tools and the coda; `sheet` is the brightest white for printed objects (manuscript, concert programme, trial summary) and form fields.
- `ink` for text and staff lines, `ink-2` for secondary copy (8:1 on paper).
- `pencil` red is used sparingly: bar numbers, role labels, active nav underline, current playback note, focus rings, selection, errors.
- `urtext` blue carries the playable keyboard band, the building section on About and the footer.

## Typography

Brygada 1918 (500, with real italics) for headings, programme names, prices, pieces and quotes — italics mark repertoire titles as they would in a printed programme. Albert Sans for body and interface. Small uppercase labels (0.04–0.12em tracking) for metadata only, never above headings. Tabular lining numerals on prices, times, dates and the metronome readout.

## Layout

A 1240px measure with generous section spacing. Asymmetric two-column compositions (0.8 : 1.4) for heading + content, rules instead of boxes. Lists are typeset: the Home contents page uses dotted leaders, recital rows lead with a large day numeral, fee rows read like a price list. Photos sit in 14px-rounded frames; printed objects (manuscript, concert programme, trial summary) are 4px sheets with a soft offset shadow.

## Components

- **Bar system**: ordered steps drawn as measures on a five-line staff, with barlines between and a final double barline; red-pencil bar numbers carry the real sequence.
- **Keyboard + staff** (signature): C4–E5 keyboard, mouse/touch or A–; and W–P on the computer keyboard; each note is engraved on an SVG treble staff (ledger lines, sharps, stem direction), replayed with original timing.
- **Metronome** with Web Audio lookahead scheduling, tap tempo, 2/4–6/8 and tempo marking; **tuning notes** as sustained drones.
- **Trial booking**: fieldsets with pill radios, live slot grid from teacher hours, sticky summary sheet, inline errors that name the fix, loading and confirmation states.
- **Coda**: each page closes on a centred heading under a short staff ending in a final barline.
- Buttons: ink pills (primary turns pencil on hover), outlined ghost, light on blue.

## Motion

One language: notes are engraved — noteheads scale in as you play, the booked check mark lands the same way. Pages fade up 10px on route change; the mobile menu drops in. Everything is visible by default; `prefers-reduced-motion` collapses all animation and transition.

## Do's and Don'ts

- Do use the sector's print culture (staff, barlines, leaders, programmes) as structure, with exact geometry.
- Do keep red pencil rare enough to mean something.
- Don't add eyebrows above headings, icon-card grids, gradients or decorative blur.
- Don't use the blue for more than one band per page outside the footer.
