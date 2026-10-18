/* All copy and demo data for Grid. Rebranding the template means editing this file. */
import roofHouse from "./assets/roof-house.jpg";
import crewTile from "./assets/crew-tile-roof.jpg";
import crewSloped from "./assets/crew-sloped-roof.jpg";
import installerKneeling from "./assets/installer-kneeling.jpg";
import installerRails from "./assets/installer-rails.jpg";
import installerCarry from "./assets/installer-carry.jpg";
import terraceRoofs from "./assets/terrace-roofs.jpg";
import cells from "./assets/cells.jpg";
import farmhouse from "./assets/farmhouse.jpg";
import livingRoom from "./assets/house.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Grid",
  sector: "Home solar & energy",
  tagline: "Your roof, wired to run your home.",
  email: "hello@grid.example",
  surveys: "surveys@grid.example",
  phone: "+1 555 0129 400",
  address: [
    "Grid Home Energy",
    "2210 Foundry Lane, Unit 4",
    "Sutter Bend, CA 95390",
  ],
  hours: [
    ["Mon–Fri", "8:00–18:00"],
    ["Saturday", "9:00–13:00"],
    ["Sunday", "Closed · monitoring alerts 24/7"],
  ] as [string, string][],
  licence: "Licensed electrical contractor no. EC-48213",
  gallery: "https://cento.koative.com/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/planner", label: "Solar planner" },
  { to: "/products", label: "Products" },
  { to: "/financing", label: "Financing" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/about", label: "About" },
];

