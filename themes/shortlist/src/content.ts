import fernhillLab from "./assets/fernhill-lab.jpg";
import ovenDough from "./assets/oven-street-dough.jpg";
import ovenTeam from "./assets/oven-street-team.jpg";
import trussShop from "./assets/truss-grain-shop.jpg";
import brightworkRoof from "./assets/brightwork-roof.jpg";
import marrowKitchen from "./assets/marrow-kitchen.jpg";
import northboundYard from "./assets/northbound-yard.jpg";
import plainfieldTeam from "./assets/plainfield-team.jpg";
import eastbankRoom from "./assets/eastbank-reading-room.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Shortlist",
  sector: "Job board",
  tagline: "Fewer, better jobs. Every one shows the pay.",
  email: "hello@shortlist.example",
  employersEmail: "employers@shortlist.example",
  phone: "+1 555 0148 220",
  phoneHref: "tel:+15550148220",
  address: ["Shortlist", "410 Commerce Street, Suite 6", "Portland, OR 97209"],
  hours: "Desk staffed Mon–Fri, 9 am – 5 pm Pacific",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Bluesky", href: "https://bsky.app/" },
  ],
};

export const nav = [
  { to: "/jobs", label: "Find jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/salaries", label: "Salary guide" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Looking for work",
    links: [
      { to: "/jobs", label: "Find jobs" },
      { to: "/companies", label: "Companies hiring" },
      { to: "/salaries", label: "Salary guide" },
      { to: "/shortlist", label: "Your shortlist" },
    ],
  },
  {
    title: "Hiring",
    links: [
      { to: "/post", label: "Post a job" },
      { to: "/companies", label: "Company pages" },
      { to: "/salaries", label: "Pay benchmarks" },
    ],
  },
  {
    title: "Shortlist",
    links: [
      { to: "/", label: "Today’s column" },
      { to: "/about", label: "About & house rules" },
    ],
  },
];

export const newsletter = {
  title: "The Monday column",
  text: "Every Monday at 7 am: the week’s new listings in your trade, salaries first. Nothing else.",
};

/* ------------------------------------------------------------ taxonomy */

export type Workplace = "On-site" | "Hybrid" | "Remote";
export type JobType = "Full-time" | "Part-time" | "Contract";
export type Level = "Entry" | "Mid" | "Senior" | "Lead";

export const workplaces: Workplace[] = ["On-site", "Hybrid", "Remote"];
export const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract"];
export const levels: Level[] = ["Entry", "Mid", "Senior", "Lead"];

