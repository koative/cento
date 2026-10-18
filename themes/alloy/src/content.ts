import heroCranes from "./assets/hero-cranes.jpg";
import siteBriefing from "./assets/site-briefing.jpg";
import streetWorks from "./assets/street-works.jpg";
import excavator from "./assets/excavator.jpg";
import groundworks from "./assets/groundworks.jpg";
import quaysideFrame from "./assets/quayside-frame.jpg";
import northgateTower from "./assets/northgate-tower.jpg";
import kestrelShed from "./assets/kestrel-shed.jpg";
import stationCanopy from "./assets/station-canopy.jpg";
import foundryBridge from "./assets/foundry-bridge.jpg";
import harrowLane from "./assets/harrow-lane.jpg";
import ashworthLibrary from "./assets/ashworth-library.jpg";
import millbrookFootbridge from "./assets/millbrook-footbridge.jpg";
import columnPour from "./assets/column-pour.jpg";
import rebarDeck from "./assets/rebar-deck.jpg";
import frameNetting from "./assets/frame-netting.jpg";
import towerCrane from "./assets/tower-crane.jpg";
import brickwork from "./assets/brickwork.jpg";
import craneTowers from "./assets/crane-towers.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Alloy",
  legal: "Alloy Construction Co.",
  sector: "Construction company",
  tagline: "Frames, civils and the difficult sites in between.",
  founded: 1987,
  phone: "+1 555 018 4400",
  safetyLine: "+1 555 018 4499",
  email: "hello@alloy.example",
  tenders: "tenders@alloy.example",
  careers: "careers@alloy.example",
  address: ["418 Foundry Street", "Port Calloway, CV 20714"],
  hours: "Office Mon–Fri 7:00 am – 5:30 pm · Safety line 24/7",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/safety", label: "Safety" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
];

export type Img = { src: string; alt: string; w: number; h: number };
const img = (src: string, w: number, h: number, alt: string): Img => ({
  src,
  w,
  h,
  alt,
});

export const images = {
  hero: img(
    heroCranes,
    1800,
    1200,
    "Four tower cranes over a concrete frame rising behind site hoarding under a clear blue sky",
  ),
  briefing: img(
    siteBriefing,
    1400,
    1073,
    "Two crew members in hard hats, one in a harness, point out the next lift beside a truck-mounted platform",
  ),
  streetWorks: img(
    streetWorks,
    1400,
    933,
    "A worker in a hi-vis vest and helmet sets yellow barriers around an excavation in a narrow street",
  ),
  excavator: img(
    excavator,
    1050,
    1400,
    "A yellow excavator resting its bucket on cleared ground inside site fencing",
  ),
  groundworks: img(
    groundworks,
    1400,
    788,
    "A backhoe loader cutting a level formation across a cleared site",
  ),
  columnPour: img(
    columnPour,
    1400,
    787,
    "Starter bars projecting from freshly cast columns at sunset",
  ),
  towerCrane: img(
    towerCrane,
    1400,
    933,
    "A yellow tower crane jib against a cloudy blue sky",
  ),
  craneTowers: img(
    craneTowers,
    1400,
    1053,
    "Two residential towers topping out behind trees, a tower crane beside them",
  ),
};

/* ------------------------------------------------------------ home */

export const home = {
  title: "Frames, civils and the difficult sites in between.",
  intro:
    "Alloy is a general contractor for the Calloway Valley. We build concrete frames, bridges, schools, clinics and warehouses worth $8M to $140M, with our own superintendents, our own concrete crews and a programme we publish to the client every Friday.",
  services: {
    title: "Six things we do every day",
    intro:
      "No specialist we have to hire in for the core of the job. Each service below is run by people on our payroll.",
  },
  sequence: {
    title: "Watch a programme build",
    intro:
      "Every Alloy client gets the live programme, not a monthly PDF. Drag through Quayside Residences week by week: the frame climbs, the crane comes down, the crews change over.",
  },
  projects: {
    title: "Recent work",
    intro:
      "Housing, offices, bridges and public buildings, handed over complete.",
  },
  safety: {
    title: "Nobody gets hurt. It sits in the programme, not on a poster.",
    body: "Every task gets a written method before it starts, every crew lead can stop the job, and every near miss is reviewed by a director within 48 hours. Our recordable incident rate has fallen four years running.",
    figure: "0.62",
    figureLabel: "Total recordable incident rate, 2025 (per 200,000 hours)",
  },
  process: {
    title: "How a project starts",
    steps: [
      {
        name: "Early call",
        text: "Bring drawings at any stage. A pre-construction lead calls back within two working days with questions, not a price.",
      },
      {
        name: "Pre-construction agreement",
        text: "A fixed fee buys buildability reviews, a cost plan, a logistics plan and a programme you can take to your board.",
      },
      {
        name: "Tender or GMP",
        text: "Open-book trade packages, three bids minimum on each, and a guaranteed maximum price or lump sum you sign off line by line.",
      },
      {
        name: "Delivery",
        text: "One superintendent from groundbreaking to handover, a Friday programme update, and a punch list closed before you move in.",
      },
    ],
  },
  testimonial: {
    text: "Every night shutdown so far has finished before 5 am, as planned. Our clinicians have stopped noticing there is a building site next door, which is the highest praise a hospital can give.",
    name: "Renée Castillo",
    role: "Facilities Director, Redwater Valley Health System",
  },
  careers: {
    title: "Build a career, not just a résumé",
    body: "Paid apprenticeships, union and open-shop crews, and a path from carpenter to superintendent that a third of our site leaders have already walked.",
  },
  close: {
    title: "Got a tender landing soon?",
    body: "Send the invitation, the drawings or just a site address. We answer every invitation within two working days, including the ones we decline.",
  },
};

/* ------------------------------------------------------------ services */

export type Service = {
  id: string;
  name: string;
  short: string;
  value: string;
  body: string;
  includes: string[];
  projects: string[];
  image?: Img;
};

