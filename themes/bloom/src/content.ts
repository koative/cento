import tulips from "./assets/tulips.jpg";
import iris from "./assets/iris.jpg";
import morningRoom from "./assets/morning-room.jpg";
import peonyVase from "./assets/peony-vase.jpg";
import tulipArmful from "./assets/tulip-armful.jpg";
import coral from "./assets/coral-hand-tie.jpg";
import coral2 from "./assets/coral-hand-tie-2.jpg";
import hedgerow from "./assets/hedgerow.jpg";
import everlasting from "./assets/everlasting.jpg";
import dahlias from "./assets/dahlias.jpg";
import campanula from "./assets/campanula.jpg";
import orchid from "./assets/orchid.jpg";
import marketTulips from "./assets/market-tulips.jpg";
import bride from "./assets/bride.jpg";
import installation from "./assets/installation.jpg";
import longTable from "./assets/long-table.jpg";
import jarTable from "./assets/jar-table.jpg";
import workbench from "./assets/workbench.jpg";
import florist from "./assets/florist.jpg";
import floristStall from "./assets/florist-stall.jpg";
import loveNote from "./assets/love-note.jpg";
import peony from "./assets/peony.jpg";
import sunflowers from "./assets/sunflowers.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  tulips: {
    src: tulips,
    alt: "Magenta and white double tulips in a glass jar tied with raffia",
    w: 1066,
    h: 1600,
  },
  iris: {
    src: iris,
    alt: "A single coral iris on a slender stem against a pale grey wall",
    w: 1280,
    h: 1600,
  },
  marketTulips: {
    src: marketTulips,
    alt: "Rows of kraft-wrapped tulip bunches in every colour at the flower market",
    w: 1300,
    h: 866,
  },
  bride: {
    src: bride,
    alt: "A bride holding a round bouquet of pink roses, lisianthus and thistle against a white gown",
    w: 1043,
    h: 1600,
  },
  installation: {
    src: installation,
    alt: "A tall installation of blush roses and sweet peas rising from white plinths",
    w: 834,
    h: 1300,
  },
  longTable: {
    src: longTable,
    alt: "A long candlelit dinner table set with low glass vases of garden flowers",
    w: 994,
    h: 1300,
  },
  jarTable: {
    src: jarTable,
    alt: "A loose arrangement of dried grasses and thistle in a glass jar on a picnic table",
    w: 1064,
    h: 1600,
  },
  workbench: {
    src: workbench,
    alt: "Overhead view of a florist's bench with lavender, scissors, twine and a notebook",
    w: 1300,
    h: 801,
  },
  florist: {
    src: florist,
    alt: "A florist in a striped apron building a bouquet of heliconia and roses",
    w: 1300,
    h: 866,
  },
  floristStall: {
    src: floristStall,
    alt: "A florist reaching for stems from buckets along the studio steps",
    w: 1300,
    h: 866,
  },
  loveNote: {
    src: loveNote,
    alt: "Orange and lilac tulips beside a handwritten card",
    w: 1600,
    h: 1066,
  },
  peony: {
    src: peony,
    alt: "Close-up of a fully open pink peony",
    w: 1300,
    h: 975,
  },
  sunflowers: {
    src: sunflowers,
    alt: "Sunflowers laid on a wooden table beside coffee and pastries",
    w: 1300,
    h: 866,
  },
  morningRoom: {
    src: morningRoom,
    alt: "White and blush roses with eucalyptus arranged beside a stack of old books",
    w: 868,
    h: 1300,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Bloom",
  sector: "Florist",
  tagline: "Flowers gathered by hand, delivered the same day.",
  announcement:
    "Same-day delivery across Eastbank — order by 1 pm, Monday to Saturday.",
  street: "14 Larkspur Row",
  district: "Eastbank, EB2 7LR",
  phone: "+1 555 0142 860",
  phoneHref: "tel:+15550142860",
  email: "hello@bloom.example",
  weddingsEmail: "weddings@bloom.example",
  hours: [
    { days: "Monday – Friday", time: "8:00 – 18:30" },
    { days: "Saturday", time: "8:00 – 16:00" },
    { days: "Sunday", time: "Closed — the flowers rest too" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/builder", label: "Build a bouquet" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/weddings", label: "Weddings & events" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
];

export const footerNav = [
  {
    title: "Send flowers",
    links: [
      { to: "/shop", label: "All flowers" },
      { to: "/builder", label: "Build a bouquet" },
      { to: "/subscriptions", label: "Subscriptions" },
      { to: "/cart", label: "Your bag" },
    ],
  },
  {
    title: "The studio",
    links: [
      { to: "/weddings", label: "Weddings & events" },
      { to: "/about", label: "About Bloom" },
      { to: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/delivery", label: "Delivery & FAQ" },
      { to: "/checkout", label: "Checkout" },
      { to: "/journal/tulips-that-last", label: "Flower care" },
    ],
  },
];

/* ---------- Shop ---------- */

export type ProductType = "Bouquet" | "Vase arrangement" | "Dried" | "Plant";
export type Colour =
  "Pink" | "White & blush" | "Coral & orange" | "Bright & mixed" | "Purple";
export type Occasion =
  "Birthday" | "Love" | "Thank you" | "Sympathy" | "New home" | "Just because";

export type Size = { id: string; label: string; detail: string; price: number };
export type Product = {
  id: string;
  name: string;
  type: ProductType;
  colour: Colour;
  occasions: Occasion[];
  note?: string;
  short: string;
  description: string[];
  sizes: Size[];
  vaseOption: boolean;
  recipe: string[];
  vaseLife: string;
  care: string;
  images: Img[];
  featured: number;
};

export const productTypes: ProductType[] = [
  "Bouquet",
  "Vase arrangement",
  "Dried",
  "Plant",
];
export const colours: { id: Colour; swatch: string }[] = [
  { id: "Pink", swatch: "#d9628e" },
  { id: "White & blush", swatch: "#f1ddd6" },
  { id: "Coral & orange", swatch: "#e8794f" },
  { id: "Bright & mixed", swatch: "#e9b730" },
  { id: "Purple", swatch: "#8a6bb5" },
];
export const occasions: Occasion[] = [
  "Birthday",
  "Love",
  "Thank you",
  "Sympathy",
  "New home",
  "Just because",
];

const bouquetSizes = (base: number): Size[] => [
  { id: "petite", label: "Petite", detail: "About 12 stems", price: base - 14 },
  { id: "classic", label: "Classic", detail: "About 20 stems", price: base },
  { id: "grand", label: "Grand", detail: "About 32 stems", price: base + 28 },
];

export const vases = [
  { id: "none", label: "No vase", price: 0 },
  { id: "glass", label: "Recycled glass jar", price: 16 },
  { id: "stoneware", label: "Speckled stoneware jug", price: 34 },
];

export const products: Product[] = [
  {
    id: "the-daydream",
    name: "The Daydream",
    type: "Bouquet",
    colour: "Pink",
    occasions: ["Birthday", "Just because", "Love"],
    note: "Bestseller",
    short: "Double tulips in raspberry and white, loosely tied with raffia.",
    description: [
      "A generous gathering of double tulips, the kind with ruffled petals that look more like peonies than tulips. Raspberry edges, white hearts, a little wild at heart.",
      "Tulips keep growing after they are cut and turn towards the light, so this one changes shape every day it is with you. We tie it loosely so it has room to move.",
    ],
    sizes: bouquetSizes(56),
    vaseOption: true,
    recipe: [
      "Double tulip 'Columbus'",
      "Double tulip 'Dream Touch'",
      "Tulip foliage",
      "Raffia tie",
    ],
    vaseLife: "6–8 days",
    care: "Use a tall vase with only 5 cm of cold water; tulips drink fast and droop in warm water.",
    images: [images.tulips],
    featured: 1,
  },
  {
    id: "morning-room",
    name: "Morning Room",
    type: "Vase arrangement",
    colour: "White & blush",
    occasions: ["Love", "Thank you", "Sympathy"],
    short:
      "Garden roses, spray roses and silver-dollar eucalyptus in a low arrangement.",
    description: [
      "Soft, quiet and a little undone: white garden roses and blush spray roses arranged low with trailing eucalyptus, the way they would sit on a table by a window.",
      "Delivered arranged in the vessel of your choice, so it can go straight onto a desk, a bedside table or a kitchen windowsill.",
    ],
    sizes: [
      { id: "petite", label: "Petite", detail: "Low posy, 18 cm", price: 64 },
      {
        id: "classic",
        label: "Classic",
        detail: "Table piece, 28 cm",
        price: 82,
      },
      { id: "grand", label: "Grand", detail: "Statement, 40 cm", price: 118 },
    ],
    vaseOption: true,
    recipe: [
      "Garden rose 'Vendela'",
      "Spray rose 'Bombastic'",
      "Silver-dollar eucalyptus",
      "Astrantia",
      "Waxflower",
    ],
    vaseLife: "7–10 days",
    care: "Top up with fresh water every two days and trim the rose stems by 1 cm each time.",
    images: [images.morningRoom],
    featured: 2,
  },
  {
    id: "peony-season",
    name: "Peony Season",
    type: "Vase arrangement",
    colour: "Pink",
    occasions: ["Birthday", "Love", "Thank you"],
    note: "Seasonal",
    short: "Sarah Bernhardt peonies in a speckled stoneware jug.",
    description: [
      "Peonies arrive as tight, cool buds and open over three or four days into enormous blush blooms. We send them just as they begin to unfurl so you see the whole show.",
      "Our autumn peonies come from a grower in the southern hemisphere, where the season runs October to December. When they are gone, they are gone until next year.",
    ],
    sizes: [
      { id: "petite", label: "Petite", detail: "5 stems", price: 72 },
      { id: "classic", label: "Classic", detail: "9 stems", price: 98 },
      { id: "grand", label: "Grand", detail: "15 stems", price: 142 },
    ],
    vaseOption: false,
    recipe: [
      "Peony 'Sarah Bernhardt'",
      "Peony foliage",
      "Speckled stoneware jug (included)",
    ],
    vaseLife: "5–7 days",
    care: "Buds that stay closed can be coaxed open by a few minutes in warm water.",
    images: [
      {
        src: peonyVase,
        alt: "Pink peonies in a small stoneware jug against a weathered grey wall",
        w: 1066,
        h: 1600,
      },
    ],
    featured: 3,
  },
  {
    id: "the-armful",
    name: "The Armful",
    type: "Bouquet",
    colour: "White & blush",
    occasions: ["Birthday", "Thank you", "New home"],
    short:
      "Thirty-odd tulips in cream, lilac and peach. Bring it home in both arms.",
    description: [
      "Market tulips in every pastel the growers send us that week: cream, lilac, peach and the occasional flamed one. Bound with a strip of cotton and nothing else.",
      "The Armful is our answer to people who say flowers should be big or not at all.",
    ],
    sizes: bouquetSizes(64),
    vaseOption: true,
    recipe: [
      "Tulip 'Avignon'",
      "Tulip 'Purple Flag'",
      "Tulip 'Apricot Foxx'",
      "Tulip 'White Dream'",
      "Cotton tie",
    ],
    vaseLife: "6–8 days",
    care: "Wrap the bunch in its paper for an hour after cutting the stems to straighten them.",
    images: [
      {
        src: tulipArmful,
        alt: "Someone holding a large bunch of cream, pink and peach tulips tied with ribbon",
        w: 1300,
        h: 1207,
      },
    ],
    featured: 4,
  },
  {
    id: "coral-hand-tie",
    name: "Coral Hand-Tie",
    type: "Bouquet",
    colour: "Coral & orange",
    occasions: ["Birthday", "Thank you", "Just because"],
    short:
      "Coral carnations and white spray carnations with leatherleaf fern, wrapped in blush paper.",
    description: [
      "Carnations are the most underrated flower in the shop: frilled, scented of clove, and good for two weeks if you let them. We pair coral and white with dark fern for a bouquet that looks like it cost twice as much.",
      "Spiralled by hand, tied, and wrapped in our blush tissue with a water pouch for the journey.",
    ],
    sizes: bouquetSizes(48),
    vaseOption: true,
    recipe: [
      "Carnation 'Tessino'",
      "Spray carnation 'Silver Pink'",
      "Leatherleaf fern",
      "Blush tissue wrap",
    ],
    vaseLife: "10–14 days",
    care: "Snap the stems just above a node rather than cutting through it; carnations drink better that way.",
    images: [
      {
        src: coral,
        alt: "A hand holding a paper-wrapped bouquet of coral and white carnations with fern",
        w: 1066,
        h: 1600,
      },
      {
        src: coral2,
        alt: "The same coral carnation bouquet resting on a white linen cloth",
        w: 866,
        h: 1300,
      },
    ],
    featured: 5,
  },
  {
    id: "hedgerow",
    name: "Hedgerow",
    type: "Bouquet",
    colour: "Bright & mixed",
    occasions: ["Birthday", "New home", "Just because"],
    short:
      "Allium, scabious, yarrow and goldenrod, gathered like a walk along a lane.",
    description: [
      "Everything a meadow does in late summer, in your hands: purple allium heads, yarrow, goldenrod, scabious and whatever surprising stem our growers bring in that week.",
      "No two Hedgerows are alike. If you like a florist to surprise you, this is the one.",
    ],
    sizes: bouquetSizes(68),
    vaseOption: true,
    recipe: [
      "Allium 'Purple Sensation'",
      "Scabious",
      "Yarrow",
      "Goldenrod",
      "Rose hips",
      "Seasonal surprise",
    ],
    vaseLife: "7–9 days",
    care: "Strip every leaf that would sit below the water line; meadow stems foul water quickly.",
    images: [
      {
        src: hedgerow,
        alt: "A loose, bright bouquet of allium, yarrow, goldenrod and pink wildflowers",
        w: 1300,
        h: 979,
      },
    ],
    featured: 6,
  },
  {
    id: "dahlia-market-bunch",
    name: "Dahlia Market Bunch",
    type: "Bouquet",
    colour: "Coral & orange",
    occasions: ["Thank you", "Just because", "Birthday"],
    note: "Seasonal",
    short:
      "Café au lait, peach and wine-red dahlias, straight from the grower.",
    description: [
      "Dahlias are at their best for about ten weeks a year and we buy as many as our grower in Orchard Vale will sell us. Dinner-plate café au lait, peach pompoms and dark wine-red cactus blooms.",
      "Short-lived but spectacular. Order them for a dinner party, not a fortnight away.",
    ],
    sizes: bouquetSizes(58),
    vaseOption: true,
    recipe: [
      "Dahlia 'Café au Lait'",
      "Dahlia 'Peaches n' Cream'",
      "Dahlia 'Rip City'",
      "Feverfew",
      "Bupleurum",
    ],
    vaseLife: "4–6 days",
    care: "Change the water daily; dahlias are thirsty and short-lived but worth it.",
    images: [
      {
        src: dahlias,
        alt: "Bunches of peach, cream and wine-red dahlias with feverfew at a market table",
        w: 1400,
        h: 1179,
      },
    ],
    featured: 7,
  },
  {
    id: "everlasting",
    name: "Everlasting",
    type: "Dried",
    colour: "Bright & mixed",
    occasions: ["New home", "Sympathy", "Just because"],
    short:
      "Strawflower and statice, air-dried in the studio. Lasts a year or more.",
    description: [
      "Strawflowers crackle like paper when you touch them and keep their colour for a year. We dry ours upside down in the back of the studio, then bunch them with sea lavender and statice.",
      "No water, no care, no wilting. Keep it out of direct sun and it will see you through to next summer.",
    ],
    sizes: [
      { id: "petite", label: "Posy", detail: "Hand-sized bunch", price: 34 },
      { id: "classic", label: "Bunch", detail: "Fills a jug", price: 46 },
      {
        id: "grand",
        label: "Abundance",
        detail: "Mantelpiece-size",
        price: 72,
      },
    ],
    vaseOption: true,
    recipe: [
      "Strawflower",
      "Statice",
      "Sea lavender",
      "Bunny tail grass",
      "Jute tie",
    ],
    vaseLife: "12 months or more",
    care: "Keep dry and out of strong sunlight. A cool hairdryer setting removes dust.",
    images: [
      {
        src: everlasting,
        alt: "Dried strawflowers in yellow, orange and wine with purple and white statice",
        w: 1300,
        h: 1081,
      },
    ],
    featured: 8,
  },
  {
    id: "campanula-pot",
    name: "Campanula Pot",
    type: "Plant",
    colour: "Purple",
    occasions: ["New home", "Thank you", "Just because"],
    short: "Star-shaped violet bellflowers in a pierced white ceramic pot.",
    description: [
      "A small, cheerful plant for a kitchen table: violet bellflowers that keep coming for six weeks or more, in a pierced white ceramic pot that lets the light through.",
      "Plant it out in the garden once it finishes flowering and it will come back next spring.",
    ],
    sizes: [
      { id: "petite", label: "Single pot", detail: "12 cm ceramic", price: 34 },
      { id: "classic", label: "Pair", detail: "Two matching pots", price: 62 },
    ],
    vaseOption: false,
    recipe: [
      "Campanula portenschlagiana",
      "Pierced white ceramic pot",
      "Sphagnum moss top dressing",
    ],
    vaseLife: "6+ weeks of flowers",
    care: "Water when the top of the soil feels dry. Bright light, no direct midday sun.",
    images: [
      {
        src: campanula,
        alt: "Violet campanula flowers in a pierced white pot on a wooden café table",
        w: 1600,
        h: 1066,
      },
    ],
    featured: 9,
  },
  {
    id: "phalaenopsis",
    name: "Phalaenopsis",
    type: "Plant",
    colour: "Purple",
    occasions: ["Thank you", "Sympathy", "New home"],
    short:
      "A double-stemmed orchid in orchid pink, potted in bark with a slate pot.",
    description: [
      "The orchid that forgives everything. Two arching spikes of orchid-pink flowers that open one after another for two to three months.",
      "Potted in bark in a slate-grey ceramic cover pot, staked with hazel, and delivered with a care card.",
    ],
    sizes: [
      { id: "petite", label: "Double stem", detail: "50 cm tall", price: 68 },
      { id: "classic", label: "Triple stem", detail: "60 cm tall", price: 92 },
    ],
    vaseOption: false,
    recipe: [
      "Phalaenopsis 'Pink Lady'",
      "Orchid bark",
      "Hazel stakes",
      "Slate ceramic cover pot",
    ],
    vaseLife: "2–3 months of flowers",
    care: "Soak the pot for ten minutes once a week, then let it drain completely.",
    images: [
      {
        src: orchid,
        alt: "A tall pink phalaenopsis orchid with many open flowers on a wooden shop floor",
        w: 975,
        h: 1300,
      },
    ],
    featured: 10,
  },
];

export const sortOptions = [
  { id: "featured", label: "Our picks first" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "name", label: "Name, A to Z" },
] as const;

/* ---------- Builder ---------- */

export type Glyph =
  | "ranunculus"
  | "rose"
  | "tulip"
  | "anemone"
  | "sweetpea"
  | "eucalyptus"
  | "waxflower"
  | "lisianthus";
export type Stem = {
  id: string;
  name: string;
  variety: string;
  price: number;
  glyph: Glyph;
  colour: string;
  centre: string;
  from: string;
};

export const stems: Stem[] = [
  {
    id: "ranunculus",
    name: "Ranunculus",
    variety: "'Cloni Hanoi'",
    price: 3.8,
    glyph: "ranunculus",
    colour: "#f2a48e",
    centre: "#c9573f",
    from: "Saltmarsh Flower Farm",
  },
  {
    id: "rose",
    name: "Garden rose",
    variety: "'Vendela'",
    price: 4.5,
    glyph: "rose",
    colour: "#f6ece3",
    centre: "#e3cbb8",
    from: "Copper Hill Roses",
  },
  {
    id: "tulip",
    name: "Tulip",
    variety: "'Columbus'",
    price: 2.6,
    glyph: "tulip",
    colour: "#c63e6c",
    centre: "#f3d4de",
    from: "Westmere Bulb Co.",
  },
  {
    id: "anemone",
    name: "Anemone",
    variety: "'Mistral Bianco'",
    price: 3.4,
    glyph: "anemone",
    colour: "#fbf8f4",
    centre: "#23262b",
    from: "Saltmarsh Flower Farm",
  },
  {
    id: "sweetpea",
    name: "Sweet pea",
    variety: "'Mollie Rilstone'",
    price: 2.2,
    glyph: "sweetpea",
    colour: "#e6b5d4",
    centre: "#b9759f",
    from: "Linden Park Allotments",
  },
  {
    id: "lisianthus",
    name: "Lisianthus",
    variety: "'Rosita Lavender'",
    price: 3.2,
    glyph: "lisianthus",
    colour: "#a98ccb",
    centre: "#6f5596",
    from: "Orchard Vale Growers",
  },
  {
    id: "eucalyptus",
    name: "Eucalyptus",
    variety: "Silver dollar",
    price: 1.8,
    glyph: "eucalyptus",
    colour: "#9db3a5",
    centre: "#6f8a79",
    from: "Copper Hill Roses",
  },
  {
    id: "waxflower",
    name: "Waxflower",
    variety: "'Snowflake'",
    price: 1.6,
    glyph: "waxflower",
    colour: "#f4e6ec",
    centre: "#c98aa3",
    from: "Orchard Vale Growers",
  },
];

export const wraps = [
  { id: "tissue", label: "Blush tissue", colour: "#f1d7d3", price: 0 },
  { id: "kraft", label: "Kraft paper", colour: "#c8a47a", price: 0 },
  { id: "lilac", label: "Lilac crepe", colour: "#d9cde6", price: 3 },
  { id: "linen", label: "Sage linen, keep it", colour: "#b7c3ad", price: 9 },
];

export const builder = {
  designFee: 12,
  minStems: 9,
  maxStems: 40,
  presets: [
    {
      label: "Soft and romantic",
      counts: {
        rose: 5,
        ranunculus: 4,
        sweetpea: 4,
        eucalyptus: 4,
        waxflower: 3,
      },
    },
    { label: "Spring market", counts: { tulip: 9, anemone: 4, eucalyptus: 3 } },
    {
      label: "Lilac evening",
      counts: { lisianthus: 6, sweetpea: 5, anemone: 3, eucalyptus: 4 },
    },
  ] as { label: string; counts: Record<string, number> }[],
};

/* ---------- Subscriptions ---------- */

export const plans = [
  {
    id: "jar",
    name: "The Kitchen Jar",
    price: 36,
    stems: "10–12 stems",
    description:
      "A jam-jar's worth of whatever is best at market. For the windowsill, the desk, the bathroom shelf.",
  },
  {
    id: "studio",
    name: "The Studio Bunch",
    price: 58,
    stems: "18–22 stems",
    description:
      "Our florists' weekly favourite, hand-tied and wrapped. The one most of our subscribers choose.",
  },
  {
    id: "grand",
    name: "The Grand Gesture",
    price: 94,
    stems: "30+ stems with branches",
    description:
      "Tall, branchy and dramatic, for a hallway, a restaurant counter or a long dining table.",
  },
];

export const frequencies = [
  { id: "weekly", label: "Weekly", every: "every Thursday", discount: 0.15 },
  {
    id: "fortnightly",
    label: "Fortnightly",
    every: "every other Thursday",
    discount: 0.1,
  },
  {
    id: "monthly",
    label: "Monthly",
    every: "on the first Thursday of the month",
    discount: 0,
  },
];

export const subscriptionCopy = {
  intro:
    "A bunch of what is good this week, delivered on Thursdays. Pause before a holiday, skip a week, change the size or cancel from one email. No contracts, no minimum term.",
  how: [
    {
      title: "Monday, at market",
      text: "We buy for subscribers first, before the shop, so you get the pick of the week.",
    },
    {
      title: "Wednesday, on the bench",
      text: "Every bunch is made by hand that afternoon and conditioned overnight in cold water.",
    },
    {
      title: "Thursday, at your door",
      text: "Delivered between 9 am and 5 pm with a care card telling you what is in it.",
    },
  ],
  faq: [
    {
      q: "Can I skip or pause?",
      a: "Yes. Reply to your Monday preview email before 6 pm and that week is skipped. You can pause for up to three months.",
    },
    {
      q: "Can I send a subscription as a gift?",
      a: "Yes. Choose a plan, and at checkout put the recipient's address and a card message. You will get the receipts, they get the flowers.",
    },
    {
      q: "What if I don't like a week's flowers?",
      a: "Tell us. We keep notes on every subscriber, so if you hate lilies, you will never see a lily from us again.",
    },
    {
      q: "How do I cancel?",
      a: "Email us any time before a Monday. There is no notice period and no cancellation fee.",
    },
  ],
};

/* ---------- Weddings & events ---------- */

export const weddings = {
  intro:
    "We take on twenty-four weddings a year so that each one gets the same three people from first meeting to last stem. Flowers for ceremonies, long tables, hair and lapels, and installations that people photograph before they sit down.",
  services: [
    {
      title: "Bridal and personal flowers",
      text: "Bouquets, buttonholes, flower crowns and corsages, designed around fabrics and the light of your season.",
      from: "from $340",
    },
    {
      title: "Ceremony",
      text: "Aisle meadows, arches and urns that we move to the reception afterwards, so nothing is used once.",
      from: "from $1,200",
    },
    {
      title: "Reception tables",
      text: "Long-table runners, bud vase clusters and candlelit low arrangements, sized so guests can still see each other.",
      from: "from $45 a table",
    },
    {
      title: "Installations",
      text: "Hanging clouds, plinth towers and staircase garlands, built on site the morning of.",
      from: "from $2,400",
    },
    {
      title: "Corporate and weekly",
      text: "Reception desks, restaurants and shop windows, refreshed every week or fortnight.",
      from: "from $120 a week",
    },
  ],
  stories: [
    {
      couple: "Imogen & Theo",
      venue: "The Old Glasshouse, Linden Park",
      month: "June",
      note: "Garden roses, sweet peas and astrantia in blush and claret.",
      image: images.bride,
    },
    {
      couple: "Priya & Sam",
      venue: "Kunsthalle Eastbank",
      month: "April",
      note: "Two four-metre plinth towers of spray roses and sweet peas.",
      image: images.installation,
    },
    {
      couple: "Harbour Supper Club",
      venue: "Pier 4, Harbourside",
      month: "September",
      note: "Forty metres of candlelit table, low jars of garden flowers.",
      image: images.longTable,
    },
  ],
  timeline: [
    {
      when: "9–12 months before",
      text: "A first conversation at the studio or by video. We talk about the day, not the flowers.",
    },
    {
      when: "6 months before",
      text: "A written proposal with mood images, a stem list and a fixed quote. A 25% deposit holds your date.",
    },
    {
      when: "8 weeks before",
      text: "A trial of the bridal bouquet and one table piece, in your colours, at the studio.",
    },
    {
      when: "The week of",
      text: "We buy at market on Monday, condition everything for three days, and arrive at dawn.",
    },
  ],
  budgets: [
    "Under $2,500",
    "$2,500 – $5,000",
    "$5,000 – $10,000",
    "Over $10,000",
    "Not sure yet",
  ],
  serviceOptions: [
    "Bridal & personal",
    "Ceremony",
    "Reception tables",
    "Installations",
    "Corporate / weekly",
  ],
};

/* ---------- Delivery ---------- */

export const zones = [
  {
    id: "A",
    name: "Zone A",
    areas: "Eastbank, Mill Quarter, Harbourside",
    districts: [1, 2, 3, 4],
    fee: 7,
    sameDay: true,
  },
  {
    id: "B",
    name: "Zone B",
    areas: "Northfield, Copper Hill, Saltmarsh",
    districts: [5, 6, 7, 8],
    fee: 11,
    sameDay: true,
  },
  {
    id: "C",
    name: "Zone C",
    areas: "Westmere, Linden Park, Orchard Vale",
    districts: [9, 10, 11, 12],
    fee: 15,
    sameDay: false,
  },
];

export const deliveryWindows = [
  { id: "day", label: "Any time, 9 am – 5 pm", price: 0 },
  { id: "morning", label: "Morning, 9 am – 12 pm", price: 5 },
  { id: "evening", label: "Evening, 5 pm – 8 pm", price: 8 },
];

export const deliveryFaq = [
  {
    q: "What is the cut-off for same-day delivery?",
    a: "1 pm, Monday to Saturday, for Zones A and B. Orders after 1 pm go out the next delivery day. Zone C is next-day only because our van does that loop first thing.",
  },
  {
    q: "Do you deliver on Sundays?",
    a: "No. The market is closed and so are we. Order on Saturday before 1 pm for a weekend delivery, or choose Monday.",
  },
  {
    q: "What if nobody is home?",
    a: "Our drivers leave flowers with a neighbour or in a safe, shaded spot you describe at checkout, and text a photo. If neither is possible we bring them back and redeliver free the next day.",
  },
  {
    q: "Will the bouquet look exactly like the photo?",
    a: "The shape, size and palette will. Individual stems follow the market, so if a variety is poor that week we substitute something of equal value and similar colour.",
  },
  {
    q: "Can I collect from the studio?",
    a: "Yes, free, from 10 am on the day you choose. We will text you when it is ready.",
  },
  {
    q: "My flowers arrived damaged. What now?",
    a: "Send a photo to hello@bloom.example within 24 hours and we will replace them or refund you, whichever you prefer.",
  },
];

export const care = [
  {
    title: "Trim and drink",
    text: "Cut 2 cm from every stem at an angle with sharp scissors, and put them straight into cool water.",
  },
  {
    title: "Find a good spot",
    text: "Away from radiators, sunny windows and the fruit bowl; ripening fruit gives off gas that ages flowers.",
  },
  {
    title: "Fresh water often",
    text: "Change the water every two days and pull out any leaves that slip below the water line.",
  },
];

/* ---------- People & story ---------- */

export const about = {
  intro:
    "Bloom started in 2016 as a bucket stall outside a bakery on Larkspur Row. Today it is a narrow studio in the same street, with a cold room, a long bench, five florists and a delivery van called Agnes.",
  story: [
    "Maren Holt trained as a garden designer and fell into floristry when a friend asked her to do the flowers for her wedding with three weeks' notice. She still arranges like a gardener: in season, a little loose, with things that look like they grew next to each other.",
    "We buy from small growers within ninety miles wherever we can, and from the city market for the rest. We do not use floral foam, we compost every stem we strip, and our wraps are paper and cotton, never plastic.",
  ],
  team: [
    {
      name: "Maren Holt",
      role: "Founder and head florist",
      note: "Has opinions about ranunculus. Does every wedding consultation herself.",
    },
    {
      name: "Joss Abara",
      role: "Events lead",
      note: "Builds the installations. Came to us from set design and still thinks in sight-lines.",
    },
    {
      name: "Wren Okafor",
      role: "Studio and subscriptions",
      note: "Runs the Monday market buy and knows every subscriber's least favourite flower.",
    },
  ],
  growers: [
    {
      name: "Saltmarsh Flower Farm",
      short: "Saltmarsh",
      grows: "Ranunculus, anemones, sweet peas",
      miles: 22,
    },
    {
      name: "Copper Hill Roses",
      short: "Copper Hill",
      grows: "Garden roses, eucalyptus",
      miles: 38,
    },
    {
      name: "Orchard Vale Growers",
      short: "Orchard Vale",
      grows: "Dahlias, lisianthus, waxflower",
      miles: 54,
    },
    {
      name: "Westmere Bulb Co.",
      short: "Westmere",
      grows: "Tulips, narcissi, hyacinths",
      miles: 71,
    },
    {
      name: "Linden Park Allotments",
      short: "Linden Park",
      grows: "Sweet peas, cosmos, herbs",
      miles: 4,
    },
  ],
  principles: [
    {
      title: "No floral foam",
      text: "Foam is single-use plastic that never breaks down. We use chicken wire, moss and kenzans instead.",
    },
    {
      title: "Seasonal first",
      text: "If it grows near here this month, it goes into the bouquet before anything that flew.",
    },
    {
      title: "Nothing wasted",
      text: "Leftover stems go to a care home on Fridays; trimmings go to the allotment compost.",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "I ordered at 12:40 for my mum's birthday and they were at her door by four, with a note that sounded like me on a good day.",
    name: "Hana R.",
    context: "The Daydream, Zone B",
  },
  {
    quote:
      "Maren noticed I'd mentioned my grandmother's sweet peas once in our first call. They were in my bouquet. I cried before the ceremony even started.",
    name: "Imogen L.",
    context: "Wedding at the Old Glasshouse",
  },
  {
    quote:
      "Two years of Thursday flowers and not one week I've wanted to skip.",
    name: "Dev P.",
    context: "Studio Bunch subscriber",
  },
];

/* ---------- Journal ---------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };
export type Post = {
  slug: string;
  title: string;
  date: string;
  category: "Care" | "Seasonal" | "Behind the bench" | "Weddings";
  readTime: string;
  image: Img;
  excerpt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "tulips-that-last",
    title: "How to make cut tulips last a week longer",
    date: "2026-10-09",
    category: "Care",
    readTime: "4 min",
    image: images.loveNote,
    excerpt:
      "Tulips are the flower people most often say 'died on me'. They didn't; they were thirsty, warm and leaning towards a window.",
    body: [
      {
        type: "p",
        text: "Tulips are the flower our customers most often say 'died on me' within a few days. Almost always, they didn't. They were thirsty, warm and leaning towards a window, which is exactly what tulips are built to do.",
      },
      { type: "h2", text: "Straighten them first" },
      {
        type: "p",
        text: "When tulips arrive limp, don't panic. Cut 2 cm off each stem, roll the whole bunch tightly in its paper so the heads are supported upright, and stand it in cold water for an hour. They will drink and straighten inside the paper.",
      },
      { type: "h2", text: "Less water, colder water" },
      {
        type: "p",
        text: "Tulips rot from the stem up in deep, warm water. Use a tall vase but only fill it a hand's width, with water straight from the cold tap. Top it up daily; they drink a surprising amount.",
      },
      {
        type: "list",
        items: [
          "Never mix fresh-cut narcissi with tulips: their sap clogs tulip stems.",
          "Prick a pin through the stem just below the head if one starts to droop.",
          "Pennies and aspirin are folklore; a clean vase does more.",
        ],
      },
      {
        type: "quote",
        text: "A tulip keeps growing after you cut it, sometimes by five centimetres. Let it. The way it bends is the best part.",
      },
      {
        type: "p",
        text: "Do all that and a bunch of good tulips will give you seven to ten days, changing shape every one of them.",
      },
    ],
  },
  {
    slug: "october-at-market",
    title: "What is on the bench in October",
    date: "2026-10-02",
    category: "Seasonal",
    readTime: "3 min",
    image: images.sunflowers,
    excerpt:
      "The last dahlias, the first southern peonies, rose hips everywhere, and why we are buying more dried strawflower than ever.",
    body: [
      {
        type: "p",
        text: "October is the month the market can't make up its mind. The last of the local dahlias are still coming in from Orchard Vale, a little smaller and a lot darker, while the first peonies from the southern hemisphere arrive in cool boxes.",
      },
      { type: "h2", text: "What we are buying" },
      {
        type: "list",
        items: [
          "Dahlias 'Café au Lait' and 'Rip City', until the first frost",
          "Rose hips and crab apple branches for texture",
          "Southern peonies 'Sarah Bernhardt' from mid-month",
          "The last sunflowers, small-headed and branching",
          "Strawflower and statice for drying",
        ],
      },
      {
        type: "p",
        text: "Sunflowers are almost done for the year. The ones we have now are the branching, smaller-headed kinds, which are honestly better in a bouquet than the dinner-plate ones.",
      },
      { type: "h2", text: "Why dried, and why now" },
      {
        type: "p",
        text: "We hang strawflowers in the back of the studio from September. They dry in about three weeks and keep their colour all winter, so the Everlasting bunches you see from November were growing in a field in August.",
      },
    ],
  },
  {
    slug: "the-hand-tied-spiral",
    title: "Behind the bench: the hand-tied spiral",
    date: "2026-09-21",
    category: "Behind the bench",
    readTime: "5 min",
    image: images.workbench,
    excerpt:
      "Every bouquet we make is spiralled in the hand, one stem at a time. It is why our builder draws your flowers in a spiral too.",
    body: [
      {
        type: "p",
        text: "Every bouquet that leaves the studio is spiralled in the hand. You hold the first stem, lay the next one across it at a slight angle, turn the bunch a quarter, and repeat, twenty or thirty times, until the stems fan out in a spiral below your hand.",
      },
      { type: "h2", text: "Why it matters" },
      {
        type: "p",
        text: "A spiral lets every stem reach the water, stops the bunch from crushing itself, and means the bouquet can stand on its own when you untie it. It also gives the dome its shape: each flower sits slightly further out than the last.",
      },
      {
        type: "quote",
        text: "If you can see the binding point clearly and the stems below it look like a twisted rope, the spiral is right.",
      },
      {
        type: "p",
        text: "Our bouquet builder draws your flowers top-down in the same spiral pattern, which is the closest a screen gets to looking down at the bench while we make it.",
      },
      { type: "h2", text: "Try it at home" },
      {
        type: "list",
        items: [
          "Strip every leaf from the lower two-thirds of each stem first.",
          "Start with your strongest, straightest stem.",
          "Add foliage every third or fourth flower so the blooms don't touch.",
          "Tie at the binding point with string, not an elastic band.",
        ],
      },
    ],
  },
  {
    slug: "winter-wedding-flowers",
    title: "Planning wedding flowers for a winter date",
    date: "2026-09-08",
    category: "Weddings",
    readTime: "6 min",
    image: images.longTable,
    excerpt:
      "Hellebores, amaryllis, anemones and a lot of candlelight. Why December weddings can look the most romantic of all.",
    body: [
      {
        type: "p",
        text: "Couples planning a winter wedding often apologise to us for the date, as if we'd only want to work in June. We love winter weddings. The palette is deeper, the candlelight does half the work, and the flowers that bloom in the cold are some of the most beautiful of the year.",
      },
      { type: "h2", text: "What grows in winter" },
      {
        type: "list",
        items: [
          "Hellebores, the Christmas rose, in plum, cream and speckled green",
          "Amaryllis in white and deep red, enormous on a long table",
          "Anemones with their black centres, from December onwards",
          "Ranunculus from late January",
          "Evergreens, pine, eucalyptus and dried grasses for structure",
        ],
      },
      { type: "h2", text: "Budgets go further" },
      {
        type: "p",
        text: "Fewer weddings in winter means growers have stems to spare and we have days to spare. You can often have installations in December that wouldn't fit the schedule in high summer.",
      },
      {
        type: "p",
        text: "If you are thinking about a winter date, send us an enquiry with a rough budget and venue. We'll reply within two working days with honest ideas.",
      },
    ],
  },
];

/* ---------- Home ---------- */

export const home = {
  headline: "Flowers gathered by hand this morning.",
  sub: "A small Eastbank studio for bouquets, subscriptions and wedding flowers. Order by 1 pm and we deliver across the city today.",
  believe: "We believe flowers don't need a reason. Just a place in your day.",
  believeSub:
    "Seasonal stems from growers within ninety miles, spiralled by hand, wrapped in paper and cotton, never plastic.",
  close: "For someone you love. That includes you.",
};
