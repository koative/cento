import loaves from "./assets/loaves.jpg";
import countryLoaf from "./assets/country-loaf.jpg";
import rye from "./assets/rye.jpg";
import nineGrain from "./assets/nine-grain.jpg";
import rolls from "./assets/rolls.jpg";
import croissant from "./assets/croissant.jpg";
import cardamomBun from "./assets/cardamom-bun.jpg";
import cinnamonRoll from "./assets/cinnamon-roll.jpg";
import danish from "./assets/danish.jpg";
import cakeSlice from "./assets/cake-slice.jpg";
import blueberryCake from "./assets/blueberry-cake.jpg";
import starter from "./assets/starter.jpg";
import braided from "./assets/braided.jpg";
import oven from "./assets/oven.jpg";
import rackOven from "./assets/rack-oven.jpg";
import counter from "./assets/counter.jpg";

export const images = {
  loaves,
  oven,
  rackOven,
  counter,
  rolls,
  starter,
  braided,
};

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Proof",
  sector: "Artisan bakery",
  tagline: "Baked before you're up. Ready when you are.",
  address: ["41 Mill Lane", "Fernhill, OR 97405"],
  phone: "+1 555 0142",
  phoneHref: "tel:+15550142",
  email: "hello@proof.example",
  wholesaleEmail: "trade@proof.example",
  founded: 2016,
};

export const nav = [
  { to: "/today", label: "Today's bake" },
  { to: "/shop", label: "Order ahead" },
  { to: "/classes", label: "Classes" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "Our story" },
  { to: "/visit", label: "Visit" },
];

/** Opening hours by weekday, 0 = Sunday. Minutes after midnight; null = closed. */
export const hours: {
  day: string;
  open: number | null;
  close: number | null;
}[] = [
  { day: "Sunday", open: 450, close: 840 },
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: 420, close: 900 },
  { day: "Wednesday", open: 420, close: 900 },
  { day: "Thursday", open: 420, close: 900 },
  { day: "Friday", open: 420, close: 900 },
  { day: "Saturday", open: 450, close: 840 },
];

/** Order-ahead rules the pickup planner applies. */
export const pickupRules = {
  /** Orders for tomorrow close at this hour (24h clock). */
  cutoffHour: 18,
  /** How many days ahead customers may book. */
  horizonDays: 14,
  /** Bags are held until 13:00; pickup windows run hourly from opening until then. */
  holdUntil: 780,
};

/* --------------------------------------------------------------- products */

export type Category = "Bread" | "Pastry" | "Cakes" | "Pantry";
export type Diet = "Vegan" | "Wholegrain" | "Nut-free";

export type Product = {
  id: string;
  name: string;
  category: Category;
  blurb: string;
  description: string[];
  image: string;
  alt: string;
  sizes: { label: string; price: number }[];
  choice?: { label: string; options: string[] };
  /** Cakes can carry a short piped message. */
  inscription?: boolean;
  /** Days of notice the kitchen needs. 0 = from the shelf. */
  leadDays: number;
  /** Weekdays this is baked, 0 = Sunday. */
  bakeDays: number[];
  diet: Diet[];
  allergens: string[];
  specs: [string, string][];
  /** Lower is more popular; drives the default sort. */
  rank: number;
};

const everyDay = [0, 2, 3, 4, 5, 6];

export const categories: Category[] = ["Bread", "Pastry", "Cakes", "Pantry"];
export const diets: Diet[] = ["Vegan", "Wholegrain", "Nut-free"];

