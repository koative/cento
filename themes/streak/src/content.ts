import {
  BookOpen,
  Droplet,
  Dumbbell,
  Footprints,
  Guitar,
  Moon,
  PenLine,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { Mark } from "./lib/chain";
import run from "./assets/run.jpg";
import desk from "./assets/desk.jpg";
import notepad from "./assets/notepad.jpg";
import pen from "./assets/pen.jpg";
import shore from "./assets/shore.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Streak",
  tagline: "Mark the day. Keep the chain.",
  description:
    "Streak is a habit tracker built on the oldest trick there is: one mark a day on a calendar, and the quiet pressure not to break the chain.",
  email: "hello@streak.example",
  support: "support@streak.example",
  press: "press@streak.example",
  phone: "+1 555 0142 7781",
  address: ["Streak Labs", "41 Halsey Street, 2nd floor", "Portland, OR 97232"],
  gallery: "https://koative.github.io/cento/",
  version: "4.2",
  /** The in-world "today" used by every demo calendar. */
  today: { year: 2026, month: 9, day: 18 },
  stores: {
    apple: "https://www.apple.com/app-store/",
    google: "https://play.google.com/",
  },
};

export const nav = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/help", label: "Help" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "App",
    links: [
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/download", label: "Download" },
    ],
  },
  {
    title: "Read",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/blog/grace-days", label: "Grace days, explained" },
      { to: "/about", label: "About Streak" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help centre" },
      { to: "/help/how-streaks-count", label: "How streaks count" },
      { to: "/contact", label: "Contact support" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ------------------------------------------------------- app demo data */

export type Habit = {
  id: string;
  name: string;
  icon: LucideIcon;
  /** Current chain length in days. */
  chain: number;
  when: string;
  done: boolean;
};

export const habits: Habit[] = [
  {
    id: "read",
    name: "Read 20 pages",
    icon: BookOpen,
    chain: 41,
    when: "07:10",
    done: true,
  },
  {
    id: "walk",
    name: "Walk 8,000 steps",
    icon: Footprints,
    chain: 12,
    when: "Any time",
    done: true,
  },
  {
    id: "water",
    name: "Six glasses of water",
    icon: Droplet,
    chain: 27,
    when: "Through the day",
    done: false,
  },
  {
    id: "guitar",
    name: "Guitar, 15 minutes",
    icon: Guitar,
    chain: 6,
    when: "18:30",
    done: false,
  },
  {
    id: "stretch",
    name: "Stretch, 10 minutes",
    icon: Dumbbell,
    chain: 14,
    when: "21:45",
    done: false,
  },
  {
    id: "phone",
    name: "Phone down by 22:00",
    icon: Moon,
    chain: 19,
    when: "22:00",
    done: false,
  },
];

export const eveningHabits: Habit[] = [
  {
    id: "journal",
    name: "Three lines in the journal",
    icon: PenLine,
    chain: 88,
    when: "21:30",
    done: true,
  },
  {
    id: "stretch",
    name: "Stretch, 10 minutes",
    icon: Dumbbell,
    chain: 14,
    when: "21:45",
    done: false,
  },
  {
    id: "plants",
    name: "Water the balcony",
    icon: Sprout,
    chain: 9,
    when: "Before bed",
    done: true,
  },
  {
    id: "read",
    name: "Read 20 pages",
    icon: BookOpen,
    chain: 41,
    when: "07:10",
    done: true,
  },
  {
    id: "water",
    name: "Six glasses of water",
    icon: Droplet,
    chain: 27,
    when: "Through the day",
    done: true,
  },
  {
    id: "phone",
    name: "Phone down by 22:00",
    icon: Moon,
    chain: 19,
    when: "22:00",
    done: false,
  },
];

/** Last seven days for the phone's week strip, Monday first: 1 done, 2 grace, 0 open. */
export const week = {
  labels: ["M", "T", "W", "T", "F", "S", "S"],
  dates: [12, 13, 14, 15, 16, 17, 18],
  marks: [1, 1, 2, 1, 1, 1, 0],
};

/** Ticks per weekday over the last seven weeks, for the insights screen. */
export const insights = {
  habit: "Read 20 pages",
  days: [
    { label: "Mon", done: 6, of: 7 },
    { label: "Tue", done: 7, of: 7 },
    { label: "Wed", done: 5, of: 7 },
    { label: "Thu", done: 7, of: 7 },
    { label: "Fri", done: 6, of: 7 },
    { label: "Sat", done: 4, of: 7 },
    { label: "Sun", done: 6, of: 7 },
  ],
  bestTime: "07:10",
  month: 86,
};

const first = new Date(brand.today.year, brand.today.month, 1);

/** The demo month every calendar draws: name, weekday of the 1st (Monday = 0) and length. */
export const month = {
  name: new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(first),
  short: new Intl.DateTimeFormat("en-US", { month: "long" }).format(first),
  offset: (first.getDay() + 6) % 7,
  days: new Date(brand.today.year, brand.today.month + 1, 0).getDate(),
};

/** The chain view on the phone: marks from the 1st to today. */
export const chainView = {
  habit: "Read 20 pages",
  chain: 41,
  longest: 63,
  marks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1] as Mark[],
};

/** The grace-day prompt: yesterday was missed, today is still open. */
export const graceView = {
  habit: "Six glasses of water",
  chain: 27,
  longest: 44,
  marks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0] as Mark[],
};

export const notifications = [
  {
    app: "Streak",
    time: "now",
    title: "Read 20 pages",
    body: "Day 42 is waiting. Your book is on the nightstand.",
  },
  {
    app: "Streak",
    time: "6 min ago",
    title: "Walk 8,000 steps",
    body: "6,240 so far. One loop of the park finishes it.",
  },
];

export const buddies = {
  habit: "Run before work",
  people: [
    { name: "You", marks: [1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1] },
    { name: "Maya", marks: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1] },
  ],
};

