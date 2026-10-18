import browline from "./assets/browline.jpg";
import roundSun from "./assets/round-sun.jpg";
import wood from "./assets/wood.jpg";
import catEye from "./assets/cat-eye.jpg";
import clearSun from "./assets/clear-sun.jpg";
import phoropter from "./assets/phoropter.jpg";
import examRoom from "./assets/exam-room.jpg";
import trialLenses from "./assets/trial-lenses.jpg";

export const images = {
  browline,
  roundSun,
  wood,
  catEye,
  clearSun,
  phoropter,
  examRoom,
  trialLenses,
};

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Lumen",
  sector: "Eyewear brand",
  tagline: "Glasses that fit your face, at one honest price.",
  announcement:
    "Every frame from $145 with prescription lenses · Free shipping and 30-day returns",
  email: "hello@lumen.example",
  phone: "+1 555 0146 200",
  phoneHref: "tel:+15550146200",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
  ],
};

export const nav = [
  { to: "/frames", label: "Frames" },
  { to: "/face-shapes", label: "Face shapes" },
  { to: "/lenses", label: "Lenses" },
  { to: "/stores", label: "Stores" },
  { to: "/about", label: "About" },
];

/* ───────────────────────── Frames ───────────────────────── */

export type Shape =
  | "round"
  | "panto"
  | "oval"
  | "square"
  | "rectangle"
  | "cat-eye"
  | "aviator"
  | "hexagon"
  | "browline";
export type FaceShape =
  "oval" | "round" | "square" | "heart" | "diamond" | "oblong";
export type Finish = "solid" | "clear" | "tortoise" | "metal";

export type Colour = {
  name: string;
  /** Colour code stamped inside the temple. */
  code: string;
  rim: string;
  finish: Finish;
  /** Sun lens tint; optical frames show clear lenses. */
  lens?: string;
  /** Lower rim and bridge on browline frames. */
  wire?: string;
};

export type Size = {
  label: "Narrow" | "Medium" | "Wide";
  lens: number;
  bridge: number;
  temple: number;
  width: number;
};

export type Frame = {
  id: string;
  name: string;
  line: "optical" | "sun";
  shape: Shape;
  material: "Acetate" | "Titanium" | "Acetate & titanium";
  price: number;
  weight: number;
  isNew?: boolean;
  colours: Colour[];
  sizes: Size[];
  faces: FaceShape[];
  summary: string;
  story: string;
  details: string[];
  photo?: { src: string; alt: string };
};

const ink: Colour = {
  name: "Ink",
  code: "C.01",
  rim: "#1b1e1a",
  finish: "solid",
};
const tortoise: Colour = {
  name: "Tortoise",
  code: "C.02",
  rim: "#6d3c1c",
  finish: "tortoise",
};
const gold = (code: string, lens?: string): Colour => ({
  name: "Brushed gold",
  code,
  rim: "#b6924b",
  finish: "metal",
  lens,
});
const silver = (code: string, lens?: string): Colour => ({
  name: "Silver",
  code,
  rim: "#9da2a3",
  finish: "metal",
  lens,
});

