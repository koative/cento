# Signal

Know which change moved the number. A product analytics SaaS website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: live query composer (pick measure, event, breakdown and period; the chart and the query rewrite themselves), SDK install, booking funnel, retention cohort grid, event catalog excerpt, customer quote, privacy commitments, SDK list, customer stories, pricing teaser, demo close
- `/product` — Capabilities (dashboards, funnels, retention, event catalog, alerts) each with a working SVG visual, data pipeline, performance specs
- `/pricing` — Monthly/yearly toggle, three plans, event-volume calculator that picks the cheapest plan, comparison table, enterprise band, FAQ
- `/customers` — Six customer stories with industry filter, search and sort
- `/customers/:slug` — Story: before/after chart with the release annotated, company facts, problem, approach, quote, what they built, related stories
- `/changelog` — Releases filterable by New / Improved / Fixed
- `/docs` — Docs teaser: SDK quickstart tabs with copyable code, filterable guide list, HTTP API endpoints
- `/about` — Story, principles, timeline, team, open roles
- `/demo` — Book-a-demo form with validation, loading and success states
- `/signin` — Sign-in screen (UI only; a valid email and 8+ character password open the app demo)
- `/app` — Demo workspace overview: KPI switcher, SVG line chart with previous-period comparison and keyboard cursor, CSV export, traffic sources, top pages, retention grid
- `/app/funnels` — Funnel builder: saved funnels, add/remove/reorder steps, conversion window and platform, live SVG funnel and step table
- `/app/events` — Event catalog table: search, category and status filters, sortable columns
- `/app/events/:id` — Event detail: verify/deprecate, volume chart, properties, funnels using it, related events
- `/app/settings` — Workspace settings, team roles and invites, API key reveal/copy/regenerate, notification toggles

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`; the static output in `dist/` uses a relative base and works from any subfolder.

## Customize

`src/content.ts` holds all copy and demo data, `src/styles.css` holds the design tokens at `:root`, and `src/assets/` holds imagery sources.

## Demo behaviour

Every interactive flow runs locally in the browser: the query composer, charts, funnel builder, event table, settings, pricing calculator and all forms work on fictional demo data held in React state, and reset on reload. The CSV export builds the file in the browser. Forms validate and show a success state, but nothing is sent, stored or charged anywhere. Signal, Fernway and every company, person and number on the site are fictional.

## Credits

Fonts: Geist and Geist Mono (SIL Open Font License). Images: none; every chart, funnel and logo is authored SVG/CSS — see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
