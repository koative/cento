# Pipeline

Every deal on the board. One honest number on Thursday. A CRM & sales software website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: board preview hero, interactive forecast call, stage criteria, customer quote, contact timeline, reports chart, setup steps, stories, pricing teaser, close
- `/product` — Product: board, contacts, forecast categories and reports with live visuals, plus a spec sheet
- `/pricing` — Pricing: monthly/yearly toggle, seat calculator, plan comparison table, FAQ disclosures
- `/customers` — Customers: stories filtered by team size and searchable
- `/customers/:slug` — Customer story: facts, results, before/after, pull quote, related stories (6 stories)
- `/changelog` — Changelog: releases filterable by area
- `/about` — Company: story, principles, team, offices, hiring
- `/demo` — Book a demo: validated form with loading and confirmation states
- `/signin` — Sign in: validated UI-only form that opens the demo workspace
- `/app` — Demo deals board: drag and drop or arrow-key moves across seven stages, owner filter, search, new-deal form
- `/app/contacts` — Demo contacts table: status filter, search, sortable columns
- `/app/contacts/:id` — Demo contact detail: deals with stage control, timeline, log-a-touch form
- `/app/reports` — Demo reports: forecast call, won by month, pipeline by stage, attainment by rep

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (sources list; all graphics are authored).

## Demo behaviour

The forecast call, board, contacts and reports run on demo data held in memory: moving a deal, changing a forecast category, adding a deal or logging a touch updates every screen of the demo until the page is reloaded. The demo booking, sign-in and newsletter forms validate in the browser and show their confirmation states, but nothing is sent, stored or charged anywhere. Pipeline, its customers and every person and figure are fictional.

## Credits

Fonts: Figtree (SIL Open Font License). Images: none — all graphics are authored SVG/CSS, see src/assets/SOURCES.md. Icons: Lucide (ISC). Code: MIT.