export const products: Product[] = [
  {
    id: "country-sourdough",
    name: "Country sourdough",
    category: "Bread",
    blurb: "Our everyday loaf. Dark crust, open crumb, a little sour.",
    description: [
      "The loaf we built the bakery around. Stone-ground wheat from Hollins Mill with ten percent whole rye, mixed at noon, folded through the afternoon and left in the walk-in overnight.",
      "We bake it hard, to a crust that crackles on the cooling rack for a good twenty minutes. Toast it, tear it, or keep it in a linen bag for the best part of a week.",
    ],
    image: countryLoaf,
    alt: "A round sourdough loaf with a deeply scored golden crust cooling on a wire rack",
    sizes: [
      { label: "Whole · 900 g", price: 9 },
      { label: "Half · 450 g", price: 5 },
    ],
    choice: {
      label: "Slicing",
      options: ["Unsliced", "Sliced thick", "Sliced thin"],
    },
    leadDays: 1,
    bakeDays: everyDay,
    diet: ["Vegan", "Nut-free"],
    allergens: ["Wheat (gluten)", "Rye (gluten)"],
    specs: [
      ["Flour", "Hollins Mill bread flour, 10% whole rye"],
      ["Fermentation", "36 hours, cold overnight"],
      ["Hydration", "78%"],
      ["Keeps", "5 days in a linen bag"],
    ],
    rank: 1,
  },
  {
    id: "seeded-rye",
    name: "Seeded rye",
    category: "Bread",
    blurb: "Dense, nutty and dark. Made for good butter and smoked fish.",
    description: [
      "A Nordic-style tin loaf: whole rye, cracked rye, sunflower, flax and a spoon of blackstrap. It is heavy in the hand on purpose.",
      "Rye needs a day to settle before it slices cleanly, so we bake it Thursday to Sunday and it tastes best on the second day.",
    ],
    image: rye,
    alt: "A dark rye loaf dusted with flour, its crust split along the top",
    sizes: [
      { label: "Tin · 1 kg", price: 11 },
      { label: "Half tin · 500 g", price: 6 },
    ],
    choice: { label: "Slicing", options: ["Unsliced", "Sliced thin"] },
    leadDays: 1,
    bakeDays: [0, 4, 5, 6],
    diet: ["Vegan", "Wholegrain", "Nut-free"],
    allergens: ["Rye (gluten)", "Wheat (gluten)"],
    specs: [
      ["Flour", "Whole and cracked rye, 15% wheat"],
      ["Seeds", "Sunflower, flax, caraway"],
      ["Baked", "Thursday to Sunday"],
      ["Keeps", "A week, wrapped"],
    ],
    rank: 4,
  },
  {
    id: "nine-grain",
    name: "Nine-grain porridge loaf",
    category: "Bread",
    blurb:
      "Soaked oats and grains folded into sourdough. Soft, sweet, crusted in seeds.",
    description: [
      "We cook a porridge of oats, millet, barley, spelt, buckwheat and four seeds the night before, then fold it through the sourdough. It keeps the crumb tender for days.",
      "The crust is rolled in sesame, poppy and pumpkin seeds. Wednesday, Friday and Saturday only — the porridge pot is big but not that big.",
    ],
    image: nineGrain,
    alt: "Close-up of a seeded sourdough loaf cut open to show a soft, grainy crumb",
    sizes: [{ label: "Loaf · 850 g", price: 10.5 }],
    choice: { label: "Slicing", options: ["Unsliced", "Sliced thick"] },
    leadDays: 1,
    bakeDays: [3, 5, 6],
    diet: ["Vegan", "Wholegrain", "Nut-free"],
    allergens: ["Wheat (gluten)", "Oats", "Barley", "Sesame"],
    specs: [
      ["Grains", "Oats, millet, barley, spelt, buckwheat"],
      ["Seeds", "Sesame, poppy, pumpkin, flax"],
      ["Baked", "Wednesday, Friday, Saturday"],
      ["Keeps", "4 days"],
    ],
    rank: 6,
  },
  {
    id: "milk-rolls",
    name: "Milk rolls",
    category: "Bread",
    blurb: "Soft, glossy, pull-apart rolls. School lunches, burgers, bacon.",
    description: [
      "A tangzhong dough enriched with whole milk and a little butter, baked tight together in a tray so the sides stay soft and the tops go glossy.",
      "Sold in bags of six. They freeze beautifully: ten minutes in a warm oven brings them right back.",
    ],
    image: rolls,
    alt: "Golden, glossy bread rolls fresh out of the oven, packed tightly on a tray",
    sizes: [
      { label: "Bag of 6", price: 7 },
      { label: "Bag of 12", price: 13 },
    ],
    leadDays: 1,
    bakeDays: everyDay,
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Milk", "Egg"],
    specs: [
      ["Dough", "Milk bread with tangzhong"],
      ["Weight", "70 g each"],
      ["Keeps", "2 days, or freeze"],
    ],
    rank: 5,
  },
  {
    id: "weekend-bag",
    name: "The weekend bread bag",
    category: "Bread",
    blurb: "A country loaf, a seeded rye and a bag of rolls. Saturday only.",
    description: [
      "Everything a household gets through between Saturday breakfast and Monday's packed lunch, in one paper bag with your name on it.",
      "Collect on a Saturday morning. We hold weekend bags until 1pm, then they go back on the counter.",
    ],
    image: loaves,
    alt: "Three dark loaves with seeded and flour-dusted crusts, wheat stems laid across them",
    sizes: [{ label: "Bag for 2–4 people", price: 24 }],
    leadDays: 2,
    bakeDays: [6],
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Rye (gluten)", "Milk", "Egg"],
    specs: [
      ["Inside", "Country sourdough, seeded rye, 6 milk rolls"],
      ["Saving", "$3 on buying them separately"],
      ["Collect", "Saturdays, 7:30 to 13:00"],
    ],
    rank: 3,
  },
  {
    id: "croissant",
    name: "Butter croissant",
    category: "Pastry",
    blurb:
      "Laminated over three days with cultured butter. 81 layers, give or take.",
    description: [
      "Day one we mix and rest the dough. Day two we lock in cultured butter from Eastfield Dairy and fold it three times. Day three we shape at 4am and bake at six.",
      "Order a box and we pack them in the order they came out of the oven, warmest on top.",
    ],
    image: croissant,
    alt: "A golden butter croissant on a white plate with a knife and napkin",
    sizes: [
      { label: "Single", price: 4.25 },
      { label: "Box of 4", price: 16 },
      { label: "Box of 6", price: 23 },
    ],
    choice: { label: "Bake", options: ["Golden", "Extra dark"] },
    leadDays: 1,
    bakeDays: everyDay,
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Milk", "Egg"],
    specs: [
      ["Butter", "Eastfield Dairy cultured, 82% fat"],
      ["Process", "3 days, 3 single folds"],
      ["Best", "The same morning"],
    ],
    rank: 2,
  },
  {
    id: "cardamom-knot",
    name: "Cardamom knot",
    category: "Pastry",
    blurb: "Swedish-style bun with freshly ground cardamom and pearl sugar.",
    description: [
      "We crack green cardamom pods every morning and grind them into the butter. The dough is twisted, knotted and brushed with a light syrup as it leaves the oven.",
      "Small, fragrant and not too sweet. The thing regulars order alongside everything else.",
    ],
    image: cardamomBun,
    alt: "A twisted cardamom bun on a plate with a knife, a hand reaching in",
    sizes: [
      { label: "Single", price: 4.5 },
      { label: "Box of 4", price: 17 },
    ],
    leadDays: 1,
    bakeDays: everyDay,
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Milk", "Egg"],
    specs: [
      ["Spice", "Green cardamom, ground daily"],
      ["Finish", "Syrup and pearl sugar"],
      ["Best", "Within 6 hours"],
    ],
    rank: 7,
  },
  {
    id: "cinnamon-roll",
    name: "Brown butter cinnamon roll",
    category: "Pastry",
    blurb: "Brown butter, Ceylon cinnamon, a thin crème fraîche glaze.",
    description: [
      "A soft brioche spiral filled with brown butter, muscovado and Ceylon cinnamon, finished with a glaze sharpened with crème fraîche so it never cloys.",
      "Big enough to share. Nobody does.",
    ],
    image: cinnamonRoll,
    alt: "A large glazed cinnamon roll with a spiral of brown sugar filling",
    sizes: [
      { label: "Single", price: 5 },
      { label: "Box of 4", price: 19 },
    ],
    leadDays: 1,
    bakeDays: everyDay,
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Milk", "Egg"],
    specs: [
      ["Dough", "Brioche"],
      ["Filling", "Brown butter, muscovado, Ceylon cinnamon"],
      ["Best", "Same day, or 20 s in the microwave"],
    ],
    rank: 8,
  },
  {
    id: "fruit-danish",
    name: "Seasonal fruit danish",
    category: "Pastry",
    blurb:
      "Croissant dough, vanilla custard, whatever fruit the farm stand had.",
    description: [
      "Our croissant dough cut into squares, filled with vanilla bean custard and topped with fruit from the Saturday farm stand — blueberries and blackberries through October, poached quince after that.",
      "Weekends only, because that is when the fruit comes in.",
    ],
    image: danish,
    alt: "Rows of square danish pastries filled with custard and berries",
    sizes: [
      { label: "Single", price: 5.25 },
      { label: "Box of 4", price: 20 },
    ],
    leadDays: 1,
    bakeDays: [0, 6],
    diet: [],
    allergens: ["Wheat (gluten)", "Milk", "Egg", "May contain almond"],
    specs: [
      ["Fruit now", "Blueberry and blackberry"],
      ["Baked", "Saturday and Sunday"],
      ["Best", "The same morning"],
    ],
    rank: 9,
  },
  {
    id: "earl-grey-cake",
    name: "Earl Grey & orange cake",
    category: "Cakes",
    blurb:
      "Tea-infused sponge, orange curd, poppy seeds, soft Earl Grey buttercream.",
    description: [
      "Three layers of Earl Grey sponge, each brushed with orange syrup and spread with our own orange curd, then wrapped in a loose, bergamot-scented buttercream.",
      "Celebration cakes need two days' notice. We can pipe a short message on top — write it below exactly as you want it.",
    ],
    image: cakeSlice,
    alt: "A tall slice of layered Earl Grey and orange cake on a white plate beside a coffee",
    sizes: [
      { label: '6" · serves 8', price: 42 },
      { label: '8" · serves 14', price: 64 },
    ],
    inscription: true,
    leadDays: 2,
    bakeDays: everyDay,
    diet: ["Nut-free"],
    allergens: ["Wheat (gluten)", "Milk", "Egg", "Poppy seed"],
    specs: [
      ["Layers", "3, with orange curd"],
      ["Notice", "2 days"],
      ["Keeps", "3 days, refrigerated"],
    ],
    rank: 10,
  },
  {
    id: "lemon-blueberry-cake",
    name: "Lemon, almond & blueberry cake",
    category: "Cakes",
    blurb:
      "A dense almond sponge full of blueberries, with a sharp lemon drizzle.",
    description: [
      "Ground almonds, brown butter and a lot of lemon zest, baked in a tray with blueberries pushed into the top. Cut into generous squares or sold whole.",
      "It is mostly almonds, so it is moist for days and works for anyone avoiding a lot of flour (though not gluten-free — it shares our ovens).",
    ],
    image: blueberryCake,
    alt: "A square of almond cake studded with blueberries on a brown plate",
    sizes: [
      { label: "Tray · 12 squares", price: 48 },
      { label: "Loaf · serves 6", price: 22 },
    ],
    inscription: true,
    leadDays: 2,
    bakeDays: everyDay,
    diet: [],
    allergens: ["Almond", "Wheat (gluten)", "Milk", "Egg"],
    specs: [
      ["Base", "Ground almond and brown butter"],
      ["Notice", "2 days"],
      ["Keeps", "4 days"],
    ],
    rank: 11,
  },
  {
    id: "starter-kit",
    name: "Proof starter kit",
    category: "Pantry",
    blurb:
      "A jar of our live starter, a bag of Hollins flour and a printed schedule.",
    description: [
      "Our starter has been fed twice a day since March 2016. We send it home in a clip-top jar with 2 kg of the same bread flour we use and the exact schedule we bake to.",
      "On the shelf every day we're open, so you can collect it the same morning.",
    ],
    image: starter,
    alt: "Looking down into a glass jar of bubbly, active sourdough starter",
    sizes: [{ label: "Kit", price: 18 }],
    leadDays: 0,
    bakeDays: everyDay,
    diet: ["Vegan", "Nut-free"],
    allergens: ["Wheat (gluten)", "Rye (gluten)"],
    specs: [
      ["Inside", "250 ml starter, 2 kg flour, schedule card"],
      ["Starter age", "Since March 2016"],
      ["Feed", "Within 2 days of collecting"],
    ],
    rank: 12,
  },
];

