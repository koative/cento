import classImg from "./assets/class.jpg";
import studioImg from "./assets/studio.jpg";
import socialImg from "./assets/social.jpg";
import hiphopImg from "./assets/hiphop.jpg";
import breakingImg from "./assets/breaking.jpg";
import contemporaryImg from "./assets/contemporary.jpg";
import duetImg from "./assets/duet.jpg";
import balletImg from "./assets/ballet.jpg";
import jazzfunkImg from "./assets/jazzfunk.jpg";
import vogueImg from "./assets/vogue.jpg";
import salsaImg from "./assets/salsa.jpg";
import lindyImg from "./assets/lindy.jpg";
import cypherImg from "./assets/cypher.jpg";
import exchangeImg from "./assets/exchange.jpg";
import dreImg from "./assets/dre.jpg";
import marisolImg from "./assets/marisol.jpg";
import priyaImg from "./assets/priya.jpg";
import theoImg from "./assets/theo.jpg";

export type Img = {
  src: string;
  alt: string;
  w: number;
  h: number;
  pos?: string;
};

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Tempo",
  sector: "Dance studio",
  tagline: "No perfect moves. Just yours.",
  email: "hello@tempo.example",
  phone: "+1 555 0130 300",
  phoneHref: "tel:+15550130300",
  address: ["88 Foundry Street, Unit 3", "Riverside, RV 20418"],
  transit:
    "Two minutes from Foundry Street station. Bike racks by the loading door; street parking is free after 6 pm.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  hours: [
    { days: "Monday – Friday", time: "7:00 am – 10:30 pm" },
    { days: "Saturday", time: "9:30 am – 6:00 pm" },
    { days: "Sunday", time: "11:00 am – 7:00 pm" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/timetable", label: "Timetable" },
  { to: "/styles", label: "Styles" },
  { to: "/instructors", label: "Instructors" },
  { to: "/passes", label: "Passes" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "Studio" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Dance",
    links: [
      { to: "/timetable", label: "Weekly timetable" },
      { to: "/styles", label: "All styles" },
      { to: "/styles/hip-hop", label: "Hip-hop" },
      { to: "/styles/contemporary", label: "Contemporary" },
      { to: "/styles/salsa", label: "Salsa On1" },
      { to: "/instructors", label: "Instructors" },
    ],
  },
  {
    title: "Join",
    links: [
      { to: "/trial", label: "Book a $15 trial" },
      { to: "/passes", label: "Passes & memberships" },
      { to: "/events", label: "Socials & events" },
      { to: "/about", label: "The studio" },
    ],
  },
];

export const newsletter = {
  title: "The Monday Mix",
  text: "One email a week: timetable changes, the playlist from Friday's social, and first dibs on workshop spots.",
};

/* ------------------------------------------------------------------ styles */

export type StyleSlug =
  | "hip-hop"
  | "breaking"
  | "vogue"
  | "contemporary"
  | "ballet"
  | "jazz-funk"
  | "salsa"
  | "lindy";

export type Family = "Street & club" | "Studio technique" | "Partner & social";

export type DanceStyle = {
  slug: StyleSlug;
  name: string;
  family: Family;
  bpm: [number, number];
  line: string;
  intro: string;
  body: string[];
  learn: string[];
  music: string;
  wear: string;
  firstClass: string;
  image: Img;
  gallery?: Img;
};

export const families: Family[] = [
  "Street & club",
  "Studio technique",
  "Partner & social",
];

