---
name: Cipher
colors:
  paper: "#f2efe6"
  paper-deep: "#e7e2d3"
  sheet: "#fbf9f3"
  ink: "#15241c"
  ink-soft: "#46544b"
  line: "#d0cab7"
  green: "#1d5a3e"
  green-wash: "#dce6d5"
  oxide: "#a3361b"
  oxide-wash: "#f3dfd5"
  amber: "#7a5310"
typography:
  display:
    {
      family: "Funnel Display",
      weight: 600,
      sizes: "h1 clamp(2.5rem, 5.4vw, 4.75rem); h2 clamp(1.75rem, 3.2vw, 2.75rem); h3 1.25rem",
    }
  body: { family: "Funnel Sans", weight: 400, size: "1.0625rem / 1.6" }
rounded: { control: 6px, panel: 12px, widget: 14px, pill: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4.5rem, 9vw, 8rem)",
    wrap: 1240px,
  }
---

## Overview

Cipher's world is security printing: the ivory paper, intaglio green and guilloche linework of share certificates and passports, where trust is literally engraved. It fits an access-review product because the deliverable is a signed, sealed record. The use scene is a manager or compliance lead deciding grants on a laptop in daylight, so the site is light, calm and legible, with dark ink reserved for product chrome.

## Colors

Ivory paper (`paper`) and lifted sheets (`sheet`) carry everything. `ink` is the text and the product chrome bar. `green` is the single action and approval colour; `oxide` means revocation and high risk; `amber` marks medium risk. Washes tint risk tags and the selected queue row. Selection, caret, focus ring, scrollbar and form accents all come from these tokens.

## Typography

Funnel Display at 600 for headings with −0.025 to −0.035em tracking, balanced wrapping. Funnel Sans for body and UI; its italic sets the reviewer's signature on the attestation. Tabular numerals on every figure, date and price.

## Layout

A 1240px wrap with ledger rules: lists and indexes are rows divided by hairlines under a heavier ink rule, not card grids. Home alternates dense (review widget, drift timeline, solutions ledger) with quiet passages (pull quote, close). The app uses a sticky sidebar that collapses to a top bar with scrolling tabs below 900px.

## Components

Review widget and queue (avatar rows with risk dots, access-path chain, "why this needs a look", facts, keep/revoke), attestation certificate with guilloche seal, wave bands on the footer and close, solution ledger rows, dark rule card, plan cards and calculator, uptime bars, disclosure FAQ, chips, segmented billing toggle, switches, validated fields with inline errors.

## Motion

One page-enter rise (0.55s, expo-out). The signature moment is the seal drawing its guilloche lines when an attestation is signed. Progress meters and bars ease their widths as decisions land. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do explain risk in a sentence next to the grant; never a bare score.
- Do keep green for approve/primary and oxide for revoke/high risk only.
- Do draw figures (graphs, seals, charts) as computed SVG from `content.ts`.
- Don't add eyebrow labels, icon-card grids, gradients or glass.
- Don't let guilloche become wallpaper: it belongs on certificates, seals and edges.