/* ------------------------------------------------------------- oven board */

export type Bake = {
  /** Minutes after midnight the batch comes out of the oven. */
  out: number;
  name: string;
  batch: string;
  /** When it usually sells out; null if it normally lasts until close. */
  gone: number | null;
  productId?: string;
};

/** A typical Tuesday's oven loads, in order. */
export const bakes: Bake[] = [
  {
    out: 340,
    name: "Country sourdough",
    batch: "64 loaves",
    gone: 810,
    productId: "country-sourdough",
  },
  {
    out: 360,
    name: "Butter croissants",
    batch: "96",
    gone: 640,
    productId: "croissant",
  },
  {
    out: 385,
    name: "Milk rolls",
    batch: "20 bags",
    gone: 720,
    productId: "milk-rolls",
  },
  {
    out: 410,
    name: "Cardamom knots",
    batch: "48",
    gone: 675,
    productId: "cardamom-knot",
  },
  {
    out: 435,
    name: "Brown butter cinnamon rolls",
    batch: "40",
    gone: 690,
    productId: "cinnamon-roll",
  },
  {
    out: 480,
    name: "Seeded rye",
    batch: "24 tins",
    gone: null,
    productId: "seeded-rye",
  },
  {
    out: 525,
    name: "Nine-grain porridge loaf",
    batch: "30 loaves",
    gone: 840,
    productId: "nine-grain",
  },
  {
    out: 570,
    name: "Second croissant bake",
    batch: "60",
    gone: 760,
    productId: "croissant",
  },
  { out: 645, name: "Potato & rosemary focaccia", batch: "6 trays", gone: 870 },
  {
    out: 735,
    name: "Afternoon sourdough",
    batch: "30 loaves",
    gone: null,
    productId: "country-sourdough",
  },
  {
    out: 780,
    name: "Lemon, almond & blueberry squares",
    batch: "2 trays",
    gone: null,
    productId: "lemon-blueberry-cake",
  },
];

