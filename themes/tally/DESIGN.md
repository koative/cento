---
name: Tally
colors:
  paper: "#f3f5ec"
  paper-2: "#e7eedd"
  white: "#fffdf6"
  rule: "#c8d6c0"
  rule-strong: "#8eaa96"
  ink: "#15251d"
  ink-2: "#435a4d"
  green: "#1d4d36"
  red: "#b8322a"
  manila: "#efe1b5"
  manila-2: "#f7eed2"
typography:
  display: "Hanken Grotesk 700–800, tracking -0.03 to -0.035em"
  body: "Hanken Grotesk 400–650, 1.0625rem / 1.6"
  sizes: "h1 clamp(2.5rem…5rem), h2 clamp(1.8rem…2.75rem), h3 1.25rem, small 0.875rem"
  numerals: "tabular lining figures for every date, price and table"
rounded:
  control: 6px
  card: 12px
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 3rem + 4vw, 7rem)"
  wrap: 1240px
---

# Tally — design

## Overview

The world is the accountant's desk: a green columnar pad, a strip of adding-machine tape, a red pencil for tick marks and manila folders for whatever is due next. Small-business owners visit in daylight on a laptop between other jobs, or on a phone when a deadline email arrives — so the site is a light, calm paper surface where every number lines up and the next due date is always one glance away.

## Colors

Pale ledger-green paper with a slightly deeper band for alternate sections. Ink is a green-black, not grey. Ledger green carries primary actions. Red is reserved for the red pencil: tick marks, the fifth tally stroke, negative amounts in parentheses, due-date months and urgent countdowns. Manila marks "what's next" (deadline band, the next-due card, featured package column). Dark ink bands hold client stories, the closing call and the footer.

## Typography

One family, Hanken Grotesk, with weight and size doing all hierarchy. Display headings are bold and tightly tracked; body runs at 65–75ch. Every date, price and table uses tabular lining figures so columns align like a ledger. Negative amounts use accounting parentheses; totals get the accountant's double underline.

## Layout

Left-aligned, asymmetric two-column compositions on a 1240px wrap. Content is ruled rather than boxed: lists, services, deadlines, FAQ and tables sit on a 2px ink top rule with 1px green hairlines between rows, like a columnar pad. Cards are rare and reserved for things you'd hold — the tape, packages, the calendar form, the booking form.

## Components

- **Close tape** — the hero's adding-machine strip with serrated ends, red ticks and a double-underlined net profit.
- **Due bar** — a dark strip above the header with the next federal deadline (or the visitor's own once they've built a calendar).
- **Services ledger** — ruled rows: name, what it is, "from" price; reused on Home, Services and service pages.
- **Deadline rows** — month in red, day large, weekday, filing and countdown; red when within 30 days.
- **Tax calendar (signature)** — setup form → next-due card → twelve-month strip where each month shows its deadlines as tally marks (four strokes and a red gate) → month-by-month list → .ics export.
- **Month ruler** — a 31-day scale with red marks on the days the close happens.
- **Columnar tables** — comparison and add-on tables with vertical hairlines and a manila featured column.
- **Slot picker** — day and time chips; booked slots are dashed and struck through in red.

## Motion

The hero tape feeds in from the top once, like paper out of an adding machine. Tally strokes draw in one after another whenever the calendar changes, prices roll with a short blur when billing switches, pages enter with a short fade-up and the mobile menu drops in. Everything is visible without JavaScript-driven reveals, and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do keep numbers tabular and right-aligned in tables; use parentheses for negatives.
- Do use red only for ticks, deadlines and negative amounts — never for decoration.
- Do rule content with hairlines before reaching for a card.
- Don't add eyebrow labels, gradient text, icon-card grids or stat rows.
- Don't present deadline dates as advice; keep the illustrative note next to them.
