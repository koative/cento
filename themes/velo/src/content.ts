import corsa from "./assets/bike-corsa.jpg";
import notte from "./assets/bike-notte.jpg";
import causse from "./assets/bike-causse.jpg";
import steppe from "./assets/bike-steppe.jpg";
import lilla from "./assets/bike-lilla.jpg";
import citta from "./assets/bike-citta.jpg";
import pista from "./assets/bike-pista.jpg";
import rideHills from "./assets/ride-hills.jpg";
import rideCoast from "./assets/ride-coast.jpg";
import rideForest from "./assets/ride-forest.jpg";
import rideBars from "./assets/ride-bars.jpg";
import shopTruing from "./assets/shop-truing.jpg";
import shopTools from "./assets/shop-tools.jpg";
import shopStand from "./assets/shop-stand.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Velo",
  sector: "Bicycle shop & builds",
  tagline: "Steel bicycles, drawn to fit and serviced for life.",
  email: "hello@velo.example",
  workshopEmail: "workshop@velo.example",
  phone: "+1 555 0148 220",
  address: ["Unit 4, Tannery Yard", "218 Foundry Street", "Halden"],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Strava", href: "https://www.strava.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/bikes", label: "Bikes" },
  { to: "/build", label: "Build yours" },
  { to: "/service", label: "Workshop" },
  { to: "/rides", label: "Rides club" },
  { to: "/about", label: "About" },
];

/** Opening hours by weekday, 0 = Sunday. Null = closed. Times are 24h "HH:MM". */
export const hours: ({ open: string; close: string } | null)[] = [
  { open: "09:00", close: "13:00" },
  null,
  { open: "10:00", close: "19:00" },
  { open: "10:00", close: "19:00" },
  { open: "10:00", close: "20:00" },
  { open: "10:00", close: "19:00" },
  { open: "09:00", close: "17:00" },
];

export const hoursNote =
  "Workshop drop-off from 08:30 Tuesday to Saturday. Closed Mondays — that is ride day.";

/* ------------------------------------------------------------------ bikes */

export type BikeType = "Road" | "Gravel" | "Adventure" | "City" | "Track";
export type Bar = "drop" | "flat" | "swept";

/** Frame geometry for the middle size, in millimetres and degrees. Other sizes are derived in lib/geometry.ts. */
export type Geometry = {
  stack: number;
  reach: number;
  headAngle: number;
  seatAngle: number;
  seatTube: number;
  headTube: number;
  chainstay: number;
  bbDrop: number;
  offset: number;
};

export type Finish = { name: string; hex: string };

export type Bike = {
  id: string;
  name: string;
  type: BikeType;
  material: "Steel" | "Carbon";
  price: number;
  /** Frameset-only price; set on bikes that can be custom built. */
  frameset?: number;
  weight: number;
  line: string;
  description: string[];
  photo: string;
  photoAlt: string;
  photoPosition?: string;
  finishes: Finish[];
  sizes: number[];
  baseSize: number;
  /** Sizes that are built to order rather than on the shop floor. */
  toOrder: number[];
  geometry: Geometry;
  tyre: number;
  clearance: number;
  bar: Bar;
  deepRims?: boolean;
  specs: [string, string][];
  rideNote: string;
};

