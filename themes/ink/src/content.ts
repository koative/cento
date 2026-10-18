import studio from "./assets/studio.jpg";
import owlSession from "./assets/owl-session.jpg";
import idrisPhoto from "./assets/idris.jpg";
import anklePhoto from "./assets/ankle.jpg";
import letteringPhoto from "./assets/lettering.jpg";
import stencilPhoto from "./assets/stencil.jpg";
import stationPhoto from "./assets/station.jpg";
import fineLinePhoto from "./assets/fine-line.jpg";

/* ── Brand ─────────────────────────────────────────── */

export const brand = {
  name: "Ink",
  sector: "Tattoo studio",
  tagline: "Flash off the wall, drawn again for your skin.",
  street: "41 Calder Lane",
  city: "Eastbrook",
  region: "OR 97321",
  phone: "+1 555 0139 214",
  email: "hello@ink.example",
  instagram: "https://www.instagram.com/",
  founded: 2016,
};

export const hours = [
  { days: "Tuesday – Thursday", time: "11:00 – 19:00" },
  { days: "Friday", time: "12:00 – 18:00 · Flash Friday walk-ins" },
  { days: "Saturday", time: "10:00 – 17:00" },
  { days: "Sunday & Monday", time: "Closed — we draw" },
];

export const nav = [
  { to: "/flash", label: "Flash book" },
  { to: "/artists", label: "Artists" },
  { to: "/aftercare", label: "Aftercare" },
  { to: "/studio", label: "Studio" },
  { to: "/faq", label: "FAQ & policies" },
];

export const rates = {
  minimum: 120,
  hourly: 170,
  deposit: 80,
};

/* ── Images ────────────────────────────────────────── */

export const images = {
  studio: {
    src: studio,
    alt: "Gloved hands tattooing fine linework onto a client's tattooed forearm",
    w: 1600,
    h: 1067,
  },
  stencil: {
    src: stencilPhoto,
    alt: "An artist lines a tattoo over a violet transfer stencil on a client's shoulder",
    w: 960,
    h: 640,
  },
  station: {
    src: stationPhoto,
    alt: "A tattoo machine and ink cups set out on a station before a session",
    w: 1000,
    h: 667,
  },
  fineLine: {
    src: fineLinePhoto,
    alt: "Close-up of a fine-line tattoo being outlined, fresh ink on the skin",
    w: 1000,
    h: 643,
  },
};

/* ── Styles & placements ───────────────────────────── */

export const styles = [
  "Blackwork",
  "Fine line",
  "Geometric",
  "Ornamental",
  "Dotwork",
  "Lettering",
] as const;
export type Style = (typeof styles)[number];

export type Placement = {
  id: string;
  label: string;
  w: number;
  h: number;
  note: string;
};

/** Usable flat area in centimetres for an average adult; the artist confirms on the day. */
export const placements: Placement[] = [
  {
    id: "inner-forearm",
    label: "Inner forearm",
    w: 18,
    h: 8,
    note: "Flat, quick to heal and easy to cover for work.",
  },
  {
    id: "outer-forearm",
    label: "Outer forearm",
    w: 20,
    h: 9,
    note: "Takes bold black well; the sun finds it first.",
  },
  {
    id: "upper-arm",
    label: "Upper arm",
    w: 22,
    h: 12,
    note: "The easiest sit in the studio for a first tattoo.",
  },
  {
    id: "shoulder",
    label: "Shoulder cap",
    w: 16,
    h: 14,
    note: "Round pieces sit best; we tilt them to the muscle.",
  },
  {
    id: "wrist",
    label: "Wrist",
    w: 7,
    h: 5,
    note: "Thin skin. Below 5 cm we keep to single-needle lines.",
  },
  {
    id: "ankle",
    label: "Ankle",
    w: 10,
    h: 8,
    note: "Bony and quick. Plan for socks off for two weeks.",
  },
  {
    id: "calf",
    label: "Calf",
    w: 26,
    h: 13,
    note: "Generous and forgiving for long, narrow designs.",
  },
  {
    id: "thigh",
    label: "Thigh",
    w: 30,
    h: 18,
    note: "Our largest flat canvas outside the back.",
  },
  {
    id: "ribs",
    label: "Ribs",
    w: 28,
    h: 16,
    note: "Slow and tender. We plan breaks into the quote.",
  },
  {
    id: "sternum",
    label: "Sternum",
    w: 18,
    h: 14,
    note: "Symmetrical designs only; we centre on the bone.",
  },
  {
    id: "spine",
    label: "Along the spine",
    w: 34,
    h: 6,
    note: "Long, narrow pieces. Bring a loose top you can open.",
  },
  {
    id: "collarbone",
    label: "Collarbone",
    w: 16,
    h: 5,
    note: "Short horizontal pieces that follow the bone.",
  },
];

