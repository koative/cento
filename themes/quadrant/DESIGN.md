---
name: Quadrant
colors:
  paper: "#f5f3ee"
  paper-2: "#ebe7de"
  field: "#fcfbf8"
  ink: "#15181d"
  ink-2: "#545961"
  line: "#d6d1c5"
  line-ui: "#7d828a"
  chart: "#c9c4b8"
  accent: "#b8361a"
  accent-ink: "#a8320f"
  accent-soft: "#f1ddd3"
  accent-night: "#ff7a52"
typography:
  display:
    {
      family: "Newsreader",
      sizes: "clamp(2.6rem…5.5rem) display, clamp(2.2rem…4rem) display-2, clamp(1.75rem…2.75rem) h2",
    }
  body:
    {
      family: "Instrument Sans",
      sizes: "1.0625rem body, 0.875rem small, 0.8125rem captions and source lines",
    }
rounded: "2px on controls; photographs and panels are square"
spacing: "gutter clamp(1.25rem…3rem); section clamp(4rem…8.5rem); 12-column feel built from 7/5 and 4/5/3 splits"
---

## Overview

Quadrant is set like a board paper. Consultancies speak in action titles (every heading is a full-sentence conclusion), numbered exhibits with a source line, and the two-by-two matrix the firm is named after. The reader is an executive on a laptop in daylight or on a phone between meetings, so the page is light, quiet and dense where it needs to be, like a well-made deck printed on good paper.

## Colors

Warm paper and near-black ink carry almost everything. One vermilion is the "highlight bar" of consulting charts: it marks the bar that matters in each exhibit, the top-right "Move now" quadrant, the final step of the engagement timeline and focus rings. Chart grey (`chart`) is for the bars that do not matter. The one dark band (home close) uses `accent-night` for links and focus. Body text is AA on every surface; `ink-2` is 6.4:1 on paper.

## Typography

Newsreader (optical sizes, light-to-regular weights, italic for action titles and quotes) carries headings, exhibit titles, case results and names. Instrument Sans carries body, controls, metadata and every number; tabular lining figures are used for values, phone numbers and the heatmap. Tracking never goes below −0.025em.

## Layout

Hairline rules instead of boxes: 1px ink rules open a group, 1px `line` rules separate its items, a 2px ink rule opens an exhibit, a phase or the form. Content sits in asymmetric 7/5 splits with the heading left and the argument right. Cards are avoided; the only filled panels are the matrix section, the case "Recent work" panel and the memo.

## Components

- **Exhibit**: "Exhibit n" label, serif title, horizontal bars with one accent bar, right-aligned tabular values, italic source line.
- **Priority matrix** (signature): four-quadrant plot with draggable, keyboard-movable points, an editable initiative list, an add form with validation and an eight-item limit, and a memo that groups initiatives, warns when "Move now" is over-scored and links to the capability we would start with.
- **Heatmap**: industry × capability table shaded by `color-mix` of accent into paper; column headers are sort buttons.
- **Ruled lists, spec lists, disclosures**: native `<details>` with a drawn plus that turns into a cross.
- **Forms**: labelled fields, inline errors that name the fix, a disabled sending state, and an `aria-live` confirmation naming the partner who will reply.

## Motion

One page-in (fade and 10px rise) on route change, exhibit bars growing from the left, matrix points gliding to their new place (instant while dragged), and the nav underline drawing in. Everything is visible without animation, and `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

- Do write headings as conclusions, and label illustrative figures as illustrative in the source line.
- Do use the accent once per view for the thing that matters.
- Don't add eyebrow labels, icon-card grids, hero stat rows or rounded cards.
- Don't colour bars or text with the accent for decoration.
