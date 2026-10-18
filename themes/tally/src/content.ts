import bakery from "./assets/bakery.jpg";
import pottery from "./assets/pottery.jpg";
import bikeShop from "./assets/bike-shop.jpg";
import cafeKitchen from "./assets/cafe-kitchen.jpg";
import woodshop from "./assets/woodshop.jpg";
import desk from "./assets/desk.jpg";
import reviewCall from "./assets/review-call.jpg";
import openSign from "./assets/open-sign.jpg";
import storefront from "./assets/storefront.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };

export const photos = {
  desk: {
    src: desk,
    alt: "A calculator, notebook and laptop on a bare desk in afternoon light",
    w: 1400,
    h: 1050,
  },
  reviewCall: {
    src: reviewCall,
    alt: "Two people across a café table going through a folder of papers",
    w: 1400,
    h: 934,
  },
  openSign: {
    src: openSign,
    alt: "A red neon OPEN sign glowing in a shop window at dusk",
    w: 1400,
    h: 954,
  },
  storefront: {
    src: storefront,
    alt: "A small shop seen from the doorway, rails of clothes and a plant by the window",
    w: 1400,
    h: 933,
  },
} satisfies Record<string, Photo>;

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Tally",
  legal: "Tally Bookkeeping & Tax",
  promise: "Books closed by the 10th. Taxes filed before the deadline.",
  intro:
    "Tally is a small-business accounting firm in Milwaukee. We keep the books, file the returns and run payroll for 240 owner-run businesses — cafés, trades, studios and shops — on one flat monthly fee.",
  address: ["311 N Water Street, Suite 4", "Milwaukee, WI 53202"],
  phone: "+1 (555) 014-2290",
  phoneHref: "tel:+15550142290",
  email: "hello@tally.example",
  emailHref: "mailto:hello@tally.example",
  hours: "Mon–Fri, 8:30 am – 5:00 pm CT",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/calendar", label: "Tax calendar" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
];

/* ------------------------------------------------------------------ home */

export const closeSlip = {
  client: "Hollis & Rye Bakery",
  period: "September close",
  lines: [
    { label: "Sales", amount: 48210.0 },
    { label: "Flour, butter, packaging", amount: -16874.5 },
    { label: "Wages", amount: -14302.18 },
    { label: "Rent", amount: -4200.0 },
    { label: "Utilities", amount: -1118.62 },
    { label: "Everything else", amount: -2960.07 },
  ],
  setAside: { label: "Set aside for the Jan 15 estimate", amount: 2190.0 },
  footer: "Closed Oct 8 · reviewed with Priya on Oct 12",
};

export const monthRhythm = [
  {
    day: 1,
    title: "Bank feeds sync",
    body: "Your accounts and cards flow in overnight. You snap receipts on your phone as you go.",
  },
  {
    day: 6,
    title: "Questions, batched",
    body: "One email with every transaction we can't place. Most clients answer it in under ten minutes.",
  },
  {
    day: 10,
    title: "Books closed",
    body: "Reconciled to the cent. Profit & loss, balance sheet and cash summary land in your inbox.",
  },
  {
    day: 12,
    title: "Review call",
    body: "Fifteen minutes on what changed, what's coming and how much to set aside for taxes.",
  },
  {
    day: 15,
    title: "Estimates paid",
    body: "In January, April, June and September, the quarterly payment goes out from the set-aside.",
  },
];

export const industries = [
  {
    name: "Cafés, bakeries & restaurants",
    note: "Tip reporting, food-cost percentages, sales tax on prepared food, and the cash drawer that never quite matches.",
  },
  {
    name: "Trades & contractors",
    note: "Job costing by project, retainage, vehicle and equipment depreciation, 1099s for every sub.",
  },
  {
    name: "Studios & makers",
    note: "Inventory that is also raw material, craft-fair sales tax, and the S corp question once profit passes about $80k.",
  },
  {
    name: "Independent retail",
    note: "Cost of goods by category, seasonal cash planning, and sales tax in every state you ship to.",
  },
  {
    name: "Health & wellness practices",
    note: "Insurance deposits matched to visits, contractor practitioners, and owner pay that holds up.",
  },
  {
    name: "Agencies & consultants",
    note: "Retainers vs. project revenue, reimbursable expenses, and quarterly estimates sized to lumpy income.",
  },
];

export const homeFaq = [
  {
    q: "We already have an accountant who does our taxes. Do we have to switch?",
    a: "No. About a third of our clients come for bookkeeping only and send clean year-end books to their existing preparer. If you later want us to file, the books are already here.",
  },
  {
    q: "Our books are a year behind. Is that a problem?",
    a: "It's the most common way people find us. Catch-up work is priced per month of books, quoted before we start, and usually finished within six weeks — in time for the next filing deadline.",
  },
  {
    q: "Which software do we need?",
    a: "Any of the mainstream cloud ledgers and payroll apps. If you're on desktop software or spreadsheets, we migrate you as part of onboarding at no extra charge.",
  },
  {
    q: "Do you work with businesses outside Wisconsin?",
    a: "Yes — we file federal returns for clients in 31 states and state returns wherever you have nexus. Everything happens over video, email and a shared document vault.",
  },
  {
    q: "How fast do you answer questions?",
    a: "Within one business day, from the person who actually keeps your books. Full Desk clients get a same-day answer before 3 pm.",
  },
];

/* ------------------------------------------------------------------ services */

