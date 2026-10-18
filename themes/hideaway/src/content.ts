import talaiaPool from "./assets/talaia-pool.jpg";
import talaiaTerrace from "./assets/talaia-terrace.jpg";
import talaiaCliff from "./assets/talaia-cliff.jpg";
import estelCourtyard from "./assets/estel-courtyard.jpg";
import estelOlives from "./assets/estel-olives.jpg";
import estelBarn from "./assets/estel-barn.jpg";
import moliHouse from "./assets/moli-house.jpg";
import moliBalcony from "./assets/moli-balcony.jpg";
import moliCove from "./assets/moli-cove.jpg";
import rosaStreet from "./assets/rosa-street.jpg";
import rosaFacade from "./assets/rosa-facade.jpg";
import rosaTown from "./assets/rosa-town.jpg";
import pinsPool from "./assets/pins-pool.jpg";
import pinsPath from "./assets/pins-path.jpg";
import pinsHammock from "./assets/pins-hammock.jpg";
import turoPool from "./assets/turo-pool.jpg";
import turoSunset from "./assets/turo-sunset.jpg";
import turoCoast from "./assets/turo-coast.jpg";
import casetaTerrace from "./assets/caseta-terrace.jpg";
import casetaCove from "./assets/caseta-cove.jpg";
import casetaRocks from "./assets/caseta-rocks.jpg";
import sonvellTerraces from "./assets/sonvell-terraces.jpg";
import sonvellPaddock from "./assets/sonvell-paddock.jpg";
import sonvellRoad from "./assets/sonvell-road.jpg";
import guideMorella from "./assets/guide-morella.jpg";
import guideBlava from "./assets/guide-blava.jpg";
import guideVermella from "./assets/guide-vermella.jpg";
import guideRonda from "./assets/guide-ronda.jpg";
import guideFar from "./assets/guide-far.jpg";
import guideMarket from "./assets/guide-market.jpg";
import guidePont from "./assets/guide-pont.jpg";
import guideSerra from "./assets/guide-serra.jpg";
import guidePort from "./assets/guide-port.jpg";
import moon from "./assets/moon.jpg";
import conciergeBoat from "./assets/concierge-boat.jpg";
import conciergeChef from "./assets/concierge-chef.jpg";
import conciergeBreakfast from "./assets/concierge-breakfast.jpg";
import conciergeBikes from "./assets/concierge-bikes.jpg";
import aboutFields from "./assets/about-fields.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Hideaway",
  island: "Vellmar",
  tagline: "Eight houses on Vellmar, and the people who keep their keys.",
  email: "stay@hideaway.example",
  phone: "+1 555 0187 220",
  phoneHref: "tel:+15550187220",
  office: ["Carrer del Port 14", "Santa Arnella, Vellmar"],
  officeHours: "Every day 08:30 – 20:00, island time",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/villas", label: "Villas" },
  { to: "/guide", label: "Island guide" },
  { to: "/concierge", label: "Concierge" },
  { to: "/good-to-know", label: "Good to know" },
  { to: "/about", label: "About us" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Stay",
    links: [
      { to: "/villas", label: "All villas" },
      { to: "/book", label: "Book a stay" },
      { to: "/good-to-know", label: "Good to know" },
    ],
  },
  {
    title: "The island",
    links: [
      { to: "/guide", label: "Island guide" },
      { to: "/concierge", label: "Concierge" },
      { to: "/about", label: "About Hideaway" },
    ],
  },
];

export const newsletter = {
  title: "The late-availability letter",
  text: "When a week opens up because someone cancels, it goes to this list first. Four or five letters a year, never more.",
};

/* ------------------------------------------------------------ seasons & money */

export type Season = "low" | "mid" | "high" | "peak";

export const seasons: Record<
  Season,
  { label: string; minNights: number; note: string }
> = {
  low: {
    label: "Winter",
    minNights: 3,
    note: "Three-night minimum, any arrival day.",
  },
  mid: {
    label: "Shoulder",
    minNights: 4,
    note: "Four-night minimum, any arrival day.",
  },
  high: {
    label: "Summer",
    minNights: 5,
    note: "Five-night minimum, any arrival day.",
  },
  peak: {
    label: "High summer",
    minNights: 7,
    note: "Seven nights, Saturday to Saturday.",
  },
};

/** Season of each month, January first. */
export const monthSeason: Season[] = [
  "low",
  "low",
  "low",
  "mid",
  "mid",
  "high",
  "peak",
  "peak",
  "high",
  "mid",
  "low",
  "low",
];

/** Tourist tax per adult (16+) per night, collected for the island council. */
export const touristTax = 2.2;
export const depositShare = 0.3;

export const months = [
  {
    name: "Jan",
    sea: 14,
    air: 15,
    note: "Almond blossom, empty coves, log fires.",
  },
  {
    name: "Feb",
    sea: 13,
    air: 15,
    note: "The quietest month. Walkers' weather.",
  },
  {
    name: "Mar",
    sea: 14,
    air: 17,
    note: "Wild asparagus season in the Serra.",
  },
  {
    name: "Apr",
    sea: 15,
    air: 19,
    note: "Fields green, the ring path at its best.",
  },
  {
    name: "May",
    sea: 18,
    air: 23,
    note: "First swims, long lunches, few cars.",
  },
  {
    name: "Jun",
    sea: 21,
    air: 27,
    note: "Sant Joan horses in Llucmar on the 23rd.",
  },
  {
    name: "Jul",
    sea: 24,
    air: 30,
    note: "Busy coves before ten, perfect after six.",
  },
  {
    name: "Aug",
    sea: 26,
    air: 31,
    note: "Warmest sea; book the boat days early.",
  },
  {
    name: "Sep",
    sea: 24,
    air: 28,
    note: "Our favourite. The sea holds the summer.",
  },
  {
    name: "Oct",
    sea: 21,
    air: 24,
    note: "Harvest at the vineyards, mushrooms after rain.",
  },
  {
    name: "Nov",
    sea: 18,
    air: 19,
    note: "Storms and calm, often on the same day.",
  },
  {
    name: "Dec",
    sea: 15,
    air: 16,
    note: "Quiet harbours and the Christmas market.",
  },
];

/* ------------------------------------------------------------ villas */

export type Coast = "south" | "west" | "north" | "inland";

export const coasts: Record<Coast, { label: string; text: string }> = {
  south: {
    label: "South coves",
    text: "Pale limestone, pine woods and the turquoise calas. Sheltered from the north wind, calm for swimming most days.",
  },
  west: {
    label: "West & Santa Arnella",
    text: "The harbour town, the sunsets and the headland. Restaurants within a walk, the ferry in ten minutes.",
  },
  north: {
    label: "North shore",
    text: "Red rock, wild beaches and the lighthouse. Windier, emptier, the island at its most dramatic.",
  },
  inland: {
    label: "Inland & the Serra",
    text: "Olive groves, dry-stone walls and farm roads. Fifteen minutes to either coast, the stars to yourself.",
  },
};

export type Feature =
  | "pool"
  | "beach-walk"
  | "village-walk"
  | "step-free"
  | "sea-view"
  | "child-safe-pool";

