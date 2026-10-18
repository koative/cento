# Odyssey

Slow journeys, planned by people who have been. A travel agency website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a journey photo, a strip of all ten destinations, featured destinations, how a journey gets made, the route chart teaser, set journeys, a traveller's quote, promises, journal picks and an enquiry close.
- `/destinations` — Destinations: filter by region, landscape and travel month, sort by best month, flight time, price or name; empty state.
- `/destinations/:slug` — Destination (e.g. `/destinations/kyoto`): photo pair, facts sheet, month-by-month season chart, sample days, a stays table, journeys through it and related places.
- `/journeys` — Journeys: seven set routes filtered by length and departure month, with plain pricing notes.
- `/journeys/:slug` — Journey (e.g. `/journeys/the-atlantic-rim`): facts and best departures, "open in planner", route chart, day-by-day timeline, inclusions and related journeys.
- `/planner` — Itinerary planner: click fixes on a navigator's chart, set nights, reorder stops, pick a date, travellers and stay level; dates, legs and a per-person estimate update live and persist locally.
- `/journal` — Travel journal: articles filterable by planner.
- `/journal/:slug` — Journal article (e.g. `/journal/kyoto-before-nine`).
- `/about` — About: the agency's habits, the planners and their regions, the office.
- `/how-we-work` — How we work: the four steps, fees and payments, FAQ disclosures.
- `/enquire` — Enquiry form that carries the drafted route, with validation and a confirmation state.

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (destinations, journeys, articles, planners, fees, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The planner keeps your draft route in `localStorage` (and still works without storage), plots it on the chart and prices it with illustrative nightly rates. "Send this route to a planner" attaches the route to the enquiry form, which validates every field and shows a reference number on success; the footer newsletter validates and confirms in place. Nothing is sent, booked or charged anywhere, and Odyssey, its planners, prices and travellers are fictional.

## Credits

Fonts: Playfair Display and Kumbh Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
