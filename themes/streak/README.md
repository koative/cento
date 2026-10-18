# Streak

Mark the day. Keep the chain. A habit-tracking mobile app website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a tappable phone, three-step how-it-works, the interactive October chain calendar, evening check-in band, member story, feature index, member quotes, pricing teaser, latest posts, download close
- `/features` — Features: seven feature sections, each with its own authored phone screen, plus supported devices
- `/pricing` — Pricing: Free / Plus / Family with a monthly–yearly toggle, comparison table, billing FAQ
- `/blog` — Blog: posts filtered by topic and searched by text, with an empty state
- `/blog/:slug` — Post: cover (photo or app screen), article body, download prompt, related posts
- `/help` — Help centre: search, category filter, article list, quick-answer FAQ
- `/help/:slug` — Help article: numbered steps, details, "did this help?" feedback, related articles
- `/download` — Download: store buttons, "email me the link" form, requirements table, release notes
- `/about` — About: founding story, principles, team with their own chains, press contact
- `/contact` — Contact support: validated support form with ticket confirmation

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, habits on the phone screens, the chain presets, plans, posts, help articles). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The hero phone's habits can be ticked, the October calendar on the home page recomputes the chain, longest run and grace-day rule on every tap, and the pricing, blog and help filters work locally. The support form, the "email me the link" form and the newsletter validate input, show a short sending state and then a confirmation; nothing is sent, stored or charged. Streak and everyone quoted are fictional.

## Credits

Font: Rubik (SIL Open Font License). Images: see `src/assets/SOURCES.md` (CC0). Icons: Lucide (ISC). Code: MIT.
