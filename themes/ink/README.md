# Ink

Flash off the wall, drawn again for your skin. A tattoo studio website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: hero with a pinned flash sheet, this month's wall, stencil sizer teaser, booking steps, artists, studio statement, Flash Friday walk-ins, prices, reviews, aftercare teaser, visit and hours
- `/flash` — Flash book: 17 authored designs with style chips, artist filter, search, sort and a hide-claimed toggle
- `/flash/:id` — Design page: the sheet, specs, placement notes, the stencil sizer (size, placement, angle, transfer view, live estimate) and related sheets
- `/artists` — Artists: four residents with books status, day rates and their flash
- `/artists/:id` — Artist page: bio, quote, booking facts, guest spots, their flash and the rest of the studio
- `/aftercare` — Aftercare: healing clock (days slider or session date) with day-by-day stages, things to avoid, the take-home kit and infection warning signs
- `/studio` — Studio: story, the room, who works here, hours, address and an authored street plan
- `/faq` — FAQ & policies: accessible disclosures grouped by booking, money and the day, plus studio policies
- `/book` — Booking request: flash / custom / touch-up form with validation, live summary and a confirmation state; prefilled from the stencil sizer

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (studio, artists, flash, placements, prices, aftercare, FAQ). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`; new flash drawings go in `src/components/FlashArt.tsx`.

## Demo behaviour

The stencil sizer scales each flash design against the usable area of real placements and estimates price and sit time locally; "Request" carries the design, size and placement into the booking form. The booking form validates in the browser, shows a loading state and a confirmation with a reference number; the footer newsletter validates and confirms. Nothing is sent, stored or charged, and Ink, its artists and its clients are fictional.

## Credits

Fonts: Pirata One and Inter Tight (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
