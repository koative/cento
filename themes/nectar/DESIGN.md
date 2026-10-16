---
name: "Nectar"
colors:
  paper: "#f5e9c8"
  ink: "#513b20"
  accent: "#9c431d"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  display:
    fontWeight: 400
    lineHeight: "1.07"
    letterSpacing: "-0.035em"
    fontSize: "clamp(48px, 6vw, 80px)"
    fontFamily: "Caslon"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Nectar design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Apiary tasting: golden paper, meadow green, a floating dimensional jar and a flavor-to-pairing index.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Harvest switching, jar quantities and demo basket confirmation.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#0002`, `#513b20`, `#513b2033`, `#513b2044`, `#70411f`, `#82582d`, `#9c431d`, `#b9701f`, `#d3a53b`, `#d6d8a3`, `#f5e9c8`, `#f9f1d8`, `#fff3`, `#fff4`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Libre Caslon Text (CSS alias `Caslon`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
