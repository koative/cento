import commute from "./assets/commute.jpg";
import cabin from "./assets/cabin.jpg";
import office from "./assets/office.jpg";
import cafe from "./assets/cafe.jpg";
import nightTrain from "./assets/night-train.jpg";
import foam from "./assets/foam.jpg";
import listener from "./assets/listener.jpg";
import street from "./assets/street.jpg";
import windowSeat from "./assets/window.jpg";

export const brand = {
  name: "Hush",
  sector: "Noise-cancelling headphones",
  tagline: "Headphones that turn the world down, not your music up.",
  email: "hello@hush.example",
  supportEmail: "support@hush.example",
  phone: "+1 555 0142 870",
  address: ["Hush Acoustics", "1180 Mariner Way, Unit 4", "Oakland, CA 94607"],
  hours: "Support answers Monday to Saturday, 7 am – 7 pm Pacific",
  announcement: "Free shipping and 45-day home trial on every pair",
};

export const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Hush One" },
  { to: "/compare", label: "Compare" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
];

export const images = {
  commute,
  cabin,
  office,
  cafe,
  nightTrain,
  foam,
  listener,
  street,
  windowSeat,
};

/* ---------- Products ---------- */

export type Kind =
  | "over"
  | "fold"
  | "on"
  | "buds"
  | "lite"
  | "sleep"
  | "kids"
  | "cushions"
  | "case";
export type Type = "Over-ear" | "On-ear" | "In-ear" | "Accessory";
export type Use = "Travel" | "Commute" | "Work" | "Sleep" | "Everyday";
export type Colour = { name: string; shell: string; trim: string };

export type Specs = {
  /** Peak active cancellation in dB, measured at 150 Hz. */
  anc: number;
  /** Passive isolation from the cups or tips above 2 kHz, in dB. */
  passive: number;
  battery: string;
  batteryHours: number;
  weight: string;
  mics: string;
  codecs: string;
  multipoint: boolean;
  water: string;
  charging: string;
};

export type Product = {
  id: string;
  name: string;
  kind: Kind;
  type: Type;
  uses: Use[];
  price: number;
  badge?: string;
  line: string;
  summary: string;
  colours: Colour[];
  specs?: Specs;
  highlights: { title: string; text: string }[];
  inBox: string[];
  fits?: string;
};

const graphite: Colour = {
  name: "Graphite",
  shell: "#2b2e31",
  trim: "#55595e",
};
const fog: Colour = { name: "Fog", shell: "#c9ccca", trim: "#9ea3a2" };
const clay: Colour = { name: "Clay", shell: "#a9634a", trim: "#7e4532" };
const moss: Colour = { name: "Moss", shell: "#5d6a52", trim: "#3f4a37" };
const sand: Colour = { name: "Sand", shell: "#d3c4a6", trim: "#ab9a79" };
const harbour: Colour = { name: "Harbour", shell: "#2f3d52", trim: "#4f6079" };
const chalk: Colour = { name: "Chalk", shell: "#e6e3dc", trim: "#bdb8ad" };
const sage: Colour = { name: "Sage", shell: "#9ba78d", trim: "#77836a" };
const dusk: Colour = { name: "Dusk", shell: "#6b6884", trim: "#4c4a63" };
const tomato: Colour = { name: "Tomato", shell: "#c9573a", trim: "#9d3d24" };
const sky: Colour = { name: "Sky", shell: "#8fb2c6", trim: "#6a8ea3" };

