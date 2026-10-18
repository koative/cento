import workshop from "./assets/workshop.jpg";
import review from "./assets/review.jpg";
import board from "./assets/board.jpg";
import team from "./assets/team.jpg";
import whiteboard from "./assets/whiteboard.jpg";
import chart from "./assets/chart.jpg";
import desk from "./assets/desk.jpg";
import standup from "./assets/standup.jpg";
import pLindqvist from "./assets/p-lindqvist.jpg";
import pFerreira from "./assets/p-ferreira.jpg";
import pCastellanos from "./assets/p-castellanos.jpg";
import pWhitfield from "./assets/p-whitfield.jpg";
import pBrandt from "./assets/p-brandt.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Quadrant",
  sector: "Management consultancy",
  promise: "Strategy that survives Monday morning.",
  email: "hello@quadrant.example",
  careersEmail: "careers@quadrant.example",
  pressEmail: "press@quadrant.example",
  phone: "+1 555 014 0200",
  phoneHref: "tel:+15550140200",
  founded: 2009,
};

export const nav = [
  { to: "/capabilities", label: "Capabilities" },
  { to: "/industries", label: "Industries" },
  { to: "/insights", label: "Insights" },
  { to: "/people", label: "People" },
  { to: "/careers", label: "Careers" },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export type Office = {
  city: string;
  lines: string[];
  phone: string;
  phoneHref: string;
  note: string;
};

export const offices: Office[] = [
  {
    city: "Chicago",
    lines: ["330 North Wabash, Floor 21", "Chicago, IL 60611"],
    phone: "+1 555 014 0200",
    phoneHref: "tel:+15550140200",
    note: "Head office. Reception staffed 8:30 am – 6 pm, Monday to Friday.",
  },
  {
    city: "Boston",
    lines: ["100 Summer Street, Floor 14", "Boston, MA 02110"],
    phone: "+1 555 014 0300",
    phoneHref: "tel:+15550140300",
    note: "Healthcare and financial services teams.",
  },
  {
    city: "Denver",
    lines: ["1550 Wewatta Street, Suite 600", "Denver, CO 80202"],
    phone: "+1 555 014 0400",
    phoneHref: "tel:+15550140400",
    note: "Energy, utilities and the operations bench.",
  },
];

export const images = {
  workshop,
  review,
  board,
  team,
  whiteboard,
  chart,
  desk,
  standup,
};

/* ------------------------------------------------------------ exhibits */

export type Bar = { label: string; value: number; focus?: boolean };
export type ExhibitData = {
  title: string;
  /** Appended to every value, e.g. "%" or " days". */
  unit: string;
  bars: Bar[];
  source: string;
};

/* ------------------------------------------------------------ capabilities */

export type Phase = { name: string; weeks: string; text: string };

export type Capability = {
  slug: string;
  name: string;
  short: string;
  title: string;
  intro: string;
  questions: string[];
  approach: Phase[];
  deliverables: string[];
  duration: string;
  team: string;
  exhibit: ExhibitData;
  story: { client: string; situation: string; result: string };
  lead: string;
};

export const capabilities: Capability[] = [
  {
    slug: "strategy",
    name: "Strategy & portfolio",
    short: "Where to play, what to stop, and how to fund the bets that remain.",
    title: "Choose fewer bets and fund them properly.",
    intro:
      "Most strategies we are asked to review have eleven priorities and the budget for four. We help the executive team agree which four, write down what they are stopping, and move capital and people to match — in a plan the board can test and the business can run.",
    questions: [
      "Which of our business units should we grow, fix, or sell — and in what order?",
      "Our three-year plan assumes growth in every segment. Which assumption is weakest?",
      "We have twenty-six strategic initiatives. Which ones should the CEO personally own?",
      "Is the adjacent market we keep circling a real option or a distraction?",
    ],
    approach: [
      {
        name: "Fact base",
        weeks: "Weeks 1–3",
        text: "Segment-level economics, customer interviews and a competitor teardown, built from your own ledgers rather than market reports.",
      },
      {
        name: "Options",
        weeks: "Weeks 4–6",
        text: "Three to five genuinely different portfolio choices, each with its capital need, risk and a named owner who would have to deliver it.",
      },
      {
        name: "Choice",
        weeks: "Weeks 7–8",
        text: "Two working sessions with the executive team to pick one, and a written list of what stops on the Monday after.",
      },
      {
        name: "Plan",
        weeks: "Weeks 9–12",
        text: "Funding moves, a one-page scorecard and a twelve-month sequence the operating leaders sign.",
      },
    ],
    deliverables: [
      "Segment profit pools from your own general ledger",
      "Portfolio options paper for the board",
      "A written stop list with owners and dates",
      "Twelve-month resource plan and scorecard",
    ],
    duration: "10–12 weeks",
    team: "A partner, an engagement manager and three consultants, on site three days a week.",
    exhibit: {
      title:
        "Share of growth capital going to the two highest-return segments, before and after a portfolio review",
      unit: "%",
      bars: [
        { label: "Before review (median client)", value: 38 },
        { label: "Twelve months after", value: 61, focus: true },
        { label: "Top-quartile peers", value: 66 },
      ],
      source:
        "Quadrant portfolio reviews 2019–2025, n = 23 clients. Illustrative.",
    },
    story: {
      client: "A family-owned building-products group, $1.4B revenue",
      situation:
        "Seven divisions, each with its own growth plan and all of them underfunded.",
      result:
        "Sold two divisions, merged two more, and doubled the capital going to commercial roofing. Return on capital rose from 9% to 14% over two years.",
    },
    lead: "jonah-brandt",
  },
  {
    slug: "operating-model",
    name: "Operating model & organisation",
    short:
      "Structures, decision rights and governance that match the strategy.",
    title: "Design the organisation around the decisions it has to make.",
    intro:
      "Reorganisations usually start with boxes and end with confusion. We start with the thirty or forty decisions that actually move your results, agree who makes each one, and only then draw the structure, the committees and the spans that let those people decide quickly.",
    questions: [
      "Decisions take three meetings and still come back. Where are they getting stuck?",
      "We grew by acquisition and now run four head offices. What should be shared?",
      "Our regional model made sense in 2015. Does it still?",
      "How many layers should there be between the CEO and the front line?",
    ],
    approach: [
      {
        name: "Decision inventory",
        weeks: "Weeks 1–3",
        text: "Interviews and calendar analysis to map who really decides what, and how long it takes.",
      },
      {
        name: "Design principles",
        weeks: "Weeks 4–5",
        text: "Six to eight principles the leadership team agrees before any boxes are drawn.",
      },
      {
        name: "Structure and governance",
        weeks: "Weeks 6–9",
        text: "Structure options, spans and layers, a committee calendar and a decision-rights matrix.",
      },
      {
        name: "Transition",
        weeks: "Weeks 10–14",
        text: "Role descriptions, selection sequence and a communication plan written with HR, not around them.",
      },
    ],
    deliverables: [
      "Decision-rights matrix for the top forty decisions",
      "Target structure with spans, layers and cost",
      "Governance calendar replacing standing meetings",
      "Transition plan with selection sequence",
    ],
    duration: "12–16 weeks",
    team: "A partner, an engagement manager, three consultants and an organisation-design specialist.",
    exhibit: {
      title:
        "Median days from proposal to decision for capital requests over $2M",
      unit: " days",
      bars: [
        { label: "Before redesign", value: 74 },
        { label: "Six months after", value: 29, focus: true },
        { label: "Best-run client in our sample", value: 18 },
      ],
      source:
        "Quadrant operating-model engagements 2020–2025, n = 17 clients. Illustrative.",
    },
    story: {
      client: "A regional health system, 11 hospitals",
      situation:
        "Three legacy systems, three executive teams, and capital requests that took a quarter to approve.",
      result:
        "One system office, two layers removed, and a capital committee that meets monthly and decides on the day. Approval time fell from 74 to 29 days.",
    },
    lead: "amara-whitfield",
  },
  {
    slug: "operations",
    name: "Operations & supply chain",
    short: "Plants, networks and inventory, measured in cost, cash and days.",
    title: "Take cost and days out of the chain without breaking service.",
    intro:
      "We work on the floor, not from the boardroom. Our operations teams spend their first week in your plants, warehouses and planning rooms, then build the case for change from what they measured there — line by line, SKU by SKU, lane by lane.",
    questions: [
      "Service levels are falling even though inventory is at a record high. Why?",
      "Should we run four distribution centres or six?",
      "One plant makes money and its twin does not. What is different?",
      "How much working capital is tied up in safety stock nobody asked for?",
    ],
    approach: [
      {
        name: "Floor diagnostic",
        weeks: "Weeks 1–2",
        text: "Time on site at every major node, with operators and planners, against a common set of measures.",
      },
      {
        name: "Root causes",
        weeks: "Weeks 3–5",
        text: "A quantified issue tree from policy to shop floor, with every number traced to your systems.",
      },
      {
        name: "Pilot",
        weeks: "Weeks 6–11",
        text: "Change one line, one DC or one planning cycle, and measure it weekly with the people who run it.",
      },
      {
        name: "Roll-out",
        weeks: "Weeks 12–20",
        text: "A wave plan for the network, local owners and a weekly performance dialogue that outlives us.",
      },
    ],
    deliverables: [
      "Network and inventory baseline by SKU and node",
      "Quantified issue tree with owners",
      "Pilot results measured weekly",
      "Roll-out waves and performance routines",
    ],
    duration: "14–20 weeks",
    team: "A partner, an engagement manager and four consultants, with a lean practitioner on each site.",
    exhibit: {
      title:
        "Days of inventory on hand at a specialty distributor, by quarter of the programme",
      unit: " days",
      bars: [
        { label: "Baseline", value: 96 },
        { label: "Quarter 1", value: 88 },
        { label: "Quarter 2", value: 74 },
        { label: "Quarter 3", value: 63, focus: true },
      ],
      source:
        "Quadrant client data, specialty chemicals distribution, 2024. Illustrative.",
    },
    story: {
      client: "A specialty chemicals distributor, 4,000 people",
      situation:
        "Record inventory, falling fill rates and a planning team working from eleven spreadsheets.",
      result:
        "Released $112M of working capital in three quarters while fill rate rose from 91% to 97%.",
    },
    lead: "daniel-ferreira",
  },
  {
    slug: "pricing",
    name: "Pricing & commercial",
    short:
      "Price setting, discount discipline and sales coverage that pays back.",
    title: "Price for the value you deliver, one segment at a time.",
    intro:
      "A one-point improvement in price usually does more for operating profit than a one-point gain in volume or cost. We find the value your customers already recognise, set prices segment by segment, and give sales teams the rules and tools to hold them.",
    questions: [
      "We announced a 6% increase. Why did only 2% reach the P&L?",
      "Which customers are we serving at a loss without knowing it?",
      "Our discount authority sits with 140 people. Should it?",
      "How should we price a new service line nobody else offers?",
    ],
    approach: [
      {
        name: "Price waterfall",
        weeks: "Weeks 1–3",
        text: "Invoice-level analysis from list price to pocket price for every customer and product family.",
      },
      {
        name: "Segments and value",
        weeks: "Weeks 4–6",
        text: "Customer interviews and conjoint work to find where you are under-priced and where you are exposed.",
      },
      {
        name: "Rules and tools",
        weeks: "Weeks 7–10",
        text: "Price corridors, discount authority, deal-desk routines and a quote tool your reps will actually open.",
      },
      {
        name: "Launch",
        weeks: "Weeks 11–14",
        text: "Wave-by-wave roll-out with weekly leakage tracking and coaching for the field.",
      },
    ],
    deliverables: [
      "Invoice-level price waterfall",
      "Segment price corridors",
      "Discount authority matrix and deal-desk routine",
      "Weekly leakage dashboard",
    ],
    duration: "10–14 weeks",
    team: "A partner, an engagement manager, three consultants and a pricing analytics lead.",
    exhibit: {
      title: "Where a 6% list-price increase went, percentage points",
      unit: " pts",
      bars: [
        { label: "Announced increase", value: 6 },
        { label: "Lost to on-invoice discounts", value: 1.9 },
        { label: "Lost to rebates and terms", value: 1.4 },
        { label: "Lost to mix and freight", value: 0.7 },
        { label: "Reached the P&L", value: 2, focus: true },
      ],
      source:
        "Quadrant price-waterfall analyses 2021–2025, median of 14 industrial clients. Illustrative.",
    },
    story: {
      client: "An industrial components maker, $780M revenue",
      situation:
        "Price increases announced every January and quietly given back by March.",
      result:
        "Price realisation rose from 34% to 81% of announced increases; operating margin up 2.6 points in eighteen months.",
    },
    lead: "theo-castellanos",
  },
  {
    slug: "cost",
    name: "Cost transformation",
    short:
      "Zero-based reviews of overhead and spend, owned by the managers who run them.",
    title:
      "Cut cost the way you would build a budget: from zero, line by line.",
    intro:
      "Across-the-board cuts punish the well-run teams and spare the rest. We help each budget owner rebuild their spend from what the business actually needs, challenge it in the open, and lock the savings into next year's plan so they do not quietly grow back.",
    questions: [
      "We cut 10% across the board three years ago. Why is cost back where it started?",
      "Which of our overhead functions are over-built for the company we are now?",
      "How do we save on third-party spend without starving the business?",
      "Can we fund our growth plan from inside the current cost base?",
    ],
    approach: [
      {
        name: "Baseline",
        weeks: "Weeks 1–3",
        text: "Every cost line mapped to an owner, an activity and a driver — people, vendors and systems.",
      },
      {
        name: "Rebuild",
        weeks: "Weeks 4–8",
        text: "Budget owners rebuild from zero with templates, benchmarks and a Quadrant consultant at their side.",
      },
      {
        name: "Challenge",
        weeks: "Weeks 9–10",
        text: "Open challenge sessions where peers and the CFO test every proposal on the record.",
      },
      {
        name: "Lock-in",
        weeks: "Weeks 11–16",
        text: "Savings written into the plan, tracked monthly and tied to incentives.",
      },
    ],
    deliverables: [
      "Owner-level cost baseline",
      "Zero-based budgets for every function",
      "Challenge-session record and decisions",
      "Savings tracker wired into the monthly close",
    ],
    duration: "12–16 weeks",
    team: "A partner, an engagement manager and four consultants, plus procurement specialists as needed.",
    exhibit: {
      title:
        "Overhead savings still in the cost base two years later, by approach",
      unit: "%",
      bars: [
        { label: "Across-the-board cut", value: 31 },
        { label: "Top-down targets per function", value: 52 },
        { label: "Zero-based, owner-built", value: 84, focus: true },
      ],
      source:
        "Quadrant client follow-ups 2018–2025, n = 29 programmes. Illustrative.",
    },
    story: {
      client: "A national insurance broker, 6,500 people",
      situation:
        "Three earlier cost programmes, each one reversed within eighteen months.",
      result:
        "$64M of run-rate savings, 88% of them still in place two years on, and $20M re-invested in claims technology.",
    },
    lead: "kenji-mori",
  },
  {
    slug: "integration",
    name: "Mergers & integration",
    short:
      "Diligence, day-one readiness and the first hundred days after close.",
    title:
      "Capture the deal case in the first hundred days, not the third year.",
    intro:
      "Synergies are easiest to capture before the two organisations settle into their habits. We help acquirers test the deal case during diligence, run a lean integration office from signing to close, and deliver the decisions that matter in the first hundred days.",
    questions: [
      "Is the synergy case in our model achievable, and by when?",
      "What has to be true on day one so customers notice nothing?",
      "Which leaders do we keep, and how fast do we decide?",
      "Our last integration took four years. What went wrong?",
    ],
    approach: [
      {
        name: "Diligence",
        weeks: "Before signing",
        text: "Bottom-up synergy validation, culture interviews and a list of the five things that could break the deal.",
      },
      {
        name: "Integration office",
        weeks: "Signing to close",
        text: "A small office, clean-team analysis and a day-one checklist with owners.",
      },
      {
        name: "First hundred days",
        weeks: "Close to day 100",
        text: "Leadership selection, operating model, quick wins and a weekly synergy tracker.",
      },
      {
        name: "Hand-over",
        weeks: "Day 100–180",
        text: "The integration office hands over to the line with targets in the budget.",
      },
    ],
    deliverables: [
      "Synergy case validated bottom-up",
      "Day-one readiness checklist",
      "Hundred-day plan and leadership slate",
      "Weekly synergy tracker",
    ],
    duration: "From signing to day 180",
    team: "A partner, an integration lead, and a team that grows from two to six through close.",
    exhibit: {
      title: "Share of planned cost synergies captured by month 12",
      unit: "%",
      bars: [
        { label: "Acquirers without an integration office", value: 42 },
        { label: "Integration office set up after close", value: 63 },
        {
          label: "Integration office set up at signing",
          value: 89,
          focus: true,
        },
      ],
      source:
        "Quadrant integration work 2016–2025, n = 31 transactions. Illustrative.",
    },
    story: {
      client: "A dental-services group acquiring a 140-practice rival",
      situation:
        "A synergy case of $38M and a board that remembered the last deal.",
      result:
        "$41M captured by month 14, with patient retention above 96% through the brand change.",
    },
    lead: "priya-raman",
  },
];

/* ------------------------------------------------------------ industries */

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  agenda: string[];
  note: string;
  partner: string;
  /** Engagements in the last three years, keyed by capability slug. */
  work: Record<string, number>;
};

