import hero from "./assets/hero.jpg";
import windowView from "./assets/window.jpg";
import roofbox from "./assets/roofbox.jpg";
import coast from "./assets/coast.jpg";
import pass from "./assets/pass.jpg";
import garage from "./assets/garage.jpg";
import airport from "./assets/airport.jpg";
import northgate from "./assets/northgate.jpg";
import dash from "./assets/dash.jpg";
import ridge from "./assets/ridge.jpg";
import bigsur from "./assets/bigsur.jpg";
import night from "./assets/night.jpg";
import snow from "./assets/snow.jpg";
import headland from "./assets/headland.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };
const photo = (src: string, alt: string, w = 1600, h = 1066): Photo => ({
  src,
  alt,
  w,
  h,
});

export const photos = {
  hero: photo(
    hero,
    "A red convertible with the top down on an empty two-lane highway at sunrise",
    1800,
    1200,
  ),
  window: photo(
    windowView,
    "Pine forest and a blue mountain range framed by a car's rear side window",
    1600,
    1068,
  ),
  roofbox: photo(
    roofbox,
    "A driver climbing out of a roof-boxed SUV on a gravel shoulder under a grey sky",
    1600,
    1068,
  ),
  coast: photo(
    coast,
    "A white four-wheel drive parked on a coastal track above a misty bay",
  ),
  pass: photo(
    pass,
    "Aerial view of a road winding through a forested hillside",
    1400,
    933,
  ),
  garage: photo(
    garage,
    "A parking garage entrance at night with red and blue lane signs reflected on wet concrete",
    1600,
    1061,
  ),
  airport: photo(
    airport,
    "An airliner at the gate under an evening sky, seen from the terminal apron",
    1400,
    933,
  ),
  northgate: photo(
    northgate,
    "Looking out from the open side of a parking garage deck at a snowy rail yard",
    1600,
    1200,
  ),
  dash: photo(
    dash,
    "Dashboard and rear-view mirror of a car on the highway at dusk, tail lights ahead",
    1400,
    924,
  ),
  ridge: photo(
    ridge,
    "Cars climbing a switchback road across a high mountain meadow",
    1400,
    929,
  ),
  bigsur: photo(
    bigsur,
    "A coast road curving around a cliff above the ocean at sunset",
    1066,
    1600,
  ),
  night: photo(
    night,
    "Night driving on an empty highway, the instrument cluster glowing blue",
    1600,
    1201,
  ),
  snow: photo(
    snow,
    "A plowed road climbing between snowbanks into low cloud",
    1400,
    1120,
  ),
  headland: photo(
    headland,
    "Grassy headland dropping to the sea, a coast road along its flank",
    1400,
    933,
  ),
};

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Roam",
  sector: "Car rental",
  tagline:
    "Land, sign once, drive. Five stations from the coast to the passes.",
  email: "hello@roam.example",
  phone: "+1 555 0193 400",
  phoneHref: "tel:+15550193400",
  roadside: "+1 555 0193 911",
  roadsideHref: "tel:+15550193911",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/fleet", label: "Fleet" },
  { to: "/locations", label: "Locations" },
  { to: "/deals", label: "Deals" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
];

/* ------------------------------------------------------------ fleet */

export type Body =
  "hatch" | "sedan" | "wagon" | "suv" | "van" | "convertible" | "pickup";

/** Cargo room in cubic feet for a given number of people on board (largest step that seats everyone wins). */
export type CargoStep = { upTo: number; cuft: number; label: string };

export type Car = {
  id: string;
  name: string;
  group: string;
  className: string;
  /** ACRISS code as printed on the key tag: category, type, transmission, fuel/air. */
  acriss: string;
  body: Body;
  paint: string;
  tagline: string;
  about: string[];
  seats: number;
  doors: number;
  transmission: "Automatic" | "Manual";
  fuel: "Hybrid" | "Petrol" | "Diesel" | "Electric";
  economy: string;
  bags: { large: number; small: number };
  cargo: CargoStep[];
  /** Takes skis, boards or a bike without blocking a seat (pass-through, roof bars or an open bed). */
  longLoad: boolean;
  rate: number;
  deposit: number;
  minAge: number;
  dims: { length: number; width: number; height: number };
  features: string[];
  goodFor: string[];
  photo: keyof typeof photos;
  stations: string[];
};