export const products: Product[] = [
  {
    id: "hush-one",
    name: "Hush One",
    kind: "over",
    type: "Over-ear",
    uses: ["Travel", "Commute", "Work"],
    price: 379,
    badge: "Flagship",
    line: "Our quietest over-ear. Eight microphones, forty hours, parts you can replace.",
    summary:
      "Hush One listens to the room 50,000 times a second and answers with the exact opposite. The result is a deep, even quiet that takes the rumble out of a cabin and the hum out of an office without the pressure some cancelling headphones leave in your ears. Memory-foam cushions clip off by hand, the battery unscrews, and every part is sold separately for ten years.",
    colours: [graphite, fog, clay, moss],
    specs: {
      anc: 42,
      passive: 24,
      battery: "40 h with cancelling on",
      batteryHours: 40,
      weight: "254 g",
      mics: "8 (6 for cancelling, 2 beamforming for calls)",
      codecs: "AAC, aptX Adaptive, LC3",
      multipoint: true,
      water: "Not rated",
      charging: "10 min → 6 h, USB-C",
    },
    highlights: [
      {
        title: "Adaptive quiet",
        text: "Cancellation re-tunes to the seal around your ears every time you put them on, glasses included.",
      },
      {
        title: "Calls without the café",
        text: "Two beamforming microphones lock onto your voice and drop the clatter behind you.",
      },
      {
        title: "Made to be opened",
        text: "Cushions, headband pad and battery replace in minutes with a coin. No glue anywhere.",
      },
    ],
    inBox: [
      "Hush One headphones",
      "Felt travel case",
      "USB-C cable, 1.2 m",
      "3.5 mm audio cable",
      "Flight adapter",
    ],
  },
  {
    id: "hush-fold",
    name: "Hush Fold",
    kind: "fold",
    type: "Over-ear",
    uses: ["Travel", "Commute"],
    price: 249,
    line: "Folds flat into a coat pocket. Still cancels like a full-size pair.",
    summary:
      "We took the cancelling engine from Hush One, gave it six microphones instead of eight and built it into a frame that folds twice and lies flat. It is the pair we pack for weekend trips, short-haul flights and the walk to the train when a bag is one thing too many.",
    colours: [graphite, sand, harbour],
    specs: {
      anc: 36,
      passive: 20,
      battery: "32 h with cancelling on",
      batteryHours: 32,
      weight: "212 g",
      mics: "6 (4 for cancelling, 2 for calls)",
      codecs: "AAC, SBC, LC3",
      multipoint: true,
      water: "Not rated",
      charging: "10 min → 4 h, USB-C",
    },
    highlights: [
      {
        title: "Twice folded",
        text: "Steel hinges fold the cups in and the band down to 16 by 9 centimetres.",
      },
      {
        title: "Auto pause",
        text: "Lift a cup off one ear and the music pauses; lower it and it carries on.",
      },
      {
        title: "Shared engine",
        text: "Same cancelling chip and tuning as Hush One, with a slightly lighter low end.",
      },
    ],
    inBox: [
      "Hush Fold headphones",
      "Slim zip case",
      "USB-C cable, 1.2 m",
      "3.5 mm audio cable",
    ],
  },
  {
    id: "hush-buds-pro",
    name: "Hush Buds Pro",
    kind: "buds",
    type: "In-ear",
    uses: ["Commute", "Everyday", "Work"],
    price: 229,
    badge: "New",
    line: "The quiet of an over-ear, in a case that fits a coin pocket.",
    summary:
      "Three microphones per bud and memory-foam tips that seal like an earplug give Buds Pro the deepest cancellation we have managed in-ear. Pressure relief vents keep long wear comfortable, and a quick squeeze of either stem switches between quiet and aware.",
    colours: [graphite, fog, clay],
    specs: {
      anc: 38,
      passive: 22,
      battery: "8 h per charge, 30 h with case",
      batteryHours: 30,
      weight: "5.4 g per bud",
      mics: "6 (3 per bud)",
      codecs: "AAC, aptX Adaptive, LC3",
      multipoint: true,
      water: "IPX4",
      charging: "Wireless or USB-C, 5 min → 1 h",
    },
    highlights: [
      {
        title: "Foam and silicone tips",
        text: "Four sizes of each in the box; the fit test in the app tells you which seals best.",
      },
      {
        title: "Aware in a squeeze",
        text: "Hold either bud to let voices in at natural level, release to go quiet again.",
      },
      {
        title: "Wireless case",
        text: "Charges on any Qi pad and reports its battery level on the front light.",
      },
    ],
    inBox: [
      "Hush Buds Pro and charging case",
      "4 pairs of foam tips",
      "4 pairs of silicone tips",
      "USB-C cable, 0.5 m",
    ],
  },
  {
    id: "hush-buds",
    name: "Hush Buds",
    kind: "lite",
    type: "In-ear",
    uses: ["Everyday", "Commute"],
    price: 129,
    line: "Everyday cancelling, a seven-hour charge and a very honest price.",
    summary:
      "Hush Buds keep the things people actually use every day, cancelling for the commute, clear calls and a case that lasts the week, and drop the rest. Four microphones and silicone tips take the edge off traffic and chatter without isolating you from the street.",
    colours: [graphite, chalk, sage],
    specs: {
      anc: 28,
      passive: 16,
      battery: "7 h per charge, 28 h with case",
      batteryHours: 28,
      weight: "4.9 g per bud",
      mics: "4 (2 per bud)",
      codecs: "AAC, SBC",
      multipoint: false,
      water: "IPX4",
      charging: "USB-C, 10 min → 1.5 h",
    },
    highlights: [
      {
        title: "Street-safe quiet",
        text: "Gentler cancelling tuned to keep sirens and bike bells audible.",
      },
      {
        title: "One-bud mode",
        text: "Use either bud on its own for calls while the other charges.",
      },
      {
        title: "Light as a key",
        text: "The case weighs 38 grams and clips to a key ring with the lanyard loop.",
      },
    ],
    inBox: [
      "Hush Buds and charging case",
      "3 pairs of silicone tips",
      "USB-C cable, 0.5 m",
    ],
  },
  {
    id: "hush-night",
    name: "Hush Night",
    kind: "sleep",
    type: "In-ear",
    uses: ["Sleep", "Travel"],
    price: 169,
    line: "Flush-fitting sleep buds that cancel a snoring partner and a night flight.",
    summary:
      "Hush Night sits entirely inside the ear, so you can sleep on your side. Soft wing tips hold them in place, gentle cancelling takes out low hums, and a library of masking sounds plays from the buds themselves, with no phone needed after you have chosen. A silent alarm wakes only you.",
    colours: [dusk, chalk],
    specs: {
      anc: 24,
      passive: 26,
      battery: "10 h per charge, 40 h with case",
      batteryHours: 40,
      weight: "2.9 g per bud",
      mics: "2 (1 per bud)",
      codecs: "AAC, SBC",
      multipoint: false,
      water: "IPX4",
      charging: "USB-C, 20 min → 3 h",
    },
    highlights: [
      {
        title: "Side-sleeper shape",
        text: "The outer face sits below the line of the ear, nothing presses into the pillow.",
      },
      {
        title: "Sounds on board",
        text: "Twenty masking sounds stored on the buds: rain, cabin hum, brown noise, low surf.",
      },
      {
        title: "Silent alarm",
        text: "A soft chime only you can hear, rising over thirty seconds.",
      },
    ],
    inBox: [
      "Hush Night and charging case",
      "4 sizes of wing tips",
      "USB-C cable, 0.5 m",
      "Linen pouch",
    ],
  },
  {
    id: "hush-desk",
    name: "Hush Desk",
    kind: "on",
    type: "On-ear",
    uses: ["Work"],
    price: 199,
    line: "On-ear with a fold-away boom mic, built for eight hours of calls.",
    summary:
      "Hush Desk is light enough to forget you are wearing it through a day of meetings. The boom microphone flips down to talk and up to mute, the cups cancel open-office chatter, and a USB-C dongle keeps the connection to your laptop rock solid while your phone stays paired too.",
    colours: [graphite, fog],
    specs: {
      anc: 30,
      passive: 14,
      battery: "45 h, or 28 h on calls",
      batteryHours: 45,
      weight: "186 g",
      mics: "4 for cancelling + boom mic",
      codecs: "AAC, SBC, USB audio",
      multipoint: true,
      water: "Not rated",
      charging: "15 min → 8 h, USB-C",
    },
    highlights: [
      {
        title: "Flip to mute",
        text: "Raise the boom and you are muted in every call app, with a soft tone to confirm.",
      },
      {
        title: "Busy light",
        text: "A ring on the left cup glows when you are on a call so colleagues know to wait.",
      },
      {
        title: "Two devices at once",
        text: "Laptop through the dongle, phone over Bluetooth, calls ring through on either.",
      },
    ],
    inBox: [
      "Hush Desk headset",
      "USB-C dongle with USB-A adapter",
      "USB-C cable, 1.2 m",
      "Fabric pouch",
    ],
  },
  {
    id: "hush-junior",
    name: "Hush Junior",
    kind: "kids",
    type: "On-ear",
    uses: ["Travel", "Everyday"],
    price: 89,
    line: "Volume-limited cancelling headphones for ears aged four to twelve.",
    summary:
      "Junior caps volume at 85 dB, the level hearing specialists recommend for children, and cancels enough engine noise that the cartoon does not need to be turned up in the first place. The band is a single piece of bendable steel inside soft silicone, so it survives being sat on.",
    colours: [tomato, sky, moss],
    specs: {
      anc: 22,
      passive: 14,
      battery: "30 h with cancelling on",
      batteryHours: 30,
      weight: "148 g",
      mics: "2 for cancelling",
      codecs: "SBC",
      multipoint: false,
      water: "Splash resistant",
      charging: "USB-C, 15 min → 4 h",
    },
    highlights: [
      {
        title: "85 dB limit",
        text: "Locked in hardware, not an app setting, so it stays on whichever device they use.",
      },
      {
        title: "Share port",
        text: "A second headphone plugs into the left cup so siblings can watch together.",
      },
      {
        title: "Sit-proof band",
        text: "Spring steel core, silicone skin, tested to 1,000 bends.",
      },
    ],
    inBox: [
      "Hush Junior headphones",
      "Sticker sheet for the cups",
      "USB-C cable, 1 m",
      "3.5 mm share cable",
    ],
  },
  {
    id: "one-cushions",
    name: "Hush One Cushions",
    kind: "cushions",
    type: "Accessory",
    uses: ["Everyday"],
    price: 35,
    line: "A fresh pair of memory-foam cushions. Clip on in ten seconds.",
    summary:
      "Cushions wear out long before headphones should. These are the same slow-recovery foam and protein-leather covers that ship on Hush One, with the acoustic mesh already fitted, so cancellation is exactly as it was on day one.",
    colours: [graphite, fog, clay, moss],
    highlights: [
      {
        title: "Tool-free",
        text: "Twist off, line up the notch, press until both clips click.",
      },
      {
        title: "Tuned mesh",
        text: "The inner mesh is part of the acoustic design, so fit genuine cushions.",
      },
      {
        title: "Mix colours",
        text: "Every cushion colour fits every Hush One shell.",
      },
    ],
    inBox: ["Left and right cushion", "Cleaning cloth"],
    fits: "Hush One",
  },
  {
    id: "travel-case",
    name: "Felt Travel Case",
    kind: "case",
    type: "Accessory",
    uses: ["Travel"],
    price: 45,
    line: "Pressed wool felt over a rigid shell, with a pocket for cables and adapters.",
    summary:
      "Pressed from recycled wool felt over a rigid recycled-polymer shell, the case shrugs off being squeezed into an overhead bin. A magnetic flap inside holds the cable, flight adapter and a pair of buds if you carry both.",
    colours: [graphite, clay],
    highlights: [
      {
        title: "Rigid where it counts",
        text: "Takes 40 kg of pressure without touching the headphones inside.",
      },
      {
        title: "Cable pocket",
        text: "Magnetic flap for cables and the flight adapter.",
      },
      {
        title: "Fits two",
        text: "Folded Hush One plus a Buds case side by side.",
      },
    ],
    inBox: ["Felt travel case", "Carabiner loop"],
    fits: "Hush One, Hush Fold",
  },
];

