# Iron

Heavy iron, honest coaching, a timetable that starts at 5:45. A gym & personal training website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: live "next on the floor" board, class families colour-coded like bumper plates, week heatmap, personal training, coaches, bar loader, memberships, the floor, member quotes, join close
- `/timetable` — Weekly timetable with class-type, coach and time-of-day filters; day switcher on mobile
- `/classes` — Class list with family filter and sorting
- `/classes/:id` — Class page: facts, how the hour runs, what to bring, this week's sessions, related classes (8 classes)
- `/trainers` — Coaches with a focus filter and personal-training rates
- `/trainers/:id` — Trainer profile: bio, specialties, qualifications, PT days, this week's classes (6 trainers)
- `/memberships` — Three plans with monthly/yearly toggle, comparison table, day passes, PT blocks, policies, FAQ
- `/programme` — Programme builder: goal, days, experience and lifts in, a four-week block out, every set loadable on the barbell drawing
- `/join` — Three-step join flow (plan, Foundations group, details + health questions) with validation and a confirmation
- `/about` — The gym: story, house rules, equipment, hours, getting here, access
- Any other route — Not found

## Run

```
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (classes, trainers, timetable, plans, programme rules). Design tokens live at `:root` in `src/styles.css`. Imagery is in `src/assets`.

## Demo behaviour

The timetable, filters, programme builder and join flow all run in the browser. The programme builder saves its inputs to `localStorage` on this device (and still works when storage is unavailable); the join flow validates every field, shows a loading state and a confirmation with a sample membership number. Nothing is sent, booked or charged anywhere, and Iron, its coaches, members and prices are fictional.

## Credits

Fonts: Archivo Black and Archivo (SIL OFL 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
