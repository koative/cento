# Vector

Six electric cars, with the range you get in January. An electric car maker website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: line-up switcher with a morphing dimensioned elevation, winter-range statement, same-scale line-up drawing, sticker vs 20 °F range bars, configurator teaser, charging stops table, owner stories, studios, closing CTA
- `/models` — Models: all six cars drawn to scale, filters (price, seats, AWD, towing), sort and an empty state
- `/models/:slug` — Model page: drawing with paint picker, trim toggle and spec table, story, highlights, range estimator (temperature, speed, wheels), related models
- `/configure` and `/configure/:slug` — Configurator: model, trim, paint, wheels, interior and packages update the drawing, price, range and 0–60 live; build saved in localStorage
- `/reserve` — Reserve: deposit form with validation, build summary and a confirmation with reservation number
- `/test-drive` — Test-drive booking: model, studio or home start, day and time slots, contact details, confirmation
- `/charging` — Charging: home charging and Vector Grid, charging-time calculator with a power curve, tariffs, FAQ
- `/owners` and `/owners/:slug` — Owners: software release notes, service, warranty, FAQ, owner stories and full story pages
- `/about` — Company: founding story, Plant One, principles, timeline, leadership, sustainability

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The configurator, range estimator and charging calculator compute everything in the browser from the data in `content.ts`; the current build is kept in `localStorage` (and works without it). The reservation, test-drive and newsletter forms validate locally and show a confirmation, but nothing is sent, booked or charged. Vector, its cars, people, prices and figures are fictional.

## Credits

Fonts: Red Hat Display and Red Hat Text (SIL Open Font License). Images: see `src/assets/SOURCES.md` (CC0, Wikimedia Commons). Car drawings are authored SVG. Icons: Lucide (ISC). Code: MIT.
