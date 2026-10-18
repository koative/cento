/* All copy and demo data for Signal. Rebranding the template means editing this file. */

export const brand = {
  name: "Signal",
  sector: "Product analytics",
  tagline: "Know which change moved the number.",
  email: "hello@signal.example",
  sales: "sales@signal.example",
  careers: "jobs@signal.example",
  phone: "+1 555 0142 300",
  address: [
    "Signal Analytics Ltd.",
    "41 Rua das Flores, 3rd floor",
    "1200-195 Lisbon",
  ],
  workspace: "Fernway",
  gallery: "https://koative.github.io/cento/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/product", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/customers", label: "Customers" },
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "Company" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "Overview" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
      { to: "/app", label: "Live demo" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/docs", label: "Docs" },
      { to: "/customers", label: "Customer stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About & careers" },
      { to: "/demo", label: "Book a demo" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ---------- Demo series ---------- */

/** Deterministic daily series with a weekday rhythm, so charts look like real traffic. */
export function wave(
  seed: number,
  n: number,
  base: number,
  swing = 0.14,
  growth = 0.003,
): number[] {
  let s = seed % 2147483646 || 1;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: n }, (_, i) => {
    const dow = (((6 - (n - 1 - i)) % 7) + 7) % 7; // the last point is Saturday 17 Oct
    const weekday = dow === 0 || dow === 6 ? -swing * 0.9 : swing * 0.25;
    const v = base * (1 + growth * i + weekday + (rnd() - 0.5) * swing);
    return base < 100 ? +v.toFixed(2) : Math.round(v);
  });
}

/** Day labels ending on the demo's "yesterday" (17 Oct 2026). */
export function dayLabels(n: number): string[] {
  return Array.from({ length: n }, (_, i) =>
    new Date(Date.UTC(2026, 9, 17 - (n - 1 - i))).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }),
  );
}

/* ---------- Event catalog (shared by marketing + app) ---------- */

export type EventStatus = "Verified" | "Unverified" | "Deprecated";
export type EventDef = {
  id: string;
  category:
    "Acquisition" | "Activation" | "Engagement" | "Revenue" | "Retention";
  description: string;
  volume: number;
  users: number;
  change: number;
  lastSeen: string;
  status: EventStatus;
  source: "Web" | "iOS" | "Android" | "Server";
  owner: string;
  properties: {
    name: string;
    type: "string" | "number" | "boolean" | "timestamp";
    example: string;
  }[];
};

export const events: EventDef[] = [
  {
    id: "page_viewed",
    category: "Acquisition",
    description:
      "Any page load on fernway.example, including client-side route changes.",
    volume: 4_812_330,
    users: 612_480,
    change: 6.2,
    lastSeen: "4 sec ago",
    status: "Verified",
    source: "Web",
    owner: "Growth",
    properties: [
      { name: "path", type: "string", example: "/stays/lisbon" },
      { name: "referrer_domain", type: "string", example: "news.example" },
      { name: "utm_campaign", type: "string", example: "autumn-city-breaks" },
    ],
  },
  {
    id: "search_performed",
    category: "Activation",
    description:
      "A traveller submits the stay search form with a destination and dates.",
    volume: 1_204_118,
    users: 288_904,
    change: 11.4,
    lastSeen: "6 sec ago",
    status: "Verified",
    source: "Web",
    owner: "Search",
    properties: [
      { name: "destination", type: "string", example: "Porto" },
      { name: "nights", type: "number", example: "3" },
      { name: "guests", type: "number", example: "2" },
      { name: "flexible_dates", type: "boolean", example: "true" },
    ],
  },
  {
    id: "listing_viewed",
    category: "Activation",
    description:
      "A stay detail page is opened from search results, a map pin or a shared link.",
    volume: 2_031_552,
    users: 241_310,
    change: 3.8,
    lastSeen: "5 sec ago",
    status: "Verified",
    source: "Web",
    owner: "Search",
    properties: [
      { name: "listing_id", type: "string", example: "st_48211" },
      { name: "position", type: "number", example: "4" },
      { name: "price_per_night", type: "number", example: "148" },
    ],
  },
  {
    id: "signup_completed",
    category: "Acquisition",
    description:
      "Account created, email confirmed or social sign-in returned successfully.",
    volume: 41_208,
    users: 40_877,
    change: -2.1,
    lastSeen: "1 min ago",
    status: "Verified",
    source: "Server",
    owner: "Growth",
    properties: [
      { name: "method", type: "string", example: "email" },
      { name: "invited", type: "boolean", example: "false" },
    ],
  },
  {
    id: "wishlist_saved",
    category: "Engagement",
    description:
      "A listing is added to any wishlist from the heart button or the share sheet.",
    volume: 318_640,
    users: 97_215,
    change: 18.9,
    lastSeen: "12 sec ago",
    status: "Verified",
    source: "iOS",
    owner: "Engagement",
    properties: [
      { name: "listing_id", type: "string", example: "st_10974" },
      { name: "wishlist_size", type: "number", example: "7" },
    ],
  },
  {
    id: "checkout_started",
    category: "Revenue",
    description:
      "The booking form opens with dates, guests and a price quote attached.",
    volume: 96_402,
    users: 71_118,
    change: 4.4,
    lastSeen: "21 sec ago",
    status: "Verified",
    source: "Web",
    owner: "Payments",
    properties: [
      { name: "listing_id", type: "string", example: "st_48211" },
      { name: "total", type: "number", example: "512.40" },
      { name: "currency", type: "string", example: "USD" },
    ],
  },
  {
    id: "payment_submitted",
    category: "Revenue",
    description:
      "Card details are submitted to the payment provider. Fired before the response.",
    volume: 52_960,
    users: 47_330,
    change: 7.1,
    lastSeen: "48 sec ago",
    status: "Verified",
    source: "Server",
    owner: "Payments",
    properties: [
      { name: "method", type: "string", example: "card" },
      { name: "three_ds", type: "boolean", example: "true" },
    ],
  },
  {
    id: "booking_confirmed",
    category: "Revenue",
    description:
      "The host accepts or instant-book confirms. The event that pays the bills.",
    volume: 44_871,
    users: 41_506,
    change: 9.6,
    lastSeen: "1 min ago",
    status: "Verified",
    source: "Server",
    owner: "Payments",
    properties: [
      { name: "booking_id", type: "string", example: "bk_7720931" },
      { name: "revenue", type: "number", example: "512.40" },
      { name: "nights", type: "number", example: "3" },
      { name: "instant_book", type: "boolean", example: "true" },
    ],
  },
  {
    id: "review_posted",
    category: "Retention",
    description:
      "A guest publishes a review after checkout. Draft saves are not counted.",
    volume: 18_334,
    users: 17_902,
    change: 1.2,
    lastSeen: "3 min ago",
    status: "Verified",
    source: "Android",
    owner: "Engagement",
    properties: [
      { name: "rating", type: "number", example: "5" },
      { name: "has_photos", type: "boolean", example: "false" },
    ],
  },
  {
    id: "map_panned",
    category: "Engagement",
    description:
      "The search map is dragged or zoomed. Throttled to one event per 2 seconds.",
    volume: 3_402_117,
    users: 156_041,
    change: 24.3,
    lastSeen: "2 sec ago",
    status: "Unverified",
    source: "Web",
    owner: "Search",
    properties: [
      { name: "zoom", type: "number", example: "13" },
      { name: "results_in_view", type: "number", example: "64" },
    ],
  },
  {
    id: "push_opened",
    category: "Retention",
    description:
      "A push notification is tapped and the app opens to its deep link.",
    volume: 74_208,
    users: 38_115,
    change: -6.8,
    lastSeen: "34 sec ago",
    status: "Verified",
    source: "iOS",
    owner: "Engagement",
    properties: [
      { name: "campaign", type: "string", example: "price-drop" },
      {
        name: "deep_link",
        type: "string",
        example: "fernway://stays/st_10974",
      },
    ],
  },
  {
    id: "promo_applied",
    category: "Revenue",
    description:
      "A promo code passes validation in checkout. Rejected codes fire promo_rejected.",
    volume: 8_906,
    users: 8_640,
    change: -12.5,
    lastSeen: "6 min ago",
    status: "Unverified",
    source: "Web",
    owner: "Payments",
    properties: [
      { name: "code", type: "string", example: "AUTUMN15" },
      { name: "discount", type: "number", example: "76.86" },
    ],
  },
  {
    id: "host_message_sent",
    category: "Engagement",
    description: "A guest sends a message to a host before or after booking.",
    volume: 129_550,
    users: 52_390,
    change: 2.7,
    lastSeen: "9 sec ago",
    status: "Verified",
    source: "Android",
    owner: "Engagement",
    properties: [
      { name: "pre_booking", type: "boolean", example: "true" },
      { name: "length", type: "number", example: "142" },
    ],
  },
  {
    id: "legacy_cta_click",
    category: "Acquisition",
    description:
      "Old homepage button tracking. Replaced by page_viewed + utm properties in March.",
    volume: 1_204,
    users: 1_101,
    change: -71.3,
    lastSeen: "2 days ago",
    status: "Deprecated",
    source: "Web",
    owner: "Growth",
    properties: [{ name: "label", type: "string", example: "Find a stay" }],
  },
  {
    id: "subscription_renewed",
    category: "Retention",
    description:
      "Fernway Plus membership renews at the end of a billing period.",
    volume: 6_118,
    users: 6_118,
    change: 3.3,
    lastSeen: "14 min ago",
    status: "Verified",
    source: "Server",
    owner: "Payments",
    properties: [
      { name: "plan", type: "string", example: "plus_yearly" },
      { name: "amount", type: "number", example: "49.00" },
    ],
  },
  {
    id: "date_picker_opened",
    category: "Activation",
    description:
      "The calendar opens on search or listing pages. Useful for friction studies.",
    volume: 884_201,
    users: 266_480,
    change: 0.4,
    lastSeen: "3 sec ago",
    status: "Unverified",
    source: "iOS",
    owner: "Search",
    properties: [
      { name: "surface", type: "string", example: "listing" },
      { name: "prefilled", type: "boolean", example: "false" },
    ],
  },
];