export const frames: Frame[] = [
  {
    id: "orla",
    name: "Orla",
    line: "optical",
    shape: "round",
    material: "Acetate",
    price: 145,
    weight: 21,
    colours: [
      ink,
      tortoise,
      { name: "Sage clear", code: "C.07", rim: "#8fa48a", finish: "clear" },
      { name: "Oyster", code: "C.11", rim: "#cfc5b4", finish: "solid" },
    ],
    sizes: [
      { label: "Narrow", lens: 46, bridge: 21, temple: 140, width: 128 },
      { label: "Medium", lens: 49, bridge: 21, temple: 145, width: 134 },
    ],
    faces: ["square", "diamond", "oblong", "heart"],
    summary:
      "A true round in 6 mm acetate. Our most-tried frame in every store.",
    story:
      "Orla is the circle we kept coming back to: perfectly round lenses, a keyhole bridge that sits a little higher on the nose, and temples that stay slim to the hinge. It softens a strong jaw and gives a long face some width without ever looking like a costume.",
    details: [
      "6 mm cellulose acetate, hand-polished for three days",
      "Keyhole bridge for low or narrow nose bridges",
      "Five-barrel hinges, riveted through the front",
      "Adjustable wire-core temples",
    ],
  },
  {
    id: "bram",
    name: "Bram",
    line: "optical",
    shape: "rectangle",
    material: "Acetate",
    price: 145,
    weight: 24,
    colours: [
      ink,
      { name: "Navy", code: "C.04", rim: "#22314a", finish: "solid" },
      { name: "Smoke clear", code: "C.08", rim: "#6f7477", finish: "clear" },
      tortoise,
    ],
    sizes: [
      { label: "Medium", lens: 52, bridge: 18, temple: 145, width: 138 },
      { label: "Wide", lens: 55, bridge: 18, temple: 150, width: 144 },
    ],
    faces: ["round", "oval", "heart"],
    summary: "A low, wide rectangle that adds structure to soft features.",
    story:
      "Bram is the frame people buy for work and end up wearing everywhere. The lens is a little shallower than most rectangles, so the brow line reads clean and varifocal wearers still get a generous reading zone at the bottom.",
    details: [
      "6 mm cellulose acetate",
      "Lens depth 37 mm, varifocal-ready",
      "Flat brow line with a softened outer corner",
      "Five-barrel hinges",
    ],
  },
  {
    id: "hale",
    name: "Hale",
    line: "optical",
    shape: "square",
    material: "Acetate",
    price: 165,
    weight: 28,
    isNew: true,
    colours: [
      ink,
      { name: "Olive", code: "C.05", rim: "#4d5833", finish: "solid" },
      tortoise,
      { name: "Crystal", code: "C.09", rim: "#d5d9d2", finish: "clear" },
    ],
    sizes: [
      { label: "Medium", lens: 50, bridge: 20, temple: 145, width: 136 },
      { label: "Wide", lens: 53, bridge: 20, temple: 150, width: 142 },
    ],
    faces: ["round", "oval", "diamond"],
    summary: "Heavy 8 mm acetate, cut square. Confident without shouting.",
    story:
      "Hale is cut from 8 mm acetate, the thickest block our workshop will put through the mill. The extra depth shows at the edge of the front, so even the Ink colourway catches light. It is our answer to the question we hear most in store: something bold that still works on a Monday.",
    details: [
      "8 mm cellulose acetate",
      "Bevelled front edge",
      "Sculpted nose pads built into the bridge",
      "Seven-barrel hinges",
    ],
  },
  {
    id: "ines",
    name: "Ines",
    line: "optical",
    shape: "cat-eye",
    material: "Acetate",
    price: 155,
    weight: 22,
    colours: [
      { name: "Oxblood", code: "C.06", rim: "#5c1e22", finish: "solid" },
      ink,
      { name: "Rose clear", code: "C.10", rim: "#cf9c93", finish: "clear" },
      tortoise,
    ],
    sizes: [
      { label: "Narrow", lens: 49, bridge: 18, temple: 140, width: 130 },
      { label: "Medium", lens: 51, bridge: 18, temple: 145, width: 135 },
    ],
    faces: ["oval", "round", "square", "diamond"],
    summary: "A gentle lift at the outer corner, not a full flick.",
    story:
      "Ines lifts the eye line by about four millimetres at the outer edge, enough to draw attention up and out without turning into a vintage piece. The brow follows the natural curve of the eyebrow, so it sits well under a fringe.",
    details: [
      "6 mm cellulose acetate",
      "Raised outer corner, 4 mm lift",
      "Keyhole bridge",
      "Five-barrel hinges",
    ],
  },
  {
    id: "cato",
    name: "Cato",
    line: "optical",
    shape: "panto",
    material: "Titanium",
    price: 195,
    weight: 12,
    colours: [
      gold("T.01"),
      { name: "Gunmetal", code: "T.02", rim: "#585c5f", finish: "metal" },
      silver("T.03"),
    ],
    sizes: [
      { label: "Narrow", lens: 47, bridge: 21, temple: 140, width: 127 },
      { label: "Medium", lens: 50, bridge: 21, temple: 145, width: 133 },
    ],
    faces: ["square", "oblong", "diamond"],
    summary: "Twelve grams of beta-titanium. You will forget it is there.",
    story:
      "Cato is a panto shape: a flatter top that follows the brow and a round lower rim. In beta-titanium it weighs twelve grams, bends without cracking and leaves no marks on the nose. It is the frame our optometrists recommend most for strong prescriptions, because the small round lens keeps edges thin.",
    details: [
      "Beta-titanium front and temples",
      "Adjustable silicone nose pads",
      "Screwless spring hinges",
      "Acetate temple tips",
    ],
  },
  {
    id: "wren",
    name: "Wren",
    line: "optical",
    shape: "hexagon",
    material: "Titanium",
    price: 195,
    weight: 13,
    isNew: true,
    colours: [
      gold("T.04"),
      { name: "Matte black", code: "T.05", rim: "#24262a", finish: "metal" },
      { name: "Rose gold", code: "T.06", rim: "#b48572", finish: "metal" },
    ],
    sizes: [{ label: "Medium", lens: 49, bridge: 20, temple: 145, width: 132 }],
    faces: ["round", "oval", "square"],
    summary: "Six soft facets in fine titanium wire.",
    story:
      "Wren takes a round lens and gives it six flat sides. On a round face the facets add just enough angle; on an angular face they echo it. The wire is 1.2 mm titanium, so the shape reads as a line drawing rather than a frame.",
    details: [
      "1.2 mm titanium wire",
      "Hexagonal lens with softened corners",
      "Adjustable silicone nose pads",
      "Acetate temple tips",
    ],
  },
  {
    id: "juno",
    name: "Juno",
    line: "optical",
    shape: "oval",
    material: "Titanium",
    price: 175,
    weight: 11,
    colours: [
      silver("T.07"),
      gold("T.08"),
      { name: "Matte black", code: "T.09", rim: "#24262a", finish: "metal" },
    ],
    sizes: [
      { label: "Narrow", lens: 46, bridge: 19, temple: 140, width: 124 },
      { label: "Medium", lens: 50, bridge: 19, temple: 145, width: 132 },
    ],
    faces: ["square", "oblong", "heart"],
    summary:
      "A shallow oval for people who would rather not notice their glasses.",
    story:
      "Juno is the quiet one: a soft horizontal oval in thin titanium, eleven grams in total. It suits angular faces and longer faces and disappears on video calls. If you are moving from contact lenses to glasses for the first time, start here.",
    details: [
      "Titanium front and temples",
      "Adjustable silicone nose pads",
      "Spring hinges",
      "Lightest frame in the collection",
    ],
  },
  {
    id: "ash",
    name: "Ash",
    line: "optical",
    shape: "browline",
    material: "Acetate & titanium",
    price: 175,
    weight: 19,
    colours: [
      {
        name: "Tortoise & gold",
        code: "B.01",
        rim: "#6d3c1c",
        finish: "tortoise",
        wire: "#b6924b",
      },
      {
        name: "Ink & silver",
        code: "B.02",
        rim: "#1b1e1a",
        finish: "solid",
        wire: "#9da2a3",
      },
    ],
    sizes: [
      { label: "Medium", lens: 50, bridge: 21, temple: 145, width: 135 },
      { label: "Wide", lens: 52, bridge: 21, temple: 145, width: 140 },
    ],
    faces: ["round", "oval", "heart"],
    summary: "An acetate brow over a titanium lower rim.",
    story:
      "Ash puts all the weight of the frame at the brow, where it frames the eye, and keeps the lower rim to a thin titanium wire. It is the frame for people who want the authority of a heavy acetate without the heaviness.",
    details: [
      "6 mm acetate brow, titanium lower rim",
      "Adjustable nose pads",
      "Five-barrel hinges",
      "Acetate temples with wire core",
    ],
    photo: {
      src: browline,
      alt: "Ash glasses in tortoise and gold resting open on a white book",
    },
  },
  {
    id: "sol",
    name: "Sol",
    line: "sun",
    shape: "aviator",
    material: "Titanium",
    price: 195,
    weight: 16,
    colours: [
      gold("S.01", "#3f5240"),
      silver("S.02", "#3e4347"),
      {
        name: "Matte black",
        code: "S.03",
        rim: "#24262a",
        finish: "metal",
        lens: "#2f3133",
      },
    ],
    sizes: [
      { label: "Medium", lens: 56, bridge: 16, temple: 140, width: 140 },
      { label: "Wide", lens: 58, bridge: 16, temple: 145, width: 146 },
    ],
    faces: ["oval", "heart", "square"],
    summary: "A double-bridge aviator with polarised mineral-green lenses.",
    story:
      "Sol is a classic teardrop with a lower, flatter top bar so it sits closer to the brow. The lenses are polarised and category 3, which cuts glare off water and wet roads while keeping colours true.",
    details: [
      "Titanium front with double bridge",
      "Polarised category 3 lenses",
      "Adjustable nose pads",
      "Spring hinges",
    ],
  },
  {
    id: "tove",
    name: "Tove",
    line: "sun",
    shape: "cat-eye",
    material: "Acetate",
    price: 165,
    weight: 27,
    colours: [
      { ...ink, code: "S.04", lens: "#2e3130" },
      { ...tortoise, code: "S.05", lens: "#5a3a26" },
      {
        name: "Bone",
        code: "S.06",
        rim: "#e2d8c6",
        finish: "solid",
        lens: "#6b4a3a",
      },
    ],
    sizes: [{ label: "Medium", lens: 53, bridge: 19, temple: 145, width: 140 }],
    faces: ["oval", "round", "diamond", "square"],
    summary: "An oversized cat-eye in 8 mm acetate with gradient lenses.",
    story:
      "Tove is our summer frame: a larger cat-eye in thick acetate with a gradient lens that is darker at the top for sun and lighter at the bottom for reading a menu. The outer corner lifts more than Ines, because sunglasses can afford to.",
    details: [
      "8 mm cellulose acetate",
      "Gradient category 2 lenses",
      "Raised outer corner, 6 mm lift",
      "Five-barrel hinges",
    ],
    photo: {
      src: catEye,
      alt: "Tove sunglasses in bone acetate with brown gradient lenses on a white surface",
    },
  },
  {
    id: "mika",
    name: "Mika",
    line: "sun",
    shape: "round",
    material: "Titanium",
    price: 175,
    weight: 14,
    colours: [gold("S.07", "#33473d"), silver("S.08", "#3e4347")],
    sizes: [{ label: "Medium", lens: 49, bridge: 21, temple: 145, width: 132 }],
    faces: ["square", "oblong", "diamond"],
    summary: "Thin titanium rounds with bottle-green lenses.",
    story:
      "Mika is Orla's sunny sibling, rebuilt in thin titanium: a small round lens, a high bridge and a bottle-green tint that keeps contrast high on bright days.",
    details: [
      "Titanium front and temples",
      "Category 3 green lenses",
      "Adjustable nose pads",
      "Acetate temple tips",
    ],
    photo: {
      src: roundSun,
      alt: "Mika sunglasses in brushed gold with green lenses on a white marble surface",
    },
  },
  {
    id: "lido",
    name: "Lido",
    line: "sun",
    shape: "panto",
    material: "Acetate",
    price: 165,
    weight: 24,
    isNew: true,
    colours: [
      {
        name: "Champagne clear",
        code: "S.09",
        rim: "#cdb48c",
        finish: "clear",
        lens: "#8a4f2c",
      },
      { ...ink, code: "S.10", lens: "#2e3130" },
      {
        name: "Sea clear",
        code: "S.11",
        rim: "#5b7a74",
        finish: "clear",
        lens: "#3d5248",
      },
    ],
    sizes: [
      { label: "Narrow", lens: 48, bridge: 21, temple: 145, width: 132 },
      { label: "Medium", lens: 51, bridge: 21, temple: 145, width: 138 },
    ],
    faces: ["square", "heart", "oblong", "diamond"],
    summary: "A clear acetate panto with warm amber lenses.",
    story:
      "Lido is cut from clear acetate so the core wire shows through the temples. The amber lens warms everything up and sharpens contrast in flat light, which is why our Valencia Street team wears it through foggy summers.",
    details: [
      "6 mm clear cellulose acetate",
      "Category 2 amber lenses",
      "Visible engraved core wire",
      "Five-barrel hinges",
    ],
    photo: {
      src: clearSun,
      alt: "Lido sunglasses in champagne clear acetate with amber lenses, lying in the sun by the sea",
    },
  },
];