export const services: Service[] = [
  {
    id: "general-contracting",
    name: "General contracting",
    short:
      "Lump-sum and design-build delivery with one accountable superintendent.",
    value: "$8M – $140M",
    body: "We take the whole building: subcontract procurement, logistics, safety, quality and the programme. On design-build jobs we carry the design team too, with architects and engineers we have worked beside for a decade.",
    includes: [
      "Lump-sum and design-build contracts",
      "Subcontract procurement and management",
      "Site logistics and traffic plans",
      "Quality inspections and test records",
      "Closeout manuals and as-built drawings",
    ],
    projects: ["northgate-tower", "ashworth-library"],
    image: images.craneTowers,
  },
  {
    id: "construction-management",
    name: "Construction management at-risk",
    short:
      "Open-book pricing from the first sketch to a guaranteed maximum price.",
    value: "$20M – $140M",
    body: "We join during design, price as it develops and commit to a guaranteed maximum price once the drawings are ready. Savings stay with the owner; every trade bid is open to you.",
    includes: [
      "Pre-construction services agreement",
      "Monthly cost plans against design",
      "Three-bid minimum on every trade package",
      "GMP with transparent contingency",
      "Shared savings clauses",
    ],
    projects: ["quayside-residences", "redwater-health-pavilion"],
  },
  {
    id: "concrete-frames",
    name: "Concrete frames",
    short:
      "Self-performed post-tensioned and flat-slab frames up to 30 storeys.",
    value: "Self-performed",
    body: "Our own formwork, rebar and placing crews run a four-day floor cycle on typical residential slabs. Keeping the frame in-house is how we hold the critical path.",
    includes: [
      "Post-tensioned and reinforced flat slabs",
      "Jump-form and slip-form cores",
      "Transfer structures and podiums",
      "Concrete testing and maturity monitoring",
      "Tower crane and hoist operation",
    ],
    projects: ["quayside-residences", "northgate-tower"],
    image: images.columnPour,
  },
  {
    id: "civils",
    name: "Civils and bridges",
    short:
      "Bridges, rail and road structures built while the city keeps moving.",
    value: "$5M – $60M",
    body: "Steel and concrete bridges, station structures and retaining walls, usually beside live traffic or rail. We plan possessions and closures with the authority months ahead and publish them to neighbours.",
    includes: [
      "New-build and rehabilitation bridges",
      "Station canopies and platforms",
      "Retaining walls and culverts",
      "Traffic management and rail possessions",
      "Utility diversions",
    ],
    projects: [
      "foundry-street-bridge",
      "millbrook-footbridge",
      "riverside-station",
    ],
    image: images.streetWorks,
  },
  {
    id: "groundworks",
    name: "Groundworks and site preparation",
    short: "Earthworks, piling, drainage and slabs before anything goes up.",
    value: "Self-performed",
    body: "Our plant fleet and operators prepare sites for our own buildings and for other contractors. Cut-and-fill is modelled by drone survey before a machine moves.",
    includes: [
      "Bulk earthworks and remediation",
      "CFA and driven piling (managed)",
      "Below-ground drainage",
      "Ground-bearing and suspended slabs",
      "Drone survey and volume reports",
    ],
    projects: ["kestrel-park-logistics", "redwater-health-pavilion"],
    image: images.groundworks,
  },
  {
    id: "refurbishment",
    name: "Refurbishment and retrofit",
    short: "Occupied buildings re-clad, re-serviced and brought up to code.",
    value: "$3M – $40M",
    body: "Façade replacement, seismic upgrades and full mechanical retrofits, often with tenants still inside. Phasing plans are agreed with the occupier floor by floor.",
    includes: [
      "Façade and roof replacement",
      "Seismic and structural upgrades",
      "Mechanical and electrical retrofit",
      "Occupied-building phasing",
      "Energy performance reporting",
    ],
    projects: ["foundry-street-bridge", "harrow-lane-homes"],
  },
];

export const routes = {
  title: "Choosing a delivery route",
  intro:
    "We work under all four. The right one depends on how settled your design is and how much price risk you want to hold.",
  rows: [
    {
      name: "Lump sum",
      when: "Design complete, scope settled",
      risk: "Contractor holds price risk",
      role: "We price the full drawings and deliver to them",
    },
    {
      name: "Design-build",
      when: "Clear brief, open design",
      risk: "Contractor holds design and price risk",
      role: "We lead the design team and build",
    },
    {
      name: "CM at-risk",
      when: "Design still developing",
      risk: "Shared until GMP is signed",
      role: "We advise during design, then commit to a GMP",
    },
    {
      name: "Two-stage negotiated",
      when: "Programme is urgent",
      risk: "Shared, open-book",
      role: "We start enabling works while stage two is priced",
    },
  ],
};

/* ------------------------------------------------------------ projects */

export type Sector =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Infrastructure"
  | "Civic & Health";
export const sectors: Sector[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Infrastructure",
  "Civic & Health",
];

/** What a phase does to the elevation drawing. */
export type Role =
  "enable" | "sub" | "frame" | "envelope" | "fitout" | "handover";
export type Phase = {
  role: Role;
  name: string;
  start: number;
  end: number;
  crew: number;
  trades: string[];
};

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  status: "On site" | "Completed";
  location: string;
  client: string;
  architect: string;
  route: string;
  value: number;
  size: string;
  /** Building elevation or bridge in the build-sequence drawing; a truss bridge is drawn as existing steel being repaired. */
  kind: "building" | "span";
  truss?: boolean;
  /** Storeys for a building, spans for a bridge. */
  storeys: number;
  start: string;
  /** Programme week the project has reached (on-site jobs only). */
  week?: number;
  year: number;
  image: Img;
  gallery: (Img & { caption: string })[];
  summary: string;
  story: string[];
  scope: string[];
  quantities: [string, string][];
  quote?: { text: string; name: string; role: string };
  phases: Phase[];
};

const ph = (
  role: Role,
  name: string,
  start: number,
  end: number,
  crew: number,
  trades: string[],
): Phase => ({
  role,
  name,
  start,
  end,
  crew,
  trades,
});

