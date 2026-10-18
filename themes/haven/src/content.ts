import hero from "./assets/hero.jpg";
import roomLarch from "./assets/room-larch.jpg";
import roomArve from "./assets/room-arve.jpg";
import roomValley from "./assets/room-valley.jpg";
import roomGable from "./assets/room-gable.jpg";
import roomStube from "./assets/room-stube.jpg";
import cabinForest from "./assets/cabin-forest.jpg";
import cabinAlp from "./assets/cabin-alp.jpg";
import woodWall from "./assets/wood-wall.jpg";
import cabinWindow from "./assets/cabin-window.jpg";
import reading from "./assets/reading.jpg";
import dinner from "./assets/dinner.jpg";
import tavern from "./assets/tavern.jpg";
import chef from "./assets/chef.jpg";
import cheese from "./assets/cheese.jpg";
import fondue from "./assets/fondue.jpg";
import breakfast from "./assets/breakfast.jpg";
import kitchen from "./assets/kitchen.jpg";
import sauna from "./assets/sauna.jpg";
import lake from "./assets/lake.jpg";
import fire from "./assets/fire.jpg";
import hikers from "./assets/hikers.jpg";
import summit from "./assets/summit.jpg";
import skitour from "./assets/skitour.jpg";
import frozenLake from "./assets/frozen-lake.jpg";
import gondola from "./assets/gondola.jpg";
import alp from "./assets/alp.jpg";
import archive from "./assets/gemmi-1890s.jpg";
import dawn from "./assets/dawn.jpg";
import valley from "./assets/valley.jpg";
import winterForest from "./assets/winter-forest.jpg";
import logs from "./assets/logs.jpg";

export type Img = { src: string; alt: string };

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Haven",
  sector: "Alpine hotel",
  place: "Arlen, Val Teria",
  altitude: 1640,
  tagline: "Twenty-two beds at 1,640 metres, and the whole valley below.",
  email: "hello@haven.example",
  phone: "+1 555 016 4016",
  address: ["Haven Alpine House", "Via Sura 12", "Arlen, Val Teria"],
  currency: "CHF",
  checkIn: "15:00",
  checkOut: "11:00",
  hero: {
    src: hero,
    alt: "Two timber huts in deep snow below a jagged ridge, low winter sun behind the peaks",
  } as Img,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/rooms", label: "Rooms" },
  { to: "/dining", label: "Dining" },
  { to: "/spa", label: "Bathhouse" },
  { to: "/experiences", label: "Experiences" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "The house" },
  { to: "/plan", label: "Plan your stay" },
];

/** Months the house is open: [month (1–12), day] start → end, inclusive. */
export const seasons = [
  { name: "Winter", from: [12, 12], to: [4, 6] },
  { name: "Summer", from: [6, 5], to: [10, 25] },
] as const;

export const peakDates = [
  ["12-20", "01-04"],
  ["02-07", "03-01"],
  ["07-18", "08-16"],
] as const;

/* ------------------------------------------------------------ panorama */

/** The view south from the terrace. x is 0–100 across the panorama, left (east) to right (west). */
export type Peak = {
  id: string;
  name: string;
  alt: number;
  x: number;
  note: string;
};

export const peaks: Peak[] = [
  {
    id: "piz-arlen",
    name: "Piz Arlen",
    alt: 2804,
    x: 7,
    note: "The village's own mountain. A marked trail from our back door reaches the cross in four hours.",
  },
  {
    id: "corn-sura",
    name: "Corn Sura",
    alt: 2617,
    x: 20,
    note: "Grassy to the top. In July the alp cattle graze almost to the summit cairn.",
  },
  {
    id: "teriahorn",
    name: "Teriahorn",
    alt: 3212,
    x: 37,
    note: "The highest point in the valley and the first to turn pink at dawn, about eleven minutes before sunrise.",
  },
  {
    id: "mot-neiv",
    name: "Mot da la Neiv",
    alt: 2951,
    x: 51,
    note: "'Snow hill'. It keeps a north couloir white into August; ski tourers climb it from February.",
  },
  {
    id: "il-gobbo",
    name: "Il Gobbo",
    alt: 2740,
    x: 63,
    note: "The hunchback. Its rounded shoulder holds the glacier lake Lai Nair, two hours' walk.",
  },
  {
    id: "piz-ravuna",
    name: "Piz Ravuna",
    alt: 3098,
    x: 76,
    note: "First climbed in 1867 by a schoolteacher from Arlen and his two sons. Guided ascents only.",
  },
  {
    id: "schwarzgrat",
    name: "Schwarzgrat",
    alt: 2875,
    x: 88,
    note: "The black ridge: dark serpentine rock that never holds snow for long.",
  },
  {
    id: "mot-alv",
    name: "Mot Alv",
    alt: 2455,
    x: 96,
    note: "The top station of the gondola. Last ride down at 17:30, or walk the ridge home.",
  },
];

/* ------------------------------------------------------------ rooms */

export type RoomKind = "room" | "suite" | "cabin";

export type Room = {
  id: string;
  name: string;
  kind: RoomKind;
  line: string;
  description: string[];
  size: number;
  sleeps: number;
  beds: string;
  where: string;
  outlook: string;
  /** Portion of the panorama framed by the window, [from, to] on the 0–100 scale. */
  view: [number, number];
  price: number;
  image: Img;
  gallery: Img[];
  features: string[];
};

export const kindLabel: Record<RoomKind, string> = {
  room: "Room",
  suite: "Suite",
  cabin: "Cabin",
};

