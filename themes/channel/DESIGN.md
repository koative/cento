---
name: Channel
colors:
  night: "#141210"
  deep: "#0e0c0b"
  plate: "#1d1a17"
  plate-2: "#27231f"
  line: "#3a342e"
  chalk: "#f3eee5"
  dim: "#b5ac9e"
  spark: "#ff7a2e"
  marker: "#ffd84a"
  arc: "#7fd3ff"
  oxide: "#8a3b22"
typography:
  display: { family: "Paytone One", sizes: "1.05rem – 6rem, clamp()" }
  body: { family: "Nunito", weights: "400–900", size: "1.0625rem / 1.6" }
rounded: { thumb: 12px, card: 14px, panel: 20px, controls: 999px }
spacing:
  { gutter: "clamp(1rem, 4vw, 3rem)", section: "clamp(3.5rem, 8vw, 6.5rem)" }
---

## Overview

A fabrication creator's site at night: warm graphite like a garage lit by one work lamp, with the video thumbnail as the main unit. Fans watch on a TV or a phone in the dark, so the site is dark and the colour comes only from the shop itself: spark orange, paint-marker yellow, arc-welder blue and soapstone white. The name is the steel profile, and the C-channel cross-section with a play triangle is the mark.

## Colors

`night` is the page, `plate`/`plate-2` are surfaces, `line` is the only border colour. `spark` is the single action colour (buttons, progress, timestamps). Each series owns a caption tone — Saved from Scrap `marker`, Ten-Dollar Steel `spark`, Shop Upgrades soapstone `chalk`, Ask the Grinder `arc` — used on thumbnail captions, filter chips and series headings. The membership band inverts to dark-on-spark. Selection, caret, scrollbar and focus ring (`marker`) all come from the palette.

## Typography

Paytone One carries headings, prices and the painted thumbnail captions (uppercase, dark stroke via `paint-order`, a −2° tilt, sized in container units so the caption scales with the frame). Nunito 600–900 handles body, titles in cards and interface. Times, prices and counts use tabular numerals.

## Layout

12-ish column feel on a 1320px wrap. Home opens with the headline beside the newest episode, then alternates dense rows (video grid, series shelf rows with fanned thumbnails, schedule) with quiet full-bleed bands (manifesto, membership, close). Pages stack to one column under 960px; the hero video moves above the headline on mobile so the product is in the first viewport.

## Components

Thumb (caption, duration badge, saved watch progress), VideoCard, ProductCard over flat SVG merch mockups that recolour per variant, the Player, chips with `aria-pressed`, pill buttons, segmented billing toggle, disclosure FAQ with a CSS chevron, form fields with inline errors, sticky summaries.

## Motion

One language borrowed from the player: route changes run a spark-orange load bar across the top and lift the page in; the chapter card wipes in with a clip-path on every chapter change; the stage slowly drifts while "playing". Hover fans the series thumbnails and tilts mockups. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep captions short and loud, like real thumbnails; two or three words.
- Do label demo figures and the demo player honestly.
- Don't add new accent colours; borrow from the shop or don't.
- Don't use icon tiles or stat rows; data goes in tables and bars.
- Don't put the caption treatment on body headings; it belongs to thumbnails, series and the 404.
