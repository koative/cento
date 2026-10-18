/* All copy and demo data for Lucid. Rebranding the template means editing this file. */
import jefferson from "./assets/jefferson-draft.jpg";
import frankenstein from "./assets/frankenstein-draft.jpg";
import hemingway from "./assets/hemingway-titles.jpg";
import proust from "./assets/proust-final-page.jpg";

export const brand = {
  name: "Lucid",
  sector: "AI writing assistant",
  tagline: "Say what you mean, in fewer words.",
  email: "hello@lucid.example",
  sales: "sales@lucid.example",
  support: "help@lucid.example",
  phone: "+1 555 0170 214",
  address: [
    "Lucid Writing Co.",
    "300 Adelaide Street West, 4th floor",
    "Toronto, ON M5V 1R7",
  ],
  gallery: "https://cento.koative.com/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/product", label: "Product" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "How Lucid works" },
      { to: "/use-cases", label: "Use cases" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Lucid" },
      { to: "/contact", label: "Talk to sales" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signin", label: "Sign in" },
      { to: "/signup", label: "Create an account" },
      { to: "/app", label: "Editor demo" },
    ],
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ---------- The live prompt demo ---------- */

export type InstructionId = "tighten" | "warmer" | "plain" | "lead";

export type Instruction = {
  id: InstructionId;
  label: string;
  prompt: string;
  /** Lowercase fragments matched against whatever the visitor types into the prompt box. */
  keywords: string[];
};

export const instructions: Instruction[] = [
  {
    id: "tighten",
    label: "Tighten",
    prompt: "Tighten this. Keep every fact.",
    keywords: [
      "tight",
      "short",
      "cut",
      "concise",
      "brief",
      "trim",
      "fewer",
      "length",
    ],
  },
  {
    id: "warmer",
    label: "Warmer",
    prompt: "Make it warmer, still professional.",
    keywords: [
      "warm",
      "friendl",
      "kind",
      "human",
      "empath",
      "nicer",
      "soft",
      "apolog",
    ],
  },
  {
    id: "plain",
    label: "Plain English",
    prompt: "Rewrite in plain English for a general reader.",
    keywords: [
      "plain",
      "simple",
      "simpler",
      "jargon",
      "easy",
      "easier",
      "grade",
      "readab",
      "clear",
    ],
  },
  {
    id: "lead",
    label: "Lead with the point",
    prompt: "Put the main point in the first sentence.",
    keywords: [
      "lead",
      "first",
      "point",
      "ask",
      "bluf",
      "front",
      "summar",
      "main",
      "headline",
    ],
  },
];

export type Sample = {
  id: string;
  label: string;
  context: string;
  text: string;
  rewrites: Record<InstructionId, string>;
};

export const samples: Sample[] = [
  {
    id: "launch",
    label: "Launch email",
    context: "To customers, from the product team",
    text: "Hi everyone, we are very excited to announce that, at this point in time, our new reporting dashboard is now available for all customers on the Team plan. In order to get started, you will need to navigate to the Reports tab, which is located in the left-hand sidebar, and then click on the button that says Create report. Please do not hesitate to reach out to our support team if you have any questions or concerns whatsoever.",
    rewrites: {
      tighten:
        "Hi everyone, our new reporting dashboard is now available on the Team plan. To get started, open the Reports tab in the left sidebar and click Create report. Questions? Reply to this email and our support team will help.",
      warmer:
        "Hi everyone, we've been looking forward to this one: our new reporting dashboard is live for every customer on the Team plan. To try it, open the Reports tab in the left sidebar and click Create report. If anything is unclear, reply to this email and a real person on our support team will help.",
      plain:
        "Hi everyone, the new reporting dashboard is ready for all customers on the Team plan. To start, go to the Reports tab on the left side of the screen and click the Create report button. If you have questions, contact our support team.",
      lead: "Open the Reports tab and click Create report: our new reporting dashboard is now live for all customers on the Team plan. You will find Reports in the left sidebar. If you have any questions, reply to this email and our support team will help.",
    },
  },
  {
    id: "support",
    label: "Support reply",
    context: "To a customer who was billed twice",
    text: "Thank you for reaching out to us regarding this matter. We apologize for any inconvenience this may have caused. After looking into your account, it appears that due to the fact that there was a system error on our end, you were charged twice for the month of March. We have gone ahead and initiated a refund for the duplicate charge, which should be reflected in your account within approximately 5-7 business days.",
    rewrites: {
      tighten:
        "Thanks for flagging this. A system error on our end charged you twice for March. We have refunded the duplicate charge, and it should reach your account within 5–7 business days.",
      warmer:
        "Thank you for telling us, and I'm sorry: that should not have happened. I looked into your account and a system error on our end charged you twice for March. I've already refunded the duplicate charge, and you should see it in your account within 5–7 business days. If it hasn't arrived by then, reply here and I'll chase it personally.",
      plain:
        "Thank you for contacting us, and sorry for the trouble. We checked your account. A system error on our side charged you twice for March. We have started a refund for the extra charge. You should see the money back in your account in 5 to 7 business days.",
      lead: "Your refund for the duplicate March charge is on its way and should reach your account within 5–7 business days. A system error on our end charged you twice, and we are sorry for the trouble. Thank you for reaching out about it.",
    },
  },
  {
    id: "board",
    label: "Investor update",
    context: "Quarterly note from a founder",
    text: "So, in terms of where we are at with regard to revenue, Q3 was honestly a bit of a mixed bag. We actually managed to grow monthly recurring revenue by 9% to $412,000, which is good, but on the other hand churn also went up quite significantly to 3.1%, mostly driven by smaller customers on the Starter plan. Going forward, our plan is to basically focus on onboarding, and we would really appreciate any introductions to people who have experience scaling customer success teams.",
    rewrites: {
      tighten:
        "Q3 revenue was mixed. Monthly recurring revenue grew 9% to $412,000, but churn rose to 3.1%, mostly among smaller customers on the Starter plan. Next quarter we will focus on onboarding, and we would appreciate introductions to people who have scaled customer success teams.",
      warmer:
        "Q3 brought good news and a lesson. Monthly recurring revenue grew 9% to $412,000, which the whole team is proud of. Churn also rose to 3.1%, mostly among smaller customers on the Starter plan, and we are taking that seriously. Our focus now is onboarding, and if you know someone who has scaled a customer success team, we would be grateful for an introduction.",
      plain:
        "Q3 revenue results were mixed. Monthly recurring revenue went up 9% to $412,000. But more customers left: churn went up to 3.1%, mostly small customers on the Starter plan. Next we will work on onboarding. Please introduce us to people who have grown customer success teams.",
      lead: "One ask: we would appreciate introductions to people who have scaled customer success teams. Here is why. In Q3, monthly recurring revenue grew 9% to $412,000, but churn rose to 3.1%, mostly among smaller customers on the Starter plan, so onboarding is our focus from now on.",
    },
  },
];

/** The offline pass that runs on text the visitor types themselves: wordy phrase → plain phrase ("" deletes). */
export const offlineRules: [find: string, replace: string][] = [
  ["at this point in time", "now"],
  ["in order to", "to"],
  ["due to the fact that", "because"],
  ["with regard to", "about"],
  ["in regard to", "about"],
  ["regarding this matter", "about this"],
  ["please do not hesitate to", "please"],
  ["do not hesitate to", "feel free to"],
  ["in the event that", "if"],
  ["for the purpose of", "for"],
  ["prior to", "before"],
  ["subsequent to", "after"],
  ["a large number of", "many"],
  ["the majority of", "most"],
  ["is able to", "can"],
  ["are able to", "can"],
  ["has the ability to", "can"],
  ["utilize", "use"],
  ["utilise", "use"],
  ["leverage", "use"],
  ["going forward", "from now on"],
  ["touch base", "talk"],
  ["circle back", "follow up"],
  ["reach out to", "contact"],
  ["we have gone ahead and", "we have"],
  ["whatsoever", ""],
  ["very", ""],
  ["really", ""],
  ["basically", ""],
  ["actually", ""],
  ["honestly", ""],
  ["quite", ""],
  ["just", ""],
];

/* ---------- Home ---------- */

export const home = {
  title: "Lucid — the AI writing assistant that shows its work",
  hero: {
    before: "Say what you mean,",
    cut: "in so many words",
    insert: "in fewer words.",
    lede: "Lucid is a writing assistant for teams. Paste a draft, say what it needs, and get every change back as a tracked edit in blue pencil: yours to take, leave or ask about.",
    primary: "Open the editor demo",
    secondary: "See pricing",
    note: "Free for one writer. No card needed.",
  },
  annotated: {
    heading: "Every suggestion comes with its reason",
    text: "Lucid edits the way a good copy editor does: in the margin, in plain view, with a note you can argue with. Four kinds of mark, one colour, nothing rewritten behind your back.",
    paragraph: [
      { text: "Our winter boots are " },
      { del: "really very", ins: "", note: 0 },
      { text: " waterproof to 15 cm and come with a two-year guarantee. " },
      { del: "Utilize", ins: "Use", note: 2 },
      { text: " the size guide before ordering, " },
      {
        del: "and we hope you will love them",
        ins: "and if they don't fit, returns are free",
        note: 1,
      },
      { text: ". Every pair ships within " },
      { flag: "24 hours", note: 3 },
      { text: " from our warehouse in Halifax." },
    ],
    notes: [
      {
        kind: "Clarity",
        text: "Two intensifiers in a row weaken the claim. The number does the work.",
      },
      {
        kind: "Tone",
        text: "Hope is vague. Say what happens if they don't fit; that is what a reader worries about.",
      },
      {
        kind: "House style",
        text: "Your style guide prefers “use” over “utilize”. Lucid applies it everywhere, every time.",
      },
      {
        kind: "Check fact",
        text: "Lucid never invents numbers. It flags this one because last week's copy said 48 hours.",
      },
    ],
  },
  archive: {
    heading:
      "Nobody gets it right the first time. Not even the Declaration of Independence.",
    text: "Jefferson's rough draft went through Adams, Franklin and then Congress, and every hand left a mark you can still read. Lucid is built on that idea: revision is visible, attributable and reversible. It is a blue pencil, not a ghostwriter.",
    caption:
      "Thomas Jefferson's rough draft of the Declaration of Independence, 1776, with changes by John Adams, Benjamin Franklin and the Continental Congress. Library of Congress, public domain.",
    link: "Read why we built Lucid",
  },
  useCases: {
    heading:
      "Built for the people who write the most and get thanked the least",
    link: "All use cases",
  },
  style: {
    heading: "Your house style, applied to every draft",
    text: "Upload the style guide you already have, or start from ours. Lucid learns your preferred terms, your spelling, your stance on the Oxford comma, and quietly applies them across everyone's drafts.",
    link: "Try the style guide in the demo",
  },
  surfaces: {
    heading: "In the places you already write",
    items: [
      {
        name: "Browser extension",
        text: "Works in any text field: help desks, CMS editors, web mail, docs.",
        spec: "Chrome, Edge, Firefox, Safari",
      },
      {
        name: "Desktop editor",
        text: "A quiet full-screen editor for long documents, with review mode and version history.",
        spec: "macOS 13+, Windows 11",
      },
      {
        name: "Mail add-in",
        text: "Suggestions in the compose window, plus a one-key “lead with the point”.",
        spec: "Outlook, Apple Mail",
      },
      {
        name: "API",
        text: "The same suggestions as JSON, for the drafts your own product writes.",
        spec: "REST, 120 requests / minute",
      },
    ],
  },
  privacy: {
    heading: "Your drafts are yours",
    items: [
      "We never train models on customer text. Not on any plan, not anonymised, not later.",
      "Drafts are deleted from our servers 30 days after your last edit, or immediately with zero retention.",
      "Encrypted in transit (TLS 1.3) and at rest (AES-256), with data hosted in Canada, the EU or the US.",
      "SOC 2 Type II audited every year; the report is available under NDA.",
    ],
  },
  quotes: [
    {
      text: "Our help centre used to read like four different companies wrote it. Six weeks after we loaded our style guide into Lucid, it reads like one company that likes its customers.",
      name: "Priya Ramaswamy",
      role: "Head of Support Content, Fieldnote",
    },
    {
      text: "It is the only writing tool our legal team agreed to, because it never changes a sentence without showing the change.",
      name: "Tomás Echeverría",
      role: "Operations lead, Carrow Health",
    },
    {
      text: "I write my investor update in forty minutes now instead of an evening. The ‘lead with the ask’ button alone paid for the year.",
      name: "Dana Okafor",
      role: "Founder, Bramble Logistics",
    },
  ],
  pricing: {
    heading: "Free for one writer. Fair for a whole team.",
    link: "Compare plans",
  },
  changelog: { heading: "Recently shipped", link: "Full changelog" },
  close: {
    heading: "Bring a draft. Leave with a clean copy.",
    text: "The editor demo runs in your browser on sample documents, with no account and nothing sent anywhere.",
    primary: "Open the editor demo",
    secondary: "Create a free account",
  },
};

/* ---------- Product ---------- */

export const product = {
  title: "Product",
  heading: "A second reader who never gets tired",
  lede: "Lucid reads your draft for clarity, tone, house style and facts worth checking, then hands it back marked up. You review every change. Nothing is rewritten without your say.",
  sections: [
    {
      id: "prompt",
      heading: "Ask in your own words",
      text: "Type what the draft needs the way you would say it to a colleague: “shorter, and friendlier to someone who's annoyed”. Lucid reads the instruction, rewrites, and returns the result as tracked changes rather than a fresh block of text you have to compare by eye.",
      points: [
        "Instructions in plain language, no prompt syntax",
        "Saved instructions for the requests you make every day",
        "Works on a sentence, a paragraph or a 40-page document",
      ],
      before:
        "We would like to take this opportunity to inform you that the office will be closed on Monday.",
      after: "The office is closed on Monday.",
    },
    {
      id: "review",
      heading: "Review mode, borrowed from editors",
      text: "Every deletion is struck through and every insertion underlined, in the same blue pencil copy editors have used for a century. Step through the changes with J and K, accept with A, reject with R. What you leave alone stays exactly as you wrote it.",
      points: [
        "Accept or reject change by change",
        "Clean view to read the result without markup",
        "Every decision logged in version history",
      ],
      before:
        "Our team are committed to provide the best possible service to each and every customer.",
      after:
        "Our team is committed to giving every customer the best service we can.",
    },
    {
      id: "style",
      heading: "House style, enforced kindly",
      text: "Load your style guide once. Lucid applies preferred terms, spelling, capitalisation and number formats across everyone's drafts, and explains each fix by quoting the rule, so new writers learn the style instead of just obeying it.",
      points: [
        "Imports PDF, Docs and Markdown style guides",
        "Term lists with “prefer” and “avoid” pairs",
        "Per-team overrides for legal, support and marketing",
      ],
      before:
        "Log-in to the Dashboard and select Sign Up to start your Free Trial.",
      after:
        "Log in to the dashboard and select Sign up to start your free trial.",
    },
    {
      id: "facts",
      heading: "It flags facts. It never invents them.",
      text: "Numbers, dates, prices and named claims are highlighted for you to check, with a note when they contradict something else in the document or your shared library. Lucid will not add a statistic you did not supply, and it says so when an instruction would require one.",
      points: [
        "Flags figures that differ from your shared library",
        "Notes dates that fall on the wrong weekday",
        "Refuses to fabricate sources, quotes or numbers",
      ],
      before:
        "Delivery takes 48 hours, and our Tuesday 14 March webinar covers the details.",
      after:
        "Delivery takes 24 hours, and our Thursday 14 March webinar covers the details.",
    },
    {
      id: "level",
      heading: "Reading level you can set, not guess",
      text: "Pick a target reading grade per document type: grade 6 for help articles, grade 10 for proposals. Lucid shows the current level live, highlights the sentences dragging it up, and suggests splits rather than synonyms.",
      points: [
        "Live reading grade and sentence length",
        "Targets per document type",
        "Long-sentence and passive-voice highlights",
      ],
      before:
        "Notwithstanding the aforementioned limitations, the subscription remains cancellable at any juncture.",
      after: "You can still cancel your subscription at any time.",
    },
  ],
  specs: {
    heading: "Under the hood",
    rows: [
      [
        "Languages",
        "English (US, UK, Canada, Australia); Spanish and German in beta",
      ],
      [
        "Document length",
        "Up to 60,000 words per document in the desktop editor",
      ],
      ["Response time", "Median 1.4 s for a 300-word paragraph"],
      ["Data residency", "Canada, European Union or United States"],
      ["Retention", "30 days by default; zero retention on Enterprise"],
      [
        "Single sign-on",
        "SAML 2.0 and OIDC, with SCIM provisioning on Enterprise",
      ],
      ["Compliance", "SOC 2 Type II, GDPR, PIPEDA; DPA available on request"],
      [
        "Accessibility",
        "Keyboard-first review mode, screen reader labels, WCAG 2.2 AA",
      ],
    ] as [string, string][],
  },
  cta: {
    heading: "See review mode on a real document",
    primary: "Open the editor demo",
    secondary: "Talk to sales",
  },
};

/* ---------- Use cases ---------- */

export type UseCase = {
  slug: string;
  team: string;
  heading: string;
  summary: string;
  docTypes: string[];
  pains: string[];
  instruction: string;
  before: string;
  after: string;
  rules: { avoid: string; prefer: string }[];
  workflow: { step: string; text: string }[];
  quote: { text: string; name: string; role: string };
};

export const useCasesPage = {
  title: "Use cases",
  heading: "Where teams use Lucid",
  lede: "The writing that piles up between the big launches: replies, notes, updates and policies. Pick a team to see the draft they bring and the copy they leave with.",
  searchLabel: "Search use cases",
  empty:
    "No use case matches that search. Try a team, such as “support”, or a document, such as “release notes”.",
};

export const useCases: UseCase[] = [
  {
    slug: "support",
    team: "Customer support",
    heading: "Replies that sound like one calm person",
    summary:
      "Consistent, warm answers across 40 agents and three time zones, without a script.",
    docTypes: ["Ticket replies", "Macros", "Help articles"],
    pains: [
      "Every agent apologises differently, and some apologise for things that aren't your fault.",
      "Macros written in 2021 still mention screens that no longer exist.",
      "Angry customers get longer replies, which makes them angrier.",
    ],
    instruction: "Warmer, but shorter. Lead with what we did.",
    before:
      "Thank you for your patience while we looked into this issue. Unfortunately, we are unable to process the exchange at this time due to the fact that the item is out of stock in your size. We apologize for any inconvenience this may cause.",
    after:
      "We've refunded your order in full, because the boots are out of stock in your size. I'm sorry: I know you were waiting for them. I've set a restock alert on your account so you hear first.",
    rules: [
      {
        avoid: "We apologize for any inconvenience",
        prefer: "I'm sorry (and say what for)",
      },
      { avoid: "Unfortunately", prefer: "Start with what we did" },
      { avoid: "at this time", prefer: "now, or say when" },
    ],
    workflow: [
      {
        step: "Draft in your help desk",
        text: "The browser extension works inside the reply box of most help desks.",
      },
      {
        step: "Press the warmth key",
        text: "One saved instruction, shared by the team, tuned by your support lead.",
      },
      {
        step: "Review and send",
        text: "Accept the changes you like. Lucid learns which ones your team keeps.",
      },
    ],
    quote: {
      text: "Our median reply got 30% shorter and our satisfaction scores went the other way.",
      name: "Priya Ramaswamy",
      role: "Head of Support Content, Fieldnote",
    },
  },
  {
    slug: "product-marketing",
    team: "Product marketing",
    heading: "Launch copy that survives legal and still sounds alive",
    summary:
      "One message, adapted for the blog, the email, the release notes and the sales deck.",
    docTypes: ["Launch emails", "Landing pages", "Release notes"],
    pains: [
      "The launch message is rewritten by six people and ends up saying nothing.",
      "Claims slip in that nobody can source.",
      "The blog post and the email describe the same feature differently.",
    ],
    instruction: "Tighten, and flag any claim we can't back up.",
    before:
      "We are thrilled to announce the industry's most powerful scheduling engine, which leverages cutting-edge AI to deliver a seamless experience that will completely revolutionize the way your team plans its week.",
    after:
      "Our new scheduling engine plans your team's week in seconds, around everyone's working hours and time off.",
    rules: [
      { avoid: "revolutionize", prefer: "say what changes" },
      {
        avoid: "industry's most powerful",
        prefer: "a claim you can source, or none",
      },
      { avoid: "seamless", prefer: "describe the step that disappeared" },
    ],
    workflow: [
      {
        step: "Write the source message once",
        text: "Keep the canonical positioning in your shared library.",
      },
      {
        step: "Adapt per channel",
        text: "Ask Lucid for the email, the in-app note and the release-notes version.",
      },
      {
        step: "Clear claims early",
        text: "Fact flags show legal which sentences need a source before review.",
      },
    ],
    quote: {
      text: "Legal review went from three rounds to one, because the unsupported claims never reached them.",
      name: "Marcus Bell",
      role: "Director of Product Marketing, Tallyhouse",
    },
  },
  {
    slug: "sales",
    team: "Sales",
    heading: "Follow-ups people actually answer",
    summary:
      "Short, specific emails and proposals that lead with the buyer's problem, not your feature list.",
    docTypes: ["Follow-up emails", "Proposals", "Call summaries"],
    pains: [
      "Follow-ups open with “just checking in” and close with nothing to answer.",
      "Proposals bury the price on page nine.",
      "New reps copy the last proposal, including the last customer's name.",
    ],
    instruction: "Lead with the point. One question at the end.",
    before:
      "Hi Jordan, I just wanted to circle back and touch base regarding our conversation last week. I was wondering if you had had a chance to review the proposal that I sent over, and whether you might have any questions or thoughts about it.",
    after:
      "Hi Jordan, the proposal covers your three sites for $18,400 a year, with onboarding finished before your March audit. Is Thursday a good day to walk your finance lead through it?",
    rules: [
      { avoid: "just checking in", prefer: "a new fact or a question" },
      { avoid: "circle back, touch base", prefer: "follow up" },
      {
        avoid: "price on the last page",
        prefer: "price in the first paragraph",
      },
    ],
    workflow: [
      {
        step: "Paste the call notes",
        text: "Lucid turns rough notes into a summary the buyer can forward.",
      },
      {
        step: "Draft the follow-up",
        text: "Ask for “one question, under 80 words” and keep it as a saved instruction.",
      },
      {
        step: "Check names and numbers",
        text: "Fact flags catch a figure that differs from the proposal you attached.",
      },
    ],
    quote: {
      text: "Reply rates on follow-ups went up because they finally ask something answerable.",
      name: "Aisha Rahman",
      role: "Sales lead, Corvid Systems",
    },
  },
  {
    slug: "people-ops",
    team: "People operations",
    heading: "Policies employees read to the end",
    summary:
      "Handbooks, policy updates and job posts in plain, fair, inclusive language.",
    docTypes: ["Policies", "Job posts", "All-hands notes"],
    pains: [
      "Policy updates are written for lawyers and read by no one.",
      "Job posts ask for “rockstars” and quietly put people off.",
      "Nobody knows what actually changed between version 3 and version 4.",
    ],
    instruction: "Plain English, grade 8. Keep the policy meaning exact.",
    before:
      "Employees who are desirous of availing themselves of the flexible working arrangement are required to submit a formal request to their line manager no less than 30 calendar days prior to the proposed commencement date.",
    after:
      "If you want flexible working, ask your manager in writing at least 30 days before you would like it to start.",
    rules: [
      { avoid: "rockstar, ninja", prefer: "the actual skill" },
      { avoid: "prior to", prefer: "before" },
      { avoid: "he or she", prefer: "they" },
    ],
    workflow: [
      {
        step: "Draft or import the policy",
        text: "Paste from your handbook; formatting and headings survive.",
      },
      {
        step: "Set a reading grade",
        text: "Grade 8 is a good target for policies everyone must follow.",
      },
      {
        step: "Publish with a change summary",
        text: "Lucid writes the “what changed” note from the tracked edits.",
      },
    ],
    quote: {
      text: "The parental leave policy is the first one people have thanked us for. It is the same policy, written so people can use it.",
      name: "Hannah Lindqvist",
      role: "People partner, Northwall",
    },
  },
  {
    slug: "engineering",
    team: "Engineering",
    heading: "Release notes and docs written for the reader",
    summary:
      "Turn commit-speak into notes customers understand and docs that answer the question asked.",
    docTypes: ["Release notes", "Docs pages", "Incident reports"],
    pains: [
      "Release notes list ticket titles nobody outside the team understands.",
      "Incident reports read as either defensive or alarming.",
      "Docs explain how the code works, not how to get the job done.",
    ],
    instruction: "Rewrite for customers. Say what changed for them.",
    before:
      "Refactored the sync worker to batch writes and resolved a race condition in the webhook handler that could cause duplicate event delivery under high load.",
    after:
      "Sync is faster on large accounts, and webhooks no longer send the same event twice during busy periods.",
    rules: [
      {
        avoid: "refactored, resolved a race condition",
        prefer: "what the customer notices",
      },
      { avoid: "simply, just, easily", prefer: "delete them" },
      { avoid: "click here", prefer: "name the destination" },
    ],
    workflow: [
      {
        step: "Paste the merged changes",
        text: "Lucid groups them by what customers will notice.",
      },
      {
        step: "Choose the audience",
        text: "Customers, admins or developers, each with its own saved instruction.",
      },
      {
        step: "Ship with the API",
        text: "Teams with a release pipeline call the API and review in a pull request.",
      },
    ],
    quote: {
      text: "Support stopped forwarding our release notes to us with a question mark.",
      name: "Felix Andersen",
      role: "Engineering manager, Quayline",
    },
  },
  {
    slug: "founders",
    team: "Founders",
    heading: "Updates investors read on their phone",
    summary:
      "Monthly updates, board memos and fundraising emails that put the ask where it belongs.",
    docTypes: ["Investor updates", "Board memos", "Fundraising emails"],
    pains: [
      "The update starts with three paragraphs of context and ends with the ask.",
      "Bad news is hedged until it reads as worse news.",
      "Writing the update takes the evening it was supposed to save.",
    ],
    instruction: "Lead with the ask. State the bad news plainly.",
    before:
      "As many of you know, the last few months have been quite a journey for the team, with a lot of learnings along the way, and while we did not quite hit the targets we had originally set, we feel very good about where things are headed.",
    after:
      "We missed our Q2 target: revenue reached $290,000 against a plan of $340,000. Here is what we learned and what we are changing.",
    rules: [
      { avoid: "journey, learnings", prefer: "what happened" },
      { avoid: "we feel very good", prefer: "the evidence" },
      {
        avoid: "the ask in the last line",
        prefer: "the ask in the first line",
      },
    ],
    workflow: [
      {
        step: "Paste last month's numbers",
        text: "Lucid never invents figures, so the update starts from yours.",
      },
      {
        step: "Draft with a template",
        text: "Highlights, lowlights, metrics, asks: the shape investors expect.",
      },
      {
        step: "Read it on a phone",
        text: "The preview shows the first screen your investors will see.",
      },
    ],
    quote: {
      text: "I write my investor update in forty minutes now instead of an evening.",
      name: "Dana Okafor",
      role: "Founder, Bramble Logistics",
    },
  },
  {
    slug: "research",
    team: "Research & grants",
    heading: "Proposals reviewers can follow",
    summary:
      "Grant applications and research summaries that keep their precision and lose their fog.",
    docTypes: ["Grant proposals", "Lay summaries", "Reports"],
    pains: [
      "The lay summary is the abstract with fewer commas.",
      "Word limits force cuts at midnight, from the wrong paragraphs.",
      "Co-authors write in four different voices.",
    ],
    instruction: "Lay summary for a general reader. Keep the method accurate.",
    before:
      "This study utilises a longitudinal mixed-methods design to interrogate the multifactorial determinants of medication non-adherence among older adults with multimorbidity residing in rural communities.",
    after:
      "We will follow older adults in rural towns who live with several long-term conditions for two years, to learn why many of them stop taking their medicines.",
    rules: [
      { avoid: "utilise", prefer: "use" },
      { avoid: "interrogate", prefer: "study, examine" },
      {
        avoid: "non-adherence",
        prefer: "stop taking their medicines (in lay text)",
      },
    ],
    workflow: [
      {
        step: "Set the word limit",
        text: "Lucid proposes cuts ranked by how little they lose.",
      },
      {
        step: "Write the lay version",
        text: "A separate plain-English pass, kept in sync with the technical text.",
      },
      {
        step: "Harmonise co-authors",
        text: "One style guide across every section, with a single voice at the end.",
      },
    ],
    quote: {
      text: "We cut 600 words from a renewal application without losing a single aim.",
      name: "Dr. Imogen Clarke",
      role: "Research coordinator, Lakeshore Institute",
    },
  },
];

/* ---------- Pricing ---------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  yearly: number | null;
  unit: string;
  summary: string;
  cta: { label: string; to: string };
  features: string[];
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  heading: "Pay for writers, not for words",
  lede: "Every plan includes review mode, the browser extension and the desktop editor. Prices in US dollars, taxes extra. Yearly billing saves about two months.",
  plans: [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      yearly: 0,
      unit: "forever",
      summary: "For trying Lucid on your own drafts.",
      cta: { label: "Create a free account", to: "/signup" },
      features: [
        "40 rewrites a week",
        "Clarity and tone suggestions",
        "Browser extension",
        "One saved instruction",
      ],
    },
    {
      id: "writer",
      name: "Writer",
      monthly: 12,
      yearly: 10,
      unit: "per month",
      summary: "For one person who writes for a living.",
      cta: { label: "Start a 14-day trial", to: "/signup" },
      features: [
        "Unlimited rewrites",
        "Fact flags and reading level",
        "Desktop editor and mail add-in",
        "Personal style guide",
        "Unlimited saved instructions",
      ],
    },
    {
      id: "team",
      name: "Team",
      monthly: 20,
      yearly: 16,
      unit: "per seat / month",
      summary: "For teams that share a voice.",
      cta: { label: "Start a 14-day trial", to: "/signup" },
      features: [
        "Everything in Writer",
        "Shared house style and term lists",
        "Shared instruction library",
        "Admin controls and usage reports",
        "Priority support",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      yearly: null,
      unit: "billed yearly",
      summary: "For regulated teams and large rollouts.",
      cta: { label: "Talk to sales", to: "/contact" },
      features: [
        "Everything in Team",
        "SAML SSO and SCIM",
        "Zero retention and data residency",
        "API access and audit log",
        "Named success manager",
      ],
    },
  ] as Plan[],
  seats: { label: "Team seats", min: 2, max: 500, initial: 12 },
  compare: {
    heading: "Compare every plan",
    columns: ["Free", "Writer", "Team", "Enterprise"],
    rows: [
      ["Rewrites", "40 / week", "Unlimited", "Unlimited", "Unlimited"],
      ["Review mode", true, true, true, true],
      ["Fact flags", false, true, true, true],
      ["Reading level targets", false, true, true, true],
      ["Style guide", false, "Personal", "Shared", "Shared, per team"],
      [
        "Saved instructions",
        "1",
        "Unlimited",
        "Shared library",
        "Shared library",
      ],
      ["Desktop editor", true, true, true, true],
      ["Mail add-in", false, true, true, true],
      ["API", false, false, "10,000 calls / mo", "Custom"],
      ["Single sign-on", false, false, "Google, Microsoft", "SAML, OIDC, SCIM"],
      ["Data retention", "30 days", "30 days", "30 days", "Zero to 90 days"],
      ["Support", "Help centre", "Email", "Priority email", "Named manager"],
    ] as [string, ...(string | boolean)[]][],
  },
  faq: [
    {
      q: "Do you train AI models on my writing?",
      a: "No. Customer text is never used to train or fine-tune any model, on any plan. Our model providers are contractually barred from it too, and the clause is in our DPA.",
    },
    {
      q: "What counts as a rewrite on the Free plan?",
      a: "One request: a prompt or a full-document review. Accepting or rejecting changes is free and unlimited. The counter resets every Monday.",
    },
    {
      q: "Can I switch between monthly and yearly billing?",
      a: "Yes, at any time. Moving to yearly applies the discount from your next invoice; moving to monthly takes effect when your yearly term ends.",
    },
    {
      q: "How are Team seats counted?",
      a: "A seat is anyone who can sign in to your workspace. Reviewers who only read shared documents are free. You can add or remove seats any day and we prorate the difference.",
    },
    {
      q: "Is there a discount for nonprofits and schools?",
      a: "Registered nonprofits, schools and newsrooms get 50% off Writer and Team. Write to sales with your registration number.",
    },
    {
      q: "What happens to my documents if I cancel?",
      a: "You can export everything as Word or Markdown for 60 days. After that, documents are deleted from our servers and backups within 30 days.",
    },
  ],
};

/* ---------- Changelog ---------- */

export type Release = {
  version: string;
  date: string;
  tag: "New" | "Improved" | "Fixed";
  title: string;
  text: string;
  items: string[];
};

export const changelogPage = {
  title: "Changelog",
  heading: "Changelog",
  lede: "What we shipped, when, and what it means for your drafts. New releases go out every second Tuesday.",
  filterLabel: "Show",
};

export const releases: Release[] = [
  {
    version: "4.6",
    date: "2026-10-06",
    tag: "New",
    title: "Fact flags compare against your shared library",
    text: "When a draft says delivery takes 48 hours and your library says 24, Lucid now flags the mismatch and links to the source document.",
    items: [
      "Library sources shown in the suggestion note",
      "Admins choose which documents count as sources",
      "Works for prices, dates, durations and percentages",
    ],
  },
  {
    version: "4.5",
    date: "2026-09-22",
    tag: "Improved",
    title: "Review mode keyboard shortcuts",
    text: "Step through changes with J and K, accept with A, reject with R. Screen reader users hear the change and its reason as they move.",
    items: [
      "Shortcut sheet behind the ? key",
      "Undo the last decision with U",
      "Focus stays on the text, not on the toolbar",
    ],
  },
  {
    version: "4.4",
    date: "2026-09-08",
    tag: "New",
    title: "Reading level targets per document type",
    text: "Set a target grade for help articles, policies or proposals, and see live which sentences push the level up.",
    items: [
      "Targets inherited from the workspace",
      "Sentence-split suggestions instead of synonym swaps",
      "Grade shown in the document header",
    ],
  },
  {
    version: "4.3",
    date: "2026-08-25",
    tag: "New",
    title: "Zero retention for Enterprise workspaces",
    text: "Drafts can now be processed without being stored at all. Version history stays on your device in the desktop editor.",
    items: [
      "Per-workspace switch for admins",
      "Audit log entry for every change to retention",
      "Documented in the updated DPA",
    ],
  },
  {
    version: "4.2",
    date: "2026-08-11",
    tag: "Improved",
    title: "Faster suggestions on long documents",
    text: "Documents over 10,000 words now stream suggestions section by section, so you can start reviewing in about two seconds.",
    items: [
      "Median first suggestion down from 6.1 s to 1.9 s",
      "Progress shown per heading",
      "Lower memory use in the desktop editor",
    ],
  },
  {
    version: "4.1",
    date: "2026-07-28",
    tag: "New",
    title: "Style guide import from PDF",
    text: "Upload the PDF your brand team made in 2019. Lucid extracts the term lists, capitalisation rules and number formats, and shows what it found before applying anything.",
    items: [
      "Reviewable import with rule-by-rule approval",
      "Handles tables and two-column layouts",
      "Docs and Markdown imports improved too",
    ],
  },
  {
    version: "4.0.3",
    date: "2026-07-14",
    tag: "Fixed",
    title: "Smart quotes in the mail add-in",
    text: "Accepting a change no longer turns curly quotes straight in Outlook on Windows.",
    items: [
      "Fixed apostrophes in contractions",
      "Fixed en dashes in number ranges",
      "Fixed a rare duplicate signature on send",
    ],
  },
  {
    version: "4.0",
    date: "2026-06-30",
    tag: "New",
    title: "Spanish and German in beta",
    text: "Clarity, tone and house style suggestions now work in Spanish and German, with regional spelling for Spain, Mexico, Germany, Austria and Switzerland.",
    items: [
      "Language detected per paragraph",
      "Mixed-language documents supported",
      "Feedback button on every suggestion during the beta",
    ],
  },
];

/* ---------- About ---------- */

export const about = {
  title: "About",
  heading: "Built by copy editors who got tired of being the bottleneck",
  lede: "Lucid started in a newsroom in 2023. Two copy editors were marking up forty stories a night in blue pencil, and wondered what would happen if every writer had a patient second reader at three in the morning.",
  story: [
    "Mira Castellanos and Ben Achterberg spent eleven years on the copy desk of a Toronto daily. The job was invisible when done well: cut the throat-clearing, fix the dates, keep the reporter's voice. Most AI writing tools did the opposite. They replaced the writer's voice with their own and hid what they had changed.",
    "So they built the tool they wanted on the desk. Lucid shows every change as a tracked edit, explains it, and never adds a fact. Today it is used by 2,300 teams, from a four-person bakery to a hospital network, and it still edits the way a good copy editor does.",
  ],
  archive: {
    heading: "Revision is the oldest writing tool",
    text: "Every page we admire was marked up first. These four hang on the wall of our office.",
    items: [
      {
        image: jefferson,
        width: 833,
        height: 1300,
        alt: "A handwritten page of the Declaration of Independence draft, dense with crossed-out words and insertions between the lines.",
        caption:
          "Thomas Jefferson's rough draft of the Declaration of Independence, 1776.",
      },
      {
        image: frankenstein,
        width: 500,
        height: 753,
        alt: "A page of Frankenstein in Mary Shelley's handwriting, with words struck out and replacements written above them.",
        caption:
          "Mary Shelley's draft of Frankenstein, chapter 7, with revisions above the line.",
      },
      {
        image: hemingway,
        width: 1087,
        height: 1400,
        alt: "A typewritten list headed Titles, with candidate titles for a short story collection.",
        caption:
          "Ernest Hemingway's typed list of possible titles for In Our Time.",
      },
      {
        image: proust,
        width: 377,
        height: 458,
        alt: "A manuscript page by Marcel Proust, crossed out diagonally and covered in marginal additions.",
        caption:
          "The last page of Marcel Proust's manuscript of Le Temps retrouvé.",
      },
    ],
  },
  principles: {
    heading: "What we will not build",
    items: [
      {
        title: "A ghostwriter",
        text: "Lucid edits your draft. It does not write one from nothing and pass it off as yours.",
      },
      {
        title: "Hidden changes",
        text: "If Lucid changed a word, you can see it, undo it and read why.",
      },
      {
        title: "Invented facts",
        text: "Numbers, quotes and sources come from you. Lucid flags them; it never makes them up.",
      },
      {
        title: "A training pipeline",
        text: "Your drafts are not our data. We do not train on them, now or later.",
      },
    ],
  },
  team: {
    heading: "The people behind the pencil",
    people: [
      {
        name: "Mira Castellanos",
        role: "Co-founder, CEO",
        note: "Eleven years on a newspaper copy desk. Still reads every support ticket tagged “tone”.",
      },
      {
        name: "Ben Achterberg",
        role: "Co-founder, Head of Editorial",
        note: "Wrote the first version of the house style engine on a train between Toronto and Montréal.",
      },
      {
        name: "Yuki Tanabe",
        role: "CTO",
        note: "Previously built search at a legal publisher. Owns the rule that Lucid never adds a fact.",
      },
      {
        name: "Amara Nwosu",
        role: "Head of Design",
        note: "Designed review mode after watching thirty editors work with paper proofs.",
      },
      {
        name: "Leo Brandt",
        role: "Head of Security",
        note: "Runs the SOC 2 programme and the zero-retention pipeline.",
      },
      {
        name: "Sofía Marín",
        role: "Head of Languages",
        note: "Leads the Spanish and German beta with a team of six editors.",
      },
    ],
  },
  careers: {
    heading: "We are hiring editors and engineers",
    text: "Four open roles in Toronto and remote within Canada: senior frontend engineer, applied linguist, support editor and enterprise account executive.",
    link: "Ask about a role",
    email: "jobs@lucid.example",
  },
};

/* ---------- Contact sales ---------- */

export const contact = {
  title: "Talk to sales",
  heading: "Talk to someone who has read your kind of draft",
  lede: "Tell us about your team and what it writes. A specialist replies within one working day with a trial workspace set up for your documents.",
  sizes: [
    "1–10 writers",
    "11–50 writers",
    "51–200 writers",
    "201–1,000 writers",
    "More than 1,000",
  ],
  uses: [
    "Customer support",
    "Marketing and communications",
    "Sales",
    "People operations",
    "Engineering and docs",
    "Research and grants",
    "Something else",
  ],
  aside: [
    {
      heading: "What happens next",
      text: "A 30-minute call, a trial workspace with your style guide loaded, and a review of the results with your team after two weeks.",
    },
    {
      heading: "Already a customer?",
      text: "Write to our support editors at help@lucid.example. They answer in under four hours on weekdays.",
    },
  ],
  success:
    "Thank you. A Lucid specialist will reply to {email} within one working day.",
  note: "This is a template: nothing you type here is sent anywhere.",
};

/* ---------- Sign in / sign up ---------- */

export const signin = {
  title: "Sign in",
  heading: "Welcome back",
  lede: "Sign in to pick up your drafts where you left them.",
  signupTitle: "Create an account",
  signupHeading: "Start with a free account",
  signupLede:
    "One writer, 40 rewrites a week, no card. Upgrade when it earns its keep.",
  quote:
    "“The blue pencil is the most important tool on the desk, because it forces you to see what you cut.”",
  quoteBy: "Ben Achterberg, co-founder",
  note: "Demo only: no account is created and nothing is sent.",
};

export const notFound = {
  title: "Page not found",
  heading: "This page was cut in the edit",
  text: "The address you followed does not match any page. It may have moved, or it never made it past the draft.",
};

/* ---------- App demo ---------- */

export type EditKind = "Clarity" | "Tone" | "House style" | "Check fact";
export const editKinds: EditKind[] = [
  "Clarity",
  "Tone",
  "House style",
  "Check fact",
];

export type Edit = { from: string; to: string; kind: EditKind; why: string };
export type Paragraph = { text: string; heading?: boolean; edits?: Edit[] };
export type DocStatus = "Draft" | "In review" | "Ready";

export type Doc = {
  id: string;
  title: string;
  type: string;
  owner: string;
  status: DocStatus;
  updated: string;
  target: number;
  body: Paragraph[];
};

export const app = {
  workspace: "Halden Outfitters",
  plan: "Team plan · 14 seats",
  user: {
    name: "Noor Haddad",
    initials: "NH",
    email: "noor@halden.example",
    role: "Content lead",
  },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/documents", label: "Documents" },
    { to: "/app/style", label: "House style" },
    { to: "/app/settings", label: "Settings" },
  ],
  usage: { used: 812, limit: 1000, label: "Rewrites this month" },
};

