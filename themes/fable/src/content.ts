import hero from "./assets/hero.jpg";
import bubbles from "./assets/bubbles.jpg";
import colour from "./assets/colour.jpg";
import build from "./assets/build.jpg";
import gears from "./assets/gears.jpg";
import climb from "./assets/climb.jpg";
import dino from "./assets/dino.jpg";
import harbour from "./assets/harbour.jpg";
import garden from "./assets/garden.jpg";
import lookout from "./assets/lookout.jpg";
import party from "./assets/party.jpg";
import sky from "./assets/sky.jpg";
import studio from "./assets/studio.jpg";
import school from "./assets/school.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Fable",
  sector: "Children’s museum",
  tagline: "A museum for small people with very big ideas.",
  email: "hello@fable.example",
  groupsEmail: "groups@fable.example",
  phone: "+1 555 0134 2210",
  phoneHref: "tel:+15550134221",
  address: ["40 Depot Row", "Wonderby, WA 98021"],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

/** Sunday-first week; null = closed. 24h "HH:MM". */
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
  ["09:30", "17:00"],
  null,
  ["09:30", "17:00"],
  ["09:30", "17:00"],
  ["09:30", "17:00"],
  ["09:30", "19:00"],
  ["09:00", "17:00"],
];
export const hoursNote =
  "Closed Mondays, except Monday holidays. Last entry one hour before closing.";

export const nav = [
  { to: "/exhibits", label: "Exhibits" },
  { to: "/visit", label: "Plan your visit" },
  { to: "/events", label: "Events" },
  { to: "/school-trips", label: "School trips" },
  { to: "/parties", label: "Parties" },
  { to: "/about", label: "About" },
];

export const images = { hero, party, sky, studio, school };

/* ------------------------------------------------------------ ages + galleries */

export type AgeGroup = "under3" | "3to5" | "6to8" | "9to12";
export const ageGroups: { id: AgeGroup; label: string }[] = [
  { id: "under3", label: "Under 3" },
  { id: "3to5", label: "3–5" },
  { id: "6to8", label: "6–8" },
  { id: "9to12", label: "9–12" },
];

export type ShapeKind =
  | "circle"
  | "drop"
  | "square"
  | "half"
  | "triangle"
  | "arch"
  | "pill"
  | "leaf"
  | "ring";
export type Swatch =
  "sun" | "coral" | "mint" | "lilac" | "pink" | "sage" | "sky";

export type Session = { time: string; title: string; minutes: number };

export type Exhibit = {
  slug: string;
  name: string;
  /** One-line sign text, as printed on the gallery door. */
  sign: string;
  shape: ShapeKind;
  swatch: Swatch;
  floor: string;
  ages: AgeGroup[];
  ageLabel: string;
  stay: number;
  noise: "Calm" | "Lively" | "Loud";
  mess: "Clean hands" | "A little messy" | "Aprons on";
  image: string;
  alt: string;
  intro: string;
  body: string[];
  tryThis: string[];
  grownUps: string;
  access: string;
  sessions: Session[];
  related: string[];
};

