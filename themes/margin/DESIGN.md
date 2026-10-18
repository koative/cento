---
name: Margin
colors:
  paper: "#f5f3ee"
  paper-2: "#ebe8e0"
  paper-3: "#dcd7cb"
  field: "#fbfaf7"
  ink: "#1c1b18"
  ink-2: "#585349"
  ink-3: "#6b665c"
  rule: "#d6d0c3"
  rule-strong: "#b6afa1"
  red: "#c4321b"
  red-ink: "#ad2b16"
  red-wash: "#f4ddd5"
  margin-line: "#e2a597"
  ok: "#2f6b3c"
typography:
  display:
    {
      family: "Instrument Serif",
      weight: 400,
      size: "clamp(2.75rem, 1.4rem + 4.4vw, 5.5rem)",
      line-height: 0.98,
      tracking: "-0.02em",
    }
  h2:
    { family: "Instrument Serif", size: "clamp(2rem, 1.5rem + 1.8vw, 3.1rem)" }
  margin-note: { family: "Instrument Serif", style: italic, size: "1.125rem" }
  body:
    {
      family: "Instrument Sans",
      weight: 400,
      size: "1.0625rem",
      line-height: 1.6,
    }
  ui: { family: "Instrument Sans", weight: 500, size: "0.875–0.9375rem" }
rounded: { control: "6px", chip: "999px", panel: "12px", phone: "38px" }
spacing:
  {
    pad: "clamp(1.25rem, 4vw, 3.5rem)",
    margin-column: "clamp(10.5rem, 17vw, 16rem)",
    gap: "clamp(1.5rem, 3vw, 3rem)",
    section: "clamp(3.5rem, 7vw, 6.5rem)",
  }
---

## Overview

Margin is set like a design review printed on proof paper and marked up in red. Product designers hand work to engineers as redlined screens with numbered comments; hiring managers read portfolios on a laptop in a daylit office, comparing many in one sitting. So the site is light, calm and editorial, and the work itself — authored client interfaces — carries the colour.

## Colors

Warm proof paper and near-black ink do almost everything. One redline red marks annotations, measurements, active navigation, dates and focus; a pale version of it draws the margin rule. Each client's own brand colour appears only inside its mockups. Green is used once, for the availability dot and success messages.

## Typography

Instrument Serif at display sizes for headings, case titles, quotes and the run of client names; its italic is the voice of every margin note. Instrument Sans for body, UI, labels and data, with tabular numerals on years, prices and measurements. Mockup UI uses fixed pixel sizes so screens read as real products.

## Layout

Every section is a "sheet": a right-aligned margin column, a 1px red margin rule, then the body column. Metadata, captions and annotations live in the margin; content lives in the body. Sections butt together so the rule runs unbroken down the page; the dark closing band on Home is the one deliberate break. Below 760px the margin column folds under its content and the rule moves to the left edge.

## Components

- **Annotated screen (signature):** a client screen rendered from data, a Redlines switch, numbered pins and a list of margin notes. Turning redlines on measures every block and the gaps between them from live layout; selecting a pin or note highlights the block and shows its size.
- **Mockup:** phone and desktop frames composed from typed blocks (bar, tabs, field, chips, list, stat, progress, chart, banner, button); dark variant for control-room products.
- **Case row:** mockup on a dotted design-canvas mat, serif title, client line, outcome and discipline tags; the whole row is one link.
- **Index table:** dense list of all work that folds into stacked rows on phones.
- **Playground tools:** easing lab with draggable bezier handles and number inputs, type scale, contrast checker.
- **Forms:** labelled fields with hints, inline errors naming the fix, chip radios, sending and success states.

## Motion

One page entrance (10px rise and fade, expo-out). The redline overlay draws in block by block with a clip-path wipe and pins pop in after it. Hover moves mockups up a few pixels. The mobile menu wipes down. All motion collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do put annotations, metadata and captions in the margin column, set in serif italic.
- Do keep red for markup and state; let client colour stay inside client screens.
- Don't add eyebrow labels, card grids or stat rows; outcomes are a ruled list with sentences.
- Don't break the margin rule except for the closing band.
- Don't use the serif below 1.1rem or the sans for display.