export const overview = {
  heading: "Good morning, Noor",
  lede: "Your team reviewed 41 documents this week. Three are waiting for you.",
  weekly: [
    { week: "Jul 27", words: 18200, accepted: 0.71 },
    { week: "Aug 3", words: 21400, accepted: 0.69 },
    { week: "Aug 10", words: 19900, accepted: 0.73 },
    { week: "Aug 17", words: 24600, accepted: 0.74 },
    { week: "Aug 24", words: 22100, accepted: 0.72 },
    { week: "Aug 31", words: 17800, accepted: 0.76 },
    { week: "Sep 7", words: 26300, accepted: 0.75 },
    { week: "Sep 14", words: 28900, accepted: 0.78 },
    { week: "Sep 21", words: 27400, accepted: 0.77 },
    { week: "Sep 28", words: 31200, accepted: 0.8 },
    { week: "Oct 5", words: 29800, accepted: 0.81 },
    { week: "Oct 12", words: 33600, accepted: 0.83 },
  ],
  byKind: [
    { kind: "Clarity" as EditKind, accepted: 1184, total: 1402 },
    { kind: "Tone" as EditKind, accepted: 512, total: 731 },
    { kind: "House style" as EditKind, accepted: 960, total: 988 },
    { kind: "Check fact" as EditKind, accepted: 143, total: 166 },
  ],
  terms: [
    { avoid: "utilize", prefer: "use", count: 212 },
    { avoid: "waterproof", prefer: "water-resistant", count: 148 },
    { avoid: "free shipping", prefer: "free delivery", count: 97 },
    { avoid: "e-mail", prefer: "email", count: 64 },
    { avoid: "customer", prefer: "member", count: 51 },
  ],
  team: [
    { name: "Noor Haddad", docs: 14, accepted: 0.86 },
    { name: "Elliot Park", docs: 11, accepted: 0.79 },
    { name: "Grace Mbeki", docs: 9, accepted: 0.82 },
    { name: "Tom Raskin", docs: 7, accepted: 0.68 },
  ],
};