export const exhibits: Exhibit[] = [
  {
    slug: "bubble-works",
    name: "Bubble Works",
    sign: "Make a bubble bigger than you.",
    shape: "circle",
    swatch: "mint",
    floor: "Ground floor",
    ages: ["under3", "3to5", "6to8"],
    ageLabel: "Ages 1–8",
    stay: 35,
    noise: "Lively",
    mess: "Aprons on",
    image: bubbles,
    alt: "A toddler holds a plastic bubble wand up to her face, about to blow.",
    intro:
      "Twelve bubble stations, one giant hoop and a trough of the slipperiest water in Wonderby. Bubble Works is where most of our visitors get wet for the first time, and where most grown-ups do too.",
    body: [
      "Every station asks one question. Can a bubble be square? How long can you keep one alive? What happens when two bubbles meet? Children answer with wands, frames, straws and their whole arms, and the answers change every time.",
      "At the centre is the Hoop: stand in the ring, pull the rope, and a bubble rises up around you like a shimmering wall. It is the most photographed spot in the museum, and it never gets old.",
      "Our bubble mix is made on site every morning from water, glycerin and gentle soap. It is safe for skin and rinses out of clothes.",
    ],
    tryThis: [
      "Blow a bubble inside a bubble with the long straws.",
      "Make a square bubble on the cube frame — then guess what shape pops out.",
      "Stand in the Hoop and count how many seconds your wall lasts.",
      "Find the rainbow: hold a bubble up to the window light.",
    ],
    grownUps:
      "Waterproof aprons hang at every entrance, in four sizes. The floor is non-slip but bring a spare top for the under-3s.",
    access:
      "Two stations sit at seated height with knee space. The Hoop rope has a loop handle and can be pulled by a helper.",
    sessions: [
      { time: "11:00", title: "The Giant Bubble Show", minutes: 20 },
      { time: "15:00", title: "Bubble Science Lab", minutes: 30 },
    ],
    related: ["little-harbour", "colour-kitchen", "gear-garden"],
  },
  {
    slug: "colour-kitchen",
    name: "The Colour Kitchen",
    sign: "Mix a colour nobody has named yet.",
    shape: "drop",
    swatch: "coral",
    floor: "Ground floor",
    ages: ["3to5", "6to8", "9to12"],
    ageLabel: "Ages 3–12",
    stay: 40,
    noise: "Lively",
    mess: "A little messy",
    image: colour,
    alt: "Children drip food colouring into a plate of milk and watch the colours swirl.",
    intro:
      "Part science lab, part paint studio. In the Colour Kitchen children drop, swirl, mix and smear their way to colours that did not exist this morning — and then give them names.",
    body: [
      "The long kitchen bench has eight stations, each with a different recipe: milk-swirl colour bursts, cabbage-water potions that turn pink with lemon, light tables for layering coloured film, and paint walls that can be washed down at the end of the day.",
      "Every colour a child mixes can be scanned at the Naming Desk, given a name, and added to the Fable Colour Wall. There are 31,000 names on it so far. Our favourite this month is “Grandma’s Soup Green”.",
      "A museum educator runs the bench all day and is always happy to explain why the milk does what it does (it is the soap, and the fat, and a little bit of magic).",
    ],
    tryThis: [
      "Turn purple cabbage water pink, then blue, then green.",
      "Make the milk explode with one drop of soap.",
      "Mix a colour, scan it, and give it a name for the Colour Wall.",
      "Stack three coloured films on the light table to make black.",
    ],
    grownUps:
      "All paints and colourings are washable and food-safe. Sleeves up: the bench is designed for elbows.",
    access:
      "The bench is height-adjustable at two stations. Large-grip droppers and pre-filled pots are available on request.",
    sessions: [
      { time: "10:30", title: "Potion Bench", minutes: 30 },
      { time: "14:00", title: "Name That Colour", minutes: 25 },
    ],
    related: ["bubble-works", "big-build", "root-and-burrow"],
  },
  {
    slug: "big-build",
    name: "The Big Build",
    sign: "Build it tall. Knock it down. Again.",
    shape: "square",
    swatch: "sun",
    floor: "Ground floor",
    ages: ["under3", "3to5", "6to8", "9to12"],
    ageLabel: "All ages",
    stay: 45,
    noise: "Loud",
    mess: "Clean hands",
    image: build,
    alt: "A child sits on the floor among bright plastic building bricks and a half-built farmhouse.",
    intro:
      "Four hundred giant foam blocks, a sea of chunky bricks and a demolition ramp. The Big Build is our busiest gallery and the one children ask for by name on the way home.",
    body: [
      "The gallery is split into three building sites. The Foam Yard has blocks bigger than a toddler, for forts and towers and long wobbly walls. The Brick Tables have thousands of chunky interlocking bricks for small-scale cities. And the Engineering Bay has real (child-sized) beams, bolts and spanners for building bridges that you can actually walk across.",
      "Nothing here is finished. Every structure is left for the next visitor to add to, fix, or take apart — and every evening the team photographs the day’s best builds before resetting the floor.",
    ],
    tryThis: [
      "Build a tower taller than the grown-up you came with.",
      "Bolt together a bridge in the Engineering Bay and walk across it.",
      "Design a house for a dinosaur at the Brick Tables.",
      "Roll a foam ball down the ramp and knock over the wall you just built.",
    ],
    grownUps:
      "The Foam Yard has a fenced corner for under-3s. Shoes off in the Foam Yard; cubbies are by the door.",
    access:
      "Step-free throughout. The Brick Tables are wheelchair height, and a quiet corner sits behind the Engineering Bay.",
    sessions: [
      { time: "13:30", title: "Bridge Builders Challenge", minutes: 30 },
    ],
    related: ["gear-garden", "the-climb", "little-harbour"],
  },
  {
    slug: "gear-garden",
    name: "Gear Garden",
    sign: "Turn one handle, move the whole wall.",
    shape: "half",
    swatch: "sage",
    floor: "First floor",
    ages: ["3to5", "6to8", "9to12"],
    ageLabel: "Ages 4–12",
    stay: 30,
    noise: "Lively",
    mess: "Clean hands",
    image: gears,
    alt: "A wooden workshop gallery with gears mounted on a wall, ball-run tables and a cut-out tree.",
    intro:
      "A wall of 140 interlocking gears, a forty-foot ball run and a pulley chair that lets a six-year-old lift their dad. Gear Garden is how machines work, explained by doing.",
    body: [
      "Children rearrange gears on the magnetic Gear Wall to make the far end spin faster, slower or backwards. On the ball-run tables they build tracks from ramps, funnels and loops, then race them. And at the Pulley Chair they discover that four ropes make anyone strong.",
      "Gear Garden was designed with Wonderby’s community makerspace, and several of the machines were built by local teenagers on our Saturday apprentice programme.",
    ],
    tryThis: [
      "Make the last gear on the wall spin the opposite way.",
      "Build a ball run that takes longer than ten seconds.",
      "Lift a grown-up on the four-pulley chair.",
      "Find the gear with exactly 24 teeth.",
    ],
    grownUps:
      "Small parts live behind the ball-run counter, so this gallery is fine for curious toddlers with a hand to hold.",
    access:
      "The Gear Wall reaches from 18 inches to six feet, so everyone can reach a working section from a chair.",
    sessions: [{ time: "12:00", title: "Marble Run Race", minutes: 25 }],
    related: ["big-build", "the-lookout", "dino-dig"],
  },
  {
    slug: "the-climb",
    name: "The Climb",
    sign: "Three storeys up. One way down.",
    shape: "triangle",
    swatch: "coral",
    floor: "Ground to second floor",
    ages: ["6to8", "9to12"],
    ageLabel: "Ages 5–12",
    stay: 25,
    noise: "Loud",
    mess: "Clean hands",
    image: climb,
    alt: "A tall wooden lattice climbing structure rises through a bright atrium beside floor-to-ceiling windows.",
    intro:
      "A wooden lattice tower that climbs through all three floors of the old tram depot. Nets, ladders, crawl tubes and look-outs, with a slide back down to the ground floor.",
    body: [
      "The Climb was built from reclaimed timber from the depot’s original roof. Children choose their own route up through the lattice, past porthole windows into every gallery, to a crow’s nest just under the skylight.",
      "Staff are posted at the base and top at all times. The tower is fully netted and inspected every morning before doors open.",
    ],
    tryThis: [
      "Spot the Gear Garden through the second porthole.",
      "Count the ladders on your way to the crow’s nest.",
      "Find the hidden bell at the very top — and ring it once.",
    ],
    grownUps:
      "Children must be at least 42 inches tall to climb (there is a measuring giraffe at the entrance). Grown-ups are welcome to climb too; it is snug.",
    access:
      "A lift runs alongside the tower so carers can meet climbers at every level. Grip socks are available at the desk for $2.",
    sessions: [],
    related: ["big-build", "the-lookout", "gear-garden"],
  },
  {
    slug: "dino-dig",
    name: "Dino Dig",
    sign: "Dig up a dinosaur. Put it back together.",
    shape: "arch",
    swatch: "lilac",
    floor: "First floor",
    ages: ["3to5", "6to8", "9to12"],
    ageLabel: "Ages 3–12",
    stay: 40,
    noise: "Lively",
    mess: "A little messy",
    image: dino,
    alt: "Life-size skeleton casts of a Tyrannosaurus and a Triceratops face each other in a lit prehistoric diorama.",
    intro:
      "A real-sized Triceratops cast faces down a Tyrannosaurus in our prehistoric hall, and below them lies a sandpit full of buried bones waiting for young palaeontologists.",
    body: [
      "Dino Dig is two galleries in one. Upstairs is the diorama: two full skeleton casts in a Late Cretaceous swamp, with a sound-and-light storm every half hour. Downstairs is the Dig Pit, where children use brushes, trowels and sieves to uncover a buried skeleton, then try to rebuild it on the layout table.",
      "Every bone in the pit is a hand-cast replica of a real fossil from the Hell Creek Formation. Our volunteers swap the skeleton between three species each season, so return visitors always find something new.",
    ],
    tryThis: [
      "Uncover a full skull in the Dig Pit without breaking it.",
      "Match your footprint to the dinosaur track on the floor.",
      "Wait for the storm — and count the seconds between the lightning and the thunder.",
      "Rebuild a spine in the right order on the layout table.",
    ],
    grownUps:
      "The storm is loud and dark for 60 seconds every half hour. Ear defenders hang by the door, and a sign shows the time of the next storm.",
    access:
      "The Dig Pit has a raised, wheelchair-height section with its own tools. Touch-casts of a tooth and claw are on the rail for blind and partially sighted visitors.",
    sessions: [
      { time: "10:00", title: "Fossil Hunters", minutes: 30 },
      { time: "14:30", title: "Meet a Palaeontologist", minutes: 25 },
    ],
    related: ["root-and-burrow", "the-lookout", "colour-kitchen"],
  },
  {
    slug: "little-harbour",
    name: "Little Harbour",
    sign: "For our smallest sailors. Shoes off, socks on.",
    shape: "pill",
    swatch: "pink",
    floor: "Ground floor",
    ages: ["under3", "3to5"],
    ageLabel: "Ages 0–5",
    stay: 45,
    noise: "Calm",
    mess: "Clean hands",
    image: harbour,
    alt: "A small child fits chunky coloured wooden numbers into a puzzle board on the floor.",
    intro:
      "A soft, calm harbour town just for under-fives, with a fishing pier, a tiny market and a sorting post office. Big children wait outside; grown-ups come in.",
    body: [
      "Little Harbour is gated, carpeted and bright. Crawlers explore the low tunnels and mirror boats; walkers run the market stall, stamp letters at the post office and fish for magnetic crabs off the pier. Everything is chunky, washable and at toddler height.",
      "A nursing room with two armchairs, a bottle warmer and a changing table sits just off the pier, and there is always a member of the Harbour team on hand.",
    ],
    tryThis: [
      "Post a letter in the red box and find where it comes out.",
      "Catch three magnetic crabs off the end of the pier.",
      "Sort the market fruit by colour, then by size.",
      "Put every number back in its spot on the harbour board.",
    ],
    grownUps:
      "Strictly for children aged five and under with their grown-ups. Buggy parking is right outside the gate.",
    access:
      "Calm lighting, no sudden sounds and a sensory nook with soft seating. Quiet mornings run every Tuesday from 9:30 to 11:00.",
    sessions: [
      { time: "09:45", title: "Harbour Rhyme Time", minutes: 20 },
      { time: "13:00", title: "Tiny Explorers", minutes: 25 },
    ],
    related: ["bubble-works", "big-build", "root-and-burrow"],
  },
  {
    slug: "root-and-burrow",
    name: "Root & Burrow",
    sign: "Get your hands dirty. That is the point.",
    shape: "leaf",
    swatch: "sage",
    floor: "Courtyard",
    ages: ["under3", "3to5", "6to8", "9to12"],
    ageLabel: "All ages",
    stay: 35,
    noise: "Calm",
    mess: "Aprons on",
    image: garden,
    alt: "A child’s hand holds up a fistful of dark garden soil above leafy plants.",
    intro:
      "Our outdoor courtyard garden, with a mud kitchen, a worm hotel, raised vegetable beds and a giant underground burrow that children can crawl through.",
    body: [
      "Root & Burrow is open whenever the sun is (and often when it isn’t — waterproofs live in the shed). Children dig, plant, water and harvest, and everything grown here ends up in the soup at Crumbs café.",
      "The see-through Burrow tunnel runs under the beds, so children crawling inside can watch roots, worms and beetles going about their business just behind the glass.",
    ],
    tryThis: [
      "Cook a mud pie in the mud kitchen and serve it to a grown-up.",
      "Count the worms on the worm hotel window.",
      "Crawl the Burrow and spot a root growing down.",
      "Plant a seed to take home in a paper pot.",
    ],
    grownUps:
      "Wellies and puddle suits are free to borrow from the shed. Wash stations with warm water stand by the café door.",
    access:
      "Raised beds at wheelchair height on the south path. The Burrow has a side entrance at ground level.",
    sessions: [{ time: "11:30", title: "Worm Hotel Check-in", minutes: 20 }],
    related: ["dino-dig", "the-lookout", "little-harbour"],
  },
  {
    slug: "the-lookout",
    name: "The Lookout",
    sign: "See the weather before it reaches you.",
    shape: "ring",
    swatch: "sky",
    floor: "Roof terrace",
    ages: ["6to8", "9to12"],
    ageLabel: "Ages 5–12",
    stay: 25,
    noise: "Calm",
    mess: "Clean hands",
    image: lookout,
    alt: "A young girl rests her hands on a pair of binoculars on a table beside her notebook.",
    intro:
      "A rooftop weather station and bird hide with long views over Wonderby Bay. Binoculars, rain gauges, a wind sock and logbooks for every young forecaster.",
    body: [
      "The Lookout teaches children to read the sky. They record temperature and wind in the logbook, check the rain gauge, spot gulls and herons through the binoculars, and make the day’s forecast on the big chalkboard — which visitors then grade on their way out.",
      "On clear Friday evenings the Lookout becomes a starwatch, with our telescope trained on the moon and whatever planets are up.",
    ],
    tryThis: [
      "Write today’s weather in the forecasters’ logbook.",
      "Spot three different birds over the bay.",
      "Find north using only the wind vane and the sun.",
    ],
    grownUps:
      "The terrace is fully fenced with high glass panels. It closes in high wind; the sign by the lift shows today’s status.",
    access:
      "Reached by the main lift. Binoculars on the low rail are at seated height, and the logbook comes in large print.",
    sessions: [{ time: "15:30", title: "Forecast of the Day", minutes: 15 }],
    related: ["gear-garden", "dino-dig", "the-climb"],
  },
];

