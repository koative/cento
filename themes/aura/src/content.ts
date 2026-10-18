import heroOil from "./assets/hero-oil.jpg";
import rosehipImg from "./assets/rosehip.jpg";
import calendulaImg from "./assets/calendula.jpg";
import oatImg from "./assets/oat.jpg";
import chamomileImg from "./assets/chamomile.jpg";
import seaBuckthornImg from "./assets/sea-buckthorn.jpg";
import sheaImg from "./assets/shea.jpg";
import aloeImg from "./assets/aloe.jpg";
import lavenderImg from "./assets/lavender.jpg";
import dropperFaceImg from "./assets/dropper-face.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Aura",
  sector: "Skincare brand",
  tagline: "Daily care. Quiet joy.",
  announcement: "Free shipping over $60 · Every cream comes with a refill pod",
  email: "hello@aura.example",
  phone: "+1 555 0142",
  phoneHref: "tel:+15550142",
  address: ["Aura Studio", "Unit 4, 88 Linden Row", "Kingston, NY 12401"],
  hours: "Care team: Monday to Friday, 9 am – 5 pm ET",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/ritual", label: "Ritual builder" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
];

export const footerNav = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All essentials" },
      { to: "/ritual", label: "Ritual builder" },
      { to: "/cart", label: "Your bag" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/ingredients", label: "Ingredients glossary" },
      { to: "/journal", label: "Journal" },
      { to: "/help", label: "Help & FAQ" },
    ],
  },
  {
    title: "Aura",
    links: [
      { to: "/about", label: "Our story" },
      { to: "/about", label: "Sourcing" },
      { to: "/help", label: "Shipping & returns" },
    ],
  },
];

/* --------------------------------------------------------------- products */

export type Step =
  "cleanse" | "tone" | "serum" | "oil" | "moisturise" | "protect";
export type Skin = "dry" | "oily" | "combination" | "sensitive";
export type Time = "am" | "pm";
export type Focus = "hydration" | "dullness" | "breakouts" | "lines" | "calm";
export type Vessel = "pump" | "dropper" | "jar" | "tube" | "bottle" | "tin";
export type Tile = "cream" | "blush" | "sage" | "lilac" | "apricot" | "butter";

export const steps: { id: Step; label: string; verb: string; note: string }[] =
  [
    {
      id: "cleanse",
      label: "Cleanse",
      verb: "Cleanse",
      note: "Lift the day, or the night, without stripping.",
    },
    {
      id: "tone",
      label: "Essence",
      verb: "Prepare",
      note: "A watery layer so everything after spreads further.",
    },
    {
      id: "serum",
      label: "Serum",
      verb: "Treat",
      note: "The concentrated step, chosen for what you want to change.",
    },
    {
      id: "oil",
      label: "Oil",
      verb: "Soften",
      note: "A few drops of lipids for skin that runs dry.",
    },
    {
      id: "moisturise",
      label: "Moisturise",
      verb: "Seal",
      note: "The cushion that holds the water in.",
    },
    {
      id: "protect",
      label: "Protect",
      verb: "Protect",
      note: "Mineral SPF, every morning, even when it is grey.",
    },
  ];

export const skinTypes: { id: Skin; label: string; hint: string }[] = [
  { id: "dry", label: "Dry", hint: "Tight after washing, flakes in winter" },
  { id: "oily", label: "Oily", hint: "Shine by midday, visible pores" },
  {
    id: "combination",
    label: "Combination",
    hint: "Shiny centre, drier cheeks",
  },
  {
    id: "sensitive",
    label: "Sensitive",
    hint: "Flushes easily, reacts to new things",
  },
];

export const focuses: { id: Focus; label: string }[] = [
  { id: "hydration", label: "Thirsty, tight skin" },
  { id: "dullness", label: "Dull, tired tone" },
  { id: "breakouts", label: "Breakouts and shine" },
  { id: "lines", label: "Fine lines" },
  { id: "calm", label: "Redness and reactivity" },
];

export type Product = {
  id: string;
  name: string;
  step: Step;
  line: string;
  description: string;
  texture: string;
  scent: string;
  vessel: Vessel;
  tint: string;
  tile: Tile;
  sizes: { label: string; price: number }[];
  skin: Skin[];
  time: Time[];
  focus: Focus[];
  ingredients: string[];
  inci: string;
  howTo: string;
  amount: string;
  seconds: number;
  /** Relative thickness 1 (watery) to 5 (balm); drives layering order and the strata diagram. */
  weight: number;
  rank: number;
};

