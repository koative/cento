import roadIceland from "./assets/road-iceland.jpg";
import transalpina from "./assets/transalpina.jpg";
import stelvio from "./assets/stelvio.jpg";
import nightRoad from "./assets/night-road.jpg";
import garage from "./assets/garage.jpg";
import windfarm from "./assets/windfarm.jpg";
import desert from "./assets/desert.jpg";
import charging from "./assets/charging.jpg";
import snowRoad from "./assets/snow-road.jpg";
import lindis from "./assets/lindis.jpg";
import dawn from "./assets/dawn.jpg";

export type Photo = { src: string; alt: string; width: number; height: number };

const photo = (
  src: string,
  alt: string,
  width = 1600,
  height = 1067,
): Photo => ({ src, alt, width, height });

export const photos = {
  roadIceland: photo(
    roadIceland,
    "An empty two-lane road running straight towards green hills under a pale sky",
    1600,
    899,
  ),
  transalpina: photo(
    transalpina,
    "A mountain road switching back across a golden alpine ridge, one red van climbing",
  ),
  stelvio: photo(
    stelvio,
    "Hairpin bends stacked up a misty green mountainside",
    1600,
    1100,
  ),
  nightRoad: photo(
    nightRoad,
    "A wet road at night with red and white light trails from passing traffic",
  ),
  garage: photo(
    garage,
    "Rows of concrete parking-garage decks with red and blue painted floors",
  ),
  windfarm: photo(
    windfarm,
    "Two wind turbines turning over flat farmland under a bright cloudy sky",
  ),
  desert: photo(
    desert,
    "A desert highway with a yellow centre line running towards distant mountains",
  ),
  charging: photo(
    charging,
    "A charging connector plugged into the open charge port of a grey car",
    1600,
    899,
  ),
  snowRoad: photo(
    snowRoad,
    "A snow-packed road heading toward a white mountain at dusk",
  ),
  lindis: photo(
    lindis,
    "A road winding through tussock-covered hills under a blue sky",
    1600,
    1200,
  ),
  dawn: photo(
    dawn,
    "A car's headlights on a dirt road among dark boulders before sunrise",
  ),
};

/* ───────── Brand ───────── */

