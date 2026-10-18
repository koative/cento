---
name: Still
colors:
  paper: "#f6f1ee"
  paper-2: "#fbf8f6"
  lavender: "#e4dcea"
  lavender-2: "#d3c6df"
  ink: "#3b2232"
  ink-2: "#644a5b"
  accent: "#8c3f69"
  error: "#a3283c"
  dusk: "#2b1a26"
  on-dusk: "#f3ebf2"
typography:
  display:
    {
      family: Fraunces,
      axes: "SOFT 100, opsz auto",
      weights: "340–420",
      sizes: "h1 clamp(2.75rem → 5.75rem), h2 clamp(2rem → 3.25rem), h3 1.375rem",
    }
  body: { family: Nunito Sans, size: 1.0625rem, line-height: 1.65 }
rounded: { image: 14px, panel: 16px, field: 10px, control: 999px }
spacing:
  {
    gutter: "clamp(20px, 5vw, 72px)",
    section: "clamp(72px, 10vw, 152px)",
    max-width: 1360px,
  }
---

## Overview

A studio at the hour of the evening class: chalk-white walls, lavender light, a plum dusk outside the windows. The site reads like the printed timetable on the front desk and the soft voice of the teacher: an unhurried serif, generous space, and a breathing dial that slows the page down. It suits a studio whose promise is calm, plain-spoken teaching rather than fitness energy.

## Colors

Paper and lavender carry the day; plum ink for text; mulberry accent for emphasis, active states and effort bars. Dusk is reserved for the breathing guide, the "Up next" strip and the footer — the moments when the lights go down. Class families are colour-keyed: Move (mulberry), Soften (lilac), Settle (sage).

## Typography

Fraunces with the SOFT axis fully on for every heading, italic for emphasis and the wordmark; Nunito Sans for body and interface. Times and prices use tabular figures. Tracking never below −0.03em.

## Layout

Wide 1360px container with fluid gutters. Home alternates dense passages (class list with preview, week grid) with quiet ones (statement, quotes). Schedule rows are timetable lines: time, class, teacher/room, effort, places, book. Detail pages pair a facts list with a large photograph.

## Components

Header with active underline and a mobile menu below 1080px; day strip; filter chips; session row; effort scale (four rising bars); class tile; teacher roster rows; plan panels with monthly/yearly segmented toggle; native `<details>` FAQ; booking form with radio "pay" options and a sticky summary; authored SVG floor plan and street map.

## Motion

One page settle (opacity, 5px blur, 6px lift) on route change; the class preview develops from desaturated on hover; the breathing dial scales with eased inhale/exhale while a dot travels the phase track. `prefers-reduced-motion` removes all animation and keeps the dial static with the phase word and countdown.

## Do's and Don'ts

Do keep copy plain and specific; offer the smaller version of everything. Do keep dusk for rest moments. Don't add eyebrow labels, stat rows, music-video energy or bright gym colours. Don't gate content on animation.
