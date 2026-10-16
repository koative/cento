---
name: "Sanctuary"
colors:
  paper: "#f0eedb"
  ink: "#283d2d"
  accent: "#c5ce91"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "0.95"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(70px, 7vw, 96px)"
---

# Sanctuary

Wild lives, worth protecting. An animal care journal and keeper-for-a-day planner.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#14251b99`, `#283d2d`, `#6d7b5d`, `#899c76`, `#aab798`, `#b7c08e`, `#c5ce91`, `#c8d48c`, `#d5dbc0`, `#d6dba6`, `#e4e5c9`, `#f0eedb`, `#f0eedb88`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