export type Service = {
  slug: string;
  name: string;
  short: string;
  group: "Every month" | "Every year" | "When you need it";
  from: number;
  unit: string;
  summary: string;
  forWho: string;
  included: string[];
  steps: { title: string; body: string }[];
  turnaround: string;
  deadlines: string[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "bookkeeping",
    name: "Monthly bookkeeping",
    short:
      "Every transaction categorised, every account reconciled, books closed by the 10th.",
    group: "Every month",
    from: 340,
    unit: "/mo",
    summary:
      "We keep your ledger current every month, not in a panic every April. Bank, card and payment-processor accounts are reconciled to the statement, and you get a closed set of books by the 10th.",
    forWho:
      "Businesses with 30 to 1,000 transactions a month who want to know their real profit without opening the software.",
    included: [
      "Categorisation of every bank, card and processor transaction",
      "Reconciliation of all accounts to statements, to the cent",
      "Receipt matching from your phone or forwarding address",
      "Accounts payable and receivable tidied every month",
      "Profit & loss, balance sheet and cash summary by the 10th",
      "One batched question email per month — no drip of queries",
    ],
    steps: [
      {
        title: "Connect",
        body: "We link your bank feeds, payment apps and receipt inbox during a 45-minute onboarding call.",
      },
      {
        title: "Clean up the start",
        body: "We set an opening balance you can trust, fixing anything from earlier this year if needed.",
      },
      {
        title: "Close monthly",
        body: "From then on, books close by the 10th and the reports land in your inbox.",
      },
    ],
    turnaround: "Books closed by the 10th of the following month",
    deadlines: ["est-1040", "1099-nec"],
    faq: [
      {
        q: "What counts as a transaction?",
        a: "Any line on a bank, card or processor statement. A day of card sales that settles as one deposit counts once.",
      },
      {
        q: "Do I still need to keep receipts?",
        a: "Yes, for anything over $75 and every meal or travel expense. Snap them on your phone; we match them to the transaction.",
      },
    ],
    related: ["catch-up", "tax-returns", "cfo"],
  },
  {
    slug: "tax-returns",
    name: "Business tax returns",
    short:
      "Your business return and the owners' personal returns, filed on time from books we already know.",
    group: "Every year",
    from: 1150,
    unit: "/yr",
    summary:
      "Schedule C, partnership (1065), S corporation (1120-S) or C corporation (1120), plus the owners' personal returns. Because we keep the books, there is no year-end scramble to rebuild them.",
    forWho:
      "Owners who want one firm responsible for the numbers from the first receipt to the filed return.",
    included: [
      "Federal business return and one state return",
      "Owners' personal federal and state returns",
      "K-1s issued to every partner or shareholder",
      "Extension filed automatically if anything is outstanding",
      "Depreciation schedules and fixed-asset register kept current",
      "A 30-minute walkthrough of the return before you sign",
    ],
    steps: [
      {
        title: "January checklist",
        body: "We send a personalised list of what we still need — usually five items or fewer.",
      },
      {
        title: "Draft & review",
        body: "You get a plain-English summary of the return and what changed from last year.",
      },
      {
        title: "Sign & file",
        body: "E-signature, e-file, and confirmation from the IRS and state saved to your vault.",
      },
    ],
    turnaround:
      "Filed by the original deadline when books are current by February 10",
    deadlines: ["return-pship", "return-1040", "return-1120"],
    faq: [
      {
        q: "Can you file for a business you don't keep the books for?",
        a: "Yes, as long as the books are reconciled. If they aren't, we quote a catch-up first.",
      },
      {
        q: "Are extensions bad?",
        a: "No. An extension moves the filing date, not the payment date. We file one whenever waiting gets you a more accurate return.",
      },
    ],
    related: ["tax-planning", "bookkeeping", "notices"],
  },
  {
    slug: "payroll",
    name: "Payroll & 1099s",
    short:
      "Paydays, payroll tax deposits, quarterly 941s, year-end W-2s and contractor 1099s.",
    group: "Every month",
    from: 65,
    unit: "/mo + $8 per person",
    summary:
      "We run payroll on your schedule, deposit the withholding on time and file every quarterly and annual payroll form. Contractors get their 1099s in January without you chasing W-9s.",
    forWho:
      "Businesses from their first hire up to about 40 people, including tipped and seasonal staff.",
    included: [
      "Weekly, biweekly or semi-monthly pay runs with direct deposit",
      "Federal and state withholding deposits on schedule",
      "Quarterly Form 941 and state unemployment returns",
      "Annual Form 940, W-2s and W-3",
      "W-9 collection and 1099-NEC filing for contractors",
      "New-hire reporting and state registration for your first employee",
    ],
    steps: [
      {
        title: "Set up",
        body: "We register your state withholding and unemployment accounts and load each employee.",
      },
      {
        title: "Approve",
        body: "Two days before payday you approve hours with one click — or we use the timesheet export.",
      },
      {
        title: "We file",
        body: "Deposits and returns go out on schedule. Each quarter you get a one-page summary.",
      },
    ],
    turnaround:
      "Pay runs approved by 2 pm process for the next business day but one",
    deadlines: ["941", "w2", "1099-nec", "940"],
    faq: [
      {
        q: "Can you handle tips?",
        a: "Yes. We report cash and card tips, handle tip pooling and calculate the FICA tip credit for food and beverage businesses.",
      },
      {
        q: "What if I pay myself through payroll?",
        a: "For S corp owners that's required. We help you set a reasonable salary and run it like any other employee.",
      },
    ],
    related: ["bookkeeping", "tax-planning", "notices"],
  },
  {
    slug: "tax-planning",
    name: "Quarterly tax planning",
    short:
      "A set-aside number every month and estimates that match how this year is actually going.",
    group: "Every month",
    from: 180,
    unit: "/mo",
    summary:
      "We project this year's tax from your closed books every quarter, tell you what to set aside each month, and calculate the estimated payments so April holds no surprises.",
    forWho:
      "Profitable owners whose income moves around — and anyone who has ever owed an underpayment penalty.",
    included: [
      "Quarterly tax projection from your closed books",
      "A monthly set-aside amount on every close report",
      "Federal and state estimated payments calculated and scheduled",
      "S corp salary and distribution plan reviewed each quarter",
      "Retirement contribution options sized before year-end",
      "A December planning call to time purchases and income",
    ],
    steps: [
      {
        title: "Baseline",
        body: "We start from last year's return and this year's books to date.",
      },
      {
        title: "Project quarterly",
        body: "Each quarter's close updates the projection and next payment.",
      },
      {
        title: "Adjust in December",
        body: "A year-end call decides what can still move before December 31.",
      },
    ],
    turnaround: "Estimate amounts sent ten days before each due date",
    deadlines: ["est-1040", "est-1120"],
    faq: [
      {
        q: "Is this included in a package?",
        a: "Ledger + Tax and Full Desk include quarterly planning. On Ledger it's an add-on.",
      },
      {
        q: "Do you make the payments for me?",
        a: "We schedule them from your account with your approval, so nothing leaves without a yes from you.",
      },
    ],
    related: ["tax-returns", "cfo", "payroll"],
  },
  {
    slug: "catch-up",
    name: "Catch-up bookkeeping",
    short:
      "Months — or years — of untouched books rebuilt, reconciled and ready to file.",
    group: "When you need it",
    from: 450,
    unit: " per month of books",
    summary:
      "We rebuild your books from bank statements, receipts and whatever is in the shoebox, reconcile every month, and hand you a ledger that can carry a tax return or a loan application.",
    forWho:
      "Owners who are behind, switching from a bookkeeper who disappeared, or facing a deadline with nothing ready.",
    included: [
      "Statements pulled for every account back to your last clean month",
      "Every transaction categorised and every month reconciled",
      "Owner draws, loans and personal spending separated out",
      "Prior-year opening balances corrected against filed returns",
      "A fixed quote before we start, never an hourly meter",
      "Rush timeline available when a filing deadline is close",
    ],
    steps: [
      {
        title: "Quote",
        body: "We look at statements on a call and quote a fixed price within two business days.",
      },
      {
        title: "Rebuild",
        body: "We work oldest month first and send questions in weekly batches.",
      },
      {
        title: "Hand off",
        body: "You get reconciled books plus a list of anything the tax return will need to address.",
      },
    ],
    turnaround: "Typically six weeks for up to eighteen months of books",
    deadlines: ["return-pship", "return-1040"],
    faq: [
      {
        q: "I'm missing receipts. Is that okay?",
        a: "Bank and card statements carry most of the weight. We flag what the IRS would expect documentation for and help you reconstruct it.",
      },
      {
        q: "Will you judge the mess?",
        a: "No. We have seen every version of it, including four years in a shoebox in a freezer.",
      },
    ],
    related: ["bookkeeping", "notices", "tax-returns"],
  },
  {
    slug: "sales-tax",
    name: "Sales tax filings",
    short:
      "Registration, collection rates and every monthly, quarterly or annual return.",
    group: "When you need it",
    from: 45,
    unit: " per filing",
    summary:
      "We register you where you owe, check that your checkout charges the right rates, and file each return on its schedule — including zero returns, which states still expect.",
    forWho:
      "Shops, makers and caterers selling taxable goods in person, online or at markets.",
    included: [
      "Nexus review across every state you sell into",
      "State registrations and permits filed for you",
      "Rate check of your point-of-sale and online checkout",
      "Returns filed monthly, quarterly or annually",
      "Payments scheduled from your account on the due date",
      "Market and fair sales tracked by location",
    ],
    steps: [
      {
        title: "Review",
        body: "We map where you sell and which states expect a return.",
      },
      {
        title: "Register",
        body: "We file permits and set your filing frequency with each state.",
      },
      {
        title: "File",
        body: "Returns and payments go out on schedule; confirmations are saved to your vault.",
      },
    ],
    turnaround: "Filed three business days before each state due date",
    deadlines: ["sales-monthly", "sales-quarterly", "sales-annual"],
    faq: [
      {
        q: "Do I owe sales tax in other states?",
        a: "Possibly, once your sales into a state cross its economic nexus threshold. We check every quarter.",
      },
      {
        q: "What if I collected the wrong rate?",
        a: "We calculate the difference and, where states allow, file a voluntary disclosure to limit penalties.",
      },
    ],
    related: ["bookkeeping", "payroll", "notices"],
  },
  {
    slug: "cfo",
    name: "Cash-flow advisory",
    short:
      "A part-time controller: 13-week cash forecast, pricing checks and a plan for the slow months.",
    group: "Every month",
    from: 650,
    unit: "/mo",
    summary:
      "For owners making bigger decisions — a second location, a loan, a hire — we add a rolling 13-week cash forecast, margin analysis by product or job, and a monthly hour with the person who knows your numbers best.",
    forWho:
      "Businesses between about $750k and $5M in revenue that have outgrown 'check the bank balance'.",
    included: [
      "Rolling 13-week cash forecast updated every close",
      "Margin by product, service line or job",
      "Budget vs. actual with notes on what moved",
      "Loan and lease packages prepared for your bank",
      "Pricing and staffing scenarios before you commit",
      "A monthly one-hour review with Lena or Ana",
    ],
    steps: [
      {
        title: "Model",
        body: "We build your forecast from twelve months of closed books and known commitments.",
      },
      {
        title: "Review",
        body: "Each month we compare the forecast to what happened and adjust.",
      },
      {
        title: "Decide",
        body: "Before a big move, we run the scenarios with you and show the cash impact week by week.",
      },
    ],
    turnaround: "Forecast updated within two days of each close",
    deadlines: ["est-1120"],
    faq: [
      {
        q: "Is this a full CFO?",
        a: "No — it's the 20% of a CFO most small businesses need: cash, margins and a second opinion before big decisions.",
      },
      {
        q: "Do I need Tally bookkeeping too?",
        a: "Yes. Forecasts are only as good as the books under them.",
      },
    ],
    related: ["tax-planning", "bookkeeping", "tax-returns"],
  },
  {
    slug: "notices",
    name: "IRS & state notices",
    short:
      "That letter in the mail, read, answered and closed — usually without you on the phone.",
    group: "When you need it",
    from: 250,
    unit: " per notice",
    summary:
      "Send us a photo of the notice. We tell you within one business day what it means, whether it's right, and what it costs to resolve — then we respond with a power of attorney so you don't have to.",
    forWho:
      "Anyone holding an envelope from the IRS or a state revenue department.",
    included: [
      "Plain-English read of the notice within one business day",
      "Power of attorney filed so we can speak for you",
      "Written response with supporting documents",
      "Penalty abatement requests where you qualify",
      "Payment plan set up if a balance is owed",
      "Follow-up until the account shows resolved",
    ],
    steps: [
      {
        title: "Send",
        body: "Photograph every page, including the back, and upload it to your vault.",
      },
      {
        title: "Diagnose",
        body: "We pull your IRS transcripts and compare them to what was filed.",
      },
      {
        title: "Resolve",
        body: "We respond, track it, and confirm in writing when it's closed.",
      },
    ],
    turnaround:
      "First read within one business day; most notices closed in 30–90 days",
    deadlines: ["941", "return-1040"],
    faq: [
      {
        q: "Is a notice the same as an audit?",
        a: "Almost never. Most notices are computer-matched adjustments that a short, documented letter can resolve.",
      },
      {
        q: "Is this included anywhere?",
        a: "Full Desk clients get notices handled at no extra charge for years we prepared.",
      },
    ],
    related: ["tax-returns", "catch-up", "payroll"],
  },
];

