# Nest

Big days for small people, on Linden Row. A childcare & nursery website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with the six rooms as coat-peg labels, age growth chart and room mosaic, live day timeline, care principles, session prices, this week's menu, a parent's story, room leads, FAQ teaser and next free tour slots
- `/rooms` — Rooms by age: age slider that places your child on the growth chart and names their room and move-up date, stage filter, all six rooms
- `/rooms/:id` — Room page (e.g. `/rooms/finches`): ages, ratio, places, session prices, what the room is working on, weekly rhythm, room lead, what to bring, the shape of the day, younger/older room pager
- `/day` — A day at Nest: age-group switcher, scrubbable hour-by-hour timeline that highlights what is happening right now, Nest Notes diary app, outdoors and food
- `/fees` — Fees calculator: pick a room and a session per weekday, see weekly and monthly totals with pre-K credit and sibling discount, then carry the pattern into a tour booking; billing notes
- `/parents` — Parent info: settling-in steps, packing checklist, weekly menu, policies, closure dates and FAQ
- `/team` — Team: leadership, room leads and kitchen & garden staff on coat-peg labels, careers
- `/about` — Our story: history timeline, principles, the house/garden/woods, staffing ratios, family testimonials
- `/tour` — Book a tour: slot picker with full slots, contact and child details with room suggestion from the birthday, validation and confirmation

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: rooms, sessions and prices, day plans, team, menu, policies, tours), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The fees calculator, age finder, day timeline, packing checklist, tour booking and newsletter sign-up all run locally in the browser. Tour slots are generated from today's date; the calculator's chosen days are carried into the tour form for the current visit only. Nothing is sent, booked or charged, prices and credit rules are illustrative, and Nest, its staff and families are fictional.

## Credits

Fonts: Fredoka and Nunito (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
