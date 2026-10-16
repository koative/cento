---
name: Solace
description: A warm, appointment-first clinic with a calm visit planner.
colors:
  paper: '#f4f3eb'
  ink: '#183e38'
  accent: '#9a562d'
  care-tone: '#b7c5b3'
  intro-em-ink: '#607b68'
  visit-surface: '#e2eadc'
  note-surface: '#d9dfd2'
typography:
  display:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 5.5vw, 5.5rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 34px
  headline-context-2:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
    fontWeight: '500'
    fontSize: 21px
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 10px
  observed-2: 12px
  observed-3: 10px 16px
  observed-4: 16px
  observed-5: '0'
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#183e38'
    textColor: '#f4f3eb'
  navigation:
    textColor: '#183e38'
  visit:
    backgroundColor: '#e2eadc'
    padding: 35px
    rounded: 18px
    textColor: '#183e38'
---

# Design System: Solace

## Overview

**Creative North Star: "A sage appointment sheet"**

A sage appointment sheet: a friendly circular portrait paired with a four-step visit planner, clean service rows, and an unfolding care note. The booking form shows a local confirmation with selected visit type and time.

This records the implemented healthcare clinic template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Healthcare clinic composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Care Tone**: context-specific authored color.
- **Intro Em Ink**: context-specific authored color.
- **Visit Surface**: context-specific authored color.
- **Note Surface**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Lora. Local faces: italic / 100 900, normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Welcome**: grid-template-columns (1fr 0.85fr); gap (7vw); padding (65px 6vw).
- **Care**: grid-template-columns (1fr 1fr); gap (9vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): welcome changes to grid-template-columns (1fr).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- portrait img: corners (`150px 150px 0 0`).
- visit: corners (`18px`).

## Components

Choose visit type, day and time; prepare a local visit confirmation.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Visit

Authored visit styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- visit button[aria pressed="true"]: outline (0); background (var(--ink)); color (var(--paper)).
- portrait img animation: `solaceReveal 1.6s ease-out both`.
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