export const styles: DanceStyle[] = [
  {
    slug: "hip-hop",
    name: "Hip-hop",
    family: "Street & club",
    bpm: [85, 100],
    line: "Bounce, groove and the footwork that came out of block parties.",
    intro:
      "Foundations first: the bounce and rock that sit under every move, then grooves with names and histories, then short combos you'll actually remember on Saturday night.",
    body: [
      "Hip-hop at Tempo is taught as a social dance before it is a choreography class. We spend the first fifteen minutes of every session on grooves — the bart simpson, the running man, the cabbage patch — and why they feel the way they do.",
      "Choreo Lab on Tuesdays is where the foundations get put to work: an eight-week piece, filmed in week eight, shown at the Winter Showcase if you want it to be.",
    ],
    learn: [
      "Bounce and rock in the knees",
      "Twenty named party grooves",
      "Musicality on the snare",
      "Freestyle without freezing up",
    ],
    music: "Boom bap, 90s and 00s rap, R&B, a little Jersey club",
    wear: "Trainers with some grip, anything you can squat in",
    firstClass:
      "Hip-hop Foundations on Monday, Wednesday or Saturday. No combo in week one is longer than sixteen counts.",
    image: {
      src: hiphopImg,
      alt: "Four hip-hop dancers in camouflage trousers mid-groove on a stage washed in pink light",
      w: 1800,
      h: 1200,
    },
  },
  {
    slug: "breaking",
    name: "Breaking",
    family: "Street & club",
    bpm: [110, 135],
    line: "Toprock, footwork, freezes — and the cypher that holds it all.",
    intro:
      "Breaking is built from four pieces: toprock on your feet, footwork on the floor, power moves and freezes. Basics classes stay on the first two until your wrists are ready for the rest.",
    body: [
      "Every class ends in a cypher. It's short, it's friendly, and nobody is pushed in — but most people go in by week three.",
      "Studio A has a sprung floor with a vinyl top that's forgiving on knees and spins equally well in socks or trainers. Kneepads are on loan at the front desk.",
    ],
    learn: [
      "Indian step and salsa rock",
      "Six-step and threading",
      "Baby freeze to chair freeze",
      "Building a thirty-second round",
    ],
    music: "Breakbeats, funk, old-school hip-hop",
    wear: "Long sleeves, joggers, flat trainers; kneepads if you have them",
    firstClass:
      "Breaking Basics on Monday or Thursday evenings. You'll leave with a full toprock-to-freeze round.",
    image: {
      src: breakingImg,
      alt: "A b-boy in a checked shirt holding an inverted freeze on one shoulder under pink stage light",
      w: 1800,
      h: 1292,
    },
  },
  {
    slug: "vogue",
    name: "Vogue Femme",
    family: "Street & club",
    bpm: [120, 130],
    line: "Hands, catwalk, duckwalk, spins and dips — ballroom's five elements.",
    intro:
      "Vogue came out of New York's ballroom scene, built by Black and Latino queer and trans dancers. We teach the five elements of vogue femme with that history in the room, not as a footnote.",
    body: [
      "Classes rotate through the elements on a four-week cycle, so you can join on any Tuesday or Sunday and land somewhere useful.",
      "Floor performance and dips are taught progressively. You'll learn to land safely long before you learn to land loudly.",
    ],
    learn: [
      "Hand performance and framing",
      "Catwalk on the beat",
      "Duckwalk without wrecking your knees",
      "Spins, dips and a safe fall",
    ],
    music: "Ballroom beats, vogue house, the Ha crash",
    wear: "Knee pads strongly advised; socks or soft-soled shoes",
    firstClass:
      "Vogue Femme: Hands & Catwalk on Tuesday, or Level 1 on Sunday afternoon.",
    image: {
      src: vogueImg,
      alt: "A vogue dancer in black lace on the floor in a dip, head thrown back, crowd watching",
      w: 1800,
      h: 1200,
      pos: "50% 40%",
    },
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    family: "Studio technique",
    bpm: [70, 110],
    line: "Floorwork, release and the art of falling well.",
    intro:
      "Contemporary at Tempo leans on release technique: using weight, breath and the floor rather than fighting them. It's the class people take for their back and stay in for the music.",
    body: [
      "Open classes start on the floor and travel up. Technique classes on Wednesday and Saturday build longer phrases and add turns and jumps.",
      "Slow Sunday Flow is the gentlest hour on the timetable: improvisation scores, long warm-up, no mirrors facing you.",
    ],
    learn: [
      "Rolling and spiralling to the floor",
      "Weight shifts and suspension",
      "Partnering with counterbalance",
      "Improvisation scores",
    ],
    music: "Ambient, neo-classical piano, slow electronic soul",
    wear: "Bare feet or socks, clothes that cover knees for floorwork",
    firstClass:
      "Contemporary Floorwork on Monday or Thursday, or Slow Sunday Flow.",
    image: {
      src: contemporaryImg,
      alt: "Black and white photo of a dance company folding low to the floor with arms stretched up in rehearsal",
      w: 1800,
      h: 1133,
    },
    gallery: {
      src: duetImg,
      alt: "Black and white rehearsal photo of a duet, one dancer kneeling, the other in a long arabesque",
      w: 1800,
      h: 1103,
    },
  },
  {
    slug: "ballet",
    name: "Adult Ballet",
    family: "Studio technique",
    bpm: [66, 100],
    line: "Barre, centre and the French words, for grown-ups starting late.",
    intro:
      "Ballet for adults who never did it, or did it at eight and miss it. Every class is a full barre, then centre work that grows week by week.",
    body: [
      "Barre Before Work runs 7:15 to 8:00 on Monday and Wednesday: forty-five minutes of pliés and tendus that leave you upright for the rest of the day.",
      "Level 1 on Thursday and Saturday follows a twelve-week syllabus. Pick it up at any point — the barre repeats, the centre builds.",
    ],
    learn: [
      "Turnout that respects your hips",
      "Pliés, tendus, dégagés, ronds de jambe",
      "Pirouette preparation",
      "Petit allegro",
    ],
    music: "Live-recorded piano class music",
    wear: "Soft ballet slippers or socks, fitted clothes so alignment can be seen",
    firstClass:
      "Adult Ballet · Level 1 on Thursday evening or Saturday morning.",
    image: {
      src: balletImg,
      alt: "An adult student at a wooden barre extending one leg high in a warm, curtained studio",
      w: 1200,
      h: 1800,
      pos: "50% 35%",
    },
  },
  {
    slug: "jazz-funk",
    name: "Jazz Funk & Heels",
    family: "Studio technique",
    bpm: [95, 120],
    line: "Sharp lines, big attitude, optional heels.",
    intro:
      "Jazz technique — isolations, turns, clean lines — set to pop and R&B choreography. Heels classes teach the same work in a heel, with ankle conditioning baked into the warm-up.",
    body: [
      "Heels are optional in every class except Heels Choreo. Most people start in trainers and graduate to a block heel around week six.",
      "Ava films the final run-through each week so you can practise at home; the clips stay in the class group chat, never on social.",
    ],
    learn: [
      "Isolations and body rolls",
      "Jazz walks and turns",
      "Floor sequences in heels",
      "Performance and facials",
    ],
    music: "Pop, R&B, club edits of chart songs",
    wear: "Trainers or a stable block heel; knee pads for heels floorwork",
    firstClass:
      "Heels Foundations on Wednesday, or Jazz Funk Basics on Sunday.",
    image: {
      src: jazzfunkImg,
      alt: "A jazz class in heels lunging low across a dark studio floor under spotlights",
      w: 1139,
      h: 717,
    },
  },
  {
    slug: "salsa",
    name: "Salsa On1",
    family: "Partner & social",
    bpm: [160, 210],
    line: "LA-style salsa on the one, leads and follows welcome.",
    intro:
      "Salsa On1 in the linear LA style. Classes rotate partners every few minutes, so come alone — everyone does — and choose whichever role you want to learn.",
    body: [
      "Level 1 is a six-week cycle that starts on the first Monday and first Friday of each month, though you can drop in anytime.",
      "Salsa Shines on Thursday is solo footwork: no partner, all the spice, and the fastest way to get your timing clean.",
    ],
    learn: [
      "Basic step on the one",
      "Cross-body lead and inside turns",
      "Shines and solo styling",
      "Leading or following, your choice",
    ],
    music: "Salsa dura, timba, 90s romántica",
    wear: "Shoes that turn: suede soles, smooth trainers, never rubber grip",
    firstClass: "Salsa On1 · Level 1 on Monday or Friday evening.",
    image: {
      src: salsaImg,
      alt: "A woman and a man in sequined costumes performing salsa shines side by side on a curtained stage",
      w: 1800,
      h: 1285,
    },
  },
  {
    slug: "lindy",
    name: "Lindy Hop",
    family: "Partner & social",
    bpm: [120, 200],
    line: "The swing-out, the Charleston and a lot of laughing.",
    intro:
      "Lindy Hop was born in 1920s Harlem and is still the happiest dance on the timetable. Eight-count and six-count rhythms, swing-outs and a whole lot of improvising.",
    body: [
      "Lindy is a social dance first. Level 1 students are welcome at the Saturday Practice Hour from their very first week.",
      "Swing Out Weekend in December brings two guest teachers and a live band. Students get first pick of spots.",
    ],
    learn: [
      "Triple steps and rock steps",
      "The swing-out",
      "Charleston, tandem and side-by-side",
      "Social floorcraft",
    ],
    music: "Big-band swing, jump blues, modern swing bands",
    wear: "Flat shoes that slide a little; layers, it gets warm",
    firstClass:
      "Lindy Hop · Level 1 on Tuesday or Thursday, or the Saturday Taster.",
    image: {
      src: lindyImg,
      alt: "A smiling woman in a polka-dot skirt and a man in a red hat swing out at a crowded social dance",
      w: 1200,
      h: 1800,
      pos: "50% 30%",
    },
  },
];