/* ---------- Signature: query composer on Home ---------- */

export const composer = {
  measures: [
    { id: "unique", label: "Unique users", fn: "count_unique(user_id)" },
    { id: "total", label: "Total events", fn: "count()" },
    {
      id: "per_user",
      label: "Events per user",
      fn: "count() / count_unique(user_id)",
    },
  ],
  events: [
    "search_performed",
    "listing_viewed",
    "checkout_started",
    "booking_confirmed",
    "wishlist_saved",
  ],
  breakdowns: [
    {
      id: "none",
      label: "No breakdown",
      segments: [{ label: "All users", share: 1 }],
    },
    {
      id: "platform",
      label: "Platform",
      segments: [
        { label: "Web", share: 0.52 },
        { label: "iOS", share: 0.31 },
        { label: "Android", share: 0.17 },
      ],
    },
    {
      id: "country",
      label: "Country",
      segments: [
        { label: "Portugal", share: 0.38 },
        { label: "Spain", share: 0.27 },
        { label: "France", share: 0.21 },
      ],
    },
  ],
  periods: [
    { days: 14, label: "Last 14 days" },
    { days: 30, label: "Last 30 days" },
    { days: 60, label: "Last 60 days" },
  ],
};

/* ---------- Home ---------- */

export const home = {
  title: "Signal — Product analytics",
  heroTitle: "Know which change moved the number.",
  heroText:
    "Signal turns the events your product already sends into funnels, retention curves and answers your whole team can read. Ask a question, see the chart, ship the fix.",
  heroNote: "Free up to 1 million events a month. No card, no sales call.",
  composerTitle: "Ask Signal a question",
  install: {
    title: "Three lines in, every click accounted for.",
    text: "Drop in the SDK and Signal captures page views, sessions and identities on its own. Name the events that matter, and they show up in the catalog with owners, types and a live count.",
    code: `import { signal } from "@signal/web";

signal.init("sg_live_4f9c…", { autocapture: true });
signal.track("booking_confirmed", { revenue: 512.4, nights: 3 });`,
    facts: [
      { term: "Payload", detail: "4.1 kB gzipped, no cookies by default" },
      { term: "Latency", detail: "events queryable in under 5 seconds" },
      {
        term: "SDKs",
        detail: "Web, iOS, Android, React Native, Python, Go, HTTP",
      },
    ],
  },
  funnel: {
    title: "See exactly where people quit.",
    text: "Build a funnel from any events in seconds. Signal shows the drop between every step, how long people took, and which segment fell off hardest, so the next sprint has a target instead of a hunch.",
    points: [
      "Conversion windows from one hour to ninety days",
      "Break down any step by platform, country, plan or a custom property",
      "Click a drop-off to open the people who left and what they did next",
    ],
  },
  retention: {
    title: "Retention you can read at a glance.",
    text: "Weekly cohorts, shaded by how many came back. The diagonal tells you whether last month's onboarding change held, and you do not need a data team to draw it.",
  },
  catalog: {
    title: "One catalog, one meaning per event.",
    text: "Every event has an owner, a description and typed properties. Unverified events are flagged until someone signs off, and deprecated ones stop polluting your dashboards.",
  },
  quote: {
    text: "We used to argue about whose spreadsheet was right. Now the funnel is the meeting agenda, and we spend the hour fixing step three instead.",
    name: "Inês Barata",
    role: "Head of Product, Fernway",
    story: "fernway",
  },
  privacy: {
    title: "Your users' data stays yours.",
    text: "Analytics should not need surveillance. Signal is built to answer product questions without fingerprinting anyone.",
    points: [
      {
        term: "Hosted in the EU or US",
        detail: "Pick the region at sign-up. Data never leaves it.",
      },
      {
        term: "Cookieless by default",
        detail: "Anonymous IDs live in memory until a user signs in.",
      },
      {
        term: "Delete on request",
        detail:
          "One API call erases a person across every event, within 24 hours.",
      },
      {
        term: "Your warehouse, too",
        detail:
          "Nightly sync to BigQuery, Snowflake or Postgres on Scale plans.",
      },
    ],
  },
  sdks: [
    "JavaScript",
    "React",
    "Next.js",
    "iOS (Swift)",
    "Android (Kotlin)",
    "React Native",
    "Flutter",
    "Python",
    "Go",
    "Ruby",
    "Segment source",
    "HTTP API",
  ],
  closeTitle: "Open the demo workspace and click everything.",
  closeText:
    "It is a full copy of Signal loaded with a fictional travel marketplace. Build a funnel, sort the event catalog, change the settings. Nothing you do there leaves your browser.",
  funnelPanel: {
    title: "Search to booking",
    meta: "Fernway · last 30 days · 7-day window",
  },
  catalogLink: "Browse the catalog in the demo",
  quoteLink: "Read how Fernway found the leak",
  stackTitle: "Works with the stack you already have.",
  stackLink: "See the quickstart",
  storiesTitle: "What teams found in the first month.",
  storiesLink: "All customer stories",
  priceTitle: "Free to a million events. $96 a month for ten.",
  priceText:
    "Every plan has every chart and unlimited dashboards. Seats are never the thing you pay for.",
};