export const rooms: Room[] = [
  {
    id: "larch-room",
    name: "Larch Room",
    kind: "room",
    line: "Pale larch floors, white linen and the morning sun on Il Gobbo.",
    description: [
      "Our smallest room and the one we would choose for a week of walking. Larch boards from the forest behind the house, a deep armchair by an east window, and a bed you will not want to leave before the light reaches the valley floor.",
      "The bathroom has a rain shower and a heated stone floor; the wardrobe has boot hooks and a drying rail, because you will need them.",
    ],
    size: 24,
    sleeps: 2,
    beds: "Queen bed, 160 × 200",
    where: "First floor, east wing",
    outlook: "Southeast over Il Gobbo and Piz Ravuna",
    view: [55, 84],
    price: 290,
    image: {
      src: roomLarch,
      alt: "An oak armchair with a linen cushion beside white curtains in morning light",
    },
    gallery: [
      { src: reading, alt: "Hands holding an open book over a wool blanket" },
      { src: cabinWindow, alt: "A small window framed in weathered logs" },
    ],
    features: [
      "Rain shower",
      "Heated stone floor",
      "Boot rail and drying cupboard",
      "Nespresso and a tin of the house tea",
      "Blackout shutters",
    ],
  },
  {
    id: "stone-pine-room",
    name: "Stone Pine Room",
    kind: "room",
    line: "Panelled floor to ceiling in Swiss stone pine. It smells of the forest.",
    description: [
      "Every surface of this room is arve, the stone pine that grows at the treeline above us. The wood keeps its resin for decades; guests tell us they sleep more deeply here, and we have stopped arguing.",
      "The original 1898 window seat looks west to the Teriahorn. A writing desk, a carved bench, and nothing on the walls but wood.",
    ],
    size: 28,
    sleeps: 2,
    beds: "King bed, 180 × 200, or two singles",
    where: "Second floor, old house",
    outlook: "South to Corn Sura and the Teriahorn",
    view: [10, 44],
    price: 340,
    image: {
      src: roomArve,
      alt: "A wood-panelled parlour with a row of small windows, a table and carved chairs",
    },
    gallery: [
      {
        src: woodWall,
        alt: "Dark timber panelling with a low table and a linen floor cushion",
      },
      { src: reading, alt: "Hands holding an open book over a wool blanket" },
    ],
    features: [
      "Original 1898 panelling",
      "Window seat",
      "Writing desk",
      "Bath with shower",
      "Twin or king on request",
    ],
  },
  {
    id: "balcony-room",
    name: "Balcony Room",
    kind: "room",
    line: "A south balcony the width of the room, and space for a third bed.",
    description: [
      "Doors open onto a timber balcony that catches the sun from ten until it drops behind Schwarzgrat. There are two chairs, a blanket chest and a bracket for your coffee.",
      "Inside: oiled floors, gauze curtains and a daybed that becomes a proper single for a child or a friend.",
    ],
    size: 32,
    sleeps: 3,
    beds: "King bed and a single daybed",
    where: "First floor, south front",
    outlook: "The full middle of the range, Corn Sura to Piz Ravuna",
    view: [24, 78],
    price: 380,
    image: {
      src: roomValley,
      alt: "Sheer white curtains parted over an oiled timber floor in bright light",
    },
    gallery: [
      {
        src: roomLarch,
        alt: "An oak armchair with a linen cushion beside white curtains",
      },
      { src: cabinWindow, alt: "A small window framed in weathered logs" },
    ],
    features: [
      "Private south balcony",
      "Daybed for a third guest",
      "Bath and separate shower",
      "Binoculars and a peak chart",
      "Blanket chest",
    ],
  },
  {
    id: "gable-suite",
    name: "Gable Suite",
    kind: "suite",
    line: "Two levels under the old roof beams, with a stone chimney between them.",
    description: [
      "The top of the house, opened up to its 1898 trusses. A sitting room and bathroom below, a sleeping gallery above with a round window aimed at the Teriahorn.",
      "Families take it for the ladder; couples take it for the bath, which sits under a skylight and fills in four minutes.",
    ],
    size: 48,
    sleeps: 4,
    beds: "King bed in the gallery, sofa bed below",
    where: "Top floor, whole gable",
    outlook: "Wide south view from two windows",
    view: [18, 92],
    price: 560,
    image: {
      src: roomGable,
      alt: "Exposed timber roof trusses with copper pendant lamps and a rough stone chimney",
    },
    gallery: [
      {
        src: woodWall,
        alt: "Dark timber panelling with a low table and a linen floor cushion",
      },
      {
        src: roomValley,
        alt: "Sheer white curtains over an oiled timber floor",
      },
    ],
    features: [
      "Sleeping gallery",
      "Skylight bath",
      "Sitting room with sofa bed",
      "Two washbasins",
      "Record player and a shelf of vinyl",
    ],
  },
  {
    id: "stube-suite",
    name: "Stube Suite",
    kind: "suite",
    line: "A parlour with its own fire, a bedroom beyond, the evening to yourselves.",
    description: [
      "Built around the house's second hearth. Logs are laid every afternoon at four; you light them when you want. The bedroom sits behind a pine door, quiet as a cellar.",
      "We serve breakfast here on request, at the window table, at whatever hour suits.",
    ],
    size: 54,
    sleeps: 3,
    beds: "King bed and a single in the parlour",
    where: "Ground floor, west corner",
    outlook: "Southwest over the Teriahorn and Mot da la Neiv",
    view: [30, 64],
    price: 620,
    image: {
      src: roomStube,
      alt: "An open book and a mug beside a lit fireplace in a dim parlour",
    },
    gallery: [
      { src: fire, alt: "Logs burning brightly in a stone hearth" },
      { src: reading, alt: "Hands holding an open book over a wool blanket" },
    ],
    features: [
      "Wood-burning fireplace",
      "Separate parlour",
      "In-room breakfast on request",
      "Walk-in shower",
      "Garden door",
    ],
  },
  {
    id: "forest-cabin",
    name: "Forest Cabin",
    kind: "cabin",
    line: "Three hundred metres into the larch wood, with a wood-fired tub on the step.",
    description: [
      "A timber cabin of its own, reached by a lantern-lit path from the main house. One room with a stove, a bed under the eaves and a window seat facing the western peaks through the trees.",
      "The cedar tub outside is filled and fired for you at dusk. Breakfast arrives in a basket; dinner is yours in the house or by the stove.",
    ],
    size: 40,
    sleeps: 2,
    beds: "King bed under the eaves",
    where: "Larch wood, 4 min walk",
    outlook: "West through the trees to Piz Ravuna and Schwarzgrat",
    view: [66, 100],
    price: 540,
    image: {
      src: cabinForest,
      alt: "A red-brown timber cabin among snow-laden pines with steps cut into the snow",
    },
    gallery: [
      {
        src: winterForest,
        alt: "A small hut in a clearing of a frosted forest under blue sky",
      },
      { src: logs, alt: "Split firewood stacked against a stone wall" },
    ],
    features: [
      "Wood-fired outdoor tub",
      "Wood stove",
      "Breakfast basket",
      "Dogs welcome",
      "Lantern path to the house",
    ],
  },
  {
    id: "alp-hut",
    name: "Alp Hut",
    kind: "cabin",
    line: "A restored hay barn on the meadow above, twenty minutes up and a world away.",
    description: [
      "The old Maiensäss barn, where the herd stopped on its way to the high pasture. Now two bedrooms, a kitchen-parlour with a tiled stove and a bench outside that looks at the whole range at once.",
      "In summer you walk up; in winter we take your bags by snowmobile and lend you snowshoes. There is no road, no signal past the gate, and no reason to need either.",
    ],
    size: 62,
    sleeps: 5,
    beds: "Two doubles and a single bunk",
    where: "Sura meadow, 20 min walk",
    outlook: "The entire panorama, end to end",
    view: [0, 100],
    price: 690,
    image: {
      src: cabinAlp,
      alt: "A weathered timber barn on a steep meadow below golden autumn larches",
    },
    gallery: [
      {
        src: alp,
        alt: "A white farmhouse on a green alpine slope below rocky peaks",
      },
      { src: frozenLake, alt: "A snowshoer standing on a snow-covered lake" },
    ],
    features: [
      "Two bedrooms",
      "Kitchen-parlour with tiled stove",
      "Panorama bench",
      "Snowshoes and sledge",
      "Supplies delivered daily",
    ],
  },
];