export const bikes: Bike[] = [
  {
    id: "corsa",
    name: "Corsa",
    type: "Road",
    material: "Steel",
    price: 3480,
    frameset: 1650,
    weight: 9.1,
    line: "Our road bike. Fast enough for Tuesday, kind enough for Sunday.",
    description: [
      "Corsa is the frame we build most. Double-butted chromoly tubes, fillet-brazed at the head tube and seat cluster, with a carbon fork and room for 35 mm tyres.",
      "It is not the lightest road bike you can buy. It is the one you still want to ride after six hours, on the road home with a headwind, and the one that will take a new groupset in ten years.",
    ],
    photo: corsa,
    photoAlt:
      "Corsa road bike in tobacco brown, leaning against a wooden wall, with tan-wall tyres and white bar tape",
    finishes: [
      { name: "Tobacco", hex: "#5a3b26" },
      { name: "Race red", hex: "#d42d22" },
      { name: "Graphite", hex: "#2f3531" },
    ],
    sizes: [50, 52, 54, 56, 58, 60],
    baseSize: 54,
    toOrder: [50, 60],
    geometry: {
      stack: 555,
      reach: 380,
      headAngle: 72.5,
      seatAngle: 73.5,
      seatTube: 520,
      headTube: 145,
      chainstay: 415,
      bbDrop: 70,
      offset: 45,
    },
    tyre: 32,
    clearance: 35,
    bar: "drop",
    specs: [
      ["Frame", "Double-butted chromoly, fillet-brazed, flat-mount disc"],
      ["Fork", "Full carbon, 12 mm thru-axle, tapered steerer"],
      ["Drivetrain", "2 × 12 mechanical, 50/34 × 11–34"],
      ["Brakes", "Hydraulic disc, 160 mm rotors"],
      ["Wheels", "Hand-built alloy, 28 h, built in the shop"],
      ["Tyres", "32 mm tan-wall, tubeless-ready"],
      ["Finishing kit", "Alloy bar and stem, cork tape, leather saddle"],
    ],
    rideNote:
      "Settles at 30 km/h and stays there. Steering is calm, never lazy.",
  },
  {
    id: "notte",
    name: "Notte",
    type: "Road",
    material: "Carbon",
    price: 4950,
    weight: 7.6,
    line: "The race bike. Deep rims, low front, nothing to hide behind.",
    description: [
      "Notte is the one bike on the floor we do not braze ourselves. The monocoque carbon frame comes from a small mould shop we have worked with for a decade; we spec it, paint it and build it.",
      "Low stack, a steep head angle and 50 mm rims. It suits the Sunday fast group, crits, and anyone who wants their position to be a little uncomfortable on purpose.",
    ],
    photo: notte,
    photoAlt:
      "Notte carbon road bike in stealth black with deep-section rims, photographed against a dark backdrop",
    finishes: [
      { name: "Stealth black", hex: "#1c1f1d" },
      { name: "Ash", hex: "#8c918a" },
    ],
    sizes: [50, 52, 54, 56, 58],
    baseSize: 54,
    toOrder: [50, 58],
    geometry: {
      stack: 540,
      reach: 388,
      headAngle: 73,
      seatAngle: 73.5,
      seatTube: 505,
      headTube: 130,
      chainstay: 405,
      bbDrop: 72,
      offset: 43,
    },
    tyre: 28,
    clearance: 32,
    bar: "drop",
    deepRims: true,
    specs: [
      ["Frame", "Monocoque carbon, internal routing, T47 bottom bracket"],
      ["Fork", "Full carbon, 12 mm thru-axle"],
      ["Drivetrain", "2 × 12 electronic, 52/36 × 11–30"],
      ["Brakes", "Hydraulic disc, 140 mm rotors"],
      ["Wheels", "Carbon 50 mm, hand-built on DT hubs"],
      ["Tyres", "28 mm, tubeless"],
      ["Finishing kit", "Carbon bar, short-nose saddle"],
    ],
    rideNote:
      "Sharp and loud. It wants to be ridden hard, and tells you when you aren't.",
  },
  {
    id: "causse",
    name: "Causse",
    type: "Gravel",
    material: "Steel",
    price: 3150,
    frameset: 1580,
    weight: 10.2,
    line: "Gravel without the drama: 50 mm tyres, three bottle cages, mounts everywhere.",
    description: [
      "Named for the limestone plateaus it was tested on. Causse has a longer front centre and a slacker head angle than Corsa, so it stays straight on loose descents and climbs seated on washboard.",
      "Three bottle mounts, fork cargo mounts, a top-tube bag mount and full mudguard eyelets. Run it at 40 mm for fast dirt roads or at 50 mm when the map stops showing roads at all.",
    ],
    photo: causse,
    photoAlt:
      "Causse gravel bike in plum leaning on a stone summit marker, with a valley and vineyards below",
    photoPosition: "50% 70%",
    finishes: [
      { name: "Plum", hex: "#4a3a5c" },
      { name: "Forest", hex: "#36584c" },
      { name: "Chalk", hex: "#e6dfcc" },
    ],
    sizes: [50, 52, 54, 56, 58, 60],
    baseSize: 54,
    toOrder: [60],
    geometry: {
      stack: 585,
      reach: 375,
      headAngle: 71,
      seatAngle: 73,
      seatTube: 500,
      headTube: 160,
      chainstay: 435,
      bbDrop: 75,
      offset: 50,
    },
    tyre: 45,
    clearance: 50,
    bar: "drop",
    specs: [
      ["Frame", "Chromoly, oversized down tube, 12 mm thru-axles"],
      ["Fork", "Steel, triple cargo mounts, dynamo routing"],
      ["Drivetrain", "1 × 12 wide range, 40 × 10–52"],
      ["Brakes", "Hydraulic disc, 160 mm rotors"],
      ["Wheels", "Hand-built alloy, 32 h, tubeless"],
      ["Tyres", "45 mm semi-slick"],
      ["Finishing kit", "Flared alloy bar, 380 mm, cork tape"],
    ],
    rideNote: "Planted. Lets you look at the view on the way down.",
  },
  {
    id: "steppe",
    name: "Steppe",
    type: "Adventure",
    material: "Steel",
    price: 3690,
    frameset: 1790,
    weight: 12.4,
    line: "Packed for a week. 29 × 2.4 tyres, flat bar, low gears.",
    description: [
      "Steppe is our answer to people who come in with a map and a month off. It is a rigid steel mountain-bike frame with touring manners: long chainstays, low bottom bracket, and every braze-on we could fit.",
      "It carries a full frame bag, a seat pack and fork cages without shimmying, and the 1 × 12 drivetrain has a gear low enough to winch up a fire road with everything on board.",
    ],
    photo: steppe,
    photoAlt:
      "Steppe adventure bike in saffron, loaded with frame, seat and handlebar bags on a ridge at sunset",
    photoPosition: "50% 75%",
    finishes: [
      { name: "Saffron", hex: "#d99a27" },
      { name: "Olive", hex: "#59603f" },
    ],
    sizes: [50, 53, 56, 59],
    baseSize: 53,
    toOrder: [59],
    geometry: {
      stack: 610,
      reach: 395,
      headAngle: 69.5,
      seatAngle: 74,
      seatTube: 470,
      headTube: 150,
      chainstay: 450,
      bbDrop: 65,
      offset: 55,
    },
    tyre: 58,
    clearance: 61,
    bar: "flat",
    specs: [
      ["Frame", "Chromoly, rigid, Boost spacing, 3-pack fork mounts"],
      ["Fork", "Steel, 51 mm offset, dynamo routing"],
      ["Drivetrain", "1 × 12 MTB, 30 × 10–51"],
      ["Brakes", "4-piston hydraulic, 180/160 mm"],
      ["Wheels", "Hand-built alloy, 32 h, dynamo front hub"],
      ["Tyres", "29 × 2.4 in, tubeless"],
      ["Finishing kit", "Alt-sweep bar, ergonomic grips, dropper-ready"],
    ],
    rideNote: "Slow to start, impossible to stop. Better loaded than empty.",
  },
  {
    id: "lilla",
    name: "Lilla",
    type: "City",
    material: "Steel",
    price: 890,
    weight: 10.4,
    line: "One gear, two colours, nothing to adjust on a Monday morning.",
    description: [
      "Lilla is a single-speed steel commuter with a flip-flop hub: freewheel for traffic, fixed for fun. The frame is TIG-welded in small batches and finished in our paint shop.",
      "Mudguard and rack eyelets, a chain that is easy to keep clean, and the brightest rims we could find, because being seen is half of city riding.",
    ],
    photo: lilla,
    photoAlt:
      "Lilla single-speed city bike in lilac with orange rims, against a whitewashed brick wall",
    photoPosition: "50% 85%",
    finishes: [
      { name: "Lilac", hex: "#8f97c9" },
      { name: "Chalk", hex: "#e6dfcc" },
    ],
    sizes: [51, 54, 57, 60],
    baseSize: 54,
    toOrder: [],
    geometry: {
      stack: 575,
      reach: 375,
      headAngle: 72,
      seatAngle: 73.5,
      seatTube: 540,
      headTube: 150,
      chainstay: 420,
      bbDrop: 68,
      offset: 45,
    },
    tyre: 32,
    clearance: 35,
    bar: "flat",
    specs: [
      ["Frame", "TIG-welded hi-ten steel, horizontal dropouts"],
      ["Fork", "Steel, mudguard and rack eyelets"],
      ["Drivetrain", "Single speed, 44 × 17, flip-flop hub"],
      ["Brakes", "Dual-pivot calipers"],
      ["Wheels", "Alloy deep-V, 32 h, orange"],
      ["Tyres", "32 mm puncture-resistant"],
      ["Finishing kit", "Riser bar, lock-on grips, city saddle"],
    ],
    rideNote: "Light on its feet in traffic. Best with a bell.",
  },
  {
    id: "citta",
    name: "Città",
    type: "City",
    material: "Steel",
    price: 1240,
    weight: 11.8,
    line: "An upright lugged commuter with three gears hidden in the hub.",
    description: [
      "Città is built for the ride to work and the ride to the market, in a shirt, in the rain. Lugged steel, an upright position and a three-speed hub that shifts while standing at the lights.",
      "It comes with full mudguards, a chainguard, and dynamo lights front and rear. Leave it outside; it will not mind.",
    ],
    photo: citta,
    photoAlt:
      "Città city bike in chalk white with swept-back bars, against a turquoise wooden door",
    photoPosition: "50% 70%",
    finishes: [
      { name: "Chalk", hex: "#ece6d4" },
      { name: "Cobalt", hex: "#2c4f8f" },
    ],
    sizes: [50, 54, 58],
    baseSize: 54,
    toOrder: [],
    geometry: {
      stack: 600,
      reach: 360,
      headAngle: 71.5,
      seatAngle: 73,
      seatTube: 540,
      headTube: 175,
      chainstay: 445,
      bbDrop: 70,
      offset: 50,
    },
    tyre: 38,
    clearance: 42,
    bar: "swept",
    specs: [
      ["Frame", "Lugged chromoly, kickstand plate"],
      ["Fork", "Lugged steel crown, rack mounts"],
      ["Drivetrain", "3-speed internal hub, chainguard"],
      ["Brakes", "Roller brakes, sealed"],
      ["Wheels", "Alloy, 36 h, dynamo front hub"],
      ["Tyres", "38 mm reflective sidewall"],
      ["Finishing kit", "Swept-back bar, sprung saddle, lights fitted"],
    ],
    rideNote: "Sit up, look around, arrive dry.",
  },
  {
    id: "pista",
    name: "Pista",
    type: "Track",
    material: "Steel",
    price: 1380,
    weight: 8.9,
    line: "A fixed-gear frame cut for the velodrome and the city's quiet hours.",
    description: [
      "Pista uses track geometry — steep angles, short stays, a high bottom bracket — with a front brake drilled for the road. It is the bike our mechanics ride to work.",
      "Fixed only. One gear, one chain line, one way to ride it. Track-legal with the brake removed.",
    ],
    photo: pista,
    photoAlt:
      "Pista fixed-gear bike in matte black with tan-wall tyres, against a grey concrete wall",
    photoPosition: "50% 70%",
    finishes: [
      { name: "Matte black", hex: "#222624" },
      { name: "Race red", hex: "#d42d22" },
    ],
    sizes: [50, 52, 54, 56, 58],
    baseSize: 54,
    toOrder: [50],
    geometry: {
      stack: 535,
      reach: 390,
      headAngle: 74,
      seatAngle: 74,
      seatTube: 530,
      headTube: 125,
      chainstay: 395,
      bbDrop: 60,
      offset: 35,
    },
    tyre: 25,
    clearance: 28,
    bar: "drop",
    specs: [
      ["Frame", "Chromoly, track ends, 120 mm spacing"],
      ["Fork", "Steel, drilled for a front brake"],
      ["Drivetrain", "Fixed, 48 × 16, track cog and lockring"],
      ["Brakes", "Front caliper (removable)"],
      ["Wheels", "Low-flange track hubs, 32 h"],
      ["Tyres", "25 mm tan-wall"],
      ["Finishing kit", "Track drop bar, alloy stem"],
    ],
    rideNote: "Direct. Every pedal stroke is the bike moving.",
  },
];

