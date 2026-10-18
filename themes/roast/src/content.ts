import roaster from "./assets/roaster.jpg";
import beans from "./assets/beans.jpg";
import cherries from "./assets/cherries.jpg";
import drying from "./assets/drying.jpg";
import cupping from "./assets/cupping.jpg";
import pourover from "./assets/pourover.jpg";
import press from "./assets/press.jpg";
import aeropress from "./assets/aeropress.jpg";
import moka from "./assets/moka.jpg";
import espresso from "./assets/espresso.jpg";
import cafe1 from "./assets/cafe-1.jpg";
import cafe2 from "./assets/cafe-2.jpg";
import cafe3 from "./assets/cafe-3.jpg";

export const brand = {
  name: "Roast",
  sector: "Coffee roastery",
  tagline: "Roasted on Monday and Thursday. In your cup by the weekend.",
  email: "hello@roast.example",
  phone: "+1 555 0142",
  phoneHref: "tel:+15550142",
  address: "18 Foundry Lane, Hollis",
  announcement: "Free shipping over $40 · Next roast ships Friday morning",
};

export const nav = [
  { to: "/shop", label: "Shop coffee" },
  { to: "/brew", label: "Brew guides" },
  { to: "/cafes", label: "Cafés" },
  { to: "/about", label: "Our story" },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All coffee" },
      { to: "/subscribe", label: "Subscriptions" },
      { to: "/cart", label: "Your bag" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/brew", label: "Brew guides" },
      { to: "/brew/v60", label: "Pour-over (V60)" },
      { to: "/brew/espresso", label: "Espresso at home" },
      { to: "/about", label: "Our story" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/cafes", label: "Cafés & hours" },
      { to: "/cafes", label: "Saturday roastery tours" },
      { to: "/", label: "Home" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ---------- Coffee ---------- */

export type Roast = "Light" | "Medium" | "Dark";
export type Kind = "Single origin" | "Blend" | "Decaf";
export type Process = "Washed" | "Natural" | "Honey" | "Wet-hulled";

export type Coffee = {
  id: string;
  name: string;
  nickname: string;
  kind: Kind;
  origin: string;
  region: string;
  producer: string;
  altitude: string;
  variety: string;
  process: Process;
  harvest: string;
  roast: Roast;
  /** Roast level 1 (lightest) to 5 (darkest), used for sorting and the roast scale. */
  level: number;
  notes: [string, string, string];
  blurb: string;
  story: string;
  color: string;
  price: number;
  priceKilo: number;
  /** Roast profile: drop time in minutes and drop (bean) temperature in °C. */
  profile: { drop: number; temp: number };
  brewWith: string[];
};

export const coffees: Coffee[] = [
  {
    id: "daybreak",
    name: "Daybreak",
    nickname: "The everyday one",
    kind: "Single origin",
    origin: "Colombia",
    region: "Huila",
    producer: "Asociación El Mirador, 38 families",
    altitude: "1,650–1,900 m",
    variety: "Caturra, Castillo",
    process: "Washed",
    harvest: "May 2026",
    roast: "Medium",
    level: 3,
    notes: ["Milk chocolate", "Caramel", "Orange"],
    blurb:
      "Round, sweet and ready before you are. The bag we drink most mornings.",
    story:
      "El Mirador is a co-op of 38 smallholder families on the slopes above Pitalito. They ferment in tile tanks for 30 hours and dry on covered beds, which gives this lot its clean caramel sweetness. We have bought from them for six harvests and pay $1.85 per pound above the commodity price.",
    color: "#f78b38",
    price: 18,
    priceKilo: 61,
    profile: { drop: 10.2, temp: 206 },
    brewWith: ["v60", "aeropress", "moka-pot"],
  },
  {
    id: "high-noon",
    name: "High Noon",
    nickname: "The bright one",
    kind: "Single origin",
    origin: "Ethiopia",
    region: "Guji, Hambela",
    producer: "Dimtu washing station, outgrowers",
    altitude: "2,000–2,200 m",
    variety: "Ethiopian landraces",
    process: "Natural",
    harvest: "January 2026",
    roast: "Light",
    level: 1,
    notes: ["Bergamot", "Peach", "Honey"],
    blurb:
      "A bright little detour from the usual. Floral, fruit-forward, full of good surprises.",
    story:
      "Whole cherries from around 400 outgrowers dry for 21 days on raised beds at Dimtu, turned by hand every hour in the afternoon heat. We roast it light and fast to keep the jasmine on top. It is wonderful as filter and surprisingly gentle as espresso.",
    color: "#dfc6e9",
    price: 22,
    priceKilo: 75,
    profile: { drop: 9.1, temp: 199 },
    brewWith: ["v60", "aeropress"],
  },
  {
    id: "night-shift",
    name: "Night Shift",
    nickname: "The slow one",
    kind: "Decaf",
    origin: "Brazil",
    region: "Cerrado Mineiro",
    producer: "Fazenda Boa Vista",
    altitude: "1,100 m",
    variety: "Yellow Catuaí",
    process: "Natural",
    harvest: "August 2025",
    roast: "Medium",
    level: 3,
    notes: ["Cocoa", "Hazelnut", "Brown sugar"],
    blurb:
      "All of the rich, unhurried goodness. None of the late-night staring at the ceiling.",
    story:
      "Decaffeinated with sugarcane ethyl acetate in Manizales, a gentle process that leaves the nutty sweetness intact. 99.9% caffeine free and roasted exactly like our regular coffees, because decaf drinkers deserve the good stuff too.",
    color: "#b9c7a6",
    price: 20,
    priceKilo: 68,
    profile: { drop: 10.6, temp: 208 },
    brewWith: ["french-press", "moka-pot", "espresso"],
  },
  {
    id: "field-day",
    name: "Field Day",
    nickname: "The juicy one",
    kind: "Single origin",
    origin: "Kenya",
    region: "Nyeri",
    producer: "Gatomboya factory, Barichu co-op",
    altitude: "1,700–1,800 m",
    variety: "SL28, SL34, Ruiru 11",
    process: "Washed",
    harvest: "December 2025",
    roast: "Light",
    level: 2,
    notes: ["Blackcurrant", "Grapefruit", "Cane sugar"],
    blurb:
      "Big, juicy and a little loud. The coffee that converts people to black filter.",
    story:
      "Kenyan double fermentation, a soak in clean river water and slow drying on raised tables gives Gatomboya its famous blackcurrant snap. Brew it a touch cooler, around 92°C, and let it cool in the cup: it only gets sweeter.",
    color: "#e8675a",
    price: 24,
    priceKilo: 82,
    profile: { drop: 9.4, temp: 201 },
    brewWith: ["v60", "aeropress"],
  },
  {
    id: "sunday-best",
    name: "Sunday Best",
    nickname: "The generous one",
    kind: "Single origin",
    origin: "Costa Rica",
    region: "West Valley",
    producer: "Finca La Lia, Rodríguez family",
    altitude: "1,500 m",
    variety: "Villa Sarchi",
    process: "Honey",
    harvest: "March 2026",
    roast: "Medium",
    level: 3,
    notes: ["Apricot", "Brown butter", "Almond"],
    blurb:
      "Soft stone fruit and a buttery finish. Made for a slow breakfast with people you like.",
    story:
      "Yellow honey process: the cherry skin is removed but some of the sticky fruit stays on the bean while it dries. Lia Rodríguez runs a micro-mill with her two sons and dries everything on raised beds in the shade of a mango tree.",
    color: "#f1cf5b",
    price: 21,
    priceKilo: 71,
    profile: { drop: 10.0, temp: 205 },
    brewWith: ["french-press", "v60", "aeropress"],
  },
  {
    id: "back-room",
    name: "Back Room",
    nickname: "The espresso one",
    kind: "Blend",
    origin: "Brazil & Guatemala",
    region: "Mogiana / Huehuetenango",
    producer: "Fazenda Santa Inês & Finca El Injerto Bajo",
    altitude: "1,150–1,700 m",
    variety: "Mundo Novo, Bourbon",
    process: "Washed",
    harvest: "2025–26",
    roast: "Dark",
    level: 4,
    notes: ["Cocoa nib", "Cherry", "Toffee"],
    blurb: "Our café espresso. Thick, syrupy and very good friends with milk.",
    story:
      "Sixty percent pulped natural Brazil for body, forty percent washed Guatemala for a cherry lift. We roast the two components separately and blend after resting, so each one gets the curve it needs. This is the espresso in all three of our cafés.",
    color: "#c98b6b",
    price: 19,
    priceKilo: 64,
    profile: { drop: 11.2, temp: 213 },
    brewWith: ["espresso", "moka-pot"],
  },
  {
    id: "low-tide",
    name: "Low Tide",
    nickname: "The deep one",
    kind: "Single origin",
    origin: "Indonesia",
    region: "Sumatra, Aceh",
    producer: "Ketiara women's co-op",
    altitude: "1,400–1,600 m",
    variety: "Ateng, Tim Tim",
    process: "Wet-hulled",
    harvest: "October 2025",
    roast: "Dark",
    level: 5,
    notes: ["Dark chocolate", "Cedar", "Molasses"],
    blurb: "Earthy, heavy and low in acidity. A rainy-afternoon coffee.",
    story:
      "Giling basah, the local wet-hulling method, removes the parchment while the bean is still damp. It is what gives Sumatran coffee its heavy body and cedar notes. Ketiara is led by Ibu Rahmah and pays a quality premium directly to its 1,100 members.",
    color: "#7f9cb0",
    price: 19,
    priceKilo: 64,
    profile: { drop: 11.6, temp: 216 },
    brewWith: ["french-press", "moka-pot"],
  },
  {
    id: "long-table",
    name: "Long Table",
    nickname: "The tea-like one",
    kind: "Single origin",
    origin: "Rwanda",
    region: "Nyamasheke",
    producer: "Kanzu washing station",
    altitude: "1,800–2,000 m",
    variety: "Red Bourbon",
    process: "Washed",
    harvest: "June 2026",
    roast: "Light",
    level: 2,
    notes: ["Red currant", "Black tea", "Honey"],
    blurb:
      "Delicate and quietly complex. Best brewed slowly and shared at the table.",
    story:
      "Kanzu sits on a ridge above Lake Kivu. Cherries are floated, hand-sorted and dry-fermented overnight before a 12-hour soak. The result is clean and tea-like with a red-fruit sparkle we chase every year.",
    color: "#a7c4c2",
    price: 23,
    priceKilo: 78,
    profile: { drop: 9.3, temp: 200 },
    brewWith: ["v60", "aeropress", "french-press"],
  },
];

export const roasts: Roast[] = ["Light", "Medium", "Dark"];
export const kinds: Kind[] = ["Single origin", "Blend", "Decaf"];
export const processes: Process[] = [
  "Washed",
  "Natural",
  "Honey",
  "Wet-hulled",
];
export const sizes = ["250 g", "1 kg"] as const;
export type Size = (typeof sizes)[number];
export const grinds = [
  "Whole bean",
  "Espresso",
  "Moka pot",
  "Filter",
  "French press",
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "roast-asc", label: "Roast, light to dark" },
  { value: "roast-desc", label: "Roast, dark to light" },
] as const;
export type SortValue = (typeof sortOptions)[number]["value"];

export const shop = {
  title: "All our coffee",
  intro:
    "Eight coffees, roasted twice a week in small batches and shipped the morning after. Every bag carries its roast date.",
};

export const product = {
  freshness:
    "Roasted to order on Monday or Thursday, shipped the next morning.",
  shipping:
    "Free shipping over $40. Standard $6 (2–3 days), express $12 (next day).",
  profileNote:
    "Bean temperature from our roast log. First crack is where the coffee starts to pop audibly; the time after it, development, decides sweetness versus brightness.",
};

/* ---------- Subscriptions ---------- */

export const roastersChoice = {
  id: "roasters-choice",
  name: "Roaster's Choice",
  color: "#e7b7c8",
  origin: "Rotating",
  price: 20,
  priceKilo: 68,
  blurb:
    "A different coffee each delivery, picked by Mara from what tastes best on the cupping table that week.",
};

export const subscription = {
  title: "Never run out of good coffee",
  intro:
    "Tell us how much you drink and we will roast for your rhythm. 10% off every bag, pause or skip any delivery, cancel in two clicks.",
  discount: 0.1,
  gramsPerCup: 15,
  sizes: [
    { grams: 250, label: "250 g", detail: "One bag" },
    { grams: 500, label: "500 g", detail: "Two bags" },
    { grams: 1000, label: "1 kg", detail: "One big bag" },
  ],
  frequencies: [1, 2, 3, 4],
  roastDays: [1, 4],
  faq: [
    {
      q: "When is my coffee roasted?",
      a: "We roast on Mondays and Thursdays. Your delivery is roasted on the roast day before it ships and leaves us the following morning, so it arrives four to seven days off roast: right in its sweet spot.",
    },
    {
      q: "Can I skip, pause or change my coffee?",
      a: "Yes, any time up to the Sunday or Wednesday before your roast day. Change the coffee, size, grind or rhythm from your account, or reply to any shipping email.",
    },
    {
      q: "How does Roaster's Choice work?",
      a: "Each delivery is a different coffee picked from that week's cupping. You get a card with the producer story and a suggested recipe. If you dislike something, tell us and we will never send it again.",
    },
    {
      q: "Is shipping included?",
      a: "Subscriptions follow our shop rates: free shipping on deliveries over $40, otherwise $6 standard. Every 1 kg plan ships free.",
    },
    {
      q: "How do I cancel?",
      a: "Two clicks from your account page, no phone call and no retention offers. Any delivery already roasted will still ship.",
    },
  ],
};

/* ---------- Brew guides ---------- */

export type Guide = {
  slug: string;
  name: string;
  method: string;
  image: string;
  imageAlt: string;
  time: string;
  /** Water grams per gram of coffee. */
  ratio: number;
  dose: number;
  grind: string;
  water: string;
  level: "Easy" | "Steady hand" | "Practice";
  intro: string;
  gear: string[];
  steps: { at: number; title: string; text: string }[];
  tip: string;
};

export const guides: Guide[] = [
  {
    slug: "v60",
    name: "Pour-over",
    method: "Hario V60",
    image: pourover,
    imageAlt: "A gooseneck kettle pouring water into a glass pour-over brewer",
    time: "3:30",
    ratio: 16,
    dose: 15,
    grind: "Medium-fine, like table salt",
    water: "94°C, just off the boil",
    level: "Steady hand",
    intro:
      "The cleanest, most transparent cup. Pour-over lets the fruit in a light roast speak, and it rewards a little patience.",
    gear: [
      "V60 dripper and paper filter",
      "Gooseneck kettle",
      "Scale with timer",
      "15 g coffee, 240 g water",
    ],
    steps: [
      {
        at: 0,
        title: "Bloom",
        text: "Pour 45 g of water to wet all the grounds. Swirl gently so nothing stays dry.",
      },
      {
        at: 45,
        title: "First pour",
        text: "Pour in slow spirals to 140 g. Keep the stream thin and avoid the paper.",
      },
      {
        at: 75,
        title: "Second pour",
        text: "Continue to 240 g, pouring in the centre. Give the dripper one gentle swirl.",
      },
      {
        at: 120,
        title: "Draw down",
        text: "Let it drain. The bed should be flat and the last drips should fall by 3:00.",
      },
      {
        at: 210,
        title: "Serve",
        text: "Remove the dripper, swirl the carafe and let it cool for a few minutes. It gets sweeter.",
      },
    ],
    tip: "If it drains in under 2:45, grind finer. If it stalls past 3:45, grind coarser.",
  },
  {
    slug: "french-press",
    name: "French press",
    method: "Cafetière",
    image: press,
    imageAlt: "A French press of coffee outdoors in warm evening light",
    time: "8:00",
    ratio: 15,
    dose: 30,
    grind: "Coarse, like sea salt",
    water: "96°C",
    level: "Easy",
    intro:
      "Full-bodied and forgiving. Our method waits longer than most, which gives a cleaner cup with almost no sludge.",
    gear: [
      "French press",
      "Kettle",
      "Spoon",
      "Scale",
      "30 g coffee, 450 g water",
    ],
    steps: [
      {
        at: 0,
        title: "Pour",
        text: "Add all 450 g of water at once, saturating every ground.",
      },
      {
        at: 30,
        title: "Wait",
        text: "Leave it alone. A crust forms on top while the coffee steeps.",
      },
      {
        at: 240,
        title: "Break the crust",
        text: "Stir the crust gently and scoop off the foam and floating bits.",
      },
      {
        at: 270,
        title: "Settle",
        text: "Put the lid on without plunging. Wait while the fines sink to the bottom.",
      },
      {
        at: 480,
        title: "Pour",
        text: "Press only to the surface, then pour slowly. Leave the last sip in the pot.",
      },
    ],
    tip: "The long settle is the trick. Plunging all the way stirs the silt back up.",
  },
  {
    slug: "aeropress",
    name: "AeroPress",
    method: "Inverted method",
    image: aeropress,
    imageAlt: "Hands pressing a clear AeroPress down into a glass",
    time: "2:30",
    ratio: 14,
    dose: 15,
    grind: "Medium, like caster sugar",
    water: "90°C",
    level: "Easy",
    intro:
      "Quick, clean and nearly impossible to ruin. It travels well and suits every coffee in our range.",
    gear: [
      "AeroPress with paper filter",
      "Kettle",
      "Scale",
      "15 g coffee, 210 g water",
    ],
    steps: [
      {
        at: 0,
        title: "Pour",
        text: "With the AeroPress inverted, pour 210 g of water over the grounds.",
      },
      {
        at: 10,
        title: "Stir",
        text: "Stir three times back and forth. Fit the cap with a rinsed filter.",
      },
      {
        at: 75,
        title: "Flip",
        text: "Carefully flip onto your mug. Steady it with both hands.",
      },
      {
        at: 90,
        title: "Press",
        text: "Press slowly for about 30 seconds. Stop when you hear the hiss.",
      },
      {
        at: 150,
        title: "Serve",
        text: "Drink as is, or top with 30 g of hot water for a longer cup.",
      },
    ],
    tip: "Lower water temperature tames bitterness; try 85°C with darker roasts.",
  },
  {
    slug: "moka-pot",
    name: "Moka pot",
    method: "Stovetop",
    image: moka,
    imageAlt: "An open moka pot with coffee bubbling up into the top chamber",
    time: "5:00",
    ratio: 7,
    dose: 18,
    grind: "Fine, a bit coarser than espresso",
    water: "Pre-boiled, off the heat",
    level: "Steady hand",
    intro:
      "Strong, sweet and nostalgic. Start with hot water and a low flame and the moka loses its bitter reputation.",
    gear: ["3-cup moka pot", "Kettle", "Towel", "18 g coffee, 130 g hot water"],
    steps: [
      {
        at: 0,
        title: "Fill",
        text: "Fill the base with just-boiled water to below the valve.",
      },
      {
        at: 30,
        title: "Assemble",
        text: "Fill the basket level without tamping. Screw the top on using a towel.",
      },
      {
        at: 60,
        title: "Heat",
        text: "Medium-low flame, lid open. Watch for the first honey-coloured stream.",
      },
      {
        at: 210,
        title: "Cut",
        text: "When it turns blond and starts to sputter, take it off and cool the base under a cold tap.",
      },
      {
        at: 300,
        title: "Serve",
        text: "Stir in the pot before pouring. Lovely with a splash of hot milk.",
      },
    ],
    tip: "Hot water in the base means less time on the flame, which means less burnt flavour.",
  },
  {
    slug: "espresso",
    name: "Espresso",
    method: "Home machine",
    image: espresso,
    imageAlt: "A double espresso pouring into two shot glasses",
    time: "0:30",
    ratio: 2,
    dose: 18,
    grind: "Fine, like powdered sugar",
    water: "93°C",
    level: "Practice",
    intro:
      "Our café recipe scaled for home: 18 g in, 36 g out, in about 30 seconds. Dial in and keep notes.",
    gear: [
      "Espresso machine",
      "Burr grinder",
      "Tamper",
      "Scale",
      "18 g coffee, 36 g yield",
    ],
    steps: [
      {
        at: 0,
        title: "Prep",
        text: "Dose 18 g, distribute evenly and tamp level. Flush the group head.",
      },
      {
        at: 5,
        title: "Pre-infuse",
        text: "Lock in and start the shot. The first drops should appear by 6–8 seconds.",
      },
      {
        at: 12,
        title: "Flow",
        text: "A steady mouse-tail stream, dark caramel in colour.",
      },
      {
        at: 25,
        title: "Watch",
        text: "As it blonds, get ready. Stop at 36 g on the scale.",
      },
      {
        at: 30,
        title: "Taste",
        text: "Sour? Grind finer. Bitter and dry? Grind coarser or stop earlier.",
      },
    ],
    tip: "Change one thing at a time. Grind is usually the right first move.",
  },
];

/* ---------- Cafés ---------- */

export type Cafe = {
  id: string;
  name: string;
  address: string;
  image: string;
  imageAlt: string;
  description: string;
  hours: { days: string; time: string }[];
  /** Opening times per weekday, Sunday = 0, as [open, close] hours; null = closed. */
  week: ([number, number] | null)[];
  extras: string[];
};

export const cafes: Cafe[] = [
  {
    id: "roastery",
    name: "The Roastery Bar",
    address: "18 Foundry Lane, Hollis",
    image: cafe1,
    imageAlt:
      "A bright café counter with pastries under glass and art on the walls",
    description:
      "Our roastery's front room. Watch the Monday and Thursday roasts through the glass, try every coffee on the bar and pick up beans warm from the cooling tray.",
    hours: [
      { days: "Mon–Fri", time: "7:00–16:00" },
      { days: "Sat", time: "8:00–17:00" },
      { days: "Sun", time: "Closed" },
    ],
    week: [null, [7, 16], [7, 16], [7, 16], [7, 16], [7, 16], [8, 17]],
    extras: [
      "Roastery tours Saturdays at 10:00",
      "Full filter flight",
      "Bike parking",
    ],
  },
  {
    id: "larch-street",
    name: "Larch Street",
    address: "214 Larch Street, Hollis",
    image: cafe2,
    imageAlt: "A long white coffee bar under globe lamps",
    description:
      "The neighbourhood one, with a long communal table, cardamom buns from Kettle & Crumb next door and a quiet back room with power sockets.",
    hours: [
      { days: "Mon–Fri", time: "7:30–18:00" },
      { days: "Sat–Sun", time: "8:30–17:00" },
    ],
    week: [
      [8.5, 17],
      [7.5, 18],
      [7.5, 18],
      [7.5, 18],
      [7.5, 18],
      [7.5, 18],
      [8.5, 17],
    ],
    extras: ["Brunch weekends", "Dogs welcome", "Step-free access"],
  },
  {
    id: "station",
    name: "Station Kiosk",
    address: "Platform 1, Hollis Central",
    image: cafe3,
    imageAlt: "Bar stools, plants and rattan lamps along a bright café counter",
    description:
      "A six-metre counter for commuters. Espresso, batch brew and beans to go, served in under two minutes. Bring a cup and get 30¢ off.",
    hours: [
      { days: "Mon–Fri", time: "6:00–19:30" },
      { days: "Sat", time: "7:00–14:00" },
      { days: "Sun", time: "Closed" },
    ],
    week: [
      null,
      [6, 19.5],
      [6, 19.5],
      [6, 19.5],
      [6, 19.5],
      [6, 19.5],
      [7, 14],
    ],
    extras: ["Order ahead by phone", "Reusable cup discount"],
  },
];

/** [7.5, 18] → "7:30–18:00" */
export function fmtHours([open, close]: [number, number]) {
  const t = (h: number) => `${Math.floor(h)}:${h % 1 ? "30" : "00"}`;
  return `${t(open)}–${t(close)}`;
}

export const barMenu = [
  { name: "Espresso", detail: "Back Room, double", price: 3 },
  { name: "Cortado", detail: "Equal parts milk", price: 3.8 },
  { name: "Flat white", detail: "Double shot, 180 ml", price: 4.2 },
  { name: "Filter of the day", detail: "Brewed to order, V60", price: 4.5 },
  { name: "Batch brew", detail: "Free refill before 9", price: 3 },
  { name: "Cold brew", detail: "18-hour steep, Sunday Best", price: 4.5 },
  { name: "Hot chocolate", detail: "70% single-estate", price: 4 },
  { name: "Cardamom bun", detail: "From Kettle & Crumb", price: 3.8 },
];

/* ---------- Story ---------- */

export const team = [
  {
    name: "Mara Okafor",
    role: "Founder & head roaster",
    note: "Roasted her first batch in a popcorn machine in 2011.",
  },
  {
    name: "Teo Lindqvist",
    role: "Green coffee buyer",
    note: "Spends four months a year at origin.",
  },
  {
    name: "June Park",
    role: "Quality & cupping",
    note: "Tastes around 600 cups a week, spits most of them.",
  },
  {
    name: "Sam Reyes",
    role: "Cafés lead",
    note: "Trains every barista on our bar recipe.",
  },
  {
    name: "Ines Duarte",
    role: "Subscriptions & shipping",
    note: "Packs your bag, answers your email.",
  },
];

export const timeline = [
  {
    year: "2014",
    text: "Mara starts roasting on a 1 kg drum in a shared garage on Foundry Lane.",
  },
  {
    year: "2016",
    text: "First direct purchase: 12 bags from El Mirador in Huila. We still buy from them.",
  },
  {
    year: "2018",
    text: "Larch Street opens. The cardamom bun partnership begins on day one.",
  },
  {
    year: "2021",
    text: "We move into the old foundry and install a 15 kg roaster running on renewable power.",
  },
  {
    year: "2024",
    text: "Station Kiosk opens on Platform 1. Subscriptions pass 2,000 households.",
  },
  {
    year: "2026",
    text: "Every coffee we sell is bought directly, with prices published on the bag.",
  },
];

export const principles = [
  {
    title: "We publish what we pay",
    text: "Every bag lists the price per pound we paid the producer. On average this year: $4.10 FOB, more than double the commodity price.",
  },
  {
    title: "Roasted to order, twice a week",
    text: "No warehouse of stale bags. We roast Monday and Thursday to your orders and ship the next morning.",
  },
  {
    title: "Fewer coffees, longer relationships",
    text: "Eight coffees at a time, from producers we return to year after year. Five of them we have bought for four harvests or more.",
  },
];

export const quotes = [
  {
    text: "The roast date on the bag is never more than three days old when it lands on my doormat. That alone ruined supermarket coffee for me.",
    who: "Priya N., subscriber since 2022",
  },
  {
    text: "Field Day made my partner drink black coffee. I did not think that was possible.",
    who: "Owen T., Roaster's Choice subscriber",
  },
];

export const images = {
  roaster: {
    src: roaster,
    alt: "A drum roaster releasing freshly roasted beans into its cooling tray",
  },
  beans: {
    src: beans,
    alt: "A close view of dark, glossy roasted coffee beans",
  },
  cherries: { src: cherries, alt: "Ripe red coffee cherries on the branch" },
  drying: { src: drying, alt: "Coffee drying on raised beds at a farm" },
  cupping: {
    src: cupping,
    alt: "Two cupping spoons resting in a tasting bowl",
  },
};

export const home = {
  shelfTitle: "On the roaster this week",
  scaleTitle: "From bright to brooding",
  scaleText:
    "Every coffee we roast, placed on one scale. Lighter roasts taste of the farm; darker roasts taste of the roaster.",
  weekTitle: "Two roast days, no warehouse",
  brewTitle: "Brew it well",
  cafesTitle: "Three places to drink it",
  heroTitle: "Roasted on Monday.\nIn your cup by Friday.",
  heroText:
    "Eight coffees bought directly from the farms that grow them, roasted in small batches in Hollis and shipped the morning after.",
  roastWeek:
    "We roast on Mondays and Thursdays, only what was ordered. Order by Sunday night and your coffee is roasted Monday, packed Tuesday and brewing by Friday.",
  subscriptionTitle: "Coffee on your rhythm",
  subscriptionText:
    "Tell us how many cups you drink and we will work out the size and the rhythm. 10% off every bag, skip or pause whenever you like.",
  sourcingTitle: "We know every farm by name",
  sourcingText:
    "Teo spends four months a year at origin. We buy from the same co-ops and families season after season and print what we paid on every bag.",
  closeTitle: "Your next bag is roasted on Monday",
  closeText: "Order before Sunday at midnight and it ships Tuesday morning.",
};

export const about = {
  title: "Our story",
  lead: "Roast started in a garage on Foundry Lane in 2014 with a 1 kg drum, a fire extinguisher and a stubborn idea: coffee should be fresh, traceable and fun to drink.",
  body: [
    "Twelve years later we roast around 900 kg a week on a 15 kg machine in the old Hollis foundry, a few metres from where it all began. The machine runs on renewable power and the chaff goes to the community garden behind the building.",
    "We are fourteen people: roasters, baristas, a green buyer, a cupper and the person who packs your bag. We keep the range small on purpose. Eight coffees means we can know each one, and each farm, properly.",
  ],
  principlesTitle: "Three things we will not compromise on",
  timelineTitle: "Twelve years on Foundry Lane",
  teamTitle: "Who roasts your coffee",
  closeTitle: "Come and see the roaster",
  closeText: "Saturday tours at 10:00, cupping included.",
};

export const checkout = {
  title: "Checkout",
  note: "This is a demo shop: nothing is sent, charged or shipped.",
  countries: [
    "United States",
    "Canada",
    "United Kingdom",
    "Ireland",
    "Australia",
    "New Zealand",
  ],
  delivery: [
    {
      id: "standard",
      label: "Standard",
      detail: "2–3 days after roasting",
      price: 6,
    },
    {
      id: "express",
      label: "Express",
      detail: "Next day after roasting",
      price: 12,
    },
    {
      id: "pickup",
      label: "Pick up at The Roastery Bar",
      detail: "Ready the afternoon of roast day",
      price: 0,
    },
  ],
  freeOver: 40,
};

export const newsletter = {
  title: "The roast log",
  text: "One email a fortnight: what is on the roaster, new arrivals and a recipe. No noise.",
};

export const notFound = {
  title: "This page went stale",
  text: "We could not find what you were looking for. Maybe it sold out, or the link was mistyped.",
};

export const brew = {
  title: "Brew guides",
  intro:
    "Five methods, each written the way we brew them on our own bar, with a timer to follow along. Pick the brewer you have.",
  basicsTitle: "Four habits that matter more than gear",
  basics: [
    {
      title: "Weigh, don't scoop",
      text: "A scale is the cheapest upgrade in coffee. Spoons vary by 30%; grams do not.",
    },
    {
      title: "Grind just before",
      text: "Ground coffee loses most of its aroma within fifteen minutes. Whole bean and a burr grinder win.",
    },
    {
      title: "Mind the water",
      text: "Coffee is 98% water. Filtered, soft water just off the boil brings out sweetness.",
    },
    {
      title: "Change one thing",
      text: "Too sour, grind finer. Too bitter, grind coarser. Adjust one variable per brew and taste.",
    },
  ],
};

export const roastWeek = [
  { day: "Mon", event: "Roast", detail: "Order by Sun, midnight" },
  { day: "Tue", event: "Ships", detail: "Leaves 9:00" },
  { day: "Wed", event: "", detail: "" },
  { day: "Thu", event: "Roast", detail: "Order by Wed, midnight" },
  { day: "Fri", event: "Ships", detail: "Leaves 9:00" },
  { day: "Sat", event: "Tours", detail: "Roastery 10:00" },
  { day: "Sun", event: "", detail: "" },
];

export const cafesPage = {
  title: "Cafés",
  intro:
    "Three bars in Hollis, all pouring the same coffee we ship. Every one sells beans roasted that week.",
  menuTitle: "On the bar",
  menuNote:
    "Oat, almond and whole milk at no extra cost. Prices the same at every café.",
  toursTitle: "Saturday roastery tours",
  toursText:
    "Every Saturday at 10:00 Mara or June walks up to ten people through green coffee, the roast and a cupping of three coffees. 75 minutes, $18 including a 250 g bag. Book at the Roastery Bar or call us.",
};
