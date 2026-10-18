import shelves from "./assets/shelves.jpg";
import chalkboard from "./assets/chalkboard.jpg";
import table from "./assets/table.jpg";
import vineyard from "./assets/vineyard.jpg";
import harvest from "./assets/harvest.jpg";
import grower from "./assets/grower.jpg";
import cellar from "./assets/cellar.jpg";
import plates from "./assets/plates.jpg";
import tasting from "./assets/tasting.jpg";
import pourImg from "./assets/pour.jpg";
import vigneron from "./assets/vigneron.jpg";

export const images = {
  shelves,
  chalkboard,
  table,
  vineyard,
  harvest,
  grower,
  cellar,
  plates,
  tasting,
  pour: pourImg,
  vigneron,
};

export const brand = {
  name: "Pour",
  sector: "Natural wine shop & bar",
  tagline: "Good wine, no ceremony.",
  street: "214 Larch Street",
  area: "Eastside, Portland",
  phone: "+1 555 014 2266",
  phoneHref: "tel:+15550142266",
  email: "hello@pour.example",
  instagram: "https://www.instagram.com/",
};

export const nav = [
  { to: "/wines", label: "Wines" },
  { to: "/finder", label: "Taste finder" },
  { to: "/bar", label: "Bar menu" },
  { to: "/tastings", label: "Tastings" },
  { to: "/club", label: "Club" },
  { to: "/visit", label: "Visit" },
];

export const footerNav = [
  {
    title: "Shop",
    links: [
      ["/wines", "All wines"],
      ["/finder", "Taste finder"],
      ["/club", "Wine club"],
      ["/cart", "Your case"],
    ],
  },
  {
    title: "Bar",
    links: [
      ["/bar", "Bar menu"],
      ["/tastings", "Tastings & events"],
      ["/visit", "Hours & directions"],
    ],
  },
  {
    title: "Pour",
    links: [
      ["/about", "Our story"],
      ["/visit", "FAQ"],
      ["/checkout", "Checkout"],
    ],
  },
] as const;

export const hours = [
  { day: "Monday", shop: "Closed", bar: "Closed" },
  { day: "Tuesday", shop: "11 am – 9 pm", bar: "4 pm – 11 pm" },
  { day: "Wednesday", shop: "11 am – 9 pm", bar: "4 pm – 11 pm" },
  { day: "Thursday", shop: "11 am – 9 pm", bar: "4 pm – 11 pm" },
  { day: "Friday", shop: "11 am – 10 pm", bar: "3 pm – midnight" },
  { day: "Saturday", shop: "11 am – 10 pm", bar: "3 pm – midnight" },
  { day: "Sunday", shop: "12 pm – 7 pm", bar: "3 pm – 9 pm" },
];

/* ───────────── Wines ───────────── */

export type Colour = "White" | "Orange" | "Rosé" | "Red" | "Sparkling";
export type Shape = "burgundy" | "bordeaux" | "sparkling" | "litre";
export type Motif =
  "sun" | "wave" | "dots" | "stripes" | "moon" | "arch" | "grid" | "leaf";

export type Wine = {
  id: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  grapes: string;
  vintage: string;
  colour: Colour;
  price: number;
  /** Price of a 150 cl magnum, when we stock one. */
  magnum?: number;
  /** 0 = featherweight, 10 = full and grippy. */
  body: number;
  /** 0 = clean and bright, 10 = cloudy, funky, wild. */
  wild: number;
  abv: string;
  sulphur: string;
  farming: string;
  making: string;
  note: string;
  story: string;
  pairing: string;
  serve: string;
  /** Glass price when it is open at the bar. */
  glass?: number;
  stock: number;
  added: string;
  bottle: {
    shape: Shape;
    glass: string;
    label: string;
    ink: string;
    cap: string;
    motif: Motif;
  };
};

export const colours: Colour[] = [
  "White",
  "Orange",
  "Rosé",
  "Red",
  "Sparkling",
];

