# Still

A quiet, editorial wellness studio in lavender and burgundy, with spacious serif typography, mountain photography, and a slow breathing interaction.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm may also be used with the equivalent commands. The Vite configuration uses relative asset paths, so the production `dist/` folder can be hosted at any static subdirectory.

## Interactions

Start/pause a 4-second inhale and 6-second exhale exercise, browse class days, select a class, submit a local demo signup, expand FAQs, and open the mobile navigation.

## Customize

- `src/App.tsx`: content, sample data, interactions, sections.
- `src/styles.css`: complete independent design system and responsive rules.
- `src/assets/`: local photography where applicable.

This is a React + Vite + TypeScript template. It is independent of the gallery and other templates. No backend or environment variables are required.

## Demo boundaries

All brands, balances, metrics, products, classes, schedules, prices, and account details are fictional demonstration content. State lives in memory and resets on reload. No real payments, financial transfers, orders, bookings, account connections, analytics tracking, or email delivery are implemented. Form values are not sent or stored.

## Accessibility and motion

Semantic landmarks, labeled controls, keyboard focus, responsive layouts, native form validation, and reduced-motion styles are included. The main animation is decorative or user-initiated; the content remains available without it.

## Assets

Local photo: src/assets/studio.jpg, downloaded from https://images.unsplash.com/photo-1545389336-cf090694435e?w=1400&q=85&fit=crop (Unsplash). Fonts: Instrument Serif and DM Sans sourced from Google Fonts and bundled locally. Icons: Lucide.

Unsplash assets are subject to the [Unsplash license](https://unsplash.com/license); font families are open source under their respective licenses. Replace demonstration imagery and content as appropriate for your project. Lucide icons use the ISC license.

Part of [Elseform](https://koative.github.io/elseform/).

## Self-hosted fonts

Fonts and their OFL licenses are bundled under `src/assets/fonts/`. No external font service is needed at runtime.
