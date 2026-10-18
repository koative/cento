# Cento

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, Vite 7, TypeScript and Bun workspaces. The gallery uses plain CSS; every template is an independent Vite app with its own package.json, plain CSS, hash routing and no shared runtime. Static build for GitHub Pages, served at the root of the custom domain cento.koative.com.

## Users

Developers, designers and freelancers looking for a complete website to start a client or personal project from. They compare a few candidates quickly, then open two or three live and take the source.

## Product Purpose

Cento (formerly Elseform) publishes one hundred complete, multi-page website templates, each with its own sector, art direction, typography and signature interaction, through a browsable catalogue with live previews and direct source access. Published at https://cento.koative.com/ from the koative/cento repository. The separate koative.com site stays untouched.

## Capabilities and Constraints

Every template is a real multi-page site (7+ page templates, 10+ routes, collection → detail pages, a working client-side conversion flow, commerce carts and checkouts or SaaS `/app` demos where the sector calls for them) whose copy and data live in one `content.ts`. The user asked to replace the most niche sectors with in-demand categories (portfolios, SaaS, agencies, clinics, local services, commerce) while keeping a hundred. Static demonstration behaviour only: no backend, payments or message delivery. Templates must build standalone when their folder is copied out (e.g. with `degit`). All UI and documentation in English.

## Brand Commitments

Cento is the product identity; Koative is the creator and repository owner. The user chose the name Cento (Italian for a hundred; a poem built from borrowed lines). For the gallery, after rejecting a card-catalogue world and comparing five rendered directions, the user chose the category standard: a template marketplace executed at full craft, with Framer Marketplace as the quality bar. Convention is the commitment — no ironic or quirky reinterpretation. The gallery supports Light, Dark and System appearance; System follows live OS changes and explicit choices persist locally. Individual templates keep their own art direction and are never styled by the gallery.

## Evidence on Hand

One hundred buildable templates with per-theme metadata (`themes/<slug>/cento.json`), screenshots generated from the real builds, open-licensed photography recorded per theme in `src/assets/SOURCES.md`, OFL fonts self-hosted, authenticated GitHub access. No customers, endorsements or testimonials exist for Cento itself; every template brand and figure is fictional and labelled as such.

## Product Principles

- Complete sites, not landing-page skins: every template could be launched.
- Distinct worlds: no two templates share a composition, palette or type pairing.
- Show the real thing: screenshots and previews come from the actual builds.
- Source in one step: every template is one command away from your machine.
- Motion is authored, bounded and respects reduced motion.
