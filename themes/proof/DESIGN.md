---
name: Proof
description: A daily bakery order sheet with loaf quantities and a pickup receipt.
colors:
  paper: '#f0dfbc'
  ink: '#783b2a'
  header-tone: '#b58d6d'
  order-sheet-surface: '#f7ecd6'
  receipt-button-ink: '#fff3dd'
typography:
  display:
    fontFamily: '"Cormorant Garamond"'
    fontSize: clamp(66px, 7vw, 100px)
    lineHeight: '0.92'
    fontWeight: '400'
    letterSpacing: -0.03em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 64px
    lineHeight: '0.96'
    fontWeight: '400'
    letterSpacing: -0.02em
  headline-context-2:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 51px
    lineHeight: '0.98'
    fontWeight: '400'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Cormorant Garamond"'
    fontSize: 27px
    lineHeight: normal
    fontWeight: '500'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
  observed-2: 30px
  observed-3: 25px 0
components:
  navigation:
    textColor: '#783b2a'
  order-sheet:
    backgroundColor: '#f7ecd6'
    padding: 28px
    textColor: '#783b2a'
  quantity-button:
    textColor: inherit
    backgroundColor: transparent
    width: 28px
    height: 28px
    rounded: 50%
  order-total-select:
    textColor: inherit
    backgroundColor: transparent
    padding: 10px 0
---

# Design System: Proof

## Overview

**Creative North Star: "Bakery order ledger with honey paper and flour-white typography"**

Bakery order ledger with honey paper and flour-white typography. A daily bakery order sheet with loaf quantities and a pickup receipt.

This records the implemented artisan bakery template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Artisan bakery composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Header Tone**: context-specific authored color.
- **Order Sheet Surface**: context-specific authored color.
- **Receipt Button Ink**: context-specific authored color.

## Typography

- **Cormorant Garamond** is the CSS family alias for Cormorant Garamond Light. Local faces: italic / 400, italic / 500, normal / 400, normal / 500, normal / 600.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 400, normal / 500, normal / 600.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`600 58px/0.8 "Cormorant Garamond"`).
- brand span uses the font shorthand (`10px "DM Sans"`).
- opening title h1 uses the font shorthand (`400 clamp(66px, 7vw, 100px)/0.92 "Cormorant Garamond"`).
- counter title h2 uses the font shorthand (`400 64px/0.96 "Cormorant Garamond"`).
- order sheet h3 uses the font shorthand (`500 27px "Cormorant Garamond"`).

## Layout

- **Bakery opening**: grid-template-columns (0.9fr 1.3fr); padding (55px 5vw 0); gap (30px 40px).
- **Counter**: grid-template-columns (0.7fr 1.3fr); gap (65px); padding (75px 5vw).
- **Order sheet article**: grid-template-columns (1fr 65px 100px); gap (20px); padding (25px 0).
- **Our way**: padding (70px 5vw); grid-template-columns (0.3fr 1fr 1fr); gap (45px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`, `(max-width: 550px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 900px): counter changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 900px): our way changes to grid-template-columns (1fr 1fr).
- @media (max-width: 550px): bakery opening changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 550px): order sheet article changes to grid-template-columns (1fr 90px); gap (13px).
- @media (max-width: 550px): our way changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- bakery opening   img: corners (`50% 50% 0 0`).
- quantity button: corners (`50%`).

## Components

Adjust loaf quantities and pickup time; prepare a local receipt.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Order Sheet

Authored order sheet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quantity Button

Authored quantity button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Order Total Select

Authored order total select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- receipt button:hover:not(:disabled): background (#5b2a1d).
- bakery opening   img animation: `bread-rise 1.3s cubic-bezier(0.16, 1, 0.3, 1)`.
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
