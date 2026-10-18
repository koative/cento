# Ledger

Give every dollar a job before the month does. A personal finance app website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: product hero with a live budget sheet and card, three-step method, paycheck allocator, accounts ledger, card freeze, household quote, guides, security, plans, close
- `/features` — Envelopes, accounts, transactions, goals and the card, with a money-flow band
- `/pricing` — Three plans with a monthly/yearly toggle, plan-by-plan table, billing FAQ
- `/households` — Four household setups, each with its own envelope ledger
- `/guides` — Money guides with topic filter and search
- `/guides/:slug` — Guide article with worked ledger tables and related guides (7 guides)
- `/security` — Practices line by line, what Ledger never does, incident FAQ
- `/changelog` — Release notes
- `/about` — Story, facts, principles, team
- `/signup` — Account creation form with plan choice, validation and success state
- `/signin` — Sign-in form that opens the demo
- `/app` — Demo overview: month equation, spending pace chart, envelopes to watch, latest activity, card freeze, goal
- `/app/budgets` — Editable envelope budget with to-be-assigned banner, overspending cover and move-money form
- `/app/accounts` and `/app/accounts/:id` — Accounts by type with net worth; account detail with six-month chart and transactions
- `/app/transactions` — Searchable, filterable, sortable transactions with inline recategorising and CSV export
- `/app/settings` — Profile and alert preferences, connected institutions

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and demo data, `src/styles.css` the design tokens at `:root`, `src/assets` the sources list.

## Demo behaviour

The paycheck allocator, card freeze, guide filters and every form run entirely in the browser. In the `/app` demo you can reassign envelopes, cover overspending, recategorise transactions, hide balances, freeze the card, save settings and export a CSV; changes persist while you move between screens and reset on reload. Nothing is sent, charged or connected to a bank, and Ledger is a fictional brand.

## Credits

Font: Plus Jakarta Sans (SIL Open Font License). Graphics are authored SVG/CSS — see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
