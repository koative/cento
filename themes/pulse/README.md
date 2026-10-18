# Pulse

Three days, four stages, no off switch. A music festival website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: poster hero with headliners, full billing by day, live timetable grid, the four stages, manifesto, ticket tiers, interactive site map, care, FAQ teaser, closing call to action
- `/lineup` — Lineup: all 30 artists with search, day chips, stage filter and poster / set-time / A–Z sort
- `/lineup/:slug` — Artist page (e.g. `/lineup/mira-nova`): set time card with add-to-timetable and clash advice, bio, moods, records, stage, neighbouring sets
- `/timetable` — Timetable builder: clash-finder grid per day, saved picks, clash warnings with walking times, copy-to-clipboard
- `/tickets` — Tickets: tier progress, wristband tiers with quantities, instalment toggle, extras, live order summary
- `/tickets/checkout` — Checkout: lead booker, 18+ check, a name for every wristband, terms; confirmation state
- `/venue` — Venue: interactive site map, stage hours, walking-time table, getting there, camping, access
- `/faq` — FAQ: searchable, filterable by topic, native disclosures
- `/about` — About: story, principles, edition timeline, crew

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (artists, stages, set times, tickets, places, FAQ, team). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Timetable picks and the ticket order are kept in `localStorage` (the site still works when storage is blocked). Checkout and the newsletter form validate in the browser and show a confirmation; nothing is sent, booked or charged. Pulse, its artists, venue and people are fictional.

## Credits

Fonts: Big Shoulders Display and Rubik (SIL OFL 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
