---
name: Fade
colors:
  paper: "#f3efe6"
  paper-2: "#e9e3d6"
  mint: "#d3e3d2"
  mint-2: "#bfd6be"
  ink: "#161513"
  ink-2: "#4a463f"
  red: "#b3261e"
  board: "#191a18"
  board-text: "#efe9dc"
  skin: "#e6d3b8"
typography:
  display:
    {
      family: "Alfa Slab One",
      sizes: "clamp(2.5rem…5.25rem) h1, clamp(1.9rem…3rem) h2",
    }
  body: { family: "Barlow", weights: "400–700", size: "1.0625rem / 1.6" }
rounded: { control: 4px, panel: 12px, pill: 999px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 2.5rem)",
    section: "clamp(4rem, 3rem + 4vw, 7rem)",
    wrap: 1240px,
  }
---

## Overview

Fade is built from the inside of a neighbourhood barbershop: talc-white walls, the pale green paint behind the mirrors, a black price board with white letters, the checkerboard floor and a red stripe from the pole. It is a light site because most people book on a phone in daylight, between other things; the dark board panels are where prices live, as they do on the shop wall.

## Colors

Paper (`#f3efe6`) is the page. Ink (`#161513`) carries text, chair plates and the price boards. Pole red (`#b3261e`) is reserved for the booking action, the selected time, the active nav underline and focus rings. Shop-wall mint (`#d3e3d2`) backs product shelves, selected choices and the closing call. The fade chart blends from a neutral skin tone to ink in proportion to hair length.

## Typography

Alfa Slab One is the sign-painter's voice: headings, prices on the board, chair numbers, product labels. Barlow does everything else; uppercase Barlow with wide tracking names services on the board and labels controls. Prices and times use tabular numerals.

## Layout

A 1240px wrap with generous section spacing. The home page alternates dense and quiet passages: hero with prices in the first viewport, a full-bleed price board, the fade chart swatches, the numbered chair board, a gallery strip, one large quote, the shave ritual on a dark band, the product shelf, hours, and a mint close standing on the checkerboard footer edge. Detail pages pair a sticky visual (product render, booking summary, chart) with a scrolling column.

## Components

- Price board: dot leaders between service name and price, duration and description underneath.
- Chair plates: square ink plates with the chair number, used on the home board, barber list and profile links.
- Fade chart: twelve bands from neckline to crown drawn as a tone strip, a length ruler on a square-root scale and the written description; bands animate bottom-up like a clipper pass.
- Choice tiles, day tiles and time slots in the booking flow; segmented radio rows for chart and product options.
- Product renders: authored SVG tins, jars and bottles coloured by label token, on a mint shelf.
- Footer: board-black with a checkerboard floor strip along its top edge.

## Motion

One page entrance (a short rise from slightly faded), the fade chart's staggered band and ruler transitions, the bag count pop and the mobile menu drop. Everything is visible by default, and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep red for the action that books or buys; never as decoration.
- Do write prices and times in tabular numerals and in USD.
- Do show the cut, not a mood: photographs are of real fades, chairs and stations.
- Don't add eyebrow labels, stat rows or icon-card grids; the board, the chairs and the chart carry the structure.
- Don't use the checkerboard anywhere except as the floor line at a threshold.
