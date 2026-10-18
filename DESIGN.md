---
name: Cento
description: The gallery shell for 100 complete, multi-page website templates: a quiet, exact marketplace where the screenshots do the talking.
colors:
  accent: "#2356e8"
  accent-hover: "#1b47c9"
  on-accent: "#ffffff"
  accent-soft: "#eef3ff"
  ink: "#0b0b0d"
  ink-2: "#52525b"
  ink-3: "#6b6b74"
  bg: "#ffffff"
  bg-2: "#f6f6f7"
  bg-3: "#ececee"
  line: "#e6e6e9"
  line-2: "#d4d4d8"
  favourite: "#d1203f"
  on-screenshot: "#ffffff"
  on-screenshot-hover: "#f1f1f3"
  on-screenshot-ink: "#0b0b0d"
  preview-backdrop: "#0a0a0d99"
  dark-accent: "#6d95ff"
  dark-accent-hover: "#8eadff"
  dark-on-accent: "#0b0b0d"
  dark-accent-soft: "#17213d"
  dark-ink: "#f4f4f5"
  dark-ink-2: "#a8a8b1"
  dark-ink-3: "#8d8d96"
  dark-bg: "#0b0b0d"
  dark-bg-2: "#141417"
  dark-bg-3: "#1d1d21"
  dark-line: "#26262b"
  dark-line-2: "#3a3a41"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  xs: "6px"
  inner: "7px"
  sm: "8px"
  md: "10px"
  card: "12px"
  frame: "14px"
  lg: "16px"
  dialog: "18px"
  full: "999px"
spacing:
  2xs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  gutter: "32px"
  gutter-sm: "20px"
  grid-row: "48px"
  hero-gap: "64px"
  section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-line:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-line-hover:
    backgroundColor: "{colors.bg-2}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
  button-sm:
    rounded: "9px"
    padding: "0 12px"
    height: "34px"
  button-on-screenshot:
    backgroundColor: "{colors.on-screenshot}"
    textColor: "{colors.on-screenshot-ink}"
    rounded: "{rounded.md}"
    padding: "0 13px"
    height: "36px"
  button-on-screenshot-hover:
    backgroundColor: "{colors.on-screenshot-hover}"
  chip:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.full}"
    padding: "0 14px"
    height: "36px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  shortcut-pill:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "30px"
  search-hero:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0 52px 0 46px"
    height: "54px"
  search-bar:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 10px 0 34px"
    height: "36px"
    width: "200px"
  select:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 32px 0 12px"
    height: "36px"
  card-shot:
    backgroundColor: "{colors.bg-2}"
    rounded: "{rounded.card}"
  tag:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "6px 9px"
  browser-frame:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.frame}"
  browser-chrome:
    backgroundColor: "{colors.bg-2}"
    padding: "0 14px"
    height: "40px"
  url-pill:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.inner}"
    padding: "0 10px"
    height: "24px"
  command:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "4px 4px 4px 14px"
    height: "42px"
  segmented:
    backgroundColor: "{colors.bg-2}"
    rounded: "{rounded.md}"
    padding: "3px"
  segmented-active:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inner}"
    height: "30px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
  preview-dialog:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
  preview-stage:
    backgroundColor: "{colors.bg-3}"
    padding: "20px"
---

# Design System: Cento

This file governs the Cento gallery shell only: the catalogue page, its sticky filter bar, the preview dialog, the toast, the favicon and mark. Every template under `themes/<slug>/` carries its own `DESIGN.md`, and that file is the sole authority for its template. The gallery never styles a template; the live preview iframe stays on a white, light-scheme ground so each template renders exactly as it ships.

## Overview

**Creative North Star: "The Quiet Storefront"**

Cento's gallery is a template marketplace done straight: white ground, near-black ink, a short run of zinc greys and one blue. The screenshots are the only loud thing on the page; the chrome around them is small, exact and fast, so a visitor's eye goes to the work and their hand goes to two actions, Preview and Get the code.

Density is generous at the grid and tight in the controls. Cards are large (three across at full width, 1200 × 750 screenshots), separated by wide gutters rather than boxes. Controls are compact 34–40px pills and rounded rectangles in one family, Geist, with Geist Mono held back for things you would paste into a terminal. Depth is soft and single-layered: things rest flat on hairlines and lift only when you reach for them. Every live template is presented inside a browser frame, which is the system's one recurring signature form.

Dark is a true second appearance on the identical structure, not an inversion: greys are re-tuned, the blue lightens for contrast, and shadows give way to hairline rings where they would vanish.

