import aisle from "./assets/aisle.jpg";
import barnDance from "./assets/barn-dance.jpg";
import barnLights from "./assets/barn-lights.jpg";
import boutonnieres from "./assets/boutonnieres.jpg";
import bouquet from "./assets/bouquet.jpg";
import brick from "./assets/brick.jpg";
import cake from "./assets/cake.jpg";
import ceremony from "./assets/ceremony.jpg";
import coastStacks from "./assets/coast-stacks.jpg";
import coastVeil from "./assets/coast-veil.jpg";
import gardenArch from "./assets/garden-arch.jpg";
import gardenChairs from "./assets/garden-chairs.jpg";
import gazebo from "./assets/gazebo.jpg";
import hands from "./assets/hands.jpg";
import hills from "./assets/hills.jpg";
import lake from "./assets/lake.jpg";
import lakeSunset from "./assets/lake-sunset.jpg";
import loft from "./assets/loft.jpg";
import ringHands from "./assets/ring-hands.jpg";
import rings from "./assets/rings.jpg";
import rocks from "./assets/rocks.jpg";
import table from "./assets/table.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };

const photo = (src: string, alt: string, w = 1800, h = 1200): Photo => ({
  src,
  alt,
  w,
  h,
});

export const images = {
  aisle: photo(
    aisle,
    "A ceremony aisle lined with gold chairs and tall arrangements of pink and white roses",
  ),
  barnDance: photo(
    barnDance,
    "Guests cheering as a couple dances under the timber roof of a barn",
    1600,
    1066,
  ),
  barnLights: photo(
    barnLights,
    "A barn reception hall strung with warm lights and draped fabric, tables set along the walls",
    1800,
    1198,
  ),
  boutonnieres: photo(
    boutonnieres,
    "Five boutonnieres of thistle, wax flower and ranunculus laid out on a wooden sill",
  ),
  bouquet: photo(
    bouquet,
    "A bride holding a bouquet of peach roses and eucalyptus against a beaded dress",
    1200,
    1800,
  ),
  brick: photo(
    brick,
    "A couple standing against an exposed brick wall, the bride holding a loose garden bouquet",
    1800,
    1202,
  ),
  cake: photo(
    cake,
    "A four-tier white wedding cake decorated with pale pink roses, outdoors under trees",
    1200,
    1800,
  ),
  ceremony: photo(
    ceremony,
    "Late sun falling across a couple; the bride holds a bouquet of white tulips and garden roses",
    1400,
    933,
  ),
  coastStacks: photo(
    coastStacks,
    "A couple embracing on a black-sand beach with sea stacks rising from the surf behind them",
  ),
  coastVeil: photo(
    coastVeil,
    "A bride and groom on a pebble shore, her long veil spread across the stones",
    1200,
    1800,
  ),
  gardenArch: photo(
    gardenArch,
    "A wooden ceremony arch draped in ivory fabric and dressed with garden roses, above a valley",
    1800,
    1202,
  ),
  gardenChairs: photo(
    gardenChairs,
    "Two chairs dressed with flowers set alone on a wide, freshly mown lawn",
    1400,
    933,
  ),
  gazebo: photo(
    gazebo,
    "A white garden gazebo at the end of a pink aisle, rows of white chairs on either side",
    1066,
    1600,
  ),
  hands: photo(
    hands,
    "Close-up of a couple's hands, wedding bands on, resting over a bouquet of peach roses",
  ),
  hills: photo(
    hills,
    "A couple walking hand in hand across a golden hillside under a pale sky",
  ),
  lake: photo(
    lake,
    "A couple by a lake in autumn, yellow trees reflected in the water behind them",
  ),
  lakeSunset: photo(
    lakeSunset,
    "A bride and groom sitting in tall grass at the edge of a lake at sunset",
  ),
  loft: photo(
    loft,
    "An empty industrial loft with tall windows, sheer curtains and candles set out across the floor",
    1200,
    1800,
  ),
  ringHands: photo(
    ringHands,
    "A hand wearing a slim wedding band resting on a dark suit sleeve beside orange flowers",
    1800,
    1202,
  ),
  rings: photo(
    rings,
    "Two gold wedding bands resting on lace and dried flowers",
  ),
  rocks: photo(
    rocks,
    "A couple standing among mossy boulders and ferns in a forest",
    800,
    1200,
  ),
  table: photo(
    table,
    "A long reception table set with gingham napkins, name tags and small jars of garden flowers",
    1400,
    933,
  ),
};

