import heroSrc from "./assets/hero.jpg";
import crustSrc from "./assets/crust.jpg";
import griddleSrc from "./assets/griddle.jpg";
import pressSrc from "./assets/press.jpg";
import chickenSrc from "./assets/chicken.jpg";
import chickenSlawSrc from "./assets/chicken-slaw.jpg";
import shakeChocolateSrc from "./assets/shake-chocolate.jpg";
import shakeVanillaSrc from "./assets/shake-vanilla.jpg";
import friesSrc from "./assets/fries.jpg";
import ringsSrc from "./assets/rings.jpg";
import backyardSrc from "./assets/backyard.jpg";
import deluxeSrc from "./assets/deluxe.jpg";
import neonSrc from "./assets/neon.jpg";
import diningSrc from "./assets/dining.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Smash",
  sector: "Burger joint",
  tagline: "Smashed thin. Stacked tall. Ready in twelve.",
  email: "hello@smash.example",
  cateringEmail: "catering@smash.example",
  phone: "+1 555 0100 220",
  phoneHref: "tel:+15550100220",
  founded: 2016,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/menu", label: "Menu" },
  { to: "/locations", label: "Locations" },
  { to: "/catering", label: "Catering" },
  { to: "/merch", label: "Merch" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Eat",
    links: [
      { to: "/menu", label: "Full menu" },
      { to: "/menu/the-build", label: "Build your own" },
      { to: "/order", label: "Your order" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/locations", label: "All locations" },
      { to: "/locations/eastside", label: "Eastside" },
      { to: "/locations/market-hall", label: "Market Hall" },
      { to: "/locations/northgate", label: "Northgate" },
      { to: "/locations/the-truck", label: "The Truck" },
    ],
  },
  {
    title: "Smash",
    links: [
      { to: "/about", label: "Our story" },
      { to: "/catering", label: "Catering" },
      { to: "/merch", label: "Merch" },
    ],
  },
];

