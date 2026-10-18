---
name: Lantern
colors:
  paper: "#f6f0e3"
  paper-2: "#ece2cd"
  card: "#fcf8ef"
  ink: "#1c2332"
  ink-2: "#4a5160"
  rule: "#d9ccb3"
  rule-strong: "#ad9d7f"
  flame: "#ef6a2c"
  flame-ink: "#a33f10"
  glow: "#f7bd3a"
  glow-soft: "#fbe5b1"
  dusk: "#18213a"
  dusk-2: "#263152"
  on-dusk: "#f6f0e3"
  error: "#a3260f"
  ok: "#2f5d3a"
typography:
  display:
    family: Bitter
    weights: 600–800
    sizes: "home hero clamp(2.75rem, 6vw, 5.25rem); h1 clamp(2.5rem, 5.4vw, 4.6rem); h2 clamp(1.75rem, 3.1vw, 2.6rem); board totals 2.4–3.2rem"
  body:
    family: Source Sans 3
    weights: 400–700
    sizes: "17px base, 1.6 line height, 0.85–0.95rem for meta"
rounded:
  card: 14px
  control: 10px
  chip: 999px
spacing:
  page-pad: "clamp(1.25rem, 4vw, 3rem)"
  max-width: 1240px
  section: "clamp(3.5rem, 8vw, 6.5rem) above each section"
---

## Overview

Lantern is a small town's community fund that has kept a painted fundraising thermometer in a shop window on Mill Street since 2009. The site is that window: warm notice paper, dusk-blue ink, and one colour of paint, the thermometer orange. It is light because people read it in daylight on a phone at the school gate or at a kitchen table, and the one dark band is the evening Lantern Walk.

## Colors

Paper and card are two warm off-whites; ink is a deep blue-black rather than pure black. Flame orange is reserved for money moving: the thermometer, progress bars, primary "Give" buttons and checked availability slots. Flame-ink carries orange as text at AA contrast. Glow yellow marks selection and the pledge preview. Dusk navy is used for the walk band, the panel band and the footer. Errors use a brick red distinct from the flame.

## Typography

Bitter, a sturdy slab serif, sets headlines, board totals, card titles and receipt figures, the voice of a hand-lettered sign. Source Sans 3 sets body copy, forms and tables. Money and dates use tabular numerals. Headings track at −0.02em, never tighter.

## Layout

Pages open with a large heading and short lede at a 65ch measure, then alternate dense passages (ledger table, budget lines, availability grid) with quiet ones (a single quote, a closing call). Most content sits in a 1240px container with two-column splits that collapse under 900px. Campaign cards are the only repeated card grid; elsewhere content is set in ruled lists.

## Components

- **Window board**: an SVG/CSS thermometer with tick marks, labelled milestones (checked when reached) and a percentage bulb; it previews a pledged amount as a dashed band.
- **Pledge**: impact tiles plus a range slider; the sentence below says what the amount does and which milestone it reaches, and the button carries the choice to the donate flow.
- **Bar**: the thin campaign-card version of the board, with milestone notches.
- **Donate flow**: three numbered steps, a once/monthly segmented control, amount tiles, sticky gift summary, and a ticket-shaped receipt.
- **Event rows**: a calendar-leaf date block, title, time and place, kind chip and places left.
- **Availability grid**: a 7 × 3 table of 44px checkboxes that fill orange when ticked.
- Ruled tables for grants and budgets; native `details` for FAQs.

## Motion

Pages ease in with a short rise. The thermometer fluid rises from the bulb when a board renders, the mobile menu drops in, and the receipt slides up with a slight tilt. Everything is visible without motion, and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do keep orange for money and giving actions only.
- Do write in the fund's plain, neighbourly voice and cost things to the dollar.
- Do show progress against concrete milestones, never a bare percentage.
- Don't add stock icon rows, eyebrow labels or decorative gradients.
- Don't name real organisations or individuals as donors or grantees.
