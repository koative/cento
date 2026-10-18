/* All copy and demo data for Cipher. Rebranding the template means editing this file. */

export const brand = {
  name: "Cipher",
  sector: "Identity security",
  tagline: "Trust is a decision. Make it a clear one.",
  email: "hello@cipher.example",
  sales: "sales@cipher.example",
  security: "security@cipher.example",
  careers: "careers@cipher.example",
  phone: "+1 555 0138 2210",
  address: [
    "Cipher Security, Inc.",
    "410 Harbor Row, Suite 6",
    "Portland, OR 97209",
  ],
  gallery: "https://cento.koative.com/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/platform", label: "Platform" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/trust", label: "Trust center" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "Company" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { to: "/platform", label: "Platform" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
      { to: "/app", label: "Demo workspace" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { to: "/solutions", label: "All solutions" },
      { to: "/solutions/soc2-access-reviews", label: "SOC 2 access reviews" },
      {
        to: "/solutions/joiners-movers-leavers",
        label: "Joiners, movers, leavers",
      },
      { to: "/solutions/privileged-access", label: "Privileged access" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About & careers" },
      { to: "/trust", label: "Trust center" },
      { to: "/demo", label: "Request a demo" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ---------- Demo workspace data (shared by the home widget and /app) ---------- */

export type Risk = "high" | "medium" | "low";
export const riskLabel: Record<Risk, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export type Identity = {
  id: string;
  name: string;
  initials: string;
  title: string;
  dept: string;
  manager: string;
  kind: "Employee" | "Contractor" | "Service account" | "Former employee";
  location: string;
  lastActive: string;
  started: string;
  history: { date: string; text: string }[];
};

export type Grant = {
  id: string;
  identity: string;
  system: string;
  permission: string;
  via: string;
  risk: Risk;
  reason: string;
  lastUsedDays: number;
  granted: string;
  source: string;
};

export const identities: Identity[] = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    initials: "AM",
    title: "Staff engineer",
    dept: "Platform",
    manager: "Mei Chen",
    kind: "Employee",
    location: "Portland",
    lastActive: "2 days ago",
    started: "Feb 2022",
    history: [
      {
        date: "Mar 4, 2025",
        text: "Added to platform-oncall for the database migration.",
      },
      {
        date: "Jul 15, 2025",
        text: "Migration finished; on-call rotation handed to the SRE team.",
      },
      { date: "Jul 16, 2026", text: "Last cluster-admin session." },
    ],
  },
  {
    id: "taylor-kim",
    name: "Taylor Kim",
    initials: "TK",
    title: "Finance analyst",
    dept: "Finance",
    manager: "Grace Oyelaran",
    kind: "Employee",
    location: "Portland",
    lastActive: "Today",
    started: "Jan 2024",
    history: [
      {
        date: "Sep 2, 2026",
        text: "Refund approver granted for quarter close (ticket FIN-2291).",
      },
      { date: "Sep 27, 2026", text: "Last refund approved." },
      {
        date: "Sep 30, 2026",
        text: "Planned end date of the temporary grant passed. Access still active.",
      },
    ],
  },
  {
    id: "sam-rivera",
    name: "Sam Rivera",
    initials: "SR",
    title: "Product designer",
    dept: "Design",
    manager: "Lena Fogarty",
    kind: "Employee",
    location: "Remote, Denver",
    lastActive: "Today",
    started: "Jun 2023",
    history: [
      {
        date: "Jun 12, 2023",
        text: "Joined Design; standard design-team access.",
      },
      {
        date: "Jul 8, 2026",
        text: "Worked on the website refresh through web-guild.",
      },
    ],
  },
  {
    id: "priya-natarajan",
    name: "Priya Natarajan",
    initials: "PN",
    title: "Account executive",
    dept: "Sales",
    manager: "Marcus Bell",
    kind: "Employee",
    location: "Rotterdam",
    lastActive: "Yesterday",
    started: "Apr 2022",
    history: [
      { date: "Apr 4, 2022", text: "Joined Support as a tier-one agent." },
      {
        date: "Aug 12, 2026",
        text: "Moved to Sales. HR record updated; app access unchanged.",
      },
      { date: "Sep 8, 2026", text: "Last ticket handled in the support desk." },
    ],
  },
  {
    id: "jordan-ellis",
    name: "Jordan Ellis",
    initials: "JE",
    title: "Data engineer (contract)",
    dept: "Data",
    manager: "Mei Chen",
    kind: "Contractor",
    location: "Remote, Austin",
    lastActive: "15 days ago",
    started: "Mar 2026",
    history: [
      {
        date: "Mar 9, 2026",
        text: "Contract started through Brightline Staffing.",
      },
      {
        date: "Oct 3, 2026",
        text: "Contract end date. Account still enabled.",
      },
    ],
  },
  {
    id: "mei-chen",
    name: "Mei Chen",
    initials: "MC",
    title: "Engineering manager",
    dept: "Platform",
    manager: "Dana Whitfield",
    kind: "Employee",
    location: "Portland",
    lastActive: "Today",
    started: "Sep 2020",
    history: [
      {
        date: "Jan 6, 2025",
        text: "Promoted to engineering manager; eng-manager role applied.",
      },
    ],
  },
  {
    id: "rafael-ortiz",
    name: "Rafael Ortiz",
    initials: "RO",
    title: "Support lead",
    dept: "Support",
    manager: "Ines Moreau",
    kind: "Employee",
    location: "Rotterdam",
    lastActive: "Today",
    started: "Nov 2021",
    history: [
      {
        date: "Feb 1, 2024",
        text: "Became support lead; support-lead role applied.",
      },
      { date: "Aug 17, 2026", text: "Last opened the billing console." },
    ],
  },
  {
    id: "hannah-brooks",
    name: "Hannah Brooks",
    initials: "HB",
    title: "Payroll specialist",
    dept: "People",
    manager: "Grace Oyelaran",
    kind: "Employee",
    location: "Portland",
    lastActive: "Today",
    started: "May 2023",
    history: [
      {
        date: "May 15, 2023",
        text: "Joined People operations with payroll admin.",
      },
      {
        date: "Jun 3, 2026",
        text: "Added to finance-ops to cover a leave of absence.",
      },
    ],
  },
  {
    id: "deploy-bot",
    name: "deploy-bot",
    initials: "DB",
    title: "Deployment service account",
    dept: "Platform",
    manager: "Mei Chen",
    kind: "Service account",
    location: "Production",
    lastActive: "4 minutes ago",
    started: "Sep 2025",
    history: [
      {
        date: "Sep 1, 2025",
        text: "Token issued with repository admin to unblock a release.",
      },
      {
        date: "Sep 1, 2026",
        text: "Token passed the 365-day rotation policy.",
      },
    ],
  },
  {
    id: "omar-haddad",
    name: "Omar Haddad",
    initials: "OH",
    title: "Security engineer",
    dept: "Security",
    manager: "Dana Whitfield",
    kind: "Employee",
    location: "Portland",
    lastActive: "Today",
    started: "Aug 2024",
    history: [
      {
        date: "Oct 9, 2026",
        text: "Used break-glass superuser during incident INC-0412.",
      },
    ],
  },
  {
    id: "lucy-abara",
    name: "Lucy Abara",
    initials: "LA",
    title: "Marketing manager",
    dept: "Marketing",
    manager: "Marcus Bell",
    kind: "Employee",
    location: "Remote, Atlanta",
    lastActive: "Today",
    started: "Oct 2023",
    history: [
      {
        date: "Jul 21, 2026",
        text: "analytics-readers group widened from one schema to all schemas.",
      },
    ],
  },
  {
    id: "noah-lindqvist",
    name: "Noah Lindqvist",
    initials: "NL",
    title: "Sales engineer (left Sep 19)",
    dept: "Sales",
    manager: "Marcus Bell",
    kind: "Former employee",
    location: "Rotterdam",
    lastActive: "27 days ago",
    started: "Jan 2023",
    history: [
      {
        date: "Sep 19, 2026",
        text: "Last day. Identity provider account disabled.",
      },
      {
        date: "Sep 21, 2026",
        text: "Personal access token used from an unmanaged device.",
      },
    ],
  },
  {
    id: "grace-oyelaran",
    name: "Grace Oyelaran",
    initials: "GO",
    title: "Controller",
    dept: "Finance",
    manager: "Dana Whitfield",
    kind: "Employee",
    location: "Portland",
    lastActive: "Today",
    started: "Mar 2021",
    history: [
      {
        date: "Mar 1, 2021",
        text: "Joined as controller; controller role applied.",
      },
    ],
  },
  {
    id: "ben-castillo",
    name: "Ben Castillo",
    initials: "BC",
    title: "Backend engineer",
    dept: "Platform",
    manager: "Mei Chen",
    kind: "Employee",
    location: "Remote, Chicago",
    lastActive: "Yesterday",
    started: "Aug 2025",
    history: [
      {
        date: "Jun 10, 2026",
        text: "Direct warehouse grant for the orders migration.",
      },
      { date: "Jul 11, 2026", text: "Last warehouse query." },
    ],
  },
];

export const grants: Grant[] = [
  {
    id: "g01",
    identity: "alex-morgan",
    system: "Production cluster",
    permission: "Cluster admin",
    via: "Group · platform-oncall",
    risk: "high",
    reason:
      "Admin rights unused for 94 days. The on-call rotation that needed them ended in July 2025.",
    lastUsedDays: 94,
    granted: "Mar 4, 2025",
    source: "Group membership",
  },
  {
    id: "g02",
    identity: "taylor-kim",
    system: "Billing console",
    permission: "Refund approver",
    via: "Direct grant",
    risk: "high",
    reason:
      "Temporary access for quarter close was due to end on Sep 30. It is still active.",
    lastUsedDays: 21,
    granted: "Sep 2, 2026",
    source: "Ticket FIN-2291",
  },
  {
    id: "g03",
    identity: "sam-rivera",
    system: "Design library",
    permission: "Editor",
    via: "Group · design-team",
    risk: "low",
    reason: "Used daily and matches the current project assignment.",
    lastUsedDays: 0,
    granted: "Jun 12, 2023",
    source: "Group membership",
  },
  {
    id: "g04",
    identity: "priya-natarajan",
    system: "Support desk",
    permission: "Agent",
    via: "Group · support-tier1",
    risk: "medium",
    reason: "Moved from Support to Sales on Aug 12. The access moved with her.",
    lastUsedDays: 40,
    granted: "Apr 4, 2022",
    source: "Group membership",
  },
  {
    id: "g05",
    identity: "jordan-ellis",
    system: "Customer data warehouse",
    permission: "Read all schemas",
    via: "Direct grant",
    risk: "high",
    reason: "Contract ended on Oct 3 and the account is still enabled.",
    lastUsedDays: 15,
    granted: "Mar 9, 2026",
    source: "Ticket DATA-118",
  },
  {
    id: "g06",
    identity: "jordan-ellis",
    system: "Source repository",
    permission: "Write",
    via: "Group · data-eng",
    risk: "high",
    reason:
      "Contract ended on Oct 3. Write access to the pipeline repository remains.",
    lastUsedDays: 16,
    granted: "Mar 9, 2026",
    source: "Group membership",
  },
  {
    id: "g07",
    identity: "mei-chen",
    system: "Production cluster",
    permission: "Namespace admin",
    via: "Role · eng-manager",
    risk: "low",
    reason: "Used weekly; matches the engineering manager role.",
    lastUsedDays: 3,
    granted: "Jan 6, 2025",
    source: "Role assignment",
  },
  {
    id: "g08",
    identity: "rafael-ortiz",
    system: "Support desk",
    permission: "Admin",
    via: "Role · support-lead",
    risk: "low",
    reason: "Used daily; matches the support lead role.",
    lastUsedDays: 0,
    granted: "Feb 1, 2024",
    source: "Role assignment",
  },
  {
    id: "g09",
    identity: "rafael-ortiz",
    system: "Billing console",
    permission: "Read only",
    via: "Group · support-tier2",
    risk: "medium",
    reason:
      "Shows card metadata. Not opened in 62 days; refunds now go through Finance.",
    lastUsedDays: 62,
    granted: "Feb 1, 2024",
    source: "Group membership",
  },
  {
    id: "g10",
    identity: "hannah-brooks",
    system: "Payroll",
    permission: "Payroll admin",
    via: "Direct grant",
    risk: "low",
    reason: "Matches the role and is used on every pay run.",
    lastUsedDays: 4,
    granted: "May 15, 2023",
    source: "HR onboarding",
  },
  {
    id: "g11",
    identity: "hannah-brooks",
    system: "Finance ledger",
    permission: "Post journal entries",
    via: "Group · finance-ops",
    risk: "medium",
    reason:
      "Can both run payroll and post journal entries: a segregation-of-duties conflict.",
    lastUsedDays: 30,
    granted: "Jun 3, 2026",
    source: "Group membership",
  },
  {
    id: "g12",
    identity: "deploy-bot",
    system: "Production cluster",
    permission: "Deployer",
    via: "Service token",
    risk: "medium",
    reason:
      "Token is 412 days old. Policy rotates service tokens every 365 days.",
    lastUsedDays: 0,
    granted: "Sep 1, 2025",
    source: "Service token",
  },
  {
    id: "g13",
    identity: "deploy-bot",
    system: "Source repository",
    permission: "Admin",
    via: "Service token",
    risk: "high",
    reason: "Holds repository admin. Deploys only need read and status checks.",
    lastUsedDays: 0,
    granted: "Sep 1, 2025",
    source: "Service token",
  },
  {
    id: "g14",
    identity: "omar-haddad",
    system: "Admin panel",
    permission: "Superuser",
    via: "Role · security",
    risk: "low",
    reason:
      "Break-glass owner; last used during incident INC-0412 with a logged reason.",
    lastUsedDays: 9,
    granted: "Aug 19, 2024",
    source: "Role assignment",
  },
  {
    id: "g15",
    identity: "lucy-abara",
    system: "Website CMS",
    permission: "Publisher",
    via: "Group · marketing",
    risk: "low",
    reason: "Used most days; matches the marketing role.",
    lastUsedDays: 2,
    granted: "Oct 2, 2023",
    source: "Group membership",
  },
  {
    id: "g16",
    identity: "lucy-abara",
    system: "Customer data warehouse",
    permission: "Read all schemas",
    via: "Group · analytics-readers",
    risk: "medium",
    reason:
      "The group was widened in July from the marketing schema to every schema.",
    lastUsedDays: 12,
    granted: "Jul 21, 2026",
    source: "Group membership",
  },
  {
    id: "g17",
    identity: "noah-lindqvist",
    system: "Source repository",
    permission: "Read",
    via: "Personal access token",
    risk: "high",
    reason:
      "Left the company on Sep 19. A personal token was used two days later.",
    lastUsedDays: 27,
    granted: "Jan 9, 2023",
    source: "Personal token",
  },
  {
    id: "g18",
    identity: "noah-lindqvist",
    system: "Support desk",
    permission: "Agent",
    via: "Group · sales-eng",
    risk: "high",
    reason: "Left the company on Sep 19. The seat is still active and billed.",
    lastUsedDays: 30,
    granted: "Jan 9, 2023",
    source: "Group membership",
  },
  {
    id: "g19",
    identity: "grace-oyelaran",
    system: "Finance ledger",
    permission: "Approver",
    via: "Role · controller",
    risk: "low",
    reason: "Matches the controller role.",
    lastUsedDays: 1,
    granted: "Mar 1, 2021",
    source: "Role assignment",
  },
  {
    id: "g20",
    identity: "grace-oyelaran",
    system: "Billing console",
    permission: "Refund approver",
    via: "Role · controller",
    risk: "low",
    reason: "Matches the controller role; second approver on large refunds.",
    lastUsedDays: 6,
    granted: "Mar 1, 2021",
    source: "Role assignment",
  },
  {
    id: "g21",
    identity: "ben-castillo",
    system: "Production cluster",
    permission: "Read only",
    via: "Group · platform",
    risk: "low",
    reason: "Used daily; matches the backend role.",
    lastUsedDays: 1,
    granted: "Aug 4, 2025",
    source: "Group membership",
  },
  {
    id: "g22",
    identity: "ben-castillo",
    system: "Customer data warehouse",
    permission: "Read all schemas",
    via: "Direct grant",
    risk: "medium",
    reason: "Granted for a one-off migration in June. Not used since July 11.",
    lastUsedDays: 98,
    granted: "Jun 10, 2026",
    source: "Ticket DATA-131",
  },
  {
    id: "g23",
    identity: "alex-morgan",
    system: "Source repository",
    permission: "Maintainer",
    via: "Group · platform",
    risk: "low",
    reason: "Used daily; matches the staff engineer role.",
    lastUsedDays: 0,
    granted: "Feb 14, 2022",
    source: "Group membership",
  },
  {
    id: "g24",
    identity: "taylor-kim",
    system: "Finance ledger",
    permission: "Post journal entries",
    via: "Group · finance-ops",
    risk: "low",
    reason: "Matches the analyst role.",
    lastUsedDays: 2,
    granted: "Jan 8, 2024",
    source: "Group membership",
  },
  {
    id: "g25",
    identity: "priya-natarajan",
    system: "Sales CRM",
    permission: "Editor",
    via: "Group · sales",
    risk: "low",
    reason: "Matches the account executive role.",
    lastUsedDays: 1,
    granted: "Aug 12, 2026",
    source: "Group membership",
  },
  {
    id: "g26",
    identity: "sam-rivera",
    system: "Website CMS",
    permission: "Editor",
    via: "Group · web-guild",
    risk: "medium",
    reason: "Not used in 70 days, since the website refresh shipped.",
    lastUsedDays: 70,
    granted: "May 2, 2026",
    source: "Group membership",
  },
];

/** The four grants the home page review widget walks through. */
export const homeReview = ["g01", "g05", "g04", "g03"];

export const app = {
  workspace: "Alder Logistics",
  campaign: "Q4 2026 user access review",
  framework: "SOC 2 · CC6.2, CC6.3",
  due: "Nov 14, 2026",
  daysLeft: 27,
  reviewer: {
    name: "Dana Whitfield",
    initials: "DW",
    email: "dana@alder.example",
    title: "VP Engineering",
  },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/review", label: "Review queue" },
    { to: "/app/identities", label: "Identities" },
    { to: "/app/settings", label: "Settings" },
  ],
  revokeReasons: [
    "No longer needed for the role",
    "Left the company",
    "Temporary access expired",
    "Segregation-of-duties conflict",
    "Should be read-only",
  ],
  /** Open grants at the start of each of the last 12 weeks (illustrative). */
  openGrants: [412, 405, 409, 396, 388, 371, 364, 350, 342, 331, 318, 306],
  weeks: [
    "Jul 27",
    "Aug 3",
    "Aug 10",
    "Aug 17",
    "Aug 24",
    "Aug 31",
    "Sep 7",
    "Sep 14",
    "Sep 21",
    "Sep 28",
    "Oct 5",
    "Oct 12",
  ],
  upcoming: [
    {
      name: "Privileged access, monthly",
      date: "Nov 1, 2026",
      scope: "38 grants · 6 systems",
    },
    {
      name: "Contractors, monthly",
      date: "Nov 3, 2026",
      scope: "21 grants · 4 vendors",
    },
    {
      name: "Finance SoD, quarterly",
      date: "Jan 12, 2027",
      scope: "64 grants · 3 systems",
    },
  ],
  settings: {
    cadence: ["Monthly", "Quarterly", "Twice a year"],
    escalation: ["After 3 days", "After 7 days", "After 14 days"],
    toggles: [
      {
        id: "autoRevoke",
        label: "Revoke automatically when a decision is final",
        hint: "Cipher removes the grant through the connector and verifies it on the next sync.",
        on: true,
      },
      {
        id: "leaverHold",
        label: "Flag leavers within one hour of the HR change",
        hint: "Leaver grants skip the queue and go straight to the security on-call.",
        on: true,
      },
      {
        id: "selfReview",
        label: "Block self-review",
        hint: "Nobody can approve their own access, including managers.",
        on: true,
      },
      {
        id: "digest",
        label: "Send reviewers a weekly digest",
        hint: "One email on Monday morning with what is still open.",
        on: false,
      },
    ],
  },
};

/* ---------- Home ---------- */

export const home = {
  title: "Cipher — Identity security and access reviews",
  heroTitle: ["Trust is a decision.", "Make it a clear one."],
  heroLede:
    "Cipher shows every reviewer who has access, how they got it and whether they still use it, then removes what nobody needs and files the evidence your auditor asks for.",
  heroNote:
    "Try a review: four real-looking grants from the Alder Logistics demo workspace.",
  drift: {
    title: "Access drifts. Quietly.",
    text: "Nobody hands out too much access on purpose. It arrives one reasonable request at a time and never leaves. Here is one engineer's last eighteen months.",
    events: [
      {
        date: "Feb 2025",
        label: "Joins Platform",
        grants: ["Source repository", "Production cluster · read"],
      },
      {
        date: "Mar 2025",
        label: "Database migration",
        grants: ["Cluster admin", "Data warehouse · all"],
      },
      { date: "Jul 2025", label: "Migration ships", grants: [] },
      {
        date: "Jan 2026",
        label: "Covers Data on-call",
        grants: ["Pipeline repository · write"],
      },
      { date: "Today", label: "Staff engineer", grants: [] },
    ],
    footnote:
      "Five grants in, none out. Cipher reads that history from your identity provider, HR system and app logs, and asks the right person about it.",
  },
  loop: {
    title: "One loop, run every quarter without a spreadsheet",
    steps: [
      {
        name: "Discover",
        text: "Connect your identity provider, HR system and the apps behind them. Cipher builds one graph of people, groups, roles and permissions.",
        to: "/platform",
      },
      {
        name: "Decide",
        text: "Each grant arrives with the context to judge it: how it was granted, when it was last used, what changed since.",
        to: "/platform",
      },
      {
        name: "Revoke",
        text: "A revoke decision removes the grant through the connector or opens a ticket, then checks it is actually gone.",
        to: "/platform",
      },
      {
        name: "Prove",
        text: "Every decision is signed, timestamped and packed into evidence mapped to the control your auditor is testing.",
        to: "/platform",
      },
    ],
  },
  quote: {
    text: "Our last audit asked for the user access review and we sent a link instead of a zip of screenshots. The auditor closed the request the same afternoon.",
    name: "Ines Moreau",
    role: "Head of IT, Alder Logistics (demo customer)",
  },
  solutionsTitle: "Built for the reviews you already owe",
  evidence: {
    title: "Evidence, not screenshots",
    text: "When a campaign closes, Cipher seals it. The pack holds every grant in scope, every decision with its reviewer and reason, and proof that each revocation landed.",
    items: [
      "Population: every identity and grant in scope, with the source system it came from",
      "Decisions: reviewer, timestamp, reason, and who delegated what",
      "Remediation: the change made in each system and the sync that verified it",
      "Exceptions: grants kept against a rule, with the approver who signed off",
    ],
  },
  trust: {
    title: "We run the review we sell",
    text: "Cipher's own access is reviewed in Cipher every month. Our reports, policies and subprocessors are in the trust center, not behind a sales call.",
  },
  pricingTitle: "Priced per identity, not per reviewer",
  faq: [
    {
      q: "Does Cipher change anything in our systems without asking?",
      a: "No. Connectors are read-only until you turn on automatic revocation for a campaign, and even then only a final decision by a named reviewer removes a grant.",
    },
    {
      q: "How long does the first review take to set up?",
      a: "Most teams connect their identity provider and five to ten apps in an afternoon and launch their first campaign the same week. Apps without an API can be imported from a CSV export.",
    },
    {
      q: "What do our reviewers actually need to do?",
      a: "Open the link in the reminder, read the context next to each grant and choose keep or revoke. Low-risk grants that match a role can be confirmed in bulk.",
    },
    {
      q: "Which frameworks does the evidence map to?",
      a: "SOC 2 (CC6.1–CC6.3), ISO/IEC 27001 Annex A 5.15–5.18, HIPAA §164.308 and SOX ITGC user access controls. Mappings are editable for your own control library.",
    },
    {
      q: "Is the demo on this site connected to anything?",
      a: "No. The review on this page and the /app workspace run entirely in your browser on fictional data. Nothing is sent, stored or revoked.",
    },
  ],
  close: {
    title: "Run your next review in Cipher",
    text: "A thirty-minute call: we connect a sandbox to your identity provider's test tenant and run a real campaign together.",
  },
};

/* ---------- Platform ---------- */

export const platform = {
  title: "Platform",
  heading: "Everything a reviewer needs on one line",
  lede: "Cipher turns scattered accounts into one graph of who can do what, then runs reviews against it: context in, decisions out, evidence sealed.",
  stages: [
    {
      name: "Discover",
      title: "One graph of people, groups and permissions",
      text: "Cipher reads your identity provider for people and groups, your HR system for who works where, and each app for the permissions that actually exist. Accounts that match no person are flagged as orphans, not hidden.",
      points: [
        "140+ read-only connectors, plus CSV import for everything else",
        "Nightly sync, or on demand before a campaign starts",
        "Service accounts and tokens tracked with an owner",
      ],
    },
    {
      name: "Decide",
      title: "Context next to every grant",
      text: "Reviewers see the path a grant took, the last time it was used and what changed since it was approved. Risk is explained in a sentence, not a score.",
      points: [
        "Last-used data from app audit logs",
        "Joiner, mover and leaver events from HR",
        "Bulk-confirm grants that match a role definition",
      ],
    },
    {
      name: "Revoke",
      title: "Decisions that actually remove access",
      text: "A revoke decision either removes the grant through the connector or opens a ticket in your service desk with everything the admin needs. Cipher re-checks on the next sync and reopens anything that came back.",
      points: [
        "Direct removal for 60+ apps",
        "Ticket fallback with owner and due date",
        "Verification on the next sync, not a promise",
      ],
    },
    {
      name: "Prove",
      title: "Evidence the auditor can test",
      text: "When the campaign closes, the reviewer signs an attestation and Cipher seals the record. Exports map each decision to the control it satisfies.",
      points: [
        "Signed, timestamped attestations",
        "Control mapping for SOC 2, ISO 27001, SOX and HIPAA",
        "Immutable history kept for seven years",
      ],
    },
  ],
  sources: [
    "Identity provider",
    "HR system",
    "Cloud consoles",
    "Code hosting",
    "Finance apps",
    "Service desk",
  ],
  remediation: [
    {
      step: "Decision",
      text: "Dana Whitfield revokes Cluster admin for Alex Morgan",
      time: "10:42",
    },
    {
      step: "Removal",
      text: "Connector removes Alex from platform-oncall",
      time: "10:42",
    },
    {
      step: "Sync",
      text: "Production cluster re-read; role binding gone",
      time: "10:58",
    },
    {
      step: "Verified",
      text: "Grant closed and added to the evidence pack",
      time: "10:58",
    },
  ],
  evidenceFiles: [
    {
      name: "population.csv",
      size: "214 KB",
      detail: "1,284 grants · 412 identities",
    },
    {
      name: "decisions.csv",
      size: "96 KB",
      detail: "Reviewer, reason, timestamp",
    },
    {
      name: "remediation.csv",
      size: "31 KB",
      detail: "Change and verifying sync",
    },
    {
      name: "attestation.pdf",
      size: "88 KB",
      detail: "Signed by 14 reviewers",
    },
  ],
  signals: [
    {
      name: "Unused",
      means:
        "No activity in the app's audit log for longer than your threshold.",
      example: "Cluster admin, last used 94 days ago",
    },
    {
      name: "Mover",
      means:
        "The HR record changed team or manager after the grant was approved.",
      example: "Support desk agent, moved to Sales Aug 12",
    },
    {
      name: "Leaver",
      means: "The person left but an account, token or seat survives.",
      example: "Personal token used two days after leaving",
    },
    {
      name: "Expired",
      means: "A temporary grant passed the end date on its ticket.",
      example: "Refund approver, due to end Sep 30",
    },
    {
      name: "Conflict",
      means: "Two grants together break a segregation-of-duties rule.",
      example: "Runs payroll and posts journal entries",
    },
    {
      name: "Widened",
      means: "A group's scope grew after people were added to it.",
      example: "analytics-readers moved to all schemas",
    },
  ],
  specs: [
    ["Deployment", "Cloud, US or EU region; single-tenant on Enterprise"],
    ["Sign-in", "SAML 2.0 and OIDC single sign-on, SCIM provisioning"],
    ["Connectors", "Read-only by default; write scope per app, per campaign"],
    [
      "Data kept",
      "Identities, groups, permissions and last-used dates; never content or credentials",
    ],
    ["API", "REST API and webhooks for campaigns, decisions and evidence"],
    ["Retention", "Seven years of signed review history, exportable any time"],
  ],
};

/* ---------- Solutions ---------- */

export type Solution = {
  slug: string;
  name: string;
  team: "Compliance" | "IT" | "Security" | "Finance";
  frameworks: string[];
  summary: string;
  problem: string;
  steps: { title: string; text: string }[];
  rule: { name: string; scope: string; when: string; then: string };
  evidence: string[];
  quote?: { text: string; name: string; role: string };
};

export const solutionsPage = {
  title: "Solutions",
  heading: "Start with the review that is already on your calendar",
  lede: "Each solution is a campaign template: scope, rules, reviewers and the evidence it produces. Use one as it ships or edit it to match your controls.",
};

export const solutions: Solution[] = [
  {
    slug: "soc2-access-reviews",
    name: "Quarterly access reviews for SOC 2",
    team: "Compliance",
    frameworks: ["SOC 2", "ISO 27001"],
    summary:
      "Run the user access review your auditor samples, with the evidence assembled as you go.",
    problem:
      "The quarterly review usually means exporting users from a dozen apps, mailing spreadsheets to managers and chasing them for two weeks. The evidence is a folder of screenshots that nobody can reproduce and the auditor samples anyway.",
    steps: [
      {
        title: "Scope the population",
        text: "Pick the in-scope systems once. Cipher snapshots every grant at launch so the population cannot drift mid-review.",
      },
      {
        title: "Route to the right reviewer",
        text: "Managers review their people, system owners review privileged roles, and nobody reviews themselves.",
      },
      {
        title: "Chase without chasing",
        text: "Reminders go out on your cadence and escalate to the reviewer's manager after the deadline.",
      },
      {
        title: "Seal and export",
        text: "Signed attestations and remediation proof export as one pack mapped to CC6.2 and CC6.3.",
      },
    ],
    rule: {
      name: "Quarterly UAR",
      scope: "All in-scope systems",
      when: "Every quarter, 45 days before period end",
      then: "Assign to manager; escalate to system owner after 10 days",
    },
    evidence: [
      "Population snapshot at launch",
      "Decision log with reviewer and reason",
      "Remediation with verifying sync",
      "Signed attestation per reviewer",
    ],
    quote: {
      text: "We cut the quarterly review from three weeks to four days, and the audit request list got shorter by a page.",
      name: "Ines Moreau",
      role: "Head of IT, Alder Logistics (demo customer)",
    },
  },
  {
    slug: "joiners-movers-leavers",
    name: "Joiners, movers and leavers",
    team: "IT",
    frameworks: ["SOC 2", "ISO 27001"],
    summary:
      "Catch the access that follows people between teams and outlives their last day.",
    problem:
      "Onboarding is automated, offboarding mostly is, and moving teams is not automated anywhere. People keep the access of every job they have had, and leavers keep tokens and seats the identity provider never knew about.",
    steps: [
      {
        title: "Listen to HR",
        text: "Cipher watches the HR system for start dates, team changes and last days.",
      },
      {
        title: "Diff the access",
        text: "On a move, Cipher compares old and new team access and queues only the difference for the new manager.",
      },
      {
        title: "Sweep on leave",
        text: "On a last day, every account, token and seat tied to the person is listed within the hour.",
      },
    ],
    rule: {
      name: "Mover review",
      scope: "Grants held before a team change",
      when: "Within 2 days of an HR team or manager change",
      then: "Ask the new manager; revoke if no answer in 14 days",
    },
    evidence: [
      "HR event that triggered the review",
      "Before and after access for each mover",
      "Leaver sweep with timestamps",
    ],
  },
  {
    slug: "privileged-access",
    name: "Privileged and break-glass access",
    team: "Security",
    frameworks: ["SOC 2", "ISO 27001", "SOX"],
    summary:
      "Review admin roles monthly and make every break-glass session explain itself.",
    problem:
      "Admin rights are granted for an incident or a migration and then sit unused for months. They are the grants attackers look for first and the ones reviewers are least able to judge.",
    steps: [
      {
        title: "Find every admin",
        text: "Cipher tags admin and owner roles across apps using each connector's permission model.",
      },
      {
        title: "Review monthly",
        text: "Privileged grants get their own campaign with the system owner as reviewer.",
      },
      {
        title: "Explain break-glass",
        text: "Each emergency session asks for a reason within 24 hours and lands in the next review.",
      },
    ],
    rule: {
      name: "Privileged monthly",
      scope: "Admin, owner and superuser roles",
      when: "First business day of each month",
      then: "Assign to system owner; auto-revoke if unused 60 days",
    },
    evidence: [
      "Privileged population by system",
      "Break-glass sessions with stated reasons",
      "Unused-admin removals",
    ],
    quote: {
      text: "Half our cluster admins had not used the role since the migration. They were gone the same morning.",
      name: "Omar Haddad",
      role: "Security engineer, Alder Logistics (demo customer)",
    },
  },
  {
    slug: "contractor-access",
    name: "Contractor and vendor access",
    team: "Security",
    frameworks: ["SOC 2", "HIPAA"],
    summary:
      "Give every external account an owner and an end date, then hold them to it.",
    problem:
      "Contractors arrive through a staffing agency, a vendor portal or a direct invite, and their accounts rarely live in HR. When the contract ends, nobody is told.",
    steps: [
      {
        title: "Assign a sponsor",
        text: "Every external identity gets an internal sponsor who answers for it.",
      },
      {
        title: "Set the end date",
        text: "Grants carry the contract end date and expire into the review queue.",
      },
      {
        title: "Monthly confirmation",
        text: "Sponsors confirm their contractors once a month in two clicks.",
      },
    ],
    rule: {
      name: "Contractor monthly",
      scope: "Identities marked external",
      when: "Monthly, and on contract end date",
      then: "Ask sponsor; disable account if contract ended",
    },
    evidence: [
      "External identities with sponsor",
      "End-date expiries and their outcome",
      "Monthly sponsor confirmations",
    ],
  },
  {
    slug: "finance-sod",
    name: "Segregation of duties in finance",
    team: "Finance",
    frameworks: ["SOX"],
    summary:
      "Spot people who can both make and approve a payment before your auditor does.",
    problem:
      "Finance roles are spread across payroll, billing and the ledger. A cover arrangement during someone's leave quietly gives one person both sides of a control.",
    steps: [
      {
        title: "Write the rule once",
        text: "Define conflicting permission pairs across systems in plain language.",
      },
      {
        title: "Detect continuously",
        text: "Cipher checks every sync and raises a conflict the day it appears.",
      },
      {
        title: "Approve or split",
        text: "The controller either removes one side or records a time-boxed exception.",
      },
    ],
    rule: {
      name: "Payroll vs ledger",
      scope: "Payroll admin + post journal entries",
      when: "On every sync",
      then: "Raise to controller; exception expires after 30 days",
    },
    evidence: [
      "Rule definitions and history",
      "Conflicts with resolution",
      "Approved exceptions with expiry",
    ],
  },
  {
    slug: "service-accounts",
    name: "Service accounts and tokens",
    team: "Security",
    frameworks: ["SOC 2", "ISO 27001"],
    summary:
      "Put an owner, a scope and a rotation date on every non-human identity.",
    problem:
      "Deploy bots, integration users and personal access tokens outnumber people in most companies. They never leave, rarely rotate and are granted admin to unblock a release.",
    steps: [
      {
        title: "Inventory",
        text: "Cipher lists service accounts, API keys and personal tokens with their last use.",
      },
      {
        title: "Assign owners",
        text: "Orphaned accounts go to the owning team's lead for adoption or removal.",
      },
      {
        title: "Rotate and right-size",
        text: "Tokens past rotation and admin scopes on bots go into review.",
      },
    ],
    rule: {
      name: "Token rotation",
      scope: "Service tokens and personal access tokens",
      when: "When a token passes 365 days",
      then: "Ask owner to rotate; revoke after 21 days",
    },
    evidence: [
      "Non-human identity inventory with owner",
      "Rotation history",
      "Scope reductions",
    ],
  },
  {
    slug: "saas-seats",
    name: "Reclaiming unused SaaS seats",
    team: "Finance",
    frameworks: ["Cost control"],
    summary:
      "Turn the access review into a licence review and stop paying for people who left.",
    problem:
      "Every unused seat is both a security gap and a line on an invoice. Finance sees the invoice, IT sees the account, and neither sees the other.",
    steps: [
      {
        title: "Price the seats",
        text: "Add per-seat prices for paid apps; Cipher totals the cost of unused access.",
      },
      {
        title: "Review by cost",
        text: "Sort the queue by monthly cost so the expensive grants are decided first.",
      },
      {
        title: "Report savings",
        text: "Revoked paid seats roll up into a monthly savings report for Finance.",
      },
    ],
    rule: {
      name: "Idle paid seats",
      scope: "Apps with a seat price",
      when: "Seat unused for 45 days",
      then: "Ask the manager; reclaim the seat if revoked",
    },
    evidence: [
      "Seat inventory by app",
      "Revoked seats with monthly value",
      "Savings report",
    ],
  },
];

/* ---------- Pricing ---------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  yearly: number | null;
  minimum: number;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  heading: "Priced per identity in scope",
  lede: "Reviewers, auditors and admins are free. You pay for the people and service accounts Cipher reviews, with a monthly minimum per plan.",
  plans: [
    {
      id: "team",
      name: "Team",
      monthly: 7.5,
      yearly: 6,
      minimum: 50,
      blurb: "For a first audit with a handful of systems.",
      features: [
        "Quarterly campaigns",
        "25 connectors and CSV import",
        "Evidence export for SOC 2",
        "Email reminders and escalation",
      ],
      cta: "Start with Team",
    },
    {
      id: "business",
      name: "Business",
      monthly: 13.5,
      yearly: 11,
      minimum: 150,
      blurb: "For companies with more than one framework and real movers.",
      features: [
        "Unlimited campaigns and rules",
        "All 140+ connectors",
        "Joiner, mover, leaver triggers",
        "Automatic revocation",
        "SoD rules across systems",
      ],
      cta: "Start with Business",
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      yearly: null,
      minimum: 2000,
      blurb: "For regulated companies and multi-entity groups.",
      features: [
        "Single-tenant deployment",
        "Custom control library",
        "Auditor workspace",
        "HIPAA BAA",
        "Named security engineer",
      ],
      cta: "Talk to us",
    },
  ] as Plan[],
  compare: [
    {
      feature: "Identities in scope",
      values: ["50–500", "150–5,000", "2,000+"],
    },
    { feature: "Connectors", values: ["25", "140+", "140+ and custom"] },
    {
      feature: "Campaign types",
      values: ["Quarterly", "Any cadence", "Any cadence"],
    },
    { feature: "HR-triggered reviews", values: ["—", "Included", "Included"] },
    { feature: "Automatic revocation", values: ["—", "Included", "Included"] },
    {
      feature: "Segregation-of-duties rules",
      values: ["—", "Up to 50", "Unlimited"],
    },
    {
      feature: "Evidence frameworks",
      values: ["SOC 2", "SOC 2, ISO, SOX, HIPAA", "Custom library"],
    },
    {
      feature: "Data residency",
      values: ["US", "US or EU", "US, EU or single-tenant"],
    },
    {
      feature: "Support",
      values: [
        "Email, 1 business day",
        "Chat, 4 hours",
        "Named engineer, 1 hour",
      ],
    },
  ],
  faq: [
    {
      q: "What counts as an identity?",
      a: "Any person or service account with at least one grant in a campaign's scope. Reviewers who hold no grants in scope are free, and so are read-only auditor seats.",
    },
    {
      q: "What happens when we grow mid-year?",
      a: "Yearly plans true up once a quarter at the yearly rate. We never bill retroactively for identities added and removed inside the same quarter.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes: a 21-day sandbox with three connectors and one campaign. Evidence exports carry a trial watermark.",
    },
    {
      q: "Do you offer nonprofit or startup pricing?",
      a: "Registered nonprofits get 40% off Team and Business. Companies under two years old get their first year of Team at the monthly minimum.",
    },
  ],
};

/* ---------- Trust center ---------- */

export const trust = {
  title: "Trust center",
  heading: "We hold ourselves to the review we sell",
  lede: "Reports, policies, subprocessors and live status for Cipher itself. Public documents are listed below; reports under NDA are sent within one business day of a request.",
  status: {
    label: "All systems operational",
    uptime: "99.98%",
    window: "Last 90 days",
  },
  /** Daily uptime for the last 90 days, oldest first; anything below 100 is drawn as a partial day. */
  uptime: Array.from({ length: 90 }, (_, i) =>
    [23, 61].includes(i) ? 99.2 : i === 47 ? 99.86 : 100,
  ),
  incidents: [
    {
      date: "Sep 19, 2026",
      title: "Delayed syncs for one connector",
      text: "A rate-limit change upstream slowed nightly syncs for 41 minutes. No decisions were lost.",
    },
    {
      date: "Aug 12, 2026",
      title: "Reminder emails sent twice",
      text: "A retry bug sent duplicate reminders to 212 reviewers. Fixed the same day.",
    },
  ],
  certifications: [
    {
      name: "SOC 2 Type II",
      detail:
        "Security, availability and confidentiality. Period Jan 1 – Jun 30, 2026.",
      status: "Report under NDA",
    },
    {
      name: "ISO/IEC 27001:2022",
      detail: "Certificate no. 61-4410 issued Apr 2026 by an accredited body.",
      status: "Certificate public",
    },
    {
      name: "Penetration test",
      detail: "Annual external test of the app and API, completed Jun 2026.",
      status: "Summary under NDA",
    },
    {
      name: "GDPR",
      detail: "Data processing addendum with EU standard contractual clauses.",
      status: "DPA public",
    },
    {
      name: "HIPAA",
      detail: "Business associate agreement available on Enterprise.",
      status: "On request",
    },
  ],
  documents: [
    "SOC 2 Type II report",
    "ISO 27001 certificate",
    "Penetration test summary",
    "Security overview (12 pages)",
    "Data processing addendum",
    "Business continuity plan",
  ],
  practices: [
    {
      title: "Your data",
      text: "Cipher stores identities, group memberships, permissions and last-used dates. It never stores passwords, keys, message content or files. Data is encrypted with AES-256 at rest and TLS 1.3 in transit, in the US or EU region you choose.",
    },
    {
      title: "Our access to it",
      text: "Engineers have no standing access to production. Access is requested per session, approved by a second engineer, logged, and reviewed in Cipher every month. The last review closed on Oct 1, 2026 with 3 grants revoked.",
    },
    {
      title: "Connectors",
      text: "Every connector starts read-only. Write scopes are requested per app, shown to you before you approve them, and can be limited to a single campaign.",
    },
    {
      title: "People",
      text: "Everyone at Cipher is background-checked where the law allows, trained on security at hiring and every year, and signs a confidentiality agreement before day one.",
    },
    {
      title: "Incidents",
      text: "A security engineer is on call around the clock. Customers affected by an incident hear from us within 24 hours of confirmation, with a written review within ten business days.",
    },
  ],
  disclosure:
    "Found something? Write to security@cipher.example. We reply within two business days, will not pursue good-faith research, and credit researchers who want it.",
  subprocessors: [
    {
      name: "Northgate Cloud",
      purpose: "Hosting and managed databases",
      location: "US, EU",
    },
    {
      name: "Parcelmail",
      purpose: "Transactional email (reminders)",
      location: "US",
    },
    { name: "Quarry Logs", purpose: "Application logging", location: "US, EU" },
    { name: "Ledgerline", purpose: "Billing and invoicing", location: "US" },
    { name: "Tessellate", purpose: "Customer support desk", location: "EU" },
  ],
  faq: [
    {
      q: "Can we review Cipher's access to our data?",
      a: "Yes. Enterprise customers get a monthly export of every Cipher staff session that touched their tenant, with the approver and reason.",
    },
    {
      q: "Where is our data stored?",
      a: "In the region you choose at sign-up, US (Oregon) or EU (Frankfurt). Backups stay in the same region.",
    },
    {
      q: "What happens to our data if we leave?",
      a: "Export everything at any time. After cancellation, data is deleted within 30 days and backups roll off within 35 more.",
    },
  ],
};

/* ---------- Changelog ---------- */

export type Release = {
  date: string;
  version: string;
  title: string;
  tag: "Reviews" | "Connectors" | "Evidence" | "Platform";
  text: string;
  items: string[];
};

export const changelogPage = {
  title: "Changelog",
  heading: "What changed in Cipher",
  lede: "Shipped every two weeks. Breaking changes to the API are announced here thirty days ahead.",
};

export const releases: Release[] = [
  {
    date: "Oct 14, 2026",
    version: "4.12",
    title: "Bulk-confirm by role",
    tag: "Reviews",
    text: "Reviewers can confirm every low-risk grant that matches a role definition in one step, with each grant still logged individually.",
    items: [
      "Role definitions editable per campaign",
      "Bulk actions recorded per grant in the evidence pack",
      "Undo within 10 minutes",
    ],
  },
  {
    date: "Sep 30, 2026",
    version: "4.11",
    title: "Segregation-of-duties across systems",
    tag: "Platform",
    text: "Conflict rules can now pair permissions from different apps, such as payroll admin with ledger posting.",
    items: [
      "Rule builder with plain-language preview",
      "Time-boxed exceptions",
      "Conflicts shown inline in the review queue",
    ],
  },
  {
    date: "Sep 16, 2026",
    version: "4.10",
    title: "Twelve new connectors",
    tag: "Connectors",
    text: "Including two HR systems, three finance apps and a generic SCIM connector for anything that speaks it.",
    items: [
      "Generic SCIM 2.0 connector",
      "Last-used dates for finance apps",
      "Faster nightly sync for large tenants",
    ],
  },
  {
    date: "Sep 2, 2026",
    version: "4.9",
    title: "Auditor workspace",
    tag: "Evidence",
    text: "Give your auditor a read-only seat that sees closed campaigns, samples grants and downloads evidence without a screen share.",
    items: [
      "Sampling with seeded random selection",
      "Download log for every file",
      "Expires automatically after the audit window",
    ],
  },
  {
    date: "Aug 19, 2026",
    version: "4.8",
    title: "Mover reviews from HR events",
    tag: "Reviews",
    text: "A team or manager change in HR now queues the difference in access for the new manager within two days.",
    items: [
      "Diff view of old versus new team access",
      "Configurable grace period",
      "Escalation to system owner",
    ],
  },
  {
    date: "Aug 5, 2026",
    version: "4.7",
    title: "Verification after revocation",
    tag: "Platform",
    text: "Every revocation is re-checked on the next sync. If the grant came back, the decision reopens and the system owner is told.",
    items: [
      "Verified badge in the evidence pack",
      "Reopen notifications",
      "Remediation timing report",
    ],
  },
  {
    date: "Jul 22, 2026",
    version: "4.6",
    title: "Signed attestations",
    tag: "Evidence",
    text: "Reviewers sign their campaign with a statement your compliance team writes. Signatures carry the reviewer's SSO session and a timestamp.",
    items: [
      "Custom attestation wording",
      "PDF and JSON exports",
      "Seven-year retention",
    ],
  },
];

/* ---------- About ---------- */

export const about = {
  title: "Company",
  heading: "Security that speaks human",
  lede: "Cipher started in 2021 when three people who had run too many access reviews by spreadsheet decided the reviewer, not the auditor, was the user to design for.",
  story: [
    "Every security team knows who should not have access. What they lack is a way to ask the one person who knows the answer, at the moment they can give it, with enough context to be sure.",
    "So Cipher is built for the reviewer: the engineering manager with forty grants to check between meetings, the controller who needs to see a conflict before the auditor does. If they can decide quickly and confidently, the evidence takes care of itself.",
  ],
  principles: [
    {
      title: "Context before action",
      text: "An account is only part of the story. We put teams, resources and reasons in the same frame before anyone is asked to decide.",
    },
    {
      title: "The whole picture, nothing more",
      text: "Reviewers get enough detail to decide without becoming investigators. If a signal cannot be explained in a sentence, it does not ship.",
    },
    {
      title: "A decision you can follow",
      text: "Clear outcomes and a visible trail make the next review easier than the last, for the reviewer and for whoever audits them.",
    },
  ],
  team: [
    {
      name: "Hana Okafor",
      initials: "HO",
      role: "Co-founder, CEO",
      bio: "Ran IT and compliance at two logistics companies through four SOC 2 audits.",
    },
    {
      name: "Tomas Varga",
      initials: "TV",
      role: "Co-founder, CTO",
      bio: "Built identity infrastructure for a payments company for eight years.",
    },
    {
      name: "Ruth Adeyemi",
      initials: "RA",
      role: "Co-founder, Design",
      bio: "Designs for the person who has to click the button, not the person who bought it.",
    },
    {
      name: "Daniel Sørensen",
      initials: "DS",
      role: "Head of Security",
      bio: "Former incident responder. Runs Cipher's own monthly access review.",
    },
    {
      name: "Mariana Costa",
      initials: "MC",
      role: "Head of Customer Engineering",
      bio: "Has connected more identity providers to more apps than she can count.",
    },
    {
      name: "Kwame Asante",
      initials: "KA",
      role: "Head of Compliance",
      bio: "Former auditor. Reads evidence packs the way your auditor will.",
    },
  ],
  offices: [
    {
      city: "Portland",
      lines: ["410 Harbor Row, Suite 6", "Portland, OR 97209"],
    },
    {
      city: "Rotterdam",
      lines: ["Wijnhaven 88, 4th floor", "3011 WS Rotterdam"],
    },
  ],
  roles: [
    {
      title: "Senior connector engineer",
      team: "Engineering",
      place: "Portland or remote (US)",
    },
    {
      title: "Product designer, review experience",
      team: "Design",
      place: "Rotterdam or remote (EU)",
    },
    {
      title: "Customer engineer",
      team: "Customer Engineering",
      place: "Remote (US)",
    },
    {
      title: "Security compliance analyst",
      team: "Security",
      place: "Portland",
    },
  ],
};

/* ---------- Request a demo ---------- */

export const demo = {
  title: "Request a demo",
  heading: "See your own access, not ours",
  lede: "Tell us a little about your setup. A customer engineer replies within one business day with two times for a thirty-minute call.",
  agenda: [
    {
      time: "5 min",
      text: "Your current review: systems in scope, cadence, who reviews.",
    },
    {
      time: "15 min",
      text: "A live campaign on a sandbox connected to your identity provider's test tenant.",
    },
    {
      time: "10 min",
      text: "Evidence export, pricing for your identity count, and next steps.",
    },
  ],
  sizes: ["Under 100 people", "100–499", "500–1,999", "2,000+"],
  providers: [
    "Not sure",
    "A cloud identity provider",
    "An on-premises directory",
    "Several, after an acquisition",
  ],
  frameworks: ["SOC 2", "ISO 27001", "SOX", "HIPAA"],
};

export const signin = {
  title: "Sign in",
  heading: "Sign in to Cipher",
  lede: "Reviewers usually arrive from a reminder link. Admins sign in here.",
};

export const notFound = {
  title: "Page not found",
  heading: "No access path leads here",
  text: "This page was moved, renamed, or never existed. The pages below are all still granted.",
};
