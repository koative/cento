# Solace

Family medicine with room to talk, from newborns to grandparents. A family health clinic website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: next same-day appointments, service index, same-day band, children’s and long-term care features, clinicians, first-visit steps, clinics with live open/closed state, patient voices, “already a patient” info, closing call to book
- `/services` — Services: filter by who it’s for, search, rows with length, ages and self-pay price
- `/services/:slug` — Service page (8): visit steps, what’s covered, what to bring, FAQ, facts, next open times, who you’ll see, related care
- `/clinicians` — Clinicians: ID-badge cards filtered by clinic, language and accepting new patients
- `/clinicians/:slug` — Clinician profile (8): bio, quote, interests, weekly clinic table, bookable services, next open times
- `/book` — Book a visit: four-step planner (visit type, clinic and clinician, day and time, patient details) with a live appointment card, validation and confirmation
- `/patients` — Patient information: registration steps, what to bring, insurance and self-pay fees, prescriptions and results, policies, FAQ
- `/locations` — Locations & hours: authored clinic map with pins, clinic tabs, opening hours with today highlighted, access and transport
- `/about` — About: story, principles, timeline, team and careers

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, services, clinicians and their weekly schedules, locations and hours, patient info). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Open appointment times are generated locally from each clinician’s weekly schedule and the clinic’s opening hours, with a fixed pseudo-random pattern of already-booked slots. Booking validates the form, shows a short loading state, then stamps the appointment card with a demo reference; the newsletter form validates and confirms. Nothing is sent, stored, booked or charged, nothing on the site is medical advice, and Solace and everyone named in it are fictional.

## Credits

Fonts: Source Serif 4 and Source Sans 3 (SIL OFL 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
