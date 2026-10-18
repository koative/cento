---
name: Conduit
colors:
  bg: "#111413"
  surface: "#171b19"
  surface-2: "#1e2320"
  code: "#0c0f0e"
  line: "#2b322e"
  line-strong: "#3d4741"
  ink: "#e7ece5"
  ink-2: "#b0b9b2"
  ink-3: "#8d978f"
  signal: "#b8f27c"
  on-signal: "#13230c"
  wire-amber: "#f2b84b"
  wire-cyan: "#72d4e6"
  wire-coral: "#ff8a78"
  wire-violet: "#bba6f8"
  wire-sand: "#dcc9a0"
  wire-blue: "#8aaef8"
  wire-steel: "#a9b8b0"
typography:
  display:
    fontFamily: "Bai Jamjuree"
    weights: [500, 600, 700]
    h1: "clamp(2.4rem, 1.5rem + 3.1vw, 4.4rem) / 1.02, -0.03em"
    h2: "clamp(1.6rem, 1.2rem + 1.3vw, 2.4rem) / 1.1, -0.02em"
  body:
    fontFamily: "Golos Text"
    size: "1rem / 1.6"
    lede: "clamp(1.08rem, 1rem + 0.35vw, 1.25rem)"
  code:
    fontFamily: "ui-monospace stack"
rounded:
  sm: 6px
  md: 10px
  lg: 14px
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 112px)"
  max: 1240px
---

# Conduit

## Overview

A graphite patch panel with colour-coded cable. Integration work is wiring: ports, runs, junctions and a log of what passed through. The site is dark because its visitors are engineers at a desk with an editor and terminal open, and the console in the hero should sit naturally next to them. One signal lime marks the live path; every other colour is a cable code that carries meaning (connector category).

## Colors

Graphite neutrals tinted slightly green (`bg`, `surface`, `surface-2`, `code`). `signal` lime is the only action and live-state colour (primary buttons, the route packet, the trunk line, the closing band). Eight wire colours code connector categories — Payments amber, Commerce lime, CRM violet, Messaging cyan, Accounting sand, Shipping coral, Data blue, Protocols steel — and appear on port marks, patch-bay cables and console upstream bars. Status reuses them: lime ok, amber degraded/4xx, coral failure/5xx.

## Typography

Bai Jamjuree's squared terminals read like equipment labelling; it sets headings, navigation, buttons, table headers and diagram labels. Golos Text carries body copy for its calm, wide-open forms at small sizes. Monospace appears only for code, paths, ids and JSON. Tabular numerals on every figure.

## Layout

1240px max with fluid gutters. Pages alternate plain and `surface` bands bounded by 1px rules. Dense passages (connector rows, pipeline, comparison tables) sit next to quiet ones (single large quote, the closing band). Lists are rows with hairlines, not card grids; panels exist only for working tools (console, facts box, tiers, dashboard panels).

## Components

- **Request console** (signature): connector/action/provider behaviour/retry selects, JSON body editor with live validation, a four-station route with a moving packet, a growing timing waterfall per phase (auth, transform, upstream tries, backoff), response/headers/cURL tabs with copy, and history. Compact variant in the hero and on each connector page.
- **Patch bay**: authored SVG of eight connector ports cabled into Conduit and one trunk to "Your app"; ports link to connector pages. Separate wide and tall geometries.
- **Port mark**: two-letter code on a tile tinted with its category wire colour.
- **Uptime bars**: 90 SVG day-bars whose incident density follows the stated uptime.
- Dashboard: KPI strip, focusable SVG traffic bars, sortable table with `aria-sort`, live log tail with pause, key reveal/rotate with inline confirm.

## Motion

One language: signal travelling along a wire. Patch-bay cables carry a short dash pulse; the console packet moves station to station with an exponential ease while waterfall bars grow from the left; pages arrive with a 10px rise. Under `prefers-reduced-motion` pulses are removed, the console resolves instantly and transitions collapse.

## Do's and Don'ts

- Do use wire colours only to encode connector category or status.
- Do keep lime for live state and the primary action.
- Do keep JSON, paths and ids in monospace; never use mono as decoration.
- Don't add eyebrow labels, icon-card grids or gradient text.
- Don't use thick coloured side borders for active states; use text colour and surface.
