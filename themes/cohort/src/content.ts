import halyardImg from "./assets/halyard.jpg";
import fieldnoteImg from "./assets/fieldnote.jpg";
import fieldnoteFarmerImg from "./assets/fieldnote-farmer.jpg";
import brightworkImg from "./assets/brightwork.jpg";
import assaylineImg from "./assets/assayline.jpg";
import kestrelImg from "./assets/kestrel.jpg";
import silicaImg from "./assets/silica-lane.jpg";
import ardentImg from "./assets/ardent-rail.jpg";
import metricImg from "./assets/metric-rule.jpg";
import tandemImg from "./assets/tandem.jpg";
import wagewellImg from "./assets/wagewell.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Cohort",
  sector: "Venture capital",
  tagline: "First checks for the industrial middle.",
  email: "hello@cohort.example",
  pitchEmail: "pitch@cohort.example",
  phone: "+1 555 0148 220",
  offices: [
    {
      city: "Pittsburgh",
      address: "2100 Smallman Street, Floor 3, Pittsburgh, PA 15222",
    },
    { city: "Rotterdam", address: "Wilhelminakade 91, 3072 AP Rotterdam" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "Substack", href: "https://substack.com/" },
  ],
};

export const nav = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/thesis", label: "Thesis" },
  { to: "/team", label: "Team" },
  { to: "/writing", label: "Writing" },
  { to: "/founders", label: "For founders" },
];

/* ───────────────────────── Domains ───────────────────────── */

export type DomainId = "energy" | "freight" | "making" | "care";

export type Domain = {
  id: DomainId;
  name: string;
  line: string;
  body: string;
  lookFor: string[];
  passOn: string;
};

export const domains: Domain[] = [
  {
    id: "energy",
    name: "Energy & land",
    line: "The grid we already have, and the acres it runs across.",
    body: "Most of the power plants, substations and farmland that will exist in 2040 exist today. We back the companies that measure them, maintain them and squeeze another twenty years out of them, rather than the ones waiting for a greenfield that never gets permitted.",
    lookFor: [
      "Measurement that a utility or co-op will pay for before regulation forces them to",
      "Hardware with a service contract attached, not a one-off sale",
      "Founders who have stood in a substation yard in January",
    ],
    passOn: "Science projects that need a policy change to have a market.",
  },
  {
    id: "freight",
    name: "Freight & ports",
    line: "Every box, railcar and berth window between the factory and the shelf.",
    body: "Freight still runs on phone calls, PDFs and the memory of one dispatcher who never takes a holiday. The mid-size ports, short-line railroads and regional carriers that move most of it are too small for enterprise vendors and too big for spreadsheets. That gap is the market.",
    lookFor: [
      "Software sold to operators, not to the shippers who complain about them",
      "A wedge that pays for itself inside one season",
      "Data that compounds across customers without crossing their competitive lines",
    ],
    passOn: "Another digital freight broker.",
  },
  {
    id: "making",
    name: "Manufacturing",
    line: "Job shops, foundries and the people who run the machines.",
    body: "Forty thousand small manufacturers build the parts inside everything else. They are profitable, under-served and suspicious of software for good reason. We back founders who have run a shop floor, who sell to the owner and not the IT department, and who treat the machinist as the user.",
    lookFor: [
      "Products a shop can switch on in a week without a consultant",
      "Workforce businesses that pay apprentices from the first day",
      "Capacity the country is short of: packaging, inspection, precision finishing",
    ],
    passOn: "Robotics demos without a customer who has paid for a second unit.",
  },
  {
    id: "care",
    name: "Care & wages",
    line: "The clinics, labs and payrolls that working people actually touch.",
    body: "Regional hospitals and seasonal employers are where healthcare and money are hardest to deliver and easiest to get wrong. We back companies that make a lab result arrive the same day or a paycheck arrive the same week, and that earn their margin from the institution, never from the worker's mistake.",
    lookFor: [
      "Revenue from the institution, not fees on the person",
      "Clinical or payroll operators on the founding team",
      "A path to the second customer type before the Series A",
    ],
    passOn: "Consumer fintech that profits from overdrafts by another name.",
  },
];

export const domainById = (id: DomainId) => domains.find((d) => d.id === id)!;

/* ───────────────────────── Portfolio ───────────────────────── */

export type Round = {
  round: string;
  date: string;
  amount: number;
  role: "Led" | "Co-led" | "Participated";
};

export type Company = {
  slug: string;
  name: string;
  line: string;
  domain: DomainId;
  stage: "Seed" | "Series A" | "Series B";
  status: "Active" | "Acquired";
  classOf: number;
  hq: string;
  founded: number;
  founders: string[];
  people: number;
  partner: string;
  image: string;
  imageAlt: string;
  gallery?: { src: string; alt: string };
  about: string[];
  memo: string;
  quote: { text: string; by: string };
  rounds: Round[];
  outcome?: string;
};

