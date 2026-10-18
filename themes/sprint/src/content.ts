/*
 * Every word and number the business owns lives here. Sprint and everything in it
 * (customers, people, prices, issues) is fictional demonstration content.
 */

export const brand = {
  name: "Sprint",
  legal: "Sprint Works, Inc.",
  tagline: "The board your standup actually looks at.",
  email: "hello@sprint.example",
  salesEmail: "sales@sprint.example",
  phone: "+1 555 0173",
  phoneHref: "tel:+15550173",
  address: ["418 Mercer Street, Floor 3", "Portland, OR 97209"],
  hours: "Support answers Mon–Fri, 7am–7pm Pacific",
};

export const nav = [
  { to: "/product", label: "Product" },
  { to: "/customers", label: "Customers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "Tour" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
      { to: "/app", label: "Live demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/customers", label: "Customers" },
      { to: "/contact", label: "Talk to sales" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signin", label: "Sign in" },
      { to: "/signup", label: "Start free" },
    ],
  },
];

/* ---------- Home ---------- */

export const home = {
  title: "Sprint — Project management for teams that ship weekly",
  h1: ["Plan on Monday.", "Ship by Friday."],
  lede: "Sprint is the board, the backlog and the cycle report for software teams of 5 to 500. Every issue is one card, every move is one key, and Thursday’s standup already knows what will slip.",
  primary: { to: "/signup", label: "Start free" },
  secondary: { to: "/app", label: "Open the live demo" },
  note: "Free for up to 10 people. No card, no trial clock.",
  week: {
    title: "Built around the week you already run",
    lede: "Sprint does not invent a process. It gives the four rituals your team keeps anyway a place to stand.",
  },
  planner: {
    title: "Will it fit? Find out before planning ends.",
    lede: "Pick from the backlog the way you would on Monday. Sprint weighs the commitment against your last three cycles and the days people are out, then draws the burndown you are signing up for.",
  },
  keys: {
    title: "Every move has a key",
    lede: "Mice are for drawing. Triage forty issues without leaving the home row — the same shortcuts work on the board, in lists and inside an issue.",
  },
  views: {
    title: "One issue, three ways to see it",
    items: [
      {
        name: "Board",
        text: "Columns are your workflow. Limits on work in progress turn the header red before the column turns into a queue.",
      },
      {
        name: "List",
        text: "Sort by priority, filter by person, search by key. Built for the person who reads the whole backlog on Friday afternoon.",
      },
      {
        name: "Issue",
        text: "Description, checklist, every status change and every comment, in the order they happened. Nothing hides in a side panel.",
      },
    ],
  },
  quote: {
    text: "We used to spend the first twenty minutes of planning arguing about what ‘done’ meant last time. Now the board just tells us, and we spend those twenty minutes on the next thing.",
    person: "Ruth Achterberg",
    role: "Engineering manager, Quayside Games",
    story: "quayside-games",
  },
  connect: {
    title: "Fits next to the tools you already have",
    lede: "Branch names move issues to In review. Merges close them. Incidents open them. Calendars know who is out.",
    items: [
      {
        name: "Git hosting",
        text: "Branch, pull request and merge events move issues automatically.",
      },
      {
        name: "Team chat",
        text: "Post the board, a cycle summary or a single issue into any channel.",
      },
      {
        name: "On-call paging",
        text: "Incidents arrive as Urgent issues with the alert attached.",
      },
      {
        name: "Calendars",
        text: "Time off flows into cycle capacity without anyone typing it twice.",
      },
      {
        name: "Design files",
        text: "Paste a frame link and the preview lives on the issue.",
      },
      {
        name: "Webhooks & API",
        text: "Everything you can click is a documented REST endpoint.",
      },
    ],
  },
  close: {
    title: "Your next sprint starts Monday.",
    lede: "Import a CSV or start from an empty board. Most teams run their first planning in Sprint the same week.",
  },
};

export const week = [
  {
    day: "Mon",
    ritual: "Planning",
    time: "45 min",
    text: "Pull from a ranked backlog, check the commitment against capacity, start the cycle.",
  },
  {
    day: "Tue–Thu",
    ritual: "Standup",
    time: "10 min",
    text: "Walk the board right to left. Blocked cards float up; nothing to report means nothing to say.",
  },
  {
    day: "Fri",
    ritual: "Review",
    time: "30 min",
    text: "Done is a column, not an opinion. Demo what reached it and carry the rest with its history.",
  },
  {
    day: "Fri",
    ritual: "Retro",
    time: "20 min",
    text: "The cycle report shows where work waited. Talk about that, not about how the sprint felt.",
  },
];

/* ---------- Signature planner ---------- */

export const planner = {
  velocity: [31, 36, 35],
  team: 5,
  days: 10,
  backlog: [
    {
      key: "FRN-241",
      title: "Saved trips sync across devices",
      points: 8,
      priority: "high",
    },
    {
      key: "FRN-242",
      title: "Fix double charge on retried payment",
      points: 5,
      priority: "urgent",
    },
    {
      key: "FRN-243",
      title: "Seat map loads under 1 second",
      points: 5,
      priority: "high",
    },
    {
      key: "FRN-244",
      title: "Receipts as PDF from trip page",
      points: 3,
      priority: "medium",
    },
    {
      key: "FRN-245",
      title: "Android dark theme polish",
      points: 3,
      priority: "low",
    },
    {
      key: "FRN-246",
      title: "Group booking for up to 8 travellers",
      points: 8,
      priority: "medium",
    },
    {
      key: "FRN-247",
      title: "Reduce cold start on older iPhones",
      points: 5,
      priority: "high",
    },
    {
      key: "FRN-248",
      title: "Copy pass on cancellation flow",
      points: 2,
      priority: "low",
    },
  ] satisfies {
    key: string;
    title: string;
    points: number;
    priority: Priority;
  }[],
  preselected: ["FRN-241", "FRN-242", "FRN-243", "FRN-247", "FRN-244"],
};

