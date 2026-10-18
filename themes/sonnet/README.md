# Sonnet

Small classes, real conversation, from the first evening. A language school website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: word card in six languages, courses starting soon, the six language rooms, the method in parallel text, a one-sentence sample test, a Tuesday at the school, teachers, student voices, term dates and a close with opening hours
- `/courses` — Course ledger filtered by language, level and format, sortable by start date, price or places left (`?lang=` preselects a language)
- `/courses/:id` — Course page: phrase and translation, gallery, details card, outcomes, week-by-week syllabus, teacher entry, related courses
- `/level-test` — Eight-sentence placement test in French, Spanish, Italian or German, marked in red pen with a CEFR level and matching groups
- `/timetable` — The week Monday to Saturday, filtered by language and time of day
- `/teachers` — Teachers set as dictionary entries, filterable by language
- `/fees` — Ways to study with a per-term / whole-year toggle, term dates, discounts, FAQ
- `/about` — Story, four rules, a floor plan of the six poet-named rooms, visiting hours
- `/enrol` — Enrolment form with live summary, validation and confirmation (`?course=` preselects a course)

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (languages, courses, teachers, test questions, fees). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The level test marks your answers in the browser and remembers the last result in `localStorage`, so the enrolment form can suggest your level; it works without storage too. Course filters, the timetable, the fees toggle, the enrolment form and the newsletter signup all run locally: nothing is sent, stored on a server or charged. Sonnet, its teachers, students, prices and dates are fictional.

## Credits

Fonts: Alegreya and Alegreya Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