/* Funnel used on Home and as the first saved funnel in the app. */
export const bookingFunnel = [
  { event: "search_performed", users: 288_904 },
  { event: "listing_viewed", users: 203_117 },
  { event: "checkout_started", users: 71_118 },
  { event: "payment_submitted", users: 47_330 },
  { event: "booking_confirmed", users: 41_506 },
];

/* Weekly retention cohorts: percentage of users active N weeks after first visit. */
export const cohorts = [
  {
    week: "Aug 17",
    size: 18_420,
    values: [100, 46, 38, 33, 31, 29, 28, 27, 26],
  },
  { week: "Aug 24", size: 17_905, values: [100, 47, 39, 34, 31, 30, 28, 27] },
  { week: "Aug 31", size: 19_311, values: [100, 45, 37, 33, 30, 29, 28] },
  { week: "Sep 7", size: 20_448, values: [100, 51, 43, 39, 36, 35] },
  { week: "Sep 14", size: 21_067, values: [100, 53, 45, 41, 38] },
  { week: "Sep 21", size: 20_782, values: [100, 54, 46, 42] },
  { week: "Sep 28", size: 22_150, values: [100, 55, 47] },
  { week: "Oct 5", size: 23_406, values: [100, 56] },
  { week: "Oct 12", size: 21_993, values: [100] },
];

/* ---------- Product page ---------- */

export const product = {
  title: "Product",
  heading: "Everything between the click and the decision.",
  intro:
    "Signal is one tool for the questions product teams ask every week: what are people doing, where do they get stuck, and did the thing we shipped help. No SQL required, no export to a spreadsheet, no waiting on a dashboard request.",
  capabilities: [
    {
      id: "dashboards",
      title: "Dashboards that answer, not decorate",
      text: "Pin any chart to a dashboard and it stays live. Compare to the previous period, annotate releases, and share a read-only link with anyone at the company.",
      specs: [
        "Line, bar, table and number charts",
        "Release annotations from GitHub or by hand",
        "Scheduled digests to email or Slack",
      ],
    },
    {
      id: "funnels",
      title: "Funnels with the why attached",
      text: "Any sequence of events becomes a funnel. Set the window, break down by segment, and open the people who dropped to see the path they took instead.",
      specs: [
        "Up to 12 steps, strict or any order",
        "Time-to-convert distribution per step",
        "Exclusion steps for noisy paths",
      ],
    },
    {
      id: "retention",
      title: "Retention by cohort, by feature, by anything",
      text: "Pick what counts as coming back. Signal draws the cohort grid and the curve, and shows which first-week behaviours predict who stays.",
      specs: [
        "Daily, weekly and monthly cohorts",
        "Unbounded and bracketed retention",
        "Correlated behaviours ranked by lift",
      ],
    },
    {
      id: "catalog",
      title: "An event catalog people trust",
      text: "Every event has an owner, a description and typed properties. New events arrive unverified, so nobody builds a quarterly report on a typo.",
      specs: [
        "Schema checks on ingest",
        "Verify, rename and deprecate without redeploys",
        "Property types enforced per event",
      ],
    },
    {
      id: "alerts",
      title: "Alerts before the weekly review",
      text: "Set a threshold or let Signal learn the normal range. When signups drop at 3 a.m. after a release, the on-call channel hears about it before customers do.",
      specs: [
        "Anomaly detection on any metric",
        "Slack, email and webhook delivery",
        "Snooze and acknowledge from the alert",
      ],
    },
  ],
  pipeline: {
    title: "How your data moves",
    steps: [
      {
        label: "Collect",
        detail:
          "SDKs and the HTTP API batch events with a client timestamp and anonymous ID.",
      },
      {
        label: "Validate",
        detail:
          "Schemas are checked against the catalog; bad payloads are quarantined, not dropped.",
      },
      {
        label: "Resolve",
        detail:
          "Anonymous and signed-in IDs merge into one person, retroactively.",
      },
      {
        label: "Query",
        detail:
          "Columnar storage answers most questions in under a second across a year of data.",
      },
      {
        label: "Sync",
        detail:
          "Nightly export to your warehouse keeps finance and data teams on the same numbers.",
      },
    ],
  },
  limitsTitle: "The numbers behind the numbers.",
  limitsText:
    "Measured on our production clusters over the last twelve months. Your queries will vary with volume and breakdown size.",
  alert: {
    title: "signup_completed fell 62% below its expected range",
    text: "at 03:10, 14 minutes after release v8.3. Posted to #oncall-growth.",
  },
  closeTitle: "Try it on demo data before you add a line of code.",
  limits: [
    { label: "Query speed (p95, 1 year of data)", value: "0.8 s" },
    { label: "Ingest to queryable", value: "< 5 s" },
    { label: "Event properties per event", value: "255" },
    { label: "Data retention", value: "1 year – unlimited" },
    { label: "Uptime last 12 months", value: "99.98%" },
    { label: "Regions", value: "Frankfurt, Virginia" },
  ],
};

