---
name: Prism
colors:
  paper: "#f4f1ea"
  paper-2: "#e9e4da"
  card: "#fbf9f4"
  lilac: "#ddd2f3"
  ink: "#24132f"
  ink-2: "#514360"
  error: "#a8200f"
  track-type: "#e0452e"
  track-interface: "#f29a1d"
  track-systems: "#33a065"
  track-space: "#3a6fe0"
  track-practice: "#8550e0"
typography:
  display:
    {
      family: "Climate Crisis",
      sizes: "h1 clamp(2.4rem, 6.2vw, 5.5rem); hero word up to 6rem; h2 clamp(1.7rem, 3.4vw, 2.75rem)",
    }
  body:
    {
      family: "Instrument Sans",
      sizes: "1.0625rem / 1.6; lede clamp(1.125rem, 1.6vw, 1.35rem); small 0.85–0.95rem",
    }
rounded: { image: 4px, control: 6px, card: 12px, chip: 999px }
spacing:
  {
    gutter: "clamp(1.25rem, 4vw, 3rem)",
    section: "clamp(4rem, 8vw, 7rem)",
    wrap: 1320px,
  }
---

# Prism — design notes

## Overview

A conference programme printed on warm uncoated paper: plum ink, one lavender spot colour kept from the previous Prism, and a five-colour spectrum that is not decoration but the programme's coding system — every track has a colour, and that colour follows its sessions, speakers and chips everywhere. Light theme, because the real use scene is designers planning at a desk and attendees checking a phone in a sunlit hall.

## Colors

Paper `#f4f1ea` and plum ink `#24132f` carry all text (ink-2 `#514360` for secondary, ≥ 7:1 on paper). Lavender `#ddd2f3` marks the theme band, selected passes and text selection. The spectrum — type red, interface amber, systems green, space blue, practice violet — appears only as fills, bars, top rules and tints mixed into paper (`color-mix`), never as text, so contrast never depends on it. Error red `#a8200f`.

## Typography

Climate Crisis (heavy, wide, poster-like) for the wordmark, h1/h2, day tabs, pass names and years; capped at 6rem, tracking −0.01em. Instrument Sans for everything else, including h3, with tabular numerals for times, prices and tables.

## Layout

1320px wrap with fluid gutters. Pages open with a large Climate Crisis title and a lede at ≤ 62ch. Home alternates density: hero + spectrum, lavender essay band, speaker grid, dense two-room timetable, a dark workshop band, passes, full-bleed venue photo, edition strip, partner line, dark closing band. Breakpoints at 1180, 1100, 1040 (mobile nav), 860 and 560.

## Components

- **Spectrum** (home): SVG beam entering a prism and splitting into five beams that land on the five track rows; hovering/focusing a track lights its beam and links into the filtered agenda.
- **Portraits**: grayscale photos multiplied over their track colour (duotone), full colour on hover.
- **Session card**: track colour as a 4px top rule, Add/In-your-agenda toggle, overlap warning; shared moments (doors, lunch, parties) are dashed and not addable.
- **Agenda builder panel**: SVG three-day timeline (overlaps split their row and get a dashed outline), track-mix bar, per-day list, `.ics` export; on mobile a floating dock jumps to it.
- **Floor plan**: authored SVG of the hall (arched windows, tram rails) synced with a room picker.
- Buttons: ink, outline, paper variants at 48px; chips and filters as pills.

## Motion

One language: light arriving. The header's spectrum rule sweeps open on every route change, the page fades up 12px, and the hero beams fade in staggered; hovering a track brightens its beam. Everything is visible by default and `prefers-reduced-motion` removes all animation and transitions.

## Do's and Don'ts

- Do let track colour mean track — one colour per track, everywhere.
- Do keep Climate Crisis short: titles, names, years. Never paragraphs.
- Don't put text in spectrum colours; tint backgrounds instead.
- Don't add sponsor logos to the stage areas; partners are typeset names.