export const shapes: { id: Shape; label: string }[] = [
  { id: "round", label: "Round" },
  { id: "panto", label: "Panto" },
  { id: "oval", label: "Oval" },
  { id: "square", label: "Square" },
  { id: "rectangle", label: "Rectangle" },
  { id: "cat-eye", label: "Cat-eye" },
  { id: "aviator", label: "Aviator" },
  { id: "hexagon", label: "Hexagon" },
  { id: "browline", label: "Browline" },
];

export const materials = ["Acetate", "Titanium", "Acetate & titanium"] as const;

export const shopCopy = {
  title: "Frames",
  intro:
    "Twelve shapes, each in two or three sizes, every one priced with single-vision prescription lenses included. Filter by what suits you, or by what you already know fits.",
  fitNote:
    "Not sure of your size? Look inside the left temple of your current glasses: three numbers like 49□21-145 are lens width, bridge and temple length in millimetres.",
};

/* ───────────────────────── Lenses ───────────────────────── */

export type LensType = {
  id: string;
  name: string;
  price: number;
  short: string;
  detail: string;
  rx: boolean;
};

export const lensTypes: LensType[] = [
  {
    id: "single",
    name: "Single vision",
    price: 0,
    rx: true,
    short: "One prescription, for distance or for near.",
    detail:
      "The right lens for most people under forty and anyone who needs glasses for one job: driving, screens or reading. Included in the frame price, with anti-reflective and scratch-resistant coatings.",
  },
  {
    id: "varifocal",
    name: "Varifocal",
    price: 175,
    rx: true,
    short: "Distance at the top, reading at the bottom, no line in between.",
    detail:
      "A progressive lens with a smooth change in power from top to bottom. We measure your fitting height in store or from a photo, and include one free remake if you cannot adapt within 60 days.",
  },
  {
    id: "readers",
    name: "Readers",
    price: 0,
    rx: false,
    short: "Magnification from +1.00 to +3.00, no prescription needed.",
    detail:
      "Ready-made reading strength in both lenses, chosen at checkout. Good for the bedside or the kitchen drawer. If your eyes need different strengths, choose single vision instead.",
  },
  {
    id: "plano",
    name: "No prescription",
    price: 0,
    rx: false,
    short: "Clear or tinted lenses with zero power.",
    detail:
      "For sunglasses, or for a frame you simply like wearing. Lenses still carry the full set of coatings and a UV400 filter.",
  },
];