/* ------------------------------------------------------------ booking extras */

export const board = [
  {
    id: "breakfast",
    label: "Bed and breakfast",
    note: "The breakfast table until 10:30, included in every rate.",
    price: 0,
  },
  {
    id: "half",
    label: "Half board",
    note: "Adds the five-course evening menu at Restaurant Teria.",
    price: 72,
  },
] as const;

export type Extra = {
  id: string;
  label: string;
  note: string;
  price: number;
  per: "stay" | "night" | "person";
};

export const extras: Extra[] = [
  {
    id: "transfer",
    label: "Station pick-up",
    note: "We meet the train at Teria Junction and drive you up.",
    price: 40,
    per: "stay",
  },
  {
    id: "sauna",
    label: "Private sauna hour",
    note: "The bathhouse to yourselves, 20:00–21:00 on your first evening.",
    price: 120,
    per: "stay",
  },
  {
    id: "picnic",
    label: "Hut lunch",
    note: "Bread, alp cheese, dried beef and a thermos, packed each morning.",
    price: 26,
    per: "person",
  },
  {
    id: "late",
    label: "Late check-out",
    note: "Keep the room until 15:00 on your last day.",
    price: 60,
    per: "stay",
  },
  {
    id: "dog",
    label: "Dog",
    note: "Cabins only. Bed, bowl and a towel by the door.",
    price: 30,
    per: "night",
  },
];

export const cityTax = 4.2;

export const policies = [
  "Free cancellation until 14 days before arrival; after that we charge the first night.",
  "Minimum stay of two nights, three over Christmas and New Year.",
  `Check-in from ${brand.checkIn}, check-out by ${brand.checkOut}.`,
  "Children under six stay free in their parents' room.",
];

/* ------------------------------------------------------------ dining */