export const wines: Wine[] = [
  {
    id: "cloud-study",
    name: "Cloud Study",
    producer: "Domaine Petit-Ruisseau",
    region: "Anjou, Loire",
    country: "France",
    grapes: "Chenin Blanc",
    vintage: "2024",
    colour: "White",
    price: 34,
    magnum: 72,
    body: 5,
    wild: 3,
    abv: "12.5%",
    sulphur: "10 mg/L at bottling",
    farming: "Organic, certified",
    making:
      "Hand-picked over three passes, pressed whole-bunch, native yeasts, ten months in old 500-litre barrels on the lees.",
    note: "Pear skin, beeswax and a pinch of salt. Tense now, generous with an hour open.",
    story:
      "Claire Aubin farms four hectares of schist above the Layon with a horse called Prosper and a lot of patience. Cloud Study is her village Chenin: the grapes from the youngest vines, picked last, made the same slow way as her single-parcel bottles.",
    pairing:
      "Roast chicken, anything with brown butter, a wedge of aged Comté.",
    serve: "11–13 °C, a big glass, open an hour ahead",
    glass: 16,
    stock: 18,
    added: "2026-09-12",
    bottle: {
      shape: "burgundy",
      glass: "#5e6440",
      label: "#e9ba62",
      ink: "#3d1a28",
      cap: "#3d1a28",
      motif: "sun",
    },
  },
  {
    id: "soft-landing",
    name: "Soft Landing",
    producer: "Maison Perrache",
    region: "Fleurie, Beaujolais",
    country: "France",
    grapes: "Gamay",
    vintage: "2025",
    colour: "Red",
    price: 29,
    body: 3,
    wild: 4,
    abv: "12%",
    sulphur: "None added",
    farming: "Organic, certified",
    making:
      "Whole clusters, semi-carbonic maceration for twelve days in concrete, bottled unfined and unfiltered in spring.",
    note: "Crushed cherries and pink peppercorn. Gulpable, a little crunchy, best a touch chilled.",
    story:
      "Julien Perrache took over his grandmother's granite slopes in 2017 and stopped everything she had been sold: the herbicides, the cultured yeast, the sulphur. The wines got brighter every year. This is the one we drink most at staff dinner.",
    pairing: "Saucisson, a burger, Tuesday.",
    serve: "13–14 °C, twenty minutes in the fridge",
    glass: 14,
    stock: 30,
    added: "2026-10-02",
    bottle: {
      shape: "burgundy",
      glass: "#3f2a30",
      label: "#a2b6b2",
      ink: "#2b1219",
      cap: "#c8553d",
      motif: "wave",
    },
  },
  {
    id: "tea-leaves",
    name: "Tea Leaves",
    producer: "Kmetija Brdo",
    region: "Goriška Brda",
    country: "Slovenia",
    grapes: "Pinot Grigio, Rebula",
    vintage: "2023",
    colour: "Orange",
    price: 31,
    body: 6,
    wild: 6,
    abv: "12.5%",
    sulphur: "15 mg/L",
    farming: "Organic, uncertified",
    making:
      "Destemmed, nine days on the skins in open vats, foot-trodden twice a day, a year in old Slovenian oak.",
    note: "Apricot, black tea and blood orange peel, with a gentle grip that wants food.",
    story:
      "The Kos family have farmed the terraces on the Italian border for five generations. Andrej, the youngest, made the first skin-contact Pinot in a borrowed vat in 2015. It is now the wine everyone asks him for.",
    pairing: "Spiced lentils, pork belly, mushrooms on toast.",
    serve: "14–16 °C, cellar cool, not cold",
    glass: 15,
    stock: 14,
    added: "2026-08-20",
    bottle: {
      shape: "bordeaux",
      glass: "#7a5a2e",
      label: "#ed967a",
      ink: "#3d1a28",
      cap: "#3d1a28",
      motif: "dots",
    },
  },
  {
    id: "porch-light",
    name: "Porch Light",
    producer: "Les Vignes Basses",
    region: "Gaillac, South-West",
    country: "France",
    grapes: "Braucol, Mauzac",
    vintage: "2025",
    colour: "Sparkling",
    price: 27,
    body: 2,
    wild: 5,
    abv: "11%",
    sulphur: "None added",
    farming: "Biodynamic, certified",
    making:
      "Pétillant naturel: bottled before the first fermentation finished, so the bubbles are its own. Lightly cloudy, never disgorged.",
    note: "Wild strawberry, rhubarb and a soft, frothy fizz. The bottle that starts the evening.",
    story:
      "Mathilde and Sami bought a tumbledown farm with old vines in 2019 and make five wines in the barn they share with goats. Porch Light is the one they pour for neighbours who help with the harvest.",
    pairing: "Fried anything, salty crisps, a long sunset.",
    serve: "6–8 °C, open over the sink, sediment is fine",
    glass: 13,
    stock: 24,
    added: "2026-10-09",
    bottle: {
      shape: "sparkling",
      glass: "#8c8a7a",
      label: "#f1c6c0",
      ink: "#662b42",
      cap: "#c8553d",
      motif: "stripes",
    },
  },
  {
    id: "night-swim",
    name: "Night Swim",
    producer: "Weingut Erdlinger",
    region: "Mittelburgenland",
    country: "Austria",
    grapes: "Blaufränkisch",
    vintage: "2022",
    colour: "Red",
    price: 38,
    magnum: 80,
    body: 7,
    wild: 3,
    abv: "13%",
    sulphur: "20 mg/L",
    farming: "Biodynamic, certified",
    making:
      "Destemmed, three weeks on skins, eighteen months in large neutral oak. Bottled by gravity, unfiltered.",
    note: "Blackberry, iron and dark cocoa, with polished tannin and a long, cool finish.",
    story:
      "Verena Erdlinger works heavy clay and limestone near the Hungarian border, with sheep grazing between the rows all winter. Night Swim is the serious one on our red shelf, still under forty dollars.",
    pairing: "Braised short rib, duck, a hard sheep's cheese.",
    serve: "16–17 °C, decant if you can",
    stock: 11,
    added: "2026-06-30",
    bottle: {
      shape: "bordeaux",
      glass: "#2a1c22",
      label: "#ece2d0",
      ink: "#2b1219",
      cap: "#2b1219",
      motif: "moon",
    },
  },
  {
    id: "salt-road",
    name: "Salt Road",
    producer: "Quinta do Vale Raso",
    region: "Monção e Melgaço",
    country: "Portugal",
    grapes: "Alvarinho",
    vintage: "2024",
    colour: "White",
    price: 26,
    body: 3,
    wild: 2,
    abv: "12%",
    sulphur: "25 mg/L",
    farming: "Organic, in conversion",
    making:
      "Pressed straight to stainless steel, native ferment, six months on fine lees with no stirring.",
    note: "Lime pith, sea spray and white flowers. Bone-dry and electric.",
    story:
      "Two siblings, a granite valley and the Atlantic forty kilometres west. They stopped selling grapes to the cooperative in 2021 and bottled their own. Salt Road is the house white at the bar for a reason.",
    pairing: "Oysters, grilled sardines, anything with lemon.",
    serve: "8–10 °C, fridge cold is fine",
    glass: 12,
    stock: 36,
    added: "2026-05-14",
    bottle: {
      shape: "burgundy",
      glass: "#8a9a6a",
      label: "#cfe0dc",
      ink: "#2b1219",
      cap: "#4b6850",
      motif: "wave",
    },
  },
  {
    id: "amber-hour",
    name: "Amber Hour",
    producer: "Marani Tetri",
    region: "Kakheti",
    country: "Georgia",
    grapes: "Rkatsiteli",
    vintage: "2022",
    colour: "Orange",
    price: 36,
    body: 8,
    wild: 7,
    abv: "13%",
    sulphur: "None added",
    farming: "Organic, uncertified",
    making:
      "Fermented and aged six months on skins, stems and seeds in buried clay qvevri, the way the village has always done it.",
    note: "Dried apricot, walnut skin and honeyed tea. Big, savoury, properly tannic.",
    story:
      "Giorgi Beridze keeps seven qvevri in a cellar under his house and digs out a new one every few years when the village potter has a good firing. This is as old a way of making wine as exists, and it tastes alive.",
    pairing: "Khachapuri, roast squash with walnuts, lamb with plum sauce.",
    serve: "15–16 °C, give it air",
    glass: 17,
    stock: 9,
    added: "2026-07-22",
    bottle: {
      shape: "bordeaux",
      glass: "#5b3a1e",
      label: "#d9a05b",
      ink: "#2b1219",
      cap: "#2b1219",
      motif: "arch",
    },
  },
  {
    id: "sunday-table",
    name: "Sunday Table",
    producer: "Cascina Fiorita",
    region: "Monferrato, Piedmont",
    country: "Italy",
    grapes: "Barbera, Dolcetto",
    vintage: "NV",
    colour: "Red",
    price: 22,
    body: 4,
    wild: 4,
    abv: "12.5%",
    sulphur: "15 mg/L",
    farming: "Organic, certified",
    making:
      "A one-litre blend of the two grapes co-fermented in cement, bottled young under crown cap.",
    note: "Sour cherry, violets and a little bramble. A full litre, priced for opening on a whim.",
    story:
      "Lucia Ferraris makes Barolo-country wine without the Barolo prices, and this litre is what her family drinks at lunch. We go through a pallet every autumn.",
    pairing: "Pasta with ragù, pizza, the whole table.",
    serve: "14 °C, straight from a cool cupboard",
    glass: 11,
    stock: 42,
    added: "2026-09-28",
    bottle: {
      shape: "litre",
      glass: "#3a2328",
      label: "#e6d8bf",
      ink: "#662b42",
      cap: "#c8553d",
      motif: "grid",
    },
  },
  {
    id: "wild-hare",
    name: "Wild Hare",
    producer: "Weingut Haslinger",
    region: "Kamptal",
    country: "Austria",
    grapes: "Grüner Veltliner",
    vintage: "2024",
    colour: "White",
    price: 24,
    magnum: 50,
    body: 4,
    wild: 3,
    abv: "12%",
    sulphur: "18 mg/L",
    farming: "Biodynamic, certified",
    making:
      "Short skin contact overnight, pressed to old acacia barrels, native yeasts, bottled in spring unfiltered.",
    note: "Green apple, white pepper and fresh peas. Crisp, a little cloudy, endlessly drinkable.",
    story:
      "The Haslingers let hares, partridges and three beehives have the run of their terraces. Wild Hare is their everyday Grüner: we keep magnums for parties.",
    pairing: "Schnitzel, asparagus, green salads with mustard dressing.",
    serve: "9–11 °C",
    stock: 22,
    added: "2026-04-03",
    bottle: {
      shape: "burgundy",
      glass: "#6f7b4c",
      label: "#efe6cf",
      ink: "#4b6850",
      cap: "#4b6850",
      motif: "leaf",
    },
  },
  {
    id: "red-clay",
    name: "Red Clay",
    producer: "Domaine Ocre",
    region: "Côtes Catalanes, Roussillon",
    country: "France",
    grapes: "Grenache, Carignan",
    vintage: "2022",
    colour: "Red",
    price: 33,
    body: 8,
    wild: 5,
    abv: "14%",
    sulphur: "None added",
    farming: "Organic, certified",
    making:
      "Old bush vines on red clay, whole-bunch ferment, ten months in amphora and old demi-muids.",
    note: "Plum, garrigue herbs and warm stone. Generous and a bit wild at the edges.",
    story:
      "Hélène Roca came home to her father's abandoned Carignan vines, some of them planted in 1921, and decided they were worth saving. She will be pouring them herself at Pour on 31 October.",
    pairing: "Lamb shoulder, merguez, anything off a fire.",
    serve: "16 °C, open an hour ahead",
    glass: 16,
    stock: 15,
    added: "2026-10-05",
    bottle: {
      shape: "bordeaux",
      glass: "#33181f",
      label: "#c8553d",
      ink: "#f3e6d1",
      cap: "#2b1219",
      motif: "sun",
    },
  },
  {
    id: "under-the-veil",
    name: "Under the Veil",
    producer: "Domaine Belvaux",
    region: "Arbois, Jura",
    country: "France",
    grapes: "Savagnin",
    vintage: "2020",
    colour: "White",
    price: 52,
    body: 7,
    wild: 8,
    abv: "13.5%",
    sulphur: "None added",
    farming: "Biodynamic, certified",
    making:
      "Aged three years sous voile: the barrels are never topped up, so a veil of yeast grows on the wine and gives it that nutty, salty edge.",
    note: "Walnut, curry leaf, preserved lemon and sea salt. Not for everyone, unforgettable for some.",
    story:
      "Pierre Belvaux makes eleven wines from five hectares and refuses to sell any of them before they are ready. This is the bottle our staff fight over every time the allocation lands.",
    pairing: "Comté, morels in cream, chicken with vin jaune sauce.",
    serve: "13–14 °C, decant and come back to it",
    stock: 6,
    added: "2026-09-01",
    bottle: {
      shape: "burgundy",
      glass: "#7c6a3a",
      label: "#3d1a28",
      ink: "#e9ba62",
      cap: "#e9ba62",
      motif: "moon",
    },
  },
  {
    id: "garden-party",
    name: "Garden Party",
    producer: "Bodegas Lindero",
    region: "Bierzo, Castilla y León",
    country: "Spain",
    grapes: "Mencía, Godello",
    vintage: "2025",
    colour: "Rosé",
    price: 23,
    body: 3,
    wild: 2,
    abv: "12%",
    sulphur: "20 mg/L",
    farming: "Organic, certified",
    making:
      "Direct-press rosé from hillside Mencía with a splash of Godello, fermented cold in steel.",
    note: "Watermelon, redcurrant and a whisper of wild fennel. Pale, dry, gone too soon.",
    story:
      "A cooperative of six growers on the slate slopes of the Bierzo, pooling their best fruit since 2018. Garden Party is their summer bottle, and we stretch it into autumn.",
    pairing: "Tomato salad, grilled prawns, picnic food.",
    serve: "8–10 °C",
    glass: 12,
    stock: 20,
    added: "2026-06-01",
    bottle: {
      shape: "burgundy",
      glass: "#b8b4a0",
      label: "#e8a28f",
      ink: "#2b1219",
      cap: "#a2b6b2",
      motif: "dots",
    },
  },
  {
    id: "long-lunch",
    name: "Long Lunch",
    producer: "Vigna Scirocco",
    region: "Vittoria, Sicily",
    country: "Italy",
    grapes: "Frappato",
    vintage: "2024",
    colour: "Red",
    price: 28,
    body: 3,
    wild: 3,
    abv: "12.5%",
    sulphur: "12 mg/L",
    farming: "Organic, certified",
    making:
      "Destemmed, ten days on skins in cement, aged in tank to keep the perfume.",
    note: "Pomegranate, rose petal and orange zest. Light on its feet, made for a chill.",
    story:
      "Two cousins on red sand near the south coast of Sicily, where the sirocco blows the vines dry. Frappato is the island's lightest red and they make it with a very gentle hand.",
    pairing: "Caponata, tuna, a long table in the shade.",
    serve: "12–14 °C, chilled",
    stock: 19,
    added: "2026-08-08",
    bottle: {
      shape: "burgundy",
      glass: "#4a2228",
      label: "#f1d27a",
      ink: "#662b42",
      cap: "#662b42",
      motif: "arch",
    },
  },
  {
    id: "bright-side",
    name: "Bright Side",
    producer: "Domaine Fauvel",
    region: "Montlouis, Loire",
    country: "France",
    grapes: "Chenin Blanc",
    vintage: "2023",
    colour: "Sparkling",
    price: 35,
    magnum: 74,
    body: 3,
    wild: 3,
    abv: "12%",
    sulphur: "None added",
    farming: "Organic, certified",
    making:
      "Méthode ancestrale, disgorged by hand after eighteen months on the lees, no dosage.",
    note: "Quince, toasted brioche and lemon curd, with a fine, persistent bead.",
    story:
      "Agathe Fauvel's grandfather made sweet wines; she makes bone-dry bubbles from the same tuffeau slopes. It drinks like Champagne at a third of the price, and we say so to anyone who will listen.",
    pairing: "Fried chicken, gougères, a birthday.",
    serve: "7–9 °C",
    glass: 15,
    stock: 16,
    added: "2026-10-12",
    bottle: {
      shape: "sparkling",
      glass: "#3d4a2c",
      label: "#f3e6d1",
      ink: "#662b42",
      cap: "#e9ba62",
      motif: "sun",
    },
  },
];