/* ---------- Pricing ---------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  yearly: number | null;
  included: number;
  perMillion: number | null;
  blurb: string;
  features: string[];
  cta: { label: string; to: string };
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    included: 1,
    perMillion: null,
    blurb: "For side projects and first launches.",
    features: [
      "1M events a month",
      "3 seats",
      "1 year of history",
      "Funnels, retention, dashboards",
      "Community support",
    ],
    cta: { label: "Start free", to: "/signin" },
  },
  {
    id: "team",
    name: "Team",
    monthly: 96,
    yearly: 80,
    included: 10,
    perMillion: 8,
    blurb: "For product teams shipping every week.",
    features: [
      "10M events, then $8 per million",
      "Unlimited seats",
      "3 years of history",
      "Event catalog with verification",
      "Alerts to Slack and email",
      "Email support, 1 business day",
    ],
    cta: { label: "Start a 14-day trial", to: "/signin" },
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 640,
    yearly: 540,
    included: 100,
    perMillion: 5,
    blurb: "For companies with a data team to keep happy.",
    features: [
      "100M events, then $5 per million",
      "Unlimited history",
      "Warehouse sync",
      "SSO and SCIM",
      "Audit log",
      "Named support engineer",
    ],
    cta: { label: "Book a demo", to: "/demo" },
  },
];

export const pricing = {
  title: "Pricing",
  heading: "Pay for events, not for seats.",
  intro:
    "Every plan includes every chart type and unlimited dashboards. Invite the whole company; the price only moves with the data you send.",
  enterprise: {
    title: "Over a billion events a month?",
    text: "Custom volume pricing, a dedicated region, a security review and an SLA with teeth. Talk to a person who has run analytics at your scale.",
  },
  compare: [
    { feature: "Monthly events included", values: ["1M", "10M", "100M"] },
    { feature: "Seats", values: ["3", "Unlimited", "Unlimited"] },
    { feature: "History", values: ["1 year", "3 years", "Unlimited"] },
    { feature: "Funnels, retention, dashboards", values: [true, true, true] },
    { feature: "Event catalog & verification", values: [false, true, true] },
    { feature: "Alerts & anomaly detection", values: [false, true, true] },
    { feature: "Warehouse sync", values: [false, false, true] },
    { feature: "SSO & SCIM", values: [false, false, true] },
    { feature: "Audit log", values: [false, false, true] },
    { feature: "Support", values: ["Community", "Email", "Named engineer"] },
  ] as { feature: string; values: (string | boolean)[] }[],
  calculator: {
    title: "What would I pay?",
    text: "Drag to your expected monthly volume. A typical web app sends 15–40 events per active user per month.",
  },
  faqTitle: "Questions people ask before paying",
  faq: [
    {
      q: "What counts as an event?",
      a: "Any call to track(), every automatic page view and every server event you send. Identify calls and person property updates are free.",
    },
    {
      q: "What happens if I go over my plan?",
      a: "Nothing breaks. On Free we keep collecting and ask you to upgrade within 30 days. On paid plans the extra millions appear on the next invoice at your plan's rate.",
    },
    {
      q: "Can I switch between monthly and yearly?",
      a: "Yes, at any time. Moving to yearly is prorated immediately; moving to monthly takes effect at the end of the current year.",
    },
    {
      q: "Do you offer discounts for startups or non-profits?",
      a: "Companies under two years old with less than $5M raised get Team free for the first year. Registered non-profits get 50% off any plan.",
    },
    {
      q: "Where is my data stored?",
      a: "In Frankfurt or Virginia, chosen when you create a workspace. Backups stay in the same region.",
    },
    {
      q: "Can I export everything and leave?",
      a: "Yes. Raw events export to CSV or Parquet from settings, and the warehouse sync on Scale keeps a full copy on your side every night.",
    },
  ],
};

/* ---------- Customers ---------- */

export type Story = {
  slug: string;
  company: string;
  industry:
    | "Travel"
    | "Health"
    | "Developer tools"
    | "Education"
    | "Commerce"
    | "Fintech";
  description: string;
  size: string;
  region: string;
  plan: string;
  volume: string;
  since: number;
  headline: string;
  summary: string;
  metric: { label: string; before: number; after: number; unit: string };
  weekly: number[];
  shipWeek: number;
  challenge: string[];
  approach: string[];
  built: string[];
  quote: { text: string; name: string; role: string };
  stack: string[];
};