/* ---------- Keyboard ---------- */

export const shortcuts = [
  { keys: ["C"], action: "Create an issue" },
  { keys: ["Shift", "→"], action: "Move the focused card one column right" },
  { keys: ["Shift", "←"], action: "Move it back a column" },
  { keys: ["Shift", "↑"], action: "Raise it within the column" },
  { keys: ["A"], action: "Assign to yourself" },
  { keys: ["P", "1–4"], action: "Set priority, Urgent to Low" },
  { keys: ["E", "1–8"], action: "Estimate in points" },
  { keys: ["/"], action: "Search every issue by key or title" },
  { keys: ["G", "B"], action: "Go to the board" },
  { keys: ["G", "L"], action: "Go to the list" },
];

/* ---------- Product ---------- */

export const product = {
  title: "Product tour",
  h1: "A tour of the wall, rebuilt for screens",
  lede: "Sprint started as a photo of an index-card wall and a question: what would that wall do if it could count? These are the answers we shipped.",
  sections: [
    {
      id: "board",
      title: "The board",
      lede: "Cards move by drag or by key, and every move is written down. Columns carry limits on work in progress, so the queue is visible before it is a problem.",
      points: [
        "Custom columns per team, with optional WIP limits",
        "Drag with a pointer or move with Shift and the arrow keys",
        "Swimlanes by person, priority or label",
        "Blocked cards rise to the top of their column",
      ],
    },
    {
      id: "cycles",
      title: "Cycles",
      lede: "Two weeks is a default, not a law. Sprint learns your team’s real velocity from the last three cycles and plots the burndown you are actually on, not the one you hoped for.",
      points: [
        "Capacity from velocity and time off",
        "Burndown and scope-change lines on one chart",
        "Unfinished work rolls over with its full history",
        "Cycle report ready for the retro, not built during it",
      ],
    },
    {
      id: "triage",
      title: "Triage",
      lede: "New issues from support, incidents and the API land in one inbox. Accept, merge as a duplicate or decline with a reason — in about four keystrokes each.",
      points: [
        "One inbox for every intake channel",
        "Duplicate detection on title and stack trace",
        "Decline with a reason the reporter can read",
        "Rotating triage owner per week",
      ],
    },
    {
      id: "roadmap",
      title: "Roadmap",
      lede: "Projects sit above cycles on a quarter view. Progress comes from the issues inside them, so nobody updates a status slide by hand again.",
      points: [
        "Quarter and half-year views",
        "Progress computed from issues, never typed",
        "Target dates that warn when the burn rate disagrees",
        "Share a read-only link with people outside the team",
      ],
    },
  ],
  roadmap: [
    { name: "Offline itineraries", start: 0, span: 5, done: 0.8 },
    { name: "Payments v2", start: 2, span: 6, done: 0.45 },
    { name: "Group booking", start: 5, span: 5, done: 0.15 },
    { name: "Accessibility audit", start: 1, span: 3, done: 1 },
    { name: "Android parity", start: 6, span: 6, done: 0 },
  ],
  roadmapWeeks: ["Oct 5", "Oct 19", "Nov 2", "Nov 16", "Nov 30", "Dec 14"],
  triage: [
    {
      source: "Support",
      title: "Promo code disappears after switching currency",
      age: "12 min",
    },
    {
      source: "Incident",
      title: "Payment webhook 502s from the EU region",
      age: "40 min",
    },
    {
      source: "API",
      title: "Crash on launch — iOS 17.6, iPhone XR",
      age: "2 h",
    },
    {
      source: "Support",
      title: "Can’t remove a traveller from a saved trip",
      age: "5 h",
    },
  ],
  security: {
    title: "Boring about the things that should be boring",
    items: [
      "SSO with SAML and SCIM provisioning on Business",
      "Data hosted in the US or the EU, your choice per workspace",
      "Audit log of every permission and workflow change",
      "Full export to CSV and JSON, any time, no ticket required",
    ],
  },
};

