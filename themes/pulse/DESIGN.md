---
name: Pulse
colors:
  ink: "#121211"
  ink-2: "#1b1b19"
  ink-3: "#262623"
  line: "#3a3934"
  paper: "#efebe4"
  muted: "#aba79d"
  acid: "#d2fc40"
  violet: "#a990ed"
  coral: "#ff7a59"
  sky: "#74d3e6"
typography:
  display: "Big Shoulders Display, 700–900, uppercase"
  body: "Rubik, 400–600"
  sizes:
    h1: "clamp(3.25rem, 9vw, 6rem)"
    h2: "clamp(2.5rem, 5.4vw, 4.5rem)"
    h3: "clamp(1.5rem, 2.4vw, 2rem)"
    body: "1rem / 1.55"
rounded:
  blocks: 0
  inputs: 2px
  pills: 999px
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 9vw, 128px)"
  max: 1320px
---

## Overview

Pulse is a festival read on a phone in the dark: in the queue, at the bar, between stages. The site is a night ground with one acid-green screen-printed poster on it, set in Chicago-sign condensed capitals, with the speaker cone from the old poster kept as the brand mark. The real use — working out who to see and where to walk — is the centre of the site, so the clash-finder timetable is the signature.

## Colors

Near-black `ink` ground with warm `paper` text. Acid green is the poster colour and the only call to action. Each stage owns a hue (Open Air acid, Turbine violet, Pumphouse coral, Glasshouse sky) used consistently in the timetable, map, tags and artist pages through a `--stage` variable set by `data-stage`. Focus rings and selection are violet; on acid surfaces they flip to ink.

## Typography

Big Shoulders Display for every heading, artist name, price and day label — uppercase, tight leading, never below 0 tracking. Rubik for body, forms and data, with tabular numerals for all times and prices. Poster billing uses three sizes to mirror headline, main and support acts.

## Layout

Wide 1320px column, hairline rules instead of cards. Sections alternate dense (billing, timetable, price list) with quiet (manifesto photo, closing acid band). Tickets are wristband strips with a notched end; the order panel is sticky on desktop and stacks below on mobile.

## Components

Header with ring logo, nav, "My timetable" count and Tickets button; mobile drawer. Day tabs (arrow keys). Timetable grid with sticky stage column and horizontal scroll inside its own frame. Site map: authored SVG with HTML button pins and a detail panel. Waveform glyph generated from each artist's name. Phase bar for ticket tiers. Field component with inline errors. FAQ as native `<details>`.

## Motion

One language: the pulse. Speaker rings breathe out of phase, the active map pin emits a ring, a picked set flashes a ring of its stage colour, artist waveforms breathe, the ticker scrolls. Pages tune in with a short clip reveal. `prefers-reduced-motion` stops all of it.

## Do's and Don'ts

- Do keep stage colours tied to stages; never use them decoratively.
- Do keep times in `content.ts` as 24h strings; sets before noon belong to the previous night.
- Don't add cards or shadows; rules and fills carry the hierarchy.
- Don't put light-on-acid text; acid surfaces always take ink.
