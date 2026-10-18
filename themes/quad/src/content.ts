import hero from "./assets/hero.jpg";
import arches from "./assets/arches.jpg";
import cloister from "./assets/cloister.jpg";
import redBook from "./assets/red-book.jpg";
import stacks from "./assets/stacks.jpg";
import lecture from "./assets/lecture.jpg";
import glassware from "./assets/glassware.jpg";
import robotics from "./assets/robotics.jpg";
import pipette from "./assets/pipette.jpg";
import seminar from "./assets/seminar.jpg";
import studyGroup from "./assets/study-group.jpg";
import graduation from "./assets/graduation.jpg";
import orchestra from "./assets/orchestra.jpg";
import talk from "./assets/talk.jpg";
import readingRoom from "./assets/reading-room.jpg";
import microscope from "./assets/microscope.jpg";

export type Img = { src: string; alt: string; w: number; h: number };
export type NavLink = { to: string; label: string };

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Quadwell",
  full: "Quadwell University",
  city: "Harrowmere",
  founded: 1891,
  tagline: "Learning in the open since 1891, around one lawn in Harrowmere.",
  email: "admissions@quadwell.example",
  enquiries: "hello@quadwell.example",
  phone: "+1 555 0191 400",
  phoneHref: "tel:+15550191400",
  address: [
    "Quadwell University",
    "Old Quad, Cloister Lane",
    "Harrowmere HM1 4QW",
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const nav: NavLink[] = [
  { to: "/programmes", label: "Programmes" },
  { to: "/admissions", label: "Admissions" },
  { to: "/campus-life", label: "Campus life" },
  { to: "/research", label: "Research" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Study",
    links: [
      { to: "/programmes", label: "Programme finder" },
      { to: "/admissions", label: "Admissions & fees" },
      { to: "/apply", label: "Apply for 2027" },
    ],
  },
  {
    title: "University",
    links: [
      { to: "/campus-life", label: "Campus life" },
      { to: "/research", label: "Research" },
      { to: "/events", label: "Events & open days" },
      { to: "/about", label: "About Quadwell" },
    ],
  },
];

export const newsletter = {
  title: "The prospectus, by post or inbox",
  text: "One email a month from Admissions: open days, deadlines and a student's week in their own words.",
};

/* ------------------------------------------------------------------ images */

export const images = {
  hero: {
    src: hero,
    alt: "The Old Quad on a clear morning: sandstone cloisters, a young lime tree and the Bell Tower beyond",
    w: 1680,
    h: 1120,
  },
  arches: {
    src: arches,
    alt: "Red-brick gatehouse with a Gothic arch opening onto the quad",
    w: 1024,
    h: 768,
  },
  cloister: {
    src: cloister,
    alt: "Black-and-white photograph of the cloister walk, stone columns in long perspective",
    w: 893,
    h: 1200,
  },
  redBook: {
    src: redBook,
    alt: "Hands holding open a small red clothbound book",
    w: 1200,
    h: 800,
  },
  stacks: {
    src: stacks,
    alt: "A student walking between tall library shelves full of coloured spines",
    w: 1600,
    h: 1066,
  },
  lecture: {
    src: lecture,
    alt: "A raked lecture theatre seen from the back row, a slide projected at the front",
    w: 1600,
    h: 1200,
  },
  glassware: {
    src: glassware,
    alt: "Clean laboratory glassware on a white bench",
    w: 1600,
    h: 1066,
  },
  robotics: {
    src: robotics,
    alt: "A researcher at a laptop beside an aluminium-framed robotics rig",
    w: 1400,
    h: 933,
  },
  pipette: {
    src: pipette,
    alt: "A pipette dispensing pink liquid into a tray of sample tubes",
    w: 1600,
    h: 1066,
  },
  seminar: {
    src: seminar,
    alt: "Students around a seminar table, one standing with a folder and a laugh",
    w: 1600,
    h: 1066,
  },
  studyGroup: {
    src: studyGroup,
    alt: "Three students sharing a table, laptops open, mid-conversation",
    w: 1600,
    h: 1066,
  },
  graduation: {
    src: graduation,
    alt: "Graduates in gowns throwing their caps into an evening sky",
    w: 1600,
    h: 1066,
  },
  orchestra: {
    src: orchestra,
    alt: "Violinists of the university orchestra in warm stage light",
    w: 1600,
    h: 1067,
  },
  talk: {
    src: talk,
    alt: "A speaker addressing a packed, raked auditorium",
    w: 1600,
    h: 1066,
  },
  readingRoom: {
    src: readingRoom,
    alt: "The glass-walled reading room of the Fenwick Library, trees outside",
    w: 1400,
    h: 1050,
  },
  microscope: {
    src: microscope,
    alt: "A scientist in a white coat at a microscope in a bright laboratory",
    w: 1066,
    h: 1600,
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ faculties */

export type FacultyId = "arts" | "science" | "social" | "health";

export type Faculty = {
  id: FacultyId;
  name: string;
  blurb: string;
  image: Img;
};

export const faculties: Faculty[] = [
  {
    id: "arts",
    name: "Arts & Humanities",
    blurb:
      "History, literature and heritage taught a short walk from the city archive and the Fenwick Library's 1.4 million volumes.",
    image: images.stacks,
  },
  {
    id: "science",
    name: "Science & Engineering",
    blurb:
      "Physics, engineering and data science in the Lister Building and the riverside Foundry Labs.",
    image: images.robotics,
  },
  {
    id: "social",
    name: "Social Sciences & Law",
    blurb:
      "Law, psychology and policy, with a teaching courtroom and a behavioural lab open to undergraduates.",
    image: images.seminar,
  },
  {
    id: "health",
    name: "Health & Life Sciences",
    blurb:
      "Biomedical science and public health, taught alongside Harrowmere Royal Infirmary across the road.",
    image: images.pipette,
  },
];

/* ------------------------------------------------------------------ programmes */

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export const hours = [9, 11, 14, 16] as const;
export type Day = (typeof days)[number];
export type Hour = (typeof hours)[number];
export type Slot = { day: Day; hour: Hour };

export type Module = {
  code: string;
  title: string;
  credits: number;
  core: boolean;
  slots: Slot[];
};
export type Year = { label: string; modules: Module[] };

/** Each slot is a two-hour block. "Mon 9, Thu 14" → Monday 9–11 and Thursday 14–16. */
function mod(
  code: string,
  title: string,
  credits: number,
  slots: string,
  core = false,
): Module {
  return {
    code,
    title,
    credits,
    core,
    slots: slots.split(",").map((s) => {
      const [day, hour] = s.trim().split(" ");
      return { day: day as Day, hour: Number(hour) as Hour };
    }),
  };
}

export type Level = "Undergraduate" | "Postgraduate";

export type Programme = {
  id: string;
  title: string;
  award: string;
  code: string;
  level: Level;
  faculty: FacultyId;
  years: number;
  modes: ("Full-time" | "Part-time")[];
  start: string;
  entry: string;
  /** Lower is harder to get into; drives the "entry requirements" sort. */
  entryRank: number;
  fees: { home: number; international: number };
  summary: string;
  overview: string[];
  highlights: string[];
  teaching: { label: string; hours: number }[];
  assessment: { label: string; share: number }[];
  careers: string[];
  image: Img;
  plan: Year[];
};

export const programmes: Programme[] = [
  {
    id: "history",
    title: "History",
    award: "BA (Hons)",
    code: "V100",
    level: "Undergraduate",
    faculty: "arts",
    years: 3,
    modes: ["Full-time", "Part-time"],
    start: "September 2027",
    entry: "AAB at A level · 35 IB",
    entryRank: 3,
    fees: { home: 9535, international: 23400 },
    summary:
      "Three thousand years of the past, read from the documents up — with the Harrowmere city archive as your second library.",
    overview: [
      "You begin with the big structures — the medieval world, the age of revolutions — and a first-year module that puts original sources in your hands in week three. By the final year you are choosing between special subjects taught by the people writing the books on them.",
      "Seminars stay at twelve students. Every second-year historian joins a group research project built on uncatalogued material in the city archive, and the best of them are published in the department's annual Harrowmere Papers.",
    ],
    highlights: [
      "Seminars capped at 12",
      "Archive placement in Year 2",
      "Optional semester in Leiden or Kyoto",
    ],
    teaching: [
      { label: "Lectures", hours: 4 },
      { label: "Seminars", hours: 4 },
      { label: "Archive & study", hours: 27 },
    ],
    assessment: [
      { label: "Essays & projects", share: 70 },
      { label: "Exams", share: 20 },
      { label: "Presentations", share: 10 },
    ],
    careers: [
      "Archivist or curator",
      "Civil service fast stream",
      "Publishing and journalism",
      "Law conversion",
    ],
    image: images.stacks,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod(
            "HIS1001",
            "Making the Medieval World",
            30,
            "Mon 9, Wed 11",
            true,
          ),
          mod("HIS1002", "Revolutions, 1750–1850", 30, "Tue 11, Thu 9", true),
          mod(
            "HIS1003",
            "Doing History: Sources and Archives",
            30,
            "Fri 11",
            true,
          ),
          mod(
            "HIS1010",
            "The Harrowmere Docks: A City and Its River",
            15,
            "Mon 14",
          ),
          mod("HIS1011", "Empires of the Silk Roads", 15, "Wed 14"),
          mod("HIS1012", "Latin for Historians", 15, "Mon 14"),
          mod("HIS1013", "Myth and Memory in Ancient Greece", 15, "Thu 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod(
            "HIS2001",
            "Historiography: How We Write the Past",
            30,
            "Mon 11, Thu 11",
            true,
          ),
          mod("HIS2002", "Group Research Project", 30, "Fri 9", true),
          mod("HIS2010", "The Cold War in Everyday Life", 30, "Tue 9, Wed 14"),
          mod("HIS2011", "Women, Work and the Mill Towns", 15, "Mon 14"),
          mod("HIS2012", "Medieval Pilgrimage", 15, "Tue 14"),
          mod(
            "HIS2013",
            "Atlantic Slavery and Its Afterlives",
            30,
            "Wed 9, Thu 14",
          ),
          mod("HIS2014", "Digital History: Maps and Data", 15, "Tue 14"),
          mod("HIS2015", "Placement: Harrowmere City Archive", 15, "Fri 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("HIS3001", "Dissertation", 30, "Fri 11", true),
          mod(
            "HIS3010",
            "Special Subject: The Plague Year, 1348",
            30,
            "Mon 9, Wed 9",
          ),
          mod(
            "HIS3011",
            "Special Subject: Partition, 1947",
            30,
            "Mon 9, Wed 9",
          ),
          mod("HIS3012", "Sound and Protest: Music in the 1960s", 15, "Tue 14"),
          mod("HIS3013", "Public History and the Museum", 15, "Thu 11"),
          mod("HIS3014", "The Victorian Asylum", 30, "Tue 9, Thu 14"),
          mod("HIS3015", "Food and Famine", 15, "Mon 14"),
          mod("HIS3016", "Teaching History in Schools", 15, "Thu 11"),
        ],
      },
    ],
  },
  {
    id: "english-creative-writing",
    title: "English Literature & Creative Writing",
    award: "BA (Hons)",
    code: "Q3W8",
    level: "Undergraduate",
    faculty: "arts",
    years: 3,
    modes: ["Full-time"],
    start: "September 2027",
    entry: "AAB at A level · 35 IB",
    entryRank: 3,
    fees: { home: 9535, international: 23400 },
    summary:
      "Read like a critic, write like a working author: half the degree in seminar, half in the workshop.",
    overview: [
      "Every term pairs a reading module with a writing workshop, so the novel you study in October shapes the story you draft in November. Workshops run at ten students and are led by published poets, novelists and screenwriters.",
      "In the final year you write a 12,000-word portfolio — a novella, a poetry collection or a screenplay — and read from it at the Quadwell Writers' Night in the Great Hall.",
    ],
    highlights: [
      "Workshops of 10",
      "Visiting writer every term",
      "Final-year public reading",
    ],
    teaching: [
      { label: "Lectures", hours: 3 },
      { label: "Seminars & workshops", hours: 6 },
      { label: "Reading & writing", hours: 26 },
    ],
    assessment: [
      { label: "Creative portfolios", share: 50 },
      { label: "Critical essays", share: 40 },
      { label: "Exams", share: 10 },
    ],
    careers: [
      "Publishing and editing",
      "Copywriting and content",
      "Teaching",
      "Arts administration",
    ],
    image: images.redBook,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod("ENG1001", "Reading Poetry Closely", 30, "Mon 11, Thu 11", true),
          mod(
            "ENG1002",
            "The Novel from Defoe to Woolf",
            30,
            "Tue 9, Fri 9",
            true,
          ),
          mod("CWR1001", "Workshop I: Short Fiction", 30, "Wed 14", true),
          mod("ENG1010", "Shakespeare in Performance", 15, "Mon 14"),
          mod("ENG1011", "Writing the City", 15, "Thu 14"),
          mod("ENG1012", "Introduction to Old English", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod("CWR2001", "Workshop II: Poetry and Form", 30, "Wed 11", true),
          mod("ENG2001", "Theory for Readers", 15, "Mon 9", true),
          mod("ENG2010", "Gothic and the Uncanny", 30, "Tue 14, Thu 9"),
          mod("ENG2011", "Postcolonial Fictions", 30, "Tue 14, Thu 9"),
          mod("ENG2012", "Romantic Revolutions", 15, "Fri 11"),
          mod("CWR2010", "Writing for Radio", 15, "Mon 14"),
          mod("CWR2011", "Translation Workshop", 15, "Fri 11"),
          mod("ENG2013", "Children's Literature", 30, "Wed 14, Fri 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("CWR3001", "Creative Portfolio", 30, "Wed 11", true),
          mod(
            "ENG3010",
            "Modernism and the Little Magazine",
            30,
            "Mon 9, Thu 9",
          ),
          mod("ENG3011", "Contemporary British Poetry", 15, "Tue 11"),
          mod("CWR3010", "Screenwriting", 30, "Mon 9, Thu 9"),
          mod("ENG3012", "Literature and Medicine", 15, "Fri 14"),
          mod("CWR3011", "Editing and Small-Press Publishing", 15, "Tue 11"),
          mod("ENG3013", "Dissertation in Criticism", 30, "Thu 14"),
        ],
      },
    ],
  },
  {
    id: "physics-astrophysics",
    title: "Physics with Astrophysics",
    award: "BSc (Hons)",
    code: "F3F5",
    level: "Undergraduate",
    faculty: "science",
    years: 3,
    modes: ["Full-time"],
    start: "September 2027",
    entry: "A*AA incl. Physics and Maths · 38 IB",
    entryRank: 1,
    fees: { home: 9535, international: 28900 },
    summary:
      "Core physics with a telescope on the roof: observing nights from your first term at the Ashgrove Observatory.",
    overview: [
      "The first two years build the physics every physicist needs — mechanics, electromagnetism, quantum mechanics, thermodynamics — with astrophysics woven through as the worked example. Labs run weekly, and the Ashgrove Observatory's 0.6-metre telescope is booked for students one night in four.",
      "Your final-year project joins one of the department's live research groups: exoplanet transit photometry, galaxy dynamics, or the Centre for Quantum Materials downstairs.",
    ],
    highlights: [
      "Rooftop observatory",
      "Weekly labs from week one",
      "Project in a live research group",
    ],
    teaching: [
      { label: "Lectures", hours: 10 },
      { label: "Labs & problem classes", hours: 8 },
      { label: "Independent study", hours: 20 },
    ],
    assessment: [
      { label: "Exams", share: 55 },
      { label: "Lab reports", share: 30 },
      { label: "Project", share: 15 },
    ],
    careers: [
      "Research and PhD study",
      "Data science",
      "Aerospace and defence",
      "Medical physics",
    ],
    image: images.glassware,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod(
            "PHY1001",
            "Classical Mechanics and Relativity",
            30,
            "Mon 9, Wed 9",
            true,
          ),
          mod(
            "PHY1002",
            "Mathematics for Physicists",
            30,
            "Tue 9, Thu 9",
            true,
          ),
          mod("PHY1003", "Practical Physics I", 15, "Fri 14", true),
          mod(
            "AST1001",
            "The Night Sky: Observational Astronomy",
            15,
            "Wed 14",
            true,
          ),
          mod("PHY1010", "Programming with Python", 15, "Mon 14"),
          mod("PHY1011", "Physics of Music", 15, "Thu 14"),
          mod("PHY1012", "History of Cosmology", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod("PHY2001", "Quantum Mechanics", 30, "Mon 11, Thu 11", true),
          mod(
            "PHY2002",
            "Electromagnetism and Optics",
            30,
            "Tue 11, Fri 9",
            true,
          ),
          mod("AST2001", "Stellar Structure and Evolution", 15, "Wed 9", true),
          mod("PHY2003", "Practical Physics II", 15, "Wed 14", true),
          mod("PHY2010", "Thermal and Statistical Physics", 15, "Mon 14"),
          mod("PHY2011", "Computational Physics", 15, "Thu 14"),
          mod("PHY2012", "Science Communication", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("PHY3001", "Research Project", 30, "Fri 11, Fri 14", true),
          mod("AST3001", "Galaxies and Cosmology", 30, "Mon 9, Wed 11", true),
          mod("AST3010", "Exoplanets", 15, "Tue 9"),
          mod("PHY3010", "Condensed Matter Physics", 15, "Tue 9"),
          mod("PHY3011", "Particle Physics", 15, "Thu 11"),
          mod("AST3011", "Radio Astronomy", 15, "Thu 14"),
          mod("PHY3012", "Physics in Medicine", 15, "Mon 14"),
          mod("PHY3013", "General Relativity", 15, "Thu 11"),
        ],
      },
    ],
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    award: "BEng (Hons)",
    code: "H300",
    level: "Undergraduate",
    faculty: "science",
    years: 3,
    modes: ["Full-time"],
    start: "September 2027",
    entry: "AAA incl. Maths and Physics · 36 IB",
    entryRank: 2,
    fees: { home: 9535, international: 28900 },
    summary:
      "Design it, make it, break it, fix it — in the Foundry Labs on the river, with a build project every year.",
    overview: [
      "Each year closes on a build: a gravity-powered cart in Year 1, a working wind-turbine rotor in Year 2 and, in Year 3, a group design brief set by an engineering firm on the Harrowmere waterfront.",
      "The Foundry Labs give you a machine shop, composites bay and a 60-metre towing tank. Accredited routes and a paid placement year are available as an extension.",
    ],
    highlights: [
      "Build project every year",
      "Optional paid placement year",
      "Towing tank and machine shop",
    ],
    teaching: [
      { label: "Lectures", hours: 11 },
      { label: "Labs & workshop", hours: 9 },
      { label: "Independent study", hours: 18 },
    ],
    assessment: [
      { label: "Exams", share: 50 },
      { label: "Design projects", share: 35 },
      { label: "Lab work", share: 15 },
    ],
    careers: [
      "Design and product engineering",
      "Energy and renewables",
      "Automotive and aerospace",
      "Engineering consultancy",
    ],
    image: images.robotics,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod("MEC1001", "Engineering Mathematics", 30, "Mon 9, Thu 9", true),
          mod(
            "MEC1002",
            "Statics, Dynamics and Materials",
            30,
            "Tue 9, Fri 9",
            true,
          ),
          mod("MEC1003", "Design and Make I", 30, "Wed 14", true),
          mod("MEC1010", "CAD and Technical Drawing", 15, "Mon 14"),
          mod("MEC1011", "Electrical Principles", 15, "Thu 14"),
          mod("MEC1012", "Engineering in Society", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod("MEC2001", "Thermofluids", 30, "Mon 11, Wed 9", true),
          mod("MEC2002", "Solid Mechanics", 15, "Tue 11", true),
          mod("MEC2003", "Design and Make II: Wind", 30, "Fri 14", true),
          mod("MEC2010", "Control Systems", 15, "Thu 11"),
          mod("MEC2011", "Manufacturing Processes", 15, "Tue 14"),
          mod("MEC2012", "Numerical Methods", 15, "Thu 11"),
          mod("MEC2013", "Engineering Management", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("MEC3001", "Group Design Project", 30, "Wed 11, Fri 11", true),
          mod("MEC3002", "Individual Project", 30, "Fri 14", true),
          mod("MEC3010", "Renewable Energy Systems", 15, "Mon 9"),
          mod("MEC3011", "Robotics and Automation", 15, "Mon 9"),
          mod("MEC3012", "Composite Materials", 15, "Tue 11"),
          mod("MEC3013", "Vehicle Dynamics", 15, "Thu 9"),
          mod("MEC3014", "Biomechanics", 15, "Tue 14"),
        ],
      },
    ],
  },
  {
    id: "psychology",
    title: "Psychology",
    award: "BSc (Hons)",
    code: "C800",
    level: "Undergraduate",
    faculty: "social",
    years: 3,
    modes: ["Full-time", "Part-time"],
    start: "September 2027",
    entry: "AAA · 36 IB",
    entryRank: 2,
    fees: { home: 9535, international: 25200 },
    summary:
      "How minds work, measured properly — with your own experiments in the behavioural lab from the second term.",
    overview: [
      "Psychology at Quadwell is a laboratory science that never forgets people. You run your first experiment in term two, learn statistics by analysing data you collected yourself, and study development, cognition, social behaviour and clinical practice.",
      "The programme is designed around professional accreditation requirements, so graduates can move straight into clinical, educational or occupational training routes.",
    ],
    highlights: [
      "Own experiments from term two",
      "Eye-tracking and EEG lab",
      "Designed for professional accreditation",
    ],
    teaching: [
      { label: "Lectures", hours: 6 },
      { label: "Seminars & labs", hours: 6 },
      { label: "Independent study", hours: 24 },
    ],
    assessment: [
      { label: "Lab reports & projects", share: 45 },
      { label: "Exams", share: 40 },
      { label: "Presentations", share: 15 },
    ],
    careers: [
      "Clinical psychology training",
      "HR and organisational research",
      "Education and SEN support",
      "User research",
    ],
    image: images.seminar,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod("PSY1001", "Foundations of Psychology", 30, "Mon 9, Wed 9", true),
          mod(
            "PSY1002",
            "Research Methods and Statistics I",
            30,
            "Tue 11, Thu 11",
            true,
          ),
          mod("PSY1003", "Brain and Behaviour", 30, "Fri 9", true),
          mod("PSY1010", "Psychology of Everyday Life", 15, "Mon 14"),
          mod("PSY1011", "Introduction to Philosophy of Mind", 15, "Thu 14"),
          mod("PSY1012", "Sport and Exercise Psychology", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod("PSY2001", "Cognitive Psychology", 30, "Mon 11, Thu 9", true),
          mod(
            "PSY2002",
            "Developmental and Social Psychology",
            30,
            "Tue 9, Fri 11",
            true,
          ),
          mod(
            "PSY2003",
            "Research Methods and Statistics II",
            30,
            "Wed 11",
            true,
          ),
          mod("PSY2010", "Psychology of Language", 15, "Mon 14"),
          mod("PSY2011", "Forensic Psychology", 15, "Wed 14"),
          mod("PSY2012", "Health Psychology", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("PSY3001", "Empirical Project", 30, "Fri 9", true),
          mod("PSY3002", "Individual Differences", 15, "Tue 11", true),
          mod("PSY3010", "Clinical Psychology", 15, "Mon 9"),
          mod("PSY3011", "The Ageing Brain", 15, "Mon 9"),
          mod("PSY3012", "Psychology of Music", 15, "Wed 14"),
          mod("PSY3013", "Behaviour Change and Policy", 15, "Thu 11"),
          mod("PSY3014", "Child Language Disorders", 15, "Thu 14"),
          mod("PSY3015", "Sleep and Circadian Rhythms", 15, "Wed 14"),
          mod("PSY3016", "Neuroimaging Methods", 30, "Tue 14, Thu 9"),
        ],
      },
    ],
  },
  {
    id: "law",
    title: "Law",
    award: "LLB (Hons)",
    code: "M100",
    level: "Undergraduate",
    faculty: "social",
    years: 3,
    modes: ["Full-time"],
    start: "September 2027",
    entry: "AAA · 36 IB",
    entryRank: 2,
    fees: { home: 9535, international: 25200 },
    summary:
      "The foundations of legal knowledge, argued out loud in the teaching courtroom and tested in the Quadwell Law Clinic.",
    overview: [
      "You cover the foundation subjects — contract, tort, criminal, public, land, equity and EU law — in the first two years, mooting in the teaching courtroom from your first term.",
      "In the final year you can take the Law Clinic module, advising real Harrowmere residents on housing and employment problems under the supervision of practising solicitors.",
    ],
    highlights: [
      "Teaching courtroom",
      "Law Clinic with real clients",
      "Mooting from term one",
    ],
    teaching: [
      { label: "Lectures", hours: 7 },
      { label: "Tutorials", hours: 4 },
      { label: "Independent study", hours: 26 },
    ],
    assessment: [
      { label: "Exams", share: 60 },
      { label: "Essays & problem questions", share: 30 },
      { label: "Moots & clinic", share: 10 },
    ],
    careers: [
      "Solicitor or barrister",
      "In-house counsel",
      "Policy and regulation",
      "Human rights advocacy",
    ],
    image: images.lecture,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod("LAW1001", "Contract Law", 30, "Mon 9, Wed 11", true),
          mod("LAW1002", "Criminal Law", 30, "Tue 9, Thu 11", true),
          mod("LAW1003", "Public Law and the Constitution", 30, "Fri 9", true),
          mod("LAW1010", "Legal Skills and Mooting", 15, "Mon 14"),
          mod("LAW1011", "Law and Society", 15, "Thu 14"),
          mod("LAW1012", "Legal History", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod("LAW2001", "Tort Law", 30, "Mon 11, Thu 9", true),
          mod("LAW2002", "Land Law", 30, "Tue 11, Fri 11", true),
          mod("LAW2010", "Family Law", 15, "Wed 9"),
          mod("LAW2011", "Media Law", 15, "Wed 9"),
          mod("LAW2012", "Employment Law", 15, "Mon 14"),
          mod("LAW2013", "International Law", 30, "Tue 14, Thu 14"),
          mod("LAW2014", "Jurisprudence", 15, "Wed 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("LAW3001", "Equity and Trusts", 30, "Mon 9, Wed 9", true),
          mod("LAW3002", "European and Comparative Law", 15, "Fri 9", true),
          mod("LAW3010", "Law Clinic", 30, "Tue 14, Fri 14"),
          mod("LAW3011", "Commercial Law", 15, "Thu 11"),
          mod("LAW3012", "Environmental Law", 15, "Thu 11"),
          mod("LAW3013", "Medical Law and Ethics", 15, "Mon 14"),
          mod("LAW3014", "Criminology", 15, "Wed 14"),
          mod("LAW3015", "Dissertation", 30, "Thu 14"),
        ],
      },
    ],
  },
  {
    id: "biomedical-science",
    title: "Biomedical Science",
    award: "BSc (Hons)",
    code: "B940",
    level: "Undergraduate",
    faculty: "health",
    years: 3,
    modes: ["Full-time"],
    start: "September 2027",
    entry: "AAB incl. Biology and Chemistry · 35 IB",
    entryRank: 3,
    fees: { home: 9535, international: 27100 },
    summary:
      "The science of disease and diagnosis, taught next door to the hospital labs that do it every day.",
    overview: [
      "From cell biology and physiology in Year 1 to haematology, immunology and medical microbiology in Year 2, you learn the methods hospital laboratories rely on — and practise them in teaching labs fitted to clinical standard.",
      "A placement route lets you spend a year in the pathology department at Harrowmere Royal Infirmary, completing the portfolio that counts towards professional registration.",
    ],
    highlights: [
      "Hospital placement year option",
      "Clinical-standard teaching labs",
      "Research project in Year 3",
    ],
    teaching: [
      { label: "Lectures", hours: 9 },
      { label: "Labs & workshops", hours: 8 },
      { label: "Independent study", hours: 20 },
    ],
    assessment: [
      { label: "Exams", share: 50 },
      { label: "Lab work", share: 35 },
      { label: "Projects", share: 15 },
    ],
    careers: [
      "Biomedical scientist (NHS-style pathology)",
      "Pharmaceutical research",
      "Graduate-entry medicine",
      "Clinical trials",
    ],
    image: images.pipette,
    plan: [
      {
        label: "Year 1",
        modules: [
          mod(
            "BMS1001",
            "Cell Biology and Biochemistry",
            30,
            "Mon 9, Wed 9",
            true,
          ),
          mod("BMS1002", "Human Physiology", 30, "Tue 11, Thu 11", true),
          mod("BMS1003", "Laboratory Skills", 30, "Fri 14", true),
          mod("BMS1010", "Chemistry for Life Sciences", 15, "Mon 14"),
          mod("BMS1011", "Genetics", 15, "Thu 14"),
          mod("BMS1012", "Science and the Public", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 2",
        modules: [
          mod(
            "BMS2001",
            "Haematology and Transfusion Science",
            30,
            "Mon 11, Thu 9",
            true,
          ),
          mod("BMS2002", "Immunology", 30, "Tue 9, Fri 11", true),
          mod("BMS2003", "Medical Microbiology", 30, "Wed 11", true),
          mod("BMS2010", "Pharmacology", 15, "Mon 14"),
          mod("BMS2011", "Bioinformatics", 15, "Thu 14"),
          mod("BMS2012", "Neuroscience", 15, "Mon 14"),
        ],
      },
      {
        label: "Year 3",
        modules: [
          mod("BMS3001", "Research Project", 30, "Fri 9, Fri 14", true),
          mod("BMS3002", "Clinical Biochemistry", 30, "Mon 9, Wed 11", true),
          mod("BMS3010", "Cancer Biology", 15, "Tue 11"),
          mod("BMS3011", "Virology", 15, "Tue 11"),
          mod("BMS3012", "Cellular Pathology", 15, "Thu 9"),
          mod("BMS3013", "Regenerative Medicine", 15, "Thu 14"),
          mod("BMS3014", "Toxicology", 15, "Mon 14"),
        ],
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    award: "MSc",
    code: "PGT-DS",
    level: "Postgraduate",
    faculty: "science",
    years: 1,
    modes: ["Full-time", "Part-time"],
    start: "September 2027",
    entry: "2:1 degree with substantial maths or computing",
    entryRank: 2,
    fees: { home: 13200, international: 29800 },
    summary:
      "A year of statistics, machine learning and engineering practice, finishing on a project with a real data owner.",
    overview: [
      "The autumn term lays the foundations — statistical modelling, programming for data and machine learning — and the spring term lets you specialise in language, vision or the ethics and law of data.",
      "Over the summer you complete a dissertation with one of our partner organisations: the city council's transport team, Harrowmere Royal Infirmary or a research group on campus.",
    ],
    highlights: [
      "Summer project with a data partner",
      "Part-time over two years",
      "GPU cluster access",
    ],
    teaching: [
      { label: "Lectures", hours: 8 },
      { label: "Labs", hours: 6 },
      { label: "Independent study", hours: 24 },
    ],
    assessment: [
      { label: "Coursework", share: 60 },
      { label: "Dissertation", share: 33 },
      { label: "Exams", share: 7 },
    ],
    careers: [
      "Data scientist",
      "Machine learning engineer",
      "Analytics lead in the public sector",
      "PhD research",
    ],
    image: images.studyGroup,
    plan: [
      {
        label: "Full year",
        modules: [
          mod("DSC7001", "Statistical Modelling", 15, "Mon 9", true),
          mod("DSC7002", "Programming for Data Science", 15, "Tue 9", true),
          mod("DSC7003", "Machine Learning", 15, "Wed 11", true),
          mod("DSC7004", "Dissertation", 60, "Fri 11", true),
          mod("DSC7010", "Natural Language Processing", 15, "Thu 9"),
          mod("DSC7011", "Computer Vision", 15, "Thu 9"),
          mod("DSC7012", "Data Ethics and Law", 15, "Mon 14"),
          mod("DSC7013", "Big Data Engineering", 15, "Tue 14"),
        ],
      },
    ],
  },
  {
    id: "global-public-health",
    title: "Global Public Health",
    award: "MPH",
    code: "PGT-PH",
    level: "Postgraduate",
    faculty: "health",
    years: 1,
    modes: ["Full-time", "Part-time"],
    start: "September 2027",
    entry: "2:1 degree in a health, science or social science subject",
    entryRank: 3,
    fees: { home: 12400, international: 27600 },
    summary:
      "Epidemiology, policy and practice for people who want to change the health of whole populations.",
    overview: [
      "You learn the quantitative core of public health — epidemiology and biostatistics — alongside health policy, health economics and the politics of global health.",
      "The practicum places you with a health agency for ten weeks; recent students have worked with the regional health board, an international vaccine alliance's field office and the Centre for Health Equity on campus.",
    ],
    highlights: [
      "Ten-week practicum",
      "Taught by working epidemiologists",
      "Part-time over two years",
    ],
    teaching: [
      { label: "Lectures", hours: 6 },
      { label: "Seminars & labs", hours: 6 },
      { label: "Independent study", hours: 24 },
    ],
    assessment: [
      { label: "Coursework", share: 55 },
      { label: "Practicum report", share: 30 },
      { label: "Exams", share: 15 },
    ],
    careers: [
      "Epidemiologist",
      "Health policy analyst",
      "NGO programme manager",
      "Health data analyst",
    ],
    image: images.microscope,
    plan: [
      {
        label: "Full year",
        modules: [
          mod("PHL7001", "Epidemiology", 15, "Mon 9", true),
          mod("PHL7002", "Biostatistics", 15, "Wed 9", true),
          mod("PHL7003", "Health Policy and Systems", 15, "Tue 11", true),
          mod("PHL7004", "Practicum and Report", 60, "Fri 9", true),
          mod("PHL7010", "Health Economics", 15, "Thu 11"),
          mod("PHL7011", "Infectious Disease Control", 15, "Thu 11"),
          mod("PHL7012", "Health Equity and Social Justice", 15, "Mon 14"),
          mod("PHL7013", "Qualitative Research Methods", 15, "Wed 14"),
        ],
      },
    ],
  },
  {
    id: "museum-heritage",
    title: "Museum & Heritage Studies",
    award: "MA",
    code: "PGT-MH",
    level: "Postgraduate",
    faculty: "arts",
    years: 1,
    modes: ["Full-time", "Part-time"],
    start: "September 2027",
    entry: "2:1 degree in any humanities subject",
    entryRank: 4,
    fees: { home: 11200, international: 22900 },
    summary:
      "How collections are kept, interpreted and argued over — taught inside the university's own museum.",
    overview: [
      "The Ellery Museum on the Old Quad holds 90,000 objects, from Roman coins to a 1960s computer. You learn collections care, interpretation and exhibition-making on that collection, not from a textbook.",
      "In the summer term your cohort designs and opens a real temporary exhibition in the Ellery's Long Gallery, working with conservators, designers and the museum's learning team.",
    ],
    highlights: [
      "Taught inside the Ellery Museum",
      "Cohort opens a real exhibition",
      "Placements across the city",
    ],
    teaching: [
      { label: "Seminars", hours: 6 },
      { label: "Object sessions", hours: 4 },
      { label: "Independent study", hours: 26 },
    ],
    assessment: [
      { label: "Projects", share: 50 },
      { label: "Dissertation", share: 40 },
      { label: "Presentations", share: 10 },
    ],
    careers: [
      "Curator",
      "Collections manager",
      "Heritage learning officer",
      "Arts funding and policy",
    ],
    image: images.cloister,
    plan: [
      {
        label: "Full year",
        modules: [
          mod("MHS7001", "Collections: Care and Ethics", 15, "Mon 11", true),
          mod("MHS7002", "Interpretation and Exhibition", 15, "Wed 11", true),
          mod("MHS7003", "Exhibition Project", 15, "Fri 14", true),
          mod("MHS7004", "Dissertation", 60, "Thu 9", true),
          mod("MHS7010", "Digital Heritage", 15, "Tue 14"),
          mod("MHS7011", "Contested Pasts: Restitution", 15, "Tue 14"),
          mod("MHS7012", "Museum Learning", 15, "Mon 14"),
          mod("MHS7013", "Heritage Placement", 15, "Fri 9"),
        ],
      },
    ],
  },
];

export const CREDITS_PER_YEAR = 120;

/* ------------------------------------------------------------------ admissions */

export const applySteps = [
  {
    title: "Find your programme",
    text: "Use the finder, read the module lists, and come to an open day if you can — or join the online one.",
  },
  {
    title: "Check the entry requirements",
    text: "Every programme page lists the grades we look for. Contextual offers can be up to two grades lower.",
  },
  {
    title: "Apply by 28 January",
    text: "Apply online in about forty minutes. You'll need predicted grades, a personal statement and one referee.",
  },
  {
    title: "Hear back by early April",
    text: "Most decisions arrive within eight weeks. Some programmes invite you to an informal interview first.",
  },
  {
    title: "Arrive for Welcome Week",
    text: "Halls open on Saturday 18 September 2027. Lectures begin the Monday after Welcome Week.",
  },
];

export const keyDates = [
  {
    date: "2026-11-07",
    label: "Autumn open day",
    to: "/events/autumn-open-day",
  },
  {
    date: "2027-01-28",
    label: "Application deadline for September 2027",
    to: "/apply",
  },
  {
    date: "2027-03-31",
    label: "Accommodation applications close",
    to: "/campus-life",
  },
  {
    date: "2027-09-18",
    label: "Halls open · Welcome Week begins",
    to: "/campus-life",
  },
];

export const entryEquivalents = [
  {
    qualification: "A levels",
    note: "Three A levels; General Studies and Critical Thinking not accepted.",
  },
  {
    qualification: "International Baccalaureate",
    note: "Total points including core, with 6 in two Higher Level subjects.",
  },
  {
    qualification: "BTEC Extended Diploma",
    note: "D*DD for most programmes; sciences require an A level alongside.",
  },
  {
    qualification: "Access to HE Diploma",
    note: "45 credits at Level 3, 30 at Distinction, in a relevant subject.",
  },
  {
    qualification: "Scottish Highers",
    note: "AAAAB at Higher plus two Advanced Highers for science programmes.",
  },
];

export const scholarships = [
  {
    name: "Quadwell Foundation Bursary",
    value: 2000,
    per: "a year",
    who: "Home undergraduates from households earning under £35,000. Automatic — no separate application.",
  },
  {
    name: "Ellery Global Scholarship",
    value: 5000,
    per: "off year-one fees",
    who: "International undergraduates with AAA or 36 IB. Assessed from your application.",
  },
  {
    name: "Harrowmere City Award",
    value: 3000,
    per: "a year",
    who: "Students from the city's own schools and colleges, renewed each year you progress.",
  },
  {
    name: "Postgraduate Alumni Discount",
    value: 20,
    per: "% off fees",
    who: "Quadwell graduates returning for a taught master's degree.",
  },
];

export const livingCosts = [
  { item: "Hall rent (self-catered, en-suite)", week: 168 },
  { item: "Food and groceries", week: 55 },
  { item: "Local travel (student bus pass)", week: 9 },
  { item: "Books, printing and course materials", week: 8 },
  { item: "Phone, social life and the rest", week: 40 },
];

export const faqs = [
  {
    q: "Can I apply for more than one programme?",
    a: "Yes. You can list up to three Quadwell programmes on one application, ranked in order of preference. Each department considers you independently.",
  },
  {
    q: "What is a contextual offer?",
    a: "If you went to a school with lower-than-average progression to university, have spent time in care, or are a young carer, we may make you an offer up to two grades below the standard requirement. We check eligibility automatically from your application.",
  },
  {
    q: "Do I need to come to an interview?",
    a: "Only for Creative Writing (a portfolio conversation) and the Biomedical Science placement route. Interviews are friendly, 20 minutes long and can be held online.",
  },
  {
    q: "How is my fee status decided?",
    a: "Fee status depends on your nationality and where you have lived for the three years before your course starts. If you are unsure, tell us on the form and our fees team will assess it before you accept an offer.",
  },
  {
    q: "Is accommodation guaranteed?",
    a: "Every first-year undergraduate who firms Quadwell and applies for halls by 31 March is guaranteed a room. Postgraduates are guaranteed a room if they apply by 30 June.",
  },
  {
    q: "Can I defer my place to 2028?",
    a: "Yes, for almost every programme. Tick the deferral box on the application, or ask Admissions after you receive an offer.",
  },
  {
    q: "What support is there for disabled students?",
    a: "The Access Centre arranges exam adjustments, note-taking support, adapted rooms in halls and assistive software. Tell us as early as you like; it never affects our decision.",
  },
  {
    q: "Can I change programme after I start?",
    a: "Many students switch within the first four weeks of Year 1, if they meet the entry requirements of the new programme and there is space. Your personal tutor will guide you.",
  },
];

/* ------------------------------------------------------------------ campus */

export type Hall = {
  id: string;
  name: string;
  catered: boolean;
  ensuite: boolean;
  week: number;
  weeks: number;
  walk: number;
  rooms: number;
  note: string;
};

export const halls: Hall[] = [
  {
    id: "ferrier",
    name: "Ferrier Hall",
    catered: true,
    ensuite: false,
    week: 189,
    weeks: 34,
    walk: 4,
    rooms: 310,
    note: "The oldest hall: oak-panelled dining room, formal dinner on Thursdays, shared bathrooms between four.",
  },
  {
    id: "cloister-court",
    name: "Cloister Court",
    catered: false,
    ensuite: true,
    week: 176,
    weeks: 42,
    walk: 2,
    rooms: 240,
    note: "Flats of six around a courtyard, directly behind the library. Quiet floors available.",
  },
  {
    id: "riverside",
    name: "Riverside Wharf",
    catered: false,
    ensuite: true,
    week: 168,
    weeks: 44,
    walk: 12,
    rooms: 520,
    note: "Converted warehouses by the Foundry Labs, with a gym, music rooms and bike store.",
  },
  {
    id: "ashgrove",
    name: "Ashgrove House",
    catered: true,
    ensuite: true,
    week: 214,
    weeks: 34,
    walk: 9,
    rooms: 180,
    note: "Catered en-suite rooms beside the observatory park. Breakfast and evening meal, Monday to Friday.",
  },
  {
    id: "tanner",
    name: "Tanner Street",
    catered: false,
    ensuite: false,
    week: 132,
    weeks: 40,
    walk: 15,
    rooms: 400,
    note: "Our most affordable rooms: shared kitchens and bathrooms in renovated terraces near the city centre.",
  },
  {
    id: "lister",
    name: "Lister Gardens",
    catered: false,
    ensuite: true,
    week: 158,
    weeks: 51,
    walk: 7,
    rooms: 220,
    note: "Studios and flats for postgraduates and mature students, let on a full-year contract.",
  },
];

export type Place = {
  id: string;
  name: string;
  text: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Positions on a 1000 × 640 campus plan. */
export const places: Place[] = [
  {
    id: "old-quad",
    name: "Old Quad & Great Hall",
    text: "Admissions, the Great Hall and the Ellery Museum around the original 1891 lawn.",
    x: 380,
    y: 230,
    w: 220,
    h: 170,
  },
  {
    id: "library",
    name: "Fenwick Library",
    text: "Open 24 hours in term, with 1,800 study spaces and the glass reading room.",
    x: 640,
    y: 250,
    w: 140,
    h: 110,
  },
  {
    id: "union",
    name: "Students' Union",
    text: "Cafés, the Cellar venue, the advice centre and 240 societies' noticeboards.",
    x: 400,
    y: 440,
    w: 160,
    h: 90,
  },
  {
    id: "lister",
    name: "Lister Building",
    text: "Physics, data science and the Ashgrove Observatory dome on the roof.",
    x: 150,
    y: 220,
    w: 170,
    h: 120,
  },
  {
    id: "foundry",
    name: "Foundry Labs",
    text: "Engineering workshops, the towing tank and robotics hall on the river.",
    x: 90,
    y: 470,
    w: 230,
    h: 110,
  },
  {
    id: "medical",
    name: "Medical School",
    text: "Biomedical and public health teaching, linked to the Royal Infirmary by a covered bridge.",
    x: 830,
    y: 230,
    w: 140,
    h: 160,
  },
  {
    id: "sport",
    name: "Quadwell Sport",
    text: "A 25-metre pool, climbing wall, sports hall and floodlit pitches.",
    x: 630,
    y: 440,
    w: 150,
    h: 130,
  },
  {
    id: "concert",
    name: "Ellery Concert Hall",
    text: "Home of the University Orchestra and the free Wednesday lunchtime concerts.",
    x: 400,
    y: 80,
    w: 180,
    h: 100,
  },
];

export const campus = {
  title: "Campus life",
  lead: "Everything is a ten-minute walk from the Old Quad: your hall, your lectures, the library at 2 a.m., the pool, the Cellar on a Friday. Here is how it fits together.",
  societyCount: 240,
  hallsNote:
    "Prices are per week for 2027–28 and include bills, insurance and fast Wi-Fi.",
};

export const societies = [
  "Astronomical Society",
  "Boat Club",
  "Chamber Choir",
  "Climbing Club",
  "Debating Union",
  "Film Society",
  "Harrowmere Hiking",
  "Jazz Orchestra",
  "Korean Culture Society",
  "Law Moot Society",
  "Mountain Biking",
  "Quadwell Players (theatre)",
  "Quiz Society",
  "Radio Quad",
  "Robotics Society",
  "Student Volunteers",
  "Ultimate Frisbee",
  "Women in Engineering",
];

export const support = [
  {
    title: "Personal tutor",
    text: "An academic in your department who meets you every term, from your first week to your final reference.",
  },
  {
    title: "Wellbeing service",
    text: "Same-day appointments with counsellors and mental-health advisers, in person or online.",
  },
  {
    title: "Access Centre",
    text: "Adjustments for disabled and neurodivergent students, assessed before you arrive if you tell us early.",
  },
  {
    title: "Careers Studio",
    text: "CV clinics, a paid internship scheme in the city and one-to-one guidance for three years after you graduate.",
  },
];

export const studentVoice = {
  quote:
    "I came for the history department and stayed for the lawn. Everyone crosses the Old Quad ten times a day, so you can't help bumping into your friends — or your tutor.",
  name: "Amara Okafor",
  role: "BA History, Year 3 · Ferrier Hall",
};

/* ------------------------------------------------------------------ research */

export type Institute = {
  id: string;
  name: string;
  lead: string;
  text: string;
  themes: string[];
  image: Img;
};

export const institutes: Institute[] = [
  {
    id: "coastal",
    name: "Institute for Coastal Change",
    lead: "Prof. Ines Marlow",
    text: "Measures how the Harrow estuary is moving, and designs flood defences with the towns that live behind them.",
    themes: [
      "Sea-level modelling",
      "Salt-marsh restoration",
      "Community flood planning",
    ],
    image: images.glassware,
  },
  {
    id: "quantum",
    name: "Centre for Quantum Materials",
    lead: "Dr Tomasz Wierzbicki",
    text: "Grows and measures new layered crystals for low-power electronics in the Lister Building's ultra-low-vibration lab.",
    themes: ["2D materials", "Superconductivity", "Cryogenic measurement"],
    image: images.microscope,
  },
  {
    id: "health-equity",
    name: "Centre for Health Equity",
    lead: "Prof. Ruth Adeyemi",
    text: "Studies why life expectancy differs by eleven years between two Harrowmere postcodes — and what closes the gap.",
    themes: ["Neighbourhood health", "Child nutrition", "Primary care access"],
    image: images.pipette,
  },
  {
    id: "medieval",
    name: "Harrowmere Medieval Centre",
    lead: "Prof. Edmund Carrick",
    text: "Edits and digitises the city's medieval charters, and reconstructs how ordinary people lived, prayed and traded.",
    themes: ["Digital editions", "Urban archaeology", "Pilgrimage and trade"],
    image: images.cloister,
  },
  {
    id: "robotics",
    name: "Autonomy & Robotics Lab",
    lead: "Dr Priya Sethi",
    text: "Builds robots that inspect bridges, pipes and offshore turbines so that people do not have to climb them.",
    themes: [
      "Inspection robotics",
      "Underwater autonomy",
      "Human–robot safety",
    ],
    image: images.robotics,
  },
];

export const findings = [
  {
    date: "2026-10-02",
    title:
      "Restored salt marsh absorbs twice the storm surge predicted, estuary study finds",
    institute: "coastal",
  },
  {
    date: "2026-09-18",
    title:
      "A crystal that superconducts at a record temperature for its family of materials",
    institute: "quantum",
  },
  {
    date: "2026-09-04",
    title:
      "Free school breakfasts linked to better attendance in Harrowmere's east end",
    institute: "health-equity",
  },
  {
    date: "2026-08-21",
    title: "Lost 1340s charter names the city's first female guild master",
    institute: "medieval",
  },
  {
    date: "2026-07-30",
    title:
      "Crawler robot completes first unassisted inspection of the Harrow viaduct",
    institute: "robotics",
  },
  {
    date: "2026-07-09",
    title: "Mapping who gets a GP appointment within a week, street by street",
    institute: "health-equity",
  },
];

export const research = {
  title: "Research that starts at the end of the street",
  lead: "Quadwell's five research institutes work on problems you can walk to: a moving estuary, a viaduct, an archive, an east-end clinic. Then they publish what they find for everyone.",
  story: {
    title: "The marsh that held back the sea",
    text: "When the Harrow estuary flooded in 2024, the village of Saltby stayed dry. Prof. Ines Marlow's team had spent six years restoring the salt marsh in front of it. Their new paper shows the marsh absorbed more than double the wave energy their models predicted — and the council is now restoring three more.",
    image: images.glassware,
  },
  phd: "We fund 60 doctoral studentships a year across all four faculties, with a stipend, fees and a research training budget. Applications for October 2027 open on 1 December.",
};

/* ------------------------------------------------------------------ events */

export type EventType = "Open day" | "Public lecture" | "Music" | "Exhibition";

export type UniEvent = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  venue: string;
  price: number;
  capacity: number;
  booked: number;
  summary: string;
  body: string[];
  schedule?: { time: string; item: string }[];
  image: Img;
};

export const events: UniEvent[] = [
  {
    id: "autumn-open-day",
    title: "Autumn Undergraduate Open Day",
    type: "Open day",
    date: "2026-11-07",
    time: "09:30–16:00",
    venue: "Old Quad and all departments",
    price: 0,
    capacity: 3000,
    booked: 2412,
    summary:
      "Subject talks, lab tours, hall visits and lunch on us. Bring whoever helps you decide.",
    body: [
      "Every department opens its doors: sit in on a taster lecture, try a lab practical, meet the tutors who would teach you and ask current students the questions you'd never put in an email.",
      "Hall tours leave from the Old Quad every 20 minutes. Admissions, fees and the Access Centre have desks in the Great Hall all day.",
    ],
    schedule: [
      { time: "09:30", item: "Welcome from the Vice-Chancellor, Great Hall" },
      {
        time: "10:15",
        item: "Subject talks begin (every hour, on the quarter)",
      },
      { time: "12:00", item: "Lunch in Ferrier Hall dining room" },
      { time: "13:00", item: "Hall tours and lab demonstrations" },
      { time: "15:00", item: "Applying and student finance talk" },
    ],
    image: images.hero,
  },
  {
    id: "marsh-lecture",
    title: "The Marsh That Held Back the Sea",
    type: "Public lecture",
    date: "2026-11-19",
    time: "18:30–19:45",
    venue: "Lister Lecture Theatre",
    price: 0,
    capacity: 380,
    booked: 296,
    summary:
      "Prof. Ines Marlow on six years restoring the Harrow salt marsh, and what it means for every coastal town.",
    body: [
      "In the autumn Ferrier Lecture, Prof. Ines Marlow tells the story of the Saltby marsh restoration: the mud, the arguments, the storm of 2024 and the data that surprised her own team.",
      "Followed by questions and a drinks reception in the Lister foyer. Live captions are provided.",
    ],
    image: images.talk,
  },
  {
    id: "winter-concert",
    title: "University Orchestra: Winter Concert",
    type: "Music",
    date: "2026-12-04",
    time: "19:30–21:30",
    venue: "Ellery Concert Hall",
    price: 12,
    capacity: 620,
    booked: 451,
    summary:
      "Sibelius' Second Symphony and a new commission by second-year composer Leo Hartnell.",
    body: [
      "Ninety student musicians and conductor Dr Mariam Vos close the autumn term with Sibelius' Second Symphony, preceded by the premiere of Leo Hartnell's Estuary Lights.",
      "Students and under-18s go free with a ticket booked here. Doors open at 19:00; the bar stays open in the interval.",
    ],
    image: images.orchestra,
  },
  {
    id: "charters-exhibition",
    title: "Written in the City: Medieval Charters",
    type: "Exhibition",
    date: "2026-12-10",
    time: "10:00–17:00, until 28 March",
    venue: "Ellery Museum, Long Gallery",
    price: 0,
    capacity: 200,
    booked: 64,
    summary:
      "Forty charters from the city archive, including the newly read 1340s guild document.",
    body: [
      "The Harrowmere Medieval Centre brings forty charters out of the archive for the first time — leases, guild rules, wills and a dispute over a pig — with digital overlays that let you read the Latin as you stand in front of it.",
      "Free entry; booking is only needed for the opening evening on 10 December.",
    ],
    image: images.cloister,
  },
  {
    id: "postgraduate-open-evening",
    title: "Postgraduate Open Evening",
    type: "Open day",
    date: "2027-01-20",
    time: "17:00–20:00",
    venue: "Great Hall",
    price: 0,
    capacity: 800,
    booked: 318,
    summary:
      "Meet programme leaders for every taught master's degree and talk funding with the scholarships team.",
    body: [
      "Programme leaders for all taught master's degrees are on hand in the Great Hall, alongside the scholarships, careers and accommodation teams.",
      "Short talks on funding your master's and on applying for a PhD run at 17:30 and 18:30.",
    ],
    image: images.readingRoom,
  },
  {
    id: "robots-lecture",
    title: "Robots That Climb So We Don't Have To",
    type: "Public lecture",
    date: "2027-02-11",
    time: "18:30–19:45",
    venue: "Foundry Labs, Robotics Hall",
    price: 0,
    capacity: 220,
    booked: 119,
    summary:
      "Dr Priya Sethi on inspection robots, the Harrow viaduct and a future with fewer dangerous jobs.",
    body: [
      "Dr Priya Sethi and her team demonstrate the crawler robot that inspected the Harrow viaduct, and talk through what autonomy can and cannot safely do.",
      "Suitable for ages 12 and up — bring the engineer in your family.",
    ],
    image: images.robotics,
  },
  {
    id: "spring-open-day",
    title: "Spring Applicant Day",
    type: "Open day",
    date: "2027-03-13",
    time: "10:00–15:00",
    venue: "Old Quad and all departments",
    price: 0,
    capacity: 2000,
    booked: 540,
    summary:
      "For applicants holding an offer: meet your future tutors and stay for lunch with your cohort.",
    body: [
      "If you hold an offer from Quadwell, this is your day: departmental sessions with your future tutors, current students on every corner, and a chance to see the hall you've been reading about.",
      "Travel bursaries of up to £60 are available for applicants who live more than 100 miles away.",
    ],
    image: images.arches,
  },
  {
    id: "lunchtime-recital",
    title: "Wednesday Lunchtime Recital: Chamber Choir",
    type: "Music",
    date: "2027-03-17",
    time: "13:10–13:50",
    venue: "Ellery Concert Hall",
    price: 0,
    capacity: 300,
    booked: 77,
    summary:
      "Forty minutes of Tallis, Pärt and folk arrangements from the Quadwell Chamber Choir.",
    body: [
      "The free Wednesday lunchtime series continues with the Chamber Choir in music by Tallis, Pärt and arrangements of Harrowmere folk songs collected by the Music department.",
      "No booking needed for students; visitors are asked to reserve a seat.",
    ],
    image: images.orchestra,
  },
];

export const eventTypes: EventType[] = [
  "Open day",
  "Public lecture",
  "Music",
  "Exhibition",
];

/* ------------------------------------------------------------------ about */

export const history = [
  {
    year: 1891,
    text: "Harrowmere College of Science and Art opens on Cloister Lane with 74 students and a lawn nobody is allowed to walk on.",
  },
  {
    year: 1912,
    text: "Women admitted to every degree. The Ferrier Hall of residence opens the same autumn.",
  },
  {
    year: 1948,
    text: "Royal charter granted: the college becomes Quadwell University, named for the quad and the well beneath it.",
  },
  {
    year: 1967,
    text: "The Fenwick Library and Lister Building open; the lawn is finally opened to students.",
  },
  {
    year: 1994,
    text: "The old dock warehouses become the Foundry Labs and Riverside Wharf halls.",
  },
  {
    year: 2024,
    text: "The glass reading room opens and the university commits to net zero estates by 2035.",
  },
];

export const leaders = [
  {
    name: "Prof. Helen Achterberg",
    role: "Vice-Chancellor",
    text: "A coastal geographer who joined Quadwell as a lecturer in 1999.",
  },
  {
    name: "Prof. Samuel Osei",
    role: "Provost",
    text: "Leads teaching and the student experience across all four faculties.",
  },
  {
    name: "Prof. Ines Marlow",
    role: "Pro-Vice-Chancellor, Research",
    text: "Founding director of the Institute for Coastal Change.",
  },
  {
    name: "Dr Niamh Corrigan",
    role: "Director of Admissions",
    text: "Former head of a Harrowmere sixth-form college.",
  },
  {
    name: "Lena Pirozhkova",
    role: "Students' Union President",
    text: "BSc Physics graduate, elected for 2026–27.",
  },
];

export const about = {
  title: "A university built around a lawn",
  lead: "Quadwell began in 1891 as a city college for the sons and daughters of Harrowmere's docks and mills. It is now a university of 19,000 students from 120 countries — and the lawn is still at the centre of everything.",
  principal: {
    quote:
      "We are a big university that behaves like a small one. Every student has a tutor who knows their name, and every building is a ten-minute walk from the quad.",
    name: "Prof. Helen Achterberg",
    role: "Vice-Chancellor",
  },
  values: [
    {
      title: "Open by default",
      text: "Our lectures are free to the public, our research is published open access, and our lawn is open to anyone with a sandwich.",
    },
    {
      title: "Of the city",
      text: "One in five of our students comes from Harrowmere's own schools, and every faculty has a project with the city council.",
    },
    {
      title: "Small groups",
      text: "Seminars stay at twelve students or fewer, from your first week to your final year.",
    },
  ],
};

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Study where the city meets the quad",
  lead: "Quadwell University is 19,000 students, four faculties and one sandstone quad in the middle of Harrowmere. Applications for September 2027 are open.",
  caption:
    "The Old Quad, looking north to the Bell Tower, 8:40 on a Tuesday in May.",
  close: {
    title: "Applications for September 2027 are open",
    text: "Apply by 28 January 2027 for equal consideration. It takes about forty minutes, and you can save your module plan from any programme page first.",
  },
};
