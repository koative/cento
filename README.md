<div align="center">

# Koative Templates

### A different starting point.

Twenty-four independent design worlds. Built to be explored. Made to be yours.

**[Explore the collection →](https://koative.github.io/templates/)** · **[Koative](https://koative.com)**

![React](https://img.shields.io/badge/React-19-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-workspaces-f9f1e1?logo=bun&logoColor=222)
![License](https://img.shields.io/badge/license-MIT-303cdb)

</div>

![The Koative template collection](public/previews/collection.webp)

A starting point should give you a point of view. Then get out of your way.

This collection brings together twenty-four deliberately different websites: photographic editorials, kinetic posters, spatial experiments, useful dashboards, and thoughtful storefronts. Each template owns its layout, typography, color palette, motion and interactions. These are separate design directions, not twenty-four skins on the same landing page.

## The collection

| Template                          | World               | Signature                                                      | Live demo                                                          |
| --------------------------------- | ------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| **[Forma](themes/forma)**         | Architecture        | Photographic project index, expandable case studies            | [Explore ↗](https://koative.github.io/templates/themes/forma/)     |
| **[Orbit](themes/orbit)**         | Aerospace           | CSS 3D orbital model, mission selector, motion controls        | [Explore ↗](https://koative.github.io/templates/themes/orbit/)     |
| **[Muse](themes/muse)**           | Fashion             | Editorial composition, collection browsing, local shopping bag | [Explore ↗](https://koative.github.io/templates/themes/muse/)      |
| **[Pulse](themes/pulse)**         | Music & events      | Kinetic festival poster, day schedule, ticket selection        | [Explore ↗](https://koative.github.io/templates/themes/pulse/)     |
| **[Haven](themes/haven)**         | Hospitality         | Immersive alpine photography, stay configurator                | [Explore ↗](https://koative.github.io/templates/themes/haven/)     |
| **[Ledger](themes/ledger)**       | Finance             | Tactile 3D card, budget controls, local financial workspace    | [Explore ↗](https://koative.github.io/templates/themes/ledger/)    |
| **[Ember](themes/ember)**         | Restaurant          | Tomato-red menu, category tabs, table request flow             | [Explore ↗](https://koative.github.io/templates/themes/ember/)     |
| **[Atelier](themes/atelier)**     | Creative studio     | Expressive type, playful portfolio, project filtering          | [Explore ↗](https://koative.github.io/templates/themes/atelier/)   |
| **[Signal](themes/signal)**       | Analytics           | Interactive charts, reporting periods, search, CSV export      | [Explore ↗](https://koative.github.io/templates/themes/signal/)    |
| **[Still](themes/still)**         | Wellness            | Guided breathing interaction, class selection                  | [Explore ↗](https://koative.github.io/templates/themes/still/)     |
| **[Terrain](themes/terrain)**     | Outdoor             | Expedition journal, route difficulty selection                 | [Explore ↗](https://koative.github.io/templates/themes/terrain/)   |
| **[Roast](themes/roast)**         | Coffee commerce     | Product variants, local shopping cart                          | [Explore ↗](https://koative.github.io/templates/themes/roast/)     |
| **[Frame](themes/frame)**         | Photography         | Contact sheet, Image viewer                                    | [Explore ↗](https://koative.github.io/templates/themes/frame/)     |
| **[Monograph](themes/monograph)** | Independent journal | Editorial, Reading room                                        | [Explore ↗](https://koative.github.io/templates/themes/monograph/) |
| **[Index](themes/index)**         | Bookstore           | Book catalog, Local bag                                        | [Explore ↗](https://koative.github.io/templates/themes/index/)     |
| **[Bloom](themes/bloom)**         | Floral studio       | Bouquet builder, Seasonal                                      | [Explore ↗](https://koative.github.io/templates/themes/bloom/)     |
| **[Velo](themes/velo)**           | Performance cycling | Configurator, Performance                                      | [Explore ↗](https://koative.github.io/templates/themes/velo/)      |
| **[Prism](themes/prism)**         | Design conference   | Event agenda, Tickets                                          | [Explore ↗](https://koative.github.io/templates/themes/prism/)     |
| **[Nocturne](themes/nocturne)**   | Listening bar       | 3D turntable, Listening room                                   | [Explore ↗](https://koative.github.io/templates/themes/nocturne/)  |
| **[Arcade](themes/arcade)**       | Indie games         | Playable, Game studio                                          | [Explore ↗](https://koative.github.io/templates/themes/arcade/)    |
| **[Kiln](themes/kiln)**           | Ceramic objects     | Object gallery, 3D display                                     | [Explore ↗](https://koative.github.io/templates/themes/kiln/)      |
| **[Aura](themes/aura)**           | Skincare            | Ritual builder, Beauty                                         | [Explore ↗](https://koative.github.io/templates/themes/aura/)      |
| **[Tide](themes/tide)**           | Ocean conservation  | Volunteer, Conservation                                        | [Explore ↗](https://koative.github.io/templates/themes/tide/)      |
| **[Relay](themes/relay)**         | Logistics           | Operations, Tracking                                           | [Explore ↗](https://koative.github.io/templates/themes/relay/)     |

## Start the whole collection

Requires [Bun](https://bun.sh) 1.4.3 or newer.

```sh
git clone https://github.com/koative/templates.git
cd templates
bun install
bun run dev
```

Open **http://localhost:5173/templates/**. The gallery includes search, category filters, keyboard-accessible previews and desktop, tablet and mobile viewport controls. Every demo is also directly addressable at `/templates/themes/<name>/`.

```sh
bun run check     # TypeScript validation
bun run build     # Gallery + all twenty-four templates → dist/
bun run preview   # Serve the production build
bun run test      # Playwright integration checks (build first)
```

For a fresh Playwright installation, run `bunx playwright install chromium` before the integration checks.

## Take one template

Each `themes/<name>/` folder is a standalone Vite project. Copy a folder out of this repository, then install and run it:

```sh
cp -R themes/forma ../my-website
cd ../my-website
bun install
bun run dev
```

`bun run build` creates that template's own `dist/` directory. Its relative base works on a static host or under a subdirectory. If you copy a template directly from GitHub, download the repository ZIP first and extract the folder you want.

Edit `src/App.tsx` for content and interactions, `src/styles.css` for the visual system, and `src/assets/` for photography. Update `index.html` with your title and metadata. Replace demo contact addresses and links back to the collection. Each folder's README explains its specific controls and assets.

## Repository map

```text
├── gallery/                 # Collection UI, catalog and preview shell
├── themes/
│   ├── forma/               # An independent React + Vite app
│   ├── orbit/
│   └── ...                  # Twenty-four template folders in total
├── public/previews/         # Real screenshots used by the gallery
├── tests/                   # Production-route and interaction checks
├── scripts/                 # Preview capture tooling
├── .github/workflows/       # GitHub Pages build and deployment
└── vite.config.ts           # Collection multi-page build
```

React, TypeScript and Vite form the common foundation. Bun workspaces keep dependency installation shared. The gallery includes Tailwind CSS v4; individual templates use their own scoped stylesheets so they remain easy to extract and don't depend on a shared component kit. Lucide supplies consistent interface icons.

## Motion and accessibility

The templates include CSS 3D geometry, controlled rotations, animated type and deliberate transitions. Reduced-motion preferences are respected. Interactive controls use native buttons and form elements; keyboard focus remains visible. Photography is included locally. The gallery loads a live preview only when requested instead of running twenty-four websites in the background.

## Publish with GitHub Pages

This repository is configured for **https://koative.github.io/templates/**. The root Vite base is `/templates/`, and the production build contains a real HTML entry for every demo, so direct links do not require a single-page-app fallback.

In repository **Settings → Pages**, choose **GitHub Actions** as the build source. Push to `main` to build and deploy through `.github/workflows/pages.yml`. No custom domain is needed. This repository does not change the hosting or domain configuration of koative.com.

For a different repository path, change `base` in the root Vite configuration and update the public links in this README and `gallery/main.tsx`. For a root-domain deployment, use `/`.

## Demo boundaries

All template brands, business stories, financial balances, schedules and analytics are fictional sample content. Reservations, inquiries, purchases and transfers are front-end demonstrations: they do not send messages, take payments or persist to a server. Cart and interface state live in the current browser session unless a template documents otherwise. Connect your own backend before using those flows commercially.

The source code is available under the **[MIT license](LICENSE)**. Third-party photography and fonts retain their respective licenses; see **[ASSETS.md](ASSETS.md)** and the template READMEs. Replace photos with imagery you own when adapting a template for a real brand.

## Make it your own

Keep the personality or take it somewhere completely different. Contributions that bring a genuinely new composition, sector or interaction are welcome. Please include responsive behavior, reduced-motion support, useful demo controls and documented assets.

---

Made by **[Koative](https://koative.com)**. Independent ideas, shared openly.
