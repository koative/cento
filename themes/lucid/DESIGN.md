---
name: Lucid
colors:
  paper: "#f5f3ee"
  paper-2: "#ebe7de"
  sheet: "#fffdf9"
  ink: "#16171b"
  ink-2: "#474952"
  ink-3: "#64666f"
  rule: "#dcd8ce"
  pencil: "#1f45c4"
  pencil-deep: "#14318f"
  pencil-wash: "#e4ebfc"
  nonphoto: "#a9d6ea"
  flag: "#855600"
  ok: "#1b6a44"
  danger: "#b0251c"
typography:
  display:
    {
      family: "Hubot Sans",
      width: "108–118%",
      weight: "700–800",
      sizes: "clamp(2.4rem, 5.2vw, 4.6rem) / 1.75–2.6rem sections",
    }
  body: { family: "Mona Sans", size: "1.0625rem", lineHeight: 1.6 }
rounded: { sheet: 14px, control: 8px, pill: 999px }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 2.5rem)",
    section: "clamp(3.5rem, 7vw, 6rem)",
    wrap: "80rem",
  }
---

## Overview

The copy desk: bond paper, graphite type and the editor's blue pencil. Lucid's whole promise is that every change is visible, so the site is built from the marks copy editors have always used — struck deletions, underlined insertions, numbered margin notes and the non-photo blue rule of a layout pad. Light, because people write at a desk in daylight for hours.

## Colors

Warm paper ground with white sheets for anything that is "the document". One accent, blue pencil `#1f45c4`, carries every edit mark, primary action, active state and the closing band. Amber is reserved for fact flags, green for house-style and success, purple only for the Tone suggestion label. Selection, caret, focus ring and scrollbar all come from the palette.

## Typography

Hubot Sans at wide widths (font-stretch 108–118%) for headings and figures; Mona Sans at normal width for reading. Tracking stays between −0.01 and −0.03em. Numbers in stats and tables are tabular.

## Layout

12-column feel inside an 80rem wrap. Home opens with a split hero whose right half is the working demo sheet. Long lists are typographic indexes (use cases, plans, surfaces, specs) with hairline rules instead of card grids; sheets with a soft shadow appear only for documents, plans and use-case cards. The app is a sidebar shell (top bar with menu under 900px) with a paper page and a suggestion rail.

## Components

Sheet (paper with non-photo blue margin rule), TrackedChanges (review bar, J/K/A/R keys, markup/clean view, copy clean text), Markup (static diff), PromptDemo, index rows, terms table (avoid struck, prefer inserted), segmented toggles, chips, switches, data tables with sortable headers, SVG weekly chart and acceptance bars.

## Motion

One language: the pencil. Deletion strikes draw left to right, insertions write in after them, staggered per change; the chart's acceptance line draws once; pages arrive with a short ease-out from already-visible. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do show edits as marks on the text, never as a replaced block.
- Do keep the blue for edits and actions only.
- Don't add eyebrow labels, icon-card rows or gradient effects.
- Don't let the AI invent figures in copy: fact flags only highlight what the writer supplied.
