---
name: Ember
colors:
  paper: "#f5ead6"
  paper-2: "#ecdcc0"
  card: "#fbf5ea"
  ink: "#2a1712"
  ink-2: "#5c3f33"
  tomato: "#b3301f"
  tomato-dk: "#8c2214"
  char: "#1f1511"
  on-char: "#f3e5cf"
  ember: "#f08a4b"
typography:
  display:
    {
      family: "Young Serif",
      sizes: "h1 clamp(2.5rem…5.25rem), h2 clamp(1.9rem…3.1rem), dish names 1.2–1.4rem",
    }
  body: { family: "Work Sans", size: "1.0625rem / 1.6", weights: "400–700" }
rounded:
  arch: "50% 50% 12px 12px / 36% 36% 12px 12px"
  card: 14px
  ticket: 4px
  control: 999px
spacing:
  gutter: "clamp(1.1rem … 3rem)"
  section: "clamp(4rem … 8.5rem)"
  max-width: 1320px
---

## Overview

Ember is a forty-seat restaurant built around one oak-fired oven, so the site is built from the things on its pass: a printed bill of fare on buttercream card, the tomato red of the menu headings, the charcoal of the oven band, and the kitchen ticket. Guests check it on a phone before heading out or on a laptop when booking, mostly in warm evening light, so the world is light paper with one dark, glowing section where the fire lives.

## Colors

Buttercream `paper` is the ground; `paper-2` marks quieter bands (planner teaser, suppliers). `ink` is a warm near-black brown; `ink-2` carries secondary text at better than 7:1. `tomato` is the single accent — menu section heads, prices on dish pages, primary buttons, focus rings, selection. `char` with `on-char` and `ember` is reserved for the oven band and the footer.

## Typography

Young Serif carries every heading, dish name, price and logo, the way a restaurant's printed menu would. Work Sans handles reading text and interface at 1.0625rem. Numbers in prices, totals and hours use tabular lining numerals. Tracking never goes tighter than −0.025em.

## Layout

A 1320px column with fluid gutters. Pages alternate dense, ruled passages (menus, event rows, tables) with quieter split sections. Photos sit in an oven-mouth arch — the same shape as the logo — or in plain 14px frames for food close-ups. Menus are a single printed column with dotted price leaders beside a sticky ticket; below 960px the ticket becomes a bottom bar that opens as a sheet.

## Components

Header with wordmark and arch mark, nav with sliding tomato underline, mobile disclosure menu. Printed dish rows (name, diet marks, leader, price, add-to-table). The ticket: perforated top edge, guest stepper, lines with steppers, totals and per-head, course-by-course advice. Event rows led by a large date. Time-slot radio grid with tables-left counts and struck-through full slots. Ruled tables for spaces, suppliers and hours. Set-feast menus typeset centred like a printed card. FAQ as native disclosures with drawn plus/minus.

## Motion

One page transition: content warms in (fade and 10px rise, exponential ease-out). Ticket lines stamp in with a brief tomato flush when added; the open-now dot glows gently while the kitchen is open. Arrows nudge on hover. All animation and transitions are removed under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep tomato for the one thing that matters in each view.
- Do write in the restaurant's voice: specific suppliers, times, temperatures.
- Do reuse the arch for photographs of the place, not for UI.
- Don't add cards around menu items; the menu is paper, not a grid of tiles.
- Don't introduce a second accent or gradients; the fire photos carry the warmth.
- Don't put labels above headings.
