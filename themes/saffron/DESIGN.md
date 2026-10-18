---
name: Saffron
colors:
  paper: "#fbf6ea"
  kraft: "#efe3c8"
  ink: "#1e2a1f"
  ink-soft: "#485244"
  line: "#d8caa9"
  tomato: "#c23b1a"
  tomato-deep: "#9e2e13"
  saffron: "#f2a516"
  leaf: "#2d6a38"
  leaf-tint: "#e2efd5"
  tone-produce: "#a9ec88"
  tone-bakery: "#ffc078"
  tone-dairy: "#a3dcf8"
  tone-fish: "#c9c6ff"
  tone-pantry: "#fff07a"
typography:
  display:
    fontFamily: Bagel Fat One
    fontSize: clamp(2.5rem, 5.6vw, 5rem)
    lineHeight: 1
    letterSpacing: -0.01em
  headline:
    fontFamily: Bagel Fat One
    fontSize: clamp(1.85rem, 3.4vw, 3rem)
  title:
    fontFamily: Onest
    fontSize: 1.2rem
    fontWeight: 650
  body:
    fontFamily: Onest
    fontSize: 1.0625rem
    lineHeight: 1.55
rounded:
  price-card: 3px
  field: 10px
  card: 14px
  photo: 20px
  control: 999px
spacing:
  gutter: clamp(1rem, 4vw, 3rem)
  section: clamp(3.5rem, 8vw, 6.5rem)
  max: 1320px
---

# Saffron

## Overview

The world is a market stall on a Saturday morning: kraft paper, orange crates and the hand-cut fluorescent price cards every grocer pins to the produce. Saffron sells by hand and delivers in two-hour windows, so the site is built around the two objects a shopper actually reads, the price card and the delivery board. It is light and warm because people plan groceries in a kitchen in daylight, mostly on a phone.

## Colors

Warm paper and kraft surfaces carry dark grocer-green ink. Tomato red is the single action colour (buttons, links, focus ring, caret, scrollbar). Saffron yellow is reserved for moments of choice: the chosen slot, the next-slot tag and the closing band. Each aisle owns one fluorescent card stock (green produce, orange bakery, blue dairy, lavender fish, yellow pantry), used only on price cards, aisle tags and the aisle heading. Leaf green marks green slots, labels and success.

## Typography

Bagel Fat One sets headings, prices and the wordmark: chunky, friendly, legible at price-card sizes. Onest sets everything else, with tabular numerals in prices, tables and receipts. Headings stay at -0.01em tracking; body measure is capped at 68ch.

## Layout

A 1320px column with fluid gutters. Home alternates dense passages (an 8-item product grid, the supplier ledger) with quiet ones (the saffron story band, testimonials) and ends on a full-width saffron call to action. Listing pages use a filter bar between rules, then an auto-fill product grid that drops to two columns on phones. Product, recipe, basket and checkout pages use a two-column split that collapses to one column under 900px.

## Components

- **Price card**: a 3px-radius card in the aisle's fluorescent stock, rotated -3deg with a soft lifted shadow; Bagel price over an Onest unit line.
- **Slot board** (signature): a native radio grid of days by two-hour windows; each cell shows its fee and status (open, few left, green, full, closed). The chosen cell turns saffron and tilts like a card being pinned. Horizontal scroll with a sticky time column on narrow screens.
- **Product card**: photo, overlapping price card, name, grower with distance, pill "Add" that turns leaf green on success.
- **Aisle rows**: big Bagel aisle names in a ruled list with a tilted count tag and thumbnail.
- **Ledger**: ruled tables with tabular numbers for suppliers and fees.
- **Forms**: 10px-radius fields with tinted error state and messages that name the fix; inline newsletter and ZIP forms.
- **Team name tags**: names set on tilted price-card stock.

## Motion

One language: things land like cards being pinned. Pages rise 10px into place, price cards straighten on hover, the chosen slot tilts and lifts, and the basket badge bumps when its count changes, all on an exponential ease-out. Under `prefers-reduced-motion: reduce` every animation and transition is cut to near zero.

## Do's and Don'ts

- Do keep fluorescent card stock for prices, aisle tags and name tags only; never for large backgrounds.
- Do keep tomato as the only action colour.
- Do show a price before the shopper commits, including delivery fees on every slot.
- Don't add eyebrow labels, gradient text or icon-tile rows.
- Don't rotate anything that holds body text, apart from the short cook's tip.
