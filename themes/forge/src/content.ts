import spindle from "./assets/spindle.jpg";
import fiveAxis from "./assets/five-axis.jpg";
import lathe from "./assets/lathe.jpg";
import edm from "./assets/edm.jpg";
import cmm from "./assets/cmm.jpg";
import castings from "./assets/castings.jpg";
import bore from "./assets/bore.jpg";
import shopFloor from "./assets/shop-floor.jpg";
import gaugeBlocks from "./assets/gauge-blocks.jpg";
import turbine from "./assets/turbine.jpg";
import jetEngine from "./assets/jet-engine.jpg";
import implant from "./assets/implant.jpg";
import wafer from "./assets/wafer.jpg";
import robot from "./assets/robot.jpg";
import finishing from "./assets/finishing.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Forge",
  legal: "Forge Precision Works",
  tagline: "Machined to print. Shipped on the date we quote.",
  address: ["2140 Tooling Way", "Dayton, OH 45414"],
  phone: "+1 555 014 2300",
  phoneHref: "tel:+15550142300",
  email: "hello@forge.example",
  rfqEmail: "rfq@forge.example",
  jobsEmail: "jobs@forge.example",
  hours: [
    ["Production", "Mon–Fri 06:00–22:00 · Sat 06:00–14:00"],
    ["Estimating", "Mon–Fri 07:30–17:00 ET"],
    ["Shipping dock", "Mon–Fri 07:00–16:30"],
  ] as [string, string][],
  certs: ["AS9100D", "ISO 13485:2016", "ISO 9001:2015", "ITAR registered"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const nav = [
  { to: "/capabilities", label: "Capabilities" },
  { to: "/configurator", label: "Configurator" },
  { to: "/industries", label: "Industries" },
  { to: "/quality", label: "Quality" },
  { to: "/about", label: "About" },
];

export const images = {
  spindle: {
    src: spindle,
    alt: "An end mill cutting a pocket in an aluminium plate, chips piled across the machine table",
    w: 1230,
    h: 1307,
  },
  shopFloor: {
    src: shopFloor,
    alt: "A long, clean machine shop aisle lined with lathes, mills and a timber workbench",
    w: 1600,
    h: 1067,
  },
  gaugeBlocks: {
    src: gaugeBlocks,
    alt: "Steel gauge blocks of different lengths standing on a white surface",
    w: 1537,
    h: 1600,
  },
  cmm: {
    src: cmm,
    alt: "A metrologist beside a coordinate measuring machine probing a turned steel part",
    w: 1600,
    h: 1600,
  },
  bore: {
    src: bore,
    alt: "A machinist seen through the finished bore of an aluminium casting",
    w: 1600,
    h: 1087,
  },
  castings: {
    src: castings,
    alt: "A machinist checking machined aluminium housings beside a machining centre",
    w: 1600,
    h: 1063,
  },
} satisfies Record<string, Img>;

export const home = {
  lede: "Forge is a 41-machinist contract shop in Dayton, Ohio. We cut aluminium, stainless, titanium, superalloys and engineering plastics to ±0.005 mm — one prototype or five thousand production parts, inspected and certified before they leave the dock.",
  titleBlock: [
    ["Quote turnaround", "Next business day, 17:00 ET"],
    ["Tightest tolerance", "±0.003 mm (wire EDM)"],
    ["Batch size", "1 – 5,000 pcs"],
    ["Certification", "AS9100D · ISO 13485"],
  ] as [string, string][],
  heroCallout: "Ø6 carbide end mill · 7075-T651 · 14,000 rpm",
  process: [
    {
      when: "Day 0",
      title: "RFQ received",
      text: "An estimator opens your drawing and model the same day and checks material availability against our stock list.",
    },
    {
      when: "Day 1",
      title: "Quote and DFM notes",
      text: "Price breaks, a committed lead time and any manufacturability notes, in your inbox by 17:00 the next business day.",
    },
    {
      when: "Day 3",
      title: "Programs and fixtures",
      text: "CAM programmed and simulated, workholding built, and the first-article inspection plan written before metal is cut.",
    },
    {
      when: "Day 7–15",
      title: "First article, then the run",
      text: "One part is measured against every characteristic on the print. Production releases only when the report is signed.",
    },
    {
      when: "Ship",
      title: "Certificates in the box",
      text: "Certificate of conformance, mill certs and the inspection report travel with the parts and land in your portal.",
    },
  ],
  caseStudy: {
    title:
      "A titanium spinal-implant trial bracket, re-toleranced before it was quoted",
    body: [
      "Corvane Spine sent a bracket with a ±0.005 mm callout on a feature that only located a cover plate. Our estimator flagged the stack-up in the DFM notes, the customer opened it to ±0.02 mm, and the part moved from wire EDM to 5-axis milling.",
      "The change took 38% out of the unit price and four days out of the first lead time. Eighteen lots later, the critical bores still run at a Cpk above 1.67.",
    ],
    figures: [
      ["Material", "Ti-6Al-4V ELI"],
      ["Critical bore", "Ø4.000 +0.008/−0 mm"],
      ["Lots shipped", "18"],
      ["Process capability", "Cpk 1.71"],
    ] as [string, string][],
    quote:
      "They read the drawing like they were going to have to assemble it. Nobody else sent questions back.",
    person: "Dana Whitlock",
    role: "Lead mechanical engineer, Corvane Spine",
  },
  shop: {
    title: "Sixty-four thousand square feet, two shifts and a lights-out third",
    text: "Every machine in the building is listed below with what it is good for. If your part needs something we do not own, we will say so on the quote instead of farming it out quietly.",
  },
};

export type Envelope =
  | { kind: "box"; x: number; y: number; z: number }
  | { kind: "cylinder"; d: number; l: number };

export type Capability = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  image: Img;
  envelope: Envelope;
  envelopeLabel: string;
  tolerance: string;
  /** tightest tolerance in mm for sorting; null when the process does not hold dimensions */
  tolMm: number | null;
  finish: string;
  batch: string;
  lead: string;
  materials: string[];
  machines: { count: number; name: string; spec: string }[];
  strengths: string[];
  examples: string[];
  notes: string;
};