export const countries = [...new Set(wines.map((w) => w.country))].sort();

/* ───────────── Taste finder ───────────── */

export const finder = {
  axes: {
    body: { low: "Light", high: "Full" },
    wild: { low: "Clean", high: "Wild" },
  },
  presets: [
    { label: "Crunchy and chilled", body: 2, wild: 4 },
    { label: "Bright and clean", body: 3, wild: 1 },
    { label: "Skin-contact curious", body: 6, wild: 7 },
    { label: "Big dinner red", body: 8, wild: 4 },
    { label: "Take me somewhere strange", body: 7, wild: 9 },
  ],
  glossary: [
    {
      term: "Body",
      text: "How much the wine fills your mouth. Light wines feel like water with a story; full ones feel like a meal. Alcohol, skin contact and oak all add weight.",
    },
    {
      term: "Wild",
      text: "Our honest word for how far a wine strays from what a supermarket bottle tastes like: cloudiness, cidery tang, nutty oxidation, a farmyard edge. Low means clean and precise. High means alive and a little unpredictable.",
    },
    {
      term: "Why two axes?",
      text: "Grapes and regions tell you surprisingly little about natural wine. Weight and wildness are what people actually describe at the counter, so that is how we shelve the finder.",
    },
  ],
};

/* ───────────── Bar ───────────── */

