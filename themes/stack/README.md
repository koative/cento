# Stack

Durable jobs, events and webhooks for TypeScript backends. A developer documentation website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — docs home: install command with package-manager switch, annotated code and worker log, contents, job-flow diagram, code tour, API at a glance, playground teaser, clients table, recent releases, support close
- `/guides` — guides index filtered by topic and level, sortable by reading order, recency or length
- `/guides/:slug` — guide page (9 guides) in the docs shell: sidebar, sections with code, steps, notes and SVG diagrams, on-this-page rail with scroll tracking, feedback, previous/next
- `/api` — API reference overview: basics, authentication, error table, pagination, resource index
- `/api/:slug` — resource reference (6 resources): object fields, every endpoint with parameters, request and response examples, link into the playground
- `/playground` and `/playground/:op` — request console: pick any of 16 endpoints, edit path/query params and JSON body, get validated responses, live cURL / fetch / Python code, session history
- `/changelog` — releases filterable by change type, breaking releases flagged
- `/search` — search across guides, API and changelog with type filters, highlighted matches and empty states (press `/` anywhere)
- `/about` — project story, principles, maintainers, governance
- `/support` — support ticket form with validation and confirmation, response times, FAQ

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: guides, API resources and endpoints, releases, team), `src/styles.css` (tokens at `:root`), `src/assets` (sources list).

## Demo behaviour

The playground validates requests in the browser against the documented parameters (missing fields, wrong types, unknown keys, bad ids, malformed JSON) and answers from the reference examples; search, filters, copy buttons and the support and newsletter forms all run locally. Nothing is sent anywhere, no key is real, and Stack is a fictional brand.

## Credits

Fonts: IBM Plex Sans and IBM Plex Mono (SIL OFL 1.1). Images: none; all diagrams are authored SVG, see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
