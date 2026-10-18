# Dispatch

A Sunday letter on the machinery of ordinary life. A newsletter & personal blog website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the tagline and free signup beside this Sunday's postmarked letter, its opening lines, recent letters index, topics, a feature photograph, the weekly delivery route, reader replies, the writer, this week's sponsor and a closing signup
- `/archive` — Archive: search, topic chips, letters/Field Notes filter and sort, grouped by year, with an empty state
- `/archive/:slug` — Post reader: postmark header, lead photo, sidenotes, sponsor slot, text size and night reading, reading progress with minutes left, a paywall preview for Field Notes, reply by email, older/newer and related letters
- `/topics` — Topics: each beat with its intro, cover photo and latest letters
- `/topics/:id` — Topic: intro, every letter in the topic, other topics
- `/about` — About the writer: bio, portrait, timeline, how Dispatch works, contact
- `/subscribe` — Subscribe: Free / Reader / Patron with monthly-yearly toggle, the "Your month of Dispatch" delivery calendar with inbox preview, a validated signup form and FAQ
- `/sponsor` — Sponsor: audience, sponsorship rules, placement picker, open Sundays with live total and bundle discount, and an enquiry form
- Any unknown route — a "return to sender" not-found page

## Run

```
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: writer, posts, topics, tiers, delivery schedule, sponsor rates), `src/styles.css` (tokens at `:root`, night reading tokens under `[data-theme="night"]`), `src/assets` (imagery).

## Demo behaviour

Every form validates in the browser (including common email-domain typos) and shows a loading and a success state, but nothing is sent, stored on a server or charged. The delivery calendar computes next month's emails for the chosen plan, the slot picker totals a sponsorship with its bundle discount, and the reader remembers text size, night reading and the Field Notes preview in `localStorage` (it still works when storage is unavailable). Dispatch, Ines Calder, the readers, sponsors and figures are fictional.

## Credits

Fonts: Petrona and Inter Tight (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
