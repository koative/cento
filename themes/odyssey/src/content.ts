import amalfiPositano from "./assets/amalfi-positano.jpg";
import amalfiBeach from "./assets/amalfi-beach.jpg";
import kyotoTorii from "./assets/kyoto-torii.jpg";
import kyotoTunnel from "./assets/kyoto-tunnel.jpg";
import lisbonBica from "./assets/lisbon-bica.jpg";
import lisbonNight from "./assets/lisbon-night.jpg";
import marrakechSouk from "./assets/marrakech-souk.jpg";
import marrakechFruit from "./assets/marrakech-fruit.jpg";
import icelandSkogafoss from "./assets/iceland-skogafoss.jpg";
import icelandWinter from "./assets/iceland-winter.jpg";
import fjordGeiranger from "./assets/fjord-geiranger.jpg";
import fjordBoat from "./assets/fjord-boat.jpg";
import halongKarsts from "./assets/halong-karsts.jpg";
import halongRocks from "./assets/halong-rocks.jpg";
import namibDune from "./assets/namib-dune.jpg";
import namibDeadvlei from "./assets/namib-deadvlei.jpg";
import bigSur from "./assets/big-sur.jpg";
import atoll from "./assets/atoll.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Odyssey",
  sector: "Travel agency",
  tagline: "Slow journeys, planned by people who have been.",
  email: "hello@odyssey.example",
  phone: "+1 555 014 2290",
  phoneHref: "tel:+15550142290",
  emergency: "+1 555 014 2299",
  address: [
    "Odyssey Journeys",
    "41 Wharf Lane, Third Floor",
    "Portland, ME 04101",
  ],
  hours: [
    ["Monday – Friday", "9:00 – 18:00 ET"],
    ["Saturday", "10:00 – 14:00 ET"],
    ["Travelling with us", "24 hours, every day"],
  ] as const,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/destinations", label: "Destinations" },
  { to: "/journeys", label: "Journeys" },
  { to: "/planner", label: "Planner" },
  { to: "/how-we-work", label: "How we work" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Travel",
    links: [
      { to: "/destinations", label: "All destinations" },
      { to: "/journeys", label: "Set journeys" },
      { to: "/planner", label: "Itinerary planner" },
      { to: "/enquire", label: "Start an enquiry" },
    ],
  },
  {
    title: "Odyssey",
    links: [
      { to: "/about", label: "About & planners" },
      { to: "/how-we-work", label: "How we work & fees" },
      { to: "/journal", label: "Travel journal" },
    ],
  },
];

/* ------------------------------------------------------------ destinations */

export type Region =
  "Europe" | "Africa" | "Asia & Indian Ocean" | "The Americas";
export type Style = "Coast" | "City" | "Mountains" | "Desert" | "Islands";
export const regions: Region[] = [
  "Europe",
  "Africa",
  "Asia & Indian Ocean",
  "The Americas",
];
export const styles: Style[] = [
  "Coast",
  "City",
  "Mountains",
  "Desert",
  "Islands",
];
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Photo = { src: string; alt: string };
/** 2 = our favourite months, 1 = good with caveats, 0 = we would steer you elsewhere. */
export type Rating = 0 | 1 | 2;

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  styles: Style[];
  lat: number;
  lon: number;
  /** Short name on the route chart, placed left of or below the fix where neighbours crowd. */
  chart: string;
  chartAt?: "left" | "below";
  photo: Photo;
  gallery: Photo[];
  summary: string;
  intro: string[];
  flightHours: number;
  flightNote: string;
  timezone: string;
  currency: string;
  idealNights: number;
  /** From-price per person per night, comfortable tier, two sharing. */
  nightly: number;
  highs: number[];
  rating: Rating[];
  seasonNote: string;
  days: { title: string; text: string }[];
  stays: { name: string; kind: string; note: string; nightly: number }[];
  planner: string;
};

