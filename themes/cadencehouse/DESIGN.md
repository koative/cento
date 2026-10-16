---
name: "Cadence House"
colors:
  paper: "#e9dfc5"
  ink: "#292d25"
  accent: "#c8803d"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 500
    lineHeight: "0.98"
    letterSpacing: "-0.035em"
    fontFamily: "Display, sans-serif"
    fontSize: "clamp(60px, 6.8vw, 92px)"
---

# Cadence House

A place to find your sound. A tactile analog studio console and session planner.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#0006`, `#171d18`, `#292d25`, `#302f23`, `#30382d`, `#34372e`, `#3c302130`, `#3d321c55`, `#5b6051`, `#77775d`, `#777b65`, `#795338`, `#79806a`, `#7c3026`, `#7c7c64`, `#846036`, `#a29e85`, `#a9a78d`, `#aaa58d`, `#b1b09a`, `#b2ac95`, `#b8ad88`, `#c8803d`, `#d9d5bf`, `#e5a34d`, `#e5c883`, `#e6b768`, `#e9dfc5`, `#f0d186`, `#f3e4b3`, `#f4e4b5`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Space Grotesk (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
