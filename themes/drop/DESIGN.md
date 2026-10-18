---
name: Drop
colors:
  paper: "#ecebe6"
  paper-2: "#dfddd5"
  card: "#f6f5f1"
  ink: "#121212"
  ink-2: "#4a4843"
  night: "#121212"
  on-night: "#ecebe6"
  on-night-2: "#b4b2ab"
  signal: "#ff5a1f"
  error: "#b3261e"
typography:
  display:
    family: Rubik Mono One
    sizes: "clamp(1.75rem, 0.9rem + 4.6vw, 5.25rem) h1; clamp(1.35rem, 1.05rem + 1.3vw, 2.1rem) h2; countdown digits up to 3.6rem"
  body:
    family: Inter Tight
    sizes: "1.0625rem body, 1.25rem lead, 0.8125rem small; labels 0.7–0.78rem uppercase +0.08em"
rounded: "0 everywhere; the ticket notches and nothing else are round"
spacing: "gutter clamp(1rem, 0.5rem + 2.4vw, 2.5rem); sections clamp(3rem, 2rem + 3vw, 5.5rem); max width 1400px"
---

## Overview

Drop is built from the paper of a drop day: the release flyer, the hang tag, the raffle stub and the size sticker. Visitors are mostly on a phone, often outside in daylight and queueing or refreshing at 10:59, so the site is light newsprint with hard ink rules, and the one dark band is the countdown to the next drop. Hi-vis signal orange marks anything time-critical: the next drop, open raffles, the selected option.

## Colors

Paper and ink carry everything. Signal orange is a surface colour only (buttons, the ritual band, tickets, drop days), always with ink text on it, never orange text on paper. Night (#121212) frames the hero, close and footer, where orange can be used as text. Secondary text is a warm grey (#4a4843, 7:1 on paper). Errors use a brick red with a square marker.

## Typography

Rubik Mono One, uppercase, for headings, drop names, prices on the product page and countdown digits; its monospaced figures keep the clock from jittering. Inter Tight for everything else, with tabular numerals on prices, stock and tables. Small uppercase labels belong to data cells (spec sheets, tickets, legends), never above headings.

## Layout

A 2px ink rule is the structural unit: section heads sit on a rule, spec sheets and calendars are ruled grids, and lists are ruled rows. Product imagery is a set of authored technical flats on grey plates, recoloured per colourway, with front and back views. Photography is reserved for people and place (lookbook, drop heroes, the shop).

## Components

Header with the next-drop pill (number, name, live countdown) and bag count; announcement bar. Countdown split clock. Product card with status tag (drops date, raffle only, last few, sold out). Size grid with stock and a slash through sold-out sizes. Care label with barcode SKU. Raffle ticket with perforated stub and notches. Drop rows with date block, month calendars with drop days. Ruled disclosures, size tables, receipt with barcode.

## Motion

The roller shutter: each page's top block opens under ink slats that roll up, like the shop door at noon. Countdown digits tick down into place. The raffle ticket prints out of a slot and its stub tilts away; the receipt prints the same way. Hover lifts flats a few pixels. All of it is off under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep orange as a surface with ink on it; do keep corners square.
- Do put every time in store time with the ET label, and every number in tabular figures.
- Don't add soft shadows, rounded cards or gradients; elevation is a rule, not a shadow.
- Don't use photographs as product shots; products are flats so colourways stay exact.
- Don't add eyebrow labels above headings; dates and numbers live in the spec cells.