export const dining = {
  intro:
    "We cook what the valley gives us and buy the rest from people we can name. Breakfast is long, lunch is a hut affair, and dinner comes in two rooms: the quiet one and the loud one.",
  venues: [
    {
      id: "teria",
      name: "Restaurant Teria",
      hours: "Dinner 18:30–21:30, Wednesday to Sunday",
      text: "Twenty-eight seats in the old dining hall, linen on the tables and the Teriahorn in the window. Five courses that change every Wednesday, built around one ingredient from the farm and one from the forest.",
      image: {
        src: dinner,
        alt: "Two shallow bowls of vegetables and a glass of white wine on a worn wooden table",
      } as Img,
    },
    {
      id: "stube",
      name: "The Stube",
      hours: "Daily 12:00–22:00",
      text: "The panelled tavern room where the village used to drink. Fondue on the stove, rösti in the pan and a long table where you will end up talking to strangers.",
      image: {
        src: tavern,
        alt: "A dark panelled tavern with set tables beneath a small bright window",
      } as Img,
    },
  ],
  tasting: {
    title: "This week at Teria",
    price: 98,
    note: "Five courses, 98 per person. Included with half board. Wine pairing 64.",
    courses: [
      {
        name: "Barley and smoked trout",
        detail:
          "Teria lake trout, cold-smoked over juniper; pearl barley, buttermilk, dill oil",
      },
      {
        name: "Beetroot from the Sura garden",
        detail: "Baked in hay, with sour cream, horseradish and toasted rye",
      },
      {
        name: "Capuns",
        detail:
          "Chard parcels of spätzli dough and air-dried beef, in a broth of mountain cheese",
      },
      {
        name: "Venison from the Val Teria hunt",
        detail:
          "Saddle, roasted on the bone; celeriac, lingonberry, juniper jus",
      },
      {
        name: "Stone pine and apple",
        detail: "Arve ice cream, brown-butter apple, oat crumble",
      },
    ],
  },
  stube: [
    {
      name: "Cheese fondue moitié-moitié",
      detail:
        "Alp Sura Gruyère-style and vacherin, kirsch, potatoes and bread (per person, for two or more)",
      price: 34,
    },
    {
      name: "Rösti with a fried egg",
      detail:
        "Crisp in butter, with Alp Sura cheese melted over and pickled onions",
      price: 26,
    },
    {
      name: "Pizokel",
      detail:
        "Buckwheat noodles, savoy cabbage, potatoes, sage butter and mountain cheese",
      price: 27,
    },
    {
      name: "Venison ragout with spätzli",
      detail: "Slow-cooked shoulder, red cabbage, chestnuts, cranberries",
      price: 38,
    },
    {
      name: "Barley soup",
      detail: "The Grisons way, with smoked bacon and root vegetables",
      price: 14,
    },
    {
      name: "Nut tart",
      detail: "Walnut and honey caramel in butter pastry, a jug of cream",
      price: 12,
    },
  ],
  breakfast: {
    hours: "07:30–10:30 in the dining hall, included in every stay",
    text: "Bread baked overnight in the wood oven, butter and soft cheese from the alp, yoghurt with stewed fruit, our own birchermüesli, eggs cooked to order and the honey of a beekeeper two villages down.",
    image: {
      src: breakfast,
      alt: "Plates of French toast with berries, a bowl of fruit and coffee on a wooden table",
    } as Img,
  },
  producers: [
    {
      name: "Alp Sura",
      what: "Cheese, butter and cream, made on the high pasture June to September",
    },
    {
      name: "Bacharia Caduff",
      what: "Air-dried beef and salsiz from the butcher in Arlen",
    },
    {
      name: "Ort da Teria",
      what: "Vegetables from the valley's last market garden, at 1,200 m",
    },
    {
      name: "Mulin Vegl",
      what: "Stone-ground barley and rye flour from the old mill at Sagogn",
    },
  ],
  images: {
    chef: {
      src: chef,
      alt: "A chef's hands placing garnish on a row of plates at the pass",
    } as Img,
    cheese: {
      src: cheese,
      alt: "Three wheels of aged mountain cheese, one cut, on a stone shelf",
    } as Img,
    fondue: {
      src: fondue,
      alt: "A red fondue pot of melted cheese with a basket of bread cubes",
    } as Img,
    kitchen: {
      src: kitchen,
      alt: "A chopping board, cast-iron pan, mortar and herbs laid out on dark wood",
    } as Img,
  },
};

/* ------------------------------------------------------------ bathhouse */

export const spa = {
  intro:
    "The bathhouse is a timber building at the edge of the larch wood: two saunas, a steam room, a hay bath and a relaxation room with one long window. Behind it, a path to the lake. Open to hotel guests every day.",
  hours:
    "Daily 15:00–21:00 · morning sauna 07:00–09:00 on Saturdays and Sundays",
  image: {
    src: sauna,
    alt: "Slatted pine headrests and a striped towel on a sauna bench",
  } as Img,
  lake: {
    src: lake,
    alt: "A turquoise mountain lake below a limestone ridge, reflecting the peaks",
  } as Img,
  fire: { src: fire, alt: "Logs burning brightly in a stone hearth" } as Img,
  rooms: [
    {
      name: "Finnish sauna",
      temp: "90 °C",
      text: "Wood-fired, with a window onto the larches. Infusions on the hour.",
    },
    {
      name: "Herbal sauna",
      temp: "60 °C",
      text: "Gentler and damper, over a bowl of hay flowers and mountain thyme.",
    },
    {
      name: "Stone steam room",
      temp: "45 °C",
      text: "Built of local gneiss. Eucalyptus and stone pine.",
    },
    {
      name: "Hay bath",
      temp: "38 °C",
      text: "You lie wrapped in warm, damp hay from the Sura meadow for twenty minutes. Strange, then wonderful.",
    },
    {
      name: "The lake",
      temp: "6–14 °C",
      text: "Lai Pitschen, sixty steps from the bathhouse door. In winter we cut a hole in the ice.",
    },
  ],
  infusions: [
    { time: "16:00", name: "Larch and orange", by: "Gion" },
    { time: "17:00", name: "Birch whisk", by: "Gion" },
    { time: "18:00", name: "Mountain pine and honey", by: "Mia" },
    {
      time: "19:00",
      name: "Snow infusion (winter) · Meadow hay (summer)",
      by: "Mia",
    },
    {
      time: "20:00",
      name: "Silent infusion, no talking, low light",
      by: "Mia",
    },
  ],
  treatments: [
    {
      name: "Stone pine oil massage",
      minutes: 60,
      price: 135,
      text: "Full body, slow and firm, with oil pressed from arve cones.",
    },
    {
      name: "Hay flower wrap",
      minutes: 45,
      price: 95,
      text: "A warm hay compress across the back and shoulders. For walkers' legs and skiers' knees.",
    },
    {
      name: "Arnica leg ritual",
      minutes: 30,
      price: 70,
      text: "Foot bath, scrub and a lymphatic leg massage with alpine arnica.",
    },
    {
      name: "Alpine herb facial",
      minutes: 60,
      price: 140,
      text: "Cleansing, steam and a mask of meadow herbs and alp whey.",
    },
    {
      name: "Private bathhouse hour",
      minutes: 60,
      price: 120,
      text: "The whole bathhouse to yourselves, 20:00–21:00, for two.",
    },
  ],
  rules: [
    {
      q: "Do I need to book?",
      a: "Not for the saunas and hay bath; just come down in the robe from your room. Treatments and the private hour are booked at reception or when you reserve your stay.",
    },
    {
      q: "Is the bathhouse textile-free?",
      a: "The saunas and steam room are textile-free, as is custom in the Alps. Wear a towel or sit on one. The relaxation room and the lake path are robes and swimwear.",
    },
    {
      q: "Can children come?",
      a: "Children under twelve are welcome with an adult from 15:00 to 17:00. After 17:00 the bathhouse is adults only.",
    },
    {
      q: "Is the lake plunge safe?",
      a: "There is a ladder, a rope and a bell. Never swim alone, never stay in longer than a minute in winter, and ring the bell if anything feels wrong; someone will come.",
    },
  ],
};

