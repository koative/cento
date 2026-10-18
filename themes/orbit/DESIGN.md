---
name: Orbit
colors:
  night: "#08121c"
  night-2: "#0f1e2c"
  night-line: "#243a4f"
  on-night: "#e8edf1"
  on-night-soft: "#a3b4c3"
  paper: "#f3f2ee"
  paper-2: "#e8e7e1"
  white: "#fcfcfa"
  ink: "#0b1622"
  ink-soft: "#47535f"
  line: "#d2d3ce"
  line-strong: "#8d969d"
  orange: "#ff5a1f"
  orange-deep: "#b23a0b"
  glacial: "#a9cde6"
  earth: "#12324d"
  ok: "#24704a"
  error: "#b42318"
typography:
  display:
    {
      family: "Unbounded",
      weights: "400–700",
      h1: "clamp(2.3rem, 3.6vw + 1rem, 4.5rem)",
      hero: "clamp(2.6rem, 5vw + 1rem, 5.25rem)",
      h2: "clamp(1.55rem, 1.5vw + 1rem, 2.45rem)",
      h3: "1.12rem / 600",
    }
  body:
    { family: "Onest", weights: "400–700", size: "1.0625rem", line-height: 1.6 }
rounded: { card: 14px, option: 10px, controls: 6px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 2.75rem)",
    section: "clamp(4rem, 8vw, 7rem)",
    max-width: 1320px,
    header: 64px,
  }
---

# Orbit

## Overview

The world is a launch provider's paperwork and its operations room: the payload user's guide, the dimensioned vehicle drawing, the manifest table, the T-minus clock and the mission patch. Visitors are satellite engineers and procurement leads comparing providers at a desk in daylight, so the working pages are light "document" paper; the night is kept for the moments that are about flight — the hero, the countdown, the quote sheet, mission headers and the footer.

## Colors

Cleanroom `paper` is the page and `white` marks drawing sheets, form fields and selected options. `night` is the launch-night surface with `on-night` text and `on-night-soft` secondary text. International `orange` (remove-before-flight tags, launch towers) is the single action colour: primary buttons with ink text, orbit traces, the T−, step markers and the one partial-failure mark in the flight log. `orange-deep` is the text-safe orange on paper (roles, step dates, chart line). `glacial` and `earth` are kept from the earlier Orbit for the planet in the orbit diagram and patches. Selection is orange on paper and glacial on night; focus rings are orange.

## Typography

Unbounded carries headings, the countdown digits, prices and totals: wide, engineered, set at 500 with −0.025 to −0.035em tracking. Onest carries body, tables, labels and controls. All numbers in tables, clocks, quotes and specs use tabular numerals.

## Layout

A 1320px column with fluid gutters. Home alternates density: night hero with countdown, a dense manifest table, a white sheet with the fleet drawn to one scale, the compact calculator, a quiet full-bleed orbital photograph with one sentence, recent missions, the dated rideshare milestones, the flight log, a customer quote, a night hiring band and a closing booking deadline. Inner pages open with a page head and use two-column splits that collapse under 960px; tables become labelled stacks under 720px.

## Components

- **Rideshare calculator** (`Calculator.tsx`, `lib/quote.ts`): payload type and mass or cubesat size, destination orbit, Wayfarer release altitude, flight with open capacity, services; a night quote sheet with the orbit diagram, line items, early/short-notice adjustment, fixed total, per-kg rate and payment schedule. The quote persists and feeds `/reserve`.
- **Orbit diagram** (`OrbitDiagram.tsx`): Earth with graticule, the orbit traced at true inclination and exaggerated altitude, a satellite that passes behind the planet, real orbital period.
- **Vehicle drawings** (`VehicleDrawing.tsx`): parametric elevations from each vehicle's geometry; silhouettes share one scale on Home, spec sheets carry height, diameter and stage call-outs on a drawing grid.
- **Mission patches** (`Patch.tsx`): generated from mission data — orbit tilt, star count by payloads, mission colour, name and flight on circular text.
- **Flight table and countdown** (`FlightTable.tsx`): NET dates, status dots, open capacity; T-minus clock announced as one sentence for screen readers.
- Forms: labelled fields, native constraints plus custom rules, inline errors naming the fix, disabled sending state, polite live confirmation with focus moved to it.

## Motion

One language: ascent and trajectory. The hero photograph rises into view with a clip from the bottom, pages lift in on route change, and each orbit is traced with a stroke draw while the satellite keeps time with the real period (sped up). The countdown ticks. Everything is visible by default and all motion stops under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep orange for actions and flight-critical marks; never for decoration.
- Do label illustrative scale (altitude ×4, drawing scale) honestly.
- Do keep the drawing grid only behind engineering drawings.
- Don't add eyebrows above headings, gradient text, glass, or hard offset shadows.
- Don't use photographs that show third-party logos or recognisable real vehicles' markings.