/* ---------- Pricing ---------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  cta: { to: string; label: string };
  features: string[];
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  h1: "Priced per person, not per feature",
  lede: "Every plan has the board, the list, cycles and the keyboard. You pay for more people and for the controls larger companies need.",
  yearlyNote: "Yearly billing saves two months.",
  currency: "USD",
  plans: [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      yearly: 0,
      blurb: "For a team finding its rhythm.",
      cta: { to: "/signup", label: "Start free" },
      features: [
        "Up to 10 people",
        "Unlimited issues and boards",
        "Two-week cycles",
        "Git and chat integrations",
      ],
    },
    {
      id: "team",
      name: "Team",
      monthly: 9,
      yearly: 7.5,
      blurb: "For teams that plan every week and want the numbers.",
      cta: { to: "/signup", label: "Start with Team" },
      features: [
        "Unlimited people",
        "Cycle reports and burndown",
        "WIP limits and swimlanes",
        "Triage inbox",
        "Guest access",
      ],
      featured: true,
    },
    {
      id: "business",
      name: "Business",
      monthly: 16,
      yearly: 13,
      blurb: "For several teams sharing one roadmap.",
      cta: { to: "/contact", label: "Talk to sales" },
      features: [
        "Everything in Team",
        "Roadmap and projects",
        "SAML SSO and SCIM",
        "Audit log",
        "EU data residency",
      ],
    },
  ] satisfies Plan[],
  compare: {
    columns: ["Free", "Team", "Business"],
    rows: [
      { label: "People", values: ["10", "Unlimited", "Unlimited"] },
      {
        label: "Boards and issues",
        values: ["Unlimited", "Unlimited", "Unlimited"],
      },
      { label: "Cycle length", values: ["2 weeks", "1–4 weeks", "1–4 weeks"] },
      {
        label: "Cycle reports",
        values: ["Last cycle", "Full history", "Full history"],
      },
      { label: "WIP limits", values: ["—", "Yes", "Yes"] },
      { label: "Triage inbox", values: ["—", "Yes", "Yes"] },
      { label: "Roadmap", values: ["—", "—", "Yes"] },
      { label: "Guests", values: ["—", "5 per team", "Unlimited"] },
      { label: "SSO / SCIM", values: ["—", "—", "Yes"] },
      { label: "Audit log", values: ["—", "—", "1 year"] },
      {
        label: "Support",
        values: ["Community", "Email, 1 business day", "Email, 4 hours"],
      },
    ],
  },
  faqs: [
    {
      q: "Who counts as a person?",
      a: "Anyone who can create or move issues. Guests who only comment and read are free on Team up to five per team, and unlimited on Business.",
    },
    {
      q: "What happens when we pass ten people on Free?",
      a: "Nothing breaks. Sprint asks the workspace owner to pick a plan, and the eleventh person can join as soon as they do. Your data stays where it is.",
    },
    {
      q: "Can we switch between monthly and yearly?",
      a: "Yes, at any time. Switching to yearly credits what is left of the current month; switching back takes effect at renewal.",
    },
    {
      q: "Do you discount for nonprofits and schools?",
      a: "Team is free for registered nonprofits and accredited schools. Write to us from an address on your organisation’s domain.",
    },
    {
      q: "Can we import from another tool?",
      a: "Sprint imports CSV exports with status, assignee, estimate, labels and comments. Most imports of a few thousand issues finish in under a minute.",
    },
    {
      q: "Where is our data stored?",
      a: "In the US by default, or in the EU on Business. Backups are encrypted and kept for 30 days.",
    },
  ],
};

/* ---------- Customers ---------- */

export type Story = {
  slug: string;
  company: string;
  industry: string;
  size: "Under 20" | "20–100" | "100+";
  teamSize: number;
  city: string;
  headline: string;
  summary: string;
  quote: string;
  person: string;
  role: string;
  before: string;
  workflow: { name: string; limit?: number }[];
  setup: string[];
  body: { title: string; paragraphs: string[] }[];
  facts: { label: string; value: string }[];
};

export const customersPage = {
  title: "Customers",
  h1: "Teams that stopped arguing about the board",
  lede: "Studios, utilities, clinics and agencies, from eight people to three hundred. Each of them changed one habit first. Here is what it was.",
};

