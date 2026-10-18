# Pantry

Everything for dinner except the salt. A meal kit subscription website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with this week's recipe cards, menu rail, the weekly rhythm (cutoff to doorbell), what's in a numbered bag, price calculator, testimonials, growers, gift cards, FAQ and a live cutoff countdown
- `/menu` — This week's menu: twelve recipes with diet/time/calorie filters, ingredient search, sort and a box progress bar
- `/menu/:slug` — Recipe: photo, swaps (variants), servings, quantity, live price, scaled ingredients, numbered method, chef's note, nutrition, allergens, related recipes
- `/plans` — Plan builder: people, recipes a week, diet, tastes and delivery day fill a top-down box of numbered bags with swappable recipes and a live weekly total; full price grid
- `/how-it-works` — Four steps, a cut-away of the box layers, timing and delivery, skip/pause/cancel policy, full FAQ
- `/gift-cards` — Gift card builder with amount, design, message, send date, quantity and a live card preview
- `/about` — Our kitchen: story, house rules, team, growers, timeline
- `/box` — Your box: plan settings, recipe and gift card lines with quantities, summary
- `/checkout` — Sign up & checkout: account, delivery, payment with validation, loading and confirmation states

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: recipes, prices, farms, FAQ), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The box (plan size, delivery day, recipes and gift cards) is kept in `localStorage` and survives reloads; it still works for the visit if storage is blocked. The plan builder, menu filters, recipe swaps, gift card form and sign-up checkout all run in the browser: forms validate locally, checkout shows a short loading state and an order confirmation, and nothing is sent, stored on a server or charged. Delivery dates and the Wednesday cutoff countdown are computed from the visitor's clock. Pantry, its people, farms and prices are fictional.

## Credits

Fonts: Corben and Nunito Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