export const products: Product[] = [
  {
    id: "cloud-milk-cleanser",
    name: "Cloud Milk Cleanser",
    step: "cleanse",
    line: "A soft milk that melts sunscreen and the day, then rinses clean.",
    description:
      "Our first formula and still the one we reach for most. Colloidal oat and chamomile water in a light emulsion that loosens SPF and city grime on dry skin, then turns to milk with a splash of water. Skin feels clean and comfortable, never squeaky.",
    texture: "Pourable milk",
    scent: "Unscented; a faint oat note from the plant itself",
    vessel: "pump",
    tint: "#f6efe4",
    tile: "cream",
    sizes: [
      { label: "150 ml", price: 28 },
      { label: "300 ml", price: 46 },
    ],
    skin: ["dry", "sensitive", "combination"],
    time: ["am", "pm"],
    focus: ["hydration", "calm"],
    ingredients: ["oat", "chamomile", "glycerin"],
    inci: "Aqua, Avena Sativa (Oat) Kernel Flour, Caprylic/Capric Triglyceride, Glycerin, Chamomilla Recutita Flower Water, Cetearyl Alcohol, Glyceryl Stearate, Sodium Stearoyl Glutamate, Tocopherol, Xanthan Gum, Sodium Benzoate, Citric Acid.",
    howTo:
      "Massage two pumps into dry skin for a full minute. Add a splash of water, keep massaging until it turns milky, then rinse.",
    amount: "2 pumps on dry skin",
    seconds: 90,
    weight: 2,
    rank: 1,
  },
  {
    id: "morning-clay-gel",
    name: "Morning Clay Gel",
    step: "cleanse",
    line: "A clear gel with a little white clay for skin that wakes up shiny.",
    description:
      "A low-foam gel cleanser built on aloe juice and a pinch of kaolin. It takes off overnight oil without leaving the tight, papery feeling that sends you straight for a heavier cream. Gentle enough for twice a day.",
    texture: "Clear gel, low foam",
    scent: "Unscented",
    vessel: "tube",
    tint: "#cfd5b4",
    tile: "sage",
    sizes: [{ label: "120 ml", price: 26 }],
    skin: ["oily", "combination"],
    time: ["am", "pm"],
    focus: ["breakouts", "dullness"],
    ingredients: ["aloe", "glycerin"],
    inci: "Aloe Barbadensis Leaf Juice, Aqua, Coco-Glucoside, Glycerin, Kaolin, Sodium Lauroyl Methyl Isethionate, Xanthan Gum, Panthenol, Sodium Benzoate, Citric Acid.",
    howTo:
      "Work a hazelnut-sized amount between wet palms, press over the face, massage for thirty seconds and rinse with cool water.",
    amount: "A hazelnut on wet skin",
    seconds: 60,
    weight: 2,
    rank: 6,
  },
  {
    id: "soft-water-essence",
    name: "Soft Water Essence",
    step: "tone",
    line: "A watery first layer that makes everything after it sink in.",
    description:
      "Three weights of hyaluronic acid, panthenol and chamomile flower water. Pressed into damp skin straight after cleansing, it takes the edge off tightness and gives your serum something to travel on.",
    texture: "Water, slightly slippery",
    scent: "Unscented",
    vessel: "bottle",
    tint: "#e4ecee",
    tile: "lilac",
    sizes: [
      { label: "100 ml", price: 32 },
      { label: "200 ml", price: 52 },
    ],
    skin: ["dry", "oily", "combination", "sensitive"],
    time: ["am", "pm"],
    focus: ["hydration", "calm"],
    ingredients: ["hyaluronic-acid", "chamomile", "panthenol"],
    inci: "Chamomilla Recutita Flower Water, Aqua, Glycerin, Panthenol, Sodium Hyaluronate, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate Crosspolymer, Betaine, Sodium Benzoate, Citric Acid.",
    howTo:
      "Shake five drops into your palm and press, do not rub, into damp skin. Go straight to your next step while skin is still dewy.",
    amount: "5 drops, pressed in",
    seconds: 30,
    weight: 1,
    rank: 5,
  },
  {
    id: "dew-serum",
    name: "Dew Serum",
    step: "serum",
    line: "Plain, generous hydration for days your skin just feels thirsty.",
    description:
      "The serum we would keep if we could only keep one. Hyaluronic acid and glycerin pull water in; panthenol keeps it calm. No actives to introduce slowly, nothing to avoid pairing — it sits happily under everything else we make.",
    texture: "Light, bouncy gel",
    scent: "Unscented",
    vessel: "dropper",
    tint: "#e8eff0",
    tile: "lilac",
    sizes: [
      { label: "30 ml", price: 42 },
      { label: "50 ml", price: 62 },
    ],
    skin: ["dry", "oily", "combination", "sensitive"],
    time: ["am", "pm"],
    focus: ["hydration", "lines"],
    ingredients: ["hyaluronic-acid", "panthenol", "glycerin"],
    inci: "Aqua, Glycerin, Panthenol, Sodium Hyaluronate, Sodium Hyaluronate Crosspolymer, Pentylene Glycol, Allantoin, Xanthan Gum, Sodium Benzoate, Citric Acid.",
    howTo:
      "Three drops onto damp skin after cleansing or essence. Wait a minute before moisturiser.",
    amount: "3 drops",
    seconds: 60,
    weight: 2,
    rank: 2,
  },
  {
    id: "first-light-serum",
    name: "First Light Serum",
    step: "serum",
    line: "A golden morning serum of stable vitamin C and sea buckthorn.",
    description:
      "Ascorbyl glucoside, the patient form of vitamin C, with niacinamide and a few drops of sea buckthorn oil for that unmistakable apricot colour. Use it in the morning under SPF; give it eight weeks before you judge it.",
    texture: "Fluid gel with a golden tint",
    scent: "Unscented; faintly fruity from the oil",
    vessel: "dropper",
    tint: "#efb35e",
    tile: "apricot",
    sizes: [{ label: "30 ml", price: 48 }],
    skin: ["dry", "oily", "combination"],
    time: ["am"],
    focus: ["dullness", "lines"],
    ingredients: ["ascorbyl-glucoside", "sea-buckthorn", "niacinamide"],
    inci: "Aqua, Ascorbyl Glucoside, Glycerin, Niacinamide, Hippophae Rhamnoides Fruit Oil, Polysorbate 20, Sodium Hyaluronate, Xanthan Gum, Sodium Citrate, Phenoxyethanol.",
    howTo:
      "Three drops in the morning after essence. Always follow with Daylight Veil or another SPF 30.",
    amount: "3 drops",
    seconds: 60,
    weight: 2,
    rank: 3,
  },
  {
    id: "still-night-serum",
    name: "Still Night Serum",
    step: "serum",
    line: "Bakuchiol and rosehip for a slow, gentle night shift.",
    description:
      "A plant-derived alternative for people whose skin will not tolerate retinoids. One percent bakuchiol in a silky base of rosehip oil and squalane, so it treats and softens in one step. Evening only, and fine to use every night from the start.",
    texture: "Silky serum-oil",
    scent: "Unscented; a soft earthy note",
    vessel: "dropper",
    tint: "#c9875f",
    tile: "blush",
    sizes: [{ label: "30 ml", price: 54 }],
    skin: ["dry", "combination", "sensitive"],
    time: ["pm"],
    focus: ["lines", "dullness"],
    ingredients: ["bakuchiol", "rosehip", "squalane"],
    inci: "Squalane, Caprylic/Capric Triglyceride, Rosa Canina Fruit Oil, Bakuchiol, Simmondsia Chinensis Seed Oil, Tocopherol.",
    howTo:
      "Four drops warmed between fingertips and pressed over the face at night, after essence and before cream.",
    amount: "4 drops, pressed in",
    seconds: 60,
    weight: 3,
    rank: 4,
  },
  {
    id: "clear-day-serum",
    name: "Clear Day Serum",
    step: "serum",
    line: "Niacinamide and a whisper of lactic acid for clearer, calmer pores.",
    description:
      "Five percent niacinamide to steady oil and redness, two percent lactic acid to keep pores from clogging, and aloe so none of it stings. Light enough for under SPF, steady enough for every day.",
    texture: "Water-light gel",
    scent: "Unscented",
    vessel: "dropper",
    tint: "#e1e8cf",
    tile: "sage",
    sizes: [
      { label: "30 ml", price: 38 },
      { label: "50 ml", price: 56 },
    ],
    skin: ["oily", "combination"],
    time: ["am", "pm"],
    focus: ["breakouts", "dullness"],
    ingredients: ["niacinamide", "lactic-acid", "aloe"],
    inci: "Aloe Barbadensis Leaf Juice, Aqua, Niacinamide, Lactic Acid, Glycerin, Sodium Lactate, Zinc PCA, Xanthan Gum, Sodium Benzoate.",
    howTo:
      "Three drops after cleansing. Start every other evening for the first two weeks, then use daily.",
    amount: "3 drops",
    seconds: 60,
    weight: 2,
    rank: 7,
  },
  {
    id: "dew-facial-oil",
    name: "Dew Facial Oil",
    step: "oil",
    line: "Rosehip, sea buckthorn and squalane in a bottle the colour of late light.",
    description:
      "The amber bottle from our very first photograph. A short list of cold-pressed oils that soften dry patches overnight and leave skin looking rested rather than greasy. Two drops are enough; three if it is January.",
    texture: "Dry-touch oil",
    scent: "Unscented; warm and green from the oils",
    vessel: "dropper",
    tint: "#d68a2c",
    tile: "apricot",
    sizes: [{ label: "30 ml", price: 46 }],
    skin: ["dry", "sensitive", "combination"],
    time: ["pm"],
    focus: ["hydration", "lines", "calm"],
    ingredients: ["rosehip", "sea-buckthorn", "squalane"],
    inci: "Squalane, Rosa Canina Fruit Oil, Simmondsia Chinensis Seed Oil, Hippophae Rhamnoides Fruit Oil, Calendula Officinalis Flower Extract, Tocopherol.",
    howTo:
      "Warm two drops between your palms and press over serum at night. Mix one drop into cream on very dry days.",
    amount: "2 drops, warmed in palms",
    seconds: 30,
    weight: 3,
    rank: 8,
  },
  {
    id: "soft-seal-cream",
    name: "Soft Seal Cream",
    step: "moisturise",
    line: "A cushioning ceramide cream that keeps the good feeling going.",
    description:
      "Ceramides, shea butter from our cooperative partners and colloidal oat in a cream that is rich without sitting on top of the skin. The jar is glass and the refill pod drops straight into it.",
    texture: "Whipped cream",
    scent: "Unscented",
    vessel: "jar",
    tint: "#fbf5ea",
    tile: "cream",
    sizes: [
      { label: "50 ml jar", price: 44 },
      { label: "50 ml refill pod", price: 36 },
    ],
    skin: ["dry", "sensitive"],
    time: ["am", "pm"],
    focus: ["hydration", "calm", "lines"],
    ingredients: ["ceramides", "shea", "oat"],
    inci: "Aqua, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Avena Sativa Kernel Flour, Sodium Stearoyl Glutamate, Tocopherol, Sodium Benzoate.",
    howTo:
      "A pea-sized amount, warmed between fingertips and pressed in as the last step at night, or before SPF in the morning.",
    amount: "A pea-sized amount",
    seconds: 30,
    weight: 4,
    rank: 9,
  },
  {
    id: "cloud-gel-cream",
    name: "Cloud Gel Cream",
    step: "moisturise",
    line: "Weightless hydration for skin that hates feeling coated.",
    description:
      "An airy gel-cream of aloe, hyaluronic acid and niacinamide. It sinks in in seconds, leaves no film under sunscreen and keeps combination skin balanced through a long day.",
    texture: "Airy gel-cream",
    scent: "Unscented",
    vessel: "jar",
    tint: "#e7efec",
    tile: "sage",
    sizes: [
      { label: "50 ml jar", price: 40 },
      { label: "50 ml refill pod", price: 32 },
    ],
    skin: ["oily", "combination"],
    time: ["am", "pm"],
    focus: ["hydration", "breakouts"],
    ingredients: ["aloe", "hyaluronic-acid", "niacinamide"],
    inci: "Aloe Barbadensis Leaf Juice, Aqua, Glycerin, Squalane, Niacinamide, Sodium Hyaluronate, Sodium Polyacrylate, Panthenol, Allantoin, Sodium Benzoate.",
    howTo:
      "A pea-sized amount over serum. Let it settle for thirty seconds before SPF.",
    amount: "A pea-sized amount",
    seconds: 30,
    weight: 3,
    rank: 10,
  },
  {
    id: "daylight-veil-spf30",
    name: "Daylight Veil SPF 30",
    step: "protect",
    line: "Sheer mineral sunscreen with calendula, made to disappear.",
    description:
      "Twenty percent non-nano zinc oxide in a fluid lotion that blends to nothing on most skin tones within a minute. Calendula and squalane keep it comfortable, so it doubles as a morning moisturiser on normal days.",
    texture: "Fluid lotion",
    scent: "Unscented",
    vessel: "tube",
    tint: "#f3e8d4",
    tile: "butter",
    sizes: [{ label: "50 ml", price: 34 }],
    skin: ["dry", "oily", "combination", "sensitive"],
    time: ["am"],
    focus: ["calm", "dullness", "lines"],
    ingredients: ["zinc-oxide", "calendula", "squalane"],
    inci: "Zinc Oxide 20%. Inactive: Aqua, Caprylic/Capric Triglyceride, Squalane, Polyglyceryl-4 Isostearate, Calendula Officinalis Flower Extract, Glycerin, Magnesium Sulfate, Tocopherol, Sodium Benzoate.",
    howTo:
      "Two finger-lengths for face and neck as the last morning step. Reapply after swimming or two hours outdoors.",
    amount: "Two finger-lengths",
    seconds: 60,
    weight: 3,
    rank: 11,
  },
  {
    id: "calendula-night-balm",
    name: "Calendula Night Balm",
    step: "moisturise",
    line: "A melting balm for cheeks that crack in the cold.",
    description:
      "Calendula-infused oil whipped with shea and a little lavender water: our answer to wind, central heating and long-haul flights. Use it as the last step on dry nights, or just on the patches that need it.",
    texture: "Balm that melts on contact",
    scent: "Soft lavender",
    vessel: "tin",
    tint: "#f2c96a",
    tile: "butter",
    sizes: [{ label: "40 g", price: 38 }],
    skin: ["dry", "sensitive"],
    time: ["pm"],
    focus: ["hydration", "calm"],
    ingredients: ["calendula", "shea", "lavender"],
    inci: "Butyrospermum Parkii (Shea) Butter, Helianthus Annuus Seed Oil, Calendula Officinalis Flower Extract, Squalane, Cera Alba, Lavandula Angustifolia Flower Water, Tocopherol.",
    howTo:
      "Warm a fingertip of balm until it turns to oil and press over cream, or over dry patches alone.",
    amount: "A fingertip, melted",
    seconds: 30,
    weight: 5,
    rank: 12,
  },
];

