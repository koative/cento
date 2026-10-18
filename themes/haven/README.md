# Haven

Twenty-two beds at 1,640 metres, and the whole valley below. An alpine hotel website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with availability bar, hosts' letter, room strip, interactive panorama table, dinner menu, bathhouse infusion times, summer/winter experiences, guest quote, journal, closing call to book
- `/rooms` — Rooms and cabins: filter by type and party size, sort by price or size, comparison table
- `/rooms/:id` — Room: photo gallery, facts, description, amenities, policies, the panorama framed by that room's window, related rooms
- `/book` — Check availability: four-step flow (dates on a nightly-rate calendar, room, board and extras, guest details) with a live price summary and confirmation
- `/dining` — Restaurant Teria tasting menu, the Stube à la carte menu, breakfast, producers, table reservations
- `/spa` — The bathhouse: saunas and temperatures, daily infusion schedule, treatments with prices, house rules
- `/experiences` — Guided and self-guided days, filterable by season
- `/experiences/:id` — Experience: facts, what happens, what to bring, timed plan of the day
- `/journal` — Stories from the house
- `/journal/:slug` — Article with pull quotes and further reading
- `/about` — The house: history timeline, how it is run, the team
- `/plan` — Plan your stay: getting here, seasons, house rules, packing list, FAQ, contact

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, rooms, peaks, rates, menus, experiences, journal). `src/styles.css` holds the design system with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The availability calendar is generated locally from each room's base rate, seasonal opening dates and a stable pseudo-random occupancy, so the same nights are free on every visit. The booking flow, newsletter form and validation run entirely in the browser: nothing is sent, stored or charged, and the confirmation reference is made up. Haven, its people, prices and the Val Teria are fictional.

## Credits

Fonts: Gloock and Figtree (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