export const featureLabels: Record<Feature, string> = {
  pool: "Private pool",
  "beach-walk": "Walk to a beach",
  "village-walk": "Walk to a village",
  "step-free": "Step-free ground floor",
  "sea-view": "Sea view",
  "child-safe-pool": "Pool fence or cover",
};

export type Photo = { src: string; alt: string; caption: string };

export type Villa = {
  slug: string;
  name: string;
  /** Short line shown on cards. */
  line: string;
  coast: Coast;
  place: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  rates: Record<Season, number>;
  cleaning: number;
  securityDeposit: number;
  features: Feature[];
  pool: string | null;
  distances: { label: string; value: string }[];
  summary: string;
  story: string[];
  rooms: { name: string; beds: string; note?: string }[];
  amenities: string[];
  houseBook: { title: string; text: string }[];
  photos: Photo[];
  map: { x: number; y: number };
  /** Seed for the demo booking pattern in the availability calendar. */
  seed: number;
};

export const villas: Villa[] = [
  {
    slug: "sa-talaia",
    name: "Sa Talaia",
    line: "A watchtower house on the western headland, pool hung over the sea.",
    coast: "west",
    place: "Cap d'Arnella headland, 2 km from Santa Arnella",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 4,
    rates: { low: 420, mid: 640, high: 890, peak: 1180 },
    cleaning: 280,
    securityDeposit: 1500,
    features: ["pool", "sea-view", "step-free"],
    pool: "14 × 4 m saltwater, infinity edge, heated April to October",
    distances: [
      { label: "Santa Arnella harbour", value: "6 min drive · 25 min walk" },
      { label: "Nearest swim", value: "Rock platform, 4 min down the path" },
      { label: "Airport", value: "35 min" },
    ],
    summary:
      "Built in 1971 around the stump of a sixteenth-century lookout, Sa Talaia faces due west across open water. Every bedroom sees the sunset; the pool edge disappears into it.",
    story: [
      "The original talaia was one of eleven stone towers that ringed Vellmar, each in sight of the next, lighting fires when sails appeared. Its base is now the house's library, walls a metre thick and cool on the hottest afternoon.",
      "The rest is low and white and mostly terrace. A long pergola of reed and juniper shades the outdoor table for twelve, and the pool runs the full width of the garden so the swim and the horizon line up.",
      "It is a house for slow days: breakfast in the east courtyard, a swim off the rocks before lunch, and the evening on the tower roof with whatever Toni has left chilling in the outdoor fridge.",
    ],
    rooms: [
      {
        name: "Tower suite",
        beds: "Super-king",
        note: "Own terrace, bath facing the sea",
      },
      { name: "West room", beds: "King", note: "Doors to the pool" },
      { name: "Courtyard room", beds: "Two singles or a king" },
      {
        name: "Garden room",
        beds: "Two singles",
        note: "Step-free, walk-in shower",
      },
    ],
    amenities: [
      "Air conditioning in all bedrooms",
      "Outdoor kitchen with wood-fired oven",
      "Fibre wifi, 600 Mb",
      "Tower roof terrace",
      "Outdoor shower",
      "Washing machine and dryer",
      "Parking for three cars",
      "Weekly linen change, mid-stay clean",
    ],
    houseBook: [
      {
        title: "The shutters",
        text: "Close the west shutters at two in summer and open them again at seven. The house stays cool without air conditioning most days.",
      },
      {
        title: "Bread",
        text: "Forn Can Moll in Santa Arnella opens at seven. Ask for the pa de pagès; it keeps for three days.",
      },
      {
        title: "The path down",
        text: "The gate at the bottom of the garden leads to the rock platform. Use the ladder, not the slope, after rain.",
      },
    ],
    photos: [
      {
        src: talaiaPool,
        alt: "A swimmer at the infinity edge of a pool looking out over an open, calm sea",
        caption: "The pool edge at nine in the morning",
      },
      {
        src: talaiaTerrace,
        alt: "Two wooden chairs on a whitewashed terrace with bougainvillea and a view of the sea",
        caption: "The tower roof terrace",
      },
      {
        src: talaiaCliff,
        alt: "White houses stepping down a cliff above a deep blue bay",
        caption: "Looking south along the headland",
      },
    ],
    map: { x: 9, y: 47 },
    seed: 11,
  },
  {
    slug: "can-estel",
    name: "Ca'n Estel",
    line: "A restored farmhouse among olives, with a courtyard of arches and a pool lit by stars.",
    coast: "inland",
    place: "Camí de Sa Plana, 3 km from Llucmar",
    sleeps: 10,
    bedrooms: 5,
    bathrooms: 5,
    rates: { low: 380, mid: 560, high: 790, peak: 1050 },
    cleaning: 320,
    securityDeposit: 1500,
    features: ["pool", "step-free", "child-safe-pool"],
    pool: "12 × 5 m chlorine-free, with a removable safety fence and a shallow step",
    distances: [
      { label: "Llucmar market square", value: "6 min drive" },
      { label: "Cala Blava", value: "18 min drive" },
      { label: "Airport", value: "20 min" },
    ],
    summary:
      "The Pons family farmed here for two centuries. The house kept its thick walls, the arched porch and the threshing floor; it gained a pool, five bathrooms and a kitchen built for long tables.",
    story: [
      "Ca'n Estel sits in three hectares of olive trees enclosed by dry-stone walls, some of them older than the house. At night the nearest electric light is a farm two fields away, so the stars over the pool earn the name.",
      "The porch of three arches faces south and holds the outdoor sofas; the old stable is now a games room with a ping-pong table, a piano and the best wifi signal on the property.",
      "It is the house we suggest to families who want to spread out: five bedrooms on two levels, a fenced pool with a shallow step, and room for children to run without anyone hearing the shriek.",
    ],
    rooms: [
      {
        name: "The old granary",
        beds: "Super-king",
        note: "Exposed beams, bath and walk-in shower",
      },
      {
        name: "Porch room",
        beds: "King",
        note: "Step-free, opens onto the courtyard",
      },
      { name: "Olive room", beds: "King" },
      {
        name: "Bunk room",
        beds: "Two sets of bunks",
        note: "Sleeps four children",
      },
      { name: "Stable loft", beds: "Two singles" },
    ],
    amenities: [
      "Air conditioning and ceiling fans",
      "Professional six-burner range",
      "Games room in the old stable",
      "Upright piano",
      "Cots, high chairs and stair gates on request",
      "Barbecue and outdoor dining for fourteen",
      "Starlink and fibre wifi",
      "Parking for four cars",
    ],
    houseBook: [
      {
        title: "The well",
        text: "The water in the courtyard well is for the garden only. Drinking water comes in five-litre bottles; we leave twelve in the pantry.",
      },
      {
        title: "Olive oil",
        text: "The oil in the kitchen is from these trees, pressed in November at the cooperative in Llucmar. Take a bottle home.",
      },
      {
        title: "Dark skies",
        text: "Turn off the courtyard lights at the switch by the kitchen door and give your eyes ten minutes. The Milky Way rises over the south wall.",
      },
    ],
    photos: [
      {
        src: estelCourtyard,
        alt: "A whitewashed farmhouse at night with a lit arched porch and an oval pool reflecting the arches",
        caption: "The pool and the porch of three arches",
      },
      {
        src: estelOlives,
        alt: "Twisted old olive trees in a grove bounded by low dry-stone walls",
        caption: "The olive grove at sunrise",
      },
      {
        src: estelBarn,
        alt: "Stone wall and heavy timber roof beams with copper pendant lamps",
        caption: "Beams in the old stable",
      },
    ],
    map: { x: 44, y: 58 },
    seed: 23,
  },
  {
    slug: "es-moli-blanc",
    name: "Es Molí Blanc",
    line: "White cubes stacked above Cala Blava, six minutes on foot to the water.",
    coast: "south",
    place: "Above Cala Blava, south coast",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 3,
    rates: { low: 320, mid: 480, high: 690, peak: 920 },
    cleaning: 220,
    securityDeposit: 1000,
    features: ["pool", "beach-walk", "sea-view"],
    pool: "6 × 3 m plunge pool, salt, on the lower terrace",
    distances: [
      { label: "Cala Blava", value: "6 min walk down the steps" },
      { label: "Sant Climent bakery", value: "8 min drive" },
      { label: "Airport", value: "25 min" },
    ],
    summary:
      "An architect's house from 1988, built in the island's whitewash vernacular: rounded parapets, deep doorways, rooms that turn their backs on the afternoon sun and their faces to the cove.",
    story: [
      "The house takes its name from the windmill base that stands at the top of the plot. The rest is a staircase of terraces, each one a room of its own: breakfast at the top, the plunge pool in the middle, a shaded day bed at the bottom.",
      "Inside, everything is limewashed, linen or local stone. There is no television; there is a record player, a shelf of island novels and a telescope pointed at the bay.",
      "The path to Cala Blava starts at the bottom gate. Go early and you will share the cove with the fishermen checking their pots.",
    ],
    rooms: [
      { name: "Bay room", beds: "King", note: "Sea view from the bed" },
      {
        name: "Windmill room",
        beds: "Queen",
        note: "Round walls, own terrace",
      },
      { name: "Patio room", beds: "Two singles" },
    ],
    amenities: [
      "Air conditioning in bedrooms",
      "Record player and records",
      "Telescope",
      "Beach towels, umbrella and snorkels",
      "Fibre wifi",
      "Washing machine",
      "Parking for two cars",
    ],
    houseBook: [
      {
        title: "The steps",
        text: "There are 112 of them to the cove. Count them on the way up; it helps.",
      },
      {
        title: "Wind",
        text: "When the tramuntana blows from the north the south coves are glass. Those are the days to swim to the point.",
      },
      {
        title: "Fish",
        text: "Rafel sells the morning catch from his van in the Cala Blava car park on Tuesdays and Fridays from nine.",
      },
    ],
    photos: [
      {
        src: moliHouse,
        alt: "Rounded whitewashed walls and doorways stepping down to a pool terrace above a bay",
        caption: "The terraces and plunge pool",
      },
      {
        src: moliBalcony,
        alt: "A white balustrade with lanterns and flowers above the sea at dusk",
        caption: "The breakfast terrace",
      },
      {
        src: moliCove,
        alt: "Turquoise water over pale sand in a cove ringed by pine trees",
        caption: "Cala Blava, six minutes away",
      },
    ],
    map: { x: 40, y: 75 },
    seed: 37,
  },
  {
    slug: "casa-rosa",
    name: "Casa Rosa",
    line: "A townhouse in the old port, roof terrace over the rooftops and three minutes to the harbour.",
    coast: "west",
    place: "Carrer de Sa Rosa, old town of Santa Arnella",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    rates: { low: 190, mid: 260, high: 380, peak: 490 },
    cleaning: 160,
    securityDeposit: 500,
    features: ["village-walk", "sea-view"],
    pool: null,
    distances: [
      { label: "Harbour and restaurants", value: "3 min walk" },
      { label: "Town beach", value: "9 min walk" },
      { label: "Ferry terminal", value: "12 min walk" },
    ],
    summary:
      "Three narrow floors, a bougainvillea older than anyone on the street, and a roof terrace from which you can watch the ferry come in. The house for people who want to walk to dinner.",
    story: [
      "Casa Rosa was a sailmaker's house; the long room on the ground floor, now the kitchen, is where the canvas was cut. The street is car-free after eleven in the morning, and the house stays cool behind its green shutters.",
      "Upstairs are two bedrooms and a bathroom; the third bedroom and the second bathroom share the top floor with the roof terrace, an outdoor shower and a table for six under a canvas awning.",
      "No pool, no garden, no car needed. You have the whole of Santa Arnella instead: the fish market at eight, the harbour bars at seven, and the sunset from the town walls.",
    ],
    rooms: [
      {
        name: "Shutter room",
        beds: "King",
        note: "Juliet balcony onto the street",
      },
      { name: "Sailmaker's room", beds: "Queen" },
      {
        name: "Roof room",
        beds: "Two singles",
        note: "Opens onto the roof terrace",
      },
    ],
    amenities: [
      "Air conditioning throughout",
      "Roof terrace with outdoor shower",
      "Fibre wifi",
      "Bicycles for two",
      "Washing machine",
      "Resident parking permit for one car",
    ],
    houseBook: [
      {
        title: "The street",
        text: "Deliveries only before eleven. If you rent a car, leave it at the Ponent car park; the permit is in the kitchen drawer.",
      },
      {
        title: "Market",
        text: "The fish market opens at eight and the best of it is gone by half past nine. Bring a bag; they still wrap in paper.",
      },
      {
        title: "Bells",
        text: "Santa Maria rings the hours from eight until ten at night. The guests who mind it on the first day miss it by the last.",
      },
    ],
    photos: [
      {
        src: rosaStreet,
        alt: "A white house with red shutters and a cascade of red bougainvillea in a sunny street",
        caption: "The street front in June",
      },
      {
        src: rosaFacade,
        alt: "A white building with blue shutters and balconies against a clear sky",
        caption: "Shutters and balconies on Carrer de Sa Rosa",
      },
      {
        src: rosaTown,
        alt: "A hillside town of pale houses above a sandy beach with umbrellas",
        caption: "Santa Arnella from the town walls",
      },
    ],
    map: { x: 14, y: 57 },
    seed: 41,
  },
  {
    slug: "mirador-des-pins",
    name: "Mirador des Pins",
    line: "A house in the pine woods above Cala Morella, the ring path from the garden gate.",
    coast: "south",
    place: "Pine woods above Cala Morella, south coast",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 4,
    rates: { low: 360, mid: 540, high: 760, peak: 1010 },
    cleaning: 260,
    securityDeposit: 1500,
    features: ["pool", "beach-walk", "sea-view", "child-safe-pool"],
    pool: "11 × 4 m infinity edge, with a locking safety cover",
    distances: [
      { label: "Cala Morella", value: "12 min walk on the ring path" },
      { label: "Sant Climent", value: "10 min drive" },
      { label: "Airport", value: "30 min" },
    ],
    summary:
      "Glass and stone in a clearing of Aleppo pines. The pool runs to the edge of the trees, the sea shows through the trunks, and the only neighbours are the hoopoes.",
    story: [
      "The house was built in 2016 on the footprint of a charcoal burner's hut, and almost nothing was cut to make room for it. The pines shade the terraces through the afternoon and smell of resin when the sun is on them.",
      "Four bedrooms open to their own decks. The living room is one long glass wall that folds away, so from June to September the house is really one large covered terrace with a kitchen at one end.",
      "The ring path, the old coastguard trail that circles the island, passes the bottom gate. Turn left for Cala Morella, right for the cliffs and the best sunrise on the south coast.",
    ],
    rooms: [
      {
        name: "Pine suite",
        beds: "Super-king",
        note: "Outdoor bath on the deck",
      },
      { name: "East room", beds: "King" },
      { name: "West room", beds: "King" },
      {
        name: "Treehouse room",
        beds: "Two singles",
        note: "Up its own spiral stair",
      },
    ],
    amenities: [
      "Air conditioning and underfloor heating",
      "Folding glass living-room wall",
      "Hammocks in the pines",
      "Outdoor kitchen and barbecue",
      "Fibre wifi",
      "Washing machine and dryer",
      "Charging point for an electric car",
    ],
    houseBook: [
      {
        title: "Hoopoes",
        text: "The pair with the crests nest in the old pine by the pool. They come down to the lawn at about eight in the morning.",
      },
      {
        title: "Fire",
        text: "No barbecues or candles outside when the fire-risk flag at the gate is red. The gas plancha in the outdoor kitchen is always allowed.",
      },
      {
        title: "Sunrise",
        text: "Turn right on the ring path and walk twenty minutes to the cliff bench. Leave at 06:30 in July.",
      },
    ],
    photos: [
      {
        src: pinsPool,
        alt: "A swimmer raising her arms at the edge of an infinity pool facing a wooded hillside",
        caption: "The pool at the edge of the pines",
      },
      {
        src: pinsPath,
        alt: "Pine trees leaning over a rocky path above a turquoise cove",
        caption: "The ring path below the house",
      },
      {
        src: pinsHammock,
        alt: "A woman in a straw hat reading on a hammock in the shade",
        caption: "Hammocks in the pine wood",
      },
    ],
    map: { x: 28, y: 71 },
    seed: 53,
  },
  {
    slug: "es-turo",
    name: "Es Turó",
    line: "A hilltop house for two couples, a round pool and the whole north shore below.",
    coast: "north",
    place: "Turó de Tramuntana, above Platja Vermella",
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 2,
    rates: { low: 240, mid: 360, high: 520, peak: 690 },
    cleaning: 180,
    securityDeposit: 1000,
    features: ["pool", "sea-view"],
    pool: "Round 9 m infinity pool, heated, lit at night",
    distances: [
      { label: "Platja Vermella", value: "10 min drive · 35 min walk" },
      { label: "Far de Tramuntana", value: "20 min drive" },
      { label: "Airport", value: "30 min" },
    ],
    summary:
      "Two bedrooms, one great room and a round pool on the highest private plot on the north shore. You can see the lighthouse, the red beaches and, on clear days, the mountains of the mainland.",
    story: [
      "Es Turó is our smallest house with a pool and the one guests rebook most. Its two bedroom suites sit at either end of the plan, each with its own terrace, so two couples can share a week without sharing a wall.",
      "The north shore is the wild side of Vellmar: red sandstone, few roads, beaches you reach on foot. The house is the comfortable base for it, with a deep sofa, a log stove for the cooler months and a pool that holds its heat into October.",
      "When the north wind blows, the shore is loud and white and magnificent, and the pool terrace is sheltered behind the house. On still days the sea below is so clear you can count the boats' anchor chains.",
    ],
    rooms: [
      {
        name: "Sunrise suite",
        beds: "King",
        note: "Own terrace, bath and shower",
      },
      {
        name: "Sunset suite",
        beds: "King or two singles",
        note: "Own terrace, walk-in shower",
      },
    ],
    amenities: [
      "Air conditioning and log stove",
      "Heated pool, lit at night",
      "Binoculars and a star chart",
      "Fibre wifi",
      "Washing machine",
      "Parking for two cars",
    ],
    houseBook: [
      {
        title: "The road up",
        text: "The last 600 metres are unpaved. Drive slowly and keep left at the carob tree.",
      },
      {
        title: "North wind",
        text: "If the tramuntana is forecast above 40 km/h, lower the parasols and stack the cushions in the pool house.",
      },
      {
        title: "Red beaches",
        text: "Platja Vermella is best before eleven. Bring water and shoes for the rocks; there is no kiosk.",
      },
    ],
    photos: [
      {
        src: turoPool,
        alt: "A round infinity pool with blue tiles above green hills and a bay of islands",
        caption: "The round pool",
      },
      {
        src: turoSunset,
        alt: "The sun setting over the sea between dark mountain ridges",
        caption: "Sunset over the north shore",
      },
      {
        src: turoCoast,
        alt: "Pine and white rocks above deep blue water with boat wakes",
        caption: "The coast below the house",
      },
    ],
    map: { x: 53, y: 25 },
    seed: 67,
  },
  {
    slug: "sa-caseta",
    name: "Sa Caseta",
    line: "A fisherman's hut turned beach house, steps from a ladder into the sea.",
    coast: "south",
    place: "Cala Petita, east of Cala Morella",
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 1,
    rates: { low: 210, mid: 310, high: 460, peak: 610 },
    cleaning: 140,
    securityDeposit: 500,
    features: ["beach-walk", "sea-view", "step-free"],
    pool: null,
    distances: [
      { label: "Sea ladder", value: "1 min across the rocks" },
      { label: "Cala Petita beach", value: "4 min walk" },
      { label: "Sant Climent", value: "12 min drive" },
    ],
    summary:
      "Two rooms, one bathroom, a terrace hanging over the rocks and a ladder into the sea. Built as a boat shed in the 1930s and still at the water's edge.",
    story: [
      "Sa Caseta is the house people write to us about years later. It is small and simple: a bedroom with a double bed, a bedroom with bunks, a kitchen and a bathroom, all opening onto one terrace that is the real living room.",
      "The terrace is cut into the rock above Cala Petita, with a canvas awning, a table for four and two loungers. From the corner, a steel ladder drops into clear water four metres deep.",
      "No pool, because there is no need. Snorkels and a paddleboard live in the shed, and on calm evenings the sea is warmer than the air.",
    ],
    rooms: [
      { name: "Sea room", beds: "Double", note: "Window over the water" },
      { name: "Bunk room", beds: "Bunks for two" },
    ],
    amenities: [
      "Ceiling fans",
      "Paddleboard, snorkels and fins",
      "Outdoor shower",
      "Fibre wifi",
      "Parking for one car at the top of the path",
    ],
    houseBook: [
      {
        title: "The ladder",
        text: "Swim only when the sea is flat at the ladder. If waves are breaking on the bottom rung, walk round to the beach.",
      },
      {
        title: "Water",
        text: "The house has its own cistern. Short showers, please; it is refilled by truck on Mondays.",
      },
      {
        title: "Evenings",
        text: "Bar Sa Punta at the end of the beach does grilled squid until ten. Bring a torch for the walk back.",
      },
    ],
    photos: [
      {
        src: casetaTerrace,
        alt: "Dark chairs and a small table on a terrace under a parasol, overlooking a beach and town",
        caption: "The terrace over Cala Petita",
      },
      {
        src: casetaCove,
        alt: "Pines and rocky slopes around a narrow turquoise inlet",
        caption: "The inlet beside the house",
      },
      {
        src: casetaRocks,
        alt: "Swimmers on flat grey rock shelves beside deep blue sea",
        caption: "The rock shelf below the terrace",
      },
    ],
    map: { x: 66, y: 77 },
    seed: 79,
  },
  {
    slug: "son-vell",
    name: "Son Vell",
    line: "A hill estate on the terraces of the Serra, for big families and long tables.",
    coast: "inland",
    place: "Terraces of Serra Grossa, 5 km above Llucmar",
    sleeps: 12,
    bedrooms: 6,
    bathrooms: 6,
    rates: { low: 620, mid: 880, high: 1250, peak: 1680 },
    cleaning: 420,
    securityDeposit: 2500,
    features: ["pool", "sea-view", "step-free", "child-safe-pool"],
    pool: "16 × 5 m, heated, with a separate fenced children's pool",
    distances: [
      { label: "Llucmar", value: "12 min drive" },
      { label: "North shore", value: "20 min drive" },
      { label: "Airport", value: "25 min" },
    ],
    summary:
      "A manor house, two cottages and forty hectares of terraced hillside. Son Vell is where families gather for the big birthdays: twelve beds, a long table under the plane trees and a view down to both coasts.",
    story: [
      "The estate climbs the southern slope of Serra Grossa in stone terraces built for wheat and almonds. The manor house has the kitchen, the great room and four bedrooms; two cottages across the courtyard each hold a further bedroom suite.",
      "Our neighbours at the stud farm next door keep their Menorquí horses in the lower paddock, and will take confident riders out on the Serra tracks in the cool of the morning.",
      "The drive up is a run of hairpins with the sea opening below on every turn. Once you arrive, you will not want to leave, which is just as well: the cook can come to you.",
    ],
    rooms: [
      {
        name: "Master suite",
        beds: "Super-king",
        note: "Dressing room, bath with a view of the sea",
      },
      { name: "Plane-tree room", beds: "King" },
      { name: "Library room", beds: "King" },
      { name: "Almond room", beds: "Two singles" },
      {
        name: "East cottage",
        beds: "King",
        note: "Step-free, own sitting room",
      },
      { name: "West cottage", beds: "Two singles", note: "Own sitting room" },
    ],
    amenities: [
      "Air conditioning and central heating",
      "Two kitchens and an outdoor pizza oven",
      "Tennis court and boules piste",
      "Heated pool and fenced children's pool",
      "Gym in the old olive press",
      "Riding with the stud farm next door",
      "Starlink and fibre wifi",
      "Daily housekeeping included",
    ],
    houseBook: [
      {
        title: "Horses",
        text: "The paddock gate stays shut. Mateu brings the horses up at six; children can help with the hay if they ask him first.",
      },
      {
        title: "The hairpins",
        text: "There are fourteen. Hoot on the blind ones; the farm lorry comes down on Tuesdays and Thursdays before nine.",
      },
      {
        title: "The long table",
        text: "It seats twenty-two. Ask us for extra chairs and the festoon lights; we will set them before you arrive.",
      },
    ],
    photos: [
      {
        src: sonvellTerraces,
        alt: "Terraced green hillside dropping steeply to a calm sea under a pale sky",
        caption: "The estate terraces above the sea",
      },
      {
        src: sonvellPaddock,
        alt: "A grey mare and her foal in a dusty paddock beside a whitewashed gatepost",
        caption: "The neighbours in the lower paddock",
      },
      {
        src: sonvellRoad,
        alt: "A road winding in hairpin bends through rocky mountains at sunset",
        caption: "The drive up the Serra",
      },
    ],
    map: { x: 61, y: 39 },
    seed: 97,
  },
];