export const brand = {
  name: "Vow",
  sector: "Wedding planner",
  tagline: "Every detail carried, so you can simply be there.",
  summary:
    "Vow is a wedding planning and design studio in the Hudson Valley. We plan between twenty and twenty-four weddings a year, from orchard ceremonies for a hundred to black-sand elopements for eight.",
  email: "hello@vow.example",
  phone: "+1 555 0140 212",
  phoneHref: "tel:+15550140212",
  address: ["The Old Seed Store", "41 Mill Street", "Larkhill, NY 12530"],
  hours: "Studio visits Tuesday to Saturday, by appointment",
  availability: "Now booking 2027 and 2028. Eleven Saturdays remain in 2027.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/weddings", label: "Weddings" },
  { to: "/services", label: "Services" },
  { to: "/planner", label: "Planner" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Studio" },
];

/* ───────────────────────── Services ───────────────────────── */

export const guestTiers = [
  "Up to 80 guests",
  "80 to 150 guests",
  "150 guests or more",
] as const;

export type Package = {
  id: "full" | "partial" | "month" | "elope";
  name: string;
  kind: string;
  joins: string;
  /** One price per guest tier; null when the package does not cover that size. */
  prices: (number | null)[];
  summary: string;
  includes: string[];
};

export const packages: Package[] = [
  {
    id: "full",
    name: "The Full Folio",
    kind: "Full planning and design",
    joins: "From 12 to 18 months before",
    prices: [14800, 18600, 23400],
    summary:
      "Everything, from the venue shortlist to the last taxi home. One lead planner, one designer and a production lead who knows every supplier's loading dock.",
    includes: [
      "Venue search with up to six guided visits",
      "Budget built line by line and kept current",
      "Full design concept, tablescape mock-up and floor plan",
      "Supplier sourcing, contracts and every payment date tracked",
      "Guest travel, room blocks and the welcome evening",
      "Rehearsal, wedding day and the morning after with a team of three",
    ],
  },
  {
    id: "partial",
    name: "The Half Folio",
    kind: "Partial planning",
    joins: "From 6 months before",
    prices: [7900, 9800, 12400],
    summary:
      "You have booked the big pieces and want a professional to fill the gaps, catch what is missing and carry the last half year.",
    includes: [
      "Audit of every contract you already hold",
      "Sourcing for up to four remaining suppliers",
      "Monthly planning meetings, plus unlimited email",
      "Floor plan, seating chart and order of the day",
      "Wedding day with a team of two",
    ],
  },
  {
    id: "month",
    name: "The Final Month",
    kind: "Wedding-month direction",
    joins: "From 8 weeks before",
    prices: [3600, 4400, 5600],
    summary:
      "You planned it yourselves. We take the plan, find the holes, confirm every supplier and run the day so you are not the one holding the clipboard.",
    includes: [
      "Three-hour handover meeting and venue walkthrough",
      "Supplier confirmations and a single shared timeline",
      "Rehearsal direction",
      "Wedding day from setup to last dance with a team of two",
    ],
  },
  {
    id: "elope",
    name: "The Small Vow",
    kind: "Elopements and weddings of up to 20",
    joins: "From 3 months before",
    prices: [5200, null, null],
    summary:
      "A place that means something, a celebrant, a photographer and a long dinner afterwards. We handle permits, light, weather and the drive.",
    includes: [
      "Location scouting with sunrise and sunset timings",
      "Permits, marriage licence guidance and celebrant",
      "Photographer, florist and dinner booked and briefed",
      "A planner on site from first look to toast",
    ],
  },
];

export const comparison: { feature: string; in: Package["id"][] }[] = [
  { feature: "Venue search", in: ["full", "elope"] },
  { feature: "Budget management", in: ["full", "partial"] },
  { feature: "Design concept and mock-up", in: ["full"] },
  { feature: "Supplier sourcing", in: ["full", "partial", "elope"] },
  { feature: "Guest travel desk", in: ["full"] },
  { feature: "Seating chart and floor plan", in: ["full", "partial", "month"] },
  { feature: "Order of the day", in: ["full", "partial", "month", "elope"] },
  { feature: "Rehearsal direction", in: ["full", "partial", "month"] },
  { feature: "Planner on the day", in: ["full", "partial", "month", "elope"] },
];

export const addOns = [
  {
    name: "Welcome evening",
    price: "$1,900",
    detail:
      "Pizza ovens, a bar cart and a place for both families to meet before the day.",
  },
  {
    name: "Rehearsal dinner design",
    price: "$1,400",
    detail:
      "Venue, menu, toasts running order and a table plan that keeps the peace.",
  },
  {
    name: "Guest travel desk",
    price: "$1,200",
    detail:
      "Room blocks, shuttle timings and one email address guests can ask anything.",
  },
  {
    name: "Stationery suite",
    price: "from $2,400",
    detail:
      "Save the dates, invitations, menus and place cards, letterpress or digital.",
  },
  {
    name: "Day-after brunch",
    price: "$900",
    detail:
      "Eggs, coffee and a slow goodbye, planned so you only have to turn up.",
  },
];

