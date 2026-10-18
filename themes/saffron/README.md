# Saffron

Your corner market, picked by hand and at your door in two hours. A grocery market & delivery website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the next open delivery slot, this week's in-season produce, aisle index, a live four-day slot board, featured recipe, supplier ledger, the saffron story, customer voices and a closing call to action
- `/aisles` and `/aisles/:aisle` — Aisles: every product or one aisle, with search, label filters (in season, local, organic, plastic-free) and sort
- `/aisles/:aisle/:id` — Product: price card, variants, quantity, swap preference, grower and storage details, recipes that use it, related products
- `/recipes` — Recipes: diet filter, 45-minute toggle and sort
- `/recipes/:slug` — Recipe: servings scaler, "have it" ticks, one-tap "add every ingredient we sell" to the basket, method and cook's tip
- `/delivery` — Delivery: ZIP zone check, the seven-day priced slot board, how delivery works, fees, zones and FAQ
- `/about` — Our market: timeline, picking standards, team, suppliers, shop address and hours
- `/basket` — Basket: quantities, per-line swap settings, free-delivery meter, chosen slot and minimum-order check
- `/checkout` — Checkout: contact, address with zone validation, slot board, card fields, loading and confirmation states
- Any unknown route — a "sold out" not-found page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, aisles, products, recipes, delivery windows, zones, growers, team). `src/styles.css` holds the design tokens at `:root`. Images live in `src/assets`.

## Demo behaviour

The basket and the chosen delivery slot are saved in `localStorage` (the site still works without it). Slot availability is generated from the date so the board looks lived-in; slots close three hours before they start. Checkout validates every field in the browser, shows a loading state, then confirms the order and empties the basket. Nothing is sent, booked or charged, and Saffron, its people, suppliers, prices and ZIP codes are fictional.

## Credits

Fonts: Bagel Fat One and Onest (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
