---
name: "Horizon"
colors:
  paper: "#f0eee5"
  ink: "#233c76"
  accent: "#c89b64"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "1.03"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "52px"
---

# Horizon

Curiosity has no edge. An independent science journal with an orbital reading index.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#233c76`, `#233c7620`, `#5872a2`, `#7184a5`, `#7194bc`, `#9fa9bd`, `#b0b7c1`, `#b27742`, `#c7d0de`, `#c89b64`, `#e2e4dc`, `#f0eee5`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
