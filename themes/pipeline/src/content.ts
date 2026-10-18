/* Every brand, person, company, price and figure below is fictional demonstration content. */

export const brand = {
  name: "Pipeline",
  sector: "CRM & sales software",
  tagline: "Every deal on the board. One honest number on Thursday.",
  email: "hello@pipeline.example",
  sales: "sales@pipeline.example",
  phone: "+1 555 0142 778",
  address: [
    "Pipeline Software Co.",
    "418 Corliss Street, Floor 3",
    "Providence, RI 02903",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

export const nav = [
  { to: "/product", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/customers", label: "Customers" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "Company" },
];

export const footer = {
  columns: [
    {
      title: "Product",
      links: [
        { to: "/product", label: "How it works" },
        { to: "/pricing", label: "Pricing" },
        { to: "/changelog", label: "Changelog" },
        { to: "/app", label: "Demo workspace" },
      ],
    },
    {
      title: "Customers",
      links: [
        { to: "/customers", label: "All stories" },
        { to: "/customers/halvard-freight", label: "Halvard Freight" },
        {
          to: "/customers/brightwater-staffing",
          label: "Brightwater Staffing",
        },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/about", label: "About us" },
        { to: "/demo", label: "Book a demo" },
        { to: "/signin", label: "Sign in" },
      ],
    },
  ],
  newsletter: {
    title: "The Monday pipeline letter",
    body: "One short email a week on running cleaner pipeline reviews. Written by our sales team, not our marketing team.",
  },
};

/* ───────────────────────── Demo workspace (also feeds the marketing visuals) ───────────────────────── */

export type StageId =
  "lead" | "qualified" | "demo" | "proposal" | "negotiation" | "won" | "lost";
export type Forecast = "commit" | "best" | "omit";

export const stages: { id: StageId; label: string; probability: number }[] = [
  { id: "lead", label: "Lead in", probability: 0.1 },
  { id: "qualified", label: "Qualified", probability: 0.2 },
  { id: "demo", label: "Demo held", probability: 0.4 },
  { id: "proposal", label: "Proposal sent", probability: 0.6 },
  { id: "negotiation", label: "Negotiation", probability: 0.8 },
  { id: "won", label: "Closed won", probability: 1 },
  { id: "lost", label: "Closed lost", probability: 0 },
];

export const forecastLabels: Record<Forecast, string> = {
  commit: "Commit",
  best: "Best case",
  omit: "Omit",
};

export type Owner = {
  id: string;
  name: string;
  initials: string;
  quota: number;
};

export const owners: Owner[] = [
  { id: "mo", name: "Mara Okafor", initials: "MO", quota: 180000 },
  { id: "tl", name: "Theo Lindqvist", initials: "TL", quota: 160000 },
  { id: "pr", name: "Priya Raman", initials: "PR", quota: 150000 },
  { id: "dc", name: "Dev Castellanos", initials: "DC", quota: 130000 },
];

export type Deal = {
  id: string;
  title: string;
  company: string;
  contactId: string;
  owner: string;
  value: number;
  stage: StageId;
  close: string;
  forecast: Forecast;
  next: string;
};

export const deals: Deal[] = [
  {
    id: "d-tidewater",
    title: "Fleet refresh, 12 printers",
    company: "Tidewater Cold Storage",
    contactId: "ines-albright",
    owner: "mo",
    value: 48600,
    stage: "negotiation",
    close: "2026-11-14",
    forecast: "commit",
    next: "Legal redlines back by Tue",
  },
  {
    id: "d-aster",
    title: "Ward inventory tags",
    company: "Aster Hospital Supply",
    contactId: "samuel-okoro",
    owner: "mo",
    value: 64000,
    stage: "negotiation",
    close: "2026-11-28",
    forecast: "commit",
    next: "Procurement call Thu 10:00",
  },
  {
    id: "d-halberd",
    title: "3 depots, label subscription",
    company: "Halberd Parcel",
    contactId: "june-whitcombe",
    owner: "mo",
    value: 72400,
    stage: "proposal",
    close: "2026-12-12",
    forecast: "best",
    next: "Pricing review with CFO",
  },
  {
    id: "d-ridgeline",
    title: "Compliance labels pilot",
    company: "Ridgeline Pharmacy Group",
    contactId: "omar-haddad",
    owner: "mo",
    value: 18900,
    stage: "demo",
    close: "2026-12-19",
    forecast: "omit",
    next: "Send pilot scope",
  },
  {
    id: "d-northgate",
    title: "Asset tags, 40 branches",
    company: "Northgate Tool Hire",
    contactId: "fiona-marsh",
    owner: "mo",
    value: 58700,
    stage: "qualified",
    close: "2026-12-30",
    forecast: "omit",
    next: "Book site visit in Leeds depot",
  },
  {
    id: "d-ashby",
    title: "Theatre supply labelling",
    company: "Ashby Medical",
    contactId: "rhea-castillo",
    owner: "mo",
    value: 52300,
    stage: "won",
    close: "2026-10-09",
    forecast: "commit",
    next: "Kickoff booked",
  },
  {
    id: "d-fennel",
    title: "Six-store rollout",
    company: "Fennel Street Grocers",
    contactId: "lucas-brennan",
    owner: "tl",
    value: 41200,
    stage: "proposal",
    close: "2026-11-21",
    forecast: "best",
    next: "Store manager sign-off",
  },
  {
    id: "d-orchard",
    title: "Cross-dock RFID",
    company: "Orchard Line Logistics",
    contactId: "hana-sato",
    owner: "tl",
    value: 96500,
    stage: "demo",
    close: "2026-12-18",
    forecast: "best",
    next: "Technical demo for IT",
  },
  {
    id: "d-saltmarsh",
    title: "Cold-chain labels",
    company: "Saltmarsh Seafood",
    contactId: "callum-reid",
    owner: "tl",
    value: 33900,
    stage: "proposal",
    close: "2026-11-07",
    forecast: "commit",
    next: "Revised quote sent Fri",
  },
  {
    id: "d-cobalt",
    title: "Case labels, two lines",
    company: "Cobalt Brewing Co.",
    contactId: "nadia-petrov",
    owner: "tl",
    value: 12300,
    stage: "won",
    close: "2026-10-03",
    forecast: "commit",
    next: "Install week of Oct 20",
  },
  {
    id: "d-kittering",
    title: "Bale tags, 4 printers",
    company: "Kittering Mills",
    contactId: "george-ansell",
    owner: "tl",
    value: 22100,
    stage: "lost",
    close: "2026-10-11",
    forecast: "omit",
    next: "Lost to incumbent on price",
  },
  {
    id: "d-hollis",
    title: "Produce labels",
    company: "Hollis Farm Co-op",
    contactId: "beatrix-lowe",
    owner: "pr",
    value: 19400,
    stage: "negotiation",
    close: "2026-10-31",
    forecast: "commit",
    next: "Board vote on Oct 28",
  },
  {
    id: "d-gantry",
    title: "Coil tags",
    company: "Gantry Steel",
    contactId: "victor-mensah",
    owner: "pr",
    value: 37800,
    stage: "demo",
    close: "2026-12-05",
    forecast: "omit",
    next: "Heat-resistant stock samples",
  },
  {
    id: "d-brindle",
    title: "Pallet labels",
    company: "Brindle Pet Foods",
    contactId: "esme-hartley",
    owner: "pr",
    value: 28800,
    stage: "qualified",
    close: "2026-12-12",
    forecast: "omit",
    next: "Discovery call #2",
  },
  {
    id: "d-wren",
    title: "Bag labels for wholesale",
    company: "Wren Coffee Roasters",
    contactId: "jonah-wilder",
    owner: "pr",
    value: 8600,
    stage: "won",
    close: "2026-10-14",
    forecast: "commit",
    next: "Invoice sent",
  },
  {
    id: "d-quarry",
    title: "Yard labels",
    company: "Quarry Hill Builders Merchant",
    contactId: "dylan-price",
    owner: "dc",
    value: 15600,
    stage: "lead",
    close: "2026-12-30",
    forecast: "omit",
    next: "Reply to inbound form",
  },
  {
    id: "d-pemberton",
    title: "Records relabel project",
    company: "Pemberton Archives",
    contactId: "clara-voss",
    owner: "dc",
    value: 11200,
    stage: "lead",
    close: "2026-12-30",
    forecast: "omit",
    next: "Qualify budget",
  },
  {
    id: "d-sable",
    title: "Returns desk",
    company: "Sable Outdoor",
    contactId: "marcus-bell",
    owner: "dc",
    value: 7400,
    stage: "won",
    close: "2026-10-06",
    forecast: "commit",
    next: "Onboarding done",
  },
  {
    id: "d-vellum",
    title: "Short-run labels",
    company: "Vellum Print Studio",
    contactId: "ada-quinn",
    owner: "dc",
    value: 6900,
    stage: "lost",
    close: "2026-10-02",
    forecast: "omit",
    next: "No budget until spring",
  },
  {
    id: "d-meridale",
    title: "Lab sample tracking",
    company: "Meridale Diagnostics",
    contactId: "tomas-ferreira",
    owner: "dc",
    value: 44500,
    stage: "proposal",
    close: "2026-11-30",
    forecast: "best",
    next: "Security questionnaire",
  },
];

export type ActivityKind = "call" | "email" | "meeting" | "note";
export type Activity = {
  date: string;
  kind: ActivityKind;
  text: string;
  by: string;
};
export type ContactStatus = "Lead" | "Prospect" | "Customer";

export type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  status: ContactStatus;
  owner: string;
  activity: Activity[];
};

const mail = (name: string, company: string) =>
  `${name
    .split(" ")[0]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()}@${company
    .toLowerCase()
    .split(" ")[0]
    .replace(/[^a-z]/g, "")}.example`;

function contact(
  id: string,
  name: string,
  title: string,
  company: string,
  phone: string,
  city: string,
  status: ContactStatus,
  owner: string,
  activity: Activity[],
): Contact {
  return {
    id,
    name,
    title,
    company,
    email: mail(name, company),
    phone,
    city,
    status,
    owner,
    activity,
  };
}

export const contacts: Contact[] = [
  contact(
    "ines-albright",
    "Inés Albright",
    "Head of Operations",
    "Tidewater Cold Storage",
    "+1 555 0198 211",
    "Baltimore, MD",
    "Prospect",
    "mo",
    [
      {
        date: "2026-10-16",
        kind: "email",
        text: "Sent legal the redlined MSA. Inés expects comments back Tuesday.",
        by: "mo",
      },
      {
        date: "2026-10-13",
        kind: "meeting",
        text: "Commercial walkthrough with Inés and finance. Agreed 12 printers, 3-year paper contract.",
        by: "mo",
      },
      {
        date: "2026-09-29",
        kind: "call",
        text: "Ribbon jams on their old fleet are costing a shift a week. That's the pain to lead with.",
        by: "mo",
      },
    ],
  ),
  contact(
    "samuel-okoro",
    "Samuel Okoro",
    "Supply Chain Director",
    "Aster Hospital Supply",
    "+1 555 0163 404",
    "Columbus, OH",
    "Prospect",
    "mo",
    [
      {
        date: "2026-10-15",
        kind: "call",
        text: "Procurement wants a second reference in healthcare. Offered Ashby Medical.",
        by: "mo",
      },
      {
        date: "2026-10-08",
        kind: "meeting",
        text: "On-site at the Columbus warehouse. Ward tags need to survive alcohol wipes.",
        by: "mo",
      },
    ],
  ),
  contact(
    "june-whitcombe",
    "June Whitcombe",
    "VP Network Operations",
    "Halberd Parcel",
    "+1 555 0127 950",
    "Memphis, TN",
    "Prospect",
    "mo",
    [
      {
        date: "2026-10-14",
        kind: "email",
        text: "Proposal sent for three depots. Subscription pricing on page 4.",
        by: "mo",
      },
      {
        date: "2026-10-02",
        kind: "meeting",
        text: "Depot tour in Memphis. They print 40k labels a night across two shifts.",
        by: "mo",
      },
      {
        date: "2026-09-18",
        kind: "note",
        text: "CFO Raymond Teale signs anything over $50k. Get him on the next call.",
        by: "mo",
      },
    ],
  ),
  contact(
    "omar-haddad",
    "Omar Haddad",
    "Compliance Manager",
    "Ridgeline Pharmacy Group",
    "+1 555 0181 336",
    "Denver, CO",
    "Lead",
    "mo",
    [
      {
        date: "2026-10-10",
        kind: "meeting",
        text: "Demo went well, but the pilot needs a signed scope before Q1 budget opens.",
        by: "mo",
      },
    ],
  ),
  contact(
    "fiona-marsh",
    "Fiona Marsh",
    "Fleet & Assets Lead",
    "Northgate Tool Hire",
    "+1 555 0110 742",
    "Pittsburgh, PA",
    "Lead",
    "mo",
    [
      {
        date: "2026-10-12",
        kind: "call",
        text: "40 branches, every drill and saw needs a scannable tag. Budget exists, timing doesn't yet.",
        by: "mo",
      },
    ],
  ),
  contact(
    "rhea-castillo",
    "Rhea Castillo",
    "Theatre Services Manager",
    "Ashby Medical",
    "+1 555 0175 618",
    "Hartford, CT",
    "Customer",
    "mo",
    [
      {
        date: "2026-10-09",
        kind: "note",
        text: "Signed. Kickoff booked for Oct 22 with their biomedical team.",
        by: "mo",
      },
      {
        date: "2026-09-30",
        kind: "call",
        text: "Agreed to be a healthcare reference once they're live.",
        by: "mo",
      },
    ],
  ),
  contact(
    "lucas-brennan",
    "Lucas Brennan",
    "Retail Operations Manager",
    "Fennel Street Grocers",
    "+1 555 0136 129",
    "Portland, ME",
    "Prospect",
    "tl",
    [
      {
        date: "2026-10-15",
        kind: "email",
        text: "Store managers want to see the shelf-edge template before they sign off.",
        by: "tl",
      },
      {
        date: "2026-10-01",
        kind: "meeting",
        text: "Pilot store results: price-change labels done in 40 minutes instead of 2 hours.",
        by: "tl",
      },
    ],
  ),
  contact(
    "hana-sato",
    "Hana Sato",
    "Director of IT",
    "Orchard Line Logistics",
    "+1 555 0152 887",
    "Savannah, GA",
    "Prospect",
    "tl",
    [
      {
        date: "2026-10-11",
        kind: "call",
        text: "IT needs to see the API before ops can champion it internally.",
        by: "tl",
      },
      {
        date: "2026-09-26",
        kind: "email",
        text: "Sent RFID spec sheet and the cross-dock case study.",
        by: "tl",
      },
    ],
  ),
  contact(
    "callum-reid",
    "Callum Reid",
    "Plant Manager",
    "Saltmarsh Seafood",
    "+1 555 0144 503",
    "New Bedford, MA",
    "Prospect",
    "tl",
    [
      {
        date: "2026-10-17",
        kind: "email",
        text: "Revised quote with freezer-grade adhesive. He'll take it to the owners Monday.",
        by: "tl",
      },
      {
        date: "2026-10-06",
        kind: "call",
        text: "Labels peel at −20°C on their current stock. Our cold-chain roll fixes it.",
        by: "tl",
      },
    ],
  ),
  contact(
    "nadia-petrov",
    "Nadia Petrov",
    "Packaging Lead",
    "Cobalt Brewing Co.",
    "+1 555 0119 260",
    "Asheville, NC",
    "Customer",
    "tl",
    [
      {
        date: "2026-10-03",
        kind: "note",
        text: "Closed. Install week of Oct 20 on both canning lines.",
        by: "tl",
      },
    ],
  ),
  contact(
    "george-ansell",
    "George Ansell",
    "Mill Manager",
    "Kittering Mills",
    "+1 555 0170 455",
    "Lowell, MA",
    "Lead",
    "tl",
    [
      {
        date: "2026-10-11",
        kind: "call",
        text: "Staying with their incumbent this year; 9% cheaper on consumables. Revisit in July.",
        by: "tl",
      },
    ],
  ),
  contact(
    "beatrix-lowe",
    "Beatrix Lowe",
    "General Manager",
    "Hollis Farm Co-op",
    "+1 555 0185 097",
    "Burlington, VT",
    "Prospect",
    "pr",
    [
      {
        date: "2026-10-16",
        kind: "email",
        text: "Board pack submitted. Vote on Oct 28, Beatrix is presenting.",
        by: "pr",
      },
      {
        date: "2026-10-04",
        kind: "meeting",
        text: "Packhouse visit. Produce labels need grower codes printed per crate.",
        by: "pr",
      },
    ],
  ),
  contact(
    "victor-mensah",
    "Victor Mensah",
    "Production Engineer",
    "Gantry Steel",
    "+1 555 0193 318",
    "Gary, IN",
    "Lead",
    "pr",
    [
      {
        date: "2026-10-09",
        kind: "meeting",
        text: "Demo on the shop floor. Tags must survive coils at 300°F; samples requested.",
        by: "pr",
      },
    ],
  ),
  contact(
    "esme-hartley",
    "Esme Hartley",
    "Warehouse Manager",
    "Brindle Pet Foods",
    "+1 555 0107 664",
    "Omaha, NE",
    "Lead",
    "pr",
    [
      {
        date: "2026-10-13",
        kind: "call",
        text: "First discovery call. Mixed pallets, three label formats, one tired printer.",
        by: "pr",
      },
    ],
  ),
  contact(
    "jonah-wilder",
    "Jonah Wilder",
    "Co-founder",
    "Wren Coffee Roasters",
    "+1 555 0121 579",
    "Richmond, VA",
    "Customer",
    "pr",
    [
      {
        date: "2026-10-14",
        kind: "note",
        text: "Won. Invoice sent, paid same day.",
        by: "pr",
      },
      {
        date: "2026-10-07",
        kind: "call",
        text: "Wholesale bags need roast date and origin printed on demand.",
        by: "pr",
      },
    ],
  ),
  contact(
    "dylan-price",
    "Dylan Price",
    "Branch Manager",
    "Quarry Hill Builders Merchant",
    "+1 555 0148 931",
    "Albany, NY",
    "Lead",
    "dc",
    [
      {
        date: "2026-10-17",
        kind: "email",
        text: "Inbound form: yard racking labels fading in the sun. Replied with outdoor stock options.",
        by: "dc",
      },
    ],
  ),
  contact(
    "clara-voss",
    "Clara Voss",
    "Head Archivist",
    "Pemberton Archives",
    "+1 555 0155 286",
    "Philadelphia, PA",
    "Lead",
    "dc",
    [
      {
        date: "2026-10-12",
        kind: "call",
        text: "Grant-funded relabel of 60,000 boxes. Budget confirmed in January.",
        by: "dc",
      },
    ],
  ),
  contact(
    "marcus-bell",
    "Marcus Bell",
    "Returns Supervisor",
    "Sable Outdoor",
    "+1 555 0166 813",
    "Boise, ID",
    "Customer",
    "dc",
    [
      {
        date: "2026-10-06",
        kind: "note",
        text: "Won and onboarded the same week. Returns desk printing from the browser.",
        by: "dc",
      },
    ],
  ),
  contact(
    "ada-quinn",
    "Ada Quinn",
    "Studio Owner",
    "Vellum Print Studio",
    "+1 555 0132 742",
    "Providence, RI",
    "Lead",
    "dc",
    [
      {
        date: "2026-10-02",
        kind: "call",
        text: "No budget until spring. Asked us to check back in March.",
        by: "dc",
      },
    ],
  ),
  contact(
    "tomas-ferreira",
    "Tomás Ferreira",
    "Lab Operations Lead",
    "Meridale Diagnostics",
    "+1 555 0178 120",
    "Raleigh, NC",
    "Prospect",
    "dc",
    [
      {
        date: "2026-10-15",
        kind: "email",
        text: "Security questionnaire received: 84 questions. Due Oct 24.",
        by: "dc",
      },
      {
        date: "2026-10-01",
        kind: "meeting",
        text: "Proposal walkthrough. Sample tubes need 2D barcodes at 6pt.",
        by: "dc",
      },
    ],
  ),
];

/** Won revenue per month for the demo workspace; the current month is computed live from the board. */
export const history = [
  { month: "May", won: 168400, target: 190000 },
  { month: "Jun", won: 214900, target: 190000 },
  { month: "Jul", won: 152300, target: 200000 },
  { month: "Aug", won: 187600, target: 200000 },
  { month: "Sep", won: 236200, target: 200000 },
];

export const app = {
  workspace: "Larkspur Labelworks",
  team: "North America sales",
  quarter: "Q4 2026",
  today: "2026-10-18",
  me: "mo",
  nav: [
    { to: "/app", label: "Deals board" },
    { to: "/app/contacts", label: "Contacts" },
    { to: "/app/reports", label: "Reports" },
  ],
};

/* ───────────────────────── Marketing pages ───────────────────────── */

export const home = {
  title: "Pipeline — CRM for teams that forecast on Thursdays",
  hero: {
    h1: "Every deal on the board. One honest number on Thursday.",
    lede: "Pipeline is a CRM for sales teams of 5 to 200. Deals move across a board your reps actually keep current, every call and email lands on the contact, and the forecast is something you can defend on the call.",
    note: "14-day trial · no card · import a spreadsheet in minutes",
  },
  forecast: {
    h2: "Run the forecast call from the board, not from memory.",
    body: "Every rep calls their quarter the same way: what's commit, what's best case, what you're leaving out. Try it on Mara's open deals. Flip a call and watch the number, the gap to quota and the stage-weighted check move together.",
  },
  stages: {
    h2: "Stages that mean the same thing to every rep.",
    body: "A deal only moves when its exit criteria are met, so “Proposal sent” means a proposal was sent. Probabilities are yours to set and the board shows both the raw and the weighted total of every column.",
    criteria: {
      lead: "Inbound form, referral or event scan",
      qualified: "Budget, owner and a reason to act now",
      demo: "Decision-maker saw it work on their data",
      proposal: "Written pricing in the buyer's inbox",
      negotiation: "Redlines, procurement or legal in motion",
      won: "Signed order form on file",
    } as Partial<Record<StageId, string>>,
  },
  quote: {
    text: "We stopped arguing about whose spreadsheet was right. Thursday's call went from ninety minutes to twenty-five, and our quarter landed within four percent of what we called in week three.",
    name: "Odette Marchetti",
    role: "VP Sales, Halvard Freight",
    to: "/customers/halvard-freight",
  },
  record: {
    h2: "The whole relationship on one card.",
    body: "Calls, emails, meetings and notes collect on the contact as they happen. A rep covering for a colleague on holiday reads one page and knows what was promised, by whom, and what happens next.",
    points: [
      "Emails log from any IMAP or Exchange inbox, no forwarding rules",
      "Calls from the browser dialer are timed and noted automatically",
      "Next steps carry a date, so stale deals surface on Monday morning",
    ],
  },
  reports: {
    h2: "Reports your board can read without a meeting to explain them.",
    body: "Won against target by month, stage conversion, and attainment per rep, all drawn from the same board your team updates. No exports, no pivot tables, no second version of the truth.",
  },
  setup: {
    h2: "Live by Friday afternoon.",
    steps: [
      {
        title: "Import",
        body: "Drop in a CSV or spreadsheet export. Pipeline matches columns to fields and flags duplicates before anything is written.",
      },
      {
        title: "Map your stages",
        body: "Rename stages, set exit criteria and probabilities. Existing deals keep their history.",
      },
      {
        title: "Connect inbox and phone",
        body: "Each rep connects their own mailbox and dialer in two clicks. Admins never see private threads.",
      },
      {
        title: "Hold the first review",
        body: "Open the board in Thursday's meeting. That's the rollout plan most teams need.",
      },
    ],
  },
  stories: { h2: "Teams that forecast with Pipeline" },
  pricing: {
    h2: "Priced per seat, with every report on every plan.",
    body: "Starter is enough for a team of five. Team adds sequences and forecasting. Scale adds territories, permissions and an audit trail.",
  },
  close: {
    h2: "Open the demo board and move a deal.",
    body: "The demo workspace is a fictional label-printer company with twenty live deals. Drag one to Closed won and watch the reports change.",
  },
};

export const product = {
  title: "Product",
  h1: "A CRM shaped like the week of a sales team.",
  lede: "Monday you plan, midweek you sell, Thursday you call the number. Pipeline puts each of those moments on one screen and keeps the data honest in between.",
  sections: [
    {
      id: "board",
      title: "The deals board",
      body: "Every open deal as a card, in the stage it really is. Drag it forward, or move it with the arrow keys. Each column shows its count, raw total and weighted total, so a stuffed early stage never passes for a healthy quarter.",
      points: [
        "Drag and drop or keyboard moves",
        "Filter by owner, close month or size",
        "Stale deals marked after 14 quiet days",
      ],
    },
    {
      id: "contacts",
      title: "Contacts with memory",
      body: "Every person you sell to, with the deals they're on and every touch in date order. Search across names, companies and notes; sort by last touch to find the relationships going cold.",
      points: [
        "Inbox and dialer logging",
        "Shared notes with @mentions",
        "Duplicate detection on import",
      ],
    },
    {
      id: "forecast",
      title: "Forecast categories",
      body: "Reps mark each deal commit, best case or omit. Managers see the call next to the stage-weighted math, so a rep who is sandbagging or wishing shows up as a gap, not an argument.",
      points: [
        "Weekly snapshots to compare calls",
        "Roll-ups by team and region",
        "Quota per rep, per quarter",
      ],
    },
    {
      id: "reports",
      title: "Reports",
      body: "Won against target, stage conversion, cycle length and attainment. Every chart is drawn from the board, filtered the way you filter the board, and exports to CSV when the finance team asks.",
      points: [
        "Scheduled email digests",
        "CSV export on every chart",
        "Shareable read-only links",
      ],
    },
  ],
  specs: [
    {
      label: "Import",
      value:
        "CSV, XLSX and vCard. Field mapping with preview; duplicates merged by email and domain.",
    },
    {
      label: "Email",
      value:
        "Any IMAP or Exchange mailbox. Two-way sync; private threads stay private.",
    },
    {
      label: "Calling",
      value:
        "Browser dialer with call timing, notes and recordings where consent laws allow.",
    },
    {
      label: "API",
      value:
        "REST API and webhooks on Team and Scale. 600 requests per minute per workspace.",
    },
    {
      label: "Security",
      value:
        "SSO with SAML on Scale, enforced two-step sign-in on every plan, data encrypted at rest.",
    },
    {
      label: "Data residency",
      value:
        "Hosting in US or EU regions, chosen when the workspace is created.",
    },
    {
      label: "Mobile",
      value:
        "Responsive web app; log a call or move a deal from the car park between meetings.",
    },
  ],
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  pitch: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  h1: "Per seat, per month. Every report on every plan.",
  lede: "No setup fees, no contact limits, no charge for read-only seats. Yearly billing takes 20% off.",
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 18,
      yearly: 14,
      pitch: "For a first sales hire or a founder still doing the selling.",
      features: [
        "Deals board and contacts",
        "Inbox logging",
        "Standard reports",
        "CSV import and export",
      ],
      cta: "Start a trial",
    },
    {
      id: "team",
      name: "Team",
      monthly: 42,
      yearly: 34,
      pitch: "For a team that holds a weekly pipeline review.",
      features: [
        "Everything in Starter",
        "Forecast categories and snapshots",
        "Browser dialer",
        "Email sequences",
        "API and webhooks",
      ],
      cta: "Start a trial",
      featured: true,
    },
    {
      id: "scale",
      name: "Scale",
      monthly: 76,
      yearly: 61,
      pitch: "For several teams, territories and a RevOps lead.",
      features: [
        "Everything in Team",
        "Territories and roll-ups",
        "Field-level permissions",
        "SSO and audit trail",
        "Named onboarding manager",
      ],
      cta: "Talk to sales",
    },
  ] as Plan[],
  compare: {
    columns: ["Starter", "Team", "Scale"],
    rows: [
      {
        label: "Deals, contacts and companies",
        values: ["Unlimited", "Unlimited", "Unlimited"],
      },
      { label: "Pipelines per workspace", values: ["1", "5", "Unlimited"] },
      { label: "Forecast categories", values: ["—", "Included", "Included"] },
      {
        label: "Weekly forecast snapshots",
        values: ["—", "12 weeks", "Unlimited"],
      },
      {
        label: "Browser dialer minutes",
        values: ["—", "1,000 / seat", "3,000 / seat"],
      },
      { label: "Email sequences", values: ["—", "Included", "Included"] },
      { label: "API requests per minute", values: ["—", "300", "600"] },
      { label: "SSO (SAML)", values: ["—", "—", "Included"] },
      {
        label: "Support",
        values: ["Email, 1 business day", "Email and chat", "Named manager"],
      },
    ],
  },
  faq: [
    {
      q: "What counts as a seat?",
      a: "Anyone who owns deals or logs activity. Managers and finance colleagues who only read the board and reports are free.",
    },
    {
      q: "Can we switch plans mid-year?",
      a: "Yes. Upgrades apply at once and are prorated to the day. Downgrades take effect at your next renewal.",
    },
    {
      q: "How long does migration take?",
      a: "Most teams under 30 seats import their spreadsheet or old CRM export in an afternoon. On Scale, your onboarding manager does the mapping with you.",
    },
    {
      q: "Do you charge for storage or contacts?",
      a: "No. There are no limits on contacts, companies, deals or attached files under 25 MB each.",
    },
    {
      q: "What happens to our data if we leave?",
      a: "Export everything as CSV at any time from Settings. After cancellation we keep the workspace for 30 days, then delete it.",
    },
  ],
};

