# Terrain

Small-group treks, led by people who live where they walk. A guided adventure travel website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a trail-sign of the next departures, departure board, featured trips, the three grades, quick route finder, a day on the trail, guides, philosophy, traveller notes, gear teaser, closing signpost
- `/trips` — All trips: filter by region, grade, length and month, sort, switch between cards and a comparison table, empty state
- `/trips/:slug` — Trip: specs, price box, gallery, highlights, day-by-day explorer (topo map + elevation profile + day tabs), at-a-glance table, dates and places, inclusions, guide, packing kit, related trips
- `/route-finder` — Route finder: six questions that rank all eight trips with a fit score and the reasons for and against each
- `/guides` — Guides: the eight lead guides and the routes they lead
- `/guides/:slug` — Guide profile: facts, qualifications, story, favourite moment, their trips
- `/gear` — Gear list: packing checklist per kit with weight and progress, remembered on the device, hire prices
- `/book` — Booking: trip, departure, travellers, room, gear hire, lead traveller and emergency contact, live price summary, validation and confirmation
- `/about` — About & safety: story, safety standards, planning desk
- `/faq` — FAQ & policies: accessible disclosures, grade summary, contact

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: trips with day-by-day profiles and map legs, guides, gear, FAQ), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The trips filter, route finder, day-by-day explorer and packing list all run in the browser; the packing list is saved to `localStorage` when available. The booking and newsletter forms validate input and show a confirmation, but nothing is sent, held or charged. Terrain, its guides, prices and reviews are fictional.

## Credits

Fonts: Anybody and Overpass (SIL Open Font License). Images: see `src/assets/SOURCES.md` (Wikimedia Commons, CC0 and CC BY). Icons: Lucide (ISC). Code: MIT.
