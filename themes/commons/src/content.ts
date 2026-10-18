import heroSrc from "./assets/hero.jpg";
import millYardSrc from "./assets/mill-yard.jpg";
import harbourRowSrc from "./assets/harbour-row.jpg";
import larkspurSrc from "./assets/larkspur.jpg";
import larkspurStacksSrc from "./assets/larkspur-stacks.jpg";
import stationSrc from "./assets/station.jpg";
import boilerHouseSrc from "./assets/boiler-house.jpg";
import roomViewSrc from "./assets/room-view.jpg";
import roomLongSrc from "./assets/room-long.jpg";
import talkSrc from "./assets/talk.jpg";
import laptopsSrc from "./assets/laptops.jpg";
import handsSrc from "./assets/hands.jpg";
import supperSrc from "./assets/supper.jpg";
import deskTopSrc from "./assets/desk-top.jpg";
import loungeSrc from "./assets/lounge.jpg";
import boothsSrc from "./assets/booths.jpg";
import cityDesksSrc from "./assets/city-desks.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Commons",
  sector: "Coworking space",
  tagline: "Good work. Better company.",
  city: "Eastmere",
  email: "hello@commons.example",
  toursEmail: "tours@commons.example",
  phone: "+1 555 0149 300",
  phoneHref: "tel:+15550149300",
  founded: 2014,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/memberships", label: "Memberships" },
  { to: "/locations", label: "Locations" },
  { to: "/rooms", label: "Meeting rooms" },
  { to: "/events", label: "Events" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Work here",
    links: [
      { to: "/memberships", label: "Memberships" },
      { to: "/rooms", label: "Book a meeting room" },
      { to: "/tour", label: "Book a tour" },
    ],
  },
  {
    title: "Locations",
    links: [
      { to: "/locations", label: "All locations" },
      { to: "/locations/mill-yard", label: "Mill Yard" },
      { to: "/locations/harbour-row", label: "Harbour Row" },
      { to: "/locations/larkspur-hall", label: "Larkspur Hall" },
      { to: "/locations/station-quarter", label: "Station Quarter" },
    ],
  },
  {
    title: "Commons",
    links: [
      { to: "/events", label: "Events" },
      { to: "/community", label: "Community" },
      { to: "/about", label: "About & house rules" },
    ],
  },
];

export const newsletter = {
  title: "The Thursday note",
  text: "Next week's events, new members and whatever's left in the free shelf. One email, Thursdays.",
};

/* ----------------------------------------------------------------- images */

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  hero: {
    src: heroSrc,
    alt: "Long shared desks under strings of warm bulbs at Mill Yard, members working on laptops in the afternoon",
    w: 1700,
    h: 1133,
  },
  millYard: {
    src: millYardSrc,
    alt: "The Mill Yard lounge: exposed brick, a patterned rug, blue armchairs and pendant bulbs over a long table",
    w: 1300,
    h: 866,
  },
  harbourRow: {
    src: harbourRowSrc,
    alt: "Harbour Row's double-height hall with a timber mezzanine, café tables and steel staircase",
    w: 1200,
    h: 900,
  },
  larkspur: {
    src: larkspurSrc,
    alt: "Three members laughing over a laptop in front of Larkspur Hall's original bookshelves",
    w: 1400,
    h: 933,
  },
  larkspurStacks: {
    src: larkspurStacksSrc,
    alt: "Floor-to-ceiling shelves of old cloth-bound books kept from Larkspur Hall's library days",
    w: 1000,
    h: 666,
  },
  station: {
    src: stationSrc,
    alt: "Station Quarter's bright corner floor with timber flooring, green armchairs and tall plants by the windows",
    w: 1400,
    h: 933,
  },
  boilerHouse: {
    src: boilerHouseSrc,
    alt: "The Boiler House meeting room: a long oak table, pink chairs, two pendant lamps and a wall screen",
    w: 1600,
    h: 1068,
  },
  roomView: {
    src: roomViewSrc,
    alt: "A six-seat meeting room with a timber table and a wall of windows looking over the city",
    w: 1200,
    h: 960,
  },
  roomLong: {
    src: roomLongSrc,
    alt: "A long boardroom table running beside floor-to-ceiling windows and a green acoustic wall",
    w: 1200,
    h: 800,
  },
  talk: {
    src: talkSrc,
    alt: "A member presenting from a screen to a seated audience in a brick-walled room",
    w: 1300,
    h: 730,
  },
  laptops: {
    src: laptopsSrc,
    alt: "Four people working side by side on laptops at a shared wooden table",
    w: 1000,
    h: 667,
  },
  hands: {
    src: handsSrc,
    alt: "Hands taking notes on paper across a long wooden workshop table",
    w: 1000,
    h: 666,
  },
  supper: {
    src: supperSrc,
    alt: "Members talking over plates and drinks at a crowded long supper table",
    w: 1400,
    h: 933,
  },
  deskTop: {
    src: deskTopSrc,
    alt: "A shared table seen from above, crowded with laptops, notebooks, a teapot and snacks",
    w: 1000,
    h: 666,
  },
  lounge: {
    src: loungeSrc,
    alt: "A quiet lounge corner with white shell chairs, a grey sofa and a tall reading lamp",
    w: 1000,
    h: 666,
  },
  booths: {
    src: boothsSrc,
    alt: "Timber high-backed booths at Station Quarter's coffee bar with members working in pairs",
    w: 1000,
    h: 562,
  },
  cityDesks: {
    src: cityDesksSrc,
    alt: "Members at window desks with the city skyline behind them",
    w: 1000,
    h: 562,
  },
} satisfies Record<string, Img>;

/* ---------------------------------------------------------------- hours */

/** [open, close] in 24h "HH:MM", or null when closed. Weeks are Sunday-first. */
export type Hours = [string, string] | null;
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* ------------------------------------------------------------ floor plans */

