import hero from "./assets/hero.jpg";
import dolomitesRidge from "./assets/dolomites-ridge.jpg";
import dolomitesHut from "./assets/dolomites-hut.jpg";
import blackforestPath from "./assets/blackforest-path.jpg";
import blackforestBoardwalk from "./assets/blackforest-boardwalk.jpg";
import icelandRhyolite from "./assets/iceland-rhyolite.jpg";
import icelandDesert from "./assets/iceland-desert.jpg";
import patagoniaTrail from "./assets/patagonia-trail.jpg";
import patagoniaLake from "./assets/patagonia-lake.jpg";
import patagoniaGlacier from "./assets/patagonia-glacier.jpg";
import julianLarches from "./assets/julian-larches.jpg";
import julianRidge from "./assets/julian-ridge.jpg";
import lofotenValley from "./assets/lofoten-valley.jpg";
import lofotenReine from "./assets/lofoten-reine.jpg";
import atlasValley from "./assets/atlas-valley.jpg";
import atlasSummit from "./assets/atlas-summit.jpg";
import skyeGlen from "./assets/skye-glen.jpg";
import skyeLoch from "./assets/skye-loch.jpg";
import skyeFalls from "./assets/skye-falls.jpg";
import group from "./assets/group.jpg";
import gearPhoto from "./assets/gear.jpg";
import hut from "./assets/hut.jpg";
import camp from "./assets/camp.jpg";
import rest from "./assets/rest.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Terrain",
  sector: "Guided adventure travel",
  tagline: "Small-group treks, led by people who live where they walk.",
  email: "hello@terrain.example",
  phone: "+1 555 0142 880",
  phoneHref: "tel:+15550142880",
  address: [
    "Terrain Trekking GmbH",
    "Kaiserjägerstraße 4",
    "6020 Innsbruck, Austria",
  ],
  hours: "Planning desk: Mon–Fri 09:00–17:30 CET",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Strava", href: "https://www.strava.com/" },
  ],
};