export const placementById = (id: string) =>
  placements.find((p) => p.id === id);

/* ── Artists ───────────────────────────────────────── */

export type Artist = {
  id: string;
  name: string;
  pronouns: string;
  role: string;
  styles: Style[];
  since: number;
  photo: { src: string; alt: string; w: number; h: number };
  books: "open" | "waitlist";
  nextOpening: string;
  days: string;
  dayRate: number;
  intro: string;
  bio: string[];
  quote: string;
  guestSpots: { city: string; dates: string }[];
};

export const artists: Artist[] = [
  {
    id: "mara-vey",
    name: "Mara Vey",
    pronouns: "she/her",
    role: "Founder · blackwork & ornamental",
    styles: ["Blackwork", "Ornamental", "Geometric"],
    since: 2009,
    photo: {
      src: owlSession,
      alt: "Mara's black-and-grey owl in progress across a client's forearm",
      w: 1000,
      h: 667,
    },
    books: "waitlist",
    nextOpening: "Waitlist for March",
    days: "Tuesday – Thursday",
    dayRate: 1150,
    intro:
      "Packed black, hard edges and patterns you can read from across a room.",
    bio: [
      "Mara apprenticed in a street-corner shop that tattooed sailors' flash off the wall, and she still prices her sheets the way they did: one design, one size, one honest number.",
      "She opened Ink in 2016 in the back of a closed letterpress shop and kept the type cases. Her flash is heavy on solid black — sunwheels, compass roses, moons — built to stay legible for forty years rather than look sharp for forty days.",
      "Mara takes two custom clients a month and keeps a waitlist for the rest. Her flash is open to anyone.",
    ],
    quote:
      "If you can't read it from across the bar in ten years, it was drawn too small.",
    guestSpots: [
      { city: "Halden Tattoo Convention", dates: "8 – 10 November" },
      { city: "Port Severn, guest at Low Tide", dates: "14 – 18 January" },
    ],
  },
  {
    id: "idris-navarro",
    name: "Idris Navarro",
    pronouns: "he/him",
    role: "Fine line & geometric",
    styles: ["Fine line", "Geometric"],
    since: 2017,
    photo: {
      src: idrisPhoto,
      alt: "Idris bent over a client's arm, lining a tattoo with a pen machine",
      w: 800,
      h: 1200,
    },
    books: "open",
    nextOpening: "Openings from 4 November",
    days: "Wednesday – Saturday",
    dayRate: 1050,
    intro:
      "Single-needle lines, compass-drawn circles and a lot of empty skin left on purpose.",
    bio: [
      "Idris trained as a draughtsman before he trained as a tattooer, and it shows: every circle on his sheets is drawn with a compass and every line is measured before it is inked.",
      "He works small to medium and will tell you, kindly, when a design needs another two centimetres to last. His stencil sessions run long because he moves the stencil until it sits on the muscle, not the page.",
    ],
    quote:
      "The space between the lines is part of the design. Leave room for it.",
    guestSpots: [
      { city: "Kessling, guest at North Room", dates: "2 – 6 December" },
    ],
  },
  {
    id: "teo-lindqvist",
    name: "Teo Lindqvist",
    pronouns: "they/them",
    role: "Dotwork & ornamental",
    styles: ["Dotwork", "Ornamental", "Fine line"],
    since: 2014,
    photo: {
      src: anklePhoto,
      alt: "Teo tattooing a fine line around a client's ankle",
      w: 960,
      h: 640,
    },
    books: "open",
    nextOpening: "Openings from 12 November",
    days: "Thursday – Saturday",
    dayRate: 1100,
    intro:
      "Stippled shading, soft gradients and ornaments that follow the body's own lines.",
    bio: [
      "Teo builds every shadow out of single dots, which takes longer and heals softer. Their ornamental pieces are drawn on the body as much as on paper; expect to stand in front of the mirror while they adjust.",
      "They also run the studio's Flash Friday queue and draw most of its walk-in sheet.",
    ],
    quote:
      "Dotwork is patient. It looks quiet on day one and better every year after.",
    guestSpots: [],
  },
  {
    id: "ruth-okafor",
    name: "Ruth Okafor",
    pronouns: "she/her",
    role: "Lettering & bands",
    styles: ["Lettering", "Blackwork"],
    since: 2019,
    photo: {
      src: letteringPhoto,
      alt: "Ruth tattooing a line of script lettering along a client's forearm",
      w: 1000,
      h: 812,
    },
    books: "open",
    nextOpening: "Openings from 29 October",
    days: "Tuesday, Friday & Saturday",
    dayRate: 950,
    intro:
      "Hand-drawn blackletter, script and armbands that close cleanly around the arm.",
    bio: [
      "Ruth came to tattooing from sign painting and still letters every word freehand before it becomes a stencil. No fonts, no copy-paste: if you want a name, she draws that name.",
      "Her bands and chains are measured around your actual arm at the consult, so the pattern meets itself without a seam.",
    ],
    quote:
      "A word on skin should look like somebody wrote it, because somebody did.",
    guestSpots: [{ city: "Marlow Script Weekend", dates: "22 – 23 February" }],
  },
];