export type Story = {
  slug: string;
  company: string;
  industry: string;
  size: "5–20 reps" | "21–60 reps" | "60+ reps";
  reps: number;
  region: string;
  switchedFrom: string;
  headline: string;
  summary: string;
  quote: { text: string; name: string; role: string };
  challenge: string[];
  approach: string[];
  results: { value: string; label: string }[];
  used: string[];
};

export const stories: Story[] = [
  {
    slug: "halvard-freight",
    company: "Halvard Freight",
    industry: "Logistics",
    size: "21–60 reps",
    reps: 38,
    region: "US Midwest",
    switchedFrom: "Shared spreadsheets",
    headline: "Halvard Freight called the quarter within 4% in week three.",
    summary:
      "Thirty-eight reps across four regional offices replaced eleven spreadsheets with one board and a Thursday call that ends on time.",
    quote: {
      text: "We stopped arguing about whose spreadsheet was right. Thursday's call went from ninety minutes to twenty-five.",
      name: "Odette Marchetti",
      role: "VP Sales",
    },
    challenge: [
      "Each regional office kept its own spreadsheet, with its own idea of what “likely” meant. The Thursday call was a reconciliation exercise: ninety minutes of reading numbers aloud and arguing over which version was current.",
      "Finance had stopped trusting the forecast. They built their own from booked revenue, which meant two numbers and a monthly meeting to explain the difference.",
    ],
    approach: [
      "Halvard mapped six stages with written exit criteria and imported 1,400 open deals in one afternoon. Reps were asked to do one thing in week one: move their own cards.",
      "From week two the call ran off the board. Each rep read their commit and best case, and the manager compared it against the weighted total on screen.",
    ],
    results: [
      { value: "±4%", label: "forecast accuracy, from ±31% the year before" },
      { value: "25 min", label: "Thursday call, down from 90" },
      { value: "11 → 1", label: "spreadsheets retired" },
    ],
    used: ["Deals board", "Forecast categories", "Weekly snapshots"],
  },
  {
    slug: "brightwater-staffing",
    company: "Brightwater Staffing",
    industry: "Recruiting",
    size: "5–20 reps",
    reps: 14,
    region: "Pacific Northwest",
    switchedFrom: "A legacy desktop CRM",
    headline:
      "Brightwater Staffing stopped losing clients when consultants went on leave.",
    summary:
      "Fourteen consultants share client relationships across shifts. The contact timeline made handovers a five-minute read.",
    quote: {
      text: "Covering a colleague's clients used to mean a twenty-minute phone handover. Now I read the card.",
      name: "Kwame Asante",
      role: "Senior Consultant",
    },
    challenge: [
      "Client notes lived in personal inboxes and a desktop CRM nobody updated from their phone. When a consultant was out, clients repeated themselves or went elsewhere.",
    ],
    approach: [
      "Every consultant connected their inbox in the first week. Calls from the browser dialer logged themselves, and next steps got dates.",
      "Monday mornings now start with the stale list: any client with no touch in fourteen days, sorted by open value.",
    ],
    results: [
      { value: "93%", label: "of client emails logged without manual work" },
      { value: "5 min", label: "average handover read" },
      {
        value: "2 of 3",
        label: "at-risk clients won back in the first quarter",
      },
    ],
    used: ["Contact timeline", "Inbox logging", "Browser dialer"],
  },
  {
    slug: "northbeam-solar",
    company: "Northbeam Solar",
    industry: "Energy",
    size: "21–60 reps",
    reps: 26,
    region: "Southwest",
    switchedFrom: "Paper site-survey forms",
    headline: "Northbeam Solar books installs from the driveway.",
    summary:
      "Field reps quote, log the survey and move the deal before they leave the customer's house, on a phone, in full sun.",
    quote: {
      text: "My reps update the board in the truck. I see Tuesday's surveys on Tuesday, not the following Monday.",
      name: "Lena Duarte",
      role: "Head of Residential Sales",
    },
    challenge: [
      "Survey forms were filled in on paper and typed up at the end of the week. Pipeline numbers were always five days old and installs were scheduled late.",
    ],
    approach: [
      "Northbeam built a stage for “Survey done” with a required roof-pitch field, and trained reps to move the card before driving away.",
    ],
    results: [
      { value: "5 days", label: "faster from survey to signed quote" },
      { value: "Same day", label: "board accuracy, from weekly" },
      { value: "+18%", label: "installs booked per rep per month" },
    ],
    used: ["Mobile web app", "Custom stages", "Required fields"],
  },
  {
    slug: "ostrander-vale",
    company: "Ostrander & Vale",
    industry: "Commercial printing",
    size: "5–20 reps",
    reps: 9,
    region: "New England",
    switchedFrom: "Email and a whiteboard",
    headline: "Ostrander & Vale turned a whiteboard into a forecast.",
    summary:
      "A nine-person print sales team kept their pipeline on an office whiteboard. Pipeline kept the board and added the math.",
    quote: {
      text: "We loved the whiteboard. Pipeline is the whiteboard, except it adds up and it's there when you're working from home.",
      name: "Harriet Cole",
      role: "Sales Director",
    },
    challenge: [
      "The whiteboard was beloved and wrong. Deals were rubbed out when lost, so nobody could tell why the spring quarter had gone soft.",
    ],
    approach: [
      "They recreated their whiteboard columns as stages, kept the Friday stand-up, and added a lost reason to every closed-lost deal.",
    ],
    results: [
      { value: "41", label: "lost deals with a reason in the first quarter" },
      { value: "1 hour", label: "to set up, by the sales director" },
      { value: "+12%", label: "win rate after pricing was fixed" },
    ],
    used: ["Deals board", "Lost reasons", "Stage conversion report"],
  },
  {
    slug: "kestrel-robotics",
    company: "Kestrel Robotics",
    industry: "Manufacturing",
    size: "60+ reps",
    reps: 72,
    region: "US and EU",
    switchedFrom: "An enterprise CRM",
    headline:
      "Kestrel Robotics cut their CRM bill and kept every field they used.",
    summary:
      "Seventy-two reps across two continents moved off an enterprise suite where they used a fifth of the features and paid for all of them.",
    quote: {
      text: "We audited what we actually used. It fitted on one page, and Pipeline covered all of it.",
      name: "Anouk Verbeek",
      role: "Revenue Operations Lead",
    },
    challenge: [
      "Their CRM had been customised by three consultancies over six years. Reps avoided it, and every report needed a ticket to RevOps.",
    ],
    approach: [
      "RevOps mapped 31 fields that were in active use, set up EU and US territories, and migrated over one weekend with the onboarding manager.",
    ],
    results: [
      { value: "−58%", label: "annual CRM spend" },
      { value: "31", label: "fields kept, from 214" },
      { value: "1 weekend", label: "migration, with zero lost deals" },
    ],
    used: ["Territories", "Field permissions", "SSO"],
  },
  {
    slug: "fernwood-dental-supply",
    company: "Fernwood Dental Supply",
    industry: "Healthcare distribution",
    size: "21–60 reps",
    reps: 22,
    region: "Southeast",
    switchedFrom: "Shared spreadsheets",
    headline:
      "Fernwood Dental Supply found the reorders hiding in its contact list.",
    summary:
      "Twenty-two reps sell consumables to dental practices. Sorting contacts by last touch turned quiet customers into a weekly call list.",
    quote: {
      text: "The reorder business was always there. We just couldn't see who had gone quiet.",
      name: "Marcus Ibe",
      role: "Regional Sales Manager",
    },
    challenge: [
      "Reorders from existing practices were treated as automatic. Nobody noticed when a practice stopped ordering until the annual review.",
    ],
    approach: [
      "Fernwood added every practice as a contact with an owner, and each rep now starts Monday with practices quiet for thirty days.",
    ],
    results: [
      { value: "$410k", label: "reorders recovered in the first two quarters" },
      { value: "30 days", label: "quiet threshold, reviewed every Monday" },
      { value: "22", label: "reps live in the first week" },
    ],
    used: ["Contacts table", "Last-touch sorting", "Scheduled digests"],
  },
];

