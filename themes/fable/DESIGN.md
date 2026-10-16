---
name: "Fable"
colors:
  paper: "#fff9e9"
  ink: "#34277a"
  accent: "#ef715a"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "-0.035em"
    fontFamily: "Display, sans-serif"
    fontSize: "clamp(60px, 6.8vw, 90px)"
---

# Fable

Big little discoveries. A playful museum programme built for curious families.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#34277a`, `#34277a77`, `#aaa2c6`, `#aacbb8`, `#c24335`, `#c4bfa9`, `#ccd9bb`, `#e8e4f0`, `#ef715a`, `#f09888`, `#f6b5a7`, `#fbd84c`, `#fff9e9`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Space Grotesk (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
