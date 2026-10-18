# Enamel

Careful dentistry, priced before we pick up a drill. A dental clinic website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: next free check-up, popular prices, the interactive tooth chart, full treatment index, the "show then treat" promise, dentists, comfort menu, first visit timeline, Enamel Plan, patient notes, hours and map, booking close
- `/treatments` — Treatment list with type filter, search and sort
- `/treatments/:slug` — Treatment page (13): price card with member price, chair time, comfort notes, photo or cross-section diagram, steps, aftercare, FAQ, who does it, related treatments
- `/dentists` — Team of five dentists and a hygienist
- `/dentists/:slug` — Dentist profile: bio, training, days in clinic, next free slot, treatments, book with them
- `/prices` — Every price in tables with a pay-as-you-go / member toggle, the Enamel Plan with monthly / yearly billing, insurance and payment notes
- `/new-patients` — First hour minute by minute, what to bring, the comfort menu, policies, FAQ
- `/book` — Four-step booking: treatment, dentist, day and free time, details; validation, loading and a confirmation appointment card
- `/visit` — Address, live open status, hours, street map, getting here, access, emergency line
- `/about` — Story, principles, rooms, sterilisation

## Run

```
bun install && bun run dev
```

Build: `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (treatments, dentists, prices, plan, hours, policies). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`.

## Demo behaviour

The tooth chart marks teeth per concern and turns them into suggested treatments with a price range, then hands the marked teeth to the booking form. The booking diary is generated locally from opening hours and each dentist's working days; confirming a booking, signing up for a recall reminder and every other form only validate and show a success state in the browser. Nothing is sent, stored or charged, and Enamel, its people and its patients are fictional.

## Credits

Font: Albert Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