export const faqs = [
  {
    q: "How far ahead should we book you?",
    a: "For the Full Folio, twelve to eighteen months gives us time to secure the venue and suppliers you actually want. Summer Saturdays in the valley go first, often fourteen months out. Partial planning works from six months, and the Final Month from eight weeks.",
  },
  {
    q: "Do you charge a percentage of our budget?",
    a: "No. Our fee is flat and set by package and guest count, so we have no reason to push you toward a bigger spend. It is paid in three instalments: 30% to book, 40% at six months, 30% a month before.",
  },
  {
    q: "Do you take commission from suppliers?",
    a: "Never. Supplier invoices come to you directly and you pay them directly. We will tell you exactly why we recommend each one.",
  },
  {
    q: "Will we work with the same planner throughout?",
    a: "Yes. Your lead planner runs your wedding from the first meeting to the last song. On the day they are joined by one or two colleagues you will have met beforehand.",
  },
  {
    q: "Do you travel outside the Hudson Valley?",
    a: "Regularly. About a third of our weddings are in New York City, Maine or the Catskills. Travel within 150 miles of Larkhill is included; beyond that we bill travel and two nights' lodging at cost.",
  },
  {
    q: "What if it rains?",
    a: "Every outdoor plan we write has a weather call time, usually 10am two days before, and a fully designed indoor version. Tent holds are placed at contract stage so the decision is never about availability.",
  },
  {
    q: "Can we change package later?",
    a: "Yes. If a Half Folio becomes something larger we credit what you have paid toward the Full Folio fee.",
  },
];

/* ───────────────────────── Process ───────────────────────── */

export const process = [
  {
    when: "Week one",
    title: "A first conversation",
    text: "Forty-five minutes, at the studio or on a call. We ask about the people before the flowers.",
  },
  {
    when: "Within a week",
    title: "A written proposal",
    text: "Scope, fee and a first budget outline. No obligation; most couples take a fortnight to decide.",
  },
  {
    when: "Months 18 to 12",
    title: "Date, venue and the big three",
    text: "Venue, caterer and photographer, booked in that order, with the budget locked around them.",
  },
  {
    when: "Months 12 to 6",
    title: "Design and suppliers",
    text: "A design concept you can hold, then florist, music, rentals and stationery built from it.",
  },
  {
    when: "Months 6 to 1",
    title: "Details and the order of the day",
    text: "Tastings, fittings, seating, timings. Every supplier gets the same document, minute by minute.",
  },
  {
    when: "Wedding week",
    title: "We carry it",
    text: "Deliveries, rehearsal, the day itself, and the returns on Monday morning.",
  },
];

/* ───────────────────────── Weddings ───────────────────────── */

export const settings = [
  "Garden",
  "Coast",
  "City",
  "Countryside",
  "Lakeside",
] as const;
export type Setting = (typeof settings)[number];

export type Wedding = {
  slug: string;
  couple: string;
  setting: Setting;
  venue: string;
  place: string;
  date: string;
  guests: number;
  packageId: Package["id"];
  planningMonths: number;
  cover: Photo;
  gallery: Photo[];
  excerpt: string;
  palette: string[];
  story: { heading: string; paragraphs: string[] }[];
  quote: string;
  credits: [string, string][];
};

