# Flux

Let the handoffs run themselves. A workflow automation SaaS website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: live test bench in the hero (move the sample, run the workflow), connector wall, how Flux works, featured templates, customer quote, team tabs, guardrails, pricing teaser, changelog, close
- `/product` — Builder, test bench, run history and guardrails, each with an authored UI figure
- `/integrations` — Directory of 17 connectors with search, category filter and sort
- `/integrations/:slug` — Connector page: triggers, actions, plan, sign-in method, templates that use it, related connectors
- `/templates` — Template gallery filtered by team and app
- `/templates/:slug` — Template page with a runnable test bench, specs and "Use this template" (copies it into the demo workspace)
- `/pricing` — Plans with monthly/yearly toggle, run estimator, comparison table, FAQ
- `/customers` — Four customer stories
- `/changelog` — Releases filterable by type
- `/about` — Story, principles, team, offices
- `/contact` — Talk to sales form with validation and confirmation
- `/signin` — Sign-in screen (UI only)
- `/app` — Demo overview: usage figures, SVG run-volume chart, needs attention, latest runs
- `/app/workflows` — Sortable, filterable workflows table with live switches
- `/app/workflows/:id` — Workflow builder: select, edit, add, reorder and remove steps; edit the sample record and run a test
- `/app/runs` — Run history filtered by result and workflow, with replay of failed runs
- `/app/settings` — Workspace form, connections, people and invites

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: connectors, templates, plans, stories, demo workflows and runs), `src/styles.css` (tokens at `:root`), `src/assets` (sources list; the theme uses no raster images).

## Demo behaviour

Test runs walk each workflow's steps locally against a sample record and show where a condition stops it. The demo workspace keeps your edits, new workflows from templates, switches, replays, connections and invites in memory for the session; reloading resets it. Forms validate in the browser and show a confirmation, but nothing is sent, charged or connected anywhere. Flux, its connectors, customers and people are fictional.

## Credits

Fonts: Wix Madefor Display and Wix Madefor Text (SIL OFL 1.1). Graphics → `src/assets/SOURCES.md` (all authored SVG/CSS). Icons: Lucide (ISC). Code: MIT.
