# Monograph

Independent journal website template from the Koative collection.

## Run independently

```sh
bun install
bun run dev
```

Build with `bun run build`; publish the resulting `dist` directory. Vite uses relative asset paths, so the template can be hosted under a subdirectory.

## Design

An oversized Libre Caslon newspaper masthead, cream stock, oxblood annotations, and an irregular multi-column issue. Expanded stories unfold in place.

## Interactions

Filter the issue by topic; open and close complete demonstration stories; submit a validated email for an explicitly local subscription confirmation. No email is sent or stored remotely.

## Customize

Edit content and interactions in `src/App.tsx`, styles in `src/styles.css`, and the document title and description in `index.html`. Photography is imported from `src/assets/`. The template uses React, Vite, TypeScript, and Lucide icons.

## Accessibility

Semantic landmarks, visible keyboard focus, labeled controls, native form validation, responsive layouts, and reduced-motion overrides are included. All text is English.

## Asset credits

Typography: Libre Caslon Text and DM Sans, distributed through Google Fonts under their included open font licenses. Icons: [Lucide](https://lucide.dev), ISC license. Photography is locally bundled from Unsplash; source image URLs are listed below. Photographs illustrate the fictional concept and do not imply endorsement.

- `architecture.jpg`: https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=85
- `reading.jpg`: https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=85

## Demonstration content

The brand, people, project names, books, descriptions, pricing, and business information are fictional demonstration content. Replace them with your own content before publication. No personal information leaves this page.

The quotation from Arthur Conan Doyle is from the public-domain novel _The Hound of the Baskervilles_ (1902). Journal stories are original fictional demonstration copy.

## Self-hosted fonts

Font files and their OFL license notices are included in `src/assets/fonts/`. No remote font request is required at runtime.