/* ------------------------------------------------------ signature: chain */

export type ChainPreset = { id: string; label: string; marks: Mark[] };

/** Seeds for October 1–18 (today). 1 = done, 2 = grace day, 0 = missed or still open. */
export const chainPresets: ChainPreset[] = [
  {
    id: "read",
    label: "Read 20 pages",
    marks: [1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0],
  },
  {
    id: "walk",
    label: "Walk 8,000 steps",
    marks: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  },
  {
    id: "phone",
    label: "Phone down by 22:00",
    marks: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  },
];

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Streak — Habit tracker that keeps the chain",
  hero: {
    title: "Mark the day. Keep the chain.",
    lede: "Streak turns any habit into a row of red marks on a calendar. Tap once when it's done. Miss a day and the chain breaks, unless you spend one of your grace days. That's the whole idea, and it works.",
    note: "Free for three habits. iPhone, Android, Apple Watch and Wear OS.",
  },
  steps: {
    title: "One tap a day, nothing more",
    items: [
      {
        title: "Name the habit",
        text: "Write it the way you'd say it out loud: “Read 20 pages”, not “Become a reader”. Pick a time, or leave it as any time today.",
      },
      {
        title: "Tap when it's done",
        text: "One tap on the circle marks the day. No timers to start, no forms to fill. Undo lasts until midnight.",
      },
      {
        title: "Don't break the chain",
        text: "Every marked day joins the one before it. After a week the chain starts to look after itself.",
      },
    ],
  },
  chain: {
    title: "Try the chain on October",
    lede: "This is the calendar view from the app, with three real-looking months of someone's habits. Tap a day to mark it, tap again to spend a grace day, a third time to clear it. Watch what one missed Tuesday does to the count.",
  },
  evening: {
    title: "Mornings for doing, evenings for closing the loop",
    lede: "Streak switches to its night face after sunset: dimmer, quieter, and sorted by what's still open. The evening check-in takes about forty seconds and tells you exactly which chains are at risk before bed.",
    points: [
      "Nudges arrive at the time you chose, never in a burst at 9 a.m.",
      "Habits you've already ticked drop to the bottom of the list.",
      "At 21:00 one quiet reminder for anything still open. Then nothing.",
    ],
  },
  scene: {
    quote:
      "I don't run because I feel like it. I run because day 212 is not going to be the day I stop.",
    who: "Hana, member since 2024 · Run before work, day 212",
  },
  index: {
    title: "Everything else that's in the app",
    items: [
      ["Grace days", "One forgiven miss per week, if you choose to spend it."],
      [
        "Flexible schedules",
        "Weekdays only, three times a week, every other day.",
      ],
      [
        "Counts and timers",
        "For glasses, pages, minutes or reps when a tick isn't enough.",
      ],
      ["Home and lock screen widgets", "Tick a habit without opening the app."],
      ["Watch apps", "Apple Watch and Wear OS, with complications."],
      [
        "Buddy chains",
        "Share one habit with one friend. See each other's marks.",
      ],
      ["Insights", "When you actually do things, and which days you wobble."],
      ["Notes on a day", "A line of context for the day you nearly didn't."],
      ["Export everything", "CSV or JSON, any time, on every plan."],
      [
        "No account needed",
        "Start on the device. Add sync later if you want it.",
      ],
    ],
  },
  voices: {
    title: "Notes from people with long chains",
    items: [
      {
        quote:
          "I tried four apps with points and badges. Streak just shows me the calendar. Turns out the calendar was all I needed.",
        name: "Dev Raman",
        habit: "Read 20 pages",
        day: 318,
      },
      {
        quote:
          "The grace day is the reason I'm still here. I broke a 60-day chain once with another app and never opened it again.",
        name: "Clara Oyelaran",
        habit: "Stretch, 10 minutes",
        day: 146,
      },
      {
        quote:
          "My sister and I share a guitar chain across two time zones. Neither of us wants to be the one who breaks it.",
        name: "Joon Park",
        habit: "Guitar, 15 minutes",
        day: 97,
      },
    ],
  },
  pricing: {
    title: "Free for three habits. Plus for the rest of your life's admin.",
    lede: "Most people start free and stay free for a while. Plus unlocks unlimited habits, grace days, insights and the watch apps.",
  },
  blog: { title: "From the blog" },
  close: {
    title: "Day one is today.",
    lede: "Download Streak, name one habit, and tap the circle before midnight. Tomorrow you'll have a chain of two.",
  },
};

