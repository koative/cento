---
name: Chapter
colors:
  paper: "#f1ece1"
  paper-deep: "#e7e0d0"
  paper-light: "#faf7f0"
  ink: "#1c2b55"
  ink-soft: "#4f5b78"
  red: "#a8361a"
  night: "#121a35"
  amber: "#e8a23b"
  show-moss: "#3f5e33"
  show-ochre: "#d0a83f"
typography:
  display:
    {
      family: Epilogue,
      weights: "650–800",
      h1: "clamp(2.6rem, 1.6rem + 4.2vw, 5.75rem)",
      h2: "clamp(1.75rem, 1.3rem + 1.8vw, 2.85rem)",
      tracking: "-0.02em to -0.035em",
    }
  body:
    {
      family: Lora,
      size: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
      line-height: 1.6,
      italic: "guests, captions, pull quotes",
    }
rounded: { cover: 4px, photo: 6px, panel: 14px, control: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4.5rem, 3rem + 6vw, 8rem)",
    wrap: 1320px,
  }
---

## Overview

Chapter is a podcast network run like a small literary press: a cream catalogue page with blue-black ink, a red pencil for corrections, and every show issued with its own jacket. Listeners browse on a phone in the evening and read show notes in daylight, so the site is a light, paper-and-ink reading surface; the player is the one night-coloured object on it, like the studio desk lamp left on.

## Colors

Paper `#f1ece1` and ink `#1c2b55` (11.7:1) carry everything. Red pencil `#a8361a` marks active nav, errors, the wordmark dot and the playing state (5.6:1 on paper). Night `#121a35` is reserved for the player, the mini player, the estimate panel and the newsletter band, with amber `#e8a23b` for played audio and the current chapter. Each show owns one jacket colour (moss, ink, night, ochre, red, paper-deep) used on its cover and show-page hero.

## Typography

Epilogue for everything that is a label, a title or a number: headings at 750–800 with tight tracking, UI at 550–650, tabular numerals for timestamps, durations and estimates. Lora for reading: show descriptions, chapter notes, letters; Lora italic for guests, captions and quotes. Body measure is held at 58–70ch.

## Layout

A 1320px wrap with fluid gutters. Lists are ruled like a contents page: one strong ink rule under a section title, hairlines between rows. Home alternates density: a two-column hero with the newest episode's chapters, a six-cover shelf, a dense episode list, a full-bleed photo spread, a single pull quote, the making-of, portraits, a dark newsletter band, a one-line advertiser strip, a big close.

## Components

- **Cover**: square SVG jacket per show — one geometric motif (contours, struck-through drafts, a clock arc, a survey crosshair, two plates, a stave) plus the title set in Epilogue 800 and the `chapter.` imprint.
- **EpisodeRow**: mini cover, show · season · date, title, guest line, length or time left with a progress hairline, save and play.
- **ChapterPlayer** (signature): a waveform that dips at chapter breaks, numbered chapter marks, a playhead and an invisible native range input for scrubbing; skip 15/30, speed 1–2×, save; a chapter list whose rows fill as you listen and start playback from their timestamp.
- **Dock**: a night bar fixed to the bottom once something is loaded, with the current chapter in amber and a progress line along its top edge.
- **Forms**: Epilogue labels, paper-light fields, red inline errors that say how to fix the value, ink success panels announced politely.

## Motion

Pages rise 10px into place. Covers lift and tilt slightly when hovered, like a book pulled from a shelf. The playhead, played bars and chapter fills advance with a linear one-second transition matching the timer; the dock slides up once. Everything collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep the night colour for audio; the rest of the site is paper.
- Do write chapter titles and notes for every episode — the player depends on them.
- Do give every new show a jacket colour with AA contrast against its own title colour.
- Don't add eyebrow labels, stat rows or card grids; use rules and type.
- Don't put more than one dark band per page besides the player.
