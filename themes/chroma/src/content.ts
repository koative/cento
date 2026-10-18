import honeyMelt from "./assets/look-honey-melt.jpg";
import glassBlonde from "./assets/look-glass-blonde.jpg";
import softBrunette from "./assets/look-soft-brunette.jpg";
import cloudCoils from "./assets/look-cloud-coils.jpg";
import lilacWash from "./assets/look-lilac-wash.jpg";
import pinnedBraid from "./assets/look-pinned-braid.jpg";
import longSpirals from "./assets/look-long-spirals.jpg";
import sunBob from "./assets/look-sun-bob.jpg";
import saltCopper from "./assets/look-salt-copper.jpg";
import salonFloor from "./assets/salon-floor.jpg";
import salonBlowdry from "./assets/salon-blowdry.jpg";
import salonBasin from "./assets/salon-basin.jpg";
import salonBlowout from "./assets/salon-blowout.jpg";
import salonTeam from "./assets/salon-team.jpg";
import salonCutting from "./assets/salon-cutting.jpg";
import salonColourBowl from "./assets/salon-colour-bowl.jpg";
import margaux from "./assets/stylist-margaux.jpg";
import theo from "./assets/stylist-theo.jpg";
import ines from "./assets/stylist-ines.jpg";
import june from "./assets/stylist-june.jpg";
import rosa from "./assets/stylist-rosa.jpg";
import noor from "./assets/stylist-noor.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Chroma",
  sector: "Hair salon",
  tagline: "Colour that grows out as well as it goes on.",
  email: "hello@chroma.example",
  phone: "+1 555 0148 220",
  phoneHref: "tel:+15550148220",
  address: ["212 Linden Avenue", "Eastbank, OR 97214"],
  instagram: "https://www.instagram.com/",
  pinterest: "https://www.pinterest.com/",
  tiktok: "https://www.tiktok.com/",
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/stylists", label: "Stylists" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
];

/** Sunday-first. [open, close] in 24h time, or null when closed. */
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
  ["10:00", "16:00"],
  null,
  ["09:00", "19:00"],
  ["09:00", "20:00"],
  ["09:00", "20:00"],
  ["09:00", "19:00"],
  ["08:30", "17:00"],
];

/* ------------------------------------------------------------ services */

export type Level = "stylist" | "senior" | "director";
export const levels: Record<Level, { label: string; note: string }> = {
  stylist: {
    label: "Stylist",
    note: "Two to five years behind the chair, trained in-house.",
  },
  senior: {
    label: "Senior",
    note: "Six years or more, and a specialism they teach to the team.",
  },
  director: {
    label: "Director",
    note: "Our creative leads. Longer consults, the trickiest briefs.",
  },
};
export const levelOrder: Level[] = ["stylist", "senior", "director"];

export type CategoryId = "cut" | "colour" | "care" | "occasion";
/** `book` is the order steps happen in during one visit: colour first, styling last. */
export const categories: {
  id: CategoryId;
  name: string;
  intro: string;
  book: number;
  photo: Photo;
}[] = [
  {
    id: "cut",
    name: "Cut & finish",
    intro:
      "Every cut starts dry, so we see how your hair actually falls, and ends with a finish you can repeat at home.",
    book: 3,
    photo: {
      src: salonCutting,
      alt: "A stylist's hands point-cutting the ends of a blonde section with scissors",
      w: 1000,
      h: 1500,
    },
  },
  {
    id: "colour",
    name: "Colour",
    intro:
      "Hand-mixed at the bar for every client, ammonia-free where the lift allows, always finished with a gloss.",
    book: 1,
    photo: {
      src: salonColourBowl,
      alt: "A colourist holding a tint bowl while working colour through wet, shoulder-length hair",
      w: 1000,
      h: 1500,
    },
  },
  {
    id: "care",
    name: "Treatments",
    intro:
      "Added to any service at the basin. Nothing is pushed; your stylist will suggest one only if your hair asks for it.",
    book: 2,
    photo: {
      src: salonBasin,
      alt: "A stylist rinsing a client's hair at a backwash basin in a bright white salon",
      w: 1001,
      h: 1500,
    },
  },
  {
    id: "occasion",
    name: "Occasion",
    intro:
      "Weddings, galas, photographs that will outlive the haircut. Booked with a trial so the day itself is calm.",
    book: 4,
    photo: {
      src: salonBlowout,
      alt: "A stylist smoothing a section with a round brush and dryer during a blow-dry",
      w: 1500,
      h: 1001,
    },
  },
];

export type Step = { label: string; min: number; kind: "chair" | "wait" };
export type Service = {
  id: string;
  name: string;
  category: CategoryId;
  blurb: string;
  steps: Step[];
  price: Record<Level, number>;
  /** New colour clients need a skin test 48 hours before. */
  patchTest?: boolean;
};

const flat = (n: number): Record<Level, number> => ({
  stylist: n,
  senior: n,
  director: n,
});