export const categories = [
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "data-science", label: "Data & science" },
  { id: "operations", label: "Operations" },
  { id: "trades", label: "Skilled trades" },
  { id: "food", label: "Food & drink" },
  { id: "sales-support", label: "Sales & support" },
  { id: "public", label: "Libraries & public service" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const cities = [
  "Remote (US)",
  "Portland",
  "Chicago",
  "Philadelphia",
  "Denver",
  "Austin",
  "Columbus",
] as const;
export type City = (typeof cities)[number];

/* ------------------------------------------------------------ salary guide */

/** National mid-level median base pay (USD) per role; the guide scales it by city and level. Illustrative figures. */
export type SalaryRole = {
  id: string;
  label: string;
  category: CategoryId;
  median: number;
};

export const salaryRoles: SalaryRole[] = [
  {
    id: "backend-engineer",
    label: "Backend engineer",
    category: "engineering",
    median: 138000,
  },
  {
    id: "support-engineer",
    label: "Support engineer",
    category: "sales-support",
    median: 76000,
  },
  {
    id: "product-designer",
    label: "Product designer",
    category: "design",
    median: 118000,
  },
  {
    id: "product-manager",
    label: "Product manager",
    category: "product",
    median: 132000,
  },
  {
    id: "data-analyst",
    label: "Data analyst",
    category: "data-science",
    median: 86000,
  },
  {
    id: "research-associate",
    label: "Research associate",
    category: "data-science",
    median: 66000,
  },
  {
    id: "operations-manager",
    label: "Operations manager",
    category: "operations",
    median: 82000,
  },
  {
    id: "warehouse-supervisor",
    label: "Warehouse supervisor",
    category: "operations",
    median: 58000,
  },
  {
    id: "cabinetmaker",
    label: "Cabinetmaker",
    category: "trades",
    median: 54000,
  },
  {
    id: "cnc-programmer",
    label: "CNC programmer",
    category: "trades",
    median: 66000,
  },
  {
    id: "solar-installer",
    label: "Solar installer",
    category: "trades",
    median: 54000,
  },
  {
    id: "energy-advisor",
    label: "Energy advisor (sales)",
    category: "sales-support",
    median: 62000,
  },
  { id: "chef", label: "Sous chef", category: "food", median: 58000 },
  { id: "baker", label: "Baker", category: "food", median: 46000 },
  { id: "librarian", label: "Librarian", category: "public", median: 64000 },
  {
    id: "digital-coordinator",
    label: "Digital services coordinator",
    category: "public",
    median: 58000,
  },
];

export const cityFactor: Record<City, number> = {
  "Remote (US)": 1,
  Portland: 1.01,
  Chicago: 1.05,
  Philadelphia: 1.03,
  Denver: 1.02,
  Austin: 0.99,
  Columbus: 0.92,
};

export const levelFactor: Record<Level, number> = {
  Entry: 0.78,
  Mid: 1,
  Senior: 1.22,
  Lead: 1.42,
};

/** Percentile spread around the median. */
export const spread = { p10: 0.78, p25: 0.89, p50: 1, p75: 1.13, p90: 1.29 };

export const salaryGuide = {
  title: "The salary guide",
  intro:
    "Base pay for sixteen roles we list most often, scaled by city and level. Pick a role, then type in an offer to see where it lands.",
  method: [
    "Figures start from the advertised ranges on Shortlist over the last twelve months, then get checked against the offers candidates report back to us after they accept.",
    "We show base pay only. Bonus, commission and equity vary too much between employers to fold into one number honestly, so they appear on the listing itself.",
    "Remote (US) means a role open anywhere in the country with one national pay band. Some employers adjust by location; their listings say so.",
  ],
  note: "Every figure in this guide is sample data for the template.",
};

/* ------------------------------------------------------------ companies */

export type Company = {
  slug: string;
  name: string;
  industry: string;
  size: string;
  founded: number;
  hq: City;
  image: string;
  imageAlt: string;
  mark: {
    shape: "circle" | "square" | "arch" | "diamond";
    bg: string;
    fg: string;
  };
  tagline: string;
  about: string[];
  perks: string[];
  replyDays: number;
  quote: { text: string; by: string; role: string };
  offices: string[];
};

export const companies: Company[] = [
  {
    slug: "plainfield",
    name: "Plainfield Software",
    industry: "Software",
    size: "60–80 people",
    founded: 2016,
    hq: "Chicago",
    image: plainfieldTeam,
    imageAlt:
      "Four people around a shared table working on laptops, mugs and chargers between them.",
    mark: { shape: "square", bg: "#1f3a5f", fg: "#f5f3ee" },
    tagline:
      "Scheduling software for clinics that still run on paper calendars.",
    about: [
      "Plainfield builds appointment and rota software for small medical and dental practices — places with four chairs, two receptionists and a wall calendar nobody trusts.",
      "The team is half in a converted print shop in Chicago’s West Loop and half spread across the country. Everyone writes; decisions happen in documents, not meetings.",
    ],
    perks: [
      "Four-day week in August",
      "$2,000 yearly learning budget",
      "Health, dental and vision fully covered",
      "16 weeks paid parental leave",
    ],
    replyDays: 5,
    quote: {
      text: "We list salaries because we got tired of interviewing people for six weeks only to lose them on the number.",
      by: "Renata Ivers",
      role: "Head of People",
    },
    offices: ["Chicago, West Loop", "Remote across the US"],
  },
  {
    slug: "fernhill-bio",
    name: "Fernhill Bio",
    industry: "Biotechnology",
    size: "120–150 people",
    founded: 2014,
    hq: "Philadelphia",
    image: fernhillLab,
    imageAlt:
      "A bright laboratory with analyzers along one wall and scientists in blue gowns at the benches.",
    mark: { shape: "circle", bg: "#2f6b4f", fg: "#f5f3ee" },
    tagline: "Diagnostic assays for rare metabolic disorders in newborns.",
    about: [
      "Fernhill develops the blood tests that screen newborns for metabolic disorders most hospitals only check for when something has already gone wrong.",
      "The lab runs two shifts in a former textile mill by the Schuylkill. Bench scientists rotate onto assay design every quarter, so nobody runs the same plate for three years.",
    ],
    perks: [
      "Tuition support up to $6,000 a year",
      "Paid conference travel",
      "On-site gym and showers",
      "401(k) with 5% match",
    ],
    replyDays: 8,
    quote: {
      text: "The best people we hired came from outside biotech. A clear salary on the listing is what got them to apply.",
      by: "Dr. Osei Mensah",
      role: "VP, Assay Development",
    },
    offices: ["Philadelphia, Manayunk"],
  },
  {
    slug: "oven-street",
    name: "Oven Street Bakery",
    industry: "Food & drink",
    size: "45 people, 3 bakeries",
    founded: 2011,
    hq: "Portland",
    image: ovenDough,
    imageAlt:
      "A baker’s floured hands kneading a ball of dough on a wooden bench.",
    mark: { shape: "arch", bg: "#b5542b", fg: "#f5f3ee" },
    tagline:
      "Naturally leavened bread, baked overnight for three Portland neighbourhoods.",
    about: [
      "Oven Street started as one deck oven behind a laundromat on Alberta Street. It now bakes 2,400 loaves a night across three bakeries and supplies forty restaurants.",
      "Night shifts are paid a $3 an hour differential, schedules are posted four weeks ahead, and nobody works more than five nights in a row.",
    ],
    perks: [
      "Schedules posted 4 weeks ahead",
      "$3/hr night differential",
      "Free bread, obviously",
      "Health cover from day 30",
    ],
    replyDays: 4,
    quote: {
      text: "Bakers read the listing at 3 am on their phones. If the pay isn’t in the first line, they keep scrolling.",
      by: "Maya Lindqvist",
      role: "Co-owner",
    },
    offices: ["Alberta Street", "Division Street", "Sellwood"],
  },
  {
    slug: "truss-grain",
    name: "Truss & Grain",
    industry: "Furniture making",
    size: "28 people",
    founded: 2009,
    hq: "Denver",
    image: trussShop,
    imageAlt:
      "A carpentry workshop with table saws, stacked timber and parts racks under factory windows.",
    mark: { shape: "diamond", bg: "#5b4a2e", fg: "#f5f3ee" },
    tagline:
      "Solid-wood cabinetry and library shelving, built to order in Denver.",
    about: [
      "Truss & Grain builds kitchens, libraries and built-ins from North American hardwoods, one commission at a time, in a 14,000 sq ft shop in RiNo.",
      "Apprentices are paired with a senior maker for their first year. Every finished piece is signed on the underside by the people who built it.",
    ],
    perks: [
      "Paid apprenticeship track",
      "Tool allowance $1,200 a year",
      "Shop closes at 3 pm Fridays",
      "Profit share every December",
    ],
    replyDays: 6,
    quote: {
      text: "We hire for patience. A good cabinetmaker would rather measure three times than explain a gap.",
      by: "Luis Echeverría",
      role: "Shop foreman",
    },
    offices: ["Denver, RiNo"],
  },
  {
    slug: "brightwork-solar",
    name: "Brightwork Solar",
    industry: "Clean energy",
    size: "90 people",
    founded: 2017,
    hq: "Austin",
    image: brightworkRoof,
    imageAlt:
      "An installer in a hard hat and high-visibility vest cleaning a solar panel on a corrugated roof.",
    mark: { shape: "circle", bg: "#d9a21b", fg: "#17181b" },
    tagline: "Rooftop solar and batteries for homes across Central Texas.",
    about: [
      "Brightwork designs and installs residential solar and battery systems, about 900 homes a year, with its own crews rather than subcontractors.",
      "Crews start at 6:30 am to beat the heat and are off the roof by 2 pm from June through September. Every installer is NABCEP-certified within eighteen months, on company time.",
    ],
    perks: [
      "Paid certification",
      "Company truck for leads",
      "Summer hours June–September",
      "Employee solar at cost",
    ],
    replyDays: 3,
    quote: {
      text: "An installer who knows what they will earn on day one stays for year three. That’s the whole strategy.",
      by: "Dana Whitfield",
      role: "Director of Field Operations",
    },
    offices: ["Austin, East Cesar Chavez", "San Marcos yard"],
  },
  {
    slug: "marrow",
    name: "Marrow",
    industry: "Restaurants",
    size: "38 people",
    founded: 2018,
    hq: "Chicago",
    image: marrowKitchen,
    imageAlt:
      "An open restaurant kitchen behind a long walnut counter, a chef plating under pendant lights.",
    mark: { shape: "square", bg: "#7a1f2b", fg: "#f5f3ee" },
    tagline: "A 40-seat counter restaurant cooking over wood in Logan Square.",
    about: [
      "Marrow is a counter restaurant: forty seats, one wood-fired hearth and a menu that changes with whatever the two farms upstate send that week.",
      "The kitchen closes Sundays and Mondays. Tips are pooled across front and back of house, and every cook gets a stage at another restaurant once a year.",
    ],
    perks: [
      "Closed Sundays and Mondays",
      "Pooled tips, front and back",
      "Paid yearly stage",
      "Family meal at 4 pm",
    ],
    replyDays: 5,
    quote: {
      text: "Two days off together, a salary you can see, and nobody shouting. You would be amazed how rare that still is.",
      by: "Tomás Reyes",
      role: "Chef de cuisine",
    },
    offices: ["Chicago, Logan Square"],
  },
  {
    slug: "northbound-freight",
    name: "Northbound Freight",
    industry: "Logistics",
    size: "400+ people",
    founded: 2006,
    hq: "Columbus",
    image: northboundYard,
    imageAlt:
      "A forklift loading boxed freight from a covered dock into a shipping container under a clear sky.",
    mark: { shape: "diamond", bg: "#24434a", fg: "#f5f3ee" },
    tagline:
      "Regional freight and cross-docking for the Midwest’s mid-size manufacturers.",
    about: [
      "Northbound runs three cross-dock warehouses and a fleet of 160 trucks moving parts between manufacturers in Ohio, Indiana and Michigan.",
      "The routing software is built in-house by a remote product team of twelve, who spend one week a quarter riding along on actual routes.",
    ],
    perks: [
      "Shift choice after 90 days",
      "Paid CDL training",
      "Quarterly ride-alongs for office staff",
      "Pension plus 401(k)",
    ],
    replyDays: 7,
    quote: {
      text: "Our supervisors came up off the dock. The listing tells you exactly what the job pays at every step on the way up.",
      by: "Grace Adeyemi",
      role: "Talent Lead",
    },
    offices: ["Columbus, Groveport", "Fort Wayne", "Toledo"],
  },
  {
    slug: "eastbank-libraries",
    name: "Eastbank Libraries",
    industry: "Public libraries",
    size: "210 staff, 11 branches",
    founded: 1902,
    hq: "Portland",
    image: eastbankRoom,
    imageAlt:
      "A domed library reading room with long tables where people sit studying under brass lamps.",
    mark: { shape: "arch", bg: "#3c3a7a", fg: "#f5f3ee" },
    tagline:
      "Eleven branch libraries on Portland’s east side, open seven days.",
    about: [
      "Eastbank is a public library district serving 300,000 people across eleven branches, a bookmobile and a seed library nobody expected to be this popular.",
      "Pay scales are public and set by union contract, so every listing shows the exact step you start on and the step you reach after two years.",
    ],
    perks: [
      "Union-negotiated pay steps",
      "Public service loan forgiveness eligible",
      "Pension (PERS)",
      "Paid sabbatical after 7 years",
    ],
    replyDays: 10,
    quote: {
      text: "A public job should be a public number. We publish the whole scale, not just the starting rate.",
      by: "Harriet Okafor",
      role: "District HR Manager",
    },
    offices: ["Central branch, Burnside", "10 neighbourhood branches"],
  },
];

/* ------------------------------------------------------------ jobs */

export type Job = {
  id: string;
  title: string;
  company: string;
  category: CategoryId;
  role: string;
  level: Level;
  type: JobType;
  workplace: Workplace;
  city: City;
  salary: [number, number];
  /** Days since the listing went up, relative to today. */
  posted: number;
  /** Days until applications close, relative to today. */
  closes: number;
  summary: string;
  duties: string[];
  requirements: string[];
  niceToHave: string[];
  process: string[];
  featured?: boolean;
};

export const jobs: Job[] = [
  {
    id: "senior-backend-engineer-plainfield",
    title: "Senior Backend Engineer (Go)",
    company: "plainfield",
    category: "engineering",
    role: "backend-engineer",
    level: "Senior",
    type: "Full-time",
    workplace: "Remote",
    city: "Remote (US)",
    salary: [158000, 182000],
    posted: 1,
    closes: 24,
    summary:
      "Own the booking engine that 3,100 clinics use to fill their week: availability rules, reminders and the sync with three practice-management systems.",
    duties: [
      "Design and ship changes to the availability service, written in Go on Postgres",
      "Lead the rewrite of the reminders pipeline so SMS and email share one queue",
      "Pair with support every other Thursday on the hardest clinic tickets",
      "Write the design docs that the rest of the team reviews asynchronously",
    ],
    requirements: [
      "Five or more years building and running backend services in production",
      "Comfort with Postgres beyond the ORM: indexes, locks, query plans",
      "Clear written English; most of our decisions live in documents",
      "Willingness to be on call one week in eight, paid at $400 a week",
    ],
    niceToHave: [
      "Experience with healthcare data (HL7, FHIR)",
      "Prior work on calendars, time zones or recurrence rules",
    ],
    process: [
      "30-minute call with Renata, Head of People",
      "Take-home design doc, paid at $300",
      "Two hours with the team discussing your doc",
      "Offer within five working days",
    ],
    featured: true,
  },
  {
    id: "product-designer-plainfield",
    title: "Product Designer",
    company: "plainfield",
    category: "design",
    role: "product-designer",
    level: "Mid",
    type: "Full-time",
    workplace: "Hybrid",
    city: "Chicago",
    salary: [118000, 136000],
    posted: 3,
    closes: 21,
    summary:
      "Design the front desk: the screen a receptionist keeps open for eight hours a day while the phone rings and patients wait.",
    duties: [
      "Run on-site visits to clinics every month and turn what you see into prototypes",
      "Own the design of the front-desk calendar, check-in and waitlist",
      "Keep the component library in Figma in step with production",
      "Test with real receptionists before anything ships",
    ],
    requirements: [
      "Three or more years designing software people use all day, not just once",
      "A portfolio that shows research, not only final screens",
      "Comfort in Chicago two days a week (Tuesday and Wednesday)",
    ],
    niceToHave: [
      "Accessibility auditing experience",
      "Front-end skills enough to tweak CSS in a pull request",
    ],
    process: [
      "Portfolio review and 30-minute call",
      "Two-hour walkthrough of a past project with two designers",
      "Clinic visit together, then offer",
    ],
  },
  {
    id: "support-engineer-plainfield",
    title: "Support Engineer",
    company: "plainfield",
    category: "sales-support",
    role: "support-engineer",
    level: "Mid",
    type: "Full-time",
    workplace: "Remote",
    city: "Remote (US)",
    salary: [78000, 92000],
    posted: 6,
    closes: 14,
    summary:
      "Be the person a clinic manager reaches when the schedule looks wrong on a Monday morning, and the engineer who finds out why.",
    duties: [
      "Answer escalated tickets by email and phone, 8 am – 4 pm in your time zone",
      "Reproduce bugs, read logs and write tickets engineers can act on immediately",
      "Turn repeated questions into help articles",
    ],
    requirements: [
      "Two years in technical support or a similar customer-facing role",
      "Ability to read SQL and follow an API request through the logs",
      "Patience on the phone with people who are having a bad day",
    ],
    niceToHave: ["Experience in a medical or dental office"],
    process: [
      "30-minute call",
      "Ticket exercise with a support lead (one hour)",
      "Meet the team, then offer",
    ],
  },
  {
    id: "research-associate-fernhill",
    title: "Research Associate, Assay Development",
    company: "fernhill-bio",
    category: "data-science",
    role: "research-associate",
    level: "Entry",
    type: "Full-time",
    workplace: "On-site",
    city: "Philadelphia",
    salary: [62000, 71000],
    posted: 2,
    closes: 30,
    summary:
      "Run and refine the enzyme assays behind Fernhill’s newborn screening panel, on a team of six bench scientists.",
    duties: [
      "Prepare reagents and run assay plates to written protocols",
      "Record results in the electronic lab notebook the same day",
      "Help troubleshoot plates that fail QC and suggest protocol changes",
      "Rotate onto assay design for one quarter each year",
    ],
    requirements: [
      "BS in biochemistry, molecular biology or a related field",
      "Hands-on pipetting and plate-reader experience, from a lab job or coursework",
      "Steady attention to detail on repetitive work",
    ],
    niceToHave: [
      "Experience in a CLIA-certified lab",
      "Basic Python or R for plate analysis",
    ],
    process: [
      "Phone screen with HR",
      "Lab tour and bench conversation with the team",
      "Reference checks, then offer",
    ],
  },
  {
    id: "data-analyst-fernhill",
    title: "Data Analyst, Lab Operations",
    company: "fernhill-bio",
    category: "data-science",
    role: "data-analyst",
    level: "Mid",
    type: "Full-time",
    workplace: "Hybrid",
    city: "Philadelphia",
    salary: [84000, 98000],
    posted: 9,
    closes: 12,
    summary:
      "Find out why some plates fail on Tuesdays. Build the dashboards and models that keep two lab shifts running on time.",
    duties: [
      "Model turnaround time from sample arrival to reported result",
      "Build and maintain the lab’s operational dashboards",
      "Work with the bench leads to test scheduling changes",
    ],
    requirements: [
      "Three years of analytics work with SQL and Python or R",
      "Experience presenting findings to people who do not work with data",
      "On site in Philadelphia three days a week",
    ],
    niceToHave: [
      "Background in manufacturing or lab operations",
      "Experience with statistical process control",
    ],
    process: [
      "Call with the hiring manager",
      "Paid two-hour data exercise",
      "Panel with lab leads, then offer",
    ],
  },
  {
    id: "head-baker-night-oven-street",
    title: "Head Baker, Night Shift",
    company: "oven-street",
    category: "food",
    role: "baker",
    level: "Lead",
    type: "Full-time",
    workplace: "On-site",
    city: "Portland",
    salary: [62000, 70000],
    posted: 0,
    closes: 18,
    summary:
      "Lead the overnight bake at our Division Street bakery: four bakers, two deck ovens, 900 loaves before 6 am.",
    duties: [
      "Run the 10 pm – 6:30 am shift, Tuesday to Saturday nights",
      "Manage levain feeding, mixing schedule and oven loading",
      "Train new bakers and keep the production sheet honest",
      "Order flour and track waste weekly",
    ],
    requirements: [
      "Three years baking naturally leavened bread at volume",
      "At least one year leading a shift",
      "Able to lift 50 lb sacks and stand for a full shift",
    ],
    niceToHave: [
      "Experience with Italian deck ovens",
      "Food handler card already in hand",
    ],
    process: [
      "Call with Maya",
      "Paid trial night shift",
      "Offer the next morning",
    ],
    featured: true,
  },
  {
    id: "operations-manager-oven-street",
    title: "Operations Manager, Three Bakeries",
    company: "oven-street",
    category: "operations",
    role: "operations-manager",
    level: "Senior",
    type: "Full-time",
    workplace: "On-site",
    city: "Portland",
    salary: [88000, 102000],
    posted: 5,
    closes: 20,
    summary:
      "Make three bakeries run like one: schedules, wholesale delivery routes, purchasing and the occasional broken mixer.",
    duties: [
      "Own staffing schedules for 45 people across three sites",
      "Plan the wholesale delivery route to forty restaurants",
      "Negotiate with flour, dairy and packaging suppliers",
      "Report weekly on margin per site to the owners",
    ],
    requirements: [
      "Four years in food or hospitality operations, two of them multi-site",
      "Confidence with spreadsheets and scheduling software",
      "A driver’s licence; you will visit all three sites most days",
    ],
    niceToHave: ["Wholesale or catering experience"],
    process: [
      "Call with both owners",
      "Half-day visiting all three bakeries",
      "Offer within a week",
    ],
  },
  {
    id: "cabinetmaker-truss-grain",
    title: "Cabinetmaker",
    company: "truss-grain",
    category: "trades",
    role: "cabinetmaker",
    level: "Mid",
    type: "Full-time",
    workplace: "On-site",
    city: "Denver",
    salary: [56000, 68000],
    posted: 4,
    closes: 25,
    summary:
      "Build face-frame and frameless cabinetry from shop drawings, start to finish, in solid walnut, white oak and maple.",
    duties: [
      "Mill, join and assemble casework from cut lists and shop drawings",
      "Fit doors, drawers and hardware to a tolerance of 1/32 in",
      "Help install on site about one day a week",
    ],
    requirements: [
      "Three years in a professional cabinet or millwork shop",
      "Safe, confident use of table saw, jointer, planer and edgebander",
      "Your own hand tools; we cover the big ones",
    ],
    niceToHave: [
      "Experience with veneer and vacuum press",
      "Finishing experience (spray)",
    ],
    process: [
      "Call with Luis",
      "Paid shop day building a small carcass",
      "Offer that afternoon or the next day",
    ],
  },
  {
    id: "cnc-programmer-truss-grain",
    title: "CNC Programmer & Operator",
    company: "truss-grain",
    category: "trades",
    role: "cnc-programmer",
    level: "Senior",
    type: "Full-time",
    workplace: "On-site",
    city: "Denver",
    salary: [74000, 88000],
    posted: 11,
    closes: 10,
    summary:
      "Turn our drawings into nested cut files and run the 5×10 router that cuts every cabinet part we make.",
    duties: [
      "Program nests in our CAM software from shop drawings",
      "Run and maintain the CNC router and its tooling",
      "Label and stage parts for the bench team",
    ],
    requirements: [
      "Three years programming and running a CNC router for wood or sheet goods",
      "Ability to read architectural drawings",
      "Experience with any common CAM package",
    ],
    niceToHave: ["Cabinet Vision or Microvellum", "Basic AutoCAD drafting"],
    process: [
      "Call with Luis",
      "Walkthrough of a real job file together",
      "Offer",
    ],
  },
  {
    id: "solar-install-lead-brightwork",
    title: "Solar Install Lead",
    company: "brightwork-solar",
    category: "trades",
    role: "solar-installer",
    level: "Lead",
    type: "Full-time",
    workplace: "On-site",
    city: "Austin",
    salary: [70000, 82000],
    posted: 1,
    closes: 16,
    summary:
      "Run a three-person crew installing residential solar and batteries, about four homes a week across Central Texas.",
    duties: [
      "Lead the crew from roof layout through final inspection",
      "Keep every site safe: fall protection, ladders, electrical",
      "Explain the system to the homeowner on handover day",
    ],
    requirements: [
      "Two years installing residential solar, one leading a crew",
      "Clean driving record; you take a company truck home",
      "Comfort working on pitched roofs",
    ],
    niceToHave: [
      "NABCEP PV Installation Professional",
      "Battery (Powerwall-class) install experience",
    ],
    process: [
      "Phone call with Dana",
      "Ride along with a crew for a morning, paid",
      "Offer within three days",
    ],
    featured: true,
  },
  {
    id: "energy-advisor-brightwork",
    title: "Energy Advisor",
    company: "brightwork-solar",
    category: "sales-support",
    role: "energy-advisor",
    level: "Mid",
    type: "Full-time",
    workplace: "Hybrid",
    city: "Austin",
    salary: [60000, 72000],
    posted: 8,
    closes: 19,
    summary:
      "Visit homes, read the electric bill, and tell people honestly whether solar makes sense for them. Base plus uncapped commission; first-year average $94k on target.",
    duties: [
      "Run three to five home consultations a day from inbound leads",
      "Design proposals with our engineering team",
      "Follow every customer through to installation",
    ],
    requirements: [
      "Two years in a consultative sales role",
      "Comfort explaining numbers simply",
      "A car and a clean driving record (mileage paid)",
    ],
    niceToHave: ["Background in roofing, HVAC or electrical", "Spanish"],
    process: ["Call with the sales lead", "Shadow a consultation", "Offer"],
  },
  {
    id: "sous-chef-marrow",
    title: "Sous Chef",
    company: "marrow",
    category: "food",
    role: "chef",
    level: "Senior",
    type: "Full-time",
    workplace: "On-site",
    city: "Chicago",
    salary: [64000, 72000],
    posted: 2,
    closes: 15,
    summary:
      "Run the hearth and the line on chef’s nights off, and help write a menu that changes every week.",
    duties: [
      "Run service four nights a week, Tuesday to Saturday",
      "Manage prep lists, ordering and the whole-animal butchery program",
      "Develop two new dishes every week with the chef",
    ],
    requirements: [
      "Three years cooking in a serious kitchen, one as junior sous or lead line",
      "Comfort cooking over live fire, or keen to learn it properly",
      "Calm on a busy Saturday",
    ],
    niceToHave: ["Butchery experience", "Pastry fundamentals"],
    process: [
      "Call with Tomás",
      "Paid stage: one full service",
      "Offer within the week",
    ],
  },
  {
    id: "shift-supervisor-northbound",
    title: "Warehouse Shift Supervisor",
    company: "northbound-freight",
    category: "operations",
    role: "warehouse-supervisor",
    level: "Mid",
    type: "Full-time",
    workplace: "On-site",
    city: "Columbus",
    salary: [56000, 64000],
    posted: 3,
    closes: 22,
    summary:
      "Supervise the second shift (2 pm – 10:30 pm) at our Groveport cross-dock: 22 people, 60 trailers a night.",
    duties: [
      "Plan dock assignments and labour for the shift",
      "Keep safety walks, forklift checks and incident logs current",
      "Coach and schedule a team of 22",
    ],
    requirements: [
      "Two years in a warehouse or cross-dock, one leading people",
      "Forklift certification, or willingness to certify in week one",
      "Basic warehouse management system experience",
    ],
    niceToHave: ["Bilingual English/Spanish", "OSHA 10"],
    process: [
      "Call with Grace",
      "Walk the floor with the site manager",
      "Offer within a week",
    ],
  },
  {
    id: "product-manager-routing-northbound",
    title: "Product Manager, Routing",
    company: "northbound-freight",
    category: "product",
    role: "product-manager",
    level: "Senior",
    type: "Full-time",
    workplace: "Remote",
    city: "Remote (US)",
    salary: [146000, 168000],
    posted: 7,
    closes: 17,
    summary:
      "Own the routing product that plans 160 trucks a day, and the dispatcher screen it runs on.",
    duties: [
      "Set the roadmap for routing and dispatch with the twelve-person product team",
      "Spend one week a quarter on site with dispatchers and drivers",
      "Measure every change against on-time delivery and empty miles",
    ],
    requirements: [
      "Four years as a product manager on operational or B2B software",
      "Comfort reading SQL and talking optimisation trade-offs with engineers",
      "Travel to Ohio four times a year",
    ],
    niceToHave: [
      "Logistics or transport background",
      "Experience with vehicle routing solvers",
    ],
    process: [
      "Call with Grace",
      "Product exercise with the VP of Product",
      "Meet dispatch team, then offer",
    ],
  },
  {
    id: "childrens-librarian-eastbank",
    title: "Children’s Librarian",
    company: "eastbank-libraries",
    category: "public",
    role: "librarian",
    level: "Mid",
    type: "Full-time",
    workplace: "On-site",
    city: "Portland",
    salary: [61000, 70000],
    posted: 5,
    closes: 28,
    summary:
      "Run story times, school visits and the summer reading program at the Gateway branch.",
    duties: [
      "Plan and deliver six story times a week for ages 0–8",
      "Visit seven partner schools each term",
      "Build and weed the children’s collection",
    ],
    requirements: [
      "Master’s in library science (ALA-accredited)",
      "Experience leading programs for young children",
      "One weekend shift a month",
    ],
    niceToHave: [
      "Spanish, Vietnamese or Russian",
      "Early literacy certification",
    ],
    process: [
      "Application review against posted criteria",
      "Panel interview (45 min)",
      "Offer at step 1 of grade L2",
    ],
  },
  {
    id: "digital-services-coordinator-eastbank",
    title: "Digital Services Coordinator",
    company: "eastbank-libraries",
    category: "public",
    role: "digital-coordinator",
    level: "Entry",
    type: "Part-time",
    workplace: "Hybrid",
    city: "Portland",
    salary: [32000, 36000],
    posted: 12,
    closes: 9,
    summary:
      "Twenty hours a week helping patrons with devices, e-books and the library’s website, at the Central branch and from home.",
    duties: [
      "Run drop-in tech help two afternoons a week",
      "Update the website’s events and branch pages",
      "Troubleshoot e-reader and lending app issues",
    ],
    requirements: [
      "Experience helping people with technology, paid or volunteer",
      "Comfort with a content management system",
      "Available Tuesday and Thursday afternoons",
    ],
    niceToHave: ["Basic HTML", "A second language"],
    process: ["Application review", "Panel interview (30 min)", "Offer"],
  },
];

/* ------------------------------------------------------------ home */

export const home = {
  title: "Every job here shows the pay.",
  intro:
    "Shortlist is a job board with house rules: a real salary range on every listing, a reply from every employer, and nothing older than thirty days. Circle the ones worth a second look.",
  rules: [
    {
      title: "A salary range on every listing",
      text: "No “competitive”, no “DOE”. The top of a range can be no more than 30% above the bottom, so the number means something.",
    },
    {
      title: "Every applicant hears back",
      text: "Employers commit to a reply time before we publish. Miss it twice and the company page says so in plain words.",
    },
    {
      title: "Thirty days, then gone",
      text: "Listings come down after thirty days or the day they’re filled. Nothing stale, no ghost jobs collecting CVs.",
    },
    {
      title: "Written for people, not filters",
      text: "We edit listings for plain English. Ninjas, rockstars and “fast-paced environments” are sent back.",
    },
  ],
  filled: [
    { role: "Line cook", company: "Marrow", days: 9 },
    { role: "Frontend engineer", company: "Plainfield Software", days: 21 },
    { role: "Lab technician", company: "Fernhill Bio", days: 16 },
    { role: "Solar installer", company: "Brightwork Solar", days: 6 },
    { role: "Branch assistant", company: "Eastbank Libraries", days: 24 },
    { role: "Dispatcher", company: "Northbound Freight", days: 11 },
  ],
  quote: {
    text: "I circled four jobs on a Sunday night, applied to two on Monday and had a reply from both by Thursday. The salary was exactly what the listing said.",
    by: "Priya Raman",
    role: "Hired as Research Associate, 2026",
  },
  employers: {
    title: "Hiring? Write it once, plainly.",
    text: "A single listing runs thirty days for $189, salary range required. We edit it for clarity, put it in front of the Monday column, and hand you an inbox that replies on time.",
  },
  steps: [
    {
      title: "Circle",
      text: "Press Shortlist on any listing worth a second look.",
    },
    {
      title: "Compare",
      text: "Pay, reply promises and closing dates, side by side.",
    },
    {
      title: "Apply",
      text: "Seven questions and your CV. Everyone hears back.",
    },
  ],
  close: {
    title: "Your next job is probably in Monday’s column.",
    text: "New listings go up every weekday morning. Circle what fits, compare the pay side by side, apply when you’re ready.",
  },
};

/* ------------------------------------------------------------ post a job */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  single?: number;
  blurb: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "single",
    name: "Single listing",
    monthly: null,
    single: 189,
    blurb:
      "One role, thirty days live. For the bakery that needs a night baker by Friday.",
    features: [
      "30 days live, renew for $59",
      "Edited for plain English within one working day",
      "Included in one Monday column",
      "Applicant inbox with reply reminders",
    ],
  },
  {
    id: "team",
    name: "Team",
    monthly: 420,
    blurb: "Up to five live listings at once, swapped whenever you like.",
    features: [
      "5 live listings at any time",
      "Company page with photos and perks",
      "One featured listing a month",
      "Reply-time badge on every listing",
      "CSV export of applicants",
    ],
  },
  {
    id: "studio",
    name: "Careers",
    monthly: 980,
    blurb:
      "For employers who are always hiring somewhere: unlimited listings and pay benchmarks.",
    features: [
      "Unlimited live listings",
      "Three featured listings a month",
      "Quarterly salary benchmark for your roles",
      "Applicant export to your ATS",
      "A named person on our desk",
    ],
  },
];

