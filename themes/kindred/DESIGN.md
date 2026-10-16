---
name: Kindred
description: A spirited adoption board with animal filters and meet-and-greet requests.
colors:
  paper: '#f7e9cf'
  ink: '#3a392c'
  accent: '#b44720'
  friends-head-button-aria-pressed-true-tone: '#fff3dc'
  hello-tone: '#f0c449'
  friends-head-button-tone: '#756f54'
  meet-tone: '#3a513c'
  friends-surface: '#eadbbd'
  meet-input-placeholder-ink: '#d0d6c6'
typography:
  display:
    fontFamily: Display
    lineHeight: '0.98'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: clamp(4rem, 6.8vw, 6rem)
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
    fontSize: clamp(2rem, 4vw, 3.7rem)
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: 54px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: Display
    lineHeight: '1.5'
    fontSize: 33px
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
spacing:
  observed-1: 20px
  observed-2: 12px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#3a392c'
    textColor: '#f7e9cf'
  quiet-button:
    backgroundColor: transparent
    textColor: inherit
    padding: 10px 16px
  navigation:
    textColor: '#3a392c'
  hello:
    backgroundColor: '#f0c449'
    textColor: '#3a392c'
    padding: 24px 16px
    rounded: 50%
---

# Design System: Kindred

## Overview

**Creative North Star: "An affectionate adoption noticeboard in orange, cream and forest"**

An affectionate adoption noticeboard in orange, cream and forest. Oversized animal photography, informal bold type, a species filter and an inline meeting request make matching the central experience.

This records the implemented pet adoption template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Pet adoption composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Friends Head Button Aria Pressed True Tone**: context-specific authored color.
- **Hello Tone**: context-specific authored color.
- **Friends Head Button Tone**: context-specific authored color.
- **Meet Tone**: context-specific authored color.
- **Friends Surface**: context-specific authored color.
- **Meet Input Placeholder Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Intro**: padding (30px 5vw 55px); grid-template-columns (1fr 1fr); gap (4vw).
- **Pet grid**: grid-template-columns (repeat(3, 1fr)); gap (28px).
- **How**: padding (65px 7vw); grid-template-columns (1fr 1fr); gap (7vw).
- **Meet**: padding (60px 7vw); grid-template-columns (1fr 1fr); gap (10vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 650px): intro changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 650px): pet grid changes to grid-template-columns (1fr); gap (35px).
- @media (max-width: 650px): how changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- hero pet   img: corners (`180px 180px 20px 20px`).
- hello: corners (`50%`).
- friends head button: corners (`25px`).
- pet photo   span: corners (`18px`).

## Components

Filter animals, select a companion and prepare a meeting request.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quiet button

Authored quiet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Hello

Authored hello styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- friends head button[aria pressed="true"]: outline (0); background (#3a392c); color (#fff3dc).
- meet btn:hover: background (#f7e9cf).
- pet label animation: `hello 1.2s ease-out`.
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
