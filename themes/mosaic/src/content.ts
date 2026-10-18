import alderLiving from "./assets/alder-living.jpg";
import alderDining from "./assets/alder-dining.jpg";
import alderHall from "./assets/alder-hall.jpg";
import harrowLiving from "./assets/harrow-living.jpg";
import harrowChair from "./assets/harrow-chair.jpg";
import harrowLounge from "./assets/harrow-lounge.jpg";
import fennelRoom from "./assets/fennel-room.jpg";
import fennelTable from "./assets/fennel-table.jpg";
import wrenSuite from "./assets/wren-suite.jpg";
import wrenBed from "./assets/wren-bed.jpg";
import wrenBath from "./assets/wren-bath.jpg";
import calderKitchen from "./assets/calder-kitchen.jpg";
import calderDining from "./assets/calder-dining.jpg";
import northlightFloor from "./assets/northlight-floor.jpg";
import northlightHall from "./assets/northlight-hall.jpg";
import juniperLiving from "./assets/juniper-living.jpg";
import juniperStudy from "./assets/juniper-study.jpg";
import juniperBath from "./assets/juniper-bath.jpg";
import sageBedroom from "./assets/sage-bedroom.jpg";
import longRoom from "./assets/long-room.jpg";
import mCarrara from "./assets/m-carrara.jpg";
import mConnemara from "./assets/m-connemara.jpg";
import mCrema from "./assets/m-crema.jpg";
import mTravertine from "./assets/m-travertine.jpg";
import mSlate from "./assets/m-slate.jpg";
import mWhiteOak from "./assets/m-white-oak.jpg";
import mBrushedOak from "./assets/m-brushed-oak.jpg";
import mWalnut from "./assets/m-walnut.jpg";
import mOxblood from "./assets/m-oxblood-render.jpg";
import mOchre from "./assets/m-ochre-plaster.jpg";
import mTerrazzo from "./assets/m-terrazzo.jpg";
import mIvory from "./assets/m-ivory-speckle.jpg";
import mTerracotta from "./assets/m-terracotta.jpg";
import mBrass from "./assets/m-brass.jpg";
import mVelvet from "./assets/m-velvet.jpg";

