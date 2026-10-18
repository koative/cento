---
name: Tinker
colors:
  paper: "#f7f0e3"
  paper-2: "#efe4cf"
  card: "#fffaf0"
  kraft: "#e3c79d"
  ink: "#1f2340"
  ink-2: "#55546a"
  red: "#c63a22"
  yellow: "#f5b52e"
  green: "#237043"
  blue: "#2c5cc5"
  purple: "#7a4fb5"
  orange: "#ec7a2a"
typography:
  display:
    family: Grandstander
    weights: [600, 700, 800]
    sizes:
      {
        h1: "clamp(2.5rem, 1.5rem + 3.8vw, 5rem)",
        h2: "clamp(1.8rem, 1.3rem + 1.8vw, 2.8rem)",
        h3: "1.3rem",
      }
  body:
    family: Quicksand
    weights: [500, 600, 700]
    sizes:
      {
        body: "1.0625rem",
        lead: "clamp(1.1rem, 1rem + 0.45vw, 1.3rem)",
        small: "0.9rem",
      }
rounded:
  small: 10px
  card: 14px
  band: 26px
spacing:
  gutter: "clamp(1.1rem, 4vw, 3rem)"
  section: "clamp(3.5rem, 8vw, 6.5rem)"
  max-width: 1240px
---

## Overview

An independent toy shop on a sunny high street: kraft price tags on string, toy boxes stamped "3+", lacquered wooden blocks in six colours, and a workbench in the back room. Parents and grandparents mostly browse on phones in daylight, often hunting a birthday present, so the site is light, warm and quick to scan by age.

## Colors

Warm paper and a deep pencil-navy ink carry all text (13.5:1). The six block colours each own one age shelf (yellow 0–1, green 1–2, blue 3–4, red 5–7, purple 8–11, orange 12+), with an AA text colour paired to each. Red is the action colour; kraft is reserved for price tags and staff notes.

## Typography

Grandstander, a bouncy rounded display face, sets headings, prices and dates like hand-cut shop signage. Quicksand at 500 weight carries body copy; tabular numerals for prices, dates and tables.

## Layout

12-column feel on a 1240px measure. The home page alternates dense passages (product grid, session list) with quiet ones (the testing statement, quotes). Age shelves are drawn as a height chart: each band's tile is one block taller than the last. Detail pages pair a sticky gallery or booking box with readable copy.

## Components

- **Price tag:** kraft label with a notched end and punched hole, used for every price.
- **Age badge:** the "3+" roundel from toy boxes, coloured by the shelf the toy starts on.
- **Block:** six SVG shapes (circle, arch, triangle, square, hexagon, star), one per age band.
- **Gift finder block stack:** thirteen radio columns that fill with the band colours up to the chosen age.
- Chips, option tiles, radio cards, quantity stepper, staff note card, date chip, FAQ disclosure.

## Motion

Pages settle in with a short rise. Hero price tags swing onto their hooks once; age-page blocks drop into place; finder columns fill with a staggered ease and new matches drop onto the shelf. Buttons and tiles lift with a slight toy overshoot. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep age as the first way to browse; every toy shows its age badge.
- Do use the block colours only for age bands, never as decoration.
- Do keep prices in kraft tags with tabular numerals.
- Don't add drop-shadow stickers, gradients or cartoon illustration; the toys are the pictures.
- Don't put eyebrow labels above headings or turn sections into rows of icon cards.