export const weddings: Wedding[] = [
  {
    slug: "hollins-orchard",
    couple: "Imogen & Theo",
    setting: "Garden",
    venue: "Hollins Orchard",
    place: "Larkhill, NY",
    date: "2026-06-13",
    guests: 96,
    packageId: "full",
    planningMonths: 16,
    cover: images.gardenChairs,
    gallery: [images.gardenArch, images.boutonnieres, images.table],
    excerpt:
      "A ceremony between the apple rows, dinner on one long table and a fiddle band in the packing shed.",
    palette: ["Orchard green", "Ivory", "Peach ranunculus", "Gingham blue"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Imogen grew up two farms over from Hollins and wanted the wedding to feel like the harvest suppers she remembered: everyone at one table, nobody seated by importance. Theo's family were flying in from Leeds and had never been upstate.",
          "Ninety-six guests, one table, no tent if we could help it, and a budget of $78,000 including our fee.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "The ceremony was set in the oldest row of Northern Spy trees, with two chairs for Imogen's grandparents at the front and everyone else standing. A single arch in muslin and garden roses marked the spot.",
          "Dinner ran on a 140-foot table we built from twelve farm trestles, dressed in blue gingham napkins Theo's mother had sewn. Name tags were hand-cut from the orchard's own crate labels.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "A single table that long needs a lighting plan, so we ran festoon lines on the orchard's irrigation poles rather than hiring towers. Weather call was at 10am Thursday; the forecast held, and the packing shed stood ready as the indoor version all the same.",
        ],
      },
    ],
    quote:
      "We never once had to think about a delivery time. We just picked apples with our nieces until someone told us to get dressed.",
    credits: [
      ["Photography", "Wren & Vale"],
      ["Flowers", "Stem House, Larkhill"],
      ["Catering", "Field Supper Co."],
      ["Music", "The Kinderhook Fiddlers"],
      ["Rentals", "Long Table Hire"],
    ],
  },
  {
    slug: "black-sand-elopement",
    couple: "Sigrún & Mateo",
    setting: "Coast",
    venue: "Halsey Point",
    place: "Downeast Maine",
    date: "2025-09-27",
    guests: 8,
    packageId: "elope",
    planningMonths: 4,
    cover: images.coastStacks,
    gallery: [images.coastVeil, images.ringHands],
    excerpt:
      "Eight people, a dark beach at low tide and a lobster dinner in a borrowed boathouse.",
    palette: ["Basalt", "Sea grey", "Rust", "Bone"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Sigrún wanted a beach that looked like home in Iceland; Mateo wanted their parents there and no one else. They gave us four months and a map with three circles on it.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "We scouted all three spots at the right tide and chose Halsey Point, where the shingle turns almost black. The ceremony was timed for 5:40pm, forty minutes before low water, so the sea stacks stood clear.",
          "Afterwards: a boathouse dinner for eight, cooked by a local chef over a driftwood fire, and a wool blanket for every chair.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "Maine requires the licence from a town clerk in person, so we booked both appointments and drove the couple to Machias the Tuesday before. The shoreline is private; the landowner agreed after a letter and a promise to leave it as found.",
        ],
      },
    ],
    quote:
      "Our parents still talk about the blankets. Of everything that happened, the blankets.",
    credits: [
      ["Photography", "Saltlight Studio"],
      ["Celebrant", "Rev. Ada Moulton"],
      ["Dinner", "Cove Fire Kitchen"],
      ["Flowers", "Wild Thrift"],
    ],
  },
  {
    slug: "mercer-loft",
    couple: "Priya & Daniel",
    setting: "City",
    venue: "The Mercer Loft",
    place: "Brooklyn, NY",
    date: "2026-03-21",
    guests: 140,
    packageId: "partial",
    planningMonths: 7,
    cover: images.loft,
    gallery: [images.brick, images.cake, images.hands],
    excerpt:
      "A spring wedding in a bare loft: four hundred candles, a sangeet upstairs and dinner below.",
    palette: ["Brick", "Candle gold", "Marigold", "Plaster white"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Priya and Daniel had the loft, the caterer and a photographer booked when they called us in September. What they did not have was a plan for 140 guests across two floors and two traditions in one evening.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "The ceremony took place in the empty loft lit by four hundred candles in glass, with sheer curtains to soften the windows. Guests moved upstairs for the sangeet while the floor below was turned for dinner in thirty-five minutes.",
          "The cake, four tiers with pale roses, came out at 10pm with chai and kulfi on the side.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "The building allows only open flame in sealed glass, and the freight lift takes six minutes per trip. We wrote a load-in schedule by the minute and sourced every candle holder to the fire marshal's spec.",
        ],
      },
    ],
    quote:
      "They turned a room over in half an hour while my aunties danced upstairs. Nobody downstairs even noticed a chair move.",
    credits: [
      ["Photography", "Gutter Light"],
      ["Catering", "Saffron & Salt"],
      ["Cake", "Bakehouse on Kent"],
      ["DJ", "Rahul Sen Sound"],
    ],
  },
  {
    slug: "fenwick-barn",
    couple: "Hattie & Josh",
    setting: "Countryside",
    venue: "Fenwick Barn",
    place: "Columbia County, NY",
    date: "2025-10-11",
    guests: 172,
    packageId: "full",
    planningMonths: 18,
    cover: images.barnLights,
    gallery: [images.barnDance, images.bouquet],
    excerpt:
      "An October barn wedding for 172, a ceilidh caller and a fire pit that burned until two.",
    palette: ["Hay", "Oxblood", "Candlelight", "Dried hydrangea"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Josh's family are Scottish and dance at every opportunity. Hattie wanted a room that felt like a lantern. Both wanted every one of their 172 guests able to hear the speeches.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "We hung 2,400 feet of warm festoon and twenty lengths of voile from the rafters, and kept the dance floor clear in the middle of the barn so the ceilidh caller could see everyone.",
          "Speeches went out over a small line-array system tuned for timber, and a fire pit outside burned until the last shuttle at 2am.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "The barn has no mains power to the loft, so lighting ran from a silent generator placed behind the hedge, 200 feet away. Shuttles to three hotels ran every forty minutes from 10pm.",
        ],
      },
    ],
    quote:
      "Josh's uncle said it was the best ceilidh he'd been to outside Fife, which from him is a knighthood.",
    credits: [
      ["Photography", "Wren & Vale"],
      ["Lighting", "Glowworm Events"],
      ["Caller and band", "The Hudson Reel"],
      ["Catering", "Hearth & Hall"],
      ["Transport", "Valley Coach"],
    ],
  },
  {
    slug: "aldon-lake",
    couple: "Clara & Ben",
    setting: "Lakeside",
    venue: "Aldon Lake Lodge",
    place: "Ulster County, NY",
    date: "2025-10-18",
    guests: 64,
    packageId: "month",
    planningMonths: 2,
    cover: images.lake,
    gallery: [images.lakeSunset, images.rings],
    excerpt:
      "They planned it themselves; we ran the last month and the day, at the height of the leaves.",
    palette: ["Birch yellow", "Lake slate", "Moss", "Cream"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Clara and Ben had a spreadsheet with 212 rows and one request: that neither of them would have to look at it on the day.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "A ceremony on the jetty at 3:30pm, portraits in the birch grove while the leaves were at their brightest, and dinner in the lodge with the doors open to the water.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "Our handover review found two suppliers with the wrong date and a florist expecting a different lodge. All three were fixed in the first week, and the timeline went to every supplier on one page.",
        ],
      },
    ],
    quote: "We handed over a spreadsheet and got back a wedding.",
    credits: [
      ["Photography", "North Fork Film"],
      ["Venue", "Aldon Lake Lodge"],
      ["Flowers", "Moss & Pine"],
    ],
  },
  {
    slug: "wendell-glasshouse",
    couple: "Noor & Sam",
    setting: "Garden",
    venue: "The Glasshouse at Wendell Gardens",
    place: "Dutchess County, NY",
    date: "2026-05-09",
    guests: 120,
    packageId: "full",
    planningMonths: 14,
    cover: images.aisle,
    gallery: [images.gazebo, images.cake],
    excerpt:
      "A May garden wedding with a rose aisle, a rain plan that was never needed, and a gazebo for vows.",
    palette: ["Rose", "Blush", "Gilt", "Box hedge"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Noor wanted roses, many roses, and a ceremony both her grandmothers could see without standing. Sam wanted the speeches short and the bar open early.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "An aisle of gold chairs ran toward the gardens' white gazebo, with standing arrangements of 1,100 garden roses. Two front rows were raised on a low platform for grandparents.",
          "Speeches were capped at four minutes each and timed by the best man with an egg timer, at Sam's request.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "Wendell's glasshouse holds 120 seated exactly, so the indoor plan was drawn to the inch and rehearsed with the venue on the Wednesday. The sun shone and the plan was never used, which is how a rain plan should feel.",
        ],
      },
    ],
    quote:
      "My grandmother saw every second. That was the only thing I really asked for.",
    credits: [
      ["Photography", "Petal & Grain"],
      ["Flowers", "Stem House, Larkhill"],
      ["Catering", "The Wendell Kitchen"],
      ["Cake", "Ivy Lane Cakes"],
    ],
  },
  {
    slug: "stonecrop-ridge",
    couple: "Elsie & Rafe",
    setting: "Countryside",
    venue: "Stonecrop Ridge and Inn",
    place: "The Catskills, NY",
    date: "2026-08-22",
    guests: 18,
    packageId: "elope",
    planningMonths: 3,
    cover: images.hills,
    gallery: [images.rocks, images.ceremony],
    excerpt:
      "Vows at the top of a two-mile walk, then a long dinner at an inn for eighteen.",
    palette: ["Dry grass", "Fern", "Granite", "Linen"],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Elsie and Rafe met on a hiking club walk and wanted to marry on one. Eighteen guests, including a grandmother who would not be doing the hike.",
        ],
      },
      {
        heading: "The day",
        paragraphs: [
          "Guests walked the ridge trail at 4pm, two miles with a picnic stop. Rafe's grandmother arrived by the fire road in a borrowed farm truck. Vows were said at the outcrop at 6:15pm, with the light going gold across the valley.",
          "The walk down took twenty minutes; dinner at the inn ran until midnight.",
        ],
      },
      {
        heading: "What we solved",
        paragraphs: [
          "State land needs a temporary revocable permit for any gathering, which takes six weeks. We filed it on day two, and arranged a guide for the trail and a second truck in case of a twisted ankle.",
        ],
      },
    ],
    quote:
      "Everyone carried something up: chairs, flowers, a speaker. It felt like the whole wedding was a walk we took together.",
    credits: [
      ["Photography", "Saltlight Studio"],
      ["Celebrant", "Joanna Reyes"],
      ["Dinner", "Stonecrop Inn"],
      ["Trail guide", "Ridgeline Guiding"],
    ],
  },
];

