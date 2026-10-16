---
name: Elseform
description: An independent open-source design collection presented through artistic liquid glass.
colors:
  ink: "#1e2b3c"
  blue: "#3d518b"
  muted: "#596578"
  paper: "#eef2f8"
  line: "#34496524"
  primary: "#293c55"
  primary-hover: "#415b7e"
  white: "#fff"
  serif-ink: "#425b83"
  masthead-glass: "#ffffff57"
  tool-glass: "#ffffff65"
  card-glass: "#ffffff50"
  card-hover: "#ffffff8a"
  filter-ink: "#536177"
  search-glass: "#e8edf563"
  search-ink: "#5d6c80"
  screenshot-surface: "#e1e6ef"
  preview-surface: "#dfe6f0"
  preview-toolbar: "#f0f4fa"
  preview-backdrop: "#15253bb8"
  dark-ink: "#e5edf9"
  dark-blue: "#b3caff"
  dark-muted: "#afbed3"
  dark-paper: "#0c1320"
  dark-line: "#afc5e529"
  dark-primary: "#c9dcf6"
  dark-on-primary: "#12253e"
  dark-primary-hover: "#e1ecff"
  dark-serif-ink: "#b6cbf2"
  dark-masthead-glass: "#1a263b66"
  dark-tool-glass: "#24334e66"
  dark-card-glass: "#27365050"
  dark-card-hover: "#31436080"
  dark-filter-ink: "#bbcae0"
  dark-search-glass: "#0b162b66"
  dark-search-ink: "#b6c8e1"
  dark-screenshot-surface: "#1b293e"
  dark-preview-surface: "#111c2d"
  dark-preview-toolbar: "#1c2940"
  dark-preview-backdrop: "#030916cf"
  appearance-glass: "#ffffff7d"
  dark-appearance-glass: "#33456355"
typography:
  display:
    fontFamily: '"Manrope", sans-serif'
    fontSize: "clamp(56px, 6.6vw, 92px)"
    fontWeight: 450
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  display-emphasis:
    fontFamily: '"Instrument Serif", serif'
    fontSize: "1.13em"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Manrope", sans-serif'
    fontSize: "30px"
    fontWeight: 500
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "16px"
    fontWeight: 550
    lineHeight: 1.4
  body:
    fontFamily: '"DM Sans", sans-serif'
  introduction:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "15px"
    lineHeight: 1.8
  description:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "12px"
    lineHeight: 1.7
  label:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "11px"
rounded:
  control: "10px"
  saved-toggle: "12px"
  screenshot: "13px"
  primary: "14px"
  tools: "16px"
  dialog: "18px"
  card: "20px"
  masthead: "22px"
spacing:
  filter-gap: "3px"
  inset: "9px"
  control-gap: "12px"
  toolbar-gap: "18px"
  collection-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.primary}"
    padding: "17px 21px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  filter:
    textColor: "{colors.filter-ink}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
  filter-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
  search:
    backgroundColor: "{colors.search-glass}"
    textColor: "{colors.search-ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    width: "245px"
  specimen:
    backgroundColor: "{colors.card-glass}"
    rounded: "{rounded.card}"
    padding: "9px"
  saved-toggle:
    backgroundColor: "#ffffff63"
    rounded: "{rounded.saved-toggle}"
    padding: "10px 15px"
  saved-toggle-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  masthead:
    backgroundColor: "{colors.masthead-glass}"
    rounded: "{rounded.masthead}"
    padding: "0 25px"
    height: "76px"
  button-primary-dark:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.dark-on-primary}"
    rounded: "{rounded.primary}"
    padding: "17px 21px"
  button-primary-dark-hover:
    backgroundColor: "{colors.dark-primary-hover}"
  filter-active-dark:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.dark-on-primary}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
  specimen-dark:
    backgroundColor: "{colors.dark-card-glass}"
    rounded: "{rounded.card}"
    padding: "9px"
  appearance-control:
    backgroundColor: "{colors.appearance-glass}"
    rounded: "12px"
    padding: "0 10px"
  appearance-control-dark:
    backgroundColor: "{colors.dark-appearance-glass}"
    rounded: "12px"
    padding: "0 10px"
---

# Design System: Elseform

## Overview

**Creative North Star: "The Liquid Glass Exhibition"**

Elseform is an independent product identity for a collection of one hundred open-source website designs, created by Koative. A luminous cool ground, translucent surfaces and a moving optical sculpture give the gallery its own character. Large Manrope lettering meets italic Instrument Serif; opaque navy text makes the light appearance legible against the glass. A matching dark appearance places the same composition on deep blue glass with pale text and icy primary actions.