export const cars: Car[] = [
  {
    id: "pico-hybrid",
    name: "Pico Hybrid",
    group: "Group A",
    className: "Economy",
    acriss: "EDAH",
    body: "hatch",
    paint: "#d9d6cc",
    tagline: "The airport-to-downtown car. Sips fuel, parks anywhere.",
    about: [
      "A five-door self-charging hybrid that runs on electric alone below about 25 mph, which is most of a downtown crawl. Two adults and a long weekend of luggage go in without a fight.",
      "It is the car we hand out most, so it is also the one we have most of: if a station is ever short, the Pico is the first thing back on the lot.",
    ],
    seats: 5,
    doors: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    economy: "56 mpg combined",
    bags: { large: 1, small: 2 },
    cargo: [
      { upTo: 5, cuft: 9.9, label: "All seats up" },
      { upTo: 3, cuft: 17.4, label: "Rear 60/40 folded on one side" },
      { upTo: 2, cuft: 25.1, label: "Rear bench folded flat" },
    ],
    longLoad: false,
    rate: 39,
    deposit: 200,
    minAge: 21,
    dims: { length: 155, width: 69, height: 59 },
    features: [
      "Apple CarPlay and Android Auto",
      "Rear camera",
      "Lane keeping assist",
      "Two USB-C ports",
    ],
    goodFor: ["City stays", "Two people", "Tight parking"],
    photo: "garage",
    stations: ["harbor-airport", "downtown", "northgate", "cape-linden"],
  },
  {
    id: "arlo-manual",
    name: "Arlo 1.5",
    group: "Group B",
    className: "Compact",
    acriss: "CDMR",
    body: "hatch",
    paint: "#2f4b5c",
    tagline: "Six-speed manual, for people who still like a clutch.",
    about: [
      "A lively compact with a proper six-speed gearbox and a little more room than the Pico. The coast road between Cape Linden and the headland was more or less built for it.",
      "We keep a small batch of manuals because a lot of our renters ask for them. Book ahead in summer.",
    ],
    seats: 5,
    doors: 5,
    transmission: "Manual",
    fuel: "Petrol",
    economy: "41 mpg combined",
    bags: { large: 2, small: 1 },
    cargo: [
      { upTo: 5, cuft: 13.1, label: "All seats up" },
      { upTo: 3, cuft: 24.6, label: "Rear 60/40 folded on one side" },
      { upTo: 2, cuft: 38.2, label: "Rear bench folded flat" },
    ],
    longLoad: false,
    rate: 44,
    deposit: 250,
    minAge: 21,
    dims: { length: 166, width: 70, height: 58 },
    features: [
      "Six-speed manual",
      "Heated front seats",
      "Wireless phone charging",
      "Hill start assist",
    ],
    goodFor: ["Coast road", "Drivers", "Small families"],
    photo: "headland",
    stations: ["harbor-airport", "downtown", "cape-linden"],
  },
  {
    id: "tessel-touring",
    name: "Tessel Touring",
    group: "Group D",
    className: "Estate",
    acriss: "IWAH",
    body: "wagon",
    paint: "#7a8a7a",
    tagline: "A long, low hybrid wagon that eats suitcases.",
    about: [
      "Estate cars are the quiet heroes of a road trip: SUV-sized luggage room, car-like fuel bills and a floor low enough that nobody throws their back out loading a 28-inch case.",
      "Roof bars come fitted, so a ski box or bike carrier is a click at the counter rather than a phone call.",
    ],
    seats: 5,
    doors: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    economy: "50 mpg combined",
    bags: { large: 3, small: 2 },
    cargo: [
      { upTo: 5, cuft: 21.2, label: "All seats up" },
      { upTo: 3, cuft: 38.9, label: "Rear 60/40 folded on one side" },
      { upTo: 2, cuft: 56.6, label: "Rear bench folded flat" },
    ],
    longLoad: true,
    rate: 58,
    deposit: 300,
    minAge: 21,
    dims: { length: 182, width: 70, height: 58 },
    features: [
      "Roof bars fitted",
      "Adaptive cruise control",
      "Powered tailgate",
      "Rear privacy glass",
    ],
    goodFor: ["Families", "Long drives", "Lots of luggage"],
    photo: "window",
    stations: ["harbor-airport", "downtown", "northgate", "cape-linden"],
  },
  {
    id: "ridgeback-awd",
    name: "Ridgeback AWD",
    group: "Group F",
    className: "SUV",
    acriss: "SFBR",
    body: "suv",
    paint: "#e7e4dc",
    tagline: "All-wheel drive on winter tires. Ridgeline's default.",
    about: [
      "A mid-size SUV with on-demand all-wheel drive, 8.4 inches of ground clearance and, from November to April, studless winter tires on every car. It is what we would take up Pass Road 40 in February.",
      "From Ridgeline it leaves with a scraper, a shovel and chains in the boot. Ski racks are free with the Powder deal.",
    ],
    seats: 5,
    doors: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    economy: "29 mpg combined",
    bags: { large: 3, small: 3 },
    cargo: [
      { upTo: 5, cuft: 27.6, label: "All seats up" },
      { upTo: 3, cuft: 48.0, label: "Rear 60/40 folded on one side" },
      { upTo: 2, cuft: 69.1, label: "Rear bench folded flat" },
    ],
    longLoad: true,
    rate: 74,
    deposit: 400,
    minAge: 21,
    dims: { length: 181, width: 73, height: 66 },
    features: [
      "On-demand AWD",
      "Winter tires Nov–Apr",
      "Heated seats and wheel",
      "Roof rails",
    ],
    goodFor: ["Mountains", "Snow", "Gravel roads"],
    photo: "roofbox",
    stations: ["harbor-airport", "downtown", "northgate", "ridgeline"],
  },
  {
    id: "volta-long-range",
    name: "Volta Long Range",
    group: "Group E",
    className: "Electric",
    acriss: "PDAE",
    body: "sedan",
    paint: "#1e2a38",
    tagline: "310 miles of range, collected at 80% and returned however.",
    about: [
      "A long-range electric fastback with dual motors and a heat pump, so the winter range holds up better than you'd expect. We hand it over at 80% or more and you bring it back at any charge for a flat fee, or free with First Charge.",
      "Every station has two fast chargers on site, and the in-car route planner knows every public charger on the Salt Coast.",
    ],
    seats: 5,
    doors: 4,
    transmission: "Automatic",
    fuel: "Electric",
    economy: "310 mi range",
    bags: { large: 2, small: 2 },
    cargo: [
      { upTo: 5, cuft: 15.2, label: "Boot plus front trunk" },
      { upTo: 3, cuft: 23.0, label: "Rear 60/40 folded on one side" },
      { upTo: 2, cuft: 30.8, label: "Rear bench folded" },
    ],
    longLoad: true,
    rate: 81,
    deposit: 400,
    minAge: 23,
    dims: { length: 185, width: 73, height: 57 },
    features: [
      "Dual motor AWD",
      "Heat pump",
      "Charge-aware route planner",
      "Glass roof",
    ],
    goodFor: ["Quiet miles", "Business trips", "Coast to pass"],
    photo: "dash",
    stations: ["harbor-airport", "downtown", "northgate"],
  },
  {
    id: "caravel-nine",
    name: "Caravel 9",
    group: "Group K",
    className: "People carrier",
    acriss: "FVAD",
    body: "van",
    paint: "#c9c4b6",
    tagline: "Nine seats, sliding doors, room for everyone's bags.",
    about: [
      "Three rows, nine proper seats and sliding doors on both sides, so the youngest can be buckled in on the curb side while the eldest argues about the front. It drives like a big car, not a bus, and you only need a normal license.",
      "Fold the third row and it swallows a wedding party's luggage or a band's backline.",
    ],
    seats: 9,
    doors: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    economy: "31 mpg combined",
    bags: { large: 5, small: 4 },
    cargo: [
      { upTo: 9, cuft: 20.4, label: "All three rows up" },
      { upTo: 6, cuft: 58.0, label: "Third row folded" },
      { upTo: 3, cuft: 102.5, label: "Second and third rows folded" },
    ],
    longLoad: true,
    rate: 112,
    deposit: 500,
    minAge: 25,
    dims: { length: 208, width: 78, height: 77 },
    features: [
      "Twin sliding doors",
      "Rear climate zone",
      "Five ISOFIX points",
      "Surround camera",
    ],
    goodFor: ["Groups", "Weddings", "Airport runs"],
    photo: "airport",
    stations: ["harbor-airport", "downtown"],
  },
  {
    id: "sundeck-roadster",
    name: "Sundeck Roadster",
    group: "Group T",
    className: "Convertible",
    acriss: "STAR",
    body: "convertible",
    paint: "#b23a2a",
    tagline:
      "Fabric roof down in eleven seconds. Coast Highway 1 does the rest.",
    about: [
      "A two-plus-two soft top with a roof that folds at up to 30 mph, so a passing shower is an inconvenience, not a crisis. The rear seats are for jackets and short friends.",
      "It lives at Cape Linden and the airport from April to October and goes into the garage when the Salt Coast turns grey.",
    ],
    seats: 4,
    doors: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    economy: "33 mpg combined",
    bags: { large: 1, small: 1 },
    cargo: [{ upTo: 4, cuft: 8.6, label: "Boot, roof up or down" }],
    longLoad: false,
    rate: 96,
    deposit: 500,
    minAge: 25,
    dims: { length: 166, width: 70, height: 54 },
    features: [
      "Power soft top",
      "Wind deflector",
      "Neck-level seat heating",
      "Premium audio",
    ],
    goodFor: ["Coast Highway 1", "Two people", "Summer"],
    photo: "hero",
    stations: ["harbor-airport", "cape-linden"],
  },
  {
    id: "bramble-crew-cab",
    name: "Bramble Crew Cab",
    group: "Group P",
    className: "Pickup",
    acriss: "FQBR",
    body: "pickup",
    paint: "#4d5a3f",
    tagline: "Four-wheel drive, five seats and a covered bed.",
    about: [
      "A crew-cab pickup with selectable 4x4 and a lockable roll-top cover on the bed, so the cargo stays dry and the bikes stay yours. A tow bar is fitted for trailers up to 5,000 lb.",
      "Popular for moving weekends downtown and with anyone heading up to the trailheads above Ridgeline.",
    ],
    seats: 5,
    doors: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    economy: "22 mpg combined",
    bags: { large: 6, small: 4 },
    cargo: [{ upTo: 5, cuft: 52.8, label: "Covered bed" }],
    longLoad: true,
    rate: 98,
    deposit: 500,
    minAge: 25,
    dims: { length: 210, width: 75, height: 71 },
    features: [
      "Selectable 4x4",
      "Roll-top bed cover",
      "Tow bar, 5,000 lb",
      "Bed-mounted 12V socket",
    ],
    goodFor: ["Moving", "Bikes", "Trailheads"],
    photo: "ridge",
    stations: ["downtown", "ridgeline"],
  },
];

