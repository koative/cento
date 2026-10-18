# Alloy

Frames, civils and the difficult sites in between. A construction company website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with live "on site this week" progress, services index, interactive build programme, recent projects, safety statement, how a project starts, client quote, careers teaser, tender close
- `/services` — Six services with scope lists, value ranges and example projects, a jump index and a delivery-route comparison table
- `/projects` — Project index filterable by sector and status, sortable by date, value or name
- `/projects/:slug` — Project page (9 projects): title-block facts and quantities, story and scope, the scrubbable build programme, site gallery, client quote, related projects
- `/safety` — Stop-work authority, five-year safety record table, eight site rules, programmes behind the numbers, visitor and subcontractor FAQ
- `/careers` — Open roles filterable by discipline and office, benefits, apprenticeships, hiring steps
- `/careers/:id` — Job page (7 roles) with a validated application form
- `/about` — Story, timeline since 1987, how the company runs, leadership, offices and credentials
- `/tender` — Tender invitation or budget-estimate form with a live indicative cost range and programme length

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (projects with their programme phases, services, jobs, safety record, estimate rates). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The build programme player, filters, tender/estimate form, job applications and the footer bulletin signup all run locally in the browser: forms validate, show a sending state and a confirmation with a reference number, but nothing is sent, uploaded, stored or charged. Alloy, its projects, clients, people, figures and rates are fictional.

## Credits

Fonts: Anton and Barlow (SIL Open Font License). Images: see `src/assets/SOURCES.md` (CC0, WordPress Photo Directory). Icons: Lucide (ISC). Code: MIT.
