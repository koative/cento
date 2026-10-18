# Commons

Good work. Better company. Four houses, one key card. A coworking space website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a live "Today at Commons" desk board, the Mill Yard floor-plan zone explorer, memberships, the four houses, today's meeting-room board, events, the lobby member directory, a day at Commons and a tour close
- `/memberships` — Plans with a monthly/yearly toggle, drop-in prices, a side-by-side comparison table and an FAQ
- `/locations` — The four houses on a schematic city map, filterable by amenity
- `/locations/:id` — Location page: gallery, interactive floor plan, story and host, front-desk hours with today highlighted, transit, meeting rooms and events at that house
- `/rooms` — Meeting-room booking: pick a house, day and group size, choose a slot on the room board or the floor plan, set the length, then book with validation and a confirmation
- `/events` — Calendar grouped by month, filterable by type and house
- `/events/:id` — Event page with running order, host, places left and an RSVP form
- `/community` — Member stories, a filterable notice board you can pin to, a searchable member directory and perks
- `/about` — Story, timeline, the front-desk team and house rules
- `/tour` — Tour booking form (house, weekday, time, team size) with confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (houses, floor plans, rooms, plans, events, members). Design tokens live at `:root` in `src/styles.css`. Imagery is in `src/assets`.

## Demo behaviour

The room board, RSVP, tour, notice-board and newsletter forms validate in the browser and show loading and confirmation states; bookings appear on the board for the rest of the visit. Room availability is generated demo data. Nothing is sent, stored on a server or charged, and Commons, its houses and its people are fictional.

## Credits

Font: Parkinsans (SIL Open Font License). Images: see `src/assets/SOURCES.md` (Unsplash License). Icons: Lucide (ISC). Code: MIT.