export const services: Service[] = [
  {
    id: "signature-cut",
    name: "Signature cut & blow-dry",
    category: "cut",
    blurb:
      "Dry cut for shape, wash, refine, and a blow-dry with a short lesson in doing it yourself.",
    steps: [
      { label: "Dry cut & shape", min: 35, kind: "chair" },
      { label: "Wash & refine", min: 15, kind: "chair" },
      { label: "Blow-dry lesson", min: 25, kind: "chair" },
    ],
    price: { stylist: 78, senior: 96, director: 125 },
  },
  {
    id: "short-cut",
    name: "Short & precise",
    category: "cut",
    blurb:
      "Pixies, crops, blunt bobs and their six-week refresh. Clippers and scissors, finished rough-dried or polished.",
    steps: [
      { label: "Cut", min: 30, kind: "chair" },
      { label: "Detail & finish", min: 15, kind: "chair" },
    ],
    price: { stylist: 58, senior: 72, director: 95 },
  },
  {
    id: "curl-cut",
    name: "Curl-by-curl cut",
    category: "cut",
    blurb:
      "Cut dry, one curl at a time, then washed and diffused so you leave knowing your own pattern.",
    steps: [
      { label: "Curl mapping", min: 10, kind: "chair" },
      { label: "Dry cut", min: 40, kind: "chair" },
      { label: "Cleanse & define", min: 15, kind: "chair" },
      { label: "Diffuse", min: 25, kind: "chair" },
    ],
    price: { stylist: 95, senior: 115, director: 140 },
  },
  {
    id: "fringe",
    name: "Fringe tidy",
    category: "cut",
    blurb:
      "Between cuts, any stylist, no wash. Free if your last cut with us was within eight weeks.",
    steps: [{ label: "Fringe trim", min: 15, kind: "chair" }],
    price: flat(18),
  },
  {
    id: "blow-dry",
    name: "Blow-dry & style",
    category: "cut",
    blurb:
      "Wash and a smooth, bouncy or undone finish. Add irons for waves or glass-straight lengths.",
    steps: [
      { label: "Wash", min: 10, kind: "chair" },
      { label: "Blow-dry & style", min: 35, kind: "chair" },
    ],
    price: { stylist: 52, senior: 60, director: 75 },
  },
  {
    id: "consultation",
    name: "Colour consultation",
    category: "colour",
    blurb:
      "Twenty minutes at the colour bar with swatches, a strand test if needed, and a written quote. Free.",
    steps: [{ label: "Consultation", min: 20, kind: "chair" }],
    price: flat(0),
  },
  {
    id: "root-touch-up",
    name: "Root touch-up",
    category: "colour",
    blurb:
      "Regrowth matched to your existing shade, up to three centimetres, with a gloss through the lengths.",
    steps: [
      { label: "Root application", min: 25, kind: "chair" },
      { label: "Colour develops", min: 35, kind: "wait" },
      { label: "Rinse & gloss", min: 15, kind: "chair" },
    ],
    price: { stylist: 92, senior: 105, director: 130 },
    patchTest: true,
  },
  {
    id: "all-over",
    name: "All-over colour",
    category: "colour",
    blurb:
      "One rich shade from root to tip, or a tone change on hair that has never been lightened.",
    steps: [
      { label: "Application", min: 40, kind: "chair" },
      { label: "Colour develops", min: 35, kind: "wait" },
      { label: "Rinse & gloss", min: 20, kind: "chair" },
    ],
    price: { stylist: 120, senior: 138, director: 165 },
    patchTest: true,
  },
  {
    id: "balayage",
    name: "Hand-painted balayage",
    category: "colour",
    blurb:
      "Lightener painted freehand where the sun would put it. Soft at the root, so regrowth is a non-event.",
    steps: [
      { label: "Hand-painting", min: 70, kind: "chair" },
      { label: "Lightener lifts", min: 40, kind: "wait" },
      { label: "Rinse & tone", min: 20, kind: "chair" },
      { label: "Toner develops", min: 15, kind: "wait" },
    ],
    price: { stylist: 220, senior: 260, director: 320 },
    patchTest: true,
  },
  {
    id: "gloss",
    name: "Gloss & tone",
    category: "colour",
    blurb:
      "A demi-permanent veil that corrects brass, adds shine and lasts six to eight weeks.",
    steps: [
      { label: "Gloss application", min: 15, kind: "chair" },
      { label: "Gloss develops", min: 20, kind: "wait" },
    ],
    price: { stylist: 65, senior: 75, director: 90 },
    patchTest: true,
  },
  {
    id: "vivid",
    name: "Vivid colour",
    category: "colour",
    blurb:
      "Lilac, copper, rose, blue. Pre-lightened where needed and sealed with an acid rinse so it lasts.",
    steps: [
      { label: "Pre-lighten", min: 50, kind: "chair" },
      { label: "Lightener lifts", min: 45, kind: "wait" },
      { label: "Vivid application", min: 35, kind: "chair" },
      { label: "Vivid develops", min: 30, kind: "wait" },
      { label: "Cool rinse & seal", min: 15, kind: "chair" },
    ],
    price: { stylist: 280, senior: 320, director: 380 },
    patchTest: true,
  },
  {
    id: "bond-repair",
    name: "Bond-repair treatment",
    category: "care",
    blurb:
      "Rebuilds the broken links lightener leaves behind. Worth it with any balayage or vivid.",
    steps: [
      { label: "Bond treatment", min: 10, kind: "chair" },
      { label: "Treatment absorbs", min: 15, kind: "wait" },
    ],
    price: flat(45),
  },
  {
    id: "scalp-ritual",
    name: "Scalp ritual",
    category: "care",
    blurb:
      "Exfoliating scrub, a long massage at the basin and a cool rinse. The part clients rebook for.",
    steps: [{ label: "Scalp massage & rinse", min: 25, kind: "chair" }],
    price: flat(40),
  },
  {
    id: "curl-mask",
    name: "Curl hydration mask",
    category: "care",
    blurb:
      "A heavy mask under a warm steamer for coils and curls that drink everything.",
    steps: [
      { label: "Mask application", min: 10, kind: "chair" },
      { label: "Steam", min: 20, kind: "wait" },
    ],
    price: flat(38),
  },
  {
    id: "event-style",
    name: "Event updo",
    category: "occasion",
    blurb:
      "Pinned, braided or sculpted, built to last through dinner and dancing.",
    steps: [
      { label: "Prep & set", min: 20, kind: "chair" },
      { label: "Pin & finish", min: 40, kind: "chair" },
    ],
    price: { stylist: 85, senior: 100, director: 125 },
  },
  {
    id: "bridal-trial",
    name: "Bridal trial",
    category: "occasion",
    blurb:
      "Bring the dress photo and the veil. We try two directions, photograph both, and write the plan down.",
    steps: [
      { label: "Brief & references", min: 15, kind: "chair" },
      { label: "First direction", min: 35, kind: "chair" },
      { label: "Second direction", min: 35, kind: "chair" },
    ],
    price: { stylist: 150, senior: 175, director: 210 },
  },
];

