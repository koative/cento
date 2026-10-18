# Forma

Architecture built around the light. An architecture studio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: featured-project hero with title block and switcher, recent work, the studio's questions, interactive light study, building types, six-stage ruler, studio strip, awards, journal, closing call to action
- `/projects` — Projects: register table with hover preview or photo plates, filter by building type, search by place or material, sort by name, area or year
- `/projects/:slug` — Project case page (nine projects): cover, facts sheet, story sections with images, light study of a key room, materials schedule, client quote, related journal entries, previous/next and more projects
- `/studio` — Studio: intro, principles, people, awards, press and careers
- `/process` — Process and fees: fee-share bar, six stages with durations and deliverables, fee table, FAQ disclosures
- `/journal` — Journal: category filter, lead entry and list
- `/journal/:slug` — Journal entry (six entries): article with headings and pull quote, related project
- `/contact` — Start a project: validated enquiry form (building type, site, start, budget, brief) with loading and success states, studio details
- Any unknown route — Page not found

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works from any subfolder.

## Customize

`src/content.ts` holds all copy and data (studio, projects, sections for the light study, people, fees, posts). `src/styles.css` holds the design system, tokens at `:root`. Imagery lives in `src/assets` (credits in `src/assets/SOURCES.md`).

## Demo behaviour

The light study computes the sun's position for each project's latitude and draws how far direct sun reaches into a room section; it can be scrubbed or played through the day for midwinter, equinox and midsummer. Project filters, search, sort and view mode run in local state, the enquiry and newsletter forms validate in the browser and show a confirmation, and nothing is sent, stored or charged. Forma, its people, projects and awards are fictional.

## Credits

Fonts: Familjen Grotesk and Newsreader (SIL Open Font License). Images: see `src/assets/SOURCES.md` (CC0). Icons: Lucide (ISC). Code: MIT.