export const industries: Industry[] = [
  {
    slug: "industrial",
    name: "Industrial & distribution",
    summary:
      "Manufacturers and distributors between $300M and $5B in revenue, many of them family- or sponsor-owned.",
    agenda: [
      "Price realisation after three years of cost inflation",
      "Plant-to-plant performance gaps",
      "Working capital tied up in safety stock",
      "Bolt-on acquisitions and what to integrate",
    ],
    note: "Our largest practice: about a third of the firm's work, run mostly from Chicago and Denver.",
    partner: "daniel-ferreira",
    work: {
      strategy: 9,
      "operating-model": 6,
      operations: 22,
      pricing: 17,
      cost: 8,
      integration: 11,
    },
  },
  {
    slug: "consumer",
    name: "Consumer & retail",
    summary:
      "Branded manufacturers, specialty retailers and restaurant groups selling through more channels than they can manage.",
    agenda: [
      "Range rationalisation and the long tail of SKUs",
      "Store and channel portfolio choices",
      "Promotion spend that pays back",
      "Supply chains built for two channels, now serving five",
    ],
    note: "Strong in mid-size branded goods; we do not work for the largest grocers.",
    partner: "theo-castellanos",
    work: {
      strategy: 8,
      "operating-model": 4,
      operations: 9,
      pricing: 12,
      cost: 6,
      integration: 3,
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare providers",
    summary:
      "Health systems, physician groups and multi-site dental and specialty platforms.",
    agenda: [
      "System-office design after a merger",
      "Clinical labour productivity without burnout",
      "Service-line portfolio and outpatient shift",
      "Integration of acquired practices",
    ],
    note: "Run from Boston. We do not work for payers, so we never sit on both sides of a contract.",
    partner: "amara-whitfield",
    work: {
      strategy: 6,
      "operating-model": 13,
      operations: 7,
      pricing: 1,
      cost: 9,
      integration: 10,
    },
  },
  {
    slug: "financial",
    name: "Financial services",
    summary:
      "Regional banks, insurance brokers, wealth managers and specialty lenders.",
    agenda: [
      "Overhead that grew faster than assets",
      "Branch and adviser network choices",
      "Operations and claims transformation",
      "Integrating roll-up acquisitions",
    ],
    note: "Mostly operating-model and cost work; we leave risk and regulatory advice to specialists.",
    partner: "kenji-mori",
    work: {
      strategy: 5,
      "operating-model": 8,
      operations: 6,
      pricing: 4,
      cost: 14,
      integration: 7,
    },
  },
  {
    slug: "energy",
    name: "Energy & utilities",
    summary:
      "Regulated utilities, midstream operators and the contractors that serve them.",
    agenda: [
      "Capital programmes that deliver on schedule",
      "Field-workforce productivity",
      "Portfolio moves in the energy transition",
      "Rate-case readiness and cost baselines",
    ],
    note: "Run from Denver, with field teams that spend more time in trucks than in offices.",
    partner: "jonah-brandt",
    work: {
      strategy: 7,
      "operating-model": 5,
      operations: 11,
      pricing: 0,
      cost: 8,
      integration: 2,
    },
  },
  {
    slug: "public",
    name: "Public sector & nonprofit",
    summary:
      "State agencies, universities and large nonprofits, usually at a reduced fee.",
    agenda: [
      "Shared services across departments",
      "Strategy and portfolio choices for foundations",
      "Service redesign with the people who use it",
      "Budget pressure without cutting the front line",
    ],
    note: "About one engagement in ten, chosen by a committee of our own staff each spring.",
    partner: "margit-lindqvist",
    work: {
      strategy: 6,
      "operating-model": 7,
      operations: 3,
      pricing: 0,
      cost: 4,
      integration: 1,
    },
  },
];

/* ------------------------------------------------------------ people */

export type Person = {
  id: string;
  name: string;
  role: string;
  office: string;
  practice: string;
  photo?: string;
  bio: string[];
  before: string;
  education: string;
  partner: boolean;
};

export const people: Person[] = [
  {
    id: "margit-lindqvist",
    name: "Margit Lindqvist",
    role: "Managing partner",
    office: "Chicago",
    practice: "Firm leadership",
    photo: pLindqvist,
    bio: [
      "Margit co-founded Quadrant in 2009 after fourteen years leading operations work at a large global consultancy. She still leads two client engagements a year, usually for CEOs in their first eighteen months.",
      "She chairs the committee that selects the firm's pro-bono work and teaches a negotiation course for first-year consultants every September.",
    ],
    before:
      "Partner, global consulting firm; plant manager, food manufacturing",
    education:
      "MBA, University of Chicago; BSc Industrial Engineering, Lund University",
    partner: true,
  },
  {
    id: "daniel-ferreira",
    name: "Daniel Ferreira",
    role: "Partner, Operations & supply chain",
    office: "Denver",
    practice: "operations",
    photo: pFerreira,
    bio: [
      "Daniel leads the operations practice and has spent more of the last decade in distribution centres than in offices. His teams have worked in over 120 plants and warehouses across North America.",
      "Before consulting he ran planning for a building-materials distributor, which is why his first question is always about the forecast.",
    ],
    before:
      "Director of supply chain planning, building-materials distribution",
    education: "MS Operations Research, Georgia Tech",
    partner: true,
  },
  {
    id: "theo-castellanos",
    name: "Theo Castellanos",
    role: "Partner, Pricing & commercial",
    office: "Chicago",
    practice: "pricing",
    photo: pCastellanos,
    bio: [
      "Theo built Quadrant's pricing practice from a two-person team in 2014. He works mostly with industrial and branded-goods companies on price realisation and sales coverage.",
      "He writes the firm's annual price-realisation study and is the reason every proposal we send has a price waterfall in it.",
    ],
    before:
      "Pricing lead, industrial distribution; economist, federal reserve bank",
    education: "PhD Economics, Northwestern University",
    partner: true,
  },
  {
    id: "amara-whitfield",
    name: "Amara Whitfield",
    role: "Partner, Operating model & organisation",
    office: "Boston",
    practice: "operating-model",
    photo: pWhitfield,
    bio: [
      "Amara leads organisation work and the healthcare practice. She has redesigned system offices for nine health systems and has opinions about steering committees that she will share at length.",
      "She sits on the board of a community health centre in Dorchester and mentors the firm's disability employee network.",
    ],
    before: "Vice president of strategy, academic medical centre",
    education: "MPH and MBA, Boston University",
    partner: true,
  },
  {
    id: "jonah-brandt",
    name: "Jonah Brandt",
    role: "Partner, Strategy & portfolio",
    office: "Denver",
    practice: "strategy",
    photo: pBrandt,
    bio: [
      "Jonah works with chief executives and boards on portfolio choices, growth bets and the occasional exit. He leads the energy and utilities practice from Denver.",
      "He is the author of the firm's internal guide to writing action titles, which every new consultant reads in week one.",
    ],
    before: "Corporate development, regional utility",
    education: "MBA, INSEAD; BA Philosophy, University of Colorado",
    partner: true,
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    role: "Principal, Mergers & integration",
    office: "Chicago",
    practice: "integration",
    bio: [
      "Priya runs integration offices for acquirers from signing through day 180, and leads our diligence work for private-equity sponsors.",
      "She has worked on thirty-one transactions, from two-practice dental roll-ups to a $3B industrial merger.",
    ],
    before: "Integration manager, specialty chemicals",
    education: "MBA, Kellogg School of Management",
    partner: false,
  },
  {
    id: "kenji-mori",
    name: "Kenji Mori",
    role: "Principal, Cost transformation",
    office: "Boston",
    practice: "cost",
    bio: [
      "Kenji leads zero-based cost programmes and the financial-services practice. He believes the budget owner should always hold the pen.",
      "He spent six years in finance at an insurance broker before joining Quadrant in 2016.",
    ],
    before: "Finance director, insurance brokerage",
    education: "CPA; BS Accounting, Boston College",
    partner: false,
  },
  {
    id: "ruth-okonkwo",
    name: "Ruth Okonkwo",
    role: "Director, Analytics",
    office: "Chicago",
    practice: "Firm leadership",
    bio: [
      "Ruth leads the twelve-person analytics team that builds every fact base we use, from invoice-level price waterfalls to network models.",
      "Her rule: every number in a client document traces back to a system of record in two clicks.",
    ],
    before: "Data science lead, logistics software company",
    education: "MS Statistics, University of Illinois",
    partner: false,
  },
  {
    id: "lukas-varga",
    name: "Lukas Varga",
    role: "Engagement manager",
    office: "Denver",
    practice: "operations",
    bio: [
      "Lukas manages operations engagements in energy and industrial clients, typically with teams of four on site.",
      "He joined as an associate in 2018 and has led two of our largest network redesigns.",
    ],
    before: "Associate, Quadrant",
    education: "BS Mechanical Engineering, Colorado School of Mines",
    partner: false,
  },
  {
    id: "sofia-albrecht",
    name: "Sofia Albrecht",
    role: "Head of people",
    office: "Chicago",
    practice: "Firm leadership",
    bio: [
      "Sofia leads recruiting, staffing and development for the firm's 140 people, and runs the case-interview training every candidate is offered before their first round.",
      "She introduced the firm's four-week sabbatical after every five years of service.",
    ],
    before: "HR director, professional services",
    education: "MA Organisational Psychology, Columbia University",
    partner: false,
  },
];

/* ------------------------------------------------------------ insights */

export type Block =
  | { p: string }
  | { h: string }
  | { quote: string; by: string }
  | { list: string[] }
  | { exhibit: ExhibitData };

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  type: "Article" | "Research" | "Briefing";
  capability: string;
  date: string;
  author: string;
  minutes: number;
  image?: string;
  body: Block[];
};

