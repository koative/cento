---
name: Equinox
description: A night beyond the everyday. An interactive celestial atlas and an evening under the dome.
colors:
  surface: '#171625'
  text: '#eee8df'
  header-tone: '#494454'
  venue-tone: '#c7bed4'
  visit-tone: '#282130'
  selection-surface: '#cdb6e6'
  h1-em-ink: '#d1b9e9'
  sky-copy-p-not-venue-ink: '#cac1d5'
  constellation-tabs-button-ink: '#b6adc2'
  constellation-tabs-button-aria-selected-true-surface: '#cfbce2'
  sky-story-p-ink: '#ccc2d6'
  visit-surface: '#e8e0d6'
  reserve-surface: '#392b49'
  reserve-ink: '#f3e9fd'
  footer-ink: '#c4b9cd'
typography:
  display:
    fontFamily: Caslon, serif
    fontSize: clamp(54px, 6.5vw, 94px)
    fontWeight: '400'
    lineHeight: '1.12'
    letterSpacing: -0.04em
  headline:
    fontFamily: DM, sans-serif
  headline-context-1:
    fontFamily: Caslon
    fontWeight: '400'
    fontSize: 26px
  headline-context-2:
    fontFamily: Caslon, serif
    fontWeight: '400'
    fontSize: clamp(34px, 4vw, 58px)
    lineHeight: '1.2'
    letterSpacing: -0.03em
  title:
    fontFamily: DM, sans-serif
    fontSize: 22px
    fontWeight: '500'
  body:
    fontFamily: DM, sans-serif
spacing:
  observed-1: 8px
  observed-2: 20px
  observed-3: 9px
components:
  reserve-action:
    width: 100%
    backgroundColor: '#392b49'
    textColor: '#f3e9fd'
    padding: 18px 22px
  navigation:
    textColor: '#eee8df'
  motion:
    backgroundColor: '#171625'
    textColor: '#eee8df'
    rounded: 30px
    padding: 11px 18px
  constellation-tabs-button:
    padding: 28px 0
    textColor: '#b6adc2'
    backgroundColor: none
  visit-select:
    width: 100%
    backgroundColor: transparent
    textColor: '#282130'
    padding: 10px 0
  visit:
    backgroundColor: '#e8e0d6'
    textColor: '#282130'
    padding: 85px 8%
---

# Design System: Equinox

## Overview

**Creative North Star: "Equinox planetarium world"**

A dark auditorium with a wide celestial planisphere, off-axis serif title and constellation selection. A slow authored chart rotation can be explicitly toggled; visit planning sits in a contrasting ticket sheet.

This records the implemented planetarium template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Planetarium composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The user delegates creative direction and requests distinct sector-specific worlds. Parent seed 9c08d10d assigns grounded candidate 4, a public exploration atlas. This collection translates navigable spatial knowledge into the page appropriate to each sector, not a shared skin. Rietveld sliding planes are competitive for spatial clarity; their contribution is a reversible relationship between controls and scene. Night-city ambience is competitive for Equinox only. VU meter and marker lettering are declined for product clarity; their kept discipline is explicit state feedback and confident scale, not copied motifs.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Surface**: page ground.
- **Text**: principal text.
- **Header Tone**: context-specific authored color.
- **Venue Tone**: context-specific authored color.
- **Visit Tone**: context-specific authored color.
- **Selection Surface**: context-specific authored color.
- **H1 Em Ink**: context-specific authored color.
- **Sky Copy P Not Venue Ink**: context-specific authored color.
- **Constellation Tabs Button Ink**: context-specific authored color.
- **Constellation Tabs Button Aria Selected True Surface**: context-specific authored color.
- **Sky Story P Ink**: context-specific authored color.
- **Visit Surface**: context-specific authored color.
- **Reserve Surface**: context-specific authored color.
- **Reserve Ink**: context-specific authored color.
- **Footer Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Caslon** is the CSS family alias for Libre Caslon Text. Local faces: normal / 400, italic / normal.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Observatory**: min-height (760px); grid-template-columns (0.85fr 1.2fr); padding (35px 5% 25px).
- **Selected star**: grid-template-columns (100px auto).
- **Visit**: grid-template-columns (1fr 0.8fr); gap (12%); padding (85px 8%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 800px)`.
- @media (max-width: 800px): observatory changes to grid-template-columns (1fr).
- @media (max-width: 800px): visit changes to grid-template-columns (1fr); gap (45px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- motion: corners (`30px`).
- dome div: corners (`50%`).

## Components

Change the constellation; rotate or pause the sky; choose showtime and visitor count to create a local visit plan. The star chart is illustrative, not astronomical navigation.

### Reserve action

Authored reserve styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Motion

Authored motion styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Constellation Tabs Button

Authored constellation tabs button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Visit Select

Authored visit select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Visit

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid #d6b9f4); outline-offset (5px).
- constellation tabs button[aria selected="true"]: color (#171625); background (#cfbce2).
- spinning animation: `rotate 180s linear infinite`.
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
