---
name: Lumen
description: A sculptural eyewear showroom with a live frame configurator.
colors:
  paper: '#dce63d'
  ink: '#252a21'
  accent: '#3f573c'
  header-tone: '#8f9d27'
  perspective-surface: '#e9e8df'
  perspective-em-ink: '#667541'
  bag-ink: '#eef0db'
typography:
  display:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '500'
    letterSpacing: -0.035em
    fontSize: clamp(3.3rem, 6vw, 5.7rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '500'
    letterSpacing: -0.035em
    fontSize: 26px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '500'
    letterSpacing: -0.035em
    fontSize: 48px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
rounded:
  observed-1: 50%
spacing:
  observed-1: 12px
  observed-2: '0'
  observed-3: 25px
  observed-4: 9px 8px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#252a21'
    textColor: '#dce63d'
  quiet-button:
    backgroundColor: transparent
    textColor: inherit
    padding: 10px 16px
  navigation:
    textColor: '#252a21'
  bag:
    backgroundColor: '#252a21'
    textColor: '#eef0db'
    padding: 45px 4vw
---

# Design System: Lumen

## Overview

**Creative North Star: "An acid-chartreuse optical showroom"**

An acid-chartreuse optical showroom: the entire first viewport is a large CSS dimensional frame display on a ruled product stage. Frame colors, sizes and lens tints update the product and cart summary live; technical measurements justify the stage guides.

This records the implemented eyewear template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Eyewear composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Header Tone**: context-specific authored color.
- **Perspective Surface**: context-specific authored color.
- **Perspective Em Ink**: context-specific authored color.
- **Bag Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Space Grotesk Light. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Config**: grid-template-columns (1.2fr 1fr 1.3fr 0.8fr 1.2fr); gap (25px); padding (26px 0 35px).
- **Perspective**: grid-template-columns (1fr 1fr).
- **Bag**: padding (45px 4vw); grid-template-columns (1fr 1fr); gap (5vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 1000px)`.
- @media (max-width: 1000px): config changes to grid-template-columns (1fr 1fr 1fr).
- @media (max-width: 650px): config changes to gap (22px 14px); grid-template-columns (1fr 1.5fr).
- @media (max-width: 650px): perspective changes to grid-template-columns (1fr).
- @media (max-width: 650px): bag changes to grid-template-columns (1fr).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- eyepiece: `inset 7px 8px 8px #ffffff30, 0 12px 13px #35421425`.

## Shapes

- input: corners (`0`).
- eyepiece: corners (`43px 43px 66px 66px`).
- bridge: corners (`50%`).
- arm: corners (`5px`).
- swatches button: corners (`50%`).

## Components

Change finish, size and lenses; add the resulting configuration to the local bag.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quiet button

Authored quiet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Bag

Authored bag styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- choices button[aria pressed="true"]: outline (0); background (var(--ink)); color (var(--paper)).
- frame object animation: `opticalFloat 6s ease-in-out infinite alternate`.
- frame object transition: `color 0.4s`.
- eyepiece transition: `background 0.4s, border-color 0.4s`.
- bridge transition: `border-color 0.4s`.
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
