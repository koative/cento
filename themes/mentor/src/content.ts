import heroImg from "./assets/hero.jpg";
import callImg from "./assets/call.jpg";
import windowImg from "./assets/window.jpg";
import deskImg from "./assets/desk.jpg";
import notebookImg from "./assets/notebook.jpg";
import worksheetImg from "./assets/worksheet.jpg";
import journalImg from "./assets/journal.jpg";
import micImg from "./assets/mic.jpg";
import studioImg from "./assets/studio.jpg";
import arturoImg from "./assets/client-arturo.jpg";
import danaImg from "./assets/client-dana.jpg";
import joelImg from "./assets/client-joel.jpg";
import lenaImg from "./assets/client-lena.jpg";
import marenImg from "./assets/client-maren.jpg";
import viktorImg from "./assets/client-viktor.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Mentor",
  coach: "Margo Ellery",
  tagline: "Coaching for the promotion nobody trains you for.",
  email: "hello@mentor.example",
  phone: "+1 555 0148 220",
  phoneHref: "tel:+15550148220",
  base: "Minneapolis, coaching on video across time zones",
  hours: "Calls Monday to Friday, 8am–6pm Central",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  hero: {
    src: heroImg,
    alt: "Margo Ellery at her desk, laughing mid-sentence with her glasses in one hand and a prompt card in the other",
    w: 1600,
    h: 1067,
  },
  call: {
    src: callImg,
    alt: "Margo on a video coaching call, both hands raised as a client describes a breakthrough",
    w: 934,
    h: 1400,
  },
  window: {
    src: windowImg,
    alt: "Margo on the phone by the studio window, mid-conversation",
    w: 1400,
    h: 934,
  },
  desk: {
    src: deskImg,
    alt: "Margo reading a client's card while preparing a session at her laptop",
    w: 934,
    h: 1400,
  },
  notebook: {
    src: notebookImg,
    alt: "Margo's hand resting a pen on an open notebook beside her laptop",
    w: 1400,
    h: 934,
  },
  worksheet: {
    src: worksheetImg,
    alt: "A manager writing in a notebook next to a laptop, seen from above",
    w: 1400,
    h: 934,
  },
  journal: {
    src: journalImg,
    alt: "Close-up of a hand writing in a paper notebook",
    w: 1200,
    h: 801,
  },
  mic: {
    src: micImg,
    alt: "A recording microphone on a boom arm in a dim studio",
    w: 933,
    h: 1400,
  },
  studio: {
    src: studioImg,
    alt: "A round podcast table set with four microphones and headphones",
    w: 1400,
    h: 997,
  },
  arturo: {
    src: arturoImg,
    alt: "Arturo Benítez, arms folded, smiling in a white T-shirt",
    w: 665,
    h: 1000,
  },
  dana: {
    src: danaImg,
    alt: "Dana Whitfield laughing on a video call by a cabin window",
    w: 666,
    h: 1000,
  },
  joel: {
    src: joelImg,
    alt: "Joel Ambrose in a navy blazer, standing in an office corridor",
    w: 666,
    h: 1000,
  },
  lena: {
    src: lenaImg,
    alt: "Lena Marsh mid-gesture on a video call at her kitchen table",
    w: 1000,
    h: 665,
  },
  maren: {
    src: marenImg,
    alt: "Maren Osei taking notes at her desk during a call",
    w: 1000,
    h: 667,
  },
  viktor: {
    src: viktorImg,
    alt: "Viktor Hale in a grey suit, looking out of frame",
    w: 666,
    h: 1000,
  },
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;

