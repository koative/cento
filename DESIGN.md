---
name: Koative Templates Gallery
description: A minimal specimen archive for independent website designs.
colors:
  blue: "#303cdb"
  ink: "#282a29"
  paper: "#fafaf8"
  muted: "#676963"
  line: "#e2e3dd"
  soft-surface: "#efefeb"
  white: "#fff"
typography:
  display:
    fontFamily: '"Manrope", sans-serif'
    fontSize: "clamp(32px, 3.8vw, 50px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Manrope", sans-serif'
    fontSize: "24px"
    fontWeight: 500
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  description:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "12px"
    fontWeight: 400
rounded:
  control: "7px"
  specimen: "12px"
  dialog: "10px"
spacing:
  compact: "8px"
  control-gap: "12px"
  content-gap: "16px"
  section-gap: "24px"
components:
  filter:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  search:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    width: "234px"
  specimen:
    backgroundColor: "{colors.soft-surface}"
    rounded: "{rounded.specimen}"
    width: "100%"
  preview-label:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
---

# Design System: Koative Templates Gallery

## Overview

**Creative North Star: "The Minimal Specimen Archive"**

### Gallery

Experience mode: a quiet, elegant archive of independent website designs. Warm near-white paper, restrained ink typography, and small blue interaction accents let real screenshots carry the visual variety. A compact masthead and short introduction lead directly into a filterable collection; there is no featured hero specimen.

The current implementation in `gallery/main.tsx` and `gallery/styles.css` is the source of these measured tokens. This system applies to the gallery shell; each template retains its own visual world.

**Key Characteristics:**
- Real screenshot specimens in an even, responsive grid.
- Modest typography, open spacing, and compact utility controls.
- Flat surfaces with subtle rules and restrained blue feedback.

### Historical gallery direction

The original gallery used an independent design annual direction: bone paper, electric-blue editorial marks, overscale typography, an asymmetric title and featured specimen, and a two-column collection. That composition and its exploratory seed are historical, superseded by the current minimal archive. The user's delegated creative direction remains in force; implementation does not require separate comp approvals for each template.

## Colors

Blue is the sole gallery accent. Ink carries titles and the selected filter; muted text carries descriptions and utilities. Paper is the continuous page canvas, soft surface backs unloaded screenshots and filter hover states, and line separates major regions. White is used for preview labels and active-filter text. The frontmatter records the implemented values.

**The Specimen Rule.** Let the screenshot supply each template's color; keep the surrounding archive neutral.

## Typography

Manrope provides the introduction and about heading. DM Sans provides navigation, controls, specimen titles, and descriptions. Both fonts are served locally. Display type uses the frontmatter clamp; at the narrow breakpoint it becomes 36px and is constrained to 11ch. Opening body copy is limited to 70ch and becomes 14px on narrow screens. About copy is 14px/1.7 at 65ch. Controls are 13px; secondary labels are 12px, with tabular figures for counts. The hierarchy stays compact enough for previews to dominate.

## Layout

The shared shell is `min(1320px, calc(100% - 96px))`, with an 88px masthead. The introduction has 64px top and 48px bottom padding. Collection controls sit above a ruled result/sort row. The specimen grid has three equal columns, 38px row gaps and 26px column gaps; screenshot frames use a 1.5 aspect ratio. Metadata sits 16px below each frame, followed by description and direct links.

At 1100px and below, side gutters become 32px, the grid becomes two columns, and search wraps to full width. At 680px and below, gutters become 20px, the masthead becomes 72px, the introduction uses 40px/32px vertical padding, and specimens form one column with 30px gaps. Nonessential masthead links collapse; GitHub remains an icon link. About content stacks vertically.

The preview dialog is centered at 96vw by 94dvh, capped at 1600px by 1100px. Its three-column toolbar centers device controls independently of side content. Desktop preview fills the canvas; tablet and mobile previews use 768px and 390px widths, constrained to the available space. At 680px and below, the dialog fills the viewport and device controls are hidden.

## Elevation & Depth

The archive is flat: subtle borders and spacing define sections and specimens, without card shadows. The preview dialog alone uses a structural shadow (`0 24px 100px #0005`) over a dark translucent backdrop (`#191c1ce0`) with 5px blur. This isolates the working demo from the archive.

## Shapes

Controls and preview labels use the control radius; screenshot frames use the specimen radius. Cards remain open on the page, with rounded corners confined to their image. The dialog uses its own radius, becoming square at the narrow breakpoint. Rules are 1px; screenshot borders use translucent ink (`#282a2912`).

## Components