/** The colourist's level chart, 1 (darkest) to 10 (lightest). */
export const shadeLevels = [
  {
    level: 1,
    name: "Black",
    hex: "#16100e",
    note: "Blue-black. Rare naturally; usually a box dye we'll lift slowly.",
  },
  {
    level: 2,
    name: "Darkest brown",
    hex: "#241713",
    note: "Lifts warm and fast. Gloss is often all it needs.",
  },
  {
    level: 3,
    name: "Dark brown",
    hex: "#35231b",
    note: "Rich chocolate. Balayage here lands at caramel, not blonde, in one visit.",
  },
  {
    level: 4,
    name: "Medium brown",
    hex: "#4b3123",
    note: "Where espresso and mocha glosses live.",
  },
  {
    level: 5,
    name: "Light brown",
    hex: "#654430",
    note: "The most common natural level we see. Copper loves it.",
  },
  {
    level: 6,
    name: "Dark blonde",
    hex: "#835c3d",
    note: "Most people who call themselves brunette are a 6. A perfect base for balayage.",
  },
  {
    level: 7,
    name: "Medium blonde",
    hex: "#a07852",
    note: "Mousy at the root, golden in summer. Lifts to 9 in one session.",
  },
  {
    level: 8,
    name: "Light blonde",
    hex: "#bf9a6a",
    note: "Honey and butter. Toners make or break it.",
  },
  {
    level: 9,
    name: "Very light blonde",
    hex: "#d9bf8f",
    note: "Where most balayage ends. Needs a weekly violet rinse.",
  },
  {
    level: 10,
    name: "Lightest blonde",
    hex: "#ecdfba",
    note: "Platinum's doorstep, and the base for every pastel vivid.",
  },
];

export const serviceNotes = [
  "Prices include a wash, a consultation and a finish. Long or very thick hair may add up to $30 to colour; we'll tell you before we start.",
  "Colour services need a skin patch test 48 hours ahead if you're new to colour with us. It takes five minutes and is free.",
  "Booking with a specific stylist sets the price by their level. “Any stylist” books the first free chair at Stylist prices.",
];

/* ------------------------------------------------------------ stylists */

export type Focus = "Colour" | "Cut" | "Curls" | "Occasion";
export type Stylist = {
  id: string;
  name: string;
  level: Level;
  role: string;
  focus: Focus[];
  photo: Photo;
  short: string;
  bio: string[];
  quote: string;
  /** Sunday-first day indexes they're at the salon. */
  days: number[];
  since: number;
  handle: string;
  signature: string[];
  favourite: string;
};