/* ----------------------------------------------------------------- images */

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  hero: {
    src: heroSrc,
    alt: "A double smash cheeseburger held in one hand, American cheese melting down the lacy patty edges",
    w: 1024,
    h: 768,
  },
  crust: {
    src: crustSrc,
    alt: "A single smash burger seen from above on red checked deli paper, the bun toasted dark on the flat-top",
    w: 1100,
    h: 1100,
  },
  griddle: {
    src: griddleSrc,
    alt: "Patties searing on a steel flat-top next to buns toasting face down",
    w: 1024,
    h: 683,
  },
  press: {
    src: pressSrc,
    alt: "Hands rolling fresh ground beef into balls beside a hot pan",
    w: 1024,
    h: 683,
  },
  chicken: {
    src: chickenSrc,
    alt: "A fried chicken thigh sandwich with shredded cabbage on a potato bun, on blue checked paper",
    w: 1024,
    h: 768,
  },
  chickenSlaw: {
    src: chickenSlawSrc,
    alt: "A fried chicken sandwich piled with red cabbage slaw on a sesame bun",
    w: 768,
    h: 1024,
  },
  shakeChocolate: {
    src: shakeChocolateSrc,
    alt: "A chocolate malt in a fluted glass with whipped cream, toasted pecans and a cherry",
    w: 1200,
    h: 1600,
  },
  shakeVanilla: {
    src: shakeVanillaSrc,
    alt: "A vanilla shake with whipped cream, a cherry and a red straw on the counter",
    w: 768,
    h: 1024,
  },
  fries: {
    src: friesSrc,
    alt: "Thick-cut fries in a black enamel pan lined with paper",
    w: 970,
    h: 960,
  },
  rings: {
    src: ringsSrc,
    alt: "A tall tower of battered onion rings on a skewer",
    w: 427,
    h: 1000,
  },
  backyard: {
    src: backyardSrc,
    alt: "A cheddar double with lettuce and fries on a paper plate at an outdoor table",
    w: 1024,
    h: 768,
  },
  deluxe: {
    src: deluxeSrc,
    alt: "A burger stacked with greens and crispy shallots beside a tray of seasoned fries",
    w: 1600,
    h: 1104,
  },
  neon: {
    src: neonSrc,
    alt: "A red neon OPEN sign glowing in a window at night",
    w: 1024,
    h: 698,
  },
  dining: {
    src: diningSrc,
    alt: "A bright counter-service dining room with long wooden tables and the open kitchen behind",
    w: 1024,
    h: 768,
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------- menu */

export type CategoryId = "burgers" | "chicken" | "sides" | "shakes" | "drinks";

export const categories: { id: CategoryId; label: string; note: string }[] = [
  {
    id: "burgers",
    label: "Burgers",
    note: "Chuck and brisket ground every morning, smashed to order on 450° steel.",
  },
  {
    id: "chicken",
    label: "Chicken",
    note: "Boneless thighs, buttermilk brined overnight, fried twice.",
  },
  {
    id: "sides",
    label: "Sides",
    note: "Hand-cut daily. Dips are extra, and worth it.",
  },
  {
    id: "shakes",
    label: "Shakes",
    note: "Real ice cream from Ridgeline Creamery, spun thick.",
  },
  {
    id: "drinks",
    label: "Drinks",
    note: "Squeezed, brewed or drawn on draft. Free refills at the counter.",
  },
];

export type Tag = "veg" | "spicy" | "gf" | "new";

export const tagLabels: Record<Tag, string> = {
  veg: "Vegetarian",
  spicy: "Spicy",
  gf: "Gluten-free",
  new: "New",
};

/** One choice in an option group. `layer` is what the Stack draws; `count` repeats the protein. */
export type Choice = {
  id: string;
  label: string;
  price?: number;
  kcal?: number;
  layer?: string;
  count?: number;
};

export type OptionGroup = {
  id: string;
  label: string;
  hint: string;
  type: "one" | "many";
  max?: number;
  choices: Choice[];
};

export const optionGroups: Record<string, OptionGroup> = {
  protein: {
    id: "protein",
    label: "Patty",
    hint: "Pick one",
    type: "one",
    choices: [
      { id: "beef", label: "Beef — chuck & brisket", layer: "patty" },
      {
        id: "plant",
        label: "Plant — black bean & mushroom",
        layer: "plant",
        kcal: -60,
      },
    ],
  },
  patties: {
    id: "patties",
    label: "How many",
    hint: "Each one smashed separately",
    type: "one",
    choices: [
      { id: "single", label: "Single", count: 1 },
      { id: "double", label: "Double", count: 2, price: 2.75, kcal: 250 },
      { id: "triple", label: "Triple", count: 3, price: 5.25, kcal: 500 },
      { id: "quad", label: "Quad", count: 4, price: 7.5, kcal: 750 },
    ],
  },
  cheese: {
    id: "cheese",
    label: "Cheese",
    hint: "One slice per patty",
    type: "one",
    choices: [
      { id: "american", label: "American", layer: "cheese-american", kcal: 70 },
      {
        id: "cheddar",
        label: "Sharp cheddar",
        layer: "cheese-cheddar",
        price: 0.5,
        kcal: 80,
      },
      {
        id: "jack",
        label: "Pepper jack",
        layer: "cheese-jack",
        price: 0.5,
        kcal: 80,
      },
      { id: "none", label: "No cheese" },
    ],
  },
  heat: {
    id: "heat",
    label: "Heat",
    hint: "Cayenne oil, brushed on after the fryer",
    type: "one",
    choices: [
      { id: "plain", label: "Plain", layer: "chicken" },
      { id: "mild", label: "Mild", layer: "chicken-mild" },
      { id: "hot", label: "Hot", layer: "chicken-hot" },
      {
        id: "scorched",
        label: "Scorched — sign the napkin",
        layer: "chicken-scorched",
      },
    ],
  },
  toppings: {
    id: "toppings",
    label: "Toppings",
    hint: "As many as you like",
    type: "many",
    choices: [
      { id: "pickles", label: "Dill pickles", layer: "pickles", kcal: 5 },
      { id: "onion", label: "Shaved white onion", layer: "onion", kcal: 10 },
      {
        id: "griddled-onion",
        label: "Griddled onion",
        layer: "griddled-onion",
        price: 0.75,
        kcal: 40,
      },
      { id: "lettuce", label: "Shredded iceberg", layer: "lettuce", kcal: 5 },
      { id: "tomato", label: "Tomato", layer: "tomato", price: 0.5, kcal: 10 },
      {
        id: "jalapeno",
        label: "Pickled jalapeños",
        layer: "jalapeno",
        price: 0.5,
        kcal: 5,
      },
      {
        id: "slaw",
        label: "Red cabbage slaw",
        layer: "slaw",
        price: 0.75,
        kcal: 60,
      },
      {
        id: "bacon",
        label: "Thick-cut bacon",
        layer: "bacon",
        price: 2.25,
        kcal: 140,
      },
    ],
  },
  sauce: {
    id: "sauce",
    label: "Sauce",
    hint: "Up to two",
    type: "many",
    max: 2,
    choices: [
      { id: "smash", label: "Smash sauce", layer: "sauce-smash", kcal: 90 },
      { id: "ketchup", label: "Ketchup", layer: "sauce-ketchup", kcal: 20 },
      {
        id: "mustard",
        label: "Yellow mustard",
        layer: "sauce-mustard",
        kcal: 5,
      },
      { id: "mayo", label: "Kewpie mayo", layer: "sauce-mayo", kcal: 100 },
      {
        id: "hot-honey",
        label: "Hot honey",
        layer: "sauce-honey",
        price: 0.5,
        kcal: 60,
      },
    ],
  },
  bun: {
    id: "bun",
    label: "Bun",
    hint: "Toasted in beef fat unless it's a wrap",
    type: "one",
    choices: [
      { id: "potato", label: "Potato bun", layer: "potato" },
      { id: "sesame", label: "Sesame bun", layer: "sesame", kcal: 20 },
      {
        id: "gf",
        label: "Gluten-free bun",
        layer: "gf",
        price: 1.5,
        kcal: -20,
      },
      {
        id: "lettuce-wrap",
        label: "Lettuce wrap",
        layer: "lettuce-wrap",
        kcal: -210,
      },
    ],
  },
  sideSize: {
    id: "sideSize",
    label: "Size",
    hint: "Large feeds two, honestly",
    type: "one",
    choices: [
      { id: "regular", label: "Regular" },
      { id: "large", label: "Large", price: 1.75, kcal: 180 },
    ],
  },
  dips: {
    id: "dips",
    label: "Dips",
    hint: "Up to three",
    type: "many",
    max: 3,
    choices: [
      { id: "smash", label: "Smash sauce", price: 0.75, kcal: 90 },
      { id: "honey-mayo", label: "Hot honey mayo", price: 0.75, kcal: 110 },
      { id: "ranch", label: "Buttermilk ranch", price: 0.75, kcal: 100 },
      { id: "cheese-sauce", label: "Cheese sauce", price: 1.25, kcal: 120 },
    ],
  },
  shakeSize: {
    id: "shakeSize",
    label: "Size",
    hint: "Served with a spoon and a straw",
    type: "one",
    choices: [
      { id: "12oz", label: "12 oz" },
      { id: "16oz", label: "16 oz", price: 1.5, kcal: 220 },
    ],
  },
  shakeExtras: {
    id: "shakeExtras",
    label: "Extras",
    hint: "Optional",
    type: "many",
    choices: [
      { id: "malt", label: "Malt powder", price: 0.5, kcal: 40 },
      { id: "whip", label: "Whipped cream & cherry", price: 0.75, kcal: 80 },
      { id: "pecans", label: "Toasted pecans", price: 1, kcal: 110 },
      { id: "espresso", label: "Espresso shot", price: 1.25, kcal: 5 },
    ],
  },
  drinkSize: {
    id: "drinkSize",
    label: "Size",
    hint: "Refills are free at the counter",
    type: "one",
    choices: [
      { id: "16oz", label: "16 oz" },
      { id: "24oz", label: "24 oz", price: 1, kcal: 60 },
    ],
  },
};

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  /** Price before any priced option; the shown price includes the defaults. */
  price: number;
  /** Calories before any option that carries kcal. */
  kcal: number;
  blurb: string;
  description: string;
  image?: Img;
  /** Burgers and chicken draw a live stack; this is the protein when no group picks one. */
  stack?: "patty" | "chicken";
  tags: Tag[];
  /** Option groups shown, in order, with their default choice ids. */
  options: Record<string, string[]>;
  allergens: string[];
  pairs: string[];
  /** Lower is more ordered; drives "Most ordered" sort. */
  rank: number;
};