export const companies: Company[] = [
  {
    slug: "kestrel-works",
    name: "Kestrel Works",
    line: "Vibration monitoring that keeps older turbines running safely.",
    domain: "energy",
    stage: "Seed",
    status: "Active",
    classOf: 2026,
    hq: "Charlotte, North Carolina",
    founded: 2025,
    founders: ["Tomasz Wierzbicki", "Grace Oduya"],
    people: 9,
    partner: "daniel-okafor",
    image: kestrelImg,
    imageAlt:
      "A retired steam turbine rotor with its rows of blades exposed, displayed outdoors on a steel stand.",
    about: [
      "The average steam turbine in an American power plant is 38 years old. Most of them are inspected on a calendar, not on their condition, which means a rotor is either opened too early at great cost or too late at greater cost.",
      "Kestrel Works clamps a sensor package to the bearing housings in an afternoon, learns the machine's normal over six weeks and flags the bearing wear, blade cracking and misalignment patterns that precede a forced outage. Plants pay per machine per year; the first contract was signed before the second prototype was built.",
    ],
    memo: "Tomasz spent nine years as the outage engineer people called at 3 a.m. Grace wrote the vibration models for a turbine OEM's service division. They are not guessing at the problem. The market is every plant that will not be replaced before 2040, which is nearly all of them.",
    quote: {
      text: "Daniel asked to see the sensor on a real bearing before he asked to see the spreadsheet. That told us what kind of partner he'd be.",
      by: "Grace Oduya, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2026-03", amount: 3_800_000, role: "Led" },
    ],
  },
  {
    slug: "tandem",
    name: "Tandem",
    line: "Paid apprenticeships that turn new hires into CNC machinists in 26 weeks.",
    domain: "making",
    stage: "Seed",
    status: "Active",
    classOf: 2026,
    hq: "Milwaukee, Wisconsin",
    founded: 2025,
    founders: ["Jordan Pike", "Ana Lucía Restrepo"],
    people: 12,
    partner: "helene-marchetti",
    image: tandemImg,
    imageAlt:
      "A machinist in work gloves and a cap checks a cast aluminium part beside a machining centre.",
    about: [
      "Small manufacturers turn down work because they cannot find people to run the machines. The community-college pipeline is slow and the shops are too small to train on their own.",
      "Tandem hires apprentices directly, pays them from day one, trains them on the shop's own machines with a Tandem instructor on site, and transfers the employee to the shop at week 26. Shops pay a monthly placement fee for the duration; apprentices never pay anything.",
    ],
    memo: "Jordan ran second shift at a 60-person aerospace shop and lost four trainees in a year to a warehouse paying a dollar more. Ana Lucía built the credentialing programme at a state workforce board. Every shop we called asked when they could start.",
    quote: {
      text: "Hélène had been on a shop floor before she met us. She asked about the coolant smell on our first call.",
      by: "Jordan Pike, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2026-08", amount: 2_600_000, role: "Led" },
    ],
  },
  {
    slug: "metric-and-rule",
    name: "Metric & Rule",
    line: "Inspection as a service: metrology labs inside industrial parks.",
    domain: "making",
    stage: "Seed",
    status: "Active",
    classOf: 2026,
    hq: "Dayton, Ohio",
    founded: 2025,
    founders: ["Hannah Osei", "Rafael Duarte"],
    people: 11,
    partner: "margit-oyelaran",
    image: metricImg,
    imageAlt:
      "A technician watches a coordinate measuring machine probe a machined steel part, with the measurement shown on a monitor.",
    about: [
      "Aerospace and medical customers require first-article inspection reports that most small shops cannot produce. A coordinate measuring machine costs a quarter of a million dollars and needs a trained operator who sits idle half the week.",
      "Metric & Rule opens shared, climate-controlled inspection rooms inside industrial parks, with same-day turnaround for parts dropped off before noon and reports formatted to each prime contractor's requirements.",
    ],
    memo: "Hannah was the quality manager who signed the reports; Rafael ran a lab of six machines for a tier-one supplier. Their first room was profitable in its fourth month. The model is a franchise of rooms, each one underwritten by the shops within a fifteen-minute drive.",
    quote: {
      text: "Margit knew what a first-article report was, which put her ahead of every other investor we met that spring.",
      by: "Hannah Osei, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2026-06", amount: 3_000_000, role: "Led" },
    ],
  },
  {
    slug: "fieldnote",
    name: "Fieldnote",
    line: "Soil-carbon measurement farmers can afford, priced per acre.",
    domain: "energy",
    stage: "Seed",
    status: "Active",
    classOf: 2025,
    hq: "Des Moines, Iowa",
    founded: 2024,
    founders: ["Ruth Amankwah", "Peder Lindqvist"],
    people: 14,
    partner: "daniel-okafor",
    image: fieldnoteImg,
    imageAlt:
      "Freshly tilled furrows of dark soil running toward a tree line under a clear sky.",
    gallery: {
      src: fieldnoteFarmerImg,
      alt: "A farmer in a cap leans on a rusted gate at the edge of a green pasture.",
    },
    about: [
      "Carbon programmes pay farmers for changing practice, but only if the change can be measured. Lab sampling costs more per acre than most programmes pay, so the farmers who would benefit most never enrol.",
      "Fieldnote pairs a cheap probe pulled behind any utility vehicle with satellite history and a calibrated model, bringing verified measurement under a dollar an acre. Grain cooperatives buy it on behalf of their members.",
    ],
    memo: "Ruth grew up on a 900-acre corn and soy operation and spent six years as a soil scientist at a land-grant university. Peder built remote-sensing pipelines for crop insurers. The buyer is the co-op, which already has the trust and the trucks.",
    quote: {
      text: "Cohort signed the term sheet eight days after our first meeting, and then sent Daniel to a field day in the rain.",
      by: "Ruth Amankwah, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2025-02", amount: 4_500_000, role: "Led" },
    ],
  },
  {
    slug: "silica-lane",
    name: "Silica Lane",
    line: "Small-batch advanced packaging for chip designers who cannot wait for a slot.",
    domain: "making",
    stage: "Series A",
    status: "Active",
    classOf: 2025,
    hq: "Albany, New York",
    founded: 2023,
    founders: ["Mei-Lin Zhou", "Arjun Rao", "Ben Castellanos"],
    people: 31,
    partner: "margit-oyelaran",
    image: silicaImg,
    imageAlt:
      "Close-up of a silicon wafer, its grid of dies throwing off rainbow interference colours.",
    about: [
      "Chip startups can get a design taped out in months and then wait most of a year for an advanced-packaging slot at a large house that prioritises its biggest customers.",
      "Silica Lane runs a small-batch packaging line in a refurbished cleanroom, taking runs of 25 to 2,000 units with a six-week turnaround. Its engineers sit with the customer's designers before the run, not after it fails.",
    ],
    memo: "Mei-Lin and Arjun ran packaging process development at a large foundry; Ben bought the cleanroom out of a bankruptcy for less than the price of one tool. Capacity is sold out through next spring.",
    quote: {
      text: "When the bonder failed in month two, Margit drove up with the name of a field engineer who had retired from the vendor. He fixed it in a day.",
      by: "Mei-Lin Zhou, chief executive",
    },
    rounds: [
      { round: "Seed", date: "2025-01", amount: 4_000_000, role: "Led" },
      {
        round: "Series A",
        date: "2026-08",
        amount: 21_000_000,
        role: "Participated",
      },
    ],
  },
  {
    slug: "assayline",
    name: "Assayline",
    line: "Same-day pathogen panels for regional hospitals.",
    domain: "care",
    stage: "Series A",
    status: "Active",
    classOf: 2024,
    hq: "Columbus, Ohio",
    founded: 2022,
    founders: ["Dr. Amara Nwosu", "Felix Brandt"],
    people: 46,
    partner: "priya-venkataraman",
    image: assaylineImg,
    imageAlt:
      "A gloved hand drawing a sample with a pipette above a red rack of test tubes.",
    about: [
      "A rural hospital that sends a sepsis panel to a reference lab waits two to three days for the result, and treats with broad-spectrum antibiotics in the meantime.",
      "Assayline places a compact molecular analyser in the hospital's own lab, supplies the cartridges and runs the quality programme remotely. Results arrive in under four hours. Hospitals pay per test, with no capital purchase.",
    ],
    memo: "Amara ran the microbiology lab at a 200-bed hospital and kept a list of every patient who had been treated blind while a result was in the post. Felix had brought two diagnostic devices through clearance. Priya knew the list was real because she had kept one too.",
    quote: {
      text: "Priya read our validation data before our deck. She's the only investor who has asked me about cartridge shelf life.",
      by: "Dr. Amara Nwosu, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2024-01", amount: 5_000_000, role: "Co-led" },
      { round: "Series A", date: "2025-07", amount: 18_000_000, role: "Led" },
    ],
  },
  {
    slug: "halyard",
    name: "Halyard",
    line: "Berth and yard scheduling for mid-size container ports.",
    domain: "freight",
    stage: "Series A",
    status: "Active",
    classOf: 2023,
    hq: "Norfolk, Virginia",
    founded: 2022,
    founders: ["Inés Barragán", "Kwame Sarfo"],
    people: 38,
    partner: "thomas-achterberg",
    image: halyardImg,
    imageAlt:
      "Green ship-to-shore cranes working a red container ship alongside a quay, hills behind.",
    about: [
      "A mid-size port plans its berths on a whiteboard and its yard in a spreadsheet, and every late vessel ripples through both for days. The enterprise terminal systems are built for the twenty largest ports in the world and priced accordingly.",
      "Halyard replans berth windows, crane splits and yard stacking every fifteen minutes from live AIS positions and gate data. Planners keep the final say. Customers report fewer re-handles and shorter truck turn times inside the first season.",
    ],
    memo: "Inés was a berth planner for eleven years; Kwame built optimisation software for an airline's crew scheduling. Thomas planned terminals in Rotterdam before he ever invested in one. The wedge is the planner's day, and the expansion is everything the yard touches.",
    quote: {
      text: "Thomas still asks to see the berth plan before the revenue chart. It keeps us honest about who the product is for.",
      by: "Inés Barragán, chief executive",
    },
    rounds: [
      { round: "Seed", date: "2023-04", amount: 3_200_000, role: "Led" },
      {
        round: "Series A",
        date: "2025-09",
        amount: 14_000_000,
        role: "Co-led",
      },
    ],
  },
  {
    slug: "wagewell",
    name: "Wagewell",
    line: "Payroll and same-week pay for seasonal farm crews.",
    domain: "care",
    stage: "Series A",
    status: "Active",
    classOf: 2022,
    hq: "Fresno, California",
    founded: 2021,
    founders: ["Marisol Ortega", "Devon Clarke"],
    people: 57,
    partner: "helene-marchetti",
    image: wagewellImg,
    imageAlt:
      "A wooden bushel basket filled with freshly dug sweet potatoes on the ground of a field.",
    about: [
      "Seasonal agricultural crews are paid by the piece, by the hour and by the bin, often through labour contractors, often late and often wrong. Mainstream payroll software cannot model a piece rate that changes by field and by day.",
      "Wagewell captures piece counts on a supervisor's phone in the field, calculates pay with the right overtime and rest-break rules, and pays crews within the week, by card or account. Growers and contractors pay per worker per pay period; workers pay nothing.",
    ],
    memo: "Marisol's parents were crew leaders; she spent a decade in agricultural payroll compliance. Devon built payment rails at a regional bank. They charge the employer, not the worker, which is the whole thesis in one sentence.",
    quote: {
      text: "Hélène wrote into our term sheet that we can never charge a worker a fee. We had planned to ask for that clause ourselves.",
      by: "Marisol Ortega, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2022-02", amount: 3_000_000, role: "Led" },
      {
        round: "Series A",
        date: "2024-03",
        amount: 16_000_000,
        role: "Co-led",
      },
    ],
  },
  {
    slug: "brightwork",
    name: "Brightwork",
    line: "The operating system for job shops: quoting, scheduling and traceability.",
    domain: "making",
    stage: "Series B",
    status: "Active",
    classOf: 2021,
    hq: "Pittsburgh, Pennsylvania",
    founded: 2020,
    founders: ["Dana Kowalczyk", "Luis Ferreira-Hahn"],
    people: 112,
    partner: "margit-oyelaran",
    image: brightworkImg,
    imageAlt:
      "A long machine shop with lathes and mills in rows, tool carts and a wooden workbench in the foreground.",
    about: [
      "A typical job shop quotes from a spreadsheet, schedules on a whiteboard and tracks material certificates in a filing cabinet. Every one of those is where margin leaks out.",
      "Brightwork reads a customer's drawing, suggests a quote from the shop's own history, schedules the job across real machine capacity and keeps the material certificates attached to the part from purchase order to shipment. More than 900 shops run on it.",
    ],
    memo: "Dana ran her family's 40-person shop for eight years before she wrote a line of code. Our first cheque was the first one Brightwork took; we have been in every round since.",
    quote: {
      text: "Margit has sat in on more of our customer visits than any board member has a right to. She usually notices the thing we missed.",
      by: "Dana Kowalczyk, chief executive",
    },
    rounds: [
      { round: "Seed", date: "2021-03", amount: 2_500_000, role: "Led" },
      { round: "Series A", date: "2022-06", amount: 11_000_000, role: "Led" },
      {
        round: "Series B",
        date: "2024-04",
        amount: 38_000_000,
        role: "Participated",
      },
    ],
  },
  {
    slug: "ardent-rail",
    name: "Ardent Rail",
    line: "Booking and car-hire settlement for short-line railroads.",
    domain: "freight",
    stage: "Series A",
    status: "Acquired",
    classOf: 2019,
    hq: "Kansas City, Missouri",
    founded: 2018,
    founders: ["Colm Brennan", "Yetunde Bakare"],
    people: 64,
    partner: "thomas-achterberg",
    image: ardentImg,
    imageAlt:
      "A rail yard at night seen from above, platform lights tracing the lines of track toward the town.",
    about: [
      "America's six hundred short-line railroads handle the first and last mile of one car in five, and settle car-hire charges with the large railroads by spreadsheet and fax.",
      "Ardent Rail gave short lines a booking portal for shippers and automated car-hire settlement, recovering revenue most of them did not know they were owed.",
    ],
    memo: "Colm was a short-line general manager; Yetunde was the railroad's only software engineer. Ardent was our first freight investment and the reason the freight practice exists.",
    quote: {
      text: "When the acquisition offer came, Thomas's first question was what it meant for the forty railroads on the platform.",
      by: "Colm Brennan, co-founder",
    },
    rounds: [
      { round: "Seed", date: "2019-06", amount: 2_000_000, role: "Led" },
      { round: "Series A", date: "2020-10", amount: 9_000_000, role: "Led" },
    ],
    outcome:
      "Acquired in May 2024 by a North American freight logistics group. The product still runs under its own name.",
  },
];