export const insights: Insight[] = [
  {
    slug: "price-increases-leak",
    title: "Most price increases leak before they reach the P&L",
    dek: "Our study of fourteen industrial companies found that two-thirds of announced increases were given back through discounts, rebates and mix. The leaks are predictable, and so are the fixes.",
    type: "Research",
    capability: "pricing",
    date: "2026-09-29",
    author: "theo-castellanos",
    minutes: 9,
    body: [
      {
        p: "Every January for the past three years, most industrial companies we know have announced a price increase. Most of them have also quietly given a large share of it back by the end of the first quarter. We wanted to know how much, and where it went.",
      },
      {
        p: "We traced invoice-level data for fourteen clients — about 2.3 million invoice lines — from list price down to the pocket price that actually reached the income statement. The median company announced 6% and realised 2%.",
      },
      { exhibit: capabilitiesExhibit("pricing") },
      { h: "Three leaks account for almost all of it" },
      {
        p: "On-invoice discounts are the largest leak, and the most visible: a rep under volume pressure offers back half the increase to keep a top account. Rebates and payment terms are the second, and the least visible, because they are booked months later and often in a different ledger. Mix and freight make up the rest.",
      },
      {
        list: [
          "On-invoice discounts: 1.9 points, concentrated in the top 40 accounts.",
          "Rebates and extended terms: 1.4 points, mostly negotiated after the increase was announced.",
          "Mix and freight absorption: 0.7 points, driven by customers shifting to smaller, more frequent orders.",
        ],
      },
      { h: "What the companies that held their price did differently" },
      {
        p: "Four companies in the sample realised more than 70% of their announced increase. None of them had a better product or a weaker competitor. What they had in common was discipline in three places: they set price corridors per segment rather than one list price, they cut discount authority to a handful of people, and they reviewed leakage weekly rather than quarterly.",
      },
      {
        quote:
          "We did not change a single price for six weeks. We changed who was allowed to give one away.",
        by: "Chief commercial officer, industrial components client",
      },
      {
        p: "None of this requires new software. It requires an invoice-level waterfall, a short list of people allowed to say yes, and a meeting every Monday where someone has to explain the exceptions.",
      },
    ],
  },
  {
    slug: "two-by-two-is-not-a-strategy",
    title: "The two-by-two is not a strategy. It is the start of an argument.",
    dek: "Consultants are famous for the matrix. Used well, it forces a leadership team to disagree about the right things, early, and on the record.",
    type: "Article",
    capability: "strategy",
    date: "2026-09-08",
    author: "jonah-brandt",
    minutes: 6,
    image: board,
    body: [
      {
        p: "We named the firm after a diagram, so we should probably defend it. The two-by-two matrix is the most mocked tool in management consulting, and the mockery is mostly deserved: too many of them arrive with every dot already placed and every conclusion already drawn.",
      },
      {
        p: "Used properly, the matrix does something no spreadsheet does. It forces a leadership team to agree on two axes — the two things that matter most for this decision — and then to argue in public about where each initiative sits.",
      },
      { h: "Choose the axes together" },
      {
        p: "The axes are the strategy. If the CFO thinks the important dimension is payback and the COO thinks it is execution risk, no amount of plotting will produce agreement. Spend the first hour agreeing the axes and you have done half the work.",
      },
      { h: "Place the dots in the room" },
      {
        p: "We hand each executive a set of initiatives and ask them to place them alone, then compare. The disagreements are the agenda. An initiative that one leader puts in the top right and another puts in the bottom left is an initiative the team does not understand yet.",
      },
      {
        quote:
          "The value was never in the chart. It was in the forty minutes we spent arguing about one dot.",
        by: "Chief executive, building-products client",
      },
      {
        p: "Then write down what the matrix means. Top right gets funded this quarter. Top left gets a capability plan before it gets money. Bottom right goes to someone who is not on the executive team. Bottom left stops, in writing, with a date.",
      },
    ],
  },
  {
    slug: "steering-committee",
    title: "Your steering committee meets too often and decides too little",
    dek: "A one-page checklist for the committee that is supposed to run your transformation.",
    type: "Briefing",
    capability: "operating-model",
    date: "2026-08-19",
    author: "margit-lindqvist",
    minutes: 4,
    body: [
      {
        p: "In almost every transformation we are called into, there is a steering committee. In most of them, it has become a status meeting with better biscuits. Here is the checklist we use to fix that.",
      },
      {
        list: [
          "Meet monthly, not weekly. Weekly meetings invite status updates; monthly meetings force decisions.",
          "Send a decision paper five working days ahead, and nothing else. No decks in the room.",
          "Every agenda item ends in a decision, a named owner and a date. If it cannot, it comes off the agenda.",
          "Seven members at most. Everyone else can read the minutes.",
          "Review the decisions taken, not the work done. Progress belongs in a dashboard.",
          "Close every meeting by asking what the committee is not seeing.",
        ],
      },
      {
        p: "None of these rules is new. What is rare is a chair willing to enforce them for the first three months, until they become habit.",
      },
    ],
  },
  {
    slug: "inventory-is-a-decision",
    title: "Inventory is a decision someone made — find out who",
    dek: "Excess stock is rarely an accident. It is the sum of hundreds of small, sensible decisions taken by people who never see the total.",
    type: "Article",
    capability: "operations",
    date: "2026-07-22",
    author: "daniel-ferreira",
    minutes: 7,
    image: whiteboard,
    body: [
      {
        p: "When inventory climbs, executives ask the supply chain team why. The supply chain team usually has a good answer: safety stock was raised after last year's shortages, suppliers lengthened lead times, sales asked for more buffer on key accounts. Each decision was reasonable. Together they added thirty days.",
      },
      { h: "Trace every day of inventory to a policy" },
      {
        p: "We build what we call a days bridge: starting from a theoretical minimum and adding each policy that sits on top of it — review periods, safety-stock settings, minimum order quantities, service targets by customer. Every day has an owner.",
      },
      { exhibit: capabilitiesExhibit("operations") },
      {
        p: "The bridge does two things. It shows that most excess inventory comes from four or five policies, not hundreds of SKUs. And it gives each policy owner a number they can change on Monday.",
      },
      {
        quote:
          "We had been asking the planners to cut inventory for two years. They did not set the targets. Sales did.",
        by: "Chief operating officer, specialty chemicals client",
      },
      { h: "Change the policy, then the plan" },
      {
        p: "Planners cannot reduce inventory that the policies require. Fix the policies first — with the people who own them in the room — and the planning system will follow within a quarter.",
      },
    ],
  },
  {
    slug: "zero-based-owner-built",
    title:
      "Zero-based budgeting works when managers write the budget, not finance",
    dek: "Why owner-built cost programmes keep their savings and top-down ones lose them.",
    type: "Research",
    capability: "cost",
    date: "2026-06-30",
    author: "kenji-mori",
    minutes: 8,
    body: [
      {
        p: "Zero-based budgeting has a reputation problem. Many executives remember it as a finance-led exercise that produced a spreadsheet nobody believed and savings that evaporated within two years. Our follow-up data shows that reputation is earned — but only for one way of doing it.",
      },
      { exhibit: capabilitiesExhibit("cost") },
      { h: "Who holds the pen matters most" },
      {
        p: "In the programmes where savings held, budget owners rebuilt their own spend from zero, with templates and benchmarks but without a target handed down. Finance designed the process and chaired the challenge sessions. It did not write the numbers.",
      },
      {
        p: "That sounds slower. It is, by about three weeks. It is also the only approach in our sample where more than four-fifths of the savings were still in the cost base two years later.",
      },
      { h: "Make the challenge public" },
      {
        p: "The second ingredient is the challenge session: a room where each owner presents their rebuilt budget to peers and the CFO, and every question and answer is recorded. Peers ask better questions than finance does, because they know where the slack is.",
      },
      {
        list: [
          "Give owners a blank template, not last year's budget.",
          "Separate what the business must do from how well it must do it.",
          "Record every challenge and every decision.",
          "Tie the result to next year's incentives, not this year's bonus.",
        ],
      },
    ],
  },
  {
    slug: "first-hundred-days",
    title: "The first hundred days decide whether the deal case was right",
    dek: "Integration lessons from thirty-one transactions, and the one decision acquirers delay most.",
    type: "Article",
    capability: "integration",
    date: "2026-05-27",
    author: "priya-raman",
    minutes: 6,
    image: review,
    body: [
      {
        p: "Acquirers spend months on the price and weeks on the plan for what happens after. Our data from thirty-one transactions suggests the balance is wrong: the share of planned synergies captured by month twelve depends far more on when the integration office starts than on how good the model was.",
      },
      { exhibit: capabilitiesExhibit("integration") },
      { h: "Decide the leadership slate early" },
      {
        p: "The decision acquirers delay most is who leads the combined business, two layers down. Every week without an answer, good people take calls from recruiters. The best integrations we have seen named the top sixty roles by day thirty.",
      },
      {
        quote:
          "We spent nine months on the price and nine days on the org chart. We got the price right.",
        by: "Chief executive, dental-services client",
      },
      {
        p: "Start at signing, name the leaders early, and keep the integration office small: five to eight people with the authority to decide, not a hundred people reporting status.",
      },
    ],
  },
  {
    slug: "spans-and-layers",
    title:
      "Spans and layers still matter — just not the way the 2010s taught us",
    dek: "A survey of 40 mid-size companies on management structure, hybrid work and the speed of decisions.",
    type: "Research",
    capability: "operating-model",
    date: "2026-04-14",
    author: "amara-whitfield",
    minutes: 10,
    image: standup,
    body: [
      {
        p: "A decade ago, the organisation-design playbook was simple: widen spans, remove layers, save cost. Many of our clients did exactly that. Our survey of forty mid-size companies suggests the next round of gains will come from somewhere else.",
      },
      { h: "Layers predict speed better than spans" },
      {
        p: "Across the sample, the number of layers between the chief executive and the front line was a stronger predictor of decision speed than the average span of control. Companies with six layers or fewer took less than half as long to approve a $2M capital request as those with eight or more.",
      },
      { exhibit: capabilitiesExhibit("operating-model") },
      { h: "Hybrid work changed what a manager does" },
      {
        p: "Managers in hybrid teams report spending a third more time on coordination than they did in 2019. Pushing spans wider without removing that coordination load simply moved the work to evenings.",
      },
      {
        list: [
          "Count layers first; they matter more than spans.",
          "Write down who decides before you redraw who reports to whom.",
          "Budget manager time for coordination explicitly in hybrid teams.",
        ],
      },
      {
        p: "The full survey, with results by sector and size band, is available to participants and clients on request.",
      },
    ],
  },
];

