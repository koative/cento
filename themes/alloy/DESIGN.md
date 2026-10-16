---
name: Alloy
description: A building studio project index with a staged blueprint and project brief intake.
colors:
  paper: '#ece9e0'
  ink: '#35352e'
  muted: '#79776a'
  accent: '#aa512a'
  line: '#c9c5b6'
  method-tone: '#2c3b30'
  project-caption-tone: '#fff7e8'
  method-intro-p-tone: '#c2ceb9'
  stage-tabs-button-aria-pressed-true-span-tone: '#c3d0a2'
  stage-content-span-tone: '#a5b892'
  project-photo-surface: '#6f7469'
  project-stamp-surface: '#c8d5b5'
  project-stamp-ink: '#36472d'
  method-ink: '#e7ebdd'
  stage-tabs-button-ink: '#bac9af'
  blueprint-spanbuilt-surface: '#59714b'
  brief-surface: '#c3cbb0'
  brief-input-surface: '#d4dbc6'
typography:
  display:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '0.94'
    letterSpacing: -0.02em
    fontSize: clamp(3.4rem, 7.8vw, 6rem)
    fontWeight: '600'
  headline:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: clamp(2rem, 4vw, 4rem)
    fontWeight: '600'
  headline-context-1:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 48px
    fontWeight: '600'
  headline-context-2:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.02'
    letterSpacing: -0.035em
    fontSize: 51px
    fontWeight: '600'
  title:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.2'
    fontWeight: '600'
  title-context-1:
    fontFamily: '"Barlow Condensed", sans-serif'
    lineHeight: '1.2'
    fontWeight: '600'
    fontSize: 31px
  body:
    fontFamily: '"DM Sans", sans-serif'
    lineHeight: '1.55'
rounded:
  observed-1: 3px
spacing:
  observed-1: 8px
  observed-2: 20px
  observed-3: 10px
  observed-4: 10%
  observed-5: 12px
  observed-6: 35px
  observed-7: 60px 6%
components:
  primary-button:
    textColor: '#ece9e0'
    padding: 13px 20px
    backgroundColor: '#35352e'
    rounded: 3px
  text-field:
    textColor: inherit
    padding: 13px
    backgroundColor: '#ece9e0'
    rounded: 3px
  project-stamp:
    backgroundColor: '#c8d5b5'
    textColor: '#36472d'
    padding: 16px 20px
  nav-nav:
    textColor: '#35352e'
  field-select:
    textColor: inherit
    padding: 13px
    backgroundColor: '{colors.paper}'
    rounded: 3px
  project-index-button:
    textColor: inherit
    width: 100%
    backgroundColor: none
    padding: 22px 0
---

# Design System: Alloy

## Overview

**Creative North Star: "A site project folio"**

A site project folio: broad architectural image, condensed construction lettering, olive blueprint phase diagram and practical project brief.

This records the implemented construction template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Construction composition with local, visible state changes.
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
- **Method Tone**: context-specific authored color.
- **Project Caption Tone**: context-specific authored color.
- **Method Intro P Tone**: context-specific authored color.
- **Stage Tabs Button Aria Pressed True Span Tone**: context-specific authored color.
- **Stage Content Span Tone**: context-specific authored color.
- **Project Photo Surface**: context-specific authored color.
- **Project Stamp Surface**: context-specific authored color.
- **Project Stamp Ink**: context-specific authored color.
- **Method Ink**: context-specific authored color.
- **Stage Tabs Button Ink**: context-specific authored color.
- **Blueprint Spanbuilt Surface**: context-specific authored color.
- **Brief Surface**: context-specific authored color.
- **Brief Input Surface**: context-specific authored color.

## Typography

- **Barlow Condensed** is the CSS family alias for Barlow Condensed Medium, Barlow Condensed SemiBold, Barlow Condensed, Barlow Condensed ExtraBold. Local faces: normal / 500, normal / 600, normal / 700, normal / 800.
- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 700.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- project stamp strong uses the font shorthand (`600 23px "Barlow Condensed", sans-serif`).
- project index strong uses the font shorthand (`500 29px "Barlow Condensed", sans-serif`).
- measure uses the font shorthand (`9px monospace`).

## Layout

- **Project stage**: grid-template-columns (1.9fr 1fr); gap (35px).
- **Method**: grid-template-columns (1fr 1.25fr); gap (10%); padding (60px 6%).
- **Blueprint**: grid-template-columns (1.5fr 1fr 1fr); gap (8px); padding (10px).
- **Capabilities**: grid-template-columns (1fr 1.25fr); gap (10%).
- **Brief**: padding (60px 6%); grid-template-columns (1fr 1.25fr); gap (10%).
- **Brief form**: grid-template-columns (1fr 1fr); gap (20px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 750px)`.
- @media (max-width: 650px): section title changes to flex-direction (column).
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 750px): alloy title   div changes to flex-direction (column); gap (18px).
- @media (max-width: 750px): project stage changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 750px): project caption changes to flex-direction (column); gap (10px).
- @media (max-width: 750px): method changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 750px): brief form changes to grid-template-columns (1fr).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- btn: corners (`3px`).
- field input: corners (`3px`).
- tabs button: corners (`3px`).
- stage tabs button   span: corners (`50%`).

## Components

Select projects, explore the four project stages, expand services and submit a validated local project brief.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Text field

Authored field input styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Project Stamp

Authored project stamp styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Nav Nav

Authored nav nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Field Select

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Project Index Button

Authored source styling with representative content; interactive behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- :focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- button:hover: filter (brightness(0.94)).
- tabs button[aria pressed="true"]: background (var(--ink)); color (var(--paper)); border-color (var(--ink)).
- project index button[aria pressed="true"]: color (var(--accent)).
- project photo   img animation: `building-reveal 1.2s ease-out`.
- blueprint   span transition: `background 0.6s`.
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
