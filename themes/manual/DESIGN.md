---
name: Manual
colors:
  paper: "#f5f3ee"
  paper-2: "#ebe8df"
  sheet: "#fffdf9"
  ink: "#16181d"
  ink-2: "#464a53"
  ink-3: "#62666f"
  rule: "#d9d5ca"
  signal: "#c2410c"
  signal-ink: "#9a330a"
  ok: "#2f8a5c"
  minor: "#d08a10"
  major: "#c0392b"
  maint: "#3b62b5"
typography:
  display: "Source Sans 3, 700, clamp(2.35rem → 4.4rem), tracking -0.03em"
  body: "Source Sans 3, 400, 1.0625rem / 1.6"
  data: "Source Code Pro, 500 — article numbers, keycaps, timestamps, uptime figures"
rounded:
  control: 4px
  sheet: 10px
  pill: 999px (chips and status only)
spacing:
  section: "clamp(3.5rem → 6.5rem)"
  wrap: "1240px max, clamp(1rem → 2.5rem) gutters"
---

## Overview

Manual is the printed equipment manual brought online: off-white paper, black ink, one spot colour, chapter numbers that never change and a thumb index down the fore-edge. The people who open it are shop staff stuck mid-shift, often on the register's own tablet in a bright shop, so it is light, high-contrast and search-first, and every answer is addressable by number (“article 2.2”) the way support says it on the phone.

## Colors

Paper `#f5f3ee` and ink `#16181d` carry everything. Signal orange `#c2410c` is the manual's spot colour: chapter tabs, article codes, the current troubleshooter step and primary buttons. Status colours (ok green, minor amber, major red, maintenance blue) appear only on status surfaces. Callouts use washes (note yellow, tip green, caution orange), never coloured side borders.

## Typography

Source Sans 3 is display and body: bold, tight headings and an easy reading face for steps. Source Code Pro is used only for data — article codes, keycaps, timestamps, uptime percentages, decline codes and step counters — never as decoration.

## Layout

A 1240px wrap. Lists, tables and tables of contents are ruled with a 2px ink top rule and 1px hairlines, like a printed index. Article pages are a white sheet between a chapter sidebar and an “On this page” rail. Chapter, article and contents pages carry a fixed thumb index on the right edge with the open chapter pulled out in signal orange (hidden below 1180px).

## Components

- Instant-answer search combobox (arrow keys, Enter opens, highlighted matches).
- Troubleshooter: a flowchart spine where every answer is pinned with a Change button; fixes link to the article, dead ends hand the answers to the support form.
- Callouts (note, tip, caution), numbered steps with ink square counters, keycaps, SVG figures with numbered leader callouts.
- Status: 90-day uptime bars in SVG with per-day titles, incident cards and update timelines.
- Forms: labelled fields, inline errors naming the fix, loading and success states.

## Motion

Pages fade up 8px on enter. The troubleshooter is the authored moment: the newest connector draws down the spine and the next step unmasks from the top. Dropdowns and the mobile menu drop in. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do number articles and keep the numbers stable; support reads them aloud.
- Do name UI labels in bold exactly as the app shows them.
- Don't add eyebrow labels, icon-card grids or coloured side borders.
- Don't use monospace for prose; keep it for codes, keys and figures.