export const onboarding = [
  {
    when: "Day 1",
    title: "Discovery call",
    body: "Twenty minutes to understand the business and quote a package.",
  },
  {
    when: "Week 1",
    title: "Connect & migrate",
    body: "Theo links your accounts and moves old files into your document vault.",
  },
  {
    when: "Weeks 2–4",
    title: "Opening balances",
    body: "We fix anything from earlier this year so the starting point is right.",
  },
  {
    when: "Next 10th",
    title: "First close",
    body: "Your first set of closed books and the first review call.",
  },
];

export const notDone = [
  "Audits or reviewed financial statements",
  "Investment, insurance or retirement product advice",
  "Personal-only tax returns without a business",
  "Payroll for more than about 40 people",
];

/* ------------------------------------------------------------------ pricing */

export type Package = {
  id: string;
  name: string;
  monthly: number;
  pitch: string;
  includes: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "ledger",
    name: "Ledger",
    monthly: 340,
    pitch: "Clean monthly books for owners who already have a tax preparer.",
    includes: [
      "Monthly bookkeeping, up to 150 transactions",
      "Books closed by the 10th",
      "P&L, balance sheet and cash summary",
      "Answers within one business day",
    ],
  },
  {
    id: "ledger-tax",
    name: "Ledger + Tax",
    monthly: 590,
    pitch: "Books, returns and estimates from one desk. Our most common setup.",
    featured: true,
    includes: [
      "Everything in Ledger, up to 400 transactions",
      "Business return and one owner's personal return",
      "Quarterly tax planning and estimates",
      "Monthly set-aside number",
      "Quarterly 30-minute review call",
    ],
  },
  {
    id: "full-desk",
    name: "Full Desk",
    monthly: 1150,
    pitch:
      "The whole back office for growing teams with payroll and sales tax.",
    includes: [
      "Everything in Ledger + Tax, up to 1,000 transactions",
      "Payroll for up to 10 people",
      "Sales tax in one state",
      "13-week cash forecast and monthly review call",
      "IRS and state notices handled",
    ],
  },
];

