# Chroma

Colour that grows out as well as it goes on. A hair salon website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with from-prices and live open status, menu in short, recent looks, interactive shade-level chart, chair-time planner preview, stylists, client quote, product shelf, hours and a closing call to book
- `/services` — Services & prices: full menu by category with price toggle by stylist level, timed steps per service, add-to-booking with a sticky booking bar
- `/lookbook` — Lookbook: filter by kind of work and by stylist
- `/lookbook/:id` — Look: photo, formula card, stylist, the appointment as a chair-time plan, “Book this look”, related looks
- `/stylists` — Stylists: filter by specialism, what the levels mean, weekly rota table
- `/stylists/:id` — Stylist profile: bio, quote, days in, most-booked services at their prices, their looks, favourite product, “Book with …”
- `/products` — Products: filter by need, sort by price, set aside for pickup with a running total
- `/book` — Book: services, stylist, patch-test rule, day and time slots, details form with validation, live chair-time summary, confirmation
- `/about` — About: story, how the salon runs, client words, careers
- `/visit` — Visit: open status, hours, contact, getting here, access, policies, FAQ

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (services, steps and prices, stylists, looks, products, hours, policies). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Services, a chosen stylist and set-aside products are kept in `localStorage` (falling back to memory) so they follow you from the menu, a look or a profile into booking. The booking page computes your appointment minute by minute, shows which start times fit before closing, blocks the next two days for new colour clients who need a patch test, validates every field and ends on a confirmation with a reference number. Booked slots are simulated. Nothing is sent, booked or charged, and Chroma is a fictional brand.

## Credits

Fonts: Yeseva One and Montserrat (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
