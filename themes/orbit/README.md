# Orbit

Orbit by the kilogram, on a manifest you can read a year ahead. A space launch startup website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: next-launch countdown, the next four flights, the fleet drawn to scale, a compact price calculator, recent missions, rideshare milestones, flight log, a customer quote, hiring and a booking close
- `/missions` — Missions: flown and upcoming missions with generated patches, filter by status and vehicle, sort by date
- `/missions/:slug` — Mission: patch, countdown for upcoming flights, facts, orbit diagram, flight timeline, payload table, related missions
- `/vehicles` — Vehicles: dimensioned elevation drawings for Kestrel, Halcyon and Wayfarer, performance and price, side-by-side comparison
- `/vehicles/:id` — Vehicle spec sheet: drawing, specifications, stages, payload-vs-altitude chart, flight history
- `/manifest` — Launch manifest: countdown to the next launch, filterable flight table with status and open capacity, launch sites
- `/rideshare` — Rideshare pricing: the full calculator (payload, orbit, Wayfarer altitude, flight, services, payment schedule), inclusions, milestones, FAQ
- `/reserve` — Reserve a launch: validated reservation form carrying the calculator quote, dedicated-launch variant, confirmation state
- `/careers` — Careers: open roles filtered by team, benefits, hiring process
- `/careers/:slug` — Job: responsibilities, requirements, salary and a validated application form
- `/about` — About: story, principles, milestones, leadership, facilities

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (vehicles, missions, manifest, rideshare prices, jobs, team). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The rideshare calculator prices a payload from the published rates in `content.ts`, remembers the quote in `localStorage` (it still works when storage is blocked) and hands it to the reservation form. The manifest and header count down to the next scheduled launch in real time. The reservation, job application and launch-alert forms validate in the browser and show a confirmation; nothing is sent, booked or charged. Orbit, its vehicles, customers, people and prices are fictional.

## Credits

Fonts: Unbounded and Onest (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