/** Rectangles on an 800 × 500 drawing. Rooms share their id with the bookable meeting room. */
export type SpaceKind = "zone" | "room" | "booth" | "service";
export type Space = {
  id: string;
  label: string;
  kind: SpaceKind;
  x: number;
  y: number;
  w: number;
  h: number;
  note?: string;
};
export type Plan = {
  floor: string;
  entrance: { x: number; y: number };
  spaces: Space[];
};

/* -------------------------------------------------------------- locations */

export type Location = {
  id: string;
  name: string;
  neighbourhood: string;
  address: string;
  short: string;
  intro: string;
  story: string[];
  image: Img;
  gallery: Img[];
  desks: number;
  floors: number;
  staffed: Hours[];
  access: string;
  transit: string[];
  amenities: string[];
  bestFor: string;
  host: { name: string; line: string };
  plan: Plan;
  /** Position on the 640 × 420 city map. */
  pin: [number, number];
};

const weekday: Hours = ["08:00", "18:00"];

export const amenityFilters = [
  "Phone booths",
  "Step-free access",
  "Showers",
  "Private studios",
  "Parking",
  "Silent reading room",
  "Printing & scanning",
  "Lockers",
];

export const locations: Location[] = [
  {
    id: "mill-yard",
    name: "Mill Yard",
    neighbourhood: "Canal side",
    address: "4 Weaver's Lane, Eastmere",
    short:
      "Our first house: a 1890s cotton mill with long tables, a big kitchen and the Friday Table.",
    intro:
      "Three floors of a red-brick cotton mill on the canal. It is our busiest house and the one with the loudest kitchen, so the ground floor is split into a quiet library, a shared workshop and a planted garden room.",
    story: [
      "We opened Mill Yard in 2014 with forty desks and a borrowed espresso machine. The looms left marks in the floor that we never sanded out; you can still trace the old rows under the Workshop tables.",
      "Today it holds 180 desks, nine studios and three meeting rooms, and it hosts most of our evening events. If you want to meet the most people in the shortest time, start here.",
    ],
    image: images.millYard,
    gallery: [images.hero, images.boilerHouse, images.talk],
    desks: 180,
    floors: 3,
    staffed: [
      null,
      weekday,
      weekday,
      weekday,
      weekday,
      weekday,
      ["10:00", "16:00"],
    ],
    access: "Members 24/7 with a key card",
    transit: [
      "Weaver's Lane tram stop, 2 min walk",
      "Canal towpath bike racks for 60 bikes",
      "Eastmere Central, 12 min walk",
    ],
    amenities: [
      "Phone booths",
      "Showers",
      "Bike storage",
      "Full kitchen",
      "Printing & scanning",
      "Lockers",
      "Step-free access",
      "Dog friendly (ground floor)",
    ],
    bestFor: "People who like a bit of noise and a lot of company",
    pin: [250, 220],
    host: {
      name: "Priya Nandakumar",
      line: "Runs the front desk, the Friday Table and the lost-property shelf.",
    },
    plan: {
      floor: "Ground floor",
      entrance: { x: 190, y: 460 },
      spaces: [
        {
          id: "library",
          label: "The Library",
          kind: "zone",
          x: 60,
          y: 60,
          w: 260,
          h: 220,
          note: "Quiet focus. Soft voices, no calls, window seats along the canal.",
        },
        {
          id: "workshop",
          label: "The Workshop",
          kind: "zone",
          x: 340,
          y: 60,
          w: 400,
          h: 170,
          note: "Big shared tables for spreading out. Talking is fine; headphones are on the hook.",
        },
        {
          id: "garden",
          label: "The Garden",
          kind: "zone",
          x: 340,
          y: 250,
          w: 180,
          h: 190,
          note: "A bright planted corner with lounge seating and a slower rhythm.",
        },
        {
          id: "kitchen",
          label: "Kitchen",
          kind: "service",
          x: 60,
          y: 300,
          w: 170,
          h: 140,
          note: "Filter coffee from 7:30, oat milk always, dishwasher emptied by whoever's nearest.",
        },
        {
          id: "mill-booths",
          label: "Booths",
          kind: "booth",
          x: 250,
          y: 300,
          w: 70,
          h: 140,
          note: "Two soundproofed phone booths, first come, 45 minutes max.",
        },
        {
          id: "boiler-house",
          label: "Boiler House",
          kind: "room",
          x: 540,
          y: 250,
          w: 200,
          h: 105,
        },
        {
          id: "loom",
          label: "Loom",
          kind: "room",
          x: 540,
          y: 365,
          w: 95,
          h: 75,
        },
        {
          id: "spindle",
          label: "Spindle",
          kind: "room",
          x: 645,
          y: 365,
          w: 95,
          h: 75,
        },
      ],
    },
  },
  {
    id: "harbour-row",
    name: "Harbour Row",
    neighbourhood: "Old docks",
    address: "Unit 7, Harbour Row, Eastmere",
    short:
      "A timber-framed warehouse on the old docks with a bar, studios and our largest event hall.",
    intro:
      "A double-height warehouse with a timber mezzanine, a proper bar and The Hold, a room that seats thirty for workshops and suppers. It suits teams of two to twelve who want a studio of their own and a crowd downstairs.",
    story: [
      "Harbour Row was a sailmaker's store until the 1970s and a furniture showroom after that. We kept the crane rail and the loading doors, and put the bar where the forklifts used to park.",
      "Most of our studios are here, so the daytime crowd is small teams: a sound studio, two architects, a translation agency and a games company that tests on the big screen in The Hold after hours.",
    ],
    image: images.harbourRow,
    gallery: [images.supper, images.laptops, images.lounge],
    desks: 120,
    floors: 2,
    staffed: [null, weekday, weekday, weekday, weekday, weekday, null],
    access: "Members 24/7 with a key card",
    transit: [
      "Harbour ferry pier, 4 min walk",
      "Bus 14 and 31 to Dock Gate",
      "Covered parking for 20 cars, $8 a day",
    ],
    amenities: [
      "Private studios",
      "Event hall",
      "Bar & kitchen",
      "Phone booths",
      "Showers",
      "Parking",
      "Step-free access",
      "Podcast booth",
    ],
    bestFor: "Small teams who want a door that closes",
    pin: [520, 330],
    host: {
      name: "Tomás Reyes",
      line: "Knows which studio is free next month and how to fix the coffee grinder.",
    },
    plan: {
      floor: "Ground floor",
      entrance: { x: 290, y: 460 },
      spaces: [
        {
          id: "deck",
          label: "The Deck",
          kind: "zone",
          x: 60,
          y: 60,
          w: 380,
          h: 200,
          note: "Open desks under the mezzanine, closest to the bar.",
        },
        {
          id: "studios",
          label: "Studios",
          kind: "service",
          x: 460,
          y: 60,
          w: 280,
          h: 120,
          note: "Twelve lockable studios for two to twelve people; four more on the mezzanine.",
        },
        {
          id: "lantern",
          label: "Lantern",
          kind: "room",
          x: 460,
          y: 200,
          w: 170,
          h: 120,
        },
        {
          id: "jetty",
          label: "Jetty",
          kind: "room",
          x: 650,
          y: 200,
          w: 90,
          h: 120,
        },
        {
          id: "bar",
          label: "Bar & kitchen",
          kind: "service",
          x: 60,
          y: 280,
          w: 220,
          h: 160,
          note: "Coffee all day, taps from 4 pm on Fridays.",
        },
        {
          id: "quiet-bay",
          label: "Quiet bay",
          kind: "zone",
          x: 300,
          y: 280,
          w: 150,
          h: 160,
          note: "Twelve desks behind the acoustic curtain. Calls go outside.",
        },
        {
          id: "harbour-booths",
          label: "Booths",
          kind: "booth",
          x: 470,
          y: 340,
          w: 70,
          h: 100,
          note: "Two phone booths and one treated podcast booth.",
        },
        {
          id: "the-hold",
          label: "The Hold",
          kind: "room",
          x: 560,
          y: 340,
          w: 180,
          h: 100,
        },
      ],
    },
  },
  {
    id: "larkspur-hall",
    name: "Larkspur Hall",
    neighbourhood: "Hillside",
    address: "21 Larkspur Road, Eastmere",
    short:
      "A former public library kept quiet on purpose: fixed desks, reading lamps and no calls in the hall.",
    intro:
      "The old Hillside branch library, reopened as our quiet house. The reading room keeps its long tables and green lamps, the stacks became fixed desks, and phones live in the booths by the tea room.",
    story: [
      "The city closed the Hillside library in 2019 and leased it to us on one condition: that it stayed somewhere people come to think. We kept the shelves, the parquet and the clock that runs four minutes fast.",
      "It is the house writers, researchers and anyone on deadline choose. Conversation happens in the tea room; the reading room is for work.",
    ],
    image: images.larkspur,
    gallery: [images.larkspurStacks, images.hands, images.deskTop],
    desks: 70,
    floors: 1,
    staffed: [
      null,
      ["08:30", "17:30"],
      ["08:30", "17:30"],
      ["08:30", "17:30"],
      ["08:30", "17:30"],
      ["08:30", "17:30"],
      ["10:00", "14:00"],
    ],
    access: "Members 6 am – 11 pm with a key card",
    transit: [
      "Hillside station, 6 min walk",
      "Bus 9 to Larkspur Road",
      "Street bike racks at the front steps",
    ],
    amenities: [
      "Silent reading room",
      "Fixed desks",
      "Phone booths",
      "Tea room",
      "Lockers",
      "Step-free access",
      "Reference shelf",
    ],
    bestFor: "Deep work, writing and anyone on a deadline",
    pin: [140, 90],
    host: {
      name: "Ines Albrecht",
      line: "Keeps the reading room quiet and the tea room stocked.",
    },
    plan: {
      floor: "Main hall",
      entrance: { x: 360, y: 460 },
      spaces: [
        {
          id: "reading-room",
          label: "Reading room",
          kind: "zone",
          x: 60,
          y: 60,
          w: 440,
          h: 240,
          note: "Silent. Forty seats at long tables under the original lamps.",
        },
        {
          id: "stacks",
          label: "The Stacks",
          kind: "zone",
          x: 520,
          y: 60,
          w: 220,
          h: 240,
          note: "Thirty fixed desks between the old shelving, each with a locker.",
        },
        {
          id: "folio",
          label: "Folio",
          kind: "room",
          x: 60,
          y: 320,
          w: 160,
          h: 120,
        },
        {
          id: "quire",
          label: "Quire",
          kind: "room",
          x: 240,
          y: 320,
          w: 110,
          h: 120,
        },
        {
          id: "tea-room",
          label: "Tea room",
          kind: "service",
          x: 370,
          y: 320,
          w: 170,
          h: 120,
          note: "The only place in the building to talk at full volume.",
        },
        {
          id: "lark-booths",
          label: "Phone booths",
          kind: "booth",
          x: 560,
          y: 320,
          w: 180,
          h: 120,
          note: "Four booths. Book none of them; just knock.",
        },
      ],
    },
  },
  {
    id: "station-quarter",
    name: "Station Quarter",
    neighbourhood: "Central",
    address: "Level 6, 2 Concourse Place, Eastmere",
    short:
      "Our smallest house, ninety seconds from the platforms: hot desks, booths and rooms for quick meetings.",
    intro:
      "A sixth-floor corner above Eastmere Central with a coffee bar, hot desks and two meeting rooms. Built for people who arrive by train, work for a few hours and leave for a meeting across town.",
    story: [
      "Station Quarter opened in 2025 because members kept asking for somewhere to land between trains. It has no fixed desks and no studios, just a good coffee bar, lockers and very fast wifi.",
      "Day pass holders are most welcome here. Grab a booth, take a call, book Junction for an hour and be back on the 15:42.",
    ],
    image: images.station,
    gallery: [images.booths, images.cityDesks, images.roomView],
    desks: 60,
    floors: 1,
    staffed: [
      null,
      ["07:00", "21:00"],
      ["07:00", "21:00"],
      ["07:00", "21:00"],
      ["07:00", "21:00"],
      ["07:00", "19:00"],
      null,
    ],
    access: "Members 7 am – 9 pm on weekdays",
    transit: [
      "Eastmere Central, platform exit B, 90 seconds",
      "All tram lines stop at Concourse",
      "Secure bike room at street level",
    ],
    amenities: [
      "Hot desks",
      "Phone booths",
      "Coffee bar",
      "Lockers",
      "Printing & scanning",
      "Step-free access",
      "Showers",
    ],
    bestFor: "Commuters, day passes and quick meetings",
    pin: [420, 160],
    host: {
      name: "Daniel Osei",
      line: "Opens up at seven and knows every train time by heart.",
    },
    plan: {
      floor: "Level 6",
      entrance: { x: 580, y: 460 },
      spaces: [
        {
          id: "platform",
          label: "Platform",
          kind: "zone",
          x: 60,
          y: 60,
          w: 420,
          h: 220,
          note: "Fifty hot desks by the windows, monitors on every other seat.",
        },
        {
          id: "signal",
          label: "Signal",
          kind: "room",
          x: 500,
          y: 60,
          w: 240,
          h: 130,
        },
        {
          id: "station-booths",
          label: "Booths",
          kind: "booth",
          x: 500,
          y: 210,
          w: 240,
          h: 70,
          note: "Five call booths with a light outside that turns orange when taken.",
        },
        {
          id: "coffee-bar",
          label: "Coffee bar",
          kind: "service",
          x: 60,
          y: 300,
          w: 240,
          h: 140,
          note: "Espresso from 7:00, booths for two along the window.",
        },
        {
          id: "junction",
          label: "Junction",
          kind: "room",
          x: 320,
          y: 300,
          w: 250,
          h: 140,
        },
        {
          id: "lockers",
          label: "Day lockers",
          kind: "service",
          x: 590,
          y: 300,
          w: 150,
          h: 140,
          note: "Sixty day lockers, big enough for a cabin bag.",
        },
      ],
    },
  },
];

