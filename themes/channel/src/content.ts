import vCart from "./assets/v-cart.jpg";
import vMower from "./assets/v-mower.jpg";
import vVise from "./assets/v-vise.jpg";
import vTruck from "./assets/v-truck.jpg";
import vPliers from "./assets/v-pliers.jpg";
import vStool from "./assets/v-stool.jpg";
import vGrinder from "./assets/v-grinder.jpg";
import vPress from "./assets/v-press.jpg";
import vGas from "./assets/v-gas.jpg";
import vFlux from "./assets/v-flux.jpg";
import vHelmet from "./assets/v-helmet.jpg";
import vMistakes from "./assets/v-mistakes.jpg";
import aboutNoor from "./assets/about-noor.jpg";
import shopSmoke from "./assets/shop-smoke.jpg";

export const brand = {
  name: "Channel",
  sector: "Video creator & merch",
  host: "Noor Castellanos",
  handle: "@channelshop",
  tagline: "Steel, sparks and second chances. New build every Thursday.",
  intro:
    "Noor Castellanos drags tired machines out of barns and builds new ones from the scrap bin, in a two-bay garage in Erie, Pennsylvania. Named after the steel, not the TV.",
  subscribers: "612K subscribers",
  schedule: "New video every Thursday, 6 pm ET",
  email: "hello@channel.example",
  partnersEmail: "partners@channel.example",
  phone: "+1 555 0148 220",
  phoneHref: "tel:+15550148220",
  address: ["Channel Shop LLC", "2210 Peach Street, Bay 2", "Erie, PA 16502"],
  shipping:
    "Merch ships from Erie in 2–4 business days. Free US shipping over $75.",
  social: [
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
  ],
};

export const nav = [
  { to: "/videos", label: "Videos" },
  { to: "/series", label: "Series" },
  { to: "/shop", label: "Merch" },
  { to: "/membership", label: "Membership" },
  { to: "/partners", label: "Brand deals" },
  { to: "/about", label: "About" },
];

/* ───────────────────────────── Series ───────────────────────────── */

export type Series = {
  slug: string;
  name: string;
  pitch: string;
  description: string[];
  rhythm: string;
  /** Caption colour on thumbnails: arc blue, spark orange, paint-marker yellow or soapstone white. */
  tone: "arc" | "spark" | "marker" | "soap";
};

export const series: Series[] = [
  {
    slug: "saved-from-scrap",
    name: "Saved from Scrap",
    pitch: "Machines headed for the scrapyard get one more shot.",
    description: [
      "Somebody calls about a drill press in a flooded barn, a vise welded shut with rust, a truck that has been part of a hedge since 1974. Noor goes and gets it, takes it down to the last bolt and decides, piece by piece, what can be saved.",
      "No sandblasted showroom finishes. If a part still works, it keeps its scars. If it doesn't, it gets rebuilt on the bench, on camera, mistakes included.",
    ],
    rhythm: "Every other Thursday",
    tone: "marker",
  },
  {
    slug: "ten-dollar-steel",
    name: "Ten-Dollar Steel",
    pitch:
      "Useful shop furniture from offcuts, curb finds and ten dollars of hardware.",
    description: [
      "The rule is simple: the steel has to come from the offcut rack or the curb, and everything bought new has to fit inside a ten-dollar bill. Bed frames, brake rotors, a single stick of C-channel.",
      "Each build ends with a full cut list and a drawing you can print, so you can make the same thing this weekend with whatever your own scrap pile gives you.",
    ],
    rhythm: "Monthly",
    tone: "spark",
  },
  {
    slug: "shop-upgrades",
    name: "Shop Upgrades",
    pitch: "Turning a cold two-bay garage into a shop that works for a living.",
    description: [
      "Power, light, air, gas, a press that can bend things. The long, unglamorous projects that make every other video possible, filmed as they happen rather than after the fact.",
      "Every upgrade gets a running cost tally on screen, so you can see exactly what a working home shop costs to build.",
    ],
    rhythm: "When the shop needs it",
    tone: "soap",
  },
  {
    slug: "ask-the-grinder",
    name: "Ask the Grinder",
    pitch: "Straight answers to the questions in the comments.",
    description: [
      "Shorter episodes built from your questions: which welder to buy first, why your beads look like bird droppings, whether that hardware-store helmet is safe. Members vote on the next topic.",
      "Answers come with test pieces cut in half on camera, because opinions are cheap and cross-sections are not.",
    ],
    rhythm: "Twice a month",
    tone: "arc",
  },
];

/* ───────────────────────────── Videos ───────────────────────────── */

export type Chapter = { t: number; title: string };
export type OnScreen = {
  t: number;
  name: string;
  note: string;
  product?: string;
};

export type Video = {
  slug: string;
  title: string;
  series: string;
  published: string;
  duration: number;
  views: number;
  image: string;
  alt: string;
  /** The words painted on the thumbnail. */
  caption: string;
  summary: string;
  body: string[];
  chapters: Chapter[];
  onScreen: OnScreen[];
};

