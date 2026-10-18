---
name: Stack
colors:
  paper: "#f6f4ee"
  paper-2: "#eeebe2"
  paper-3: "#e4e0d4"
  sheet: "#fbfaf6"
  ink: "#15171b"
  ink-2: "#33363d"
  muted: "#5b5e66"
  rule: "#d9d4c7"
  accent: "#c2410c"
  accent-ink: "#9a330a"
  code: "#17191e"
  code-ink: "#e9e5da"
  ok: "#2d6637"
  err: "#a3261c"
typography:
  display: IBM Plex Sans 600, clamp(2.1rem → 4.1rem), tracking -0.028 to -0.032em
  body: IBM Plex Sans 400, 16px / 1.6
  mono: IBM Plex Mono 400–600 for code, ids, versions, methods, timestamps
rounded: 4px tags, 6px controls, 8–10px code blocks and panels
spacing: 4px base; sections clamp(56px, 7vw, 96px); docs column max 800px
---

## Overview

A bound reference manual, set on screen. Warm paper, black ink, ruled chapter heads and one vermilion pen mark for "you are here". Developers read docs beside an editor in daylight for long stretches, so the page is light and quiet while code listings are inked solid dark, like inverted figures in a printed manual. IBM Plex carries the lineage of real technical manuals.

## Colors

Paper and ink do almost everything. Vermilion (`accent`) is reserved for focus, current location, links' underlines and the one primary action on dark ground. HTTP methods and change types use small tinted tags (green GET/Added, vermilion POST, ochre PATCH/Deprecated, red DELETE). Code surfaces use a warm dark with muted syntax colours that stay AA on `code`.

## Typography

Plex Sans 600 for headings with tight but legal tracking; Plex Sans 400 for prose at a 65–75ch measure. Plex Mono only where the content is code or data: listings, paths, ids, versions, dates, keys, metrics. Tables use tabular numerals.

## Layout

Two layouts. Plain pages (home, changelog, search, about, support) sit in a 1240px wrap. Documentation pages use a three-column shell: a sticky section index on the left, the reading column, and an on-this-page rail on the right (dropped below 1200px; the index collapses behind a "Browse the docs" button below 960px). The home page alternates paper, a tinted band, a dense table and a solid ink band, and ends on a ruled close.

## Components

Header with version tag, search field link (`/` shortcut) and Quickstart CTA; mobile menu below 1100px. Code blocks with file label, copy button and a hand-rolled tokenizer. Contents list with dotted leaders. Data tables with a 2px ink head rule. Notes (tip, warning), numbered steps, prev/next pager, feedback prompt. Playground: request form panel and dark response panel, generated-code block with language switch, session history. Forms with inline errors that name the fix.

## Motion

One language, taken from print: chapter rules under each page title draw left to right on arrival; playground responses print top to bottom via clip-path; packets travel the job-flow diagram on the home page. All are CSS-only on already-visible content and are removed under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep mono for code and data, never as decoration.
- Do let rules (1px, 2px ink) carry structure instead of cards and shadows.
- Do write errors that name the field and the fix, in the UI and in the sample API.
- Don't add a second accent or tint whole sections in vermilion.
- Don't put eyebrow labels above headings or turn sections into icon-card grids.
- Don't use in-page `#anchors`; scroll with buttons, routes are hashes.
