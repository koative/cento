---
name: "Folio"
colors:
  wall: "#f4f3ef"
  wall-2: "#ebe9e3"
  paper: "#fbfaf8"
  ink: "#161513"
  ink-2: "#57534c"
  line: "#d9d6ce"
  line-strong: "#8d887e"
  red: "#d0381f"
  red-text: "#b8301a"
typography:
  display:
    fontFamily: "Hanken Grotesk"
    fontWeight: 500
    fontSize: "clamp(2.75rem, 1.5rem + 4.4vw, 6rem)"
    lineHeight: "0.98"
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Hanken Grotesk"
    fontSize: "clamp(1.625rem, 1.2rem + 1.4vw, 2.5rem)"
  body:
    fontFamily: "Hanken Grotesk"
    fontWeight: 400
    fontSize: "1.0625rem"
    lineHeight: "1.55"
  label:
    fontFamily: "Hanken Grotesk"
    fontSize: "0.875rem"
rounded:
  base: "2px"
  chip: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(80px, 9vw, 144px)"
  max: "1440px"
---

# Folio design

## Overview

The site is hung like the gallery itself: a warm white wall, black vinyl lettering, and works that sit on the page with a soft, lit shadow. The red of a sold dot is the only accent. Collectors and visitors check it on a phone in daylight before walking over, or browse prices at a desk, so it is light, quiet and dense with real information: wall labels, prices and opening hours.

## Colors

`wall` is the page, `wall-2` the plate behind each work, `paper` the true-scale wall and form fields. `ink` carries type and primary buttons, `ink-2` secondary text (AA on wall). `red` is the sold/reserved dot, the logo point and the hanging-height line; `red-text` is its AA text variant for errors and saved states. The footer inverts to ink.

## Typography

One family, Hanken Grotesk, in three voices: display at weight 500 with tight leading for exhibition titles and page heads, h2 at section scale, and small wall-label type (artist bold, title italic, medium and size in `ink-2`, price in tabular figures). Body measure is capped at 68ch.

## Layout

A 1440px frame with fluid gutters. Sections open on a 1px ink rule with the heading left and a short note or link right. Exhibitions run as wide image/text rows, works as a four-column grid of plates, the roster as a list with a sticky preview plate. Mobile stacks everything into one column below 900px, with the menu as a full-width drop panel.

## Components

- Plate: a work drawn as SVG geometry on a `wall-2` ground with a two-layer drop shadow; lifts on hover.
- Wall label: artist, italic title and year, medium, size, price or sold/reserved dot, save-to-list toggle.
- True-scale wall (`ScaleView`): the work, a ruler, a bench/sofa/door at real size and a dashed hanging-height line, redrawn for four walls, cm or in.
- Chips and segmented radios for filters and options; selects with a drawn chevron; sticky filter bar with the live count and "Enquire about N".
- Forms: labelled fields, hints, inline errors with a red dot that name the fix, busy button state, `aria-live` success panel.

## Motion

One easing (`cubic-bezier(0.16, 1, 0.3, 1)`). Pages settle in from 12px below; the roster preview resolves from a slight blur; the scale view glides the work and ruler to new sizes over 0.8s; the mobile menu wipes down with `clip-path`. Everything is visible without JS animation, and `prefers-reduced-motion` switches all of it off.

## Do's and Don'ts

- Do show the price or status on every available work; do give sizes in cm and in.
- Do keep the red to dots, lines and errors.
- Don't add a second typeface or tinted section backgrounds; the wall stays one colour.
- Don't crop works: plates always show the whole piece with margin around it.
