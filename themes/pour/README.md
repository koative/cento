# Pour

Good wine, no ceremony. A shop by day, a bar by night. A natural wine shop & bar website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: a shelf of authored bottles with price tags, what is open at the bar tonight, new arrivals, the taste finder, the bar board, growers, upcoming tastings, the club and a visit close
- `/wines` — The shelf: search, colour, country, price, by-the-glass and no-sulphur filters, six sort orders
- `/wines/:id` — Bottle page: bottle and magnum formats, quantity, add to case, palate position, specs, how it was made, the grower, related bottles
- `/finder` — Taste finder: drag a glass across a body × wildness palate map (or use the arrow keys / mood presets) to surface the three closest bottles
- `/bar` — Bar menu: wines by the glass and bottle, other drinks, small plates, bar hours
- `/tastings` — Tastings & events, filterable by kind
- `/tastings/:id` — Event page with seat reservation into the cart, pours and what is included
- `/club` — Wine club: three sizes, monthly or yearly billing, how it works, FAQ
- `/about` — Story, buying rules, team, growers index
- `/visit` — Hours, authored street map, directions, delivery, FAQ
- `/cart` — Your case: quantities, mixed-six discount meter, summary
- `/checkout` — Contact, pickup or delivery, age confirmation, validation and order confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (wines, bar menu, events, club, team, FAQ), `src/styles.css` the design system (tokens at `:root`), `src/assets` the imagery. Bottle silhouettes and labels are drawn from each wine's `bottle` field.

## Demo behaviour

Bottles, tasting seats and a club membership go into a case stored in `localStorage` (it still works for the visit when storage is blocked). Mixing six bottles applies a 10% case discount. Checkout validates the form, simulates a short wait and shows a confirmation; the newsletter form confirms locally. Nothing is sent, booked or charged, and Pour, its growers and its people are fictional.

## Credits

Fonts: Ibarra Real Nova and Figtree (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