export const menu: MenuItem[] = [
  {
    id: "the-smash",
    name: "The Smash",
    category: "burgers",
    price: 8.25,
    kcal: 430,
    blurb: "Two patties, American, pickles, shaved onion, Smash sauce.",
    description:
      "The one we opened with in 2016 and the one most of you order. Two 3-oz balls of chuck and brisket, smashed hard for thirty seconds until the edges go lacy, a slice of American melted over each, then pickles, paper-thin white onion and Smash sauce on a potato bun toasted in the beef fat.",
    image: images.hero,
    stack: "patty",
    tags: [],
    options: {
      protein: ["beef"],
      patties: ["double"],
      cheese: ["american"],
      toppings: ["pickles", "onion"],
      sauce: ["smash"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Soy", "Mustard"],
    pairs: ["fries", "chocolate-malt", "root-beer"],
    rank: 1,
  },
  {
    id: "single",
    name: "Single Smash",
    category: "burgers",
    price: 8.25,
    kcal: 430,
    blurb: "One patty, American, pickles, onion, Smash sauce.",
    description:
      "Everything The Smash has, one patty lighter. The ratio of crust to bun is at its most honest here, which is why the grill crew eats this one on break.",
    image: images.crust,
    stack: "patty",
    tags: [],
    options: {
      protein: ["beef"],
      patties: ["single"],
      cheese: ["american"],
      toppings: ["pickles", "onion"],
      sauce: ["smash"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Soy", "Mustard"],
    pairs: ["fries", "vanilla", "lemonade"],
    rank: 4,
  },
  {
    id: "okie-onion",
    name: "Okie Onion",
    category: "burgers",
    price: 8.25,
    kcal: 430,
    blurb: "Onions smashed into the patty, American, mustard, pickles.",
    description:
      "A fistful of shaved onion goes on the ball before the press comes down, so it fries into the beef instead of sitting on top. Yellow mustard and pickles keep it sharp. A nod to the Oklahoma diners that did this first.",
    image: images.griddle,
    stack: "patty",
    tags: [],
    options: {
      protein: ["beef"],
      patties: ["double"],
      cheese: ["american"],
      toppings: ["griddled-onion", "pickles"],
      sauce: ["mustard"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Soy", "Mustard"],
    pairs: ["rings", "root-beer"],
    rank: 5,
  },
  {
    id: "backyard",
    name: "The Backyard",
    category: "burgers",
    price: 8.75,
    kcal: 430,
    blurb: "Cheddar double, iceberg, tomato, onion, mayo and ketchup.",
    description:
      "The cookout burger, done on steel. Sharp cheddar, cold shredded iceberg, a thick tomato slice, raw onion, then mayo on the bottom and ketchup on the top like your uncle insists. Sesame bun.",
    image: images.backyard,
    stack: "patty",
    tags: [],
    options: {
      protein: ["beef"],
      patties: ["double"],
      cheese: ["cheddar"],
      toppings: ["lettuce", "tomato", "onion", "pickles"],
      sauce: ["mayo", "ketchup"],
      bun: ["sesame"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Sesame"],
    pairs: ["fries", "lemonade"],
    rank: 3,
  },
  {
    id: "green-flash",
    name: "Green Flash",
    category: "burgers",
    price: 8.75,
    kcal: 430,
    blurb: "Pepper jack double, iceberg, jalapeños, hot honey.",
    description:
      "Pepper jack, pickled jalapeños and a drizzle of chili-steeped honey, cooled down with a pile of shredded iceberg. Sweet first, then the heat walks in.",
    image: images.deluxe,
    stack: "patty",
    tags: ["spicy"],
    options: {
      protein: ["beef"],
      patties: ["double"],
      cheese: ["jack"],
      toppings: ["lettuce", "jalapeno"],
      sauce: ["hot-honey"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk"],
    pairs: ["vanilla", "fried-pickles"],
    rank: 7,
  },
  {
    id: "night-shift",
    name: "Night Shift",
    category: "burgers",
    price: 8.25,
    kcal: 430,
    blurb: "Bacon double, griddled onion, American, Smash sauce.",
    description:
      "What the kitchen makes itself at close. Thick-cut bacon crisped on the flat-top, onions cooked down in the drippings, two slices of American and a heavy hand of Smash sauce.",
    stack: "patty",
    tags: ["new"],
    options: {
      protein: ["beef"],
      patties: ["double"],
      cheese: ["american"],
      toppings: ["griddled-onion", "bacon"],
      sauce: ["smash"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Soy", "Mustard"],
    pairs: ["dirty-fries", "chocolate-malt"],
    rank: 6,
  },
  {
    id: "plant-smash",
    name: "Plant Smash",
    category: "burgers",
    price: 9.0,
    kcal: 400,
    blurb: "Black bean & mushroom patties, American, pickles, onion.",
    description:
      "Our own patty of black beans, roasted mushrooms and toasted oats, made in-house and smashed on a separate plate of the griddle so it crusts properly. Swap the cheese off and the sauce to mustard to make it vegan.",
    stack: "patty",
    tags: ["veg"],
    options: {
      protein: ["plant"],
      patties: ["double"],
      cheese: ["american"],
      toppings: ["pickles", "onion"],
      sauce: ["smash"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Soy", "Mustard"],
    pairs: ["fries", "lemonade"],
    rank: 8,
  },
  {
    id: "the-build",
    name: "Build Your Own",
    category: "burgers",
    price: 7.25,
    kcal: 430,
    blurb: "Start with one patty and a bun. The rest is up to you.",
    description:
      "One smashed patty on a potato bun, and every lever on the board. Stack up to four patties, pick a cheese, pile on toppings, choose two sauces. The picture updates as you go, so you can see what you are about to eat.",
    stack: "patty",
    tags: [],
    options: {
      protein: ["beef"],
      patties: ["single"],
      cheese: ["none"],
      toppings: [],
      sauce: [],
      bun: ["potato"],
    },
    allergens: [
      "Wheat — unless you choose the lettuce wrap or gluten-free bun",
    ],
    pairs: ["fries", "rings", "vanilla"],
    rank: 2,
  },
  {
    id: "scorched-bird",
    name: "Scorched Bird",
    category: "chicken",
    price: 10.25,
    kcal: 560,
    blurb: "Hot fried thigh, iceberg, pickles, Kewpie mayo.",
    description:
      "A whole boneless thigh, brined in buttermilk overnight, dredged twice and fried until it shatters. Brushed with cayenne oil to the heat you pick, then cooled with iceberg, pickles and Kewpie mayo.",
    image: images.chicken,
    stack: "chicken",
    tags: ["spicy"],
    options: {
      heat: ["hot"],
      toppings: ["lettuce", "pickles"],
      sauce: ["mayo"],
      bun: ["potato"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Soy"],
    pairs: ["fries", "lemonade"],
    rank: 9,
  },
  {
    id: "the-coop",
    name: "The Coop",
    category: "chicken",
    price: 10.25,
    kcal: 560,
    blurb: "Fried thigh, red cabbage slaw, pickles, hot honey.",
    description:
      "The same thigh, left plain and piled with a vinegary red cabbage slaw and a drizzle of hot honey. Sweet, sour, crunchy and only a little bit dangerous. Sesame bun.",
    image: images.chickenSlaw,
    stack: "chicken",
    tags: [],
    options: {
      heat: ["plain"],
      toppings: ["slaw", "pickles"],
      sauce: ["hot-honey"],
      bun: ["sesame"],
    },
    allergens: ["Wheat", "Milk", "Egg", "Sesame"],
    pairs: ["rings", "iced-tea"],
    rank: 10,
  },
  {
    id: "fries",
    name: "Double-Fried Fries",
    category: "sides",
    price: 4.25,
    kcal: 420,
    blurb: "Hand-cut Kennebecs, blanched then fried hard. Sea salt.",
    description:
      "Kennebec potatoes cut every morning, soaked, blanched at 300° and fried again at 375° to order. Thick enough to hold a dip, crisp enough to hear. Salted while they are still loud.",
    image: images.fries,
    tags: ["veg", "gf"],
    options: { sideSize: ["regular"], dips: [] },
    allergens: ["None — cooked in a dedicated fryer"],
    pairs: ["the-smash", "chocolate-malt"],
    rank: 1,
  },
  {
    id: "rings",
    name: "Onion Ring Tower",
    category: "sides",
    price: 5.75,
    kcal: 540,
    blurb: "Sweet onions in a lager batter, stacked on a skewer.",
    description:
      "Thick Walla Walla rings dipped in a light lager batter and fried until bronze, then stacked high on a skewer so nothing goes soggy. Pull from the top.",
    image: images.rings,
    tags: ["veg"],
    options: { sideSize: ["regular"], dips: ["ranch"] },
    allergens: ["Wheat", "Milk"],
    pairs: ["okie-onion", "root-beer"],
    rank: 3,
  },
  {
    id: "dirty-fries",
    name: "Dirty Fries",
    category: "sides",
    price: 6.75,
    kcal: 780,
    blurb: "Fries, griddled onion, cheese sauce, Smash sauce, pickles.",
    description:
      "A regular fries buried under onions cooked down on the flat-top, warm cheese sauce, Smash sauce and chopped pickles. Bring a fork, or don't.",
    tags: ["veg"],
    options: { sideSize: ["regular"] },
    allergens: ["Milk", "Egg", "Soy", "Mustard"],
    pairs: ["night-shift", "root-beer"],
    rank: 2,
  },
  {
    id: "fried-pickles",
    name: "Fried Pickle Chips",
    category: "sides",
    price: 4.75,
    kcal: 340,
    blurb: "Crinkle-cut dills in cornmeal crust, with ranch.",
    description:
      "Our house dills, crinkle-cut, dredged in seasoned cornmeal and fried quick so they stay juicy inside. Ranch on the side is included.",
    tags: ["veg"],
    options: { sideSize: ["regular"], dips: ["ranch"] },
    allergens: ["Wheat", "Milk", "Egg"],
    pairs: ["green-flash", "lemonade"],
    rank: 4,
  },
  {
    id: "chocolate-malt",
    name: "Chocolate Malt",
    category: "shakes",
    price: 6.25,
    kcal: 690,
    blurb: "Dark chocolate ice cream, malt, whipped cream, cherry.",
    description:
      "Ridgeline Creamery's dark chocolate spun with whole milk and a heavy spoon of malt powder, topped with whipped cream and a cherry. Add toasted pecans and it becomes a sundae with ambitions.",
    image: images.shakeChocolate,
    tags: ["veg"],
    options: { shakeSize: ["12oz"], shakeExtras: ["malt", "whip"] },
    allergens: ["Milk", "Wheat (malt)"],
    pairs: ["the-smash", "fries"],
    rank: 1,
  },
  {
    id: "vanilla",
    name: "Vanilla Bean",
    category: "shakes",
    price: 6.25,
    kcal: 610,
    blurb: "Speckled vanilla custard ice cream, spun thick.",
    description:
      "The plain one, which is the hardest one to get right. Real vanilla bean custard base, whole milk, nothing else. Dip your fries in it; we won't tell.",
    image: images.shakeVanilla,
    tags: ["veg", "gf"],
    options: { shakeSize: ["12oz"], shakeExtras: ["whip"] },
    allergens: ["Milk", "Egg"],
    pairs: ["single", "fries"],
    rank: 2,
  },
  {
    id: "strawberry",
    name: "Strawberry Field",
    category: "shakes",
    price: 6.75,
    kcal: 580,
    blurb: "Roasted strawberry jam swirled through vanilla.",
    description:
      "We roast summer strawberries with a little sugar and black pepper, then swirl the jam through vanilla custard so you get ribbons, not pink. Seasonal; it disappears when the berries do.",
    tags: ["veg", "gf", "new"],
    options: { shakeSize: ["12oz"], shakeExtras: [] },
    allergens: ["Milk", "Egg"],
    pairs: ["backyard", "fries"],
    rank: 3,
  },
  {
    id: "lemonade",
    name: "Squeezed Lemonade",
    category: "drinks",
    price: 3.75,
    kcal: 160,
    blurb: "Lemons pressed at the counter every hour.",
    description:
      "Squeezed on the hand press beside the register, sweetened just enough, poured over pebble ice. Ask for a splash of hot honey if you are that kind of person.",
    tags: ["gf"],
    options: { drinkSize: ["16oz"] },
    allergens: ["None"],
    pairs: ["the-smash", "scorched-bird"],
    rank: 1,
  },
  {
    id: "root-beer",
    name: "Draft Root Beer",
    category: "drinks",
    price: 3.5,
    kcal: 180,
    blurb: "Sassafras and vanilla, drawn from the tap.",
    description:
      "Brewed for us by a small soda works across the river with sassafras, wintergreen and vanilla, and drawn from a draft tap so it has a real head on it.",
    tags: ["gf"],
    options: { drinkSize: ["16oz"] },
    allergens: ["None"],
    pairs: ["okie-onion", "dirty-fries"],
    rank: 2,
  },
  {
    id: "iced-tea",
    name: "Black Iced Tea",
    category: "drinks",
    price: 3.25,
    kcal: 0,
    blurb: "Cold-brewed Assam, unsweetened.",
    description:
      "Assam leaves steeped cold overnight so it stays smooth, never bitter. Unsweetened; there is cane syrup at the counter.",
    tags: ["gf"],
    options: { drinkSize: ["16oz"] },
    allergens: ["None"],
    pairs: ["the-coop", "fries"],
    rank: 3,
  },
];

export const menuSorts = [
  { id: "board", label: "Menu order" },
  { id: "popular", label: "Most ordered" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "kcal", label: "Lightest first" },
] as const;

/* ------------------------------------------------------------------ merch */

export type MerchKind =
  "tee" | "hoodie" | "cap" | "press" | "bottle" | "tote" | "pin" | "spatula";
export type MerchType = "apparel" | "kitchen" | "goods";
export type Colorway = { id: string; label: string; fill: string; ink: string };

export type MerchItem = {
  id: string;
  name: string;
  kind: MerchKind;
  type: MerchType;
  price: number;
  blurb: string;
  description: string;
  colors: Colorway[];
  sizes?: string[];
  specs: [string, string][];
  rank: number;
};

export const merchTypes: { id: MerchType; label: string }[] = [
  { id: "apparel", label: "Wear it" },
  { id: "kitchen", label: "Cook with it" },
  { id: "goods", label: "Small stuff" },
];

const char: Colorway = {
  id: "char",
  label: "Char",
  fill: "#2a1b14",
  ink: "#f6b81a",
};
const ketchup: Colorway = {
  id: "ketchup",
  label: "Ketchup",
  fill: "#d42a1c",
  ink: "#fbf1de",
};
const mustard: Colorway = {
  id: "mustard",
  label: "Mustard",
  fill: "#f6b81a",
  ink: "#2a1b14",
};
const deli: Colorway = {
  id: "deli",
  label: "Deli paper",
  fill: "#f4e6c8",
  ink: "#d42a1c",
};
const pickle: Colorway = {
  id: "pickle",
  label: "Pickle",
  fill: "#2f5d34",
  ink: "#fbf1de",
};
const iron: Colorway = {
  id: "iron",
  label: "Cast iron",
  fill: "#3b3633",
  ink: "#f6b81a",
};

const apparelSizes = ["S", "M", "L", "XL", "XXL"];

export const merch: MerchItem[] = [
  {
    id: "logo-tee",
    name: "Smash Logo Tee",
    kind: "tee",
    type: "apparel",
    price: 28,
    blurb: "Heavyweight cotton, wordmark across the chest.",
    description:
      "A boxy 6.5-oz cotton tee with the Smash wordmark screen-printed in water-based ink. It is the shirt the crew wears on the line, which means it has been tested against grease, ketchup and a lot of washing.",
    colors: [ketchup, char, mustard],
    sizes: apparelSizes,
    specs: [
      ["Fabric", "6.5 oz ring-spun cotton"],
      ["Fit", "Boxy, true to size"],
      ["Print", "Water-based, one colour"],
      ["Care", "Cold wash, hang dry"],
    ],
    rank: 1,
  },
  {
    id: "night-shift-hoodie",
    name: "Night Shift Hoodie",
    kind: "hoodie",
    type: "apparel",
    price: 64,
    blurb: "Brushed fleece for the walk home after close.",
    description:
      "A 13-oz brushed-back fleece hoodie with a double-lined hood, a kangaroo pocket big enough for a foil-wrapped double, and the wordmark on the chest.",
    colors: [char, pickle, deli],
    sizes: apparelSizes,
    specs: [
      ["Fabric", "13 oz cotton-poly fleece"],
      ["Fit", "Relaxed; size down for snug"],
      ["Details", "Double-lined hood, ribbed cuffs"],
      ["Care", "Cold wash inside out"],
    ],
    rank: 3,
  },
  {
    id: "flat-top-cap",
    name: "Flat-Top Cap",
    kind: "cap",
    type: "apparel",
    price: 30,
    blurb: "Five-panel, unstructured, embroidered patty.",
    description:
      "An unstructured five-panel cap in washed cotton twill with our patty mark embroidered on the front and a brass buckle at the back. Keeps hair out of the food and sun out of your eyes.",
    colors: [char, ketchup, mustard],
    sizes: ["One size"],
    specs: [
      ["Fabric", "Washed cotton twill"],
      ["Fit", "Adjustable brass buckle"],
      ["Mark", "Embroidered patty"],
    ],
    rank: 2,
  },
  {
    id: "the-press",
    name: "The Press",
    kind: "press",
    type: "kitchen",
    price: 42,
    blurb: "The cast-iron smasher we use on the line.",
    description:
      "A 7-inch cast-iron press with a hardwood handle, the same weight and diameter as the ones on our griddles. Pre-seasoned. Put a square of parchment between the press and the beef and lean on it for ten seconds.",
    colors: [iron],
    specs: [
      ["Diameter", "7 in"],
      ["Weight", "3.1 lb"],
      ["Material", "Pre-seasoned cast iron, oak handle"],
      ["Care", "Hand wash, dry on heat, oil lightly"],
    ],
    rank: 1,
  },
  {
    id: "scraper",
    name: "Line Scraper",
    kind: "spatula",
    type: "kitchen",
    price: 26,
    blurb: "Stiff, square, sharp enough to keep the crust.",
    description:
      "A stiff stainless spatula with a squared, bevelled edge for getting under a smashed patty without leaving the crust behind. The handle is riveted walnut.",
    colors: [iron],
    specs: [
      ["Blade", "4 × 6 in stainless, bevelled"],
      ["Handle", "Riveted walnut"],
      ["Care", "Dishwasher safe; oil the handle"],
    ],
    rank: 2,
  },
  {
    id: "smash-sauce",
    name: "Smash Sauce, 12 oz",
    kind: "bottle",
    type: "kitchen",
    price: 9,
    blurb: "The sauce, bottled. Pickle brine, paprika, mayo.",
    description:
      "The same sauce we put on The Smash: mayo, ketchup, chopped dills and their brine, smoked paprika, a little mustard. Refrigerate after opening and it lasts a month, though it won't.",
    colors: [ketchup],
    specs: [
      ["Size", "12 fl oz squeeze bottle"],
      ["Keeps", "4 weeks once opened, refrigerated"],
      ["Allergens", "Egg, mustard, soy"],
    ],
    rank: 3,
  },
  {
    id: "paper-tote",
    name: "Paper-Bag Tote",
    kind: "tote",
    type: "goods",
    price: 18,
    blurb: "Our takeout bag, in canvas.",
    description:
      "A heavy canvas tote cut to the exact shape of our takeout bag, folded top and all, with the wordmark printed on both sides. Holds four doubles and two large fries. We checked.",
    colors: [deli, char],
    specs: [
      ["Fabric", "12 oz natural canvas"],
      ["Size", "14 × 16 × 5 in"],
      ["Handles", "24 in webbing"],
    ],
    rank: 1,
  },
  {
    id: "patty-pin",
    name: "Patty Pin",
    kind: "pin",
    type: "goods",
    price: 10,
    blurb: "Hard enamel, one inch, gold edges.",
    description:
      "A one-inch hard enamel pin of our patty mark with gold-plated edges and two rubber backs. Free with any catering order over 50 guests.",
    colors: [ketchup, mustard],
    specs: [
      ["Size", "1 in"],
      ["Finish", "Hard enamel, gold plate"],
      ["Back", "Two rubber clutches"],
    ],
    rank: 2,
  },
];

export const merchSorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
] as const;

/* -------------------------------------------------------------- locations */

/** Opening hours per weekday, Sunday first, 24h "HH:MM"; a close earlier than the open runs past midnight. */
export type Hours = [string, string] | null;

export type Location = {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  description: string;
  address: string[];
  zip: string;
  phone: string;
  phoneHref: string;
  hours: Hours[];
  features: string[];
  delivery: boolean;
  /** Position on the authored city map, in map units (0–600 × 0–400). */
  pin: [number, number];
  image?: Img;
  /** The truck moves; each weekday it parks somewhere else. */
  stops?: { day: string; spot: string }[];
};

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const locations: Location[] = [
  {
    id: "eastside",
    name: "Eastside",
    kind: "The original counter",
    blurb:
      "Where it started in 2016. Twelve stools, one big griddle, the patio out back.",
    description:
      "Our first counter, in the old tyre shop on Alder Street. The griddle is the same 48-inch slab we bought used the week we opened, and it has nine years of seasoning on it. Order at the window, eat on the patio, watch the press come down.",
    address: ["2208 Alder Street", "Eastside"],
    zip: "97214",
    phone: "+1 555 0100 221",
    phoneHref: "tel:+15550100221",
    hours: [
      ["11:00", "21:00"],
      ["11:00", "22:00"],
      ["11:00", "22:00"],
      ["11:00", "22:00"],
      ["11:00", "22:00"],
      ["11:00", "01:00"],
      ["11:00", "01:00"],
    ],
    features: [
      "Patio with heaters",
      "Late night Fri & Sat",
      "Delivery within 3 miles",
      "Dog-friendly patio",
    ],
    delivery: true,
    pin: [418, 214],
    image: images.neon,
  },
  {
    id: "market-hall",
    name: "Market Hall",
    kind: "Food hall stall",
    blurb:
      "A six-seat stall inside Fulton Market Hall. Fastest lunch in the district.",
    description:
      "Our counter in Fulton Market Hall runs the tightest menu we have: The Smash, Single, Plant Smash, fries and two shakes, built for the office lunch rush. Shared seating, shared bathrooms, very short line after 1:30.",
    address: ["Fulton Market Hall, Stall 14", "640 Fulton Avenue"],
    zip: "97205",
    phone: "+1 555 0100 222",
    phoneHref: "tel:+15550100222",
    hours: [
      null,
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "20:00"],
      ["11:00", "20:00"],
    ],
    features: [
      "Pickup shelf by the stall",
      "Shared food-hall seating",
      "Closed Sundays",
    ],
    delivery: false,
    pin: [252, 168],
    image: images.dining,
  },
  {
    id: "northgate",
    name: "Northgate",
    kind: "Drive-up window",
    blurb: "Our biggest kitchen, with a pull-up window and a lot more parking.",
    description:
      "Northgate is where the catering orders are cooked and where the drive-up window lives. Order ahead, pull into a numbered bay, and we walk it out. The dining room seats forty and has the only shake machine with three spindles.",
    address: ["11 Northgate Plaza", "Northgate"],
    zip: "97217",
    phone: "+1 555 0100 223",
    phoneHref: "tel:+15550100223",
    hours: [
      ["10:30", "22:00"],
      ["10:30", "22:00"],
      ["10:30", "22:00"],
      ["10:30", "22:00"],
      ["10:30", "23:00"],
      ["10:30", "23:59"],
      ["10:30", "23:59"],
    ],
    features: [
      "Drive-up window",
      "Curbside bays",
      "Delivery within 3 miles",
      "Catering kitchen",
    ],
    delivery: true,
    pin: [318, 62],
    image: images.griddle,
  },
  {
    id: "the-truck",
    name: "The Truck",
    kind: "Griddle on wheels",
    blurb: "A 36-inch flat-top in a step van. Different street every day.",
    description:
      "The Truck is a converted bread van with a full flat-top, a fryer and a generator we apologise for. It parks in a different neighbourhood each weekday and goes to private events at weekends. Pickup only, and the menu is burgers and fries.",
    address: ["A different street every weekday", "Weekends: private events"],
    zip: "—",
    phone: "+1 555 0100 224",
    phoneHref: "tel:+15550100224",
    hours: [
      null,
      ["11:30", "14:30"],
      ["11:30", "14:30"],
      ["11:30", "14:30"],
      ["11:30", "14:30"],
      ["11:30", "14:30"],
      null,
    ],
    features: [
      "Pickup only",
      "Cards and phones only",
      "Books out for weekend events",
    ],
    delivery: false,
    pin: [130, 286],
    image: images.backyard,
    stops: [
      { day: "Monday", spot: "Riverside Park, by the boathouse" },
      { day: "Tuesday", spot: "Foundry Row, outside the brewery" },
      { day: "Wednesday", spot: "Hospital campus, east lot" },
      { day: "Thursday", spot: "Union Station forecourt" },
      { day: "Friday", spot: "Westbank Library steps" },
    ],
  },
];

/* --------------------------------------------------------------- ordering */

export const ordering = {
  taxRate: 0.08,
  deliveryFee: 3.99,
  deliveryMinimum: 15,
  /** Delivery runs from Eastside and Northgate to these ZIP codes. */
  deliveryZips: [
    "97211",
    "97212",
    "97213",
    "97214",
    "97215",
    "97216",
    "97217",
    "97218",
    "97232",
  ],
  pickupMinutes: 12,
  deliveryMinutes: 35,
  demoNote: "This is a demo checkout: nothing is sent and no card is charged.",
  tipOptions: [0, 0.1, 0.15, 0.2],
};

/* --------------------------------------------------------------- catering */

export type CateringPackage = {
  id: string;
  name: string;
  price: number;
  unit: string;
  feeds: string;
  description: string;
  includes: string[];
};

export const catering = {
  intro:
    "Office lunches, birthdays, wrap parties, weddings that want something better at midnight. We deliver boxed burgers that survive the trip, or we park the griddle truck outside and smash to order.",
  packages: [
    {
      id: "smash-box",
      name: "Smash Box",
      price: 149,
      unit: "per box",
      feeds: "Feeds 10",
      description:
        "Ten burgers wrapped in foil and paper, two big trays of fries, sauces on the side. Delivered hot from Northgate.",
      includes: [
        "10 burgers, mix any four from the menu",
        "2 large fries trays",
        "Smash sauce, ketchup, mustard",
        "Napkins, wet wipes, a lot of both",
      ],
    },
    {
      id: "slider-board",
      name: "Slider Board",
      price: 96,
      unit: "per board",
      feeds: "24 sliders",
      description:
        "Single-patty sliders on small potato buns, skewered with a pickle and laid out on a kraft-lined board. Made for standing up and talking.",
      includes: [
        "24 sliders, up to three kinds",
        "Pickle on every skewer",
        "Plant patties on request",
        "Board, skewers and napkins",
      ],
    },
    {
      id: "griddle-truck",
      name: "The Griddle Truck",
      price: 1400,
      unit: "from",
      feeds: "Up to 60 guests, 2 hours",
      description:
        "The Truck and two cooks at your door, smashing to order for two hours. Additional guests are $14 each; additional hours are $250.",
      includes: [
        "Two hours of service",
        "Full burger menu plus fries",
        "Plant patties and gluten-free buns",
        "Crew, generator, permits and clean-up",
      ],
    },
  ] satisfies CateringPackage[],
  truckBase: 1400,
  truckGuests: 60,
  truckExtraGuest: 14,
  boxFeeds: 10,
  boardFeeds: 12,
  occasions: [
    "Office lunch",
    "Birthday or party",
    "Wedding or late-night",
    "Film or event crew",
    "Something else",
  ],
  notes: [
    "Order boxes and boards 48 hours ahead; the truck books about three weeks out.",
    "We deliver within 10 miles of Northgate. Further is possible with the truck.",
    "Every order can be made with plant patties or gluten-free buns.",
  ],
};

/* ------------------------------------------------------------------ about */

export const about = {
  story: [
    "Smash started as a Thursday pop-up behind a tyre shop on Alder Street, with a used griddle, a borrowed press and a hand-lettered board that said DOUBLE $7. Marisol Ortega had been a line cook for eleven years and wanted one thing: a burger where the crust was the point.",
    "It sold out the first night, and the second, and the tyre shop eventually sold us the building. Nine years later there are three counters and a truck, the beef is still ground every morning, and the board still has fewer than twenty things on it.",
  ],
  method: [
    {
      title: "Grind",
      text: "Chuck and brisket, 80/20, ground at 6 a.m. and rolled into 3-oz balls. Never frozen, never pre-formed.",
    },
    {
      title: "Smash",
      text: "Ball onto 450° steel, parchment on top, press down hard and hold for ten seconds. Thin is the whole idea.",
    },
    {
      title: "Leave it",
      text: "Thirty seconds untouched while the edges go lacy and brown. This is where the flavour comes from.",
    },
    {
      title: "Scrape",
      text: "A stiff scraper under the patty so the crust comes with it, flip, cheese on, onions on if it's an Okie.",
    },
    {
      title: "Stack",
      text: "Onto a bun toasted in the beef fat, sauce top and bottom, wrapped in paper so it steams for one minute.",
    },
  ],
  sourcing: [
    {
      name: "Hollow Creek Ranch",
      what: "Chuck and brisket",
      text: "Grass-raised, grain-finished cattle from a family ranch two hours east. Whole primals, delivered twice a week, ground by us.",
    },
    {
      name: "Pacheco Bakery",
      what: "Potato and sesame buns",
      text: "Baked overnight to our recipe, a little sweeter and softer than theirs, so they squash without tearing.",
    },
    {
      name: "Ridgeline Creamery",
      what: "Ice cream for the shakes",
      text: "Custard-style ice cream from a dairy co-op in the hills. We buy the vanilla and chocolate in five-gallon tubs.",
    },
  ],
  crew: [
    {
      name: "Marisol Ortega",
      role: "Founder & griddle",
      line: "Still works the Eastside line on Friday nights.",
    },
    {
      name: "Dev Okafor",
      role: "Kitchen director",
      line: "Wrote the Okie Onion recipe on a ticket roll.",
    },
    {
      name: "Hana Sato",
      role: "Shakes & pastry",
      line: "Makes the strawberry jam and the plant patties.",
    },
    {
      name: "Luis Brandt",
      role: "Catering & the Truck",
      line: "Has parked the Truck in a wedding marquee. Twice.",
    },
  ],
  faq: [
    {
      q: "Can I order a burger medium-rare?",
      a: "No. A smash patty is too thin to be anything but cooked through; that is the crust. If you want pink in the middle, this is the wrong burger, and we say that with love.",
    },
    {
      q: "Is the plant patty vegan?",
      a: "The patty is. Choose no cheese, mustard or ketchup instead of Smash sauce, and the gluten-free bun (which is also vegan) to make the whole burger vegan.",
    },
    {
      q: "Do you have a dedicated fryer?",
      a: "Yes. Fries are cooked in their own fryer in beef-free rice-bran oil. Rings, pickles and chicken share a second fryer, so they contain wheat and milk.",
    },
    {
      q: "How long does a pickup order take?",
      a: "About twelve minutes from when you place it. At lunch rush at Market Hall it can be twenty; the confirmation shows the time we are actually quoting.",
    },
    {
      q: "Do you take reservations?",
      a: "We don't. It is a counter, and seats turn over fast. For groups of twelve or more, a catering order is the better route.",
    },
    {
      q: "Are you hiring?",
      a: "Usually. Line cooks start at $22 an hour plus tips and a free burger every shift. Email hello@smash.example with when you can work.",
    },
  ],
};

/* ------------------------------------------------------------------- home */

export const home = {
  title: "Smashed thin. Stacked tall.",
  lede: "Double cheeseburgers pressed onto 450° steel until the edges go lacy, fried chicken, hand-cut fries and real-ice-cream shakes. Order ahead and it's ready in about twelve minutes.",
  boardIds: [
    "the-smash",
    "okie-onion",
    "backyard",
    "scorched-bird",
    "fries",
    "chocolate-malt",
  ],
  crust: {
    title: "The crust is the point.",
    text: "A thick burger hides its beef. A smashed one shows it off. Pressing a cold ball of fresh chuck flat on screaming-hot steel puts the whole surface in contact with the griddle at once, and in thirty seconds you get a dark, salty, lace-edged crust that a grill grate never could.",
  },
  sidesTitle: "Then the other half of the tray.",
  closeTitle: "Hungry is a good time to order.",
  closeText:
    "Order now and pick up in about twelve minutes, or have it brought to you from Eastside or Northgate.",
};

export const newsletter = {
  title: "The Monday Smash",
  text: "One email a week: the special, where the Truck is parking, and the occasional free-fries code.",
};
