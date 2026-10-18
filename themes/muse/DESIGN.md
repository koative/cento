---
name: Muse
colors:
  paper: "#f3eee6"
  paper-2: "#e8e0d3"
  paper-3: "#ddd2c2"
  ink: "#1c1815"
  ink-2: "#4a423b"
  muted: "#675d53"
  line: "#d3c8b8"
  line-strong: "#a89a88"
  oxblood: "#5c1a27"
  oxblood-2: "#7a2434"
  on-ox: "#f5ebe4"
  moss: "#3f5638"
typography:
  display:
    family: Bodoni Moda
    sizes: "clamp(3rem, 1.7rem + 5.6vw, 6rem) display; 4rem / 2.9rem / 1.9rem steps"
  body:
    family: Jost
    sizes: "clamp(1rem, 0.96rem + 0.18vw, 1.0625rem) body; 0.8125rem small caps-style labels"
rounded: "2px"
spacing:
  gutter: "clamp(1.125rem, 4vw, 3.5rem)"
  section: "clamp(4rem, 3rem + 5vw, 8rem)"
  max: "90rem"
---

# Muse

## Overview

A Paris womenswear house presented the way the trade presents itself: a printed lookbook and a show programme. Warm ivory paper, ink-black Bodoni, one oxblood for the house signature. The collection is built around a single day (ten looks, ten hours), so the lookbook is a timeline rather than a grid. Light, because customers browse it on a phone in daylight and in a fitting room, and because the photography needs a pale mount.

## Colors

Paper (`#f3eee6`) is the page; paper-2 and paper-3 are quiet bands for the shop toolbar, filter panel and summaries. Ink (`#1c1815`) carries type and primary buttons. Oxblood (`#5c1a27`) is reserved for the atelier band, the footer, selection, focus, caret and accent-color on native controls; on-ox text is tinted from it, never grey. Moss (`#3f5638`) marks "open now" in store status. Hairlines (`line`, `line-strong`) do all separation; there are no card shadows.

## Typography

Bodoni Moda (optical sizing on) for display, headings, prices in feature spots and the wordmark; italic for look titles and pull quotes. Jost for everything readable: body, navigation, labels, forms. Tracking never tighter than -0.03em; body measure held to ~68ch; prices and hours use tabular numerals.

## Layout

A 90rem frame with fluid gutters. Home alternates dense passages (new-in grid, category index) with quiet ones (statement, atelier band). Product pages use a tall image column against a sticky buy panel; the shop is a filter rail beside a 3-up grid that collapses to a drawer and 2-up below 900px. Look pages are full-height image plus a narrow shop-the-look column.

## Components

Wordmark with city line; header with announcement strip, nav, ink CTA, bag link with polite live count; mobile menu as a disclosure panel. Day line (the signature): a 06:00–24:00 rule with each look pinned at its hour, used on the collection and every look page. Shop-the-look form with per-piece checkbox and size select. Colour swatches as radio buttons, size grid, quantity stepper, size-guide disclosure. Store rows with live open/closed status from `lib/hours.ts`. Checkout with delivery/collection toggle, inline errors that name the fix, loading state and a focused confirmation.

## Motion

One language, the curtain: imagery unveils with a `clip-path` lift and slight scale settle (`unveil`, exponential ease-out) on hero, look and product images; pages fade in once on route change; the mobile menu drops 0.5rem. All of it is CSS on already-visible content and collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do let photographs run large and unboxed; one decisive image per section.
- Do keep oxblood rare so it reads as the house mark.
- Do write in the house voice: hours, places, cloth and finishing.
- Don't add rounded cards, shadows or pills; the world is paper and hairline.
- Don't put labels above headings or number sections; the hour on a look is real data and the only sequence shown.
- Don't introduce a second accent colour or a second serif.