export const stylists: Stylist[] = [
  {
    id: "margaux-bell",
    name: "Margaux Bell",
    level: "director",
    role: "Founder & colourist",
    focus: ["Colour"],
    photo: {
      src: margaux,
      alt: "Margaux, with long copper-red hair, looking over her shoulder against a pale wall",
      w: 666,
      h: 1000,
    },
    short: "Copper, red and every warm shade that fades badly anywhere else.",
    bio: [
      "Margaux opened Chroma in 2014 after nine years mixing colour in other people's salons and noticing that most clients came back for the same thing: a shade that looked right for three weeks and wrong for five.",
      "She builds formulas for the grow-out, not the photo. Expect a long consultation, a strand test on anything ambitious, and a written formula card you keep.",
    ],
    quote:
      "Red is the hardest colour to keep and the easiest to fall for. My job is the keeping.",
    days: [2, 3, 4, 6],
    since: 2014,
    handle: "margaux.mixes",
    signature: ["balayage", "all-over", "gloss"],
    favourite: "copper-gloss-drops",
  },
  {
    id: "theo-adeyemi",
    name: "Theo Adeyemi",
    level: "director",
    role: "Cutting & education lead",
    focus: ["Cut"],
    photo: {
      src: theo,
      alt: "Theo, smiling broadly in a black hat and hoodie against a dark background",
      w: 1000,
      h: 1000,
    },
    short:
      "Precision bobs, crops and the shape that makes a cut look expensive at week eight.",
    bio: [
      "Theo trained in a barbershop before he ever held a round brush, which is why his short cuts sit so cleanly at the nape. He leads Chroma's cutting education every Monday.",
      "He cuts dry first, always, and will talk you out of a fringe if your cowlick disagrees.",
    ],
    quote:
      "A good haircut is mostly the part you can't see: the weight you take out underneath.",
    days: [0, 3, 4, 5],
    since: 2016,
    handle: "theocuts",
    signature: ["short-cut", "signature-cut"],
    favourite: "matte-shaping-paste",
  },
  {
    id: "ines-calloway",
    name: "Inès Calloway",
    level: "senior",
    role: "Curl & texture specialist",
    focus: ["Curls", "Cut"],
    photo: {
      src: ines,
      alt: "Inès, with a close-cropped natural cut, holding the collar of a patterned blouse",
      w: 666,
      h: 1000,
    },
    short: "Coils, curls and waves, cut dry and shown how to behave at home.",
    bio: [
      "Inès holds every curl cut certification we could find and has since unlearned half of them. She reads curl pattern by section, not by head, because most heads hold three.",
      "Her appointments end with a diffusing lesson in your own hands, using what you already own where possible.",
    ],
    quote:
      "Your curls aren't frizzy. They're thirsty, and usually cut for straight hair.",
    days: [2, 3, 5, 6],
    since: 2019,
    handle: "ines.curlmap",
    signature: ["curl-cut", "curl-mask"],
    favourite: "coil-cream",
  },
  {
    id: "june-park",
    name: "June Park",
    level: "senior",
    role: "Vivid colourist",
    focus: ["Colour"],
    photo: {
      src: june,
      alt: "June, with sleek dark hair, in violet studio light",
      w: 800,
      h: 1000,
    },
    short: "Lilac, rose, steel blue. Pre-lightening gentle enough to do twice.",
    bio: [
      "June came to colour from a fine-art degree, and it shows: she mixes vivids by eye from four bases and keeps a notebook of every formula she has ever used.",
      "She is strict about bond repair and honest about fade. A pastel lasts four washes cold; she'll give you the rinse to stretch it to twelve.",
    ],
    quote:
      "If you want a colour that doesn't exist in nature, I'd like it to at least behave naturally.",
    days: [3, 4, 5, 6],
    since: 2018,
    handle: "june.in.colour",
    signature: ["vivid", "bond-repair"],
    favourite: "violet-rinse",
  },
  {
    id: "rosa-lindqvist",
    name: "Rosa Lindqvist",
    level: "senior",
    role: "Bridal & occasion stylist",
    focus: ["Occasion"],
    photo: {
      src: rosa,
      alt: "Rosa, with long brown hair and a striped shirt, at golden hour",
      w: 667,
      h: 1000,
    },
    short: "Updos that survive a dance floor and look soft in photographs.",
    bio: [
      "Rosa has pinned hair for more than three hundred weddings and still runs every trial as if it were the first. She works from the dress outward.",
      "On the day she travels with a kit that has needed a single bobby pin replaced in six years.",
    ],
    quote:
      "The best wedding hair is the one nobody comments on until the photographs come back.",
    days: [0, 4, 5, 6],
    since: 2017,
    handle: "rosa.pins",
    signature: ["bridal-trial", "event-style", "blow-dry"],
    favourite: "soft-hold-spray",
  },
  {
    id: "noor-haddad",
    name: "Noor Haddad",
    level: "stylist",
    role: "All-rounder",
    focus: ["Cut", "Colour"],
    photo: {
      src: noor,
      alt: "Noor, with a short curly crop, in a black-and-white portrait",
      w: 1000,
      h: 780,
    },
    short:
      "Clean everyday cuts and glosses, with the easiest Saturday availability.",
    bio: [
      "Noor finished Chroma's two-year assistant programme in 2022 and now has the fastest-growing column in the book. She cuts and colours equally and loves a dramatic chop.",
      "If you're new to the salon and not sure who to book, Noor is a very good place to start.",
    ],
    quote: "Bring the photo, even if you think it's silly. Especially then.",
    days: [0, 2, 3, 6],
    since: 2022,
    handle: "noor.at.chroma",
    signature: ["signature-cut", "root-touch-up", "gloss"],
    favourite: "weightless-conditioner",
  },
];

