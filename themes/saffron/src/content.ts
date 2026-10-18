import heroMarket from "./assets/hero-market.jpg";
import rainbowCarrots from "./assets/rainbow-carrots.jpg";
import cargoBike from "./assets/cargo-bike.jpg";
import saffronStigmas from "./assets/saffron-stigmas.jpg";
import pTomatoes from "./assets/p-tomatoes.jpg";
import pCarrots from "./assets/p-carrots.jpg";
import pStrawberries from "./assets/p-strawberries.jpg";
import pLettuce from "./assets/p-lettuce.jpg";
import pPotatoes from "./assets/p-potatoes.jpg";
import pPeaches from "./assets/p-peaches.jpg";
import pMushrooms from "./assets/p-mushrooms.jpg";
import pGarlic from "./assets/p-garlic.jpg";
import pSourdough from "./assets/p-sourdough.jpg";
import pCroissants from "./assets/p-croissants.jpg";
import pGalette from "./assets/p-galette.jpg";
import pEggs from "./assets/p-eggs.jpg";
import pGouda from "./assets/p-gouda.jpg";
import pHalibut from "./assets/p-halibut.jpg";
import pSalmon from "./assets/p-salmon.jpg";
import pOliveOil from "./assets/p-olive-oil.jpg";
import pHoney from "./assets/p-honey.jpg";
import pSaffron from "./assets/p-saffron.jpg";
import pChickpeas from "./assets/p-chickpeas.jpg";
import pCoffee from "./assets/p-coffee.jpg";
import rShakshuka from "./assets/r-shakshuka.jpg";
import rRisotto from "./assets/r-risotto.jpg";
import rTomatoTart from "./assets/r-tomato-tart.jpg";
import rShortcake from "./assets/r-shortcake.jpg";
import rSalmon from "./assets/r-salmon.jpg";
import rChickpeas from "./assets/r-chickpeas.jpg";

export type Photo = { src: string; alt: string; width: number; height: number };

/* ---------- Brand ---------- */

export const brand = {
  name: "Saffron",
  sector: "Grocery market & delivery",
  tagline: "Your corner market, picked by hand and at your door in two hours.",
  announcement:
    "Order by 3pm for delivery tonight · Free delivery on baskets over $75",
  address: "214 Orchard Row, Millbrook",
  email: "hello@saffron.example",
  phone: "+1 (555) 014-2230",
  phoneHref: "tel:+15550142230",
  shopHours: [
    { days: "Mon – Sat", hours: "7am – 9pm" },
    { days: "Sunday", hours: "8am – 6pm" },
  ],
  deliveryHours: "Daily, 8am – 8pm",
};

