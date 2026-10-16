---
name: Grove
description: A seasonal harvest calendar and customizable farm-share box.
colors:
  paper: '#e5e9cf'
  ink: '#314c30'
  size-options-button-tone: '#a0b08e'
  farm-opening-ink: '#fffbe8'
  thead-button-aria-pressed-true-ink: '#f0f1dd'
  active-month-surface: '#d7dfbd'
  crop-dot-surface: '#547348'
  empty-ink: '#79886a'
  size-options-button-aria-pressed-true-surface: '#cbd7b2'
typography:
  display:
    fontFamily: '"Lora"'
    fontSize: clamp(44px, 5.3vw, 76px)
    lineHeight: '1.08'
    fontWeight: '400'
    letterSpacing: -0.035em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Lora"'
    fontSize: 44px
    lineHeight: '1.15'
    fontWeight: '400'
    letterSpacing: -0.02em
  headline-context-2:
    fontFamily: '"Lora"'
    fontSize: 64px
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.03em
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Lora"'
    fontSize: 29px
    lineHeight: normal
    fontWeight: '400'
  body:
    fontFamily: '"DM Sans", sans-serif'
rounded:
  observed-1: 50%
spacing:
  observed-1: 20px
  observed-2: 10px
  observed-3: 30px
  observed-4: 65px 6vw
  observed-5: 25px 0
components:
  navigation:
    textColor: '#314c30'
  share:
    padding: 65px 6vw
    backgroundColor: '#314c30'
    textColor: '#e5e9cf'
  thead-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 10px 11px
    rounded: 50%
---

# Design System: Grove

## Overview

**Creative North Star: "Harvest almanac with botanical greens and a twelve-month availability matrix"**

Harvest almanac with botanical greens and a twelve-month availability matrix. A seasonal harvest calendar and customizable farm-share box.

This records the implemented farm & csa template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Farm & CSA composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Size Options Button Tone**: context-specific authored color.
- **Farm Opening Ink**: context-specific authored color.
- **Thead Button Aria Pressed True Ink**: context-specific authored color.
- **Active Month Surface**: context-specific authored color.
- **Crop Dot Surface**: context-specific authored color.
- **Empty Ink**: context-specific authored color.
- **Size Options Button Aria Pressed True Surface**: context-specific authored color.

## Typography

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 100 900.
- **Lora** is the CSS family alias for Lora. Local faces: italic / 400, italic / 500, normal / 400, normal / 500, normal / 600.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`500 42px "Lora"`).
- farm title h1 uses the font shorthand (`400 clamp(44px, 5.3vw, 76px)/1.08 "Lora"`).
- section heading h2 uses the font shorthand (`400 44px/1.15 "Lora"`).
- share story h2 uses the font shorthand (`400 64px/1.05 "Lora"`).
- box list p uses the font shorthand (`400 23px/1.6 "Lora"`).

## Layout

- **Share**: grid-template-columns (1fr 1.3fr); gap (70px); padding (65px 6vw).
- **Size options**: grid-template-columns (1fr 1fr); gap (10px).
- **Promise**: padding (65px 6vw); grid-template-columns (50px 1fr 1fr); gap (30px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 900px): promise changes to grid-template-columns (1fr 1fr).
- @media (max-width: 650px): share changes to grid-template-columns (1fr).
- @media (max-width: 650px): promise changes to grid-template-columns (1fr); gap (20px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- thead button: corners (`50%`).
- crop dot: corners (`50%`).

## Components

Choose harvest month, share size, eggs and weeks; calculate a local share summary.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Share

Authored share styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Thead Button

Authored thead button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- thead button[aria pressed="true"]: background (#314c30); color (#f0f1dd).
- size options button[aria pressed="true"]: background (#cbd7b2); border-color (#314c30).
- farm opening   img animation: `field-light 1.4s cubic-bezier(0.16, 1, 0.3, 1)`.
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
