---
name: Harbor
description: A maritime operations workspace with a terminal schematic, vessel details and manifest export.
colors:
  paper: '#eef1eb'
  ink: '#264c50'
  muted: '#658083'
  accent: '#9a7133'
  line: '#cbd7cd'
  map-top-tone: '#bed3cc'
  table-tools-label-tone: '#f8faf4'
  port-header-surface: '#214c52'
  port-header-ink: '#edf2df'
  live-dot-surface: '#d9bc72'
  port-map-surface: '#22535f'
  map-legend-i-surface: '#e5e7d5'
  map-legend-span-nth-child-2-i-surface: '#e1b669'
  vessel-detail-surface: '#f9faf3'
  status-tag-surface: '#e5e9e0'
  status-tag-ink: '#68765c'
  status-tagalongside-surface: '#dcebdd'
  status-tagalongside-ink: '#4c7250'
typography:
  display:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.12'
    letterSpacing: -0.035em
    fontSize: 39px
  headline:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.1'
    letterSpacing: -0.035em
    fontSize: 30px
  headline-context-2:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.02em
    fontSize: 24px
  title:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
  body:
    fontFamily: DM, sans-serif
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
  observed-3: 4px
spacing:
  observed-1: 8px
  observed-2: 20px
  observed-3: 30px
  observed-4: 12px
  observed-5: 26px
  observed-6: 13px 20px
  observed-7: 22px 4%
  observed-8: 25px
  observed-9: 7px
  observed-10: 8px 12px
components:
  primary-button:
    textColor: '#eef1eb'
    padding: 13px 20px
    backgroundColor: '#264c50'
    rounded: 3px
  selection-tab:
    textColor: inherit
    padding: 9px 16px
    backgroundColor: transparent
    rounded: 3px
  port-header:
    backgroundColor: '#214c52'
    textColor: '#edf2df'
    padding: 22px 4%
  movements-head-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 8px 12px
    rounded: 4px
  table-tools-tabs-button:
    textColor: inherit
    padding: 7px 11px
  table-tools-input:
    textColor: inherit
    backgroundColor: none
    width: 130px
---

# Design System: Harbor

## Overview

**Creative North Star: "A maritime handover atlas"**

A maritime handover atlas: petrol water, pale terminal geometry, warm vessel selection and a precise movement table.

This records the implemented port operations template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Port Operations composition with local, visible state changes.
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
- **Map Top Tone**: context-specific authored color.
- **Table Tools Label Tone**: context-specific authored color.
- **Port Header Surface**: context-specific authored color.
- **Port Header Ink**: context-specific authored color.
- **Live Dot Surface**: context-specific authored color.
- **Port Map Surface**: context-specific authored color.
- **Map Legend I Surface**: context-specific authored color.
- **Map Legend Span Nth Child 2 I Surface**: context-specific authored color.
- **Vessel Detail Surface**: context-specific authored color.
- **Status Tag Surface**: context-specific authored color.
- **Status Tag Ink**: context-specific authored color.
- **Status Tagalongside Surface**: context-specific authored color.
- **Status Tagalongside Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 200 800.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Operations**: grid-template-columns (1.75fr 1fr).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 850px)`, `(max-width: 600px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 850px): operations changes to grid-template-columns (1fr).
- @media (max-width: 600px): port title changes to flex-direction (column); gap (20px).
- @media (max-width: 600px): table tools changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- live dot: corners (`50%`).
- operations: corners (`8px`).
- map legend i: corners (`50%`).
- status tag: corners (`3px`).

## Components

Select vessels, filter/search movements, acknowledge local handovers and export the filtered manifest as CSV.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Selection tab

Authored tabs button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Port Header

Authored port header styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Movements Head Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Table Tools Tabs Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Table Tools Input

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- shipping route animation: `sailing 15s linear infinite`.
- cargo progress i transition: `width 0.7s`.
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
