# Tally

Books closed by the 10th. Taxes filed before the deadline. A small-business accounting firm website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: month-end close tape, live "what's due next" deadlines, services ledger, the monthly rhythm ruler, packages, client stories, industries, latest resources, FAQ and a book-a-call close
- `/services` — Services grouped by cadence, onboarding timeline and what the firm doesn't do
- `/services/:slug` — Service detail (8): price card, inclusions, how it runs, the deadlines it covers (live dates), client story, FAQ, related services
- `/pricing` — Three packages with a monthly / yearly billing toggle, line-by-line comparison table, add-ons and pricing FAQ
- `/calendar` — Tax deadline calendar: pick your structure, payroll, contractors and sales-tax frequency; get twelve months of federal dates as tally marks and a list, exportable as .ics
- `/resources` — Guides, checklists and explainers with topic filters and search
- `/resources/:slug` — Article (7) with tables, notes, byline and related reading
- `/about` — Firm story, facts, working principles, team, client quotes, visit details
- `/book` — Book a call: day and time slot picker, validated form, loading and confirmation with calendar export

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data, including deadline rules), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The tax calendar computes the next twelve months of federal deadlines from today's date for the chosen business setup, rolls weekend dates to Monday, remembers the setup in `localStorage` (the header then shows your next date) and downloads an .ics file built in the browser. The booking form, reminder signup and filters all run locally: nothing is sent, booked or charged, and the dates are illustrative rather than tax advice. Tally and everyone in it are fictional.

## Credits

Fonts: Hanken Grotesk (SIL Open Font License). Images: see `src/assets/SOURCES.md` (CC0). Icons: Lucide (ISC). Code: MIT.