/* ------------------------------------------------------------ floor map */

export type Amenity = { id: string; label: string; note: string };
export const amenities: Amenity[] = [
  { id: "ent", label: "Entrance & tickets", note: "Buggy park and lockers" },
  { id: "cafe", label: "Crumbs café", note: "Picnic tables inside" },
  { id: "quiet", label: "Quiet room", note: "Low light, no noise" },
  { id: "wc", label: "Toilets", note: "Baby change and family room" },
  { id: "hall", label: "Central hall", note: "" },
];

/** Grid areas for the floor map, keyed by exhibit slug or amenity id. */
export const mapAreas: Record<string, string> = {
  "bubble-works": "bub",
  "colour-kitchen": "colr",
  "big-build": "build",
  "gear-garden": "gear",
  "the-climb": "climb",
  "dino-dig": "dino",
  "little-harbour": "harb",
  "root-and-burrow": "gard",
  "the-lookout": "look",
  ent: "ent",
  cafe: "cafe",
  quiet: "quiet",
  wc: "wc",
  hall: "hall",
};

/* ------------------------------------------------------------ tickets */

export type TicketType = {
  id: string;
  label: string;
  note: string;
  price: number;
  max: number;
};
export const ticketTypes: TicketType[] = [
  { id: "adult", label: "Adult", note: "16 and over", price: 16, max: 10 },
  { id: "child", label: "Child", note: "Ages 2–15", price: 14, max: 12 },
  {
    id: "toddler",
    label: "Under 2",
    note: "Free, but please book a place",
    price: 0,
    max: 6,
  },
  {
    id: "carer",
    label: "Access companion",
    note: "Free with a disabled visitor",
    price: 0,
    max: 4,
  },
];