export const companyBySlug = (slug: string) =>
  companies.find((c) => c.slug === slug);

/* ───────────────────────── People ───────────────────────── */

export type Partner = {
  slug: string;
  name: string;
  role: string;
  focus: DomainId[];
  based: string;
  joined: number;
  bio: string[];
  before: string;
  pitchMe: string;
  email: string;
};

export const partners: Partner[] = [
  {
    slug: "margit-oyelaran",
    name: "Margit Oyelaran",
    role: "Founding partner",
    focus: ["making"],
    based: "Pittsburgh",
    joined: 2014,
    before:
      "Eleven years running operations at a contract manufacturer, the last four as chief operating officer.",
    bio: [
      "Margit started Cohort in 2014 after a decade on factory floors convinced her that the companies building the physical economy were being ignored by the people who fund software. She leads the manufacturing practice and sits on the boards of Brightwork, Silica Lane and Metric & Rule.",
      "She reads every first-article inspection report she is sent, keeps a running list of retired field engineers who will take a call, and is the reason Cohort's term sheet is one page long.",
    ],
    pitchMe:
      "Show me a customer who has paid twice. Tell me what breaks when your volume triples. I'd rather visit your shop than see a slide of it.",
    email: "margit@cohort.example",
  },
  {
    slug: "thomas-achterberg",
    name: "Thomas Achterberg",
    role: "Founding partner",
    focus: ["freight"],
    based: "Rotterdam",
    joined: 2014,
    before:
      "Terminal planning engineer at the Port of Rotterdam, then founder of a yard-planning software company sold in 2012.",
    bio: [
      "Thomas co-founded Cohort with Margit and runs the Rotterdam office. He has planned container terminals, built software for them and sold that software, which gives him unusually specific opinions about crane splits.",
      "He led the firm's first freight investment, Ardent Rail, and sits on the board of Halyard. He answers email faster than anyone at the firm and expects the same from nobody.",
    ],
    pitchMe:
      "Tell me who in the operation will use it at 6 a.m. and what they do today instead. If your buyer is the shipper, I'm probably the wrong partner.",
    email: "thomas@cohort.example",
  },
  {
    slug: "priya-venkataraman",
    name: "Priya Venkataraman",
    role: "Partner",
    focus: ["care"],
    based: "Pittsburgh",
    joined: 2019,
    before:
      "Clinical laboratory director at a regional hospital system for nine years.",
    bio: [
      "Priya leads healthcare at Cohort. Before investing she ran clinical laboratories across six hospitals, which is how she learned that most of healthcare's bottlenecks live between departments, not inside them.",
      "She sits on the board of Assayline and advises founders on clinical validation, reimbursement and how to sell to a hospital that has said no to everyone else.",
    ],
    pitchMe:
      "Bring your validation data and the name of the clinician who will champion you. I'm less interested in the platform story than in the first department that buys.",
    email: "priya@cohort.example",
  },
  {
    slug: "daniel-okafor",
    name: "Daniel Okafor",
    role: "Partner",
    focus: ["energy"],
    based: "Pittsburgh",
    joined: 2020,
    before:
      "Transmission planner at a regional utility, then head of grid partnerships at an energy-storage developer.",
    bio: [
      "Daniel leads energy and land. He spent his early career planning transmission upgrades and learned that the grid changes one interconnection study at a time.",
      "He sits on the boards of Kestrel Works and Fieldnote, and writes the firm's occasional notes on interconnection queues, which are more popular than they have any right to be.",
    ],
    pitchMe:
      "Tell me who signs the purchase order at the utility or co-op and how long it took them last time. Hardware is fine. Waiting for a regulation is not a plan.",
    email: "daniel@cohort.example",
  },
  {
    slug: "helene-marchetti",
    name: "Hélène Marchetti",
    role: "Partner",
    focus: ["care", "making"],
    based: "Rotterdam",
    joined: 2021,
    before:
      "Payments product lead at a European bank, then operating partner at a workforce-training fund.",
    bio: [
      "Hélène invests where work and money meet: payroll, wages, training and the systems that decide when people get paid. She sits on the boards of Wagewell and Tandem.",
      "She is the author of the clause in Cohort's term sheets that forbids portfolio companies from charging fees to the workers they serve, and she will tell you why at length.",
    ],
    pitchMe:
      "Show me who pays and who benefits. If they're the same person and that person earns an hourly wage, explain why that's fair.",
    email: "helene@cohort.example",
  },
  {
    slug: "sam-whitlock",
    name: "Sam Whitlock",
    role: "Principal, founder operations",
    focus: ["freight", "energy"],
    based: "Pittsburgh",
    joined: 2022,
    before:
      "First operations hire at Ardent Rail, through its Series A and acquisition.",
    bio: [
      "Sam runs founder operations: first hires, first enterprise contracts, the board pack nobody wants to write. He was the first operations hire at Ardent Rail, so he has been on the receiving end of everything Cohort does.",
      "He sources freight and energy companies alongside Thomas and Daniel, and is usually the first person a new founder meets.",
    ],
    pitchMe:
      "Send me the deck and the one-line version you'd say to a dispatcher. I reply to every pitch within ten working days, including the ones that are a no.",
    email: "sam@cohort.example",
  },
];

