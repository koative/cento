---
name: Ink
colors:
  wall: "#ebe2d0"
  card: "#f7f2e6"
  paper-2: "#e1d6c1"
  ink: "#171312"
  ink-2: "#463c36"
  ink-3: "#6f6359"
  rule: "#cbbfa8"
  red: "#a3271d"
  stencil: "#4c3d99"
  stencil-paper: "#f6f3ee"
typography:
  display:
    {
      family: "Pirata One",
      sizes: "h1 clamp(2.75rem → 5.75rem), h2 clamp(2rem → 3.4rem), card names 1.6rem",
    }
  body:
    {
      family: "Inter Tight",
      sizes: "body 1.0625rem / 1.6, lede up to 1.25rem, small 0.85rem",
    }
rounded: { controls: 2px, chips: 999px }
spacing:
  {
    section: "clamp(4rem, 3rem + 4vw, 7.5rem)",
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    max-width: 1320px,
  }
---

## Overview

A flash wall in a former print shop. Warm card stock pinned on a putty-coloured wall, black linework, one tattoo red, and the violet of thermal stencil paper reserved for the sizing tool. Tattoo clients browse flash the way they would on the studio wall — point, check the number underneath, ask about size — so the site is built around sheets, numbers and the stencil.

## Colors

`wall` is the page, `card` is every flash sheet and form surface, `ink` carries text, rules and the dark bands (sizer teaser, closing call). `red` is the single spot colour: the red element in designs, active states, step numerals, focus rings and the Flash Friday band (white text, 7:1). `stencil` violet appears only on stencil paper (sizer, teaser). Photography is rendered warm monochrome by CSS so mixed sources read as one archive.

## Typography

Pirata One blackletter for headings, card names and the wordmark — the lettering of tattoo flash and shop signage — always in title case and never below 1.3rem. Inter Tight for everything read or operated. Prices, hours and estimates use tabular numerals.

## Layout

A 1320px frame with rule-led sections: 1px ink rules open lists, price rows, steps and FAQ groups instead of cards. Flash sheets are the only repeated card, in an auto-fill grid. Density alternates: dense wall and prices, quiet statement band, full-bleed ink, red and paper-2 bands for rhythm.

## Components

Flash card (pin dot, sheet number, design, name, price, artist and size); pinned hero sheet; stencil sizer (mm-unit SVG sheet with rulers, cm grid, placement area, design at scale with non-scaling stroke, range/radio/rotate/transfer controls, live estimate); healing clock (range + date input driving a six-stage track); booking form with radio-card kinds, chip checkboxes and inline errors; disclosures with rotating plus; spec lists (dt/dd rows); authored street plan.

## Motion

Pages settle in from a slight blur (0.6s, expo-out) like ink taking on skin. Flash cards lift and tilt a half degree on hover; the hero sheet straightens. The sizer animates scale, rotation and mirror with the same easing; healing stages fade in on change. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep red to one element per design and one role per screen.
- Do draw new flash as exact geometry in the 200 × 200 box using `solid`, `spot` and `knock` classes.
- Don't set long text in Pirata One or in all caps.
- Don't add cards around text sections; use rules.
- Don't show photographs in colour next to the monochrome set.
