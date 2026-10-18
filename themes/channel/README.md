# Channel

Steel, sparks and second chances. New build every Thursday. A video creator & merch website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: latest episode, newest uploads, series shelf, manifesto, merch, weekly upload schedule, membership band, viewer comments, brand-deals strip, countdown to the next episode
- `/videos` — Video library with search, series filters and sorting
- `/videos/:slug` — Video page: chaptered demo player with scrubbable timeline, chapter list, "on screen" parts list linked to merch, description, related episodes
- `/series` — The four series with runtime, episode count and cadence
- `/series/:slug` — Series page: hero, description, ordered episode list with resume, other series
- `/shop` — Merch with category filters and sorting
- `/shop/:id` — Product page: recolourable SVG mockup, colour and size pickers, quantity, "seen on camera" episodes, related items
- `/cart` — Bag with quantities, shipping threshold and summary
- `/checkout` — Validated checkout form and order confirmation
- `/membership` — Tiers with monthly/yearly toggle, join form, FAQ
- `/partners` — Brand deals: audience chart, formats and rates, sponsor rules, recent partners, process, enquiry form
- `/about` — Story, timeline, crew, shop gear

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`, the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The player has no video file: its clock drives the timeline, chapter list and parts list, and your place in each episode is saved in localStorage so every thumbnail shows a watch-progress bar. The bag is stored in localStorage too. Checkout, membership, brand-deal and newsletter forms validate in the browser and show a success state, but nothing is sent, charged or shipped. Channel, its host, partners and figures are fictional.

## Credits

Fonts: Paytone One and Nunito (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
