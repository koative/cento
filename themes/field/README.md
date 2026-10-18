# Field

Our game. Our ground. Our people. A community sports club website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: next home match, this weekend's fixtures, latest scores, the eight team shirts, an age slider that finds your team, the training week, league tables, club news, a word from the tea hut and the join call.
- `/teams` — Teams: every squad filtered by section and by who plays, with ages, format, matchday and next game.
- `/teams/:slug` — Team page (e.g. `/teams/women`): interactive team sheet, form guide, fixtures and results, league table, squad stats, coaches and training times.
- `/fixtures` — Fixtures & results: upcoming games and results grouped by month, filter by team and venue, and the league tables.
- `/join` — Join the club: season/monthly fee table, registration form that matches the player to a team by age on 31 August, and an FAQ.
- `/coaching` — Coaching: the weekly training board, camps and open sessions, the coaching staff, the route to becoming a coach and safeguarding.
- `/news` — Club news with category filter and search.
- `/news/:slug` — Article (e.g. `/news/women-cup-sedgecombe`) with linked match, team and related stories.
- `/about` — The club: story, timeline since 1952, interactive ground map, clubhouse hours, committee and volunteering.

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (teams, squads, fixtures, tables, fees, coaching, news, club). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The team sheet changes formation, shows player stats and swaps substitutes in local state. Fixtures, teams and news filter in the page. The registration form validates in the browser, picks eligible teams from the date of birth and shows a confirmation; the newsletter form confirms locally. Nothing is sent, stored or charged, and Field United, its people, fixtures and fees are fictional.

## Credits

Fonts: Graduate and Rubik (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
