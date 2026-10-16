---
name: "Ripple"
colors:
  paper: "#eef7f0"
  ink: "#174c58"
  accent: "#ce5839"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  display:
    fontWeight: 500
    lineHeight: "1.08"
    letterSpacing: "-0.035em"
    fontSize: "clamp(48px, 6vw, 82px)"
    fontFamily: "Space"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 23px"
---

# Ripple design

Mode: Persuade, with an embedded sector-specific demonstration tool.

## Direction

Pool timetable: cyan swim lanes, deep teal Space type, user-group/day filters and lesson selection.

The user delegated distinct creative directions across a 100-template collection. Impeccable direction seed `8cc53e15`, assigned grounded candidate 7, resolved as **the working studio/counter**: visitors handle the sector's actual objects, choices and outcomes rather than browse generic feature cards. This folder interprets that direction independently. No shared template renderer is used.

## Behavior and composition

Audience/day filters, empty-state recovery, lesson selection and saved plan.

Primary composition and exact local tokens live in `src/styles.css`. Desktop layout uses sector-specific media and a task region; mobile at 700px linearizes the flow and preserves all controls. Artwork remains visible by default. Dimensional product surfaces use authored CSS geometry; motion is confined to one sector-relevant moment where used.

## Accessibility and truth

Native labeled controls, visible 3px focus outlines, pressed states, live confirmations, reduced-motion overrides and themed selection/scrollbars. All example offerings are explicitly fictional. No backend or payment integration. Photos have descriptive alternatives and documented provenance in README.

## Supporting material palette

`#174c58`, `#174c5833`, `#174c5844`, `#67b9c6`, `#ce5839`, `#d8e67e`, `#dcebcf`, `#eef7f0`, `#eef7f066`, `#eef7f077`, `#eef7f0aa`

The supporting shades belong to product materials, photography-adjacent surfaces, print editions, or alpha overlays. They are intentional local tokens.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Space Grotesk (CSS alias `Space`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
