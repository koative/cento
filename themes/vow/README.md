# Vow

Every detail carried, so you can simply be there. A wedding planner website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — home: wedding folio hero, packages menu card, featured wedding, live countdown, approach, planning process, more weddings, couples' words, journal, enquiry close
- `/services` — four packages with fees switched by guest count, comparison table, add-ons, FAQ
- `/planner` — countdown planner: date, guests, budget and priorities produce a dated, tickable milestone list with a "today" marker, a budget split and a package suggestion
- `/weddings` — portfolio with setting filter and sort
- `/weddings/:slug` — wedding story: specs, the brief / the day / what we solved, gallery, quote, supplier credits, related weddings
- `/journal` — articles with topic filter and search
- `/journal/:slug` — article with author note and related reading
- `/about` — the studio: story, principles, team, process, visit details
- `/enquire` — enquiry form prefilled from the planner, with validation and a confirmation state
- anything else — not found page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (packages, weddings, journal, team, planner milestones and budget shares). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The planner saves its date, guest count, budget, priorities and ticked milestones in `localStorage` (it still works for the visit when storage is blocked), and the enquiry form picks up the planned date and guests. Forms validate in the browser and show a confirmation, but nothing is sent, booked or charged. Vow, its people, couples, venues, suppliers and prices are fictional.

## Credits

Fonts: Italiana and Raleway (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