export const artistById = (id: string) => artists.find((a) => a.id === id);

/* ── Flash ─────────────────────────────────────────── */

export type ArtKey =
  | "orbit"
  | "undertow"
  | "threshold"
  | "intervals"
  | "sunwheel"
  | "night-watch"
  | "seed"
  | "lantern"
  | "chainline"
  | "vesper"
  | "twelvefold"
  | "phases"
  | "spine"
  | "tide-eye"
  | "briar"
  | "compass"
  | "banner";

export type Availability = "repeatable" | "one-off" | "claimed";

export type Design = {
  id: ArtKey;
  no: number;
  name: string;
  artist: string;
  styles: Style[];
  /** Starting size in centimetres across the longest side. */
  minCm: number;
  maxCm: number;
  /** Price at the starting size, in USD. */
  price: number;
  availability: Availability;
  placements: string[];
  blurb: string;
  notes: string[];
};

export const availabilityLabel: Record<Availability, string> = {
  repeatable: "Repeatable",
  "one-off": "One-off",
  claimed: "Claimed",
};

export const flash: Design[] = [
  {
    id: "orbit",
    no: 1,
    name: "Orbit",
    artist: "idris-navarro",
    styles: ["Geometric", "Fine line"],
    minCm: 6,
    maxCm: 14,
    price: 140,
    availability: "repeatable",
    placements: ["inner-forearm", "ankle", "upper-arm", "calf"],
    blurb:
      "A planet held in a tilted ring, with one red moon caught on the line. Reads cleanly at six centimetres and grows well.",
    notes: [
      "Single needle ring, stippled planet",
      "The red moon can be left black",
      "Ring angle adjusted to the arm at the stencil",
    ],
  },
  {
    id: "undertow",
    no: 2,
    name: "Undertow",
    artist: "ruth-okafor",
    styles: ["Blackwork", "Fine line"],
    minCm: 8,
    maxCm: 20,
    price: 180,
    availability: "repeatable",
    placements: ["outer-forearm", "calf", "collarbone", "upper-arm"],
    blurb:
      "Five parallel swells. Works as a patch or a long forearm piece; the lines are spaced to stay open as they age.",
    notes: [
      "Line spacing never below 3 mm",
      "Can extend to six or seven swells",
      "Pairs with Briar Band as a sleeve start",
    ],
  },
  {
    id: "threshold",
    no: 3,
    name: "Threshold",
    artist: "idris-navarro",
    styles: ["Geometric"],
    minCm: 5,
    maxCm: 12,
    price: 120,
    availability: "one-off",
    placements: ["inner-forearm", "ankle", "wrist", "sternum"],
    blurb:
      "Four nested arches standing on one ground line. A doorway for people who just walked through one.",
    notes: [
      "One-off: retired from the wall once tattooed",
      "Clean at the shop minimum size",
      "Compass-drawn arches",
    ],
  },
  {
    id: "intervals",
    no: 4,
    name: "Intervals",
    artist: "idris-navarro",
    styles: ["Geometric", "Fine line"],
    minCm: 7,
    maxCm: 18,
    price: 160,
    availability: "repeatable",
    placements: ["inner-forearm", "spine", "calf", "upper-arm"],
    blurb:
      "Five linked circles, stacked like vertebrae or a string of beads. Made for the length of the forearm or down the spine.",
    notes: [
      "Add or remove links to fit the length",
      "Centre dots can be dropped",
      "Works vertical only",
    ],
  },
  {
    id: "sunwheel",
    no: 5,
    name: "Sunwheel",
    artist: "mara-vey",
    styles: ["Blackwork", "Ornamental"],
    minCm: 8,
    maxCm: 16,
    price: 220,
    availability: "one-off",
    placements: ["shoulder", "sternum", "upper-arm", "thigh"],
    blurb:
      "A packed black core and twenty-four rays in two lengths. Heavy saturation; plan for a longer sit than the size suggests.",
    notes: [
      "Solid black fill, healed in two passes",
      "One-off: retired once tattooed",
      "Not offered below 8 cm",
    ],
  },
  {
    id: "night-watch",
    no: 6,
    name: "Night Watch",
    artist: "mara-vey",
    styles: ["Blackwork"],
    minCm: 6,
    maxCm: 14,
    price: 180,
    availability: "claimed",
    placements: ["inner-forearm", "ankle", "shoulder", "ribs"],
    blurb:
      "A solid crescent with three four-point stars, one of them in red. Claimed in September; kept here so you can see the sheet.",
    notes: [
      "Claimed one-off — Mara will draw you a sibling",
      "Solid fill crescent",
      "Red star optional",
    ],
  },
  {
    id: "seed",
    no: 7,
    name: "Seed",
    artist: "idris-navarro",
    styles: ["Geometric", "Fine line"],
    minCm: 6,
    maxCm: 12,
    price: 160,
    availability: "repeatable",
    placements: ["inner-forearm", "sternum", "shoulder", "ankle"],
    blurb:
      "Seven circles of one radius inside a double ring — the oldest pattern on our wall. Single needle, no shading.",
    notes: [
      "Every circle the same radius",
      "Needs 6 cm to stay open",
      "Pure linework, heals fast",
    ],
  },
  {
    id: "lantern",
    no: 8,
    name: "Lantern",
    artist: "idris-navarro",
    styles: ["Geometric"],
    minCm: 5,
    maxCm: 10,
    price: 130,
    availability: "repeatable",
    placements: ["wrist", "ankle", "inner-forearm", "collarbone"],
    blurb:
      "Three nested diamonds hung on a plumb line, finished with a red drop.",
    notes: [
      "Good first tattoo: under an hour",
      "Red drop can be black",
      "Hangs vertical",
    ],
  },
  {
    id: "chainline",
    no: 9,
    name: "Chainline",
    artist: "ruth-okafor",
    styles: ["Blackwork"],
    minCm: 10,
    maxCm: 22,
    price: 200,
    availability: "repeatable",
    placements: ["upper-arm", "calf", "ankle", "outer-forearm"],
    blurb:
      "An interlocking chain that wraps the arm, ankle or calf. Ruth measures the limb at the consult so the links meet without a seam.",
    notes: [
      "Size is the length of one visible run",
      "Full wraps quoted at the consult",
      "Solid black links",
    ],
  },
  {
    id: "vesper",
    no: 10,
    name: "Vesper",
    artist: "teo-lindqvist",
    styles: ["Dotwork", "Geometric"],
    minCm: 8,
    maxCm: 16,
    price: 210,
    availability: "one-off",
    placements: ["sternum", "shoulder", "upper-arm", "thigh"],
    blurb:
      "An eight-point star inside a ring of stippled dots. Dotwork softens as it heals; that is the point.",
    notes: [
      "One-off: retired once tattooed",
      "Stippled ring, single-needle star",
      "Looks best healed",
    ],
  },
  {
    id: "twelvefold",
    no: 11,
    name: "Twelvefold",
    artist: "mara-vey",
    styles: ["Ornamental", "Dotwork"],
    minCm: 10,
    maxCm: 24,
    price: 280,
    availability: "repeatable",
    placements: ["sternum", "thigh", "shoulder", "calf"],
    blurb:
      "A twelve-petal mandala in two layers, drawn for the sternum, the back of the knee or the centre of the back.",
    notes: [
      "Usually one session up to 14 cm",
      "Above 18 cm we split into two sittings",
      "Dot ring can be doubled",
    ],
  },
  {
    id: "phases",
    no: 12,
    name: "Phases",
    artist: "mara-vey",
    styles: ["Blackwork", "Fine line"],
    minCm: 10,
    maxCm: 20,
    price: 170,
    availability: "repeatable",
    placements: ["collarbone", "spine", "inner-forearm", "outer-forearm"],
    blurb:
      "Five moons on a line, new to new. Sits along the collarbone, the spine or the inside of the arm.",
    notes: [
      "Size is the length of the row",
      "Works horizontal or vertical",
      "Solid moons healed in two passes",
    ],
  },
  {
    id: "spine",
    no: 13,
    name: "Spine",
    artist: "teo-lindqvist",
    styles: ["Dotwork", "Ornamental"],
    minCm: 12,
    maxCm: 30,
    price: 240,
    availability: "repeatable",
    placements: ["spine", "calf", "outer-forearm", "inner-forearm"],
    blurb:
      "A dotwork ladder of diamonds, tapering at both ends. Long and narrow on purpose.",
    notes: [
      "Size is the full length",
      "Above 20 cm plan for half a day",
      "Dot density adjusted to the skin",
    ],
  },
  {
    id: "tide-eye",
    no: 14,
    name: "Tide Eye",
    artist: "teo-lindqvist",
    styles: ["Ornamental", "Fine line"],
    minCm: 6,
    maxCm: 12,
    price: 160,
    availability: "one-off",
    placements: ["inner-forearm", "shoulder", "sternum", "calf"],
    blurb:
      "An open eye with nine lashes of light and a red tear. Teo will tilt it to follow the muscle.",
    notes: [
      "One-off: retired once tattooed",
      "Red tear optional",
      "Fine line lashes, solid pupil",
    ],
  },
  {
    id: "briar",
    no: 15,
    name: "Briar Band",
    artist: "ruth-okafor",
    styles: ["Blackwork"],
    minCm: 10,
    maxCm: 24,
    price: 190,
    availability: "repeatable",
    placements: ["upper-arm", "calf", "outer-forearm", "ankle"],
    blurb:
      "A thorned band of solid black triangles between two rails. Closes around the arm or stops short as a cuff.",
    notes: [
      "Size is the visible run",
      "Full wraps quoted at the consult",
      "Thorn count adjusted to the limb",
    ],
  },
  {
    id: "compass",
    no: 16,
    name: "Compass",
    artist: "mara-vey",
    styles: ["Blackwork", "Geometric"],
    minCm: 8,
    maxCm: 18,
    price: 230,
    availability: "claimed",
    placements: ["shoulder", "upper-arm", "thigh", "sternum"],
    blurb:
      "A half-shaded eight-point rose inside a ticked ring, north in red. Claimed in August; Mara keeps the sheet up as a reference.",
    notes: [
      "Claimed one-off — ask for a new rose",
      "Half-solid points",
      "Red north point",
    ],
  },
  {
    id: "banner",
    no: 17,
    name: "Banner",
    artist: "ruth-okafor",
    styles: ["Lettering", "Ornamental"],
    minCm: 8,
    maxCm: 16,
    price: 150,
    availability: "repeatable",
    placements: ["inner-forearm", "upper-arm", "collarbone", "calf"],
    blurb:
      "A folded ribbon with room for one word in Ruth's blackletter. Your word, drawn by hand at the consult.",
    notes: [
      "One word up to nine letters",
      "Lettering drawn freehand, never typeset",
      "Ribbon can be shaded or open",
    ],
  },
];

