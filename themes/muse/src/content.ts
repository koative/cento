import lookGreyCoat from "./assets/look-grey-coat.jpg";
import lookCamelDoor from "./assets/look-camel-door.jpg";
import lookOliveCoat from "./assets/look-olive-coat.jpg";
import lookButterSuit from "./assets/look-butter-suit.jpg";
import lookCreamCoat from "./assets/look-cream-coat.jpg";
import lookCamelSuit from "./assets/look-camel-suit.jpg";
import lookSnow from "./assets/look-snow.jpg";
import lookWhiteSuit from "./assets/look-white-suit.jpg";
import lookLinenBack from "./assets/look-linen-back.jpg";
import lookTrouser from "./assets/look-trouser.jpg";
import pHoursCoat from "./assets/p-hours-coat.jpg";
import pBeltDetail from "./assets/p-belt-detail.jpg";
import pTrench from "./assets/p-trench.jpg";
import pPaleCoat from "./assets/p-pale-coat.jpg";
import pCheckCoat from "./assets/p-check-coat.jpg";
import pShirt from "./assets/p-shirt.jpg";
import pShirtDetail from "./assets/p-shirt-detail.jpg";
import pShellTop from "./assets/p-shell-top.jpg";
import pKnit from "./assets/p-knit.jpg";
import pKnitStack from "./assets/p-knit-stack.jpg";
import pShiftDress from "./assets/p-shift-dress.jpg";
import pSlipDress from "./assets/p-slip-dress.jpg";
import pPleatTrouser from "./assets/p-pleat-trouser.jpg";
import pCreamTrouser from "./assets/p-cream-trouser.jpg";
import pTote from "./assets/p-tote.jpg";
import pCrossbody from "./assets/p-crossbody.jpg";
import pPouch from "./assets/p-pouch.jpg";
import pAnkleBoot from "./assets/p-ankle-boot.jpg";
import pLongBoot from "./assets/p-long-boot.jpg";
import atelierPatterns from "./assets/atelier-patterns.jpg";
import atelierCutting from "./assets/atelier-cutting.jpg";
import atelierTailor from "./assets/atelier-tailor.jpg";
import atelierThread from "./assets/atelier-thread.jpg";
import fabricTable from "./assets/fabric-table.jpg";
import fabricFlannel from "./assets/fabric-flannel.jpg";
import storeParis from "./assets/store-paris.jpg";
import storeLondon from "./assets/store-london.jpg";
import storeNewYork from "./assets/store-newyork.jpg";
import journalYarn from "./assets/journal-yarn.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Muse",
  sector: "Fashion label",
  city: "Paris",
  founded: 2013,
  season: "Autumn / Winter 2026",
  seasonShort: "AW26",
  collection: "The Quiet Hours",
  email: "hello@muse.example",
  phone: "+1 555 0142 300",
  phoneHref: "tel:+15550142300",
  announcement: [
    "Complimentary delivery over €300",
    "Free returns within 30 days",
    "Alterations in every store",
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/collection", label: "Collection" },
  { to: "/shop", label: "Shop" },
  { to: "/journal", label: "Journal" },
  { to: "/stores", label: "Stores" },
  { to: "/house", label: "The House" },
];

/* --------------------------------------------------------------- products */

export type CategoryId =
  | "outerwear"
  | "tailoring"
  | "knitwear"
  | "shirts"
  | "dresses"
  | "bags"
  | "shoes";

export const categories: { id: CategoryId; label: string; line: string }[] = [
  {
    id: "outerwear",
    label: "Coats",
    line: "Double-faced wool, gabardine and check, cut long.",
  },
  {
    id: "tailoring",
    label: "Tailoring",
    line: "Jackets and trousers pressed by hand in the atelier.",
  },
  {
    id: "knitwear",
    label: "Knitwear",
    line: "Merino and cashmere from one spinner in Biella.",
  },
  {
    id: "shirts",
    label: "Shirts & tops",
    line: "Poplin and double crepe, the layer under everything.",
  },
  {
    id: "dresses",
    label: "Dresses",
    line: "Bias-cut silk and wool-linen for the long evenings.",
  },
  {
    id: "bags",
    label: "Bags",
    line: "Vegetable-tanned leather, stitched in Ubrique.",
  },
  {
    id: "shoes",
    label: "Shoes",
    line: "Boots on a low, walkable heel, made in the Marche.",
  },
];

export type Colour = { name: string; hex: string; image?: string };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  colours: Colour[];
  sizes: string[];
  /** Sizes currently sold out in every colour. */
  soldOut?: string[];
  images: string[];
  alt: string;
  isNew?: boolean;
  blurb: string;
  description: string;
  details: string[];
  composition: string;
  care: string[];
  fit: string;
  madeIn: string;
};

const FR = ["34", "36", "38", "40", "42", "44"];
const EU = ["36", "37", "38", "39", "40", "41"];
const ONE = ["One size"];