export const materialsFilter = [
  "Aluminium",
  "Stainless steel",
  "Alloy steel",
  "Titanium",
  "Superalloys",
  "Plastics",
  "Brass & copper",
];

export const capabilities: Capability[] = [
  {
    slug: "five-axis-milling",
    name: "5-axis milling",
    short:
      "Complex prismatic parts in one clamping: manifolds, impellers, housings with compound angles.",
    intro:
      "Six trunnion machining centres and a twelve-pallet cell cut every face a part has without re-fixturing. Fewer setups means fewer datums to lose, which is where most tolerance stack-ups actually come from.",
    image: {
      src: fiveAxis,
      alt: "Inside a machining centre enclosure, the spindle head above a fixture with chips on the guards",
      w: 1600,
      h: 1067,
    },
    envelope: { kind: "box", x: 650, y: 520, z: 475 },
    envelopeLabel: "650 × 520 × 475 mm",
    tolerance: "±0.005 mm",
    tolMm: 0.005,
    finish: "Ra 0.4 µm",
    batch: "1 – 1,000 pcs",
    lead: "from 8 working days",
    materials: [
      "Aluminium",
      "Titanium",
      "Stainless steel",
      "Superalloys",
      "Plastics",
    ],
    machines: [
      {
        count: 6,
        name: "Trunnion 5-axis machining centre",
        spec: "650 mm table · 20,000 rpm · 120-tool magazine",
      },
      {
        count: 1,
        name: "5-axis pallet cell",
        spec: "12-pallet pool · unattended third shift",
      },
    ],
    strengths: [
      "Simultaneous 5-axis toolpaths for blades, ports and undercuts",
      "Spindle-probed datums on every pallet before the first cut",
      "Lights-out running on proven programs, so repeat orders cost less",
      "Thermal compensation checked each morning against a reference artefact",
    ],
    examples: [
      "Fuel-metering manifold, 7075-T7351",
      "Seven-blade impeller, 17-4 PH",
      "Optical mount with compound angles, 6061-T6",
    ],
    notes:
      "Send a STEP file with the drawing. We program from the model and inspect to the print, so both need to agree.",
  },
  {
    slug: "three-axis-milling",
    name: "3-axis & horizontal milling",
    short:
      "Plates, brackets and housings at production volume, on verticals and four pallet horizontals.",
    intro:
      "Our verticals take plates up to 1,270 mm long; the horizontals hold tombstones of up to 32 parts and turn a busy job into an overnight one. This is where most of the 5,000-piece orders live.",
    image: {
      src: bore,
      alt: "A machinist seen through the finished bore of an aluminium casting",
      w: 1600,
      h: 1087,
    },
    envelope: { kind: "box", x: 1270, y: 610, z: 610 },
    envelopeLabel: "1,270 × 610 × 610 mm",
    tolerance: "±0.01 mm",
    tolMm: 0.01,
    finish: "Ra 0.8 µm",
    batch: "1 – 5,000 pcs",
    lead: "from 5 working days",
    materials: [
      "Aluminium",
      "Stainless steel",
      "Alloy steel",
      "Plastics",
      "Brass & copper",
    ],
    machines: [
      {
        count: 8,
        name: "Vertical machining centre",
        spec: "1,270 × 610 mm table · 12,000 rpm · through-spindle coolant",
      },
      {
        count: 4,
        name: "Horizontal machining centre",
        spec: "500 mm twin pallets · tombstone fixtures",
      },
    ],
    strengths: [
      "Tombstone fixturing that loads up to 32 parts per pallet",
      "In-process probing and SPC on every characteristic marked critical",
      "Bar-coded travellers, so every part traces to a machine, program and operator",
      "Saw, deburr and wash cell in line with the machines",
    ],
    examples: [
      "Gearbox housing, 6061-T6",
      "Instrument panel, 5083-H321",
      "Linear rail carriage, 4140 pre-hard",
    ],
    notes:
      "For production quantities we quote a blanket order with scheduled releases, which usually beats a single large batch on price.",
  },
  {
    slug: "cnc-turning",
    name: "CNC turning & mill-turn",
    short:
      "Shafts, pins, fittings and valve bodies from Ø1 mm Swiss work up to Ø420 mm chucker parts.",
    intro:
      "Twin-spindle mill-turns finish both ends and the milled features in one cycle; sliding-head Swiss machines handle long, slender parts without chatter. Bar feeders keep both running past the end of the shift.",
    image: {
      src: lathe,
      alt: "A CNC lathe with its guard open, a tool rack and parts trays on top",
      w: 1490,
      h: 1440,
    },
    envelope: { kind: "cylinder", d: 420, l: 1000 },
    envelopeLabel: "Ø420 × 1,000 mm",
    tolerance: "±0.005 mm",
    tolMm: 0.005,
    finish: "Ra 0.2 µm",
    batch: "10 – 5,000 pcs",
    lead: "from 6 working days",
    materials: [
      "Aluminium",
      "Stainless steel",
      "Alloy steel",
      "Titanium",
      "Plastics",
      "Brass & copper",
    ],
    machines: [
      {
        count: 3,
        name: "Twin-spindle mill-turn",
        spec: "Y-axis, live tooling · Ø65 mm bar feed",
      },
      {
        count: 4,
        name: "Swiss-type sliding head",
        spec: "Ø32 mm bar · 12 axes · guide bushing",
      },
      {
        count: 2,
        name: "2-axis chucker",
        spec: "Ø420 mm swing · 1,000 mm between centres",
      },
    ],
    strengths: [
      "Done-in-one parts: turn, mill, drill and part off in a single cycle",
      "Thread rolling and polygon turning on the Swiss machines",
      "Concentricity held to 0.005 mm across both spindles",
      "Bar feed and parts catchers for unattended running",
    ],
    examples: [
      "Hydraulic valve spool, 440C",
      "Bone-screw blank, Ti-6Al-4V ELI",
      "Instrument fitting, 316L",
    ],
    notes:
      "Quote turned parts with your annual usage. Swiss work is cheap per piece but expensive to set up, so volume matters more than anywhere else.",
  },
  {
    slug: "wire-edm",
    name: "Wire & small-hole EDM",
    short:
      "Hardened steel, sharp internal corners and features no cutter can reach, to ±0.003 mm.",
    intro:
      "Wire EDM cuts with a spark rather than a tool, so it does not care how hard the material is or how thin the wall. We use it for punch-and-die sets, splines, fine slots and anything that needs a 0.1 mm inside radius.",
    image: {
      src: edm,
      alt: "A submerged wire EDM machine with its work tank lit from inside",
      w: 1600,
      h: 1333,
    },
    envelope: { kind: "box", x: 600, y: 400, z: 350 },
    envelopeLabel: "600 × 400 × 350 mm",
    tolerance: "±0.003 mm",
    tolMm: 0.003,
    finish: "Ra 0.2 µm",
    batch: "1 – 500 pcs",
    lead: "from 7 working days",
    materials: [
      "Alloy steel",
      "Stainless steel",
      "Titanium",
      "Superalloys",
      "Brass & copper",
    ],
    machines: [
      {
        count: 3,
        name: "Submerged wire EDM",
        spec: "Ø0.1–0.3 mm wire · ±30° taper",
      },
      {
        count: 1,
        name: "Small-hole EDM drill",
        spec: "Ø0.3–3 mm electrodes · start holes and cooling holes",
      },
    ],
    strengths: [
      "Inside corner radii down to 0.06 mm",
      "Cuts after heat treatment, so hardening distortion never reaches the part",
      "Four skim passes for mirror finishes on sealing faces",
      "No cutting force, so thin ribs and webs stay flat",
    ],
    examples: [
      "Involute spline broach, D2 at 60 HRC",
      "Turbine blade root form, Inconel 718",
      "Medical cutting guide, 17-4 PH",
    ],
    notes:
      "Tell us where the wire may start. A start hole in a non-critical area saves a drilling operation.",
  },
  {
    slug: "finishing",
    name: "Finishing & deburring",
    short:
      "Bead blast, tumble, passivate, laser-mark — and anodize or plate through finishers we audit.",
    intro:
      "A part is not finished when it comes off the machine. Our finishing room breaks edges by hand and by vibratory tumble, blasts to a matched sample, passivates stainless in house, and laser-marks serial numbers that survive anodizing.",
    image: {
      src: finishing,
      alt: "Sparks flying from a grinder deburring the edge of a steel plate",
      w: 1600,
      h: 1067,
    },
    envelope: { kind: "box", x: 1200, y: 800, z: 900 },
    envelopeLabel: "1,200 × 800 × 900 mm",
    tolerance: "Edge break 0.1–0.5 mm",
    tolMm: null,
    finish: "Matched to your sample",
    batch: "1 – 5,000 pcs",
    lead: "adds 1–4 working days",
    materials: [
      "Aluminium",
      "Stainless steel",
      "Alloy steel",
      "Titanium",
      "Brass & copper",
      "Plastics",
    ],
    machines: [
      {
        count: 2,
        name: "Bead-blast cabinet",
        spec: "Glass bead and aluminium oxide media",
      },
      {
        count: 1,
        name: "Passivation line",
        spec: "Citric to ASTM A967 · nitric to AMS 2700",
      },
      {
        count: 1,
        name: "Fibre laser marker",
        spec: "UDI and 2D DataMatrix marking",
      },
    ],
    strengths: [
      "Type II and Type III anodize, chem film, and electroless nickel through audited NADCAP finishers",
      "Masking drawn up in the job plan, not improvised at the tank",
      "Thickness and adhesion checked on incoming finished parts",
      "Laser marks verified against the traveller before packing",
    ],
    examples: [
      "Hard-anodized actuator body, 6061-T6",
      "Passivated implant trial, 17-4 PH",
      "Black-oxide tooling plate, 4140",
    ],
    notes:
      "If cosmetic appearance matters, send a sample or a photo of an approved part. A matched sample beats a paragraph of notes.",
  },
  {
    slug: "metrology",
    name: "Inspection & metrology",
    short:
      "Two CMMs, an optical comparator room and AS9102 first-article reports for any print you send.",
    intro:
      "The inspection room is held at 20 ± 0.5 °C and nobody outside it can release a part. We will also measure parts we did not make, which is how a lot of our customers first meet us.",
    image: {
      src: cmm,
      alt: "A metrologist beside a coordinate measuring machine probing a turned steel part",
      w: 1600,
      h: 1600,
    },
    envelope: { kind: "box", x: 1200, y: 1000, z: 800 },
    envelopeLabel: "1,200 × 1,000 × 800 mm",
    tolerance: "Uncertainty 1.9 + L/300 µm",
    tolMm: 0.002,
    finish: "Profilometer to Ra 0.025 µm",
    batch: "1 – 5,000 pcs",
    lead: "from 3 working days",
    materials: [
      "Aluminium",
      "Stainless steel",
      "Alloy steel",
      "Titanium",
      "Superalloys",
      "Plastics",
      "Brass & copper",
    ],
    machines: [
      {
        count: 2,
        name: "Bridge CMM",
        spec: "Scanning probe · 1,200 × 1,000 × 800 mm",
      },
      {
        count: 1,
        name: "Optical comparator",
        spec: "Ø400 mm screen · 10×/20×/50× lenses",
      },
      {
        count: 1,
        name: "Surface profilometer",
        spec: "Ra, Rz and Rmax to ISO 21920",
      },
    ],
    strengths: [
      "AS9102 first-article reports with ballooned drawings",
      "PPAP to Level 3, including MSA and capability studies",
      "Every gauge calibrated against standards traceable to national institutes",
      "Third-party inspection of supplier or legacy parts",
    ],
    examples: [
      "First article for an inherited housing",
      "Cpk study on a 4,000-piece pin",
      "Reverse-engineering a legacy bracket",
    ],
    notes:
      "Measurement-only work is quoted per characteristic. Send the drawing and the number of parts.",
  },
  {
    slug: "assembly",
    name: "Assembly & kitting",
    short:
      "Inserts, press fits, leak tests and serialised kits, delivered ready for your line.",
    intro:
      "Many customers do not want parts; they want a sub-assembly that goes straight onto their build. We install inserts and bearings, torque and witness-mark fasteners, leak-test manifolds and pack kits in the order your technicians use them.",
    image: {
      src: castings,
      alt: "A machinist checking machined aluminium housings beside a machining centre",
      w: 1600,
      h: 1063,
    },
    envelope: { kind: "box", x: 1500, y: 900, z: 900 },
    envelopeLabel: "1,500 × 900 × 900 mm",
    tolerance: "Torque audited ±2%",
    tolMm: null,
    finish: "Clean-packed on request",
    batch: "10 – 2,000 kits",
    lead: "adds 2–5 working days",
    materials: [
      "Aluminium",
      "Stainless steel",
      "Alloy steel",
      "Titanium",
      "Plastics",
    ],
    machines: [
      {
        count: 4,
        name: "ESD-safe assembly bench",
        spec: "Calibrated torque drivers · pick-to-light kitting",
      },
      {
        count: 1,
        name: "Pressure-decay leak tester",
        spec: "To 0.05 sccm · 0–20 bar",
      },
      {
        count: 1,
        name: "Servo press",
        spec: "50 kN · force–displacement recorded per part",
      },
    ],
    strengths: [
      "Helicoil, Keensert and press-in insert installation",
      "Bearing and dowel press fits with recorded force curves",
      "Leak and pressure testing with a printed result per serial",
      "Kits labelled with your part numbers and bin locations",
    ],
    examples: [
      "Valve manifold with 14 inserts",
      "Robot wrist sub-assembly",
      "Field-service spares kit",
    ],
    notes:
      "Send the assembly drawing and bill of materials. We can buy the hardware or use what you consign.",
  },
];