/* ---------------------------------------------------------- meeting rooms */

export type Room = {
  id: string;
  name: string;
  locationId: string;
  capacity: number;
  rate: number;
  layout: string;
  features: string[];
  blurb: string;
  image?: Img;
};

export const rooms: Room[] = [
  {
    id: "boiler-house",
    name: "Boiler House",
    locationId: "mill-yard",
    capacity: 12,
    rate: 58,
    layout: "Boardroom",
    features: ["75-inch screen", "Video calls", "Whiteboard wall", "Daylight"],
    blurb: "The old boiler room, now a long oak table under two pendant lamps.",
    image: images.boilerHouse,
  },
  {
    id: "loom",
    name: "Loom",
    locationId: "mill-yard",
    capacity: 6,
    rate: 34,
    layout: "Round table",
    features: ["55-inch screen", "Video calls", "Whiteboard"],
    blurb: "A round table for six by the garden window.",
  },
  {
    id: "spindle",
    name: "Spindle",
    locationId: "mill-yard",
    capacity: 4,
    rate: 24,
    layout: "Lounge",
    features: ["Wall screen", "Armchairs", "Daylight"],
    blurb: "Four armchairs and a coffee table for conversations, not slides.",
  },
  {
    id: "lantern",
    name: "Lantern",
    locationId: "harbour-row",
    capacity: 10,
    rate: 48,
    layout: "Boardroom",
    features: ["75-inch screen", "Video calls", "Whiteboard", "Daylight"],
    blurb:
      "Glass-walled boardroom under the mezzanine with a view of the docks.",
    image: images.roomLong,
  },
  {
    id: "jetty",
    name: "Jetty",
    locationId: "harbour-row",
    capacity: 4,
    rate: 24,
    layout: "Table",
    features: ["Wall screen", "Video calls"],
    blurb: "A narrow table for four, right next to the loading doors.",
  },
  {
    id: "the-hold",
    name: "The Hold",
    locationId: "harbour-row",
    capacity: 30,
    rate: 95,
    layout: "Theatre or workshop",
    features: [
      "Projector",
      "PA & two mics",
      "Movable tables",
      "Kitchen access",
    ],
    blurb:
      "Our event hall. Theatre seating for thirty or workshop tables for twenty.",
    image: images.talk,
  },
  {
    id: "folio",
    name: "Folio",
    locationId: "larkspur-hall",
    capacity: 6,
    rate: 32,
    layout: "Table",
    features: ["55-inch screen", "Video calls", "Whiteboard", "Daylight"],
    blurb: "The old librarian's office with a bay window and a big table.",
  },
  {
    id: "quire",
    name: "Quire",
    locationId: "larkspur-hall",
    capacity: 3,
    rate: 18,
    layout: "Desk",
    features: ["Monitor", "Video calls"],
    blurb: "A small study room for interviews, calls and one-to-ones.",
  },
  {
    id: "signal",
    name: "Signal",
    locationId: "station-quarter",
    capacity: 5,
    rate: 30,
    layout: "Table",
    features: ["55-inch screen", "Video calls", "Daylight"],
    blurb: "Corner room over the platforms with a view down the tracks.",
    image: images.roomView,
  },
  {
    id: "junction",
    name: "Junction",
    locationId: "station-quarter",
    capacity: 8,
    rate: 42,
    layout: "Boardroom",
    features: ["65-inch screen", "Video calls", "Whiteboard"],
    blurb: "Eight seats and a screen, a minute and a half from any train.",
  },
];

