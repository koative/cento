# Margin

The quiet parts of everyday software, annotated in the margin. A product designer portfolio website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: name and statement beside an annotated client screen with live redlines, three featured case studies, an annotated "How I work" passage, an index table of all work, an embedded easing tool, client quotes, teams, a "Now" list and a closing call to action.
- `/work` — Case studies: discipline filter, sector filter, sort, live result count and an empty state.
- `/work/:slug` — Case study (six of them): role/team/duration in the margin, annotated hero screen, outcomes, brief, research findings, two decisions with a second annotated screen, timeline, client quote, reflection, credits, next and related cases.
- `/playground` — Easing lab (draggable cubic-bezier handles, presets, run and copy), type scale calculator, WCAG contrast checker and a sketch log.
- `/about` — Portrait and bio, work photographs, how a project runs, principles, outside work.
- `/resume` — Experience with dates in the margin, skills and tools, talks, education; print-friendly with a "Print or save as PDF" button.
- `/contact` — Project enquiry form (work type, name, email, company, budget, timing, message) with validation, loading and success states; contact details and FAQ.

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data, including the case study screens (each mockup is a list of UI blocks plus pinned notes). `src/styles.css` holds the tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Redlines on case study screens are measured live from the rendered layout; pins and margin notes select each other. The playground tools run entirely in the browser (copy uses the clipboard when available). The enquiry form and newsletter sign-up validate in the browser and show a success state, but nothing is sent or stored anywhere. Nora Vale, Margin and every client, person and result shown are fictional.

## Credits

Fonts: Instrument Serif and Instrument Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