/** What each letter of the four-letter ACRISS code on the key tag means. */
export const acrissKey: { title: string; letters: Record<string, string> }[] = [
  {
    title: "Category",
    letters: {
      E: "Economy",
      C: "Compact",
      I: "Intermediate",
      S: "Standard",
      F: "Full size",
      P: "Premium",
    },
  },
  {
    title: "Type",
    letters: {
      D: "4–5 door",
      W: "Estate",
      F: "SUV",
      V: "Passenger van",
      T: "Convertible",
      Q: "Pickup, crew cab",
    },
  },
  {
    title: "Drive",
    letters: { A: "Automatic", M: "Manual", B: "Automatic, all-wheel drive" },
  },
  {
    title: "Fuel & air",
    letters: {
      H: "Hybrid, air con",
      R: "Petrol, air con",
      E: "Electric, air con",
      D: "Diesel, air con",
    },
  },
];

/* ------------------------------------------------------------ bag check */

export type BagKind = {
  id: string;
  label: string;
  size: string;
  cuft: number;
  long?: boolean;
};

export const bagKinds: BagKind[] = [
  { id: "large", label: "Checked suitcase", size: "28 in", cuft: 3.6 },
  { id: "cabin", label: "Cabin bag", size: "22 in", cuft: 1.6 },
  {
    id: "skis",
    label: "Ski or board bag",
    size: "up to 75 in",
    cuft: 2.2,
    long: true,
  },
  { id: "stroller", label: "Folded stroller", size: "travel size", cuft: 2.6 },
];