export const types: Type[] = ["Over-ear", "On-ear", "In-ear", "Accessory"];
export const uses: Use[] = ["Travel", "Commute", "Work", "Sleep", "Everyday"];

/* ---------- Noise lab ---------- */

/** Octave-band centres used for every spectrum, in Hz. */
export const bands = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

export type Scene = {
  id: string;
  name: string;
  place: string;
  image: string;
  alt: string;
  levels: number[];
  tone: { type: BiquadFilterType; frequency: number; q: number };
};

export const scenes: Scene[] = [
  {
    id: "metro",
    name: "Metro",
    place: "Rush hour, 10 pm, between stations",
    image: commute,
    alt: "Commuters standing close together in a lit subway carriage, one wearing earphones",
    levels: [74, 80, 82, 79, 74, 70, 66, 63, 56, 44],
    tone: { type: "lowpass", frequency: 420, q: 0.9 },
  },
  {
    id: "cabin",
    name: "Cabin",
    place: "Long-haul flight at cruising altitude",
    image: cabin,
    alt: "Rows of blue seats in a narrow aircraft cabin, passengers settled in for the flight",
    levels: [78, 82, 81, 78, 74, 69, 64, 58, 50, 40],
    tone: { type: "lowpass", frequency: 300, q: 0.7 },
  },
  {
    id: "office",
    name: "Office",
    place: "Open-plan floor, mid-morning",
    image: office,
    alt: "A man working on a laptop at a long wooden desk in a high-ceilinged shared office",
    levels: [48, 52, 54, 57, 61, 62, 58, 52, 44, 34],
    tone: { type: "bandpass", frequency: 900, q: 0.6 },
  },
  {
    id: "cafe",
    name: "Café",
    place: "Lunchtime, espresso machine running",
    image: cafe,
    alt: "Seen from above through a window at night, people work at a long table in a warm-lit café",
    levels: [55, 60, 63, 65, 68, 69, 67, 64, 58, 46],
    tone: { type: "bandpass", frequency: 1400, q: 0.5 },
  },
];

