# Ember

Wood-fired, every night on Alder Street. A neighbourhood restaurant website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with tonight's dishes, the three menus, the oven and its day, a dish spotlight, table-planner teaser, upcoming events, private dining, regulars' notes, hours and booking close
- `/menu/dinner`, `/menu/brunch`, `/menu/drinks` — Menus set like a printed bill of fare, with search, dietary filters, a photo strip and the table planner
- `/menu/:service/:dish` — Dish page: photo, kitchen notes, allergens, suppliers, drink pairing, related dishes, add to table
- `/reservations` — Booking flow: date, party size, live time-slot availability, seating, contact details, optional table plan, confirmation
- `/private-dining` — Spaces compared, three set feasts, policies and an enquiry form
- `/events` — Supper clubs, classes, tastings and music, filterable by kind
- `/events/:id` — Event page: running order, seats left, seat-hold or waiting-list form
- `/about` — Story, team and the supplier ledger
- `/visit` — Authored street map, hours with today highlighted, getting here, access and FAQ

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (menus, dishes, hours, events, spaces, team, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The table planner keeps a guest count and chosen dishes in `localStorage` (and still works without it), totals the bill per head and suggests a balanced order. Reservations show demo availability per date and time, validate every field and return a confirmation reference; the private-dining enquiry, event seat holds and newsletter sign-up behave the same way. Nothing is sent, booked or charged, and Ember is a fictional brand.

## Credits

Fonts: Young Serif and Work Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
