# Guild

Independent talent, vouched for by the people who know the work. A freelance marketplace website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: register search, live member ledger, crafts index with median rates, members available this week, the no-bidding method, milestone escrow sheet, time-zone crew preview, recently closed projects, the freelancer pitch and a closing call to post
- `/talent` — Browse talent: search, craft chips, day-rate cap, availability filter and five sorts over the member register
- `/talent/:id` — Member profile: portrait with guild hallmark, terms card (rate, availability, days a week), vouches, bio and skills, commissions on record, client reviews, related members
- `/crafts` — Crafts: all eight crafts with median day rates and featured members
- `/crafts/:slug` — Craft page: description, rate range, typical commissions, skills and the members in that craft
- `/post` — Post a project: validated brief form with budget/timeline choices, invitations from your bench and a live preview of the brief; posted state with reference number
- `/how-it-works` — Hiring and freelancing tracks (keyboard tabs), the vouching chain, protections and FAQ
- `/pricing` — Client plans with monthly/yearly toggle, member fees and a fee calculator
- `/bench` — Your bench: shortlisted members on a 24-hour time-zone chart with shared hours, days-per-week steppers and weekly cost
- `/signup` — Join Guild: client or freelancer application with validation and a welcome state
- `/signin` — Sign in screen with validation and a signed-in state
- `/about` — Story, the five-article charter, team, member evenings and offices

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Everything runs in the browser. The bench is kept in `localStorage` (and simply lasts for the visit when storage is unavailable); the time-zone chart, cost totals, filters and fee calculator are computed locally. Posting a project, signing up, signing in and subscribing to the newsletter validate their fields and show a success state, but nothing is sent, stored on a server or charged. Guild, its members, clients, rates and reviews are fictional.

## Credits

Fonts: DM Serif Text and Karla (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