export const stories: Story[] = [
  {
    slug: "fernway",
    company: "Fernway",
    industry: "Travel",
    description: "Holiday rental marketplace for southern Europe",
    size: "140 people",
    region: "Lisbon",
    plan: "Scale",
    volume: "38M events / month",
    since: 2023,
    headline: "Fernway found the step that lost one booker in five.",
    summary:
      "A booking funnel broken down by platform showed Android guests abandoning at the date picker. The fix took a week.",
    metric: {
      label: "Search-to-booking conversion",
      before: 11.8,
      after: 14.4,
      unit: "%",
    },
    weekly: [
      11.6, 11.9, 11.7, 11.8, 12.0, 11.7, 11.9, 13.1, 13.8, 14.1, 14.3, 14.4,
    ],
    shipWeek: 7,
    challenge: [
      "Fernway's product team had three sources of truth for bookings: the payments database, an ad-hoc warehouse query and a dashboard nobody remembered building. Each disagreed by a few percent, and every planning meeting started with reconciling them.",
      "Conversion had been flat for two quarters. Everyone had a theory, from pricing to photography, and no one could test one without a two-week data request.",
    ],
    approach: [
      "The team instrumented eleven events with the Signal SDK in a single sprint and verified each one in the catalog with its owner. Within a week they had a five-step booking funnel that matched the payments ledger to the booking.",
      "Breaking the funnel down by platform exposed the problem immediately: on Android, 23% of guests who opened the date picker never selected a date. Session paths showed them closing the picker and leaving. A native calendar replaced the web view three days later.",
    ],
    built: [
      "Five-step booking funnel by platform",
      "Weekly retention for first-time bookers",
      "Anomaly alert on checkout_started",
      "Release annotations from GitHub",
    ],
    quote: {
      text: "We used to argue about whose spreadsheet was right. Now the funnel is the meeting agenda, and we spend the hour fixing step three instead.",
      name: "Inês Barata",
      role: "Head of Product",
    },
    stack: ["Next.js", "Kotlin", "Swift", "Postgres", "BigQuery"],
  },
  {
    slug: "tessel-health",
    company: "Tessel Health",
    industry: "Health",
    description: "Online physiotherapy appointments and home programmes",
    size: "60 people",
    region: "Manchester",
    plan: "Team",
    volume: "6M events / month",
    since: 2024,
    headline:
      "Tessel Health doubled week-four adherence without a single new feature.",
    summary:
      "Retention by first-week behaviour showed that patients who logged one exercise on day two stayed. Onboarding now makes that happen.",
    metric: {
      label: "Patients active in week 4",
      before: 21,
      after: 43,
      unit: "%",
    },
    weekly: [20, 21, 22, 21, 20, 22, 21, 27, 33, 38, 41, 43],
    shipWeek: 7,
    challenge: [
      "Tessel's clinicians knew that patients who kept doing their exercises recovered faster, but the product team could not see who was drifting away until a follow-up appointment was missed.",
      "Health data rules meant the team needed analytics that never touched clinical notes and kept everything in the UK and EU.",
    ],
    approach: [
      "Signal's EU region and cookieless mode let Tessel track behaviour with pseudonymous IDs only. The event catalog marks every property, and anything resembling clinical data is blocked at ingest.",
      "Correlated behaviours in the retention report ranked 'logged an exercise within 48 hours' far above everything else. The team moved the first exercise into the booking confirmation screen and sent a gentle reminder on day two.",
    ],
    built: [
      "Retention cohorts by referral source",
      "Correlated behaviours report",
      "Ingest rules blocking free-text properties",
    ],
    quote: {
      text: "The answer was in our data for a year. Signal was the first tool that ranked it above the noise.",
      name: "Priya Lawal",
      role: "Product Lead, Patient App",
    },
    stack: ["React Native", "Django", "Postgres"],
  },
  {
    slug: "kitebox",
    company: "Kitebox",
    industry: "Developer tools",
    description: "Hosted CI runners for small engineering teams",
    size: "32 people",
    region: "Toronto",
    plan: "Team",
    volume: "14M events / month",
    since: 2022,
    headline:
      "Kitebox cut time to first green build from two days to forty minutes.",
    summary:
      "A funnel from sign-up to first passing pipeline showed most teams stalled on YAML. A starter-config picker fixed it.",
    metric: {
      label: "Median hours to first green build",
      before: 49,
      after: 0.7,
      unit: " h",
    },
    weekly: [52, 49, 47, 50, 48, 46, 31, 12, 4, 1.4, 0.9, 0.7],
    shipWeek: 6,
    challenge: [
      "Kitebox converted well once a team had a working pipeline, but more than half of new sign-ups never got that far. The team suspected the documentation but could not prove which page lost people.",
    ],
    approach: [
      "Server-side events from the build system joined the web events through Signal's identity merge, so one funnel ran from sign-up on the website to the first successful build on the runners.",
      "Time-to-convert per step showed a cliff between 'repository connected' and 'first build started': teams opened the YAML reference and disappeared. Kitebox shipped a picker with twelve tested starter configs. Three weeks later the median dropped below an hour.",
    ],
    built: [
      "Cross-platform funnel: web to build server",
      "Time-to-convert distribution",
      "Alert on failed first builds",
    ],
    quote: {
      text: "Joining the build server events to the marketing site took an afternoon. That one funnel changed our roadmap for a quarter.",
      name: "Marcus Oyelaran",
      role: "Co-founder & CTO",
    },
    stack: ["Go", "SvelteKit", "ClickHouse"],
  },
  {
    slug: "ondine",
    company: "Ondine",
    industry: "Education",
    description: "Ten-minute language lessons for adults",
    size: "85 people",
    region: "Lyon",
    plan: "Scale",
    volume: "120M events / month",
    since: 2023,
    headline: "Ondine stopped guessing which lessons people skip.",
    summary:
      "With every lesson step tracked, the curriculum team now edits the content that loses learners, not the content they dislike in surveys.",
    metric: {
      label: "Lessons completed per learner each week",
      before: 3.1,
      after: 4.6,
      unit: "",
    },
    weekly: [3.0, 3.1, 3.2, 3.1, 3.0, 3.3, 3.5, 3.9, 4.2, 4.4, 4.5, 4.6],
    shipWeek: 5,
    challenge: [
      "Ondine's curriculum writers relied on app-store reviews and quarterly surveys to decide what to rewrite. Learners said they loved the grammar drills; the drop-off data said otherwise, but only the data team could read it.",
    ],
    approach: [
      "Ondine gave every writer a Signal seat and a dashboard per course. A funnel per lesson shows exactly which exercise loses people, and a breakdown by native language shows where the explanation does not land.",
      "The warehouse sync keeps the finance team's subscription model on the same numbers the writers see.",
    ],
    built: [
      "Lesson funnels for 240 lessons",
      "Dashboards per course with release annotations",
      "Nightly sync to Snowflake",
    ],
    quote: {
      text: "Our writers check their lesson funnels before their email now. That is a culture change I did not think a tool could make.",
      name: "Camille Dufresne",
      role: "Director of Learning",
    },
    stack: ["Flutter", "Node.js", "Snowflake"],
  },
  {
    slug: "harrow-finch",
    company: "Harrow & Finch",
    industry: "Commerce",
    description: "Outdoor clothing sold direct, made in Portugal",
    size: "45 people",
    region: "Porto",
    plan: "Team",
    volume: "9M events / month",
    since: 2024,
    headline:
      "Harrow & Finch learned that free returns sell more jackets than discounts.",
    summary:
      "Two pricing experiments, read in Signal's funnel comparison, ended a year-long debate in a fortnight.",
    metric: {
      label: "Checkout conversion",
      before: 2.4,
      after: 3.3,
      unit: "%",
    },
    weekly: [2.4, 2.3, 2.5, 2.4, 2.4, 2.6, 2.9, 3.1, 3.2, 3.3, 3.2, 3.3],
    shipWeek: 5,
    challenge: [
      "Every season the team discounted to hit targets and every season margin suffered. Customer support insisted that sizing worries, not price, held people back.",
    ],
    approach: [
      "Harrow & Finch ran two variants for two weeks: 15% off, and free returns with a size-swap promise. Signal's funnel comparison, split by variant, showed free returns converting better at every step after the product page.",
      "The team now reads every experiment the same way, with the funnel and the revenue per visitor side by side.",
    ],
    built: [
      "Checkout funnel split by experiment variant",
      "Revenue per visitor dashboard",
      "Weekly digest to the founders",
    ],
    quote: {
      text: "Two weeks of data and a funnel everyone could read ended an argument we had been having since launch.",
      name: "Tomás Reis",
      role: "Founder",
    },
    stack: ["Shopify", "Remix", "Klaviyo"],
  },
  {
    slug: "calder-pay",
    company: "Calder Pay",
    industry: "Fintech",
    description: "Invoicing and payouts for freelancers",
    size: "110 people",
    region: "Amsterdam",
    plan: "Scale",
    volume: "22M events / month",
    since: 2023,
    headline:
      "Calder Pay caught a broken payout flow eleven minutes after release.",
    summary:
      "Anomaly alerts on core events now page the on-call engineer before support sees a single ticket.",
    metric: {
      label: "Minutes to detect a broken flow",
      before: 210,
      after: 11,
      unit: " min",
    },
    weekly: [240, 190, 220, 205, 210, 60, 30, 18, 14, 12, 11, 11],
    shipWeek: 5,
    challenge: [
      "For a payments product, a silent break in the payout flow costs trust that takes months to earn back. Calder Pay's monitoring watched servers, not behaviour, so a bug that let requests succeed while showing users an error went unnoticed for an afternoon.",
    ],
    approach: [
      "The team set anomaly alerts on six core events, each learning its own weekday rhythm. Alerts go to the on-call Slack channel with a link to the chart and the release annotation that preceded it.",
      "Audit logs and SSO on the Scale plan satisfied the security review, and the warehouse sync feeds the finance reconciliation every night.",
    ],
    built: [
      "Anomaly alerts on six core events",
      "Release annotations from the deploy pipeline",
      "Audit log export for compliance",
    ],
    quote: {
      text: "Signal is the first analytics tool our on-call rota actually wanted. It tells us when users are hurting, not just when CPUs are.",
      name: "Daan Verhoeven",
      role: "Engineering Manager, Payouts",
    },
    stack: ["Kotlin", "React", "Kafka", "Snowflake"],
  },
];