export type Review = {
  product: string;
  name: string;
  skin: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    product: "cloud-milk-cleanser",
    name: "Maren T.",
    skin: "Dry, sensitive",
    rating: 5,
    text: "The first cleanser that takes off mineral sunscreen without leaving my cheeks pink. On my third bottle.",
  },
  {
    product: "cloud-milk-cleanser",
    name: "Jonah P.",
    skin: "Combination",
    rating: 4,
    text: "Takes a minute of massage to really work, which turns out to be the nicest minute of my evening.",
  },
  {
    product: "morning-clay-gel",
    name: "Priya R.",
    skin: "Oily",
    rating: 5,
    text: "Clean without the squeak. My forehead lasts until lunch now instead of ten o’clock.",
  },
  {
    product: "soft-water-essence",
    name: "Odile F.",
    skin: "Sensitive",
    rating: 5,
    text: "I didn’t believe an essence could matter. Without it my serum pills; with it everything goes on smoothly.",
  },
  {
    product: "dew-serum",
    name: "Hannah K.",
    skin: "Dry",
    rating: 5,
    text: "Boring in the best way. My skin stopped feeling tight by the afternoon within a week.",
  },
  {
    product: "dew-serum",
    name: "Leo M.",
    skin: "Oily",
    rating: 4,
    text: "Light enough that I actually use it in summer. Would love a bigger bottle.",
  },
  {
    product: "first-light-serum",
    name: "Saoirse D.",
    skin: "Combination",
    rating: 5,
    text: "Gave it the eight weeks they asked for. The grey look around my nose has properly gone.",
  },
  {
    product: "still-night-serum",
    name: "Amira S.",
    skin: "Sensitive",
    rating: 5,
    text: "Retinol always burned me. This doesn’t, and my skin looks more rested every month.",
  },
  {
    product: "clear-day-serum",
    name: "Tomás G.",
    skin: "Oily, breakout-prone",
    rating: 4,
    text: "Fewer surprise spots before my period. A tiny tingle the first few nights, then nothing.",
  },
  {
    product: "dew-facial-oil",
    name: "Ruth A.",
    skin: "Very dry",
    rating: 5,
    text: "Two drops at night and I wake up with skin that looks like I slept nine hours. I did not.",
  },
  {
    product: "soft-seal-cream",
    name: "Inès B.",
    skin: "Dry",
    rating: 5,
    text: "Rich but it actually sinks in. The refill pod clicking into the glass jar is weirdly satisfying.",
  },
  {
    product: "cloud-gel-cream",
    name: "Kofi A.",
    skin: "Combination",
    rating: 4,
    text: "Finally a moisturiser that doesn’t slide around under sunscreen.",
  },
  {
    product: "daylight-veil-spf30",
    name: "Mei L.",
    skin: "Medium-deep tone",
    rating: 5,
    text: "A mineral SPF that doesn’t leave me grey. Took about a minute of blending, then invisible.",
  },
  {
    product: "calendula-night-balm",
    name: "Ellis W.",
    skin: "Dry, windburn",
    rating: 5,
    text: "I live on a ferry route. This tin has saved my cheeks all winter.",
  },
];

