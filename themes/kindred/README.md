# Kindred

Somebody here has been waiting for you. A pet adoption shelter website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with today's opening status and longest-waiting faces, just-arrived kennel cards, a live quiz sample, the longest stays, adoption steps, an adopter story, foster callout, donation ladder, visiting hours, close
- `/animals` — Adoptable animals: species tabs, search, age/size filters, good-with and first-timer toggles, sort, empty state, collar-tag legend
- `/animals/:id` — Animal profile (14 animals): kennel-card spec sheet, collar tag, good-with, story, the right home, loves/not keen, character scales, health, fee, related animals
- `/match` — Matching quiz: seven questions with a live "still in the running" board, then ranked matches with reasons and cautions
- `/adopt` — How adoption works: steps, fee table, what's included, policies, FAQ
- `/apply` and `/apply/:id` — Three-step adoption application with per-step validation and a confirmation state
- `/volunteer` — Volunteer roles, fostering, orientation dates and sign-up form
- `/donate` — Monthly/one-off giving with live impact line, funds, spending split, wishlist, kennel sponsorship
- `/about` — Story, milestones, the building, team, visiting info and hours

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (animals, quiz, fees, roles, hours), `src/styles.css` the design tokens at `:root`, and `src/assets` the imagery. Quiz weights live in `src/lib/match.ts`.

## Demo behaviour

The filters, matching quiz, adoption application, volunteer sign-up, donation form and newsletter all run locally in the browser: they validate, show a short loading state and confirm, but nothing is sent, stored, reserved or charged. Kindred, its animals, people, prices and addresses are fictional.

## Credits

Fonts: Baloo 2 and Mulish (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