export const projects: Project[] = [
  {
    slug: "quayside-residences",
    name: "Quayside Residences",
    sector: "Residential",
    status: "On site",
    location: "Harbor District, Port Calloway",
    client: "Calloway Harbor Partners",
    architect: "Ostrander Pell Architects",
    route: "CM at-risk, GMP",
    value: 86_400_000,
    size: "212 apartments · 18 storeys",
    kind: "building",
    storeys: 18,
    start: "2025-03-03",
    week: 84,
    year: 2027,
    image: img(
      quaysideFrame,
      1400,
      1400,
      "An eighteen-storey concrete frame with a red tower crane at its side, seen from the site entrance",
    ),
    gallery: [
      {
        ...img(
          rebarDeck,
          1400,
          788,
          "Starter bars rising from a finished upper slab, the city beyond",
        ),
        caption: "Level 17 slab, week 81: two pours left before the roof.",
      },
      {
        ...img(
          columnPour,
          1400,
          787,
          "Freshly cast columns with starter bars ready for the next lift",
        ),
        caption: "Level 16 columns, poured on the four-day cycle.",
      },
    ],
    summary:
      "An eighteen-storey post-tensioned tower on reclaimed harbor land, with 212 apartments over a public ground floor.",
    story: [
      "The site sits on twelve metres of reclaimed fill. We joined at schematic design, re-sequenced the piling around a live sea wall and moved the tower core four metres inland, which took nine weeks off the substructure.",
      "The frame is self-performed on a four-day floor cycle. Unitised façade panels are lifted from a barge berth on the quay, keeping deliveries off Harbor Road during the morning peak.",
    ],
    scope: [
      "412 CFA piles to 28 m",
      "Post-tensioned flat slabs",
      "Unitised curtain wall façade",
      "Two-level podium parking",
      "Public quayside landscape",
    ],
    quantities: [
      ["Concrete", "21,600 yd³"],
      ["Reinforcement", "1,840 tons"],
      ["Peak workforce", "236"],
      ["Floor cycle", "4 days"],
    ],
    quote: {
      text: "They told us in week six that the piling programme was wrong, showed us why, and fixed it before it cost us a day.",
      name: "Dana Whitcombe",
      role: "Development Director, Calloway Harbor Partners",
    },
    phases: [
      ph("enable", "Enabling works and sea-wall survey", 0, 8, 22, [
        "Demolition",
        "Utilities",
        "Survey",
      ]),
      ph("sub", "Piling and substructure", 6, 28, 54, [
        "Piling",
        "Concrete",
        "Waterproofing",
      ]),
      ph("frame", "Post-tensioned frame", 24, 86, 118, [
        "Formwork",
        "Rebar",
        "Concrete",
        "Tower crane",
      ]),
      ph("envelope", "Unitised façade and roof", 62, 100, 58, [
        "Curtain wall",
        "Roofing",
        "Glazing",
      ]),
      ph("fitout", "MEP and apartment fit-out", 70, 114, 146, [
        "Mechanical",
        "Electrical",
        "Plumbing",
        "Drywall",
        "Joinery",
      ]),
      ph("handover", "Commissioning, landscape and handover", 110, 120, 38, [
        "Commissioning",
        "Landscape",
        "Cleaning",
      ]),
    ],
  },
  {
    slug: "redwater-health-pavilion",
    name: "Redwater Health Pavilion",
    sector: "Civic & Health",
    status: "On site",
    location: "Redwater Medical Campus",
    client: "Redwater Valley Health System",
    architect: "Haskell + Mori",
    route: "CM at-risk, GMP",
    value: 64_200_000,
    size: "6 storeys · 148,000 sq ft",
    kind: "building",
    storeys: 6,
    start: "2026-01-19",
    week: 38,
    year: 2027,
    image: img(
      frameNetting,
      1050,
      1400,
      "A six-storey concrete frame wrapped in green safety netting behind a site wall",
    ),
    gallery: [
      {
        ...img(
          excavator,
          1050,
          1400,
          "A yellow excavator parked on the cleared formation",
        ),
        caption:
          "Bulk dig, week 6: 31,000 cubic yards out in eleven working days.",
      },
    ],
    summary:
      "An outpatient pavilion beside a hospital that never closes: imaging, day surgery and a 40-bay infusion suite.",
    story: [
      "The pavilion connects to a live emergency department on two levels. Every shutdown of medical gas, power or water is scheduled with the hospital's facilities team two weeks ahead and carried out between 1 am and 5 am.",
      "Imaging rooms need vibration limits tighter than most laboratories, so the frame uses thickened slabs and isolated bases beneath each scanner, poured with our own crews and tested before fit-out.",
    ],
    scope: [
      "Reinforced concrete frame",
      "Imaging-grade vibration slabs",
      "Two-level link bridge",
      "Medical gas and infection-control fit-out",
      "Rooftop air-handling plant",
    ],
    quantities: [
      ["Concrete", "9,800 yd³"],
      ["Planned night shutdowns", "34"],
      ["Peak workforce", "184"],
      ["Clinical areas", "96 rooms"],
    ],
    phases: [
      ph("enable", "Utility diversions and hoarding", 0, 6, 20, [
        "Utilities",
        "Traffic management",
      ]),
      ph("sub", "Bulk dig and foundations", 4, 18, 42, [
        "Earthworks",
        "Concrete",
        "Drainage",
      ]),
      ph("frame", "Concrete frame and link bridge", 14, 46, 86, [
        "Formwork",
        "Rebar",
        "Concrete",
        "Steel",
      ]),
      ph("envelope", "Precast cladding and roof", 38, 62, 44, [
        "Precast",
        "Roofing",
        "Glazing",
      ]),
      ph("fitout", "Clinical MEP and fit-out", 44, 90, 160, [
        "Mechanical",
        "Electrical",
        "Medical gas",
        "Drywall",
      ]),
      ph("handover", "Commissioning and clinical handover", 86, 96, 52, [
        "Commissioning",
        "Validation",
        "Cleaning",
      ]),
    ],
  },
  {
    slug: "foundry-street-bridge",
    name: "Foundry Street Bridge",
    sector: "Infrastructure",
    status: "On site",
    location: "Foundry Street over the Wyre River",
    client: "City of Port Calloway, Public Works",
    architect: "Teague Structural",
    route: "Lump sum",
    value: 21_700_000,
    size: "3 spans · 312 ft",
    kind: "span",
    truss: true,
    storeys: 3,
    start: "2025-12-29",
    week: 41,
    year: 2027,
    image: img(
      foundryBridge,
      1400,
      933,
      "Riveted steel truss members of a bridge meeting at a gusset plate against the sky",
    ),
    gallery: [
      {
        ...images.streetWorks,
        caption: "Night utility diversion on Foundry Street, week 3.",
      },
    ],
    summary:
      "A 1931 steel truss bridge rehabilitated span by span, with one lane open to traffic throughout.",
    story: [
      "Every gusset plate was laser-scanned before work began. Of 640 rivets inspected, 188 are replaced with high-strength bolts; the rest stay, cleaned and coated.",
      "Spans are worked one at a time under a containment rig so no blast media reaches the river. Pedestrians keep a protected walkway the full length of the job.",
    ],
    scope: [
      "Steel repair and rivet replacement",
      "Lead paint removal under full containment",
      "New concrete deck and parapets",
      "Pier scour protection",
      "Single-lane traffic management",
    ],
    quantities: [
      ["Steel replaced", "86 tons"],
      ["Rivets to bolts", "188"],
      ["Lane closures", "0 full"],
      ["Peak workforce", "64"],
    ],
    phases: [
      ph("enable", "Traffic management and containment", 0, 6, 16, [
        "Traffic management",
        "Scaffold",
      ]),
      ph("sub", "Pier repairs and scour protection", 4, 22, 28, [
        "Marine",
        "Concrete",
        "Divers",
      ]),
      ph("frame", "Truss steel repairs, span by span", 14, 48, 40, [
        "Steel",
        "Blasting",
        "Coatings",
      ]),
      ph("envelope", "Deck, parapets and surfacing", 40, 58, 34, [
        "Concrete",
        "Surfacing",
        "Steel",
      ]),
      ph("handover", "Lighting, testing and reopening", 56, 64, 14, [
        "Electrical",
        "Load testing",
      ]),
    ],
  },
  {
    slug: "northgate-tower",
    name: "Northgate Tower",
    sector: "Commercial",
    status: "Completed",
    location: "Northgate, Port Calloway",
    client: "Northgate Property Trust",
    architect: "Ostrander Pell Architects",
    route: "Design-build",
    value: 132_000_000,
    size: "24 storeys · 410,000 sq ft",
    kind: "building",
    storeys: 24,
    start: "2021-06-07",
    year: 2024,
    image: img(
      northgateTower,
      847,
      1400,
      "A dark glass office tower photographed from street level against grey cloud",
    ),
    gallery: [
      {
        ...images.towerCrane,
        caption: "The 60-ton tower crane, dismantled in week 118.",
      },
      {
        ...images.craneTowers,
        caption: "The frame topping out in the summer of 2023.",
      },
    ],
    summary:
      "Twenty-four floors of offices over a public atrium, delivered design-build with a twin jump-form core.",
    story: [
      "Two jump-form cores ran six floors ahead of the slabs, which let façade installation start while the frame was still at level 14.",
      "The client moved 1,900 staff in over a single weekend; every floor was inspected, snagged and cleaned a fortnight early.",
    ],
    scope: [
      "Twin jump-form concrete cores",
      "Composite steel floors",
      "Unitised curtain wall",
      "Public atrium and plaza",
      "LEED Gold certification support",
    ],
    quantities: [
      ["Steel", "6,400 tons"],
      ["Curtain wall", "21,800 panels"],
      ["Peak workforce", "412"],
      ["Handover", "2 weeks early"],
    ],
    quote: {
      text: "Alloy's Friday programme was the most reliable document on the project. We stopped asking for monthly reports.",
      name: "Marcus Ilhenny",
      role: "Asset Manager, Northgate Property Trust",
    },
    phases: [
      ph("enable", "Demolition and basement shoring", 0, 12, 40, [
        "Demolition",
        "Shoring",
      ]),
      ph("sub", "Three-level basement", 10, 34, 96, [
        "Earthworks",
        "Concrete",
        "Waterproofing",
      ]),
      ph("frame", "Jump-form cores and steel frame", 30, 92, 180, [
        "Steel",
        "Formwork",
        "Concrete",
        "Tower crane",
      ]),
      ph("envelope", "Unitised curtain wall", 58, 112, 96, [
        "Curtain wall",
        "Roofing",
      ]),
      ph("fitout", "MEP and shell fit-out", 70, 128, 240, [
        "Mechanical",
        "Electrical",
        "Fire protection",
      ]),
      ph("handover", "Commissioning and atrium", 122, 136, 70, [
        "Commissioning",
        "Landscape",
      ]),
    ],
  },
  {
    slug: "kestrel-park-logistics",
    name: "Kestrel Park Logistics",
    sector: "Industrial",
    status: "Completed",
    location: "Kestrel Park, Easterly",
    client: "Wyre Valley Logistics",
    architect: "Brand & Ochoa",
    route: "Design-build",
    value: 38_500_000,
    size: "1 storey · 412,000 sq ft",
    kind: "building",
    storeys: 1,
    start: "2024-02-05",
    year: 2025,
    image: img(
      kestrelShed,
      1050,
      1400,
      "The empty interior of a newly finished warehouse, steel roof trusses over a power-floated slab",
    ),
    gallery: [
      {
        ...images.groundworks,
        caption: "Cut-and-fill across the 31-acre platform, week 5.",
      },
    ],
    summary:
      "A cross-dock distribution centre on a 31-acre greenfield site, from first cut to racking in 52 weeks.",
    story: [
      "Drone surveys balanced the cut-and-fill on site: no soil left by truck, and 4,100 truck movements avoided on the county road.",
      "The 412,000 sq ft slab was laser-screeded in 22 pours to a flatness tolerance fit for very-narrow-aisle racking.",
    ],
    scope: [
      "Bulk earthworks, balanced on site",
      "Tilt-up concrete wall panels",
      "Long-span steel roof",
      "Superflat warehouse slab",
      "64 dock levellers and yard",
    ],
    quantities: [
      ["Earth moved", "286,000 yd³"],
      ["Slab pours", "22"],
      ["Tilt-up panels", "214"],
      ["Dock doors", "64"],
    ],
    phases: [
      ph("enable", "Site clearance and haul roads", 0, 4, 18, ["Earthworks"]),
      ph("sub", "Earthworks, drainage and foundations", 2, 18, 46, [
        "Earthworks",
        "Drainage",
        "Concrete",
      ]),
      ph("frame", "Tilt-up panels and steel roof", 14, 32, 64, [
        "Tilt-up",
        "Steel",
        "Crane",
      ]),
      ph("envelope", "Roofing and dock doors", 26, 40, 38, [
        "Roofing",
        "Doors",
      ]),
      ph("fitout", "Slab, MEP and offices", 30, 48, 72, [
        "Concrete",
        "Electrical",
        "Fire protection",
      ]),
      ph("handover", "Yard, commissioning and handover", 46, 52, 30, [
        "Paving",
        "Commissioning",
      ]),
    ],
  },
  {
    slug: "riverside-station",
    name: "Riverside Station",
    sector: "Infrastructure",
    status: "Completed",
    location: "Riverside, Port Calloway",
    client: "Calloway Regional Transit",
    architect: "Haskell + Mori",
    route: "Two-stage negotiated",
    value: 58_000_000,
    size: "2 levels · 640 ft platforms",
    kind: "building",
    storeys: 2,
    start: "2021-09-13",
    year: 2023,
    image: img(
      stationCanopy,
      1400,
      781,
      "The curved steel roof of an elevated rail station, skylights running along the ridge",
    ),
    gallery: [],
    summary:
      "A new elevated interchange built over a running line, with 212 overnight possessions and no missed reopening.",
    story: [
      "Every lift over the tracks happened in a possession between 12:40 am and 4:50 am. Steel was trial-erected in our yard first, so each night's lift was a repeat of one already done.",
      "The curved roof is 48 steel ribs on a 13-metre grid, with skylights along the ridge that cut the station's daytime lighting load by two thirds.",
    ],
    scope: [
      "Elevated concourse and platforms",
      "48-rib curved steel roof",
      "Overnight rail possessions",
      "Vertical circulation: 6 elevators, 4 escalators",
      "Bus interchange and plaza",
    ],
    quantities: [
      ["Possessions", "212"],
      ["Roof steel", "1,120 tons"],
      ["Overrun nights", "0"],
      ["Daily passengers", "18,000"],
    ],
    phases: [
      ph("enable", "Utility diversions and rail protection", 0, 10, 30, [
        "Utilities",
        "Rail safety",
      ]),
      ph("sub", "Piers and concourse foundations", 8, 30, 56, [
        "Piling",
        "Concrete",
      ]),
      ph("frame", "Concourse frame and roof ribs", 24, 62, 88, [
        "Steel",
        "Concrete",
        "Crane",
      ]),
      ph("envelope", "Roof sheeting and glazing", 48, 76, 42, [
        "Roofing",
        "Glazing",
      ]),
      ph("fitout", "Systems, elevators and finishes", 56, 96, 110, [
        "Electrical",
        "Elevators",
        "Signalling",
      ]),
      ph("handover", "Testing and opening", 92, 100, 40, ["Commissioning"]),
    ],
  },
  {
    slug: "ashworth-library",
    name: "Ashworth Library",
    sector: "Civic & Health",
    status: "Completed",
    location: "Ashworth Square, Redwater",
    client: "Redwater County Libraries",
    architect: "Linden Sato Studio",
    route: "Lump sum",
    value: 34_100_000,
    size: "3 storeys · 62,000 sq ft",
    kind: "building",
    storeys: 3,
    start: "2021-04-12",
    year: 2023,
    image: img(
      ashworthLibrary,
      1400,
      1050,
      "A library façade of orange brick beside vertical timber louvres over tall glass",
    ),
    gallery: [],
    summary:
      "A county library and learning centre in brick and timber, built on a square that kept its Saturday market open.",
    story: [
      "Linden Sato's façade alternates hand-laid brick with timber louvres. We built a full-size mock-up bay in week 4 and kept it on site as the quality benchmark for every panel that followed.",
      "Deliveries were scheduled around the Saturday market for 74 weeks; the square never lost a stall.",
    ],
    scope: [
      "Steel frame on pad foundations",
      "Hand-laid brick and timber louvre façade",
      "Mass-timber reading room roof",
      "Geothermal heating",
      "Public square paving",
    ],
    quantities: [
      ["Bricks laid", "214,000"],
      ["Timber louvres", "1,480"],
      ["Market days kept", "74 of 74"],
      ["Energy use", "−58% vs code"],
    ],
    quote: {
      text: "The mock-up bay sat in the square for a year. Every brick on the building matches it.",
      name: "Priya Anand",
      role: "Capital Projects Lead, Redwater County Libraries",
    },
    phases: [
      ph("enable", "Market-friendly hoarding and diversions", 0, 4, 12, [
        "Hoarding",
        "Utilities",
      ]),
      ph("sub", "Foundations and geothermal field", 2, 16, 30, [
        "Concrete",
        "Drilling",
      ]),
      ph("frame", "Steel frame and timber roof", 12, 32, 44, [
        "Steel",
        "Mass timber",
      ]),
      ph("envelope", "Brick and louvre façade", 24, 56, 52, [
        "Masonry",
        "Joinery",
        "Glazing",
      ]),
      ph("fitout", "MEP and library fit-out", 34, 70, 78, [
        "Mechanical",
        "Electrical",
        "Joinery",
      ]),
      ph("handover", "Square, commissioning and opening", 68, 76, 28, [
        "Paving",
        "Commissioning",
      ]),
    ],
  },
  {
    slug: "millbrook-footbridge",
    name: "Millbrook Footbridge",
    sector: "Infrastructure",
    status: "Completed",
    location: "Millbrook Park, Easterly",
    client: "Easterly Parks Department",
    architect: "Teague Structural",
    route: "Design-build",
    value: 9_400_000,
    size: "2 spans · 186 ft",
    kind: "span",
    storeys: 2,
    start: "2021-08-02",
    year: 2022,
    image: img(
      millbrookFootbridge,
      1050,
      1400,
      "A concrete footbridge with galvanised rails crossing a lawn toward woodland",
    ),
    gallery: [],
    summary:
      "A two-span concrete footbridge and accessible ramps linking Millbrook Park to the riverside trail.",
    story: [
      "The ramps hold a 1:20 gradient end to end, so no landings or handrail breaks are needed: wheelchairs, strollers and bikes share one continuous route.",
      "The deck was cast in place over two weekends with the trail rerouted, and opened four weeks ahead of the parks department's summer programme.",
    ],
    scope: [
      "Cast-in-place concrete deck",
      "1:20 accessible ramps",
      "Galvanised steel rails",
      "Bank stabilisation",
      "Path lighting",
    ],
    quantities: [
      ["Ramp gradient", "1:20"],
      ["Deck pours", "2"],
      ["Trees retained", "41 of 43"],
      ["Opened", "4 weeks early"],
    ],
    phases: [
      ph("enable", "Trail diversion and tree protection", 0, 3, 8, [
        "Arborist",
        "Fencing",
      ]),
      ph("sub", "Abutments and central pier", 2, 14, 18, [
        "Piling",
        "Concrete",
      ]),
      ph("frame", "Falsework and deck pours", 12, 26, 24, [
        "Formwork",
        "Concrete",
      ]),
      ph("envelope", "Rails, ramps and surfacing", 22, 34, 16, [
        "Steel",
        "Surfacing",
      ]),
      ph("handover", "Lighting, planting and opening", 32, 36, 10, [
        "Electrical",
        "Landscape",
      ]),
    ],
  },
  {
    slug: "harrow-lane-homes",
    name: "Harrow Lane Homes",
    sector: "Residential",
    status: "Completed",
    location: "Harrow Lane, Easterly",
    client: "Easterly Community Housing",
    architect: "Linden Sato Studio",
    route: "Lump sum",
    value: 41_300_000,
    size: "96 homes · 4 storeys",
    kind: "building",
    storeys: 4,
    start: "2022-10-03",
    year: 2024,
    image: img(
      harrowLane,
      1050,
      1400,
      "Stepped four-storey brick housing with deep window reveals under a deep blue sky",
    ),
    gallery: [
      {
        ...img(
          brickwork,
          1050,
          1400,
          "Close detail of red brick bedded in grey mortar",
        ),
        caption: "Sample panel 3: the bond and mortar the residents chose.",
      },
    ],
    summary:
      "Ninety-six affordable homes in stepped brick terraces, built to Passive House levels of airtightness.",
    story: [
      "Residents of the estate being replaced chose the brick, the mortar colour and the front-door finishes from three sample panels built on site.",
      "Every home was air-tested twice: once at first fix, once at handover. The average result, 0.48 air changes per hour, beat the target by a third.",
    ],
    scope: [
      "Load-bearing masonry and timber floors",
      "Passive House airtightness",
      "Air-source heat pumps",
      "Shared courtyard gardens",
      "Phased decant of existing residents",
    ],
    quantities: [
      ["Homes", "96"],
      ["Airtightness", "0.48 ACH"],
      ["Bricks laid", "388,000"],
      ["Residents rehoused", "71 households"],
    ],
    phases: [
      ph("enable", "Decant support and demolition", 0, 8, 20, [
        "Demolition",
        "Utilities",
      ]),
      ph("sub", "Foundations and drainage", 6, 18, 34, [
        "Concrete",
        "Drainage",
      ]),
      ph("frame", "Masonry and timber floors", 14, 46, 72, [
        "Masonry",
        "Carpentry",
      ]),
      ph("envelope", "Roofs, windows and airtightness", 34, 60, 46, [
        "Roofing",
        "Windows",
      ]),
      ph("fitout", "Heat pumps, kitchens and finishes", 42, 76, 90, [
        "Mechanical",
        "Electrical",
        "Joinery",
      ]),
      ph("handover", "Gardens, testing and keys", 72, 82, 24, [
        "Landscape",
        "Testing",
      ]),
    ],
  },
];

