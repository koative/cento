---
name: Fable
colors:
  paper: "#fff9e9"
  paper-2: "#fdf0cc"
  paper-3: "#fffdf7"
  ink: "#2e2470"
  ink-2: "#4f4590"
  coral-deep: "#b23a2b"
  sun: "#fbd84c"
  coral: "#ef715a"
  mint: "#86c3a3"
  lilac: "#a79fd8"
  pink: "#f5a594"
  sage: "#b3cc8f"
  sky: "#86bce6"
typography:
  display:
    fontFamily: "Rammetto One"
    fontSize: "clamp(2.35rem, 1.3rem + 4.2vw, 5rem)"
    letterSpacing: "-0.01em"
    lineHeight: "1.08"
  body:
    fontFamily: "Nunito"
    fontSize: "1.0625rem"
    lineHeight: "1.6"
rounded:
  control: "999px"
  card: "14px–20px"
  photo: "999px 999px 16px 16px (arch)"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  section: "clamp(3.5rem, 7vw, 6.5rem)"
  wrap: "1240px"
---

## Overview

Fable is a children's museum set in an old tram depot, and the site is built like its wayfinding: every gallery has a shape and a colour (circle for Bubble Works, arch for Dino Dig, square for The Big Build…) printed on its door, its map tile, its card and its line on the day plan. Parents plan on a phone in daylight, so the world is light, warm cream paper with deep indigo ink, chunky type and big touch targets.

## Colors

Cream paper and indigo ink carry all text (AA everywhere). Seven wayfinding swatches (sun, coral, mint, lilac, pink, sage, sky) are for shapes only; their tints are room floors, panels and exhibit heroes. `coral-deep` is the one accent strong enough for text, errors and the primary booking button. Selection is sun on ink.

## Typography

Rammetto One sets headings, prices, dates and the wordmark — rounded and heavy like painted gallery signs. Nunito (400–900) does everything else; labels and controls sit at 800. Tabular numerals on times, prices and quantities.

## Layout

A 1240px wrap with fluid gutters. Home alternates dense passages (today strip, door-sign directory, floor map) with a quiet centred statement. Photos sit in arch windows. Inner pages open with a plain hero; exhibit pages wash the hero in the gallery's tint full-bleed.

## Components

Shape (nine authored SVG paths), floor map (CSS grid areas, re-flowed for mobile), room card with a data plate, day plan timeline, chips (checkbox/radio pills), date and slot pickers, stepper, Field with inline errors, ticket stub with notched tear line, event rows with date blocks, FAQ disclosures, door-sign list.

## Motion

One language: things pop like blocks being set down. Shapes overshoot in on load and tilt on hover; selecting a map room lifts it and re-pops the room card; plan stops number in. Pages rise in on route change. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do give every new gallery a shape and swatch in `content.ts`, and a grid area on the floor map.
- Do keep swatch colours off text; use ink or `coral-deep`.
- Don't add eyebrow labels, gradients or glass; the shapes are the decoration.
- Don't use the shapes as icons for actions; Lucide handles controls.