/* ───────────────────────── Journal ───────────────────────── */

export const journalCategories = [
  "Planning",
  "Budget",
  "On the day",
  "Elopements",
] as const;
export type JournalCategory = (typeof journalCategories)[number];

export type Post = {
  slug: string;
  title: string;
  category: JournalCategory;
  date: string;
  minutes: number;
  author: string;
  image: Photo;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "when-to-book-what",
    title: "When to book what: a fifteen-month order of operations",
    category: "Planning",
    date: "2026-10-06",
    minutes: 7,
    author: "Margot Ellery",
    image: images.hands,
    excerpt:
      "The order matters more than the speed. Book the things that limit everything else first.",
    body: [
      {
        paragraphs: [
          "Most planning advice is a long list in no particular order. The list is not the hard part. The order is, because each early decision narrows every later one.",
        ],
      },
      {
        heading: "First: the number and the money",
        paragraphs: [
          "Before you visit a single venue, agree a guest count within ten and a total budget you will not exceed. These two numbers decide which rooms you can stand in and which caterers will call you back.",
        ],
      },
      {
        heading: "Then: venue, caterer, photographer",
        paragraphs: [
          "Book the venue first, because everything else needs a date and an address. Caterers come next, as many venues restrict who can cook on site. Good photographers book a year ahead in the valley, so they come third.",
          "Music, officiant and attire follow at ten to eight months. Flowers, stationery and rentals can wait until the design concept exists, usually around eight months out.",
        ],
      },
      {
        heading: "Last: everything with a name on it",
        paragraphs: [
          "Place cards, seating plans and favours depend on RSVPs, which depend on invitations, which go out at about twelve weeks. Leave them until then. You will only redo them otherwise.",
        ],
      },
    ],
  },
  {
    slug: "guest-count-first",
    title: "Decide the guest count before you fall for a venue",
    category: "Planning",
    date: "2026-09-15",
    minutes: 5,
    author: "Juno Park",
    image: images.table,
    excerpt:
      "A room that fits 110 does not fit 110 with a dance floor, a band and a bar.",
    body: [
      {
        paragraphs: [
          "We visit around sixty venues a year. The most common heartbreak we see is a couple who fell for a room before they knew how many people needed to be in it.",
        ],
      },
      {
        heading: "Write the A list honestly",
        paragraphs: [
          "Start with everyone who must be there for it to feel right, then everyone who would be hurt not to be. Add partners. Add children, or decide now that there will be none. That number, plus ten percent, is what you should tour with.",
        ],
      },
      {
        heading: "Read capacities carefully",
        paragraphs: [
          "Venue capacities are usually quoted for seated dinner at round tables with nothing else in the room. A dance floor for 100 takes about 400 square feet. A band takes another 200. A bar with a queue, more than you think.",
        ],
      },
    ],
  },
  {
    slug: "where-the-budget-goes",
    title: "Where a $60,000 wedding budget actually goes",
    category: "Budget",
    date: "2026-08-28",
    minutes: 8,
    author: "Will Arden",
    image: images.cake,
    excerpt:
      "Averages from the forty weddings we planned in the last two years, line by line.",
    body: [
      {
        paragraphs: [
          "Across our last forty weddings, the median spend for 100 guests in the Hudson Valley was $61,500 including our fee. Here is roughly where it went.",
        ],
      },
      {
        heading: "Venue and catering: about 45%",
        paragraphs: [
          "Food, drink, staff and the room itself. This is the line that moves with guest count, and the one where cutting twenty guests saves real money.",
        ],
      },
      {
        heading: "Photography and film: about 12%",
        paragraphs: [
          "The only thing you take home in full. Couples rarely regret spending here, and often regret saving.",
        ],
      },
      {
        heading: "Everything else",
        paragraphs: [
          "Flowers and design take around 10%, rentals and lighting 7%, music 8%, attire and beauty 8%, stationery 3%. We always hold 7% back as contingency, and most couples use some of it.",
          "Our planner tool uses these same proportions as its starting point, so you can see what your own number looks like.",
        ],
      },
    ],
  },
  {
    slug: "the-rain-plan",
    title: "The rain plan is not plan B",
    category: "On the day",
    date: "2026-07-30",
    minutes: 5,
    author: "Margot Ellery",
    image: images.gazebo,
    excerpt:
      "Design the indoor version as carefully as the outdoor one, and set the time you will decide.",
    body: [
      {
        paragraphs: [
          "An outdoor wedding has two designs or it has one and a hope. We draw both, cost both and walk both with the venue.",
        ],
      },
      {
        heading: "Set a call time",
        paragraphs: [
          "We make the weather call at 10am two days out, using the hourly forecast for the venue's own postcode. Once called, it is not revisited. Suppliers need certainty more than they need sunshine.",
        ],
      },
      {
        heading: "Hold the tent early",
        paragraphs: [
          "A tent hold costs a few hundred dollars at contract stage and is often refundable. The same tent on a wet June Thursday may cost three times as much, if one is free at all.",
        ],
      },
    ],
  },
  {
    slug: "eloping-well",
    title: "Eloping well: permits, light and the four people you need",
    category: "Elopements",
    date: "2026-06-18",
    minutes: 6,
    author: "Juno Park",
    image: images.coastVeil,
    excerpt:
      "Small does not mean simple. A wild place has rules, tides and a sunset that will not wait.",
    body: [
      {
        paragraphs: [
          "An elopement removes a hundred guests and adds a dozen new questions. Who owns this beach? When is low tide? Where will the photographer stand when the light drops?",
        ],
      },
      {
        heading: "Permits come first",
        paragraphs: [
          "State and national land usually needs a permit for any ceremony, and some take six weeks or more. Private land needs a letter. Find out before you fall in love with the view.",
        ],
      },
      {
        heading: "The four people",
        paragraphs: [
          "A celebrant, a photographer, a witness and someone whose only job is the two of you. That last one is us, carrying the blankets and checking the tide table.",
        ],
      },
    ],
  },
  {
    slug: "order-of-the-day",
    title: "Writing an order of the day your suppliers will actually follow",
    category: "On the day",
    date: "2026-05-22",
    minutes: 6,
    author: "Ines Okafor",
    image: images.boutonnieres,
    excerpt:
      "One document, one version, every supplier on it, and times that are honest about how long things take.",
    body: [
      {
        paragraphs: [
          "The order of the day is the single most useful document in a wedding, and the one most often written in a hurry the week before.",
        ],
      },
      {
        heading: "One version only",
        paragraphs: [
          "Send it as one file with a version number in the title. When it changes, everyone gets the new one and the old one is dead.",
        ],
      },
      {
        heading: "Be honest about time",
        paragraphs: [
          "Moving 120 people from ceremony to drinks takes fifteen minutes, not five. Group photos take two minutes per group. A first dance plus the floor filling is ten minutes. Write those numbers down and the day stops running late.",
        ],
      },
    ],
  },
];

