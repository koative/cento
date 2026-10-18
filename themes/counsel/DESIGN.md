---
name: Counsel
colors:
  paper: "#f4f0e8"
  paper-2: "#ebe5d8"
  field: "#fffdf8"
  ink: "#1c211f"
  ink-2: "#4b524d"
  rule: "#cfc7b6"
  edge: "#8f8a7e"
  seal: "#8c2a22"
  seal-dark: "#6e1f19"
  seal-wash: "#f8ebe7"
  night: "#1c211f"
  night-2: "#252b28"
  on-night: "#efe9dd"
  on-night-2: "#b8b2a5"
  seal-light: "#e3a294"
typography:
  display:
    fontFamily: Libre Baskerville
    fontWeight: 400
    sizes: "h1 clamp(2.25rem, 1.35rem + 3.6vw, 4.25rem); section h2 clamp(1.6rem, 1.2rem + 1.6vw, 2.5rem); h3 1.25–1.5rem"
    letterSpacing: -0.02em
  body:
    fontFamily: Libre Franklin
    fontWeight: 400–700
    size: 1.0625rem / 1.6
rounded: 2px
spacing:
  gutter: clamp(1.25rem, 4vw, 3rem)
  section: clamp(3.5rem, 7vw, 6.5rem)
  max: 1240px
---

## Overview

Counsel is set like the firm's own paper: laid cream stock, iron-gall ink, a double rule under the letterhead and a single oxblood accent taken from sealing wax. Clients come to a law firm site anxious and reading carefully, often at a desk during the day, so the world is light, quiet and typographic, and every page reads like a document the firm would sign: memoranda, ledgers, schedules.

## Colors

Paper and ink carry almost everything. Seal (oxblood) marks the few things that matter: active links, paragraph numbers, the deadline tool's actions, the closing band. Night is the ink colour used as a surface for the limitation clock, the pro bono note and the footer; on it, seal-light replaces seal. All text pairs pass AA.

## Typography

Libre Baskerville for headlines, matter descriptions, quotes, FAQ questions and figures, always at regular weight; italic only for client voices. Libre Franklin for body, labels and interface. Uppercase tracked Franklin is reserved for data labels (memo FROM/DATE/RE, table heads, footer headings), never above a heading. Figures are tabular.

## Layout

A 1240px column with a ruled rhythm: sections separate with a hairline, documents open and close with a 3px double rule. Home pairs the headline with a practice index so the first viewport says what the firm does. Long reads use a side panel and a 70ch text column; directory and practice lists are ruled rows rather than cards.

## Components

Letterhead header with utility line (offices, hours, phone) and a mobile menu below 960px. Practice index and practice rows with a whole-row link. Ledger tables for recent work, fees and rates. Person cards with grayscale portraits that warm on hover. Memo block (From / Date / Re / Format) on articles and the enquiry receipt. Native `<details>` FAQs. Segmented toggles for filters. The limitation clock: event select, date input, a big day count, a ruled timeline with year/month ticks and a "Today" marker, and a prefilled enquiry link. The enquiry form with conflict-check fields, inline errors that name the fix, a sending state and a receipt.

## Motion

Each route settles in (opacity and a 12px rise, exponential ease-out). The clock's fill and Today marker glide to their new position when inputs change, and the enquiry receipt unfolds from the top. Portrait filters ease on hover. `prefers-reduced-motion: reduce` turns all of it off.

## Do's and Don'ts

- Do write matters, fees and deadlines as specific sentences and numbers; label illustrative values as such.
- Do keep seal for actions and markers; one accent only.
- Don't add eyebrow labels, icon-card grids or stat rows; the content is the structure.
- Don't round corners beyond 2px or add shadows except the mobile menu's soft drop.
- Don't show portraits in full colour in lists; the directory is printed in one ink.