export const boardRange = { start: 315, end: 900 };

/* ---------------------------------------------------------------- classes */

export type BakeClass = {
  id: string;
  name: string;
  level: "Beginner" | "Confident" | "Family";
  duration: string;
  price: number;
  image: string;
  alt: string;
  summary: string;
  intro: string[];
  agenda: [string, string][];
  takeHome: string[];
  teacher: string;
  sessions: { date: string; time: string; left: number }[];
};

export const classes: BakeClass[] = [
  {
    id: "sourdough-from-scratch",
    name: "Sourdough from scratch",
    level: "Beginner",
    duration: "5 hours",
    price: 145,
    image: starter,
    alt: "An active sourdough starter, bubbling in a glass jar",
    summary:
      "Starter care, mixing, folding and shaping. You leave with a loaf, a dough and a jar of starter.",
    intro: [
      "The class we get asked about most. Hester walks you through a full bake cycle at a kitchen-sized scale: feeding a starter, mixing by hand, judging bulk fermentation by eye and feel, and shaping a tight boule.",
      "Because sourdough takes longer than a Saturday, you bake a loaf we started for you on Friday, and take home your own dough to bake on Sunday.",
    ],
    agenda: [
      ["9:00", "Coffee, cardamom knots, and what a starter actually is"],
      ["9:30", "Mixing and autolyse by hand"],
      ["10:30", "Stretch and folds; reading the dough"],
      ["11:45", "Shaping boules and batards"],
      ["12:30", "Lunch from the counter"],
      ["13:15", "Scoring and baking the loaf we started yesterday"],
    ],
    takeHome: [
      "A baked loaf",
      "Your own shaped dough in a banneton",
      "A jar of Proof starter",
      "The printed schedule",
    ],
    teacher: "Hester Okafor",
    sessions: [
      { date: "2026-11-07", time: "9:00 – 14:00", left: 3 },
      { date: "2026-11-21", time: "9:00 – 14:00", left: 6 },
      { date: "2026-12-05", time: "9:00 – 14:00", left: 8 },
    ],
  },
  {
    id: "croissant-weekend",
    name: "The croissant weekend",
    level: "Confident",
    duration: "2 mornings",
    price: 230,
    image: croissant,
    alt: "A finished butter croissant on a plate",
    summary:
      "Two mornings of lamination: butter blocks, folds, shaping, proofing and a properly dark bake.",
    intro: [
      "Laminated dough rewards patience and cold hands. Over two mornings Tomas teaches the method we use downstairs, scaled down for a home fridge.",
      "Saturday covers dough, the butter block and three folds. Sunday is shaping croissants and pain au chocolat, proofing them properly, and baking until they shatter.",
    ],
    agenda: [
      ["Sat 8:30", "Detrempe, butter block, and why temperature is everything"],
      ["Sat 10:00", "Lock-in and three single folds"],
      ["Sun 8:30", "Cutting and shaping croissants and pain au chocolat"],
      ["Sun 10:30", "Proofing, egg wash and baking"],
    ],
    takeHome: [
      "12 baked pastries",
      "A frozen batch to bake at home",
      "Lamination notes with temperatures",
    ],
    teacher: "Tomas Lind",
    sessions: [
      { date: "2026-11-14", time: "Sat & Sun, 8:30 – 12:30", left: 2 },
      { date: "2026-12-12", time: "Sat & Sun, 8:30 – 12:30", left: 7 },
    ],
  },
  {
    id: "braids-and-enriched",
    name: "Braids & enriched doughs",
    level: "Beginner",
    duration: "4 hours",
    price: 120,
    image: braided,
    alt: "A proofed, three-colour braided loaf in a glass dish",
    summary:
      "Milk bread, challah-style braids and cardamom knots. Soft doughs, satisfying shapes.",
    intro: [
      "Enriched doughs are forgiving and fast, which makes them the perfect first step into bread. We make one dough and turn it into three things.",
      "You'll learn three-, four- and six-strand braids, how to knot a cardamom bun, and how to tell when a soft dough is properly proofed.",
    ],
    agenda: [
      ["13:00", "One enriched dough, mixed by hand"],
      ["14:00", "Braiding three, four and six strands"],
      ["15:00", "Knotting cardamom buns"],
      ["16:00", "Baking, glazing, packing up"],
    ],
    takeHome: ["A braided loaf", "Six cardamom knots", "Recipe cards"],
    teacher: "Priya Raman",
    sessions: [
      { date: "2026-11-08", time: "13:00 – 17:00", left: 5 },
      { date: "2026-11-29", time: "13:00 – 17:00", left: 9 },
    ],
  },
  {
    id: "rye-and-nordic",
    name: "Rye & Nordic breads",
    level: "Confident",
    duration: "4 hours",
    price: 125,
    image: rye,
    alt: "A dark, flour-dusted rye loaf",
    summary:
      "Sour rye, tin loaves and crispbread. A class about a grain that behaves nothing like wheat.",
    intro: [
      "Rye has almost no gluten, ferments fast and wants to be handled like wet clay. Once it clicks, it is the easiest bread there is.",
      "We make a seeded tin loaf, a rye crispbread you can bake at home tonight, and talk through keeping a rye starter alongside a wheat one.",
    ],
    agenda: [
      ["9:00", "Rye flour, grades and why it is sticky"],
      ["9:45", "Mixing a seeded tin loaf"],
      ["11:00", "Rolling and docking crispbread"],
      ["12:15", "Baking, tasting, smoked fish and butter"],
    ],
    takeHome: [
      "A seeded rye tin (bake at home)",
      "A stack of crispbread",
      "Rye starter",
    ],
    teacher: "Tomas Lind",
    sessions: [{ date: "2026-11-28", time: "9:00 – 13:00", left: 4 }],
  },
  {
    id: "saturday-kids-bake",
    name: "Saturday kids' bake",
    level: "Family",
    duration: "2 hours",
    price: 45,
    image: rolls,
    alt: "Glossy milk rolls just out of the oven",
    summary:
      "For ages 6–12 with a grown-up. Shape rolls, knot buns, get floury.",
    intro: [
      "A loud, floury morning in the classroom. Kids shape milk rolls and cardamom knots, decorate a bread animal, and take everything home warm.",
      "Price is per child; one grown-up per child comes free and gets coffee.",
    ],
    agenda: [
      ["10:00", "Wash hands, aprons on, meet the dough"],
      ["10:15", "Shaping rolls and bread animals"],
      ["11:00", "Knotting buns while things bake"],
      ["11:45", "Packing up the warm haul"],
    ],
    takeHome: ["Six rolls", "Two buns", "One bread animal", "An apron"],
    teacher: "Priya Raman",
    sessions: [
      { date: "2026-11-07", time: "10:00 – 12:00", left: 0 },
      { date: "2026-11-21", time: "10:00 – 12:00", left: 5 },
      { date: "2026-12-19", time: "10:00 – 12:00", left: 10 },
    ],
  },
  {
    id: "celebration-cakes",
    name: "Layer cakes for a crowd",
    level: "Confident",
    duration: "4 hours",
    price: 135,
    image: cakeSlice,
    alt: "A slice of three-layer Earl Grey cake",
    summary:
      "Sponges, curds, syrups and a buttercream that holds. Stack and finish an 8-inch cake.",
    intro: [
      "Our cake bench, opened up. Odile shows how we bake level sponges, make curd that sets, and get a smooth, loose finish without any special equipment.",
      "You stack and finish your own 8-inch Earl Grey & orange cake and take it home in a box.",
    ],
    agenda: [
      ["13:00", "Sponges and syrups"],
      ["14:00", "Orange curd and Swiss meringue buttercream"],
      ["15:00", "Leveling, stacking, crumb coat"],
      ["16:00", "Final coat and piping"],
    ],
    takeHome: ['Your finished 8" cake', "Curd and buttercream recipes"],
    teacher: "Odile Marchetti",
    sessions: [
      { date: "2026-11-15", time: "13:00 – 17:00", left: 6 },
      { date: "2026-12-06", time: "13:00 – 17:00", left: 3 },
    ],
  },
];

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Baked before you're up.",
  lede: "A sourdough bakery on Mill Lane. We start at 3:30, the first loaves leave the oven at 5:40, and anything you order ahead is bagged with your name on it by seven.",
  orderNote: "Order by 6pm, collect from 7am.",
  method: {
    title: "Thirty-six hours for one loaf.",
    body: "Our country sourdough is mixed at noon, folded through the afternoon, shaped at dusk and left in the walk-in overnight. The cold slows the yeast and lets the flavour catch up. By the time you buy it, it has been working longer than we have.",
  },
  pickup: [
    {
      title: "Pick your bake",
      body: "Loaves, pastries and cakes from the order-ahead list. Rye and danishes only on the days we bake them.",
    },
    {
      title: "Choose a morning",
      body: "The pickup planner only offers days your whole order can be ready. Cakes need two days' notice.",
    },
    {
      title: "Collect at the side window",
      body: "Your bag waits on the named shelf by the door. Skip the line, pay at the window.",
    },
  ],
  quote: {
    text: "I've bought the country loaf every Saturday for six years. My kids think bread just comes with a crust you can hear.",
    name: "Margaret Ellison",
    detail: "Mill Lane, since 2017",
  },
};