**Key Characteristics:**
- White / near-black / zinc / one blue; dark appearance on the same structure.
- Geist throughout; Geist Mono only for paths, URLs and commands.
- Large screenshot cards with hover- and focus-revealed actions.
- Browser-chrome frames around every featured or live template.
- Soft single-layer elevation on interaction; flat at rest.
- One easing curve, short durations, reduced motion honoured.

## Colors

A neutral zinc scale carries the whole interface; a single cobalt blue marks the path to the code.

### Primary
- **Cobalt Action** (`accent`; dark: `dark-accent`): the Get the code and Copy command buttons, focus outlines, text selection, the caret, the active thumbnail in the featured rail, and the Saved filter when it is on (over **Cobalt Wash**, `accent-soft` / `dark-accent-soft`). Hover deepens to `accent-hover` in light and brightens to `dark-accent-hover` in dark. The focus ring on inputs is this blue mixed to 22% opacity.
- **On-Accent** (`on-accent`; dark: `dark-on-accent`): label colour on the blue; white in light, near-black in dark because the dark blue is light.

### Secondary
- **Favourite Red** (`favourite`): the heart on a card turns this colour on hover and when saved. It appears nowhere else.

### Neutral
- **Ink** (`ink`; dark: `dark-ink`): headings, body text, the active category chip (filled), the toast, the logo tile and the rule above each How-to step.
- **Zinc Text** (`ink-2`; dark: `dark-ink-2`): secondary copy: lede, card sector line, nav links at rest, chip labels, tags.
- **Quiet Zinc** (`ink-3`; dark: `dark-ink-3`): tertiary text: template numbers, counts inside chips, placeholders, icons inside inputs, the URL pill.
- **Paper** (`bg`; dark: `dark-bg`): page ground, card-action surfaces, dialog body, inputs at rest.
- **Wash** (`bg-2`; dark: `dark-bg-2`): screenshot placeholders, browser chrome, tags, command boxes, hover fills, the compact search field, segmented-control tracks.
- **Deep Wash** (`bg-3`; dark: `dark-bg-3`): the preview stage behind the live iframe, the count badge, shortcut-pill hover.
- **Hairline** (`line`; dark: `dark-line`): card rings, chip borders, the stuck-bar bottom edge, footer and dialog dividers.
- **Firm Hairline** (`line-2`; dark: `dark-line-2`): outline buttons, the hero search border, dashed empty-state border, browser dots, scrollbar thumbs.
- **On-Screenshot White** (`on-screenshot`, `on-screenshot-hover`, `on-screenshot-ink`): the Preview button and heart that sit on top of screenshots. Fixed in both appearances.
- **Preview Backdrop** (`preview-backdrop`): the dimmed page behind the open preview dialog.

### Named Rules
**The One Blue Rule.** Blue means "take this template": the code button, the copy button, focus, and the active saved state. Selection of a filter is shown in ink (the filled chip), never in blue.

**The Screenshot-Constant Rule.** Any control placed on a screenshot is white with near-black ink in both appearances, because the image under it does not change with the theme.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, sans-serif), self-hosted woff2, weights 400 / 500 / 600
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace), weights 400 / 500

**Character:** One neutral grotesque in three weights does every job, tightened with negative tracking as size grows; the mono appears only where the text is literally a path or a command.

### Hierarchy
- **Display** (600, 64px stepping to 56 / 48 / 52 / 42px across breakpoints, 1.02, -0.035em, balanced wrap): the hero headline only.
- **Headline** (600, 30px, 1.1, -0.03em): section headings such as How to use a template.
- **Title** (600, 22px, -0.02em; 19px on phones): the results heading, with its count in Quiet Zinc at weight 400. The preview dialog's template name and the empty-state heading use the same voice at 18px.
- **Title Small** (600, 16.5px, -0.01em): card names and step names; the featured template name runs at 17px.
- **Lede** (400, 19px, 1.55, max 31em, pretty wrap; 18 / 17px on smaller screens): the single promise line under the headline.
- **Body** (400, 16px, 1.5): base text; the empty-state and How-to intro sit at 15–15.5px.
- **Body Small** (400, 14px): card sector lines, facts row, footer, toast, chips.
- **Label** (500, 14.5px; 14px on small buttons and chips): buttons, nav links, segmented controls.
- **Caption** (400–500, 12.5px): tags, featured-rail names, chip counts.
- **Mono** (Geist Mono 400, 13px, 1.45; URL pill 12.5px): degit and run commands, inline code, the URL in browser chrome.

### Named Rules
**The One Family Rule.** Geist for everything. Geist Mono only for text the user would paste or a path they would see in an address bar. No display or serif face.

