# Surge

Growth you can read in the numbers. A growth marketing agency website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: live experiment readout board, client strip, service index, featured case with test results, the weekly loop, ROI teaser slider, more case studies, client quote, team, proposal close
- `/services` — Six services as a spec sheet plus engagement plans with a monthly / quarterly billing toggle
- `/services/:slug` — Service page: scope, numbers it moves, what's included, first-weeks timeline, discipline lead, related cases, FAQ
- `/work` — Case studies filterable by service and industry, sortable by date, lift or client, with an empty state
- `/work/:slug` — Case study: headline result, facts, problem and approach, experiment log (control vs variant, confidence, shipped or not), funnel before/after, results, quote, pod, next case
- `/roi` — ROI model: revenue, margin, engagement and maturity inputs drive a 12-month revenue band chart, cumulative return bars, payback month and a monthly table; attaches to a proposal
- `/approach` — The weekly loop, first 90 days, how tests are called, what we need from you, FAQ
- `/team` — Discipline leads with bios, values, how a pod is staffed, open roles
- `/proposal` — Proposal request form with validation, attached ROI model, loading and success states
- Any other path — Not found page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, services, plans, case studies, team, ROI assumptions). `src/styles.css` holds the design tokens at `:root`. Images live in `src/assets`.

## Demo behaviour

The ROI model runs entirely in the browser on the assumptions in `content.ts` and carries its inputs to the proposal form in the URL. Case-study filters, the billing toggle, the proposal form and the newsletter sign-up validate and respond locally; nothing is sent, stored or charged. Surge, its clients, people and results are fictional.

## Credits

Fonts: Kanit and Inter Tight (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
