---
name: Field
colors:
  paper: "#f3f1e7"
  paper-2: "#e8e5d6"
  chalk: "#fbfaf3"
  ink: "#13261b"
  ink-2: "#43564b"
  rule: "#c8c9ba"
  green: "#1e5b3a"
  green-deep: "#133f28"
  green-stripe: "#23683f"
  gold: "#f2b630"
  gold-tint: "#f6e3b0"
  red: "#b02e22"
typography:
  display: Graduate
  body: Rubik
  sizes:
    h1: "clamp(2.4rem, 1.4rem + 4.2vw, 5.25rem)"
    h2: "clamp(1.65rem, 1.2rem + 1.9vw, 2.75rem)"
    h3: "clamp(1.1rem, 1rem + 0.35vw, 1.3rem)"
    body: "1rem / 1.55"
rounded:
  sm: 4px
  md: 10px
  lg: 14px
spacing:
  gap: "clamp(1rem, 0.6rem + 1.6vw, 2rem)"
  section: "clamp(3.5rem, 2rem + 6vw, 7rem)"
---

# Field

## Overview

A grassroots football club seen through its matchday programme: cream programme stock, ink rules, varsity lettering and club-green panels with chalk pitch markings. The people who use it are parents and players checking fixtures on a phone at the touchline in daylight, so the site is light, dense where the fixture list is dense, and quiet everywhere else.

## Colors

Paper and ink carry the reading. Club green is the shirt, the primary button and every "on the pitch" surface (matchday strip, results band, team sheet pitch, closing panel). Gold is the kit trim: selected states, the age marker, "won" on the results band and focus rings on dark surfaces. Red marks losses and form errors only. League rows for the club sit on gold tint.

## Typography

Graduate, a collegiate slab, sets the club name, headings, shirt numbers, scores and dates, the way shirt lettering and programme headings do. Rubik handles everything that has to be read: body, tables, forms and labels. Numbers in tables use tabular lining figures.

## Layout

A 1240px wrap with programme-style rules: 2px ink rules above lists, double rules under page titles. Fixture rows are a fixed grid (date, team, home-score-away, venue) that folds into two lines on phones. Home alternates dense sections (weekend list, tables) with open ones (scoreboard, quote, closing panel).

## Components

Crest and shirt are authored SVG (green body, chalk sleeves, keeper in gold). The team sheet is the signature: an SVG pitch with mowing stripes, shirt tokens placed from the formation string, a player card with stats and bench swaps. Also: segmented controls for filters, league table, age ladder (a Gantt of team age bands with a slider), training board, fee table, registration form with inline errors, FAQ disclosures and the ground map.

## Motion

One language: chalk. Pitch markings draw themselves in with stroke-dashoffset when a pitch appears, and shirts glide to their new positions when the formation changes, staggered by slot. Pages fade up 10px on arrival. Everything is visible by default; `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep scores, dates and shirt numbers in Graduate; keep reading text in Rubik.
- Do use green surfaces only for match-related moments.
- Don't put gold text on paper: it fails contrast. Gold is a fill.
- Don't publish under-12 scores or tables; the content model supports `scores: false` for that.
- Don't add eyebrows above headings or decorative stat rows.
