# Cipher

Trust is a decision. Make it a clear one. A cybersecurity SaaS website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a live four-grant access review that ends in a signed attestation, access-drift timeline, the discover/decide/revoke/prove loop, quote, solutions index, evidence pack, trust teaser, pricing strip, FAQ, closing call to action
- `/platform` — Platform: four stages with authored figures (source graph, reviewer view, remediation timeline, sealed evidence), signals table, technical specs
- `/solutions` — Solutions: campaign templates filterable by team, framework and keyword
- `/solutions/:slug` — Solution: problem, numbered steps, campaign rule card, evidence list, quote, related solutions
- `/pricing` — Pricing: yearly/monthly toggle, three plans, identity-count cost calculator, comparison table, billing FAQ
- `/trust` — Trust center: 90-day status and incidents, certifications, document request form with NDA check, data practices, subprocessors, disclosure policy, FAQ
- `/changelog` — Changelog: releases filterable by area
- `/about` — Company: story, principles, team, offices, open roles
- `/demo` — Request a demo: validated form with success state, call agenda
- `/signin` — Sign in: SSO and password UI that opens the demo workspace
- `/app` — Demo workspace overview: campaign progress, open-grants chart, live department bars, high-risk list, recent decisions, upcoming campaigns
- `/app/review` — Review queue: filter, search, keep/revoke with required reason, bulk-keep low risk, undo, sign the attestation
- `/app/identities` — Identities: sortable, filterable table
- `/app/identities/:id` — Identity: facts, grants with decisions, history
- `/app/settings` — Settings: cadence, thresholds, policy switches with validation and save state

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (sources list; the theme uses authored SVG only).

## Demo behaviour

The home review widget and the `/app` workspace run entirely in the browser on fictional identities and grants: decisions, undo, bulk actions and the signed attestation live in memory and reset on reload. Forms validate locally and show a success state; nothing is sent, stored, revoked or charged. Cipher, Alder Logistics and every person, price and figure are fictional.

## Credits

Fonts: Funnel Display and Funnel Sans (SIL OFL 1.1). Images and graphics → `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