/* ------------------------------------------------------------ ingredients */

export type IngredientKind =
  "Botanical" | "Lipid" | "Humectant" | "Active" | "Mineral";

export type Ingredient = {
  slug: string;
  name: string;
  inci: string;
  abbr: string;
  kind: IngredientKind;
  summary: string;
  body: string[];
  origin: string;
  strength: string;
  note: string;
  pairs: string[];
  image?: string;
  alt?: string;
};

export const ingredientKinds: IngredientKind[] = [
  "Botanical",
  "Lipid",
  "Humectant",
  "Active",
  "Mineral",
];

export const ingredients: Ingredient[] = [
  {
    slug: "aloe",
    name: "Aloe",
    inci: "Aloe Barbadensis Leaf Juice",
    abbr: "Al",
    kind: "Botanical",
    summary:
      "Cooling leaf juice we use in place of plain water in our lighter formulas.",
    body: [
      "The clear gel inside an aloe leaf is mostly water held in a net of sugars. Used as the base of a formula instead of water, it brings a slight slip and a cool, soothing feel to gels that might otherwise feel thin.",
      "We buy inner-leaf juice that has been decolourised to remove aloin, the yellow sap just under the skin of the leaf that can irritate.",
    ],
    origin: "Inner-leaf juice from organic growers in the Rio Grande Valley",
    strength: "Up to 60% of the formula",
    note: "Very rarely an allergen; patch-test if you react to plants in the lily family.",
    pairs: ["niacinamide", "hyaluronic-acid"],
    image: aloeImg,
    alt: "A cut aloe leaf showing its clear inner gel",
  },
  {
    slug: "ascorbyl-glucoside",
    name: "Ascorbyl glucoside",
    inci: "Ascorbyl Glucoside",
    abbr: "Vc",
    kind: "Active",
    summary:
      "A steady, water-loving form of vitamin C that brightens without stinging.",
    body: [
      "Pure vitamin C (ascorbic acid) is powerful and notoriously unstable; it browns in the bottle within weeks. Ascorbyl glucoside is vitamin C bonded to a sugar, which keeps it stable until enzymes in the skin slowly release it.",
      "It works more gently than the pure form, so it asks for patience: most people notice a more even tone after six to eight weeks of morning use.",
    ],
    origin: "Fermentation-derived, made in Japan",
    strength: "2% in First Light Serum",
    note: "Use in the morning under SPF to get the most from it.",
    pairs: ["niacinamide", "zinc-oxide"],
  },
  {
    slug: "bakuchiol",
    name: "Bakuchiol",
    inci: "Bakuchiol",
    abbr: "Bk",
    kind: "Active",
    summary:
      "A seed extract that behaves like a gentle retinoid, without the peeling.",
    body: [
      "Bakuchiol comes from the seeds of the babchi plant. Studies comparing it with low-strength retinol found similar softening of fine lines over twelve weeks, with less dryness and stinging.",
      "Unlike retinoids it is not broken down by light, though we still keep it in our evening serum so it can work undisturbed.",
    ],
    origin: "Psoralea corylifolia seeds, purified in India",
    strength: "1% in Still Night Serum",
    note: "Suitable for most sensitive skin; not a substitute for prescription retinoids.",
    pairs: ["rosehip", "squalane"],
  },
  {
    slug: "calendula",
    name: "Calendula",
    inci: "Calendula Officinalis Flower Extract",
    abbr: "Ca",
    kind: "Botanical",
    summary:
      "Pot marigold steeped in oil, the old garden remedy for chapped skin.",
    body: [
      "Calendula flowers are rich in carotenoids and soothing triterpenes. We steep dried petals in sunflower oil for six weeks, which is how cottage gardeners made salves long before anyone measured anything.",
      "The result is a golden oil that calms windburn and dry patches. It is why our night balm is the colour of butter.",
    ],
    origin: "Grown and infused for us on a family farm in the Hudson Valley",
    strength: "8% infused oil in Calendula Night Balm",
    note: "Avoid if you are allergic to daisies or ragweed.",
    pairs: ["shea", "squalane"],
    image: calendulaImg,
    alt: "Bright orange calendula flowers growing against a stone wall",
  },
  {
    slug: "ceramides",
    name: "Ceramides",
    inci: "Ceramide NP, Ceramide AP, Ceramide EOP",
    abbr: "Cr",
    kind: "Lipid",
    summary:
      "The mortar between skin cells, replaced when the barrier is worn thin.",
    body: [
      "About half of the lipids in the outer layer of skin are ceramides. When they run low, from cold, hot showers or harsh cleansers, water escapes and skin feels tight and reactive.",
      "We use three skin-identical ceramides with cholesterol and a fatty acid in the ratio found in healthy skin, because they work best together.",
    ],
    origin: "Skin-identical, produced by yeast fermentation in Germany",
    strength: "1% ceramide complex in Soft Seal Cream",
    note: "Well tolerated by nearly everyone, including eczema-prone skin.",
    pairs: ["shea", "oat"],
  },
  {
    slug: "chamomile",
    name: "Chamomile",
    inci: "Chamomilla Recutita Flower Water",
    abbr: "Ch",
    kind: "Botanical",
    summary:
      "Steam-distilled flower water that replaces plain water in our essence.",
    body: [
      "German chamomile contains bisabolol and chamazulene, two compounds known for calming redness. Distilling the flowers gives a water that carries a little of both and a faint apple-like smell.",
      "We use it in our cleanser and essence, the two steps that touch the skin first.",
    ],
    origin: "Distilled in small batches in Slovakia",
    strength: "Up to 45% of the formula",
    note: "Rarely irritating; skip if you are allergic to daisy-family plants.",
    pairs: ["oat", "panthenol"],
    image: chamomileImg,
    alt: "A single chamomile flower with white petals and a yellow centre",
  },
  {
    slug: "glycerin",
    name: "Glycerin",
    inci: "Glycerin",
    abbr: "Gl",
    kind: "Humectant",
    summary: "The plainest, most proven moisturising ingredient there is.",
    body: [
      "Glycerin pulls water into the outer layers of skin and holds it there. It has been studied for decades and still outperforms many newer humectants.",
      "Ours is plant-derived from rapeseed and sunflower, never palm.",
    ],
    origin: "Plant-derived, made in France",
    strength: "3 to 8% across the range",
    note: "No known concerns at these levels.",
    pairs: ["hyaluronic-acid", "panthenol"],
  },
  {
    slug: "hyaluronic-acid",
    name: "Hyaluronic acid",
    inci: "Sodium Hyaluronate",
    abbr: "Ha",
    kind: "Humectant",
    summary:
      "A water-binding sugar used in three sizes, for the surface and just beneath it.",
    body: [
      "Hyaluronic acid can bind many times its weight in water. Large molecules sit on the surface and smooth it straight away; smaller ones settle into the upper layers and plump for longer.",
      "It works best on damp skin and under a moisturiser that stops the water from evaporating.",
    ],
    origin: "Fermentation-derived, made in France",
    strength: "1.5% in Dew Serum",
    note: "In very dry air, always seal it in with cream.",
    pairs: ["glycerin", "ceramides"],
  },
  {
    slug: "lactic-acid",
    name: "Lactic acid",
    inci: "Lactic Acid",
    abbr: "La",
    kind: "Active",
    summary:
      "The gentlest of the alpha-hydroxy acids, for smoother texture and clearer pores.",
    body: [
      "Lactic acid loosens the bonds between dead cells on the surface so they shed more evenly. Its larger molecule moves into the skin more slowly than glycolic acid, which means less sting.",
      "We pair it with niacinamide and aloe at a low two percent, enough for daily use.",
    ],
    origin: "Fermented from sugar beet",
    strength: "2% in Clear Day Serum",
    note: "Increases sun sensitivity; wear SPF the next morning.",
    pairs: ["niacinamide", "aloe"],
  },
  {
    slug: "lavender",
    name: "Lavender water",
    inci: "Lavandula Angustifolia Flower Water",
    abbr: "Lv",
    kind: "Botanical",
    summary:
      "The only scent in our range, used softly, in one product made for night.",
    body: [
      "Lavender flower water is what remains after the essential oil is distilled: mostly water, with a trace of the scent. It is far gentler than the oil itself.",
      "We added it to the night balm after testers asked for something that smelled like bedtime. Everything else we make stays unscented.",
    ],
    origin: "Distilled in Provence after the July harvest",
    strength: "2% in Calendula Night Balm",
    note: "If you avoid fragrance entirely, pick Soft Seal Cream instead.",
    pairs: ["calendula", "shea"],
    image: lavenderImg,
    alt: "Rows of purple lavender in bloom under a pale sky",
  },
  {
    slug: "niacinamide",
    name: "Niacinamide",
    inci: "Niacinamide",
    abbr: "Nc",
    kind: "Active",
    summary:
      "Vitamin B3, the quiet all-rounder for oil, redness and uneven tone.",
    body: [
      "Niacinamide helps skin make more of its own ceramides, steadies oil production and fades post-breakout marks over time. It is one of the few actives that almost everyone tolerates.",
      "We keep it at five percent or under; higher amounts add little benefit and more chance of flushing.",
    ],
    origin: "Synthesised in Switzerland",
    strength: "5% in Clear Day Serum, 2% elsewhere",
    note: "Pairs happily with vitamin C despite the old myth.",
    pairs: ["ascorbyl-glucoside", "lactic-acid"],
  },
  {
    slug: "oat",
    name: "Colloidal oat",
    inci: "Avena Sativa (Oat) Kernel Flour",
    abbr: "Ot",
    kind: "Botanical",
    summary:
      "Finely milled oat, the oldest soothing ingredient in the bathroom cabinet.",
    body: [
      "Oat kernels contain avenanthramides, antioxidants that calm itch and redness, and beta-glucans that leave a thin, comforting film on the skin.",
      "Milled to a powder fine enough to stay suspended in milk, it is the backbone of our cleanser and our richest cream.",
    ],
    origin: "Grown in Saskatchewan, milled in Minnesota",
    strength: "1 to 3% across the range",
    note: "Suitable for coeliac customers: the oat is certified gluten-free.",
    pairs: ["ceramides", "chamomile"],
    image: oatImg,
    alt: "A field of tall green oats against a blue sky",
  },
  {
    slug: "panthenol",
    name: "Panthenol",
    inci: "Panthenol",
    abbr: "B5",
    kind: "Humectant",
    summary:
      "Pro-vitamin B5, a humectant that also helps irritated skin settle.",
    body: [
      "Panthenol converts to pantothenic acid in the skin, where it supports repair. As a humectant it draws in water like glycerin, with a less tacky finish.",
      "It is in our essence and our hydrating serum so the first layers you apply are also the calmest.",
    ],
    origin: "Made in Switzerland",
    strength: "2 to 5%",
    note: "No known concerns at these levels.",
    pairs: ["hyaluronic-acid", "chamomile"],
  },
  {
    slug: "rosehip",
    name: "Rosehip oil",
    inci: "Rosa Canina Fruit Oil",
    abbr: "Rh",
    kind: "Lipid",
    summary:
      "A light, dry oil pressed from wild rose seeds, rich in linoleic acid.",
    body: [
      "Rosehip seed oil absorbs quickly and contains small amounts of natural retinoic acid precursors, which is why it has a long reputation for softening texture and marks.",
      "Ours is cold-pressed from hips gathered by hand in the Andes foothills. It oxidises if left in light, so it goes into amber glass only.",
    ],
    origin: "Cold-pressed in Chile",
    strength: "20% in Dew Facial Oil",
    note: "Store away from sunlight and use within six months of opening.",
    pairs: ["bakuchiol", "sea-buckthorn"],
    image: rosehipImg,
    alt: "A cluster of red rose hips among green leaves",
  },
  {
    slug: "sea-buckthorn",
    name: "Sea buckthorn",
    inci: "Hippophae Rhamnoides Fruit Oil",
    abbr: "Sb",
    kind: "Lipid",
    summary: "An intensely orange berry oil, full of carotenoids and omega-7.",
    body: [
      "Sea buckthorn grows on windy coasts and dry hillsides. Its fruit oil is one of the few plant sources of palmitoleic acid (omega-7), a fat our skin makes less of as we age.",
      "It is so deeply coloured that we use only a few drops per batch; it is what makes First Light and Dew Facial Oil glow.",
    ],
    origin: "Wild-harvested in the Altai foothills",
    strength: "0.5 to 2%",
    note: "Undiluted, it stains towels. Our formulas are diluted enough that it will not stain skin.",
    pairs: ["rosehip", "ascorbyl-glucoside"],
    image: seaBuckthornImg,
    alt: "A branch heavy with bright orange sea buckthorn berries",
  },
  {
    slug: "shea",
    name: "Shea butter",
    inci: "Butyrospermum Parkii Butter",
    abbr: "Sh",
    kind: "Lipid",
    summary:
      "Hand-processed shea from a women's cooperative we have bought from since 2019.",
    body: [
      "Shea nuts are gathered, boiled, sun-dried, roasted and ground before the butter is kneaded out by hand. It is slow, skilled work, and almost all of it is done by women in northern Ghana.",
      "We pay the cooperative a fixed premium above the market price, agreed before each season, and buy the whole season's unrefined butter whether we need it or not.",
    ],
    origin: "Women's cooperative near Tamale, northern Ghana",
    strength: "12% in Soft Seal Cream, 30% in Calendula Night Balm",
    note: "Shea is a tree nut; there is no recorded case of a reaction to refined shea, but ours is unrefined.",
    pairs: ["ceramides", "calendula"],
    image: sheaImg,
    alt: "Two women carrying bowls of shea nuts on their heads through a village",
  },
  {
    slug: "squalane",
    name: "Squalane",
    inci: "Squalane",
    abbr: "Sq",
    kind: "Lipid",
    summary: "A weightless oil that mimics the skin's own sebum.",
    body: [
      "Squalene is a natural part of human sebum. Hydrogenated into squalane it becomes stable, odourless and almost weightless, softening skin without any greasy feel.",
      "Ours is made from sugarcane rather than shark liver or olives, so supply never depends on fishing or a single harvest.",
    ],
    origin: "Sugarcane-derived, made in Brazil",
    strength: "Up to 40% in Still Night Serum",
    note: "Non-comedogenic; suits oily skin too.",
    pairs: ["bakuchiol", "zinc-oxide"],
  },
  {
    slug: "zinc-oxide",
    name: "Zinc oxide",
    inci: "Zinc Oxide",
    abbr: "Zn",
    kind: "Mineral",
    summary:
      "A mineral filter that protects against UVA and UVB in one ingredient.",
    body: [
      "Zinc oxide reflects and absorbs ultraviolet light across the full UVA and UVB range. It is one of only two mineral filters recognised for sunscreen use in the United States.",
      "We use non-nano particles coated for easy blending, at the twenty percent needed for SPF 30 without a chemical booster.",
    ],
    origin: "Pharmaceutical grade, made in the United States",
    strength: "20% in Daylight Veil SPF 30",
    note: "Reapply every two hours outdoors and after swimming.",
    pairs: ["calendula", "squalane"],
  },
];