/** Bookable board hours: 8:00 – 20:00 in half hours. */
export const board = { open: 8, close: 20 };

/** Demo bookings (start, end in hours) rotated across rooms and days so the board looks lived in. */
export const demoBookings: [number, number][][] = [
  [
    [9, 10.5],
    [13, 14],
    [16, 17.5],
  ],
  [
    [8.5, 9.5],
    [11, 12.5],
    [15, 16],
  ],
  [
    [10, 12],
    [14.5, 15.5],
  ],
  [
    [9.5, 11],
    [12.5, 13.5],
    [17, 19],
  ],
  [
    [8, 9],
    [13.5, 15.5],
  ],
  [
    [11.5, 12.5],
    [15, 17],
  ],
  [
    [9, 9.5],
    [10, 11],
    [14, 14.5],
    [18, 20],
  ],
];

export const roomPolicies = [
  "Members pay with room hours from their plan first, then at the member rate (20% off).",
  "Cancel up to 24 hours ahead for a full refund or credit back. Inside 24 hours we keep half.",
  "Coffee, tea and water are included. Lunch for the room can be added for $14 a person.",
  "Rooms are set back to their standard layout at the end of each booking, so leave five minutes.",
];

/* ------------------------------------------------------------ memberships */

export type MembershipPlan = {
  id: string;
  name: string;
  monthly: number;
  from?: boolean;
  unit: string;
  summary: string;
  includes: string[];
  roomHours: number;
  featured?: boolean;
};

