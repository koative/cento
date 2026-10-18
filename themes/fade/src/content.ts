import heroCut from "./assets/hero-midfade.jpg";
import fade01 from "./assets/cut-midfade-01.jpg";
import fade02 from "./assets/cut-midfade-02.jpg";
import fade03 from "./assets/cut-midfade-03.jpg";
import fade05 from "./assets/cut-midfade-05.jpg";
import fade07 from "./assets/cut-midfade-07.jpg";
import design from "./assets/cut-design.jpg";
import lineup from "./assets/cut-lineup.jpg";
import beardTrim from "./assets/beard-trim.jpg";
import perfecting from "./assets/perfecting.jpg";
import shaveStation from "./assets/shave-station.jpg";
import shopMirror from "./assets/shop-mirror.jpg";
import scissorMid from "./assets/scissor-mid.jpg";
import scissorBack from "./assets/scissor-back.jpg";
import scissorComb from "./assets/scissor-comb.jpg";
import bunWork from "./assets/bun-work.jpg";
import dario from "./assets/dario.jpg";
import shopFloor from "./assets/shop-floor.jpg";
import shopCorner from "./assets/shop-corner.jpg";
import pole from "./assets/pole.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

/** Sunday-first opening hours, 24h "HH:MM"; null = closed. */
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

export const brand = {
  name: "Fade",
  full: "Fade Barbers",
  tagline: "Sharp fades, hot towels, no rush.",
  founded: 2012,
  street: "214 Dunmore Avenue",
  area: "Ridgefield Heights",
  email: "hello@fade.example",
  phone: "(555) 013-6221",
  phoneHref: "tel:+15550136221",
  hours: [
    ["10:00", "15:00"],
    null,
    ["09:00", "20:00"],
    ["09:00", "20:00"],
    ["09:00", "20:00"],
    ["09:00", "20:00"],
    ["08:00", "17:00"],
  ] as Hours[],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "Google Maps", href: "https://www.google.com/maps/" },
  ],
};