export const bikeTypes: BikeType[] = [
  "Road",
  "Gravel",
  "Adventure",
  "City",
  "Track",
];

export const bikeIncludes = [
  "Fitted to you in the shop before you ride away — saddle height, bar reach, cleats.",
  "First tune free within 3 months, once the cables and spokes have settled.",
  "Lifetime frame warranty on everything we braze. Crash replacement at cost.",
];

/* -------------------------------------------------------------- configurator */

export type Option = {
  id: string;
  name: string;
  detail: string;
  price: number;
  weight: number;
};

export const build = {
  platforms: ["corsa", "causse", "steppe"],
  finishes: [
    { name: "Race red", hex: "#d42d22" },
    { name: "Chalk", hex: "#e6dfcc" },
    { name: "Forest", hex: "#36584c" },
    { name: "Graphite", hex: "#2f3531" },
    { name: "Cobalt", hex: "#2c4f8f" },
    { name: "Saffron", hex: "#d99a27" },
    { name: "Plum", hex: "#4a3a5c" },
    { name: "Tobacco", hex: "#5a3b26" },
  ] satisfies Finish[],
  groupsets: [
    {
      id: "mech",
      name: "2 × 12 mechanical",
      detail: "50/34 × 11–34. Cable-actuated, fixable anywhere.",
      price: 0,
      weight: 0,
    },
    {
      id: "wide",
      name: "1 × 12 wide range",
      detail: "40 × 10–52. One shifter, huge range, quiet on dirt.",
      price: 180,
      weight: -0.15,
    },
    {
      id: "electronic",
      name: "2 × 12 electronic",
      detail: "50/34 × 11–34. Wireless shifting, charges by USB-C.",
      price: 1150,
      weight: 0.05,
    },
  ] satisfies Option[],
  wheels: [
    {
      id: "alloy",
      name: "Hand-built alloy",
      detail: "28 h rims laced in the shop. Easy to true, cheap to rebuild.",
      price: 0,
      weight: 0,
    },
    {
      id: "dynamo",
      name: "Alloy with dynamo hub",
      detail: "Front hub powers lights and a USB charger.",
      price: 420,
      weight: 0.4,
    },
    {
      id: "carbon",
      name: "Carbon 40 mm",
      detail: "Hand-built carbon hoops. Light, stiff, fast on the flat.",
      price: 1290,
      weight: -0.45,
    },
  ] satisfies Option[],
  extras: [
    {
      id: "mudguards",
      name: "Full mudguards",
      detail: "Aluminium, fitted with stays",
      price: 140,
      weight: 0.55,
    },
    {
      id: "rack",
      name: "Rear rack",
      detail: "Steel, 25 kg rated",
      price: 190,
      weight: 0.7,
    },
    {
      id: "fit",
      name: "Full bike fit",
      detail: "90 minutes before the build",
      price: 180,
      weight: 0,
    },
  ] satisfies Option[],
  customPaint: { name: "Custom colour match", price: 280 },
  leadWeeks: 4,
};

