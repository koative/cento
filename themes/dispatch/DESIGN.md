---
name: Dispatch
colors:
  paper: "#f1efe9"
  paper-2: "#e6e2d8"
  field: "#faf9f5"
  ink: "#1c1b19"
  ink-2: "#4f4b45"
  ink-3: "#67625a"
  rule: "#cfc9bc"
  edge: "#8a8478"
  accent: "#b2361e"
  accent-soft: "#f08a6f"
  blue: "#2c4d72"
  night-paper: "#17181c"
  night-ink: "#e6e2d8"
  night-accent: "#ef8a6c"
typography:
  display:
    {
      family: "Petrona",
      weights: "700–800, italic 400/800",
      sizes: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem) display; 1.35–3.4rem headings",
    }
  body:
    {
      family: "Inter Tight",
      weights: "400–700",
      sizes: "1.0625rem UI body, 0.875rem meta",
    }
  reading:
    {
      family: "Petrona",
      sizes: "1.125 / 1.25 / 1.4375rem selectable, line-height 1.65, 34em measure",
    }
rounded: { control: "4px", segmented: "999px", inbox: "6px" }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    section: "clamp(2.75rem, 5.5vw, 4.5rem)",
    container: "1160px",
    reading: "42.5rem",
  }
---

## Overview

Dispatch is a single writer's Sunday letter about infrastructure, so the site is built from correspondence: a masthead closed by a double rule, issue numbers that carry real sequence, a circular postmark stamped with each letter's number and date, perforated (dashed) strips for sponsor slots, and a calm off-white sheet for reading. Readers open it on a phone over Sunday coffee or at a desk in daylight, so the default is light paper, and the reader offers its own night mode for evening reading.

## Colors

Warm grey paper and near-black ink do almost all the work. Postmark red (`accent`) is reserved for the stamp, the progress line, focus rings, selection, sidenote numbers and errors. Airmail blue marks Field Notes (the paid stream) in lists and in the delivery calendar. Night reading swaps every token under `:root[data-theme="night"]` while a letter is open; the stamp switches from multiply to screen blending.

## Typography

Petrona is the voice: bold for headlines, italic for deks, opening lines, quotes and the sign-off, regular for the letter text at a 34em measure. Inter Tight handles navigation, labels, metadata and forms. Numerals in issue numbers, dates, prices and the calendar are tabular. Tracking never goes below −0.03em.

## Layout

A 1160px container whose borders align to the content edge; letters read in a 42.5rem column with sidenotes hung in the right margin from 1240px and folded into tap-to-open notes below it. Home alternates density: a two-column hero, a quiet single-paragraph opening, a dense issue index, a two-column topic list, a full-bleed photograph, the four-stop delivery route, an asymmetric reader-reply block, the writer, a perforated sponsor strip and an ink closing band.

## Components

- Postmark (SVG): ring text with issue number and year, day and month in the centre, wavy cancel lines. Used on the latest letter, every post header, success states and the 404.
- Post row: issue number, title and dek, topic/date/length, optional thumbnail; Field Notes flagged with a lock and blue number.
- Reader bar: sticky, with back link, minutes left, text size radio group, night toggle and a red progress line.
- Delivery calendar (signature): plan tabs, next month's grid with shape-coded marks per email type, per-type totals, and an inbox preview of the selected day.
- Slot picker: open/booked Sundays as checkbox tiles feeding a live booking summary with bundle discount.
- Forms: visible labels, inline errors that name the fix (including email typo suggestions), loading labels, focused success cards with a "received" postmark.

## Motion

Pages arrive like a sheet drawn from an envelope (a short rise revealed from the top edge). Postmarks land like a rubber stamp: scale down from 1.25 with a brief blur. Sidenotes, inbox rows and success cards unfold. The mobile menu drops in with a clip-path. Everything is visible by default, and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do keep red for stamps, focus and errors; use blue only for the paid stream.
- Do write issue numbers, datelines and minutes from real data in `content.ts`.
- Do keep sponsor content inside dashed, clearly labelled strips.
- Don't add eyebrow labels above headings; the postmark and meta lines carry context.
- Don't box content in cards; use rules, columns and whitespace.
- Don't set long text in Inter Tight; letters are always Petrona.