export const nav = [
  { to: "/programmes", label: "Programmes" },
  { to: "/resources", label: "Free resources" },
  { to: "/podcast", label: "Podcast" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
];

/* ------------------------------------------------------------ the manager's wheel */

export type SkillId =
  | "delegation"
  | "feedback"
  | "one-on-ones"
  | "priorities"
  | "managing-up"
  | "hiring"
  | "conflict"
  | "energy";

export const skills: {
  id: SkillId;
  label: string;
  prompt: string;
  low: string;
}[] = [
  {
    id: "one-on-ones",
    label: "1:1s",
    prompt: "My 1:1s are about the person, not the project list.",
    low: "Your 1:1s have drifted into status updates.",
  },
  {
    id: "delegation",
    label: "Delegation",
    prompt: "I hand over whole outcomes, not just tasks.",
    low: "You're still doing work you hired people to do.",
  },
  {
    id: "feedback",
    label: "Feedback",
    prompt: "I give feedback within a week, in under two minutes.",
    low: "Feedback is waiting for the perfect moment.",
  },
  {
    id: "priorities",
    label: "Priorities",
    prompt: "My team can name our top three priorities.",
    low: "Everything is urgent, so nothing is chosen.",
  },
  {
    id: "managing-up",
    label: "Managing up",
    prompt: "My boss knows what I need before I'm stuck.",
    low: "Your boss hears about problems late.",
  },
  {
    id: "hiring",
    label: "Hiring",
    prompt: "I know what good looks like before I interview.",
    low: "Hiring happens on gut feel and calendar luck.",
  },
  {
    id: "conflict",
    label: "Conflict",
    prompt: "I name tension early, before it hardens.",
    low: "A hard conversation is overdue.",
  },
  {
    id: "energy",
    label: "Your energy",
    prompt: "I end most weeks tired, not depleted.",
    low: "The job is costing more than it should.",
  },
];

export const wheel = {
  title: "The Manager's Wheel",
  intro:
    "The exercise I open every coaching relationship with. Score each spoke from 1 to 10 for how it feels this month, not how it should feel. Click the rings or use the sliders; the lowest spokes are where we'd start.",
  note: "Your scores stay in this browser. Bring them to an application and I'll read them before our first call.",
};

/* ------------------------------------------------------------ programmes */

export type Format =
  "Self-paced" | "Live cohort" | "Private coaching" | "In-house";
export type Stage =
  "New manager" | "Experienced manager" | "Manager of managers";
export type Tone = "navy" | "red" | "yellow" | "kraft" | "rule" | "sky";

export type Cohort = { start: string; seats: number; left: number };

export type Programme = {
  slug: string;
  name: string;
  format: Format;
  stages: Stage[];
  length: string;
  weeks: number;
  perWeek: string;
  price: number;
  /** Instalment plan: `count` monthly payments of `amount`. */
  plan?: { count: number; amount: number };
  priceNote?: string;
  schedule: string;
  cohorts: Cohort[];
  availability?: string;
  summary: string;
  promise: string;
  tone: Tone;
  image: ImageKey;
  skills: SkillId[];
  outcomes: string[];
  curriculum: { label: string; title: string; points: string[] }[];
  includes: string[];
  forYou: string[];
  notForYou: string[];
  faq: { q: string; a: string }[];
};

export const formats: Format[] = [
  "Self-paced",
  "Live cohort",
  "Private coaching",
  "In-house",
];
export const stages: Stage[] = [
  "New manager",
  "Experienced manager",
  "Manager of managers",
];

export const programmes: Programme[] = [
  {
    slug: "first-90-days",
    name: "The First 90 Days",
    format: "Self-paced",
    stages: ["New manager"],
    length: "6 modules",
    weeks: 6,
    perWeek: "About 2 hours a week",
    price: 290,
    schedule: "Start any day. Lifetime access, including every update.",
    cohorts: [],
    availability: "Open now",
    summary:
      "A self-paced course for your first quarter as a manager: the conversations, rhythms and decisions to set up before habits set themselves.",
    promise:
      "By day 90 you run a team rhythm you designed on purpose, not one you inherited by accident.",
    tone: "yellow",
    image: "worksheet",
    skills: ["one-on-ones", "priorities", "delegation"],
    outcomes: [
      "A first 1:1 with every report, scripted and done",
      "A weekly rhythm of 1:1s, team meeting and async update that fits on one page",
      "A written list of the work you've stopped doing yourself",
      "Your own 90-day review, written before anyone asks for it",
    ],
    curriculum: [
      {
        label: "Module 1",
        title: "From maker to manager",
        points: [
          "Why your old scorecard stops working",
          "The identity wobble in week three, and what to do with it",
          "Worksheet: the not-doing list",
        ],
      },
      {
        label: "Module 2",
        title: "Your first conversations",
        points: [
          "The first 1:1 script for every report",
          "Listening-tour questions for peers and your boss",
          "Template: your first-week letter to the team",
        ],
      },
      {
        label: "Module 3",
        title: "Rhythms",
        points: [
          "1:1s that aren't status updates",
          "A team meeting worth turning up to",
          "The async update that replaces three meetings",
        ],
      },
      {
        label: "Module 4",
        title: "Delegation without dumping",
        points: [
          "The delegation ladder, rung by rung",
          "Handing over the work you're best at",
          "Checking in without hovering",
        ],
      },
      {
        label: "Module 5",
        title: "Feedback, early and small",
        points: [
          "Feedback in under two minutes",
          "Praise specific enough to be repeated",
          "Your first hard conversation, rehearsed",
        ],
      },
      {
        label: "Module 6",
        title: "Your 90-day review",
        points: [
          "Writing your own review before your boss does",
          "Asking the team how you're doing",
          "Planning the next quarter",
        ],
      },
    ],
    includes: [
      "31 short videos, 4 to 12 minutes each",
      "14 worksheets and templates as PDF and editable docs",
      "Two live Q&A calls a month with Margo",
      "Lifetime access and every future update",
    ],
    forYou: [
      "You became a manager in the last six months, or start soon",
      "You lead two to eight people",
      "You'd rather work through it at your own pace",
    ],
    notForYou: [
      "You already manage managers: Leading Managers fits better",
      "You want someone looking at your situation every fortnight: that's 1:1 coaching",
    ],
    faq: [
      {
        q: "How long do I have access?",
        a: "For as long as the course exists, updates included. Most people finish in six to eight weeks.",
      },
      {
        q: "Can my company pay?",
        a: "Yes. Choose “my company” on the application and we send an invoice with your name and the course on it.",
      },
      {
        q: "What if it isn't useful?",
        a: "Work through the first two modules within 30 days. If it hasn't helped, email us and you get the full amount back.",
      },
    ],
  },
  {
    slug: "new-manager-cohort",
    name: "New Manager Cohort",
    format: "Live cohort",
    stages: ["New manager"],
    length: "8 weeks",
    weeks: 8,
    perWeek: "90-minute session plus an hour of practice",
    price: 1450,
    plan: { count: 3, amount: 495 },
    schedule: "Thursdays, 4:00–5:30pm Central, on video",
    cohorts: [
      { start: "2027-01-14", seats: 12, left: 5 },
      { start: "2027-04-08", seats: 12, left: 12 },
    ],
    summary:
      "Eight live weeks with eleven other new managers. Every session we take a real situation from someone in the room and work it until there's a next step.",
    promise:
      "You leave with a playbook built from your own team, and a peer group you'll still be texting in two years.",
    tone: "navy",
    image: "call",
    skills: ["feedback", "one-on-ones", "delegation", "conflict"],
    outcomes: [
      "A 1:1 format your team asks to keep",
      "Three real pieces of feedback given, debriefed and followed up",
      "A delegation plan for the work only you were doing",
      "Your own operating manual, shared with your team in week eight",
    ],
    curriculum: [
      {
        label: "Week 1",
        title: "The job you actually have",
        points: [
          "What your boss, your team and your peers each need from you",
          "Your calendar, audited live",
          "Meet your peer trio",
        ],
      },
      {
        label: "Week 2",
        title: "1:1s that build trust",
        points: [
          "Their agenda first",
          "Questions that get past “all good”",
          "Practice round in trios",
        ],
      },
      {
        label: "Week 3",
        title: "Delegation",
        points: [
          "The five-rung ladder",
          "Choosing what to hand over first",
          "Live case: the report who keeps handing it back",
        ],
      },
      {
        label: "Week 4",
        title: "Feedback both ways",
        points: [
          "Situation, behaviour, impact, ask",
          "Asking for feedback so people actually give it",
          "Two-minute rehearsals",
        ],
      },
      {
        label: "Week 5",
        title: "Priorities and saying no",
        points: [
          "The top-three test",
          "Saying no upwards, with options",
          "Protecting focus time for the team",
        ],
      },
      {
        label: "Week 6",
        title: "Conflict on the team",
        points: [
          "Naming tension early",
          "Mediating without taking sides",
          "Live case from the cohort",
        ],
      },
      {
        label: "Week 7",
        title: "Managing up",
        points: [
          "The weekly memo your boss will read",
          "Bringing problems with a proposal",
          "Getting the resources you need",
        ],
      },
      {
        label: "Week 8",
        title: "Your operating manual",
        points: [
          "Writing how you work, honestly",
          "Presenting it to the cohort",
          "Your next 90 days",
        ],
      },
    ],
    includes: [
      "Eight live 90-minute sessions, recorded for catch-up",
      "A peer trio you practise with between sessions",
      "One private 45-minute session with Margo",
      "The First 90 Days course, included",
      "A completion letter your company can file for training budget",
    ],
    forYou: [
      "You've managed people for less than eighteen months",
      "You learn best by talking it through with others",
      "You can protect Thursday afternoons for eight weeks",
    ],
    notForYou: [
      "Your calendar can't hold a weekly live slot: start with The First 90 Days",
      "You need to work on something confidential: 1:1 coaching is private",
    ],
    faq: [
      {
        q: "What if I miss a session?",
        a: "Every session is recorded, and your trio fills you in. Miss more than two and we'll offer you a seat in the next cohort instead.",
      },
      {
        q: "Who else is in the room?",
        a: "Twelve managers from different companies and functions, usually five to eight time zones apart. We never put two people from the same team in one cohort.",
      },
      {
        q: "Can I pay in instalments?",
        a: "Yes: three monthly payments of $495, the first when your place is confirmed.",
      },
    ],
  },
  {
    slug: "hard-conversations",
    name: "Hard Conversations",
    format: "Live cohort",
    stages: ["New manager", "Experienced manager"],
    length: "4 weeks",
    weeks: 4,
    perWeek: "One 2-hour workshop",
    price: 480,
    schedule: "Tuesdays, 12:00–2:00pm Central, on video",
    cohorts: [
      { start: "2026-11-10", seats: 20, left: 3 },
      { start: "2027-02-09", seats: 20, left: 20 },
    ],
    summary:
      "Four practice-heavy workshops on the conversations managers put off: underperformance, pushback, bad news, and the colleague who used to be your peer.",
    promise:
      "You say the hard thing in the first two minutes, kindly, and know what to do with the silence that follows.",
    tone: "red",
    image: "notebook",
    skills: ["conflict", "feedback"],
    outcomes: [
      "One overdue conversation planned, rehearsed and held",
      "An opening line for the five conversations you dread most",
      "A follow-up habit so the conversation actually changes something",
    ],
    curriculum: [
      {
        label: "Workshop 1",
        title: "Name it in one sentence",
        points: [
          "Why we circle and how to stop",
          "Writing the first sentence before anything else",
          "Rehearsal with a trained actor",
        ],
      },
      {
        label: "Workshop 2",
        title: "Underperformance without the cliff",
        points: [
          "Separating will from skill",
          "Agreeing what good looks like, in writing",
          "The 30-day check-in",
        ],
      },
      {
        label: "Workshop 3",
        title: "Decisions you didn't make",
        points: [
          "Delivering news you disagree with",
          "Holding the line without hiding behind “they”",
          "Taking the questions",
        ],
      },
      {
        label: "Workshop 4",
        title: "When it gets heated",
        points: [
          "Noticing your own flood signs",
          "Pausing a conversation well",
          "Repair the next morning",
        ],
      },
    ],
    includes: [
      "Four live workshops with role-play in small rooms",
      "The hard-conversation planner and opening-line cards",
      "Recordings of the teaching sections (role-plays are never recorded)",
    ],
    forYou: [
      "You have a specific conversation you've been putting off",
      "You manage at least one person",
      "You're willing to practise out loud",
    ],
    notForYou: [
      "You need help with a formal HR process: talk to your HR partner first",
    ],
    faq: [
      {
        q: "Will I have to role-play in front of everyone?",
        a: "No. Practice happens in rooms of three, with a facilitator dropping in. You can watch the first round before you try.",
      },
      {
        q: "Is it confidential?",
        a: "Yes. Role-plays aren't recorded, and we ask everyone to change names and details before sharing a case.",
      },
    ],
  },
  {
    slug: "one-to-one",
    name: "1:1 Coaching with Margo",
    format: "Private coaching",
    stages: ["New manager", "Experienced manager", "Manager of managers"],
    length: "3 months",
    weeks: 12,
    perWeek: "A 60-minute session every two weeks",
    price: 3600,
    plan: { count: 3, amount: 1250 },
    schedule: "Times to suit you, Monday to Friday, 8am–6pm Central",
    cohorts: [],
    availability: "Two places open for January starts",
    summary:
      "Six private sessions over three months, voice notes in between, and a coach who remembers what you said you'd do.",
    promise:
      "We work on the thing you'd never say out loud in a cohort, until it's something you can say out loud at work.",
    tone: "sky",
    image: "window",
    skills: ["managing-up", "energy", "priorities", "conflict"],
    outcomes: [
      "One or two goals that are yours, agreed in the first session",
      "A record of every commitment and what happened next",
      "A plan for the next six months that you wrote, not me",
    ],
    curriculum: [
      {
        label: "Weeks 1–2",
        title: "Intake",
        points: [
          "Your Manager's Wheel and a 90-minute first session",
          "Optional: short interviews with your boss and two reports",
          "Agreeing what “better” would look like by month three",
        ],
      },
      {
        label: "Weeks 3–10",
        title: "The work",
        points: [
          "A session every two weeks, 60 minutes, on video",
          "Voice notes between sessions, answered within a working day",
          "Real situations, worked as they happen",
        ],
      },
      {
        label: "Weeks 11–12",
        title: "Make it stick",
        points: [
          "A look back at every commitment you made",
          "Your plan for the next six months",
          "A written summary you can share with your boss, if you choose",
        ],
      },
    ],
    includes: [
      "Six 60-minute sessions plus a 90-minute intake",
      "Voice-note access between sessions",
      "Every worksheet and course Margo has made",
      "A shared session log you keep afterwards",
    ],
    forYou: [
      "You want undivided attention on your situation",
      "You're stuck on something specific, or ready for a bigger role",
      "Your company may be paying and wants to see progress",
    ],
    notForYou: [
      "You're looking for therapy. I'll gladly point you to someone who does it well",
      "You want to be told what to do: I'll ask more than I tell",
    ],
    faq: [
      {
        q: "Does my company see what we talk about?",
        a: "No. If your company pays, they get dates attended and, only if you agree, your own end-of-programme summary.",
      },
      {
        q: "Can we keep going after three months?",
        a: "About half of clients do, at $1,100 a month for two sessions. There's no auto-renewal; we decide together in week eleven.",
      },
      {
        q: "What's the first call like?",
        a: "Thirty minutes, free, to see if we're a fit. I'll tell you honestly if a cohort would serve you better.",
      },
    ],
  },
  {
    slug: "leading-managers",
    name: "Leading Managers",
    format: "Live cohort",
    stages: ["Manager of managers"],
    length: "10 weeks",
    weeks: 10,
    perWeek: "90-minute session every week",
    price: 2200,
    plan: { count: 3, amount: 750 },
    schedule: "Tuesdays, 8:00–9:30am Central, on video",
    cohorts: [{ start: "2027-02-02", seats: 10, left: 7 }],
    summary:
      "For directors and heads of: growing managers, running a leadership team, and leading through people you don't see every day.",
    promise:
      "Your managers stop escalating everything to you, and your leadership meeting starts making decisions.",
    tone: "kraft",
    image: "desk",
    skills: ["hiring", "delegation", "managing-up", "priorities"],
    outcomes: [
      "A development plan for each manager who reports to you",
      "A leadership-team meeting with a decision log",
      "A skip-level routine that hears signal, not gossip",
      "A one-page strategy your teams can repeat back",
    ],
    curriculum: [
      {
        label: "Weeks 1–2",
        title: "Your managers' first year",
        points: [
          "What new managers actually need from you",
          "Coaching, not rescuing",
          "The development conversation",
        ],
      },
      {
        label: "Weeks 3–4",
        title: "A leadership team, not a status meeting",
        points: [
          "Agendas built from decisions",
          "Disagreement as a feature",
          "The decision log",
        ],
      },
      {
        label: "Weeks 5–6",
        title: "Hiring and promoting managers",
        points: [
          "What good looks like at each level",
          "Interviewing for judgement",
          "Promotion cases that hold up",
        ],
      },
      {
        label: "Weeks 7–8",
        title: "Skip-levels and signal",
        points: [
          "Skip-level 1:1s that don't undermine",
          "Listening to the floor",
          "Acting on what you hear",
        ],
      },
      {
        label: "Weeks 9–10",
        title: "Strategy people can repeat",
        points: [
          "The one-page strategy",
          "Saying it until you're bored of it",
          "Your next year as a leader of leaders",
        ],
      },
    ],
    includes: [
      "Ten live sessions in a group of ten",
      "Two private sessions with Margo",
      "Templates for leadership-team agendas, skip-levels and promotion cases",
    ],
    forYou: [
      "At least two of your reports manage people",
      "You've been leading leaders for less than three years",
      "You want peers outside your company",
    ],
    notForYou: [
      "You manage individual contributors only: New Manager Cohort is the one",
    ],
    faq: [
      {
        q: "Is this an executive programme?",
        a: "It's for the layer below: directors, heads of and senior managers. VPs are welcome but will find the peers less senior.",
      },
      {
        q: "Can two people from one company join?",
        a: "Not the same cohort. For three or more, Manager Bench runs privately for your company.",
      },
    ],
  },
  {
    slug: "manager-bench",
    name: "Manager Bench",
    format: "In-house",
    stages: ["New manager", "Experienced manager"],
    length: "12 weeks",
    weeks: 12,
    perWeek: "A live session every other week, plus practice",
    price: 9800,
    priceNote: "From, for up to 8 managers",
    schedule: "Scheduled around your company calendar",
    cohorts: [],
    availability: "Booking for spring 2027",
    summary:
      "The cohort programme, run privately for 6 to 20 managers at one company and fitted to your review cycle, your values and your actual org chart.",
    promise:
      "Your managers share one language for 1:1s, feedback and delegation, and use it without being reminded.",
    tone: "rule",
    image: "journal",
    skills: ["feedback", "one-on-ones", "hiring", "conflict"],
    outcomes: [
      "One shared 1:1, feedback and delegation practice across the group",
      "A cohort of managers who bring problems to each other first",
      "An anonymous before-and-after read-out for your leadership team",
    ],
    curriculum: [
      {
        label: "Before",
        title: "Discovery",
        points: [
          "Interviews with your leadership team and HR",
          "An anonymous Manager's Wheel for every participant",
          "A programme plan fitted to your calendar",
        ],
      },
      {
        label: "Weeks 1–8",
        title: "Live sessions",
        points: [
          "Six live sessions on your themes",
          "Practice trios across departments",
          "Cases drawn from your own company, anonymised",
        ],
      },
      {
        label: "Weeks 9–12",
        title: "Embed",
        points: [
          "Two private sessions for each manager",
          "A read-out for leadership",
          "Materials your HR team can reuse",
        ],
      },
    ],
    includes: [
      "Discovery interviews and a fitted plan",
      "Six live sessions and sixteen private sessions",
      "Licences for The First 90 Days for every participant",
      "Read-out and reusable materials",
    ],
    forYou: [
      "You're an HR, People or L&D lead with six or more managers to support",
      "You want something more lasting than a one-day workshop",
    ],
    notForYou: [
      "You need a single keynote or a one-off workshop: email us, we'll suggest someone",
    ],
    faq: [
      {
        q: "How is it priced above eight managers?",
        a: "$1,100 per additional manager, up to twenty. Discovery is included in every package.",
      },
      {
        q: "Can it run in person?",
        a: "The live sessions can, within the US, plus travel at cost. Most companies keep it on video so every office joins equally.",
      },
    ],
  },
  {
    slug: "feedback-sprint",
    name: "The Feedback Sprint",
    format: "Self-paced",
    stages: ["New manager", "Experienced manager"],
    length: "10 days",
    weeks: 2,
    perWeek: "15 minutes a day",
    price: 49,
    schedule:
      "One email and a five-minute video each working morning for two weeks",
    cohorts: [],
    availability: "Starts the Monday after you join",
    summary:
      "Ten mornings, ten small reps. By the end you give feedback in under two minutes and ask for it without flinching.",
    promise:
      "Feedback stops being an event you prepare for and becomes something you do on a Tuesday.",
    tone: "red",
    image: "journal",
    skills: ["feedback"],
    outcomes: [
      "Ten pieces of feedback given, logged and reflected on",
      "A one-line ask that gets you honest feedback",
      "The feedback cards, printed and on your desk",
    ],
    curriculum: [
      {
        label: "Days 1–3",
        title: "Praise, properly",
        points: [
          "Specific enough to repeat",
          "In public or in private?",
          "Day three: praise upwards",
        ],
      },
      {
        label: "Days 4–7",
        title: "Redirecting",
        points: [
          "Situation, behaviour, impact, ask",
          "The two-minute rule",
          "Following up without nagging",
        ],
      },
      {
        label: "Days 8–10",
        title: "Asking for it",
        points: [
          "One question that gets honest answers",
          "Receiving it without defending",
          "Your feedback habit, written down",
        ],
      },
    ],
    includes: [
      "Ten daily emails with a five-minute video",
      "The printable feedback card set",
      "A feedback log template",
    ],
    forYou: [
      "You've been putting off a piece of feedback",
      "You want a small, daily nudge rather than a course",
    ],
    notForYou: [
      "You need help with a formal performance process: try Hard Conversations",
    ],
    faq: [
      {
        q: "Is the price per person?",
        a: "Yes. For a team of five or more, email us for a group code.",
      },
    ],
  },
];

/* ------------------------------------------------------------ free resources */

export type ResourceType = "Worksheet" | "Template" | "Card set" | "Guide";

export type Resource = {
  slug: string;
  title: string;
  type: ResourceType;
  skill: SkillId;
  format: string;
  minutes: number;
  summary: string;
  why: string;
  sections: { heading: string; items: string[] }[];
  programme: string;
  episode: string;
};

export const resourceTypes: ResourceType[] = [
  "Worksheet",
  "Template",
  "Card set",
  "Guide",
];

export const resources: Resource[] = [
  {
    slug: "one-on-one-agenda",
    title: "The 1:1 agenda that isn't a status update",
    type: "Template",
    skill: "one-on-ones",
    format: "2-page PDF and editable doc",
    minutes: 10,
    summary:
      "A 30-minute 1:1 structure that puts their agenda first and keeps project updates where they belong: in writing.",
    why: "Most 1:1s die of status. If the first ten minutes are a project update, the important thing never gets said. This agenda moves updates into a shared doc and gives the time back to the person.",
    sections: [
      {
        heading: "Their agenda · 15 minutes",
        items: [
          "What's on your mind this week?",
          "Where are you stuck, or about to be?",
          "What could I take off your plate?",
        ],
      },
      {
        heading: "Your agenda · 10 minutes",
        items: [
          "One piece of feedback, either direction",
          "Context they'd want before it's announced",
          "A decision you need their input on",
        ],
      },
      {
        heading: "Once a month · 5 minutes",
        items: [
          "What do you want to be better at by summer?",
          "What's one thing I should keep doing as your manager?",
        ],
      },
    ],
    programme: "first-90-days",
    episode: "status-meeting-in-disguise",
  },
  {
    slug: "delegation-ladder",
    title: "The Delegation Ladder",
    type: "Worksheet",
    skill: "delegation",
    format: "1-page PDF",
    minutes: 15,
    summary:
      "Five rungs from “do exactly this” to “it's yours”. Place each of your recurring tasks on a rung, then move one up.",
    why: "Delegation fails when the manager and the report imagine different rungs. Naming the rung out loud (“this one's a recommend, I decide”) removes most of the friction.",
    sections: [
      {
        heading: "The five rungs",
        items: [
          "Do as I describe",
          "Look into it and report back",
          "Recommend, and I'll decide",
          "Decide, then tell me",
          "Own it, and tell me if it's on fire",
        ],
      },
      {
        heading: "Your list",
        items: [
          "Write down six tasks you did last week that someone else could do",
          "Mark the rung each one sits on today",
          "Choose one to move up a rung, and the person",
        ],
      },
    ],
    programme: "new-manager-cohort",
    episode: "delegating-work-youre-proud-of",
  },
  {
    slug: "feedback-cards",
    title: "Feedback cards",
    type: "Card set",
    skill: "feedback",
    format: "12 printable index cards",
    minutes: 5,
    summary:
      "Situation, behaviour, impact, ask: one card each, plus eight opening lines for the moments you'd rather skip.",
    why: "Feedback goes wrong in the first sentence. A card on the desk means the first sentence is already written.",
    sections: [
      {
        heading: "The four cards",
        items: [
          "Situation: when and where, specifically",
          "Behaviour: what you saw or heard, no adjectives",
          "Impact: what it caused, for whom",
          "Ask: what you'd like next time, as a question",
        ],
      },
      {
        heading: "Opening lines",
        items: [
          "“Have you got two minutes for some feedback on Tuesday's demo?”",
          "“I want to name something small before it turns into something big.”",
          "“Can I tell you what I noticed in that meeting?”",
        ],
      },
    ],
    programme: "feedback-sprint",
    episode: "feedback-in-under-two-minutes",
  },
  {
    slug: "not-doing-list",
    title: "The not-doing list",
    type: "Worksheet",
    skill: "priorities",
    format: "1-page PDF",
    minutes: 20,
    summary:
      "Three columns for the things you'll stop, hand over or do badly on purpose, so the top three priorities get your best hours.",
    why: "Every new priority needs somewhere to come from. Writing the not-doing list is how you find it, and sharing it is how your boss agrees to it before it becomes a surprise.",
    sections: [
      {
        heading: "Stop",
        items: [
          "Meetings you attend out of habit",
          "Reports nobody reads",
          "Reviews where you're the fourth approver",
        ],
      },
      {
        heading: "Hand over",
        items: [
          "Work that would stretch someone on the team",
          "Anything you're doing because it's faster than explaining",
        ],
      },
      {
        heading: "Do badly on purpose",
        items: ["Slide polish", "Inbox zero", "Replying in under an hour"],
      },
    ],
    programme: "first-90-days",
    episode: "saying-no-to-your-boss",
  },
  {
    slug: "managing-up-memo",
    title: "The Friday memo to your boss",
    type: "Template",
    skill: "managing-up",
    format: "Editable doc",
    minutes: 10,
    summary:
      "Five headings, fifteen minutes, every Friday. The memo that means your boss hears about problems while they're still small.",
    why: "Your boss can't back you on something they hear about late. A short, predictable memo builds trust faster than any big presentation.",
    sections: [
      {
        heading: "The five headings",
        items: [
          "What shipped",
          "What's at risk, and what I'm doing about it",
          "A decision I need from you",
          "Something good about someone on the team",
          "What I'm focused on next week",
        ],
      },
    ],
    programme: "new-manager-cohort",
    episode: "managing-up-without-sucking-up",
  },
  {
    slug: "interview-scorecard",
    title: "Interview scorecard",
    type: "Template",
    skill: "hiring",
    format: "Spreadsheet and PDF",
    minutes: 30,
    summary:
      "Decide what good looks like before the first interview, then score against it, not against the last candidate you liked.",
    why: "First hires are where managers lean hardest on gut feel. A scorecard written before you meet anyone is the cheapest bias check there is.",
    sections: [
      {
        heading: "Before the first interview",
        items: [
          "Three outcomes this person owns in their first year",
          "Four competencies, each with a 1–4 description",
          "Who interviews for which competency",
        ],
      },
      {
        heading: "After each interview",
        items: [
          "Score independently before the debrief",
          "Evidence, not adjectives, for every score",
          "Hire, no hire, or one question still open",
        ],
      },
    ],
    programme: "leading-managers",
    episode: "your-first-hire",
  },
  {
    slug: "hard-conversation-planner",
    title: "The hard-conversation planner",
    type: "Worksheet",
    skill: "conflict",
    format: "2-page PDF",
    minutes: 20,
    summary:
      "One sentence to open, three outcomes to aim for, and a plan for the silence. Fill it in the night before.",
    why: "We circle because we haven't decided what we're actually saying. The planner makes you write the first sentence before anything else.",
    sections: [
      {
        heading: "Before",
        items: [
          "My first sentence is…",
          "The outcome I want, the one I'd accept, the one I won't",
          "What might they be worried about?",
        ],
      },
      {
        heading: "During",
        items: [
          "Say the first sentence in the first two minutes",
          "Ask, then wait: count to seven",
          "Agree one next step, out loud",
        ],
      },
      {
        heading: "After",
        items: [
          "Write down what was agreed and send it",
          "Book the follow-up before you leave",
        ],
      },
    ],
    programme: "hard-conversations",
    episode: "promoted-over-your-friends",
  },
  {
    slug: "energy-audit",
    title: "The one-week energy audit",
    type: "Guide",
    skill: "energy",
    format: "6-page guide with tracker",
    minutes: 5,
    summary:
      "Mark each meeting and task green, amber or red for energy across one week, then redesign the following one.",
    why: "Managers rarely burn out from the hours alone. It's the mix. A week of honest colour-coding shows you exactly which hours to protect and which to renegotiate.",
    sections: [
      {
        heading: "Each day",
        items: [
          "Mark every block green (gives energy), amber or red",
          "Note one moment you felt like yourself",
        ],
      },
      {
        heading: "On Friday",
        items: [
          "Count the reds. Which could be moved, shortened or handed over?",
          "Put two greens in next week's calendar first",
          "Tell one person what you're changing",
        ],
      },
    ],
    programme: "one-to-one",
    episode: "the-sunday-dread",
  },
];

/* ------------------------------------------------------------ podcast */

export const podcast = {
  name: "The Monday One-on-One",
  description:
    "A weekly half hour on the parts of managing people nobody explains. Solo episodes on one skill, and conversations with managers, recruiters and psychologists who've seen the inside of a lot of teams.",
  schedule: "New episodes every Monday at 6am Central",
  platforms: [
    { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
    { label: "Spotify", href: "https://open.spotify.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export type Episode = {
  slug: string;
  number: number;
  title: string;
  guest?: { name: string; role: string };
  date: string;
  duration: number;
  skill: SkillId;
  summary: string;
  chapters: { at: number; title: string }[];
  notes: string[];
  takeaways: string[];
  quote: string;
};

export const episodes: Episode[] = [
  {
    slug: "status-meeting-in-disguise",
    number: 112,
    title: "The 1:1 that's secretly a status meeting",
    date: "2026-10-12",
    duration: 1900,
    skill: "one-on-ones",
    summary:
      "If you could replace your 1:1 with a shared doc, it was never a 1:1. How to hand the agenda back to the person it's for.",
    chapters: [
      { at: 0, title: "Why status creeps in" },
      { at: 380, title: "The test: could a doc do this?" },
      { at: 820, title: "Their agenda first" },
      { at: 1340, title: "What to do when they bring nothing" },
      { at: 1710, title: "This week's one thing" },
    ],
    notes: [
      "Status creeps into 1:1s because it's comfortable for both of you. It feels productive, it has an obvious end, and nobody has to say anything difficult.",
      "In this episode I walk through the agenda I give every client in their first week, and the three questions to ask when someone says “nothing much to discuss”.",
    ],
    takeaways: [
      "Move updates to a shared doc, written before the meeting",
      "Open with their topic, every time",
      "Once a month, spend five minutes on growth",
    ],
    quote:
      "If the first ten minutes are a project update, the important thing never gets said.",
  },
  {
    slug: "promoted-over-your-friends",
    number: 111,
    title: "Promoted over your friends",
    guest: {
      name: "Tamsin Reyes",
      role: "Engineering manager, promoted from inside her team",
    },
    date: "2026-10-05",
    duration: 2652,
    skill: "conflict",
    summary:
      "Tamsin went from teammate to manager on a Friday afternoon. We talk about lunch tables, group chats and the first piece of feedback she gave a friend.",
    chapters: [
      { at: 0, title: "The Friday it happened" },
      { at: 540, title: "Leaving the group chat" },
      { at: 1210, title: "Feedback to a friend" },
      { at: 1890, title: "What she'd tell herself now" },
      { at: 2400, title: "Listener question" },
    ],
    notes: [
      "Being promoted from inside the team is the most common way people become managers, and the least prepared-for. Tamsin is candid about what she got wrong in the first month.",
      "We also take a listener question from a nurse manager whose former peer applied for the same role.",
    ],
    takeaways: [
      "Name the change out loud with each former peer, one to one",
      "Keep the friendship; change the venue for work conversations",
      "Give the first feedback early and small",
    ],
    quote:
      "I didn't lose friends. I lost the right to complain about the manager, because it was me.",
  },
  {
    slug: "delegating-work-youre-proud-of",
    number: 110,
    title: "Delegating the work you're proud of",
    date: "2026-09-28",
    duration: 1625,
    skill: "delegation",
    summary:
      "The hardest thing to hand over is the thing you're best at. Why it matters most, and a five-rung ladder for doing it without dumping.",
    chapters: [
      { at: 0, title: "Why it's the hardest" },
      { at: 410, title: "The five rungs" },
      { at: 980, title: "Choosing who" },
      { at: 1390, title: "Checking in without hovering" },
    ],
    notes: [
      "If you only delegate work you dislike, your team learns that delegation means leftovers. Handing over work you love tells them you trust them with what matters.",
      "I walk through the delegation ladder from the free worksheet and how to say which rung a task is on.",
    ],
    takeaways: [
      "Name the rung when you hand something over",
      "Move one task up one rung this week",
      "Agree check-ins in advance so you don't hover",
    ],
    quote:
      "Delegation that only ever hands over the boring parts is just outsourcing.",
  },
  {
    slug: "managing-up-without-sucking-up",
    number: 109,
    title: "Managing up without sucking up",
    guest: {
      name: "Kwame Mensah",
      role: "Chief of staff at a 600-person logistics company",
    },
    date: "2026-09-21",
    duration: 2910,
    skill: "managing-up",
    summary:
      "Kwame has read thousands of updates to executives. What makes him trust a manager, and the memo format he wishes everyone used.",
    chapters: [
      { at: 0, title: "What a chief of staff sees" },
      { at: 620, title: "The update that builds trust" },
      { at: 1450, title: "Bringing problems, not surprises" },
      { at: 2180, title: "Asking for resources" },
      { at: 2640, title: "Kwame's one rule" },
    ],
    notes: [
      "Managing up isn't flattery. It's making it easy for the person above you to back you. Kwame breaks down what that looks like week to week.",
      "We build the Friday memo template live during the episode.",
    ],
    takeaways: [
      "Predictable beats impressive",
      "Bring the problem with two options and a recommendation",
      "Ask for what you need before you're stuck",
    ],
    quote:
      "The managers I trust most are the ones whose bad news I hear first.",
  },
  {
    slug: "your-first-hire",
    number: 108,
    title: "Your first hire",
    guest: {
      name: "Ruth Ibarra",
      role: "Recruiter for twelve years, now a hiring manager",
    },
    date: "2026-09-14",
    duration: 2391,
    skill: "hiring",
    summary:
      "Ruth sat on both sides of the table. Scorecards, the debrief, and why “culture fit” should be retired.",
    chapters: [
      { at: 0, title: "Recruiter to manager" },
      { at: 480, title: "Writing the scorecard first" },
      { at: 1150, title: "The debrief" },
      { at: 1800, title: "Saying no kindly" },
    ],
    notes: [
      "Most first-time hiring managers get no training at all. Ruth shares the habits she wishes every manager she recruited for had.",
      "The interview scorecard in the free resources was built from this conversation.",
    ],
    takeaways: [
      "Decide what good looks like before meeting anyone",
      "Score independently, then debrief",
      "Replace “fit” with the behaviour you actually mean",
    ],
    quote:
      "If you can't write down what good looks like, you're not ready to interview.",
  },
  {
    slug: "feedback-in-under-two-minutes",
    number: 107,
    title: "Feedback in under two minutes",
    date: "2026-09-07",
    duration: 1338,
    skill: "feedback",
    summary:
      "A short one. Situation, behaviour, impact, ask, and why the two-minute limit is the point.",
    chapters: [
      { at: 0, title: "Why we wait" },
      { at: 290, title: "The four parts" },
      { at: 760, title: "Two examples, read aloud" },
      { at: 1150, title: "Your rep for this week" },
    ],
    notes: [
      "Feedback doesn't need a meeting. It needs a specific moment, a specific behaviour and a question at the end.",
      "I read two real (anonymised) examples aloud and time them.",
    ],
    takeaways: [
      "Give it within a week of the moment",
      "No adjectives in the behaviour",
      "End with a question, not a verdict",
    ],
    quote: "The two-minute limit isn't a constraint. It's the kindness.",
  },
  {
    slug: "the-sunday-dread",
    number: 106,
    title: "The Sunday dread",
    guest: { name: "Dr. Alma Kerr", role: "Occupational psychologist" },
    date: "2026-08-31",
    duration: 2467,
    skill: "energy",
    summary:
      "Alma studies why some managers burn out and others in the same job don't. It's rarely the hours.",
    chapters: [
      { at: 0, title: "What the dread is telling you" },
      { at: 700, title: "Hours versus mix" },
      { at: 1390, title: "The energy audit" },
      { at: 2010, title: "When to get more help" },
    ],
    notes: [
      "Alma explains the difference between tired and depleted, and why the second one is a signal about the shape of your week rather than its length.",
      "If anything in this episode feels heavy, please talk to a professional. Coaching is not a substitute for care.",
    ],
    takeaways: [
      "Track energy, not just time, for one week",
      "Protect two green blocks first",
      "Notice which reds are yours to renegotiate",
    ],
    quote: "Burnout is usually a design problem wearing a willpower costume.",
  },
  {
    slug: "saying-no-to-your-boss",
    number: 105,
    title: "Saying no to your boss",
    date: "2026-08-24",
    duration: 1784,
    skill: "priorities",
    summary:
      "Five ways to say no that sound like “here's how we could”. Plus the not-doing list, and how to get it agreed before it matters.",
    chapters: [
      { at: 0, title: "Why “yes” is the default" },
      { at: 450, title: "Five ways to say no" },
      { at: 1100, title: "The not-doing list" },
      { at: 1520, title: "Getting it agreed" },
    ],
    notes: [
      "Every yes is a no to something else; the only question is whether you choose what. This episode is about choosing out loud.",
      "The not-doing list worksheet is free in the resources library.",
    ],
    takeaways: [
      "Answer with a trade-off, not a refusal",
      "Share your not-doing list before you need it",
      "Ask which priority this replaces",
    ],
    quote: "Every yes is a no to something. Choose which, out loud.",
  },
];

/* ------------------------------------------------------------ stories (testimonials) */

export type Story = {
  id: string;
  name: string;
  role: string;
  company: string;
  programme: string;
  quote: string;
  before: string;
  after: string;
  photo?: ImageKey;
  year: number;
};

export const stories: Story[] = [
  {
    id: "arturo",
    name: "Arturo Benítez",
    role: "Head of Operations",
    company: "Lindell Bakeries",
    programme: "one-to-one",
    quote:
      "Margo never told me what to do. She asked what I'd already decided, and then why I hadn't done it yet. That question was worth the fee on its own.",
    before: "Sixty-hour weeks, still writing the shift rota himself",
    after:
      "Rota and hiring handed to two shift leads; back to forty-five hours",
    photo: "arturo",
    year: 2026,
  },
  {
    id: "dana",
    name: "Dana Whitfield",
    role: "Support Team Lead",
    company: "Pebblepost",
    programme: "new-manager-cohort",
    quote:
      "My trio got me through the worst month of my first year. We still have a Thursday thread, and it's still the most useful thing on my phone.",
    before: "Promoted over three friends with two weeks' notice",
    after:
      "Team engagement up from the bottom quartile to the top in two cycles",
    photo: "dana",
    year: 2026,
  },
  {
    id: "joel",
    name: "Joel Ambrose",
    role: "Director of Engineering",
    company: "Fernway Health",
    programme: "leading-managers",
    quote:
      "I'd been running my leadership meeting as a status round. Week four, we started a decision log. My managers stopped escalating things to me within a month.",
    before: "Four managers, every decision still landing on his desk",
    after: "Decision log, skip-level routine, and his Fridays back",
    photo: "joel",
    year: 2025,
  },
  {
    id: "lena",
    name: "Lena Marsh",
    role: "Design Manager",
    company: "Oakline Studio",
    programme: "first-90-days",
    quote:
      "I did the course in the evenings with a glass of wine. Module two's first-week letter is the single best thing I've sent my team.",
    before: "Brand-new manager of five designers, no onboarding",
    after: "A team rhythm she designed, written down by day sixty",
    photo: "lena",
    year: 2026,
  },
  {
    id: "maren",
    name: "Maren Osei",
    role: "Finance Manager",
    company: "Calder & Rowe",
    programme: "hard-conversations",
    quote:
      "I'd been circling an underperformance conversation for four months. I held it the week after workshop two, and it was kinder than the circling had been.",
    before: "One conversation avoided since spring",
    after: "Held, followed up, and a clear 30-day plan both sides agreed",
    photo: "maren",
    year: 2025,
  },
  {
    id: "viktor",
    name: "Viktor Hale",
    role: "Regional Sales Director",
    company: "Northcote Insurance",
    programme: "one-to-one",
    quote:
      "I came in wanting to fix my team. Margo, politely, kept pointing at my calendar. She was right, and I was the last to know.",
    before: "Twelve direct reports and no time for any of them",
    after:
      "Two team leads promoted, eight 1:1s a fortnight instead of twelve rushed ones",
    photo: "viktor",
    year: 2025,
  },
  {
    id: "sunil",
    name: "Sunil Rao",
    role: "Engineering Manager",
    company: "Tilework",
    programme: "feedback-sprint",
    quote:
      "Forty-nine dollars, fifteen minutes a morning. The feedback cards are still taped to my monitor.",
    before: "Saving feedback for performance reviews",
    after: "Feedback weekly, in both directions",
    year: 2026,
  },
  {
    id: "hettie",
    name: "Hettie Lang",
    role: "Head of Product",
    company: "Murmur",
    programme: "one-to-one",
    quote:
      "I've had three coaches. Margo is the only one who wrote down what I promised and asked about it two weeks later. Every time.",
    before: "Stuck between a new CEO and a tired team",
    after: "A product strategy her team could repeat, and a promotion",
    year: 2025,
  },
  {
    id: "owen",
    name: "Owen Pryce",
    role: "Nursing Unit Manager",
    company: "St. Brennan's Hospital",
    programme: "new-manager-cohort",
    quote:
      "I was the only person from healthcare in my cohort and worried it wouldn't translate. It translated. People are people, and handovers are handovers.",
    before: "Managing thirty nurses across three shifts, alone",
    after: "Charge nurses running their own huddles; sick days down",
    year: 2026,
  },
  {
    id: "grace",
    name: "Grace Akande",
    role: "People Partner",
    company: "Saltmarsh Games",
    programme: "manager-bench",
    quote:
      "We'd tried one-day workshops. Manager Bench was the first thing our managers still talked about six months later, in the same words.",
    before: "Fourteen managers, fourteen versions of a 1:1",
    after: "One shared practice, and managers mentoring the next intake",
    year: 2026,
  },
];

/* ------------------------------------------------------------ pages */

export const home = {
  title: "Good at the work. New at the people.",
  mark: "New at the people.",
  lede: "I'm Margo Ellery. I coach first- and second-time managers through the part of the job that doesn't come with a manual, with self-paced courses, live cohorts and private coaching.",
  who: {
    title: "You were promoted because you were good. Now the job is different.",
    text: "Nobody tells you that the skills that got you promoted are mostly the ones you now have to hand over. Most of my clients come to me in the first eighteen months, somewhere between “I've got this” and “I'm doing three jobs”.",
    moments: [
      "You're still the one fixing things at 9pm, because it's faster.",
      "Your 1:1s are status updates and everyone knows it.",
      "There's a conversation you've been rehearsing in the shower for a month.",
      "Your boss asked for a plan and you sent a list.",
    ],
  },
  method: {
    title: "Every session runs on the same fifty minutes",
    text: "Cohort or private, the structure doesn't change, so you spend your energy on the problem, not the format.",
    steps: [
      {
        at: "0′",
        title: "Check the last commitment",
        text: "What you said you'd do, and what actually happened. No judgement, just data.",
      },
      {
        at: "8′",
        title: "Name the real problem",
        text: "We keep asking until the problem fits in one sentence. Usually it isn't the one you came in with.",
      },
      {
        at: "25′",
        title: "Rehearse it",
        text: "Say the sentence out loud. Try the conversation. Draft the message. Practice beats theory here.",
      },
      {
        at: "42′",
        title: "Commit, in writing",
        text: "One next step, with a date, written in your words. I'll ask about it next time.",
      },
    ],
  },
  close: {
    title: "Applications for the January cohort close 4 December.",
    text: "Every programme starts with a short application. I read each one myself and reply within three working days, with an honest recommendation, even if it's someone else's course.",
  },
};

export const programmesPage = {
  title: "Programmes",
  intro:
    "Seven ways to work together, from a two-week email course to three months of private coaching. Filter by how you like to learn and where you are as a manager.",
};

export const resourcesPage = {
  title: "Free resources",
  intro:
    "The worksheets, templates and card sets I use with paying clients, free to download. No course upsell inside the PDF. Each one is short enough to use this week.",
};

export const storiesPage = {
  title: "Stories from managers",
  intro:
    "What changed for people who worked with me, in their words. Every quote is shared with permission; names and companies here are sample content for this template.",
};

export const about = {
  title: "I was the manager nobody trained.",
  lede: "Twelve years leading engineering teams, a lot of mistakes made in front of good people, and the slow discovery that managing well is a set of learnable skills, not a personality.",
  story: [
    "In 2009 I was the best engineer on a six-person team at a freight software company. On a Friday afternoon I became its manager. I was handed a laptop with a calendar already full of meetings and one book about leadership, which I read on the bus.",
    "Over the next twelve years I managed teams of six, then twenty, then seventy across three cities. I got some of it right. I got a lot of it wrong, publicly, in front of people who deserved better. What changed everything was a director who coached me every other week for a year. She never gave advice. She just kept asking what I'd decided.",
    "In 2018 I started running an internal programme for new managers on Thursday afternoons, with biscuits. In 2021 I left to do it full-time. Mentor is still that Thursday afternoon: small groups, real situations, and a next step written down before you leave.",
  ],
  timeline: [
    {
      year: "2009",
      text: "First team lead. Six engineers, no training, one book.",
    },
    {
      year: "2013",
      text: "Engineering manager, then director of a seventy-person organisation.",
    },
    {
      year: "2018",
      text: "Started a Thursday programme for new managers inside the company.",
    },
    {
      year: "2021",
      text: "Left to coach full-time. The first cohort had nine people and a shared doc.",
    },
    {
      year: "2023",
      text: "Launched The Monday One-on-One, recorded in a wardrobe for its first forty episodes.",
    },
    {
      year: "2026",
      text: "Over a thousand managers through a course or cohort. Still reading every application myself.",
    },
  ],
  principles: [
    {
      title: "Ask more than I tell",
      text: "You know your team. My job is to help you find what you already think, then test it.",
    },
    {
      title: "Practise out loud",
      text: "Insight is cheap. Saying the hard sentence to another person, before you say it for real, is where it changes.",
    },
    {
      title: "Write it down",
      text: "Every session ends with one commitment in your words. Next time we start there.",
    },
    {
      title: "Small, then often",
      text: "Feedback in two minutes, a 1:1 every week, a rung up the ladder at a time. Big change is a lot of small reps.",
    },
  ],
  team: [
    {
      name: "Priya Nandakumar",
      role: "Producer, The Monday One-on-One",
      text: "Edits every episode, books the guests and keeps Margo to thirty minutes, mostly.",
    },
    {
      name: "Dele Adeyemi",
      role: "Cohort facilitator",
      text: "Former nurse manager. Runs the practice rooms and the peer trios in every live cohort.",
    },
    {
      name: "Sam Whitlock",
      role: "Enrolments and invoices",
      text: "Answers the email you send about company invoices, usually within a day.",
    },
  ],
  credentials: [
    "Certified professional coach, 1,400+ coaching hours",
    "Former Director of Engineering, 70-person organisation",
    "Trained in Nonviolent Communication and mediation",
  ],
};

export const apply = {
  title: "Apply for coaching",
  intro:
    "Four short steps, about eight minutes. I read every application myself and reply within three working days with an honest recommendation, even if it's not one of my programmes.",
  next: [
    {
      title: "I read it",
      text: "Usually within two working days, with your Manager's Wheel if you attached it.",
    },
    {
      title: "A 30-minute call",
      text: "Free, on video. We check the fit and the timing.",
    },
    {
      title: "Your place",
      text: "If it fits, you get an invoice or a payment link, and the first worksheet.",
    },
  ],
  faq: [
    {
      q: "Do I need my company's approval to apply?",
      a: "No. If they're paying, we'll send an invoice later. Many people apply first and use our recommendation to make the case.",
    },
    {
      q: "What if I'm not sure which programme fits?",
      a: "Choose “Not sure yet”. Most applicants do, and I'll recommend one after reading your answers.",
    },
    {
      q: "Is there a waiting list?",
      a: "For 1:1 coaching, sometimes. If there's no place for a few months I'll say so, and suggest a cohort in the meantime.",
    },
  ],
};

export const newsletter = {
  title: "Monday Notes",
  text: "One coaching question for your week, every Monday morning. Two minutes to read; no sales.",
};

export const footerColumns = [
  {
    title: "Programmes",
    links: [
      { to: "/programmes", label: "All programmes" },
      { to: "/programmes/one-to-one", label: "1:1 Coaching" },
      { to: "/programmes/new-manager-cohort", label: "New Manager Cohort" },
      { to: "/programmes/first-90-days", label: "The First 90 Days" },
      { to: "/programmes/manager-bench", label: "For companies" },
    ],
  },
  {
    title: "Learn free",
    links: [
      { to: "/resources", label: "Free resources" },
      { to: "/podcast", label: "The Monday One-on-One" },
      { to: "/resources/one-on-one-agenda", label: "The 1:1 agenda" },
    ],
  },
  {
    title: "Mentor",
    links: [
      { to: "/about", label: "About Margo" },
      { to: "/stories", label: "Stories" },
      { to: "/apply", label: "Apply" },
    ],
  },
];