export const customers = {
  title: "Customers",
  h1: "Sales teams that call the number with Pipeline.",
  lede: "Freight, staffing, solar, print, robotics and dental supply. Different products, the same Thursday call.",
};

export const changelog = {
  title: "Changelog",
  h1: "What changed, and when.",
  lede: "We ship on Tuesdays. Everything below is live for every workspace on the plans noted.",
  entries: [
    {
      date: "2026-10-13",
      version: "4.12",
      title: "Forecast snapshots compare any two weeks",
      body: "Pick two Thursdays and see every deal whose category, value or close date changed between them. The Team plan keeps twelve weeks; Scale keeps everything.",
      tags: ["Forecasting", "Team", "Scale"],
    },
    {
      date: "2026-09-29",
      version: "4.11",
      title: "Keyboard moves on the deals board",
      body: "Focus a card and use the arrow keys to move it between stages. Screen readers announce the new stage and the column total.",
      tags: ["Board", "Accessibility"],
    },
    {
      date: "2026-09-15",
      version: "4.10",
      title: "Lost reasons are required, and reported",
      body: "Admins can require a lost reason on Closed lost. A new report groups lost value by reason and by competitor named in the note.",
      tags: ["Reports", "Admin"],
    },
    {
      date: "2026-08-25",
      version: "4.9",
      title: "Browser dialer: voicemail drop",
      body: "Record a voicemail once and drop it with one click when a call goes to voicemail. The call still logs with its duration.",
      tags: ["Dialer", "Team"],
    },
    {
      date: "2026-08-04",
      version: "4.8",
      title: "EU hosting region",
      body: "New workspaces can choose EU hosting. Existing workspaces can request a migration from Settings → Data.",
      tags: ["Security"],
    },
    {
      date: "2026-07-14",
      version: "4.7",
      title: "Stale deals marker",
      body: "Cards with no activity for 14 days get a quiet marker on the board. The threshold is adjustable per pipeline.",
      tags: ["Board"],
    },
  ],
};