export const videos: Video[] = [
  {
    slug: "one-stick-welding-cart",
    title: "A welding cart from one stick of channel",
    series: "ten-dollar-steel",
    published: "2026-10-15",
    duration: 1172,
    views: 241000,
    image: vCart,
    alt: "A welder in a blue jacket and auto-darkening helmet laying a bead, sparks spraying across the bench",
    caption: "One stick",
    summary:
      "Twenty feet of 3-inch C-channel from the offcut rack, four casters and a bottle chain. Every cut is planned so nothing is left over.",
    body: [
      "The welder has lived on an upturned bucket for two years. This week it gets a proper cart, and the challenge is to build the whole frame from a single twenty-foot stick of 3-inch channel that has been leaning against the back wall since the press build.",
      "Noor lays out the cut list in chalk first, nests the parts so the offcut is under two inches, then fits, tacks and squares the frame on the floor. The bottle rack gets a chain and a lift-off hook so swapping gas takes one hand.",
      "Plans and the printable cut list are in the members' area; the cart itself is bolted to the floor of Bay 2 in every video from here on.",
    ],
    chapters: [
      { t: 0, title: "Why the bucket has to go" },
      { t: 74, title: "Chalking the cut list" },
      { t: 248, title: "Nesting every cut" },
      { t: 455, title: "Squaring the frame on the floor" },
      { t: 702, title: "Bottle rack and chain" },
      { t: 905, title: "Casters, paint and the drop test" },
      { t: 1101, title: "What it cost" },
    ],
    onScreen: [
      {
        t: 80,
        name: "Soapstone marker",
        note: "Shows on steel through spatter. Two for a dollar.",
      },
      {
        t: 260,
        name: "Waxed Canvas Shop Apron",
        note: "The one Noor wears in every build.",
        product: "waxed-apron",
      },
      {
        t: 470,
        name: "Framing square, 24 in",
        note: "Checked against the floor before every tack.",
      },
      {
        t: 720,
        name: "Grade 30 chain, 18 in",
        note: "Bottle restraint. The only new steel in the build.",
      },
      {
        t: 930,
        name: "Welder's Cap, Hot Rolled print",
        note: "Keeps spatter out of your hair.",
        product: "welders-cap",
      },
    ],
  },
  {
    slug: "seized-bench-vise",
    title: "This seized bench vise fought back for three days",
    series: "saved-from-scrap",
    published: "2026-10-08",
    duration: 1307,
    views: 388000,
    image: vVise,
    alt: "Close-up of the worn serrated jaws of a blue cast-iron bench vise",
    caption: "Seized solid",
    summary:
      "A 1940s cast-iron vise rusted into one solid lump. Penetrating oil, heat, a puller made on the spot and finally the press.",
    body: [
      "A viewer in Ohio found this vise in the crawlspace of a house they bought. The screw was rusted solid to the nut, the jaws were frozen half open and someone had tried to free it with a cheater bar, which explains the crack in the handle.",
      "Three days of soaking, heat cycles and a custom puller later, it finally lets go. The screw gets chased, the jaws get replaced with new hardened inserts, and the original blue gets cleaned up rather than repainted.",
      "It goes back to Ohio next week with a new handle turned from a broken pry bar.",
    ],
    chapters: [
      { t: 0, title: "The crawlspace vise" },
      { t: 96, title: "Day one: oil and patience" },
      { t: 340, title: "Day two: heat cycles" },
      { t: 610, title: "Making a puller from scraps" },
      { t: 822, title: "It moves" },
      { t: 1004, title: "New jaws, old paint" },
      { t: 1210, title: "Going home to Ohio" },
    ],
    onScreen: [
      {
        t: 110,
        name: "50/50 acetone and ATF",
        note: "Homemade penetrant. Beats every can on the shelf.",
      },
      {
        t: 355,
        name: "Propane torch with swirl tip",
        note: "Heat the nut, never the screw.",
      },
      {
        t: 620,
        name: "C-Channel Bottle Opener offcut",
        note: "The puller started life as opener stock.",
        product: "channel-opener",
      },
      {
        t: 1015,
        name: "Hardened jaw inserts, 4 in",
        note: "Ground to fit the original pins.",
      },
    ],
  },
  {
    slug: "press-frame-20-ton",
    title: "A 20-ton press frame I can actually lift",
    series: "shop-upgrades",
    published: "2026-10-01",
    duration: 1870,
    views: 512000,
    image: vPress,
    alt: "A welder in a face shield behind a wide fan of orange grinding sparks",
    caption: "20 tons",
    summary:
      "Most shop presses weigh more than a motorcycle. This one comes apart in three pieces and still bends 1-inch bar cold.",
    body: [
      "The shop needed a press for bearings, bending and the occasional seized vise. The catch: the floor is a rented garage slab and the frame has to move between bays without a forklift.",
      "The answer is a bolted frame of doubled channel with pinned crossheads, so the heaviest single piece is 61 pounds. The bottle jack is a hardware-store 20-ton with a return spring kit.",
      "Halfway through, the first crosshead flexes visibly under load. The fix, a welded fish-plate, is the most-commented moment on the channel this year.",
    ],
    chapters: [
      { t: 0, title: "Why not just buy one" },
      { t: 132, title: "Sketching a press that comes apart" },
      { t: 410, title: "Doubling the channel" },
      { t: 780, title: "Drilling 18 pin holes in a row" },
      { t: 1105, title: "First load test: it flexes" },
      { t: 1390, title: "The fish-plate fix" },
      { t: 1688, title: "Bending inch bar cold" },
    ],
    onScreen: [
      {
        t: 150,
        name: "Drill Press Blueprint Print",
        note: "The sketch on the wall behind the bench.",
        product: "blueprint-print",
      },
      {
        t: 420,
        name: "Clamps, 6 in F-style",
        note: "You will need more than you think. Eight here.",
      },
      {
        t: 790,
        name: "Annular cutter, 13/16 in",
        note: "Mag drill rental, one weekend.",
      },
      {
        t: 1120,
        name: "Dial indicator",
        note: "Measures flex under load. It moved 3 mm.",
      },
      {
        t: 1700,
        name: "Sparks Heavyweight Hoodie",
        note: "Cold February morning in Bay 1.",
        product: "sparks-hoodie",
      },
    ],
  },
  {
    slug: "brake-rotor-grinder-stand",
    title: "A pedestal grinder stand from a brake rotor",
    series: "ten-dollar-steel",
    published: "2026-09-24",
    duration: 760,
    views: 297000,
    image: vGrinder,
    alt: "A worker in a hoodie grinding a steel bar in front of a red welding curtain",
    caption: "Brake rotor?",
    summary:
      "A worn-out rotor from the parts store bin becomes a base heavy enough that the grinder stops walking across the floor.",
    body: [
      "Bench grinders on wobbly stands are dangerous, and heavy cast bases cost real money. A worn-out brake rotor from the auto parts store's core bin weighs 22 pounds and costs nothing.",
      "A length of square tube for the post, a plate on top, a tool tray from a coffee can lid. The whole build fits inside one episode and comes in at $7.40 of new hardware.",
    ],
    chapters: [
      { t: 0, title: "The walking grinder" },
      { t: 64, title: "Free rotors from the core bin" },
      { t: 198, title: "Post and top plate" },
      { t: 402, title: "Welding cast iron to mild steel" },
      { t: 588, title: "Tool tray and finish" },
    ],
    onScreen: [
      {
        t: 70,
        name: "Brake rotor, 12 in",
        note: "Ask for the core bin. Most stores say yes.",
      },
      {
        t: 410,
        name: "Nickel rod, 3/32 in",
        note: "For the cast-to-mild joint. Preheat first.",
      },
      {
        t: 600,
        name: "Thumbnail Sticker Pack",
        note: "The post got two stickers before the paint dried.",
        product: "sticker-pack",
      },
    ],
  },
  {
    slug: "sickle-mower-hayfield",
    title: "I dragged a 1940s sickle mower out of a hayfield",
    series: "saved-from-scrap",
    published: "2026-09-17",
    duration: 1694,
    views: 634000,
    image: vMower,
    alt: "Rusted horse-drawn sickle mowers and plough parts sitting in tall summer grass",
    caption: "It's all rust",
    summary:
      "Seventy years in the grass. The cutter bar is gone, the gears are not. Can a horse-drawn mower cut hay again behind a garden tractor?",
    body: [
      "A farmer outside Corry, PA, had three old horse-drawn implements slowly sinking into a fence line. Noor took the sickle mower, the one with the most moving parts, and the least chance of moving again.",
      "The gearbox turned out to be full of hardened grease, which is the best news a restorer can get. The cutter bar is rebuilt from new sections riveted onto the original backing, and the seat is a tractor seat from the same farm.",
      "In the last chapter it cuts a strip of real hay, towed behind a 1980s garden tractor at walking pace.",
    ],
    chapters: [
      { t: 0, title: "A fence line full of iron" },
      { t: 142, title: "Getting it on the trailer" },
      { t: 380, title: "Opening the gearbox" },
      { t: 702, title: "Riveting a new cutter bar" },
      { t: 1050, title: "Wheels, pawls and the seat" },
      { t: 1366, title: "Hitching to a garden tractor" },
      { t: 1540, title: "Cutting hay" },
    ],
    onScreen: [
      {
        t: 160,
        name: "Come-along, 2 ton",
        note: "Got it up the ramps an inch at a time.",
      },
      {
        t: 395,
        name: "Enamel Shop Mug",
        note: "Holds the gearbox bolts. And coffee, separately.",
        product: "enamel-mug",
      },
      {
        t: 715,
        name: "Sickle sections, 3 in",
        note: "Still made for modern mowers. 26 of them.",
      },
      {
        t: 1070,
        name: "Channel Shop Tee, Oxide",
        note: "Day three of the rebuild.",
        product: "shop-tee",
      },
    ],
  },
  {
    slug: "flux-core-vs-mig",
    title: "Flux core vs MIG, honestly",
    series: "ask-the-grinder",
    published: "2026-09-10",
    duration: 972,
    views: 455000,
    image: vFlux,
    alt: "A welder in an auto-darkening helmet and leather gloves welding, blue light and sparks against a dark shop",
    caption: "Which one?",
    summary:
      "The most-asked question in the comments, answered with twelve test welds, a bandsaw and a bench vise.",
    body: [
      "Same machine, same steel, same welder. Six joints in flux core, six with solid wire and 75/25 gas. Then every coupon gets cut in half, etched and bent in the vise until it breaks.",
      "The short answer: flux core wins outdoors and on dirty steel, gas wins on thin sheet and on looks. The long answer is in the cross-sections, and it is more interesting than either camp admits.",
    ],
    chapters: [
      { t: 0, title: "The question in every comment" },
      { t: 88, title: "Twelve coupons, one machine" },
      { t: 310, title: "Flux core runs" },
      { t: 520, title: "Solid wire with gas" },
      { t: 715, title: "Cutting and etching" },
      { t: 860, title: "The bend test" },
    ],
    onScreen: [
      {
        t: 95,
        name: "140A dual-process welder",
        note: "Entry machine used for every coupon.",
      },
      { t: 320, name: "E71T-GS wire, 0.030 in", note: "Gasless flux core." },
      {
        t: 530,
        name: "ER70S-6 wire with 75/25",
        note: "Solid wire, shielding gas at 20 cfh.",
      },
      {
        t: 720,
        name: "Ferric chloride etch",
        note: "Shows the penetration profile in seconds.",
      },
    ],
  },
  {
    slug: "curbside-bed-frame-stools",
    title: "Shop stools from a curbside bed frame",
    series: "ten-dollar-steel",
    published: "2026-09-03",
    duration: 898,
    views: 203000,
    image: vStool,
    alt: "The splayed green steel legs and footrest ring of a workshop stool on a tiled floor",
    caption: "Free steel",
    summary:
      "Bed-frame angle is the best free steel in America. Two stools, one frame, tops from a butcher-block offcut.",
    body: [
      "Every spring the curbs fill up with angle-iron bed frames. The steel is hard, straight and free, and it makes a stool that will outlive whoever sits on it.",
      "This episode builds two stools with a splayed-leg jig made from plywood, and covers why bed-frame steel is tougher to drill than anything else on the rack.",
    ],
    chapters: [
      { t: 0, title: "Curb day" },
      { t: 70, title: "Why bed-frame steel is weird" },
      { t: 215, title: "A plywood splay jig" },
      { t: 480, title: "Footrest rings" },
      { t: 700, title: "Butcher-block tops" },
    ],
    onScreen: [
      {
        t: 80,
        name: "Cobalt drill bits",
        note: "Bed-frame angle eats standard bits.",
      },
      {
        t: 225,
        name: "Plywood offcut, 3/4 in",
        note: "The jig. Reused for every stool since.",
      },
      {
        t: 710,
        name: "Waxed Canvas Shop Apron",
        note: "Pocket for the pencil, loop for the square.",
        product: "waxed-apron",
      },
    ],
  },
  {
    slug: "electrolysis-pliers",
    title: "Twenty rusted pliers, one electrolysis tank",
    series: "saved-from-scrap",
    published: "2026-08-27",
    duration: 1145,
    views: 318000,
    image: vPliers,
    alt: "Three pairs of old pliers hanging on a yellow-painted workshop wall",
    caption: "$5 box",
    summary:
      "A five-dollar flea-market box of pliers, a battery charger and washing soda. Which ones come back, which ones never will.",
    body: [
      "Electrolysis is the slowest, safest, most satisfying way to strip rust, and it costs almost nothing to set up. Twenty pliers go in; a time-lapse shows what happens over two days.",
      "Seventeen come out usable. The three that don't are cut open to show why, and the best pair of the lot now hangs on the yellow wall above the bench.",
    ],
    chapters: [
      { t: 0, title: "Flea market find" },
      { t: 92, title: "Building the tank" },
      { t: 330, title: "Two-day time-lapse" },
      { t: 610, title: "Wire wheel and oil" },
      { t: 880, title: "The three that died" },
    ],
    onScreen: [
      {
        t: 100,
        name: "Washing soda, 1 tbsp per gallon",
        note: "The electrolyte. From the laundry aisle.",
      },
      {
        t: 110,
        name: "Manual battery charger, 6A",
        note: "Smart chargers refuse to run into a tank.",
      },
      {
        t: 620,
        name: "Channel Shop Tee, Graphite",
        note: "Clean shirt day.",
        product: "shop-tee",
      },
    ],
  },
  {
    slug: "shielding-gas-both-bays",
    title: "Plumbing shielding gas to both bays",
    series: "shop-upgrades",
    published: "2026-08-20",
    duration: 1240,
    views: 176000,
    image: vGas,
    alt: "A brass shielding-gas regulator with two pressure gauges and black hoses",
    caption: "No more tank swaps",
    summary:
      "One bottle, two drops, zero dragging cylinders across the slab. Copper line, a manifold and a leak test you can hear.",
    body: [
      "Moving a full gas cylinder between bays is the most dangerous thing that happens in this shop. So the bottle gets a permanent home by the door, and copper line carries gas to a drop in each bay.",
      "The episode covers sizing the line, brazing the joints, mounting the drops at elbow height, and a soapy-water leak test that found two leaks Noor was sure weren't there.",
    ],
    chapters: [
      { t: 0, title: "The cylinder shuffle" },
      { t: 120, title: "Planning the run" },
      { t: 390, title: "Brazing copper" },
      { t: 760, title: "Two drops, one manifold" },
      { t: 1010, title: "Leak test" },
    ],
    onScreen: [
      { t: 130, name: "Type L copper, 3/8 in", note: "Sixty feet, both bays." },
      {
        t: 400,
        name: "Brazing rod, 15% silver",
        note: "Stronger than solder for gas lines.",
      },
      {
        t: 780,
        name: "Welder's Cap, Blueprint print",
        note: "Upside down under the drop. It stays there.",
        product: "welders-cap",
      },
    ],
  },
  {
    slug: "first-helmet-and-gloves",
    title: "What to buy first: a helmet, gloves and nothing else",
    series: "ask-the-grinder",
    published: "2026-08-13",
    duration: 845,
    views: 402000,
    image: vHelmet,
    alt: "A black auto-darkening welding helmet resting on a bench next to a pair of leather welding gloves",
    caption: "Spend here",
    summary:
      "Where the money goes when you have $300 and want to start welding safely, and where it absolutely should not.",
    body: [
      "Beginners spend their budget on the welder and buy safety gear with whatever is left. This episode flips it: the helmet and gloves come first, and the welder is whatever the remaining money buys.",
      "Five helmets are tested for switching speed with a camera shooting through the lens, and three pairs of gloves go through the same spatter abuse for a month.",
    ],
    chapters: [
      { t: 0, title: "The $300 rule" },
      { t: 110, title: "How we tested helmets" },
      { t: 380, title: "Shooting through the lens" },
      { t: 590, title: "Gloves after a month" },
      { t: 760, title: "What to skip" },
    ],
    onScreen: [
      {
        t: 120,
        name: "Auto-darkening helmet, 1/1/1/2 optics",
        note: "The minimum spec worth buying.",
      },
      {
        t: 600,
        name: "Goatskin TIG gloves",
        note: "For dexterity. Cowhide for stick.",
      },
      {
        t: 770,
        name: "Sparks Heavyweight Hoodie",
        note: "Cotton, not fleece. Fleece melts.",
        product: "sparks-hoodie",
      },
    ],
  },
  {
    slug: "first-year-mistakes",
    title: "Seven mistakes from my first year welding",
    series: "ask-the-grinder",
    published: "2026-08-06",
    duration: 1385,
    views: 721000,
    image: vMistakes,
    alt: "A man in a T-shirt and welding helmet grinding a steel frame as sparks spill over his gloves",
    caption: "Don't.",
    summary:
      "The burns, the cracked welds and the near-miss with a full gas bottle. Re-created on camera so you can skip them.",
    body: [
      "The most-watched video on the channel, and the one Noor least wanted to make. Every mistake is re-created with the same equipment from 2019, and every one comes with the fix that should have happened.",
      "Number four, grinding without a face shield, is the reason there is a face shield on a hook by both bay doors.",
    ],
    chapters: [
      { t: 0, title: "Why make this video" },
      { t: 120, title: "1. Synthetic shirt" },
      { t: 300, title: "2. No ground clamp check" },
      { t: 495, title: "3. Painted steel" },
      { t: 690, title: "4. Grinding without a shield" },
      { t: 905, title: "5. Unchained bottle" },
      { t: 1120, title: "6 and 7. Speed and ego" },
    ],
    onScreen: [
      {
        t: 130,
        name: "Channel Shop Tee",
        note: "Heavy cotton. The lesson from mistake one.",
        product: "shop-tee",
      },
      {
        t: 700,
        name: "Polycarbonate face shield",
        note: "On a hook by both doors.",
      },
      { t: 910, name: "Grade 30 chain", note: "Every bottle, every time." },
    ],
  },
  {
    slug: "truck-bed-yard-trailer",
    title: "Turning a 1930s truck into a yard trailer",
    series: "saved-from-scrap",
    published: "2026-07-30",
    duration: 2105,
    views: 588000,
    image: vTruck,
    alt: "A rusted 1930s flatbed truck with faded green paint parked in long grass beside a wooden barn",
    caption: "Not a truck",
    summary:
      "The engine was long gone. The bed, the fenders and the rear axle were not. A two-part build that ends with a tow behind the shop's pickup.",
    body: [
      "This truck had no engine, no title and a tree growing through the cab floor. The owner wanted it gone, but wanted something of it to stay on the farm.",
      "The cab and front end come off; the bed, rear fenders and axle become a yard trailer on a new tongue built from channel. The patina stays. The brakes, lights and bearings are all new.",
    ],
    chapters: [
      { t: 0, title: "A tree through the floor" },
      { t: 210, title: "Cutting off the cab" },
      { t: 590, title: "Saving the rear axle" },
      { t: 980, title: "A tongue from channel" },
      { t: 1400, title: "Bearings, brakes, lights" },
      { t: 1810, title: "First tow" },
    ],
    onScreen: [
      { t: 220, name: "Plasma cutter, 45A", note: "Rented for the cab cut." },
      {
        t: 600,
        name: "Tapered roller bearings",
        note: "Cross-referenced from a 1980s pickup.",
      },
      {
        t: 990,
        name: "Drill Press Blueprint Print",
        note: "Pinned above the layout table.",
        product: "blueprint-print",
      },
      {
        t: 1820,
        name: "Enamel Shop Mug",
        note: "Celebratory coffee.",
        product: "enamel-mug",
      },
    ],
  },
];