/** Reuses a capability's exhibit inside an article, so one dataset never drifts into two. */
function capabilitiesExhibit(slug: string): ExhibitData {
  const cap = capabilities.find((c) => c.slug === slug);
  if (!cap) throw new Error(`No capability ${slug}`);
  return cap.exhibit;
}

/* ------------------------------------------------------------ the matrix */

export type Initiative = {
  id: string;
  name: string;
  readiness: number;
  value: number;
};

export const matrix = {
  axes: { x: "Readiness to execute", y: "Value at stake" },
  presets: [
    {
      id: "i1",
      name: "Consolidate three ERP systems",
      readiness: 28,
      value: 78,
    },
    {
      id: "i2",
      name: "Reprice the long tail of SKUs",
      readiness: 74,
      value: 70,
    },
    { id: "i3", name: "Enter the Canadian market", readiness: 22, value: 44 },
    { id: "i4", name: "Shared-services finance hub", readiness: 62, value: 58 },
    {
      id: "i5",
      name: "Retire the legacy loyalty scheme",
      readiness: 81,
      value: 24,
    },
    {
      id: "i6",
      name: "Night-shift automation pilot",
      readiness: 35,
      value: 18,
    },
  ] satisfies Initiative[],
  /** Quadrants in reading order: top-left, top-right, bottom-left, bottom-right. */
  quadrants: [
    {
      id: "build",
      name: "Build first",
      verdict:
        "High value, but the organisation is not ready. Fund the capability before the initiative.",
      capability: "operating-model",
    },
    {
      id: "move",
      name: "Move now",
      verdict:
        "High value and ready. Fund it this quarter and give it a named executive owner.",
      capability: "strategy",
    },
    {
      id: "park",
      name: "Stop or park",
      verdict: "Low value and hard to do. Stop it in writing, with a date.",
      capability: "cost",
    },
    {
      id: "delegate",
      name: "Delegate",
      verdict:
        "Easy but small. Hand it to someone below the executive team and stop reviewing it.",
      capability: "operations",
    },
  ],
};