/* ------------------------------------------------------------ experiences */

export type Season = "summer" | "winter" | "all";

export type Experience = {
  id: string;
  title: string;
  season: Season;
  line: string;
  intro: string;
  duration: string;
  level: "Easy" | "Moderate" | "Demanding";
  guided: boolean;
  price: number;
  meet: string;
  group: string;
  image: Img;
  plan: { time: string; text: string }[];
  bring: string[];
};

export const seasonLabel: Record<Season, string> = {
  summer: "Summer",
  winter: "Winter",
  all: "All year",
};

export const experiences: Experience[] = [
  {
    id: "teriahorn-sunrise",
    title: "Sunrise on the Teriahorn shoulder",
    season: "summer",
    line: "Leave in the dark, reach the col at first light, be back for the end of breakfast.",
    intro:
      "Gion, our mountain guide, takes no more than six of you up the old smugglers' path to the Fuorcla Teria at 2,690 m. You watch the alpenglow run down the Teriahorn's north face, drink the coffee he carried up, and walk down through the waking alp.",
    duration: "5½ hours",
    level: "Moderate",
    guided: true,
    price: 85,
    meet: "04:15 at the boot room",
    group: "Up to 6",
    image: {
      src: summit,
      alt: "Walkers with backpacks climbing the last rocks of a grey summit ridge",
    },
    plan: [
      {
        time: "04:15",
        text: "Head torches on at the boot room. Tea in a flask, a slice of nut tart.",
      },
      {
        time: "05:40",
        text: "Pass the Sura alp huts as the cows wake. Last water before the col.",
      },
      {
        time: "06:20",
        text: "Fuorcla Teria. Sunrise, coffee, and the whole range turning pink.",
      },
      {
        time: "07:30",
        text: "Down through the meadow on the east path, past Lai Nair.",
      },
      {
        time: "09:45",
        text: "Back at the house. Breakfast is kept for you until 10:30.",
      },
    ],
    bring: [
      "Hiking boots",
      "Warm layer and gloves; it is near freezing at dawn",
      "Head torch (we lend them)",
    ],
  },
  {
    id: "alp-sura-cheese",
    title: "A morning at Alp Sura",
    season: "summer",
    line: "Make cheese with the alp family who supply our kitchen, then eat it.",
    intro:
      "Every summer the Bundi family move forty cows to the high pasture and make cheese twice a day in a copper kettle over a wood fire. You help with the morning batch, cut the curd, press a wheel with your initials scratched in the rind, and collect it in October or have it posted.",
    duration: "4 hours",
    level: "Easy",
    guided: true,
    price: 60,
    meet: "07:00 at reception",
    group: "Up to 8",
    image: {
      src: cheese,
      alt: "Three wheels of aged mountain cheese, one cut, on a stone shelf",
    },
    plan: [
      {
        time: "07:00",
        text: "Walk up through the larch wood to the alp, 45 minutes.",
      },
      {
        time: "08:00",
        text: "Milk warms in the kettle. Rennet, stirring, and a lot of waiting.",
      },
      {
        time: "09:30",
        text: "Cut and lift the curd in linen; press your wheel.",
      },
      {
        time: "10:30",
        text: "Second breakfast at the alp table: butter, whey, last year's cheese.",
      },
    ],
    bring: ["Shoes you don't mind getting wet", "An appetite"],
  },
  {
    id: "lai-nair-loop",
    title: "The Lai Nair lake loop",
    season: "summer",
    line: "Our favourite half-day walk, on your own, with a map we drew.",
    intro:
      "A marked circuit from the house to the black lake below Il Gobbo and back by the high path. We pack you a hut lunch, lend you the house map with every bench and spring marked, and tell you which rock is warmest for a swim.",
    duration: "3½ hours",
    level: "Easy",
    guided: false,
    price: 0,
    meet: "Whenever you like",
    group: "Self-guided",
    image: {
      src: lake,
      alt: "A turquoise mountain lake below a limestone ridge, reflecting the peaks",
    },
    plan: [
      {
        time: "0:00",
        text: "From the garden gate, follow the yellow signs for Lai Nair.",
      },
      {
        time: "1:20",
        text: "The lake. Swim from the flat rock on the north shore.",
      },
      {
        time: "2:00",
        text: "Climb 150 m to the high path; the best view of the Teriahorn on the route.",
      },
      {
        time: "3:30",
        text: "Down past the Alp Hut and back to the house for cake.",
      },
    ],
    bring: ["Walking shoes", "Swimming things", "The house map (at reception)"],
  },
  {
    id: "first-tracks",
    title: "First tracks ski tour",
    season: "winter",
    line: "Skins on at eight, a summit by noon, untracked powder all the way home.",
    intro:
      "A full day on touring skis with Gion to the top of Mot da la Neiv, choosing the line by the day's avalanche bulletin. You need to be comfortable skiing off-piste; we provide the touring kit, transceiver, shovel and probe.",
    duration: "6 hours",
    level: "Demanding",
    guided: true,
    price: 145,
    meet: "07:45 at the boot room",
    group: "Up to 4",
    image: {
      src: skitour,
      alt: "A ski tourer on a sunlit snow ridge above a deep valley of snowy peaks",
    },
    plan: [
      {
        time: "07:45",
        text: "Kit check and a transceiver drill in the garden.",
      },
      {
        time: "08:15",
        text: "Skins on from the door. The forest track to the treeline.",
      },
      {
        time: "11:30",
        text: "Summit of Mot da la Neiv, 2,951 m. Lunch in the lee of the cairn.",
      },
      {
        time: "12:15",
        text: "The north couloir or the east bowl, depending on the snow.",
      },
      {
        time: "14:00",
        text: "Ski to the bathhouse door. The sauna is already warm.",
      },
    ],
    bring: [
      "Ski clothing and goggles",
      "Your own boots if you have touring boots",
      "Sun cream; the light is fierce",
    ],
  },
  {
    id: "frozen-lake",
    title: "Snowshoes to the frozen lake",
    season: "winter",
    line: "A quiet afternoon in the snow, out to Lai Nair and back by lantern.",
    intro:
      "No experience needed: if you can walk, you can snowshoe. Mia leads a gentle climb to the frozen lake, stops for tracks in the snow (chamois, hare, the occasional fox) and brings you home as the lanterns come on along the path.",
    duration: "3 hours",
    level: "Easy",
    guided: true,
    price: 55,
    meet: "13:30 at the boot room",
    group: "Up to 10",
    image: {
      src: frozenLake,
      alt: "A snowshoer in a red jacket standing on a broad snow-covered lake",
    },
    plan: [
      { time: "13:30", text: "Snowshoes and poles fitted in the boot room." },
      {
        time: "14:00",
        text: "Up through the larch wood, reading tracks as we go.",
      },
      {
        time: "15:00",
        text: "Lai Nair under ice. Hot apple punch from a flask.",
      },
      {
        time: "16:30",
        text: "Back by lantern light, in time for the 17:00 infusion.",
      },
    ],
    bring: [
      "Warm waterproof boots",
      "Gloves and a hat",
      "We supply everything else",
    ],
  },
  {
    id: "last-gondola",
    title: "The last gondola to Mot Alv",
    season: "all",
    line: "Ride up at five, walk the ridge as the light goes, dinner waiting below.",
    intro:
      "The village gondola runs until 17:30. Take it to the top station with a glass of something cold from our bar, then walk (in summer) or sledge (in winter) the ridge path home while the peaks turn from white to pink to blue.",
    duration: "2½ hours",
    level: "Easy",
    guided: false,
    price: 38,
    meet: "16:45 at the valley station, 6 min walk",
    group: "Self-guided",
    image: {
      src: gondola,
      alt: "A red gondola cabin on its cable high above a forested valley",
    },
    plan: [
      {
        time: "17:00",
        text: "Gondola to Mot Alv, 2,455 m. A drink at the top from our basket.",
      },
      {
        time: "17:30",
        text: "The ridge path west, with the whole panorama at your shoulder.",
      },
      {
        time: "18:45",
        text: "Down the forest track to the house in time for dinner.",
      },
    ],
    bring: [
      "Warm layer",
      "Sledge in winter (ours, free)",
      "Head torch after September",
    ],
  },
];

