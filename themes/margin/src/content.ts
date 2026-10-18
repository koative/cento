// Every word and figure on the site lives here. Rebranding Margin means editing this file.
// All people, companies and results are fictional demonstration content.

export const brand = {
  name: "Margin",
  sector: "Product designer portfolio",
  person: "Nora Vale",
  role: "Independent product designer",
  city: "Portland, Oregon",
  timezone: "Pacific Time (UTC−8)",
  email: "hello@margin.example",
  phone: "+1 555 0148 220",
  phoneHref: "tel:+15550148220",
  availability: "Booking engagements from January 2027",
  availabilityShort: "Booking Jan 2027",
};

export const nav = [
  { to: "/work", label: "Case studies" },
  { to: "/playground", label: "Playground" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Résumé" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
  { label: "GitHub", href: "https://github.com/" },
];

export const footerColumns = [
  {
    title: "Work",
    links: [
      { to: "/work", label: "All case studies" },
      { to: "/work/fernway-tickets", label: "Fernway Rail" },
      { to: "/work/pennant-invoices", label: "Pennant" },
      { to: "/playground", label: "Playground" },
    ],
  },
  {
    title: "Practice",
    links: [
      { to: "/about", label: "About Nora" },
      { to: "/resume", label: "Résumé" },
      { to: "/contact", label: "Start a project" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "Notes from the margin",
  text: "A short letter every other month: one decision from a live project, one tool from the playground, nothing else.",
};

/* ------------------------------------------------------------------ */
/* Case studies                                                         */
/* ------------------------------------------------------------------ */

export type Block =
  | { t: "bar"; title: string; back?: boolean; action?: string }
  | { t: "title"; text: string; sub?: string }
  | { t: "tabs"; items: string[]; active: number }
  | { t: "field"; label: string; value: string; hint?: string }
  | { t: "chips"; items: string[]; active?: number }
  | {
      t: "list";
      items: { title: string; meta?: string; value?: string; tag?: string }[];
    }
  | { t: "stat"; label: string; value: string; meta?: string }
  | { t: "progress"; label: string; value: number; meta: string }
  | { t: "chart"; label: string; values: number[]; labels: string[] }
  | { t: "banner"; text: string }
  | { t: "button"; label: string; secondary?: string };

export type Screen = {
  device: "phone" | "desktop";
  /** Caption and accessible name of the mockup. */
  label: string;
  dark?: boolean;
  /** Desktop sidebar items; the first is the current section. */
  nav?: string[];
  blocks: Block[];
  /** Annotations pinned to a block index — shown as redline pins and margin notes. */
  notes: { at: number; text: string }[];
};

export const disciplines = [
  "Mobile app",
  "Web app",
  "Design system",
  "Research",
] as const;
export type Discipline = (typeof disciplines)[number];

export type Case = {
  slug: string;
  title: string;
  client: string;
  /** One line: what changed for people. */
  outcomeLine: string;
  sector: string;
  disciplines: Discipline[];
  platform: string;
  year: number;
  duration: string;
  role: string;
  team: string;
  /** The client's brand colour, used inside its mockups only. */
  accent: string;
  summary: string;
  brief: string[];
  insights: string[];
  outcomes: { figure: string; text: string }[];
  screens: [Screen, Screen];
  decisions: { title: string; body: string }[];
  timeline: { weeks: string; phase: string; detail: string }[];
  reflection: string;
  quote: { text: string; by: string };
  credits: string[];
};

export const cases: Case[] = [
  {
    slug: "fernway-tickets",
    title: "A ticket you can buy on the platform",
    client: "Fernway Rail",
    outcomeLine:
      "Ticket purchase in moderated tests fell from 2 min 40 s to 58 s.",
    sector: "Mobility",
    disciplines: ["Mobile app", "Research"],
    platform: "iOS & Android",
    year: 2026,
    duration: "14 weeks",
    role: "Lead product designer",
    team: "2 designers, 1 researcher, 6 engineers",
    accent: "#1d6b58",
    summary:
      "Fernway's commuter app sold tickets through six screens that assumed you were at home, planning ahead. Most people were standing on a platform with a train in sight. We rebuilt the purchase flow around that moment.",
    brief: [
      "Fernway runs eleven regional lines and sells 40% of its tickets in the app. Reviews kept repeating one sentence in different words: the train left while I was still buying the ticket.",
      "The brief from the product lead was narrow on purpose — no new features, no rebrand, one flow. Make buying a single or return ticket fast enough to do between the station door and the train door.",
    ],
    insights: [
      "71% of purchases happened within 200 metres of a station, most of them in the four minutes before departure.",
      "People chose Anytime fares they didn't need because the app made them prove eligibility for Off-peak.",
      "The conductor check was its own source of stress: riders screenshotted tickets because they didn't trust the app to open fast.",
    ],
    outcomes: [
      {
        figure: "58 s",
        text: "median time to a valid ticket in moderated tests, down from 2 min 40 s",
      },
      {
        figure: "−38%",
        text: "fewer Anytime fares bought for off-peak journeys in the first month",
      },
      {
        figure: "4.6",
        text: "store rating after launch, up from 3.1, with no new features added",
      },
    ],
    screens: [
      {
        device: "phone",
        label: "Fernway — Buy a ticket",
        blocks: [
          { t: "bar", title: "Tickets", action: "History" },
          { t: "tabs", items: ["Single", "Return", "Flexi 10"], active: 0 },
          {
            t: "field",
            label: "From",
            value: "Harbour Street",
            hint: "Nearest station, 90 m",
          },
          { t: "field", label: "To", value: "Millbrook" },
          {
            t: "list",
            items: [
              {
                title: "Off-peak single",
                meta: "Valid now until 23:59",
                value: "$5.20",
                tag: "Cheapest",
              },
              {
                title: "Anytime single",
                meta: "Any train today",
                value: "$7.80",
              },
            ],
          },
          { t: "button", label: "Pay $5.20", secondary: "Visa ending 4417" },
        ],
        notes: [
          {
            at: 2,
            text: "From is pre-filled with the nearest station. Seven in ten purchases start within 200 m of one.",
          },
          {
            at: 4,
            text: "Off-peak shows first whenever it's valid. We stopped asking people to prove they deserve the cheaper fare.",
          },
          {
            at: 5,
            text: "One tap from a saved card. The old flow asked for the card's security code every time.",
          },
        ],
      },
      {
        device: "phone",
        label: "Fernway — Your ticket",
        blocks: [
          { t: "bar", title: "Your ticket", back: true },
          {
            t: "banner",
            text: "Valid now · show this screen to the conductor",
          },
          {
            t: "title",
            text: "Harbour St → Millbrook",
            sub: "Off-peak single · 1 adult",
          },
          {
            t: "stat",
            label: "Next train",
            value: "08:51",
            meta: "Platform 2 · on time",
          },
          {
            t: "progress",
            label: "Journey",
            value: 0.38,
            meta: "3 of 8 stops",
          },
          { t: "button", label: "Add to wallet" },
        ],
        notes: [
          {
            at: 1,
            text: "The validity line is the first thing a conductor reads, so it sits above the route.",
          },
          {
            at: 3,
            text: "Platform and status come from the live feed; the ticket doubles as a departure board.",
          },
          {
            at: 5,
            text: "Wallet passes open offline. That ended the screenshot habit in a fortnight.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Design for the platform, not the sofa",
        body: "We tested every iteration standing up, phone in one hand, a stopwatch running and a departure board on a laptop counting down. Anything that needed two hands or a second look was cut.",
      },
      {
        title: "The ticket is also the timetable",
        body: "Once bought, the ticket shows the next train and its platform. Riders stopped switching between the app and the station screens, and support calls about missed connections halved.",
      },
    ],
    timeline: [
      {
        weeks: "Weeks 1–3",
        phase: "Platform research",
        detail:
          "Intercepts at four stations, 38 short interviews, purchase-log analysis.",
      },
      {
        weeks: "Weeks 4–7",
        phase: "Flow and prototypes",
        detail: "Three competing flows, timed tests with 24 commuters.",
      },
      {
        weeks: "Weeks 8–12",
        phase: "Build with engineering",
        detail:
          "Weekly builds, accessibility review with two screen-reader users.",
      },
      {
        weeks: "Weeks 13–14",
        phase: "Staged launch",
        detail: "10% rollout on two lines, then everyone.",
      },
    ],
    reflection:
      "I'd bring the conductors in earlier. We only spoke to them in week nine, and their one request — a bigger validity line — would have saved us a round of revisions.",
    quote: {
      text: "Nora kept a stopwatch on the table for three months. It was annoying and it was right.",
      by: "Dana Whitcombe, Head of Digital, Fernway Rail",
    },
    credits: [
      "Research with Imogen Lacey",
      "Engineering lead: Tomás Reyes",
      "Illustration system: in-house brand team",
    ],
  },
  {
    slug: "pennant-invoices",
    title: "Invoices that get paid on time",
    client: "Pennant",
    outcomeLine:
      "Average days-to-paid dropped from 31 to 19 for small studios.",
    sector: "Fintech",
    disciplines: ["Web app"],
    platform: "Web",
    year: 2025,
    duration: "5 months",
    role: "Senior product designer, contract",
    team: "1 designer, 1 PM, 5 engineers",
    accent: "#2a46c2",
    summary:
      "Pennant is a business account for studios of two to twenty people. Its invoicing worked, but nobody chased late payments because the product made chasing feel like confrontation. We redesigned invoicing around getting paid, not sending.",
    brief: [
      "Pennant's invoicing tool had good adoption and a quiet problem: a third of invoices were paid late, and owners told us they avoided sending reminders because it felt rude.",
      "The goal was set in money, not features — shorten the time from sent to paid without adding a collections product.",
    ],
    insights: [
      "Owners wrote reminders by hand in their own email client, often a week later than they meant to.",
      "Clients paid faster when the invoice carried a payment link than when it carried bank details.",
      "The overdue list was sorted by date sent, which buried the invoices that mattered most.",
    ],
    outcomes: [
      {
        figure: "19 days",
        text: "average time from sent to paid, down from 31 days",
      },
      {
        figure: "64%",
        text: "of overdue invoices now get a reminder within 48 hours",
      },
      {
        figure: "0",
        text: "new screens added — the work happened inside the existing invoice flow",
      },
    ],
    screens: [
      {
        device: "desktop",
        label: "Pennant — Invoices",
        nav: ["Invoices", "Home", "Clients", "Payouts", "Settings"],
        blocks: [
          { t: "bar", title: "Invoices", action: "New invoice" },
          {
            t: "chips",
            items: ["All 48", "Draft 3", "Overdue 5", "Paid 40"],
            active: 2,
          },
          {
            t: "stat",
            label: "Overdue",
            value: "$12,480",
            meta: "5 invoices · oldest 12 days",
          },
          {
            t: "list",
            items: [
              {
                title: "Hollow Oak Coffee",
                meta: "INV-0192 · 12 days late",
                value: "$4,200",
                tag: "Remind",
              },
              {
                title: "Larkspur Dental",
                meta: "INV-0188 · 6 days late",
                value: "$3,150",
                tag: "Reminder sent",
              },
              {
                title: "Northgate Climbing",
                meta: "INV-0185 · 2 days late",
                value: "$1,980",
                tag: "Remind",
              },
            ],
          },
          {
            t: "chart",
            label: "Paid per month",
            values: [62, 48, 71, 55, 80, 92],
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          },
        ],
        notes: [
          {
            at: 1,
            text: "Overdue became a filter with a count, not a red badge. The number does the nudging.",
          },
          {
            at: 3,
            text: "Sorted by amount owed, then lateness. The invoice that matters most is always on top.",
          },
          {
            at: 3,
            text: "Remind writes the message for you in a friendly, editable tone. Owners send it in one click.",
          },
        ],
      },
      {
        device: "desktop",
        label: "Pennant — New invoice",
        nav: ["Invoices", "Home", "Clients", "Payouts", "Settings"],
        blocks: [
          { t: "bar", title: "New invoice", back: true, action: "Preview" },
          { t: "field", label: "Client", value: "Hollow Oak Coffee" },
          {
            t: "field",
            label: "Due",
            value: "Net 14 — Mar 28",
            hint: "This client usually pays in 11 days",
          },
          {
            t: "list",
            items: [
              {
                title: "Menu redesign",
                meta: "3 days × $950",
                value: "$2,850",
              },
              { title: "Print production", meta: "Fixed", value: "$1,350" },
            ],
          },
          {
            t: "banner",
            text: "Payment link included — clients with a link pay 9 days sooner",
          },
          {
            t: "button",
            label: "Send invoice",
            secondary: "Schedule a reminder for Mar 29",
          },
        ],
        notes: [
          {
            at: 2,
            text: "Each client's payment history sets the default terms. Slow payers get shorter terms, quietly.",
          },
          {
            at: 4,
            text: "The payment link is on by default and explained in one line, not a settings page.",
          },
          {
            at: 5,
            text: "The first reminder is scheduled at send time, so nobody has to remember to be firm.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Make the reminder someone else's idea",
        body: "Reminders are scheduled when the invoice is sent and signed by Pennant, not the owner. Owners told us this single change made them comfortable chasing at all.",
      },
      {
        title: "Sort by what's at stake",
        body: "The overdue view sorts by amount, then lateness. A studio's two biggest invoices are usually most of its month; they now sit at the top of the screen.",
      },
    ],
    timeline: [
      {
        weeks: "Month 1",
        phase: "Money research",
        detail:
          "Twelve owner interviews and a diary study of a month's invoicing.",
      },
      {
        weeks: "Month 2",
        phase: "Concepts",
        detail:
          "Reminder tone tests with real clients of three participating studios.",
      },
      {
        weeks: "Months 3–4",
        phase: "Build",
        detail: "Shipped behind a flag to 400 accounts.",
      },
      {
        weeks: "Month 5",
        phase: "Measure",
        detail: "Compared days-to-paid against a holdout group.",
      },
    ],
    reflection:
      "We measured days-to-paid but not how the reminders felt to the people receiving them. A short survey of payers would have told us whether we'd moved the awkwardness rather than removed it.",
    quote: {
      text: "She talked us out of building a collections product. The invoices fixed themselves instead.",
      by: "Priya Anand, Product Lead, Pennant",
    },
    credits: [
      "PM: Callum Ferris",
      "Copy partner: Ruth Okonjo",
      "Data: Pennant analytics team",
    ],
  },
  {
    slug: "hollis-check-in",
    title: "Check-in without the clipboard",
    client: "Hollis Health",
    outcomeLine:
      "Front-desk queue time at three clinics fell by 11 minutes per patient.",
    sector: "Health",
    disciplines: ["Mobile app", "Research"],
    platform: "iOS, Android & clinic tablets",
    year: 2025,
    duration: "10 weeks",
    role: "Product designer",
    team: "1 designer, 1 nurse lead, 4 engineers",
    accent: "#7d3363",
    summary:
      "Hollis runs nine family clinics. Every visit started with a clipboard, a pen that didn't work and the same six questions as last time. We moved check-in to the patient's phone and kept a tablet at the desk for everyone else.",
    brief: [
      "Front-desk staff spent the first ten minutes of each appointment copying paper forms into the record system. Patients waited, doctors waited, and errors crept in.",
      "The brief was to digitise check-in without leaving behind the patients who don't use apps — about a quarter of Hollis's patients are over seventy.",
    ],
    insights: [
      "Most answers didn't change between visits; patients only needed to confirm them.",
      "Older patients were happy to use a tablet if a person stood beside them for the first time.",
      "The most important question — 'what brings you in today' — was the one most often left blank.",
    ],
    outcomes: [
      {
        figure: "11 min",
        text: "less queue time per patient across three pilot clinics",
      },
      {
        figure: "82%",
        text: "of patients checked in on their own phone within two months",
      },
      {
        figure: "3×",
        text: "more visits arriving with a reason for the visit filled in",
      },
    ],
    screens: [
      {
        device: "phone",
        label: "Hollis — Check in",
        blocks: [
          { t: "bar", title: "Check in", back: true },
          {
            t: "progress",
            label: "Step 2 of 3",
            value: 0.66,
            meta: "About 1 minute left",
          },
          {
            t: "title",
            text: "What brings you in today?",
            sub: "Dr. Okafor will read this before your visit",
          },
          {
            t: "chips",
            items: ["Follow-up", "New pain", "Prescription", "Something else"],
            active: 1,
          },
          {
            t: "field",
            label: "In your own words",
            value: "Lower back, since Saturday",
          },
          {
            t: "button",
            label: "Continue",
            secondary: "Nothing has changed since last time",
          },
        ],
        notes: [
          {
            at: 1,
            text: "Three steps, always. Telling people the time left halved drop-offs at step two.",
          },
          {
            at: 2,
            text: "Naming the doctor who reads the answer made people write real answers.",
          },
          {
            at: 5,
            text: "Returning patients can confirm last visit's answers in one tap.",
          },
        ],
      },
      {
        device: "phone",
        label: "Hollis — You're checked in",
        blocks: [
          { t: "bar", title: "Today" },
          { t: "banner", text: "Dr. Okafor is running about 10 minutes late" },
          {
            t: "title",
            text: "You're checked in",
            sub: "Tuesday, 2:30 pm · Room 4",
          },
          {
            t: "stat",
            label: "Your place",
            value: "2nd",
            meta: "Estimated 2:42 pm",
          },
          {
            t: "list",
            items: [
              { title: "Insurance card", meta: "Confirmed Mar 2", tag: "Done" },
              { title: "Medication list", meta: "3 items", tag: "Done" },
            ],
          },
          {
            t: "button",
            label: "I've stepped outside",
            secondary: "We'll text you when it's your turn",
          },
        ],
        notes: [
          {
            at: 1,
            text: "Lateness is announced before the patient asks. Desk staff stopped fielding the question.",
          },
          {
            at: 3,
            text: "A place in line, not a countdown: estimates in clinics are too unreliable to show to the minute.",
          },
          {
            at: 5,
            text: "Patients can wait in the car or the café. The waiting room is no longer the only option.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Confirm, don't re-ask",
        body: "Returning patients see last visit's answers and confirm them. Only what has changed needs typing, and the reason for visit is the one question always asked fresh.",
      },
      {
        title: "A tablet with a person beside it",
        body: "The clinic tablet runs the same flow in larger type. For a patient's first visit, a staff member sits with them. After that, most of them use their own phone.",
      },
    ],
    timeline: [
      {
        weeks: "Weeks 1–2",
        phase: "Front-desk shadowing",
        detail: "Two full days at three clinics, timing every check-in.",
      },
      {
        weeks: "Weeks 3–5",
        phase: "Prototype",
        detail: "Paper prototypes with patients aged 22 to 91.",
      },
      {
        weeks: "Weeks 6–9",
        phase: "Pilot",
        detail: "Three clinics, with a nurse lead collecting feedback daily.",
      },
      {
        weeks: "Week 10",
        phase: "Roll-out plan",
        detail: "Training guide for desk staff and a one-page patient letter.",
      },
    ],
    reflection:
      "We designed for patients and the front desk but treated doctors as readers. A shared summary screen for the consulting room would have closed the loop.",
    quote: {
      text: "The first redesign our front desk asked to keep after the pilot.",
      by: "Marisol Grant, Operations Director, Hollis Health",
    },
    credits: [
      "Nurse lead: Ade Bankole",
      "Accessibility audit: Field Notes Studio",
      "Engineering: Hollis platform team",
    ],
  },
  {
    slug: "commonplace-system",
    title: "One design system, forty engineers",
    client: "Commonplace",
    outcomeLine:
      "Time to ship a new screen dropped from about nine days to four.",
    sector: "Productivity",
    disciplines: ["Design system", "Web app"],
    platform: "Web, desktop & mobile",
    year: 2024,
    duration: "9 months",
    role: "Design system lead",
    team: "2 designers, 3 front-end engineers",
    accent: "#a84a17",
    summary:
      "Commonplace is a notes app with four clients and three button components that disagreed with each other. We built one system, documented it where engineers already worked, and retired 61% of the custom CSS.",
    brief: [
      "After three years of fast growth, Commonplace had four clients built by four teams. Each had its own button, its own greys and its own idea of what 'compact' meant.",
      "The brief: one system that engineers would choose to use, adopted across all four clients within a year, without a big-bang rewrite.",
    ],
    insights: [
      "Engineers didn't avoid the old components out of stubbornness; they couldn't find them.",
      "Most visual inconsistency came from eleven slightly different greys, not from components.",
      "Teams adopted components fastest when the first version replaced something they already hated maintaining.",
    ],
    outcomes: [
      {
        figure: "4 days",
        text: "median time to ship a new screen, down from about nine",
      },
      { figure: "61%", text: "of custom CSS deleted across the four clients" },
      {
        figure: "11 → 4",
        text: "greys in production, each with a name and a job",
      },
    ],
    screens: [
      {
        device: "desktop",
        label: "Commonplace — Button documentation",
        nav: ["Button", "Tokens", "Text field", "Menu", "Dialog"],
        blocks: [
          { t: "bar", title: "Button", action: "Copy import" },
          { t: "tabs", items: ["Usage", "Props", "Accessibility"], active: 0 },
          {
            t: "title",
            text: "Use one primary button per view",
            sub: "Secondary actions use the quiet variant",
          },
          {
            t: "chips",
            items: ["Primary", "Quiet", "Danger", "Icon only"],
            active: 0,
          },
          { t: "button", label: "Save note", secondary: "Discard changes" },
        ],
        notes: [
          {
            at: 1,
            text: "Accessibility is a tab of its own, not a footnote. Engineers read it before shipping.",
          },
          {
            at: 2,
            text: "Every page leads with the rule, then the example. Guidance first, gallery second.",
          },
          {
            at: 3,
            text: "Four variants. We retired nine, each with a codemod so nobody had to migrate by hand.",
          },
        ],
      },
      {
        device: "desktop",
        label: "Commonplace — Colour tokens",
        nav: ["Tokens", "Button", "Text field", "Menu", "Dialog"],
        blocks: [
          { t: "bar", title: "Colour tokens", action: "Export" },
          { t: "chips", items: ["Light", "Dark", "High contrast"], active: 0 },
          {
            t: "list",
            items: [
              {
                title: "ink.primary",
                meta: "Body text, icons",
                value: "#1F1D1A",
                tag: "15.8 : 1",
              },
              {
                title: "ink.secondary",
                meta: "Metadata, captions",
                value: "#5C5852",
                tag: "6.9 : 1",
              },
              { title: "line.subtle", meta: "Dividers only", value: "#E3DFD8" },
              {
                title: "accent.focus",
                meta: "Focus ring, selection",
                value: "#A84A17",
                tag: "4.9 : 1",
              },
            ],
          },
          {
            t: "banner",
            text: "Raw hex values fail the lint step — use a token name",
          },
        ],
        notes: [
          {
            at: 1,
            text: "Three themes from one token set. High contrast shipped first, because one engineer needed it.",
          },
          {
            at: 2,
            text: "Each token states its job and its contrast on the default surface. Eleven greys became four.",
          },
          {
            at: 3,
            text: "A lint rule catches raw values in review, so the system holds without policing.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Documentation where engineers already are",
        body: "Usage notes live in the component's editor tooltip and in the pull-request checklist, with the website as the long version. Adoption tripled once docs met people in their own tools.",
      },
      {
        title: "Retire, don't add",
        body: "Every new component shipped with a codemod that replaced an old one. The system grew by deleting code, which made it an easy sell in planning meetings.",
      },
    ],
    timeline: [
      {
        weeks: "Months 1–2",
        phase: "Audit",
        detail:
          "Screenshots of every screen in four clients, grouped and counted.",
      },
      {
        weeks: "Months 3–5",
        phase: "Foundations",
        detail:
          "Tokens, type and the six components that covered 70% of screens.",
      },
      {
        weeks: "Months 6–8",
        phase: "Adoption",
        detail:
          "Pairing sessions with each client team, one codemod at a time.",
      },
      {
        weeks: "Month 9",
        phase: "Handover",
        detail: "Contribution guide and a rotating system owner in each team.",
      },
    ],
    reflection:
      "We waited too long to involve the mobile team, whose platform conventions were stronger than ours. Their components are still a parallel set, and that's on the plan, not on them.",
    quote: {
      text: "The design system is the only internal project people thank us for.",
      by: "Jun Park, VP Engineering, Commonplace",
    },
    credits: [
      "System engineers: Lea Holm, Arjun Mehta, Sol Ferreira",
      "Icon set redrawn with Theo Vance",
    ],
  },
  {
    slug: "quarry-dispatch",
    title: "A dispatch board for the night shift",
    client: "Quarry Freight",
    outcomeLine:
      "Unassigned loads at the 22:40 cut-off fell from nine a night to two.",
    sector: "Logistics",
    disciplines: ["Web app", "Research"],
    platform: "Web & driver app",
    year: 2024,
    duration: "6 months",
    role: "Lead product designer",
    team: "1 designer, 1 researcher, 7 engineers",
    accent: "#c58b14",
    summary:
      "Quarry's depot dispatchers ran the night on a spreadsheet, a radio and memory. We designed a board for a dark control room, a 22:40 deadline and people who can't afford to misread a number.",
    brief: [
      "Quarry Freight runs six depots. Each night, two dispatchers assign 140 loads to 60 drivers before the 22:40 cut-off. Loads that miss it wait a full day.",
      "The existing tool was a shared spreadsheet. The brief: a board that shows what's at risk before it's late.",
    ],
    insights: [
      "Control rooms are dim on purpose; white screens made dispatchers squint and dim their monitors to the floor.",
      "Dispatchers scan for exceptions, not totals — the 'everything's fine' rows were noise.",
      "Drivers called in for one fact more than any other: where the next stop's loading bay is.",
    ],
    outcomes: [
      {
        figure: "2",
        text: "unassigned loads at cut-off on an average night, down from nine",
      },
      {
        figure: "−45%",
        text: "radio calls between dispatch and drivers during the night shift",
      },
      {
        figure: "6 / 6",
        text: "depots running on the board, replacing the spreadsheet",
      },
    ],
    screens: [
      {
        device: "desktop",
        label: "Quarry — Tonight at Depot 4",
        dark: true,
        nav: ["Tonight", "Drivers", "Loads", "Depots", "Reports"],
        blocks: [
          { t: "bar", title: "Tonight · Depot 4", action: "Assign" },
          {
            t: "banner",
            text: "3 loads unassigned · 52 min to the 22:40 cut-off",
          },
          {
            t: "stat",
            label: "Loads assigned",
            value: "137 / 140",
            meta: "58 of 60 drivers on shift",
          },
          {
            t: "list",
            items: [
              {
                title: "Load 4471 · Bayside Wholesale",
                meta: "2 pallets · chilled",
                value: "21:48",
                tag: "No driver",
              },
              {
                title: "Load 4468 · Kerr Hardware",
                meta: "6 pallets",
                value: "21:55",
                tag: "No driver",
              },
              {
                title: "Load 4463 · Ostra Foods",
                meta: "1 pallet · fragile",
                value: "22:05",
                tag: "No driver",
              },
            ],
          },
        ],
        notes: [
          {
            at: 1,
            text: "The cut-off countdown is the only thing on the board that moves. Everything else holds still.",
          },
          {
            at: 3,
            text: "Only exceptions are listed. Assigned loads live one click away, not in the dispatcher's eyeline.",
          },
          {
            at: 0,
            text: "A dark board for a dark room, with amber reserved for 'act now'. Contrast checked at 20% screen brightness.",
          },
        ],
      },
      {
        device: "phone",
        label: "Quarry — Driver's next stop",
        dark: true,
        blocks: [
          { t: "bar", title: "Next stop" },
          {
            t: "title",
            text: "Ostra Foods",
            sub: "14 Wharf Road · Bay C, rear entrance",
          },
          {
            t: "stat",
            label: "Arrive by",
            value: "23:20",
            meta: "18 min drive",
          },
          {
            t: "list",
            items: [
              {
                title: "1 pallet · fragile",
                meta: "Load 4463",
                tag: "Scan at bay",
              },
            ],
          },
          { t: "button", label: "I've arrived", secondary: "Call the depot" },
        ],
        notes: [
          {
            at: 1,
            text: "The loading bay is part of the address. It was the single most common radio question.",
          },
          {
            at: 4,
            text: "Large targets for gloved hands; tested in a cab with the engine running.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Design for 20% brightness",
        body: "Every colour was checked on a monitor dimmed the way dispatchers actually set them. Amber means act now and nothing else uses it.",
      },
      {
        title: "Show what's at risk, hide what's fine",
        body: "The board lists only loads that need a decision. A quiet total confirms the rest, so a busy night looks calm until something genuinely isn't.",
      },
    ],
    timeline: [
      {
        weeks: "Month 1",
        phase: "Night shifts",
        detail: "Six overnight shadowing sessions across three depots.",
      },
      {
        weeks: "Months 2–3",
        phase: "Board prototypes",
        detail: "Tested live alongside the spreadsheet for two weeks.",
      },
      {
        weeks: "Months 4–5",
        phase: "Driver app",
        detail: "Next-stop screen tested in cabs on real routes.",
      },
      {
        weeks: "Month 6",
        phase: "Depot roll-out",
        detail: "One depot a week, with the spreadsheet as backup.",
      },
    ],
    reflection:
      "The board assumes two dispatchers. Depots with one person on shift needed a different rhythm of alerts, and we learned that only after roll-out.",
    quote: {
      text: "First tool in twenty years of nights that didn't make me squint.",
      by: "Ray Delgado, Senior Dispatcher, Quarry Freight",
    },
    credits: [
      "Research: Hana Sato",
      "Driver app engineering: Quarry mobile team",
      "Fleet data: Quarry operations",
    ],
  },
  {
    slug: "sprig-substitutions",
    title: "Substitutions people actually accept",
    client: "Sprig Grocer",
    outcomeLine:
      "Accepted substitutions rose from 41% to 77% of out-of-stock items.",
    sector: "Retail",
    disciplines: ["Mobile app", "Research"],
    platform: "iOS & Android",
    year: 2023,
    duration: "8 weeks",
    role: "Product designer & researcher",
    team: "1 designer, 1 PM, 3 engineers",
    accent: "#3d7a2a",
    summary:
      "When Sprig ran out of something, a picker chose a replacement and the customer found out at the door. Most refused it. We moved the choice to the customer, while the order was still being picked.",
    brief: [
      "Sprig delivers groceries within two hours. On an average order, three items are out of stock, and refused substitutions were Sprig's largest single source of waste.",
      "The brief was to raise acceptance without slowing pickers down.",
    ],
    insights: [
      "Customers didn't object to substitutions; they objected to surprises.",
      "Price differences under fifty cents never changed a decision. Brand and size always did.",
      "Pickers already knew the right swap most of the time — they just had no way to ask.",
    ],
    outcomes: [
      { figure: "77%", text: "of substitutions accepted, up from 41%" },
      { figure: "−30%", text: "fewer items returned at the door" },
      { figure: "+0 s", text: "added to average picking time per order" },
    ],
    screens: [
      {
        device: "phone",
        label: "Sprig — Your order is being picked",
        blocks: [
          { t: "bar", title: "Order #20418" },
          {
            t: "progress",
            label: "Picking",
            value: 0.7,
            meta: "14 of 20 items",
          },
          {
            t: "banner",
            text: "Oat milk 1 L is out of stock — Lena suggests a swap",
          },
          {
            t: "list",
            items: [
              {
                title: "Barista oat milk 1 L",
                meta: "Same brand, creamier",
                value: "+$0.40",
                tag: "Suggested",
              },
              {
                title: "Oat milk 2 × 500 ml",
                meta: "Same product, two cartons",
                value: "+$0.90",
              },
            ],
          },
          { t: "button", label: "Accept swap", secondary: "Skip this item" },
        ],
        notes: [
          {
            at: 2,
            text: "The picker has a name. A person asking reads differently from an algorithm deciding.",
          },
          {
            at: 3,
            text: "Two options, never more. A third choice tripled response time in testing.",
          },
          {
            at: 4,
            text: "No answer in five minutes means the suggested swap, as the customer chose in settings.",
          },
        ],
      },
      {
        device: "phone",
        label: "Sprig — Substitution preferences",
        blocks: [
          { t: "bar", title: "Substitutions", back: true },
          {
            t: "title",
            text: "If something's out of stock",
            sub: "You can change this on any order",
          },
          { t: "chips", items: ["Ask me", "Best match", "Skip it"], active: 0 },
          {
            t: "list",
            items: [
              {
                title: "Never swap",
                meta: "Baby formula, medicine",
                tag: "2 items",
              },
              {
                title: "Any brand is fine",
                meta: "Bananas, eggs, flour",
                tag: "8 items",
              },
            ],
          },
          {
            t: "field",
            label: "Note for your picker",
            value: "Riper avocados are better than none",
          },
        ],
        notes: [
          {
            at: 2,
            text: "Three defaults in plain words. 'Ask me' is pre-selected for first orders.",
          },
          {
            at: 3,
            text: "Per-item rules for the few things people feel strongly about.",
          },
          {
            at: 4,
            text: "The note goes straight to the picker's handset, verbatim.",
          },
        ],
      },
    ],
    decisions: [
      {
        title: "Ask while it still matters",
        body: "The question arrives while the picker is still in the aisle, so a 'no' costs nothing. At the door, the same 'no' meant a wasted item and a missing ingredient.",
      },
      {
        title: "Brand and size, not price",
        body: "The swap card leads with what changed about the product. Price comes last and small, because research showed it rarely changed the answer.",
      },
    ],
    timeline: [
      {
        weeks: "Weeks 1–2",
        phase: "Door-step research",
        detail:
          "Rode along on 30 deliveries; logged every refusal and its reason.",
      },
      {
        weeks: "Weeks 3–5",
        phase: "Picker + customer prototype",
        detail: "Linked prototypes tested in one store with live orders.",
      },
      {
        weeks: "Weeks 6–8",
        phase: "Ship",
        detail: "Rolled out to two cities, then everywhere.",
      },
    ],
    reflection:
      "We tuned the five-minute timeout by gut feeling. It worked, but a proper experiment would have told us whether three minutes would have worked better for pickers.",
    quote: {
      text: "We'd tried three times to fix substitutions with smarter matching. Nora fixed it by asking people.",
      by: "Owen Mbeki, COO, Sprig Grocer",
    },
    credits: ["PM: Saskia Brandt", "Store partners: Sprig Eastside team"],
  },
];

/* ------------------------------------------------------------------ */
/* Home                                                                 */
/* ------------------------------------------------------------------ */

export const home = {
  title: "I design the quiet parts of everyday software.",
  intro:
    "I'm Nora Vale, an independent product designer. For eleven years I've worked on tickets, invoices, check-ins and dispatch boards — products where a confusing screen costs someone a train, a payment or a night's sleep.",
  heroCase: "fernway-tickets",
  featured: ["pennant-invoices", "hollis-check-in", "quarry-dispatch"],
  approach: {
    title: "How I work",
    paragraphs: [
      "I start where the product is used, not where it's planned. That has meant platforms at rush hour, a clinic waiting room at eight in the morning and a depot control room at ten at night. The first week of any project is mostly watching.",
      "Then I narrow. Most briefs arrive as a list of features; I try to turn them into one sentence about what a person should be able to do, and a number that would tell us they can. Every design decision after that gets measured against the sentence.",
      "I design in the browser and in prototypes people can hold, and I sit with engineers while things get built. The handoff is a conversation, not a file.",
    ],
    notes: [
      "Fernway: 38 interviews on station platforms, each under four minutes.",
      "Pennant's sentence: 'An owner can get paid without feeling rude.'",
      "On most projects I pair with an engineer for half a day every week.",
    ],
  },
  teams: [
    "Fernway Rail",
    "Pennant",
    "Hollis Health",
    "Commonplace",
    "Quarry Freight",
    "Sprig Grocer",
    "Tessel Maps",
    "Ardent Insurance",
    "Kilnworth Schools",
    "Northlight Energy",
  ],
  quotes: [
    {
      text: "Nora has the rare habit of making a team argue less. She brings evidence to the room instead of opinions.",
      by: "Dana Whitcombe",
      role: "Head of Digital, Fernway Rail",
    },
    {
      text: "She talked us out of building a collections product. The invoices fixed themselves instead.",
      by: "Priya Anand",
      role: "Product Lead, Pennant",
    },
    {
      text: "Her redlines are the clearest specs our engineers have ever worked from.",
      by: "Jun Park",
      role: "VP Engineering, Commonplace",
    },
  ],
  now: [
    {
      label: "Working on",
      text: "A booking flow for a network of community pools, through December.",
    },
    {
      label: "Teaching",
      text: "Interaction design at Willamette School of Design, Thursday evenings.",
    },
    {
      label: "Reading",
      text: "Notes on the Synthesis of Form, again, slower this time.",
    },
    {
      label: "Speaking",
      text: "'Design for the platform, not the sofa' — Cascade UX Day, Feb 12, 2027.",
    },
  ],
  close: {
    title: "Have a product that needs a careful second look?",
    text: "I take on two engagements a quarter: product redesigns, new flows, design systems, and the occasional research sprint. Tell me what's in the way.",
  },
};

/* ------------------------------------------------------------------ */
/* Playground                                                           */
/* ------------------------------------------------------------------ */

export const playground = {
  title: "Playground",
  intro:
    "Small working tools I built for my own projects and kept polishing. Everything here runs in your browser — drag, type, copy what's useful.",
  easing: {
    title: "Easing lab",
    text: "Drag the two handles to shape a cubic-bezier curve, then run it. I use this to match motion between design files and code before arguing about milliseconds.",
    presets: [
      { name: "Expo out", value: [0.16, 1, 0.3, 1] },
      { name: "Standard", value: [0.2, 0, 0, 1] },
      { name: "Gentle", value: [0.45, 0, 0.25, 1] },
      { name: "Overshoot", value: [0.34, 1.3, 0.64, 1] },
    ] as { name: string; value: [number, number, number, number] }[],
  },
  scale: {
    title: "Type scale",
    text: "Pick a base size and a ratio to see six steps of a modular scale in rem and pixels. The sample line is the real text I'd test it with: a ticket price, a heading, a label.",
    ratios: [
      { name: "Minor third", value: 1.2 },
      { name: "Major third", value: 1.25 },
      { name: "Perfect fourth", value: 1.333 },
      { name: "Golden ratio", value: 1.618 },
    ],
    samples: [
      "Margin",
      "Check in",
      "Tonight at Depot 4",
      "Invoices that get paid",
      "Off-peak single · $5.20",
      "Valid now until 23:59 · show this screen to the conductor",
    ],
  },
  contrast: {
    title: "Contrast pair",
    text: "Two colours, one WCAG 2.2 ratio. I keep this open while choosing text colours for dark control rooms and sunlit platforms.",
  },
  log: [
    {
      date: "Sep 2026",
      title: "Departure board type specimen",
      medium: "Figma + CSS",
      note: "Testing tabular numerals at 20 metres.",
    },
    {
      date: "Jul 2026",
      title: "Focus rings that survive dark mode",
      medium: "CSS",
      note: "Two-tone rings that pass on any surface.",
    },
    {
      date: "May 2026",
      title: "Redline overlay for prototypes",
      medium: "React",
      note: "The overlay on this site's case studies.",
    },
    {
      date: "Feb 2026",
      title: "Reading-speed tester",
      medium: "JavaScript",
      note: "Timed reading of error messages with five rewrites.",
    },
    {
      date: "Nov 2025",
      title: "Haptic patterns for confirmations",
      medium: "iOS prototype",
      note: "Three taps for success turned out to feel like failure.",
    },
    {
      date: "Aug 2025",
      title: "Paper prototype kit, mobile",
      medium: "Print, A4",
      note: "Cut-out components at 1:1 phone scale.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  title: "I'm Nora. I design products for the moment they're used.",
  bio: [
    "I grew up in a house where the kitchen table was also the office: my father ran a small print shop and my mother kept its books. I learned early that a well-made form saves someone an evening.",
    "I studied graphic design, worked my way through two agencies and spent five years at Tessel Maps, where I led design for the routing team. Since 2021 I've worked independently, usually embedded in a client team for three to nine months at a time.",
    "My work tends to land in the same place: everyday products where the person using them is in a hurry, in a hard spot, or both. Commuters, small business owners, patients, night-shift dispatchers.",
  ],
  process: {
    title: "How a project runs",
    steps: [
      {
        when: "Week 1",
        title: "Go where it's used",
        text: "Observation and short interviews on site, plus whatever data already exists. I write up what I saw by Friday.",
      },
      {
        when: "Week 2",
        title: "Agree on one sentence",
        text: "We turn the brief into a single sentence and a number that would prove it. Everything else is negotiable.",
      },
      {
        when: "Weeks 3–6",
        title: "Prototype and test",
        text: "Competing directions, tested with real people in real conditions. I share work in progress every week, unfinished on purpose.",
      },
      {
        when: "Weeks 7+",
        title: "Build alongside engineering",
        text: "Annotated specs, pairing sessions and design QA on staging. I stay until it ships and the number moves.",
      },
    ],
  },
  beliefs: [
    {
      title: "The context is the brief",
      text: "A ticket bought on a platform is a different product from the same ticket bought on a sofa.",
    },
    {
      title: "Fewer screens, clearer words",
      text: "Most of my best work removed something. Most of the rest rewrote a label.",
    },
    {
      title: "Specs are a kindness",
      text: "An engineer should never have to guess a margin, an error message or an empty state.",
    },
  ],
  outside:
    "Outside work I teach interaction design one evening a week, swim badly in the Willamette most summer mornings and keep a sketchbook of railway signage from every city I visit.",
};

/* ------------------------------------------------------------------ */
/* Résumé                                                               */
/* ------------------------------------------------------------------ */

export const resume = {
  title: "Résumé",
  summary:
    "Product designer with eleven years in transport, finance, health and logistics software. Strongest at research-led redesigns of high-stakes flows and at design systems that engineers adopt willingly.",
  experience: [
    {
      role: "Independent product designer",
      org: "Margin",
      where: "Portland, OR · remote",
      dates: "2021 — now",
      points: [
        "Embedded engagements of 2–9 months with product teams of 5 to 60 people.",
        "Led redesigns for Fernway Rail, Pennant, Hollis Health, Commonplace, Quarry Freight and Sprig Grocer.",
        "Runs research, design and design QA end to end; pairs weekly with engineering.",
      ],
    },
    {
      role: "Design lead, Routing",
      org: "Tessel Maps",
      where: "Seattle, WA",
      dates: "2016 — 2021",
      points: [
        "Led a team of four designers across turn-by-turn navigation and trip planning.",
        "Shipped offline maps for 14 countries; designed the accessibility routing mode.",
        "Started and ran the company's first research panel of 600 regular participants.",
      ],
    },
    {
      role: "Interaction designer",
      org: "Hartwell & Rue",
      where: "Portland, OR",
      dates: "2014 — 2016",
      points: [
        "Agency work for banks, a regional utility and two public libraries.",
        "Designed the online account for Northlight Energy's 400,000 households.",
      ],
    },
    {
      role: "Junior designer",
      org: "Studio Oriel",
      where: "Portland, OR",
      dates: "2013 — 2014",
      points: [
        "Print and web for arts organisations; first websites, first usability tests.",
      ],
    },
  ],
  skills: [
    {
      group: "Design",
      items: [
        "Interaction design",
        "Information architecture",
        "Prototyping",
        "Design systems",
        "Interface writing",
      ],
    },
    {
      group: "Research",
      items: [
        "Contextual inquiry",
        "Usability testing",
        "Diary studies",
        "Survey design",
        "Analytics",
      ],
    },
    {
      group: "Build",
      items: [
        "HTML & CSS",
        "React prototypes",
        "Design tokens",
        "Accessibility (WCAG 2.2)",
      ],
    },
    {
      group: "Tools",
      items: ["Figma", "Framer", "Origami Studio", "VS Code", "Dovetail"],
    },
  ],
  education: [
    {
      what: "BFA, Graphic Design",
      where: "Pacific Northwest College of Art",
      when: "2009 — 2013",
    },
  ],
  talks: [
    {
      what: "Design for the platform, not the sofa",
      where: "Cascade UX Day",
      when: "Feb 2027",
    },
    {
      what: "Retire, don't add: growing a design system by deleting",
      where: "Systems Weekend, Denver",
      when: "2025",
    },
    {
      what: "Dark rooms, bright screens",
      where: "Night Shift Design meetup",
      when: "2024",
    },
  ],
  references: "References from three recent clients are available on request.",
};

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

export const contact = {
  title: "Start a project",
  intro:
    "Tell me about the product, the people using it and what's in the way. I reply to every enquiry within two working days, usually with a few questions and a time to talk.",
  kinds: [
    "Product redesign",
    "New product or flow",
    "Design system",
    "Research sprint",
    "Full-time role",
  ],
  budgets: [
    "Under $15,000",
    "$15,000 – $40,000",
    "$40,000 – $80,000",
    "Over $80,000",
    "Not sure yet",
  ],
  timings: [
    "As soon as possible",
    "Within 3 months",
    "In 3–6 months",
    "Just exploring",
  ],
  rates:
    "Engagements usually run 2–9 months. Research sprints start at $14,000; ongoing work is billed at $1,250 a day.",
  faq: [
    {
      q: "Do you work with in-house teams?",
      a: "Almost always. I join your stand-ups, your tools and your review rituals, and leave behind specs and a team that can carry on without me.",
    },
    {
      q: "Which time zones can you cover?",
      a: "I'm on Pacific Time and keep four hours of overlap with US East Coast and European afternoons. I travel for kick-offs and research.",
    },
    {
      q: "Will you sign an NDA?",
      a: "Yes. Case studies on this site are published with each client's approval, and some work is never shown.",
    },
    {
      q: "Are you open to full-time roles?",
      a: "For the right team, yes — particularly design lead roles close to engineering. Choose 'Full-time role' in the form.",
    },
  ],
};