/* ------------------------------------------------------------ island guide */

export type PlaceKind =
  "Beaches" | "Walks" | "Villages" | "Viewpoints" | "By boat" | "Eat & drink";

export const placeKinds: PlaceKind[] = [
  "Beaches",
  "Walks",
  "Villages",
  "Viewpoints",
  "By boat",
  "Eat & drink",
];

export type Place = {
  slug: string;
  name: string;
  kind: PlaceKind;
  coast: Coast;
  image: string;
  alt: string;
  lede: string;
  body: string[];
  facts: { label: string; value: string }[];
  tip: string;
  map: { x: number; y: number };
};

export const places: Place[] = [
  {
    slug: "cala-morella",
    name: "Cala Morella",
    kind: "Beaches",
    coast: "south",
    image: guideMorella,
    alt: "A deep blue cove between pale limestone cliffs topped with pine trees",
    lede: "The cove everyone photographs, and the one we send you to at eight in the morning.",
    body: [
      "Cala Morella is a narrow inlet between two limestone cliffs, with forty metres of fine pale sand at its head and water that goes from glass-green to deep blue in a few strokes. The pines come right down to the beach.",
      "By eleven in July the sand is full and the anchored boats outnumber the swimmers. Come early, or come after six when the day-trippers leave and the cliffs turn gold. Swim to the cave on the eastern side; you can surface inside.",
    ],
    facts: [
      {
        label: "Getting there",
        value:
          "20 min walk from the Sant Climent car park, or on the ring path",
      },
      { label: "Best time", value: "Before 10:00 or after 18:00" },
      { label: "Facilities", value: "None. Bring water and shade." },
      {
        label: "Good for",
        value: "Swimming, snorkelling, cliff-shaded afternoons",
      },
    ],
    tip: "The car park fills by 09:30 from June to September. Our guests at Mirador des Pins walk in from the gate in twelve minutes.",
    map: { x: 31, y: 78 },
  },
  {
    slug: "cala-blava",
    name: "Cala Blava",
    kind: "Beaches",
    coast: "south",
    image: guideBlava,
    alt: "A wide shallow cove of turquoise water and white sand backed by pine-covered hills",
    lede: "Shallow, sheltered and the colour of a swimming pool. The beach for small children.",
    body: [
      "Cala Blava is the widest of the southern coves, a hundred metres of white sand shelving so slowly that you can walk out to your waist. The pine woods behind it give shade until noon.",
      "There is a seasonal kiosk with cold drinks and bocadillos, and a lifeguard in July and August. On windless days the water barely moves, which makes it the best place on Vellmar for a first snorkel.",
    ],
    facts: [
      {
        label: "Getting there",
        value: "Paved road to the car park, then 5 min on foot",
      },
      {
        label: "Best time",
        value: "Morning; the pines shade the west side until 12:00",
      },
      {
        label: "Facilities",
        value: "Kiosk May–October, lifeguard July–August",
      },
      { label: "Good for", value: "Families, paddling, first snorkels" },
    ],
    tip: "Rafel sells his morning catch from a van in the car park on Tuesdays and Fridays. Bring a cool bag.",
    map: { x: 43, y: 80 },
  },
  {
    slug: "platja-vermella",
    name: "Platja Vermella",
    kind: "Beaches",
    coast: "north",
    image: guideVermella,
    alt: "Waves breaking on a long beach of red-gold sand with red rock headlands",
    lede: "Red sand, open sea and almost nobody. The north shore at its wildest.",
    body: [
      "The north coast of Vellmar is made of a different rock: red sandstone, iron-rich and crumbling into sand the colour of terracotta. Platja Vermella is the longest of its beaches, half a kilometre of it, reached only on foot.",
      "With a northerly wind the surf is big and swimming is unwise. On calm days it is magnificent, and the walk in across the headland is part of the point.",
    ],
    facts: [
      {
        label: "Getting there",
        value: "35 min walk from the Sa Roca car park",
      },
      { label: "Best time", value: "Calm mornings; check the wind first" },
      { label: "Facilities", value: "None" },
      { label: "Good for", value: "Walking, wild swims, solitude" },
    ],
    tip: "If the forecast says tramuntana, swap it for a south-coast cove. If it is calm, this is the best day of your holiday.",
    map: { x: 46, y: 21 },
  },
  {
    slug: "cami-de-ronda",
    name: "The ring path",
    kind: "Walks",
    coast: "south",
    image: guideRonda,
    alt: "A stone stairway with a wooden handrail climbing a white limestone cliff above the sea",
    lede: "The coastguard trail that circles the whole island in 186 km. Walk a piece of it every day.",
    body: [
      "The Camí de Ronda was built so that guards on horseback could ride all the way round Vellmar watching for smugglers. It is now a waymarked footpath in twenty stages, and the southern stages are the most beautiful walking on the island.",
      "Our favourite: Cala Morella to Cala Blava, 7 km, about two and a half hours with swims. Cliff stairways, pine woods, three coves and a café at the end. Take the taxi boat back in summer.",
    ],
    facts: [
      { label: "Length", value: "186 km in 20 stages; our pick is 7 km" },
      { label: "Best time", value: "April–June and September–October" },
      { label: "Waymarks", value: "Brown posts with a green ring" },
      { label: "Good for", value: "Walkers, runners, swimmers with sandals" },
    ],
    tip: "We drop a stage map in every house. Ask the concierge for a bag drop and you can walk without carrying the picnic.",
    map: { x: 22, y: 69 },
  },
  {
    slug: "far-de-tramuntana",
    name: "Far de Tramuntana",
    kind: "Viewpoints",
    coast: "north",
    image: guideFar,
    alt: "A white lighthouse with its lamp lit against a deep blue evening sky",
    lede: "The lighthouse on the northern cape, and the best sunset on Vellmar after your own terrace.",
    body: [
      "The lighthouse was lit in 1857 and automated in 1988; the keeper's house is now a small museum of shipwrecks, open in the mornings. The cape around it is a bird reserve, loud with shearwaters at dusk.",
      "The road ends a kilometre short. Walk the last stretch across the heath and find a rock facing west before the sun goes. Bring a layer; it is always windier than you think.",
    ],
    facts: [
      {
        label: "Getting there",
        value: "Drive to the barrier, then 15 min on foot",
      },
      { label: "Best time", value: "An hour before sunset" },
      { label: "Facilities", value: "Museum 10:00–14:00, closed Mondays" },
      { label: "Good for", value: "Sunsets, birds, photographs" },
    ],
    tip: "Bar Es Far in Cala Fosca serves the last caldereta of the evening at 22:30. Book through us on the way back.",
    map: { x: 76, y: 18 },
  },
  {
    slug: "llucmar-market",
    name: "Llucmar on Thursday",
    kind: "Villages",
    coast: "inland",
    image: guideMarket,
    alt: "Fresh fish laid out in crates at a market stall",
    lede: "The island's market town on market day: fish, cheese, sobrassada and everybody's gossip.",
    body: [
      "Llucmar sits in the middle of the island and has always been where the farms came to sell. Every Thursday the square under the church fills with stalls from seven until one: fish from the morning boats, Vellmar cheese in its orange rind, figs, tomatoes for rubbing on bread.",
      "Do the market, then sit outside Bar Nou with a coffee and an ensaïmada and watch the town work. In late June the same square hosts the Sant Joan horses, which is a different thing entirely.",
    ],
    facts: [
      { label: "When", value: "Thursdays 07:00–13:00, all year" },
      { label: "Parking", value: "Free car park by the football ground" },
      { label: "Don't miss", value: "Aged Vellmar cheese, figs in September" },
      { label: "Good for", value: "Provisioning, people-watching, breakfast" },
    ],
    tip: "Our concierge can shop the market for you before you arrive, so the fridge is full of it on day one.",
    map: { x: 49, y: 50 },
  },
  {
    slug: "es-pont",
    name: "Es Pont by boat",
    kind: "By boat",
    coast: "south",
    image: guidePont,
    alt: "A turquoise bay seen through a natural rock arch, with a rocky headland beyond",
    lede: "A natural sea arch on the east coast, reachable only from the water.",
    body: [
      "At the eastern tip of the island the cliff has worn through into a stone bridge high enough to row under. The water beneath is eight metres deep and lit turquoise from below, and the only way there is by boat.",
      "Take a llaüt, the island's traditional wooden boat, from Santa Arnella for a full day along the south coast: Es Pont, two or three coves no road reaches, lunch at anchor.",
    ],
    facts: [
      { label: "Getting there", value: "By boat only, 2 h from Santa Arnella" },
      { label: "Best time", value: "Calm mornings, May–October" },
      { label: "Skipper", value: "Available through our concierge" },
      { label: "Good for", value: "Swimming in deep water, lunch at anchor" },
    ],
    tip: "Book the llaüt for a Tuesday or Wednesday; the coves are emptiest midweek.",
    map: { x: 88, y: 63 },
  },
  {
    slug: "serra-grossa",
    name: "Serra Grossa",
    kind: "Viewpoints",
    coast: "inland",
    image: guideSerra,
    alt: "A long cape of limestone cliffs and pine woods running out into a deep blue sea",
    lede: "The island's spine: one road, fourteen hairpins and a view of both coasts from the top.",
    body: [
      "Serra Grossa is the ridge of hills that runs across the middle of Vellmar. From the Mirador at its highest point, 357 metres up, you see the red north and the white south at once, with the cape stretching east into the sea.",
      "Drive up for the view, or walk from Llucmar on the old mule track through holm oak and wild olive, about ninety minutes up. There is a sanctuary at the top with a café run by the parish.",
    ],
    facts: [
      {
        label: "Getting there",
        value: "12 min drive from Llucmar, or 90 min on foot",
      },
      { label: "Height", value: "357 m" },
      { label: "Facilities", value: "Sanctuary café, 09:00–19:00" },
      { label: "Good for", value: "Orientation on day one, clear-day views" },
    ],
    tip: "Go on your first morning. Once you have seen the whole island at once, the rest of the guide makes sense.",
    map: { x: 63, y: 35 },
  },
  {
    slug: "port-arnella",
    name: "Lunch at the harbour",
    kind: "Eat & drink",
    coast: "west",
    image: guidePort,
    alt: "White sailing boats at anchor in a deep blue bay beneath limestone cliffs",
    lede: "Santa Arnella's harbour, its three fish restaurants and how to choose between them.",
    body: [
      "The old port of Santa Arnella is a long inlet lined with boathouses, most of them now restaurants. Ca'n Biel does the island's best caldereta de llagosta, the lobster stew, at a price that makes it a once-a-holiday dish. Es Moll does grilled fish by weight. Sa Barca does the cheapest and the best rice.",
      "Book a table at the water's edge for half past two, order a bottle of white from the Llucmar cooperative and give the afternoon to it. Nobody on Vellmar eats lunch in a hurry.",
    ],
    facts: [
      { label: "Where", value: "Passeig del Port, Santa Arnella" },
      { label: "Budget", value: "€35–90 a head" },
      { label: "Book", value: "Essential in July and August" },
      { label: "Good for", value: "Long lunches, lobster stew, sunsets" },
    ],
    tip: "We hold a table at Ca'n Biel every Saturday in season for our guests. Ask, and it is yours.",
    map: { x: 12, y: 61 },
  },
];

