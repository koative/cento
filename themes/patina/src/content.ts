import sideboard from "./assets/sideboard.jpg";
import sideboardLong from "./assets/sideboard-long.jpg";
import palmWingback from "./assets/palm-wingback.jpg";
import readingCorner from "./assets/reading-corner.jpg";
import bentwood from "./assets/bentwood.jpg";
import chestChairs from "./assets/chest-chairs.jpg";
import campaignChest from "./assets/campaign-chest.jpg";
import commode from "./assets/commode.jpg";
import lamp from "./assets/lamp.jpg";
import caneArmchair from "./assets/cane-armchair.jpg";
import hutch from "./assets/hutch.jpg";
import welshDresser from "./assets/welsh-dresser.jpg";
import tubeChair from "./assets/tube-chair.jpg";
import blueWingback from "./assets/blue-wingback.jpg";
import redChairs from "./assets/red-chairs.jpg";
import warehouse from "./assets/warehouse.jpg";
import secretary from "./assets/secretary.jpg";
import parlour from "./assets/parlour.jpg";
import shopEra from "./assets/shop-era.jpg";
import restorationChairs from "./assets/restoration-chairs.jpg";
import upholsterer from "./assets/upholsterer.jpg";
import asFound from "./assets/as-found.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Patina",
  sector: "Vintage furniture",
  tagline: "Furniture with a past, measured and mended for its next room.",
  address: "Corliss Mills, Unit 4, 18 Tanner Street, Port Ardley, RI 02911",
  addressShort: "18 Tanner Street, Port Ardley",
  email: "hello@patina.example",
  phone: "+1 555 014 2290",
  phoneHref: "tel:+15550142290",
  hours: [
    { days: "Thursday – Friday", time: "11:00 – 18:00" },
    { days: "Saturday", time: "10:00 – 18:00" },
    { days: "Sunday", time: "11:00 – 16:00" },
    { days: "Monday – Wednesday", time: "Workshop only, by appointment" },
  ],
  floorNote: "New pieces go on the floor every Thursday at 11.",
};