export const bar = {
  intro:
    "Every bottle on the shop shelf can be opened at the bar for $15 corkage. These are the ones already open tonight, written on the board at 4 pm and crossed off when they run dry.",
  extras: [
    {
      name: "Vermouth on ice",
      detail: "House red vermouth, orange peel, olive",
      price: 11,
    },
    {
      name: "Farmhouse cider",
      detail: "Bittersweet apples, bottle-conditioned, 6.5%",
      price: 9,
    },
    {
      name: "Verjus spritz",
      detail: "Green grape verjus, soda, rosemary. Alcohol-free",
      price: 8,
    },
    {
      name: "Hibiscus kombucha",
      detail: "Brewed down the street, alcohol-free",
      price: 7,
    },
  ],
  plates: [
    {
      name: "Sourdough & cultured butter",
      detail: "From Fernhill Bakery, flaky salt",
      price: 7,
    },
    {
      name: "Gordal olives",
      detail: "Warm, orange zest, fennel seed",
      price: 6,
    },
    {
      name: "Anchovies on toast",
      detail: "Cantabrian anchovies, tomato butter",
      price: 12,
    },
    {
      name: "Three cheeses",
      detail: "Aged Comté, washed-rind, goat; quince paste",
      price: 21,
    },
    {
      name: "Coppa & pickles",
      detail: "Sliced to order, house pickles",
      price: 15,
    },
    {
      name: "Burrata",
      detail: "Roast grapes, chilli honey, hazelnuts",
      price: 16,
    },
    {
      name: "Fried chicken thighs",
      detail: "Buttermilk, Espelette, lemon mayo",
      price: 14,
    },
    {
      name: "Mushroom toast",
      detail: "Wild mushrooms, sherry, crème fraîche",
      price: 13,
    },
    {
      name: "Olive-oil cake",
      detail: "Crème fraîche, poached quince",
      price: 9,
    },
  ],
  notes: [
    "Walk-ins only. Groups of six or more, email us a day ahead and we will hold the long table.",
    "Kitchen closes an hour before the bar.",
    "Ask for a taste of anything open before you commit to a glass.",
  ],
};

