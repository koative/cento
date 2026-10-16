---
name: Meridian
description: A map-and-list property finder with saved homes and viewing requests.
colors:
  paper: '#eef0e8'
  ink: '#253c32'
  accent: '#a34724'
  searchbar-tone: '#fffef5'
  finder-tone: '#b7c3b1'
  title-em-ink: '#6b7d5d'
  searchbar-span-ink: '#53644d'
  listing-heading-span-last-child-ink: '#5a6b50'
typography:
  display:
    fontFamily: Display, serif
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(3.5rem, 6vw, 5.7rem)
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
    fontSize: 27px
  headline-context-2:
    fontFamily: '"Body", sans-serif'
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
  observed-3: 10px
  observed-4: 16px
  observed-5: 20px 0
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#253c32'
    textColor: '#eef0e8'
  navigation:
    textColor: '#253c32'
  searchbar:
    padding: 14px 20px
    backgroundColor: '#fffef5'
    textColor: '#253c32'
---

# Design System: Meridian

## Overview

**Creative North Star: "Meridian real estate world"**

An airy property atlas with a full-width search bar, illustrated schematic neighborhood map, horizontal listing rows, and a local viewing planner. Forest ink and butter map acreage balance domestic photography.

This records the implemented real estate template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Real estate composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Searchbar Tone**: context-specific authored color.
- **Finder Tone**: context-specific authored color.
- **Title Em Ink**: context-specific authored color.
- **Searchbar Span Ink**: context-specific authored color.
- **Listing Heading Span Last Child Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Instrument Serif. Local faces: italic / 100 900, normal / 100 900.
- **Body** is the CSS family alias for Manrope ExtraLight. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Finder body**: grid-template-columns (42% 58%).
- **Listing article**: grid-template-columns (36% 1fr); gap (20px); padding (20px 0).
- **Viewing**: padding (0 4vw 60px); grid-template-columns (1fr 1fr); gap (8vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): finder body changes to grid-template-columns (1fr).
- @media (max-width: 900px): listing article changes to grid-template-columns (30% 1fr).
- @media (max-width: 650px): listing article changes to grid-template-columns (35% 1fr); gap (13px).
- @media (max-width: 650px): viewing changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- pin: `0 5px 14px #253c3220`.

## Shapes

- input: corners (`0`).
- pin: corners (`8px`).

## Components

Filter homes, save selections and preview a viewing request.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Searchbar

Authored searchbar styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- pin:hover: background (#a34724).
- save[aria pressed="true"]: outline (0); color (#a34724).
- pin animation: `pinDrop 0.8s ease-out`.
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