/* ------------------------------------------------------------ concierge */

export type ServiceGroup =
  "Before you arrive" | "At the house" | "On the water" | "Days out";

export type Service = {
  id: string;
  group: ServiceGroup;
  name: string;
  text: string;
  price: number;
  unit: string;
  /** Offered as an extra on the booking form. */
  bookable: boolean;
};

export const services: Service[] = [
  {
    id: "transfer",
    group: "Before you arrive",
    name: "Airport or ferry transfer",
    text: "A driver meets you at arrivals with your name and the house keys. Child seats on request.",
    price: 85,
    unit: "each way, up to 6 people",
    bookable: true,
  },
  {
    id: "provisioning",
    group: "Before you arrive",
    name: "Fridge filled for arrival",
    text: "Shopped at Llucmar market and the bakery the morning you land: bread, cheese, fruit, wine, whatever is on your list.",
    price: 60,
    unit: "service fee, plus the shopping",
    bookable: true,
  },
  {
    id: "car",
    group: "Before you arrive",
    name: "Hire car at the house",
    text: "Delivered to the driveway the day before, collected the day you leave. No queue at the airport.",
    price: 55,
    unit: "per day, small automatic",
    bookable: true,
  },
  {
    id: "breakfast",
    group: "At the house",
    name: "Breakfast basket",
    text: "Ensaïmadas, pa de pagès, Vellmar honey and fruit, left at the door at eight.",
    price: 18,
    unit: "per person, per morning",
    bookable: true,
  },
  {
    id: "chef",
    group: "At the house",
    name: "Private cook for an evening",
    text: "Marta or Pau cook island dishes in your kitchen, serve at your table and leave it clean.",
    price: 95,
    unit: "per person, from 4 guests",
    bookable: true,
  },
  {
    id: "babysitter",
    group: "At the house",
    name: "Babysitter",
    text: "Vetted, first-aid trained, English and Spanish speaking. Evenings or whole days.",
    price: 22,
    unit: "per hour, 3-hour minimum",
    bookable: false,
  },
  {
    id: "massage",
    group: "At the house",
    name: "Massage on the terrace",
    text: "Sixty or ninety minutes, table and oils brought to you.",
    price: 90,
    unit: "per hour",
    bookable: false,
  },
  {
    id: "boat",
    group: "On the water",
    name: "Llaüt day with a skipper",
    text: "A traditional wooden boat for up to eight, Es Pont and the south coves, lunch at anchor.",
    price: 690,
    unit: "per day, fuel included",
    bookable: true,
  },
  {
    id: "kayak",
    group: "On the water",
    name: "Sea kayak tour",
    text: "Three hours along the south cliffs with a guide, caves included when the sea allows.",
    price: 55,
    unit: "per person",
    bookable: false,
  },
  {
    id: "bikes",
    group: "Days out",
    name: "Bicycles delivered",
    text: "Hybrid or electric bikes, helmets and a route card for the farm roads.",
    price: 25,
    unit: "per bike, per day",
    bookable: true,
  },
  {
    id: "walk",
    group: "Days out",
    name: "Guided ring-path walk",
    text: "A stage of the Camí de Ronda with Joan, who grew up on it. Picnic carried for you.",
    price: 45,
    unit: "per person",
    bookable: false,
  },
  {
    id: "riding",
    group: "Days out",
    name: "Morning ride in the Serra",
    text: "Two hours on Menorquí horses with the stud farm at Son Vell. Confident riders only.",
    price: 80,
    unit: "per person",
    bookable: false,
  },
];

