---
name: Heirloom
description: A jewel-box archive with material selection and an engraving preview.
colors:
  paper: '#231f20'
  ink: '#f0e3cf'
  accent: '#c6a269'
  header-tone: '#514646'
  inscription-tone: '#382a24'
  header-span-tone: '#c0ac9c'
  object-p-tone: '#d7c5b2'
  cabinet-mark-ink: '#a78a6a'
  inscription-surface: '#e4d7c2'
  engraving-plate-span-ink: '#35271e'
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
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 42px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: 52px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
rounded:
  observed-1: 50%
spacing:
  observed-1: 12px
  observed-2: '0'
  observed-3: 5vw
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#f0e3cf'
    textColor: '#231f20'
  quiet-button:
    backgroundColor: transparent
    textColor: inherit
    padding: 10px 16px
  navigation:
    textColor: '#f0e3cf'
  inscription:
    backgroundColor: '#e4d7c2'
    textColor: '#382a24'
    padding: 65px 7vw
---

# Design System: Heirloom

## Overview

**Creative North Star: "Heirloom jewelry atelier world"**

A dark jewelry cabinet with a giant CSS gold ring, asymmetrical serif hierarchy, material swatches and a live engraving inscription. Each section reads as a curated object plate rather than a conventional shop grid.

This records the implemented jewelry atelier template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Jewelry atelier composition with local, visible state changes.
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
- **Inscription Tone**: context-specific authored color.
- **Header Span Tone**: context-specific authored color.
- **Object P Tone**: context-specific authored color.
- **Cabinet Mark Ink**: context-specific authored color.
- **Inscription Surface**: context-specific authored color.
- **Engraving Plate Span Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Bodoni Moda 11pt. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Cabinet**: grid-template-columns (0.9fr 1.1fr); min-height (620px); padding (55px 5vw 40px); gap (5vw).
- **Object**: padding (50px 5vw 65px); grid-template-columns (0.6fr 1.2fr 1fr); gap (5vw).
- **Inscription**: padding (65px 7vw); grid-template-columns (1.1fr 0.9fr); gap (10vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): object changes to grid-template-columns (1fr 1fr).
- @media (max-width: 650px): cabinet changes to grid-template-columns (1fr); gap (15px).
- @media (max-width: 650px): object changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 650px): inscription changes to grid-template-columns (1fr); gap (40px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- ring face: `inset 8px 8px 11px #fff6d273, inset -8px -8px 9px #2b140bb3, 7px 24px 25px #0006`.
- engraving plate: `inset 0 8px 15px #4c301c36, inset 0 -6px 12px #fff6e16b`.

## Shapes

- input: corners (`0`).
- ring face: corners (`50%`).
- engraving plate: corners (`50%`).
- metals button: corners (`50%`).

## Components

Choose metal and size, preview engraving and prepare a local piece summary.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quiet button

Authored quiet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Inscription

Authored inscription styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- ring animation: `heirloomTurn 8s ease-in-out infinite alternate`.
- ring face transition: `border-color 0.5s`.
- engraving plate transition: `background 0.5s`.
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