export const slots = [
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
];
export const slotCapacity = 60;

export const ticketNotes = [
  "Tickets are for a timed arrival slot; once you are in, stay until closing.",
  "Every child must come with an adult. One adult can bring up to four children.",
  "Members and Wonderby library-card holders get in free — choose any slot and show your card at the desk.",
  "Free changes up to 24 hours before your slot. Refunds within 14 days if you cannot come.",
];

export const membership = {
  name: "Fable Family Pass",
  price: 129,
  blurb:
    "A year of unlimited visits for two adults and up to four children, plus early entry on Saturdays, 10% off parties and first booking on holiday workshops.",
};

/* ------------------------------------------------------------ visit */

export const gettingHere = [
  {
    title: "By light rail",
    text: "Depot Row station on the Bay Line is a two-minute walk. Trains every 8 minutes; step-free from platform to our door.",
  },
  {
    title: "By bus",
    text: "Routes 12, 31 and 44 stop on Harbor Street, opposite the main entrance.",
  },
  {
    title: "By car",
    text: "Depot Row parking garage, entrance on Mill Lane. $3 for four hours with a validated Fable ticket. Twelve accessible spaces by the lift.",
  },
  {
    title: "By bike",
    text: "Covered racks for 40 bikes and six cargo bikes in the courtyard, with a free pump.",
  },
];

