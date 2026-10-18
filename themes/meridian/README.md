# Meridian

Homes on both banks of the Ellery, sold and let by neighbours. A real estate agency website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero search with a featured home, new listings, the city map with clickable neighborhoods, a quick valuation estimate, sold-prices ledger, neighborhood guides, agents, testimonial and a selling call to action
- `/homes` — Search: buy/rent, street search, neighborhood, bedrooms, max price, type and sort, with a list synced to a map (hover a card to light its pin, click a pin to preview, click a district to filter); list/map toggle on small screens
- `/homes/:id` — Listing: photo gallery, particulars, features, measured floor plan with room schedule, location map and travel times, mortgage or move-in cost calculator, agent card with viewing booking form, similar homes
- `/sell` — Sell or let: three-step valuation booking with a live desk estimate, timeline from valuation to keys, fees, FAQ
- `/neighborhoods` — Neighborhood guides: linked map, side-by-side price table, guide list
- `/neighborhoods/:slug` — Guide: introduction, living here notes, local places, figures, area agent, homes on the market on a map
- `/agents` — Agents with areas, listings count and direct contact
- `/agents/:id` — Agent profile: bio, details, client quote, current listings, recent sales
- `/about` — Story, principles, timeline and fees
- `/contact` — Office map, phone lines, hours and an enquiry form
- `/saved` — Saved homes with a comparison table (kept in localStorage)

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`; the static output in `dist/` uses a relative base, so it works from any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, homes, floor plans, neighborhoods and their map shapes, agents, fees). Design tokens are at the top of `src/styles.css`; imagery lives in `src/assets`.

## Demo behaviour

Search filters, map selection, the floor-plan schedule, the mortgage calculator and the valuation estimate all run locally in the browser. Saved homes are stored in `localStorage` when available. The viewing, valuation, contact and newsletter forms validate input and show a confirmation, but nothing is sent, booked or stored on a server. Meridian, Port Ellery, every agent, home and price are fictional.

## Credits

Fonts: Noto Serif Display and Albert Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
