---
name: Shortlist
colors:
  paper: "#f4f2ec"
  paper-hi: "#fbfaf6"
  paper-2: "#e9e5da"
  ink: "#16171a"
  ink-2: "#48494f"
  ink-3: "#64656b"
  rule: "#cdc8bb"
  pen: "#c8321e"
  pen-deep: "#a1240f"
  marker: "#e9f06a"
typography:
  display:
    family: Instrument Sans
    width: 75% (condensed axis)
    weight: 650–700
    sizes: "h1 clamp(2.6rem → 5.5rem), h2 clamp(1.75rem → 2.75rem)"
  body:
    family: Instrument Sans
    width: 100%
    weight: 400–620
    size: 1.0625rem / 1.55
rounded:
  controls: 8px
  images: 6px
  pills: 999px
spacing:
  gutter: clamp(1rem, 4vw, 3rem)
  section: clamp(3.5rem → 6.5rem)
  wrap: 82rem
---

# Shortlist — design

## Overview

Situations Vacant: the newspaper classified pages, reset for a screen. Job hunting has always meant reading columns of small ads and circling the good ones in pen; Shortlist keeps that ritual and makes the circle the product. Light newsprint because people read listings for long stretches, at a desk or on a phone during a break.

## Colors

Warm newsprint paper with near-black ink and hairline rules carry everything. One red pen (`--pen`) is reserved for actions and for the circling mark; a highlighter yellow (`--marker`) appears only for text selection, the current row in the salary table and applied tags. A darker paper band (`--paper-2`) separates editorial passages; one full ink band closes the home page.

## Typography

Instrument Sans throughout, using its width axis: headings, prices and labels set condensed (75%) at 650–700 like classified headers; body copy at normal width. Salaries and tables use tabular lining figures.

## Layout

A masthead header with dateline and a thick-plus-thin rule. Content sits in columns divided by 1–3px rules rather than cards: listings are dense ruled rows, the job page has a boxed ad of key facts beside the editorial text, filters sit in a ruled sidebar. Dense passages (listing columns, tables) alternate with quiet ones (quote, rules band).

## Components

- Listing row: company monogram, title, meta, pay, shortlist toggle; the title gets a red pen loop when shortlisted.
- Salary ruler: CSS-positioned bars for 10th–90th and middle half, median tick, advertised range and offer marker.
- Boxed ad (job key facts), ranked shortlist with reorder controls, comparison table with sticky row headers.
- Forms with labelled fields, hints, inline errors that name the fix, sending and success states.
- FAQ disclosures, segmented level picker, chip filters, billing toggle.

## Motion

The signature is the pen loop: a conic mask sweeps clockwise from where the pen lands, drawing the circle around a shortlisted title (and around a draft listing once it meets the house rules). Pages rise in once; the shortlist count pops when it changes; the offer marker slides along the ruler. All of it collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do show the salary on every listing, first and in tabular figures.
- Do keep red for actions and the pen mark; never for decoration.
- Do separate with rules, not shadows or cards.
- Don't add eyebrow labels, icon-card grids or stat rows.
- Don't use the highlighter for anything but selection and "this is yours" marks.