export const projectsPage = {
  title: "Projects",
  intro:
    "Nine jobs from the last five years, three of them on site right now. Filter by sector or status; every project page carries its full programme.",
};

/* ------------------------------------------------------------ safety */

export const safety = {
  title: "Everyone goes home the way they came in.",
  intro:
    "Safety at Alloy is a programme activity with a start date, a crew and a check, the same as concrete. It is planned, priced and inspected, and any worker on site can stop it.",
  record: {
    title: "Our record",
    note: "Illustrative demo figures. Rates per 200,000 hours worked.",
    rows: [
      {
        year: 2021,
        hours: "1,912,000",
        recordable: 14,
        trir: "1.46",
        lostTime: 4,
        emr: "0.88",
      },
      {
        year: 2022,
        hours: "2,104,000",
        recordable: 12,
        trir: "1.14",
        lostTime: 3,
        emr: "0.82",
      },
      {
        year: 2023,
        hours: "2,386,000",
        recordable: 11,
        trir: "0.92",
        lostTime: 2,
        emr: "0.77",
      },
      {
        year: 2024,
        hours: "2,520,000",
        recordable: 9,
        trir: "0.71",
        lostTime: 1,
        emr: "0.74",
      },
      {
        year: 2025,
        hours: "2,594,000",
        recordable: 8,
        trir: "0.62",
        lostTime: 1,
        emr: "0.71",
      },
    ],
  },
  stopWork: {
    title: "Anyone can stop the job",
    body: "A first-week apprentice has the same authority as a superintendent to stop work they think is unsafe. Nobody is asked to justify a stop on the spot; the review comes afterwards, and the person who called it is thanked by name at the next all-hands briefing.",
  },
  rules: {
    title: "Eight rules that are never bent",
    items: [
      {
        name: "Permits before high-risk work",
        text: "Hot work, confined spaces, excavations over 4 ft and live electrical work need a signed permit on the board.",
      },
      {
        name: "Tie off above six feet",
        text: "Full harness, inspected lanyard and an engineered anchor. No exceptions for a quick job.",
      },
      {
        name: "Nobody under a suspended load",
        text: "Lift zones are barricaded and a signaller owns the radio for every pick.",
      },
      {
        name: "Lock out, tag out, try",
        text: "Isolate, lock with your own lock, then prove it dead before touching it.",
      },
      {
        name: "Excavations are shored or sloped",
        text: "A competent person inspects every trench at the start of each shift.",
      },
      {
        name: "Plant has a spotter",
        text: "Reversing machines and pedestrians are separated; where they cannot be, a spotter is assigned.",
      },
      {
        name: "Fit for work",
        text: "Zero tolerance for alcohol or drugs on site; fatigue is reported, not hidden.",
      },
      {
        name: "Report every near miss",
        text: "Within the shift, without blame. Near misses are the cheapest lessons we get.",
      },
    ],
  },
  programs: {
    title: "What sits behind the numbers",
    items: [
      {
        name: "Daily pre-task plans",
        text: "Every crew writes its own hazards and controls before starting, and a foreman signs it off.",
      },
      {
        name: "Supervisor training",
        text: "OSHA 30 for every foreman and superintendent, refreshed every three years, plus our own two-day crane and rigging course.",
      },
      {
        name: "Subcontractor prequalification",
        text: "Trades are scored on their safety record, written programme and training before they can bid.",
      },
      {
        name: "Mental health on site",
        text: "Trained mental-health first aiders on every project and a confidential support line for crews and families.",
      },
      {
        name: "Director site walks",
        text: "A director walks every active site monthly with the crew leads, not just the superintendent.",
      },
    ],
  },
  faq: [
    {
      q: "I'm visiting a site. What do I need?",
      a: "Hard hat, safety glasses, hi-vis vest and safety-toe boots, plus a 20-minute site induction on arrival. We lend PPE to visitors; book your visit through the superintendent.",
    },
    {
      q: "How do subcontractors get prequalified?",
      a: "Send your EMR for the last three years, your written safety programme and your OSHA logs to the safety team. Most reviews are finished in ten working days.",
    },
    {
      q: "What happens after a near-miss report?",
      a: "The superintendent reviews it the same day and a director within 48 hours. The lesson is shared across every site in the next weekly toolbox talk, without names.",
    },
    {
      q: "Can a neighbour raise a concern?",
      a: "Yes. Call the 24-hour safety line about anything from a blocked footpath to a loose sheet on the hoarding. A supervisor will call you back within the hour.",
    },
  ],
};