export const plans: MembershipPlan[] = [
  {
    id: "flex",
    name: "Flex",
    monthly: 189,
    unit: "per month",
    summary:
      "Eight days a month at any house. For people who split the week between home and somewhere better.",
    includes: [
      "8 days a month at any location",
      "2 meeting-room hours",
      "Members' events and the Thursday note",
      "Kitchen, booths and printing",
    ],
    roomHours: 2,
  },
  {
    id: "resident",
    name: "Resident",
    monthly: 329,
    unit: "per month",
    summary:
      "Unlimited hot desking everywhere, with 24/7 access at your home house.",
    includes: [
      "Unlimited days at all four locations",
      "24/7 access at your home location",
      "6 meeting-room hours",
      "2 guest day passes a month",
      "Mail handling",
    ],
    roomHours: 6,
    featured: true,
  },
  {
    id: "fixed",
    name: "Fixed desk",
    monthly: 419,
    unit: "per month",
    summary:
      "Your own desk, your own chair and a locker that stays where you left it.",
    includes: [
      "A dedicated desk and locker",
      "24/7 access at your home location",
      "10 meeting-room hours",
      "Registered business address",
      "Everything in Resident",
    ],
    roomHours: 10,
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 1480,
    from: true,
    unit: "per month, 2–6 people",
    summary:
      "A lockable studio for a small team, with your name on the directory board in the lobby.",
    includes: [
      "Furnished studio for 2 to 6",
      "20 meeting-room hours",
      "Your name on the lobby directory",
      "Signed-for parcels and guest list",
      "Everything in Fixed desk",
    ],
    roomHours: 20,
  },
];

export const dropIn = [
  {
    name: "Day pass",
    price: 29,
    note: "Any house, 8 am – 6 pm, coffee included",
  },
  {
    name: "Five-day pack",
    price: 125,
    note: "Five days, valid for three months, shareable",
  },
  {
    name: "Meeting rooms",
    price: 18,
    perHour: true,
    note: "Any room at any house, no membership needed",
  },
];

/** Paying yearly takes this share off every monthly plan. */
export const annualDiscount = 0.15;

export const comparison: { label: string; values: string[] }[] = [
  {
    label: "Days per month",
    values: ["8", "Unlimited", "Unlimited", "Unlimited"],
  },
  {
    label: "Locations",
    values: ["All four", "All four", "Home + others", "Home + others"],
  },
  {
    label: "24/7 access",
    values: ["—", "Home house", "Home house", "Home house"],
  },
  { label: "Meeting-room hours", values: ["2", "6", "10", "20"] },
  { label: "Guest day passes", values: ["—", "2", "4", "8"] },
  {
    label: "Locker",
    values: ["Day locker", "Day locker", "Your own", "In studio"],
  },
  {
    label: "Business address & mail",
    values: ["—", "Mail only", "Yes", "Yes"],
  },
  {
    label: "Printing",
    values: ["50 pages", "200 pages", "400 pages", "1,000 pages"],
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Can I try it before I join?",
    a: "Yes. Book a tour and your first day is on us. Stay for the afternoon, use a booth, sit in the Library and see whether the place suits you.",
  },
  {
    q: "Is there a minimum term?",
    a: "Monthly plans run month to month with 30 days' notice. Yearly plans are paid up front with 15% off and can be moved to another member if you leave early.",
  },
  {
    q: "What is a home house?",
    a: "The location where your key card works around the clock. Residents and Fixed-desk members can use the other houses during staffed hours at no extra cost.",
  },
  {
    q: "Can I bring a dog?",
    a: "Mill Yard's ground floor is dog friendly. Elsewhere, only assistance dogs. One dog per member, and they stay off the furniture.",
  },
  {
    q: "How do meeting-room hours work?",
    a: "Each plan includes hours that refresh on the 1st. Unused hours don't roll over. Extra time is billed at the member rate, 20% under the public price.",
  },
  {
    q: "Do you have parking?",
    a: "Harbour Row has twenty covered spaces at $8 a day. The other houses are a short walk from tram, train or bus, and all have secure bike storage.",
  },
  {
    q: "Can my company pay?",
    a: "Yes. We invoice monthly with VAT receipts, and Studio plans can be split across up to three cost centres.",
  },
];

/* ------------------------------------------------------------------ events */

export type EventKind = "Social" | "Workshop" | "Talk" | "Clinic";

export type CommonsEvent = {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  start: string;
  end: string;
  locationId: string;
  host: { name: string; role: string };
  price: number;
  capacity: number;
  taken: number;
  image: Img;
  summary: string;
  body: string[];
  schedule: [string, string][];
};

export const eventKinds: EventKind[] = ["Social", "Workshop", "Talk", "Clinic"];

