import rainbowStacker from "./assets/rainbow-stacker.jpg";
import peckingBirds from "./assets/pecking-birds.jpg";
import dumpTruck from "./assets/dump-truck.jpg";
import chunkyBricks from "./assets/chunky-bricks.jpg";
import tinTop from "./assets/tin-top.jpg";
import tinTop2 from "./assets/tin-top-2.jpg";
import stripedTop from "./assets/striped-top.jpg";
import bears from "./assets/bears.jpg";
import redEngine from "./assets/red-engine.jpg";
import trackLoop from "./assets/track-loop.jpg";
import trackBridge from "./assets/track-bridge.jpg";
import pushCars from "./assets/push-cars.jpg";
import xylophone from "./assets/xylophone.jpg";
import pegDolls from "./assets/peg-dolls.jpg";
import gamePawns from "./assets/game-pawns.jpg";
import teethingShapes from "./assets/teething-shapes.jpg";
import ballRun from "./assets/ball-run.jpg";
import tractor from "./assets/tractor.jpg";
import brickPile from "./assets/brick-pile.jpg";
import pinwheels from "./assets/pinwheels.jpg";
import tinRocket from "./assets/tin-rocket.jpg";
import shopShelves from "./assets/shop-shelves.jpg";
import shopCounter from "./assets/shop-counter.jpg";
import windowTrain from "./assets/window-train.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Tinker",
  sector: "Toy store",
  tagline: "A toy shop with a workbench in the back.",
  email: "hello@tinker.example",
  phone: "+1 555 0142 300",
  phoneHref: "tel:+15550142300",
  street: "214 Larkspur Street",
  town: "Millbrook, OR 97401",
  announcement:
    "Free gift wrap on every toy, every day · Order by 3 pm for same-day pickup",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/gift-finder", label: "Gift finder" },
  { to: "/workshops", label: "Workshops" },
  { to: "/events", label: "Events" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
];

/* ------------------------------------------------------------------ ages */

export type Shape =
  "circle" | "arch" | "triangle" | "square" | "hexagon" | "star";

export type AgeBand = {
  id: string;
  label: string;
  /** Short label for chips and the header strip. */
  short: string;
  nickname: string;
  /** Inclusive start, exclusive end, in years. */
  min: number;
  max: number;
  color: string;
  /** Text colour that passes AA on `color`. */
  on: string;
  shape: Shape;
  intro: string;
  into: string[];
  lookFor: { title: string; text: string }[];
  tip: { quote: string; by: string };
};

export const ages: AgeBand[] = [
  {
    id: "baby",
    label: "0–12 months",
    short: "0–1",
    nickname: "The noticers",
    min: 0,
    max: 1,
    color: "#f5b52e",
    on: "#1f2340",
    shape: "circle",
    intro:
      "The first year is all hands and mouths. Babies learn what the world is made of by grabbing it, chewing it and dropping it off the high chair, so we keep this shelf to toys that can survive all three.",
    into: [
      "Grasping and letting go",
      "Things that rattle when shaken",
      "High-contrast faces and shapes",
      "Anything that fits in a mouth",
    ],
    lookFor: [
      {
        title: "Bigger than a toilet-paper tube",
        text: "Every piece on this shelf passes the choke-tube test twice: once by the maker, once by us at the counter.",
      },
      {
        title: "Finishes you would lick",
        text: "Food-grade oils, beeswax and water-based paints only. Nothing that flakes when it is teethed on for a month.",
      },
      {
        title: "One toy, many textures",
        text: "Smooth, ridged, soft, cool. At this age a single interesting object beats a box of plastic.",
      },
    ],
    tip: {
      quote:
        "Buy one good teether and one soft friend. Everything else in year one is a bonus.",
      by: "Ottilie, owner",
    },
  },
  {
    id: "toddler",
    label: "1–2 years",
    short: "1–2",
    nickname: "The movers",
    min: 1,
    max: 3,
    color: "#237043",
    on: "#ffffff",
    shape: "arch",
    intro:
      "Toddlers want to push, pull, stack and knock over, ideally all before breakfast. Toys for this shelf have to roll well on a kitchen floor and survive being thrown from a stroller.",
    into: [
      "Push and pull toys on long strings",
      "Stacking, then demolition",
      "Putting things in and taking them out",
      "Banging anything that makes noise",
    ],
    lookFor: [
      {
        title: "Wheels that actually roll",
        text: "We test every push toy on our own uneven floorboards. If it wobbles, it goes back to the maker.",
      },
      {
        title: "Chunky enough to grip",
        text: "Bricks and blocks big enough for a whole fist, light enough not to bruise a sibling.",
      },
      {
        title: "A clear cause and effect",
        text: "Pull the string, the birds peck. Hit the bar, a note rings. Toddlers love being in charge of something.",
      },
    ],
    tip: {
      quote:
        "A pull-along toy is the best first-birthday present in the shop. Watch them look back over their shoulder at it.",
      by: "Jules, Saturday storyteller",
    },
  },
  {
    id: "preschool",
    label: "3–4 years",
    short: "3–4",
    nickname: "The storytellers",
    min: 3,
    max: 5,
    color: "#2c5cc5",
    on: "#ffffff",
    shape: "triangle",
    intro:
      "Somewhere around three, every toy becomes a character in a story. Trucks have jobs, tracks need bridges and the tin top is definitely a spaceship. This shelf is for small worlds they can run.",
    into: [
      "Trains, tracks and tunnels",
      "Small worlds with characters",
      "Sand, water and digging",
      "Spinning, humming, whirring things",
    ],
    lookFor: [
      {
        title: "Toys that join other toys",
        text: "Tracks that fit the bridge, trucks that fit the track. We stock systems that grow birthday by birthday.",
      },
      {
        title: "Room for a story",
        text: "Simple faces, open-ended pieces and no script printed on the box.",
      },
      {
        title: "Outdoor-proof",
        text: "Anything for the sandpit is oiled, rinsed and left in our yard for a week before it reaches the shelf.",
      },
    ],
    tip: {
      quote:
        "Start a wooden railway with a figure-eight. They will ask for one more piece every birthday for five years.",
      by: "Ray, workshop lead",
    },
  },
  {
    id: "five",
    label: "5–7 years",
    short: "5–7",
    nickname: "The makers",
    min: 5,
    max: 8,
    color: "#c63a22",
    on: "#ffffff",
    shape: "square",
    intro:
      "Five to seven is the age of the kitchen-table project. Kids can follow a few steps now, and they want something at the end they made themselves, to show anyone who walks into the room.",
    into: [
      "Painting and decorating",
      "Building from a plan, then ignoring it",
      "Games with real rules",
      "Collecting and sorting",
    ],
    lookFor: [
      {
        title: "A finish line",
        text: "Kits that end in something you can keep: a painted family of peg dolls, a top that really spins.",
      },
      {
        title: "Grown-up tools, kid-sized",
        text: "Real brushes, real paint, real wood. They can tell when something is a toy version of a toy.",
      },
      {
        title: "Twenty minutes, not two hours",
        text: "Projects split into short sittings so the second half still happens.",
      },
    ],
    tip: {
      quote:
        "If they love to draw, skip the colouring book and get the peg dolls. Same joy, and it ends up on a shelf instead of in the recycling.",
      by: "Mina, buyer",
    },
  },
  {
    id: "eight",
    label: "8–11 years",
    short: "8–11",
    nickname: "The tinkerers",
    min: 8,
    max: 12,
    color: "#7a4fb5",
    on: "#ffffff",
    shape: "hexagon",
    intro:
      "Eight to eleven year olds want to know how things work, then make them work differently. This shelf is for toys with mechanisms, rules to bend and enough pieces to build something nobody planned.",
    into: [
      "Inventing their own games",
      "Wind-up and clockwork things",
      "Big building projects",
      "Beating grown-ups at something",
    ],
    lookFor: [
      {
        title: "Something to figure out",
        text: "A mechanism to peek inside, a rulebook to rewrite, a build with no instructions at all.",
      },
      {
        title: "Enough pieces",
        text: "At this age a small set is finished in an afternoon. We stock the tub, not the sampler.",
      },
      {
        title: "Made to be shown off",
        text: "Toys that end up on a bedroom shelf, not the bottom of a box.",
      },
    ],
    tip: {
      quote:
        "The Make-a-Game kit is the one I send home with the kid who says they are bored of everything.",
      by: "Ray, workshop lead",
    },
  },
  {
    id: "twelve",
    label: "12 & up",
    short: "12+",
    nickname: "The collectors",
    min: 12,
    max: 120,
    color: "#ec7a2a",
    on: "#1f2340",
    shape: "star",
    intro:
      "Teenagers and grown-ups make up a third of our customers and almost all of our games-night regulars. This shelf is for people who know exactly what they like and want it made properly.",
    into: [
      "Tin toys and classic mechanisms",
      "Strategy and party games",
      "Building without a manual",
      "A good desk object",
    ],
    lookFor: [
      {
        title: "Made with care",
        text: "Hand-turned, hand-painted or wound by a spring someone assembled. The details hold up close.",
      },
      {
        title: "Play for a table of six",
        text: "Games that work for a mixed group, not just the one person who read the rules.",
      },
      {
        title: "Worth keeping",
        text: "Things you will still want on the shelf in ten years.",
      },
    ],
    tip: {
      quote:
        "Nobody is too old for a tin rocket. Half of them go to dads who say they are buying it for their kid.",
      by: "Ottilie, owner",
    },
  },
];