export const lensIndexes = [
  { id: "1.50", name: "Standard 1.50", price: 0, n: 1.5, note: "Up to ±2.00" },
  { id: "1.60", name: "Thin 1.60", price: 35, n: 1.6, note: "±2.25 to ±4.00" },
  {
    id: "1.67",
    name: "Thinner 1.67",
    price: 75,
    n: 1.67,
    note: "±4.25 to ±6.00",
  },
  {
    id: "1.74",
    name: "Thinnest 1.74",
    price: 130,
    n: 1.74,
    note: "Above ±6.00",
  },
];

export const lightReactive = {
  name: "Light-reactive",
  price: 95,
  short:
    "Clear indoors, darkens to a grey sun tint outside in about thirty seconds.",
};

export const included = [
  {
    item: "Single-vision prescription lenses",
    note: "Any strength up to ±10.00",
  },
  { item: "Anti-reflective coating", note: "Both sides, easy-clean top layer" },
  { item: "Scratch-resistant hardcoat", note: "Two-year lens warranty" },
  { item: "UV400 filter", note: "On every lens, clear or tinted" },
  {
    item: "Case and microfibre cloth",
    note: "Recycled felt, made in Portugal",
  },
  {
    item: "Fitting and adjustments",
    note: "In any store, for the life of the frame",
  },
  { item: "Shipping and returns", note: "Both ways, within 30 days" },
];

