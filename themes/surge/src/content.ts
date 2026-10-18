import maya from "./assets/maya.jpg";
import daniel from "./assets/daniel.jpg";
import hanna from "./assets/hanna.jpg";
import tom from "./assets/tom.jpg";
import clara from "./assets/clara.jpg";
import jonah from "./assets/jonah.jpg";
import sofia from "./assets/sofia.jpg";
import elliot from "./assets/elliot.jpg";
import halfmoon from "./assets/halfmoon.jpg";
import spoke from "./assets/spoke.jpg";
import clayhouse from "./assets/clayhouse.jpg";
import dewlab from "./assets/dewlab.jpg";
import deskline from "./assets/deskline.jpg";
import crumb from "./assets/crumb.jpg";
import swell from "./assets/swell.jpg";
import workshop from "./assets/workshop.jpg";
import floor from "./assets/floor.jpg";
import studio from "./assets/studio.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Surge",
  sector: "Growth marketing agency",
  tagline: "Growth you can read in the numbers.",
  email: "hello@surge.example",
  jobsEmail: "jobs@surge.example",
  phone: "+1 555 0176",
  phoneHref: "tel:+15550176",
  address: ["Floor 3, Foundry Yard", "52 Wharf Road, Portland, OR 97209"],
  hours: "Mon–Fri, 8:30 am – 6 pm Pacific",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Case studies" },
  { to: "/roi", label: "ROI model" },
  { to: "/approach", label: "Approach" },
  { to: "/team", label: "Team" },
];

export const footerColumns = [
  {
    title: "Agency",
    links: [
      { to: "/", label: "Home" },
      { to: "/approach", label: "Approach" },
      { to: "/team", label: "Team & careers" },
      { to: "/proposal", label: "Request a proposal" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "All services" },
      { to: "/services/paid-acquisition", label: "Paid acquisition" },
      { to: "/services/conversion", label: "Conversion" },
      { to: "/services/lifecycle", label: "Lifecycle" },
    ],
  },
  {
    title: "Proof",
    links: [
      { to: "/work", label: "Case studies" },
      { to: "/work/halfmoon-coffee", label: "Halfmoon Coffee" },
      { to: "/work/deskline", label: "Deskline" },
      { to: "/roi", label: "ROI model" },
    ],
  },
];

export const newsletter = {
  title: "The Readout",
  text: "One experiment a week, written up: the hypothesis, the numbers and whether we shipped it. Every Monday, no tracking pixels.",
};

/* ------------------------------------------------------------ people */

export type Person = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  focus: string;
  base: string;
  since: number;
};

export const team: Person[] = [
  {
    id: "maya",
    name: "Maya Okafor",
    role: "Founder & strategy director",
    image: maya,
    bio: "Ran growth at two subscription brands before starting Surge in 2016. Runs every growth sprint diagnostic herself and still writes the first draft of the growth model.",
    focus: "Growth models, pricing, board reporting",
    base: "Portland",
    since: 2016,
  },
  {
    id: "daniel",
    name: "Daniel Reyes",
    role: "Head of paid acquisition",
    image: daniel,
    bio: "Has managed a little over $60M in paid social and search. Believes creative is the targeting now, and tests ten concepts for every one that scales.",
    focus: "Meta, Google, TikTok, creative testing",
    base: "Los Angeles",
    since: 2017,
  },
  {
    id: "hanna",
    name: "Hanna Lindqvist",
    role: "Conversion lead",
    image: hanna,
    bio: "Former product designer who got tired of shipping on opinion. Runs our test design reviews and owns the rule that no variant ships without a written hypothesis.",
    focus: "Landing pages, checkout, pricing pages",
    base: "Portland",
    since: 2018,
  },
  {
    id: "tom",
    name: "Tom Achterberg",
    role: "Analytics & attribution lead",
    image: tom,
    bio: "Builds the measurement layer under every program: tracking plans, server-side tagging and the holdout tests that tell you what your attribution tool won't.",
    focus: "Tracking plans, incrementality, dashboards",
    base: "Remote, Denver",
    since: 2019,
  },
  {
    id: "clara",
    name: "Clara Mendes",
    role: "Lifecycle lead",
    image: clara,
    bio: "Writes onboarding flows people actually finish. Spent five years in subscription retention and counts churn saves in dollars, never in open rates.",
    focus: "Email, SMS, onboarding, win-back",
    base: "Portland",
    since: 2019,
  },
  {
    id: "jonah",
    name: "Jonah Whitcombe",
    role: "SEO & content lead",
    image: jonah,
    bio: "Technical SEO first, words second. Has migrated nine storefronts without losing a ranking and built programmatic page sets that now bring in seven-figure revenue.",
    focus: "Technical SEO, programmatic pages, editorial",
    base: "Remote, Austin",
    since: 2020,
  },
  {
    id: "sofia",
    name: "Sofia Brandt",
    role: "Client partner",
    image: sofia,
    bio: "Your first call and your Monday readout host. Keeps the experiment backlog honest and makes sure the work maps to the number your CFO actually watches.",
    focus: "Planning, readouts, commercial goals",
    base: "Portland",
    since: 2021,
  },
  {
    id: "elliot",
    name: "Elliot Varga",
    role: "Experiment designer",
    image: elliot,
    bio: "Our resident statistician. Sizes every test before it starts, calls them when they are done, and is the reason we never stop a test early because the graph looked good.",
    focus: "Test sizing, Bayesian readouts, MMM",
    base: "Remote, Chicago",
    since: 2022,
  },
];

export const personById = (id: string) => team.find((p) => p.id === id);

/* ------------------------------------------------------------ services */