/* --------------------------------------------------------------- products */

export const aisles = [
  "Baby & toddler",
  "Building",
  "Vehicles & trains",
  "Music",
  "Arts & crafts",
  "Games",
  "Classics",
  "Outdoor",
] as const;
export type Aisle = (typeof aisles)[number];

export const interests = [
  "Building",
  "Vehicles",
  "Music",
  "Making",
  "Cuddly",
  "Games",
  "Outdoors",
  "Sensory",
] as const;
export type Interest = (typeof interests)[number];

export type Option = {
  name: string;
  values: { label: string; add?: number; swatch?: string }[];
};

export type Product = {
  id: string;
  name: string;
  blurb: string;
  description: string[];
  price: number;
  /** Recommended ages in years: inclusive min, inclusive max (99 = no upper limit). */
  ageMin: number;
  ageMax: number;
  aisle: Aisle;
  interests: Interest[];
  image: Img;
  gallery: Img[];
  option?: Option;
  specs: [string, string][];
  maker: string;
  /** Units on the shelf right now. */
  stock: number;
  /** Shelf position for the "Our picks" sort. */
  pick: number;
  /** ISO date the toy arrived on the shelf. */
  added: string;
  note?: { quote: string; by: string };
};

const img = (src: string, alt: string, w: number, h: number): Img => ({
  src,
  alt,
  w,
  h,
});

