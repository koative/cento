---
name: Tempo
description: A kinetic dance poster with an interactive weekly class timetable.
colors:
  paper: '#d9ff66'
  ink: '#252341'
  poster-type-h1-span-tone: '#4d42ba'
  timetable-surface: '#f4f0e7'
  studio-ink: '#eeeade'
typography:
  display:
    fontFamily: '"Barlow Condensed"'
    fontSize: clamp(84px, 10.5vw, 150px)
    lineHeight: '0.83'
    fontWeight: '800'
    letterSpacing: -0.02em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Barlow Condensed"'
    fontSize: 65px
    lineHeight: '0.9'
    fontWeight: '700'
  headline-context-2:
    fontFamily: '"Barlow Condensed"'
    fontSize: 68px
    lineHeight: '0.95'
    fontWeight: '600'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: 23px
    letterSpacing: -0.02em
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
  observed-2: 30px
  observed-3: 15px
  observed-4: 50px
components:
  navigation:
    textColor: '#252341'
  filter-control:
    textColor: inherit
    backgroundColor: transparent
    padding: 12px 22px
  rhythm-band:
    backgroundColor: '#4d42ba'
    textColor: '#d9ff66'
    padding: 18px 0
  class-list-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 15px 0
---

# Design System: Tempo

## Overview

**Creative North Star: "Acid yellow dance poster with cobalt typographic choreography"**

Acid yellow dance poster with cobalt typographic choreography. A kinetic dance poster with an interactive weekly class timetable.

This records the implemented dance studio template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Dance studio composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Poster Type H1 Span Tone**: context-specific authored color.
- **Timetable Surface**: context-specific authored color.
- **Studio Ink**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold, Barlow Condensed Black. Local faces: normal / 500, normal / 600, normal / 700, normal / 800, normal / 900.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand sup uses the font shorthand (`14px "DM Sans"`).
- poster type h1 uses the font shorthand (`800 clamp(84px, 10.5vw, 150px)/0.83 "Barlow Condensed"`).
- rhythm band uses the font shorthand (`700 36px/0.9 "Barlow Condensed"`).
- section head h2 uses the font shorthand (`700 65px/0.9 "Barlow Condensed"`).
- class list b uses the font shorthand (`600 35px "Barlow Condensed"`).

## Layout

- **Dance poster**: padding (28px 4vw 32px); grid-template-columns (1.1fr 1fr); gap (20px).
- **Class list article**: grid-template-columns (1fr 2.5fr 1fr); gap (25px); padding (25px 0).
- **Studio**: padding (80px 5vw); grid-template-columns (1.4fr 1fr); gap (50px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 800px)`, `(max-width: 550px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 550px): dance poster changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 550px): class list article changes to grid-template-columns (75px 1fr); gap (15px).
- @media (max-width: 550px): studio changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

The scanned stylesheet defines no border-radius values; preserve its existing geometry and border construction.

## Components

Filter the class timetable and choose a class locally.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Filter control

Authored filters button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Rhythm Band

Authored rhythm band styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Class List Button

Authored class list button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- filters button[aria pressed="true"]: background (#4d42ba); color (white); border-color (#4d42ba).
- class list button:hover: color (#4d42ba).
- rhythm band span animation: `beat 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate`.
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
