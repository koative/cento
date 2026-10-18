# Grid

Your roof, wired to run your home. A home solar & energy website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a real installation, product categories, the hour-by-hour energy-flow day, product rail, before/after utility statements, six-step timeline, featured case study, payment options table, crew and guarantees, FAQ, closing call to action
- `/planner` — Solar planner: place panels on a roof face around a chimney, skylights and a vent; choose orientation, bill, batteries and an EV; live yearly estimate, price and payback; the day-flow diagram for your layout; the assumptions behind it
- `/products` — Products: eight items with datasheet drawings, category filter and sort
- `/products/:id` — Product: front elevation with dimensions, price, highlights, specifications, case studies it appears in, items usually fitted with it
- `/financing` — Financing calculator: cash, loan or subscription; price, bill, coverage, down payment and term; monthly comparison and a 20-year cumulative cost chart; side-by-side table
- `/how-it-works` — How it works: six steps with what we do / what you do, installation day hour by hour, written guarantees, FAQ
- `/case-studies` — Case studies: six homes with filter by system and sort by recency or saving
- `/case-studies/:slug` — Case study: the house, what was fitted, a year later, quote, twelve months of bills before and after, hardware list
- `/about` — About: story, facts, crew photos, principles, team, visiting the yard
- `/quote` — Get a quote: three-step form with validation, planner design summary, confirmation state
- any other route — Not found

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data, including the energy model rates and prices), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The planner saves your roof layout, orientation, bill, batteries and EV choice in `localStorage` (it falls back to memory if storage is blocked) and carries them into the financing calculator and the quote form. All estimates come from a simple average-day model with illustrative rates. The quote and newsletter forms validate in the browser, show a short sending state and a confirmation; nothing is sent, booked or charged anywhere. Grid, its people, customers, prices and products are fictional.

## Credits

Fonts: Lexend (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
