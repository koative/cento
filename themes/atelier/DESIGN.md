---
name: Atelier
colors:
  paper: "#f2f1e9"
  paper-2: "#e7e6db"
  sheet: "#fbfaf5"
  ink: "#1d201b"
  ink-soft: "#4f5649"
  line: "#cfcfc3"
  line-strong: "#7d8277"
  cobalt: "#244bff"
  cobalt-deep: "#1734d6"
  cobalt-ink: "#dfe5ff"
  citron: "#e9ff65"
  coral: "#fc6b49"
  error: "#b23a1d"
typography:
  display:
    {
      family: "Syne",
      weights: "600–700",
      h1: "clamp(2.9rem, 1.4rem + 5.6vw, 6rem)",
      h2: "clamp(2rem, 1.3rem + 2.4vw, 3.4rem)",
      h3: "clamp(1.2rem, 1.05rem + 0.5vw, 1.5rem)",
      tracking: "-0.03em to -0.01em",
    }
  body:
    {
      family: "Albert Sans",
      weights: "400–700",
      size: "1.0625rem",
      line-height: 1.6,
    }
rounded: { art: 4px, cards: 12px, controls: 999px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 3rem)",
    section: "clamp(4rem, 9vw, 8rem)",
    max-width: 1360px,
  }
---

# Atelier

## Overview

The world is the studio's crit wall: work printed out and pinned up, a long table, a risograph in the corner, Friday afternoon reviews. Visitors are marketing leads and founders comparing studios on a laptop in daylight, and designers checking jobs on a phone, so the site is light paper with one loud cobalt band, and the work itself (authored posters, cartons, screens and signs for eight fictional clients) does most of the talking.

## Colors

Paper is the wall, sheet is the printout. Cobalt is the studio's own colour: the header, the home hero, the closing band, step numbers and selected service tiles. Citron is the highlighter: the asterisk, primary buttons on cobalt, hover sweeps on index rows, the studio band and success states. Coral appears only in client work and the team tiles. Secondary text is `ink-soft`, never grey; on cobalt it is `cobalt-ink`. Selection is citron on ink, the caret and scrollbar are cobalt, focus rings are cobalt on paper and citron on cobalt or ink.

## Typography

Syne carries headings, client names, prices on index rows and every word set inside the artwork; its wide, slightly odd letterforms are the agency's voice. Albert Sans handles body, labels and controls. Tracking never goes below −0.03em. Numbers in tables, fees, years and the brief sheet use tabular figures.

## Layout

A 1360px column with fluid gutters. Home alternates density: the cobalt hero with four covers already in the first viewport, a staggered two-column work grid, a quiet run of client names, the dense services index, the citron studio band, a four-step process, a single quote, open roles, and the cobalt close. Case studies run cover → facts → brief → artefacts → approach → artefacts → quote → outcomes → CTA. Artefact rows share one height by giving each figure a flex-grow equal to its aspect ratio.

## Components

- **Cover / Artifact** (`components/Art.tsx`): SVG posters, business cards, browser and phone screens, cartons and cans, wayfinding signs, colour specs and motion frames, all drawn from each client's palette, wordmark and mark. Text sizes are fitted to their boxes.
- **Marks** (`components/Mark.tsx`): the studio asterisk and nine client marks as geometry in a 100-unit box.
- **Sculpture**: the home asterisk turns 45° per press and names the next discipline (polite live region).
- **Work index**: pill filters with counts, search, sort, grid/index toggle; index rows highlight citron and drive a sticky cover preview.
- **Brief builder**: six fieldsets with pill radios and service tiles; a taped "brief sheet" fills in as you go and estimates team, weeks, starting fee and the closest case study, warning when the budget is below the fee.
- Forms: labelled fields, inline errors that name the fix, disabled/loading submit, focused live success panels.

## Motion

One language: pinning work to the wall. Pages rise in, covers tilt and lift on hover, the case cover and index preview pin up with a slight overshoot, the asterisk spins on a spring, index rows sweep citron from the left, and brief-sheet answers flash citron when they change. Content is visible without JS; `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep cobalt for the studio itself and let client colours live only inside the work.
- Do draw client work as geometry; never fake it with photos of real brands.
- Do keep photos to the studio's own world: crit wall, print room, desks.
- Don't add eyebrows above headings, glass, gradient text or offset block shadows.
- Don't add a second display face; Syne plus Albert Sans is the whole system.