/* ------------------------------------------------------------ home */

export const home = {
  title: "Strategy that survives Monday morning.",
  lede: "Quadrant is an independent management consultancy of 140 people in Chicago, Boston and Denver. We work with executive teams at mid-size companies on the decisions that set the next five years — and we stay until the numbers move.",
  photoCaption:
    "Margit Lindqvist running an option-setting session with a client's operating leaders, Chicago.",
  method: {
    title: "Every engagement answers the question first and proves it after.",
    text: "By the end of week two you will have our working answer on one page. The rest of the engagement exists to test it, break it if it is wrong, and turn it into a plan your own people can carry out.",
    steps: [
      {
        when: "Week 0",
        what: "One question, agreed in writing with the chief executive.",
      },
      {
        when: "Week 2",
        what: "A working answer on one page, and the three facts that would change it.",
      },
      {
        when: "Week 6",
        what: "The answer tested with the people who will have to deliver it.",
      },
      {
        when: "Week 12",
        what: "A plan with owners, money and dates — and our fee partly at risk against it.",
      },
    ],
  },
  matrix: {
    title: "Plot your own agenda before you talk to anyone.",
    text: "This is the exercise we run in the first workshop of most strategy engagements. Drag each initiative — or select it and use the arrow keys — to where your team would honestly place it. Rename them, add your own, and read the memo it writes.",
  },
  cases: {
    title:
      "We are judged on what changed a year later, not on the final presentation.",
  },
  quote: {
    text: "They told us in week two what they thought the answer was, then spent ten weeks trying to prove themselves wrong. They couldn't. That is the only reason the board believed it.",
    by: "Chief executive",
    org: "Specialty chemicals distributor, Quadrant client since 2022",
  },
  industries: {
    title: "Six industries, chosen because we know how their money moves.",
  },
  insights: {
    title: "Recent writing, signed by the partners who did the work.",
  },
  people: {
    title: "Small enough that the partner who sells the work does the work.",
    text: "Every engagement has a partner in the room at least two days a week. We hire people who have run something before they advised on it, and we keep them: average tenure at the firm is seven years.",
    caption: "A Tuesday review of a pricing engagement, Chicago office.",
  },
  close: {
    title: "Bring us the problem you would rather not put in the board pack.",
    text: "A partner will reply within two working days, and the first conversation is never billed.",
  },
};