The user explicitly selected artistic liquid glass and authorized a complete homepage identity replacement. This system replaces the earlier gallery worlds. It documents `gallery/main.tsx`, `gallery/styles.css`, `gallery/LiquidArtwork.tsx`, `gallery/useAppearance.ts` and the pre-paint bootstrap in `index.html`; it applies to the gallery shell, not to the independently designed templates. Each theme's own DESIGN.md remains its visual authority.

**Key Characteristics:**

- A procedural refractive loop beside an editorial headline and a real featured preview.
- Translucent navigation, controls and screenshot cards with restrained edge highlights.
- Search, filters, local bookmarks and direct access to working demos and source.
- Light, Dark and live System appearance with persistent local preference.

## Colors

The primary action uses deep slate; the blue token marks focus and interaction. Ink and muted text remain opaque. Paper is the continuous cool background. Translucent white masthead, tool and card surfaces reveal a static ambient field of lilac, blue and rose gradients. The serif accent is a softened blue ink. Modal surfaces use cool solid fills over a translucent navy backdrop. Exact reusable values are recorded above; the shader's colored studio lighting belongs to the sculpture rather than the UI palette.

Unprefixed frontmatter colors describe Light; `dark-*` colors describe the corresponding Dark surfaces and states. Dark uses a deep navy canvas, pale opaque ink, muted blue secondary text and translucent blue panels. The selected filter, saved control and primary action switch to a pale fill with deep ink. The shader changes its studio environment through a `darkMode` uniform; the CSS fallback loop also changes material colors. The geometry and template screenshots remain the same.

**The Clear Specimen Rule.** Keep template screenshots full color and undistorted; glass treatments belong to their surrounding surfaces.

## Typography

Manrope, DM Sans and both upright and italic Instrument Serif are self-hosted under `gallery/assets/fonts`, with bundled license notices. Manrope carries the wordmark, opening headline and section headings. Instrument Serif supplies the emphasized words and empty-state heading. DM Sans carries descriptions, navigation and controls. The display-emphasis role is italic in the implementation; its relative size is measured against the opening headline.

The opening headline is constrained to 10.8ch and its supporting copy to 54ch. At 1100px the headline becomes 70px, at 850px it becomes 61px, and at 680px it uses `clamp(48px, 11.8vw, 76px)` with 1.05 line-height and 11ch width. At 1600px and above it becomes 96px. The enlarged serif word follows its own relative scale. Counts and sorting metadata use tabular figures. Avoid documenting a single size ceiling for every typographic element.

## Layout

The shared shell is `min(1380px, calc(100% - 96px))`. The masthead sits 22px below the page top. The opening is at least 590px high with 112px/85px vertical padding; copy occupies 62% while an absolutely positioned artwork stage occupies the right side. A floating Orbit preview provides a direct route into an actual template. At 1600px the opening and artwork stage grow to 640px.

Collection tools precede a result/sort row and a three-column grid with 25px row gaps and 24px column gaps. Screenshots retain a 1.5 aspect ratio. At 1100px, the shell uses 32px side gutters and two columns. At 850px, search moves below the categories. At 680px, gutters become 18px, the grid becomes one column, and categories use three equal columns. The compact masthead hides its central navigation while retaining the Appearance select and an accessible GitHub source icon. The opening has a minimum height of 730px; its 370px artwork stage sits below the main copy, with the featured preview above the opening footer.

At 900px the header action gap tightens; below 380px the masthead reduces its padding, wordmark, icon and selector widths. At that narrow breakpoint, the opening grows to at least 830px and places the 330px artwork stage 400px from the top, keeping the sculpture below wrapped copy.

The native preview dialog is centered using fixed positioning, zero inset and automatic margins. It measures 96vw by 94dvh, capped at 1600px by 1100px. A three-column toolbar centers device controls independently of left and right content. Desktop fills the canvas; tablet and mobile frames are centered at 768px and 390px, constrained to available width. At 680px the dialog fills the viewport, loses rounded corners and hides device controls.

## Elevation & Depth

Glass depth comes from translucent fills, inset white highlights, soft cool shadows and backdrop blur. The masthead uses 22px blur with 135% saturation; the collection toolbar uses 22px blur with 130% saturation. The featured preview uses 24px blur with 145% saturation. Screenshot pixels themselves are not blurred. Card depth is deliberately lighter than the hero sculpture and modal.

The masthead shadow is `inset 0 1px 0 #ffffffed, 0 8px 28px #364e7510`; cards use `inset 0 1px 0 #fff, 0 6px 20px #364e7508`. The modal retains the stronger `0 24px 100px #0005` shadow and a 14px backdrop blur. Extended shadow, motion and breakpoint records live in `.impeccable/design.json`.

Dark preserves the same blur and radius system, with dimmed inset highlights and deeper shadows. Its masthead uses `inset 0 1px 0 #d6e5ff26, 0 8px 28px #00000024`; its cards use `inset 0 1px 0 #d6e5ff29, 0 6px 20px #00000016`. The modal toolbar, canvas surround and backdrop follow Dark while the embedded templates retain their own authored styles.

