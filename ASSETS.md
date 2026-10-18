# Asset credits and licensing

The MIT license covers the original source code in this repository. It does not replace the licenses of third-party assets.

## Photography

Each template documents every image it ships in `themes/<slug>/src/assets/SOURCES.md`: file, source URL, creator where known and license. Sources are open-licensed collections — CC0 and public-domain works found through [Openverse](https://openverse.org) and [Wikimedia Commons](https://commons.wikimedia.org), the [WordPress Photo Directory](https://wordpress.org/photos/), StockSnap, rawpixel's public-domain collection, and photographs served under the [Unsplash License](https://unsplash.com/license). A few Commons images are CC BY or CC BY-SA and carry their attribution in that file. Where a photograph showed a third-party logo or brand mark, it was cropped or retouched out.

Photographer, trademark, property and model rights are separate from copyright licenses; choose assets that suit your own published project. Templates whose worlds are graphic (dashboards, documentation, games, product drawings) ship no photography at all and say so in their `SOURCES.md`.

## Fonts

Every typeface is a Google Fonts family, self-hosted as Latin subsets next to the stylesheet that uses it (`src/assets/fonts/` in each template, `gallery/assets/fonts/` for the gallery), so no page requests Google's servers at runtime. All families are under the SIL Open Font License except Roboto Slab (Fixture) and Ultra (Kettle), which are Apache 2.0. Each font directory carries its family's license text, and the exact download URL of every file is recorded in [`scripts/font-sources.json`](scripts/font-sources.json). Each template's pairing is listed in its `cento.json` and README.

The gallery itself is set in Geist and Geist Mono.

## Icons and geometry

Interface icons come from [Lucide](https://lucide.dev) (ISC license). Charts, maps, floor plans, product drawings, seat maps, logos and the Cento mark are original SVG/CSS/canvas work in this repository.

## Gallery previews

`public/previews/` holds browser screenshots of each template's first viewport, captured from the real builds by `scripts/capture-previews.mjs`. `public/cento-social.png` is a capture of the gallery itself.

## Demo content

All template brands, people, testimonials, schedules, prices, menus, specifications and figures are fictional demonstration content. None imply endorsement, a real customer relationship or a commercial offering by a named third party.