export const bagCheck = {
  title: "Will it all fit?",
  text: "Tell us who's coming and what they packed. We fold seats where we can and show every car that takes the lot.",
};

/* ------------------------------------------------------------ locations */

export type Hours = [string, string] | null;

export type Station = {
  id: string;
  name: string;
  short: string;
  code: string;
  kind: "Airport" | "City" | "Rail" | "Town";
  address: string[];
  counter: string;
  intro: string;
  directions: string[];
  /** Sunday first; ignored when allDay. */
  hours: Hours[];
  allDay?: boolean;
  afterHours: string;
  phone: string;
  phoneHref: string;
  /** Position on the authored region map, viewBox 0 0 600 400. */
  map: { x: number; y: number };
  photo: keyof typeof photos;
  facts: string[];
  airportFee?: boolean;
};

export const stations: Station[] = [
  {
    id: "harbor-airport",
    name: "Harbor International Airport",
    short: "Harbor Airport",
    code: "HIA",
    kind: "Airport",
    address: ["Rental Car Center, Level 2", "1 Terminal Loop", "Port Harbor"],
    counter: "Counters 14–16, Level 2",
    intro:
      "Our busiest counter and the only one that never closes. Every terminal connects to the Rental Car Center by the free AirTrain, four minutes from arrivals.",
    directions: [
      "Collect your bags and follow the yellow Rental Cars signs to the AirTrain.",
      "Ride one stop to Rental Car Center. Trains run every 4 minutes, all night.",
      "Roam is on Level 2, counters 14–16. Skip the counter with a Fast Lane booking and go straight to the garage.",
      "Your bay number is on your key tag. Roam bays are R1–R120 on the same level.",
    ],
    hours: [],
    allDay: true,
    afterHours:
      "Open 24 hours. Returns go to the Roam lanes on Level 2; follow Rental Car Return from Terminal Loop.",
    phone: "+1 555 0193 410",
    phoneHref: "tel:+15550193410",
    map: { x: 214, y: 214 },
    photo: "airport",
    facts: [
      "Open 24/7",
      "Fast Lane pickup",
      "Every car in the fleet",
      "Two DC fast chargers",
    ],
    airportFee: true,
  },
  {
    id: "downtown",
    name: "Downtown · Pier Street Garage",
    short: "Downtown",
    code: "DTN",
    kind: "City",
    address: ["Pier Street Garage, Level P1", "220 Pier Street", "Port Harbor"],
    counter: "Level P1, next to the pay stations",
    intro:
      "Under the Pier Street Garage, two blocks from the ferry terminal and the Market Hall. The easiest place to start if you're staying in town and only need a car for the trip out.",
    directions: [
      "Enter the Pier Street Garage from Pier Street; the ramp is signed Roam Rental, Level P1.",
      "On foot, take the garage lifts from the Market Hall side and press P1.",
      "Our counter sits beside the pay stations. Cars wait in the yellow-marked bays opposite.",
    ],
    hours: [
      ["08:00", "18:00"],
      ["07:00", "20:00"],
      ["07:00", "20:00"],
      ["07:00", "20:00"],
      ["07:00", "20:00"],
      ["07:00", "21:00"],
      ["08:00", "18:00"],
    ],
    afterHours:
      "Return any time: park in a yellow Roam bay on P1 and drop the key in the steel box by the lifts.",
    phone: "+1 555 0193 420",
    phoneHref: "tel:+15550193420",
    map: { x: 268, y: 168 },
    photo: "garage",
    facts: [
      "Two blocks from the ferry",
      "24-hour key drop",
      "Pickups and moving vans",
    ],
  },
  {
    id: "northgate",
    name: "Northgate Rail Station",
    short: "Northgate",
    code: "NGS",
    kind: "Rail",
    address: ["Station Garage, Deck 2", "4 Concourse Way", "Northgate"],
    counter: "Deck 2, by the footbridge",
    intro:
      "For anyone arriving on the Coast Line or the Valley Express. The counter is on the footbridge level of the station garage, so you never go outside with your bags.",
    directions: [
      "From the platforms, take the footbridge toward Garage & Taxis.",
      "The bridge opens onto Deck 2. Roam is the first counter on the left.",
      "Cars are parked on the same deck, bays N1–N40.",
    ],
    hours: [
      ["09:00", "17:00"],
      ["06:30", "21:30"],
      ["06:30", "21:30"],
      ["06:30", "21:30"],
      ["06:30", "21:30"],
      ["06:30", "22:30"],
      ["08:00", "18:00"],
    ],
    afterHours:
      "Key drop on Deck 2 beside the counter shutter. Cars returned after hours are checked in by 8 the next morning.",
    phone: "+1 555 0193 430",
    phoneHref: "tel:+15550193430",
    map: { x: 318, y: 92 },
    photo: "northgate",
    facts: [
      "Under cover from train to car",
      "Late counter Fridays",
      "EV fast chargers",
    ],
  },
  {
    id: "cape-linden",
    name: "Cape Linden",
    short: "Cape Linden",
    code: "CPL",
    kind: "Town",
    address: ["Harbor Road Lot", "18 Harbor Road", "Cape Linden"],
    counter: "The yellow cabin at the end of the lot",
    intro:
      "A small seasonal station at the end of Coast Highway 1, opposite the lifeboat house. Convertibles live here in summer, and it's the far end of our Coast Run one-way deal.",
    directions: [
      "Follow Coast Highway 1 into town and turn right at the lifeboat house onto Harbor Road.",
      "The lot is on the left after the ice-cream kiosk. Our cabin is at the far end.",
      "Coming by bus? The 14 from Harbor Airport stops at the lot entrance.",
    ],
    hours: [
      ["09:00", "16:00"],
      ["08:30", "18:00"],
      ["08:30", "18:00"],
      ["08:30", "18:00"],
      ["08:30", "18:00"],
      ["08:30", "19:00"],
      ["09:00", "17:00"],
    ],
    afterHours:
      "Drop the key through the slot in the cabin door. From November to March the cabin opens Thursday to Monday only.",
    phone: "+1 555 0193 440",
    phoneHref: "tel:+15550193440",
    map: { x: 118, y: 322 },
    photo: "coast",
    facts: [
      "Convertibles April–October",
      "Coast Run one-way end",
      "Bus 14 from the airport",
    ],
  },
  {
    id: "ridgeline",
    name: "Ridgeline",
    short: "Ridgeline",
    code: "RDG",
    kind: "Town",
    address: ["Lodge Road Depot", "3 Lodge Road", "Ridgeline"],
    counter: "Depot office, beside the tire bay",
    intro:
      "Our mountain station at the top of Pass Road 40, a five-minute walk from the gondola. Every car here leaves on winter tires from November, with chains and a scraper aboard.",
    directions: [
      "Take Pass Road 40 east; Lodge Road is the first right after the Ridgeline sign.",
      "The depot is the long shed with the yellow doors, opposite the gondola car park.",
      "From the gondola, walk down the footpath past the ski hire shop.",
    ],
    hours: [
      ["07:30", "18:00"],
      ["07:30", "18:00"],
      ["07:30", "18:00"],
      ["07:30", "18:00"],
      ["07:30", "18:00"],
      ["07:00", "20:00"],
      ["07:00", "20:00"],
    ],
    afterHours:
      "Key box by the yellow doors. Leave chains in the boot; we check them in the morning.",
    phone: "+1 555 0193 450",
    phoneHref: "tel:+15550193450",
    map: { x: 492, y: 132 },
    photo: "snow",
    facts: [
      "Winter tires Nov–Apr",
      "Chains and scraper aboard",
      "Five minutes from the gondola",
    ],
  },
];

