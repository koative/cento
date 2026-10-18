---
name: Mentor
colors:
  paper: "#f5f1e8"
  paper-2: "#ebe4d4"
  card: "#fffdf7"
  ink: "#1f2a44"
  ink-soft: "#4a5470"
  rule: "#c3cfe3"
  red: "#c8432b"
  red-ink: "#a8351f"
  yellow: "#f4d94a"
  kraft: "#c9a373"
  sky: "#cbd8ec"
typography:
  display: "Bricolage Grotesque, 650–800, width 85–90%"
  body: "Figtree, 400–700"
  sizes:
    h1: "clamp(2.6rem, 5.4vw + 0.8rem, 5.6rem)"
    h2: "clamp(1.85rem, 2.4vw + 1rem, 3.1rem)"
    lede: "clamp(1.08rem, 0.35vw + 1rem, 1.28rem)"
    body: "1.0625rem / 1.6"
rounded:
  card: 14px
  control: 10px
  input: 8px
  cover: "3px 10px 10px 3px"
spacing:
  gutter: "clamp(1.1rem, 3.6vw, 2.75rem)"
  section: "clamp(4rem, 8.5vw, 7.5rem)"
---

# Mentor

## Overview

The working notebook of a leadership coach. Coaching for new managers happens on video calls with a paper notebook beside the laptop: index cards, worksheets, ruled pages, a navy pen, a red margin rule and a highlighter for the sentence that matters. The visitor is a tired new manager reading on a laptop at lunch or a phone in the evening, so the page is light, warm and quiet, with one bright mark guiding the eye.

## Colors

Off-white paper (`paper`) and a slightly darker desk tone (`paper-2`) carry the page; `card` is the index card and worksheet stock. Navy `ink` is the pen: text, primary buttons, dark bands (podcast, principles, footer). `red` is the index-card rule and margin line, used for 1–2px rules and small labels (`red-ink` when it is text). Highlighter `yellow` marks the one phrase per view that matters, the lowest spokes on the wheel and the closing call to action. `kraft`, `sky` and the ruled card are reserved for programme workbook covers.

## Typography

Bricolage Grotesque, slightly condensed (85–90% width), sets headings, prices, episode numbers and covers; its ink-trap quirks read like a confident, personal voice. Figtree carries body copy, forms and UI. Tabular numerals on every price, date, score and timestamp.

## Layout

A 1260px column with fluid gutters. Pages alternate dense passages (the programme ledger, wheel controls, episode lists) with quiet ones (a single quote, the promise line). Ruled lists with hairline `rule` dividers replace cards as the default container; only the enrol box, application form, wheel sheet and worksheets are raised paper.

## Components

- Highlighter mark: an angled yellow swipe cloned onto each line behind a phrase.
- Index card: red header rule plus blue ruling, used for the hero's next-cohort note.
- Workbook cover: each programme as its printed workbook, with spine shading and a binder tab naming the format.
- Worksheet: ruled card stock with a red margin; thumbnails print the real prompts.
- Binder tabs: the curriculum as index tabs beside a ruled page (ARIA tabs, arrow keys).
- The Manager's Wheel (signature): an eight-spoke SVG wheel scored by clicking rings or with labelled range sliders; the two lowest spokes are highlighted and drive a programme, worksheet and episode recommendation that can be attached to the application.
- Episode player: authored waveform with a seekable range, skip, speed and chapter list.
- Four-step application with a stepper, per-step validation and a review sheet.

## Motion

The hero highlighter draws in once on load; pages fade up on route change; wheel wedges grow from the centre as scores change; curriculum pages wipe in like a turned page; worksheet and cover thumbnails tilt slightly on hover. All of it is removed under `prefers-reduced-motion`.

## Do's and Don'ts

- Do use one highlighter mark per view; it stops working when everything is marked.
- Do keep rules thin (1–2px) and let ruled lists do the structuring.
- Do keep prices, dates and scores in tabular numerals.
- Don't add eyebrow labels above headings or icon-card grids.
- Don't use yellow for text or the red for large fills outside covers.
- Don't add drop-shadow cards to every list; paper is raised only when it is an object you'd hold.