/* ------------------------------------------------------------ lookbook */

export type Look = {
  id: string;
  name: string;
  category: Focus;
  photo: Photo;
  stylist: string;
  services: string[];
  formula: { label: string; value: string }[];
  upkeep: string;
  story: string;
};

export const looks: Look[] = [
  {
    id: "honey-melt",
    name: "Honey melt",
    category: "Colour",
    photo: {
      src: honeyMelt,
      alt: "Long honey-blonde waves with darker roots, swept to one side, against a charcoal backdrop",
      w: 1200,
      h: 1800,
    },
    stylist: "margaux-bell",
    services: ["balayage", "bond-repair", "signature-cut"],
    formula: [
      { label: "Natural base", value: "Level 6, neutral" },
      {
        label: "Lightener",
        value: "Hand-painted to level 9, 20 vol, open air",
      },
      { label: "Toner", value: "9.3 golden + 9.13 beige, equal parts" },
      { label: "Root", value: "Left untouched, smudged at the hairline" },
    ],
    upkeep: "Gloss at ten weeks, re-paint at five months.",
    story:
      "Clara wanted to be blonde without the line. We painted heavier around the face and left the crown almost alone, so it grows out like it was always there.",
  },
  {
    id: "glass-blonde",
    name: "Glass blonde",
    category: "Colour",
    photo: {
      src: glassBlonde,
      alt: "Back view of long, cool beige-blonde hair with soft waves in a white salon",
      w: 1000,
      h: 1500,
    },
    stylist: "margaux-bell",
    services: ["balayage", "gloss"],
    formula: [
      { label: "Natural base", value: "Level 7, ash" },
      { label: "Lightener", value: "Fine babylights to level 10" },
      { label: "Toner", value: "10.21 pearl, then a clear gloss" },
      { label: "Finish", value: "Loose irons, brushed through" },
    ],
    upkeep: "Violet rinse weekly. Gloss every eight weeks.",
    story:
      "Very fine lights, very many of them, toned cool and glossed clear so the lengths read as one reflective sheet.",
  },
  {
    id: "soft-brunette",
    name: "Soft brunette",
    category: "Colour",
    photo: {
      src: softBrunette,
      alt: "A woman with hands in long brown waves, lighter caramel at the ends, against a pink wall",
      w: 1500,
      h: 1001,
    },
    stylist: "noor-haddad",
    services: ["gloss", "signature-cut"],
    formula: [
      { label: "Natural base", value: "Level 5, warm" },
      { label: "Gloss", value: "6.34 copper-gold, 15 minutes" },
      { label: "Cut", value: "Long layers from the collarbone" },
    ],
    upkeep: "Gloss every eight weeks. No root work, ever.",
    story:
      "No lightener at all. A warm gloss pulls out the caramel already in her hair, and long layers let it move.",
  },
  {
    id: "cloud-coils",
    name: "Cloud coils",
    category: "Curls",
    photo: {
      src: cloudCoils,
      alt: "Full, rounded natural coils framing a young woman's face against a dusty pink backdrop",
      w: 1500,
      h: 1500,
    },
    stylist: "ines-calloway",
    services: ["curl-cut", "curl-mask"],
    formula: [
      { label: "Pattern", value: "4a at the crown, 3c at the nape" },
      { label: "Cut", value: "Dry, rounded, shaped wider at the temples" },
      { label: "Define", value: "Coil cream, then gel, diffused upside down" },
    ],
    upkeep: "Shape every twelve weeks. Mask fortnightly at home.",
    story:
      "Cut into a round so the shape holds from every side, and a mask under the steamer first, so the coils clumped instead of fluffing apart.",
  },
  {
    id: "lilac-wash",
    name: "Lilac wash",
    category: "Colour",
    photo: {
      src: lilacWash,
      alt: "Very long lavender hair in loose waves over a black top",
      w: 1000,
      h: 1500,
    },
    stylist: "june-park",
    services: ["vivid", "bond-repair"],
    formula: [
      {
        label: "Pre-lighten",
        value: "From level 7 to 10, two passes, bond builder",
      },
      { label: "Vivid", value: "Lilac 3 : clear 7, painted in sections" },
      { label: "Seal", value: "Cold acid rinse" },
    ],
    upkeep: "Cold rinses and violet rinse. Refresh at six weeks.",
    story:
      "Diluted far down so it fades through silver instead of turning green. Two passes of lightener with bond repair in both.",
  },
  {
    id: "pinned-braid",
    name: "Pinned braid",
    category: "Occasion",
    photo: {
      src: pinnedBraid,
      alt: "Back of a low braided chignon fastened with a red tasseled hair ornament",
      w: 1000,
      h: 1500,
    },
    stylist: "rosa-lindqvist",
    services: ["event-style"],
    formula: [
      { label: "Prep", value: "Texture spray, hot rollers at the crown" },
      { label: "Build", value: "Two Dutch braids wrapped into a low knot" },
      { label: "Finish", value: "Client's own ornament, pinned from beneath" },
    ],
    upkeep: "Built for one long day. Take out pins from the bottom up.",
    story:
      "A low knot that sits above a high collar. Rosa built it around the ornament, not the other way round.",
  },
  {
    id: "long-spirals",
    name: "Long spirals",
    category: "Curls",
    photo: {
      src: longSpirals,
      alt: "A woman with long blonde spiral curls touching her hair, against a pale pink wall",
      w: 1500,
      h: 1000,
    },
    stylist: "ines-calloway",
    services: ["curl-cut", "gloss"],
    formula: [
      { label: "Pattern", value: "2c to 3a" },
      {
        label: "Cut",
        value: "Long, with face-framing curls cut to the cheekbone",
      },
      { label: "Gloss", value: "9.03 natural gold" },
    ],
    upkeep: "Shape every ten weeks. Gloss every two cuts.",
    story:
      "Length kept, weight taken out from the inside, and a single warm gloss so the spirals catch light.",
  },
  {
    id: "sun-bob",
    name: "Sun bob",
    category: "Cut",
    photo: {
      src: sunBob,
      alt: "A laughing woman with a tousled blonde chin-length bob in soft sunlight",
      w: 1001,
      h: 1500,
    },
    stylist: "theo-adeyemi",
    services: ["short-cut", "gloss"],
    formula: [
      { label: "Cut", value: "Chin length, point-cut, internal layers" },
      { label: "Gloss", value: "10.3 soft gold" },
      { label: "Finish", value: "Sea salt, rough dried with fingers" },
    ],
    upkeep: "Refresh every six weeks.",
    story:
      "Twenty centimetres off. Point-cut so it never looks blunt, with weight removed underneath so it swings.",
  },
  {
    id: "salt-copper",
    name: "Salt copper",
    category: "Colour",
    photo: {
      src: saltCopper,
      alt: "Long strawberry-copper hair lifted by sea wind against a blue ocean",
      w: 1125,
      h: 1500,
    },
    stylist: "margaux-bell",
    services: ["all-over", "signature-cut"],
    formula: [
      { label: "Natural base", value: "Level 7, golden" },
      { label: "All-over", value: "7.43 copper-gold, 35 minutes" },
      { label: "Ends", value: "8.4 pulled through for the last 10 minutes" },
    ],
    upkeep: "Copper gloss drops in conditioner. Refresh at seven weeks.",
    story:
      "Lighter at the ends than the root, the way red fades in the sun anyway. It looks lived-in on day one.",
  },
];