export type Industry = {
  id: string;
  name: string;
  image: Img;
  lede: string;
  standards: string[];
  parts: string[];
  materials: string[];
  proof: { title: string; text: string };
};

export const industries: Industry[] = [
  {
    id: "aerospace",
    name: "Aerospace & defense",
    image: {
      src: jetEngine,
      alt: "Looking into the intake of a jet engine at the fan and turbine stages",
      w: 1600,
      h: 1200,
    },
    lede: "Flight hardware with traceability that holds up in an audit: AS9100D, AS9102 first articles, and mill certs tied to every serial number.",
    standards: [
      "AS9100D",
      "AS9102 first article",
      "ITAR registered",
      "DFARS-compliant material",
    ],
    parts: [
      "Actuator housings",
      "Fuel-metering manifolds",
      "Sensor brackets",
      "Hinge fittings",
    ],
    materials: ["7075-T7351", "Ti-6Al-4V", "Inconel 718", "17-4 PH H1025"],
    proof: {
      title: "Fuel-metering manifold",
      text: "14 critical bores held to 0.008 mm true position. 31 lots shipped since 2022 with no escapes.",
    },
  },
  {
    id: "medical",
    name: "Medical devices",
    image: {
      src: implant,
      alt: "Titanium bone plates and screws laid out on a textured surface",
      w: 1600,
      h: 1203,
    },
    lede: "Implant trials, instruments and device components under an ISO 13485 system, with lot-level traceability and clean packing.",
    standards: [
      "ISO 13485:2016",
      "Validated cleaning",
      "UDI laser marking",
      "Device history records",
    ],
    parts: [
      "Implant trials",
      "Surgical guides",
      "Instrument handles",
      "Bone-screw blanks",
    ],
    materials: ["Ti-6Al-4V ELI", "316LVM", "17-4 PH", "PEEK"],
    proof: {
      title: "Spinal trial bracket",
      text: "Re-toleranced at quote stage, 38% cheaper per part, Cpk 1.71 on the critical bore across 18 lots.",
    },
  },
  {
    id: "semiconductor",
    name: "Semiconductor equipment",
    image: {
      src: wafer,
      alt: "A patterned silicon wafer catching light in bands of colour",
      w: 1200,
      h: 800,
    },
    lede: "Chamber, handling and gas-delivery parts machined and precision-cleaned for vacuum, with surface finishes measured rather than promised.",
    standards: [
      "Ra verified per lot",
      "Precision clean & double-bag",
      "Helium-leak-ready sealing faces",
      "Copy-exact process control",
    ],
    parts: [
      "Chamber lids",
      "Wafer end effectors",
      "Gas manifolds",
      "Heater plates",
    ],
    materials: ["6061-T6", "316L", "PEEK", "Ultem 1000"],
    proof: {
      title: "End-effector paddle",
      text: "1.2 mm PEEK paddle held flat within 0.03 mm over 300 mm, machined in four relieved stages.",
    },
  },
  {
    id: "robotics",
    name: "Robotics & automation",
    image: {
      src: robot,
      alt: "The control panel of a robot arm in a factory, its buttons lit",
      w: 1064,
      h: 1600,
    },
    lede: "Housings, flanges and end-of-arm tooling for robot makers and integrators who need prototypes in days and a production price later.",
    standards: [
      "ISO 9001:2015",
      "PPAP Level 3 on request",
      "Blanket orders with releases",
      "Kanban replenishment",
    ],
    parts: [
      "Gearbox housings",
      "Strain-wave flanges",
      "End-of-arm tooling",
      "Linear carriages",
    ],
    materials: ["7075-T651", "4140 pre-hard", "Delrin", "6061-T6"],
    proof: {
      title: "Wrist housing family",
      text: "Prototype in 6 days, production on horizontals at 1,200 a month, 22% below the prototype price.",
    },
  },
  {
    id: "energy",
    name: "Energy & power",
    image: {
      src: turbine,
      alt: "A large steam turbine rotor displayed outdoors, its blade stages fanning out",
      w: 1600,
      h: 1200,
    },
    lede: "Valve bodies, instrument bosses and hydraulic manifolds in corrosion-resistant alloys, with material compliance documented up front.",
    standards: [
      "NACE MR0175 compliance",
      "PMI on every heat",
      "Hydrostatic testing",
      "Third-party witness points",
    ],
    parts: [
      "Valve bodies",
      "Instrument bosses",
      "Hydraulic manifolds",
      "Seal carriers",
    ],
    materials: ["316L", "Duplex 2205", "Inconel 625", "Monel 400"],
    proof: {
      title: "Subsea valve body",
      text: "Duplex 2205, hydro-tested to 1.5× rated pressure with the customer's inspector on site.",
    },
  },
];