export const brand = {
  name: "Vector",
  legal: "Vector Motor Company",
  sector: "Electric cars",
  tagline: "Six electric cars, with the range you get in January.",
  email: "hello@vector.example",
  ownersEmail: "owners@vector.example",
  phone: "+1 555 0134 0100",
  roadside: "+1 555 0134 0199",
  address: "Plant One, 4200 Portage Road, Kalamazoo, MI 49002",
  deposit: 250,
  destination: 1450,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const nav = [
  { to: "/models", label: "Models" },
  { to: "/configure", label: "Configure" },
  { to: "/charging", label: "Charging" },
  { to: "/owners", label: "Owners" },
  { to: "/about", label: "Company" },
];

/* ───────── Vehicles ───────── */

export type WheelDesign = "aero" | "spoke" | "turbine";
type Pt = readonly [number, number];

/** Side-elevation geometry in millimetres: x from the rear bumper, y above the ground. */
export type Profile = {
  length: number;
  height: number;
  wheelbase: number;
  rearAxle: number;
  tire: number;
  sill: number;
  /** 12 points: rear bumper bottom → over the roof → front bumper bottom. */
  body: Pt[];
  /** 5 points along the top of the side glass, rear belt → front belt. */
  glass: Pt[];
  pillars: number[];
  doors: number[];
  handles: number[];
};

export type BodyType =
  "Hatchback" | "Sedan" | "Crossover" | "SUV" | "Van" | "Fastback";

export type Trim = {
  id: string;
  name: string;
  drive: "RWD" | "AWD";
  price: number;
  /** EPA-style combined range, miles */
  range: number;
  battery: number;
  power: number;
  zeroSixty: number;
  topSpeed: number;
  peakDc: number;
};

export type Model = {
  slug: string;
  name: string;
  body: BodyType;
  line: string;
  summary: string;
  story: string[];
  seats: string;
  cargo: number;
  frunk: number;
  towing: number | null;
  clearance: number;
  rim: number;
  trims: Trim[];
  paints: string[];
  /** The launch colour: used in drawings and as the configurator's starting paint. */
  color: string;
  photo: Photo;
  highlights: { title: string; text: string }[];
  delivery: string;
  profile: Profile;
};

export const models: Model[] = [
  {
    slug: "norm",
    name: "Norm",
    body: "Hatchback",
    line: "The city car that still does the coast road.",
    summary:
      "A four-metre hatchback with a flat floor, a 13.8 cu ft boot and a turning circle tighter than most parking garages.",
    story: [
      "Norm is the car we would buy first. It is short enough for a curbside space in Brooklyn and tall enough that rear passengers sit upright instead of folded. The rear doors open to nearly ninety degrees, which is the detail parents of car-seat-age children notice on the first day.",
      "The Standard battery uses LFP cells: no cobalt, happy to be charged to 100% every night, and still 262 miles on the combined cycle. The Long Range pack adds 19 kWh for people whose weekends end at the coast.",
    ],
    seats: "5",
    cargo: 13.8,
    frunk: 1.2,
    towing: null,
    clearance: 5.9,
    rim: 18,
    trims: [
      {
        id: "norm-standard",
        name: "Standard",
        drive: "RWD",
        price: 31900,
        range: 262,
        battery: 58,
        power: 201,
        zeroSixty: 6.9,
        topSpeed: 112,
        peakDc: 150,
      },
      {
        id: "norm-long",
        name: "Long Range",
        drive: "RWD",
        price: 36400,
        range: 341,
        battery: 77,
        power: 228,
        zeroSixty: 6.4,
        topSpeed: 112,
        peakDc: 170,
      },
    ],
    paints: ["studio", "tarmac", "graphite", "glacier", "lichen", "hv"],
    color: "hv",
    photo: photos.garage,
    highlights: [
      {
        title: "34.4 ft turning circle",
        text: "Rear-wheel drive leaves the front wheels free to turn further — U-turns on a two-lane street are routine.",
      },
      {
        title: "Charge to 100% daily",
        text: "The Standard pack's LFP chemistry is built for full charges; there is no 80% habit to learn.",
      },
      {
        title: "Flat floor, five real seats",
        text: "No transmission tunnel, so the middle rear seat has somewhere to put its feet.",
      },
    ],
    delivery: "In stock at all six studios",
    profile: {
      length: 4150,
      height: 1560,
      wheelbase: 2700,
      rearAxle: 720,
      tire: 690,
      sill: 290,
      body: [
        [40, 330],
        [0, 560],
        [28, 990],
        [110, 1290],
        [330, 1490],
        [900, 1552],
        [1700, 1560],
        [2250, 1478],
        [2950, 1060],
        [3700, 955],
        [4125, 800],
        [4105, 330],
      ],
      glass: [
        [330, 1075],
        [470, 1430],
        [1700, 1500],
        [2215, 1430],
        [2850, 1075],
      ],
      pillars: [1880],
      doors: [1120, 1960, 2880],
      handles: [1420, 2310],
    },
  },
  {
    slug: "span",
    name: "Span",
    body: "Sedan",
    line: "A long-distance sedan that charges while you eat lunch.",
    summary:
      "Our most efficient car: a 0.21 drag coefficient, 368 miles of range and a 10–80% charge in about the time it takes to order and eat a sandwich.",
    story: [
      "Span is shaped by the wind tunnel first and the stylists second. The roof falls in one unbroken line to a short Kamm tail; the mirrors are 30% smaller than our first prototypes; the underbody is flat from bumper to bumper. It all adds up to 3.9 miles per kWh at highway speed.",
      "Inside, the dashboard is one low shelf of ash veneer with a single 15-inch display. The physical controls stayed: volume, hazards, defrost and the climate temperature all have their own switches, because some things should never be two menus deep.",
    ],
    seats: "5",
    cargo: 15.1,
    frunk: 2.6,
    towing: null,
    clearance: 5.4,
    rim: 19,
    trims: [
      {
        id: "span-long",
        name: "Long Range",
        drive: "RWD",
        price: 44500,
        range: 368,
        battery: 82,
        power: 282,
        zeroSixty: 5.6,
        topSpeed: 125,
        peakDc: 220,
      },
      {
        id: "span-dual",
        name: "Dual Motor",
        drive: "AWD",
        price: 51900,
        range: 349,
        battery: 82,
        power: 456,
        zeroSixty: 4.2,
        topSpeed: 140,
        peakDc: 220,
      },
    ],
    paints: ["studio", "tarmac", "graphite", "night", "glacier", "clay"],
    color: "glacier",
    photo: photos.roadIceland,
    highlights: [
      {
        title: "0.21 Cd",
        text: "A flat underbody, flush handles and a Kamm tail make Span our quietest car at 70 mph.",
      },
      {
        title: "10–80% in 24 minutes",
        text: "The 800-volt pack holds 220 kW past half charge before the curve starts to bend.",
      },
      {
        title: "Switches you can find",
        text: "Volume, hazards, defrost and temperature stay physical. Everything else lives on one screen.",
      },
    ],
    delivery: "Deliveries in 3–5 weeks",
    profile: {
      length: 4880,
      height: 1440,
      wheelbase: 2960,
      rearAxle: 1000,
      tire: 720,
      sill: 290,
      body: [
        [40, 330],
        [0, 560],
        [20, 880],
        [260, 958],
        [800, 1120],
        [1600, 1405],
        [2350, 1440],
        [2950, 1368],
        [3650, 1010],
        [4400, 898],
        [4855, 760],
        [4835, 330],
      ],
      glass: [
        [860, 1048],
        [1600, 1352],
        [2350, 1385],
        [2900, 1318],
        [3540, 1040],
      ],
      pillars: [2300],
      doors: [1280, 2340, 3420],
      handles: [1880, 2900],
    },
  },
  {
    slug: "axis",
    name: "Axis",
    body: "Crossover",
    line: "Higher seat, same footprint, the long weekend in the back.",
    summary:
      "A compact crossover with a 6.9-inch ground clearance, a power tailgate and rear seats that fold flat from the boot with one pull.",
    story: [
      "Axis exists because most people asked for a Span they could climb into rather than drop into. The hip point sits four inches higher, the roof two-and-a-half, and the boot swallows a mountain bike with the front wheel off.",
      "Dual Motor models add a front motor that decouples on the highway to save energy and reconnects in 20 milliseconds when a rear wheel slips on a wet ramp or a gravel trailhead.",
    ],
    seats: "5",
    cargo: 26.4,
    frunk: 2.1,
    towing: 3500,
    clearance: 6.9,
    rim: 19,
    trims: [
      {
        id: "axis-long",
        name: "Long Range",
        drive: "RWD",
        price: 47900,
        range: 318,
        battery: 82,
        power: 268,
        zeroSixty: 6.1,
        topSpeed: 124,
        peakDc: 220,
      },
      {
        id: "axis-dual",
        name: "Dual Motor",
        drive: "AWD",
        price: 53400,
        range: 301,
        battery: 82,
        power: 402,
        zeroSixty: 4.6,
        topSpeed: 130,
        peakDc: 220,
      },
    ],
    paints: [
      "studio",
      "tarmac",
      "graphite",
      "night",
      "lichen",
      "glacier",
      "clay",
    ],
    color: "lichen",
    photo: photos.transalpina,
    highlights: [
      {
        title: "26.4 cu ft boot",
        text: "57.8 cu ft with the rear seats down, and a floor that sits level with the bumper.",
      },
      {
        title: "Disconnecting front motor",
        text: "AWD only when you need it — the highway range penalty is 17 miles, not 40.",
      },
      {
        title: "3,500 lb towing",
        text: "Enough for a small camper or two jet skis, with trailer-aware range prediction.",
      },
    ],
    delivery: "Deliveries in 2–4 weeks",
    profile: {
      length: 4600,
      height: 1620,
      wheelbase: 2850,
      rearAxle: 880,
      tire: 760,
      sill: 360,
      body: [
        [40, 400],
        [0, 640],
        [40, 1040],
        [200, 1200],
        [600, 1448],
        [1300, 1600],
        [2100, 1620],
        [2700, 1556],
        [3400, 1150],
        [4150, 1030],
        [4575, 880],
        [4555, 400],
      ],
      glass: [
        [520, 1150],
        [1300, 1545],
        [2100, 1565],
        [2650, 1502],
        [3290, 1160],
      ],
      pillars: [2060],
      doors: [1180, 2120, 3220],
      handles: [1660, 2700],
    },
  },
  {
    slug: "field",
    name: "Field",
    body: "SUV",
    line: "Seven seats, third row for adults, 371 miles.",
    summary:
      "A three-row SUV where the third row is real: 33 inches of legroom, its own vents and USB-C, and a second row that slides with a child seat still fitted.",
    story: [
      "Field is the car we tested hardest with families. The second-row captain's chairs tumble forward with a child seat attached, so nobody has to be unbuckled to let a teenager into the back. The third row reclines and gets the same air vents as the front.",
      "The 118 kWh Max Range pack is the largest we build. On the published winter test — 20 °F, 70 mph, seven people's worth of ballast — it still covers 266 miles.",
    ],
    seats: "6 or 7",
    cargo: 18.6,
    frunk: 4.2,
    towing: 5000,
    clearance: 8.1,
    rim: 20,
    trims: [
      {
        id: "field-dual",
        name: "Dual Motor",
        drive: "AWD",
        price: 62400,
        range: 322,
        battery: 106,
        power: 510,
        zeroSixty: 4.9,
        topSpeed: 130,
        peakDc: 250,
      },
      {
        id: "field-max",
        name: "Max Range",
        drive: "AWD",
        price: 69900,
        range: 371,
        battery: 118,
        power: 510,
        zeroSixty: 5.1,
        topSpeed: 130,
        peakDc: 250,
      },
    ],
    paints: ["studio", "tarmac", "graphite", "night", "lichen", "clay"],
    color: "graphite",
    photo: photos.lindis,
    highlights: [
      {
        title: "A third row for adults",
        text: "33 inches of legroom and a cushion high enough that knees stay below the chin.",
      },
      {
        title: "Tilt-and-slide with a car seat",
        text: "The second row moves forward with an installed child seat, so the back stays reachable.",
      },
      {
        title: "5,000 lb towing",
        text: "Trailer mode adds the trailer's weight and frontal area to every range estimate.",
      },
    ],
    delivery: "Deliveries from January 2027",
    profile: {
      length: 5050,
      height: 1780,
      wheelbase: 3050,
      rearAxle: 970,
      tire: 800,
      sill: 400,
      body: [
        [40, 440],
        [0, 700],
        [30, 1250],
        [70, 1560],
        [200, 1740],
        [900, 1775],
        [2300, 1780],
        [3000, 1738],
        [3720, 1240],
        [4500, 1140],
        [5030, 980],
        [5010, 440],
      ],
      glass: [
        [180, 1260],
        [260, 1688],
        [2300, 1720],
        [2950, 1680],
        [3600, 1262],
      ],
      pillars: [1240, 2440],
      doors: [1500, 2480, 3560],
      handles: [2000, 3060],
    },
  },
  {
    slug: "basis",
    name: "Basis",
    body: "Van",
    line: "A van with the floor of a living room and the range of a sedan.",
    summary:
      "Eight seats or 140 cu ft of cargo on a perfectly flat floor, power sliding doors on both sides, and 271 miles from a 92 kWh pack.",
    story: [
      "A battery is flat, so we built the van around it. The floor is 15 inches off the ground with no wheel arches intruding between the sliding doors, and every seat behind the driver comes out in under a minute without tools.",
      "Owners use Basis as a school run, a mobile workshop and a weekend camper. The 3.6 kW outlets in the cargo bay run a mitre saw or a kettle; vehicle-to-load stops automatically at whatever range floor you set.",
    ],
    seats: "7 or 8",
    cargo: 140,
    frunk: 3.5,
    towing: 4400,
    clearance: 6.3,
    rim: 19,
    trims: [
      {
        id: "basis-rwd",
        name: "Passenger",
        drive: "RWD",
        price: 54000,
        range: 271,
        battery: 92,
        power: 282,
        zeroSixty: 7.4,
        topSpeed: 99,
        peakDc: 200,
      },
      {
        id: "basis-awd",
        name: "Passenger AWD",
        drive: "AWD",
        price: 59500,
        range: 258,
        battery: 92,
        power: 420,
        zeroSixty: 5.9,
        topSpeed: 99,
        peakDc: 200,
      },
    ],
    paints: ["studio", "tarmac", "graphite", "glacier", "lichen", "hv"],
    color: "studio",
    photo: photos.desert,
    highlights: [
      {
        title: "15-inch step-in",
        text: "The battery is the floor, so the floor is low — and level from the sliding doors to the tailgate.",
      },
      {
        title: "3.6 kW outlets",
        text: "Two 120 V outlets in the bay run power tools, a fridge or a coffee machine off the traction battery.",
      },
      {
        title: "Seats out in a minute",
        text: "Rows two and three unlatch from floor rails without tools; each seat weighs 41 lb.",
      },
    ],
    delivery: "Deliveries in 6–8 weeks",
    profile: {
      length: 5140,
      height: 1990,
      wheelbase: 3200,
      rearAxle: 980,
      tire: 760,
      sill: 380,
      body: [
        [40, 420],
        [0, 700],
        [15, 1400],
        [40, 1800],
        [160, 1968],
        [900, 1990],
        [2600, 1990],
        [3500, 1950],
        [4150, 1350],
        [4750, 1150],
        [5120, 950],
        [5100, 420],
      ],
      glass: [
        [140, 1300],
        [200, 1878],
        [2600, 1910],
        [3460, 1868],
        [4050, 1342],
      ],
      pillars: [1300, 2720],
      doors: [1480, 2760, 3940],
      handles: [2600, 3460],
    },
  },
  {
    slug: "delta",
    name: "Delta",
    body: "Fastback",
    line: "Two doors, four seats, and 820 horsepower if you ask for it.",
    summary:
      "A low fastback grand tourer with a carbon-fibre roof, rear-wheel steering and a battery pack that sits 2 inches lower than Span's.",
    story: [
      "Delta is the car the engineers built for themselves and then had to justify. The pack sits lower than in any other Vector, the roof is carbon fibre, and the rear wheels steer up to four degrees — opposite to the fronts in town, with them on the highway.",
      "The R adds a third motor and a cooling circuit that holds full power for three consecutive laps of a 2.5-mile circuit. On the road it is quiet, firm and still covers 318 miles, because a grand tourer that cannot reach the grand tour is a sports car.",
    ],
    seats: "2+2",
    cargo: 10.5,
    frunk: 1.8,
    towing: null,
    clearance: 4.7,
    rim: 21,
    trims: [
      {
        id: "delta-gt",
        name: "GT",
        drive: "AWD",
        price: 78900,
        range: 352,
        battery: 98,
        power: 580,
        zeroSixty: 3.3,
        topSpeed: 155,
        peakDc: 270,
      },
      {
        id: "delta-r",
        name: "R",
        drive: "AWD",
        price: 96500,
        range: 318,
        battery: 98,
        power: 820,
        zeroSixty: 2.4,
        topSpeed: 165,
        peakDc: 270,
      },
    ],
    paints: ["studio", "graphite", "night", "glacier", "clay", "hv"],
    color: "clay",
    photo: photos.stelvio,
    highlights: [
      {
        title: "Rear-wheel steering",
        text: "Four degrees of rear steer shortens the wheelbase in town and lengthens it at speed.",
      },
      {
        title: "Three-lap cooling",
        text: "The R holds full power for three hard laps before thermal limits trim it back.",
      },
      {
        title: "Carbon roof, low pack",
        text: "The centre of gravity sits 17.3 inches off the road — lower than most sports cars.",
      },
    ],
    delivery: "Limited build slots for spring 2027",
    profile: {
      length: 4620,
      height: 1300,
      wheelbase: 2800,
      rearAxle: 860,
      tire: 720,
      sill: 260,
      body: [
        [40, 300],
        [0, 520],
        [20, 820],
        [180, 880],
        [700, 1078],
        [1500, 1280],
        [2150, 1300],
        [2650, 1240],
        [3300, 900],
        [4100, 778],
        [4600, 640],
        [4580, 300],
      ],
      glass: [
        [900, 976],
        [1500, 1232],
        [2150, 1250],
        [2600, 1195],
        [3200, 918],
      ],
      pillars: [1420],
      doors: [1900, 3180],
      handles: [2050],
    },
  },
];

export const bodyTypes: BodyType[] = [
  "Hatchback",
  "Sedan",
  "Crossover",
  "SUV",
  "Van",
  "Fastback",
];

/* ───────── Configurator options ───────── */

export type Paint = {
  id: string;
  name: string;
  hex: string;
  price: number;
  note: string;
};

export const paints: Paint[] = [
  {
    id: "studio",
    name: "Studio White",
    hex: "#e6e7e2",
    price: 0,
    note: "Solid, no metallic flake",
  },
  {
    id: "tarmac",
    name: "Tarmac",
    hex: "#73787c",
    price: 900,
    note: "Mid grey metallic",
  },
  {
    id: "graphite",
    name: "Graphite",
    hex: "#363a3e",
    price: 1200,
    note: "Dark grey metallic",
  },
  {
    id: "night",
    name: "Night",
    hex: "#16181b",
    price: 1200,
    note: "Deep black pearl",
  },
  {
    id: "glacier",
    name: "Glacier",
    hex: "#a8bbc7",
    price: 1500,
    note: "Pale blue, satin clear coat",
  },
  {
    id: "lichen",
    name: "Lichen",
    hex: "#68745e",
    price: 1500,
    note: "Grey-green metallic",
  },
  {
    id: "clay",
    name: "Clay",
    hex: "#93452f",
    price: 1800,
    note: "Brick red, three-layer",
  },
  {
    id: "hv",
    name: "High Voltage",
    hex: "#d4511c",
    price: 2400,
    note: "The orange of our high-voltage cabling",
  },
];

export type Wheel = {
  id: WheelDesign;
  name: string;
  step: number;
  price: number;
  rangeFactor: number;
  note: string;
};

export const wheels: Wheel[] = [
  {
    id: "aero",
    name: "Aero",
    step: 0,
    price: 0,
    rangeFactor: 1,
    note: "Closed faces, the most range",
  },
  {
    id: "spoke",
    name: "Split-spoke",
    step: 1,
    price: 1500,
    rangeFactor: 0.96,
    note: "Forged, one inch larger",
  },
  {
    id: "turbine",
    name: "Turbine",
    step: 2,
    price: 2800,
    rangeFactor: 0.93,
    note: "Twelve blades, two inches larger",
  },
];

export type Interior = {
  id: string;
  name: string;
  swatch: string;
  price: number;
  note: string;
};

export const interiors: Interior[] = [
  {
    id: "basalt",
    name: "Basalt",
    swatch: "#2b2c2e",
    price: 0,
    note: "Black knit from recycled bottles, ash veneer",
  },
  {
    id: "oat",
    name: "Oat",
    swatch: "#d3cab8",
    price: 900,
    note: "Undyed wool blend, pale oak",
  },
  {
    id: "cognac",
    name: "Cognac",
    swatch: "#8a5434",
    price: 1800,
    note: "Plant-based leather, smoked oak",
  },
];

export type Extra = {
  id: string;
  name: string;
  price: number;
  text: string;
  models?: string[];
};

export const extras: Extra[] = [
  {
    id: "assist",
    name: "Assist Plus",
    price: 3200,
    text: "Hands-free highway driving on 140,000 miles of mapped roads, automatic lane changes.",
  },
  {
    id: "winter",
    name: "Winter Package",
    price: 900,
    text: "Heated rear seats and steering wheel, heated wiper park, heated washer jets.",
  },
  {
    id: "tow",
    name: "Tow Package",
    price: 1100,
    text: "Factory hitch, trailer wiring, trailer-aware range planning.",
    models: ["axis", "field", "basis"],
  },
  {
    id: "wallbox",
    name: "Home Wallbox",
    price: 690,
    text: "11 kW wall charger delivered with your car. Installation booked separately.",
  },
];

/* ───────── Charging ───────── */

export type Charger = {
  id: string;
  name: string;
  kw: number;
  dc: boolean;
  price: number;
  where: string;
};

export const chargers: Charger[] = [
  {
    id: "outlet",
    name: "Wall outlet, 240 V",
    kw: 7.6,
    dc: false,
    price: 0.16,
    where: "Any dryer-style outlet with the included cable",
  },
  {
    id: "wallbox",
    name: "Vector Wallbox",
    kw: 11,
    dc: false,
    price: 0.14,
    where: "Home, overnight on an off-peak tariff",
  },
  {
    id: "public",
    name: "Public DC, 50 kW",
    kw: 50,
    dc: true,
    price: 0.42,
    where: "Libraries, supermarkets, city lots",
  },
  {
    id: "grid",
    name: "Vector Grid",
    kw: 250,
    dc: true,
    price: 0.36,
    where: "310 sites along US interstates",
  },
];

export const chargingPage = {
  intro:
    "Most Vector owners charge at home, overnight, and never think about it. For everything else there is Vector Grid — and every public charger that speaks NACS.",
  home: {
    title: "Home is where 80% of the charging happens",
    text: [
      "The Vector Wallbox delivers 11 kW — about 42 miles of range per hour — so even a Field with an empty pack is full by breakfast. It costs $690, and our installation partners quote a flat $499 for most homes with a panel within 30 feet of the parking spot.",
      "No garage? Every car comes with a 240 V cable for a dryer outlet and a 120 V cable that adds four miles an hour from any household socket — enough for most commutes if the car sleeps plugged in.",
    ],
  },
  grid: {
    title: "Vector Grid",
    text: [
      "310 sites, 2,480 stalls, and none further than 140 miles from the next along the interstates we cover. Every stall delivers up to 250 kW, every site has lighting, a restroom within 300 feet and at least one pull-through stall for trailers.",
      "Plug in and walk away: the car authenticates itself and the bill goes to the card on your Vector account. No app, no membership, no card reader.",
    ],
  },
  tariffs: [
    { label: "Vector Grid, standard", value: "$0.36 / kWh" },
    { label: "Vector Grid, 11 pm – 6 am", value: "$0.24 / kWh" },
    { label: "Idle fee, after 5 minutes at a full site", value: "$0.50 / min" },
    { label: "Home, typical off-peak", value: "$0.14 / kWh" },
  ],
  faq: [
    {
      q: "Can I use other public chargers?",
      a: "Yes. Every Vector has a NACS port and supports Plug & Charge. CCS1 stations work with the adapter that ships in the frunk.",
    },
    {
      q: "Should I charge to 100%?",
      a: "Norm Standard's LFP pack is happiest at 100%. Every other Vector defaults to 80% for daily use; set 100% for road trips the night before you leave.",
    },
    {
      q: "What happens to charging in the cold?",
      a: "Set a departure time or navigate to a charger and the car warms the pack on the way. Unwarmed packs charge slower below 40 °F — the planner accounts for it.",
    },
  ],
};

/* ───────── Studios (test drives) ───────── */

export type Studio = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
};