export const accessibility = [
  "Step-free throughout, with lifts to every floor and the roof terrace.",
  "Quiet mornings on Tuesdays, 9:30–11:00: lower lights, no shows, half capacity.",
  "Sensory backpacks with ear defenders, fidgets and a visual map, free at the desk.",
  "A quiet room on the first floor, open all day.",
  "Changing Places toilet with hoist and adult-sized bench on the ground floor.",
  "Access companions visit free; no proof needed.",
];

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  {
    q: "How long should we plan to stay?",
    a: "Most families stay between two and a half and four hours. Your ticket is for an arrival time, so you can stay until closing.",
  },
  {
    q: "Can we bring our own food?",
    a: "Yes. The picnic room next to Crumbs café is open all day for packed lunches. We are a nut-aware museum, so please leave nut snacks at home.",
  },
  {
    q: "Is Fable good for babies?",
    a: "Very. Little Harbour is built for under-fives, there is a nursing room off the pier, and under-2s visit free.",
  },
  {
    q: "Do grown-ups need a ticket?",
    a: "Yes, every adult needs a ticket, and every child must come with an adult. Unaccompanied adults are welcome at our grown-ups-only evenings.",
  },
  {
    q: "What if my child gets overwhelmed?",
    a: "Head to the quiet room on the first floor, or ask any team member in a yellow shirt. Sensory backpacks are free at the desk.",
  },
  {
    q: "Can we leave and come back?",
    a: "Yes. Ask for a hand stamp at the exit and come back any time the same day.",
  },
];

