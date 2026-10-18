---
name: Smash
colors:
  paper: "#fbf1de"
  paper-2: "#f2dfb8"
  card: "#fffaf0"
  receipt: "#fffdf7"
  char: "#22150f"
  ink-soft: "#5c4232"
  ketchup: "#d42a1c"
  ketchup-deep: "#a81d12"
  mustard: "#f6b81a"
  pickle: "#2f5d34"
  line: "#e2cba2"
  line-strong: "#8f7550"
typography:
  display:
    {
      family: "Titan One",
      weight: 400,
      h1: "clamp(2.7rem, 5.2vw + 1rem, 5.75rem)",
      h2: "clamp(1.9rem, 2.6vw + 1rem, 3.25rem)",
      h3: "clamp(1.2rem, 0.6vw + 1rem, 1.45rem)",
    }
  body:
    { family: "Rubik", weights: "400–700", size: "1.0625rem", line-height: 1.6 }
rounded: { card: 14px, field: 10px, controls: 999px }
spacing:
  {
    gutter: "clamp(1.1rem, 3.5vw, 2.5rem)",
    section: "clamp(3.5rem, 8vw, 7rem)",
    max-width: 1280px,
  }
---

# Smash

## Overview

The world is the counter of a smash-burger joint: deli paper, the black menu board, order tickets torn off the printer, ketchup and mustard bottles, a red checked wrapper. People order on a phone in daylight, standing in line or at their desk, so the site is light, loud and fast to scan; the signature is a builder that draws the burger layer by layer as you choose it.

## Colors

Deli-paper cream (`paper`) is the page; kraft (`paper-2`) marks working surfaces (the builder, sides, cards with drawn items). `char` is the menu board and the footer. `ketchup` is the single action colour (buttons, prices, page titles); `mustard` is for headings and prices on char, the closing band and highlights; `pickle` means vegetarian, success and selected filters. Secondary text is `ink-soft`, never grey. Selection is mustard on char, the caret is ketchup, focus rings are char on light and mustard on dark surfaces.

## Typography

Titan One carries every heading, price and ticket number: rounded, heavy, sign-painter friendly, set at 0.94–1.1 line height with −0.01em tracking. Rubik handles body, labels and controls at 400–700. Prices and totals use tabular numerals.

## Layout

A 1280px column with fluid gutters. Home alternates density: hero, a dark menu board, the kraft builder, a quiet crust close-up, the numbered method (real sequence), a photo strip of sides, locations, a ketchup catering band, merch, a mustard close. Lists use auto-fill grids; on phones menu cards become ordering-app rows (thumbnail left).

## Components

- **Stack** (`components/Stack.tsx`): flat SVG burger built from layers (buns, patties, cheeses, toppings, sauces); fixed canvas in the builder, cropped canvas on cards.
- **Item builder**: option groups as pill radios/checkboxes with price deltas, max-per-group, live price and kcal, quantity, add to order, reset to the house build.
- **Tickets**: receipt surfaces with a zigzag bottom edge (CSS mask) for the order, checkout summary, hero price and confirmation.
- **City map**: schematic SVG of river, streets and pins, highlighting the current location.
- **Merch drawings**: flat product SVGs recoloured from the chosen colourway.
- Forms: labelled fields, inline errors naming the fix, disabled/loading submit, polite live success.

## Motion

One language: things drop onto the griddle. In the builder each new layer falls in, patties land and squash (scale overshoot), and everything above slides up to make room. Pages ease in, the cart count bumps. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep ketchup for actions and prices; don't use it for decoration.
- Do let photos be real food with no brand marks; crop out packaging.
- Do use the checked deli paper only behind the hero burger.
- Don't add eyebrows above headings, glass, gradient text or hard offset shadows.
- Don't introduce a second display face; Titan One plus Rubik is the whole system.
