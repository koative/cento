---
name: Stack
description: A readable documentation workspace with search, SDK examples and an event playground.
colors:
  paper: '#fbfbfa'
  ink: '#28313d'
  muted: '#6b7480'
  accent: '#3864ba'
  line: '#e1e4e8'
  code-box-tone: '#dce1e8'
  search-surface: '#f0f2f4'
  nav-group-button-ink: '#586473'
  nav-group-button-aria-current-page-surface: '#eaf0fc'
  nav-group-button-aria-current-page-ink: '#315eaf'
  lead-ink: '#5d6877'
  concept-note-surface: '#eef2f8'
  concept-note-p-ink: '#57677d'
  code-box-surface: '#f4f6f8'
  pre-ink: '#365781'
  playground-pre-surface: '#eef4e9'
  playground-pre-ink: '#42633d'
typography:
  display:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.13'
    letterSpacing: -0.035em
    fontSize: clamp(2.2rem, 3.7vw, 3.5rem)
  headline:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: DM, sans-serif
    lineHeight: normal
    letterSpacing: 0.08em
    fontSize: 9px
    fontWeight: '600'
  headline-context-2:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.02em
    fontSize: 22px
  title:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
  body:
    fontFamily: DM, sans-serif
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 7px
spacing:
  observed-1: 12px
  observed-2: 8px
  observed-3: 10px
  observed-4: 20px
  observed-5: 13px
  observed-6: 15px
components:
  primary-button:
    textColor: '#fbfbfa'
    padding: 13px 20px
    backgroundColor: '#28313d'
    rounded: 3px
  docs-header:
    height: 78px
    padding: 0 3%
    backgroundColor: '#fbfbfa'
    textColor: '#28313d'
  search-input:
    textColor: inherit
    backgroundColor: none
    width: 100%
  menu:
    textColor: inherit
    backgroundColor: none
  nav-group-button:
    textColor: '#586473'
    width: 100%
    rounded: 5px
    backgroundColor: none
    padding: 9px 10px
  playground-input:
    textColor: inherit
    padding: 11px
    backgroundColor: white
    rounded: 4px
    width: 100%
---

# Design System: Stack

## Overview

**Creative North Star: "A technical field guide"**

A technical field guide: fixed wayfinding, calm reading column, pale code surfaces, explicit examples and an embedded event playground.

This records the implemented developer documentation template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Developer Documentation composition with local, visible state changes.
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
- **Code Box Tone**: context-specific authored color.
- **Search Surface**: context-specific authored color.
- **Nav Group Button Ink**: context-specific authored color.
- **Nav Group Button Aria Current Page Surface**: context-specific authored color.
- **Nav Group Button Aria Current Page Ink**: context-specific authored color.
- **Lead Ink**: context-specific authored color.
- **Concept Note Surface**: context-specific authored color.
- **Concept Note P Ink**: context-specific authored color.
- **Code Box Surface**: context-specific authored color.
- **Pre Ink**: context-specific authored color.
- **Playground Pre Surface**: context-specific authored color.
- **Playground Pre Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 200 800.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand span uses the font shorthand (`400 13px DM, sans-serif`).
- nav group h2 uses the font shorthand (`600 9px DM, sans-serif`).
- pre uses the font shorthand (`12px/1.9 ui-monospace, SFMono-Regular, Consolas, monospace`).

## Layout

- **Docs layout**: grid-template-columns (245px minmax(0, 1fr) 190px); max-width (1500px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 1100px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 1100px): docs layout changes to grid-template-columns (210px minmax(0, 1fr)).
- @media (max-width: 650px): docs layout changes to grid-template-columns (1fr).
- @media (max-width: 650px): playground form changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- search: corners (`7px`).
- nav group button: corners (`5px`).
- concept note: corners (`7px`).
- code box: corners (`8px`).

## Components

Search and navigate documentation, switch package managers, copy a code example, and run a local event request simulator with native validation.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Docs Header

Authored docs header styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Search Input

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Menu

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Group Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Playground Input

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- code tabs button[aria pressed="true"]: border-color (var(--accent)); color (var(--accent)).
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
