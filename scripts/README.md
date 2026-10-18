# Collection tooling

Start `bun run dev` first; the scripts read `CENTO_URL` (default `http://localhost:5180/cento/`, set it to match your dev server).

- `check-theme.mjs <slug…>` crawls every route of a template at 1440 and 390 px — the pages in its `cento.json` plus every in-app link — and reports console errors, failed requests, the 404 page, `<h1>` count, horizontal overflow, broken images, empty `href`s and routes that render the same page as another. Full-page screenshots go to the ignored `.qa/<slug>/`; add `--no-shots` to skip them.
- `capture-previews.mjs [slug…]` screenshots each template's first viewport into `public/previews/<slug>.webp` (1200×750) and tiles them into `public/previews/collection.webp` for the README. WebP encoding uses Pillow (`python3`).
- `localize-fonts.py` replaces any Google Fonts `@import` at the top of a stylesheet with self-hosted Latin `@font-face` rules, downloads the files and OFL texts, and records provenance in `font-sources.json`. Run it after adding or changing a template's fonts.

`bun test` is Bun's own runner; use **`bun run test`** to run the Playwright suite against the production build (`bun run build` first).
