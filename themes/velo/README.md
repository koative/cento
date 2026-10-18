# Velo

Steel bicycles, drawn to fit and serviced for life. A bicycle shop & builds website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the flagship bike, featured bikes, live frame-drawing teaser with paint swatches, fit-to-ride process, workshop price list, rides club timetable, rider quotes, visit details with open-now status
- `/bikes` — Bike catalogue with type chips, frame material and budget filters, sort, result count and empty state
- `/bikes/:id` — Bike page (7 bikes): photo / to-scale geometry drawing switch, finish and size variants, rider-height size helper, quantity, add to cart, specification, full geometry table across sizes, related bikes
- `/build` — Build configurator: frame platform, rider height → size, paint, groupset, wheels, tyre width, mudguards and rack drawn live on the frame drawing, itemised price and weight, add build to cart
- `/service` — Workshop: service packages, single-job price list, drop-off booking with a two-week workshop calendar, time slots and validation, FAQ
- `/rides` — Rides club: weekly rides with elevation profiles and surface filter, pace groups, ride rules, join form
- `/about` — Workshop story, how a frame is made, team, opening hours
- `/cart` — Persisted cart with quantities and removal
- `/checkout` — Contact, delivery method, conditional address, terms, validation and order confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (bikes, geometry, build options, services, rides, team, hours). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The cart is stored in `localStorage` (and still works for the visit when storage is unavailable). The configurator, size helper, workshop booking, club sign-up, newsletter and checkout run entirely in the browser: forms validate and show a confirmation, but nothing is sent, booked or charged. Velo, its people, prices and reviews are fictional.

## Credits

Fonts: Saira Condensed and Saira (Omnibus-Type, SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