/** Annual billing: pay for ten months, get twelve. */
export const annualMonthsCharged = 10;

export const comparison: { row: string; values: [string, string, string] }[] = [
  { row: "Monthly transactions", values: ["150", "400", "1,000"] },
  { row: "Bank, card & processor accounts", values: ["3", "8", "Unlimited"] },
  { row: "Books closed by", values: ["10th", "10th", "8th"] },
  { row: "Monthly financial statements", values: ["Yes", "Yes", "Yes"] },
  { row: "Business tax return", values: ["—", "Yes", "Yes"] },
  { row: "Owner personal returns", values: ["—", "1", "2"] },
  { row: "Quarterly estimates", values: ["Add-on", "Yes", "Yes"] },
  { row: "Payroll", values: ["Add-on", "Add-on", "Up to 10 people"] },
  { row: "Sales tax filings", values: ["Add-on", "Add-on", "1 state"] },
  { row: "Review calls", values: ["Yearly", "Quarterly", "Monthly"] },
  { row: "13-week cash forecast", values: ["—", "—", "Yes"] },
  {
    row: "IRS & state notices",
    values: ["$250 each", "$250 each", "Included"],
  },
  {
    row: "Response time",
    values: ["1 business day", "1 business day", "Same day before 3 pm"],
  },
];

export const addOns = [
  {
    name: "Extra transactions",
    price: "$60",
    per: "per 100 over your package",
  },
  { name: "Payroll", price: "$65", per: "per month + $8 per person" },
  { name: "Sales tax return", price: "$45", per: "per filing, per state" },
  { name: "Quarterly tax planning", price: "$180", per: "per month (Ledger)" },
  { name: "Additional personal return", price: "$350", per: "per return" },
  { name: "1099-NEC preparation", price: "$12", per: "per form, $60 minimum" },
  { name: "Catch-up bookkeeping", price: "$450", per: "per month of books" },
  { name: "Amended return", price: "from $400", per: "per return" },
];

export const pricingFaq = [
  {
    q: "Is there a setup fee?",
    a: "No. Onboarding, software migration and the first month's cleanup are included. Catch-up beyond the current year is quoted separately.",
  },
  {
    q: "What happens if we go over our transaction count?",
    a: "Nothing the first time. If you go over three months in a row we suggest the next package or add $60 per extra hundred — your choice.",
  },
  {
    q: "Can we cancel?",
    a: "Monthly plans cancel with 30 days' notice. Annual plans are refunded for unused full months, minus any return already filed.",
  },
  {
    q: "Why flat fees instead of hourly?",
    a: "Because you should be able to email a question without wondering what it costs. Flat fees keep both of us honest about scope.",
  },
];

/* ------------------------------------------------------------------ tax calendar */

export type Structure = "sole" | "partnership" | "scorp" | "ccorp";
export type SalesFreq = "none" | "monthly" | "quarterly" | "annual";
export type DeadlineKind =
  "Return" | "Estimate" | "Payroll" | "Information" | "Sales tax";

export type DeadlineRule = {
  id: string;
  title: string;
  forms: string;
  detail: string;
  kind: DeadlineKind;
  /** [month 1–12, day] as the law states it; weekend dates roll forward in lib/deadlines. */
  dates: [number, number][];
  structures?: Structure[];
  needs?: "payroll" | "contractors";
  salesTax?: Exclude<SalesFreq, "none">;
};

export const structures: { id: Structure; label: string; hint: string }[] = [
  {
    id: "sole",
    label: "Sole proprietor or single-member LLC",
    hint: "Schedule C on your personal return",
  },
  {
    id: "partnership",
    label: "Partnership or multi-member LLC",
    hint: "Form 1065 and K-1s",
  },
  {
    id: "scorp",
    label: "S corporation",
    hint: "Form 1120-S and owner payroll",
  },
  {
    id: "ccorp",
    label: "C corporation",
    hint: "Form 1120, corporate estimates",
  },
];

export const salesFreqs: { id: SalesFreq; label: string }[] = [
  { id: "none", label: "No sales tax" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "annual", label: "Annual" },
];

const owners: Structure[] = ["sole", "partnership", "scorp"];