/* ───────────────────────── Studio ───────────────────────── */

export const team = [
  {
    name: "Margot Ellery",
    role: "Founder and lead planner",
    bio: "Fourteen years in event production, the last nine planning weddings. Margot started Vow in a converted seed store with one desk and a phone.",
  },
  {
    name: "Ines Okafor",
    role: "Design director",
    bio: "Trained in set design. Ines builds every concept as a physical tablescape mock-up before a single flower is ordered.",
  },
  {
    name: "Will Arden",
    role: "Production and logistics",
    bio: "Power, tents, load-ins, shuttles, permits. If a supplier has a question at 6am on the day, Will has already answered it.",
  },
  {
    name: "Juno Park",
    role: "Planner, elopements and small weddings",
    bio: "Juno has scouted beaches in Maine and ridgelines in the Catskills at sunrise, sunset and low tide, often all three.",
  },
];

export const values = [
  {
    title: "A flat fee, always",
    text: "No percentage of your budget and no supplier commission. Our advice costs the same whichever way it goes.",
  },
  {
    title: "Twenty-four weddings a year",
    text: "We cap our calendar so a lead planner never runs two weddings in the same week.",
  },
  {
    title: "Two designs for every outdoor plan",
    text: "The indoor version gets the same care, cost and walkthrough as the one you hope for.",
  },
];

