---
name: Chroma
description: A sharp salon lookbook and a service-duration appointment planner.
colors:
  paper: '#f3c8bb'
  ink: '#662f3f'
  appointment-tone: '#f4e9df'
  booking-dl-div-tone: '#a5717d'
  header-tone: '#b98482'
  services-button-aria-pressed-true-ink: '#8e364c'
typography:
  display:
    fontFamily: '"Italiana"'
    fontSize: clamp(60px, 7.5vw, 106px)
    lineHeight: '0.98'
    fontWeight: '400'
    letterSpacing: -0.025em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Italiana"'
    fontSize: 54px
    lineHeight: '1.08'
    fontWeight: '400'
  headline-context-2:
    fontFamily: '"Italiana"'
    fontSize: 48px
    lineHeight: normal
    fontWeight: '400'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Italiana"'
    fontSize: 43px
    lineHeight: '1.05'
    fontWeight: '400'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
  observed-2: 25px
  observed-3: 35px
  observed-4: '0'
components:
  navigation:
    textColor: '#662f3f'
  appointment:
    padding: 65px 5vw
    backgroundColor: '#f4e9df'
    textColor: '#662f3f'
  services-button:
    textColor: inherit
    width: 100%
    backgroundColor: transparent
    padding: 28px 0
  booking-select:
    textColor: '#f4e9df'
    width: 100%
    backgroundColor: '#662f3f'
    padding: 12px 0
---

# Design System: Chroma

## Overview

**Creative North Star: "Peach and burgundy salon lookbook with sweeping italic-free high contrast type"**

Peach and burgundy salon lookbook with sweeping italic-free high contrast type. A sharp salon lookbook and a service-duration appointment planner.

This records the implemented hair salon template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Hair salon composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Appointment Tone**: context-specific authored color.
- **Booking Dl Div Tone**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Services Button Aria Pressed True Ink**: context-specific authored color.

## Typography

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 100 900.
- **Italiana** is the CSS family alias for Italiana. Local faces: normal / 400.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`400 40px "Italiana"`).
- lookbook h1 uses the font shorthand (`400 clamp(60px, 7.5vw, 106px)/0.98 "Italiana"`).
- approach h2 uses the font shorthand (`400 54px/1.08 "Italiana"`).
- services h2 uses the font shorthand (`400 48px "Italiana"`).
- services b uses the font shorthand (`400 29px "Italiana"`).

## Layout

- **Lookbook**: grid-template-columns (1.05fr 1fr 40px); gap (25px); padding (55px 5vw 0).
- **Approach**: grid-template-columns (50px 1.3fr 1fr); gap (35px); padding (70px 5vw).
- **Appointment**: grid-template-columns (1.1fr 1fr); gap (70px); padding (65px 5vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`, `(max-width: 600px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 900px): lookbook changes to grid-template-columns (1fr 1fr); gap (20px).
- @media (max-width: 900px): approach changes to grid-template-columns (1fr 1fr).
- @media (max-width: 600px): lookbook changes to grid-template-columns (1fr); gap (15px).
- @media (max-width: 600px): approach changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 600px): appointment changes to grid-template-columns (1fr); gap (35px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

The scanned stylesheet defines no border-radius values; preserve its existing geometry and border construction.

## Components

Choose service, stylist and time; calculate duration and price for a local appointment.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Appointment

Authored appointment styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Services Button

Authored services button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Booking Select

Authored booking select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- services   button[aria pressed="true"]: color (#8e364c).
- time slots button[aria pressed="true"]: background (#f3c8bb); color (#662f3f).
- lookbook img animation: `portrait-in 1.4s cubic-bezier(0.16, 1, 0.3, 1)`.
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
