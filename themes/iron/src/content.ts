import hero from "./assets/hero.jpg";
import floor from "./assets/floor.jpg";
import coaching from "./assets/coaching.jpg";
import darkPull from "./assets/dark-pull.jpg";
import dumbbells from "./assets/dumbbells.jpg";
import grip from "./assets/grip.jpg";
import classBarbell from "./assets/class-barbell.jpg";
import classOlympic from "./assets/class-olympic.jpg";
import classEngine from "./assets/class-engine.jpg";
import classCircuit from "./assets/class-circuit.jpg";
import classBuild from "./assets/class-build.jpg";
import classMobility from "./assets/class-mobility.jpg";
import classRun from "./assets/class-run.jpg";
import classFoundations from "./assets/class-foundations.jpg";
import coachMarcus from "./assets/coach-marcus.jpg";
import coachLena from "./assets/coach-lena.jpg";
import coachRae from "./assets/coach-rae.jpg";
import coachDante from "./assets/coach-dante.jpg";
import coachSofia from "./assets/coach-sofia.jpg";
import coachOwen from "./assets/coach-owen.jpg";

/* ------------------------------------------------------------ types */

export type Img = { src: string; alt: string; w: number; h: number };

/** Class families are colour-coded like calibrated bumper plates. */
export type CategoryId =
  "strength" | "olympic" | "conditioning" | "recovery" | "foundations";
export type Category = {
  id: CategoryId;
  name: string;
  plate: string;
  line: string;
};

export type Block = { minutes: number; name: string; detail: string };

export type GymClass = {
  id: string;
  name: string;
  category: CategoryId;
  minutes: number;
  capacity: number;
  room: string;
  level: string;
  /** 1 (easy breathing) to 5 (on the floor afterwards). */
  intensity: 1 | 2 | 3 | 4 | 5;
  summary: string;
  body: string[];
  blocks: Block[];
  bring: string[];
  image: Img;
};

export type Trainer = {
  id: string;
  name: string;
  role: string;
  focus: CategoryId[];
  since: number;
  summary: string;
  bio: string[];
  specialties: string[];
  qualifications: string[];
  quote: string;
  ptDays: string;
  image: Img;
};

/** [day 0 = Monday, "HH:MM" 24h, class id, trainer id] */
export type Slot = {
  day: number;
  time: string;
  classId: string;
  trainerId: string;
};

export type Plan = {
  id: "open" | "classes" | "coached";
  name: string;
  monthly: number;
  annual: number;
  pitch: string;
  includes: string[];
};

export type Lift = "squat" | "bench" | "deadlift" | "press";
export type Goal = "strength" | "muscle" | "engine";
export type Level = "new" | "returning" | "experienced";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Iron",
  full: "Iron Strength Club",
  tagline: "Heavy iron, honest coaching, a timetable that starts at 5:45.",
  street: "2207 Foundry Row, Unit B",
  area: "Riverside Works",
  email: "hello@iron.example",
  phone: "+1 555 0142 2207",
  phoneHref: "tel:+15550142207",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Strava", href: "https://www.strava.com/" },
  ],
};

export const hours: { days: string; open: string }[] = [
  { days: "Monday – Friday", open: "5:30am – 10:00pm" },
  { days: "Saturday", open: "7:30am – 6:00pm" },
  { days: "Sunday", open: "8:30am – 2:00pm" },
];

export const nav = [
  { to: "/timetable", label: "Timetable" },
  { to: "/classes", label: "Classes" },
  { to: "/trainers", label: "Trainers" },
  { to: "/memberships", label: "Memberships" },
  { to: "/programme", label: "Programme builder" },
  { to: "/about", label: "The gym" },
];

