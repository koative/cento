# Lantern

Small lights, carried together. Your town's fund, in the window. A community charity & fundraising website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: the window board (live thermometer with a pledge slider), campaigns closing soonest, where each dollar goes, last month's grants ledger, a neighbour's words, the Lantern Walk, volunteer roles, upcoming events, monthly giving and a closing call
- `/campaigns` — Open campaigns with cause filters, search and sort, plus a general-fund prompt
- `/campaigns/:slug` — Campaign page: story, facts, the board with milestones and a pledge slider, itemised budget, updates, linked events, related campaigns
- `/donate` — Three-step donate flow (gift, about you, card) with once/monthly toggle, validation, a live gift summary, receipt and FAQ
- `/events` — Events list filtered by kind, with an invitation to host a fundraiser
- `/events/:id` — Event page: facts, schedule, what to bring, access, the campaign it supports and an RSVP form
- `/volunteer` — How volunteering works and a sign-up form with role picker, availability grid and a running summary
- `/reports` — Open books by year: income, spend per dollar, grants by cause, a sortable grants table and the charity's rules
- `/about` — Story, timeline since 2009, the neighbours' panel, staff, trustees and visiting the window

## Run

```
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, campaigns, events, roles, reports, team). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

Pledges, gifts, RSVPs, volunteer sign-ups and the newsletter form all run in the browser. A completed gift moves the campaign's board and donor count, and RSVPs hold places, both kept in `localStorage` when it is available. Nothing is sent, stored on a server or charged, and Lantern, Calder Bend and everyone named are fictional.

## Credits

Fonts: Bitter and Source Sans 3 (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
