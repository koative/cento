---
name: Vault
colors:
  paper: "#f4efe5"
  band: "#ebe3d4"
  sheet: "#fffdf8"
  ink: "#1d2a33"
  ink-2: "#4a5661"
  rule: "#d5cab6"
  accent: "#a4472a"
  accent-deep: "#85361e"
  accent-wash: "#f3dccd"
  covered: "#2f5d4b"
  accent-on-ink: "#eba383"
typography:
  display: "Merriweather (variable opsz/wght), 300–900"
  body: "Merriweather Sans, 400–700"
  sizes:
    h1: "clamp(2.3rem, 1.5rem + 3.4vw, 4.4rem), weight 350"
    h2: "clamp(1.55rem, 1.15rem + 1.5vw, 2.4rem)"
    lede: "clamp(1.05rem, 0.98rem + 0.35vw, 1.25rem)"
    body: "1.0625rem / 1.65"
rounded:
  control: 6px
  card: 12px
  document: 4px
spacing:
  section: "clamp(4rem, 2.5rem + 6vw, 8rem)"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
---

## Overview

Vault is drawn from the insurer's own printed matter: the declarations page. Warm paper, blue-black ink, hairline rules, dotted leaders, the US form letters A–F in little boxed tags and a double rule above the premium. People read insurance at a kitchen table or on a phone after something has gone wrong, so the world is light, calm and set for reading rather than selling.

## Colors

Paper `#f4efe5` and a darker band `#ebe3d4` alternate sections; documents sit on `#fffdf8`. Ink `#1d2a33` carries text, primary buttons, the footer and the fine-print band. Terracotta `#a4472a` is the seal: active states, the stamp, bars and focus rings. Green `#2f5d4b` marks what is covered. On ink, secondary text is `#c9c3b6` and the accent lightens to `#eba383`.

## Typography

Merriweather sets headings light (350) at large sizes with its optical sizing, and bold for document titles, names and figures. Merriweather Sans carries body, UI and tables. Figures are tabular lining numerals everywhere money appears.

## Layout

A 1260px column with asymmetric two-column splits (0.8fr / 1.2fr) for intro-plus-instrument sections, ruled lists instead of cards for indexes, and full-width bands for the dense moments (fine print, triage, stories). Breakpoints at 1100, 900 and 640px; every split collapses to one column at 900px.

## Components

- **Policy schedule** — the signature document: header with the mark, meta grid, A–F table with dotted rules, double-ruled premium. Figures re-key on change and "settle" from a terracotta wash. In the quote it is live and gains a rubber "Quoted" stamp on success.
- **Contents counter** — rooms as segmented buttons with subtotals, item steppers, a proportional room bar, and a total that feeds the quote.
- **Quote flow** — four fieldsets with a ruled progress bar, radio cards, inline errors that name the fix, loading and confirmation states.
- **Claims triage** — incident chips switch a three-column action sheet (next hour, two days, photograph/typical) with a cover verdict.
- Ruled index lists, compare and wording tables, native `<details>` FAQ, ledger `dl`s for paid amounts.

## Motion

Pages rise 10px on entry. The hero schedule slides in slightly rotated. Clauses and triage sheets unroll with a clip-path; changing figures settle from a wash; the quote stamp lands with a scale-down. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep every policy line paired with plain English.
- Do keep money in tabular figures and the A–F letters where they mean the US form sections.
- Don't add cards around list rows or eyebrow labels over headings.
- Don't use the accent for body text on paper except links and errors (`#85361e`).