export const quality = {
  lede: "Quality at Forge is a department with its own room, its own budget and the authority to stop any job. Nobody in production can release a part they made.",
  certs: [
    {
      code: "AS9100D",
      scope: "Aerospace and defense machined components and assemblies",
      issued: "Recertified March 2025",
      by: "Northline Registrars",
    },
    {
      code: "ISO 13485:2016",
      scope: "Contract manufacture of medical device components",
      issued: "Certified 2019, surveillance June 2025",
      by: "Northline Registrars",
    },
    {
      code: "ISO 9001:2015",
      scope: "All site activities",
      issued: "Certified 2001",
      by: "Northline Registrars",
    },
    {
      code: "ITAR",
      scope: "Registered with the U.S. Directorate of Defense Trade Controls",
      issued: "Renewed annually",
      by: "DDTC registration",
    },
  ],
  steps: [
    {
      title: "Contract review",
      text: "Drawing revision, notes, flow-downs and special requirements checked before the order is accepted.",
    },
    {
      title: "Material receiving",
      text: "Mill certs verified against the spec, heat numbers recorded, and PMI run on alloy steels and superalloys.",
    },
    {
      title: "First article",
      text: "Every characteristic on the print measured and ballooned to AS9102 before production is released.",
    },
    {
      title: "In-process control",
      text: "Operators measure critical features at set frequencies; results feed SPC charts that flag drift before it is scrap.",
    },
    {
      title: "Final inspection",
      text: "Sampling to ANSI Z1.4 or 100% where you require it, by an inspector who did not make the part.",
    },
    {
      title: "Certificate of conformance",
      text: "CoC, material certs and inspection data packed with the parts and posted to your portal.",
    },
  ],
  metrics: [
    ["On-time delivery", "98.4%", "Shipped on or before the committed date"],
    ["Customer reject rate", "112 PPM", "Parts returned per million shipped"],
    ["First-pass yield", "99.1%", "Parts passing inspection without rework"],
    [
      "Corrective action closure",
      "9 days",
      "Average time to a verified root cause",
    ],
  ] as [string, string, string][],
  equipment: [
    ["Bridge CMM, scanning probe", "2"],
    ["Optical comparator, Ø400 mm", "1"],
    ["Surface profilometer", "1"],
    ["Height gauges, 600 mm", "3"],
    ["Gauge-block set, grade 0", "2"],
    ["Hardness tester, Rockwell & Brinell", "1"],
    ["Handheld XRF for PMI", "1"],
  ] as [string, string][],
  /** sample AS9102 form 3 rows for the ballooned bracket drawing */
  fai: [
    {
      n: 1,
      char: "Overall length",
      nominal: "120.00",
      tol: "±0.10",
      actual: "120.03",
    },
    {
      n: 2,
      char: "Overall height",
      nominal: "64.00",
      tol: "±0.10",
      actual: "63.96",
    },
    {
      n: 3,
      char: "Bore diameter",
      nominal: "Ø22.000",
      tol: "+0.021/−0",
      actual: "Ø22.012",
    },
    {
      n: 4,
      char: "Bore true position",
      nominal: "0.020",
      tol: "max",
      actual: "0.009",
    },
    {
      n: 5,
      char: "Base holes Ø6.6, 4×",
      nominal: "Ø6.60",
      tol: "±0.05",
      actual: "Ø6.62",
    },
    {
      n: 6,
      char: "Base flatness",
      nominal: "0.015",
      tol: "max",
      actual: "0.006",
    },
    {
      n: 7,
      char: "Surface finish, bore",
      nominal: "Ra 0.8",
      tol: "max",
      actual: "Ra 0.42",
    },
  ],
};