export const customers = {
  title: "Customers",
  heading: "Teams that stopped guessing.",
  intro:
    "How product teams in travel, health, education and finance use Signal to find the step that matters and prove the fix worked.",
  closeTitle: "Want to see your own funnel like this?",
  story: {
    problem: "The problem",
    changed: "What changed",
    built: "What they built in Signal",
    more: "More stories",
    closeTitle: "Find your step three.",
    closeText:
      "Bring the metric you are stuck on to a 30-minute demo, or poke around the demo workspace first.",
  },
};

export const changelogPage = {
  title: "Changelog",
  heading: "What shipped, and when.",
  intro:
    "Every change to Signal, newest first. We release on Tuesdays and Thursdays, and fix things whenever they break.",
};

/* ---------- Changelog ---------- */

export type ChangeTag = "New" | "Improved" | "Fixed";

export const changelog: {
  version: string;
  date: string;
  title: string;
  tag: ChangeTag;
  body: string;
  items: string[];
}[] = [
  {
    version: "4.12",
    date: "Oct 14, 2026",
    title: "Correlated behaviours in retention",
    tag: "New",
    body: "Retention reports now rank the first-week actions that best predict who comes back, with lift and sample size for each.",
    items: [
      "Choose the window: first day, first 3 days or first week",
      "Exclude obvious events like page_viewed with one click",
      "Export the ranking as CSV",
    ],
  },
  {
    version: "4.11",
    date: "Oct 2, 2026",
    title: "Funnel breakdowns up to 50 segments",
    tag: "Improved",
    body: "Breakdowns used to stop at ten values. They now go to fifty, with the long tail grouped as 'Other' so charts stay readable.",
    items: [
      "Sort segments by conversion or by volume",
      "Pin a segment to compare it against the rest",
    ],
  },
  {
    version: "4.10.2",
    date: "Sep 26, 2026",
    title: "Timezone edge cases on daily charts",
    tag: "Fixed",
    body: "Workspaces set to a timezone with a half-hour offset no longer show a missing bucket at the daylight-saving change.",
    items: [
      "Affected: Adelaide, Kolkata, St. John's and others",
      "Historical charts recomputed automatically",
    ],
  },
  {
    version: "4.10",
    date: "Sep 18, 2026",
    title: "Release annotations from GitHub",
    tag: "New",
    body: "Connect a repository and every release tag appears as a marker on your charts, so the line and the change sit together.",
    items: [
      "Filter annotations by repository",
      "Add manual annotations for campaigns and outages",
    ],
  },
  {
    version: "4.9",
    date: "Sep 4, 2026",
    title: "Faster event catalog search",
    tag: "Improved",
    body: "Catalog search now matches property names and descriptions, and returns results as you type in workspaces with 5,000+ events.",
    items: [
      "Keyboard shortcut / focuses search",
      "Filters persist when you open an event and come back",
    ],
  },
  {
    version: "4.8.1",
    date: "Aug 21, 2026",
    title: "CSV exports with non-Latin characters",
    tag: "Fixed",
    body: "Exports now include a UTF-8 byte-order mark so spreadsheet apps open Japanese, Greek and Arabic event properties correctly.",
    items: [],
  },
  {
    version: "4.8",
    date: "Aug 7, 2026",
    title: "Anomaly alerts learn weekly rhythm",
    tag: "Improved",
    body: "Alerts now model weekday and weekend patterns separately, which cut false alarms on Saturdays by roughly two thirds in our own workspace.",
    items: [
      "Sensitivity slider per alert",
      "Snooze for 1 hour, 1 day or until next release",
    ],
  },
];

