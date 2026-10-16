---
name: "Kinetic"
colors:
  paper: "#f3f1e8"
  ink: "#243239"
  accent: "#dce65a"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 500
    lineHeight: "0.98"
    letterSpacing: "-0.035em"
    fontFamily: "Display, sans-serif"
    fontSize: "clamp(55px, 6vw, 82px)"
---

# Kinetic

Find your way back to movement. An expressive motion studio and care pathway selector.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#000`, `#243239`, `#263d3d`, `#55643c`, `#5b6b40`, `#667038`, `#a2ad83`, `#bbc0ad`, `#c7ccb9`, `#c9d2bc`, `#dce0be`, `#dce65a`, `#e1e4ca`, `#e9ed63`, `#f0f289`, `#f3f1e8`, `#fff`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Space Grotesk (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