export const lensesCopy = {
  title: "The lens guide",
  intro:
    "The frame is what people see. The lens is what you see through. Here is everything we put into one, what each option costs, and how to read the prescription your optometrist hands you.",
  thickness: {
    title: "How thick will my lenses be?",
    body: "Stronger prescriptions bend light more, so the lens gets thicker at the edge (for short-sight) or in the middle (for long-sight). Higher-index materials bend light more efficiently and stay thinner. Drag the slider to your sphere value and compare.",
    note: "Illustrative estimate for a 50 mm round lens with a 1.8 mm centre. Your optician will give you a precise figure.",
  },
  rxCard: {
    title: "Reading your prescription",
    body: "Prescriptions use the same handful of abbreviations everywhere. OD is your right eye and OS is your left, from the Latin oculus dexter and oculus sinister.",
    rows: [
      { eye: "OD", sph: "-2.25", cyl: "-0.50", axis: "180", add: "" },
      { eye: "OS", sph: "-2.00", cyl: "-0.75", axis: "170", add: "" },
    ],
    pd: "63",
    terms: [
      {
        term: "SPH",
        def: "Sphere. The main strength in dioptres. Minus corrects short-sight, plus corrects long-sight.",
      },
      {
        term: "CYL",
        def: "Cylinder. Extra power for astigmatism, where the eye focuses differently along two directions. Blank means none.",
      },
      {
        term: "AXIS",
        def: "The angle of the cylinder, from 1 to 180 degrees. Only present when there is a CYL value.",
      },
      {
        term: "ADD",
        def: "Additional plus power for reading, used to make varifocal and reading lenses.",
      },
      {
        term: "PD",
        def: "Pupillary distance, in millimetres. We centre each lens on your pupil with it. We measure it free in store.",
      },
    ],
  },
  faq: [
    {
      q: "Can I use a prescription from another optometrist?",
      a: "Yes. Upload it or type it in at checkout. We accept prescriptions issued in the last two years, and our opticians check every one before your lenses are cut.",
    },
    {
      q: "My prescription has expired. What now?",
      a: "Book a 30-minute eye exam in any store. It costs $75, and we credit the full amount back when you order glasses within 30 days.",
    },
    {
      q: "How long do lenses take?",
      a: "Single-vision lenses ship in five to seven working days. Varifocals and 1.74 lenses take nine to eleven, because they are surfaced to order.",
    },
    {
      q: "Can you put new lenses in my old frame?",
      a: "Yes, in store, for any frame in good condition. Single vision from $85, varifocal from $260. We will tell you honestly if the frame is too fragile.",
    },
    {
      q: "Do blue-light lenses help with screens?",
      a: "The evidence for eye health benefits is weak, so we do not sell them as a medical feature. Our standard anti-reflective coating already reduces glare from screens and lamps.",
    },
  ],
};

/* ───────────────────────── Face shapes ───────────────────────── */

export type FaceInfo = {
  id: FaceShape;
  name: string;
  summary: string;
  advice: string;
  avoid: string;
  suits: Shape[];
};