export const studios: Studio[] = [
  {
    id: "brooklyn",
    city: "New York",
    name: "Brooklyn",
    address: "184 Kent Avenue, Brooklyn, NY 11249",
    hours: "Mon–Fri 10–8 · Sat–Sun 10–6",
    phone: "+1 555 0134 0201",
  },
  {
    id: "chicago",
    city: "Chicago",
    name: "Fulton Market",
    address: "1015 W Fulton Market, Chicago, IL 60607",
    hours: "Mon–Sat 10–7 · Sun 11–5",
    phone: "+1 555 0134 0202",
  },
  {
    id: "austin",
    city: "Austin",
    name: "East Sixth",
    address: "2200 E 6th Street, Austin, TX 78702",
    hours: "Tue–Sun 10–7",
    phone: "+1 555 0134 0203",
  },
  {
    id: "denver",
    city: "Denver",
    name: "RiNo",
    address: "3501 Wazee Street, Denver, CO 80216",
    hours: "Mon–Sat 9–6 · Sun 10–4",
    phone: "+1 555 0134 0204",
  },
  {
    id: "la",
    city: "Los Angeles",
    name: "Arts District",
    address: "940 E 4th Place, Los Angeles, CA 90013",
    hours: "Daily 10–8",
    phone: "+1 555 0134 0205",
  },
  {
    id: "seattle",
    city: "Seattle",
    name: "Georgetown",
    address: "5900 Airport Way S, Seattle, WA 98108",
    hours: "Mon–Sat 10–6",
    phone: "+1 555 0134 0206",
  },
];