/* ------------------------------------------------------------------ workshop */

export type ServicePackage = {
  id: string;
  name: string;
  price: number;
  time: string;
  summary: string;
  includes: string[];
};

export const servicePackages: ServicePackage[] = [
  {
    id: "check",
    name: "Safety check",
    price: 45,
    time: "While you wait, 30 min",
    summary: "Before a sportive, after a winter in the shed.",
    includes: [
      "Brakes adjusted",
      "Gears indexed",
      "Tyres and pressures",
      "Every bolt torqued to spec",
    ],
  },
  {
    id: "tune",
    name: "Tune",
    price: 95,
    time: "Same day if in by 10:00",
    summary: "The one most bikes need twice a year.",
    includes: [
      "Everything in the safety check",
      "Drivetrain cleaned",
      "Wheels trued",
      "Headset and hubs adjusted",
    ],
  },
  {
    id: "full",
    name: "Full service",
    price: 210,
    time: "2 working days",
    summary: "Stripped, cleaned and rebuilt with new cables.",
    includes: [
      "Everything in the tune",
      "Drivetrain off and degreased",
      "New cables and housing",
      "Bearings regreased",
    ],
  },
  {
    id: "overhaul",
    name: "Overhaul",
    price: 360,
    time: "4 working days",
    summary: "Down to the bare frame. Comes back better than new.",
    includes: [
      "Everything in the full service",
      "Frame stripped and inspected",
      "Fork lowers serviced",
      "Brakes bled, pads replaced",
    ],
  },
];