export const faces: FaceInfo[] = [
  {
    id: "oval",
    name: "Oval",
    summary:
      "Longer than wide, with cheekbones slightly wider than a gently rounded jaw.",
    advice:
      "Almost every shape is balanced on an oval face. Pick frames as wide as the widest part of your face, and use the brow line to say something.",
    avoid: "Very narrow frames, which make the face look longer.",
    suits: ["rectangle", "square", "cat-eye", "aviator", "hexagon", "browline"],
  },
  {
    id: "round",
    name: "Round",
    summary:
      "Width and length about equal, full cheeks and a soft jaw without strong corners.",
    advice:
      "Angles add structure. Square, rectangular and browline frames sharpen the face, and a slightly wider frame makes it look longer.",
    avoid: "Small round lenses, which repeat the curve.",
    suits: ["square", "rectangle", "browline", "hexagon", "cat-eye"],
  },
  {
    id: "square",
    name: "Square",
    summary:
      "A broad forehead, wide cheekbones and a strong, angular jaw of similar width.",
    advice:
      "Curves soften a strong jaw. Round, oval and panto shapes balance the corners, and thin metal frames keep the look light.",
    avoid: "Sharp, boxy frames that echo the jawline.",
    suits: ["round", "oval", "panto", "aviator", "cat-eye"],
  },
  {
    id: "heart",
    name: "Heart",
    summary:
      "The widest point is the forehead, tapering to a narrower, sometimes pointed chin.",
    advice:
      "Bring weight down and keep the top light. Frames that are wider at the bottom, light rims and rounded lower edges all balance a broad brow.",
    avoid: "Heavy, decorated brow lines.",
    suits: ["oval", "round", "panto", "aviator", "rectangle", "browline"],
  },
  {
    id: "diamond",
    name: "Diamond",
    summary: "High, wide cheekbones with a narrower forehead and jaw.",
    advice:
      "Draw attention to the eyes and soften the cheekbones. Cat-eye and oval frames with a strong brow do this best.",
    avoid: "Narrow frames that sit inside the cheekbones.",
    suits: ["cat-eye", "oval", "round", "panto"],
  },
  {
    id: "oblong",
    name: "Oblong",
    summary:
      "Noticeably longer than wide, with straight sides and a long cheek line.",
    advice:
      "Deeper lenses shorten the face. Choose round or panto shapes with some height and a bridge that sits low.",
    avoid: "Small, shallow lenses that leave a lot of face below.",
    suits: ["round", "panto", "square", "aviator"],
  },
];

export type Answers = { widest: string; length: string; jaw: string };

export const finder = {
  title: "Find frames for your face",
  intro:
    "Stand in front of a mirror with your hair pulled back. Three questions, about thirty seconds, and you will see the shapes our opticians would hand you first.",
  questions: [
    {
      id: "widest" as const,
      label: "Which part of your face is widest?",
      options: [
        { value: "forehead", label: "Forehead" },
        { value: "cheekbones", label: "Cheekbones" },
        { value: "jaw", label: "Jaw" },
        { value: "even", label: "All about the same" },
      ],
    },
    {
      id: "length" as const,
      label: "How long is your face compared with its width?",
      options: [
        { value: "long", label: "Clearly longer" },
        { value: "balanced", label: "About the same" },
      ],
    },
    {
      id: "jaw" as const,
      label: "How would you describe your jawline?",
      options: [
        { value: "soft", label: "Soft and rounded" },
        { value: "angular", label: "Angular and defined" },
        { value: "pointed", label: "Narrow, coming to a point" },
      ],
    },
  ],
  note: "Face shape is a starting point, not a rule. The best fit is the one you want to wear; any store will let you try twelve frames in ten minutes.",
};

/* ───────────────────────── Stores & eye tests ───────────────────────── */

/** Opening hours by weekday, Sunday first, as [open, close] in 24h hours; null when closed. */
export type Hours = ([number, number] | null)[];

export type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  postcode: string;
  phone: string;
  hours: Hours;
  /** Weekdays (0 = Sunday) with an optometrist in clinic. */
  clinicDays: number[];
  optometrists: string[];
  services: string[];
  intro: string;
  directions: string;
  photo: { src: string; alt: string };
};

const weekday: [number, number] = [10, 19];