export const testDrive = {
  title: "Book a test drive",
  intro:
    "Sixty minutes, your route, no salesperson in the passenger seat unless you want one. Drive from a studio or have the car brought to your door within 40 miles of one.",
  times: ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
  promises: [
    "A full hour — take it on the highway, a car park and your own street.",
    "We bring the car charged to at least 80%.",
    "Bring the child seat, the dog crate or the cello; try them in the back.",
    "Product specialists are paid a salary, not commission.",
  ],
};

/* ───────── Owners ───────── */

export const ownersPage = {
  intro:
    "Your Vector improves after you buy it. This is where the updates, service, warranty and other owners live.",
  updates: [
    {
      version: "2026.9",
      name: "Cold start",
      date: "September 30, 2026",
      notes: [
        "Preconditioning now plans around the forecast temperature at every charger on your route.",
        "Scheduled departure can read your calendar (opt-in) and warm the cabin before the first event.",
        "One-pedal driving now holds the car on grades up to 30%.",
      ],
    },
    {
      version: "2026.7",
      name: "Long way round",
      date: "July 14, 2026",
      notes: [
        "The route planner shows live stall availability at Vector Grid sites and reroutes if a site fills.",
        "Trip summaries export as CSV from the Vector app.",
        "Basis: sliding-door obstacle detection is more sensitive at the lower edge.",
      ],
    },
    {
      version: "2026.5",
      name: "Quiet hours",
      date: "May 6, 2026",
      notes: [
        "Parked camera mode uses 40% less energy overnight.",
        "Delta: launch mode can be limited to a valet-safe 300 hp.",
        "New chime set, recorded on an upright piano at Plant One.",
      ],
    },
  ],
  service: [
    {
      title: "Mobile service",
      text: "Tyres, brakes, 12 V batteries, glass and most software-diagnosed repairs happen in your driveway or office car park. Book from the app; a technician arrives in a Basis.",
    },
    {
      title: "Nine service centres",
      text: "For bodywork and anything that needs a lift. Free loaner Norm for repairs longer than four hours.",
    },
    {
      title: "Roadside, around the clock",
      text: `Eight years of roadside assistance, including a tow to the nearest charger if you misjudge it. Call ${brand.roadside}.`,
    },
  ],
  warranty: [
    {
      item: "Battery & drive units",
      term: "8 years or 120,000 mi, 70% capacity guaranteed",
    },
    { item: "Basic vehicle", term: "4 years or 50,000 mi" },
    { item: "Corrosion (perforation)", term: "12 years, unlimited miles" },
    { item: "Roadside assistance", term: "8 years, unlimited miles" },
    { item: "Software updates", term: "For the life of the car, free" },
  ],
  faq: [
    {
      q: "How do software updates install?",
      a: "Over Wi-Fi or cellular, while the car is parked. You choose a time; installs take 20–35 minutes and the car is usable until it starts.",
    },
    {
      q: "Is the battery warranty transferable?",
      a: "Yes. Every warranty stays with the car, not the owner, and transfers at no cost when you sell.",
    },
    {
      q: "How do I sell or transfer my Vector?",
      a: "Start the transfer in the app. The new owner accepts it in theirs, and keys, warranty and service history move across in one step.",
    },
    {
      q: "What does annual maintenance cost?",
      a: "There is no fixed service schedule. Rotate tyres every 7,500 miles, replace the cabin filter every two years, the brake fluid every four. Most owners spend under $200 a year.",
    },
    {
      q: "Can I order parts or accessories?",
      a: `Owners can order genuine parts, floor mats, roof bars and charging cables by writing to ${brand.ownersEmail}.`,
    },
  ],
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  owner: string;
  place: string;
  model: string;
  miles: string;
  photo: Photo;
  body: string[];
  quote: string;
};

