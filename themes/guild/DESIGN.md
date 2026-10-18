---
name: Guild
colors:
  paper: "#f3eee3"
  paper-2: "#e8e1cf"
  sheet: "#fbf8f1"
  ink: "#1d211e"
  ink-2: "#4b504b"
  seal: "#a3301c"
  seal-deep: "#82230f"
  green: "#1f3b32"
  green-ink: "#ece6d6"
  avail: "#2a6a44"
  soon: "#8a5300"
typography:
  display:
    {
      family: "DM Serif Text",
      sizes: "h1 clamp(2.4rem → 4.6rem), hero clamp(2.6rem → 5.4rem), h2 clamp(1.7rem → 2.6rem), h3 1.2–1.4rem",
    }
  body:
    {
      family: "Karla",
      sizes: "17px base, lede clamp(1.1rem → 1.3rem), labels 0.72–0.95rem",
    }
rounded: { small: 4px, sheet: 12px, pill: 99px }
spacing:
  {
    gutter: "clamp(1.1rem, 4vw, 2.5rem)",
    section: "clamp(4rem → 7rem)",
    max-width: 1280px,
  }
---

## Overview

Guild is set as a trade register: the ruled member book a craft guild kept, with an ink seal struck beside each name. Freelance hiring is a weekday, laptop-in-daylight task, so the site is light: warm ledger paper, black-green ink and one sealing-wax red. Every member carries a hallmark (register number and craft set around their initials), which is the brand's proof that someone vouched for them.

## Colors

Paper and a slightly darker band alternate to separate sections; white-ish "sheets" hold the documents (ledger, escrow statement, brief preview, terms card, overlap chart). Seal red is reserved for hallmarks, primary actions, the viewer's bar in the chart and step numerals. Deep guild green carries the escrow, vouching and charter bands and the footer. Availability uses green (now), ochre ring (soon) and grey ring (booked) so status never relies on colour alone.

## Typography

DM Serif Text for headings, names, rates and pull quotes, the voice of the register. Karla for everything read at length and for tabular figures (`tabular-nums` site-wide). Uppercase tracking appears only in table headers and chart axes.

## Layout

A 1280px wrap with fluid gutters. Pages open with a heading block closed by a double rule, the ledger's line. Lists are ruled rows rather than cards: the talent register, crafts table, commissions, plan columns. Cards appear only where an object is a document (sheet) or a person (portrait card). Breakpoints at 1180, 1100, 960 (mobile menu), 900 (single column) and 640.

## Components

Hallmark (SVG seal with text on a path), ledger entry, talent row and talent card (greyscale portrait that takes colour on hover), bench toggle with full-bench warning, time-zone Overlap chart (CSS-positioned bars on a 24-hour track with shared hours banded across rows), crew stepper rows, chips and segmented controls built on native radios, `<details>` FAQ, keyboard tabs, validated forms with inline errors and live regions.

## Motion

One language: the stamp. Hallmarks strike in (scale, rotate, blur settling) on the profile, the posted project and the 404; the bench count bumps when it changes; chart bars glide to new hours when you change time zone or working day. Pages rise in softly from an already-visible state. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do keep rates public and in DM Serif; they are the brand promise.
- Do give every new member data (register number, vouchers, craft) so the hallmark and vouch chain stay true.
- Do keep red rare; one primary action per view.
- Don't add bidding, "top rated" badges or star rows as decoration.
- Don't put portraits in colour on lists; colour is the reward for attention (hover, profile).
- Don't introduce new card styles; use ruled rows or a sheet.
