# Monograph

A quarterly of slow attention. One word, four times a year. An independent magazine website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the current issue's cover and contents, the lead essay, more from the issue (online and print-only), a pull quote, the photo portfolio, the five sections, back issues, contributors as a typeset run-in, and a subscription close
- `/stories` — every online story with search, section filter and ordering
- `/read/:slug` — the article reader: standfirst, byline, hero, side notes, pull quotes, text size and lamplight controls, a print folio counter, author note, the issue it ran in and related stories
- `/issues` — the issue archive with authored covers and an "in print only" filter
- `/issues/:no` — one issue: cover, price and stock, editor's letter, full contents with page numbers, object specs, previous/next issue
- `/sections/:slug` — Essays, Reportage, Conversations, Fiction, Portfolio: what the section is, its online stories and its print-only pieces
- `/contributors` — writers and photographers, plus how to pitch
- `/contributors/:slug` — a contributor's bio, online stories and print pieces
- `/subscribe` — print, digital, gift or single-issue orders with a 1/2-year toggle, a live order summary, validated details and address, confirmation, and an FAQ
- `/about` — the magazine's principles, masthead, submissions, stockists and office
- any other route — a 404 page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (issues, articles, sections, contributors, plans, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Search and filters run on local data. The reader remembers text size and lamplight mode in `localStorage` (it still works when storage is unavailable). The subscribe form and the Sunday letter sign-up validate in the browser and show a confirmation; nothing is sent, stored on a server or charged. Monograph, its people, issues and prices are fictional.

## Credits

Fonts: Libre Bodoni and Literata (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