/* ───────────── Tastings & events ───────────── */

export type EventKind = "Tasting" | "Winemaker night" | "Class" | "Supper";

export type WineEvent = {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  time: string;
  length: string;
  price: number;
  seats: number;
  left: number;
  host: string;
  summary: string;
  body: string[];
  pours: string[];
  includes: string[];
};

export const eventKinds: EventKind[] = [
  "Tasting",
  "Winemaker night",
  "Class",
  "Supper",
];

export const events: WineEvent[] = [
  {
    id: "chenin-four-ways",
    title: "Chenin, four ways",
    kind: "Tasting",
    date: "2026-10-23",
    time: "7:00 pm",
    length: "90 minutes",
    price: 35,
    seats: 20,
    left: 6,
    host: "Mara Okafor",
    summary:
      "Still, sparkling, skin-contact and veiled: one grape from the Loire, four completely different glasses.",
    body: [
      "Chenin Blanc is the grape that converted most of us. It can be bone-dry and electric, rich and honeyed, frothy, or nutty and strange, often from the same village.",
      "Mara pours four bottles side by side, talks about how each was made, and lets you argue about which is best. There will be bread, butter and a wedge of Comté to keep things civil.",
    ],
    pours: ["cloud-study", "bright-side", "under-the-veil", "tea-leaves"],
    includes: [
      "Four tasting pours",
      "Bread, butter and cheese",
      "10% off any bottle poured, on the night",
    ],
  },
  {
    id: "domaine-ocre-night",
    title: "Winemaker night with Domaine Ocre",
    kind: "Winemaker night",
    date: "2026-10-31",
    time: "6:30 pm",
    length: "2 hours",
    price: 45,
    seats: 28,
    left: 11,
    host: "Hélène Roca",
    summary:
      "Hélène flies in from Roussillon with her centenarian Carignan and a suitcase of bottles we cannot get any other way.",
    body: [
      "Hélène came home to her father's abandoned bush vines on red clay and spent five years nursing them back. Now her wines sell out across Europe within a week of release.",
      "She will pour five wines, including two cuvées that never leave France, and tell the story of every parcel. Teo is cooking lamb merguez and flatbreads off the grill out back.",
    ],
    pours: ["red-clay", "night-swim", "amber-hour"],
    includes: [
      "Five pours with the winemaker",
      "Grilled merguez and flatbreads",
      "First pick of the cellar allocation",
    ],
  },
  {
    id: "skin-contact-101",
    title: "Skin contact 101",
    kind: "Class",
    date: "2026-11-04",
    time: "7:00 pm",
    length: "75 minutes",
    price: 30,
    seats: 16,
    left: 9,
    host: "Inès Ferrand",
    summary:
      "What orange wine actually is, why it tastes like tea, and how to pick one you will like. Five glasses, one tidy hand-out.",
    body: [
      "Orange wine is white wine made like red: the juice sits on its skins for days or months, picking up colour, texture and tannin.",
      "Inès walks you from a few hours of contact to six months in buried clay, and you leave able to read a label and know roughly what is coming.",
    ],
    pours: ["wild-hare", "tea-leaves", "amber-hour"],
    includes: [
      "Five tasting pours",
      "A printed skin-contact field guide",
      "Olives and bread",
    ],
  },
  {
    id: "pet-nat-and-fried-things",
    title: "Pét-nat & fried things",
    kind: "Supper",
    date: "2026-11-15",
    time: "5:00 pm",
    length: "3 hours",
    price: 55,
    seats: 40,
    left: 17,
    host: "Teo Lindqvist",
    summary:
      "Six fizzy, cloudy bottles and a kitchen that only fries. A loud, happy Saturday at the long table.",
    body: [
      "Natural sparkling wine is the best thing to drink with fried food, and we are prepared to prove it over three hours.",
      "Teo fries chicken thighs, anchovies, potato skins and sage leaves; we open pét-nats from five countries and keep pouring.",
    ],
    pours: ["porch-light", "bright-side", "garden-party"],
    includes: [
      "Six sparkling pours",
      "Four fried courses",
      "Dessert and a coffee",
    ],
  },
  {
    id: "blind-tuesday",
    title: "Blind Tuesday",
    kind: "Tasting",
    date: "2026-11-25",
    time: "7:30 pm",
    length: "90 minutes",
    price: 25,
    seats: 24,
    left: 24,
    host: "Sam Achterberg",
    summary:
      "Six wines in paper bags. Guess the grape, the country, the price. The best score takes a bottle home.",
    body: [
      "No pressure and no wine-speak required. Sam runs a quiz with a scoring card, some generous hints and a few deliberate curveballs.",
      "It is the most fun way we know to find out what you actually like when the label is not doing the talking.",
    ],
    pours: ["salt-road", "long-lunch", "soft-landing"],
    includes: ["Six blind pours", "Score card and prizes", "Olives and bread"],
  },
  {
    id: "harvest-supper",
    title: "Harvest supper with Cascina Fiorita",
    kind: "Supper",
    date: "2026-12-06",
    time: "7:00 pm",
    length: "3 hours",
    price: 85,
    seats: 30,
    left: 3,
    host: "Lucia Ferraris",
    summary:
      "Four Piedmontese courses with the woman who makes our favourite litre of red, and the wines she keeps for herself.",
    body: [
      "Lucia brings the end of her harvest to Larch Street: agnolotti, braised beef in Barbera, bagna cauda, hazelnut cake.",
      "Every course comes with a different wine from her cellar, including old vintages she pulled from under the stairs.",
    ],
    pours: ["sunday-table", "long-lunch", "night-swim"],
    includes: [
      "Four courses",
      "Five paired wines",
      "A litre of Sunday Table to take home",
    ],
  },
];

