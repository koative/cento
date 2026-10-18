# Riff

Loud-quiet rock from a Baltimore basement. A band & musician website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: show-bill hero with the new record and next dates, tour ledger, the record with the preview player, press quote, videos, merch, the band, every record, homecoming show close
- `/tour` — Tour dates grouped by month, region filter, city/venue search, played dates with setlists
- `/tour/:id` — Show page: generated letterpress show bill, door times and venue facts, ticket tiers into the cart, waitlist for sold-out nights, setlist for played ones
- `/music` — Discography with type filter and date sort
- `/music/:slug` — Album page: cover, formats, streaming links, tracklist player with scrubbable waveform, liner notes, credits, videos, more records
- `/videos` — Featured screen, filterable video list
- `/merch` — Store with category filter and price sort, shipping & returns
- `/merch/:id` — Product: editions/sizes, quantity, add to cart, details, related items
- `/cart` — Cart for merch and tickets, persisted in localStorage
- `/checkout` — Contact, delivery, payment form with validation and order confirmation
- `/press` — Short/long bio with copy, fact sheet, quotes, photos, contacts, guest-list request form
- `/about` — Story, members, timeline, house rules

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The record player plays 30-second previews and keeps going in a bar at the bottom of the screen while you browse; without real audio files it synthesises a short bass-and-kick sketch at each track's tempo (add an `audio` URL to a track in content.ts to use a real file). Tickets and merch go into one cart stored in your browser; checkout, the waitlist, the press guest-list request and the mailing list validate locally and show a confirmation. Nothing is sent, charged or stored anywhere else. Riff, its members, venues, press and prices are fictional.

## Credits

Fonts: Six Caps and Work Sans (SIL Open Font License). Images → src/assets/SOURCES.md. Icons: Lucide (ISC). Code MIT.
