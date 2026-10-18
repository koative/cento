# Still

Less noise. More you. Slow yoga, breath and rest, taught plainly. A yoga & meditation studio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with the next three bookable classes, philosophy, the eight classes with hover preview, a one-minute breathing timer, the week at a glance, teachers, first-visit offer, member quotes, prices and a close that books tomorrow's first class
- `/schedule` — the next seven days, day strip, filters by class family, teacher, time of day and availability, places left and book/waitlist links
- `/classes` — eight classes with family filter and sorting by effort, length or name
- `/classes/:slug` — class detail: facts, who it's for, what to bring, the shape of the hour as a timeline, this week's sessions, teachers and related classes
- `/teachers` — five teacher profiles with quotes and classes
- `/teachers/:slug` — teacher detail: bio, training, their next seven days, classes they teach
- `/memberships` — first-fortnight offer, memberships with monthly/yearly toggle, class passes, comparison table, policies, FAQ
- `/breathe` — the breathing guide: four patterns, three lengths, an animated SVG dial with phase countdown, plus notes on when to use each pattern
- `/book` — booking form: class picker, payment option, details with validation, loading and confirmation states (waitlist when full)
- `/visit` — address, front-desk hours, map, getting there, first class step by step, what to bring, FAQ
- `/about` — studio story, values, the two rooms with a floor plan, the yearly retreat

## Run

`bun install && bun run dev` (build: `bun run build` — static output in `dist/`, relative base works in any subfolder)

## Customize

`src/content.ts` (all copy and data: classes, teachers, weekly timetable, prices, breathing patterns), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The schedule is generated from a fixed weekly timetable for the seven days starting today; places left are deterministic demo numbers. Booking validates locally, simulates a short save and shows a confirmation or waitlist message; the footer newsletter form validates and confirms. The breathing guide runs entirely in the browser. Nothing is sent, stored, booked or charged, and Still is a fictional brand.

## Credits

Fonts Fraunces and Nunito Sans (SIL OFL 1.1), images → `src/assets/SOURCES.md`, icons Lucide (ISC). Code MIT.
