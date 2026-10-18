---
name: Solace
colors:
  paper: "#f5f2ea"
  paper-deep: "#ece6d7"
  card: "#fffdf8"
  sage: "#dfe8da"
  sage-deep: "#c5d6be"
  ink: "#1c4038"
  ink-soft: "#46625a"
  accent: "#9a4f27"
  accent-soft: "#f1dccd"
  line: "#d2d4c6"
  ok: "#2d6a3c"
  error: "#a3312a"
typography:
  display: "Source Serif 4 (450–600, optical sizing)"
  body: "Source Sans 3 (400–700)"
  sizes:
    body: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    h1: "clamp(2.6rem, 1.8rem + 3.6vw, 5rem)"
    h2: "clamp(1.9rem, 1.5rem + 1.8vw, 2.9rem)"
rounded:
  card: 14px
  control: 10px
  chip: 99px
spacing:
  page-pad: "clamp(1.25rem, 4vw, 3.5rem)"
  section: "clamp(4rem, 8vw, 7.5rem)"
  max-width: 1320px
---

## Overview

Solace is set like the practice’s own printed patient leaflet: warm uncoated paper, deep pine ink, a terracotta cross, plain serif headings and generous sans text. Patients — parents on a phone in a waiting room, older people at a desktop — read it in ordinary daylight, so it is light, calm and high-contrast, never clinical white and never cute.

## Colors

Paper `#f5f2ea` is the page; card `#fffdf8` lifts badges, the appointment card and inputs. Pine ink `#1c4038` carries text, buttons and the footer. Sage `#dfe8da` marks selection and quiet bands. Terracotta `#9a4f27` is the only accent: the logo cross, step numbers, times, links and the “Booked” stamp. Green `#2d6a3c` is reserved for “open now” and “accepting new patients”; `#a3312a` for errors.

## Typography

Source Serif 4 for headings, service names, card values and quotes (italic). Source Sans 3 for body, labels and data, with tabular numerals for times, prices and hours. Tracking stays between −0.025em and 0.

## Layout

A 1320px column with fluid padding. Services read as an index of leaflets (ruled rows, not cards). Two-column splits for features, service and profile pages with a sticky facts aside. Full-bleed only for the same-day band, the closing split and the footer.

## Components

- Clinician badge: the clinic ID badge with lanyard slot, initials disc, role in terracotta and an availability dot.
- Appointment card (signature): the reception card with dotted blanks that ink in as the visit is planned, then a rotated “Booked” stamp with the reference.
- Booking planner: four numbered fieldsets with radio cards, pill segments, a two-row day strip with open counts, and time slots grouped by morning/afternoon/evening.
- Clinic map: authored SVG of Alder Bay with pressable pins synced to clinic tabs.
- FAQ: native `details` with a rotating plus.

## Motion

Pages rise in once (12px, 0.6s expo-out). Values on the appointment card ink in (blur to sharp); the stamp lands with a slight overshoot. Nav underlines draw from the left. Everything collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep one accent; let pine and paper do the work.
- Do write in the practice’s voice: plain, specific, kind.
- Don’t add eyebrows, icon-tile grids or stat rows.
- Don’t use red for anything but errors, or green for anything but availability.
