---
name: Sonnet
colors:
  paper: "#f6f0e4"
  paper-2: "#ece4d2"
  sheet: "#fcf9f2"
  ink: "#263027"
  ink-2: "#4c5749"
  line: "#7d8278"
  pen: "#b3361d"
  french: "#34508a"
  italian: "#3f7353"
  spanish: "#94560f"
  portuguese: "#1d6470"
  german: "#55506a"
  japanese: "#8e3550"
typography:
  display: Alegreya
  body: Alegreya Sans
  sizes:
    h1: clamp(2.5rem, 1.5rem + 3.6vw, 4.9rem)
    h2: clamp(1.75rem, 1.25rem + 1.8vw, 2.75rem)
    body: 1.125rem
rounded:
  control: 4px
  card: 8px
  chip: 999px
spacing:
  gutter: clamp(1.25rem, 4vw, 3rem)
  section: clamp(4.5rem, 9vw, 7.5rem)
  wrap: 1240px
---

## Overview

The world is the language learner's desk: a bilingual dictionary, an exercise book with a red margin line, and a teacher's red pen. Adults choosing a class in the evening, on a laptop or phone, under warm light, so the site is light paper with green-black ink. Every page heading carries a dictionary entry beside it, and the signature level test hands your sheet back marked in red.

## Colors

Warm paper and green-black ink carry everything. One accent, `pen`, is reserved for corrections, pronunciations, the couplet in the logo and urgent counts (places left). Each language has its own ink colour, used for its name, level tag, course hero tint, timetable slot and the word card.

## Typography

Alegreya for headings, foreign phrases (italic), pronunciations and prices; Alegreya Sans for interface and body. Data uses lining tabular numerals; running text keeps Alegreya's old-style figures. Tracking never below −0.022em.

## Layout

A 1240px wrap with generous section spacing. Courses are a ledger (language, title and summary, when, price), not cards. Page heads pair the h1 and lead with a dictionary gloss in a narrow right column. Dense passages (ledger, timetable) alternate with quiet ones (parallel proverbs, student voices) and tinted bands.

## Components

Word card with language toggle; course ledger row; dictionary entry (name, IPA, role, bio, favourite word); exercise sheet with red margin line; red-pen mark (struck word with correction written above, or a tick); ledger lists for specs, dates and hours; filter chips coloured by language; per-term / whole-year toggle; floor plan in SVG; enrolment form with sticky summary.

## Motion

Pages rise in on route change. The word card re-inks (blur to sharp) when the language changes. In the test, each sheet slides in, and marking strikes the wrong word left to right before the correction writes itself in. All motion is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

- Do use the red pen only for corrections and urgency; it is the teacher's voice.
- Do set foreign text with a `lang` attribute and its translation underneath.
- Do keep language colours for language-specific content only.
- Don't add eyebrow labels, icon card grids or decorative gradients.
- Don't set data in old-style figures; use `.num`.
