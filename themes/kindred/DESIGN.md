---
name: Kindred
colors:
  paper: "#f7ead2"
  paper-2: "#fffaf0"
  paper-3: "#efdcb9"
  ink: "#33302a"
  ink-2: "#5c5546"
  accent: "#b44720"
  accent-deep: "#933612"
  marigold: "#f0c449"
  forest: "#2e4a37"
  tag-green: "#3d7a4c"
  tag-amber: "#d99a1e"
  tag-orange: "#c4552a"
typography:
  display: "Baloo 2, 600–800"
  body: "Mulish, 400–800"
  sizes:
    h1: "clamp(2.6rem, 5.6vw, 5.25rem)"
    h2: "clamp(1.9rem, 3.5vw, 3rem)"
    h3: "1.35rem"
    body: "1.0625rem / 1.6"
rounded:
  card: "20px"
  control: "10px"
  button: "999px"
  arch: "999px 999px 26px 26px"
spacing:
  gutter: "clamp(1.1rem, 4vw, 2.5rem)"
  section: "clamp(3.5rem, 8vw, 6.5rem)"
---

## Overview

Kindred is set in the world of the shelter's own paperwork: the kennel card clipped to every run door, the coloured collar tag that tells staff how experienced an adopter should be, the hours board at reception. Families browse on a phone in the evening or a laptop at the weekend, so the site is light, warm and rounded, with honest information density where decisions get made.

## Colors

Cream paper with near-white card stock and a deeper cream band; warm ink for text. Rust is the action colour (buttons, scores, links, punched marks), marigold the sticker and highlight colour (today's hours, active nav underline, quiz leaders), forest green the calm band behind the quiz teaser and building section. Green, amber and orange are reserved for the shelter's collar-tag system and good-with marks.

## Typography

Baloo 2 at 700–800 carries every heading, animal name, price and button — round and friendly, tight at −0.02em. Mulish handles body copy, labels and data. Numerals in hours, fees, days-here counts and scores are tabular.

## Layout

A 1260px wrap with fluid gutters. Pages alternate between dense passages (kennel-card grids, spec sheets, fee tables, the roles table) and quiet ones (the adopter quote, the closing invitation). Photography sits in an arch on the hero, animal profile and story — the shelter's doorway — and in rounded rectangles elsewhere.

## Components

- **Kennel card**: card stock with a punched hole at the top centre, kennel number and days-here row, photo, name, meta, one-line personality, then a dashed tear line above the collar tag and good-with icons. It pivots from the hole on hover.
- **Collar tag chip**: tiny SVG ID tag filled in the tag colour plus its name.
- **Good-with marks**: Lucide kid/dog/cat icons with a green tick, amber dash or orange cross badge.
- **Spec sheet**: two-column dashed-rule list on the animal page.
- **Still-in-the-running board**: every animal's face on the quiz; ruled-out faces dim to grey, leaders get a marigold ring.
- Forms: card-stock panels, 48px fields, inline errors in deep rust naming the fix, stepper for the three-stage application, segmented toggle and amount tiles on donate.

## Motion

Pages ease in from a visible state. Kennel cards swing on their hook on hover; quiz result cards drop in and settle as if hung on a door; the quiz board dims and lights faces as answers change; the open-now dot pulses. Everything collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep collar-tag colours for tags and good-with only.
- Do write animal copy in the counsellors' voice: specific habits, honest cautions.
- Don't add eyebrow labels, stat rows or decorative gradients.
- Don't use the arch on landscape-only crops smaller than about 300px wide.
