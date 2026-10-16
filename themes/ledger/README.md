# Ledger

A plum and pale-lilac personal-finance workspace with a dimensional debit card, considered typography, and an expressive account overview.

## Run independently

```sh
bun install
bun run dev
bun run build
bun run preview
```

Node and npm may also be used with the equivalent commands. The Vite configuration uses relative asset paths, so the production `dist/` folder can be hosted at any static subdirectory.

## Interactions

Hide/show balances, freeze/unfreeze the sample card, preview a transfer, adjust the spending budget, add sample savings, and navigate workspace sections.

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

No stock imagery. Debit card and decorative geometry are authored in CSS. Fonts: Manrope and DM Sans sourced from Google Fonts and bundled locally. Icons: Lucide.

Unsplash assets are subject to the [Unsplash license](https://unsplash.com/license); font families are open source under their respective licenses. Replace demonstration imagery and content as appropriate for your project. Lucide icons use the ISC license.

Part of [Elseform](https://koative.github.io/elseform/).

## Self-hosted fonts

Fonts and their OFL licenses are bundled under `src/assets/fonts/`. No external font service is needed at runtime.