export const nav = [
  { to: "/services", label: "Prices" },
  { to: "/barbers", label: "Barbers" },
  { to: "/fade-chart", label: "Fade chart" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/visit", label: "Visit" },
];

export const footerColumns = [
  {
    title: "The shop",
    links: [
      { to: "/services", label: "Services & prices" },
      { to: "/barbers", label: "Barbers" },
      { to: "/gallery", label: "Gallery" },
      { to: "/about", label: "Our story" },
      { to: "/visit", label: "Hours & directions" },
    ],
  },
  {
    title: "Your cut",
    links: [
      { to: "/book", label: "Book a chair" },
      { to: "/fade-chart", label: "Fade chart" },
      { to: "/shop", label: "Shop products" },
      { to: "/bag", label: "Your bag" },
    ],
  },
];

export const newsletter = {
  title: "The chair list",
  text: "One email a month: open chairs, new barbers, the odd shop discount. Never more.",
};

/* ------------------------------------------------------------ barbers */

export type Tier = "Master barber" | "Senior barber" | "Barber";
export const tierSurcharge: Record<Tier, number> = {
  "Master barber": 10,
  "Senior barber": 5,
  Barber: 0,
};

export type Barber = {
  id: string;
  name: string;
  chair: number;
  tier: Tier;
  since: number;
  photo: Img;
  short: string;
  specialties: string[];
  bio: string[];
  /** Sunday-first day indexes this barber works. */
  days: number[];
  signature: string;
  reviews: { text: string; by: string }[];
};

export const barbers: Barber[] = [
  {
    id: "dario",
    name: "Dario Vance",
    chair: 1,
    tier: "Master barber",
    since: 2000,
    photo: {
      src: dario,
      alt: "Dario finishing a client's cut with spray, his curly hair tied up",
      w: 1800,
      h: 1200,
    },
    short: "Scissor work, longer hair, grey that looks deliberate.",
    specialties: [
      "Scissor cuts",
      "Long hair",
      "Grey blending",
      "Beard shaping",
    ],
    bio: [
      "Dario opened Fade with two chairs and a borrowed sink in 2012, after eight years cutting on a cruise ship and four in a hotel barbershop where nobody was allowed to rush.",
      "He still takes the first appointment every morning. Ask him for a scissor cut on hair that is long enough to argue back; that is where he is happiest.",
    ],
    days: [2, 3, 4, 5, 6],
    signature: "Scissor-over-comb with a soft taper",
    reviews: [
      {
        text: "Twenty minutes of questions before the scissors came out. Best cut I have had in a decade.",
        by: "Oren, regular since 2014",
      },
      {
        text: "He made my grey look like a choice. My wife noticed before I said a word.",
        by: "Paul K.",
      },
    ],
  },
  {
    id: "jules",
    name: "Jules Mbeki",
    chair: 2,
    tier: "Senior barber",
    since: 2011,
    photo: {
      src: perfecting,
      alt: "Jules standing behind a client in a striped cape, checking the cut",
      w: 645,
      h: 1400,
    },
    short: "Skin fades so smooth you cannot find the line.",
    specialties: ["Skin fades", "Waves", "Line-ups", "Drop fades"],
    bio: [
      "Jules came to Fade from a six-chair shop downtown where the queue ran out the door every Saturday. He cuts fast, but the blend is never hurried: foil shaver, zero, half, one, and as many passes as it takes.",
      "Bring him a reference photo and he will tell you honestly whether your hair will do it.",
    ],
    days: [0, 2, 3, 5, 6],
    signature: "Mid skin fade, #0 to #3",
    reviews: [
      {
        text: "Three weeks later the fade still looks clean. That never happens.",
        by: "Dre M.",
      },
      {
        text: "He fixed a fade another shop wrecked, and didn't once make me feel bad about it.",
        by: "Sam T.",
      },
    ],
  },
  {
    id: "marcus",
    name: "Marcus Bell",
    chair: 3,
    tier: "Senior barber",
    since: 2013,
    photo: {
      src: beardTrim,
      alt: "Marcus working with the trimmer, seen in the mirror over the station counter",
      w: 860,
      h: 829,
    },
    short: "Beards, designs and anything drawn with a trimmer.",
    specialties: ["Beard sculpting", "Hair designs", "Hard parts", "Line-ups"],
    bio: [
      "Marcus trained as a sign painter before he picked up clippers, and you can tell: his parts are ruler-straight and his designs are drawn freehand in one pass.",
      "Most of his chair is beards. He will shape to your jaw, not to the last photo you saw.",
    ],
    days: [0, 3, 4, 5, 6],
    signature: "Beard sculpt with a razor line",
    reviews: [
      {
        text: "My beard finally has a shape that suits my face instead of fighting it.",
        by: "Idris A.",
      },
      {
        text: "Asked for a small lightning bolt. Got a small lightning bolt. Perfect.",
        by: "Theo, age 11 (and his dad)",
      },
    ],
  },
  {
    id: "tomas",
    name: "Tomás Ibarra",
    chair: 4,
    tier: "Barber",
    since: 2016,
    photo: {
      src: shaveStation,
      alt: "Tomás working behind a client in a striped cape, a shaving brush standing on the counter",
      w: 900,
      h: 829,
    },
    short: "Hot towel shaves and the classic side part.",
    specialties: [
      "Hot towel shaves",
      "Head shaves",
      "Classic cuts",
      "Side parts",
    ],
    bio: [
      "Tomás learned to shave with a straight razor from his grandfather in Guadalajara and has not found a reason to do it any other way.",
      "His hot towel shave takes forty-five minutes and there is no faster version. Book the last slot of the day and you may fall asleep.",
    ],
    days: [2, 4, 5, 6],
    signature: "Three-towel straight razor shave",
    reviews: [
      {
        text: "I have never been that relaxed in a chair with a razor at my throat.",
        by: "Martin G.",
      },
      {
        text: "Booked a shave for my wedding morning. Calmest part of the day.",
        by: "Luis R.",
      },
    ],
  },
  {
    id: "ren",
    name: "Ren Halloran",
    chair: 5,
    tier: "Barber",
    since: 2019,
    photo: {
      src: shopMirror,
      alt: "Ren working on a client, reflected in the long mirror of the shop",
      w: 1040,
      h: 829,
    },
    short: "Tapers, kids' cuts, and the patience for both.",
    specialties: ["Tapers", "Kids' cuts", "Crops", "First haircuts"],
    bio: [
      "Ren apprenticed at Fade in 2019 and stayed. Parents ask for Ren by name because the chair turns into a game and nobody cries, including the parents.",
      "Outside of kids' Saturdays Ren cuts clean, low-maintenance tapers that grow out without a three-week awkward phase.",
    ],
    days: [0, 2, 3, 4, 6],
    signature: "Low taper with a textured crop",
    reviews: [
      {
        text: "My son's first haircut, done with a toy truck and zero tears. We'll be back.",
        by: "Hannah W.",
      },
      {
        text: "The taper grows out well. I can stretch it to five weeks.",
        by: "Joel P.",
      },
    ],
  },
  {
    id: "hugo",
    name: "Hugo Lind",
    chair: 6,
    tier: "Barber",
    since: 2021,
    photo: {
      src: scissorComb,
      alt: "Hugo's hands holding scissors and a comb over a client's grey hair",
      w: 960,
      h: 1440,
    },
    short: "Textured crops and scissor-over-comb on fine hair.",
    specialties: [
      "Textured crops",
      "Fine hair",
      "Scissor-over-comb",
      "Grey blending",
    ],
    bio: [
      "Hugo came up through the Fade apprenticeship and Dario's Tuesday-night scissor classes. He is the one to see if your hair is fine, thinning, or has a crown that will not lie down.",
      "He will usually talk you out of the clipper and into the scissors. He is usually right.",
    ],
    days: [0, 2, 3, 4, 5],
    signature: "French crop, scissor finish",
    reviews: [
      {
        text: "First barber who knew what to do with my crown. It lies flat now.",
        by: "Ben O.",
      },
      {
        text: "Quiet, careful, fast enough. Exactly what I want at 8 am.",
        by: "Ana S.",
      },
    ],
  },
];

/* ------------------------------------------------------------ services */

export type ServiceGroup = "cuts" | "beard" | "combos";

export type Service = {
  id: string;
  group: ServiceGroup;
  name: string;
  price: number;
  minutes: number;
  blurb: string;
};

export const serviceGroups: {
  id: ServiceGroup;
  title: string;
  note: string;
}[] = [
  {
    id: "cuts",
    title: "Cuts",
    note: "Every cut ends with a hot lather neck shave and a style with the product of your choice.",
  },
  {
    id: "beard",
    title: "Beard & shave",
    note: "Hot towels, warm lather and a single-use blade, every time.",
  },
  {
    id: "combos",
    title: "Together",
    note: "Booked as one slot, so nobody hurries the second half.",
  },
];

export const services: Service[] = [
  {
    id: "classic-cut",
    group: "cuts",
    name: "Classic cut",
    price: 36,
    minutes: 40,
    blurb:
      "Scissor or clipper, your call. Short back and sides, side parts, crew cuts.",
  },
  {
    id: "skin-fade",
    group: "cuts",
    name: "Skin fade",
    price: 42,
    minutes: 45,
    blurb:
      "Foiled to skin and blended up to any length. Low, mid, high or drop.",
  },
  {
    id: "taper",
    group: "cuts",
    name: "Taper fade",
    price: 38,
    minutes: 40,
    blurb: "Faded only at the neckline and sideburns. Grows out cleanly.",
  },
  {
    id: "scissor-cut",
    group: "cuts",
    name: "Scissor cut",
    price: 48,
    minutes: 50,
    blurb:
      "For hair past three inches, curls and anything that needs shape, not just length off.",
  },
  {
    id: "buzz",
    group: "cuts",
    name: "Buzz cut",
    price: 24,
    minutes: 20,
    blurb: "One guard all over, edged up with the trimmer.",
  },
  {
    id: "kids",
    group: "cuts",
    name: "Kids' cut",
    price: 26,
    minutes: 30,
    blurb:
      "Twelve and under. Booster seat, cartoon of their choice, a lollipop if earned.",
  },
  {
    id: "beard-trim",
    group: "beard",
    name: "Beard trim & line-up",
    price: 22,
    minutes: 20,
    blurb:
      "Length, shape and a clean neckline and cheek line with the trimmer.",
  },
  {
    id: "beard-sculpt",
    group: "beard",
    name: "Beard sculpt",
    price: 34,
    minutes: 35,
    blurb:
      "Reshaping with a hot towel, straight-razor lines and beard oil to finish.",
  },
  {
    id: "hot-towel-shave",
    group: "beard",
    name: "Hot towel shave",
    price: 45,
    minutes: 45,
    blurb:
      "Three hot towels, pre-shave oil, two passes with the straight razor, cold towel, bay rum.",
  },
  {
    id: "head-shave",
    group: "beard",
    name: "Head shave",
    price: 38,
    minutes: 35,
    blurb:
      "Straight razor over the whole scalp, hot towel before and after, balm to finish.",
  },
  {
    id: "cut-beard",
    group: "combos",
    name: "Cut & beard",
    price: 58,
    minutes: 60,
    blurb: "Any cut plus a beard trim and line-up, blended where they meet.",
  },
  {
    id: "full-chair",
    group: "combos",
    name: "The full chair",
    price: 92,
    minutes: 90,
    blurb:
      "Cut, hot towel shave or beard sculpt, black mask and a scalp massage. Coffee included.",
  },
];

export const addOns = [
  { id: "design", name: "Hair design or hard part", price: 8 },
  { id: "grey", name: "Grey blending", price: 20 },
  { id: "mask", name: "Black charcoal mask", price: 12 },
  { id: "wash", name: "Wash & scalp massage", price: 10 },
  { id: "brows", name: "Eyebrow tidy", price: 6 },
];

export const policies = [
  {
    title: "Running late",
    text: "We hold your chair for ten minutes. After that we will try to fit you in, but your barber may need to shorten the service.",
  },
  {
    title: "Cancelling",
    text: "Free up to four hours before. Inside four hours, or a no-show, and we ask for half the service price next visit.",
  },
  {
    title: "Walk-ins",
    text: "Always welcome. The board by the door shows who is free; weekday mornings are your best bet.",
  },
  {
    title: "Paying",
    text: "Card, phone or cash at the counter. Tips go straight to your barber, in full.",
  },
];

/* ------------------------------------------------------------ gallery */

export type CutStyle = "fade" | "lineup" | "beard" | "scissor";
export const cutStyles: { id: CutStyle | "all"; label: string }[] = [
  { id: "all", label: "All cuts" },
  { id: "fade", label: "Fades" },
  { id: "lineup", label: "Line-ups & designs" },
  { id: "beard", label: "Beards & shaves" },
  { id: "scissor", label: "Scissor work" },
];

export type Cut = {
  id: string;
  img: Img;
  title: string;
  recipe: string;
  style: CutStyle;
  barber: string;
  service: string;
};

export const cuts: Cut[] = [
  {
    id: "mid-skin-waves",
    img: {
      src: heroCut,
      alt: "Side profile of a mid skin fade with waves on top and a sharp temple line",
      w: 1440,
      h: 1800,
    },
    title: "Mid skin fade with waves",
    recipe:
      "Foil at the nape, #0.5 to #2 through the mid, brushed waves on top",
    style: "fade",
    barber: "jules",
    service: "skin-fade",
  },
  {
    id: "low-fade-crop",
    img: {
      src: fade01,
      alt: "Low fade with a short textured top, photographed from the side by a ring light",
      w: 1800,
      h: 1191,
    },
    title: "Low fade, heart design",
    recipe: "#0 at the ear, #2 blend, freehand heart above the temple",
    style: "lineup",
    barber: "marcus",
    service: "skin-fade",
  },
  {
    id: "drop-fade",
    img: {
      src: fade02,
      alt: "Young man in a black cape with a drop fade curving behind the ear",
      w: 767,
      h: 1280,
    },
    title: "Drop fade",
    recipe: "Skin behind the ear dropping to the nape, #3 on top",
    style: "fade",
    barber: "jules",
    service: "skin-fade",
  },
  {
    id: "low-taper",
    img: {
      src: fade03,
      alt: "Profile of a low taper with a soft curly top",
      w: 720,
      h: 1280,
    },
    title: "Low taper, soft top",
    recipe: "#1 at the neckline only, scissor-cut curls on top",
    style: "fade",
    barber: "ren",
    service: "taper",
  },
  {
    id: "high-bald-fade",
    img: {
      src: fade05,
      alt: "High bald fade on a client in a black cape, seen at an angle",
      w: 720,
      h: 1280,
    },
    title: "High bald fade",
    recipe: "Foil to the parietal ridge, #1 on top",
    style: "fade",
    barber: "jules",
    service: "skin-fade",
  },
  {
    id: "lightning-design",
    img: {
      src: design,
      alt: "Skin fade with a lightning-bolt design cut into the side",
      w: 960,
      h: 1533,
    },
    title: "Lightning design",
    recipe: "Mid skin fade, freehand bolt with the detailer",
    style: "lineup",
    barber: "marcus",
    service: "skin-fade",
  },
  {
    id: "mid-fade-curls",
    img: {
      src: fade07,
      alt: "Mid fade with a dense curly top, side profile against a window",
      w: 1800,
      h: 1180,
    },
    title: "Mid fade, curly top",
    recipe: "#0 to #3 through the mid, sponge-twisted curls",
    style: "fade",
    barber: "ren",
    service: "skin-fade",
  },
  {
    id: "sharp-lineup",
    img: {
      src: lineup,
      alt: "Front view of a fresh shaved head with a crisp hairline being finished",
      w: 646,
      h: 1400,
    },
    title: "Front line-up",
    recipe: "Head shave with a razor-sharp front line",
    style: "lineup",
    barber: "jules",
    service: "head-shave",
  },
  {
    id: "beard-shape",
    img: {
      src: beardTrim,
      alt: "Barber working with the trimmer on a seated client, reflected in the station mirror",
      w: 860,
      h: 829,
    },
    title: "Beard reshape",
    recipe: "Trimmer to length, razor along the cheek line",
    style: "beard",
    barber: "marcus",
    service: "beard-sculpt",
  },
  {
    id: "shave-station",
    img: {
      src: shaveStation,
      alt: "Barber shaping a client's beard at the shave station, brush and bowl on the counter",
      w: 900,
      h: 829,
    },
    title: "At the shave station",
    recipe: "Hot lather, single-use blade, two passes with the razor",
    style: "beard",
    barber: "tomas",
    service: "hot-towel-shave",
  },
  {
    id: "scissor-shape",
    img: {
      src: scissorMid,
      alt: "Barber with long curly hair shaping a client's grey-flecked cut with scissors",
      w: 960,
      h: 1440,
    },
    title: "Grey, kept long",
    recipe: "Scissor-over-comb at the sides, length kept through the top",
    style: "scissor",
    barber: "dario",
    service: "scissor-cut",
  },
  {
    id: "scissor-detail",
    img: {
      src: scissorBack,
      alt: "Barber leaning in to scissor-cut above a client's ear",
      w: 960,
      h: 1440,
    },
    title: "Point-cut texture",
    recipe: "Point-cut through the top for movement, soft taper",
    style: "scissor",
    barber: "dario",
    service: "scissor-cut",
  },
  {
    id: "grey-crop",
    img: {
      src: scissorComb,
      alt: "Close-up of scissors and comb lifting grey hair at the crown",
      w: 960,
      h: 1440,
    },
    title: "Crop for fine grey hair",
    recipe: "Scissor-over-comb, crown cut to lie flat",
    style: "scissor",
    barber: "hugo",
    service: "classic-cut",
  },
  {
    id: "bun-finish",
    img: {
      src: bunWork,
      alt: "Barber checking the back of a client's cut, seen over his shoulder",
      w: 960,
      h: 1440,
    },
    title: "Classic short back and sides",
    recipe: "#2 at the sides, scissor top, side part",
    style: "scissor",
    barber: "dario",
    service: "classic-cut",
  },
];

/* ------------------------------------------------------------ shop */

export type ProductArt =
  "tin" | "jar" | "spray" | "dropper" | "splash" | "bowl" | "razor" | "comb";
export type Category = "hair" | "beard" | "shave" | "tools";
export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "hair", label: "Hair" },
  { id: "beard", label: "Beard" },
  { id: "shave", label: "Shave" },
  { id: "tools", label: "Tools" },
];

