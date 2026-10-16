---
name: Atlas
description: A city within reach. A route-finding workspace built around a clear, moving transit map.
colors:
  surface: '#f1f0e9'
  text: '#25362f'
  line-b-tone: '#276c73'
  planner-select-tone: '#958d51'
  line-a-tone: '#d74c36'
  header-tone: '#c7cbc3'
  planner-tone: '#f0d95f'
  map-panel-tone: '#f9f9f2'
  selection-surface: '#efd657'
  nav-button-aria-pressed-true-surface: '#e7e9df'
  service-dot-surface: '#346a4a'
  primary-ink: '#fff9de'
  route-result-li-span-ink: '#4b5237'
  map-tools-ink: '#667068'
  network-p-ink: '#536056'
  walking-surface: '#e3e8dc'
typography:
  display:
    fontFamily: Manrope
    fontSize: 40px
    letterSpacing: -0.04em
    fontWeight: '650'
  headline:
    fontFamily: DM, sans-serif
  headline-context-1:
    fontFamily: DM, sans-serif
    fontSize: 37px
    letterSpacing: -0.04em
    lineHeight: '1.1'
    fontWeight: '550'
  headline-context-2:
    fontFamily: DM, sans-serif
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.16'
    letterSpacing: -0.03em
  title:
    fontFamily: DM, sans-serif
  title-context-1:
    fontFamily: DM, sans-serif
    fontSize: 19px
    fontWeight: '500'
  title-context-2:
    fontFamily: DM, sans-serif
  body:
    fontFamily: DM, sans-serif
spacing:
  observed-1: 30px
  observed-2: 8px
  observed-3: 7px
  observed-4: 25px
components:
  primary-action:
    padding: 16px
    width: 100%
    backgroundColor: '#25362f'
    textColor: '#fff9de'
  navigation:
    textColor: '#25362f'
  planner:
    backgroundColor: '#f0d95f'
    padding: 30px
    textColor: '#25362f'
  nav-button:
    backgroundColor: transparent
    padding: 12px 18px
    textColor: '#25362f'
  planner-select:
    width: 100%
    backgroundColor: transparent
    textColor: '#25362f'
    padding: 10px 0
    rounded: '0'
  swap:
    backgroundColor: none
    padding: 0 5px
  walking:
    padding: 30px
    backgroundColor: '#e3e8dc'
---

# Design System: Atlas

## Overview

**Creative North Star: "A civic yellow journey rail beside a schematic network"**

A civic yellow journey rail beside a schematic network. Two actual lines intersect at a transfer; dash motion carries the computed route. The phone stacks the planner above the map, preserving readable stop names.

This records the implemented public transport template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Public transport composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The user delegates creative direction and requests distinct sector-specific worlds. Parent seed 9c08d10d assigns grounded candidate 4, a public exploration atlas. This collection translates navigable spatial knowledge into the page appropriate to each sector, not a shared skin. Rietveld sliding planes are competitive for spatial clarity; their contribution is a reversible relationship between controls and scene. Night-city ambience is competitive for Equinox only. VU meter and marker lettering are declined for product clarity; their kept discipline is explicit state feedback and confident scale, not copied motifs.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Surface**: page ground.
- **Text**: principal text.
- **Line B Tone**: context-specific authored color.
- **Planner Select Tone**: context-specific authored color.
- **Line A Tone**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Planner Tone**: context-specific authored color.
- **Map Panel Tone**: context-specific authored color.
- **Selection Surface**: context-specific authored color.
- **Nav Button Aria Pressed True Surface**: context-specific authored color.
- **Service Dot Surface**: context-specific authored color.
- **Primary Ink**: context-specific authored color.
- **Route Result Li Span Ink**: context-specific authored color.
- **Map Tools Ink**: context-specific authored color.
- **Network P Ink**: context-specific authored color.
- **Walking Surface**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 200 800.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Journey layout**: grid-template-columns (330px 1fr); min-height (660px).
- **Network**: grid-template-columns (1.1fr 1fr 0.9fr); gap (7%); padding (75px 0).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 1000px)`, `(max-width: 700px)`.
- @media (max-width: 1000px): journey layout changes to grid-template-columns (280px 1fr).
- @media (max-width: 700px): journey layout changes to grid-template-columns (1fr).
- @media (max-width: 700px): network changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 700px): footer changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- nav button[aria pressed="true"]: corners (`30px`).
- service dot: corners (`50%`).
- planner select: corners (`0`).
- line badge: corners (`3px`).

## Components

Choose endpoints and calculate the connected route; swap stops; handle identical endpoints; opt into the step-free label; browse a sample departure board.

### Primary action

Authored primary styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Planner

Authored planner styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Button

Authored nav button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Planner Select

Authored planner select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Swap

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Walking

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid #23676b); outline-offset (4px).
- map scroll:focus visible: outline (3px solid #276c73); outline-offset (-3px).
- nav button[aria pressed="true"]: background (#e7e9df).
- selected route animation: `journey 2s linear infinite`.
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
