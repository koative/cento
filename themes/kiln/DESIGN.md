---
name: Kiln
colors:
  paper: "#f4efe7"
  paper-2: "#ebe3d6"
  line: "#d3c5b1"
  ink: "#2a201b"
  ink-2: "#5f5047"
  clay: "#a2482a"
  clay-deep: "#8f3c22"
  kiln: "#231a16"
  kiln-ink: "#e9dccb"
  kiln-accent: "#e07a52"
typography:
  display:
    {
      family: "Cardo",
      weights: [400, 700],
      sizes: "h1 clamp(2.5rem → 5rem), h2 clamp(1.85rem → 2.9rem), h3 clamp(1.25rem → 1.5rem)",
    }
  body:
    {
      family: "Red Hat Text",
      weights: "400–700",
      size: "1.0625rem / 1.6",
      numerals: tabular,
    }
rounded: { buttons: 2px, chips: 999px, images: 0 }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3.5rem)",
    section: "clamp(4rem, 3rem + 4vw, 7.5rem)",
    max: 1360px,
  }
---

## Overview

A potter's front room in daylight: bone-coloured slip, iron-oxide ink and terracotta, with the studio's own paperwork as the visual language — museum-style catalogue labels on every object, a firing log, and a wall of glaze test tiles. Customers buy here because the pieces are handmade in small runs, so the site keeps returning to the material facts (clay, glaze, cone, firing date) instead of lifestyle mood.

## Colors

Light paper (`paper`) everywhere people shop and read; one deep kiln brown (`kiln`) for the glaze rack band, the studio's kiln band and the footer. Terracotta (`clay`) is the only action colour — buttons, active nav, focus rings, selection, caret — and carries 5.2:1 on paper. Secondary text is the warm `ink-2` (6.7:1), never grey. Glaze colours live in `content.ts` and are used only where they describe a real glaze.

## Typography

Cardo, a classical book face, sets headings, object names, quotes and the large mobile menu. Red Hat Text sets everything functional: body, labels, prices, tables, forms. Numbers are tabular site-wide so prices, dates and places-left line up.

## Layout

Asymmetric 4/7 or 5/6 splits on a 1360px frame, hairline rules instead of boxes, and dense data passages (firing log, session table, test board) between quieter photographic moments. Cards are avoided: products sit on a ruled catalogue label, workshops are alternating rows, the team is a ruled list.

## Components

Catalogue label (number, name, glaze dots, price, stock), radio chips and glaze swatches (native radios, styled), quantity stepper, glaze test tile and pot profile drawing (authored SVG from `components/Ceramics.tsx`, glaze translucency per glaze so clays show through), session picker, ruled spec lists, disclosure FAQ, bag lines, order summary.

## Motion

One page-settle on route change (fade and 10px rise, exponential ease-out); the glaze rack tiles lift when picked; glaze fills cross-fade on the bench; product photos ease in scale on hover. Everything is visible without motion and `prefers-reduced-motion` removes it.

## Do's and Don'ts

- Do describe objects with their real material facts (clay, glaze, firing, size, capacity).
- Do keep terracotta for actions only.
- Don't add eyebrow labels, icon-card rows or decorative gradients; let rules and type carry structure.
- Don't show a glaze swatch for a colour that is not a glaze in `content.ts`.
