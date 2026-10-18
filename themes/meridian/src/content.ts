import cordwainerExt from "./assets/cordwainer-ext.jpg";
import cordwainerLiving from "./assets/cordwainer-living.jpg";
import cordwainerDining from "./assets/cordwainer-dining.jpg";
import wharfExt from "./assets/wharf-ext.jpg";
import wharfLiving from "./assets/wharf-living.jpg";
import wharfKitchen from "./assets/wharf-kitchen.jpg";
import larkspurExt from "./assets/larkspur-ext.jpg";
import larkspurLiving from "./assets/larkspur-living.jpg";
import larkspurBedroom from "./assets/larkspur-bedroom.jpg";
import gullpointExt from "./assets/gullpoint-ext.jpg";
import gullpointLiving from "./assets/gullpoint-living.jpg";
import gullpointBedroom from "./assets/gullpoint-bedroom.jpg";
import alderExt from "./assets/alder-ext.jpg";
import alderDining from "./assets/alder-dining.jpg";
import alderBath from "./assets/alder-bath.jpg";
import meadowExt from "./assets/meadow-ext.jpg";
import meadowLiving from "./assets/meadow-living.jpg";
import meadowBedroom from "./assets/meadow-bedroom.jpg";
import mercerExt from "./assets/mercer-ext.jpg";
import mercerLiving from "./assets/mercer-living.jpg";
import mercerBedroom from "./assets/mercer-bedroom.jpg";
import heronExt from "./assets/heron-ext.jpg";
import heronLiving from "./assets/heron-living.jpg";
import heronLounge from "./assets/heron-lounge.jpg";
import quarryExt from "./assets/quarry-ext.jpg";
import quarryLiving from "./assets/quarry-living.jpg";
import quarryFront from "./assets/quarry-front.jpg";
import guideKestrel from "./assets/guide-kestrel.jpg";
import guideAshgrove from "./assets/guide-ashgrove.jpg";
import guideNorth from "./assets/guide-north.jpg";
import guideFenwick from "./assets/guide-fenwick.jpg";
import agentPryce from "./assets/agent-pryce.jpg";
import agentLindqvist from "./assets/agent-lindqvist.jpg";
import agentOsei from "./assets/agent-osei.jpg";
import agentCallahan from "./assets/agent-callahan.jpg";
import agentOrtega from "./assets/agent-ortega.jpg";
import agentRaman from "./assets/agent-raman.jpg";

/* ---------- Brand ---------- */

export const brand = {
  name: "Meridian",
  sector: "Real estate agency",
  city: "Port Ellery",
  founded: 1987,
  tagline: "Homes on both banks of the Ellery, sold and let by neighbours.",
  address: "214 Mercer Street, Old Town, Port Ellery",
  email: "hello@meridian.example",
  phone: "+1 555 0142 210",
  phoneHref: "tel:+15550142210",
  lettingsPhone: "+1 555 0142 260",
  lettingsPhoneHref: "tel:+15550142260",
  hours: [
    { days: "Monday – Friday", time: "9:00 – 18:00" },
    { days: "Saturday", time: "10:00 – 16:00" },
    { days: "Sunday", time: "Viewings by appointment" },
  ],
};

