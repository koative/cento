---
name: Counsel
description: An editorial legal practice with a guided enquiry brief.
colors:
  paper: '#e8e1d3'
  ink: '#292b23'
  accent: '#98622e'
  header-tone: '#817f70'
  opening-h1-em-ink: '#99602e'
  practice-detail-surface: '#d5c9b5'
  principle-em-ink: '#c7aa7f'
typography:
  display:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(4rem, 8vw, 6rem)
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
    fontSize: 33px
  headline-context-2:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2.5rem, 4.5vw, 4.5rem)
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: Display, serif
    lineHeight: '1.12'
    fontWeight: '400'
    fontSize: 34px
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 20px
  observed-2: 12px
  observed-3: '0'
  observed-4: 70px 5vw
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#292b23'
    textColor: '#e8e1d3'
  navigation:
    textColor: '#292b23'
  principle:
    padding: 70px 5vw
    backgroundColor: '#292b23'
    textColor: '#e8e1d3'
---

# Design System: Counsel

## Overview

**Creative North Star: "An archival casefolio in ochre, limestone and charcoal"**

An archival casefolio in ochre, limestone and charcoal. Wide ruled chapter headings, generous serif type, a vertical practice index and a working enquiry summary replace typical legal hero conventions.

This records the implemented law practice template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Law practice composition with local, visible state changes.
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
- **Opening H1 Em Ink**: context-specific authored color.
- **Practice Detail Surface**: context-specific authored color.
- **Principle Em Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Libre Caslon Text. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Practice**: grid-template-columns (30% 70%).
- **Practice detail**: grid-template-columns (42% 58%).
- **Enquiry**: grid-template-columns (1fr 1fr); gap (12vw); padding (70px 5vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): practice changes to grid-template-columns (1fr).
- @media (max-width: 650px): practice detail changes to grid-template-columns (1fr).
- @media (max-width: 650px): enquiry changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- round link: corners (`50%`).

## Components

Choose a practice area and enter a name to prepare an enquiry summary.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Principle

Authored principle styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- round link:hover: background (#d2c3ab).
- practice aside button[aria pressed="true"]: outline (0); color (#98622e).
- round link transition: `background 0.2s`.
- practice detail animation: `caseReveal 0.5s ease-out`.
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
