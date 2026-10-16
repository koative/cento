---
name: Palette
description: A pigment specimen catalog with paint mixing and a working palette basket.
colors:
  paper: '#f2ede2'
  ink: '#24265c'
  specimen-wall-div-tone: '#fff'
  filters-button-tone: '#b4b3c1'
  mix-result-output-tone: '#0008'
  color-title-h1-span-ink: '#e85b3e'
  pigments-surface: '#e5e4dc'
typography:
  display:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: clamp(65px, 7.5vw, 105px)
    lineHeight: '0.94'
    fontWeight: '700'
    letterSpacing: -0.04em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 46px
    lineHeight: '1'
    fontWeight: '600'
    letterSpacing: -0.03em
  headline-context-2:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 57px
    lineHeight: '0.97'
    fontWeight: '600'
    letterSpacing: -0.03em
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 22px
    lineHeight: normal
    fontWeight: '600'
  body:
    fontFamily: '"DM Sans", sans-serif'
rounded:
  observed-1: 50%
spacing:
  observed-1: 10px
  observed-2: 25px
  observed-3: 18px
  observed-4: 35px
components:
  navigation:
    textColor: '#24265c'
  filter-control:
    textColor: inherit
    padding: 8px 13px
    backgroundColor: transparent
  pigments:
    padding: 60px 5vw
    backgroundColor: '#e5e4dc'
    textColor: '#24265c'
  pigment-list-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 10px 0
  color-selects-select:
    textColor: inherit
    width: 100%
    backgroundColor: transparent
    padding: 13px 0
---

# Design System: Palette

## Overview

**Creative North Star: "Artists pigment specimen book, saturated swatches and compact lab controls"**

Artists pigment specimen book, saturated swatches and compact lab controls. A pigment specimen catalog with paint mixing and a working palette basket.

This records the implemented art supplies template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Art supplies composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Specimen Wall Div Tone**: context-specific authored color.
- **Filters Button Tone**: context-specific authored color.
- **Mix Result Output Tone**: context-specific authored color.
- **Color Title H1 Span Ink**: context-specific authored color.
- **Pigments Surface**: context-specific authored color.

## Typography

- **Bricolage Grotesque** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 400, normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`700 38px "Bricolage Grotesque"`).
- color title h1 uses the font shorthand (`700 clamp(65px, 7.5vw, 105px)/0.94 "Bricolage Grotesque"`).
- specimen wall b uses the font shorthand (`500 21px/1.1 "Bricolage Grotesque"`).
- pigment heading h2 uses the font shorthand (`600 46px/1 "Bricolage Grotesque"`).
- pigment list h3 uses the font shorthand (`600 22px "Bricolage Grotesque"`).

## Layout

- **Color opening**: grid-template-columns (1fr 1.2fr); gap (50px); padding (60px 5vw 75px).
- **Specimen wall**: grid-template-columns (repeat(3, 1fr)); gap (18px); padding (25px 10px).
- **Pigment list article**: grid-template-columns (45px 1.3fr 0.4fr 1fr 110px); gap (25px); padding (20px 0).
- **Mixing**: grid-template-columns (1fr 1fr); padding (70px 5vw); gap (60px).
- **Color selects**: grid-template-columns (1fr 1fr); gap (18px).
- **Your palette**: padding (55px 5vw); grid-template-columns (1fr 1.3fr); gap (35px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 850px)`, `(max-width: 600px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 850px): pigment list article changes to gap (15px); grid-template-columns (45px 1.4fr 0.4fr 1fr 95px).
- @media (max-width: 600px): color opening changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 600px): pigment list article changes to grid-template-columns (33px 1fr 85px); gap (12px).
- @media (max-width: 600px): mixing changes to grid-template-columns (1fr).
- @media (max-width: 600px): your palette changes to grid-template-columns (1fr); gap (20px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- specimen wall   div: `4px 12px 18px #25234124`.
- mix geometry   div: `6px 12px 25px #0002`.

## Shapes

- sample: corners (`50%`).
- mix geometry   div: corners (`50%`).

## Components

Filter pigments, mix two colors with a ratio and add or remove saved colors.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Filter control

Authored filters button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Pigments

Authored pigments styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Pigment List Button

Authored pigment list button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Color Selects Select

Authored color selects select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- filters button[aria pressed="true"]: background (#24265c); color (#fff).
- specimen wall   div animation: `specimen-arrive 1.4s cubic-bezier(0.16, 1, 0.3, 1)`.
- mix result transition: `background 0.4s`.
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

## Collection 100 refinement

Pigment specimens now choose a mixing input. Five proportion swatches let visitors compare and select blends. Mixed and saved color text chooses contrasting black or white from relative luminance.
