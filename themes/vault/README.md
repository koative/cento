# Vault

Cover for the home you actually live in. A home & renters insurance website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a sample policy schedule, the eight covers as an index, the room-by-room contents counter, annotated policy clauses, claims steps, member stories, premium split, help search, close
- `/cover` — Cover: all eight policies and add-ons with situation filter, sort and an A–F comparison table
- `/cover/:slug` — Cover page (e.g. `/cover/renters`): schedule with plain-English column, who it suits, exclusions, a claim story, FAQ, related cover
- `/quote` — Get a quote: four-step form (home, things, cover, about you) with validation, a live draft schedule, monthly/annual billing and a quoted confirmation; accepts `?cover=` and `?contents=`
- `/claims` — Claims guide: "What happened?" triage for six incidents, first-call-to-payment timeline, claims promise
- `/help` — Help centre: live search, topic filter, FAQ, policy desk contacts
- `/help/:slug` — Help article (e.g. `/help/choosing-a-deductible`) with related articles and a "did this help" prompt
- `/about` — About the mutual: story, milestones, principles, people, where premiums go

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (covers, rates, rooms, incidents, articles, people). Design tokens sit at `:root` in `src/styles.css`; imagery lives in `src/assets`.

## Demo behaviour

The quote prices a policy locally from illustrative rates in `content.ts`, validates every step, shows a loading state and issues a made-up quote reference; the contents counter, claims triage, help search and newsletter form all run in the browser. Nothing is sent, stored or charged, and no insurance is offered. Vault and everyone in it are fictional.

## Credits

Fonts: Merriweather and Merriweather Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
