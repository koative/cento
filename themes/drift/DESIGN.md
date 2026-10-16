---
name: Drift
description: A coastal surf field guide with a lesson finder and local booking summary.
colors:
  paper: '#d6e8ed'
  ink: '#174955'
  conditions-tone: '#9cbcc3'
  lesson-detail-tone: '#f3eddd'
  coast-ink: '#fff8e9'
  coast-a-surface: '#f2db95'
  conditions-surface: '#e6efed'
  lesson-choices-button-aria-pressed-true-surface: '#c3dce0'
typography:
  display:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: clamp(65px, 7vw, 100px)
    lineHeight: '0.98'
    fontWeight: '600'
    letterSpacing: -0.04em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 46px
    lineHeight: '1.08'
    fontWeight: '500'
    letterSpacing: -0.03em
  headline-context-2:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 48px
    lineHeight: '1.03'
    fontWeight: '500'
    letterSpacing: -0.03em
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Bricolage Grotesque"'
    fontSize: 37px
    lineHeight: normal
    fontWeight: '500'
    letterSpacing: -0.02em
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
  observed-2: 30px
components:
  navigation:
    textColor: '#174955'
  conditions:
    padding: 28px 5vw
    backgroundColor: '#e6efed'
    textColor: '#174955'
  lesson-choices-button:
    textColor: inherit
    backgroundColor: transparent
    width: 100%
    padding: 30px 45px 30px 0
  form-row-select:
    textColor: inherit
    backgroundColor: transparent
    padding: 13px 0
    width: 100%
---

# Design System: Drift

## Overview

**Creative North Star: "Sun-worn surf fieldguide with ocean-blue annotations and asymmetrical photo spreads"**

Sun-worn surf fieldguide with ocean-blue annotations and asymmetrical photo spreads. A coastal surf field guide with a lesson finder and local booking summary.

This records the implemented surf school template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Surf school composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Conditions Tone**: context-specific authored color.
- **Lesson Detail Tone**: context-specific authored color.
- **Coast Ink**: context-specific authored color.
- **Coast A Surface**: context-specific authored color.
- **Conditions Surface**: context-specific authored color.
- **Lesson Choices Button Aria Pressed True Surface**: context-specific authored color.

## Typography

- **Bricolage Grotesque** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 400, normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`700 42px "Bricolage Grotesque"`).
- coast h1 uses the font shorthand (`600 clamp(65px, 7vw, 100px)/0.98 "Bricolage Grotesque"`).
- lesson heading h2 uses the font shorthand (`500 46px/1.08 "Bricolage Grotesque"`).
- lesson choices b uses the font shorthand (`500 28px "Bricolage Grotesque"`).
- lesson detail h3 uses the font shorthand (`500 37px "Bricolage Grotesque"`).

## Layout

- **Lesson layout**: grid-template-columns (0.85fr 1.3fr); gap (55px).
- **Form row**: grid-template-columns (1.2fr 0.8fr); gap (20px).
- **Field notes**: padding (65px 7vw); grid-template-columns (1fr 1fr); gap (80px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`, `(max-width: 600px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 600px): lesson layout changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 600px): field notes changes to grid-template-columns (1fr); gap (35px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

The scanned stylesheet defines no border-radius values; preserve its existing geometry and border construction.

## Components

Choose level, day and group size; preview a lesson summary.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Conditions

Authored conditions styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Lesson Choices Button

Authored lesson choices button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Form Row Select

Authored form row select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- lesson choices button[aria pressed="true"]: color (#174955); background (#c3dce0).
- wave art svg animation: `wave-drift 7s ease-in-out infinite alternate`.
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
