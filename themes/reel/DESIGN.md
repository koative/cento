---
name: "Reel"
colors:
  paper: "#171716"
  ink: "#f5f0df"
  accent: "#e5a667"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 500
    lineHeight: "0.98"
    letterSpacing: "-0.035em"
    fontFamily: "Display, sans-serif"
    fontSize: "clamp(54px, 6.8vw, 88px)"
---

# Reel

Stories with a point of view. A cinematic film index with a working screening room.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#171716`, `#353631`, `#514f47`, `#595851`, `#c2bba9`, `#c4bda9`, `#e5a667`, `#f5f0df`, `#ffffff44`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Space Grotesk (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
