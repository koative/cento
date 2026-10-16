# Frame

Photography studio website template from the Elseform collection.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`; publish the resulting `dist` directory. Vite uses relative asset paths, so the template can be hosted under a subdirectory.

## Design

A charcoal photographic viewfinder with oversized Italiana lettering, an asymmetric contact sheet, and a soft photographic develop transition.

## Interactions

Cycle the featured photograph; filter by genre; switch between contact-sheet and list layouts; select a project to feature it; expand the studio contact prompt. All state is local to the page.

## Customize

Edit content and interactions in `src/App.tsx`, styles in `src/styles.css`, and the document title and description in `index.html`. Photography is imported from `src/assets/`. The template uses React, Vite, TypeScript, and Lucide icons.

## Accessibility

Semantic landmarks, visible keyboard focus, labeled controls, native form validation, responsive layouts, and reduced-motion overrides are included. All text is English.

## Asset credits

Typography: Italiana and DM Sans, distributed through Google Fonts under their included open font licenses. Icons: [Lucide](https://lucide.dev), ISC license. Photography is locally bundled from Unsplash; source image URLs are listed below. Photographs illustrate the fictional concept and do not imply endorsement.

- `coast.jpg`: https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85
- `city.jpg`: https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85
- `portrait.jpg`: https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85

## Demonstration content

The brand, people, project names, books, descriptions, pricing, and business information are fictional demonstration content. Replace them with your own content before publication. No personal information leaves this page.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