export const products: Product[] = [
  {
    id: "rainbow-stacker",
    name: "Six-Arch Rainbow Stacker",
    blurb:
      "Six nesting arches of lacquered maple. A tunnel, a bridge, a cradle, a wall.",
    description: [
      "Six arches cut from a single plank of maple, sanded until there is no edge left to find, and finished in water-based lacquer in the six colours of our age shelves.",
      "Babies roll the small arch. Toddlers stack them. Four year olds turn them into tunnels for the red engine, and older kids use them as hills for marble races. It is the toy we would keep if the shop could only sell one.",
    ],
    price: 48,
    ageMin: 1,
    ageMax: 99,
    aisle: "Baby & toddler",
    interests: ["Building", "Sensory"],
    image: img(
      rainbowStacker,
      "A wooden rainbow of nested coloured arches on a café table",
      1800,
      1013,
    ),
    gallery: [],
    option: {
      name: "Finish",
      values: [
        { label: "Primary lacquer", swatch: "#c63a22" },
        { label: "Bare maple", swatch: "#e6c995" },
      ],
    },
    specs: [
      ["Material", "Hard maple, water-based lacquer"],
      ["Size", "11 × 5.5 × 2.8 in, largest arch"],
      ["Pieces", "6 arches"],
      ["Care", "Wipe with a damp cloth; no soaking"],
      ["Safety", "Meets ASTM F963 and EN71-3"],
    ],
    maker: "Hollis & Daughter, Vermont",
    stock: 14,
    pick: 1,
    added: "2026-03-02",
    note: {
      quote:
        "We sell more of these than anything else and nobody has ever brought one back.",
      by: "Ottilie",
    },
  },
  {
    id: "pecking-birds",
    name: "Pecking Birds Pull-Along",
    blurb:
      "Four painted birds on wheels that peck the floor as they follow you.",
    description: [
      "A cam on the back axle lifts and drops each bird in turn, so the flock pecks its way along the floor behind whoever is holding the string. It clacks just loudly enough to be satisfying and not so loudly that you will hide it.",
      "The birds are hand-painted, so the red and yellow crests vary a little from set to set. The cord is a thick cotton rope with a wooden bead handle that a one year old can hold.",
    ],
    price: 34,
    ageMin: 1,
    ageMax: 4,
    aisle: "Baby & toddler",
    interests: ["Vehicles", "Sensory"],
    image: img(
      peckingBirds,
      "Brightly painted wooden birds on wheels in a row on grey paving",
      1200,
      795,
    ),
    gallery: [],
    specs: [
      ["Material", "Beech, non-toxic paint, cotton cord"],
      ["Size", "16 in long with all four birds"],
      ["Cord", "28 in with wooden bead handle"],
      ["Noise", "A gentle clack, no batteries"],
      ["Safety", "Meets ASTM F963"],
    ],
    maker: "Atelier Pivert, Portugal",
    stock: 9,
    pick: 4,
    added: "2026-08-19",
    note: {
      quote:
        "Test-driven in the shop by forty-one toddlers this summer. They all looked back to watch it.",
      by: "Jules",
    },
  },
  {
    id: "dump-truck",
    name: "Beechwood Dump Truck",
    blurb:
      "A tipping truck with a real hinge, made for sand, gravel and stuffed animals.",
    description: [
      "The bed tips on a brass pin and stays up when you let go, which makes it the best truck we have found for the sandpit. The wheels run on hardwood axles that do not rust when left out overnight, which they will be.",
      "Choose a natural oil finish for indoor play or a beeswax finish that sheds water better outside.",
    ],
    price: 42,
    ageMin: 2,
    ageMax: 7,
    aisle: "Vehicles & trains",
    interests: ["Vehicles", "Outdoors"],
    image: img(
      dumpTruck,
      "A plain wooden dump truck with a deep bed and four round wheels",
      1024,
      712,
    ),
    gallery: [],
    option: {
      name: "Finish",
      values: [
        { label: "Natural oil", swatch: "#d9b583" },
        { label: "Beeswax", add: 4, swatch: "#c79a52" },
      ],
    },
    specs: [
      ["Material", "Solid European beech, brass pin"],
      ["Size", "10 × 5 × 5 in"],
      ["Load", "Holds about two cups of sand"],
      ["Care", "Re-oil once a year; we do it free at the counter"],
    ],
    maker: "Our bench, Millbrook",
    stock: 6,
    pick: 6,
    added: "2026-05-14",
  },
  {
    id: "chunky-bricks",
    name: "Chunky Bricks",
    blurb:
      "Fist-sized building bricks in eight colours, in a cotton drawstring bag.",
    description: [
      "Big, light bricks sized for small hands that are still learning to press. They click firmly enough to build a tower and come apart easily enough that a toddler can do it without help.",
      "Every set comes in a washable drawstring bag that doubles as a play mat. The 160-piece box adds wheels, windows and two arches.",
    ],
    price: 39,
    ageMin: 1,
    ageMax: 5,
    aisle: "Building",
    interests: ["Building"],
    image: img(
      chunkyBricks,
      "A tumble of large coloured building bricks in red, blue, yellow and green",
      1024,
      647,
    ),
    gallery: [],
    option: {
      name: "Set",
      values: [{ label: "80 pieces" }, { label: "160 pieces", add: 31 }],
    },
    specs: [
      ["Material", "Plant-based polyethylene"],
      ["Brick size", "2.5 × 1.25 in, standard"],
      ["Colours", "8"],
      ["Care", "Dishwasher safe, top rack"],
    ],
    maker: "Klotz Werk, Germany",
    stock: 22,
    pick: 7,
    added: "2026-01-10",
  },
  {
    id: "humming-tin-top",
    name: "Humming Tin Top",
    blurb:
      "Pump the handle and it spins for a full minute, singing as it goes.",
    description: [
      "A pressed-tin top with a spiral plunger. Push the handle down three or four times and it whirs up to speed, humming a low chord through the slots in its shell.",
      "This is the same mechanism toy shops have sold for a century, printed in two lithographed patterns. It will spin on wood, tile or a tight carpet.",
    ],
    price: 24,
    ageMin: 3,
    ageMax: 99,
    aisle: "Classics",
    interests: ["Music", "Games", "Sensory"],
    image: img(
      tinTop,
      "A lithographed tin spinning top in teal and red on a wooden floor",
      1024,
      683,
    ),
    gallery: [
      img(
        tinTop2,
        "The same tin top photographed on a white background",
        1024,
        618,
      ),
    ],
    option: {
      name: "Pattern",
      values: [
        { label: "Lagoon", swatch: "#2a9d8f" },
        { label: "Cherry", swatch: "#c63a22" },
      ],
    },
    specs: [
      ["Material", "Lithographed tinplate, steel plunger"],
      ["Size", "7 in diameter"],
      ["Spin time", "About 60 seconds"],
      ["Sound", "A two-note hum"],
    ],
    maker: "Brüder Kranz, Germany",
    stock: 11,
    pick: 3,
    added: "2026-02-21",
  },
  {
    id: "striped-top",
    name: "Lathe-Striped Spinning Top",
    blurb:
      "Turned on our own lathe, striped by hand, sold in the order they come off the bench.",
    description: [
      "Ray turns these on the lathe at the back of the shop on Tuesday mornings. Each one gets a different set of stripes, so the one you take home is the only one like it.",
      "They spin best on a smooth table. Hold the stem between finger and thumb and snap. Most kids get a twenty-second spin by the third try.",
    ],
    price: 14,
    ageMin: 4,
    ageMax: 99,
    aisle: "Classics",
    interests: ["Games", "Sensory"],
    image: img(
      stripedTop,
      "A wooden spinning top with painted stripes of pink, blue and orange, spinning on a dark table",
      683,
      1024,
    ),
    gallery: [],
    specs: [
      ["Material", "Cherry wood, milk paint, wax"],
      ["Size", "2.25 in tall"],
      ["Made", "In the shop, about 30 a week"],
      ["Each one", "Unique stripes"],
    ],
    maker: "Our bench, Millbrook",
    stock: 30,
    pick: 5,
    added: "2026-09-29",
    note: {
      quote:
        "Put three on the table and let them pick. That is half the present.",
      by: "Ray",
    },
  },
  {
    id: "barnaby-bear",
    name: "Barnaby Bear",
    blurb:
      "A jointed, washable bear in undyed wool plush, sized from pocket to armful.",
    description: [
      "Barnaby has jointed arms and legs, embroidered eyes for babies and a ribbon that is stitched on, not tied. He survives the washing machine on a cool cycle and comes out a little fluffier each time.",
      "Choose the pocket size for a stroller, the classic for a bed, or the big one for a reading corner.",
    ],
    price: 36,
    ageMin: 0,
    ageMax: 99,
    aisle: "Baby & toddler",
    interests: ["Cuddly", "Sensory"],
    image: img(
      bears,
      "A family of soft brown and white teddy bears sitting together",
      1023,
      683,
    ),
    gallery: [],
    option: {
      name: "Size",
      values: [
        { label: "Pocket, 8 in" },
        { label: "Classic, 14 in", add: 18 },
        { label: "Big, 22 in", add: 46 },
      ],
    },
    specs: [
      ["Fabric", "Undyed wool plush, cotton lining"],
      ["Filling", "Recycled polyester fibre"],
      ["Eyes", "Embroidered, safe from birth"],
      ["Care", "Machine wash cold in a pillowcase"],
    ],
    maker: "Haverly Bears, Maine",
    stock: 18,
    pick: 2,
    added: "2025-11-04",
  },
  {
    id: "red-engine",
    name: "Little Red Engine",
    blurb:
      "A two-car wooden engine with magnetic couplings that fit every track on our shelf.",
    description: [
      "A chunky engine and tender in red and blue lacquer, with magnets at both ends so it couples to the carriages you already own. The wheels are set for the standard wooden track gauge.",
      "It also rolls perfectly well on a carpet, a table or a sibling.",
    ],
    price: 28,
    ageMin: 2,
    ageMax: 7,
    aisle: "Vehicles & trains",
    interests: ["Vehicles"],
    image: img(
      redEngine,
      "A small red, yellow and blue wooden toy train engine on a carpet",
      682,
      1024,
    ),
    gallery: [
      img(
        trackLoop,
        "A wooden toy car rounding a curve of pale wooden track",
        1024,
        683,
      ),
    ],
    specs: [
      ["Material", "Beech, water-based lacquer"],
      ["Couplings", "Magnetic, both ends"],
      ["Length", "6.5 in, engine and tender"],
      ["Fits", "Standard wooden track"],
    ],
    maker: "Klotz Werk, Germany",
    stock: 15,
    pick: 9,
    added: "2026-04-08",
  },
  {
    id: "figure-eight-track",
    name: "Figure-Eight Track Set",
    blurb:
      "Forty-two pieces of beech track with a crossing, a bridge and two ramps.",
    description: [
      "The set we recommend to start a railway: enough curves for a figure-eight, a crossing piece, a raised bridge with ramps and four straights to stretch it under the sofa.",
      "Every piece is double-sided, with a plain groove on one side and a grooved road on the other, so it doubles as a road for the push cars.",
    ],
    price: 64,
    ageMin: 3,
    ageMax: 8,
    aisle: "Vehicles & trains",
    interests: ["Vehicles", "Building"],
    image: img(
      trackBridge,
      "Two curves of pale wooden toy track crossing on a wooden floor",
      1800,
      1205,
    ),
    gallery: [
      img(trackLoop, "A wooden car on a curved wooden track piece", 1024, 683),
    ],
    specs: [
      ["Material", "European beech, unfinished"],
      ["Pieces", "42"],
      ["Footprint", "About 40 × 24 in assembled"],
      ["Fits", "Standard wooden track and trains"],
    ],
    maker: "Klotz Werk, Germany",
    stock: 7,
    pick: 8,
    added: "2026-04-08",
  },
  {
    id: "push-cars",
    name: "Pocket Push Cars, set of 3",
    blurb: "A car, a star and a pram, each small enough for a coat pocket.",
    description: [
      "Three palm-sized rollers with fat wheels and no small parts. They were designed as stroller toys and became the most-borrowed thing in our play corner.",
      "Each piece is cut from a different wood, so they are three different weights and colours without a drop of paint.",
    ],
    price: 22,
    ageMin: 1,
    ageMax: 4,
    aisle: "Baby & toddler",
    interests: ["Vehicles", "Sensory"],
    image: img(
      pushCars,
      "Three small wooden push toys shaped like a car, a star and a pram on a shiny floor",
      1200,
      900,
    ),
    gallery: [],
    specs: [
      ["Material", "Maple, cherry and walnut, oiled"],
      ["Size", "About 3 in each"],
      ["Finish", "Unpainted"],
    ],
    maker: "Atelier Pivert, Portugal",
    stock: 20,
    pick: 11,
    added: "2026-07-01",
  },
  {
    id: "guitar-xylophone",
    name: "Rainbow Guitar Xylophone",
    blurb:
      "Eight tuned metal bars in a guitar-shaped body. Plays in tune, sounds like it.",
    description: [
      "Most toy xylophones are decoration. This one is tuned to a C major scale, so a song played at home sounds like the same song in music class.",
      "The two beaters clip into the neck so they do not get lost, and the body is a soft-edged plywood that rings rather than rattles.",
    ],
    price: 32,
    ageMin: 2,
    ageMax: 7,
    aisle: "Music",
    interests: ["Music"],
    image: img(
      xylophone,
      "A guitar-shaped wooden xylophone with rainbow metal bars and two beaters",
      731,
      1200,
    ),
    gallery: [],
    specs: [
      ["Bars", "8, tuned to C major"],
      ["Body", "Birch plywood"],
      ["Beaters", "2, stored in the neck"],
      ["Size", "16 × 7 in"],
    ],
    maker: "Tono & Co., India",
    stock: 8,
    pick: 10,
    added: "2026-06-12",
  },
  {
    id: "peg-dolls",
    name: "Paint-Your-Own Peg Dolls",
    blurb:
      "Blank beech peg people, six paints, two brushes and a tiny stand for the finished family.",
    description: [
      "Smooth peg people in four heights, ready for faces, clothes, hair and whatever else a six year old thinks a family needs. The paints are water-based and dry in ten minutes.",
      "Choose the family of six for one painter or the party of twelve for a rainy afternoon with friends. It is the same kit we use in our Saturday peg doll workshop.",
    ],
    price: 26,
    ageMin: 5,
    ageMax: 12,
    aisle: "Arts & crafts",
    interests: ["Making"],
    image: img(
      pegDolls,
      "A hand holding small painted wooden peg dolls on a pale tabletop",
      960,
      640,
    ),
    gallery: [],
    option: {
      name: "Kit",
      values: [{ label: "Family of 6" }, { label: "Party of 12", add: 14 }],
    },
    specs: [
      ["Includes", "Peg dolls, 6 paints, 2 brushes, stand"],
      ["Paint", "Water-based, non-toxic"],
      ["Doll heights", "1.5 to 3.5 in"],
      ["Time", "About an hour, plus drying"],
    ],
    maker: "Our bench, Millbrook",
    stock: 16,
    pick: 12,
    added: "2026-09-02",
  },
  {
    id: "make-a-game",
    name: "Make-a-Game Kit",
    blurb:
      "A blank board, 60 wooden pawns, four dice and a rulebook with nothing written in it.",
    description: [
      "Everything you need to invent a board game except the rules. The fold-out board is printed with a faint grid and nothing else, the pawns come in six colours, and the rulebook has a page for the name, a page for how to win and twenty blank pages for arguments.",
      "Ray designed it for our board game club. It is the best present we know for a kid who says they are bored of everything.",
    ],
    price: 30,
    ageMin: 8,
    ageMax: 99,
    aisle: "Games",
    interests: ["Games", "Making"],
    image: img(
      gamePawns,
      "A heap of red, blue, yellow, green and white wooden game pawns",
      1024,
      613,
    ),
    gallery: [],
    specs: [
      ["Includes", "Board, 60 pawns, 4 dice, rulebook, pencil"],
      ["Players", "2 to 6"],
      ["Board", "18 in square, folds in four"],
      ["Box", "Rigid card, magnetic lid"],
    ],
    maker: "Our bench, Millbrook",
    stock: 12,
    pick: 13,
    added: "2026-10-01",
    note: {
      quote:
        "Twelve kids in our club built twelve completely different games with this. One involved a dragon tax.",
      by: "Ray",
    },
  },
  {
    id: "teething-shapes",
    name: "Walnut Teething Shapes",
    blurb: "Six oiled walnut shapes to grip, chew and bang together.",
    description: [
      "Hard walnut is naturally antibacterial, cool to the touch and slow to splinter, which makes it the best wood we know for teething. Each shape has a hole big enough for a small finger and no corner sharper than a thumbnail.",
      "They come in a cotton pouch with a care card. A wipe of food-grade oil every few months keeps them smooth.",
    ],
    price: 22,
    ageMin: 0,
    ageMax: 2,
    aisle: "Baby & toddler",
    interests: ["Sensory"],
    image: img(
      teethingShapes,
      "A pile of wooden teething shapes including a heart, butterfly and car on a board",
      675,
      1200,
    ),
    gallery: [],
    specs: [
      ["Material", "Black walnut, food-grade oil"],
      ["Pieces", "6 shapes"],
      ["Size", "2.5 to 3 in each"],
      ["Care", "Wipe clean, oil every few months"],
    ],
    maker: "Hollis & Daughter, Vermont",
    stock: 13,
    pick: 14,
    added: "2026-05-30",
  },
  {
    id: "sandpit-ball-run",
    name: "Sandpit Ball Run",
    blurb:
      "Slot-together wooden channels for running balls and water through the sand.",
    description: [
      "Twenty grooved channels, four posts and a flag. Dig the posts into the sand, slope the channels, and send the balls down. Swap the balls for a watering can and it becomes a river system.",
      "The channels are oiled larch, which shrugs off wet sand and a summer in the garden.",
    ],
    price: 58,
    ageMin: 3,
    ageMax: 10,
    aisle: "Outdoor",
    interests: ["Outdoors", "Building"],
    image: img(
      ballRun,
      "Wooden ball-run channels with a red flag set into sand with small toys around",
      1024,
      683,
    ),
    gallery: [],
    specs: [
      ["Material", "Larch, linseed oil"],
      ["Pieces", "20 channels, 4 posts, 6 balls, flag"],
      ["Longest run", "About 9 ft"],
      ["Care", "Rinse and dry before winter storage"],
    ],
    maker: "Atelier Pivert, Portugal",
    stock: 5,
    pick: 15,
    added: "2026-06-20",
  },
  {
    id: "farm-tractor",
    name: "Walnut Farm Tractor",
    blurb:
      "A tractor with big rear wheels and a seat that fits a peg doll exactly.",
    description: [
      "Turned walnut wheels, a cherry body and a seat cut to the size of our peg dolls, because that is what everyone tries to sit in it first.",
      "It is heavy enough to feel like a proper machine and smooth enough for a three year old to push across the table at speed.",
    ],
    price: 46,
    ageMin: 3,
    ageMax: 8,
    aisle: "Vehicles & trains",
    interests: ["Vehicles"],
    image: img(
      tractor,
      "A polished wooden toy tractor with large rear wheels seen from above",
      750,
      1200,
    ),
    gallery: [],
    specs: [
      ["Material", "Cherry body, walnut wheels"],
      ["Size", "8 × 5 × 5 in"],
      ["Seat", "Fits our peg dolls"],
    ],
    maker: "Our bench, Millbrook",
    stock: 4,
    pick: 16,
    added: "2026-08-03",
  },
  {
    id: "brick-tub",
    name: "Mixed Brick Tub, 1,000 pieces",
    blurb:
      "A thousand small bricks in 24 colours, sorted by nobody, for building without a manual.",
    description: [
      "A big, unsorted tub of standard-size small bricks with plates, windows, wheels and slopes mixed in. There is no picture on the lid because there is nothing in particular to build.",
      "The bricks fit the standard studs already under your sofa, so this is also the best way to make an old collection interesting again.",
    ],
    price: 55,
    ageMin: 6,
    ageMax: 99,
    aisle: "Building",
    interests: ["Building"],
    image: img(
      brickPile,
      "A heap of small coloured plastic building bricks seen from above",
      1600,
      1067,
    ),
    gallery: [],
    specs: [
      ["Pieces", "About 1,000"],
      ["Colours", "24"],
      ["Includes", "Bricks, plates, slopes, wheels, windows"],
      ["Tub", "Recycled plastic, resealable"],
    ],
    maker: "Klotz Werk, Germany",
    stock: 10,
    pick: 17,
    added: "2026-07-22",
  },
  {
    id: "garden-pinwheel",
    name: "Giant Garden Pinwheel",
    blurb:
      "A two-foot rainbow pinwheel on an ash pole that turns in the faintest breeze.",
    description: [
      "Eight petals of weatherproof sailcloth in rainbow order around a sealed bearing. It catches a breeze you cannot feel and keeps turning all summer.",
      "The pole splits in two for planting in a lawn or a balcony pot. Lovely carried in a parade, lovelier still left in the garden.",
    ],
    price: 19,
    ageMin: 2,
    ageMax: 99,
    aisle: "Outdoor",
    interests: ["Outdoors", "Sensory"],
    image: img(
      pinwheels,
      "Giant rainbow pinwheels turning on poles in a garden",
      820,
      534,
    ),
    gallery: [],
    specs: [
      ["Wheel", "22 in, ripstop sailcloth"],
      ["Pole", "Ash, 40 in in two parts"],
      ["Bearing", "Sealed, rust-free"],
    ],
    maker: "Vento Toys, Italy",
    stock: 24,
    pick: 18,
    added: "2026-04-25",
  },
  {
    id: "tin-rocket",
    name: "Wind-Up Tin Rocket",
    blurb:
      "A clockwork tin rocket that rolls, sparks and turns at the edge of the table.",
    description: [
      "Wind the key and the rocket rolls forward with a flint spark in its tail, then feels for the table edge and turns away before it falls. It comes in a printed card box worth keeping.",
      "The clockwork is serviceable, so if it ever stops, bring it to our toy hospital on Thursday afternoons.",
    ],
    price: 38,
    ageMin: 8,
    ageMax: 99,
    aisle: "Classics",
    interests: ["Vehicles", "Games"],
    image: img(
      tinRocket,
      "A tin toy rocket on its printed card box on a wooden desk",
      1024,
      683,
    ),
    gallery: [],
    specs: [
      ["Material", "Lithographed tinplate"],
      ["Motor", "Clockwork, key wound"],
      ["Length", "5.5 in"],
      ["Note", "Small parts; not for under 8s"],
    ],
    maker: "Brüder Kranz, Germany",
    stock: 3,
    pick: 19,
    added: "2026-10-09",
  },
];

