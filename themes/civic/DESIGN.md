---
name: Civic
colors:
  paper: "#f4f4ee"
  surface: "#ffffff"
  mist: "#e4ebe8"
  ink: "#10384b"
  ink-deep: "#0a2836"
  ink-soft: "#3d5967"
  line: "#c9d3cf"
  citron: "#dbe74d"
  green: "#3d630b"
  red: "#b3261e"
  amber: "#f2b33d"
  on-ink: "#f4f4ee"
  on-ink-soft: "#b9cbd2"
  map-land: "#e9ece3"
  map-park: "#bcd59a"
  map-water: "#a9cdd9"
typography:
  display:
    fontFamily: Public Sans
    fontWeight: 800
    fontSize: clamp(2.3rem, 1.6rem + 3.3vw, 4.4rem)
    letterSpacing: -0.03em
    lineHeight: 1.12
  headline:
    fontFamily: Public Sans
    fontWeight: 750
    fontSize: clamp(1.75rem, 1.4rem + 1.6vw, 2.6rem)
    letterSpacing: -0.022em
  title:
    fontFamily: Public Sans
    fontWeight: 700
    fontSize: clamp(1.15rem, 1.05rem + 0.4vw, 1.3rem)
  body:
    fontFamily: Public Sans
    fontWeight: 400
    fontSize: 1.0625rem
    lineHeight: 1.55
  small:
    fontFamily: Public Sans
    fontSize: 0.875rem
rounded:
  control: 6px
  card: 12px
spacing:
  gutter: clamp(1.1rem, 4vw, 2.5rem)
  section: clamp(3rem, 7vw, 5.5rem)
  wrap: 1240px
---

# Design System: Civic

## Overview

Municipal street signage and the city's own survey map. Civic blue enamel plates, high-visibility citron (the colour of road crews' vests and snowplow lights) and a pale map-paper ground. Residents arrive on a phone, often outdoors and in a hurry — a dark streetlight, a missed pickup — so the site is light, plain-spoken, high-contrast and search-first: the first screen asks "What do you need from the city today?" and answers with a search field, the most-asked services and today's City Hall status.

## Colors

- **Paper** `#f4f4ee` page ground, **surface** white for forms and cards, **mist** `#e4ebe8` for alternate bands.
- **Ink** `#10384b` civic blue for text, header plates, page heads and the dark lookup band; **on-ink** paper text on it.
- **Citron** `#dbe74d` is the action colour: home hero, primary buttons, selected ward, selection highlight and the outer focus ring. Never used for text on paper.
- Status colours carry meaning only: **red** urgent alerts and the alert ribbon, **amber** advisories and open reports on the map, **green** fixed/confirmed.
- Map palette (land, blocks, park, river) is muted so pins and wards read first.

## Typography

Public Sans throughout — the typeface designed for government services. Headings 700–800 with −0.01 to −0.03em tracking and balanced wrapping; body 17px at 1.55 with a 68ch measure; tabular numerals everywhere (dates, fees, reference numbers, budget figures). Reference numbers and day plates are set large and bold like stamped signage.

## Layout

A 1240px wrap with fluid gutters. Page heads are full-bleed ink blocks with breadcrumb, H1 and lede. Content alternates paper, mist and ink bands; dense passages (service directory, alerts, departments table) sit between quiet ones (mayor's note, ask-a-person close). Service and meeting pages use a reading column plus a sticky action card; the report form keeps tracking and the 911 note in a sticky aside. Everything collapses to one column under 900px with a menu button.

## Components

- **Official strip + alert ribbon**: thin ink bar stating the site is official (and fictional), then a red ribbon for the urgent alert on every page.
- **Plates**: ink rectangles with an inset paper outline — letter plates in the A–Z directory, date plates for meetings, ward badges, the logo.
- **City map** (authored SVG): streets, avenues, park, river, wards. Click or arrow-key to drop a pin; shows open reports as dots, finds the nearest corner and ward.
- **Report flow**: type tiles, map pin with nearby-duplicate detection ("add my voice"), details, photo, updates; validation names the fix; loading button; success shows a CW reference and a four-stage tracker (Received → Assigned → Scheduled → Fixed).
- **Address lookup**: house number + street → trash day, ward, councillor, polling place, highlighted on the ward map.
- Meeting rows, member cards (highlighted by the ward finder), alert rows with severity tags, fee tables, FAQ `<details>`, budget bars.

## Motion

One settle on page change (content fades up 10px from an already-visible state), the pin drop with a single ring pulse on the map, the tracker line growing to the current stage, budget bars growing, and the mobile menu sliding in. All ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`); `prefers-reduced-motion` removes animation and transitions.

## Do's and Don'ts

- Do lead with the task: search, report, look up. Say who handles it, how long it takes and what it costs.
- Do use citron only for action and selection, red only for urgency.
- Do keep focus visible: 3px ink outline plus a citron halo (citron outline on dark bands).
- Don't add decorative imagery; photos show real city work (paving crews, the snowplow, the chamber).
- Don't use eyebrow labels, gradient text or icon-card grids; plates and tables carry the structure.
