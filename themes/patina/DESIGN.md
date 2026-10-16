---
name: "Patina"
colors:
  paper: "#e9e4d9"
  ink: "#3e3028"
  accent: "#a0442e"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  display:
    fontWeight: 400
    lineHeight: "1.1"
    letterSpacing: "-0.035em"
    fontSize: "clamp(48px, 5.5vw, 78px)"
    fontFamily: "Caslon"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Patina design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Furniture salon: an inset editorial title over interior photography, timber tones, inventory rows and an object study.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Decade filtering, piece selection, shortlist and care disclosures.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#3e3028`, `#3e302855`, `#604532`, `#655744`, `#775842`, `#943b29`, `#a0442e`, `#b79565`, `#d4c9b7`, `#e9e4d9`, `#f5eee2`, `#f5eee266`, `#fff`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Libre Caslon Text (CSS alias `Caslon`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
