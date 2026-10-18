---
name: Campus
colors:
  paper: "#f6f2e9"
  paper-2: "#ece6d7"
  surface: "#fffdf8"
  ink: "#22271f"
  ink-2: "#464c41"
  muted: "#5c6056"
  rule: "#d6cfbd"
  marker: "#ecd84f"
  marker-soft: "#f6eca6"
  accent: "#6c5717"
  margin: "#b2442a"
  ok: "#2f6a3a"
typography:
  display:
    fontFamily: Be Vietnam Pro
    fontWeight: 800
    fontSize: clamp(2.5rem, 1.6rem + 3.8vw, 4.75rem)
    letterSpacing: -0.035em
    lineHeight: 1.02
  headline:
    fontFamily: Be Vietnam Pro
    fontWeight: 700
    fontSize: clamp(1.85rem, 1.4rem + 1.9vw, 2.75rem)
    letterSpacing: -0.03em
  body:
    fontFamily: Be Vietnam Pro
    fontWeight: 400
    fontSize: 1.0625rem
    lineHeight: 1.6
rounded:
  card: 12px
  control: 8px
  chip: 99px
spacing:
  gutter: clamp(20px, 4vw, 48px)
  section: clamp(64px, 9vw, 128px)
---

## Overview

A study desk under a lamp. Campus learners study at kitchen tables between 8 and 10 pm, on laptops and phones, so the world is warm notebook paper, charcoal-green ink and one highlighter yellow that marks what matters — the word in the headline, the active nav item, the finish date the planner gives you, a completed lesson. It reads as a well-kept study notebook rather than a tech dashboard.

## Colors

Paper (`#f6f2e9`) is the page; a darker paper band (`#ece6d7`) holds rhythm sections and the workspace rail. Ink (`#22271f`) carries text, primary buttons, the workspace resume card and the footer. Highlighter (`#ecd84f`) is used as a mark, never as text colour: headline highlight, progress fills, active chips, the closing band. Ochre (`#6c5717`) is reserved for link underlines, focus rings and small labels. A notebook-margin red (`#b2442a`) marks errors and the ruled margin line in notes.

## Typography

Be Vietnam Pro only, with weight doing the work: ExtraBold 800 display at up to 4.75rem with −0.035em tracking, Bold 700 headings, Medium 500 for pull quotes, Regular 400 body at 1.0625rem/1.6. Durations, prices, dates and counts use tabular numerals.

## Layout

A 1280px wrap with fluid gutters. Pages alternate dense passages (subject index, catalogue rows, syllabus) with quiet ones (pull quote, closing band). The catalogue is a printed course index — cover, title and summary, then a ruled facts column — not a card grid. Course pages pair a long reading column with a sticky enrol panel. The workspace swaps the site header for a syllabus rail.

## Components

Highlighter mark (`mark.hl`), buttons (ink primary, quiet outline, highlighter on dark), pill chips with `aria-pressed`, segmented radio toggles, radio choice cards, labelled fields with inline errors, syllabus `<details>` modules, the pace planner (range, day toggles, date input, week timeline, first sessions), lens study, progress meters, SVG week chart, ruled notebook textarea.

## Motion

One language: the highlighter stroke. Marks sweep in left-to-right on load, progress meters and planner bars fill with the same exponential ease-out, nav items gain their marker underline on hover. Content is always visible; `prefers-reduced-motion` removes every animation and transition.

## Do's and Don'ts

- Do use yellow as a mark behind ink, never as text on paper.
- Do keep lessons, exercises and checks short and concrete in copy.
- Do let numbers sit in tabular figures.
- Don't add eyebrow labels, icon-card rows or gradient effects.
- Don't introduce a second accent colour; ochre and margin red are utility colours only.