/** Road miles between stations; the one-way fee is derived from these. */
export const miles: Record<string, number> = {
  "harbor-airport|downtown": 11,
  "harbor-airport|northgate": 18,
  "harbor-airport|cape-linden": 46,
  "harbor-airport|ridgeline": 78,
  "downtown|northgate": 9,
  "downtown|cape-linden": 54,
  "downtown|ridgeline": 70,
  "northgate|cape-linden": 62,
  "northgate|ridgeline": 66,
  "cape-linden|ridgeline": 122,
};

/** Roads drawn on the region map. */
export const roads = [
  {
    id: "coast-1",
    label: "1",
    name: "Coast Highway 1",
    at: [155, 267],
    d: "M106 384 C112 350 116 334 118 322 C132 284 170 250 214 214 C232 200 250 184 268 168",
  },
  {
    id: "route-9",
    label: "9",
    name: "Route 9",
    at: [294, 128],
    d: "M214 214 C240 200 252 186 268 168 C290 140 300 116 318 92 C330 74 340 52 350 20",
  },
  {
    id: "pass-40",
    label: "40",
    name: "Pass Road 40",
    at: [449, 139],
    d: "M268 168 C320 160 360 178 400 156 C440 134 460 140 492 132 C520 126 548 120 590 104",
  },
];

/* ------------------------------------------------------------ booking */

export type Coverage = {
  id: string;
  name: string;
  perDay: number;
  excess: number;
  summary: string;
};

