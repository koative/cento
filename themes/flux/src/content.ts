/* Flux — every brand string, page copy and demo record lives here. */

export const brand = {
  name: "Flux",
  sector: "Workflow automation",
  tagline: "Let the handoffs run themselves.",
  email: "hello@flux.example",
  salesEmail: "sales@flux.example",
  phone: "+1 555 0144 280",
  address: [
    "Flux Automation Inc.",
    "410 Wharf Street, Suite 6",
    "Portland, OR 97209",
  ],
  workspace: "Northgate Ops",
  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/product", label: "Product" },
  { to: "/integrations", label: "Integrations" },
  { to: "/templates", label: "Templates" },
  { to: "/pricing", label: "Pricing" },
  { to: "/customers", label: "Customers" },
  { to: "/changelog", label: "Changelog" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "How Flux works" },
      { to: "/integrations", label: "Integrations" },
      { to: "/templates", label: "Templates" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
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
    title: "Demo workspace",
    links: [
      { to: "/app", label: "Overview" },
      { to: "/app/workflows", label: "Workflows" },
      { to: "/app/runs", label: "Run history" },
      { to: "/app/settings", label: "Settings" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

/* ---------- Workflow model ---------- */

export type StepKind = "trigger" | "condition" | "action" | "delay";
export type Op = ">" | "<" | "=";
export type Rule = { field: string; op: Op; value: number };
export type Step = {
  id: string;
  kind: StepKind;
  app: string;
  title: string;
  rule?: Rule;
};
export type SampleField = {
  key: string;
  label: string;
  value: number;
  unit?: string;
};

export const kindLabel: Record<StepKind, string> = {
  trigger: "When this happens",
  condition: "Only continue if",
  action: "Then do this",
  delay: "Wait",
};

/* ---------- Integrations ---------- */

export type Glyph =
  | "bubble"
  | "envelope"
  | "ledger"
  | "coin"
  | "funnel"
  | "form"
  | "ticket"
  | "grid"
  | "box"
  | "page"
  | "branch"
  | "crew"
  | "clock"
  | "check"
  | "store"
  | "hook";

export type Connector = {
  slug: string;
  name: string;
  category: string;
  color: string;
  glyph: Glyph;
  blurb: string;
  description: string;
  triggers: string[];
  actions: string[];
  plan: "All plans" | "Team and up" | "Business";
  workspaces: number;
  auth: string;
};

export const categories = [
  "Communication",
  "Finance",
  "Sales",
  "Support",
  "Files & docs",
  "Engineering",
  "People",
  "Commerce",
  "Built-in",
];

export const connectors: Connector[] = [
  {
    slug: "hallway",
    name: "Hallway",
    category: "Communication",
    color: "#c2410c",
    glyph: "bubble",
    blurb: "Team chat with channels, threads and approvals.",
    description:
      "Post updates where your team already talks. Flux can open a thread for every new record, ask for an approval with two buttons, and wait for the answer before the next step runs.",
    triggers: [
      "New message in channel",
      "Reaction added to message",
      "Approval button pressed",
    ],
    actions: [
      "Post message to channel",
      "Send direct message",
      "Ask for approval",
      "Create channel",
    ],
    plan: "All plans",
    workspaces: 9120,
    auth: "OAuth, workspace admin approves once",
  },
  {
    slug: "letterkit",
    name: "Letterkit",
    category: "Communication",
    color: "#1d4ed8",
    glyph: "envelope",
    blurb: "Shared inboxes and transactional email.",
    description:
      "Send plain, personal email from a shared address or a teammate's own. Templates accept fields from earlier steps, so a reminder can greet the customer by name and quote the right invoice.",
    triggers: ["Email received in shared inbox", "Email bounced"],
    actions: ["Send email", "Reply in thread", "Add label to conversation"],
    plan: "All plans",
    workspaces: 7840,
    auth: "OAuth or SMTP credentials",
  },
  {
    slug: "slotbook",
    name: "Slotbook",
    category: "Communication",
    color: "#0f766e",
    glyph: "clock",
    blurb: "Booking pages and calendar holds.",
    description:
      "Turn a booked call into everything that should follow it: a CRM note, a prep doc, a reminder to the host an hour before. Cancellations clean up after themselves.",
    triggers: ["Meeting booked", "Meeting cancelled", "Meeting rescheduled"],
    actions: ["Create booking link", "Add calendar hold"],
    plan: "All plans",
    workspaces: 3410,
    auth: "OAuth",
  },
  {
    slug: "ledgerline",
    name: "Ledgerline",
    category: "Finance",
    color: "#15803d",
    glyph: "ledger",
    blurb: "Bookkeeping, bills and invoice approvals.",
    description:
      "Route incoming bills by amount, supplier or cost centre. Flux reads the full invoice record, so a condition can check the total before anyone is pinged.",
    triggers: ["Invoice received", "Invoice overdue", "Bill approved"],
    actions: [
      "Mark invoice as approved",
      "Create bill",
      "Attach file to invoice",
      "Add journal note",
    ],
    plan: "All plans",
    workspaces: 4620,
    auth: "OAuth, read and write scopes",
  },
  {
    slug: "coinpost",
    name: "Coinpost",
    category: "Finance",
    color: "#7c3aed",
    glyph: "coin",
    blurb: "Card payments, subscriptions and refunds.",
    description:
      "React to money moving: a failed renewal, a refund, a first payment. Retry counts and amounts arrive as numbers you can branch on.",
    triggers: [
      "Payment failed",
      "Payment succeeded",
      "Subscription cancelled",
      "Refund issued",
    ],
    actions: ["Issue refund", "Pause subscription", "Create payment link"],
    plan: "Team and up",
    workspaces: 3980,
    auth: "Restricted API key",
  },
  {
    slug: "funnelbook",
    name: "Funnelbook",
    category: "Sales",
    color: "#be123c",
    glyph: "funnel",
    blurb: "Pipeline, deals and account records.",
    description:
      "Keep the CRM honest without asking reps to type. Create deals from form answers, move stages when payments land, and flag accounts the moment something goes wrong.",
    triggers: ["Deal moved to stage", "New contact created", "Deal won"],
    actions: [
      "Create deal",
      "Update deal stage",
      "Flag account",
      "Add note to contact",
    ],
    plan: "All plans",
    workspaces: 6230,
    auth: "OAuth",
  },
  {
    slug: "askbox",
    name: "Askbox",
    category: "Sales",
    color: "#a16207",
    glyph: "form",
    blurb: "Forms and surveys with logic.",
    description:
      "Every answer on a form becomes a field Flux can read. Score a lead, route a request to the right team, or file a survey response in the right sheet.",
    triggers: ["New form response", "Survey completed"],
    actions: ["Prefill form link", "Close form"],
    plan: "All plans",
    workspaces: 5170,
    auth: "API key",
  },
  {
    slug: "ticketyard",
    name: "Ticketyard",
    category: "Support",
    color: "#0369a1",
    glyph: "ticket",
    blurb: "Help desk tickets, queues and SLAs.",
    description:
      "Escalate the tickets that matter and leave the rest in the queue. Priority, plan and waiting time are all numbers a condition can test.",
    triggers: ["Ticket created", "Ticket breached SLA", "Customer replied"],
    actions: [
      "Assign ticket",
      "Add internal note",
      "Set priority",
      "Close ticket",
    ],
    plan: "All plans",
    workspaces: 4410,
    auth: "OAuth",
  },
  {
    slug: "gridsheet",
    name: "Gridsheet",
    category: "Files & docs",
    color: "#166534",
    glyph: "grid",
    blurb: "Spreadsheets your whole team edits.",
    description:
      "Append rows, look up values and read totals. Plenty of teams start here: a sheet is the simplest database, and Flux keeps it filled.",
    triggers: ["Row added", "Cell value changed"],
    actions: ["Add row", "Update row", "Find row", "Read range"],
    plan: "All plans",
    workspaces: 8870,
    auth: "OAuth",
  },
  {
    slug: "filebarn",
    name: "Filebarn",
    category: "Files & docs",
    color: "#475569",
    glyph: "box",
    blurb: "Shared drives and folders.",
    description:
      "Create folders from a template, file attachments by customer, and share them with the right people when a project starts.",
    triggers: ["File added to folder", "File shared"],
    actions: ["Create folder from template", "Upload file", "Share folder"],
    plan: "All plans",
    workspaces: 5560,
    auth: "OAuth",
  },
  {
    slug: "wikinook",
    name: "Wikinook",
    category: "Files & docs",
    color: "#9333ea",
    glyph: "page",
    blurb: "Team wiki and living documents.",
    description:
      "Append release notes, publish meeting summaries, or share an onboarding guide with a new starter on their first morning.",
    triggers: ["Page published", "Comment added"],
    actions: ["Create page", "Append to page", "Share page"],
    plan: "All plans",
    workspaces: 4020,
    auth: "OAuth",
  },
  {
    slug: "commitlane",
    name: "Commitlane",
    category: "Engineering",
    color: "#334155",
    glyph: "branch",
    blurb: "Code hosting, releases and pull requests.",
    description:
      "Tell the rest of the company what shipped without writing it twice. Releases, merged pull requests and failed builds can all start a workflow.",
    triggers: ["Release published", "Pull request merged", "Build failed"],
    actions: ["Create issue", "Comment on pull request"],
    plan: "Team and up",
    workspaces: 2960,
    auth: "App installation",
  },
  {
    slug: "crewbase",
    name: "Crewbase",
    category: "People",
    color: "#b45309",
    glyph: "crew",
    blurb: "HR records, hiring and time off.",
    description:
      "Start onboarding the moment an offer is signed and offboarding the moment a leave date is set. Flux only ever reads the fields you choose.",
    triggers: ["Hire marked as signed", "Leave date set", "Time off approved"],
    actions: ["Update employee field", "Create onboarding checklist"],
    plan: "Business",
    workspaces: 1840,
    auth: "OAuth with field-level scopes",
  },
  {
    slug: "listwell",
    name: "Listwell",
    category: "People",
    color: "#4d7c0f",
    glyph: "check",
    blurb: "Tasks and lightweight projects.",
    description:
      "Turn anything into a task with an owner and a due date. Completed tasks can start the next workflow, so a checklist becomes a relay.",
    triggers: ["Task completed", "Task overdue"],
    actions: ["Create task", "Assign task", "Move task to list"],
    plan: "All plans",
    workspaces: 6010,
    auth: "OAuth",
  },
  {
    slug: "stallfront",
    name: "Stallfront",
    category: "Commerce",
    color: "#db2777",
    glyph: "store",
    blurb: "Online storefronts and orders.",
    description:
      "Thank first-time buyers, tag big orders and keep the warehouse sheet in step with what was actually paid for.",
    triggers: ["Order paid", "Order refunded", "Stock below threshold"],
    actions: ["Tag order", "Update stock level", "Create discount code"],
    plan: "Team and up",
    workspaces: 2380,
    auth: "Store app install",
  },
  {
    slug: "schedule",
    name: "Schedule",
    category: "Built-in",
    color: "#5b3fa8",
    glyph: "clock",
    blurb: "Run a workflow every hour, day or Monday morning.",
    description:
      "The built-in clock. Pick an interval or a cron expression; Flux runs it in your workspace's time zone and skips nothing during daylight-saving changes.",
    triggers: [
      "Every hour",
      "Every day at a set time",
      "Every Monday 08:00",
      "Custom cron",
    ],
    actions: [],
    plan: "All plans",
    workspaces: 11200,
    auth: "No connection needed",
  },
  {
    slug: "webhooks",
    name: "Webhooks",
    category: "Built-in",
    color: "#1d1a26",
    glyph: "hook",
    blurb: "Catch or send any HTTP request.",
    description:
      "For the tools that are not in the directory yet. Flux gives every workflow its own signed URL, parses the JSON body into fields, and can call out to any endpoint with retries.",
    triggers: ["Catch hook"],
    actions: ["Send POST request", "Send GET request"],
    plan: "All plans",
    workspaces: 7300,
    auth: "Signed URL, optional shared secret",
  },
];

/* ---------- Templates ---------- */

export type Template = {
  slug: string;
  name: string;
  team: string;
  summary: string;
  description: string;
  outcome: string;
  setupMinutes: number;
  steps: Step[];
  sample: SampleField[];
};

export const teams = [
  "Finance",
  "Sales",
  "Support",
  "Operations",
  "People",
  "Engineering",
];

export const templates: Template[] = [
  {
    slug: "invoice-approval",
    name: "Approve large invoices in chat",
    team: "Finance",
    summary:
      "Invoices over a limit wait for a yes from the finance lead before they are booked.",
    description:
      "Small bills go straight through. Anything over the limit posts an approval request to the finance lead in Hallway, and only a yes marks it approved in Ledgerline. The limit is one number you can change.",
    outcome: "Approvals stop living in someone's inbox.",
    setupMinutes: 6,
    steps: [
      {
        id: "s1",
        kind: "trigger",
        app: "ledgerline",
        title: "Invoice received",
      },
      {
        id: "s2",
        kind: "condition",
        app: "flux",
        title: "Invoice amount is over $2,500",
        rule: { field: "amount", op: ">", value: 2500 },
      },
      {
        id: "s3",
        kind: "action",
        app: "hallway",
        title: "Ask the finance lead to approve",
      },
      {
        id: "s4",
        kind: "action",
        app: "ledgerline",
        title: "Mark invoice as approved",
      },
    ],
    sample: [
      { key: "amount", label: "Invoice amount", value: 3400, unit: "$" },
    ],
  },
  {
    slug: "lead-routing",
    name: "Route enterprise leads to the right rep",
    team: "Sales",
    summary:
      "Form answers from larger companies become a deal and a heads-up in the enterprise channel.",
    description:
      "Every Askbox response is checked for company size. Larger teams get a Funnelbook deal in the enterprise pipeline and a post in #sales-enterprise within a minute of hitting submit.",
    outcome: "Big leads are answered the same morning.",
    setupMinutes: 8,
    steps: [
      {
        id: "s1",
        kind: "trigger",
        app: "askbox",
        title: "New demo request form response",
      },
      {
        id: "s2",
        kind: "condition",
        app: "flux",
        title: "Company size is over 50 people",
        rule: { field: "size", op: ">", value: 50 },
      },
      {
        id: "s3",
        kind: "action",
        app: "funnelbook",
        title: "Create deal in Enterprise pipeline",
      },
      {
        id: "s4",
        kind: "action",
        app: "hallway",
        title: "Post lead summary to #sales-enterprise",
      },
    ],
    sample: [
      { key: "size", label: "Company size", value: 120, unit: "people" },
    ],
  },
  {
    slug: "ticket-escalation",
    name: "Escalate urgent tickets to on-call",
    team: "Support",
    summary:
      "High-priority tickets become an on-call task and the customer hears back with an ETA.",
    description:
      "When a ticket's priority score passes the line you set, Flux creates a Listwell task for whoever is on call and emails the customer that a person is on it. Everything else stays in the normal queue.",
    outcome: "Urgent tickets never wait for the next triage.",
    setupMinutes: 7,
    steps: [
      { id: "s1", kind: "trigger", app: "ticketyard", title: "Ticket created" },
      {
        id: "s2",
        kind: "condition",
        app: "flux",
        title: "Priority score is over 7",
        rule: { field: "priority", op: ">", value: 7 },
      },
      {
        id: "s3",
        kind: "action",
        app: "listwell",
        title: "Create task for on-call engineer",
      },
      {
        id: "s4",
        kind: "action",
        app: "letterkit",
        title: "Email customer with response time",
      },
    ],
    sample: [{ key: "priority", label: "Priority score", value: 9 }],
  },
  {
    slug: "new-hire-onboarding",
    name: "Prepare a new starter's first day",
    team: "People",
    summary:
      "A signed offer creates the folder, shares the guide and introduces them on day one.",
    description:
      "The moment Crewbase marks an offer as signed, Flux creates the starter's folder from your template and shares the onboarding guide. On their start date it posts a welcome in #hello so nobody forgets.",
    outcome: "Day one starts with everything already shared.",
    setupMinutes: 12,
    steps: [
      {
        id: "s1",
        kind: "trigger",
        app: "crewbase",
        title: "Hire marked as signed",
      },
      {
        id: "s2",
        kind: "action",
        app: "filebarn",
        title: "Create starter folder from template",
      },
      {
        id: "s3",
        kind: "action",
        app: "wikinook",
        title: "Share onboarding guide",
      },
      {
        id: "s4",
        kind: "delay",
        app: "flux",
        title: "Wait until the start date",
      },
      {
        id: "s5",
        kind: "action",
        app: "hallway",
        title: "Introduce the starter in #hello",
      },
    ],
    sample: [
      { key: "days", label: "Days until start", value: 14, unit: "days" },
    ],
  },
  {
    slug: "failed-payment",
    name: "Follow up on failed renewals",
    team: "Finance",
    summary:
      "A failed card renewal triggers a friendly reminder and flags the account before the third try.",
    description:
      "Coinpost retries a card up to four times. Flux steps in early: on the first failures it sends a plain reminder from Letterkit and flags the account in Funnelbook so the owner knows before the customer churns.",
    outcome: "Fewer quiet cancellations.",
    setupMinutes: 5,
    steps: [
      { id: "s1", kind: "trigger", app: "coinpost", title: "Payment failed" },
      {
        id: "s2",
        kind: "condition",
        app: "flux",
        title: "Attempt number is under 3",
        rule: { field: "attempt", op: "<", value: 3 },
      },
      {
        id: "s3",
        kind: "action",
        app: "letterkit",
        title: "Send card update reminder",
      },
      {
        id: "s4",
        kind: "action",
        app: "funnelbook",
        title: "Flag account as at risk",
      },
    ],
    sample: [{ key: "attempt", label: "Attempt number", value: 1 }],
  },
  {
    slug: "release-notes",
    name: "Share release notes with the company",
    team: "Engineering",
    summary:
      "Each release is appended to the changelog page and summarised in #announcements.",
    description:
      "Publishing a release in Commitlane appends its notes to the Wikinook changelog and posts a short summary in Hallway, with a link back to the full page.",
    outcome: "Sales hears about features before customers do.",
    setupMinutes: 4,
    steps: [
      {
        id: "s1",
        kind: "trigger",
        app: "commitlane",
        title: "Release published",
      },
      {
        id: "s2",
        kind: "action",
        app: "wikinook",
        title: "Append notes to the changelog page",
      },
      {
        id: "s3",
        kind: "action",
        app: "hallway",
        title: "Post release summary to #announcements",
      },
    ],
    sample: [{ key: "changes", label: "Changes in release", value: 12 }],
  },
  {
    slug: "vip-orders",
    name: "Thank customers for big orders",
    team: "Operations",
    summary:
      "Orders over a threshold are logged for the warehouse and get a hand-signed thank-you.",
    description:
      "Paid Stallfront orders above your threshold are added to the VIP sheet the warehouse packs from first, and the customer receives a personal note from the founder's address.",
    outcome: "Your best customers feel it.",
    setupMinutes: 6,
    steps: [
      { id: "s1", kind: "trigger", app: "stallfront", title: "Order paid" },
      {
        id: "s2",
        kind: "condition",
        app: "flux",
        title: "Order total is over $150",
        rule: { field: "total", op: ">", value: 150 },
      },
      {
        id: "s3",
        kind: "action",
        app: "gridsheet",
        title: "Add row to VIP orders sheet",
      },
      {
        id: "s4",
        kind: "action",
        app: "letterkit",
        title: "Send personal thank-you note",
      },
    ],
    sample: [{ key: "total", label: "Order total", value: 210, unit: "$" }],
  },
  {
    slug: "weekly-numbers",
    name: "Post the weekly numbers on Monday",
    team: "Operations",
    summary:
      "Every Monday at 08:00 last week's totals are read from the sheet and posted to the team.",
    description:
      "No more Monday screenshots. Flux reads the totals row from your Gridsheet report and posts them in #ops with week-on-week change, before the stand-up starts.",
    outcome: "Everyone starts the week on the same page.",
    setupMinutes: 3,
    steps: [
      {
        id: "s1",
        kind: "trigger",
        app: "schedule",
        title: "Every Monday at 08:00",
      },
      {
        id: "s2",
        kind: "action",
        app: "gridsheet",
        title: "Read last week's totals row",
      },
      {
        id: "s3",
        kind: "action",
        app: "hallway",
        title: "Post weekly numbers to #ops",
      },
    ],
    sample: [{ key: "orders", label: "Orders last week", value: 418 }],
  },
];

/* ---------- Marketing pages ---------- */

export const home = {
  title: "Flux — Workflow automation for teams that hand work to each other",
  hero: {
    title: "Let the handoffs run themselves.",
    lede: "Flux connects the tools your team already uses and moves work between them in plain steps: when this happens, only if, then do this. Test every workflow on a sample record before it touches real data.",
    primary: { to: "/app", label: "Open the demo workspace" },
    secondary: { to: "/templates", label: "Browse templates" },
    demo: "invoice-approval",
  },
  connectorsTitle:
    "Seventeen connectors in the demo directory, and a webhook for the rest.",
  connectorsText:
    "Each connector lists exactly which triggers and actions it supports, which plan it needs and how it signs in. No mystery permissions.",
  templatesTitle: "Start from a workflow someone already debugged.",
  templatesText:
    "Templates are ordinary workflows: open one, change what you like, test it, switch it on.",
  featured: ["lead-routing", "ticket-escalation", "new-hire-onboarding"],
  pillars: [
    {
      title: "Steps you can read aloud",
      text: "No canvas spaghetti. A workflow is a short list: one trigger, the conditions that guard it, the actions that follow. Anyone on the team can review it in a minute.",
    },
    {
      title: "Test runs on sample records",
      text: "Change a number in the sample and watch the run take the other path. Nothing is sent while you test, and the log shows exactly where it stopped and why.",
    },
    {
      title: "A history you can replay",
      text: "Every run keeps its inputs and each step's result for 30 days. When a tool was down, replay the failed runs with one click instead of fixing records by hand.",
    },
  ],
  quote: {
    text: "We used to have a person whose whole Monday was copying numbers between three tools. Now she runs the team that decides which numbers matter.",
    name: "Imogen Vale",
    role: "Head of Operations, Northgate Freight",
  },
  teamsTitle: "What teams automate first",
  teams: [
    {
      team: "Finance",
      items: [
        "Invoice approvals over a limit",
        "Failed payment follow-ups",
        "Month-end reminders to budget owners",
        "Receipts filed by cost centre",
      ],
    },
    {
      team: "Sales",
      items: [
        "Lead routing by company size",
        "Deal won hand-off to onboarding",
        "Meeting booked creates a prep doc",
        "Stale deal nudges every Friday",
      ],
    },
    {
      team: "Support",
      items: [
        "Urgent tickets to on-call",
        "SLA breach alerts in chat",
        "Bug reports filed as issues",
        "Satisfaction survey after close",
      ],
    },
    {
      team: "People",
      items: [
        "New starter folders and guides",
        "Offboarding checklists",
        "Time off posted to the team calendar",
        "Anniversary reminders",
      ],
    },
  ],
  guardTitle: "Built for the workflow you will forget about.",
  guardText:
    "Good automation is invisible until something changes. Flux is designed for month seven, when the person who built it is on holiday.",
  guards: [
    {
      term: "Run history",
      detail:
        "Inputs and outputs for every step, kept 30 days (365 on Business).",
    },
    {
      term: "Retries",
      detail:
        "Failed actions retry three times with back-off, then wait for you.",
    },
    {
      term: "Owners",
      detail: "Every workflow has a named owner who hears when it breaks.",
    },
    {
      term: "Roles",
      detail:
        "Viewers, builders and admins; connections are shared, never their secrets.",
    },
    { term: "Audit log", detail: "Who changed which step, when, with a diff." },
    {
      term: "Data residency",
      detail: "Choose US or EU hosting when you create the workspace.",
    },
  ],
  closeTitle: "Build one workflow in the demo. It takes about four minutes.",
  closeText:
    "The demo workspace runs in your browser with sample data. No account, nothing is sent.",
};

export const product = {
  title: "Product",
  heading: "One list of steps, from the trigger to the last message.",
  lede: "Flux is a workflow builder, a test bench and a run log in one place. Here is what each part does and why it is shaped that way.",
  sections: [
    {
      id: "builder",
      title: "The builder",
      text: "Pick a trigger from any connected app, then add conditions and actions underneath it. Steps read top to bottom, so a reviewer sees the whole workflow without zooming or panning. Reorder with the keyboard, rename anything, and every field from earlier steps is available below them.",
      points: [
        "Triggers from 15 apps, plus webhooks and schedules",
        "Conditions on numbers, text and dates",
        "Delays from one minute to 30 days",
      ],
    },
    {
      id: "test",
      title: "The test bench",
      text: "Each workflow carries a sample record. Change its values and run a test: Flux walks the steps, evaluates every condition against the sample and shows which actions would have run. Nothing leaves the test bench, so you can try edge cases on a Friday afternoon.",
      points: [
        "Sample records you can edit inline",
        "Step-by-step run log",
        "Skipped steps are shown, not hidden",
      ],
    },
    {
      id: "runs",
      title: "Run history",
      text: "Live runs are recorded with their inputs, each step's output and how long it took. Filter by workflow or outcome, open a run to see where it stopped, and replay failed runs once the cause is fixed.",
      points: [
        "30 days of history on Team, 365 on Business",
        "Replay one run or every failed run since a time",
        "Alerts to the owner in chat or email",
      ],
    },
    {
      id: "guardrails",
      title: "Guardrails",
      text: "Connections belong to the workspace, not to whoever set them up, and secrets are never shown again after they are saved. Roles decide who can edit live workflows. The audit log records every change with a readable diff.",
      points: [
        "Viewer, builder and admin roles",
        "Single sign-on and SCIM on Business",
        "US or EU data residency",
      ],
    },
  ],
};

export const pricing = {
  title: "Pricing",
  heading: "Pay for runs, not for seats you do not need.",
  lede: "A run is one trigger firing one workflow, however many steps follow. Test runs are always free.",
  plans: [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      yearly: 0,
      runs: 1000,
      blurb: "For trying Flux on one real process.",
      features: [
        "1,000 runs a month",
        "5 active workflows",
        "Schedules every 15 minutes",
        "7 days of run history",
        "2 builders",
      ],
      cta: "Start free",
    },
    {
      id: "team",
      name: "Team",
      monthly: 39,
      yearly: 32,
      runs: 10000,
      blurb: "For a team automating its daily handoffs.",
      features: [
        "10,000 runs a month",
        "Unlimited workflows",
        "Schedules every 2 minutes",
        "30 days of run history",
        "10 builders, unlimited viewers",
        "Replay failed runs",
      ],
      cta: "Start a 14-day trial",
    },
    {
      id: "business",
      name: "Business",
      monthly: 129,
      yearly: 108,
      runs: 50000,
      blurb: "For automation the company depends on.",
      features: [
        "50,000 runs a month",
        "Everything in Team",
        "Schedules every minute",
        "365 days of run history",
        "SSO, SCIM and audit log",
        "US or EU data residency",
      ],
      cta: "Talk to sales",
    },
  ],
  extraRuns:
    "Extra runs on Team and Business: $8 per 5,000, billed only if you go over.",
  compare: [
    { label: "Runs included per month", values: ["1,000", "10,000", "50,000"] },
    { label: "Active workflows", values: ["5", "Unlimited", "Unlimited"] },
    { label: "Fastest schedule", values: ["15 min", "2 min", "1 min"] },
    { label: "Run history", values: ["7 days", "30 days", "365 days"] },
    { label: "Builders", values: ["2", "10", "Unlimited"] },
    { label: "Premium connectors", values: ["—", "Included", "Included"] },
    { label: "Replay failed runs", values: ["—", "Included", "Included"] },
    { label: "SSO and SCIM", values: ["—", "—", "Included"] },
    { label: "Audit log", values: ["—", "—", "Included"] },
    { label: "Data residency", values: ["US", "US", "US or EU"] },
  ],
  faq: [
    {
      q: "What counts as a run?",
      a: "One trigger event starting one workflow. A five-step workflow that fires once is one run. A run stopped by a condition still counts, because the trigger did fire. Test runs in the builder never count.",
    },
    {
      q: "What happens if we go over our runs?",
      a: "On Free, workflows pause until the next month and the owner gets an email. On Team and Business, runs keep going and extra runs are billed at $8 per 5,000 at the end of the month.",
    },
    {
      q: "Can we switch between monthly and yearly?",
      a: "Yes, from the billing page at any time. Moving to yearly takes effect immediately with a pro-rated credit; moving to monthly applies at the end of the paid year.",
    },
    {
      q: "Do viewers need a paid seat?",
      a: "No. Anyone can view workflows and run history for free. Only people who edit workflows count as builders.",
    },
    {
      q: "Is there a discount for nonprofits or schools?",
      a: "Registered nonprofits and schools get Team at half price. Write to sales with your registration number.",
    },
  ],
  estimatorTitle: "How many runs will you need?",
  estimatorText:
    "Rough it out: how many times a day do your triggers fire across all workflows?",
};

export type Story = {
  slug: string;
  company: string;
  industry: string;
  size: string;
  headline: string;
  text: string;
  quote: string;
  person: string;
  role: string;
  templates: string[];
  color: string;
};

export const customers = {
  title: "Customers",
  heading: "Teams who stopped copying and pasting.",
  lede: "Four fictional companies, four very ordinary problems. What they automated first, and what changed.",
  stories: [
    {
      slug: "northgate-freight",
      company: "Northgate Freight",
      industry: "Logistics",
      size: "240 people",
      headline:
        "Weekly numbers used to take a morning. Now they arrive before the stand-up.",
      text: "Northgate's operations team built their first workflow to post depot totals every Monday. Within a month they had nineteen, including invoice approvals for carriers and a VIP lane for their largest shippers.",
      quote:
        "The test bench sold it. I could show finance exactly what would happen to a $40,000 invoice before anything was live.",
      person: "Imogen Vale",
      role: "Head of Operations",
      templates: ["weekly-numbers", "invoice-approval"],
      color: "#c2410c",
    },
    {
      slug: "fernhill-studio",
      company: "Fernhill Studio",
      industry: "Design agency",
      size: "38 people",
      headline:
        "New client projects start with the folder, the brief and the channel already there.",
      text: "Fernhill replaced a nine-item checklist with one workflow that starts when a deal is won. Project leads now spend the first hour with the client instead of setting up tools.",
      quote:
        "It reads like our checklist did, which is why the whole studio trusts it.",
      person: "Dario Lunn",
      role: "Studio Director",
      templates: ["new-hire-onboarding", "lead-routing"],
      color: "#15803d",
    },
    {
      slug: "quill-and-ledger",
      company: "Quill & Ledger",
      industry: "Accounting firm",
      size: "64 people",
      headline:
        "Failed renewals are followed up the same day, by a person who already knows.",
      text: "The firm's subscription clients pay by card. A failed payment now reaches the client manager and the client within minutes, and the account is flagged before the third retry.",
      quote:
        "We caught two-thirds of failed renewals in the first quarter. Before, we found out when the client asked why their portal was locked.",
      person: "Priya Anand",
      role: "Client Services Lead",
      templates: ["failed-payment", "invoice-approval"],
      color: "#7c3aed",
    },
    {
      slug: "tidewater-outfitters",
      company: "Tidewater Outfitters",
      industry: "Outdoor retail",
      size: "112 people",
      headline:
        "Urgent tickets reach on-call in under a minute, even at the weekend.",
      text: "Tidewater's small support team set a priority score on every ticket. Flux escalates anything above seven to whoever is on call and sends the customer a real response time.",
      quote:
        "Customers stopped writing in twice. That alone gave us back a day a week.",
      person: "Marcus Oyelaran",
      role: "Support Manager",
      templates: ["ticket-escalation", "vip-orders"],
      color: "#0369a1",
    },
  ] as Story[],
};

export const changelog = {
  title: "Changelog",
  heading: "What changed in Flux.",
  lede: "Shipped every other Tuesday. The demo workspace always runs the latest version.",
  entries: [
    {
      version: "4.12",
      date: "October 14, 2026",
      title: "Replay every failed run since a time",
      kind: "New",
      items: [
        "Run history has a new bulk action: replay all failed runs since a date and time you choose.",
        "Replays reuse the original trigger data and are marked in the log so they are easy to tell apart.",
      ],
    },
    {
      version: "4.11",
      date: "September 30, 2026",
      title: "Conditions on dates",
      kind: "New",
      items: [
        "Conditions can compare dates: before, after, and within the next N days.",
        "Delays can wait until a date taken from an earlier step.",
      ],
    },
    {
      version: "4.10",
      date: "September 16, 2026",
      title: "Faster test runs and clearer skipped steps",
      kind: "Improved",
      items: [
        "Test runs start in under 200 ms on most workflows.",
        "Skipped steps now say which condition stopped them.",
      ],
    },
    {
      version: "4.9",
      date: "September 2, 2026",
      title: "Stallfront connector",
      kind: "New",
      items: [
        "Trigger on paid orders, refunds and low stock; tag orders and update stock levels.",
      ],
    },
    {
      version: "4.8",
      date: "August 19, 2026",
      title: "Schedules respect daylight-saving changes",
      kind: "Fixed",
      items: [
        "Schedules set for 01:00–03:00 no longer run twice or not at all when clocks change.",
      ],
    },
    {
      version: "4.7",
      date: "August 5, 2026",
      title: "EU data residency on Business",
      kind: "New",
      items: [
        "New Business workspaces can choose EU hosting. Run data, connections and logs stay in the region.",
      ],
    },
  ],
};

export const about = {
  title: "About",
  heading: "We build the plumbing so teams can do the work.",
  story: [
    "Flux started in 2021 as an internal tool at a freight company, where three people spent their Mondays moving numbers between systems that would not talk to each other.",
    "The first version was a list of steps in a spreadsheet and a script that read it. It was ugly, and everyone could understand it. That is still the design brief: a workflow should read like the checklist it replaces.",
    "Today Flux is a team of 34 in Portland and Rotterdam. We are independent, profitable, and we answer support email ourselves.",
  ],
  principles: [
    {
      title: "Readable beats clever",
      text: "If a workflow needs a diagram to explain it, the builder has failed. We cut features that make workflows harder to review.",
    },
    {
      title: "Test before trust",
      text: "Nobody should switch something on without seeing it run. The test bench is free on every plan, forever.",
    },
    {
      title: "Fail loudly, recover quietly",
      text: "When a step breaks, the owner hears about it once, clearly. When it is fixed, replay does the rest.",
    },
  ],
  team: [
    { name: "Ines Barrow", role: "Co-founder, CEO", place: "Portland" },
    {
      name: "Tobias Wren",
      role: "Co-founder, Engineering",
      place: "Rotterdam",
    },
    { name: "Hana Mori", role: "Design", place: "Portland" },
    { name: "Calum Fisk", role: "Connectors", place: "Rotterdam" },
    { name: "Adaeze Okafor", role: "Customer support", place: "Portland" },
    { name: "Lucía Pérez", role: "Security & compliance", place: "Rotterdam" },
  ],
  offices: [
    {
      city: "Portland",
      lines: ["410 Wharf Street, Suite 6", "Portland, OR 97209"],
    },
    { city: "Rotterdam", lines: ["Maaskade 112", "3071 NK Rotterdam"] },
  ],
};

export const contact = {
  title: "Talk to sales",
  heading: "Tell us what you want to stop doing by hand.",
  lede: "A solutions engineer reads every request and replies within one working day with a suggested first workflow, not a slide deck.",
  sizes: ["1–10", "11–50", "51–200", "201–1,000", "More than 1,000"],
  interests: [
    "Team plan",
    "Business plan",
    "Migrating from another tool",
    "Nonprofit or school pricing",
    "Security review",
  ],
  expect: [
    "A reply from a person within one working day",
    "A suggested first workflow built from your description",
    "A 30-minute call only if you want one",
  ],
};

export const signin = {
  title: "Sign in",
  heading: "Sign in to Flux",
  lede: "Or skip the form and open the demo workspace — it runs with sample data in this browser.",
};

export const notFound = {
  title: "Page not found",
  heading: "This step has no next step.",
  text: "The page you asked for does not exist or has moved. Here are a few places that do.",
};

export const newsletter = {
  title: "The Flux digest",
  text: "One email a month: new connectors, a workflow worth copying, nothing else.",
};

/* ---------- Demo workspace ---------- */

export type Workflow = {
  id: string;
  name: string;
  team: string;
  owner: string;
  on: boolean;
  runs30: number;
  failed30: number;
  lastRun: string;
  edited: string;
  steps: Step[];
  sample: SampleField[];
};

const fromTemplate = (slug: string) => {
  const t = templates.find((x) => x.slug === slug)!;
  return {
    steps: t.steps.map((s) => ({ ...s, rule: s.rule && { ...s.rule } })),
    sample: t.sample.map((f) => ({ ...f })),
  };
};

export const demoWorkflows: Workflow[] = [
  {
    id: "wf-invoice",
    name: "Carrier invoice approvals",
    team: "Finance",
    owner: "Priya Anand",
    on: true,
    runs30: 1284,
    failed30: 3,
    lastRun: "4 min ago",
    edited: "Oct 12",
    ...fromTemplate("invoice-approval"),
  },
  {
    id: "wf-weekly",
    name: "Monday depot numbers",
    team: "Operations",
    owner: "Imogen Vale",
    on: true,
    runs30: 4,
    failed30: 0,
    lastRun: "Mon 08:00",
    edited: "Sep 3",
    ...fromTemplate("weekly-numbers"),
  },
  {
    id: "wf-leads",
    name: "Enterprise lead routing",
    team: "Sales",
    owner: "Jonah Reyes",
    on: true,
    runs30: 362,
    failed30: 0,
    lastRun: "18 min ago",
    edited: "Oct 2",
    ...fromTemplate("lead-routing"),
  },
  {
    id: "wf-tickets",
    name: "Urgent ticket escalation",
    team: "Support",
    owner: "Marcus Oyelaran",
    on: true,
    runs30: 918,
    failed30: 21,
    lastRun: "2 min ago",
    edited: "Oct 16",
    ...fromTemplate("ticket-escalation"),
  },
  {
    id: "wf-renewals",
    name: "Failed renewal follow-up",
    team: "Finance",
    owner: "Priya Anand",
    on: true,
    runs30: 146,
    failed30: 0,
    lastRun: "1 h ago",
    edited: "Aug 28",
    ...fromTemplate("failed-payment"),
  },
  {
    id: "wf-starters",
    name: "New starter first day",
    team: "People",
    owner: "Hana Mori",
    on: true,
    runs30: 7,
    failed30: 1,
    lastRun: "Yesterday",
    edited: "Oct 9",
    ...fromTemplate("new-hire-onboarding"),
  },
  {
    id: "wf-releases",
    name: "Release notes to #announcements",
    team: "Engineering",
    owner: "Tobias Wren",
    on: false,
    runs30: 0,
    failed30: 0,
    lastRun: "Sep 24",
    edited: "Sep 24",
    ...fromTemplate("release-notes"),
  },
  {
    id: "wf-vip",
    name: "VIP shipper thank-you",
    team: "Operations",
    owner: "Imogen Vale",
    on: true,
    runs30: 211,
    failed30: 0,
    lastRun: "36 min ago",
    edited: "Sep 19",
    ...fromTemplate("vip-orders"),
  },
];

export type RunStatus = "Succeeded" | "Stopped" | "Failed";
export type Run = {
  id: string;
  workflow: string;
  status: RunStatus;
  started: string;
  duration: number;
  steps: string;
  note: string;
};

const runNotes: Record<RunStatus, string[]> = {
  Succeeded: [
    "All actions completed",
    "All actions completed",
    "Approval received in 3 min",
  ],
  Stopped: ["Condition not met", "Condition not met"],
  Failed: [
    "Hallway returned 429, retries exhausted",
    "Ledgerline token expired",
  ],
};

// Deterministic demo history: 36 runs, newest first, ~4–14 minutes apart.
export const demoRuns: Run[] = Array.from({ length: 36 }, (_, i) => {
  const wf = demoWorkflows[[0, 3, 2, 0, 7, 3, 4, 0, 1, 3, 5, 2][i % 12]];
  const status: RunStatus =
    i % 11 === 4
      ? "Failed"
      : i % 3 === 1 && wf.steps.some((s) => s.kind === "condition")
        ? "Stopped"
        : "Succeeded";
  const m =
    9 * 60 +
    42 -
    Array.from({ length: i }, (_, k) => 4 + ((k * 7) % 11)).reduce(
      (a, b) => a + b,
      0,
    );
  const total = wf.steps.length;
  const ran =
    status === "Stopped" ? 2 : status === "Failed" ? total - 1 : total;
  return {
    id: `run-${(48213 - i * 17).toString()}`,
    workflow: wf.id,
    status,
    started: `Oct 18, ${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`,
    duration: 180 + ((i * 337) % 2400),
    steps: `${ran} of ${total}`,
    note: runNotes[status][i % runNotes[status].length],
  };
});

// Runs per day for the last 14 days, oldest first.
export const runsByDay = [
  { day: "Oct 5", ok: 88, failed: 1 },
  { day: "Oct 6", ok: 74, failed: 0 },
  { day: "Oct 7", ok: 112, failed: 2 },
  { day: "Oct 8", ok: 126, failed: 1 },
  { day: "Oct 9", ok: 131, failed: 4 },
  { day: "Oct 10", ok: 118, failed: 0 },
  { day: "Oct 11", ok: 69, failed: 0 },
  { day: "Oct 12", ok: 61, failed: 1 },
  { day: "Oct 13", ok: 140, failed: 2 },
  { day: "Oct 14", ok: 152, failed: 9 },
  { day: "Oct 15", ok: 147, failed: 3 },
  { day: "Oct 16", ok: 158, failed: 1 },
  { day: "Oct 17", ok: 133, failed: 2 },
  { day: "Oct 18", ok: 57, failed: 1 },
];

export const members = [
  { name: "Imogen Vale", email: "imogen@northgate.example", role: "Admin" },
  { name: "Priya Anand", email: "priya@northgate.example", role: "Builder" },
  {
    name: "Marcus Oyelaran",
    email: "marcus@northgate.example",
    role: "Builder",
  },
  { name: "Jonah Reyes", email: "jonah@northgate.example", role: "Builder" },
  { name: "Hana Mori", email: "hana@northgate.example", role: "Viewer" },
];

export const appNav = [
  { to: "/app", label: "Overview" },
  { to: "/app/workflows", label: "Workflows" },
  { to: "/app/runs", label: "Run history" },
  { to: "/app/settings", label: "Settings" },
];

export const usage = {
  used: 1843,
  included: 10000,
  plan: "Team",
  today: "Saturday, October 18",
};
