# Forge

Machined to print. Shipped on the date we quote. A precision manufacturing website template from [Cento](https://koative.github.io/cento/) by Koative.

## Pages

- `/` — Home: hero with a drawing title block, capability index, configurator teaser, RFQ-to-dock timeline, industries switcher, quality band, case study, full machine list, closing RFQ call
- `/capabilities` — Capabilities: seven processes with material filter, search and sort
- `/capabilities/:slug` — Capability: specification, work-envelope diagram drawn to proportion, strengths, machines table, related processes
- `/configurator` — Part configurator: flange, bracket or shaft with live dimensioned drawing, material/finish/tolerance/quantity, price breaks, lead time, spec download, hand-off to RFQ
- `/industries` — Industries: aerospace, medical, semiconductor, robotics, energy, with standards, parts, materials and a proof point each
- `/quality` — Quality: certifications, six inspection checkpoints, interactive ballooned first-article report, twelve-month metrics, inspection room
- `/about` — About & careers: story, timeline, hiring rules, people, open roles, visiting the shop
- `/rfq` — Request a quote: validated RFQ form with file attachments, configurator part attachment, sending and confirmation states
- Any other path — 404 page

## Run

```sh
bun install && bun run dev
```

Build with `bun run build` — static output in `dist/`; the relative base works in any subfolder.

## Customize

`src/content.ts` holds all copy and data (brand, capabilities, industries, quality, configurator materials, finishes and tolerances). `src/styles.css` holds the design tokens at `:root`. Imagery lives in `src/assets`. The illustrative pricing model is in `src/lib/part.ts`.

## Demo behaviour

The configurator prices parts with an illustrative formula in the browser and can download a plain-text spec or attach the part to the RFQ form. The RFQ and newsletter forms validate locally, show a loading state and a confirmation; no file is uploaded, nothing is sent, quoted or charged. Forge Precision Works, its people, customers, certifications registrars and figures are fictional.

## Credits

Fonts: Chivo and Chivo Mono (SIL Open Font License). Images: Wikimedia Commons, see `src/assets/SOURCES.md`. Icons: Lucide (ISC). Code: MIT.