export const about = {
  lede: "Forge started in 1987 with two manual lathes and a rented bay. It is still owned by the family that started it, still in Dayton, and still answers the phone with a person who can read a drawing.",
  story: [
    "Ruth Kessler opened the shop after eleven years programming turning centres for an engine maker that closed its Ohio plant. The first customer was a hydraulics firm down the road that needed spools nobody else would quote in quantities of forty.",
    "We have grown by saying yes to awkward parts and no to work we cannot inspect. Every expansion — the first 5-axis machine, the medical certification, the temperature-controlled inspection room — came from a customer who needed it and a part we already understood.",
  ],
  timeline: [
    [
      "1987",
      "Two manual lathes in a rented bay on the east side. Hydraulic spools, forty at a time.",
    ],
    ["1994", "First CNC turning centre and the first job over 1,000 pieces."],
    ["2003", "AS9100 certification and the first flight-hardware order."],
    [
      "2011",
      "Moved to 64,000 sq ft on Tooling Way; added horizontals and a second shift.",
    ],
    ["2016", "Five-axis pallet cell and an unattended third shift."],
    [
      "2019",
      "ISO 13485 and a clean-pack room for implant and instrument work.",
    ],
    ["2023", "Second CMM and a 20 ± 0.5 °C inspection room."],
  ] as [string, string][],
  people: [
    {
      name: "Ruth Kessler",
      role: "Founder and chair",
      line: "Still reviews every new customer's first drawing.",
    },
    {
      name: "Marcus Oyelaran",
      role: "General manager",
      line: "Came up through second-shift setup; runs scheduling and capacity.",
    },
    {
      name: "Ines Halvorsen",
      role: "Quality manager",
      line: "Owns the AS9100 and ISO 13485 systems and the right to stop any job.",
    },
    {
      name: "Tom Brecht",
      role: "Lead 5-axis programmer",
      line: "Writes the toolpaths for anything with more than three setups.",
    },
    {
      name: "Priya Raman",
      role: "Estimating lead",
      line: "Sends the DFM notes. Ask for her when a quote looks wrong.",
    },
  ],
  values: [
    [
      "Quote what we can make",
      "If a feature is beyond our equipment, the quote says so and suggests an alternative.",
    ],
    [
      "Measure before we promise",
      "Lead times come from the live schedule, not a standard table.",
    ],
    [
      "Same people, every reorder",
      "Your program, fixtures and inspection plan are kept and owned by named people.",
    ],
  ] as [string, string][],
  roles: [
    {
      title: "5-axis CNC programmer",
      shift: "Day shift",
      detail:
        "Simultaneous 5-axis CAM, post editing and prove-out. Four years’ experience.",
    },
    {
      title: "CMM inspector",
      shift: "Second shift",
      detail:
        "Program and run bridge CMMs, write AS9102 reports. GD&T fluency required.",
    },
    {
      title: "Swiss-type setup machinist",
      shift: "Day shift",
      detail: "Set up and run sliding-head machines; we train on our controls.",
    },
  ],
};