/* ───────────── Club ───────────── */

export type ClubTier = {
  id: string;
  name: string;
  bottles: number;
  monthly: number;
  blurb: string;
  perks: string[];
};

export const club = {
  intro:
    "Once a month we pick bottles we cannot stop talking about, write a note on each, and put them aside for you. Collect from the shop or have them dropped off. Skip a month whenever you like.",
  tiers: [
    {
      id: "table",
      name: "The Table",
      bottles: 3,
      monthly: 75,
      blurb:
        "Three bottles for the week: one white or orange, one red, one wildcard.",
      perks: [
        "10% off the shelf, every visit",
        "Tasting notes and a recipe card",
      ],
    },
    {
      id: "rack",
      name: "The Rack",
      bottles: 6,
      monthly: 145,
      blurb:
        "A mixed half-case built around what just landed, with one club-only bottle.",
      perks: [
        "10% off the shelf, every visit",
        "One club-only bottle a month",
        "Two free tasting seats a year",
      ],
    },
    {
      id: "cellar",
      name: "The Cellar",
      bottles: 12,
      monthly: 270,
      blurb:
        "A full case, including allocations we never put on the shelf and something to lay down.",
      perks: [
        "15% off the shelf, every visit",
        "First pick of every allocation",
        "Four free tasting seats a year",
        "Release-night party for two",
      ],
    },
  ] as ClubTier[],
  yearlyNote: "Pay for the year and the twelfth month is on us.",
  steps: [
    {
      title: "Pick a size",
      text: "Three, six or twelve bottles. Change it any month.",
    },
    {
      title: "We choose, you taste",
      text: "Bottles are set aside on the first Thursday with a handwritten note for each.",
    },
    {
      title: "Collect or delivery",
      text: "Pick up within two weeks, or we drop them within five miles on Saturday.",
    },
  ],
  faq: [
    {
      q: "Can I skip or pause?",
      a: "Yes. Email us before the last day of the month and we will skip the next one. No fees, no questions.",
    },
    {
      q: "Can I tell you what I don't like?",
      a: "Please do. Tell us at sign-up or any time after, and we will keep your box free of it.",
    },
    {
      q: "Can I swap a bottle?",
      a: "When you collect, swap anything for something of the same price from the shelf.",
    },
    {
      q: "How do I cancel?",
      a: "One email to hello@pour.example. If you paid yearly, we refund the months you have not received.",
    },
  ],
};

