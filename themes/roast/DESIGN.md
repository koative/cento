---
name: Roast
colors:
  paper: "#f4eee4"
  paper-2: "#ebe1d1"
  card: "#fbf8f2"
  ink: "#2b1a12"
  ink-2: "#5e4a3e"
  line: "#d6c7b2"
  orange: "#f78b38"
  rust: "#a5461b"
  cocoa: "#33211a"
  sage: "#b9c7a6"
typography:
  display:
    {
      family: "DM Serif Display",
      weight: 400,
      sizes: "h1 clamp(2.75rem, 6.2vw, 5.75rem); h2 clamp(2rem, 3.8vw, 3.25rem); h3 1.45rem",
    }
  body: { family: "Hanken Grotesk", weight: "400–700", size: "1.0625rem / 1.6" }
rounded: { card: 14px, control: 10px, pill: 999px }
spacing:
  {
    page-pad: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4rem, 9vw, 7.5rem)",
    max: 1240px,
  }
---

## Overview

Roast is set in the visual language of the roastery's own printed things: cream bag stock, a colour label band per coffee, the roast log and the café menu board. People mostly shop it on a phone in the morning, in kitchen light, so the site is light (warm paper and chocolate ink) with one loud orange that the bags carry too.

## Colors

The base is cream paper and chocolate ink. Orange is used only as a fill (the hero panel, roast days, the closing band, badges) because it is too light for text; text accents use rust (#a5461b, 7.5:1 on paper). Each coffee owns one label colour that appears on its bag, its shelf, its product stage and its roast-curve development band. Cocoa covers the dark moments: the subscription teaser, the bar menu and the footer.

## Typography

DM Serif Display (400 only, plus italic) sets headings, coffee names, prices and numbers in the timer. The italic is the voice for tasting notes and the second line of the hero. Hanken Grotesk sets the body at 17px with tabular numerals for prices, hours and times. Tracking never goes below −0.02em.

## Layout

The page width is 1240px, and full-bleed bands (hero panel, roast week, subscription, quote, close) alternate with contained sections. Detail pages use a sticky visual column (bag stage, subscription summary, order summary) next to a scrolling content column. Data is shown as tables and hairline lists rather than card grids.

## Components

- **Bag:** authored CSS/SVG packaging scaled in `em` by its `size` prop, used for the hero, shelves, product stage, subscription preview and cart thumbnails.
- **RoastCurve:** an SVG bean-temperature chart built from each coffee's drop time and temperature, marking the turning point, first crack and the development band.
- **Subscription builder:** a cups-per-day slider that suggests a size and rhythm, warnings when supply and rhythm drift apart, and a live delivery schedule.
- **Brew timer:** start/pause/reset, with the current step highlighted and announced.
- Segmented radio pills, filter chips, quantity stepper, accessible `<details>` FAQ, form fields with inline errors.

## Motion

Pages rise in over 0.6s with an exponential ease-out. Bags drop in with a slight rotation whenever they change (hero, product size, subscription choice), and the roast curve draws itself. Everything is visible without motion, and `prefers-reduced-motion` removes all animations and transitions.

## Do's and Don'ts

- Do give every new coffee a label colour light enough for ink text on it.
- Do keep orange as a fill. Use rust for accent text.
- Don't add eyebrow labels, icon-card rows or gradient text.
- Don't use photography in place of the bag for products. The bag is the product image.
