---
name: Sprint
colors:
  paper: "#f3f4f0"
  paper-2: "#e8eae3"
  card: "#ffffff"
  ink: "#161a23"
  ink-2: "#434a57"
  ink-3: "#5a6170"
  line: "#d9dcd3"
  marker: "#2340b0"
  rule: "#d9443a"
  sticky: "#ffe27a"
  error: "#b42318"
  night: "#14171e"
typography:
  display:
    {
      family: Inter,
      weight: 720-760,
      size: "clamp(2.5rem, 1.5rem + 4.2vw, 5.25rem)",
      tracking: "-0.03em",
    }
  body: { family: Inter, weight: 400-600, size: "1rem / 1.6" }
  data: { features: "tabular-nums slashed-zero" }
rounded: { card: 6px, control: 8px, panel: 14px, pill: 999px }
spacing:
  {
    section: "clamp(72px, 9vw, 128px)",
    gutter: "clamp(20px, 4vw, 40px)",
    wrap: 1200px,
  }
---

## Overview

The team wall. Agile planning grew up on whiteboards covered in 3×5 index cards, and Sprint keeps that material culture: a cool whiteboard surface, white cards whose key sits above a thin red header rule exactly like an index card, dry-erase blue for every action and sticky-note yellow for selection. It is a light theme because the use scene is a lit office or a laptop at a standup, not a terminal at night.

## Colors

Paper (whiteboard) carries every page; cards and panels are pure white. Marker blue is the only action colour (buttons, links, focus ring, caret, the projected burndown). Index-card red marks card header rules, the active nav underline, urgent priority and over-capacity states. Sticky yellow appears as the hero highlight, the Demo badge and `::selection`. Night is reserved for the keyboard band, principles band and footer. Workflow statuses have their own magnet colours (amber, violet, green).

## Typography

Inter only, with optical sizing on, `cv11` for the single-storey a, heavy display weights at -0.03em and balanced headings. Issue keys use slashed zeros; points, counts, dates and prices use tabular figures.

## Layout

Wide 1200px wrap, generous section rhythm, hairline rules instead of boxes for lists (rituals week strip, views rows, integrations, releases). Cards appear only where the real object is a card: issues, customer stories, plans. The app has a 248px sidebar shell that becomes a top bar with a drop-down below 900px; the board scrolls and snaps column by column on phones.

## Components

Index card (key above red rule, title, priority bars, labels, points, avatar), status ring that fills as work moves right, priority signal bars, keycaps, burndown chart (ideal diagonal, projected line, red carry-over area), capacity meter with a capacity tick, chips and segmented controls built on native radios, accessible `<details>` FAQ, switch toggles on native checkboxes.

## Motion

One language: cards settle. A moved or created card drops in with a slight tilt and lift before resting; the planner meter and burndown morph to the new commitment; pages slide up 10px on arrival. Everything is visible by default and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

Do keep the red rule thin and only under card keys. Do keep blue for actions only. Don't add eyebrow labels, gradient text, glass, or icon-tile grids. Don't turn every section into cards; the wall is a surface with lines drawn on it. Don't use monospace — Inter's tabular figures carry the data.
