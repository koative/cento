---
name: Helix
description: An organic research journal with a moving molecular study and a personal study library.
colors:
  paper: '#f7f6ef'
  ink: '#233c35'
  muted: '#596f64'
  accent: '#ae456f'
  line: '#ced5c9'
  orbit-tone: '#a3b29b'
  specimen-surface: '#e6ebe0'
  study-detail-surface: '#e9eedd'
  approach-ink: '#f3f4e8'
typography:
  display:
    fontFamily: Italiana, serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(3rem, 6.8vw, 6rem)
    fontWeight: '400'
  headline:
    fontFamily: Italiana, serif
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
    fontWeight: '400'
  title:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
  title-context-1:
    fontFamily: Italiana, serif
    lineHeight: '1.2'
    fontSize: 37px
  title-context-2:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.2'
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
  observed-2: 50%
spacing:
  observed-1: 8px
  observed-2: 12px
  observed-3: 20px
  observed-4: 28px
components:
  primary-button:
    textColor: '#f7f6ef'
    padding: 13px 20px
    backgroundColor: '#233c35'
    rounded: 3px
  selection-tab:
    textColor: inherit
    padding: 9px 16px
    backgroundColor: transparent
    rounded: 3px
  study-detail:
    padding: 35px
    backgroundColor: '#e9eedd'
    rounded: 0 70px 0 0
    textColor: '#233c35'
  nav-nav:
    textColor: '#233c35'
  motion:
    textColor: inherit
    rounded: 50%
    width: 42px
    height: 42px
    backgroundColor: transparent
  study-list-button:
    textColor: inherit
    width: 100%
    padding: 28px 0
    backgroundColor: transparent
---

# Design System: Helix

## Overview

**Creative North Star: "A botanical research folio"**

A botanical research folio: pale sage fields, pink molecular spheres, fine Italiana headings and an indexed study library.

This records the implemented biotechnology template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Biotechnology composition with local, visible state changes.
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
- **Orbit Tone**: context-specific authored color.
- **Specimen Surface**: context-specific authored color.
- **Study Detail Surface**: context-specific authored color.
- **Approach Ink**: context-specific authored color.

## Typography

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600.
- **Italiana** is the CSS family alias for Italiana. Local faces: normal / 400.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- approach   p uses the font shorthand (`400 clamp(2.2rem, 4vw, 3.8rem)/1.15 Italiana, serif`).

## Layout

- **Opening**: grid-template-columns (1.05fr 1fr); min-height (680px).
- **Study grid**: grid-template-columns (1fr 1.1fr); gap (60px).
- **Approach**: grid-template-columns (1.4fr 1fr); padding (75px 7%); gap (80px).
- **Library row**: grid-template-columns (80px 1fr 150px 35px); gap (20px); padding (25px 0).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 760px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 760px): opening changes to grid-template-columns (1fr).
- @media (max-width: 760px): study grid changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 760px): library row changes to grid-template-columns (50px 1fr 35px); gap (12px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- specimen i: `8px 15px 30px #5c46621a`.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- specimen i: corners (`50%`).
- orbit: corners (`50%`).
- motion: corners (`50%`).
- study detail: corners (`0 70px 0 0`).

## Components

Select a research programme, save or remove studies from a local reading list, filter the study library, and pause molecular motion.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Selection tab

Authored tabs button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Study Detail

Authored study detail styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Motion

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Study List Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- study list button[aria pressed="true"]: color (#ae456f).
- specimen i animation: `cell 8s ease-in-out infinite`.
- specimen i animation-delay: `calc(var(--i) * -0.3s)`.
- orbit animation: `orbit 18s linear infinite`.
- o2 animation-delay: `-6s`.
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
