# Tinker

A toy shop with a workbench in the back. A toy store website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with tagged toys, age-shelf height chart, new arrivals, gift finder sample, workshop sessions, toy-testing story, upcoming events, parent quotes, counter services, visit close
- `/shop` — Shop: every toy with age, aisle and price filters, search and five sorts
- `/shop/:id` — Toy: photo gallery, age badge, variant picker, gift wrap with tag message, quantity, add to basket, details, related toys
- `/ages/:id` — Age shelf (six bands): what kids that age are into, what the buyers look for, a staff tip, every toy that fits, matching workshops
- `/gift-finder` — Gift finder: pick an age on the block stack, interests and a budget; ranked matches with reasons and one-tap "add, gift wrapped"
- `/workshops` — Workshops: five bench workshops, full session table, birthday bench parties
- `/workshops/:id` — Workshop: details, how the session runs, date picker with seats left, seat booking into the basket
- `/events` — Store events: month-grouped calendar with type filter and an RSVP form
- `/visit` — Visit: live open/closed status, hours, authored street map, getting here, counter services, FAQ
- `/about` — About: shop story, how a toy gets on the shelf, timeline, team, tester families
- `/cart` — Basket: quantities, gift wrap details, summary
- `/checkout` — Checkout: details, pickup / bike delivery / shipping, address, validation and order confirmation

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: toys, age shelves, workshops, events, hours, team), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The basket lives in `localStorage` (and keeps working without it): toys with their variant, gift wrap and tag message, and workshop seats with their session. The gift finder, filters, RSVP form, newsletter form and checkout all run in the browser; checkout validates every field, then shows an order confirmation and empties the basket. Nothing is sent, booked or charged, and Tinker is a fictional brand.

## Credits

Fonts: Grandstander and Quicksand (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