export const deadlineRules: DeadlineRule[] = [
  {
    id: "est-1040",
    title: "Estimated tax payment",
    forms: "Form 1040-ES",
    detail:
      "Owners' quarterly payment toward personal income and self-employment tax on business profit.",
    kind: "Estimate",
    dates: [
      [1, 15],
      [4, 15],
      [6, 15],
      [9, 15],
    ],
    structures: owners,
  },
  {
    id: "est-1120",
    title: "Corporate estimated tax",
    forms: "Form 1120-W installment",
    detail:
      "Quarterly installment of the corporation's own income tax for a calendar-year C corp.",
    kind: "Estimate",
    dates: [
      [4, 15],
      [6, 15],
      [9, 15],
      [12, 15],
    ],
    structures: ["ccorp"],
  },
  {
    id: "w2",
    title: "W-2s to employees and the SSA",
    forms: "Forms W-2 & W-3",
    detail:
      "Every employee's wage statement, copied to the Social Security Administration.",
    kind: "Information",
    dates: [[1, 31]],
    needs: "payroll",
  },
  {
    id: "1099-nec",
    title: "1099s to contractors and the IRS",
    forms: "Form 1099-NEC",
    detail:
      "Statements for independent contractors you paid last year, filed with the IRS the same day.",
    kind: "Information",
    dates: [[1, 31]],
    needs: "contractors",
  },
  {
    id: "940",
    title: "Annual federal unemployment return",
    forms: "Form 940",
    detail:
      "FUTA tax on the first $7,000 of each employee's wages for the year.",
    kind: "Payroll",
    dates: [[1, 31]],
    needs: "payroll",
  },
  {
    id: "941",
    title: "Quarterly payroll tax return",
    forms: "Form 941",
    detail:
      "Reconciles the quarter's withholding, Social Security and Medicare with the deposits you made.",
    kind: "Payroll",
    dates: [
      [1, 31],
      [4, 30],
      [7, 31],
      [10, 31],
    ],
    needs: "payroll",
  },
  {
    id: "return-pship",
    title: "Partnership or S corp return",
    forms: "Form 1065 / 1120-S, or Form 7004",
    detail:
      "File the business return and send K-1s to owners — or file an extension to September 15.",
    kind: "Return",
    dates: [[3, 15]],
    structures: ["partnership", "scorp"],
  },
  {
    id: "return-1040",
    title: "Personal return, with Schedule C if you have one",
    forms: "Form 1040, or Form 4868",
    detail:
      "Owners' personal returns and any balance due — an extension moves the filing date, not the payment.",
    kind: "Return",
    dates: [[4, 15]],
    structures: owners,
  },
  {
    id: "return-1120",
    title: "C corporation return",
    forms: "Form 1120, or Form 7004",
    detail:
      "The calendar-year corporate return and any balance due, or an extension to October 15.",
    kind: "Return",
    dates: [[4, 15]],
    structures: ["ccorp"],
  },
  {
    id: "ext-pship",
    title: "Extended partnership or S corp return",
    forms: "Form 1065 / 1120-S",
    detail: "Final date for business returns that were extended in March.",
    kind: "Return",
    dates: [[9, 15]],
    structures: ["partnership", "scorp"],
  },
  {
    id: "ext-1040",
    title: "Extended personal return",
    forms: "Form 1040",
    detail: "Final date for personal returns extended in April.",
    kind: "Return",
    dates: [[10, 15]],
    structures: owners,
  },
  {
    id: "ext-1120",
    title: "Extended C corporation return",
    forms: "Form 1120",
    detail: "Final date for corporate returns extended in April.",
    kind: "Return",
    dates: [[10, 15]],
    structures: ["ccorp"],
  },
  {
    id: "sales-monthly",
    title: "Sales tax return",
    forms: "State sales & use tax",
    detail:
      "Last month's collected sales tax. The 20th is the most common state due date; yours may differ.",
    kind: "Sales tax",
    dates: Array.from(
      { length: 12 },
      (_, i) => [i + 1, 20] as [number, number],
    ),
    salesTax: "monthly",
  },
  {
    id: "sales-quarterly",
    title: "Quarterly sales tax return",
    forms: "State sales & use tax",
    detail:
      "Last quarter's collected sales tax. Most states use the 20th; check your permit.",
    kind: "Sales tax",
    dates: [
      [1, 20],
      [4, 20],
      [7, 20],
      [10, 20],
    ],
    salesTax: "quarterly",
  },
  {
    id: "sales-annual",
    title: "Annual sales tax return",
    forms: "State sales & use tax",
    detail:
      "The whole year's collected sales tax for low-volume sellers. Many states use January 31.",
    kind: "Sales tax",
    dates: [[1, 31]],
    salesTax: "annual",
  },
];

export const calendarNote =
  "Federal dates for calendar-year businesses. Weekend dates move to the next business day; federal holidays and state income-tax dates are not shown. Illustrative, not tax advice — your Tally accountant confirms your own calendar.";

/* ------------------------------------------------------------------ people */

export type Person = {
  name: string;
  role: string;
  credential: string;
  since: number;
  bio: string;
  focus: string;
};

export const team: Person[] = [
  {
    name: "Ana Ruiz",
    role: "Founder, tax lead",
    credential: "CPA",
    since: 2014,
    bio: "Kept the books for her parents' hardware store from age fifteen, then spent eight years in a regional firm learning how small clients get ignored. Started Tally to fix that.",
    focus: "S corp planning, multi-state returns",
  },
  {
    name: "Priya Natarajan",
    role: "Head of bookkeeping",
    credential: "Certified bookkeeper",
    since: 2016,
    bio: "Runs the monthly close for every client and wrote the checklist all eleven bookkeepers follow. Believes a reconciliation is either done or not started.",
    focus: "Monthly close, restaurant books",
  },
  {
    name: "Marcus Bell",
    role: "Tax & notices",
    credential: "Enrolled agent",
    since: 2017,
    bio: "Spent six years answering phones at a state revenue department before switching sides. Reads an IRS notice faster than most people read a menu.",
    focus: "IRS representation, payroll tax",
  },
  {
    name: "Lena Okafor",
    role: "Advisory",
    credential: "CPA",
    since: 2019,
    bio: "Former controller for a regional bakery chain. Builds the 13-week cash forecasts and sits in on the hard conversations with lenders.",
    focus: "Cash flow, pricing, financing",
  },
  {
    name: "Jonah Weiss",
    role: "Payroll lead",
    credential: "Certified payroll professional",
    since: 2020,
    bio: "Has run payroll for tipped staff, seasonal crews and one very large family business. Has never missed a deposit.",
    focus: "Tips, multi-state payroll, 1099s",
  },
  {
    name: "Theo Lindqvist",
    role: "Client onboarding",
    credential: "Bookkeeper",
    since: 2022,
    bio: "The first person you talk to after a discovery call. Connects accounts, migrates old files and makes sure month one closes on time.",
    focus: "Migrations, catch-up projects",
  },
];

