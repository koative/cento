# Heirloom

Rings and jewels made by hand, to be worn and handed on. A jewelry atelier website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the house solitaire, collection index, featured pieces, live metal-switching ring teaser, bespoke timeline, heirloom remodelling, client quote, the atelier, promises, appointment close with hours
- `/collections` — All pieces with metal, stone, price and ready-to-ship filters plus sorting, with an empty state
- `/collections/:collection` — The same listing scoped to Engagement, Wedding bands, Signets, Earrings or Pendants
- `/collections/:collection/:piece` — Piece page: drawing that redraws per metal, metal swatches, ring size or chain length, inside engraving with live preview (initials cut into the face for signets), quantity, add to bag, story, specifications, related pieces
- `/ring-builder` — Ring builder: setting, stone, cut, carat, metal and band choices redraw a side view, a top view of the stone and the engraved band, with an itemised price and add to bag
- `/bespoke` — Six-stage commission process, heirloom remodelling, before/after drawing, guide prices, FAQ
- `/atelier` — Story, Saint Eligius print, the bench, the six makers, how we work, visiting hours
- `/appointments` — Booking form: appointment type, atelier or video, date (closed days rejected), open time slots, contact details, validation and confirmation
- `/care` — Ring size chart with a diameter-to-size finder, care guide, warranty/returns/delivery FAQ
- `/cart` — Bag with drawings, quantities, removal and summary
- `/checkout` — Contact, delivery method, address, gift box, card details with validation, loading state and order confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (pieces, prices, metals, stones, builder pricing, appointments, care tables). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`; piece drawings are generated from each piece's `art` record by `src/components/Plate.tsx`.

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit if storage is blocked). The ring builder, piece options, appointment booking, checkout and newsletter forms validate and confirm entirely in the browser: nothing is sent, booked or charged, and card numbers are only checked for shape. Heirloom, its makers, clients, address and prices are fictional.

## Credits

Fonts: Cinzel and Cormorant Garamond (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
