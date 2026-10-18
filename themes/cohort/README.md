# Cohort

First checks for the industrial middle. A venture capital firm website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: recent financings as tombstones, the four domains, the portfolio ledger, a founder's word, the ten-day process, the round modeller, partners, writing and a pitch call to action
- `/portfolio` — Portfolio: search, domain chips, status filter, sort, and a tombstone/ledger view toggle grouped by class year
- `/portfolio/:slug` — Company: facts, photograph, what they do, the investment memo, round history as tombstones, founder quote, related companies
- `/thesis` — Thesis: beliefs, each domain's look-for and pass-on lists, open questions for 2026
- `/team` — Team: firm story, partners, staff, offices and the fund table
- `/team/:slug` — Partner: bio, focus, how to pitch them (pre-selects them in the pitch form), board companies, their writing
- `/writing` — Writing: essays filtered by topic and searchable
- `/writing/:slug` — Essay: long-form reader with pull quotes, author note and further reading
- `/founders` — For founders: standard terms, the ten-day process, round modeller, FAQ
- `/pitch` — Pitch form with validation, loading and confirmation states
- Any other path — Not found

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (portfolio, partners, essays, terms, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The portfolio and writing filters, the round modeller and the pitch and newsletter forms all run locally in the browser. The pitch form validates every field, simulates sending and shows a reference number with a reply date ten working days out; nothing is sent, stored or charged. Cohort, its partners, portfolio companies and figures are fictional.

## Credits

Fonts: Libre Caslon Display and Geist (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