export const partnerBySlug = (slug: string) =>
  partners.find((p) => p.slug === slug);

export const staff = [
  { name: "Odile Fournier", role: "Chief financial officer" },
  { name: "Marcus Bell", role: "Head of talent" },
  { name: "Yuki Andersen", role: "Platform associate, Rotterdam" },
  { name: "Renée Castillo", role: "Office and events" },
];

export const funds = [
  {
    name: "Fund I",
    year: 2014,
    size: 40_000_000,
    companies: 18,
    note: "Fully realised",
  },
  {
    name: "Fund II",
    year: 2017,
    size: 95_000_000,
    companies: 22,
    note: "Harvesting",
  },
  {
    name: "Fund III",
    year: 2021,
    size: 180_000_000,
    companies: 26,
    note: "Reserves only",
  },
  {
    name: "Fund IV",
    year: 2025,
    size: 240_000_000,
    companies: 9,
    note: "Investing now",
  },
];

export const firmStory = [
  "Cohort was founded in Pittsburgh in 2014 by Margit Oyelaran and Thomas Achterberg, an operator and an engineer who had both spent their careers inside industries that venture capital preferred to describe rather than fund.",
  "The name comes from how we invest: a small class of companies each year, about a dozen, backed by partners who have done the job the company is selling into. We lead or co-lead seed and Series A rounds, write first checks between $750,000 and $4 million, and reserve enough to keep our ownership through the Series B.",
  "We have two offices, both a short walk from water that still carries freight. Our limited partners are mostly university endowments, foundations and the families of people who built manufacturing businesses. They are patient, which lets us be.",
];

