# Arcade

Little games. Big feelings. Finished with love. An indie game studio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero key art, the cartridge shelf, the playable Blob Hop demo, next game spotlight, press quote, latest devlog posts, team, open roles and a closing call to play
- `/games` — Games: cartridge shelf with status chips, platform filter, search and sort, plus an empty state
- `/games/:slug` — Game page (7 games): key art, facts strip, embedded demo where one exists, about and features, screenshot viewer, specs, quotes and awards, related devlog posts and more games
- `/play` — Play: the Blob Hop canvas demo with controls, assist mode and your top runs saved on the device, plus the Pair Up! memory game
- `/devlog` — Devlog: lead post, topic chips, game filter and search
- `/devlog/:slug` — Devlog post (7 posts): article with screenshots, quotes and lists, author box, older/newer navigation and the related game
- `/studio` — Studio: story, timeline, working principles, the team in pixel portraits, and a visit invitation
- `/press` — Press kit: fact sheet, copyable boilerplate, downloadable SVG logos and key art, quotes and awards, review key request form
- `/jobs` — Jobs: open roles with salaries, perks and the hiring process
- `/jobs/:slug` — Job page (4 roles): role details and a validated application form

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (games with their pixel palettes, posts, team, jobs, press facts). `src/styles.css` holds the design tokens at `:root`. All artwork is drawn in code from `src/lib/pixels.ts` (sprites) and `src/components/Scene.tsx` (key art and screenshots), so new games only need a palette, a scene type and a few seeds.

## Demo behaviour

Blob Hop is a real canvas game: tap, click or press Space to hop, hold to float higher, P to pause, with an assist mode at 70% speed; your ten best runs are kept in `localStorage` (the game still works when storage is blocked). Pair Up! is a working memory game. The games list and devlog filter locally, the press page copies the boilerplate and downloads SVGs generated in the browser, and the review key request, job application and playtest signup forms validate inline, show a loading state and confirm success. Nothing is sent, stored on a server or charged, and Arcade with all its games, people and quotes is fictional.

## Credits

Fonts: Bungee and Rubik (SIL Open Font License). Images: none — all art is authored pixel SVG/canvas, see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