export const products: Product[] = [
  {
    id: "hours-coat",
    name: "The Hours Coat",
    category: "outerwear",
    price: 790,
    colours: [
      { name: "Camel", hex: "#b98a5a", image: pHoursCoat },
      { name: "Charcoal", hex: "#45433f", image: lookGreyCoat },
    ],
    sizes: FR,
    soldOut: ["44"],
    images: [pHoursCoat, pBeltDetail],
    alt: "A woman in a long camel wrap coat with a tie belt, standing against a pale wall",
    isNew: true,
    blurb: "Double-faced wool and cashmere, wrapped and belted.",
    description:
      "The coat the collection is named after. Two layers of wool and cashmere are woven together, then split apart by hand along every edge and slip-stitched closed, so there is no lining, no facing and nothing to drag. It wraps deep across the body and ties at the waist, and it is just as right open over a knit as it is belted shut at seven in the morning.",
    details: [
      "Unlined, hand-closed edges",
      "Dropped shoulder, deep wrap",
      "Self tie belt and two belt loops",
      "Patch pockets, set at hand height",
      "Mid-calf length: 118 cm in size 38",
    ],
    composition: "90% wool, 10% cashmere",
    care: [
      "Dry clean only",
      "Brush after wearing",
      "Steam, do not press",
      "Rest on a wide hanger",
    ],
    fit: "Generous. Take your usual size; size down for a closer wrap.",
    madeIn: "Made in our Paris atelier",
  },
  {
    id: "rue-trench",
    name: "Rue Trench",
    category: "outerwear",
    price: 640,
    colours: [{ name: "Stone", hex: "#c9b58f" }],
    sizes: FR,
    images: [pTrench],
    alt: "A woman in a stone trench coat with a belted waist against a sand-coloured backdrop",
    blurb: "Tight-woven cotton gabardine with a storm flap.",
    description:
      "A trench with the hardware taken away. Cotton gabardine dense enough to shed a Paris drizzle, a single storm flap, raglan sleeves for movement and a belt you can knot rather than buckle. The cuff tabs are kept because they work: pull them in when the wind turns.",
    details: [
      "Raglan sleeves, cuff tabs",
      "Single storm flap, hidden placket",
      "Half-lined in cupro",
      "Knot belt, no buckle",
      "Knee length: 104 cm in size 38",
    ],
    composition: "100% cotton gabardine; lining 100% cupro",
    care: [
      "Dry clean only",
      "Reproof once a season",
      "Cool iron on the reverse",
    ],
    fit: "True to size, with room for a knit underneath.",
    madeIn: "Made in Portugal",
  },
  {
    id: "pale-coat",
    name: "Pale Coat",
    category: "outerwear",
    price: 720,
    colours: [
      { name: "Ivory", hex: "#ece5d8" },
      { name: "Black", hex: "#1b1916" },
    ],
    sizes: FR,
    images: [pPaleCoat, lookCreamCoat],
    alt: "A woman in an ivory double-breasted wool coat thrown over a dark knit",
    isNew: true,
    blurb: "Boiled wool, double-breasted, cut to the hip.",
    description:
      "Boiled wool is knitted, then shrunk and felted until it holds a shape on its own. That is why the Pale Coat can carry a broad lapel and a short, square body without any canvas inside. It is warm far beyond its weight and soft enough to wear over a shirt alone.",
    details: [
      "Six buttons in corozo nut",
      "Broad notch lapel",
      "Unlined",
      "Hip length: 76 cm in size 38",
    ],
    composition: "100% boiled wool",
    care: ["Dry clean only", "Air between wears", "Lint brush, never a roller"],
    fit: "Boxy and short. Take your usual size.",
    madeIn: "Made in our Paris atelier",
  },
  {
    id: "charonne-overcoat",
    name: "Charonne Overcoat",
    category: "outerwear",
    price: 860,
    colours: [{ name: "Tobacco check", hex: "#6b5640" }],
    sizes: FR,
    soldOut: ["34"],
    images: [pCheckCoat, lookOliveCoat],
    alt: "A woman in a long tobacco check overcoat leaning against a concrete pillar",
    blurb: "A man's overcoat cloth, recut for a narrower shoulder.",
    description:
      "We found this check in a mill archive, woven in the 1970s for men's overcoats, and asked for it again in a lighter weight. The coat keeps the long, straight line and the inside poacher pocket of the original, with a shoulder narrowed by two centimetres and a collar that stands up when you want it to.",
    details: [
      "Single-breasted, three buttons",
      "Fully lined in check-matched viscose",
      "Inside poacher pocket",
      "Below-knee length: 112 cm in size 38",
    ],
    composition: "100% wool; lining 100% viscose",
    care: ["Dry clean only", "Brush with the nap", "Rest on a wide hanger"],
    fit: "Long and straight. Size down if between sizes.",
    madeIn: "Made in Italy",
  },
  {
    id: "column-jacket",
    name: "Column Jacket",
    category: "tailoring",
    price: 560,
    colours: [
      { name: "Ivory", hex: "#ece5d8", image: lookWhiteSuit },
      { name: "Butter", hex: "#d9c27f", image: lookButterSuit },
    ],
    sizes: FR,
    images: [lookWhiteSuit, lookButterSuit],
    alt: "A woman in an ivory single-breasted jacket and matching trousers, photographed in black and white",
    blurb: "A long single-breasted jacket in wool gabardine.",
    description:
      "Long enough to wear as a short coat, cut straight from shoulder to hem so it falls like a column. The canvas is half floating and hand padded at the lapel, which is why the roll stays soft. Wear it with the Long Line Trouser in the same cloth, or with nothing matching at all.",
    details: [
      "Half-canvassed, hand-padded lapel",
      "One button, jetted pockets",
      "Lined in cupro",
      "Hip length: 78 cm in size 38",
    ],
    composition: "100% wool gabardine; lining 100% cupro",
    care: ["Dry clean only", "Press through a cloth"],
    fit: "Relaxed through the body, precise at the shoulder.",
    madeIn: "Made in our Paris atelier",
  },
  {
    id: "fold-trouser",
    name: "Fold Trouser",
    category: "tailoring",
    price: 320,
    colours: [
      { name: "Flannel grey", hex: "#8c8781", image: lookTrouser },
      { name: "Camel", hex: "#b98a5a", image: pPleatTrouser },
    ],
    sizes: FR,
    images: [lookTrouser, pPleatTrouser],
    alt: "A woman seated on a stool wearing wide grey flannel trousers and a knotted white shirt",
    isNew: true,
    blurb: "Double pleats, a high waist and a full, pressed leg.",
    description:
      "Two deep pleats on each side, turned towards the pocket, so the trouser opens when you sit and closes again when you stand. Flannel brushed on both faces gives the leg weight; it falls straight to the floor and breaks once on a boot.",
    details: [
      "High rise, extended waistband tab",
      "Double forward pleats",
      "Side-seam pockets, one back welt",
      "Unhemmed for alteration in store",
    ],
    composition: "100% wool flannel",
    care: ["Dry clean only", "Hang by the hem to drop creases"],
    fit: "Sits at the natural waist. Take your usual size.",
    madeIn: "Made in Portugal",
  },
  {
    id: "long-line-trouser",
    name: "Long Line Trouser",
    category: "tailoring",
    price: 290,
    colours: [{ name: "Ivory", hex: "#ece5d8" }],
    sizes: FR,
    images: [pCreamTrouser],
    alt: "Close view of ivory wide-leg trousers with a pressed crease",
    blurb: "Wool crepe, a flat front and a sharp crease.",
    description:
      "The quieter partner to the Fold Trouser: flat-fronted, mid-rise and pressed with a permanent crease that runs from waistband to hem. Wool crepe has a dry hand and a little give, so it sits well through a long day.",
    details: [
      "Flat front, mid rise",
      "Permanent pressed crease",
      "Slant pockets",
      "Full length: 106 cm outseam in size 38",
    ],
    composition: "96% wool, 4% elastane",
    care: ["Dry clean or cool hand wash", "Press along the crease only"],
    fit: "Straight and long. Hem in store to your shoe.",
    madeIn: "Made in Portugal",
  },
  {
    id: "morning-shirt",
    name: "Morning Shirt",
    category: "shirts",
    price: 210,
    colours: [{ name: "White", hex: "#f6f4ef" }],
    sizes: FR,
    images: [pShirt, pShirtDetail],
    alt: "A woman in an oversized white poplin shirt against a grey wall",
    blurb: "Oversized poplin with a dropped shoulder.",
    description:
      "A man's shirt, borrowed and kept. The body is cut wide and long enough to knot or tuck, the collar is soft and unfused, and the cuffs are deep enough to roll twice. Cotton poplin from a single mill in Como, washed once so it never looks new.",
    details: [
      "Unfused collar and cuffs",
      "Mother-of-pearl buttons",
      "Curved hem, longer at the back",
      "Garment washed",
    ],
    composition: "100% cotton poplin",
    care: ["Machine wash 30°C", "Hang to dry", "Iron while damp"],
    fit: "Oversized. Size down for a closer fit.",
    madeIn: "Made in Italy",
  },
  {
    id: "shell-top",
    name: "Shell Top",
    category: "shirts",
    price: 160,
    colours: [{ name: "Black", hex: "#1b1916" }],
    sizes: FR,
    images: [pShellTop],
    alt: "A woman in a black sleeveless crepe top, photographed in profile against grey",
    blurb: "Sleeveless double crepe that holds its shape.",
    description:
      "Double crepe is heavy enough to stand slightly away from the body, which is what makes this a top and not a vest. A high neck, cut-in shoulders and a back button so it slips on over the head without a zip.",
    details: [
      "High round neck",
      "Single button at the back neck",
      "Fully faced, no lining",
      "Hip length",
    ],
    composition: "100% triacetate double crepe",
    care: ["Hand wash cold", "Dry flat", "Cool iron"],
    fit: "Straight. Take your usual size.",
    madeIn: "Made in Portugal",
  },
  {
    id: "quiet-knit",
    name: "Quiet Knit",
    category: "knitwear",
    price: 320,
    colours: [
      { name: "Charcoal", hex: "#45433f" },
      { name: "Oat", hex: "#d6c8b2" },
      { name: "Camel", hex: "#b98a5a" },
    ],
    sizes: FR,
    images: [pKnit, pKnitStack],
    alt: "Folded crew-neck knits in charcoal, grey and camel",
    isNew: true,
    blurb: "A plain crew in merino and cashmere, fully fashioned.",
    description:
      "Every piece is knitted to shape rather than cut from a panel, so the seams are linked stitch by stitch and nothing frays. Twelve-gauge, light enough under a coat and dense enough to wear alone. The collection's most worn piece.",
    details: [
      "Fully fashioned, linked seams",
      "12-gauge plain knit",
      "Tubular rib at the neck, cuffs and hem",
      "Relaxed body",
    ],
    composition: "70% merino wool, 30% cashmere",
    care: [
      "Hand wash cold with wool soap",
      "Dry flat in shape",
      "Fold, never hang",
    ],
    fit: "Relaxed. Take your usual size.",
    madeIn: "Knitted in Biella, Italy",
  },
  {
    id: "studio-shift",
    name: "Studio Shift",
    category: "dresses",
    price: 390,
    colours: [{ name: "Natural", hex: "#d8ccb6" }],
    sizes: FR,
    soldOut: ["36"],
    images: [pShiftDress, lookLinenBack],
    alt: "A woman in a sleeveless natural wool-linen shift dress against a pale studio wall",
    blurb: "Wool-linen, bias-faced, to the knee.",
    description:
      "A dress made to be worn under the coats. The shift is cut in a wool and linen blend that keeps linen's dry texture with a little more warmth, faced on the bias so the neckline lies flat, and finished with deep in-seam pockets.",
    details: [
      "Bias-faced neck and armholes",
      "In-seam pockets",
      "Concealed side zip",
      "Knee length: 98 cm in size 38",
    ],
    composition: "55% linen, 45% wool",
    care: ["Dry clean or hand wash cold", "Steam to relax"],
    fit: "Straight, with ease through the hip.",
    madeIn: "Made in our Paris atelier",
  },
  {
    id: "bias-slip",
    name: "Bias Slip Dress",
    category: "dresses",
    price: 460,
    colours: [{ name: "Silver", hex: "#c7c4bd" }],
    sizes: FR,
    images: [pSlipDress],
    alt: "A woman in a long silver satin slip dress and long black gloves against grey",
    blurb: "Silk satin cut on the bias, floor length.",
    description:
      "Cut on the bias, the silk drops into the body and moves before you do. Narrow straps adjust at the back, the hem is hand-rolled, and the dress is left to hang for two days in the atelier before it is finished, so the bias has settled before it reaches you.",
    details: [
      "Bias cut, hand-rolled hem",
      "Adjustable straps",
      "Rested two days before finishing",
      "Floor length: 138 cm in size 38",
    ],
    composition: "100% silk satin",
    care: ["Dry clean only", "Store hanging, out of light"],
    fit: "Close through the hip. If between sizes, size up.",
    madeIn: "Made in our Paris atelier",
  },
  {
    id: "lattice-tote",
    name: "Lattice Tote",
    category: "bags",
    price: 690,
    colours: [{ name: "Tobacco", hex: "#8a4f2b" }],
    sizes: ONE,
    images: [pTote],
    alt: "A woven tobacco leather tote with a gold chain handle on a pale grey background",
    blurb: "Woven calf leather on a soft, unstructured base.",
    description:
      "Wide bands of vegetable-tanned calf are woven by hand over a cotton core, which keeps the bag light and lets it soften with use. One chain handle for the shoulder, one inner pocket for keys and a phone, nothing else.",
    details: [
      "Hand-woven calf leather",
      "Brass chain handle, 58 cm drop",
      "One zip pocket inside",
      "W 44 × H 32 × D 14 cm",
    ],
    composition: "Calf leather; cotton lining; brass",
    care: [
      "Wipe with a dry cloth",
      "Condition twice a year",
      "Store stuffed with tissue",
    ],
    fit: "Fits a 14-inch laptop.",
    madeIn: "Made in Ubrique, Spain",
  },
  {
    id: "saddle-bag",
    name: "Saddle Bag",
    category: "bags",
    price: 480,
    colours: [{ name: "Cognac", hex: "#9a5631" }],
    sizes: ONE,
    images: [pCrossbody],
    alt: "A small cognac leather crossbody bag with a flap and long strap on white",
    blurb: "Pebbled calf, worn across the body.",
    description:
      "A small flap bag with a strap long enough to wear across a coat. The flap closes on a hidden magnet, the edges are painted and burnished by hand, and the strap adjusts in five places.",
    details: [
      "Pebbled calf leather",
      "Hidden magnetic closure",
      "Adjustable strap, 52–64 cm drop",
      "W 22 × H 15 × D 7 cm",
    ],
    composition: "Calf leather; suede lining",
    care: ["Wipe with a dry cloth", "Keep from rain"],
    fit: "Holds a phone, cards and keys.",
    madeIn: "Made in Ubrique, Spain",
  },
  {
    id: "soir-pouch",
    name: "Soir Pouch",
    category: "bags",
    price: 420,
    colours: [{ name: "Black", hex: "#1b1916" }],
    sizes: ONE,
    images: [pPouch],
    alt: "A soft, rounded black leather pouch bag resting against a white wall",
    blurb: "Gathered nappa, carried in the hand.",
    description:
      "A rounded pouch in nappa so soft it gathers when you hold it. It zips across the top and has a short wrist strap that tucks inside for evenings. The lining is the same black silk we use for the Bias Slip Dress.",
    details: [
      "Gathered lamb nappa",
      "Top zip, tuck-away wrist strap",
      "Silk lining",
      "W 30 × H 18 × D 12 cm",
    ],
    composition: "Lamb leather; silk lining",
    care: ["Store in its cotton bag", "Keep from rain"],
    fit: "Holds a phone, a wallet and a paperback.",
    madeIn: "Made in Ubrique, Spain",
  },
  {
    id: "pave-boot",
    name: "Pavé Boot",
    category: "shoes",
    price: 540,
    colours: [{ name: "Black", hex: "#1b1916" }],
    sizes: EU,
    soldOut: ["41"],
    images: [pAnkleBoot],
    alt: "A black leather ankle boot with an inside zip on a white surface",
    blurb: "An ankle boot on a 40 mm block heel.",
    description:
      "Named for the cobbles outside the Charonne shop, which every heel in this collection has to survive. Box calf with an almond toe, a 40 mm stacked leather heel with a rubber top piece, and a Blake-stitched sole that can be resoled in store.",
    details: [
      "Box calf, leather lined",
      "40 mm stacked heel",
      "Inside zip",
      "Blake-stitched, resoleable",
    ],
    composition: "Calf leather; leather sole with rubber insert",
    care: [
      "Polish with neutral cream",
      "Use shoe trees",
      "Resole in any Muse store",
    ],
    fit: "True to size. Half sizes take the size up.",
    madeIn: "Made in the Marche, Italy",
  },
  {
    id: "slouch-boot",
    name: "Slouch Boot",
    category: "shoes",
    price: 720,
    colours: [{ name: "Black", hex: "#1b1916" }],
    sizes: EU,
    images: [pLongBoot],
    alt: "A pair of tall black leather boots with a soft, slouched shaft",
    blurb: "Knee-high nappa that falls into soft folds.",
    description:
      "A tall boot without a zip: the shaft is wide enough to pull on and soft enough to fold down at the ankle. Unlined nappa above, calf below, on the same almond last and block heel as the Pavé Boot.",
    details: [
      "Pull-on, no zip",
      "Unlined nappa shaft",
      "50 mm block heel",
      "Shaft height 42 cm in size 38",
    ],
    composition: "Lamb and calf leather; leather sole",
    care: ["Store with boot shapers", "Condition the shaft twice a season"],
    fit: "True to size. Roomy through the calf.",
    madeIn: "Made in the Marche, Italy",
  },
];