export const stories: Story[] = [
  {
    slug: "coast-to-coast",
    title: "Brooklyn to Santa Monica in a Span, nineteen stops",
    dek: "2,894 miles, six days, and the honest arithmetic of charging on the interstate.",
    owner: "Priya Natarajan",
    place: "Brooklyn, NY",
    model: "span",
    miles: "2,894 miles",
    photo: photos.desert,
    body: [
      "I had driven across the country twice before, both times in a gas car and both times too fast. This time I set the rule that the car would decide where we stopped, and I would decide how long.",
      "The planner chose nineteen Vector Grid stops. The median stop was 21 minutes, which turned out to be exactly the right length for a sandwich, a walk around the lot and an email I had been avoiding. The longest was 38 minutes in Amarillo, at 31 °F, where I had skipped preconditioning to see what happened. Now I know.",
      "Across the whole trip the car averaged 3.6 miles per kWh, including the climb out of Flagstaff into a headwind that made the range estimate wince. Total charging cost was $281.",
      "The thing nobody tells you is how quiet six days are. No engine note, very little wind noise. I listened to two entire audiobooks and one very long phone call with my sister. I arrived less tired than I have arrived anywhere.",
    ],
    quote:
      "The median stop was 21 minutes — exactly a sandwich, a walk and one avoided email.",
  },
  {
    slug: "duluth-winter",
    title: "What −20 °F does to an Axis in Duluth",
    dek: "One winter on Lake Superior, and why our published winter range matters more than the sticker.",
    owner: "Mara Lindqvist",
    place: "Duluth, MN",
    model: "axis",
    miles: "9,120 miles",
    photo: photos.snowRoad,
    body: [
      "I bought the Axis because it was the only car whose website told me what range I would get in January. It said 216 miles at 20 °F and 70 mph. My commute is 31 miles each way, with a hill at either end.",
      "On the coldest week of the year it hit −20 °F at the house. With the car plugged in and departure time set, it left with a warm cabin and a warm pack, and used 38% of its battery on the round trip. Unplugged, after a night outside at a friend's, it used 47%.",
      "The heat pump is the hero. It is louder than I expected when it is working hard — a soft whoosh under the bonnet — but it means the heat is on in three minutes instead of fifteen.",
      "My advice to anyone north of the 45th parallel: plug in every night, even if you don't need the charge. The car spends the grid's energy keeping itself warm, not yours.",
    ],
    quote:
      "It was the only car whose website told me what range I'd get in January.",
  },
  {
    slug: "workshop-on-wheels",
    title: "A carpenter's Basis, with the shop in the back",
    dek: "A mitre saw, a dust extractor and a coffee machine, all running off the traction battery.",
    owner: "Tomás Oyelaran",
    place: "Austin, TX",
    model: "basis",
    miles: "14,600 miles",
    photo: photos.nightRoad,
    body: [
      "I build kitchens. For eleven years that meant a diesel van, a generator in the back and a neighbour who hated me by 8 a.m. Now the saw runs off the van and the neighbour brings me tacos.",
      "I took the third row out on day one and put down a plywood floor with tie-down tracks. The two 120 V outlets run the mitre saw and the dust extractor at the same time. A full day of cutting uses about 9% of the battery.",
      "I set the vehicle-to-load floor at 120 miles, because my furthest job is 45 miles from home. The van simply stops supplying power when it gets there, so I can never strand myself.",
      "Running costs are the part I didn't believe. Fourteen thousand miles in, I have spent $612 on electricity and nothing on maintenance except wipers.",
    ],
    quote: "The saw runs off the van now, and the neighbour brings me tacos.",
  },
  {
    slug: "seven-seats",
    title: "Eleven thousand miles with a Field and three kids",
    dek: "Car seats, camping trips and the third row as a negotiation tool.",
    owner: "Dana & Ike Ruiz",
    place: "Denver, CO",
    model: "field",
    miles: "11,300 miles",
    photo: photos.lindis,
    body: [
      "We have a newborn, a six-year-old and a thirteen-year-old who would rather not be seen with us. The Field's third row is the thirteen-year-old's apartment. She has her own vents and her own charging port, and we have peace.",
      "The second row slides forward with the baby seat still in it, which sounds like a small thing until you have done the alternative in a snowy car park.",
      "Our longest trip was to Moab and back: 710 miles with a roof box, at altitude, in July. We stopped four times on the way there. The kids timed every stop against the gas-station stops they remembered. We won two, lost two.",
      "It is a big car. It does not feel like one in the city, thanks to the 360-degree cameras, but it does in our 1920s garage, which we have measured and remeasured.",
    ],
    quote:
      "The third row is our thirteen-year-old's apartment. She has her own vents, and we have peace.",
  },
];