/* ------------------------------------------------------------ careers */

export type Discipline =
  | "Site management"
  | "Engineering"
  | "Preconstruction"
  | "Trades"
  | "Safety"
  | "Early careers";
export const disciplines: Discipline[] = [
  "Site management",
  "Engineering",
  "Preconstruction",
  "Trades",
  "Safety",
  "Early careers",
];
export const offices = ["Port Calloway", "Redwater", "Easterly"] as const;

export type Job = {
  id: string;
  title: string;
  discipline: Discipline;
  location: (typeof offices)[number];
  type: string;
  pay: string;
  closes: string;
  project?: string;
  summary: string;
  duties: string[];
  needs: string[];
};

export const jobs: Job[] = [
  {
    id: "senior-project-manager",
    title: "Senior Project Manager",
    discipline: "Site management",
    location: "Port Calloway",
    type: "Full-time",
    pay: "$148,000 – $172,000",
    closes: "2026-11-20",
    summary:
      "Lead a $60M–$100M building project from GMP to closeout, with a team of eight and a direct line to the client's board.",
    duties: [
      "Own the contract, the cost report and the programme",
      "Run the Friday programme review with the client",
      "Lead buy-out of trade packages with preconstruction",
      "Coach two assistant project managers",
    ],
    needs: [
      "10+ years with a general contractor, 3+ as PM",
      "Delivered a CM at-risk project over $50M",
      "Confident with cost-loaded schedules",
      "Bachelor's in construction management or engineering, or equivalent experience",
    ],
  },
  {
    id: "site-superintendent",
    title: "Site Superintendent",
    discipline: "Site management",
    location: "Redwater",
    type: "Full-time",
    pay: "$124,000 – $140,000",
    closes: "2026-11-08",
    project: "redwater-health-pavilion",
    summary:
      "Run the Redwater Health Pavilion site through fit-out and clinical handover beside a live hospital.",
    duties: [
      "Daily coordination of up to 180 workers",
      "Plan and lead overnight utility shutdowns",
      "Own the three-week look-ahead and daily reports",
      "Chair the weekly safety walk",
    ],
    needs: [
      "8+ years supervising commercial or healthcare work",
      "OSHA 30 and first aid",
      "Infection-control risk assessment experience",
      "Calm on the radio at 3 am",
    ],
  },
  {
    id: "field-engineer",
    title: "Field Engineer",
    discipline: "Engineering",
    location: "Port Calloway",
    type: "Full-time",
    pay: "$78,000 – $92,000",
    closes: "2026-11-30",
    project: "quayside-residences",
    summary:
      "Keep the drawings, RFIs and set-out right on Quayside Residences as the façade and fit-out ramp up.",
    duties: [
      "Manage RFIs and submittals with the design team",
      "Check set-out and pour readiness with the frame crew",
      "Track quantities against the cost report",
      "Run the BIM coordination model on site",
    ],
    needs: [
      "Degree in civil engineering or construction management",
      "1–3 years on site",
      "Comfortable with Revit or Navisworks",
      "Valid driver's licence",
    ],
  },
  {
    id: "estimator",
    title: "Estimator, Preconstruction",
    discipline: "Preconstruction",
    location: "Port Calloway",
    type: "Full-time",
    pay: "$96,000 – $118,000",
    closes: "2026-12-04",
    summary:
      "Price buildings while they are still sketches, and stand behind those numbers when they become GMPs.",
    duties: [
      "Build conceptual estimates from early design",
      "Take off quantities and level trade bids",
      "Present cost plans to clients and architects",
      "Feed site lessons back into our cost database",
    ],
    needs: [
      "4+ years estimating for a GC or cost consultant",
      "Experience with digital take-off software",
      "Clear, unhurried writing",
      "Construction degree or trade background",
    ],
  },
  {
    id: "carpenter-foreman",
    title: "Carpenter Foreman, Concrete Formwork",
    discipline: "Trades",
    location: "Easterly",
    type: "Full-time, union",
    pay: "$48.20 / hour + benefits",
    closes: "2026-11-15",
    summary:
      "Lead a crew of twelve on our self-performed formwork, holding the four-day floor cycle on residential frames.",
    duties: [
      "Run the deck and column formwork crews",
      "Plan crane lifts with the signaller each morning",
      "Check formwork before every pour",
      "Train apprentices on the crew",
    ],
    needs: [
      "Journeyman carpenter card",
      "5+ years of concrete formwork",
      "OSHA 30 or willingness to complete in 90 days",
      "Experience with table forms or jump-form",
    ],
  },
  {
    id: "safety-coordinator",
    title: "Safety Coordinator",
    discipline: "Safety",
    location: "Redwater",
    type: "Full-time",
    pay: "$82,000 – $96,000",
    closes: "2026-11-25",
    summary:
      "Support two live sites with inspections, inductions and near-miss reviews, reporting to the Director of Safety.",
    duties: [
      "Run inductions and toolbox talks",
      "Inspect scaffolds, excavations and lift plans",
      "Investigate incidents and near misses",
      "Coach foremen on pre-task planning",
    ],
    needs: [
      "CHST or equivalent, or working toward it",
      "2+ years in construction safety",
      "OSHA 500 trainer status preferred",
      "Spanish is a plus",
    ],
  },
  {
    id: "apprenticeship-2027",
    title: "Construction Apprenticeship 2027",
    discipline: "Early careers",
    location: "Port Calloway",
    type: "Paid apprenticeship, 3 years",
    pay: "$22.50 / hour, rising each year",
    closes: "2027-01-31",
    summary:
      "Three paid years on our sites and one day a week at Calloway Technical College, ending with a journeyman card or a site management certificate.",
    duties: [
      "Rotate through formwork, concrete, groundworks and site management",
      "Day release to college every Wednesday",
      "A named mentor for all three years",
      "Present your own project to directors at the end of each year",
    ],
    needs: [
      "18 or over by September 2027",
      "High school diploma or GED",
      "Driver's licence by end of year one",
      "No experience needed, just turn up on time",
    ],
  },
];