export const sizeGuide = {
  clothing: {
    head: ["FR", "UK", "US", "Bust", "Waist", "Hip"],
    rows: [
      ["34", "6", "2", "80", "62", "88"],
      ["36", "8", "4", "84", "66", "92"],
      ["38", "10", "6", "88", "70", "96"],
      ["40", "12", "8", "92", "74", "100"],
      ["42", "14", "10", "96", "78", "104"],
      ["44", "16", "12", "100", "82", "108"],
    ],
    note: "Body measurements in centimetres. Measure over a thin layer.",
  },
  shoes: {
    head: ["EU", "UK", "US", "Foot length"],
    rows: [
      ["36", "3", "6", "23.0"],
      ["37", "4", "7", "23.7"],
      ["38", "5", "8", "24.3"],
      ["39", "6", "9", "25.0"],
      ["40", "7", "10", "25.7"],
      ["41", "8", "11", "26.3"],
    ],
    note: "Foot length in centimetres, heel to longest toe.",
  },
};

export const productService = [
  {
    q: "Delivery",
    a: "Standard delivery takes 2–4 working days in Europe and 4–6 to the UK and US, and is complimentary on orders over €300. Express arrives the next working day in France and within two days elsewhere.",
  },
  {
    q: "Returns and exchanges",
    a: "Return anything unworn within 30 days, by post or in any store. Exchanges for another size are sent the day your return is scanned.",
  },
  {
    q: "Alterations",
    a: "Sleeves and hems are altered free in every store within 60 days of purchase. Trousers are left unhemmed so we can finish them to your shoe.",
  },
];

