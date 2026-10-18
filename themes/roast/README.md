# Roast

Roasted on Monday and Thursday. In your cup by the weekend. A coffee roastery website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with the house coffee, this week's shelf, roast scale from light to dark, the roast-day week, subscription teaser, producers table, brew guides, subscriber quote, cafés with today's hours, closing call to order
- `/shop` — Shop: eight coffees with search, roast/type/process filters and five sort orders
- `/shop/:id` — Coffee page: size and grind variants, quantity, add to bag, producer story and specs, an SVG roast curve, matching brew guides, related coffees
- `/subscribe` — Subscription builder: coffee, cups-per-day suggestion, size, rhythm and grind, live price per delivery and per cup, the next four roast and ship dates, FAQ
- `/brew` — Brew guides: method comparison table, five guides, four brewing habits
- `/brew/:slug` — Brew guide: recipe specs, scalable dose calculator, gear, step-by-step method with a running brew timer
- `/cafes` — Cafés: three locations with live open/closed status, hours, bar menu, roastery tours
- `/about` — Our story: lead, principles, timeline, team, subscriber quote
- `/cart` — Bag: quantities, removal, subscription lines, free-shipping progress
- `/checkout` — Checkout: validated contact, address and delivery form, order summary, confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (coffees, guides, cafés, team, FAQ, prices). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The bag is saved in `localStorage` (and still works if storage is blocked). Coffees and subscriptions can be added, changed and removed, and checkout validates the form and shows a confirmation with an order number. The subscription builder, brew timer and café open/closed status run in the browser from the demo data and the current date. Nothing is sent, charged or shipped: no payment is taken, the newsletter stores nothing, and Roast is a fictional brand.

## Credits

Fonts: DM Serif Display and Hanken Grotesk (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