export const styleGuide = {
  heading: "House style",
  lede: "The rules Lucid applies to every draft in Halden Outfitters. Changes apply to new suggestions immediately.",
  rules: [
    { id: "r1", avoid: "utilize", prefer: "use", note: "Plain words first." },
    {
      id: "r2",
      avoid: "waterproof",
      prefer: "water-resistant",
      note: "Legal: only Storm-rated items are waterproof.",
    },
    {
      id: "r3",
      avoid: "free shipping",
      prefer: "free delivery",
      note: "We deliver; carriers ship.",
    },
    { id: "r4", avoid: "e-mail", prefer: "email", note: "No hyphen." },
    {
      id: "r5",
      avoid: "customer",
      prefer: "member",
      note: "Everyone with an account is a member.",
    },
    {
      id: "r6",
      avoid: "cheap",
      prefer: "affordable",
      note: "Cheap sounds like poor quality.",
    },
    {
      id: "r7",
      avoid: "Click here",
      prefer: "name the destination",
      note: "Links say where they go.",
    },
    { id: "r8", avoid: "guys", prefer: "everyone", note: "Inclusive address." },
  ],
  voice: {
    heading: "Voice",
    preview: "Preview with these settings",
  },
};

export const settings = {
  heading: "Settings",
  lede: "Workspace preferences for Halden Outfitters. Changes stay in this browser tab.",
  languages: [
    "English (Canada)",
    "English (US)",
    "English (UK)",
    "Spanish (beta)",
    "German (beta)",
  ],
  retention: ["Zero retention", "7 days", "30 days", "90 days"],
  notifications: [
    {
      id: "review",
      label: "A document is shared with me for review",
      on: true,
    },
    {
      id: "style",
      label: "Someone proposes a change to house style",
      on: true,
    },
    { id: "digest", label: "Weekly writing digest on Mondays", on: false },
    {
      id: "usage",
      label: "Workspace reaches 90% of monthly rewrites",
      on: true,
    },
  ],
};