export const servicePhotos: Record<ServiceGroup, Photo> = {
  "Before you arrive": {
    src: conciergeBreakfast,
    alt: "Breakfast on a tray in bed: orange juice, toast and fruit",
    caption: "Arrival-morning breakfast",
  },
  "At the house": {
    src: conciergeChef,
    alt: "A cook's floured hands feeding fresh pasta through a pasta machine",
    caption: "Pau making fideus for dinner",
  },
  "On the water": {
    src: conciergeBoat,
    alt: "A small white wooden motorboat crossing a calm grey-blue sea",
    caption: "The llaüt heading out",
  },
  "Days out": {
    src: conciergeBikes,
    alt: "A row of colourful bicycles parked against a grassy dune",
    caption: "Bicycles at the dunes",
  },
};

/* ------------------------------------------------------------ people & voices */

export const team = [
  {
    name: "Marta Pons",
    role: "Founder, bookings",
    years: "Born in Llucmar",
    ask: "which cove, on which day, for which wind",
  },
  {
    name: "Jonah Reeve",
    role: "Founder, the houses",
    years: "On Vellmar since 2009",
    ask: "the history of any wall on the island",
  },
  {
    name: "Toni Camps",
    role: "Head of housekeeping",
    years: "With us since 2012",
    ask: "where the spare everything is",
  },
  {
    name: "Elena Mir",
    role: "Concierge",
    years: "With us since 2017",
    ask: "the table, the boat, the babysitter",
  },
  {
    name: "Pau Seguí",
    role: "Cook",
    years: "With us since 2019",
    ask: "the recipe; he will give it to you",
  },
];

