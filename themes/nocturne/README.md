# Nocturne

Stay for another side. A cocktail & listening bar website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: open-now status with a menu card, house rules, drinks preview, record-of-the-night player, the sound system, upcoming events, private hire, a regular's quote and a hours/booking close
- `/menu` — Drinks: seventeen drinks by section with section chips, search, base-spirit and strength filters, plus pours and snacks
- `/menu/:id` — Drink page: photo or drawn glass, full spec, method, the record to listen with, related drinks
- `/records` — Record of the night: tonight's slip on the turntable player, archive of past nights
- `/records/:date` — One night: the scrubbable player and every side played, in order
- `/events` — Events: album nights, guest selectors, live sets and tastings, filterable by type
- `/events/:id` — Event page: details, running order, place reservation form, more events
- `/reservations` — Book a table: date, live arrival slots, seating zone with a floor plan, validated form and confirmation
- `/private-hire` — Private hire: spaces, packages, live price estimate, FAQ and an enquiry form
- `/about` — About: the story, the system, the team, house habits and FAQ

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, hours, drinks, records, nights, events, zones, hire packages). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The record-of-the-night player is visual only: press play or drag the timeline and the drawn turntable shows what the room was hearing at that minute, with no audio. Table bookings, event places, private-hire enquiries and the newsletter validate in the browser and show a confirmation, but nothing is sent, reserved or charged. Nocturne, its people, records and prices are fictional.

## Credits

Fonts: Limelight and Josefin Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