export const addOns = [
  {
    name: "Feature in the Monday column",
    price: 79,
    note: "Top of the email that goes to 41,000 subscribers in your trade.",
  },
  {
    name: "Extend 30 more days",
    price: 59,
    note: "Keeps your listing and its applicants together.",
  },
  {
    name: "Five-listing bundle",
    price: 799,
    note: "Use within twelve months; no subscription.",
  },
];

export const postPage = {
  title: "Post a job",
  intro:
    "Listings go live within one working day after a light edit. Every one needs a salary range, a reply time you can keep, and a description a person would want to read.",
  yearlyNote: "Billed yearly: twelve months for the price of ten.",
};

export const faqs = [
  {
    q: "Why do you insist on a salary range?",
    a: "Because candidates skip listings without one, and the ones who don’t spend weeks interviewing for a number they could have read on day one. Listings with a range here get about twice the applications of the same role elsewhere.",
  },
  {
    q: "How wide can the range be?",
    a: "The top can be no more than 30% above the bottom. $60,000–$78,000 is fine; $50,000–$120,000 tells nobody anything and will be sent back.",
  },
  {
    q: "What happens if we miss our reply time?",
    a: "We send you a reminder at the halfway point and on the day. Miss it on two listings in a row and your company page shows your real average reply time instead of your promise.",
  },
  {
    q: "Can we pause a listing once the role is filled?",
    a: "Yes. Mark it filled and it comes down immediately; on Team and Careers plans the slot frees up for your next role straight away. Single listings are not refunded once live.",
  },
  {
    q: "Do candidates pay anything?",
    a: "Never. Searching, shortlisting, applying and the Monday column are free for anyone looking for work.",
  },
];