/* --------------------------------------------------------------- lookbook */

export type Look = {
  n: number;
  hour: string;
  title: string;
  note: string;
  image: string;
  alt: string;
  pieces: string[];
};

/** Route of a look: /collection/look-01 */
export const lookPath = (n: number) =>
  `/collection/look-${String(n).padStart(2, "0")}`;

export const looks: Look[] = [
  {
    n: 1,
    hour: "06:10",
    title: "First light on the canal",
    note: "The Hours Coat in charcoal, wrapped high over a shell top. The belt is left loose; the morning has not decided yet.",
    image: lookGreyCoat,
    alt: "Black and white photograph of a woman in a long grey coat over a dark top and trousers",
    pieces: ["hours-coat", "shell-top", "fold-trouser"],
  },
  {
    n: 2,
    hour: "06:40",
    title: "A door on Rue Keller",
    note: "Camel over olive. The coat worn open so the dress shows its length all the way to the boot.",
    image: lookCamelDoor,
    alt: "A woman in a camel coat over an olive dress standing in front of a tall black door",
    pieces: ["hours-coat", "studio-shift", "pave-boot"],
  },
  {
    n: 3,
    hour: "07:15",
    title: "Against the concrete",
    note: "The Charonne Overcoat, collar up, over the Quiet Knit and a long skirt. A man's coat worn by someone who never gave it back.",
    image: lookOliveCoat,
    alt: "A woman in a long dark overcoat, cap and rust skirt standing against a concrete wall",
    pieces: ["charonne-overcoat", "quiet-knit", "slouch-boot"],
  },
  {
    n: 4,
    hour: "08:00",
    title: "Butter, held still",
    note: "The Column Jacket in butter gabardine with the trouser in the same cloth. Nothing between the shoulder and the floor interrupts the line.",
    image: lookButterSuit,
    alt: "A woman in profile in a butter-yellow tailored suit, holding dried flowers in warm light",
    pieces: ["column-jacket", "fold-trouser"],
  },
  {
    n: 5,
    hour: "08:30",
    title: "Crossing at the light",
    note: "The Pale Coat thrown over black, a small bag across the body, hands free for the coffee.",
    image: lookCreamCoat,
    alt: "A woman in an ivory coat over a black turtleneck standing in a city street at dusk",
    pieces: ["pale-coat", "shell-top", "saddle-bag"],
  },
  {
    n: 6,
    hour: "17:50",
    title: "The long walk home",
    note: "Camel on camel: the trench belted, the pleated trouser underneath, the pouch carried rather than worn.",
    image: lookCamelSuit,
    alt: "A woman in a long camel coat and wide trousers leaning back against a pale studio wall",
    pieces: ["rue-trench", "fold-trouser", "soir-pouch"],
  },
  {
    n: 7,
    hour: "18:30",
    title: "Ivory, after hours",
    note: "The Column Jacket and the Long Line Trouser in ivory gabardine. A suit only in the sense that the cloth matches.",
    image: lookWhiteSuit,
    alt: "Black and white photograph of a woman walking in an ivory jacket and wide trousers",
    pieces: ["column-jacket", "long-line-trouser"],
  },
  {
    n: 8,
    hour: "19:20",
    title: "Sitting for the fitting",
    note: "The Morning Shirt knotted at the waist over flannel. This is how the studio dresses on a fitting day.",
    image: lookTrouser,
    alt: "A woman seated on a wooden stool in a white shirt and wide grey trousers against a brown backdrop",
    pieces: ["morning-shirt", "fold-trouser", "pave-boot"],
  },
  {
    n: 9,
    hour: "21:00",
    title: "Snow on the way out",
    note: "The Quiet Knit in charcoal over a long black skirt and slouch boots, for the first cold night of the year.",
    image: lookSnow,
    alt: "Black and white photograph of a woman in a dark knit and long skirt walking through snow",
    pieces: ["quiet-knit", "bias-slip", "slouch-boot"],
  },
  {
    n: 10,
    hour: "23:40",
    title: "Last of the warmth",
    note: "The Studio Shift worn loose and long, the tote over one shoulder. The collection ends where it began, with the light going.",
    image: lookLinenBack,
    alt: "A woman seen from behind in a loose natural dress and straw hat against a concrete wall",
    pieces: ["studio-shift", "lattice-tote"],
  },
];

