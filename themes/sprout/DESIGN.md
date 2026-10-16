---
name: "Sprout"
colors:
  paper: "#edf0df"
  ink: "#304f2d"
  accent: "#a24d23"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  display:
    fontWeight: 500
    lineHeight: "1.04"
    letterSpacing: "-0.035em"
    fontSize: "clamp(50px, 6vw, 82px)"
    fontFamily: "Space"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Sprout design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Nursery planner: garden greens, Space lettering, simple botanical geometry, sunlight selection and planted shortlist.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Sunny/shady filters, plant add/remove, growing-space choice and plan save.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#304f2d`, `#304f2d33`, `#304f2d44`, `#456d3d`, `#486340`, `#597444`, `#78935b`, `#806f9a`, `#a24d23`, `#ae6946`, `#c4d39b`, `#d9e0c7`, `#e3bc5a`, `#edf0df`, `#edf0df88`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Space Grotesk (CSS alias `Space`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