export const coverage: Coverage[] = [
  {
    id: "basic",
    name: "Basic",
    perDay: 0,
    excess: 1500,
    summary:
      "Collision and theft cover with a $1,500 excess. Included in every rate.",
  },
  {
    id: "plus",
    name: "Plus",
    perDay: 14,
    excess: 500,
    summary: "Cuts the excess to $500 and adds 24-hour roadside assistance.",
  },
  {
    id: "zero",
    name: "Zero excess",
    perDay: 24,
    excess: 0,
    summary:
      "Nothing to pay for damage, including tires, glass and the underbody.",
  },
];

export type Extra = {
  id: string;
  name: string;
  note: string;
  price: number;
  per: "day" | "rental";
  cap?: number;
  max: number;
  only?: string[];
};

export const extras: Extra[] = [
  {
    id: "child-seat",
    name: "Child seat",
    note: "Infant, toddler or booster; tell us ages at the counter.",
    price: 9,
    per: "day",
    cap: 63,
    max: 3,
  },
  {
    id: "extra-driver",
    name: "Third driver",
    note: "The second driver is always free.",
    price: 8,
    per: "day",
    max: 2,
  },
  {
    id: "roof-box",
    name: "Roof box",
    note: "Fits two pairs of skis or four soft bags. Estate, SUV, EV and van.",
    price: 15,
    per: "day",
    max: 1,
    only: [
      "tessel-touring",
      "ridgeback-awd",
      "volta-long-range",
      "caravel-nine",
    ],
  },
  {
    id: "snow-chains",
    name: "Snow chains",
    note: "Already aboard at Ridgeline.",
    price: 25,
    per: "rental",
    max: 1,
  },
  {
    id: "toll-pass",
    name: "Toll pass",
    note: "Bridge and express-lane tolls billed at cost, no admin fee.",
    price: 6,
    per: "day",
    cap: 42,
    max: 1,
  },
];

export const fees = {
  youngDriverPerDay: 19,
  airportRate: 0.111,
  taxRate: 0.0825,
  weeklyDays: 7,
  weeklyDiscount: 0.1,
  oneWayBase: 35,
  oneWayPerMile: 0.6,
  oneWayFreeMiles: 20,
};

export const bookingCopy = {
  title: "Book a car",
  intro:
    "Four short steps. You'll see the full price, fees and tax before you confirm, and nothing is charged until you return the car.",
  note: "This is a demo: no reservation is made and nothing is sent or charged.",
  included: [
    "Unlimited miles",
    "Second driver free",
    "Basic cover",
    "Free cancellation up to 24 hours before pickup",
  ],
};

/* ------------------------------------------------------------ deals */

export type Deal = {
  code: string;
  title: string;
  summary: string;
  terms: string[];
  until: string;
  photo: keyof typeof photos;
  /** Rules the booking checks before applying the deal. */
  rule: {
    percent?: number;
    perDayOff?: number;
    minDays?: number;
    maxDays?: number;
    weekdays?: number[];
    leadDays?: number;
    cars?: string[];
    route?: [string, string];
    waiveOneWay?: boolean;
    freeExtras?: string[];
  };
};

export const deals: Deal[] = [
  {
    code: "WEEKLONG",
    title: "A week or more: 12% off",
    summary:
      "Stacks with the weekly rate, so a seven-day hire works out at about five days' money.",
    terms: [
      "Rentals of 7 days or longer",
      "Any car, any station",
      "Applies to the base rate only",
    ],
    until: "Dec 31",
    photo: "pass",
    rule: { percent: 12, minDays: 7 },
  },
  {
    code: "COASTRUN",
    title: "Coast Run: no one-way fee",
    summary:
      "Pick up at Harbor Airport, drop at Cape Linden, or the other way round. Drive Coast Highway 1 once and catch the bus back.",
    terms: [
      "Harbor Airport to Cape Linden, either direction",
      "Saves the one-way fee",
      "April to October",
    ],
    until: "Oct 31",
    photo: "bigsur",
    rule: { route: ["harbor-airport", "cape-linden"], waiveOneWay: true },
  },
  {
    code: "MIDWEEK",
    title: "Tuesday to Thursday: 15% off",
    summary:
      "Our lots are fullest at weekends. Pick up mid-week and we pass the quiet on to you.",
    terms: [
      "Pickup on a Tuesday, Wednesday or Thursday",
      "Up to 6 days",
      "Not with Weeklong",
    ],
    until: "Nov 30",
    photo: "headland",
    rule: { percent: 15, weekdays: [2, 3, 4], maxDays: 6 },
  },
  {
    code: "POWDER",
    title: "Powder: chains and roof box free",
    summary:
      "Take a Ridgeback or a Tessel up the pass and we'll add a roof box and snow chains at no charge.",
    terms: [
      "Ridgeback AWD or Tessel Touring",
      "Any station, December to March",
      "Box fits two pairs of skis",
    ],
    until: "Mar 31",
    photo: "snow",
    rule: {
      cars: ["ridgeback-awd", "tessel-touring"],
      freeExtras: ["roof-box", "snow-chains"],
    },
  },
  {
    code: "FIRSTCHARGE",
    title: "First Charge: $12 a day off the Volta",
    summary:
      "Never driven electric? We'll show you the charger at pickup, and take $12 off every day.",
    terms: [
      "Volta Long Range only",
      "Return at any charge level",
      "Once per driver",
    ],
    until: "Dec 31",
    photo: "dash",
    rule: { cars: ["volta-long-range"], perDayOff: 12 },
  },
  {
    code: "EARLY30",
    title: "Book 30 days out: 10% off",
    summary:
      "Plans made early get the full fleet to choose from and a tenth off the base rate.",
    terms: [
      "Pickup at least 30 days after booking",
      "Any car, any station",
      "Free changes up to 24 hours before",
    ],
    until: "Dec 31",
    photo: "window",
    rule: { percent: 10, leadDays: 30 },
  },
];

