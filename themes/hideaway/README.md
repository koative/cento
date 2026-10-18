# Hideaway

Eight houses on Vellmar, and the people who keep their keys. A vacation rental villas website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: availability search, featured villas, island map of the houses, the team, concierge price ledger, guide picks, month-by-month sea and season chart, guest-book quotes, closing call to book
- `/villas` — Villas: filter by coast and must-haves, guests, dates and sort; "only free for my dates" with live stay totals; island map linked to the list
- `/villas/:slug` — Villa page (e.g. `/villas/sa-talaia`): gallery, the house, bedrooms table, amenities, two-month availability calendar with season prices and a live stay quote, yearly rates, pages from the house book, nearby guide places, related houses
- `/guide` — Island guide: places filtered by kind, pinned on the island map
- `/guide/:slug` — Guide place (e.g. `/guide/cala-morella`): story, practical facts, local tip, closest houses, more from the guide
- `/concierge` — Concierge: how it works, priced services by moment of the stay, "Ask Elena" enquiry form
- `/book` — Book a stay: house, dates, guests, concierge extras, lead guest details and terms, live booking summary, confirmation state
- `/about` — About us: story, promises, the team, a note for house owners
- `/good-to-know` — Good to know: getting here, payments, cancellation and small print, FAQ disclosures

## Run

```
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`, the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, villas, seasons and prices, booked nights, guide places, services, team, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The availability calendar, villa filters, booking form, concierge enquiry and newsletter all run in the browser. The chosen house, dates and guests are kept in `sessionStorage` (falling back to memory) and carried from the calendar and search to the booking form; booked nights are generated from each villa's seed in the sample data. Nothing is sent, no card is charged, and Hideaway, Vellmar and everyone in it are fictional.

## Credits

Fonts: Cormorant and Mulish (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