export const events: CommonsEvent[] = [
  {
    id: "friday-table-oct",
    title: "The Friday Table",
    kind: "Social",
    date: "2026-10-23",
    start: "17:30",
    end: "20:00",
    locationId: "mill-yard",
    host: { name: "Priya Nandakumar", role: "Mill Yard host" },
    price: 0,
    capacity: 60,
    taken: 38,
    image: images.supper,
    summary:
      "One long table, whatever the kitchen made, and the people who sat near you all week without saying hello.",
    body: [
      "Every last Friday of the month we push the Workshop tables into one line and cook. This month it's a big pot of dal, flatbreads from the bakery next door and a cheese board members keep adding to.",
      "Bring a guest if you like. There's no programme and no name tags: Priya will introduce you to someone, and that is usually enough.",
    ],
    schedule: [
      ["17:30", "Tables go up, drinks open"],
      ["18:15", "Food out of the kitchen"],
      ["19:30", "Clearing up, which is half the fun"],
    ],
  },
  {
    id: "pricing-freelance-work",
    title: "Pricing your freelance work",
    kind: "Workshop",
    date: "2026-10-28",
    start: "12:30",
    end: "14:00",
    locationId: "harbour-row",
    host: { name: "Maren Lindqvist", role: "Studio Sable, member since 2019" },
    price: 15,
    capacity: 20,
    taken: 17,
    image: images.hands,
    summary:
      "Day rates, project fees and retainers, worked through with real numbers from members who'll share theirs.",
    body: [
      "Maren has run a two-person translation studio at Harbour Row for seven years and has raised her rates five times. She'll show the spreadsheet she uses and how each rise went.",
      "Bring a project you're about to quote. In the second half we work through three of them together, so come ready to talk numbers.",
    ],
    schedule: [
      ["12:30", "Lunch and introductions"],
      ["12:45", "Day rate vs. project fee vs. retainer"],
      ["13:20", "Three live quotes from the room"],
    ],
  },
  {
    id: "tax-office-hours",
    title: "Office hours: self-employed tax",
    kind: "Clinic",
    date: "2026-11-04",
    start: "10:00",
    end: "13:00",
    locationId: "larkspur-hall",
    host: { name: "Gareth Price", role: "Price & Ward accountants" },
    price: 0,
    capacity: 9,
    taken: 4,
    image: images.deskTop,
    summary:
      "Twenty-minute one-to-ones in Folio with an accountant who works with sole traders and small studios.",
    body: [
      "Bring the question you've been putting off: expenses, registering for VAT, what to set aside each month, whether to become a company.",
      "Slots are twenty minutes and private. Sign up below and Ines will send your time the day before.",
    ],
    schedule: [
      ["10:00", "First slot"],
      ["11:20", "Tea break"],
      ["12:40", "Last slot"],
    ],
  },
  {
    id: "harbour-open-studios",
    title: "Harbour Row open studios",
    kind: "Social",
    date: "2026-11-06",
    start: "16:00",
    end: "20:00",
    locationId: "harbour-row",
    host: { name: "Tomás Reyes", role: "Harbour Row host" },
    price: 0,
    capacity: 150,
    taken: 64,
    image: images.harbourRow,
    summary:
      "Twelve studios open their doors. Prints, prototypes, a sound booth demo and the bar open from four.",
    body: [
      "Once a season the Harbour Row studios prop their doors open and show what they've been making. Expect a print sale from Fieldnote, a playable build from Hollow Oak Games and listening sessions in the podcast booth.",
      "Free and open to the public, so bring friends, clients and anyone who's ever asked what you actually do all day.",
    ],
    schedule: [
      ["16:00", "Doors and studios open"],
      ["17:30", "Hollow Oak playtest on the big screen"],
      ["19:00", "Last orders, studio doors close at eight"],
    ],
  },
  {
    id: "show-and-tell-31",
    title: "Show & Tell No. 31",
    kind: "Talk",
    date: "2026-11-12",
    start: "18:30",
    end: "20:00",
    locationId: "mill-yard",
    host: { name: "Femi Adeyemi", role: "Low Tide Audio, member since 2017" },
    price: 5,
    capacity: 70,
    taken: 41,
    image: images.talk,
    summary:
      "Five members, five minutes each, one thing they've made this year. Questions after, drinks during.",
    body: [
      "Show & Tell is the oldest thing we do: five short talks in the Workshop on whatever members have been working on, from a children's book to a bridge.",
      "This round: a podcast that went to number three, a ceramic studio's first kiln, a legal startup's failed pivot, a bike frame made from bamboo and a type specimen printed by hand.",
    ],
    schedule: [
      ["18:30", "Doors and drinks"],
      ["19:00", "Five talks, five minutes each"],
      ["19:40", "Questions and the bar"],
    ],
  },
  {
    id: "quiet-morning-nov",
    title: "Quiet Morning",
    kind: "Workshop",
    date: "2026-11-17",
    start: "08:00",
    end: "12:00",
    locationId: "larkspur-hall",
    host: { name: "Ines Albrecht", role: "Larkspur Hall host" },
    price: 0,
    capacity: 40,
    taken: 22,
    image: images.larkspurStacks,
    summary:
      "Phones in the basket at eight, three focused sprints, coffee between. You'll be amazed what gets done.",
    body: [
      "Quiet Morning is a phone-free focus session in the reading room. Hand your phone in at the door, write down what you'll finish, and work in three fifty-minute blocks.",
      "At noon we compare lists over coffee. Members only; day pass holders may join for the price of a day pass.",
    ],
    schedule: [
      ["08:00", "Phones in, goals written"],
      ["08:15", "Three 50-minute sprints"],
      ["11:45", "Lists compared, phones back"],
    ],
  },
  {
    id: "portfolio-review-night",
    title: "Portfolio review night",
    kind: "Clinic",
    date: "2026-11-19",
    start: "18:00",
    end: "20:30",
    locationId: "station-quarter",
    host: {
      name: "Hana Kobayashi",
      role: "Fieldnote Studio, creative director",
    },
    price: 10,
    capacity: 16,
    taken: 9,
    image: images.cityDesks,
    summary:
      "Fifteen-minute reviews with four senior designers and art directors from around the house.",
    body: [
      "Bring a laptop or a printed book. Four reviewers rotate around the room, so you'll get two honest reviews from people who hire.",
      "Juniors, career changers and anyone about to send a portfolio somewhere important will get the most out of it.",
    ],
    schedule: [
      ["18:00", "Arrive and set up"],
      ["18:15", "First review round"],
      ["19:30", "Second round, then drinks"],
    ],
  },
  {
    id: "grant-writing-clinic",
    title: "Grant writing clinic",
    kind: "Workshop",
    date: "2026-12-02",
    start: "14:00",
    end: "16:30",
    locationId: "mill-yard",
    host: { name: "Ruth Achterberg", role: "Independent fundraiser" },
    price: 15,
    capacity: 24,
    taken: 8,
    image: images.laptops,
    summary:
      "How arts and research funders read applications, and a red-pen session on your own draft.",
    body: [
      "Ruth has sat on three funding panels and written applications for small studios for a decade. She'll walk through what panels skim, what they read twice and what quietly sinks a bid.",
      "Bring a draft of one page or less. The second half is paired editing with Ruth circulating.",
    ],
    schedule: [
      ["14:00", "How panels read"],
      ["15:00", "Coffee"],
      ["15:15", "Red-pen session on your draft"],
    ],
  },
  {
    id: "winter-supper",
    title: "Winter Supper",
    kind: "Social",
    date: "2026-12-10",
    start: "19:00",
    end: "23:00",
    locationId: "harbour-row",
    host: { name: "The Commons team", role: "All four houses" },
    price: 25,
    capacity: 90,
    taken: 57,
    image: images.lounge,
    summary:
      "The one night all four houses sit down together. Three courses in The Hold, a band, and the annual awards nobody takes seriously.",
    body: [
      "Our end-of-year supper in The Hold: three courses from Galley & Co, a five-piece band and the Commons Awards, including Most Borrowed Charger and Best Use of a Phone Booth.",
      "Tickets cover food and the first two drinks. Partners and friends are very welcome.",
    ],
    schedule: [
      ["19:00", "Drinks on the Deck"],
      ["19:45", "Supper in The Hold"],
      ["21:30", "Awards, then the band"],
    ],
  },
];

