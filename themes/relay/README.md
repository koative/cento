# Relay

Road, rail, sea and air freight across Europe, on one record. A freight logistics platform website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: tracking hero with live waybill and network map, services index, network, quote calculator, how a pallet crosses Europe, platform preview, Rotterdam departures board, customer story, close
- `/services` — Seven freight services with mode filter
- `/services/:slug` — Service page: specs, how it runs, inclusions, FAQ, lanes on the map, related services
- `/track` — Shipment tracker with sample numbers and validation
- `/track/:id` — Tracking result: route map with moving marker, waybill, scan history, documents
- `/quote` — Quote calculator (lane, service, pallets, weight, options), mode comparison and booking form
- `/network` — Interactive hub map with mode filters, hub detail, searchable hub table
- `/platform` — Shipments platform features, integrations and API
- `/pricing` — Plans with monthly/yearly toggle, comparison table, billing FAQ
- `/customers` — Customer stories
- `/changelog` — Platform release notes
- `/about` — How we work, company history, the team, careers, visiting the Rotterdam office
- `/signin` — Sign-in screen (UI only)
- `/app` — Shipments demo overview: KPIs, SVG charts, exceptions, moving shipments
- `/app/shipments` — Searchable, filterable, sortable shipments table with CSV export
- `/app/shipments/:id` — Shipment detail: route map, waybill, scan history, charges, documents, notes
- `/app/settings` — Company profile, alerts, team and API key settings

## Run

```sh
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data: brand, hubs, lanes, services, shipments, plans), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

Tracking, quoting, booking, sign-in, the newsletter form and every `/app` screen run entirely in your browser on fixed sample data set at Monday 19 October 2026, 10:40. Quotes are calculated locally from distances between hubs; bookings, notes and settings live in memory and reset on reload. Nothing is sent, booked or charged, and Relay, its customers and every shipment are fictional.

## Credits

Fonts: IBM Plex Sans Condensed and IBM Plex Mono (SIL Open Font License). Images: Wikimedia Commons, see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
