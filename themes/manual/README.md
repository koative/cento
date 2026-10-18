# Manual

Find the fix, then get back to the counter. A help center & knowledge base website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — search-first home: instant-answer search, most-read articles, the six-chapter contents, an embedded troubleshooter, recently revised articles, quick start with a device diagram, a printable shortcut card, live service status, community threads and support channels
- `/categories` — the full table of contents with dot leaders, title filter and chapter / recently revised / most read ordering
- `/categories/:slug` — a chapter: numbered articles with summaries, related troubleshooters and community threads
- `/articles/:slug` — an article: chapter sidebar, numbered steps, callouts, keycaps, SVG figures, tables, “On this page”, print, feedback form, previous/next and related articles
- `/search` — full-text search with highlighted snippets, chapter filters, plus matching troubleshooters and community threads
- `/troubleshoot` and `/troubleshoot/:id` — guided troubleshooting flows (reader, payouts, printer)
- `/contact` — support ticket form with urgency levels, article suggestions while you type, and troubleshooter answers attached
- `/status` and `/status/:id` — system status with 90-day uptime bars per component, subscribe form, past incidents filter and incident timelines
- `/community` and `/community/:id` — discussions with search, chapter filter and sorting, ask-a-question form, threads with votes, accepted answers and a reply form
- `/about` — house style, how an article gets made, the support team colophon and response commitments
- any other route — a not-found page with search

## Run

```bash
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (chapters, articles, flows, status incidents, threads, team). `src/styles.css` holds the design tokens at `:root`. `src/assets` holds the sources list; every graphic is authored SVG in `src/components`.

## Demo behaviour

Search, filters, the troubleshooter, votes and every form run entirely in the browser. Opening a ticket, posting a question or reply, subscribing and sending article feedback only show their success states: nothing is sent, stored or charged. Counter, its products, prices, people and incidents are fictional.

## Credits

Fonts: Source Sans 3 and Source Code Pro (SIL Open Font License). Graphics and sources: `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