export const cta: NavItem = { to: "/quote", label: "Get a quote" };

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Plan",
    links: [
      { to: "/planner", label: "Solar planner" },
      { to: "/financing", label: "Financing calculator" },
      { to: "/quote", label: "Request a quote" },
    ],
  },
  {
    title: "Install",
    links: [
      { to: "/products", label: "Products" },
      { to: "/how-it-works", label: "How it works" },
      { to: "/case-studies", label: "Case studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Grid" },
      { to: "/", label: "Home" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export const images = {
  roofHouse: {
    src: roofHouse,
    alt: "A grey two-storey house with two rows of black solar panels across its south roof under a blue sky",
    w: 1600,
    h: 1067,
  },
  crewTile: {
    src: crewTile,
    alt: "Three installers fitting black panels on a terracotta tile roof behind scaffolding",
    w: 1600,
    h: 1098,
  },
  crewSloped: {
    src: crewSloped,
    alt: "Two installers setting out mounting rails on a steep roof above a leafy street",
    w: 1600,
    h: 1200,
  },
  installerKneeling: {
    src: installerKneeling,
    alt: "An installer in a harness kneels on a metal roof beside a freshly fixed row of panels",
    w: 1600,
    h: 1067,
  },
  installerRails: {
    src: installerRails,
    alt: "An installer clamps a panel onto its rail on a green standing-seam roof",
    w: 1600,
    h: 1067,
  },
  installerCarry: {
    src: installerCarry,
    alt: "An installer walks a panel up the roof, clipped to a safety line",
    w: 1600,
    h: 1067,
  },
  terraceRoofs: {
    src: terraceRoofs,
    alt: "A row of brick terraced houses, several with solar panels set into their red tile roofs",
    w: 1600,
    h: 1067,
  },
  cells: {
    src: cells,
    alt: "Close-up of photovoltaic cells and the silver busbars between them",
    w: 1600,
    h: 1075,
  },
  farmhouse: {
    src: farmhouse,
    alt: "A long timber farmhouse with its whole roof covered in panels, wheat field in front",
    w: 1600,
    h: 1067,
  },
  livingRoom: {
    src: livingRoom,
    alt: "A bright open-plan living room with timber wall, grey sofa and sliding doors to the garden",
    w: 1600,
    h: 1088,
  },
} satisfies Record<string, Img>;

/* ---------- Energy model (illustrative assumptions used by the planner and calculator) ---------- */

export type Orientation = {
  id: string;
  label: string;
  factor: number;
  peak: number;
  spread: number;
};

export const model = {
  importRate: 0.31, // $ per kWh bought from the utility
  exportRate: 0.08, // $ per kWh credited for export
  yieldPerKwp: 1480, // kWh per kWp per year on a south-facing roof in the valley
  panelWatts: 430,
  pricePerWatt: 2.55, // installed, panels + inverter + labour + permits
  batteryKwh: 13.5,
  batteryKw: 5,
  batteryPrice: 9800,
  evKwhPerYear: 3200,
  evChargerPrice: 1450,
  priceRise: 0.035, // assumed yearly utility price increase
  orientations: [
    { id: "south", label: "South", factor: 1, peak: 13, spread: 6.5 },
    {
      id: "southwest",
      label: "South-west",
      factor: 0.96,
      peak: 14.5,
      spread: 6.5,
    },
    {
      id: "eastwest",
      label: "East + west",
      factor: 0.86,
      peak: 13,
      spread: 7.5,
    },
    { id: "west", label: "West", factor: 0.81, peak: 15.5, spread: 6 },
  ] as Orientation[],
  // Relative household demand per hour, 00:00 → 23:00: low overnight, a breakfast bump, a long evening peak.
  usageShape: [
    0.5, 0.42, 0.4, 0.4, 0.42, 0.55, 0.9, 1.3, 1.2, 0.85, 0.75, 0.75, 0.8, 0.75,
    0.72, 0.8, 1.0, 1.4, 1.85, 1.95, 1.75, 1.45, 1.05, 0.7,
  ],
  // Grid Charge in solar-follow mode: tops up the car from midday surplus, finishes overnight.
  evShape: [
    0.6, 0.6, 0.5, 0.3, 0, 0, 0, 0, 0, 0, 0.3, 0.8, 1, 1, 0.9, 0.5, 0, 0, 0, 0,
    0, 0, 0.2, 0.5,
  ],
};

export const planner = {
  title: "Solar planner",
  intro:
    "Lay panels on a typical valley roof, tell us your bill, then drag the sun across the day to see where every kilowatt goes. It is the same arithmetic our designers start from, in rough.",
  roof: {
    cols: 8,
    rows: 3,
    // [row, col] cells that hold something panels cannot cover.
    blocked: [
      { cell: [0, 6], label: "Chimney" },
      { cell: [1, 1], label: "Skylight" },
      { cell: [1, 2], label: "Skylight" },
      { cell: [2, 7], label: "Vent stack" },
    ] as { cell: [number, number]; label: string }[],
  },
  defaults: {
    panels: [2, 3, 4, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    orientation: "south",
    bill: 220,
    batteries: 1,
    ev: false,
  },
  disclaimer:
    "Illustrative only: a single average day scaled to a year, at the rates shown. Your quote uses a measured roof, twelve months of your own bills and shading from a site visit.",
};

/* ---------- Products ---------- */

export type Art =
  | "panel"
  | "panel-compact"
  | "battery"
  | "battery-stack"
  | "inverter"
  | "micro"
  | "charger"
  | "gateway";
export type Category =
  "Panels" | "Batteries" | "Inverters" | "EV charging" | "Monitoring";

export type Product = {
  id: string;
  name: string;
  category: Category;
  art: Art;
  price: number;
  unit: string;
  summary: string;
  description: string[];
  highlights: string[];
  specs: [string, string][];
  dims: { w: string; h: string };
  warranty: string;
  pairsWith: string[];
  featured: number;
};

export const categories: Category[] = [
  "Panels",
  "Batteries",
  "Inverters",
  "EV charging",
  "Monitoring",
];

export const products: Product[] = [
  {
    id: "grid-line-430",
    name: "Grid Line 430",
    category: "Panels",
    art: "panel",
    price: 1096,
    unit: "per panel, installed",
    summary:
      "All-black 430 W panel for most pitched roofs. Our default, and the one in the planner.",
    description: [
      "Line 430 is a 108 half-cell monocrystalline panel in a black frame with a black backsheet, so the array reads as one dark plane rather than a grid of silver lines.",
      "Half-cut cells keep producing when a chimney shadow crosses part of the panel: the unshaded half carries on while the shaded half drops out, instead of the whole string sagging.",
    ],
    highlights: [
      "22.0% module efficiency",
      "Low-glare black glass",
      "Keeps 89.4% output after 25 years",
    ],
    specs: [
      ["Peak power", "430 W"],
      ["Module efficiency", "22.0%"],
      ["Cells", "108 half-cut, N-type"],
      ["Dimensions", "1722 × 1134 × 30 mm"],
      ["Weight", "21.5 kg"],
      ["Temperature coefficient", "−0.30 %/°C"],
      ["Wind / snow load", "2400 / 5400 Pa"],
    ],
    dims: { w: "1134 mm", h: "1722 mm" },
    warranty: "25-year product and performance warranty",
    pairsWith: ["grid-micro-400", "grid-hybrid-76", "grid-gateway"],
    featured: 1,
  },
  {
    id: "grid-line-405-compact",
    name: "Grid Line 405 Compact",
    category: "Panels",
    art: "panel-compact",
    price: 1058,
    unit: "per panel, installed",
    summary:
      "A shorter panel for hip roofs, dormers and terraces where every row counts.",
    description: [
      "Compact trades a little peak power for a footprint 130 mm shorter than Line 430, which is often the difference between three rows and four on a small hip roof.",
      "Same black frame and glass as Line 430, so the two can sit side by side on mixed roof faces without the array looking patched.",
    ],
    highlights: [
      "Fits an extra row on small roofs",
      "Matches Line 430 visually",
      "21.6% module efficiency",
    ],
    specs: [
      ["Peak power", "405 W"],
      ["Module efficiency", "21.6%"],
      ["Cells", "108 half-cut, N-type"],
      ["Dimensions", "1592 × 1134 × 30 mm"],
      ["Weight", "19.8 kg"],
      ["Temperature coefficient", "−0.30 %/°C"],
      ["Wind / snow load", "2400 / 5400 Pa"],
    ],
    dims: { w: "1134 mm", h: "1592 mm" },
    warranty: "25-year product and performance warranty",
    pairsWith: ["grid-micro-400", "grid-line-430", "grid-gateway"],
    featured: 5,
  },
  {
    id: "grid-store-13",
    name: "Grid Store 13",
    category: "Batteries",
    art: "battery",
    price: 9800,
    unit: "installed, with backup switch",
    summary:
      "13.5 kWh wall battery. Moves afternoon sun into your evening and keeps the lights on in an outage.",
    description: [
      "Store 13 charges from whatever your panels make beyond what the house is using, then covers the 5 pm to midnight stretch when most homes buy the most expensive power.",
      "With the Grid Gateway fitted, it islands the house within 200 ms of a utility outage. Fridge, lights, Wi-Fi and the well pump carry on; you choose which circuits stay live.",
    ],
    highlights: [
      "13.5 kWh usable",
      "5 kW continuous, 7 kW peak",
      "Indoor or sheltered outdoor wall",
    ],
    specs: [
      ["Usable capacity", "13.5 kWh"],
      ["Continuous power", "5 kW"],
      ["Peak power (10 s)", "7 kW"],
      ["Chemistry", "Lithium iron phosphate (LFP)"],
      ["Round-trip efficiency", "90%"],
      ["Dimensions", "1150 × 755 × 155 mm"],
      ["Weight", "114 kg"],
      ["Operating range", "−10 °C to 50 °C"],
    ],
    dims: { w: "755 mm", h: "1150 mm" },
    warranty: "10-year warranty, 70% capacity guaranteed",
    pairsWith: ["grid-hybrid-76", "grid-gateway", "grid-line-430"],
    featured: 2,
  },
  {
    id: "grid-store-5",
    name: "Grid Store 5 Modular",
    category: "Batteries",
    art: "battery-stack",
    price: 4600,
    unit: "per 5 kWh module, installed",
    summary:
      "Stackable 5 kWh modules. Start with one, add up to four as the house or the car grows.",
    description: [
      "Each module clicks onto the one below with no extra wiring visible. The base unit holds the battery management and connects to a Hybrid inverter.",
      "A sensible choice if you are adding panels now and expect an electric car or heat pump within a few years.",
    ],
    highlights: [
      "5 kWh per module, up to 20 kWh",
      "Add modules any time",
      "Floor-standing, no wall fixings",
    ],
    specs: [
      ["Usable capacity", "5 kWh per module"],
      ["Maximum stack", "4 modules / 20 kWh"],
      ["Continuous power", "3.3 kW per module"],
      ["Chemistry", "Lithium iron phosphate (LFP)"],
      ["Round-trip efficiency", "91%"],
      ["Module size", "650 × 300 × 180 mm"],
      ["Module weight", "48 kg"],
    ],
    dims: { w: "650 mm", h: "1210 mm (2 modules)" },
    warranty: "10-year warranty per module",
    pairsWith: ["grid-hybrid-76", "grid-gateway"],
    featured: 6,
  },
  {
    id: "grid-hybrid-76",
    name: "Grid Hybrid 7.6",
    category: "Inverters",
    art: "inverter",
    price: 2950,
    unit: "installed",
    summary:
      "One box that runs panels, battery and backup. Fitted with every Store battery.",
    description: [
      "Hybrid 7.6 converts DC from the roof to AC for the house and routes surplus to the battery or the grid, deciding second by second.",
      "Two independent MPPT inputs mean an east roof and a west roof can each be tracked at their own best point, not dragged to an average.",
    ],
    highlights: [
      "7.6 kW AC output",
      "Two MPPT inputs",
      "Battery-ready from day one",
    ],
    specs: [
      ["Rated AC output", "7.6 kW"],
      ["Max PV input", "11.4 kW"],
      ["MPPT inputs", "2"],
      ["CEC efficiency", "97.5%"],
      ["Backup switchover", "< 200 ms with Gateway"],
      ["Dimensions", "540 × 420 × 180 mm"],
      ["Enclosure", "NEMA 3R, outdoor rated"],
    ],
    dims: { w: "420 mm", h: "540 mm" },
    warranty: "12-year warranty",
    pairsWith: ["grid-store-13", "grid-store-5", "grid-line-430"],
    featured: 4,
  },
  {
    id: "grid-micro-400",
    name: "Grid Micro 400",
    category: "Inverters",
    art: "micro",
    price: 245,
    unit: "per panel, installed",
    summary:
      "A microinverter behind each panel. Best for roofs with chimneys, dormers or trees.",
    description: [
      "Micro 400 bolts to the rail under each panel and converts its power on the spot, so one shaded panel never pulls down the rest of the row.",
      "Each panel reports separately in the Grid app, which makes a cracked cell or a bird's nest obvious within a day.",
    ],
    highlights: [
      "Panel-level tracking",
      "No single point of failure",
      "Per-panel data in the app",
    ],
    specs: [
      ["Peak output", "400 VA"],
      ["Compatible panels", "350–480 W"],
      ["CEC efficiency", "97.0%"],
      ["Dimensions", "212 × 175 × 30 mm"],
      ["Weight", "1.1 kg"],
      ["Enclosure", "IP67"],
    ],
    dims: { w: "175 mm", h: "212 mm" },
    warranty: "25-year warranty",
    pairsWith: ["grid-line-430", "grid-line-405-compact", "grid-gateway"],
    featured: 7,
  },
  {
    id: "grid-charge-48",
    name: "Grid Charge 48",
    category: "EV charging",
    art: "charger",
    price: 1450,
    unit: "installed, up to 10 m cable run",
    summary:
      "48 A home charger with solar-follow mode: the car drinks the sunshine your house does not need.",
    description: [
      "In solar-follow mode, Charge 48 watches the Gateway and speeds up or slows down so the car only takes what the roof is exporting. Top-up to a set time if you need a full battery by morning.",
      "Adds around 70 km of range per hour at full rate. A 7.3 m cable reaches either side of most driveways.",
    ],
    highlights: [
      "11.5 kW at 48 A",
      "Solar-follow and scheduled modes",
      "7.3 m tethered cable",
    ],
    specs: [
      ["Max output", "11.5 kW (48 A, 240 V)"],
      ["Connector", "J1772, NACS adapter included"],
      ["Cable", "7.3 m tethered"],
      ["Modes", "Solar-follow, scheduled, boost"],
      ["Dimensions", "380 × 260 × 120 mm"],
      ["Enclosure", "NEMA 4, indoor or outdoor"],
    ],
    dims: { w: "260 mm", h: "380 mm" },
    warranty: "5-year warranty",
    pairsWith: ["grid-gateway", "grid-store-13", "grid-line-430"],
    featured: 3,
  },
  {
    id: "grid-gateway",
    name: "Grid Gateway",
    category: "Monitoring",
    art: "gateway",
    price: 890,
    unit: "installed beside your meter",
    summary:
      "The meter-side brain: live monitoring, outage backup and the data behind the Grid app.",
    description: [
      "Gateway measures what the house uses, what the roof makes and what crosses the meter, every second. That is what lets the battery and the charger make sensible decisions.",
      "When the utility drops, Gateway disconnects the house from the street and lets the battery take over, safely, so no power is fed back onto lines a lineworker may be repairing.",
    ],
    highlights: [
      "Whole-home monitoring",
      "Automatic outage transfer",
      "Wi-Fi, Ethernet and LTE backup",
    ],
    specs: [
      ["Measurement", "Solar, home, battery and grid, 1 s"],
      ["Backup transfer", "Automatic, < 200 ms"],
      ["Connectivity", "Wi-Fi, Ethernet, LTE fallback"],
      ["Rated current", "200 A"],
      ["Dimensions", "460 × 340 × 110 mm"],
      ["Enclosure", "NEMA 3R"],
    ],
    dims: { w: "340 mm", h: "460 mm" },
    warranty: "10-year warranty",
    pairsWith: ["grid-store-13", "grid-charge-48", "grid-hybrid-76"],
    featured: 8,
  },
];

export const productsPage = {
  title: "Products",
  intro:
    "Eight pieces of hardware cover nearly every home we work on. We fit what your roof and your evenings need, nothing on commission, and the same crews who install it come back to service it.",
  note: "Prices include fitting, wiring, permits and connection paperwork. Final figures come with your survey.",
};

/* ---------- Case studies ---------- */

export type CaseTag = "Battery" | "EV charger" | "Panels only";

export type CaseStudy = {
  slug: string;
  title: string;
  household: string;
  place: string;
  home: string;
  image: Img;
  tags: CaseTag[];
  system: {
    panels: number;
    kwp: number;
    batteryKwh: number;
    productIds: string[];
  };
  installed: string;
  installDays: number;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  quote: string;
  quoteBy: string;
  billsBefore: number[];
  billsAfter: number[];
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "harlow-avenue",
    title:
      "A two-storey on Harlow Avenue that runs on its own roof until 10 pm",
    household: "Mara and Tomasz Wierzbicki",
    place: "Larkspur Heights",
    home: "Two-storey, 1998",
    image: images.roofHouse,
    tags: ["Battery"],
    system: {
      panels: 22,
      kwp: 9.5,
      batteryKwh: 13.5,
      productIds: [
        "grid-line-430",
        "grid-hybrid-76",
        "grid-store-13",
        "grid-gateway",
      ],
    },
    installed: "April 2026",
    installDays: 2,
    summary:
      "Two rows on the south roof and one Store 13 cover the family's evenings well into the night.",
    challenge:
      "Both parents work from home and the summer air conditioning ran from noon to bedtime. Their bill peaked at $412 in August, almost all of it bought after 4 pm at the top rate.",
    solution:
      "We kept every panel on the south face, worked around the two chimneys with a 2 × 11 layout, and paired it with a single Store 13 programmed to hold its charge for the 4–9 pm peak window.",
    outcome:
      "In the first full summer the battery emptied after 10 pm on only nine nights. August's bill came to $38, most of it the fixed connection charge.",
    quote:
      "We stopped checking the thermostat before we turned it down. The app just shows the battery going down slowly while the kids watch TV.",
    quoteBy: "Mara Wierzbicki",
    billsBefore: [214, 188, 172, 168, 236, 318, 398, 412, 344, 226, 182, 208],
    billsAfter: [96, 68, 34, 22, 18, 24, 31, 38, 26, 28, 62, 92],
  },
  {
    slug: "copper-ridge-farm",
    title: "A working farmhouse that now sells more power than it buys",
    household: "The Achterberg family",
    place: "Copper Ridge",
    home: "Timber farmhouse, 1952",
    image: images.farmhouse,
    tags: ["Battery", "EV charger"],
    system: {
      panels: 34,
      kwp: 14.6,
      batteryKwh: 27,
      productIds: [
        "grid-line-430",
        "grid-hybrid-76",
        "grid-store-13",
        "grid-charge-48",
        "grid-gateway",
      ],
    },
    installed: "September 2025",
    installDays: 3,
    summary:
      "The full length of a long, low roof, two batteries and a charger for the farm pickup.",
    challenge:
      "A well pump, a cold store for produce and an electric pickup, all on a line at the end of a rural feeder that dropped out several times each winter.",
    solution:
      "Thirty-four Line 430s run the length of the roof on a reinforced rail, with two Store 13s behind the Gateway so the pump and the cold store stay live through outages. Charge 48 follows the sun for the pickup.",
    outcome:
      "Across twelve months the farm exported 4,900 kWh more than it imported. The batteries carried them through six outages, the longest just under eleven hours.",
    quote:
      "The power went out in January and the first we knew was a notification. The cold store never warmed up.",
    quoteBy: "Ruth Achterberg",
    billsBefore: [388, 352, 318, 296, 342, 410, 486, 502, 428, 340, 334, 372],
    billsAfter: [64, 42, 18, 12, 12, 12, 14, 16, 12, 12, 30, 58],
  },
  {
    slug: "old-mill-terrace",
    title: "Four terraced neighbours who went solar on the same week",
    household: "Nos. 14–20 Mill Row",
    place: "Old Mill District",
    home: "Brick terraces, 1911",
    image: images.terraceRoofs,
    tags: ["Panels only"],
    system: {
      panels: 10,
      kwp: 4.1,
      batteryKwh: 0,
      productIds: ["grid-line-405-compact", "grid-micro-400", "grid-gateway"],
    },
    installed: "June 2025",
    installDays: 1,
    summary:
      "Compact panels and microinverters on narrow, dormered roofs, with one scaffold shared by four homes.",
    challenge:
      "Small, steep roofs with dormer windows and a historic-district review that wanted panels flush with the tiles and no visible conduit from the street.",
    solution:
      "Ten Compact panels per house, each on its own Micro 400 so the dormer shadows only cost the panels they touch. One scaffold went up for the whole row, which took $1,100 off every household's price.",
    outcome:
      "Each house covers 60–70% of its own use. The planning review passed first time with our drawings of the flush mounting and internal cable routes.",
    quote:
      "Sharing the scaffold was Jonah's idea. Splitting it four ways paid for my Gateway.",
    quoteBy: "Priya Natarajan, No. 16",
    billsBefore: [142, 128, 118, 112, 108, 124, 152, 158, 132, 116, 122, 138],
    billsAfter: [92, 74, 52, 38, 30, 34, 44, 46, 38, 48, 70, 88],
  },
  {
    slug: "westbrook-retrofit",
    title: "A mid-century ranch rewired for a heat pump and two cars",
    household: "Denise and Calvin Oduya",
    place: "Westbrook",
    home: "Single-storey ranch, 1964",
    image: images.crewSloped,
    tags: ["Battery", "EV charger"],
    system: {
      panels: 26,
      kwp: 11.2,
      batteryKwh: 15,
      productIds: [
        "grid-line-430",
        "grid-hybrid-76",
        "grid-store-5",
        "grid-charge-48",
        "grid-gateway",
      ],
    },
    installed: "February 2026",
    installDays: 3,
    summary:
      "A panel upgrade, a heat pump-ready electrical service and three Store 5 modules, all in one visit.",
    challenge:
      "The original 100 A service could not carry a heat pump, two EV chargers and solar together, and the couple wanted one contractor, one permit and one week of disruption.",
    solution:
      "We upgraded the service to 200 A, fitted 26 panels split across the east and west faces on a Hybrid 7.6 with two MPPT inputs, and started with three Store 5 modules so a fourth can follow the second car.",
    outcome:
      "Their bill now averages $41 a month with the heat pump running and both cars charging at home, down from $296 on gas and grid together.",
    quote:
      "One crew, one permit, one week. The electrician even labelled the breakers in plain English.",
    quoteBy: "Calvin Oduya",
    billsBefore: [338, 312, 280, 244, 236, 298, 356, 372, 318, 254, 268, 326],
    billsAfter: [88, 64, 36, 20, 16, 22, 30, 34, 24, 26, 52, 80],
  },
  {
    slug: "cedar-flats-cottage",
    title: "A tile-roof cottage where the panels had to sit perfectly",
    household: "Ines Calderón",
    place: "Cedar Flats",
    home: "Single-storey cottage, 1938",
    image: images.crewTile,
    tags: ["Panels only"],
    system: {
      panels: 12,
      kwp: 5.2,
      batteryKwh: 0,
      productIds: ["grid-line-430", "grid-micro-400"],
    },
    installed: "May 2026",
    installDays: 2,
    summary:
      "Clay tiles lifted, hooked and relaid by hand under twelve black panels.",
    challenge:
      "Original clay tiles that crack if you look at them wrong, and an owner who had already been told by two installers that the roof was not worth the risk.",
    solution:
      "Our roofer lifts each tile under a mount, fits a stainless tile hook to the rafter and grinds a notch in the tile so it sits back flat. Spare tiles were sourced from a salvage yard before we started.",
    outcome:
      "Two tiles broke in the whole job and both were replaced from the salvage stock. The array covers about 80% of Ines's annual use.",
    quote:
      "I watched them do it. They handled my roof like it was their grandmother's.",
    quoteBy: "Ines Calderón",
    billsBefore: [118, 104, 96, 88, 94, 122, 148, 154, 126, 98, 102, 114],
    billsAfter: [52, 34, 16, 12, 12, 14, 18, 20, 14, 16, 30, 48],
  },
  {
    slug: "sutter-bend-townhouse",
    title: "A townhouse that keeps its evenings cool on a small roof",
    household: "Owen Mbeki and Lea Fournier",
    place: "Sutter Bend",
    home: "Three-storey townhouse, 2009",
    image: images.livingRoom,
    tags: ["Battery"],
    system: {
      panels: 9,
      kwp: 3.9,
      batteryKwh: 10,
      productIds: [
        "grid-line-405-compact",
        "grid-hybrid-76",
        "grid-store-5",
        "grid-gateway",
      ],
    },
    installed: "July 2025",
    installDays: 1,
    summary:
      "Nine compact panels and two battery modules for a household out all day and home all evening.",
    challenge:
      "A small shared roof, an HOA that asked for the panels to stay below the parapet line, and a household that uses almost nothing until 6 pm.",
    solution:
      "Nine Compact panels in a single low row, with two Store 5 modules on the garage wall. Nearly everything the roof makes during the day is stored for the evening rather than exported at the low rate.",
    outcome:
      "Battery-shifted solar now covers the evening air conditioning on all but the hottest weeks. Their HOA has since asked us to quote the other eleven units.",
    quote:
      "We are never home when the sun is out, so we assumed solar was pointless. The battery fixed that.",
    quoteBy: "Lea Fournier",
    billsBefore: [124, 112, 98, 92, 108, 156, 198, 206, 164, 112, 104, 118],
    billsAfter: [70, 54, 32, 24, 26, 42, 58, 62, 44, 34, 48, 66],
  },
];

export const casesPage = {
  title: "Case studies",
  intro:
    "Six homes, six roofs, and twelve months of bills before and after. Every figure here comes from a homeowner's statements, with their permission and their names changed only where they asked.",
};

/* ---------- Financing ---------- */

export type PayOption = {
  id: "cash" | "loan" | "subscribe";
  label: string;
  short: string;
  detail: string;
};

export const financing = {
  title: "Financing",
  intro:
    "Pay outright, spread it with a fixed-rate loan, or subscribe and let us own the hardware. Put in your own numbers and compare what you would pay each month against the bill you have now.",
  loanApr: 5.99,
  loanTerms: [10, 15, 20, 25],
  subscribePerKwp: 16, // $ per kWp per month
  subscribeBattery: 49, // $ per battery per month
  options: [
    {
      id: "cash",
      label: "Pay outright",
      short: "Cash",
      detail:
        "Lowest lifetime cost. You own the system and every kilowatt-hour from day one.",
    },
    {
      id: "loan",
      label: "Grid Loan",
      short: "Loan",
      detail:
        "Fixed rate, no prepayment penalty. You own the system; most customers pay less each month than their old bill.",
    },
    {
      id: "subscribe",
      label: "Grid Subscribe",
      short: "Subscribe",
      detail:
        "Nothing up front. We own, insure and maintain the hardware; you pay a flat monthly fee for 20 years.",
    },
  ] as PayOption[],
  compare: [
    ["Up-front cost", "Full price", "From $0 down", "$0"],
    ["Who owns the system", "You", "You", "Grid"],
    [
      "Monthly payment",
      "None",
      "Fixed for the term",
      "Flat, 1.9% yearly increase",
    ],
    [
      "Maintenance & repairs",
      "Warranty, then you",
      "Warranty, then you",
      "Included, all 20 years",
    ],
    [
      "Adds value at resale",
      "Yes",
      "Yes, loan settles at sale",
      "Transfers to the buyer",
    ],
    [
      "Best for",
      "Savings over 25 years",
      "Owning without the lump sum",
      "No cash outlay, no upkeep",
    ],
  ] as [string, string, string, string][],
  disclaimer:
    "Illustrative figures. Grid Loan is a sample product at a representative 5.99% APR; your rate depends on a credit check by our lending partner. No application is made from this page.",
};

/* ---------- How it works ---------- */

export type Step = { title: string; time: string; we: string; you: string };

export const howItWorks = {
  title: "How it works",
  intro:
    "From the first call to the day the app shows your roof producing usually takes six to nine weeks. Most of that is paperwork we do; you need to be home for two visits.",
  steps: [
    {
      title: "Plan and quote",
      time: "Day 1",
      we: "Run your last twelve bills through our model and draw a first layout from satellite imagery.",
      you: "Send us a bill or two and tell us what you want to power.",
    },
    {
      title: "Site survey",
      time: "Week 1",
      we: "A designer measures the roof, checks rafters and the electrical panel, and logs shade by the hour.",
      you: "Be home for about 90 minutes and show us the loft and the meter.",
    },
    {
      title: "Final design",
      time: "Week 2",
      we: "Fix the layout, size the inverter and battery, and send a fixed price with a production estimate.",
      you: "Review, ask anything, sign when you are happy. No deposit until you do.",
    },
    {
      title: "Permits and utility",
      time: "Weeks 3–6",
      we: "File the building permit and the utility interconnection, and answer every question they send back.",
      you: "Nothing. We send a short update each Friday.",
    },
    {
      title: "Installation",
      time: "1–3 days",
      we: "Our own crew fits rails, panels, inverter and battery, then wires and labels everything.",
      you: "Leave a driveway space and access to the meter.",
    },
    {
      title: "Inspection and switch-on",
      time: "Weeks 7–9",
      we: "Walk the inspector through the job, then turn it on once the utility approves.",
      you: "Download the Grid app. Watch the first kilowatts arrive.",
    },
  ] as Step[],
  installDay: [
    ["7:30", "Crew arrives, safety lines and roof anchors go up"],
    ["9:00", "Rails fixed to rafters, every penetration flashed and sealed"],
    [
      "11:30",
      "Panels lifted and clamped, optimisers or micros wired underneath",
    ],
    ["14:00", "Inverter, battery and Gateway fitted beside the meter"],
    ["16:00", "Circuits labelled, system tested, roof and drive swept"],
    ["16:30", "Walk-through with you, the app set up on your phone"],
  ] as [string, string][],
  guarantees: [
    {
      title: "25-year workmanship warranty",
      body: "Every roof penetration, every connection. If a leak traces to our work, we fix the roof and the ceiling.",
    },
    {
      title: "Production guarantee",
      body: "If your system makes less than 90% of the estimate in a full year, we pay you the difference at your utility rate.",
    },
    {
      title: "One phone number",
      body: "The office that sold it, the crew that fitted it and the team that services it are all Grid employees.",
    },
  ],
  faqs: [
    {
      q: "Will panels damage my roof?",
      a: "Every mount is screwed into a rafter and sealed with flashing, not just sealant. We photograph each one before the panel covers it and keep the photos with your job file.",
    },
    {
      q: "What if my roof needs replacing soon?",
      a: "If it has less than ten years left, replace it first. We can coordinate with your roofer, or remove and refit panels later for a fixed $2,400 fee.",
    },
    {
      q: "What happens in a power cut?",
      a: "Without a battery, panels switch off for safety, as the utility requires. With a Store battery and Gateway, the house disconnects from the street and runs on battery and sun.",
    },
    {
      q: "Do panels work on cloudy days?",
      a: "Yes, at roughly 10–25% of their sunny output. The planner's yearly figures already include the valley's cloudy days.",
    },
    {
      q: "How do I clean them?",
      a: "Usually rain does it. If dust builds up in a dry summer, a soft brush and a hose from the ground is enough. Our Care plan includes one professional clean a year.",
    },
    {
      q: "Can I add a battery later?",
      a: "Yes. Every system we fit uses an inverter that accepts a battery, so adding Store later is a half-day job.",
    },
  ],
};

/* ---------- About ---------- */

export const about = {
  title: "About Grid",
  lead: "We are electricians who got tired of watching good roofs go to waste.",
  story: [
    "Grid started in 2014 as two electricians, a van and a ladder in Sutter Bend. Dana Ruiz had spent a decade wiring new homes; Theo Lindqvist had been fixing other companies' solar installs that leaked or underperformed. Most of the problems he saw came from subcontracted crews racing between jobs.",
    "So they made one rule that still holds: everyone who sets foot on your roof works for Grid. We have grown to 46 people and about 2,900 homes, and we still do not subcontract a single installation.",
    "We are a valley company. We install within 40 miles of Sutter Bend, because it means our service van can be at your door the same week, and because we know which neighbourhoods have 1950s wiring and which HOAs want panels below the ridge line.",
  ],
  principles: [
    {
      title: "Size it to the house, not the roof",
      body: "A bigger system is a bigger sale. We design to your bills and your plans, and we tell you when a smaller system pays back faster.",
    },
    {
      title: "Show the arithmetic",
      body: "Every quote comes with the assumptions behind it: rate, yield, shading, degradation. Our planner uses the same model in rough.",
    },
    {
      title: "Leave it tidier than we found it",
      body: "Labelled breakers, conduit painted to match the wall, and a photo record of every roof penetration in your job file.",
    },
  ],
  team: [
    {
      name: "Dana Ruiz",
      role: "Co-founder, head of design",
      bio: "Licensed electrician for 21 years. Signs off every system layout before it goes to permit.",
    },
    {
      name: "Theo Lindqvist",
      role: "Co-founder, installation",
      bio: "Ran crews for three installers before Grid. Still spends one day a week on a roof.",
    },
    {
      name: "Akosua Mensah",
      role: "Lead site surveyor",
      bio: "Has measured more than 1,800 roofs. Owns the shading model behind every quote.",
    },
    {
      name: "Raúl Esparza",
      role: "Crew lead, Westbrook team",
      bio: "Former roofer. The reason our tile-roof jobs come back with almost no broken tiles.",
    },
    {
      name: "Hannah Cole",
      role: "Permits and utility",
      bio: "Knows every county inspector by first name and every interconnection form by number.",
    },
    {
      name: "Yusuf Haddad",
      role: "Service and monitoring",
      bio: "Watches the alert queue, and calls you before you notice something is off.",
    },
  ],
  facts: [
    ["Founded", "2014, Sutter Bend"],
    ["People", "46, all employed directly"],
    ["Homes installed", "About 2,900"],
    ["Service area", "40 miles around Sutter Bend"],
    ["Licence", "Electrical contractor EC-48213"],
  ] as [string, string][],
};

/* ---------- Home ---------- */

export const home = {
  title: "Grid — Home solar & energy",
  heroTitle: "Your roof can run your home. We wire it up.",
  heroLead:
    "Solar panels, batteries and EV chargers designed, fitted and serviced by our own crews across the valley. See what your roof would make before anyone visits.",
  heroPoints: [
    "Own crews, no subcontractors",
    "25-year workmanship warranty",
    "From $0 down with Grid Subscribe",
  ],
  flowTitle: "Follow one day of sunshine through a Grid home",
  flowLead:
    "Sixteen panels, one Store 13 battery, a family that is out until five. Drag the sun from dawn to midnight and watch the power move.",
  installTitle: "What we put on your roof, and beside your meter",
  installLead:
    "A short catalogue on purpose. Every part is one we have fitted hundreds of times and know how to service.",
  billTitle: "What changes on the bill",
  billLead:
    "The Wierzbickis' August statement, before and after. Air conditioning ran all afternoon both years. What changed is where the power came from.",
  bill: {
    account: "Account 4471-0098 · Harlow Ave",
    period: "Aug 1 – Aug 31",
    before: [
      ["Energy bought, peak 4–9 pm", "612 kWh", 238.68],
      ["Energy bought, off-peak", "498 kWh", 154.38],
      ["Delivery and connection", "", 18.94],
    ] as [string, string, number][],
    after: [
      ["Energy bought, peak 4–9 pm", "18 kWh", 7.02],
      ["Energy bought, off-peak", "74 kWh", 22.94],
      ["Export credit", "−136 kWh", -10.88],
      ["Delivery and connection", "", 18.94],
    ] as [string, string, number][],
  },
  stepsTitle: "Six to nine weeks, two visits",
  stepsLead:
    "We handle the permits, the utility and the inspector. You are home for the survey and the walk-through.",
  caseTitle: "Homes we have wired",
  payTitle: "Three ways to pay for it",
  payLead:
    "Same hardware, same crew, same warranty. What differs is who owns it and when you pay.",
  crewTitle: "The people on your roof work for us",
  crewBody: [
    "Every survey, every install and every service call is done by a Grid employee. No subcontracted crews, no handoffs between companies when something needs fixing.",
    "Our crews carry roofers' insurance as well as electrical, fit to the rafters rather than the decking, and photograph each roof penetration before a panel covers it.",
  ],
  closeTitle: "Start with your own roof",
  closeBody:
    "Lay out panels in the planner, or send us a bill and we will draw it for you. Survey visits are free and there is no deposit until you sign.",
};

export const quotePage = {
  title: "Get a quote",
  intro:
    "Three short steps. A designer replies within one working day with a first layout and a price range, then books your free survey.",
  homeTypes: [
    "Single-storey",
    "Two-storey",
    "Townhouse or terrace",
    "Farmhouse or rural",
    "Other",
  ],
  roofTypes: [
    "Composition shingle",
    "Clay or concrete tile",
    "Metal standing seam",
    "Flat or low slope",
    "Not sure",
  ],
  interests: [
    "Solar panels",
    "Battery storage",
    "EV charger",
    "Electrical panel upgrade",
  ],
  times: ["Weekday morning", "Weekday afternoon", "Saturday morning"],
  next: [
    "Within one working day: a designer emails a first layout and price range.",
    "Within a week: a free 90-minute survey at a time you choose.",
    "Within two weeks: a fixed price with every assumption written down.",
  ],
};

export const notFound = { title: "Page not found" };