/* -------------------------------------------------------------- features */

export type Screen =
  | "today"
  | "chain"
  | "grace"
  | "evening"
  | "lock"
  | "insights"
  | "buddies"
  | "privacy";

export const features = {
  title: "Features",
  hero: {
    title: "Built around one calendar and one tap",
    lede: "Every feature in Streak exists to protect the chain: make the tap easier, make the miss rarer, and make a broken chain hurt a little less.",
  },
  sections: [
    {
      id: "today",
      screen: "today" as Screen,
      title: "Today, in one list",
      text: "Open the app and you see today: what's done, what's open, how long each chain has run. Tap the circle and the day is marked. There is no second screen to visit.",
      points: [
        "Sorted by the time you set",
        "Undo until midnight",
        "Counts for glasses, pages or minutes",
      ],
    },
    {
      id: "chain",
      screen: "chain" as Screen,
      title: "The chain view",
      text: "Each habit has its own wall calendar. Marked days carry a red cross; consecutive crosses join into a chain. Your longest run sits at the top so you always know what you're chasing.",
      points: [
        "Month and year views",
        "Longest chain and current chain",
        "A note on any day",
      ],
    },
    {
      id: "grace",
      screen: "grace" as Screen,
      title: "Grace days, not cheat days",
      text: "Life gets one vote. Each habit earns one grace day per seven, which bridges a miss without adding to the count. Spend it on purpose, in the evening, before the chain breaks. Grace days show up in yellow, so you never mistake them for a real tick.",
      points: [
        "One per seven days, per habit",
        "Never applied automatically",
        "Visible in yellow on the calendar",
      ],
    },
    {
      id: "reminders",
      screen: "lock" as Screen,
      title: "Reminders that know when to stop",
      text: "Pick a time for each habit, or let Streak learn when you usually tick it. One nudge at that time, one before bed if it's still open. If you mark it early, the reminders cancel themselves.",
      points: [
        "Per-habit reminder times",
        "Learns your usual time after 14 days",
        "Quiet hours you set",
      ],
    },
    {
      id: "insights",
      screen: "insights" as Screen,
      title: "Insights without the lecture",
      text: "Which weekdays wobble, what time you really do it, and how this month compares with the last. Plain numbers, no scores, no badges, no confetti.",
      points: [
        "Weekday breakdown",
        "Typical check-in time",
        "Month over month",
      ],
    },
    {
      id: "buddies",
      screen: "buddies" as Screen,
      title: "Buddy chains",
      text: "Share one habit with one person. You see their marks, they see yours, and nobody sees anything else. It's the gentlest accountability we know of.",
      points: [
        "One habit, one friend",
        "Private by default",
        "Leave any time, history stays yours",
      ],
    },
    {
      id: "privacy",
      screen: "privacy" as Screen,
      title: "Your calendar stays yours",
      text: "Streak works without an account. Habits live on your device and, if you turn on sync, in an encrypted copy only your devices can read. No ads, no trackers, no selling a list of your habits.",
      points: [
        "No account required",
        "End-to-end encrypted sync",
        "Export or delete everything in two taps",
      ],
    },
  ],
  devices: {
    title: "Wherever you happen to be when it's done",
    items: [
      {
        name: "iPhone and iPad",
        text: "iOS and iPadOS 17 or later. Home and lock screen widgets, Siri shortcuts.",
      },
      {
        name: "Android",
        text: "Android 10 or later. Home screen widgets and a quick-settings tile.",
      },
      {
        name: "Apple Watch",
        text: "watchOS 10 or later. Tick from the wrist; complications show today's chain.",
      },
      {
        name: "Wear OS",
        text: "Wear OS 4 or later. A tile for today and a complication for one habit.",
      },
    ],
  },
};