/* ───────────── About ───────────── */

export const about = {
  lede: "Pour started as a shelf of forty bottles at the back of a record shop. Seven years later it is a shop by day, a bar by night, and still mostly a reason to talk about wine without the ceremony.",
  story: [
    "Mara Okafor spent ten years pouring wine in restaurants where the list was a test. Teo Lindqvist cooked in the kitchens next door. They both noticed that the bottles guests loved most were the cloudy, crunchy, slightly odd ones from small farms, and that nobody would sell them to you without a lecture.",
    "In 2019 they took over the old hardware store on Larch Street, kept the wooden counters and the ladder, and filled the walls with wine from growers they had met. The bar came a year later, because people kept asking if they could just open the bottle here.",
    "We still buy almost everything from people we know by name, still taste every wine before it reaches the shelf, and still think the best wine is the one you open tonight.",
  ],
  rules: [
    {
      title: "Farmed without chemicals",
      text: "Organic or biodynamic in the vineyard, certified or not. We visit when we can and ask hard questions when we cannot.",
    },
    {
      title: "Picked by hand",
      text: "Machine harvesting bruises fruit and invites more intervention later. Every wine here was picked by people.",
    },
    {
      title: "Nothing added",
      text: "Native yeasts, no fining agents, no flavour adjustments. A little sulphur at bottling is allowed, and we tell you exactly how much.",
    },
    {
      title: "Made by the people who farm it",
      text: "No négociant blends or brand projects. The name on the label is the person who pruned the vines.",
    },
  ],
  team: [
    {
      name: "Mara Okafor",
      role: "Co-owner & buyer",
      bio: "Tastes about four thousand wines a year so the shelf can hold two hundred. Weak for Chenin and anything from the Jura.",
    },
    {
      name: "Teo Lindqvist",
      role: "Co-owner & kitchen",
      bio: "Runs the bar and the tiny kitchen. Believes every wine is improved by something fried.",
    },
    {
      name: "Inès Ferrand",
      role: "Events & club",
      bio: "Picks the monthly club boxes and writes the notes. Grew up between vines in the Ardèche.",
    },
    {
      name: "Sam Achterberg",
      role: "Shop floor",
      bio: "The person to ask if you want a bottle under thirty dollars that tastes like twice that.",
    },
  ],
};

