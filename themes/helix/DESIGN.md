---
name: Helix
colors:
  paper: "#f2f1ec"
  paper-2: "#e8e6de"
  field: "#fbfaf7"
  ink: "#14171f"
  ink-2: "#454954"
  rule: "#c9c5b9"
  gold: "#c28a3a"
  gold-deep: "#7a4c10"
  gold-pale: "#efe0c0"
  cobalt: "#2340c4"
  night: "#14171f"
  error: "#a3221b"
typography:
  display:
    {
      family: Sora,
      weight: 600,
      size: "clamp(2.3rem, 1.5rem + 3.4vw, 4.4rem)",
      tracking: "-0.035em",
    }
  body: { family: Sora, weight: 400, size: "1rem", lineHeight: 1.62 }
rounded: { sm: "4px", md: "6px", pill: "999px" }
spacing:
  {
    section: "clamp(4rem, 3rem + 4vw, 7rem)",
    gutter: "clamp(1.25rem, 4vw, 2.75rem)",
    max: "1280px",
  }
---

# Helix

## Overview

Helix is drawn from the inside of a dilution refrigerator and the pages of a physics journal: off-white paper, ink rules, gold-plated copper stages and the microwave lines that carry pulses down to the chip. Visitors are researchers and engineers comparing hardware at a desk in daylight, so the site is light, dense where data lives (spec tables, calibration maps, paper listings) and quiet between. Every illustration is an exact diagram (cryostat section, circuit wires, qubit lattices, plotted figures), never a mood picture.

## Colors

Paper `#f2f1ec` with a slightly darker panel `#e8e6de` for interactive instruments. Ink `#14171f` carries text and rules; `#454954` handles secondary text at AA. Gold `#c28a3a` is the plating: cryostat plates, qubits, bars, list markers. `#7a4c10` is the text-safe gold for metrics and roles. Cobalt `#2340c4` belongs to interaction only: focus rings, hover, selected couplers, microwave pulses, sampled shots. Night `#14171f` closes the page (closing band, footer, BibTeX).

## Typography

Sora alone, as assigned. Display 600 at −0.035em, h2/h3 600 at −0.025/−0.015em, body 400. Numerals are tabular in every table, spec list, histogram and timeline. A system monospace appears only in the BibTeX block, where it is actual code.

## Layout

1280px max width, fluid gutters. Pages open with a large h1 and lead, then alternate dense ruled sections (tables, lists with 1.5px ink top rules like a journal contents page) with full-bleed panel bands that hold the two instruments (composer, calibration map). Figures are captioned "Fig. n." in the journal manner.

## Components

- Cryostat section drawing (hero): six plated stages with temperature leaders, attenuators, heat exchanger and four coax lines.
- Circuit composer: gate palette as a radio group, three wires × six steps of buttons, exact state-vector simulation, ket readout, probability histogram, 1,024-shot sampling.
- Lattice explorer: every qubit and coupler of a system, coloured by T1, readout or frequency; mouse or arrow keys; parked qubits drawn dashed.
- Spec tables, spec lists, access tags (filled dot = cloud, square = on-premises, ring = preview).
- Paper rows and paper page with an SVG plot drawn from content data and a copyable BibTeX block.
- Segmented filters, sort selects, search, `<details>` disclosures, validated forms with inline errors and an `aria-live` confirmation.

## Motion

One language: signals travelling. Pulses run down the cryostat's coax lines, the status dot breathes, histogram bars ease to new probabilities, gates settle into place, and each route arrives with a short lift-and-unblur. The in-progress roadmap node pulses. Under `prefers-reduced-motion` all animation stops and the pulses are hidden.

## Do's and Don'ts

- Do publish numbers with units and label illustrative values as illustrative.
- Do keep cobalt for interaction and gold for hardware.
- Do caption photographs and figures like a paper.
- Don't add eyebrow labels, gradient text, glass, or icon-card grids.
- Don't use biology, sci-fi glow or particle backgrounds; the world is cryogenic hardware.
- Don't use monospace for decoration.