/* ---------- Docs teaser ---------- */

export const docs = {
  title: "Docs",
  heading: "From npm install to first funnel in ten minutes.",
  intro:
    "The full documentation lives inside the product. Here is enough to judge whether Signal fits your stack.",
  sdks: [
    {
      id: "web",
      label: "JavaScript",
      install: "npm install @signal/web",
      code: `import { signal } from "@signal/web";

signal.init("sg_live_4f9c…", { region: "eu" });

// after sign-in
signal.identify(user.id, { plan: "plus" });

// anywhere
signal.track("booking_confirmed", {
  revenue: 512.4,
  nights: 3,
});`,
    },
    {
      id: "swift",
      label: "Swift",
      install: '.package(url: "https://github.com/", from: "3.2.0")',
      code: `import SignalKit

Signal.configure(key: "sg_live_4f9c…", region: .eu)

Signal.identify(user.id, properties: ["plan": "plus"])

Signal.track("booking_confirmed", properties: [
  "revenue": 512.4,
  "nights": 3,
])`,
    },
    {
      id: "python",
      label: "Python",
      install: "pip install signal-analytics",
      code: `from signal_analytics import Signal

signal = Signal("sg_live_4f9c…", region="eu")

signal.track(
    user_id=user.id,
    event="booking_confirmed",
    properties={"revenue": 512.4, "nights": 3},
)`,
    },
    {
      id: "http",
      label: "HTTP",
      install: "POST https://eu.ingest.signal.example/v1/batch",
      code: `curl https://eu.ingest.signal.example/v1/batch \\
  -H "Authorization: Bearer sg_live_4f9c…" \\
  -d '{"events": [{
        "event": "booking_confirmed",
        "user_id": "u_88213",
        "properties": {"revenue": 512.4}
      }]}'`,
    },
  ],
  guides: [
    {
      title: "Plan your first ten events",
      text: "A worksheet for naming events and properties so they still make sense in a year.",
      minutes: 8,
    },
    {
      title: "Identify users across devices",
      text: "When to call identify, how anonymous IDs merge, and what never to put in a user ID.",
      minutes: 6,
    },
    {
      title: "Build a funnel that matches finance",
      text: "Strict ordering, conversion windows and exclusion steps, with a worked checkout example.",
      minutes: 12,
    },
    {
      title: "Read a retention grid",
      text: "Cohorts, brackets and the diagonal: what each pattern usually means.",
      minutes: 7,
    },
    {
      title: "Send server-side events",
      text: "Batching, retries, idempotency keys and the clock-skew rules.",
      minutes: 9,
    },
    {
      title: "Sync to your warehouse",
      text: "Table layout, partitioning and the nightly job's guarantees.",
      minutes: 10,
    },
  ],
  guidesTitle: "Guides",
  guidesText:
    "Short, opinionated and tested against the current SDKs. The full set opens after you sign in.",
  apiTitle: "HTTP API at a glance",
  closeTitle: "The rest of the docs live next to your data.",
  api: [
    {
      method: "POST",
      path: "/v1/batch",
      text: "Send up to 500 events in one request.",
    },
    {
      method: "POST",
      path: "/v1/identify",
      text: "Attach properties to a person.",
    },
    {
      method: "GET",
      path: "/v1/query",
      text: "Run a saved insight and get JSON back.",
    },
    {
      method: "DELETE",
      path: "/v1/people/:id",
      text: "Erase a person across every event.",
    },
  ],
};

/* ---------- About ---------- */

export const about = {
  title: "Company",
  heading: "We build the tool we wished we had at 2 a.m. after a bad release.",
  story: [
    "Signal started in 2021 in a Lisbon flat, after Ana and Jonah spent a year at a travel startup arguing about numbers that should not have been arguable. The analytics tools they could afford were built for marketers; the ones built for product teams needed a data engineer to run.",
    "We set out to make product analytics that a designer, a PM and an engineer can all read the same way, that respects the people being measured, and that prices on data rather than headcount, so nobody has to ration seats.",
    "Today Signal is 48 people across Lisbon, Toronto and wherever our remote team prefers. We are profitable, independent and in no hurry to change either.",
  ],
  principles: [
    {
      title: "Every chart answers a question.",
      text: "If we cannot say what decision a chart helps with, it does not ship.",
    },
    {
      title: "Measure behaviour, not people.",
      text: "No fingerprinting, no selling data, no dark patterns in our own product.",
    },
    {
      title: "Price on data, not seats.",
      text: "Analytics only works when the whole team can look.",
    },
    {
      title: "Numbers have owners.",
      text: "An event without an owner and a description is a rumour.",
    },
  ],
  timeline: [
    {
      year: "2021",
      text: "Ana Lacerda and Jonah Reyes start Signal with a funnel prototype and three design partners.",
    },
    {
      year: "2022",
      text: "Public launch. Event catalog ships; Kitebox becomes the 100th paying team.",
    },
    {
      year: "2023",
      text: "Toronto office opens. EU and US regions, cookieless mode and warehouse sync.",
    },
    {
      year: "2025",
      text: "Anomaly alerts and release annotations. 2,000 teams, profitable for the first full year.",
    },
    {
      year: "2026",
      text: "Correlated behaviours in retention, and a public status page for every region.",
    },
  ],
  team: [
    { name: "Ana Lacerda", role: "Co-founder, CEO", place: "Lisbon" },
    { name: "Jonah Reyes", role: "Co-founder, CTO", place: "Toronto" },
    { name: "Mei Tanaka", role: "Head of Design", place: "Remote, Osaka" },
    { name: "Kwame Asante", role: "Query engine lead", place: "Lisbon" },
    {
      name: "Sofia Brandt",
      role: "Head of Customer Success",
      place: "Remote, Hamburg",
    },
    { name: "Rui Moreira", role: "Ingest & infrastructure", place: "Lisbon" },
    {
      name: "Hannah Okafor",
      role: "Product manager, Insights",
      place: "Toronto",
    },
    {
      name: "Leo Castellanos",
      role: "Developer advocate",
      place: "Remote, Valencia",
    },
  ],
  storyTitle: "Why Signal exists",
  principlesTitle: "What we hold ourselves to",
  timelineTitle: "Five years, briefly",
  teamTitle: "Some of the 48 people behind it",
  rolesTitle: "Open roles",
  rolesText:
    "We hire slowly and pay the same band for the same role wherever you live. Send a short note and something you made to",
  roles: [
    {
      title: "Senior Engineer, Query Engine",
      team: "Engineering",
      place: "Lisbon or remote (EU)",
    },
    {
      title: "Product Designer, Dashboards",
      team: "Design",
      place: "Toronto or remote (Americas)",
    },
    {
      title: "Support Engineer",
      team: "Customer Success",
      place: "Remote (EU)",
    },
    {
      title: "Technical Writer",
      team: "Developer Experience",
      place: "Remote",
    },
  ],
};

