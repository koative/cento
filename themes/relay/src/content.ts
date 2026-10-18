import portAntwerp from "./assets/port-antwerp.jpg";
import quayCrane from "./assets/quay-crane.jpg";
import containerTrain from "./assets/container-train.jpg";
import railFreight from "./assets/rail-freight.jpg";
import warehouse from "./assets/warehouse.jpg";
import ocean from "./assets/ocean.jpg";
import alpineRail from "./assets/alpine-rail.jpg";
import roadTrailer from "./assets/road-trailer.jpg";
import airCargo from "./assets/air-cargo.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Relay",
  legal: "Relay Freight B.V.",
  sector: "Freight logistics platform",
  tagline: "Road, rail, sea and air freight across Europe, on one record.",
  email: "hello@relay.example",
  opsEmail: "ops@relay.example",
  phone: "+1 555 0134 2200",
  phoneHref: "tel:+155501342200",
  address: ["Waalhaven Oostzijde 112", "3087 BM Rotterdam", "The Netherlands"],
  desk: "Control tower staffed 24/7, every day of the year",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

/** The demo runs at a fixed moment so every timeline, ETA and board agrees. */
export const DEMO_NOW = "2026-10-19T10:40:00";

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/track", label: "Track" },
  { to: "/quote", label: "Quote" },
  { to: "/network", label: "Network" },
  { to: "/platform", label: "Platform" },
  { to: "/pricing", label: "Pricing" },
];

