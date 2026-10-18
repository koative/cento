import heroMugs from "./assets/hero-mugs.jpg";
import marigoldMug from "./assets/marigold-mug.jpg";
import speckleMug from "./assets/speckle-mug.jpg";
import everydayCups from "./assets/everyday-cups.jpg";
import shinoTumbler from "./assets/shino-tumbler.jpg";
import tideCups from "./assets/tide-cups.jpg";
import teaBowls from "./assets/tea-bowls.jpg";
import shorePlates from "./assets/shore-plates.jpg";
import cylinderVase from "./assets/cylinder-vase.jpg";
import facetedBeaker from "./assets/faceted-beaker.jpg";
import flutedCreamer from "./assets/fluted-creamer.jpg";
import tenmokuJug from "./assets/tenmoku-jug.jpg";
import ashTeapot from "./assets/ash-teapot.jpg";
import blushFlask from "./assets/blush-flask.jpg";
import wheelHands from "./assets/wheel-hands.jpg";
import centering from "./assets/centering.jpg";
import opening from "./assets/opening.jpg";
import throwingBowl from "./assets/throwing-bowl.jpg";
import studioPotter from "./assets/studio-potter.jpg";
import trimming from "./assets/trimming.jpg";
import carving from "./assets/carving.jpg";
import teaTable from "./assets/tea-table.jpg";
import kitchenShelf from "./assets/kitchen-shelf.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Kiln",
  sector: "Ceramics studio & shop",
  tagline: "Stoneware for the everyday table, fired in small batches.",
  email: "hello@kiln.example",
  phone: "+1 555 0142 860",
  address: ["Kiln Studio", "41 Tannery Yard", "Hollis Bay"],
  instagram: "https://www.instagram.com/",
  pinterest: "https://www.pinterest.com/",
  hours: [
    { days: "Thursday – Friday", time: "12:00 – 18:00" },
    { days: "Saturday – Sunday", time: "10:00 – 17:00" },
    { days: "Monday – Wednesday", time: "Classes only" },
  ],
  shipping: { flat: 12, freeOver: 150 },
};

export const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/workshops", label: "Workshops" },
  { to: "/glazes", label: "Glaze bench" },
  { to: "/studio", label: "Studio" },
  { to: "/journal", label: "Journal" },
];

/* ——— Clay & glaze: shared by the shop, the object pages and the glaze bench ——— */

export type ClayId = "buff" | "speckled" | "iron";
export type Clay = {
  id: ClayId;
  name: string;
  color: string;
  fleck: string;
  note: string;
};

export const clays: Clay[] = [
  {
    id: "buff",
    name: "Buff stoneware",
    color: "#cfae86",
    fleck: "#b48a5e",
    note: "Warm and smooth. Glazes sit bright and even on it.",
  },
  {
    id: "speckled",
    name: "Speckled stoneware",
    color: "#ddd0bb",
    fleck: "#5a4434",
    note: "Iron specks bleed up through pale glazes like pepper in cream.",
  },
  {
    id: "iron",
    name: "Iron-red stoneware",
    color: "#7a4129",
    fleck: "#4f2716",
    note: "Dark, toasty and dense. Darkens every glaze and breaks rust at the edges.",
  },
];

export type GlazeId =
  | "oatmeal"
  | "tide"
  | "marigold"
  | "celadon"
  | "tenmoku"
  | "shino"
  | "ash"
  | "blush";
export type Glaze = {
  id: GlazeId;
  name: string;
  color: string;
  /** Where the glaze runs thin (rims, edges, throwing lines). */
  edge: string;
  surface: "Gloss" | "Satin" | "Matte";
  /** How much of the clay shows through (1 = fully opaque). */
  cover: number;
  note: string;
};

export const glazes: Glaze[] = [
  {
    id: "oatmeal",
    cover: 0.9,
    name: "Oatmeal",
    color: "#e2d6bf",
    edge: "#b59671",
    surface: "Satin",
    note: "Our house white. Soft satin that lets the clay's speckle come through; toasts to honey at the rim.",
  },
  {
    id: "tide",
    cover: 0.86,
    name: "Tide",
    color: "#3d6b80",
    edge: "#9fc0c8",
    surface: "Gloss",
    note: "A cobalt-and-rutile blue that pools almost navy in the throwing lines and breaks pale at every edge.",
  },
  {
    id: "marigold",
    cover: 0.92,
    name: "Marigold",
    color: "#e2a01e",
    edge: "#c45d1b",
    surface: "Gloss",
    note: "A loud, cheerful yellow. Turns orange where it thins over the rim. Not for the shy.",
  },
  {
    id: "celadon",
    cover: 0.74,
    name: "Celadon",
    color: "#a3bba2",
    edge: "#d3decf",
    surface: "Gloss",
    note: "Glassy pale green. Pools deeper in carved lines; nearly clear where it runs thin.",
  },
  {
    id: "tenmoku",
    cover: 1,
    name: "Tenmoku",
    color: "#2a1912",
    edge: "#8d4b22",
    surface: "Gloss",
    note: "Iron-saturated black-brown that breaks to rust on every ridge. Glows on the iron-red clay.",
  },
  {
    id: "shino",
    cover: 0.95,
    name: "Shino",
    color: "#e9dccb",
    edge: "#c3683a",
    surface: "Satin",
    note: "A thick, buttery white that flashes orange and carbon-grey wherever it is thin. No two alike.",
  },
  {
    id: "ash",
    cover: 0.8,
    name: "Ash",
    color: "#c8c2a9",
    edge: "#7f7a59",
    surface: "Matte",
    note: "Made with wood ash from the bakery two doors down. Runs and streaks; dry to the touch.",
  },
  {
    id: "blush",
    cover: 0.84,
    name: "Blush",
    color: "#e7b8ae",
    edge: "#f4e4de",
    surface: "Satin",
    note: "A pale copper-pink that fades to almost white at the rim. Kind to tea stains.",
  },
];

