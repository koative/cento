---
name: Arcade
colors:
  paper: "#f6efe2"
  paper-2: "#ece2cf"
  card: "#fffaf0"
  ink: "#1d1631"
  ink-2: "#4a4062"
  violet: "#5b3fd1"
  violet-deep: "#3a2896"
  violet-soft: "#e2d9fb"
  sun: "#ffcf3d"
  plastic: "#2b2342"
  cabinet: "#17112a"
  error: "#a3290f"
typography:
  display:
    {
      family: Bungee,
      weight: 400,
      sizes: "clamp(2.5rem, 1.3rem + 4.8vw, 5.25rem) h1; clamp(1.7rem, 1.3rem + 1.8vw, 2.7rem) h2",
    }
  body:
    {
      family: Rubik,
      weight: "400–700",
      size: "clamp(1rem, 0.96rem + 0.2vw, 1.1rem)",
      line-height: 1.6,
    }
rounded:
  { card: 14px, control: 8px, buttons: "4px stepped pixel corners (clip-path)" }
spacing:
  {
    gutter: "clamp(1rem, 4vw, 2.5rem)",
    section: "clamp(3.5rem, 2.5rem + 4vw, 6.5rem)",
    wrap: 1240px,
  }
---

# Arcade

## Overview

A small studio's shop window built like a games shelf: warm manual-paper pages, cartridges with pixel-art labels, and a dark arcade cabinet where the demo actually plays. Indie studios sell on their art and on letting people play, so every image is the studio's own pixel art drawn in code, and the first thing below the fold is a game you can play.

## Colors

Paper and ink carry the reading pages (light, because press and players read devlogs and job posts at a desk). Violet is the single interface accent (buttons, links, active nav, markers); sun yellow is reserved for the dark surfaces (cabinet buttons, focus rings, principle headings). Each game owns a ten-colour palette in `content.ts` that drives its key art, sprites and the accent bar on its page; the site palette never competes with it.

## Typography

Bungee, a marquee-signage face, sets every heading, the logo, buttons and the in-game HUD; it is always uppercase and never tracked tighter than 0. Rubik sets body copy, metadata and forms at 65–75ch, with tabular numerals for scores, prices and salaries.

## Layout

A 1240px wrap with fluid gutters. Home alternates dense and quiet bands: hero split, horizontally scrolling cartridge shelf, full-bleed dark cabinet, spotlight, a lone centred quote, devlog grid, a paper-2 team band, a ruled jobs table and a violet close. Detail pages use two-column reading layouts that collapse under 1024px and 900px.

## Components

Cartridge cards (plastic shell, grip ribs, gold contacts, key-art label), screen bezels around every scene, stepped-corner pixel buttons (solid, ghost, sun, dark ghost), pill chips for filters, ruled spec tables, a keyboard tab-list screenshot viewer, Blob Hop (canvas + HTML HUD + buttons + assist switch), Pair Up! cards that flip in 3D, pixel team portraits, and form fields with inline errors and a success panel.

## Motion

Pages boot in with a six-step clip reveal like a console screen drawing. Cartridges lift out of the shelf on hover, the logo mark hops, half the crew idles on a two-frame bob, and game-over and success panels pop in on stepped timing. Everything is visible by default and `prefers-reduced-motion` removes all of it; the games only move when the player starts them.

## Do's and Don'ts

- Do draw new art as sprites and scenes in code, on whole pixels, from a game palette.
- Do keep violet for actions and sun for dark surfaces.
- Don't add photos, gradients or glass; the pixel grid is the texture.
- Don't set body copy in Bungee or track it negative.
- Don't hide content behind the demo: every action has a visible button as well as a key.