export const careers = {
  title: "Build the valley you live in",
  intro:
    "Four hundred and twenty people work for Alloy directly: carpenters, operators, engineers, estimators and superintendents. Most of our site leaders started on the tools, and we pay for the training that gets them there.",
  benefits: [
    {
      name: "Health from day one",
      text: "Medical, dental and vision for you and your family, no waiting period.",
    },
    {
      name: "Paid training",
      text: "OSHA, crane, first aid and college courses paid in full, on company time.",
    },
    {
      name: "Retirement match",
      text: "401(k) matched dollar for dollar up to 6%.",
    },
    {
      name: "Home by dinner",
      text: "Five-day weeks are the default. Saturday work is planned, voluntary and paid at time and a half.",
    },
  ],
  apprenticeship: {
    title: "Apprenticeships",
    body: "Twenty-four places a year, paid from the first day. Apply by 31 January for a September start.",
  },
  steps: [
    {
      name: "Apply",
      text: "A short form and your CV. No cover letter essay required.",
    },
    {
      name: "Call",
      text: "Twenty minutes with the hiring manager, within a week.",
    },
    {
      name: "Site visit",
      text: "Walk a live project with the people you would work with.",
    },
    {
      name: "Offer",
      text: "In writing, with pay and start date, within five working days.",
    },
  ],
  equal:
    "Alloy is an equal opportunity employer. We hire on skill and attitude, and we make adjustments for any part of the process on request.",
};

