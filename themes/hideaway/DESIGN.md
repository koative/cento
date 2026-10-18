---
name: Hideaway
colors:
  paper: "#f3eee5"
  paper-2: "#e9e1d2"
  white: "#fbf9f4"
  ink: "#1f2a2c"
  ink-2: "#4b5654"
  sea: "#1d3f47"
  sea-2: "#2c5d68"
  sea-wash: "#d6e2df"
  terracotta: "#a64b2a"
  terracotta-wash: "#efd6c8"
  tile: "#27508a"
  season-low: "#8fa8a4"
  season-mid: "#c8a464"
  season-high: "#c97b4d"
  season-peak: "#a64b2a"
typography:
  display:
    {
      family: Cormorant,
      weights: "500–600, italic for names and quotes",
      sizes: "h1 clamp(2.7rem → 5.4rem), h2 clamp(2rem → 3.3rem), h3 clamp(1.4rem → 1.7rem)",
    }
  body:
    {
      family: Mulish,
      weights: "400–700",
      size: "1.0625rem / 1.65",
      lede: "clamp(1.12rem → 1.3rem)",
    }
rounded:
  {
    controls: 4px,
    cards: 14px,
    plaque: 3px,
    hero: "arched top (50% radius on the top corners)",
  }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4.5rem, 3rem + 6vw, 8.5rem)",
  }
---

## Overview

The island house book: the binder on the kitchen table of a whitewashed villa, written by the people who keep the keys. Limestone paper, deep-sea ink, terracotta from the north-shore rock and the cobalt of painted house-name tiles. Guests plan on a laptop in a bright room months ahead and check details on a phone in the sun, so the site is light, calm and legible outdoors.

## Colors

Paper and whitewash carry every page; `sea` is the action colour (buttons, links, selected dates, map pins), `terracotta` is the warm accent (active nav, drop caps, hover, errors), `tile` cobalt is reserved for the house-name plaques. Four season colours, sea-green to terracotta, encode the price seasons in the month chart and the calendar legend. Text is `ink`/`ink-2` on paper (AA and above); selection, caret, scrollbar and focus ring are themed from these tokens.

## Typography

Cormorant for headings, villa names, prices in summaries and guest quotes; italic Cormorant on the plaques reads like hand-painted tiles. Mulish for body, forms and data, with tabular numerals in the calendar, rates and quote tables. Tracking stays at −0.01em on display sizes.

## Layout

A 1340px wrap with fluid gutters. Home moves from a dense hero (headline, availability search, arched pool photo) to the villa row, a sea-wash map band, a quiet typographic statement, a priced concierge ledger, guide picks, a full-width month chart, guest books and a moonlit close. Detail pages pair a large photo with a facts panel; booking runs as a form beside a sticky summary. Two-column layouts stack below 1180px, the mobile menu takes over at 960px, and card grids drop to one column under 760px.

## Components

- **Plaque**: the painted name tile (white, cobalt border with an inset second rule) used on villa cards, villa headers and the booking summary.
- **Availability calendar**: two months side by side (stacked on phones), booked nights struck through, nightly price under each free day, range highlight on hover, Saturday-to-Saturday rule in high summer, arrow-key navigation, with a live quote panel (seasonal nights, cleaning, tourist tax, deposit) that hands off to the booking form.
- **Island map**: authored SVG of Vellmar with coast line, contours, roads and villages; pins for villas or guide places link to their pages and highlight the matching list item.
- **Ledger**: dotted-leader price list for concierge services.
- **Month chart**: twelve bars of sea temperature coloured by price season.
- Forms: labelled fields, inline errors that name the fix, loading state on submit, polite live-region confirmations.

## Motion

Pages arrive with a short rise and fade; arched photos open like a shutter (clip-path from the top). The mobile menu drops in with a clip-path reveal; villa photos ease in scale on hover; map pins grow on focus. All content is visible without JS, and `prefers-reduced-motion` removes every animation and transition.

## Do's and Don'ts

- Do let photographs of the actual houses and coves carry the page; one arched hero per page at most.
- Do keep prices in euros, per house per night, and show the season they belong to.
- Do use the plaque only for house names.
- Don't add eyebrow labels, icon-card grids or stat rows; the headings and the data speak.
- Don't introduce new accent colours: sea for actions, terracotta for warmth and errors, cobalt for names.
