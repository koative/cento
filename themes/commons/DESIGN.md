---
name: Commons
description: Space for your next idea. Explore a shared workspace and find your kind of working day.
colors:
  surface: '#f0eee4'
  text: '#343b2e'
  html-tone: '#b54d31'
  header-tone: '#c8cbbc'
  nav-pass-tone: '#d66a46'
  day-pass-select-tone: '#b8beaa'
  selection-surface: '#d76946'
  selection-ink: '#fff4e4'
  nav-pass-ink: '#fff7e9'
  image-note-ink: '#fff6df'
  location-surface: '#283426df'
  location-ink: '#fff'
  intro-em-ink: '#a34a31'
  spaces-surface: '#e4e5d7'
  submit-ink: '#f2eee1'
typography:
  display:
    fontFamily: Manrope
    fontSize: clamp(50px, 5.8vw, 82px)
    fontWeight: '500'
    lineHeight: '1.06'
    letterSpacing: -0.04em
  headline:
    fontFamily: DM, sans-serif
  headline-context-1:
    fontFamily: DM, sans-serif
    fontSize: 33px
    fontWeight: '400'
    letterSpacing: -0.03em
    lineHeight: '1.35'
  headline-context-2:
    fontFamily: DM, sans-serif
    fontSize: 32px
    fontWeight: '500'
    letterSpacing: -0.03em
  title:
    fontFamily: DM, sans-serif
  title-context-1:
    fontFamily: DM, sans-serif
    fontSize: 23px
    fontWeight: '500'
  body:
    fontFamily: DM, sans-serif
rounded:
  observed-1: 50%
spacing:
  observed-1: 30px
  observed-2: 20px
  observed-3: 30px 5%
  observed-4: 8px
components:
  navigation:
    textColor: '#343b2e'
  nav-pass:
    padding: 13px 18px
    backgroundColor: '#d66a46'
    textColor: '#fff7e9'
  zone-list-button:
    width: 100%
    backgroundColor: none
    textColor: '#343b2e'
    padding: 24px 0
  days-button:
    backgroundColor: none
    rounded: 50%
    width: 30px
    height: 30px
    textColor: '#343b2e'
  day-pass-select:
    width: 100%
    backgroundColor: transparent
    rounded: '0'
    padding: 12px 0
    textColor: '#343b2e'
  location:
    textColor: '#fff'
    backgroundColor: '#283426df'
    padding: 10px 15px
  submit:
    width: 100%
    padding: 17px 19px
    backgroundColor: '#343b2e'
    textColor: '#f2eee1'
---

# Design System: Commons

## Overview

**Creative North Star: "An orange architectural note pinned to a full-width real workspace photograph"**

An orange architectural note pinned to a full-width real workspace photograph. A drawn geometric floor plan connects with three zone controls; a pass calculator closes the flow.

This records the implemented coworking template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Coworking composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The user delegates creative direction and requests distinct sector-specific worlds. Parent seed 9c08d10d assigns grounded candidate 4, a public exploration atlas. This collection translates navigable spatial knowledge into the page appropriate to each sector, not a shared skin. Rietveld sliding planes are competitive for spatial clarity; their contribution is a reversible relationship between controls and scene. Night-city ambience is competitive for Equinox only. VU meter and marker lettering are declined for product clarity; their kept discipline is explicit state feedback and confident scale, not copied motifs.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Surface**: page ground.
- **Text**: principal text.
- **Html Tone**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Nav Pass Tone**: context-specific authored color.
- **Day Pass Select Tone**: context-specific authored color.
- **Selection Surface**: context-specific authored color.
- **Selection Ink**: context-specific authored color.
- **Nav Pass Ink**: context-specific authored color.
- **Image Note Ink**: context-specific authored color.
- **Location Surface**: context-specific authored color.
- **Location Ink**: context-specific authored color.
- **Intro Em Ink**: context-specific authored color.
- **Spaces Surface**: context-specific authored color.
- **Submit Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 200 800.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Intro**: grid-template-columns (1.8fr 1fr); gap (5%); padding (80px 5%).
- **Space layout**: grid-template-columns (1.4fr 1fr); gap (7%).
- **Day pass**: grid-template-columns (1fr 0.8fr); gap (12%); padding (80px 10%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 800px)`, `(max-width: 600px)`.
- @media (max-width: 800px): intro changes to grid-template-columns (1.5fr 1fr).
- @media (max-width: 600px): space layout changes to grid-template-columns (1fr).
- @media (max-width: 600px): day pass changes to grid-template-columns (1fr); gap (35px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- zone dot: corners (`50%`).
- day pass select: corners (`0`).
- days button: corners (`50%`).

## Components

Select a floorplan zone, choose one to five days, see calculated pricing and create a local workday plan.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Pass

Authored nav pass styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Zone List Button

Authored zone list button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Days Button

Authored days button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Day Pass Select

Authored day pass select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Location

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Submit

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- a:focus visible: outline (3px solid #b54d31); outline-offset (5px).
- days button:disabled: opacity (0.35).
- hero image img animation: `arrive 1.2s cubic-bezier(0.16, 1, 0.3, 1)`.
- floorplan rect transition: `fill 0.5s`.
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
