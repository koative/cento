---
name: "Verdant"
colors:
  paper: "#f2eddf"
  ink: "#31412b"
  accent: "#435b2f"
  on-accent: "#fff"
  line: "#cccdb9"
typography:
  body:
    fontFamily: "DM, sans-serif"
    fontSize: "15px"
    lineHeight: "1.6"
  display:
    lineHeight: "1.02"
    letterSpacing: "-0.035em"
    fontFamily: "Manrope"
    fontSize: "clamp(55px, 5.5vw, 80px)"
    fontWeight: 400
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    padding: "13px 22px"
---

# The neighbourhood growing journal

An arched landscape and serif/sans editorial cover open into a crop-specific raised-bed composition.

## Direction and interaction

Persuade mode. Choose crops and bed count; calculate growing area and illustrative yield; save garden plan.

The user delegates creative direction for this collection. Impeccable context was read once; concept seed `fdff092d` assigned candidate 5. The brief-resolved family is **calibrated operational artifacts**: the real sector-specific object, measurement or working document leads. The 12 surfaces interpret that direction independently rather than share a component renderer. Code-led implementation; no approved raster comp was requested or supplied.

## First viewport

An arched landscape and serif/sans editorial cover open into a crop-specific raised-bed composition. The opening must identify the sector and expose its mechanism or a direct, visible path to it. Fictional brands, data and calculations are labeled in-page.

## Implemented system

Palette values above are extracted from this folder's CSS. The body and display roles use the exact locally declared font stacks recorded above. The main heading follows the display scale above; controls retain visible focus. The layout uses flat surfaces and rules; depth is reserved for a physical artifact where relevant. Native controls retain their keyboard behavior.

## Motion and responsive behavior

The authored sector mechanism uses CSS transitions or animation and is disabled under `prefers-reduced-motion`. The narrow layout stacks operating regions in reading order, preserves all actions and uses flexible content widths. `src/styles.css` is authoritative for precise dimensions and breakpoints.

## Boundaries

No backend, payment, message, real operational command or external service. State lives in component memory and resets on reload. Any model is an explicitly illustrative teaching aid, not professional advice.

## Typography

Body text uses DM Sans (CSS alias `DM`); the main heading uses Manrope (CSS alias `Manrope`). The aliases resolve through local `@font-face` declarations in `src/`; the font files and license notices are bundled under `src/assets/fonts`. Frontmatter captures the desktop main-heading declarations; responsive overrides remain in the stylesheet.
