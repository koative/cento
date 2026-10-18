/*
 * Heirloom — every word, price and record the site shows lives here.
 * Rebranding the template means editing this one file.
 */

import solitaireOnFelt from "./assets/solitaire-on-felt.jpg";
import sapphireSundial from "./assets/sapphire-sundial.jpg";
import princessCut from "./assets/princess-cut.jpg";
import theBench from "./assets/the-bench.jpg";
import eligius from "./assets/eligius-workshop.jpg";
import joailliers from "./assets/joailliers-etching.jpg";

export type Metal = "yellow" | "rose" | "platinum";
export type Gem = "diamond" | "sapphire" | "emerald" | "morganite";
export type Cut = "round" | "oval" | "emerald" | "cushion" | "pear";
export type Kind =
  | "solitaire"
  | "trilogy"
  | "halo"
  | "band"
  | "eternity"
  | "signet"
  | "studs"
  | "drops"
  | "pendant"
  | "loose";
export type BandDetail = "court" | "knife" | "milgrain";

/** What the drawing plate renders: the piece's form, its stone and the band finish. */
export type Art = {
  kind: Kind;
  gem?: Gem;
  cut?: Cut;
  carat?: number;
  band?: BandDetail;
};

export type CollectionId =
  "engagement" | "wedding" | "signets" | "earrings" | "pendants";

export type Piece = {
  slug: string;
  name: string;
  collection: CollectionId;
  art: Art;
  /** Price in 18k yellow gold; other metals add metals[m].surcharge. */
  price: number;
  metals: Metal[];
  /** ring: US sizes; chain: chain length; none: one size. */
  sizing: "ring" | "chain" | "none";
  /** inside: a band inscription; face: initials cut into a signet face. */
  engraving?: "inside" | "face";
  lead: string;
  isNew?: boolean;
  /** Lower ranks lead the "Featured" sort. */
  rank: number;
  summary: string;
  story: string;
  specs: [string, string][];
};

export const brand = {
  name: "Heirloom",
  sector: "Jewelry atelier",
  tagline:
    "Rings and jewels made by hand, to be worn for a lifetime and handed on.",
  email: "atelier@heirloom.example",
  phone: "+1 555 014 2290",
  phoneHref: "tel:+15550142290",
  street: "Second floor, 18 Larkspur Arcade",
  city: "Providence, RI 02903",
  hours: [
    ["Tuesday – Friday", "11:00 – 19:00"],
    ["Saturday", "10:00 – 17:00"],
    ["Sunday & Monday", "At the bench, closed to visitors"],
  ] as [string, string][],
  founded: 1987,
};

