# Fixture

A fixed price before the work. A two-year warranty after it. A plumbing & electrical services website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: dual-trade hero with next open window and office status, the ten jobs with from-prices, a sample carbon-copy estimate, how a visit runs, emergency band, rate card, reviews, service-area map, promises and licences, booking close
- `/services` — Services: trade filter, search and sort over all ten jobs
- `/services/:slug` — Service page (e.g. `/services/leak-repair`): photo, from-price, duration, warranty, warning signs, what the price covers, FAQ, related jobs, estimate/book CTA
- `/estimate` — Instant estimate: pick trade, job, quantity, house age, access, timing and ZIP; a canary work order rewrites itself line by line and hands the estimate to booking
- `/areas` — Service areas: clickable neighbourhood map, ZIP checker, per-area card and the full coverage table with trip fees and arrival targets
- `/emergency` — Emergency: 24/7 line, "is it an emergency?" triage, water and power shut-off steps, FAQ
- `/book` — Book a visit: validated form with attached estimate, day and arrival-window picker, ZIP coverage check, loading state and a stamped work-order confirmation
- `/about` — About & team: story, standards, the dispatch board of technicians with licence numbers, credentials and hours

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, relative base works in any subfolder.

## Customize

`src/content.ts` (all copy, rates, services, areas and team), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The estimator computes ranges locally from the rate card in `content.ts` and keeps your last estimate in `sessionStorage` (with a safe fallback) so it can be attached to a booking. The ZIP checks, emergency triage, booking form and reminder signup all validate and confirm in the browser; nothing is sent, no visit is booked and nothing is charged. Fixture, its people, licences, prices and neighbourhoods are fictional.

## Credits

Fonts: Roboto Slab and Roboto (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
