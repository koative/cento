---
name: Civic
description: An accessible town service directory with search and report tracking.
colors:
  paper: '#f2f3ed'
  ink: '#123f54'
  accent: '#3d630b'
  official-tone: '#fff'
  directory-aside-button-tone: '#b8c9c8'
  search-hero-surface: '#dbe74d'
  town-note-surface: '#dce5df'
typography:
  display:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: clamp(3.5rem, 6.5vw, 6rem)
  headline:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.05'
    fontWeight: '400'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-1:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '500'
    letterSpacing: -0.035em
    fontSize: 36px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '500'
    letterSpacing: -0.035em
    fontSize: 29px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: Display
    lineHeight: '1.5'
    fontSize: 23px
    fontWeight: '500'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 12px
  observed-2: 20px
  observed-3: '0'
  observed-4: 24px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#123f54'
    textColor: '#f2f3ed'
  navigation:
    textColor: '#123f54'
  official:
    padding: 8px 5vw
    backgroundColor: '#123f54'
    textColor: '#fff'
---

# Design System: Civic

## Overview

**Creative North Star: "A public information board in civic blue and citron"**

A public information board in civic blue and citron. A large service search, grouped text directory and useful local issue reporting are the primary composition; an animated status line records a report without pretending to submit it.

This records the implemented public services template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Public services composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Official Tone**: context-specific authored color.
- **Directory Aside Button Tone**: context-specific authored color.
- **Search Hero Surface**: context-specific authored color.
- **Town Note Surface**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for IBM Plex Sans. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Directory body**: grid-template-columns (25% 1fr); gap (40px).
- **Service list**: grid-template-columns (1fr 1fr); gap (0 30px).
- **Report**: grid-template-columns (1fr 1fr); gap (12vw); padding (60px 5vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): directory body changes to grid-template-columns (1fr).
- @media (max-width: 650px): directory aside changes to grid-template-columns (1fr 1fr).
- @media (max-width: 650px): service list changes to grid-template-columns (1fr).
- @media (max-width: 650px): report changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).

## Components

Search and filter services, expand a service and prepare a demonstration report.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Official

Authored official styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- searchbox input:focus: outline (0).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- directory aside button[aria pressed="true"]: outline (0); background (var(--ink)); color (#fff).
- report status animation: `reportReveal 0.7s ease-out`.
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
