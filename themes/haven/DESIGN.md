---
name: Haven
colors:
  paper: "#f3efe7"
  paper-2: "#e8e1d3"
  card: "#fbf9f4"
  ink: "#1b231f"
  ink-2: "#4b524c"
  line: "#d8d0c0"
  pine: "#21362c"
  on-pine: "#efe9dc"
  glow: "#a3402a"
  glow-soft: "#f1d9cb"
  glow-light: "#eba887"
  error: "#9c2b19"
typography:
  display:
    {
      family: "Gloock",
      sizes: "h1 clamp(2.5rem→5.25rem), hero clamp(2.6rem→5.75rem), h2 clamp(1.75rem→2.75rem)",
    }
  body:
    {
      family: "Figtree",
      size: "1.0625rem / 1.6",
      weights: "400, 500, 600, 700",
    }
rounded: { small: 4px, card: 12px, pill: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4rem, 3rem + 5vw, 7.5rem)",
    wrap: 1240px,
  }
---

## Overview

The printed matter of an old pass inn: a warm snow-paper page, pine-dark ink and the pink-red of alpenglow on the peaks at dawn. Guests plan a mountain stay at home in the evening and check it again on a phone in the boot room, so the site is light, calm and plain-spoken, with prices and dates always in reach. Its signature is the brass panorama table every Alpine viewpoint has, redrawn as an interactive skyline that shows which summits each room's window frames.

## Colors

Paper (`#f3efe7`) is the page; linen (`#e8e1d3`) marks a change of subject; pine (`#21362c`) carries the bathhouse band, primary buttons and the footer. Alpenglow (`#a3402a`, 6:1 on paper) is used sparingly for links, selected dates, prices, temperatures and the active peak; its light tint (`#f1d9cb`) fills a selected date range. Body text is ink (`#1b231f`), secondary text `#4b524c` (7:1). Selection, caret, focus rings, accent-color and scrollbars all come from these tokens.

## Typography

Gloock, a high-contrast display serif, sets page titles, section heads, room and dish names, temperatures and years: the voice of an engraved hotel plate. Figtree sets everything else at 17px with tabular numerals for prices, times and dates. Tracking stays at −0.015em for display sizes; headings are balanced, body text is held to about 68ch.

## Layout

A 1240px wrap with fluid gutters. Pages open with a large title and a short lede, then alternate dense passages (menus, comparison table, infusion schedule, calendar) with quiet ones (the hosts' letter, a single guest quote). Two-column splits run 7:5 or 6:5 and collapse below 860px. The home hero is a full-bleed photograph with the availability bar on it, so the first screen shows the house, the rate and the way to book.

## Components

- **Panorama table**: an SVG skyline generated from the peaks in `content.ts`, with HTML buttons for each summit on staggered leader lines; a framed "window" slides to the chosen room's slice of the range and dims the rest. Scrolls sideways on phones and centres the window automatically.
- **Availability calendar**: two months, nightly lowest rate under each day, arrival/departure range, arrow-key navigation with a roving tab stop; closed and fully booked nights are struck through.
- **Booking flow**: four labelled steps with a sticky live price summary (room, board, extras, local tax) and a confirmation state.
- **Room cards** (photo, name, facts, line, price), radio **chips** for filters, a pill **toggle** for seasons, **menu lists** with prices, **FAQ** disclosures with a drawn plus.
- **Buttons**: pine primary, ink outline, light and ghost variants on dark bands; all at least 44px tall.

## Motion

One language: mist. Each page enters by clearing a light blur and rising 12px; the hero photograph settles from a slight zoom; the panorama window glides between rooms on an exponential ease-out. Season images and gallery photos fade in the same way. Everything is visible without JavaScript-driven reveals, and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do keep prices, dates and times in tabular Figtree and the brand voice concrete (temperatures, minutes, metres).
- Do use alpenglow as a signal, not a fill; one red thing per view.
- Don't add eyebrow labels above headings or numbered section markers; the only numbers are real sequences (courses, booking steps, timeline years).
- Don't put glass, gradients-as-decoration or icon tiles in place of photographs; imagery is real mountain photography plus authored geometry.
