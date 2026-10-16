---
name: "Botanica"
colors:
  paper: "#f3f2df"
  ink: "#294b31"
  accent: "#b9cc75"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "0.95"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(72px, 7.2vw, 96px)"
---

# Botanica

Get wonderfully lost. A botanical field guide and seasonal garden explorer.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#294b31`, `#526722`, `#68774d`, `#6b7950`, `#78916b`, `#82915f`, `#a5b48a`, `#b9cc75`, `#bac5a4`, `#bdc6a4`, `#c5d595`, `#dce4bc`, `#e9edcf`, `#f3f2df`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
