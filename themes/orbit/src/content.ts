import launchArc from "./assets/launch-arc.jpg";
import testStand from "./assets/test-stand.jpg";
import engine from "./assets/engine.jpg";
import limb from "./assets/limb.jpg";
import cubesat from "./assets/cubesat.jpg";
import arrays from "./assets/arrays.jpg";
import integration from "./assets/integration.jpg";
import night from "./assets/night.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  launchArc: {
    src: launchArc,
    alt: "Long-exposure photograph of a rocket's ascent arcing over a coastline at dusk",
    w: 1800,
    h: 1200,
  },
  testStand: {
    src: testStand,
    alt: "An engine test stand at sunset, a wall of steam rolling away from it across the field",
    w: 1800,
    h: 1197,
  },
  limb: {
    src: limb,
    alt: "Solar arrays in the foreground and the thin blue line of Earth's atmosphere at orbital sunrise",
    w: 1800,
    h: 1010,
  },
  engine: {
    src: engine,
    alt: "A rocket engine nozzle firing inside a test stand, frost and vapour around its cooling tubes",
    w: 1126,
    h: 1400,
  },
  cubesat: {
    src: cubesat,
    alt: "A small cubesat drifting away into orbit above white cloud and blue ocean",
    w: 1800,
    h: 1198,
  },
  arrays: {
    src: arrays,
    alt: "Three cubesats tumbling past golden solar arrays with Earth's clouds beyond",
    w: 1100,
    h: 730,
  },
  night: {
    src: night,
    alt: "City lights scattered along a coastline at night, photographed from orbit",
    w: 1800,
    h: 1198,
  },
  integration: {
    src: integration,
    alt: "Technicians in cleanroom suits working beneath a satellite wrapped in gold insulation before encapsulation",
    w: 936,
    h: 1400,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Orbit",
  legal: "Orbit Launch Systems, Inc.",
  sector: "Small-satellite launch",
  email: "launch@orbit.example",
  careersEmail: "people@orbit.example",
  phone: "+1 555 0142 700",
  address: ["1200 Tidewater Road", "Port Kessel, CA 93410"],
  hours: "Sales desk: Mon–Fri, 08:00–18:00 Pacific",
  social: [
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const nav = [
  { to: "/missions", label: "Missions" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/manifest", label: "Manifest" },
  { to: "/rideshare", label: "Rideshare" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
];

/* ------------------------------------------------------------------ sites */

export type SiteId = "tern" | "halden";
export const sites: Record<
  SiteId,
  { name: string; short: string; note: string }
> = {
  tern: {
    name: "Tern Island Range, Pad 1",
    short: "Tern Island",
    note: "Polar and sun-synchronous inclinations, Kestrel only.",
  },
  halden: {
    name: "Cape Halden, Launch Complex 2",
    short: "Cape Halden",
    note: "Halcyon pad and barge recovery zone, 28°–98° inclinations.",
  },
};

/* --------------------------------------------------------------- vehicles */

export type VehicleId = "kestrel" | "halcyon" | "wayfarer";

export type Vehicle = {
  id: VehicleId;
  name: string;
  role: string;
  summary: string;
  body: string[];
  kind: "rocket" | "tug";
  /** metres, used by the elevation drawing */
  geometry: {
    height: number;
    diameter: number;
    fairing: number;
    fairingDia: number;
    stage2: number;
    interstage: number;
    stage1: number;
    engines: number;
    legs: boolean;
  };
  specs: [string, string][];
  performance: { orbit: string; kg: number }[];
  /** payload kg by circular altitude in km, sun-synchronous */
  curve: [number, number][];
  stages: {
    name: string;
    engines: string;
    propellant: string;
    thrust: string;
    burn: string;
  }[];
  price: string;
  priceNote: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "kestrel",
    name: "Kestrel",
    role: "Dedicated small launcher",
    summary:
      "Two stages, nine Talon engines, one customer. Kestrel puts up to 450 kg exactly where you need it, on your date.",
    body: [
      "Kestrel exists for the satellite that cannot wait for a shared ride or cannot accept someone else's orbit. You choose the altitude, the inclination, the local time of the ascending node and the minute of liftoff; we fly from Tern Island on a cadence of one launch every three weeks.",
      "The first stage carries nine Talon engines burning kerosene and liquid oxygen, fed by electric pumps we build in Port Kessel. The second stage uses a single vacuum Talon and can restart three times, which is how one Kestrel delivers a constellation plane in two drops.",
    ],
    kind: "rocket",
    geometry: {
      height: 24.6,
      diameter: 1.8,
      fairing: 5.2,
      fairingDia: 2.1,
      stage2: 5.6,
      interstage: 1.4,
      stage1: 12.4,
      engines: 3,
      legs: false,
    },
    specs: [
      ["Height", "24.6 m"],
      ["Diameter", "1.8 m (fairing 2.1 m)"],
      ["Lift-off mass", "41,500 kg"],
      ["Stages", "2, with restartable upper stage"],
      ["Fairing envelope", "1.9 m × 3.4 m usable"],
      ["Launch site", "Tern Island Range, Pad 1"],
      ["Customer ports", "1 adapter, or up to 12 cubesat dispensers"],
      ["Cadence", "Every 21 days"],
      ["Reusability", "Expendable"],
    ],
    performance: [
      { orbit: "LEO 400 km, 45°", kg: 450 },
      { orbit: "SSO 500 km", kg: 320 },
      { orbit: "SSO 700 km", kg: 255 },
    ],
    curve: [
      [300, 372],
      [400, 348],
      [500, 320],
      [600, 286],
      [700, 255],
      [800, 224],
      [1000, 168],
      [1200, 118],
    ],
    stages: [
      {
        name: "Stage 1",
        engines: "9 × Talon 1",
        propellant: "RP-1 / LOX",
        thrust: "234 kN sea level",
        burn: "148 s",
      },
      {
        name: "Stage 2",
        engines: "1 × Talon Vac",
        propellant: "RP-1 / LOX",
        thrust: "27 kN vacuum",
        burn: "322 s, 3 restarts",
      },
    ],
    price: "$8.4M",
    priceNote:
      "per dedicated launch, including range fees and one mission integration campaign",
  },
  {
    id: "halcyon",
    name: "Halcyon",
    role: "Reusable medium lifter",
    summary:
      "A methane booster that lands on the barge Low Tide and flies again in six weeks. Halcyon carries every Tandem rideshare and constellation batches up to 9.8 t.",
    body: [
      "Halcyon is the reason rideshare can be priced by the kilogram. Its first stage lands on our recovery barge 540 km downrange, is refurbished in a hangar at Cape Halden, and has flown as many as nine times. The upper stage is expendable and carries the payload stack: a ring dispenser with up to 48 ports for Tandem flights, or a single adapter for dedicated customers.",
      "Seven Heron engines burn liquid methane and oxygen; the same engine, with a longer nozzle, powers the upper stage. Methane leaves almost no soot, which is most of why turnaround is weeks rather than months.",
    ],
    kind: "rocket",
    geometry: {
      height: 51.8,
      diameter: 3.7,
      fairing: 11.8,
      fairingDia: 4.6,
      stage2: 12.7,
      interstage: 4.1,
      stage1: 23.2,
      engines: 4,
      legs: true,
    },
    specs: [
      ["Height", "51.8 m"],
      ["Diameter", "3.7 m (fairing 4.6 m)"],
      ["Lift-off mass", "412,000 kg"],
      ["Stages", "2, booster recovered at sea"],
      ["Fairing envelope", "4.3 m × 9.6 m usable"],
      ["Launch site", "Cape Halden, Launch Complex 2"],
      ["Customer ports", "Up to 48 on two dispenser rings"],
      ["Booster reflights", "Up to 9 per airframe so far"],
      ["Reusability", "First stage and fairing halves"],
    ],
    performance: [
      { orbit: "LEO 400 km, 51.6°", kg: 9800 },
      { orbit: "SSO 550 km", kg: 7100 },
      { orbit: "GTO, expendable", kg: 4900 },
    ],
    curve: [
      [300, 7650],
      [400, 7480],
      [500, 7230],
      [600, 6960],
      [700, 6690],
      [800, 6400],
      [1000, 5820],
      [1200, 5240],
    ],
    stages: [
      {
        name: "Stage 1",
        engines: "7 × Heron",
        propellant: "Methane / LOX",
        thrust: "6,370 kN sea level",
        burn: "162 s, plus landing burn",
      },
      {
        name: "Stage 2",
        engines: "1 × Heron Vac",
        propellant: "Methane / LOX",
        thrust: "1,050 kN vacuum",
        burn: "388 s, 2 restarts",
      },
    ],
    price: "$34M",
    priceNote:
      "per dedicated launch with a flight-proven booster; rideshare from $5,400/kg",
  },
  {
    id: "wayfarer",
    name: "Wayfarer",
    role: "Orbital transfer vehicle",
    summary:
      "A free-flying tug that rides a Tandem flight, then spends up to nine months moving your satellite to the altitude the rideshare did not go to.",
    body: [
      "Rideshare is cheap because everyone shares one orbit. Wayfarer is how you leave it. Eight ports, a green-monopropellant propulsion system and its own flight software let it raise or lower each customer's satellite before release, so a 100 kg spacecraft can reach 1,000 km without buying a rocket.",
      "Wayfarer is flown from our operations room in Port Kessel. You receive its telemetry in your own ground segment from separation onward, and a release report with the measured state vector within an hour of deploy.",
    ],
    kind: "tug",
    geometry: {
      height: 2.4,
      diameter: 1.6,
      fairing: 0,
      fairingDia: 0,
      stage2: 0,
      interstage: 0,
      stage1: 0,
      engines: 4,
      legs: false,
    },
    specs: [
      ["Height", "2.4 m (bus)"],
      ["Width", "1.6 m bus, 7.8 m with arrays deployed"],
      ["Lift-off mass", "Up to 1,180 kg fuelled with customers"],
      ["Launch site", "Rides Halcyon from Cape Halden"],
      ["Dry mass", "310 kg"],
      ["Customer ports", "8 × 15-inch, 380 kg total"],
      ["Propulsion", "4 × 22 N green monopropellant"],
      ["Delta-v", "1,150 m/s at full load"],
      ["Power", "1.6 kW end of life"],
      ["Mission life", "Up to 9 months"],
      ["Reusability", "Deorbited after its last release"],
    ],
    performance: [
      { orbit: "Altitude change, full load", kg: 380 },
      { orbit: "Plane change 1.5°, half load", kg: 190 },
      { orbit: "Deorbit after last release", kg: 0 },
    ],
    curve: [
      [300, 380],
      [400, 380],
      [500, 380],
      [600, 380],
      [700, 360],
      [800, 330],
      [1000, 260],
      [1200, 190],
    ],
    stages: [
      {
        name: "Bus",
        engines: "4 × Plover 22 N thrusters",
        propellant: "AF-M315E green monopropellant",
        thrust: "88 N total",
        burn: "Up to 120 burns per mission",
      },
    ],
    price: "+$2,400/kg",
    priceNote:
      "on top of the Tandem rideshare price, plus $4/kg for every km you move from 550 km",
  },
];

/* -------------------------------------------------------------- missions */

export type Outcome = "Success" | "Partial" | "Upcoming";

export type Mission = {
  slug: string;
  name: string;
  flight: string;
  vehicle: VehicleId;
  date: string;
  site: SiteId;
  orbit: { label: string; altitude: number; inclination: number };
  type: "Rideshare" | "Dedicated" | "Transfer";
  customer: string;
  payloads: number;
  payloadMass: number;
  outcome: Outcome;
  summary: string;
  body: string[];
  timeline: { t: string; event: string }[];
  manifest: { name: string; operator: string; kg: number; port: string }[];
  image: Img;
  hue: string;
};

export const missions: Mission[] = [
  {
    slug: "tandem-7",
    name: "Tandem 7",
    flight: "OR-052",
    vehicle: "halcyon",
    date: "2026-12-11T18:42:00Z",
    site: "halden",
    orbit: { label: "SSO 550 km", altitude: 550, inclination: 97.6 },
    type: "Rideshare",
    customer: "38 payloads, 21 operators",
    payloads: 38,
    payloadMass: 2860,
    outcome: "Upcoming",
    summary:
      "The winter rideshare to sun-synchronous orbit. Integration opens on 11 November; 140 kg of port capacity is still open.",
    body: [
      "Tandem 7 is our seventh scheduled rideshare and the fourth on a flight-proven Halcyon booster. The stack carries thirty-eight payloads on two ring dispensers, from a 1U student cubesat to a 210 kg synthetic-aperture radar satellite, plus a second Wayfarer that will lift six of them to 720 km.",
      "Payloads arrive at the Cape Halden integration hall from 11 November. Fit checks, separation-system tests and the final mass properties report close on 20 November; the fairing is encapsulated on 1 December.",
    ],
    timeline: [
      { t: "L−30 d", event: "Payload integration opens at Cape Halden" },
      { t: "L−10 d", event: "Fairing encapsulation and stack transfer" },
      { t: "T−00:35", event: "Propellant loading begins" },
      { t: "T+00:02:41", event: "Main engine cut-off and stage separation" },
      { t: "T+00:08:52", event: "Booster lands on Low Tide" },
      { t: "T+00:58:10", event: "First of 38 deployments" },
    ],
    manifest: [
      {
        name: "Kittiwake-3",
        operator: "Saltwind Radar",
        kg: 210,
        port: "24-inch",
      },
      { name: "Wayfarer 3", operator: "Orbit", kg: 690, port: "Dedicated" },
      {
        name: "Fennel A & B",
        operator: "Brightmoor Agritech",
        kg: 128,
        port: "15-inch",
      },
      {
        name: "HALO-2",
        operator: "Northfold University",
        kg: 24,
        port: "Cubesat 16U",
      },
      {
        name: "Pinnacle 1",
        operator: "Quarry Labs",
        kg: 8,
        port: "Cubesat 6U",
      },
    ],
    image: images.integration,
    hue: "#ff5a1f",
  },
  {
    slug: "quiet-hours",
    name: "Quiet Hours",
    flight: "OR-051",
    vehicle: "kestrel",
    date: "2026-11-06T02:14:00Z",
    site: "tern",
    orbit: { label: "SSO 525 km", altitude: 525, inclination: 97.5 },
    type: "Dedicated",
    customer: "Northfold University Consortium",
    payloads: 9,
    payloadMass: 141,
    outcome: "Upcoming",
    summary:
      "Nine university cubesats on one Kestrel, released in two planes for a radio-occultation weather study.",
    body: [
      "Quiet Hours is the first dedicated Kestrel booked by an academic consortium. Northfold and four partner universities pooled grants to buy a whole launch rather than nine rideshare seats, because their experiment only works if the satellites arrive in two precisely spaced planes.",
      "The second stage will release five spacecraft, coast for 47 minutes, restart for 9 seconds and release the remaining four. The launch window opens at 02:14 UTC and is 14 minutes long.",
    ],
    timeline: [
      { t: "T−06:00:00", event: "Vehicle goes vertical on Pad 1" },
      { t: "T+00:02:28", event: "Stage separation" },
      { t: "T+00:09:04", event: "Second-stage cut-off, 525 km parking orbit" },
      { t: "T+00:54:30", event: "Plane A deploys: five cubesats" },
      { t: "T+01:41:00", event: "Restart burn, 9 s" },
      { t: "T+01:52:20", event: "Plane B deploys: four cubesats" },
    ],
    manifest: [
      {
        name: "NUC-A1 to A5",
        operator: "Northfold University",
        kg: 78,
        port: "Cubesat 6U × 5",
      },
      {
        name: "Ferrule",
        operator: "Ashgrove Institute of Technology",
        kg: 24,
        port: "Cubesat 12U",
      },
      {
        name: "Sounder-2",
        operator: "Linwick College",
        kg: 21,
        port: "Cubesat 12U",
      },
      {
        name: "Tinker & Tailor",
        operator: "Halbrook University",
        kg: 18,
        port: "Cubesat 6U × 2",
      },
    ],
    image: images.cubesat,
    hue: "#7fb4d8",
  },
  {
    slug: "tandem-6",
    name: "Tandem 6",
    flight: "OR-047",
    vehicle: "halcyon",
    date: "2026-08-14T18:20:00Z",
    site: "halden",
    orbit: { label: "SSO 550 km", altitude: 550, inclination: 97.6 },
    type: "Rideshare",
    customer: "41 payloads, 17 operators",
    payloads: 41,
    payloadMass: 3120,
    outcome: "Success",
    summary:
      "Forty-one payloads deployed in 71 minutes. Booster H-04 landed on its seventh flight.",
    body: [
      "Tandem 6 lifted off on time from Cape Halden on a clear August evening. Every one of the forty-one payloads separated within 0.4 seconds of its planned time, and operators reported first contact with thirty-nine of them before the next pass; the last two checked in the following morning.",
      "Booster H-04 landed on Low Tide 8 minutes and 49 seconds after lift-off, its seventh landing, and was back in the Cape Halden hangar four days later.",
    ],
    timeline: [
      { t: "T+00:00:00", event: "Lift-off, 18:20 UTC" },
      { t: "T+00:02:39", event: "Main engine cut-off and stage separation" },
      { t: "T+00:03:21", event: "Fairing separation" },
      { t: "T+00:08:49", event: "Booster H-04 lands on Low Tide" },
      { t: "T+00:56:02", event: "First deployment" },
      { t: "T+02:07:15", event: "Final deployment, upper stage deorbit burn" },
    ],
    manifest: [
      {
        name: "Gannet SAR-1",
        operator: "Saltwind Radar",
        kg: 198,
        port: "24-inch",
      },
      {
        name: "Clearline 4–7",
        operator: "Clearline Methane",
        kg: 340,
        port: "15-inch × 4",
      },
      {
        name: "Moth",
        operator: "Pellow Space Weather",
        kg: 62,
        port: "15-inch",
      },
      {
        name: "Larkspur-1",
        operator: "Larkspur Maritime",
        kg: 16,
        port: "Cubesat 12U",
      },
      {
        name: "BRIX",
        operator: "Ashgrove Institute of Technology",
        kg: 4,
        port: "Cubesat 3U",
      },
    ],
    image: images.limb,
    hue: "#f2c14e",
  },
  {
    slug: "low-tide",
    name: "Low Tide",
    flight: "OR-044",
    vehicle: "kestrel",
    date: "2026-07-02T09:05:00Z",
    site: "tern",
    orbit: { label: "SSO 500 km", altitude: 500, inclination: 97.4 },
    type: "Dedicated",
    customer: "Fernhollow Imaging",
    payloads: 1,
    payloadMass: 268,
    outcome: "Success",
    summary:
      "A single 268 kg imaging satellite to a 10:30 descending node, inserted 1.2 km from target.",
    body: [
      "Fernhollow's third-generation imager needed a 10:30 local-time orbit that no rideshare was flying that summer. Kestrel delivered it to 500.4 km by 498.9 km at 97.41°, well inside the ±5 km and ±0.05° requirement.",
      "The mission is named for the recovery barge, which sat this one out: Kestrel is expendable, and the crew used the day to rehearse Tandem 6's landing.",
    ],
    timeline: [
      { t: "T+00:00:00", event: "Lift-off from Tern Island, 09:05 UTC" },
      { t: "T+00:02:26", event: "Stage separation" },
      { t: "T+00:03:05", event: "Fairing separation" },
      { t: "T+00:08:58", event: "Second-stage cut-off" },
      { t: "T+00:52:40", event: "Circularisation burn" },
      { t: "T+00:57:12", event: "Payload separation" },
    ],
    manifest: [
      {
        name: "Fernhollow F3-1",
        operator: "Fernhollow Imaging",
        kg: 268,
        port: "Dedicated 937 mm",
      },
    ],
    image: images.launchArc,
    hue: "#9ad1c4",
  },
  {
    slug: "lantern",
    name: "Lantern",
    flight: "OR-039",
    vehicle: "halcyon",
    date: "2026-05-19T04:48:00Z",
    site: "halden",
    orbit: { label: "LEO 540 km, 53°", altitude: 540, inclination: 53 },
    type: "Dedicated",
    customer: "Meridel Networks",
    payloads: 22,
    payloadMass: 6820,
    outcome: "Success",
    summary:
      "Twenty-two broadband satellites in one batch, Halcyon's heaviest payload to date.",
    body: [
      "Lantern carried the second batch of Meridel's low-latency broadband constellation: twenty-two flat-packed satellites stacked on a single dispenser column, 6,820 kg in total, which is Halcyon's heaviest payload so far.",
      "The satellites were released over 14 minutes in a slow spin so that none would recontact. Meridel raised all twenty-two to their operational shell within five weeks.",
    ],
    timeline: [
      { t: "T+00:00:00", event: "Lift-off, 04:48 UTC" },
      { t: "T+00:02:44", event: "Stage separation" },
      {
        t: "T+00:08:56",
        event: "Booster H-02 lands on Low Tide, ninth flight",
      },
      { t: "T+00:09:20", event: "Second-stage cut-off" },
      { t: "T+01:02:00", event: "Stack release begins" },
      { t: "T+01:16:05", event: "Final satellite clear" },
    ],
    manifest: [
      {
        name: "Meridel batch 2 (22 satellites)",
        operator: "Meridel Networks",
        kg: 6820,
        port: "Column dispenser",
      },
    ],
    image: images.night,
    hue: "#c9a2ff",
  },
  {
    slug: "long-way-round",
    name: "Long Way Round",
    flight: "OR-035",
    vehicle: "wayfarer",
    date: "2026-03-27T17:55:00Z",
    site: "halden",
    orbit: { label: "480, 620 and 780 km", altitude: 780, inclination: 97.6 },
    type: "Transfer",
    customer: "6 payloads, 4 operators",
    payloads: 6,
    payloadMass: 254,
    outcome: "Success",
    summary:
      "Wayfarer's second flight: six satellites delivered to three different altitudes from one Tandem ride.",
    body: [
      "Wayfarer 2 rode Tandem 5 to 550 km, separated, and spent 74 days delivering six satellites to three altitudes. It lowered two to 480 km for a short-life experiment, raised two to 620 km, then climbed to 780 km for the last pair.",
      "Each release report reached the customer within 40 minutes of separation. Wayfarer 2 then lowered itself to 320 km and re-entered on day 101.",
    ],
    timeline: [
      { t: "Day 0", event: "Separates from Tandem 5 at 550 km" },
      { t: "Day 6", event: "Descends to 480 km, releases two payloads" },
      { t: "Day 31", event: "Raises to 620 km, releases two payloads" },
      { t: "Day 74", event: "Raises to 780 km, releases final two" },
      { t: "Day 82", event: "Deorbit burns begin" },
      { t: "Day 101", event: "Re-entry over the South Pacific" },
    ],
    manifest: [
      {
        name: "Petrel-A, Petrel-B",
        operator: "Pellow Space Weather",
        kg: 64,
        port: "15-inch × 2",
      },
      {
        name: "Ostro 1 & 2",
        operator: "Ostro Orbital",
        kg: 110,
        port: "15-inch × 2",
      },
      { name: "Glint", operator: "Quarry Labs", kg: 42, port: "15-inch" },
      {
        name: "Heron Eye",
        operator: "Larkspur Maritime",
        kg: 38,
        port: "15-inch",
      },
    ],
    image: images.arrays,
    hue: "#7fd8a6",
  },
  {
    slug: "headwind",
    name: "Headwind",
    flight: "OR-026",
    vehicle: "kestrel",
    date: "2025-09-10T07:31:00Z",
    site: "tern",
    orbit: {
      label: "Planned SSO 500 km; achieved 312 × 498 km",
      altitude: 405,
      inclination: 97.4,
    },
    type: "Dedicated",
    customer: "Brightmoor Agritech",
    payloads: 2,
    payloadMass: 176,
    outcome: "Partial",
    summary:
      "Second stage shut down 11 seconds early. Both satellites survived in a low orbit; we published the full investigation.",
    body: [
      "On Headwind the second stage shut down 11 seconds before planned cut-off, leaving both Brightmoor satellites in a 312 by 498 km orbit. They used their own thrusters to circularise at 480 km and now operate with a shortened, four-year life.",
      "The cause was a liquid-oxygen tank pressurisation valve that stuck partially closed after a temperature excursion on the pad. We replaced the valve design, added a heater and a second pressure transducer, and flew the next Kestrel 41 days later. Brightmoor received a free Tandem slot for their replacement satellite, which flew on Tandem 7's manifest.",
    ],
    timeline: [
      { t: "T+00:00:00", event: "Lift-off, 07:31 UTC" },
      { t: "T+00:02:27", event: "Stage separation, nominal" },
      {
        t: "T+00:06:40",
        event: "Tank pressure begins to fall below prediction",
      },
      { t: "T+00:08:47", event: "Second-stage early cut-off (planned 08:58)" },
      {
        t: "T+00:56:30",
        event: "Both payloads separate in 312 × 498 km orbit",
      },
      { t: "+41 days", event: "Return to flight on Kestrel 15" },
    ],
    manifest: [
      {
        name: "Fennel Pathfinder 1 & 2",
        operator: "Brightmoor Agritech",
        kg: 176,
        port: "15-inch × 2",
      },
    ],
    image: images.engine,
    hue: "#ff8a6b",
  },
  {
    slug: "first-light",
    name: "First Light",
    flight: "OR-001",
    vehicle: "kestrel",
    date: "2023-04-18T08:00:00Z",
    site: "tern",
    orbit: { label: "LEO 450 km, 45°", altitude: 450, inclination: 45 },
    type: "Dedicated",
    customer: "Orbit (test flight)",
    payloads: 1,
    payloadMass: 90,
    outcome: "Success",
    summary:
      "Kestrel's maiden flight reached orbit on the first attempt and carried a 90 kg mass simulator with a camera.",
    body: [
      "Kestrel's first flight carried no customers: a 90 kg aluminium mass simulator with three cameras, a GPS receiver and a radio, built in the factory canteen over two weekends.",
      "It reached a 451 by 447 km orbit at 45.02°, sent back the first photographs of Earth taken by anything we had built, and re-entered after 26 months.",
    ],
    timeline: [
      { t: "T+00:00:00", event: "Lift-off, 08:00 UTC, after two scrubs" },
      { t: "T+00:02:31", event: "Stage separation" },
      { t: "T+00:03:10", event: "Fairing separation" },
      { t: "T+00:08:55", event: "Second-stage cut-off: orbit" },
      { t: "T+00:58:00", event: "Mass simulator released" },
      { t: "T+01:31:00", event: "First image received at Port Kessel" },
    ],
    manifest: [{ name: "Ballast", operator: "Orbit", kg: 90, port: "15-inch" }],
    image: images.testStand,
    hue: "#ffffff",
  },
];

/* -------------------------------------------------------------- manifest */

export type Flight = {
  id: string;
  name: string;
  vehicle: VehicleId;
  date: string;
  window: string;
  site: SiteId;
  orbit: string;
  type: "Rideshare" | "Dedicated";
  customer: string;
  status:
    | "Payloads integrated"
    | "Integration open"
    | "Booking"
    | "Closing soon"
    | "Sold out";
  /** remaining rideshare capacity in kg; 0 for dedicated flights */
  openKg: number;
  deadline?: string;
  mission?: string;
};

export const flights: Flight[] = [
  {
    id: "or-051",
    name: "Quiet Hours",
    vehicle: "kestrel",
    date: "2026-11-06T02:14:00Z",
    window: "14 min",
    site: "tern",
    orbit: "SSO 525 km",
    type: "Dedicated",
    customer: "Northfold University Consortium",
    status: "Payloads integrated",
    openKg: 0,
    mission: "quiet-hours",
  },
  {
    id: "or-052",
    name: "Tandem 7",
    vehicle: "halcyon",
    date: "2026-12-11T18:42:00Z",
    window: "Instantaneous",
    site: "halden",
    orbit: "SSO 550 km",
    type: "Rideshare",
    customer: "38 payloads",
    status: "Closing soon",
    openKg: 140,
    deadline: "2026-10-30",
    mission: "tandem-7",
  },
  {
    id: "or-053",
    name: "Kestrel 23",
    vehicle: "kestrel",
    date: "2027-01-08T06:30:00Z",
    window: "NET",
    site: "tern",
    orbit: "SSO 500 km",
    type: "Dedicated",
    customer: "Fernhollow Imaging",
    status: "Booking",
    openKg: 0,
  },
  {
    id: "or-054",
    name: "Lantern 3",
    vehicle: "halcyon",
    date: "2027-02-17T04:10:00Z",
    window: "NET",
    site: "halden",
    orbit: "LEO 540 km, 53°",
    type: "Dedicated",
    customer: "Meridel Networks",
    status: "Sold out",
    openKg: 0,
  },
  {
    id: "or-055",
    name: "Kestrel 24",
    vehicle: "kestrel",
    date: "2027-03-02T09:00:00Z",
    window: "NET",
    site: "tern",
    orbit: "LEO 450 km, 45°",
    type: "Dedicated",
    customer: "Available to book",
    status: "Booking",
    openKg: 0,
  },
  {
    id: "or-056",
    name: "Tandem 8",
    vehicle: "halcyon",
    date: "2027-04-16T17:30:00Z",
    window: "NET",
    site: "halden",
    orbit: "SSO 550 km",
    type: "Rideshare",
    customer: "24 payloads so far",
    status: "Booking",
    openKg: 1460,
    deadline: "2027-01-12",
  },
  {
    id: "or-058",
    name: "Kestrel 26",
    vehicle: "kestrel",
    date: "2027-05-20T08:45:00Z",
    window: "NET",
    site: "tern",
    orbit: "SSO 600 km",
    type: "Dedicated",
    customer: "Saltwind Radar",
    status: "Booking",
    openKg: 0,
  },
  {
    id: "or-060",
    name: "Tandem 9",
    vehicle: "halcyon",
    date: "2027-08-13T18:00:00Z",
    window: "NET",
    site: "halden",
    orbit: "SSO 550 km",
    type: "Rideshare",
    customer: "11 payloads so far",
    status: "Booking",
    openKg: 2380,
    deadline: "2027-05-10",
  },
  {
    id: "or-061",
    name: "Midlatitude 1",
    vehicle: "halcyon",
    date: "2027-10-05T15:20:00Z",
    window: "NET",
    site: "halden",
    orbit: "LEO 500 km, 53°",
    type: "Rideshare",
    customer: "6 payloads so far",
    status: "Booking",
    openKg: 2650,
    deadline: "2027-07-02",
  },
  {
    id: "or-064",
    name: "Tandem 10",
    vehicle: "halcyon",
    date: "2027-12-10T18:30:00Z",
    window: "NET",
    site: "halden",
    orbit: "SSO 550 km",
    type: "Rideshare",
    customer: "3 payloads so far",
    status: "Booking",
    openKg: 2900,
    deadline: "2027-09-06",
  },
];

/* ------------------------------------------------------------- rideshare */

export type OrbitOption = {
  id: string;
  label: string;
  detail: string;
  altitude: number;
  inclination: number;
  perKg: number;
  custom?: boolean;
};

export const rideshare = {
  orbits: [
    {
      id: "sso",
      label: "Sun-synchronous",
      detail: "550 km, 97.6°, 10:30 descending node",
      altitude: 550,
      inclination: 97.6,
      perKg: 5900,
    },
    {
      id: "mid",
      label: "Mid-inclination",
      detail: "500 km, 53°, Midlatitude flights only",
      altitude: 500,
      inclination: 53,
      perKg: 5400,
    },
    {
      id: "custom",
      label: "Custom altitude via Wayfarer",
      detail: "SSO, 350–1,200 km, delivered by tug",
      altitude: 800,
      inclination: 97.6,
      perKg: 5900,
      custom: true,
    },
  ] satisfies OrbitOption[],
  minBilledKg: 50,
  cubesatPerU: 31000,
  cubesatUnits: [1, 3, 6, 12, 16],
  wayfarerPerKg: 2400,
  wayfarerPerKgKm: 4,
  ports: [
    { maxKg: 200, label: "15-inch port", fee: 0 },
    { maxKg: 450, label: "24-inch port", fee: 45000 },
  ],
  shortNotice: { months: 3, rate: 0.12, label: "Short-notice manifest change" },
  early: { months: 9, rate: -0.06, label: "Early-commitment credit" },
  addons: [
    {
      id: "fuel",
      label: "Propellant loading",
      detail: "Hydrazine, xenon or green monoprop loaded in our hall",
      price: 55000,
    },
    {
      id: "late",
      label: "Late integration",
      detail: "Deliver your satellite at L−14 days instead of L−30",
      price: 85000,
    },
    {
      id: "video",
      label: "Separation imagery",
      detail: "Onboard video of your deployment and a 50 Hz telemetry file",
      price: 14000,
    },
    {
      id: "licensing",
      label: "Licensing support",
      detail: "Our regulatory team prepares your spectrum and launch filings",
      price: 22000,
    },
  ],
  schedule: [
    { label: "At signature", share: 0.1 },
    { label: "L−6 months", share: 0.4 },
    { label: "L−30 days", share: 0.5 },
  ],
  included: [
    "Separation system, harness and flight-proven dispenser port",
    "Two fit checks and one separation shock test at Cape Halden",
    "Cleanroom space (ISO 8) for up to 10 days",
    "Coupled loads analysis and a mission-specific interface document",
    "Deployment confirmation and state vector within one hour",
    "Rebooking on the next Tandem at no charge if your satellite is late",
  ],
  steps: [
    {
      when: "L−12 months",
      title: "Reserve",
      text: "A 10% deposit holds your mass and port on a named flight. You receive the payload user's guide and a mission manager the same week.",
    },
    {
      when: "L−9 months",
      title: "Interface control",
      text: "We agree your interface control document: mass properties, envelope, separation, power-off status and any fuelling.",
    },
    {
      when: "L−6 months",
      title: "Analysis",
      text: "Coupled loads and separation analysis on the real stack. You learn your neighbours and your deployment time.",
    },
    {
      when: "L−30 days",
      title: "Ship and integrate",
      text: "Your team and satellite arrive at Cape Halden. Fit check, separation test, mate to the dispenser, final mass report.",
    },
    {
      when: "Launch day",
      title: "Fly",
      text: "You watch from our customer room or your own operations centre with our telemetry feed. Deployment confirmed within an hour.",
    },
  ],
  faq: [
    {
      q: "What does the price per kilogram include?",
      a: "Everything on the inclusion list: dispenser port, separation system, two fit checks, cleanroom time, analysis and deployment confirmation. Fuelling, late integration, imagery and licensing support are optional and priced separately.",
    },
    {
      q: "What if my satellite is not ready?",
      a: "Tell us before L−60 days and we move you to the next Tandem with the same orbit at no charge, keeping every payment you have made. After L−60 days, a rebooking costs 15% of your launch price.",
    },
    {
      q: "What if your flight slips?",
      a: "Tandem dates are NET (no earlier than). If we slip more than 60 days you may cancel and receive every payment back, or stay on the flight and receive a 5% credit.",
    },
    {
      q: "Do you fly propulsion and pressure vessels?",
      a: "Yes: cold gas, electric, green monopropellant and hydrazine systems have all flown with us. Pressure vessels must meet our payload user's guide and be loaded by our team or under our supervision.",
    },
    {
      q: "Can I choose my deployment order?",
      a: "You can request it. We publish the deployment sequence at L−6 months after separation analysis; most customers get their requested slot.",
    },
    {
      q: "Is there a minimum mass?",
      a: "Microsatellites are billed at a minimum of 50 kg. Cubesats are billed per unit of dispenser volume instead, from 1U to 16U.",
    },
  ],
};

/* --------------------------------------------------------------- careers */

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  salary: string;
  summary: string;
  doing: string[];
  bring: string[];
  bonus: string[];
};

export const jobs: Job[] = [
  {
    slug: "propulsion-test-engineer",
    title: "Propulsion Test Engineer",
    team: "Propulsion",
    location: "Mesa Dorada test site",
    type: "Full-time, on site",
    salary: "$132,000–$168,000",
    summary:
      "Run hot-fire campaigns for Talon and Heron engines on stands B and C, from test plan to the post-test report.",
    doing: [
      "Write test procedures and redlines for engine and component hot fires",
      "Act as test conductor on the console for campaigns of up to 40 starts",
      "Reduce high-speed data and turn it into decisions for the design team within 24 hours",
      "Own stand upgrades: new feed lines, instrumentation and safety interlocks",
    ],
    bring: [
      "Three or more years on liquid rocket engine or high-pressure fluid test",
      "Fluency in P&IDs, pressure-system safety and cryogenic handling",
      "Comfort with Python for data reduction",
    ],
    bonus: [
      "Experience with methane/LOX ignition",
      "A commercial driver's licence for the tanker",
    ],
  },
  {
    slug: "gnc-engineer",
    title: "Guidance, Navigation & Control Engineer",
    team: "Avionics",
    location: "Port Kessel, CA",
    type: "Full-time, hybrid",
    salary: "$148,000–$190,000",
    summary:
      "Own the ascent and landing guidance for Halcyon's booster, from simulation to flight software you will watch fly.",
    doing: [
      "Develop and tune powered-descent guidance for barge landings",
      "Build Monte Carlo campaigns that dispersion-test every flight's trajectory",
      "Review flight data the morning after each launch and close the loop with simulation",
      "Write flight code with the software team in C++ and review theirs",
    ],
    bring: [
      "A degree in aerospace, controls or a related field, and four or more years of GNC work",
      "Hands-on experience with Kalman filtering and trajectory optimisation",
      "Code you have written that ran on real hardware",
    ],
    bonus: [
      "Convex optimisation for powered descent",
      "Prior launch vehicle or lander experience",
    ],
  },
  {
    slug: "launch-site-technician",
    title: "Launch Site Technician",
    team: "Launch Operations",
    location: "Cape Halden",
    type: "Full-time, shift work",
    salary: "$34–$46 per hour",
    summary:
      "Prepare Halcyon on the pad and in the hangar: mechanical, fluids and electrical work on a flying rocket.",
    doing: [
      "Integrate stages, fairings and the payload stack in the hangar",
      "Perform pad fluid and pneumatic system work during launch campaigns",
      "Refurbish recovered boosters between flights",
      "Keep work records that an inspector can follow line by line",
    ],
    bring: [
      "Two or more years as an aircraft, industrial or military technician",
      "Ability to work at height and in shifts around launch windows",
      "Respect for procedures and the confidence to stop a job that is wrong",
    ],
    bonus: ["A&P licence", "Experience with cryogenic systems"],
  },
  {
    slug: "payload-mission-manager",
    title: "Payload Mission Manager",
    team: "Mission Management",
    location: "Port Kessel, CA",
    type: "Full-time, hybrid",
    salary: "$128,000–$160,000",
    summary:
      "Be the single point of contact for six to ten rideshare customers per Tandem flight, from reservation to deployment.",
    doing: [
      "Run each customer's interface control document to signature",
      "Coordinate fit checks, shipping, cleanroom time and fuelling at Cape Halden",
      "Chair the payload readiness review before encapsulation",
      "Sit beside the customer on launch day and make sure they hear their deployment first",
    ],
    bring: [
      "Three or more years in spacecraft integration, test or mission management",
      "Clear writing and the habit of saying the bad news early",
      "Willingness to travel to Cape Halden for each campaign (about six weeks a year)",
    ],
    bonus: [
      "You have integrated a satellite of your own",
      "Export-control experience",
    ],
  },
  {
    slug: "structures-engineer",
    title: "Structures Engineer, Composites",
    team: "Structures",
    location: "Port Kessel, CA",
    type: "Full-time, on site",
    salary: "$135,000–$172,000",
    summary:
      "Design and qualify the carbon-composite interstages and fairings that we build in our own autoclave.",
    doing: [
      "Design composite primary structure from layup to joint",
      "Run analysis and define qualification tests to failure",
      "Work with technicians on the factory floor to make parts buildable",
      "Disposition non-conformances quickly and in writing",
    ],
    bring: [
      "Four or more years designing composite structures",
      "Hands-on FEA and classical laminate analysis",
      "Experience taking a design through qualification test",
    ],
    bonus: ["Out-of-autoclave processes", "Acoustic or shock environments"],
  },
  {
    slug: "flight-software-engineer",
    title: "Flight Software Engineer, Wayfarer",
    team: "Software",
    location: "Port Kessel, CA or remote (US)",
    type: "Full-time",
    salary: "$145,000–$185,000",
    summary:
      "Write the software that flies Wayfarer for nine months at a time and releases other people's satellites.",
    doing: [
      "Build fault management that keeps a tug safe through a ground outage",
      "Own the release sequence and its hardware-in-the-loop tests",
      "Ship over-the-air updates to a vehicle in orbit, carefully",
      "Take a share of the operations rota during active missions",
    ],
    bring: [
      "Three or more years of embedded C or C++ on real-time systems",
      "Experience testing software against real hardware, not only simulation",
      "Calm on-call habits",
    ],
    bonus: ["Rust", "Spacecraft operations experience"],
  },
];

export const careers = {
  intro:
    "We are 214 people building rockets in Port Kessel, testing them at Mesa Dorada and flying them from Cape Halden and Tern Island. We hire people who like to see their work leave the ground.",
  benefits: [
    {
      title: "Health, fully covered",
      text: "Medical, dental and vision for you and your family; we pay 100% of premiums.",
    },
    {
      title: "Equity for everyone",
      text: "Every employee receives stock options at offer, technicians included.",
    },
    {
      title: "Launch leave",
      text: "Two extra paid days after every campaign you work on site.",
    },
    {
      title: "Relocation",
      text: "Up to $12,000 to move to Port Kessel or Cape Halden.",
    },
    {
      title: "Learning budget",
      text: "$2,500 a year for courses, books and conferences, plus pilot's licence support.",
    },
    {
      title: "Watch it fly",
      text: "Every employee and one guest are invited to the viewing site for every launch.",
    },
  ],
  process: [
    {
      when: "Week 1",
      title: "Application",
      text: "A person on the team you would join reads every application. You hear back within five working days either way.",
    },
    {
      when: "Week 2",
      title: "Conversation",
      text: "45 minutes with the hiring manager about work you have done, not puzzles.",
    },
    {
      when: "Week 3",
      title: "Work sample",
      text: "A paid, two-hour exercise drawn from a real problem we solved last year.",
    },
    {
      when: "Week 4",
      title: "On site",
      text: "Half a day with the team in the factory or at the stand. We pay travel. Offers follow within a week.",
    },
  ],
};

/* ----------------------------------------------------------------- about */

export const about = {
  story: [
    "Orbit started in 2019 in a rented hangar in Port Kessel with four engineers and a used lathe. Our founders had spent a decade building satellites and losing months to launch delays they could not plan around, so the company began with one rule: publish the manifest and the price, and keep both.",
    "Kestrel reached orbit on its first attempt in April 2023. Halcyon followed in 2024 and landed its booster on the third flight. Today we fly roughly twice a month, and more than 300 satellites from 90 operators have ridden with us.",
    "We have had one partial failure, Headwind, in September 2025. We published the investigation in full within 30 days. We intend to keep doing that.",
  ],
  principles: [
    {
      title: "Publish the schedule",
      text: "The manifest on this site is the one our engineers work from. When a date moves, it moves here first.",
    },
    {
      title: "Price before the phone call",
      text: "Every rideshare price is computable from public numbers. Sales exists to help, not to negotiate.",
    },
    {
      title: "Build it in-house",
      text: "Engines, tanks, composites, avionics and flight software are made under one roof, so we can fix them in days.",
    },
    {
      title: "Leave nothing behind",
      text: "Every upper stage and every Wayfarer is deorbited within 12 months of its mission.",
    },
  ],
  milestones: [
    {
      year: "2019",
      text: "Founded in Port Kessel; first Talon engine on the stand eight months later",
    },
    {
      year: "2021",
      text: "Tern Island Range licensed; Kestrel stage 1 qualification firing",
    },
    {
      year: "2023",
      text: "First Light: Kestrel reaches orbit on its maiden flight",
    },
    {
      year: "2024",
      text: "Halcyon first flight; booster lands on Low Tide on flight three",
    },
    {
      year: "2025",
      text: "Wayfarer 1 delivers its first payloads; Headwind partial failure and return to flight in 41 days",
    },
    { year: "2026", text: "Tandem 6 deploys 41 payloads; 50th Orbit launch" },
  ],
  team: [
    {
      name: "Ines Varga",
      role: "Chief Executive Officer",
      bio: "Built star trackers and reaction wheels for twelve years before co-founding Orbit.",
    },
    {
      name: "Tomás Okafor",
      role: "Chief Engineer",
      bio: "Designed the Talon engine on a whiteboard in the first hangar; still signs every flight readiness review.",
    },
    {
      name: "Mei Lindqvist",
      role: "VP, Launch Operations",
      bio: "Has been launch director for 38 of our 50 flights.",
    },
    {
      name: "Ravi Castellanos",
      role: "VP, Customer Missions",
      bio: "Former satellite operator. Runs the team that turns a reservation into a deployment.",
    },
    {
      name: "Hana Szabo",
      role: "Head of Mission Assurance",
      bio: "Led the Headwind investigation and the return to flight.",
    },
  ],
  facilities: [
    {
      name: "Port Kessel factory & HQ",
      detail:
        "18,000 m² for engines, tanks, composites, avionics and the operations room.",
      image: images.integration,
    },
    {
      name: "Mesa Dorada test site",
      detail:
        "Three engine stands and a full-stage stand in the high desert, 200 km inland.",
      image: images.testStand,
    },
    {
      name: "Cape Halden & Tern Island",
      detail:
        "Halcyon's pad, hangar and payload hall; Kestrel's island pad for polar launches.",
      image: images.launchArc,
    },
  ],
};

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Orbit by the kilogram.",
  lede: "Orbit launches small satellites to low Earth and sun-synchronous orbit on Kestrel and Halcyon. The manifest is public, rideshare starts at $5,400/kg, and you can price your payload before you ever call us.",
  quote: {
    text: "We booked Tandem 6 from the calculator on a Friday, had a mission manager on Monday, and our radar was talking to us one pass after deployment. The date never moved.",
    name: "Adaeze Moreno",
    role: "Head of Spacecraft, Saltwind Radar",
  },
  closing: "Tandem 8 payload bookings close on 12 January 2027.",
  /** flights flown per year, and the flight numbers that were not full successes */
  record: {
    years: [
      { year: 2023, flights: 6 },
      { year: 2024, flights: 11 },
      { year: 2025, flights: 17 },
      { year: 2026, flights: 16 },
    ],
    partial: [{ flight: 26, mission: "headwind" }],
  },
};

export const newsletter = {
  title: "Launch alerts",
  text: "One email when a launch date is set or moves, and a link to the webcast. No marketing.",
};