/* ------------------------------------------------------------ journal */

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  author: string;
  minutes: number;
  image: Img;
  body: ({ p: string } | { h: string } | { q: string })[];
};

export const posts: Post[] = [
  {
    slug: "the-house-the-pass-built",
    title: "The house the pass built",
    dek: "Haven opened in 1898 for travellers waiting out the weather on the Teria pass. It has been waiting out weather ever since.",
    date: "2026-09-14",
    author: "Lea Caviezel",
    minutes: 6,
    image: {
      src: archive,
      alt: "A hand-coloured 1890s photochrom of a stone mountain inn on a rocky pass below snow peaks",
    },
    body: [
      {
        p: "Before the tunnel, the only way from Arlen to the south was over the Teria pass, and the only way over the pass was on foot or by mule. Travellers stopped at the last farm below the treeline to wait for a clear morning. In 1898 the farm's owner, a widow named Mengia Sutter, borrowed against her cattle and built them a house.",
      },
      {
        p: "She called it Haven because the guests did. The ledger from the first summer survives: forty-one names, nineteen of them English, most of them stuck for three days or more by fog. One wrote beside his signature, 'Would be stuck here again.'",
      },
      { h: "The quiet decades" },
      {
        p: "When the railway tunnel opened in 1931 the pass traffic stopped almost overnight. The house became a summer place for families from the lowlands, then a ski lodge with a rope tow, then, by 1974, nothing at all. It stood shuttered for thirty-nine years.",
      },
      {
        q: "We bought it with the shutters still closed. The ledger was on the reception desk, open at the last page.",
      },
      {
        p: "My brother Jon and I found it in 2013, walking the old pass path. We spent three years taking it apart board by board and putting it back. Every piece of panelling in the Stone Pine Room is original; every pane of glass in the dining hall is new, because the old ones did not keep out a single draught.",
      },
      { p: "The ledger is still on the desk. Sign it when you leave." },
    ],
  },
  {
    slug: "twelve-minutes-and-the-lake",
    title: "Twelve minutes, then the lake",
    dek: "Mia Casutt runs our bathhouse. Here is how she would like you to use it, and the one rule she will not bend.",
    date: "2026-08-02",
    author: "Mia Casutt",
    minutes: 4,
    image: {
      src: sauna,
      alt: "Slatted pine headrests and a striped towel on a sauna bench",
    },
    body: [
      {
        p: "People arrive at the bathhouse in a hurry. They have just come off the mountain, or out of a car, and they want to sweat it all out at once. Please don't. Start in the herbal sauna at sixty degrees for ten minutes. Shower. Sit. Only then the Finnish room.",
      },
      { h: "The rhythm" },
      {
        p: "Twelve minutes in the heat, then cold, then twenty minutes of rest, three times. That is the whole method. The cold can be the bucket shower, the snow, or the lake. The rest is in the long room with the window, with water and a blanket and nothing to read.",
      },
      {
        q: "You are not here to be hot. You are here to come back to room temperature slowly.",
      },
      {
        p: "The lake is sixty steps from the door and some guests never go in. Others go in every evening and write to us about it from home in February. Both are fine.",
      },
      {
        p: "The rule: no one goes into the lake alone. Ring the bell on the jetty and wait for someone to wave from the window. We always will.",
      },
    ],
  },
  {
    slug: "what-the-cheesemaker-knows",
    title: "What the cheesemaker knows about weather",
    dek: "Reto Bundi has spent thirty-one summers on Alp Sura. He reads the sky better than any forecast we can find.",
    date: "2026-07-09",
    author: "Jon Caviezel",
    minutes: 5,
    image: {
      src: cheese,
      alt: "Three wheels of aged mountain cheese, one cut, on a stone shelf",
    },
    body: [
      {
        p: "If you take the cheese morning at Alp Sura, you will meet Reto. He will be stirring a copper kettle the size of a bath, and he will tell you, unasked, what the weather will do for the next three days. He is usually right.",
      },
      { h: "Cows, swallows, and smoke" },
      {
        p: "When the cows lie down before noon, rain by evening. When the swallows fly low over the trough, the same. When the smoke from the cheese fire goes straight up, a clear night and a hard frost. None of this is folklore to Reto; it is just information, like the milk temperature.",
      },
      {
        p: "The cheese itself keeps a record of the summer. A dry year makes a harder, nuttier wheel; a wet one, softer and sweeter. In our kitchen we label the wheels by year, and in the Stube you can taste three summers side by side.",
      },
      {
        q: "The forecast is for people in the valley. Up here we have the animals.",
      },
      {
        p: "He asked us not to print his rule about thunderstorms. Ask him yourself.",
      },
    ],
  },
  {
    slug: "a-menu-written-from-the-cellar",
    title: "A winter menu written from the cellar",
    dek: "From November to April, nothing grows at 1,640 metres. Chef Anna Pfister on cooking from jars, barrels and smoke.",
    date: "2026-02-21",
    author: "Anna Pfister",
    minutes: 5,
    image: {
      src: kitchen,
      alt: "A chopping board, cast-iron pan, mortar and herbs laid out on dark wood",
    },
    body: [
      {
        p: "Our winter menu starts in August. That is when we fill the cellar: four hundred jars of beans, beets and plums; two barrels of sauerkraut; trout in the smokehouse; apples wrapped in newspaper; and the hay, which we use for almost everything.",
      },
      { h: "Cooking with hay" },
      {
        p: "Hay from the Sura meadow is full of flowers: thyme, clover, yarrow, wild caraway. We bake beetroot buried in it, smoke butter over it, infuse cream with it for the dessert. It tastes of July, which is exactly what you want in February.",
      },
      { q: "A winter kitchen is a summer kitchen with a good memory." },
      {
        p: "The only fresh things we buy in winter are dairy from the valley and game from the hunt. Everything else came down from the hill months before you did.",
      },
    ],
  },
  {
    slug: "how-to-read-the-panorama",
    title: "How to read a panorama table",
    dek: "The engraved brass plate on our terrace names every peak you can see. Here is how to use it, and why we put it online.",
    date: "2025-12-03",
    author: "Gion Darms",
    minutes: 3,
    image: {
      src: dawn,
      alt: "Jagged limestone peaks catching pink dawn light above a sea of cloud",
    },
    body: [
      {
        p: "Every viewpoint in the Alps worth the climb has one: a table of brass or enamel with the skyline drawn across it and every summit named, with its height. You stand behind it, line up the drawing with the real mountains, and the range turns from a wall of rock into a list of friends.",
      },
      { h: "Standing in the right place" },
      {
        p: "The trick is to put your eye where the engraver put his. On our terrace that is the worn spot on the flagstone directly behind the plate. From anywhere else the peaks slide out of line.",
      },
      {
        p: "We drew the same table for this website, and for every room we marked the part of the range its window frames. The Alp Hut sees all of it. The Larch Room sees Il Gobbo first thing, which is the best thing to see first thing.",
      },
      { q: "A mountain you can name is a mountain you will want to climb." },
    ],
  },
];