/* ---------- Part configurator data ---------- */

export type FamilyId = "flange" | "bracket" | "shaft";
export type Dim = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
};

export const families: {
  id: FamilyId;
  name: string;
  blurb: string;
  prefix: string;
  dims: Dim[];
}[] = [
  {
    id: "flange",
    name: "Bolted flange",
    blurb:
      "Round flange with a centre bore and an equally spaced bolt pattern.",
    prefix: "FL",
    dims: [
      {
        key: "od",
        label: "Outside diameter",
        min: 60,
        max: 240,
        step: 5,
        value: 140,
      },
      {
        key: "bore",
        label: "Bore diameter",
        min: 16,
        max: 180,
        step: 1,
        value: 52,
      },
      { key: "t", label: "Thickness", min: 8, max: 40, step: 1, value: 16 },
      { key: "holes", label: "Bolt holes", min: 3, max: 12, step: 1, value: 6 },
    ],
  },
  {
    id: "bracket",
    name: "Angle bracket",
    blurb: "L-section mounting bracket with a slotted base.",
    prefix: "BR",
    dims: [
      { key: "len", label: "Length", min: 40, max: 300, step: 5, value: 160 },
      { key: "w", label: "Base width", min: 30, max: 150, step: 5, value: 80 },
      {
        key: "h",
        label: "Upright height",
        min: 30,
        max: 150,
        step: 5,
        value: 90,
      },
      {
        key: "t",
        label: "Wall thickness",
        min: 4,
        max: 20,
        step: 1,
        value: 10,
      },
      { key: "holes", label: "Base holes", min: 2, max: 6, step: 2, value: 4 },
    ],
  },
  {
    id: "shaft",
    name: "Stepped shaft",
    blurb: "Turned shaft with one shoulder, chamfered ends and a keyway.",
    prefix: "SH",
    dims: [
      {
        key: "len",
        label: "Overall length",
        min: 60,
        max: 600,
        step: 10,
        value: 320,
      },
      {
        key: "d",
        label: "Main diameter",
        min: 10,
        max: 80,
        step: 1,
        value: 40,
      },
      {
        key: "d2",
        label: "Journal diameter",
        min: 6,
        max: 76,
        step: 1,
        value: 25,
      },
      {
        key: "l2",
        label: "Journal length",
        min: 10,
        max: 300,
        step: 5,
        value: 90,
      },
    ],
  },
];

