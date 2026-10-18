# Index

Three rooms of books, chosen by people who read them. An independent bookstore website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: front table of new books, open-now status, the card catalogue drawer, staff shelf cards, events, the club book, visit details and special orders
- `/books` — Catalogue: search, section/format/price filters, staff-picks toggle and six sort orders
- `/books/:slug` — Book page: format choice with stock, quantity, add to bag or buy now, the first line, shelf card, details and related books
- `/staff-picks` — Staff picks: every bookseller's handwritten shelf cards, filterable by bookseller
- `/events` — Events & readings, grouped by month and filterable by type
- `/events/:slug` — Event page with facts, the featured book and a validated chair reservation form
- `/book-club` — The Index Club: this month's book, how it works, membership builder (length + paperback/hardback switch), meetings, past reads, FAQ
- `/about` — Our story: timeline, the three rooms, booksellers, services, opening hours and an authored street plan
- `/cart` — Your bag: quantities, removal, free-delivery threshold
- `/checkout` — Checkout: collection/bike/post, address, gift wrap, card fields with validation and an order receipt

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`; static output goes to `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (books, booksellers, events, club, hours, delivery methods). `src/styles.css` starts with the design tokens at `:root`. Photographs live in `src/assets`.

## Demo behaviour

The bag is kept in `localStorage` (and still works for the visit if storage is blocked); checkout validates every field, shows a loading state and then a receipt, but nothing is sent and no card is charged. Event reservations, the club membership builder and the newsletter form work locally only. Index, its booksellers, authors, books and publishers are fictional.

## Credits

Fonts: EB Garamond and Karla (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
