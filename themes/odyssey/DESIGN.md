---
name: Odyssey
description: A destination journal with a buildable day-by-day itinerary.
colors:
  paper: '#eae4d7'
  ink: '#244857'
  accent: '#a95532'
  destination-copy-tone: '#fff8e9'
  intro-tone: '#b8bbaa'
  day-tabs-button-aria-pressed-true-tone: '#f5eddb'
  planner-aside-surface: '#d7ded3'
typography:
  display:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(4.7rem, 8vw, 6rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 38px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 46px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: Display
    lineHeight: '1.1'
    fontSize: 30px
    fontWeight: '400'
  title-context-2:
    fontFamily: Display
    lineHeight: '1.5'
    fontSize: 34px
    fontWeight: '400'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 12px
  observed-2: 6px
  observed-3: 20px
  observed-4: '0'
  observed-5: 25px
  observed-6: 10px
  observed-7: 5vw
  observed-8: 15px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#244857'
    textColor: '#eae4d7'
  quiet-button:
    backgroundColor: transparent
    textColor: inherit
    padding: 10px 16px
  navigation:
    textColor: '#244857'
  packing:
    padding: 55px 7vw
    backgroundColor: '#244857'
    textColor: '#f5eddb'
---

# Design System: Odyssey

## Overview

**Creative North Star: "A blue-and-sand travel notebook"**

A blue-and-sand travel notebook: panoramic destination imagery, tabbed daily plans and a trip packing sheet. The itinerary behaves like a practical journal and each selected activity changes a visible route summary.

This records the implemented travel planning template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Travel planning composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Destination Copy Tone**: context-specific authored color.
- **Intro Tone**: context-specific authored color.
- **Day Tabs Button Aria Pressed True Tone**: context-specific authored color.
- **Planner Aside Surface**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Instrument Serif. Local faces: italic / 100 900, normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Intro**: padding (45px 5vw); grid-template-columns (1.2fr 1.3fr 0.5fr); gap (5vw).
- **Planner**: grid-template-columns (1.5fr 1fr); gap (5vw).
- **Day tabs**: grid-template-columns (repeat(3, 1fr)).
- **Day plan article**: grid-template-columns (50px 1fr 35px); gap (15px); padding (30px 0).
- **Packing**: padding (55px 7vw); grid-template-columns (1fr 1fr); gap (10vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): intro changes to grid-template-columns (1fr 1fr).
- @media (max-width: 900px): day plan article changes to grid-template-columns (40px 1fr 32px); gap (10px).
- @media (max-width: 650px): intro changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 650px): planner changes to grid-template-columns (1fr).
- @media (max-width: 650px): packing changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).

## Components

Choose a day, add activities and prepare an itinerary.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quiet button

Authored quiet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Packing

Authored packing styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- day tabs button[aria pressed="true"]: outline (0); background (var(--ink)); color (#f5eddb).
- destination   img animation: `coastReveal 1.8s ease-out both`.
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
