---
name: Vault
description: A warm insurance concept with an adjustable plan explorer and transparent local summaries.
colors:
  paper: '#f7f1e7'
  ink: '#49382e'
  muted: '#857364'
  accent: '#a35436'
  line: '#dbccbb'
  intro-title-em-tone: '#ae6d4c'
  plan-aria-pressed-true-tone: '#e7ebdb'
  plan-aria-pressed-true-plan-mark-tone: '#61784c'
  arch-surface: '#c9d1ae'
  arch-svg-ink: '#5d714a'
  circle-surface: '#e6b98e'
  circle-svg-ink: '#9e6240'
  quote-section-surface: '#e8e5d4'
  quote-inputs-select-surface: '#f4f1e6'
  billing-span-ink: '#63734a'
  plan-mark-surface: '#eee5d8'
  plan-aria-pressed-true-plan-mark-ink: '#fff'
  care-surface: '#9f6245'
  care-ink: '#fff4e4'
typography:
  display:
    fontFamily: '"Instrument Serif", serif'
    lineHeight: '1.04'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 7vw, 6rem)
    fontWeight: '400'
  headline:
    fontFamily: '"Instrument Serif", serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
    fontWeight: '400'
  headline-context-1:
    fontFamily: '"Instrument Serif", serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 50px
    fontWeight: '400'
  headline-context-2:
    fontFamily: '"Instrument Serif", serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 45px
    fontWeight: '400'
  title:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: '"Instrument Serif", serif'
    lineHeight: normal
    fontSize: 28px
    fontWeight: '400'
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
spacing:
  observed-1: 12px
  observed-2: 10px
  observed-3: 8px
  observed-4: 20px
  observed-5: 12%
  observed-6: 65px 6%
components:
  primary-button:
    textColor: '#f7f1e7'
    padding: 13px 20px
    backgroundColor: '#49382e'
    rounded: 3px
  text-field:
    textColor: inherit
    padding: 13px
    backgroundColor: '#f7f1e7'
    rounded: 3px
  quote-section:
    backgroundColor: '#e8e5d4'
    padding: 55px 6%
    textColor: '#49382e'
  nav-nav:
    textColor: '#49382e'
  field-select:
    textColor: inherit
    padding: 13px
    backgroundColor: '{colors.paper}'
    rounded: 3px
  plan:
    textColor: inherit
    backgroundColor: transparent
    rounded: 12px
    padding: 28px
---

# Design System: Vault

## Overview

**Creative North Star: "A reassuring household booklet"**

A reassuring household booklet: warm paper, earthy modular forms, expressive Instrument Serif and visible insurance comparisons.

This records the implemented insurance template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Insurance composition with local, visible state changes.
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
- **Intro Title Em Tone**: context-specific authored color.
- **Plan Aria Pressed True Tone**: context-specific authored color.
- **Plan Aria Pressed True Plan Mark Tone**: context-specific authored color.
- **Arch Surface**: context-specific authored color.
- **Arch Svg Ink**: context-specific authored color.
- **Circle Surface**: context-specific authored color.
- **Circle Svg Ink**: context-specific authored color.
- **Quote Section Surface**: context-specific authored color.
- **Quote Inputs Select Surface**: context-specific authored color.
- **Billing Span Ink**: context-specific authored color.
- **Plan Mark Surface**: context-specific authored color.
- **Plan Aria Pressed True Plan Mark Ink**: context-specific authored color.
- **Care Surface**: context-specific authored color.
- **Care Ink**: context-specific authored color.

## Typography

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.
- **Instrument Serif** is the CSS family alias for Instrument Serif. Local faces: italic / 400, normal / 400.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- little square span uses the font shorthand (`400 33px/1.1 "Instrument Serif", serif`).
- plan h3 uses the font shorthand (`400 28px "Instrument Serif", serif`).
- price uses the font shorthand (`400 53px "Instrument Serif", serif`).
- price small uses the font shorthand (`11px "DM Sans", sans-serif`).

## Layout

- **Vault intro**: grid-template-columns (1.1fr 1fr); padding (60px 6% 65px); gap (8%).
- **Quote section**: grid-template-columns (1fr 1.2fr); gap (12%); padding (55px 6%).
- **Quote inputs**: grid-template-columns (1fr 1.2fr); gap (25px 35px).
- **Plan grid**: grid-template-columns (repeat(3, 1fr)); gap (20px).
- **Care**: padding (65px 6%); grid-template-columns (1.2fr 1fr); gap (10%).
- **Questions**: grid-template-columns (1fr 1.2fr); gap (12%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 750px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 750px): vault intro changes to grid-template-columns (1fr); gap (20px).
- @media (max-width: 750px): quote section changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 750px): quote inputs changes to grid-template-columns (1fr).
- @media (max-width: 750px): plan grid changes to grid-template-columns (1fr).
- @media (max-width: 750px): plan summary changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- arch: corners (`120px 120px 0 0`).
- circle: corners (`50%`).
- little square: corners (`8px`).
- plan: corners (`12px`).

## Components

Change home type, belongings value and billing period, compare plans, save a local summary and expand answers.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Text field

Authored field input styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quote Section

Authored quote section styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Field Select

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Plan

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- plan[aria pressed="true"]: background (#e7ebdb); border-color (#6b7c51).
- arch animation: `sway 9s ease-in-out infinite`.
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