/* ---------------------------------------------------------------- journal */

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: "Ritual" | "Ingredients" | "Sourcing" | "Seasons";
  date: string;
  minutes: number;
  author: string;
  image: string;
  alt: string;
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
  products: string[];
};

export const posts: Post[] = [
  {
    slug: "thinnest-to-thickest",
    title: "Thinnest to thickest: how to layer without the pilling",
    dek: "The one rule that makes a five-step routine feel like one product.",
    category: "Ritual",
    date: "2026-09-24",
    minutes: 5,
    author: "Ines Okafor, formulation chemist",
    image: dropperFaceImg,
    alt: "A woman holding a glass dropper of serum against her cheek",
    sections: [
      {
        paragraphs: [
          "Most of the questions our care team answers come down to the same moment: you put on a cream, rub, and little grey rolls appear. It is not the product. It is the order.",
          "Water-based formulas need to touch skin before oil-based ones, and each layer needs a short pause to settle. Get the sequence right and even five steps feel like a single, comfortable veil.",
        ],
      },
      {
        heading: "The order",
        paragraphs: [
          "Work from the most watery texture to the most occlusive. In our range that means:",
        ],
        list: [
          "Cleanser, rinsed off completely",
          "Essence, pressed into damp skin",
          "Serum, three or four drops",
          "Oil, only if your skin runs dry",
          "Cream or balm to seal everything in",
          "Mineral SPF last, every morning",
        ],
      },
      {
        heading: "The pause",
        paragraphs: [
          "Give serums a full minute before cream, and sunscreen a minute before make-up. That is usually enough for the water to evaporate and the film-formers to settle. Our ritual builder adds these pauses up for you, so you can see whether your routine fits the time you actually have.",
          "If you still see pilling, use less. A pea-sized amount of cream really is enough for the whole face.",
        ],
      },
    ],
    products: ["soft-water-essence", "dew-serum", "soft-seal-cream"],
  },
  {
    slug: "five-unhurried-minutes",
    title: "The evening ritual, in five unhurried minutes",
    dek: "Why we stopped selling ten-step routines and started selling a pause.",
    category: "Ritual",
    date: "2026-09-02",
    minutes: 4,
    author: "Noor Halvorsen, founder",
    image: lavenderImg,
    alt: "Rows of lavender in bloom in the evening light",
    sections: [
      {
        paragraphs: [
          "When I started Aura I had eleven products on my bathroom shelf and used four of them. The rest were promises I had bought on bad days.",
          "The evening routine I actually keep takes five minutes: a long, slow cleanse, one serum, a cream, and a minute of doing nothing at all while it settles. It is the doing nothing that I look forward to.",
        ],
      },
      {
        heading: "Make the cleanse the ritual",
        paragraphs: [
          "Massage your cleanser for a full sixty seconds before you add water. It lifts sunscreen properly, and it is the closest most of us get to a facial on a weekday.",
        ],
      },
      {
        heading: "One serum, chosen on purpose",
        paragraphs: [
          "Pick the one thing you want to change this season and choose a serum for that. Rotating three actives at once mostly means you never find out which one worked.",
          "Then seal it in, turn off the bathroom light, and let the day be finished.",
        ],
      },
    ],
    products: [
      "cloud-milk-cleanser",
      "still-night-serum",
      "calendula-night-balm",
    ],
  },
  {
    slug: "shea-from-the-women-who-crack-it",
    title: "Shea, from the women who crack it",
    dek: "Six seasons of buying a whole harvest, and what a fixed price changes.",
    category: "Sourcing",
    date: "2026-08-14",
    minutes: 7,
    author: "Theo Marchetti, sourcing",
    image: sheaImg,
    alt: "Two women carrying bowls of shea nuts through a village in northern Ghana",
    sections: [
      {
        paragraphs: [
          "Shea trees are not planted; they grow wild across the savannah belt of West Africa and fruit from May to August. The nuts fall, are gathered, and from there everything is done by hand.",
          "Since 2019 we have bought the unrefined butter from a cooperative of 140 women near Tamale. Each spring we agree a price before the season starts, and we buy everything they make that year.",
        ],
      },
      {
        heading: "Why a fixed price",
        paragraphs: [
          "Shea prices swing with the cocoa butter market, which has nothing to do with the work involved. A price agreed in advance means the cooperative can plan, pay members on delivery rather than on sale, and invest in shared equipment.",
          "This year that meant a second roasting drum and a covered drying floor, which cut the time to dry a batch from five days to three.",
        ],
      },
      {
        heading: "What we buy",
        paragraphs: [
          "Unrefined grade A butter, filtered through cloth, never bleached or deodorised. It smells faintly nutty and smoky, and it is the reason Soft Seal Cream feels the way it does.",
        ],
      },
    ],
    products: ["soft-seal-cream", "calendula-night-balm"],
  },
  {
    slug: "winter-skin-and-oat",
    title: "Winter skin and the oat question",
    dek: "What a 1940s bath remedy still does better than most new ingredients.",
    category: "Seasons",
    date: "2026-07-30",
    minutes: 4,
    author: "Ines Okafor, formulation chemist",
    image: oatImg,
    alt: "A field of tall green oats",
    sections: [
      {
        paragraphs: [
          "Every November our inbox fills with the same message: my skin was fine, now it stings when I put anything on. Cold air outside and dry heat inside pull water from the barrier faster than it can replace it.",
          "Colloidal oat is one of the few cosmetic ingredients recognised as a skin protectant by the FDA. It calms itch, leaves a thin protective film, and is tolerated by almost everyone.",
        ],
      },
      {
        heading: "A winter adjustment",
        paragraphs: [
          "You do not need a new routine for winter, just a softer one:",
        ],
        list: [
          "Swap a gel cleanser for a milk",
          "Pause exfoliating acids if anything stings",
          "Add two drops of oil to your cream at night",
          "Keep a balm for cheeks and the corners of the nose",
        ],
      },
    ],
    products: ["cloud-milk-cleanser", "soft-seal-cream", "dew-facial-oil"],
  },
  {
    slug: "the-orange-that-stains-everything",
    title: "Sea buckthorn: the orange that stains everything",
    dek: "Our most dramatic ingredient, and the white towel that paid for it.",
    category: "Ingredients",
    date: "2026-07-08",
    minutes: 3,
    author: "Noor Halvorsen, founder",
    image: seaBuckthornImg,
    alt: "A branch crowded with orange sea buckthorn berries against a blue sky",
    sections: [
      {
        paragraphs: [
          "The first time we tested pure sea buckthorn oil in the studio, it ruined a towel, a lab coat and a very good linen shirt. It is that orange.",
          "Diluted, it gives First Light Serum and Dew Facial Oil their apricot glow and a dose of omega-7, a fatty acid that skin makes less of over time.",
        ],
      },
      {
        heading: "How much is enough",
        paragraphs: [
          "Between half a percent and two percent. Any more and the colour starts to show on skin; any less and you lose what makes it worth including. It is a good example of an ingredient where more is simply not better.",
        ],
      },
    ],
    products: ["first-light-serum", "dew-facial-oil"],
  },
];

