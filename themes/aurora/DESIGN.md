---
name: "Aurora"
colors:
  paper: "#eef0df"
  ink: "#173e3f"
  accent: "#b7dca6"
typography:
  body:
    fontFamily: "Body, sans-serif"
    lineHeight: "1.5"
  display:
    fontWeight: 400
    lineHeight: "1"
    letterSpacing: "-0.035em"
    fontFamily: "Display, serif"
    fontSize: "clamp(64px, 7.5vw, 96px)"
---

# Aurora

A night worth staying awake for. Polar photography and a considered cabin planner.

Mode: Experience with a task-specific local planning interaction. The user delegated creative direction. Code-led build; no mockup approval is claimed. Shared seed `ae458e69`, assigned grounded candidate 6: a collection of physical-sector artifacts translated into living interfaces, with independent compositions, palettes and navigation rather than a shared hero scaffold.

## Craft

Local type and assets, visible keyboard focus, semantic controls, a 390px reflow, readable contrast and reduced-motion alternatives. Body text uses DM Sans. The main heading uses the source-extracted display scale above. Specific layout and motion tokens are in `src/styles.css`.

## Implemented palette

`#052226b0`, `#07272b55`, `#0b2329`, `#173e3f`, `#5d755d`, `#aeba9d`, `#b7dca6`, `#b9c3ac`, `#bec8b4`, `#c3cdb9`, `#c8cebd`, `#d9e7ce`, `#dae2cc`, `#eef0df`, `#f0f5df55`, `#f3f5e9`

These shades include intentional surface, rule, subject geometry and overlay variants. Preserve the material treatments used by this theme’s own composition.

## Typography

Body text uses DM Sans (CSS alias `Body`); the main heading uses Instrument Serif (CSS alias `Display`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
