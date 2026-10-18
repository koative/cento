# Mosaic

Rooms composed from the materials up. An interior design studio website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero room with the materials used in it, recent projects, studio statement, the material library tessera wall, services and fees, the process at a glance, client quote, next open library slots, closing call to book
- `/projects` — Projects: seven homes, restaurants, inns and offices with sector and material filters and three sort orders
- `/projects/:slug` — Project page: image viewer, brief, approach, scope, area and programme facts, the material palette with "add all to my board", client quote, next project
- `/services` — Services and fees: four services with prices and scope, a comparison table, the single-room offer, FAQ disclosures
- `/process` — Process: a programme timeline that redraws for a single room, a whole home or a hospitality project, then the six stages in detail
- `/materials` — Material library: fifteen samples with family filter, search and four sort orders, plus the live board aside
- `/materials/:id` — Material page: large swatch, origin, finish, format, care, lead time, price per unit, pairings and the projects that used it
- `/samples` — Sample board: the composed board with a daylight dial, the 60/30/10 mix, reorder and remove, starter palettes when empty
- `/studio` — Studio: story, principles, team, hiring note, address and hours
- `/consultation` — Consultation booking: meeting type, day and time slots, project details, optional sample board, validation and confirmation

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (projects, materials, services, stages, team, FAQ, slots copy). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The sample board is saved in `localStorage` (and still works for the visit if storage is blocked): add samples from the library, a material page or a whole project palette, reorder them to change their role, and turn the daylight dial to re-light every sample at once. The consultation form validates every field, shows a loading state and confirms the booking with a reference; the footer newsletter validates and confirms too. Nothing is sent, booked or charged, and Mosaic is a fictional brand.

## Credits

Fonts: Marcellus and Jost (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