export const principles = [
  {
    title: "Flat fees, quoted in writing",
    body: "You know the price before we start. Questions are never billed by the minute.",
  },
  {
    title: "One person who knows your books",
    body: "Your bookkeeper stays your bookkeeper. No ticket queue, no re-explaining your business.",
  },
  {
    title: "Plain English first",
    body: "Every report starts with three sentences: what happened, what it means, what to do.",
  },
  {
    title: "Deadlines kept, not chased",
    body: "We work to the 10th and file ahead of the due date. In twelve years we've missed none.",
  },
];

export const story = [
  "Ana Ruiz started Tally in 2014 from a desk above a print shop on Water Street with four clients: a bakery, a plumber, a tattoo studio and her parents' hardware store.",
  "The idea was simple. Small businesses were getting one of two things — a tax preparer who saw their numbers once a year, or a bookkeeper who couldn't answer a tax question. Tally would do both, every month, for a fee you could put in a budget.",
  "Twelve years on we are eighteen people, still above the print shop, now with 240 clients in 31 states. Most found us because a friend's books looked suspiciously calm in April.",
];

export const firmFacts = [
  { label: "Founded", value: "2014, Milwaukee" },
  { label: "Clients", value: "240 owner-run businesses" },
  { label: "Team", value: "18, including 4 CPAs and 2 enrolled agents" },
  { label: "Licensed", value: "Wisconsin firm permit, fictional no. 4471-FRM" },
];

/* ------------------------------------------------------------------ clients */

export type Story = {
  id: string;
  business: string;
  trade: string;
  owner: string;
  quote: string;
  outcome: string;
  services: string[];
  photo: Photo;
};

