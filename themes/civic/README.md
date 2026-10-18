# Civic

Your city, one search away. A city government services website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: service search with most-asked shortcuts, today's City Hall status, services by purpose, live alerts, report-an-issue teaser with recent reports on the map, address lookup (trash day, ward, councillor, polling place), next council meeting, news, winter notice, ask-a-person close.
- `/services` — Services A–Z: search, category chips, "can be started online" filter, alphabetical directory with fees and how to apply.
- `/services/:slug` — Service page (12 services): what to know, before you start, step-by-step, fees table, FAQ disclosures, contact card with primary action, related services.
- `/report` — Report an issue: problem type, pin on the city map with nearby open reports ("add my voice"), details, optional photo, update preferences, validated submit with reference number and status tracker; track any report by reference.
- `/council` — Council & meetings: upcoming/past meetings tabs, the seven council members, ward finder on the map that highlights your councillor.
- `/council/:id` — Meeting page (6 meetings): time and place, agenda with items and outcomes, how to speak or comment, livestream/minutes, other meetings.
- `/news` — News: topic filter, six stories.
- `/news/:slug` — Article: full story with photo, more news.
- `/alerts` — Alerts & closures: active alerts filtered by topic, alert sign-up by email or text with topic choice.
- `/city-hall` — City Hall & departments: word from the mayor, visit or call with live open/closed status, how the city is run, department directory, where each $100 of property tax goes.

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: services, map, wards, alerts, council, meetings, news), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Searching, filtering, the address lookup and the ward finder run on local demo data. Filed reports are kept in this browser's `localStorage` (the app still works when storage is unavailable) and can be tracked by their reference number; alert and newsletter sign-ups only show a confirmation. Nothing is sent to anyone, no payment or registration takes place, and the City of Commonwell, its people and its figures are fictional.

## Credits

Fonts: Public Sans (OFL). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