export const dealsCopy = {
  title: "Deals",
  intro:
    "Six codes, plain terms. Pick one and we'll carry it into your booking; the booking checks it against your dates and car before it counts.",
};

/* ------------------------------------------------------------ home */

export const home = {
  title: "Car rental from the coast to the passes.",
  intro:
    "Five stations on the Salt Coast, eight kinds of car, one price you see before you book. Unlimited miles and the second driver are always free.",
  searchTitle: "Find a car",
  included: {
    title: "In every rental, no asterisks",
    items: [
      {
        term: "Unlimited miles",
        detail: "Drive to Ridgeline and back twice. The meter doesn't matter.",
      },
      {
        term: "Second driver free",
        detail:
          "Add them at the counter with their license. A third is $8 a day.",
      },
      {
        term: "Full to full",
        detail:
          "Collected full, returned full. Short of fuel, we charge the pump price plus $10, never a per-gallon penalty.",
      },
      {
        term: "Basic cover",
        detail:
          "Collision and theft cover with a $1,500 excess. Plus and Zero excess are optional.",
      },
      {
        term: "Free cancellation",
        detail:
          "Up to 24 hours before pickup, for a full refund of anything prepaid.",
      },
      {
        term: "Roadside, 24/7",
        detail:
          "A real person on the line in under a minute, wherever the road ends.",
      },
    ],
  },
  pickup: {
    title: "From the gate to the bay in four steps",
    steps: [
      {
        title: "Book",
        text: "Choose your station, dates and car. Fast Lane bookings skip the counter.",
      },
      {
        title: "Arrive",
        text: "Follow the yellow signs: AirTrain at the airport, footbridge at Northgate, lifts at Pier Street.",
      },
      {
        title: "Show your license",
        text: "One card and one license. We check them, you sign once on the tablet.",
      },
      {
        title: "Find your bay",
        text: "The bay is printed on your key tag. Walk round the car with the app, then go.",
      },
    ],
  },
  drives: {
    title: "Three drives from our counters",
    items: [
      {
        title: "Coast Highway 1",
        from: "harbor-airport",
        to: "cape-linden",
        miles: 46,
        time: "1 h 10 min",
        text: "Headlands, the lifeboat house, and the best fish sandwich on the coast at the end of it.",
        photo: "bigsur" as const,
      },
      {
        title: "Pass Road 40",
        from: "downtown",
        to: "ridgeline",
        miles: 70,
        time: "1 h 45 min",
        text: "Thirty-one switchbacks through the fir forest to the gondola. Winter tires from November.",
        photo: "pass" as const,
      },
      {
        title: "The Valley loop",
        from: "northgate",
        to: "northgate",
        miles: 88,
        time: "2 h 20 min",
        text: "Out through the orchards on Route 9, back along the river. Flat, easy, and lovely in October.",
        photo: "window" as const,
      },
    ],
  },
  quotes: [
    {
      text: "Off the plane at 11:40 at night and driving by midnight. The bay number on the key tag is such a simple idea.",
      name: "Priya Raman",
      trip: "Pico Hybrid, Harbor Airport, 4 days",
    },
    {
      text: "They asked how many bags before I'd even got to the counter, and the wagon swallowed all of them plus a cello.",
      name: "Tomás Ferreira",
      trip: "Tessel Touring, Northgate, 9 days",
    },
  ],
  close: {
    title: "Your car is waiting in its bay.",
    text: "Book in a couple of minutes, change for free up to a day before, and pay when you bring it back.",
  },
};

/* ------------------------------------------------------------ FAQ */

export type FaqGroup = {
  id: string;
  title: string;
  items: { q: string; a: string }[];
};

export const faqCopy = {
  title: "Questions, answered at the counter",
  intro:
    "The things people ask us most, from license rules to what happens if you're late. Still stuck? Call any station or our main line.",
};

