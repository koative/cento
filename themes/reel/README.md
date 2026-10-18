# Reel

Documentaries made slowly, with the people in them. A documentary film production website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the flagship film's trailer player in the first viewport, tour dates, the film slate, a press quote, the production board, the studio's approach, services, festival history and a screening call to action
- `/films` — Films: every film with stage chips, subject filter, search and sorting, plus an empty state
- `/films/:slug` — Film: trailer player with subtitles, transcript and keyboard controls, facts, synopsis, director's statement, stills, billing-block credits, press, festivals, upcoming dates, a screening or partnership call to action and related films (7 films)
- `/screenings` — Screenings: the programme grouped by month with film and city filters (accepts `?film=`), and the screening licences table
- `/services` — Services: commissions, co-production, impact tours, archive and finishing with timelines and budgets, the five-step process, a rate card and an FAQ
- `/studio` — Studio & team: story, working principles, the eight people and the rooms
- `/contact` — Contact: enquiry form whose fields adapt to the enquiry type (accepts `?type=` and `?film=`), with validation, a notice-period rule for screening dates, a sending state and a confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (films, trailer shots and subtitles, team, services, rates, screenings, licences, FAQ). `src/styles.css` starts with the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The trailer player cuts a silent trailer from each film's stills: shots drift and dissolve on a timeline you can scrub, with subtitles, a transcript that jumps to each line, keyboard controls and full screen. Filters, the enquiry form and the newsletter sign-up all run locally in the browser: nothing is sent, booked or charged. Reel, its films, people, venues, festivals and quotes are fictional.

## Credits

Fonts: Bebas Neue and Inter Tight (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