export const collection = {
  title: "The Quiet Hours",
  season: "Autumn / Winter 2026",
  intro:
    "Ten looks, each named for an hour of a single day in the eleventh arrondissement: from first light on the Canal Saint-Martin to the last warm hour on the way home. Every piece is in the shop now, in small runs.",
  credits:
    "Photographed in Paris over one week in March. Styling by the studio.",
};

/* ---------------------------------------------------------------- journal */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; by: string };

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  author: string;
  minutes: number;
  image: string;
  alt: string;
  topic: "Atelier" | "Collection" | "Materials" | "Care";
  related?: string[];
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "forty-hours-in-a-coat",
    title: "Forty hours in a coat",
    dek: "How the Hours Coat is made, from the split edge to the last slip stitch.",
    date: "2026-10-02",
    author: "Margaux Lemaire, head of atelier",
    minutes: 6,
    image: atelierTailor,
    alt: "A tailor's hands working a piece of wool cloth on a wooden cutting table",
    topic: "Atelier",
    related: ["hours-coat", "pale-coat"],
    body: [
      {
        type: "p",
        text: "A double-faced cloth is two fabrics woven at once and held together by a binding thread. Seen from the edge, it looks like one heavy wool. Seen by the person sewing it, it is a promise: if you are patient, you never need a lining.",
      },
      {
        type: "p",
        text: "The Hours Coat begins on the cutting table like any other coat. The difference starts at the edge. Instead of turning the cloth back on itself, the two layers are separated by hand for about a centimetre, the binding thread cut stitch by stitch with a small blade. The outer layer folds in, the inner layer folds in, and the two are closed against each other with a slip stitch so small it disappears into the nap.",
      },
      { type: "h", text: "Why the edge matters" },
      {
        type: "p",
        text: "A coat closed this way has no seam allowance, no facing and no hem to press. It is as soft at the front edge as it is in the middle of the back. It also cannot be rushed. Every edge of the coat, around the collar, down the front, along the hem and across the pockets, is done this way. On average it takes Aurore and Sami forty hours to finish one.",
      },
      {
        type: "quote",
        text: "You can see a machine edge from across the street. A hand edge, you only notice when you put the coat on.",
        by: "Aurore Dumas, coat maker",
      },
      { type: "h", text: "Small runs, on purpose" },
      {
        type: "p",
        text: "We make the Hours Coat in runs of sixty per colour. When a run sells through, the next one is cut. It means a size is sometimes out for a few weeks; it also means nothing sits in a warehouse waiting for a sale.",
      },
      {
        type: "p",
        text: "If you want to see an edge being closed, ask in the Charonne shop. The atelier is one floor up, and on most weekday afternoons there is a coat on the table.",
      },
    ],
  },
  {
    slug: "notes-on-the-quiet-hours",
    title: "Notes on the quiet hours",
    dek: "Inès Varga on the collection, a single day, and why the clothes start at six in the morning.",
    date: "2026-09-12",
    author: "Inès Varga, founder and designer",
    minutes: 5,
    image: lookOliveCoat,
    alt: "A woman in a long dark overcoat and cap standing against a concrete wall",
    topic: "Collection",
    related: ["charonne-overcoat", "quiet-knit", "column-jacket"],
    body: [
      {
        type: "p",
        text: "I walk to the studio early. Between six and eight the eleventh arrondissement belongs to bakers, dog walkers and people coming home from a night shift. Nobody is dressed for anyone else. That is the feeling I wanted for this collection: clothes you put on for yourself, before the day has asked you for anything.",
      },
      { type: "h", text: "One day, ten looks" },
      {
        type: "p",
        text: "Each look in the lookbook is named for an hour, and they run in order, from 06:10 at the canal to 23:40 on the way home. The colours follow the light: charcoal and camel in the morning, butter and ivory in the middle of the day, black and silver after dark.",
      },
      {
        type: "quote",
        text: "The best coat is the one you forget you are wearing until someone asks where it is from.",
        by: "Inès Varga",
      },
      { type: "h", text: "Fewer things, worn longer" },
      {
        type: "p",
        text: "There are seventeen pieces this season. Most of them work with most of the others, and nothing in the collection exists only for a photograph. If a piece cannot be worn on a Tuesday, we leave it out.",
      },
      {
        type: "p",
        text: "Everything is in the shop now. Come and try it on in Paris, London or New York; we will take the time to get the length right.",
      },
    ],
  },
  {
    slug: "a-mill-in-biella",
    title: "A mill in Biella",
    dek: "Two days at the spinner who has made our merino and flannel since the first collection.",
    date: "2026-08-21",
    author: "Théo Marchal, materials",
    minutes: 7,
    image: fabricFlannel,
    alt: "Folded wool flannel cloth in grey and navy, close up",
    topic: "Materials",
    related: ["quiet-knit", "fold-trouser"],
    body: [
      {
        type: "p",
        text: "The road to the mill climbs out of Biella along the Cervo river, past older mills that now hold offices and one that holds a museum. Lanificio Serra is still working, in a building of brick and glass that has been extended five times since 1911.",
      },
      {
        type: "p",
        text: "Serra spins the yarn for the Quiet Knit and weaves the flannel for the Fold Trouser. We have bought from them since our first collection, when we needed eighty metres and they agreed to weave it anyway.",
      },
      { type: "h", text: "Brushed twice" },
      {
        type: "p",
        text: "Flannel gets its softness from finishing, not from the weave. After weaving, the cloth is washed, milled and then raised with teasel heads, real dried thistles, that pull the fibres up into a nap. Ours is raised on both faces, which is why the trouser feels the same inside and out.",
      },
      {
        type: "quote",
        text: "Wool remembers everything you do to it. That is the difficulty, and that is the point.",
        by: "Paola Serra, mill director",
      },
      { type: "h", text: "What we asked for" },
      {
        type: "p",
        text: "This season we asked for the merino-cashmere yarn to be spun with a slightly lower twist. It makes the knit softer and a little warmer, at the cost of a few weeks more on the machines. Paola agreed, on the condition that we come back in February and see what the cloth looks like after a winter of wear. We will.",
      },
    ],
  },
  {
    slug: "how-to-keep-wool",
    title: "How to keep wool for twenty years",
    dek: "Brushing, resting, steaming and folding: the care guide we give everyone in store.",
    date: "2026-07-30",
    author: "The Muse stores",
    minutes: 4,
    image: journalYarn,
    alt: "Skeins of undyed wool yarn and a knitted piece, close up",
    topic: "Care",
    related: ["quiet-knit", "hours-coat", "charonne-overcoat"],
    body: [
      {
        type: "p",
        text: "Most wool is ruined by kindness: washed too often, ironed too hard, hung on a hanger that is too thin. The good news is that wool needs very little. Here is what we tell everyone who buys a coat or a knit from us.",
      },
      { type: "h", text: "Brush, then rest" },
      {
        type: "p",
        text: "After wearing a coat, give it a brush from the shoulders down with a natural-bristle clothes brush. It lifts dust out of the nap before it settles. Then leave it a day on a broad wooden hanger before you wear it again; wool recovers its shape when it rests.",
      },
      { type: "h", text: "Steam instead of pressing" },
      {
        type: "p",
        text: "Creases fall out of wool with steam alone. Hold a steamer a hand's width away and let the cloth do the work. If you must press, press through a damp cotton cloth and never on the right side of double-faced wool.",
      },
      { type: "h", text: "Fold your knitwear" },
      {
        type: "p",
        text: "Knits stretch on hangers. Fold them, store them with cedar, and wash them by hand only when they truly need it, which is less often than you think. Airing a knit by an open window for an afternoon does most of the work of a wash.",
      },
      {
        type: "quote",
        text: "If a coat ever needs more than a brush, bring it in. We will look at it for free, even if it is not one of ours.",
        by: "The Charonne shop",
      },
    ],
  },
];