/* ---------- Home ---------- */

export const home = {
  hero: {
    title: "Turn the world down.",
    lead: "Hush One cancels up to 42 dB of rumble, hum and chatter, so the train, the cabin and the open office fall quiet and your music plays at half the volume.",
    specs: [
      "Up to −42 dB cancelling",
      "40 hours per charge",
      "254 grams",
      "Every part replaceable",
    ],
  },
  scenesTitle: "Built for the four loudest hours of your week",
  scenesText:
    "We measured where our customers actually wear their headphones. These four places account for most of it, and each one sounds different.",
  labTitle: "Hear what cancelling takes away",
  labText:
    "Choose a place, then raise the cancelling. The shaded area is the room; the line is what is left at your ear. Press play to hear a rendered version of it through your own speakers or headphones.",
  rangeTitle: "Seven ways to be quiet",
  rangeText:
    "Over-ear for the long haul, in-ear for the pocket, one for sleeping and one for the desk.",
  micTitle: "Eight microphones, one decision every 20 microseconds",
  micText: [
    "Six feed-forward and feedback microphones listen outside and inside each cup. A dedicated chip compares them and builds an anti-noise wave before the sound reaches your ear.",
    "Two more, angled toward your mouth, form a narrow beam for calls. Anything outside that beam, the espresso machine, the announcement, the colleague on speaker, is turned down for the person on the other end.",
  ],
  quiet:
    "A 7:40 train. A full carriage. Nothing but the album you meant to finish.",
  repairTitle: "Built to outlast the battery",
  repairText:
    "Headphones usually end up in a drawer because one cheap part wore out. Every Hush part that wears is sold on its own, fits with a coin or by hand, and stays in stock for ten years after a model is discontinued.",
  parts: [
    { name: "Ear cushions", price: 35, time: "10 seconds, by hand" },
    { name: "Headband pad", price: 19, time: "1 minute, by hand" },
    { name: "Battery pack", price: 39, time: "5 minutes, coin" },
    { name: "Hinge and slider", price: 29, time: "8 minutes, coin" },
  ],
  quotes: [
    {
      text: "I fly Lisbon to São Paulo twice a month. I used to land with a headache I blamed on the wine. It was the engines.",
      name: "Inês Carvalho",
      role: "Hush One, Moss",
    },
    {
      text: "Our office went open-plan in March. The Desk is the only reason I still get the morning's writing done.",
      name: "Daniel Osei",
      role: "Hush Desk, Graphite",
    },
    {
      text: "My partner snores at the exact frequency of a leaf blower. Night takes it right out.",
      name: "Hana Morikawa",
      role: "Hush Night, Dusk",
    },
  ],
  promises: [
    {
      title: "45-day home trial",
      text: "Wear them on your own commute. Send them back free if they do not earn their place.",
    },
    {
      title: "Two-year warranty",
      text: "Covered at home and abroad, extended to three years when you register.",
    },
    {
      title: "Free shipping",
      text: "Two to four working days, signed for, in recycled card with no plastic.",
    },
  ],
  close: {
    title: "Try the quiet for 45 days",
    text: "Free shipping, free returns, and a person on the phone if anything feels off.",
  },
};

