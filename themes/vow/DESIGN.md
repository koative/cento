---
name: Vow
description: A romantic wedding folio with an interactive celebration brief.
colors:
  paper: '#f3ede6'
  ink: '#623838'
  accent: '#a34e42'
  folio-copy-span-tone: '#b58f83'
  brief-preview-tone: '#a7817d'
  brief-input-type-range-tone: '#e7b0a1'
  story-surface: '#e6d7cf'
  brief-input-placeholder-ink: '#d0b7ae'
typography:
  display:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(4rem, 7vw, 6rem)
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
    fontSize: 42px
  headline-context-2:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 12px
  observed-2: 20px
  observed-3: '0'
  observed-4: 12vw
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#623838'
    textColor: '#f3ede6'
  navigation:
    textColor: '#623838'
  story:
    backgroundColor: '#e6d7cf'
    padding: 70px 9vw
    textColor: '#623838'
---

# Design System: Vow

## Overview

**Creative North Star: "Vow wedding planning world"**

A rosewood wedding folio with offset photographic pages and a generous centered serif opening. A celebration brief updates estimated planning scope, while quiet image-pan motion feels like turning a memory over.

This records the implemented wedding planning template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Wedding planning composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Folio Copy Span Tone**: context-specific authored color.
- **Brief Preview Tone**: context-specific authored color.
- **Brief Input Type Range Tone**: context-specific authored color.
- **Story Surface**: context-specific authored color.
- **Brief Input Placeholder Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Cormorant Garamond Light. Local faces: italic / 100 900, normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Header**: grid-template-columns (1fr auto 1fr); padding (22px 5vw).
- **Folio**: grid-template-columns (1fr 0.45fr 1.1fr); gap (35px); max-width (1100px).
- **Story**: grid-template-columns (1fr 1fr); gap (12vw); padding (70px 9vw).
- **Celebrations   div**: grid-template-columns (repeat(3, 1fr)); gap (30px).
- **Brief**: grid-template-columns (1fr 1fr); gap (12vw); padding (70px 7vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): folio changes to grid-template-columns (1fr 1fr); gap (17px).
- @media (max-width: 650px): story changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 650px): celebrations   div changes to grid-template-columns (1fr); gap (0).
- @media (max-width: 650px): brief changes to grid-template-columns (1fr); gap (35px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- folio copy a: corners (`50%`).

## Components

Choose celebration style and guest count, then create a named local brief.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Story

Authored story styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- celebrations button[aria pressed="true"]: outline (0).
- brief btn:hover: background (#e7b0a1).
- folio img animation: `memory 2s ease-out both`.
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