export const styleBySlug = (slug: string) =>
  styles.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ instructors */

export type Instructor = {
  slug: string;
  name: string;
  styles: StyleSlug[];
  since: number;
  bio: string;
  plays: string;
  image: Img;
};

export const instructors: Instructor[] = [
  {
    slug: "dre",
    name: "Dre Okafor",
    styles: ["hip-hop"],
    since: 2016,
    bio: "Founded Tempo with Marisol after ten years of teaching hip-hop in school gyms. Teaches grooves with their names and the crews who made them.",
    plays: "Golden-era boom bap into new Atlanta",
    image: {
      src: dreImg,
      alt: "Dre in a silver jacket and cap, mid-groove on a stage",
      w: 800,
      h: 1000,
    },
  },
  {
    slug: "marisol",
    name: "Marisol Vega",
    styles: ["salsa"],
    since: 2016,
    bio: "Co-founder and the reason the Friday social exists. Competed in LA-style salsa for six years and teaches leading and following with equal care.",
    plays: "Salsa dura, timba on Fridays",
    image: {
      src: marisolImg,
      alt: "Marisol in a blue dress, laughing mid-turn with one arm raised",
      w: 800,
      h: 1000,
    },
  },
  {
    slug: "priya",
    name: "Priya Raman",
    styles: ["contemporary", "jazz-funk"],
    since: 2018,
    bio: "Trained in Bharatanatyam before contemporary, and it shows in her hands. Runs Slow Sunday Flow and the lunchtime classes.",
    plays: "Slow electronic soul, solo piano, a lot of rain",
    image: {
      src: priyaImg,
      alt: "Priya in a dance class, one arm raised, looking calmly ahead",
      w: 800,
      h: 1000,
    },
  },
  {
    slug: "theo",
    name: "Theo Lindqvist",
    styles: ["ballet", "contemporary"],
    since: 2019,
    bio: "Danced with a regional ballet company for eight years and now teaches adults who start late. Famous for patient corrections and terrible puns in French.",
    plays: "Class piano, then Swedish synth-pop in the cool-down",
    image: {
      src: theoImg,
      alt: "Theo in a deep lunge demonstrating a stretch while students watch",
      w: 800,
      h: 1000,
      pos: "70% 50%",
    },
  },
  {
    slug: "kenji",
    name: "Kenji “Static” Mori",
    styles: ["breaking"],
    since: 2020,
    bio: "B-boy for nineteen years, judge at regional jams, host of Cypher Sundays. Believes everyone has a freeze in them somewhere.",
    plays: "Funk breaks, 70s percussion, early hip-hop",
    image: {
      src: breakingImg,
      alt: "Kenji holding a shoulder freeze, upside down, under stage lights",
      w: 1800,
      h: 1292,
      pos: "45% 50%",
    },
  },
  {
    slug: "ava",
    name: "Ava St. Clair",
    styles: ["vogue", "jazz-funk"],
    since: 2021,
    bio: "Mother of a ballroom house and a heels teacher with a background in jazz. Teaches vogue's history alongside every dip.",
    plays: "Ballroom beats, vogue house, pop divas",
    image: {
      src: vogueImg,
      alt: "Ava in black lace, finishing a dip on the floor",
      w: 1800,
      h: 1200,
      pos: "52% 35%",
    },
  },
  {
    slug: "juno",
    name: "Juno Hart",
    styles: ["lindy"],
    since: 2022,
    bio: "Learned Lindy Hop at a swing exchange and never left the floor. Organises Swing Out Weekend and DJs the Saturday practice.",
    plays: "Big-band swing and a live-band bootleg or two",
    image: {
      src: lindyImg,
      alt: "Juno in a polka-dot skirt, mid swing-out with a partner",
      w: 1200,
      h: 1800,
      pos: "35% 25%",
    },
  },
];