/* ------------------------------------------------------------ about */

export const about = {
  title: "Thirty-nine years of building in one valley",
  intro:
    "Alloy started in 1987 as a three-man concrete crew with one truck. We are now the Calloway Valley's largest independent contractor, still owned by the people who run it, and we still pour our own concrete.",
  story: [
    "Ruth and Tomas Varga founded the company to pour slabs for other people's buildings. The first general contract, a fire station in Easterly, came in 1994; the first tower crane in 2001.",
    "We have stayed regional on purpose. Every site is within ninety minutes of one of our three offices, which means a director can be on any job the same morning, and our crews sleep at home.",
  ],
  timeline: [
    {
      year: 1987,
      text: "Ruth and Tomas Varga start Alloy Concrete with three people and a pump truck.",
    },
    {
      year: 1994,
      text: "First general contract: Easterly Fire Station No. 3.",
    },
    {
      year: 2001,
      text: "First tower crane and first building over ten storeys.",
    },
    {
      year: 2009,
      text: "Civils division opens with the Wyre River flood walls.",
    },
    { year: 2016, text: "Employee ownership trust buys the founders' shares." },
    {
      year: 2023,
      text: "Riverside Station opens on time after 212 overnight possessions.",
    },
    {
      year: 2026,
      text: "420 direct staff, $410M turnover, three sites over $50M running at once.",
    },
  ],
  leaders: [
    {
      name: "Elena Varga",
      role: "Chief Executive",
      bio: "Joined as a laborer in 1998; ran the Northgate Tower project before taking over from her parents in 2019.",
    },
    {
      name: "Kwame Osei",
      role: "Director of Operations",
      bio: "Thirty years on site, twelve as a superintendent. Walks every active site once a month.",
    },
    {
      name: "Hannah Brecht",
      role: "Director of Preconstruction",
      bio: "Former quantity surveyor who built Alloy's open-book cost database.",
    },
    {
      name: "Luis Arroyo",
      role: "Director of Safety",
      bio: "Certified safety professional; previously led safety for a 3,000-person rail program.",
    },
    {
      name: "Grace Whitfield",
      role: "Director of Civils",
      bio: "Structural engineer behind the Foundry Street and Millbrook bridge teams.",
    },
    {
      name: "Sam Okafor",
      role: "Finance Director",
      bio: "Keeps our bonding capacity at $400M per project and pays subcontractors in 30 days.",
    },
  ],
  values: [
    {
      name: "Self-perform the critical path",
      text: "Concrete, formwork and groundworks stay in-house, because those are the trades that decide whether a programme holds.",
    },
    {
      name: "Open book by default",
      text: "Clients see every trade bid and every cost. It is quicker than arguing about them later.",
    },
    {
      name: "Pay on time",
      text: "Subcontractors are paid in 30 days. Good trades come back to contractors who pay.",
    },
  ],
  offices: [
    {
      name: "Port Calloway (HQ)",
      address: "418 Foundry Street, Port Calloway, CV 20714",
      phone: "+1 555 018 4400",
    },
    {
      name: "Redwater",
      address: "22 Mill Race Road, Redwater, CV 20961",
      phone: "+1 555 018 4520",
    },
    {
      name: "Easterly",
      address: "7 Depot Yard, Easterly, CV 21088",
      phone: "+1 555 018 4630",
    },
  ],
  credentials: [
    "Bonding capacity $400M single / $900M aggregate",
    "ISO 45001 and ISO 9001 certified management systems",
    "Employee-owned since 2016",
    "Member, Calloway Valley Builders Exchange",
  ],
};