export const about = {
  title: "Company",
  h1: "Built by people who used to run the Thursday call.",
  lede: "Pipeline started in 2019 above a print shop in Providence. Two of us had spent a decade carrying quotas; the third had built the spreadsheet every sales team we knew was secretly running on.",
  story: [
    "Every CRM we had used was built for the people reading the reports, not the people filling it in. Reps updated it on Friday afternoon, from memory, because they had to. So the forecast was a guess with a database behind it.",
    "We started from the other end: the board a rep would keep open all day, because it saved them time. If the board is current, the forecast is honest without anyone being chased for it.",
    "Today Pipeline is 46 people in Providence and Lisbon, funded by customers. We sell it the way we built it: a two-week trial, a real demo on your data, and a Thursday call in week one.",
  ],
  principles: [
    {
      title: "The rep's time comes first",
      body: "Any field we add must save a rep more time than it costs them. If it only helps the report, it waits.",
    },
    {
      title: "One number, shown with its working",
      body: "Every forecast is shown next to the math that would challenge it. Disagreements become questions, not arguments.",
    },
    {
      title: "Your data leaves when you do",
      body: "Full CSV export, on every plan, at any time. No exit fees and no support ticket required.",
    },
  ],
  team: [
    {
      name: "Eleanor Batista",
      role: "Co-founder, CEO",
      note: "Twelve years selling freight software, four as a regional VP.",
    },
    {
      name: "Ruairi Dunne",
      role: "Co-founder, Product",
      note: "Built the forecasting spreadsheet that became Pipeline.",
    },
    {
      name: "Simone Achebe",
      role: "Co-founder, Engineering",
      note: "Previously led payments infrastructure at a regional bank.",
    },
    {
      name: "Kenji Moreau",
      role: "Head of Customer Success",
      note: "Has run over two hundred first pipeline reviews with customers.",
    },
    {
      name: "Talia Brandt",
      role: "Head of Sales",
      note: "Carries a quota and runs our own Thursday call, in Pipeline.",
    },
    {
      name: "Joaquim Reis",
      role: "Lisbon office lead",
      note: "Runs EU support and the EU hosting region.",
    },
  ],
  offices: [
    {
      city: "Providence",
      lines: ["418 Corliss Street, Floor 3", "Providence, RI 02903"],
    },
    { city: "Lisbon", lines: ["Rua do Arco 27, 2.º", "1200-019 Lisboa"] },
  ],
  hiring:
    "We're hiring two account executives and a support engineer for the Lisbon office.",
};

export const demo = {
  title: "Book a demo",
  h1: "See Pipeline on your own pipeline.",
  lede: "Thirty minutes with someone from our sales team. Send a spreadsheet export beforehand and we'll run the demo on your deals, not ours.",
  points: [
    "We'll map your stages and run one forecast call on your data",
    "You'll leave with a migration plan and an honest price",
    "No follow-up sequence unless you ask for one",
  ],
  sizes: ["1–4 reps", "5–20 reps", "21–60 reps", "60+ reps"],
  tools: [
    "Spreadsheets",
    "Another CRM",
    "Email and a whiteboard",
    "Nothing yet",
  ],
};

export const signin = {
  title: "Sign in",
  h1: "Sign in to your workspace",
  lede: "Use the email your admin invited. Or skip it and open the demo workspace.",
};

export const notFound = {
  title: "Page not found",
  h1: "This page fell out of the pipeline.",
  body: "The link may be old, or the page was never qualified. Try the board instead.",
};
