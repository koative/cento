---
name: Loom
description: A tactile digital material library with procedural weaves and a curated sample box.
colors:
  paper: '#f1eee5'
  ink: '#484638'
  muted: '#7c7868'
  accent: '#946d4f'
  line: '#d3cfbf'
  boucle-tone: '#fff2'
  loom-heading-em-ink: '#918069'
  material-story-surface: '#e4dfd1'
typography:
  display:
    fontFamily: Cormorant, serif
    lineHeight: '0.96'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 6.8vw, 6rem)
    fontWeight: '400'
  headline:
    fontFamily: Cormorant, serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
    fontWeight: '400'
  headline-context-1:
    fontFamily: Cormorant, serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 54px
    fontWeight: '400'
  headline-context-2:
    fontFamily: Cormorant, serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 48px
    fontWeight: '400'
  title:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
  title-context-1:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
    fontSize: 15px
    fontWeight: '400'
  body:
    fontFamily: DM, sans-serif
    lineHeight: '1.55'
rounded:
  observed-1: 3px
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 10px
  observed-4: 20px
  observed-5: 12%
components:
  primary-button:
    textColor: '#f1eee5'
    padding: 13px 20px
    backgroundColor: '#484638'
    rounded: 3px
  selection-tab:
    textColor: inherit
    padding: 9px 16px
    backgroundColor: transparent
    rounded: 3px
  material:
    backgroundColor: none
    padding: '0'
    textColor: '#484638'
  nav-nav:
    textColor: '#484638'
  library-toolbar-tabs-button:
    textColor: '{colors.muted}'
    padding: 4px 0
    rounded: '0'
    backgroundColor: none
  chosen-samples-button:
    textColor: inherit
    backgroundColor: none
---

# Design System: Loom

## Overview

**Creative North Star: "A textile sample archive"**

A textile sample archive: warm stock, fine serif scale, procedural material weaves, specimen codes and an editable sample box.

This records the implemented textiles & materials template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Textiles & Materials composition with local, visible state changes.
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
- **Boucle Tone**: context-specific authored color.
- **Loom Heading Em Ink**: context-specific authored color.
- **Material Story Surface**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Cormorant** is the CSS family alias for Cormorant Garamond Light. Local faces: normal / 300 700, italic / 300 700.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand span uses the font shorthand (`10px DM, sans-serif`).
- large swatch em uses the font shorthand (`400 34px Cormorant, serif`).

## Layout

- **Loom heading**: grid-template-columns (1.2fr 1fr); gap (12%); padding (60px 6% 50px).
- **Materials**: grid-template-columns (repeat(3, 1fr)); gap (30px 25px).
- **Material story**: grid-template-columns (1fr 1fr); min-height (550px).
- **Sample section**: padding (70px 6%); grid-template-columns (1fr 1fr); gap (12%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 700px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 700px): loom heading changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 700px): materials changes to grid-template-columns (1fr 1fr); gap (25px 18px).
- @media (max-width: 700px): material story changes to grid-template-columns (1fr).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- library toolbar tabs button: corners (`0`).
- in box: corners (`50%`).

## Components

Filter materials by family, inspect a selected textile, add/remove samples and prepare a local sample request.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Selection tab

Authored tabs button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Material

Authored material styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Library Toolbar Tabs Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Chosen Samples Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- library toolbar tabs button[aria pressed="true"]: border-color (var(--ink)); color (var(--ink)).
- swatch transition: `transform 0.4s ease`.
- large swatch:after animation: `cloth 7s ease-in-out infinite`.
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

## Collection 100 refinement

Material selection and specifications form a two-column workspace. The active detail is sticky beside the swatch grid on desktop and follows it on mobile. Procedural fabric studies use more visible weave and fold depth.