export const designById = (id: string) => flash.find((d) => d.id === id);

/* ── Home ──────────────────────────────────────────── */

export const home = {
  title: "Flash off the wall, drawn again for your skin.",
  intro:
    "Ink is a four-artist tattoo studio on Calder Lane. Pick a design from the flash book, size it to your arm, or bring us an idea and we will draw it from scratch.",
  status:
    "Books open with Idris, Teo and Ruth · Flash Friday walk-ins, 12:00 – 18:00",
  wallTitle: "This month's wall",
  wallIntro:
    "Seventeen sheets, every one drawn in this room. Repeatables can be tattooed again; one-offs come down the day they are worn.",
  steps: [
    {
      title: "Send a request",
      text: "Two minutes. Pick a flash design or describe your idea, the placement and a rough size.",
    },
    {
      title: "We reply in three days",
      text: "Your artist answers with a date, a sit time and a quote. No auto-replies.",
    },
    {
      title: "Hold the date",
      text: `An $80 deposit secures the session and comes off the final price.`,
    },
    {
      title: "Stencil on the day",
      text: "We size and place the stencil on you, and move it until it sits right. Then we tattoo.",
    },
  ],
  stepsTitle: "From request to fresh ink",
  artistsTitle: "Four chairs, four hands",
  sizerTitle: "Size it before you book",
  sizerText:
    "Every design page has a stencil sizer. Scale the sheet against the placement, see where the line weight starts to crowd, and send the exact size with your request.",
  statement: "We draw every piece twice — once on paper, once on you.",
  statementText:
    "The flash sheet is where a design starts. The stencil is where it becomes yours: we resize it, turn it with the muscle, and take it off and put it back until you stop frowning at the mirror.",
  fridayTitle: "Flash Friday",
  fridayText:
    "Every Friday from noon, a walk-in sheet of ten small designs at a fixed $120, tattooed first come, first served. Take a numbered ticket at the desk and wander; we text you twenty minutes before your turn.",
  fridayRules: [
    "Ten designs, $120 each, up to 6 cm",
    "Tickets from 11:45, last one at 16:30",
    "18+ with photo ID, one design per person",
  ],
  pricesTitle: "What it costs",
  prices: [
    {
      item: "Shop minimum",
      value: "$120",
      note: "Covers set-up, single-use needles and a small piece",
    },
    {
      item: "Flash",
      value: "From $120",
      note: "Fixed price per sheet at its starting size",
    },
    {
      item: "Custom work",
      value: "$170 / hour",
      note: "Drawing time is free; we charge for the needle only",
    },
    {
      item: "Full day",
      value: "$950 – $1,150",
      note: "Six hours of tattooing, rate set by the artist",
    },
    {
      item: "Deposit",
      value: "$80",
      note: "Holds your date, comes off the final price",
    },
    {
      item: "Touch-up",
      value: "Free",
      note: "Within three months of your session",
    },
  ],
  aftercareTitle: "Healed in about a month",
  aftercareText:
    "Fresh tattoos weep, flake, go cloudy and then settle. Our aftercare guide has a healing clock: tell it when you were tattooed and it tells you what to expect today.",
  reviewsTitle: "From the chair",
  reviews: [
    {
      quote:
        "Idris moved the Orbit stencil four times until the ring sat on my wrist bone. Healed without a single blowout.",
      name: "Jun P.",
      piece: "Orbit, inner forearm",
    },
    {
      quote:
        "I asked Ruth for my grandmother's name and she drew it in her handwriting from an old letter. I cried on the bed.",
      name: "Dolores M.",
      piece: "Custom lettering, collarbone",
    },
    {
      quote:
        "Took ticket number seven on a Friday, got Lantern on my ankle before dinner. Clean room, kind people, no upsell.",
      name: "Sam O.",
      piece: "Lantern, ankle",
    },
  ],
  closeTitle: "Bring an idea, or pick one off the wall.",
  closeText:
    "Requests take two minutes. Your artist replies within three working days.",
};

