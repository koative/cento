# Score

Lessons for every age, one teacher at a time. A music school website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with the trial CTA, a contents page of all ten programmes, the first lesson as four bars of a score, a playable keyboard that engraves notes on a staff, the faculty, the next recital's printed programme, ensembles, parent and student voices, fees table and a closing coda.
- `/programmes` — Programmes: filter by family and learner's age, plus search, with a live result count and empty state.
- `/programmes/:slug` — Programme page (e.g. `/programmes/piano`): facts, introduction, what to bring and hire, the four-stage path, this year's repertoire, who teaches it, fees per lesson/term/month and related programmes.
- `/teachers` — Faculty roster filterable by department.
- `/teachers/:slug` — Teacher profile: bio, repertoire on the stand, programmes, training, teaching days and a booking link that pre-selects the teacher.
- `/recitals` — Season list (coming up / already played) and how students get a recital spot.
- `/recitals/:id` — A printed concert programme with performers and a "Save to calendar" `.ics` download.
- `/practice` — Practice room: keyboard + staff with playback, a Web Audio metronome (tap tempo, four time signatures, tempo markings) and tuning notes for violin, viola, cello, guitar and bass at A = 440 or 442.
- `/fees` — Private lesson prices with a per lesson / per term / monthly toggle, group classes, instrument hire, extras, discounts and an FAQ.
- `/about` — Story, teaching principles, the building, visiting hours and teaching jobs.
- `/trial` — Trial lesson booking: programme, teacher, day chips, live open slots, learner details, validation and a confirmation state.

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (programmes, teachers and their teaching hours, recitals, fees, FAQ). `src/styles.css` holds the design system, with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Everything runs in the browser. The keyboard, metronome and tuning notes use Web Audio and only sound after you press something. Trial slots are generated from each teacher's hours for the next ten teaching days; booking validates the form, shows a short loading state and a confirmation, but nothing is sent and no lesson is booked. The newsletter form and "Save to calendar" work locally only. Score, its teachers, students, prices and concerts are fictional.

## Credits

Fonts: Brygada 1918 and Albert Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