export const nav = [
  { to: "/collections", label: "Collections" },
  { to: "/ring-builder", label: "Ring builder" },
  { to: "/bespoke", label: "Bespoke" },
  { to: "/atelier", label: "Atelier" },
  { to: "/care", label: "Care & sizing" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

export const images = {
  solitaire: {
    src: solitaireOnFelt,
    width: 1800,
    height: 1205,
    alt: "A yellow gold solitaire ring with a four-claw round diamond resting on dark felt",
  },
  sundial: {
    src: sapphireSundial,
    width: 1600,
    height: 1067,
    alt: "A white gold ring with a blue sapphire and leaf-carved shoulders, hooked over the gnomon of a stone sundial",
  },
  princess: {
    src: princessCut,
    width: 1400,
    height: 1050,
    alt: "Close view of a square princess-cut diamond held by four rounded claws",
  },
  bench: {
    src: theBench,
    width: 1400,
    height: 998,
    alt: "A jeweller's bench with its curved cut-out, burrs, files, pliers and a lamp over a white board",
  },
  eligius: {
    src: eligius,
    width: 1400,
    height: 907,
    alt: "Fifteenth-century engraving of Saint Eligius seated at a goldsmith's workshop bench among apprentices and tools",
  },
  joailliers: {
    src: joailliers,
    width: 1300,
    height: 1063,
    alt: "Etching of two jewellers bent over a shared bench under an arched window, a water globe lens between them",
  },
};

export const metals: Record<
  Metal,
  { name: string; short: string; surcharge: number; note: string }
> = {
  yellow: {
    name: "18k yellow gold",
    short: "Yellow gold",
    surcharge: 0,
    note: "Recycled 18k gold alloyed in-house to a warm, buttery tone.",
  },
  rose: {
    name: "18k rose gold",
    short: "Rose gold",
    surcharge: 0,
    note: "A copper-rich 18k alloy that deepens gently with wear.",
  },
  platinum: {
    name: "Platinum 950",
    short: "Platinum",
    surcharge: 420,
    note: "Dense, naturally white and hypoallergenic; holds a claw setting for decades.",
  },
};

export const gems: Record<
  Gem,
  { name: string; note: string; perCarat: number }
> = {
  diamond: {
    name: "Diamond",
    note: "Recut and reclaimed diamonds, or new stones with a named mine of origin.",
    perCarat: 4200,
  },
  sapphire: {
    name: "Sapphire",
    note: "Unheated Montana and Sri Lankan sapphires in cornflower to midnight blue.",
    perCarat: 2100,
  },
  emerald: {
    name: "Emerald",
    note: "Colombian emeralds with lightly oiled, documented clarity.",
    perCarat: 2600,
  },
  morganite: {
    name: "Morganite",
    note: "Peach-pink beryl from Minas Gerais; soft colour, bright cut.",
    perCarat: 640,
  },
};

export const cuts: Record<Cut, string> = {
  round: "Round brilliant",
  oval: "Oval",
  emerald: "Emerald-cut",
  cushion: "Cushion",
  pear: "Pear",
};

export const collections: {
  id: CollectionId;
  name: string;
  title: string;
  intro: string;
}[] = [
  {
    id: "engagement",
    name: "Engagement",
    title: "Engagement rings",
    intro:
      "Solitaires, trilogies and halos, each drawn at the bench and set by the same hands that fit it.",
  },
  {
    id: "wedding",
    name: "Wedding bands",
    title: "Wedding bands",
    intro:
      "Court, knife-edge and milgrain bands that sit flush beside our engagement rings, or stand on their own.",
  },
  {
    id: "signets",
    name: "Signets",
    title: "Signet rings",
    intro:
      "Solid signets with faces left smooth for initials or a family crest, cut by our engraver.",
  },
  {
    id: "earrings",
    name: "Earrings",
    title: "Earrings",
    intro: "Studs for every day and drops for the evenings that need them.",
  },
  {
    id: "pendants",
    name: "Pendants",
    title: "Pendants",
    intro:
      "Single stones on fine trace chain, made to be layered or worn alone.",
  },
];

export const ringSizes = [
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
];
export const chainLengths = ["16 in", "18 in", "20 in"];

export const pieces: Piece[] = [
  {
    slug: "the-ardent",
    name: "The Ardent",
    collection: "engagement",
    art: { kind: "solitaire", gem: "diamond", cut: "round", carat: 0.7 },
    price: 4850,
    metals: ["yellow", "rose", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 4 weeks",
    rank: 1,
    summary:
      "A 0.70 ct round brilliant held high in four slender claws on a 2 mm court band.",
    story:
      "The Ardent is the ring we are asked for most, and the one we have refined longest. The claws are hand-filed to a soft point so they catch light rather than sleeves, and the basket is cut low enough that a wedding band sits flush beneath it.",
    specs: [
      ["Centre stone", "0.70 ct round brilliant diamond, G colour, VS1"],
      ["Setting", "Four-claw basket, hand-filed tips"],
      ["Band", "2.0 mm court profile"],
      ["Hallmark", "Assayed and stamped with the Heirloom maker's mark"],
    ],
  },
  {
    slug: "the-vesper",
    name: "The Vesper",
    collection: "engagement",
    art: { kind: "solitaire", gem: "sapphire", cut: "oval", carat: 1.2 },
    price: 3900,
    metals: ["yellow", "rose", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 5 weeks",
    isNew: true,
    rank: 2,
    summary:
      "An unheated 1.20 ct oval sapphire, the colour of late evening, in a six-claw setting.",
    story:
      "Named for the hour the stone most resembles. We buy Vesper sapphires one at a time from a cutter in Helena, and each ring is drawn around the stone it will hold, so no two are quite the same length.",
    specs: [
      ["Centre stone", "1.20 ct oval sapphire, unheated, Montana"],
      ["Setting", "Six-claw, cathedral shoulders"],
      ["Band", "1.8 mm court profile"],
      ["Stone report", "Independent laboratory report included"],
    ],
  },
  {
    slug: "the-linden",
    name: "The Linden",
    collection: "engagement",
    art: { kind: "trilogy", gem: "diamond", cut: "emerald", carat: 1.0 },
    price: 6400,
    metals: ["yellow", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 6 weeks",
    rank: 3,
    summary:
      "A 1.00 ct emerald-cut diamond between two matched step-cut side stones.",
    story:
      "Three stones for past, present and what comes next, as the old trilogy rings had it. The Linden's step cuts are matched by eye on our light table so the long flashes line up across all three.",
    specs: [
      ["Centre stone", "1.00 ct emerald-cut diamond, F colour, VS2"],
      ["Side stones", "Two step-cut diamonds, 0.40 ct total"],
      ["Setting", "Double claw on each corner"],
      ["Band", "2.2 mm flat court"],
    ],
  },
  {
    slug: "the-lantern",
    name: "The Lantern",
    collection: "engagement",
    art: { kind: "halo", gem: "morganite", cut: "cushion", carat: 1.5 },
    price: 3250,
    metals: ["rose", "yellow", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 5 weeks",
    rank: 5,
    summary:
      "A peach cushion morganite ringed with a halo of tiny grain-set diamonds.",
    story:
      "The halo here is not there to make the stone look bigger. It frames the soft pink of the morganite the way a lantern frames a flame, and each of its twenty diamonds is raised on a single bead of gold.",
    specs: [
      ["Centre stone", "1.50 ct cushion morganite, Minas Gerais"],
      ["Halo", "20 round diamonds, 0.18 ct total, grain-set"],
      ["Band", "1.8 mm court profile"],
      ["Finish", "High polish with satin gallery"],
    ],
  },
  {
    slug: "hearth-band",
    name: "Hearth Band",
    collection: "wedding",
    art: { kind: "band", band: "court" },
    price: 980,
    metals: ["yellow", "rose", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Ready to ship in 5 days",
    rank: 4,
    summary:
      "A 3 mm comfort-fit court band, rounded inside and out. The ring you forget you are wearing.",
    story:
      "Hand-forged from a single bar rather than cast, so the metal is denser and takes a deeper polish. Every Hearth Band is hallmarked on the inside, beside room for up to eighteen engraved characters.",
    specs: [
      ["Width", "3.0 mm"],
      ["Profile", "Comfort-fit court"],
      ["Construction", "Forged from bar, single solder seam"],
      ["Engraving", "Up to 18 characters, complimentary"],
    ],
  },
  {
    slug: "thread-band",
    name: "Thread Band",
    collection: "wedding",
    art: { kind: "band", band: "milgrain" },
    price: 1150,
    metals: ["yellow", "platinum"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 2 weeks",
    rank: 7,
    summary:
      "A slim band edged with milgrain beading, rolled by hand one bead at a time.",
    story:
      "Milgrain was the finishing stroke of Edwardian jewellers. We roll it with the same knurled wheel, so the beads soften the edge of the band and catch light like stitching.",
    specs: [
      ["Width", "2.4 mm"],
      ["Profile", "Flat with milgrain edges"],
      ["Construction", "Forged, hand-rolled milgrain"],
      ["Pairs with", "The Ardent, The Vesper"],
    ],
  },
  {
    slug: "the-procession",
    name: "The Procession",
    collection: "wedding",
    art: { kind: "eternity", gem: "diamond", cut: "round" },
    price: 2600,
    metals: ["platinum", "yellow", "rose"],
    sizing: "ring",
    engraving: "inside",
    lead: "Made to order in 4 weeks",
    isNew: true,
    rank: 6,
    summary:
      "Eleven round diamonds in a half-eternity line, each in its own shared-claw cup.",
    story:
      "A half-eternity keeps the stones where they are seen and leaves the palm side plain, so the band can still be resized. The Procession's stones are matched for colour across the whole run.",
    specs: [
      ["Stones", "11 round brilliant diamonds, 0.55 ct total"],
      ["Setting", "Shared-claw, half eternity"],
      ["Width", "2.5 mm"],
      ["Resizing", "Possible up or down one size"],
    ],
  },
  {
    slug: "cartouche-signet",
    name: "Cartouche Signet",
    collection: "signets",
    art: { kind: "signet" },
    price: 1850,
    metals: ["yellow", "rose", "platinum"],
    sizing: "ring",
    engraving: "face",
    lead: "Made to order in 3 weeks",
    rank: 8,
    summary:
      "An oval-faced signet with a heavy shank, its face waiting for your initials.",
    story:
      "Our engraver cuts signet faces by hand with a graver, never a laser, so the letters have the slight swell and taper of real cutting. Add up to three initials and we will draw them in our Roman capitals.",
    specs: [
      ["Face", "14 × 11 mm oval"],
      ["Shank", "Tapered, 4 mm at the base"],
      ["Engraving", "Up to 3 initials, hand-cut"],
      ["Weight", "Approx. 9 g in 18k gold"],
    ],
  },
  {
    slug: "little-seal",
    name: "Little Seal",
    collection: "signets",
    art: { kind: "signet" },
    price: 1380,
    metals: ["yellow", "rose"],
    sizing: "ring",
    engraving: "face",
    lead: "Made to order in 3 weeks",
    rank: 11,
    summary:
      "A smaller signet for the little finger, light enough to stack beside a band.",
    story:
      "The Little Seal began as a commission for a grandmother's ninetieth birthday: her initials, her daughter's and her granddaughter's on three matching rings. It has been in the collection ever since.",
    specs: [
      ["Face", "10 × 8 mm oval"],
      ["Shank", "Tapered, 3 mm at the base"],
      ["Engraving", "Up to 3 initials, hand-cut"],
      ["Weight", "Approx. 5 g in 18k gold"],
    ],
  },
  {
    slug: "dewpoint-studs",
    name: "Dewpoint Studs",
    collection: "earrings",
    art: { kind: "studs", gem: "diamond", cut: "round", carat: 0.25 },
    price: 1950,
    metals: ["yellow", "platinum"],
    sizing: "none",
    lead: "Ready to ship in 5 days",
    rank: 9,
    summary:
      "A pair of 0.25 ct diamonds in low four-claw settings with screw backs.",
    story:
      "The everyday earrings people forget to take off. The settings sit close to the lobe, and the screw backs mean a dropped stud stays on the post instead of rolling under the bed.",
    specs: [
      ["Stones", "Two 0.25 ct round diamonds, matched"],
      ["Setting", "Four-claw, low profile"],
      ["Fastening", "18k screw posts and backs"],
      ["Diameter", "4.1 mm per stud"],
    ],
  },
  {
    slug: "orchard-drops",
    name: "Orchard Drops",
    collection: "earrings",
    art: { kind: "drops", gem: "emerald", cut: "pear", carat: 0.6 },
    price: 2750,
    metals: ["yellow", "rose"],
    sizing: "none",
    lead: "Made to order in 4 weeks",
    isNew: true,
    rank: 10,
    summary:
      "Pear-shaped Colombian emeralds swinging from a small diamond, on fine hooks.",
    story:
      "A pair cut to hang the way fruit does, heaviest at the bottom. The emeralds are bezel-set so their edges are protected, and the hooks have a hidden catch.",
    specs: [
      ["Stones", "Two 0.60 ct pear emeralds, Colombia"],
      ["Accent", "Two 0.05 ct round diamonds"],
      ["Setting", "Rubbed bezel"],
      ["Drop length", "28 mm"],
    ],
  },
  {
    slug: "plumb-pendant",
    name: "Plumb Pendant",
    collection: "pendants",
    art: { kind: "pendant", gem: "sapphire", cut: "round", carat: 0.8 },
    price: 1420,
    metals: ["yellow", "rose", "platinum"],
    sizing: "chain",
    lead: "Ready to ship in 5 days",
    rank: 12,
    summary:
      "A round sapphire in a fine bezel, hung like a plumb line on trace chain.",
    story:
      "Made from the offcuts of our ring-making: the bezel is drawn from the same wire as our claws and the chain is soldered link by link at the bench, so it will not kink.",
    specs: [
      ["Stone", "0.80 ct round sapphire, Sri Lanka"],
      ["Setting", "Rubbed bezel with open back"],
      ["Chain", "1.1 mm trace, spring-ring clasp"],
      ["Pendant height", "9 mm with bail"],
    ],
  },
  {
    slug: "vigil-pendant",
    name: "Vigil Pendant",
    collection: "pendants",
    art: { kind: "pendant", gem: "morganite", cut: "cushion", carat: 1.1 },
    price: 980,
    metals: ["rose", "yellow"],
    sizing: "chain",
    lead: "Made to order in 2 weeks",
    isNew: true,
    rank: 13,
    summary:
      "A cushion morganite in a rose gold collet, the soft pink of a lamp left on.",
    story:
      "We designed the Vigil for people who wanted a first piece of fine jewellery that did not feel like a first piece. The collet is closed at the back with a pierced window, so light still reaches the stone.",
    specs: [
      ["Stone", "1.10 ct cushion morganite, Minas Gerais"],
      ["Setting", "Collet with pierced back"],
      ["Chain", "1.1 mm trace, spring-ring clasp"],
      ["Pendant height", "11 mm with bail"],
    ],
  },
];

/* ——— Ring builder ——— */

export const builder = {
  title: "Ring builder",
  intro:
    "Draw your engagement ring the way we would at the bench: choose a setting, a stone and its cut, the weight, the metal, then the words inside. The plate redraws as you go and the price follows.",
  settings: [
    {
      id: "solitaire" as const,
      name: "Solitaire",
      note: "One stone, four claws",
      base: 1650,
    },
    {
      id: "trilogy" as const,
      name: "Trilogy",
      note: "Centre stone with two side stones",
      base: 2450,
    },
    {
      id: "halo" as const,
      name: "Halo",
      note: "Centre stone in a ring of pavé",
      base: 2250,
    },
  ],
  bands: [
    { id: "court" as const, name: "Court", note: "Rounded, comfortable" },
    { id: "knife" as const, name: "Knife-edge", note: "A crisp centre ridge" },
    {
      id: "milgrain" as const,
      name: "Milgrain",
      note: "Beaded edges, +$180",
      extra: 180,
    },
  ],
  carat: { min: 0.5, max: 2.5, step: 0.1 },
  engravingMax: 18,
  lead: "Made to order in 6 weeks, including a fitting appointment.",
};

/* ——— Home ——— */

export const home = {
  title: "Made once, kept for generations",
  intro:
    "Heirloom is a small jewellery atelier above an arcade in Providence. Six benches, one engraver and a drawer of stones. We make engagement rings, wedding bands and signets by hand, and reset the jewels you inherit.",
  heroCaption:
    "The Ardent in 18k yellow gold, 0.70 ct round brilliant. From $4,850.",
  featuredTitle: "At the bench this season",
  builderTitle: "Draw your own ring",
  builderText:
    "Six choices stand between you and a drawing our makers can work from. Change the stone and the plate redraws; change the metal and the light shifts. Save it to your bag or bring it to a consultation.",
  processTitle: "How a bespoke ring is made",
  processText:
    "From the first conversation to the hallmark, a commission takes eight to twelve weeks, and you see it at every stage.",
  heirloomTitle: "Bring us what you inherited",
  heirloomText:
    "A grandmother's sapphire with a worn-through shank. Three mismatched wedding bands. A brooch nobody wears. We take inherited jewels apart with care, test and clean every stone, and redraw them into something you will put on every morning. The old gold can be melted into the new piece, so nothing that mattered is lost.",
  quote: {
    text: "They kept the claws from my mother's ring and built the new one around them. You can't see them unless you know, and I know.",
    by: "Ruth A., remodel commission, 2024",
  },
  atelierTitle: "Six benches, one long window",
  atelierText:
    "The atelier has been on the second floor of the Larkspur Arcade since 1987. Visitors are welcome by appointment: you will sit at the consultation table in front of the benches, and you may watch your stone being set.",
  promises: [
    [
      "Recycled gold",
      "Every gram of our gold and platinum is refined from reclaimed metal and alloyed in the atelier.",
    ],
    [
      "Named stones",
      "We tell you where each stone was mined or who cut it, and we turn away stones we cannot trace.",
    ],
    [
      "Lifetime care",
      "Free cleaning, claw checks and re-polishing for as long as you own the piece, wherever you bought it from us.",
    ],
    [
      "Hallmarked",
      "Every piece is assayed and stamped with our maker's mark, the metal and the year.",
    ],
  ] as [string, string][],
  closeTitle: "Come and sit at the bench",
  closeText:
    "Consultations are unhurried, free and never come with a sales target. Bring a ring you love, a photograph, or nothing at all.",
};

/* ——— Bespoke ——— */

export const bespoke = {
  title: "Bespoke commissions",
  intro:
    "A bespoke piece begins with a conversation and ends with a hallmark. In between, you see a painted drawing, choose your stone in person and try on a wax model before any gold is cut.",
  stages: [
    {
      name: "Conversation",
      weeks: "Week 1",
      text: "An hour at the consultation table, or on video. We talk about the person, the hand, the budget and the life the ring will lead.",
    },
    {
      name: "Painted drawing",
      weeks: "Weeks 1–2",
      text: "Our designer paints the piece in gouache on toned card, front and side, at three times life size. Revisions are free until it feels right.",
    },
    {
      name: "Choosing the stone",
      weeks: "Weeks 2–4",
      text: "We call in three to five stones that fit the drawing and your budget. You compare them under daylight and our lamp before choosing one.",
    },
    {
      name: "Wax model",
      weeks: "Week 5",
      text: "A carved wax of the ring, on your finger. It is the moment to check height, width and how it sits beside a band.",
    },
    {
      name: "Making and setting",
      weeks: "Weeks 6–9",
      text: "The ring is cast or forged, then filed, fitted and set at a single bench by a single maker, whose initials are stamped beside ours.",
    },
    {
      name: "Hallmark and handover",
      weeks: "Weeks 10–12",
      text: "Assayed and hallmarked, photographed for your records, then handed over in the atelier or sent by insured courier.",
    },
  ],
  remodelTitle: "Remodelling inherited jewellery",
  remodelText: [
    "Most of our commissions now begin with a box of family jewellery. We test every metal, measure and grade each stone, and tell you honestly what can be saved.",
    "Your old gold can be refined and alloyed into the new piece. Stones are re-polished where they are chipped and recut only with your agreement. Nothing leaves the atelier, and you get back every scrap we do not use.",
  ],
  pricingTitle: "What a commission costs",
  pricingNote:
    "Guide prices for 18k gold, before stones. Your quote is written after the drawing and does not change once accepted.",
  pricing: [
    ["Engagement ring, bespoke design", "from $3,800"],
    ["Wedding band, bespoke profile", "from $1,100"],
    ["Remodel using your stones and gold", "from $1,200"],
    ["Hand-engraved signet with crest", "from $2,400"],
    ["Painted design drawing only", "$350, credited to the commission"],
  ] as [string, string][],
  faqs: [
    {
      q: "How much should I budget?",
      a: "Tell us the number you are comfortable with and we will design to it. Many of our engagement commissions are between $4,000 and $9,000 including the stone, but we have made lovely rings for less.",
    },
    {
      q: "Can I bring my own stone?",
      a: "Yes. We test and photograph it in front of you, confirm it can take the setting you want, and insure it while it is with us.",
    },
    {
      q: "Do I need to visit in person?",
      a: "No. About a third of our clients commission by video and post. We send a sizing set, painted drawings by courier and stones in a sealed viewing box.",
    },
    {
      q: "What if the ring needs changing later?",
      a: "Resizing within the first year is free, and claws are checked and re-tipped at no cost for the life of the ring.",
    },
    {
      q: "How is the deposit handled?",
      a: "Forty percent once you accept the written quote, the balance at handover. If you decide not to go ahead after the drawing, you only pay for the drawing.",
    },
  ],
};

/* ——— Atelier (about) ——— */

export const atelier = {
  title: "The atelier",
  intro:
    "Heirloom was founded in 1987 by Margit Halloran, a goldsmith trained in Pforzheim, at a single rented bench in the Larkspur Arcade. Her daughter Thea runs it now, from the same room, which has slowly filled with five more benches.",
  saintTitle: "Saint Eligius, patron of goldsmiths",
  saintText:
    "A print of this fifteenth-century engraving hangs above the polishing motor. It shows Eligius, the goldsmith who became a bishop, at a bench very like ours: tools racked along the wall, apprentices at the end of the table, a dog underfoot. Not much in the trade has changed, and we like it that way.",
  benchTitle: "The bench",
  benchText:
    "A jeweller's bench is cut with a curve so the maker sits inside it, with a wooden peg at the centre for filing and a leather skin underneath to catch every filing of gold. Ours are swept each night, and the sweepings are refined twice a year.",
  makers: [
    {
      name: "Thea Halloran",
      role: "Director and stone buyer",
      since: 2006,
      note: "Chooses every stone we set, and still makes the occasional Ardent.",
    },
    {
      name: "Margit Halloran",
      role: "Founder",
      since: 1987,
      note: "Retired from the bench, but not from Saturday mornings at the consultation table.",
    },
    {
      name: "Osei Mensah-Clark",
      role: "Head goldsmith",
      since: 2009,
      note: "Forges every Hearth Band from bar and trains our apprentices.",
    },
    {
      name: "Ines Varga",
      role: "Setter",
      since: 2014,
      note: "Sets the halos, the eternity bands and anything with more than ten stones.",
    },
    {
      name: "Daniel Okafor",
      role: "Engraver",
      since: 2017,
      note: "Hand-cuts signet faces and inscriptions, and paints our design drawings.",
    },
    {
      name: "Priya Raman",
      role: "Apprentice goldsmith",
      since: 2023,
      note: "Third year of four; responsible for most of our milgrain.",
    },
  ],
  values: [
    [
      "Metal",
      "Recycled 18k gold and platinum from a refiner in Attleboro, alloyed by us. Bench sweepings go back into the loop.",
    ],
    [
      "Stones",
      "Reclaimed diamonds recut in New York, and coloured stones bought from cutters we have visited. Every stone has a written origin.",
    ],
    [
      "Making",
      "Every piece is finished at one bench by one maker. Their initials are stamped inside, beside ours.",
    ],
    [
      "Repair",
      "We repair anything we have made, free of charge for claws and polish, at cost for anything else, for as long as we are here.",
    ],
  ] as [string, string][],
};

/* ——— Appointments ——— */

export const appointments = {
  title: "Book an appointment",
  intro:
    "Consultations are free, last about an hour and are held at the consultation table in front of the benches, or by video. Choose what you would like to talk about and we will have the right stones and drawings out.",
  types: [
    {
      id: "engagement",
      name: "Engagement consultation",
      length: "60 min",
      note: "Try on settings, compare stones under our lamp.",
    },
    {
      id: "bespoke",
      name: "Bespoke design session",
      length: "90 min",
      note: "Sketch a commission with our designer.",
    },
    {
      id: "remodel",
      name: "Heirloom assessment",
      length: "45 min",
      note: "Bring inherited pieces for testing and ideas.",
    },
    {
      id: "care",
      name: "Resizing and care",
      length: "20 min",
      note: "Sizing, claw checks, cleaning and repairs.",
    },
  ],
  slots: ["11:00", "12:30", "14:00", "15:30", "17:00"],
  bring: [
    "Any rings you wear often, so we can size against them",
    "Photographs of pieces you love, saved or torn out",
    "Inherited jewellery, even if it is broken",
  ],
};

/* ——— Care & sizing ——— */

export const care = {
  title: "Care & sizing",
  intro:
    "How to find a ring size at home, how to look after fine jewellery, and what we promise once a piece is yours.",
  sizes: [
    ["4", "14.9", "46.8", "H½", "47"],
    ["4.5", "15.3", "48.0", "I½", "48"],
    ["5", "15.7", "49.3", "J½", "49"],
    ["5.5", "16.1", "50.6", "K½", "51"],
    ["6", "16.5", "51.9", "L½", "52"],
    ["6.5", "16.9", "53.1", "M½", "53"],
    ["7", "17.3", "54.4", "N½", "54"],
    ["7.5", "17.7", "55.7", "O½", "56"],
    ["8", "18.1", "57.0", "P½", "57"],
    ["8.5", "18.5", "58.3", "Q½", "58"],
    ["9", "18.9", "59.5", "R½", "59"],
    ["9.5", "19.4", "60.8", "S½", "61"],
    ["10", "19.8", "62.1", "T½", "62"],
  ] as [string, string, string, string, string][],
  sizingTips: [
    "Measure the inside diameter of a ring that fits the right finger, edge to edge, in millimetres.",
    "Fingers swell in warmth and late in the day; measure at room temperature in the afternoon.",
    "Wide bands (over 4 mm) fit tighter, so go up a quarter to half a size.",
    "Unsure? Order our free sizing set by post, or let us resize once in the first year at no cost.",
  ],
  careGuide: [
    [
      "Every day",
      "Take rings off for gardening, gym work, cleaning products and swimming pools. Chlorine is unkind to gold alloys.",
    ],
    [
      "Every month",
      "Soak in warm water with a drop of washing-up liquid, brush behind the stone with a soft toothbrush, rinse and pat dry.",
    ],
    [
      "Every year",
      "Bring or post pieces back for a free claw check, ultrasonic clean and polish. It takes us about twenty minutes.",
    ],
    [
      "Storing",
      "Keep pieces apart in the pouches they came in. Diamonds scratch gold, and gold scratches pearls.",
    ],
  ] as [string, string][],
  faqs: [
    {
      q: "What does the warranty cover?",
      a: "Manufacturing faults for life. Claw re-tipping, cleaning and polishing are free for the life of the piece; accidental damage is repaired at cost.",
    },
    {
      q: "Can I return a piece?",
      a: "Unworn, unengraved pieces from the collections can be returned within 30 days for a full refund. Engraved and bespoke pieces are made for you and cannot be returned, but we will always resize them.",
    },
    {
      q: "How are orders delivered?",
      a: "By insured, signature-on-delivery courier in plain packaging, free within the United States. You can also collect from the atelier.",
    },
    {
      q: "Do you resize rings bought elsewhere?",
      a: "Yes, for gold and platinum rings without stones all the way round. Bring it to a resizing appointment for a quote.",
    },
  ],
};

/* ——— Commerce ——— */

export const shipping = [
  {
    id: "courier",
    name: "Insured courier",
    note: "2–3 working days after making, signature required",
    price: 0,
  },
  {
    id: "express",
    name: "Insured express",
    note: "Next working day after making",
    price: 45,
  },
  {
    id: "collect",
    name: "Collect from the atelier",
    note: "We fit and polish it in front of you",
    price: 0,
  },
];

export const giftWrap = {
  name: "Walnut ring box and hand-written card",
  price: 25,
};

export const newsletter = {
  title: "Letters from the bench",
  text: "Four letters a year: new stones in the drawer, a piece we have just finished, and the dates of our open evenings.",
};

export const footerColumns = [
  {
    title: "Collections",
    links: [
      { to: "/collections", label: "All pieces" },
      { to: "/collections/engagement", label: "Engagement" },
      { to: "/collections/wedding", label: "Wedding bands" },
      { to: "/collections/signets", label: "Signets" },
      { to: "/collections/earrings", label: "Earrings" },
      { to: "/collections/pendants", label: "Pendants" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { to: "/ring-builder", label: "Ring builder" },
      { to: "/bespoke", label: "Bespoke" },
      { to: "/atelier", label: "Our atelier" },
      { to: "/appointments", label: "Appointments" },
      { to: "/care", label: "Care & sizing" },
      { to: "/cart", label: "Your bag" },
    ],
  },
];
