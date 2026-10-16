---
name: Vector
description: A cinematic automotive concept with trim, finish and engineering views.
colors:
  paper: '#e8e8e4'
  ink: '#222825'
  muted: '#636b66'
  accent: '#5a7759'
  line: '#c4c9c1'
  config-tone: '#d4d9d1'
  trims-button-tone: '#a6afa3'
  drive-surface: '#28342f'
  config-visual-surface: '#ced4cc'
  photo-note-ink: '#596359'
  trims-button-aria-pressed-true-ink: '#21432a'
  chassis-i-surface: '#222b24'
  details-surface: '#202a24'
  details-ink: '#edf0e7'
  details-span-ink: '#b5c5aa'
  details-p-ink: '#c4cdc0'
typography:
  display:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '0.9'
    letterSpacing: -0.02em
    fontSize: clamp(4rem, 8vw, 6rem)
    fontWeight: '600'
  headline:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
    fontWeight: '600'
  headline-context-1:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 42px
    fontWeight: '600'
  headline-context-2:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 44px
    fontWeight: '600'
  title:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
    fontSize: 24px
    fontWeight: '400'
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 65px 6%
  observed-4: 30px
components:
  primary-button:
    textColor: '#e8e8e4'
    padding: 13px 20px
    backgroundColor: '#222825'
    rounded: 3px
  config-visual:
    padding: 30px
    backgroundColor: '#ced4cc'
    textColor: '#222825'
  nav-nav:
    textColor: '#222825'
  view-tabs-button:
    textColor: inherit
    backgroundColor: none
    padding: 8px 0
  trims-button:
    textColor: inherit
    width: 100%
    backgroundColor: transparent
    padding: 18px 0
---

# Design System: Vector

## Overview

**Creative North Star: "A cinematic road journal"**

A cinematic road journal: full-width editorial vehicle photography, lean condensed headings, sage engineering surfaces and an integrated trim configurator.

This records the implemented automotive template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Automotive composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Impeccable collection seed `0c646d2f`, assigned candidate 7. Grounded collection candidates: trade publication; materials archive; field guide; factory drawing; operational atlas; neighborhood workshop; **sector-specific working artifact**. The seventh is selected: each theme gets the artifact its audience uses to understand and decide, rather than a shared marketing skeleton. The user's direct-code creative delegation controls the workflow.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Muted**: secondary copy.
- **Accent**: interactive emphasis.
- **Line**: dividers.
- **Config Tone**: context-specific authored color.
- **Trims Button Tone**: context-specific authored color.
- **Drive Surface**: context-specific authored color.
- **Config Visual Surface**: context-specific authored color.
- **Photo Note Ink**: context-specific authored color.
- **Trims Button Aria Pressed True Ink**: context-specific authored color.
- **Chassis I Surface**: context-specific authored color.
- **Details Surface**: context-specific authored color.
- **Details Ink**: context-specific authored color.
- **Details Span Ink**: context-specific authored color.
- **Details P Ink**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold. Local faces: normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- specs strong uses the font shorthand (`500 44px/1 "Barlow Condensed", sans-serif`).
- specs small uses the font shorthand (`12px "DM Sans", sans-serif`).

## Layout

- **Vision**: padding (65px 6%); grid-template-columns (1fr 1fr); gap (12%).
- **Config**: grid-template-columns (1.25fr 1fr).
- **Specs**: grid-template-columns (1fr 1fr); padding (20px 0).
- **Details   div**: grid-template-columns (repeat(3, 1fr)); gap (45px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 760px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 760px): drive top changes to flex-direction (column); gap (25px).
- @media (max-width: 760px): vision changes to grid-template-columns (1fr).
- @media (max-width: 760px): details   div changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- paint button: corners (`50%`).
- chassis i: corners (`8px`).

## Components

Choose a trim and finish, switch between exterior and CSS engineering views, and save a local configuration.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Config Visual

Authored config visual styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### View Tabs Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Trims Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- view tabs button[aria pressed="true"]: border-color (var(--ink)).
- drive   img animation: `reveal 1.5s ease-out`.
- car photo img transition: `filter 0.6s`.
- chassis animation: `chassis 6s ease-in-out infinite`.
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