export const nav = [
  { to: "/shop", label: "Shop the floor" },
  { to: "/rooms", label: "Room sets" },
  { to: "/restoration", label: "Restoration" },
  { to: "/visit", label: "Visit & delivery" },
  { to: "/about", label: "About" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

/* ───────────── The stock book ───────────── */

export const categories = ["Seating", "Storage", "Desks", "Lighting"] as const;
export type Category = (typeof categories)[number];

export const eras = [
  { id: "georgian", label: "Georgian & Federal", span: "1750 – 1830" },
  { id: "victorian", label: "Victorian & Revival", span: "1830 – 1910" },
  { id: "early-modern", label: "Early modern", span: "1910 – 1945" },
  { id: "mid-century", label: "Mid-century", span: "1945 – 1979" },
] as const;
export type EraId = (typeof eras)[number]["id"];

/** Condition grades as written on every tag. */
export const grades = [
  {
    id: "A",
    name: "Grade A — ready to live with",
    text: "Sound joints, original or sympathetic finish, drawers that run. Marks of age you would only notice if we pointed at them.",
  },
  {
    id: "B",
    name: "Grade B — honest wear",
    text: "Structurally sound with visible history: a water ring, a faded top, a scuffed foot. Every mark is listed on the piece page.",
  },
  {
    id: "C",
    name: "Grade C — a project",
    text: "Needs work we have not done yet: loose joints, a split seat, tired upholstery. Priced for it, and we can quote the restoration.",
  },
] as const;
export type Grade = (typeof grades)[number]["id"];

export type Dims = { w: number; d: number; h: number };

export type FinishOption = {
  id: string;
  label: string;
  /** Added to the base price, in dollars. */
  delta: number;
  note: string;
};

export type Piece = {
  id: string;
  stock: string;
  name: string;
  category: Category;
  era: EraId;
  date: string;
  origin: string;
  materials: string;
  grade: Grade;
  price: number;
  /** How many matching pieces are on the floor. */
  available: number;
  /** Quantity wording, e.g. "chair" for a set sold singly. */
  unit?: string;
  sold?: boolean;
  /** ISO date the piece went on the floor. */
  arrived: string;
  dims: Dims & { seat?: number };
  /** Largest part when the piece comes apart for moving. */
  splits?: { note: string; largest: Dims };
  images: Img[];
  summary: string;
  story: string[];
  marks: string[];
  options: FinishOption[];
};

const asShown = (note: string): FinishOption => ({
  id: "as-shown",
  label: "As photographed",
  delta: 0,
  note,
});

export const pieces: Piece[] = [
  {
    id: "haldane-teak-sideboard",
    stock: "P-0418",
    name: "Haldane teak sideboard",
    category: "Storage",
    era: "mid-century",
    date: "1964",
    origin: "High Wycombe, England",
    materials: "Teak veneer on blockboard, solid teak legs, afrormosia pulls",
    grade: "B",
    price: 1350,
    available: 1,
    arrived: "2026-10-15",
    dims: { w: 72, d: 18, h: 31 },
    images: [
      {
        src: sideboard,
        alt: "Long low teak sideboard with three central drawers between two cupboard doors, on tapered legs",
        w: 1800,
        h: 850,
      },
    ],
    summary:
      "Three drawers flanked by two cupboards, on legs that taper just enough. The kind of sideboard that holds the good glasses and the record player.",
    story: [
      "Bought from the second owner, who had it from her parents' dining room in Warwick. The drawers still carry the maker's paper label, half-legible, and a pencilled 1964 inside the left door.",
      "We cleaned it back to the original lacquer and re-waxed it. The top keeps two faint water rings: we can lift them if you choose the refinished option, or you can keep the evidence of thirty years of Sunday lunches.",
    ],
    marks: [
      "Two pale water rings, front left of the top",
      "Light scratching on the left door",
      "Left shelf peg replaced in brass",
    ],
    options: [
      asShown("Cleaned, waxed, ready this week"),
      {
        id: "refinished",
        label: "Top refinished",
        delta: 280,
        note: "Rings lifted, top re-lacquered — add 3 weeks",
      },
    ],
  },
  {
    id: "fresco-long-sideboard",
    stock: "P-0402",
    name: "Long sideboard with carved pulls",
    category: "Storage",
    era: "mid-century",
    date: "c. 1968",
    origin: "England",
    materials: "Teak and afrormosia, sculpted solid pulls",
    grade: "A",
    price: 1690,
    available: 1,
    arrived: "2026-10-08",
    dims: { w: 84, d: 18, h: 32 },
    images: [
      {
        src: sideboardLong,
        alt: "Seven-foot teak sideboard with sculpted wooden pulls running the length of four drawers and two cupboards",
        w: 1800,
        h: 719,
      },
    ],
    summary:
      "Seven feet of teak with pulls carved from the solid, so the whole front reads as one long line. Room for a dinner service and then some.",
    story: [
      "It came out of a house in Newport where it had stood under the same window since 1971, which explains the slightly warmer left end where the afternoon sun reached it.",
      "Every drawer runs on its original oak runners. We waxed them, tightened one back panel and otherwise left it alone.",
    ],
    marks: [
      "Left end a shade warmer from sunlight",
      "Small chip under the right cupboard door, invisible standing",
    ],
    options: [
      asShown("Ready this week"),
      {
        id: "oiled",
        label: "Re-oiled matte finish",
        delta: 220,
        note: "Flat Danish-oil finish — add 2 weeks",
      },
    ],
  },
  {
    id: "palm-wingback-and-stool",
    stock: "P-0421",
    name: "Wingback chair & footstool in palm print",
    category: "Seating",
    era: "mid-century",
    date: "c. 1958, re-covered 2025",
    origin: "Northern Europe",
    materials: "Beech frame, sprung seat, cotton palm-print cover",
    grade: "A",
    price: 890,
    available: 1,
    arrived: "2026-10-15",
    dims: { w: 30, d: 33, h: 41, seat: 17 },
    images: [
      {
        src: palmWingback,
        alt: "Wingback armchair covered in a blue and white palm-leaf print beside an old wooden cabinet radio",
        w: 1001,
        h: 1500,
      },
      {
        src: readingCorner,
        alt: "The palm-print wingback and matching footstool in a sunny corner with a tripod lamp and a radiogram",
        w: 1202,
        h: 1800,
      },
    ],
    summary:
      "A deep, upright wingback with its own footstool, sprung the old way and re-covered last winter in a palm print that should not work and absolutely does.",
    story: [
      "The frame is beech and the springs are hand-tied, which is why it sits firm rather than sinking. Our upholstery bench re-webbed the seat and re-covered both pieces in a heavy cotton print.",
      "If the palms are too much for your room, we will re-cover it in one of our two house fabrics before it leaves.",
    ],
    marks: [
      "Light wear to the feet",
      "Footstool cover pieced from the same bolt, pattern matched",
    ],
    options: [
      asShown("Palm print, ready now"),
      {
        id: "oatmeal-wool",
        label: "Re-cover in oatmeal wool",
        delta: 420,
        note: "House wool, add 4 weeks",
      },
      {
        id: "verdigris-velvet",
        label: "Re-cover in verdigris velvet",
        delta: 520,
        note: "Cotton velvet, add 4 weeks",
      },
    ],
  },
  {
    id: "bentwood-cafe-chair",
    stock: "P-0387",
    name: "Bentwood café chair, cane seat",
    category: "Seating",
    era: "early-modern",
    date: "c. 1920",
    origin: "Central Europe",
    materials: "Steam-bent beech, black lacquer, pressed-cane seat",
    grade: "B",
    price: 165,
    available: 6,
    unit: "chair",
    arrived: "2026-09-24",
    dims: { w: 17, d: 20, h: 34, seat: 18 },
    images: [
      {
        src: bentwood,
        alt: "Black bentwood café chair with a looped back and a pale woven cane seat against a grey wall",
        w: 1200,
        h: 1800,
      },
    ],
    summary:
      "Six matching café chairs from a closed dining room, sold singly so you can take two for the kitchen or all six for the table.",
    story: [
      "Steam-bent beech, screwed rather than glued, which is why these chairs are still going after a century of service. The lacquer is original and worn at the hands' natural grip.",
      "The pressed-cane seats are sound but brittle at the edges. Choose the re-caned option and our caner will weave new seats by hand.",
    ],
    marks: [
      "Lacquer worn at the back loop",
      "Cane brittle at the front edge on two chairs",
    ],
    options: [
      asShown("Original pressed cane"),
      {
        id: "recaned",
        label: "Hand re-caned seat",
        delta: 85,
        note: "Seven-step hand weave — add 2 weeks",
      },
    ],
  },
  {
    id: "inlaid-chest-of-drawers",
    stock: "P-0399",
    name: "Inlaid mahogany chest of drawers",
    category: "Storage",
    era: "georgian",
    date: "c. 1795",
    origin: "England",
    materials: "Mahogany, satinwood stringing, oval brass backplates",
    grade: "A",
    price: 2400,
    available: 1,
    arrived: "2026-10-01",
    dims: { w: 38, d: 20, h: 35 },
    images: [
      {
        src: chestChairs,
        alt: "Mahogany chest of three long drawers with oval brass handles, flanked by two chairs in green floral upholstery",
        w: 1800,
        h: 1200,
      },
    ],
    summary:
      "Three graduated long drawers under a crossbanded top, with the oval brasses it was made with. A bedroom chest that would hold its own in a hallway.",
    story: [
      "The drawers are dovetailed by hand, slightly irregular in the way only hand-cut joints are. The brasses are original: you can see the same wear on each where two centuries of fingers have pulled.",
      "French polished by our workshop last spring. The finish is soft rather than glassy, as it would have been.",
    ],
    marks: [
      "Restored veneer patch, top left corner",
      "Bottom drawer runner renewed in oak",
    ],
    options: [asShown("French polished, ready now")],
  },
  {
    id: "two-part-campaign-chest",
    stock: "P-0376",
    name: "Two-part campaign chest",
    category: "Storage",
    era: "victorian",
    date: "c. 1860",
    origin: "London",
    materials: "Mahogany, brass corners and flush handles",
    grade: "B",
    price: 3200,
    available: 1,
    arrived: "2026-09-17",
    dims: { w: 39, d: 18, h: 42 },
    splits: {
      note: "top chest lifts off the base",
      largest: { w: 39, d: 18, h: 24 },
    },
    images: [
      {
        src: campaignChest,
        alt: "Mahogany campaign chest with brass-bound corners and recessed brass handles, beside a small octagonal table",
        w: 1500,
        h: 1125,
      },
    ],
    summary:
      "Built to travel with an officer's baggage: two chests that stack, brass at every corner, handles sunk flush so nothing catches in transit.",
    story: [
      "Campaign furniture was made to come apart, and this one still does: the top chest lifts off its base, which makes it the easiest large piece in the warehouse to get up a narrow stair.",
      "The brass has been cleaned but not polished bright. We think it should look like it has been somewhere.",
    ],
    marks: [
      "Old repair to the left foot",
      "Faint ink stain inside the top drawer",
    ],
    options: [
      asShown("Brass cleaned, not polished"),
      {
        id: "bright-brass",
        label: "Brass polished bright",
        delta: 180,
        note: "Hand-polished and lacquered — add 1 week",
      },
    ],
  },
  {
    id: "serpentine-commode",
    stock: "P-0341",
    name: "Serpentine commode with gilt mounts",
    category: "Storage",
    era: "victorian",
    date: "c. 1890",
    origin: "France, in the Louis XV manner",
    materials: "Kingwood and walnut veneers, gilt-bronze mounts",
    grade: "A",
    price: 4800,
    available: 1,
    sold: true,
    arrived: "2026-08-20",
    dims: { w: 47, d: 22, h: 34 },
    images: [
      {
        src: commode,
        alt: "Curving three-drawer commode in figured walnut veneer with gilt handles and escutcheons, a small bronze on top",
        w: 1800,
        h: 1200,
      },
    ],
    summary:
      "A bombé front that curves in two directions at once, veneered in book-matched walnut. Sold in September to a collector in Providence.",
    story: [
      "We keep sold pieces on the site for a season so you can see what passes through. If you are looking for something like this, tell us: we see three or four French commodes a year.",
    ],
    marks: ["Sold — shown for reference"],
    options: [asShown("Sold")],
  },
  {
    id: "brass-reading-lamp",
    stock: "P-0412",
    name: "Brass reading lamp with fluted shade",
    category: "Lighting",
    era: "early-modern",
    date: "c. 1930",
    origin: "United States",
    materials: "Cast and spun brass, glass shade, new cloth flex",
    grade: "A",
    price: 260,
    available: 1,
    arrived: "2026-10-08",
    dims: { w: 10, d: 10, h: 19 },
    images: [
      {
        src: lamp,
        alt: "Brass table lamp with a fluted glass shade lit warmly beside old leather-bound books and a brass jug",
        w: 1800,
        h: 1331,
      },
    ],
    summary:
      "A heavy little lamp that throws exactly enough light to read by. Rewired by us, tested, and fitted with a braided cloth flex.",
    story: [
      "The base is cast brass with a spun stem; the shade is the original fluted glass, which is the part that usually does not survive. Ours has one small flea-bite on the rim, turned to the back.",
      "Every lamp we sell is rewired to current standards and takes a standard E26 bulb. We recommend a warm 2200K filament.",
    ],
    marks: ["Small chip on the back of the shade rim"],
    options: [
      asShown("Rewired, brass unpolished"),
      {
        id: "linen-shade",
        label: "With spare linen drum shade",
        delta: 60,
        note: "Ships with both shades",
      },
    ],
  },
  {
    id: "caned-tub-armchair",
    stock: "P-0393",
    name: "Caned tub armchair, ebonised frame",
    category: "Seating",
    era: "victorian",
    date: "c. 1840",
    origin: "Anglo-Indian",
    materials: "Hardwood frame, ebonised finish, woven cane",
    grade: "C",
    price: 1150,
    available: 1,
    arrived: "2026-09-24",
    dims: { w: 25, d: 24, h: 33, seat: 16 },
    images: [
      {
        src: caneArmchair,
        alt: "Low tub armchair with a high curved caned back and caned seat on a dark carved hardwood frame",
        w: 1414,
        h: 1500,
      },
    ],
    summary:
      "A low, enveloping armchair with a caned back that wraps round you. The frame is perfect; the cane is the original and is ready to retire.",
    story: [
      "Chairs like this were made in India for European houses and shipped home by the hundred, but the ones with carved scroll arms are scarce. The frame is tight and the ebonised finish is mellowed to deep brown.",
      "The cane has holes in the seat. We have priced it as a project. Choose the re-caned option and it leaves the workshop with new hand-woven cane, back and seat.",
    ],
    marks: [
      "Seat cane broken in two places",
      "Back cane brittle but whole",
      "Ebonising rubbed at the arm scrolls",
    ],
    options: [
      asShown("Original cane, needs work"),
      {
        id: "recaned",
        label: "Re-caned, back and seat",
        delta: 380,
        note: "Hand-woven cane — add 5 weeks",
      },
    ],
  },
  {
    id: "frisian-plate-cupboard",
    stock: "P-0366",
    name: "Oak cupboard with plate rack",
    category: "Storage",
    era: "georgian",
    date: "c. 1780",
    origin: "Friesland, Netherlands",
    materials: "Oak, fruitwood inlay, original iron hinges",
    grade: "B",
    price: 3900,
    available: 1,
    arrived: "2026-09-10",
    dims: { w: 50, d: 20, h: 84 },
    splits: {
      note: "rack lifts off the base",
      largest: { w: 50, d: 20, h: 46 },
    },
    images: [
      {
        src: hutch,
        alt: "Tall carved oak cupboard with an open plate rack above two inlaid doors, displaying blue and white china against a red wall",
        w: 1200,
        h: 1800,
      },
    ],
    summary:
      "A farmhouse dresser from the north of Holland, the plate rack still notched for the family's blue-and-white. Seven feet of oak that comes apart in two.",
    story: [
      "The base has two inlaid doors over a single drawer; the rack above has three shelves with plate grooves and a carved cornice. The inlay is fruitwood, laid in by a country joiner who was clearly enjoying himself.",
      "The rack lifts off, so it goes through an ordinary door. The china is not included, though we understand the temptation.",
    ],
    marks: [
      "Old worm holes, treated and inactive",
      "One replaced cornice block on the right",
      "Wear to the drawer front from use",
    ],
    options: [asShown("Waxed, ready now")],
  },
  {
    id: "oak-welsh-dresser",
    stock: "P-0405",
    name: "Oak Welsh dresser",
    category: "Storage",
    era: "victorian",
    date: "c. 1885",
    origin: "Carmarthenshire, Wales",
    materials: "Solid oak, pegged joints, turned pot-board legs",
    grade: "A",
    price: 2650,
    available: 1,
    arrived: "2026-10-08",
    dims: { w: 60, d: 19, h: 78 },
    splits: {
      note: "rack lifts off the base",
      largest: { w: 60, d: 19, h: 36 },
    },
    images: [
      {
        src: welshDresser,
        alt: "Oak Welsh dresser with an open three-shelf rack above three drawers and an arched apron over a low pot board",
        w: 1145,
        h: 1500,
      },
    ],
    summary:
      "Three drawers over a shaped apron and a pot board, an open rack above. Proper kitchen furniture, made to take a lifetime of plates and still look calm.",
    story: [
      "Pegged rather than glued, and made of oak boards wide enough that you can count the growth rings. The colour is the real thing: a century of beeswax and kitchen air.",
      "The rack lifts off its base, so it fits through a standard doorway in two trips.",
    ],
    marks: [
      "Shrinkage gap in the back boards, as expected",
      "Small knot hole in the second shelf",
    ],
    options: [
      asShown("Waxed, ready now"),
      {
        id: "lime-waxed",
        label: "Pale lime-waxed finish",
        delta: 340,
        note: "Lightened, matte — add 3 weeks",
      },
    ],
  },
  {
    id: "red-tube-armchair",
    stock: "P-0358",
    name: "Bent beech armchair, red lacquer",
    category: "Seating",
    era: "mid-century",
    date: "1960s",
    origin: "Czechoslovakia",
    materials: "Steam-bent beech in red lacquer, woven cane seat",
    grade: "A",
    price: 540,
    available: 1,
    sold: true,
    arrived: "2026-08-27",
    dims: { w: 22, d: 20, h: 29, seat: 17 },
    images: [
      {
        src: tubeChair,
        alt: "Red-lacquered bentwood armchair with a continuous looped frame and a woven cane seat",
        w: 1350,
        h: 1800,
      },
    ],
    summary:
      "One continuous loop of steam-bent beech, lacquered pillar-box red. Sold within a day of arriving, which is the usual fate of anything red.",
    story: [
      "Shown for reference. We find bentwood armchairs from the same factories a few times a year; leave your email on the sell page or call and we will put your name on the next one.",
    ],
    marks: ["Sold — shown for reference"],
    options: [asShown("Sold")],
  },
  {
    id: "blue-damask-wing-chair",
    stock: "P-0381",
    name: "Wing chair in blue damask",
    category: "Seating",
    era: "victorian",
    date: "c. 1905, Colonial Revival",
    origin: "Boston, Massachusetts",
    materials: "Mahogany legs, maple frame, wool damask cover",
    grade: "A",
    price: 1950,
    available: 1,
    arrived: "2026-09-17",
    dims: { w: 33, d: 30, h: 46, seat: 15 },
    images: [
      {
        src: blueWingback,
        alt: "Tall wing chair upholstered in deep blue damask on mahogany cabriole legs with carved ball-and-claw feet",
        w: 1233,
        h: 1800,
      },
    ],
    summary:
      "A tall-backed wing chair on cabriole legs and ball-and-claw feet, made a century after the style it copies and better built than most of the originals.",
    story: [
      "The wings were made to keep a draught off your neck in an eighteenth-century parlour. Here they simply make it the best chair in the room to fall asleep in.",
      "The damask is a 1980s cover in very good order. If you would rather start fresh, our upholsterer will strip it back to the frame.",
    ],
    marks: ["Light fading on the right wing", "Scratches to the front feet"],
    options: [
      asShown("Blue damask, ready now"),
      {
        id: "oatmeal-wool",
        label: "Re-cover in oatmeal wool",
        delta: 650,
        note: "Stripped to frame, add 5 weeks",
      },
      {
        id: "verdigris-velvet",
        label: "Re-cover in verdigris velvet",
        delta: 780,
        note: "Stripped to frame, add 5 weeks",
      },
    ],
  },
  {
    id: "pair-of-deco-club-chairs",
    stock: "P-0414",
    name: "Pair of Deco club chairs, red wool",
    category: "Seating",
    era: "early-modern",
    date: "c. 1935",
    origin: "Czechoslovakia",
    materials: "Bent beech arms, sprung seats, red wool cover",
    grade: "B",
    price: 1380,
    available: 1,
    unit: "pair",
    arrived: "2026-10-15",
    dims: { w: 26, d: 31, h: 31, seat: 16 },
    images: [
      {
        src: redChairs,
        alt: "Two matching armchairs in faded red wool with curved bentwood arms, on a grey warehouse floor",
        w: 864,
        h: 720,
      },
      {
        src: warehouse,
        alt: "The warehouse floor: rows of armchairs in floral and red covers under shelving stacked with cabinets and bentwood",
        w: 1350,
        h: 1800,
      },
    ],
    summary:
      "A pair of low club chairs with arms bent from a single length of beech. Sold as a pair, because separating them would be unkind.",
    story: [
      "These came in last week with a container of furniture from a closed hotel near Brno. The springs are good; the wool cover is original, faded to the colour of old brick, with a little wear on the seat fronts.",
      "Keep the faded wool for its warmth, or have our upholsterer re-cover both in a rust wool that is close to what they would have worn new.",
    ],
    marks: [
      "Wool worn at the front seat edges",
      "Arms with small dents and lacquer loss",
    ],
    options: [
      asShown("Original red wool"),
      {
        id: "rust-wool",
        label: "Re-covered in rust wool",
        delta: 900,
        note: "Both chairs, add 5 weeks",
      },
    ],
  },
  {
    id: "mahogany-bureau-bookcase",
    stock: "P-0349",
    name: "Mahogany bureau bookcase, mirrored doors",
    category: "Desks",
    era: "georgian",
    date: "c. 1780",
    origin: "Boston, Massachusetts",
    materials: "Mahogany, white pine secondary wood, brass hardware",
    grade: "A",
    price: 5600,
    available: 1,
    arrived: "2026-08-27",
    dims: { w: 40, d: 22, h: 92 },
    splits: {
      note: "bookcase lifts off the desk",
      largest: { w: 40, d: 22, h: 44 },
    },
    images: [
      {
        src: secretary,
        alt: "Tall mahogany bureau bookcase with a scrolled bonnet top and two arched mirrored doors above a slant-front desk on bracket feet",
        w: 1143,
        h: 1800,
      },
    ],
    summary:
      "A slant-front desk under a bookcase with arched mirror doors and a scrolled bonnet top. The kind of piece a house is rearranged around.",
    story: [
      "The fall front opens to pigeonholes and small drawers in a stepped interior, with a well under the writing surface. The mirror glass in the doors is replaced; the bracket feet and the hardware are period.",
      "It weighs more than you think and comes apart in two, which is the only reason the stair at your place will be fine.",
    ],
    marks: [
      "Mirror plates replaced c. 1950",
      "Small veneer repair at the base of the fall",
    ],
    options: [asShown("Ready now")],
  },
  {
    id: "skirted-tapestry-sofa",
    stock: "P-0420",
    name: "Skirted three-seat sofa in tapestry",
    category: "Seating",
    era: "mid-century",
    date: "c. 1974",
    origin: "Grand Rapids, Michigan",
    materials:
      "Hardwood frame, coil springs, cotton tapestry, feather cushions",
    grade: "B",
    price: 1100,
    available: 1,
    arrived: "2026-10-15",
    dims: { w: 84, d: 36, h: 31, seat: 18 },
    images: [
      {
        src: parlour,
        alt: "Three-seat sofa in a gold and brown tapestry with a skirted base and loose cushions, in a room full of framed pictures",
        w: 1500,
        h: 1001,
      },
    ],
    summary:
      "Seven feet of 1970s comfort: coil springs, feather-wrapped cushions and a gold tapestry that has been waiting for its moment again.",
    story: [
      "From a family room in Cranston where it was, by all accounts, mostly looked at. The frame is solid hardwood, the springs tight, the cushions recently re-filled.",
      "We like the tapestry. If you do not, we can re-cover it in either house fabric before delivery.",
    ],
    marks: [
      "Slight fading along the top of the back",
      "Skirt re-hemmed on the left side",
    ],
    options: [
      asShown("Gold tapestry"),
      {
        id: "oatmeal-wool",
        label: "Re-cover in oatmeal wool",
        delta: 1150,
        note: "Add 6 weeks",
      },
      {
        id: "verdigris-velvet",
        label: "Re-cover in verdigris velvet",
        delta: 1350,
        note: "Add 6 weeks",
      },
    ],
  },
];

export const pieceById = (id: string) => pieces.find((p) => p.id === id);

/* ───────────── Room sets ───────────── */

export type RoomSet = {
  slug: string;
  name: string;
  image: Img;
  blurb: string;
  story: string[];
  pieces: { id: string; qty: number }[];
  /** Footprint of the room as staged on the floor, in feet. */
  footprint: string;
};

export const rooms: RoomSet[] = [
  {
    slug: "the-reading-corner",
    name: "The reading corner",
    image: {
      src: readingCorner,
      alt: "A sunny corner with a palm-print wingback and footstool, a tripod lamp and a radiogram on a wood floor",
      w: 1202,
      h: 1800,
    },
    blurb:
      "One deep chair, one good lamp and somewhere to put the books down. The smallest room set we stage, and the one people sit in longest.",
    story: [
      "We built this corner around the palm-print wingback the week it came back from the upholstery bench. It wanted a lamp with some weight to it and a piece tall enough to hold the corner, so we brought over the bureau bookcase.",
      "Take the chair alone, or the whole corner. Nothing here needs a large room: the footprint is under seven feet square.",
    ],
    pieces: [
      { id: "palm-wingback-and-stool", qty: 1 },
      { id: "brass-reading-lamp", qty: 1 },
      { id: "mahogany-bureau-bookcase", qty: 1 },
    ],
    footprint: "7 × 6 ft",
  },
  {
    slug: "the-front-parlour",
    name: "The front parlour",
    image: {
      src: parlour,
      alt: "A front room with a gold tapestry sofa, floral armchairs, a wall of framed pictures and a checkerboard floor",
      w: 1500,
      h: 1001,
    },
    blurb:
      "A long sofa, a pair of club chairs facing it and a sideboard to hold the drinks. Pattern on pattern, because the 1970s were right about that.",
    story: [
      "The tapestry sofa and the red club chairs arrived in the same week from opposite directions, and look as though they have been arguing amiably ever since.",
      "The long sideboard anchors the back wall. Allow at least 14 feet of wall for the sofa and sideboard side by side, or stage them facing each other.",
    ],
    pieces: [
      { id: "skirted-tapestry-sofa", qty: 1 },
      { id: "pair-of-deco-club-chairs", qty: 1 },
      { id: "fresco-long-sideboard", qty: 1 },
    ],
    footprint: "15 × 12 ft",
  },
  {
    slug: "the-dining-wall",
    name: "The dining wall",
    image: {
      src: hutch,
      alt: "A carved oak plate cupboard filled with blue and white china against a deep red wall",
      w: 1200,
      h: 1800,
    },
    blurb:
      "A plate cupboard tall enough to fill a wall, four café chairs and a sideboard for everything the cupboard cannot hold.",
    story: [
      "Dining rooms are where old furniture earns its keep: it was made to be used every day and it still wants to be. The Frisian cupboard carries the wall; the bentwood chairs go round whatever table you already have.",
      "Four chairs are listed here; there are six on the floor if your table seats more.",
    ],
    pieces: [
      { id: "frisian-plate-cupboard", qty: 1 },
      { id: "bentwood-cafe-chair", qty: 4 },
      { id: "haldane-teak-sideboard", qty: 1 },
    ],
    footprint: "14 × 11 ft",
  },
  {
    slug: "the-guest-bedroom",
    name: "The guest bedroom",
    image: {
      src: chestChairs,
      alt: "An inlaid mahogany chest of drawers between two upholstered chairs on a patterned parquet floor",
      w: 1800,
      h: 1200,
    },
    blurb:
      "Somewhere for a guest to unpack and somewhere to sit and put their shoes on. Georgian chest, a wing chair, a campaign chest at the foot of the bed.",
    story: [
      "Bedroom furniture asks for drawers that run quietly and a chair you can drape things over. The inlaid chest does the first, the blue wing chair does the second, and the campaign chest is there because guests always bring more than they meant to.",
      "Every piece in this set comes apart or fits a standard doorway whole — useful for upstairs rooms.",
    ],
    pieces: [
      { id: "inlaid-chest-of-drawers", qty: 1 },
      { id: "blue-damask-wing-chair", qty: 1 },
      { id: "two-part-campaign-chest", qty: 1 },
    ],
    footprint: "12 × 11 ft",
  },
];

/* ───────────── Pages ───────────── */

export const home = {
  title: "Furniture with a past, ready for its next room.",
  intro:
    "Patina is a warehouse of vintage and antique furniture in an old mill in Port Ardley. Every piece is measured, graded and, where it needs it, mended in our own workshop before it goes on the floor.",
  heroImage: {
    src: warehouse,
    alt: "The Patina warehouse floor: armchairs in red and floral covers in front of tall shelving stacked with cabinets and bentwood",
    w: 1350,
    h: 1800,
  } as Img,
  heroTags: [
    { pieceId: "pair-of-deco-club-chairs", x: 68, y: 74 },
    { pieceId: "bentwood-cafe-chair", x: 30, y: 32 },
  ],
  arrivalsTitle: "On the floor this week",
  arrivalsText:
    "Thursday's delivery: unpacked, measured and tagged. Most new pieces go within ten days.",
  kindsTitle: "Browse by what it is",
  roomTitle: "Room sets, staged on the floor",
  roomText:
    "We arrange the warehouse into rooms so you can see how pieces from different decades get on. Buy the piece, or the room.",
  fitTitle: "Will it go through your door?",
  fitPieceId: "oak-welsh-dresser",
  restoreTitle: "Mended in the back room",
  restoreText:
    "Behind the shop floor is the workshop where our pieces are cleaned, re-glued, re-caned and re-covered. It takes in your furniture too.",
  sellTitle: "Selling a piece? We buy from the source.",
  sellText:
    "Most of the floor comes from houses within a day's drive. Send us photographs and measurements and we reply within three working days with a cash offer and a collection date.",
  sellSteps: [
    {
      title: "Send photographs",
      text: "Front, back, underside and any maker's mark. Measurements if you have a tape.",
    },
    {
      title: "Get an offer",
      text: "A fixed price within three working days, or an honest no with a suggestion of who might buy it.",
    },
    {
      title: "We collect",
      text: "Two people and a van, blanket-wrapped. Paid by transfer the day it leaves your house.",
    },
  ],
  gradesTitle: "What the letter on the tag means",
  quote: {
    text: "We measured the stair twice, they measured it a third time, and the campaign chest went up in two halves exactly as they said it would. It looks like it has always lived here.",
    who: "Imogen Ashby, bought a campaign chest in March",
  },
  closeTitle: "Come and sit in everything.",
  closeText:
    "The warehouse is open Thursday to Sunday. Park in the mill yard, bring your measurements, and try every chair.",
  closeImage: {
    src: shopEra,
    alt: "Inside the showroom: oak desks, a leather armchair, small chests and pictures under a long bright window",
    w: 1500,
    h: 1130,
  } as Img,
};

export const restoration = {
  title: "Restoration",
  intro:
    "Our workshop restores furniture conservatively: we stabilise first, clean second and replace only what cannot be saved. The same four people work on our stock and on yours.",
  image: {
    src: restorationChairs,
    alt: "A row of wooden dining chairs with carved splat backs waiting on a dusty workshop floor, one with its seat removed",
    w: 1202,
    h: 1800,
  } as Img,
  archive: {
    src: upholsterer,
    alt: "Black and white photograph of an upholsterer tying springs into a sofa frame in a factory, early twentieth century",
    w: 1800,
    h: 1289,
  } as Img,
  archiveCaption:
    "Springing a sofa by hand, 1908. We still tie springs the same way, eight knots to a coil.",
  services: [
    {
      name: "French polishing",
      text: "Shellac rubbed in by hand, dozens of thin coats. For mahogany, walnut and anything Georgian.",
      from: 380,
      weeks: "3–4",
    },
    {
      name: "Re-caning",
      text: "Hand-woven seven-step cane for chairs with drilled seats; pressed sheet cane for grooved seats.",
      from: 85,
      weeks: "2–5",
    },
    {
      name: "Re-upholstery",
      text: "Traditional springing, horsehair and calico, or modern foam where a chair was built for it. Our fabrics or yours.",
      from: 420,
      weeks: "4–6",
    },
    {
      name: "Veneer & inlay repair",
      text: "Lifted veneer re-laid with hide glue, missing sections matched from our stock of old timber.",
      from: 140,
      weeks: "2–3",
    },
    {
      name: "Joinery & structure",
      text: "Loose joints taken apart and re-glued, broken legs pinned, drawer runners renewed in oak.",
      from: 120,
      weeks: "1–3",
    },
    {
      name: "Mid-century refinishing",
      text: "Teak and rosewood cleaned, ring marks lifted, re-oiled or re-lacquered to the original sheen.",
      from: 220,
      weeks: "2–3",
    },
  ],
  steps: [
    {
      title: "Show us the piece",
      text: "Bring it to the warehouse on a Thursday or Friday, or send photographs with the form below.",
    },
    {
      title: "Assessment and quote",
      text: "A written quote within five working days, item by item, with what we recommend leaving alone.",
    },
    {
      title: "In the workshop",
      text: "We photograph the piece at each stage and send you the pictures. Nothing beyond the quote without asking.",
    },
    {
      title: "Collection or delivery",
      text: "Collect from the yard or have it delivered with our van. Every job carries a two-year workmanship guarantee.",
    },
  ],
  estimator: {
    pieces: [
      { id: "chair", label: "Dining or side chair", factor: 1 },
      { id: "armchair", label: "Armchair or wing chair", factor: 1.6 },
      { id: "sofa", label: "Sofa or settee", factor: 2.8 },
      { id: "chest", label: "Chest of drawers or commode", factor: 1.8 },
      { id: "sideboard", label: "Sideboard or dresser", factor: 2.2 },
      { id: "table", label: "Dining or side table", factor: 1.7 },
    ],
    jobs: [
      { id: "polish", label: "French polish or refinish", base: 220 },
      { id: "cane", label: "Re-cane a seat", base: 85 },
      { id: "upholstery", label: "Re-upholster", base: 260 },
      { id: "veneer", label: "Veneer repair", base: 140 },
      { id: "joinery", label: "Re-glue joints / structure", base: 120 },
    ],
  },
};

export const sell = {
  title: "Sell us a piece",
  intro:
    "We buy single pieces and whole houses, from Maine to the Delaware. Fill in what you know, attach photographs, and you will have a fixed offer or an honest no within three working days.",
  image: {
    src: asFound,
    alt: "A floral armchair as found, left on a cobbled street against a stone wall",
    w: 1200,
    h: 1200,
  } as Img,
  imageCaption:
    "As found. Tired covers do not put us off — a sound frame is what we pay for.",
  buy: [
    "Solid-wood case furniture: chests, dressers, sideboards, desks, bookcases",
    "Chairs and sofas with sound frames, in any cover",
    "Mid-century teak, rosewood and oak, labelled or not",
    "Period lighting in brass, bronze or glass, working or not",
  ],
  pass: [
    "Flat-pack and particleboard furniture",
    "Pieces with active woodworm or mould",
    "Reproduction pieces sold as period",
    "Mattresses and bed linen",
  ],
  kinds: [
    "Chair or armchair",
    "Sofa or settee",
    "Chest or dresser",
    "Sideboard or cabinet",
    "Desk or bookcase",
    "Table",
    "Lighting",
    "A whole house or room",
  ],
};

export const about = {
  title: "A warehouse, a workshop and a van",
  intro:
    "Patina opened in 2009 on one floor of Corliss Mills, a brick textile mill on the Ardley river. It now fills two floors, a yard and a workshop, and it is still run by the two people who started it.",
  image: {
    src: shopEra,
    alt: "The showroom floor with desks, chests, a leather armchair and framed pictures under a long run of windows",
    w: 1500,
    h: 1130,
  } as Img,
  story: [
    "Ruth Okafor was a furniture conservator at a regional museum; Daniel Marsh drove a removal van and kept the best things people threw away. They met at an estate sale over the same Welsh dresser, and agreed — after some negotiation — to sell it together.",
    "The idea has not changed since. Buy good furniture from the houses it has lived in, do only the work it needs, tell people exactly what they are buying, and price it so that it gets used rather than kept for best.",
    "We are not a gallery and we are not a junk shop. We are somewhere in between, which is where most good furniture ends up.",
  ],
  principles: [
    {
      title: "Measured twice",
      text: "Every piece is measured by two people before it is tagged. The dimensions on the site are the ones on the tag.",
    },
    {
      title: "Every mark listed",
      text: "If we can see a scratch, a repair or a replaced part, it is on the piece page. Nothing is hidden by the camera angle.",
    },
    {
      title: "Mend, don't remake",
      text: "We conserve rather than strip: original finishes are cleaned, not sanded, unless the finish is beyond saving.",
    },
    {
      title: "Back to us, always",
      text: "If you ever sell a piece you bought here, we will make you an offer on it first. Some pieces have been through the warehouse three times.",
    },
  ],
  team: [
    {
      name: "Ruth Okafor",
      role: "Co-founder, workshop",
      text: "Trained in furniture conservation; still does every French polish herself.",
    },
    {
      name: "Daniel Marsh",
      role: "Co-founder, buying",
      text: "Drives roughly forty thousand miles a year to look at furniture in people's houses.",
    },
    {
      name: "Teodor Halvorsen",
      role: "Upholstery",
      text: "Ties springs by hand and has opinions about horsehair.",
    },
    {
      name: "Ana Liang",
      role: "Caning & the shop floor",
      text: "Weaves the seats and runs the floor from Thursday to Sunday.",
    },
  ],
};

export const visit = {
  title: "Visit & delivery",
  intro:
    "The warehouse is two floors of Corliss Mills with a loading yard at the back. Everything on the website is on the floor unless it is marked as in the workshop.",
  image: {
    src: warehouse,
    alt: "Rows of armchairs and stacked cabinets on the upper warehouse floor",
    w: 1350,
    h: 1800,
  } as Img,
  directions: [
    "From I-95 take exit 27 and follow signs for the river. Corliss Mills is the brick building with the water tower.",
    "Free parking in the mill yard. If you are collecting, drive round to Loading Bay 2 and ring the bell.",
    "The ground floor is step-free; a goods lift serves the upper floor.",
  ],
  delivery: [
    {
      name: "Collect from the yard",
      price: 0,
      text: "We load it into your vehicle, wrapped. Collection within 14 days of purchase.",
    },
    {
      name: "Two-person delivery, within 60 miles",
      price: 95,
      text: "Placed in the room of your choice, packaging removed. Thursday to Saturday.",
    },
    {
      name: "Blanket-wrapped freight, East Coast",
      price: 240,
      text: "Shared van from Maine to Virginia, two to three weeks. Placed in your room.",
    },
  ],
  faq: [
    {
      q: "Can I return a piece?",
      a: "Yes, within 14 days of delivery if it is not as described — we collect it at our cost. If you simply change your mind, we take it back for store credit, less the delivery charge.",
    },
    {
      q: "Can you hold a piece while I measure?",
      a: "We hold any piece for 48 hours on request, free. Call or email with the stock number from the tag.",
    },
    {
      q: "Do you deliver up stairs?",
      a: "Yes. Tell us the floor and whether there is a lift at checkout. Pieces marked as coming apart are carried in parts and reassembled in the room.",
    },
    {
      q: "What does “as photographed” mean?",
      a: "That the piece leaves in the condition shown, after cleaning. Workshop options are done to order and add the number of weeks shown next to them.",
    },
    {
      q: "Is the furniture treated for woodworm?",
      a: "Every piece with old worm holes is treated and quarantined for four weeks before it goes on the floor. We do not sell anything with active worm.",
    },
    {
      q: "Do you ship outside the East Coast?",
      a: "Not ourselves, but we crate pieces for specialist carriers and will get you a quote. Expect two to four weeks.",
    },
  ],
};

export const newsletter = {
  title: "Thursday's arrivals, by email",
  text: "One email a week, sent at 9am on Thursdays with everything that goes on the floor at 11.",
};

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "The floor" },
      { to: "/rooms", label: "Room sets" },
      { to: "/cart", label: "Your cart" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/restoration", label: "Restoration" },
      { to: "/sell", label: "Sell to us" },
      { to: "/visit", label: "Visit & delivery" },
      { to: "/about", label: "About Patina" },
    ],
  },
];

export const notFound = {
  title: "That piece has left the building.",
  text: "The page you were after does not exist, or the piece has been sold and its page taken down. The floor is restocked every Thursday.",
};
