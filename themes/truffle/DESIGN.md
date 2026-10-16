---
name: "Truffle"
colors:
  paper: "#f1e6d8"
  ink: "#4c2c27"
  accent: "#a95641"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  display:
    fontWeight: 400
    lineHeight: "1.04"
    letterSpacing: "-0.035em"
    fontSize: "clamp(50px, 6vw, 82px)"
    fontFamily: "Caslon"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Truffle design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Chocolate atelier: cocoa and parchment, angled six-piece box, flavor menu and empty-to-complete gift composition.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Add/remove chocolates, six-piece limit, completion gating and local saved box.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#0004`, `#422924`, `#4b2b25`, `#4c2c27`, `#4c2c2720`, `#4c2c2733`, `#4c2c2738`, `#5e4333`, `#74433b`, `#79815a`, `#9b4857`, `#a95641`, `#a97242`, `#c9b49b`, `#e3d2bd`, `#e8cb9d66`, `#f1e6d8`, `#fff`, `#fff2`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Libre Caslon Text (CSS alias `Caslon`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
