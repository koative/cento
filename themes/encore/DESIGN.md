---
name: Encore
description: An evening theatre programme with an interactive seating plan and ticket totals.
colors:
  paper: '#4e242c'
  ink: '#f2d9b2'
  header-tone: '#88575b'
  booking-tone: '#f2e6cf'
  seat-heading-select-tone: '#af9190'
  seat-row-button-tone: '#a88982'
  seat-row-button-disabled-tone: '#ccc0ac'
  production-h1-em-ink: '#d6a880'
typography:
  display:
    fontFamily: '"Cormorant Garamond"'
    fontSize: clamp(70px, 7vw, 100px)
    lineHeight: '0.88'
    fontWeight: '400'
    letterSpacing: -0.025em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 62px
    lineHeight: '0.95'
    fontWeight: '400'
  headline-context-2:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 48px
    lineHeight: '1.05'
    fontWeight: '400'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 35px
    lineHeight: '1.05'
    fontWeight: '400'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 30px
  observed-2: '0'
  observed-3: 25px
  observed-4: 65px
components:
  navigation:
    textColor: '#f2d9b2'
  booking:
    backgroundColor: '#f2e6cf'
    textColor: '#4e242c'
    padding: 65px 6vw
  seat-row-button:
    textColor: inherit
    height: 36px
    rounded: 8px 8px 2px 2px
    backgroundColor: transparent
    padding: '0'
  seat-heading-select:
    textColor: inherit
    backgroundColor: transparent
    padding: 13px 0
    width: 100%
---

# Design System: Encore

## Overview

**Creative North Star: "Burgundy theatre programme with gold paper, arch typography and seat geometry"**

Burgundy theatre programme with gold paper, arch typography and seat geometry. An evening theatre programme with an interactive seating plan and ticket totals.

This records the implemented theatre template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Theatre composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Header Tone**: context-specific authored color.
- **Booking Tone**: context-specific authored color.
- **Seat Heading Select Tone**: context-specific authored color.
- **Seat Row Button Tone**: context-specific authored color.
- **Seat Row Button Disabled Tone**: context-specific authored color.
- **Production H1 Em Ink**: context-specific authored color.

## Typography

- **Cormorant Garamond** is the CSS family alias for Cormorant Garamond Light. Local faces: italic / 400, italic / 500, normal / 400, normal / 500, normal / 600.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 400, normal / 500, normal / 600.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`400 42px/0.9 "Cormorant Garamond"`).
- brand span uses the font shorthand (`9px "DM Sans"`).
- production h1 uses the font shorthand (`400 clamp(70px, 7vw, 100px)/0.88 "Cormorant Garamond"`).
- programme note   p uses the font shorthand (`400 24px/1.35 "Cormorant Garamond"`).
- programme note b uses the font shorthand (`400 28px "Cormorant Garamond"`).

## Layout

- **Production**: padding (55px 6vw 50px); grid-template-columns (1.2fr 1fr); gap (55px).
- **Programme note**: grid-template-columns (0.7fr 1.5fr 0.7fr); gap (45px); padding (35px 6vw 45px).
- **Booking layout**: grid-template-columns (1.5fr 1fr); gap (65px).
- **Seat row**: grid-template-columns (20px repeat(8, 1fr) 20px); gap (9px).
- **Visit**: padding (60px 6vw); grid-template-columns (1fr 1fr); gap (65px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 650px): production changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 650px): programme note changes to grid-template-columns (1fr); gap (20px).
- @media (max-width: 650px): booking layout changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 650px): seat row changes to grid-template-columns (15px repeat(8, 1fr) 15px); gap (5px).
- @media (max-width: 650px): visit changes to grid-template-columns (1fr); gap (10px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- production img: corners (`48% 48% 0 0`).
- stage: corners (`50% 50% 0 0`).
- seat row button: corners (`8px 8px 2px 2px`).
- seat legend i: corners (`3px`).

## Components

Choose a performance and seats; calculate a local ticket total.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Booking

Authored booking styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Seat Row Button

Authored seat row button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Seat Heading Select

Authored seat heading select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- seat row button[aria pressed="true"]: background (#4e242c); color (#f2e6cf); border-color (#4e242c).
- seat row button:disabled: background (#ccc0ac); color (#877968); border-color (transparent); opacity (0.7).
- production img animation: `curtain 1.5s cubic-bezier(0.16, 1, 0.3, 1)`.
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