/* ---------- Book a demo ---------- */

export const demo = {
  title: "Book a demo",
  heading: "See Signal on your own questions.",
  intro:
    "Thirty minutes with a product specialist. Bring the metric you are stuck on; we will show you how to answer it in Signal, live.",
  expect: [
    "A short look at your current tracking and the questions you can not answer yet",
    "A live build of one funnel or retention report on our demo data",
    "Honest advice on plan and volume, including when Free is enough",
  ],
  teamSizes: ["1–10", "11–50", "51–200", "201–1,000", "1,000+"],
  volumes: [
    "Under 1M events / month",
    "1–10M",
    "10–100M",
    "100M–1B",
    "Over 1B",
    "Not sure yet",
  ],
  success:
    "Thanks. A product specialist will email you within one business day to pick a time.",
  note: "Demo form: nothing is sent anywhere.",
  expectTitle: "What the half hour covers",
  writeTitle: "Rather write?",
  hours: "Weekdays 9:00–18:00 Lisbon time",
};

export const signin = {
  title: "Sign in",
  heading: "Sign in to Signal",
  note: "Demo sign-in: any valid email and an 8+ character password open the demo workspace.",
};

/* ---------- App demo ---------- */

export const app = {
  workspace: "Fernway",
  environment: "Production",
  user: { name: "Inês Barata", initials: "IB", email: "ines@fernway.example" },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/funnels", label: "Funnels" },
    { to: "/app/events", label: "Events" },
    { to: "/app/settings", label: "Settings" },
  ],
  metrics: [
    {
      id: "users",
      label: "Daily active users",
      base: 88_000,
      format: "count",
      agg: "mean",
    },
    {
      id: "bookings",
      label: "Bookings",
      base: 1_480,
      format: "count",
      agg: "sum",
    },
    {
      id: "conversion",
      label: "Search to booking",
      base: 14.2,
      format: "percent",
      agg: "mean",
    },
    {
      id: "revenue",
      label: "Booking revenue",
      base: 742_000,
      format: "money",
      agg: "sum",
    },
  ] as {
    id: string;
    label: string;
    base: number;
    format: "count" | "percent" | "money";
    agg: "sum" | "mean";
  }[],
  sources: [
    { label: "Organic search", value: 41.2 },
    { label: "Direct", value: 22.8 },
    { label: "Price comparison sites", value: 14.5 },
    { label: "Email", value: 9.6 },
    { label: "Paid social", value: 7.3 },
    { label: "Referral", value: 4.6 },
  ],
  pages: [
    { path: "/", views: 812_440, change: 4.1 },
    { path: "/search", views: 655_201, change: 8.7 },
    { path: "/stays/lisbon", views: 188_930, change: 12.4 },
    { path: "/stays/porto", views: 141_076, change: 9.9 },
    { path: "/checkout", views: 96_402, change: 4.4 },
    { path: "/stays/seville", views: 88_215, change: -3.2 },
  ],
  annotations: [{ daysAgo: 9, label: "v8.4 — native date picker (Android)" }],
  funnels: [
    {
      id: "booking",
      name: "Search to booking",
      steps: bookingFunnel.map((s) => s.event),
    },
    {
      id: "signup",
      name: "Visitor to signup",
      steps: ["page_viewed", "search_performed", "signup_completed"],
    },
    {
      id: "loyalty",
      name: "Booking to review",
      steps: ["booking_confirmed", "review_posted"],
    },
  ],
  windows: [
    { id: "1h", label: "1 hour", factor: 0.62 },
    { id: "1d", label: "1 day", factor: 0.84 },
    { id: "7d", label: "7 days", factor: 1 },
    { id: "30d", label: "30 days", factor: 1.09 },
  ],
  platforms: [
    { id: "all", label: "All platforms", share: 1, bias: 1 },
    { id: "web", label: "Web", share: 0.52, bias: 1.04 },
    { id: "ios", label: "iOS", share: 0.31, bias: 1.02 },
    { id: "android", label: "Android", share: 0.17, bias: 0.86 },
  ],
  team: [
    { name: "Inês Barata", email: "ines@fernway.example", role: "Admin" },
    { name: "Miguel Sousa", email: "miguel@fernway.example", role: "Editor" },
    { name: "Clara Nogueira", email: "clara@fernway.example", role: "Editor" },
    { name: "Ravi Menon", email: "ravi@fernway.example", role: "Viewer" },
  ] as { name: string; email: string; role: "Admin" | "Editor" | "Viewer" }[],
  timezones: [
    "Europe/Lisbon",
    "Europe/Madrid",
    "Europe/London",
    "America/New_York",
    "America/Toronto",
    "Asia/Tokyo",
  ],
  retention: ["1 year", "3 years", "Unlimited"],
  apiKey: "sg_live_4f9c2e7a81d04b6c9e3f",
  notifications: [
    {
      id: "digest",
      label: "Weekly digest",
      text: "Monday 08:00, top changes across pinned dashboards.",
      on: true,
    },
    {
      id: "anomaly",
      label: "Anomaly alerts",
      text: "When a verified event leaves its expected range.",
      on: true,
    },
    {
      id: "releases",
      label: "Release annotations",
      text: "Add a marker to charts for every GitHub release tag.",
      on: false,
    },
  ],
};

export const notFound = {
  title: "Page not found",
  heading: "No events match that path.",
  text: "The page you asked for does not exist, or it was renamed. Try one of these instead.",
};
