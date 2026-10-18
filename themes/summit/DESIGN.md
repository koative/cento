---
name: Summit
colors:
  chalk: "#f3f1ec"
  chalk-2: "#e8e5dd"
  card: "#fbfaf7"
  ink: "#16181a"
  ink-soft: "#4a4d52"
  line: "#d3cec3"
  line-strong: "#8d877b"
  tape: "#ff5a1f"
  tape-deep: "#b23a0c"
  cave: "#1c1f22"
  on-cave-soft: "#b8b5ad"
  go: "#23794a"
  wall: "#d9d5cb"
  circuits:
    {
      yellow: "#f2c53d",
      green: "#3fae6a",
      blue: "#2f6fdb",
      purple: "#7a4fc9",
      red: "#cf332b",
      black: "#16181a",
    }
typography:
  display:
    {
      family: "Bowlby One",
      weight: 400,
      h1: "clamp(2.6rem, 4.4vw + 1.1rem, 5.25rem)",
      h2: "clamp(1.8rem, 2.2vw + 1rem, 3rem)",
    }
  body:
    {
      family: "Barlow",
      weights: "400–700",
      size: "1.0625rem",
      line-height: 1.6,
    }
rounded: { card: 12px, controls: 6px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 3rem)",
    section: "clamp(4rem, 9vw, 7.5rem)",
    max-width: 1320px,
  }
---

# Summit

## Overview

The world is the floor of a bouldering gym: chalk-dusted grey plywood with its grid of bolt holes, colour circuits, strips of setter's tape with the grade in marker, and the reset whiteboard by the desk. People check the site on a phone before they go (what was reset, is it busy, book a slot) and again on the mats, under bright warehouse light — so the site is light, high-contrast and scannable. The signature is a route map that draws every problem on each wall.

## Colors

Chalk (`chalk`) is the page; `chalk-2` marks quieter bands. Ink is near-black graphite. Tape orange (`tape`) is the single action colour (buttons, the fresh-set tag, the closing band) and always carries ink text; `tape-deep` is its text-safe version for links, labels and focus rings on light surfaces. `cave` is the dark band and footer, with tape for focus rings there. The six circuit colours are data only: they colour holds, grade tags and progress bars, never decoration.

## Typography

Bowlby One sets every page title, section heading, wall name, price and count: blunt, heavy, gym-signage loud, at 0.98–1.05 line height and −0.01em tracking. Barlow does everything else at 400–700, with uppercase 0.06em-tracked micro-labels for data (dt), and tabular numerals for times and prices.

## Layout

A 1320px column with fluid gutters. Home alternates density: hero with the fresh-set tag, the reset rotation as a ruled list, a dark band with the circuit key and the newest wall, a photo+steps split, a dense timetable list, a full-bleed quote, plans, a chalk-2 youth band, events, hours, and a tape-orange close. Interior pages open with a large title and lead, then ruled lists and two-column detail layouts with a sticky side panel. Below 860px everything stacks; the wall drawing becomes horizontally pannable on phones.

## Components

- **WallView**: SVG elevation — clipped wall outline, bolt-hole pattern, panel seams, volumes, kickboard, generated holds per problem (seeded so they're stable), tape tags on start and top holds, a drawn line and a step ring for the selected problem.
- **FloorPlan**: SVG plan of the hall; walls are keyboard-operable buttons with live problem counts.
- **Tag**: circuit tape with torn ends (`clip-path`).
- Segmented buttons, colour chips, steppers, date strip and slot grid, ticket confirmation, `details` FAQ with a drawn plus.
- Forms: labelled fields, inline errors that name the fix, disabled/loading submit, polite live confirmations.

## Motion

One language: reading a route. Selecting a problem draws its line up the wall (stroke-dashoffset), its holds light up in sequence, and the step ring snaps onto each hold. Pages fade up once on arrival; the mobile menu drops in. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep tape orange for actions and the fresh-set tag; don't use it as decoration.
- Do let circuit colours mean grades everywhere they appear.
- Do use the bolt-hole grid only on the wall drawings — it is the wall.
- Don't add eyebrows above headings, glass, gradient text or offset shadows.
- Don't add a second display face; Bowlby One plus Barlow is the whole system.