/* -------------------------------------------------------------- page copy */

export const home = {
  hero: {
    title: ["Daily care.", "Quiet joy."],
    text: "Twelve unhurried essentials for morning and evening, made in small batches in the Hudson Valley. Fewer steps, familiar textures, nothing you will not use.",
    image: heroOil,
    alt: "An amber dropper bottle of facial oil on a turned wooden pedestal, palm shadows on the wall behind",
    caption: "Dew Facial Oil, our first formula",
    picks: ["cloud-milk-cleanser", "dew-serum", "dew-facial-oil"],
  },
  ritual: {
    title: "Your ritual, layer by layer",
    text: "Tell the builder when, how your skin feels and how long you have. It chooses the products, puts them in the right order and adds up the minutes.",
  },
  bestsellers: {
    title: "What people reorder",
    text: "The four formulas that make up most of our shipments, and most of our own shelves.",
  },
  steps: {
    title: "Shop by step",
    text: "Apply from the most watery to the richest. The order is the routine.",
  },
  ingredient: {
    slug: "rosehip",
    title: "Know what is in the bottle",
    text: "Every ingredient we use has a page: what it is, where it grows, how much of it is in each formula and who should skip it. Eighteen entries, written in plain words.",
  },
  philosophy: {
    title: "Care doesn’t need to be complicated.",
    text: "Fewer decisions. Familiar textures. A daily pause you can look forward to. We formulate slowly, publish every percentage, and refill every jar.",
  },
  promises: [
    {
      title: "Refill pods",
      text: "Every cream comes in a glass jar once; after that, a pod drops into it for $8 less.",
    },
    {
      title: "Sixty-day returns",
      text: "Opened or not. If it does not suit your skin, send it back and we will refund it.",
    },
    {
      title: "Every percentage published",
      text: "Each product page lists the full INCI and the amount of each key ingredient.",
    },
  ],
  close: {
    title: "Five minutes, twice a day.",
    text: "That is the whole idea. Build yours in under a minute.",
  },
};

