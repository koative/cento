---
name: Ledger
colors:
  paper: "#f7f4ee"
  paper-2: "#efe8dc"
  sheet: "#fffdf9"
  ink: "#24172a"
  ink-2: "#57475c"
  rule: "#e3dacd"
  plum: "#5b2a6e"
  plum-deep: "#2c1236"
  lilac: "#ece2f1"
  green: "#1d6a48"
  red: "#ad2f27"
  mark: "#f5dc6c"
typography:
  display:
    {
      family: "Plus Jakarta Sans",
      weight: 800,
      size: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)",
      tracking: "-0.03em",
    }
  body:
    { family: "Plus Jakarta Sans", weight: 400, size: "1rem", lineHeight: 1.6 }
  numerals: "tabular-nums everywhere money appears"
rounded: { panel: "14px", input: "10px", control: "999px" }
spacing:
  {
    section: "clamp(4rem, 3rem + 4vw, 7rem)",
    gutter: "clamp(20px, 4vw, 40px)",
    max: "1200px",
  }
---

# Ledger

## Overview

A ruled accounting sheet written in plum ink. Ledger is named after the paper ledgers its founder kept at a credit-union counter, so the whole site borrows their grammar: hairline rows, right-aligned tabular figures, a single rule above a total and a double rule beneath it, red ink for overspending and a highlighter for money that still needs a job. It is light because the scene is a kitchen table on payday morning or a phone in a supermarket queue.

## Colors

Warm ledger paper (`paper`) with white sheets (`sheet`) for tables and panels. `ink` is a plum-black; `plum` carries brand, buttons and active states, kept from the previous Ledger with its pale `lilac`. `green` means money in or on track, `red` means overspent. `mark` is the highlighter yellow used only for "to be assigned" and the demo badge. Deep plum bands (`plum-deep`) mark the card and flow sections.

## Typography

Plus Jakarta Sans throughout: 800 for display and totals at −0.03em, 600–700 for labels, 400 body at 65–70ch. Every figure uses tabular numerals and a true minus sign.

## Layout

12-column feel on a 1200px wrap; text-and-ledger splits on marketing pages, ruled lists instead of cards, and a 252px sidebar app shell that becomes a top bar with a scrolling nav under 900px. Budget and transaction tables reflow into stacked rows on phones.

## Components

Ledger table (rule rows, `total-row` with double rule), envelope meter, paycheck allocator, CSS debit card with frost state, month-equation strip, SVG pace and balance charts, chips and pressed toggles, accessible `details` FAQ, validated forms with inline errors and live success messages.

## Motion

One page-settle on route change (opacity and 8px rise, expo ease-out from an already-visible state), meters and allocation bars that ease to new widths, and the card frosting over when frozen. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do put totals under a double rule and keep figures right-aligned.
- Do use red only for money that is overspent or owed.
- Don't add eyebrow labels, icon-card grids or decorative gradients.
- Don't show percentages where a dollar amount will do.
