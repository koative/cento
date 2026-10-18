# Campus

Learn a real skill in the evenings you already have. An online course platform website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a live lesson card, featured courses, subject index, a week of study, learner quote, workspace teaser with the interactive lens study, instructors, learners, pricing summary, closing call to action
- `/courses` — Catalogue: search, subject chips, level filter and sorting over 8 courses (`?subject=Data` preselects a subject)
- `/courses/:slug` — Course page: facts, outcomes, final project, syllabus disclosures, pace planner, instructor, reviews, sticky enrol panel, related courses
- `/instructors` — Six instructors with the courses they teach
- `/instructors/:slug` — Instructor profile: bio, quote, background, their courses, more instructors
- `/pricing` — Single course, Membership and Teams with a monthly/yearly toggle, seat calculator, comparison table and FAQ
- `/about` — Story, teaching rules, how a course gets made, team
- `/signup` — Account form with plan and billing choice, validation and success state
- `/signin` — Sign-in screen (demo: opens the workspace)
- `/learn` — Workspace desk: resume lesson, course progress, study-time chart, upcoming critiques, recent notes
- `/learn/:lesson` — Lesson player: lens study, exercise, understanding check, ruled notebook, mark complete, lesson pager
- `/learn/notes` — Notebook: every saved note, searchable, deletable, exportable as text

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (courses, syllabi, instructors, plans, workspace lessons). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Filters, the pace planner, pricing toggles and every form run entirely in the browser. Sign-up and newsletter forms validate and show a success state, but nothing is sent, stored on a server or charged. Workspace progress, check answers and notes are saved to `localStorage` (and still work for the session if storage is unavailable); "Reset demo" on the desk clears them. Campus, its instructors, learners, prices and figures are fictional.

## Credits

Font: Be Vietnam Pro (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
