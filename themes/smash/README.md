# Smash

Smashed thin. Stacked tall. Ready in twelve. A burger joint with online ordering website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the signature burger, the menu board, the live burger builder, the crust, the five-step method, sides and shakes, locations with live open status, catering, merch, closing order call.
- `/menu` — Menu: category tabs, search, dietary filters (vegetarian, spicy, gluten-free), sort by menu order, popularity, price or calories, one-tap Add.
- `/menu/:id` — Menu item (e.g. `/menu/the-smash`): photo or drawn stack, allergens, the item builder with every option group, quantity, add to order, "Goes with".
- `/order` — Your order: persisted cart with quantities, remove, subtotal and an upsell.
- `/checkout` — Checkout: pickup or delivery, counter and time slot or address with delivery-zone check, contact details, tip, live totals, validation and an order-ticket confirmation.
- `/locations` — Locations: authored city map, every counter with open-now status, today's hours and phone.
- `/locations/:id` — Location (e.g. `/locations/eastside`): weekly hours with today highlighted, the Truck's weekday stops, features, map, other counters.
- `/catering` — Catering: three packages, a headcount estimator that recommends the best fit, and an enquiry form.
- `/merch` — Merch: type filter and price sort.
- `/merch/:id` — Merch item (e.g. `/merch/logo-tee`): live-recoloured product drawing, colour and size pickers, specs, related items.
- `/about` — About: the story, suppliers, the crew and an FAQ.
- Any unknown route — Not found.

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

`src/content.ts` (all copy and data: menu, option groups, merch, locations and hours, catering, about), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Everything runs in the browser. The burger builder recalculates price and calories and redraws the stack as you change options; your order is kept in `localStorage` (and still works for the visit if storage is blocked). Checkout, the catering enquiry and the newsletter validate their fields and show a confirmation, but nothing is sent anywhere and no card is charged. Open/closed status is computed from each location's hours and your device clock. Smash, its people, places and prices are fictional.

## Credits

Fonts: Titan One and Rubik (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