export const shopCopy = {
  title: "The essentials",
  text: "Twelve formulas, six steps. Filter by what your skin is doing today, or sort by price.",
};

export const ritualCopy = {
  title: "Ritual builder",
  text: "Four questions, one routine. We choose a product for each step, order them thinnest to thickest and time the pauses between them. Swap anything you like, then add the whole ritual to your bag.",
  note: "A cosmetic guide, not medical advice. If your skin is broken, very painful or changing quickly, see a dermatologist.",
  minutes: [
    { value: 2, label: "2 minutes", hint: "Just the essentials" },
    { value: 5, label: "5 minutes", hint: "The everyday ritual" },
    { value: 10, label: "10 minutes", hint: "The slow version" },
  ],
};

export const ingredientsCopy = {
  title: "Ingredients glossary",
  text: "Every ingredient in every Aura formula, in plain words: what it does, where it comes from, how much we use and when to skip it.",
};

export const journalCopy = {
  title: "Journal",
  text: "Notes from the studio on routines, ingredients, the people who grow them and the seasons that change our skin.",
};

export const about = {
  title: "A small studio for everyday skin",
  intro:
    "Aura began in 2018 at a kitchen table in Kingston, New York, with one oil, one cleanser and a stubborn idea: skincare should make the ordinary feel considered, not complicated.",
  image: heroOil,
  imageAlt: "The amber dropper bottle of Dew Facial Oil on a wooden pedestal",
  story: [
    "Noor Halvorsen spent ten years buying fragrance for department stores and watching people leave with routines they would never keep. She left to make the opposite: a short range, unscented, with every percentage printed on the box.",
    "Formulation chemist Ines Okafor joined in 2019. Together they rebuilt the first two formulas from scratch, moved production into a former print shop on Linden Row and decided that nothing would launch until twenty people had used it for eight weeks.",
    "Today we are fourteen people, twelve products and one small lab. We still make every batch on site, in runs of no more than 600 units, and we still answer every email ourselves.",
  ],
  principles: [
    {
      title: "Short formulas",
      text: "The average Aura product has eleven ingredients. If something is in the bottle, it has a job and a page in our glossary.",
    },
    {
      title: "No added fragrance",
      text: "Eleven of twelve products are unscented. The twelfth uses lavender flower water, and says so on the front.",
    },
    {
      title: "Glass and refills",
      text: "Jars are glass, pods are recyclable, and refills cost less than the original so the jar is worth keeping.",
    },
    {
      title: "Tested on people, slowly",
      text: "Never on animals. Every formula is used by twenty volunteers for eight weeks before it ships.",
    },
  ],
  sourcing: {
    title: "Where it comes from",
    text: "We buy from people, not just from suppliers. Shea from a women's cooperative in northern Ghana at a price fixed before each season. Calendula from a farm forty minutes up the river. Rosehip pressed in Chile from wild hips gathered by hand.",
    image: sheaImg,
    imageAlt: "Members of the shea cooperative carrying bowls of nuts",
  },
  team: [
    {
      name: "Noor Halvorsen",
      role: "Founder",
      bio: "Former fragrance buyer. Writes the product copy and still packs orders on Fridays.",
    },
    {
      name: "Ines Okafor",
      role: "Formulation chemist",
      bio: "Fifteen years in cosmetic labs. Will talk about emulsifiers for as long as you let her.",
    },
    {
      name: "Theo Marchetti",
      role: "Sourcing",
      bio: "Visits every partner farm and cooperative at least once a year.",
    },
    {
      name: "Ama Mensah",
      role: "Customer care lead",
      bio: "Answers the care inbox and runs our sixty-day returns, no forms needed.",
    },
  ],
};

