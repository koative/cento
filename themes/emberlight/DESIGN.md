---
name: "Emberlight"
colors:
  paper: "#f0e7d8"
  ink: "#4c392d"
  accent: "#a36a3b"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "1.03"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(54px, 5.5vw, 78px)"
---

# Emberlight

Light, made slowly. Warm material studies and a personal scent ritual.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#00000018`, `#4c392d`, `#4d352733`, `#51402b`, `#78573530`, `#876b4f`, `#88907a`, `#8a7159`, `#8f7256`, `#916c4c`, `#a36a3b`, `#b8a183`, `#bd8d63`, `#c7bd8d`, `#c8b79f`, `#cbb594`, `#d1c1ac`, `#ddd0ba`, `#e1d1ba`, `#e7a24d35`, `#e9dcc0`, `#f0e7d8`, `#f2e8d75c`, `#ffd58a`, `#fff9e8`, `#ffffff30`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.

The vessel label uses `#302f27` for contrast across all three ceramic colors.