export const nav = [
  { to: "/trips", label: "Trips" },
  { to: "/route-finder", label: "Route finder" },
  { to: "/guides", label: "Guides" },
  { to: "/gear", label: "Gear list" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export const images = { hero, group, gear: gearPhoto, hut, camp, rest };

/* ───────────────────────── Grades ───────────────────────── */

export type Grade = 1 | 2 | 3;

/** Waymark colours borrowed from Alpine trail signs: blue easy, red mountain path, black difficult. */
export const grades: Record<
  Grade,
  { name: string; blaze: string; hours: string; ascent: string; text: string }
> = {
  1: {
    name: "Easy going",
    blaze: "Blue",
    hours: "4–6 hours a day",
    ascent: "up to 650 m climb",
    text: "Good paths and forest tracks, nothing exposed. If you walk for a whole Sunday and still want dinner out, you are ready.",
  },
  2: {
    name: "Steady",
    blaze: "Red",
    hours: "5–7 hours a day",
    ascent: "up to 1,150 m climb",
    text: "Proper mountain paths with rocky steps, the odd cable and short airy sections. You should be comfortable with back-to-back long days.",
  },
  3: {
    name: "Demanding",
    blaze: "Black",
    hours: "6–9 hours a day",
    ascent: "up to 1,400 m climb",
    text: "Long days on rough, remote ground, river fords, scree or real altitude. Come with recent multi-day experience and a sound pair of knees.",
  },
};

/* ───────────────────────── Trips ───────────────────────── */

export type Area = "Europe" | "North Atlantic" | "Africa" | "South America";
export const areas: Area[] = [
  "Europe",
  "North Atlantic",
  "Africa",
  "South America",
];

export type Landscape =
  | "High peaks"
  | "Forest"
  | "Coast & fjords"
  | "Volcanic"
  | "Glaciers"
  | "Villages";
export const landscapes: Landscape[] = [
  "High peaks",
  "Forest",
  "Coast & fjords",
  "Volcanic",
  "Glaciers",
  "Villages",
];

export type KitId = "daypack" | "hut" | "storm";
export type Sleep = "comfort" | "hut";

export type Day = {
  title: string;
  km: number;
  up: number;
  down: number;
  hours: string;
  sleep: string;
  text: string;
  /** Altitude in metres, sampled evenly along the day's walk. */
  profile: number[];
};

export type Departure = { id: string; start: string; spots: number };

export type Trip = {
  slug: string;
  name: string;
  region: string;
  country: string;
  area: Area;
  grade: Grade;
  group: number;
  price: number;
  /** Private room supplement; null where huts only have shared rooms. */
  single: number | null;
  months: number[];
  landscapes: Landscape[];
  sleep: Sleep;
  sleepLabel: string;
  kit: KitId;
  guide: string;
  summary: string;
  intro: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  start: string;
  finish: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  departures: Departure[];
  days: Day[];
  /** Map on a 100 × 64 sheet: one polyline per day (gaps between legs are drawn as transfers), plus summits [x, y, size] for the contours. */
  map: { legs: [number, number][][]; peaks: [number, number, number][] };
};

export const trips: Trip[] = [
  {
    slug: "alta-via-huts",
    name: "Alta Via Huts",
    region: "Dolomites",
    country: "Italy",
    area: "Europe",
    grade: 2,
    group: 10,
    price: 1690,
    single: 280,
    months: [7, 8, 9],
    landscapes: ["High peaks"],
    sleep: "hut",
    sleepLabel: "Mountain huts (rifugi)",
    kit: "hut",
    guide: "marta-dellantonio",
    summary:
      "Six days hut to hut along the first Alta Via, from the green water of Lago di Braies to the walls of the Civetta.",
    intro: [
      "The Alta Via 1 is the classic north–south line through the Dolomites, and its huts are half the reason to walk it: strudel at noon, polenta at seven, a dormitory window full of pink limestone at dawn.",
      "We walk the northern half, the stretch with the widest views and the best rifugi, carrying only what fits in a 35-litre pack. Marta grew up in Val di Fassa and knows every hut keeper by name, which matters when the weather turns and plans need to bend.",
    ],
    highlights: [
      "Sunrise from the terrace of Rifugio Lagazuoi at 2,752 m",
      "First World War tunnels inside Lagazuoi, with head torches",
      "Lunch at Rifugio Averau, under the Cinque Torri",
      "Five nights in family-run huts with dinner and breakfast",
    ],
    included: [
      "Mountain leader for the whole trek, maximum group of 10",
      "Five nights in rifugi, half board",
      "Cable car up Lagazuoi and the transfer back from Passo Staulanza",
      "Luggage storage in Cortina while you walk",
      "Group first-aid kit and satellite messenger",
    ],
    excluded: [
      "Travel to Dobbiaco and from Cortina",
      "Lunches and drinks at huts (budget €25 a day)",
      "Travel insurance with mountain rescue",
    ],
    start: "Dobbiaco station, 09:30 on day 1",
    finish: "Cortina d'Ampezzo, around 16:00 on day 6",
    image: hero,
    imageAlt:
      "A walker in a blue shirt looks across the green Seceda ridge towards jagged Dolomite peaks",
    gallery: [
      {
        src: dolomitesRidge,
        alt: "Pale limestone towers of the Dolomites under heavy grey cloud",
      },
      {
        src: dolomitesHut,
        alt: "Wooden dining room of a mountain hut with a tiled stove and shelves of glasses",
      },
    ],
    departures: [
      { id: "av-0710", start: "2027-07-10", spots: 3 },
      { id: "av-0724", start: "2027-07-24", spots: 6 },
      { id: "av-0807", start: "2027-08-07", spots: 0 },
      { id: "av-0828", start: "2027-08-28", spots: 8 },
      { id: "av-0911", start: "2027-09-11", spots: 10 },
    ],
    days: [
      {
        title: "Lago di Braies to Rifugio Biella",
        km: 7.5,
        up: 900,
        down: 80,
        hours: "4 h",
        sleep: "Rifugio Biella, 2,327 m",
        text: "We meet at Dobbiaco station, share a coffee, check packs and take the short bus to the lake. The first climb is steady through larch and dwarf pine to the Croda del Becco saddle, then a short traverse to our first hut.",
        profile: [1496, 1560, 1700, 1850, 2010, 2180, 2300, 2327],
      },
      {
        title: "Across the Fanes plateau",
        km: 13,
        up: 450,
        down: 735,
        hours: "5½ h",
        sleep: "Rifugio Lavarella, 2,042 m",
        text: "A gentle morning across the Sennes high pasture, cows and marmots for company, then down into Fanes, one of the quietest corners of the range. Rifugio Lavarella brews its own beer, which we consider part of the route.",
        profile: [2327, 2290, 2160, 2050, 1990, 2120, 2090, 2042],
      },
      {
        title: "Up to Lagazuoi",
        km: 14,
        up: 1150,
        down: 440,
        hours: "6½ h",
        sleep: "Rifugio Lagazuoi, 2,752 m",
        text: "The big day. Over the Forcella del Lago, down a scree slope, then the long climb to the Lagazuoi plateau. Sunset from the terrace is the moment most people remember from the whole trip.",
        profile: [2042, 2150, 2486, 2250, 2100, 2300, 2520, 2752],
      },
      {
        title: "Tunnels and the Cinque Torri",
        km: 11,
        up: 600,
        down: 940,
        hours: "5 h",
        sleep: "Rifugio Averau, 2,413 m",
        text: "We descend through the restored wartime tunnels inside the mountain, then cross Passo Falzarego and climb beneath the five rock towers. Averau's kitchen is famous; book the venison.",
        profile: [2752, 2600, 2380, 2117, 2200, 2300, 2413],
      },
      {
        title: "Nuvolau and the long descent",
        km: 13,
        up: 520,
        down: 1015,
        hours: "5½ h",
        sleep: "Rifugio Città di Fiume, 1,917 m",
        text: "An early pull to the Nuvolau hut for the widest panorama of the trek, then a long descent past Passo Giau to the meadows below the Pelmo, where chamois are common at dusk.",
        profile: [2413, 2575, 2400, 2236, 2050, 1950, 1900, 1917],
      },
      {
        title: "Under the Pelmo to Staulanza",
        km: 9,
        up: 420,
        down: 570,
        hours: "4 h",
        sleep: "Not included: transfer to Cortina",
        text: "A last balcony path around the Pelmo, the throne of the gods, to Passo Staulanza. Our minibus takes us to Cortina for a late lunch and the trains home.",
        profile: [1917, 2050, 2180, 2100, 1950, 1820, 1766],
      },
    ],
    map: {
      legs: [
        [
          [8, 8],
          [14, 10],
          [20, 16],
        ],
        [
          [20, 16],
          [28, 20],
          [34, 26],
        ],
        [
          [34, 26],
          [40, 22],
          [46, 20],
        ],
        [
          [46, 20],
          [52, 28],
          [58, 34],
        ],
        [
          [58, 34],
          [66, 38],
          [74, 44],
        ],
        [
          [74, 44],
          [82, 48],
          [90, 56],
        ],
      ],
      peaks: [
        [28, 12, 14],
        [52, 12, 16],
        [82, 36, 14],
      ],
    },
  },
  {
    slug: "westweg-quiet-way",
    name: "Westweg Quiet Way",
    region: "Black Forest",
    country: "Germany",
    area: "Europe",
    grade: 1,
    group: 12,
    price: 740,
    single: 190,
    months: [5, 6, 7, 8, 9, 10],
    landscapes: ["Forest", "Villages"],
    sleep: "comfort",
    sleepLabel: "Family-run guesthouses",
    kit: "daypack",
    guide: "jonas-brenner",
    summary:
      "Five unhurried days on the southern Westweg: spruce, moss, farmhouse lunches and the Feldberg, with your bag carried ahead.",
    intro: [
      "The quiet way is exactly that. Mossy valleys, wide forest roads, villages where the bakery still closes at noon on Saturday, and the high, bare dome of the Feldberg with the Alps lined up on the horizon on a clear day.",
      "Jonas spent fifteen years as a forester here before he started guiding, so expect to learn which trees are fighting bark beetle, where the capercaillie still display and why the farmhouse roofs come down so low.",
    ],
    highlights: [
      "The Feldberg, at 1,493 m the highest point in the Black Forest",
      "A lake swim at Titisee on the first evening",
      "Belchen summit, with Mont Blanc visible on clear autumn days",
      "Luggage moved between guesthouses every day",
    ],
    included: [
      "Local guide throughout, maximum group of 12",
      "Four nights in guesthouses, en-suite rooms, half board",
      "Daily luggage transfer",
      "KONUS guest card: free local buses and trains",
    ],
    excluded: [
      "Travel to Hinterzarten and from Staufen",
      "Lunches (farm cafés on route, about €15)",
      "Travel insurance",
    ],
    start: "Hinterzarten station, 10:00 on day 1",
    finish: "Staufen im Breisgau, mid-afternoon on day 5",
    image: blackforestPath,
    imageAlt:
      "Two walkers on a grassy forest track between tall dark spruce trees",
    gallery: [
      {
        src: blackforestBoardwalk,
        alt: "A leaf-strewn path with a wooden rail running through a sunlit beech wood",
      },
    ],
    departures: [
      { id: "ww-0515", start: "2027-05-15", spots: 7 },
      { id: "ww-0612", start: "2027-06-12", spots: 2 },
      { id: "ww-0904", start: "2027-09-04", spots: 9 },
      { id: "ww-1002", start: "2027-10-02", spots: 12 },
    ],
    days: [
      {
        title: "Hinterzarten to Titisee",
        km: 12,
        up: 280,
        down: 310,
        hours: "4 h",
        sleep: "Gasthaus Seehalde, Titisee",
        text: "A soft start along the Ravenna gorge and its waterfalls, then through meadows to the lake. Time for a swim before dinner.",
        profile: [885, 920, 980, 1010, 960, 900, 850],
      },
      {
        title: "Up into the high forest",
        km: 16,
        up: 620,
        down: 240,
        hours: "5½ h",
        sleep: "Hebelhof, Feldberg",
        text: "Long, gentle climbing through spruce and fir with lunch at a farm café that has served walkers since 1890. We sleep high, right below the summit.",
        profile: [850, 880, 960, 1050, 1120, 1180, 1234],
      },
      {
        title: "Over the Feldberg",
        km: 15,
        up: 450,
        down: 560,
        hours: "5 h",
        sleep: "Hotel Notschrei",
        text: "Sunrise from the summit tower for anyone keen, then the open ridge with its wind-bent beeches, and a long forest descent to the Notschrei pass.",
        profile: [1234, 1380, 1493, 1420, 1300, 1200, 1121],
      },
      {
        title: "Belchen",
        km: 14,
        up: 520,
        down: 460,
        hours: "5 h",
        sleep: "Berghaus Multen",
        text: "The most beautiful summit in the Black Forest, many locals will tell you. Open grass, a view across the Rhine plain to the Vosges and, on the right day, the Alps.",
        profile: [1121, 1240, 1180, 1300, 1414, 1300, 1180],
      },
      {
        title: "Down to the vineyards",
        km: 16,
        up: 200,
        down: 850,
        hours: "5 h",
        sleep: "Not included: trains from Staufen",
        text: "A long descent from forest to orchards to vines, finishing in the old town of Staufen with a glass of Markgräfler and the train to Freiburg.",
        profile: [1180, 1060, 900, 720, 560, 450, 420],
      },
    ],
    map: {
      legs: [
        [
          [8, 44],
          [16, 38],
          [24, 36],
        ],
        [
          [24, 36],
          [32, 30],
          [40, 24],
        ],
        [
          [40, 24],
          [48, 20],
          [56, 28],
        ],
        [
          [56, 28],
          [62, 36],
          [70, 38],
        ],
        [
          [70, 38],
          [80, 46],
          [92, 54],
        ],
      ],
      peaks: [
        [48, 16, 16],
        [70, 30, 12],
      ],
    },
  },
  {
    slug: "laugavegur-crossing",
    name: "Laugavegur Crossing",
    region: "Icelandic Highlands",
    country: "Iceland",
    area: "North Atlantic",
    grade: 3,
    group: 10,
    price: 2180,
    single: null,
    months: [7, 8],
    landscapes: ["Volcanic", "Glaciers"],
    sleep: "hut",
    sleepLabel: "Mountain huts",
    kit: "storm",
    guide: "sigrun-haraldsdottir",
    summary:
      "Rhyolite mountains, black-sand desert and the pass between two glaciers: Iceland's great trail, finishing over Fimmvörðuháls.",
    intro: [
      "Nothing prepares you for Landmannalaugar: hills streaked orange, green and violet, steam rising from the ground, a hot river to sit in after the bus ride. From there the Laugavegur runs south through obsidian fields, ash desert and birch woods to Þórsmörk.",
      "We add the Fimmvörðuháls pass as a last, long day, climbing between the Eyjafjallajökull and Mýrdalsjökull ice caps past craters that were still glowing in 2010, down a staircase of waterfalls to the sea.",
    ],
    highlights: [
      "The hot spring at Landmannalaugar, before and after the first walk",
      "Obsidian ridges and steam vents at Hrafntinnusker",
      "Fording glacial rivers with Sigrún's careful technique",
      "Twenty-six waterfalls on the descent to Skógafoss",
    ],
    included: [
      "Guide and assistant guide, maximum group of 10",
      "Five nights in highland huts and one in a Skógar guesthouse",
      "All meals on the trail, cooked by the team",
      "Highland bus from Reykjavík and return from Skógar",
      "Luggage forwarded to Skógar",
    ],
    excluded: [
      "Flights to Iceland",
      "First and last night in Reykjavík",
      "Travel insurance",
    ],
    start: "BSÍ bus terminal, Reykjavík, 07:30 on day 1",
    finish: "Reykjavík, around 19:00 on day 6",
    image: icelandRhyolite,
    imageAlt:
      "Two hikers walk a dark gravel ridge through striped orange and green rhyolite hills",
    gallery: [
      {
        src: icelandDesert,
        alt: "A flat black-sand desert under a low sky, mountains on the far horizon",
      },
    ],
    departures: [
      { id: "lg-0703", start: "2027-07-03", spots: 4 },
      { id: "lg-0717", start: "2027-07-17", spots: 1 },
      { id: "lg-0807", start: "2027-08-07", spots: 7 },
      { id: "lg-0821", start: "2027-08-21", spots: 10 },
    ],
    days: [
      {
        title: "Landmannalaugar and Brennisteinsalda",
        km: 7,
        up: 450,
        down: 450,
        hours: "3 h",
        sleep: "Landmannalaugar hut",
        text: "Four hours by highland bus, then a loop up the sulphur-yellow Brennisteinsalda to see the whole route laid out to the south. Hot spring, dinner, early night.",
        profile: [600, 680, 760, 855, 780, 680, 600],
      },
      {
        title: "To the obsidian fields",
        km: 12,
        up: 620,
        down: 170,
        hours: "5 h",
        sleep: "Hrafntinnusker hut, 1,050 m",
        text: "Climbing through lava and steaming ground into snowfields that last all summer. The hut sits among black glass boulders; on a clear night the view reaches Hekla.",
        profile: [600, 720, 850, 960, 1020, 1100, 1050],
      },
      {
        title: "Down to Álftavatn",
        km: 12,
        up: 100,
        down: 610,
        hours: "5 h",
        sleep: "Álftavatn hut",
        text: "The landscape changes colour as we drop: rust, then moss green, then the lake. A short, steep descent off Jökultungur is the only tricky part.",
        profile: [1050, 1080, 960, 820, 680, 560, 540],
      },
      {
        title: "Across the black desert",
        km: 16,
        up: 300,
        down: 320,
        hours: "6½ h",
        sleep: "Emstrur hut",
        text: "Two river fords in the morning, then the open ash plain of Mælifellssandur with the glacier on your left. It feels like walking on another planet, and the wind agrees.",
        profile: [540, 560, 500, 520, 620, 560, 480, 520],
      },
      {
        title: "Into Þórsmörk",
        km: 15,
        up: 250,
        down: 540,
        hours: "6 h",
        sleep: "Langidalur hut, Þórsmörk",
        text: "Past the Markarfljót canyon into birch woods and flowers. Þórsmörk is a green valley trapped between glaciers, and the camp has the trek's only shower.",
        profile: [520, 470, 480, 410, 350, 300, 230],
      },
      {
        title: "Fimmvörðuháls to Skógar",
        km: 25,
        up: 1050,
        down: 1250,
        hours: "9 h",
        sleep: "Guesthouse, then the bus to Reykjavík",
        text: "The longest day, and the best. Up the Kattahryggir ridge to the 2010 eruption craters, across the pass between ice caps and down beside the Skógá past waterfall after waterfall.",
        profile: [230, 450, 700, 920, 1100, 1000, 700, 400, 150, 30],
      },
    ],
    map: {
      legs: [
        [
          [12, 10],
          [18, 5],
          [22, 12],
          [12, 10],
        ],
        [
          [12, 10],
          [20, 16],
          [28, 20],
        ],
        [
          [28, 20],
          [34, 26],
          [40, 30],
        ],
        [
          [40, 30],
          [48, 34],
          [56, 40],
        ],
        [
          [56, 40],
          [62, 44],
          [68, 46],
        ],
        [
          [68, 46],
          [74, 52],
          [78, 58],
          [86, 60],
        ],
      ],
      peaks: [
        [28, 12, 12],
        [62, 56, 16],
        [86, 46, 14],
      ],
    },
  },
  {
    slug: "paine-w-trek",
    name: "Paine W & Glacier Grey",
    region: "Torres del Paine",
    country: "Chile",
    area: "South America",
    grade: 3,
    group: 10,
    price: 2890,
    single: 420,
    months: [11, 12, 1, 2, 3],
    landscapes: ["High peaks", "Glaciers"],
    sleep: "hut",
    sleepLabel: "Refugios and domes",
    kit: "storm",
    guide: "tomas-ibarra",
    summary:
      "The full W, from the granite towers to the blue ice of Glacier Grey, at a pace that leaves time to watch condors.",
    intro: [
      "Torres del Paine is a short range with an outsized presence: three granite towers, the horned Cuernos, turquoise lakes and an ice field that spills glaciers into them. The W trek takes in all of it in one long zigzag.",
      "Tomás was born in Puerto Natales and has guided the park for eighteen seasons. He plans every day around the Patagonian wind, which can mean a 05:00 start to beat it to the towers, and a long lunch while it blows itself out.",
    ],
    highlights: [
      "Dawn at the base of the Torres, if the wind allows",
      "The hanging glaciers of the Valle del Francés",
      "Suspension bridges over the gorge beside Glacier Grey",
      "A boat across Lago Pehoé on the final morning",
    ],
    included: [
      "Bilingual guide, maximum group of 10",
      "Six nights in refugios and furnished domes, full board",
      "All park transfers, catamaran and entry fees",
      "Airport pickup and drop-off in Puerto Natales",
    ],
    excluded: [
      "Flights to Puerto Natales",
      "Drinks and tips",
      "Travel insurance",
    ],
    start: "Puerto Natales airport or bus terminal, by 11:00 on day 1",
    finish: "Puerto Natales, late afternoon on day 7",
    image: patagoniaTrail,
    imageAlt:
      "A narrow trail winds across golden grassland towards sharp grey peaks in Torres del Paine",
    gallery: [
      {
        src: patagoniaLake,
        alt: "A turquoise lake with a footbridge and island lodge below snow-capped Paine peaks",
      },
      {
        src: patagoniaGlacier,
        alt: "A grey glacial lake under a glacier tongue spilling between dark mountains",
      },
    ],
    departures: [
      { id: "pw-1114", start: "2026-11-14", spots: 2 },
      { id: "pw-1205", start: "2026-12-05", spots: 0 },
      { id: "pw-0109", start: "2027-01-09", spots: 5 },
      { id: "pw-0213", start: "2027-02-13", spots: 8 },
      { id: "pw-0306", start: "2027-03-06", spots: 10 },
    ],
    days: [
      {
        title: "Into the park",
        km: 5,
        up: 100,
        down: 40,
        hours: "2 h",
        sleep: "Refugio Central",
        text: "Pickup in Natales, two hours across the steppe with guanacos at the roadside, and a short warm-up walk to our first refugio below the Torres valley.",
        profile: [100, 120, 140, 170, 150, 135],
      },
      {
        title: "Base of the Torres",
        km: 19,
        up: 950,
        down: 950,
        hours: "8 h",
        sleep: "Refugio Central",
        text: "Up the Ascencio valley, through lenga forest, and a final boulder moraine to the lake beneath the three towers. We leave early to beat the wind and the crowds.",
        profile: [135, 300, 480, 600, 560, 700, 870, 600, 300, 135],
      },
      {
        title: "Along Lago Nordenskjöld",
        km: 12,
        up: 350,
        down: 400,
        hours: "5 h",
        sleep: "Refugio Los Cuernos",
        text: "A rolling lakeside path under the Cuernos, with icebergs of wind-whipped spray on blowy days and calm reflections on lucky ones.",
        profile: [135, 220, 260, 180, 220, 140, 85],
      },
      {
        title: "Valle del Francés",
        km: 22,
        up: 900,
        down: 945,
        hours: "9 h",
        sleep: "Refugio Paine Grande",
        text: "Into the amphitheatre of the French Valley, where the glacier on Paine Grande cracks and rumbles all day. Then the long walk out to Lago Pehoé.",
        profile: [85, 200, 330, 520, 700, 500, 300, 150, 40],
      },
      {
        title: "To Glacier Grey",
        km: 11,
        up: 450,
        down: 400,
        hours: "4½ h",
        sleep: "Refugio Grey",
        text: "Up a windy pass to the first view of the ice field, then along Lago Grey with its floating blue icebergs to a refugio right at the glacier's edge.",
        profile: [40, 180, 270, 300, 220, 150, 90],
      },
      {
        title: "Hanging bridges and back",
        km: 12,
        up: 420,
        down: 470,
        hours: "5 h",
        sleep: "Refugio Paine Grande",
        text: "The suspension bridges beyond Grey give the closest view of the glacier wall. Back to Paine Grande for a final dinner with the Cuernos glowing outside.",
        profile: [90, 210, 300, 240, 300, 180, 40],
      },
      {
        title: "Lago Pehoé and home",
        km: 6,
        up: 120,
        down: 120,
        hours: "2 h",
        sleep: "Not included: Puerto Natales",
        text: "Catamaran across the lake, a last walk to the Mirador Cuernos and the Salto Grande waterfall, then the drive back to Natales.",
        profile: [40, 70, 110, 90, 40],
      },
    ],
    map: {
      legs: [
        [
          [94, 48],
          [88, 42],
          [82, 36],
        ],
        [
          [82, 36],
          [80, 24],
          [76, 12],
          [80, 24],
          [82, 36],
        ],
        [
          [82, 36],
          [72, 40],
          [62, 40],
        ],
        [
          [62, 40],
          [54, 30],
          [50, 18],
          [52, 32],
          [40, 42],
        ],
        [
          [40, 42],
          [32, 32],
          [24, 22],
        ],
        [
          [24, 22],
          [18, 12],
          [24, 22],
          [32, 32],
          [40, 42],
        ],
        [
          [40, 42],
          [48, 50],
          [54, 56],
        ],
      ],
      peaks: [
        [66, 22, 16],
        [44, 12, 12],
        [12, 6, 10],
      ],
    },
  },
  {
    slug: "seven-lakes-traverse",
    name: "Seven Lakes Traverse",
    region: "Julian Alps",
    country: "Slovenia",
    area: "Europe",
    grade: 2,
    group: 10,
    price: 1240,
    single: 220,
    months: [6, 7, 8, 9],
    landscapes: ["High peaks", "Forest"],
    sleep: "hut",
    sleepLabel: "Mountain huts (koče)",
    kit: "hut",
    guide: "nina-kos",
    summary:
      "Up from Lake Bohinj through the Triglav Lakes Valley to the foot of Slovenia's highest mountain, in five hut nights.",
    intro: [
      "The Julian Alps are the Alps at their most compact: emerald rivers, limestone that turns gold in autumn larches, and a valley of seven glacial lakes stepped one above the other below Triglav.",
      "Nina grew up in Bovec and spent her twenties running mountain huts before training as a leader. The huts here are run by local alpine clubs, so expect jota stew, homemade blueberry schnapps and very early lights-out.",
    ],
    highlights: [
      "The full staircase of the Triglav Lakes, from Črno jezero to Zeleno jezero",
      "Golden larches on the September departures",
      "A night at Dom Planika, at 2,401 m beneath the Triglav north face",
      "Optional guided ascent of Triglav itself (2,864 m), weather permitting",
    ],
    included: [
      "Mountain leader, maximum group of 10",
      "Four nights in mountain huts, half board",
      "Transfers from Ljubljana and back",
      "Helmets and via ferrata sets for the optional summit",
    ],
    excluded: [
      "Travel to Ljubljana",
      "Lunches and drinks (huts accept cash only)",
      "Travel insurance",
    ],
    start: "Ljubljana, 08:00 on day 1",
    finish: "Ljubljana, early evening on day 5",
    image: julianLarches,
    imageAlt:
      "A valley of golden autumn larches below grey limestone peaks in the Julian Alps",
    gallery: [
      {
        src: julianRidge,
        alt: "A green alpine plateau with small lakes seen from a rocky limestone summit",
      },
    ],
    departures: [
      { id: "sl-0619", start: "2027-06-19", spots: 6 },
      { id: "sl-0717", start: "2027-07-17", spots: 3 },
      { id: "sl-0821", start: "2027-08-21", spots: 9 },
      { id: "sl-0918", start: "2027-09-18", spots: 4 },
    ],
    days: [
      {
        title: "Bohinj to Planina pri Jezeru",
        km: 10,
        up: 950,
        down: 40,
        hours: "5 h",
        sleep: "Koča na planini pri Jezeru, 1,453 m",
        text: "Transfer from Ljubljana, coffee by Lake Bohinj, then a long forest climb past summer dairy farms to a hut beside a tiny lake.",
        profile: [530, 640, 780, 950, 1110, 1280, 1453],
      },
      {
        title: "Into the valley of lakes",
        km: 11,
        up: 500,
        down: 270,
        hours: "5 h",
        sleep: "Koča pri Triglavskih jezerih, 1,685 m",
        text: "Over the Ovčarija pastures and up into the Triglav Lakes Valley. Lunch on a rock by Črno jezero, then lake after lake to our hut by the Double Lake.",
        profile: [1453, 1520, 1600, 1720, 1800, 1740, 1685],
      },
      {
        title: "Up to Dom Planika",
        km: 9,
        up: 900,
        down: 185,
        hours: "5½ h",
        sleep: "Dom Planika, 2,401 m",
        text: "Past the Green Lake and up a karst plateau scattered with edelweiss to the hut under Triglav. Afternoon option: an acclimatisation walk to the Kredarica saddle.",
        profile: [1685, 1820, 1990, 2100, 2240, 2330, 2401],
      },
      {
        title: "Triglav morning, Vodnikov afternoon",
        km: 8,
        up: 250,
        down: 835,
        hours: "4½ h (7 h with summit)",
        sleep: "Vodnikov dom, 1,817 m",
        text: "Those going for the summit leave at dawn with helmets and lanyards; everyone else walks the panoramic path round to Kredarica. We regroup and descend together to Vodnikov dom.",
        profile: [2401, 2515, 2440, 2250, 2050, 1900, 1817],
      },
      {
        title: "Down the Voje valley",
        km: 15,
        up: 200,
        down: 1470,
        hours: "6 h",
        sleep: "Not included: Ljubljana",
        text: "A long descent through beech forest to the Mostnica gorge and its clear pools, ending at a farmhouse lunch in Stara Fužina before the drive back.",
        profile: [1817, 1600, 1350, 1100, 860, 650, 546],
      },
    ],
    map: {
      legs: [
        [
          [8, 56],
          [16, 50],
          [24, 44],
        ],
        [
          [24, 44],
          [32, 38],
          [38, 32],
        ],
        [
          [38, 32],
          [46, 24],
          [54, 18],
        ],
        [
          [54, 18],
          [62, 14],
          [70, 22],
        ],
        [
          [70, 22],
          [80, 34],
          [90, 48],
        ],
      ],
      peaks: [
        [60, 8, 14],
        [28, 28, 10],
        [82, 22, 12],
      ],
    },
  },
  {
    slug: "lofoten-ridges",
    name: "Lofoten Ridges",
    region: "Lofoten",
    country: "Norway",
    area: "North Atlantic",
    grade: 3,
    group: 10,
    price: 1960,
    single: 310,
    months: [6, 7, 8],
    landscapes: ["Coast & fjords", "High peaks"],
    sleep: "comfort",
    sleepLabel: "Rorbuer (fishermen's cabins)",
    kit: "storm",
    guide: "eirik-solheim",
    summary:
      "Steep summits straight out of the sea, white beaches and midnight light, from cabins on the water's edge.",
    intro: [
      "Lofoten looks impossible from the ferry: a wall of granite peaks rising from the Norwegian Sea, fishing villages tucked into every cove. In June and July the sun never sets, so a summit at 22:00 is entirely reasonable.",
      "We stay in two rorbu cabins, red wooden fishermen's huts on stilts, and walk with day packs. The hiking is short but steep: these mountains start at sea level, and the paths go straight up.",
    ],
    highlights: [
      "Hermannsdalstinden, the highest summit in western Lofoten",
      "Kvalvika, a surf beach only reachable on foot",
      "A ferry into Kjerkfjorden for the walk to Bunes beach",
      "Midnight-sun walks on the June departures",
    ],
    included: [
      "Guide throughout, maximum group of 10",
      "Five nights in rorbu cabins, breakfast and dinner",
      "Minibus between trailheads, the Kjerkfjord ferry",
      "Fresh-fish dinner in Reine on the last night",
    ],
    excluded: ["Flights to Svolvær", "Lunches", "Travel insurance"],
    start: "Svolvær airport, 14:00 on day 1",
    finish: "Leknes airport, by 13:00 on day 6",
    image: lofotenValley,
    imageAlt:
      "A green glacial valley in Lofoten opening towards a lake and steep peaks under blue sky",
    gallery: [
      {
        src: lofotenReine,
        alt: "The fishing village of Reine on a green island in a deep blue fjord, seen from above",
      },
    ],
    departures: [
      { id: "lr-0612", start: "2027-06-12", spots: 5 },
      { id: "lr-0626", start: "2027-06-26", spots: 0 },
      { id: "lr-0717", start: "2027-07-17", spots: 6 },
      { id: "lr-0807", start: "2027-08-07", spots: 9 },
    ],
    days: [
      {
        title: "Svolvær and Tjeldbergtind",
        km: 4,
        up: 360,
        down: 360,
        hours: "2½ h",
        sleep: "Rorbu, Henningsvær",
        text: "Straight from the airport to a short summit above Svolvær to get our bearings: the whole chain of islands stretches west into the sea.",
        profile: [10, 120, 250, 367, 250, 120, 10],
      },
      {
        title: "Festvågtind",
        km: 8,
        up: 600,
        down: 600,
        hours: "4½ h",
        sleep: "Rorbu, Henningsvær",
        text: "A steep, rocky climb with a view straight down onto the football pitch of Henningsvær, then an evening wandering the harbour.",
        profile: [10, 180, 360, 541, 360, 180, 10],
      },
      {
        title: "Kvalvika and Ryten",
        km: 9,
        up: 700,
        down: 700,
        hours: "5 h",
        sleep: "Rorbu, Reine",
        text: "Over a pass to the hidden beach of Kvalvika, then up Ryten for the classic view back down onto it. Move west to Reine in the evening.",
        profile: [20, 200, 300, 0, 280, 543, 250, 20],
      },
      {
        title: "Bunes beach",
        km: 8,
        up: 250,
        down: 250,
        hours: "3½ h",
        sleep: "Rorbu, Reine",
        text: "A recovery day. A small ferry into Kjerkfjorden, a walk through the tiny settlement of Vindstad and across the dunes to Bunes beach.",
        profile: [0, 60, 150, 200, 100, 30, 0],
      },
      {
        title: "Hermannsdalstinden",
        km: 15,
        up: 1150,
        down: 1150,
        hours: "8 h",
        sleep: "Rorbu, Reine",
        text: "The big one. Past the Munkebu hut and a chain of lakes to a summit of 1,029 m with the whole archipelago at your feet. Steep, long and unforgettable.",
        profile: [10, 220, 450, 600, 780, 1029, 700, 450, 200, 10],
      },
      {
        title: "Nusfjord and home",
        km: 6,
        up: 200,
        down: 200,
        hours: "2½ h",
        sleep: "Not included: flights from Leknes",
        text: "A coastal path to Nusfjord, one of the oldest preserved fishing villages in Norway, and the short drive to Leknes airport.",
        profile: [10, 100, 200, 120, 10],
      },
    ],
    map: {
      legs: [
        [
          [90, 18],
          [93, 11],
          [90, 18],
        ],
        [
          [78, 26],
          [76, 17],
          [78, 26],
        ],
        [
          [58, 22],
          [54, 14],
          [61, 12],
          [58, 22],
        ],
        [
          [32, 30],
          [28, 22],
          [24, 17],
        ],
        [
          [22, 46],
          [18, 38],
          [12, 31],
          [18, 38],
          [22, 46],
        ],
        [
          [44, 40],
          [48, 46],
          [52, 48],
        ],
      ],
      peaks: [
        [56, 12, 10],
        [10, 28, 14],
        [78, 14, 8],
      ],
    },
  },
  {
    slug: "toubkal-villages",
    name: "Toubkal & the Berber Villages",
    region: "High Atlas",
    country: "Morocco",
    area: "Africa",
    grade: 3,
    group: 12,
    price: 1180,
    single: 160,
    months: [4, 5, 9, 10],
    landscapes: ["High peaks", "Villages"],
    sleep: "comfort",
    sleepLabel: "Village guesthouses and a refuge",
    kit: "daypack",
    guide: "youssef-ait-brahim",
    summary:
      "Mule tracks between Amazigh villages, two high passes and the summit of North Africa, with the luggage on four legs.",
    intro: [
      "An hour and a half from Marrakech the road gives out at Imlil, and the High Atlas begins: terraced walnut groves, flat-roofed villages the colour of the earth they're built from, and above them the 4,167 m dome of Jebel Toubkal.",
      "Youssef was born in Aremd, two villages up the valley. His cousins run the mule team that carries our bags and his aunt cooks the best tagine of the trip, which is saying something.",
    ],
    highlights: [
      "Jebel Toubkal, 4,167 m, the highest summit in North Africa",
      "Mint tea on a village rooftop at sunset",
      "Crossing Tizi Aguelzim at 3,560 m",
      "Mules carry your luggage between every night's stop",
    ],
    included: [
      "Local mountain guide, assistant and cook, maximum group of 12",
      "Five nights in guesthouses and the Toubkal refuge, full board",
      "Mule team for luggage",
      "Transfers from and to Marrakech",
    ],
    excluded: [
      "Flights to Marrakech",
      "Nights in Marrakech",
      "Tips for the mule team (about €40)",
      "Travel insurance",
    ],
    start: "Marrakech, 08:00 on day 1",
    finish: "Marrakech, around 15:00 on day 6",
    image: atlasValley,
    imageAlt:
      "A line of trekkers crossing a stony valley floor towards snow-streaked High Atlas peaks",
    gallery: [
      {
        src: atlasSummit,
        alt: "Snow-streaked ridges of the High Atlas seen from close to the summit of Toubkal",
      },
    ],
    departures: [
      { id: "tb-0410", start: "2027-04-10", spots: 8 },
      { id: "tb-0508", start: "2027-05-08", spots: 4 },
      { id: "tb-0918", start: "2027-09-18", spots: 11 },
      { id: "tb-1016", start: "2027-10-16", spots: 12 },
    ],
    days: [
      {
        title: "Imlil to Ouaneskra",
        km: 9,
        up: 600,
        down: 290,
        hours: "4 h",
        sleep: "Guesthouse, Ouaneskra",
        text: "Transfer from Marrakech, then a climb through walnut groves over the Tizi n'Tamatert pass to a village guesthouse with a roof terrace.",
        profile: [1740, 1850, 1980, 2140, 2279, 2150, 2050],
      },
      {
        title: "To the Tamsoult hut",
        km: 10,
        up: 550,
        down: 350,
        hours: "5 h",
        sleep: "Azib Tamsoult refuge",
        text: "Along shepherds' paths past summer pastures and the Irhoulidene waterfall to a small stone refuge in a high meadow.",
        profile: [2050, 2180, 2300, 2400, 2320, 2250],
      },
      {
        title: "Over Tizi Aguelzim",
        km: 9,
        up: 1400,
        down: 450,
        hours: "7 h",
        sleep: "Toubkal refuge, 3,207 m",
        text: "The hardest climb of the trip, zigzagging up scree to a 3,560 m pass with views across the whole range, then down to the refuge beneath Toubkal.",
        profile: [2250, 2500, 2800, 3100, 3350, 3560, 3380, 3207],
      },
      {
        title: "Jebel Toubkal",
        km: 16,
        up: 960,
        down: 2270,
        hours: "9 h",
        sleep: "Guesthouse, Aremd",
        text: "A 05:00 start by head torch, up the south cwm to the summit tripod for sunrise. Then the long descent to Youssef's home village and a well-earned feast.",
        profile: [3207, 3500, 3850, 4167, 3700, 3207, 2700, 2300, 1900],
      },
      {
        title: "Tizi Mzik and the valley villages",
        km: 12,
        up: 500,
        down: 800,
        hours: "5 h",
        sleep: "Guesthouse, Tinerhourhine",
        text: "A gentler day over the Tizi Mzik pass and down through apple orchards and irrigated terraces, with lunch in a village where the school is the only two-storey building.",
        profile: [1900, 2100, 2300, 2489, 2200, 1900, 1600],
      },
      {
        title: "Back to Imlil",
        km: 6,
        up: 200,
        down: 60,
        hours: "2 h",
        sleep: "Not included: Marrakech",
        text: "A last short walk up the valley to Imlil, a farewell lunch and the transfer down to Marrakech.",
        profile: [1600, 1650, 1700, 1740],
      },
    ],
    map: {
      legs: [
        [
          [14, 16],
          [22, 10],
          [32, 12],
        ],
        [
          [32, 12],
          [38, 20],
          [44, 26],
        ],
        [
          [44, 26],
          [52, 34],
          [58, 40],
        ],
        [
          [58, 40],
          [65, 48],
          [58, 42],
          [46, 48],
          [34, 50],
        ],
        [
          [34, 50],
          [26, 44],
          [20, 36],
        ],
        [
          [20, 36],
          [16, 26],
          [14, 18],
        ],
      ],
      peaks: [
        [66, 50, 16],
        [36, 18, 10],
        [52, 30, 8],
      ],
    },
  },
  {
    slug: "skye-coast-glens",
    name: "Skye Coast & Glens",
    region: "Isle of Skye",
    country: "Scotland",
    area: "North Atlantic",
    grade: 1,
    group: 12,
    price: 1090,
    single: 240,
    months: [5, 6, 7, 8, 9],
    landscapes: ["Coast & fjords", "Villages"],
    sleep: "comfort",
    sleepLabel: "Crofting B&Bs",
    kit: "daypack",
    guide: "callum-macrae",
    summary:
      "Sea cliffs, sheep tracks and lochs under the Cuillin: Skye's best short walks, with a warm B&B every night.",
    intro: [
      "Skye rewards the walker who doesn't need a summit: the landslip pinnacles of the Quiraing, the clear pools under the Black Cuillin, the cliffs at Neist Point where gannets fold and drop into the sea.",
      "Callum farms sheep near Portree when he isn't guiding, so the walking comes with crofting history, Gaelic place names and a reliable sense of when the rain will stop. It usually does.",
    ],
    highlights: [
      "The Quiraing's pinnacles and hidden 'Table'",
      "A boat from Loch Coruisk under the Black Cuillin",
      "Gannets and, with luck, minke whales at Neist Point",
      "Four nights in the same crofting B&B: unpack once",
    ],
    included: [
      "Local guide throughout, maximum group of 12",
      "Four nights in a crofting B&B, breakfast and two dinners",
      "Minibus to every trailhead",
      "Boat from Loch Coruisk to Elgol",
    ],
    excluded: [
      "Travel to Portree",
      "Lunches and two dinners in Portree",
      "Travel insurance",
    ],
    start: "Portree square, 10:00 on day 1",
    finish: "Portree, around 15:00 on day 5",
    image: skyeGlen,
    imageAlt:
      "A walker in a dark jacket on a gravel track through a bronze glen with sheep and misty peaks",
    gallery: [
      {
        src: skyeLoch,
        alt: "A hiker with a backpack looks out over Loch Coruisk among rocky hills",
      },
      {
        src: skyeFalls,
        alt: "A small waterfall pouring into a clear pool below rocky hills in Glen Sligachan",
      },
    ],
    departures: [
      { id: "sk-0522", start: "2027-05-22", spots: 10 },
      { id: "sk-0619", start: "2027-06-19", spots: 5 },
      { id: "sk-0807", start: "2027-08-07", spots: 2 },
      { id: "sk-0911", start: "2027-09-11", spots: 12 },
    ],
    days: [
      {
        title: "Portree and Scorrybreac",
        km: 6,
        up: 200,
        down: 200,
        hours: "2½ h",
        sleep: "Crofting B&B near Portree",
        text: "Meet at the square, drop your bags and walk the Scorrybreac coast path round the headland above the harbour. Fish supper optional, but strongly encouraged.",
        profile: [20, 60, 110, 140, 90, 40, 20],
      },
      {
        title: "The Quiraing",
        km: 7,
        up: 330,
        down: 330,
        hours: "3 h",
        sleep: "Crofting B&B",
        text: "Under the pinnacles of the Trotternish ridge, up to the grassy 'Table' where clan cattle were once hidden from raiders, and back along the escarpment.",
        profile: [430, 470, 500, 543, 470, 400, 360, 430],
      },
      {
        title: "Glen Sligachan",
        km: 12,
        up: 350,
        down: 250,
        hours: "4½ h",
        sleep: "Crofting B&B",
        text: "Into the long glen between the red and black Cuillin, past waterfalls and pools clear enough to count the pebbles. Swimmers bring a towel.",
        profile: [10, 60, 110, 170, 230, 280, 300, 120],
      },
      {
        title: "Elgol to Loch Coruisk",
        km: 11,
        up: 380,
        down: 380,
        hours: "5 h",
        sleep: "Crofting B&B",
        text: "The coast path from Elgol across Camasunary bay to the loch at the heart of the Cuillin, and the boat back across the water with seals on the rocks.",
        profile: [60, 150, 90, 30, 120, 70, 25, 40],
      },
      {
        title: "Neist Point",
        km: 6,
        up: 220,
        down: 220,
        hours: "2½ h",
        sleep: "Not included: travel from Portree",
        text: "Out to the lighthouse on the island's westernmost tip, a last look for whales, and back to Portree for the afternoon buses.",
        profile: [80, 40, 20, 90, 40, 80],
      },
    ],
    map: {
      legs: [
        [
          [52, 26],
          [57, 21],
          [55, 31],
          [52, 26],
        ],
        [
          [44, 9],
          [48, 4],
          [47, 13],
          [44, 9],
        ],
        [
          [46, 32],
          [44, 41],
          [40, 50],
        ],
        [
          [28, 57],
          [34, 50],
          [41, 53],
        ],
        [
          [9, 23],
          [4, 18],
          [9, 23],
        ],
      ],
      peaks: [
        [38, 44, 12],
        [44, 14, 8],
        [20, 32, 6],
      ],
    },
  },
];

/* ───────────────────────── Guides ───────────────────────── */

export type Guide = {
  slug: string;
  name: string;
  base: string;
  since: number;
  languages: string[];
  qualifications: string[];
  specialty: string;
  quote: string;
  bio: string[];
  favourite: string;
  image: string;
  imageAlt: string;
};

export const guides: Guide[] = [
  {
    slug: "marta-dellantonio",
    name: "Marta Dellantonio",
    base: "Moena, Val di Fassa",
    since: 2011,
    languages: ["Italian", "Ladin", "German", "English"],
    qualifications: [
      "International Mountain Leader (UIMLA)",
      "Wilderness First Responder",
    ],
    specialty: "Hut-to-hut trekking and Dolomite wartime history",
    quote:
      "The huts are the real route. The trail is just how you get from one kitchen to the next.",
    bio: [
      "Marta grew up in a Ladin-speaking family in Val di Fassa and spent her teenage summers carrying crates up to her uncle's rifugio. She qualified as a mountain leader in 2011 and has walked the Alta Via 1 more than sixty times.",
      "Off season she volunteers with the local mountain rescue and researches the First World War front that ran along these ridges; ask her about the tunnels inside Lagazuoi and plan for a long answer.",
    ],
    favourite:
      "Watching the first light hit the Civetta from the Nuvolau terrace, when most people are still in their sleeping bags.",
    image: dolomitesRidge,
    imageAlt: "Pale Dolomite towers under heavy cloud",
  },
  {
    slug: "jonas-brenner",
    name: "Jonas Brenner",
    base: "St. Märgen, Black Forest",
    since: 2016,
    languages: ["German", "English", "French"],
    qualifications: [
      "Certified Nature and Landscape Guide (ZNL)",
      "Former state forester",
      "First Aid Outdoor",
    ],
    specialty: "Forest ecology, birdlife and slow walking",
    quote:
      "Walk slower and the forest gets louder. Everyone notices it by day two.",
    bio: [
      "Jonas managed state forest around the Feldberg for fifteen years before swapping the chainsaw for a walking pole. He knows the Westweg as a working landscape: which stands were replanted after the 1999 storm, which farms still make their own ham.",
      "He leads at a deliberate pace, stops often and carries a pair of binoculars for the group. His groups are the only ones that reliably hear the capercaillie.",
    ],
    favourite:
      "The open Belchen summit in October, with the Alps floating above the fog in the Rhine valley.",
    image: blackforestBoardwalk,
    imageAlt: "A sunlit beech wood path in the Black Forest",
  },
  {
    slug: "sigrun-haraldsdottir",
    name: "Sigrún Haraldsdóttir",
    base: "Hella, South Iceland",
    since: 2012,
    languages: ["Icelandic", "English", "Danish"],
    qualifications: [
      "Icelandic Mountain Guides certified trekking guide",
      "Glacier guide level 2",
      "Wilderness First Responder",
    ],
    specialty: "Highland trekking, river crossings, volcanic geology",
    quote: "In the highlands the weather is the guide. I just translate.",
    bio: [
      "Sigrún studied geology in Reykjavík and started guiding to pay for fieldwork. Twelve seasons later she still stops to pick up obsidian and explain how it formed, and she can read a glacial river's mood from fifty metres away.",
      "She was working at Þórsmörk in 2010 when Eyjafjallajökull erupted; walking past the craters with her is the closest you'll get to the event.",
    ],
    favourite:
      "The moment on Fimmvörðuháls when the cloud lifts and you realise you're standing between two ice caps.",
    image: icelandDesert,
    imageAlt: "Black-sand desert in the Icelandic highlands",
  },
  {
    slug: "tomas-ibarra",
    name: "Tomás Ibarra",
    base: "Puerto Natales, Chile",
    since: 2008,
    languages: ["Spanish", "English", "Portuguese"],
    qualifications: [
      "Torres del Paine licensed guide",
      "Wilderness First Responder",
      "Swiftwater rescue",
    ],
    specialty: "Patagonian weather, wildlife and long days",
    quote: "Patagonia doesn't care about your plan. So we make three.",
    bio: [
      "Tomás grew up on an estancia outside Natales and first walked the W at fourteen with his father. He has guided in the park for eighteen seasons and in the winters works as a puma-tracking guide on the eastern steppe.",
      "He is known for 05:00 starts and long, unhurried lunches, both in the service of the wind. Expect mate in a gourd at every rest stop.",
    ],
    favourite:
      "The silence in the Valle del Francés between avalanches, when the whole amphitheatre seems to hold its breath.",
    image: patagoniaGlacier,
    imageAlt: "Glacier Los Perros above a grey lake in Patagonia",
  },
  {
    slug: "nina-kos",
    name: "Nina Kos",
    base: "Bovec, Soča valley",
    since: 2015,
    languages: ["Slovenian", "English", "Italian", "German"],
    qualifications: [
      "International Mountain Leader (UIMLA)",
      "Via ferrata instructor",
      "First Aid Outdoor",
    ],
    specialty: "Julian Alps huts, karst plateaus and Triglav",
    quote:
      "Every Slovene is supposed to climb Triglav once. I just keep going back.",
    bio: [
      "Nina ran the kitchen at a hut below Triglav for six summers before training as a leader, which explains her fondness for hut keepers and her firm views on jota.",
      "She leads the optional Triglav ascent herself and keeps the group small and roped where it matters. Her autumn departures are timed for the larches.",
    ],
    favourite:
      "Breakfast at the Double Lake hut, with the mist burning off the water.",
    image: julianRidge,
    imageAlt: "Lakes on a green plateau in the Julian Alps",
  },
  {
    slug: "eirik-solheim",
    name: "Eirik Solheim",
    base: "Reine, Lofoten",
    since: 2014,
    languages: ["Norwegian", "English", "Swedish"],
    qualifications: [
      "Norwegian certified mountain guide (NORTIND aspirant)",
      "Sea kayak instructor",
      "Wilderness First Aid",
    ],
    specialty: "Steep coastal summits and midnight-sun timing",
    quote:
      "Up here, ten at night is the best time to start. The light is better and the trail is empty.",
    bio: [
      "Eirik's family fished out of Reine for four generations; he chose the mountains instead and has climbed almost every peak in the western islands. Winters he guides ski touring from a sailboat.",
      "He plans Lofoten days around weather windows rather than the clock, and he is not above moving dinner to midnight if the summit light is right.",
    ],
    favourite:
      "Sitting on Hermannsdalstinden at midnight in late June, the sun skimming the sea to the north.",
    image: lofotenReine,
    imageAlt: "Reine village on an island in a deep blue fjord",
  },
  {
    slug: "youssef-ait-brahim",
    name: "Youssef Aït Brahim",
    base: "Aremd, High Atlas",
    since: 2009,
    languages: ["Tashelhit", "Arabic", "French", "English"],
    qualifications: [
      "Moroccan state-licensed mountain guide (CFAMM)",
      "Wilderness First Aid",
    ],
    specialty: "Toubkal massif, Amazigh village life",
    quote: "You come for the summit. You will remember the tea.",
    bio: [
      "Youssef was born in Aremd and trained at the national mountain guide school in Tabant. He has summited Toubkal more than four hundred times and still counts it as a good day.",
      "His extended family runs the mule team, the cook tent and two of the guesthouses on our route, so the money from this trip stays in the valley.",
    ],
    favourite:
      "Sunset from his mother's rooftop in Aremd, with the call to prayer echoing across the valley.",
    image: atlasSummit,
    imageAlt: "Snow-streaked High Atlas ridges near Toubkal",
  },
  {
    slug: "callum-macrae",
    name: "Callum MacRae",
    base: "Portree, Isle of Skye",
    since: 2013,
    languages: ["English", "Scottish Gaelic"],
    qualifications: [
      "Mountain Leader (Mountain Training UK)",
      "Outdoor First Aid",
      "Working crofter",
    ],
    specialty: "Coastal walking, crofting history, Gaelic place names",
    quote:
      "There's no bad weather on Skye. There's just weather you haven't waited out yet.",
    bio: [
      "Callum keeps sixty blackface sheep on a croft north of Portree and has guided on the island for over a decade. He translates every place name, most of which turn out to mean 'wet hill'.",
      "He runs the easy-going Skye trip because, he says, the best of the island is at the bottom of the hills, not the top.",
    ],
    favourite: "Gannets diving off Neist Point in a September gale.",
    image: skyeFalls,
    imageAlt: "A waterfall in Glen Sligachan on Skye",
  },
];

/* ───────────────────────── Gear ───────────────────────── */

export const kits: { id: KitId; name: string; pack: string; text: string }[] = [
  {
    id: "daypack",
    name: "Bags carried ahead",
    pack: "20–25 L day pack",
    text: "Your luggage travels by van or mule; you carry water, layers and lunch.",
  },
  {
    id: "hut",
    name: "Hut to hut",
    pack: "30–35 L pack, under 8 kg",
    text: "Everything for the week on your back. Huts provide blankets, dinner and breakfast.",
  },
  {
    id: "storm",
    name: "Wild weather",
    pack: "35–40 L pack, fully waterproofed",
    text: "Hut to hut or base, but in places where it can snow in July and wind is the main event.",
  },
];

export type GearItem = {
  id: string;
  name: string;
  note: string;
  grams: number;
  group: "On your feet" | "Layers" | "Carrying" | "Sleeping" | "Small things";
  kits: KitId[];
  /** Hire price per trip in euros, if we rent it. */
  hire?: number;
};

const all: KitId[] = ["daypack", "hut", "storm"];

export const gear: GearItem[] = [
  {
    id: "boots",
    name: "Walking boots, broken in",
    note: "Ankle support and a stiff sole. Never new on the trip.",
    grams: 1150,
    group: "On your feet",
    kits: all,
  },
  {
    id: "socks",
    name: "Merino walking socks ×3",
    note: "One on, one drying, one spare.",
    grams: 240,
    group: "On your feet",
    kits: all,
  },
  {
    id: "gaiters",
    name: "Short gaiters",
    note: "Keeps ash, scree and snow out of boots.",
    grams: 180,
    group: "On your feet",
    kits: ["storm"],
    hire: 8,
  },
  {
    id: "camp-shoes",
    name: "Light hut shoes",
    note: "Boots stay in the boot room at every hut.",
    grams: 260,
    group: "On your feet",
    kits: ["hut", "storm"],
  },
  {
    id: "base",
    name: "Merino base layers ×2",
    note: "Short and long sleeve; wool smells far less after day three.",
    grams: 380,
    group: "Layers",
    kits: all,
  },
  {
    id: "mid",
    name: "Fleece or wool mid-layer",
    note: "The layer you will wear most.",
    grams: 350,
    group: "Layers",
    kits: all,
  },
  {
    id: "puffy",
    name: "Insulated jacket",
    note: "Down or synthetic, for summits and hut terraces.",
    grams: 420,
    group: "Layers",
    kits: all,
  },
  {
    id: "shell",
    name: "Waterproof jacket with hood",
    note: "Taped seams, a proper hood, room for layers beneath.",
    grams: 400,
    group: "Layers",
    kits: all,
  },
  {
    id: "overtrousers",
    name: "Waterproof overtrousers",
    note: "Side zips make them easy over boots.",
    grams: 300,
    group: "Layers",
    kits: ["hut", "storm"],
  },
  {
    id: "trousers",
    name: "Walking trousers",
    note: "Quick-drying; no jeans.",
    grams: 380,
    group: "Layers",
    kits: all,
  },
  {
    id: "warm-hat",
    name: "Warm hat and liner gloves",
    note: "Needed even in August above 2,000 m.",
    grams: 120,
    group: "Layers",
    kits: all,
  },
  {
    id: "mitts",
    name: "Windproof over-mitts",
    note: "For Patagonian wind and Icelandic sleet.",
    grams: 110,
    group: "Layers",
    kits: ["storm"],
  },
  {
    id: "sun",
    name: "Sun hat and category 3 sunglasses",
    note: "Snowfields and high altitude reflect more than you think.",
    grams: 110,
    group: "Layers",
    kits: all,
  },
  {
    id: "daypack",
    name: "20–25 L day pack",
    note: "With a hip belt and a rain cover.",
    grams: 750,
    group: "Carrying",
    kits: ["daypack"],
    hire: 15,
  },
  {
    id: "pack",
    name: "30–40 L rucksack",
    note: "Fitted hip belt; try it loaded before you come.",
    grams: 1250,
    group: "Carrying",
    kits: ["hut", "storm"],
    hire: 25,
  },
  {
    id: "liner",
    name: "Pack liner and dry bags",
    note: "Rain covers leak; a liner doesn't.",
    grams: 120,
    group: "Carrying",
    kits: all,
  },
  {
    id: "poles",
    name: "Trekking poles",
    note: "Your knees will thank you on every descent.",
    grams: 480,
    group: "Carrying",
    kits: all,
    hire: 12,
  },
  {
    id: "bottles",
    name: "1.5 L of water bottles",
    note: "Two bottles beat one bladder when it freezes.",
    grams: 160,
    group: "Carrying",
    kits: all,
  },
  {
    id: "silk-liner",
    name: "Silk sleeping-bag liner",
    note: "Required in every Alpine hut.",
    grams: 140,
    group: "Sleeping",
    kits: ["hut", "storm"],
    hire: 6,
  },
  {
    id: "earplugs",
    name: "Earplugs and eye mask",
    note: "Dormitories snore, and midnight sun is bright.",
    grams: 20,
    group: "Sleeping",
    kits: all,
  },
  {
    id: "towel",
    name: "Quick-dry towel",
    note: "Hut showers are rare, short and coin-operated.",
    grams: 150,
    group: "Sleeping",
    kits: ["hut", "storm"],
  },
  {
    id: "torch",
    name: "Head torch and spare batteries",
    note: "For hut corridors and summit starts.",
    grams: 90,
    group: "Small things",
    kits: all,
  },
  {
    id: "first-aid",
    name: "Personal blister kit and medication",
    note: "Your guide carries the group kit.",
    grams: 200,
    group: "Small things",
    kits: all,
  },
  {
    id: "sunscreen",
    name: "SPF 50 sunscreen and lip balm",
    note: "UV is stronger at altitude, even under cloud.",
    grams: 120,
    group: "Small things",
    kits: all,
  },
  {
    id: "cash",
    name: "Cash in local currency",
    note: "Many huts and village shops take no cards.",
    grams: 0,
    group: "Small things",
    kits: ["hut", "daypack"],
  },
];

export const provided = [
  "Group first-aid kit and emergency shelter",
  "Satellite messenger with SOS on every trip",
  "Microspikes where snowfields are expected",
  "Helmets and via ferrata sets on the Triglav option",
];

/* ───────────────────────── Home & about copy ───────────────────────── */

export const home = {
  title: "Walk somewhere you can feel small.",
  lede: "Small-group guided treks of four to seven days in eight mountain ranges, led by guides who live at the foot of them. Huts or guesthouses, a pack that fits, and nobody counting kilometres.",
  dayTitle: "A day on the trail",
  dayLede:
    "Every trip is different, but most days on the Alta Via look roughly like this.",
  day: [
    {
      time: "06:45",
      text: "Coffee and bread at the hut table, weather check with your guide.",
    },
    {
      time: "07:30",
      text: "Boots on. The first hour is always the coolest and quietest.",
    },
    {
      time: "10:00",
      text: "A long stop at a pass or a lake. Snacks, photos, a layer on or off.",
    },
    {
      time: "12:30",
      text: "Lunch at a hut on the way, or bread and cheese on a warm rock.",
    },
    {
      time: "15:00",
      text: "Arrive at the night's hut. Shower if there is one, terrace if not.",
    },
    {
      time: "19:00",
      text: "Three courses at long tables, and tomorrow's route on the map.",
    },
  ],
  philosophyTitle: "Less itinerary. More instinct.",
  philosophy: [
    "We aren't here to tick boxes. We're here for the conversations on the climb, the second cup of coffee, the path you almost didn't take.",
    "Our groups are small by design: a handful of good people, a guide who knows the ground, and enough room in the day for the unexpected.",
  ],
  principles: [
    {
      title: "Twelve at most",
      text: "Most departures run with six to ten walkers. Huts have room, guides have time.",
    },
    {
      title: "Guides from there",
      text: "Every guide lives in the valley they lead in. The money stays there too.",
    },
    {
      title: "Light on the ground",
      text: "Every start is reachable by train or bus, and we brief on trail manners before day one.",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "I've done guided trips before where you feel herded. This was the opposite. Marta changed our route on day three to dodge a storm and we ended up with the best sunset of my life.",
    name: "Hannah W.",
    trip: "Alta Via Huts, 2026",
  },
  {
    quote:
      "Sigrún got eight nervous people across two glacial rivers without a single wet sock. Then she cooked lamb soup for us in a hut in the middle of nowhere.",
    name: "Rafael M.",
    trip: "Laugavegur Crossing, 2026",
  },
  {
    quote:
      "I'm sixty-eight and was worried about keeping up. Jonas set the pace for the slowest of us and never once made it feel like a favour.",
    name: "Peter and Anne K.",
    trip: "Westweg Quiet Way, 2025",
  },
];

export const about = {
  title: "We started as two guides with one minibus.",
  lede: "Terrain began in 2016 when Lea Hofer and Daniel Moreau, both mountain leaders, got tired of watching big operators march forty people up the same trail. They wanted small groups, local guides and trips planned by people who actually walk them.",
  story: [
    "The first season was one route, the Alta Via 1, and eleven departures. Lea did the bookings from her kitchen in Innsbruck; Daniel drove the minibus and led most of the trips. By the third year guides from other valleys were asking to join, and the rule was set: we only work with people who live where they lead.",
    "Today we run eight routes on three continents with eight lead guides and a planning desk of four. We are still small enough that the person who answers your email has walked the route you're asking about.",
  ],
  safetyTitle: "How we keep it safe",
  safety: [
    {
      title: "Qualified, local leaders",
      text: "Every lead guide holds a national or international mountain leader qualification and a current wilderness first-aid certificate.",
    },
    {
      title: "Ratios that work",
      text: "One guide for up to ten walkers, with an assistant guide added on Laugavegur, Toubkal and any group of eleven or twelve.",
    },
    {
      title: "Always in contact",
      text: "Guides carry a satellite messenger with SOS and check in with our desk every evening, including from huts without signal.",
    },
    {
      title: "Plans B and C",
      text: "Each itinerary has written bad-weather alternatives. Guides have full authority to use them, and they do.",
    },
  ],
  team: [
    {
      name: "Lea Hofer",
      role: "Co-founder, planning desk",
      text: "Answers most first emails and still leads two Westweg departures a year.",
    },
    {
      name: "Daniel Moreau",
      role: "Co-founder, operations",
      text: "Plans routes, trains new guides and fixes the minibus.",
    },
    {
      name: "Priya Raman",
      role: "Bookings and travel",
      text: "Trains, flights, insurance questions. Knows every timetable in the Alps.",
    },
    {
      name: "Mateo Ruiz",
      role: "Guide support",
      text: "Runs the evening check-in calls and the gear store in Innsbruck.",
    },
  ],
};

/* ───────────────────────── FAQ ───────────────────────── */

export const faq: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Choosing a trip",
    items: [
      {
        q: "How fit do I need to be?",
        a: "Each trip has a grade: Easy going (blue), Steady (red) or Demanding (black). The grade page lists daily hours and climbing. As a rule, if you can walk the longest day on your trip at home, with a loaded pack, two days in a row, you'll enjoy it.",
      },
      {
        q: "I'm travelling solo. Will I pay more?",
        a: "No. You'll share a twin room or hut dormitory with another solo walker of the same gender, at no extra cost. If you'd rather have a private room, the supplement is listed on each trip where the accommodation allows it.",
      },
      {
        q: "What's the age range on your trips?",
        a: "Most walkers are between 30 and 65, with regulars in their seventies on the easier grades. The minimum age is 16, accompanied by an adult.",
      },
    ],
  },
  {
    group: "Booking and payment",
    items: [
      {
        q: "How does payment work?",
        a: "A 25% deposit secures your place. The balance is due eight weeks before departure; we email a reminder ten days before that. All prices are in euros and include local taxes.",
      },
      {
        q: "What if the trip doesn't reach minimum numbers?",
        a: "Every departure runs with four or more walkers. If we have to cancel, we tell you at least eight weeks before and refund everything you paid, or move you to another date at no cost.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancel more than eight weeks before departure and you lose only the deposit. Between eight and four weeks, 50% of the trip price; within four weeks, the full price. Travel insurance usually covers this.",
      },
    ],
  },
  {
    group: "On the trip",
    items: [
      {
        q: "Do I need travel insurance?",
        a: "Yes. It must cover mountain rescue and medical evacuation at the highest altitude on your trip. We ask for the policy number before departure.",
      },
      {
        q: "Can you cater for dietary needs?",
        a: "Vegetarian is easy everywhere. Vegan, gluten-free and serious allergies are possible on most routes with notice; huts have small kitchens, so tell us when you book.",
      },
      {
        q: "What happens in bad weather?",
        a: "Guides have written alternatives for every day and the authority to use them. Sometimes that means a lower path, sometimes a rest day at a hut. We don't refund for weather changes, but we rarely lose a whole day.",
      },
    ],
  },
];

export const newsletter = {
  title: "The trail letter",
  text: "One email a month: new departures, last places and a route worth walking. No spam, ever.",
};
