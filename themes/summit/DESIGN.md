---
name: Summit
description: A climbing route wall and grade-led route finder with a local tick list.
colors:
  paper: '#e8e3d5'
  ink: '#263d31'
  header-tone: '#a6ad9b'
  wall-key-tone: '#b0b6a4'
  grade-filter-button-aria-pressed-true-ink: '#f2f2e8'
  route-detail-surface: '#d8deca'
  tick-ink: '#f0f1e8'
typography:
  display:
    fontFamily: '"Barlow Condensed"'
    fontSize: 75px
    lineHeight: '0.95'
    fontWeight: '600'
    letterSpacing: -0.02em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Barlow Condensed"'
    fontSize: 36px
    lineHeight: normal
    fontWeight: '600'
  headline-context-2:
    fontFamily: '"Barlow Condensed"'
    fontSize: 60px
    lineHeight: '0.98'
    fontWeight: '500'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Barlow Condensed"'
    fontSize: 33px
    lineHeight: normal
    fontWeight: '600'
  body:
    fontFamily: '"DM Sans", sans-serif'
rounded:
  observed-1: 50%
spacing:
  observed-1: 20px
  observed-2: 8px
  observed-3: 15px
components:
  navigation:
    textColor: '#263d31'
  route-detail:
    backgroundColor: '#d8deca'
    padding: 25px
    textColor: '#263d31'
  grade-filter-button:
    textColor: inherit
    padding: 10px 15px
    backgroundColor: transparent
---

# Design System: Summit

## Overview

**Creative North Star: "Printed climbing topo with chalk-white holds and forest linework"**

Printed climbing topo with chalk-white holds and forest linework. A climbing route wall and grade-led route finder with a local tick list.

This records the implemented climbing gym template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Climbing gym composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Header Tone**: context-specific authored color.
- **Wall Key Tone**: context-specific authored color.
- **Grade Filter Button Aria Pressed True Ink**: context-specific authored color.
- **Route Detail Surface**: context-specific authored color.
- **Tick Ink**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold, Barlow Condensed Black. Local faces: normal / 500, normal / 600, normal / 700, normal / 800, normal / 900.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`700 31px "Barlow Condensed"`).
- wall intro h1 uses the font shorthand (`600 75px/0.95 "Barlow Condensed"`).
- wall label uses the font shorthand (`600 36px/0.9 "Barlow Condensed"`).
- route panel h2 uses the font shorthand (`600 36px "Barlow Condensed"`).
- route detail h3 uses the font shorthand (`600 33px "Barlow Condensed"`).

## Layout

- **Wall section**: padding (50px 4vw 60px); grid-template-columns (minmax(0, 1.65fr) minmax(300px, 1fr)); gap (0 50px).
- **First climb**: grid-template-columns (1fr 1fr).
- **Club note**: padding (80px 5vw); grid-template-columns (0.3fr 1.2fr 1fr); gap (35px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 1000px)`, `(max-width: 700px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 700px): first climb changes to grid-template-columns (1fr).
- @media (max-width: 700px): club note changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- wall key i: corners (`50%`).
- grade: corners (`50%`).

## Components

Choose a grade and route; mark routes in the local tick list.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Route Detail

Authored route detail styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Grade Filter Button

Authored grade filter button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- grade filter button[aria pressed="true"]: background (#263d31); color (#f2f2e8).
- route line animation: `climb-route 3s linear infinite`.
- Reduced motion: the source disables authored animations/transitions under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

### Do:
- Do preserve the sector-specific composition and local interaction described above.
- Do use the observed font aliases with their bundled font files.
- Do retain keyboard focus and the existing reduced-motion override.

### Don't:
- Don't substitute the gallery thumbnail palette for this page’s surface and text colors.
- Don't make decorative motion necessary to understand or use a control.
- Don't present a local demonstration confirmation as a real transaction.
