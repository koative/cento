import kettles from "./assets/kettles.jpg";
import brewhouse from "./assets/brewhouse.jpg";
import cellar from "./assets/cellar.jpg";
import flight from "./assets/flight.jpg";
import flightWindow from "./assets/flight-window.jpg";
import hopBarn from "./assets/hop-barn.jpg";
import hopBines from "./assets/hop-bines.jpg";
import malt from "./assets/malt.jpg";
import porter from "./assets/porter.jpg";
import pretzel from "./assets/pretzel.jpg";
import tour from "./assets/tour.jpg";
import yard from "./assets/yard.jpg";
import canning from "./assets/canning.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Kettle",
  legal: "Kettle Brewing Co.",
  tagline:
    "Small-batch beer, boiled in copper and poured twelve feet from the kettle.",
  email: "hello@kettle.example",
  phone: "+1 555 014 7720",
  phoneHref: "tel:+15550147720",
  street: "1180 Tannery Row",
  city: "Riverbend, OR 97214",
  founded: 2016,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Untappd", href: "https://untappd.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/beers", label: "Beers" },
  { to: "/taproom", label: "Taproom" },
  { to: "/events", label: "Events" },
  { to: "/tours", label: "Tours" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Story" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Drink",
    links: [
      { to: "/beers", label: "All beers" },
      { to: "/taproom", label: "Taproom menu" },
      { to: "/events", label: "Events" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/tours", label: "Book a tour" },
      { to: "/about", label: "Our story" },
      { to: "/taproom", label: "Hours & house rules" },
    ],
  },
  {
    title: "Take home",
    links: [
      { to: "/shop", label: "Shop cans & merch" },
      { to: "/cart", label: "Your pickup order" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
];

export const newsletter = {
  title: "The Brew Sheet",
  text: "One email a month: what's going into the fermenters, release dates and bottle limits. No spam, ever.",
};

export const ageGate = {
  title: "Old enough for a pint?",
  text: "Kettle brews alcoholic beer. You need to be 21 or older to look around.",
  yes: "I'm 21 or older",
  no: "Not yet",
  refused:
    "Then we'll see you on your 21st birthday. Bring ID — the first pour is on us.",
  note: "We remember your answer on this device only.",
};

/* ------------------------------------------------------------ hours */

/** [open, close] in 24h time, Sunday first; null = closed. "23:59" reads as midnight. */
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

export const hours: Hours[] = [
  ["12:00", "20:00"],
  null,
  ["15:00", "22:00"],
  ["15:00", "22:00"],
  ["15:00", "23:00"],
  ["12:00", "23:59"],
  ["11:00", "23:59"],
];

export const kitchenHours = "Kitchen hatch closes one hour before the taproom.";

/* ------------------------------------------------------------ beers */

export type Family = "crisp" | "hoppy" | "farmhouse" | "sour" | "dark";
export type GlassShape = "pint" | "stange" | "tulip" | "snifter";

export type Beer = {
  slug: string;
  name: string;
  style: string;
  family: Family;
  abv: number;
  ibu: number;
  /** Standard Reference Method colour, 1 (straw) to 40 (black). */
  srm: number;
  /** Overrides the SRM colour when fruit changes the hue. */
  tint?: string;
  og: number;
  fg: number;
  glass: GlassShape;
  /** Printed label colour for cans and badges. */
  label: string;
  tap: number | null;
  pour: { size: string; price: number };
  availability: "Year-round" | "Seasonal" | "Limited";
  shopId?: string;
  back?: string;
  short: string;
  story: string;
  notes: { aroma: string; palate: string; finish: string };
  malts: { name: string; pct: number }[];
  hops: { name: string; use: string }[];
  yeast: string;
  ferment: string;
  pairing: string[];
};

export const families: { id: Family; label: string }[] = [
  { id: "crisp", label: "Crisp & lager" },
  { id: "hoppy", label: "Hoppy" },
  { id: "farmhouse", label: "Farmhouse" },
  { id: "sour", label: "Sour & fruit" },
  { id: "dark", label: "Dark & strong" },
];

export const beers: Beer[] = [
  {
    slug: "tannery-pils",
    name: "Tannery Pils",
    style: "German-style pilsner",
    family: "crisp",
    abv: 4.9,
    ibu: 34,
    srm: 3,
    og: 1.047,
    fg: 1.009,
    glass: "stange",
    label: "#2f5848",
    tap: 1,
    pour: { size: "16 oz", price: 7 },
    availability: "Year-round",
    shopId: "tannery-pils-4pack",
    short: "The beer we drink after a brew day. Bready, floral, snappy dry.",
    story:
      "Our first recipe and still the one the brewers reach for. We decoct a portion of the mash in the copper kettle for a deeper bready note, then lager it cold for six weeks so it pours bright without filtering.",
    notes: {
      aroma: "Fresh bread crust, meadow flowers, a little lemon pith",
      palate: "Light body, firm and clean",
      finish: "Bone-dry, lingering herbal bitterness",
    },
    malts: [
      { name: "German pilsner malt", pct: 94 },
      { name: "Light Munich", pct: 4 },
      { name: "Acidulated malt", pct: 2 },
    ],
    hops: [
      { name: "Hallertau Mittelfrüh", use: "60-minute boil" },
      { name: "Tettnang", use: "15-minute boil" },
      { name: "Saphir", use: "Whirlpool" },
    ],
    yeast: "Bavarian lager strain",
    ferment: "10 days at 50°F, lagered 6 weeks at 32°F",
    pairing: ["Bavarian pretzel", "Fried pickles", "Anything off the grill"],
  },
  {
    slug: "foundry-lager",
    name: "Foundry Lager",
    style: "Vienna lager",
    family: "crisp",
    abv: 5.2,
    ibu: 22,
    srm: 11,
    og: 1.051,
    fg: 1.011,
    glass: "pint",
    label: "#8a3b1c",
    tap: 2,
    pour: { size: "16 oz", price: 7 },
    availability: "Year-round",
    shopId: "foundry-lager-4pack",
    short: "Amber, toasty and gentle. The taproom's quiet best-seller.",
    story:
      "Named for the iron foundry that used to sit across Tannery Row. Vienna malt does most of the talking: toasted bread, a whisper of caramel, and a soft bitterness that keeps the next sip coming.",
    notes: {
      aroma: "Toasted bread, light caramel, hazelnut",
      palate: "Medium-light, round malt",
      finish: "Clean, gently bitter",
    },
    malts: [
      { name: "Vienna malt", pct: 70 },
      { name: "Pilsner malt", pct: 22 },
      { name: "Caramunich II", pct: 6 },
      { name: "Melanoidin", pct: 2 },
    ],
    hops: [
      { name: "Magnum", use: "60-minute boil" },
      { name: "Hallertau Tradition", use: "20-minute boil" },
    ],
    yeast: "Munich lager strain",
    ferment: "12 days at 51°F, lagered 5 weeks",
    pairing: ["Smoked brisket sandwich", "Stout chili", "Aged cheddar"],
  },
  {
    slug: "low-water",
    name: "Low Water",
    style: "Hazy IPA",
    family: "hoppy",
    abv: 6.6,
    ibu: 40,
    srm: 5,
    og: 1.064,
    fg: 1.014,
    glass: "tulip",
    label: "#c9802a",
    tap: 3,
    pour: { size: "16 oz", price: 8 },
    availability: "Year-round",
    shopId: "low-water-4pack",
    short: "Soft, juicy and hazy, with Citra and Nelson in every pour.",
    story:
      "Brewed every two weeks so it never sits around. Oats and wheat give it a pillowy body; two rounds of dry-hopping during active fermentation pile on the tropical fruit.",
    notes: {
      aroma: "Ripe mango, white grape, passion fruit",
      palate: "Pillowy, low bitterness, juicy",
      finish: "Soft, faint pine",
    },
    malts: [
      { name: "Two-row pale malt", pct: 68 },
      { name: "Flaked oats", pct: 18 },
      { name: "White wheat", pct: 12 },
      { name: "Honey malt", pct: 2 },
    ],
    hops: [
      { name: "Citra", use: "Whirlpool & dry hop" },
      { name: "Nelson Sauvin", use: "Dry hop" },
      { name: "Mosaic", use: "Dry hop" },
    ],
    yeast: "London ale III",
    ferment: "6 days at 66°F, dry-hopped twice",
    pairing: ["Spent-grain flatbread", "Fish tacos", "Spicy wings"],
  },
  {
    slug: "rivet",
    name: "Rivet",
    style: "West Coast IPA",
    family: "hoppy",
    abv: 7.0,
    ibu: 68,
    srm: 7,
    og: 1.065,
    fg: 1.01,
    glass: "pint",
    label: "#365f86",
    tap: 4,
    pour: { size: "16 oz", price: 8 },
    availability: "Year-round",
    shopId: "rivet-4pack",
    short: "Bright, resinous and properly bitter. A clear IPA with a backbone.",
    story:
      "For anyone who misses IPAs you could read through. A lean malt bill and a long boil schedule let Simcoe and Centennial snap; it finishes dry enough to want another.",
    notes: {
      aroma: "Grapefruit peel, pine needles, dank resin",
      palate: "Medium body, assertive bitterness",
      finish: "Dry, resinous, long",
    },
    malts: [
      { name: "Two-row pale malt", pct: 88 },
      { name: "Light crystal 15L", pct: 6 },
      { name: "Dextrose", pct: 6 },
    ],
    hops: [
      { name: "Columbus", use: "60-minute boil" },
      { name: "Centennial", use: "10-minute boil" },
      { name: "Simcoe", use: "Whirlpool & dry hop" },
      { name: "Chinook", use: "Dry hop" },
    ],
    yeast: "Clean American ale",
    ferment: "7 days at 64°F, crashed and dry-hopped cold",
    pairing: ["Brisket sandwich", "Blue cheese", "Carrot cake"],
  },
  {
    slug: "slow-boil",
    name: "Slow Boil",
    style: "Double IPA",
    family: "hoppy",
    abv: 8.4,
    ibu: 75,
    srm: 6,
    og: 1.078,
    fg: 1.013,
    glass: "tulip",
    label: "#6b2f5b",
    tap: 5,
    pour: { size: "12 oz", price: 9 },
    availability: "Limited",
    short: "A two-hour boil, a double dose of hops, and no shortcuts.",
    story:
      "We give this one the whole afternoon: a 120-minute boil for depth and colour, then a hop charge we have to weigh twice. Taproom only, and gone in about three weeks.",
    notes: {
      aroma: "Tangerine, sticky pine, honeyed malt",
      palate: "Full, warming, sweet-bitter balance",
      finish: "Long and resinous",
    },
    malts: [
      { name: "Two-row pale malt", pct: 84 },
      { name: "Golden Promise", pct: 10 },
      { name: "Dextrose", pct: 6 },
    ],
    hops: [
      { name: "Warrior", use: "90-minute boil" },
      { name: "Amarillo", use: "Whirlpool" },
      { name: "Strata", use: "Dry hop" },
      { name: "Citra", use: "Dry hop" },
    ],
    yeast: "Clean American ale",
    ferment: "9 days at 65°F, two dry-hop charges",
    pairing: ["Pork belly", "Sharp cheddar", "Mango sticky rice"],
  },
  {
    slug: "millrace-pale",
    name: "Millrace Pale",
    style: "American pale ale",
    family: "hoppy",
    abv: 5.4,
    ibu: 38,
    srm: 6,
    og: 1.052,
    fg: 1.011,
    glass: "pint",
    label: "#4f6b2a",
    tap: 6,
    pour: { size: "16 oz", price: 7 },
    availability: "Year-round",
    shopId: "millrace-pale-4pack",
    short: "A pale ale for long afternoons in the yard. Citrus, biscuit, done.",
    story:
      "Hopped entirely with Cascade and Centennial from Ostrander Farm, forty minutes up the valley. We pick the lots ourselves every September.",
    notes: {
      aroma: "Orange blossom, grapefruit, biscuit",
      palate: "Light-medium, balanced",
      finish: "Crisp, gently bitter",
    },
    malts: [
      { name: "Two-row pale malt", pct: 86 },
      { name: "Maris Otter", pct: 10 },
      { name: "Crystal 40L", pct: 4 },
    ],
    hops: [
      { name: "Cascade", use: "Boil & whirlpool" },
      { name: "Centennial", use: "Dry hop" },
    ],
    yeast: "Clean American ale",
    ferment: "6 days at 66°F",
    pairing: ["Fries with malt-vinegar salt", "Burgers", "Fish and chips"],
  },
  {
    slug: "graft",
    name: "Graft",
    style: "Saison",
    family: "farmhouse",
    abv: 6.2,
    ibu: 26,
    srm: 5,
    og: 1.054,
    fg: 1.006,
    glass: "tulip",
    label: "#b5862f",
    tap: 7,
    pour: { size: "14 oz", price: 8 },
    availability: "Year-round",
    short:
      "Peppery, dry and lively, fermented warm with our house farmhouse yeast.",
    story:
      "We let the yeast run hot, up to 86°F, and it rewards us with white pepper, pear and clove. Bottle-conditioned for a mousse-like head.",
    notes: {
      aroma: "White pepper, pear skin, lemon",
      palate: "Light, highly carbonated, spritzy",
      finish: "Very dry, peppery",
    },
    malts: [
      { name: "Pilsner malt", pct: 80 },
      { name: "Spelt", pct: 12 },
      { name: "Wheat malt", pct: 8 },
    ],
    hops: [
      { name: "Styrian Goldings", use: "60-minute boil" },
      { name: "Saaz", use: "Whirlpool" },
    ],
    yeast: "House farmhouse blend",
    ferment: "Free-rise from 68°F to 86°F over 10 days",
    pairing: ["Pickle plate", "Goat cheese salad", "Mussels"],
  },
  {
    slug: "pucker-row",
    name: "Pucker Row",
    style: "Raspberry Berliner weisse",
    family: "sour",
    abv: 4.2,
    ibu: 6,
    srm: 4,
    tint: "#c23a54",
    og: 1.036,
    fg: 1.005,
    glass: "stange",
    label: "#b23a55",
    tap: 8,
    pour: { size: "12 oz", price: 7 },
    availability: "Seasonal",
    short:
      "Tart wheat beer refermented on 400 pounds of Willamette raspberries.",
    story:
      "Kettle-soured overnight with lactobacillus, then refermented on whole raspberries from Sorensen's patch. Bright, pink and puckering, like eating berries off the cane.",
    notes: {
      aroma: "Fresh raspberry, lemon yoghurt",
      palate: "Light, tart, effervescent",
      finish: "Clean and quenching",
    },
    malts: [
      { name: "Wheat malt", pct: 55 },
      { name: "Pilsner malt", pct: 45 },
    ],
    hops: [{ name: "Hallertau Blanc", use: "Boil, a whisper" }],
    yeast: "Lactobacillus, then German ale",
    ferment: "Kettle-soured 24 hours, 2 weeks on fruit",
    pairing: ["Goat cheese salad", "Dark chocolate", "Fried chicken"],
  },
  {
    slug: "copper-marzen",
    name: "Copper Märzen",
    style: "Festbier / Märzen",
    family: "crisp",
    abv: 5.8,
    ibu: 24,
    srm: 10,
    og: 1.057,
    fg: 1.013,
    glass: "pint",
    label: "#a8461c",
    tap: 9,
    pour: { size: "16 oz", price: 7 },
    availability: "Seasonal",
    shopId: "copper-marzen-4pack",
    short: "Our autumn lager, brewed in March and lagered all summer long.",
    story:
      "The beer the kettle was built for. Triple-decocted the old way, lagered for five months, and tapped on the first Saturday of October. When it's gone, it's gone until next fall.",
    notes: {
      aroma: "Toasted malt, dried apricot, faint spice",
      palate: "Medium, rich but clean",
      finish: "Dry, softly bitter",
    },
    malts: [
      { name: "Munich malt", pct: 55 },
      { name: "Vienna malt", pct: 35 },
      { name: "Pilsner malt", pct: 8 },
      { name: "Caramunich I", pct: 2 },
    ],
    hops: [
      { name: "Hallertau Mittelfrüh", use: "60-minute boil" },
      { name: "Tettnang", use: "30-minute boil" },
    ],
    yeast: "Bavarian lager strain",
    ferment: "14 days at 49°F, lagered 20 weeks",
    pairing: ["Bratwurst", "Bavarian pretzel", "Roast chicken"],
  },
  {
    slug: "second-shift",
    name: "Second Shift",
    style: "Oatmeal stout",
    family: "dark",
    abv: 5.8,
    ibu: 32,
    srm: 38,
    og: 1.06,
    fg: 1.016,
    glass: "pint",
    label: "#3b2a22",
    tap: 10,
    pour: { size: "16 oz", price: 7 },
    availability: "Year-round",
    shopId: "second-shift-4pack",
    short: "Silky, roasty, low in alcohol and high in comfort.",
    story:
      "Named for the night crew that kept the tannery running. Oats give it a velvet body; a touch of chocolate malt and cold-steeped roast barley keep it smooth rather than ashy.",
    notes: {
      aroma: "Cocoa nibs, cold brew, toasted oat",
      palate: "Silky, medium-full",
      finish: "Roasty, softly sweet",
    },
    malts: [
      { name: "Maris Otter", pct: 68 },
      { name: "Flaked oats", pct: 12 },
      { name: "Chocolate malt", pct: 8 },
      { name: "Roast barley", pct: 7 },
      { name: "Crystal 80L", pct: 5 },
    ],
    hops: [{ name: "East Kent Goldings", use: "60-minute boil" }],
    yeast: "English ale",
    ferment: "8 days at 67°F",
    pairing: ["Stout-braised chili", "Oysters", "Brownie"],
  },
  {
    slug: "night-burner",
    name: "Night Burner",
    style: "Bourbon barrel-aged imperial stout",
    family: "dark",
    abv: 11.8,
    ibu: 60,
    srm: 40,
    og: 1.112,
    fg: 1.026,
    glass: "snifter",
    label: "#1f1712",
    tap: 11,
    pour: { size: "6 oz", price: 10 },
    availability: "Limited",
    shopId: "night-burner-2026",
    short: "Fourteen months in bourbon barrels. Released once a year.",
    story:
      "An imperial stout so thick it coats the glass, aged fourteen months in barrels from a distillery two counties over. The 2026 vintage goes on sale November 7 — four bottles per person.",
    notes: {
      aroma: "Bourbon, vanilla bean, fudge, toasted oak",
      palate: "Huge, viscous, warming",
      finish: "Long, dark chocolate and char",
    },
    malts: [
      { name: "Maris Otter", pct: 70 },
      { name: "Chocolate malt", pct: 9 },
      { name: "Roast barley", pct: 7 },
      { name: "Crystal 120L", pct: 6 },
      { name: "Flaked oats", pct: 8 },
    ],
    hops: [
      { name: "Magnum", use: "90-minute boil" },
      { name: "East Kent Goldings", use: "15-minute boil" },
    ],
    yeast: "English ale, high attenuation",
    ferment: "3 weeks at 64°F, then 14 months in barrel",
    pairing: ["Blue cheese", "Crème brûlée", "A fireside"],
  },
  {
    slug: "brick-red",
    name: "Brick Red",
    style: "Irish red ale",
    family: "dark",
    abv: 5.0,
    ibu: 24,
    srm: 17,
    og: 1.05,
    fg: 1.012,
    glass: "pint",
    label: "#8e2c1e",
    tap: null,
    pour: { size: "16 oz", price: 7 },
    availability: "Seasonal",
    back: "Back on tap in February",
    short: "Toffee, a dry roasty edge, and a colour like the old smokestack.",
    story:
      "Our late-winter beer, brewed for the long stretch between holidays and spring. A spoonful of roast barley gives it the brick colour and a dry finish.",
    notes: {
      aroma: "Toffee, biscuit, a hint of roast",
      palate: "Medium, smooth",
      finish: "Dry, faintly roasty",
    },
    malts: [
      { name: "Maris Otter", pct: 86 },
      { name: "Crystal 60L", pct: 8 },
      { name: "Roast barley", pct: 3 },
      { name: "Munich malt", pct: 3 },
    ],
    hops: [{ name: "Fuggle", use: "60-minute boil" }],
    yeast: "Irish ale",
    ferment: "7 days at 66°F",
    pairing: ["Shepherd's pie", "Sausage rolls", "Aged gouda"],
  },
];

/* ------------------------------------------------------------ taproom */

export const flightRules = {
  size: 4,
  pour: "5 oz",
  price: 14,
  note: "Any four taps, 5 oz each. Night Burner pours as a 3 oz taster.",
};

export type Dish = {
  name: string;
  price: number;
  text: string;
  tags?: string[];
};

export const kitchen: { title: string; items: Dish[] }[] = [
  {
    title: "Snacks",
    items: [
      {
        name: "Bavarian pretzel",
        price: 11,
        text: "Baked daily with a lye wash. Tannery Pils cheese dip and grainy beer mustard.",
        tags: ["V"],
      },
      {
        name: "Pickle plate",
        price: 8,
        text: "House brine: carrots, beets, green beans and garlic dills.",
        tags: ["VG", "GF"],
      },
      {
        name: "Fries",
        price: 7,
        text: "Skin-on, malt-vinegar salt, smoked aioli.",
        tags: ["V"],
      },
    ],
  },
  {
    title: "Plates",
    items: [
      {
        name: "Smoked brisket sandwich",
        price: 17,
        text: "Twelve-hour brisket, Foundry Lager onions, pickles on a spent-grain roll.",
      },
      {
        name: "Stout-braised chili",
        price: 12,
        text: "Second Shift, black beans and chipotle. Cheddar and scallion on top.",
        tags: ["GF"],
      },
      {
        name: "Spent-grain flatbread",
        price: 14,
        text: "Dough made with our own malt. Roasted squash, sage, ricotta, hot honey.",
        tags: ["V"],
      },
      {
        name: "Brat & kraut",
        price: 13,
        text: "Pork bratwurst from Hollis Butchery, Märzen sauerkraut, rye bun.",
      },
    ],
  },
  {
    title: "Not beer",
    items: [
      {
        name: "Kettle root beer",
        price: 5,
        text: "Brewed in the same copper, with sassafras, vanilla and molasses.",
        tags: ["NA"],
      },
      {
        name: "Hop water",
        price: 5,
        text: "Sparkling water dry-hopped with Citra. Zero sugar, zero alcohol.",
        tags: ["NA"],
      },
      {
        name: "Cold brew",
        price: 5,
        text: "From Westside Roasters, a block over.",
        tags: ["NA"],
      },
      {
        name: "Willamette pinot gris",
        price: 10,
        text: "For the friend who doesn't drink beer. We forgive them.",
      },
    ],
  },
];

export const houseRules = [
  {
    title: "Everyone shows ID",
    text: "Every guest drinking, every visit. We card at the door after 6 pm.",
  },
  {
    title: "Kids until 8 pm",
    text: "Minors are welcome with an adult until 8 pm. Root beer is on us for under-12s.",
  },
  {
    title: "Dogs in the yard",
    text: "Leashed and friendly dogs are welcome outside. Water bowls by the gate.",
  },
  {
    title: "Last call",
    text: "Thirty minutes before close. Growler fills stop at the same time.",
  },
];

export const taproomIntro = {
  title: "The taproom",
  text: "Twelve taps pulled straight from the bright tanks behind the bar, a kitchen hatch, and a gravel yard with picnic tables and heaters. Order at the bar; we don't run tabs on the yard.",
  growler:
    "Growler and crowler fills of any year-round beer: 32 oz $12 · 64 oz $20, plus a one-time $6 for the glass.",
};

/* ------------------------------------------------------------ events */

export type EventType =
  "release" | "music" | "trivia" | "run" | "class" | "market";

export type KettleEvent = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  start: string;
  end: string;
  price: number;
  repeats?: string;
  summary: string;
  body: string[];
  pouring: string[];
  details: string[];
  image: string;
};

export const eventTypes: { id: EventType; label: string }[] = [
  { id: "release", label: "Releases" },
  { id: "music", label: "Live music" },
  { id: "trivia", label: "Trivia" },
  { id: "run", label: "Run club" },
  { id: "class", label: "Classes" },
  { id: "market", label: "Markets" },
];

export const events: KettleEvent[] = [
  {
    id: "tuesday-trivia",
    title: "Tuesday trivia with Quizmaster Dee",
    type: "trivia",
    date: "2026-10-20",
    start: "19:00",
    end: "21:00",
    price: 0,
    repeats: "Every Tuesday",
    summary:
      "Six rounds, teams of up to six, and a $50 bar tab for the winners.",
    body: [
      "Dee has been writing our quiz since 2018 and she has never once repeated a question. Six rounds: general knowledge, a picture round, music, local history, a wildcard and the dreaded beer round.",
      "Tables fill by 6:45. Teams of up to six; the winners take a $50 bar tab and the last-place team picks next week's music round.",
    ],
    pouring: ["tannery-pils", "low-water", "second-shift"],
    details: ["Free to play", "Teams of up to six", "Kitchen open until 9 pm"],
    image: flightWindow,
  },
  {
    id: "run-club",
    title: "Riverbend Run Club",
    type: "run",
    date: "2026-10-22",
    start: "18:00",
    end: "19:30",
    price: 0,
    repeats: "Every Thursday",
    summary: "A 5K loop along the millrace path, then $2 off your first pint.",
    body: [
      "We leave from the yard gate at 6:00 sharp and run a flat 5K out along the millrace path and back across the footbridge. A slower group and a faster group, so nobody runs alone.",
      "Cubbies by the bar for your keys and phone. Back by 6:45 and your first pint is $2 off.",
    ],
    pouring: ["millrace-pale", "tannery-pils"],
    details: [
      "Free, all paces",
      "Bag check at the bar",
      "Headlamps recommended after October",
    ],
    image: yard,
  },
  {
    id: "marzen-stein-hoist",
    title: "Märzen stein-hoisting finals",
    type: "release",
    date: "2026-10-24",
    start: "14:00",
    end: "22:00",
    price: 0,
    summary:
      "The last big weekend of Copper Märzen, with a brass band and a stein-holding contest.",
    body: [
      "The final keg of Copper Märzen gets tapped at 2 pm. The Tannery Row Brass Band plays two sets in the yard, and the stein-holding contest starts at 5 — arm straight, full liter, last one standing wins a year of free growler fills.",
      "Brats and kraut from the hatch all day. Liter steins are $14 and you keep the glass.",
    ],
    pouring: ["copper-marzen", "foundry-lager", "tannery-pils"],
    details: [
      "Free entry",
      "Liter steins $14, glass included",
      "Contest sign-up at the bar by 4:30",
    ],
    image: kettles,
  },
  {
    id: "the-ferrymen",
    title: "The Ferrymen — bluegrass in the brewhouse",
    type: "music",
    date: "2026-10-30",
    start: "19:30",
    end: "22:30",
    price: 12,
    summary:
      "A five-piece string band playing among the fermenters. Seated, 80 tickets.",
    body: [
      "Once a season we clear the brewhouse floor, set out 80 chairs among the tanks and invite a band in. The Ferrymen play fast, close-harmony bluegrass and a few murder ballads for Halloween week.",
      "Tickets include your first pint. The bar stays open throughout; the kitchen hatch serves chili and pretzels.",
    ],
    pouring: ["second-shift", "graft", "rivet"],
    details: [
      "$12, includes first pint",
      "80 seats, all ages until 8 pm",
      "Doors 7 pm",
    ],
    image: brewhouse,
  },
  {
    id: "homebrew-101",
    title: "Homebrew 101 with our head brewer",
    type: "class",
    date: "2026-11-01",
    start: "11:00",
    end: "14:00",
    price: 45,
    summary:
      "Brew a five-gallon pale ale start to finish, then take home the recipe and a starter kit list.",
    body: [
      "Maren walks you through a full extract-and-grain brew day on our pilot system: milling, steeping, the boil, hop additions, chilling and pitching yeast. Ask her anything; she started in a garage too.",
      "Includes a tasting flight, a pretzel, and printed brew sheets to take home. Twelve places.",
    ],
    pouring: ["millrace-pale", "low-water"],
    details: [
      "$45 per person",
      "Twelve places",
      "21+ only, ID checked at the door",
    ],
    image: malt,
  },
  {
    id: "night-burner-release",
    title: "Night Burner 2026 bottle release",
    type: "release",
    date: "2026-11-07",
    start: "11:00",
    end: "20:00",
    price: 0,
    summary:
      "The annual barrel-aged stout drops. Four bottles per person, vertical flights at the bar.",
    body: [
      "Fourteen months in bourbon barrels and it's ready. Doors at 11; bottles are $28 each with a limit of four per person, first come, first served. You can also pre-order for pickup in the shop.",
      "At the bar we'll pour a vertical flight of the 2024, 2025 and 2026 vintages side by side, while stocks last.",
    ],
    pouring: ["night-burner", "second-shift", "brick-red"],
    details: ["Free entry", "Bottles $28, limit 4", "Vertical flight $18"],
    image: porter,
  },
  {
    id: "makers-market",
    title: "Tannery Row makers' market",
    type: "market",
    date: "2026-11-14",
    start: "12:00",
    end: "17:00",
    price: 0,
    summary:
      "Twenty local makers in the yard and brewhouse: ceramics, prints, knitwear, hot sauce.",
    body: [
      "Our winter market fills the yard and half the brewhouse with twenty makers from around the valley. Do your holiday shopping with a pint in hand.",
      "Kids' corner with cookie decorating from 1 to 3. Heaters on, rain or shine.",
    ],
    pouring: ["copper-marzen", "pucker-row", "graft"],
    details: ["Free entry", "All ages", "Dogs welcome in the yard"],
    image: hopBines,
  },
];

/* ------------------------------------------------------------ tours */

export type Tour = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  /** Sunday-first weekday numbers the tour runs on. */
  days: number[];
  times: string[];
  capacity: number;
  min?: number;
  summary: string;
  includes: string[];
};

export const tours: Tour[] = [
  {
    id: "brewhouse",
    name: "Brewhouse tour",
    minutes: 45,
    price: 18,
    days: [0, 5, 6],
    times: ["12:00", "14:00", "16:00"],
    capacity: 16,
    summary: "From grain room to bright tank, with four tasters at the end.",
    includes: [
      "Walk through the mill room, brewhouse and cellar",
      "Four 3 oz tasters",
      "A Kettle tasting glass to keep",
    ],
  },
  {
    id: "brewers-table",
    name: "The brewer's table",
    minutes: 90,
    price: 45,
    days: [6],
    times: ["13:00"],
    capacity: 8,
    summary:
      "A small group with one of our brewers, straight from the barrel cellar.",
    includes: [
      "Hands-on look at the mash and the copper kettle",
      "Barrel samples drawn by thief",
      "Six pours and a pretzel board",
    ],
  },
  {
    id: "private",
    name: "Private group tour",
    minutes: 120,
    price: 40,
    days: [2, 3, 4],
    times: ["16:00", "18:00"],
    capacity: 24,
    min: 8,
    summary:
      "Your own guide and a reserved table, for teams, birthdays and stag dos.",
    includes: [
      "Full brewhouse and cellar tour",
      "Flight of four plus a full pour",
      "Reserved yard or loft table for an hour",
    ],
  },
];

export const tourNotes = [
  "Tours leave from the bar. Please arrive ten minutes early.",
  "Closed-toe shoes, please: the brewhouse floor is wet and has drains.",
  "Guests under 21 can join the brewhouse tour with root beer instead of tasters.",
  "Change or cancel free up to 24 hours before.",
];

/* ------------------------------------------------------------ shop */

export type ProductKind = "cans" | "bottles" | "glassware" | "apparel" | "gift";

export type Variant = { id: string; label: string; price: number };

export type Product = {
  id: string;
  name: string;
  kind: ProductKind;
  beer?: string;
  variantLabel: string;
  variants: Variant[];
  text: string;
  details: string[];
  /** Glass/apparel colourway for the drawing. */
  color?: string;
  limit?: number;
};

export const productKinds: { id: ProductKind; label: string }[] = [
  { id: "cans", label: "Cans" },
  { id: "bottles", label: "Bottles" },
  { id: "glassware", label: "Glassware" },
  { id: "apparel", label: "Apparel" },
  { id: "gift", label: "Gift cards" },
];

const packs = (four: number): Variant[] => [
  { id: "4pack", label: "4-pack, 16 oz cans", price: four },
  { id: "case", label: "Case of 24", price: Math.round(four * 5.5) },
];

export const products: Product[] = [
  {
    id: "tannery-pils-4pack",
    name: "Tannery Pils",
    kind: "cans",
    beer: "tannery-pils",
    variantLabel: "Size",
    variants: packs(14),
    text: "Our flagship pilsner, canned the day it comes out of the lagering tank.",
    details: ["16 oz cans", "Canned on site", "Best within 90 days"],
  },
  {
    id: "low-water-4pack",
    name: "Low Water",
    kind: "cans",
    beer: "low-water",
    variantLabel: "Size",
    variants: packs(18),
    text: "Hazy IPA canned every second Wednesday. Keep it cold and drink it fresh.",
    details: ["16 oz cans", "Keep refrigerated", "Best within 45 days"],
  },
  {
    id: "rivet-4pack",
    name: "Rivet",
    kind: "cans",
    beer: "rivet",
    variantLabel: "Size",
    variants: packs(17),
    text: "West Coast IPA with a backbone. Pine, grapefruit and a dry finish.",
    details: ["16 oz cans", "Keep refrigerated", "Best within 60 days"],
  },
  {
    id: "millrace-pale-4pack",
    name: "Millrace Pale",
    kind: "cans",
    beer: "millrace-pale",
    variantLabel: "Size",
    variants: packs(15),
    text: "The yard beer. Cascade and Centennial from Ostrander Farm.",
    details: ["16 oz cans", "Canned on site", "Best within 60 days"],
  },
  {
    id: "foundry-lager-4pack",
    name: "Foundry Lager",
    kind: "cans",
    beer: "foundry-lager",
    variantLabel: "Size",
    variants: packs(14),
    text: "Amber Vienna lager, toasty and easy. The fridge-door regular.",
    details: ["16 oz cans", "Canned on site", "Best within 90 days"],
  },
  {
    id: "copper-marzen-4pack",
    name: "Copper Märzen",
    kind: "cans",
    beer: "copper-marzen",
    variantLabel: "Size",
    variants: packs(15),
    text: "Autumn only. Lagered five months; the last cans go in early November.",
    details: ["16 oz cans", "Seasonal, while it lasts", "Best within 90 days"],
  },
  {
    id: "second-shift-4pack",
    name: "Second Shift",
    kind: "cans",
    beer: "second-shift",
    variantLabel: "Size",
    variants: packs(15),
    text: "Oatmeal stout: silky, roasty and only 5.8%.",
    details: ["16 oz cans", "Canned on site", "Best within 120 days"],
  },
  {
    id: "night-burner-2026",
    name: "Night Burner 2026",
    kind: "bottles",
    beer: "night-burner",
    variantLabel: "Format",
    variants: [
      { id: "single", label: "Single 500 ml bottle", price: 28 },
      { id: "pair", label: "Cellar pair (two bottles)", price: 54 },
    ],
    text: "Pre-order the 2026 vintage for pickup from release day, November 7. Limit four bottles per person.",
    details: ["500 ml, wax-dipped", "11.8% ABV", "Cellars well for five years"],
    limit: 4,
  },
  {
    id: "teku-glass",
    name: "Kettle tasting glass",
    kind: "glassware",
    variantLabel: "Set",
    variants: [
      { id: "one", label: "Single glass", price: 12 },
      { id: "pair", label: "Pair", price: 22 },
    ],
    text: "The stemmed tulip we pour our saisons and IPAs in, with the copper kettle mark fired on.",
    details: ["14 oz to the brim", "Dishwasher safe", "Made in Portugal"],
    color: "#a8461c",
  },
  {
    id: "pint-glass",
    name: "Shaker pint",
    kind: "glassware",
    variantLabel: "Set",
    variants: [
      { id: "one", label: "Single glass", price: 8 },
      { id: "four", label: "Set of four", price: 28 },
    ],
    text: "The workhorse pint glass from behind our bar, printed with the Tannery Row skyline.",
    details: ["16 oz", "Dishwasher safe", "Stackable"],
    color: "#2f5848",
  },
  {
    id: "brewers-tee",
    name: "Brewhouse tee",
    kind: "apparel",
    variantLabel: "Size",
    variants: ["S", "M", "L", "XL", "XXL"].map((s) => ({
      id: s.toLowerCase(),
      label: s,
      price: 28,
    })),
    text: "Heavyweight cotton in malt brown, with the copper kettle on the chest and the brew-day schedule on the back.",
    details: [
      "100% organic cotton, 7 oz",
      "Boxy fit, size down for a closer fit",
      "Printed in Riverbend",
    ],
    color: "#5a3b24",
  },
  {
    id: "gift-card",
    name: "Kettle gift card",
    kind: "gift",
    variantLabel: "Amount",
    variants: [25, 50, 100].map((n) => ({
      id: String(n),
      label: `$${n}`,
      price: n,
    })),
    text: "Good for pints, tours, food from the hatch and anything in the shop. Picked up at the bar in a letterpressed envelope.",
    details: ["Never expires", "Usable on tours and events", "Pickup only"],
  },
];

export const pickup = {
  title: "Pickup only",
  text: "We don't ship beer. Orders are ready at the taproom bar within two hours during opening hours; bring photo ID matching the name on the order.",
  taxRate: 0,
  taxNote: "Oregon has no sales tax.",
};

/* ------------------------------------------------------------ home & about */

export const home = {
  title: "Brewed in copper. Poured twelve feet away.",
  intro:
    "Kettle is a small brewery and taproom on Tannery Row. Twelve taps, a kitchen hatch, a gravel yard, and a 1958 copper kettle that does all the heavy lifting.",
  heroImage: kettles,
  boardTitle: "Pouring today",
  flightTitle: "Build a flight",
  flightText:
    "Pick any four taps for a $14 paddle. We'll tell you which order to drink them in, and you read the tap numbers to the bar.",
  brewTitle: "One kettle, no shortcuts",
  brewText:
    "Every Kettle beer starts in the same 15-barrel copper kettle we pulled out of a closing Franconian brewery in 2015. Copper holds heat evenly and caramelises the wort just slightly; it's slower, and you can taste it.",
  toursTitle: "See where it's made",
  shopTitle: "Take some home",
  shopText:
    "Cans, bottle pre-orders and glassware, ready at the bar within two hours.",
  visitTitle: "Come find us",
  closeTitle: "See you at the bar.",
  closeText:
    "No reservations for the taproom. Walk in, find a table, read the board.",
};

export const story = {
  title: "A brewery built around a kettle",
  intro:
    "In 2015, Maren Ostby and Theo Achterberg drove a flatbed to Franconia to buy a copper brew kettle from a family brewery that was closing after 190 years. They didn't have a building yet. They had a kettle.",
  chapters: [
    {
      title: "The kettle",
      text: "It was built in 1958, holds fifteen barrels, and weighs as much as a pickup truck. It took nine weeks to ship and two days to get through the loading door of an old leather tannery on the river, which became the brewhouse.",
      image: brewhouse,
      alt: "Copper-clad brewhouse vessels and steel tanks on a polished concrete floor",
    },
    {
      title: "The farm",
      text: "Most of our hops come from Ostrander Farm, forty minutes up the valley. We drive up every September during harvest to rub cones and choose our lots, then the whole crew spends a weekend in the drying barn.",
      image: hopBarn,
      alt: "A mountain of freshly picked green hops in a wooden barn",
    },
    {
      title: "The grain",
      text: "Base malts come from a maltster in Washington; specialty malts from Bamberg. Our 9,000 pounds a month of spent grain goes back out the door to Halvorsen's cattle and into the kitchen's flatbread dough.",
      image: malt,
      alt: "Close-up of crushed crystal malt kernels",
    },
  ],
};

export const milestones = [
  {
    year: "2015",
    text: "The kettle arrives in Riverbend on a flatbed, before we've signed a lease.",
  },
  {
    year: "2016",
    text: "Tannery Pils is the first beer through it. The taproom opens with four taps and folding chairs.",
  },
  {
    year: "2018",
    text: "The gravel yard opens. Tuesday trivia starts and never stops.",
  },
  {
    year: "2020",
    text: "We build a canning line in six weeks and sell cans out of the loading door.",
  },
  {
    year: "2022",
    text: "Barrel cellar opens. The first Night Burner sells out in four hours.",
  },
  {
    year: "2025",
    text: "Kitchen hatch opens. The pretzel outsells every beer but one.",
  },
];

export type Person = {
  name: string;
  role: string;
  bio: string;
  drinks: string;
};

export const team: Person[] = [
  {
    name: "Maren Ostby",
    role: "Co-founder & head brewer",
    bio: "Twenty years in brewhouses from Bamberg to Bend. Writes every recipe on graph paper first.",
    drinks: "tannery-pils",
  },
  {
    name: "Theo Achterberg",
    role: "Co-founder & cellar",
    bio: "Former cooper. Runs the barrel program and knows every barrel by its knock.",
    drinks: "night-burner",
  },
  {
    name: "Priya Raman",
    role: "Taproom manager",
    bio: "Built the tap board, the house rules and the best playlist on Tannery Row.",
    drinks: "pucker-row",
  },
  {
    name: "Luis Ferreira",
    role: "Kitchen hatch",
    bio: "Bakes 120 pretzels a day and turns spent grain into flatbread dough.",
    drinks: "second-shift",
  },
];

export const values = [
  {
    title: "Fresh or not at all",
    text: "Hoppy beers leave the taproom fridge after 45 days. We'd rather pour them out than sell them tired.",
  },
  {
    title: "Water back to the river",
    text: "We treat our wastewater on site and use 3.4 gallons of water per gallon of beer, about half the industry average.",
  },
  {
    title: "Local first",
    text: "Hops from the valley, fruit from Sorensen's patch, brats from Hollis Butchery a mile away.",
  },
];

export const images = {
  kettles,
  brewhouse,
  cellar,
  flight,
  flightWindow,
  hopBarn,
  hopBines,
  malt,
  porter,
  pretzel,
  tour,
  yard,
  canning,
};

export const faqs = [
  {
    q: "Do I need to book the taproom?",
    a: "No. The taproom and yard are walk-in only. Groups of ten or more can book a private tour with a reserved table.",
  },
  {
    q: "Can I bring kids or dogs?",
    a: "Kids are welcome with an adult until 8 pm. Leashed dogs are welcome in the yard, not inside.",
  },
  {
    q: "Is there parking?",
    a: "Free parking on Tannery Row after 5 pm and all weekend, plus bike racks for 30 by the gate. Bus 14 stops at the corner.",
  },
  {
    q: "Is the taproom accessible?",
    a: "Yes. Step-free entrance from the yard, an accessible restroom, and lowered sections at both ends of the bar.",
  },
];
