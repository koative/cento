---
name: Nest
description: A colorful early-years studio with age-based schedules and visit planning.
colors:
  paper: '#f6e8cc'
  ink: '#423936'
  accent: '#8c4a30'
  photo-block-tone: '#c3b1cc'
  approach-em-tone: '#774328'
  welcome-em-ink: '#9860a0'
  shape-row-span-surface: '#b9be75'
  shape-row-span-nth-child-2-surface: '#b697c7'
  shape-row-span-nth-child-3-surface: '#e9a567'
  approach-surface: '#e6b594'
  timetable-article-surface: '#d1d5a1'
  timetable-article-nth-child-3-surface: '#eac67a'
  timetable-article-nth-child-4-surface: '#e4b29a'
  visit-surface: '#d8d6b3'
  visit-em-ink: '#6d6738'
  visit-input-surface: '#eeecd6'
  hello-art-span-nth-child-even-ink: '#776081'
  hello-art-span-nth-child-3-ink: '#74773f'
typography:
  display:
    fontFamily: Display
    lineHeight: '1'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: clamp(3.5rem, 6.7vw, 6rem)
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
    fontSize: 55px
  headline-context-2:
    fontFamily: Display
    lineHeight: '1.05'
    fontWeight: '600'
    letterSpacing: -0.035em
    fontSize: 45px
  title:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
  title-context-1:
    fontFamily: Display
    lineHeight: '1.1'
    fontSize: 25px
    fontWeight: '600'
  body:
    fontFamily: '"Body", sans-serif'
    lineHeight: '1.5'
rounded:
  observed-1: 50%
  observed-2: 25px
  observed-3: 8px
spacing:
  observed-1: 12px
  observed-2: 20px
  observed-3: 16px
components:
  primary-button:
    padding: 14px 22px
    backgroundColor: '#423936'
    textColor: '#f6e8cc'
  quiet-button:
    backgroundColor: transparent
    textColor: inherit
    padding: 10px 16px
  navigation:
    textColor: '#423936'
  photo-block:
    backgroundColor: '#c3b1cc'
    padding: 25px 25px 65px
    textColor: '#423936'
---

# Design System: Nest

## Overview

**Creative North Star: "A playful school-day collage in peach, violet, leaf and butter"**

A playful school-day collage in peach, violet, leaf and butter. Oversized type, a real classroom photo, age tabs and a tactile daily timetable establish care through visible routines. A local visit planner gives the parent a concrete next step.

This records the implemented childcare template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Childcare composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

The collection considered a neighborhood gazette, service counter, museum directory, brand magazine, specimen catalogue, community field guide, and event programme. Seed `4fa713db` assigned sixth, community field guide: navigable specificity and contextual choices. This template translates that discipline into its own sector world, not common visual scaffolding. Explicit delegated creative direction authorizes code-led implementation.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Accent**: interactive emphasis.
- **Photo Block Tone**: context-specific authored color.
- **Approach Em Tone**: context-specific authored color.
- **Welcome Em Ink**: context-specific authored color.
- **Shape Row Span Surface**: context-specific authored color.
- **Shape Row Span Nth Child 2 Surface**: context-specific authored color.
- **Shape Row Span Nth Child 3 Surface**: context-specific authored color.
- **Approach Surface**: context-specific authored color.
- **Timetable Article Surface**: context-specific authored color.
- **Timetable Article Nth Child 3 Surface**: context-specific authored color.
- **Timetable Article Nth Child 4 Surface**: context-specific authored color.
- **Visit Surface**: context-specific authored color.
- **Visit Em Ink**: context-specific authored color.
- **Visit Input Surface**: context-specific authored color.
- **Hello Art Span Nth Child Even Ink**: context-specific authored color.
- **Hello Art Span Nth Child 3 Ink**: context-specific authored color.

## Typography

- **Display** is the CSS family alias for Bricolage Grotesque 96pt ExtraBold. Local faces: normal / 100 900.
- **Body** is the CSS family alias for DM Sans 9pt. Local faces: normal / 100 900.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.

## Layout

- **Welcome**: grid-template-columns (1.1fr 1fr); padding (35px 5vw 45px); gap (5vw).
- **Approach**: padding (55px 7vw); grid-template-columns (1fr 1fr); gap (12vw).
- **Timetable**: grid-template-columns (repeat(4, 1fr)); gap (16px).
- **Visit**: padding (60px 7vw); grid-template-columns (1.1fr 1fr); gap (8vw).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 900px)`.
- @media (max-width: 900px): timetable changes to grid-template-columns (1fr 1fr).
- @media (max-width: 650px): welcome changes to grid-template-columns (1fr); gap (30px).
- @media (max-width: 650px): approach changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 650px): visit changes to grid-template-columns (1fr); gap (30px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

- input: corners (`0`).
- nest mark: corners (`0 0 20px 20px`).
- nest mark::before: corners (`50%`).
- welcome btn: corners (`25px`).
- shape row span: corners (`50%`).
- shape row span:nth child(2): corners (`28px 28px 0 0`).
- shape row span:nth child(3): corners (`8px`).

## Components

Choose an age group, inspect its day and prepare a visit summary.

### Primary button

Authored btn styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Quiet button

Authored quiet styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Navigation

Authored nav styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Photo Block

Authored photo block styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid var(--accent)); outline-offset (4px).
- button:disabled: opacity (0.5).
- btn:hover: background (var(--accent)).
- button[aria pressed="true"]: outline (2px solid var(--accent)); outline-offset (3px).
- age tabs button[aria pressed="true"]: outline (0); background (#423936); color (#f6e8cc).
- hello art span animation: `helloWave 4s ease-in-out infinite alternate`.
- hello art span:nth child(even) animation-delay: `-1.5s`.
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
