---
name: "Cove"
colors:
  paper: "#f1f4ee"
  ink: "#173f57"
  accent: "#c3dbdf"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "0.95"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(64px, 7vw, 96px)"
---

# Cove

A different kind of blue. Chart an island-hopping journey through a nautical route planner.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#123f59`, `#173f57`, `#1b5c79`, `#4b7384`, `#54788a`, `#688d9f22`, `#a5bdc5`, `#adc5ae`, `#b0ccd4`, `#bacbd1`, `#c3d2d4`, `#c3dbdf`, `#dce7e4`, `#dce9ec`, `#f1f4ee`, `#fff`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