export const stores: Store[] = [
  {
    id: "mercer-street",
    name: "Mercer Street",
    city: "New York",
    address: "112 Mercer Street",
    postcode: "New York, NY 10012",
    phone: "+1 555 0146 210",
    hours: [[11, 18], weekday, weekday, weekday, [10, 20], [10, 20], [10, 19]],
    clinicDays: [1, 2, 3, 4, 5, 6],
    optometrists: ["Dr. Naomi Achterberg", "Dr. Felix Oduya"],
    services: [
      "Eye exams",
      "Contact lens fittings",
      "Kids' eye exams",
      "Repairs while you wait",
    ],
    intro:
      "Our first store, in a former print shop with a 30-foot frame wall and two exam rooms at the back. Busiest on Saturday afternoons; Tuesday mornings are calm.",
    directions:
      "Prince St (R/W) is two minutes away. Bike racks outside 110 Mercer.",
    photo: {
      src: examRoom,
      alt: "An exam room with a phoropter on an arm in front of the patient chair",
    },
  },
  {
    id: "valencia-street",
    name: "Valencia Street",
    city: "San Francisco",
    address: "845 Valencia Street",
    postcode: "San Francisco, CA 94110",
    phone: "+1 555 0146 230",
    hours: [[11, 17], weekday, weekday, weekday, weekday, weekday, [10, 18]],
    clinicDays: [2, 3, 4, 5, 6],
    optometrists: ["Dr. Lucía Bermejo"],
    services: [
      "Eye exams",
      "Kids' eye exams",
      "Lens replacement in your own frame",
    ],
    intro:
      "A long, narrow store with skylights over the fitting bench, so you can judge a tint in daylight before you buy it.",
    directions:
      "16th St Mission BART, then a six-minute walk south. Street parking on 20th.",
    photo: {
      src: phoropter,
      alt: "A patient looking through a phoropter during a refraction test",
    },
  },
  {
    id: "fulton-market",
    name: "Fulton Market",
    city: "Chicago",
    address: "920 W Fulton Market",
    postcode: "Chicago, IL 60607",
    phone: "+1 555 0146 250",
    hours: [null, weekday, weekday, weekday, weekday, [10, 20], [10, 18]],
    clinicDays: [1, 3, 4, 5, 6],
    optometrists: ["Dr. Grace Whitlow", "Dr. Amir Haddad"],
    services: [
      "Eye exams",
      "Contact lens fittings",
      "Varifocal fittings",
      "Repairs while you wait",
    ],
    intro:
      "Our biggest store, in a converted cold-storage warehouse. The repair bench sits in the window; bring in any frame and we will tighten, align and clean it for free.",
    directions:
      "Morgan (Green/Pink) station is a three-minute walk. Paid parking on Carpenter St.",
    photo: {
      src: browline,
      alt: "A pair of browline glasses resting open on a white book",
    },
  },
  {
    id: "south-congress",
    name: "South Congress",
    city: "Austin",
    address: "1501 S Congress Avenue",
    postcode: "Austin, TX 78704",
    phone: "+1 555 0146 270",
    hours: [
      [11, 17],
      [10, 18],
      [10, 18],
      [10, 18],
      [10, 18],
      [10, 19],
      [10, 19],
    ],
    clinicDays: [1, 2, 4, 5, 6],
    optometrists: ["Dr. Hollis Raines"],
    services: [
      "Eye exams",
      "Kids' eye exams",
      "Prescription sunglasses fittings",
    ],
    intro:
      "The sunglasses store. Half the wall is sun frames, and the porch out front is where we check tints against the Texas afternoon.",
    directions:
      "Bus 1 or 801 to Congress & Mary. Free parking behind the building.",
    photo: {
      src: clearSun,
      alt: "Clear acetate sunglasses with amber lenses in bright sun by the water",
    },
  },
];

export const exams = [
  {
    id: "eye-exam",
    name: "Eye exam",
    minutes: 30,
    price: 75,
    note: "Prescription and eye health check. Credited back when you order glasses within 30 days.",
  },
  {
    id: "contacts",
    name: "Contact lens exam",
    minutes: 45,
    price: 110,
    note: "Eye exam plus a contact lens fitting and a trial pair to take home.",
  },
  {
    id: "kids",
    name: "Kids' eye exam",
    minutes: 30,
    price: 0,
    note: "Free for under-16s, with a parent or guardian present.",
  },
];

export const examSteps = [
  {
    title: "History",
    body: "Five minutes on how you use your eyes: screens, driving, reading, headaches, family history.",
  },
  {
    title: "Pre-tests",
    body: "Eye pressure with a gentle puff of air and a wide photo of the back of the eye, included at no extra cost.",
  },
  {
    title: "Refraction",
    body: "The optometrist dials lenses in front of each eye with a phoropter, one comparison at a time, until the chart is sharpest.",
  },
  {
    title: "Health check",
    body: "A close look at the front and back of each eye with a slit lamp, then your results explained in plain words.",
  },
  {
    title: "Your prescription",
    body: "Emailed the same day, yours to keep and use anywhere. No obligation to buy glasses from us.",
  },
];

export const eyeTestCopy = {
  title: "Book an eye test",
  intro:
    "Thirty minutes with a licensed optometrist, in any of our four stores. Book here, and if you need to move it, reply to the confirmation email.",
  bring: [
    "Your current glasses or contact lens box",
    "Any previous prescription",
    "A list of medications you take",
  ],
};

/* ───────────────────────── Home, about, social proof ───────────────────────── */

