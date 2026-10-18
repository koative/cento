# Lucid

Say what you mean, in fewer words. An AI writing assistant SaaS website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: live prompt demo with tracked changes, annotated proof, archive, use-case index, house style, surfaces, privacy, quotes, plans, recent releases
- `/product` — Product: five capabilities with before/after markup, technical specs
- `/use-cases` — Use cases: searchable, filterable by document type
- `/use-cases/:slug` — Use case: reviewable draft, pains, style rules, workflow, quote, related teams
- `/pricing` — Pricing: monthly/yearly toggle, plans, Team seat calculator, comparison table, FAQ
- `/changelog` — Changelog: releases filtered by New / Improved / Fixed
- `/about` — About: founding story, archive of revised manuscripts, principles, team, hiring
- `/contact` — Talk to sales: validated enquiry form with success state
- `/signin`, `/signup` — Sign in and create account (UI only)
- `/app` — Editor demo overview: weekly chart, acceptance by kind, waiting documents, terms, team
- `/app/documents` — Sortable, searchable documents table
- `/app/documents/:id` — Editor: tracked suggestions with accept/reject, kind filter, reading grade, status
- `/app/style` — House style: term list with add/remove, voice switches with live preview
- `/app/settings` — Profile, workspace, retention, notifications, demo reset

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The home demo matches a typed prompt to one of four instructions and returns an authored rewrite for each sample as a word-level diff you can review change by change; edited drafts run a local rule pass for filler and wordy phrases. The /app demo keeps decisions, document status and house style rules in localStorage (falling back to memory). Forms validate in the browser and show success states; nothing is sent, stored on a server or charged, and Lucid is a fictional brand.

## Credits

Fonts Hubot Sans and Mona Sans (OFL), images → src/assets/SOURCES.md, icons Lucide (ISC). Code MIT.