/* ── Studio ────────────────────────────────────────── */

export const studioPage = {
  title: "A tattoo studio in a former print shop",
  intro:
    "Mara Vey opened Ink in 2016 in the back half of a closed letterpress shop on Calder Lane. The type cases stayed; the presses went; the flash went up where the posters used to dry.",
  story: [
    "Flash — sheets of ready-drawn designs pinned to the wall — is how most people got tattooed for a century. You walked in, pointed, and paid the price written underneath. We still work that way, with one change: every sheet is drawn here, by the artist who will tattoo it, and every design is resized and placed on your body before a needle comes near it.",
    "Custom work sits alongside the flash. Bring a reference, a story, a word, and your artist will draw something new. We don't copy other artists' tattoos — we will happily draw something in the same spirit.",
  ],
  roomTitle: "The room",
  room: [
    {
      title: "Four private stations",
      text: "Screened booths with their own sinks, plus a closed room on request for ribs, thighs and backs.",
    },
    {
      title: "Single-use everything",
      text: "Needles, cartridges, ink caps, gloves and barrier film are opened in front of you and binned after.",
    },
    {
      title: "Licensed and inspected",
      text: "Body art facility licence BA-2291, inspected twice a year by the Eastbrook County health office.",
    },
    {
      title: "Step-free",
      text: "Level entrance from Calder Lane, an accessible restroom and a height-adjustable bed.",
    },
  ],
  guestTitle: "Guest artists",
  guestText:
    "A fifth chair is kept for guests. We host one visiting artist a month, announced in the flash drop email the first Monday of the month.",
  visitTitle: "Find us",
  visitText:
    "Two doors down from the Calder Lane tram stop. Street parking is metered until 19:00; there is a bike rack outside the door.",
};

