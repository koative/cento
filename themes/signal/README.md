# Signal

A porcelain and teal analytics workspace with restrained data density, an authored SVG chart, contextual navigation, and useful reports.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm may also be used with the equivalent commands. The Vite configuration uses relative asset paths, so the production `dist/` folder can be hosted at any static subdirectory.

## Interactions

Switch reporting periods and chart metrics, toggle the previous-period series, search page data, switch demo workspaces, load saved report presets, and download the visible rows as a real CSV file.

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

No stock imagery. Charts are authored SVG geometry. Fonts: IBM Plex Sans and DM Sans sourced from Google Fonts and bundled locally. Icons: Lucide.

Unsplash assets are subject to the [Unsplash license](https://unsplash.com/license); font families are open source under their respective licenses. Replace demonstration imagery and content as appropriate for your project. Lucide icons use the ISC license.

Part of [Koative Templates](https://koative.github.io/templates/).

## Self-hosted fonts

Fonts and their OFL licenses are bundled under `src/assets/fonts/`. No external font service is needed at runtime.
