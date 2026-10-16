---
name: Cipher
description: A clear identity-security workspace with interactive access review decisions.
colors:
  paper: '#f6f5ef'
  ink: '#25352e'
  muted: '#617066'
  accent: '#39774d'
  line: '#d7dcd0'
  review-tone: '#c8d2c1'
  cipher-opening-h1-span-ink: '#778c78'
  trust-line-i-surface: '#a4bb9b'
  trust-line-span-surface: '#bac9b3'
  review-surface: '#fffef9'
  review-nav-surface: '#e8eddf'
  review-aside-button-aria-pressed-true-surface: '#edf0e5'
  avatar-surface: '#dbe5cc'
  risk-dot-surface: '#96ad87'
  risk-dotelevated-surface: '#ba8551'
  risk-surface: '#e5eddf'
  riskelevated-surface: '#f6e9d6'
  riskelevated-ink: '#79572c'
typography:
  display:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.12'
    letterSpacing: -0.035em
    fontSize: clamp(2.8rem, 5.2vw, 5rem)
  headline:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
  headline-context-1:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.02em
    fontSize: 23px
  headline-context-2:
    fontFamily: Manrope, sans-serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 36px
  title:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
  title-context-1:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
    fontSize: 14px
  title-context-2:
    fontFamily: DM, sans-serif
    lineHeight: '1.2'
    fontSize: 20px
  body:
    fontFamily: DM, sans-serif
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
spacing:
  observed-1: 12px
  observed-2: 10px
  observed-3: 8px
  observed-4: 30px
  observed-5: 20px
  observed-6: 25px
  observed-7: 15px
  observed-8: 10%
components:
  primary-button:
    textColor: '#f6f5ef'
    padding: 13px 20px
    backgroundColor: '#25352e'
    rounded: 3px
  secondary-button:
    textColor: '#25352e'
    padding: 13px 20px
    backgroundColor: transparent
    rounded: 3px
  review-nav:
    padding: 20px 24px
    backgroundColor: '#e8eddf'
    textColor: '#25352e'
  nav-nav:
    textColor: '#25352e'
  review-aside-button:
    textColor: inherit
    width: 100%
    padding: 14px 10px
    backgroundColor: transparent
    rounded: 8px
---

# Design System: Cipher

## Overview

**Creative North Star: "An open review ledger"**

An open review ledger: ivory and soft green, readable identity relationships, clear decision states and restrained product framing.

This records the implemented cybersecurity template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Cybersecurity composition with local, visible state changes.
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
- **Review Tone**: context-specific authored color.
- **Cipher Opening H1 Span Ink**: context-specific authored color.
- **Trust Line I Surface**: context-specific authored color.
- **Trust Line Span Surface**: context-specific authored color.
- **Review Surface**: context-specific authored color.
- **Review Nav Surface**: context-specific authored color.
- **Review Aside Button Aria Pressed True Surface**: context-specific authored color.
- **Avatar Surface**: context-specific authored color.
- **Risk Dot Surface**: context-specific authored color.
- **Risk Dotelevated Surface**: context-specific authored color.
- **Risk Surface**: context-specific authored color.
- **Riskelevated Surface**: context-specific authored color.
- **Riskelevated Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Manrope** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 200 800.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Review body**: grid-template-columns (260px 1fr).
- **Review explanation**: grid-template-columns (1fr 1fr); gap (30px).
- **Principles**: grid-template-columns (1fr 1.2fr); gap (10%).
- **Principles article**: grid-template-columns (26px 1fr); gap (10px 20px).
- **Answers**: grid-template-columns (1fr 1.2fr); gap (10%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 900px): review body changes to grid-template-columns (210px 1fr).
- @media (max-width: 900px): review explanation changes to grid-template-columns (1fr); gap (22px).
- @media (max-width: 650px): cipher opening   div:not(trust line) changes to flex-direction (column).
- @media (max-width: 650px): review body changes to grid-template-columns (1fr).
- @media (max-width: 650px): principles changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- review: `0 18px 45px #273b2810`.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- trust line i: corners (`50%`).
- review: corners (`12px`).
- review aside button: corners (`8px`).
- avatar: corners (`50%`).

## Components

Select identities, review their fictional access context, keep or revoke access locally, and expand answers.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Secondary button

Authored btnsecondary styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Review Nav

Authored review nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Review Aside Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- review aside button[aria pressed="true"]: background (#edf0e5).
- trust line i animation: `trust 4s ease-in-out infinite`.
- trust line i:nth of type(2) animation-delay: `0.4s`.
- trust line i:nth of type(3) animation-delay: `0.8s`.
- trust line i:nth of type(4) animation-delay: `1.2s`.
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
