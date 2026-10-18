---
name: Relay
colors:
  paper: "#efede7"
  surface: "#fbfaf7"
  sunk: "#e4e1d9"
  ink: "#121417"
  ink-2: "#3a3f46"
  ink-3: "#565c64"
  line: "#ccc8bd"
  orange: "#ff5b14"
  orange-deep: "#b23e08"
  night: "#15181c"
  board: "#ffb489"
  ok: "#1b7643"
  bad: "#bd2629"
  rail: "#22509f"
  sea: "#0c6573"
  air: "#6a4e98"
typography:
  display: "IBM Plex Sans Condensed, 600"
  body: "IBM Plex Sans Condensed, 400"
  data: "IBM Plex Mono, 400–600"
  h1: "clamp(2.6rem, 1.5rem + 4vw, 5.25rem) / 0.96, -0.02em"
  h2: "clamp(1.8rem, 1.3rem + 1.7vw, 2.9rem) / 1.04"
  h3: "1.3rem / 1.2"
  label: "IBM Plex Mono 0.72–0.74rem uppercase, +0.04–0.06em"
rounded:
  default: 3px
  large: 6px
spacing:
  wrap: 1320px
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 120px)"
---

# Relay — design

## Overview

Relay's world is the paperwork of a cross-dock: thermal shipping labels, CMR waybills, barcode strips, hub codes and the split-flap departures board above the loading bays. Planners and shippers use it at a desk under office light, scanning dense tables for one exception, so the site is light label-stock paper with carbon ink, and safety orange only where freight is moving or needs action.

## Colors

Warm label-stock paper (`paper`, `surface`, `sunk`) with carbon `ink` in three steps. Safety `orange` is the single action and "in motion" colour (primary buttons, the travelled route, the live marker); `orange-deep` carries orange text and underlines at AA contrast. Modes have their own line colours on the map and tags: road in ink, `rail` blue, `sea` teal, `air` violet. Status uses `ok` green and `bad` red with soft tints. `night` panels host the departures board in amber `board` type and the app sidebar.

## Typography

IBM Plex Sans Condensed for everything spoken — headings at 600 with −0.02em tracking, body at 400 — because a condensed grotesk fits long lane names and table columns the way freight documents do. IBM Plex Mono is reserved for data: shipment numbers, hub codes, times, weights, prices and field labels, always with tabular numerals.

## Layout

A 1320px wrap with fluid gutters. Pages alternate full-bleed paper, sunk and night bands rather than cards. Collections are ruled indexes (services list, hub table, lane lists) with 1.5–2px ink rules on top and hairlines between rows. Detail pages pair a map or photo with a waybill-style fact panel. The `/app` demo swaps the site header for a 252px night sidebar and a denser, card-panelled workspace.

## Components

Waybill (route codes, ETA/service/load/distance grid, barcode, latest scans); authored SVG network map with projected hubs, mode-coded lanes, travelled route and easing marker, keyboard-selectable hubs on `/network`; quote calculator with segmented service control, pallet stepper and live breakdown; departures board; scan-history log with three-letter event tags; mode tags; status pills; ruled spec tables; accessible FAQ disclosures; square 3px buttons with 1.5px ink borders.

## Motion

One language borrowed from the network: the travelled route draws on (`stroke-dashoffset`), the shipment marker eases along it with a soft pulse, and departures-board rows flip in like split-flap tiles. Pages arrive with a short 10px rise. Content is always visible by default; `prefers-reduced-motion: reduce` removes the draw, pulse, flap and page rise.

## Do's and Don'ts

- Do keep orange for action and movement; never as a background tint behind body text.
- Do set every code, time, weight and price in Plex Mono with tabular figures.
- Do structure collections as ruled tables and indexes, not tiles.
- Don't add eyebrow labels, gradient text, glass or decorative shadows.
- Don't draw illustrative scenes; maps, charts, barcodes and route lines are geometry.
- Don't round corners beyond 6px — this is paperwork, not an app store card.