**The Tabular Count Rule.** Every number that counts something (template totals, chip counts, page counts, template numbers) uses tabular figures.

## Layout

A centred container of 1248px content plus a 32px gutter on each side (gutter drops to 20px at ≤760px). The header is a 64px row (60px on phones): logo, primary nav, then tools on the right (Saved, appearance switch, GitHub).

The first viewport is a two-column hero (0.8fr copy / 1.2fr feature, 64px gap): headline, lede, large search with a `/` shortcut hint, category shortcut pills and a facts row on the left; the featured template in a browser frame with a 92px thumbnail rail on the right. At ≤1240px the rail moves under the frame; at ≤900px the hero stacks to one column and the nav collapses into a menu button.

Directly below, a sticky filter bar (68px tall) holds a horizontally scrolling category chip rail with edge fades and scroll buttons, compact search and the Saved toggle. It gains a bottom hairline only once the hero has scrolled away. At ≤760px the tools move above the chips.

The template grid is three columns with 48px row and 32px column gaps, two columns at ≤1100px (44px / 28px), one column at ≤760px (36px). The How to use section sits 128px below (104 / 88px on smaller screens) as a 0.8fr / 2.2fr split whose steps are full-width rows so each command reads whole. Spacing otherwise moves in 4 / 6 / 8 / 12 / 16 / 24px steps inside components.

**The Big-Picture Rule.** Screenshots are always shown at the full 1200 × 750 aspect, never cropped to a different ratio, tinted or desaturated.

## Elevation & Depth

Flat at rest, lifted on intent. Cards rest on a 1px hairline ring with no shadow; on hover or keyboard focus the screenshot rises 4px and takes the lift shadow. The featured browser frame carries a soft, long frame shadow permanently because it is the single hero object; it rises 3px on hover. Floating layers (menu, toast) use the pop shadow. In dark, frames and the live preview frame drop shadows in favour of a 1px ring of ink at 14%, since shadows disappear against near-black.

### Shadow Vocabulary
- **Lift** (`0 18px 40px -16px rgb(16 18 27 / 0.28), 0 4px 10px -4px rgb(16 18 27 / 0.08)`): card screenshot on hover or focus.
- **Frame** (`0 40px 80px -32px rgb(16 18 27 / 0.3), 0 10px 24px -12px rgb(16 18 27 / 0.1)`): the featured browser frame.
- **Pop** (`0 16px 40px -12px rgb(16 18 27 / 0.35)`): mobile menu and toast.
- **Dialog** (`0 40px 120px -20px rgb(0 0 0 / 0.5)`): the preview dialog over its backdrop.
- **Thumb** (`0 1px 3px rgb(16 18 27 / 0.12)`): the selected segment in segmented controls and the appearance switch.

Dark-appearance values for lift, frame and pop are heavier black versions of the same shapes; they live in the sidecar.

### Named Rules
**The Rest-Flat Rule.** A resting surface is defined by a hairline or a wash, never a shadow. Shadow is a response to hover, focus or floating.

**The Ring-in-the-Dark Rule.** In the dark appearance, framed templates use a 1px ink-14% ring instead of a shadow.

## Shapes

Softly rounded rectangles with radii that grow with the object: 6px tags, 7px inner segments and URL pills, 8px nav links, 10px buttons, inputs and command boxes, 12px cards and the hero search, 14px browser frames and the menu, 16px empty state, 18px preview dialog. Filter chips and shortcuts are full pills; the heart, chip-scroll buttons and browser dots are circles. The mark is a 26px near-black tile at 7px radius holding a white C with a blue dot; the favicon is the same drawing and swaps to a light tile under a dark OS preference.

**The Browser Frame Rule.** A template shown live or featured sits inside browser chrome: a Wash bar with three grey dots and a centred mono URL pill reading `themes/<slug>`, 14px outer radius, clipped content.

## Components

Compact, precise and quiet; every control is one family of 34–40px rounded rectangles and pills.

### Buttons
- **Shape:** gently rounded (10px; 9px on the 34px small size).
- **Primary:** Cobalt Action fill with On-Accent label, 40px tall, 16px side padding, 14.5px / 500, icon gap 8px. Reserved for Get the code and Copy command.
- **Ink:** near-black fill, Paper label; hover mixes 16% Paper in. Used for the empty-state reset.
- **Line:** Paper fill with Firm Hairline border; hover to Wash. Preview, Open live, Source on GitHub.
- **Ghost:** transparent with Zinc Text; hover to Wash and Ink. Header Saved, close, copy icons.
- **On-screenshot:** white with near-black label, 36px tall, with its own drop shadow (`0 6px 16px -6px rgb(0 0 0 / 0.4)`).
- **Hover / Focus / Active:** colour transitions at 0.2s; press nudges down 1px; keyboard focus shows a 2px Cobalt outline offset 2px.
- **Icon buttons:** square at the button height. Icons are Lucide outline at 18px, 1.75 stroke (16px inside small controls).