/* ---------- Product story ---------- */

export const story = {
  title: "Hush One: the long way to quiet",
  lead: "Four years, eleven prototypes and one very quiet room. This is how our flagship headphone was made, and why it sounds the way it does.",
  chapters: [
    {
      id: "problem",
      title: "Noise is mostly low, and mostly constant",
      text: [
        "Before we drew a single cup, we sent forty volunteers out with measurement microphones clipped to their collars for a month. The pattern was clear. The sound that wears people down is rarely loud. It is the 80 to 300 Hz drone of engines, air handling and wheels on rails, hour after hour.",
        "Passive foam is good at stopping high, sharp sounds. It does very little against a low hum. That is the job of active cancelling, so that is where we spent the money.",
      ],
    },
    {
      id: "room",
      title: "A room where you can hear your own pulse",
      text: [
        "Our lab in Oakland has a small anechoic chamber lined with 1,400 foam wedges. With the door shut the background level is below 10 dB, quieter than a recording studio. It is where every Hush One is tuned, and where we learned that cancelling which is too aggressive makes people feel pressure in their ears.",
        "So Hush One stops short of the maximum it could do. It removes noise until the pressure would start, and then holds.",
      ],
    },
    {
      id: "fit",
      title: "The seal does half the work",
      text: [
        "A cancelling headphone is only as good as the seal around the ear. Glasses, hair and jaw movement all break it. Hush One measures the seal with an inaudible tone every time you put it on and re-tunes its filters to match, which is why it sounds the same over glasses as without.",
      ],
    },
    {
      id: "sound",
      title: "Tuned flat, then nudged",
      text: [
        "The 40 mm drivers are tuned to a neutral curve with a gentle lift below 100 Hz, the warmth you lose when the world goes quiet. There is a five-band equaliser in the app if you disagree with us.",
      ],
    },
  ],
  materials: [
    {
      name: "Shell",
      text: "Glass-filled recycled nylon, bead-blasted to a soft matte finish.",
    },
    {
      name: "Cushions",
      text: "Slow-recovery memory foam in protein-leather, with a tuned acoustic mesh.",
    },
    {
      name: "Headband",
      text: "Spring steel core, recycled aluminium sliders, wool felt pad.",
    },
    {
      name: "Packaging",
      text: "Moulded paper pulp and card. No plastic film, no foam.",
    },
  ],
  timeline: [
    {
      year: "2019",
      text: "Collar-mic study with forty commuters in three cities.",
    },
    {
      year: "2020",
      text: "First cancelling prototype, built into a pair of ear defenders.",
    },
    {
      year: "2021",
      text: "Anechoic chamber finished. Prototypes 4 to 8 tested on 600 heads.",
    },
    {
      year: "2022",
      text: "Seal-sensing tone invented after the glasses problem would not go away.",
    },
    {
      year: "2023",
      text: "Hush One ships. Every part sold separately from day one.",
    },
  ],
};