/* --------------------------------------------------------------- gift wrap */

export const wraps = [
  {
    id: "none",
    label: "No wrap",
    price: 0,
    paper: "transparent",
    ribbon: "transparent",
  },
  {
    id: "kraft",
    label: "Kraft & red twine",
    price: 0,
    paper: "#c9a27a",
    ribbon: "#c63a22",
  },
  {
    id: "confetti",
    label: "Confetti paper",
    price: 3,
    paper: "#f6efe1",
    ribbon: "#2c5cc5",
  },
];

/* --------------------------------------------------------------- workshops */

export type Session = { id: string; date: string; time: string; left: number };

export type Workshop = {
  id: string;
  name: string;
  ages: string;
  ageMin: number;
  ageMax: number;
  length: string;
  price: number;
  seats: number;
  image: Img;
  summary: string;
  description: string[];
  steps: string[];
  takeHome: string;
  grownUp: string;
  lead: string;
  sessions: Session[];
};

export const workshops: Workshop[] = [
  {
    id: "peg-doll-painting",
    name: "Peg Doll Painting",
    ages: "5–8",
    ageMin: 5,
    ageMax: 8,
    length: "90 minutes",
    price: 24,
    seats: 10,
    image: img(
      pegDolls,
      "Small painted wooden peg dolls held in a hand",
      960,
      640,
    ),
    summary:
      "Paint a family of four peg dolls, then build them a little stand to live on.",
    description: [
      "Our most popular Saturday session. Each child gets four blank peg dolls, a palette of six colours and a fine brush, and paints a family: their own, a made-up one, or the characters from the book they are reading.",
      "Jules reads a short story at the start for ideas and shows a few tricks for faces and stripes. Everything dries before you leave.",
    ],
    steps: [
      "A story for ideas",
      "Sketch on paper first",
      "Paint the clothes, then the faces",
      "Varnish and build the stand",
    ],
    takeHome: "Four painted peg dolls and a wooden stand",
    grownUp:
      "Drop-off is fine. Grown-ups are welcome to stay and paint their own set for $12.",
    lead: "Jules Pardo",
    sessions: [
      { id: "pd-1024", date: "2026-10-24", time: "10:00–11:30", left: 3 },
      { id: "pd-1107", date: "2026-11-07", time: "10:00–11:30", left: 7 },
      { id: "pd-1121", date: "2026-11-21", time: "10:00–11:30", left: 10 },
    ],
  },
  {
    id: "balance-birds",
    name: "Woodshop: Balance Birds",
    ages: "8–12",
    ageMin: 8,
    ageMax: 12,
    length: "2 hours",
    price: 38,
    seats: 6,
    image: img(
      peckingBirds,
      "Painted wooden birds lined up on wheels",
      1200,
      795,
    ),
    summary:
      "Saw, sand and paint a wooden bird that balances on the tip of your finger.",
    description: [
      "A real woodshop session at our back bench. Kids use coping saws, rasps and sandpaper to shape a bird from a pre-cut blank of basswood, then weight its wings with two brass washers so it balances on its beak.",
      "Six seats only, so Ray can stand at every elbow. Safety glasses and aprons provided; closed shoes please.",
    ],
    steps: [
      "Safety talk and tool tour",
      "Saw the wing curves",
      "Rasp and sand the body",
      "Paint, weight and balance",
    ],
    takeHome: "A painted balance bird and a printed plan to make another",
    grownUp:
      "Drop-off. Please collect at the end; tools are put away together.",
    lead: "Ray Okafor",
    sessions: [
      { id: "bb-1024", date: "2026-10-24", time: "13:00–15:00", left: 1 },
      { id: "bb-1114", date: "2026-11-14", time: "13:00–15:00", left: 4 },
      { id: "bb-1205", date: "2026-12-05", time: "13:00–15:00", left: 6 },
    ],
  },
  {
    id: "toddler-block-lab",
    name: "Toddler Block Lab",
    ages: "1–3",
    ageMin: 1,
    ageMax: 3,
    length: "45 minutes",
    price: 14,
    seats: 8,
    image: img(
      chunkyBricks,
      "Big coloured building bricks heaped together",
      1024,
      647,
    ),
    summary:
      "A floor full of blocks, arches and ramps, a few songs, and nothing to tidy at home.",
    description: [
      "We clear the middle of the shop and cover the floor with blocks, rainbow arches, ramps and push cars. Toddlers build, knock down and roll things, and Ottilie leads three short building songs.",
      "It is a calm, small group designed for toddlers who find big play spaces a lot. Siblings under one are free.",
    ],
    steps: [
      "Hello song",
      "Free building",
      "Ramp races",
      "Goodbye song and tidy-up",
    ],
    takeHome: "A printed sheet of five block games to play at home",
    grownUp: "One grown-up stays with each child.",
    lead: "Ottilie Brandt",
    sessions: [
      { id: "tb-1021", date: "2026-10-21", time: "09:30–10:15", left: 2 },
      { id: "tb-1028", date: "2026-10-28", time: "09:30–10:15", left: 5 },
      { id: "tb-1104", date: "2026-11-04", time: "09:30–10:15", left: 8 },
    ],
  },
  {
    id: "pinwheel-parade",
    name: "Pinwheel Parade",
    ages: "4–8",
    ageMin: 4,
    ageMax: 8,
    length: "75 minutes",
    price: 18,
    seats: 12,
    image: img(pinwheels, "Rainbow pinwheels on poles in a garden", 820, 534),
    summary:
      "Fold, decorate and pin your own pinwheel, then parade it round the block.",
    description: [
      "Kids fold a pinwheel from waxed paper, decorate the petals with stamps and paint pens, and fix it to a wooden stick with a real bead bearing so it spins properly.",
      "When everyone is done we walk once round the block and past the bakery, where they always give the parade a cookie.",
    ],
    steps: [
      "Choose and decorate paper",
      "Cut and fold the petals",
      "Pin it with a bead bearing",
      "Parade round the block",
    ],
    takeHome: "A working pinwheel and a cookie",
    grownUp: "Grown-ups are invited to the parade.",
    lead: "Jules Pardo",
    sessions: [
      { id: "pp-1031", date: "2026-10-31", time: "11:00–12:15", left: 6 },
      { id: "pp-1114", date: "2026-11-14", time: "11:00–12:15", left: 12 },
    ],
  },
  {
    id: "board-game-club",
    name: "Board Game Design Club",
    ages: "10–14",
    ageMin: 10,
    ageMax: 14,
    length: "4 Tuesdays, 1 hour each",
    price: 64,
    seats: 8,
    image: img(gamePawns, "A heap of coloured wooden game pawns", 1024, 613),
    summary:
      "Four after-school sessions to invent, test and box a board game of your own.",
    description: [
      "Week one is ideas and playing a few classic games to see how they work. Week two is a paper prototype. Week three is playtesting with the rest of the club and rewriting the rules. Week four is building the final board and box.",
      "Each designer leaves with their game, a box they designed, and the right to tell everyone they invented a board game.",
    ],
    steps: [
      "Play and pull apart classics",
      "Paper prototype",
      "Playtest and rewrite",
      "Build and box the final game",
    ],
    takeHome: "A finished, boxed board game with pawns and dice",
    grownUp:
      "Drop-off after school. Families are invited to the game night on the final Tuesday.",
    lead: "Ray Okafor",
    sessions: [
      {
        id: "gc-nov",
        date: "2026-11-03",
        time: "Tuesdays 16:00–17:00",
        left: 2,
      },
      {
        id: "gc-jan",
        date: "2027-01-12",
        time: "Tuesdays 16:00–17:00",
        left: 8,
      },
    ],
  },
];

