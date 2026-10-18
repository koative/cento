---
name: Aura
colors:
  butter: "#f8efc8"
  milk: "#fdf8e8"
  plum: "#3d2133"
  plum-2: "#6a4659"
  berry: "#9a3459"
  night: "#2b1622"
  moon: "#f4e9c6"
  rose: "#eaa9bf"
  tiles: ["#f3e7cc", "#efd3cc", "#dce2c6", "#e5d9e6", "#f4d3a8", "#f1e2a4"]
typography:
  display:
    {
      family: Bellefair,
      sizes: "h1 clamp(2.75rem → 5.75rem), hero 6rem max, h2 clamp(2rem → 3.25rem), h3 1.5rem",
    }
  body:
    {
      family: Urbanist,
      size: "1.0625rem / 1.6, weight 450; labels 0.75–0.8125rem uppercase +0.08em",
    }
rounded: { tile: 14px, field: 10px, option: 12px, controls: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 4rem)",
    section: "clamp(4rem, 8vw, 7rem)",
    max-width: 1360px,
  }
---

## Overview

A butter-yellow bathroom shelf in morning light, written in plum ink. Skincare is bought on a phone between the sink and the mirror, so the site is light, calm and legible, with one deliberate exception: the evening ritual turns the builder page to night. The old Aura's butter/plum palette, amber oil photograph and "Daily care. Quiet joy." line were kept and grown into a full shop.

## Colors

Butter is the paper, milk the raised surface (summaries, alternate sections), plum the ink and primary button, berry the single accent for emphasis, links underlines, errors and badges. The `[data-time="pm"]` scope swaps surface/foreground tokens to night/moon with rose as the accent and focus ring. Six pastel tile colours sit behind authored packshots and come from each product's texture.

## Typography

Bellefair (single weight, high contrast) carries headings, product names, step names, the strata labels and the A–Z letters; it is never bolded or tracked below −0.025em. Urbanist carries body, controls and small uppercase metadata. Prices and totals use tabular lining numerals.

## Layout

Wide editorial grids at 1360px: hero split text/photo, two-column builder (questions / result), sidebar filters on the shop, sticky gallery and summary panels. Dense passages (step index, ingredient cloud, glossary rows) alternate with quiet ones (philosophy, close). Everything collapses to one column under 960px and to two-up product grids under 640px.

## Components

Authored SVG packshots (pump, dropper, bottle, jar, tube, tin) filled with each product's tint; the Strata diagram (ritual as layers on skin, first step at the bottom, band height from texture weight, "Skin" baseline); chip filters on real radios/checkboxes; option cards with native radios; size rows; pill quantity stepper; hairline FAQ disclosures with drawn plus/minus; ingredient monogram tiles for lab-made ingredients and photographs for botanicals.

## Motion

One language, "light settling": each route fades up from a slight blur; strata bands settle in from above one after another when the ritual changes; the builder and home preview crossfade between day and night surfaces; the logo halo breathes slowly in the philosophy section. `prefers-reduced-motion: reduce` removes all of it.

## Do's and Don'ts

Do keep one product per tile colour and draw new vessels with the same flat geometry. Do keep copy specific (percentages, origins, minutes). Don't add gradient blobs or photo-real renders of products, don't use eyebrow labels above headings, and don't introduce a second accent colour — berry by day, rose by night.