/* ───────────────────────── Thesis ───────────────────────── */

export const thesis = {
  title:
    "The industrial middle is where the next decade of compounding companies will come from.",
  intro: [
    "Venture capital spent fifteen years funding software for people who sit at desks. The companies that move freight, generate power, machine parts, run labs and pay hourly wages got the leftovers: enterprise vendors priced for the Fortune 500, or nothing at all.",
    "That gap is our thesis. The industrial middle — firms with fifty to five thousand employees, in towns that rarely appear in funding announcements — is large, profitable, under-served and ready to buy. What it is not ready to do is be sold to by someone who has never done the work.",
  ],
  beliefs: [
    {
      title: "Operators make the best founders here",
      body: "Our best companies were started by people who held the job their product now serves. We will back an operator learning to build software before a software builder learning the industry.",
    },
    {
      title: "Boring buyers are good buyers",
      body: "A co-op, a port authority or a regional hospital takes longer to sign and longer to leave. We fund the patience that the first contract demands, because the tenth contract is cheap.",
    },
    {
      title: "Hardware is allowed",
      body: "Physical products with service revenue attached are some of the most defensible businesses we know. We have the reserves and the stomach for a bill of materials.",
    },
    {
      title: "Never charge the worker",
      body: "If a company serves hourly workers, its revenue comes from the institution. We write it into the term sheet.",
    },
  ],
  questions: [
    {
      domain: "energy" as DomainId,
      text: "Who will inspect the 80,000 distribution transformers that reach end of life before 2035?",
    },
    {
      domain: "freight" as DomainId,
      text: "What does dispatch software look like for a 40-truck regional carrier that still runs on a whiteboard?",
    },
    {
      domain: "making" as DomainId,
      text: "Can heat treatment, plating and anodising be booked the way a job shop books freight?",
    },
    {
      domain: "care" as DomainId,
      text: "How does a rural clinic get a specialist read in hours without a telehealth contract it cannot afford?",
    },
    {
      domain: "care" as DomainId,
      text: "What is payroll for crews paid in cash today, built so the worker keeps every dollar?",
    },
    {
      domain: "freight" as DomainId,
      text: "Who builds the booking layer for inland river barges?",
    },
  ],
};