/* ───────── Company ───────── */

export const aboutPage = {
  title: "We build electric cars in Kalamazoo, and tell you how far they go.",
  intro:
    "Vector Motor Company was founded in 2019 by three engineers who had spent a decade building other people's batteries. We now employ 3,400 people and deliver around 60,000 cars a year from one plant in Michigan.",
  story: [
    "Our founders' first argument was about range. Every brochure they had ever written quoted a number achieved at 55 mph on a mild day. The one thing customers asked, again and again, was what the car would do on a highway in February.",
    "So we publish two figures for every Vector: the standard combined range, and the range at 20 °F and a steady 70 mph, measured on a public road loop outside Marquette, Michigan, every winter. If a software update changes it, we retest.",
    "The rest of the company follows from that habit. Physical switches for the things you need without looking. A warranty that follows the car. Prices published on the website and paid at the studio with no negotiation.",
  ],
  plant: {
    title: "Plant One",
    text: "A former paper mill on the Kalamazoo River, rebuilt as a 2.1-million-square-foot vehicle plant. Batteries are assembled on site from cells made 40 miles away; every car rolls off the line under its own power and drives the 3.2-mile test track before it is loaded.",
    facts: [
      { label: "Opened", value: "2023" },
      { label: "Employees", value: "3,400" },
      { label: "Annual capacity", value: "90,000 cars" },
      { label: "Electricity from wind & solar", value: "100%" },
    ],
  },
  principles: [
    {
      title: "Two ranges, always",
      text: "The sticker number and the January number, side by side, on every page that mentions either.",
    },
    {
      title: "No hidden menus",
      text: "Hazards, defrost, volume and temperature are physical. We count the taps for everything else.",
    },
    {
      title: "One price",
      text: "What the configurator shows is what you pay. Studios do not negotiate, and salespeople are not on commission.",
    },
    {
      title: "Fix it at home",
      text: "Most service is mobile. A car should not need a day off work to have its tyres rotated.",
    },
  ],
  timeline: [
    {
      year: "2019",
      text: "Founded in a rented unit in Ann Arbor with a $4 million seed round and one borrowed dynamometer.",
    },
    {
      year: "2021",
      text: "First Norm prototype runs the winter loop in Marquette. Range at 20 °F: 61% of the summer figure.",
    },
    {
      year: "2023",
      text: "Plant One opens in Kalamazoo. First customer Norm delivered on October 2.",
    },
    {
      year: "2024",
      text: "Span and Axis launch. Vector Grid opens its first 40 sites along I-94 and I-80.",
    },
    {
      year: "2025",
      text: "Basis van and Delta fastback join the line-up. 100,000th Vector built.",
    },
    {
      year: "2026",
      text: "Field three-row SUV revealed. Vector Grid reaches 310 sites.",
    },
  ],
  team: [
    {
      name: "Ruth Okafor",
      role: "Chief executive, co-founder",
      bio: "Led cell engineering at a battery supplier for nine years. Still drives the winter loop every February.",
    },
    {
      name: "Anders Vik",
      role: "Chief engineer, co-founder",
      bio: "Designed drive units for commercial trucks. Responsible for the disconnecting front motor and the three-lap cooling circuit.",
    },
    {
      name: "Lena Marsh",
      role: "Head of design",
      bio: "Came from aircraft interiors. Insisted on physical switches and won.",
    },
    {
      name: "Daniel Cho",
      role: "Head of charging",
      bio: "Built Vector Grid from 40 sites to 310. Personally photographs every new site's restroom.",
    },
  ],
  sustainability: {
    title: "Made with wind, sold with the receipt",
    text: "Plant One runs on a power purchase agreement with two wind farms in Michigan's Thumb and 38 acres of rooftop solar. Each car ships with its build-carbon receipt: Norm Standard, 7.1 tonnes CO₂e; Field Max Range, 13.4 tonnes. Packs that leave a car come back to Kalamazoo for second-life storage or recycling.",
  },
};