/* ---------- Compare ---------- */

export const compareDefaults = ["hush-one", "hush-fold", "hush-buds-pro"];

/* ---------- Support ---------- */

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  products: string[];
  steps: { title: string; text: string }[];
  note?: string;
};

export const guides: Guide[] = [
  {
    slug: "pair-a-device",
    title: "Pair with a phone or laptop",
    summary:
      "Put any Hush headphone into pairing mode and connect a second device for multipoint.",
    minutes: 2,
    products: [
      "Hush One",
      "Hush Fold",
      "Hush Buds Pro",
      "Hush Buds",
      "Hush Night",
      "Hush Desk",
      "Hush Junior",
    ],
    steps: [
      {
        title: "Charge first",
        text: "Out of the box, charge for ten minutes. Pairing needs at least 10% battery.",
      },
      {
        title: "Enter pairing mode",
        text: "Over-ear and on-ear: hold the power button for five seconds until the light pulses white. Buds: open the case and hold the button on the back for three seconds.",
      },
      {
        title: "Choose Hush in Bluetooth settings",
        text: "On your device, open Bluetooth settings and pick the name that matches your model. A short chime confirms the connection.",
      },
      {
        title: "Add a second device",
        text: "Repeat steps two and three with the second device. Models with multipoint stay connected to both and switch to whichever plays sound.",
      },
    ],
    note: "Hush Buds, Night and Junior connect to one device at a time and switch to the last one you used.",
  },
  {
    slug: "update-firmware",
    title: "Update the firmware",
    summary:
      "Install the latest cancelling filters and fixes through the Hush app.",
    minutes: 8,
    products: ["Hush One", "Hush Fold", "Hush Buds Pro", "Hush Desk"],
    steps: [
      {
        title: "Open the Hush app",
        text: "Updates download in the background when your headphones are connected and above 30% battery.",
      },
      {
        title: "Keep them close",
        text: "Leave the headphones within a metre of your phone with the app open on the update screen.",
      },
      {
        title: "Wait for the restart",
        text: "Installation takes about six minutes. The headphones restart twice and play a tone when they are done.",
      },
    ],
  },
  {
    slug: "tune-cancelling",
    title: "Tune cancelling and aware mode",
    summary:
      "Choose how much of the world comes through, and when it switches automatically.",
    minutes: 3,
    products: ["Hush One", "Hush Fold", "Hush Buds Pro", "Hush Buds"],
    steps: [
      {
        title: "Pick a level",
        text: "In the app, the Quiet slider has ten steps. Most people settle between seven and nine; the top step is for flights.",
      },
      {
        title: "Set aware mode",
        text: "Aware mode passes voices through at natural level. Choose whether it turns on when you speak, when you squeeze a stem, or both.",
      },
      {
        title: "Run the fit check",
        text: "Start Fit check and stay still for eight seconds. If the seal is weak the app suggests a different tip or cushion position.",
      },
    ],
  },
  {
    slug: "replace-cushions",
    title: "Replace ear cushions",
    summary: "Swap worn Hush One cushions for a fresh pair in under a minute.",
    minutes: 1,
    products: ["Hush One"],
    steps: [
      {
        title: "Twist off",
        text: "Hold the cup, grip the cushion at the bottom and twist anticlockwise a quarter turn. It lifts away.",
      },
      {
        title: "Line up the notch",
        text: "The new cushion has a small notch at the bottom. Match it to the notch on the cup.",
      },
      {
        title: "Press until both clicks",
        text: "Press around the rim until you hear two clicks. Run the fit check in the app afterwards.",
      },
    ],
  },
  {
    slug: "replace-battery",
    title: "Replace the battery",
    summary:
      "Fit a new battery pack in Hush One or Fold with a coin and five minutes.",
    minutes: 5,
    products: ["Hush One", "Hush Fold"],
    steps: [
      {
        title: "Remove the right cushion",
        text: "Follow the cushion guide to take off the right cushion only.",
      },
      {
        title: "Unscrew the cover",
        text: "Use a coin to turn the round cover anticlockwise and lift it out.",
      },
      {
        title: "Swap the pack",
        text: "Lift the battery by its fabric tab, unclip the connector, and clip in the new pack.",
      },
      {
        title: "Recycle the old one",
        text: "Use the prepaid envelope in the box. We recover the cells and send you a $10 credit.",
      },
    ],
  },
  {
    slug: "clean-and-care",
    title: "Clean and care",
    summary:
      "Keep cushions, tips and charging contacts fresh without damaging the acoustic mesh.",
    minutes: 4,
    products: [
      "Hush One",
      "Hush Fold",
      "Hush Buds Pro",
      "Hush Buds",
      "Hush Night",
      "Hush Desk",
      "Hush Junior",
    ],
    steps: [
      {
        title: "Wipe, do not soak",
        text: "Use a cloth barely damp with water and a drop of mild soap. Keep liquid away from the mesh and microphone holes.",
      },
      {
        title: "Tips go in water",
        text: "Silicone tips can be removed and rinsed. Foam tips should only be wiped and replaced every three months.",
      },
      {
        title: "Clean the contacts",
        text: "Wipe the charging contacts in the case with a dry cotton swab once a month.",
      },
    ],
  },
];