/* ───────────────────────────── Merch ───────────────────────────── */

export type MockKind =
  "tee" | "hoodie" | "cap" | "apron" | "stickers" | "opener" | "mug" | "print";
export type Colorway = { name: string; hex: string; ink: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Apparel" | "Shop gear" | "Small stuff";
  kind: MockKind;
  colors: Colorway[];
  sizes: string[];
  blurb: string;
  details: string[];
  tag?: string;
  added: string;
};

export const productCategories = [
  "Apparel",
  "Shop gear",
  "Small stuff",
] as const;

export const products: Product[] = [
  {
    id: "shop-tee",
    name: "Channel Shop Tee",
    price: 32,
    category: "Apparel",
    kind: "tee",
    colors: [
      { name: "Graphite", hex: "#2b2a29", ink: "#ff7a2e" },
      { name: "Oxide", hex: "#8a3b22", ink: "#f2ede4" },
      { name: "Bone", hex: "#e7dfd0", ink: "#1a1816" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    blurb:
      "The shirt from mistake number one: 7 oz heavyweight cotton that won't melt to your arm when spatter lands on it. Channel profile on the chest, cut list on the back.",
    details: [
      "7 oz ring-spun cotton, garment dyed",
      "Boxy fit, size down for a closer cut",
      "Screen printed in Erie, PA",
      "Machine wash cold, hang dry",
    ],
    tag: "Best seller",
    added: "2026-03-02",
  },
  {
    id: "sparks-hoodie",
    name: "Sparks Heavyweight Hoodie",
    price: 68,
    category: "Apparel",
    kind: "hoodie",
    colors: [
      { name: "Graphite", hex: "#2b2a29", ink: "#ff7a2e" },
      { name: "Oxide", hex: "#8a3b22", ink: "#f2ede4" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    blurb:
      "Built for February in an unheated garage. 14 oz cotton fleece, no polyester, a hood that fits under a welding helmet and a kangaroo pocket deep enough for a tape measure.",
    details: [
      "14 oz 100% cotton fleece",
      "Double-lined hood, no drawcord to snag",
      "Reinforced cuffs",
      "Printed in Erie, PA",
    ],
    added: "2025-11-10",
  },
  {
    id: "welders-cap",
    name: "Welder's Cap",
    price: 24,
    category: "Shop gear",
    kind: "cap",
    colors: [
      { name: "Hot Rolled", hex: "#3b3632", ink: "#ff7a2e" },
      { name: "Blueprint", hex: "#24476b", ink: "#f2ede4" },
    ],
    sizes: ["One size"],
    blurb:
      "A proper four-panel cotton welding cap, sewn by a two-person shop in Cleveland. Wear the bill back under the helmet, forward when grinding overhead.",
    details: [
      "100% cotton twill, four panels",
      "Short reversible bill",
      "Fits 21–24 in heads",
      "Hand wash",
    ],
    tag: "Seen in 4 videos",
    added: "2026-05-14",
  },
  {
    id: "waxed-apron",
    name: "Waxed Canvas Shop Apron",
    price: 74,
    category: "Shop gear",
    kind: "apron",
    colors: [
      { name: "Tobacco", hex: "#7a5233", ink: "#f2ede4" },
      { name: "Black", hex: "#1f1d1b", ink: "#ff7a2e" },
    ],
    sizes: ["Regular", "Long"],
    blurb:
      "The apron Noor wears in every build. 18 oz waxed canvas, crossback straps that take the weight off your neck, and a pencil pocket that actually fits a carpenter's pencil.",
    details: [
      "18 oz waxed cotton canvas",
      "Crossback leather straps, quick-release",
      "Regular 34 in / Long 38 in",
      "Re-wax once a year",
    ],
    added: "2025-09-01",
  },
  {
    id: "channel-opener",
    name: "C-Channel Bottle Opener",
    price: 28,
    category: "Small stuff",
    kind: "opener",
    colors: [
      { name: "Raw steel", hex: "#6f6a64", ink: "#2b2a29" },
      { name: "Blackened", hex: "#2b2a29", ink: "#6f6a64" },
    ],
    sizes: ["One size"],
    blurb:
      "Cut, ground and finished by hand in Bay 2 from the same 1.5-inch channel the shop is built from. Every one has slightly different grinder marks. Heavy enough to double as a paperweight.",
    details: [
      "1.5 in mild steel C-channel, 4.5 in long",
      "Oiled raw or chemically blackened",
      "Made in small batches, ships in 2 weeks",
      "Not dishwasher safe",
    ],
    tag: "Made in the shop",
    added: "2026-08-20",
  },
  {
    id: "enamel-mug",
    name: "Enamel Shop Mug",
    price: 22,
    category: "Small stuff",
    kind: "mug",
    colors: [
      { name: "Bone", hex: "#e7dfd0", ink: "#1a1816" },
      { name: "Graphite", hex: "#2b2a29", ink: "#ff7a2e" },
    ],
    sizes: ["12 oz"],
    blurb:
      "Steel mug, enamel coat, black rim. Survives being knocked off the bench, holds gearbox bolts between coffees.",
    details: [
      "12 oz enamelled steel",
      "Rolled stainless rim",
      "Hand wash",
      "Logo fired on, won't peel",
    ],
    added: "2026-01-20",
  },
  {
    id: "sticker-pack",
    name: "Thumbnail Sticker Pack",
    price: 9,
    category: "Small stuff",
    kind: "stickers",
    colors: [{ name: "Mixed", hex: "#ff7a2e", ink: "#1a1816" }],
    sizes: ["8 stickers"],
    blurb:
      "Eight die-cut vinyl stickers of the most infamous thumbnail captions. Rated for toolboxes, helmets and welder side panels.",
    details: [
      "8 die-cut stickers, 2–4 in",
      "UV and oil resistant vinyl",
      "Ships flat in a card mailer",
    ],
    added: "2026-06-30",
  },
  {
    id: "blueprint-print",
    name: "Drill Press Blueprint Print",
    price: 36,
    category: "Small stuff",
    kind: "print",
    colors: [{ name: "Blueprint", hex: "#24476b", ink: "#f2ede4" }],
    sizes: ["12 × 16 in", "18 × 24 in"],
    blurb:
      "The hand drawing of the 1952 drill press restoration, every bolt dimensioned. Printed on heavy matte stock, unframed.",
    details: [
      "Giclée on 230 gsm matte paper",
      "Unframed, ships rolled in a tube",
      "Signed by Noor on the back",
    ],
    added: "2026-04-08",
  },
];

/* ───────────────────────────── Membership ───────────────────────────── */

export type Tier = {
  id: string;
  name: string;
  monthly: number;
  pitch: string;
  perks: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "shop-floor",
    name: "Shop Floor",
    monthly: 4,
    pitch: "Watch first and keep the lights on.",
    perks: [
      "Every video 48 hours early, ad-free",
      "Members-only community tab",
      "Your name in the end credits",
    ],
  },
  {
    id: "night-shift",
    name: "Night Shift",
    monthly: 9,
    pitch: "For people who build along.",
    perks: [
      "Everything in Shop Floor",
      "Printable plans and cut lists for every build",
      "Monthly live build stream with Q&A",
      "Vote on the next Ask the Grinder topic",
      "10% off all merch",
    ],
    featured: true,
  },
  {
    id: "apprentice",
    name: "Apprentice",
    monthly: 25,
    pitch: "A seat at the bench.",
    perks: [
      "Everything in Night Shift",
      "Raw, uncut build footage each month",
      "Quarterly group video call in the shop",
      "A sticker mailer twice a year",
      "First pick of every shop-made batch",
    ],
  },
];

export const membershipFaq = [
  {
    q: "How is yearly billing calculated?",
    a: "Yearly is ten months' price for twelve months of membership. You can switch between monthly and yearly at any time from your account.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time, in two clicks. You keep your perks until the end of the period you paid for, and the plans you downloaded are yours to keep.",
  },
  {
    q: "What are the plans like?",
    a: "Hand-drawn, dimensioned PDF drawings with a cut list and a hardware list. They are made for a home shop: imperial units, common stock sizes, no CNC required.",
  },
  {
    q: "Where does the money go?",
    a: "Memberships pay for the editor, the shop rent and the steel. They are the reason the channel can turn down sponsors that don't fit.",
  },
  {
    q: "Is my discount applied automatically?",
    a: "Night Shift and Apprentice members get a merch code in the welcome email and on the community tab. It works on everything except shop-made batches.",
  },
];

/* ───────────────────────────── Brand deals ───────────────────────────── */

export const partners = {
  title: "Put your product on the bench, not in a script",
  intro:
    "Channel takes six sponsored integrations a year. Every one is a product Noor would buy anyway, used in a real build, filmed without a script and published with a clear disclosure.",
  audience: [
    { label: "United States", share: 58 },
    { label: "Canada", share: 11 },
    { label: "United Kingdom", share: 8 },
    { label: "Australia", share: 6 },
    { label: "Germany", share: 4 },
    { label: "Elsewhere", share: 13 },
  ],
  audienceNote:
    "Illustrative demonstration figures, last 90 days. Viewers are mostly 25–54, two thirds watch on a TV or desktop, and the average view lasts 11 minutes.",
  formats: [
    {
      name: "Integrated build",
      length: "60–120 s inside a regular episode",
      price: "from $6,500",
      note: "Your product used for real in that week's build.",
    },
    {
      name: "Dedicated episode",
      length: "Full episode built around one product",
      price: "from $14,000",
      note: "Two per year at most. Long-term test required first.",
    },
    {
      name: "Shorts pack",
      length: "Three vertical clips over a month",
      price: "from $3,200",
      note: "Cut from shop footage, not a separate shoot.",
    },
    {
      name: "Shop-made collaboration",
      length: "Limited merch batch co-branded with you",
      price: "Quoted per project",
      note: "Profits split, every unit made in Bay 2.",
    },
  ],
  rules: [
    {
      title: "We use it first",
      text: "Every product lives in the shop for at least four weeks before we agree to anything. If it fails, we tell you privately and walk away.",
    },
    {
      title: "No scripts, no approvals",
      text: "You get a factual accuracy check before publishing. You don't get to change the opinion.",
    },
    {
      title: "Disclosure up front",
      text: "Paid partnerships are labelled on the video and said out loud in the first minute.",
    },
    {
      title: "Nothing unsafe",
      text: "We turn down gear that cuts corners on safety, no matter the fee. That includes most cheap helmets.",
    },
  ],
  past: [
    {
      brand: "Northline Clamps",
      what: "Integrated build in the welding cart episode",
    },
    {
      brand: "Halvard Abrasives",
      what: "Shorts pack: flap disc grit comparison",
    },
    { brand: "Ferro Workwear", what: "Shop-made collaboration, 300 aprons" },
    {
      brand: "Oakum Lighting",
      what: "Integrated build in the shop lighting upgrade",
    },
  ],
  steps: [
    "Send the enquiry below with the product and timing.",
    "We reply within five working days, yes or no.",
    "If yes, the product comes to the shop for a four-week test.",
    "We agree a format, a date and a fixed fee.",
    "Episode goes live with disclosure; you get a performance report after 30 days.",
  ],
};

/* ───────────────────────────── About ───────────────────────────── */

export const about = {
  title: "Two bays, one heater and a lot of offcuts",
  lead: "Channel started in 2019 as a phone propped on a paint can, filming a rusted drill press nobody else wanted. Seven years later it is a small business with two people, a shop and a rule: nothing leaves shinier than it needs to be.",
  story: [
    "Noor Castellanos learned to weld at a community college night class while working days at a tire shop. The first video was meant for the instructor, as proof that the drill press restoration had actually happened. Forty thousand strangers watched it instead.",
    "The name came from the first thing on the steel rack: a stack of 3-inch C-channel bought by mistake. It ended up in the press, the welding cart, the trailer tongue and the bottle opener. It is the closest thing the shop has to a house material.",
    "Today the shop runs on memberships, merch and a handful of carefully picked sponsors. Every machine restored on camera goes back to its owner or to someone who will use it, never to a collector's shelf.",
  ],
  crew: [
    {
      name: "Noor Castellanos",
      role: "Host, fabricator",
      bio: "Welds, restores, talks to the camera while doing both. Holds the record for most fingers burned in a single episode (three).",
    },
    {
      name: "Jess Amari",
      role: "Editor, camera, shop manager",
      bio: "Joined in 2022 after sending a recut of the mower episode that was better than the original. Runs the merch shop and the members' plans.",
    },
    {
      name: "Rivet",
      role: "Shop cat",
      bio: "Arrived during the gas-line episode and never left. Inspects every weld from a safe distance.",
    },
  ],
  timeline: [
    {
      year: "2019",
      text: "First video: a 1952 drill press, filmed on a phone.",
    },
    { year: "2020", text: "Rented Bay 1 of the Peach Street garage." },
    { year: "2022", text: "Jess joins; the channel passes 100K subscribers." },
    {
      year: "2023",
      text: "Bay 2 added. First merch: 200 shop tees, sold out in a day.",
    },
    { year: "2025", text: "Memberships launch with printable plans." },
    {
      year: "2026",
      text: "First shop-made batch: the C-channel bottle opener.",
    },
  ],
  gear: [
    {
      group: "Welding",
      items: [
        "210A multi-process welder",
        "140A flux core welder (the original)",
        "45A plasma cutter",
      ],
    },
    {
      group: "Machines",
      items: [
        "1952 floor drill press",
        "14 in metal bandsaw",
        "Shop-built 20-ton press",
      ],
    },
    {
      group: "Camera",
      items: [
        "Two mirrorless bodies",
        "24–70 mm and 100 mm macro",
        "Welding filter for arc close-ups",
      ],
    },
  ],
  image: aboutNoor,
  imageAlt:
    "A welder in a cap and dark workwear leaning into a weld, sparks lighting his face shield",
  shopImage: shopSmoke,
  shopImageAlt:
    "A welder lit by a blue arc and a column of smoke in a dark shop",
};

/* ───────────────────────────── Home ───────────────────────────── */

export const home = {
  manifesto: "Nothing leaves this shop shinier than it needs to be.",
  manifestoNote:
    "Scars stay. Original paint stays when it can. Every restored machine goes back to work, not onto a shelf.",
  schedule: [
    {
      day: "Tuesday",
      time: "6:00 pm ET",
      what: "Members' early cut",
      detail: "Thursday's episode, 48 hours early and ad-free.",
    },
    {
      day: "Thursday",
      time: "6:00 pm ET",
      what: "Main episode",
      detail: "The week's build, 12–35 minutes.",
    },
    {
      day: "Last Friday",
      time: "8:00 pm ET",
      what: "Live build stream",
      detail: "Night Shift members and up. Two hours, questions welcome.",
    },
    {
      day: "Sunday",
      time: "Noon ET",
      what: "Shop short",
      detail: "One vertical clip from the week's footage.",
    },
  ],
  comments: [
    {
      handle: "@rustbeltmarge",
      when: "3 days ago",
      text: "I grew up behind a mower exactly like that one. Hearing the sickle bar run again at 26:40 got me.",
    },
    {
      handle: "@lefty.welds",
      when: "1 week ago",
      text: "Built the cart from the plans this weekend. My offcut was 1 ¾ inches. Yours was 1 ½. I'll take it.",
    },
    {
      handle: "@grandpasgarage",
      when: "2 weeks ago",
      text: "Finally a channel that leaves the fish-plate fix in instead of pretending the first design worked.",
    },
    {
      handle: "@tinygaragedan",
      when: "1 month ago",
      text: "Watched the helmet video, returned the $30 helmet, bought the one with the real optics. Eyes thank you.",
    },
  ],
  close: "Thursday, 6 pm. Pull up a stool.",
};

export const footerNote = "Nothing on this demo is sent, charged or shipped.";
