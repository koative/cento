---
name: Vital
colors:
  paper: "#f4f1ea"
  paper-2: "#ebe6da"
  slip: "#fffdf8"
  ink: "#14262b"
  ink-soft: "#4b5b5f"
  pine: "#0d5c55"
  pine-deep: "#083f3a"
  mint: "#dcede6"
  pulse: "#e0533d"
  pulse-ink: "#ad3722"
  amber-soft: "#fbefd3"
  amber-ink: "#7a4f00"
  line: "#d9d3c5"
typography:
  display:
    {
      family: "Plus Jakarta Sans",
      weight: 800,
      size: "clamp(2.35rem, 3.6vw + 1.1rem, 4.5rem)",
      tracking: "-0.03em",
    }
  body:
    {
      family: "Plus Jakarta Sans",
      weight: 400,
      size: "1.0625rem",
      lineHeight: 1.6,
    }
rounded: { card: "14–16px", control: "12px", chip: "999px" }
spacing:
  {
    gutter: "clamp(1.1rem, 3.5vw, 2.75rem)",
    section: "clamp(3.5rem, 7vw, 6.5rem)",
  }
---

# Vital — design

## Overview

The world is the paperwork of a good clinic visit: the tear-off intake slip, the prescription label, the vitals trace. People reach Vital on a phone while unwell — on the sofa, before work, late at night — so the site is light but warm (linen paper, not hospital white), plain-spoken and one-handed, and it always shows the real wait and the real price before asking anything.

## Colors

Linen `paper` with near-black blue `ink`. `pine` is the clinical action colour (buttons, live numbers, selected choices). `pulse` vermilion is reserved for life signs — the ECG trace, the live dot, the current check-in step — with `pulse-ink` for emergency text. `amber` marks "go in person" advice. Dark `ink` sections carry the safety stance; `pine` bands carry the closing call.

## Typography

Plus Jakarta Sans throughout: 800 for display at −0.03em, 700–750 for headings and labels, 400–600 for body. All prices, wait times, codes and clock times use tabular numerals.

## Layout

A 1320px wrap with ruled lists instead of card grids: price-list leaders on the conditions index, ruled timelines, ruled FAQs and definition lists. Cards are kept for things that are objects in the world: the visit slip, the price card, plans, the clinician's open times.

## Components

- **Visit slip** — tear-line header with punched notches (CSS mask), dotted rows; values re-ink (clip-path) as they fill. Used in the hero, how-it-works and as the live preview in the check-in.
- **Call frame** — sample video visit with a running timer, live chip, controls and a small trace.
- **Wait board / badge** — live video, message and scheduled times from the local clock.
- **Check-in** — progress rail, large radio/checkbox choices, red-flag stop panel, severity range, triage advice, validated details form with inline errors, loading and confirmation.
- **Phones** — authored app screens (home, visit note, prescription tracker) with a tab bar.
- Chips with `aria-pressed`, native `details` FAQ, comparison tables.

## Motion

One language: the ECG trace draws in once (stroke-dashoffset), slip values ink in from left to right, check-in steps slide in, pages fade up 10px. The live dot pings. Everything is off under `prefers-reduced-motion`.

## Do's and Don'ts

- Do show the wait and price before the form; do say when to go in person.
- Do keep `pulse` for vital signs and emergencies only.
- Don't add eyebrow labels, icon-card rows or decorative gradients.
- Don't promise prescriptions; label drug lists as illustrative.
