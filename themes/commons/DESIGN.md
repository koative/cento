---
name: Commons
colors:
  paper: "#f2efe6"
  paper-2: "#e7e6d9"
  paper-3: "#d9d8c7"
  ink: "#2b3127"
  ink-2: "#51584a"
  accent: "#b4492a"
  accent-hover: "#983a1f"
  straw: "#d9d8b0"
  sand: "#e6baa1"
  sage: "#b6c8a2"
  board: "#283024"
  board-3: "#424c3b"
  board-ink: "#f2efe6"
  board-dim: "#b5baa8"
  lamp: "#a9d68c"
  booked: "#8c4a33"
typography:
  display:
    fontFamily: Parkinsans
    fontSize: clamp(2.6rem, 1.6rem + 4.4vw, 5.6rem)
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.035em
  headline:
    fontFamily: Parkinsans
    fontSize: clamp(1.9rem, 1.4rem + 2.2vw, 3.25rem)
    fontWeight: 600
    letterSpacing: -0.03em
  body:
    fontFamily: Parkinsans
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Parkinsans
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.1em
rounded:
  sign: 6px
  card: 14px
  chip: 999px
spacing:
  gutter: clamp(1.25rem, 4vw, 3rem)
  section: clamp(4rem, 3rem + 4vw, 7.5rem)
  max-width: 1360px
---

# Commons — design notes

## Overview

Commons is drawn from the building itself: the architect's floor plan pinned by the front door, the dark enamel directory board in the lobby, the room board outside the meeting rooms and the warm brick-and-timber interiors of old industrial buildings. Coworking is chosen on a laptop in daylight, often at a desk, so the site is light paper with olive-black signage plates and one terracotta accent, like the door frames and booking lamps.

## Colors

Warm paper (`paper`) carries the page; `paper-2` is the plan-room band and form panel. Text is olive-black `ink` with `ink-2` for secondary copy (≥ 6:1 on paper). `accent` terracotta is reserved for primary actions, links and the "picked" edge on the room board. The three zone tones (`straw`, `sand`, `sage`) come from the original plan drawing and colour spaces on floor plans, tags and swatches. The dark `board` family is used only for signage: today's desk status, the member directory, the room board, the front-desk hours and the footer; `booked` and `lamp` are the board's busy and open signals.

## Typography

Parkinsans throughout, a rounded geometric sans that reads like wayfinding lettering. Display at weight 600 with −0.035em tracking, body at 400 with a 65–70ch measure. Small uppercase tracked labels appear only on the plans and table headers, never above headings. All tables, times and prices use tabular numerals.

## Layout

A 12-column grid at 1360px max with fluid gutters. Pages alternate dense passages (room board, comparison table, directory) with quiet ones (statement, single quote). Lists are ruled rows with a 2px ink top rule rather than card grids; cards are kept for priced plans, the booking panel and pinned notices. Below 900px every split collapses to one column; the room board and comparison table scroll horizontally inside their own containers with a sticky room column.

## Components

- **Floor plan** (`FloorPlan.tsx`): authored SVG per house from `content.ts` rectangles; zones get desk rows, rooms get a table and chairs, booths get pods, plus a door swing at the entrance. Clicking a space selects it; a tab list beside it gives keyboard access.
- **Room board** (`RoomBoard.tsx`): the signature. Rooms down the side, 8:00–20:00 in half hours; free, booked, passed, picked and booked-by-you states; arrow keys move between free slots with a single tab stop. Group size dims rooms that are too small on both board and plan.
- **Signs**: dark plates (`.sign`) with live desk-status lamps computed from each house's staffed hours.
- **Event row**, **city map**, **notice board** (slightly rotated pinned cards), **FAQ** on native `<details>`.
- Forms share one `Field` component with inline errors that name the fix, loading labels on submit and `aria-live` confirmations.

## Motion

One page arrival: a 0.6s rise with a clip opening from the hinge side, like a door. Plan spaces fade their fill on selection; board picks settle with a short vertical scale; confirmations arrive with a small clip reveal. Everything is visible by default, and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep signage dark and everything else paper; one dark plate per screen region at most.
- Do draw spaces as plans and data as boards or tables before reaching for a card.
- Do keep the accent for actions and the picked state only.
- Don't add eyebrow labels, section numbers or icon-card rows.
- Don't put the zone tones on text; they are fills for spaces and tags.
- Don't set tracking tighter than −0.035em or display type above 5.6rem.