/* ------------------------------------------------------------ store events */

export const eventKinds = [
  "Storytime",
  "Games night",
  "Toy swap",
  "Meet the maker",
  "Seasonal",
] as const;
export type EventKind = (typeof eventKinds)[number];

export type StoreEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  kind: EventKind;
  who: string;
  text: string;
  rsvp: boolean;
};

export const events: StoreEvent[] = [
  {
    id: "storytime-1022",
    date: "2026-10-22",
    time: "10:30–11:00",
    title: "Thursday Storytime: Owls and Other Night Things",
    kind: "Storytime",
    who: "Ages 2–5",
    text: "Jules reads three autumn picture books in the reading corner, with owl finger puppets for anyone who wants one.",
    rsvp: false,
  },
  {
    id: "games-night-1023",
    date: "2026-10-23",
    time: "19:00–22:00",
    title: "Grown-Ups' Games Night",
    kind: "Games night",
    who: "Ages 16+",
    text: "Our library of 80 games comes off the shelf, the bakery next door sends over pastries, and Ray teaches anything you have not played.",
    rsvp: true,
  },
  {
    id: "toy-swap-1101",
    date: "2026-11-01",
    time: "11:00–14:00",
    title: "Autumn Toy Swap",
    kind: "Toy swap",
    who: "Everyone",
    text: "Bring clean, complete toys your kids have outgrown and swap them for tokens. Anything left over goes to the Millbrook Family Shelter.",
    rsvp: true,
  },
  {
    id: "maker-1108",
    date: "2026-11-08",
    time: "14:00–15:30",
    title: "Meet the Maker: Hollis & Daughter",
    kind: "Meet the maker",
    who: "Everyone",
    text: "June Hollis drives down from Vermont with a lathe, turns rainbow arches in the window and answers every question about wood.",
    rsvp: false,
  },
  {
    id: "storytime-1112",
    date: "2026-11-12",
    time: "10:30–11:00",
    title: "Thursday Storytime: Trains and Tracks",
    kind: "Storytime",
    who: "Ages 2–5",
    text: "Three railway stories, with the figure-eight track set up on the floor for after.",
    rsvp: false,
  },
  {
    id: "games-night-1120",
    date: "2026-11-20",
    time: "19:00–22:00",
    title: "Games Night: Board Game Club Showcase",
    kind: "Games night",
    who: "Families",
    text: "The autumn Board Game Design Club present their eight finished games. Come and play every one.",
    rsvp: true,
  },
  {
    id: "window-1128",
    date: "2026-11-28",
    time: "17:00–18:00",
    title: "Lighting of the Window Railway",
    kind: "Seasonal",
    who: "Everyone",
    text: "The holiday train starts its run round the front window for the season. Hot cider, carols from the Millbrook Youth Choir, and a free striped top for the first fifty kids.",
    rsvp: false,
  },
  {
    id: "wrap-1212",
    date: "2026-12-12",
    time: "All day",
    title: "Late-Night Wrapping Party",
    kind: "Seasonal",
    who: "Everyone",
    text: "Open until 10 pm with three wrapping stations, free paper, twine and tags, whether or not you bought the present here.",
    rsvp: false,
  },
];