export const instructorBySlug = (slug: string) =>
  instructors.find((i) => i.slug === slug);

/* ------------------------------------------------------------------ timetable */

export const studios = {
  A: "Studio A — the big room, sprung floor, 140 m²",
  B: "Studio B — mirrors and barres, 90 m²",
  C: "Studio C — partner room, 110 m²",
} as const;

export type StudioId = keyof typeof studios;
export type Level = "Beginner" | "Open level" | "Intermediate";
export const levels: Level[] = ["Beginner", "Open level", "Intermediate"];
export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type DanceClass = {
  id: string;
  day: number; // 0 = Monday
  start: string; // "18:30"
  mins: number;
  style: StyleSlug;
  title: string;
  level: Level;
  teacher: string;
  studio: StudioId;
  spotsLeft: number;
};

type Row = [
  number,
  string,
  number,
  StyleSlug,
  string,
  Level,
  string,
  StudioId,
  number,
];

const rows: Row[] = [
  [0, "07:15", 45, "ballet", "Barre Before Work", "Open level", "theo", "B", 6],
  [0, "18:00", 60, "hip-hop", "Hip-hop Foundations", "Beginner", "dre", "A", 4],
  [
    0,
    "18:30",
    75,
    "contemporary",
    "Contemporary Floorwork",
    "Open level",
    "priya",
    "B",
    9,
  ],
  [
    0,
    "19:15",
    60,
    "salsa",
    "Salsa On1 · Level 1",
    "Beginner",
    "marisol",
    "C",
    11,
  ],
  [
    0,
    "19:45",
    75,
    "jazz-funk",
    "Jazz Funk Choreo",
    "Intermediate",
    "ava",
    "B",
    2,
  ],
  [0, "20:15", 60, "breaking", "Breaking Basics", "Beginner", "kenji", "A", 8],
  [
    1,
    "12:30",
    45,
    "contemporary",
    "Lunchtime Release",
    "Open level",
    "priya",
    "B",
    12,
  ],
  [1, "18:00", 60, "lindy", "Lindy Hop · Level 1", "Beginner", "juno", "C", 7],
  [
    1,
    "18:30",
    60,
    "vogue",
    "Vogue Femme: Hands & Catwalk",
    "Beginner",
    "ava",
    "A",
    5,
  ],
  [
    1,
    "19:15",
    60,
    "lindy",
    "Lindy Hop · Level 2",
    "Intermediate",
    "juno",
    "C",
    3,
  ],
  [
    1,
    "19:45",
    75,
    "hip-hop",
    "Hip-hop Choreo Lab",
    "Intermediate",
    "dre",
    "A",
    0,
  ],
  [
    1,
    "20:00",
    75,
    "ballet",
    "Adult Ballet · Centre",
    "Intermediate",
    "theo",
    "B",
    6,
  ],
  [
    2,
    "07:15",
    45,
    "ballet",
    "Barre Before Work",
    "Open level",
    "theo",
    "B",
    10,
  ],
  [2, "18:00", 60, "jazz-funk", "Heels Foundations", "Beginner", "ava", "B", 3],
  [
    2,
    "18:30",
    75,
    "breaking",
    "Toprock & Footwork",
    "Intermediate",
    "kenji",
    "A",
    9,
  ],
  [
    2,
    "19:15",
    75,
    "contemporary",
    "Contemporary Technique",
    "Intermediate",
    "priya",
    "B",
    7,
  ],
  [
    2,
    "19:30",
    60,
    "salsa",
    "Salsa On1 · Level 2",
    "Intermediate",
    "marisol",
    "C",
    6,
  ],
  [2, "20:00", 60, "hip-hop", "Hip-hop Foundations", "Beginner", "dre", "A", 1],
  [3, "12:30", 45, "jazz-funk", "Lunch Groove", "Open level", "priya", "B", 14],
  [
    3,
    "18:00",
    60,
    "ballet",
    "Adult Ballet · Level 1",
    "Beginner",
    "theo",
    "B",
    5,
  ],
  [3, "18:30", 60, "lindy", "Lindy Hop · Level 1", "Beginner", "juno", "C", 9],
  [3, "19:00", 75, "vogue", "Duckwalk & Dips", "Intermediate", "ava", "A", 4],
  [
    3,
    "19:15",
    75,
    "contemporary",
    "Contemporary Floorwork",
    "Open level",
    "priya",
    "B",
    2,
  ],
  [3, "19:45", 60, "salsa", "Salsa Shines", "Open level", "marisol", "C", 10],
  [3, "20:30", 60, "breaking", "Breaking Basics", "Beginner", "kenji", "A", 12],
  [4, "18:00", 60, "hip-hop", "Friday Freestyle", "Open level", "dre", "A", 15],
  [
    4,
    "18:00",
    60,
    "salsa",
    "Salsa On1 · Level 1",
    "Beginner",
    "marisol",
    "C",
    8,
  ],
  [4, "19:15", 60, "jazz-funk", "Heels Choreo", "Intermediate", "ava", "B", 0],
  [
    5,
    "10:00",
    75,
    "ballet",
    "Adult Ballet · Level 1",
    "Beginner",
    "theo",
    "B",
    3,
  ],
  [5, "10:30", 60, "hip-hop", "Hip-hop Foundations", "Beginner", "dre", "A", 6],
  [
    5,
    "11:45",
    90,
    "breaking",
    "Power & Freezes",
    "Intermediate",
    "kenji",
    "A",
    7,
  ],
  [
    5,
    "12:00",
    75,
    "contemporary",
    "Contemporary Technique",
    "Open level",
    "priya",
    "B",
    8,
  ],
  [5, "13:00", 60, "lindy", "Lindy Hop Taster", "Beginner", "juno", "C", 13],
  [
    5,
    "14:30",
    60,
    "lindy",
    "Lindy Practice Hour",
    "Open level",
    "juno",
    "C",
    20,
  ],
  [
    6,
    "11:30",
    60,
    "contemporary",
    "Slow Sunday Flow",
    "Open level",
    "priya",
    "B",
    9,
  ],
  [6, "13:00", 75, "vogue", "Vogue Femme · Level 1", "Beginner", "ava", "A", 6],
  [
    6,
    "14:00",
    60,
    "jazz-funk",
    "Jazz Funk Basics",
    "Beginner",
    "priya",
    "B",
    11,
  ],
  [
    6,
    "15:30",
    60,
    "salsa",
    "Salsa Social Prep",
    "Open level",
    "marisol",
    "C",
    12,
  ],
];

