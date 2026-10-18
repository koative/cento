---
name: Fixture
colors:
  paper: "#f4f2ec"
  paper-2: "#e9e5da"
  sheet: "#fffdf8"
  ink: "#141c2a"
  ink-2: "#485062"
  rule: "#d6d0c3"
  navy: "#13213a"
  on-navy: "#eef1f6"
  live: "#f5c02e"
  copper: "#a1441b"
  canary: "#fbf0bf"
  canary-rule: "#ddca7c"
  stamp: "#b3261e"
  error: "#b42318"
typography:
  display:
    family: Roboto Slab
    weights: [600, 700, 800]
    h1: clamp(2.5rem, 1.5rem + 3.8vw, 4.75rem)
    h2: clamp(1.75rem, 1.25rem + 1.8vw, 2.75rem)
  body:
    family: Roboto
    size: 1.0625rem / 1.6
rounded:
  base: 6px
spacing:
  gutter: clamp(1rem, 4vw, 2.5rem)
  section: clamp(4rem, 8vw, 6.5rem)
---

# Fixture

## Overview

A trade contractor's paperwork and van livery: warm off-white paper, navy from the vans, hi-vis yellow for the things you press, copper for plumbing and the canary carbon-copy work-order pad technicians hand you at the door. Homeowners arrive on a phone, often mid-problem in a basement or utility room, so the site is light, high-contrast and puts the emergency number, a price and a booking button within one thumb's reach.

## Colors

Paper and ink carry the page; navy is reserved for the emergency band, the utility bar and the footer. Yellow (`live`) marks primary actions, core service zones and selection. Copper tags plumbing and underlines links; yellow tags electrical. Canary, its ruled lines and the red stamp only appear on work-order sheets. Errors use a dedicated red with a tinted field background.

## Typography

Roboto Slab is the signage voice: headings, work-order titles, prices and the phone number, set heavy with tight but never sub −0.04em tracking. Roboto handles body, labels and forms at a 60–70ch measure. Uppercase labels appear only as field labels on forms and work orders, never as kickers above headings. All prices and times use tabular numerals.

## Layout

A 1240px wrap with fluid gutters. Home alternates dense passages (job lists, rate table, map) with quiet bands (the estimate teaser, the emergency call, the yellow close). List pages are ruled rows, not card grids; detail pages pair a lede and photo above a four-cell spec strip, then two-column lists. Forms run single-column with side asides that drop below on mobile; the estimator gets a sticky price bar on small screens.

## Components

- Work order: canary sheet with perforated top edge, ruled fields and an itemised table; used for the estimator, the home sample and the booking confirmation (with a "Booked" stamp).
- Trade tag: a small pill with a copper or yellow dot.
- Choice tiles, segmented trade switch, quantity stepper, day and window chips.
- Service-area map: authored SVG neighbourhood grid with river and depot, clickable cells synced with a ZIP checker and detail card.
- Emergency triage: radio list that returns a verdict panel (call now / next day / book ahead).
- Header with utility bar, active-state nav, yellow CTA and a drop-down mobile menu; footer with sitemap, hours, contact and a validated reminders signup.

## Motion

One language: paperwork. Pages slide up 12px on arrival; changed work-order lines flash like a highlighter pen as the estimate rewrites; the confirmation stamp lands with a rotate-and-settle; the mobile menu unrolls with a clip-path. The emergency status dot pulses like a van beacon (yellow after hours, green while the office is open). Everything is visible by default, and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep one rate table in `content.ts` driving every price on the site.
- Do keep the emergency number one tap away on every page.
- Do use work-order sheets only for real estimates and bookings.
- Don't add eyebrows, icon-card grids or decorative stats.
- Don't use yellow for body text or on paper backgrounds without an ink border.
- Don't introduce a second accent; trades are told apart by copper and yellow only.
