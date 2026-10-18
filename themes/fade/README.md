# Fade

Sharp fades, hot towels, no rush. A barbershop website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: open-now status with the next free chair, price board, fade chart swatches, the six-chair board, recent cuts, a regular's quote, the hot towel shave ritual, shop picks, hours and a closing call to book
- `/services` — Services & prices: the full price board by group, barber levels and surcharges, add-ons, shop policies
- `/fade-chart` — Fade chart: pick fade height, guards, top length, hairline, beard and part; the chart draws the cut neckline-to-crown and writes the description your barber needs, then books it
- `/barbers` — The barbers: six chairs with level, specialties and working days
- `/barbers/:id` — Barber profile: bio, signature cut, weekly schedule, next free time, their cuts from the gallery, reviews, other chairs
- `/book` — Book a chair: service, barber (or first free chair), day and live open times, details and add-ons, with a running total and a confirmation ticket
- `/gallery` — Gallery: cuts filterable by style and barber, each with its recipe, opening in a viewer that books the same cut
- `/shop` — Shop: pomades, beard care, shave and tools, filter by category and sort by price
- `/shop/:id` — Product: authored product render, size/scent/finish options, quantity, hold and shine, how to use, ingredients, a barber's note, related products
- `/bag` — Bag & checkout: quantities, pick up or ship, validated details and an order confirmation
- `/about` — Our story: how the shop started, a year-by-year timeline, the house rules, the apprenticeship
- `/visit` — Hours & directions: open-now hours, an authored street map, transit and parking, FAQ

## Run

```
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (barbers, services, prices, hours, cuts, products, page text). `src/styles.css` starts with the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Booking, the fade chart, the bag and checkout all run in the browser. Open times are generated from the shop hours and each barber's working days, with a fixed pattern of taken slots. The bag is saved in `localStorage` (and still works without it). Forms validate and show loading and confirmation states, but nothing is sent, held or charged anywhere. Fade, its barbers, clients and reviews are fictional.

## Credits

Fonts: Alfa Slab One and Barlow (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
