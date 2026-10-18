# Frame

Photographs made slowly, mostly on film, printed to last. A photographer portfolio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: cycling hero print with gallery label, the six series, a statement, a featured series, commissions, editioned prints, clients and testimonial, exhibitions and events, enquiry close
- `/series` — Series index: subject filter, covers or contact-strip layout
- `/series/:slug` — Series viewer: light-table stage, contact sheet with edge codes, arrow-key navigation, red china-marker marks, essay, prints from the series, next series
- `/commissions` — Disciplines with day rates, how a commission runs, rates table, testimonials, FAQ disclosure
- `/prints` — Editioned prints: filter by series, sort by price or scarcity, hide complete editions
- `/prints/:id` — Print: size and framing options, live to-scale wall preview, edition count, quantity, specs, related prints
- `/order` — Print order: quantities, flat-rate shipping, delivery form with validation, confirmation
- `/about` — The photographer, studio, principles, exhibitions/books/recognition record, kit, upcoming dates
- `/contact` — Enquiry form by type (commission, licensing, prints, other) that carries the frames you marked

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Marked frames and the print order are kept in `localStorage` (the site still works without storage). The order checkout, contact enquiry and studio-letter signup validate locally and show a confirmation; nothing is sent, charged or stored on a server. Noor Halvorsen, Frame and every client, price and date are fictional.

## Credits

Fonts: Tenor Sans and Spectral (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