export type MaterialId =
  "al6061" | "al7075" | "ss303" | "ss316" | "st4140" | "ti64" | "peek" | "c360";

export const materials: {
  id: MaterialId;
  name: string;
  kind: "aluminium" | "stainless" | "steel" | "titanium" | "plastic" | "brass";
  density: number;
  perKg: number;
  machinability: number;
}[] = [
  {
    id: "al6061",
    name: "Aluminium 6061-T6",
    kind: "aluminium",
    density: 2.7,
    perKg: 9,
    machinability: 1,
  },
  {
    id: "al7075",
    name: "Aluminium 7075-T651",
    kind: "aluminium",
    density: 2.81,
    perKg: 14,
    machinability: 1.1,
  },
  {
    id: "ss303",
    name: "Stainless 303",
    kind: "stainless",
    density: 8.0,
    perKg: 11,
    machinability: 1.6,
  },
  {
    id: "ss316",
    name: "Stainless 316L",
    kind: "stainless",
    density: 8.0,
    perKg: 13,
    machinability: 2,
  },
  {
    id: "st4140",
    name: "Alloy steel 4140 pre-hard",
    kind: "steel",
    density: 7.85,
    perKg: 6,
    machinability: 1.7,
  },
  {
    id: "ti64",
    name: "Titanium Ti-6Al-4V",
    kind: "titanium",
    density: 4.43,
    perKg: 62,
    machinability: 3.2,
  },
  {
    id: "peek",
    name: "PEEK, unfilled",
    kind: "plastic",
    density: 1.3,
    perKg: 180,
    machinability: 1.2,
  },
  {
    id: "c360",
    name: "Brass C360",
    kind: "brass",
    density: 8.5,
    perKg: 12,
    machinability: 0.8,
  },
];