/* ───────────── Visit ───────────── */

export const visit = {
  directions: [
    {
      title: "On foot or bike",
      text: "Two blocks east of the river path, at the corner of Larch and 9th. Bike racks out front.",
    },
    {
      title: "By transit",
      text: "Bus 14 or 17 to Larch & 9th; the streetcar stops three minutes away on Grand.",
    },
    {
      title: "By car",
      text: "Street parking after 6 pm. Free short-stay pickup spot outside the shop door.",
    },
  ],
  delivery:
    "Local delivery within five miles every Tuesday, Thursday and Saturday, 2–7 pm. $8 a drop, free on orders over $150. Someone 21 or over must sign for it.",
  faq: [
    {
      q: "What do you mean by natural wine?",
      a: "Wine from grapes farmed organically or biodynamically, picked by hand and fermented with their own yeasts, with nothing added or removed except, sometimes, a little sulphur at bottling. We list the sulphur on every bottle.",
    },
    {
      q: "Do I need to book a table at the bar?",
      a: "No, the bar is walk-in only. If you are six or more, email us a day ahead and we will hold the long table for you.",
    },
    {
      q: "Can I drink a bottle from the shop at the bar?",
      a: "Yes. Pick anything off the shelf at shop price and we open it at the bar for $15 corkage.",
    },
    {
      q: "What if a bottle is faulty?",
      a: "Bring it back with at least half left within two weeks and we will swap it or refund you. Natural wine can be cloudy or fizzy on purpose; we will happily tell you which is which.",
    },
    {
      q: "Do you deliver?",
      a: "Within five miles of the shop on Tuesdays, Thursdays and Saturdays. Further afield, we can ship within the state by courier for $18 per case.",
    },
    {
      q: "Are the wines vegan?",
      a: "Almost all of them, since natural wine is rarely fined with egg or milk. The few exceptions are flagged on the shelf and the bottle page.",
    },
    {
      q: "Is Pour family friendly?",
      a: "The shop, yes, any time. The bar welcomes children until 7 pm with a grown-up.",
    },
    {
      q: "Do you do private events?",
      a: "The back room seats twenty for tastings, birthdays and team evenings. Email us with a date and a rough headcount.",
    },
  ],
};

export const home = {
  title: "Wine with nothing to hide.",
  lede: "A shop of two hundred natural wines from small farms, and a bar that opens any of them. Come in for a bottle, stay for a glass.",
  tonight: "Open at the bar tonight",
  shelfTitle: "New on the shelf",
  finderTitle: "Tell us how you like it",
  finderText:
    "Drag the glass to where your taste lives. Light or full, clean or wild: we will find the bottles that sit closest.",
  barTitle: "The board, tonight",
  growersTitle: "Every bottle has a name behind it",
  tastingsTitle: "Pull up a stool",
  clubTitle: "Let us pick for you, once a month",
  rulesTitle: "What makes it natural",
  visitTitle: "Come by. The door is open.",
};

export const newsletter = {
  title: "The Thursday list",
  text: "New arrivals, what is open at the bar, and seats for the next tasting. One email a week.",
};

export const checkout = {
  pickup: "Ready to collect in two hours during shop hours. Bring photo ID.",
  deliveryFee: 8,
  freeOver: 150,
  slots: ["Tuesday, 2–7 pm", "Thursday, 2–7 pm", "Saturday, 2–7 pm"],
  caseSize: 6,
  caseDiscount: 0.1,
  note: "This is a demo: nothing is charged and no order is sent.",
};