/* ───────── Home ───────── */

export const home = {
  title: "Six electric cars, with the range you get in January.",
  intro:
    "Vector builds hatchbacks, sedans, SUVs and a van in Kalamazoo, Michigan. Every model is published with two ranges: the sticker figure, and what it does at 20 °F and 70 mph.",
  band: "We publish the winter number because it is the one you will remember.",
  lineup: {
    title: "The line-up, drawn to the same scale",
    text: "From the 163-inch Norm to the 202-inch Basis. Hover or focus a name to lift it out of the stack.",
  },
  build: {
    title: "Build it, price it, keep it",
    text: "Choose a model, trim, paint, wheels and interior. The price, the range and the drawing update together, and the build waits in this browser until you come back.",
  },
  winter: {
    title: "Two ranges, side by side",
    text: "Every January we drive every Vector around a 62-mile loop outside Marquette, Michigan, at a steady 70 mph and 20 °F or colder. The result goes next to the sticker figure on every page, including this one.",
  },
  charging: {
    title: "Charging is a lunch break",
    text: "310 Vector Grid sites along the interstates, up to 250 kW at every stall, and no app to open. At home, an 11 kW Wallbox fills any Vector overnight.",
  },
  close: {
    title: "Drive one this week.",
    text: "Sixty minutes, your route, from any of six studios or from your own driveway.",
  },
};

export const footer = {
  newsletter: {
    title: "Product notes, four times a year",
    text: "New models, winter-range results and software release notes. No discount codes, because we do not do discounts.",
  },
};