/* ------------------------------------------------------------ products */

export type Need = "Colour care" | "Curls" | "Repair" | "Styling";
export type Product = {
  id: string;
  name: string;
  kind: string;
  need: Need;
  size: string;
  price: number;
  shape: "bottle" | "tube" | "jar" | "dropper" | "spray";
  tint: string;
  blurb: string;
  use: string;
};

export const products: Product[] = [
  {
    id: "colour-keep-shampoo",
    name: "Colour Keep",
    kind: "Sulfate-free shampoo",
    need: "Colour care",
    size: "250 ml",
    price: 28,
    shape: "bottle",
    tint: "#9b2f45",
    blurb: "Low-lather, pH 4.5, so cuticles stay closed and colour stays in.",
    use: "Two pumps, lukewarm water, twice a week.",
  },
  {
    id: "weightless-conditioner",
    name: "Weightless",
    kind: "Daily conditioner",
    need: "Colour care",
    size: "250 ml",
    price: 28,
    shape: "bottle",
    tint: "#e9b4a4",
    blurb: "Slip without silicone build-up. The one fine hair forgives.",
    use: "Mid-lengths to ends, comb through, rinse cool.",
  },
  {
    id: "violet-rinse",
    name: "Violet Rinse",
    kind: "Toning mask",
    need: "Colour care",
    size: "200 ml",
    price: 32,
    shape: "tube",
    tint: "#8a6aa8",
    blurb: "Knocks brass out of blonde and silver in three minutes.",
    use: "Once a week instead of conditioner. Three minutes, no longer.",
  },
  {
    id: "copper-gloss-drops",
    name: "Copper Gloss",
    kind: "Colour-depositing drops",
    need: "Colour care",
    size: "30 ml",
    price: 26,
    shape: "dropper",
    tint: "#b0532f",
    blurb: "Six drops in conditioner tops up red between appointments.",
    use: "Mix into conditioner, leave five minutes, gloves on.",
  },
  {
    id: "coil-cream",
    name: "Coil Cream",
    kind: "Curl definer",
    need: "Curls",
    size: "200 ml",
    price: 30,
    shape: "jar",
    tint: "#d9a066",
    blurb: "Shea and flax for clumps that hold without crunch.",
    use: "On soaking-wet hair, rake then praying-hands.",
  },
  {
    id: "rebond-mask",
    name: "Rebond",
    kind: "Bond-repair mask",
    need: "Repair",
    size: "150 ml",
    price: 42,
    shape: "jar",
    tint: "#4a1a27",
    blurb: "The at-home step of the treatment we use at the basin.",
    use: "Weekly, on towel-dried hair, ten minutes before shampoo.",
  },
  {
    id: "soft-hold-spray",
    name: "Soft Hold",
    kind: "Brushable hairspray",
    need: "Styling",
    size: "300 ml",
    price: 27,
    shape: "spray",
    tint: "#c98d8f",
    blurb: "Holds an updo all night and brushes out without flakes.",
    use: "From arm's length, in layers, then brush through.",
  },
  {
    id: "matte-shaping-paste",
    name: "Shaping Paste",
    kind: "Matte texture paste",
    need: "Styling",
    size: "75 ml",
    price: 24,
    shape: "jar",
    tint: "#7a6152",
    blurb: "Pea-size for crops and bobs. Separation without shine.",
    use: "Warm between palms, work in from the back on dry hair.",
  },
];