export const footerNav = [
  {
    title: "Freight",
    links: [
      { to: "/services", label: "All services" },
      { to: "/services/road-ftl", label: "Full truckload" },
      { to: "/services/groupage", label: "Groupage" },
      { to: "/services/intermodal", label: "Intermodal rail" },
      { to: "/services/short-sea", label: "Short-sea & ocean" },
      { to: "/services/air", label: "Air freight" },
    ],
  },
  {
    title: "Tools",
    links: [
      { to: "/track", label: "Track a shipment" },
      { to: "/quote", label: "Quote & book" },
      { to: "/network", label: "Hubs & cut-offs" },
      { to: "/app", label: "Shipments demo" },
      { to: "/signin", label: "Sign in" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/platform", label: "Platform" },
      { to: "/pricing", label: "Pricing" },
      { to: "/customers", label: "Customers" },
      { to: "/changelog", label: "Changelog" },
      { to: "/about", label: "About & careers" },
    ],
  },
];

/* ───────────────────────── Network ───────────────────────── */

export type Mode = "road" | "rail" | "sea" | "air";

export const modeLabel: Record<Mode, string> = {
  road: "Road",
  rail: "Rail",
  sea: "Sea",
  air: "Air",
};

export type Hub = {
  code: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  kind: "Gateway" | "Port" | "Rail terminal" | "Air hub" | "Cross-dock";
  modes: Mode[];
  site: string;
  cutoff: string;
  hours: string;
  docks: number;
  note: string;
};

export const hubs: Hub[] = [
  {
    code: "RTM",
    city: "Rotterdam",
    country: "NL",
    lat: 51.92,
    lon: 4.48,
    kind: "Gateway",
    modes: ["road", "rail", "sea"],
    site: "Waalhaven Oostzijde 112",
    cutoff: "18:30",
    hours: "24/7",
    docks: 64,
    note: "Head office, control tower and the busiest cross-dock in the network.",
  },
  {
    code: "ANR",
    city: "Antwerp",
    country: "BE",
    lat: 51.26,
    lon: 4.4,
    kind: "Port",
    modes: ["road", "sea"],
    site: "Kanaaldok B2, Quay 1333",
    cutoff: "17:00",
    hours: "Mon–Sat 05:00–23:00",
    docks: 28,
    note: "Container release and short-sea feeder desk for the Scheldt terminals.",
  },
  {
    code: "FXT",
    city: "Felixstowe",
    country: "GB",
    lat: 51.96,
    lon: 1.33,
    kind: "Port",
    modes: ["road", "sea"],
    site: "Dooley Road, Unit 9",
    cutoff: "15:00",
    hours: "Mon–Fri 06:00–22:00",
    docks: 14,
    note: "UK import clearance and the daily ro-ro link to Rotterdam.",
  },
  {
    code: "LEH",
    city: "Le Havre",
    country: "FR",
    lat: 49.49,
    lon: 0.12,
    kind: "Port",
    modes: ["road", "sea"],
    site: "Route de l’Estuaire 40",
    cutoff: "16:30",
    hours: "Mon–Sat 05:00–22:00",
    docks: 18,
    note: "Seine gateway for deep-sea boxes bound for Paris and Lyon.",
  },
  {
    code: "CDG",
    city: "Paris-Roissy",
    country: "FR",
    lat: 49.01,
    lon: 2.55,
    kind: "Air hub",
    modes: ["road", "air"],
    site: "Zone de Fret 4, Bât. 3410",
    cutoff: "19:00",
    hours: "24/7",
    docks: 22,
    note: "Air export screening and the north–south road trunk.",
  },
  {
    code: "LYS",
    city: "Lyon",
    country: "FR",
    lat: 45.73,
    lon: 4.88,
    kind: "Cross-dock",
    modes: ["road", "rail"],
    site: "Port Edouard Herriot, Quai 6",
    cutoff: "17:30",
    hours: "Mon–Sat 04:00–22:00",
    docks: 30,
    note: "Groupage sort for the Rhône corridor and Alpine crossings.",
  },
  {
    code: "BCN",
    city: "Barcelona",
    country: "ES",
    lat: 41.35,
    lon: 2.16,
    kind: "Port",
    modes: ["road", "rail", "sea"],
    site: "ZAL Port, Carrer 62",
    cutoff: "16:00",
    hours: "Mon–Fri 05:00–22:00",
    docks: 26,
    note: "Iberian entry for Mediterranean short-sea and the Lyon trunk.",
  },
  {
    code: "MAD",
    city: "Madrid",
    country: "ES",
    lat: 40.4,
    lon: -3.62,
    kind: "Cross-dock",
    modes: ["road", "rail", "air"],
    site: "Centro de Carga Aérea, Nave 7",
    cutoff: "17:00",
    hours: "Mon–Sat 05:00–23:00",
    docks: 24,
    note: "Iberian distribution and air cargo from Barajas.",
  },
  {
    code: "MIL",
    city: "Milan",
    country: "IT",
    lat: 45.5,
    lon: 9.13,
    kind: "Rail terminal",
    modes: ["road", "rail"],
    site: "Terminal Smistamento, Binario 14",
    cutoff: "16:00",
    hours: "Mon–Sat 05:00–22:00",
    docks: 20,
    note: "Southern end of the Duisburg rail shuttle; Italian last mile.",
  },
  {
    code: "MUC",
    city: "Munich",
    country: "DE",
    lat: 48.2,
    lon: 11.65,
    kind: "Cross-dock",
    modes: ["road", "rail"],
    site: "Containerbahnhof Riem, Halle 2",
    cutoff: "18:00",
    hours: "Mon–Sat 04:00–23:00",
    docks: 32,
    note: "Brenner and Tauern trunk lines meet here.",
  },
  {
    code: "FRA",
    city: "Frankfurt",
    country: "DE",
    lat: 50.04,
    lon: 8.56,
    kind: "Air hub",
    modes: ["road", "air"],
    site: "CargoCity Süd, Geb. 558",
    cutoff: "20:00",
    hours: "24/7",
    docks: 26,
    note: "Temperature-controlled air hub with GDP-certified rooms.",
  },
  {
    code: "DUI",
    city: "Duisburg",
    country: "DE",
    lat: 51.45,
    lon: 6.73,
    kind: "Rail terminal",
    modes: ["road", "rail"],
    site: "logport I, Gleis 7",
    cutoff: "17:00",
    hours: "24/7",
    docks: 34,
    note: "Rhine–Ruhr rail head for Milan, Warsaw and Vienna shuttles.",
  },
  {
    code: "HAM",
    city: "Hamburg",
    country: "DE",
    lat: 53.53,
    lon: 9.95,
    kind: "Port",
    modes: ["road", "rail", "sea"],
    site: "Altenwerder Damm 20",
    cutoff: "17:30",
    hours: "24/7",
    docks: 40,
    note: "Baltic feeders, Nordic road trunk and the Prague rail link.",
  },
  {
    code: "BER",
    city: "Berlin",
    country: "DE",
    lat: 52.37,
    lon: 13.52,
    kind: "Cross-dock",
    modes: ["road"],
    site: "GVZ Großbeeren, Halle C",
    cutoff: "18:00",
    hours: "Mon–Sat 04:00–22:00",
    docks: 24,
    note: "Eastbound groupage sort for Poland and the Baltics.",
  },
  {
    code: "LEJ",
    city: "Leipzig",
    country: "DE",
    lat: 51.42,
    lon: 12.24,
    kind: "Air hub",
    modes: ["road", "rail", "air"],
    site: "Frachtzentrum Nord, Tor 5",
    cutoff: "21:00",
    hours: "24/7",
    docks: 30,
    note: "Night air hub and central German road crossroads.",
  },
  {
    code: "PRG",
    city: "Prague",
    country: "CZ",
    lat: 50.1,
    lon: 14.26,
    kind: "Cross-dock",
    modes: ["road", "rail"],
    site: "Rudná Logistics Park, Hala 4",
    cutoff: "16:30",
    hours: "Mon–Fri 05:00–22:00",
    docks: 16,
    note: "Czech distribution and the Hamburg rail shuttle.",
  },
  {
    code: "VIE",
    city: "Vienna",
    country: "AT",
    lat: 48.12,
    lon: 16.56,
    kind: "Rail terminal",
    modes: ["road", "rail"],
    site: "Terminal Inzersdorf, Gleis 3",
    cutoff: "16:00",
    hours: "Mon–Sat 05:00–22:00",
    docks: 18,
    note: "Danube corridor rail terminal and Balkan road departures.",
  },
  {
    code: "BUD",
    city: "Budapest",
    country: "HU",
    lat: 47.43,
    lon: 19.26,
    kind: "Cross-dock",
    modes: ["road", "rail"],
    site: "BILK Kombiterminál, Raktár 6",
    cutoff: "15:30",
    hours: "Mon–Fri 05:00–21:00",
    docks: 14,
    note: "Hungarian and Romanian last mile.",
  },
  {
    code: "WAW",
    city: "Warsaw",
    country: "PL",
    lat: 52.17,
    lon: 20.97,
    kind: "Cross-dock",
    modes: ["road", "rail"],
    site: "Ul. Tasmowa 9, Magazyn B",
    cutoff: "16:30",
    hours: "Mon–Sat 05:00–22:00",
    docks: 22,
    note: "Polish distribution and the eastern rail head.",
  },
  {
    code: "GDN",
    city: "Gdańsk",
    country: "PL",
    lat: 54.4,
    lon: 18.66,
    kind: "Port",
    modes: ["road", "rail", "sea"],
    site: "Ul. Kontenerowa 7",
    cutoff: "15:00",
    hours: "Mon–Fri 06:00–22:00",
    docks: 12,
    note: "Baltic short-sea calls from Hamburg and Rotterdam.",
  },
  {
    code: "CPH",
    city: "Copenhagen",
    country: "DK",
    lat: 55.63,
    lon: 12.65,
    kind: "Cross-dock",
    modes: ["road"],
    site: "Kraftværksvej 31, Port 4",
    cutoff: "17:00",
    hours: "Mon–Fri 05:00–22:00",
    docks: 16,
    note: "Øresund road crossing into Sweden.",
  },
  {
    code: "GOT",
    city: "Gothenburg",
    country: "SE",
    lat: 57.69,
    lon: 11.85,
    kind: "Port",
    modes: ["road", "sea"],
    site: "Arendal Logistikcenter, Port 11",
    cutoff: "15:30",
    hours: "Mon–Fri 06:00–21:00",
    docks: 14,
    note: "Nordic gateway for ro-ro sailings from Rotterdam and Hamburg.",
  },
];

export type Lane = { from: string; to: string; mode: Mode; departures: string };

export const lanes: Lane[] = [
  ...(
    [
      ["RTM", "ANR"],
      ["RTM", "DUI"],
      ["RTM", "HAM"],
      ["ANR", "CDG"],
      ["LEH", "CDG"],
      ["CDG", "LYS"],
      ["LYS", "MIL"],
      ["LYS", "BCN"],
      ["BCN", "MAD"],
      ["DUI", "FRA"],
      ["FRA", "MUC"],
      ["MUC", "MIL"],
      ["MUC", "VIE"],
      ["VIE", "BUD"],
      ["HAM", "BER"],
      ["HAM", "CPH"],
      ["CPH", "GOT"],
      ["BER", "WAW"],
      ["BER", "LEJ"],
      ["LEJ", "PRG"],
      ["PRG", "VIE"],
      ["WAW", "GDN"],
      ["FRA", "LEJ"],
      ["DUI", "HAM"],
    ] as const
  ).map(([from, to]) => ({
    from,
    to,
    mode: "road" as const,
    departures: "Daily, Mon–Sat",
  })),
  ...(
    [
      ["RTM", "DUI", "Daily shuttle"],
      ["DUI", "MIL", "10 shuttles a week"],
      ["DUI", "WAW", "6 shuttles a week"],
      ["HAM", "PRG", "5 shuttles a week"],
      ["PRG", "VIE", "4 shuttles a week"],
      ["VIE", "BUD", "5 shuttles a week"],
      ["HAM", "MUC", "6 shuttles a week"],
      ["BCN", "LYS", "4 shuttles a week"],
      ["MAD", "BCN", "5 shuttles a week"],
      ["GDN", "WAW", "3 shuttles a week"],
    ] as const
  ).map(([from, to, departures]) => ({
    from,
    to,
    mode: "rail" as const,
    departures,
  })),
  ...(
    [
      ["RTM", "FXT", "Daily ro-ro"],
      ["ANR", "FXT", "5 sailings a week"],
      ["LEH", "FXT", "3 sailings a week"],
      ["RTM", "GOT", "4 sailings a week"],
      ["HAM", "GOT", "3 sailings a week"],
      ["HAM", "GDN", "2 sailings a week"],
    ] as const
  ).map(([from, to, departures]) => ({
    from,
    to,
    mode: "sea" as const,
    departures,
  })),
  ...(
    [
      ["CDG", "MAD"],
      ["FRA", "MAD"],
      ["LEJ", "MAD"],
      ["LEJ", "CDG"],
    ] as const
  ).map(([from, to]) => ({
    from,
    to,
    mode: "air" as const,
    departures: "Nightly, Sun–Fri",
  })),
];

/* ───────────────────────── Services ───────────────────────── */

export type Service = {
  slug: string;
  name: string;
  mode: Mode;
  quoteMode?: QuoteMode;
  image: string;
  alt: string;
  summary: string;
  lead: string;
  transit: string;
  unit: string;
  from: string;
  specs: [string, string][];
  steps: { title: string; text: string }[];
  includes: string[];
  suits: string[];
  faqs: { q: string; a: string }[];
};

export type QuoteMode = "ftl" | "groupage" | "rail" | "sea" | "air";

export const services: Service[] = [
  {
    slug: "road-ftl",
    name: "Full truckload",
    mode: "road",
    quoteMode: "ftl",
    image: roadTrailer,
    alt: "A blue tarpaulin semi-trailer on a motorway verge",
    summary:
      "A dedicated trailer from your dock to theirs, no stops in between.",
    lead: "One shipper, one trailer, one seal. We match your load to a vetted carrier on our contracted lanes, assign a named driver team, and stream every GPS ping and door event into your shipment record until the POD is signed.",
    transit: "1–3 days within the EU",
    unit: "13.6 m tautliner · 33 pallets · 24 t",
    from: "€1.36 per km",
    specs: [
      ["Equipment", "Tautliner, box, reefer (−25 °C to +25 °C), mega trailer"],
      ["Capacity", "33 EUR pallets, 24 t payload, 90 m³ (mega: 100 m³)"],
      [
        "Booking lead time",
        "Same day before 11:00, otherwise next working day",
      ],
      ["Driver teams", "Double-manned on lanes over 900 km"],
      ["Tracking", "GPS every 5 minutes, door and temperature sensors"],
      ["Paperwork", "eCMR, digital POD with photo and signature"],
    ],
    steps: [
      {
        title: "Book",
        text: "Quote and book online or by API. Your rate is fixed when you confirm.",
      },
      {
        title: "Assign",
        text: "We match a carrier on a contracted lane and send you plate and driver within two hours.",
      },
      {
        title: "Collect",
        text: "The driver arrives inside your slot, scans the seal and the eCMR opens.",
      },
      {
        title: "Run",
        text: "Live position, ETA and temperature stream into your record and your customer’s link.",
      },
      {
        title: "Deliver",
        text: "POD with photo and signature lands in your account before the trailer leaves the dock.",
      },
    ],
    includes: [
      "Two hours free loading and unloading",
      "Fuel and tolls in the quoted price",
      "€8.33/kg CMR liability, top-up cover on request",
      "Named control-tower contact per load",
    ],
    suits: [
      "Production inbound with a fixed slot",
      "Retail replenishment, full trailers",
      "High-value goods that should not be re-handled",
    ],
    faqs: [
      {
        q: "Can I book a part load at a full truckload rate?",
        a: "Yes. From 18 pallets a dedicated trailer is often cheaper than groupage; the quote tool shows both so you can compare.",
      },
      {
        q: "What happens if loading runs over?",
        a: "Waiting time after the two free hours is billed at €45 per started hour, and you see the clock running on the shipment record.",
      },
    ],
  },
  {
    slug: "groupage",
    name: "Groupage",
    mode: "road",
    quoteMode: "groupage",
    image: warehouse,
    alt: "Pallet shuttle moving a wooden pallet between steel racking aisles",
    summary:
      "Pallets that share a trailer and a fixed timetable through our cross-docks.",
    lead: "Less-than-truckload freight rides our scheduled trunk departures: collected in the afternoon, sorted overnight at the nearest Relay cross-dock and delivered on a published day. You pay per pallet place, not per trailer.",
    transit: "2–5 days, timetabled",
    unit: "1–17 pallets · up to 1,200 kg each",
    from: "€38 per pallet + €0.082 per pallet-km",
    specs: [
      [
        "Pallet sizes",
        "EUR (120×80), industrial (120×100), half and quarter pallets",
      ],
      ["Max per pallet", "1,200 kg, 2.2 m high, stackable or non-stackable"],
      ["Departures", "Every working day from 22 hubs"],
      ["Delivery", "Tail-lift, booked slots and Saturday delivery available"],
      ["Sort", "Overnight cross-dock with scan at every handoff"],
      ["Paperwork", "Pallet labels generated at booking, digital POD"],
    ],
    steps: [
      {
        title: "Label",
        text: "Print our pallet labels at booking: one barcode per pallet, scanned at every handoff.",
      },
      {
        title: "Collect",
        text: "Afternoon collection by the local partner van or rigid truck.",
      },
      {
        title: "Sort",
        text: "Overnight at the origin cross-dock: weighed, measured, photographed, loaded to trunk.",
      },
      {
        title: "Trunk",
        text: "Timetabled linehaul to the destination hub, sealed and tracked.",
      },
      {
        title: "Deliver",
        text: "Morning delivery run with a 2-hour window sent to the consignee the evening before.",
      },
    ],
    includes: [
      "Per-pallet tracking and photos",
      "Consignee notification by SMS and email",
      "Re-delivery attempt at no charge",
      "Dimension check with photo at the first hub",
    ],
    suits: [
      "Webshops shipping B2B pallet orders",
      "Manufacturers with daily part loads",
      "Seasonal peaks above your contract volume",
    ],
    faqs: [
      {
        q: "Do you charge for remeasured pallets?",
        a: "Only if the measured size or weight is outside your booking, and the hub photo is attached to the invoice line.",
      },
      {
        q: "Can the driver call ahead?",
        a: "Yes. Add a phone-ahead request at booking and the driver calls the consignee 30 minutes out.",
      },
    ],
  },
  {
    slug: "intermodal",
    name: "Intermodal rail",
    mode: "rail",
    quoteMode: "rail",
    image: alpineRail,
    alt: "A red electric locomotive hauling a container train through an Alpine valley under a motorway viaduct",
    summary:
      "Road at both ends, rail in the middle: the long haul with a fraction of the emissions.",
    lead: "Our shuttles run between Rotterdam, Duisburg, Milan, Warsaw, Hamburg, Prague and Vienna. Trailers and swap bodies are craned onto the train at the rail head and collected by a Relay truck at the other end, so you book one door-to-door move.",
    transit: "2–4 days door to door",
    unit: "45 ft pallet-wide box or P400 trailer · 33 pallets",
    from: "€0.94 per km + €310 terminal handling",
    specs: [
      [
        "Shuttles",
        "Duisburg–Milan 10 a week, Rotterdam–Duisburg daily, Hamburg–Prague 5 a week",
      ],
      [
        "Units",
        "45 ft pallet-wide container, swap body, craneable P400 trailer",
      ],
      ["CO₂e", "Up to 72% lower than road on the same lane (well-to-wheel)"],
      ["Weight", "Up to 29 t gross in the box, no Sunday driving bans"],
      ["Cut-off", "Gate-in by 17:00 for next departure"],
      ["Tracking", "Wagon position from the rail operator plus our truck legs"],
    ],
    steps: [
      {
        title: "Pre-haul",
        text: "A Relay truck collects the box at your dock and drives it to the rail head.",
      },
      {
        title: "Gate-in",
        text: "Terminal gate scan, damage photos and crane-on to the booked wagon.",
      },
      {
        title: "Rail",
        text: "The shuttle runs overnight; wagon position updates every 15 minutes.",
      },
      {
        title: "On-carriage",
        text: "Crane-off, gate-out and final truck leg to the consignee.",
      },
    ],
    includes: [
      "Door-to-door booking and one invoice",
      "CO₂e report per shipment (GLEC framework)",
      "Weekend and holiday running",
      "Truck back-up if a train is cancelled",
    ],
    suits: [
      "Heavy loads that max out a truck",
      "Regular lanes over 600 km",
      "Shippers with a science-based emissions target",
    ],
    faqs: [
      {
        q: "What if a train is cancelled?",
        a: "We move the unit by road at the rail price on any lane where the delay would exceed 24 hours.",
      },
      {
        q: "Can you take dangerous goods by rail?",
        a: "Most ADR classes travel under RID on our shuttles; classes 1 and 7 are excluded.",
      },
    ],
  },
  {
    slug: "short-sea",
    name: "Short-sea & ocean",
    mode: "sea",
    quoteMode: "sea",
    image: ocean,
    alt: "A loaded container ship with a tug alongside, under grey cloud",
    summary:
      "Ro-ro and feeder sailings to the UK, Scandinavia and the Baltic, plus deep-sea boxes.",
    lead: "We hold weekly space on ro-ro and container feeder sailings out of Rotterdam, Antwerp, Le Havre and Hamburg. For deep-sea, we book the box with the line, handle the port side and bring it inland by road or rail.",
    transit: "1–6 days short-sea · 18–40 days deep-sea",
    unit: "20 ft, 40 ft, 40 ft HC, 45 ft · unaccompanied trailers",
    from: "€0.58 per km + €420 port charges",
    specs: [
      [
        "Sailings",
        "Rotterdam–Felixstowe daily, Rotterdam–Gothenburg 3 a week, Hamburg–Gdańsk 3 a week",
      ],
      [
        "Equipment",
        "Dry, reefer, open-top, flat-rack; unaccompanied trailers on ro-ro",
      ],
      [
        "Port services",
        "Release, customs, VGM, terminal booking, demurrage watch",
      ],
      ["Free time", "5 days at destination terminal on our contracts"],
      ["Tracking", "Vessel AIS, terminal events and our road legs"],
      ["Documents", "Bill of lading, sea waybill, packing list in your record"],
    ],
    steps: [
      {
        title: "Book space",
        text: "We confirm the sailing and the box or trailer slot within four working hours.",
      },
      {
        title: "Port in",
        text: "Truck or rail to the terminal, VGM weighed, export declaration lodged.",
      },
      {
        title: "Sail",
        text: "Vessel position from AIS; ETA re-calculated after every port call.",
      },
      {
        title: "Release",
        text: "Import clearance, terminal release, slot booking for pick-up.",
      },
      {
        title: "Deliver",
        text: "Box delivered and returned empty before free time runs out.",
      },
    ],
    includes: [
      "Demurrage and detention watch with alerts",
      "Export and import declarations",
      "Unaccompanied trailer service",
      "One invoice, port costs itemised",
    ],
    suits: [
      "UK and Nordic distribution",
      "Baltic supply chains",
      "Importers who want one party from quay to door",
    ],
    faqs: [
      {
        q: "Who pays demurrage?",
        a: "You do, but you will see the free-time clock on every box and get an alert 48 hours before it ends.",
      },
      {
        q: "Do you handle post-Brexit UK customs?",
        a: "Yes. Our Felixstowe desk lodges import entries and safety and security declarations for every ro-ro unit.",
      },
    ],
  },
  {
    slug: "air",
    name: "Air freight",
    mode: "air",
    quoteMode: "air",
    image: airCargo,
    alt: "A tarped crate on a low-loader trailer being moved toward the open rear door of a cargo aircraft",
    summary:
      "Next-flight-out and consolidated air cargo through Frankfurt, Leipzig, Paris and Madrid.",
    lead: "For the parts that stop a line or the vaccines that cannot wait. We screen at our own air hubs, build the ULDs ourselves and hand over directly to the airline, with a courier-on-board option when even that is too slow.",
    transit: "Same day to 2 days in Europe",
    unit: "Per chargeable kg · loose or ULD",
    from: "€2.85 per chargeable kg + €90 handling",
    specs: [
      ["Hubs", "Frankfurt, Leipzig, Paris-Roissy, Madrid"],
      ["Products", "Next flight out, standard consolidation, courier on board"],
      ["Security", "Known consignor setup, X-ray and ETD screening on site"],
      ["Temperature", "2–8 °C and 15–25 °C rooms, GDP certified at Frankfurt"],
      ["Dangerous goods", "IATA DGR classes 2, 3, 6.2, 8 and 9"],
      ["Chargeable weight", "Greater of actual weight or volume ÷ 6,000"],
    ],
    steps: [
      {
        title: "Collect",
        text: "Pick-up within 90 minutes for next flight out, otherwise same afternoon.",
      },
      {
        title: "Screen",
        text: "X-ray or ETD at our air hub, then build-up into the ULD.",
      },
      {
        title: "Fly",
        text: "Handover to the airline; flight number and airway bill in your record.",
      },
      {
        title: "Deliver",
        text: "Recovery at the destination hub and dedicated van to the door.",
      },
    ],
    includes: [
      "Airway bill and screening certificate",
      "Temperature log for GDP freight",
      "Courier-on-board quotes within one hour",
      "Proactive rebooking on missed connections",
    ],
    suits: [
      "Aircraft-on-ground and line-down parts",
      "Pharma and clinical trial material",
      "Launch stock with a fixed date",
    ],
    faqs: [
      {
        q: "How fast is next flight out?",
        a: "Typically 6 to 14 hours door to door between our four air hubs, depending on the day’s flight schedule.",
      },
      {
        q: "Can you fly lithium batteries?",
        a: "Yes, as UN3480/3481 under IATA section II or I, with our DG desk checking your declaration before collection.",
      },
    ],
  },
  {
    slug: "warehousing",
    name: "Warehousing & cross-dock",
    mode: "road",
    image: railFreight,
    alt: "Two blue electric locomotives hauling containers and a tank wagon past a meadow",
    summary:
      "Short-term storage, pick and pack and cross-docking at the hubs your freight already passes.",
    lead: "Space at 22 hubs, billed by the pallet-day. Stage inbound containers, split full loads into store deliveries, or hold seasonal stock near the market, with stock levels visible in the same account as your shipments.",
    transit: "Same-day cross-dock · storage by the pallet-day",
    unit: "Pallet place · pick line · cross-dock move",
    from: "€0.62 per pallet-day",
    specs: [
      ["Space", "41,000 pallet places across the network"],
      ["Services", "Cross-dock, storage, pick and pack, labelling, kitting"],
      ["Inbound", "Container devanning with photo report within 4 hours"],
      ["Systems", "Stock and orders in the Relay platform, EDI or API"],
      ["Security", "TAPA FSR level A at Rotterdam, Frankfurt and Leipzig"],
      ["Temperature", "Ambient everywhere, 2–8 °C at Frankfurt and Rotterdam"],
    ],
    steps: [
      {
        title: "Receive",
        text: "Count, photograph and label every pallet at the dock.",
      },
      {
        title: "Store or split",
        text: "Put away by SKU, or split immediately onto outbound trunks.",
      },
      { title: "Pick", text: "Orders before 14:00 leave the same day." },
      {
        title: "Ship",
        text: "Outbound joins the scheduled Relay departures from that hub.",
      },
    ],
    includes: [
      "Stock visibility next to your shipments",
      "Monthly cycle counts",
      "Returns handling",
      "No minimum term",
    ],
    suits: [
      "Importers staging containers",
      "Brands with seasonal peaks",
      "Retail store replenishment",
    ],
    faqs: [
      {
        q: "Is there a minimum volume?",
        a: "No minimum term; storage is billed per pallet-day from the day it arrives.",
      },
      {
        q: "Can you handle returns?",
        a: "Yes: inspect, grade, re-label and put back to stock, with photos in your account.",
      },
    ],
  },
  {
    slug: "customs",
    name: "Customs brokerage",
    mode: "sea",
    image: quayCrane,
    alt: "A ship-to-shore container crane silhouetted against a clear sky",
    summary:
      "Import, export and transit declarations lodged by our own licensed brokers.",
    lead: "Every border your freight crosses needs paperwork that matches the cargo. Our brokers in Rotterdam, Felixstowe and Hamburg file declarations from the commercial invoice you upload, and flag mismatches before the truck reaches the border.",
    transit: "Declarations within 2 working hours",
    unit: "Per declaration",
    from: "€45 per declaration",
    specs: [
      ["Declarations", "Import, export, T1/T2 transit, ATA carnet"],
      ["Borders", "EU external, UK, Switzerland, Norway"],
      ["Status", "Authorised Economic Operator (AEO-F)"],
      ["Duty", "Deferment account and postponed VAT accounting"],
      [
        "Documents",
        "Invoice, packing list and certificates of origin in your record",
      ],
      ["Hours", "Brokers on shift 06:00–22:00, on call overnight"],
    ],
    steps: [
      {
        title: "Upload",
        text: "Attach the commercial invoice and packing list to the shipment.",
      },
      {
        title: "Classify",
        text: "A broker checks HS codes, origin and values against the cargo.",
      },
      {
        title: "Lodge",
        text: "The declaration is filed and the MRN appears on the shipment record.",
      },
      {
        title: "Clear",
        text: "Release status is pushed to the driver before arrival at the border.",
      },
    ],
    includes: [
      "HS classification check",
      "Pre-arrival lodgement",
      "Duty and VAT statements monthly",
      "Audit trail for every declaration",
    ],
    suits: [
      "UK and Swiss trade lanes",
      "Importers without an in-house broker",
      "Exporters needing preferential origin",
    ],
    faqs: [
      {
        q: "Can I use my own broker?",
        a: "Yes. Add their contact to the shipment and we hand over documents automatically.",
      },
      {
        q: "Do you advance duties?",
        a: "On our deferment account for approved customers, invoiced monthly with the statement.",
      },
    ],
  },
];

/* ───────────────────────── Shipments (tracking + app) ───────────────────────── */

export type Status =
  "Booked" | "In transit" | "Out for delivery" | "Delivered" | "Exception";

export type Shipment = {
  id: string;
  ref: string;
  customer: string;
  route: string[];
  mode: Mode;
  service: string;
  pallets: number;
  weight: number;
  pickup: string;
  status: Status;
  progress: number;
  cost: number;
  unit: string;
  exception?: string;
  pod?: string;
};

export const shipments: Shipment[] = [
  {
    id: "RLY-4821-0937",
    ref: "PO 77120",
    customer: "Form & Field",
    route: ["RTM", "DUI", "FRA", "MUC", "MIL"],
    mode: "road",
    service: "road-ftl",
    pallets: 26,
    weight: 9840,
    pickup: "2026-10-18T06:30:00",
    status: "In transit",
    progress: 0.58,
    cost: 1964,
    unit: "Trailer NL-48-KZT",
  },
  {
    id: "RLY-4821-1104",
    ref: "SO-55819",
    customer: "Morrow Goods",
    route: ["ANR", "CDG", "LYS", "BCN"],
    mode: "road",
    service: "groupage",
    pallets: 6,
    weight: 2160,
    pickup: "2026-10-15T14:00:00",
    status: "Delivered",
    progress: 1,
    cost: 1188,
    unit: "Trunk T-ANR-412",
    pod: "M. Vidal",
  },
  {
    id: "RLY-4822-0219",
    ref: "4500018832",
    customer: "Studio North",
    route: ["HAM", "CPH", "GOT"],
    mode: "road",
    service: "groupage",
    pallets: 4,
    weight: 1310,
    pickup: "2026-10-17T13:00:00",
    status: "Exception",
    progress: 1,
    cost: 642,
    unit: "Trunk T-HAM-207",
    exception:
      "Delivery refused: consignee dock closed for stocktake. Re-delivery booked for 20 Oct, 08:00–10:00.",
  },
  {
    id: "RLY-4822-0388",
    ref: "CG-2026-311",
    customer: "Common Ground Coffee",
    route: ["RTM", "FXT"],
    mode: "sea",
    service: "short-sea",
    pallets: 18,
    weight: 11200,
    pickup: "2026-10-18T09:00:00",
    status: "Exception",
    progress: 0.99,
    cost: 1420,
    unit: "Unaccompanied trailer RLYU 448120",
    exception:
      "Held by UK customs at Felixstowe: commodity code on the invoice does not match the entry. Corrected invoice requested.",
  },
  {
    id: "RLY-4822-0412",
    ref: "KT-88301",
    customer: "Kessler Tiles",
    route: ["DUI", "MIL"],
    mode: "rail",
    service: "intermodal",
    pallets: 30,
    weight: 26800,
    pickup: "2026-10-18T15:00:00",
    status: "In transit",
    progress: 0.42,
    cost: 1544,
    unit: "Box RLYU 450227 · Wagon 31 80 4955 112-4",
  },
  {
    id: "RLY-4822-0570",
    ref: "HC-PO-9921",
    customer: "Hallam Cycles",
    route: ["LEJ", "MAD"],
    mode: "air",
    service: "air",
    pallets: 2,
    weight: 380,
    pickup: "2026-10-16T16:00:00",
    status: "Delivered",
    progress: 1,
    cost: 1373,
    unit: "AWB 176-4410 2283",
    pod: "J. Ortega",
  },
  {
    id: "RLY-4822-0611",
    ref: "BW-14077",
    customer: "Brightwater Drinks",
    route: ["MUC", "VIE", "BUD"],
    mode: "road",
    service: "groupage",
    pallets: 9,
    weight: 6120,
    pickup: "2026-10-17T15:00:00",
    status: "Out for delivery",
    progress: 0.96,
    cost: 986,
    unit: "Trunk T-MUC-118",
  },
  {
    id: "RLY-4822-0733",
    ref: "VP-CT-0042",
    customer: "Verdane Pharma",
    route: ["FRA", "MAD"],
    mode: "air",
    service: "air",
    pallets: 1,
    weight: 145,
    pickup: "2026-10-19T05:30:00",
    status: "In transit",
    progress: 0.4,
    cost: 912,
    unit: "AWB 020-8812 6471 · 2–8 °C",
  },
  {
    id: "RLY-4822-0858",
    ref: "OO-3381",
    customer: "Oslo Objects",
    route: ["BER", "WAW", "GDN"],
    mode: "road",
    service: "groupage",
    pallets: 5,
    weight: 1840,
    pickup: "2026-10-19T14:00:00",
    status: "Booked",
    progress: 0,
    cost: 704,
    unit: "Collection 14:00–16:00",
  },
  {
    id: "RLY-4822-0902",
    ref: "SS-10218",
    customer: "Sunday Supply",
    route: ["LYS", "MIL"],
    mode: "road",
    service: "road-ftl",
    pallets: 33,
    weight: 18400,
    pickup: "2026-10-16T07:00:00",
    status: "Delivered",
    progress: 1,
    cost: 812,
    unit: "Trailer FR-GK-512-PL",
    pod: "A. Ferri",
  },
  {
    id: "RLY-4822-0977",
    ref: "PP-77-410",
    customer: "Paper & Pine",
    route: ["HAM", "GDN"],
    mode: "sea",
    service: "short-sea",
    pallets: 20,
    weight: 14300,
    pickup: "2026-10-17T11:00:00",
    status: "In transit",
    progress: 0.62,
    cost: 1260,
    unit: "Box RLYU 451903 · MV Baltic Wren",
  },
  {
    id: "RLY-4823-0045",
    ref: "PO 77188",
    customer: "Form & Field",
    route: ["RTM", "HAM", "BER"],
    mode: "road",
    service: "road-ftl",
    pallets: 22,
    weight: 7900,
    pickup: "2026-10-20T07:00:00",
    status: "Booked",
    progress: 0,
    cost: 1210,
    unit: "Carrier assigned 19 Oct, 12:00",
  },
  {
    id: "RLY-4823-0118",
    ref: "KT-88342",
    customer: "Kessler Tiles",
    route: ["BCN", "LYS", "CDG"],
    mode: "road",
    service: "groupage",
    pallets: 8,
    weight: 7440,
    pickup: "2026-10-18T13:00:00",
    status: "In transit",
    progress: 0.31,
    cost: 1342,
    unit: "Trunk T-BCN-033",
  },
  {
    id: "RLY-4823-0164",
    ref: "SO-55902",
    customer: "Morrow Goods",
    route: ["PRG", "VIE"],
    mode: "road",
    service: "groupage",
    pallets: 3,
    weight: 920,
    pickup: "2026-10-16T13:00:00",
    status: "Delivered",
    progress: 1,
    cost: 318,
    unit: "Trunk T-PRG-090",
    pod: "K. Steiner",
  },
  {
    id: "RLY-4823-0230",
    ref: "AR-2219",
    customer: "Atelier Ruhr",
    route: ["DUI", "RTM"],
    mode: "rail",
    service: "intermodal",
    pallets: 24,
    weight: 15200,
    pickup: "2026-10-18T18:00:00",
    status: "In transit",
    progress: 0.81,
    cost: 688,
    unit: "Box RLYU 449716",
  },
  {
    id: "RLY-4823-0291",
    ref: "HC-PO-9960",
    customer: "Hallam Cycles",
    route: ["RTM", "GOT"],
    mode: "sea",
    service: "short-sea",
    pallets: 28,
    weight: 8800,
    pickup: "2026-10-21T10:00:00",
    status: "Booked",
    progress: 0,
    cost: 1530,
    unit: "Sailing Wed 21 Oct, 22:00",
  },
];

/** The shipment the homepage tracker opens on, and the sample numbers offered beside the field. */
export const trackSamples = [
  "RLY-4821-0937",
  "RLY-4822-0219",
  "RLY-4822-0412",
  "RLY-4821-1104",
];

/* ───────────────────────── Departures board ───────────────────────── */

export const departures = [
  {
    time: "11:15",
    to: "Duisburg",
    via: "rail shuttle R14",
    dock: "Track 2",
    status: "Loading",
  },
  {
    time: "11:40",
    to: "Antwerp",
    via: "trunk T-RTM-031",
    dock: "Dock 12",
    status: "On time",
  },
  {
    time: "12:05",
    to: "Felixstowe",
    via: "ro-ro, unaccompanied",
    dock: "Quay 3",
    status: "Gate closed",
  },
  {
    time: "13:30",
    to: "Hamburg",
    via: "trunk T-RTM-207",
    dock: "Dock 31",
    status: "On time",
  },
  {
    time: "14:00",
    to: "Milan",
    via: "FTL, double-manned",
    dock: "Dock 44",
    status: "On time",
  },
  {
    time: "15:20",
    to: "Gothenburg",
    via: "ro-ro, Wed sailing",
    dock: "Quay 5",
    status: "Delayed 40 min",
  },
  {
    time: "17:45",
    to: "Paris-Roissy",
    via: "trunk T-RTM-118",
    dock: "Dock 8",
    status: "On time",
  },
  {
    time: "18:30",
    to: "Duisburg",
    via: "rail shuttle R16",
    dock: "Track 1",
    status: "Booking open",
  },
];

/* ───────────────────────── Pages: home ───────────────────────── */

export const home = {
  title: "Relay — Freight logistics platform",
  h1: "Every handoff, on record.",
  lead: "Relay moves road, rail, sea and air freight through 22 European hubs, and shows you every scan, seal and signature the moment it happens.",
  trackHint: "Try a sample number, or open the shipments demo.",
  modesTitle: "Seven ways to move it",
  modesText:
    "Choose by deadline, weight and emissions. Every service books through the same form and lands in the same shipment record.",
  bandTitle: "22 hubs. 44 lanes. One booking.",
  bandText:
    "Our own cross-docks, rail heads and port desks sit where Europe’s freight already flows: the Rhine–Alpine corridor, the North Sea ports, the Baltic and the Iberian trunk. When freight changes mode, it changes hands inside the Relay network, so nothing goes dark between carriers.",
  quoteTitle: "A rate in the time it takes to read this",
  quoteText:
    "Pick two hubs and a load. The price, transit time and CO₂e update as you type. Book it and the rate is fixed.",
  platformTitle: "The record your whole team works from",
  platformText:
    "Ops, finance and your customers look at the same shipment: positions, documents, exceptions and invoices, side by side. Nobody emails a spreadsheet to ask where a pallet is.",
  platformPoints: [
    "Exception alerts that name the problem and the next step",
    "eCMR, POD, bills of lading and declarations attached to the shipment",
    "Branded tracking links for your consignees",
    "API and webhooks for every event, EDI for the big systems",
  ],
  flowTitle: "How a pallet crosses Europe",
  flow: [
    {
      title: "Booked",
      text: "Rate fixed, labels printed, collection slot confirmed.",
    },
    {
      title: "Collected",
      text: "Driver scans each pallet label and the seal; the eCMR opens.",
    },
    {
      title: "Sorted",
      text: "Weighed, measured and photographed at the origin hub overnight.",
    },
    {
      title: "Linehaul",
      text: "Road, rail or sea leg with live position and ETA.",
    },
    {
      title: "Delivered",
      text: "Signature and photo POD before the truck leaves the dock.",
    },
  ],
  boardTitle: "Departures from Rotterdam",
  boardNote:
    "Sample board at 10:40 on Monday 19 October. The real board updates every minute in the platform.",
  quote: {
    text: "We used to ring four carriers to find a pallet. Now the planner opens one record and sees the trailer, the photos from the hub and the delivery slot. Our customer service calls about freight fell by more than half.",
    name: "Annelie Brandt",
    role: "Head of Supply Chain, Kessler Tiles",
  },
  closeTitle: "Freight moving next week?",
  closeText:
    "Get a fixed rate now, or talk to the control tower about a regular lane.",
};

/* ───────────────────────── Pages: platform ───────────────────────── */

export const platform = {
  title: "Platform",
  h1: "One record from booking to invoice",
  lead: "The Relay platform is where every shipment lives: quote, booking, tracking, documents, exceptions, emissions and invoice. It runs on the same data our control tower uses, so what you see is what we see.",
  features: [
    {
      name: "Live visibility",
      text: "Truck GPS, rail wagon positions, vessel AIS and every hub scan merge into one timeline. ETAs are recalculated from the actual position, not the plan.",
      detail: [
        "GPS every 5 minutes",
        "Hub scans with photos",
        "ETA confidence bands",
      ],
    },
    {
      name: "Exceptions that say what to do",
      text: "When a delivery is refused or a box is held, the alert names the cause, who is handling it and what we need from you. You can reply on the shipment itself.",
      detail: [
        "Root cause and owner",
        "Reply in thread",
        "Re-delivery booking",
      ],
    },
    {
      name: "Documents in the right place",
      text: "eCMR, POD, airway bills, bills of lading and customs declarations attach themselves to the shipment they belong to, searchable for seven years.",
      detail: ["eCMR & digital POD", "Customs MRN", "7-year archive"],
    },
    {
      name: "Emissions per shipment",
      text: "CO₂e calculated per leg under the GLEC framework, with the mode split and an alternative-mode comparison on every quote.",
      detail: ["GLEC v3 / ISO 14083", "Leg-level detail", "CSRD-ready export"],
    },
    {
      name: "API, webhooks and EDI",
      text: "Book, track and fetch documents by REST API; subscribe to any event by webhook; or connect your ERP over EDIFACT IFTMIN and IFTSTA.",
      detail: ["REST + webhooks", "EDIFACT", "Sandbox keys"],
    },
  ],
  apiSample: `POST /v2/shipments
{
  "service": "groupage",
  "from": { "hub": "RTM", "ready": "2026-10-20T14:00" },
  "to":   { "hub": "MIL", "slot": "08:00-10:00" },
  "pallets": [{ "type": "EUR", "kg": 640, "stackable": false }],
  "reference": "PO 77120"
}

← 201 Created
{ "id": "RLY-4823-0352", "rate": 1964.00, "eta": "2026-10-22" }`,
  integrations: [
    "SAP S/4HANA",
    "Microsoft Dynamics 365",
    "Odoo",
    "NetSuite",
    "Shopify Plus",
    "Exact Online",
    "AfterShip",
    "Slack",
  ],
  integrationsNote:
    "Connectors listed are sample integrations in this template.",
};

/* ───────────────────────── Pages: pricing ───────────────────────── */

export type Plan = {
  name: string;
  monthly: number | null;
  blurb: string;
  users: string;
  cta: string;
  to: string;
  features: string[];
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  h1: "Pay for freight. The platform is extra only when you need more.",
  lead: "Every plan books at the same freight rates. Paid plans add seats, automation and integrations for teams that ship every day.",
  yearlyNote: "Yearly billing: two months free.",
  plans: [
    {
      name: "Ship",
      monthly: 0,
      blurb: "For occasional shippers who book a few loads a month.",
      users: "1 user",
      cta: "Start shipping",
      to: "/quote",
      features: [
        "Online quotes and booking",
        "Tracking links for consignees",
        "Documents and POD download",
        "Email alerts",
      ],
    },
    {
      name: "Operate",
      monthly: 290,
      blurb: "For logistics teams who live in the shipment list.",
      users: "Up to 10 users",
      cta: "Try the shipments demo",
      to: "/app",
      featured: true,
      features: [
        "Everything in Ship",
        "Exception workflow with owners",
        "API and webhooks",
        "Address book and saved loads",
        "CO₂e reporting per shipment",
        "Branded tracking page",
      ],
    },
    {
      name: "Network",
      monthly: null,
      blurb: "For shippers with regular lanes and an ERP to connect.",
      users: "Unlimited users",
      cta: "Talk to sales",
      to: "/quote",
      features: [
        "Everything in Operate",
        "EDI (EDIFACT, X12)",
        "Contracted lane rates",
        "Dedicated control-tower desk",
        "Quarterly business reviews",
        "99.9% platform uptime SLA",
      ],
    },
  ] as Plan[],
  compare: [
    ["Freight rates", "List", "List", "Contracted"],
    ["Users", "1", "10", "Unlimited"],
    ["Tracking links", "Yes", "Branded", "Branded, own domain"],
    [
      "Exception workflow",
      "Alerts only",
      "Owners and threads",
      "Owners, threads, SLAs",
    ],
    ["API and webhooks", "—", "Yes", "Yes"],
    ["EDI", "—", "—", "Yes"],
    [
      "CO₂e reports",
      "Per shipment",
      "Per shipment + monthly",
      "Custom, CSRD export",
    ],
    ["Support", "Email, 1 working day", "Phone, 2 hours", "Named desk, 24/7"],
  ],
  faqs: [
    {
      q: "Do paid plans change the freight price?",
      a: "No. Ship and Operate book at the same list rates; Network customers agree contracted rates per lane.",
    },
    {
      q: "Can I switch plans mid-month?",
      a: "Yes. Upgrades apply immediately and are pro-rated; downgrades apply at the end of the billing period.",
    },
    {
      q: "Is there a contract?",
      a: "Ship and Operate are month to month. Network is an annual agreement because it includes contracted lane capacity.",
    },
    {
      q: "Which currency do you invoice in?",
      a: "Euro, with VAT shown per country. Freight and platform fees appear on one monthly statement.",
    },
  ],
};

/* ───────────────────────── Pages: customers ───────────────────────── */

export const customers = {
  title: "Customers",
  h1: "Shippers who stopped chasing freight",
  lead: "Four companies, four kinds of freight. What they moved, what went wrong before, and what changed.",
  stories: [
    {
      company: "Kessler Tiles",
      sector: "Ceramic tiles, Düsseldorf",
      image: containerTrain,
      alt: "A long container train seen from above, curving along multiple tracks",
      problem:
        "Heavy pallets to Italian distributors meant trucks running at the weight limit and half-empty, and four carriers with four portals.",
      change:
        "Moved the Duisburg–Milan volume to the intermodal shuttle and consolidated the rest into groupage on one account.",
      results: [
        ["Truck kilometres", "−61% on the Milan lane"],
        ["CO₂e", "−412 t a year"],
        ["Carrier portals", "4 → 1"],
      ],
      quote:
        "The box is on the train at five and in Milan for breakfast. The weight limit stopped being our problem.",
      person: "Annelie Brandt, Head of Supply Chain",
    },
    {
      company: "Common Ground Coffee",
      sector: "Specialty coffee importer, Rotterdam",
      image: ocean,
      alt: "A container ship at anchor under grey cloud",
      problem:
        "Green coffee arriving at Rotterdam had to reach UK roasters, and every customs hold at Felixstowe surfaced two days late by email.",
      change:
        "Put UK-bound trailers on the daily ro-ro with Relay brokers filing pre-arrival entries, and holds now appear as exceptions with the fix named.",
      results: [
        ["Average hold time", "31 h → 6 h"],
        ["Missed roast slots", "None since March"],
        ["Entries filed", "1,140 in 2026"],
      ],
      quote:
        "When a box is held I know why before the roaster does, and I know what to send.",
      person: "Tomas Okafor, Logistics Lead",
    },
    {
      company: "Hallam Cycles",
      sector: "Bicycle maker, Leipzig",
      image: airCargo,
      alt: "A crate on a low-loader being moved to a cargo aircraft",
      problem:
        "Dealer launches across Spain and Scandinavia depended on stock arriving the same week, by whatever mode was free.",
      change:
        "Uses the quote tool to compare air, sea and road per launch, and books the slowest option that still makes the date.",
      results: [
        ["Air share of spend", "38% → 14%"],
        ["Launch dates missed", "0 of 11"],
        ["Booking time", "Under 3 minutes"],
      ],
      quote:
        "Seeing air next to sea with the price and the date on one line changed how we plan launches.",
      person: "Marta Zieliński, Operations Manager",
    },
    {
      company: "Verdane Pharma",
      sector: "Clinical trial supply, Frankfurt",
      image: warehouse,
      alt: "Automated pallet shuttle in a high-bay warehouse",
      problem:
        "Temperature excursions on trial material were found after delivery, from paper loggers nobody read in transit.",
      change:
        "Ships 2–8 °C consignments through the GDP rooms at Frankfurt with live temperature on the shipment record.",
      results: [
        ["Temperature excursions", "0 in 14 months"],
        ["Audit prep", "2 days → 2 hours"],
        ["Sites served", "38 in 9 countries"],
      ],
      quote:
        "The temperature log is attached to the shipment. The auditor reads the same record we do.",
      person: "Dr. Lena Hofmann, Clinical Supply Director",
    },
  ],
};

/* ───────────────────────── Pages: changelog ───────────────────────── */

export const changelog = {
  title: "Changelog",
  h1: "What changed in the platform",
  lead: "New features, improvements and fixes, newest first. Released continuously; summarised here every two weeks.",
  entries: [
    {
      date: "2026-10-13",
      version: "2026.21",
      title: "Re-delivery booking from the exception",
      tag: "New",
      items: [
        "Book a new delivery slot directly from a refused-delivery exception.",
        "The consignee gets the new window by SMS and email automatically.",
        "Exceptions now show the person handling them at Relay.",
      ],
    },
    {
      date: "2026-09-29",
      version: "2026.20",
      title: "Alternative-mode comparison on quotes",
      tag: "New",
      items: [
        "Every quote shows the same lane by rail or sea where we run it, with price, transit days and CO₂e side by side.",
        "Quote links can be shared with colleagues who are not signed in.",
      ],
    },
    {
      date: "2026-09-15",
      version: "2026.19",
      title: "Faster shipment list",
      tag: "Improved",
      items: [
        "The shipment list opens in under 400 ms with 10,000 rows.",
        "Filters are kept when you open a shipment and come back.",
        "CSV export includes customer references.",
      ],
    },
    {
      date: "2026-09-01",
      version: "2026.18",
      title: "Webhook signatures",
      tag: "Improved",
      items: [
        "Webhooks are signed with HMAC-SHA256; the secret rotates from Settings.",
        "Delivery retries back off over 24 hours and are listed per endpoint.",
      ],
    },
    {
      date: "2026-08-18",
      version: "2026.17",
      title: "Felixstowe customs status",
      tag: "New",
      items: [
        "UK import entries show their CDS status on the shipment.",
        "Holds raise an exception with the HMRC reason text.",
      ],
    },
    {
      date: "2026-08-04",
      version: "2026.16",
      title: "Fixes",
      tag: "Fixed",
      items: [
        "Pallet photos no longer rotate on iOS uploads.",
        "ETA times on multi-leg rail shipments now use the destination time zone.",
      ],
    },
  ],
};

/* ───────────────────────── Pages: about ───────────────────────── */

export const about = {
  title: "About",
  h1: "We started with three trucks and a whiteboard",
  lead: "Relay began in 2014 as a groupage operator in the Waalhaven with three tautliners and a planning whiteboard nobody else could read. The whiteboard became software; the trucks became a network of 22 hubs. The idea stayed the same: freight should never go dark when it changes hands.",
  image: railFreight,
  imageAlt:
    "Two blue electric locomotives hauling a mixed freight train past grazing cows",
  principles: [
    {
      title: "Own the handoff",
      text: "We run the hubs where freight changes mode, so a scan exists at every transfer. Subcontract the wheels, never the handoff.",
    },
    {
      title: "Say the problem first",
      text: "An exception names the cause, the owner and the next step. A soft status like “delayed” is not information.",
    },
    {
      title: "The cheapest kilometre is the one on rail",
      text: "We quote the lower-emission mode next to the fast one, every time, and let the shipper choose.",
    },
  ],
  timeline: [
    {
      year: "2014",
      text: "Three tautliners and a Rotterdam–Antwerp groupage service.",
    },
    {
      year: "2016",
      text: "Duisburg rail head; first intermodal shuttle to Milan.",
    },
    {
      year: "2018",
      text: "The planning tool opens to customers as the first Relay platform.",
    },
    {
      year: "2020",
      text: "Felixstowe desk opens ahead of UK customs changes.",
    },
    {
      year: "2022",
      text: "Air hubs at Frankfurt and Leipzig; GDP certification.",
    },
    {
      year: "2024",
      text: "API and webhooks; 1,000th shipper on the platform.",
    },
    {
      year: "2026",
      text: "22 hubs, 44 lanes, 410 people across nine countries.",
    },
  ],
  team: [
    {
      name: "Sanne de Vries",
      role: "Co-founder, CEO",
      base: "Rotterdam",
      note: "Ran the whiteboard. Still drives a shunter on hub open days.",
    },
    {
      name: "Karim Haddad",
      role: "Co-founder, Network",
      base: "Duisburg",
      note: "Built the rail product from one shuttle a week.",
    },
    {
      name: "Ines Moreau",
      role: "Chief Technology Officer",
      base: "Rotterdam",
      note: "Previously built routing for a parcel network.",
    },
    {
      name: "Piotr Nowak",
      role: "Head of Control Tower",
      base: "Rotterdam",
      note: "Runs the 24/7 desk and its 60 planners.",
    },
    {
      name: "Freya Lindqvist",
      role: "Customs & Compliance",
      base: "Felixstowe",
      note: "Licensed broker in three jurisdictions.",
    },
    {
      name: "Matteo Russo",
      role: "Head of Southern Hubs",
      base: "Milan",
      note: "Opened Milan, Lyon and Barcelona.",
    },
  ],
  roles: [
    {
      title: "Control tower planner (night shift)",
      place: "Rotterdam",
      type: "Full-time",
    },
    {
      title: "Senior backend engineer, tracking",
      place: "Rotterdam or remote (EU)",
      type: "Full-time",
    },
    {
      title: "Customs broker, UK imports",
      place: "Felixstowe",
      type: "Full-time",
    },
    { title: "Hub supervisor", place: "Leipzig", type: "Full-time, shifts" },
  ],
  careersNote:
    "Roles listed are sample content. Each opens an email to jobs@relay.example.",
};

/* ───────────────────────── Pages: track, quote, network, sign in, 404 ───────────────────────── */

export const track = {
  title: "Track a shipment",
  h1: "Track a shipment",
  lead: "Enter a Relay number (RLY-0000-0000). You will see every scan, the live position on the network, and the documents once delivered.",
  notFoundText: "We could not find that number in this demo.",
};

export const quote = {
  title: "Quote & book",
  h1: "Quote and book freight",
  lead: "Pick the lane and the load. The rate, transit time and emissions are calculated as you go, and booking fixes the price for seven days.",
  formTitle: "Book this rate",
  formText:
    "We confirm collection within two working hours. Booking is free to cancel until a carrier is assigned.",
  faqs: [
    {
      q: "How are prices calculated?",
      a: "Distance between hubs by the mode’s real route factor, the unit or pallet rate, the current fuel surcharge and any options you add. The breakdown shows every line.",
    },
    {
      q: "Is the price final?",
      a: "Yes, if the goods match the booking. Remeasured pallets or extra waiting time are invoiced with the hub photo or the timestamp attached.",
    },
    {
      q: "Can I collect from my own address?",
      a: "Yes. Quotes are hub to hub; door collection and delivery are added at booking within 80 km of any hub at no extra cost.",
    },
    {
      q: "Do you quote outside Europe?",
      a: "Deep-sea and air beyond Europe are quoted by our desk within four working hours. Use the form and choose “Other / not sure”.",
    },
  ],
};

export const network = {
  title: "Network",
  h1: "Hubs, lanes and cut-offs",
  lead: "22 Relay hubs and 44 scheduled lanes across road, rail, sea and air. Pick a mode to see its lanes, then a hub for its address, hours and same-day cut-off.",
  image: portAntwerp,
  imageAlt:
    "A row of container gantry cranes on the horizon of the Port of Antwerp at dusk",
};

export const signin = {
  title: "Sign in",
  h1: "Sign in to Relay",
  lead: "Use your work email. This demo signs you into a sample workspace with 16 shipments.",
};

export const notFound = {
  title: "Page not found",
  h1: "This page was not on the manifest",
  text: "The address may have a typo, or the page moved. The links below are all on the network.",
};

/* ───────────────────────── App demo ───────────────────────── */

export const app = {
  workspace: "Form & Field Logistics",
  plan: "Operate plan · sample workspace",
  user: {
    name: "Jamie Davis",
    role: "Logistics manager",
    initials: "JD",
    email: "jamie@formandfield.example",
  },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/shipments", label: "Shipments" },
    { to: "/app/settings", label: "Settings" },
  ],
  weeks: [
    "W32",
    "W33",
    "W34",
    "W35",
    "W36",
    "W37",
    "W38",
    "W39",
    "W40",
    "W41",
    "W42",
    "W43",
  ],
  volume: {
    road: [38, 41, 36, 44, 47, 45, 49, 52, 50, 55, 58, 31],
    rail: [6, 7, 7, 8, 9, 9, 11, 12, 12, 14, 15, 8],
    sea: [4, 3, 5, 4, 5, 6, 5, 6, 7, 6, 7, 3],
    air: [3, 2, 4, 3, 2, 3, 4, 2, 3, 3, 2, 2],
  } as Record<Mode, number[]>,
  onTime: [
    94.1, 95.2, 93.8, 96.0, 95.4, 96.8, 97.1, 96.2, 97.6, 97.9, 98.2, 97.4,
  ],
  spendByLane: [
    { lane: "RTM → MIL", value: 41820 },
    { lane: "DUI → MIL", value: 33960 },
    { lane: "ANR → BCN", value: 21480 },
    { lane: "RTM → FXT", value: 17040 },
    { lane: "HAM → GOT", value: 9630 },
  ],
  team: [
    { name: "Jamie Davis", email: "jamie@formandfield.example", role: "Admin" },
    {
      name: "Priya Raman",
      email: "priya@formandfield.example",
      role: "Planner",
    },
    { name: "Ole Brekke", email: "ole@formandfield.example", role: "Planner" },
    {
      name: "Rosa Llorente",
      email: "rosa@formandfield.example",
      role: "Finance",
    },
  ],
  notifications: [
    {
      id: "exception",
      label: "Exceptions",
      text: "Refused deliveries, holds, damage",
    },
    {
      id: "eta",
      label: "ETA changes over 2 hours",
      text: "Recalculated from live position",
    },
    {
      id: "delivered",
      label: "Delivered with POD",
      text: "Signature and photo attached",
    },
    {
      id: "invoice",
      label: "Invoices",
      text: "Monthly statement and credit notes",
    },
  ],
  apiKey: "rk_live_7Hq2Xc9vLm4TzR8bN1pW",
};