export type Service = {
  slug: string;
  name: string;
  short: string;
  lede: string;
  intro: string[];
  includes: string[];
  weeks: { span: string; title: string; text: string }[];
  moves: string[];
  channels: string[];
  from: string;
  lead: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "paid-acquisition",
    name: "Paid acquisition",
    short:
      "Paid social and search run as a creative testing program, judged on contribution margin, not ROAS screenshots.",
    lede: "Buy customers at a price your margins can live with, then find the next channel before the current one saturates.",
    intro: [
      "Most paid accounts we inherit are optimised for the platform's own numbers. We rebuild them around what a new customer is worth to you after returns, discounts and churn, then let creative do the targeting.",
      "Every week we launch new concepts against a control, cut the losers on a pre-agreed rule and scale what wins. Budget moves are written down with the reason, so you always know why spend went where it did.",
    ],
    includes: [
      "Account restructure around margin-based bidding",
      "Ten to fifteen new creative concepts a month, briefed and produced",
      "Weekly creative readout with winners, losers and next tests",
      "Geo holdout or conversion-lift test each quarter",
      "Channel expansion plan with entry budgets and stop rules",
    ],
    weeks: [
      {
        span: "Weeks 1–2",
        title: "Audit and rebuild",
        text: "Account audit, margin model, naming conventions and a consolidated structure that gives the algorithms enough signal.",
      },
      {
        span: "Weeks 3–6",
        title: "Creative engine",
        text: "First three concept batches go live. We kill on cost per incremental purchase, not on click-through rate.",
      },
      {
        span: "Weeks 7–12",
        title: "Scale and prove",
        text: "Scale winners, open one new channel, and run a holdout so the lift is measured rather than attributed.",
      },
    ],
    moves: [
      "Cost per acquisition",
      "New-customer revenue",
      "Contribution margin after ads",
      "Creative hit rate",
    ],
    channels: [
      "Meta",
      "Google Search & PMax",
      "TikTok",
      "YouTube",
      "LinkedIn",
      "Reddit",
    ],
    from: "From $9,500 a month plus media",
    lead: "daniel",
    faqs: [
      {
        q: "Do you take a percentage of ad spend?",
        a: "No. We charge a flat monthly fee so we have no reason to push spend up when it is not paying back.",
      },
      {
        q: "Who produces the creative?",
        a: "Our in-house editors cut statics and short-form video from your footage and UGC we brief. Bigger shoots are quoted separately.",
      },
      {
        q: "What budget do we need?",
        a: "Paid works best from about $40,000 a month in media. Below that, conversion or lifecycle usually returns more per dollar.",
      },
    ],
  },
  {
    slug: "conversion",
    name: "Conversion rate optimisation",
    short:
      "A/B tests on landing pages, product pages, pricing and checkout — sized up front, called honestly, shipped when they win.",
    lede: "Turn more of the traffic you already pay for into customers, one sized, written-up experiment at a time.",
    intro: [
      "We start with where people actually leave: session recordings, funnel data and five customer interviews. That gives us a ranked backlog of hypotheses, each with a sample size and an expected effect before anything is built.",
      "Tests run in your stack, on your traffic. Winners ship to production in the same sprint; losers get a written explanation, because a well-understood loss is the cheapest research you will ever buy.",
    ],
    includes: [
      "Conversion audit with ranked hypothesis backlog",
      "Two to four live A/B tests at any time",
      "Design and front-end build for every variant",
      "Pre-registered test plans with sample sizes and stop rules",
      "Monthly learning report your product team can reuse",
    ],
    weeks: [
      {
        span: "Weeks 1–2",
        title: "Find the leaks",
        text: "Funnel analysis, heatmaps, recordings and customer interviews turned into a backlog ranked by expected value.",
      },
      {
        span: "Weeks 3–8",
        title: "Test in parallel",
        text: "Two to four tests live at once on non-overlapping pages, each sized to detect a realistic lift in under four weeks.",
      },
      {
        span: "Weeks 9–12",
        title: "Ship and compound",
        text: "Winners merged into production, follow-up tests built on what each result taught us.",
      },
    ],
    moves: [
      "Conversion rate",
      "Revenue per visitor",
      "Checkout completion",
      "Trial-to-paid rate",
    ],
    channels: [
      "Shopify & headless storefronts",
      "Webflow",
      "Next.js",
      "VWO",
      "Optimizely",
      "GrowthBook",
    ],
    from: "From $11,000 a month",
    lead: "hanna",
    faqs: [
      {
        q: "How much traffic do we need to test?",
        a: "Roughly 30,000 monthly sessions to the page under test. Below that we run fewer, bolder tests and use qualitative research to choose them.",
      },
      {
        q: "Will you change our design system?",
        a: "Variants are built in your components wherever possible. Anything new is handed over as documented components when it wins.",
      },
      {
        q: "What if a test is inconclusive?",
        a: "We say so. Flat results are written up with what they rule out, and the next test is chosen with that in mind.",
      },
    ],
  },
  {
    slug: "lifecycle",
    name: "Lifecycle & retention",
    short:
      "Onboarding, email, SMS and win-back flows that raise customer value after the first order or the first trial day.",
    lede: "The cheapest customer is the one you already have. We make the second order, the second month and the renewal happen more often.",
    intro: [
      "Lifecycle work starts with cohorts, not templates. We find the moment customers decide to stay — the second order, the third login, the first saved project — and build every flow to get people there sooner.",
      "Flows are tested against holdout groups, so you can see what each message earns over doing nothing. If a flow can't beat silence, we switch it off.",
    ],
    includes: [
      "Cohort and churn analysis with the activation moment named",
      "Onboarding, post-purchase, replenishment and win-back flows",
      "Campaign calendar with two sends a week, written and designed",
      "Holdout groups on every automated flow",
      "Subscription save offers and cancellation flow tests",
    ],
    weeks: [
      {
        span: "Weeks 1–2",
        title: "Cohorts first",
        text: "Retention curves by first product, channel and offer, plus the activation moment that predicts staying.",
      },
      {
        span: "Weeks 3–6",
        title: "Core flows",
        text: "Welcome, post-purchase and replenishment flows rebuilt and launched with ten percent holdouts.",
      },
      {
        span: "Weeks 7–12",
        title: "Save and win back",
        text: "Cancellation flow tests, win-back offers and a campaign rhythm that earns more than it unsubscribes.",
      },
    ],
    moves: [
      "Repeat purchase rate",
      "Subscriber lifetime value",
      "Monthly churn",
      "Revenue per recipient",
    ],
    channels: [
      "Klaviyo",
      "Customer.io",
      "Braze",
      "Attentive",
      "Recharge",
      "Stripe Billing",
    ],
    from: "From $8,000 a month",
    lead: "clara",
    faqs: [
      {
        q: "Do you write the emails?",
        a: "Yes. Copy, design and build are all included. We work from your brand guide and send you every new flow for approval before it goes live.",
      },
      {
        q: "We already have flows. Do you start over?",
        a: "Only where the holdout says they are not earning. Most accounts keep about half of what exists, rewritten.",
      },
      {
        q: "Can you work on our app's push notifications?",
        a: "Yes, if your platform supports it. Push is tested the same way, against a holdout.",
      },
    ],
  },
  {
    slug: "seo-content",
    name: "SEO & content",
    short:
      "Technical SEO, programmatic page sets and editorial that compound into revenue you don't pay for per click.",
    lede: "Build the channel that keeps growing when the media budget pauses — measured in revenue, not in rankings.",
    intro: [
      "We fix the technical foundations first: crawl budget, rendering, internal linking and the templates search engines actually index. Content without those foundations is money spent on pages nobody finds.",
      "Then we build page sets that answer what your buyers search before they buy — comparisons, use cases, locations, guides — and measure each one by the revenue it assists.",
    ],
    includes: [
      "Technical audit and fixes shipped with your developers",
      "Keyword and demand map tied to product margins",
      "Programmatic page templates for comparison and use-case searches",
      "Four to eight editorial pieces a month, researched and written",
      "Quarterly revenue attribution for organic landing pages",
    ],
    weeks: [
      {
        span: "Weeks 1–3",
        title: "Foundations",
        text: "Crawl, render and indexation audit. Fixes ranked by revenue at stake and shipped in priority order.",
      },
      {
        span: "Weeks 4–8",
        title: "Page sets",
        text: "First programmatic templates launched, internal links rebuilt around the pages that sell.",
      },
      {
        span: "Weeks 9–12",
        title: "Editorial rhythm",
        text: "Weekly publishing, refreshed old winners and the first organic revenue report.",
      },
    ],
    moves: [
      "Organic revenue",
      "Non-brand clicks",
      "Indexed revenue pages",
      "Assisted conversions",
    ],
    channels: [
      "Google Search Console",
      "Screaming Frog",
      "Ahrefs",
      "Shopify",
      "Webflow",
      "Contentful",
    ],
    from: "From $7,500 a month",
    lead: "jonah",
    faqs: [
      {
        q: "How long before SEO pays off?",
        a: "Technical fixes usually show in six to ten weeks. New page sets take three to six months to reach their traffic, which is why we model the payback before we start.",
      },
      {
        q: "Do you use AI to write content?",
        a: "For research and outlines, yes. Every published piece is written and edited by a person who has used the product.",
      },
      {
        q: "Will you handle a site migration?",
        a: "Yes. Migrations are scoped as a fixed project with a redirect map, pre-launch crawl and four weeks of monitoring.",
      },
    ],
  },
  {
    slug: "analytics",
    name: "Analytics & attribution",
    short:
      "Tracking plans, server-side tagging and incrementality tests so every budget decision rests on numbers you trust.",
    lede: "Know which dollars are working. We build the measurement layer before we spend a single one of yours.",
    intro: [
      "Platform dashboards each claim the same sale. We give you one source of truth: a tracking plan, clean server-side events and a reporting model that reconciles to your finance numbers within two percent.",
      "On top of that we run incrementality tests — geo holdouts, conversion lift studies and a lightweight media mix model — so attribution is checked against what actually happens when spend stops.",
    ],
    includes: [
      "Tracking plan and event taxonomy, documented",
      "Server-side tagging and consent-mode setup",
      "Revenue dashboard reconciled to finance",
      "Quarterly geo holdout or lift test",
      "Lightweight media mix model refreshed monthly",
    ],
    weeks: [
      {
        span: "Weeks 1–2",
        title: "Tracking plan",
        text: "Every event, property and source of truth written down and agreed with your engineers.",
      },
      {
        span: "Weeks 3–6",
        title: "Pipes and dashboard",
        text: "Server-side events live, warehouse models built, one dashboard that matches finance.",
      },
      {
        span: "Weeks 7–12",
        title: "Incrementality",
        text: "First holdout test designed and run, attribution weights recalibrated from the result.",
      },
    ],
    moves: [
      "Tracking coverage",
      "Spend on measured channels",
      "Blended CAC accuracy",
      "Time to weekly report",
    ],
    channels: [
      "GA4",
      "Segment",
      "BigQuery",
      "dbt",
      "Looker Studio",
      "Northbeam",
    ],
    from: "From $10,000 a month",
    lead: "tom",
    faqs: [
      {
        q: "Do we need a data warehouse?",
        a: "Not to start. Above about $2M a year in paid media we recommend one, and we set it up as part of the engagement.",
      },
      {
        q: "Can you work with our in-house data team?",
        a: "Most of the time we do. We write the models in your repo and hand over documentation with every change.",
      },
      {
        q: "What about privacy and consent?",
        a: "Consent mode, data minimisation and regional rules are part of the tracking plan, not an afterthought.",
      },
    ],
  },
  {
    slug: "growth-sprint",
    name: "Growth strategy sprint",
    short:
      "A four-week diagnostic that ends with a growth model, a ranked experiment roadmap and the hires you need.",
    lede: "Four weeks to find out where your next million in revenue is most likely to come from — and what it will cost to get it.",
    intro: [
      "The sprint is how most clients start with us. We take your numbers apart channel by channel, build a growth model that shows which lever moves revenue most, and rank the next twelve months of experiments by expected value.",
      "You keep everything: the model, the roadmap and the research. About two thirds of sprint clients continue into a program; the rest run the roadmap themselves.",
    ],
    includes: [
      "Growth model of your funnel, unit economics and payback",
      "Channel-by-channel audit with benchmarks from comparable programs",
      "Eight customer interviews and a jobs-to-be-done summary",
      "Ranked twelve-month experiment roadmap",
      "Team and budget recommendation for in-house or agency",
    ],
    weeks: [
      {
        span: "Week 1",
        title: "Data in",
        text: "Access, exports and a kickoff workshop. We build the first version of the growth model.",
      },
      {
        span: "Week 2",
        title: "Customers",
        text: "Eight interviews and a review of support tickets, reviews and cancellation reasons.",
      },
      {
        span: "Week 3",
        title: "Opportunities",
        text: "Every lever sized in dollars and ranked by confidence and cost.",
      },
      {
        span: "Week 4",
        title: "Roadmap",
        text: "Final readout with your leadership team and a twelve-month plan you own.",
      },
    ],
    moves: [
      "Clarity on payback",
      "Experiment roadmap",
      "Budget allocation",
      "Hiring plan",
    ],
    channels: [
      "Your analytics",
      "Your ad accounts",
      "Your CRM",
      "Customer interviews",
    ],
    from: "$18,000 fixed fee",
    lead: "maya",
    faqs: [
      {
        q: "Is the sprint credited if we continue?",
        a: "Half of the sprint fee is credited against the first quarter of a program.",
      },
      {
        q: "Who from our side needs to be involved?",
        a: "A founder or marketing lead for the kickoff and readout, and someone who can grant data access in the first week.",
      },
      {
        q: "Can the sprint focus on one channel?",
        a: "It can, but most of the value comes from comparing channels against each other. We recommend the full scope.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

/* ------------------------------------------------------------ engagements */

export type Engagement = {
  id: "sprint" | "program" | "embedded";
  name: string;
  monthly: number;
  oneOff?: boolean;
  summary: string;
  includes: string[];
};

export const quarterlyDiscount = 0.08;

export const engagements: Engagement[] = [
  {
    id: "sprint",
    name: "Growth sprint",
    monthly: 18000,
    oneOff: true,
    summary:
      "Four weeks, fixed fee. A growth model and a ranked roadmap your team can run.",
    includes: [
      "Strategy director + analyst",
      "Growth model & roadmap",
      "Eight customer interviews",
      "Half credited to a program",
    ],
  },
  {
    id: "program",
    name: "Growth program",
    monthly: 16500,
    summary:
      "Two disciplines run as one weekly experiment loop. The engagement most clients are on.",
    includes: [
      "Client partner + two specialists",
      "Weekly readout & backlog",
      "Up to 6 live experiments",
      "Quarterly holdout test",
    ],
  },
  {
    id: "embedded",
    name: "Embedded team",
    monthly: 27000,
    summary:
      "A full pod across paid, conversion, lifecycle and analytics, working in your tools.",
    includes: [
      "Pod of five, one lead",
      "All disciplines, one backlog",
      "Up to 12 live experiments",
      "Board-ready monthly report",
    ],
  },
];

/* ------------------------------------------------------------ case studies */

export type Experiment = {
  name: string;
  hypothesis: string;
  metric: string;
  control: number;
  variant: number;
  unit: "%" | "$";
  confidence: number;
  shipped: boolean;
  lowerIsBetter?: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  year: number;
  duration: string;
  figure: string;
  metric: string;
  lift: number;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string[];
  approach: string[];
  experiments: Experiment[];
  funnel: { stage: string; before: number; after: number }[];
  results: { label: string; value: string }[];
  quote: { text: string; name: string; role: string };
  team: string[];
};

export const industries = [
  "Food & drink",
  "Retail & DTC",
  "B2B SaaS",
  "Travel & hospitality",
];

export const cases: CaseStudy[] = [
  {
    slug: "halfmoon-coffee",
    client: "Halfmoon Coffee",
    industry: "Food & drink",
    services: ["lifecycle", "conversion"],
    year: 2026,
    duration: "9 months",
    figure: "+41%",
    metric: "12-month subscriber value",
    lift: 41,
    headline: "Halfmoon's subscribers now stay for the fourth bag.",
    summary:
      "A specialty roaster with a strong first order and a leaky third month. We rebuilt onboarding around brew method and moved the save offer to where people actually cancel.",
    image: halfmoon,
    imageAlt: "Freshly roasted coffee beans filling the frame",
    challenge: [
      "Halfmoon Coffee sold 6,200 subscriptions a month and lost 38% of them before the third delivery. The welcome series was a discount and three brand stories; the cancellation page was a single button.",
      "Paid acquisition was profitable on the first order only if subscribers stayed four months. Every point of early churn was eating the media budget.",
    ],
    approach: [
      "Cohort analysis showed the activation moment: subscribers who changed their grind or brew method in the first two weeks stayed twice as long. Everyone else was getting coffee that didn't suit their kit.",
      "We rebuilt onboarding around a two-question brew quiz, moved the skip-a-delivery option into every shipping email, and tested a pause-instead-of-cancel offer on the cancellation page.",
    ],
    experiments: [
      {
        name: "Brew-method quiz in welcome flow",
        hypothesis:
          "Matching grind to brewer in week one raises third-delivery retention.",
        metric: "Retained at delivery 3",
        control: 62,
        variant: 71.4,
        unit: "%",
        confidence: 98,
        shipped: true,
      },
      {
        name: "Pause offer on cancel page",
        hypothesis:
          "Most cancellers have too much coffee, not too little interest.",
        metric: "Cancellation saves",
        control: 6,
        variant: 23.5,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Skip link in shipping email",
        hypothesis: "Easy skipping prevents cancel-to-skip churn.",
        metric: "Monthly churn",
        control: 11.8,
        variant: 9.1,
        unit: "%",
        confidence: 95,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Annual plan anchor on PDP",
        hypothesis: "Showing the annual price first lifts plan length.",
        metric: "Annual plan share",
        control: 9,
        variant: 9.6,
        unit: "%",
        confidence: 61,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "Started subscription", before: 100, after: 100 },
      { stage: "Second delivery", before: 81, after: 88 },
      { stage: "Third delivery", before: 62, after: 74 },
      { stage: "Sixth delivery", before: 41, after: 55 },
    ],
    results: [
      { label: "Retained at third delivery", value: "62% → 74%" },
      { label: "Cancellation saves", value: "1 in 4" },
      { label: "Revenue from lifecycle email", value: "+$1.9M a year" },
    ],
    quote: {
      text: "Surge found the reason people left in a spreadsheet we'd been staring at for two years. The fix was a quiz about kettles.",
      name: "Ruth Calloway",
      role: "Co-founder, Halfmoon Coffee",
    },
    team: ["clara", "hanna", "elliot", "sofia"],
  },
  {
    slug: "spoke-and-gear",
    client: "Spoke & Gear",
    industry: "Retail & DTC",
    services: ["paid-acquisition", "conversion"],
    year: 2025,
    duration: "12 months",
    figure: "−32%",
    metric: "cost per new customer",
    lift: 32,
    headline: "Spoke & Gear sells $2,400 bikes on short-form video now.",
    summary:
      "A direct-to-consumer bicycle brand spending heavily on search for its own name. We moved budget into a creative testing program and rebuilt the product page around test rides.",
    image: spoke,
    imageAlt:
      "A steel road bicycle with a tan saddle leaning against a dark wall",
    challenge: [
      "Half of Spoke & Gear's paid budget went to branded search — people who already knew the name. Paid social ran four ads that had been live for a year.",
      "Average order value was $2,400, and the product page gave people no reason to believe the bike would fit them.",
    ],
    approach: [
      "A geo holdout showed 80% of branded search sales happened without the ads. We cut that spend by two thirds and moved it into a monthly batch of twelve video concepts filmed with riders, not models.",
      "On site, we tested a fit finder and a 30-day ride guarantee above the fold, plus financing shown per month rather than in fine print.",
    ],
    experiments: [
      {
        name: "Branded search cut in test regions",
        hypothesis: "Most brand-search buyers would have bought anyway.",
        metric: "Blended cost per order",
        control: 96,
        variant: 71,
        unit: "$",
        confidence: 97,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Fit finder on product page",
        hypothesis: "Size uncertainty is the main blocker above $2,000.",
        metric: "Product page conversion",
        control: 1.1,
        variant: 1.48,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Monthly financing price",
        hypothesis: "A per-month figure reframes a big-ticket price.",
        metric: "Add-to-cart rate",
        control: 4.2,
        variant: 4.9,
        unit: "%",
        confidence: 96,
        shipped: true,
      },
      {
        name: "Rider-led video vs studio",
        hypothesis: "Real riders outsell polished product shots.",
        metric: "Cost per purchase",
        control: 412,
        variant: 266,
        unit: "$",
        confidence: 99,
        shipped: true,
        lowerIsBetter: true,
      },
    ],
    funnel: [
      { stage: "Product page view", before: 100, after: 100 },
      { stage: "Opened size guide", before: 9, after: 46 },
      { stage: "Added to cart", before: 4.2, after: 5.6 },
      { stage: "Purchased", before: 1.1, after: 1.48 },
    ],
    results: [
      { label: "Cost per new customer", value: "$412 → $281" },
      { label: "Branded search spend", value: "−66%" },
      { label: "Paid social share of revenue", value: "12% → 38%" },
    ],
    quote: {
      text: "We were paying Google to sell bikes to people already on our site. Surge proved it with a map and a spreadsheet, then put the money somewhere it worked.",
      name: "Andre Kowal",
      role: "Head of e-commerce, Spoke & Gear",
    },
    team: ["daniel", "hanna", "tom"],
  },
  {
    slug: "clayhouse",
    client: "Clayhouse",
    industry: "Retail & DTC",
    services: ["seo-content", "analytics"],
    year: 2025,
    duration: "14 months",
    figure: "+188%",
    metric: "organic revenue",
    lift: 188,
    headline: "Clayhouse ranks for the dinner set, not just the brand.",
    summary:
      "A handmade homeware brand with beautiful pages that search engines couldn't read. We fixed rendering, built a care-and-pairing page set, and measured every page by revenue.",
    image: clayhouse,
    imageAlt: "Stacks of stoneware plates and bowls on a wooden shelf",
    challenge: [
      "Clayhouse's storefront rendered product details in JavaScript that crawlers never executed. Only 31% of product pages were indexed, and organic traffic was almost entirely brand searches.",
      "The team published two lifestyle posts a month that had never brought in a measurable sale.",
    ],
    approach: [
      "We moved product content to server rendering, rebuilt the collection templates and fixed 4,100 internal links. Indexed product pages went from 31% to 96% in nine weeks.",
      "Then we built a programmatic set of care guides and dinnerware pairings — the questions buyers ask before spending $300 on a set — and replaced the lifestyle blog with them.",
    ],
    experiments: [
      {
        name: "Server-rendered product content",
        hypothesis: "Crawlers miss specs rendered client-side.",
        metric: "Indexed product pages",
        control: 31,
        variant: 96,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Care guide template",
        hypothesis: "Care questions precede first purchases.",
        metric: "Organic sessions to PDP",
        control: 8,
        variant: 19,
        unit: "%",
        confidence: 97,
        shipped: true,
      },
      {
        name: "Pairing pages vs blog posts",
        hypothesis: "Pairing intent converts better than inspiration.",
        metric: "Organic conversion rate",
        control: 0.6,
        variant: 1.9,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "FAQ schema on collections",
        hypothesis: "Rich results lift click-through.",
        metric: "Collection CTR",
        control: 3.1,
        variant: 3.3,
        unit: "%",
        confidence: 58,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "Organic sessions", before: 100, after: 241 },
      { stage: "Reached a product", before: 38, after: 104 },
      { stage: "Added to cart", before: 4.1, after: 11.2 },
      { stage: "Purchased", before: 1.3, after: 3.7 },
    ],
    results: [
      { label: "Organic revenue", value: "+188% year on year" },
      { label: "Indexed product pages", value: "31% → 96%" },
      { label: "Non-brand share of clicks", value: "9% → 47%" },
    ],
    quote: {
      text: "Jonah's team talked about our plates in revenue, not rankings. That was the first time SEO made sense to me as a channel.",
      name: "Ines Arteaga",
      role: "Founder, Clayhouse",
    },
    team: ["jonah", "tom", "sofia"],
  },
  {
    slug: "dewlab",
    client: "Dewlab",
    industry: "Retail & DTC",
    services: ["paid-acquisition", "analytics"],
    year: 2026,
    duration: "8 months",
    figure: "+140%",
    metric: "measured return on ad spend",
    lift: 140,
    headline:
      "Dewlab stopped trusting the dashboards and started testing them.",
    summary:
      "A skincare brand whose three attribution tools disagreed by a factor of four. We built one measurement model, ran two holdouts and moved $1.2M of budget on the results.",
    image: dewlab,
    imageAlt:
      "An amber dropper bottle of serum on a turned wooden stand in sunlight",
    challenge: [
      "Meta reported a 4.1 return on ad spend, Google 3.6 and the post-purchase survey said neither. Dewlab's CFO had frozen budget increases until someone could explain the difference.",
      "Retargeting took 40% of spend and claimed most of the credit.",
    ],
    approach: [
      "Tom's team rebuilt tracking server-side, reconciled orders to Shopify within 1.5%, and ran a geo holdout on retargeting and a conversion lift study on prospecting.",
      "Retargeting turned out to be 70% non-incremental. We moved that budget to prospecting video and creator whitelisting, measured with a lightweight media mix model refreshed monthly.",
    ],
    experiments: [
      {
        name: "Retargeting paused in test regions",
        hypothesis: "Retargeting mostly reaches people who will buy anyway.",
        metric: "Blended cost per order",
        control: 64,
        variant: 52,
        unit: "$",
        confidence: 96,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Creator whitelisting vs brand ads",
        hypothesis: "Creator handles lower cost per new customer.",
        metric: "Cost per new customer",
        control: 58,
        variant: 39,
        unit: "$",
        confidence: 98,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Starter kit as hero offer",
        hypothesis: "A three-step kit beats single-product offers.",
        metric: "First-order AOV",
        control: 42,
        variant: 61,
        unit: "$",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Before/after imagery",
        hypothesis: "Visible results lift click-through.",
        metric: "Click-through rate",
        control: 1.2,
        variant: 1.1,
        unit: "%",
        confidence: 72,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "Reached by ads", before: 100, after: 100 },
      { stage: "Visited site", before: 1.2, after: 1.6 },
      { stage: "Started checkout", before: 0.24, after: 0.38 },
      { stage: "New customer", before: 0.14, after: 0.25 },
    ],
    results: [
      { label: "Measured return on ad spend", value: "1.5 → 3.6" },
      { label: "Budget moved on test results", value: "$1.2M" },
      { label: "Reporting gap to Shopify", value: "31% → 1.5%" },
    ],
    quote: {
      text: "Our CFO now opens the Monday report before I do. That is the whole case study, honestly.",
      name: "Priya Natarajan",
      role: "VP Marketing, Dewlab",
    },
    team: ["tom", "daniel", "elliot"],
  },
  {
    slug: "deskline",
    client: "Deskline",
    industry: "B2B SaaS",
    services: ["analytics", "conversion", "paid-acquisition"],
    year: 2026,
    duration: "11 months",
    figure: "+63%",
    metric: "sales-qualified pipeline",
    lift: 63,
    headline: "Deskline's demo form now books meetings, not spam.",
    summary:
      "Booking software for flexible offices, selling to operations teams. We connected ad spend to closed deals, rebuilt the pricing page and turned the demo form into a qualifier.",
    image: deskline,
    imageAlt:
      "A bright open-plan office with a long meeting table and floor-to-ceiling windows",
    challenge: [
      "Deskline optimised LinkedIn and Google to form fills. Sales said 70% of demo requests were students, competitors or one-desk companies.",
      'The pricing page hid the price behind "contact us", which the best-fit buyers — office managers with a budget — found exhausting.',
    ],
    approach: [
      "We piped CRM stages back to the ad platforms so bidding optimised to sales-qualified meetings, then rebuilt the demo form with three qualifying questions and instant calendar booking for good fits.",
      "On the pricing page we tested published per-desk prices against the contact-us version. Published prices won by a wide margin.",
    ],
    experiments: [
      {
        name: "Published per-desk pricing",
        hypothesis: "Qualified buyers prefer to self-qualify on price.",
        metric: "Pricing page to demo",
        control: 2.4,
        variant: 4.1,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Qualifying demo form",
        hypothesis: "Three questions filter noise without losing buyers.",
        metric: "Qualified share of demos",
        control: 30,
        variant: 64,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Bid on SQL, not form fill",
        hypothesis: "Optimising to pipeline changes who the ads find.",
        metric: "Cost per SQL",
        control: 690,
        variant: 410,
        unit: "$",
        confidence: 97,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Calculator lead magnet",
        hypothesis: "A desk-savings calculator captures earlier buyers.",
        metric: "Lead to SQL",
        control: 6,
        variant: 5.4,
        unit: "%",
        confidence: 66,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "Visited pricing", before: 100, after: 100 },
      { stage: "Requested demo", before: 2.4, after: 4.1 },
      { stage: "Qualified meeting", before: 0.72, after: 2.6 },
      { stage: "Closed deal", before: 0.16, after: 0.48 },
    ],
    results: [
      { label: "Sales-qualified pipeline", value: "+63% per quarter" },
      { label: "Cost per qualified meeting", value: "$690 → $410" },
      { label: "Demo requests sales accepted", value: "30% → 64%" },
    ],
    quote: {
      text: "Fewer demos, more deals, and my sales team stopped complaining about marketing. I didn't think all three were possible.",
      name: "Marcus Bell",
      role: "CEO, Deskline",
    },
    team: ["tom", "hanna", "daniel", "sofia"],
  },
  {
    slug: "crumb-and-co",
    client: "Crumb & Co.",
    industry: "Food & drink",
    services: ["lifecycle", "seo-content"],
    year: 2025,
    duration: "7 months",
    figure: "+27%",
    metric: "repeat orders per customer",
    lift: 27,
    headline: "Crumb & Co. turned Saturday regulars into weekday orders.",
    summary:
      "A fourteen-store bakery chain with an ordering app nobody opened twice. We tied local search to app installs and built a pickup reminder around each customer's usual day.",
    image: crumb,
    imageAlt:
      "Three rustic seeded loaves with wheat stalks on a dark floured board",
    challenge: [
      "Crumb & Co. had 48,000 app accounts and an average of 1.3 orders per customer. Push notifications were weekly promotions sent to everyone at 9 am.",
      "Each store had a thin location page that ranked below delivery aggregators taking a 30% commission.",
    ],
    approach: [
      "We rebuilt fourteen store pages with live bake schedules and order-ahead links, winning back local searches from the aggregators.",
      "In the app, Clara's team replaced the weekly blast with a reminder sent the evening before each customer's habitual order day, plus a second-order offer timed to the first order's pickup.",
    ],
    experiments: [
      {
        name: "Habit-day pickup reminder",
        hypothesis: "Reminders tied to personal routine beat broadcast promos.",
        metric: "Weekly order rate",
        control: 8.2,
        variant: 11.6,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Bake schedule on store pages",
        hypothesis: "Live bake times earn local clicks over aggregators.",
        metric: "Direct order share",
        control: 41,
        variant: 58,
        unit: "%",
        confidence: 96,
        shipped: true,
      },
      {
        name: "Second-order offer at pickup",
        hypothesis: "An offer in hand beats one in the inbox.",
        metric: "Second order within 14 days",
        control: 18,
        variant: 26,
        unit: "%",
        confidence: 98,
        shipped: true,
      },
      {
        name: "Loyalty stamp redesign",
        hypothesis: "Visible progress raises frequency.",
        metric: "Orders per member",
        control: 2.1,
        variant: 2.15,
        unit: "%",
        confidence: 54,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "First app order", before: 100, after: 100 },
      { stage: "Second order", before: 22, after: 31 },
      { stage: "Third order", before: 11, after: 18 },
      { stage: "Weekly regular", before: 5, after: 9 },
    ],
    results: [
      { label: "Repeat orders per customer", value: "+27%" },
      {
        label: "Orders placed direct, not via aggregators",
        value: "41% → 58%",
      },
      { label: "Commission saved", value: "$310,000 a year" },
    ],
    quote: {
      text: "The reminder goes out at 7 pm the night before people usually come in. It's so simple I'm annoyed we didn't think of it.",
      name: "Lena Fortier",
      role: "Operations director, Crumb & Co.",
    },
    team: ["clara", "jonah", "sofia"],
  },
  {
    slug: "swell-camps",
    client: "Swell Camps",
    industry: "Travel & hospitality",
    services: ["paid-acquisition", "conversion", "growth-sprint"],
    year: 2025,
    duration: "10 months",
    figure: "+52%",
    metric: "booking conversion",
    lift: 52,
    headline: "Swell Camps fills the shoulder season before it starts.",
    summary:
      "Week-long surf camps on three coasts, sold out in August and half-empty in October. A growth sprint found the lever; a booking-flow program pulled it.",
    image: swell,
    imageAlt: "A surfer riding inside a curling turquoise wave",
    challenge: [
      "Swell Camps spent 60% of its media budget in June and July, when camps sold out regardless. Shoulder-season weeks ran at 48% occupancy.",
      "The booking flow asked for a $900 deposit on the first screen, before showing what the week included.",
    ],
    approach: [
      "The sprint's growth model showed each shoulder-season bed was worth three summer ones in margin. We flipped the media calendar and built offers around warmer water and smaller groups.",
      "Hanna's team rebuilt booking as a three-step flow — choose week, see the itinerary, then pay a $200 deposit — and tested it against the old one.",
    ],
    experiments: [
      {
        name: "Itinerary before deposit",
        hypothesis: "Showing the week first reduces deposit drop-off.",
        metric: "Booking conversion",
        control: 2.1,
        variant: 3.2,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "$200 deposit vs $900",
        hypothesis:
          "A lower deposit lifts bookings without raising cancellations.",
        metric: "Deposits paid",
        control: 31,
        variant: 47,
        unit: "%",
        confidence: 99,
        shipped: true,
      },
      {
        name: "Shoulder-season water temp ads",
        hypothesis: "Specific conditions beat generic surf imagery.",
        metric: "Cost per booking",
        control: 188,
        variant: 121,
        unit: "$",
        confidence: 95,
        shipped: true,
        lowerIsBetter: true,
      },
      {
        name: "Group-size badge on listing",
        hypothesis: "Small groups are a selling point.",
        metric: "Listing to booking",
        control: 6.4,
        variant: 6.8,
        unit: "%",
        confidence: 70,
        shipped: false,
      },
    ],
    funnel: [
      { stage: "Viewed a camp", before: 100, after: 100 },
      { stage: "Chose a week", before: 18, after: 24 },
      { stage: "Paid deposit", before: 5.6, after: 11.3 },
      { stage: "Completed booking", before: 2.1, after: 3.2 },
    ],
    results: [
      { label: "Booking conversion", value: "2.1% → 3.2%" },
      { label: "Shoulder-season occupancy", value: "48% → 81%" },
      { label: "Cost per booking", value: "$188 → $121" },
    ],
    quote: {
      text: "October used to be the month we worried about payroll. This year we had a waitlist.",
      name: "Kai Moreno",
      role: "Founder, Swell Camps",
    },
    team: ["maya", "hanna", "daniel"],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);

/* ------------------------------------------------------------ home */

export const home = {
  title: "Growth marketing for brands that sell twice",
  h1: "We run the experiments that compound revenue.",
  lede: "Surge is a 24-person growth marketing agency for subscription, DTC and B2B software brands. Paid acquisition, conversion, lifecycle and measurement — run as one weekly experiment program, reported in dollars.",
  boardTitle: "This week's readout",
  boardNote:
    "Live tests across client programs, week of Oct 12. Clients shown with permission.",
  board: [
    {
      client: "Halfmoon Coffee",
      test: "Grind picker on first order",
      metric: "Second-order rate",
      control: 74,
      variant: 81.5,
      confidence: 97,
    },
    {
      client: "Swell Camps",
      test: "Water temperature on October weeks",
      metric: "Week page to deposit",
      control: 5.6,
      variant: 6.9,
      confidence: 96,
    },
    {
      client: "Deskline",
      test: "Annual price shown first",
      metric: "Plan upgrade rate",
      control: 12,
      variant: 14.8,
      confidence: 95,
    },
    {
      client: "Clayhouse",
      test: "Care guide links on product pages",
      metric: "Add-to-cart rate",
      control: 6.2,
      variant: 6.5,
      confidence: 64,
    },
  ],
  clientsLead: "Programs running now for",
  servicesTitle: "Six disciplines, one backlog",
  servicesText:
    "Every service feeds the same weekly experiment list, ranked by expected revenue. You never pay two teams to argue about attribution.",
  featured: "halfmoon-coffee",
  loopTitle: "The week, every week",
  loopText:
    "Growth is a rhythm, not a campaign. Every program runs on the same five-day loop, and you can sit in on any of it.",
  loop: [
    {
      day: "Mon",
      title: "Readout",
      text: "Last week's results, called by our experiment designer. Wins ship; losses get written up.",
    },
    {
      day: "Tue",
      title: "Backlog",
      text: "New hypotheses ranked by expected value, cost and confidence. The top three get built.",
    },
    {
      day: "Wed",
      title: "Build",
      text: "Variants, creative and flows built in your stack, reviewed against the written hypothesis.",
    },
    {
      day: "Thu",
      title: "QA & launch",
      text: "Tracking checked event by event, then tests go live with their stop rules attached.",
    },
    {
      day: "Fri",
      title: "Report",
      text: "A one-page note to your team: what's live, what's learned, what it's worth in dollars.",
    },
  ],
  roiTitle: "What would ten points of lift be worth to you?",
  roiText:
    "Put in your monthly revenue and see a 12-month range from our blended program results. Then open the full model and change every assumption.",
  moreWork: ["deskline", "swell-camps", "dewlab"],
  quote: {
    text: "Every agency shows you a chart going up. Surge showed us the tests that didn't work, too — that's why we believed the ones that did.",
    name: "Marcus Bell",
    role: "CEO, Deskline",
  },
  teamTitle: "You meet the people doing the work",
  teamText:
    "No account-manager relay. Your client partner hosts the readout; the specialists who build your tests are on the call.",
  teamImage: workshop,
  teamImageAlt:
    "A Surge strategist mapping hypotheses on sticky notes while the team works at laptops",
  closeTitle: "Send us your funnel. We'll send back a 90-day plan.",
  closeText:
    "Tell us where growth is stuck. Within three working days you'll get a written proposal with the first six experiments we'd run and what they could be worth.",
};

/* ------------------------------------------------------------ pages */

export const servicesPage = {
  h1: "Services",
  lede: "Six disciplines that share one backlog, one dashboard and one weekly readout. Hire one, or let them work together — that's where the compounding happens.",
  engagementsTitle: "Ways to work with us",
  engagementsText:
    "Flat fees, no percentage of spend, 90-day minimum on programs. Quarterly prepayment saves 8%.",
};

export const workPage = {
  h1: "Case studies",
  lede: "Seven programs, every one with its losing tests left in. Filter by what we did or who we did it for.",
};

export const roiPage = {
  h1: "ROI model",
  lede: "A twelve-month model of what a Surge program could add to your revenue, built from the lift ranges of our last 40 programs. Change any assumption; the chart redraws as you go.",
  note: "Illustrative model, not a forecast or a promise. Lift ranges are blended results from past programs; your proposal replaces them with numbers from your own data.",
  /** Revenue lift reached by month 12 as [low, expected, high], per engagement. */
  lift: {
    sprint: [0.03, 0.06, 0.1],
    program: [0.07, 0.14, 0.22],
    embedded: [0.11, 0.21, 0.32],
  },
  maturity: [
    { id: "none", label: "We've never run A/B tests", factor: 1.25 },
    { id: "some", label: "We test now and then", factor: 1 },
    { id: "mature", label: "We already run a testing program", factor: 0.6 },
  ],
  explain: [
    {
      title: "How the model works",
      paras: [
        "Added revenue starts after a set-up month and climbs toward its twelve-month ceiling on a curve that flattens — early tests find the big leaks, later ones refine. A sprint starts later and climbs slower because your team runs the roadmap.",
        "The ceilings come from our last 40 programs: the 25th, 50th and 75th percentile of revenue lift at month twelve. Teams that have never tested have more headroom; teams with a mature program have less.",
      ],
    },
    {
      title: "What it leaves out",
      paras: [
        "Media spend, seasonality and customer value beyond twelve months are not modelled. Gross margin turns added revenue into the profit that pays our fees, so set it honestly — after shipping, returns and payment costs.",
        "Your proposal replaces every assumption here with a baseline from your own data.",
      ],
    },
  ],
};

export const teamPage = {
  h1: "The team",
  lede: "Twenty-four specialists in Portland and five remote cities. These eight lead the disciplines and will be in your readouts.",
  image: floor,
  imageAlt: "Two Surge analysts reviewing test results together at a desk",
  valuesTitle: "What we hold each other to",
  values: [
    {
      title: "Write the hypothesis first",
      text: "No variant gets built without a sentence that says what we expect and why. If we can't write it, we don't test it.",
    },
    {
      title: "Report the losses",
      text: "About half our tests lose. Every one is written up and shared with the client, because losses are paid-for research.",
    },
    {
      title: "Dollars over dashboards",
      text: "Click-through and open rates are inputs. We report revenue, margin and payback — the numbers your finance team uses.",
    },
    {
      title: "Leave it better documented",
      text: "Every tracking plan, flow and test lives in your tools with notes. If you leave us, nothing leaves with us.",
    },
  ],
  podsTitle: "How a program is staffed",
  podsText:
    "Each client gets a pod: a client partner, two to four specialists matched to the plan, and an experiment designer who signs off every test. Pods stay together for the life of the program.",
  studio: studio,
  studioAlt: "The Surge studio floor with long shared desks and monitors",
  rolesTitle: "Open roles",
  roles: [
    {
      title: "Senior paid social buyer",
      place: "Portland or remote (US)",
      salary: "$115,000 – $135,000",
    },
    {
      title: "Lifecycle copywriter",
      place: "Portland",
      salary: "$82,000 – $96,000",
    },
    {
      title: "Analytics engineer (dbt)",
      place: "Remote (US)",
      salary: "$130,000 – $150,000",
    },
  ],
};

export const approachPage = {
  h1: "Approach",
  lede: "How a Surge program actually runs, from the first data export to the twelfth monthly report — and what we'll need from you along the way.",
  ninetyTitle: "The first 90 days",
  ninety: [
    {
      span: "Days 1–10",
      title: "Access and audit",
      text: "Data access, tracking review and a baseline everyone agrees on. Nothing is tested until the numbers reconcile.",
    },
    {
      span: "Days 11–30",
      title: "Model and backlog",
      text: "Growth model built, opportunities sized in dollars, first twenty hypotheses ranked.",
    },
    {
      span: "Days 31–60",
      title: "First tests live",
      text: "Three to six experiments running, weekly readouts started, creative and flows in production.",
    },
    {
      span: "Days 61–90",
      title: "First wins shipped",
      text: "Winners merged, first holdout designed, and a 90-day report that says what's working in dollars.",
    },
  ],
  needTitle: "What we need from you",
  need: [
    "Admin access to analytics, ad accounts and your email platform in week one",
    "A decision-maker at the Monday readout, at least every other week",
    "A developer for about four hours a week, or permission to deploy tests ourselves",
    "Honest numbers: margins, churn and refunds, not just revenue",
  ],
  statsTitle: "How we call a test",
  statsText:
    "Every test is sized before launch for the smallest lift worth shipping. We call results at 95% probability of beating control, never peek-and-stop, and treat anything between 80% and 95% as a lead worth re-testing — not a win.",
  faqTitle: "Questions clients ask",
  faqs: [
    {
      q: "What does a program cost?",
      a: "Programs start at $16,500 a month for two disciplines; an embedded pod is $27,000. Media spend is billed by the platforms directly, never marked up.",
    },
    {
      q: "Is there a minimum term?",
      a: "Ninety days. Growth programs need about a quarter to show results you can trust. After that it's month to month with 30 days' notice.",
    },
    {
      q: "Who owns the work?",
      a: "You do. Ad accounts, tracking, creative, code and documentation all live in your tools under your logins.",
    },
    {
      q: "Do you work with companies our size?",
      a: "Our clients usually sell between $3M and $80M a year. Below that, the growth sprint is often the better fit; above it, the embedded team.",
    },
    {
      q: "Do you work with competitors?",
      a: "Not in the same category at the same time. We will tell you during the proposal if there is a conflict.",
    },
    {
      q: "How quickly can you start?",
      a: "Usually within two to three weeks of a signed proposal. Sprints can often start the following Monday.",
    },
  ],
};

export const proposalPage = {
  h1: "Request a proposal",
  lede: "Tell us where growth is stuck. A partner reads every request and replies within three working days with a written proposal: the first six experiments we'd run, who would run them, and what it would cost.",
  steps: [
    "A 30-minute call with Sofia or Maya to go through your numbers",
    "Read-only access to analytics for a quick baseline check",
    "A written proposal with experiments, team and fees",
  ],
  budgets: [
    "Under $10k a month",
    "$10k – $20k a month",
    "$20k – $35k a month",
    "$35k+ a month",
  ],
  roles: [
    "Founder / CEO",
    "Head of marketing or growth",
    "E-commerce or product lead",
    "Finance",
    "Other",
  ],
  timelines: [
    "As soon as possible",
    "Within a month",
    "Next quarter",
    "Just exploring",
  ],
};

export const clients = cases.map((c) => c.client);