export type Product = {
  id: string;
  name: string;
  short: string;
  category: Category;
  art: ProductArt;
  /** Label colour token from styles.css. */
  label: "red" | "green" | "ink" | "mint" | "cream";
  variantName: string;
  variants: { id: string; label: string; price: number }[];
  hold?: number;
  shine?: number;
  description: string;
  use: string;
  ingredients: string;
  barberNote: { by: string; text: string };
};

export const products: Product[] = [
  {
    id: "heavy-pomade",
    name: "No. 9 Heavy Pomade",
    short: "Oil-based, high shine, holds a pompadour through a rainstorm.",
    category: "hair",
    art: "tin",
    label: "red",
    variantName: "Size",
    variants: [
      { id: "2oz", label: "2 oz", price: 16 },
      { id: "4oz", label: "4 oz", price: 24 },
    ],
    hold: 5,
    shine: 5,
    description:
      "The pomade we finish slick-backs and side parts with. Beeswax and castor oil, so it stays put all day and needs a proper wash to come out. Smells faintly of vanilla and tobacco leaf.",
    use: "Warm a pea-sized amount between your palms, work it through damp hair from the back forward, then comb into place.",
    ingredients:
      "Petrolatum, beeswax, castor oil, lanolin, fragrance (vanilla, tobacco absolute).",
    barberNote: {
      by: "tomas",
      text: "For a side part that still looks combed at midnight.",
    },
  },
  {
    id: "matte-clay",
    name: "Dry Matte Clay",
    short: "Strong hold, no shine, looks like you did nothing.",
    category: "hair",
    art: "tin",
    label: "ink",
    variantName: "Size",
    variants: [
      { id: "2oz", label: "2 oz", price: 18 },
      { id: "4oz", label: "4 oz", price: 26 },
    ],
    hold: 4,
    shine: 1,
    description:
      "Kaolin and bentonite clay for texture on crops and messy tops. Washes out with water, rebuilds with a little more on day two. Cedar and black pepper.",
    use: "Scrape a small amount with your thumbnail, rub until it disappears, then pinch and twist through dry hair.",
    ingredients:
      "Water, kaolin, bentonite, beeswax, glycerin, cedarwood oil, black pepper oil.",
    barberNote: {
      by: "hugo",
      text: "The only thing I put on a French crop. Less than you think.",
    },
  },
  {
    id: "water-pomade",
    name: "Water-Based Pomade",
    short: "Medium hold, natural shine, rinses out clean.",
    category: "hair",
    art: "jar",
    label: "mint",
    variantName: "Size",
    variants: [{ id: "4oz", label: "4 oz", price: 22 }],
    hold: 3,
    shine: 3,
    description:
      "The everyday option for tapers and classic cuts. Combs through without clumping, restyles with a damp comb and rinses out with plain water. Light bergamot.",
    use: "Apply to damp or dry hair, comb into shape. Re-wet the comb at lunch to reset.",
    ingredients: "Water, PVP, glycerin, castor oil PEG-40, bergamot oil.",
    barberNote: {
      by: "ren",
      text: "What I hand to anyone who says they 'don't really do product'.",
    },
  },
  {
    id: "sea-salt-tonic",
    name: "Sea Salt Tonic",
    short: "Pre-styler for volume and grip on longer tops.",
    category: "hair",
    art: "spray",
    label: "green",
    variantName: "Size",
    variants: [{ id: "8floz", label: "8 fl oz", price: 18 }],
    hold: 2,
    shine: 1,
    description:
      "Sea salt, aloe and a little sugar to give fine and straight hair something to hold on to. Spray before blow-drying or air-drying for a beachy, matte texture.",
    use: "Six to eight sprays through towel-dried hair, then blow-dry with your fingers.",
    ingredients:
      "Water, sea salt, aloe leaf juice, cane sugar, glycerin, sea fennel extract.",
    barberNote: {
      by: "dario",
      text: "Under clay, before the dryer. The best two-step there is.",
    },
  },
  {
    id: "beard-oil",
    name: "Beard Oil",
    short: "Softens the beard, stops the itch, scents lightly.",
    category: "beard",
    art: "dropper",
    label: "cream",
    variantName: "Scent",
    variants: [
      { id: "cedar-bay", label: "Cedar & bay", price: 24 },
      { id: "vetiver", label: "Vetiver", price: 24 },
      { id: "unscented", label: "Unscented", price: 22 },
    ],
    description:
      "Jojoba and argan oils, cold pressed, in a 1 fl oz amber dropper bottle. Soaks into the beard and the skin underneath in about a minute, no shine left behind.",
    use: "Three to five drops into your palm after a shower, rub through the beard down to the skin, comb.",
    ingredients:
      "Jojoba seed oil, argan kernel oil, sweet almond oil, vitamin E, essential oils (scented versions).",
    barberNote: {
      by: "marcus",
      text: "Week two of a new beard is when you need this the most.",
    },
  },
  {
    id: "beard-balm",
    name: "Beard Balm",
    short: "Light hold for flyaways and a tidier outline.",
    category: "beard",
    art: "tin",
    label: "green",
    variantName: "Size",
    variants: [{ id: "2oz", label: "2 oz", price: 20 }],
    hold: 2,
    shine: 2,
    description:
      "Shea butter and beeswax with a little of our beard oil folded in. Tames longer beards and moustaches without crunch. Cedar and bay.",
    use: "Warm a fingertip's worth in your palms, work through the beard, shape with a brush or comb.",
    ingredients:
      "Shea butter, beeswax, jojoba oil, argan oil, cedarwood and bay leaf oils.",
    barberNote: {
      by: "marcus",
      text: "Balm on the moustache, oil on the rest.",
    },
  },
  {
    id: "shave-soap",
    name: "Shave Soap",
    short: "Tallow puck in a stoneware bowl. Thick, cushioning lather.",
    category: "shave",
    art: "bowl",
    label: "cream",
    variantName: "Option",
    variants: [
      { id: "bowl", label: "Soap in bowl", price: 32 },
      { id: "refill", label: "Refill puck", price: 20 },
    ],
    description:
      "The soap Tomás lathers every shave with. A slow-made tallow and shea puck that whips into a dense, slick lather with a damp brush. Lasts about three months of daily shaves.",
    use: "Soak your brush, shake it out, load the soap for thirty seconds, then build the lather on your face in circles.",
    ingredients:
      "Stearic acid, tallow, shea butter, coconut oil, glycerin, bay rum fragrance.",
    barberNote: {
      by: "tomas",
      text: "Buy the bowl once, then just the refills.",
    },
  },
  {
    id: "bay-rum",
    name: "Bay Rum Aftershave",
    short: "The splash we finish every shave with. Clove, bay, a little lime.",
    category: "shave",
    art: "splash",
    label: "red",
    variantName: "Size",
    variants: [{ id: "4floz", label: "4 fl oz", price: 28 }],
    description:
      "An old barbershop recipe: bay leaf, clove and allspice steeped in alcohol with a touch of lime and witch hazel. Stings for two seconds, then smells like the shop for two hours.",
    use: "A few drops in your palms, pat onto the shaved area. Never rub.",
    ingredients:
      "Alcohol denat., water, witch hazel, bay leaf oil, clove oil, allspice oil, lime oil, glycerin.",
    barberNote: {
      by: "tomas",
      text: "If you know the smell, you know the shop.",
    },
  },
  {
    id: "safety-razor",
    name: "Double-Edge Safety Razor",
    short: "Chrome-plated brass, closed comb, ten blades included.",
    category: "tools",
    art: "razor",
    label: "ink",
    variantName: "Finish",
    variants: [
      { id: "chrome", label: "Chrome", price: 48 },
      { id: "black", label: "Matte black", price: 52 },
    ],
    description:
      "A three-piece razor with a mild closed-comb head, heavy enough to do the work without pressure. The way to shave at home if you liked the shop shave.",
    use: "Hold the head flat against the skin, then lower the handle until the blade catches. Short strokes, no pressure, with the grain first.",
    ingredients:
      "Chrome-plated brass handle and head, 10 stainless double-edge blades.",
    barberNote: {
      by: "tomas",
      text: "Let the weight do it. You are only steering.",
    },
  },
  {
    id: "pocket-comb",
    name: "Pocket Comb",
    short: "Hand-cut cellulose acetate, fine and wide teeth.",
    category: "tools",
    art: "comb",
    label: "ink",
    variantName: "Colour",
    variants: [
      { id: "black", label: "Black", price: 9 },
      { id: "tortoise", label: "Tortoise", price: 12 },
    ],
    description:
      "The five-inch comb that lives in our shirt pockets. Saw-cut and hand-polished so the teeth do not snag or build static.",
    use: "Wide teeth for detangling and product, fine teeth for the part and the finish.",
    ingredients: "Cellulose acetate.",
    barberNote: { by: "dario", text: "Every side part starts with this one." },
  },
];

