# Cadence

Hire good people with a steady beat. A hiring & ATS software website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: product board in the hero, stage promises, the interview loop composer, interview kits, candidate messages, a featured customer story, fairness practices, more stories, pricing teaser and close
- `/product` — Product tour: six modules (jobs, pipeline, kits, scorecards, messages, reports) with authored UI, integrations and data handling
- `/pricing` — Plans with a monthly/yearly toggle, comparison table and pricing FAQ
- `/customers` — Customer stories with industry filter and search
- `/customers/:slug` — Story page: photo, facts, challenge, practices, their interview loop, quote, outcome, related stories (7 stories)
- `/changelog` — Releases filterable by New / Improved / Fixed
- `/about` — Company story, principles, team and careers note
- `/demo` — Walkthrough booking form with validation and confirmation
- `/signin` — Sign in / start free forms (UI only)
- `/app` — Demo overview: today's interviews, overdue candidates, SVG charts
- `/app/jobs` and `/app/jobs/:id` — Jobs table with status filter; pipeline board per role with keyboard-operable moves
- `/app/candidates` and `/app/candidates/:id` — Sortable, filterable candidates table; profile with stage control, scorecards, notes and activity
- `/app/kit` and `/app/kit/:id` — Interview schedule and a structured interview kit with rubric scoring and validated scorecard submission

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The loop composer, pricing toggle, filters, forms and the whole `/app` workspace run in the browser only. Moving candidates, adding notes and submitting scorecards update in-memory demo state that resets on reload; the booking, sign-in and newsletter forms validate and confirm locally. Nothing is sent, stored on a server or charged. Cadence, its customers, people, prices and figures are fictional.

## Credits

Font: Outfit (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
