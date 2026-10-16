---
name: Field
description: A community football match hub with fixtures, results, and a signup squad.
colors:
  paper: '#e6eddf'
  ink: '#143c2a'
  header-tone: '#9eaf9a'
  match-label-tone: '#50715e'
  crest-tone: '#d0dfb9'
  pitch-lines-tone: '#65866d'
  club-band-tone: '#c5d69b'
  club-title-h1-span-ink: '#518052'
  versus-ink: '#9db88c'
  fixture-list-h3-span-ink: '#58735a'
  join-photo-span-ink: '#fff'
  join-form-input-placeholder-ink: '#b3c5ad'
typography:
  display:
    fontFamily: '"Barlow Condensed"'
    fontSize: clamp(72px, 8.5vw, 120px)
    lineHeight: '0.89'
    fontWeight: '700'
    letterSpacing: -0.02em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Barlow Condensed"'
    fontSize: 53px
    lineHeight: normal
    fontWeight: '600'
  headline-context-2:
    fontFamily: '"Barlow Condensed"'
    fontSize: 59px
    lineHeight: '0.95'
    fontWeight: '600'
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Barlow Condensed"'
    fontSize: 27px
    lineHeight: '1.2'
    fontWeight: '600'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: 20px
  observed-2: 25px
  observed-3: 30px
components:
  navigation:
    textColor: '#143c2a'
  next-match:
    backgroundColor: '#143c2a'
    textColor: '#e6eddf'
    padding: 30px 30px 0
  fixture-tabs-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 10px 0 16px
  fixture-heading-select:
    textColor: inherit
    backgroundColor: transparent
    padding: 12px 18px
---

# Design System: Field

## Overview

**Creative North Star: "Community matchday programme in club green and white with giant score typography"**

Community matchday programme in club green and white with giant score typography. A community football match hub with fixtures, results, and a signup squad.

This records the implemented community sports template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Community sports composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Header Tone**: context-specific authored color.
- **Match Label Tone**: context-specific authored color.
- **Crest Tone**: context-specific authored color.
- **Pitch Lines Tone**: context-specific authored color.
- **Club Band Tone**: context-specific authored color.
- **Club Title H1 Span Ink**: context-specific authored color.
- **Versus Ink**: context-specific authored color.
- **Fixture List H3 Span Ink**: context-specific authored color.
- **Join Photo Span Ink**: context-specific authored color.
- **Join Form Input Placeholder Ink**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold, Barlow Condensed Black. Local faces: normal / 500, normal / 600, normal / 700, normal / 800, normal / 900.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- brand uses the font shorthand (`800 38px "Barlow Condensed"`).
- brand   span uses the font shorthand (`8px/1.5 "DM Sans"`).
- club title h1 uses the font shorthand (`700 clamp(72px, 8.5vw, 120px)/0.89 "Barlow Condensed"`).
- crest uses the font shorthand (`700 40px "Barlow Condensed"`).
- match teams b uses the font shorthand (`600 25px/1 "Barlow Condensed"`).

## Layout

- **Matchday**: grid-template-columns (1.2fr 1fr); padding (45px 5vw 55px); gap (60px).
- **Fixture list article**: grid-template-columns (1fr 2fr 0.8fr 1fr); gap (30px); padding (26px 0).
- **Join**: grid-template-columns (1fr 1fr).
- **Club values**: padding (70px 5vw); grid-template-columns (1fr 1fr); gap (70px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 850px)`, `(max-width: 600px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 600px): matchday changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 600px): fixture list article changes to grid-template-columns (75px 1fr 55px); gap (15px).
- @media (max-width: 600px): join changes to grid-template-columns (1fr).
- @media (max-width: 600px): club values changes to grid-template-columns (1fr); gap (25px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- crest: corners (`0 0 40% 40%`).
- join form input: corners (`0`).

## Components

Switch fixtures and results, filter teams and prepare a training signup.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Next Match

Authored next match styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Fixture Tabs Button

Authored fixture tabs button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Fixture Heading Select

Authored fixture heading select styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- pitch lines svg animation: `pitch 2s cubic-bezier(0.16, 1, 0.3, 1)`.
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