export const brand = {
  name: "Mosaic",
  sector: "Interior design studio",
  tagline: "Rooms composed from the materials up.",
  intro:
    "Mosaic is an interior design studio in Portland, Maine. We design homes, small hotels and restaurants across New England, and every project starts at our sample table: stone, timber, plaster and cloth you can hold in the light of your own room.",
  email: "hello@mosaic.example",
  phone: "+1 555 0142 3870",
  phoneHref: "tel:+155501423870",
  address: ["18 Cordage Lane", "Portland, Maine 04101"],
  hours: [
    { days: "Studio, Mon–Fri", time: "9:00–17:30" },
    { days: "Material library, Thu–Sat", time: "10:00–17:00" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/materials", label: "Material library" },
  { to: "/studio", label: "Studio" },
];

/* ---------- Material library ---------- */

export type Family =
  "Stone" | "Timber" | "Plaster" | "Tile" | "Metal" | "Textile";
export const families: Family[] = [
  "Stone",
  "Timber",
  "Plaster",
  "Tile",
  "Metal",
  "Textile",
];
export type Tone = "Light" | "Mid" | "Dark";

export type Material = {
  id: string;
  name: string;
  family: Family;
  tone: Tone;
  /** Dominant colour, used where the sample is shown as a flat chip. */
  hex: string;
  image: string;
  origin: string;
  finish: string;
  format: string;
  price: number;
  unit: string;
  leadWeeks: number;
  bestFor: string[];
  care: string;
  note: string;
  pairs: string[];
};

export const materials: Material[] = [
  {
    id: "carrara",
    name: "Carrara Bianco",
    family: "Stone",
    tone: "Light",
    hex: "#cfd3d6",
    image: mCarrara,
    origin: "Apuan Alps, Tuscany",
    finish: "Honed",
    format: "Slab, 20 mm and 30 mm",
    price: 96,
    unit: "sq ft",
    leadWeeks: 6,
    bestFor: ["Vanities", "Splashbacks", "Fireplace surrounds"],
    care: "Seal on install and every twelve months. Wipe acids — lemon, wine, vinegar — straight away; honed marble etches before it stains.",
    note: "The grey-veined marble everyone thinks they know. Honed rather than polished, it goes soft and chalky in north light and stops looking like a hotel lobby.",
    pairs: ["brushed-oak", "brass", "velvet"],
  },
  {
    id: "connemara",
    name: "Connemara Green",
    family: "Stone",
    tone: "Mid",
    hex: "#8f9a5c",
    image: mConnemara,
    origin: "Lissoughter quarry, Galway",
    finish: "Polished",
    format: "Slab offcuts, 20 mm",
    price: 148,
    unit: "sq ft",
    leadWeeks: 10,
    bestFor: ["Kitchen islands", "Bar tops", "Small tables"],
    care: "Polished surfaces need a pH-neutral cleaner only. Keep a cutting board on it — the serpentine is softer than granite.",
    note: "A moss-and-cream serpentine marble we buy in offcuts and use in small, decisive amounts. One island top in this stone carries a whole kitchen.",
    pairs: ["white-oak", "brass", "ivory-speckle"],
  },
  {
    id: "crema",
    name: "Crema Quartzite",
    family: "Stone",
    tone: "Light",
    hex: "#ddd6c6",
    image: mCrema,
    origin: "Minas Gerais, Brazil",
    finish: "Leathered",
    format: "Slab, 20 mm",
    price: 112,
    unit: "sq ft",
    leadWeeks: 8,
    bestFor: ["Worktops", "Shower walls", "Window sills"],
    care: "Harder than marble and close to stain-proof once sealed. A damp cloth is enough day to day.",
    note: "Warm white with long sandy drifts. We reach for it when a client wants marble but cooks like a professional.",
    pairs: ["walnut", "ochre-plaster", "terracotta"],
  },
  {
    id: "travertine",
    name: "Honey Travertine",
    family: "Stone",
    tone: "Mid",
    hex: "#9b7e62",
    image: mTravertine,
    origin: "Denizli, Turkey",
    finish: "Filled and honed",
    format: "Tile 24 × 12 in, slab",
    price: 38,
    unit: "sq ft",
    leadWeeks: 5,
    bestFor: ["Floors", "Bath surrounds", "Coffee tables"],
    care: "Filled travertine is sealed at the yard; reseal yearly in wet rooms. Avoid bleach-based cleaners.",
    note: "Banded, bubbled and the colour of strong tea with milk. It ages without complaint, which is why we put it underfoot.",
    pairs: ["velvet", "walnut", "crema"],
  },
  {
    id: "slate",
    name: "Sand Slate",
    family: "Stone",
    tone: "Mid",
    hex: "#a8a191",
    image: mSlate,
    origin: "Vermont–New York slate belt",
    finish: "Natural cleft",
    format: "Tile 18 × 18 in",
    price: 22,
    unit: "sq ft",
    leadWeeks: 3,
    bestFor: ["Entry halls", "Mudrooms", "Terraces"],
    care: "Sweep grit away; mop with warm water. Cleft faces hide boots and dogs better than anything we stock.",
    note: "A pale, wavy slate from four hours west of the studio. Local, hard-wearing and quietly textured underfoot.",
    pairs: ["white-oak", "oxblood-render", "terrazzo"],
  },
  {
    id: "white-oak",
    name: "Rift White Oak",
    family: "Timber",
    tone: "Light",
    hex: "#c08a4a",
    image: mWhiteOak,
    origin: "Appalachian hardwood mills",
    finish: "Hardwax oil, matt",
    format: "Wide plank, cabinetry veneer",
    price: 19,
    unit: "sq ft",
    leadWeeks: 4,
    bestFor: ["Floors", "Joinery", "Kitchen fronts"],
    care: "Spot-repair with hardwax oil; no need to sand a whole room for a scratch. Avoid steam mops.",
    note: "Rift-sawn so the grain runs straight and calm. It is the quiet field in more than half our projects.",
    pairs: ["connemara", "slate", "brass"],
  },
  {
    id: "brushed-oak",
    name: "Wire-brushed Oak",
    family: "Timber",
    tone: "Mid",
    hex: "#a36f4c",
    image: mBrushedOak,
    origin: "Northern France",
    finish: "Brushed, natural oil",
    format: "Engineered plank, 7 in",
    price: 14,
    unit: "sq ft",
    leadWeeks: 5,
    bestFor: ["Floors", "Bedrooms", "Stair treads"],
    care: "The brushed grain forgives wear. Re-oil high-traffic paths every two to three years.",
    note: "Knotty, open-grained and a little rustic. Children, chairs and wet dogs only make it look better.",
    pairs: ["carrara", "ochre-plaster", "velvet"],
  },
  {
    id: "walnut",
    name: "Fumed Walnut Veneer",
    family: "Timber",
    tone: "Dark",
    hex: "#7d6f63",
    image: mWalnut,
    origin: "Pennsylvania, quarter-cut",
    finish: "Satin lacquer",
    format: "Veneer panels, 10 × 4 ft",
    price: 34,
    unit: "sq ft",
    leadWeeks: 7,
    bestFor: ["Wall panelling", "Bar fronts", "Built-in desks"],
    care: "Dust with a dry cloth. Keep out of direct afternoon sun for the first year while the colour settles.",
    note: "Fumed to take the red out, which leaves a soft cocoa grey. Book-matched panels turn a wall into furniture.",
    pairs: ["crema", "travertine", "brass"],
  },
  {
    id: "oxblood-render",
    name: "Oxblood Lime Render",
    family: "Plaster",
    tone: "Dark",
    hex: "#8e4a4c",
    image: mOxblood,
    origin: "Mixed in our studio, Portland",
    finish: "Rough cast, limewash sealed",
    format: "Applied on site",
    price: 28,
    unit: "sq ft",
    leadWeeks: 2,
    bestFor: ["Dining rooms", "Restaurant walls", "Powder rooms"],
    care: "Breathable and self-healing in hairline cracks. Touch up scuffs with a damp sponge and a little limewash.",
    note: "A deep red-brown lime render with a coarse sand in it. Under candlelight it turns the colour of good wine.",
    pairs: ["walnut", "brass", "terrazzo"],
  },
  {
    id: "ochre-plaster",
    name: "Ochre Lime Plaster",
    family: "Plaster",
    tone: "Mid",
    hex: "#b49a5e",
    image: mOchre,
    origin: "Pigments from Roussillon, mixed in Portland",
    finish: "Floated, open texture",
    format: "Applied on site",
    price: 26,
    unit: "sq ft",
    leadWeeks: 2,
    bestFor: ["Halls", "Kitchens", "Bedrooms"],
    care: "Washable once sealed with soap finish. Lime cures harder over months, not days.",
    note: "Earth yellow with a drag of the trowel left in. It warms a north-facing room the way no paint can.",
    pairs: ["crema", "brushed-oak", "terracotta"],
  },
  {
    id: "terrazzo",
    name: "Venetian Terrazzo",
    family: "Tile",
    tone: "Dark",
    hex: "#5d564f",
    image: mTerrazzo,
    origin: "Poured by Calloway Floors, Massachusetts",
    finish: "Ground and polished",
    format: "Poured in place, or tile 16 × 16 in",
    price: 44,
    unit: "sq ft",
    leadWeeks: 9,
    bestFor: ["Restaurant floors", "Bathrooms", "Stair landings"],
    care: "Practically indestructible. Neutral cleaner and a re-polish every decade.",
    note: "Marble chips in a dark cement matrix — the floor of every good Italian café. We specify the chip mix per project.",
    pairs: ["oxblood-render", "slate", "brass"],
  },
  {
    id: "ivory-speckle",
    name: "Ivory Speckle Tile",
    family: "Tile",
    tone: "Light",
    hex: "#d8d0bf",
    image: mIvory,
    origin: "Castellón, Spain",
    finish: "Matt porcelain",
    format: "Tile 24 × 24 in",
    price: 12,
    unit: "sq ft",
    leadWeeks: 3,
    bestFor: ["Kitchen floors", "Bathrooms", "Rentals"],
    care: "Porcelain: mop and forget. Grout in a warm grey so it never reads as a grid.",
    note: "A flecked cream porcelain that reads like stone from standing height and costs a fraction of it.",
    pairs: ["connemara", "carrara", "white-oak"],
  },
  {
    id: "terracotta",
    name: "Saltillo Terracotta",
    family: "Tile",
    tone: "Mid",
    hex: "#b0603e",
    image: mTerracotta,
    origin: "Coahuila, Mexico",
    finish: "Sealed, matt",
    format: "Tile 12 × 12 in",
    price: 9,
    unit: "sq ft",
    leadWeeks: 6,
    bestFor: ["Kitchens", "Sunrooms", "Garden rooms"],
    care: "Sealed twice on install; a soft wax every year or two keeps the colour deep.",
    note: "Sun-dried clay squares with scuffs and edges that are never quite true. The warmest floor we know.",
    pairs: ["ochre-plaster", "crema", "velvet"],
  },
  {
    id: "brass",
    name: "Brushed Unlacquered Brass",
    family: "Metal",
    tone: "Mid",
    hex: "#b3a46d",
    image: mBrass,
    origin: "Machined in Rhode Island",
    finish: "Brushed, unlacquered",
    format: "Sheet, rod, hardware",
    price: 65,
    unit: "sq ft (sheet)",
    leadWeeks: 4,
    bestFor: ["Hardware", "Kick plates", "Lighting", "Shelf rails"],
    care: "Leave it to darken, or bring the shine back with a soft cloth and paste twice a year.",
    note: "It starts bright and goes honey-brown where hands touch it. We specify it so a house shows how it is used.",
    pairs: ["carrara", "walnut", "terrazzo"],
  },
  {
    id: "velvet",
    name: "Moss Cotton Velvet",
    family: "Textile",
    tone: "Dark",
    hex: "#2f6b45",
    image: mVelvet,
    origin: "Woven in Lancashire, England",
    finish: "Cotton pile, stain-treated",
    format: "Fabric, 54 in wide",
    price: 118,
    unit: "yd",
    leadWeeks: 5,
    bestFor: ["Upholstery", "Curtains", "Headboards"],
    care: "Vacuum with a soft brush; steam the pile to lift crush marks. Professional clean only.",
    note: "Deep, wet-forest green that changes with every angle. One sofa in it and the rest of the room can whisper.",
    pairs: ["travertine", "brushed-oak", "carrara"],
  },
];

/* ---------- Projects ---------- */

export type Sector = "Residential" | "Hospitality" | "Workplace";
export const sectors: Sector[] = ["Residential", "Hospitality", "Workplace"];

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  place: string;
  year: number;
  scope: string;
  area: number;
  months: number;
  summary: string;
  brief: string;
  approach: string[];
  cover: string;
  gallery: { src: string; alt: string; caption: string }[];
  materials: string[];
  quote?: { text: string; by: string };
};

export const projects: Project[] = [
  {
    slug: "alder-house",
    name: "Alder House",
    sector: "Residential",
    place: "Cape Elizabeth, Maine",
    year: 2025,
    scope: "Whole house",
    area: 3400,
    months: 14,
    summary:
      "A 1920s farmhouse reopened around its original beams, with ochre lime walls and a white-oak floor laid through every room.",
    brief:
      "The Okafors bought a farmhouse that had been cut into small, dark rooms over a century of additions. They wanted one long room for cooking and eating, bedrooms that felt like a summer rental all year, and nothing that would look dated in ten years.",
    approach: [
      "We took down three partition walls and kept every original beam, then washed the ceiling in a near-white lime so the timber reads as structure rather than decoration.",
      "One floor runs through the whole ground level: rift white oak in 9-inch planks, oiled, laid long-ways to pull the eye to the arched windows.",
      "Walls are ochre lime plaster in the hall and a paler mix in the living room. Brass is limited to hardware and a single pendant over the table.",
    ],
    cover: alderLiving,
    gallery: [
      {
        src: alderLiving,
        alt: "Living room under exposed timber beams, two arched windows, white sofas and an oak floor",
        caption: "Living room, original beams kept",
      },
      {
        src: alderDining,
        alt: "Long oak dining table under a copper pendant, with sliding doors open to the garden",
        caption: "Dining room onto the garden",
      },
      {
        src: alderHall,
        alt: "Narrow hall with herringbone oak floor, timber-boarded ceiling and a round mirror",
        caption: "Hall, herringbone oak and boarded ceiling",
      },
    ],
    materials: ["white-oak", "ochre-plaster", "crema", "brass"],
    quote: {
      text: "We had forty paint chips taped to the wall before Mosaic. They brought six samples to the kitchen table and the house made sense in an afternoon.",
      by: "Ada & Emeka Okafor, owners",
    },
  },
  {
    slug: "harrow-street",
    name: "Harrow Street Flat",
    sector: "Residential",
    place: "Portland, Maine",
    year: 2025,
    scope: "Living and dining rooms",
    area: 1150,
    months: 5,
    summary:
      "A top-floor apartment with a wall of windows, calmed with cognac leather, travertine and a gallery wall of family photographs.",
    brief:
      "A retired couple downsized from a five-bedroom house. They brought forty years of furniture and photographs, and asked us to make a smaller home that still felt like theirs.",
    approach: [
      "We kept their leather sofa and had it re-dyed, then built the room around it: honey travertine tables, a pale wool rug and two steel-framed armchairs for guests.",
      "Sixteen family photographs were reprinted in black and white and hung in a strict grid so the wall reads as one piece, not sixteen.",
      "The full-height windows stay bare. Sheer linen on a ceiling track draws across for the afternoon glare.",
    ],
    cover: harrowLiving,
    gallery: [
      {
        src: harrowLiving,
        alt: "Sunlit living room with a cognac leather sofa, white armchairs, a round oak table and a grid of framed photographs",
        caption: "The long room in afternoon light",
      },
      {
        src: harrowChair,
        alt: "Mustard armchair beside a brass floor lamp and a framed circle print",
        caption: "Reading corner",
      },
      {
        src: harrowLounge,
        alt: "Pale sofa with cork side tables and a woven pouf on a round rug",
        caption: "The second sitting room",
      },
    ],
    materials: ["travertine", "white-oak", "walnut", "brass"],
    quote: {
      text: "Everything we loved came with us. It just finally has room to breathe.",
      by: "Ruth Calloway, owner",
    },
  },
  {
    slug: "fennel-and-vine",
    name: "Fennel & Vine",
    sector: "Hospitality",
    place: "Portsmouth, New Hampshire",
    year: 2024,
    scope: "Restaurant, 64 covers",
    area: 2600,
    months: 9,
    summary:
      "A wine bar and kitchen in a former chandlery: oxblood lime walls, a poured terrazzo floor and walnut booths built for long dinners.",
    brief:
      "Chef Lena Brandt wanted a room that felt busy at 6pm and intimate at 10pm with the same 64 seats, and a floor that could survive service seven nights a week.",
    approach: [
      "Walls are oxblood lime render over the old brick, which soaks up sound and turns warm under low light.",
      "The floor is poured terrazzo with a dark matrix and local granite chip — no grout lines to scrub at midnight.",
      "Booths are fumed walnut with brass kick plates; the lighting runs on three scenes the staff change from one switch by the pass.",
    ],
    cover: fennelRoom,
    gallery: [
      {
        src: fennelRoom,
        alt: "Dark restaurant dining room with timber chairs, pendant lights and a long bar",
        caption: "Main room, evening scene",
      },
      {
        src: fennelTable,
        alt: "Plated dish on a table set with wine glasses in a softly lit dining room",
        caption: "Table detail, the chef's counter",
      },
    ],
    materials: ["oxblood-render", "terrazzo", "walnut", "brass"],
    quote: {
      text: "Guests ask who did the walls before they ask about the wine. That has never happened to me before.",
      by: "Lena Brandt, chef-owner",
    },
  },
  {
    slug: "hotel-wren",
    name: "Hotel Wren",
    sector: "Hospitality",
    place: "Camden, Maine",
    year: 2024,
    scope: "22-room inn, all rooms and baths",
    area: 9800,
    months: 18,
    summary:
      "Twenty-two harbour rooms refitted in four material palettes, so returning guests can ask for 'the green room' by name.",
    brief:
      "The owners of a tired 1890s inn wanted to raise their room rate without losing the regulars who had booked the same week every August for twenty years.",
    approach: [
      "Rather than one scheme repeated twenty-two times, we built four palettes — moss, sand, clay and slate — each with its own headboard cloth, tile and wall colour.",
      "Every bath has honed Carrara on the vanity and a large-format ivory porcelain on the floor, which halved housekeeping time.",
      "Brushed oak floors were laid over the original pine so the creak survived but the splinters did not.",
    ],
    cover: wrenSuite,
    gallery: [
      {
        src: wrenSuite,
        alt: "Hotel bedroom with a white bed, two leather-cushioned stools at the foot and a red abstract painting",
        caption: "Clay palette, room 9",
      },
      {
        src: wrenBed,
        alt: "Hotel bedroom with a tall upholstered headboard, oak bedside table and a window onto the town",
        caption: "Sand palette, room 14",
      },
      {
        src: wrenBath,
        alt: "White bathroom with a glass shower, wide mirror and a vase of dried flowers on the vanity",
        caption: "Bath, honed Carrara vanity",
      },
    ],
    materials: ["carrara", "ivory-speckle", "brushed-oak", "velvet"],
    quote: {
      text: "Our August regulars complained for exactly one night. Then they started asking which palette to book next year.",
      by: "Tom & Iris Nakamura, owners",
    },
  },
  {
    slug: "calder-street-kitchen",
    name: "Calder Street Kitchen",
    sector: "Residential",
    place: "Portland, Maine",
    year: 2023,
    scope: "Kitchen and breakfast room",
    area: 420,
    months: 4,
    summary:
      "A deep-green kitchen with a Connemara marble island and oak floor, finished in four months around a family of five.",
    brief:
      "A family who cook every night needed a kitchen that seats five at breakfast, hides the clutter and does not show every fingerprint.",
    approach: [
      "Cabinetry is painted a deep forest green with recessed pulls, so the run of doors reads as one calm wall.",
      "The island is topped with an offcut of Connemara marble we had been holding in the library for two years.",
      "Ivory porcelain behind the range wipes clean; open oak shelves keep the everyday bowls in reach.",
    ],
    cover: calderKitchen,
    gallery: [
      {
        src: calderKitchen,
        alt: "Kitchen with dark green cabinets, white worktops, open shelving and a pale oak floor",
        caption: "The cooking wall",
      },
      {
        src: calderDining,
        alt: "Bright dining room with green chairs around a white table and a large mirror",
        caption: "Breakfast room",
      },
    ],
    materials: ["connemara", "white-oak", "ivory-speckle", "brass"],
  },
  {
    slug: "northlight-offices",
    name: "Northlight Offices",
    sector: "Workplace",
    place: "Boston, Massachusetts",
    year: 2023,
    scope: "Studio floor for 45 people",
    area: 11000,
    months: 7,
    summary:
      "An open studio floor for a map-making company, zoned by material instead of walls so quiet work and loud work can share one room.",
    brief:
      "Northlight Cartography needed one floor where forty-five people could draw in silence, argue over maps and host clients — without building a corridor of meeting rooms.",
    approach: [
      "Floor finish marks the zones: sand slate at the entrance and kitchen, white oak where people sit, terrazzo under the client tables.",
      "Glazed partitions with oak frames keep the north light reaching the back of the plan.",
      "Acoustic plaster on the ceiling soaks up the noise of the open kitchen at lunch.",
    ],
    cover: northlightFloor,
    gallery: [
      {
        src: northlightFloor,
        alt: "Open office with a long table, steel-framed glazing and an exposed concrete ceiling",
        caption: "Client tables by the north windows",
      },
      {
        src: northlightHall,
        alt: "Long pale corridor with glazed walls, a dark kitchen run and a low shelf",
        caption: "The spine between quiet and loud",
      },
    ],
    materials: ["slate", "white-oak", "terrazzo"],
    quote: {
      text: "We stopped booking meeting rooms. People just walk to the terrazzo.",
      by: "Priya Raman, studio director",
    },
  },
  {
    slug: "juniper-terrace",
    name: "Juniper Terrace",
    sector: "Residential",
    place: "Somerville, Massachusetts",
    year: 2024,
    scope: "Townhouse, three floors",
    area: 2200,
    months: 8,
    summary:
      "A narrow townhouse in deep green and warm leather, with a study, a black-and-white bath and plants in every window.",
    brief:
      "Two architects who did not want to design their own house. Their one rule: every room had to have a view of something growing.",
    approach: [
      "The living room wall is painted a deep juniper green, with a tan leather sofa and a gallery of botanical prints above it.",
      "The study borrows the green and adds walnut shelving; a long desk faces the garden window.",
      "The bathroom is the joke the clients asked for: black-and-white checker floor, white everything else, and a fern above the cistern.",
    ],
    cover: juniperLiving,
    gallery: [
      {
        src: juniperLiving,
        alt: "Living room with a dark green wall, tan leather sofa, framed prints and potted plants",
        caption: "Living room, juniper wall",
      },
      {
        src: juniperStudy,
        alt: "Green study with a desk under a large window, a lounge chair and a patterned rug",
        caption: "Study onto the garden",
      },
      {
        src: juniperBath,
        alt: "White bathroom with a black-and-white checker floor and plants on the windowsill",
        caption: "Checker-floor bath",
      },
    ],
    materials: ["velvet", "walnut", "terracotta", "carrara"],
  },
];

/* ---------- Services ---------- */

export type Service = {
  id: string;
  name: string;
  fee: string;
  feeNote: string;
  duration: string;
  summary: string;
  includes: string[];
  forWho: string;
};

export const services: Service[] = [
  {
    id: "consultation",
    name: "Material consultation",
    fee: "$380",
    feeNote: "two hours at the library · $520 at your home",
    duration: "One session",
    summary:
      "Bring photographs, a floor plan or just a problem room. We pull samples, test them against your light and send you home with a sample board and a written spec sheet.",
    includes: [
      "Two hours with a senior designer",
      "Up to eight samples to keep",
      "Written spec sheet within five days",
      "Fee credited if you book a full project",
    ],
    forWho:
      "Owners who want a second pair of eyes before they buy flooring, tile or a sofa.",
  },
  {
    id: "single-room",
    name: "Single room",
    fee: "$4,800–$7,500",
    feeNote: "flat fee, agreed after the first visit",
    duration: "8–12 weeks",
    summary:
      "One room designed start to finish: layout, materials, lighting, furniture, and a procurement list your contractor can price from.",
    includes: [
      "Measured survey and layout options",
      "Sample board and two rounds of revisions",
      "Lighting and electrical plan",
      "Furniture and finishes schedule with trade pricing",
    ],
    forWho: "Kitchens, primary bedrooms, living rooms — the room you use most.",
  },
  {
    id: "full-design",
    name: "Full interior design",
    fee: "12–15%",
    feeNote: "of the build and furnishing budget, from $18,000",
    duration: "6–18 months",
    summary:
      "Whole homes and renovations, from first sketch to the day we hang the last picture. We work alongside your architect and builder, or bring ours.",
    includes: [
      "Everything in Single room, for the whole house",
      "Joinery and bathroom drawings",
      "Fortnightly site visits",
      "Procurement, delivery and installation",
      "Styling and a final walk-through",
    ],
    forWho:
      "Renovations and new builds where the finishes matter as much as the plan.",
  },
  {
    id: "hospitality",
    name: "Hospitality fit-out",
    fee: "From $35,000",
    feeNote: "fixed fee proposal after a site visit",
    duration: "4–18 months",
    summary:
      "Restaurants, inns and small hotels. We design for opening night and for the thousandth service: durable floors, cleanable walls, lighting the staff can run.",
    includes: [
      "Brand-led concept and sample room",
      "Contract-grade specification",
      "Lighting scenes and acoustic plan",
      "Phased programmes so you can stay open",
    ],
    forWho: "Independent owners with up to forty rooms or two hundred covers.",
  },
];

export const faqs = [
  {
    q: "Do you work outside Maine?",
    a: "Yes — across New England, and further for hospitality projects. Travel beyond 40 miles of Portland is billed at cost, and we plan site visits so one trip covers several jobs.",
  },
  {
    q: "What does a full project actually cost?",
    a: "Our fee is 12–15% of the build and furnishing budget. Recent whole-house projects have run from $180,000 to $650,000 all-in. We will tell you at the first meeting if your budget and your brief do not match.",
  },
  {
    q: "Can I keep my own furniture?",
    a: "Please do. Most of our homes mix what clients already own with a few new pieces. We will tell you honestly which things are holding a room back.",
  },
  {
    q: "Do you mark up furniture?",
    a: "No. We pass our trade discounts to you in full and charge only the agreed fee. Every procurement list shows the trade price and the retail price side by side.",
  },
  {
    q: "Can I borrow samples from the library?",
    a: "Yes. Build a sample board online and we will post up to six samples free, or have them laid out for you on a Thursday, Friday or Saturday visit. Return them within four weeks.",
  },
  {
    q: "How soon can you start?",
    a: "Consultations are usually within two weeks. Full projects currently start design work about eight weeks after the first visit.",
  },
];

/* ---------- Process ---------- */

export type Scale = "room" | "home" | "hospitality";
export const scales: { id: Scale; label: string }[] = [
  { id: "room", label: "Single room" },
  { id: "home", label: "Whole home" },
  { id: "hospitality", label: "Restaurant or inn" },
];

export type Stage = {
  name: string;
  summary: string;
  you: string;
  we: string[];
  /** Start and end week for each project scale. */
  weeks: Record<Scale, [number, number]>;
};

export const stages: Stage[] = [
  {
    name: "Consultation and brief",
    summary:
      "We meet at the library or in your home, walk every room and write down what you actually need.",
    you: "Bring photos, a rough budget and the things you cannot live without.",
    we: ["Site walk-through", "Written brief", "Fee proposal"],
    weeks: { room: [0, 1], home: [0, 2], hospitality: [0, 3] },
  },
  {
    name: "Survey",
    summary:
      "We measure everything, photograph the light at three times of day and note what the building is hiding.",
    you: "Let us in for half a day. Tell us which drawer always sticks.",
    we: ["Measured drawings", "Light study", "Existing furniture inventory"],
    weeks: { room: [1, 2], home: [2, 4], hospitality: [3, 6] },
  },
  {
    name: "Concept and sample board",
    summary:
      "Two layouts and one sample board per room, presented on the table in your own light. This is where the project is decided.",
    you: "Touch everything. Disagree with us.",
    we: ["Layout options", "Sample boards", "Budget check"],
    weeks: { room: [2, 5], home: [4, 9], hospitality: [6, 12] },
  },
  {
    name: "Detailed design",
    summary:
      "Drawings a builder can price and build from: joinery, bathrooms, lighting, every finish and fitting scheduled.",
    you: "Approve the drawings and the budget, room by room.",
    we: [
      "Joinery and bath drawings",
      "Lighting plan",
      "Finishes schedule",
      "Tender package",
    ],
    weeks: { room: [5, 7], home: [9, 16], hospitality: [12, 22] },
  },
  {
    name: "Procurement and site",
    summary:
      "We order everything, track every delivery and visit site every fortnight so decisions are made in the room, not by email.",
    you: "Live your life. We send a short update every Friday.",
    we: ["Ordering and tracking", "Site visits", "Snagging list"],
    weeks: { room: [7, 11], home: [16, 36], hospitality: [22, 48] },
  },
  {
    name: "Install and styling",
    summary:
      "Furniture in, pictures up, books on shelves. We leave when the beds are made and the lamps are on timers.",
    you: "Come home.",
    we: ["Installation", "Styling", "Care guide for every material"],
    weeks: { room: [11, 12], home: [36, 40], hospitality: [48, 52] },
  },
];

/* ---------- Studio ---------- */

export const team = [
  {
    name: "Mara Lindqvist",
    role: "Founder, principal designer",
    bio: "Twenty years in residential interiors in Stockholm and New York before opening Mosaic in 2014.",
    sample: "white-oak",
  },
  {
    name: "Teodor Haas",
    role: "Senior designer, hospitality",
    bio: "Led the Fennel & Vine and Hotel Wren projects. Thinks about mop buckets before mood.",
    sample: "terrazzo",
  },
  {
    name: "Noor Bashir",
    role: "Material librarian",
    bio: "Keeps 1,400 samples catalogued and knows which quarry is closed for the winter.",
    sample: "connemara",
  },
  {
    name: "Celeste Ortega",
    role: "Project manager",
    bio: "Runs the site visits and the Friday update emails. Former builder's estimator.",
    sample: "slate",
  },
  {
    name: "Jonah Reyes",
    role: "Designer, lighting and drawings",
    bio: "Draws every joinery detail and designs the lighting scenes in our hospitality work.",
    sample: "brass",
  },
];

export const studio = {
  story: [
    "Mosaic began in 2014 as a single room above a tile shop on Cordage Lane, with a borrowed table and two hundred samples begged from suppliers.",
    "The idea was simple: clients decide better with their hands than with their eyes. A photograph of a marble slab tells you almost nothing. A piece of it on your kitchen table at seven in the morning tells you everything.",
    "Today the studio is five people and a library of 1,400 samples, still on Cordage Lane. We take on around twelve projects a year so the person you meet first is the person who finishes your house.",
  ],
  values: [
    {
      title: "Fewer, better materials",
      text: "Most of our rooms use five or six materials. The restraint is what makes each one visible.",
    },
    {
      title: "Your light, not ours",
      text: "Every sample is judged in the room it is going into, morning and evening, before anything is ordered.",
    },
    {
      title: "Keep what you love",
      text: "We design around the furniture and objects you already own whenever they earn their place.",
    },
    {
      title: "Prices in the open",
      text: "Trade discounts passed on in full. One agreed fee. No surprise invoices.",
    },
  ],
};

/* ---------- Home ---------- */

export const home = {
  heroProject: "harrow-street",
  featured: ["alder-house", "hotel-wren", "fennel-and-vine"],
  statement: "We begin every project at the sample table, not the mood board.",
  statementNote:
    "Photographs flatten everything. Stone, timber and lime plaster only show what they are in daylight, at arm's length, next to each other. So that is how we choose them — with you, in your own rooms.",
  librarySwatches: [
    "carrara",
    "walnut",
    "terracotta",
    "velvet",
    "ochre-plaster",
    "brass",
    "travertine",
    "connemara",
  ],
  testimonialProject: "hotel-wren",
};

export const images = { sageBedroom, longRoom };

/* ---------- Consultation ---------- */

export const consultationTypes = [
  {
    id: "library",
    label: "Library visit",
    detail: "90 minutes at 18 Cordage Lane, Thu–Sat",
    fee: "Free first visit",
  },
  {
    id: "home",
    label: "Home visit",
    detail: "Two hours in your rooms, within 40 miles of Portland",
    fee: "$520, credited to a project",
  },
  {
    id: "video",
    label: "Video call",
    detail: "45 minutes, for projects further afield",
    fee: "Free",
  },
];

export const projectKinds = [
  "Single room",
  "Several rooms",
  "Whole house or renovation",
  "Restaurant or bar",
  "Inn or small hotel",
  "Workplace",
];
export const budgets = [
  "Under $25,000",
  "$25,000–$75,000",
  "$75,000–$250,000",
  "$250,000–$600,000",
  "Over $600,000",
  "Not sure yet",
];
