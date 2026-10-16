---
name: Campus
description: A vivid learning workspace with lessons, notes and real progress.
colors:
  paper: '#f5f1e8'
  ink: '#242820'
  accent: '#6c5717'
  header-tone: '#c5c4b7'
  type-art-tone: '#e8d559'
  workspace-aside-surface: '#eae9df'
  progress-div-surface: '#cccec0'
  notebook-surface: '#e8e5da'
typography:
  display:
    fontFamily: Display, sans-serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 3.6vw, 3.6rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display, sans-serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.04em
    fontSize: 40px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 22px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 12px
  observed-2: 20px
  observed-3: 16px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#242820'
    textColor: '#f5f1e8'
  navigation:
    textColor: '#242820'
  type-art:
    height: 220px
    backgroundColor: '#e8d559'
    padding: 25px 40px
    textColor: '#242820'
---

# Design System: Campus

## Overview

**Creative North Star: "A yellow and charcoal course workspace"**

A yellow and charcoal course workspace: a persistent syllabus rail, a typographic lesson canvas, lesson completion and a locally editable notebook. The opening is a working learning surface rather than marketing.

This records the implemented online learning template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Online learning composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Header Tone**: context-specific authored color.
- **Type Art Tone**: context-specific authored color.
- **Workspace Aside Surface**: context-specific authored color.
- **Progress Div Surface**: context-specific authored color.
- **Notebook Surface**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Space Grotesk Light. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Workspace**: grid-template-columns (290px 1fr); max-width (1600px).
- **Notebook**: padding (35px 45px); grid-template-columns (1fr 1.7fr); gap (25px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): workspace changes to grid-template-columns (230px 1fr).
- @media (max-width: 900px): notebook changes to grid-template-columns (1fr).
- @media (max-width: 650px): workspace nav changes to grid-template-columns (1fr 1fr).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).

## Components

Choose a lesson, mark it complete and edit or save a local note.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Type Art

Authored type art styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- progress i transition: `width 0.5s`.
- focus frame animation: `focusFind 4s ease-in-out infinite alternate`.
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

A photographic observation study replaces the repeated yellow typographic placeholder. Shape, Light and Rhythm lenses change the crop and teaching prompt while preserving lesson progress and notes.