export const testimonials = [
  {
    quote:
      "We never once had to think about a delivery time. We just picked apples with our nieces until someone told us to get dressed.",
    by: "Imogen & Theo",
    where: "Hollins Orchard",
  },
  {
    quote:
      "They turned a room over in half an hour while my aunties danced upstairs.",
    by: "Priya & Daniel",
    where: "The Mercer Loft",
  },
  {
    quote: "We handed over a spreadsheet and got back a wedding.",
    by: "Clara & Ben",
    where: "Aldon Lake Lodge",
  },
];

/* ───────────────────────── Planner tool ───────────────────────── */

export type Milestone = {
  id: string;
  weeks: number;
  title: string;
  detail: string;
};

/** Planning milestones counted back from the wedding date, in weeks. */
export const milestones: Milestone[] = [
  {
    id: "numbers",
    weeks: 70,
    title: "Agree guest count and total budget",
    detail: "Within ten guests, and a ceiling you will not cross.",
  },
  {
    id: "venue",
    weeks: 64,
    title: "Book the venue",
    detail: "Visit no more than six; bring the guest count with you.",
  },
  {
    id: "caterer",
    weeks: 56,
    title: "Book caterer and photographer",
    detail: "Both book a year out for summer Saturdays.",
  },
  {
    id: "save",
    weeks: 44,
    title: "Send save-the-dates",
    detail: "Ten months for travel weddings, eight for local.",
  },
  {
    id: "music",
    weeks: 42,
    title: "Book music and officiant",
    detail: "Ask for a recording of a full live set, not a reel.",
  },
  {
    id: "attire",
    weeks: 38,
    title: "Order attire",
    detail: "Gowns can take six months to make, plus alterations.",
  },
  {
    id: "design",
    weeks: 34,
    title: "Settle the design concept",
    detail: "Then florist, rentals and stationery are briefed from it.",
  },
  {
    id: "rooms",
    weeks: 26,
    title: "Hold hotel room blocks",
    detail: "Release dates are usually 30 days before.",
  },
  {
    id: "tasting",
    weeks: 20,
    title: "Menu tasting and rentals order",
    detail: "Confirm chairs, linen, glassware and lighting.",
  },
  {
    id: "invites",
    weeks: 12,
    title: "Send invitations",
    detail: "With an RSVP date six weeks before the wedding.",
  },
  {
    id: "licence",
    weeks: 8,
    title: "Apply for the marriage licence",
    detail: "In New York it is valid for 60 days; time it.",
  },
  {
    id: "rsvp",
    weeks: 6,
    title: "RSVP deadline",
    detail: "Chase the last ten by phone, not by text.",
  },
  {
    id: "seating",
    weeks: 3,
    title: "Seating plan and order of the day",
    detail: "One version, sent to every supplier.",
  },
  {
    id: "final",
    weeks: 1,
    title: "Final numbers and payments",
    detail: "Caterer headcount, supplier balances, tips in envelopes.",
  },
];