- **Navigation:** compact wordmark and text links; hover feedback turns blue. Navigation links have a minimum 44px height.
- **Filters:** wrapping category buttons with a minimum 40px height; selected state is ink with white text. The All filter alone carries the collection count. Selection is exposed with `aria-pressed`.
- **Search and sort:** bordered search field with a leading icon; native text-only sort control beside the live result count. Search matches names, industries, and tags.
- **Specimen:** a real screenshot opens the interactive preview, as does the title. Sector and description provide context; Live demo and Get the code remain separate direct links. Hover gently scales the image to 1.025 over 0.6s using `cubic-bezier(0.16, 1, 0.3, 1)`; the preview label fades in over 0.2s on hover or keyboard focus.
- **Preview:** native modal dialog with a named iframe, desktop/tablet/mobile buttons, direct demo/source links, close button, and Escape dismissal. Background scrolling is locked while open. Frame width transitions over 0.4s; canvas padding over 0.3s.
- **Empty state:** centered explanation and a Show all templates reset action.
- **About actions:** documentation link and clone-command copy action with temporary confirmation.

All interactive elements use a 2px blue focus outline with 4px offset. Keep the skip link, descriptive accessible names, live result count, and reduced-motion override that disables transitions, animations, and smooth scrolling.

## Do's and Don'ts

- Do preserve the quiet shell and let independent template screenshots lead.
- Do maintain the three-, two-, and one-column responsive progression.
- Do keep preview, live demo, and source access clear and keyboard accessible.
- Don't reintroduce the historical oversized annual hero or featured specimen into this minimal gallery.
- Don't apply the gallery's restrained palette or component styling to the independent template worlds.

### Template worlds

Each folder owns an independent design system, composition, font pairing and motion. No shared hero scaffold. Fictional brands clearly labeled as demos. Real photos with documented asset sources where needed. CSS 3D or real canvas geometry where it supports the sector. Semantic HTML, visible focus, mobile reflow, reduced motion and useful demo interactions are required.

- forma: architectural index, bone/ink, large photographic project table.
- muse: couture editorial, high contrast serif, oxblood, horizontal collection.
- ember: restaurant menu, tomato/cream, tactile food editorial.
- haven: alpine hotel, deep forest, immersive reservation flow.
- pulse: electronic festival, acid lime/violet, kinetic poster and schedule.
- orbit: aerospace, midnight/ice, interactive three-dimensional orbital geometry.
- atelier: creative portfolio, cobalt/yellow, playful draggable-feeling project field.
- terrain: outdoor expedition, rust/sand, route-led journal and trip selector.
- ledger: fintech, plum/pale lilac, interactive financial workspace.
- signal: analytics dashboard, porcelain/teal, dense purposeful data composition.
- still: wellness studio, lavender/burgundy, slow breathing interaction.
- roast: specialty coffee, chocolate/orange, product selector and local cart.

### Second collection (historical expansion)

The user requests twelve additional original themes. At that stage, the gallery retained its original world and extended its catalog to 24. The existing preview dialog is explicitly centered in the viewport; device controls share its centerline. New themes deliberately add new sector and composition families:

- frame: monochrome photography contact sheet with image-led project viewing.
- monograph: independent journal with a newspaper column structure and reading modes.
- index: literary bookstore organized as a bibliographic shelf and detail index.
- bloom: floral studio with photographic arrangements and a bouquet builder.
- velo: performance cycling with racing-red editorial tension and configuration.
- prism: design conference with a typographic programme and track-based schedule.
- nocturne: amber listening bar with a dimensional record deck and a local setlist.
- arcade: indie game playground with a playable memory game and bold geometric identity.
- kiln: ceramic objects displayed on a dimensional plinth and shoppable material studies.
- aura: skincare ritual builder with butter/plum editorial restraint.
- tide: ocean conservation with location-led volunteer actions and photographic storytelling.
- relay: logistics workspace with searchable shipments, route visualization and reporting.

### Sixty-four-template expansion (historical expansion)

The user requests forty more exceptional, different templates across sectors, completing the collection at 64. That expansion preserved the then-current annual-style gallery and added sorting by collection order, newest first, and name. The current Gallery guidance above supersedes that historical shell direction. English throughout. Each new folder has its own durable direction in DESIGN.md; no shared hero renderer or color-switching page factory.

Three parallel collections expand into services and knowledge; industrial and operational products; culture and everyday life. Four additional spatial experiences cover planetarium, city transport, coworking and auctions. Each owns useful local behavior, an authored motion moment, mobile reflow, licensed local assets and a complete standalone Vite entry.