/* ------------------------------------------------------------ fade chart page */

/** A fade described the way the chart draws it; guard ids come from lib/fade.ts. */
export type Chart = {
  height: "taper" | "low" | "mid" | "high";
  start: string;
  blend: string;
  /** Length kept on top, in inches. */
  top: number;
  lineup: "natural" | "sharp";
  part: boolean;
  beard: "none" | "trim" | "blend";
};

export const fadeChartPage: {
  title: string;
  intro: string;
  presets: { id: string; name: string; chart: Chart }[];
} = {
  title: "Fade chart",
  intro:
    "Pick where the fade starts, how short it goes and how much you keep on top. The chart draws the cut from neckline to crown and writes it down in the words your barber uses.",
  presets: [
    {
      id: "low-taper",
      name: "Low taper",
      chart: {
        height: "taper",
        start: "1",
        blend: "3",
        top: 2,
        lineup: "natural",
        part: false,
        beard: "none",
      },
    },
    {
      id: "mid-skin",
      name: "Mid skin fade",
      chart: {
        height: "mid",
        start: "skin",
        blend: "3",
        top: 1.5,
        lineup: "sharp",
        part: false,
        beard: "none",
      },
    },
    {
      id: "high-tight",
      name: "High & tight",
      chart: {
        height: "high",
        start: "0",
        blend: "2",
        top: 0.75,
        lineup: "natural",
        part: false,
        beard: "none",
      },
    },
    {
      id: "low-part",
      name: "Low fade, hard part",
      chart: {
        height: "low",
        start: "0.5",
        blend: "4",
        top: 3,
        lineup: "sharp",
        part: true,
        beard: "blend",
      },
    },
  ],
};

