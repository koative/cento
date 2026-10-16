---
name: Saffron
description: A seasonal neighborhood market with a working basket and pickup summary.
colors:
  paper: '#f5efd9'
  ink: '#3c4726'
  accent: '#a3412d'
  filters-button-tone: '#a6ab82'
  ticker-tone: '#fff0d5'
  ticker-tone-2: '#613243'
  header-tone: '#c5c2a2'
  hero-copy-surface: '#d9df92'
  market-aside-surface: '#e5dfc6'
  market-story-em-ink: '#dfbc7f'
typography:
  display:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: clamp(3.5rem, 6vw, 5.8rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: 38px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: 28px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
    fontSize: 17px
    fontWeight: '500'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 50px 5vw
  observed-2: 12px
  observed-3: '0'
  observed-4: 7px
  observed-5: 25px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#3c4726'
    textColor: '#f5efd9'
  navigation:
    textColor: '#3c4726'
  filter-control:
    padding: 8px 14px
    backgroundColor: transparent
    rounded: 20px
    textColor: '#3c4726'
  ticker:
    backgroundColor: '#613243'
    textColor: '#fff0d5'
    padding: 8px 0
---

# Design System: Saffron

## Overview

**Creative North Star: "A lively market order sheet in aubergine, tomato and butter"**

A lively market order sheet in aubergine, tomato and butter. A photographic produce masthead leads to a compact grocery ledger with quantity controls, live total and pickup slot selection. The basket changes as real line items, never a fake checkout.

This records the implemented grocery market template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Grocery market composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Filters Button Tone**: context-specific authored color.
- **Ticker Tone**: context-specific authored color.
- **Ticker Tone 2**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Hero Copy Surface**: context-specific authored color.
- **Market Aside Surface**: context-specific authored color.
- **Market Story Em Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Market hero**: grid-template-columns (1.1fr 1fr); min-height (430px).
- **Market layout**: grid-template-columns (1.7fr 1fr); gap (40px).
- **Produce list article**: grid-template-columns (45px 1fr 60px 96px); gap (17px); padding (21px 0).
- **Market story**: padding (50px 5vw); grid-template-columns (0.25fr 1fr 1fr); gap (4vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): market layout changes to grid-template-columns (1.4fr 1fr); gap (25px).
- @media (max-width: 900px): produce list article changes to grid-template-columns (1fr 55px 90px); gap (10px).
- @media (max-width: 900px): market story changes to grid-template-columns (1fr 1fr).
- @media (max-width: 650px): market hero changes to grid-template-columns (1fr).
- @media (max-width: 650px): market layout changes to grid-template-columns (1fr).
- @media (max-width: 650px): produce list article changes to grid-template-columns (1fr 50px 85px).
- @media (max-width: 650px): market story changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- market stamp: corners (`50%`).
- filters button: corners (`20px`).

## Components

Filter groceries, adjust quantities and prepare a pickup summary.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Filter control

Authored filters button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Ticker

Authored ticker styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- filters button[aria pressed="true"]: outline (0); background (#3c4726); color (#fff0d5).
- ticker span animation: `marketScroll 22s linear infinite`.
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
