# Summit

Six walls, one reset every Tuesday, always something new to try. A climbing gym website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with live open status, reset rotation, colour circuits with the newest wall drawn, first-visit steps, classes this week, member quote, memberships, youth team, upcoming events, hours, closing call to action
- `/routes` — Route map: floor plan of the hall, wall elevations with every problem's holds, circuit/style filters, hold-by-hold stepper, tick list saved on the device
- `/classes` — Weekly timetable and filterable class list (level, format)
- `/classes/:id` — Class page: specs, what you'll learn, session plan, next dates with booking links, coach, related classes
- `/memberships` — Plans with monthly/yearly toggle, "what should I buy?" calculator, day passes and visit cards, FAQ
- `/events` — Season of comps, socials, clinics, films and trips, filterable by type
- `/events/:id` — Event page: details, schedule, what to bring, RSVP form with confirmation
- `/youth` — Youth team: pathway, squads and fees, season results, parent FAQ
- `/book` — Day-pass or class booking: date strip, arrival slots with availability, climbers and shoe hire, details, waiver, live summary, confirmation
- `/about` — Story, how the setters work, values, team, facilities
- `/visit` — Opening hours, typical busyness chart, getting here, house rules, first-visit FAQ

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (walls, problems, classes, events, plans, team, hours). `src/styles.css` has the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The route map filters, steps through holds and keeps your tick list in `localStorage` (it still works without storage). The booking page, event RSVPs and newsletter form validate in the browser, show a loading state and a confirmation, but nothing is sent, stored on a server or charged. Availability is generated demo data. Summit and everyone in it is fictional.

## Credits

Fonts: Bowlby One and Barlow (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