export const help = {
  title: "Help & FAQ",
  text: "Shipping, returns, refills and the questions we hear most. If you cannot find an answer, write to us; a person replies within one working day.",
  shipping: [
    {
      method: "Standard",
      time: "3–5 business days",
      price: "$6, free over $60",
    },
    { method: "Express", time: "1–2 business days", price: "$14" },
    {
      method: "Canada",
      time: "5–8 business days",
      price: "$12, free over $90",
    },
  ],
  faq: [
    {
      q: "How do I know which products suit my skin?",
      a: "Start with the ritual builder. It asks four questions and suggests one product per step. If you are still unsure, write to the care team with a description of your skin and we will reply with a suggestion, not a sales pitch.",
    },
    {
      q: "Can I return something I have opened?",
      a: "Yes. Within sixty days of delivery, opened or unopened, we refund the full price. Email us and we send a prepaid label; we donate unopened returns and recycle the rest.",
    },
    {
      q: "How do refill pods work?",
      a: "Buy a cream once in its glass jar. When it runs out, order the refill pod, lift the empty pod out of the jar and click the new one in. Empty pods can go in household recycling once rinsed.",
    },
    {
      q: "Are your products safe in pregnancy?",
      a: "Most of our range uses ingredients generally considered fine in pregnancy, but we always suggest checking every new product with your midwife or doctor. Bakuchiol has not been well studied in pregnancy, so we suggest pausing Still Night Serum.",
    },
    {
      q: "Do you test on animals?",
      a: "Never, at any stage, and neither do our ingredient suppliers. Every formula is tested by human volunteers over eight weeks.",
    },
    {
      q: "How long do products last once opened?",
      a: "Twelve months for most, six for oils and serums with vitamin C. The open-jar symbol on each pack shows the exact period.",
    },
    {
      q: "Why is my First Light Serum darker than when I bought it?",
      a: "Sea buckthorn oil deepens slightly in colour over time. That is normal. If it turns brown and smells sharp, it has oxidised; write to us and we will replace it.",
    },
    {
      q: "Do you ship outside the US?",
      a: "We ship to the United States and Canada for now. Duties to Canada are included in the price you see at checkout.",
    },
  ],
};

export const checkoutCopy = {
  freeOver: 60,
  delivery: [
    {
      id: "standard",
      label: "Standard",
      detail: "3–5 business days",
      price: 6,
    },
    { id: "express", label: "Express", detail: "1–2 business days", price: 14 },
  ],
  countries: ["United States", "Canada"],
  samples: [
    "Dew Serum, 5 ml",
    "First Light Serum, 5 ml",
    "Still Night Serum, 5 ml",
  ],
};

export const newsletter = {
  title: "A softer kind of inbox.",
  text: "One letter a month: a new journal piece, what we are formulating, and first word on seasonal batches.",
};
