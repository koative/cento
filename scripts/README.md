# Collection tooling

`capture-previews.mjs` captures the twelve live templates at desktop and mobile sizes, checks browser errors, missing imagery and horizontal overflow, and writes a report into the ignored `.qa/` directory. Start `bun run dev` first, then run `bun scripts/capture-previews.mjs`.

Gallery previews in `public/previews` are committed WebP screenshots. They do not load twelve hidden iframes. An interactive iframe is created only when a visitor opens a preview.

`bun test` is Bun's own runner; use **`bun run test`** to run the Playwright integration suite against the production build. Run `bun run build` first.
