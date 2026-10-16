---
name: Aperture
description: A late-night cinema programme, cinematic image frames, and a working ticket selector.
colors:
  paper: '#e6e0d0'
  ink: '#191815'
  film-screen-surface: '#15232c'
  film-screen-ink: '#fff8e7'
  programme-aside-surface: '#ede9dd'
  film-list-button-aria-pressed-true-ink: '#a13915'
  reserve-surface: '#cf4c23'
typography:
  display:
    fontFamily: '"Barlow Condensed", sans-serif'
    fontSize: clamp(60px, 7.7vw, 108px)
    lineHeight: '0.93'
    fontWeight: '600'
    letterSpacing: -0.02em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Barlow Condensed", sans-serif'
    fontSize: 44px
    lineHeight: '1'
    fontWeight: '600'
  headline-context-2:
    fontFamily: '"Barlow Condensed", sans-serif'
    fontSize: 32px
    lineHeight: normal
    fontWeight: '600'
  title:
    fontFamily: '"DM Sans", sans-serif'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
components:
  reserve-action:
    textColor: white
    padding: 23px
    backgroundColor: '#cf4c23'
  navigation:
    textColor: '#191815'
---

# Design System: Aperture

## Overview

**Creative North Star: "Film programme / ink, warm paper and electric orange"**

Film programme / ink, warm paper and electric orange. A late-night cinema programme, cinematic image frames, and a working ticket selector.

This records the implemented independent cinema template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Independent cinema composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Film Screen Surface**: context-specific authored color.
- **Film Screen Ink**: context-specific authored color.
- **Programme Aside Surface**: context-specific authored color.
- **Film List Button Aria Pressed True Ink**: context-specific authored color.
- **Reserve Surface**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold, Barlow Condensed Black. Local faces: normal / 500, normal / 600, normal / 700, normal / 800, normal / 900.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- film title h1 uses the font shorthand (`600 clamp(60px, 7.7vw, 108px)/0.93 "Barlow Condensed", sans-serif`).
- programme h2 uses the font shorthand (`600 44px/1 "Barlow Condensed", sans-serif`).
- ticket strip h2 uses the font shorthand (`600 32px "Barlow Condensed", sans-serif`).
- cinema note h2 uses the font shorthand (`500 56px/0.98 "Barlow Condensed", sans-serif`).
- stamp uses the font shorthand (`600 32px/1 "Barlow Condensed"`).

## Layout

- **Programme**: grid-template-columns (minmax(0, 2.1fr) minmax(270px, 1fr)).
- **Ticket strip**: grid-template-columns (1.6fr 1fr 1.4fr); gap (25px); padding (30px 0).
- **Cinema note**: padding (85px 4vw); grid-template-columns (1fr 1fr 0.45fr); gap (50px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 800px)`, `(max-width: 500px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 800px): programme changes to grid-template-columns (1fr).
- @media (max-width: 800px): film list changes to grid-template-columns (repeat(3, 1fr)); gap (15px).
- @media (max-width: 800px): ticket strip changes to grid-template-columns (1fr 1fr).
- @media (max-width: 800px): cinema note changes to grid-template-columns (1fr 1fr).
- @media (max-width: 500px): cinema note changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- stamp: corners (`50%`).

## Components

Choose a film session and ticket quantity; calculate a local receipt.

### Reserve action

Authored reserve styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- film list button[aria pressed="true"]: color (#a13915).
- reserve:hover: background (#a63b1a).
- film screen img animation: `projector 1.3s cubic-bezier(0.16, 1, 0.3, 1) both`.
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