export const nav = [
  { to: "/aisles", label: "Aisles" },
  { to: "/recipes", label: "Recipes" },
  { to: "/delivery", label: "Delivery" },
  { to: "/about", label: "Our market" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

/* ---------- Aisles & products ---------- */

export type AisleId = "produce" | "bakery" | "dairy" | "fish" | "pantry";
export type Aisle = { id: AisleId; name: string; short: string; blurb: string };

export const aisles: Aisle[] = [
  {
    id: "produce",
    name: "Fruit & vegetables",
    short: "Produce",
    blurb:
      "Picked within fifty miles wherever the season allows, sold loose or bunched, never shrink-wrapped.",
  },
  {
    id: "bakery",
    name: "Bakery",
    short: "Bakery",
    blurb:
      "Baked overnight by Pell Street Bakehouse, one block over, and on our shelves by 6:30 every morning.",
  },
  {
    id: "dairy",
    name: "Dairy & eggs",
    short: "Dairy",
    blurb:
      "Pasture-raised eggs from Wren Hill and cheese cut to order at the counter.",
  },
  {
    id: "fish",
    name: "Fish counter",
    short: "Fish",
    blurb:
      "Landed at Port Ellery before dawn. What the boats bring in is what we sell, so the counter changes daily.",
  },
  {
    id: "pantry",
    name: "Pantry",
    short: "Pantry",
    blurb:
      "The jars, sacks and tins we cook with ourselves, including the spice we are named after.",
  },
];

export type Tag = "Organic" | "Local" | "In season" | "Plastic-free";
export const tags: Tag[] = ["In season", "Local", "Organic", "Plastic-free"];

export type Variant = { label: string; price: number };

export type Product = {
  id: string;
  name: string;
  aisle: AisleId;
  photo: Photo;
  grower: string;
  origin: string;
  /** Road miles from the shop; null for imported goods. */
  miles: number | null;
  /** Price-card unit, e.g. "/ lb". */
  unit: string;
  variants: Variant[];
  tags: Tag[];
  blurb: string;
  description: string;
  storage: string;
  allergens?: string;
  /** Lower comes first under "Market pick" sort. */
  rank: number;
};

export const products: Product[] = [
  {
    id: "heirloom-tomatoes",
    name: "Heirloom tomatoes",
    aisle: "produce",
    photo: {
      src: pTomatoes,
      alt: "Ribbed heirloom tomatoes in red, orange, yellow and green piled at a market stall",
      width: 1000,
      height: 793,
    },
    grower: "Hollis Bend Farm",
    origin: "Hollis Bend, 22 miles north",
    miles: 22,
    unit: "per lb",
    variants: [
      { label: "1 lb, mixed colours", price: 4.8 },
      { label: "2 lb, mixed colours", price: 8.9 },
    ],
    tags: ["In season", "Local", "Organic"],
    blurb:
      "Brandywine, Cherokee Purple and Green Zebra, picked the day before you get them.",
    description:
      "Hollis Bend grows eleven heirloom varieties on four acres of river-bottom soil. We take whatever is ripest that morning, so a pound might be two fat Brandywines or a handful of striped Green Zebras. They are soft because they are ripe; slice them thick, salt them, and leave them on the counter for ten minutes before eating.",
    storage:
      "Keep out of the fridge, stem side down, and eat within three days.",
    rank: 1,
  },
  {
    id: "bunched-carrots",
    name: "Bunched carrots",
    aisle: "produce",
    photo: {
      src: pCarrots,
      alt: "Bunches of orange carrots with their green tops at a farmers market",
      width: 900,
      height: 670,
    },
    grower: "Five Gate Growers",
    origin: "Five Gate, 14 miles east",
    miles: 14,
    unit: "per bunch",
    variants: [
      { label: "1 bunch, about 1½ lb", price: 3.2 },
      { label: "2 bunches", price: 6.0 },
    ],
    tags: ["In season", "Local", "Organic", "Plastic-free"],
    blurb:
      "Sweet autumn Nantes with the tops left on, because the tops make a good pesto.",
    description:
      "Five Gate sow carrots every three weeks from March, so there is always a young bunch somewhere in the field. These are Nantes, short and blunt and very sweet once the nights turn cold. The tops are clean enough to eat: blitz them with garlic, olive oil and a little honey.",
    storage:
      "Twist the tops off when you get home and keep both in the fridge crisper.",
    rank: 4,
  },
  {
    id: "strawberries",
    name: "Seascape strawberries",
    aisle: "produce",
    photo: {
      src: pStrawberries,
      alt: "A wicker basket full of ripe red strawberries on grass",
      width: 900,
      height: 835,
    },
    grower: "Marrow Creek Farm",
    origin: "Marrow Creek, 31 miles south",
    miles: 31,
    unit: "per pint",
    variants: [
      { label: "1 pint", price: 5.5 },
      { label: "2 pints", price: 10.0 },
    ],
    tags: ["In season", "Local"],
    blurb: "The last flush of the year, small and dark and properly sweet.",
    description:
      "Seascape is an everbearing variety, which means Marrow Creek can pick from June right through to the first frost. The late fruit is smaller than June's and twice as flavoursome. Our grocers check every punnet and pull any soft berries before it leaves the shop.",
    storage:
      "Do not wash until you eat them. Fridge, in a single layer, up to two days.",
    rank: 2,
  },
  {
    id: "red-leaf-lettuce",
    name: "Red leaf lettuce",
    aisle: "produce",
    photo: {
      src: pLettuce,
      alt: "Rows of red-tinged leaf lettuce growing in a field",
      width: 900,
      height: 686,
    },
    grower: "Five Gate Growers",
    origin: "Five Gate, 14 miles east",
    miles: 14,
    unit: "per head",
    variants: [
      { label: "1 head", price: 2.6 },
      { label: "2 heads", price: 4.8 },
    ],
    tags: ["In season", "Local", "Organic", "Plastic-free"],
    blurb:
      "Loose, frilled and a little bitter. The salad leaf that tastes of something.",
    description:
      "Cut at first light and in the shop by ten. These heads are grown slowly under shade cloth, which keeps the leaves tender and the red colour deep. One head dresses a salad for four.",
    storage: "Wrap in a damp towel and keep in the fridge for up to five days.",
    rank: 9,
  },
  {
    id: "new-potatoes",
    name: "Mixed new potatoes",
    aisle: "produce",
    photo: {
      src: pPotatoes,
      alt: "A pile of small potatoes in red, purple and gold skins",
      width: 1000,
      height: 650,
    },
    grower: "Hollis Bend Farm",
    origin: "Hollis Bend, 22 miles north",
    miles: 22,
    unit: "per 2 lb",
    variants: [
      { label: "2 lb bag", price: 3.9 },
      { label: "5 lb sack", price: 8.5 },
    ],
    tags: ["Local", "Organic", "Plastic-free"],
    blurb:
      "Red Norland, Purple Majesty and Yukon Gold, dug and sold with the soil still on.",
    description:
      "We leave the dirt on because it keeps them; wash just before cooking. They are waxy enough to hold their shape in a salad and creamy enough to crush with butter. Boil from cold in well-salted water for about fifteen minutes.",
    storage: "Cool, dark cupboard in the paper bag they come in. Two weeks.",
    rank: 10,
  },
  {
    id: "yellow-peaches",
    name: "Yellow peaches",
    aisle: "produce",
    photo: {
      src: pPeaches,
      alt: "A wicker basket of blushing yellow peaches on dry grass",
      width: 900,
      height: 900,
    },
    grower: "Calder Orchard",
    origin: "Calder Valley, 48 miles west",
    miles: 48,
    unit: "per 4",
    variants: [
      { label: "4 pack, ripe now", price: 6.4 },
      { label: "4 pack, ripe in 3 days", price: 5.9 },
    ],
    tags: ["In season", "Local"],
    blurb: "Choose ripe for tonight or firm for the weekend. We pick to match.",
    description:
      "Calder's late-season O'Henry peaches are big, freestone and run with juice when they are ready. Tell us when you want to eat them and we will choose from the right end of the crate: ripe-now fruit gives a little at the shoulder, ripe-in-three-days fruit is still firm.",
    storage: "Ripen on the counter, stem side down. Fridge only once ripe.",
    rank: 3,
  },
  {
    id: "forager-mushrooms",
    name: "Forager's mushroom mix",
    aisle: "produce",
    photo: {
      src: pMushrooms,
      alt: "A wicker basket full of wild brown-capped mushrooms on grass",
      width: 900,
      height: 783,
    },
    grower: "Linden Woods Foraging",
    origin: "Linden Woods, 39 miles north-west",
    miles: 39,
    unit: "per 8 oz",
    variants: [
      { label: "8 oz", price: 9.5 },
      { label: "1 lb", price: 17.0 },
    ],
    tags: ["In season", "Local"],
    blurb:
      "Whatever the woods gave this week: usually chanterelles, hen of the woods and a few porcini.",
    description:
      "Every mushroom is identified twice, once by the forager and again by our produce lead before it goes on sale. The mix changes with the weather; after rain there are more porcini. Brush clean rather than washing, and cook hot in butter.",
    storage: "Paper bag in the fridge, never plastic. Use within three days.",
    rank: 6,
  },
  {
    id: "hardneck-garlic",
    name: "Hardneck garlic",
    aisle: "produce",
    photo: {
      src: pGarlic,
      alt: "Close-up of plump white garlic bulbs",
      width: 1000,
      height: 666,
    },
    grower: "Five Gate Growers",
    origin: "Five Gate, 14 miles east",
    miles: 14,
    unit: "per 3",
    variants: [
      { label: "3 bulbs", price: 3.0 },
      { label: "Braid of 10", price: 9.0 },
    ],
    tags: ["Local", "Organic", "Plastic-free"],
    blurb: "Fat cloves, papery skin, hot when raw and sweet when roasted.",
    description:
      "Music and German Red, cured for a month in Five Gate's barn. Hardneck varieties have fewer, larger cloves that peel in one pull. A braid keeps all winter hanging somewhere dry.",
    storage: "Somewhere dry and airy, out of the fridge. Months.",
    rank: 14,
  },
  {
    id: "country-sourdough",
    name: "Country sourdough",
    aisle: "bakery",
    photo: {
      src: pSourdough,
      alt: "A round scored sourdough loaf cooling on a wire rack",
      width: 1000,
      height: 750,
    },
    grower: "Pell Street Bakehouse",
    origin: "Pell Street, 1 block away",
    miles: 0,
    unit: "per loaf",
    variants: [
      { label: "Whole loaf, unsliced", price: 7.5 },
      { label: "Whole loaf, sliced", price: 7.5 },
      { label: "Half loaf", price: 4.0 },
    ],
    tags: ["Local", "Plastic-free"],
    blurb:
      "A 36-hour ferment, a dark crust, and a crumb that toasts for a week.",
    description:
      "Pell Street mix their dough at noon, shape it at midnight and bake from four. The flour is a blend of stone-ground wheat and a little rye from Tallgrass. Ask for it sliced and we run it through the slicer the moment it is picked.",
    storage: "Cut side down on a board for three days, then slice and freeze.",
    allergens: "Wheat, rye (gluten).",
    rank: 5,
  },
  {
    id: "butter-croissants",
    name: "Butter croissants",
    aisle: "bakery",
    photo: {
      src: pCroissants,
      alt: "A tray of golden, flaky butter croissants",
      width: 750,
      height: 1000,
    },
    grower: "Pell Street Bakehouse",
    origin: "Pell Street, 1 block away",
    miles: 0,
    unit: "per 2",
    variants: [
      { label: "2 pack", price: 6.0 },
      { label: "6 pack", price: 16.5 },
    ],
    tags: ["Local"],
    blurb:
      "Laminated over three days with cultured butter. Delivered by the morning slots only.",
    description:
      "Croissants are best within hours of baking, so we only send them on slots that start before noon. Later in the day the option still appears, but we will swap in tomorrow's batch and tell you before we do.",
    storage: "Eat today. Revive leftovers in a hot oven for four minutes.",
    allergens: "Wheat (gluten), milk, egg.",
    rank: 7,
  },
  {
    id: "peach-galette",
    name: "Peach & blueberry galette",
    aisle: "bakery",
    photo: {
      src: pGalette,
      alt: "A rustic galette filled with sliced peaches, blueberries and almonds",
      width: 1000,
      height: 750,
    },
    grower: "Pell Street Bakehouse",
    origin: "Pell Street, 1 block away",
    miles: 0,
    unit: "8 inch",
    variants: [
      { label: "8 inch, serves 6", price: 24.0 },
      { label: "5 inch, serves 2", price: 11.0 },
    ],
    tags: ["Local", "In season"],
    blurb:
      "Calder peaches, a rough butter crust and a scatter of toasted almonds.",
    description:
      "The galette uses the peaches that are too ripe to travel, baked the same morning. It holds well for a day and is better slightly warm with cold cream.",
    storage: "Room temperature for a day, fridge for two more.",
    allergens: "Wheat (gluten), milk, egg, almonds.",
    rank: 11,
  },
  {
    id: "pasture-eggs",
    name: "Pasture-raised eggs",
    aisle: "dairy",
    photo: {
      src: pEggs,
      alt: "Brown eggs lined up in a paper egg carton",
      width: 1000,
      height: 666,
    },
    grower: "Wren Hill Farm",
    origin: "Wren Hill, 26 miles south-east",
    miles: 26,
    unit: "per 6",
    variants: [
      { label: "Half dozen", price: 4.25 },
      { label: "Dozen", price: 7.8 },
    ],
    tags: ["Local", "Plastic-free"],
    blurb:
      "Hens on grass, moved to fresh pasture every week. Yolks the colour of our sign.",
    description:
      "Wren Hill run 600 hens in mobile coops that follow their cattle around the farm. Eggs reach us within two days of laying, in recycled-pulp cartons you can send back with your crate.",
    storage: "Fridge, pointed end down. Three weeks.",
    allergens: "Egg.",
    rank: 8,
  },
  {
    id: "farmhouse-gouda",
    name: "Aged farmhouse gouda",
    aisle: "dairy",
    photo: {
      src: pGouda,
      alt: "Shelves of wax-coated gouda wheels with a chalkboard price sign",
      width: 1000,
      height: 750,
    },
    grower: "Cooper Dairy",
    origin: "Cooper Dairy, 61 miles west",
    miles: 61,
    unit: "per 8 oz",
    variants: [
      { label: "8 oz wedge", price: 8.4 },
      { label: "1 lb wedge", price: 15.9 },
    ],
    tags: [],
    blurb:
      "Eighteen months old, crunchy with crystals, cut from the wheel when you order.",
    description:
      "Cooper make gouda the Dutch farmhouse way, with raw milk from their own herd. At eighteen months it tastes of butterscotch and toasted nuts. Grate it over risotto or eat it in shards with a peach.",
    storage: "Wrap in waxed paper, fridge, up to a month.",
    allergens: "Milk.",
    rank: 12,
  },
  {
    id: "halibut-fillet",
    name: "Line-caught halibut",
    aisle: "fish",
    photo: {
      src: pHalibut,
      alt: "A thick white halibut fillet resting on a salmon fillet on a wooden board",
      width: 1000,
      height: 750,
    },
    grower: "Daybreak Fishing Co.",
    origin: "Landed at Port Ellery, 74 miles",
    miles: 74,
    unit: "per 2",
    variants: [
      { label: "2 fillets, about 12 oz", price: 21.0 },
      { label: "4 fillets, about 1½ lb", price: 40.0 },
    ],
    tags: [],
    blurb:
      "Thick, white and mild. Roast it hot for eight minutes and leave it alone.",
    description:
      "Daybreak fish with hook and line from two small boats, so every halibut is landed whole and bled on deck. Our fishmonger cuts fillets the morning of your delivery and packs them on ice in the insulated crate.",
    storage: "Coldest part of the fridge; cook the day it arrives.",
    allergens: "Fish.",
    rank: 15,
  },
  {
    id: "salmon-steaks",
    name: "Salmon steaks, skin on",
    aisle: "fish",
    photo: {
      src: pSalmon,
      alt: "Raw salmon steaks with bright orange flesh laid out side by side",
      width: 1000,
      height: 750,
    },
    grower: "Daybreak Fishing Co.",
    origin: "Landed at Port Ellery, 74 miles",
    miles: 74,
    unit: "per 2",
    variants: [
      { label: "2 steaks, about 12 oz", price: 16.8 },
      { label: "4 steaks, about 1½ lb", price: 32.0 },
    ],
    tags: ["In season"],
    blurb: "Cross-cut through the bone, which keeps them juicy on the grill.",
    description:
      "Late-run coho, cut into inch-thick steaks. Cooking on the bone protects the flesh, so they forgive an extra minute. Grill or pan-fry four minutes a side and finish with lemon.",
    storage: "Coldest part of the fridge; cook within a day.",
    allergens: "Fish.",
    rank: 13,
  },
  {
    id: "olive-oil",
    name: "Early-harvest olive oil",
    aisle: "pantry",
    photo: {
      src: pOliveOil,
      alt: "A glass bottle and small dish of golden-green olive oil",
      width: 1000,
      height: 1000,
    },
    grower: "Vela Grove",
    origin: "Paso Hills, 210 miles",
    miles: 210,
    unit: "per 500 ml",
    variants: [
      { label: "500 ml bottle", price: 16.0 },
      { label: "1 L refill tin", price: 29.0 },
    ],
    tags: ["Organic"],
    blurb: "Green, peppery, pressed within four hours of picking.",
    description:
      "Vela Grove pick their Arbequina and Mission olives green in October, which halves the yield and doubles the flavour. It catches at the back of the throat, which is how you know it is fresh. Bring the bottle back and we refill it from the tin.",
    storage: "Dark cupboard, cap on. Best within six months of opening.",
    rank: 16,
  },
  {
    id: "wildflower-honey",
    name: "Wildflower honey",
    aisle: "pantry",
    photo: {
      src: pHoney,
      alt: "An antique embossed glass honey jar on a pale surface",
      width: 1000,
      height: 666,
    },
    grower: "Bramble Apiary",
    origin: "Bramble Lane, 9 miles",
    miles: 9,
    unit: "per 12 oz",
    variants: [
      { label: "12 oz jar", price: 11.0 },
      { label: "24 oz jar", price: 19.5 },
    ],
    tags: ["Local", "Plastic-free"],
    blurb:
      "Raw and unfiltered, from forty hives that forage the Millbrook allotments.",
    description:
      "Bramble take one harvest a year, in late summer, and only what the bees can spare. It sets slowly into a soft cream; warm the jar in hot water if you want it runny again.",
    storage: "Cupboard, forever. It crystallises; that is a good sign.",
    rank: 17,
  },
  {
    id: "saffron-threads",
    name: "Saffron threads",
    aisle: "pantry",
    photo: {
      src: pSaffron,
      alt: "A heap of deep red saffron threads on a white plate",
      width: 1000,
      height: 750,
    },
    grower: "Golrang Growers Cooperative",
    origin: "Khorasan, imported direct",
    miles: null,
    unit: "per ½ g",
    variants: [
      { label: "½ gram", price: 9.0 },
      { label: "1 gram", price: 16.0 },
    ],
    tags: ["Organic", "Plastic-free"],
    blurb:
      "Grade-one sargol, weighed at the counter. The spice we are named after.",
    description:
      "Every gram is about 450 hand-picked stigmas. We buy once a year from a cooperative of 30 families and sell it by the gram from a tin behind the till, as our founder's grandmother did. Steep a pinch in warm water for twenty minutes before it goes into anything.",
    storage: "Airtight, dark, cool. Keeps its strength for two years.",
    rank: 18,
  },
  {
    id: "dried-chickpeas",
    name: "Dried chickpeas",
    aisle: "pantry",
    photo: {
      src: pChickpeas,
      alt: "A close-up heap of pale dried chickpeas",
      width: 900,
      height: 900,
    },
    grower: "Tallgrass Pulse Co.",
    origin: "Tallgrass Prairie, 120 miles",
    miles: 120,
    unit: "per lb",
    variants: [
      { label: "1 lb paper bag", price: 3.6 },
      { label: "3 lb paper bag", price: 9.6 },
    ],
    tags: ["Organic", "Plastic-free"],
    blurb:
      "This year's crop, which is why they cook in an hour instead of three.",
    description:
      "Dried beans get harder every month they sit. Tallgrass harvest in August and we sell through the crop by spring. Soak overnight with a pinch of baking soda and simmer until creamy.",
    storage: "Airtight jar, cupboard. Best within a year.",
    rank: 19,
  },
  {
    id: "market-coffee",
    name: "Market blend coffee",
    aisle: "pantry",
    photo: {
      src: pCoffee,
      alt: "Close-up of glossy medium-roast coffee beans",
      width: 1000,
      height: 750,
    },
    grower: "Long Table Roasters",
    origin: "Canal Street, 3 miles",
    miles: 3,
    unit: "per 12 oz",
    variants: [
      { label: "12 oz, whole bean", price: 15.0 },
      { label: "12 oz, ground for filter", price: 15.0 },
      { label: "12 oz, ground for espresso", price: 15.0 },
    ],
    tags: ["Local"],
    blurb:
      "What we drink behind the counter: chocolate, stone fruit, a long sweet finish.",
    description:
      "Long Table roast our blend every Tuesday from a washed Colombian and a natural Ethiopian. It works as espresso and as filter. Ground coffee is ground the morning it ships.",
    storage:
      "Airtight, away from light. Best within a month of the roast date.",
    rank: 20,
  },
];

/* ---------- Recipes ---------- */

export type Diet = "Vegetarian" | "Vegan" | "Fish" | "Gluten-free";
export const diets: Diet[] = ["Vegetarian", "Vegan", "Fish", "Gluten-free"];

export type Ingredient = {
  /** Quantity for the recipe's base `serves`; scaled linearly. */
  amount: number;
  unit: string;
  item: string;
  /** Links the line to a product we sell: which variant, and what share of one pack the base `serves` uses (0.1 = a tenth of the bottle). */
  product?: { id: string; variant: number; packs: number };
  /** Stays the same whatever the servings: a pinch, a handful, one loaf for the table. */
  fixed?: boolean;
};

export type Recipe = {
  slug: string;
  name: string;
  photo: Photo;
  minutes: number;
  serves: number;
  diets: Diet[];
  intro: string;
  ingredients: Ingredient[];
  steps: string[];
  tip: string;
  cook: string;
};

export const recipes: Recipe[] = [
  {
    slug: "heirloom-shakshuka",
    name: "Heirloom tomato shakshuka",
    photo: {
      src: rShakshuka,
      alt: "Eggs baked in a red tomato and pepper sauce in a cast-iron pan, scattered with parsley",
      width: 1200,
      height: 901,
    },
    minutes: 35,
    serves: 4,
    diets: ["Vegetarian", "Gluten-free"],
    intro:
      "The best use of a pound of tomatoes that are a day too ripe for slicing. A pinch of saffron in the sauce is our addition, and it is not optional.",
    ingredients: [
      {
        amount: 2,
        unit: "lb",
        item: "heirloom tomatoes, roughly chopped",
        product: { id: "heirloom-tomatoes", variant: 1, packs: 1 },
      },
      {
        amount: 6,
        unit: "",
        item: "pasture-raised eggs",
        product: { id: "pasture-eggs", variant: 0, packs: 1 },
      },
      {
        amount: 4,
        unit: "cloves",
        item: "garlic, sliced",
        product: { id: "hardneck-garlic", variant: 0, packs: 0.15 },
      },
      {
        amount: 3,
        unit: "tbsp",
        item: "olive oil",
        product: { id: "olive-oil", variant: 0, packs: 0.1 },
      },
      {
        amount: 1,
        unit: "pinch",
        item: "saffron, steeped in 2 tbsp warm water",
        fixed: true,
        product: { id: "saffron-threads", variant: 0, packs: 1 },
      },
      { amount: 1, unit: "tsp", item: "ground cumin" },
      { amount: 1, unit: "tsp", item: "smoked paprika" },
      { amount: 1, unit: "handful", item: "parsley, chopped", fixed: true },
      {
        amount: 1,
        unit: "loaf",
        item: "sourdough, to mop up",
        fixed: true,
        product: { id: "country-sourdough", variant: 0, packs: 1 },
      },
    ],
    steps: [
      "Warm the olive oil in a wide pan over medium heat. Add the garlic, cumin and paprika and stir for a minute until fragrant.",
      "Add the tomatoes with a big pinch of salt. Simmer for 15 minutes, crushing them with a spoon, until thick and jammy.",
      "Stir in the saffron and its water. Make six hollows in the sauce and crack an egg into each.",
      "Cover and cook on low for 6 to 8 minutes, until the whites are set and the yolks still move.",
      "Scatter with parsley and bring the pan to the table with the bread.",
    ],
    tip: "If your tomatoes are watery, cook the sauce uncovered for five extra minutes before the eggs go in.",
    cook: "Teo Marchetti, head grocer",
  },
  {
    slug: "forager-risotto",
    name: "Forager's mushroom risotto with saffron",
    photo: {
      src: rRisotto,
      alt: "A shallow bowl of creamy risotto with mushrooms and herbs",
      width: 1400,
      height: 1054,
    },
    minutes: 45,
    serves: 4,
    diets: ["Vegetarian", "Gluten-free"],
    intro:
      "Half the mushrooms go in early to flavour the rice; the other half are seared hard and piled on top so you get both silk and crunch.",
    ingredients: [
      {
        amount: 1,
        unit: "lb",
        item: "forager's mushroom mix, torn",
        product: { id: "forager-mushrooms", variant: 1, packs: 1 },
      },
      { amount: 1.5, unit: "cups", item: "arborio rice" },
      { amount: 5, unit: "cups", item: "hot vegetable stock" },
      { amount: 0.5, unit: "cup", item: "dry white wine" },
      {
        amount: 1,
        unit: "pinch",
        item: "saffron, steeped in warm stock",
        fixed: true,
        product: { id: "saffron-threads", variant: 0, packs: 1 },
      },
      {
        amount: 2,
        unit: "cloves",
        item: "garlic, minced",
        product: { id: "hardneck-garlic", variant: 0, packs: 0.1 },
      },
      {
        amount: 2,
        unit: "tbsp",
        item: "olive oil",
        product: { id: "olive-oil", variant: 0, packs: 0.1 },
      },
      {
        amount: 2,
        unit: "oz",
        item: "aged gouda, finely grated",
        product: { id: "farmhouse-gouda", variant: 0, packs: 0.25 },
      },
      { amount: 2, unit: "tbsp", item: "butter" },
    ],
    steps: [
      "Sear half the mushrooms in a dry, very hot pan until browned. Season and set aside.",
      "In a heavy pan, soften the garlic and the remaining mushrooms in olive oil. Add the rice and stir for two minutes.",
      "Pour in the wine and let it bubble away. Add the stock a ladle at a time, stirring, for about 18 minutes.",
      "Stir in the saffron halfway through. The rice is ready when it is tender with a slight bite and loose enough to ripple.",
      "Off the heat, beat in the butter and gouda. Rest for two minutes, then top with the seared mushrooms.",
    ],
    tip: "Keep the stock at a simmer beside the risotto. Cold stock stops the rice cooking and makes it gluey.",
    cook: "Noor Haddad, founder",
  },
  {
    slug: "heirloom-tomato-tart",
    name: "Heirloom tomato tart",
    photo: {
      src: rTomatoTart,
      alt: "A round tart covered in overlapping roasted tomato halves, fresh from the oven",
      width: 1044,
      height: 1100,
    },
    minutes: 70,
    serves: 6,
    diets: ["Vegetarian"],
    intro:
      "A summer lunch that holds until early autumn. Salting the tomatoes first is the whole trick: it draws out the water that would otherwise sog the pastry.",
    ingredients: [
      {
        amount: 2,
        unit: "lb",
        item: "heirloom tomatoes, sliced ¼ inch thick",
        product: { id: "heirloom-tomatoes", variant: 1, packs: 1 },
      },
      { amount: 1, unit: "sheet", item: "all-butter puff pastry" },
      {
        amount: 3,
        unit: "oz",
        item: "aged gouda, grated",
        product: { id: "farmhouse-gouda", variant: 0, packs: 0.4 },
      },
      {
        amount: 1,
        unit: "",
        item: "egg, beaten",
        product: { id: "pasture-eggs", variant: 0, packs: 0.2 },
      },
      {
        amount: 2,
        unit: "cloves",
        item: "garlic, grated",
        product: { id: "hardneck-garlic", variant: 0, packs: 0.1 },
      },
      {
        amount: 2,
        unit: "tbsp",
        item: "olive oil",
        product: { id: "olive-oil", variant: 0, packs: 0.1 },
      },
      { amount: 1, unit: "tbsp", item: "thyme leaves" },
    ],
    steps: [
      "Lay the tomato slices on a rack, salt them well and leave for 30 minutes. Pat dry.",
      "Heat the oven to 400°F. Line a tart tin with the pastry and prick the base all over.",
      "Mix the gouda with the garlic and spread it over the base. Overlap the tomatoes on top in circles.",
      "Brush the pastry edge with egg, drizzle the tomatoes with oil and scatter with thyme.",
      "Bake for 35 to 40 minutes until the pastry is deep gold. Cool for 15 minutes before slicing.",
    ],
    tip: "Mix colours: a few yellow and green slices make the tart look like the market table it came from.",
    cook: "Pell Street Bakehouse",
  },
  {
    slug: "strawberry-shortcakes",
    name: "Strawberry shortcakes",
    photo: {
      src: rShortcake,
      alt: "A split biscuit filled with whipped cream and sliced strawberries",
      width: 1400,
      height: 929,
    },
    minutes: 50,
    serves: 6,
    diets: ["Vegetarian"],
    intro:
      "Tender honey biscuits, berries macerated just long enough to make their own syrup, and barely sweetened cream.",
    ingredients: [
      {
        amount: 2,
        unit: "pints",
        item: "strawberries, hulled and quartered",
        product: { id: "strawberries", variant: 1, packs: 1 },
      },
      {
        amount: 3,
        unit: "tbsp",
        item: "wildflower honey",
        product: { id: "wildflower-honey", variant: 0, packs: 0.2 },
      },
      { amount: 2, unit: "cups", item: "plain flour" },
      { amount: 1, unit: "tbsp", item: "baking powder" },
      { amount: 6, unit: "tbsp", item: "cold butter, cubed" },
      { amount: 0.75, unit: "cup", item: "buttermilk" },
      {
        amount: 1,
        unit: "",
        item: "egg, for brushing",
        product: { id: "pasture-eggs", variant: 0, packs: 0.2 },
      },
      { amount: 1, unit: "cup", item: "heavy cream" },
    ],
    steps: [
      "Toss the strawberries with 2 tbsp honey and leave for 30 minutes.",
      "Heat the oven to 425°F. Rub the butter into the flour and baking powder until it looks like coarse crumbs.",
      "Stir in the buttermilk and remaining honey until just combined. Pat out 1 inch thick and cut six rounds.",
      "Brush with egg and bake for 14 to 16 minutes until risen and golden. Cool slightly.",
      "Whip the cream to soft peaks. Split the biscuits and fill with berries, their syrup and the cream.",
    ],
    tip: "Handle the dough as little as possible. Lumps of butter are what make the layers.",
    cook: "June Okafor, delivery lead",
  },
  {
    slug: "grilled-salmon-leaf-salad",
    name: "Grilled salmon with leaf salad and crushed potatoes",
    photo: {
      src: rSalmon,
      alt: "A grilled salmon fillet on a plate with crushed potatoes and green salad",
      width: 1400,
      height: 933,
    },
    minutes: 25,
    serves: 2,
    diets: ["Fish", "Gluten-free"],
    intro:
      "A weeknight plate built around one good piece of fish. Everything else takes as long as the potatoes take to boil.",
    ingredients: [
      {
        amount: 2,
        unit: "",
        item: "salmon steaks",
        product: { id: "salmon-steaks", variant: 0, packs: 1 },
      },
      {
        amount: 1,
        unit: "lb",
        item: "new potatoes",
        product: { id: "new-potatoes", variant: 0, packs: 0.5 },
      },
      {
        amount: 1,
        unit: "head",
        item: "red leaf lettuce, torn",
        product: { id: "red-leaf-lettuce", variant: 0, packs: 1 },
      },
      {
        amount: 1,
        unit: "clove",
        item: "garlic, crushed",
        product: { id: "hardneck-garlic", variant: 0, packs: 0.05 },
      },
      {
        amount: 3,
        unit: "tbsp",
        item: "olive oil",
        product: { id: "olive-oil", variant: 0, packs: 0.1 },
      },
      { amount: 1, unit: "", item: "lemon" },
      { amount: 1, unit: "tsp", item: "Dijon mustard" },
    ],
    steps: [
      "Boil the potatoes from cold in salted water for 15 minutes until tender. Drain.",
      "Whisk the garlic, mustard, the juice of half the lemon and 2 tbsp olive oil into a dressing.",
      "Rub the salmon with the remaining oil and salt. Grill or pan-fry over high heat for 4 minutes a side.",
      "Crush the potatoes roughly with a fork and half the dressing.",
      "Dress the lettuce with the rest. Plate the salmon on the potatoes with the salad and a lemon wedge.",
    ],
    tip: "Do not move the salmon for the first three minutes. It releases from the pan when the skin is crisp.",
    cook: "Teo Marchetti, head grocer",
  },
  {
    slug: "spiced-chickpeas-carrots",
    name: "Spiced chickpeas with roast carrots",
    photo: {
      src: rChickpeas,
      alt: "A dark bowl of spiced chickpeas with vegetables and herbs on a wooden table",
      width: 1400,
      height: 1054,
    },
    minutes: 80,
    serves: 4,
    diets: ["Vegan", "Vegetarian", "Gluten-free"],
    intro:
      "Fresh-crop chickpeas cooked from dry, which makes them creamy all the way through, with carrots roasted until their edges catch.",
    ingredients: [
      {
        amount: 1,
        unit: "lb",
        item: "dried chickpeas, soaked overnight",
        product: { id: "dried-chickpeas", variant: 0, packs: 1 },
      },
      {
        amount: 2,
        unit: "bunches",
        item: "carrots, halved lengthways",
        product: { id: "bunched-carrots", variant: 1, packs: 1 },
      },
      {
        amount: 4,
        unit: "cloves",
        item: "garlic, sliced",
        product: { id: "hardneck-garlic", variant: 0, packs: 0.15 },
      },
      {
        amount: 4,
        unit: "tbsp",
        item: "olive oil",
        product: { id: "olive-oil", variant: 0, packs: 0.15 },
      },
      { amount: 2, unit: "tsp", item: "cumin seeds" },
      { amount: 1, unit: "tsp", item: "coriander seeds, crushed" },
      { amount: 1, unit: "tbsp", item: "maple syrup" },
      { amount: 1, unit: "handful", item: "coriander leaves", fixed: true },
    ],
    steps: [
      "Drain the soaked chickpeas, cover with fresh water by two inches and simmer for about an hour until creamy. Salt in the last ten minutes.",
      "Meanwhile heat the oven to 425°F. Toss the carrots with 2 tbsp oil, the maple syrup and salt. Roast for 30 minutes.",
      "Warm the remaining oil in a pan. Fry the cumin, coriander seeds and garlic until the garlic is golden.",
      "Drain the chickpeas, keeping a cup of the water. Toss them in the spiced oil with a splash of the water until glossy.",
      "Pile the carrots over the chickpeas and finish with the coriander leaves.",
    ],
    tip: "Keep the chickpea cooking water. It makes a silky base for soup tomorrow.",
    cook: "Noor Haddad, founder",
  },
];

/* ---------- Delivery ---------- */

export type DeliveryWindow = {
  id: string;
  label: string;
  start: number;
  fee: number;
};

export const deliveryWindows: DeliveryWindow[] = [
  { id: "08", label: "8 – 10am", start: 8, fee: 3.95 },
  { id: "10", label: "10am – 12pm", start: 10, fee: 2.95 },
  { id: "12", label: "12 – 2pm", start: 12, fee: 2.95 },
  { id: "16", label: "4 – 6pm", start: 16, fee: 3.95 },
  { id: "18", label: "6 – 8pm", start: 18, fee: 5.95 },
];

export type Zone = {
  id: number;
  name: string;
  area: string;
  zips: string[];
  surcharge: number;
  vehicle: string;
};

export const zones: Zone[] = [
  {
    id: 1,
    name: "Zone 1",
    area: "Orchard Row, the Flats and Canal Street, within 1½ miles",
    zips: ["40110", "40111", "40112"],
    surcharge: 0,
    vehicle: "cargo bike",
  },
  {
    id: 2,
    name: "Zone 2",
    area: "Wren Park, Hillcrest and Millbrook Heights, up to 4 miles",
    zips: ["40113", "40114", "40115", "40116"],
    surcharge: 1,
    vehicle: "electric van",
  },
];

export const delivery = {
  minimum: 30,
  freeOver: 75,
  greenDiscount: 1.5,
  cutoffHours: 3,
  steps: [
    {
      title: "You choose a slot",
      text: "Two-hour windows, seven days ahead. Same-day slots close three hours before they start.",
    },
    {
      title: "A grocer picks it",
      text: "One person picks your whole basket, checks every peach, and calls you if something is not good enough.",
    },
    {
      title: "We bring it round",
      text: "By cargo bike in Zone 1, electric van further out. Chilled food travels in an insulated crate with ice packs.",
    },
    {
      title: "The crate comes back",
      text: "Leave the crate, the ice packs and any egg cartons out next time. We collect them and wash them.",
    },
  ],
  faq: [
    {
      q: "What happens if something is out of stock?",
      a: "Each line in your basket has a swap setting. If it is on, your picker chooses the closest match at the same or a lower price and lists it on your receipt. If it is off, we leave the item out and you are not charged for it.",
    },
    {
      q: "Do I need to be home?",
      a: "No. Add a safe place at checkout. Chilled and frozen items stay below 41°F in the insulated crate for up to four hours, so a doorstep is fine for the length of your slot.",
    },
    {
      q: "Is there a minimum order?",
      a: "Baskets need to be at least $30 before delivery. Over $75, delivery is free in both zones, including the 6 – 8pm slot.",
    },
    {
      q: "What is a green slot?",
      a: "A slot when one of our riders is already booked on your street. Choosing it saves a trip, so we take $1.50 off the delivery fee.",
    },
    {
      q: "Can I change my order after placing it?",
      a: "Yes, until your slot's cut-off: three hours before it starts. Add, remove or change the slot from the confirmation email.",
    },
    {
      q: "How do tips work?",
      a: "Tipping is optional and you can add it after delivery. Riders keep every cent, and they are paid a full hourly wage either way.",
    },
  ],
};

/* ---------- People & places ---------- */

export type Grower = {
  name: string;
  place: string;
  miles: string;
  since: number;
  grows: string;
};

export const growers: Grower[] = [
  {
    name: "Pell Street Bakehouse",
    place: "Pell Street",
    miles: "1 block",
    since: 2014,
    grows: "Sourdough, croissants, galettes",
  },
  {
    name: "Long Table Roasters",
    place: "Canal Street",
    miles: "3 mi",
    since: 2016,
    grows: "Our house coffee blend",
  },
  {
    name: "Bramble Apiary",
    place: "Bramble Lane",
    miles: "9 mi",
    since: 2015,
    grows: "Raw wildflower honey",
  },
  {
    name: "Five Gate Growers",
    place: "Five Gate",
    miles: "14 mi",
    since: 2014,
    grows: "Carrots, lettuce, garlic, greens",
  },
  {
    name: "Hollis Bend Farm",
    place: "Hollis Bend",
    miles: "22 mi",
    since: 2017,
    grows: "Heirloom tomatoes, potatoes",
  },
  {
    name: "Wren Hill Farm",
    place: "Wren Hill",
    miles: "26 mi",
    since: 2018,
    grows: "Pasture-raised eggs",
  },
  {
    name: "Marrow Creek Farm",
    place: "Marrow Creek",
    miles: "31 mi",
    since: 2019,
    grows: "Strawberries, summer berries",
  },
  {
    name: "Linden Woods Foraging",
    place: "Linden Woods",
    miles: "39 mi",
    since: 2021,
    grows: "Wild mushrooms, ramps in spring",
  },
  {
    name: "Calder Orchard",
    place: "Calder Valley",
    miles: "48 mi",
    since: 2016,
    grows: "Peaches, apples, pears",
  },
  {
    name: "Daybreak Fishing Co.",
    place: "Port Ellery",
    miles: "74 mi",
    since: 2020,
    grows: "Line-caught halibut, salmon",
  },
];

export const team = [
  {
    name: "Noor Haddad",
    role: "Founder & buyer",
    bio: "Opened Saffron in 2014 in her grandmother's old dry-goods shop. Still drives to every farm on the list at least once a season.",
  },
  {
    name: "Teo Marchetti",
    role: "Head grocer",
    bio: "Trains every picker. His rule: if you would not put it in your own basket, it does not go in anyone's.",
  },
  {
    name: "June Okafor",
    role: "Delivery lead",
    bio: "Runs the four cargo bikes and two vans, and planned the routes that make green slots possible.",
  },
  {
    name: "Iris Bell",
    role: "Fishmonger",
    bio: "Meets the Daybreak boats at Port Ellery three mornings a week and cuts every fillet to order.",
  },
];

export const testimonials = [
  {
    quote:
      "They rang me because the peaches I'd ordered weren't ripe enough and asked if I'd rather wait a day. No app has ever done that.",
    name: "Dana W.",
    where: "Wren Park",
  },
  {
    quote:
      "I pick the green slot every Thursday. The rider knows my dog's name and leaves the crate behind the gate.",
    name: "Marcus O.",
    where: "the Flats",
  },
  {
    quote:
      "The shakshuka recipe sent me everything I needed in one tap, down to the half gram of saffron.",
    name: "Priya S.",
    where: "Hillcrest",
  },
];

/* ---------- Page copy ---------- */

export const home = {
  hero: {
    title: "The corner market, delivered in a two-hour slot.",
    text: "Produce from ten farms within 75 miles, bread from the bakehouse down the street and fish landed this morning. A grocer picks your basket by hand and we bring it round by cargo bike.",
    photo: {
      src: heroMarket,
      alt: "Farmers market table with tomatoes, green beans, broccoli and cabbage spilling from orange baskets under handwritten price cards",
      width: 1500,
      height: 996,
    } satisfies Photo,
  },
  week: {
    title: "On the table this week",
    text: "The first flush of autumn, the last of the stone fruit. Prices are set every Monday from what the farms quote us.",
  },
  aisles: { title: "Walk the aisles" },
  slots: {
    title: "Pick when it turns up",
    text: "Seven days of two-hour windows. Green slots are cheaper because a rider is already on your street.",
  },
  recipe: {
    title: "Cook the week",
    text: "Every recipe is written by someone who works here and links to exactly what you need, scaled to how many you are feeding.",
  },
  growers: {
    title: "Where it comes from",
    text: "Ten suppliers, most of them within an hour's drive. We pay on delivery, never at thirty days.",
  },
  story: {
    title: "Named for the smallest thing on the shelf",
    text: "Noor's grandmother sold saffron by the gram from a tin behind the counter, weighed in front of you so you could see it was honest. That is still how we sell everything.",
    photo: {
      src: saffronStigmas,
      alt: "Three bright red saffron stigmas resting on woven yellow cloth",
      width: 1100,
      height: 738,
    } satisfies Photo,
  },
  close: {
    title: "Fill the crate. We'll bring it round.",
    text: "Start a basket now and choose your window at checkout. Nothing is charged until we have picked your order.",
  },
};

export const about = {
  title: "A market on Orchard Row since 2014",
  intro:
    "Saffron started as a single room of dry goods and a few crates of whatever Five Gate had too much of. Ten years on it is a full grocer with a fish counter, a bakehouse partner and a delivery round that covers most of Millbrook, still run from the same corner.",
  chapters: [
    {
      year: "2014",
      title: "The tin behind the counter",
      text: "Noor Haddad takes over her grandmother's dry-goods shop and keeps the one thing that mattered: the saffron tin, and the habit of weighing it in front of the customer.",
    },
    {
      year: "2016",
      title: "The farms come in",
      text: "Five Gate, Hollis Bend and Calder Orchard start delivering twice a week. The shop stops buying produce from wholesalers altogether.",
    },
    {
      year: "2019",
      title: "The first cargo bike",
      text: "June Okafor starts delivering to regulars who could not get to the shop. Within a year there are four bikes and a waiting list.",
    },
    {
      year: "2022",
      title: "Two-hour slots, seven days",
      text: "Online ordering opens with picking done by the same grocers who stock the shelves. Green slots follow a year later.",
    },
  ],
  standards: {
    title: "How we pick",
    items: [
      {
        title: "Ripe for when you eat it",
        text: "Tell us when you plan to eat fruit and we pick from the right end of the crate.",
      },
      {
        title: "A person, not a warehouse",
        text: "Every basket is picked by one grocer who signs the receipt.",
      },
      {
        title: "We call before we swap",
        text: "If the substitute is not obvious, we ring you rather than guess.",
      },
      {
        title: "Paper, crates, and that is it",
        text: "No plastic bags. The crate, ice packs and egg cartons come back with the next delivery.",
      },
    ],
  },
  photo: {
    src: rainbowCarrots,
    alt: "Carrots in purple, red, orange, yellow and white arranged in a circle",
    width: 620,
    height: 1000,
  } satisfies Photo,
  bike: {
    src: cargoBike,
    alt: "A cargo bike loaded high with cardboard boxes, parked on a quiet street",
    width: 1400,
    height: 837,
  } satisfies Photo,
};

export const deliveryPage = {
  title: "Book a delivery slot",
  intro:
    "Check your ZIP, pick a two-hour window and we hold it while you shop. Every window shows its price before you choose, green-slot discount included.",
  bike: about.bike,
};

export const newsletter = {
  title: "The Thursday list",
  text: "One email a week: what came in from the farms, what is about to end, and one recipe to use it in.",
};

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { to: "/aisles", label: "All aisles" },
      ...aisles.map((a) => ({ to: "/aisles/" + a.id, label: a.name })),
    ],
  },
  {
    title: "Cook & visit",
    links: [
      { to: "/recipes", label: "Recipes" },
      { to: "/delivery", label: "Delivery slots" },
      { to: "/about", label: "Our market" },
      { to: "/basket", label: "Your basket" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
];
