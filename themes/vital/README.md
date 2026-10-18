# Vital

A licensed clinician on your phone, usually within fifteen minutes. A telehealth service website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a live video-visit frame and visit slip, live wait board, conditions price index, visit timeline, the "when to go in person" stance, plans, clinicians, app, patient notes, FAQ, closing check-in call
- `/conditions` — Conditions index with symptom search, category and visit-type filters, sorting and an empty state
- `/conditions/:slug` — Condition page: symptoms, what we treat vs. go in person, visit steps, often-prescribed list, price card, clinicians, FAQ, related conditions (11 conditions)
- `/how-it-works` — Timed four-step visit walkthrough, visit types compared, labs and pharmacy, what we do not do, privacy, FAQ
- `/check-in` — Six-step symptom check-in with red-flag screening, severity scale, triage recommendation, visit choice and a validated details form, building a live visit slip; confirmation state
- `/pricing` — Plans with monthly/yearly toggle, plan comparison table, self-pay prices per condition, accepted insurance, billing FAQ
- `/clinicians` — Clinicians filterable by licensed state and language
- `/clinicians/:slug` — Clinician profile with credentials, bio, training, selectable open times and conditions seen (6 clinicians)
- `/app` — The app: authored phone screens, download links, text-me-a-link form, feature list
- `/about` — Story, published clinical standards, leadership

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` (all copy and data), `src/styles.css` (tokens at `:root`), `src/assets` (imagery).

## Demo behaviour

The check-in screens for red flags and routes to emergency care, in-person care or a video, message or scheduled visit using the sample data in `content.ts`; the live wait board follows a sample wait-by-hour table and your local clock. Forms validate in the browser and show loading and success states, but nothing is sent, booked or charged, and nobody will call. Vital, its clinicians, insurers, prices and policies are fictional and are not medical advice.

## Credits

Font: Plus Jakarta Sans (OFL). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
