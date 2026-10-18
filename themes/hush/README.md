# Hush

Headphones that turn the world down, not your music up. A noise-cancelling headphones website template from [Cento](https://cento.koative.com/) by Koative.

## Pages

- `/` — Home: Hush One hero with live colour picker, the four loudest places, the noise lab, the range, microphone diagram, repair parts, owner quotes, promises and a closing call to action
- `/shop` — Shop: all headphones and parts with type filter, use filter and sort
- `/shop/:id` — Product: SVG product in every colourway, colour picker, quantity, add to cart / buy now, highlights, noise lab for that model, specifications, in the box, related products
- `/story` — Product story: how Hush One was made, chapters with photography, frequency-response chart, noise lab, materials, timeline
- `/compare` — Compare: any three models side by side, best-in-row markers, "only show differences" toggle, buying advice
- `/support` — Support: guide search, FAQ disclosures, validated support ticket form with success state
- `/support/:slug` — Guide: step-by-step instructions with tick-off progress, "did this help" feedback, related guides
- `/about` — About: company, values, repair figures, team, studios
- `/cart` — Cart: quantities, removal, summary (persisted in localStorage)
- `/checkout` — Checkout: validated contact and shipping form, delivery choice, order confirmation

## Run

bun install && bun run dev (build: bun run build — static output in dist/, relative base works in any subfolder)

## Customize

content.ts (all copy and data), styles.css (tokens at :root), src/assets (imagery).

## Demo behaviour

Everything runs in the browser. The cart is kept in localStorage (and still works for the visit when storage is blocked); checkout, the support form and the newsletter validate input and show a confirmation, but nothing is sent, stored on a server or charged. The noise lab draws a modelled spectrum and, only when you press play, renders filtered noise with the Web Audio API. Hush, its people, products and prices are fictional.

## Credits

Fonts: SUSE (SIL Open Font License). Images → src/assets/SOURCES.md. Icons: Lucide (ISC). Code MIT.