export const testimonials = [
  {
    quote:
      "We arrived after dark to the pool lit, bread and cheese in the kitchen and a handwritten list of where to swim the next morning. That set the tone for the whole fortnight.",
    name: "Harriet & Sam",
    stay: "Ca'n Estel, August",
  },
  {
    quote:
      "Elena found us a skipper on two hours' notice when the wind turned. Our children still talk about swimming under the arch.",
    name: "The Okafor family",
    stay: "Mirador des Pins, July",
  },
  {
    quote:
      "Sa Caseta is the smallest place we have ever rented and the one we have loved most. The ladder into the sea at seven in the morning.",
    name: "Ines Albareda",
    stay: "Sa Caseta, September",
  },
];

/* ------------------------------------------------------------ page copy */

export const home = {
  title: "Eight houses on Vellmar, kept by people who live here.",
  lede: "Villas on an island of white coves, red cliffs and olive farms, each one cleaned, stocked and looked after by our own team. Choose your dates and we will show you which are free.",
  heroPhoto: villas[0].photos[0],
  mapTitle: "Where the houses are",
  mapText:
    "Vellmar is 48 km from end to end; nowhere is more than forty minutes from anywhere else. Each coast has its own character, so choosing a house is mostly choosing a shore.",
  keysTitle: "We hold the keys.",
  keysText: [
    "Every house on Hideaway is one we manage ourselves. Toni's team cleans it, Elena knows its quirks, and one of us meets you on the drive with the keys.",
    "We do not list houses we have not slept in. There are eight, there will not be eighty.",
  ],
  conciergeTitle: "The island, arranged",
  conciergeText:
    "A fridge full of the market on arrival, a cook for the big birthday, a wooden boat to the arch. Add it when you book, or message Elena once you are here.",
  guideTitle: "From the island guide",
  guideText:
    "Where we actually swim, walk and eat, written by the people who live here and updated every spring.",
  monthsTitle: "When to come",
  monthsText:
    "Sea temperature, air temperature and what is happening, month by month. The prices on every villa follow the same four seasons.",
  voicesTitle: "From the guest books",
  closeTitle: "Tell us your dates.",
  closeText:
    "Pick a house and check its calendar, or write to us with the week and the number of people and we will tell you which houses fit.",
  moon: {
    src: moon,
    alt: "A full moon over a dark bay with anchored sailing boats",
  },
};

