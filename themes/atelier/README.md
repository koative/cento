# Atelier

Good ideas. Strange shapes. A creative agency website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: cobalt hero with the spinning studio asterisk and latest projects, selected work, client run, services index, studio band, process, client quote, open roles, closing call to action
- `/work` — Work index: discipline filters with counts, search, sort, grid or table index view with a live cover preview
- `/work/:slug` — Case study (eight): cover, project facts, brief, authored artefacts (posters, cartons, cans, screens, phones, signs, colour specs, motion frames), approach, client quote, outcomes, credits, related work, previous/next
- `/services` — Six disciplines with deliverables, length and starting fees, engagement models, process, FAQ
- `/studio` — Story, principles, team of twelve, the space and hours, studio habits, recognition
- `/careers` — Open roles with published salaries, benefits, hiring steps
- `/careers/:id` — Role (five): responsibilities, requirements and a validated application form
- `/contact` — Brief builder: six-step form with a live brief sheet that estimates team, timeline, starting fee and the closest past project

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: brand, services, case studies, team, roles, brief options), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The brief builder updates its brief sheet as you type, estimates the team, length and starting fee from the chosen disciplines, warns when the budget sits below that fee, validates every step and ends on a confirmation with a brief number. Role pages carry a validated application form, the footer has a newsletter sign-up and the work index filters, searches, sorts and switches views. Nothing is sent, stored or charged anywhere, and Atelier, its clients and its people are fictional.

## Credits

Fonts: Syne and Albert Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