**The Optical Boundary Rule.** Reserve refraction for the decorative sculpture; labels, controls and demo content must remain readable and directly operable.

## Shapes

The mark is an offset pair of geometric E forms, drawn as inline SVG. Brand assets are `public/elseform-mark.svg`, `public/elseform-wordmark.svg` and `public/elseform-social.png`. The README picture uses `public/elseform-wordmark-dark.svg` for dark system appearance and the original wordmark otherwise. Rounded rectangles govern navigation, controls, cards and the modal; nested screenshot corners are tighter than their surrounding card. The sculpture is an irregular, softly twisted loop rather than a UI container. Thin translucent rules separate collection, about and footer regions. Keep these roles distinct when adding new components.

## Components

- **Appearance:** a labeled native select offers System, Light and Dark; its sun/moon icon reflects the resolved appearance. System is the default for missing or invalid saved values and follows live `prefers-color-scheme` changes. An explicit choice is written to `elseform-appearance`; failed storage writes retain the selection for the current visit. Storage events synchronize saved preference changes or clearing across tabs. The resolved theme updates the root `data-theme`, CSS `color-scheme` and browser `theme-color` metadata. A synchronous head script resolves saved/System preference before the app paints, with matching inline canvas backgrounds to avoid an initial light background on dark startup.
- **Navigation and opening actions:** the brand returns home, Collection and The idea are in-page links, and Get the source opens the repository. The solid primary action scrolls to the collection. Surprise me chooses an actual entry from the complete catalog and opens its working preview; it does not simulate a result or restrict selection to the current filter.
- **Glass artwork:** a decorative, `aria-hidden` WebGL canvas ray-marches the loop and calculates reflected/refracted procedural studio light. Global pointer movement gently changes orientation. Draws are throttled to roughly 30fps; resolution is bounded by DPR 1.5 and a 900×700 buffer. Animation pauses when the document is hidden, the canvas leaves an 80px viewport margin, or a template preview is open. Modal pause retains the current frame and GPU program; closing the preview resumes the artwork without rebuilding its resources. Reduced motion renders a static pose without pointer response. A CSS ring remains when WebGL is unavailable, initialization fails or context is lost. No external texture is required. Appearance changes update the lighting uniform and redraw a static reduced-motion frame; if the modal has paused rendering, the new lighting is applied on resume without recreating the program.
- **Category, search and sort:** category buttons expose selection through `aria-pressed`; search matches template name, sector and tags without case sensitivity. Sort offers collection order, newest first and name. The result count is a polite live region. The empty state clears category, query and the saved-only view.
- **Bookmarks:** save buttons toggle a catalog slug in local component state and attempt persistence under `elseform-saved`. Loaded values are checked against the catalog. If storage fails, bookmarking still works for the current visit. The saved-only count distinguishes “On this device” from “For this visit”; this supplementary note is hidden on narrow screens. Toggling Saved resets category and search. No account or remote synchronization exists. Save controls remain visible on touch devices, when saved, or when keyboard-focused.
- **Screenshot cards:** a real screenshot and title each open the template preview. Preview labels appear on hover or keyboard focus. Separate Live demo and Get the code links remain available. Screenshot hover enlargement is 1.025 over 0.6s; the surrounding card only changes its glass fill. Orbit is the opening's fixed featured template, not a fictional endorsement.
- **Preview:** opening any template resets to desktop width and a loading message. The named native modal contains a titled iframe and direct demo/source links; close, backdrop click and Escape dismiss it. Background scrolling is locked while open. The iframe element explicitly uses `color-scheme: light` to avoid inheriting the gallery’s dark form-control treatment; each embedded template continues to own its document styles. The footer identifies the selected template as a fictional brand and interactive front-end demo, not Elseform itself as fictional.
- **Documentation and copy:** the documentation link opens the repository README. Copy the clone command reports success for 2200ms or shows an explicit failure message with a documentation fallback.

Interactive elements use a 2px blue focus outline with 4px offset. Preserve the skip link, native control semantics, accessible names and pressed states. The reduced-motion stylesheet disables transitions, animations and smooth scrolling in addition to the artwork's static mode. The sidecar snippets demonstrate appearances and CSS states; their actual application behaviors live in React.

## Do's and Don'ts

- Do preserve the liquid-glass identity and opaque readable text.
- Do show actual screenshots and working previews with direct source access.
- Do keep device previews and their toolbar controls centered.
- Do preserve local bookmarking and appearance selection when persistent storage is unavailable.
- Do keep Light and Dark as material variants of the same composition, and let System respond to operating-system changes.
- Don't distort screenshots or embed essential information only in the sculpture.
- Don't apply the gallery's palette or component styling to independent template worlds.
- Don't invent customers, endorsements, backend capabilities or brand-clearance claims.
