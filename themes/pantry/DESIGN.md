---
name: Pantry
colors:
  paper: "#f6eedf"
  card: "#fffaf0"
  kraft: "#d9c29b"
  kraft-light: "#ecdcbe"
  kraft-deep: "#b3925f"
  ink: "#2b2118"
  ink-2: "#5d4e3d"
  line: "#e0d1b6"
  tomato: "#c13f29"
  tomato-deep: "#9b2f1c"
  tomato-soft: "#f6d8cb"
  herb: "#3b5f34"
  herb-soft: "#dfe6cc"
  mustard: "#e8a93a"
  mustard-soft: "#f7e2ae"
typography:
  display:
    {
      family: Corben,
      weights: [400, 700],
      sizes: "h1 clamp(2.35rem→4.4rem), h2 clamp(1.8rem→2.65rem), h3 1.25rem",
    }
  body:
    {
      family: Nunito Sans,
      weights: "400–800",
      size: 1.0625rem,
      line-height: 1.6,
    }
rounded: { card: 14px, panel: 22px, control: 10px, pill: 999px }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 2.5rem)",
    section: "clamp(3.5rem, 7vw, 6.5rem)",
    max: 1240px,
  }
---

## Overview

The world is the opened meal kit on a kitchen counter: kraft cardboard, paper bags stamped with recipe numbers, and the printed recipe card on top. People choose their week on a phone on Sunday evening and cook from it on a weeknight in a lit kitchen, so the site is light, warm and legible. Corben's rounded, 1970s-cookbook letterforms give it the friendliness of a family recipe box.

## Colors

Card-stock paper and white recipe-card surfaces carry the content; kraft tones are reserved for the box itself (hero panel, box diagram, bag tags, CTA bands). Tomato red is the single action colour (buttons, step numbers, prices), herb green marks success, vegetarian tags and the price band, mustard highlights the current plan and the countdown. Body text is warm ink on paper (≥ 7:1), secondary text `ink-2` (≥ 6:1).

## Typography

Corben for headings, bag numbers, prices and step numerals; Nunito Sans for everything read or tapped. Headings are balanced, tracking −0.015 to −0.025em. Tabular numerals for every price, time and nutrition figure.

## Layout

12-ish column feel on a 1240px container; home alternates dense passages (menu rail, week strip, growers table) with quiet ones (quote, gift card). Detail pages pair a sticky photo with the order panel, then a three-column ingredients / method / nutrition body. Builder and checkout use form-left, sticky summary-right, collapsing to one column under 900px.

## Components

- **Bag tag** (`.bag-no`): kraft label with a punched hole, carrying the recipe's real menu number, used on every recipe photo.
- **Recipe card**: photo, title, "with…" line, time/kcal, diet tags, add-to-box toggle (`aria-pressed`).
- **Box diagram** (signature): a top-down open box drawn in CSS (clip-path flaps, inset walls) with one paper bag per recipe slot; bags drop in when recipes change and each has a Swap button.
- **Recipe sheet**: ruled index card listing "In bag" vs "From your pantry".
- **Segmented radios / choice tiles / chips**: native inputs, styled; focus rings in tomato.
- **Gift card**: three authored faces (tomato, herb garden, kraft box) in SVG geometry with a live preview.
- Header cutoff bar with live countdown; box link with polite count announcement.

## Motion

Pages are dealt in (14px rise, ease-out). Bags drop into the box diagram, the box count and progress bags bump when they change, hero cards straighten on hover. Everything is visible by default; `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do use the bag number only where it identifies a recipe (photos, bags, ingredient lists).
- Do keep kraft for the box world and tomato for actions.
- Don't add eyebrow labels, icon-card grids or stat rows; let the menu and the box carry the page.
- Don't introduce a second accent or gradient; don't put body text on kraft-deep.
