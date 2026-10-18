/*
 * Fixture — every word, price and figure on the site lives here.
 * All names, people, numbers and places are fictional demonstration content.
 */
import hero from "./assets/hero.jpg";
import heroElectric from "./assets/hero-electric.jpg";
import leak from "./assets/leak.jpg";
import drain from "./assets/drain.jpg";
import heater from "./assets/heater.jpg";
import faucet from "./assets/faucet.jpg";
import pex from "./assets/pex.jpg";
import panel from "./assets/panel.jpg";
import charger from "./assets/charger.jpg";
import outlet from "./assets/outlet.jpg";
import lighting from "./assets/lighting.jpg";
import inspection from "./assets/inspection.jpg";
import switchPlate from "./assets/switch.jpg";

export const brand = {
  name: "Fixture",
  legal: "Fixture Plumbing & Electric Co.",
  sector: "Plumbing & electrical services",
  city: "Calder",
  phone: "+1 555 0142",
  phoneHref: "tel:+15550142",
  emergency: "+1 555 0100",
  emergencyHref: "tel:+15550100",
  email: "hello@fixture.example",
  address: "214 Foundry Lane, Old Mill, Calder 40703",
  founded: 1994,
  hours: [
    { days: "Monday – Friday", time: "7 am – 7 pm" },
    { days: "Saturday", time: "8 am – 2 pm" },
    { days: "Emergency line", time: "Every hour, every day" },
  ],
  licences: [
    { label: "Master Plumber", value: "MP-40917" },
    { label: "Master Electrician", value: "ME-22305" },
    { label: "Liability insurance", value: "$2,000,000" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/estimate", label: "Instant estimate" },
  { to: "/areas", label: "Service areas" },
  { to: "/emergency", label: "Emergency" },
  { to: "/about", label: "About" },
];

/* ——— Rates: one table drives the rate card, the estimator and the booking page ——— */

export const rates = {
  labour: 118,
  callOut: 89,
  nextDay: 45,
  emergency: 145,
  outerZone: 35,
};

export const rateCard = [
  {
    item: "Call-out & diagnosis",
    price: "$89",
    note: "Waived when you go ahead with the repair",
  },
  {
    item: "Labour, per technician",
    price: "$118 / hr",
    note: "First hour, then billed in 15-minute steps",
  },
  {
    item: "Next-day priority",
    price: "+ $45",
    note: "Booked before 4 pm for the following day",
  },
  {
    item: "Emergency dispatch",
    price: "+ $145",
    note: "Nights, Sundays and public holidays",
  },
  {
    item: "Outer-zone trip",
    price: "+ $35",
    note: "Six neighbourhoods past the ring road",
  },
  {
    item: "Saturday mornings",
    price: "No surcharge",
    note: "Same rates as a weekday, 8 am – 2 pm",
  },
];

/* ——— Services ——— */

export type Trade = "plumbing" | "electrical";

export const trades: Record<Trade, { label: string; blurb: string }> = {
  plumbing: {
    label: "Plumbing",
    blurb:
      "Leaks, drains, water heaters, fixtures and full repipes — supply side to sewer line.",
  },
  electrical: {
    label: "Electrical",
    blurb:
      "Panels, circuits, chargers, lighting and inspections — meter to the last switch plate.",
  },
};

export type Service = {
  slug: string;
  trade: Trade;
  name: string;
  short: string;
  lede: string;
  image: string;
  alt: string;
  duration: string;
  warranty: string;
  signs: string[];
  includes: string[];
  faq: { q: string; a: string }[];
  /** Estimator model: labour hours and parts for the first unit, plus each extra unit. */
  model: {
    unit: string;
    units: string;
    max: number;
    hours: number;
    perHours: number;
    parts: number;
    perParts: number;
  };
};

export const services: Service[] = [
  {
    slug: "leak-repair",
    trade: "plumbing",
    name: "Leak & burst pipe repair",
    short:
      "Find the leak, cut out the bad run, fit new pipe and pressure-test.",
    lede: "Most leaks are a fitting that has given up, a pinhole in old copper or a frozen line that split overnight. We find the source before we open a wall, cut out only the failed section and pressure-test the run before we pack up.",
    image: leak,
    alt: "A corroded shut-off valve and copper supply lines under a kitchen sink",
    duration: "1–3 hours, one visit",
    warranty: "2 years on the repair",
    signs: [
      "A water bill that jumped without a reason",
      "Stains or bubbling paint on a ceiling under a bathroom",
      "The sound of running water when every tap is off",
      "A meter dial that keeps moving overnight",
    ],
    includes: [
      "Acoustic and thermal leak tracing before any cutting",
      "Section replacement in copper, PEX or CPVC to match",
      "Pressure test of the repaired run",
      "Moisture readings and photos for your insurer",
    ],
    faq: [
      {
        q: "Will you have to open the wall?",
        a: "Only where the leak is. We trace first, mark the spot and cut one tidy access panel. Patching is quoted separately or left for your decorator.",
      },
      {
        q: "Is a burst pipe covered by insurance?",
        a: "Sudden bursts usually are; slow leaks often are not. We give you dated photos and readings either way.",
      },
    ],
    model: {
      unit: "leak",
      units: "leaks",
      max: 6,
      hours: 1.25,
      perHours: 0.75,
      parts: 35,
      perParts: 25,
    },
  },
  {
    slug: "drain-clearing",
    trade: "plumbing",
    name: "Drain & sewer line clearing",
    short: "Cable, jet or camera — the slow sink to the backed-up main.",
    lede: "A slow drain is a warning; a backed-up floor drain is an emergency. We clear the blockage with the right tool for the pipe, then run a camera through when it keeps coming back so you see what is actually down there.",
    image: drain,
    alt: "A stainless steel sink drain and strainer, seen from above",
    duration: "1–2 hours per drain",
    warranty: "90 days on the cleared line",
    signs: [
      "Gurgling from a toilet when the washer drains",
      "Water standing in the shower after a two-minute rinse",
      "A sewer smell from a basement floor drain",
      "The same sink blocking every few months",
    ],
    includes: [
      "Mechanical cable or hydro-jet, chosen for pipe age and material",
      "Camera inspection on request, with the recording sent to you",
      "Root and grease advice for that specific line",
      "Clean-up of the work area",
    ],
    faq: [
      {
        q: "Do you use chemical drain cleaners?",
        a: "No. They eat older cast-iron and galvanised pipe and make the next job dangerous for whoever opens the trap.",
      },
      {
        q: "Why would I need a camera?",
        a: "If a line blocks again within a year there is usually a cause — roots, a sag or a broken joint. The camera shows which, so you only fix it once.",
      },
    ],
    model: {
      unit: "drain",
      units: "drains",
      max: 6,
      hours: 1,
      perHours: 0.5,
      parts: 20,
      perParts: 10,
    },
  },
  {
    slug: "water-heater",
    trade: "plumbing",
    name: "Water heater replacement",
    short: "Tank or tankless, sized to your household, haul-away included.",
    lede: "Tank heaters last ten to fifteen years in Calder's hard water. When yours is weeping at the base or running out after one shower, we size the replacement to how your house actually uses hot water, fit it to code and take the old one away.",
    image: heater,
    alt: "A rust ring on a utility-room floor where a failed water heater stood",
    duration: "Half a day for a like-for-like swap",
    warranty: "6 years parts, 2 years labour",
    signs: [
      "Rust-coloured hot water or grit in the aerators",
      "Rumbling or popping as the burner fires",
      "Water pooling around the base of the tank",
      "Hot water that runs out halfway through a shower",
    ],
    includes: [
      "40 or 50-gallon tank, or a condensing tankless unit",
      "New shut-off, expansion tank and flexible connectors",
      "Gas, venting and relief valve checked to code",
      "Removal and recycling of the old heater",
    ],
    faq: [
      {
        q: "Tank or tankless?",
        a: "Tankless suits households that run long showers back to back and have room on the gas line. For two people with one bathroom, a good tank is cheaper over its life.",
      },
      {
        q: "Can I have hot water the same day?",
        a: "Yes, for a like-for-like swap booked in a morning window. Conversions to tankless take a second visit.",
      },
    ],
    model: {
      unit: "heater",
      units: "heaters",
      max: 2,
      hours: 4.5,
      perHours: 3.5,
      parts: 1150,
      perParts: 1100,
    },
  },
  {
    slug: "fixture-install",
    trade: "plumbing",
    name: "Faucet, toilet & sink installation",
    short: "You choose the fixture; we fit it level, sealed and leak-free.",
    lede: "The fixture you picked deserves better than a weekend of plumber's tape. We fit faucets, toilets, vanities and disposals with new shut-off valves and supply lines, so the next repair is a five-minute job instead of a wall.",
    image: faucet,
    alt: "A chrome mixer tap running water into a white basin",
    duration: "About an hour per fixture",
    warranty: "2 years on the installation",
    signs: [
      "A faucet that drips no matter how hard you close it",
      "A toilet that rocks or runs between flushes",
      "A shut-off valve that will not turn",
      "A new fixture still in its box",
    ],
    includes: [
      "Removal and disposal of the old fixture",
      "New quarter-turn shut-off valves and braided supply lines",
      "Wax-free or wax ring seal, levelled and caulked",
      "Leak check under load before we leave",
    ],
    faq: [
      {
        q: "Can you supply the fixture?",
        a: "We can, at trade price plus 10%. Most customers buy their own and we fit it — either is fine.",
      },
      {
        q: "Do you fit wall-hung toilets?",
        a: "Yes, including the in-wall carrier. Quote on site, since it depends on the wall framing.",
      },
    ],
    model: {
      unit: "fixture",
      units: "fixtures",
      max: 8,
      hours: 1.5,
      perHours: 1,
      parts: 40,
      perParts: 30,
    },
  },
  {
    slug: "repiping",
    trade: "plumbing",
    name: "Whole-home repiping",
    short: "Galvanised or polybutylene out, PEX or copper in, walls patched.",
    lede: "Old Mill and Calder Heights still run on 1940s galvanised supply lines that rust shut from the inside. Repiping is planned like a small renovation: a room-by-room schedule, water back on every evening and a pressure test at every stage.",
    image: pex,
    alt: "New PEX supply lines clipped along a basement ceiling",
    duration: "3–5 days for a typical house",
    warranty: "10 years on pipe and fittings",
    signs: [
      "Low pressure at every tap, not just one",
      "Brown water after the house sits for a weekend",
      "Grey polybutylene pipe stamped PB2110",
      "Repeated pinhole leaks in different places",
    ],
    includes: [
      "Pre-job walkthrough and written room-by-room schedule",
      "PEX-A or Type L copper, manifold or trunk-and-branch",
      "Water restored each evening during the job",
      "Drywall access holes patched ready for paint",
    ],
    faq: [
      {
        q: "Can we live at home during a repipe?",
        a: "Yes. We work one zone at a time and turn the water back on before we leave each day.",
      },
      {
        q: "PEX or copper?",
        a: "PEX is quieter, faster to fit and handles freezing better. Copper lasts as long and suits exposed runs. We will price both if you ask.",
      },
    ],
    model: {
      unit: "bathroom",
      units: "bathrooms",
      max: 4,
      hours: 24,
      perHours: 8,
      parts: 1800,
      perParts: 650,
    },
  },
  {
    slug: "panel-upgrade",
    trade: "electrical",
    name: "Panel upgrade to 200 A",
    short:
      "New breaker panel, labelled circuits, permit and inspection handled.",
    lede: "A 100-amp fuse box was fine before heat pumps, induction hobs and a car in the driveway. We replace it with a 200-amp panel, rebalance the circuits, label every breaker in plain English and stay for the city inspection.",
    image: panel,
    alt: "New breaker panels mounted on plywood in a basement during a rewire",
    duration: "One full day, power off 4–6 hours",
    warranty: "5 years on workmanship",
    signs: [
      "Breakers that trip when the dryer and microwave run together",
      "A fuse box, or a panel brand on the recall list",
      "Plans for a heat pump, EV charger or kitchen remodel",
      "Warm or discoloured breakers",
    ],
    includes: [
      "Load calculation before we quote",
      "200 A panel with surge protection and AFCI/GFCI where required",
      "Utility disconnect, permit and city inspection booked by us",
      "Printed circuit directory taped inside the door",
    ],
    faq: [
      {
        q: "How long will the power be off?",
        a: "Four to six hours on the day. We start at 8 am so the fridge is back on by early afternoon.",
      },
      {
        q: "Do I need the utility to visit?",
        a: "Usually yes, to pull the meter. We book that appointment and are on site when they arrive.",
      },
    ],
    model: {
      unit: "panel",
      units: "panels",
      max: 2,
      hours: 9,
      perHours: 6,
      parts: 1100,
      perParts: 900,
    },
  },
  {
    slug: "ev-charger",
    trade: "electrical",
    name: "EV charger installation",
    short: "Level 2 charging on its own circuit, mounted where you park.",
    lede: "A Level 2 charger fills most cars overnight. We check your panel can carry the load, run a dedicated circuit to where you actually park, mount the unit at a sensible height and test it with your car before we leave.",
    image: charger,
    alt: "A charging connector plugged into the charge port of an electric car",
    duration: "Half a day for a garage install",
    warranty: "2 years on the installation",
    signs: [
      "A new electric car charging off a 120 V outlet",
      "A charger in its box waiting for an electrician",
      "A second EV joining the driveway",
      "Charging that trips a shared breaker",
    ],
    includes: [
      "Panel capacity check and load calculation",
      "Dedicated 48 A or 40 A circuit, conduit to the parking spot",
      "Mounting, commissioning and app pairing",
      "Permit and rebate paperwork",
    ],
    faq: [
      {
        q: "Will my panel need upgrading?",
        a: "About one house in four in our area. We check before we quote, and if a load-management device avoids the upgrade we will say so.",
      },
      {
        q: "Can you install outdoors?",
        a: "Yes, with a weather-rated unit and conduit. Driveway installs add an hour or two.",
      },
    ],
    model: {
      unit: "charger",
      units: "chargers",
      max: 2,
      hours: 4,
      perHours: 2.5,
      parts: 380,
      perParts: 300,
    },
  },
  {
    slug: "outlets-switches",
    trade: "electrical",
    name: "Outlets, switches & GFCI",
    short: "Dead outlets, warm plates, USB and GFCI upgrades, dimmers.",
    lede: "A dead outlet is rarely the outlet. We trace the circuit back to the loose connection or tripped GFCI that killed it, then fit modern devices — tamper-resistant, GFCI where water is near, USB-C where you charge.",
    image: outlet,
    alt: "An electrician fitting a new outlet into a white wall",
    duration: "About 20 minutes per device",
    warranty: "2 years on parts and labour",
    signs: [
      "An outlet or switch plate that feels warm",
      "Plugs that fall out of worn sockets",
      "No GFCI near the sink, tub or garage",
      "Two-prong outlets in a house with grounded wiring",
    ],
    includes: [
      "Circuit tracing to the fault, not just the device",
      "Tamper-resistant outlets, GFCI and AFCI where required",
      "Dimmers, smart switches and USB-C combos",
      "Labelled breakers for every circuit we touch",
    ],
    faq: [
      {
        q: "Is it worth batching small jobs?",
        a: "Yes. The first hour covers our travel and setup; every extra device after that is about 20 minutes.",
      },
      {
        q: "Can you fit my smart switches?",
        a: "Yes, if the box has a neutral. If it does not we will tell you which models work without one.",
      },
    ],
    model: {
      unit: "device",
      units: "devices",
      max: 12,
      hours: 1,
      perHours: 0.35,
      parts: 18,
      perParts: 14,
    },
  },
  {
    slug: "lighting",
    trade: "electrical",
    name: "Lighting & ceiling fans",
    short: "Pendants, recessed lights, fans and outdoor fittings, hung right.",
    lede: "Swapping a fitting should not mean a wobbling fan or a pendant hanging off a plastic box. We fit rated boxes and braces, wire to code, and set recessed layouts so the light lands on the counter instead of your head.",
    image: lighting,
    alt: "An electrician on a stepladder fitting a ceiling light",
    duration: "About 40 minutes per fitting",
    warranty: "2 years on the installation",
    signs: [
      "A fan that wobbles or hums at speed",
      "Bulbs that flicker on one circuit",
      "A dark kitchen counter or staircase",
      "A new fitting with nowhere to hang it",
    ],
    includes: [
      "Fan-rated boxes and braces where needed",
      "Recessed layout drawn before we cut",
      "Dimmer matched to LED drivers to stop buzzing",
      "Old fittings removed and recycled",
    ],
    faq: [
      {
        q: "Can you add a light where there is none?",
        a: "Usually, without opening walls — we fish cable from the attic or basement. Plaster ceilings take a little longer.",
      },
      {
        q: "Do you hang high fittings?",
        a: "Up to 18 ft with our own scaffold tower. Above that we bring a lift and quote it separately.",
      },
    ],
    model: {
      unit: "fitting",
      units: "fittings",
      max: 10,
      hours: 1.25,
      perHours: 0.6,
      parts: 25,
      perParts: 15,
    },
  },
  {
    slug: "safety-inspection",
    trade: "electrical",
    name: "Electrical safety inspection",
    short:
      "A written report on the whole system, for buyers, sellers and insurers.",
    lede: "Buying a house, renting one out, or just never seen inside the panel? A master electrician tests every circuit, opens the panel, checks grounding and bonding, and gives you a written report ranked by what needs doing now and what can wait.",
    image: inspection,
    alt: "An electrician in a hard hat working inside an open distribution board",
    duration: "2–4 hours on site, report within 2 days",
    warranty: "Report valid for 12 months",
    signs: [
      "A home purchase or a new rental listing",
      "An insurer asking about knob-and-tube or aluminium wiring",
      "A house over 40 years old with no inspection on file",
      "Tripping you cannot explain",
    ],
    includes: [
      "Panel, grounding and bonding inspection",
      "Outlet polarity, GFCI and AFCI testing on every circuit",
      "Thermal scan of the panel under load",
      "Written report with photos, ranked by urgency",
    ],
    faq: [
      {
        q: "Will you fix things while you are there?",
        a: "Small safety items, yes, with your OK and at the hourly rate. Anything larger goes in the report with a fixed price.",
      },
      {
        q: "Do you inspect for home sales?",
        a: "Yes. We can send the report straight to your agent or attorney.",
      },
    ],
    model: {
      unit: "floor",
      units: "floors",
      max: 4,
      hours: 2,
      perHours: 0.75,
      parts: 0,
      perParts: 0,
    },
  },
];

/* ——— Instant estimate options ——— */

export const estimateOptions = {
  age: [
    { id: "new", label: "2000 or later", factor: 1, note: "" },
    {
      id: "mid",
      label: "1960 – 1999",
      factor: 1.1,
      note: "Older fittings take longer to free up",
    },
    {
      id: "old",
      label: "Before 1960",
      factor: 1.25,
      note: "Galvanised pipe, cloth wiring and plaster walls",
    },
  ],
  access: [
    {
      id: "open",
      label: "Open",
      detail: "Basement, utility room, under the sink",
      hours: 0,
      parts: 0,
    },
    {
      id: "tight",
      label: "Tight",
      detail: "Crawlspace, attic or behind appliances",
      hours: 0.5,
      parts: 0,
    },
    {
      id: "closed",
      label: "Behind finished walls",
      detail: "We cut access and patch ready for paint",
      hours: 1,
      parts: 60,
    },
  ],
  timing: [
    {
      id: "ahead",
      label: "Book ahead",
      detail: "Any open window, two days or more out",
      fee: 0,
    },
    {
      id: "next",
      label: "Next day",
      detail: "Booked before 4 pm for tomorrow",
      fee: rates.nextDay,
    },
    {
      id: "now",
      label: "Emergency, now",
      detail: "On-call van, nights and Sundays included",
      fee: rates.emergency,
    },
  ],
};

/* ——— Service areas (map cells are rows × columns of the drawn city grid) ——— */

export type Area = {
  slug: string;
  name: string;
  zips: string[];
  tier: "core" | "outer" | "none";
  cell: [number, number];
  arrival: string;
  note: string;
};

export const areas: Area[] = [
  {
    slug: "pinecrest",
    name: "Pinecrest",
    zips: ["40701"],
    tier: "outer",
    cell: [0, 0],
    arrival: "90–120 min",
    note: "Well pumps and pressure tanks on the larger lots past Ridge Road.",
  },
  {
    slug: "calder-heights",
    name: "Calder Heights",
    zips: ["40702"],
    tier: "core",
    cell: [0, 1],
    arrival: "45–75 min",
    note: "1920s plaster and knob-and-tube; we open walls carefully here.",
  },
  {
    slug: "larch-hill",
    name: "Larch Hill",
    zips: ["40704"],
    tier: "core",
    cell: [0, 2],
    arrival: "45–75 min",
    note: "Split-levels with original 100 A panels due an upgrade.",
  },
  {
    slug: "haddon",
    name: "Haddon",
    zips: ["40713"],
    tier: "none",
    cell: [0, 3],
    arrival: "",
    note: "Past the county line. We refer Haddon calls to a trusted local firm.",
  },
  {
    slug: "ashgrove",
    name: "Ashgrove",
    zips: ["40705", "40706"],
    tier: "outer",
    cell: [1, 0],
    arrival: "90–120 min",
    note: "Newer builds; mostly PEX, tankless heaters and EV chargers.",
  },
  {
    slug: "old-mill",
    name: "Old Mill",
    zips: ["40703"],
    tier: "core",
    cell: [1, 1],
    arrival: "30–60 min",
    note: "Our depot is on Foundry Lane. Galvanised supply lines on most streets.",
  },
  {
    slug: "riverside",
    name: "Riverside",
    zips: ["40707"],
    tier: "core",
    cell: [1, 2],
    arrival: "45–75 min",
    note: "Basements below the river line — sump pumps and backflow valves.",
  },
  {
    slug: "eastbrook",
    name: "Eastbrook",
    zips: ["40708"],
    tier: "outer",
    cell: [1, 3],
    arrival: "90–120 min",
    note: "Townhouse rows sharing sewer laterals; we camera before we dig.",
  },
  {
    slug: "brackley",
    name: "Brackley",
    zips: ["40714"],
    tier: "none",
    cell: [2, 0],
    arrival: "",
    note: "Served by its own municipal crews for mains; we refer private work.",
  },
  {
    slug: "southgate",
    name: "Southgate",
    zips: ["40709"],
    tier: "outer",
    cell: [2, 1],
    arrival: "75–105 min",
    note: "Post-war bungalows; cast-iron stacks reaching the end of their life.",
  },
  {
    slug: "fairmount",
    name: "Fairmount",
    zips: ["40710", "40711"],
    tier: "outer",
    cell: [2, 2],
    arrival: "75–105 min",
    note: "Hard water at its worst here — softeners and heater flushes.",
  },
  {
    slug: "lowell-park",
    name: "Lowell Park",
    zips: ["40712"],
    tier: "outer",
    cell: [2, 3],
    arrival: "90–120 min",
    note: "Apartment blocks; we coordinate shut-offs with building managers.",
  },
];

export const tiers = {
  core: { label: "Core zone", fee: "No trip fee" },
  outer: { label: "Outer zone", fee: `$${rates.outerZone} trip fee` },
  none: { label: "Not covered", fee: "Referred out" },
};

/* ——— Emergency ——— */

export const emergency = {
  lede: "Our on-call van leaves the Old Mill depot within 15 minutes of your call, every hour of every day. A person answers — not a menu.",
  water: [
    "Find the main shut-off — usually where the water line enters the basement or crawlspace, or beside the meter.",
    "Turn the handle clockwise until it stops, or a lever valve a quarter-turn across the pipe.",
    "Open the lowest tap in the house to drain the pressure off the burst.",
    "Switch the water heater to “vacation” or off, so it does not fire on an empty tank.",
    "Lift rugs, electronics and boxes off the wet floor, then take photos for your insurer.",
  ],
  power: [
    "Do not touch anything wet that is plugged in, or stand in water near an outlet.",
    "If it is safe to reach, switch the main breaker at the top of the panel to OFF.",
    "If you smell burning or see smoke, leave the house and call the fire department first.",
    "If the whole street is dark, it is the utility — check their outage map before calling us.",
    "Keep the fridge and freezer closed; food stays cold for about four hours.",
  ],
  triage: [
    {
      id: "burst",
      label: "Water is spraying or pouring from a pipe",
      verdict: "now",
      why: "Shut the main off now, then call. Every minute is more water in the walls.",
    },
    {
      id: "sewage",
      label: "Sewage is backing up into a drain or toilet",
      verdict: "now",
      why: "Stop using every tap and toilet in the house and call the emergency line.",
    },
    {
      id: "burning",
      label: "A burning smell, sparks or a hot outlet",
      verdict: "now",
      why: "Switch off the breaker if safe. If there is smoke, call the fire department first.",
    },
    {
      id: "nopower",
      label: "Half the house has no power",
      verdict: "next",
      why: "Often a tripped main or a failing breaker. Safe to wait for a next-day visit if nothing is hot.",
    },
    {
      id: "noheat",
      label: "No hot water",
      verdict: "next",
      why: "Uncomfortable but safe. Turn the heater off at the breaker or gas valve and book the next day.",
    },
    {
      id: "drip",
      label: "A slow drip under the sink",
      verdict: "ahead",
      why: "Put a bowl under it and close the small valve below the sink. Book any open window.",
    },
    {
      id: "slow",
      label: "A drain running slowly",
      verdict: "ahead",
      why: "Avoid chemical cleaners — they make our job dangerous. Book any open window.",
    },
  ],
  verdicts: {
    now: {
      label: "Call the emergency line now",
      detail: "Emergency dispatch applies after hours.",
    },
    next: {
      label: "Book a next-day visit",
      detail: "Book before 4 pm for tomorrow's first window.",
    },
    ahead: {
      label: "This can wait for a normal booking",
      detail: "No surcharge — any open window this week.",
    },
  },
  faq: [
    {
      q: "What does an emergency visit cost?",
      a: "The $145 dispatch fee plus labour at the standard hourly rate. The $89 call-out is waived as usual if we do the repair. You get the fixed price on site before any work.",
    },
    {
      q: "Do you really answer at 3 am?",
      a: "Yes. The on-call technician carries the emergency phone; if they are mid-job it rolls to the second van within six rings.",
    },
    {
      q: "What if it turns out not to be an emergency?",
      a: "We tell you on the phone and book a normal visit instead. You only pay emergency dispatch if we roll a van after hours.",
    },
  ],
};

/* ——— Home ——— */

export const home = {
  title: "Plumbing and electrical, fixed properly the first time.",
  lede: "Licensed plumbers and electricians across ten Calder neighbourhoods. A fixed price before we pick up a tool, two-hour arrival windows we keep, and a 24/7 line for when water or sparks won't wait.",
  heroImage: hero,
  heroAlt:
    "A plumber tightening a fitting with two pipe wrenches beside a water heater",
  heroImage2: heroElectric,
  heroAlt2: "An electrician working on the wiring of an open breaker panel",
  visit: [
    {
      when: "Booking",
      what: "Pick a two-hour window online or by phone. You get a work-order number straight away.",
    },
    {
      when: "Night before",
      what: "A text with your technician's name, photo and van number.",
    },
    {
      when: "On the way",
      what: "A heads-up 30 minutes out, with live arrival time.",
    },
    {
      when: "At the door",
      what: "Shoe covers on, problem diagnosed, a fixed written price on the tablet. Nothing starts until you approve it.",
    },
    {
      when: "Done",
      what: "Work tested, area cleaned, before-and-after photos sent with the invoice.",
    },
    {
      when: "Two years",
      what: "Labour warranty on everything we fit. If it fails, we come back free.",
    },
  ],
  estimateSample: {
    job: "Kitchen faucet swap",
    where: "1958 bungalow, Southgate",
    input: {
      slug: "fixture-install",
      qty: 1,
      age: "old",
      access: "open",
      timing: "ahead",
      zip: "40709",
    },
  },
  promises: [
    {
      title: "A fixed price before the work",
      text: "Diagnosis first, then a written price on the tablet. If the job grows, we stop and ask.",
    },
    {
      title: "Windows we keep",
      text: "Two-hour arrival windows. If we miss yours, the call-out is free.",
    },
    {
      title: "Clean when we leave",
      text: "Drop cloths, shoe covers, a vacuum in every van. Photos of the finished work.",
    },
  ],
};

export const reviews = [
  {
    quote:
      "Pipe burst at 2 am under the kitchen. Someone picked up on the third ring, talked me through the shut-off, and Marisol was in my basement forty minutes later. The bill matched what she told me before she started.",
    name: "Hannah P.",
    area: "Riverside",
    service: "leak-repair",
  },
  {
    quote:
      "They replaced our 1971 fuse box in a day and labelled every breaker in words I understand.",
    name: "Desmond O.",
    area: "Larch Hill",
    service: "panel-upgrade",
  },
  {
    quote:
      "The estimate online said $800–$1,020 for the charger and the panel check. Final invoice: $905, exactly what Kwame wrote down at the door.",
    name: "Priya and Tom K.",
    area: "Ashgrove",
    service: "ev-charger",
  },
  {
    quote:
      "Third plumber we called about the shower drain, first one who put a camera down it. Roots, fixed in one go.",
    name: "Walt B.",
    area: "Southgate",
    service: "drain-clearing",
  },
];

/* ——— About ——— */

export const about = {
  title: "Two trades, one van, since 1994.",
  lede: "Fixture started as Dot Kowalski's plumbing van and Ray Anand's electrical van parked in the same Old Mill driveway. Customers kept asking one to bring the other. Thirty years on we are fourteen technicians, still dispatched from Foundry Lane.",
  story: [
    "Most jobs in an older house cross the line between trades. A leaking water heater sits beside a corroded ground clamp; a new bathroom needs a GFCI and a vent fan as much as it needs a shower valve. Sending one licensed team means one visit, one price and one person responsible for the whole result.",
    "We still price the way Dot did in 1994: look at the problem, write down a number, then do the job for that number. The instant estimate on this site is the same arithmetic we use at the door, published so you can check our working.",
  ],
  standards: [
    {
      title: "Every technician is licensed, not just the owner",
      text: "Journeyman minimum, master licence for panels and gas. Apprentices work alongside, never alone.",
    },
    {
      title: "Background-checked and uniformed",
      text: "Name, photo and van number arrive by text the night before.",
    },
    {
      title: "Parts we would fit at home",
      text: "Brass valves, name-brand breakers, no unbranded fittings.",
    },
    {
      title: "Paid by the job, not the upsell",
      text: "Technicians earn the same whether you take the repair or the replacement.",
    },
  ],
  team: [
    {
      name: "Dorota “Dot” Kowalski",
      role: "Founder, master plumber",
      licence: "MP-40917",
      years: 34,
      knows: "Galvanised repipes in the old streets",
    },
    {
      name: "Ravi “Ray” Anand",
      role: "Founder, master electrician",
      licence: "ME-22305",
      years: 32,
      knows: "Knob-and-tube and panel replacements",
    },
    {
      name: "Marisol Ortega",
      role: "Lead plumber, on-call rota",
      licence: "JP-61842",
      years: 12,
      knows: "Burst pipes and water heaters",
    },
    {
      name: "Kwame Asante",
      role: "Electrician",
      licence: "JE-58310",
      years: 9,
      knows: "EV chargers and load management",
    },
    {
      name: "Lena Brandt",
      role: "Drain & sewer technician",
      licence: "JP-70225",
      years: 7,
      knows: "Camera inspection and root clearing",
    },
    {
      name: "Theo Marchetti",
      role: "Electrician",
      licence: "JE-66091",
      years: 5,
      knows: "Lighting layouts and smart switches",
    },
  ],
  image: switchPlate,
  imageAlt: "A white rocker light switch on a freshly painted wall",
};

/* ——— Booking ——— */

export const booking = {
  title: "Book a visit",
  lede: "Choose a two-hour window. You'll get a fixed price at the door before any work starts.",
  windows: [
    { id: "8", label: "8 – 10 am" },
    { id: "10", label: "10 am – 12" },
    { id: "12", label: "12 – 2 pm" },
    { id: "14", label: "2 – 4 pm" },
  ],
  faq: [
    {
      q: "What do I pay on the day?",
      a: "The fixed price you approved on the tablet. Card or bank transfer; no deposit for repairs.",
    },
    {
      q: "Can I change my window?",
      a: "Yes, up to 6 pm the evening before, by replying to the confirmation text.",
    },
    {
      q: "Do I need to be home?",
      a: "An adult needs to let us in and approve the price. After that you can leave us to it.",
    },
  ],
};

export const footer = {
  blurb:
    "Licensed plumbing and electrical for Calder homes. A fixed price before the work, a two-year warranty after it.",
  reminders:
    "Seasonal reminders: winter pipe prep in November, sump pump check in March. Four emails a year.",
};
