# Drift

Surf lessons and camps timed to the tide, not the clock. A surf school & camps website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with live "today at Gull Point" card, lesson rack, seven-day surf forecast widget, the three-stage method, featured and upcoming camps, a student quote, a day on camp, coaches, what to bring, closing call to book
- `/lessons` — Lessons: five lesson types with single / 3-pack / 5-pack price toggle, how tide-timed lessons work, board and wetsuit hire table
- `/camps` — Camps: camp finder filtered by level, region and month, sortable by date, price or length, with an empty state
- `/camps/:id` — Camp page: facts, day-by-day itinerary, included / not included, where you stay with gallery, coaches, departure picker with places left, related camps
- `/forecast` — Surf report: full forecast widget, guide to the three spots, how to read a surf forecast
- `/coaches` — Coaches: all five coaches with roles and boards
- `/coaches/:id` — Coach profile: bio, qualifications, lessons and camps they teach, the rest of the crew
- `/book` — Booking: lesson or camp, date / departure, surfers, contact details and swim confirmation with validation, live summary and confirmation state; prefilled from the forecast, lesson and camp pages
- `/about` — About: the story, how we keep it safe, looking after the bay
- `/faq` — FAQ: grouped disclosures plus what to bring

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (lessons, camps, coaches, spots, FAQ). `src/styles.css` starts with the design tokens at `:root`. Imagery lives in `src/assets`. The sample forecast model is in `src/lib/forecast.ts`; replace `forecast()` with a real marine-weather feed.

## Demo behaviour

The forecast widget generates seven days of sample swell, wind and tide from the calendar date and rates each hour for the chosen lesson level; its "Book" button carries the lesson, day and time into the booking form. Camp filters, the lesson pack toggle, the booking form and the swell-alerts signup all run locally in the browser: they validate, show loading and success states, and never send, store or charge anything. Drift, its coaches, students, prices and the Gull Point beach are fictional.

## Credits

Fonts: Lilita One and Albert Sans (SIL Open Font License). Images: see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
