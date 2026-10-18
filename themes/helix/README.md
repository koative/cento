# Helix

Quantum processors, held at nine millikelvin and open for work. A quantum computing company website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: dilution-refrigerator section drawing with live system status, fleet table, interactive three-qubit circuit composer, job pipeline, lab photograph, recent papers, roadmap strip, user quote, pricing teaser, closing call to action
- `/systems` — Systems: six processors with lattice outlines and median specs, filter by access and sort by qubits, fidelity, T1 or layer rate
- `/systems/:slug` — System: full specification sheet, interactive calibration map of every qubit and coupler, highlights, papers that used the system, related systems
- `/roadmap` — Roadmap: 2021–2029 timeline with metrics and status, principles behind the roadmap
- `/pricing` — Cloud pricing: four plans with monthly/annual toggle, on-demand rates per system, job cost estimator, billing FAQ
- `/research` — Papers library: search, topic filter and date order over eight papers
- `/research/:slug` — Paper: abstract, plotted figure, key results, hardware used, BibTeX with copy button, related papers
- `/team` — Team: company story, facts, people by group
- `/careers` — Careers: open roles filtered by team with expandable descriptions, hiring process, benefits
- `/access` — Request access: validated form with loading and confirmation states
- Any other path — Not found

## Run

```
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (systems, papers, roadmap, plans, team, roles). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The circuit composer simulates three qubits exactly in the browser and samples shots locally; the calibration map shows illustrative per-qubit values seeded around each system's published medians; the pricing estimator computes in place. The request-access and newsletter forms validate and show a confirmation, but nothing is sent, stored or charged. Helix, its people, systems, papers and figures are fictional.

## Credits

Font: Sora (SIL Open Font License 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