### Chips
- **Category chip:** 36px pill, Paper fill, Hairline border, Zinc Text 14px / 500 with a Quiet Zinc count; hover firms the border and darkens the text. Selected: filled Ink with Paper text.
- **Shortcut pill:** 30px pill in Wash, 13.5px / 500; hover to Deep Wash.
- **Tag:** 6px-radius Wash label at 12.5px; at most two per card.
- **Count badge:** 20px Deep Wash pill with a 12px tabular number.

### Cards / Containers
- **Corner Style:** 12px screenshot, clipped.
- **Background:** Wash placeholder behind the image; no container box around the card text.
- **Shadow Strategy:** hairline ring at rest, Lift on hover/focus (see Elevation & Depth).
- **Border:** 1px Hairline ring drawn as a box-shadow.
- **Internal Padding:** none on the image; meta row sits 16px below (name left, `No. 001` tabular number right), sector line 2px below, tags 12px below.
- **Actions:** Preview (on-screenshot) and Get the code (primary) slide up 8px and fade in along the bottom edge on hover or focus; the heart scales in at the top-right. On touch devices they are always visible.

### Inputs / Fields
- **Hero search:** 54px tall, 12px radius, Firm Hairline border, faint 1px shadow, leading search icon, trailing `/` key hint that hides on focus or input.
- **Bar search:** 36px, 10px radius, Wash fill with Hairline border, turning Paper on focus.
- **Select:** 36px, 10px radius, Hairline border, custom chevron, firming on hover.
- **Focus:** border turns Cobalt with a 4px (hero) or 3px (compact) ring of Cobalt at 22%.

### Navigation
- **Header links:** 14.5px / 500 Zinc Text with 8px radius; hover and the current section (tracked by scroll) get Wash and Ink.
- **Appearance switch:** a 3px-padded Wash track with three 30 × 28px icon radios (System, Light, Dark); the checked one becomes a Paper thumb with the Thumb shadow.
- **Mobile:** at ≤900px a menu button opens a 14px-radius Paper panel with Pop shadow and 46px rows; Escape and outside clicks close it.
- **Footer:** small logo, credit line and plain text links that underline on hover.

### Preview Dialog (signature)
A native modal dialog inset 16px from the viewport (full-bleed, square-cornered on phones) at 18px radius, opening with a 0.5s rise-and-settle. Top bar: template name and sector/page count, a segmented device switch (Desktop / Tablet 834px / Phone 390px), a page select, Open live, Source on GitHub, close. Middle: a Deep Wash stage holding the live iframe in a browser frame whose width animates between devices; a Wash loading line covers the frame until the page loads. Foot: the degit command box with a primary Copy command button that reports Copied or Couldn't copy, beside a quiet note that the brand is fictional.

### Toast
Ink pill-rectangle (12px radius) centred 24px from the bottom with Pop shadow, a check or alert icon, the message and the copied command in mono. It rises 16px into place; success stays 3.2s, failure 9s.

## Do's and Don'ts

### Do:
- **Do** keep blue for the code action, focus and the active saved state; show selected filters in ink.
- **Do** frame every featured or live template in browser chrome with a mono `themes/<slug>` URL pill.
- **Do** keep resting cards flat on a 1px hairline and lift them (4px, Lift shadow) only on hover or focus.
- **Do** reveal card actions on both hover and keyboard focus, and show them permanently where there is no hover.
- **Do** swap shadows for a 1px ink-14% ring on framed templates in the dark appearance.
- **Do** use the single `cubic-bezier(0.16, 1, 0.3, 1)` curve, 0.2s for colour changes and 0.3–0.5s for movement, and drop movement under reduced motion.
- **Do** set every count in tabular figures.

### Don't:
- **Don't** let the gallery's tokens, fonts or appearance reach into a template; each template follows its own `themes/<slug>/DESIGN.md` and previews on white.
- **Don't** crop, tint, blur at rest or recolour screenshots; they stay full colour at 1200 × 750.
- **Don't** introduce a chromatic colour beyond the blue accent and the favourite red on saved hearts.
- **Don't** add a second type family or use Geist Mono for anything that is not a path, URL or command.
- **Don't** put shadows on resting surfaces or stack more than one elevation on an element.
- **Don't** make controls on screenshots follow the theme; they stay white in both appearances.