/* ------------------------------------------------------------ store & team */

export const hours: {
  day: string;
  open: string | null;
  close: string | null;
}[] = [
  { day: "Sunday", open: "11:00", close: "16:00" },
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: "10:00", close: "18:00" },
  { day: "Wednesday", open: "10:00", close: "18:00" },
  { day: "Thursday", open: "10:00", close: "19:00" },
  { day: "Friday", open: "10:00", close: "19:00" },
  { day: "Saturday", open: "09:00", close: "18:00" },
];

export const team = [
  {
    name: "Ottilie Brandt",
    role: "Owner",
    bio: "Taught second grade for eleven years, then bought the old Larkspur hardware store with her savings and a very patient bank manager. Still tests every baby toy herself.",
  },
  {
    name: "Ray Okafor",
    role: "Workshop lead & woodworker",
    bio: "Runs the back bench, turns the striped tops and designed the Make-a-Game kit. Former set builder for the Millbrook Playhouse.",
  },
  {
    name: "Mina Castellanos",
    role: "Buyer",
    bio: "Visits four toy fairs a year and says no to about nine toys in ten. Keeps the list of what our tester families actually played with.",
  },
  {
    name: "Jules Pardo",
    role: "Storyteller & toy hospital",
    bio: "Reads Thursday storytime, runs the painting workshops and repairs wind-up toys at the counter on Thursday afternoons.",
  },
];