export const villasPage = {
  title: "The villas",
  lede: "Eight houses on four coasts, from a fisherman's hut for two to an estate for twelve. Filter by the shore, the size and what matters to you; add dates to see what is free.",
};

export const guidePage = {
  title: "The island guide",
  lede: "Vellmar in the places we send our own friends: coves for every wind, walks for every morning, and where to be at sunset.",
};

export const conciergePage = {
  title: "Concierge",
  lede: "Everything that makes a week run itself, arranged by Elena and the team. Prices are what we pay our island partners plus a small fee; nothing is marked up twice.",
  howTitle: "How it works",
  how: [
    "Tick the extras on the booking form, or send Elena a message at any time before or during your stay.",
    "We confirm each one within a day, with the name of the person who will turn up.",
    "Everything is added to one final bill, settled at the end of your stay.",
  ],
};

export const bookPage = {
  title: "Book a stay",
  lede: "Choose the house and the dates, tell us who is coming and what to arrange. We hold the dates for 48 hours while we confirm by email.",
};

export const aboutPage = {
  title: "Two people, eight houses, one island.",
  lede: "Hideaway began in 2011 with one farmhouse and a borrowed set of keys. It is still small on purpose.",
  story: [
    "Marta grew up in Llucmar, in a family that had farmed the island's middle for six generations. Jonah came for a summer in 2009 to restore dry-stone walls and stayed. In 2011 Marta's uncle asked them to look after Ca'n Estel while he was away, and to let it, if anyone wanted it.",
    "Somebody did, and then somebody else. Friends of the family asked if we would look after their houses too. We said yes to seven of them and no to a great many more, because we only take a house we would happily spend our own summer in, and only as many as we can know by heart.",
    "Today there are fourteen of us. Every house is cleaned by our own team, never by an agency. Everyone who calls the office talks to someone who has stood in the kitchen of the house they are asking about.",
  ],
  photo: {
    src: aboutFields,
    alt: "An old orange tractor resting in a green field edged by trees",
    caption: "Spring on the Pons farm, outside Llucmar",
  },
  principlesTitle: "What we promise every guest",
  principles: [
    {
      title: "Met at the door",
      text: "One of us is at the house when you arrive, whatever time the ferry gets in.",
    },
    {
      title: "One number",
      text: "Elena's phone is on from eight to eight, and Toni's is on for emergencies all night.",
    },
    {
      title: "Paid fairly",
      text: "Our housekeepers are employed all year, not by the changeover. It is why they stay.",
    },
    {
      title: "Island first",
      text: "We buy from the market, the cooperatives and the bakeries. Every basket and every dinner keeps money on Vellmar.",
    },
  ],
  teamTitle: "The people you will meet",
  ownersTitle: "Own a house on Vellmar?",
  ownersText:
    "We take on one house every year or two. If yours is one you love, write to Jonah and tell us about it.",
};

