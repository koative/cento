import hero from "./assets/hero.jpg";
import slowFlow from "./assets/slow-flow.jpg";
import steadyFlow from "./assets/steady-flow.jpg";
import strongFlow from "./assets/strong-flow.jpg";
import yinImg from "./assets/yin.jpg";
import restorativeImg from "./assets/restorative.jpg";
import breathSit from "./assets/breath-and-sit.jpg";
import soundRest from "./assets/sound-rest.jpg";
import nidra from "./assets/yoga-nidra.jpg";
import ines from "./assets/ines.jpg";
import theo from "./assets/theo.jpg";
import june from "./assets/june.jpg";
import adaeze from "./assets/adaeze.jpg";
import wren from "./assets/wren.jpg";
import mats from "./assets/mats.jpg";
import mudra from "./assets/mudra.jpg";
import mountain from "./assets/mountain.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

/* ─── Brand ─────────────────────────────────────────── */

export const brand = {
  name: "Still",
  sector: "Yoga & meditation studio",
  tagline: "Less noise. More you.",
  address: ["48 Alder Row, second floor", "Larkfield, OR 97214"],
  phone: "+1 555 014 2290",
  email: "hello@still.example",
  frontDesk: [
    { days: "Monday – Friday", hours: "06:15 – 21:15" },
    { days: "Saturday", hours: "07:30 – 18:00" },
    { days: "Sunday", hours: "08:00 – 20:30" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/schedule", label: "Schedule" },
  { to: "/classes", label: "Classes" },
  { to: "/teachers", label: "Teachers" },
  { to: "/memberships", label: "Memberships" },
  { to: "/breathe", label: "Breathe" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Practice",
    links: [
      { to: "/schedule", label: "This week's schedule" },
      { to: "/classes", label: "Classes" },
      { to: "/breathe", label: "Breathing guide" },
    ],
  },
  {
    title: "Studio",
    links: [
      { to: "/teachers", label: "Teachers" },
      { to: "/about", label: "Our story" },
      { to: "/visit", label: "Your first visit" },
    ],
  },
  {
    title: "Join",
    links: [
      { to: "/memberships", label: "Memberships & passes" },
      { to: "/book", label: "Book a class" },
    ],
  },
];

export const newsletter = {
  title: "The Sunday letter",
  text: "Next week's schedule changes and one short practice to try at home. Once a week, never more.",
};

/* ─── Classes ───────────────────────────────────────── */

export type Focus = "Move" | "Soften" | "Settle";

export const focuses: { id: Focus; text: string }[] = [
  {
    id: "Move",
    text: "Flowing classes that warm the body and quiet the mind by keeping it busy.",
  },
  {
    id: "Soften",
    text: "Long, supported shapes on the floor. Less doing, more letting go.",
  },
  {
    id: "Settle",
    text: "Breath, sound and guided rest. You may not move at all.",
  },
];

export const effortLabels = ["", "Barely", "Gentle", "Steady", "Strong"];

export type ClassType = {
  slug: string;
  name: string;
  focus: Focus;
  effort: 1 | 2 | 3 | 4;
  minutes: number;
  summary: string;
  intro: string[];
  forYou: string[];
  arc: { at: number; title: string; text: string }[];
  bring: string[];
  room: string;
  image: Img;
};

export const classes: ClassType[] = [
  {
    slug: "slow-flow",
    name: "Slow Flow",
    focus: "Move",
    effort: 2,
    minutes: 60,
    summary:
      "Linked movement at the pace of your breath, with time to arrive in every shape.",
    intro: [
      "Slow Flow is where most people start, and where a lot of people stay. We move through standing and floor postures linked by the breath, but each shape is held long enough to find your feet in it.",
      "Expect clear, practical cues and plenty of options. Nobody will push you deeper than you want to go.",
    ],
    forYou: [
      "You are new to yoga or coming back after a long break",
      "You want to move without rushing",
      "Your body is stiff from a desk, a commute or a long run",
    ],
    arc: [
      {
        at: 0,
        title: "Arrive",
        text: "Lying down, a few minutes of noticing the breath.",
      },
      {
        at: 8,
        title: "Wake the spine",
        text: "Cat and cow, gentle twists, hands and knees.",
      },
      {
        at: 20,
        title: "Standing",
        text: "Two short sequences repeated slowly, the second time with less instruction.",
      },
      {
        at: 42,
        title: "Floor",
        text: "Hips and hamstrings, one long-held stretch each side.",
      },
      {
        at: 52,
        title: "Rest",
        text: "Eight minutes of savasana, with blankets.",
      },
    ],
    bring: ["Comfortable clothes you can move in", "Water, if you like"],
    room: "Long Room · unheated, 22°C",
    image: {
      src: slowFlow,
      alt: "A student in downward-facing dog on a teal mat on a polished concrete floor",
      w: 933,
      h: 1400,
    },
  },
  {
    slug: "steady-flow",
    name: "Steady Flow",
    focus: "Move",
    effort: 3,
    minutes: 60,
    summary:
      "A rounded, breath-led vinyasa that builds a little heat and then lets it go.",
    intro: [
      "Steady Flow moves one breath to one movement for most of the hour. It is a full practice: sun salutations, standing balances, a backbend or two, and a long cool-down.",
      "If you have practised before and know a downward dog from a child's pose, you will be at home here.",
    ],
    forYou: [
      "You have taken a handful of classes and want more movement",
      "You like a practice that feels like exercise and meditation at once",
    ],
    arc: [
      {
        at: 0,
        title: "Settle",
        text: "Seated breathing to set the pace for the hour.",
      },
      {
        at: 6,
        title: "Salutations",
        text: "Three rounds, building slowly from half to full.",
      },
      {
        at: 18,
        title: "Standing flow",
        text: "Warriors, lunges and one balance, held for five breaths.",
      },
      {
        at: 40,
        title: "Peak",
        text: "A backbend or arm balance, always with a quieter option.",
      },
      {
        at: 48,
        title: "Cool down",
        text: "Twists, forward folds and a long rest.",
      },
    ],
    bring: [
      "Clothes that do not ride up when you fold forward",
      "A small towel",
    ],
    room: "Long Room · unheated, 22°C",
    image: {
      src: steadyFlow,
      alt: "A full class holding a low lunge with arms stretched wide",
      w: 1400,
      h: 1014,
    },
  },
  {
    slug: "strong-flow",
    name: "Strong Flow",
    focus: "Move",
    effort: 4,
    minutes: 75,
    summary:
      "Longer holds, deeper strength work and the occasional inversion. Still unhurried.",
    intro: [
      "Strong Flow is our most physical class. Holds are longer, transitions ask more of the core, and most weeks include an inversion practised against the wall.",
      "It is still a Still class: no music to keep up with, no counting reps. The effort is there to make the rest at the end feel earned.",
    ],
    forYou: [
      "You practise regularly and want a challenge",
      "You are working towards a particular posture",
      "You want strength without a gym",
    ],
    arc: [
      {
        at: 0,
        title: "Breath",
        text: "Five minutes of ujjayi breathing to build heat from the inside.",
      },
      {
        at: 8,
        title: "Core",
        text: "Slow, controlled work on the floor and in plank.",
      },
      {
        at: 22,
        title: "Standing",
        text: "Long-held warriors and balances, up to ten breaths each.",
      },
      {
        at: 48,
        title: "Inversions",
        text: "Headstand or shoulderstand prep at the wall, with a teacher close by.",
      },
      {
        at: 62,
        title: "Release",
        text: "Hip openers, twists and a full ten-minute rest.",
      },
    ],
    bring: ["A towel", "Water", "A willingness to rest when you need to"],
    room: "Long Room · lightly warmed, 26°C",
    image: {
      src: strongFlow,
      alt: "Black and white photograph of a student in downward-facing dog in an empty studio",
      w: 1400,
      h: 933,
    },
  },
  {
    slug: "yin",
    name: "Yin",
    focus: "Soften",
    effort: 2,
    minutes: 75,
    summary:
      "Six or seven floor postures held for three to five minutes each. Quiet, and quietly intense.",
    intro: [
      "In Yin we stay. Most postures are seated or lying down and held for several minutes, so the deeper tissues around the hips, spine and shoulders have time to respond.",
      "The sensation can be strong even though nothing looks difficult. Teachers read short passages or keep time in silence while you breathe.",
    ],
    forYou: [
      "You run, cycle, climb or sit a lot",
      "You find it hard to be still and want to practise it",
      "You sleep badly",
    ],
    arc: [
      { at: 0, title: "Arrive", text: "Lying on the back, a body scan." },
      {
        at: 8,
        title: "Hips",
        text: "Butterfly, dragon and sleeping swan, four minutes each.",
      },
      {
        at: 38,
        title: "Spine",
        text: "Sphinx or seal, then a long supported twist.",
      },
      {
        at: 58,
        title: "Rest",
        text: "Legs up the wall, then a long savasana.",
      },
    ],
    bring: ["Warm layers and socks; the body cools as you hold still"],
    room: "Long Room · unheated, 22°C",
    image: {
      src: yinImg,
      alt: "A woman sitting cross-legged on a dark mat beside a plain white wall, turning to look over her shoulder",
      w: 1400,
      h: 1120,
    },
  },
  {
    slug: "restorative",
    name: "Restorative",
    focus: "Soften",
    effort: 1,
    minutes: 75,
    summary:
      "Five postures, fully supported by bolsters and blankets. The teacher comes to you.",
    intro: [
      "Restorative is the slowest class we teach. Every posture is propped so that no muscle has to work to hold you there, and the teacher walks the room adjusting blankets and offering a hand on the shoulders or feet if you want one.",
      "Many people fall asleep. That is fine.",
    ],
    forYou: [
      "You are tired, unwell, grieving or recovering",
      "You are pregnant (tell the teacher when you arrive)",
      "You want permission to do nothing for an hour",
    ],
    arc: [
      {
        at: 0,
        title: "Set up",
        text: "We build your first nest of props together.",
      },
      {
        at: 10,
        title: "Supported shapes",
        text: "Five postures of around ten minutes each, with gentle hands-on adjustments if you opt in.",
      },
      {
        at: 62,
        title: "Rest",
        text: "A long final rest under a weighted blanket.",
      },
    ],
    bring: ["Socks and a jumper", "Nothing else; we provide every prop"],
    room: "Long Room · warmed, 25°C",
    image: {
      src: restorativeImg,
      alt: "A teacher gently holding a student's feet as they rest on a plum-coloured bolster",
      w: 1400,
      h: 932,
    },
  },
  {
    slug: "breath-and-sit",
    name: "Breath & Sit",
    focus: "Settle",
    effort: 1,
    minutes: 30,
    summary:
      "Half an hour of guided breathing and seated meditation. Chairs and cushions both welcome.",
    intro: [
      "Breath & Sit is a short, plain meditation class. We spend ten minutes on one breathing pattern, then sit together for fifteen minutes with occasional guidance, then talk for five if anyone wants to.",
      "You can sit on a cushion, a stool or a chair. There is no right way, only a way you can stay in.",
    ],
    forYou: [
      "You want to learn to meditate with other people around you",
      "You only have a lunch break",
      "You tried an app and gave up",
    ],
    arc: [
      {
        at: 0,
        title: "Breathing",
        text: "One pattern from our breathing guide, practised together.",
      },
      {
        at: 10,
        title: "Sitting",
        text: "Fifteen minutes, guidance every few minutes, a bell to finish.",
      },
      { at: 25, title: "Questions", text: "Optional and short." },
    ],
    bring: ["Nothing at all"],
    room: "Small Room · cushions, stools and chairs",
    image: {
      src: breathSit,
      alt: "A woman meditating on a mat in a bright room with brick walls and potted plants",
      w: 1400,
      h: 933,
    },
  },
  {
    slug: "sound-rest",
    name: "Sound Rest",
    focus: "Settle",
    effort: 1,
    minutes: 60,
    summary:
      "Lie down under blankets while bowls, a gong and a shruti box fill the room.",
    intro: [
      "Sound Rest begins with ten minutes of easy floor movement and then you lie down for the rest of the hour while the teacher plays singing bowls, a frame drum and a shruti box.",
      "It is loud in places and very quiet in others. Earplugs are at the front desk if you would like them.",
    ],
    forYou: [
      "You struggle to switch off at the end of the week",
      "You find silence harder than sound",
      "You want a different way into meditation",
    ],
    arc: [
      {
        at: 0,
        title: "Unwind",
        text: "Ten minutes of slow movement on the floor.",
      },
      {
        at: 10,
        title: "Sound",
        text: "Forty minutes of bowls, drum and voice while you rest.",
      },
      {
        at: 52,
        title: "Return",
        text: "Silence, a stretch, and tea in the lobby.",
      },
    ],
    bring: ["Warm socks", "An eye pillow if you have one; we have spares"],
    room: "Long Room · warmed, 25°C",
    image: {
      src: soundRest,
      alt: "A teacher striking a brass singing bowl held in her palm, incense smoke rising behind",
      w: 1400,
      h: 932,
    },
  },
  {
    slug: "yoga-nidra",
    name: "Yoga Nidra",
    focus: "Settle",
    effort: 1,
    minutes: 45,
    summary:
      "A spoken guided rest, lying down, that moves attention slowly around the body.",
    intro: [
      "Yoga Nidra is a guided practice done entirely lying down. The teacher's voice moves your attention around the body, through the breath and through a few simple images, while you rest somewhere between waking and sleep.",
      "Late-evening classes are timed so you can go straight home to bed.",
    ],
    forYou: [
      "You sleep badly or wake at 3 a.m.",
      "You are recovering from illness or injury",
      "You want rest without having to do anything",
    ],
    arc: [
      {
        at: 0,
        title: "Settle in",
        text: "Find a comfortable position with props and blankets.",
      },
      {
        at: 5,
        title: "Rotation",
        text: "Attention moves around the body, one part at a time.",
      },
      {
        at: 20,
        title: "Breath and images",
        text: "Counting breaths backwards, then a few slow images.",
      },
      {
        at: 38,
        title: "Return",
        text: "Gradually back to the room, at your own pace.",
      },
    ],
    bring: ["Pyjama-soft clothes", "Socks"],
    room: "Small Room · dim light, 24°C",
    image: {
      src: nidra,
      alt: "Close-up of a hand resting on a knee in a mudra, in soft low light",
      w: 1400,
      h: 1050,
    },
  },
];

/* ─── Teachers ──────────────────────────────────────── */

export type Teacher = {
  slug: string;
  name: string;
  role: string;
  since: number;
  short: string;
  bio: string[];
  training: string[];
  quote: string;
  teaches: string[]; // class slugs
  image: Img;
};

export const teachers: Teacher[] = [
  {
    slug: "ines-alvaro",
    name: "Inés Álvaro",
    role: "Founder · Slow Flow, Restorative",
    since: 2014,
    short:
      "Opened Still in a former piano workshop after eleven years teaching in community halls.",
    bio: [
      "Inés started practising in her twenties to manage a back injury from dancing and started teaching a decade later in church halls and libraries across the county. She opened Still in 2014 because she wanted a room that was quiet on purpose.",
      "Her classes are precise and warm. She will tell you exactly where to put your back foot and then remind you that none of it matters very much.",
    ],
    training: [
      "500-hour teacher training, 2009",
      "Restorative and therapeutic yoga, 2012",
      "Trauma-informed teaching, 2019",
    ],
    quote:
      "Most people do not need more flexibility. They need fewer things to hold.",
    teaches: ["slow-flow", "restorative", "breath-and-sit"],
    image: {
      src: ines,
      alt: "Portrait of Inés, smiling, hair tied up, in a white T-shirt against a pale wall",
      w: 715,
      h: 900,
    },
  },
  {
    slug: "theo-marsh",
    name: "Theo Marsh",
    role: "Steady Flow, Strong Flow",
    since: 2017,
    short:
      "A former rower who came to yoga for his hamstrings and stayed for everything else.",
    bio: [
      "Theo rowed at university and coached for six years before a shoulder injury sent him to a Steady Flow class he expected to hate. He trained as a teacher two years later.",
      "He teaches strength with patience: lots of explanation about why, long holds, and a running joke about how many breaths are left.",
    ],
    training: [
      "200-hour vinyasa training, 2016",
      "Anatomy for movement teachers, 2018",
      "Inversions and arm balance intensive, 2021",
    ],
    quote:
      "Strong is not the same as hard. Strong is staying when you could leave.",
    teaches: ["steady-flow", "strong-flow"],
    image: {
      src: theo,
      alt: "Portrait of Theo, smiling broadly, in a white T-shirt against a grey stone wall",
      w: 600,
      h: 900,
    },
  },
  {
    slug: "june-hallett",
    name: "June Hallett",
    role: "Yin, Yoga Nidra, Restorative",
    since: 2015,
    short:
      "Spent twenty years as a hospice nurse. Teaches rest as seriously as others teach movement.",
    bio: [
      "June worked nights on a hospice ward for twenty years and practised Yin to come down from long shifts. She now teaches the late-evening classes at Still, and the Yoga Nidra recordings on our Sunday letter are hers.",
      "Her voice is low and unhurried. Regulars describe her classes as the only hour of the week when nobody needs anything from them.",
    ],
    training: [
      "200-hour training, 2013",
      "Yin yoga teacher training, 2014",
      "Yoga Nidra facilitator, 2018",
    ],
    quote: "Rest is not a reward for finishing. It is part of the work.",
    teaches: ["yin", "yoga-nidra", "restorative"],
    image: {
      src: june,
      alt: "Portrait of June, smiling, with shoulder-length fair hair, in a garden at dusk",
      w: 900,
      h: 600,
    },
  },
  {
    slug: "adaeze-nwosu",
    name: "Adaeze Nwosu",
    role: "Breath & Sit, Sound Rest, Steady Flow",
    since: 2019,
    short:
      "Trained as a singer. Leads our breathwork, sound and lunchtime meditation classes.",
    bio: [
      "Adaeze trained as a classical singer, which is where she first learned that breath could be practised. She teaches the breathing patterns in our guide and wrote most of the notes that go with them.",
      "In Sound Rest she plays bowls, frame drum and shruti box; in Breath & Sit she mostly stays quiet and lets the room do the work.",
    ],
    training: [
      "200-hour training, 2018",
      "Breathwork facilitator training, 2020",
      "Sound and voice for yoga teachers, 2022",
    ],
    quote:
      "You have been breathing your whole life. We are just going to pay attention for a while.",
    teaches: ["breath-and-sit", "sound-rest", "steady-flow"],
    image: {
      src: adaeze,
      alt: "Portrait of Adaeze with short natural hair, resting her chin on her hand, against a warm brown backdrop",
      w: 600,
      h: 900,
    },
  },
  {
    slug: "wren-castell",
    name: "Wren Castell",
    role: "Slow Flow, Yin, Restorative",
    since: 2021,
    short:
      "Our newest teacher. Leads the early classes and the Sunday community-rate flow.",
    bio: [
      "Wren came to Still as a student in 2016 and completed teacher training here in 2020. She teaches the early-morning Slow Flow and the Sunday evening class we run at a community rate.",
      "Her classes are gentle and plain-spoken, with lots of time on the floor and a habit of ending five minutes early so nobody has to rush to work.",
    ],
    training: [
      "200-hour training at Still, 2020",
      "Yoga for pregnancy, 2022",
      "Accessible yoga, 2023",
    ],
    quote: "If it feels like too much, it is. Take the smaller version.",
    teaches: ["slow-flow", "yin", "restorative"],
    image: {
      src: wren,
      alt: "Portrait of Wren, with a chin-length red bob, by a lake with hills behind",
      w: 900,
      h: 600,
    },
  },
];

/* ─── Weekly schedule ───────────────────────────────── */

export const rooms = {
  long: { name: "Long Room", capacity: 22 },
  small: { name: "Small Room", capacity: 10 },
} as const;

export type Session = {
  id: string;
  day: number; // 0 = Monday
  time: string;
  cls: string;
  teacher: string;
  room: keyof typeof rooms;
  note?: string;
};

type Slot = [string, string, string, keyof typeof rooms, string?];

const week: Slot[][] = [
  [
    ["06:45", "steady-flow", "theo-marsh", "long"],
    ["09:30", "slow-flow", "ines-alvaro", "long"],
    ["12:15", "breath-and-sit", "adaeze-nwosu", "small"],
    ["18:00", "steady-flow", "adaeze-nwosu", "long"],
    ["19:45", "yin", "june-hallett", "long"],
  ],
  [
    ["07:00", "slow-flow", "wren-castell", "long"],
    ["12:15", "strong-flow", "theo-marsh", "long"],
    ["17:30", "breath-and-sit", "adaeze-nwosu", "small"],
    ["18:30", "restorative", "ines-alvaro", "long"],
    ["20:00", "yoga-nidra", "june-hallett", "small"],
  ],
  [
    ["06:45", "strong-flow", "theo-marsh", "long"],
    ["09:30", "yin", "wren-castell", "long"],
    ["12:15", "breath-and-sit", "adaeze-nwosu", "small"],
    ["18:00", "slow-flow", "ines-alvaro", "long"],
    ["19:45", "sound-rest", "adaeze-nwosu", "long"],
  ],
  [
    ["07:00", "steady-flow", "wren-castell", "long"],
    ["12:15", "slow-flow", "ines-alvaro", "long"],
    ["18:00", "strong-flow", "theo-marsh", "long"],
    ["19:45", "restorative", "wren-castell", "long"],
  ],
  [
    ["06:45", "steady-flow", "theo-marsh", "long"],
    ["09:30", "restorative", "june-hallett", "long"],
    ["12:15", "breath-and-sit", "adaeze-nwosu", "small"],
    ["17:30", "yin", "june-hallett", "long"],
    ["19:15", "sound-rest", "adaeze-nwosu", "long"],
  ],
  [
    ["08:00", "strong-flow", "theo-marsh", "long"],
    ["09:45", "slow-flow", "wren-castell", "long"],
    ["11:30", "breath-and-sit", "ines-alvaro", "small"],
    ["16:00", "yoga-nidra", "june-hallett", "small"],
  ],
  [
    ["08:30", "steady-flow", "adaeze-nwosu", "long"],
    ["10:15", "restorative", "ines-alvaro", "long"],
    [
      "17:00",
      "slow-flow",
      "wren-castell",
      "long",
      "Community rate: pay $8–$26, whatever is fair",
    ],
    ["19:00", "yoga-nidra", "june-hallett", "small"],
  ],
];

export const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const sessions: Session[] = week.flatMap((slots, day) =>
  slots.map(([time, cls, teacher, room, note]) => ({
    id: `${dayKeys[day]}-${time.replace(":", "")}`,
    day,
    time,
    cls,
    teacher,
    room,
    note,
  })),
);

/* ─── Memberships ───────────────────────────────────── */

export const intro = {
  name: "First fortnight",
  price: 40,
  text: "Fourteen days of unlimited classes for anyone new to Still. Starts on the day of your first class.",
};

export const passes = [
  {
    id: "drop-in",
    name: "Drop-in",
    price: 26,
    detail: "One class, any style. Valid 30 days.",
  },
  {
    id: "five",
    name: "Five classes",
    price: 120,
    detail: "$24 a class. Valid 3 months, shareable with one friend.",
  },
  {
    id: "ten",
    name: "Ten classes",
    price: 220,
    detail: "$22 a class. Valid 6 months, shareable with one friend.",
  },
];

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  text: string;
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "twice",
    name: "Twice a week",
    monthly: 108,
    yearly: 1080,
    text: "Eight classes a month for people with a steady rhythm.",
    includes: [
      "Two classes every week, any style",
      "Book 7 days ahead",
      "One guest pass a month",
      "Freeze up to 1 month a year",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    monthly: 152,
    yearly: 1520,
    text: "Every class, every day. Most members come three or four times a week.",
    includes: [
      "Every class on the schedule",
      "Book 14 days ahead",
      "Two guest passes a month",
      "Freeze up to 2 months a year",
      "10% off workshops and retreats",
    ],
  },
];

export const compare = {
  columns: ["Drop-in", "Ten classes", "Twice a week", "Unlimited"],
  rows: [
    { label: "Classes", values: ["1", "10", "8 a month", "Every class"] },
    { label: "Book ahead", values: ["7 days", "7 days", "7 days", "14 days"] },
    {
      label: "Mats, props and blankets",
      values: ["Included", "Included", "Included", "Included"],
    },
    {
      label: "Guest passes",
      values: ["—", "Share with one friend", "1 a month", "2 a month"],
    },
    {
      label: "Freeze",
      values: ["—", "—", "1 month a year", "2 months a year"],
    },
    {
      label: "Workshops",
      values: ["Full price", "Full price", "Full price", "10% off"],
    },
  ],
};

export const concessions =
  "Students, over-65s and anyone receiving unemployment or disability support pay 25% less on memberships and class packs. Ask at the desk; we will not ask for proof.";

export const policies = [
  {
    title: "Cancelling",
    text: "Cancel up to 8 hours before class and the credit comes straight back. Later than that, the class is used.",
  },
  {
    title: "Waitlist",
    text: "If a class is full, join the waitlist. We move you in automatically up to 2 hours before and send a text.",
  },
  {
    title: "Memberships",
    text: "Month to month, with 30 days' notice to stop. Yearly memberships pay for ten months and get twelve.",
  },
  {
    title: "Freezing",
    text: "Travelling, injured or having a baby? Freeze your membership from the desk or by email, no fee.",
  },
];

export const faqs = [
  {
    q: "I have never done yoga. Which class should I take?",
    a: "Slow Flow or Restorative. Both are taught for beginners every time, and the teacher will check in with you before class. Breath & Sit is a good choice if you would rather not move much at all.",
  },
  {
    q: "Do I need my own mat?",
    a: "No. We have mats, bolsters, blocks, straps, blankets and eye pillows for everyone, washed after every class. Bring your own if you prefer it.",
  },
  {
    q: "How early should I arrive?",
    a: "Ten minutes for your first class so we can show you around and set up your props. After that, five minutes is plenty. Doors to the room close when class starts.",
  },
  {
    q: "Can I come if I am pregnant or injured?",
    a: "Usually, yes. Restorative, Yin and Slow Flow all work well with modifications. Tell the teacher before class and they will give you options; if in doubt, email us and Wren or Inés will reply.",
  },
  {
    q: "Is the studio accessible?",
    a: "There is a lift to the second floor, step-free access to both rooms, a gender-neutral changing room and an accessible toilet. Chairs are always available in class.",
  },
  {
    q: "What is the community rate?",
    a: "Sunday's 17:00 Slow Flow is pay-what-is-fair between $8 and $26. No questions, no proof, same class.",
  },
];

/* ─── Breathing guide ───────────────────────────────── */

export type BreathStep = { kind: "in" | "hold" | "out"; seconds: number };
export type Pattern = {
  id: string;
  name: string;
  short: string;
  when: string;
  how: string;
  steps: BreathStep[];
};

export const patterns: Pattern[] = [
  {
    id: "long-exhale",
    name: "Long exhale",
    short: "In 4 · Out 6",
    when: "At the end of a long day, or whenever your shoulders are up by your ears.",
    how: "Breathe in through the nose for four and out for six, as if through a straw. A longer exhale is one of the simplest ways to slow down.",
    steps: [
      { kind: "in", seconds: 4 },
      { kind: "out", seconds: 6 },
    ],
  },
  {
    id: "box",
    name: "Box",
    short: "In 4 · Hold 4 · Out 4 · Hold 4",
    when: "Before something that matters: a meeting, a phone call, a hard conversation.",
    how: "Four equal sides. If holding feels like strain, shorten every side to three. The holds should feel like a pause, never a grip.",
    steps: [
      { kind: "in", seconds: 4 },
      { kind: "hold", seconds: 4 },
      { kind: "out", seconds: 4 },
      { kind: "hold", seconds: 4 },
    ],
  },
  {
    id: "even",
    name: "Even",
    short: "In 5 · Out 5",
    when: "For steady focus when you want to feel awake and calm at once.",
    how: "Six breaths a minute, in and out through the nose, with no pause between. Let the belly move first and the chest follow.",
    steps: [
      { kind: "in", seconds: 5 },
      { kind: "out", seconds: 5 },
    ],
  },
  {
    id: "four-seven-eight",
    name: "4 · 7 · 8",
    short: "In 4 · Hold 7 · Out 8",
    when: "Lying in bed, when sleep is not coming.",
    how: "In through the nose for four, hold for seven, out through the mouth for eight. Do no more than four rounds while you are learning it.",
    steps: [
      { kind: "in", seconds: 4 },
      { kind: "hold", seconds: 7 },
      { kind: "out", seconds: 8 },
    ],
  },
];

export const breatheCopy = {
  title: "Take this moment. It's yours.",
  lead: "Choose a pattern, choose how long, and follow the circle. It grows as you breathe in and softens as you breathe out. Nothing to download, nothing to sign up for.",
  safety:
    "Breathe through the nose unless the pattern says otherwise. If you feel light-headed or anxious, stop and breathe normally. This is a relaxation aid, not medical treatment.",
  durations: [1, 3, 5],
  image: {
    src: mudra,
    alt: "A hand resting palm-up on a knee, thumb and finger touching, in low green light",
    w: 1400,
    h: 933,
  } as Img,
};

/* ─── Pages ─────────────────────────────────────────── */

export const home = {
  hero: {
    title: ["Less noise.", "More you."],
    lead: "A small yoga and meditation studio on the second floor of an old piano workshop. Thirty-two classes a week, from early Slow Flow to late-night Yoga Nidra, taught slowly and in plain words.",
    image: {
      src: hero,
      alt: "A woman holding a bow pose on a wooden floor in a bright studio with bolsters, plants and an A-frame window",
      w: 1800,
      h: 1200,
    } as Img,
  },
  philosophy: {
    title: ["You don't need to become", "someone new."],
    em: "Just come back to yourself.",
    text: "No mirrors, no music to keep up with, no perfect poses. Thoughtful movement, a warm room, and the freedom to meet yourself exactly where you are.",
  },
  steps: [
    {
      title: "Book your first class",
      text: "Pick anything marked gentle or barely. The First fortnight is $40 for fourteen days of unlimited classes.",
    },
    {
      title: "Arrive ten minutes early",
      text: "We'll show you the room, set up your props and tell the teacher you're new.",
    },
    {
      title: "Stay for tea",
      text: "There is always a pot of something in the lobby after class. Nobody minds if you just sit.",
    },
  ],
  quotes: [
    {
      text: "I came for my back and kept coming because it is the only place where nobody watches the clock, including me.",
      who: "Priya, member since 2019",
    },
    {
      text: "June's Thursday Nidra is the reason I sleep through the night. I am not exaggerating.",
      who: "Callum, Unlimited member",
    },
  ],
  close: {
    text: "Mats down, lights low, kettle on. Come as you are.",
  },
};

export const about = {
  title: "A room that is quiet on purpose",
  lead: "Still opened in 2014 on the second floor of what used to be Halvard & Sons, a piano workshop that built uprights for sixty years. The floorboards in the Long Room are theirs.",
  story: [
    "Inés Álvaro had been teaching in church halls and libraries for eleven years when the workshop came up for lease. She wanted a studio without mirrors, without music and without anyone selling anything, where a beginner and a twenty-year practitioner could lie next to each other and both feel at home.",
    "Ten years on there are five teachers, two rooms and around four hundred people who come each month. The schedule has grown, but the rules have not: classes start and finish on time, teachers explain things in plain words, and nobody is ever asked to push.",
  ],
  values: [
    {
      title: "Slow by default",
      text: "We would rather you do less and stay curious than do more and get hurt. Every class has a smaller version, and the smaller version is never second best.",
    },
    {
      title: "Plain words",
      text: "We teach in English, not in Sanskrit-flavoured poetry. If we use a traditional name, we tell you what it means.",
    },
    {
      title: "Open door",
      text: "A community-rate class every week, concessions without proof, chairs in every room and a lift to the second floor.",
    },
    {
      title: "Quiet business",
      text: "No retail wall, no upsell at the desk, no countdown offers. Memberships stop when you ask them to.",
    },
  ],
  rooms: [
    {
      name: "The Long Room",
      text: "Twenty-two mats on the piano maker's maple floor, nine tall windows facing east, underfloor heating for the slower classes.",
    },
    {
      name: "The Small Room",
      text: "Ten places, low light, cushions, stools and chairs. Home to Breath & Sit and Yoga Nidra.",
    },
  ],
  retreat: {
    title: "Once a year, we leave the city",
    text: "Every October a group of members spends four days at a farmhouse in the hills: two practices a day, long walks, shared meals and a lot of sleep. Places open to members each spring.",
    image: {
      src: mountain,
      alt: "A woman in tree pose on a rock above a misty, forested valley",
      w: 1120,
      h: 1400,
    } as Img,
  },
};

export const visit = {
  title: "Your first visit",
  lead: "Everything you need to know before you walk in, so the only new thing is the class itself.",
  getting: [
    {
      title: "On foot or by bike",
      text: "Five minutes from Larkfield Common. Bike racks under the arch on Alder Row.",
    },
    {
      title: "By bus",
      text: "Lines 4 and 15 stop at Alder & Ninth, two minutes away.",
    },
    {
      title: "By car",
      text: "Street parking is free after 18:00 and all weekend. The Ninth Street garage is $2 an hour.",
    },
  ],
  timeline: [
    {
      at: "10 minutes before",
      text: "Come up the stairs or take the lift. Shoes off in the lobby, phones on silent.",
    },
    {
      at: "8 minutes before",
      text: "Check in at the desk. We'll ask about injuries and show you the changing rooms.",
    },
    {
      at: "5 minutes before",
      text: "Set up your mat and props. The teacher will come and say hello.",
    },
    {
      at: "Class starts",
      text: "The door closes. If you're late, wait for the first rest and slip in quietly.",
    },
    {
      at: "After class",
      text: "Put props back where you found them. Tea is in the lobby.",
    },
  ],
  bring: [
    "Clothes you can move and stretch in; layers for slower classes",
    "Water in a refillable bottle (we have a filter tap)",
    "Nothing else. Mats, props, blankets, towels and eye pillows are provided",
  ],
  etiquette: [
    "Arrive a few minutes early and leave your phone in the lobby",
    "Skip scent and strong perfume; some people in the room are sensitive to it",
    "Tell the teacher about injuries, pregnancy or anything else they should know",
    "Rest whenever you like. Child's pose is always allowed",
  ],
  image: {
    src: mats,
    alt: "Rolled yoga mats in teal, black and purple stacked in white wooden cubbies",
    w: 1200,
    h: 1200,
  } as Img,
};

export const notFound = {
  title: "This room is empty.",
  text: "The page you were looking for has moved or never existed. Take a breath, then try one of these.",
};