export const footerColumns = [
  {
    title: "Train",
    links: [
      { to: "/timetable", label: "Timetable" },
      { to: "/classes", label: "Classes" },
      { to: "/programme", label: "Programme builder" },
    ],
  },
  {
    title: "Club",
    links: [
      { to: "/trainers", label: "Trainers" },
      { to: "/memberships", label: "Memberships" },
      { to: "/about", label: "The gym" },
    ],
  },
  {
    title: "Start",
    links: [
      { to: "/join", label: "Join Iron" },
      { to: "/classes/foundations", label: "Foundations course" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "The Monday board",
  text: "This week's programming, who's coaching what and one thing worth reading. Monday, 5am, before the first class.",
};

/* ------------------------------------------------------------ class families */

export const categories: Category[] = [
  {
    id: "strength",
    name: "Strength",
    plate: "var(--red)",
    line: "Squat, bench, deadlift and press, coached rack by rack.",
  },
  {
    id: "olympic",
    name: "Olympic lifting",
    plate: "var(--blue)",
    line: "Snatch and clean & jerk on dedicated platforms.",
  },
  {
    id: "conditioning",
    name: "Conditioning",
    plate: "var(--yellow)",
    line: "Rowers, bikes, sleds and the Saturday run.",
  },
  {
    id: "recovery",
    name: "Recovery",
    plate: "var(--green)",
    line: "Mobility and breathing so the heavy days keep coming.",
  },
  {
    id: "foundations",
    name: "Foundations",
    plate: "var(--chalk)",
    line: "Four weeks of barbell basics before anything else.",
  },
];

/* ------------------------------------------------------------ classes */

export const classes: GymClass[] = [
  {
    id: "barbell-club",
    name: "Barbell Club",
    category: "strength",
    minutes: 60,
    capacity: 12,
    room: "Rack row",
    level: "After Foundations",
    intensity: 4,
    summary:
      "The four big lifts on a twelve-week wave, two lifters to a rack and a coach who knows your numbers.",
    body: [
      "Barbell Club is the backbone of Iron. Everyone in the room runs the same twelve-week wave — volume first, then intensity, then a test week — but every set is loaded from your own numbers, so a first-year lifter and a 500 lb puller share a rack without anyone waiting.",
      "The coach walks the row, calls cues by name and writes your top set on the board. Miss a session and the plan doesn't break; you pick up on the next day's lift.",
    ],
    blocks: [
      {
        minutes: 10,
        name: "Raise and prime",
        detail: "Rower or bike, then a mobility flow for the day's lift.",
      },
      {
        minutes: 30,
        name: "Main lift",
        detail:
          "Work up to the day's top set, then back-off sets at the prescribed percentage.",
      },
      {
        minutes: 15,
        name: "Secondary lift",
        detail: "Paired with a row, carry or core movement between sets.",
      },
      {
        minutes: 5,
        name: "Log and reset",
        detail: "Numbers on the board, plates back on the tree.",
      },
    ],
    bring: [
      "Flat shoes or lifting shoes",
      "A belt if you use one — we have spares",
      "Your training log or the Iron app",
    ],
    image: {
      src: classBarbell,
      alt: "A lifter in a rack, barbell across her shoulders before an overhead press",
      w: 1200,
      h: 801,
    },
  },
  {
    id: "olympic-lifting",
    name: "Olympic Lifting",
    category: "olympic",
    minutes: 75,
    capacity: 8,
    room: "Platforms",
    level: "All levels, small group",
    intensity: 3,
    summary:
      "Snatch and clean & jerk on eight wooden platforms, taught by a coach who competed on them.",
    body: [
      "The Olympic lifts reward patience. Lena splits the session into positions, pulls and full lifts, so beginners spend weeks with a technique bar while experienced lifters chase singles two platforms over.",
      "Groups are capped at eight so every lift gets watched. Expect video review on the tablet by the chalk bowl and one change to think about, not ten.",
    ],
    blocks: [
      {
        minutes: 15,
        name: "Positions",
        detail:
          "Overhead squat, hang positions and receiving drills with a light bar.",
      },
      {
        minutes: 35,
        name: "Full lifts",
        detail:
          "Snatch or clean & jerk, working to a technical top single or double.",
      },
      {
        minutes: 15,
        name: "Strength",
        detail:
          "Front squat or pulls to build the positions you just practised.",
      },
      {
        minutes: 10,
        name: "Review",
        detail: "One clip each on the tablet, one cue to take home.",
      },
    ],
    bring: [
      "Lifting shoes if you own them",
      "Wrist wraps (optional)",
      "Tape for your thumbs — the hook grip will find them",
    ],
    image: {
      src: classOlympic,
      alt: "Black and white photograph of a lifter gripping a loaded barbell across her back",
      w: 1200,
      h: 801,
    },
  },
  {
    id: "engine",
    name: "Engine",
    category: "conditioning",
    minutes: 45,
    capacity: 16,
    room: "Turf",
    level: "All levels",
    intensity: 5,
    summary:
      "Intervals on rowers, assault bikes, sleds and ropes. Scaled to your breath, not to the person next to you.",
    body: [
      "Engine is the gym's conditioning class, built from the same machines every week so you can see yourself improve: metres rowed, calories on the bike, how far the sled moved.",
      "Every interval has three versions written on the board. Pick the one that leaves you able to talk at the end of the rest. That is the whole trick.",
    ],
    blocks: [
      {
        minutes: 8,
        name: "Warm-up",
        detail: "Easy machine work and dynamic stretches.",
      },
      {
        minutes: 27,
        name: "Intervals",
        detail: "Three rounds of a four-station circuit — work, rest, rotate.",
      },
      {
        minutes: 10,
        name: "Cool down",
        detail: "Walk, breathe, write the scores down.",
      },
    ],
    bring: [
      "Trainers with grip for sled pushes",
      "A full water bottle",
      "A towel — not optional",
    ],
    image: {
      src: classEngine,
      alt: "An athlete driving heavy battle ropes in waves across a warehouse gym floor",
      w: 1200,
      h: 802,
    },
  },
  {
    id: "lunch-circuit",
    name: "Lunch Circuit",
    category: "conditioning",
    minutes: 30,
    capacity: 16,
    room: "Turf",
    level: "All levels",
    intensity: 3,
    summary:
      "Thirty minutes of bands, kettlebells and bodyweight. Back at your desk by one, showered.",
    body: [
      "Built for people who train in a lunch hour. The circuit is posted at 11am on the Iron app, so you know whether to bring your knees or your shoulders.",
      "Short, full-body and kind to joints: no barbells, no max efforts, just steady work and a clock.",
    ],
    blocks: [
      {
        minutes: 5,
        name: "Warm-up",
        detail: "Band work and light kettlebell swings.",
      },
      {
        minutes: 20,
        name: "Circuit",
        detail: "Five stations, forty seconds on, twenty off, four rounds.",
      },
      {
        minutes: 5,
        name: "Stretch",
        detail: "The bits you sit on all afternoon.",
      },
    ],
    bring: ["Trainers", "Water", "Fifteen minutes for the shower"],
    image: {
      src: classCircuit,
      alt: "A group class working with resistance bands under the gym's strip lights",
      w: 1200,
      h: 800,
    },
  },
  {
    id: "build",
    name: "Build",
    category: "strength",
    minutes: 50,
    capacity: 12,
    room: "Dumbbell floor",
    level: "All levels",
    intensity: 3,
    summary:
      "Hypertrophy work with dumbbells, cables and machines. Moderate weights, honest reps, a pump that earns it.",
    body: [
      "Build is for people who want more muscle and less guesswork. Owen programmes the class in four-week blocks, rotating the body parts so you can come twice a week and cover everything.",
      "Sets of eight to fifteen, close to failure, with tempo and rest periods called out loud. You'll learn which machine settings are yours and write them down.",
    ],
    blocks: [
      {
        minutes: 8,
        name: "Prep",
        detail: "Activation for the day's muscle groups.",
      },
      {
        minutes: 32,
        name: "Main sets",
        detail: "Three paired exercises, three to four sets each.",
      },
      {
        minutes: 10,
        name: "Finisher",
        detail: "One high-rep drop set, then stretch.",
      },
    ],
    bring: ["Training log", "Lifting straps if you use them"],
    image: {
      src: classBuild,
      alt: "A woman rowing a dumbbell on a bench in a dark gym",
      w: 1200,
      h: 891,
    },
  },
  {
    id: "mobility",
    name: "Mobility & Reset",
    category: "recovery",
    minutes: 45,
    capacity: 14,
    room: "Studio",
    level: "Everyone",
    intensity: 1,
    summary:
      "Hips, thoracic spine, ankles and breathing. The class that keeps the other classes possible.",
    body: [
      "Sofia's background is sports therapy, and it shows: each session targets the positions lifters lose first — deep hips, an overhead shoulder, ankles that let a knee travel.",
      "It ends with ten minutes of slow breathing on the floor. People who come to Mobility on Sunday squat better on Monday. We have the board notes to prove it.",
    ],
    blocks: [
      {
        minutes: 10,
        name: "Assessment",
        detail: "Quick checks so you know what to work on today.",
      },
      {
        minutes: 25,
        name: "Flow",
        detail:
          "Loaded stretches and end-range strength for hips and shoulders.",
      },
      {
        minutes: 10,
        name: "Downshift",
        detail: "Box breathing on the floor, lights down.",
      },
    ],
    bring: ["Comfortable clothes", "Socks — the studio is shoes-off"],
    image: {
      src: classMobility,
      alt: "Members on mats in a bright brick studio, holding a kneeling hip extension",
      w: 1200,
      h: 800,
    },
  },
  {
    id: "run-club",
    name: "Saturday Run Club",
    category: "conditioning",
    minutes: 60,
    capacity: 30,
    room: "Outside — meet at the roller door",
    level: "5 km and 8 km groups",
    intensity: 2,
    summary:
      "Two routes along the river path, a coach on each, coffee at the door when you're back.",
    body: [
      "Run Club leaves from the roller door at 8:00 sharp. The 5 km group runs conversational pace; the 8 km group adds strides on the long straight past the boathouse.",
      "Members bring friends for free. It's the easiest way to see whether Iron is your kind of place before you set foot on the rubber.",
    ],
    blocks: [
      {
        minutes: 10,
        name: "Drills",
        detail: "Skips, strides and a slow first kilometre.",
      },
      {
        minutes: 40,
        name: "Run",
        detail: "5 km or 8 km, paced by a coach at the front and the back.",
      },
      {
        minutes: 10,
        name: "Stretch and coffee",
        detail: "Back at the door, legs up the wall.",
      },
    ],
    bring: [
      "Running shoes",
      "Layers — the river is colder than you think",
      "A friend, if you like",
    ],
    image: {
      src: classRun,
      alt: "A group of runners heading down a tree-lined path together",
      w: 1200,
      h: 800,
    },
  },
  {
    id: "foundations",
    name: "Foundations",
    category: "foundations",
    minutes: 60,
    capacity: 6,
    room: "Platforms",
    level: "New members",
    intensity: 2,
    summary:
      "A four-week course in the squat, hinge, press and pull. Every new member starts here, whatever they lifted before.",
    body: [
      "Foundations is six people, one coach and four weeks. Week one is bodyweight and a broomstick. By week four you're loading your own bar, setting the safeties and knowing what your first working weights are.",
      "It's included with every membership. Finish it and every class on the timetable is open to you.",
    ],
    blocks: [
      {
        minutes: 10,
        name: "Warm-up",
        detail: "The same routine every week, so you can do it alone.",
      },
      {
        minutes: 35,
        name: "Skill",
        detail: "One lift per week, coached from the floor up.",
      },
      {
        minutes: 15,
        name: "Practice",
        detail: "Light working sets and rack set-up drills.",
      },
    ],
    bring: ["Flat shoes", "Questions — there are no silly ones in Foundations"],
    image: {
      src: classFoundations,
      alt: "A lifter sitting into a back squat in a bright rack bay, plates racked behind him",
      w: 1200,
      h: 800,
    },
  },
];

/* ------------------------------------------------------------ trainers */

export const trainers: Trainer[] = [
  {
    id: "marcus-bell",
    name: "Marcus Bell",
    role: "Head coach · Strength",
    focus: ["strength", "foundations"],
    since: 2014,
    summary:
      "Opened Iron with one rack and a borrowed bar. Still coaches the 5:45.",
    bio: [
      "Marcus spent eight years coaching college athletes before deciding he'd rather coach accountants, nurses and retired firefighters. Iron started with one rack in a machine shop on Foundry Row; it now has twelve, and he still writes Monday's board by hand.",
      "His programming is plain on purpose: a handful of lifts, done often, added to slowly. He is especially good with lifters coming back from back or knee injuries, and with people who were told barbells weren't for them.",
    ],
    specialties: ["Powerlifting", "Returning from injury", "First barbell"],
    qualifications: [
      "Certified Strength & Conditioning Specialist",
      "Weightlifting coach, level 2",
      "First aid & CPR, renewed 2026",
    ],
    quote: "Strong is a thing you get by showing up on boring Tuesdays.",
    ptDays: "Mon, Wed, Fri mornings",
    image: {
      src: coachMarcus,
      alt: "Marcus Bell sitting on a bench between sets, in black training kit",
      w: 1000,
      h: 667,
    },
  },
  {
    id: "lena-varga",
    name: "Lena Varga",
    role: "Olympic lifting coach",
    focus: ["olympic", "strength"],
    since: 2017,
    summary:
      "Former national-level weightlifter. Patient with beginners, ruthless with elbows.",
    bio: [
      "Lena competed in the 64 kg class for nine years and has coached the Olympic lifts at Iron since 2017. She runs the platforms, the meet team and the technique clinic on the first Sunday of every month.",
      "She coaches in small groups because she wants to see every rep. If you've ever been told the snatch is too technical to learn after thirty, she would like a word.",
    ],
    specialties: ["Snatch", "Clean & jerk", "Competition prep"],
    qualifications: [
      "Weightlifting coach, level 3",
      "Sports science degree",
      "Meet referee, regional",
    ],
    quote: "Fast under the bar, slow to judge yourself.",
    ptDays: "Tue, Thu afternoons",
    image: {
      src: coachLena,
      alt: "Black and white portrait of Lena Varga holding a barbell low in a dark gym",
      w: 666,
      h: 1000,
    },
  },
  {
    id: "rae-okafor",
    name: "Rae Okafor",
    role: "Conditioning lead",
    focus: ["conditioning"],
    since: 2019,
    summary:
      "Runs Engine and the Saturday Run Club. Will find the setting on the rower you didn't know existed.",
    bio: [
      "Rae came to Iron as a member training for fitness races and stayed to build the conditioning programme. Engine is hers: machine intervals you can measure week to week, scaled three ways on the board.",
      "She leads Run Club on Saturdays and coaches hybrid athletes who want to be strong and still run a decent 10 km.",
    ],
    specialties: ["Fitness racing", "Running economy", "Rower technique"],
    qualifications: [
      "Personal trainer, level 3",
      "Endurance coaching certificate",
      "Run leader",
    ],
    quote: "If you can't talk in the rest, the work was too fast.",
    ptDays: "Mon, Thu, Sat",
    image: {
      src: coachRae,
      alt: "Rae Okafor holding a barbell at shoulder height, tattoos down both arms",
      w: 1000,
      h: 667,
    },
  },
  {
    id: "dante-reyes",
    name: "Dante Reyes",
    role: "Coach · Conditioning & circuits",
    focus: ["conditioning", "strength"],
    since: 2020,
    summary:
      "Ex-amateur boxer. Runs the lunch circuits and the hardest forty-five minutes on Friday.",
    bio: [
      "Dante boxed for eleven years before a shoulder sent him to the weights room, where he found he liked fixing shoulders more than punching with them. He runs Lunch Circuit and most evening Engine classes.",
      "His personal clients tend to be busy people who want to feel fit, lose some weight and not dread the gym. He keeps it fun and he keeps it on time.",
    ],
    specialties: [
      "Fat loss without crash diets",
      "Boxing conditioning",
      "Shoulder health",
    ],
    qualifications: [
      "Personal trainer, level 3",
      "Nutrition coach, level 1",
      "Boxing coach, level 2",
    ],
    quote: "Thirty good minutes beats ninety you dread.",
    ptDays: "Tue, Wed, Fri",
    image: {
      src: coachDante,
      alt: "Dante Reyes in headphones between sets, dumbbell racks and red steel columns behind him",
      w: 666,
      h: 1000,
    },
  },
  {
    id: "sofia-lindqvist",
    name: "Sofia Lindqvist",
    role: "Coach · Strength & mobility",
    focus: ["recovery", "strength"],
    since: 2018,
    summary:
      "Sports therapist turned strength coach. The person you see when something hurts.",
    bio: [
      "Sofia worked in a sports injury clinic for six years and kept seeing the same people come back. She moved to coaching to catch them earlier. She runs Mobility & Reset, coaches Barbell Club and takes most of our pre- and postnatal clients.",
      "Her sessions start with questions, not exercises: what hurts, what's improving, what you'd like to be able to do with your kids next summer.",
    ],
    specialties: [
      "Pain-free training",
      "Pre- and postnatal strength",
      "Mobility",
    ],
    qualifications: [
      "Sports therapy degree",
      "Pre- and postnatal exercise specialist",
      "Strength coach, level 2",
    ],
    quote: "Mobility is just strength at the end of your range.",
    ptDays: "Mon, Thu, Sun",
    image: {
      src: coachSofia,
      alt: "Sofia Lindqvist holding a split squat with a barbell across her back",
      w: 1000,
      h: 667,
    },
  },
  {
    id: "owen-pratt",
    name: "Owen Pratt",
    role: "Coach · Hypertrophy & Foundations",
    focus: ["strength", "foundations"],
    since: 2021,
    summary:
      "Builds muscle on purpose and teaches most of our Foundations courses.",
    bio: [
      "Owen is the coach new members meet first. He teaches Foundations three times a week and has a gift for making a nervous first session feel ordinary.",
      "He also runs Build, our hypertrophy class, and coaches clients who want visible muscle on a schedule that fits a job. Expect a training log, tempo counts and a lot of encouragement.",
    ],
    specialties: ["Muscle building", "Beginners", "Nutrition basics"],
    qualifications: [
      "Personal trainer, level 3",
      "Nutrition coach, level 2",
      "Kinesiology degree",
    ],
    quote: "Write it down. Beat it next week. Repeat.",
    ptDays: "Tue, Wed, Sat",
    image: {
      src: coachOwen,
      alt: "Owen Pratt pressing a barbell overhead in a squat rack",
      w: 1000,
      h: 667,
    },
  },
];

/* ------------------------------------------------------------ timetable */

const week: [number, string, string, string][] = [
  [0, "05:45", "barbell-club", "marcus-bell"],
  [0, "06:30", "engine", "rae-okafor"],
  [0, "07:15", "mobility", "sofia-lindqvist"],
  [0, "12:15", "lunch-circuit", "dante-reyes"],
  [0, "17:30", "foundations", "owen-pratt"],
  [0, "18:00", "barbell-club", "sofia-lindqvist"],
  [0, "18:30", "engine", "dante-reyes"],
  [0, "19:15", "build", "owen-pratt"],
  [1, "05:45", "engine", "rae-okafor"],
  [1, "06:30", "olympic-lifting", "lena-varga"],
  [1, "12:15", "lunch-circuit", "dante-reyes"],
  [1, "17:30", "build", "owen-pratt"],
  [1, "18:00", "olympic-lifting", "lena-varga"],
  [1, "18:30", "engine", "rae-okafor"],
  [1, "19:30", "mobility", "sofia-lindqvist"],
  [2, "05:45", "barbell-club", "marcus-bell"],
  [2, "06:30", "engine", "dante-reyes"],
  [2, "12:15", "lunch-circuit", "rae-okafor"],
  [2, "17:30", "foundations", "marcus-bell"],
  [2, "18:00", "barbell-club", "marcus-bell"],
  [2, "18:30", "engine", "dante-reyes"],
  [2, "19:15", "build", "owen-pratt"],
  [3, "05:45", "engine", "rae-okafor"],
  [3, "06:30", "olympic-lifting", "lena-varga"],
  [3, "07:15", "mobility", "sofia-lindqvist"],
  [3, "12:15", "lunch-circuit", "dante-reyes"],
  [3, "17:30", "build", "owen-pratt"],
  [3, "18:00", "olympic-lifting", "lena-varga"],
  [3, "18:30", "engine", "rae-okafor"],
  [3, "19:30", "mobility", "sofia-lindqvist"],
  [4, "05:45", "barbell-club", "sofia-lindqvist"],
  [4, "06:30", "engine", "dante-reyes"],
  [4, "12:15", "lunch-circuit", "dante-reyes"],
  [4, "17:30", "barbell-club", "marcus-bell"],
  [4, "18:15", "engine", "rae-okafor"],
  [5, "08:00", "run-club", "rae-okafor"],
  [5, "09:00", "barbell-club", "marcus-bell"],
  [5, "09:30", "olympic-lifting", "lena-varga"],
  [5, "10:30", "engine", "dante-reyes"],
  [5, "11:00", "foundations", "owen-pratt"],
  [6, "09:00", "mobility", "sofia-lindqvist"],
  [6, "10:00", "build", "owen-pratt"],
];

export const slots: Slot[] = week.map(([day, time, classId, trainerId]) => ({
  day,
  time,
  classId,
  trainerId,
}));

export const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* ------------------------------------------------------------ memberships */

export const plans: Plan[] = [
  {
    id: "open",
    name: "Open Gym",
    monthly: 79,
    annual: 790,
    pitch: "The floor, the racks and the platforms, on your own programme.",
    includes: [
      "Open gym, all staffed hours",
      "Foundations course",
      "Programme builder",
      "Lockers and towels",
    ],
  },
  {
    id: "classes",
    name: "Classes",
    monthly: 149,
    annual: 1490,
    pitch: "Every class on the timetable, plus the floor whenever you want it.",
    includes: [
      "Unlimited classes",
      "Open gym, all staffed hours",
      "Foundations course",
      "Quarterly strength test with a coach",
    ],
  },
  {
    id: "coached",
    name: "Coached",
    monthly: 289,
    annual: 2890,
    pitch: "A coach who writes your programme and trains you twice a month.",
    includes: [
      "Two 60-minute personal sessions a month",
      "Written programme, updated every block",
      "Unlimited classes and open gym",
      "Video form review in the app",
    ],
  },
];

export const joiningFee = 49;

export const extras = [
  {
    name: "Day pass",
    price: 25,
    note: "Open gym or one class. Bring photo ID.",
  },
  {
    name: "Ten-class pack",
    price: 190,
    note: "Valid for four months, shareable with nobody.",
  },
  {
    name: "Student or first-responder rate",
    price: null,
    note: "15% off any monthly plan with valid ID.",
  },
];

export const ptRates = [
  {
    name: "Single session",
    sessions: 1,
    price: 95,
    note: "60 minutes with any coach",
  },
  {
    name: "Five-session block",
    sessions: 5,
    price: 440,
    note: "Use within ten weeks",
  },
  {
    name: "Ten-session block",
    sessions: 10,
    price: 820,
    note: "Use within twenty weeks",
  },
];

export const compare: {
  label: string;
  open: boolean | string;
  classes: boolean | string;
  coached: boolean | string;
}[] = [
  {
    label: "Open gym, staffed hours",
    open: true,
    classes: true,
    coached: true,
  },
  {
    label: "Foundations four-week course",
    open: true,
    classes: true,
    coached: true,
  },
  {
    label: "Classes on the timetable",
    open: "Day-pass rate",
    classes: "Unlimited",
    coached: "Unlimited",
  },
  {
    label: "Personal training",
    open: "$95 a session",
    classes: "$95 a session",
    coached: "2 a month included",
  },
  {
    label: "Written programme",
    open: "Builder only",
    classes: "Builder only",
    coached: "From your coach",
  },
  {
    label: "Quarterly strength test",
    open: false,
    classes: true,
    coached: true,
  },
  {
    label: "Bring a friend, Saturdays",
    open: true,
    classes: true,
    coached: true,
  },
  {
    label: "Freeze up to 8 weeks a year",
    open: true,
    classes: true,
    coached: true,
  },
];

export const policies = [
  {
    title: "No contract",
    text: "Monthly plans roll month to month. Cancel with 30 days' notice from the app or at the desk.",
  },
  {
    title: "Joining fee",
    text: `A one-off $${joiningFee} on monthly plans covers your Foundations course. Annual plans skip it.`,
  },
  {
    title: "Freezes",
    text: "Injured, travelling or newly a parent? Freeze for up to eight weeks a year at no charge.",
  },
];

export const faqs = [
  {
    q: "I've never lifted a barbell. Is Iron for me?",
    a: "Yes — most of our members hadn't either. Every membership starts with Foundations: four weeks, six people, one coach. Nobody joins Barbell Club until they've finished it.",
  },
  {
    q: "Can I try a class before I join?",
    a: "Saturday Run Club is free for anyone a member brings. Otherwise a day pass is $25 and we take it off your first month if you join within a week.",
  },
  {
    q: "What's the difference between Classes and Coached?",
    a: "Classes gets you every session on the timetable. Coached adds two personal sessions a month and a written programme from one coach, who adjusts it every four weeks based on your log.",
  },
  {
    q: "Do I have to book classes?",
    a: "Yes, in the app, up to seven days ahead. Barbell Club and Olympic Lifting are capped by racks and platforms, so book early for the 5:45 and the 6pm.",
  },
  {
    q: "Is there parking?",
    a: "Twenty spaces in the Riverside Works yard, free for members, plus covered bike racks inside the roller door. The 14 bus stops at Foundry Row.",
  },
  {
    q: "Can I switch plans later?",
    a: "Any time, from the first of the next month. Moving up to Coached takes effect as soon as a coach has room on their schedule.",
  },
];

/* ------------------------------------------------------------ programme builder */

export const lifts: { id: Lift; name: string; fallback: number }[] = [
  { id: "squat", name: "Back squat", fallback: 185 },
  { id: "bench", name: "Bench press", fallback: 135 },
  { id: "deadlift", name: "Deadlift", fallback: 225 },
  { id: "press", name: "Overhead press", fallback: 95 },
];

export const goals: {
  id: Goal;
  name: string;
  line: string;
  classId: string;
}[] = [
  {
    id: "strength",
    name: "Get strong",
    line: "Heavier triples and fives, long rests.",
    classId: "barbell-club",
  },
  {
    id: "muscle",
    name: "Build muscle",
    line: "More sets of eight, closer to failure.",
    classId: "build",
  },
  {
    id: "engine",
    name: "Get fit",
    line: "Lighter lifting, a conditioning piece every day.",
    classId: "engine",
  },
];

export const levels: { id: Level; name: string; line: string }[] = [
  { id: "new", name: "New to lifting", line: "Under six months" },
  {
    id: "returning",
    name: "Coming back",
    line: "Lifted before, out of practice",
  },
  {
    id: "experienced",
    name: "Experienced",
    line: "Two years or more, consistent",
  },
];

/** Accessories that follow each main lift, by goal. */
export const accessories: Record<Lift, Record<Goal, string[]>> = {
  squat: {
    strength: ["Paused box squat 3×3", "Back extension 3×10"],
    muscle: ["Walking lunge 3×10 each leg", "Leg extension 3×15"],
    engine: ["Goblet squat 3×12", "Step-up 3×10 each leg"],
  },
  bench: {
    strength: ["Close-grip bench 3×5", "Chest-supported row 4×8"],
    muscle: ["Incline dumbbell press 4×10", "Cable row 4×12"],
    engine: ["Push-up 3×max", "Ring row 3×12"],
  },
  deadlift: {
    strength: ["Romanian deadlift 3×6", "Weighted plank 3×30s"],
    muscle: ["Romanian deadlift 3×10", "Lat pulldown 4×12"],
    engine: ["Kettlebell swing 4×15", "Hollow hold 3×30s"],
  },
  press: {
    strength: ["Weighted chin-up 4×4", "Push press 3×3"],
    muscle: ["Lateral raise 4×15", "Chin-up 3×max"],
    engine: ["Landmine press 3×10", "Band pull-apart 3×20"],
  },
};

export const finishers: Record<Goal, string> = {
  strength: "Farmer carry 4 × 40 m, heavy",
  muscle: "Curl and pushdown superset 3 × 15",
  engine: "EMOM 12: 12 cal row, then 10 burpees",
};

/* ------------------------------------------------------------ pages */

export const home = {
  title: "Heavy iron. Honest coaching.",
  intro:
    "A barbell gym and personal-training floor on Foundry Row: twelve racks, eight platforms, six coaches and a class timetable that starts at 5:45 every weekday.",
  hero: {
    src: hero,
    alt: "A lifter in wrist wraps gripping a loaded barbell over black rubber floor tiles, about to pull",
    w: 1600,
    h: 1066,
  } as Img,
  coaching: {
    title: "Personal training that writes things down",
    text: "Every coach at Iron works from a log, not a mood. Your first session is a movement screen and a conversation. After that you get a written block, sessions that follow it, and numbers that go up.",
    points: [
      "One coach, one programme, reviewed every four weeks",
      "Sessions in the gym's quiet hours, so the rack is yours",
      "Video review in the app between sessions",
    ],
    image: {
      src: coaching,
      alt: "A coach kneeling beside a member, a hand on his shoulder to cue a push-up on the turf",
      w: 1400,
      h: 933,
    } as Img,
  },
  floor: {
    title: "The floor",
    text: "A former machine shop with a fourteen-foot roller door, rubber over concrete and enough chalk in the air to see the light come in.",
    image: {
      src: floor,
      alt: "The warehouse gym floor at Iron with benches, racks and skylights",
      w: 1600,
      h: 1067,
    } as Img,
  },
  voices: [
    {
      quote:
        "I came in for Foundations at forty-six, terrified of the barbell. Eighteen months later I pulled 275 at the Christmas meet with half the 5:45 class shouting my name.",
      name: "Denise K.",
      detail: "Member since 2024 · Barbell Club",
    },
    {
      quote:
        "Lena fixed a pull I'd been doing wrong for four years in one Tuesday.",
      name: "Tom A.",
      detail: "Olympic Lifting",
    },
    {
      quote: "Lunch Circuit is the only meeting in my calendar I never move.",
      name: "Priya S.",
      detail: "Lunch Circuit, three times a week",
    },
  ],
  close: {
    title: "Your first four weeks are coached",
    text: "Every membership starts with Foundations. Pick a plan, choose a start date and we'll put you in a group of six.",
  },
};

export const floorSpecs: { item: string; detail: string }[] = [
  {
    item: "12 power racks",
    detail: "Spotter arms, J-cups and band pegs on every one",
  },
  {
    item: "8 lifting platforms",
    detail: "Oak centre, rubber wings, a bumper set each",
  },
  {
    item: "Calibrated plates",
    detail: "Colour-coded, 2.5 to 55 lb, checked every quarter",
  },
  {
    item: "Dumbbells to 150 lb",
    detail: "In 5 lb steps, plus adjustable pairs for the turf",
  },
  { item: "25 m turf lane", detail: "Two sleds, a yoke and farmers handles" },
  { item: "Conditioning", detail: "10 rowers, 8 air bikes, 4 ski ergs" },
  {
    item: "Studio",
    detail: "Sprung floor, mats, foam rollers, lights that dim",
  },
  {
    item: "Changing rooms",
    detail: "Showers, lockers, towels and a hairdryer that works",
  },
];

export const about = {
  title: "A machine shop with better lighting",
  intro:
    "Iron opened in 2014 in the back half of a closed tool-and-die shop on Foundry Row. One rack, one borrowed bar and Marcus Bell coaching six people at 5:45 in the morning. Twelve years later the shop is ours, end to end.",
  story: [
    "We built Iron for people who want to get strong and need someone to show them how. Not a bodybuilding temple, not a boutique, not a warehouse of machines nobody explains. A place with good barbells, coaches on the floor at every hour we're open, and a timetable you can plan a working week around.",
    "Most of our members are between thirty and sixty. Most had never touched a barbell before Foundations. Some of them now compete; most of them just carry the shopping in one trip and sleep better. We count both as wins.",
  ],
  rules: [
    {
      title: "Re-rack your plates",
      text: "Plates back on the tree, collars on the hook, bar back in the J-cups.",
    },
    {
      title: "Chalk stays in the bowl",
      text: "Use as much as you like. Over the bowl.",
    },
    {
      title: "Ask for a spot, give a spot",
      text: "Anyone on the floor will spot you. You'll spot them back.",
    },
    {
      title: "Phones down between sets",
      text: "Film your lifts, sure. Scroll somewhere else.",
    },
    {
      title: "Coaches coach everyone",
      text: "If a coach gives you a cue during open gym, it's free. Take it.",
    },
  ],
  access: [
    "Step-free entry through the roller door and the side ramp",
    "Accessible changing room and shower on the ground floor",
    "Assistance dogs welcome everywhere except the platform area",
    "Quiet hours, weekdays 1pm – 4pm: lower music, no drops",
  ],
  getting: [
    {
      title: "By bus",
      text: "Route 14 stops at Foundry Row, two minutes' walk.",
    },
    {
      title: "By bike",
      text: "Covered racks for 30 bikes inside the roller door.",
    },
    {
      title: "By car",
      text: "Free member parking in the Riverside Works yard — 20 spaces.",
    },
  ],
  images: {
    dumbbells: {
      src: dumbbells,
      alt: "Rows of dumbbells racked down the length of the gym",
      w: 1400,
      h: 933,
    } as Img,
  },
};

export const programmePage = {
  title: "Programme builder",
  intro:
    "Tell us your goal, how many days you can train and roughly what you lift. You'll get a four-week block with every working weight worked out — tap any lift to see exactly what goes on the bar.",
  image: {
    src: grip,
    alt: "Seen from above, a wrapped wrist and hand taking grip on a loaded barbell",
    w: 1400,
    h: 933,
  } as Img,
};

export const notFound = {
  title: "Missed the lift",
  text: "That page isn't on the board. It may have moved, or the link was mistyped.",
  image: {
    src: darkPull,
    alt: "A lifter in near darkness, crouched over a barbell before a pull",
    w: 1800,
    h: 1200,
  } as Img,
};