/* ---------------------------------------------------------------- community */

export const directory: { name: string; trade: string; where: string }[] = [
  {
    name: "Fieldnote Studio",
    trade: "Brand & print design",
    where: "Harbour Row · Studio 3",
  },
  {
    name: "Low Tide Audio",
    trade: "Podcast production",
    where: "Harbour Row · Studio 7",
  },
  {
    name: "Okafor & Lin",
    trade: "Architecture",
    where: "Harbour Row · Studio 11",
  },
  {
    name: "Hollow Oak Games",
    trade: "Game development",
    where: "Harbour Row · Mezzanine",
  },
  {
    name: "Studio Sable",
    trade: "Translation",
    where: "Harbour Row · Studio 2",
  },
  {
    name: "Paper Kite Press",
    trade: "Children's books",
    where: "Mill Yard · 2nd floor",
  },
  {
    name: "Brightline Legal",
    trade: "Employment law",
    where: "Mill Yard · 3rd floor",
  },
  {
    name: "North Pantry",
    trade: "Food start-up",
    where: "Mill Yard · Studio 5",
  },
  {
    name: "Wren Analytics",
    trade: "Data consultancy",
    where: "Mill Yard · 2nd floor",
  },
  {
    name: "Margot Ellery",
    trade: "Novelist",
    where: "Larkspur Hall · Stacks 14",
  },
  {
    name: "Halden Research",
    trade: "Climate policy",
    where: "Larkspur Hall · Stacks 6",
  },
  {
    name: "Tessellate",
    trade: "Accessibility audits",
    where: "Station Quarter · Hot desk",
  },
];

export const stories: {
  quote: string;
  name: string;
  business: string;
  plan: string;
}[] = [
  {
    quote:
      "I came for a desk and stayed for the Friday Table. Two of my biggest clients are people I met clearing up after it.",
    name: "Hana Kobayashi",
    business: "Fieldnote Studio",
    plan: "Studio, Harbour Row",
  },
  {
    quote:
      "I wrote my second novel in the Larkspur reading room. Nobody speaks, the lamps are perfect and the tea room is right there when I need a person.",
    name: "Margot Ellery",
    business: "Novelist",
    plan: "Fixed desk, Larkspur Hall",
  },
  {
    quote:
      "We started as two people on a Flex plan. Six years later we're nine, on the mezzanine, and we still test every build in The Hold.",
    name: "Jonah Pereira",
    business: "Hollow Oak Games",
    plan: "Studio, Harbour Row",
  },
];

export type Notice = {
  id: string;
  title: string;
  body: string;
  from: string;
  tag: "Wanted" | "Offered" | "Clubs" | "Free";
};

export const notices: Notice[] = [
  {
    id: "n1",
    tag: "Wanted",
    title: "Rust developer, three months",
    body: "Help us port our level editor. Part-time is fine, desk at Harbour Row included.",
    from: "Hollow Oak Games",
  },
  {
    id: "n2",
    tag: "Free",
    title: "Two monitor arms",
    body: "Clamp fit, both working. On the free shelf by the Mill Yard kitchen until Friday.",
    from: "Wren Analytics",
  },
  {
    id: "n3",
    tag: "Clubs",
    title: "Tuesday run club",
    body: "5 km along the docks, leaves the Harbour Row loading doors at 7:15 am. All paces.",
    from: "Tomás, front desk",
  },
  {
    id: "n4",
    tag: "Offered",
    title: "Spare studio seat",
    body: "One desk in our studio for six months while a colleague is on leave. Quiet, plants, big window.",
    from: "Okafor & Lin",
  },
  {
    id: "n5",
    tag: "Wanted",
    title: "Illustrator for a picture book",
    body: "Thirty-two pages, warm and a bit strange. Paid, with royalties. Portfolio links to Paper Kite.",
    from: "Paper Kite Press",
  },
  {
    id: "n6",
    tag: "Clubs",
    title: "Lunchtime chess",
    body: "Thursdays at 12:30 in the Larkspur tea room. Boards provided, talking allowed.",
    from: "Ines, front desk",
  },
  {
    id: "n7",
    tag: "Offered",
    title: "Free accessibility check",
    body: "Twenty-minute review of your site or app for any member. Book a slot by the booths.",
    from: "Tessellate",
  },
  {
    id: "n8",
    tag: "Free",
    title: "Box of tote bags",
    body: "Leftover from a launch, good canvas, very orange. Help yourself, Station Quarter lockers.",
    from: "North Pantry",
  },
];

