# Cipher

A clear identity-security workspace with interactive access review decisions.

A standalone, responsive React + TypeScript + Vite template from [Koative Templates](https://github.com/koative/templates).

## Run independently

```sh
cd themes/cipher
bun install
bun run dev
bun run build
bun run preview
```

The production output is `dist/`. Vite uses a relative base, so the output can be served from any static subdirectory.

## Working interactions

Select identities, review their fictional access context, keep or revoke access locally, and expand answers.

All business names, prices, specifications, data and availability are **fictional demonstration content**. State stays in memory and resets on reload. No backend, booking, email, payment or external operation is connected. Replace demonstration content and implement real integrations before production use.

## Design and accessibility

An open review ledger: ivory and soft green, readable identity relationships, clear decision states and restrained product framing.

Responsive layouts, semantic controls, visible focus, meaningful labels, native form validation where relevant, and reduced-motion support. Motion follows the material of each theme; reduced-motion disables decorative animation.

## Self-hosted fonts and icons

Fonts are bundled in `src/assets/fonts/` with their Open Font License notices. Font assets are reused from this repository's licensed font collection. No external font request is made. [Lucide](https://lucide.dev/) icons use the ISC license. CSS and SVG geometry are authored for this template.

## Validation

Standalone build verified with `bun run build`. The root repository maintains interaction tests and responsive screenshot checks.
