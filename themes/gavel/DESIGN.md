---
name: Gavel
description: Objects with another chapter. A considered auction catalog with an interactive local bidding rhythm.
colors:
  surface: '#f5f0e7'
  text: '#302b27'
  html-tone: '#a83528'
  header-tone: '#bfb5a8'
  lot-stamp-tone: '#f8f2e5'
  lot-nav-button-tone: '#6b6058'
  maker-tone: '#756454'
  lot-image-surface: '#dcd3c7'
  lot-stamp-surface: '#40352bd9'
  bid-button-ink: '#fff6e9'
  closing-ink: '#fff2df'
typography:
  display:
    fontFamily: Caslon, serif
    fontSize: clamp(42px, 5.3vw, 76px)
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.04em
  headline:
    fontFamily: DM, sans-serif
  headline-context-1:
    fontFamily: Caslon
    fontWeight: '400'
    fontSize: 43px
    lineHeight: '1.12'
    letterSpacing: -0.03em
  headline-context-2:
    fontFamily: Caslon
    fontSize: 37px
    lineHeight: '1.2'
    fontWeight: '400'
    letterSpacing: -0.03em
  title:
    fontFamily: DM, sans-serif
  title-context-1:
    fontFamily: DM, sans-serif
    fontSize: 16px
    fontWeight: '500'
  body:
    fontFamily: DM, sans-serif
spacing:
  observed-1: 30px
  observed-2: 25px
  observed-3: 8px
  observed-4: 50px 5%
components:
  navigation:
    textColor: '#302b27'
  lot-stamp:
    textColor: '#f8f2e5'
    backgroundColor: '#40352bd9'
    padding: 13px 16px
  watch:
    backgroundColor: '#f5f0e7'
    rounded: 50%
    width: 43px
    height: 43px
    textColor: '#a83528'
  lot-nav-button:
    backgroundColor: none
    padding: 8px 0 16px
    textColor: '#6b6058'
  offer-input:
    width: 75px
    backgroundColor: none
    textColor: '#302b27'
    padding: 10px 0
  offer-button:
    backgroundColor: none
    padding: 12px
    textColor: '#302b27'
  closing:
    backgroundColor: '#a83528'
    textColor: '#fff2df'
    padding: 50px 5%
---

# Design System: Gavel

## Overview

**Creative North Star: "An auction folio in persimmon and old paper"**

An auction folio in persimmon and old paper. Three lots occupy one expansive photographic plate with a stamped lot number; the bid ledger sits beside it. Changing lots changes both content and local state.

This records the implemented auctions template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Auctions composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The user delegates creative direction and requests distinct sector-specific worlds. Parent seed 9c08d10d assigns grounded candidate 4, a public exploration atlas. This collection translates navigable spatial knowledge into the page appropriate to each sector, not a shared skin. Rietveld sliding planes are competitive for spatial clarity; their contribution is a reversible relationship between controls and scene. Night-city ambience is competitive for Equinox only. VU meter and marker lettering are declined for product clarity; their kept discipline is explicit state feedback and confident scale, not copied motifs.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Surface**: page ground.
- **Text**: principal text.
- **Html Tone**: context-specific authored color.
- **Header Tone**: context-specific authored color.
- **Lot Stamp Tone**: context-specific authored color.
- **Lot Nav Button Tone**: context-specific authored color.
- **Maker Tone**: context-specific authored color.
- **Lot Image Surface**: context-specific authored color.
- **Lot Stamp Surface**: context-specific authored color.
- **Bid Button Ink**: context-specific authored color.
- **Closing Ink**: context-specific authored color.

## Typography

- **DM** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 1000.
- **Caslon** is the CSS family alias for Libre Caslon Text. Local faces: normal / 400, italic / normal.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand span uses the font shorthand (`11px DM`).
- how h2 uses the font shorthand (`400 37px/1.2 Caslon`).

## Layout

- **Lot layout**: grid-template-columns (1.1fr 1fr); gap (5%); padding (40px 5% 65px).
- **How**: padding (60px 5%); grid-template-columns (1.2fr 1fr 1fr); gap (8%).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 900px)`, `(max-width: 600px)`.
- @media (max-width: 600px): lot layout changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 600px): how changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 600px): footer changes to flex-direction (column).

## Elevation & Depth

Depth is locally authored on the following surfaces; these values are not a general card-shadow preset.

- lot nav button[aria selected="true"]: `0 2px #a83528`.

## Shapes

- watch: corners (`50%`).

## Components

Switch lots, keep a local watchlist, increment a bid, submit a valid demo offer and expand condition notes. Bids affect only the selected lot and are not sent to a server.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Lot Stamp

Authored lot stamp styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Watch

Authored watch styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Lot Nav Button

Authored lot nav button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Offer Input

Authored offer input styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Offer Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Closing

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- a:focus visible: outline (3px solid #a83528); outline-offset (4px).
- lot nav button[aria selected="true"]: color (#a83528).
- offer button:disabled: opacity (0.35).
- lot image   img animation: `focus 0.6s ease-out`.
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