/* ── Aftercare ─────────────────────────────────────── */

export type HealingStage = {
  from: number;
  to: number;
  title: string;
  looks: string;
  doThis: string[];
};

export const aftercare = {
  title: "Aftercare, day by day",
  intro:
    "A tattoo is an open wound for about two weeks and new skin for about a month. Here is what we tell every client at the end of a session — and what to expect while it heals.",
  stages: [
    {
      from: 0,
      to: 0,
      title: "Session day",
      looks:
        "Raised, red and shiny under a clear film. It may feel like a sunburn.",
      doThis: [
        "Leave the film on. Second-skin film stays 3–5 days; cling wrap comes off after 3 hours.",
        "Drink water, eat, and skip alcohol tonight.",
        "Sleep in loose clothing on clean sheets.",
      ],
    },
    {
      from: 1,
      to: 3,
      title: "Weeping",
      looks:
        "Ink and plasma pool under the film. It looks alarming and is completely normal.",
      doThis: [
        "Keep the film on unless it leaks at the edges.",
        "If it leaks, peel it off under warm running water and wash.",
        "No gym work on the area for 48 hours.",
      ],
    },
    {
      from: 4,
      to: 7,
      title: "Film off, wash and balm",
      looks: "Dull, a little tight, maybe the first flakes at the edges.",
      doThis: [
        "Peel the film off slowly in a warm shower, stretching it along the skin.",
        "Wash with unscented soap, pat dry with paper towel.",
        "A thin layer of balm two or three times a day — thin enough to rub in completely.",
      ],
    },
    {
      from: 8,
      to: 14,
      title: "Flaking and itching",
      looks:
        "Peels like a sunburn. Flakes may carry colour — that is surface ink, not your tattoo.",
      doThis: [
        "Don't pick and don't scratch. Tap it or hold a cool cloth on it.",
        "Keep washing and moisturising.",
        "Still no baths, pools, sea or sauna.",
      ],
    },
    {
      from: 15,
      to: 30,
      title: "Milky skin",
      looks: "Cloudy and slightly shiny. New skin is settling over the ink.",
      doThis: [
        "Swimming is fine from day 15.",
        "Keep it out of strong sun, or covered, until day 30.",
        "Moisturise once a day.",
      ],
    },
    {
      from: 31,
      to: Infinity,
      title: "Settled",
      looks:
        "Crisp and true to colour. This is what it will look like for years.",
      doThis: [
        "Book your free touch-up if anything healed patchy — within three months.",
        "SPF 50 on it whenever it sees the sun, for life.",
        "Send us a healed photo. We pin them next to the sheet.",
      ],
    },
  ] satisfies HealingStage[],
  avoid: [
    "Baths, pools, the sea, hot tubs and saunas for two weeks",
    "Direct sun and sunbeds for four weeks",
    "Tight clothing, straps and watchbands rubbing the area",
    "Scented lotion, petroleum jelly and antiseptic creams",
    "Pets on the bed while it is still open",
  ],
  warning:
    "Spreading redness, heat or swelling after day three, a fever, or any yellow-green discharge are signs of infection. See a doctor first, then call us.",
  kit: [
    { item: "Second-skin film", note: "Applied in the studio" },
    { item: "Unscented balm, 30 ml", note: "Enough for the full month" },
    { item: "Printed day-by-day card", note: "This page, on paper" },
  ],
};

