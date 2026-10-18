# Shortlist

Fewer, better jobs. Every one shows the pay. A job board website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: search, today’s column of listings, browse by trade, house rules, pay teaser, employers hiring, filled this week, testimonial, employer pitch, close
- `/jobs` — Find jobs: keyword and location search, trade/workplace/level/hours filters, pay floor slider, sorting, shortlist toggles
- `/jobs/:id` — Job page: key facts box, duties and requirements, pay against the market ruler, hiring steps, company card, related jobs
- `/jobs/:id/apply` — Apply: validated application form with CV upload, sending state and confirmation
- `/companies` — Companies: industry chips, search, sort by open roles or reply time
- `/companies/:slug` — Company page: facts, story, quote, benefits, offices, open roles
- `/post` — Post a job: plans with monthly/yearly toggle, add-ons, listing draft form with live preview and house-rules check, FAQ
- `/salaries` — Salary guide: role/city/level checker with offer percentile, sortable median table, method
- `/shortlist` — Your shortlist: ranked list with reorder/remove, side-by-side comparison, applied status
- `/about` — About: story, house rules, the desk, contact

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Shortlisting a job circles it in red pen and saves it, with its applied status, to `localStorage` (the site still works when storage is blocked). Search, filters, sorting, the salary checker and the shortlist comparison run entirely in the browser on sample data. The application, listing and newsletter forms validate and show a success state, but nothing is uploaded, sent or charged. Shortlist, its employers, people and figures are fictional.

## Credits

Font: Instrument Sans (SIL OFL 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