/* ------------------------------------------------------------ pages */

export const home = {
  title: "Sharp fades, hot towels, no rush.",
  lead: "A six-chair barbershop on Dunmore Avenue since 2012. Skin fades, scissor cuts, straight-razor shaves and beards, by barbers who will tell you honestly what your hair can do.",
  heroImage: cuts[0].img,
  boardTitle: "The price board",
  boardText:
    "Every price below includes the hot lather neck shave and a style. Senior barbers add $5, Dario adds $10.",
  boardServices: [
    "classic-cut",
    "skin-fade",
    "taper",
    "scissor-cut",
    "beard-trim",
    "hot-towel-shave",
    "cut-beard",
  ],
  chartTitle: "Say the cut right",
  chartText:
    "Half of all bad haircuts are a description problem. Build yours on the fade chart, from the neckline to the crown, and bring the words with you.",
  barbersTitle: "Six chairs, six barbers",
  barbersText:
    "Each one cuts everything. Each one also has the thing they would rather be doing.",
  galleryTitle: "Off the chair this month",
  ritualTitle: "The hot towel shave",
  ritualText:
    "Forty-five minutes, no shortcuts. Tomás does most of them; the last slot of the day is the one to get.",
  ritualImage: {
    src: shaveStation,
    alt: "Tomás at the shave station, a shaving brush standing in its bowl on the counter",
    w: 900,
    h: 829,
  } as Img,
  ritualSteps: [
    "Hot towel, two minutes, to open the skin.",
    "Pre-shave oil and a brushed lather, built warm.",
    "First pass with the grain, straight razor, fresh blade.",
    "Second towel, second lather, pass across the grain.",
    "Cold towel to close up. Bay rum, balm, done.",
  ],
  quote: {
    text: "I have had my hair cut in four countries. I drive forty minutes to sit in Jules's chair, and I would drive further.",
    by: "Kwame, in chair 2 every third Saturday",
  },
  shopTitle: "From the back shelf",
  shopText: "The products we use on you all day, in sizes for your bathroom.",
  shopPicks: ["heavy-pomade", "matte-clay", "beard-oil", "bay-rum"],
  visitTitle: "Find the pole",
  visitText:
    "Halfway down Dunmore, between the bakery and the bike shop. Look for the spinning pole.",
  visitImage: {
    src: pole,
    alt: "A classic striped barber pole mounted on a brick wall",
    w: 641,
    h: 1400,
  } as Img,
  closeTitle: "Your chair is open.",
  closeText:
    "Book in under a minute, or walk in and take a seat by the window.",
};