export const serviceExtras: [string, number][] = [
  ["Puncture repair, inner tube fitted", 15],
  ["Tubeless set-up, per wheel", 35],
  ["Wheel true, per wheel", 25],
  ["Hydraulic brake bleed, per end", 40],
  ["Chain fitted (plus chain)", 18],
  ["Bar tape fitted", 20],
  ["Wheel build, labour", 90],
  ["Bike fit, 90 minutes", 180],
];

export const dropOffTimes = ["08:30", "10:00", "12:30", "16:00"];

export const serviceFaq = [
  {
    q: "Do I need to book, or can I just turn up?",
    a: "Safety checks and punctures are walk-in during opening hours. Everything else is booked so the bike goes straight onto a stand rather than into a queue.",
  },
  {
    q: "What if you find something else wrong?",
    a: "We stop and call you. Nothing above the quoted price happens without a yes from you, and we keep the worn parts so you can see them.",
  },
  {
    q: "Do you work on bikes you didn't sell?",
    a: "Yes, most of the bikes on our stands came from somewhere else. We service any bicycle, including e-bikes with mid-drive motors, though we do not repair the motor itself.",
  },
  {
    q: "How do I know when it's ready?",
    a: "You get a text when the bike comes off the stand. We hold finished bikes for seven days free, then charge $5 a day storage.",
  },
  {
    q: "Is there a discount for club members?",
    a: "Rides club members get 10% off labour on every booking. Mention it when you drop off.",
  },
];

