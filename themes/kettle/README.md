# Kettle

Brewed in copper. Poured twelve feet from the kettle. A craft brewery & taproom website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: tap row hero, live "Pouring today" board, flight builder, seasonal feature, brewhouse story, this month's events, tours teaser, shop strip, hours and house rules, closing call
- `/beers` — Beers: every recipe on a glass shelf, filter by family, search, sort by tap, ABV or IBU
- `/beers/:slug` — Beer page: brew sheet (grain bill, hops, fermentation, gravity), tasting notes, food pairings, related beers, links to buy cans and build a flight
- `/taproom` — Taproom: full tap list with pours and growler fills, flight builder, kitchen menu with dietary tags, hours, house rules, FAQ
- `/events` — Events: month-grouped calendar with type filter and free-entry toggle
- `/events/:id` — Event page: date/time/entry facts, what to expect, beers pouring that night, add-to-calendar (.ics), reserve by email, more dates
- `/tours` — Tours booking: three tour types, date and start-time picker with live places left, group size, validated booking form, confirmation
- `/shop` — Shop for pickup: cans, bottle pre-orders, glassware, apparel and gift cards with filter and sort
- `/shop/:id` — Product page: variants (pack size, size, amount), quantity, add to pickup order, related items
- `/cart` — Pickup order: line quantities, removal, totals
- `/checkout` — Checkout: pickup day and window, collector details, 21+ confirmation, order confirmation
- `/about` — Story: the kettle, the farm, the grain, timeline, team, how we brew
- Age gate on first visit; any unknown route renders the Not found page

## Run

`bun install && bun run dev` (build: `bun run build` — static output in `dist/`, relative base works in any subfolder)

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The age-gate answer and the pickup order are remembered in `localStorage` (everything still works when storage is unavailable). The flight builder reorders a paddle in pour order or deals a bartender's pick. Tour bookings, pickup checkout and the newsletter form validate in the browser and show a confirmation, but nothing is sent, booked or charged, and payment always happens at the bar. Kettle Brewing Co., its beers, staff, prices and events are fictional.

## Credits

Fonts: Ultra and Work Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
