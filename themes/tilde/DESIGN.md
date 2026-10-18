---
name: Tilde
colors:
  paper: "#f3f1ea"
  paper-2: "#e8e5db"
  raised: "#faf9f5"
  ink: "#161618"
  ink-2: "#55534c"
  line: "#d6d2c6"
  line-2: "#aba69a"
  link: "#2438c4"
  mark: "#f2d64b"
  ochre: "#765b00"
  add: "#1b6e38"
  del: "#b3261e"
  shell-bg: "#161618"
typography:
  display:
    {
      family: "DM Mono",
      weight: 500,
      sizes: "h1 clamp(2.3rem, 1.4rem + 3.6vw, 4.25rem); case h1 up to 5.5rem; h2 clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem)",
    }
  body:
    {
      family: "Schibsted Grotesk",
      weight: "400–650",
      size: "1.0625rem / 1.6; posts 1.125rem / 1.7",
    }
rounded: { control: 4px, panel: 10px }
spacing:
  {
    page-pad: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(3.5rem, 8vw, 6.5rem)",
    max: 1240px,
  }
---

## Overview

Tilde is a personal site that behaves like the documents developers actually live in: man pages, READMEs, `ls -l`, `git log`, diffs and dotfiles. Visitors are hiring leads and other engineers on laptops during the working day, so the default is printed-page light (warm paper, near-black ink) with a stored dark scheme for night readers, as every developer blog offers.

## Colors

Paper and ink carry almost everything. Link blue is the single interactive colour (links, focus ring, the "after" benchmark bar, the caret). Search-match yellow marks state, never text: the active nav item, the selected dotfile, the cursor block in the logo, the highlighted word in the hero, open months in the calendar and text selection. Green and red only mean what they mean in a diff: `+` lines in the résumé, validation errors. Commit hashes use ochre (5:1 on paper). The shell is always ink, in both schemes.

## Typography

DM Mono sets headings, navigation, labels, metadata, data tables and code, because on a developer's site those really are code and data. Schibsted Grotesk sets reading text, post titles in lists, quotes and the case-study prose. Tracking stays between −0.01 and −0.04em; tabular numerals are on for dates, hashes and benchmark values.

## Layout

Content sections use a man-page grid: the heading hangs (and sticks) in a 15rem left column while the body runs on the right under a single ink rule; below 760px they stack. Lists are tables and hairline rows rather than cards: projects as `ls -l`, recent activity as `git log`, experience as commits. Page width is 1240px.

## Components

- **Shell (`tsh`)**: a real interpreter over `content.ts` (`help`, `ls`, `cd`, `cat`, `open`, `whoami`, `pwd`, `history`, `theme`, `hire`, `clear`), tab completion, arrow history, clickable `ls` output and suggestion buttons for touch. Output is an `aria-live` log.
- **Flow**: each project's data path as nodes on a rule, horizontal on desktop, vertical on phones.
- **Bench**: an accessible table with before/after bars and the speed-up factor.
- **Code**: file caption, line numbers from CSS counters, comments dimmed.
- **Dotfiles**: vertical tablist with arrow keys and copy to clipboard.
- **Calendar**: eight months of availability, booked months struck through.

## Motion

Pages settle in with a short ease-out rise. The header path types itself on every route change, the logo cursor blinks, a yellow packet travels along each pipeline, and benchmark bars grow once. All of it stops under `prefers-reduced-motion: reduce`; nothing is hidden before it animates.

## Do's and Don'ts

- Do keep mono for things that are code, data or labels; prose stays in the grotesk.
- Do use yellow only as a highlight behind ink text.
- Don't add cards, gradients or shadows beyond the shell and the mobile menu.
- Don't publish a number without saying what it measured.
