---
name: Cohort
colors:
  paper: "#f3eee2"
  paper-deep: "#e7dfcb"
  stock: "#fbf8f1"
  ink: "#1b1a16"
  ink-2: "#4b463c"
  ink-3: "#625a4c"
  rule: "#cbc1ab"
  line: "#8c8170"
  accent: "#1e5a40"
  accent-deep: "#143f2d"
  accent-soft: "#7fa58f"
  angels: "#6e634d"
  error: "#9b2f1d"
typography:
  display:
    family: Libre Caslon Display
    sizes: "h1 clamp(2.7rem → 5.6rem), h2 clamp(2rem → 3.4rem), h3 clamp(1.4rem → 1.85rem)"
  body:
    family: Geist
    sizes: "body 1.0625rem/1.6, lede clamp(1.1rem → 1.3rem), meta 0.8125–0.875rem, tabular numerals in tables and figures"
rounded:
  controls: 2px
  chips: 999px
spacing:
  gutter: "clamp(1.25rem, 0.5rem + 3vw, 3rem)"
  section: "clamp(4rem, 2.8rem + 4.5vw, 7.5rem)"
  wrap: 1240px
---

# Cohort — design notes

## Overview

Cohort is set like the financial press that announces its deals: the **tombstone**, a centred, double-ruled notice that "appears as a matter of record only", on cream stock with Caslon headlines. Venture is a business of letters, memos and term sheets read by founders on a laptop late in the day, so the site is light, quiet and typographic, and every company it shows is a printed record rather than a logo tile. Photographs are of what the portfolio actually works on — cranes, furrows, turbines, wafers — because the firm's thesis is the physical economy.

## Colors

Warm paper (`paper`) with a whiter `stock` for the things that are "printed": tombstones, the memo, the term sheet, the modeller result. Ink is near-black with two warm secondary greys that keep AA contrast on paper. A single engraving green (`accent`) marks the active state, figures that matter (founders' remaining ownership, Cohort's share) and focus; `accent-soft` and `angels` exist only to separate cap-table holders. Closing calls to action invert to ink.

## Typography

Libre Caslon Display carries every heading, company name, pull quote and figure readout; it is never set below ~1.25rem. Geist carries body, controls and data, with `tabular-nums` on amounts, percentages, years and tables. Small uppercase labels with 0.1em tracking are reserved for table and fact headers, as in a ledger.

## Layout

A 1240px column with fluid gutters. Hairline rules (`rule`) separate rows; ink rules open sections and groups. Home moves from the hero (headline + four latest tombstones) through the domain rows, a dense ledger table, a quiet single quote, the ten-day timeline, the modeller on a deeper paper band, the roster, writing and an ink close. Lists and detail pages use two-column splits that collapse under 900px; the hero's tombstones become a horizontal snap row on phones.

## Components

- **Tombstone** — amount, short rule, Caslon name, one-liner, round + role, date; 1px border with an inset outline 6px in. Used for portfolio cards, company round history and the pitch confirmation.
- **Ledger** — portfolio table with tabular figures; columns drop to company/class/stage under 760px.
- **Round modeller** (signature) — four range sliders and a "who pays for the pool" choice drive stacked ownership bars before/after the round and a holder table; arithmetic lives in `lib/round.ts`.
- **Investment memo** — To/From/Re header block on company pages.
- **Filters** — search field, pill chips with `aria-pressed`, native selects, tombstone/ledger view toggle, live result count and an empty state.
- **Forms** — labelled fields on `stock`, inline errors that name the fix, error summary, disabled "Sending…" state, focused confirmation.
- **FAQ** — native `details/summary` with a rotating chevron.

## Motion

Pages rise 10px and fade in on route change. The hero tombstones settle from a slight blur in sequence, like ink setting. Tombstone links lift with a soft offset shadow on hover; the cap-table segments glide when inputs change; the mobile menu opens with a clip-path wipe. `prefers-reduced-motion: reduce` removes all animation and transitions.

## Do's and Don'ts

- Do present companies as records — amount, round, role, date — and keep figures tabular.
- Do keep one accent; green means "this matters" or "you are here".
- Do use real subject photography of the work, desaturated slightly to sit on paper.
- Don't add logo grids, stat rows or icon cards; the tombstone and the ledger carry the portfolio.
- Don't set Caslon Display small or bold; it has one weight and wants size.
- Don't round corners beyond 2px except on filter pills.
