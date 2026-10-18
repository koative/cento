# Counsel

Clear counsel for the decisions that define a business or a family. A law firm website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: practice index, client groups, recent-work ledger, limitation clock, partners, client voices, engagement steps, latest insights, enquiry close
- `/practice` — Practice areas, filterable by businesses or individuals
- `/practice/:slug` — Practice area: services, representative matters, area-specific deadlines, fee basis, team, FAQ, further reading
- `/people` — People directory with name search, practice and role filters
- `/people/:slug` — Profile: portrait, direct contacts, biography, matters, admissions, education, languages, writing, colleagues
- `/insights` — Insights archive with search, type and practice filters
- `/insights/:slug` — Article set as a firm memorandum with numbered paragraphs and an in-brief panel
- `/firm` — The firm: story, principles, timeline, pro bono clinic, offices
- `/fees` — Fees & engagement: charging bases, fixed-fee schedule with individuals/businesses toggle, hourly rates, FAQ
- `/enquiry` — Enquiry intake with conflict-check fields, validation, prefill from the limitation clock or a profile, and a confirmation receipt

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (firm, practice areas, people, insights, limitation periods, fees, offices). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The limitation clock calculates illustrative deadlines from a chosen event and date and hands the practice area and deadline to the enquiry form. The enquiry form validates in the browser, shows a short sending state and then a receipt with a reference number; the footer briefing sign-up validates and confirms the same way. Nothing is sent, stored or charged, no attorney–client relationship is created, and Counsel Partners LLP, its people and its matters are fictional.

## Credits

Fonts: Libre Baskerville and Libre Franklin (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
