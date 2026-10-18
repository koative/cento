# Folio

Three rooms, eight artists, every price on the wall label. A contemporary art gallery website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the current exhibition with its lead work, also on view, the building with live open/closed status, works for sale from the viewing room, the true-scale wall preview, artist roster with hover preview, talks and late nights, coming next, editions and books, private-viewing close
- `/exhibitions` — Exhibitions: on now, upcoming and past, filterable by status
- `/exhibitions/:slug` — Exhibition: dates, room, admission and live status, installation view, text, related events, every work with price or sale status, one-click enquiry about all available works
- `/artists` — Artists: the eight represented artists with medium, biography line and current or coming shows
- `/artists/:slug` — Artist: statement, biography, works, exhibitions at Folio and a selected CV
- `/viewing-room` — Viewing room: 16 priced works filterable by artist and price band, four sort orders, a saved list kept between visits and a sticky "enquire about N" action
- `/viewing-room/:id` — Work: wall label with size in cm and in, price, description, save to list, true-scale wall preview, more by the artist
- `/visit` — Visit: weekly hours with today highlighted and live status, authored street map and directions, the three rooms, access, FAQ
- `/shop` — Editions & books: signed editions, catalogues and posters with type filter and sort
- `/shop/:id` — Shop item: framing option, quantity, add to bag, specs, related items
- `/bag` — Bag & checkout: quantities, delivery or collection, validated details form, order confirmation
- `/about` — About: the bindery story, how the gallery works, opening night, team, close
- `/enquire` — Enquire: the saved list, topic, preferred viewing date and a validated enquiry form with success state

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (artists, works and their drawn geometry, exhibitions, events, shop, hours, visit, team). `src/styles.css` holds the design tokens at `:root`. Photography lives in `src/assets`.

## Demo behaviour

The viewing-room list and the bag are saved in `localStorage` (and still work if storage is blocked). The true-scale preview redraws any work on a gallery wall, living room, hallway or a wall of your own size, at a hanging height you choose, in centimetres or inches. Opening status follows the visitor's clock and the hours in `content.ts`. The enquiry, checkout and newsletter forms validate in the browser and show a confirmation; nothing is sent, booked or charged, and Folio is a fictional brand.

## Credits

Font: Hanken Grotesk (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