export const glazeById = (id: GlazeId) => glazes.find((g) => g.id === id)!;
export const clayById = (id: ClayId) => clays.find((c) => c.id === id)!;

/* ——— Shop ——— */

export type CategoryId = "cups" | "bowls" | "pouring" | "vases" | "sets";
export const categories: { id: CategoryId; label: string }[] = [
  { id: "cups", label: "Cups & mugs" },
  { id: "bowls", label: "Bowls & plates" },
  { id: "pouring", label: "Jugs & teapots" },
  { id: "vases", label: "Vases" },
  { id: "sets", label: "Sets & gifts" },
];

export type Product = {
  id: string;
  number: number;
  name: string;
  category: CategoryId;
  price: number;
  /** First glaze is the one in the photograph. */
  glazes: GlazeId[];
  sizes?: { label: string; add: number }[];
  clay: ClayId;
  dimensions: string;
  capacity?: string;
  maker: string;
  /** Pieces left from the last firing, or "made" for made-to-order. */
  stock: number | "made";
  added: string;
  summary: string;
  story: string[];
  care: string;
  photo: Photo;
};

export const firing = {
  current: "October firing",
  opening: "Saturday 31 October, 10:00",
  madeToOrder:
    "Made-to-order pieces go into the 25 November firing and ship by 2 December.",
  log: [
    {
      date: "Mon 26 Oct",
      step: "Kiln loaded",
      detail: "Shelves packed with 61 glazed pieces, cones set on every shelf.",
    },
    {
      date: "Wed 28 Oct",
      step: "Glaze firing",
      detail:
        "Eleven hours up to cone 6, about 1,220 °C, with a slow hold at the top.",
    },
    {
      date: "Thu 29 Oct",
      step: "Cooling",
      detail: "A full day closed. Opening early is how pots crack.",
    },
    {
      date: "Fri 30 Oct",
      step: "Unloading",
      detail: "Every piece checked, sanded on the foot and photographed.",
    },
    {
      date: "Sat 31 Oct",
      step: "Kiln opening",
      detail: "Studio doors open at 10:00; the shop updates at noon.",
    },
  ],
};