/* ------------------------------------------------------------ about */

export const about = {
  title: "A job board with house rules.",
  intro:
    "Shortlist started in 2019 at a kitchen table in Portland, when two recruiters got tired of explaining to candidates why the job they’d interviewed for three times paid $20,000 less than they needed.",
  story: [
    "Eda Kowalczyk had spent nine years placing engineers; Marcus Bell had spent eleven filling kitchen and warehouse jobs. They noticed the same thing in both worlds: the best candidates quietly skipped any listing that hid the pay, and the listings that did show it filled twice as fast.",
    "So they built the board they wished existed, with a few rules nobody could buy their way around. Every listing shows a real salary range. Every employer promises a reply time, and the promise is checked. Nothing stays up longer than thirty days.",
    "Today Shortlist carries around 1,200 live listings at a time, from software teams to night bakeries, and a small editorial desk in Portland reads every one before it goes live.",
  ],
  people: [
    {
      name: "Eda Kowalczyk",
      role: "Co-founder, product",
      bio: "Placed engineers for nine years. Still reads every listing flagged by the desk.",
    },
    {
      name: "Marcus Bell",
      role: "Co-founder, employers",
      bio: "Filled kitchen and warehouse jobs for eleven years. Answers the employer phone line on Fridays.",
    },
    {
      name: "Aiko Tanabe",
      role: "Editor, listings desk",
      bio: "Former newspaper sub-editor. Has removed the word “rockstar” 2,300 times.",
    },
    {
      name: "Jonah Feld",
      role: "Salary data",
      bio: "Builds the salary guide from listings and accepted offers. Very fond of medians.",
    },
    {
      name: "Lucía Paredes",
      role: "Candidate support",
      bio: "Runs the help desk and the reply-time checks. Will chase an employer for you.",
    },
    {
      name: "Sam Okoro",
      role: "Engineering",
      bio: "Keeps search fast and the Monday column on time. Ex-Northbound dispatcher, oddly.",
    },
  ],
  numbersNote:
    "Shortlist is a fictional company. People, figures and employers on this site are sample content.",
  photo: {
    src: ovenTeam,
    alt: "Bakers in white aprons gathered around a floured bench while one shapes a long loaf.",
    caption:
      "The night crew at Oven Street, one of the first employers to sign up to the house rules.",
  },
};

/* ------------------------------------------------------------ apply */

export const applyPage = {
  note: "This is a demo: nothing is uploaded or sent anywhere.",
  rightToWork: [
    "Yes, I can work in the US without sponsorship",
    "I will need visa sponsorship",
  ],
  starts: [
    "Immediately",
    "Within two weeks",
    "Within a month",
    "In two months or more",
  ],
};