/* ----------------------------------------------------------------- about */

export const story = {
  title: "A bakery that starts in the dark.",
  lede: "Proof opened in 2016 in a former print shop on Mill Lane, with one deck oven, a secondhand mixer and a sourdough starter Hester had kept alive through three apartments.",
  chapters: [
    {
      year: "2016",
      title: "One oven, sixty loaves",
      body: "We opened with two breads and a croissant and sold out by ten most mornings. The queue went past the laundromat. We learned to bake more.",
    },
    {
      year: "2018",
      title: "Hollins Mill",
      body: "We started buying all our wheat and rye from Hollins Mill, thirty miles north, stone-ground the week we bake it. The loaves got darker and sweeter.",
    },
    {
      year: "2021",
      title: "The classroom",
      body: "The old print room upstairs became a teaching kitchen with eight benches. Most weekends there is someone up there with flour to the elbow.",
    },
    {
      year: "2024",
      title: "Bread for the neighbourhood",
      body: "We now bake for nineteen cafés, restaurants and grocers on three morning rounds — always after the shop counter is full, never before.",
    },
  ],
  principles: [
    {
      title: "Flour from people we know",
      body: "Every grain comes from Hollins Mill, milled within a week of baking. We visit at harvest and taste the year's wheat before we commit to it.",
    },
    {
      title: "Time instead of additives",
      body: "No improvers, no commercial yeast in the sourdoughs, nothing to speed things up. Long, cold fermentation does the work.",
    },
    {
      title: "Nothing goes in the bin",
      body: "Yesterday's bread becomes croutons, breadcrumbs and bread pudding. What's left goes to the Fernhill food pantry at close.",
    },
  ],
};