/* --------------------------------------------------------------- pricing */

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  pitch: string;
  includes: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  hero: {
    title: "Pay for the chain, not for the guilt",
    lede: "Streak is free for up to three habits, forever. Plus and Family add everything else. Prices in US dollars; your store may show local tax.",
  },
  plans: [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      yearly: 0,
      pitch: "For the one habit you've been meaning to start.",
      includes: [
        "Up to 3 habits",
        "Chain view, last 90 days",
        "One reminder per habit",
        "Home screen widget",
        "Export to CSV",
      ],
      cta: "Download free",
    },
    {
      id: "plus",
      name: "Plus",
      monthly: 4.99,
      yearly: 35.99,
      pitch: "For people who track more than one corner of their life.",
      includes: [
        "Unlimited habits",
        "Full history and year view",
        "Grace days",
        "Insights",
        "Watch apps and lock screen widgets",
        "Encrypted sync across devices",
        "Notes on any day",
      ],
      cta: "Start a 14-day trial",
      featured: true,
    },
    {
      id: "family",
      name: "Family",
      monthly: 7.99,
      yearly: 59.99,
      pitch: "Plus for up to five people, with shared chains at home.",
      includes: [
        "Everything in Plus, for 5 people",
        "Shared household chains",
        "Buddy chains inside the family",
        "Separate, private calendars",
        "One bill, one admin",
      ],
      cta: "Start a 14-day trial",
    },
  ] as Plan[],
  compare: {
    title: "Compare plans",
    rows: [
      ["Habits", "3", "Unlimited", "Unlimited each"],
      ["History", "90 days", "Everything", "Everything"],
      ["Grace days", "—", "1 per 7 days", "1 per 7 days"],
      ["Reminders per habit", "1", "Up to 4", "Up to 4"],
      [
        "Widgets",
        "Home screen",
        "Home and lock screen",
        "Home and lock screen",
      ],
      ["Apple Watch and Wear OS", "—", "Included", "Included"],
      ["Sync across devices", "—", "Encrypted", "Encrypted"],
      [
        "Buddy chains",
        "1 shared habit",
        "5 shared habits",
        "Unlimited in family",
      ],
      ["Export (CSV, JSON)", "Included", "Included", "Included"],
    ] as [string, string, string, string][],
  },
  faq: [
    {
      q: "What happens to my chains if I stop paying for Plus?",
      a: "Nothing is deleted. You keep your full history; the app goes back to showing three active habits, and you choose which. Grace days you already spent stay on the calendar.",
    },
    {
      q: "How does the trial work?",
      a: "Fourteen days of Plus or Family through the App Store or Google Play. Cancel in the store before day 14 and you won't be charged. We remind you two days before it ends.",
    },
    {
      q: "Is there a student or lifetime price?",
      a: "Students get 50% off the yearly Plus plan with a school email; write to support from the address. We don't sell lifetime licences, because sync costs us money every year.",
    },
    {
      q: "Can I switch between monthly and yearly?",
      a: "Yes, in your store's subscription settings. The change applies at the next renewal and we credit any unused time.",
    },
  ],
};

/* ------------------------------------------------------------------ blog */

export type Block =
  | { type: "p" | "h2" | "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  topic: "Science" | "Routines" | "Stories" | "Product";
  author: string;
  date: string;
  minutes: number;
  excerpt: string;
  cover:
    { src: string; alt: string; w: number; h: number } | { screen: Screen };
  body: Block[];
};

export const blogPage = {
  title: "Blog",
  hero: {
    title: "Notes on habits, chains and the days in between",
    lede: "Short reads from the people who build Streak and the people who use it: what the research says, what actually works on a Tuesday, and what's new in the app.",
  },
};

export const topics = [
  "All",
  "Science",
  "Routines",
  "Stories",
  "Product",
] as const;

