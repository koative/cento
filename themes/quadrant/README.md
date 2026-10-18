# Quadrant

Strategy that survives Monday morning. A management consultancy website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the capability index, engagement timeline, the interactive priority matrix, client results beside an exhibit, client quote, industries, latest insights, partners, closing call to action
- `/capabilities` — Capabilities: six practices with action titles, typical questions, length, lead partner, and how fees work
- `/capabilities/:slug` — Capability: questions clients bring, an exhibit with recent work, engagement phases, deliverables, team and fees, lead partner, further reading
- `/industries` — Industries: sortable industry × capability engagement heatmap, then each industry's agenda, lead and strongest capabilities
- `/insights` — Insights: search, format filter, capability filter and sort over research, articles and briefings
- `/insights/:slug` — Article: byline, numbered exhibits, pull quotes, author note, read next
- `/people` — People: the firm's facts and rules, partners with biographies, leadership directory filterable by office, offices
- `/careers` — Careers: hiring process, open roles filterable by track and office with salary ranges, benefits, candidate FAQ
- `/contact` — Contact: validated enquiry form routed to the relevant partner, offices and other contacts

## Run

```
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (capabilities, industries, people, insights, roles, offices, matrix presets). `src/styles.css` holds the design system, with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The priority matrix runs entirely in the page: drag points or move them with the arrow keys, rename, add or remove initiatives, and the memo rewrites itself. The insights, industries, people and careers filters work on local data. The enquiry form and the newsletter sign-up validate in the browser and show a confirmation, but nothing is sent, stored or charged anywhere. Quadrant, its people, clients and figures are fictional.

## Credits

Fonts: Newsreader and Instrument Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