/* --------------------------------------------------------------------- rides */

export type Ride = {
  id: string;
  name: string;
  day: string;
  time: string;
  distance: number;
  climb: number;
  pace: string;
  surface: "Road" | "Gravel" | "Path";
  start: string;
  note: string;
  profile: number[];
};

export const rides: Ride[] = [
  {
    id: "foundry-loop",
    name: "Foundry Loop",
    day: "Tuesday",
    time: "18:30",
    distance: 42,
    climb: 380,
    pace: "Steady, 27–29 km/h",
    surface: "Road",
    start: "Shop front",
    note: "The after-work loop. Two-up, chain-gang style on the river road, regroup at the top of Kiln Hill.",
    profile: [
      40, 42, 45, 44, 48, 60, 92, 118, 132, 120, 96, 80, 72, 66, 62, 70, 74, 68,
      58, 50, 46, 44, 42, 40,
    ],
  },
  {
    id: "quarry-gravel",
    name: "Quarry Gravel",
    day: "Thursday",
    time: "18:00",
    distance: 38,
    climb: 520,
    pace: "Chatty, 20–23 km/h",
    surface: "Gravel",
    start: "Shop front",
    note: "Canal towpath out, old quarry tracks up, forest road home. Lights from October.",
    profile: [
      40, 40, 41, 41, 42, 55, 84, 120, 150, 168, 160, 140, 152, 170, 182, 160,
      130, 108, 92, 74, 60, 50, 44, 40,
    ],
  },
  {
    id: "coffee-run",
    name: "Coffee Run",
    day: "Saturday",
    time: "08:00",
    distance: 55,
    climb: 410,
    pace: "Social, no-drop, 24 km/h",
    surface: "Road",
    start: "Shop front",
    note: "Out to the bakery at Lunde and back the long way. Nobody gets left; the back marker wears the orange gilet.",
    profile: [
      40, 46, 52, 60, 72, 80, 76, 70, 74, 88, 96, 90, 82, 78, 84, 92, 86, 72,
      64, 58, 52, 48, 44, 40,
    ],
  },
  {
    id: "ridge-century",
    name: "Ridge Century",
    day: "Sunday",
    time: "07:30",
    distance: 112,
    climb: 1640,
    pace: "Brisk, 29–31 km/h",
    surface: "Road",
    start: "Halden station",
    note: "Three climbs over the ridge and the long descent to the coast. Bring two bottles and something to eat every hour.",
    profile: [
      40, 70, 140, 210, 250, 190, 120, 160, 260, 320, 280, 200, 130, 180, 290,
      360, 310, 220, 150, 100, 70, 50, 40, 30,
    ],
  },
  {
    id: "learners-lap",
    name: "Learners' Lap",
    day: "First Sunday",
    time: "10:00",
    distance: 18,
    climb: 90,
    pace: "Easy, 16–18 km/h",
    surface: "Path",
    start: "Shop front",
    note: "For new riders, returning riders and anyone on a new bike. We stop to practise group signals and fix a puncture together.",
    profile: [
      40, 41, 42, 44, 46, 50, 54, 58, 60, 58, 54, 50, 48, 50, 52, 54, 52, 50,
      48, 46, 44, 42, 41, 40,
    ],
  },
];

