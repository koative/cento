# Drop

Small runs. Saturday drops. No restocks. A streetwear store website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: next drop with live countdown and lineup, calendar strip, what is on the rail, how a drop works, raffle ticket teaser, lookbook strip, the shop and hours, archive with sold-through, close
- `/drops` — Drops calendar: upcoming/archive tabs, drop rows with countdowns and .ics export, month view with drop days
- `/drops/:id` — Drop page: spec sheet, countdown or raffle state, story, pieces, previous/next drop
- `/shop` — Shop: category chips, size-in-stock and availability filters, sort
- `/shop/:id` — Product: front/back flats per colourway, size run with stock, quantity with per-order limit, size guide, details, related pieces
- `/lookbook` — Lookbook: street portraits with the pieces linked
- `/raffle` — Raffle entry: piece and size, validated form, printed ticket with stub and barcode, your tickets
- `/store` — The shop: story, visit details and hours, street map, drop-day line rules, crew
- `/help` — Help & sizing: policies, size guides, FAQ
- `/cart` — Bag with quantities and free-shipping meter
- `/checkout` — Checkout with delivery or pickup, validation and order confirmation

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

Drop dates roll forward in whole weeks so the next drop is always ahead of today (set `shift` to 0 in `src/lib/time.ts` for real dates). The bag and raffle entries persist in localStorage; "Add to calendar" downloads an .ics file. Checkout, raffle entries and drop alerts are validated in the browser only: nothing is sent, drawn or charged, and Drop is a fictional brand.

## Credits

Fonts: Rubik Mono One and Inter Tight (SIL Open Font License). Images → src/assets/SOURCES.md. Icons: Lucide (ISC). Code MIT.
