# Tide

We look after the coast between the tides. An ocean conservation nonprofit website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: next low-tide clean, programme ledger, interactive tide planner, upcoming events, debris composition and five-year chart, volunteer voices, where the money goes, monthly-gift close
- `/programmes` — Programmes: filter by type of work (clean, restore, survey, teach)
- `/programmes/:slug` — Programme: lede, facts table, the work, season steps, gallery, sites with tide range, upcoming dates, lead, related programmes
- `/volunteer` — Volunteer: what to expect, events filtered by type, place, month and availability
- `/volunteer/:id` — Event: tide planner for the day, practical details, booking form with validation, waitlist and confirmation
- `/impact` — Impact reports: kilograms per year chart, five-year table, report list, counting method
- `/impact/:year` — Impact report: measures with year-on-year change, director's letter, highlights, debris composition, sortable top-ten items, money
- `/donate` — Donate: monthly / one-off, amounts with live "what it does", Gift Aid, details, Direct Debit or card, confirmation; giving FAQ
- `/about` — About: story, values, timeline, staff, trustees, accounts, contact
- any other path — Not found

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: programmes, sites with tide parameters, events, reports, giving tiers, people), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The tide planner draws each event's tide curve from a simplified harmonic model and derives the work window from low water; drag the chart, use the slider or run the day to watch the beach flood and drain. Event bookings validate inline and are kept in this browser's `localStorage` so lists show "You're going"; the newsletter and the donate flow validate and confirm locally. Nothing is sent, booked or charged, and Tide is a fictional charity: every person, place, figure and report is sample content.

## Credits

Fonts: Zilla Slab and Atkinson Hyperlegible (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
