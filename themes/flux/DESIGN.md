---
name: Flux
description: A working flow builder with editable nodes, step actions and local test activity.
colors:
  paper: '#f8f7f4'
  ink: '#33303f'
  muted: '#787381'
  accent: '#7662ab'
  line: '#e1dee6'
  rail-buttonactive-tone: '#fff'
  connector-tone: '#b6acbf'
  add-step-tone: '#796292'
  rail-tone: '#302c3d'
  run-tone: '#7056a6'
  workspace-tabs-button-aria-pressed-true-tone: '#6d52a3'
  rail-ink: '#f2eefb'
  rail-button-ink: '#b5acc8'
  rail-buttonactive-surface: '#534960'
  rail-avatar-surface: '#beadce'
  workspace-header-slash-ink: '#c6c1cb'
  state-surface: '#f1eef4'
  statepassed-surface: '#e9f3e8'
  statepassed-ink: '#3b663e'
typography:
  display:
    fontFamily: '"Space Grotesk", sans-serif'
    fontSize: 27px
    fontWeight: 500
  headline:
    fontFamily: '"Space Grotesk", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: '"Space Grotesk", sans-serif'
    fontSize: 30px
    lineHeight: '1.02'
    letterSpacing: -0.035em
  headline-context-2:
    fontFamily: '"Space Grotesk", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 30px
  title:
    fontFamily: '"Space Grotesk", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: '"Space Grotesk", sans-serif'
    lineHeight: '1.2'
    fontSize: 14px
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
  observed-3: 7px
  observed-4: 6px
  observed-5: 9px
  observed-6: 5px
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 10px
  observed-4: 20px
  observed-5: 25px
  observed-6: '0'
  observed-7: 14px 0
  observed-8: 7px
  observed-9: 15px 0
components:
  text-field:
    textColor: inherit
    padding: 13px
    backgroundColor: '#f8f7f4'
    rounded: 3px
  rail:
    width: 66px
    backgroundColor: '#302c3d'
    padding: 22px 0
    textColor: '#f2eefb'
  rail-button:
    textColor: '#b5acc8'
    backgroundColor: none
    width: 36px
    height: 36px
    rounded: 7px
  workflow-header-input:
    textColor: inherit
    backgroundColor: none
    width: 360px
    padding: '0'
  outline:
    textColor: inherit
    padding: 10px 14px
    backgroundColor: '#fff'
    rounded: 6px
  run:
    textColor: inherit
    padding: 10px 14px
    backgroundColor: '#fff'
    rounded: 6px
---

# Design System: Flux

## Overview

**Creative North Star: "A collaborative planning canvas"**

A collaborative planning canvas: plum tool rail, light dotted working plane, connected action nodes and a contextual settings inspector.

This records the implemented workflow automation template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Workflow Automation composition with local, visible state changes.
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
- **Rail Buttonactive Tone**: context-specific authored color.
- **Connector Tone**: context-specific authored color.
- **Add Step Tone**: context-specific authored color.
- **Rail Tone**: context-specific authored color.
- **Run Tone**: context-specific authored color.
- **Workspace Tabs Button Aria Pressed True Tone**: context-specific authored color.
- **Rail Ink**: context-specific authored color.
- **Rail Button Ink**: context-specific authored color.
- **Rail Buttonactive Surface**: context-specific authored color.
- **Rail Avatar Surface**: context-specific authored color.
- **Workspace Header Slash Ink**: context-specific authored color.
- **State Surface**: context-specific authored color.
- **Statepassed Surface**: context-specific authored color.
- **Statepassed Ink**: context-specific authored color.

## Typography

The workflow title is an editable input inside the semantic first heading. Its own type size is 27px, reducing to 25px at 650px; the wrapper inherits typography. Activity uses a 30px second-level heading.

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.
- **Space Grotesk** is the CSS family alias for Space Grotesk Light. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Editor**: grid-template-columns (minmax(0, 1fr) 300px); min-height (700px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 900px): editor changes to grid-template-columns (minmax(0, 1fr) 260px).
- @media (max-width: 900px): workflow header changes to flex-direction (column).
- @media (max-width: 650px): editor changes to grid-template-columns (1fr).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- node: `0 4px 9px #38304408`.
- add options: `0 8px 15px #3d324313`.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- rail button: corners (`7px`).
- rail avatar: corners (`50%`).
- state: corners (`3px`).
- outline: corners (`6px`).

## Components

Edit the workflow name, add/remove/rename nodes, change the budget condition, inspect node settings, run a local simulated workflow and reset.

### Text field

Authored field input styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Rail

Authored rail styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Rail Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Workflow Header Input

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Outline

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Run

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- workspace tabs button[aria pressed="true"]: color (#6d52a3).
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