/* ------------------------------------------------------------ events */

export type Audience = "families" | "under5" | "grownups" | "holiday";
export const audiences: { id: Audience; label: string }[] = [
  { id: "families", label: "Families" },
  { id: "under5", label: "Under 5s" },
  { id: "grownups", label: "Grown-ups only" },
  { id: "holiday", label: "Holiday camps" },
];

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  audience: Audience[];
  price: string;
  blurb: string;
  /** A route ("/tickets") or a mailto: link. */
  action: { label: string; to: string };
};

export const events: Event[] = [
  {
    id: "pumpkin-lab",
    title: "Pumpkin Physics Lab",
    date: "2026-10-24",
    time: "10 am – 3 pm",
    place: "Courtyard",
    audience: ["families"],
    price: "Included with admission",
    blurb:
      "Float them, roll them, weigh them and launch them. A whole day of experiments with the courtyard’s pumpkin harvest.",
    action: { label: "Book admission", to: "/tickets" },
  },
  {
    id: "starlight-friday",
    title: "Starlight Friday",
    date: "2026-10-30",
    time: "5 – 7 pm",
    place: "The Lookout & Sky Dome",
    audience: ["families"],
    price: "Included with admission",
    blurb:
      "Our late opening goes dark: telescope views from the roof, a planetarium show in the Sky Dome and glow-in-the-dark bubbles.",
    action: { label: "Book a late slot", to: "/tickets" },
  },
  {
    id: "rhyme-time-special",
    title: "Big Rhyme Time with Wonderby Library",
    date: "2026-11-04",
    time: "9:45 – 10:30 am",
    place: "Little Harbour",
    audience: ["under5"],
    price: "Free with admission",
    blurb:
      "Songs, shakers and a story about a lighthouse, with librarians from the Bay branch. Ideal for 6 months to 4 years.",
    action: { label: "Book admission", to: "/tickets" },
  },
  {
    id: "fable-after-dark",
    title: "Fable After Dark: Grown-ups Night",
    date: "2026-11-13",
    time: "7:30 – 10 pm",
    place: "Whole museum",
    audience: ["grownups"],
    price: "$22, ages 21+",
    blurb:
      "No kids, no queues, a bar in Dino Dig and a giant-bubble competition. Every gallery open for the people who never got to go.",
    action: {
      label: "Email to book",
      to: "mailto:hello@fable.example?subject=Fable%20After%20Dark",
    },
  },
  {
    id: "thanksgiving-camp",
    title: "Thanksgiving Inventors Camp",
    date: "2026-11-25",
    time: "9 am – 3 pm, three days",
    place: "Studio & Gear Garden",
    audience: ["holiday"],
    price: "$165 for three days",
    blurb:
      "Ages 6–10 design, build and test a working machine over three days, and show it off to families at Friday pick-up.",
    action: {
      label: "Ask about places",
      to: "mailto:groups@fable.example?subject=Thanksgiving%20camp",
    },
  },
  {
    id: "sensory-saturday",
    title: "Sensory Saturday",
    date: "2026-12-05",
    time: "8:30 – 9:30 am",
    place: "Whole museum",
    audience: ["families", "under5"],
    price: "Included with admission",
    blurb:
      "An early, calm hour before doors open, for neurodivergent children and their families. Lights down, sound off, half capacity.",
    action: { label: "Book the 9:30 slot", to: "/tickets" },
  },
  {
    id: "winter-lights",
    title: "Winter Lights Workshop",
    date: "2026-12-12",
    time: "11 am – 4 pm",
    place: "The Colour Kitchen",
    audience: ["families"],
    price: "$6 per lantern",
    blurb:
      "Make a paper lantern with coloured film and an LED, then join the lantern walk round the courtyard at 4pm.",
    action: { label: "Book admission", to: "/tickets" },
  },
  {
    id: "winter-camp",
    title: "Winter Break Explorers Camp",
    date: "2026-12-28",
    time: "9 am – 3 pm, four days",
    place: "Whole museum",
    audience: ["holiday"],
    price: "$210 for four days",
    blurb:
      "Ages 5–9 spend four mornings behind the scenes with our educators, from fossil casting to forecasting snow.",
    action: {
      label: "Ask about places",
      to: "mailto:groups@fable.example?subject=Winter%20camp",
    },
  },
];