/* ───────────────────────── For founders ───────────────────────── */

export const terms = [
  { term: "First check", value: "$750,000 – $4,000,000" },
  { term: "Stage", value: "Seed and Series A; we lead or co-lead" },
  { term: "Liquidation preference", value: "1× non-participating, always" },
  { term: "Board", value: "One seat at Series A, none at seed unless you ask" },
  {
    term: "Pro rata",
    value: "We take ours and will waive it for a strategic investor",
  },
  {
    term: "Option pool",
    value: "Sized from your hiring plan, not a round number",
  },
  {
    term: "Worker fees",
    value: "Prohibited for companies serving hourly workers",
  },
  { term: "Term sheet length", value: "One page" },
];

export const process = [
  {
    day: "Day 0",
    title: "You send the deck",
    body: "Through the pitch form or a warm introduction; they're read with equal care. A partner reads every submission.",
  },
  {
    day: "Day 3",
    title: "First conversation",
    body: "Forty-five minutes with the partner closest to your industry. We'll ask about your customers before your market size.",
  },
  {
    day: "Day 7",
    title: "We come to you",
    body: "A site visit, a customer call or both. If you have a shop floor, a lab or a yard, we want to stand in it.",
  },
  {
    day: "Day 10",
    title: "Partner meeting and answer",
    body: "You present to all partners on Monday. You get a yes with a one-page term sheet, or a no with our reasons, the same day.",
  },
];

export const faqs = [
  {
    q: "Do I need a warm introduction?",
    a: "No. About a third of our investments came through the pitch form. A partner reads every one, and Sam replies to every pitch within ten working days, including the ones that are a no.",
  },
  {
    q: "What do you need to see at seed?",
    a: "One customer who has paid, or a signed pilot with a price attached, and a founding team that includes someone who has done the job your product serves. Revenue is helpful; it is not required.",
  },
  {
    q: "Will you invest before we have a product?",
    a: "Sometimes, for operators we already know. Most of our seed investments have a working prototype in a customer's hands.",
  },
  {
    q: "Do you invest outside the United States and the Netherlands?",
    a: "Yes, across North America and Europe, as long as a partner can reach your customers in a day's travel.",
  },
  {
    q: "How much do you reserve for follow-on rounds?",
    a: "Roughly one dollar for every dollar of the first check, which usually lets us keep our ownership through the Series B.",
  },
  {
    q: "What happens if you pass?",
    a: "You get our reasons in writing, and an offer to look again when the thing we were worried about has changed. Several portfolio companies were a no the first time.",
  },
  {
    q: "Do you take board seats at seed?",
    a: "Not unless you ask. We take one seat at Series A and prefer an independent director alongside it.",
  },
  {
    q: "How do you treat confidential material?",
    a: "We do not sign NDAs at the first meeting, and we do not share decks outside the partnership. If your edge is a secret, tell us that it exists rather than what it is.",
  },
];

/* ───────────────────────── Writing ───────────────────────── */

export type Block = { kind: "p" | "h" | "quote"; text: string };

export type Essay = {
  slug: string;
  title: string;
  dek: string;
  author: string;
  date: string;
  topic: "Founders" | "Markets" | "Letters";
  minutes: number;
  body: Block[];
};

