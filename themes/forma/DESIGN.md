---
name: Forma
colors:
  paper: "#efede6"
  paper-2: "#e5e2d8"
  field: "#f8f7f2"
  ink: "#1f201c"
  ink-2: "#55564e"
  line: "#cdc9bc"
  control: "#7c796e"
  red: "#b0391f"
  red-ink: "#8f2c16"
  sun: "#efc85a"
typography:
  display: "Familjen Grotesk, 400–700"
  body: "Newsreader (optical sizes 6–72), 300–700, roman and italic"
  sizes:
    display: "clamp(3rem, 8vw, 6rem)"
    h1: "clamp(2.6rem, 6vw, 5rem)"
    h2: "clamp(1.9rem, 3.6vw, 3.1rem)"
    h3: "clamp(1.2rem, 1.8vw, 1.45rem)"
    lead: "clamp(1.2rem, 1.6vw, 1.4rem)"
    body: "1.125rem"
    small: "0.875rem"
rounded:
  default: "0 — sheets, frames and buttons are square"
  round: "50% only for the sun, status dots and the hero arrow disc"
spacing:
  page-pad: "clamp(20px, 4vw, 56px)"
  band: "clamp(72px, 10vw, 140px)"
  measure: "68ch"
---

# Forma

## Overview

Forma is a Copenhagen architecture studio whose work starts with where the sun falls. The site is set like a drawing set on warm tracing paper: charcoal ink, hairline rules, title blocks and schedules, with one red for the drafting pen and one yellow for sunlight. Clients reading it are commissioning a building, often from a desk in daylight, so it is light, calm and dense where the facts are.

## Colors

Paper `#efede6` is the ground everywhere except the closing call to action, which inverts to ink. `ink-2` carries secondary text (AA on paper). Red `#b0391f` marks the active nav item, the selected project, sun disc, light-study rays, step numbers and errors (`red-ink` for error text). Sun yellow `#efc85a` appears only where sunlight is drawn: the light patch in the study and the largest fee stage. Selection, caret, scrollbar, focus ring and `accent-color` all come from these tokens.

## Typography

Familjen Grotesk sets headings, navigation, labels, tables, facts and controls in a tight, slightly squared grotesk at weight 500, tracking −0.03em on display sizes. Newsreader sets leads, body and long-form journal text, with italic for the studio's questions, client quotes and pull quotes. Tabular numerals (`.num`) for years, areas, fees and sun readings.

## Layout

Wide asymmetric bands: the page title sits left, the lead sits in the right column. Projects appear either as a register table (the studio's own job list) with a sticky image preview, or as staggered plates. Case pages pair a facts sheet with a narrow prose column and break into full-width photographs. Everything aligns to the same page padding; bands are generous, schedules are tight.

## Components

- Header with wordmark, studio note, nav with red underline for the active route, ink "Start a project" button; below 900px a full-width drop-down menu with `aria-expanded`, Escape and outside-click close.
- Hero title block: a drawing-sheet title block (Project, Place, Type, Year) over the featured photo, swapped by the year/name switcher.
- Light study (signature): SVG section of a real room with the window, overhang and floor depth from `content.ts`; season segmented control, solar-time slider, play/pause, sun altitude, floor reach and a status sentence, all computed for the project's latitude.
- Register table with sortable headers (`aria-sort`), chips with counts, search, Register/Plates toggle, empty state.
- Stage ruler, fee-share bar, schedule tables (facts, materials, awards, people), FAQ disclosures.
- Enquiry form: square fields on `field`, budget radio chips, inline errors that name the fix, loading state, focused success panel with a reference number.
- Footer: newsletter form with validation and success, sitemap, recent work, studio address, the fictional-brand line.

## Motion

One language: an "unfold" — photographs and panels reveal top-down with `clip-path` and settle from 1.04 scale, as a sheet being drawn out of a plan chest (hero, case cover, success panel, mobile menu). The light study animates the sun through the day on play. Hover is limited to the hero arrow rotating and underline colour changes. All of it is removed under `prefers-reduced-motion: reduce`; content is never hidden waiting for JavaScript.

## Do's and Don'ts

- Do keep surfaces square and separated by 1px rules; elevation is never a shadow.
- Do reserve yellow for drawn sunlight and red for the pen; never both on one control.
- Do write in the studio's voice: specific places, sizes, materials, dates.
- Don't add eyebrow labels, icon cards, gradient fills or rounded cards.
- Don't put body text on photographs except the title block, which has its own paper ground.
