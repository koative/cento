import warmHomesImg from "./assets/warm-homes.jpg";
import pantryImg from "./assets/pantry.jpg";
import homeworkImg from "./assets/homework.jpg";
import gardenImg from "./assets/garden.jpg";
import ridesImg from "./assets/rides.jpg";
import fixItImg from "./assets/fix-it.jpg";
import lanternsImg from "./assets/lanterns.jpg";
import volunteersImg from "./assets/volunteers.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Lantern",
  sector: "Community charity & fundraising",
  legal: "Lantern Community Fund",
  tagline: "Small lights, carried together.",
  town: "Calder Bend",
  address: "112 Mill Street, Calder Bend",
  email: "hello@lantern.example",
  phone: "+1 555 0142",
  phoneHref: "tel:+15550142",
  hours: "Window open Tue–Sat, 10 am – 4 pm",
  registration: "Registered 501(c)(3) nonprofit · EIN 84-3307216 (fictional)",
  /** Every countdown and total on the site is computed as of this date. */
  asOf: "2026-10-18",
};

export const nav = [
  { to: "/campaigns", label: "Campaigns" },
  { to: "/events", label: "Events" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/reports", label: "Reports" },
  { to: "/about", label: "About" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

export const footerColumns = [
  {
    title: "Give",
    links: [
      { to: "/donate", label: "Donate" },
      { to: "/campaigns", label: "Open campaigns" },
      { to: "/campaigns/lantern-walk-2026", label: "Sponsor a walker" },
    ],
  },
  {
    title: "Join in",
    links: [
      { to: "/events", label: "Events" },
      { to: "/volunteer", label: "Volunteer" },
      { to: "/events/lantern-walk", label: "The Lantern Walk" },
    ],
  },
  {
    title: "Lantern",
    links: [
      { to: "/about", label: "About us" },
      { to: "/reports", label: "Reports & open books" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "The Window, monthly",
  text: "One letter a month: what came in, what went out, and who could use a hand. Read in four minutes.",
};

/* ───────────────────────── Causes & campaigns ───────────────────────── */

export type CauseId =
  "food" | "warmth" | "children" | "elders" | "spaces" | "general";

export const causes: { id: CauseId; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "warmth", label: "Warm homes" },
  { id: "children", label: "Children" },
  { id: "elders", label: "Older neighbours" },
  { id: "spaces", label: "Shared spaces" },
  { id: "general", label: "General fund" },
];

export const causeLabel = (id: CauseId) =>
  causes.find((c) => c.id === id)?.label ?? id;

export type Campaign = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  cause: CauseId;
  neighbourhood: string;
  partner: string;
  goal: number;
  raised: number;
  donors: number;
  opened: string;
  closes: string;
  image: string;
  imageAlt: string;
  story: string[];
  milestones: { at: number; label: string }[];
  budget: { label: string; amount: number }[];
  impact: { amount: number; label: string }[];
  updates: { date: string; title: string; text: string }[];
};

export const campaigns: Campaign[] = [
  {
    slug: "warm-homes",
    title: "Warm Homes Before the Frost",
    short:
      "Boiler checks, repairs and draught-proofing for 42 older neighbours before the first hard frost.",
    lead: "Forty-two older neighbours go into winter with boilers that fail the safety check or windows that let the river wind straight in. We fix them before the first frost, not after the first emergency call.",
    cause: "warmth",
    neighbourhood: "All five neighbourhoods",
    partner: "Calder Bend Heating Co-op",
    goal: 48000,
    raised: 31260,
    donors: 412,
    opened: "2026-09-01",
    closes: "2026-12-15",
    image: warmHomesImg,
    imageAlt:
      "A lit window at night, warm curtains glowing around a figure sitting inside.",
    story: [
      "Every list we make starts at the kitchen table. This one started with Marjorie on Orchard Row, who had been heating one room with the oven door open since February because the boiler engineer quoted more than her pension pays in a month.",
      "Over the summer our Warm Homes visitors knocked on 160 doors. Forty-two homes need work: boilers that fail the safety check, gaps around doors you can post a letter through, single-glazed back rooms that sit at 54°F in January.",
      "The Heating Co-op has agreed to work at cost and to send the same two engineers to every house, so nobody has to explain their situation twice. Every job is signed off by a visitor who comes back a week later with a thermometer and a cup of tea.",
    ],
    milestones: [
      { at: 8000, label: "First ten boiler safety checks" },
      { at: 20000, label: "Draught-proofing for 24 homes" },
      { at: 32000, label: "Six boiler replacements" },
      { at: 48000, label: "Every home on the list warm by Christmas" },
    ],
    budget: [
      { label: "Boiler replacements (6 × $3,400)", amount: 20400 },
      { label: "Draught-proofing kits and fitting", amount: 12600 },
      { label: "Safety checks and small repairs", amount: 9600 },
      { label: "Coordination and follow-up visits", amount: 3000 },
      { label: "Emergency heaters on loan", amount: 2400 },
    ],
    impact: [
      { amount: 35, label: "pays for one boiler safety check" },
      { amount: 90, label: "draught-proofs one front door and its frame" },
      {
        amount: 250,
        label:
          "keeps an emergency heater on loan all winter, electricity included",
      },
    ],
    updates: [
      {
        date: "2026-10-12",
        title: "Twelve checks done, two boilers condemned",
        text: "Both households have loan heaters tonight and replacements booked for the first week of November.",
      },
      {
        date: "2026-09-28",
        title: "The Co-op is working at cost",
        text: "Their quote came in $6,100 under the estimate, so the list grew from 36 homes to 42.",
      },
      {
        date: "2026-09-01",
        title: "The list is open",
        text: "Visitors start knocking on doors this week. If you know someone who should be on it, call the window.",
      },
    ],
  },
  {
    slug: "pantry-cold-room",
    title: "A Cold Room for Mill Street Pantry",
    short:
      "A walk-in cold room so the pantry can say yes to milk, eggs and fresh greens.",
    lead: "The pantry turns away fresh milk, eggs and greens every week because two kitchen fridges cannot hold them. A walk-in cold room changes what 180 households carry home on a Saturday.",
    cause: "food",
    neighbourhood: "Mill Street",
    partner: "Mill Street Pantry",
    goal: 22000,
    raised: 18940,
    donors: 307,
    opened: "2026-08-15",
    closes: "2026-11-30",
    image: pantryImg,
    imageAlt:
      "A crate heaped with red and yellow apples in a food bank warehouse.",
    story: [
      "Mill Street Pantry has run out of the back of the old ironmonger's for eleven years. It stocks what keeps: tins, pasta, rice, cereal. What it cannot stock is anything that needs to stay cold.",
      "The farm stand at Saturday market offers its unsold greens every week, and the dairy on Route 9 has offered 40 gallons of milk a fortnight. Without somewhere to keep it, the answer has been no.",
      "A 2.4 by 2 metre cold room fits in the old coal store. The electrics need upgrading first, which is why the first milestone is the least exciting and the most important.",
    ],
    milestones: [
      { at: 6000, label: "Electrical upgrade for the back room" },
      { at: 14000, label: "Cold room unit ordered" },
      { at: 19000, label: "Installed and food-safety certified" },
      { at: 22000, label: "Two years of power and servicing" },
    ],
    budget: [
      { label: "Cold room unit, 2.4 × 2 m", amount: 11800 },
      { label: "Electrical upgrade", amount: 4200 },
      { label: "Two years of power and servicing", amount: 3400 },
      { label: "Installation and food-safety certificate", amount: 2600 },
    ],
    impact: [
      { amount: 25, label: "fills a crate with Saturday-market greens" },
      { amount: 60, label: "runs the cold room for a month" },
      { amount: 150, label: "buys a bay of stainless steel racking" },
    ],
    updates: [
      {
        date: "2026-10-09",
        title: "Unit ordered",
        text: "We passed $14,000 on a Tuesday night and Sam at the pantry placed the order on Wednesday morning. Eight-week lead time.",
      },
      {
        date: "2026-09-20",
        title: "Electrics signed off",
        text: "The back room has its own circuit now, and a light that does not flicker.",
      },
    ],
  },
  {
    slug: "homework-club",
    title: "Homework Club, Five Nights a Week",
    short:
      "Paid coordinators, twelve laptops and a hot snack so 38 waiting children get a seat.",
    lead: "Homework Club runs two nights a week and has a waiting list of 38 children. Five nights needs two paid coordinators, twelve laptops that stay in the room, and something hot to eat at four o'clock.",
    cause: "children",
    neighbourhood: "The Flats",
    partner: "Flats Community Centre",
    goal: 30000,
    raised: 9850,
    donors: 141,
    opened: "2026-10-01",
    closes: "2027-01-31",
    image: homeworkImg,
    imageAlt:
      "A volunteer reading a picture book aloud to a class of children.",
    story: [
      "The club started in 2022 with four volunteer tutors and a box of pencils. It now fills the centre's big room on Tuesdays and Thursdays, and turns children away the other three nights because nobody is paid to unlock the doors.",
      "Most of the children live in flats with one shared device per household. The library closes at five. The club is where reading logs get signed and science projects get finished.",
      "Two part-time coordinators can hold the room together five nights a week and keep the volunteer rota honest. The laptops are refurbished, locked down and stay at the club.",
    ],
    milestones: [
      { at: 7500, label: "Twelve refurbished laptops" },
      { at: 15000, label: "A third night opens" },
      { at: 24000, label: "Fourth and fifth nights open" },
      { at: 30000, label: "The whole school year funded" },
    ],
    budget: [
      { label: "Two part-time coordinators, school year", amount: 16800 },
      { label: "Refurbished laptops and software", amount: 6000 },
      { label: "Hot snacks, 36 weeks", amount: 4200 },
      { label: "Books, printing and supplies", amount: 1800 },
      { label: "Bus passes for volunteer tutors", amount: 1200 },
    ],
    impact: [
      { amount: 20, label: "covers a week of hot snacks for one night's club" },
      {
        amount: 75,
        label: "pays for a term of books and printing for one child",
      },
      {
        amount: 500,
        label: "puts one refurbished laptop on the table for good",
      },
    ],
    updates: [
      {
        date: "2026-10-14",
        title: "First four laptops in",
        text: "A local accountancy office donated four machines; our volunteer IT fixer wiped and locked them down.",
      },
      {
        date: "2026-10-01",
        title: "Campaign open",
        text: "The waiting list was 31 on the first day. It is 38 now.",
      },
    ],
  },
  {
    slug: "riverside-beds",
    title: "Forty Raised Beds at Riverside",
    short:
      "Waist-high growing beds on the old car park by the footbridge. Funded in full in September.",
    lead: "Forty raised beds, waist-high so they can be worked from a wheelchair or a stool, on the old car park by the footbridge. You funded every one of them.",
    cause: "spaces",
    neighbourhood: "Riverside",
    partner: "Riverside Allotment Society",
    goal: 15000,
    raised: 15000,
    donors: 233,
    opened: "2026-04-01",
    closes: "2026-09-30",
    image: gardenImg,
    imageAlt:
      "Gloved hands weeding between rows of young onions in a raised bed.",
    story: [
      "The allotment waiting list in Riverside is six years long, and the plots at the top of the hill are no use to anyone who cannot manage the steps.",
      "The old car park by the footbridge has been empty since the boatyard closed. The city leased it to the Allotment Society for a dollar a year, on the condition that nothing is dug into the ground. Raised beds solved that, and the height solved the steps.",
      "All forty beds are allocated. A third went to people over 70, and six to the special school on Weir Road. The build days continue into the autumn for the tool shed and the water point.",
    ],
    milestones: [
      { at: 4000, label: "Ground cleared and levelled" },
      { at: 9000, label: "Twenty beds built" },
      { at: 13000, label: "Forty beds and a water point" },
      { at: 15000, label: "Tool shed and the first year's compost" },
    ],
    budget: [
      { label: "Timber and fixings", amount: 6200 },
      { label: "Soil and compost", amount: 3100 },
      { label: "Water point and piping", amount: 2400 },
      { label: "Groundwork", amount: 1800 },
      { label: "Tool shed", amount: 1500 },
    ],
    impact: [
      { amount: 30, label: "fills one bed with soil and compost" },
      { amount: 80, label: "builds one bed frame" },
      { amount: 200, label: "buys a season of seed for the whole garden" },
    ],
    updates: [
      {
        date: "2026-09-26",
        title: "Funded, with four days to spare",
        text: "233 people, one board, and a very loud cheer outside the window. Thank you.",
      },
      {
        date: "2026-08-30",
        title: "Twenty-eight beds standing",
        text: "The Saturday build crew has its rhythm. Bring a drill if you have one.",
      },
    ],
  },
  {
    slug: "neighbour-rides",
    title: "Neighbour Rides to Appointments",
    short:
      "Volunteer drivers for hospital and clinic trips since the 14 bus was cut from North Hill.",
    lead: "Since the 14 bus was cut, getting from North Hill to an appointment at Calder General means two changes and an hour each way. Volunteer drivers fix that, if we cover the fuel, the insurance and someone to answer the phone.",
    cause: "elders",
    neighbourhood: "North Hill & Orchard Row",
    partner: "North Hill Surgery patient group",
    goal: 26000,
    raised: 12400,
    donors: 168,
    opened: "2026-07-01",
    closes: "2027-03-31",
    image: ridesImg,
    imageAlt: "An older man with a walking cane resting on a bench in the sun.",
    story: [
      "The patient group at North Hill Surgery counted the missed appointments in the six months after the route change. They went up by a third, almost all of them patients over 75.",
      "Thirty neighbours have already said they will drive. What they need is mileage paid, proper insurance, a background check, and a single phone number that people can ring without needing an app.",
      "The last milestone is a shared lease on a wheelchair-accessible car with the Surgery, so nobody is left off the list because of how they travel.",
    ],
    milestones: [
      { at: 5000, label: "Insurance for 30 volunteer drivers" },
      { at: 12000, label: "Mileage covered to March" },
      { at: 20000, label: "Booking line staffed on weekdays" },
      { at: 26000, label: "A wheelchair-accessible car on loan" },
    ],
    budget: [
      { label: "Volunteer mileage at 45¢ a mile", amount: 9600 },
      { label: "Booking line coordinator, part-time", amount: 7200 },
      { label: "Share of an accessible car lease", amount: 4800 },
      { label: "Driver insurance and background checks", amount: 4400 },
    ],
    impact: [
      { amount: 18, label: "covers one round trip to Calder General" },
      {
        amount: 45,
        label: "pays for one driver's background check and training",
      },
      { amount: 150, label: "insures one volunteer driver for a year" },
    ],
    updates: [
      {
        date: "2026-10-05",
        title: "One hundred rides",
        text: "The hundredth ride was Mr. Abiola's cataract follow-up. His driver waited, and they stopped for coffee.",
      },
      {
        date: "2026-08-12",
        title: "Insurance in place",
        text: "All thirty drivers are covered. The first rides went out the next morning.",
      },
    ],
  },
  {
    slug: "fix-it-library",
    title: "The Fix-It Library",
    short:
      "Three hundred tools and things to borrow with a library card, and a repair café to keep them going.",
    lead: "A household drill is used for about thirteen minutes in its whole life. We're stocking a shelf of 300 tools and things you can borrow with a library card, and a monthly repair café to keep them working.",
    cause: "spaces",
    neighbourhood: "Orchard Row",
    partner: "Orchard Row Library",
    goal: 12000,
    raised: 7310,
    donors: 96,
    opened: "2026-09-15",
    closes: "2026-12-31",
    image: fixItImg,
    imageAlt:
      "Two volunteers at a repair café table, one sharpening a blade, one checking it through a loupe.",
    story: [
      "The idea came from the repair café that already meets in the library basement on the first Sunday of the month. People kept asking whether they could just borrow the soldering iron.",
      "The library has room for a shelf, a barcode system that already works, and staff who are game. What it does not have is the tools: drills, ladders, a carpet cleaner, a pressure washer, a sewing machine, a tent.",
      "Every item is safety-tested before it goes on the shelf and after every tenth loan. The repair café volunteers do the testing, and they will show you how.",
    ],
    milestones: [
      { at: 3000, label: "Shelving and the lending system" },
      { at: 7000, label: "The first 150 tools" },
      { at: 10000, label: "Three hundred tools and things" },
      { at: 12000, label: "A year of repair cafés" },
    ],
    budget: [
      { label: "Tools and equipment", amount: 6400 },
      { label: "Shelving, tags and lending software", amount: 1900 },
      { label: "Repair café materials", amount: 1500 },
      { label: "Volunteer training", amount: 1300 },
      { label: "Electrical safety testing", amount: 900 },
    ],
    impact: [
      {
        amount: 15,
        label: "stocks the repair café's spare-parts drawer for a month",
      },
      { amount: 40, label: "puts a cordless drill on the shelf" },
      { amount: 120, label: "puts a carpet cleaner on the shelf" },
    ],
    updates: [
      {
        date: "2026-10-02",
        title: "Shelving is up",
        text: "Library staff have tested lending a stepladder to themselves. It went well.",
      },
    ],
  },
  {
    slug: "lantern-walk-2026",
    title: "The Lantern Walk 2026",
    short:
      "Sponsor a walker. Every dollar goes into the general fund that answers small grants within a week.",
    lead: "One night in November the whole town walks from Mill Street Green to the river with lanterns. Every walker is sponsored, and every dollar goes into the general fund that answers small grant requests within a week.",
    cause: "general",
    neighbourhood: "Mill Street Green to the river",
    partner: "Lantern, with 1,400 walkers",
    goal: 60000,
    raised: 21480,
    donors: 389,
    opened: "2026-09-01",
    closes: "2026-11-30",
    image: lanternsImg,
    imageAlt:
      "Walkers carrying lighthouse, monkey and jellyfish lanterns at dusk.",
    story: [
      "The first walk in 2011 was three hundred people and a borrowed brass band. Last year it was 1,380 walkers, eleven school groups, and a lantern shaped like the 14 bus.",
      "Money from the walk is unrestricted, which is the most useful kind. It pays for the small grants that never make a campaign: a deposit on a flat, a school uniform, a prescription, a fridge after a flood.",
      "Small grants are decided by a panel of five neighbours who meet every Thursday. The goal for this year is simple: answer every request within a week, all year round.",
    ],
    milestones: [
      { at: 15000, label: "Small grants open through winter" },
      { at: 30000, label: "Emergency fund for rent and bills" },
      { at: 45000, label: "A neighbourhood panel grants round" },
      { at: 60000, label: "Every request answered within a week, all year" },
    ],
    budget: [
      { label: "Small grants under $500", amount: 30000 },
      { label: "Emergency rent and bills fund", amount: 18000 },
      { label: "Neighbourhood panel grants round", amount: 9000 },
      { label: "Walk costs: permits, first aid, lights", amount: 3000 },
    ],
    impact: [
      { amount: 10, label: "lights one walker's lantern kit" },
      { amount: 50, label: "pays for one child's school uniform grant" },
      { amount: 250, label: "covers an emergency utility bill" },
    ],
    updates: [
      {
        date: "2026-10-15",
        title: "Eleven schools signed up",
        text: "The Flats Primary are making a lantern the size of a canoe. We have asked them to bring it on a trolley.",
      },
      {
        date: "2026-09-01",
        title: "Walker sign-up open",
        text: "Register at the window or at any of the lantern-making afternoons.",
      },
    ],
  },
];

/** The board in the shop window: the campaign the home page leads with. */
export const featuredSlug = "warm-homes";

/* ───────────────────────── Recent grants (home ledger) ───────────────────────── */

export const recentGrants: {
  date: string;
  to: string;
  what: string;
  cause: CauseId;
  amount: number;
}[] = [
  {
    date: "2026-10-16",
    to: "A family on Weir Road",
    what: "Replacement fridge after the basement flooded",
    cause: "general",
    amount: 420,
  },
  {
    date: "2026-10-15",
    to: "Flats Primary PTA",
    what: "Lantern-making materials for 90 pupils",
    cause: "children",
    amount: 310,
  },
  {
    date: "2026-10-13",
    to: "A household on Orchard Row",
    what: "Boiler safety check and two radiator valves",
    cause: "warmth",
    amount: 185,
  },
  {
    date: "2026-10-10",
    to: "Mill Street Pantry",
    what: "Cold room order deposit",
    cause: "food",
    amount: 7000,
  },
  {
    date: "2026-10-08",
    to: "North Hill driver rota",
    what: "September mileage for 22 drivers",
    cause: "elders",
    amount: 1146,
  },
  {
    date: "2026-10-06",
    to: "A student at Calder College",
    what: "Bus pass for the autumn term",
    cause: "general",
    amount: 160,
  },
  {
    date: "2026-10-02",
    to: "Orchard Row Library",
    what: "Lending shelving and barcode tags",
    cause: "spaces",
    amount: 1900,
  },
  {
    date: "2026-09-30",
    to: "A family in The Flats",
    what: "Two weeks' rent arrears after a lost shift",
    cause: "general",
    amount: 480,
  },
];

/* ───────────────────────── Events ───────────────────────── */

export type EventKind = "Fundraiser" | "Volunteer day" | "Workshop" | "Meeting";

export type LanternEvent = {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  time: string;
  place: string;
  address: string;
  cost: string;
  capacity: number;
  booked: number;
  campaign?: string;
  summary: string;
  body: string[];
  schedule: { time: string; what: string }[];
  bring: string[];
  access: string;
};

export const events: LanternEvent[] = [
  {
    id: "pantry-saturday-sort",
    title: "Saturday sort at the pantry",
    kind: "Volunteer day",
    date: "2026-10-24",
    time: "9:00 am – 12:00 pm",
    place: "Mill Street Pantry",
    address: "41 Mill Street, Calder Bend",
    cost: "Free",
    capacity: 16,
    booked: 11,
    campaign: "pantry-cold-room",
    summary:
      "Check dates, sort tins, pack 180 bags before the doors open at noon.",
    body: [
      "Saturday is the busiest morning of the pantry's week. The delivery from the regional food bank arrives at nine, and everything has to be date-checked, sorted and packed before the doors open at noon.",
      "No experience needed. Sam will show you the system in ten minutes, and there is always a job that suits you, standing or sitting.",
    ],
    schedule: [
      { time: "9:00", what: "Delivery in, quick briefing" },
      { time: "9:20", what: "Date checks and sorting" },
      { time: "10:45", what: "Packing household bags" },
      { time: "11:45", what: "Tidy down, tea" },
    ],
    bring: ["Closed-toe shoes", "Layers: the back room is cold"],
    access:
      "Step-free entrance from the yard on Tanner Lane. Seated sorting station available.",
  },
  {
    id: "quiz-night",
    title: "Quiz night for Warm Homes",
    kind: "Fundraiser",
    date: "2026-10-29",
    time: "7:00 pm – 10:00 pm",
    place: "The Ferryman",
    address: "2 Quay Lane, Calder Bend",
    cost: "$10 a player, teams up to six",
    capacity: 120,
    booked: 84,
    campaign: "warm-homes",
    summary:
      "Eight rounds, one picture round about Calder Bend, and every entry fee into the boiler fund.",
    body: [
      "Eight rounds, one of them entirely about Calder Bend, set by the reference librarians at Orchard Row, who are merciless.",
      "Every entry fee goes to Warm Homes, and The Ferryman is matching the bar take on the night up to $1,000.",
    ],
    schedule: [
      { time: "7:00", what: "Doors and team names" },
      { time: "7:30", what: "Rounds one to four" },
      { time: "8:30", what: "Interval and raffle" },
      { time: "8:50", what: "Rounds five to eight, results by ten" },
    ],
    bring: ["A team name you can say out loud", "Cash for the raffle"],
    access:
      "Ground floor, accessible toilet. Large-print answer sheets on request.",
  },
  {
    id: "riverside-build-day",
    title: "Riverside build day: the tool shed",
    kind: "Volunteer day",
    date: "2026-10-31",
    time: "10:00 am – 3:00 pm",
    place: "Riverside Garden",
    address: "Footbridge car park, River Road",
    cost: "Free, lunch provided",
    capacity: 25,
    booked: 25,
    campaign: "riverside-beds",
    summary:
      "Raise the tool shed and fit the water point. The last build day of the year.",
    body: [
      "The beds are in. This is the day the shed goes up and the water point gets connected, so that next spring nobody carries watering cans across the footbridge.",
      "Experienced hands lead each team. If you have never held a drill, this is a good place to start.",
    ],
    schedule: [
      { time: "10:00", what: "Safety briefing and teams" },
      { time: "10:20", what: "Shed base and frame" },
      { time: "12:30", what: "Soup from the allotment kitchen" },
      { time: "1:15", what: "Roof, doors and the water point" },
    ],
    bring: ["Work gloves", "A drill if you have one", "Boots"],
    access: "Level gravel site. Accessible portable toilet on site.",
  },
  {
    id: "repair-cafe",
    title: "Repair café",
    kind: "Workshop",
    date: "2026-11-01",
    time: "1:00 pm – 4:00 pm",
    place: "Orchard Row Library, basement",
    address: "7 Orchard Row, Calder Bend",
    cost: "Free, donations to the Fix-It Library",
    capacity: 40,
    booked: 17,
    campaign: "fix-it-library",
    summary:
      "Bring a broken lamp, a jacket with a dead zip, a bike with a sulk. Fixers do the rest, with you.",
    body: [
      "Fixers for electricals, textiles, bikes, small furniture and laptops. You sit with the fixer and learn what went wrong, so next time you might not need us.",
      "Booking holds a table slot; walk-ins are welcome when there is room.",
    ],
    schedule: [
      { time: "1:00", what: "Sign in and triage" },
      { time: "1:15", what: "Repair tables open" },
      { time: "3:45", what: "Last repairs, safety tests" },
    ],
    bring: [
      "The broken thing",
      "Any spare parts you have",
      "Its charger, if it has one",
    ],
    access: "Lift to the basement from the main lobby.",
  },
  {
    id: "lantern-making",
    title: "Lantern-making afternoon",
    kind: "Workshop",
    date: "2026-11-08",
    time: "2:00 pm – 4:30 pm",
    place: "Orchard Row Library hall",
    address: "7 Orchard Row, Calder Bend",
    cost: "$8 a lantern kit",
    capacity: 60,
    booked: 46,
    campaign: "lantern-walk-2026",
    summary:
      "Willow, tissue paper and an LED tea light. Make the lantern you'll carry on the walk.",
    body: [
      "Willow frames, coloured tissue, glue that washes out of clothes and an LED tea light that will not set fire to anyone's hair.",
      "Children under eight need a grown-up at the table. Kit fees go straight into the Lantern Walk fund.",
    ],
    schedule: [
      { time: "2:00", what: "Pick a frame: star, globe or the 14 bus" },
      { time: "2:20", what: "Bending, binding, gluing" },
      { time: "3:45", what: "Drying racks and juice" },
      { time: "4:15", what: "Lights on" },
    ],
    bring: ["Old clothes or an apron", "A bag to carry the lantern home"],
    access:
      "Step-free hall, low tables for wheelchair users and small children.",
  },
  {
    id: "lantern-walk",
    title: "The Lantern Walk",
    kind: "Fundraiser",
    date: "2026-11-14",
    time: "5:30 pm – 8:00 pm",
    place: "Mill Street Green to the footbridge",
    address: "Start: Mill Street Green, Calder Bend",
    cost: "Free to walk, sponsorship welcome",
    capacity: 1500,
    booked: 912,
    campaign: "lantern-walk-2026",
    summary:
      "1.4 miles from Mill Street Green to the river, with a brass band and 1,400 lanterns.",
    body: [
      "We gather on Mill Street Green at dusk, light up at 5:45 and walk the 1.4 miles down Mill Street, along Orchard Row and over the footbridge to Riverside Garden, where there is soup, a brass band and the board showing the night's total.",
      "Registering tells us how many marshals we need and sends you a sponsorship page. You can also just turn up.",
    ],
    schedule: [
      { time: "5:30", what: "Gather on Mill Street Green" },
      { time: "5:45", what: "Lights up" },
      { time: "6:00", what: "Walk sets off behind the band" },
      { time: "6:50", what: "Riverside Garden: soup, music, the board" },
    ],
    bring: [
      "A lantern, any lantern",
      "Warm layers",
      "A torch for the footbridge",
    ],
    access:
      "The whole route is step-free. A shorter 0.4-mile loop around the Green leaves at 6:00.",
  },
  {
    id: "coat-drive",
    title: "Winter coat sort",
    kind: "Volunteer day",
    date: "2026-11-21",
    time: "10:00 am – 2:00 pm",
    place: "Flats Community Centre",
    address: "18 Canal Street, Calder Bend",
    cost: "Free",
    capacity: 20,
    booked: 6,
    campaign: "warm-homes",
    summary:
      "Sort, size and hang 600 donated coats so families can choose on the following Saturday.",
    body: [
      "Coats come in all autumn. On this day they get checked, sized, labelled and hung on rails, so that the following Saturday families can come and choose rather than be handed something.",
      "Good for groups. Teenagers welcome with a grown-up.",
    ],
    schedule: [
      { time: "10:00", what: "Bags open, sorting by size" },
      { time: "11:30", what: "Checks: zips, buttons, stains" },
      { time: "12:30", what: "Rails and labels" },
    ],
    bring: ["Nothing but yourself"],
    access: "Step-free building with an accessible toilet.",
  },
  {
    id: "annual-meeting",
    title: "Open annual meeting",
    kind: "Meeting",
    date: "2026-12-02",
    time: "6:30 pm – 8:00 pm",
    place: "Calder Bend Library, Room 2",
    address: "1 Market Square, Calder Bend",
    cost: "Free, everyone welcome",
    capacity: 80,
    booked: 31,
    summary:
      "The year's accounts, every grant, and the trustees answering any question you bring.",
    body: [
      "We present the year's accounts line by line, read out the grants panel's decisions, and the trustees answer anything you bring. There is no question too small.",
      "Anyone can come. You do not need to be a donor, a member or a resident.",
    ],
    schedule: [
      { time: "6:30", what: "Accounts and auditor's note" },
      { time: "7:00", what: "The grants year, campaign by campaign" },
      { time: "7:20", what: "Your questions" },
      { time: "7:50", what: "Next year's priorities, by show of hands" },
    ],
    bring: ["Your questions"],
    access:
      "Hearing loop, step-free, BSL interpreter on request by 25 November.",
  },
];

export const eventKinds: EventKind[] = [
  "Fundraiser",
  "Volunteer day",
  "Workshop",
  "Meeting",
];

/* ───────────────────────── Volunteering ───────────────────────── */

export type Role = {
  id: string;
  title: string;
  where: string;
  when: string;
  commitment: string;
  needs: string;
  text: string;
};

export const roles: Role[] = [
  {
    id: "pantry",
    title: "Pantry sorter",
    where: "Mill Street Pantry",
    when: "Saturdays 9–12, or Tuesdays 4–7",
    commitment: "3 hours, as often as suits",
    needs: "Aged 16+, no checks needed",
    text: "Date checks, sorting and packing bags. Sociable, a little cold, never boring.",
  },
  {
    id: "driver",
    title: "Neighbour driver",
    where: "North Hill & Orchard Row",
    when: "Weekdays, you choose the slots",
    commitment: "2–4 trips a month",
    needs: "Clean licence, your own car, a background check we pay for",
    text: "Drive a neighbour to a hospital or clinic appointment and wait with them. Mileage paid at 45¢.",
  },
  {
    id: "homework",
    title: "Homework helper",
    where: "Flats Community Centre",
    when: "Mon–Fri, 3:30–5:30 pm",
    commitment: "One evening a week, school terms",
    needs: "Aged 18+, background check, a patient streak",
    text: "Sit with two or three children, hear reading, untangle fractions. No teaching qualification needed.",
  },
  {
    id: "warmth",
    title: "Warm Homes visitor",
    where: "Across Calder Bend",
    when: "Weekday daytimes",
    commitment: "Two visits a month",
    needs: "Background check, two-hour training",
    text: "Visit older neighbours on the Warm Homes list, check the thermometer, and notice what else might help.",
  },
  {
    id: "fixer",
    title: "Repair café fixer",
    where: "Orchard Row Library",
    when: "First Sunday of the month, 1–4 pm",
    commitment: "One afternoon a month",
    needs: "A skill: sewing, electrics, bikes, woodwork or laptops",
    text: "Mend things with their owners watching, and test the Fix-It Library's tools after every tenth loan.",
  },
  {
    id: "garden",
    title: "Garden keeper",
    where: "Riverside Garden",
    when: "Wednesday evenings or Saturday mornings",
    commitment: "Two hours a week, spring to autumn",
    needs: "Any age, any fitness",
    text: "Keep the shared beds, the compost and the water point in order, and welcome new bed-holders.",
  },
  {
    id: "marshal",
    title: "Lantern Walk marshal",
    where: "Mill Street to the river",
    when: "Saturday 14 November, 4:30–8:30 pm",
    commitment: "One night, plus a 30-minute briefing",
    needs: "Aged 16+, comfortable on your feet",
    text: "Hold a corner, keep the walk moving, point people to the soup. Hi-vis and a head torch provided.",
  },
];

export const availabilityDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
export const availabilitySlots = ["Morning", "Afternoon", "Evening"] as const;

export const volunteerSteps = [
  {
    title: "You tell us what suits",
    text: "Pick a role and the times you can do. It takes three minutes.",
  },
  {
    title: "Priya calls you within a week",
    text: "A ten-minute chat, not an interview. We match you to a shift or a neighbour.",
  },
  {
    title: "A first shift with a buddy",
    text: "You never start alone. Checks and training are paid for by Lantern.",
  },
];

/* ───────────────────────── Reports ───────────────────────── */

export type YearReport = {
  year: number;
  income: { label: string; amount: number }[];
  spend: { label: string; amount: number }[];
  byCause: { cause: CauseId; amount: number }[];
  highlights: string[];
  grants: { date: string; to: string; cause: CauseId; amount: number }[];
  auditor: string;
};

export const reports: YearReport[] = [
  {
    year: 2025,
    income: [
      { label: "Individual gifts", amount: 228400 },
      { label: "The Lantern Walk", amount: 96300 },
      { label: "Local businesses", amount: 41900 },
      { label: "Foundation grants", amount: 38000 },
      { label: "Events and other", amount: 8000 },
    ],
    spend: [
      { label: "Grants and programmes", amount: 334500 },
      { label: "Running costs", amount: 43800 },
      { label: "Fundraising", amount: 19900 },
    ],
    byCause: [
      { cause: "food", amount: 92300 },
      { cause: "warmth", amount: 81600 },
      { cause: "children", amount: 58400 },
      { cause: "elders", amount: 47900 },
      { cause: "general", amount: 32600 },
      { cause: "spaces", amount: 21700 },
    ],
    highlights: [
      "The neighbours' panel answered 214 small-grant requests, the median in four days.",
      "Mill Street Pantry served 9,360 household bags, up 18% on 2024.",
      "Homework Club ran 72 nights with 26 volunteer tutors.",
    ],
    grants: [
      {
        date: "2025-12-04",
        to: "Mill Street Pantry",
        cause: "food",
        amount: 24000,
      },
      {
        date: "2025-11-20",
        to: "Small grants panel, Q4",
        cause: "general",
        amount: 9800,
      },
      {
        date: "2025-10-15",
        to: "Heating Co-op, winter repairs",
        cause: "warmth",
        amount: 31500,
      },
      {
        date: "2025-09-02",
        to: "Flats Community Centre",
        cause: "children",
        amount: 18200,
      },
      {
        date: "2025-06-18",
        to: "North Hill Surgery patient group",
        cause: "elders",
        amount: 12600,
      },
      {
        date: "2025-04-09",
        to: "Riverside Allotment Society",
        cause: "spaces",
        amount: 6400,
      },
      {
        date: "2025-02-11",
        to: "Heating Co-op, emergency heaters",
        cause: "warmth",
        amount: 8300,
      },
    ],
    auditor:
      "Independently examined by Hale & Ostrow CPAs (fictional), June 2026. No matters to report.",
  },
  {
    year: 2024,
    income: [
      { label: "Individual gifts", amount: 191300 },
      { label: "The Lantern Walk", amount: 82700 },
      { label: "Local businesses", amount: 36400 },
      { label: "Foundation grants", amount: 34000 },
      { label: "Events and other", amount: 6800 },
    ],
    spend: [
      { label: "Grants and programmes", amount: 286300 },
      { label: "Running costs", amount: 39700 },
      { label: "Fundraising", amount: 18900 },
    ],
    byCause: [
      { cause: "food", amount: 80100 },
      { cause: "warmth", amount: 64900 },
      { cause: "children", amount: 51200 },
      { cause: "elders", amount: 41800 },
      { cause: "spaces", amount: 24500 },
      { cause: "general", amount: 23800 },
    ],
    highlights: [
      "The first Open Books year: every grant published within a month.",
      "Thirty-one homes draught-proofed before December.",
      "The Lantern Walk passed 1,300 walkers for the first time.",
    ],
    grants: [
      {
        date: "2024-12-10",
        to: "Mill Street Pantry",
        cause: "food",
        amount: 21000,
      },
      {
        date: "2024-11-05",
        to: "Heating Co-op, winter repairs",
        cause: "warmth",
        amount: 27400,
      },
      {
        date: "2024-09-12",
        to: "Flats Community Centre",
        cause: "children",
        amount: 16500,
      },
      {
        date: "2024-07-01",
        to: "Orchard Row Library",
        cause: "spaces",
        amount: 4800,
      },
      {
        date: "2024-05-22",
        to: "North Hill Surgery patient group",
        cause: "elders",
        amount: 9900,
      },
      {
        date: "2024-03-14",
        to: "Small grants panel, Q1",
        cause: "general",
        amount: 6200,
      },
    ],
    auditor:
      "Independently examined by Hale & Ostrow CPAs (fictional), May 2025. No matters to report.",
  },
  {
    year: 2023,
    income: [
      { label: "Individual gifts", amount: 162500 },
      { label: "The Lantern Walk", amount: 71200 },
      { label: "Foundation grants", amount: 30000 },
      { label: "Local businesses", amount: 29700 },
      { label: "Events and other", amount: 5000 },
    ],
    spend: [
      { label: "Grants and programmes", amount: 239200 },
      { label: "Running costs", amount: 34900 },
      { label: "Fundraising", amount: 17600 },
    ],
    byCause: [
      { cause: "food", amount: 71400 },
      { cause: "warmth", amount: 52300 },
      { cause: "children", amount: 44800 },
      { cause: "elders", amount: 33900 },
      { cause: "general", amount: 18600 },
      { cause: "spaces", amount: 18200 },
    ],
    highlights: [
      "Homework Club opened with four tutors and a box of pencils.",
      "The neighbours' panel moved from monthly to weekly meetings.",
      "The window board was repainted for the first time since 2009.",
    ],
    grants: [
      {
        date: "2023-12-01",
        to: "Mill Street Pantry",
        cause: "food",
        amount: 18600,
      },
      {
        date: "2023-10-20",
        to: "Heating Co-op, winter repairs",
        cause: "warmth",
        amount: 22100,
      },
      {
        date: "2023-09-04",
        to: "Flats Community Centre",
        cause: "children",
        amount: 9800,
      },
      {
        date: "2023-06-15",
        to: "North Hill Surgery patient group",
        cause: "elders",
        amount: 7400,
      },
      {
        date: "2023-04-03",
        to: "Riverside Allotment Society",
        cause: "spaces",
        amount: 3900,
      },
      {
        date: "2023-02-08",
        to: "Small grants panel, Q1",
        cause: "general",
        amount: 4100,
      },
    ],
    auditor:
      "Independently examined by Hale & Ostrow CPAs (fictional), June 2024. No matters to report.",
  },
];

export const policies = [
  {
    title: "Restricted gifts stay restricted",
    text: "Money given to a campaign is spent on that campaign. If a campaign overshoots, we write to you before moving a cent.",
  },
  {
    title: "Every grant over $100 is published",
    text: "Within a month, on this site and on the board in the window. Individuals are never named.",
  },
  {
    title: "Fundraising costs capped at 6%",
    text: "We hold ourselves to it in the accounts and say so at the annual meeting when we miss.",
  },
];

/* ───────────────────────── About ───────────────────────── */

export const about = {
  image: volunteersImg,
  imageAlt: "Volunteers in a community garden tending young plants in pots.",
  intro:
    "Lantern is the community fund for Calder Bend's five neighbourhoods: Mill Street, Riverside, North Hill, Orchard Row and The Flats. We raise money in small amounts from a lot of people, and we give it out quickly, close to home, and in public.",
  story: [
    "In the winter of 2009 the boiler at Mill Street Hall failed, and the hardware shop next door painted a thermometer in its window to raise the $4,200 to replace it. It took nineteen days. People walked past to watch the red line climb.",
    "The shop closed in 2014. We took over the lease, kept the window, and kept painting the board. It still shows the campaign that needs it most, updated every Saturday morning by whoever is on the rota.",
  ],
  timeline: [
    {
      year: "2009",
      text: "A painted thermometer in the hardware shop window raises $4,200 for the Mill Street Hall boiler.",
    },
    {
      year: "2011",
      text: "The first Lantern Walk: 300 people and a borrowed brass band.",
    },
    {
      year: "2014",
      text: "Lantern takes over the shop at 112 Mill Street and keeps the window.",
    },
    {
      year: "2016",
      text: "Registered as a nonprofit. The first paid member of staff, three days a week.",
    },
    {
      year: "2019",
      text: "Small grants handed to a panel of five neighbours, rotating every year.",
    },
    {
      year: "2024",
      text: "Open Books: every grant over $100 published within a month.",
    },
  ],
  staff: [
    {
      name: "Ruth Okafor",
      role: "Director",
      note: "Ran the pantry for six years before she ran the fund.",
    },
    {
      name: "Tomás Reyes",
      role: "Campaigns & grants",
      note: "Paints the board on Saturdays. Steady hand.",
    },
    {
      name: "Priya Natarajan",
      role: "Volunteers",
      note: "Will find you the right shift. Calls everyone back.",
    },
    {
      name: "Dale Whitcombe",
      role: "Finance, two days a week",
      note: "Keeps the open books open.",
    },
  ],
  trustees: [
    {
      name: "Margaret Lindqvist",
      role: "Chair",
      note: "Orchard Row, retired district nurse",
    },
    {
      name: "Kwame Asante",
      role: "Treasurer",
      note: "North Hill, runs the hardware co-op",
    },
    {
      name: "Elena Marchetti",
      role: "Trustee",
      note: "Riverside, allotment society secretary",
    },
    { name: "Jordan Pike", role: "Trustee", note: "The Flats, youth worker" },
    {
      name: "Hannah Brooks",
      role: "Trustee",
      note: "Mill Street, primary school teacher",
    },
  ],
  panel:
    "The small-grants panel is five residents, one from each neighbourhood, chosen by lot from volunteers each January. They meet every Thursday evening and can say yes to anything under $500 on the spot.",
};

/* ───────────────────────── Donate ───────────────────────── */

export const donate = {
  presets: [15, 35, 60, 120, 250],
  monthlyPresets: [8, 15, 25, 50, 100],
  general: "Where it's needed most",
  promise:
    "Lantern is a registered nonprofit, so your gift is tax-deductible. Receipts arrive by email the same day and once a year as a summary.",
  faq: [
    {
      q: "What happens if a campaign raises more than its goal?",
      a: "We stop asking, tell everyone who gave, and move anything over the goal into the general fund only after writing to you. You can ask for it back.",
    },
    {
      q: "Can I give without my name on the board?",
      a: "Yes. Tick 'Keep me off the board' and you appear as 'A neighbour'. Your name is never shared outside Lantern.",
    },
    {
      q: "How do I change or stop a monthly gift?",
      a: "Reply to any receipt, ring the window, or come in. It takes one sentence and nobody will try to talk you out of it.",
    },
    {
      q: "Can I give cash or a cheque?",
      a: "Bring it to 112 Mill Street, Tuesday to Saturday, 10 am to 4 pm. We count it in front of you and give you a receipt.",
    },
    {
      q: "Is my gift tax-deductible?",
      a: "Yes, in full, within the limits of US tax law. Your receipt shows our registration number.",
    },
  ],
};

export const homeCopy = {
  heroTitle: "Small lights, carried together.",
  heroText:
    "Lantern is Calder Bend's community fund. Neighbours give a little, a panel of neighbours gives it out within a week, and every dollar goes up on the board in our window.",
  waysTitle: "Can't give money? Give an evening.",
  waysText:
    "Most of what Lantern does runs on people, not dollars. Seven roles, most of them a few hours a month.",
  ledgerTitle: "Last month on the board",
  ledgerText:
    "Every grant over $100 is published here and in the window within a month. Individuals are never named.",
  quote: {
    text: "I got the bed by the water tap. My knees haven't let me garden since the hill plots, and now I'm out there four mornings a week arguing with the slugs.",
    who: "Doreen, 81, bed 14 at Riverside",
  },
  monthlyTitle: "Give monthly, and we can plan.",
  monthlyText:
    "A one-off gift fixes a boiler. A monthly gift lets us promise the Homework Club it will open in September. Eight dollars a month is where most people start.",
  closeTitle: "There's a lantern with your name on it.",
  closeText: "Give once, give monthly, or come and carry one on 14 November.",
  campaignsTitle: "Seven campaigns, one window",
  campaignsText:
    "Each campaign has a goal, a deadline and a list of what the money buys. When it is met, we stop asking.",
  splitTitle: "Eighty-four cents of every dollar leaves as a grant.",
  splitText:
    "The rest of each dollar kept the window open and paid for the walk. The full accounts, every grant and the examiner's note are on the reports page.",
  walkText:
    "Every walker is sponsored, and every dollar goes into the fund that answers small grants within a week.",
  walkFacts: [
    "Gather at 5:30 pm on Mill Street Green",
    "Step-free the whole way",
    "Soup and the night's total at the river",
  ],
};

export const pagesCopy = {
  campaigns: {
    title: "Open campaigns",
    text: "Every campaign is something a neighbour asked for, costed to the dollar and checked by the grants panel. Pick one, or give to the general fund and let the panel decide.",
    generalTitle: "Can't choose? The general fund decides weekly.",
    generalText:
      "Unrestricted gifts go to the small-grants panel: five neighbours who meet every Thursday and can say yes to anything under $500 on the spot.",
  },
  donate: {
    title: "Give to Lantern",
    text: "Three short steps. Choose where your gift goes, or leave it to the panel. Either way it shows up on the board in the window by Saturday.",
    demoNote:
      "This is a demo: no card is charged and nothing leaves your browser.",
  },
  events: {
    title: "Events",
    text: "Fundraisers, volunteer mornings, workshops and the meeting where we read out the accounts. Most are free, all are step-free.",
    hostTitle: "Hosting something for Lantern?",
    hostText:
      "Bake sales, sponsored swims and quiz nights all count. Tell us and we'll put it on this page and lend you a collection tin.",
    hostEmail: "events@lantern.example",
  },
  volunteer: {
    title: "Give an evening, not just a dollar",
    text: "Lantern runs on about 240 volunteers. Most give a few hours a month. Pick a role, tick the times that suit, and Priya will find you a first shift with a buddy.",
    demoNote: "Demo form: nothing is sent or stored.",
    coordinator: {
      name: "Priya Natarajan, volunteers",
      email: "volunteer@lantern.example",
      note: "Rather talk it through first? Priya answers the volunteer line Tuesday to Friday, and rings back the same day.",
    },
  },
  reports: {
    title: "Reports & open books",
    text: "Every dollar in, every dollar out, and every grant over $100, published within a month. If a number here raises a question, ask it at the annual meeting.",
    policiesTitle: "The rules we hold ourselves to",
    askTitle: "Prefer it on paper?",
    askText:
      "We print fifty copies of each annual report. Ask and one goes in the post, or pick it up from the window.",
  },
  about: {
    title: "The town's own fund",
    storyTitle: "It started with a painted thermometer",
    timelineTitle: "Since 2009",
    panelTitle: "Neighbours decide where the money goes",
    staffTitle: "Staff",
    trusteesTitle: "Trustees",
    visitTitle: "Come to the window",
    visitText:
      "Drop in to give cash, borrow a collection tin, ask about a grant, or just see the board up close.",
  },
};