export const productNotes = {
  intro:
    "Eight things we use at the chair and sell at the desk, made for us by a small lab in Eugene. Set aside what you'd like and it's bagged at reception when you visit.",
  pickup:
    "No shipping, no payment online. Set-aside products wait at the desk for 14 days.",
};

/* ------------------------------------------------------------ pages */

export const pageCopy = {
  services: {
    title: "Services & prices",
    lede: "Every price includes a consultation, a wash and a finish. Every service is a list of timed steps, so you know how long you'll be with us before you book.",
  },
  lookbook: {
    title: "Lookbook",
    lede: "Recent work from the floor, each with its formula written down the way it is on the client's card. Any look can be booked exactly as it was done.",
  },
  stylists: {
    title: "The stylists",
    lede: "Six people, three levels, one shared formula book. Book by what you want done; the level only changes the price and the length of the consultation.",
  },
  products: { title: "Products" },
  book: {
    title: "Book an appointment",
    lede: "Choose what you'd like done, who you'd like to see and when. Your chair-time plan updates minute by minute as you choose.",
  },
  notFound: {
    title: "That page has grown out.",
    body: "The link is old or the page never existed. The menu, the lookbook and an open chair are all still here.",
  },
};

export const home = {
  title: "Colour that grows out as well as it goes on.",
  lede: "A colour-led salon on Linden Avenue. Hand-painted balayage, dry cuts, curls cut one at a time, and a chair-time plan before you book, so you know exactly how long you'll be with us.",
  fromPrices: [
    { label: "Cuts", service: "short-cut" },
    { label: "Gloss", service: "gloss" },
    { label: "Balayage", service: "balayage" },
  ],
  menuTitle: "The menu, in short",
  menuLede:
    "Four kinds of appointment, priced by your stylist's level. The full list carries every step and every minute.",
  lookTitle: "Recent chairs",
  levelsTitle: "We speak in levels",
  levelsBody:
    "Colourists measure hair from 1, blue-black, to 10, the palest blonde. Most people sit between 5 and 7. Every formula card we write starts with your number and says how far we are lifting, and why one session or three.",
  planTitle: "Know your chair time before you sit down",
  planBody:
    "Every service is built from timed steps. Pick yours and the planner lays out the appointment minute by minute: when you're in the chair, when colour is developing and you can step out for a coffee, and when you'll be done.",
  planExample: ["consultation", "balayage", "bond-repair", "signature-cut"],
  planCaption:
    "Consultation, balayage, bond repair and a cut with a Senior stylist, starting at 10:00 am",
  shelfTitle: "On the shelf",
  shelfBody:
    "Our own small range, used at every station. Set it aside online and pick it up with your appointment.",
  quote: {
    text: "I have tried to grow out a balayage four times in four salons. This is the first one I forgot I had until month five.",
    by: "Clara M., client since 2021",
  },
  closeTitle: "Your chair is waiting.",
  closeBody:
    "Book online in two minutes. New to colour with us? Pop in any day for a free five-minute patch test first.",
};