export const story = [
  {
    year: "2011",
    text: "Ottilie opens Tinker in the old Larkspur hardware store, keeping the oak counter and every drawer.",
  },
  {
    year: "2013",
    text: "The first tester families sign up. Every new toy now goes home with a child for a week before it is priced.",
  },
  {
    year: "2015",
    text: "Ray builds the workbench in the back room and runs the first Saturday workshop for eight kids.",
  },
  {
    year: "2019",
    text: "The toy hospital opens on Thursday afternoons. More than 2,000 toys have been repaired since.",
  },
  {
    year: "2024",
    text: "Games night moves upstairs to the old stock room, with a library of 80 games to borrow.",
  },
];

export const rules = [
  {
    title: "A child played with it first",
    text: "Forty tester families take new toys home for a week. If it is still in use on day seven, we stock it.",
  },
  {
    title: "It can be fixed",
    text: "We favour wood, tin and cloth because they can be repaired. Our toy hospital mends what we sell.",
  },
  {
    title: "No batteries unless they earn it",
    text: "Out of 600 toys on the shelves, eleven need batteries. Each of them had to argue its case.",
  },
  {
    title: "It works for more than one birthday",
    text: "The best toys change jobs as a child grows. We ask every maker how theirs will be played with in three years.",
  },
];

