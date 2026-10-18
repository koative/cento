# Encore

Eight productions, one house, and every seat with its view. A theatre website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the production now playing with its next four performances, the season playbill, a try-it seat-view preview, the holiday show, upcoming access performances, membership, learning, visit and a closing curtain.
- `/season` — Season: every production grouped by opening month, filterable by stage and genre, with search across titles, writers and cast.
- `/season/:slug` — Production: hero, facts, synopsis, content guidance, cast and creative team, reviews, gallery, prices, access performances, the next performances with availability, and related productions.
- `/book/:slug` — Seat booking: choose a performance (filter evenings, matinees, access), pick up to eight seats on the auditorium map with a live view-from-seat preview and per-seat ticket types, enter details, and get ticket stubs on confirmation.
- `/membership` — Membership: four tiers with a monthly/yearly toggle, a benefit comparison table, a join form (with gift and under-30 options) and FAQ.
- `/learning` — Learning & participation: classes and companies filterable by audience, the youth company's production, teachers and bursaries.
- `/visit` — Plan your visit: getting here, box-office hours with a live open/closed status, access, where to sit, the bar menu and FAQ.
- `/about` — About: the building's story, a timeline, the people who run the house, supporters, jobs and venue hire.

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (productions, seat layouts and price zones, membership tiers, programmes, hours). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Seat availability is generated deterministically per performance, so the same seats are sold on every visit, and performances in the past drop out of the booking flow automatically. Choosing seats, ticket types, joining as a member and signing up for the newsletter all run locally with validation and success states; nothing is sent, held or charged. Encore Theatre, its productions, people and prices are fictional.

## Credits

Fonts: Abril Fatface and Karla (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
