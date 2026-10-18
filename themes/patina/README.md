# Patina

Furniture with a past, measured and mended for its next room. A vintage furniture store website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: warehouse hero with hanging stock tags, this week's arrivals, browse by kind, a staged room, the doorway fit check, restoration band, sell-to-us steps, condition grades, a customer note and visiting hours
- `/shop` — The floor: search, category / period / grade / price filters, sold toggle and five sorts
- `/shop/:id` — Piece page: gallery, stock tag, finish options with price deltas, quantity for sets, specs from the stock book, listed marks, fit check, room set and related pieces
- `/rooms` — Room sets with their pieces and staged totals
- `/rooms/:slug` — Room set: the story, every piece with its tag, and "add the room to cart"
- `/restoration` — Workshop price list, how a job runs, a rough-estimate calculator and a quote request form
- `/sell` — What we buy and pass on, and the sell-to-us form with photographs and validation
- `/about` — The story, house rules and the team
- `/visit` — Hours, directions, delivery options and FAQ
- `/cart` — Persisted cart with quantities and removal
- `/checkout` — Contact, delivery method, access details, validation and order confirmation

## Run

`bun install && bun run dev` (build: `bun run build` — static output in `dist/`, relative base works in any subfolder)

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The cart is stored in `localStorage` (and still works for the visit if storage is blocked). Filters, finish options, the fit check, the restoration estimate and every form run entirely in the browser: forms validate and show a success state, checkout shows a confirmation, but nothing is sent, uploaded, reserved or charged. Patina, its people, pieces and prices are fictional.

## Credits

Fonts: Sorts Mill Goudy and Work Sans (SIL Open Font License). Images → `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