export const team = [
  {
    name: "Hester Okafor",
    role: "Founder, head baker",
    shift: "In at 3:30",
    bio: "Kept the starter alive through three apartments before there was a bakery to put it in. Runs the bread bench and teaches sourdough.",
  },
  {
    name: "Tomas Lind",
    role: "Co-founder, pastry",
    shift: "In at 4:00",
    bio: "Trained in Malmö, which explains the cardamom. Laminates every croissant dough by hand and teaches the croissant weekend.",
  },
  {
    name: "Odile Marchetti",
    role: "Cakes",
    shift: "In at 7:00",
    bio: "Runs the cake bench and all celebration orders. Will talk you out of fondant.",
  },
  {
    name: "Priya Raman",
    role: "Classes & kids' bakes",
    shift: "Weekends",
    bio: "A former primary teacher who now teaches braiding to adults and dough animals to six-year-olds.",
  },
  {
    name: "Dev Castillo",
    role: "Wholesale & deliveries",
    shift: "On the road at 5:15",
    bio: "Drives the morning rounds in the van and knows the back door of every café in Fernhill.",
  },
];

/* ------------------------------------------------------------- wholesale */

export const wholesale = {
  title: "Bread for your counter, delivered before you open.",
  lede: "We bake for cafés, restaurants and grocers within twelve miles of Mill Lane. Order by 2pm, and it arrives on your doorstep the next morning, still warm if you open early.",
  segments: [
    {
      title: "Cafés",
      body: "Croissants, knots and cinnamon rolls delivered by 6:45, plus sliced sourdough for toast and sandwiches.",
    },
    {
      title: "Restaurants",
      body: "Dinner rolls, focaccia and half loaves for the bread course, delivered with the afternoon round.",
    },
    {
      title: "Grocers & delis",
      body: "Bagged, labelled loaves with allergen information, ready for the shelf.",
    },
  ],
  rounds: [
    {
      name: "Dawn round",
      areas: "Mill Lane, Old Town, Riverside",
      window: "5:30 – 6:45",
    },
    {
      name: "Morning round",
      areas: "Fernhill Heights, Eastfield, Station Road",
      window: "7:00 – 8:30",
    },
    {
      name: "Afternoon round",
      areas: "Restaurants citywide",
      window: "14:00 – 15:30",
    },
  ],
  prices: [
    { item: "Country sourdough, 900 g", unit: "loaf", price: 6.2, min: "6" },
    {
      item: "Country sourdough, sliced sandwich tin",
      unit: "loaf",
      price: 6.8,
      min: "4",
    },
    { item: "Seeded rye, 1 kg tin", unit: "loaf", price: 7.6, min: "4" },
    { item: "Butter croissant", unit: "each", price: 2.4, min: "12" },
    { item: "Cardamom knot", unit: "each", price: 2.6, min: "12" },
    { item: "Brown butter cinnamon roll", unit: "each", price: 2.9, min: "8" },
    { item: "Milk dinner rolls", unit: "dozen", price: 7.5, min: "2" },
    {
      item: "Potato & rosemary focaccia",
      unit: "half tray",
      price: 19,
      min: "1",
    },
  ],
  terms: [
    "No minimum spend; the minimums above are per item, per delivery.",
    "Standing orders can change until 2pm the day before.",
    "Invoiced fortnightly, 14-day terms.",
    "A free trial delivery before you commit.",
  ],
};