/* ------------------------------------------------------------ pages */

export const capabilitiesPage = {
  title:
    "Six capabilities, each led by a partner who has run the thing they advise on.",
  lede: "We keep the list short on purpose. Each capability has its own bench of specialists, its own analytics, and a lead who has held the operating job before advising on it.",
  feesTitle: "How we price the work",
  fees: [
    "Fixed fee per phase, agreed before work starts. No hourly billing and no surprise extensions.",
    "On most programmes, 20% of our fee is at risk against outcomes we agree with you in writing.",
    "Typical engagements run from $450,000 to $2.4M, depending on scope and team size.",
  ],
};

export const industriesPage = {
  title: "We go deep in six industries rather than wide in twenty.",
  lede: "Each industry has a lead partner and a standing team who have worked with its economics for years. The grid below counts our engagements over the last three years, so you can see where our experience actually sits.",
  exhibitTitle: "Engagements by industry and capability, last three years",
  exhibitSource: "Quadrant engagement records, October 2023 – September 2026.",
};

export const insightsPage = {
  title: "Research and writing from the work, by the people doing it.",
  lede: "Research, articles and short briefings from the work. No gated downloads; if it is useful, it is on this page.",
};

export const peoplePage = {
  title: "140 people who would rather be useful than impressive.",
  lede: "Quadrant was founded in Chicago in 2009 by three partners who wanted to run a consultancy the way they had run plants and businesses: small teams, direct answers, and fees tied to results. We are still independent and owned by the people who work here.",
  values: [
    {
      title: "Answer first",
      text: "We tell you what we think in week two, and spend the rest of the engagement trying to prove ourselves wrong.",
    },
    {
      title: "Partners in the room",
      text: "The partner who sells the work leads it, on site, at least two days a week.",
    },
    {
      title: "Fees at risk",
      text: "A fifth of our fee usually depends on results we agree with you before we start.",
    },
    {
      title: "No second job",
      text: "We do not sell software, implementation staff or outsourcing. Advice is the only thing we are paid for.",
    },
  ],
  facts: [
    { label: "Founded", value: "2009, Chicago" },
    {
      label: "Ownership",
      value: "Independent, owned by 31 partners and principals",
    },
    { label: "People", value: "140, of whom 12 work in analytics" },
    { label: "Offices", value: "Chicago, Boston, Denver" },
    { label: "Average tenure", value: "Seven years" },
    { label: "Pro-bono work", value: "About one engagement in ten" },
  ],
  photoCaption: "Workshop room, Chicago office.",
};

