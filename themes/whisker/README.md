# Whisker

Calm, unhurried vet care for dogs, cats and rabbits. A veterinary clinic website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with visit-note slip, fee board of services, calm-visit approach, live care planner, team polaroids, emergency band, health plans, owner notes, hours and a booking close
- `/services` — Services & prices, filterable by species with search
- `/services/:slug` — Service page (9): appointment steps, price table, preparation, FAQ, vets who lead it, related services
- `/vets` — Vets & nurses, filterable by day in clinic
- `/vets/:slug` — Profile (6): bio, their pet, qualifications, interests, languages, clinic days, services they lead
- `/plans` — Pet health plans with pet-size and monthly/yearly pricing toggles, comparison table, FAQ
- `/planner` — Care planner: vaccine and check-up record card for any dog, cat or rabbit
- `/emergency` — Emergency line, open/closed routing, triage lists, what to do on the way, toxins table, fees
- `/book` — Appointment booking: pet, reason, vet, day and time slots, owner details, live appointment card, confirmation
- `/visit` — Address, hours, getting here, first-visit checklist, payment policies, FAQ
- `/about` — Story, principles, timeline, facilities, team

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: services, vets, plans, hours, emergency info), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The care planner builds a vaccine schedule from species and birth month and lets you stamp doses as given; it is saved in `localStorage` on your device only and prefills the booking form. Booking validates every field, shows demo availability for each vet's clinic days, simulates a short confirmation step and shows a confirmation; the footer newsletter validates and confirms. Nothing is sent, stored on a server or charged. Whisker, its staff, patients, prices and partner hospital are fictional.

## Credits

Fonts: Gabarito and Nunito Sans (SIL OFL 1.1). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