/* ------------------------------------------------------------ school trips */

export type Programme = {
  id: string;
  grade: string;
  title: string;
  minutes: number;
  text: string;
  links: string;
};
export const programmes: Programme[] = [
  {
    id: "dig",
    grade: "Pre-K – Grade 2",
    title: "Little Palaeontologists",
    minutes: 45,
    text: "Students excavate a skeleton in the Dig Pit, sort bones by shape and size, and build a timeline of the dinosaurs with their hands.",
    links: "Life science: traits, patterns, sorting and classifying",
  },
  {
    id: "machines",
    grade: "Grades 1–4",
    title: "Simple Machines Showdown",
    minutes: 60,
    text: "Teams use levers, pulleys and gears in Gear Garden to move a heavy load across the gallery, then explain which machine helped most.",
    links: "Physical science: forces, motion and engineering design",
  },
  {
    id: "colour",
    grade: "Grades K–3",
    title: "Kitchen Chemistry",
    minutes: 45,
    text: "Cabbage-water indicators, milk-swirl reactions and colour mixing. Students make predictions, test them and record results.",
    links: "Physical science: properties of matter, observation",
  },
  {
    id: "weather",
    grade: "Grades 3–5",
    title: "Forecasters on the Roof",
    minutes: 60,
    text: "On the Lookout terrace, students take real readings, compare them with the national forecast and present their own.",
    links: "Earth science: weather, climate and data collection",
  },
];

export const tripFacts = [
  { label: "Price", value: "$9 per student, including a workshop" },
  { label: "Chaperones", value: "Free, one per six students required" },
  { label: "Group size", value: "10 to 90 students per visit" },
  { label: "Days", value: "Tuesday to Friday, arrivals 9:30–11:00" },
  { label: "Lunch", value: "Reserved lunchroom, bring your own" },
  {
    label: "Title I schools",
    value: "Free visits funded by the Wonderby Bay Trust",
  },
];

/* ------------------------------------------------------------ parties */

export type PartyPackage = {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  ages: string;
  length: string;
  includes: string[];
  image: string;
  alt: string;
};