export const faqs = [
  {
    q: "How does the 45-day trial work?",
    a: "Wear them for up to 45 days from delivery. If you decide against them, start a return from your order email and we send a prepaid label. Refunds arrive within five working days of the parcel reaching us.",
  },
  {
    q: "Will cancelling hurt my ears or cause pressure?",
    a: "Hush tunes cancelling to stop short of the level that causes the pressure sensation some people feel. If you are sensitive to it, set the Quiet slider to six or lower.",
  },
  {
    q: "Can I use them on a plane's entertainment system?",
    a: "Yes. Hush One and Fold include a 3.5 mm cable and flight adapter. Cancelling works with the cable connected, even with the battery switched off on Hush One, which then runs passively.",
  },
  {
    q: "Do you sell parts for older models?",
    a: "Every part that wears stays in stock for ten years after a model is discontinued. If a part is out of stock we will repair the headphones for the price of the part.",
  },
  {
    q: "What does the warranty cover?",
    a: "Two years against manufacturing defects worldwide, extended to three when you register. Batteries are covered to 80% of their original capacity for the full term.",
  },
  {
    q: "Where do you ship?",
    a: "To the United States, Canada, the United Kingdom, the European Union, Australia and Japan, with prices in US dollars and duties included.",
  },
];

export const supportTopics = [
  "Pairing or connection",
  "Cancelling or sound",
  "Battery or charging",
  "Damage or repair",
  "Order or delivery",
  "Something else",
];

