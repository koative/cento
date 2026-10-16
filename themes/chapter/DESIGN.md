---
name: Chapter
description: An audio journal with expanded episode notes and a personal listening queue.
colors:
  paper: '#ebe8df'
  ink: '#283f75'
  header-tone: '#a5afc1'
  cover-caption-tone: '#fff'
  cover-surface: '#b7c9c0'
  waveform-i-surface: '#7484a7'
  episodes-surface: '#e0e3de'
  episode-number-ink: '#647599'
typography:
  display:
    fontFamily: '"Lora", serif'
    fontSize: clamp(40px, 4.4vw, 65px)
    lineHeight: '1.1'
    fontWeight: '400'
    letterSpacing: -0.035em
  headline:
    fontFamily: '"DM Sans", sans-serif'
  headline-context-1:
    fontFamily: '"Lora"'
    fontSize: 32px
    lineHeight: normal
    fontWeight: '400'
  headline-context-2:
    fontFamily: '"Lora"'
    fontSize: 43px
    lineHeight: '1.15'
    fontWeight: '400'
    letterSpacing: -0.02em
  title:
    fontFamily: '"DM Sans", sans-serif'
  title-context-1:
    fontFamily: '"Lora"'
    fontSize: 26px
    lineHeight: normal
    fontWeight: '400'
  title-context-2:
    fontFamily: '"DM Sans", sans-serif'
  body:
    fontFamily: '"DM Sans", sans-serif'
spacing:
  observed-1: '0'
  observed-2: 30px 5vw
  observed-3: 20px
  observed-4: 25px
  observed-5: 35px
  observed-6: 10px
  observed-7: 65px 8vw
components:
  episodes:
    padding: 65px 8vw
    backgroundColor: '#e0e3de'
    textColor: '#283f75'
  episode-actions-button:
    textColor: inherit
    backgroundColor: transparent
    padding: 15px
---

# Design System: Chapter

## Overview

**Creative North Star: "Literary audio journal with blue ruled margins and an oversized episode index"**

Literary audio journal with blue ruled margins and an oversized episode index. An audio journal with expanded episode notes and a personal listening queue.

This records the implemented podcast publication template. Source declarations are normative; responsive and component-specific overrides remain scoped to their original context.

**Key Characteristics:**
- Podcast publication composition with local, visible state changes.
- Bundled typography and a sector-specific visual artifact.
- Responsive layout with a reduced-motion alternative.

### Direction provenance

Mode: Experience with a useful demonstration task. The user delegates creative orchestration and direct implementation. Impeccable collection seed `0b4a6fde` assigns candidate 3: a collection of culturally grounded programme and specimen systems. Grounded candidates were exhibition, poster, programme/specimen, field notes, studio archive, publication, and operational board. The individual sector owns its typography, topology and behavior.

## Colors


The frontmatter records actual page palette primitives and authored surface/accent colors. The `paper`/`surface` and `ink`/`text` entries describe the CSS page ground and text; other entries retain their source context. Gallery thumbnail swatches are separate identity samples.

- **Paper**: page ground.
- **Ink**: principal text.
- **Header Tone**: context-specific authored color.
- **Cover Caption Tone**: context-specific authored color.
- **Cover Surface**: context-specific authored color.
- **Waveform I Surface**: context-specific authored color.
- **Episodes Surface**: context-specific authored color.
- **Episode Number Ink**: context-specific authored color.

## Typography

- **DM Sans** is the CSS family alias for DM Sans 9pt. Local faces: normal / 400, normal / 500, normal / 600, normal / 100 900.
- **Lora** is the CSS family alias for Lora. Local faces: italic / 400, italic / 500, normal / 400, normal / 500, normal / 600.

The frontmatter expands real CSS font shorthands and preserves context-specific heading variants. The sidecar maps each role to its source selector. Missing values inherit from source context or browser defaults; no synthetic type scale is implied.
- masthead uses the font shorthand (`500 51px "Lora", serif`).
- cover caption uses the font shorthand (`italic 28px "Lora"`).
- feature h1 uses the font shorthand (`400 clamp(40px, 4.4vw, 65px)/1.1 "Lora", serif`).
- notes h2 uses the font shorthand (`400 32px "Lora"`).
- notes p uses the font shorthand (`400 16px/1.9 "Lora"`).

## Layout

- **Feature**: grid-template-columns (50px 1fr 1fr); padding (45px 5vw 60px); gap (35px).
- **Episodes article**: grid-template-columns (65px 1fr 80px 40px); gap (25px); padding (26px 0).
- **Listening list**: padding (65px 8vw); grid-template-columns (1fr 1.2fr); gap (55px).

Spacing entries in frontmatter are repeated authored gap/padding values, not a newly imposed scale. Breakpoint conditions: `(max-width: 650px)`, `(max-width: 850px)`, `(max-width: 600px)`.
- @media (max-width: 650px): footer changes to flex-direction (column).
- @media (max-width: 850px): feature changes to grid-template-columns (30px 1fr 1fr); gap (20px).
- @media (max-width: 600px): feature changes to grid-template-columns (1fr); gap (25px).
- @media (max-width: 600px): issue changes to flex-direction (row); gap (15px).
- @media (max-width: 600px): episodes article changes to grid-template-columns (35px 1fr 30px); gap (13px).
- @media (max-width: 600px): listening list changes to grid-template-columns (1fr); gap (15px).

## Elevation & Depth

No box-shadow declarations occur in the scanned stylesheets. Surface color, borders, imagery and composition provide separation.

## Shapes

The scanned stylesheet defines no border-radius values; preserve its existing geometry and border construction.

## Components

Select an episode, expand its notes and add or remove listening queue entries.

### Episodes

Authored episodes styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### Episode Actions Button

Authored episode actions button styles with representative text; React behavior remains in App.tsx. The sidecar preserves its source shape, palette, spacing and authored states.

### State and motion

- button:focus visible: outline (3px solid currentColor); outline-offset (5px).
- button:disabled: opacity (0.55).
- episode actions button:hover: background (#3d5586); color (#fff).
- waveform i animation: `wave 3s ease-in-out infinite alternate`.
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