export const home = {
  title: "Glasses that fit your face, made in a week.",
  intro:
    "Lumen frames are designed in New York and finished by hand. Every pair comes with prescription lenses, and every store has an optometrist who will tell you the truth about what suits you.",
  priceTitle: "What $145 buys",
  priceBody:
    "Most opticians quote a frame, then add lenses, coatings and fitting until the bill doubles. We fold the things everybody needs into one price and charge separately only for what some people need.",
  finderTitle: "Not sure which shape?",
  finderBody:
    "Answer three questions in front of a mirror and see the frames our opticians would hand you first.",
  sunTitle: "Sunglasses, with or without a prescription",
  sunBody:
    "Four sun frames with polarised or gradient lenses, all available in your prescription for the same price as the optical range. Category 3 tints for bright days, amber for flat light.",
  lensTitle: "Thinner lenses, explained",
  lensBody:
    "See how lens index changes thickness at your prescription, what varifocals cost, and how to read the numbers on your Rx.",
  examTitle: "A proper eye exam, not a sales pitch",
  examBody:
    "Our optometrists are salaried, not on commission. You leave with your prescription whether you buy glasses or not.",
  closeLines: ["Book", "an eye test", "this week"],
  closeBody:
    "Thirty minutes, $75, credited back if you buy glasses. Slots open two weeks ahead in all four stores.",
};

export const reviews = [
  {
    quote:
      "I tried on Orla and Cato for twenty minutes and the optician talked me out of the more expensive one. That is why I came back for sunglasses.",
    name: "Priya S.",
    detail: "Orla in Sage clear · Mercer Street",
  },
  {
    quote:
      "First varifocals. They remade them once when the reading zone sat too low, no questions, no fee.",
    name: "Tom H.",
    detail: "Bram in Navy · Fulton Market",
  },
  {
    quote:
      "Ordered online with an old prescription, got a call from an optician who spotted it had expired. Booked a test the same week.",
    name: "Dana R.",
    detail: "Ines in Oxblood · Valencia Street",
  },
];

export const about = {
  title: "We started with the receipt",
  intro:
    "In 2019 two of us bought glasses on the same afternoon and compared receipts: $412 and $389, for frames that cost a fraction of that to make, plus a list of coatings neither of us had asked for. Lumen began as a spreadsheet about where that money went.",
  story: [
    "We found a family workshop in Sabae, the town that makes most of Japan's frames, willing to cut small runs of acetate and titanium for a company with no stores and no track record. We drew twelve shapes, each in more than one size, because a frame that is two millimetres too wide never looks right whatever its colour.",
    "Then we hired optometrists before we hired salespeople. Every Lumen store has an exam room, and every optometrist is on a salary. Nobody in a Lumen store earns more when you spend more.",
    "Our price is our design brief: a frame and the lenses most people need, for one number, written on the wall.",
  ],
  principles: [
    {
      title: "One price, written down",
      body: "Frames from $145 including single-vision lenses and every coating that should be standard. Extras are listed with their price, never bundled.",
    },
    {
      title: "Sizes, not just styles",
      body: "Most of our frames come in two or three widths. Fit decides comfort; we would rather stock more sizes than more colours.",
    },
    {
      title: "Repairs for life",
      body: "Screws, nose pads, temple tips and alignment are free in any store for as long as you own the frame.",
    },
  ],
  team: [
    {
      name: "Mara Lindqvist",
      role: "Co-founder, design",
      bio: "Drew every frame in the range. Previously designed furniture hardware, which explains the hinges.",
    },
    {
      name: "Julian Osei",
      role: "Co-founder, operations",
      bio: "Owns the spreadsheet that started it all, and the lab relationships that keep lenses at seven days.",
    },
    {
      name: "Dr. Naomi Achterberg",
      role: "Head of clinical",
      bio: "Optometrist for fifteen years. Sets the exam protocol in every store and trains every new clinician.",
    },
    {
      name: "Ren Takahashi",
      role: "Workshop lead, Sabae",
      bio: "Third generation in the family workshop. Approves every acetate block before it is cut.",
    },
  ],
  timeline: [
    { year: "2019", text: "Two receipts and a spreadsheet." },
    {
      year: "2020",
      text: "First twelve frames shipped from a spare room, online only.",
    },
    { year: "2021", text: "Mercer Street opens with two exam rooms." },
    {
      year: "2023",
      text: "Valencia Street and Fulton Market open; titanium range launches.",
    },
    {
      year: "2025",
      text: "South Congress opens as the first sun-first store.",
    },
  ],
};

export const checkoutCopy = {
  shipping: [
    {
      id: "standard",
      name: "Standard",
      detail: "Ships in 5–7 working days, then 2–3 days in transit",
      price: 0,
    },
    {
      id: "express",
      name: "Express",
      detail: "Ships in 3–4 working days, next-day courier",
      price: 20,
    },
    {
      id: "pickup",
      name: "Collect in store",
      detail: "We fit them for you on collection",
      price: 0,
    },
  ],
  rxOptions: [
    {
      id: "later",
      label: "Email it to us later",
      hint: "We'll hold your order for 14 days and remind you.",
    },
    {
      id: "enter",
      label: "Type it in now",
      hint: "Copy the numbers from your prescription card.",
    },
    {
      id: "exam",
      label: "Use my Lumen eye exam",
      hint: "We'll match it by your email address.",
    },
  ],
};

export const footer = {
  newsletter:
    "New frames, store openings and the occasional lens explainer. About once a month.",
};