/* ----------------------------------------------------------------- stores */

export type Store = {
  id: string;
  city: string;
  name: string;
  address: string[];
  timeZone: string;
  /** Sunday first, as [open, close] in 24h "HH:MM", or null when closed. */
  hours: ([string, string] | null)[];
  phone: string;
  phoneHref: string;
  email: string;
  image: string;
  alt: string;
  note: string;
  services: string[];
};

export const stores: Store[] = [
  {
    id: "paris",
    city: "Paris",
    name: "Rue de Charonne",
    address: ["14 Rue de Charonne", "75011 Paris, France"],
    timeZone: "Europe/Paris",
    hours: [
      ["14:00", "18:00"],
      null,
      ["11:00", "19:30"],
      ["11:00", "19:30"],
      ["11:00", "19:30"],
      ["11:00", "19:30"],
      ["10:30", "19:30"],
    ],
    phone: "+1 555 0142 301",
    phoneHref: "tel:+15550142301",
    email: "charonne@muse.example",
    image: storeParis,
    alt: "Rails of ivory and stone garments beside a concrete column in a bright shop",
    note: "Our first shop, below the atelier. On most weekday afternoons you can watch a coat being finished upstairs.",
    services: [
      "Atelier visits on request",
      "Free alterations within 60 days",
      "Private appointments before opening",
    ],
  },
  {
    id: "london",
    city: "London",
    name: "Marylebone",
    address: ["31 Chiltern Street", "London W1U 7PN, United Kingdom"],
    timeZone: "Europe/London",
    hours: [
      ["12:00", "17:00"],
      ["10:00", "19:00"],
      ["10:00", "19:00"],
      ["10:00", "19:00"],
      ["10:00", "20:00"],
      ["10:00", "19:00"],
      ["10:00", "19:00"],
    ],
    phone: "+1 555 0142 302",
    phoneHref: "tel:+15550142302",
    email: "marylebone@muse.example",
    image: storeLondon,
    alt: "White shelves with bags and folded pieces next to a rail of ivory garments",
    note: "A narrow Georgian shop with the full collection and the largest selection of bags and shoes.",
    services: [
      "Shoe resoling",
      "Free alterations within 60 days",
      "Late opening on Thursdays",
    ],
  },
  {
    id: "new-york",
    city: "New York",
    name: "Crosby Street",
    address: ["112 Crosby Street", "New York, NY 10012, United States"],
    timeZone: "America/New_York",
    hours: [
      ["12:00", "18:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
      ["11:00", "19:00"],
    ],
    phone: "+1 555 0142 303",
    phoneHref: "tel:+15550142303",
    email: "crosby@muse.example",
    image: storeNewYork,
    alt: "A calm shop interior with a paper lantern, low plinths and a rail of dark garments",
    note: "Our newest shop, on a cobbled SoHo block, with a fitting room large enough to bring a friend.",
    services: [
      "Personal styling appointments",
      "Free alterations within 60 days",
      "Same-day delivery in Manhattan",
    ],
  },
];

export const storeServices = [
  {
    q: "Can I book a private appointment?",
    a: "Yes. Every store opens an hour early for private appointments from Tuesday to Saturday. Call or email the store with the pieces you would like to try and we will have them ready in your size.",
  },
  {
    q: "Do you alter pieces bought online?",
    a: "Yes. Bring any Muse piece to any store within 60 days of delivery and we will shorten sleeves and hems at no charge. Most alterations are ready in three days.",
  },
  {
    q: "Can I return an online order in store?",
    a: "Yes, within 30 days, with or without the packaging. We refund to the original payment method the same day.",
  },
  {
    q: "Do you repair older pieces?",
    a: "We repair any Muse piece, of any age: relining, new buttons, resoling boots, reweaving small holes in knitwear. Repairs are priced after we see the piece.",
  },
];

/* ------------------------------------------------------------------ house */

export const house = {
  title: "A house for the in-between hours",
  intro:
    "Muse was founded in Paris in 2013 by Inès Varga, in a two-room atelier above a closed bakery on Rue de Charonne. It is still there, one floor above our first shop. We make womenswear in small runs: coats, tailoring, knitwear and leather, cut to be worn every day and repaired rather than replaced.",
  story: [
    "Inès trained as a pattern cutter in the ateliers of the eighth arrondissement and spent ten years cutting other people's coats. Muse began with one of her own: a double-faced wool wrap, closed by hand, that she made for herself and then, after enough people stopped her in the street, for twelve others.",
    "The atelier has grown to fourteen people. Coats, tailoring and dresses are cut and finished in Paris. Knitwear is made in Biella, shirts in Como, trousers and trenches in northern Portugal, bags in Ubrique and boots in the Marche, by workshops we visit every season and have worked with for years.",
    "We make two collections a year and keep them small. When a run sells through, we cut another rather than making more than we can sell. Nothing goes to an outlet and nothing is destroyed.",
  ],
  principles: [
    {
      title: "Made to be altered",
      text: "Trousers arrive unhemmed, seams carry extra allowance and every store has a tailor. A garment that fits is a garment that gets worn.",
    },
    {
      title: "Repaired for life",
      text: "We repair any Muse piece, of any age, in any store. Boots are resoled, coats are relined, knits are rewoven.",
    },
    {
      title: "Named suppliers",
      text: "Every product page names where the piece is made. We publish our mills and workshops and visit each of them every season.",
    },
    {
      title: "Small runs",
      text: "Runs of sixty pieces per colour. Sometimes a size is out for a few weeks. Nothing waits in a warehouse for a sale.",
    },
  ],
  people: [
    {
      name: "Inès Varga",
      role: "Founder and designer",
      bio: "Pattern cutter by training. Still cuts the first toile of every coat herself.",
    },
    {
      name: "Margaux Lemaire",
      role: "Head of atelier",
      bio: "Joined in 2015 from a Savile Row workroom. Runs the fourteen-person Paris atelier.",
    },
    {
      name: "Théo Marchal",
      role: "Materials",
      bio: "Spends a week a month at mills and tanneries. Keeps a library of every cloth we have used.",
    },
  ],
  makers: [
    {
      place: "Paris, France",
      what: "Coats, tailoring and dresses",
      who: "Our own atelier, Rue de Charonne",
    },
    {
      place: "Biella, Italy",
      what: "Merino and cashmere yarn, wool flannel",
      who: "Lanificio Serra, since 2013",
    },
    {
      place: "Como, Italy",
      what: "Cotton poplin and silk satin",
      who: "Tessitura Ronchi, since 2016",
    },
    {
      place: "Guimarães, Portugal",
      what: "Trousers, trenches and tops",
      who: "Confecções Abreu, since 2017",
    },
    { place: "Ubrique, Spain", what: "Bags", who: "Taller Moreno, since 2018" },
    {
      place: "Fermo, Italy",
      what: "Boots",
      who: "Calzaturificio Bellini, since 2019",
    },
  ],
  images: {
    lead: atelierPatterns,
    leadAlt:
      "Brown paper patterns and half-finished camel garments hanging in the atelier",
    cutting: atelierCutting,
    cuttingAlt: "Hands cutting along the chalk line of a paper sewing pattern",
    thread: atelierThread,
    threadAlt:
      "A red garment hanging beside shelves of thread cones in the atelier",
    table: fabricTable,
    tableAlt:
      "Fabric swatches and sketches laid out on a stone table beside a vase",
  },
};

/* ------------------------------------------------------------------- home */

export const home = {
  heroTitle: "The Quiet Hours",
  heroLine:
    "Autumn / Winter 2026. Coats, tailoring and knitwear for the hours before the day asks anything of you, cut and finished in our Paris atelier.",
  heroImage: lookCamelDoor,
  heroAlt:
    "A woman in a camel wrap coat over an olive dress standing before a tall black door",
  heroPicks: ["hours-coat", "quiet-knit", "fold-trouser"],
  newIn: ["pale-coat", "hours-coat", "quiet-knit", "fold-trouser"],
  statement:
    "Clothes for the in-between. Made slowly, worn often, mended when they need it.",
  coat: {
    title: "Forty hours in every edge",
    text: "The Hours Coat has no lining, no facing and no hem. Its two layers of wool and cashmere are split apart along every edge and closed by hand, so the coat is as soft at the front as in the middle of the back.",
    image: pBeltDetail,
    alt: "Close view of a grey wool coat's tie belt knotted at the waist",
  },
  atelier: {
    title: "One floor above the shop",
    text: "Fourteen people cut, sew and press in our atelier on Rue de Charonne. Visit the shop on a weekday afternoon and ask: there is usually a coat on the table upstairs.",
    image: atelierThread,
    alt: "A deep red garment hanging beside shelves of thread cones in the atelier",
  },
  service: [
    {
      title: "Alterations, free",
      text: "Sleeves and hems altered in any store within 60 days.",
    },
    {
      title: "Repairs, for life",
      text: "Relining, resoling and reweaving for any Muse piece.",
    },
    {
      title: "Returns, 30 days",
      text: "By post or in store, refunded the same day.",
    },
  ],
};

/* --------------------------------------------------------------- checkout */

export const checkout = {
  freeOver: 300,
  delivery: [
    {
      id: "standard",
      label: "Standard",
      detail: "2–4 working days in Europe, 4–6 to the UK and US",
      price: 12,
    },
    {
      id: "express",
      label: "Express",
      detail: "Next working day in France, two days elsewhere",
      price: 25,
    },
    {
      id: "collect",
      label: "Collect in store",
      detail: "Ready in two days at the store you choose",
      price: 0,
    },
  ],
  countries: [
    "France",
    "United Kingdom",
    "United States",
    "Germany",
    "Italy",
    "Spain",
    "Belgium",
    "Netherlands",
    "Switzerland",
    "Ireland",
  ],
  giftNote: "Wrapped in Muse tissue with a handwritten card. No prices inside.",
};

export const footer = {
  newsletter: {
    title: "A letter, four times a year",
    text: "New collections, mill visits and the occasional invitation to the atelier. Nothing else.",
  },
  hoursLine: "Customer care answers Monday to Saturday, 9:00–18:00 CET.",
};