/* ----------------------------------------------------------------- visit */

export const visit = {
  title: "41 Mill Lane, under the old print-shop sign.",
  lede: "The shop counter opens at seven. Order-ahead bags wait at the side window, on the left as you face the door.",
  notes: [
    {
      title: "Getting here",
      body: "Two minutes from Mill Lane station. Bike racks out front; free parking on Hollis Street after 8am.",
    },
    {
      title: "Access",
      body: "Step-free entrance and counter. The classroom upstairs has a lift; ask at the counter.",
    },
    {
      title: "Dogs",
      body: "Very welcome in the shop. There's a water bowl and, on Saturdays, a box of bread ends.",
    },
  ],
  faq: [
    {
      q: "What time do you sell out?",
      a: "Croissants usually go by half past ten, the country loaf by early afternoon. The Today's bake page shows a typical day; ordering ahead is the only way to be sure.",
    },
    {
      q: "Can I change or cancel an order ahead?",
      a: "Yes, until 6pm the day before pickup. Call or email us with the order number from your confirmation. Celebration cakes can be changed until 48 hours before.",
    },
    {
      q: "What if I can't collect on time?",
      a: "We hold order-ahead bags until 1pm. After that they go on the counter at full price and we'll refund you, no questions, the first time.",
    },
    {
      q: "Do you make gluten-free bread?",
      a: "No. Everything is made in one room full of wheat and rye flour, so we can't promise anything is free of gluten. Our vegan loaves are marked in the shop.",
    },
    {
      q: "How do I store sourdough?",
      a: "Cut side down on a board for the first day, then in a linen or paper bag. Never the fridge. It freezes well sliced; toast straight from frozen.",
    },
    {
      q: "Do you take payment online?",
      a: "Not yet. Order-ahead is reserved online and paid at the side window, by card or cash.",
    },
  ],
};

/* ---------------------------------------------------------------- footer */

export const footer = {
  newsletter: {
    title: "The Thursday bake list",
    body: "Next week's specials, class dates as they open, and when the danish fruit changes. One email, Thursday mornings.",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};