/* ------------------------------------------------------------ home */

export const home = {
  title: "A house at 1,640 metres, above Val Teria",
  lede: "Seven rooms, two suites and two cabins in an 1898 pass inn, with a wood-fired bathhouse, a kitchen that cooks from the valley and a panorama of eight peaks from every window.",
  letter: {
    heading: "We kept the ledger and the view, and changed everything else",
    text: [
      "Haven was built for travellers stuck by fog on the Teria pass. We found it shuttered in 2013 and spent three years putting it back together, board by board.",
      "It is still a small house. Twenty-two beds, one long breakfast table, one bathhouse, a boot room that smells of wax and wet wool. We would like you to arrive tired and leave slower.",
    ],
    signed: "Lea and Jon Caviezel, your hosts",
  },
  quote: {
    text: "We came for three nights and stayed nine. On the last morning the Teriahorn went pink at the window and neither of us said a word.",
    by: "From the guest ledger, February 2026",
  },
  close: {
    heading: "The valley is quieter than you remember",
    text: "Winter runs from 12 December to 6 April, summer from 5 June to 25 October. Between them we close, mend, and fill the cellar.",
    image: {
      src: dawn,
      alt: "Jagged limestone peaks catching pink dawn light above a sea of cloud",
    } as Img,
  },
  seasons: {
    summer: {
      src: hikers,
      alt: "Two walkers on a steep forested slope wrapped in drifting cloud",
    } as Img,
    winter: {
      src: skitour,
      alt: "A ski tourer on a sunlit snow ridge above a deep valley",
    } as Img,
  },
};

/* ------------------------------------------------------------ about */

