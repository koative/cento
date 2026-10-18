---
name: Terrain
colors:
  paper: "#eeeae0"
  paper-2: "#e3dfd0"
  card: "#f7f5ee"
  ink: "#1e261e"
  ink-soft: "#4a5345"
  forest: "#263026"
  rust: "#a44126"
  sign: "#f0c02f"
  contour: "#b5a27c"
  line: "#cfc9b4"
  blaze-blue: "#2f5f8a"
  blaze-red: "#b8361f"
  blaze-black: "#1e261e"
typography:
  display:
    {
      family: "Anybody",
      width: "78–92% (condensed), 128% for the wordmark",
      weight: "720–820",
      h1: "clamp(2.6rem, 1.3rem + 4.8vw, 5.75rem)",
      h2: "clamp(1.9rem, 1.2rem + 2.4vw, 3.3rem)",
      h3: "clamp(1.2rem, 1.05rem + 0.5vw, 1.45rem)",
    }
  body:
    {
      family: "Overpass",
      weights: "400–800",
      size: "1.0625rem",
      line-height: 1.6,
    }
rounded: { card: 14px, field: 8px, controls: 6px, sign: 3px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 2.75rem)",
    section: "clamp(4rem, 9vw, 7.5rem)",
    max-width: 1320px,
  }
---

# Terrain

## Overview

The world is the trail itself: yellow fingerpost signs at a junction, painted waymarks on rock, the brown contour lines of a topographic sheet and the elevation strip printed on a hut leaflet. People plan these trips at home on a laptop or phone in daylight, comparing dates and days, so the site is light, paper-toned and dense where planning happens (departure board, comparison table, day tables).

## Colors

Map-paper `paper` is the page; `card` lifts working surfaces (trip cards, forms, map sheet); `paper-2` marks quieter bands and the day-by-day section. `forest` carries the dark sections and footer. `rust` is the one action colour (buttons, links, the active route leg and profile segment). `sign` yellow is reserved for fingerposts, highlights on dark and selection. Grades use the Alpine waymark colours blue, red and black as white–colour–white blazes. Contours are survey brown. Secondary text is `ink-soft`, never grey; focus rings are rust on light and yellow on dark.

## Typography

Anybody, a variable-width grotesque, is set condensed and heavy for headings, numbers and dates, like route signage; the wordmark uses it expanded at 128%. Overpass, derived from highway sign lettering, does body, labels and the sign plates. All distances, dates, prices and altitudes use tabular numerals. Separators use the bullet because Overpass's middle dot has no advance width.

## Layout

A 1320px column with fluid gutters. Home alternates scale and density: photo hero with a signpost, a dense departure board, a featured mosaic, the grade scale ruler, a quiet quick finder, a timed day list, guides, a dark philosophy band, traveller notes, a gear teaser and a dark closing signpost. Detail pages put specs and the price box first, then the day-by-day explorer as the centrepiece.

## Components

- **Signpost** (`components/Signpost.tsx`): a white location plate on a metal pole with yellow arrow plates alternating direction; each plate is a route link with date or fit and a grade blaze.
- **Blaze** (`components/Marks.tsx`): painted waymark showing the grade.
- **RouteMap**: authored topo sheet; contour rings generated around summits, one smooth leg per day, dashed transfers, numbered day markers, the active leg drawn in rust.
- **Profile**: elevation profile built from each day's altitude samples spread over its distance; the active day is clipped and tinted; compact variant in finder results.
- **RouteExplorer**: day tabs (arrow keys, Home/End) driving the map, the profile and the day panel together.
- Forms: labelled fields, inline errors naming the fix, disabled loading submit, polite live confirmation.

## Motion

One language: arriving at a junction. Sign plates swing on their pole into place, the active route leg draws itself along the map, the day panel rises, pages ease in. All of it is removed under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep yellow for signs and highlights on dark; rust for actions only.
- Do keep the map and profile honest: label them illustrative, derive totals from the day data.
- Do use real, location-specific photographs for every trip.
- Don't add eyebrows above headings, glass, gradient text or hard offset shadows.
- Don't introduce a third typeface; Anybody plus Overpass is the system.
