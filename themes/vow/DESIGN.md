---
name: Vow
colors:
  paper: "#f4eee6"
  paper-2: "#ebe0d3"
  card: "#fbf7f1"
  ink: "#3b2321"
  ink-2: "#694741"
  accent: "#9a463b"
  accent-ink: "#833a30"
  rule: "#d8c4b7"
  rule-strong: "#ad9083"
  night: "#2a1918"
  night-ink: "#f3e8de"
typography:
  display:
    {
      family: Italiana,
      weight: 400,
      sizes: "h1 clamp(2.75rem → 5.75rem), h2 clamp(2rem → 3.4rem), h3 1.5–1.9rem",
    }
  body:
    {
      family: Raleway,
      weights: "400, 600, 700",
      size: "1–1.0625rem / 1.7",
      numerals: "lining tabular for data (.num)",
    }
rounded: { base: 2px, pills: 999px, monogram: 50% }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4rem, 8vw, 7.5rem)",
    max: 1280px,
  }
---

## Overview

A wedding stationery suite turned into a website: ivory paper, rosewood ink, engraved-feeling Italiana headings and fine letterpress rules. Couples browse a planner's site in the evening on their phones and on a laptop together at weekends; a warm light page reads like the invitations they are about to order, and evening-dark bands mark the reception moments (couples' words, the closing invitation to enquire).

## Colors

Paper and a blush-sand second surface carry most pages. Rosewood ink for text, a clay-rose accent for links, active states, checkmarks and the planner's "today" rule. One night colour for the testimonials and the closing band. Budget lines in the planner use muted materials from the same table: rosewood, clay, dried rose, walnut, linen, sage, parchment, ash.

## Typography

Italiana for every heading, the wordmark, prices and spec values, set mixed-case with slight positive tracking. Raleway for reading text at a long, open line height; small uppercase Raleway for metadata placed under headings, never above. Raleway's old-style figures stay in prose; data uses lining tabular numerals.

## Layout

Centered invitation typesetting for story and article heads; asymmetric two-column grids elsewhere. The home hero is a folio of three slightly turned wedding photographs beside the headline, proving the work in the first viewport. Packages read as a menu card, add-ons and principles as a two-column menu list.

## Components

- **Place card**: card surface with a second inner rule (`outline-offset: -9px`), used for the planner summary, the home countdown and the enquiry confirmation.
- **Countdown planner**: controls in a sticky column; output is a dated, tickable milestone list with a "Today" divider, states Done / Behind / Next up, a budget bar plus table, and a package suggestion that feeds the enquiry form.
- **Segmented pills** for filters and the guest-count fee switch; FAQ as native `<details>` with a drawn plus.
- Wedding and journal cards: framed image, Italiana title, metadata line, excerpt.

## Motion

Page content settles in once on arrival (10px, exponential ease-out). Hero folio photographs unveil top-down with a clip-path. Planner milestones re-lay in sequence when the date changes; the budget bar segments glide between splits. All motion collapses under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep rules at 1px and let the double rule be the only ornament.
- Do keep headings in Italiana, never bold, never all caps except the wordmark.
- Don't add eyebrow labels, icon card rows or decorative flourishes; the photographs and type carry the romance.
- Don't use the night colour for whole pages; it belongs to the evening moments.
