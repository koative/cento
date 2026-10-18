# Fable

Please touch everything. A children's museum website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with live open status and prices, today's session strip, galleries (featured + door-sign directory), interactive floor map, ticket prices and family pass, school trips and parties, upcoming events, visitor quote, visit close
- `/exhibits` — Exhibits: filter by age group and noise level, sort by museum order, shortest visit or A–Z
- `/exhibits/:slug` — Exhibit page (9 galleries): photo, age/stay/noise/mess plate, story, "things to try" checklist, today's sessions, grown-up and access notes, floor map with the room highlighted, related galleries
- `/visit` — Plan your visit: opening hours with today marked, floor map + day planner, getting here, access, food, FAQ
- `/tickets` — Tickets: date and timed-arrival slot picker with places left, ticket quantities with accompaniment rules, details form, summary, confirmation stub
- `/events` — Events & camps: audience filter, grouped by month
- `/school-trips` — School trips: workshops by grade, practical facts, class visit request form
- `/parties` — Birthday parties: three packages, add-ons, party request form with live estimate
- `/about` — About: story, principles, team, volunteering

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (exhibits, floor-map layout, tickets, events, programmes, packages, team). `src/styles.css` holds the design tokens at `:root`, including the wayfinding swatches. Imagery lives in `src/assets`.

## Demo behaviour

The family day plan (ages, arrival time and chosen galleries) is saved in `localStorage` and builds a timed route with a lunch break; the ticket, school-trip, party and newsletter forms validate in the browser, show a sending state and a confirmation. Nothing is sent, reserved or charged, and Fable is a fictional museum.

## Credits

Fonts: Rammetto One and Nunito (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
