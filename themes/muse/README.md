# Muse

Clothes for the in-between hours, cut and finished in Paris. A fashion label website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: AW26 campaign hero with shop links, new-in grid, look filmstrip, house statement, the Hours Coat split feature, category index, atelier band, journal teaser, and a close with live store status and service promises
- `/collection` — Collection: _The Quiet Hours_ lookbook, ten looks pinned on an hour-of-the-day timeline
- `/collection/look-04` — Look: full-height look, day-line navigation, previous/next, and shop-the-look (pick pieces and sizes, add all to bag)
- `/shop` — Shop: category, colour and size filters (drawer on mobile), sort, live result count
- `/shop/hours-coat` — Product: colour-switched gallery, size picker with size guide, quantity, composition and care, looks that feature it, related pieces
- `/journal` — Journal: entries filtered by topic (Atelier, Collection, Materials, Care)
- `/journal/forty-hours-in-a-coat` — Article: long-form reader with pull quotes and the pieces featured in the story
- `/stores` — Stores: Paris, London and New York with hours, live open/closed status, in-store services and an appointments FAQ
- `/house` — The House: story, how we work, where it is made, the studio team and atelier visits
- `/bag` — Bag: persisted lines with quantity controls, delivery threshold and summary
- `/checkout` — Checkout: delivery or store collection, gift option, validated contact/address/card form and order confirmation

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, products, looks, posts, stores, checkout options). `src/styles.css` holds the design system with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The bag is stored in `localStorage` (and still works for the visit when storage is blocked); shop-the-look, product variants and quantities all write to it. Checkout validates every field in the browser and shows a confirmation with a demo order number, then empties the bag. Newsletter and look forms confirm locally. Nothing is sent, charged or stored on a server, and Muse is a fictional brand.

## Credits

Fonts: Bodoni Moda and Jost (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