/* ── FAQ & policies ────────────────────────────────── */

export const faqPage = {
  title: "Questions & studio policies",
  intro:
    "The short answers to what people ask at the desk. Anything else: write to us and a person answers.",
  groups: [
    {
      title: "Booking",
      items: [
        {
          q: "How far ahead are you booked?",
          a: "Idris, Teo and Ruth usually have dates two to four weeks out. Mara keeps a waitlist for custom work; her flash is booked like everyone else's.",
        },
        {
          q: "Do you take walk-ins?",
          a: "On Fridays, yes: Flash Friday runs 12:00 – 18:00 with a fixed sheet of small designs at $120. The rest of the week is by appointment.",
        },
        {
          q: "Can I change a flash design?",
          a: "Small changes, yes — size, angle, swapping red for black, dropping an element. Larger changes turn it into custom work, priced by the hour.",
        },
        {
          q: "Will you copy a tattoo I found online?",
          a: "No. Tattoos belong to the people who drew them. Bring it as a reference and we will draw something new in the same spirit.",
        },
        {
          q: "Do you do cover-ups?",
          a: "Mara and Teo take cover-ups after a consult, in person, so they can see how dark the old ink is. Send a photo in natural light with your request.",
        },
      ],
    },
    {
      title: "Money",
      items: [
        {
          q: "How does the deposit work?",
          a: "An $80 deposit holds your date and comes off the final price. It is non-refundable but can move to a new date once with 72 hours' notice.",
        },
        {
          q: "How do you price?",
          a: "Flash has a fixed price at its starting size and scales with size. Custom work is $170 an hour of tattooing; drawing time is free. Your quote is confirmed before you pay a deposit.",
        },
        {
          q: "How can I pay?",
          a: "Cards, cash or bank transfer. We don't charge a card fee.",
        },
        {
          q: "Should I tip?",
          a: "Never expected. If you want to, it goes to your artist in full.",
        },
      ],
    },
    {
      title: "On the day",
      items: [
        {
          q: "What should I bring?",
          a: "Photo ID, something to eat, water, and clothes that leave the placement easy to reach. Headphones are welcome.",
        },
        {
          q: "Can I bring a friend?",
          a: "One person, yes. Stations are small and other people are being tattooed.",
        },
        {
          q: "Can I use numbing cream?",
          a: "Tell us when you book. Some creams change how the skin takes ink, so your artist will say which one and when.",
        },
        {
          q: "Does it hurt?",
          a: "Yes, a bit, and less than you expect on most placements. Ribs, sternum, ankles and the back of the knee are the slow ones. Ask for a break any time.",
        },
      ],
    },
  ],
  policiesTitle: "Policies",
  policies: [
    {
      term: "Age",
      detail:
        "18 and over, with a valid photo ID on the day. No exceptions, including with a parent.",
    },
    {
      term: "Deposits",
      detail: "$80 per session, non-refundable, deducted from the final price.",
    },
    {
      term: "Rescheduling",
      detail:
        "Once, with at least 72 hours' notice, without losing your deposit.",
    },
    {
      term: "Lateness",
      detail:
        "We wait 20 minutes. After that the session may be shortened or the deposit forfeited.",
    },
    {
      term: "Health",
      detail:
        "We won't tattoo during pregnancy, over broken or sunburnt skin, or after alcohol. Tell us about blood thinners or skin conditions when you book.",
    },
    {
      term: "Touch-ups",
      detail:
        "Free within three months of your session, if the aftercare was followed.",
    },
  ],
};

/* ── Booking ───────────────────────────────────────── */

export const bookingPage = {
  title: "Request a booking",
  intro:
    "Tell us what you want, where it goes and roughly how big. Your artist replies within three working days with a date and a quote. Nothing is charged until you agree to a deposit.",
  days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  successTitle: "Request received",
  successText:
    "Your artist will reply by email within three working days with a date, a sit time and a quote.",
  demoNote:
    "This is a demo: nothing is sent or stored, and no deposit is taken.",
};

/* ── Footer ────────────────────────────────────────── */

export const footer = {
  blurb:
    "A four-artist tattoo studio on Calder Lane. Flash, custom work and Flash Friday walk-ins.",
  newsletterTitle: "Flash drops",
  newsletterText:
    "New sheets and guest artists, the first Monday of the month. One email, no promotions.",
};
