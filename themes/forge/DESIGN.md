---
name: Forge
description: A machining specification desk with a dimensional flange and downloadable part brief.
colors:
  paper: '#e9e8e3'
  ink: '#262724'
  muted: '#646560'
  accent: '#bd4e22'
  line: '#bdbeb8'
  part-side-tone: '#748076'
  machine-view-tone: '#b1b6ab44'
  part-face-tone: '#6e7779'
  part-face-tone-2: '#e5e7df'
  configuration-tone: '#eceee4'
  machine-view-surface: '#d8d9d1'
  part-hole-surface: '#525a54'
  part-face-span-surface: '#48534c'
  part-side-surface: '#7a857c'
  dimension-ink: '#4a5148'
  configuration-surface: '#272a26'
  config-heading-span-ink: '#e08354'
  config-form-select-surface: '#363c33'
typography:
  display:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '0.92'
    letterSpacing: -0.02em
    fontSize: clamp(4rem, 7.5vw, 6rem)
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
    fontSize: 52px
    fontWeight: '600'
  title:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.2'
    fontWeight: '600'
  title-context-1:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.2'
    fontWeight: '600'
    fontSize: 30px
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 50%
  observed-2: 3px
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 10px
  observed-4: 22px
  observed-5: 20px
  observed-6: 30px
components:
  primary-button:
    textColor: '#e9e8e3'
    padding: 13px 20px
    backgroundColor: '#262724'
    rounded: 3px
  rotate:
    backgroundColor: '#e9e8e3'
    padding: 10px
    textColor: '#262724'
  field-select:
    textColor: inherit
    padding: 13px
    backgroundColor: '#e9e8e3'
    rounded: 3px
  nav-nav:
    textColor: '#262724'
  config-form-select:
    textColor: '#eceee4'
    backgroundColor: '#363c33'
---

# Design System: Forge

## Overview

**Creative North Star: "A precision workshop drawing"**

A precision workshop drawing: warm grey engineering grid, dimensional machined flange, condensed lettering and a specification-led lower spread.

This records the implemented precision manufacturing template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Precision Manufacturing composition with local, visible state changes.
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
- **Part Side Tone**: context-specific authored color.
- **Machine View Tone**: context-specific authored color.
- **Part Face Tone**: context-specific authored color.
- **Part Face Tone 2**: context-specific authored color.
- **Configuration Tone**: context-specific authored color.
- **Machine View Surface**: context-specific authored color.
- **Part Hole Surface**: context-specific authored color.
- **Part Face Span Surface**: context-specific authored color.
- **Part Side Surface**: context-specific authored color.
- **Dimension Ink**: context-specific authored color.
- **Configuration Surface**: context-specific authored color.
- **Config Heading Span Ink**: context-specific authored color.
- **Config Form Select Surface**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold. Local faces: normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- dimension uses the font shorthand (`11px/1.4 monospace`).
- part id uses the font shorthand (`600 29px/1 "Barlow Condensed", sans-serif`).
- part id small uses the font shorthand (`10px/2 "DM Sans", sans-serif`).
- config heading   span uses the font shorthand (`600 20px "Barlow Condensed", sans-serif`).
- quote strong uses the font shorthand (`600 50px/1.2 "Barlow Condensed", sans-serif`).

## Layout

- **Forge intro**: grid-template-columns (1fr 1.15fr); min-height (670px).
- **Configuration**: grid-template-columns (1fr 1fr); padding (65px 7%); gap (12%).
- **Config form**: grid-template-columns (1fr 1fr); gap (22px).
- **Capabilities article**: grid-template-columns (1fr 1.5fr 140px 24px); gap (30px); padding (30px 0).
- **Process**: grid-template-columns (1fr 1.4fr); padding (60px 7%); gap (10%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 760px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 760px): forge intro changes to grid-template-columns (1fr).
- @media (max-width: 760px): configuration changes to grid-template-columns (1fr); gap (40px).
- @media (max-width: 760px): capabilities article changes to grid-template-columns (1fr 24px); gap (12px).
- @media (max-width: 760px): process changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- part face: `inset 0 0 0 13px #bac1b7`.
- part hole: `inset 4px 8px 10px #2229`.
- part side: `0 1px #748076, 0 5px #748076, 0 10px #748076, 0 15px #748076, 0 20px #748076, 0 25px #748076`.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- part face: corners (`50%`).
- part hole: corners (`50%`).
- part face span: corners (`50%`).
- part side: corners (`50%`).

## Components

Choose material, surface finish and batch quantity, pause the CSS 3D flange, and download a plain-text part specification.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Rotate

Authored rotate styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Field Select

Authored field select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Config Form Select

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- part animation: `partturn 20s ease-in-out infinite`.
- partstill animation-play-state: `paused`.
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
