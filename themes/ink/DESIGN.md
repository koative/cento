---
name: Ink
description: A tattoo flashbook with a curated design index and a local consultation brief.
colors:
  paper: '#ebe3d5'
  ink: '#272321'
  flash-grid-tone: '#a99f90'
  header-tone: '#b5aca0'
  opening-h1-em-tone: '#7d3733'
  flashbook-surface: '#ded6c8'
  consultation-form-button-ink: '#fff4e3'
  process-ink: '#e6ddd1'
typography:
  display:
    fontFamily: '"Cormorant Garamond"'
    fontSize: clamp(70px, 7.8vw, 112px)
    lineHeight: '0.9'
    fontWeight: '400'
    letterSpacing: -0.035em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 44px
    lineHeight: normal
    fontWeight: '400'
  headline-context-2:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 55px
    lineHeight: '0.98'
    fontWeight: '400'
    letterSpacing: -0.02em
  title:
    fontFamily: '"DM Sans", sans-serif'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
components:
  navigation:
    textColor: '#272321'
  flashbook:
    padding: 55px 5vw
    backgroundColor: '#ded6c8'
    textColor: '#272321'
  flash-head-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 8px 0
  consultation-select:
    textColor: inherit
    width: 100%
    backgroundColor: transparent
    rounded: '0'
    padding: 14px 0
---

# Design System: Ink

## Overview

**Creative North Star: "Tattoo flash catalogue on warm paper with oxblood annotations"**

Tattoo flash catalogue on warm paper with oxblood annotations. A tattoo flashbook with a curated design index and a local consultation brief.

This records the implemented tattoo studio template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Tattoo studio composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Flash Grid Tone**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Opening H1 Em Tone**: context-specific authored color.
- **Flashbook Surface**: context-specific authored color.
- **Consultation Form Button Ink**: context-specific authored color.
- **Process Ink**: context-specific authored color.

## Typography

- **Cormorant Garamond** is the CSS family alias for Cormorant Garamond Light. Local faces: italic / 400, italic / 500, normal / 400, normal / 500, normal / 600.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 400, normal / 500, normal / 600.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`500 50px/0.9 "Cormorant Garamond"`).
- brand span uses the font shorthand (`9px/1.5 "DM Sans"`).
- opening h1 uses the font shorthand (`400 clamp(70px, 7.8vw, 112px)/0.9 "Cormorant Garamond"`).
- opening figcaption uses the font shorthand (`italic 25px "Cormorant Garamond"`).
- flash head h2 uses the font shorthand (`400 44px "Cormorant Garamond"`).

## Layout

- **Opening**: padding (55px 8vw 65px); grid-template-columns (1fr 1fr); gap (60px).
- **Flash grid**: grid-template-columns (repeat(4, 1fr)).
- **Consultation**: grid-template-columns (1fr 1fr); gap (100px); padding (75px 8vw).
- **Process**: padding (60px 8vw); grid-template-columns (1fr 1fr); gap (30px 100px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 800px)`, `(max-width: 550px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 800px): flash grid changes to grid-template-columns (repeat(2, 1fr)).
- @media (max-width: 550px): opening changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 550px): consultation changes to grid-template-columns (1fr); gap (20px).
- @media (max-width: 550px): process changes to grid-template-columns (1fr); gap (20px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- consultation select: corners (`0`).

## Components

Filter flash designs, choose placement and preview a consultation brief.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Flashbook

Authored flashbook styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Flash Head Button

Authored flash head button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Consultation Select

Authored consultation select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- flash:hover: background (#eee7dc).
- flash:hover   svg: transform (rotate(-6deg)).
- flash transition: `background 0.3s`.
- flash   svg transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`.
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
