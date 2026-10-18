# Clutch

Three games, twelve players, one habit: winning the last round. An esports team website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: next match on the hero, latest result ticker, upcoming schedule, round-by-round replay of the last decider, rosters by division, Clutch House, news, recent form and league table, 2026 kit, partners, matchday close
- `/teams` — Teams: division filter, division facts, player cards, coaches, academy tryouts
- `/players/:id` — Player: handle, number, bio, season stats, career, hero/agent pool, setup, crosshair preview with copyable code, recent matches, teammates
- `/matches` — Matches: upcoming/results toggle, division filter, Northern Circuit standings
- `/matches/:id` — Match: big scorebug, recap and map scores, round-by-round replay per map; for upcoming matches a preview, calendar download, head-to-head and expected lineup
- `/news` — News: category filter, lead story and grid
- `/news/:slug` — Article: dek, byline, image, body with pull quotes, read next
- `/shop` — Shop: category filter and price sort over authored merch flats
- `/shop/:id` — Product: front/back view, size picker, jersey name print with live preview, quantity, add to bag
- `/cart` — Bag & checkout: quantities, shipping or Clutch House pickup, validated checkout, order confirmation
- `/partners` — Partners: current partners, partnership formats, audience table, validated enquiry form
- `/club` — Club: story timeline, Clutch House hours and address, player welfare charter, staff, contacts

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The round-by-round replay plays, steps and scrubs through each map's rounds from local data. The bag is stored in `localStorage` (and keeps working without it); checkout, the partner enquiry and the matchday email validate in the browser and show a confirmation, but nothing is sent, charged or stored on a server. The calendar button generates an `.ics` file locally. Clutch, its players, opponents, leagues, games and partners are fictional.

## Credits

Fonts Tomorrow and Chakra Petch (SIL OFL 1.1), images → src/assets/SOURCES.md, icons Lucide (ISC). Code MIT.
