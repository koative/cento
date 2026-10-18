---
name: Roam
colors:
  paper: "#eeece6"
  paper-2: "#e2dfd6"
  surface: "#f9f8f4"
  ink: "#15171a"
  ink-2: "#474a4f"
  ink-3: "#5f6267"
  line: "#cdc9be"
  sign: "#f4c20d"
  go: "#1c6a44"
  stop: "#ad3019"
  sea: "#cad5d2"
typography:
  display: "Encode Sans Expanded, 600–800"
  body: "Encode Sans, 400–700"
  sizes: "body 1.0625rem; h3 clamp(1.15–1.35rem); h2 clamp(1.8–2.9rem); h1 clamp(2.3–4.75rem)"
rounded:
  sign: 6px
  card: 14px
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 2.6vw, 3rem)"
  section: "clamp(4rem, 2.8rem + 5vw, 7.5rem)"
---

## Overview

Roam is set in the rental garage itself: concrete floors, asphalt-black sign panels, signal-yellow wayfinding, painted bay numbers and the plastic key tag that carries your car's code. A renter lands, follows yellow signs and finds a bay; the site works the same way. It is light because people book in daylight on phones, often standing in an arrivals hall, and need high contrast more than mood.

## Colors

Concrete `paper` with a darker `paper-2` for alternate bands and parking bays, `surface` for anything you can touch (cards, inputs, the map). `ink` is asphalt and the sign panels. `sign` yellow is reserved for wayfinding: primary buttons, key tags, step numbers, the active map pin and the closing band; it never carries text on light grounds. `go` and `stop` are status only (open now, fits, errors).

## Typography

Encode Sans Expanded's wide, square letters read like garage signage: 800 for page titles and step numbers, 700 for headings and buttons, generous tracking only on short codes (ACRISS, station codes). Encode Sans handles running copy at 1.0625rem/1.6 with 60–68ch measures. Prices and tables use tabular numerals.

## Layout

A 84rem wrap with asymmetric 5/7 and 4/7 splits. Home alternates dense blocks (fleet row, planner, departure board) with quiet ones (ledger, quotes) and closes on a full yellow band. Detail pages lead with the car on a large painted bay.

## Components

- Car side elevations: parametric SVG per body type (hatch, sedan, wagon, SUV, van, convertible, pickup), scaled from real dimensions, wheel arches masked out, load space that fills yellow (or red when over).
- Bay: concrete tile with painted lines and a bay number, used for every car.
- Key tag: yellow tag with a punched hole; the booking confirmation is a full key tag.
- Departure board: dark list in the bag planner ranking every car by fit.
- Region map: coastline, contours, three roads with route shields, station sign pins; links, picker or route mode.
- Rental agreement: sticky summary with every price line, fee and tax.
- Ledger lists, wayfinding steps, dashed-edge deal tickets, disclosures with sign-panel toggles.

## Motion

A yellow wipe across the top of each page on arrival with a short lift of the content. In the bag planner the chosen car drives into its bay and the load space fills from the floor. Booking steps lift in; the confirmation key tag swings once on its hole. All of it collapses to instant under `prefers-reduced-motion`.

## Do's and Don'ts

- Do use yellow as a sign: panels, tags, numbers. Don't set yellow text on paper.
- Do draw cars as elevations from data. Don't use brand car photos as product shots.
- Do show the full price before the last step. Don't hide fees in the final total.
- Don't add eyebrow labels, gradient text or decorative blur; the signage carries the hierarchy.