export const stories: Story[] = [
  {
    slug: "quayside-games",
    company: "Quayside Games",
    industry: "Games",
    size: "20–100",
    teamSize: 64,
    city: "Glasgow",
    headline: "A live-ops studio that plans around patch day",
    summary:
      "Four game teams and a weekly patch train, coordinated on one board without a producer in the middle of every message.",
    quote:
      "We used to spend the first twenty minutes of planning arguing about what ‘done’ meant last time. Now the board just tells us, and we spend those twenty minutes on the next thing.",
    person: "Ruth Achterberg",
    role: "Engineering manager",
    before: "Spreadsheet per team, wiki for the patch notes",
    workflow: [
      { name: "Backlog" },
      { name: "Next patch", limit: 12 },
      { name: "Building", limit: 6 },
      { name: "QA", limit: 4 },
      { name: "Shipped" },
    ],
    setup: [
      "One-week cycles that end on patch day",
      "A QA column with a hard limit of four",
      "Incidents from the live servers arrive as Urgent issues",
    ],
    body: [
      {
        title: "The patch train needed a timetable",
        paragraphs: [
          "Quayside ships a patch to its two live games every Wednesday. Before Sprint, each team tracked work in its own spreadsheet and a producer stitched them together on Tuesday night, usually by asking in chat who was done.",
          "The first change was the smallest: one board, one-week cycles that end on Tuesday at noon, and a column called Next patch that only the release lead could pull into.",
        ],
      },
      {
        title: "Limits on QA, not on ambition",
        paragraphs: [
          "The QA team is three people. Putting a limit of four on their column made the queue impossible to ignore — when it turned red, developers stopped starting new work and started testing each other’s.",
          "Within six weeks the share of patch items that slipped to the following week fell from roughly a third to about one in ten. Nobody was asked to work later; the work just stopped waiting.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "3 weeks" },
      { label: "Cycle length", value: "1 week" },
      { label: "Plan", value: "Team" },
    ],
  },
  {
    slug: "brightwater-utilities",
    company: "Brightwater Utilities",
    industry: "Energy",
    size: "100+",
    teamSize: 310,
    city: "Columbus",
    headline: "Twelve teams, one roadmap, zero status slides",
    summary:
      "A regional utility’s digital department replaced its Monday status deck with a roadmap that updates itself from the issues underneath it.",
    quote:
      "The steering committee used to get a deck that was already a week old. Now they get a link, and it is correct when they open it.",
    person: "Daniel Oyelaran",
    role: "Head of delivery",
    before: "Three tools and a weekly slide deck",
    workflow: [
      { name: "Intake" },
      { name: "Ready", limit: 20 },
      { name: "In progress", limit: 10 },
      { name: "Review", limit: 6 },
      { name: "Released" },
    ],
    setup: [
      "Business plan with SAML SSO",
      "Twelve team boards feeding one roadmap",
      "EU-style audit log kept for regulator reviews",
    ],
    body: [
      {
        title: "The deck was the product",
        paragraphs: [
          "Every Monday, team leads at Brightwater spent most of the morning updating a shared presentation for the steering committee. The slides were careful, colourful and out of date by Wednesday.",
          "Moving twelve teams onto Sprint took one quarter, team by team. Each project on the roadmap reads its progress from the issues inside it, so the deck simply stopped being needed.",
        ],
      },
      {
        title: "Auditors like boring",
        paragraphs: [
          "As a regulated utility, Brightwater has to show who changed what and when. The audit log and SCIM provisioning meant IT approved the rollout in a single review instead of the three it had budgeted for.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "1 quarter" },
      { label: "Cycle length", value: "2 weeks" },
      { label: "Plan", value: "Business" },
    ],
  },
  {
    slug: "orchard-health",
    company: "Orchard Health",
    industry: "Healthcare",
    size: "20–100",
    teamSize: 42,
    city: "Minneapolis",
    headline: "Clinic software that triages like a clinic",
    summary:
      "A patient-booking platform routes bug reports from 300 clinics through one triage inbox with a rotating owner.",
    quote:
      "Our support team finally stopped forwarding emails into a void. They can see the issue they filed, who has it, and when it ships.",
    person: "Amara Lindqvist",
    role: "Product lead",
    before: "Shared inbox and a weekly bug-bash",
    workflow: [
      { name: "Triage" },
      { name: "Accepted" },
      { name: "In progress", limit: 8 },
      { name: "Verify", limit: 5 },
      { name: "Done" },
    ],
    setup: [
      "Triage inbox fed by support and on-call",
      "A weekly rotating triage owner",
      "Guests from support can comment and follow",
    ],
    body: [
      {
        title: "Three hundred clinics, one inbox",
        paragraphs: [
          "Orchard’s support team took reports by phone and email and forwarded the ones that looked like bugs to engineering. Engineering answered the ones it noticed.",
          "Now every report becomes a triage item. One engineer per week owns the inbox; accepting, merging or declining takes a few keystrokes, and the reporter sees the outcome on the issue.",
        ],
      },
      {
        title: "Declined, with a reason",
        paragraphs: [
          "The surprising change was in declined reports. Because a decline requires a short reason, support could explain it to the clinic the same day — and stopped re-filing the same thing three times.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "2 weeks" },
      { label: "Cycle length", value: "2 weeks" },
      { label: "Plan", value: "Team" },
    ],
  },
  {
    slug: "fenwick-rowe",
    company: "Fenwick & Rowe",
    industry: "Agency",
    size: "Under 20",
    teamSize: 14,
    city: "Leeds",
    headline: "An agency that invites the client onto the board",
    summary:
      "A fourteen-person product studio gives each client a guest seat on their project board, and cut weekly status calls in half.",
    quote:
      "Clients don’t want a status report. They want to see the card move. So we let them watch it move.",
    person: "Tomasz Rowe",
    role: "Co-founder",
    before: "Status emails and a shared spreadsheet",
    workflow: [
      { name: "Brief" },
      { name: "Design", limit: 3 },
      { name: "Build", limit: 4 },
      { name: "Client review", limit: 3 },
      { name: "Live" },
    ],
    setup: [
      "One board per client project",
      "Clients join as guests who can comment",
      "A Client review column with its own limit",
    ],
    body: [
      {
        title: "The status call nobody wanted",
        paragraphs: [
          "Fenwick & Rowe used to hold an hour-long status call with every client every week. Most of the hour was reading the spreadsheet aloud.",
          "With clients as guests on the project board, the call became a fifteen-minute review of the Client review column — the only place their decision was actually needed.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "1 week" },
      { label: "Cycle length", value: "2 weeks" },
      { label: "Plan", value: "Team" },
    ],
  },
  {
    slug: "lumo-bikes",
    company: "Lumo Bikes",
    industry: "Mobility",
    size: "20–100",
    teamSize: 38,
    city: "Rotterdam",
    headline: "Firmware and app on the same timetable",
    summary:
      "An e-bike maker keeps hardware, firmware and mobile releases in one cycle so the app never ships a feature the bike can’t do yet.",
    quote:
      "The worst bug we ever shipped was an app button for a firmware feature that was two weeks late. That cannot happen on one board.",
    person: "Noor Hendriks",
    role: "VP Engineering",
    before: "Separate trackers for firmware and app",
    workflow: [
      { name: "Backlog" },
      { name: "Spec", limit: 4 },
      { name: "Firmware", limit: 5 },
      { name: "App", limit: 5 },
      { name: "Field test", limit: 3 },
      { name: "Released" },
    ],
    setup: [
      "Firmware and app work linked as blocking pairs",
      "A Field test column for real rides",
      "Release notes generated from the Released column",
    ],
    body: [
      {
        title: "Blocked, visibly",
        paragraphs: [
          "Lumo links each app change to the firmware change it depends on. A blocked card rises to the top of its column with the blocker named, so the app team sees the wait instead of discovering it at release.",
          "Field test is a real column with a real limit: three features on the road at a time, ridden by the team on their commute.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "4 weeks" },
      { label: "Cycle length", value: "3 weeks" },
      { label: "Plan", value: "Team" },
    ],
  },
  {
    slug: "paperhouse-press",
    company: "Paperhouse Press",
    industry: "Publishing",
    size: "Under 20",
    teamSize: 9,
    city: "Melbourne",
    headline: "A publisher’s web team that ships on Thursdays",
    summary:
      "Nine people run the reader app and website for an independent publisher, and plan the whole thing in a forty-minute Monday meeting.",
    quote:
      "We’re nine people. We don’t need a process consultant, we need a board that doesn’t get in the way. This one doesn’t.",
    person: "Sophie Tran",
    role: "Head of digital",
    before: "Sticky notes on an actual wall",
    workflow: [
      { name: "Ideas" },
      { name: "This week", limit: 10 },
      { name: "Doing", limit: 4 },
      { name: "Shipped" },
    ],
    setup: [
      "Free plan, nine people",
      "A four-column board copied from their old wall",
      "Thursday release, Friday review",
    ],
    body: [
      {
        title: "From the wall to the screen",
        paragraphs: [
          "Paperhouse ran on sticky notes for six years. When half the team went remote, they photographed the wall and rebuilt it in Sprint column for column, including the limit of four on Doing that was once just the width of the whiteboard.",
          "They still plan on Monday, still ship on Thursday, and still have the photo of the wall pinned to the team channel.",
        ],
      },
    ],
    facts: [
      { label: "Rolled out", value: "1 afternoon" },
      { label: "Cycle length", value: "1 week" },
      { label: "Plan", value: "Free" },
    ],
  },
];

/* ---------- Changelog ---------- */

export type Release = {
  version: string;
  date: string;
  title: string;
  kind: "New" | "Improved" | "Fixed";
  notes: string[];
};

export const changelogPage = {
  title: "Changelog",
  h1: "What changed, every other Tuesday",
  lede: "Sprint ships on its own two-week cycle. Here is everything that reached Done.",
};

export const releases: Release[] = [
  {
    version: "4.12",
    date: "2026-10-13",
    title: "Keyboard moves on the board",
    kind: "New",
    notes: [
      "Shift with the arrow keys moves the focused card between columns and within one.",
      "Every move is announced to screen readers with the new column and position.",
      "Moves made by key appear in the issue’s activity like any other.",
    ],
  },
  {
    version: "4.11",
    date: "2026-09-29",
    title: "WIP limits warn before they bite",
    kind: "Improved",
    notes: [
      "Column headers show count against limit and turn red when the limit is passed.",
      "Limits can now be set per team from Settings → Workflow.",
    ],
  },
  {
    version: "4.10",
    date: "2026-09-15",
    title: "Burndown that admits scope change",
    kind: "New",
    notes: [
      "Cycle charts draw added scope as its own line instead of hiding it in the slope.",
      "Hover any day to see exactly which issues were added or closed.",
    ],
  },
  {
    version: "4.9.2",
    date: "2026-09-04",
    title: "Faster lists past 5,000 issues",
    kind: "Fixed",
    notes: [
      "Sorting large lists no longer freezes the tab on older laptops.",
      "Search results keep their scroll position after you open and close an issue.",
    ],
  },
  {
    version: "4.9",
    date: "2026-09-01",
    title: "Triage owner rotation",
    kind: "New",
    notes: [
      "Set a weekly rotation and Sprint hands the triage inbox to the next person on Monday morning.",
      "The current owner is shown at the top of the inbox.",
    ],
  },
  {
    version: "4.8",
    date: "2026-08-18",
    title: "CSV import keeps comments",
    kind: "Improved",
    notes: [
      "Imported issues now bring their comment history and original timestamps.",
      "Unknown statuses map to Backlog with a note instead of failing the whole import.",
    ],
  },
  {
    version: "4.7.1",
    date: "2026-08-07",
    title: "Time zone fixes for cycle boundaries",
    kind: "Fixed",
    notes: [
      "Cycles ending at midnight now end at the workspace’s midnight, not the server’s.",
    ],
  },
];

/* ---------- About ---------- */

export const about = {
  title: "About",
  h1: "We started on a wall",
  lede: "Sprint began in 2021 as three engineers, a cork board and a box of index cards. We still think the wall was right about most things.",
  story: [
    "Our first product team planned on a wall of index cards. It was the best planning tool any of us have used: you could see everything at once, you could only fit so many cards in a column, and moving a card was a public act.",
    "It was also useless the moment someone worked from home. Every tool we tried to replace it with added fields, then forms, then a configuration screen for the forms.",
    "Sprint is our attempt to keep what the wall got right — one card per piece of work, visible limits, moves anyone can see — and add only what a wall can’t do: count, remember and travel.",
  ],
  principles: [
    {
      title: "A card is a promise, not a form.",
      text: "An issue needs a title. Everything else is optional and stays out of the way until it is needed.",
    },
    {
      title: "Limits are information.",
      text: "A full column tells the team more than any report. We make it visible instead of making it configurable.",
    },
    {
      title: "Every move is public.",
      text: "Status changes are written to the issue’s history. No one should have to ask who moved it.",
    },
    {
      title: "The keyboard is a first-class citizen.",
      text: "If it can be clicked, it can be done with a key. We test that before we ship it.",
    },
  ],
  team: [
    { name: "Mira Castellanos", role: "Co-founder, CEO", initials: "MC" },
    { name: "Jonah Feld", role: "Co-founder, engineering", initials: "JF" },
    { name: "Adaeze Nwosu", role: "Head of design", initials: "AN" },
    { name: "Kaito Brandt", role: "Infrastructure", initials: "KB" },
    { name: "Lena Sørensen", role: "Customer engineering", initials: "LS" },
    { name: "Ravi Kulkarni", role: "Product", initials: "RK" },
  ],
  facts: [
    { label: "Founded", value: "2021, Portland" },
    { label: "People", value: "38 across 9 time zones" },
    { label: "Funding", value: "Profitable since 2024" },
  ],
  jobs: [
    {
      title: "Senior frontend engineer, board performance",
      place: "Remote, Americas",
    },
    { title: "Customer engineer", place: "Remote, Europe" },
    { title: "Product designer, reporting", place: "Portland or remote" },
  ],
};

/* ---------- Contact / sign in ---------- */

export const contact = {
  title: "Talk to sales",
  h1: "Talk to someone who has run a sprint",
  lede: "Our sales team are former engineering leads. Tell us how your teams work today and we will show you Sprint on your own workflow — not a script.",
  promises: [
    "A reply within one business day",
    "A 30-minute call, no slide deck",
    "A workspace set up with your columns before the call",
  ],
  sizes: ["1–10", "11–50", "51–200", "201–1,000", "More than 1,000"],
  tools: ["Spreadsheets", "Another tracker", "An actual wall", "Nothing yet"],
};

export const signin = {
  signinTitle: "Sign in",
  signupTitle: "Start free",
  signinH1: "Welcome back",
  signupH1: "Start your first board",
  signinLede:
    "Sign in to your workspace. This is a demo screen: any valid email and an eight-character password will take you to the sample board.",
  signupLede:
    "Free for up to ten people, forever. This is a demo screen: nothing is created, and the button opens the sample workspace.",
};

export const notFound = {
  title: "Page not found",
  h1: "This card isn’t on the board",
  lede: "The page may have moved to Done, or it never left the backlog. Try one of these instead.",
};

export const newsletter = {
  title: "Release notes, once a month",
  text: "What shipped and what we learned shipping it. No marketing in between.",
};

/* ---------- App demo ---------- */

export type Status = "backlog" | "todo" | "progress" | "review" | "done";
export type Priority = "urgent" | "high" | "medium" | "low";

export const statuses: { id: Status; name: string; limit?: number }[] = [
  { id: "backlog", name: "Backlog" },
  { id: "todo", name: "To do", limit: 6 },
  { id: "progress", name: "In progress", limit: 4 },
  { id: "review", name: "In review", limit: 3 },
  { id: "done", name: "Done" },
];

export const priorities: { id: Priority; name: string }[] = [
  { id: "urgent", name: "Urgent" },
  { id: "high", name: "High" },
  { id: "medium", name: "Medium" },
  { id: "low", name: "Low" },
];

export const people = [
  {
    id: "io",
    name: "Ines Okafor",
    role: "Tech lead",
    email: "ines@fernhill.example",
  },
  {
    id: "ml",
    name: "Mateo Lindqvist",
    role: "iOS",
    email: "mateo@fernhill.example",
  },
  {
    id: "pr",
    name: "Priya Ramanathan",
    role: "Backend",
    email: "priya@fernhill.example",
  },
  {
    id: "tm",
    name: "Theo Marchetti",
    role: "Android",
    email: "theo@fernhill.example",
  },
  {
    id: "hs",
    name: "Hana Sato",
    role: "Design",
    email: "hana@fernhill.example",
  },
];

export const labels = [
  "Bug",
  "Feature",
  "Design",
  "Infra",
  "iOS",
  "Android",
  "Web",
];

export type Issue = {
  key: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  estimate: number;
  labels: string[];
  updated: string;
  description: string[];
  checklist: { text: string; done: boolean }[];
};

export const workspace = {
  name: "Fernhill",
  team: "Mobile",
  prefix: "FRN",
  cycle: { name: "Sprint 24", start: "2026-10-12", end: "2026-10-23", day: 5 },
  me: "io",
};

const d = (text: string) => text.split("\n\n");

export const issues: Issue[] = [
  {
    key: "FRN-201",
    title: "Fix double charge on retried payment",
    status: "progress",
    priority: "urgent",
    assignee: "pr",
    estimate: 5,
    labels: ["Bug", "Infra"],
    updated: "2026-10-17T15:20",
    description: d(
      "When the payment provider times out and the client retries, a second charge can go through before the first one is confirmed. Support has seen six cases this week.\n\nAdd an idempotency key to every payment attempt and reject duplicates server-side.",
    ),
    checklist: [
      { text: "Add idempotency key to payment intent", done: true },
      { text: "Reject duplicate keys with 409", done: true },
      { text: "Refund script for affected bookings", done: false },
    ],
  },
  {
    key: "FRN-202",
    title: "Saved trips sync across devices",
    status: "progress",
    priority: "high",
    assignee: "ml",
    estimate: 8,
    labels: ["Feature", "iOS"],
    updated: "2026-10-17T11:05",
    description: d(
      "Trips saved on the phone should appear on the web and the tablet within a few seconds.\n\nUse the existing account sync channel; conflicts resolve by last edit.",
    ),
    checklist: [
      { text: "Sync endpoint", done: true },
      { text: "iOS client", done: false },
      { text: "Conflict copy reviewed by design", done: false },
    ],
  },
  {
    key: "FRN-203",
    title: "Seat map loads under 1 second",
    status: "todo",
    priority: "high",
    assignee: "tm",
    estimate: 5,
    labels: ["Android"],
    updated: "2026-10-16T09:40",
    description: d(
      "The seat map currently takes 2.8 s on a mid-range Android phone. Prefetch the layout when the fare is selected and render seats as one canvas.",
    ),
    checklist: [
      { text: "Profile on Pixel 6a", done: true },
      { text: "Prefetch layout", done: false },
    ],
  },
  {
    key: "FRN-204",
    title: "Receipts as PDF from the trip page",
    status: "todo",
    priority: "medium",
    assignee: null,
    estimate: 3,
    labels: ["Feature", "Web"],
    updated: "2026-10-15T16:12",
    description: d(
      "Business travellers need a PDF receipt for expenses. Generate it server-side from the booking record.",
    ),
    checklist: [],
  },
  {
    key: "FRN-205",
    title: "Reduce cold start on older iPhones",
    status: "review",
    priority: "high",
    assignee: "ml",
    estimate: 5,
    labels: ["iOS", "Infra"],
    updated: "2026-10-17T17:48",
    description: d(
      "Cold start is 3.4 s on iPhone XR. Defer analytics and the promo banner until after first paint.",
    ),
    checklist: [
      { text: "Defer analytics init", done: true },
      { text: "Lazy-load promo banner", done: true },
      { text: "Measure on XR and 11", done: true },
    ],
  },
  {
    key: "FRN-206",
    title: "Cancellation flow copy pass",
    status: "done",
    priority: "low",
    assignee: "hs",
    estimate: 2,
    labels: ["Design"],
    updated: "2026-10-14T10:30",
    description: d(
      "Rewrite the cancellation screens so the refund amount is the first thing people read.",
    ),
    checklist: [
      { text: "Draft copy", done: true },
      { text: "Legal review", done: true },
    ],
  },
  {
    key: "FRN-207",
    title: "Promo code lost after currency switch",
    status: "todo",
    priority: "urgent",
    assignee: "pr",
    estimate: 2,
    labels: ["Bug", "Web"],
    updated: "2026-10-17T08:55",
    description: d(
      "Switching from EUR to GBP at checkout clears the applied promo code without telling the traveller.",
    ),
    checklist: [],
  },
  {
    key: "FRN-208",
    title: "Android dark theme polish",
    status: "backlog",
    priority: "low",
    assignee: "tm",
    estimate: 3,
    labels: ["Android", "Design"],
    updated: "2026-10-09T14:00",
    description: d(
      "Several cards use hard-coded white backgrounds. Move them to theme tokens.",
    ),
    checklist: [],
  },
  {
    key: "FRN-209",
    title: "Group booking for up to 8 travellers",
    status: "backlog",
    priority: "medium",
    assignee: null,
    estimate: 8,
    labels: ["Feature"],
    updated: "2026-10-08T12:20",
    description: d(
      "Let one person book and pay for up to eight travellers, with names collected later.",
    ),
    checklist: [],
  },
  {
    key: "FRN-210",
    title: "Offline itinerary on the lock screen",
    status: "review",
    priority: "medium",
    assignee: "ml",
    estimate: 3,
    labels: ["iOS", "Feature"],
    updated: "2026-10-17T13:10",
    description: d(
      "Show the next leg of the itinerary as a live activity, available without a connection.",
    ),
    checklist: [
      { text: "Live activity layout", done: true },
      { text: "Offline cache", done: true },
    ],
  },
  {
    key: "FRN-211",
    title: "Rate limit search API per device",
    status: "done",
    priority: "high",
    assignee: "pr",
    estimate: 3,
    labels: ["Infra"],
    updated: "2026-10-13T18:05",
    description: d(
      "A misbehaving client sent 40k searches in an hour. Limit to 120 per minute per device id.",
    ),
    checklist: [
      { text: "Limiter middleware", done: true },
      { text: "Alert on 429 spikes", done: true },
    ],
  },
  {
    key: "FRN-212",
    title: "Accessibility labels on fare cards",
    status: "done",
    priority: "medium",
    assignee: "hs",
    estimate: 2,
    labels: ["Design", "iOS", "Android"],
    updated: "2026-10-15T11:45",
    description: d(
      "VoiceOver reads fare cards as ‘button, button, button’. Each card needs its price, times and stops in one label.",
    ),
    checklist: [
      { text: "iOS labels", done: true },
      { text: "Android labels", done: true },
    ],
  },
  {
    key: "FRN-213",
    title: "Move image resizing to the edge",
    status: "backlog",
    priority: "low",
    assignee: "pr",
    estimate: 5,
    labels: ["Infra"],
    updated: "2026-10-06T09:15",
    description: d(
      "Destination photos are resized on the origin server. Move this to the CDN to cut origin load.",
    ),
    checklist: [],
  },
  {
    key: "FRN-214",
    title: "Traveller can’t be removed from saved trip",
    status: "todo",
    priority: "medium",
    assignee: "tm",
    estimate: 2,
    labels: ["Bug", "Android"],
    updated: "2026-10-16T15:30",
    description: d(
      "The remove button on a traveller row does nothing on Android 12. Reported by support twice.",
    ),
    checklist: [],
  },
  {
    key: "FRN-215",
    title: "Price alert onboarding screens",
    status: "progress",
    priority: "medium",
    assignee: "hs",
    estimate: 3,
    labels: ["Design"],
    updated: "2026-10-17T10:00",
    description: d(
      "Three screens explaining price alerts the first time someone saves a route.",
    ),
    checklist: [
      { text: "Wireframes", done: true },
      { text: "Final screens", done: false },
    ],
  },
  {
    key: "FRN-216",
    title: "Crash on launch, iOS 17.6 iPhone XR",
    status: "progress",
    priority: "urgent",
    assignee: "io",
    estimate: 3,
    labels: ["Bug", "iOS"],
    updated: "2026-10-17T16:35",
    description: d(
      "Crash in the keychain migration on first launch after update. Affects about 0.4% of iOS sessions.",
    ),
    checklist: [
      { text: "Reproduce on device", done: true },
      { text: "Fix migration guard", done: false },
    ],
  },
  {
    key: "FRN-217",
    title: "Web checkout: autofill postcode",
    status: "backlog",
    priority: "low",
    assignee: null,
    estimate: 1,
    labels: ["Web"],
    updated: "2026-10-05T13:00",
    description: d(
      "The postcode field has the wrong autocomplete token, so browsers don’t fill it.",
    ),
    checklist: [],
  },
  {
    key: "FRN-218",
    title: "Release notes in the app’s What’s new",
    status: "todo",
    priority: "low",
    assignee: "io",
    estimate: 2,
    labels: ["Feature"],
    updated: "2026-10-14T09:00",
    description: d(
      "Pull the three most recent release notes into a What’s new sheet after update.",
    ),
    checklist: [],
  },
  {
    key: "FRN-219",
    title: "Payment webhook 502s from the EU region",
    status: "review",
    priority: "urgent",
    assignee: "pr",
    estimate: 3,
    labels: ["Bug", "Infra"],
    updated: "2026-10-17T12:25",
    description: d(
      "The EU load balancer drops webhook calls longer than 10 s. Acknowledge immediately and process async.",
    ),
    checklist: [
      { text: "Ack within 200 ms", done: true },
      { text: "Queue processing", done: true },
    ],
  },
  {
    key: "FRN-220",
    title: "Design tokens for spacing",
    status: "done",
    priority: "medium",
    assignee: "hs",
    estimate: 3,
    labels: ["Design", "Web"],
    updated: "2026-10-12T17:20",
    description: d(
      "Replace one-off margins with a four-step spacing scale shared across platforms.",
    ),
    checklist: [
      { text: "Define scale", done: true },
      { text: "Migrate web", done: true },
    ],
  },
];

export const initialActivity: {
  key: string;
  who: string;
  text: string;
  at: string;
}[] = [
  {
    key: "FRN-201",
    who: "pr",
    text: "moved from To do to In progress",
    at: "2026-10-15T09:12",
  },
  {
    key: "FRN-201",
    who: "io",
    text: "set priority to Urgent",
    at: "2026-10-14T16:40",
  },
  {
    key: "FRN-205",
    who: "ml",
    text: "moved from In progress to In review",
    at: "2026-10-17T17:48",
  },
  {
    key: "FRN-216",
    who: "io",
    text: "assigned to Ines Okafor",
    at: "2026-10-16T08:30",
  },
];

export const initialComments: {
  key: string;
  who: string;
  text: string;
  at: string;
}[] = [
  {
    key: "FRN-201",
    who: "io",
    text: "Can we include the refund script in this one? Support wants to close the six open tickets by Friday.",
    at: "2026-10-16T10:05",
  },
  {
    key: "FRN-201",
    who: "pr",
    text: "Yes — script is written, running it against staging tonight.",
    at: "2026-10-16T11:20",
  },
  {
    key: "FRN-205",
    who: "ml",
    text: "XR cold start is down to 1.9 s. Ready for review.",
    at: "2026-10-17T17:47",
  },
  {
    key: "FRN-216",
    who: "ml",
    text: "Happens only when the old keychain group is present. I can pair on it tomorrow.",
    at: "2026-10-16T18:02",
  },
];

export const notificationOptions = [
  { id: "assigned", label: "An issue is assigned to me", on: true },
  { id: "mentioned", label: "Someone mentions me in a comment", on: true },
  { id: "status", label: "An issue I follow changes status", on: false },
  { id: "wip", label: "A column passes its WIP limit", on: true },
  { id: "digest", label: "Monday planning digest by email", on: false },
];
