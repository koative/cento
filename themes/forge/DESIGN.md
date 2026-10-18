---
name: Forge
colors:
  paper: "#f1f0ea"
  paper-2: "#e6e4db"
  sheet: "#fbfaf6"
  ink: "#15181b"
  ink-2: "#474d53"
  rule: "#c9c6bb"
  blue: "#1d47a3"
  blue-tint: "#dde3f0"
  steel: "#1b1f23"
  on-steel: "#ecebe5"
  ok: "#276a43"
  err: "#a8231b"
typography:
  display:
    {
      family: "Chivo",
      weights: [750, 800],
      sizes: "clamp(2.7rem, 1.6rem + 4.4vw, 5.5rem) h1 · clamp(1.9rem, 1.4rem + 2vw, 3rem) h2",
    }
  body: { family: "Chivo", size: "1.0625rem / 1.6" }
  data:
    {
      family: "Chivo Mono",
      size: "0.7–0.9rem, uppercase labels tracked 0.06em, tabular numerals",
    }
rounded: { control: "3px", chip: "999px" }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 2.5rem)",
    section: "clamp(4rem, 8vw, 7rem)",
    max-width: "1320px",
  }
---

# Forge — design

## Overview

The drawing office of a contract machine shop. Visitors are mechanical engineers and buyers at a desk, CAD on the other monitor, comparing suppliers in daylight, so the site is light, dense and exact: sheet-paper surfaces, graphite linework, and the blue of machinists' layout fluid for every dimension. The pages borrow the objects the sector already trusts — the drawing title block, zone-marked sheet borders, dimension lines and leaders, ballooned inspection reports — instead of generic tech-marketing cards.

## Colors

Warm drawing paper (`paper`) with a brighter `sheet` for anything that is "a document": drawings, inputs, the RFQ aside. `ink` carries text and all part edges; `ink-2` is secondary text (8:1 on paper). `blue` is reserved for dimensions, active states, primary actions and links. `steel` is the dark band and footer, used twice per page at most. `ok` appears only as "Accept" in inspection results; `err` only in validation.

## Typography

Chivo at 750–850 for headings with −0.028em tracking, Chivo 400 for running text at 65ch. Chivo Mono is used only where a shop would print monospace: dimensions, part numbers, spec labels, table headers, tolerances and timeline markers — never for prose.

## Layout

A 1320px sheet with asymmetric two-column splits (5/7, 7/4). Lists are ruled rows rather than cards: the capability index, machine tables, people and roles all read like a schedule. Section rules stop at the content edge. Full-bleed photography appears once per page at most.

## Components

- Title block: four ruled cells under the hero, mono label + bold value.
- Part drawing: authored SVG sheet with zone numbers and letters, centre lines, hidden lines, blue dimensions and leaders, and a live title block (part number, material, finish, tolerance, quantity).
- Work-envelope diagram: isometric box or cylinder drawn to the machine's real proportions.
- Ballooned first-article report: SVG drawing plus AS9102-style table; selecting a row lights its balloon.
- Buttons: 46px, 3px radius; primary blue, ghost outlined in ink, light/dark variants on steel.
- Chips: pill toggles with `aria-pressed`, ink when pressed.
- Forms: sheet-coloured fields with field-grey borders, inline errors in `err` that name the fix, a summary alert, loading button, focused confirmation panel.

## Motion

One authored language. On every route a 2px blue probe line sweeps down the viewport while the page settles 8px; in the configurator the views re-plot left to right with a clip-path wipe whenever the part family changes, like a pen plotter. Everything is visible without motion; `prefers-reduced-motion` removes the sweep and collapses all animation.

## Do's and Don'ts

- Do give every number its unit and use mono for it.
- Do keep blue for dimensions and actions so it keeps meaning "measured" or "do this".
- Do show real equipment and real tolerances instead of claims.
- Don't add icon-card grids, eyebrow labels or stat rows; use a ruled list or table.
- Don't round corners past 3px or add soft-shadowed tiles; the only shadow is under a drawing sheet.
- Don't use grid backgrounds except inside an actual drawing.