/* ------------------------------------------------------------ tender */

export const tender = {
  title: "Tenders and quotes",
  intro:
    "Invite us to bid on a live tender, or ask for a budget estimate on something still being drawn. Either way, a pre-construction lead replies within two working days.",
  contacts: [
    {
      label: "Tender desk",
      value: "tenders@alloy.example",
      href: "mailto:tenders@alloy.example",
    },
    {
      label: "Pre-construction",
      value: "+1 555 018 4410",
      href: "tel:+15550184410",
    },
  ],
  /** Indicative 2026 Calloway Valley rates, $ per gross sq ft, before site specifics. */
  rates: [
    {
      id: "residential",
      label: "Mid-rise residential",
      low: 285,
      high: 360,
      weeksPer10k: 2.6,
    },
    {
      id: "tower",
      label: "High-rise residential or office",
      low: 390,
      high: 520,
      weeksPer10k: 2.2,
    },
    {
      id: "healthcare",
      label: "Healthcare or laboratory",
      low: 610,
      high: 820,
      weeksPer10k: 4.1,
    },
    {
      id: "education",
      label: "School, library or civic",
      low: 360,
      high: 470,
      weeksPer10k: 3.4,
    },
    {
      id: "industrial",
      label: "Warehouse or industrial",
      low: 118,
      high: 165,
      weeksPer10k: 0.7,
    },
    {
      id: "refurb",
      label: "Refurbishment or retrofit",
      low: 160,
      high: 310,
      weeksPer10k: 2.4,
    },
  ],
  procurement: [
    "Lump sum",
    "Design-build",
    "CM at-risk",
    "Two-stage negotiated",
    "Not decided yet",
  ],
  valueBands: [
    "Under $8M",
    "$8M – $25M",
    "$25M – $60M",
    "$60M – $140M",
    "Over $140M",
  ],
  after: [
    "A pre-construction lead reads your documents and calls within two working days.",
    "If we bid, you get a named estimator and a site visit date.",
    "If we decline, you get the reason in writing, so you can plan around it.",
  ],
};

export const footer = {
  bulletin: {
    title: "Project bulletin",
    text: "Four emails a year: what we finished, what is starting, and which tenders we are taking on.",
  },
};