export const about = {
  title:
    "An 1898 pass inn, reopened by two siblings who could not walk past it",
  lede: "Haven was built for travellers. It is still run like that: small, warm, a little stubborn about the details.",
  image: {
    src: archive,
    alt: "A hand-coloured 1890s photochrom of a stone mountain inn on a rocky pass below snow peaks",
  } as Img,
  imageCaption:
    "An alpine pass inn in a hand-coloured photochrom of the 1890s, the kind of house Haven was built to be.",
  timeline: [
    {
      year: "1898",
      text: "Mengia Sutter builds an inn at the last farm below the Teria pass. Forty-one guests sign the ledger in the first summer.",
    },
    {
      year: "1931",
      text: "The railway tunnel opens. Pass traffic stops; the house becomes a summer retreat for lowland families.",
    },
    {
      year: "1962",
      text: "A rope tow on the Sura meadow, and the house's first winter season.",
    },
    {
      year: "1974",
      text: "The last guest signs the ledger. The shutters close.",
    },
    {
      year: "2013",
      text: "Lea and Jon Caviezel find it on a walk over the old pass, and buy it within the year.",
    },
    {
      year: "2016",
      text: "Haven reopens with eleven rooms, the Stube and a new bathhouse in the larch wood.",
    },
    {
      year: "2023",
      text: "The Sura hay barn is restored as the Alp Hut. Heating switches fully to wood chips from the valley's own forest.",
    },
  ],
  values: [
    {
      title: "Heat from the forest",
      text: "A wood-chip boiler fed by thinning from the communal forest heats the house, the bathhouse and the water. No oil since 2023.",
    },
    {
      title: "Food we can trace",
      text: "Ninety per cent of what we cook comes from within forty kilometres. The rest is coffee, chocolate, salt and lemons.",
    },
    {
      title: "Staff who stay",
      text: "Twenty-three people work here, eighteen of them year-round. We close twice a year so that all of us get a proper holiday.",
    },
  ],
  team: [
    {
      name: "Lea Caviezel",
      role: "Host and co-owner",
      text: "Ex-architect. Redrew the house twice and kept the stairs.",
    },
    {
      name: "Jon Caviezel",
      role: "Host and co-owner",
      text: "Runs the front of house, the cellar, and the Sunday quiz.",
    },
    {
      name: "Anna Pfister",
      role: "Chef",
      text: "Came for one winter in 2017. Has written every menu since.",
    },
    {
      name: "Mia Casutt",
      role: "Bathhouse",
      text: "Sauna master, hay-bath evangelist, keeper of the lake bell.",
    },
    {
      name: "Gion Darms",
      role: "Mountain guide",
      text: "IFMGA guide born in Arlen. Knows every path and most of the chamois.",
    },
  ],
  photo: {
    src: valley,
    alt: "Low sun filtering into a snowy alpine valley with a single hut on the valley floor",
  } as Img,
};

/* ------------------------------------------------------------ plan your stay */

export const plan = {
  title: "Plan your stay",
  lede: "How to get up the valley, when we are open, and what to pack. Anything else, write to us; a person answers, usually within the day.",
  arrive: [
    {
      mode: "By train",
      text: "Hourly trains to Teria Junction, then the valley bus to Arlen (22 min) or our pick-up from the station (book it with your stay). From the city, about three hours with one change.",
    },
    {
      mode: "By car",
      text: "Via the valley road from Teria Junction, 18 km. Snow chains required December to March. Parking in the house garage, 18 a night; charging for two electric cars.",
    },
    {
      mode: "On foot",
      text: "The old pass path from Sagogn, 14 km with 900 m of ascent. We will bring your luggage up by car if you send it ahead.",
    },
  ],
  seasonsText:
    "Winter season 12 December – 6 April. Summer season 5 June – 25 October. Closed in between for maintenance and staff holidays.",
  pack: [
    "Proper walking boots in every season",
    "A warm layer, even in August",
    "Swimwear for the bathhouse relaxation room and lake",
    "Slippers are provided; robes are in your room",
  ],
  faq: [
    {
      q: "Is breakfast included?",
      a: "Yes, in every rate. Half board adds the five-course dinner at Restaurant Teria for 72 per person per night.",
    },
    {
      q: "Do you allow dogs?",
      a: "In the Forest Cabin and the Alp Hut, yes, for 30 a night. Not in the main house, because of guests with allergies.",
    },
    {
      q: "Is there Wi-Fi?",
      a: "In the main house and the bathhouse, yes. In the cabins, the Forest Cabin has a weak signal; the Alp Hut has none, deliberately.",
    },
    {
      q: "Are you suitable for children?",
      a: "Very. The Gable Suite and Alp Hut sleep families comfortably, children under six stay free, and the boot room has sledges for everyone.",
    },
    {
      q: "Can I book a table without staying?",
      a: `Yes, Restaurant Teria and the Stube are open to everyone. Reserve by phone on ${brand.phone} or by email.`,
    },
    {
      q: "Is the house accessible?",
      a: "The ground floor, the Stube Suite, the dining hall and the bathhouse have step-free access, and the Stube Suite has a roll-in shower. The upper floors have no lift.",
    },
    {
      q: "What is the cancellation policy?",
      a: "Free until 14 days before arrival. After that we charge the first night, unless we can re-let the room, in which case we refund it.",
    },
  ],
  map: {
    src: winterForest,
    alt: "A small hut in a clearing of a frosted forest under blue sky",
  } as Img,
};

/* ------------------------------------------------------------ footer */

export const footer = {
  note: "Letters from the valley: four a year, at the turn of each season. Opening dates, the new menu, and the first snow.",
  columns: [
    {
      heading: "Stay",
      links: [
        { to: "/rooms", label: "Rooms and cabins" },
        { to: "/book", label: "Check availability" },
        { to: "/plan", label: "Plan your stay" },
      ],
    },
    {
      heading: "The house",
      links: [
        { to: "/dining", label: "Dining" },
        { to: "/spa", label: "Bathhouse" },
        { to: "/experiences", label: "Experiences" },
      ],
    },
    {
      heading: "Read",
      links: [
        { to: "/journal", label: "Journal" },
        { to: "/about", label: "Our story" },
      ],
    },
  ],
};