export const servicesPage = {
  title: "Services & prices",
  intro:
    "One price list, no surprises at the counter. Prices are for barbers in chairs 4 to 6; senior barbers add $5 and Dario, our master barber, adds $10.",
  addOnsTitle: "Add to any service",
  policiesTitle: "How the shop runs",
};

export const barbersPage = {
  title: "The barbers",
  intro:
    "Six chairs, numbered from the window. Every barber here cuts everything on the price board; these are the cuts they would choose if you let them.",
};

export const galleryPage = {
  title: "Gallery",
  intro:
    "Fresh off the chair, photographed before anyone has left the shop. Every cut comes with its recipe, so you can ask for it by name.",
};

export const shopPage = {
  title: "Shop",
  intro:
    "The pomades, oils and tools from our stations, in take-home sizes. Pick up at the counter the same day or have it shipped.",
};

export const bagPage = {
  title: "Your bag",
  pickupNote: "Ready at the counter within two hours during opening hours.",
  shipFlat: 6,
  freeShipOver: 60,
};

export const aboutPage = {
  title: "Our story",
  lead: "Fade opened in 2012 with two chairs, a borrowed sink and Dario's rule that nobody gets rushed. Six chairs later, the rule has not changed.",
  image: {
    src: shopCorner,
    alt: "The back of the shop: checkerboard floor, black-and-white tiles, a green chair and a wooden shelf of tools",
    w: 1130,
    h: 1067,
  } as Img,
  floorImage: {
    src: shopFloor,
    alt: "Black-and-white photo of the shop floor with two chairs facing a wall of mirrors",
    w: 1600,
    h: 1066,
  } as Img,
  story: [
    "Dario Vance spent twelve years cutting hair on ships and in a hotel basement before signing the lease on 214 Dunmore Avenue. The space had been a shoe repair shop for forty years. We kept the long counter and laid the checkerboard floor ourselves over three nights.",
    "The first year it was Dario and Jules, two chairs and a waiting bench made from an old church pew. Marcus joined in 2013 and painted the window lettering. By 2019 the shop had six chairs, a shave station at the back and a waiting list for the apprenticeship.",
    "We are still a neighbourhood shop. Most people in the chairs live within ten blocks; some of the kids we gave first haircuts to now book their own fades.",
  ],
  timeline: [
    {
      year: "2012",
      text: "Two chairs, one sink. Dario and Jules open the doors on 2 June.",
    },
    {
      year: "2013",
      text: "Marcus joins and paints the gold-leaf window by hand.",
    },
    {
      year: "2016",
      text: "Tomás builds the shave station at the back. Hot towel shaves go on the board.",
    },
    {
      year: "2019",
      text: "Chairs five and six. Ren is our first apprentice to stay on.",
    },
    {
      year: "2021",
      text: "Hugo finishes the apprenticeship. Tuesday-night scissor classes begin.",
    },
    {
      year: "2025",
      text: "Our own pomade and beard oil, made in small batches with a soap maker two streets away.",
    },
  ],
  rulesTitle: "The house rules",
  rules: [
    "Nobody gets rushed. If a cut needs ten more minutes, it gets them.",
    "Your barber tells you the truth about your hair, even when it is not what the photo promised.",
    "Clippers are cleaned and disinfected between every client. Blades are single use.",
    "Phones on silent in the chair, please. The radio stays on.",
    "Kids are welcome every day, not just Saturdays.",
  ],
  apprenticeTitle: "The apprenticeship",
  apprenticeText:
    "Every September we take two apprentices for a paid eighteen-month programme: six months on the floor sweeping and shampooing, then supervised cuts on friends and family, then your own book. Four of our six barbers came through it.",
};

