# Prism

Three days in a tram depot full of light, taking design apart. A design conference website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with the five-track spectrum diagram, speakers, theme essay, Thursday timetable, workshop day, passes, venue, past editions, partners, closing call
- `/speakers` — Speaker index with track filters, search and sort
- `/speakers/:slug` — Speaker profile: portrait, quote, bio, topics, their sessions (addable to your agenda), related speakers
- `/agenda` — Agenda builder: day and track filters, add sessions, drawn three-day timeline, overlap warnings, track mix, `.ics` export
- `/tickets` — Five passes with an individual/team toggle and team-size stepper, comparison table, transfer/refund notes
- `/register` — Registration form: pass picker, quantity with team discount, workshop choice, attendee, invoice and code-of-conduct fields, live order summary, confirmation
- `/venue` — Venue & travel: interactive floor plan, the building's history, getting there, partner hotels, access
- `/sponsors` — Partner with us: audience chart, packages, current partners, enquiry form
- `/editions` — Past editions with attendance scale
- `/editions/:year` — Edition recap: facts, photo, recap, highlight talks, quote, returning speakers
- `/about` — About & FAQ: story, house rules, team, code of conduct, FAQ

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (speakers, sessions, passes, editions, venue, partners), `src/styles.css` the design system (tokens at `:root`, track colours as `--t-*`), and `src/assets` the imagery.

## Demo behaviour

The agenda builder stores your picks in `localStorage` (and keeps working without it), draws them on a timeline, flags overlapping sessions and downloads a real `.ics` calendar file. Ticket pricing, team discounts, registration, the partner enquiry and the newsletter sign-up all validate in the browser and show a confirmation, but nothing is sent, booked or charged anywhere. Prism, its people, partners and venue are fictional.

## Credits

Fonts: Climate Crisis and Instrument Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