export const paceGroups = [
  {
    id: "social",
    name: "Social",
    speed: "22–25 km/h",
    text: "Conversation pace. Regroups at every junction. Nobody is dropped.",
  },
  {
    id: "steady",
    name: "Steady",
    speed: "26–29 km/h",
    text: "Through-and-off on the flat, own pace on the climbs, regroup at the top.",
  },
  {
    id: "brisk",
    name: "Brisk",
    speed: "29–32 km/h",
    text: "Proper training. Expect to work, and to be waited for only at the summits.",
  },
];

export const rideRules = [
  "Arrive five minutes early with a working bike, a spare tube and a pump.",
  "Ride two abreast, single out when the ride leader calls it.",
  "Point out holes, call cars, never half-wheel.",
  "Lights front and rear from October to March, whatever the forecast.",
  "If you puncture, shout. We all stop. It is a club, not a race.",
];

/* --------------------------------------------------------------------- about */

export const story = {
  intro:
    "Velo started in 2009 as a frame jig, a torch and a borrowed corner of the old Halden tannery. Mara Lindqvist built eleven frames that first year, sold nine, and rode the other two into the ground.",
  body: [
    "We still braze our own steel frames in the back room, about 140 a year, each drawn for the person who will ride it. Out front there is a shop floor with the bikes we stock, a workshop with four stands, and a kettle that is never quite cold.",
    "We are a bike shop first. Most of our week is servicing bicycles we did not build: commuters, kids' bikes, forty-year-old tourers with a story. A shop that fixes things is a shop people come back to.",
  ],
  steps: [
    {
      title: "Fit",
      text: "Ninety minutes on the fit bike. We measure you, watch you pedal and talk about where you want to go.",
    },
    {
      title: "Drawing",
      text: "A full-size geometry drawing for your frame, sent to you to argue with before a single tube is cut.",
    },
    {
      title: "Brazing",
      text: "Tubes mitred by hand and fillet-brazed in the jig. Every joint is filed and checked for alignment.",
    },
    {
      title: "Paint & build",
      text: "Powder coat or wet paint in-house, then built with parts you chose and wheels laced on our bench.",
    },
  ],
};

export const team = [
  {
    name: "Mara Lindqvist",
    role: "Founder, frame builder",
    note: "Has brazed every Velo frame since 2009. Rides the Ridge Century every Sunday, in every weather.",
  },
  {
    name: "Tomás Echeverri",
    role: "Head mechanic",
    note: "Fifteen years on the stand. Can hear a dry bottom bracket from across the shop.",
  },
  {
    name: "Priya Raman",
    role: "Fitter, ride leader",
    note: "Runs bike fits on Tuesdays and Saturdays and leads the Thursday gravel ride.",
  },
  {
    name: "Jonah Weiss",
    role: "Wheel builder",
    note: "Has laced more than four thousand wheels. Still tunes spokes by ear.",
  },
  {
    name: "Ines Okafor",
    role: "Shop and paint",
    note: "Mixes every colour we spray and keeps the shop floor stocked.",
  },
];

/* ---------------------------------------------------------------------- home */

export const home = {
  title: "Bicycles built in the back room.",
  intro:
    "Velo is a bike shop and frame workshop in Halden. We sell bikes we would ride, braze steel frames to fit, service anything with two wheels, and lead five group rides a week.",
  band: ["Built for the ride.", "Not the finish line."],
  process: "From fit to first ride in four weeks",
  quote: {
    text: "I came in for a puncture and left with a Thursday ride, three new friends, and a frame on order. Two years later it still feels like it was drawn around me. Because it was.",
    who: "Aiko Brenner, Causse rider since 2023",
  },
  quote2: {
    text: "They called before replacing my chainrings, showed me the wear, and said I could get another thousand kilometres out of them. I've never been told that by a bike shop.",
    who: "Daniel Osei, commuter, Città owner",
  },
};

export const photos = {
  rideHills,
  rideCoast,
  rideForest,
  rideBars,
  shopTruing,
  shopTools,
  shopStand,
};

/* ------------------------------------------------------------------ checkout */

export const checkout = {
  delivery: [
    {
      id: "collect",
      name: "Collect and fit in the shop",
      detail: "Ready in 2–5 days. Includes a 30-minute fit.",
      price: 0,
    },
    {
      id: "deliver",
      name: "Delivered, built and fitted",
      detail: "Within 40 km of Halden. We bring it ready to ride.",
      price: 60,
    },
    {
      id: "ship",
      name: "Shipped boxed",
      detail: "90% assembled, 4–6 working days.",
      price: 95,
    },
  ],
};