export const visitPage = {
  title: "Hours & directions",
  intro:
    "214 Dunmore Avenue, halfway between the Linden Street station and the park. Walk-ins welcome whenever a chair is free.",
  transit: [
    {
      title: "By train",
      text: "Linden Street station, Green Line. Exit north, four minutes on foot.",
    },
    {
      title: "By bus",
      text: "Routes 12 and 40 stop at Dunmore & Pell, right outside the bakery next door.",
    },
    {
      title: "By car",
      text: "Two-hour street parking on Dunmore. Free lot behind the library after 5 pm and all day Sunday.",
    },
    {
      title: "By bike",
      text: "Two racks out front, plus a hook inside if it is raining.",
    },
  ],
  faqTitle: "Questions we hear at the counter",
  faq: [
    {
      q: "Do I need to book?",
      a: "No, but it helps. Walk-ins get the next free chair; on Saturdays that can mean an hour on the bench. Weekday mornings are usually quiet.",
    },
    {
      q: "How often should I come in?",
      a: "Skin fades look sharpest for two to three weeks. Tapers and scissor cuts stretch to four or five. Beards, every two to four weeks depending on how strict you are with the neckline.",
    },
    {
      q: "Can I bring a reference photo?",
      a: "Please do. Better still, build it on the fade chart and bring the description too. Your barber will tell you if your hair type or growth pattern will change the result.",
    },
    {
      q: "Do you cut kids' hair?",
      a: "Every day, from first haircuts up. Ren and Hugo are the kids' favourites. Under-twelves are $26.",
    },
    {
      q: "Do you cut longer hair and curls?",
      a: "Yes. Book a scissor cut with Dario or Hugo so the time is set aside for it.",
    },
    {
      q: "Do you sell gift cards?",
      a: "At the counter, in any amount from $25. They never expire.",
    },
  ],
};

export const notFound = {
  title: "That chair is empty",
  text: "The page you were after does not exist, or it moved when we rearranged the shop.",
};