export const faq: FaqGroup[] = [
  {
    id: "before",
    title: "Before you book",
    items: [
      {
        q: "How old do I need to be?",
        a: "21 for most of the fleet, 23 for the Volta and 25 for the Caravel 9, Sundeck and Bramble. Drivers aged 21 to 24 pay a young driver fee of $19 a day.",
      },
      {
        q: "Which licenses do you accept?",
        a: "Any full license held for at least a year, printed in the Latin alphabet. Otherwise bring an International Driving Permit alongside it. Digital licenses are fine if your state issues them.",
      },
      {
        q: "Can I choose the exact model?",
        a: "You book a group, which guarantees the class, seats, transmission and fuel type. Within the group we'll give you the car pictured or a very close equivalent, and we'll say which at pickup.",
      },
      {
        q: "Do I pay now or later?",
        a: "Later. We take a card at pickup for the rental and a refundable deposit, and the final charge is made when you return the car. Cancel for free up to 24 hours before pickup.",
      },
    ],
  },
  {
    id: "pickup",
    title: "At the counter",
    items: [
      {
        q: "What do I need to bring?",
        a: "Your license, a credit or debit card in the main driver's name, and your booking number. The second driver needs their license too.",
      },
      {
        q: "How much is the deposit?",
        a: "Between $200 and $500 depending on the car; it's shown on every car's page. It's a hold, not a charge, and drops off your card within five working days of return.",
      },
      {
        q: "What is Fast Lane?",
        a: "Add your license and card details online and we'll print your key tag before you land. At the airport and Northgate you skip the counter and go straight to your bay.",
      },
      {
        q: "My flight is late. Will you give my car away?",
        a: "Not if you add your flight number. We track it and hold the car until two hours after the actual landing time. Without a flight number we hold it for two hours after the booked time.",
      },
    ],
  },
  {
    id: "road",
    title: "On the road",
    items: [
      {
        q: "Are miles really unlimited?",
        a: "Yes, on every car and every rental length, including one-way rentals between our stations.",
      },
      {
        q: "Can I take the car out of state?",
        a: "Into neighboring states, yes, without telling us. Further afield, call any station first so we can check cover and roadside assistance.",
      },
      {
        q: "What if something goes wrong?",
        a: "Call roadside on +1 555 0193 911, any hour. If the car can't be fixed at the roadside, we bring a replacement or get you to the nearest station.",
      },
      {
        q: "Do I need snow chains?",
        a: "Pass Road 40 can require them from November to April. Every car leaving Ridgeline has chains aboard; elsewhere add them for $25 per rental.",
      },
    ],
  },
  {
    id: "return",
    title: "Returning",
    items: [
      {
        q: "Can I return to a different station?",
        a: "Yes. Trips between Harbor Airport, Downtown and Northgate are free; anywhere else carries a one-way fee based on distance, which you'll see before you book.",
      },
      {
        q: "What if I'm late back?",
        a: "There's a 59-minute grace period. After that we charge an extra day at your booked rate, never a penalty fee.",
      },
      {
        q: "How do I return after hours?",
        a: "Every station has a key drop. Park in a Roam bay, photograph the fuel gauge and odometer, and drop the key. We check the car in by the next morning.",
      },
      {
        q: "What about EV charge level?",
        a: "Bring the Volta back at any charge for a flat $35, or free with the First Charge deal. There's no penalty for a low battery.",
      },
    ],
  },
];

/* ------------------------------------------------------------ about */

export const about = {
  title: "A rental company that started at a single counter",
  intro:
    "Roam opened in 2011 with nine cars and a desk in the old arrivals hall at Harbor. We still run every station ourselves: no franchises, no counter agents paid on how much cover they sell.",
  story: [
    "Ines Calder had spent a decade watching tired people sign six pages at rental counters, then walk a mile through a garage to find a car with someone else's coffee in the cupholder. Roam was her answer: one price, one signature, and a bay number on the key tag so nobody wanders.",
    "The fleet has grown to just over 1,400 cars across five stations, two thirds of them hybrid or electric. We keep every car for about two years and service them in our own workshop at Northgate, which is why the Picos you drive still smell of nothing at all.",
  ],
  care: {
    title: "Between every rental",
    steps: [
      {
        title: "Walk-round",
        text: "We photograph all four sides, the wheels and the glass with the same app you'll use at pickup.",
      },
      {
        title: "Clean",
        text: "Seats vacuumed, every touch point wiped, mats washed. Pet hair gets a second pass.",
      },
      {
        title: "Check",
        text: "Tires, fluids, lights and wipers on a 22-point list, signed off by the person who did it.",
      },
      {
        title: "Charge or fill",
        text: "Fuel to the brim, or the Volta to at least 80%, before the car goes back to its bay.",
      },
    ],
  },
  team: [
    {
      name: "Ines Calder",
      role: "Founder, still on the airport counter on Fridays",
    },
    { name: "Dele Okafor", role: "Head of fleet and the Northgate workshop" },
    { name: "Mei Hartmann", role: "Station manager, Ridgeline" },
    { name: "Rafael Quist", role: "Station manager, Cape Linden" },
    { name: "Hana Sorensen", role: "Customer care and roadside desk" },
    {
      name: "Arturo Lindqvist",
      role: "Station manager, Downtown and Northgate",
    },
  ],
  principles: {
    title: "What we won't do",
    items: [
      "Charge you for a scratch that was there before. Our walk-round photos are shared with you at pickup.",
      "Sell cover at the counter with a script. The price you saw online is the price you pay.",
      "Charge a fuel penalty. Short of a full tank, you pay what the pump costs plus $10.",
      "Fine you for being late. Past the 59-minute grace, it's one extra day at your rate.",
    ],
  },
};

/* ------------------------------------------------------------ footer */

export const footerColumns = [
  {
    title: "Rent",
    links: [
      { to: "/book", label: "Book a car" },
      { to: "/fleet", label: "Fleet" },
      { to: "/deals", label: "Deals" },
    ],
  },
  {
    title: "Stations",
    links: [
      { to: "/locations", label: "All locations" },
      ...stations.map((s) => ({ to: `/locations/${s.id}`, label: s.short })),
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/about", label: "About Roam" },
    ],
  },
];

export const newsletter = {
  title: "Deal alerts",
  text: "One email when a new code goes live. Usually twice a month, never more.",
};
