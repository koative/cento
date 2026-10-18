---
name: Streak
colors:
  paper: "#f6f1e6"
  paper-2: "#ede5d3"
  card: "#fcf9f2"
  ink: "#1b1e30"
  ink-2: "#4b4e65"
  rule: "#dcd2bd"
  marker: "#cf3a24"
  marker-ink: "#ad2f1b"
  grace: "#f4cc3f"
  night: "#171a2b"
typography:
  display:
    {
      family: Rubik,
      weight: 800,
      size: "clamp(2.75rem, 6vw, 5.5rem)",
      tracking: "-0.035em",
    }
  heading:
    {
      family: Rubik,
      weight: 800,
      size: "clamp(1.8rem, 3.4vw, 2.85rem)",
      tracking: "-0.025em",
    }
  body: { family: Rubik, weight: 400, size: "1.0625rem", lineHeight: 1.6 }
rounded: { card: 18px, control: 999px, field: 10px, phone: "14% / 6.8%" }
spacing:
  {
    section: "clamp(4rem, 8vw, 7rem)",
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    wrap: 1240px,
  }
---

## Overview

A wall planner with a red marker and a yellow highlighter. Habit tracking descends from the paper calendar where you cross off each day and try not to break the chain, so the whole site is set on warm planner paper with ink-navy type, red marker crosses for done days and a yellow highlighter swipe for grace days. Light, because the app is checked in the morning in daylight; the evening check-in gets its own night band.

## Colors

Paper and ink carry everything. Marker red is reserved for the cross, the primary button and the chain count; text-sized red uses the darker `marker-ink` for contrast. Highlighter yellow means a grace day and nothing else (also used for selection and success notes). Night navy appears in the evening band, the download stage and the footer.

## Typography

Rubik throughout. Heavy 800 display with tight tracking for headlines and big counts, 600 for UI labels, 400 for body. All counts and dates use tabular numerals.

## Layout

A 1240px wrap with generous section rhythm; the home page alternates dense passages (feature index, chain board) with quiet ones (photo scene, close). Feature pages alternate copy and a phone on a paper-2 stage that crops the phone at the bottom.

## Components

- **Phone**: a CSS-drawn device whose screens (today, chain, grace prompt, evening, lock screen, insights, buddies, data) are real markup sized in `em` off a container-query font size, so one component scales from a blog thumbnail to the hero.
- **Chain board** (signature): a ruled October calendar. Tap cycles a day through done → grace → empty; the chain, longest run and the one-grace-per-seven-days rule recompute live; arrow keys move between days.
- Store buttons, pill toggles with `aria-pressed`, native `<details>` FAQ, ruled tables, validated forms with inline errors and a highlighter-yellow success note.

## Motion

One language: the marker stroke. Every cross draws its two strokes in (`stroke-dashoffset`) when it appears, so ticking a habit or a calendar day feels like a pen. Pages rise in softly; the mobile menu wipes down with `clip-path`. Everything is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep red for the cross and the chain; don't use it for decoration.
- Do keep yellow meaning grace; don't use it as a generic highlight colour in content.
- Do draw new app screens as markup inside `Phone`; don't paste screenshots.
- Don't add points, badges or confetti — the brand's position is that the calendar is enough.
