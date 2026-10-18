---
name: Iron
colors:
  rubber: "#121211"
  rubber-2: "#1a1a17"
  deep: "#0b0b0a"
  line: "#33322c"
  chalk: "#efede6"
  chalk-dim: "#aaa79d"
  steel: "#5e5d57"
  steel-light: "#a3a198"
  red: "#e2352a"
  blue: "#3c78e8"
  yellow: "#f4c430"
  green: "#34a866"
  error: "#ff8a7f"
typography:
  display:
    {
      family: "Archivo Black",
      case: uppercase,
      tracking: "-0.01em",
      h1: "clamp(2.6rem, 1.2rem + 5.4vw, 6rem)",
      h2: "clamp(1.85rem, 1.2rem + 2.6vw, 3.4rem)",
    }
  body:
    {
      family: "Archivo",
      size: "1.0625rem",
      lineHeight: 1.6,
      labels: "75% width, 650 weight, uppercase, +0.08em",
    }
rounded: { default: "4px" }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 3rem)",
    section: "clamp(3.5rem, 8vw, 7rem)",
    wrap: "1360px",
  }
---

## Overview

Rubber floor and chalk. Iron is a coached barbell gym, and its members check the timetable on a phone at 5am or between sets under strip lights — so the site is dark, high-contrast and blunt. The one system borrowed from the floor itself is the calibrated plate code: red, blue, yellow, green and white mark class families exactly as they mark 55, 45, 35, 25 and 10 lb plates.

## Colors

`rubber` is the page, `rubber-2` the raised surfaces (board, form, summary), `deep` the footer and inputs. `chalk` is text; `chalk-dim` secondary text (7.8:1 on rubber). Plate colours appear only as data: class-family discs, heatmap dots, timeline bars and the plates on the bar. Safety `yellow` is the single action colour — primary buttons, focus ring, selection, active states — and floods the closing band.

## Typography

Archivo Black, uppercase, for every h1/h2 and for names that act like wall signage (plan names, family names, class rows, weights on the bar). Archivo for everything else; its width axis gives condensed 75% labels for data headers, nav and table heads. All times, prices and weights use tabular numerals.

## Layout

A 1360px wrap with fluid gutters. Pages alternate open black sections with tinted bands. Lists are ruled rows rather than cards: class families, plan rows, sessions, specs. The home hero pairs the headline and a live "next on the floor" board with a full-height photo, so the timetable is visible in the first viewport.

## Components

Plate disc (SVG with hub), wordmark with a plate for the O, live board, week heatmap table, timetable grid (7 columns → 4 → single day with a sticky day switcher), class rows with a stretched link, trainer cards in grayscale, the barbell drawing (to-scale plate stacking, colour chips in the caption), programme prescription buttons, week tabs (arrow-key tablist), choice cards and segmented radios, stepper, FAQ disclosures, comparison and rates tables.

## Motion

One authored moment: plates slide onto the sleeves from the ends, heaviest first, whenever the load changes (staggered 45ms, expo ease-out). Supporting: a short rise on page change, a clip-down mobile menu, the wordmark plate and family plates turning on hover, a stamp-in check on join success. `prefers-reduced-motion: reduce` removes all of it.

## Do's and Don'ts

- Do use plate colours only to encode class families or plate weights — never as decoration.
- Do keep yellow for actions and focus; one yellow button per region.
- Do write weights in pounds and show the plate recipe, not just the total.
- Don't add eyebrow labels above headings; the family disc lives in the facts list.
- Don't use cards for structure; rule lines and rows carry the layout.
- Don't round corners beyond 4px — the world is steel and rubber.