/* ---------- About ---------- */

export const about = {
  title: "A small company that makes quiet things",
  lead: "Hush Acoustics was started in 2019 by two acoustic engineers who were tired of headphones that ended up in landfill because a cushion tore. We are thirty-one people in Oakland and Rotterdam.",
  values: [
    {
      title: "Quiet over loud",
      text: "Cancelling lets people listen at lower volume. We tune for the quietest comfortable listening level, not the most impressive demo.",
    },
    {
      title: "Parts over replacements",
      text: "Every part that wears is sold on its own for ten years. We would rather sell you a $35 cushion than a new pair.",
    },
    {
      title: "Measured, not claimed",
      text: "Every figure on this site comes from our own chamber, measured the same way on every model, and we publish the method.",
    },
  ],
  team: [
    { name: "Maren Achterberg", role: "Co-founder, acoustics" },
    { name: "Theo Nakashima", role: "Co-founder, electronics" },
    { name: "Priya Raman", role: "Head of product" },
    { name: "Luis Echeverría", role: "Industrial design" },
    { name: "Grace Whitfield", role: "Repair and parts" },
    { name: "Kwame Asante", role: "Customer support lead" },
  ],
  numbers: [
    { label: "Repairs completed last year", value: "18,400" },
    { label: "Cushions sold for every new pair", value: "1.7" },
    { label: "Batteries recovered and recycled", value: "9,120" },
  ],
  studios: [
    {
      city: "Oakland",
      text: "Lab, chamber, repair bench and support team. 1180 Mariner Way, Unit 4.",
    },
    {
      city: "Rotterdam",
      text: "European repair centre and warehouse. Keileweg 26.",
    },
  ],
};

/* ---------- Checkout ---------- */

export const checkout = {
  title: "Checkout",
  note: "This is a demo shop: nothing is charged, sent or stored.",
  delivery: [
    {
      id: "standard",
      label: "Standard",
      detail: "2–4 working days, signed for",
      price: 0,
    },
    {
      id: "express",
      label: "Express",
      detail: "Next working day if ordered by 2 pm",
      price: 15,
    },
  ],
  countries: [
    "United States",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Germany",
    "France",
    "Australia",
    "Japan",
  ],
};

export const footer = {
  newsletter: {
    title: "Quiet mail",
    text: "Firmware notes, new colours and one long read a month. No sales every Friday.",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Reddit", href: "https://www.reddit.com/" },
  ],
};