export type FinishId =
  | "machined"
  | "blast"
  | "anodize2"
  | "anodize3"
  | "passivate"
  | "oxide"
  | "electropolish";

export const finishes: {
  id: FinishId;
  name: string;
  perPart: number;
  days: number;
  for: string[];
}[] = [
  {
    id: "machined",
    name: "As machined, Ra 3.2",
    perPart: 0,
    days: 0,
    for: ["aluminium", "stainless", "steel", "titanium", "plastic", "brass"],
  },
  {
    id: "blast",
    name: "Bead blast, matte",
    perPart: 2.5,
    days: 1,
    for: ["aluminium", "stainless", "steel", "titanium", "brass"],
  },
  {
    id: "anodize2",
    name: "Anodize Type II, black",
    perPart: 4,
    days: 3,
    for: ["aluminium"],
  },
  {
    id: "anodize3",
    name: "Hard anodize Type III",
    perPart: 7,
    days: 4,
    for: ["aluminium"],
  },
  {
    id: "passivate",
    name: "Passivate, ASTM A967",
    perPart: 2,
    days: 2,
    for: ["stainless", "titanium"],
  },
  { id: "oxide", name: "Black oxide", perPart: 1.8, days: 2, for: ["steel"] },
  {
    id: "electropolish",
    name: "Electropolish",
    perPart: 5,
    days: 3,
    for: ["stainless"],
  },
];

export type TolId = "standard" | "fine" | "precision";

export const tolerances: {
  id: TolId;
  name: string;
  band: string;
  factor: number;
  setup: number;
  days: number;
}[] = [
  {
    id: "standard",
    name: "ISO 2768-m",
    band: "±0.10 mm",
    factor: 1,
    setup: 0,
    days: 0,
  },
  {
    id: "fine",
    name: "Fine",
    band: "±0.025 mm",
    factor: 1.35,
    setup: 90,
    days: 1,
  },
  {
    id: "precision",
    name: "CMM inspected",
    band: "±0.010 mm",
    factor: 1.8,
    setup: 220,
    days: 3,
  },
];

export const priceBreaks = [1, 10, 50, 100, 500, 1000];

export const rfq = {
  lede: "Send a drawing and a model. An estimator — a person, not a portal — replies with price breaks, a lead time from the live schedule and any DFM notes by 17:00 ET the next business day.",
  after: [
    ["Today", "Your RFQ is logged and assigned to an estimator."],
    ["Next business day", "Quote with price breaks, lead time and DFM notes."],
    ["On order", "Programs, first article, then production."],
  ] as [string, string][],
  ndaNote:
    "Prefer an NDA first? Tick the box and we will send our mutual NDA before anyone opens your files.",
};

export const footer = {
  newsletter:
    "One email a month on tolerancing, materials and what we learned on the floor. No sales sequences.",
};
