# Aperture

Two screens, one bar, and the lights go down on time. An independent cinema website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: programmer's pick on a projected still, today's listings board, new films, the Night Shift season, a sightline row preview, events, the rooms, house rules, membership, venue hire and visit close
- `/whats-on` — What's on: seven-day programme by day or A–Z, with search, format and strand filters
- `/films/:slug` — Film page: scope still, synopsis, programmer's note, every screening this week, full details, related films
- `/book` — Booking: choose a screening, pick seats on the auditorium map with a live sightline preview, assign ticket types, enter details, get e-ticket stubs
- `/events` — Events & Q&As: filterable list of Q&As, introductions, tours, access screenings and bar nights, with seat booking where it is a screening
- `/membership` — Membership: three tiers with a monthly/yearly toggle, join form with member-number confirmation, FAQ
- `/hire` — Venue hire: both screens and the bar with rates, what is included, a live estimate and an enquiry form
- `/visit` — Visit & access: address, hours, getting here, access provision, FAQ
- `/about` — About: the building's story and timeline, house rules, team, community shares

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (films, showings, screens and seat layouts, ticket prices, events, tiers, hire rates, hours). `src/styles.css` holds the design system, with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Screenings are listed relative to today, so the programme always shows the coming seven days; seat availability is generated deterministically per screening. Booking, membership, venue-hire and newsletter forms validate in the browser and show a confirmation, but nothing is reserved, charged or sent anywhere. Aperture, its films, people and prices are fictional.

## Credits

Fonts: Oswald and Crimson Pro (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
