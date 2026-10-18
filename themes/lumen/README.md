# Lumen

Glasses that fit your face, at one honest price. An eyewear brand website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: frame tray hero, itemised $145 order ticket, most-tried frames, face-shape teaser, sunglasses, lens guide teaser, eye exam steps, stores with live open status, reviews, eye-chart close
- `/frames` — Frames: range toggle (all/optical/sun), face-shape, shape, material and width filters, sort
- `/frames/:id` — Frame: live SVG front and measurement views, colour, size, lens type, lens index and light-reactive options, quantity, add to bag or buy now, specs, related frames
- `/face-shapes` — Face-shape finder: three mirror questions or a direct pick, the result drawn as an outline you can try frames and colours on, guide to all six shapes
- `/lenses` — Lens guide: lens types and prices, interactive lens thickness by index, how to read a prescription, what's included, FAQ
- `/stores` — Stores: four stores with hours, open status and eye test prices
- `/stores/:id` — Store: hours, directions, next free eye tests, optometrists, services
- `/eye-test` — Eye test booking: store, test type, day and time slots, details, validation and confirmation
- `/about` — Our story: origin, principles, timeline, team
- `/cart` — Bag: persisted lines with quantity and removal
- `/checkout` — Checkout: delivery or store collection, prescription entry (OD/OS SPH, CYL, AXIS, PD), payment fields, validation and order confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (frames, lenses, face shapes, stores, exams, about), `src/styles.css` the design system (tokens at `:root`), `src/assets` the imagery.

## Demo behaviour

The bag is saved in `localStorage` (and still works for the visit when storage is blocked). Frame options, the face-shape finder, the lens thickness slider, filters, eye-test booking, checkout and the newsletter form all run locally: forms validate in the browser and show a confirmation, but nothing is sent, booked or charged. Lumen, its stores, people, prices and reviews are fictional.

## Credits

Font: Host Grotesk (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
