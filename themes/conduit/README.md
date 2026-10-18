# Conduit

One request format for every API your product touches. An API integration platform website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a working request console, patch-bay wiring diagram, connector preview, request pipeline, SDK quickstart, customer quote, uptime teaser, plan rail, changelog and guides, closing call to action
- `/platform` — Platform: auth vault, field mapping, retries and observability with authored diagrams, regions, security
- `/connectors` — Connectors directory with search, category chips, plan filter and sort
- `/connectors/:slug` — Connector page: actions, events, setup steps, facts, scopes, preloaded console, related connectors
- `/console` — Full request console with failure injection, retry policy, timing waterfall, response/headers/cURL and history
- `/pricing` — Plans with monthly/yearly toggle, usage estimator, comparison table, billing FAQ
- `/docs` — Docs teaser: quickstart, concepts, error codes, guides
- `/status` — System status: per-component 90-day uptime, region filter, incident history, email subscription form
- `/changelog` — Releases filterable by type
- `/customers` — Four customer stories with their connector wiring
- `/about` — Story, principles, team, offices, open roles
- `/signup` — Create a workspace (validated form with success state)
- `/signin` — Sign in UI with SSO button
- `/app`, `/app/connections`, `/app/logs`, `/app/settings` — Dashboard demo: traffic chart, sortable connections table with pause/resume, live log tail, API keys and delivery settings

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (connectors, plans, incidents, changelog, people, dashboard data). `src/styles.css` holds the design tokens at `:root`. `src/assets` holds SOURCES.md (the template ships no raster images).

## Demo behaviour

The request console runs a local model of the pipeline (auth, transform, upstream with retries and backoff) and plays it back with real-shaped responses; forms validate and show success states; the dashboard tails generated log lines and lets you pause connections and rotate keys. Nothing is sent, stored or charged, and state resets on reload. Conduit and every connector, company and person are fictional.

## Credits

Fonts: Bai Jamjuree and Golos Text (SIL OFL 1.1). Graphics are authored SVG/CSS — see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
