import nightBoardwalk from "./assets/night-boardwalk.jpg";
import greyHood from "./assets/grey-hood.jpg";
import marigold from "./assets/marigold-overpass.jpg";
import boxyTee from "./assets/boxy-tee.jpg";
import skater from "./assets/skater.jpg";
import totePhone from "./assets/tote-phone.jpg";
import alley from "./assets/alley.jpg";
import wall from "./assets/wall.jpg";

/* ───────── Brand ───────── */

export const brand = {
  name: "Drop",
  sector: "Streetwear store",
  tagline: "Small runs. Saturday drops. No restocks.",
  announcement:
    "Free shipping over $150 · Ground Floor raffle closes Thu 23:59 ET",
  email: "hello@drop.example",
  phone: "+1 555 0188",
  phoneHref: "tel:+15550188",
  address: ["88 Hollis Street", "Lower Dockside"],
  timezone: "America/New_York",
  tzLabel: "ET",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/drops", label: "Drops" },
  { to: "/shop", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/raffle", label: "Raffle" },
  { to: "/store", label: "Store" },
  { to: "/help", label: "Help" },
];

/* ───────── Images ───────── */

export type Photo = { src: string; alt: string; w: number; h: number };

export const photos = {
  nightBoardwalk: {
    src: nightBoardwalk,
    alt: "A figure in a hood walking a boardwalk at night, lamps fading into the distance",
    w: 1024,
    h: 683,
  },
  greyHood: {
    src: greyHood,
    alt: "Someone in a grey hood and backpack thumbing a ride on an autumn road",
    w: 1024,
    h: 683,
  },
  marigold: {
    src: marigold,
    alt: "A woman in a marigold short-sleeve top standing on an overpass above city traffic",
    w: 1500,
    h: 1000,
  },
  boxyTee: {
    src: boxyTee,
    alt: "An oversized black tee worn as a dress with slouched white socks and chunky sneakers",
    w: 1125,
    h: 1500,
  },
  skater: {
    src: skater,
    alt: "A skater in a black tee and grey work pants mid-air over a concrete ledge",
    w: 1500,
    h: 998,
  },
  totePhone: {
    src: totePhone,
    alt: "A young woman with a canvas tote checking her phone against a painted wall",
    w: 1000,
    h: 1500,
  },
  alley: {
    src: alley,
    alt: "A narrow alley with every wall covered in graffiti, a van parked at the far end",
    w: 994,
    h: 1500,
  },
  wall: {
    src: wall,
    alt: "A wall of orange and teal graffiti lettering with flattened boxes piled below",
    w: 1500,
    h: 1000,
  },
} satisfies Record<string, Photo>;

/* ───────── Drops ───────── */

export type DropMode = "online" | "raffle" | "instore";

export type Drop = {
  id: string;
  number: number;
  name: string;
  /** Release moment with offset, in store time. */
  date: string;
  mode: DropMode;
  /** Raffle drops only: when entries close. */
  raffleCloses?: string;
  collab?: string;
  summary: string;
  story: string[];
  photo: Photo;
  run: number;
};

export const modeLabel: Record<DropMode, string> = {
  online: "Online, first come",
  raffle: "Raffle only",
  instore: "Hollis St first, online at 18:00",
};

/** The drop the demo clock keeps in the future (see lib/time.ts). */
export const nextDropId = "last-light";

export const drops: Drop[] = [
  {
    id: "concrete-season",
    number: 11,
    name: "Concrete Season",
    date: "2026-09-05T11:00:00-04:00",
    mode: "online",
    summary:
      "The heavyweight basics, cut boxy and garment-dyed in three colours you can wear into the ground.",
    story: [
      "Every autumn starts here: a boxy tee and a heavy hood that we fit, wash and refit until the shoulders sit right on everyone in the shop.",
      "Both pieces are garment-dyed after sewing, so the seams take the colour a shade darker and every piece fades on its own schedule.",
    ],
    photo: photos.boxyTee,
    run: 400,
  },
  {
    id: "night-bus",
    number: 12,
    name: "Night Bus",
    date: "2026-09-19T11:00:00-04:00",
    mode: "online",
    summary:
      "A coach jacket and a cargo built for the last ride home: reflective tape, deep pockets, nothing that rattles.",
    story: [
      "Named for the N9, the bus that gets half the shop home after a late close. Everything in it was tested on that route between October and March.",
      "The coach jacket has a 3M strip hidden under the back yoke that only shows when headlights hit it. The cargo has a phone pocket you can reach sitting down.",
    ],
    photo: photos.alley,
    run: 260,
  },
  {
    id: "paper-club",
    number: 13,
    name: "Paper Club",
    date: "2026-10-03T12:00:00-04:00",
    mode: "instore",
    collab: "Ines Valle",
    summary:
      "With printmaker Ines Valle: hand-pulled screen prints on tees, totes and a folded beanie. Hollis Street got first pick.",
    story: [
      "Ines runs a two-colour press out of a garage on Rook Lane and prints our hang tags. This time we gave her the whole drop.",
      "Every print was pulled by hand over four nights, so registration wanders a little from piece to piece. That is the point.",
    ],
    photo: photos.totePhone,
    run: 300,
  },
  {
    id: "last-light",
    number: 14,
    name: "Last Light",
    date: "2026-10-24T11:00:00-04:00",
    mode: "online",
    summary:
      "The dusk capsule: a 480 gsm hood, an afterglow tee, a long sleeve and a six-panel, in black and ember.",
    story: [
      "Last Light is the twenty minutes after the streetlamps come on and before it is properly dark. We shot it on the boardwalk at exactly that time, four nights running.",
      "The ember colour is matched to a sodium lamp. The hood is our heaviest yet, brushed inside, with a double-layer hood that holds its shape.",
    ],
    photo: photos.nightBoardwalk,
    run: 350,
  },
  {
    id: "ground-floor",
    number: 15,
    name: "Ground Floor",
    date: "2026-11-07T11:00:00-05:00",
    mode: "raffle",
    raffleCloses: "2026-11-05T23:59:00-05:00",
    collab: "Low Ledge Skate",
    summary:
      "With Low Ledge Skate, two doors down: a hood with a padded elbow and a seven-ply deck. Raffle only, 120 of each.",
    story: [
      "Low Ledge has been fixing our bearings and lending us their ramp for photos since the shop opened. Ground Floor is the first thing we have made together.",
      "Because the run is small, it is raffle only. One entry per person, drawn at random on Friday at 18:00, winners collect at the shop or pay for shipping.",
    ],
    photo: photos.skater,
    run: 240,
  },
  {
    id: "cold-open",
    number: 16,
    name: "Cold Open",
    date: "2026-11-21T11:00:00-05:00",
    mode: "online",
    summary:
      "One piece for winter: an insulated coach jacket in deep olive. Full lineup posted the Monday before.",
    story: [
      "Cold Open is a single jacket: our coach shape, filled with recycled insulation and finished with a storm flap so it can take a December queue.",
      "Sizes, photos and the exact run land on the Monday before the drop. Add it to your calendar and we will see you at 11:00.",
    ],
    photo: photos.greyHood,
    run: 180,
  },
];

/* ───────── Products ───────── */

export type Shape =
  | "tee"
  | "longsleeve"
  | "hoodie"
  | "jacket"
  | "pants"
  | "cap"
  | "beanie"
  | "tote"
  | "deck";
export type Category =
  | "Tees"
  | "Long sleeves"
  | "Hoods"
  | "Outerwear"
  | "Pants"
  | "Headwear"
  | "Goods";
export type Colorway = { name: string; hex: string; ink: string };

export type Product = {
  id: string;
  name: string;
  drop: string;
  category: Category;
  shape: Shape;
  price: number;
  colors: Colorway[];
  sizes: string[];
  /** Units left per size, same order as sizes. */
  stock: number[];
  print: { front: string; back: string[] };
  blurb: string;
  fabric: string;
  fit: string;
  details: string[];
  limit: number;
};

const apparel = ["XS", "S", "M", "L", "XL", "XXL"];
const ink = "#121212";
const bone = "#ece5d6";

export const categories: Category[] = [
  "Tees",
  "Long sleeves",
  "Hoods",
  "Outerwear",
  "Pants",
  "Headwear",
  "Goods",
];

export const products: Product[] = [
  {
    id: "concrete-boxy-tee",
    name: "Concrete Boxy Tee",
    drop: "concrete-season",
    category: "Tees",
    shape: "tee",
    price: 54,
    colors: [
      { name: "Ash", hex: "#a9a8a2", ink },
      { name: "Black", hex: "#1a1a1a", ink: bone },
      { name: "Bone", hex: bone, ink },
    ],
    sizes: apparel,
    stock: [0, 4, 11, 7, 2, 0],
    print: { front: "DROP", back: ["CONCRETE", "SEASON", "DROP 011"] },
    blurb:
      "The tee everything else in the shop is fitted against. Dropped shoulder, wide body, a rib collar that does not bacon.",
    fabric: "260 gsm combed cotton jersey, garment-dyed",
    fit: "Boxy. Take your usual size for the intended fit, one down for a regular tee.",
    details: [
      "Water-based print, front and back",
      "Taped neck, double-needle hems",
      "Pre-shrunk, wash cold inside out",
      "Made in Portugal",
    ],
    limit: 3,
  },
  {
    id: "concrete-hood",
    name: "Concrete Heavyweight Hood",
    drop: "concrete-season",
    category: "Hoods",
    shape: "hoodie",
    price: 138,
    colors: [
      { name: "Ash", hex: "#9c9b95", ink },
      { name: "Black", hex: "#1a1a1a", ink: bone },
    ],
    sizes: apparel,
    stock: [1, 0, 3, 5, 0, 2],
    print: { front: "DROP", back: ["CONCRETE", "SEASON"] },
    blurb:
      "A 450 gsm hood with no drawcord to lose in the wash and a pocket deep enough for a paperback.",
    fabric: "450 gsm loopback cotton, garment-dyed",
    fit: "Boxy with a cropped rib hem. True to size.",
    details: [
      "Double-layer hood, no drawcord",
      "Side-seam rib panels",
      "Flatlock seams throughout",
      "Made in Portugal",
    ],
    limit: 2,
  },
  {
    id: "night-bus-coach",
    name: "Night Bus Coach Jacket",
    drop: "night-bus",
    category: "Outerwear",
    shape: "jacket",
    price: 168,
    colors: [
      { name: "Black", hex: "#191919", ink: "#ff5a1f" },
      { name: "Navy", hex: "#1f2a44", ink: bone },
    ],
    sizes: apparel,
    stock: [0, 2, 0, 4, 3, 1],
    print: { front: "N9", back: ["NIGHT BUS", "LAST STOP", "DOCKSIDE"] },
    blurb:
      "A coach jacket with a reflective strip hidden under the yoke, a brushed lining and snaps you can work with gloves on.",
    fabric: "Nylon taslan shell, DWR finish, brushed tricot lining",
    fit: "Relaxed through the body, sleeves cut long. True to size.",
    details: [
      "3M reflective tape under back yoke",
      "Six heavy-duty snaps",
      "Inside phone pocket with zip",
      "Made in Portugal",
    ],
    limit: 2,
  },
  {
    id: "route-9-cargo",
    name: "Route 9 Cargo",
    drop: "night-bus",
    category: "Pants",
    shape: "pants",
    price: 128,
    colors: [
      { name: "Black", hex: "#1c1c1c", ink: bone },
      { name: "Stone", hex: "#b7ad98", ink },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    stock: [2, 6, 0, 3, 1],
    print: { front: "R9", back: ["ROUTE 9"] },
    blurb:
      "Straight, wide cargo pants with a seated phone pocket on the thigh and a gusset so you can actually skate in them.",
    fabric: "11 oz cotton ripstop, enzyme-washed",
    fit: "Straight wide leg, 78 cm inseam, cinch tabs at the hem.",
    details: [
      "Bellows cargo pockets with snap flaps",
      "Crotch gusset",
      "Woven Drop label at back pocket",
      "Made in Portugal",
    ],
    limit: 2,
  },
  {
    id: "paper-club-tee",
    name: "Paper Club Print Tee",
    drop: "paper-club",
    category: "Tees",
    shape: "tee",
    price: 62,
    colors: [
      { name: "Bone", hex: bone, ink: "#d9481a" },
      { name: "Marigold", hex: "#e3a23a", ink },
    ],
    sizes: apparel,
    stock: [0, 0, 2, 1, 0, 0],
    print: { front: "PC", back: ["PAPER", "CLUB", "I. VALLE"] },
    blurb:
      "Ines Valle's two-colour back print, pulled by hand. Registration wanders a little on every piece.",
    fabric: "240 gsm cotton jersey, garment-dyed",
    fit: "Boxy. Take your usual size.",
    details: [
      "Hand-pulled plastisol screen print",
      "Signed hang tag, numbered out of 150",
      "Made in Portugal, printed on Rook Lane",
    ],
    limit: 1,
  },
  {
    id: "paper-club-tote",
    name: "Paper Club Tote",
    drop: "paper-club",
    category: "Goods",
    shape: "tote",
    price: 38,
    colors: [{ name: "Natural", hex: "#e4dcc8", ink: "#d9481a" }],
    sizes: ["One size"],
    stock: [14],
    print: { front: "PAPER CLUB", back: ["PAPER", "CLUB"] },
    blurb:
      "A heavy canvas tote that fits a laptop, a hood and the bag you said you would not need.",
    fabric: "16 oz cotton canvas",
    fit: "40 × 42 × 12 cm with a boxed base. Handles drop 30 cm.",
    details: [
      "Inside slip pocket",
      "Hand-pulled print both sides",
      "Made in Portugal",
    ],
    limit: 3,
  },
  {
    id: "folded-beanie",
    name: "Folded Beanie",
    drop: "paper-club",
    category: "Headwear",
    shape: "beanie",
    price: 36,
    colors: [
      { name: "Signal", hex: "#ff5a1f", ink },
      { name: "Black", hex: "#1a1a1a", ink: bone },
      { name: "Heather", hex: "#8e8d88", ink },
    ],
    sizes: ["One size"],
    stock: [22],
    print: { front: "DROP", back: ["DROP"] },
    blurb: "A deep-cuff rib beanie with a woven label you can fold in or out.",
    fabric: "Merino and recycled acrylic rib knit",
    fit: "One size, deep double cuff.",
    details: ["Woven label on cuff", "Knitted in Scotland"],
    limit: 3,
  },
  {
    id: "last-light-hood",
    name: "Last Light Hood",
    drop: "last-light",
    category: "Hoods",
    shape: "hoodie",
    price: 148,
    colors: [
      { name: "Black", hex: "#171717", ink: "#ff5a1f" },
      { name: "Ember", hex: "#b8461f", ink },
    ],
    sizes: apparel,
    stock: [12, 30, 40, 40, 24, 10],
    print: { front: "LL", back: ["LAST", "LIGHT", "DROP 014"] },
    blurb:
      "Our heaviest hood: 480 gsm, brushed inside, with a double-layer hood that holds its shape on the walk home.",
    fabric: "480 gsm brushed-back cotton fleece",
    fit: "Boxy with a dropped shoulder. True to size.",
    details: [
      "Double-layer hood",
      "Puff print, front and back",
      "Kangaroo pocket with hidden phone sleeve",
      "Made in Portugal",
    ],
    limit: 2,
  },
  {
    id: "afterglow-tee",
    name: "Afterglow Tee",
    drop: "last-light",
    category: "Tees",
    shape: "tee",
    price: 58,
    colors: [
      { name: "Black", hex: "#171717", ink: "#ff5a1f" },
      { name: "Bone", hex: bone, ink: "#b8461f" },
    ],
    sizes: apparel,
    stock: [20, 40, 60, 60, 30, 14],
    print: { front: "LL", back: ["AFTER", "GLOW"] },
    blurb:
      "The tee half of the dusk capsule, with an ember back print that is matched to a sodium streetlamp.",
    fabric: "260 gsm combed cotton jersey",
    fit: "Boxy. Take your usual size.",
    details: ["Water-based print", "Taped neck", "Made in Portugal"],
    limit: 3,
  },
  {
    id: "streetlamp-longsleeve",
    name: "Streetlamp Long Sleeve",
    drop: "last-light",
    category: "Long sleeves",
    shape: "longsleeve",
    price: 72,
    colors: [
      { name: "Black", hex: "#171717", ink: bone },
      { name: "Ember", hex: "#b8461f", ink },
    ],
    sizes: apparel,
    stock: [10, 24, 30, 30, 18, 8],
    print: { front: "LL", back: ["STREET", "LAMP"] },
    blurb:
      "A long sleeve with rib cuffs and a sleeve print that runs wrist to elbow.",
    fabric: "240 gsm cotton jersey",
    fit: "Boxy body, long sleeves. True to size.",
    details: ["Sleeve and back print", "Rib cuffs", "Made in Portugal"],
    limit: 2,
  },
  {
    id: "dusk-six-panel",
    name: "Dusk Six-Panel",
    drop: "last-light",
    category: "Headwear",
    shape: "cap",
    price: 46,
    colors: [
      { name: "Black", hex: "#1a1a1a", ink: "#ff5a1f" },
      { name: "Olive", hex: "#4f5236", ink: bone },
    ],
    sizes: ["One size"],
    stock: [90],
    print: { front: "LL", back: ["DROP"] },
    blurb:
      "An unstructured six-panel in washed cotton twill with a brass slider at the back.",
    fabric: "Washed cotton twill",
    fit: "Unstructured, adjustable brass slider.",
    details: ["Embroidered front", "Six eyelets", "Made in Portugal"],
    limit: 2,
  },
  {
    id: "ground-floor-hood",
    name: "Ground Floor Hood",
    drop: "ground-floor",
    category: "Hoods",
    shape: "hoodie",
    price: 158,
    colors: [{ name: "Concrete", hex: "#8f8f8a", ink }],
    sizes: apparel,
    stock: [8, 20, 30, 30, 22, 10],
    print: { front: "GF", back: ["GROUND", "FLOOR", "LOW LEDGE"] },
    blurb:
      "Made with Low Ledge Skate: a heavyweight hood with padded elbows and a gusseted underarm for pushing.",
    fabric: "460 gsm cotton fleece, Cordura elbow panels",
    fit: "Boxy, sleeves cut a little long. True to size.",
    details: [
      "Padded Cordura elbows",
      "Underarm gussets",
      "Co-branded woven label",
      "Made in Portugal",
    ],
    limit: 1,
  },
  {
    id: "ground-floor-deck",
    name: "Ground Floor Deck",
    drop: "ground-floor",
    category: "Goods",
    shape: "deck",
    price: 85,
    colors: [{ name: "Signal", hex: "#ff5a1f", ink }],
    sizes: ["8.0", "8.25", "8.5"],
    stock: [40, 40, 40],
    print: { front: "GROUND FLOOR", back: ["LOW LEDGE"] },
    blurb:
      "Seven-ply hard rock maple from the same press Low Ledge uses for their shop decks, with a screen-printed bottom.",
    fabric: "7-ply North American maple",
    fit: "Medium concave, 14.25 in wheelbase on the 8.25.",
    details: [
      "Screen-printed graphic",
      "Ships without grip",
      "Pressed in Mexico",
    ],
    limit: 1,
  },
  {
    id: "cold-open-jacket",
    name: "Cold Open Jacket",
    drop: "cold-open",
    category: "Outerwear",
    shape: "jacket",
    price: 248,
    colors: [{ name: "Deep Olive", hex: "#3d4230", ink: "#ff5a1f" }],
    sizes: apparel,
    stock: [10, 30, 40, 40, 30, 12],
    print: { front: "CO", back: ["COLD", "OPEN"] },
    blurb:
      "Our coach jacket, insulated: recycled fill, a storm flap over the snaps and a hood that stows into the collar.",
    fabric: "Recycled nylon shell, 120 g recycled insulation",
    fit: "Relaxed, room for a hood underneath.",
    details: [
      "Stowable hood",
      "Storm flap",
      "Hand-warmer pockets",
      "Made in Portugal",
    ],
    limit: 1,
  },
];

/* ───────── Home ───────── */

export const home = {
  ritualTitle: "How a drop works",
  ritual: [
    {
      when: "Monday 18:00",
      title: "Lineup posted",
      text: "Photos, prices, sizes and the exact number made go up here and on the calendar.",
    },
    {
      when: "Thursday 23:59",
      title: "Raffle closes",
      text: "Raffle drops only. One entry per person, drawn at random on Friday at 18:00.",
    },
    {
      when: "Saturday 11:00",
      title: "Online",
      text: "One per size, a limit per order, and any order that looks like a bot gets cancelled.",
    },
    {
      when: "Saturday 12:00",
      title: "Hollis Street opens",
      text: "The line forms from 9:00. Wristbands go out at 10:00 so nobody has to stand there twice.",
    },
    {
      when: "Never",
      title: "Restocks",
      text: "When a run is gone, it is gone. The drop goes into the archive with what it sold.",
    },
  ],
  storeTitle: "One shop, one street",
  storeText:
    "Drop is a 40 square metre room on Hollis Street with a rail, a bench and a counter we built ourselves. Everything we sell online is on that rail first.",
  closeTitle: "See you at 11:00",
};

/* ───────── Lookbook ───────── */

export type Look = {
  photo: Photo;
  title: string;
  place: string;
  wearing: string[];
  note: string;
};

export const lookbook = {
  title: "Lookbook: the line",
  intro:
    "We do not hire models. These are people from the Saturday line, shot by Oona between the shop and the boardwalk, wearing their own fits and a piece or two of ours.",
  looks: [
    {
      photo: photos.nightBoardwalk,
      title: "Last Light",
      place: "Dockside boardwalk, 18:42",
      wearing: ["last-light-hood"],
      note: "The colour test. If the hood reads under a sodium lamp, it ships.",
    },
    {
      photo: photos.boxyTee,
      title: "Dress code",
      place: "Outside the shop",
      wearing: ["concrete-boxy-tee"],
      note: "Concrete tee in black, size XL, worn as intended by nobody but her.",
    },
    {
      photo: photos.skater,
      title: "Ledge test",
      place: "Low Ledge, back lot",
      wearing: ["route-9-cargo", "ground-floor-deck"],
      note: "The gusset in the Route 9 cargo exists because of this exact move.",
    },
    {
      photo: photos.totePhone,
      title: "10:59",
      place: "Rook Lane",
      wearing: ["paper-club-tote"],
      note: "Refreshing the drop page one minute out. The tote holds the receipt.",
    },
    {
      photo: photos.marigold,
      title: "Overpass",
      place: "Hollis Street bridge",
      wearing: ["paper-club-tee"],
      note: "Paper Club in marigold, tucked, on the hottest Saturday of the year.",
    },
    {
      photo: photos.greyHood,
      title: "Long way home",
      place: "Route 9, outbound",
      wearing: ["concrete-hood"],
      note: "The heavyweight hood in ash, two winters in.",
    },
  ] satisfies Look[],
};

/* ───────── Store / about ───────── */

export const store = {
  title: "The shop on Hollis Street",
  intro:
    "Drop opened in 2019 in a former key-cutting shop. It is still one room: a rail, a bench, a counter and a door that people line up outside on Saturdays.",
  story: [
    "Dami started Drop with a box of screen-printed tees and a folding table at the Dockside market. The tees sold out by noon, so the next box was bigger and the folding table became a lease.",
    "We make everything in small runs, mostly in Portugal, with a couple of mills that will cut 150 pieces without sighing. When a run sells out we do not remake it. We make the next thing.",
    "Drops land on Saturdays because that is when the shop is full. Online opens at 11:00, the door at 12:00, and the same limits apply to both so the line and the internet get the same shot.",
  ],
  hours: [
    { days: "Monday – Wednesday", time: "Closed" },
    { days: "Thursday – Friday", time: "12:00 – 19:00" },
    { days: "Saturday", time: "12:00 – 18:00 (drop days: line from 9:00)" },
    { days: "Sunday", time: "12:00 – 17:00, pickups only" },
  ],
  lineRules: [
    "No camping before 7:00. The neighbours have been patient; let's keep it that way.",
    "Wristbands go out at 10:00, one per person, and are not transferable.",
    "Same limits as online: one per size, and the per-item limit on the tag.",
    "Raffle winners skip the line and collect from the side door.",
  ],
  crew: [
    {
      name: "Dami Reyes",
      role: "Founder, buys and designs",
      quote: "If I would not queue for it, we do not make it.",
    },
    {
      name: "Kit Moreau",
      role: "Store lead, runs the line",
      quote: "Wristbands at ten. I will not be moved on this.",
    },
    {
      name: "Oona Hale",
      role: "Graphics and lookbooks",
      quote: "Every print gets tested under a streetlamp before it ships.",
    },
  ],
};

/* ───────── Help ───────── */

export const sizeGuide = [
  {
    name: "Tees and long sleeves",
    note: "Measured flat, in centimetres. Boxy fit: take your usual size.",
    sizes: apparel,
    rows: [
      { label: "Chest width", values: [54, 57, 60, 63, 66, 69] },
      { label: "Body length", values: [66, 68, 70, 72, 74, 76] },
      { label: "Sleeve (long sleeve)", values: [60, 62, 64, 66, 67, 68] },
    ],
  },
  {
    name: "Hoods",
    note: "Measured flat, in centimetres. Rib hem sits at the hip.",
    sizes: apparel,
    rows: [
      { label: "Chest width", values: [58, 61, 64, 67, 70, 73] },
      { label: "Body length", values: [64, 66, 68, 70, 72, 74] },
      { label: "Sleeve", values: [58, 60, 62, 64, 65, 66] },
    ],
  },
  {
    name: "Outerwear",
    note: "Measured flat, in centimetres. Room for a hood underneath.",
    sizes: apparel,
    rows: [
      { label: "Chest width", values: [60, 63, 66, 69, 72, 75] },
      { label: "Body length", values: [68, 70, 72, 74, 76, 78] },
    ],
  },
  {
    name: "Pants",
    note: "Waist measured flat and doubled, in centimetres. Inseam 78 cm on every size.",
    sizes: ["28", "30", "32", "34", "36"],
    rows: [
      { label: "Waist", values: [72, 77, 82, 87, 92] },
      { label: "Leg opening", values: [24, 25, 26, 27, 28] },
    ],
  },
];

export const policies = [
  {
    title: "Shipping",
    text: "Orders ship Tuesday to Friday from the shop. Standard 3–5 business days, Express 1–2. US and Canada only for now.",
  },
  {
    title: "Returns",
    text: "Fourteen days from delivery, unworn with the tag on. Drop pieces are exchange-only for a different size while stock lasts.",
  },
  {
    title: "Pickup",
    text: "Choose Hollis Street pickup at checkout and collect from Sunday after the drop. Bring the order number and an ID.",
  },
];

export const faqs = [
  {
    q: "Do you restock?",
    a: "No. Every piece is made once, in the run size we post on Monday. If it sells out, the drop goes into the archive.",
  },
  {
    q: "Why is there a limit per order?",
    a: "So a run of 150 reaches more than fifteen people. Limits are on every product page and apply to the line at the shop too.",
  },
  {
    q: "How are raffles drawn?",
    a: "Entries close Thursday at 23:59 ET. On Friday at 18:00 we draw at random from all valid entries, one per person. Winners get an email with a 24-hour payment link; unclaimed spots roll to the next name.",
  },
  {
    q: "What counts as a duplicate entry?",
    a: "Same name, email, phone or shipping address. Duplicates void every entry from that person, so please enter once.",
  },
  {
    q: "What happens to bot orders?",
    a: "We check every drop-day order by hand before it ships. Orders using scripts, address jigging or more than the limit are cancelled and refunded.",
  },
  {
    q: "Can I change my size after ordering?",
    a: "Email us before the order ships and we will swap it if the size is still in stock. After that, use an exchange.",
  },
  {
    q: "Do you ship outside the US and Canada?",
    a: "Not yet. Customs on small runs eats the price. We are working on a European partner for 2027.",
  },
  {
    q: "Do you buy back or resell?",
    a: "No, and we do not sell to resellers. If you see a Drop piece marked up somewhere, it did not come from us.",
  },
];

/* ───────── Raffle & checkout ───────── */

export const raffle = {
  title: "Raffle entry",
  intro:
    "One entry per person per drop. Winners are drawn at random and emailed a payment link that holds for 24 hours.",
  rules: [
    "One entry per person. Duplicates void every entry.",
    "You must be 16 or older and ship to the US or Canada, or collect at Hollis Street.",
    "Winners are drawn Friday at 18:00 ET and emailed the same evening.",
    "Unclaimed spots roll to the next name after 24 hours.",
  ],
  note: "This is a demo: entries are kept in this browser only and no draw takes place.",
};

export const checkout = {
  title: "Checkout",
  note: "Demo checkout: nothing is charged and no order is sent.",
  freeOver: 150,
  delivery: [
    {
      id: "standard",
      label: "Standard",
      detail: "3–5 business days",
      price: 8,
    },
    { id: "express", label: "Express", detail: "1–2 business days", price: 18 },
    {
      id: "pickup",
      label: "Pickup at Hollis Street",
      detail: "From Sunday after the drop",
      price: 0,
    },
  ],
  countries: ["United States", "Canada"],
};

export const footer = {
  alertsTitle: "Drop alerts",
  alertsText: "One email on Monday when the lineup goes up. Nothing else.",
};