export const perks = [
  {
    title: "Member rates on rooms",
    text: "20% off every meeting room at every house, on top of your included hours.",
  },
  {
    title: "Galley & Co lunches",
    text: "10% off at the canteen next to Mill Yard and the Harbour Row bar's lunch menu.",
  },
  {
    title: "Cycle service",
    text: "Free safety check every quarter from the Harbour Row bike co-op.",
  },
  {
    title: "Guest passes",
    text: "Bring a collaborator in for the day; Resident plans and up include them.",
  },
];

/* ------------------------------------------------------------------- about */

export const about = {
  intro:
    "Commons started in 2014 with forty desks in a cotton mill and one rule: everyone says good morning. Four houses later, the rule still holds and so does the idea behind it — that people do better work when they do it near other people.",
  story: [
    "We are a small, independent company run by the people who staff the front desks. No investors want us in twelve cities by next year, so we open a new house only when an old building and a neighbourhood ask for one.",
    "Every house is different because the buildings are: a mill, a warehouse, a library, a corner above a station. What they share is a kitchen in the middle, people at the front desk who learn your name, and a calendar that gives you a reason to look up from your screen.",
  ],
  timeline: [
    {
      year: "2014",
      text: "Mill Yard opens with forty desks and a borrowed espresso machine.",
    },
    {
      year: "2016",
      text: "The first Friday Table. Twelve people, one pot of chilli.",
    },
    {
      year: "2019",
      text: "Harbour Row opens on the docks with twelve studios and The Hold.",
    },
    {
      year: "2022",
      text: "Larkspur Hall reopens as our quiet house, shelves and lamps intact.",
    },
    {
      year: "2025",
      text: "Station Quarter opens above Eastmere Central for people between trains.",
    },
    {
      year: "2026",
      text: "Show & Tell reaches its thirtieth edition. Membership passes 900.",
    },
  ],
  team: [
    {
      name: "Ada Whitcombe",
      role: "Founder",
      line: "Signed the Mill Yard lease on a whim and still does Monday breakfasts.",
    },
    {
      name: "Priya Nandakumar",
      role: "Host, Mill Yard",
      line: "Runs the Friday Table and the lost-property shelf.",
    },
    {
      name: "Tomás Reyes",
      role: "Host, Harbour Row",
      line: "Fixes grinders, books studios, leads the Tuesday run.",
    },
    {
      name: "Ines Albrecht",
      role: "Host, Larkspur Hall",
      line: "Keeper of the reading room's silence.",
    },
    {
      name: "Daniel Osei",
      role: "Host, Station Quarter",
      line: "Opens at seven, knows every train time.",
    },
    {
      name: "Leila Haddad",
      role: "Events & community",
      line: "Programmes Show & Tell, clinics and the Winter Supper.",
    },
  ],
  rules: [
    {
      title: "Say good morning",
      text: "To the front desk, and to whoever's next to you. It counts for more than it sounds.",
    },
    {
      title: "Calls in booths",
      text: "Headphones on for video, booths for anything longer than a minute. Never in the Library or the reading room.",
    },
    {
      title: "Leave the table as you found it",
      text: "Hot desks are cleared by 7 pm. Anything left goes on the shelf by the kitchen.",
    },
    {
      title: "Wash your mug",
      text: "Or anyone's mug. The dishwasher doesn't care whose it is.",
    },
    {
      title: "Book rooms, don't squat",
      text: "If a room is free and not booked, book it for the time you need on the board.",
    },
    {
      title: "Guests sign in",
      text: "So we know who's in the building if the fire alarm goes. Members are responsible for their guests.",
    },
  ],
};

/* -------------------------------------------------------------------- home */

export const home = {
  title: "Good work. Better company.",
  lede: "Desks, studios and meeting rooms in four old buildings across Eastmere, with a kitchen in the middle of each and people at the front desk who learn your name.",
  statement: ["Some days need quiet.", "Some need a conversation."],
  statementEnd: "There's a corner for both.",
  statementText:
    "For independent minds, small teams and people between places. Pick the room that suits the day, then pick a different one tomorrow.",
  day: [
    {
      time: "07:00",
      title: "Doors open",
      text: "Station Quarter's coffee bar starts pulling shots for the first train.",
    },
    {
      time: "09:30",
      title: "Morning stand-up at the urn",
      text: "Not a meeting. Just ten minutes in the kitchen with whoever's around.",
    },
    {
      time: "12:30",
      title: "Lunch table",
      text: "Bring yours to the long table, or come along to the canteen next door.",
    },
    {
      time: "15:00",
      title: "Cake o'clock",
      text: "Somebody's birthday, somebody's launch, somebody's experiment.",
    },
    {
      time: "17:30",
      title: "Friday Table",
      text: "Last Friday of the month: one long table, a pot from the kitchen, bring a guest.",
    },
  ],
};

/* -------------------------------------------------------------------- tour */

export const tour = {
  title: "Come for a coffee, stay for the day",
  text: "Tours take twenty minutes with one of our hosts. Afterwards, your first day is free: sit wherever you like, use a booth and see how it feels.",
  times: ["09:30", "11:00", "13:00", "15:30", "17:00"],
  sizes: ["Just me", "2–5 people", "6–12 people", "More than 12"],
  promises: [
    "A twenty-minute walk round with a host, not a sales pitch",
    "Your first full day free, coffee included",
    "Prices and availability in writing the same day",
  ],
};
