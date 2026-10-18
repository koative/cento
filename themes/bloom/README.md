# Bloom

Flowers gathered by hand, delivered the same day. A florist website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with live same-day cut-off, today's bouquets, builder teaser, this week's stem list, subscriptions, weddings, delivery zones, testimonials, journal, close
- `/shop` — Shop: bouquets, vase arrangements, dried flowers and plants with kind, colour and occasion filters and sorting
- `/shop/:id` — Product: photos, size and vase options, quantity, add to bag or buy now, recipe, vase life, care, related flowers
- `/builder` — Bouquet builder: pick stems, wrap and card message; a top-down spiral drawing grows as you add stems
- `/subscriptions` — Subscriptions: weekly / fortnightly / monthly toggle, three bunch sizes, a subscriber's week, FAQ
- `/weddings` — Weddings & events: services with starting prices, recent days, planning timeline, validated enquiry form
- `/journal` — Journal with topic filter; `/journal/:slug` — article with related stories
- `/about` — Studio story, house rules, growers with a distance map, team, hours
- `/delivery` — Postcode checker, zones and fees, delivery windows, flower care, FAQ
- `/cart` — Bag with quantities, removal and summary
- `/checkout` — Delivery or pickup, recipient, date rules, delivery window, card message, confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (products, stems, plans, zones, posts, team). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit without it). The builder, product pages and subscriptions add lines to the bag; checkout checks postcodes against the delivery zones, enforces the 1 pm same-day cut-off and no-Sunday rule, and shows a confirmation. The wedding enquiry, postcode checker and newsletter forms validate locally. Nothing is sent, stored on a server or charged, and Bloom is a fictional brand.

## Credits

Fonts: Gilda Display and Lato (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
