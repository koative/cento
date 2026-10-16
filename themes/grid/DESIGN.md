---
name: Grid
description: A sun-filled home energy planner with adjustable solar capacity and battery modeling.
colors:
  paper: '#fff9e9'
  ink: '#342c20'
  muted: '#756449'
  accent: '#b94e16'
  line: '#d9cdb4'
  sun-intro-surface: '#f8aa3d'
  sun-intro-h1-span-ink: '#59350e'
  sun-circle-ink: '#f9cf77'
  house-view-surface: '#f0e1c6'
  closing-surface: '#e4ebca'
  closing-em-ink: '#627143'
typography:
  display:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 7.5vw, 6rem)
    fontWeight: '600'
  headline:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 48px
  title:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
    fontSize: 20px
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 24px
  observed-4: 13px
  observed-5: 15px
  observed-6: 65px 6%
components:
  primary-button:
    textColor: '#fff9e9'
    padding: 13px 20px
    backgroundColor: '#342c20'
    rounded: 3px
  sun-intro:
    backgroundColor: '#f8aa3d'
    padding: 65px 6%
    textColor: '#342c20'
  nav-nav:
    textColor: '#342c20'
  panel-count-button:
    textColor: inherit
    width: 32px
    height: 32px
    backgroundColor: transparent
    rounded: 50%
---

# Design System: Grid

## Overview

**Creative North Star: "A sunlit domestic planning sheet"**

A sunlit domestic planning sheet: saturated apricot, warm paper, bold Bricolage lettering, real home photograph and an inline energy calculator.

This records the implemented renewable energy template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Renewable Energy composition with local, visible state changes.
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
- **Sun Intro Surface**: context-specific authored color.
- **Sun Intro H1 Span Ink**: context-specific authored color.
- **Sun Circle Ink**: context-specific authored color.
- **House View Surface**: context-specific authored color.
- **Closing Surface**: context-specific authored color.
- **Closing Em Ink**: context-specific authored color.

## Typography

- **Bricolage Grotesque** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 400, normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- house caption span uses the font shorthand (`10px/2 "DM Sans", sans-serif`).
- estimate strong uses the font shorthand (`600 52px/1.2 "Bricolage Grotesque", sans-serif`).
- closing p uses the font shorthand (`500 clamp(2.6rem, 5vw, 4.8rem)/1.08 "Bricolage Grotesque", sans-serif`).

## Layout

- **Sun intro**: min-height (620px); padding (65px 6%); grid-template-columns (1.1fr 1fr); gap (80px).
- **Planner**: grid-template-columns (1fr 1fr).
- **How**: grid-template-columns (1fr 1.4fr); gap (60px).
- **How article**: grid-template-columns (36px 1fr); gap (6px 20px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 760px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 760px): sun intro changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 760px): planner changes to grid-template-columns (1fr).
- @media (max-width: 760px): how changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 760px): closing changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- energy chip: corners (`12px`).
- panel count button: corners (`50%`).

## Components

Change solar panel count, monthly bill and battery selection. The simplified estimate recalculates and a local concept can be saved.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Sun Intro

Authored sun intro styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Panel Count Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- sun circle svg animation: `sunturn 60s linear infinite`.
- flow line animation: `flow 2s linear infinite`.
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

The opening now contains an isometric 24-position solar array linked to the panel count and an adjustable time-of-day generation study. The planner explains home and battery energy paths; model values remain explicitly illustrative.
