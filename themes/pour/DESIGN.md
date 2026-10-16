---
name: "Pour"
colors:
  paper: "#f3e6d1"
  ink: "#662b42"
  accent: "#da977c"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "1"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(54px, 5.8vw, 80px)"
---

# Pour

Good wine, no ceremony. A sculptural bottle shelf with a build-your-own case.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#00000033`, `#462d32`, `#462d3240`, `#4b6850`, `#4d28222a`, `#523b40`, `#5b4435`, `#662b42`, `#7c8051`, `#946b39`, `#a2b6b2`, `#bca78f`, `#c4a697`, `#cbbba4`, `#cec18d`, `#da977c`, `#e6d8bf`, `#e9ba62`, `#ed967a`, `#f3e6d1`, `#ffffff20`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