export const packages: PartyPackage[] = [
  {
    id: "explorer",
    name: "Little Explorer",
    price: 395,
    maxGuests: 12,
    ages: "Turning 1–4",
    length: "2 hours",
    includes: [
      "Private hour in Little Harbour before it opens",
      "Bubble show with a museum host",
      "Party room for snacks and cake",
      "Museum entry for 12 children and their grown-ups",
    ],
    image: images.studio,
    alt: "A grown-up holds a cup of paintbrushes while a child paints at an easel.",
  },
  {
    id: "maker",
    name: "Big Maker",
    price: 545,
    maxGuests: 20,
    ages: "Turning 5–10",
    length: "2½ hours",
    includes: [
      "Hosted workshop: slime lab, fossil casting or ball-run race",
      "Every guest takes home what they made",
      "Party room with decorations set up for you",
      "Museum entry for 20 children and 10 adults",
    ],
    image: images.party,
    alt: "Children around a craft table share coloured beads, pencils and paper.",
  },
  {
    id: "night",
    name: "Night at the Museum",
    price: 780,
    maxGuests: 24,
    ages: "Turning 7–12",
    length: "3 hours, after closing",
    includes: [
      "The whole museum to yourselves after hours",
      "Flashlight dinosaur hunt and Sky Dome show",
      "Pizza dinner in the café",
      "Two hosts, games and a glow-bubble finale",
    ],
    image: images.sky,
    alt: "Families sit in a darkened dome looking up at a glowing projected globe.",
  },
];

export const partyAddOns: {
  label: string;
  price: number;
  perGuest?: boolean;
}[] = [
  { label: "Birthday cake from Crumbs, serves 20", price: 48 },
  { label: "Party bags with a mini experiment kit", price: 7, perGuest: true },
  { label: "Extra 30 minutes in the party room", price: 60 },
];

/* ------------------------------------------------------------ about */

export const story = [
  "Fable opened in 1998 in a single room above the Depot Row hardware store, with a water table, a box of blocks and a hand-painted sign that said “Please touch everything.” Two schoolteachers, June Okafor and Pete Lindqvist, ran it on weekends.",
  "In 2011 Wonderby gave us the old tram depot next door: a vast brick shed with a glass roof and three floors of empty workshops. Families, local builders and a lot of volunteers turned it into the museum you know now.",
  "Today Fable welcomes around 240,000 visitors a year, a third of them free through school visits, library cards and access programmes. The sign still hangs above the entrance.",
];

export const principles = [
  {
    title: "Please touch everything",
    text: "If it is in a gallery, it is meant to be handled. Things break; we fix them. That is part of the exhibit.",
  },
  {
    title: "Play is serious work",
    text: "Every exhibit is designed with educators and tested with children before it opens. If they walk past it, we rebuild it.",
  },
  {
    title: "Every family belongs",
    text: "Free days, free access companions, quiet mornings and sensory hours. Price and difference should never be the reason a child misses out.",
  },
];

export const team = [
  {
    name: "Amara Okafor-Reyes",
    role: "Director",
    note: "Former teacher. Daughter of our founder, June. Still the first in the Bubble Hoop at staff parties.",
  },
  {
    name: "Tomás Lindqvist",
    role: "Head of Exhibits",
    note: "Built the Gear Wall in his garage. Has strong opinions about the correct number of teeth on a gear.",
  },
  {
    name: "Priya Natarajan",
    role: "Learning & Schools",
    note: "Writes every school programme and runs the Thursday teachers’ preview evenings.",
  },
  {
    name: "Dele Mensah",
    role: "Access & Inclusion",
    note: "Leads Quiet Mornings and Sensory Saturdays, and trains every new team member in calm-down support.",
  },
  {
    name: "Hana Kowalczyk",
    role: "Visitor Experience",
    note: "Knows where every lost sock in Wonderby ends up. Runs the yellow-shirt team on the floor.",
  },
  {
    name: "Rob Ferreira",
    role: "Garden & Grounds",
    note: "Keeps the worms happy and the soup at Crumbs full of courtyard vegetables.",
  },
];

/* ------------------------------------------------------------ home */

export const home = {
  title: "Please touch everything.",
  lede: "Nine hands-on galleries in an old tram depot, built for children up to twelve and the grown-ups who follow them around. Bubbles, dinosaurs, mud, gears and a three-storey climb.",
  quiet: {
    title: "Built for the age of “why?”",
    text: "Children learn by poking, pouring, stacking and starting again. So every gallery at Fable is a question with no wrong answers, and every exhibit is tested by real children before it opens. If they walk past it, we rebuild it.",
  },
  quote: {
    text: "We came for an hour and left at closing. My four-year-old has asked to go back to the Dig Pit every morning since.",
    who: "Leila, visiting with Noor (4) and Sami (8)",
  },
};
