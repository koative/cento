import hero from "./assets/hero.jpg";
import notebook from "./assets/notebook.jpg";
import kitchenTable from "./assets/kitchen-table.jpg";
import cabin from "./assets/cabin.jpg";
import spreadsheets from "./assets/spreadsheets.jpg";
import sourdough from "./assets/sourdough.jpg";
import python from "./assets/python.jpg";
import fieldRecording from "./assets/field-recording.jpg";
import botanical from "./assets/botanical.jpg";
import night from "./assets/night.jpg";
import observation from "./assets/observation.jpg";
import ines from "./assets/ines.jpg";
import tomasz from "./assets/tomasz.jpg";
import priya from "./assets/priya.jpg";
import jonah from "./assets/jonah.jpg";
import margit from "./assets/margit.jpg";
import peter from "./assets/peter.jpg";

/* ── Brand ───────────────────────────────────────────── */

export const brand = {
  name: "Campus",
  sector: "Online course platform",
  email: "hello@campus.example",
  phone: "+1 555 0134",
  phoneHref: "tel:+15550134",
  support:
    "Learner support answers weekdays, 9 am – 6 pm ET, usually within four hours.",
  address:
    "Campus Learning Co., 214 Fieldstone Avenue, Suite 3, Portland, ME 04101",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/instructors", label: "Instructors" },
  { to: "/pricing", label: "Pricing" },
  { to: "/learn", label: "Workspace" },
  { to: "/about", label: "About" },
];

/* ── Courses ─────────────────────────────────────────── */

export type Level = "Beginner" | "Intermediate";
export type LessonKind = "Video" | "Reading" | "Exercise" | "Critique";
export type Lesson = { title: string; minutes: number; kind: LessonKind };
export type Module = { title: string; lessons: Lesson[] };
export type Review = { name: string; note: string; text: string };

export type Course = {
  slug: string;
  title: string;
  summary: string;
  subject: string;
  level: Level;
  instructor: string;
  image: string;
  imageAlt: string;
  price: number;
  rating: number;
  reviewCount: number;
  pace: number;
  updated: string;
  outcomes: string[];
  project: string;
  tools: string[];
  modules: Module[];
  reviews: Review[];
};

const mod = (
  title: string,
  lessons: [string, number, LessonKind][],
): Module => ({
  title,
  lessons: lessons.map(([title, minutes, kind]) => ({ title, minutes, kind })),
});

export const subjects = [
  "Design",
  "Food",
  "Data",
  "Sound",
  "Art",
  "Writing",
  "Photography",
];

