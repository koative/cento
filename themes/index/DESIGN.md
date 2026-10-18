---
name: Index
colors:
  paper: "#efe9d8"
  paper-2: "#e4dcc4"
  card: "#fbf8ee"
  ink: "#1f3328"
  ink-2: "#4a5a4f"
  rule: "#cbc2a5"
  stamp: "#b13f26"
  forest: "#1a2c22"
  wood: "#3a2a1d"
typography:
  display: "EB Garamond, 500, italic for emphasis"
  body: "Karla, 400–700"
  sizes: "body 1.0625rem; h1 clamp(2.8rem → 5.25rem); h2 clamp(1.9rem → 2.75rem)"
rounded: "4px controls, 6px panels, 2–5px book covers, pills only for filter chips"
spacing: "gutter clamp(1.25rem, 4vw, 3rem); section rhythm clamp(3rem, 6vw, 5rem); max width 1320px"
---

## Overview

Index is a crooked three-room bookshop, so the site is built from the shop's own paper: typeset book covers, handwritten shelf cards clipped under books, a 1987 card catalogue drawer, a till receipt. It is light and warm because people browse books at home in the evening or on a phone in the shop aisle, and paper is the material of the trade.

## Colors

Warm sage-cream paper with forest-green ink, a vermilion "stamp" red for active states, prices of note and errors, and card-stock white for objects that sit on the page (shelf cards, catalogue cards, summaries). Forest green carries the footer and the club feature; dark oak carries the catalogue drawer. Every cover gets its own three-colour palette in `content.ts`.

## Typography

EB Garamond sets every heading, cover title, shelf-card quote and first line; italic is used for emphasis and handwriting. Karla sets body, controls and the catalogue cards. Prices and tables use tabular numerals; dates in the event list use lining Garamond figures.

## Layout

Wide, calm pages with a 1320px measure: split heroes, a six-up front-table shelf, sticky filter column in the catalogue, sticky summaries on cart/checkout/event pages. Sections are separated by a single ink rule under the heading rather than boxes.

## Components

- **BookCover**: authored cover (author, title, subtitle, imprint, one SVG motif: rings, window, bands, sun, field, dots, arch, wave or a large italic initial), sized by its container through container-query units.
- **CardDrawer** (signature): subject dividers choose a drawer; library catalogue cards in 5×3 proportion, ruled and red-lined, riffle forward/back with buttons or arrow keys; only the front card is interactive.
- **ShelfTalker**: a slightly rotated handwritten card with a clip, the bookseller's note and the book.
- Format and delivery options as bordered radio rows, a quantity stepper, a role="switch" format toggle, FAQ disclosures, receipt slip with a torn edge.

## Motion

Pages settle in with a short rise. Catalogue cards fall forward when you leaf past them; book covers lift and tilt on hover; the mobile menu drops in. Everything collapses to instant changes under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep every book in `content.ts` with its own cover palette and motif; covers are typography, never photos of real editions.
- Do use the stamp red sparingly: active nav, errors, prices that matter.
- Don't add eyebrow labels, icon-card grids or stat rows; the shelf, the card and the receipt are the structures.
- Don't put copy over photographs without a paper panel behind it.
