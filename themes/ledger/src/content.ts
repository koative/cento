/* All copy and demo data for Ledger. Rebranding the template means editing this file. */

export const brand = {
  name: "Ledger",
  sector: "Personal finance app",
  tagline: "Give every dollar a job before the month does.",
  email: "hello@ledger.example",
  support: "help@ledger.example",
  press: "press@ledger.example",
  phone: "+1 555 0146 220",
  address: [
    "Ledger Money Co.",
    "214 Alder Street, Suite 3",
    "Portland, OR 97204",
  ],
  hours: "Support answers Mon–Fri, 8 am – 6 pm Pacific",
  gallery: "https://koative.github.io/cento/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/households", label: "Households" },
  { to: "/guides", label: "Guides" },
  { to: "/security", label: "Security" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/security", label: "Security" },
      { to: "/changelog", label: "Changelog" },
      { to: "/app", label: "Live demo" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/guides", label: "Money guides" },
      { to: "/households", label: "Households" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/signup", label: "Create an account" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

/* ---------- Marketing pages ---------- */

export const home = {
  title: "Ledger — Personal finance app",
  heading: "Give every dollar a job before the month does.",
  lede: "Ledger is the envelope budget for people who get paid, pay rent and still want a trip in June. Link your accounts, split each paycheck into envelopes, and see exactly what is safe to spend today.",
  steps: [
    {
      title: "Link what you have",
      text: "Checking, savings, cards and loans from 11,000 banks and credit unions. Read-only, so Ledger can see money but never move it.",
    },
    {
      title: "Split the paycheck",
      text: "When income lands, Ledger asks one question: what is this money for? Rent, groceries, the dentist in March. Assign it until nothing is left over.",
    },
    {
      title: "Check in, not up",
      text: "Each purchase comes out of its envelope. A glance at the home screen tells you what is left for the week, in plain dollars, no pie charts required.",
    },
  ],
  allocator: {
    heading: "Try it with your own paycheck",
    text: "Type what lands in your account each month, then move the sliders. This is the whole method: income minus jobs equals zero.",
  },
  accounts: {
    heading: "Every account on one ruled page",
    text: "Your credit union checking, the card you use for groceries, the student loan you would rather not look at. Ledger lines them up with a single net-worth total at the bottom, double-underlined like the paper ledgers it is named after.",
    points: [
      "Balances refresh four times a day",
      "Manual accounts for cash, a car or a loan from your sister",
      "Pending charges shown, never counted twice",
    ],
  },
  card: {
    heading: "Lost your card in a taxi? Freeze it from the sidewalk.",
    text: "Plus members get a Ledger debit card that pays straight from envelopes. One tap pauses it; one tap brings it back when it turns up in your coat.",
  },
  quote: {
    text: "We stopped arguing about money the month we could both see the groceries envelope. It is not romantic. It is better.",
    name: "Ama & Kwame Okafor",
    detail: "Household plan since 2024",
  },
  security: [
    {
      title: "Read-only connections",
      text: "Bank links use tokenised, read-only access. Ledger cannot move money out of your bank.",
    },
    {
      title: "We do not sell data",
      text: "No ads, no affiliate cards, no selling transaction data. You pay us; that is the business.",
    },
    {
      title: "Two-factor by default",
      text: "Passkeys or an authenticator app on every account, not as an upsell.",
    },
  ],
  close: {
    heading: "Next payday, try it once.",
    text: "Free for one person with two linked accounts. No card needed to start.",
  },
};

export const features = {
  title: "Features",
  heading: "Small tools for a monthly habit",
  lede: "Ledger does a handful of things carefully. Everything below works on the free plan unless it says Plus.",
  sections: [
    {
      id: "envelopes",
      title: "Envelopes that roll over",
      text: "Each category is an envelope with a dollar amount, not a percentage. Unspent money stays put next month, so the $40 you did not spend on eating out becomes next month’s buffer instead of disappearing into a chart.",
      points: [
        "Unlimited envelopes and groups",
        "Targets: monthly, by date, or once a year",
        "Overspent envelopes turn red and ask where to cover from",
      ],
    },
    {
      id: "accounts",
      title: "All accounts, one total",
      text: "Link checking, savings, credit cards, loans and investment accounts. Ledger reconciles each night and flags anything it cannot match so you never wonder why the numbers drift.",
      points: [
        "11,000+ banks and credit unions in the US",
        "Manual accounts for cash and assets",
        "Net worth over time, month by month",
      ],
    },
    {
      id: "transactions",
      title: "Transactions that sort themselves",
      text: "Write a rule once — anything from Fernhill Market is groceries — and Ledger files it forever. Split a receipt between envelopes in two taps.",
      points: [
        "Payee rules and splits",
        "Search across years of history",
        "CSV export whenever you want to leave (Plus)",
      ],
    },
    {
      id: "goals",
      title: "Goals with a date on them",
      text: "Tell Ledger you need $3,000 for Lisbon by June and it works out the monthly amount, then quietly reminds you on payday if you fall behind.",
      points: [
        "Date-based savings targets",
        "Progress you can see on the home screen",
        "Pause a goal without losing its history",
      ],
    },
    {
      id: "card",
      title: "The Ledger card (Plus)",
      text: "A Visa debit card that spends from envelopes in real time. Freeze it, set a per-envelope limit, or block a merchant category altogether.",
      points: [
        "Instant freeze and unfreeze",
        "Spend notifications in under a second",
        "No foreign transaction fees",
      ],
    },
  ],
  numbers: {
    heading: "How the money moves",
    rows: [
      { label: "Paycheck lands", value: "Income, ready to assign" },
      { label: "You assign it", value: "Envelopes hold dollars" },
      { label: "You spend", value: "Comes out of one envelope" },
      { label: "Month ends", value: "Leftovers roll forward" },
    ],
  },
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  who: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  heading: "Priced like a utility, not a lifestyle",
  lede: "Ledger is paid for by the people who use it. Start free; upgrade when you want the card or a second person.",
  plans: [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      yearly: 0,
      who: "One person, getting started",
      features: [
        "Unlimited envelopes",
        "2 linked accounts",
        "Manual accounts",
        "Goals with dates",
      ],
      cta: "Start free",
    },
    {
      id: "plus",
      name: "Plus",
      monthly: 7,
      yearly: 60,
      who: "One person, every account",
      features: [
        "Everything in Free",
        "Unlimited linked accounts",
        "Payee rules and splits",
        "Ledger debit card",
        "CSV export and reports",
      ],
      cta: "Start Plus — 30 days free",
      featured: true,
    },
    {
      id: "household",
      name: "Household",
      monthly: 11,
      yearly: 96,
      who: "Two people, one budget",
      features: [
        "Everything in Plus",
        "Two logins, shared envelopes",
        "Private pockets for each person",
        "Monthly money-date reminders",
        "Two Ledger cards",
      ],
      cta: "Start Household",
    },
  ] as Plan[],
  compare: {
    columns: ["Free", "Plus", "Household"],
    rows: [
      { label: "People", values: ["1", "1", "2"] },
      { label: "Linked accounts", values: ["2", "Unlimited", "Unlimited"] },
      {
        label: "Envelopes and goals",
        values: ["Unlimited", "Unlimited", "Unlimited"],
      },
      {
        label: "Payee rules and splits",
        values: ["—", "Included", "Included"],
      },
      { label: "Ledger debit card", values: ["—", "1 card", "2 cards"] },
      { label: "CSV export", values: ["—", "Included", "Included"] },
      {
        label: "Support",
        values: ["Email, 2 days", "Email, same day", "Email, same day"],
      },
    ],
  },
  faq: [
    {
      q: "Is the free plan really free forever?",
      a: "Yes. The free plan has no time limit and no ads. It is limited to two linked bank accounts; manual accounts are unlimited.",
    },
    {
      q: "What happens when the Plus trial ends?",
      a: "We email you seven days before. If you do nothing, your account moves back to Free and keeps every envelope and transaction.",
    },
    {
      q: "Can I switch between monthly and yearly?",
      a: "Any time from Settings. Switching to yearly applies the remaining value of your current month as a credit.",
    },
    {
      q: "Do you offer student pricing?",
      a: "Plus is free for one year with a .edu email address. Renewals are at the regular yearly price.",
    },
    {
      q: "How do refunds work?",
      a: "Yearly plans can be refunded in full within 30 days of payment, no questions asked. Write to help@ledger.example.",
    },
  ],
};

export const security = {
  title: "Security",
  heading: "Your money stays where it is",
  lede: "Ledger reads balances and transactions. It cannot move money out of your bank, and nobody here can either.",
  practices: [
    {
      label: "Bank connections",
      value:
        "Read-only tokens through a regulated aggregator. Your bank password never touches our servers.",
    },
    {
      label: "Encryption",
      value:
        "TLS 1.3 in transit; AES-256 at rest with keys held in a separate hardware module.",
    },
    {
      label: "Sign-in",
      value:
        "Passkeys or authenticator codes required on every account. SMS codes are not offered.",
    },
    {
      label: "Staff access",
      value:
        "Support sees envelope names and totals only with your one-time permission, logged and time-limited to 24 hours.",
    },
    {
      label: "Audits",
      value:
        "Independent SOC 2 Type II report every year, plus two external penetration tests.",
    },
    {
      label: "Data you delete",
      value:
        "Removed from live systems within 7 days and from backups within 35 days.",
    },
  ],
  never: [
    "Sell or rent your transaction data",
    "Show ads or recommend credit cards for a commission",
    "Train models on your purchases",
    "Store your bank username or password",
  ],
  faq: [
    {
      q: "What if Ledger shuts down?",
      a: "You get 90 days’ notice and a full CSV and JSON export. The Ledger card is issued by a partner bank, and funds in it are FDIC-insured up to the standard limit.",
    },
    {
      q: "Someone has my phone. What now?",
      a: "Sign in from any browser and choose Sign out everywhere in Settings, then freeze your card. Or call +1 555 0146 220 and we will do both for you.",
    },
    {
      q: "Can I disconnect a bank?",
      a: "Yes, from Settings at any time. Ledger revokes the token immediately and keeps past transactions unless you ask us to delete them.",
    },
    {
      q: "How do I report a vulnerability?",
      a: "Write to security@ledger.example. We answer within one business day and do not pursue good-faith researchers.",
    },
  ],
};

export type Household = {
  id: string;
  name: string;
  who: string;
  problem: string;
  approach: string;
  envelopes: { name: string; amount: number }[];
  income: number;
  quote: string;
};

export const households = {
  title: "Households",
  heading: "Four kitchen tables, four budgets",
  lede: "No two households use Ledger the same way. Here is how four of them set up their month, with their numbers (shared with permission, names changed).",
  list: [
    {
      id: "okafor",
      name: "Ama & Kwame",
      who: "Two incomes, one rent, Philadelphia",
      problem:
        "Two checking accounts and a running argument about who paid for what.",
      approach:
        "Household plan with shared envelopes for the flat and food, and a private pocket each that the other cannot see.",
      income: 7400,
      envelopes: [
        { name: "Rent & bills", amount: 2620 },
        { name: "Groceries", amount: 780 },
        { name: "Childcare", amount: 1450 },
        { name: "Ama’s pocket", amount: 300 },
        { name: "Kwame’s pocket", amount: 300 },
        { name: "House deposit", amount: 1950 },
      ],
      quote: "The private pockets ended the receipts-on-the-fridge era.",
    },
    {
      id: "mina",
      name: "Mina",
      who: "Freelance illustrator, Tucson",
      problem:
        "Some months bring $9,000, some bring $1,200. Budgeting by percentage never worked.",
      approach:
        "She budgets last month’s income only. Anything above her baseline goes into a buffer envelope that pays next month’s bills.",
      income: 4300,
      envelopes: [
        { name: "Rent & studio", amount: 1700 },
        { name: "Quarterly taxes", amount: 1050 },
        { name: "Groceries", amount: 420 },
        { name: "Supplies", amount: 230 },
        { name: "Buffer month", amount: 600 },
        { name: "Everything else", amount: 300 },
      ],
      quote: "I finally pay estimated taxes without a panic in April.",
    },
    {
      id: "theo",
      name: "Theo",
      who: "First salaried job, Columbus",
      problem:
        "Paid off the card each month and still had no idea where $600 went.",
      approach:
        "Free plan, two accounts, eight envelopes. A weekly fifteen-minute check-in on Sunday morning.",
      income: 3150,
      envelopes: [
        { name: "Rent", amount: 1100 },
        { name: "Student loan", amount: 310 },
        { name: "Groceries", amount: 360 },
        { name: "Going out", amount: 260 },
        { name: "Emergency fund", amount: 500 },
        { name: "Everything else", amount: 620 },
      ],
      quote: "The $600 was takeaway. It is $260 now, on purpose.",
    },
    {
      id: "ruth",
      name: "Ruth & Dan",
      who: "Retired, pension and savings, Duluth",
      problem:
        "Fixed income, rising property tax, and grandchildren with birthdays in every month.",
      approach:
        "Yearly envelopes for the big bills, funded a little every month, and a gifts envelope with a date on each name.",
      income: 4200,
      envelopes: [
        { name: "Property tax", amount: 420 },
        { name: "Home & utilities", amount: 980 },
        { name: "Groceries", amount: 640 },
        { name: "Health", amount: 760 },
        { name: "Grandchildren", amount: 180 },
        { name: "Travel", amount: 600 },
        { name: "Car & insurance", amount: 620 },
      ],
      quote: "November’s tax bill used to ruin Christmas. Now it is just paid.",
    },
  ] as Household[],
};

export const changelog = {
  title: "Changelog",
  heading: "What changed in Ledger",
  lede: "Shipped every other Tuesday. The big ones get a paragraph; the small ones get a line.",
  entries: [
    {
      version: "4.6",
      date: "October 13, 2026",
      title: "Cover overspending in one move",
      text: "When an envelope goes red, Ledger now suggests which envelope can cover it, starting with the ones you have not touched this month.",
      items: [
        "Move money between envelopes from the budget table",
        "Overspent totals included in the month summary email",
        "Fixed rounding on split transactions with three or more parts",
      ],
    },
    {
      version: "4.5",
      date: "September 29, 2026",
      title: "Yearly envelopes",
      text: "Give an envelope a yearly target — car insurance, property tax, a wedding in August — and Ledger works out the monthly amount.",
      items: [
        "Targets by date now show months remaining",
        "Faster reconciliation for credit unions on the Corelink network",
      ],
    },
    {
      version: "4.4",
      date: "September 15, 2026",
      title: "Hide balances in public",
      text: "One tap blurs every amount on screen. Handy on the bus, essential at a family dinner.",
      items: [
        "New setting: hide balances when the app opens",
        "Ledger card: block a merchant category",
      ],
    },
    {
      version: "4.3",
      date: "September 1, 2026",
      title: "Household private pockets",
      text: "Each person on a Household plan gets an envelope only they can see. Totals still add up; details stay private.",
      items: [
        "Partner invitations by link",
        "Activity feed shows who assigned what",
      ],
    },
    {
      version: "4.2",
      date: "August 18, 2026",
      title: "CSV export, everywhere",
      text: "Export any filtered transaction list, not only the whole account.",
      items: [
        "Date-range presets on exports",
        "Payee rules can match on amount",
      ],
    },
    {
      version: "4.1",
      date: "August 4, 2026",
      title: "Passkeys",
      text: "Sign in with Face ID, Touch ID or a hardware key. Authenticator codes still work.",
      items: [
        "Sign out everywhere",
        "New-device emails include the city and browser",
      ],
    },
  ],
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: Person[] = [
  {
    name: "Hannah Okoro",
    role: "Co-founder & CEO",
    initials: "HO",
    bio: "Ran a credit-union branch for nine years and kept every member’s budget on a paper ledger sheet.",
  },
  {
    name: "Felix Brandt",
    role: "Co-founder & engineering",
    initials: "FB",
    bio: "Built payment systems for transit agencies. Thinks reconciliation is a love language.",
  },
  {
    name: "Priya Raman",
    role: "Design lead",
    initials: "PR",
    bio: "Designs for people checking their balance in a supermarket queue with one free hand.",
  },
  {
    name: "Marcus Lee",
    role: "Head of security",
    initials: "ML",
    bio: "Former bank examiner. Wrote the rule that nobody at Ledger can see your transactions by default.",
  },
  {
    name: "Aiko Tanaka",
    role: "Money coach in residence",
    initials: "AT",
    bio: "Accredited financial counsellor. Writes most of our guides and answers the hardest support emails.",
  },
  {
    name: "Sol Ortega",
    role: "Support lead",
    initials: "SO",
    bio: "Leads a team of eight who answer every message by a person, usually the same day.",
  },
];

export const about = {
  title: "About",
  heading: "Made by people who kept paper ledgers",
  lede: "Ledger started at a credit-union branch counter in Portland, where Hannah Okoro spent nine years helping members budget on ruled paper sheets. The sheets worked. They just did not fit in a pocket.",
  story: [
    "In 2021 Hannah and Felix Brandt rebuilt that sheet as an app: one row per envelope, a column for what you assigned, a column for what you spent, and a double rule under the total. Everything since has been an argument about whether a new feature belongs on that sheet.",
    "We are 31 people, mostly in Portland, funded by subscriptions and one small seed round from a credit-union cooperative fund. We have never run an ad, and we intend to keep it that way.",
  ],
  principles: [
    {
      title: "Dollars, not percentages",
      text: "People pay rent in dollars. Every screen talks in the money you actually have.",
    },
    {
      title: "Calm by default",
      text: "No streaks, no confetti, no red badges for spending money you planned to spend.",
    },
    {
      title: "Your data, your exit",
      text: "Export everything in one click. If you leave, we delete it, and we tell you when.",
    },
  ],
  facts: [
    { label: "Founded", value: "2021, Portland, Oregon" },
    { label: "Team", value: "31 people, 8 in support" },
    { label: "Funding", value: "Subscriptions and a cooperative seed fund" },
    { label: "Open roles", value: "Two: iOS engineer, money coach" },
  ],
};

export const signup = {
  title: "Create your account",
  heading: "Start your first month",
  lede: "Two minutes now, one paycheck later. You can link banks after you sign in.",
  perks: [
    "No card needed for the free plan",
    "Cancel any time from Settings",
    "Your first month’s budget set up with a coach, if you want one",
  ],
};

export const signin = {
  title: "Sign in",
  heading: "Welcome back",
  lede: "Use any email and a password of 10 characters to open the demo workspace.",
};

export const notFound = {
  title: "Page not found",
  heading: "That page is not in the ledger",
  text: "The link may be old, or the page moved when we tidied up. These are the pages most people look for.",
};

/* ---------- Guides (journal) ---------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption: string; rows: [string, number][] };

export type Guide = {
  slug: string;
  title: string;
  topic: string;
  minutes: number;
  date: string;
  author: string;
  excerpt: string;
  body: Block[];
};

export const guidesPage = {
  title: "Guides",
  heading: "Money guides, written by a counsellor",
  lede: "Short, practical pieces on budgeting, saving and debt. No affiliate links, nothing to buy.",
};

export const guides: Guide[] = [
  {
    slug: "give-every-dollar-a-job",
    title: "Zero-based budgeting, explained with one paycheck",
    topic: "Budgeting",
    minutes: 6,
    date: "October 9, 2026",
    author: "Aiko Tanaka",
    excerpt:
      "Income minus jobs equals zero. Here is what that looks like with a real $2,100 paycheck.",
    body: [
      {
        type: "p",
        text: "Zero-based budgeting sounds strict. It is mostly a habit of asking one question when money arrives: what is this for? You keep asking until there is nothing left to assign.",
      },
      { type: "h2", text: "One paycheck, start to finish" },
      {
        type: "p",
        text: "Say $2,100 lands on the 15th. Rent is due on the 1st, groceries happen weekly, and the car insurance is due in March. Here is one way to give each dollar a job.",
      },
      {
        type: "table",
        caption: "A $2,100 paycheck, assigned",
        rows: [
          ["Half of next month’s rent", 825],
          ["Groceries, two weeks", 260],
          ["Transit pass", 48],
          ["Utilities and phone", 108],
          ["Car insurance (1/6 of the March bill)", 95],
          ["Eating out", 100],
          ["Rainy-day fund", 400],
          ["Lisbon, June", 150],
          ["Fun money", 114],
        ],
      },
      {
        type: "p",
        text: "The total is exactly $2,100. Not because the numbers are perfect, but because anything left over got a job too. Leftover money without a job is the money that disappears.",
      },
      { type: "h2", text: "When it does not fit" },
      {
        type: "p",
        text: "If the jobs add up to more than the paycheck, something has to wait. Move money from the envelope that can wait longest — usually a want, sometimes a savings goal — and say so out loud. That decision is the budget.",
      },
    ],
  },
  {
    slug: "irregular-income",
    title: "Budgeting when your income won’t sit still",
    topic: "Budgeting",
    minutes: 7,
    date: "September 24, 2026",
    author: "Aiko Tanaka",
    excerpt:
      "Freelancers, tipped workers and seasonal jobs: budget last month’s money, not this month’s hope.",
    body: [
      {
        type: "p",
        text: "Percent-based budgets break the first time a client pays late. The fix is to stop budgeting money you have not received.",
      },
      { type: "h2", text: "Live one month behind" },
      {
        type: "p",
        text: "Fill a buffer envelope until it holds one month of baseline costs. From then on, this month’s spending comes from last month’s income, and a slow month is an inconvenience instead of an emergency.",
      },
      {
        type: "list",
        items: [
          "Work out your baseline: the boring bills that never change",
          "Assign income to the buffer first until it reaches that number",
          "On the 1st, move one month from the buffer into your envelopes",
        ],
      },
      { type: "h2", text: "Taxes are an envelope" },
      {
        type: "p",
        text: "If nobody withholds tax for you, set aside a fixed share of every payment the day it arrives. Most freelancers in the US land between 25% and 30%; your accountant can tell you your number.",
      },
    ],
  },
  {
    slug: "rainy-day-fund-size",
    title: "How big should a rainy-day fund be, really?",
    topic: "Saving",
    minutes: 5,
    date: "September 10, 2026",
    author: "Aiko Tanaka",
    excerpt:
      "Three to six months is a slogan. Start with the next surprise instead.",
    body: [
      {
        type: "p",
        text: "Most advice says three to six months of expenses. For someone starting at zero, that number is so large it stops them starting at all.",
      },
      { type: "h2", text: "Three stages that actually get done" },
      {
        type: "list",
        items: [
          "Stage one: $1,000, enough for a car repair or a vet bill",
          "Stage two: one month of essential costs",
          "Stage three: three months, or six if your income is irregular",
        ],
      },
      {
        type: "p",
        text: "Keep it in a separate savings account you can reach in a day, not an investment account. Its job is to be boring and available.",
      },
      { type: "h2", text: "When to use it" },
      {
        type: "p",
        text: "Use it for anything that is urgent, necessary and unexpected. Then make refilling it the first job of your next paycheck.",
      },
    ],
  },
  {
    slug: "true-expenses",
    title: "The bills that ambush you once a year",
    topic: "Budgeting",
    minutes: 4,
    date: "August 27, 2026",
    author: "Hannah Okoro",
    excerpt:
      "Car insurance, renewals, holidays: divide them by twelve and they stop being emergencies.",
    body: [
      {
        type: "p",
        text: "A month that feels like it went wrong usually had a bill in it you knew about in January. These are not emergencies; they are true expenses that arrive in lumps.",
      },
      {
        type: "table",
        caption: "One household’s yearly bills, monthly share",
        rows: [
          ["Car insurance", 95],
          ["Property tax", 420],
          ["Holiday gifts", 60],
          ["Annual subscriptions", 18],
          ["Glasses and dental", 35],
        ],
      },
      {
        type: "p",
        text: "Give each one an envelope with a date. Fund it a little every month. When the bill arrives, the money is already sitting there with its name on it.",
      },
    ],
  },
  {
    slug: "avalanche-or-snowball",
    title: "Avalanche or snowball: picking a debt order you’ll keep",
    topic: "Debt",
    minutes: 6,
    date: "August 12, 2026",
    author: "Aiko Tanaka",
    excerpt:
      "The maths favours one. Your Thursday-night self may favour the other.",
    body: [
      {
        type: "p",
        text: "Both methods pay the minimum on everything and put every extra dollar on one debt. They differ only in which debt goes first.",
      },
      {
        type: "list",
        items: [
          "Avalanche: highest interest rate first. Cheapest overall.",
          "Snowball: smallest balance first. Fastest first win.",
        ],
      },
      { type: "h2", text: "Which one is right" },
      {
        type: "p",
        text: "If the rates are close, pick snowball; closing an account in month three keeps people going. If one card charges 29% and the rest charge 7%, the avalanche saves enough to be worth the patience.",
      },
      {
        type: "p",
        text: "In Ledger, give each debt its own envelope and a payoff date. The extra payment becomes a job like any other.",
      },
    ],
  },
  {
    slug: "money-date",
    title: "The fifteen-minute money date for couples",
    topic: "Couples",
    minutes: 5,
    date: "July 29, 2026",
    author: "Hannah Okoro",
    excerpt:
      "Same time every week, one agenda, and a rule about not relitigating the takeaway.",
    body: [
      {
        type: "p",
        text: "Couples who talk about money weekly fight about it less. Not because they agree more, but because the conversations are shorter and nothing has piled up.",
      },
      { type: "h2", text: "The agenda" },
      {
        type: "list",
        items: [
          "Two minutes: anything unusual coming up this week?",
          "Five minutes: categorise anything Ledger could not",
          "Five minutes: cover any red envelopes together",
          "Three minutes: one thing you are saving toward and how close it is",
        ],
      },
      {
        type: "p",
        text: "Keep a private pocket each. Money in it is nobody’s business, which turns out to be the most romantic feature we ship.",
      },
    ],
  },
  {
    slug: "overspent-envelope",
    title: "What to do the day an envelope goes red",
    topic: "Budgeting",
    minutes: 3,
    date: "July 15, 2026",
    author: "Sol Ortega",
    excerpt:
      "Overspending is information, not failure. Cover it, then ask one question.",
    body: [
      {
        type: "p",
        text: "Red means you spent more than you assigned. It happens to everyone in their first three months and to most people every few months after that.",
      },
      { type: "h2", text: "Cover it today" },
      {
        type: "p",
        text: "Move money from an envelope that can wait. Fun money and eating out are the usual donors. The budget is balanced again in ten seconds.",
      },
      { type: "h2", text: "Then ask one question" },
      {
        type: "p",
        text: "Was the amount wrong, or was the month unusual? If the groceries envelope goes red three months running, the number was a wish. Raise it, and take the difference from somewhere honest.",
      },
    ],
  },
];

/* ---------- App demo data ---------- */

export const app = {
  user: { name: "Jamie Davis", initials: "JD", email: "jamie@ledger.example" },
  month: "October 2026",
  today: "2026-10-18",
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/budgets", label: "Budgets" },
    { to: "/app/accounts", label: "Accounts" },
    { to: "/app/transactions", label: "Transactions" },
    { to: "/app/settings", label: "Settings" },
  ],
};

export type AccountKind =
  "Cash" | "Credit" | "Savings" | "Investments" | "Loans";

export type Account = {
  id: string;
  name: string;
  institution: string;
  kind: AccountKind;
  mask: string;
  balance: number;
  /** Month-end balances, May → October. */
  history: number[];
  rate?: string;
  note: string;
};

export const historyMonths = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export const accounts: Account[] = [
  {
    id: "everyday",
    name: "Everyday checking",
    institution: "Northfield Credit Union",
    kind: "Cash",
    mask: "0082",
    balance: 3214.56,
    history: [2410, 2980, 2655, 3105, 2870, 3214.56],
    note: "Paycheck lands here on the 1st and 15th. The Ledger card spends from this account.",
  },
  {
    id: "rainy-day",
    name: "Rainy-day savings",
    institution: "Northfield Credit Union",
    kind: "Savings",
    mask: "4410",
    balance: 9850,
    history: [7850, 8250, 8650, 9050, 9450, 9850],
    rate: "3.9% APY",
    note: "Stage two of three: one month of essential costs is covered; three months is the target.",
  },
  {
    id: "lisbon",
    name: "Lisbon fund",
    institution: "Ashby Mutual",
    kind: "Savings",
    mask: "7713",
    balance: 1850,
    history: [300, 600, 900, 1250, 1550, 1850],
    rate: "4.1% APY",
    note: "Goal: $3,000 by June 1, 2027. On track at $300 a month.",
  },
  {
    id: "rewards-card",
    name: "Calder Rewards Visa",
    institution: "Calder Bank",
    kind: "Credit",
    mask: "2291",
    balance: -642.18,
    history: [-512.4, -730.15, -488.9, -601.33, -566.02, -642.18],
    rate: "24.9% APR",
    note: "Paid in full each month from checking. Used for groceries and eating out for the cashback.",
  },
  {
    id: "retirement",
    name: "Roth IRA",
    institution: "Tillage Investing",
    kind: "Investments",
    mask: "9031",
    balance: 24310.77,
    history: [21880, 22410, 22950, 23120, 23860, 24310.77],
    note: "Tracked only. Ledger shows the balance; contributions happen at Tillage.",
  },
  {
    id: "student-loan",
    name: "Student loan",
    institution: "Federal Direct",
    kind: "Loans",
    mask: "5527",
    balance: -11420,
    history: [-12620, -12380, -12140, -11900, -11660, -11420],
    rate: "4.5% fixed",
    note: "$240 a month on autopay. Paid off in April 2030 at this pace.",
  },
];

export type Envelope = {
  id: string;
  name: string;
  group: string;
  assigned: number;
};

export const envelopes: Envelope[] = [
  { id: "rent", name: "Rent", group: "Bills", assigned: 1650 },
  { id: "utilities", name: "Utilities", group: "Bills", assigned: 140 },
  { id: "phone", name: "Phone & internet", group: "Bills", assigned: 75 },
  { id: "subs", name: "Subscriptions", group: "Bills", assigned: 48 },
  { id: "groceries", name: "Groceries", group: "Everyday", assigned: 520 },
  { id: "transit", name: "Transit", group: "Everyday", assigned: 96 },
  { id: "eating", name: "Eating out", group: "Everyday", assigned: 200 },
  { id: "health", name: "Health", group: "Everyday", assigned: 60 },
  { id: "fun", name: "Fun money", group: "Wants", assigned: 150 },
  { id: "gifts", name: "Gifts", group: "Wants", assigned: 80 },
  { id: "rainy", name: "Rainy day", group: "Savings", assigned: 400 },
  { id: "trip", name: "Lisbon, June", group: "Savings", assigned: 300 },
];

/** Category ids are envelope ids, plus "income" (money in) and "transfer" (between your own accounts). */
export type Transaction = {
  id: string;
  date: string;
  payee: string;
  category: string;
  account: string;
  amount: number;
};

export const transactions: Transaction[] = [
  {
    id: "t32",
    date: "2026-10-17",
    payee: "Harbor Oyster Co.",
    category: "eating",
    account: "rewards-card",
    amount: -96.2,
  },
  {
    id: "t31",
    date: "2026-10-17",
    payee: "Fernhill Market",
    category: "groceries",
    account: "rewards-card",
    amount: -64.2,
  },
  {
    id: "t30",
    date: "2026-10-17",
    payee: "Little Company Coffee",
    category: "eating",
    account: "everyday",
    amount: -6.75,
  },
  {
    id: "t29",
    date: "2026-10-16",
    payee: "Cinema Nine",
    category: "fun",
    account: "rewards-card",
    amount: -28,
  },
  {
    id: "t28",
    date: "2026-10-15",
    payee: "Studio North payroll",
    category: "income",
    account: "everyday",
    amount: 2100,
  },
  {
    id: "t27",
    date: "2026-10-14",
    payee: "Bluebird Pharmacy",
    category: "health",
    account: "everyday",
    amount: -23.4,
  },
  {
    id: "t26",
    date: "2026-10-13",
    payee: "Taqueria Sol",
    category: "eating",
    account: "rewards-card",
    amount: -18.4,
  },
  {
    id: "t25",
    date: "2026-10-13",
    payee: "Sunday Supply",
    category: "gifts",
    account: "everyday",
    amount: -46,
  },
  {
    id: "t24",
    date: "2026-10-12",
    payee: "Fernhill Market",
    category: "groceries",
    account: "rewards-card",
    amount: -88.35,
  },
  {
    id: "t23",
    date: "2026-10-11",
    payee: "Osteria Lume",
    category: "eating",
    account: "rewards-card",
    amount: -54.8,
  },
  {
    id: "t22",
    date: "2026-10-10",
    payee: "Northfield Electric",
    category: "utilities",
    account: "everyday",
    amount: -71.12,
  },
  {
    id: "t21",
    date: "2026-10-09",
    payee: "Greenline Climbing",
    category: "fun",
    account: "everyday",
    amount: -22,
  },
  {
    id: "t20",
    date: "2026-10-09",
    payee: "Corner Grocer",
    category: "groceries",
    account: "everyday",
    amount: -23.6,
  },
  {
    id: "t19",
    date: "2026-10-08",
    payee: "Sound & Color",
    category: "subs",
    account: "rewards-card",
    amount: -10.99,
  },
  {
    id: "t18",
    date: "2026-10-07",
    payee: "Little Company Coffee",
    category: "eating",
    account: "everyday",
    amount: -5.5,
  },
  {
    id: "t17",
    date: "2026-10-06",
    payee: "Fernhill Market",
    category: "groceries",
    account: "rewards-card",
    amount: -102.74,
  },
  {
    id: "t16",
    date: "2026-10-05",
    payee: "Pine Street Properties",
    category: "rent",
    account: "everyday",
    amount: -1650,
  },
  {
    id: "t15",
    date: "2026-10-05",
    payee: "Lantern Fibre",
    category: "phone",
    account: "everyday",
    amount: -55,
  },
  {
    id: "t14",
    date: "2026-10-04",
    payee: "Paperback Annex",
    category: "fun",
    account: "rewards-card",
    amount: -18.5,
  },
  {
    id: "t13",
    date: "2026-10-04",
    payee: "Fernhill Market",
    category: "groceries",
    account: "rewards-card",
    amount: -71.08,
  },
  {
    id: "t12",
    date: "2026-10-03",
    payee: "Brightwave Mobile",
    category: "phone",
    account: "everyday",
    amount: -20,
  },
  {
    id: "t11",
    date: "2026-10-02",
    payee: "Noodle Bar Kiri",
    category: "eating",
    account: "rewards-card",
    amount: -31.2,
  },
  {
    id: "t10",
    date: "2026-10-01",
    payee: "Studio North payroll",
    category: "income",
    account: "everyday",
    amount: 2100,
  },
  {
    id: "t09",
    date: "2026-10-01",
    payee: "City Transit pass",
    category: "transit",
    account: "everyday",
    amount: -96,
  },
  {
    id: "t08",
    date: "2026-10-01",
    payee: "Streamline TV",
    category: "subs",
    account: "rewards-card",
    amount: -15.49,
  },
  {
    id: "t07",
    date: "2026-10-01",
    payee: "Cloudbox storage",
    category: "subs",
    account: "rewards-card",
    amount: -2.99,
  },
  {
    id: "t06",
    date: "2026-09-30",
    payee: "Calder Bank payment",
    category: "transfer",
    account: "rewards-card",
    amount: 566.02,
  },
  {
    id: "t05",
    date: "2026-09-29",
    payee: "Fernhill Market",
    category: "groceries",
    account: "rewards-card",
    amount: -58.9,
  },
  {
    id: "t04",
    date: "2026-09-28",
    payee: "Federal Direct loan",
    category: "transfer",
    account: "student-loan",
    amount: 240,
  },
  {
    id: "t03",
    date: "2026-09-27",
    payee: "Little Company Coffee",
    category: "eating",
    account: "everyday",
    amount: -6.75,
  },
  {
    id: "t02",
    date: "2026-09-26",
    payee: "Tillage contribution",
    category: "transfer",
    account: "retirement",
    amount: 300,
  },
  {
    id: "t01",
    date: "2026-09-25",
    payee: "Ashby Mutual transfer",
    category: "transfer",
    account: "lisbon",
    amount: 300,
  },
];

/** Cumulative spending by day last month (September), for the overview pace chart. */
export const lastMonthPace = [
  152, 190, 1880, 1902, 1951, 2035, 2062, 2101, 2180, 2205, 2236, 2310, 2398,
  2421, 2440, 2512, 2560, 2601, 2655, 2690, 2741, 2803, 2850, 2886, 2930, 2972,
  3010, 3061, 3120, 3168,
];

export const settings = {
  institutions: [
    {
      id: "northfield",
      name: "Northfield Credit Union",
      accounts: 2,
      synced: "Today, 7:42 am",
    },
    {
      id: "calder",
      name: "Calder Bank",
      accounts: 1,
      synced: "Today, 7:42 am",
    },
    {
      id: "ashby",
      name: "Ashby Mutual",
      accounts: 1,
      synced: "Yesterday, 9:10 pm",
    },
    {
      id: "tillage",
      name: "Tillage Investing",
      accounts: 1,
      synced: "Today, 6:05 am",
    },
  ],
};
