---
name: "Lacquer"
colors:
  paper: "#f6e1dc"
  ink: "#611d32"
  accent: "#a7294c"
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
    fontSize: "clamp(44px, 5.4vw, 75px)"
    fontFamily: "Caslon"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Lacquer design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Nail color studio: rose and burgundy, glossy sculptural color samples, shade strip and a personal appointment card.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Five shades, gloss/matte finish, three services and a locally saved look.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#0002`, `#4d8ab2`, `#611d32`, `#611d3233`, `#747a35`, `#9f192f`, `#a7294c`, `#d6592f`, `#dcb5ba`, `#f3dace`, `#f6e1dc`, `#fff2`, `#fff5`, `#ffffff80`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Libre Caslon Text (CSS alias `Caslon`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
