---
name: Alloy
colors:
  paper: "#eceae4"
  paper-2: "#e1ded5"
  paper-hi: "#f7f6f2"
  ink: "#161714"
  ink-2: "#4b4e47"
  line: "#c2beb2"
  signal: "#f2c11d"
  signal-pale: "#fbeec0"
  dark: "#161714"
  on-dark: "#eceae4"
  on-dark-2: "#b3b4ab"
  error: "#a3241a"
typography:
  display:
    {
      family: Anton,
      case: uppercase,
      h1: "clamp(2.75rem, 1.7rem + 4.4vw, 5.75rem)",
      h2: "clamp(2rem, 1.45rem + 2.2vw, 3.5rem)",
      leading: 0.96,
    }
  body:
    {
      family: Barlow,
      size: 1.0625rem,
      leading: 1.55,
      weights: [400, 500, 600, 700],
    }
rounded: 0
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 3rem + 4vw, 7.5rem)"
---

## Overview

Site hoarding meets the drawing register. Alloy speaks like the plywood panel outside a job: concrete-grey paper, black condensed lettering, one signal yellow for anything you act on. Underneath sits the language of construction drawings — title blocks, ruled schedules, grid-lined elevations — because the people who hire a contractor (developers, public-works officers, facilities directors) read programmes and quantities for a living, mostly at a desk in daylight. Hence a light theme with one dark "drawing board" band.

## Colors

Paper `#eceae4` and ink `#161714` carry almost everything. Signal yellow `#f2c11d` is a fill only (buttons, status tags, the hoarding, active programme bars), always with ink text. Dark bands use `#161714` with `#b3b4ab` secondary text. Errors are `#a3241a` on paper and `#ff9e92` on dark. Selection, caret, scrollbar and focus rings all come from these tokens.

## Typography

Anton, uppercase, for h1/h2, project names in feature cards, the safety figure and the programme status line. Barlow for everything else, with uppercase 600–700 small labels for table headers and title-block cells, and tabular numerals for every figure (`.num`).

## Layout

1320px max width. Sections alternate density: dense ruled lists and tables, a quiet single-figure safety band, a full-bleed dark drawing band, a yellow close panel. Lists are ruled (2px ink top rule, 1px hairlines) rather than carded. Project pages open with a photo beside a title-block `dl` of contract facts and quantities.

## Components

- **Build sequence** (signature): an SVG elevation drawing that builds as you scrub a range input through the programme week by week — substructure and piles, frame floors rising with a tower crane, cladding, lit windows during fit-out, hoarding removed and trees at handover. Bridges draw piers, deck pours on falsework, or (truss rehab) old steel turning new under a moving containment rig. Beside it: status line, week/month/crew readout, play/pause, "back to this week", and a Gantt with a live week marker.
- Project card with status tag and stretched link; filter chips and segmented controls with `aria-pressed`.
- Forms: `Field` wrapper with label, hint, inline error naming the fix; segmented radio mode switch; live estimate panel.
- Header with underline active state; below 960px a full-panel menu in Anton.

## Motion

One page-enter rise (12px, expo ease-out from 35% opacity), the progress meters growing on the home page, the mobile menu wiping down, and the build sequence itself. `prefers-reduced-motion: reduce` removes all animation and smooth scrolling.

## Do's and Don'ts

- Do keep yellow as a fill with ink text; never yellow text on paper.
- Do show real programme data (weeks, crews, quantities) instead of decorative stats.
- Don't round corners; don't add shadows — elevation is a 2px ink rule.
- Don't add kicker labels above headings; the heading speaks.
