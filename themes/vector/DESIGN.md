---
name: Vector
colors:
  paper: "#eef0ec"
  sheet: "#f8f9f6"
  ink: "#121518"
  graphite: "#4d5359"
  muted: "#5c6268"
  rule: "#cfd3cd"
  rule-strong: "#a9aea8"
  hv: "#d4511c"
  hv-deep: "#c2470f"
  hv-ink: "#a63a0d"
  night: "#121518"
  night-2: "#1c2024"
  on-night: "#e9ebe6"
  on-night-muted: "#a3aab0"
  hv-on-night: "#ef7a4c"
  winter: "#355a70"
typography:
  display:
    fontFamily: '"Red Hat Display", system-ui, sans-serif'
    fontWeight: "600"
    letterSpacing: -0.035em
    lineHeight: "1.08"
    fontSize: clamp(2.5rem, 1.6rem + 3.8vw, 4.75rem)
  headline:
    fontFamily: '"Red Hat Display", system-ui, sans-serif'
    fontWeight: "600"
    letterSpacing: -0.025em
    fontSize: clamp(1.9rem, 1.4rem + 2vw, 3rem)
  body:
    fontFamily: '"Red Hat Text", system-ui, sans-serif'
    fontWeight: "400"
    lineHeight: "1.6"
    fontSize: 1.0625rem
  small:
    fontFamily: '"Red Hat Text", system-ui, sans-serif'
    fontSize: 0.875rem
rounded:
  control: 6px
  panel: 12px
spacing:
  gutter: clamp(20px, 4vw, 48px)
  section: clamp(64px, 8vw, 120px)
---

## Overview

The design studio sheet: cool studio-wall paper, graphite ink and high-voltage orange, the colour carmakers use for orange HV cabling, reserved for dimension lines, focus and things that carry current. Cars are authored SVG side elevations with real dimension callouts, drawn to one scale; photography is only ever the road. It suits a maker whose whole pitch is honest numbers. People shop for a car on a laptop in daylight and come back on a phone, so the site is light, calm and full of measured data.

## Colors

`paper` is the page and `sheet` lifts drawing surfaces and heroes. `ink` carries text and primary buttons; `graphite`/`muted` carry secondary copy (both AA on paper). `hv` marks dimensions, the active line-up tab, sliders and selection; `hv-deep` fills the primary action on forms, and `hv-ink` is the AA text version used for links and errors. `winter` (steel blue) is used only for the 20 °F range so the two ranges always read apart. `night` holds the range estimator, closing CTA and footer, with `hv-on-night` for accents there.

## Typography

Red Hat Display 600 for headings with tight but legal tracking (−0.035em at h1, −0.025em at h2) and balanced wrapping. Red Hat Text for body at 17px/1.6, capped near 68ch. Every price, range, time and spec uses tabular lining numerals so columns line up. Model names pair a Display name with a lighter body-type label ("Span Sedan").

## Layout

A 1200px sheet with fluid gutters. Heroes split headline and lead copy, with the elevation drawing taking the full width underneath. Spec content is in ruled tables (label left, value right), never in cards. Detail and form pages use a sticky summary column at desktop that drops under the content below 900px. Sections alternate `paper` and `sheet` and land on a dark `night` close.

## Components

- **Elevation**: one SVG car generated from a `Profile` (length, height, wheelbase, roof and nose shape). Paths morph between models, paint/wheel/interior recolour live, and optional dimension lines carry real millimetre and inch values. It drives the home switcher, the models list, model pages, the configurator and the reservation summary.
- **Option rows**: radio/checkbox rows with name, sublabel and price, and an ink outline when selected; paint swatches are round with a name and note.
- **Range bars**: paired sticker vs winter bars; the range estimator uses temperature, speed and wheel sliders.
- **Charging curve**: SVG power-vs-state-of-charge plot with the session window shaded.
- **Forms**: labelled fields, inline errors with a dot that name the fix, a busy button state, a confirmation panel with an orange check, and a quiet "demo only" line.
- **Header**: wordmark with the HV arrow, underline-active nav, ink CTA; under 900px a dropdown sheet menu.

## Motion

One language: things settle into place with an exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`). The elevation morphs between models and paints, dimension lines plot themselves, range bars grow from zero, pages rise 10px from 40% opacity on route change (never invisible), and the mobile menu drops in. Content is visible by default. `prefers-reduced-motion: reduce` removes every animation and transition.

## Do's and Don'ts

- Do show both ranges together wherever one appears.
- Do draw the product; use photos for roads, weather and charging only.
- Do keep orange for current, measurement and action, never for decoration.
- Don't add eyebrow labels, stat-hero rows or icon-card grids.
- Don't use photographs of real cars or any third-party marks.
- Don't round panels past 12px or add shadows to bordered panels.
