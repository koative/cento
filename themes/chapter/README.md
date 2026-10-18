# Chapter

Conversations that take their time. A podcast network website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: newest episode with clickable chapters, the six-show shelf, latest episodes, a featured show spread, a pull quote you can jump to, how the network works, hosts, newsletter excerpt, advertiser strip and a closing call to listen
- `/shows` — Shows: filter by subject, search shows or hosts, sort by newest episode, title or archive size
- `/shows/:slug` — Show page: cover art hero, about, platform links and copy-the-RSS-feed, photo, recent episodes, hosts, related shows
- `/episodes` — Every episode: search titles, guests and chapter names; filter by show and length; sort by date or duration
- `/episodes/:id` — Episode player: chapter-marked waveform scrubber, speed and skip controls, chapter list with notes, episode notes, pull quote with timestamp, guests, share link, more to listen to
- `/hosts` — Hosts grid plus the producers and editors
- `/hosts/:slug` — Host profile: portrait, bio, what they listen to, their shows and episodes
- `/newsletter` — The Margin: validated signup with list and show choices, sample letter, recent issues
- `/advertise` — Advertise: how ads work, audience table, rate card, campaign planner with live estimate, validated enquiry form, FAQ
- `/about` — About: the network's story, house rules, people, show pitches and studio contact
- `/listening-list` — Your listening list: reorder, remove, play in order, resume unfinished episodes

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (shows, episodes with chapters, hosts, newsletter, rate card). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`; show covers are drawn in SVG from each show's colours and motif.

## Demo behaviour

The player has no audio: while playing, the playhead advances on a one-second timer at the chosen speed, and a mini player follows you across pages. The loaded episode, per-episode progress and the listening list are kept in `localStorage` (the site still works without it); when an episode ends, the next one on your list starts. The newsletter, footer signup and advertiser enquiry forms validate in the browser and show a confirmation, but nothing is sent anywhere. Chapter, its shows, hosts, guests, figures and prices are fictional.

## Credits

Fonts: Epilogue and Lora (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