export const destinations: Destination[] = [
  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    styles: ["Coast"],
    lat: 40.63,
    chart: "Amalfi",
    lon: 14.48,
    photo: {
      src: amalfiPositano,
      alt: "Positano's pastel houses stacked up a cliff above the sea, framed by pink bougainvillea",
    },
    gallery: [
      {
        src: amalfiBeach,
        alt: "Spiaggia Grande in Positano with swimmers, umbrellas and a small motorboat",
      },
    ],
    summary:
      "Lemon terraces, cliff-stair villages and a sea you can hear from every room.",
    intro: [
      "Forty kilometres of road cut into limestone, with Positano, Amalfi and Ravello hanging off it like balconies. In August it is a traffic jam with a view. In late April or early October it is the most beautiful drive in Europe, and you can still get a table at the trattoria without a booking.",
      "We put people high up, in Ravello or above Praiano, and use the ferries rather than the road. Days are built around one walk and one long lunch; we have never had a client complain about either.",
    ],
    flightHours: 9.5,
    flightNote: "New York to Naples, one stop; 75 min private transfer",
    timezone: "CET, New York + 6 h",
    currency: "Euro",
    idealNights: 5,
    nightly: 240,
    highs: [57, 58, 61, 66, 73, 81, 86, 87, 81, 73, 65, 59],
    rating: [0, 0, 1, 2, 2, 1, 1, 1, 2, 2, 1, 0],
    seasonNote:
      "Many hotels close from November to March. Late April and the first half of October are the sweet spots.",
    days: [
      {
        title: "The Path of the Gods",
        text: "Bomerano to Nocelle on foot, three hours along the cliff edge, then 1,700 steps down into Positano for lunch.",
      },
      {
        title: "A boat, no schedule",
        text: "A wooden gozzo with a skipper from Cetara: swim in the grottoes, eat anchovies where they are caught.",
      },
      {
        title: "Ravello in the morning",
        text: "Villa Cimbrone's terrace before the day buses arrive, then a ceramics workshop in Vietri.",
      },
      {
        title: "Lemons and limoncello",
        text: "A family terrace above Minori: pruning, picking and a long table under the pergola.",
      },
    ],
    stays: [
      {
        name: "Casa Terrazze",
        kind: "Guesthouse, 9 rooms",
        note: "Above Praiano, every room faces west",
        nightly: 240,
      },
      {
        name: "Palazzo Arco",
        kind: "Boutique hotel, 18 rooms",
        note: "Ravello, with a pool on the old citrus terrace",
        nightly: 390,
      },
      {
        name: "Villa Scirocco",
        kind: "Private villa, sleeps 8",
        note: "Positano, a cook and a boat on request",
        nightly: 610,
      },
    ],
    planner: "Lucía Ferraro",
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia & Indian Ocean",
    styles: ["City"],
    lat: 35.01,
    chart: "Kyoto",
    lon: 135.77,
    photo: {
      src: kyotoTorii,
      alt: "Rows of vermilion torii gates on a forested hillside path at Fushimi Inari",
    },
    gallery: [
      {
        src: kyotoTunnel,
        alt: "A walker passing through a tunnel of orange torii gates",
      },
    ],
    summary:
      "Seventeen hundred temples, and the trick of seeing them before nine.",
    intro: [
      "Kyoto rewards the early and the curious. The famous places are famous for good reason, but the city's real pleasure is in its back lanes: a tofu shop that has opened at six for two hundred years, a moss garden you visit by writing a postcard.",
      "We plan Kyoto around the clock rather than the map. The big shrines happen at dawn, the afternoons are for craft workshops and the evenings for a ryokan bath and kaiseki that takes three hours and is worth every minute.",
    ],
    flightHours: 14,
    flightNote: "New York to Osaka Kansai non-stop; 75 min by express train",
    timezone: "JST, New York + 13 h",
    currency: "Japanese yen",
    idealNights: 5,
    nightly: 210,
    highs: [48, 50, 57, 68, 76, 82, 89, 92, 85, 74, 63, 53],
    rating: [1, 1, 2, 2, 2, 0, 0, 0, 1, 2, 2, 1],
    seasonNote:
      "Cherry blossom (late March to early April) and maples (mid-November) book out a year ahead. June is rainy, July and August are fierce.",
    days: [
      {
        title: "Fushimi Inari at dawn",
        text: "The full mountain loop before 7:00, when the gates are yours and the foxes are in shadow.",
      },
      {
        title: "Indigo and lacquer",
        text: "Two workshops in Nishijin with makers who rarely take visitors, translated by our guide Emi.",
      },
      {
        title: "Arashiyama by bicycle",
        text: "Through the bamboo before the crowds, then a river lunch at a soba house upstream.",
      },
      {
        title: "A night in a ryokan",
        text: "Cedar bath, eight-course kaiseki and futons laid while you are at dinner.",
      },
    ],
    stays: [
      {
        name: "Machiya Rokkaku",
        kind: "Restored townhouse, sleeps 4",
        note: "A private house with a garden the size of a rug",
        nightly: 210,
      },
      {
        name: "Hotel Kamo",
        kind: "Design hotel, 30 rooms",
        note: "On the river, ten minutes' walk to Gion",
        nightly: 330,
      },
      {
        name: "Ryokan Hanaori",
        kind: "Traditional inn, 12 rooms",
        note: "Half-board, cedar baths, breakfast at 7",
        nightly: 520,
      },
    ],
    planner: "Aiko Hale",
  },
  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    styles: ["City", "Coast"],
    lat: 38.72,
    chart: "Lisbon",
    chartAt: "left",
    lon: -9.14,
    photo: {
      src: lisbonBica,
      alt: "A yellow funicular tram climbing a steep cobbled street between tiled buildings",
    },
    gallery: [
      { src: lisbonNight, alt: "Tram 28 lit up on a wet street at night" },
    ],
    summary: "Seven hills, yellow trams and the best late supper in Europe.",
    intro: [
      "Lisbon is the easiest first stop from the East Coast and the hardest place to leave. It is a city of viewpoints and staircases, of tiled facades and fish grilled on the pavement, and it sits on an estuary so wide it feels like the sea.",
      "Our Lisbon is a neighbourhood stay in Alfama or Príncipe Real, a day out to the palaces of Sintra by train, and an evening of fado in a room so small the singer stands beside your table.",
    ],
    flightHours: 7,
    flightNote: "New York to Lisbon non-stop; 25 min to the old town",
    timezone: "WET, New York + 5 h",
    currency: "Euro",
    idealNights: 4,
    nightly: 170,
    highs: [59, 61, 65, 67, 71, 77, 82, 83, 80, 72, 64, 60],
    rating: [1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1],
    seasonNote:
      "Lisbon works all year. Midsummer is hot and full; March to June and September to October are ideal.",
    days: [
      {
        title: "Alfama with a historian",
        text: "Three hours with Rui, who grew up here, from the cathedral to the castle by the back stairs.",
      },
      {
        title: "Sintra by train",
        text: "Forty minutes out to forest palaces; we book Pena for opening time and lunch in Colares.",
      },
      {
        title: "Across the river",
        text: "The ferry to Cacilhas for grilled fish on the quay, the cheapest view of the city there is.",
      },
      {
        title: "Fado, properly",
        text: "A tasca in Mouraria where the music starts after ten and nobody is in a hurry.",
      },
    ],
    stays: [
      {
        name: "Casa do Largo",
        kind: "Guesthouse, 11 rooms",
        note: "Alfama, river views from the breakfast room",
        nightly: 170,
      },
      {
        name: "Palácio Verde",
        kind: "Boutique hotel, 24 rooms",
        note: "Príncipe Real, a garden and a library",
        nightly: 290,
      },
    ],
    planner: "Lucía Ferraro",
  },
  {
    slug: "marrakech",
    name: "Marrakech & the High Atlas",
    country: "Morocco",
    region: "Africa",
    styles: ["City", "Mountains", "Desert"],
    lat: 31.63,
    chart: "Marrakech",
    chartAt: "below",
    lon: -7.99,
    photo: {
      src: marrakechSouk,
      alt: "A covered souk in Marrakech with striped light falling through slatted roofing onto shoppers",
    },
    gallery: [
      {
        src: marrakechFruit,
        alt: "A vendor arranging pyramids of oranges, melons and pineapples at a market stall",
      },
    ],
    summary:
      "A riad in the medina, then an hour's drive to snow-capped villages.",
    intro: [
      "Marrakech is loud, scented and wonderful, and it is better in small doses. We pair three nights in a riad behind the souks with three in the High Atlas, where the only sounds are mules and the call to prayer bouncing between valleys.",
      "Every guide we use in the medina is someone we have walked with ourselves. They know the dyers, the leatherworkers and which roof serves the best tagine, and they know when you have had enough.",
    ],
    flightHours: 9,
    flightNote: "New York to Marrakech via Casablanca; 15 min to the medina",
    timezone: "WEST, New York + 5 h",
    currency: "Moroccan dirham",
    idealNights: 6,
    nightly: 160,
    highs: [65, 68, 74, 78, 84, 92, 99, 99, 91, 82, 73, 66],
    rating: [1, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
    seasonNote:
      "Summer in the city regularly passes 100°F. Spring and autumn are the long sweet seasons; winter nights are cold in the mountains.",
    days: [
      {
        title: "The souks with Youssef",
        text: "Dyers, coppersmiths and spice merchants, then mint tea on a roof above the square.",
      },
      {
        title: "A hammam and a long lunch",
        text: "A traditional scrub in a neighbourhood hammam, followed by an afternoon in a garden.",
      },
      {
        title: "Into the Atlas",
        text: "Ninety minutes to Imlil, then a mule path to a kasbah with a view of Toubkal.",
      },
      {
        title: "Village to village",
        text: "A five-hour walk through walnut groves with lunch cooked in a Berber house.",
      },
    ],
    stays: [
      {
        name: "Riad Zitoun",
        kind: "Riad, 7 rooms",
        note: "A plunge pool, a roof terrace, five minutes from the square",
        nightly: 160,
      },
      {
        name: "Kasbah Assif",
        kind: "Mountain lodge, 14 rooms",
        note: "Imlil valley, hammam and fireplaces",
        nightly: 220,
      },
    ],
    planner: "Mara Okafor",
  },
  {
    slug: "south-iceland",
    name: "Iceland's South Coast",
    country: "Iceland",
    region: "Europe",
    styles: ["Coast", "Mountains"],
    lat: 63.53,
    chart: "Vík",
    lon: -19.51,
    photo: {
      src: icelandSkogafoss,
      alt: "Skógafoss waterfall plunging between green cliffs, with tiny figures on the gravel below",
    },
    gallery: [
      {
        src: icelandWinter,
        alt: "Skógafoss in winter, its cliffs crusted in ice and snow",
      },
    ],
    summary: "Waterfalls, black sand and a glacier lagoon, at your own speed.",
    intro: [
      "Route One runs along the south coast from Reykjavík to the glacier lagoon at Jökulsárlón, and almost every famous Icelandic photograph is a short walk from it. The art is in pacing: three bases rather than seven, and the big sights at the edges of the day.",
      "We plan self-drive for confident drivers and a private driver-guide for everyone else, especially between November and March, when daylight is short and the weather has opinions.",
    ],
    flightHours: 5.75,
    flightNote: "New York to Reykjavík non-stop; car collected at the airport",
    timezone: "GMT, New York + 4 h",
    currency: "Icelandic króna",
    idealNights: 6,
    nightly: 290,
    highs: [37, 37, 38, 42, 48, 53, 56, 55, 50, 44, 39, 37],
    rating: [1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    seasonNote:
      "May to September brings long light and open roads. Winter trades daylight for aurora and ice caves; we only plan it with a driver.",
    days: [
      {
        title: "Seljalandsfoss and Skógafoss",
        text: "Behind one waterfall and up the 527 steps beside the other, before the coaches.",
      },
      {
        title: "A glacier walk",
        text: "Crampons and a guide on Sólheimajökull, three hours on the ice.",
      },
      {
        title: "Black sand at Reynisfjara",
        text: "Basalt columns and sea stacks at low tide, with a guide who reads the waves.",
      },
      {
        title: "Jökulsárlón by boat",
        text: "Icebergs calving into the lagoon, then Diamond Beach at golden hour.",
      },
    ],
    stays: [
      {
        name: "Hlíð Farm Rooms",
        kind: "Farm guesthouse, 10 rooms",
        note: "Near Vík, a hot tub facing the mountains",
        nightly: 290,
      },
      {
        name: "Fjallsárlón Lodge",
        kind: "Lodge, 22 rooms",
        note: "Under the glacier, northern-lights wake-up calls",
        nightly: 420,
      },
    ],
    planner: "Tomasz Wren",
  },
  {
    slug: "big-sur",
    name: "Big Sur",
    country: "California, USA",
    region: "The Americas",
    styles: ["Coast", "Mountains"],
    lat: 36.27,
    chart: "Big Sur",
    lon: -121.81,
    photo: {
      src: bigSur,
      alt: "A turquoise cove at Big Sur with a waterfall dropping onto the beach, seen through cypress branches",
    },
    gallery: [],
    summary: "Ninety miles of cliff road where the redwoods meet the Pacific.",
    intro: [
      "Highway One between Carmel and San Simeon is the closest thing America has to the Amalfi Coast, and it is quieter. There are no towns to speak of, only a handful of inns, a bakery or two and the cliffs.",
      "We slow it down to a walk: two bases, no more than ninety minutes' driving a day, and trailheads chosen for the light. Big Sur is on the doorstep for most of our clients, and still the trip they talk about longest.",
    ],
    flightHours: 6.5,
    flightNote: "New York to San José non-stop; 2 h drive to Carmel",
    timezone: "PT, New York − 3 h",
    currency: "US dollar",
    idealNights: 4,
    nightly: 280,
    highs: [60, 61, 62, 64, 66, 68, 70, 71, 73, 71, 65, 60],
    rating: [1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 1],
    seasonNote:
      "June fog can hide the coast for days. September and October are the clearest months; spring brings wildflowers and whales.",
    days: [
      {
        title: "McWay Falls and the Overlook Trail",
        text: "A ten-minute walk to the view everyone knows, timed for afternoon light.",
      },
      {
        title: "Into the redwoods",
        text: "Pfeiffer Big Sur's Valley View loop, then lunch on a deck six hundred feet above the sea.",
      },
      {
        title: "Point Lobos at low tide",
        text: "Sea otters, tide pools and the cypress grove, with a naturalist.",
      },
      {
        title: "Elephant seals and Hearst",
        text: "South to Piedras Blancas and the castle on the hill, then a quiet drive back at sunset.",
      },
    ],
    stays: [
      {
        name: "Partington Inn",
        kind: "Cliff inn, 16 rooms",
        note: "Wood stoves, no televisions",
        nightly: 280,
      },
      {
        name: "Sycamore Cabins",
        kind: "Cabins in the canyon",
        note: "A creek, a hot tub and stars",
        nightly: 360,
      },
    ],
    planner: "Mara Okafor",
  },
  {
    slug: "baa-atoll",
    name: "Baa Atoll",
    country: "Maldives",
    region: "Asia & Indian Ocean",
    styles: ["Islands", "Coast"],
    lat: 5.1,
    chart: "Baa Atoll",
    lon: 73.0,
    photo: {
      src: atoll,
      alt: "A thatched overwater restaurant on a white-sand island beside a turquoise lagoon",
    },
    gallery: [],
    summary:
      "A UNESCO reef, a manta bay and an island you can walk around in twenty minutes.",
    intro: [
      "Baa Atoll is a biosphere reserve thirty-five minutes by seaplane from Malé, and home to Hanifaru Bay, where hundreds of manta rays gather to feed between June and November. It is the reason we send people here rather than to the larger resorts nearer the capital.",
      "We choose islands for their house reef and their marine biologists rather than their villas, and we are happy to say which famous names we would avoid.",
    ],
    flightHours: 18,
    flightNote: "New York to Malé via Doha; 35 min by seaplane",
    timezone: "MVT, New York + 9 h",
    currency: "Rufiyaa (US dollars widely used)",
    idealNights: 6,
    nightly: 520,
    highs: [86, 87, 88, 89, 88, 87, 86, 86, 86, 86, 86, 86],
    rating: [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
    seasonNote:
      "December to April is dry and calm. The wet season brings short storms, lower prices and the manta gatherings at Hanifaru.",
    days: [
      {
        title: "The house reef",
        text: "A snorkel guide on day one, then the reef is yours from your own steps.",
      },
      {
        title: "Hanifaru Bay",
        text: "In season, a ranger-led snorkel among feeding mantas; limited to eighty swimmers a day.",
      },
      {
        title: "A sandbank lunch",
        text: "A dhoni to a strip of sand with a table, an umbrella and nothing else.",
      },
      {
        title: "Reef science",
        text: "An afternoon with the island's marine biologist planting coral fragments.",
      },
    ],
    stays: [
      {
        name: "Fushi Island",
        kind: "Island resort, 40 villas",
        note: "Beach villas only, a famous house reef",
        nightly: 520,
      },
      {
        name: "Velaa Lagoon Retreat",
        kind: "Island resort, 26 villas",
        note: "Overwater, ten minutes from Hanifaru",
        nightly: 840,
      },
    ],
    planner: "Dev Raman",
  },
  {
    slug: "norwegian-fjords",
    name: "The Norwegian Fjords",
    country: "Norway",
    region: "Europe",
    styles: ["Mountains", "Coast"],
    lat: 62.1,
    chart: "Geiranger",
    lon: 7.21,
    photo: {
      src: fjordGeiranger,
      alt: "Geirangerfjord seen from above, with steep green mountainsides and a village at the water's edge",
    },
    gallery: [
      {
        src: fjordBoat,
        alt: "A small boat dwarfed by cliffs on a dark fjord under heavy cloud",
      },
    ],
    summary:
      "Fjord ferries, mountain farms and light that lasts until midnight.",
    intro: [
      "Western Norway is a country of water: fjords, waterfalls, glaciers, lakes, and ferries that are simply part of the road. Geiranger and Nærøyfjord are both UNESCO-listed, and both are best seen from a small boat or from a farm on the slope above.",
      "We use trains, ferries and a little driving, and we stay out of the cruise-ship ports at the times the ships arrive. That one rule changes everything.",
    ],
    flightHours: 9,
    flightNote: "New York to Ålesund via Oslo; 2 h scenic drive",
    timezone: "CET, New York + 6 h",
    currency: "Norwegian krone",
    idealNights: 5,
    nightly: 260,
    highs: [36, 38, 43, 50, 59, 65, 68, 66, 59, 50, 41, 37],
    rating: [0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0],
    seasonNote:
      "Mountain roads open in late May. June and July bring near-endless light; September is quieter and golden.",
    days: [
      {
        title: "Geiranger by kayak",
        text: "A guided paddle under the Seven Sisters waterfall, early, before the ships.",
      },
      {
        title: "A farm on the cliff",
        text: "The hike to Skageflå, a summer farm with no road, five hundred metres above the water.",
      },
      {
        title: "The Flåm Railway",
        text: "Twenty kilometres and nine hundred metres of descent, then a fjord ferry onward.",
      },
      {
        title: "Trollstigen",
        text: "Eleven hairpins up the Troll's Path, with a stop at the viewing platform.",
      },
    ],
    stays: [
      {
        name: "Union Fjordhotel",
        kind: "Historic hotel, 30 rooms",
        note: "A wooden dragon-style hotel on the water",
        nightly: 260,
      },
      {
        name: "Juvet Cabins",
        kind: "Landscape cabins, 9 units",
        note: "Glass walls facing a river gorge",
        nightly: 410,
      },
    ],
    planner: "Tomasz Wren",
  },
  {
    slug: "ha-long-bay",
    name: "Ha Long Bay",
    country: "Vietnam",
    region: "Asia & Indian Ocean",
    styles: ["Islands", "Coast"],
    lat: 20.91,
    chart: "Ha Long",
    lon: 107.18,
    photo: {
      src: halongKarsts,
      alt: "Limestone karst islands rising from calm green-blue water in Ha Long Bay",
    },
    gallery: [
      {
        src: halongRocks,
        alt: "Two rock pillars standing in misty water with more karsts behind",
      },
    ],
    summary:
      "Two thousand limestone islands, seen from a junk that skips the crowded routes.",
    intro: [
      "Ha Long's karsts are among the most extraordinary seascapes on earth, and among the busiest. We send people into Bai Tu Long and Lan Ha bays next door, where the islands are just as dramatic and the boats far fewer.",
      "Our cruises are two nights on a junk with no more than ten cabins, with a kayak, a cook and a captain who has worked these waters for twenty years.",
    ],
    flightHours: 20,
    flightNote: "New York to Hanoi via Seoul; 2 h 30 by road to the bay",
    timezone: "ICT, New York + 11 h",
    currency: "Vietnamese dong",
    idealNights: 3,
    nightly: 150,
    highs: [66, 66, 70, 77, 86, 89, 90, 89, 87, 82, 76, 70],
    rating: [1, 1, 2, 2, 2, 1, 0, 0, 1, 2, 2, 1],
    seasonNote:
      "March to May and October to November are calm and clear. Summer brings storms; winter is cool and often misty.",
    days: [
      {
        title: "Into Bai Tu Long",
        text: "Board at Hon Gai and sail east, away from the main route, for a swim before lunch.",
      },
      {
        title: "Kayak the lagoons",
        text: "Paddle through low cave arches into lagoons enclosed by cliffs.",
      },
      {
        title: "A floating village",
        text: "Vung Vieng by rowing boat, with a fisherman who still lives on the water.",
      },
      {
        title: "Sunrise tai chi",
        text: "On the top deck with the cook, before breakfast and the first coffee.",
      },
    ],
    stays: [
      {
        name: "Junk Hải Âu",
        kind: "Private junk, 8 cabins",
        note: "Two nights, full board",
        nightly: 150,
      },
      {
        name: "Dragon Bay Suites",
        kind: "Junk, 10 suites",
        note: "Balcony cabins, a cookery class on board",
        nightly: 240,
      },
    ],
    planner: "Aiko Hale",
  },
  {
    slug: "namib-desert",
    name: "The Namib Desert",
    country: "Namibia",
    region: "Africa",
    styles: ["Desert"],
    lat: -24.73,
    chart: "Sossusvlei",
    lon: 15.29,
    photo: {
      src: namibDune,
      alt: "A tall red dune rising behind a camel-thorn tree on the flat pale floor of Sossusvlei",
    },
    gallery: [
      {
        src: namibDeadvlei,
        alt: "A dead camel-thorn tree on a white clay pan with red dunes on the horizon",
      },
    ],
    summary:
      "The oldest desert on earth, red dunes and the quietest nights you will know.",
    intro: [
      "Sossusvlei is a clay pan ringed by some of the tallest dunes on the planet, and Deadvlei, beside it, is a stand of camel-thorn trees that died nine hundred years ago and never fell. You reach both at sunrise or not at all.",
      "We base people in the private reserve on the park edge, so you are through the gate first, and we add a night under the stars in a sleep-out deck with nothing between you and the Milky Way.",
    ],
    flightHours: 17,
    flightNote: "New York to Windhoek via Johannesburg; 55 min light aircraft",
    timezone: "CAT, New York + 6 h",
    currency: "Namibian dollar",
    idealNights: 4,
    nightly: 340,
    highs: [95, 92, 90, 86, 81, 77, 77, 81, 86, 91, 93, 95],
    rating: [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    seasonNote:
      "April to October is dry and mild by day, cold at night. December to February is scorching; we plan around it.",
    days: [
      {
        title: "Dune 45 at sunrise",
        text: "Through the park gate at first light and up the ridge before the sand heats.",
      },
      {
        title: "Deadvlei on foot",
        text: "A guided walk across the pan, with the story of every tree.",
      },
      {
        title: "Sesriem Canyon",
        text: "A narrow gorge cut thirty metres into the gravel, cool even at midday.",
      },
      {
        title: "A night on the deck",
        text: "A bedroll under the open sky with a ranger and a star chart.",
      },
    ],
    stays: [
      {
        name: "Kulala Desert Camp",
        kind: "Tented camp, 23 units",
        note: "Private gate into the park",
        nightly: 340,
      },
      {
        name: "Sossus Dune House",
        kind: "Lodge, 10 chalets",
        note: "Inside the park, a pool facing the dunes",
        nightly: 480,
      },
    ],
    planner: "Dev Raman",
  },
];

export const destinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);

/* ---------------------------------------------------------------- journeys */

export type Journey = {
  slug: string;
  name: string;
  summary: string;
  stops: { slug: string; nights: number }[];
  priceFrom: number;
  pace: "Easy" | "Moderate" | "Active";
  months: number[];
  photo: Photo;
  itinerary: { days: string; place: string; title: string; text: string }[];
  included: string[];
};

export const journeys: Journey[] = [
  {
    slug: "the-atlantic-rim",
    name: "The Atlantic Rim",
    summary:
      "Lisbon's hills, a short hop south and a week split between the souks and the High Atlas.",
    stops: [
      { slug: "lisbon", nights: 4 },
      { slug: "marrakech", nights: 6 },
    ],
    priceFrom: 5890,
    pace: "Easy",
    months: [2, 3, 4, 9, 10],
    photo: {
      src: marrakechSouk,
      alt: "Light falling through slatted roofing over a covered souk in Marrakech",
    },
    itinerary: [
      {
        days: "1–4",
        place: "Lisbon",
        title: "Tiled hills and late suppers",
        text: "A guesthouse in Alfama, a morning with a local historian, and a day out to the palaces of Sintra by train.",
      },
      {
        days: "5",
        place: "Lisbon → Marrakech",
        title: "A short flight south",
        text: "Ninety minutes in the air; a driver meets you and walks you into the medina to your riad.",
      },
      {
        days: "5–8",
        place: "Marrakech",
        title: "Inside the medina walls",
        text: "The souks with Youssef, a neighbourhood hammam, and dinner on a roof as the square lights up.",
      },
      {
        days: "8–11",
        place: "High Atlas",
        title: "Up into the mountains",
        text: "A kasbah in the Imlil valley, walks between Berber villages and mint tea at altitude.",
      },
    ],
    included: [
      "10 nights in hand-picked guesthouses and a riad",
      "Lisbon to Marrakech flight",
      "All private transfers",
      "Three guided days",
      "Breakfast daily, two dinners",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "north-atlantic-light",
    name: "North Atlantic Light",
    summary:
      "Fjord ferries and mountain farms in Norway, then Iceland's south coast under the midnight sun.",
    stops: [
      { slug: "norwegian-fjords", nights: 5 },
      { slug: "south-iceland", nights: 6 },
    ],
    priceFrom: 8740,
    pace: "Moderate",
    months: [5, 6, 7, 8],
    photo: {
      src: fjordGeiranger,
      alt: "Geirangerfjord from above, with a village at the water's edge",
    },
    itinerary: [
      {
        days: "1–3",
        place: "Geiranger",
        title: "The fjord before the ships",
        text: "A wooden hotel on the water, a kayak under the Seven Sisters and the hike to Skageflå.",
      },
      {
        days: "4–6",
        place: "Flåm & Nærøyfjord",
        title: "Rail and ferry",
        text: "The Flåm Railway down to the water, then the narrowest fjord in Norway by electric boat.",
      },
      {
        days: "6",
        place: "Bergen → Reykjavík",
        title: "Across the North Atlantic",
        text: "A two-hour flight; your car or driver-guide waits at Keflavík.",
      },
      {
        days: "7–12",
        place: "South Coast",
        title: "Waterfalls and ice",
        text: "Three bases along Route One: a glacier walk, black-sand beaches and the lagoon at Jökulsárlón.",
      },
    ],
    included: [
      "11 nights in historic hotels, farms and lodges",
      "Bergen to Reykjavík flight",
      "Norway rail and ferry passes",
      "Glacier walk and kayak guides",
      "Breakfast daily",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "lanterns-and-limestone",
    name: "Lanterns & Limestone",
    summary:
      "Kyoto's temples at dawn and its craftsmen by day, then two nights on a junk among the karsts.",
    stops: [
      { slug: "kyoto", nights: 6 },
      { slug: "ha-long-bay", nights: 3 },
    ],
    priceFrom: 7250,
    pace: "Moderate",
    months: [2, 3, 9, 10],
    photo: {
      src: kyotoTorii,
      alt: "Vermilion torii gates on a forested path at Fushimi Inari",
    },
    itinerary: [
      {
        days: "1–4",
        place: "Kyoto",
        title: "Before nine",
        text: "Fushimi Inari at dawn, Arashiyama by bicycle and two workshops in Nishijin.",
      },
      {
        days: "5–6",
        place: "Kyoto",
        title: "A night in a ryokan",
        text: "Cedar baths and a three-hour kaiseki in a twelve-room inn.",
      },
      {
        days: "7",
        place: "Osaka → Hanoi",
        title: "South to Vietnam",
        text: "A morning flight and an evening walk around Hoàn Kiếm Lake with a street-food guide.",
      },
      {
        days: "8–10",
        place: "Bai Tu Long Bay",
        title: "Two nights on the water",
        text: "A junk with eight cabins, kayaks through cave arches and a floating village by rowing boat.",
      },
    ],
    included: [
      "9 nights in a townhouse, a ryokan and a private junk",
      "Osaka to Hanoi flight",
      "Japan Rail transfers and IC cards",
      "Four guided days",
      "Breakfast daily, cruise full board",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "bay-to-atoll",
    name: "Bay to Atoll",
    summary:
      "Limestone and junks in the north of Vietnam, then a week of reef and seaplane in the Maldives.",
    stops: [
      { slug: "ha-long-bay", nights: 3 },
      { slug: "baa-atoll", nights: 7 },
    ],
    priceFrom: 9980,
    pace: "Easy",
    months: [0, 1, 2, 11],
    photo: {
      src: atoll,
      alt: "A thatched overwater restaurant beside a turquoise lagoon",
    },
    itinerary: [
      {
        days: "1",
        place: "Hanoi",
        title: "Arrive and slow down",
        text: "A heritage hotel in the Old Quarter and an early night.",
      },
      {
        days: "2–4",
        place: "Bai Tu Long Bay",
        title: "The quiet bay",
        text: "Two nights on a small junk, a cookery class on deck and a sunrise swim.",
      },
      {
        days: "5",
        place: "Hanoi → Malé",
        title: "Into the Indian Ocean",
        text: "A flight via Kuala Lumpur, then the seaplane over the atolls at golden hour.",
      },
      {
        days: "5–11",
        place: "Baa Atoll",
        title: "A week on the reef",
        text: "A beach villa, a house reef from your steps and a morning planting coral with the island's biologist.",
      },
    ],
    included: [
      "10 nights including a beach villa and a private junk",
      "Hanoi to Malé flight and seaplane",
      "All transfers",
      "Snorkel guide and reef programme",
      "Half board in the Maldives",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "highway-one-slowly",
    name: "Highway One, Slowly",
    summary:
      "Carmel to San Simeon in a week, with two inns, no rush and the light chosen for every trail.",
    stops: [{ slug: "big-sur", nights: 7 }],
    priceFrom: 4960,
    pace: "Easy",
    months: [3, 4, 8, 9, 10],
    photo: {
      src: bigSur,
      alt: "A turquoise cove with a waterfall falling onto the beach at Big Sur",
    },
    itinerary: [
      {
        days: "1–2",
        place: "Carmel",
        title: "Start at the edge",
        text: "A cottage inn by the beach, Point Lobos at low tide with a naturalist.",
      },
      {
        days: "3–5",
        place: "Big Sur",
        title: "The cliffs",
        text: "An inn with wood stoves, McWay Falls in afternoon light and the redwoods of Pfeiffer.",
      },
      {
        days: "6–8",
        place: "Cambria",
        title: "Seals and a castle",
        text: "Elephant seals at Piedras Blancas, Hearst Castle and a slow drive back north.",
      },
    ],
    included: [
      "7 nights in two cliff inns and a cottage",
      "Convertible or SUV rental",
      "Naturalist-led morning at Point Lobos",
      "Hearst Castle evening tour",
      "Breakfast daily",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "the-lemon-coast",
    name: "The Lemon Coast",
    summary:
      "A week above the Amalfi Coast with the ferries instead of the road and one long lunch a day.",
    stops: [{ slug: "amalfi-coast", nights: 7 }],
    priceFrom: 4480,
    pace: "Active",
    months: [3, 4, 8, 9],
    photo: {
      src: amalfiPositano,
      alt: "Positano's houses on the cliff, framed by bougainvillea",
    },
    itinerary: [
      {
        days: "1–3",
        place: "Praiano",
        title: "Up high",
        text: "A nine-room guesthouse facing west, the Path of the Gods and a swim at Marina di Praia.",
      },
      {
        days: "4–5",
        place: "On the water",
        title: "A boat and a skipper",
        text: "A wooden gozzo from Cetara to the grottoes, anchovies for lunch where they are caught.",
      },
      {
        days: "6–8",
        place: "Ravello",
        title: "Gardens and ceramics",
        text: "Villa Cimbrone before the buses, a workshop in Vietri and a family lemon terrace.",
      },
    ],
    included: [
      "7 nights in a guesthouse and a boutique hotel",
      "Private transfers from Naples",
      "A full day with boat and skipper",
      "Guided walk on the Path of the Gods",
      "Breakfast daily, one terrace lunch",
      "Our 24-hour line while you travel",
    ],
  },
  {
    slug: "the-red-dunes",
    name: "The Red Dunes",
    summary:
      "Six nights at the edge of the Namib: the first through the gate at dawn and a night under the stars.",
    stops: [{ slug: "namib-desert", nights: 6 }],
    priceFrom: 6320,
    pace: "Active",
    months: [3, 4, 5, 6, 7, 8, 9],
    photo: {
      src: namibDune,
      alt: "A red dune behind a camel-thorn tree in Sossusvlei",
    },
    itinerary: [
      {
        days: "1",
        place: "Windhoek",
        title: "Arrive in the highlands",
        text: "A guest farm outside the city and a long dinner on the stoep.",
      },
      {
        days: "2–5",
        place: "Sossusvlei",
        title: "Through the gate first",
        text: "Dune 45 at sunrise, Deadvlei on foot and Sesriem Canyon at midday.",
      },
      {
        days: "5–7",
        place: "NamibRand",
        title: "The quiet reserve",
        text: "A sleep-out deck under one of the darkest skies on earth, and a walk with a ranger.",
      },
    ],
    included: [
      "6 nights in a guest farm, a tented camp and a reserve lodge",
      "Light-aircraft flights",
      "Guided Sossusvlei and Deadvlei",
      "Full board in the desert",
      "Park fees",
      "Our 24-hour line while you travel",
    ],
  },
];

export const journeyBySlug = (slug: string) =>
  journeys.find((j) => j.slug === slug);

/* ----------------------------------------------------------------- planner */

export const tiers = [
  {
    id: "comfortable",
    label: "Comfortable",
    note: "Characterful guesthouses and small hotels",
    factor: 1,
  },
  {
    id: "boutique",
    label: "Boutique",
    note: "Design hotels, best rooms, a guide most days",
    factor: 1.45,
  },
  {
    id: "exceptional",
    label: "Exceptional",
    note: "Our finest places, private guides throughout",
    factor: 2.3,
  },
] as const;
export type TierId = (typeof tiers)[number]["id"];

/** Per-person cost we budget for a leg between stops. */
export const legCost = { rail: 90, flight: 260 } as const;
export const planningFee = 250;

/* ------------------------------------------------------------------ people */

export type Planner = {
  name: string;
  role: string;
  regions: string;
  since: number;
  bio: string;
  initials: string;
};

export const planners: Planner[] = [
  {
    name: "Mara Okafor",
    initials: "MO",
    role: "Founder",
    regions: "Morocco, California",
    since: 2009,
    bio: "Spent eleven years leading walking trips in the Atlas before deciding the planning was the part she loved. Still answers the night line one week a month.",
  },
  {
    name: "Lucía Ferraro",
    initials: "LF",
    role: "Senior planner",
    regions: "Italy, Portugal",
    since: 2013,
    bio: "Grew up between Naples and Porto and has eaten in more trattorias on the Amalfi Coast than anyone should admit to.",
  },
  {
    name: "Tomasz Wren",
    initials: "TW",
    role: "Planner",
    regions: "Norway, Iceland",
    since: 2016,
    bio: "A former ferry deckhand on the Hurtigruten coast who knows which Icelandic roads close first in October.",
  },
  {
    name: "Aiko Hale",
    initials: "AH",
    role: "Planner",
    regions: "Japan, Vietnam",
    since: 2017,
    bio: "Half-Japanese, raised in Seattle, fluent in the art of getting a table at an eight-seat counter in Gion.",
  },
  {
    name: "Dev Raman",
    initials: "DR",
    role: "Planner",
    regions: "Namibia, the Maldives",
    since: 2019,
    bio: "A marine biologist by training who joined us after three seasons running a reef programme in Baa Atoll.",
  },
];

export const testimonials = [
  {
    quote:
      "Every morning had one thing in it, and it was always the right thing. We came home rested, which has never happened before.",
    name: "Ruth & Daniel K.",
    trip: "The Atlantic Rim, October",
  },
  {
    quote:
      "When the ferry was cancelled in Flåm, Tomasz had a car and a new room for us before we had finished reading the notice.",
    name: "Priya S.",
    trip: "North Atlantic Light, June",
  },
  {
    quote:
      "Aiko found us a kaiseki counter with six seats. My father still talks about the eel.",
    name: "James T.",
    trip: "Lanterns & Limestone, November",
  },
];

/* --------------------------------------------------------------- how we work */

export const process = [
  {
    title: "A conversation",
    text: "Thirty minutes on the phone or video with the planner who knows the region best. We ask about the last trip you loved, and the one you didn't.",
  },
  {
    title: "A first route in five working days",
    text: "A written itinerary with places to stay, a rough day-by-day and a price. Two rounds of changes are part of the planning fee.",
  },
  {
    title: "We book, you get the dossier",
    text: "We hold every room, guide and transfer, then send a printed dossier and the same thing on your phone, offline.",
  },
  {
    title: "On the road, a person answers",
    text: "One number, twenty-four hours a day, answered by a planner rather than a call centre. Most calls take three minutes.",
  },
];

export const fees = [
  {
    label: "Planning fee",
    value: "$250 per trip",
    note: "Credited in full against your booking.",
  },
  { label: "Deposit", value: "20%", note: "Due when you confirm the route." },
  {
    label: "Balance",
    value: "70 days before departure",
    note: "Paid by bank transfer or card, no surcharge.",
  },
  {
    label: "Changes",
    value: "Free until 60 days out",
    note: "After that, we pass on only what suppliers charge.",
  },
];

export const faqs = [
  {
    q: "Do you book international flights?",
    a: "We can, and about half our travellers ask us to. Many prefer to use their own miles; we then plan the ground arrangements around the flights they choose.",
  },
  {
    q: "What is the smallest trip you plan?",
    a: "Five nights in one place. Below that, the planning fee stops making sense for you, and we will happily point you to a hotel we like instead.",
  },
  {
    q: "Do you take group or family bookings?",
    a: "Families and friends travelling together, yes, up to twelve people. We do not run scheduled group departures.",
  },
  {
    q: "How is my money protected?",
    a: "Client payments are held in a separate trust account until your trip is complete, and every booking carries supplier-failure cover at no extra charge.",
  },
  {
    q: "Can I change the route after booking?",
    a: "Yes. Changes are free until 60 days before departure; after that we pass on only what hotels and suppliers charge us, with no admin fee on top.",
  },
  {
    q: "What happens if something goes wrong while I'm away?",
    a: "Call the number in your dossier. A planner answers, day or night, and has your full itinerary and every supplier's direct line in front of them.",
  },
  {
    q: "Is travel insurance included?",
    a: "No, but we require it and will send a short list of policies that cover the activities on your route.",
  },
];

/* ----------------------------------------------------------------- journal */

export type Article = {
  slug: string;
  title: string;
  dek: string;
  author: string;
  date: string;
  minutes: number;
  destination: string;
  photo: Photo;
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "kyoto-before-nine",
    title: "Kyoto before nine",
    dek: "Why every Kyoto day we plan starts in the dark, and what you get for the alarm clock.",
    author: "Aiko Hale",
    date: "2026-09-22",
    minutes: 6,
    destination: "kyoto",
    photo: {
      src: kyotoTunnel,
      alt: "A walker in a tunnel of orange torii gates at Fushimi Inari",
    },
    body: [
      {
        paragraphs: [
          "At ten in the morning, Fushimi Inari is a queue. At six it is a mountain. The ten thousand gates are the same gates, but the sound changes: crows instead of selfie sticks, your own footsteps on the stone, a priest sweeping leaves somewhere above you.",
          "We have planned Kyoto for nine years, and the one rule that has never failed is to give the big places to the dawn. It costs you a little sleep. It gives you back the city.",
        ],
      },
      {
        heading: "The early circuit",
        paragraphs: [
          "Our standard first morning starts with a taxi at 5:40 to the lower shrine, the full loop to the summit and back by 8:00, then breakfast at a tofu house that has opened at seven since the Edo period.",
          "On the second morning we send people to Kiyomizu-dera for the opening at six, and walk them down through Sannenzaka while the shopkeepers are still hosing the steps.",
        ],
      },
      {
        heading: "What the afternoons are for",
        paragraphs: [
          "If the mornings are for temples, the afternoons belong to people: the indigo dyer in Nishijin, the lacquer workshop that has three visitors a month, the knife sharpener near Nishiki who will look at your own knife if you bring it.",
          "And the evenings belong to dinner. A good kaiseki takes three hours. By then you will have been awake for sixteen, and you will sleep like a stone.",
        ],
      },
    ],
  },
  {
    slug: "iceland-in-february",
    title: "Iceland in February is not a mistake",
    dek: "Five hours of daylight, frozen waterfalls and the best argument for a driver-guide we know.",
    author: "Tomasz Wren",
    date: "2026-08-30",
    minutes: 5,
    destination: "south-iceland",
    photo: {
      src: icelandWinter,
      alt: "Skógafoss in winter with ice-crusted cliffs",
    },
    body: [
      {
        paragraphs: [
          "Most people who ask us about Iceland ask about June, and June is wonderful. But some of the best trips we have planned were in February, when Skógafoss freezes at the edges and the beaches at Vík turn from black to silver.",
          "Winter in Iceland is a different country. The roads are fewer, the days are short, the light is low and gold for hours, and in the dark there is a decent chance of aurora.",
        ],
      },
      {
        heading: "Why we insist on a driver",
        paragraphs: [
          "We do not plan winter self-drive. Not because our clients cannot drive, but because the weather on Route One can change in twenty minutes and the people who know when to turn around are the people who grew up there.",
          "A driver-guide also means you look out of the window. That is the point.",
        ],
      },
      {
        heading: "What to pack",
        paragraphs: [
          "Microspikes for your boots, a down layer, a waterproof shell, and a thermos. Everything else, including the glacier crampons, we arrange locally.",
        ],
      },
    ],
  },
  {
    slug: "the-tram-that-climbs",
    title: "The tram that climbs",
    dek: "An evening on Lisbon's Tram 28, and the case for riding it at the wrong time of day.",
    author: "Lucía Ferraro",
    date: "2026-08-04",
    minutes: 4,
    destination: "lisbon",
    photo: {
      src: lisbonNight,
      alt: "Tram 28 lit up on a rainy Lisbon street at night",
    },
    body: [
      {
        paragraphs: [
          "Tram 28 is the most photographed vehicle in Portugal, and from eleven to five it is packed shoulder to shoulder with people photographing it. After nine at night, it is a tram again: a wooden car that rattles up from Martim Moniz through Graça and down through Alfama with a handful of locals going home.",
          "We send our travellers on the last runs of the evening, with a short list of stops worth getting off at: a miradouro, a ginjinha bar, a tasca where the fado starts at ten.",
        ],
      },
      {
        heading: "How to ride it",
        paragraphs: [
          "Board at Martim Moniz, where the route starts and you can choose a seat. Sit on the right going uphill. Get off at Largo da Graça, walk to the viewpoint, and pick up the next car down.",
        ],
      },
    ],
  },
  {
    slug: "fruit-sellers-of-jemaa-el-fnaa",
    title: "A morning with the fruit sellers",
    dek: "Before the snake charmers, before the crowds: the square at seven, and the people who build it every day.",
    author: "Mara Okafor",
    date: "2026-07-12",
    minutes: 5,
    destination: "marrakech",
    photo: {
      src: marrakechFruit,
      alt: "A vendor stacking oranges and melons into pyramids at a market stall",
    },
    body: [
      {
        paragraphs: [
          "Jemaa el-Fnaa is two different places. At night it is smoke, drums and a hundred food stalls. At seven in the morning it is mostly empty paving, a few orange-juice carts and the men who build those carts, fruit by fruit, into pyramids.",
          "I first came to the square at that hour twenty years ago, jet-lagged and looking for coffee, and I have sent every Odyssey traveller there since.",
        ],
      },
      {
        heading: "Who you will meet",
        paragraphs: [
          "Hassan has stall 31 and has had it since 1994. He stacks oranges from the bottom up, largest first, and will tell you that a pyramid is a promise: no bruised fruit underneath.",
          "Our guide Youssef walks you round the square as it fills, then into the souks before the shutters are fully up. By ten, when the crowds arrive, you are on a roof with mint tea, watching them.",
        ],
      },
    ],
  },
  {
    slug: "sleeping-on-the-fjord",
    title: "Sleeping on the fjord",
    dek: "On cruise ships, timing and the one rule that makes Geiranger feel like a secret.",
    author: "Tomasz Wren",
    date: "2026-06-18",
    minutes: 4,
    destination: "norwegian-fjords",
    photo: {
      src: fjordBoat,
      alt: "A small boat beneath dark cliffs on a Norwegian fjord",
    },
    body: [
      {
        paragraphs: [
          "Geiranger has a population of about 250 and, on a busy summer day, receives several thousand cruise passengers. Between nine and five, the village is theirs. Before and after, it is one of the most peaceful places in Europe.",
          "So we plan around the ships. Our travellers stay on the fjord, kayak at seven, hike to the cliff farms while the ships are in, and come back down to an empty quay for dinner.",
        ],
      },
      {
        heading: "The farms above the water",
        paragraphs: [
          "Skageflå and Knivsflå were farmed until the 1910s, with ladders as the only way up. Today you reach Skageflå on a steep path from the water's edge, and you will very likely have it to yourself.",
        ],
      },
    ],
  },
  {
    slug: "why-we-skip-the-early-ferry",
    title: "Why we stopped booking the 7 a.m. ferry",
    dek: "What a decade of Amalfi Coast itineraries taught us about doing less.",
    author: "Lucía Ferraro",
    date: "2026-05-27",
    minutes: 5,
    destination: "amalfi-coast",
    photo: {
      src: amalfiBeach,
      alt: "Spiaggia Grande in Positano with swimmers and a small motorboat",
    },
    body: [
      {
        paragraphs: [
          "Our early Amalfi itineraries were beautiful on paper: Capri on day two, Pompeii on day three, Ravello and Positano on day four. Clients came home exhausted and a little sunburnt, and they told us so.",
          "So we started crossing things out. Capri became optional. Pompeii moved to the arrival day, on the way from Naples. The ferry left at ten instead of seven.",
        ],
      },
      {
        heading: "One walk, one lunch",
        paragraphs: [
          "Now every Amalfi day has one thing in it: a walk, a boat, a garden or a terrace. The rest is swimming and lunch. It turns out this is what most people wanted all along; they just did not feel they could ask a travel agent for it.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

/* ------------------------------------------------------------------ pages */

export const home = {
  title: "Slow journeys, planned by people who have been.",
  lede: "Odyssey is a small travel agency in Portland, Maine. Five planners, ten places we know by heart, and journeys built around one good thing a day.",
  promises: [
    {
      title: "We have been to every place we sell",
      text: "No destination goes on this site until a planner has stayed in the hotels and walked with the guides.",
    },
    {
      title: "One person, start to finish",
      text: "The planner who drafts your route is the one who answers when the ferry is cancelled.",
    },
    {
      title: "Money held in trust",
      text: "Payments sit in a separate client account until you are home.",
    },
    {
      title: "Fewer, longer stays",
      text: "Our median journey has two bases. Less packing, more being somewhere.",
    },
  ],
};

export const about = {
  title: "A travel agency the old-fashioned way, on purpose.",
  story: [
    "Mara Okafor started Odyssey in 2009 from a desk above a ship chandler on the Portland waterfront. She had spent a decade leading walking trips in Morocco and was tired of watching travellers arrive exhausted by itineraries written by people who had never been.",
    "The idea was simple, and it has not changed: sell only places we know personally, plan them slowly, and answer the phone when something goes wrong. We are five planners now, and we still decline about a third of the trips we are asked to plan, usually because we do not know the place well enough yet.",
    "We are not a booking engine and we are not a tour operator. We are closer to the travel agents your grandparents used: people with a phone, a map and a very long list of names.",
  ],
  principles: [
    {
      title: "We go first",
      text: "Each planner spends six to eight weeks a year on the road, re-checking hotels and meeting new guides.",
    },
    {
      title: "We say no",
      text: "If a route does not work, or a place is not ready, we will say so, and suggest one that is.",
    },
    {
      title: "We stay small",
      text: "Five planners, around 400 journeys a year. Enough to know every traveller by name.",
    },
  ],
};
