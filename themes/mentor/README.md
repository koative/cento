# Mentor

Coaching for the promotion nobody trains you for. An online coach & course creator website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with the next cohort on an index card, programme ledger, who it's for, the interactive Manager's Wheel, the fifty-minute session method, a client story, the podcast with a live player, free worksheets, about Margo, application close
- `/programmes` — Programmes: seven programmes as workbook covers, filtered by format and stage, sorted by start date, price or length
- `/programmes/:slug` — Programme: facts, pay-in-full or monthly toggle, start-date picker, promise, outcomes, binder-tab curriculum, what's included, fit, client stories, FAQ, related programmes
- `/resources` — Free resources: eight worksheets, templates and card sets with type chips, skill filter and search
- `/resources/:slug` — Resource: the full printable worksheet, why it works, and an email-me-the-PDF form
- `/podcast` — Podcast: The Monday One-on-One, latest episode player, episode list with solo/guest chips, skill filter and search
- `/podcast/:slug` — Episode: chaptered player, show notes, pull quote, takeaways, the matching worksheet, previous/next
- `/stories` — Stories: client testimonials with before/after, filtered by programme format
- `/about` — About: Margo's story and timeline, coaching principles, the team
- `/apply` — Coaching application: four validated steps, review, consent, sending and confirmation states; attaches a scored Manager's Wheel

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

The Manager's Wheel scores are kept in `localStorage` (and work without it) and recommend a programme, two worksheets and an episode; they can be attached to the coaching application. The application, worksheet download and newsletter forms validate in the browser, show loading and success states, and send nothing. The podcast player runs a silent clock with seek, skip, speed and chapters because no audio ships with the template. Nothing is charged. Mentor, Margo Ellery, every client and every company are fictional.

## Credits

Fonts Bricolage Grotesque and Figtree (SIL OFL 1.1), images → src/assets/SOURCES.md, icons Lucide (ISC). Code MIT.