export const courses: Course[] = [
  {
    slug: "learning-to-see",
    title: "Learning to See",
    summary:
      "A short course in creative attention. Four weeks of looking slowly, asking better questions and turning a hunch into a small experiment you can learn from.",
    subject: "Design",
    level: "Beginner",
    instructor: "ines-valdes",
    image: observation,
    imageAlt:
      "Glass office towers photographed from street level, their window grids reflecting each other",
    price: 59,
    rating: 4.9,
    reviewCount: 412,
    pace: 2,
    updated: "September 2026",
    outcomes: [
      "A daily ten-minute observation habit you can keep",
      "Three lenses — shape, light, rhythm — for reading any scene",
      "A method for turning a broad ambition into one testable question",
      "A sketchbook of four small experiments and what each one taught you",
    ],
    project:
      "Pick one ordinary place you pass every day. Document it through all three lenses, write the useful question it raises, and build the smallest experiment that answers it.",
    tools: ["A notebook and pen", "A phone camera", "About two hours a week"],
    modules: [
      mod("Notice the ordinary", [
        ["Notice the ordinary", 6, "Video"],
        ["Three lenses: shape, light, rhythm", 9, "Video"],
        ["The ten-minute walk", 20, "Exercise"],
      ]),
      mod("Find the useful question", [
        ["Find the useful question", 8, "Video"],
        ["From ambition to a question", 12, "Reading"],
        ["Rewrite it for one person", 15, "Exercise"],
      ]),
      mod("Make a small experiment", [
        ["Make a small experiment", 10, "Video"],
        ["Paper, models and single screens", 14, "Video"],
        ["Build the smallest version", 30, "Exercise"],
      ]),
      mod("Reflect and repeat", [
        ["Reflect and repeat", 5, "Video"],
        ["Keep, change, try", 15, "Exercise"],
        ["Live group critique", 45, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Dana K.",
        note: "Product manager, finished in 5 weeks",
        text: "I expected a design course. I got a way of paying attention that changed how I run meetings. The ten-minute walk is now non-negotiable.",
      },
      {
        name: "Theo M.",
        note: "Architecture student",
        text: "Ines asks one question per lesson and then gets out of the way. The critique session alone was worth the price.",
      },
    ],
  },
  {
    slug: "sourdough-from-first-principles",
    title: "Sourdough from First Principles",
    summary:
      "Understand what flour, water, salt and time are actually doing, so you can bake a reliable country loaf on a working-week schedule — and fix it when it goes wrong.",
    subject: "Food",
    level: "Beginner",
    instructor: "tomasz-wierzba",
    image: sourdough,
    imageAlt:
      "A round sourdough loaf with a deep score and floured crust cooling on a wire rack",
    price: 79,
    rating: 4.8,
    reviewCount: 1186,
    pace: 3,
    updated: "August 2026",
    outcomes: [
      "A healthy starter fed on a schedule that fits around a job",
      "Confidence reading dough by feel, not by the clock",
      "A repeatable plain country loaf with an open crumb",
      "A bake log that tells you exactly what to change next time",
    ],
    project:
      "Bake the same loaf three weekends running, changing one variable each time. Post photos of crumb and crust with your bake log for Tomasz's notes.",
    tools: [
      "Kitchen scale (1 g precision)",
      "A lidded cast-iron pot or baking stone",
      "Bowl, bench scraper, razor blade",
    ],
    modules: [
      mod("The starter", [
        ["Flour, water, time", 11, "Video"],
        ["A feeding schedule that fits a work week", 9, "Reading"],
        ["Reading your starter", 14, "Video"],
      ]),
      mod("The dough", [
        ["Hydration without fear", 12, "Video"],
        ["Autolyse and stretch-and-fold", 16, "Video"],
        ["First bake: a plain country loaf", 90, "Exercise"],
      ]),
      mod("Fermentation", [
        ["Temperature is an ingredient", 10, "Video"],
        ["The poke test, honestly", 8, "Video"],
        ["Retarding overnight in the fridge", 12, "Reading"],
      ]),
      mod("Shaping and scoring", [
        ["Pre-shape, bench rest, shape", 18, "Video"],
        ["Scoring for ear and bloom", 11, "Video"],
        ["Bake-log critique", 40, "Critique"],
      ]),
      mod("Variations", [
        ["Whole wheat and rye", 14, "Video"],
        ["Seeds, soakers and inclusions", 12, "Video"],
        ["Final bake", 120, "Exercise"],
      ]),
    ],
    reviews: [
      {
        name: "Grace O.",
        note: "Nurse, bakes on night-shift weeks",
        text: "Every other guide assumed I was home all day. Tomasz's fridge schedule finally made it work around twelve-hour shifts.",
      },
      {
        name: "Ari P.",
        note: "Home baker",
        text: "The troubleshooting chart is taped inside my cupboard. My loaves stopped spreading in week three.",
      },
    ],
  },
  {
    slug: "spreadsheets-that-explain-themselves",
    title: "Spreadsheets That Explain Themselves",
    summary:
      "Build workbooks a colleague can open cold and understand in five minutes: tidy structure, honest formulas, one-question charts and a read-me tab.",
    subject: "Data",
    level: "Beginner",
    instructor: "priya-raman",
    image: spreadsheets,
    imageAlt:
      "Overhead view of hands typing on a laptop on a wooden kitchen table",
    price: 69,
    rating: 4.7,
    reviewCount: 908,
    pace: 2.5,
    updated: "October 2026",
    outcomes: [
      "A structure rule you can apply to any messy sheet",
      "Lookups and checks that fail loudly instead of quietly",
      "Charts that answer exactly one question each",
      "A one-page summary tab your manager will actually read",
    ],
    project:
      "Take a real spreadsheet from your work or home life and rebuild it: tidy the tables, add checks, write the read-me tab and a one-page summary.",
    tools: [
      "Excel, Google Sheets or Numbers",
      "One messy spreadsheet of your own",
    ],
    modules: [
      mod("Structure", [
        ["One table, one idea", 9, "Video"],
        ["Naming columns for strangers", 7, "Reading"],
        ["Rebuild a messy budget", 35, "Exercise"],
      ]),
      mod("Formulas", [
        ["Lookups without tears", 14, "Video"],
        ["Named ranges and helper columns", 11, "Video"],
        ["Error-proofing with checks", 12, "Video"],
      ]),
      mod("Explaining", [
        ["Charts that answer one question", 13, "Video"],
        ["Notes, colour and the legend row", 8, "Reading"],
        ["Make a one-page summary", 40, "Exercise"],
      ]),
      mod("Handing over", [
        ["The read-me tab", 6, "Video"],
        ["Protecting what matters", 9, "Video"],
        ["Peer review", 30, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Mireille D.",
        note: "Office manager",
        text: "Our shared budget used to need me on the phone to explain it. Now it has a read-me tab and nobody calls.",
      },
      {
        name: "Ken S.",
        note: "Small-business owner",
        text: "Clear, unhurried and practical. The checks module caught a pricing error I'd been carrying for two years.",
      },
    ],
  },
  {
    slug: "python-for-working-analysts",
    title: "Python for Working Analysts",
    summary:
      "For people who live in spreadsheets and want the Monday report to build itself. pandas, tidy data and small scripts — no computer-science detour.",
    subject: "Data",
    level: "Intermediate",
    instructor: "priya-raman",
    image: python,
    imageAlt: "Close-up of colourful lines of source code on a dark monitor",
    price: 119,
    rating: 4.8,
    reviewCount: 655,
    pace: 4,
    updated: "October 2026",
    outcomes: [
      "A clean Python setup that will not break next month",
      "Fluent filtering, grouping and joining with pandas",
      "Scripts that read forty files and write one tidy table",
      "A scheduled report your colleagues receive as an Excel file",
    ],
    project:
      "Automate one report you currently build by hand. Ship it as a script with a short read-me, then get a line-by-line code review from Priya's teaching team.",
    tools: [
      "A laptop (Windows, macOS or Linux)",
      "Comfort with spreadsheet formulas",
      "Python 3.12 — installed in lesson one",
    ],
    modules: [
      mod("Setup", [
        ["A calm Python install", 12, "Video"],
        ["Notebooks versus scripts", 9, "Reading"],
        ["Your first CSV", 25, "Exercise"],
      ]),
      mod("pandas", [
        ["DataFrames as spreadsheets", 16, "Video"],
        ["Filtering and grouping", 18, "Video"],
        ["Cleaning dates and names", 20, "Video"],
        ["Weekly sales clean-up", 45, "Exercise"],
      ]),
      mod("Automating", [
        ["Functions you will reuse", 14, "Video"],
        ["Reading forty files at once", 12, "Video"],
        ["Scheduling a Monday report", 15, "Reading"],
      ]),
      mod("Presenting", [
        ["Charts with matplotlib", 17, "Video"],
        ["Exporting to Excel for colleagues", 10, "Video"],
        ["Capstone: the report that runs itself", 120, "Exercise"],
        ["Code review", 40, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Joanna W.",
        note: "Finance analyst",
        text: "Priya teaches pandas the way a spreadsheet person thinks. My four-hour month-end now takes six minutes.",
      },
      {
        name: "Luis R.",
        note: "Operations lead",
        text: "The code review on my capstone was more useful than a year of tutorials. Specific, kind and blunt.",
      },
    ],
  },
  {
    slug: "field-recording-and-sound-walks",
    title: "Field Recording & Sound Walks",
    summary:
      "Learn to listen first and record second. Capture dawn choruses, rivers and city hum with a phone or a handheld recorder, then edit a two-minute sound portrait.",
    subject: "Sound",
    level: "Beginner",
    instructor: "jonah-abernethy",
    image: fieldRecording,
    imageAlt:
      "A stereo microphone in a furry windshield on a tripod beside a woodland stream",
    price: 79,
    rating: 4.9,
    reviewCount: 274,
    pace: 2.5,
    updated: "July 2026",
    outcomes: [
      "A listening practice that sharpens what you notice",
      "Clean levels with no wind roar or handling noise",
      "A library of labelled recordings from your own area",
      "A finished two-minute sound portrait of one place",
    ],
    project:
      "Choose one place within walking distance. Record it at three times of day and edit a two-minute sound portrait, shared at the closing listening session.",
    tools: [
      "A recent phone or a handheld recorder",
      "Closed-back headphones",
      "Free editor (Audacity or similar)",
    ],
    modules: [
      mod("Listening", [
        ["Ears before equipment", 8, "Video"],
        ["The sound-walk score", 12, "Reading"],
        ["Twenty-minute listening walk", 20, "Exercise"],
      ]),
      mod("Gear", [
        ["Phone, recorder or both", 11, "Video"],
        ["Wind, handling noise and levels", 13, "Video"],
        ["Mic placement in the field", 10, "Video"],
      ]),
      mod("Recording", [
        ["Dawn chorus and early starts", 9, "Video"],
        ["Water, wind and machines", 12, "Video"],
        ["Record three textures", 60, "Exercise"],
      ]),
      mod("Editing", [
        ["Cutting and fading", 14, "Video"],
        ["Noise reduction, lightly", 10, "Video"],
        ["A two-minute sound portrait", 90, "Exercise"],
        ["Listening session", 45, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Priyanka T.",
        note: "Podcast producer",
        text: "Jonah made me put the recorder down for a whole week. Best advice I've had in ten years of audio.",
      },
      {
        name: "Bram V.",
        note: "Birdwatcher",
        text: "My dawn chorus recordings went from hiss to something I play at dinner. The wind module is gold.",
      },
    ],
  },
  {
    slug: "botanical-drawing-in-ink",
    title: "Botanical Drawing in Ink",
    summary:
      "Slow, precise drawing from life. Measure by eye, build form with line and stipple, and finish a lettered specimen plate worthy of a frame.",
    subject: "Art",
    level: "Beginner",
    instructor: "margit-hallstrom",
    image: botanical,
    imageAlt:
      "A watercolour study of a boxwood branch with small glossy leaves on aged paper",
    price: 89,
    rating: 4.9,
    reviewCount: 538,
    pace: 3,
    updated: "June 2026",
    outcomes: [
      "Accurate proportions measured by eye, not traced",
      "Confident line weight, hatching and stippling",
      "Convincing form on leaves, stems, fruit and folds",
      "A finished, lettered specimen plate",
    ],
    project:
      "Compose a specimen plate of one plant from your garden, park or windowsill: habit, leaf, flower or fruit detail, and a lettered label. Margit reviews every plate.",
    tools: [
      "Fineliner pens 0.05–0.5",
      "Hot-pressed paper, A4",
      "A plant you can return to for six weeks",
    ],
    modules: [
      mod("Seeing the plant", [
        ["Measuring by eye", 12, "Video"],
        ["Contour and gesture", 14, "Video"],
        ["Ten leaves, ten minutes each", 100, "Exercise"],
      ]),
      mod("Line", [
        ["Nibs, pens and paper", 9, "Reading"],
        ["Line weight and direction", 13, "Video"],
        ["Stippling and hatching", 16, "Video"],
      ]),
      mod("Form", [
        ["Light on a round fruit", 15, "Video"],
        ["Folds, veins and edges", 12, "Video"],
        ["A branch in three values", 90, "Exercise"],
      ]),
      mod("The plate", [
        ["Composing a specimen plate", 14, "Video"],
        ["Lettering the label", 8, "Video"],
        ["Final plate", 150, "Exercise"],
        ["Portfolio critique", 45, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Hollis B.",
        note: "Retired teacher",
        text: "I hadn't drawn since school. Margit's measuring method took the fear out of it. My plate is framed in the hall.",
      },
      {
        name: "Naomi F.",
        note: "Garden designer",
        text: "Quiet, rigorous and generous. The stippling lesson alone changed my client drawings.",
      },
    ],
  },
  {
    slug: "writing-docs-people-finish",
    title: "Writing Docs People Finish",
    summary:
      "Technical writing for people who are not technical writers. Structure pages around the reader's task, cut them in half and ship guides that stop the repeat questions.",
    subject: "Writing",
    level: "Intermediate",
    instructor: "peter-lindqvist",
    image: notebook,
    imageAlt:
      "An open notebook with handwritten notes, two pens and reading glasses on a wooden desk",
    price: 69,
    rating: 4.7,
    reviewCount: 361,
    pace: 2,
    updated: "September 2026",
    outcomes: [
      "A reader-first checklist for any page you write",
      "Headings that answer questions instead of naming topics",
      "Steps that survive skimming on a phone",
      "A rewritten guide from your own work, reviewed by an editor",
    ],
    project:
      "Pick a real how-to page your team keeps answering questions about. Audit it, restructure it, cut it to half its length, and submit before-and-after for Peter's edit.",
    tools: ["Any text editor", "One page of documentation that needs help"],
    modules: [
      mod("Reader first", [
        ["Who opens this page, and why", 9, "Video"],
        ["Task, reference, explanation", 11, "Reading"],
        ["Audit an existing page", 30, "Exercise"],
      ]),
      mod("Structure", [
        ["Headings that answer questions", 10, "Video"],
        ["Steps that survive skimming", 12, "Video"],
        ["Examples before rules", 8, "Video"],
      ]),
      mod("Sentences", [
        ["Short, active, specific", 11, "Video"],
        ["Cut a 900-word page to 400", 40, "Exercise"],
      ]),
      mod("Shipping", [
        ["Screenshots, and when not to", 7, "Video"],
        ["Review with an engineer", 10, "Reading"],
        ["Final guide", 60, "Exercise"],
        ["Editor's critique", 40, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Femi A.",
        note: "Support team lead",
        text: "Our setup guide went from 2,300 words to 900 and tickets about it dropped by half in a month.",
      },
      {
        name: "Clara J.",
        note: "Software engineer",
        text: "Peter's edits are surgical. I now write the example first and it has made everything easier.",
      },
    ],
  },
  {
    slug: "night-photography-on-foot",
    title: "Night Photography on Foot",
    summary:
      "Make sharp, atmospheric pictures after dark with whatever camera you carry — no tripod required. Blue hour, street light, light trails and a finished set of eight.",
    subject: "Photography",
    level: "Intermediate",
    instructor: "ines-valdes",
    image: night,
    imageAlt:
      "A long-exposure photograph of red and white light trails on a road at dusk under bare trees",
    price: 99,
    rating: 4.8,
    reviewCount: 497,
    pace: 3,
    updated: "October 2026",
    outcomes: [
      "Exposure settings you can dial in by feel after dark",
      "Sharp handheld frames at slow shutter speeds",
      "Control over mixed street-light colour",
      "A sequenced set of eight night photographs",
    ],
    project:
      "Walk one route at blue hour and after dark over two weeks. Edit and sequence eight frames into a set, presented in the closing critique.",
    tools: [
      "Any camera with manual exposure, or a recent phone",
      "Raw editing software (free options covered)",
    ],
    modules: [
      mod("Exposure after dark", [
        ["The exposure triangle, at night", 14, "Video"],
        ["Steady without a tripod", 10, "Video"],
        ["Blue-hour walk", 60, "Exercise"],
      ]),
      mod("Light sources", [
        ["Street lamps and colour casts", 12, "Video"],
        ["Shop windows and neon", 9, "Video"],
        ["Light trails", 13, "Video"],
      ]),
      mod("Composition", [
        ["Leading lines in the dark", 11, "Video"],
        ["People as silhouettes", 10, "Video"],
        ["Ten frames, one street", 75, "Exercise"],
      ]),
      mod("Editing", [
        ["Raw files and white balance", 15, "Video"],
        ["Noise and shadows", 12, "Video"],
        ["Sequencing a set of eight", 14, "Video"],
        ["Final set critique", 45, "Critique"],
      ]),
    ],
    reviews: [
      {
        name: "Sung-min L.",
        note: "Commuter photographer",
        text: "I shoot on the walk home now. The handheld bracing technique doubled my keeper rate overnight.",
      },
      {
        name: "Elena G.",
        note: "Hobbyist",
        text: "Ines's notes on my set were specific to every frame. I finally understand white balance under sodium lamps.",
      },
    ],
  },
];

export const courseMinutes = (c: Course) =>
  c.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0),
    0,
  );
export const lessonCount = (c: Course) =>
  c.modules.reduce((sum, m) => sum + m.lessons.length, 0);

/* ── Instructors ─────────────────────────────────────── */

export type Instructor = {
  slug: string;
  name: string;
  role: string;
  location: string;
  since: number;
  image: string;
  imageAlt: string;
  short: string;
  bio: string[];
  quote: string;
  credits: string[];
  office: string;
};

export const instructors: Instructor[] = [
  {
    slug: "ines-valdes",
    name: "Ines Valdés",
    role: "Photographer and visual designer",
    location: "Lisbon",
    since: 2021,
    image: ines,
    imageAlt:
      "Ines Valdés, smiling over her shoulder on a city street at night",
    short:
      "Teaches people to slow down and look — by day with a sketchbook, after dark with a camera.",
    bio: [
      "Ines spent nine years designing wayfinding for hospitals and train stations, where the job was to notice what people actually look at. She now splits her time between editorial photography and teaching.",
      "Her courses are built around short walks and small assignments. She records every lesson on location, usually within a kilometre of her flat, to prove the ordinary is enough.",
    ],
    quote:
      "You do not need a better view. You need to stay with the one you have for ten more minutes.",
    credits: [
      "Wayfinding lead on two regional transit systems",
      "Editorial work for independent travel quarterlies",
      "2,900 learners across two Campus courses",
    ],
    office: "Live critique: alternate Thursdays, 7:30 pm ET",
  },
  {
    slug: "tomasz-wierzba",
    name: "Tomasz Wierzba",
    role: "Baker, twelve-seat bakery counter",
    location: "Kraków",
    since: 2020,
    image: tomasz,
    imageAlt:
      "Tomasz Wierzba, a grey-bearded man in glasses and a blue cardigan, looking at the camera",
    short:
      "Bakes before dawn, teaches by lunchtime, and keeps a bake log for every loaf since 2009.",
    bio: [
      "Tomasz trained as a chemical engineer before opening a twelve-seat bakery counter on a side street. He still bakes four mornings a week and keeps a written log for every batch.",
      "He teaches the why before the how, so that learners can adapt a recipe to their flour, their kitchen and their working hours instead of following it blindly.",
    ],
    quote:
      "A recipe is a record of one baker's kitchen on one day. Learn to read your own.",
    credits: [
      "Runs a twelve-seat neighbourhood bakery",
      "Former process engineer in food manufacturing",
      "6,400 learners on Campus",
    ],
    office: "Bake-log reviews: every Sunday",
  },
  {
    slug: "priya-raman",
    name: "Priya Raman",
    role: "Data analyst and reporting lead",
    location: "Toronto",
    since: 2021,
    image: priya,
    imageAlt:
      "Priya Raman working on a laptop at a wooden table with a coffee beside her",
    short:
      "Turns spreadsheet habits into Python skills for analysts who never meant to become programmers.",
    bio: [
      "Priya built the reporting for a regional network of community clinics, starting in spreadsheets and moving to Python when the files got too big to open. She has been teaching colleagues the same path ever since.",
      "Her lessons start from the spreadsheet you already understand and translate it, step by step, into code you can trust and hand over.",
    ],
    quote:
      "If a colleague cannot open your work cold and understand it, it is not finished.",
    credits: [
      "Reporting lead for a 14-clinic health network",
      "Maintains an open teaching dataset of 40,000 fictional sales",
      "8,100 learners across two Campus courses",
    ],
    office: "Code reviews: within five working days",
  },
  {
    slug: "jonah-abernethy",
    name: "Jonah Abernethy",
    role: "Sound recordist",
    location: "Vermont",
    since: 2022,
    image: jonah,
    imageAlt:
      "Jonah Abernethy, smiling with arms crossed in a meadow of dried teasels at sunset",
    short:
      "Records rivers, forests and small towns for documentaries, and teaches listening before gear.",
    bio: [
      "Jonah records location sound for documentaries and keeps a growing library of dawn choruses from the hills around his home. He started with a phone and still recommends it.",
      "His course sends you out on listening walks before you press record, because he believes the best microphone upgrade is a better pair of ears.",
    ],
    quote: "Press record only when you can say what you are listening for.",
    credits: [
      "Location sound on eleven feature documentaries",
      "Curates a public library of 1,200 dawn recordings",
      "2,100 learners on Campus",
    ],
    office: "Listening sessions: last Saturday of the month",
  },
  {
    slug: "margit-hallstrom",
    name: "Margit Hallström",
    role: "Botanical illustrator",
    location: "Gothenburg",
    since: 2020,
    image: margit,
    imageAlt:
      "Margit Hallström, a smiling woman with curly grey hair in a cream sweater",
    short:
      "Draws plants for herbaria and field guides, and believes anyone can learn to measure by eye.",
    bio: [
      "Margit has drawn specimen plates for herbaria and regional field guides for thirty years. She works in ink at a north-facing window and draws something from life every morning.",
      "She teaches slowly and precisely, with plenty of time for each exercise. Every final plate submitted to her course gets a written review in her own hand.",
    ],
    quote:
      "Drawing is measuring, and measuring is just paying attention with numbers.",
    credits: [
      "Illustrator for three regional field guides",
      "Thirty years of herbarium specimen plates",
      "3,700 learners on Campus",
    ],
    office: "Plate reviews: written, within two weeks",
  },
  {
    slug: "peter-lindqvist",
    name: "Peter Lindqvist",
    role: "Technical editor",
    location: "Edinburgh",
    since: 2023,
    image: peter,
    imageAlt:
      "Peter Lindqvist, a grey-haired man in a suit, typing on a vintage typewriter by a window",
    short:
      "Edits documentation for software teams and still drafts on a typewriter when the words won't come.",
    bio: [
      "Peter has edited manuals, API references and onboarding guides for software teams for twenty years. Most of his work is cutting: his record is a 6,000-word page reduced to 700.",
      "He teaches engineers, support leads and product people to write the page their reader needs, then to make it half as long.",
    ],
    quote:
      "Your reader is busy, a little worried and on their phone. Write for that person.",
    credits: [
      "Documentation editor for twenty years",
      "Author of a style guide used by four open-source projects",
      "1,900 learners on Campus",
    ],
    office: "Editor's critique: one round per learner",
  },
];

/* ── Home ────────────────────────────────────────────── */

export const home = {
  title: "Campus — Online courses taught by working makers",
  heroTitle: ["Learn a real skill in the", "evenings", "you already have."],
  heroText:
    "Practical courses from bakers, analysts, illustrators and recordists who still do the work. Short lessons, real exercises and feedback from the person who made the course.",
  heroImageAlt:
    "A learner at her desk with an open notebook, a yellow textbook and a laptop",
  hero,
  heroNote: "First lesson of every course is free. No card needed.",
  featured: [
    "sourdough-from-first-principles",
    "learning-to-see",
    "python-for-working-analysts",
    "botanical-drawing-in-ink",
  ],
  subjectsTitle: "Seven subjects, chosen slowly",
  subjectsText:
    "We add a course only when we find someone who does the work every week and can teach it plainly.",
  weekTitle: "What a week on Campus looks like",
  weekText:
    "Every course follows the same rhythm, tuned to an evening or two of study. This is week two of Sourdough from First Principles.",
  week: [
    {
      day: "Monday",
      title: "Watch",
      text: "Two short lessons, 12 and 16 minutes. Pause, rewind, take notes beside the video.",
      minutes: 28,
    },
    {
      day: "Wednesday",
      title: "Practise",
      text: "Mix a dough using the week's method. The exercise sheet tells you what to watch for.",
      minutes: 40,
    },
    {
      day: "Saturday",
      title: "Make",
      text: "The weekly bake. Log what happened, photograph the crumb, post it to your cohort.",
      minutes: 90,
    },
    {
      day: "Sunday",
      title: "Feedback",
      text: "Tomasz and his teaching assistant reply to bake logs with one thing to keep and one to change.",
      minutes: 10,
    },
  ],
  quote: {
    text: "I did three courses in a year, entirely after my kids were in bed. The pace planner told me exactly how many evenings I needed, and it was right every time.",
    name: "Rosalind A.",
    note: "Learner since 2024 — Sourdough, Spreadsheets, Learning to See",
  },
  workspaceTitle: "A desk that remembers where you were",
  workspaceText:
    "Your lessons, notes and progress live in one quiet workspace. Pick up mid-lesson on your phone, keep notes beside the video, and check your understanding before moving on.",
  workspacePoints: [
    "Notes saved beside every lesson",
    "A short check at the end of each lesson",
    "Progress that carries across devices",
  ],
  learnersTitle: "Who learns here",
  learners: [
    {
      image: kitchenTable,
      alt: "A learner with grey curly hair working on a laptop at a white kitchen table",
      text: "Most of our learners study at a kitchen table between 8 and 10 pm, two or three evenings a week.",
    },
    {
      image: cabin,
      alt: "A smiling learner working on a laptop at a wooden table in a cabin",
      text: "A third finish their course on a phone. Every lesson is designed to work on a small screen and a slow connection.",
    },
  ],
  stories: [
    {
      text: "The final critique was the first time a working illustrator looked at my drawing. Margit wrote two pages.",
      name: "Hollis B.",
      course: "Botanical Drawing in Ink",
    },
    {
      text: "I automated our month-end in week five. My manager asked which consultant I'd hired.",
      name: "Joanna W.",
      course: "Python for Working Analysts",
    },
    {
      text: "Short lessons, a clear exercise, and a person on the other end. That's why I actually finished.",
      name: "Grace O.",
      course: "Sourdough from First Principles",
    },
  ],
  closeTitle: "Start with one free lesson tonight.",
  closeText:
    "Pick any course and watch the first lesson without an account. If it fits, the rest is waiting.",
};

/* ── Pricing ─────────────────────────────────────────── */

export type Billing = "monthly" | "yearly";
export type Plan = {
  id: "course" | "membership" | "teams";
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  unit: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Pricing",
  heading: "Pay for one course, or learn everything.",
  text: "Prices in US dollars. Every course includes lifetime access to its lessons, and every plan includes the learning workspace.",
  plans: [
    {
      id: "course",
      name: "Single course",
      blurb: "Own one course for good.",
      monthly: 59,
      yearly: 59,
      unit: "from, once",
      features: [
        "Lifetime access to one course",
        "Exercises and lesson checks",
        "Notes in the workspace",
        "One instructor critique",
      ],
      cta: "Choose a course",
    },
    {
      id: "membership",
      name: "Membership",
      blurb: "Every course, every critique.",
      monthly: 24,
      yearly: 16,
      unit: "per month",
      features: [
        "All 8 courses and every new release",
        "Live critique sessions each month",
        "Pace planner and study reminders",
        "Offline lessons in the mobile app",
        "Certificates of completion",
      ],
      cta: "Start membership",
      featured: true,
    },
    {
      id: "teams",
      name: "Teams",
      blurb: "For groups of five or more.",
      monthly: 19,
      yearly: 15,
      unit: "per seat, per month",
      features: [
        "Everything in Membership",
        "Assign courses and due dates",
        "Progress reports for leads",
        "Private cohort critiques",
        "Invoice billing",
      ],
      cta: "Set up a team",
    },
  ] satisfies Plan[],
  compare: [
    { row: "Courses included", values: ["1", "All 8", "All 8"] },
    {
      row: "Lifetime access",
      values: ["Yes", "While subscribed", "While subscribed"],
    },
    {
      row: "Instructor critiques",
      values: ["1", "Unlimited", "Unlimited + private"],
    },
    { row: "Offline lessons", values: ["—", "Yes", "Yes"] },
    { row: "Progress reports", values: ["—", "Your own", "Whole team"] },
    { row: "Billing", values: ["Card", "Card", "Card or invoice"] },
  ],
  faq: [
    {
      q: "Can I try a course before paying?",
      a: "Yes. The first lesson of every course is free to watch without an account, and members can cancel within 14 days for a full refund.",
    },
    {
      q: "What happens to my notes if I cancel membership?",
      a: "Your notes and progress stay in your workspace. You can export them as a text file at any time, and they come back if you rejoin.",
    },
    {
      q: "How much time does a course really take?",
      a: "Between 4 and 12 hours of lessons plus exercises. Each course page has a pace planner that turns your available evenings into a finish date.",
    },
    {
      q: "Do the live critiques happen at a fixed time?",
      a: "Yes, usually early evening US Eastern time. Every session is recorded, and you can submit work in advance for a written reply instead.",
    },
    {
      q: "Is there a discount for students or teachers?",
      a: "Membership is 40% off with a school or university email address. Write to us from that address and we will apply it.",
    },
    {
      q: "Can my employer pay?",
      a: "Teams start at five seats with invoice billing. For a single learner, we can send an invoice addressed to your employer for any course.",
    },
  ],
};

/* ── About ───────────────────────────────────────────── */

export const about = {
  title: "About",
  heading: "A small school for the evenings you already have.",
  intro:
    "Campus started in 2019 as a borrowed classroom on Fieldstone Avenue, where a baker, a bookkeeper and an illustrator taught night classes to whoever turned up. When the room closed, we moved the classes online and kept the rules.",
  image: kitchenTable,
  imageAlt:
    "A learner working through a lesson on her laptop at a kitchen table",
  story: [
    "The rules are simple. Every instructor still does the work they teach. Every lesson is short enough to finish before the kettle cools. Every course ends with a real piece of work and a real person looking at it.",
    "We are fourteen people, mostly part-time, spread across five time zones. We publish two or three courses a year and spend the rest of the time revising the ones we have.",
  ],
  principles: [
    {
      title: "Practitioners, not presenters",
      text: "Instructors are bakers, analysts, recordists and editors with active practices. We would rather have a nervous expert than a polished generalist.",
    },
    {
      title: "Short lessons, real exercises",
      text: "No video runs past 18 minutes. Every module ends with something to make, not a quiz to pass.",
    },
    {
      title: "A person on the other end",
      text: "Every course includes critique from the instructor or their teaching assistant. It is the most expensive thing we do and the reason people finish.",
    },
  ],
  processTitle: "How a course gets made",
  process: [
    {
      title: "Find the teacher",
      text: "We look for people who explain their craft well to apprentices and colleagues, and we pay them a fair share of every sale for life.",
    },
    {
      title: "Pilot with thirty learners",
      text: "A rough version runs live over Zoom-style calls with thirty volunteers. We cut anything they skip or misunderstand.",
    },
    {
      title: "Film where the work happens",
      text: "Lessons are recorded in the instructor's own bakery, studio or field — never a set.",
    },
    {
      title: "Edit to the bone",
      text: "No lesson runs past 18 minutes. Exercises are tested by someone who has never done the craft.",
    },
    {
      title: "Revise every year",
      text: "Each course is reviewed annually against learner notes and completion data, and updated in place for everyone.",
    },
  ],
  team: [
    { name: "Wren Castellano", role: "Founder and course director" },
    { name: "Abeni Okafor", role: "Head of learner support" },
    { name: "Mattias Holm", role: "Producer and editor" },
    { name: "Lucía Ferrer", role: "Workspace product lead" },
    { name: "Daniel Park", role: "Instructor partnerships" },
    { name: "Sadie Brennan", role: "Teaching assistants coordinator" },
  ],
  close:
    "Want to teach on Campus? Write to us with one thing you could teach in under 18 minutes.",
};

/* ── Sign up / sign in ───────────────────────────────── */

export const signup = {
  title: "Create your account",
  heading: "Make room for a new skill.",
  text: "Create an account to keep your notes, track progress and start your first course. You can change plans at any time.",
  perks: [
    "First lesson of every course is free",
    "Cancel membership within 14 days for a full refund",
    "Your notes stay yours, exportable any time",
  ],
  successTitle: "Your desk is ready.",
};

export const signin = {
  title: "Sign in",
  heading: "Welcome back to your desk.",
};

/* ── Learning workspace demo ─────────────────────────── */

export type CheckQuestion = {
  question: string;
  options: string[];
  answer: number;
  why: string;
};
export type WorkspaceLesson = {
  id: string;
  module: string;
  title: string;
  minutes: number;
  heading: string;
  body: string[];
  task: string;
  check: CheckQuestion;
  study?: boolean;
};

export const workspace = {
  learner: "Sam Whitlock",
  courseSlug: "learning-to-see",
  studyImage: observation,
  studyAlt:
    "Architectural study of glass towers with intersecting planes and repeated windows",
  lenses: [
    {
      name: "Shape",
      text: "Follow where two planes meet. Where does one shape become another?",
      position: "50% 45%",
      zoom: 1,
    },
    {
      name: "Light",
      text: "Compare the brightest surface with the deepest shadow. Notice how light describes depth.",
      position: "12% 30%",
      zoom: 1.45,
    },
    {
      name: "Rhythm",
      text: "Trace the repeated windows. Look for the moment the pattern breaks.",
      position: "82% 60%",
      zoom: 1.45,
    },
  ],
  lessons: [
    {
      id: "notice-the-ordinary",
      module: "Notice the ordinary",
      title: "Notice the ordinary",
      minutes: 6,
      heading: "Great ideas start with paying attention.",
      body: [
        "Before you make something new, look carefully at what already exists. The shape of a receipt. The rhythm of a street. The way a familiar tool sits in your hand.",
        "Observation is a skill, not a talent. Like any skill, it improves with short, regular practice — and it starts with things you have stopped seeing.",
      ],
      task: "Choose one object near you. Describe three things you have never noticed about it.",
      check: {
        question: "According to this lesson, observation is best improved by…",
        options: [
          "Travelling somewhere unfamiliar",
          "Short, regular practice with familiar things",
          "Buying a better camera",
        ],
        answer: 1,
        why: "The course is built on ten-minute daily practice with what you already pass every day.",
      },
      study: true,
    },
    {
      id: "three-lenses",
      module: "Notice the ordinary",
      title: "Three lenses: shape, light, rhythm",
      minutes: 9,
      heading: "Give your eyes a job to do.",
      body: [
        "Looking 'carefully' is too vague to practise. A lens narrows the task: for the next minute, look only at shape. Then only at light. Then only at rhythm.",
        "Each lens reveals a different scene in the same view. Used in turn, they stop you settling on the first thing you see.",
      ],
      task: "Look out of the nearest window for three minutes, one minute per lens. Write one sentence for each.",
      check: {
        question: "Why use one lens at a time?",
        options: [
          "It narrows the task so it can be practised",
          "It is faster than looking normally",
          "Professionals only use one",
        ],
        answer: 0,
        why: "A lens turns 'look carefully' into a specific task you can repeat and improve.",
      },
    },
    {
      id: "find-the-useful-question",
      module: "Find the useful question",
      title: "Find the useful question",
      minutes: 8,
      heading: "A better question opens a different door.",
      body: [
        "The first question is rarely the most useful one. Ask who the work is for, what they need to do, and what gets in their way.",
        "Replace a broad ambition with a specific question you can explore this week. 'Make the station friendlier' becomes 'Where do first-time visitors stop and look around?'",
      ],
      task: "Write one broad question. Then rewrite it for one person in one situation.",
      check: {
        question: "Which is the more useful question?",
        options: [
          "How can our kitchen be better?",
          "Where does the person cooking dinner put things down first?",
          "What is the ideal kitchen?",
        ],
        answer: 1,
        why: "It names one person, one moment and something you can go and observe.",
      },
    },
    {
      id: "make-a-small-experiment",
      module: "Make a small experiment",
      title: "Make a small experiment",
      minutes: 10,
      heading: "Give your idea something to push against.",
      body: [
        "An experiment turns a thought into something you can learn from. Keep the scope small: a paper sketch, a rough model, a single screen.",
        "Decide what you want to learn before you start. An experiment without a question is just a nicer-looking guess.",
      ],
      task: "Sketch the smallest version of your idea. Write down the one thing you want to learn from it.",
      check: {
        question: "What should you decide before building an experiment?",
        options: [
          "The materials budget",
          "What you want to learn from it",
          "Who will approve it",
        ],
        answer: 1,
        why: "Knowing the question tells you how small the experiment can be.",
      },
    },
    {
      id: "reflect-and-repeat",
      module: "Reflect and repeat",
      title: "Reflect and repeat",
      minutes: 5,
      heading: "The next version starts with what you learned.",
      body: [
        "Look at the experiment without defending it. What surprised you? What worked? What was confusing to the person who tried it?",
        "Keep the useful parts and give the next version one clear intention. Then bring it to the group critique.",
      ],
      task: "Write one thing to keep, one thing to change and one thing to try next.",
      check: {
        question: "The best stance for reviewing your own experiment is…",
        options: [
          "Defending the choices you made",
          "Looking for what surprised you",
          "Starting over from scratch",
        ],
        answer: 1,
        why: "Surprises are where the learning is; defending choices hides them.",
      },
    },
  ] satisfies WorkspaceLesson[],
  otherCourses: [
    {
      slug: "sourdough-from-first-principles",
      progress: 0.42,
      next: "Temperature is an ingredient",
    },
    {
      slug: "spreadsheets-that-explain-themselves",
      progress: 0.83,
      next: "Peer review",
    },
  ],
  week: [
    { day: "Mon", minutes: 25 },
    { day: "Tue", minutes: 0 },
    { day: "Wed", minutes: 40 },
    { day: "Thu", minutes: 15 },
    { day: "Fri", minutes: 0 },
    { day: "Sat", minutes: 55 },
    { day: "Sun", minutes: 30 },
  ],
  weeklyGoal: 150,
  upcoming: [
    {
      when: "Thursday, 7:30 pm ET",
      what: "Live group critique — Learning to See",
      who: "Ines Valdés",
    },
    {
      when: "Sunday",
      what: "Bake-log replies — Sourdough, week 3",
      who: "Tomasz Wierzba",
    },
  ],
};

/* ── Footer & misc ───────────────────────────────────── */

export const footer = {
  blurb: "Practical online courses taught by people who still do the work.",
  newsletterTitle: "The Tuesday syllabus",
  newsletterText:
    "One short lesson by email each week, from a different instructor. Unsubscribe in one click.",
  columns: [
    {
      title: "Learn",
      links: [
        { to: "/courses", label: "All courses" },
        { to: "/instructors", label: "Instructors" },
        { to: "/pricing", label: "Pricing" },
        { to: "/learn", label: "Workspace demo" },
      ],
    },
    {
      title: "Campus",
      links: [
        { to: "/about", label: "About" },
        { to: "/signup", label: "Sign up" },
        { to: "/signin", label: "Sign in" },
        { to: "/learn/notes", label: "Notebook" },
      ],
    },
  ],
};

export const notFound = {
  title: "Page not found",
  heading: "This page isn't on the syllabus.",
  text: "The link may be old, or the course may have moved. Try the catalogue, or head back to the start.",
};