export const classes: DanceClass[] = rows.map(
  ([day, start, mins, style, title, level, teacher, studio, spotsLeft]) => ({
    id: `${["mon", "tue", "wed", "thu", "fri", "sat", "sun"][day]}-${start.replace(":", "")}-${style}`,
    day,
    start,
    mins,
    style,
    title,
    level,
    teacher,
    studio,
    spotsLeft,
  }),
);

/* ------------------------------------------------------------------ passes */

export type Pass = {
  id: string;
  name: string;
  price: number;
  committed?: number; // monthly price on a 6-month commitment
  unit: "once" | "class" | "card" | "month";
  perClass?: number;
  perWeek?: number; // membership cap
  line: string;
  includes: string[];
};

export const trialPrice = 15;

export const passes: Pass[] = [
  {
    id: "drop-in",
    name: "Drop-in",
    price: 24,
    unit: "class",
    perClass: 24,
    line: "One class, any style, any level. Book up to seven days ahead.",
    includes: [
      "Any class on the timetable",
      "Cancel free up to 4 hours before",
    ],
  },
  {
    id: "five",
    name: "5-class card",
    price: 110,
    unit: "card",
    perClass: 22,
    line: "Five classes to use within six weeks. Shareable with one friend.",
    includes: [
      "Valid 6 weeks from first class",
      "Share with one named friend",
      "Cancel free up to 4 hours before",
    ],
  },
  {
    id: "ten",
    name: "10-class card",
    price: 200,
    unit: "card",
    perClass: 20,
    line: "Ten classes over three months, for weeks that never look the same.",
    includes: [
      "Valid 3 months from first class",
      "One 2-week freeze",
      "Share with one named friend",
    ],
  },
  {
    id: "twice",
    name: "Two a week",
    price: 129,
    committed: 115,
    unit: "month",
    perWeek: 2,
    line: "Two classes every week, the same two or different ones.",
    includes: [
      "Book 14 days ahead",
      "Half-price Friday Socials",
      "Freeze up to 2 months a year",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 179,
    committed: 159,
    unit: "month",
    line: "Every class, every social, priority on workshops.",
    includes: [
      "Book 21 days ahead",
      "Free Friday Socials",
      "Priority on workshop spots",
      "Freeze up to 2 months a year",
    ],
  },
];

export const passNotes = [
  "Students, over-65s and anyone on a low income pay 20% less on memberships — just ask at the desk, no paperwork interrogation.",
  "Memberships roll monthly and cancel with 30 days' notice. Six-month commitments lock in the lower price.",
];

/* ------------------------------------------------------------------ events */

export type EventKind =
  "Social" | "Jam & battle" | "Workshop" | "Showcase" | "Open day";

export type StudioEvent = {
  slug: string;
  title: string;
  kind: EventKind;
  date: string; // ISO yyyy-mm-dd
  endDate?: string;
  time: string;
  price: string;
  styles: StyleSlug[];
  summary: string;
  body: string[];
  runOfNight: { time: string; what: string }[];
  bring: string;
  capacity: number;
  image: Img;
};

export const eventKinds: EventKind[] = [
  "Social",
  "Jam & battle",
  "Workshop",
  "Showcase",
  "Open day",
];

export const events: StudioEvent[] = [
  {
    slug: "friday-social-soul-house",
    title: "Friday Social: Soul & House",
    kind: "Social",
    date: "2026-10-30",
    time: "9:00 pm – 1:00 am",
    price: "$12 · free on Unlimited",
    styles: ["salsa", "hip-hop", "lindy"],
    summary:
      "The lights go down in Studio A and the whole school dances together. Two DJs, one room, no choreography.",
    body: [
      "Our monthly social is where classes turn into dancing. Marisol opens with a forty-minute salsa set, Dre takes over with soul and house, and the last hour is requests.",
      "There is a short drop-in lesson at 9:00 for anyone who has never been to a social — it's ten minutes on how to ask, how to say no, and how to leave the floor gracefully.",
    ],
    runOfNight: [
      { time: "9:00", what: "Ten-minute social floorcraft lesson" },
      { time: "9:15", what: "Salsa set — DJ Marisol" },
      { time: "10:00", what: "Soul, disco and house — DJ Dre" },
      { time: "12:00", what: "Requests until close" },
    ],
    bring: "Water bottle, a change of shirt, shoes that turn",
    capacity: 140,
    image: {
      src: socialImg,
      alt: "Dozens of couples dancing on a stone floor at night, seen from above with long shadows",
      w: 1600,
      h: 1067,
    },
  },
  {
    slug: "cypher-sundays-14",
    title: "Cypher Sundays Vol. 14",
    kind: "Jam & battle",
    date: "2026-11-08",
    time: "3:00 pm – 8:00 pm",
    price: "$10 dancers · $5 to watch",
    styles: ["breaking", "hip-hop"],
    summary:
      "Open cyphers all afternoon, then a 2-vs-2 breaking battle judged by three b-boys and b-girls from out of town.",
    body: [
      "Cypher Sundays is a jam first and a battle second. The circle stays open until 6:00 for anyone — Breaking Basics students included — then sixteen crews of two battle in brackets.",
      "Kenji hosts, DJ Grit plays breaks, and the winning pair takes home the Tempo belt and a month of Unlimited each.",
    ],
    runOfNight: [
      { time: "3:00", what: "Open cyphers, all levels" },
      { time: "5:30", what: "Battle sign-up closes" },
      { time: "6:00", what: "2-vs-2 preliminaries" },
      { time: "7:30", what: "Final and the belt" },
    ],
    bring: "Kneepads, a towel, a crew-mate if you're battling",
    capacity: 160,
    image: {
      src: cypherImg,
      alt: "A b-boy mid-flip inside a ring of spectators at a night-time jam",
      w: 1024,
      h: 768,
    },
  },
  {
    slug: "tempo-kiki-ball",
    title: "The Tempo Kiki Ball",
    kind: "Showcase",
    date: "2026-11-21",
    time: "8:00 pm – 11:30 pm",
    price: "$18 · walkers free",
    styles: ["vogue"],
    summary:
      "A kiki ball with five categories, three judges and a commentator, open to every vogue student at Tempo and beyond.",
    body: [
      "Kiki balls are the welcoming side of the ballroom scene: a place to walk your first category with your house cheering. Ava and her house host, with judges from the regional scene.",
      "Categories this year: Vogue Femme Beginners, Runway, Hands Performance, Best Dressed (theme: chrome), and Open-to-All Face.",
    ],
    runOfNight: [
      { time: "8:00", what: "Doors and sign-in for walkers" },
      { time: "8:45", what: "Grand march" },
      { time: "9:00", what: "Categories, beginners first" },
      { time: "11:00", what: "Grand prize and the after-dance" },
    ],
    bring: "Your look, knee pads, people who will scream for you",
    capacity: 120,
    image: {
      src: vogueImg,
      alt: "A vogue dancer finishing a dip on the floor with the crowd close around",
      w: 1800,
      h: 1200,
    },
  },
  {
    slug: "swing-out-weekend",
    title: "Swing Out Weekend",
    kind: "Workshop",
    date: "2026-12-05",
    endDate: "2026-12-06",
    time: "Sat 10:00 am – Sun 6:00 pm",
    price: "$95 full pass · $55 one day",
    styles: ["lindy"],
    summary:
      "Two days of Lindy Hop workshops with two guest teachers, plus a Saturday night dance with a seven-piece live band.",
    body: [
      "Workshops run in two tracks: Level 1–2 and Level 3+. You'll be placed by a short audition on Saturday morning — it takes four minutes and it is not scary.",
      "The Saturday night dance with the Foundry Street Seven is included in the full pass and open to the public for $20 at the door.",
    ],
    runOfNight: [
      { time: "Sat 10:00", what: "Track placement and warm-up" },
      { time: "Sat 11:00", what: "Workshops: swing-out variations" },
      { time: "Sat 8:00 pm", what: "Live band dance" },
      { time: "Sun 11:00", what: "Workshops: Charleston and tandem" },
    ],
    bring: "Two pairs of shoes, a water bottle, a packed lunch",
    capacity: 90,
    image: {
      src: exchangeImg,
      alt: "A Lindy Hop couple dancing in the middle of a seated crowd at a swing festival",
      w: 1800,
      h: 1200,
    },
  },
  {
    slug: "winter-showcase",
    title: "Winter Showcase",
    kind: "Showcase",
    date: "2026-12-12",
    endDate: "2026-12-13",
    time: "7:00 pm, both nights",
    price: "$20 · $12 for kids",
    styles: ["hip-hop", "contemporary", "jazz-funk", "salsa"],
    summary:
      "Fourteen pieces made in class this term, performed by students on a borrowed stage across town.",
    body: [
      "Every eight-week choreography class can opt in. Most performers have never been on a stage before; that's rather the point.",
      "The show runs ninety minutes with an interval. Tickets go to students' friends and families first, then on general sale from 20 November.",
    ],
    runOfNight: [
      { time: "6:15", what: "Doors and bar" },
      { time: "7:00", what: "Act one: seven pieces" },
      { time: "7:45", what: "Interval" },
      { time: "8:05", what: "Act two and the full-company finale" },
    ],
    bring: "Flowers for your favourite dancer",
    capacity: 380,
    image: {
      src: hiphopImg,
      alt: "A hip-hop crew performing on stage under pink and violet light",
      w: 1800,
      h: 1200,
    },
  },
  {
    slug: "new-year-open-house",
    title: "New Year Open House",
    kind: "Open day",
    date: "2027-01-10",
    time: "11:00 am – 5:00 pm",
    price: "Free",
    styles: [
      "hip-hop",
      "breaking",
      "vogue",
      "contemporary",
      "ballet",
      "jazz-funk",
      "salsa",
      "lindy",
    ],
    summary:
      "Twelve free thirty-minute taster classes across every style, three rooms, one afternoon. Try five, pick one.",
    body: [
      "The easiest way in. Tasters run back to back in all three studios with every instructor teaching, so you can move from salsa to breaking to ballet without leaving the building.",
      "Anyone who joins on the day gets their first month at the six-month price with no commitment.",
    ],
    runOfNight: [
      { time: "11:00", what: "Tasters begin in all three studios" },
      { time: "1:00", what: "Lunch and a short instructor Q&A" },
      { time: "2:00", what: "Afternoon tasters" },
      { time: "4:30", what: "Open floor and timetable advice" },
    ],
    bring: "Comfortable clothes, curiosity, a friend",
    capacity: 200,
    image: {
      src: classImg,
      alt: "A large adult dance class in a bright studio, arms sweeping overhead",
      w: 1800,
      h: 1200,
    },
  },
];

export const eventBySlug = (slug: string) =>
  events.find((e) => e.slug === slug);

/* ------------------------------------------------------------------ pages */

export const home = {
  title: "Make your move.",
  intro:
    "Tempo is a dance studio on Foundry Street with eight styles, three rooms and a beginner class in every one of them. Come alone, come late to dancing, come as you are.",
  hero: {
    src: classImg,
    alt: "A packed adult dance class in a bright studio, everyone sweeping their arms overhead together",
    w: 1800,
    h: 1200,
  } as Img,
  band: ["No perfect moves", "Just yours", "No front row", "Come as you are"],
  firstClass: {
    title: "Your first class, minute by minute",
    steps: [
      {
        time: "6:40",
        title: "Walk in",
        text: "Say hi at the desk. Your waiver is already signed from the booking, so it's just a name and a wristband.",
      },
      {
        time: "6:45",
        title: "Shoes off, or on",
        text: "Lockers are free and take a padlock or a coin. Each style page tells you what to wear on your feet.",
      },
      {
        time: "6:50",
        title: "Find a spot",
        text: "Anywhere. There is no front row at Tempo — we rotate lines every few songs, so nobody's stuck behind anyone.",
      },
      {
        time: "7:00",
        title: "Dance",
        text: "Ten minutes of warm-up, forty of learning, ten of putting it to music. You'll be lost for a bit. Everyone is.",
      },
      {
        time: "8:00",
        title: "Stay or go",
        text: "Most nights someone is practising in Studio C after the last class. You're welcome to join them.",
      },
    ],
  },
  quote: {
    text: "I signed up for one salsa trial in a bad week in February. I now own three pairs of dance shoes and a group chat called ‘Monday people’.",
    who: "Hannah, Salsa Level 2",
  },
  close: {
    title: "First class $15. Bring water.",
    text: "Pick any beginner or open-level class, any style. If it isn't for you, try another style before you decide — the second trial is on us.",
  },
};

export const about = {
  title: "A studio for people who were told they can't dance.",
  intro:
    "Tempo opened in 2016 in a former print works on Foundry Street. Dre and Marisol had spent years teaching in school gyms and church halls and wanted a room where adults could start from nothing without feeling watched.",
  story: [
    "The first year we had one studio, one sound system and a timetable of nine classes. Most of our students had never taken a dance class; a lot of them had been told, at some point, that they weren't a dancer. We think that's the most wrong thing anyone can say to anyone.",
    "Today there are three rooms, seven instructors and forty-odd classes a week. The rule hasn't changed: every style has a beginner class, every class rotates the lines, and nobody gets judged for the first move they make.",
  ],
  principles: [
    {
      title: "No front row",
      text: "Lines rotate every few songs. The best dancer in the room and the newest one spend the same time at the mirror.",
    },
    {
      title: "The history comes with the steps",
      text: "Every style we teach came from somewhere and someone. We name them, and we pay guest teachers from those scenes properly.",
    },
    {
      title: "Floors before fit-outs",
      text: "Sprung floors in every studio, a real sound system and air that moves. The lobby is a bench and a kettle.",
    },
    {
      title: "Small enough to know your name",
      text: "Classes cap at 30 in the big room and 22 in the small one. If you miss three weeks, someone will text to check you're alright.",
    },
  ],
  space: {
    src: studioImg,
    alt: "A warm wooden dance studio with tall windows, students practising across the floor",
    w: 1800,
    h: 1350,
  } as Img,
  rooms: [
    {
      name: "Studio A",
      text: "The big room: 140 m² of sprung floor, a club-grade sound rig and blackout blinds for the Friday social.",
    },
    {
      name: "Studio B",
      text: "Mirrors on one wall, barres on two, natural light and a piano for ballet mornings.",
    },
    {
      name: "Studio C",
      text: "The partner room, with a slightly slicker floor for turns and a bench for changing shoes.",
    },
  ],
  careers:
    "We hire instructors twice a year and front desk staff whenever someone leaves for drama school. Send a showreel or a CV to",
};

export const trialFaq = [
  {
    q: "I've never danced. Is that really fine?",
    a: "Every style has at least one class marked Beginner, built for exactly you. Open-level classes work too — teachers give an easier and a harder version of every move.",
  },
  {
    q: "What if I hate it?",
    a: "Book a second trial in a different style, free. If that's not for you either, we'll refund the $15 — no questionnaire.",
  },
  {
    q: "Can I bring a friend?",
    a: "Yes, and they get the $15 trial too. Book them separately so they get their own waiver and reminder.",
  },
];

export const passFaq = [
  {
    q: "Do I need a partner for salsa or Lindy Hop?",
    a: "No. Classes rotate partners every few minutes and most people come alone. Pick whichever role you'd like to learn; plenty of people learn both.",
  },
  {
    q: "How far ahead can I book?",
    a: "Seven days on drop-ins and cards, fourteen on Two a week and twenty-one on Unlimited. Beginner classes keep five spots for trials until the day before.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Cancel up to four hours before and the class goes back on your card or membership. Inside four hours it counts as used, unless you're ill — just tell us.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Up to two months a year, in one-week steps, for any reason. Injuries and parental leave don't count towards the two months.",
  },
  {
    q: "Do class cards expire?",
    a: "Five-class cards last six weeks from your first class, ten-class cards three months. We'll extend once if life gets in the way.",
  },
  {
    q: "Is there a joining fee?",
    a: "No. There's no joining fee, no annual fee and no fee to cancel.",
  },
];

export const notFound = {
  title: "Missed the beat.",
  text: "That page isn't on the timetable. It may have moved, or the link had a typo.",
};
