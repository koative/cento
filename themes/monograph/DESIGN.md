---
name: Monograph
colors:
  paper: "#f2ecdd"
  paper-2: "#e8e0cc"
  card: "#faf6ec"
  ink: "#1c1a16"
  ink-2: "#57503f"
  rule: "#c6bba1"
  oxblood: "#8c2b1f"
  lamp-bg: "#1b1814"
  lamp-ink: "#e7dcc6"
  lamp-accent: "#e5a184"
  issue-covers: ["#c58b3c", "#46697a", "#252b3d", "#8c2b1f", "#6d7653"]
typography:
  display:
    {
      family: "Libre Bodoni",
      weight: "400–700, italic",
      sizes: "h1 clamp(2.75rem, 7vw, 5.75rem); issue word clamp(3.5rem, 8vw, 6rem); h2 clamp(1.5rem, 2.4vw, 2rem)",
    }
  body:
    {
      family: "Literata",
      weight: "400–600, italic",
      size: "1.0625rem / 1.6; reader 1.0625–1.375rem / 1.7",
    }
rounded: { control: 2px, cover: 0 }
spacing:
  {
    page-pad: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4rem, 8vw, 7rem)",
    max: 1320px,
    measure: 68ch,
  }
---

## Overview

Monograph is designed as the printed quarterly it describes: cream uncoated stock, black ink, one oxblood second colour, double rules under the masthead and Bodoni headlines. Readers come to it on a sofa or in bed with a phone or tablet, often in the evening, so the site is light paper by default and the reader offers a warm lamplight mode for night reading.

## Colors

Paper and ink carry everything; oxblood (7.5:1 on paper) marks page numbers, the drop cap, side-note numerals, active navigation and the closing subscription band. Each issue owns one cover colour, used only on its CSS cover, where the photograph is blended in luminosity so every cover prints like a two-colour job. Lamplight swaps the reader to near-black with parchment text and a soft clay accent.

## Typography

Libre Bodoni sets the wordmark, headlines, page numbers, prices and the issue words (in italic). Literata sets body text with old-style figures; tables, prices, dates and folios switch to lining tabular figures. Meta lines are small uppercase Literata with 0.08em tracking and always sit below headings, never above.

## Layout

A 1320px column with full-bleed bands for the portfolio (ink) and the subscription close (oxblood). Lists are typeset rather than carded: contents with page folios, a sections index, story rows with plate, headline and print reference. The issue page and subscribe page use a sticky left/right column (cover, order summary).

## Components

- **Cover:** authored in CSS with container units: nameplate, issue line, a luminosity-blended plate photograph and the issue word. Used in the home hero, shelf, archive, issue page and reader end matter.
- **Reader:** sticky reading bar with the live print folio (the page you would be on in the magazine), minutes left, text size steps and a lamplight toggle; preferences persist. Paragraph notes sit in the margin on wide screens and open inline from numbered markers on narrow ones.
- **StoryItem:** plate, headline, standfirst, section/writer/minutes, and the issue and page it ran on.
- **Forms:** native validation with messages that name the fix, loading state on submit, focused confirmation.

## Motion

Pages settle in with a short rise and fade. Covers lift slightly on hover. Lamplight fades the reader's paper to dark over 0.7s, like dimming a lamp; the folio progress line tracks scroll; the mobile menu unrolls with a clip-path. All motion is removed under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep one second colour; let issue colours live only on covers.
- Do give every piece its print reference (issue, page) next to its online data.
- Don't put labels above headlines; section names belong in the byline.
- Don't use cards for page structure; use rules and typeset lists.