export const nav = [
  { to: "/homes", label: "Find a home" },
  { to: "/sell", label: "Sell" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/agents", label: "Agents" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const footerColumns = [
  {
    title: "Homes",
    links: [
      { to: "/homes", label: "Search homes" },
      { to: "/saved", label: "Saved homes" },
      { to: "/neighborhoods", label: "Neighborhood guides" },
    ],
  },
  {
    title: "Meridian",
    links: [
      { to: "/sell", label: "Sell or let with us" },
      { to: "/agents", label: "Our agents" },
      { to: "/about", label: "About & fees" },
      { to: "/contact", label: "Contact the office" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const newsletter = {
  title: "New homes, every Thursday",
  text: "One short email with every home that came to market that week, before it reaches the portals.",
};

/* ---------- Map of the city (SVG units, viewBox 0 0 1000 700) ---------- */

export const city = {
  river:
    "M-20 228 C 120 250 220 262 320 300 S 520 372 640 392 S 860 430 1020 452",
  riverName: { x: 250, y: 296, rotate: 12, label: "Ellery River" },
  harbor:
    "M1000 420 C 930 440 860 470 820 540 C 790 600 780 650 770 700 L1000 700 Z",
  harborName: { x: 900, y: 610, label: "Gull Harbor" },
  park: "M470 520 L650 512 L668 628 L486 640 Z",
  parkName: { x: 568, y: 584, label: "Fenwick Common" },
  roads: [
    "M0 120 C 300 110 650 128 1000 96",
    "M560 0 C 556 200 572 420 590 700",
    "M180 0 C 205 220 250 450 300 700",
    "M300 700 C 520 520 780 330 1000 250",
    "M0 470 C 220 440 420 470 760 520",
    "M760 0 C 770 180 800 300 830 450",
  ],
  streets: [
    "M600 236 L628 378",
    "M668 226 L700 390",
    "M726 220 L752 400",
    "M440 262 L790 282",
    "M380 280 L560 330",
    "M360 56 H740",
    "M650 0 L660 208",
    "M440 0 L450 224",
    "M860 40 L1000 40",
    "M840 330 L1000 316",
    "M60 330 C 140 340 260 360 380 420",
    "M520 560 L720 470",
    "M120 610 L460 560",
  ],
  rail: "M0 176 C 260 192 540 214 1000 150",
  station: { x: 560, y: 205, label: "Ellery Station" },
  contours: [
    "M60 110 C 90 50 230 40 260 100 C 280 160 150 200 90 170 C 60 155 50 130 60 110 Z",
    "M100 112 C 120 78 210 72 225 108 C 236 140 160 160 122 146 C 100 138 94 124 100 112 Z",
    "M135 112 C 145 96 185 94 192 112 C 196 126 162 134 145 128 C 136 124 132 118 135 112 Z",
  ],
};

/* ---------- Neighborhoods ---------- */

export type AreaSlug =
  | "old-town"
  | "the-docks"
  | "north-quarter"
  | "kestrel-hill"
  | "ashgrove"
  | "fenwick-park";

export type Place = { name: string; kind: string; note: string };

export type Area = {
  slug: AreaSlug;
  name: string;
  line: string;
  intro: string[];
  image: string;
  imageAlt: string;
  pricePerSqft: number;
  medianSale: number;
  medianRent: number;
  typical: string;
  commute: string;
  character: string;
  gettingAround: string;
  schools: string;
  places: Place[];
  agent: string;
  shape: string;
  label: { x: number; y: number };
};

export const areas: Area[] = [
  {
    slug: "old-town",
    name: "Old Town",
    line: "Brick rowhouses, the market hall and the shortest walk to everything.",
    intro: [
      "Old Town is the grid the city grew from: four-storey brick rowhouses built for ship chandlers and cordwainers in the 1880s, most of them now split between a family below and a flat above.",
      "It is loud on market Saturdays and still by nine on a Tuesday. Buyers come for the walkability and the original joinery; they stay for the corner bakeries and the fact that nobody here owns a second car.",
    ],
    image: cordwainerExt,
    imageAlt:
      "A red-brick rowhouse with a round attic window on a quiet Old Town street",
    pricePerSqft: 445,
    medianSale: 812000,
    medianRent: 2700,
    typical: "1880s brick rowhouse, 3 bedrooms over four floors",
    commute: "Ellery Station is a 6-minute walk",
    character:
      "Dense, walkable and historic. Expect steep stairs, high ceilings, shared walls and very little parking.",
    gettingAround:
      "Everything is on foot. The 4 and 11 buses run along Mercer Street every eight minutes, and Ellery Station is at the north edge of the grid.",
    schools:
      "Cordwainer Elementary is rated well and oversubscribed; most families apply from within the six blocks around it.",
    places: [
      {
        name: "Market Hall",
        kind: "Market",
        note: "Covered produce market, Wednesday to Saturday from 7am.",
      },
      {
        name: "Halyard Bakery",
        kind: "Bakery",
        note: "Queue for the cardamom buns before ten.",
      },
      {
        name: "The Chandlery",
        kind: "Bar",
        note: "Natural wine in a former rope store on Cordwainer Row.",
      },
      {
        name: "Mercer Street Library",
        kind: "Library",
        note: "Carnegie building, open until eight on weeknights.",
      },
    ],
    agent: "nora-lindqvist",
    shape:
      "M300 240 L330 150 L420 228 L560 240 L760 210 L800 300 L775 402 C 700 396 640 388 560 368 C 470 346 380 318 300 286 Z",
    label: { x: 640, y: 286 },
  },
  {
    slug: "the-docks",
    name: "The Docks",
    line: "Warehouse lofts and new apartments on the water, with the ferry at the end of the street.",
    intro: [
      "The Docks were working wharves until the container port moved downriver in 1979. What remains is a strip of timber-framed warehouses, converted into lofts in the nineties, and a newer edge of apartment buildings facing Gull Harbor.",
      "It suits people who want a balcony over water, a concierge and a lock-up-and-leave home. Service charges are higher here than anywhere else in the city, so ask us for the building's last three years of accounts.",
    ],
    image: wharfExt,
    imageAlt: "Balconied apartment building in The Docks against a pale sky",
    pricePerSqft: 505,
    medianSale: 560000,
    medianRent: 2950,
    typical: "2-bedroom apartment with balcony, 1,000 sq ft",
    commute: "The harbor ferry reaches Fenwick Park in 9 minutes",
    character:
      "Modern, managed and on the water. Lifts, parking bays and harbor views; fewer gardens and higher fees.",
    gettingAround:
      "The harbor ferry runs every 20 minutes from Tidewater Quay, and the cycle path follows the water all the way to Old Town.",
    schools:
      "Most families here use Harbor Primary in the old customs house or cross the river to Fenwick Park.",
    places: [
      {
        name: "Tidewater Quay",
        kind: "Ferry pier",
        note: "Ferry to Fenwick Park and the summer boat to the islands.",
      },
      {
        name: "Bonded Store",
        kind: "Food hall",
        note: "Twelve counters under one roof, open late on Fridays.",
      },
      {
        name: "Gull Harbor Swim Club",
        kind: "Lido",
        note: "Heated harbor pool, May to October.",
      },
      {
        name: "Kiln Yard",
        kind: "Studios",
        note: "Open studios on the first Sunday of the month.",
      },
    ],
    agent: "nora-lindqvist",
    shape:
      "M760 0 H1000 V430 C 940 438 880 438 800 418 L775 402 L800 300 L760 210 Z",
    label: { x: 846, y: 60 },
  },
  {
    slug: "north-quarter",
    name: "North Quarter",
    line: "Craftsman bungalows, deep porches and the city's best-loved schools.",
    intro: [
      "North Quarter was laid out in 1912 as a streetcar suburb, and the plots still show it: forty-foot lots, alleys behind, a bungalow with a porch on almost every one.",
      "It is the neighbourhood people move to when the second child arrives. Homes rarely reach the open market for long, so register with us before you are ready rather than after.",
    ],
    image: guideNorth,
    imageAlt: "White clapboard house with a red roof and a tidy front garden",
    pricePerSqft: 420,
    medianSale: 705000,
    medianRent: 3100,
    typical: "1920s craftsman bungalow, 3 bedrooms, garden and alley garage",
    commute: "20 minutes to Old Town by bike along Larkspur Avenue",
    character:
      "Family streets with mature trees, porches and alleys. Quiet after dark, busy at 8:30 and 3:15.",
    gettingAround:
      "The 7 bus runs down Larkspur Avenue to Ellery Station. The cycle lane on Northern Avenue is protected for its whole length.",
    schools:
      "Larkspur Elementary and North Quarter Middle are both in demand; Quarry Street Montessori takes children from two.",
    places: [
      {
        name: "Larkspur Avenue shops",
        kind: "High street",
        note: "Hardware store, butcher, two cafés and a cinema with one screen.",
      },
      {
        name: "Quarry Pond",
        kind: "Park",
        note: "Skating in a cold January, model boats in summer.",
      },
      {
        name: "North Quarter Farmers' Market",
        kind: "Market",
        note: "Sunday mornings in the school yard, April to November.",
      },
      {
        name: "The Porch Room",
        kind: "Restaurant",
        note: "Neighbourhood bistro, book for Friday.",
      },
    ],
    agent: "rafael-ortega",
    shape: "M330 0 H760 V210 L560 240 L420 228 L330 150 Z",
    label: { x: 440, y: 64 },
  },
  {
    slug: "kestrel-hill",
    name: "Kestrel Hill",
    line: "Shingle houses on the high ground, with views over the river to the harbor.",
    intro: [
      "Kestrel Hill rises three hundred feet above the river, and most of its houses were built in the 1900s by merchants who wanted to watch their ships come in. They are large, shingled and set back from the road behind beech hedges.",
      "Prices here are about the house rather than the street: condition, view and plot size move values more than anywhere else we sell. Our valuations on the hill always include a visit; we do not quote from a desk.",
    ],
    image: guideKestrel,
    imageAlt:
      "Timber house with lit windows among trees on Kestrel Hill at dusk",
    pricePerSqft: 400,
    medianSale: 1320000,
    medianRent: 4400,
    typical: "1900s shingle house, 5 bedrooms on half an acre",
    commute:
      "12 minutes by car to Old Town; the 2 bus climbs the hill every 15 minutes",
    character:
      "Large plots, big views and winding lanes without sidewalks. The quietest addresses in the city.",
    gettingAround:
      "A car helps. The 2 bus loops the hill every quarter hour and connects to Ellery Station.",
    schools:
      "Kestrel Hill School is a small K–8 with outdoor classrooms; secondary pupils travel to North Quarter.",
    places: [
      {
        name: "The Lookout",
        kind: "Viewpoint",
        note: "Benches and a brass compass rose at the top of Gull Point Road.",
      },
      {
        name: "Hilltop Stores",
        kind: "Grocer",
        note: "General store and post office, open until seven.",
      },
      {
        name: "Beech Walk",
        kind: "Trail",
        note: "A two-mile wooded loop around the crest of the hill.",
      },
    ],
    agent: "daniel-osei",
    shape: "M0 0 H330 V150 L300 240 C 220 236 120 226 0 210 Z",
    label: { x: 24, y: 40 },
  },
  {
    slug: "ashgrove",
    name: "Ashgrove",
    line: "Leafy crescents of mid-century houses and the city's most interesting new builds.",
    intro: [
      "Ashgrove sits on the south bank, upstream of the bridges, where the city's architects have always built for themselves. Mid-century split-levels share crescents with timber-clad new houses on the plots that came up in the last decade.",
      "Gardens are generous, the river path is at the end of most streets, and the neighbourhood association is famously particular about trees. If you plan to extend, we can introduce you to the planning officers who know the area.",
    ],
    image: guideAshgrove,
    imageAlt: "Modern dark-clad house with glazed walls glowing at dusk",
    pricePerSqft: 415,
    medianSale: 1050000,
    medianRent: 3800,
    typical: "1960s split-level or new timber house, 4 bedrooms, garden",
    commute: "18 minutes by bike over the Alder Bridge to Old Town",
    character:
      "Green, architectural and calm. Wide plots, river access and a strong neighbourhood association.",
    gettingAround:
      "The river path takes bikes into Old Town; the 9 bus crosses Alder Bridge every ten minutes.",
    schools:
      "Ashgrove Primary has a forest-school programme; Riverside High is a fifteen-minute walk.",
    places: [
      {
        name: "Alder Bridge Boathouse",
        kind: "Rowing club",
        note: "Learn-to-row courses every spring.",
      },
      {
        name: "Grove Parade",
        kind: "Shops",
        note: "Deli, florist, bookshop and a very good pizzeria.",
      },
      {
        name: "The Arboretum",
        kind: "Garden",
        note: "Free, open dawn to dusk, best in October.",
      },
    ],
    agent: "rafael-ortega",
    shape:
      "M0 262 C 120 276 220 290 320 324 C 380 344 420 360 440 372 L420 512 L0 548 Z",
    label: { x: 24, y: 330 },
  },
  {
    slug: "fenwick-park",
    name: "Fenwick Park",
    line: "Clapboard cottages around the common, ten minutes across the water by ferry.",
    intro: [
      "Fenwick Park grew around its common, sixty acres of meadow and old oaks that the city bought in 1874 to stop it being built on. The cottages around it were fishermen's houses; the streets behind are Victorian terraces and small apartment buildings.",
      "It is the best value on our map for a house with a garden, and the ferry makes it closer to the centre than it looks. First-time buyers make up almost half our sales here.",
    ],
    image: guideFenwick,
    imageAlt: "Timber house on a rise of meadow grass under a soft evening sky",
    pricePerSqft: 470,
    medianSale: 540000,
    medianRent: 2400,
    typical: "Clapboard cottage, 2 bedrooms, front and back garden",
    commute:
      "Ferry to The Docks in 9 minutes, then a 10-minute walk to Old Town",
    character:
      "Village feel around a big green. Small houses, real gardens, a strong first-time-buyer market.",
    gettingAround:
      "The harbor ferry leaves Fenwick Pier every 20 minutes; the 9 bus runs to Ashgrove and over Alder Bridge.",
    schools:
      "Fenwick Common Primary sits on the green; Riverside High takes most secondary pupils.",
    places: [
      {
        name: "Fenwick Common",
        kind: "Park",
        note: "Meadow, oaks, a bandstand and a Saturday parkrun.",
      },
      {
        name: "Pier Tavern",
        kind: "Pub",
        note: "Fish suppers and a ferry timetable above the bar.",
      },
      {
        name: "Meadow Lane Allotments",
        kind: "Gardens",
        note: "Waiting list of about two years; get on it early.",
      },
    ],
    agent: "priya-raman",
    shape:
      "M440 372 C 560 396 680 418 790 446 C 840 470 830 520 800 560 C 780 620 770 660 765 700 H0 V548 L420 512 Z",
    label: { x: 240, y: 600 },
  },
];

/* ---------- Floor plans (feet) ---------- */

export type Room = { name: string; x: number; y: number; w: number; h: number };

const plans: Record<string, Room[]> = {
  flat: [
    { name: "Living & kitchen", x: 0, y: 0, w: 22, h: 16 },
    { name: "Bedroom 1", x: 22, y: 0, w: 18, h: 12 },
    { name: "Hall", x: 22, y: 12, w: 10, h: 8 },
    { name: "En suite", x: 32, y: 12, w: 8, h: 8 },
    { name: "Bedroom 2", x: 0, y: 16, w: 13, h: 11 },
    { name: "Bath", x: 13, y: 16, w: 9, h: 11 },
    { name: "Balcony", x: 22, y: 20, w: 18, h: 7 },
  ],
  townhouse: [
    { name: "Front parlor", x: 0, y: 0, w: 16, h: 15 },
    { name: "Hall", x: 16, y: 0, w: 6, h: 27 },
    { name: "Dining room", x: 0, y: 15, w: 16, h: 12 },
    { name: "Kitchen", x: 0, y: 27, w: 22, h: 13 },
    { name: "Yard", x: 0, y: 40, w: 22, h: 10 },
  ],
  bungalow: [
    { name: "Porch", x: 0, y: 0, w: 38, h: 7 },
    { name: "Living room", x: 0, y: 7, w: 19, h: 15 },
    { name: "Dining", x: 19, y: 7, w: 19, h: 11 },
    { name: "Kitchen", x: 19, y: 18, w: 19, h: 12 },
    { name: "Bedroom 1", x: 0, y: 22, w: 13, h: 14 },
    { name: "Bath", x: 13, y: 22, w: 6, h: 9 },
    { name: "Bedroom 2", x: 19, y: 30, w: 11, h: 11 },
    { name: "Bedroom 3", x: 30, y: 30, w: 8, h: 11 },
    { name: "Hall", x: 13, y: 31, w: 6, h: 10 },
  ],
  cottage: [
    { name: "Sitting room", x: 0, y: 0, w: 15, h: 14 },
    { name: "Kitchen", x: 15, y: 0, w: 13, h: 14 },
    { name: "Bedroom 1", x: 0, y: 14, w: 15, h: 12 },
    { name: "Bath", x: 15, y: 14, w: 7, h: 12 },
    { name: "Bedroom 2", x: 22, y: 14, w: 10, h: 12 },
    { name: "Garden room", x: 28, y: 0, w: 4, h: 14 },
  ],
  house: [
    { name: "Great room", x: 0, y: 0, w: 28, h: 20 },
    { name: "Kitchen", x: 28, y: 0, w: 18, h: 16 },
    { name: "Pantry", x: 46, y: 0, w: 8, h: 8 },
    { name: "Mudroom", x: 46, y: 8, w: 8, h: 8 },
    { name: "Study", x: 0, y: 20, w: 14, h: 14 },
    { name: "Hall & stair", x: 14, y: 20, w: 14, h: 14 },
    { name: "Dining", x: 28, y: 16, w: 18, h: 18 },
    { name: "Bath", x: 46, y: 16, w: 8, h: 18 },
    { name: "Terrace", x: 0, y: 34, w: 54, h: 8 },
  ],
};

/* ---------- Agents ---------- */

export type Agent = {
  id: string;
  name: string;
  role: string;
  areas: AreaSlug[];
  phone: string;
  phoneHref: string;
  email: string;
  photo: string;
  since: number;
  languages: string;
  bio: string[];
  quote: { text: string; by: string };
};

export const agents: Agent[] = [
  {
    id: "walter-pryce",
    name: "Walter Pryce",
    role: "Founder & senior partner",
    areas: ["old-town", "kestrel-hill"],
    phone: "+1 555 0142 211",
    phoneHref: "tel:+15550142211",
    email: "walter@meridian.example",
    photo: agentPryce,
    since: 1987,
    languages: "English",
    bio: [
      "Walter opened Meridian above a ship's chandler on Mercer Street in 1987 with one desk, one phone and a hand-drawn map of the city pinned to the wall. The map is still there.",
      "He now sells a handful of homes a year, mostly for families he first sold to decades ago, and spends the rest of his time training the team to price honestly and pick up the phone.",
    ],
    quote: {
      text: "Walter told us our asking price was too high and why. He was right, and we sold in three weeks.",
      by: "The Hallorans, sold on Cordwainer Row",
    },
  },
  {
    id: "nora-lindqvist",
    name: "Nora Lindqvist",
    role: "Sales partner, Old Town & The Docks",
    areas: ["old-town", "the-docks"],
    phone: "+1 555 0142 214",
    phoneHref: "tel:+15550142214",
    email: "nora@meridian.example",
    photo: agentLindqvist,
    since: 2011,
    languages: "English, Swedish",
    bio: [
      "Nora has sold more homes in Old Town than anyone else in the city for six years running. She lives above the Halyard Bakery and knows which rowhouses still have their original shutters.",
      "Before Meridian she was a building surveyor, which is why her viewings include a look at the roof and the boiler as well as the light in the front room.",
    ],
    quote: {
      text: "Nora spotted a damp issue the survey missed and negotiated it off the price before we exchanged.",
      by: "Tom & Lise, bought at Wharf House",
    },
  },
  {
    id: "daniel-osei",
    name: "Daniel Osei",
    role: "Sales, Kestrel Hill",
    areas: ["kestrel-hill"],
    phone: "+1 555 0142 217",
    phoneHref: "tel:+15550142217",
    email: "daniel@meridian.example",
    photo: agentOsei,
    since: 2016,
    languages: "English, French, Twi",
    bio: [
      "Daniel looks after the hill, where every house is different and the right buyer is often not yet looking. He keeps a private list of families waiting for a particular street.",
      "He grew up on Beech Walk and still runs the loop every morning, which is how he hears about most homes before they are listed.",
    ],
    quote: {
      text: "He found our buyer from his own list before the photographs were even done.",
      by: "Ana Ferreira, sold on Gull Point Road",
    },
  },
  {
    id: "maeve-callahan",
    name: "Maeve Callahan",
    role: "Head of lettings",
    areas: ["old-town", "the-docks", "north-quarter"],
    phone: "+1 555 0142 261",
    phoneHref: "tel:+15550142261",
    email: "maeve@meridian.example",
    photo: agentCallahan,
    since: 2014,
    languages: "English, Irish",
    bio: [
      "Maeve runs the lettings desk and manages two hundred and forty homes across the city for landlords who would rather not take the 2am call about the boiler.",
      "Tenants know her for returning deposits in full and on time; landlords know her for finding tenants who stay for years.",
    ],
    quote: {
      text: "Three tenancies in eight years and not one week empty. Maeve simply handles it.",
      by: "Graham Dunn, landlord in North Quarter",
    },
  },
  {
    id: "rafael-ortega",
    name: "Rafael Ortega",
    role: "Sales, North Quarter & Ashgrove",
    areas: ["north-quarter", "ashgrove"],
    phone: "+1 555 0142 219",
    phoneHref: "tel:+15550142219",
    email: "rafael@meridian.example",
    photo: agentOrtega,
    since: 2018,
    languages: "English, Spanish",
    bio: [
      "Rafael trained as an architect before moving into sales, and Ashgrove's new builds are his favourite thing to sell: he can explain a heat pump and a cantilever in the same breath.",
      "In North Quarter he works with a lot of growing families, and he will happily walk you to the school gate to time it.",
    ],
    quote: {
      text: "Rafael understood what made our house special and wrote it better than we could.",
      by: "Mei & Jonah, sold on Alder Close",
    },
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    role: "Valuations & Fenwick Park",
    areas: ["fenwick-park", "ashgrove"],
    phone: "+1 555 0142 222",
    phoneHref: "tel:+15550142222",
    email: "priya@meridian.example",
    photo: agentRaman,
    since: 2019,
    languages: "English, Tamil",
    bio: [
      "Priya leads valuations for the whole office, which means she has stood in more Port Ellery kitchens than anyone else on the team. Every figure she gives comes with the three sales that justify it.",
      "She also sells in Fenwick Park, where she bought her own first home, a cottage on Meadow Lane with an allotment two streets away.",
    ],
    quote: {
      text: "Priya's valuation came with the comparable sales printed out. No guessing, no flattery.",
      by: "Sam Okafor, sold in Fenwick Park",
    },
  },
];

/* ---------- Listings ---------- */

export type Mode = "buy" | "rent";
export type HomeType = "House" | "Townhouse" | "Apartment" | "Cottage";

export type Listing = {
  id: string;
  address: string;
  area: AreaSlug;
  mode: Mode;
  price: number;
  type: HomeType;
  beds: number;
  baths: number;
  sqft: number;
  built: number;
  lot?: string;
  taxYear?: number;
  fees?: string;
  status?: "New" | "Reduced" | "Under offer";
  listed: string;
  headline: string;
  description: string[];
  features: string[];
  images: { src: string; alt: string }[];
  plan: Room[];
  nearby: {
    place: string;
    minutes: number;
    by: "walk" | "bike" | "ferry" | "bus";
  }[];
  pin: { x: number; y: number };
  agent: string;
};

export const listings: Listing[] = [
  {
    id: "14-cordwainer-row",
    address: "14 Cordwainer Row",
    area: "old-town",
    mode: "buy",
    price: 865000,
    type: "Townhouse",
    beds: 3,
    baths: 2,
    sqft: 1940,
    built: 1888,
    lot: "1,100 sq ft yard",
    taxYear: 9860,
    status: "New",
    listed: "2026-10-14",
    headline:
      "A chandler's rowhouse with its shutters, cornices and back yard intact.",
    description: [
      "Number 14 was built for a sailmaker in 1888 and has had four owners since. The current family have spent eleven years putting back what earlier owners took out: the plaster cornices in the front parlor, the folding shutters, the pine floors under three layers of linoleum.",
      "The ground floor runs from the parlor through a dining room with a working fireplace to a kitchen that opens onto a walled yard with a fig tree. Upstairs are three bedrooms and two bathrooms, the main one with a claw-foot bath under the skylight.",
      "Market Hall is two blocks away and Ellery Station six minutes on foot. The roof was re-slated in 2022 and the wiring replaced in 2019; the reports are in the pack.",
    ],
    features: [
      "Original shutters and cornices",
      "Working fireplace",
      "Walled yard with fig tree",
      "Roof re-slated 2022",
      "Rewired 2019",
      "Cellar storage",
    ],
    images: [
      {
        src: cordwainerExt,
        alt: "Brick front of 14 Cordwainer Row with a round attic window",
      },
      {
        src: cordwainerLiving,
        alt: "Front parlor with a sofa, fireplace and tall windows",
      },
      {
        src: cordwainerDining,
        alt: "Dining room with green velvet chairs around a long table",
      },
    ],
    plan: plans.townhouse,
    nearby: [
      { place: "Market Hall", minutes: 3, by: "walk" },
      { place: "Ellery Station", minutes: 6, by: "walk" },
      { place: "Cordwainer Elementary", minutes: 4, by: "walk" },
    ],
    pin: { x: 520, y: 300 },
    agent: "nora-lindqvist",
  },
  {
    id: "wharf-house-5b",
    address: "Apartment 5B, Wharf House",
    area: "the-docks",
    mode: "buy",
    price: 545000,
    type: "Apartment",
    beds: 2,
    baths: 2,
    sqft: 1080,
    built: 2019,
    taxYear: 6120,
    fees: "$410 / month service charge",
    listed: "2026-10-09",
    headline: "Fifth-floor corner apartment with a balcony over Gull Harbor.",
    description: [
      "5B is the corner apartment on the fifth floor of Wharf House, which means windows on two sides and a balcony long enough for a table of six facing the harbor.",
      "The living room and kitchen share one bright space with a stone island; both bedrooms have built-in wardrobes and the main one has its own shower room. Underfloor heating runs throughout, and the building has a concierge, bike store and one allocated parking bay.",
      "The ferry leaves from Tidewater Quay, a three-minute walk, and the Bonded Store food hall is across the street.",
    ],
    features: [
      "Corner aspect, harbor views",
      "Balcony 18 ft long",
      "Allocated parking bay",
      "Concierge and bike store",
      "Underfloor heating",
      "Lift",
    ],
    images: [
      {
        src: wharfExt,
        alt: "Wharf House, a balconied apartment building in The Docks",
      },
      {
        src: wharfLiving,
        alt: "Open living room with a leather sofa, plants and tall windows",
      },
      {
        src: wharfKitchen,
        alt: "White kitchen with an island, bar stools and black pendant lights",
      },
    ],
    plan: plans.flat,
    nearby: [
      { place: "Tidewater Quay ferry", minutes: 3, by: "walk" },
      { place: "Old Town", minutes: 6, by: "bike" },
      { place: "Ellery Station", minutes: 14, by: "walk" },
    ],
    pin: { x: 880, y: 330 },
    agent: "nora-lindqvist",
  },
  {
    id: "88-larkspur-avenue",
    address: "88 Larkspur Avenue",
    area: "north-quarter",
    mode: "buy",
    price: 725000,
    type: "House",
    beds: 3,
    baths: 2,
    sqft: 1720,
    built: 1924,
    lot: "0.12 acre",
    taxYear: 8210,
    status: "Reduced",
    listed: "2026-09-22",
    headline:
      "A 1924 craftsman bungalow with a deep porch, two blocks from Larkspur Elementary.",
    description: [
      "Everything a North Quarter family asks us for, on one floor: a porch wide enough for a swing, a living room with the original built-in bookcases, and a kitchen at the back that looks onto the garden.",
      "The three bedrooms sit along the quiet side of the house. The bathroom was redone in 2021, and the alley garage has been insulated as a workshop.",
      "Larkspur Elementary is a four-minute walk, and the shops on the avenue are at the end of the block.",
    ],
    features: [
      "Original built-in bookcases",
      "Wide front porch",
      "Insulated garage workshop",
      "Bathroom renewed 2021",
      "South-facing garden",
      "Alley access",
    ],
    images: [
      {
        src: larkspurExt,
        alt: "Craftsman bungalow with a white porch and autumn trees",
      },
      {
        src: larkspurLiving,
        alt: "Living room with shelves, plants and a reading chair",
      },
      {
        src: larkspurBedroom,
        alt: "Bright bedroom with white linen and a window to the garden",
      },
    ],
    plan: plans.bungalow,
    nearby: [
      { place: "Larkspur Elementary", minutes: 4, by: "walk" },
      { place: "Quarry Pond", minutes: 7, by: "walk" },
      { place: "Ellery Station", minutes: 9, by: "bus" },
    ],
    pin: { x: 500, y: 112 },
    agent: "rafael-ortega",
  },
  {
    id: "3-gull-point-road",
    address: "3 Gull Point Road",
    area: "kestrel-hill",
    mode: "buy",
    price: 1450000,
    type: "House",
    beds: 5,
    baths: 3.5,
    sqft: 3600,
    built: 1906,
    lot: "0.6 acre",
    taxYear: 16480,
    status: "New",
    listed: "2026-10-16",
    headline:
      "A shingle house with a wraparound porch and the harbor at the bottom of the lawn.",
    description: [
      "Built in 1906 for a harbor pilot, 3 Gull Point Road sits on the south shoulder of Kestrel Hill with a long lawn falling away to the view. The wraparound porch catches the evening sun on three sides.",
      "Inside, the great room runs the depth of the house, with a kitchen beyond, a study, a formal dining room and a mudroom by the side door. Five bedrooms are spread over the upper two floors, the main suite with a dressing room and its own porch.",
      "The house was restored over two years from 2017, including a new heating system, insulated roof and rebuilt chimneys. It comes to market for the first time in thirty-one years.",
    ],
    features: [
      "Wraparound porch",
      "Harbor views",
      "0.6 acre with mature beeches",
      "Restored 2017–2019",
      "Primary suite with dressing room",
      "Two-car garage",
    ],
    images: [
      {
        src: gullpointExt,
        alt: "Grey shingle house with a white wraparound porch above a green lawn",
      },
      {
        src: gullpointLiving,
        alt: "Great room with leather armchairs and glazed walls",
      },
      {
        src: gullpointBedroom,
        alt: "Main bedroom with an upholstered bed and patterned rug",
      },
    ],
    plan: plans.house,
    nearby: [
      { place: "The Lookout", minutes: 5, by: "walk" },
      { place: "Kestrel Hill School", minutes: 8, by: "walk" },
      { place: "Old Town", minutes: 12, by: "bus" },
    ],
    pin: { x: 196, y: 152 },
    agent: "daniel-osei",
  },
  {
    id: "11-alder-close",
    address: "11 Alder Close",
    area: "ashgrove",
    mode: "buy",
    price: 1180000,
    type: "House",
    beds: 4,
    baths: 3,
    sqft: 2850,
    built: 2021,
    lot: "0.25 acre",
    taxYear: 13350,
    status: "Under offer",
    listed: "2026-09-04",
    headline:
      "Timber-clad new house by a local architect, with the river path at the end of the garden.",
    description: [
      "11 Alder Close was designed by its owners, both architects, on the plot of a 1950s bungalow. It is clad in charred larch, heated by a ground-source heat pump and built to a standard that keeps bills close to zero in summer.",
      "The ground floor is one long room with the kitchen at its centre, a dining table under a double-height void and sliding walls to the garden. Upstairs are four bedrooms and three bathrooms finished in limewash and slate.",
      "The garden gate opens onto the river path, and Alder Bridge takes you into Old Town in eighteen minutes by bike.",
    ],
    features: [
      "Ground-source heat pump",
      "Solar roof, 6.2 kW",
      "Double-height dining space",
      "Direct river-path access",
      "EV charging",
      "Architect-designed, 2021",
    ],
    images: [
      {
        src: alderExt,
        alt: "Timber and black-clad modern house with a glazed ground floor",
      },
      {
        src: alderDining,
        alt: "Dining table under a floating staircase in a light open-plan room",
      },
      {
        src: alderBath,
        alt: "Dark tiled bathroom with a freestanding bath and clerestory window",
      },
    ],
    plan: plans.house,
    nearby: [
      { place: "River path", minutes: 1, by: "walk" },
      { place: "Ashgrove Primary", minutes: 6, by: "walk" },
      { place: "Old Town", minutes: 18, by: "bike" },
    ],
    pin: { x: 210, y: 420 },
    agent: "rafael-ortega",
  },
  {
    id: "27-meadow-lane",
    address: "27 Meadow Lane",
    area: "fenwick-park",
    mode: "buy",
    price: 495000,
    type: "Cottage",
    beds: 2,
    baths: 1,
    sqft: 1050,
    built: 1898,
    lot: "0.08 acre",
    taxYear: 5640,
    listed: "2026-10-01",
    headline:
      "A fisherman's cottage on the common, with a picket fence and a garden room.",
    description: [
      "27 Meadow Lane faces Fenwick Common across a lane that sees perhaps four cars an hour. It is a classic Fenwick cottage: clapboard, a central door, two rooms down and two up, with a garden room added along the side in the 1990s.",
      "The sitting room has a wood stove and the kitchen opens to a back garden with raised beds. Both bedrooms are doubles, and the bathroom has a window over the garden.",
      "The ferry pier is a ten-minute walk, the primary school is on the green, and the Pier Tavern does fish on Fridays.",
    ],
    features: [
      "Facing Fenwick Common",
      "Wood-burning stove",
      "Garden room",
      "Raised vegetable beds",
      "Picket fence and front garden",
      "Ten minutes to the ferry",
    ],
    images: [
      {
        src: meadowExt,
        alt: "White clapboard cottage with a red door behind a picket fence and autumn trees",
      },
      {
        src: meadowLiving,
        alt: "Sitting room with a mustard armchair, floor lamp and framed print",
      },
      {
        src: meadowBedroom,
        alt: "Bedroom with a grey quilt, hanging plants and a rattan lamp",
      },
    ],
    plan: plans.cottage,
    nearby: [
      { place: "Fenwick Common", minutes: 1, by: "walk" },
      { place: "Fenwick Pier ferry", minutes: 10, by: "walk" },
      { place: "The Docks", minutes: 9, by: "ferry" },
    ],
    pin: { x: 600, y: 476 },
    agent: "priya-raman",
  },
  {
    id: "40-mercer-street-3",
    address: "40 Mercer Street, Apt 3",
    area: "old-town",
    mode: "rent",
    price: 2650,
    type: "Apartment",
    beds: 2,
    baths: 1,
    sqft: 900,
    built: 1962,
    fees: "Deposit of one month's rent",
    status: "New",
    listed: "2026-10-15",
    headline:
      "Two-bedroom apartment above Mercer Street, available from 1 November.",
    description: [
      "A third-floor apartment in a small brick building on the quiet end of Mercer Street, freshly painted, with oak floors and windows on both sides.",
      "The living room fits a dining table, the kitchen was replaced last year, and both bedrooms take a double bed. Heat and hot water are included in the rent; electricity and internet are not.",
      "Offered unfurnished on a twelve-month lease. Pets considered.",
    ],
    features: [
      "Available 1 November",
      "Heat and hot water included",
      "Kitchen renewed 2025",
      "Oak floors",
      "Shared laundry",
      "Pets considered",
    ],
    images: [
      {
        src: mercerExt,
        alt: "Brick apartment building with balconies in afternoon light",
      },
      {
        src: mercerLiving,
        alt: "Living room with a red armchair, dining table and open kitchen",
      },
      {
        src: mercerBedroom,
        alt: "Simple bedroom with a black sofa, dresser and floor lamp",
      },
    ],
    plan: plans.flat,
    nearby: [
      { place: "Market Hall", minutes: 4, by: "walk" },
      { place: "Ellery Station", minutes: 5, by: "walk" },
      { place: "Mercer Street Library", minutes: 2, by: "walk" },
    ],
    pin: { x: 680, y: 344 },
    agent: "maeve-callahan",
  },
  {
    id: "6-heron-mews",
    address: "6 Heron Mews",
    area: "the-docks",
    mode: "rent",
    price: 3900,
    type: "Townhouse",
    beds: 3,
    baths: 2.5,
    sqft: 1650,
    built: 2017,
    fees: "Deposit of one month's rent",
    listed: "2026-10-06",
    headline:
      "Three-storey mews house with a garage and a roof terrace, offered furnished.",
    description: [
      "One of eight mews houses built behind the old bonded warehouse, 6 Heron Mews has an integral garage, a kitchen and living floor in the middle and three bedrooms above.",
      "It comes furnished to a good standard, with a roof terrace over the harbor and a heat pump that keeps bills sensible. Available on a one- or two-year lease.",
    ],
    features: [
      "Furnished",
      "Integral garage",
      "Roof terrace",
      "Heat pump",
      "Available now",
      "One- or two-year lease",
    ],
    images: [
      {
        src: heronExt,
        alt: "Modern mews house with a lit doorway and garage at dusk",
      },
      {
        src: heronLiving,
        alt: "Living space with a tan leather sofa, plants and an open kitchen",
      },
      {
        src: heronLounge,
        alt: "Lounge with a blue sofa, herringbone floor and tall windows",
      },
    ],
    plan: plans.townhouse,
    nearby: [
      { place: "Bonded Store", minutes: 2, by: "walk" },
      { place: "Tidewater Quay ferry", minutes: 5, by: "walk" },
      { place: "Old Town", minutes: 7, by: "bike" },
    ],
    pin: { x: 900, y: 214 },
    agent: "maeve-callahan",
  },
  {
    id: "52-quarry-street",
    address: "52 Quarry Street",
    area: "north-quarter",
    mode: "rent",
    price: 3200,
    type: "House",
    beds: 3,
    baths: 2,
    sqft: 1580,
    built: 1931,
    lot: "0.1 acre",
    fees: "Deposit of one month's rent",
    listed: "2026-09-28",
    headline:
      "Family house by Quarry Pond, with a garden and a garage, on a two-year lease.",
    description: [
      "A blue-roofed 1930s house on a corner plot opposite Quarry Pond, let unfurnished on a two-year lease while the owners work abroad.",
      "There is a front room with a bay window, a family room and kitchen at the back, three bedrooms upstairs and a fenced garden. The garage takes one car and a lot of bikes.",
    ],
    features: [
      "Two-year lease",
      "Fenced garden",
      "Single garage",
      "Opposite Quarry Pond",
      "Gas heating",
      "Unfurnished",
    ],
    images: [
      {
        src: quarryExt,
        alt: "Blue-roofed house on a tree-lined street in low autumn sun",
      },
      {
        src: quarryLiving,
        alt: "Family room with armchairs, a fireplace and a dining area beyond",
      },
      {
        src: quarryFront,
        alt: "Front room with a white sofa, cushions and two table lamps",
      },
    ],
    plan: plans.bungalow,
    nearby: [
      { place: "Quarry Pond", minutes: 1, by: "walk" },
      { place: "Quarry Street Montessori", minutes: 3, by: "walk" },
      { place: "Ellery Station", minutes: 11, by: "bus" },
    ],
    pin: { x: 640, y: 150 },
    agent: "maeve-callahan",
  },
];

/* ---------- Selling ---------- */

export const sell = {
  title: "Sell or let with the agents who live on your street",
  intro:
    "Book a valuation and one of us will walk through your home, show you the three sales that set its price and tell you plainly what we would ask. If you decide not to sell, that is the end of it.",
  steps: [
    {
      week: "Week 1",
      title: "Valuation visit",
      text: "An hour in your home with the agent for your area. You get a written figure with comparable sales within two days.",
    },
    {
      week: "Week 2",
      title: "Photographs & particulars",
      text: "Our photographer, a measured floor plan and a written description that we agree with you line by line.",
    },
    {
      week: "Week 3",
      title: "Launch",
      text: "Your home goes to our Thursday list and registered buyers first, then to the portals on Saturday.",
    },
    {
      week: "Weeks 3–6",
      title: "Viewings & offers",
      text: "We host every viewing, report back the same evening and put every offer to you in writing.",
    },
    {
      week: "Weeks 6–14",
      title: "To completion",
      text: "We chase the chain, the surveys and the lawyers, and hand over the keys on the day.",
    },
  ],
  fees: [
    {
      name: "Selling",
      price: "1.25% of the sale price",
      note: "Including photography, floor plan, hosted viewings and sales progression. Nothing until you complete.",
    },
    {
      name: "Letting & managing",
      price: "8% of monthly rent",
      note: "Tenant find, referencing, inventory, rent collection, repairs and a 24-hour line.",
    },
    {
      name: "Tenant find only",
      price: "One month's rent",
      note: "We find, reference and move in your tenant; you manage the tenancy.",
    },
  ],
};

export const homePage = {
  title: "Homes in Port Ellery, sold and let by people who live here.",
  intro:
    "Meridian has sold houses on both banks of the Ellery since 1987. Search the homes on our books this week, or ask us what yours is worth.",
  featured: "3-gull-point-road",
  quote: {
    text: "We had two agents value the house. Meridian's figure was lower, came with the sales to prove it, and was within one percent of what we sold for.",
    by: "Clare & Idris Mensah",
    where: "sold on Larkspur Avenue, spring 2026",
  },
};

export const recentSales = [
  {
    address: "19 Cordwainer Row",
    area: "old-town" as AreaSlug,
    asking: 849000,
    achieved: 861000,
    days: 18,
    agent: "nora-lindqvist",
  },
  {
    address: "Apt 2A, Rope Works",
    area: "the-docks" as AreaSlug,
    asking: 499000,
    achieved: 492500,
    days: 31,
    agent: "nora-lindqvist",
  },
  {
    address: "112 Larkspur Avenue",
    area: "north-quarter" as AreaSlug,
    asking: 695000,
    achieved: 702000,
    days: 12,
    agent: "rafael-ortega",
  },
  {
    address: "Beech House, Gull Point Road",
    area: "kestrel-hill" as AreaSlug,
    asking: 1395000,
    achieved: 1360000,
    days: 44,
    agent: "daniel-osei",
  },
  {
    address: "4 Grove Parade",
    area: "ashgrove" as AreaSlug,
    asking: 975000,
    achieved: 990000,
    days: 21,
    agent: "rafael-ortega",
  },
  {
    address: "15 Meadow Lane",
    area: "fenwick-park" as AreaSlug,
    asking: 469000,
    achieved: 476000,
    days: 9,
    agent: "priya-raman",
  },
  {
    address: "8 Tidewater Quay",
    area: "the-docks" as AreaSlug,
    asking: 615000,
    achieved: 615000,
    days: 26,
    agent: "nora-lindqvist",
  },
  {
    address: "31 Pilot's Walk",
    area: "kestrel-hill" as AreaSlug,
    asking: 1150000,
    achieved: 1172000,
    days: 15,
    agent: "daniel-osei",
  },
  {
    address: "6 Mercer Street",
    area: "old-town" as AreaSlug,
    asking: 729000,
    achieved: 735000,
    days: 14,
    agent: "walter-pryce",
  },
];

export const about = {
  title: "One office on Mercer Street, since 1987",
  intro: [
    "Walter Pryce opened Meridian above a ship's chandler with a single desk and a hand-drawn map of Port Ellery. Thirty-nine years later we have six agents, the same office and a larger copy of the same map.",
    "We have never opened a second branch. Every agent lives in the neighbourhoods they sell, every valuation is done in person, and every phone call is answered by someone who can actually help.",
  ],
  principles: [
    {
      title: "Price it honestly",
      text: "Our valuations come with the comparable sales that justify them. We would rather lose an instruction than win it with a number we cannot achieve.",
    },
    {
      title: "Host every viewing",
      text: "Buyers ask questions that only an agent who knows the house can answer. We are at every viewing, including Saturdays.",
    },
    {
      title: "Write it in plain English",
      text: "Particulars describe the house you will actually walk into: the steep stairs and the north-facing yard as well as the cornices.",
    },
    {
      title: "Answer the phone",
      text: "Our line is staffed until six on weekdays and four on Saturdays. Managed tenants have a 24-hour number for emergencies.",
    },
  ],
  timeline: [
    {
      year: "1987",
      text: "Walter Pryce opens Meridian at 214 Mercer Street with one desk and one phone.",
    },
    {
      year: "1996",
      text: "The lettings desk opens to manage homes for owners working overseas.",
    },
    {
      year: "2008",
      text: "Meridian publishes its sold prices every quarter, the first agent in the city to do so.",
    },
    {
      year: "2016",
      text: "The Thursday list launches: every new home, emailed before it reaches the portals.",
    },
    {
      year: "2026",
      text: "Six agents, 240 managed homes and the same office on Mercer Street.",
    },
  ],
};

export const contact = {
  title: "Come in, call, or write",
  intro:
    "The office is on the corner of Mercer Street and Cordwainer Row, opposite the library. Walk in during opening hours; there is always someone at the front desk.",
  topics: [
    "Buying a home",
    "Selling a home",
    "Renting a home",
    "Letting my property",
    "Something else",
  ],
  officePin: { x: 560, y: 280 },
};