export const products: Product[] = [
  {
    id: "marigold-mug",
    number: 14,
    name: "Marigold Mug",
    category: "cups",
    price: 42,
    glazes: ["marigold", "oatmeal", "tide"],
    sizes: [
      { label: "10 oz", add: 0 },
      { label: "14 oz", add: 6 },
    ],
    clay: "buff",
    dimensions: "9 × 12 cm",
    capacity: "300 ml / 410 ml",
    maker: "Maren Holt",
    stock: 6,
    added: "2026-10-30",
    summary:
      "A straight-sided mug with a pulled handle wide enough for three fingers.",
    story: [
      "Thrown in one pull, trimmed with a narrow foot so it sits a few millimetres above the table and catches a shadow.",
      "The handle is pulled from the body rather than cast, so each one is a little different. The thumb rest is pressed in last, while the clay is still soft.",
    ],
    care: "Dishwasher and microwave safe. The raw foot is sanded smooth and will not scratch your table.",
    photo: {
      src: marigoldMug,
      alt: "A yellow-glazed mug with a raw clay foot casting a long shadow on a stone floor",
      w: 1200,
      h: 805,
    },
  },
  {
    id: "speckle-mug",
    number: 9,
    name: "Morning Speckle Mug",
    category: "cups",
    price: 38,
    glazes: ["oatmeal", "celadon"],
    clay: "speckled",
    dimensions: "8.5 × 10 cm",
    capacity: "340 ml",
    maker: "Maren Holt",
    stock: 9,
    added: "2026-09-26",
    summary:
      "Our best-selling shape: round-bellied, light in the hand, with a rolled rim.",
    story: [
      "Speckled stoneware under a satin glaze, so the iron in the clay rises through as a scatter of dark specks.",
      "The rim is compressed and rolled over before trimming, which is why these survive years of morning washing-up.",
    ],
    care: "Dishwasher and microwave safe.",
    photo: {
      src: speckleMug,
      alt: "A speckled cream mug with a teaspoon in it on a marbled surface in hard sunlight",
      w: 760,
      h: 1100,
    },
  },
  {
    id: "shino-tumbler",
    number: 21,
    name: "Shino Tumbler",
    category: "cups",
    price: 34,
    glazes: ["shino"],
    sizes: [
      { label: "Short", add: 0 },
      { label: "Tall", add: 6 },
    ],
    clay: "buff",
    dimensions: "8 × 11 cm",
    capacity: "320 ml",
    maker: "Teo Okafor",
    stock: 11,
    added: "2026-10-30",
    summary:
      "A handleless cup dipped two thirds of the way, leaving the lower body raw.",
    story: [
      "Shino is a thick glaze that flashes orange wherever it runs thin. We dip these quickly and let gravity decide where the flashing lands.",
      "The lower third stays unglazed so you can feel the clay. It is vitrified at cone 6 and does not absorb water.",
    ],
    care: "Dishwasher safe. Hand-wash if you want the flashing to stay bright for decades.",
    photo: {
      src: shinoTumbler,
      alt: "A cream tumbler flashed with rust orange, its lower half bare speckled clay, on a wooden table",
      w: 880,
      h: 1100,
    },
  },
  {
    id: "tide-teacup",
    number: 6,
    name: "Tide Teacup",
    category: "cups",
    price: 28,
    glazes: ["tide", "celadon", "oatmeal"],
    clay: "speckled",
    dimensions: "8 × 7 cm",
    capacity: "180 ml",
    maker: "Ines Park",
    stock: 14,
    added: "2026-08-29",
    summary:
      "A small cup for tea, espresso or a short pour of something stronger.",
    story: [
      "Dipped rim-first into Tide so the blue sits on the top half and drips toward the raw foot.",
      "Ines throws these off the hump: one big lump of clay, twenty cups in a row, each cut free with a wire.",
    ],
    care: "Dishwasher safe.",
    photo: {
      src: tideCups,
      alt: "Small cups dipped in pale and deep blue glaze, displayed in a wooden cubby shelf",
      w: 733,
      h: 1100,
    },
  },
  {
    id: "stacking-tea-bowls",
    number: 31,
    name: "Stacking Tea Bowls, set of two",
    category: "bowls",
    price: 56,
    glazes: ["oatmeal", "ash"],
    clay: "speckled",
    dimensions: "10 × 6.5 cm each",
    capacity: "220 ml",
    maker: "Maren Holt",
    stock: 5,
    added: "2026-10-30",
    summary: "Two low bowls that nest into each other for a narrow cupboard.",
    story: [
      "Made for rice, yoghurt, a small soup or tea held in both hands.",
      "The walls taper so the pair stacks without sticking; the inside foot ring is glazed, the outside left as clay.",
    ],
    care: "Dishwasher and microwave safe.",
    photo: {
      src: teaBowls,
      alt: "Two speckled white tea bowls stacked on a white surface against a grey wall",
      w: 1200,
      h: 800,
    },
  },
  {
    id: "shore-plates",
    number: 40,
    name: "Shore Plates",
    category: "bowls",
    price: 46,
    glazes: ["tide", "tenmoku"],
    sizes: [
      { label: "Side, 21 cm", add: 0 },
      { label: "Dinner, 27 cm", add: 12 },
    ],
    clay: "iron",
    dimensions: "21 or 27 cm across",
    maker: "Teo Okafor",
    stock: "made",
    added: "2026-07-25",
    summary:
      "Wavy-rimmed plates with the dark clay showing at the edge, sold individually.",
    story: [
      "The rim is pressed by hand while the plate is still on the wheel, so no two edges wave the same way.",
      "We make plates to order because they take a whole kiln shelf each. Yours goes into the next firing.",
    ],
    care: "Dishwasher safe. Oven safe to 200 °C; do not move straight from fridge to hot oven.",
    photo: {
      src: shorePlates,
      alt: "Stacks of pale blue and near-black plates with brown clay rims next to blue bowls on a wooden shelf",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "tenmoku-jug",
    number: 27,
    name: "Tenmoku Pouring Jug",
    category: "pouring",
    price: 72,
    glazes: ["tenmoku", "ash"],
    clay: "iron",
    dimensions: "12 × 15 cm",
    capacity: "750 ml",
    maker: "Teo Okafor",
    stock: 2,
    added: "2026-09-26",
    summary: "A round jug that pours clean and stops without a drip.",
    story: [
      "The spout is pulled with a wet finger and then sharpened with a knife, which is the only reliable way we know to stop drips.",
      "On iron-red clay, Tenmoku breaks to a rusty speckle across the belly.",
    ],
    care: "Dishwasher safe.",
    photo: {
      src: tenmokuJug,
      alt: "A rounded brown speckled jug with a strap handle on a dark blue cloth",
      w: 733,
      h: 1100,
    },
  },
  {
    id: "fluted-creamer",
    number: 18,
    name: "Fluted Creamer",
    category: "pouring",
    price: 48,
    glazes: ["oatmeal", "ash"],
    clay: "speckled",
    dimensions: "8 × 11 cm",
    capacity: "250 ml",
    maker: "Ines Park",
    stock: 6,
    added: "2026-08-29",
    summary:
      "A small jug with carved vertical flutes, for milk, cream or a single stem.",
    story: [
      "The flutes are cut with a loop tool when the clay is leather-hard, one long stroke each.",
      "Satin glaze softens the ridges so they catch light without catching dirt.",
    ],
    care: "Dishwasher safe.",
    photo: {
      src: flutedCreamer,
      alt: "A white fluted creamer on a linen cloth beside dried grasses in low light",
      w: 733,
      h: 1100,
    },
  },
  {
    id: "ash-teapot",
    number: 33,
    name: "Brushed Ash Teapot",
    category: "pouring",
    price: 148,
    glazes: ["ash"],
    clay: "iron",
    dimensions: "15 × 12 cm",
    capacity: "600 ml, about three cups",
    maker: "Maren Holt",
    stock: "made",
    added: "2026-10-30",
    summary:
      "A side-handled teapot with a built-in strainer and a lid that stays put.",
    story: [
      "Six parts thrown separately (body, lid, knob, spout, handle and strainer) and joined while they are the same dampness.",
      "Ash glaze is brushed over in loose strokes, so the iron clay shows through like weather on stone. A teapot takes us three weeks, so we make them to order.",
    ],
    care: "Hand-wash. Warm with hot water before brewing.",
    photo: {
      src: ashTeapot,
      alt: "A round teapot with a brushed white glaze over dark clay sitting in striped window light",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "cylinder-vase",
    number: 22,
    name: "Flashing Cylinder Vase",
    category: "vases",
    price: 88,
    glazes: ["shino"],
    sizes: [
      { label: "Short, 16 cm", add: 0 },
      { label: "Tall, 24 cm", add: 34 },
    ],
    clay: "buff",
    dimensions: "11 × 16 cm or 12 × 24 cm",
    maker: "Teo Okafor",
    stock: 3,
    added: "2026-09-26",
    summary: "A plain cylinder that lets the Shino glaze do all the talking.",
    story: [
      "We throw the walls thick at the base so the vase stays upright with a heavy branch in it.",
      "Glazed inside so it holds water, flashed outside wherever the glaze ran thin.",
    ],
    care: "Watertight. Hand-wash.",
    photo: {
      src: cylinderVase,
      alt: "A tall cream cylinder vase speckled with orange flashing on a wooden table",
      w: 880,
      h: 1100,
    },
  },
  {
    id: "faceted-beaker",
    number: 12,
    name: "Faceted Beaker",
    category: "vases",
    price: 36,
    glazes: ["oatmeal"],
    clay: "speckled",
    dimensions: "9 × 10 cm",
    maker: "Ines Park",
    stock: 7,
    added: "2026-08-29",
    summary:
      "Cut with a wire into flat facets, for a few stems, pens or brushes.",
    story: [
      "Thrown thick, then faceted with a twisted wire so each face carries a faint ripple.",
      "Small enough for a windowsill, heavy enough not to tip.",
    ],
    care: "Watertight. Hand-wash.",
    photo: {
      src: facetedBeaker,
      alt: "A white faceted beaker flecked with brown on a dark table",
      w: 1001,
      h: 1100,
    },
  },
  {
    id: "everyday-cups-pair",
    number: 3,
    name: "Everyday Cups, pair",
    category: "sets",
    price: 64,
    glazes: ["oatmeal", "ash"],
    clay: "speckled",
    dimensions: "9 × 7.5 cm each",
    capacity: "260 ml",
    maker: "Maren Holt",
    stock: 4,
    added: "2026-07-25",
    summary: "Two low cups with small loop handles, boxed together as a gift.",
    story: [
      "The shape we made first, eight years ago, and the one we still drink from at the studio.",
      "Packed in a recycled card box with a care card, ready to hand over.",
    ],
    care: "Dishwasher and microwave safe.",
    photo: {
      src: everydayCups,
      alt: "Two speckled white cups with loop handles on a pale table against a dark wall",
      w: 1200,
      h: 901,
    },
  },
  {
    id: "blush-flask-set",
    number: 36,
    name: "Blush Flask & Cups",
    category: "sets",
    price: 96,
    glazes: ["blush"],
    clay: "buff",
    dimensions: "Flask 8 × 20 cm, cups 6 × 4.5 cm",
    capacity: "Flask 360 ml",
    maker: "Ines Park",
    stock: 3,
    added: "2026-10-30",
    summary:
      "A narrow flask and two small cups for sake, cold tea or a dinner-table carafe.",
    story: [
      "The pink is dipped heavy at the base and fades towards the neck, so each set holds a little gradient.",
      "The flask neck is narrow enough to pour slowly and to hold a single stem when the bottle is empty.",
    ],
    care: "Hand-wash.",
    photo: {
      src: blushFlask,
      alt: "A tall white flask fading to pink at the base beside two small pink cups",
      w: 1400,
      h: 933,
    },
  },
];

/* ——— Glaze bench (made-to-order) ——— */

export type FormId = "cup" | "bowl" | "jug" | "vase";
export const forms: {
  id: FormId;
  name: string;
  price: number;
  size: string;
}[] = [
  { id: "cup", name: "Cup", price: 40, size: "9 × 10 cm, 320 ml" },
  { id: "bowl", name: "Bowl", price: 52, size: "16 × 8 cm" },
  { id: "jug", name: "Jug", price: 78, size: "12 × 15 cm, 750 ml" },
  { id: "vase", name: "Vase", price: 90, size: "12 × 22 cm" },
];

export const bench = {
  title: "The glaze bench",
  intro:
    "Every glaze we use, on every clay we throw. Pick a form, a clay and a glaze, set how deep it is dipped, and we will make that exact piece in the next firing.",
  note: "Glazes are mixed in our studio and fired to cone 6 in an electric kiln. Every glaze here is food-safe and tested by an outside lab twice a year.",
};

/* ——— Workshops ——— */

export type Session = {
  id: string;
  date: string;
  label: string;
  time: string;
  left: number;
};
export type Workshop = {
  id: string;
  name: string;
  short: string;
  price: number;
  unit: string;
  length: string;
  level: "Beginner" | "Some experience" | "All levels";
  size: number;
  teacher: string;
  intro: string;
  make: string[];
  includes: string[];
  sessions: Session[];
  photo: Photo;
};

export const workshops: Workshop[] = [
  {
    id: "wheel-taster",
    name: "Wheel Taster Evening",
    short:
      "Two and a half hours at the wheel, from a lump of clay to a cup or bowl of your own.",
    price: 75,
    unit: "per person",
    length: "2.5 hours",
    level: "Beginner",
    size: 8,
    teacher: "Maren Holt",
    intro:
      "The evening most people start with. Maren demonstrates centering, opening and pulling a wall, then you get a wheel to yourself and as much clay as you like. Most people keep two pieces, which we trim, glaze in Oatmeal and fire for you.",
    make: [
      "One or two thrown pieces: cups, small bowls, whatever survives",
      "Pieces are trimmed by us and glazed in Oatmeal",
    ],
    includes: [
      "All clay, tools and an apron",
      "Glazing and two firings",
      "Tea, and biscuits from next door",
    ],
    sessions: [
      {
        id: "wt-1105",
        date: "2026-11-05",
        label: "Thu 5 Nov",
        time: "18:30 – 21:00",
        left: 3,
      },
      {
        id: "wt-1112",
        date: "2026-11-12",
        label: "Thu 12 Nov",
        time: "18:30 – 21:00",
        left: 6,
      },
      {
        id: "wt-1119",
        date: "2026-11-19",
        label: "Thu 19 Nov",
        time: "18:30 – 21:00",
        left: 0,
      },
      {
        id: "wt-1203",
        date: "2026-12-03",
        label: "Thu 3 Dec",
        time: "18:30 – 21:00",
        left: 8,
      },
      {
        id: "wt-1210",
        date: "2026-12-10",
        label: "Thu 10 Dec",
        time: "18:30 – 21:00",
        left: 5,
      },
    ],
    photo: {
      src: centering,
      alt: "Clay-covered hands centering a ball of clay on a pottery wheel",
      w: 933,
      h: 1400,
    },
  },
  {
    id: "six-week-wheel",
    name: "Six-Week Wheel Course",
    short:
      "One evening a week for six weeks. Leave able to throw a set of mugs that match.",
    price: 390,
    unit: "per person",
    length: "6 × 2.5 hours",
    level: "All levels",
    size: 6,
    teacher: "Maren Holt",
    intro:
      "Six Tuesday evenings that build on each other: centering and cylinders, then bowls, trimming, handles, and finally glazing your own work on the last night. Small enough that Maren is at your wheel every few minutes.",
    make: [
      "A set of four mugs, two bowls and whatever you practise on",
      "You glaze your own pieces in week six",
    ],
    includes: [
      "12.5 kg of clay, tools and an apron",
      "Open-studio practice on Sundays during the course",
      "All glazes and firings",
    ],
    sessions: [
      {
        id: "sw-1103",
        date: "2026-11-03",
        label: "Starts Tue 3 Nov",
        time: "18:30 – 21:00",
        left: 2,
      },
      {
        id: "sw-1201",
        date: "2026-12-01",
        label: "Starts Tue 1 Dec",
        time: "18:30 – 21:00",
        left: 6,
      },
    ],
    photo: {
      src: throwingBowl,
      alt: "Two hands opening a terracotta-coloured pot on a spinning wheel",
      w: 1400,
      h: 875,
    },
  },
  {
    id: "slab-and-coil",
    name: "Slab & Coil Handbuilding",
    short:
      "No wheel needed. Build a planter, a platter or a lidded box with your hands and a rolling pin.",
    price: 110,
    unit: "per person",
    length: "4 hours",
    level: "Beginner",
    size: 10,
    teacher: "Ines Park",
    intro:
      "Ines teaches the oldest ways of making pots: rolling slabs, joining coils, and carving into leather-hard walls. It is quieter than the wheel and much more forgiving, which makes it a good first class for anyone nervous about clay.",
    make: [
      "One larger handbuilt piece and a couple of small test pieces",
      "Carving and texture with found tools",
    ],
    includes: [
      "Clay, tools and an apron",
      "Lunch from the bakery",
      "Glazing in a colour of your choice, and firing",
    ],
    sessions: [
      {
        id: "sc-1107",
        date: "2026-11-07",
        label: "Sat 7 Nov",
        time: "10:00 – 14:00",
        left: 4,
      },
      {
        id: "sc-1121",
        date: "2026-11-21",
        label: "Sat 21 Nov",
        time: "10:00 – 14:00",
        left: 9,
      },
      {
        id: "sc-1205",
        date: "2026-12-05",
        label: "Sat 5 Dec",
        time: "10:00 – 14:00",
        left: 10,
      },
    ],
    photo: {
      src: carving,
      alt: "Hands carving a textured pattern into the wall of an unfired clay pot",
      w: 1400,
      h: 788,
    },
  },
  {
    id: "glaze-saturday",
    name: "Glaze Chemistry Saturday",
    short:
      "Weigh, mix and test your own glazes, then take home a board of tiles from our kiln.",
    price: 160,
    unit: "per person",
    length: "6 hours",
    level: "Some experience",
    size: 6,
    teacher: "Teo Okafor",
    intro:
      "Teo runs our glaze lab. You will learn to read a recipe, mix a base glaze, and shift it with colourants and opacifiers. Everyone mixes three glazes and dips a set of test tiles on all three of our clays, fired in the following week's kiln.",
    make: [
      "Three glazes of your own, on 18 test tiles",
      "A recipe card for each, with Teo's notes",
    ],
    includes: [
      "All materials, masks and scales",
      "Lunch",
      "Your fired tile board, ready to collect a week later",
    ],
    sessions: [
      {
        id: "gs-1114",
        date: "2026-11-14",
        label: "Sat 14 Nov",
        time: "10:00 – 16:00",
        left: 1,
      },
      {
        id: "gs-1212",
        date: "2026-12-12",
        label: "Sat 12 Dec",
        time: "10:00 – 16:00",
        left: 5,
      },
    ],
    photo: {
      src: tideCups,
      alt: "Small cups dipped in pale and deep blue glazes on a wooden shelf",
      w: 733,
      h: 1100,
    },
  },
  {
    id: "dinner-set",
    name: "Make Your Own Dinner Set",
    short:
      "Two Sundays: throw plates and bowls on the first, trim and glaze them on the second.",
    price: 240,
    unit: "per person",
    length: "2 × 5 hours",
    level: "Some experience",
    size: 6,
    teacher: "Maren Holt",
    intro:
      "For people who can already centre and pull a wall. Day one is all about throwing flat: plates, wide bowls, and how to stop them warping. Day two you trim, add a foot ring and glaze, and we fire everything together.",
    make: [
      "Two dinner plates, two side plates and two bowls",
      "Glazed in any of our eight glazes",
    ],
    includes: [
      "Clay, tools and lunch on both days",
      "Two firings",
      "Packing for the journey home",
    ],
    sessions: [
      {
        id: "ds-1115",
        date: "2026-11-15",
        label: "Sun 15 & 29 Nov",
        time: "10:00 – 15:00",
        left: 3,
      },
      {
        id: "ds-1206",
        date: "2026-12-06",
        label: "Sun 6 & 13 Dec",
        time: "10:00 – 15:00",
        left: 6,
      },
    ],
    photo: {
      src: trimming,
      alt: "A potter throwing a small cup on a wide spinning wheel, a bucket of slip beside it",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "wheel-night-for-two",
    name: "Wheel Night for Two",
    short:
      "Friday evening at side-by-side wheels. One booking covers two people.",
    price: 140,
    unit: "per pair",
    length: "2.5 hours",
    level: "Beginner",
    size: 5,
    teacher: "Teo Okafor",
    intro:
      "A taster evening for friends, couples and siblings. Two wheels side by side, one teacher for five pairs, and a jug of something to drink. You each keep your best piece; we glaze and fire them in matching colours.",
    make: [
      "One piece each, glazed to match",
      "Collection three weeks later, or we post them",
    ],
    includes: [
      "Clay, aprons and tools for two",
      "A drink each",
      "Glazing and firing",
    ],
    sessions: [
      {
        id: "wn-1113",
        date: "2026-11-13",
        label: "Fri 13 Nov",
        time: "19:00 – 21:30",
        left: 2,
      },
      {
        id: "wn-1127",
        date: "2026-11-27",
        label: "Fri 27 Nov",
        time: "19:00 – 21:30",
        left: 4,
      },
      {
        id: "wn-1211",
        date: "2026-12-11",
        label: "Fri 11 Dec",
        time: "19:00 – 21:30",
        left: 0,
      },
      {
        id: "wn-1218",
        date: "2026-12-18",
        label: "Fri 18 Dec",
        time: "19:00 – 21:30",
        left: 5,
      },
    ],
    photo: {
      src: opening,
      alt: "Wet clay-covered hands shaping a terracotta pot as it spins",
      w: 1400,
      h: 933,
    },
  },
];

export const workshopsPage = {
  title: "Workshops",
  intro:
    "Small classes in a working studio, taught by the potters who make the shop. Nobody leaves with clean hands, and everyone leaves with something they made.",
  faq: [
    {
      q: "I have never touched clay. Which class should I book?",
      a: "The Wheel Taster Evening or Slab & Coil Handbuilding. Both assume nothing, and both end with pieces we glaze and fire for you.",
    },
    {
      q: "When can I collect what I made?",
      a: "About three weeks after your class. Pieces need a week to dry, a bisque firing and a glaze firing. We email when they are ready, or post them for $9.",
    },
    {
      q: "What should I wear?",
      a: "Clothes you do not mind getting muddy, closed shoes and short or tied-back nails. We provide aprons.",
    },
    {
      q: "Can I cancel or move my place?",
      a: "Move or cancel up to seven days before for a full refund. Inside seven days we can move you to another date once, if there is space.",
    },
    {
      q: "Is the studio accessible?",
      a: "The studio is on the ground floor with step-free access and an accessible toilet. Tell us in the booking form if you need a seated wheel or a lower table.",
    },
  ],
};

/* ——— Studio ——— */

export const studio = {
  title: "The studio",
  intro:
    "Kiln is four potters, two electric kilns and a former tannery shed by the harbour. We make tableware to be used every day, sell it from the front room, and teach in the back.",
  story: [
    "Maren Holt opened the studio in 2018 after nine years throwing for a production pottery, where she learned to make the same mug two hundred times and still care about the last one.",
    "We still work like a small production pottery. Shapes are drawn once, refined over months, and made in runs of thirty or forty. Every piece is thrown or built by hand, trimmed, dipped and fired here, and nothing leaves without someone running a thumb around its rim.",
    "We fire about once a month. That rhythm sets everything: when the shop restocks, when made-to-order pieces ship, and when your workshop pots come home.",
  ],
  process: [
    {
      when: "Day 1",
      step: "Wedge and throw",
      detail:
        "Clay is kneaded to push out air, then thrown in runs of a single shape.",
    },
    {
      when: "Day 2–3",
      step: "Trim and handle",
      detail:
        "Leather-hard pieces are turned upside down, trimmed to a foot, and given handles.",
    },
    {
      when: "Week 1–2",
      step: "Dry",
      detail:
        "Slowly, under plastic, so walls and handles shrink at the same rate.",
    },
    {
      when: "Week 2",
      step: "Bisque fire",
      detail:
        "Ten hours to 950 °C. The clay becomes hard but still porous enough to take glaze.",
    },
    {
      when: "Week 3",
      step: "Glaze",
      detail:
        "Each piece is dipped by hand, the foot wiped clean with a sponge.",
    },
    {
      when: "Week 3",
      step: "Glaze fire",
      detail:
        "Eleven hours to cone 6, about 1,220 °C. The clay vitrifies and the glaze melts into glass.",
    },
    {
      when: "Week 4",
      step: "Open the kiln",
      detail:
        "A full day of cooling, then unloading, sanding feet and checking every piece.",
    },
  ],
  team: [
    {
      name: "Maren Holt",
      role: "Founder, thrower",
      bio: "Designs most of the shapes in the shop and teaches the wheel classes. Makes every teapot.",
    },
    {
      name: "Teo Okafor",
      role: "Glazes and kilns",
      bio: "Mixes all eight glazes from raw materials, loads every firing and runs Glaze Chemistry Saturday.",
    },
    {
      name: "Ines Park",
      role: "Handbuilder, teacher",
      bio: "Slab, coil and carving. Makes the creamers, beakers and flasks, and the twenty-cup runs of teacups.",
    },
    {
      name: "Ruth Calder",
      role: "Shop and studio manager",
      bio: "Packs every order, answers every email and keeps the class calendar honest.",
    },
  ],
  kiln: {
    title: "The kilns",
    text: "Two electric kilns, a seven and a ten cubic foot, fired on renewable tariff electricity. The big one carries about sixty pieces; the small one is for tests, glaze classes and workshop pots.",
  },
  wholesale:
    "We supply a small number of restaurants and shops. If you would like plates for a dining room, write to us at least four months before you need them.",
  photos: { wide: studioPotter, hands: wheelHands },
};

/* ——— Journal ——— */

export type Block = { type: "p" | "h2" | "quote"; text: string };
export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  author: string;
  minutes: number;
  excerpt: string;
  photo: Photo;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "opening-the-october-kiln",
    title: "Opening the October kiln",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
    author: "Teo Okafor",
    minutes: 4,
    excerpt:
      "What we are putting in the next firing, what we are nervous about, and why the shop goes quiet for a week.",
    photo: {
      src: shorePlates,
      alt: "Freshly fired blue and black plates stacked beside blue bowls on a shelf",
      w: 1400,
      h: 933,
    },
    body: [
      {
        type: "p",
        text: "Every month the shop empties out for a week before a firing. It is not a sale strategy. It is just that everything we make is either drying on a board, waiting in the bisque kiln or sitting on a glazing table with its foot wiped clean.",
      },
      {
        type: "p",
        text: "This load is mostly tableware: forty Marigold mugs, thirty Shino tumblers, twelve stacking tea-bowl pairs and the first run of Blush flasks. Ines also slipped in six faceted beakers that she swears are the last.",
      },
      { type: "h2", text: "What we are nervous about" },
      {
        type: "p",
        text: "Shino is the glaze that keeps us honest. It is thick, it crawls if the bisque is dusty, and it flashes differently depending on where a pot sits on the shelf. The tumblers on the top shelf near the elements will come out more orange; the ones low and in the middle will be pale. We do not sort them. We sell them as they come.",
      },
      {
        type: "quote",
        text: "Opening a kiln is the only part of this job that still feels like opening a present someone else wrapped.",
      },
      { type: "h2", text: "When things come back" },
      {
        type: "p",
        text: "The kiln opens on Saturday 31 October at ten in the morning. You are welcome to come and watch the unloading; there will be coffee. Anything not spoken for by noon goes into the online shop the same afternoon.",
      },
    ],
  },
  {
    slug: "why-we-leave-the-foot-raw",
    title: "Why we leave the foot raw",
    date: "2026-09-21",
    dateLabel: "21 September 2026",
    author: "Maren Holt",
    minutes: 3,
    excerpt:
      "The unglazed ring at the bottom of every pot is not us cutting corners. It is the only reason the pot survives the kiln.",
    photo: {
      src: shinoTumbler,
      alt: "A tumbler glazed on its upper two thirds, its lower third bare speckled clay",
      w: 880,
      h: 1100,
    },
    body: [
      {
        type: "p",
        text: "Turn over anything from the shop and you will find a ring of bare clay. People sometimes ask if we ran out of glaze. We did not. Glaze is glass, and at 1,220 °C glass is liquid. Any glaze touching the kiln shelf would weld the pot to it.",
      },
      {
        type: "p",
        text: "So we wipe the foot with a damp sponge after dipping. On some shapes, like the Shino tumbler, we go further and leave the bottom third bare on purpose, because we like the contrast between buttery glaze and toasted clay.",
      },
      { type: "h2", text: "Is raw clay safe to eat from?" },
      {
        type: "p",
        text: "Yes. Our stoneware is fired to the point of vitrification: the particles fuse and the body absorbs less than one percent water. It will not harbour bacteria or leak. Every foot is sanded smooth before it leaves so it will not scratch your table.",
      },
      {
        type: "quote",
        text: "The foot is where you can see what a pot is really made of.",
      },
    ],
  },
  {
    slug: "caring-for-handmade-stoneware",
    title: "Caring for handmade stoneware",
    date: "2026-08-30",
    dateLabel: "30 August 2026",
    author: "Ruth Calder",
    minutes: 5,
    excerpt:
      "Dishwashers, microwaves, ovens and tea stains: the honest answers to the questions we get every week.",
    photo: {
      src: kitchenShelf,
      alt: "Open kitchen shelves stacked with handmade plates, bowls and an iron teapot",
      w: 1400,
      h: 933,
    },
    body: [
      {
        type: "p",
        text: "Handmade does not mean fragile. Our tableware is fired hotter than most factory ware, and it is meant to be used every day. A few things will make it last a lifetime.",
      },
      { type: "h2", text: "Dishwashers and microwaves" },
      {
        type: "p",
        text: "Everything we sell as tableware is dishwasher and microwave safe. The exceptions are teapots and anything marked hand-wash, where the reason is usually a delicate glaze surface rather than strength.",
      },
      { type: "h2", text: "Heat" },
      {
        type: "p",
        text: "Stoneware does not like sudden temperature changes. Warm a cold dish before it goes in a hot oven, never put a hot plate on a wet stone counter, and do not use anything on a hob or under a grill.",
      },
      { type: "h2", text: "Stains and marks" },
      {
        type: "p",
        text: "Satin glazes can pick up grey marks from cutlery. They are metal on the surface, not scratches in it, and a little cream cleanser takes them straight off. Tea rings lift with baking soda and a soft cloth.",
      },
      {
        type: "quote",
        text: "If something chips in the first year of normal use, send us a photo. We will replace it.",
      },
    ],
  },
  {
    slug: "a-tea-bowl-is-never-finished",
    title: "A tea bowl is never finished",
    date: "2026-07-18",
    dateLabel: "18 July 2026",
    author: "Ines Park",
    minutes: 4,
    excerpt:
      "Notes on making the same small shape for eight years, and why the stacking tea bowls changed again this spring.",
    photo: {
      src: teaTable,
      alt: "A white side-handled teapot beside a small bowl of green tea on a pale table",
      w: 1400,
      h: 808,
    },
    body: [
      {
        type: "p",
        text: "The stacking tea bowls have changed four times since we first sold them. Most people would not notice: a millimetre off the rim, a slightly steeper wall, a foot ring that is a little more generous.",
      },
      {
        type: "p",
        text: "The latest change came from a customer who wrote to say her pair stuck together after washing. Two damp walls with nearly the same angle make a seal. We steepened the outer wall by three degrees and the problem went away.",
      },
      { type: "h2", text: "Making in runs" },
      {
        type: "p",
        text: "We throw tea bowls in runs of forty. The first ten are always a bit stiff; somewhere around the twentieth the hands stop thinking. The ones we keep for ourselves are usually from the end of the run.",
      },
      {
        type: "quote",
        text: "A shape is finished when nobody writes to us about it for a year. We are not there yet.",
      },
    ],
  },
];

/* ——— Home ——— */

export const home = {
  title: "Stoneware for the everyday table, fired in small batches.",
  intro:
    "Cups, bowls, jugs and vases thrown by four potters in a harbour-side studio, sold from our front room and posted anywhere in the country.",
  hero: {
    src: heroMugs,
    alt: "Five handmade mugs in yellow, white, pink and green glazes stacked on a sunlit stone floor",
    w: 1600,
    h: 1073,
  },
  heroCaption: "Marigold, Oatmeal and Celadon mugs from the September firing.",
  featured: [
    "marigold-mug",
    "shino-tumbler",
    "stacking-tea-bowls",
    "blush-flask-set",
  ],
  bench: {
    title: "Eight glazes, three clays, one bench",
    text: "Every glaze we mix, tested on every clay we throw. Choose a combination on the glaze bench and we will make that exact piece in the next firing.",
  },
  firing: {
    title: "The October kiln opens on the 31st",
    text: "We fire about once a month, and the shop restocks when the kiln is cool enough to open. Here is the schedule for the load going in next week.",
  },
  workshops: {
    title: "Learn on the wheels we work at",
    text: "Evening tasters, six-week courses and Saturday glaze labs. Classes are small, and the pots you make are fired in our kilns.",
  },
  quote: {
    text: "We make the same mug two hundred times so the two-hundredth is the one you keep for twenty years.",
    by: "Maren Holt, founder",
  },
  visit: {
    title: "Come to the studio",
    text: "The shop is the front room of the studio. You can usually watch someone throwing while you choose a mug.",
  },
  promises: [
    {
      title: "Packed to survive",
      text: "Recycled card and paper, no plastic. Anything that breaks in the post is replaced free.",
    },
    {
      title: "Chipped in a year?",
      text: "Send us a photo. If it happened in normal use, we replace it.",
    },
    {
      title: "Returns",
      text: "Unused pieces can come back within 30 days for a full refund.",
    },
  ],
  close: {
    title: "Something from the next firing",
    text: "Choose from what came out of the kiln last month, or have a piece made in the next one.",
  },
};

export const notFound = {
  title: "This one cracked in the kiln",
  text: "The page you were after does not exist, or it has moved. Everything else is still on the shelf.",
};

export const newsletter = {
  title: "The kiln letter",
  text: "One email when the kiln opens, with first pick of the new pieces. About once a month.",
};