export const essays: Essay[] = [
  {
    slug: "annual-letter-2026",
    title: "Letter to our founders, 2026",
    dek: "What the class of 2026 taught us, what we got wrong last year, and why we are writing smaller checks on purpose.",
    author: "margit-oyelaran",
    date: "2026-09-29",
    topic: "Letters",
    minutes: 9,
    body: [
      {
        kind: "p",
        text: "Every September we write to the founders we have backed and to the ones we hope to. It is the one document of the year that the whole partnership edits, which is why it is late every year.",
      },
      {
        kind: "p",
        text: "This year's class is three companies so far: Kestrel Works, Metric & Rule and Tandem. All three were started by people who had done the job their product serves for more than eight years. That was not a filter we applied. It is simply who showed up with a customer already paying.",
      },
      { kind: "h", text: "What we got wrong" },
      {
        kind: "p",
        text: "Last year we told two founders that their market was too small. One of them has since signed the largest port authority on the Gulf Coast. We were measuring the market by the number of buyers; she was measuring it by the number of things each buyer needed. She was right, and we have changed how we size freight markets as a result.",
      },
      {
        kind: "p",
        text: "We also took too long to answer three pitches in the spring. Our promise is ten working days. We missed it by as much as a month while Fund IV was closing. Sam now owns the inbox and a public count of days, and we have not missed since July.",
      },
      {
        kind: "quote",
        text: "The best seed rounds we see this year are smaller than last year's, and the companies behind them are further along.",
      },
      { kind: "h", text: "Why smaller checks" },
      {
        kind: "p",
        text: "The median seed round in our sectors grew by forty percent between 2021 and 2024. The companies did not need it. An industrial company that raises six million dollars before its second customer tends to hire a sales team before it has a sales process, and then spends the Series A unwinding that.",
      },
      {
        kind: "p",
        text: "We would rather write a check of two and a half million, reserve the rest, and add to it when the second and third customers make the case for us. Several founders in this class asked for exactly that structure before we proposed it.",
      },
      { kind: "h", text: "What stays the same" },
      {
        kind: "p",
        text: "The term sheet is still one page. The preference is still one times, non-participating. We still will not let a company charge fees to the hourly workers it serves. And we still answer every pitch, which is the promise we care most about keeping.",
      },
    ],
  },
  {
    slug: "one-page-term-sheet",
    title: "The term sheet should fit on one page",
    dek: "Every clause beyond the economics and the board is a negotiation the founder pays for twice. Here is ours, line by line.",
    author: "thomas-achterberg",
    date: "2026-06-12",
    topic: "Founders",
    minutes: 7,
    body: [
      {
        kind: "p",
        text: "A venture term sheet has two jobs: to set the price and to set the governance. Everything else is either standard, in which case it belongs in the long-form documents, or unusual, in which case the founder deserves to see it in plain language before signing anything.",
      },
      {
        kind: "p",
        text: "Our term sheet is one page because we decided in 2014 that we would never ask for anything unusual. It has eleven lines. The two that matter most are the liquidation preference, which is always one times and non-participating, and the board, which at seed is nobody unless the founder asks.",
      },
      { kind: "h", text: "The lines we left out" },
      {
        kind: "p",
        text: "There is no participating preference, no cumulative dividend, no full-ratchet anti-dilution and no redemption right. Each of them protects an investor against outcomes that a good investor should simply decline to fund.",
      },
      {
        kind: "quote",
        text: "A clause a founder needs a lawyer to explain is a clause the founder will pay a lawyer to negotiate.",
      },
      {
        kind: "p",
        text: "There is also no exclusivity period. If another firm offers better terms during the week we spend on documents, we would like to know, and we would like the chance to match them in the open.",
      },
      { kind: "h", text: "The line we added" },
      {
        kind: "p",
        text: "Companies that serve hourly workers agree never to charge those workers a fee. It is the only unusual clause we ask for, and it is in the founder's favour as often as ours: the companies that agreed to it have grown faster than those that did not have to.",
      },
    ],
  },
  {
    slug: "ports-are-software-companies",
    title: "Mid-size ports are software buyers that nobody has called",
    dek: "The world's top twenty terminals have every system money can buy. The next five hundred have a whiteboard and a planner who never takes leave.",
    author: "thomas-achterberg",
    date: "2026-03-03",
    topic: "Markets",
    minutes: 6,
    body: [
      {
        kind: "p",
        text: "I spent the first decade of my career planning berths at one of the largest container terminals in Europe. We had optimisation software, a team to tune it and a vendor on call. When I visited smaller ports afterwards, I found planners doing the same job with a magnetic board and a phone.",
      },
      {
        kind: "p",
        text: "There are roughly five hundred container terminals in the world handling between two hundred thousand and two million boxes a year. They are too small for the enterprise terminal systems and too complex for anything else. Most of them have never been visited by a software salesperson who understood a crane split.",
      },
      { kind: "h", text: "Why now" },
      {
        kind: "p",
        text: "Two things changed. Vessel position data became cheap and reliable enough to plan from, and the planners who ran these ports on memory began to retire. A terminal cannot hire a replacement with thirty years of tacit knowledge. It can buy software that learns its patterns.",
      },
      {
        kind: "quote",
        text: "Sell to the planner's day, and the rest of the terminal will follow.",
      },
      {
        kind: "p",
        text: "Halyard sold its first contract on exactly that premise. The wedge was the berth plan; the expansion was the yard, the gate and eventually billing. We expect more companies to take the same path into rail yards, inland barge terminals and the distribution centres behind them.",
      },
    ],
  },
  {
    slug: "what-a-seed-round-should-buy",
    title: "What a seed round should buy",
    dek: "Not a sales team. Not an office. Eighteen months of proof that a second and third customer will pay what the first one did.",
    author: "sam-whitlock",
    date: "2025-11-18",
    topic: "Founders",
    minutes: 6,
    body: [
      {
        kind: "p",
        text: "The most common mistake I see in industrial startups is spending the seed round as if it were a Series A. The company hires an account executive, signs an office lease and buys a booth at the trade show before anyone can explain why customer number two bought.",
      },
      {
        kind: "p",
        text: "A seed round in our sectors should buy one thing: repeatable evidence. That means the second and third customers, at a price close to the first, with an onboarding that did not require the founder to be on site for a month.",
      },
      { kind: "h", text: "A budget that works" },
      {
        kind: "p",
        text: "For most of our seed companies that looks like four to eight engineers, one person who has done the customer's job, and a founder who still sells every deal. Use our round modeller to see what the dilution looks like at different sizes, then ask whether the extra money buys proof or just time.",
      },
      {
        kind: "quote",
        text: "If you can't name the customer the next million dollars is for, you don't need it yet.",
      },
      {
        kind: "p",
        text: "None of this is a rule. Silica Lane needed a cleanroom on day one. But the burden of proof is on the bigger round, not the smaller one.",
      },
    ],
  },
  {
    slug: "interconnection-queues",
    title: "The second grid is already built",
    dek: "Two terawatts are waiting in interconnection queues. Meanwhile the existing grid is ageing in place, and that is where the near-term money is.",
    author: "daniel-okafor",
    date: "2025-08-07",
    topic: "Markets",
    minutes: 8,
    body: [
      {
        kind: "p",
        text: "Most of the excitement in energy investing is about what will be connected to the grid. Most of the work in energy over the next decade will be keeping what is already connected from failing.",
      },
      {
        kind: "p",
        text: "The median American power transformer is more than forty years old. Steam turbines, substations and distribution lines were built in a single post-war wave and are now reaching the end of their design lives together. Utilities cannot replace them all at once, so they must decide which ones to replace first.",
      },
      { kind: "h", text: "Measurement is the wedge" },
      {
        kind: "p",
        text: "Deciding what to replace first is a measurement problem. The companies that can tell a utility which asset will fail next, cheaply and credibly, sell into a budget that already exists and a regulator who already approves it.",
      },
      {
        kind: "quote",
        text: "The best energy companies we see are selling certainty about old equipment, not promises about new equipment.",
      },
      {
        kind: "p",
        text: "Kestrel Works is our first bet on that idea. It will not be our last. We are especially interested in distribution transformers, underground cable and the protection relays that nobody has looked at since they were installed.",
      },
    ],
  },
  {
    slug: "reading-the-shop-floor",
    title: "Why we still read the shop floor",
    dek: "A machine shop tells you more in an hour than a data room does in a week. What we look at when we visit.",
    author: "margit-oyelaran",
    date: "2025-04-22",
    topic: "Markets",
    minutes: 5,
    body: [
      {
        kind: "p",
        text: "When we look at a manufacturing software company, we ask to visit two of its customers. Not to check references. To read the floor.",
      },
      {
        kind: "p",
        text: "A shop that runs well has quiet aisles, labelled material and a whiteboard nobody has updated in a month because the schedule lives somewhere better. A shop that runs badly has a supervisor walking very fast with a stack of travellers.",
      },
      { kind: "h", text: "What we look for" },
      {
        kind: "p",
        text: "Whether the machinists open the software themselves or wait for the office to print it. Whether the owner can tell you this month's on-time delivery without looking it up. Whether anyone has written instructions on a sticky note and taped it to the screen, which tells you exactly where the product is failing.",
      },
      {
        kind: "quote",
        text: "The sticky note on the monitor is the most honest product review in manufacturing.",
      },
      {
        kind: "p",
        text: "Founders sometimes worry that a visit is a test. It is closer to the opposite. It is the hour in the process where we learn the most and the founder has to prepare the least.",
      },
    ],
  },
];

export const essayBySlug = (slug: string) =>
  essays.find((e) => e.slug === slug);

/* ───────────────────────── Home ───────────────────────── */

export const home = {
  title: "First checks for the industrial middle.",
  lede: "Cohort is a seed and Series A venture firm for companies that move freight, keep the grid running, make things and pay the people who do. We lead rounds of $750,000 to $4 million, and every partner has done the job before.",
  recordNote: "These announcements appear as a matter of record only.",
  testimonial: {
    text: "Every investor we met asked about our market. Cohort asked about our second customer, then drove four hours to meet him.",
    by: "Dana Kowalczyk",
    role: "Chief executive, Brightwork",
  },
  closeTitle: "Building something the physical economy runs on?",
  closeBody:
    "Send us the deck. A partner reads every pitch, and you will hear back within ten working days either way.",
};

/* ───────────────────────── Round modeller ───────────────────────── */

export const modellerDefaults = {
  preMoney: 12_000_000,
  raise: 3_000_000,
  poolTarget: 10,
  cohortShare: 70,
  capTable: { founders: 82, angels: 12, pool: 6 },
};

export const footerNote =
  "Cohort is a fictional brand — a Cento template by Koative.";
