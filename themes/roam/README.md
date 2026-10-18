# Roam

Land, sign once, drive. Five stations from the coast to the passes. A car rental website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: trip search, the fleet parked in a row of bays, what every rental includes, the bag fit planner, pickup in four steps, stations map, deal codes, three drives, renter quotes, FAQ teaser, close
- `/fleet` — Fleet: eight groups with group, gearbox and seat filters, sorting and an optional bag check that marks which cars take your load
- `/fleet/:id` — Car: side elevation with dimensions, day-count price estimate, specification, luggage room by seat layout, ACRISS key-tag decoder, pickup stations, related cars
- `/book` — Book a car: four steps (trip with route map, car, cover and extras with deal code, main driver), live line-by-line price with fees and tax, key-tag confirmation
- `/locations` — Locations: interactive region map, five stations with live open/closed status, one-way fee table
- `/locations/:id` — Station: directions to the counter, after-hours return, weekly hours with today marked, map, cars parked there
- `/deals` — Deals: six codes with plain terms, each carried straight into a booking
- `/faq` — FAQ: searchable questions in four topics as accessible disclosures
- `/about` — About: story, the between-rentals checklist, what we won't do, team

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The booking keeps its draft in sessionStorage, prices every line (weekly rate, deal rules, cover, extras, young-driver and one-way fees, airport fee, sales tax) in the browser, validates each step and ends on a confirmation key tag; deal codes are checked against the dates, car and stations you chose. The bag planner, fleet filters, FAQ search and footer sign-up all run locally. Nothing is sent, booked or charged, and Roam is a fictional brand.

## Credits

Fonts Encode Sans Expanded and Encode Sans (SIL OFL 1.1), images → src/assets/SOURCES.md, icons Lucide (ISC). Code MIT.
