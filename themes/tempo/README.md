# Tempo

No perfect moves. Just yours. A dance studio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: live "tonight on the floor" board, eight styles, tap-tempo style finder, how a first class works, instructors, passes, events, a member quote and a booking close
- `/timetable` — Weekly timetable with style and level filters, day tabs on small screens, and the My week planner that prices every pass against your picks
- `/styles` — All eight styles with tempo, level and what to wear, plus the tap-tempo finder
- `/styles/:slug` — Style page: what you'll learn, how it's taught, its classes this week, teachers, related styles and a trial CTA
- `/instructors` — Seven instructors with styles, background and their classes
- `/passes` — Drop-in, class cards and memberships with a month-to-month / 6-month toggle, pass notes and FAQ
- `/trial` — Trial class booking: style, next beginner-friendly session, details, waiver; validation, loading and confirmation states
- `/events` — Socials, workshops, showcases and intensives
- `/events/:slug` — Event page: facts, running order, styles, RSVP form and more events
- `/about` — The studio: story, three rooms, house rules, desk hours, location and teaching jobs

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (studio, styles, classes, instructors, passes, events, FAQ). `src/styles.css` holds the design system with tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Pinned classes in My week are saved in `localStorage` on this device (and the site still works without storage); the planner prices drop-ins, cards and memberships against that schedule. The trial booking, event RSVP and newsletter forms validate in the browser, show a short loading state and confirm locally. Nothing is sent, booked or charged, and Tempo is a fictional brand with sample people, prices and events.

## Credits

Fonts: Dela Gothic One and Outfit (Google Fonts, SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: [Lucide](https://lucide.dev/) (ISC). Code: MIT.