export const services = [
  {
    title: "Free gift wrap",
    text: "Kraft paper and red twine on anything, any day, with a handwritten tag. Confetti paper is $3.",
  },
  {
    title: "Toy hospital",
    text: "Thursdays from 2 pm. Wooden toys re-glued and re-oiled, wind-up toys serviced, bears re-stuffed. Most fixes are free.",
  },
  {
    title: "Birthday lists",
    text: "Leave a wish list at the counter and we will hold it, tick off what is bought and stop duplicates.",
  },
  {
    title: "60-day returns",
    text: "Unopened, or opened and not loved: bring it back with the receipt within 60 days.",
  },
];

export const faqs = [
  {
    q: "Can I return a toy that has been opened?",
    a: "Yes. If it was opened and it is just not right for your child, bring it back within 60 days with the receipt and we will exchange it or refund it. Hygiene items like teethers must be unopened.",
  },
  {
    q: "How does same-day pickup work?",
    a: "Order online before 3 pm on any day we are open and your order is wrapped and waiting at the counter by 5 pm. We will email you when it is ready.",
  },
  {
    q: "Do you deliver?",
    a: "We deliver by bike within three miles of the shop on Tuesdays and Fridays for $6, and ship anywhere in the US for $9. Shipping is free on orders over $75.",
  },
  {
    q: "What happens at the toy hospital?",
    a: "Bring the toy to the counter on a Thursday after 2 pm. Jules or Ray will look at it while you wait and tell you what it needs. Most glue, oil and stitching jobs are free; clockwork servicing is $10.",
  },
  {
    q: "Are workshops suitable for children with additional needs?",
    a: "Yes. Every workshop is small, and we are happy to adapt the pace, the tools or the noise level. Mention it in the booking note or call us and we will plan together.",
  },
  {
    q: "Is the shop step-free?",
    a: "The ground floor and toilets are step-free with space for strollers and wheelchairs. Games night is upstairs; on request we move it to the ground floor.",
  },
];

export const visit = {
  intro:
    "We are on the sunny side of Larkspur Street, between the bakery and the bike shop, in the building with the train in the window.",
  transport: [
    {
      title: "On foot or bike",
      text: "Bike hoops outside the bakery next door. Stroller parking just inside the door.",
    },
    {
      title: "By bus",
      text: "Routes 4 and 11 stop at Larkspur & 3rd, a two-minute walk.",
    },
    {
      title: "By car",
      text: "Free two-hour parking on Larkspur Street and in the Elm Avenue lot behind the shop.",
    },
  ],
};

/* ---------------------------------------------------------- page copy */

export const home = {
  title: "A toy shop with a workbench in the back.",
  lead: "Six hundred toys chosen by forty tester families, wrapped free at the counter and fixed for free if they break. Shop by age, find a gift in a minute, or bring the kids to make something on Saturday.",
  ageTitle: "Who are we shopping for?",
  ageLead: "Our shelves are arranged by age, not by brand. Pick a shelf.",
  counterTitle: "On the counter this week",
  finderTitle: "Not sure what to get?",
  finderLead:
    "Tell the gift finder how old they are, what they love and what you want to spend. It pulls the best matches off the shelf, with the reasons we would give you at the counter.",
  benchTitle: "This month at the back bench",
  benchLead:
    "Small hands-on workshops where kids make something real with real tools, then take it home.",
  testTitle:
    "Every toy here was played with by a real child before we put a price on it.",
  testText:
    "Forty Millbrook families take our new arrivals home for a week. They tell us what got played with, what got ignored and what broke. About one toy in ten makes it to the shelf.",
  eventsTitle: "In the shop soon",
  quotesTitle: "From the counter",
  quotes: [
    {
      text: "We came in for a birthday present and stayed for an hour in the play corner. The present was wrapped before we even asked.",
      by: "Priya, mum of two",
    },
    {
      text: "Jules fixed the wind-up rocket my dad gave me in 1989. My son now winds it up every morning.",
      by: "Daniel, toy hospital patient's owner",
    },
    {
      text: "The balance bird workshop is the only Saturday activity my eleven year old has ever asked to do twice.",
      by: "Hannah, Board Game Club parent",
    },
  ],
  closeTitle: "Come and play.",
  closeText:
    "The play corner is always open, the kettle is always on, and nobody minds if you only came in to look.",
};

export const pages = {
  shop: {
    title: "The shop",
    lead: "Every toy we sell, arranged the way the shelves are: by age first. Filter by what they are into, or sort by price.",
  },
  finder: {
    title: "Gift finder",
    lead: "Three questions, and we will pull the best toys off the shelf. Change any answer and the shelf rearranges.",
  },
  workshops: {
    title: "Workshops at the back bench",
    lead: "Small groups, real tools and something to take home. Every workshop is led by one of our staff at the bench in the back room, and every seat comes with a hot chocolate.",
  },
  events: {
    title: "Store events",
    lead: "Storytime, games nights, toy swaps and makers in the window. Everything is free; a few need a place saved.",
  },
  visit: {
    title: "Visit the shop",
    lead: "Open six days a week, with a play corner, a toy hospital and free gift wrap at the counter.",
  },
  about: {
    title: "We are a toy shop that tests toys on children.",
    lead: "Tinker has been on Larkspur Street since 2011, in an old hardware store with the oak counter and all the drawers still in it. Four of us run it, with forty tester families and a lot of help from the bakery next door.",
  },
};

export const checkout = {
  title: "Checkout",
  note: "This is a demo shop: nothing is sent, charged or shipped.",
  freeOver: 75,
  methods: [
    {
      id: "pickup",
      label: "Pick up at the shop",
      detail: "Ready by 5 pm if ordered before 3 pm",
      price: 0,
    },
    {
      id: "bike",
      label: "Bike delivery, Millbrook",
      detail: "Tuesdays and Fridays, within 3 miles",
      price: 6,
    },
    {
      id: "ship",
      label: "Ship anywhere in the US",
      detail: "3–5 working days",
      price: 9,
    },
  ],
};

export const imagery = {
  shelves: img(
    shopShelves,
    "Shop shelves stacked with toy theatres, wooden toys and boxed games",
    1500,
    1133,
  ),
  counter: img(
    shopCounter,
    "Inside a small toy shop with a red carpet, a counter and shelves of toys",
    1500,
    1020,
  ),
  windowTrain: img(
    windowTrain,
    "A toy train running beneath a lit-up holiday tree",
    1024,
    683,
  ),
};
