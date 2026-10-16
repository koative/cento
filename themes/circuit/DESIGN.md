---
name: Circuit
description: A friendly repair studio with a complete three-step local repair-plan journey.
colors:
  paper: '#f5f2df'
  ink: '#234a3a'
  muted: '#6a7b58'
  accent: '#648435'
  line: '#cbd1b0'
  device-grid-button-aria-pressed-true-tone: '#dfeac4'
  device-grid-button-tone: '#f6f6e8'
  device-grid-button-tone-2: '#d4dbbe'
  device-grid-button-aria-pressed-true-tone-2: '#6f8a49'
  circuit-intro-ink: '#f1f3d5'
  circuit-intro-h1-span-ink: '#b9d77a'
  intro-bottom-p-ink: '#d2dec0'
  intro-bottom-btn-surface: '#c1da85'
  repair-context-li-ink: '#8c9878'
  repair-context-liactive-span-surface: '#d7e4bb'
  repair-form-surface: '#fffdf0'
  repair-belief-surface: '#d4e2b1'
  repair-belief-em-ink: '#6c853f'
typography:
  display:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.05'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 6.5vw, 6rem)
    fontWeight: '500'
  headline:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 53px
    fontWeight: '500'
  headline-context-2:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 34px
    fontWeight: '500'
  title:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    lineHeight: '1.2'
    fontSize: 23px
    fontWeight: '500'
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
  observed-3: 6px
spacing:
  observed-1: 12px
  observed-2: 20px
  observed-3: 8px
  observed-4: 12%
  observed-5: 15px
  observed-6: 18px
components:
  primary-button:
    textColor: '#f5f2df'
    padding: 13px 20px
    backgroundColor: '#234a3a'
    rounded: 3px
  secondary-button:
    textColor: '#234a3a'
    padding: 13px 20px
    backgroundColor: transparent
    rounded: 3px
  circuit-intro:
    backgroundColor: '#234a3a'
    textColor: '#f1f3d5'
    padding: 55px 6% 0
  nav-nav:
    textColor: '#234a3a'
  device-grid-button:
    textColor: inherit
    backgroundColor: '#f6f6e8'
    rounded: 9px
    padding: 25px
---

# Design System: Circuit

## Overview

**Creative North Star: "A neighborhood repair workshop"**

A neighborhood repair workshop: deep green circuit traces, citrus accents, friendly Bricolage lettering and a conversational three-step intake.

This records the implemented electronics repair template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Electronics Repair composition with local, visible state changes.
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
- **Device Grid Button Aria Pressed True Tone**: context-specific authored color.
- **Device Grid Button Tone**: context-specific authored color.
- **Device Grid Button Tone 2**: context-specific authored color.
- **Device Grid Button Aria Pressed True Tone 2**: context-specific authored color.
- **Circuit Intro Ink**: context-specific authored color.
- **Circuit Intro H1 Span Ink**: context-specific authored color.
- **Intro Bottom P Ink**: context-specific authored color.
- **Intro Bottom Btn Surface**: context-specific authored color.
- **Repair Context Li Ink**: context-specific authored color.
- **Repair Context Liactive Span Surface**: context-specific authored color.
- **Repair Form Surface**: context-specific authored color.
- **Repair Belief Surface**: context-specific authored color.
- **Repair Belief Em Ink**: context-specific authored color.

## Typography

- **Bricolage Grotesque** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 400, normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- repair price strong uses the font shorthand (`500 42px "Bricolage Grotesque", sans-serif`).

## Layout

- **Repair section**: padding (65px 6%); grid-template-columns (1fr 1.25fr); gap (12%).
- **Device grid**: grid-template-columns (1fr 1fr); gap (14px).
- **Slot list**: grid-template-columns (1fr 1fr); gap (12px).
- **Repair belief**: padding (60px 6%); grid-template-columns (1fr 1.25fr); gap (12%).
- **Faq**: grid-template-columns (1fr 1.25fr); gap (12%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 750px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 750px): intro bottom changes to flex-direction (column); gap (25px).
- @media (max-width: 750px): repair section changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 750px): repair context li changes to flex-direction (column).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- repair context li   span: corners (`50%`).
- repair form: corners (`14px`).
- device grid button: corners (`9px`).
- issue list button: corners (`6px`).

## Components

Complete device selection, issue selection and appointment selection to prepare a local repair plan. Restart or expand practical answers.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Secondary button

Authored btnsecondary styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Circuit Intro

Authored circuit intro styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Device Grid Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- device grid button[aria pressed="true"]: background (#dfeac4); border-color (#6f8a49).
- pulse point animation: `point 3s ease-in-out infinite`.
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

An interactive exploded phone model replaces decorative circuit paths. Visitors assemble the device or inspect its screen, power cell and logic board. Layer motion respects reduced-motion preferences.
