# Aura

Daily care. Quiet joy. Five minutes, twice a day. A skincare brand website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the three most-loved products, a morning/evening ritual preview, bestsellers, shop by step, ingredient spotlight, philosophy, reviews, journal, promises and a closing call to the builder
- `/shop` — The essentials: twelve products with search, step / skin type / time-of-day filters and sorting
- `/shop/:id` — Product: packshot, texture and key-ingredient views, size variants, quantity, add to bag or buy now, formula notes, ritual position, key ingredients, full INCI, reviews, pairings
- `/ritual` — Ritual builder: four questions build a layered routine (thinnest to thickest) with swappable steps, real timing and one-click add to bag; the page turns to night for evening rituals
- `/ingredients` — Ingredients glossary: eighteen entries with search, kind filter and A–Z jump
- `/ingredients/:slug` — Ingredient: what it does, origin, strength, cautions, pairings and the products that contain it
- `/journal` — Journal with topic filter
- `/journal/:slug` — Article with mentioned products and further reading
- `/about` — Our story, principles, sourcing and team
- `/help` — FAQ disclosures, shipping table and contact
- `/cart` — Bag with quantities, removal and free-shipping progress
- `/checkout` — Checkout with validation, delivery choice, free sample, payment fields and order confirmation

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit if storage is unavailable). The ritual builder, filters, checkout and newsletter run entirely in the browser: checkout validates every field and shows a confirmation, but nothing is sent, stored on a server or charged. Aura, its people, products, prices and reviews are fictional demonstration content, and the ritual builder is a cosmetic guide, not medical advice.

## Credits

Fonts: Bellefair and Urbanist (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
