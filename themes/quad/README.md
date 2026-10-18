# Quad

Study where the city meets the quad. Applications for 2027 are open. A university website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: programme search, key dates, four faculties, prospectus picks, student voice, module-planner teaser, research story and findings, upcoming events, five steps to enrolment, campus life, closing call to apply
- `/programmes` — Programme finder: search titles and modules, filter by level, faculty and part-time, sort by title, entry grades or length
- `/programmes/:id` — Programme page (e.g. `/programmes/history`): key facts (duration, start, typical offer, fees), overview, a typical week, the module planner with credit ledger and clash-checking timetable, assessment, graduate destinations, related programmes
- `/admissions` — How to apply, entry requirements and equivalent qualifications, tuition fees with home/international toggle, living costs, scholarships and bursaries, FAQ disclosures, dates to keep
- `/apply` — Three-step application form with validation, an attached module plan and a confirmation state
- `/campus-life` — Halls of residence (filter by catering and en-suite, sort by price or walk to the quad), interactive campus plan, societies, student support
- `/research` — Feature story, five institutes, recent findings filterable by institute, doctoral study
- `/events` — Open days, lectures, concerts and exhibitions, filterable by type and month
- `/events/:id` — Event page (e.g. `/events/autumn-open-day`): schedule, facts, places left and a reservation form
- `/about` — History timeline, the Vice-Chancellor's welcome, values, leadership and how to find us

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, programmes and modules, events, halls, fees), `src/styles.css` the design tokens at `:root`, `src/assets` the imagery.

## Demo behaviour

The programme finder, hall filters, fee toggle and campus plan run on local data. The module planner adds up credits towards 120, flags timetable clashes and, once a year adds up, saves the plan to `localStorage` and attaches it to the application. The application, event reservation and newsletter forms validate in the browser and show a confirmation; nothing is sent, stored on a server or charged. Quadwell University, Harrowmere and everyone named here are fictional.

## Credits

Fonts: Domine and Source Sans 3 (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