/* ------------------------------------------------------------ careers */

export type Role = {
  id: string;
  title: string;
  track: "Associate" | "Consultant" | "Experienced" | "Specialist";
  office: string;
  salary: string;
  summary: string;
  duties: string[];
  requirements: string[];
};

export const careersPage = {
  title: "Learn how businesses really work, from the people who run them.",
  lede: "We hire about thirty people a year. Most join as associates or consultants; a growing share join from operating roles in the industries we serve. Every new joiner gets a partner as a mentor and a real client team in their first month.",
  photoCaption:
    "A first-year consultant presenting her workstream to a client's leadership team.",
  process: [
    {
      name: "Application",
      text: "CV and a short note on a problem you have solved. We read every one and reply within ten working days.",
    },
    {
      name: "First-round case",
      text: "A forty-minute case interview with a consultant, by video. Free preparation session offered beforehand.",
    },
    {
      name: "Second-round case",
      text: "Two case interviews in one of our offices, based on real (disguised) engagements.",
    },
    {
      name: "Partner conversation",
      text: "Thirty minutes with a partner about how you work, what you want to learn, and our questions for you.",
    },
    {
      name: "Offer",
      text: "Within five working days of the final round, with written feedback whatever the outcome.",
    },
  ],
  benefits: [
    "Base salary plus a firm-wide bonus; ranges published on every role",
    "Four-week paid sabbatical after every five years",
    "Twenty-five days' paid leave plus a firm-wide week off in late December",
    "Sixteen weeks' fully paid parental leave for every parent",
    "No more than three nights a week away from home, by policy",
  ],
  faqs: [
    {
      q: "Do I need a business degree?",
      a: "No. About half of our consultants studied engineering, sciences or humanities. We teach the business tools in your first eight weeks.",
    },
    {
      q: "How much will I travel?",
      a: "Most engagements are within driving or a short flight from one of our offices. Our policy caps travel at three nights a week; most weeks it is two.",
    },
    {
      q: "Can I prepare for the case interview?",
      a: "Yes, and we would like you to. Every candidate who passes the application stage is offered a free one-hour practice case with a consultant who will not be interviewing them.",
    },
    {
      q: "Do you sponsor visas?",
      a: "For consultant and experienced-hire roles, yes. For associate roles we are currently unable to sponsor.",
    },
    {
      q: "Can I work part-time?",
      a: "Yes, from the consultant level up. Around one in eight of our people work a reduced schedule, including two partners.",
    },
  ],
};

