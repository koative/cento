# Sprint

The board your standup actually looks at. A project management SaaS website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — home: live board preview, the weekly rituals, the sprint capacity planner, views, keyboard shortcuts, customer quote, integrations, recent releases, plans, close
- `/product` — product tour: board with WIP limits, cycles and burndown, triage inbox, roadmap, security
- `/pricing` — three plans with monthly/yearly toggle and seat calculator, comparison table, FAQ
- `/customers` — six customer stories filterable by team size and industry
- `/customers/:slug` — story with facts, the team's board columns, narrative, quote, setup, related stories
- `/changelog` — releases filterable by New / Improved / Fixed
- `/about` — company story with photography, principles, team, open roles
- `/contact` — talk-to-sales form with validation, sending and success states
- `/signin`, `/signup` — auth screens (UI only) that open the demo
- `/app` — demo board: drag and drop, Shift + arrow keys, touch column picker, WIP limits, quick add, assignee filter
- `/app/list` — sortable, searchable, filterable issue table
- `/app/issues/:key` — issue detail: editable status, priority, assignee, estimate, checklist, activity and comments
- `/app/settings` — workspace name, workflow WIP limits, members and invites, notification switches

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The planner, forms and the whole `/app` demo run in the browser only. Board moves, edits, comments and settings are kept in memory and mirrored to `localStorage` when available (Reset demo data restores the seed); forms validate and show their success states without sending anything, and nothing is charged. Sprint, its customers, people and prices are fictional.

## Credits

Font: Inter (SIL Open Font License). Images → src/assets/SOURCES.md. Icons: Lucide (ISC). Code: MIT.
