---
name: Cadence
colors:
  paper: "#f5f2ea"
  paper-2: "#ebe6d8"
  surface: "#fffdf8"
  ink: "#1b2620"
  muted: "#5b665e"
  line: "#dad3c3"
  accent: "#2d5a44"
  accent-soft: "#dce6d5"
  forest: "#1f3b2f"
  beat: "#e07a4c"
  beat-soft: "#f6dccb"
  beat-ink: "#a3441c"
  stages: ["#cdbf9c", "#a9c1a9", "#6f9a7f", "#2d5a44", "#e07a4c", "#1b2620"]
typography:
  display:
    {
      family: Outfit,
      weight: 500,
      size: "clamp(2.6rem, 1.5rem + 4.4vw, 5.25rem)",
      tracking: "-0.035em",
    }
  h1:
    {
      family: Outfit,
      weight: 500,
      size: "clamp(2.25rem, 1.55rem + 2.9vw, 4rem)",
      tracking: "-0.025em",
    }
  h2:
    {
      family: Outfit,
      weight: 500,
      size: "clamp(1.75rem, 1.3rem + 1.7vw, 2.75rem)",
    }
  body: { family: Outfit, weight: 400, size: "1.0625rem", lineHeight: 1.6 }
rounded: { control: "999px", field: "10px", card: "14px", feature: "18px" }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    section: "clamp(4rem, 8vw, 7.5rem)",
    wrap: "1240px",
  }
---

## Overview

Cadence is hiring software for teams without a recruiter: bakery groups, clinics, workshops. The world is the hiring loop as a measured rhythm. Interview steps are beats on a day grid, stages rise like bars in a measure, and the logo is four beats with the accented one in apricot. Daylight paper and deep sage, because the people using it sit at an office desk or stand at a counter between shifts, not in a dark room.

## Colors

Warm paper and an off-white surface carry everything. Deep sage (`accent`) marks actions and progress. Apricot (`beat`) is the rhythm colour, used sparingly: the accented logo beat, interview blocks on the loop timeline, today's next step, the moved-card flash. Pipeline stages have their own cool-to-warm scale, from sand (Applied) to apricot (Offer) and ink (Hired), and that scale is reused in the stage strip, board column rules, stage tags and charts. Forest and ink bands hold the composer, the featured story and the closing call to action.

## Typography

Outfit only, as assigned: 500 for headings with tight tracking (−0.025 to −0.035em), 300 for long quotes, 400/500 for body and UI. Numerals are tabular in tables, charts, times and prices.

## Layout

A 1240px wrap with fluid gutters. Home alternates scale and density: a two-column hero with the live board, a six-column stage strip, the dark composer band, split feature sections, a full-bleed photo story, a three-column ruled list, story rows, a quiet centred pricing line and an ink close. The `/app` demo has its own shell: a sticky 264px sidebar on desktop, a top bar with a scrolling tab row below 900px.

## Components

Pill buttons and chips; segmented radios for pace and billing; ruled definition lists instead of icon cards; the loop timeline (shared by the composer, product page, customer stories and job pipelines); scorecard sample with four-step rubric scale; message thread; SVG bar chart and stage bars; pipeline board with move buttons; sortable data table; rubric radio cards in the interview kit.

## Motion

One page-enter (fade and 10px rise, exponential ease-out). The signature motion is the loop timeline: beats grow from the left in sequence and slide to new days when the role, competencies or pace change. Moved board cards land with a brief apricot flash. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep apricot rare; it means "this is happening on the beat".
- Do keep the stage colour scale consistent wherever a stage appears.
- Do write candidate-facing copy in plain, warm language.
- Don't add eyebrow labels, icon-card grids or decorative gradients.
- Don't show scores before every interviewer has submitted; the UI enforces the product's fairness promise.
