# Tilde

I build the slow, careful parts of fast software. A developer portfolio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: availability, tagline and a working shell (`tsh`) listing the projects, three featured case studies with pipeline diagrams, practices, a client quote, latest writing, a `git log` of recent activity, the four steps of an engagement, now/uses teasers, and an availability calendar with the closing call to action
- `/projects` — Projects: an `ls -l` style listing of six projects with kind filter, search and three sort orders
- `/projects/:slug` — Case study: role, client, timeline and stack, the data-flow pipeline, problem / approach / result, a code excerpt, a before/after benchmark table, measured facts, quote, related projects and next project
- `/writing` — Writing: seven posts grouped by year, with topic filter and search
- `/writing/:slug` — Post: byline with reading time, on-this-page navigation, paragraphs, code, lists and quotes, reply by email, older/newer
- `/uses` — Uses: desk, software and carry lists, plus a keyboard-operable dotfiles browser with copy to clipboard
- `/resume` — Résumé: experience as commits, skills, talks, education; switch to `resume.json` or plain text; print stylesheet for PDF
- `/about` — About: story, desk photo, working principles, speaking, facts
- `/now` — Now: what the developer is working on, building, writing and reading this month
- `/contact` — Start a project: validated enquiry form with budget chips and month picker, working terms, availability, FAQ
- Any unknown route — "No such file or directory" with the shell to find a page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build`: static output in `dist/`, and the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (person, projects, posts, uses, dotfiles, résumé, availability). `src/styles.css` starts with the design tokens at `:root` (light) and `[data-scheme="dark"]`. Imagery lives in `src/assets`.

## Demo behaviour

The shell runs entirely in the browser over the content in `content.ts`: `ls`, `cd`, `cat`, `open` (navigates), `theme`, `history`, tab completion and arrow-key history. The light/dark choice is stored in `localStorage` when available. The contact and newsletter forms validate in the browser and show a confirmation, but nothing is sent anywhere. Tilde Ekvall, her clients and every figure are fictional.

## Credits

Fonts DM Mono and Schibsted Grotesk (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