export const posts: Post[] = [
  {
    slug: "why-a-chain-works",
    title: "Why a row of crosses beats a big goal",
    topic: "Science",
    author: "Ines Okafor",
    date: "2026-10-12",
    minutes: 6,
    excerpt:
      "Goals live in the future. A chain lives on today's square. Here's why the second one is so much harder to walk away from.",
    cover: {
      src: pen,
      alt: "A closed grey notebook with a silver pen resting on its cover",
      w: 1023,
      h: 605,
    },
    body: [
      {
        type: "p",
        text: "Ask someone what they want from a habit and you'll get a goal: run a half marathon, read thirty books, learn the guitar. Goals are useful for deciding where to go. They are terrible at getting you out of bed on a cold Tuesday, because Tuesday's run barely moves the needle on a half marathon.",
      },
      {
        type: "p",
        text: "A chain changes the question. You are no longer asking “will this run make me a runner?”, which is unanswerable at 6 a.m. You're asking “do I want an empty square after eleven crosses?”, which is very answerable.",
      },
      { type: "h2", text: "Loss is louder than gain" },
      {
        type: "p",
        text: "Behavioural research keeps finding the same thing: we work harder to avoid losing something than to gain the same thing. A blank square after a long run of crosses reads as a loss. That's the pressure Streak is designed around, and it's why we show the current chain above everything else.",
      },
      {
        type: "quote",
        text: "You are not trying to be a reader. You are trying not to break a twelve-day chain.",
      },
      { type: "h2", text: "Make the square small enough" },
      {
        type: "p",
        text: "The chain only works if each square is winnable on your worst day. That's why we push people towards floors rather than targets: twenty pages, not a chapter; one lap, not five kilometres. You can always do more. The cross means the same either way.",
      },
      {
        type: "list",
        items: [
          "Name the habit as an action you can finish today.",
          "Set the bar for your worst day, not your best.",
          "Look at the chain, not the goal, when you're deciding whether to bother.",
        ],
      },
    ],
  },
  {
    slug: "sixty-six-days",
    title: "66 days, not 21: what habit research actually says",
    topic: "Science",
    author: "Dr. Priya Sandoval",
    date: "2026-09-29",
    minutes: 8,
    excerpt:
      "The 21-day rule came from a plastic surgeon's notes in the 1960s. The better-studied number is longer, messier and more forgiving.",
    cover: {
      src: desk,
      alt: "A hand writing in a small notebook at a wooden desk beside a laptop",
      w: 1024,
      h: 683,
    },
    body: [
      {
        type: "p",
        text: "Almost every habit app, including an early version of ours, has promised that a habit forms in 21 days. The number traces back to observations about how long patients took to get used to a changed reflection after surgery. It was never a study of habits.",
      },
      { type: "h2", text: "What the longer studies found" },
      {
        type: "p",
        text: "When researchers followed volunteers building simple daily behaviours, like drinking water after breakfast, the point where the action felt automatic arrived after a median of around 66 days. The range was huge: some people got there in under three weeks, others were still working at it after eight months.",
      },
      {
        type: "p",
        text: "Two findings matter more than the median. Simple actions became automatic faster than complex ones. And missing a single day did not measurably set people back. Missing several in a row did.",
      },
      {
        type: "quote",
        text: "One miss is noise. Two misses is the start of a different habit.",
      },
      { type: "h2", text: "How that shaped grace days" },
      {
        type: "p",
        text: "That second finding is the reason Streak has grace days at all. A single forgiven miss per week matches what the research suggests is harmless, while the rule against two in a row protects the part that isn't. It's also why we never use the word “formed”: the calendar keeps counting at day 66 and so should you.",
      },
    ],
  },
  {
    slug: "set-a-floor",
    title: "Set a floor, not a target",
    topic: "Routines",
    author: "Tomasz Wren",
    date: "2026-09-15",
    minutes: 5,
    excerpt:
      "The smallest version of a habit that still counts is the one that saves your chain on the bad days. Here's how to find it.",
    cover: {
      src: notepad,
      alt: "Hands writing in an open planner on a wooden table, next to a mug of coffee and half a croissant",
      w: 1400,
      h: 933,
    },
    body: [
      {
        type: "p",
        text: "Most people set the bar for a good day. Forty-five minutes at the gym, a chapter a night, an hour of practice. Then the first bad day arrives, the bar looks impossible, and the square stays empty.",
      },
      {
        type: "p",
        text: "A floor is the version you can do with a cold, a late train and a toddler awake at 5 a.m. It still counts. Anything above it is a bonus that the calendar doesn't need to know about.",
      },
      { type: "h2", text: "Finding your floor" },
      {
        type: "list",
        items: [
          "Write down your target, then halve it, then halve it again.",
          "Ask whether you could do that version in a hotel room with no equipment.",
          "If the answer is no, halve it once more.",
          "Name the habit after the floor. Streak shows the name every day.",
        ],
      },
      {
        type: "p",
        text: "Members who renamed a habit to its floor in the app kept their chains noticeably longer than those who didn't. They also tended to do more than the floor most days, which is the quiet trick: starting is the hard part.",
      },
    ],
  },
  {
    slug: "day-212-at-6-40",
    title: "Day 212 at 6:40 a.m.",
    topic: "Stories",
    author: "Hana Little",
    date: "2026-08-30",
    minutes: 7,
    excerpt:
      "A member on running through two winters, one broken toe and a grace day she still thinks about.",
    cover: {
      src: run,
      alt: "A lone runner on a tree-lined avenue at dawn, light coming through the mist",
      w: 1023,
      h: 720,
    },
    body: [
      {
        type: "p",
        text: "I started the run chain on a Monday in January because that's when you start things. The habit was “Run before work”, the floor was one kilometre, and the reminder was set for 6:40, which is when my kettle finishes.",
      },
      {
        type: "p",
        text: "The first month was easy because everything is easy in the first month. February was where the chain started doing the work. There were mornings when I put my shoes on purely to avoid looking at an empty square at lunchtime.",
      },
      { type: "h2", text: "The toe" },
      {
        type: "p",
        text: "In April I broke a toe walking into a bed frame. I spent my grace day that evening and then changed the habit for three weeks to “Walk to the end of the street”. Some people would call that cheating. I'd call it the reason I'm at day 212 and not day 9.",
      },
      {
        type: "quote",
        text: "The chain doesn't care how far you went. It cares that you went.",
      },
      {
        type: "p",
        text: "These days the reminder rarely fires because I'm already out the door. I still open the app to tick it. That cross is the best part of the run.",
      },
    ],
  },
  {
    slug: "the-morning-after",
    title: "The morning after you break a chain",
    topic: "Routines",
    author: "Ines Okafor",
    date: "2026-08-11",
    minutes: 4,
    excerpt:
      "It will happen. What you do the next morning decides whether the habit survives it.",
    cover: {
      src: shore,
      alt: "A person walking along the shoreline at sunrise, the sun low over the water",
      w: 960,
      h: 636,
    },
    body: [
      {
        type: "p",
        text: "Every long-time Streak member has a broken chain somewhere in their history. The ones who keep going share one thing: they marked the very next day.",
      },
      { type: "h2", text: "Three things to do" },
      {
        type: "list",
        items: [
          "Tick today, at the floor, as early as you can.",
          "Add a note to the missed day saying what happened. You'll learn more from it than from any chart.",
          "Look at your longest chain, not the current one. It's proof you've done it before.",
        ],
      },
      {
        type: "p",
        text: "We deliberately don't send a message when a chain breaks. No sad faces, no “you lost 40 days”. The calendar shows an empty square and the count starts again at one tomorrow. That's enough.",
      },
      {
        type: "quote",
        text: "A broken chain is one empty square. A quit habit is all the squares after it.",
      },
    ],
  },
  {
    slug: "grace-days",
    title: "Grace days, explained",
    topic: "Product",
    author: "Tomasz Wren",
    date: "2026-07-22",
    minutes: 4,
    excerpt:
      "Why each habit gets one forgiven miss per seven days, why we never spend it for you, and why it's yellow.",
    cover: { screen: "grace" },
    body: [
      {
        type: "p",
        text: "A grace day bridges a single missed day so your chain keeps going. It does not add to the count: a chain of ten with a grace day in the middle is still ten crosses long, just unbroken.",
      },
      { type: "h2", text: "The rules" },
      {
        type: "list",
        items: [
          "Each habit earns one grace day per rolling seven days.",
          "You spend it yourself, on today or yesterday, before the chain breaks.",
          "Two grace days within seven days aren't allowed; the second miss breaks the chain.",
          "Grace days are marked in yellow on every calendar, including buddy chains.",
        ],
      },
      { type: "h2", text: "Why we don't spend it automatically" },
      {
        type: "p",
        text: "We tried. In testing, automatic grace days made people miss more often, because the miss stopped costing anything. Choosing to spend one is a small, deliberate moment, and that moment is the point.",
      },
      {
        type: "p",
        text: "Grace days are part of Plus and Family. On the free plan a missed day breaks the chain, the way a paper calendar would.",
      },
    ],
  },
  {
    slug: "streak-4-2",
    title: "Streak 4.2: evening check-ins and the lock-screen chain",
    topic: "Product",
    author: "Ada Brennan",
    date: "2026-10-06",
    minutes: 3,
    excerpt:
      "A night face for the app, a lock-screen widget that shows the whole week, and reminders that finally learn your rhythm.",
    cover: { screen: "evening" },
    body: [
      {
        type: "p",
        text: "Streak 4.2 is rolling out on the App Store and Google Play this week. It's the release we've wanted to ship since the first time someone told us they check their habits in bed.",
      },
      { type: "h2", text: "What's new" },
      {
        type: "list",
        items: [
          "Evening check-in: after sunset the app switches to a darker, quieter layout sorted by what's still open.",
          "Lock-screen chain: a widget that shows the last seven days of one habit, tappable on iOS 17.",
          "Learned reminders: after 14 days Streak suggests the time you actually tick each habit.",
          "Faster sync: changes now reach your other devices in under two seconds on average.",
        ],
      },
      {
        type: "p",
        text: "As always, the update is free for everyone, and nothing in it requires an account. Tell us what you think at support@streak.example.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ help */

export type HelpArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  updated: string;
  steps?: string[];
  body: string[];
};

export const helpPage = {
  title: "Help centre",
  hero: {
    title: "How can we help?",
    lede: "Answers from the team that builds Streak. Most questions are covered in under a minute of reading.",
  },
  categories: [
    {
      name: "Getting started",
      text: "Your first habit, schedules and the basics of the Today list.",
    },
    {
      name: "Streaks and grace days",
      text: "How chains are counted, what breaks them and how grace works.",
    },
    {
      name: "Reminders",
      text: "Times, quiet hours and notifications that don't arrive.",
    },
    {
      name: "Devices and sync",
      text: "Watches, widgets, and moving to a new phone.",
    },
    {
      name: "Plans and billing",
      text: "Trials, upgrades, refunds and family sharing.",
    },
    {
      name: "Privacy and data",
      text: "What we store, where, and how to take it with you.",
    },
  ],
  faq: [
    {
      q: "Do I need an account to use Streak?",
      a: "No. Streak works fully on one device without an account. You only create one if you want encrypted sync between devices or buddy chains.",
    },
    {
      q: "Does a habit count if I tick it after midnight?",
      a: "You can mark yesterday until 03:00 the next morning. After that, yesterday is closed and only a grace day can bridge it.",
    },
    {
      q: "I changed time zones. Will my chain break?",
      a: "No. Streak uses the local date of the device when you tick, so flying east or west never deletes a day. A day may look shorter or longer on the calendar; it still counts once.",
    },
    {
      q: "Can I pause a habit while I'm ill or travelling?",
      a: "Yes. Pause freezes the chain without breaking it, for up to 30 days. Paused days are shown as hatched squares and don't count towards the chain.",
    },
  ],
};

export const helpArticles: HelpArticle[] = [
  {
    slug: "add-your-first-habit",
    title: "Add your first habit",
    category: "Getting started",
    summary:
      "Create a habit, choose a schedule and set its reminder in about a minute.",
    updated: "2026-10-02",
    steps: [
      "Open Streak and tap the + button at the bottom of Today.",
      "Name the habit as something you can finish today, like “Read 20 pages”.",
      "Choose a schedule: every day, weekdays, or a number of days per week.",
      "Pick a reminder time, or choose “Any time” to skip reminders.",
      "Tap Save. The habit appears on Today with an empty circle.",
    ],
    body: [
      "Habits on a weekly schedule, like “three times a week”, count their chain in weeks rather than days. The calendar still shows a cross on each day you tick.",
      "On the free plan you can have up to three active habits. Archived habits don't count towards the limit.",
    ],
  },
  {
    slug: "how-streaks-count",
    title: "How streaks are counted",
    category: "Streaks and grace days",
    summary:
      "What adds to a chain, what breaks it, and why your longest chain never goes down.",
    updated: "2026-09-18",
    body: [
      "A chain is the number of consecutive scheduled days you've ticked a habit, counting back from today. If today is still open, the count runs from yesterday so an unticked morning never looks like a broken chain.",
      "A scheduled day with no tick breaks the chain once it closes at 03:00 the following morning. Days outside the schedule, like weekends on a weekdays-only habit, are skipped and never break anything.",
      "Grace days bridge a single miss without adding to the count. Paused days freeze the chain. Your longest chain is stored separately and only ever goes up.",
    ],
    steps: [
      "Open the habit and tap the calendar icon to see the chain view.",
      "The number at the top is your current chain; the smaller number is your longest.",
      "Tap any day to see when it was ticked and any note you added.",
    ],
  },
  {
    slug: "using-grace-days",
    title: "Using grace days",
    category: "Streaks and grace days",
    summary:
      "Spend a grace day to bridge a miss, and see how many you have left.",
    updated: "2026-09-02",
    steps: [
      "On Today, swipe left on the habit you missed.",
      "Tap Grace day. Streak shows whether one is available for this habit.",
      "Choose today or yesterday, then confirm. The square turns yellow.",
    ],
    body: [
      "Each habit earns one grace day per rolling seven days. A second miss inside the same seven days breaks the chain even if you haven't spent a grace day on that habit before.",
      "Grace days are a Plus and Family feature. They're never spent automatically.",
    ],
  },
  {
    slug: "reminders-not-arriving",
    title: "Reminders aren't arriving",
    category: "Reminders",
    summary:
      "Check the three settings that silence almost every missing notification.",
    updated: "2026-10-09",
    steps: [
      "In your phone's Settings, open Notifications, then Streak, and make sure notifications are allowed.",
      "Check that a Focus or Do Not Disturb mode isn't silencing Streak at that time.",
      "In Streak, open You, then Reminders, and confirm quiet hours don't overlap the habit's reminder.",
      "On Android, open battery settings and set Streak to Unrestricted so the system doesn't delay alarms.",
    ],
    body: [
      "If a reminder still doesn't arrive, send us a note from You, then Help, then Contact support with diagnostics turned on. It includes your reminder schedule but none of your habit names.",
    ],
  },
  {
    slug: "sync-across-devices",
    title: "Sync across your devices",
    category: "Devices and sync",
    summary:
      "Turn on encrypted sync and move your chains to a new phone safely.",
    updated: "2026-08-21",
    steps: [
      "On your current device, open You, then Sync, and tap Turn on sync.",
      "Create an account with your email and save the recovery key somewhere safe.",
      "On the new device, install Streak, tap I already use Streak, and sign in.",
      "Enter the recovery key when asked. Your habits appear within a few seconds.",
    ],
    body: [
      "Sync is end-to-end encrypted: we store your data but can't read it. That also means we can't recover it if you lose both your devices and your recovery key.",
    ],
  },
  {
    slug: "watch-and-widgets",
    title: "Watch apps and widgets",
    category: "Devices and sync",
    summary: "Tick habits from your wrist, home screen or lock screen.",
    updated: "2026-10-06",
    body: [
      "The Apple Watch and Wear OS apps show today's habits and let you tick them with one tap. Complications show the chain of one habit you choose.",
      "Home screen widgets come in three sizes. The small one shows one habit, the medium one today's list, and the large one a month of crosses. The lock-screen chain widget, new in 4.2, shows the last seven days of one habit.",
      "Widgets are interactive on iOS 17 and later and on Android 12 and later. On older versions, tapping a widget opens the app on that habit.",
    ],
  },
  {
    slug: "change-or-cancel-plan",
    title: "Change or cancel your plan",
    category: "Plans and billing",
    summary:
      "Subscriptions are managed by the App Store or Google Play. Here's where to look.",
    updated: "2026-07-30",
    steps: [
      "In Streak, open You, then Plan, and tap Manage subscription.",
      "Your store's subscription page opens. Choose a different plan or tap Cancel.",
      "Cancelled plans stay active until the end of the period you've paid for.",
    ],
    body: [
      "Refunds are handled by the store you paid through. If the store declines and you think it shouldn't have, contact us and we'll help.",
      "Downgrading never deletes data. You choose which three habits stay active on the free plan; the rest are archived with their full history.",
    ],
  },
  {
    slug: "export-your-data",
    title: "Export or delete your data",
    category: "Privacy and data",
    summary:
      "Take every tick and note with you as CSV or JSON, or erase it all.",
    updated: "2026-06-14",
    steps: [
      "Open You, then Your data.",
      "Tap Export and choose CSV for spreadsheets or JSON for other apps.",
      "To erase everything, tap Delete all data and confirm twice.",
    ],
    body: [
      "Exports include every habit, every tick with its time, grace days, pauses and notes. Export is free on every plan.",
      "Deleting data removes it from this device and, if sync is on, from our servers within 24 hours. Backups are purged after 30 days.",
    ],
  },
];

/* -------------------------------------------------------------- download */

export const download = {
  title: "Download",
  hero: {
    title: "Get Streak on the phone you'll actually be holding",
    lede: "Free to download, free for three habits. The watch apps install alongside the phone app.",
  },
  requirements: [
    ["iPhone", "iOS 17 or later", "48 MB"],
    ["iPad", "iPadOS 17 or later", "52 MB"],
    ["Apple Watch", "watchOS 10 or later", "Installs with iPhone app"],
    ["Android phones", "Android 10 or later", "31 MB"],
    ["Wear OS", "Wear OS 4 or later", "Installs with Android app"],
  ] as [string, string, string][],
  releases: [
    {
      version: "4.2",
      date: "2026-10-06",
      notes: [
        "Evening check-in layout after sunset",
        "Lock-screen chain widget",
        "Learned reminder times",
        "Sync is about three times faster",
      ],
    },
    {
      version: "4.1",
      date: "2026-08-18",
      notes: [
        "Notes on any day, up to 280 characters",
        "Year view for every habit",
        "Fixed reminders drifting after daylight saving changes",
      ],
    },
    {
      version: "4.0",
      date: "2026-06-02",
      notes: [
        "Grace days",
        "Buddy chains",
        "Redesigned Today list with counts and timers",
      ],
    },
  ],
  languages:
    "English, Spanish, German, French, Portuguese, Japanese, Korean and Polish.",
};

/* ----------------------------------------------------------------- about */

export const about = {
  title: "About",
  hero: {
    title: "We started with a paper calendar and a red marker",
    lede: "In 2021 Ines Okafor taped a year planner above her desk and crossed off every day she wrote 300 words. Two hundred and nine crosses later, she and Tomasz Wren built the app version, mostly so she could stop buying markers.",
  },
  story: [
    "The first Streak had one screen: a calendar and a button. It still does, more or less. Everything we've added since has had to pass one test: does it make tomorrow's tick more likely?",
    "That test rules out a lot. No points, no levels, no leaderboards, no ads. No notifications designed to make you feel bad. We make money from people who find the free plan too small, and we'd like it to stay that simple.",
    "Today Streak is a team of eleven in Portland and spread across four time zones. We're independent, profitable, and still a little obsessed with red crosses.",
  ],
  principles: [
    {
      title: "The calendar is the product",
      text: "If a feature can't be explained by pointing at the calendar, it probably doesn't belong in Streak.",
    },
    {
      title: "No shame, no confetti",
      text: "We don't celebrate a tick with fireworks or mourn a miss with sad faces. A cross is a cross. An empty square is an empty square.",
    },
    {
      title: "Your habits are private",
      text: "No account required, encrypted sync, no trackers, no advertising. We couldn't sell your data if we wanted to, and we don't.",
    },
    {
      title: "Paid by the people who use it",
      text: "Plus and Family pay for everything. No investors to please means no growth hacks to ship.",
    },
  ],
  team: [
    {
      name: "Ines Okafor",
      role: "Co-founder, product",
      habit: "Write 300 words",
      day: 1604,
    },
    {
      name: "Tomasz Wren",
      role: "Co-founder, engineering",
      habit: "Cold shower",
      day: 412,
    },
    {
      name: "Ada Brennan",
      role: "iOS and watchOS",
      habit: "Read 20 pages",
      day: 233,
    },
    {
      name: "Rafael Ochoa",
      role: "Android and Wear OS",
      habit: "Duolingo, Portuguese",
      day: 518,
    },
    {
      name: "Mei Takahashi",
      role: "Design",
      habit: "Sketch one thing",
      day: 129,
    },
    {
      name: "Dr. Priya Sandoval",
      role: "Behavioural research",
      habit: "Walk at lunch",
      day: 301,
    },
    {
      name: "Samuel Achterberg",
      role: "Sync and infrastructure",
      habit: "No coffee after 14:00",
      day: 77,
    },
    { name: "Leila Haddad", role: "Support lead", habit: "Floss", day: 940 },
  ],
  press:
    "For press, interviews and screenshots we reply within two working days:",
};

/* --------------------------------------------------------------- contact */

export const contact = {
  title: "Contact support",
  hero: {
    title: "Write to a person who works on Streak",
    lede: "Support is answered by the team, not a bot. We reply within one working day, usually faster.",
  },
  topics: [
    "A chain counted wrong",
    "Reminders",
    "Sync or a new phone",
    "Billing and plans",
    "Watch or widgets",
    "Something else",
  ],
  devices: ["iPhone", "iPad", "Apple Watch", "Android phone", "Wear OS watch"],
  hours:
    "Monday to Friday, 08:00–18:00 Pacific. Weekend messages are answered on Monday morning.",
};

export const notFound = { title: "Page not found" };