export const docs: Doc[] = [
  {
    id: "winter-catalog-intro",
    title: "Winter catalog: introduction",
    type: "Catalog copy",
    owner: "Noor Haddad",
    status: "In review",
    updated: "2026-10-16",
    target: 8,
    body: [
      { text: "Built for the long dark", heading: true },
      {
        text: "Winter on the Atlantic coast is long, wet and very cold, and we think our new range of jackets and boots is really the best way to utilize those short, bright days to their fullest extent.",
        edits: [
          {
            from: "very cold",
            to: "cold",
            kind: "Clarity",
            why: "“Very” adds length, not cold. Let the next sentence prove it.",
          },
          {
            from: "we think our new range of jackets and boots is really the best way to utilize those short, bright days to their fullest extent",
            to: "our new jackets and boots are made for its short, bright days",
            kind: "Clarity",
            why: "Cut the hedge and the filler; the claim reads stronger without “we think”.",
          },
        ],
      },
      {
        text: "Every boot in the range is waterproof to 15 cm and lined with recycled wool. Every jacket is tested for 48 hours in our rain room in Halifax before it reaches a store.",
        edits: [
          {
            from: "waterproof",
            to: "water-resistant",
            kind: "House style",
            why: "House style: only Storm-rated items are called waterproof.",
          },
          {
            from: "48 hours",
            to: "24 hours",
            kind: "Check fact",
            why: "Your library page “How we test” says 24 hours. Check which is right.",
          },
        ],
      },
      {
        text: "As always, customers get free shipping on orders over $75, and returns are free for 60 days.",
        edits: [
          {
            from: "customers get free shipping",
            to: "members get free delivery",
            kind: "House style",
            why: "House style: “member”, not “customer”; “delivery”, not “shipping”.",
          },
        ],
      },
    ],
  },
  {
    id: "returns-policy",
    title: "Returns policy update",
    type: "Policy",
    owner: "Grace Mbeki",
    status: "Draft",
    updated: "2026-10-15",
    target: 8,
    body: [
      { text: "What's changing on 1 November", heading: true },
      {
        text: "In order to ensure that our returns process remains sustainable going forward, items purchased on or after 1 November must be returned within a period of 60 days from the date of delivery.",
        edits: [
          {
            from: "In order to ensure that our returns process remains sustainable going forward, items",
            to: "From 1 November, items",
            kind: "Clarity",
            why: "Lead with the date and the rule. The reason can follow in its own sentence.",
          },
          {
            from: "purchased on or after 1 November must be returned within a period of 60 days from the date of delivery",
            to: "can be returned within 60 days of delivery",
            kind: "Clarity",
            why: "“A period of” and “the date of” add nothing. “Can” is friendlier than “must”.",
          },
        ],
      },
      {
        text: "Items must be unworn and have tags attached. Please be advised that we are unable to accept returns on sale items under any circumstances whatsoever.",
        edits: [
          {
            from: "Please be advised that we are unable to accept returns on sale items under any circumstances whatsoever.",
            to: "Sale items can't be returned, but we will always repair or replace a faulty one.",
            kind: "Tone",
            why: "Say the rule once, without emphasis, and offer what you can do.",
          },
        ],
      },
      {
        text: "To start a return, sign in to your account and choose Return an item. Our team answers return questions at help@halden.example within one working day.",
      },
    ],
  },
  {
    id: "macro-delayed-order",
    title: "Support macro: delayed order",
    type: "Support macro",
    owner: "Elliot Park",
    status: "Ready",
    updated: "2026-10-14",
    target: 6,
    body: [
      {
        text: "Hi {first_name}, thank you so much for your patience. Unfortunately, your order has been delayed due to the fact that our carrier is experiencing higher than normal volumes at this time.",
        edits: [
          {
            from: "thank you so much for your patience. Unfortunately, your order has been delayed due to the fact that our carrier is experiencing higher than normal volumes at this time.",
            to: "your order is running late because our carrier is very busy this week.",
            kind: "Tone",
            why: "Say what happened first. Thanking someone for patience they didn't offer can read as sarcastic.",
          },
        ],
      },
      {
        text: "It should now arrive by {new_date}. If it has not arrived by then, reply to this e-mail and I will send a replacement the same day.",
        edits: [
          {
            from: "e-mail",
            to: "email",
            kind: "House style",
            why: "House style: “email”, no hyphen.",
          },
        ],
      },
      {
        text: "Sorry for the wait, and thank you for shopping with us. {agent_name}",
      },
    ],
  },
  {
    id: "rain-room-blog",
    title: "How we test rain shells",
    type: "Blog post",
    owner: "Tom Raskin",
    status: "Draft",
    updated: "2026-10-12",
    target: 9,
    body: [
      { text: "Inside the rain room", heading: true },
      {
        text: "Our rain room is a 4-metre box in the back of the Halifax warehouse. It utilizes 36 nozzles to simulate the kind of sideways rain you get on the Cabot Trail in October.",
        edits: [
          {
            from: "utilizes",
            to: "uses",
            kind: "House style",
            why: "House style: “use”, not “utilize”.",
          },
        ],
      },
      {
        text: "Each shell is worn by a volunteer for 24 hours, during which time they walk, climb a ladder, carry a 20 kg pack and, on one memorable occasion, assemble a flat-pack bookcase.",
        edits: [
          {
            from: "during which time they walk",
            to: "while they walk",
            kind: "Clarity",
            why: "Shorter connective, same meaning.",
          },
        ],
      },
      {
        text: "If a single seam lets water through, the design goes back to our team in Lunenburg. Last year, four out of eleven designs failed the first time, which we think is a really good sign.",
        edits: [
          {
            from: "which we think is a really good sign",
            to: "which is exactly why we test",
            kind: "Tone",
            why: "Explain why failure is good news instead of asserting it.",
          },
        ],
      },
    ],
  },
  {
    id: "q3-investor-update",
    title: "Q3 investor update",
    type: "Investor update",
    owner: "Noor Haddad",
    status: "In review",
    updated: "2026-10-10",
    target: 10,
    body: [
      {
        text: "Q3 in one line: strong winter pre-orders, slower wholesale",
        heading: true,
      },
      {
        text: "As many of you will know, it has been quite a busy quarter for the team, and we are pleased to report that winter pre-orders reached $1.42 million, up 31% on last year.",
        edits: [
          {
            from: "As many of you will know, it has been quite a busy quarter for the team, and we are pleased to report that winter pre-orders",
            to: "Winter pre-orders",
            kind: "Clarity",
            why: "Investors read on phones. Put the number in the first five words.",
          },
        ],
      },
      {
        text: "Wholesale was weaker than we would have liked, with revenue of $380,000 against a plan of $450,000, as two regional chains delayed their orders to January.",
        edits: [
          {
            from: "Wholesale was weaker than we would have liked, with revenue of",
            to: "Wholesale missed plan:",
            kind: "Tone",
            why: "State the miss plainly. Hedging makes bad news read worse.",
          },
          {
            from: "against a plan of",
            to: "against",
            kind: "Clarity",
            why: "“Plan” is already in the sentence.",
          },
        ],
      },
      {
        text: "Our one ask this quarter: introductions to buyers at outdoor retailers in the north-eastern United States.",
      },
    ],
  },
  {
    id: "release-notes-app-3-8",
    title: "Halden app 3.8 release notes",
    type: "Release notes",
    owner: "Elliot Park",
    status: "Ready",
    updated: "2026-10-08",
    target: 7,
    body: [
      {
        text: "Refactored the checkout service and resolved an issue whereby gift cards could be applied twice under certain edge-case conditions.",
        edits: [
          {
            from: "Refactored the checkout service and resolved an issue whereby gift cards could be applied twice under certain edge-case conditions.",
            to: "Checkout is faster, and gift cards can no longer be applied twice by accident.",
            kind: "Clarity",
            why: "Release notes are for members. Say what they will notice.",
          },
        ],
      },
      {
        text: "Members can now save their boot size to their profile, so the size guide opens on the right size every time.",
      },
      {
        text: "Click here to read the full list of changes.",
        edits: [
          {
            from: "Click here to read the full list of changes.",
            to: "Read the full list of changes in the help centre.",
            kind: "House style",
            why: "House style: links say where they go.",
          },
        ],
      },
    ],
  },
  {
    id: "store-lead-job",
    title: "Job post: store lead, Halifax",
    type: "Job post",
    owner: "Grace Mbeki",
    status: "Draft",
    updated: "2026-10-03",
    target: 8,
    body: [
      { text: "Store lead, Halifax waterfront", heading: true },
      {
        text: "We are looking for a retail rockstar who can lead a team of eight guys and gals and who is passionate about the outdoors.",
        edits: [
          {
            from: "a retail rockstar who can lead a team of eight guys and gals and who is passionate about the outdoors",
            to: "a store lead to run a team of eight and help people get outside in the right gear",
            kind: "Tone",
            why: "“Rockstar” and “guys and gals” put people off. Describe the job.",
          },
        ],
      },
      {
        text: "The salary is $58,000 to $64,000, with a 40% staff discount, four weeks of paid leave and a gear allowance of $600 a year.",
      },
      {
        text: "To apply, send a short note about a time you helped someone find the right thing to jobs@halden.example before 31 October.",
      },
    ],
  },
  {
    id: "tidewater-proposal",
    title: "Partner proposal: Tidewater Parks",
    type: "Proposal",
    owner: "Tom Raskin",
    status: "In review",
    updated: "2026-09-29",
    target: 10,
    body: [
      { text: "Gear for every ranger, every season", heading: true },
      {
        text: "We would like to take this opportunity to propose a three-year partnership under which Halden Outfitters will provide cheap, reliable uniforms and field gear to all 140 Tidewater Parks rangers.",
        edits: [
          {
            from: "We would like to take this opportunity to propose",
            to: "We propose",
            kind: "Clarity",
            why: "The proposal is the opportunity. Start with the verb.",
          },
          {
            from: "cheap",
            to: "affordable",
            kind: "House style",
            why: "House style: “affordable”, not “cheap”.",
          },
        ],
      },
      {
        text: "The total cost is $212,000 over three years, which works out at roughly $505 per ranger per year including repairs.",
        edits: [
          {
            from: "$505",
            to: "$505",
            kind: "Check fact",
            why: "Matches the total: $212,000 over 3 years for 140 rangers is $504.76. Mark it checked once finance agrees.",
          },
        ],
      },
      {
        text: "If the board agrees, we can fit the first rangers in January and complete the rollout before the spring season opens.",
      },
    ],
  },
];
