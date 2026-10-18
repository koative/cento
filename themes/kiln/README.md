# Kiln

Stoneware for the everyday table, fired in small batches. A ceramics studio & shop website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the latest mugs, new objects from the kiln, interactive glaze test-tile rack, the current firing schedule, upcoming workshop dates, founder quote, journal, visit hours and policies, closing call to action
- `/shop` — Shop: 13 objects with category, glaze and ready-to-ship filters, sort, and an empty state
- `/shop/:id` — Object page: catalogue number, glaze and size variants, quantity, add to bag, glaze test tile for the chosen variant, specs, making notes, related objects
- `/glazes` — Glaze bench: compose a cup, bowl, jug or vase from three clays, eight glazes and a dip depth, see it drawn live, and order it made to order; full glaze-by-clay test board
- `/workshops` — Workshops: six classes, a season calendar with places left, FAQ
- `/workshops/:id` — Workshop page: what you make, what is included, booking form with date picker, places, validation and confirmation
- `/studio` — Studio: story, four-week making process, the kilns, the potters, visit and wholesale
- `/journal` — Journal: four entries
- `/journal/:slug` — Journal entry with related objects and more entries
- `/cart` — Bag: quantities, removal, shipping threshold, made-to-order notice
- `/checkout` — Checkout: contact, post or collect, address validation, order summary and confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: products, glazes, clays, workshops, journal, studio), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit if storage is unavailable). Adding objects from the shop or made-to-order pieces from the glaze bench updates the header count, the checkout validates its fields and shows an order confirmation, workshop booking validates and confirms with a reference, and the footer sign-up confirms inline. Nothing is sent anywhere, nothing is charged, and Kiln and everyone in it are fictional.

## Credits

Fonts: Cardo and Red Hat Text (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
