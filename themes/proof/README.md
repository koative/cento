# Proof

Baked before you're up. Ready when you are. An artisan bakery website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the first bake time, letterboard of today's oven loads, order-ahead favourites, the 36-hour loaf, how pickup works, upcoming classes, wholesale band, a regular's quote, visit close
- `/today` — Today's bake: the oven board (scrub a clock through the day's oven loads), what's on the counter and what isn't baked today
- `/shop` — Order ahead: category and dietary filters, search, sort
- `/shop/:id` — Product: sizes, slicing/bake options, cake message, quantity, notice and bake days, allergens, specs, related items
- `/classes` — Classes: level filter, next open date per class
- `/classes/:id` — Class: agenda, take-home list, seat booking with per-date availability
- `/wholesale` — Wholesale: who we bake for, trade price list, delivery rounds, terms, trial-delivery enquiry form
- `/about` — Our story: timeline, how we bake, the bakers
- `/visit` — Visit & FAQ: live open/closed state, hours, authored street map, access notes, FAQ
- `/cart` — Bag: quantities, earliest pickup day
- `/checkout` — Pickup checkout: pickup planner (only days the whole bag can be baked), hourly windows, validation, confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (products, bake schedule, hours, classes, wholesale prices, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit without it). Checkout reserves nothing: it validates the form, checks pickup days against each item's notice and bake days, shows a confirmation and empties the bag. Class booking, the wholesale enquiry and the newsletter form validate and confirm locally; nothing is sent, charged or stored anywhere. Proof, its people, prices and reviews are fictional.

## Credits

Fonts: Caprasimo and Nunito (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