export const goodToKnow = {
  title: "Good to know",
  lede: "Getting here, paying, cancelling and the small print, set out plainly. If your question is not here, Elena will answer it.",
  travel: [
    {
      title: "By air",
      text: "Vellmar airport (VLM) has direct flights from around forty cities between April and October, and connections through the mainland all year. It is twenty to thirty-five minutes from every house.",
    },
    {
      title: "By sea",
      text: "The fast ferry from the mainland docks in Santa Arnella twice a day, three hours forty minutes, and carries cars. The overnight ferry arrives at 07:00.",
    },
    {
      title: "On the island",
      text: "You will want a car for all but Casa Rosa. Roads are quiet and short; the longest drive between two of our houses is forty minutes.",
    },
  ],
  policies: [
    {
      title: "Paying",
      text: "30% when you book; the balance eight weeks before you arrive. Card or bank transfer, in euros.",
    },
    {
      title: "Cancelling",
      text: "Full refund, less €150, up to 60 days before arrival. 50% between 60 and 30 days. After that we refund whatever we can re-let.",
    },
    {
      title: "Security deposit",
      text: "Pre-authorised on your card a week before arrival, €500–2,500 depending on the house, released within seven days of departure.",
    },
    {
      title: "Arrival and departure",
      text: "Check in from 16:00, check out by 10:00. Earlier or later when the calendar allows; just ask.",
    },
    {
      title: "Tourist tax",
      text: "€2.20 per adult per night, collected for the island council and shown on every quote.",
    },
  ],
  faq: [
    {
      q: "Are the prices per house or per person?",
      a: "Per house, per night. Cleaning and the tourist tax are added on every quote, and nothing else is, unless you choose a concierge extra.",
    },
    {
      q: "Why do some weeks only start on Saturdays?",
      a: "In July and August every house changes over on Saturday, so our housekeepers can turn eight houses around in one day and still give each one five hours. The rest of the year you can arrive on any day.",
    },
    {
      q: "Can we bring a dog?",
      a: "Ca'n Estel and Son Vell welcome well-behaved dogs for a €90 cleaning supplement. Pools are fenced, but the olive groves are not.",
    },
    {
      q: "Are the pools safe for young children?",
      a: "Ca'n Estel, Mirador des Pins and Son Vell have a fence or locking cover. The others do not, and we will say so plainly when you ask.",
    },
    {
      q: "Is there air conditioning?",
      a: "In every bedroom of every house except Sa Caseta, which has ceiling fans and the sea breeze.",
    },
    {
      q: "What happens if something breaks?",
      a: "Call Toni. Someone will be with you the same day, usually within the hour.",
    },
    {
      q: "Can we host a wedding or a party?",
      a: "Son Vell hosts up to sixty for celebrations by arrangement. The other houses are for the guests staying in them.",
    },
  ],
};