export const about = {
  title: "A salon built around the grow-out",
  lede: "Chroma opened in 2014 in a former print shop on Linden Avenue, with three chairs, one basin and a very specific complaint about how colour is usually done.",
  story: [
    "Margaux Bell had spent nine years in busy salons watching clients leave happy and come back six weeks later embarrassed. The colour hadn't failed; it had simply grown out, and nobody had planned for that.",
    "So Chroma plans for it. Every colour client leaves with a formula card: their natural level, what we lifted to, what we toned with, and when the next appointment actually needs to happen. Most of our balayage clients come in twice a year.",
    "We're eleven people now: six stylists, three assistants in training, and two at the desk. Still one basin too few on a Saturday.",
  ],
  values: [
    {
      title: "Honest timings",
      body: "Every appointment is planned to the minute before you book. If something runs long, the next client is told before they leave home.",
    },
    {
      title: "Less waste at the bar",
      body: "Colour is weighed per client on a scale, not squeezed by eye. Foils and tubes go to a metal recycler; leftover tint is neutralised, not poured away.",
    },
    {
      title: "Training on Mondays",
      body: "The salon is closed to clients every Monday. The team cuts and colours on models, and assistants are paid for every hour of it.",
    },
    {
      title: "Every head of hair",
      body: "Coils, curls, waves, straight, grey, fine, very thick. Each stylist trains across textures, and Inès leads curls for the whole team.",
    },
  ],
  careers: {
    title: "Work with us",
    body: "We take two paid assistants a year into a two-year programme, and occasionally a qualified stylist who wants to specialise. Send a few photos of your work and a line about why.",
  },
  team: {
    src: salonTeam,
    alt: "Three Chroma stylists laughing together, holding scissors, a comb and a round brush",
    w: 1500,
    h: 1001,
  } as Photo,
  floor: {
    src: salonBlowdry,
    alt: "A stylist blow-drying a client's short hair at a bright station by tall windows",
    w: 1800,
    h: 1202,
  } as Photo,
};

export const visit = {
  title: "Find the chair",
  lede: "Two minutes from the Linden & 9th streetcar stop, in the pink-fronted building with the old print-shop sign.",
  photo: {
    src: salonFloor,
    alt: "The salon floor: three rose-pink chairs facing a long white mirror and counter",
    w: 1800,
    h: 1200,
  } as Photo,
  getting: [
    {
      title: "By streetcar",
      body: "Line B to Linden & 9th, then half a block south. Step-free from the stop to our door.",
    },
    {
      title: "By bike",
      body: "Two covered racks out front. Bring your helmet in; there's a hook by the desk.",
    },
    {
      title: "By car",
      body: "Metered parking on Linden, free after 7 pm. The Ash Street garage is three minutes' walk.",
    },
  ],
  access:
    "The salon is on one level with a step-free entrance, a wide accessible restroom and a basin that tilts for wheelchair users. Tell us when you book and we'll keep the front station free.",
  policies: [
    {
      title: "Cancelling",
      body: "Free up to 24 hours before. Inside 24 hours we charge 50% of the booked services; no-shows are charged in full. Life happens: call us and we'll be reasonable.",
    },
    {
      title: "Deposits",
      body: "Appointments over three hours hold a $50 deposit, taken in salon at your consultation and deducted from the bill.",
    },
    {
      title: "Patch tests",
      body: "Required 48 hours before your first colour with us, or if it has been more than six months. Walk in any open hour; it takes five minutes.",
    },
    {
      title: "Running late",
      body: "We'll always try to fit you in. Past 15 minutes we may need to shorten the service or move you, and we'll tell you which before we start.",
    },
  ],
};

export const faq = [
  {
    q: "How do I know which stylist level to book?",
    a: "Book by specialism first. For an everyday cut or gloss, any Stylist is excellent. For colour corrections, vivids or a big change, book a Senior or Director, or book the free colour consultation and we'll decide together.",
  },
  {
    q: "Do I need a consultation before balayage?",
    a: "Not if your hair has never been coloured or you've had balayage before. If there's box dye, henna or old colour in your lengths, book the free consultation first so we can strand-test.",
  },
  {
    q: "Can I bring my child?",
    a: "Children are welcome for their own appointments. For yours, the salon is a busy place with hot tools and chemicals, so please arrange care where you can.",
  },
  {
    q: "What if I don't like it?",
    a: "Tell us within seven days and we'll adjust it free of charge with the same stylist. We'd rather fix it than have you hide it under a hat.",
  },
  {
    q: "Do you cut men's hair?",
    a: "We cut everyone's hair. Short & precise is priced the same whoever is in the chair.",
  },
  {
    q: "Is there anything to do while colour develops?",
    a: "Tea, coffee and a good stack of magazines at the bar. Most clients step out for a walk on Linden; we'll text you five minutes before we need you back.",
  },
];

export const testimonials = [
  {
    text: "Inès is the first person who has ever cut my curls dry. I didn't know they could look like this the next morning.",
    by: "Adaeze O.",
  },
  {
    text: "Theo took twenty centimetres off and I still get stopped about it six weeks later.",
    by: "Priya S.",
  },
  {
    text: "They told me it would take three sessions to go lilac safely, and it did, and my hair is still soft.",
    by: "Hannah K.",
  },
];

export const footer = {
  blurb:
    "A colour-led hair salon on Linden Avenue. Cuts, colour, curls and occasion hair, planned to the minute.",
  newsletterTitle: "The formula card",
  newsletterBody:
    "One email a season: open chairs, new shades, and the odd late-night appointment.",
};