export const roles: Role[] = [
  {
    id: "associate-chicago",
    title: "Associate",
    track: "Associate",
    office: "Chicago",
    salary: "$98,000 – $108,000",
    summary:
      "Join a client team in your first month and own a workstream of analysis by your third.",
    duties: [
      "Build fact bases from client data, interviews and site visits",
      "Draft exhibits and the action titles that go with them",
      "Run working sessions with client managers",
    ],
    requirements: [
      "Undergraduate degree completed by summer 2027",
      "Comfort with spreadsheets and with talking to people who know more than you",
      "Authorisation to work in the US",
    ],
  },
  {
    id: "associate-denver",
    title: "Associate, Operations",
    track: "Associate",
    office: "Denver",
    salary: "$98,000 – $108,000",
    summary:
      "An associate role weighted towards plants, warehouses and field operations.",
    duties: [
      "Time studies, flow mapping and inventory analysis on site",
      "Weekly performance tracking with client supervisors",
      "Support pilots from design to measurement",
    ],
    requirements: [
      "Engineering, operations or science degree",
      "Willingness to spend two days a week on client sites",
      "Authorisation to work in the US",
    ],
  },
  {
    id: "consultant-boston",
    title: "Consultant",
    track: "Consultant",
    office: "Boston",
    salary: "$185,000 – $205,000",
    summary:
      "Lead a workstream end to end, with a client counterpart and one or two associates.",
    duties: [
      "Own a workstream's answer and its evidence",
      "Present to client executives at steering committees",
      "Coach associates on analysis and writing",
    ],
    requirements: [
      "MBA, PhD, MD or equivalent experience",
      "Two or more years of full-time work",
      "Clear, short writing",
    ],
  },
  {
    id: "consultant-chicago",
    title: "Consultant, Pricing",
    track: "Consultant",
    office: "Chicago",
    salary: "$185,000 – $205,000",
    summary:
      "Join the pricing practice to build price waterfalls, segment corridors and deal-desk routines.",
    duties: [
      "Invoice-level analysis of price and margin",
      "Design price corridors and discount rules with sales leaders",
      "Coach sales teams during roll-out",
    ],
    requirements: [
      "Advanced degree or three years in pricing, sales operations or finance",
      "SQL or Python for analysis",
      "Patience with sales teams",
    ],
  },
  {
    id: "em-denver",
    title: "Engagement manager, Energy",
    track: "Experienced",
    office: "Denver",
    salary: "$240,000 – $275,000",
    summary:
      "Run engagements for utilities and midstream clients day to day, with a team of three to five.",
    duties: [
      "Shape the question with the partner and client",
      "Lead the team and the weekly client rhythm",
      "Write the answer and defend it",
    ],
    requirements: [
      "Five or more years in consulting or energy operations",
      "Experience leading teams",
      "Willingness to spend time in the field",
    ],
  },
  {
    id: "expert-hc",
    title: "Expert, Healthcare operations",
    track: "Specialist",
    office: "Boston",
    salary: "$210,000 – $240,000",
    summary:
      "Bring hospital or physician-group operations experience to our healthcare engagements.",
    duties: [
      "Diagnose clinical and administrative workflows",
      "Advise teams on what will work on a ward",
      "Build the healthcare practice's tools and benchmarks",
    ],
    requirements: [
      "Seven or more years in healthcare operations",
      "Clinical background welcome but not required",
      "Comfort working alongside consultants",
    ],
  },
  {
    id: "analyst-chicago",
    title: "Senior analyst, Data & analytics",
    track: "Specialist",
    office: "Chicago",
    salary: "$135,000 – $155,000",
    summary:
      "Build the fact bases behind our engagements, from network models to price waterfalls.",
    duties: [
      "Clean, join and model client data at scale",
      "Build reusable analytics for the practices",
      "Explain results to non-technical teams",
    ],
    requirements: [
      "Three or more years in analytics or data science",
      "Strong SQL and Python",
      "Clear writing about numbers",
    ],
  },
];

/* ------------------------------------------------------------ contact */

export const contactPage = {
  title: "Tell us the problem. A partner will read it.",
  lede: "Write as you would to a colleague: what is happening, what you have tried, and what a good result would look like. We reply within two working days, and the first conversation is never billed.",
  sizes: ["Under $250M revenue", "$250M – $1B", "$1B – $5B", "Over $5B"],
  timelines: [
    "In the next month",
    "This quarter",
    "Within six months",
    "Just exploring",
  ],
  other: [
    {
      label: "Careers",
      text: "Applications and questions about joining",
      email: "careers@quadrant.example",
    },
    {
      label: "Press",
      text: "Interviews, data requests and speaking",
      email: "press@quadrant.example",
    },
  ],
};

export const footer = {
  newsletter: {
    title: "The Monday Memo",
    text: "One idea from the work, one exhibit, one page. Every other Monday.",
  },
};
