---
name: "Ascent"
colors:
  paper: "#edf1eb"
  ink: "#263f43"
  accent: "#db662f"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 600
    lineHeight: "0.94"
    letterSpacing: "-0.01em"
    fontFamily: "Display, sans-serif"
    fontSize: "clamp(70px, 7.2vw, 96px)"
---

# Ascent

Take the long way down. An aerial adventure journal with a flight selector.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#14383c66`, `#1a424b`, `#263f43`, `#8ca39b`, `#9eafa2`, `#acbcb3`, `#b54925`, `#c45e2f`, `#db662f`, `#dce5dc`, `#edf1eb`, `#eee`, `#f3c7a7`, `#fff`, `#fff8`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Barlow Condensed (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.

## Font-loading resilience

On mobile, the absolute hero title is bounded by 6% gutters on both sides and allows emergency wrapping. The loaded condensed display remains unchanged; a wider fallback face cannot enlarge the document while fonts load.