export const stories: Story[] = [
  {
    id: "hollis-rye",
    business: "Hollis & Rye Bakery",
    trade: "Bakery, two counters",
    owner: "Dana Hollis",
    quote:
      "I handed Theo a banker's box and fourteen months of guilt. Six weeks later I knew my food cost to the decimal and the return was filed on time.",
    outcome:
      "Fourteen months of books rebuilt in six weeks, then on Ledger + Tax.",
    services: ["catch-up", "bookkeeping", "tax-returns"],
    photo: {
      src: bakery,
      alt: "Pastries and loaves behind the glass counter of a small bakery",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "wren-ceramics",
    business: "Wren Ceramics",
    trade: "Pottery studio & classes",
    owner: "Mira Wren",
    quote:
      "Ana ran the S corp numbers on a Tuesday call. By March I was on payroll and keeping money I used to hand over as self-employment tax.",
    outcome:
      "S corp election and owner payroll; quarterly planning every season since.",
    services: ["tax-planning", "payroll", "tax-returns"],
    photo: {
      src: pottery,
      alt: "Clay-covered hands centring a pot on a spinning wheel",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "spoke-chain",
    business: "Spoke & Chain",
    trade: "Bike shop & repairs",
    owner: "Tomas Reyes",
    quote:
      "Seven seasonal mechanics, online sales into four states, and I haven't thought about a payroll form in two years.",
    outcome: "Payroll for a seasonal crew and sales tax filed in four states.",
    services: ["payroll", "sales-tax", "bookkeeping"],
    photo: {
      src: bikeShop,
      alt: "A row of brightly coloured single-speed bicycles outside a shop",
      w: 1400,
      h: 933,
    },
  },
  {
    id: "cedar-line",
    business: "Cedar Line Kitchen",
    trade: "Café & catering",
    owner: "Hal Brennan",
    quote:
      "Lena's forecast told us in June that August would be tight. We moved a catering deposit and never touched the credit line.",
    outcome: "13-week cash forecast and tip reporting for a 22-person café.",
    services: ["cfo", "payroll", "bookkeeping"],
    photo: {
      src: cafeKitchen,
      alt: "A cook at work behind a busy café counter with jars on the shelves",
      w: 1400,
      h: 937,
    },
  },
  {
    id: "northwood",
    business: "Northwood Joinery",
    trade: "Custom cabinetry",
    owner: "Jess Albrecht",
    quote:
      "Job costing showed me which kitchens actually made money. We raised prices on two kinds of work and stopped quoting a third.",
    outcome:
      "Job costing by project and a notice from 2021 closed without penalty.",
    services: ["bookkeeping", "notices", "cfo"],
    photo: {
      src: woodshop,
      alt: "A woodworker sanding a walnut board on a stool in a dusty workshop",
      w: 1400,
      h: 934,
    },
  },
];

/* ------------------------------------------------------------------ resources */

export type Topic = "Tax" | "Bookkeeping" | "Payroll" | "Cash flow";
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "note"; text: string }
  | { t: "figures"; caption: string; rows: [string, string][] };

export type Article = {
  slug: string;
  title: string;
  short: string;
  dek: string;
  topic: Topic;
  format: "Guide" | "Checklist" | "Explainer";
  author: string;
  date: string;
  minutes: number;
  body: Block[];
};

export const topics: Topic[] = ["Tax", "Bookkeeping", "Payroll", "Cash flow"];

export const articles: Article[] = [
  {
    slug: "quarterly-estimates-explained",
    title: "Quarterly estimated taxes, explained for people who hate surprises",
    short: "Quarterly estimates",
    dek: "Nobody withholds tax from a business owner. Here's how the four payments work, how much to send, and how to stop April from hurting.",
    topic: "Tax",
    format: "Explainer",
    author: "Ana Ruiz",
    date: "2026-09-24",
    minutes: 7,
    body: [
      {
        t: "p",
        text: "When you were an employee, tax came out of every paycheck and you never thought about it. When you own a business, nobody does that for you — so the IRS asks you to pay as you go, four times a year. Those are estimated taxes.",
      },
      { t: "h", text: "Who has to pay them" },
      {
        t: "p",
        text: "If you're a sole proprietor, a partner, or an S corp owner taking distributions, and you expect to owe at least $1,000 when you file, you're expected to make estimated payments. C corporations make their own estimates on a slightly different schedule.",
      },
      { t: "h", text: "The four dates" },
      {
        t: "p",
        text: "Individual estimates are due April 15, June 15, September 15 and January 15 of the following year. Notice the gaps aren't even: the second payment comes only two months after the first. That catches a lot of people.",
      },
      {
        t: "figures",
        caption: "Personal estimate schedule for a calendar year",
        rows: [
          ["Jan 1 – Mar 31 income", "Due April 15"],
          ["Apr 1 – May 31 income", "Due June 15"],
          ["Jun 1 – Aug 31 income", "Due September 15"],
          ["Sep 1 – Dec 31 income", "Due January 15"],
        ],
      },
      { t: "h", text: "How much to send" },
      {
        t: "p",
        text: "There are two safe ways to size the payments. The simple one: pay 100% of last year's total tax, split into four — or 110% if your income was over $150,000. Do that and you won't owe an underpayment penalty, even if this year turns out much bigger.",
      },
      {
        t: "p",
        text: "The precise one: estimate this year's profit from your books each quarter and pay 90% of what you'll owe. It's better for cash flow when the year is slower than last, but it only works if your books are current.",
      },
      {
        t: "note",
        text: "Our rule of thumb for clients: move 25–30% of each month's profit into a separate savings account the day the books close. The estimate then comes out of money you already put aside.",
      },
      { t: "h", text: "What happens if you miss one" },
      {
        t: "p",
        text: "The penalty is essentially interest on the amount you underpaid, for as long as it stayed unpaid. It's not catastrophic, but it is avoidable — and paying late is still better than not paying.",
      },
      {
        t: "list",
        items: [
          "Pay what you can as soon as you can; the penalty stops growing on what you've paid.",
          "Don't skip the next quarter to catch up — make both.",
          "If your income arrives late in the year, the annualised method on Form 2210 can reduce or remove the penalty.",
        ],
      },
    ],
  },
  {
    slug: "receipts-what-to-keep",
    title: "Which receipts to keep, and for how long",
    short: "Receipts to keep",
    dek: "The shoebox is optional. Here's the short list of documents that actually matter if the IRS ever asks.",
    topic: "Bookkeeping",
    format: "Checklist",
    author: "Priya Natarajan",
    date: "2026-09-02",
    minutes: 5,
    body: [
      {
        t: "p",
        text: "Most owners keep too much of the wrong paper and too little of the right kind. A bank statement proves you paid; a receipt proves what you paid for. For most expenses you need both — but only for some.",
      },
      { t: "h", text: "Always keep" },
      {
        t: "list",
        items: [
          "Receipts for any single purchase over $75",
          "Every meal, travel and lodging receipt, with a note of who and why",
          "Invoices for equipment, vehicles and anything you depreciate",
          "Contracts, leases and loan documents",
          "Payroll records and contractor W-9s",
        ],
      },
      { t: "h", text: "Usually fine without a receipt" },
      {
        t: "list",
        items: [
          "Recurring software and utility charges that match a statement line",
          "Bank fees and card processing fees",
          "Small supplies under $75 with a clear statement description",
        ],
      },
      { t: "h", text: "How long" },
      {
        t: "figures",
        caption: "Our retention guide",
        rows: [
          ["Most income and expense records", "3 years after filing"],
          ["Payroll records", "4 years"],
          ["Asset purchases", "3 years after you sell the asset"],
          ["Returns themselves", "Forever"],
        ],
      },
      {
        t: "note",
        text: "A clear phone photo counts. Snap it at the counter, forward it to your receipts address, and throw the paper away.",
      },
    ],
  },
  {
    slug: "s-corp-election",
    title: "Should your LLC elect S corp status? Run these numbers first",
    short: "The S corp question",
    dek: "It can save real money in self-employment tax — once profit is high enough to cover the payroll, the extra return and a reasonable salary.",
    topic: "Tax",
    format: "Guide",
    author: "Ana Ruiz",
    date: "2026-08-12",
    minutes: 9,
    body: [
      {
        t: "p",
        text: "Every profitable LLC owner eventually hears it from a friend: 'you should be an S corp.' Sometimes the friend is right. The election changes how your profit is taxed, not your legal structure — and the savings depend entirely on a few numbers.",
      },
      { t: "h", text: "Where the saving comes from" },
      {
        t: "p",
        text: "As a sole proprietor or partner, all of your profit is subject to self-employment tax — roughly 15.3% up to the Social Security wage base. As an S corp owner, you pay yourself a reasonable salary through payroll; only that salary carries payroll tax. The rest comes out as a distribution without it.",
      },
      {
        t: "figures",
        caption: "Illustrative: $120,000 profit, $65,000 salary",
        rows: [
          ["Self-employment tax as an LLC", "≈ $16,950"],
          ["Payroll tax on $65,000 salary", "≈ $9,945"],
          ["Extra payroll and return costs", "≈ $2,400"],
          ["Approximate annual saving", "≈ $4,600"],
        ],
      },
      { t: "h", text: "What it costs" },
      {
        t: "list",
        items: [
          "Running payroll for yourself, with quarterly and annual filings",
          "A separate business return (Form 1120-S) due March 15",
          "State fees or franchise taxes in some states",
          "More discipline: no more mixing personal spending into the business account",
        ],
      },
      { t: "h", text: "The reasonable-salary question" },
      {
        t: "p",
        text: "The IRS expects your salary to resemble what you'd pay someone else to do your job. Set it too low and the savings can be reclassified. We look at your role, hours and industry wage data and write down the reasoning, so it's on file if anyone asks.",
      },
      {
        t: "note",
        text: "Our rough threshold: the election starts paying for itself somewhere around $60,000–$80,000 of steady annual profit. Below that, the extra cost usually eats the saving.",
      },
      { t: "h", text: "Timing" },
      {
        t: "p",
        text: "To be taxed as an S corp for a full calendar year, Form 2553 is generally due by March 15 of that year. Late elections are often accepted with a reasonable explanation, but it's simpler to decide in the fall.",
      },
    ],
  },
  {
    slug: "first-hire-payroll",
    title: "Your first employee: the payroll checklist",
    short: "Your first employee",
    dek: "Before the first paycheck goes out, you need about eight things in place. Most of them take an afternoon.",
    topic: "Payroll",
    format: "Checklist",
    author: "Jonah Weiss",
    date: "2026-07-21",
    minutes: 6,
    body: [
      {
        t: "p",
        text: "Hiring your first employee is a good problem. It also turns you into a tax collector overnight: from the first paycheck you're withholding money that belongs to the government and on a deadline to send it.",
      },
      { t: "h", text: "Before the first day" },
      {
        t: "list",
        items: [
          "Register for state withholding and unemployment accounts",
          "Have the employee complete Form W-4 and your state's equivalent",
          "Verify eligibility to work with Form I-9 and keep it on file",
          "Report the new hire to your state within its deadline",
          "Set up workers' compensation coverage",
        ],
      },
      { t: "h", text: "Before the first payday" },
      {
        t: "list",
        items: [
          "Choose a pay schedule and stick to it",
          "Set up direct deposit and a payroll service",
          "Know your federal deposit schedule — usually monthly for small employers",
        ],
      },
      { t: "h", text: "Every quarter and year" },
      {
        t: "p",
        text: "Form 941 reports each quarter's withholding by the end of the following month. In January, W-2s go to employees and the Social Security Administration, and Form 940 settles federal unemployment tax.",
      },
      {
        t: "note",
        text: "Late payroll deposits carry some of the steepest penalties in the tax code. If cash is tight, pay the deposit before almost anything else.",
      },
    ],
  },
  {
    slug: "month-end-close",
    title:
      "What 'closing the books' actually means — and why we do it by the 10th",
    short: "Closing the books",
    dek: "A closed month is one you can trust and nobody edits afterwards. Here is what happens between the 1st and the 10th.",
    topic: "Bookkeeping",
    format: "Explainer",
    author: "Priya Natarajan",
    date: "2026-06-30",
    minutes: 6,
    body: [
      {
        t: "p",
        text: "Categorising transactions is not the same as closing the books. A closed month has been checked against every outside source of truth, adjusted, reviewed — and then locked, so April's numbers in December are the same numbers you saw in May.",
      },
      { t: "h", text: "The close, step by step" },
      {
        t: "list",
        items: [
          "Every bank, card, loan and processor account reconciled to its statement",
          "Undeposited funds and clearing accounts emptied",
          "Payroll journal matched to the payroll report",
          "Sales tax collected matched to the liability account",
          "Accruals and prepaid expenses adjusted",
          "Owner draws and contributions recorded",
          "Reviewed by a second person, then locked",
        ],
      },
      { t: "h", text: "Why the 10th" },
      {
        t: "p",
        text: "Most statements are available by the 3rd or 4th. That leaves a working week to chase the few questions only you can answer. Any later, and the information arrives too late to change a decision in the month that's already running.",
      },
      {
        t: "note",
        text: "If a business decision depends on last month's numbers — a hire, a price change, a loan — a close by the 10th means you make it with real data, not a guess.",
      },
    ],
  },
  {
    slug: "cash-buffer",
    title: "The three-account cash system for seasonal businesses",
    short: "Three-account cash",
    dek: "One account to run on, one for taxes, one for the slow months. Simple enough to keep doing in July.",
    topic: "Cash flow",
    format: "Guide",
    author: "Lena Okafor",
    date: "2026-05-18",
    minutes: 8,
    body: [
      {
        t: "p",
        text: "If your best month is three times your worst — cafés, landscapers, bike shops, gift retailers — your bank balance is lying to you half the year. In the good months it looks like profit; in the slow ones it looks like a crisis. Neither is quite true.",
      },
      { t: "h", text: "The three accounts" },
      {
        t: "figures",
        caption: "Where each deposit goes",
        rows: [
          ["Operating", "Payroll, rent, suppliers — the everyday"],
          ["Tax", "25–30% of monthly profit, untouched"],
          ["Buffer", "10% of revenue in peak months"],
        ],
      },
      { t: "h", text: "How to size the buffer" },
      {
        t: "p",
        text: "Add up the fixed costs you pay every month regardless of sales — rent, salaried wages, loan payments, insurance, software. Multiply by the number of slow months. That's the target. Fill it in peak season; draw it down in the slow one.",
      },
      { t: "h", text: "Making it automatic" },
      {
        t: "list",
        items: [
          "Schedule the tax transfer for the day after your books close",
          "Move the buffer percentage every Monday in peak months",
          "Never pay a supplier from the tax account, even for a week",
        ],
      },
      {
        t: "note",
        text: "A 13-week cash forecast tells you when the buffer will be tested before it happens. That's the main thing our advisory clients pay for.",
      },
    ],
  },
  {
    slug: "year-end-checklist",
    title: "The year-end checklist we send every client in December",
    short: "Year-end checklist",
    dek: "Ten things to do before December 31 that make the return faster, smaller or both.",
    topic: "Tax",
    format: "Checklist",
    author: "Marcus Bell",
    date: "2026-10-06",
    minutes: 5,
    body: [
      {
        t: "p",
        text: "Most of the tax for a year is decided by the time the year ends. A few decisions still have room in December — and a few pieces of paperwork make January much easier.",
      },
      { t: "h", text: "Before December 31" },
      {
        t: "list",
        items: [
          "Collect W-9s from every contractor you paid this year",
          "Decide on equipment purchases you were going to make anyway",
          "Fund retirement plans that must be opened by year-end",
          "Run a final S corp payroll for owner salary if you haven't hit your target",
          "Write off invoices you know will never be paid",
          "Count inventory on the last day of the year",
        ],
      },
      { t: "h", text: "In the first week of January" },
      {
        t: "list",
        items: [
          "Send us final bank and card statements",
          "Confirm employee addresses for W-2s",
          "Upload any 1099-K forms from payment processors",
          "Book your tax review call for February",
        ],
      },
      {
        t: "note",
        text: "Don't buy a truck to save on tax. A deduction saves you a fraction of what you spend; it only makes sense if you needed the truck.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ booking */

export const callTopics = [
  "Switching accountants",
  "Behind on bookkeeping",
  "S corp question",
  "First employee",
  "A letter from the IRS or state",
  "Something else",
];

export const revenueBands = [
  "Under $100k",
  "$100k – $500k",
  "$500k – $2M",
  "Over $2M",
];

export const callTimes = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "15:00",
  "15:30",
  "16:00",
];

export const callPrep = [
  {
    title: "Twenty minutes, on video or phone",
    body: "With Theo or Ana. You'll talk about your business, not our software.",
  },
  {
    title: "Have last year's return nearby",
    body: "Not required, but it lets us quote a package on the call instead of afterwards.",
  },
  {
    title: "A written quote within two business days",
    body: "Fixed monthly fee, start date and what onboarding will need from you.",
  },
];