export const budgetLines = [
  { id: "venue", label: "Venue and catering", share: 45 },
  { id: "photo", label: "Photography and film", share: 12 },
  { id: "flowers", label: "Flowers and design", share: 10 },
  { id: "music", label: "Music", share: 8 },
  { id: "attire", label: "Attire and beauty", share: 8 },
  { id: "rentals", label: "Rentals and lighting", share: 7 },
  { id: "stationery", label: "Stationery", share: 3 },
  { id: "contingency", label: "Contingency", share: 7 },
] as const;

export type BudgetLineId = (typeof budgetLines)[number]["id"];

/** The lines a couple can mark as "matters most"; each choice moves money toward it. */
export const priorityOptions: BudgetLineId[] = [
  "venue",
  "photo",
  "flowers",
  "music",
  "attire",
];

/* ───────────────────────── Pages ───────────────────────── */

export const home = {
  title: "Weddings planned like a well-set table",
  intro:
    "Vow plans and designs weddings across the Hudson Valley, New York City and the Maine coast. Full planning, partial planning, wedding-month direction and elopements, for a flat fee.",
  storyTitle: "The best part is making it yours",
  story: [
    "A long table under the apple trees. A loft lit by four hundred candles. Eight people on a dark beach at low tide. We shape every detail around the story you want to tell, and carry all of it so you do not have to.",
    "From the first conversation to the last song, there is room for joy in the process.",
  ],
  plannerTitle: "How long do you have?",
  plannerText:
    "Enter your date, or the one you are hoping for. The planner counts back every booking that matters and splits your budget the way our last forty weddings did.",
  processTitle: "A year with us, roughly",
  closeTitle: "Tell us the date, or just the season",
  closeText:
    "We reply to every enquiry within two working days with availability and a first idea.",
};

export const about = {
  title: "A small studio in an old seed store",
  intro:
    "Vow began in 2017 when Margot Ellery planned a friend's wedding in a Larkhill orchard and four guests asked for her number before dessert. We are now four planners, one designer's workshop and a converted seed store on Mill Street.",
  story: [
    "We plan between twenty and twenty-four weddings a year. That number is deliberate: it means your lead planner knows your second cousins' names by the time of the rehearsal.",
    "We work for a flat fee, never a percentage, and we take no commission from suppliers. When we recommend a florist it is because their work will suit your day, not ours.",
  ],
};
