import hero from "./assets/hero.jpg";
import whiteWall from "./assets/white-wall.jpg";
import volumes from "./assets/volumes.jpg";
import blueWall from "./assets/blue-wall.jpg";
import holds from "./assets/holds.jpg";
import twoHolds from "./assets/two-holds.jpg";
import greyBoulder from "./assets/grey-boulder.jpg";
import ropeWhite from "./assets/rope-white.jpg";
import orangeWall from "./assets/orange-wall.jpg";
import pinkWall from "./assets/pink-wall.jpg";
import tallWall from "./assets/tall-wall.jpg";
import feet from "./assets/feet.jpg";
import lookingUp from "./assets/looking-up.jpg";
import board from "./assets/board.jpg";
import youth from "./assets/youth.jpg";
import outdoor from "./assets/outdoor.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Summit",
  long: "Summit Climbing",
  tagline:
    "Six walls, one reset every Tuesday, and always something new to try.",
  street: "1400 Foundry Street",
  city: "Riverside District",
  email: "hello@summit.example",
  phone: "+1 555 0142 880",
  phoneHref: "tel:+15550142880",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Strava", href: "https://www.strava.com/" },
  ],
};

export const images = {
  hero,
  whiteWall,
  volumes,
  holds,
  twoHolds,
  tallWall,
  youth,
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/routes", label: "Route map" },
  { to: "/classes", label: "Classes" },
  { to: "/memberships", label: "Memberships" },
  { to: "/events", label: "Events" },
  { to: "/youth", label: "Youth team" },
  { to: "/visit", label: "Visit" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Climb",
    links: [
      { to: "/routes", label: "Route map" },
      { to: "/book", label: "Book a day pass" },
      { to: "/memberships", label: "Memberships & prices" },
      { to: "/visit", label: "Hours & first visit" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/classes", label: "Classes & courses" },
      { to: "/classes/first-moves", label: "First Moves intro" },
      { to: "/youth", label: "Youth team" },
      { to: "/events", label: "Events & comps" },
    ],
  },
  {
    title: "Summit",
    links: [
      { to: "/about", label: "About & setters" },
      { to: "/visit", label: "Getting here" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "Reset Tuesday",
  text: "One email a week: which wall was reset, the new problems worth trying, and what's on.",
};

/* ------------------------------------------------------------ hours */

/** Sunday-first; [open, close] in 24h time. */
export type Hours = [string, string];
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const hours: Hours[] = [
  ["09:00", "21:00"],
  ["07:00", "23:00"],
  ["07:00", "23:00"],
  ["07:00", "23:00"],
  ["07:00", "23:00"],
  ["07:00", "22:00"],
  ["09:00", "21:00"],
];
export const hoursNote =
  "Tuesdays the wall being reset is roped off until 16:00. Everything else stays open.";

/* ------------------------------------------------------------ circuits & walls */

export type CircuitId =
  "yellow" | "green" | "blue" | "purple" | "red" | "black";
export type Circuit = {
  id: CircuitId;
  label: string;
  range: string;
  color: string;
  /** Text colour on top of `color`. */
  on: string;
  /** Hold size on the drawn wall: big jugs on yellow, small crimps on black. */
  size: number;
  note: string;
};

export const circuits: Circuit[] = [
  {
    id: "yellow",
    label: "Yellow",
    range: "VB–V0",
    color: "#f2c53d",
    on: "#16181a",
    size: 17,
    note: "Big holds, obvious feet. Your first hour.",
  },
  {
    id: "green",
    label: "Green",
    range: "V1–V2",
    color: "#3fae6a",
    on: "#16181a",
    size: 14,
    note: "Still friendly, now with a move to think about.",
  },
  {
    id: "blue",
    label: "Blue",
    range: "V2–V4",
    color: "#2f6fdb",
    on: "#ffffff",
    size: 12,
    note: "Where technique starts to matter more than reach.",
  },
  {
    id: "purple",
    label: "Purple",
    range: "V4–V5",
    color: "#7a4fc9",
    on: "#ffffff",
    size: 11,
    note: "Committing moves, smaller holds, real beta.",
  },
  {
    id: "red",
    label: "Red",
    range: "V5–V7",
    color: "#cf332b",
    on: "#ffffff",
    size: 9.5,
    note: "Projects. Expect a few sessions.",
  },
  {
    id: "black",
    label: "Black",
    range: "V7+",
    color: "#16181a",
    on: "#ffffff",
    size: 8,
    note: "The hardest thing on each wall. Setters' playground.",
  },
];

export type Wall = {
  id: string;
  name: string;
  angle: string;
  height: string;
  setDate: string;
  nextReset: string;
  blurb: string;
  /** Elevation face in a 800 × 420 box; `top` is the lowest point of its top edge. */
  outline: string;
  top: number;
  volumes: string[];
  /** Floor-plan stroke in a 640 × 400 box, plus label anchor. */
  plan: string;
  label: [number, number];
};

export const walls: Wall[] = [
  {
    id: "cave",
    name: "The Cave",
    angle: "45° roof",
    height: "4.2 m",
    setDate: "2026-10-13",
    nextReset: "2026-11-24",
    blurb:
      "Our steepest terrain: a full roof into a lip. Heel hooks, toe hooks and keeping your core switched on.",
    outline: "M0 420 V70 L140 38 L330 58 L520 24 L800 52 V420 Z",
    top: 70,
    volumes: [
      "210,170 300,120 330,220",
      "520,90 640,70 600,170",
      "380,260 470,230 450,320",
    ],
    plan: "M44 132 V44 H206",
    label: [56, 76],
  },
  {
    id: "comp",
    name: "Comp Wall",
    angle: "15° to 35°",
    height: "4.5 m",
    setDate: "2026-10-06",
    nextReset: "2026-11-17",
    blurb:
      "Set in competition style: coordination, run-and-jumps and big volumes. Where league rounds happen.",
    outline: "M0 420 V40 H800 V420 Z",
    top: 40,
    volumes: [
      "120,140 230,100 220,230",
      "330,180 430,150 470,250 360,270",
      "600,90 720,120 650,200",
    ],
    plan: "M226 44 H440",
    label: [240, 76],
  },
  {
    id: "prow",
    name: "The Prow",
    angle: "30° arête",
    height: "4.0 m",
    setDate: "2026-09-29",
    nextReset: "2026-11-10",
    blurb:
      "A freestanding ship's bow in the middle of the hall. Two faces meet on a sharp arête you can squeeze.",
    outline: "M0 420 V110 L400 30 L800 110 V420 Z",
    top: 110,
    volumes: ["380,140 420,140 440,260 360,260", "150,250 240,220 230,310"],
    plan: "M206 238 L276 156 L346 238 Z",
    label: [222, 268],
  },
  {
    id: "slab",
    name: "Slab Row",
    angle: "80° slab",
    height: "4.3 m",
    setDate: "2026-09-22",
    nextReset: "2026-11-03",
    blurb:
      "Less than vertical and more honest than it looks. Trust your feet, smear, and keep your hips in.",
    outline: "M0 420 V60 L800 40 V420 Z",
    top: 60,
    volumes: ["300,200 360,170 380,240", "560,120 640,110 610,190"],
    plan: "M44 156 V300",
    label: [56, 236],
  },
  {
    id: "barrel",
    name: "The Barrel",
    angle: "Rounded 20° bulge",
    height: "4.0 m",
    setDate: "2026-09-15",
    nextReset: "2026-10-27",
    blurb:
      "A curved wall that rewards slopers and body tension. The angle changes under you as you climb.",
    outline: "M0 420 V60 Q400 0 800 60 V420 Z",
    top: 60,
    volumes: ["260,150 330,130 340,210", "500,210 590,190 560,280"],
    plan: "M440 70 Q414 165 440 262",
    label: [292, 112],
  },
  {
    id: "kids",
    name: "Little Peaks",
    angle: "Vertical, 2.8 m",
    height: "2.8 m",
    setDate: "2026-09-08",
    nextReset: "2026-10-20",
    blurb:
      "A lower wall with deep matting for younger climbers and very first sessions. Adults welcome on the easy lines.",
    outline: "M0 420 V150 L200 130 L400 150 L600 130 L800 150 V420 Z",
    top: 150,
    volumes: ["340,240 420,220 420,300"],
    plan: "M300 318 H440",
    label: [300, 306],
  },
];

export type Problem = {
  id: string;
  name: string;
  wall: string;
  circuit: CircuitId;
  grade: string;
  setter: string;
  styles: string[];
  /** Start and finish position across the wall, 0–100. */
  start: number;
  finish: number;
  moves: number;
  seed: number;
  beta: string;
};

export const problems: Problem[] = [
  {
    id: "batwing",
    name: "Batwing",
    wall: "cave",
    circuit: "yellow",
    grade: "V0",
    setter: "Eli",
    styles: ["Jugs", "Overhang"],
    start: 8,
    finish: 22,
    moves: 6,
    seed: 11,
    beta: "Big jugs all the way along the roof. Keep your arms straight and walk your feet.",
  },
  {
    id: "low-ceiling",
    name: "Low Ceiling",
    wall: "cave",
    circuit: "green",
    grade: "V2",
    setter: "Priya",
    styles: ["Heel hooks", "Overhang"],
    start: 20,
    finish: 34,
    moves: 7,
    seed: 23,
    beta: "Left heel on the volume, then reach. The finish jug is bigger than it looks from below.",
  },
  {
    id: "stalactite",
    name: "Stalactite",
    wall: "cave",
    circuit: "blue",
    grade: "V3",
    setter: "Noa",
    styles: ["Pinches", "Compression"],
    start: 46,
    finish: 58,
    moves: 6,
    seed: 37,
    beta: "Squeeze the two hanging pinches and bring your feet up high before letting go.",
  },
  {
    id: "dark-matter",
    name: "Dark Matter",
    wall: "cave",
    circuit: "purple",
    grade: "V5",
    setter: "Sam",
    styles: ["Toe hooks", "Overhang"],
    start: 62,
    finish: 50,
    moves: 8,
    seed: 41,
    beta: "Toe hook the lip of the low volume to stop the swing, then match on the sloper rail.",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    wall: "cave",
    circuit: "red",
    grade: "V6",
    setter: "Noa",
    styles: ["Crimps", "Overhang"],
    start: 78,
    finish: 70,
    moves: 7,
    seed: 53,
    beta: "Crimps through the roof. Rest on the kneebar before the last two moves; you'll need it.",
  },
  {
    id: "undertow",
    name: "The Undertow",
    wall: "cave",
    circuit: "black",
    grade: "V8",
    setter: "Eli",
    styles: ["Slopers", "Compression"],
    start: 92,
    finish: 82,
    moves: 9,
    seed: 67,
    beta: "Nine hard moves out the full roof. The crux is the bump from the undercling to the blank sloper.",
  },

  {
    id: "warm-up-lap",
    name: "Warm-Up Lap",
    wall: "comp",
    circuit: "yellow",
    grade: "V1",
    setter: "Sam",
    styles: ["Jugs", "Volumes"],
    start: 10,
    finish: 18,
    moves: 5,
    seed: 71,
    beta: "Stand on the volume, not next to it. A good one to start every league night on.",
  },
  {
    id: "coordination",
    name: "Coordination",
    wall: "comp",
    circuit: "green",
    grade: "V2",
    setter: "Priya",
    styles: ["Coordination", "Volumes"],
    start: 26,
    finish: 30,
    moves: 6,
    seed: 83,
    beta: "Two-step: step through left foot, then catch the next volume with your right hand.",
  },
  {
    id: "run-and-jump",
    name: "Run & Jump",
    wall: "comp",
    circuit: "blue",
    grade: "V4",
    setter: "Sam",
    styles: ["Dyno", "Coordination"],
    start: 36,
    finish: 46,
    moves: 4,
    seed: 97,
    beta: "Two steps from the left and a hop onto the start volume. Commit to it; half-jumps don't stick.",
  },
  {
    id: "double-dyno",
    name: "Double Dyno",
    wall: "comp",
    circuit: "purple",
    grade: "V5",
    setter: "Eli",
    styles: ["Dyno"],
    start: 54,
    finish: 60,
    moves: 5,
    seed: 101,
    beta: "Both hands leave together. Sink low, look at the target, then push through your legs.",
  },
  {
    id: "final-round",
    name: "Final Round",
    wall: "comp",
    circuit: "red",
    grade: "V7",
    setter: "Noa",
    styles: ["Volumes", "Slopers"],
    start: 72,
    finish: 82,
    moves: 7,
    seed: 113,
    beta: "Palm the dual-tex volume and run your feet. The top is a mantle onto the slab edge.",
  },
  {
    id: "superfinal",
    name: "Superfinal",
    wall: "comp",
    circuit: "black",
    grade: "V9",
    setter: "Noa",
    styles: ["Coordination", "Pinches"],
    start: 90,
    finish: 86,
    moves: 8,
    seed: 127,
    beta: "A full-span pinch sequence and a paddle dyno to finish. Set for the regional qualifier.",
  },

  {
    id: "ships-bell",
    name: "Ship's Bell",
    wall: "prow",
    circuit: "yellow",
    grade: "V0",
    setter: "Priya",
    styles: ["Jugs", "Arete"],
    start: 12,
    finish: 30,
    moves: 5,
    seed: 131,
    beta: "Climb the left face to the bell-shaped jug at the top. Great first lap.",
  },
  {
    id: "figurehead",
    name: "Figurehead",
    wall: "prow",
    circuit: "green",
    grade: "V1",
    setter: "Eli",
    styles: ["Arete"],
    start: 32,
    finish: 46,
    moves: 6,
    seed: 139,
    beta: "Hug the arête. Your left hand slaps it the whole way while feet stay on the right face.",
  },
  {
    id: "starboard",
    name: "Starboard",
    wall: "prow",
    circuit: "blue",
    grade: "V3",
    setter: "Sam",
    styles: ["Pinches", "Arete"],
    start: 60,
    finish: 52,
    moves: 6,
    seed: 149,
    beta: "Right-hand pinch on the prow, high left foot, and stand up into the slot.",
  },
  {
    id: "keel-haul",
    name: "Keel Haul",
    wall: "prow",
    circuit: "purple",
    grade: "V4",
    setter: "Noa",
    styles: ["Compression", "Heel hooks"],
    start: 44,
    finish: 40,
    moves: 7,
    seed: 157,
    beta: "Starts sitting under the bow. Squeeze both faces and hook your heel around the arête.",
  },
  {
    id: "crows-nest",
    name: "Crow's Nest",
    wall: "prow",
    circuit: "red",
    grade: "V6",
    setter: "Priya",
    styles: ["Crimps", "Mantle"],
    start: 76,
    finish: 62,
    moves: 7,
    seed: 163,
    beta: "Tiny crimps on the right face and a top-out over the point. Check the top before you try it.",
  },
  {
    id: "mutiny",
    name: "Mutiny",
    wall: "prow",
    circuit: "black",
    grade: "V7",
    setter: "Eli",
    styles: ["Dyno", "Arete"],
    start: 88,
    finish: 48,
    moves: 6,
    seed: 173,
    beta: "A sideways dyno from the right face to the arête. Most people swing off twice before it clicks.",
  },

  {
    id: "tiptoe",
    name: "Tiptoe",
    wall: "slab",
    circuit: "yellow",
    grade: "VB",
    setter: "Priya",
    styles: ["Slab", "Jugs"],
    start: 8,
    finish: 14,
    moves: 5,
    seed: 181,
    beta: "Small steps, straight arms. Look at your feet before every move.",
  },
  {
    id: "glass-floor",
    name: "Glass Floor",
    wall: "slab",
    circuit: "green",
    grade: "V2",
    setter: "Noa",
    styles: ["Slab"],
    start: 24,
    finish: 30,
    moves: 7,
    seed: 191,
    beta: "There are no feet, only wall. Smear high and trust the rubber.",
  },
  {
    id: "smear-campaign",
    name: "Smear Campaign",
    wall: "slab",
    circuit: "blue",
    grade: "V3",
    setter: "Eli",
    styles: ["Slab", "Volumes"],
    start: 40,
    finish: 46,
    moves: 6,
    seed: 199,
    beta: "Rock over onto the volume with no hands. Arms out like you're carrying trays.",
  },
  {
    id: "balance-sheet",
    name: "Balance Sheet",
    wall: "slab",
    circuit: "purple",
    grade: "V4",
    setter: "Sam",
    styles: ["Slab", "Crimps"],
    start: 56,
    finish: 62,
    moves: 7,
    seed: 211,
    beta: "A long sequence of small edges. Rest is wherever your hips are over your feet.",
  },
  {
    id: "paper-thin",
    name: "Paper Thin",
    wall: "slab",
    circuit: "red",
    grade: "V5",
    setter: "Noa",
    styles: ["Slab", "Mantle"],
    start: 72,
    finish: 76,
    moves: 6,
    seed: 223,
    beta: "The crux is standing up from the mantle with nothing for your hands. Go slow.",
  },
  {
    id: "friction-burn",
    name: "Friction Burn",
    wall: "slab",
    circuit: "black",
    grade: "V7",
    setter: "Priya",
    styles: ["Slab", "Dyno"],
    start: 86,
    finish: 90,
    moves: 5,
    seed: 227,
    beta: "A running jump on a slab. Yes, really. Land the foot first, then the hands.",
  },

  {
    id: "rollover",
    name: "Rollover",
    wall: "barrel",
    circuit: "yellow",
    grade: "V0",
    setter: "Sam",
    styles: ["Jugs"],
    start: 14,
    finish: 20,
    moves: 5,
    seed: 233,
    beta: "Up the side of the barrel on jugs, then roll over the top hold to finish.",
  },
  {
    id: "barrel-roll",
    name: "Barrel Roll",
    wall: "barrel",
    circuit: "green",
    grade: "V1",
    setter: "Eli",
    styles: ["Slopers"],
    start: 30,
    finish: 38,
    moves: 6,
    seed: 239,
    beta: "Your first slopers: open hand, low hips, and keep moving.",
  },
  {
    id: "cooper",
    name: "Cooper",
    wall: "barrel",
    circuit: "blue",
    grade: "V3",
    setter: "Priya",
    styles: ["Slopers", "Heel hooks"],
    start: 44,
    finish: 52,
    moves: 7,
    seed: 241,
    beta: "Heel hook on the left volume to take weight off the slopers through the middle.",
  },
  {
    id: "top-shelf",
    name: "Top Shelf",
    wall: "barrel",
    circuit: "purple",
    grade: "V4",
    setter: "Noa",
    styles: ["Compression", "Slopers"],
    start: 58,
    finish: 66,
    moves: 7,
    seed: 251,
    beta: "Squeeze the two volumes and walk your feet up until you can reach the shelf.",
  },
  {
    id: "hoop-stress",
    name: "Hoop Stress",
    wall: "barrel",
    circuit: "red",
    grade: "V6",
    setter: "Sam",
    styles: ["Slopers"],
    start: 74,
    finish: 70,
    moves: 8,
    seed: 257,
    beta: "Sloper traverse along the bulge. Body tension, not grip strength.",
  },
  {
    id: "cask-strength",
    name: "Cask Strength",
    wall: "barrel",
    circuit: "black",
    grade: "V8",
    setter: "Eli",
    styles: ["Pinches", "Toe hooks"],
    start: 90,
    finish: 80,
    moves: 8,
    seed: 263,
    beta: "Bicycle the last volume with a toe and heel and slap for the pinch.",
  },

  {
    id: "ladybird",
    name: "Ladybird",
    wall: "kids",
    circuit: "yellow",
    grade: "VB",
    setter: "Sam",
    styles: ["Jugs"],
    start: 10,
    finish: 16,
    moves: 4,
    seed: 269,
    beta: "Big red jugs like a ladder. A great first climb at any age.",
  },
  {
    id: "treehouse",
    name: "Treehouse",
    wall: "kids",
    circuit: "yellow",
    grade: "V0",
    setter: "Priya",
    styles: ["Jugs", "Volumes"],
    start: 26,
    finish: 32,
    moves: 5,
    seed: 271,
    beta: "Step onto the wooden volume and reach for the treehouse hold at the top.",
  },
  {
    id: "squirrel",
    name: "Squirrel",
    wall: "kids",
    circuit: "green",
    grade: "V1",
    setter: "Sam",
    styles: ["Coordination"],
    start: 40,
    finish: 48,
    moves: 5,
    seed: 277,
    beta: "A little hop at the end. Squat down, then spring up to the finish.",
  },
  {
    id: "rocket",
    name: "Rocket",
    wall: "kids",
    circuit: "green",
    grade: "V1",
    setter: "Eli",
    styles: ["Jugs"],
    start: 56,
    finish: 60,
    moves: 5,
    seed: 281,
    beta: "Straight up the middle. Count the holds out loud with a friend.",
  },
  {
    id: "tadpole",
    name: "Tadpole",
    wall: "kids",
    circuit: "blue",
    grade: "V2",
    setter: "Priya",
    styles: ["Slab"],
    start: 70,
    finish: 74,
    moves: 5,
    seed: 283,
    beta: "Feet first. The hands are small on purpose.",
  },
  {
    id: "dragon-tail",
    name: "Dragon Tail",
    wall: "kids",
    circuit: "blue",
    grade: "V3",
    setter: "Noa",
    styles: ["Crimps"],
    start: 86,
    finish: 80,
    moves: 6,
    seed: 293,
    beta: "The youth team's warm-up favourite. Small holds, long reach at the end.",
  },
];

/* ------------------------------------------------------------ team */

export type Person = {
  id: string;
  name: string;
  role: string;
  bio: string;
  since: string;
  style: string;
};

export const team: Person[] = [
  {
    id: "noa",
    name: "Noa Brandt",
    role: "Head setter",
    bio: "Has set for regional comps for nine years. Runs the Tuesday reset and keeps the grade spread honest.",
    since: "Climbing since 2009",
    style: "Slab, which surprises everyone",
  },
  {
    id: "eli",
    name: "Eli Okafor",
    role: "Setter & coach",
    bio: "Teaches Movement Lab and the fingerboard clinic. Will happily talk you through any problem on the wall.",
    since: "Climbing since 2012",
    style: "Steep, powerful, heel hooks",
  },
  {
    id: "sam",
    name: "Sam Reyes",
    role: "Youth head coach",
    bio: "Built the youth programme from six kids on a Saturday morning to three squads and a competition team.",
    since: "Climbing since 2007",
    style: "Comp-style coordination",
  },
  {
    id: "priya",
    name: "Priya Lal",
    role: "Ropes lead & setter",
    bio: "Runs top-rope and lead courses and checks every auto-belay each morning before doors open.",
    since: "Climbing since 2014",
    style: "Long, technical vertical walls",
  },
  {
    id: "jo",
    name: "Jo Marsh",
    role: "Strength coach",
    bio: "Physiotherapist turned coach. Strength for Climbers is built around keeping fingers and shoulders healthy.",
    since: "Climbing since 2016",
    style: "Crimps, sadly",
  },
  {
    id: "ines",
    name: "Ines Duarte",
    role: "Front desk & yoga",
    bio: "The first face you'll see. Teaches Sunday mobility in the loft and knows everyone's project.",
    since: "Climbing since 2018",
    style: "Anything with a big jug at the top",
  },
];

export const coach = (id: string) => team.find((p) => p.id === id)!;

/* ------------------------------------------------------------ classes */

export type Level =
  "Beginner" | "Improver" | "Advanced" | "Youth" | "All levels";
export type ClassKind = "One-off" | "Course" | "Drop-in";

export type ClassItem = {
  id: string;
  name: string;
  kind: ClassKind;
  level: Level;
  duration: string;
  sessions: number;
  price: number;
  capacity: number;
  ages: string;
  /** Weekday index (Sunday = 0) and start time. */
  schedule: { day: number; time: string }[];
  coach: string;
  image: string;
  alt: string;
  summary: string;
  body: string[];
  learn: string[];
  plan: { title: string; text: string }[];
  bring: string[];
};

export const classes: ClassItem[] = [
  {
    id: "first-moves",
    name: "First Moves",
    kind: "One-off",
    level: "Beginner",
    duration: "90 min",
    sessions: 1,
    price: 45,
    capacity: 8,
    ages: "16+",
    schedule: [
      { day: 2, time: "18:30" },
      { day: 4, time: "18:30" },
      { day: 6, time: "10:00" },
      { day: 0, time: "13:00" },
    ],
    coach: "ines",
    image: whiteWall,
    alt: "A climber reaching between blue holds on a white bouldering wall",
    summary:
      "Your first time on the wall, with a coach. Safety induction, falling, and your first five problems.",
    body: [
      "Never climbed before? Start here. In ninety minutes you'll learn how to fall safely on the mats, how to read the colour circuits, and how to climb with your feet instead of your arms.",
      "Shoe hire and a day pass are included, so stay and climb afterwards. Most people tick their first green before they leave.",
    ],
    learn: [
      "How to fall and land on the mats",
      "Reading circuits and start holds",
      "Straight arms and quiet feet",
      "Gym etiquette: who goes next",
    ],
    plan: [
      {
        title: "Induction",
        text: "Fifteen minutes on the mats: falling, down-climbing, where not to stand.",
      },
      {
        title: "Movement basics",
        text: "Footwork drills on Little Peaks and the slab.",
      },
      {
        title: "Your first circuit",
        text: "Five yellow problems, then a green to finish.",
      },
    ],
    bring: [
      "Comfortable clothes you can stretch in",
      "Short nails",
      "Water bottle",
    ],
  },
  {
    id: "footwork-fundamentals",
    name: "Footwork Fundamentals",
    kind: "Course",
    level: "Improver",
    duration: "4 × 90 min",
    sessions: 4,
    price: 120,
    capacity: 8,
    ages: "16+",
    schedule: [{ day: 1, time: "19:00" }],
    coach: "eli",
    image: feet,
    alt: "Close-up of a climber's feet placed precisely on small holds",
    summary:
      "Four Mondays on the thing that separates greens from purples: where you put your feet.",
    body: [
      "Everyone plateaus at the same point: arms tired, feet sloppy. This course fixes the second one so you can stop worrying about the first.",
      "Each week builds on the last, with filmed drills you can review at home.",
    ],
    learn: [
      "Precise edging and smearing",
      "Flagging and back-stepping",
      "Heel and toe hooks",
      "Silent feet drills you can repeat alone",
    ],
    plan: [
      {
        title: "Precision",
        text: "Edging, smearing and silent feet on the slab.",
      },
      {
        title: "Turning in",
        text: "Back-steps, drop knees and getting your hips to the wall.",
      },
      { title: "Hooks", text: "Heel and toe hooks in the Cave." },
      {
        title: "Put it together",
        text: "Coach-picked problems from the new set.",
      },
    ],
    bring: [
      "Your own shoes, if you have them",
      "A notebook or phone for drills",
    ],
  },
  {
    id: "learn-to-top-rope",
    name: "Learn to Top-Rope",
    kind: "Course",
    level: "Beginner",
    duration: "2 × 2 h",
    sessions: 2,
    price: 95,
    capacity: 6,
    ages: "14+",
    schedule: [{ day: 3, time: "18:00" }],
    coach: "priya",
    image: ropeWhite,
    alt: "A climber on a top rope moving up a tall white wall",
    summary:
      "Tie in, belay, lower. Leave with a Summit belay card for the rope hall.",
    body: [
      "The rope hall has twenty-two lines up to 12 metres. This two-evening course teaches you to tie a figure-eight, belay with an assisted device, and lower a partner safely.",
      "You'll finish with a belay check. Pass it and you can climb on ropes during any open session.",
    ],
    learn: [
      "Harness fitting and the figure-eight follow-through",
      "Belaying with an assisted braking device",
      "Lowering and communication",
      "The belay check",
    ],
    plan: [
      {
        title: "Knots & belaying",
        text: "Tie-in, partner checks, taking in and holding.",
      },
      {
        title: "Lowering & check",
        text: "Smooth lowers, catching falls, then the belay check.",
      },
    ],
    bring: [
      "Comfortable clothes",
      "A climbing partner (optional — we'll pair you up)",
    ],
  },
  {
    id: "lead-climbing",
    name: "Lead Climbing",
    kind: "Course",
    level: "Advanced",
    duration: "3 × 2.5 h",
    sessions: 3,
    price: 165,
    capacity: 4,
    ages: "16+",
    schedule: [{ day: 6, time: "14:00" }],
    coach: "priya",
    image: orangeWall,
    alt: "A climber clipping a rope on an orange lead wall",
    summary: "Clip, fall, catch. Three Saturdays to your Summit lead card.",
    body: [
      "For confident top-ropers ready to clip their own quickdraws. Four people per coach, lots of practice falls and a lot of soft catches.",
      "You need a current Summit belay card or an equivalent from another gym.",
    ],
    learn: [
      "Clipping efficiently from good stances",
      "Dynamic belaying and soft catches",
      "Practice falls, progressively bigger",
      "Lead belay assessment",
    ],
    plan: [
      {
        title: "Clipping",
        text: "Mock-lead on top-rope, clipping positions, back-clips.",
      },
      {
        title: "Falling & catching",
        text: "Graduated falls and dynamic belays.",
      },
      {
        title: "Assessment",
        text: "Lead two routes and pass a lead belay check.",
      },
    ],
    bring: [
      "Your own harness and shoes if you have them",
      "Belay card or proof of experience",
    ],
  },
  {
    id: "movement-lab",
    name: "Movement Lab: Overhangs",
    kind: "Drop-in",
    level: "Improver",
    duration: "75 min",
    sessions: 1,
    price: 28,
    capacity: 10,
    ages: "16+",
    schedule: [
      { day: 2, time: "19:30" },
      { day: 4, time: "19:30" },
    ],
    coach: "eli",
    image: blueWall,
    alt: "A blue overhanging bouldering wall covered in orange and black holds",
    summary:
      "Drop-in technique on steep ground in the Cave. Different focus every week.",
    body: [
      "Steep climbing is a skill, not just strength. Each session picks one idea — body tension, heel hooks, cutting loose — and drills it on problems from the current set.",
      "Book a single session or use a punch card.",
    ],
    learn: [
      "Keeping feet on in the roof",
      "Heel and toe hook placement",
      "Cutting loose and catching the swing",
      "Reading steep sequences from the ground",
    ],
    plan: [
      { title: "Warm-up", text: "Ten minutes of mobility and easy laps." },
      { title: "Drill", text: "The week's focus, broken into small steps." },
      {
        title: "Apply",
        text: "Two or three coach-picked problems at your level.",
      },
    ],
    bring: ["Climbing shoes", "Chalk"],
  },
  {
    id: "strength-for-climbers",
    name: "Strength for Climbers",
    kind: "Drop-in",
    level: "All levels",
    duration: "60 min",
    sessions: 1,
    price: 22,
    capacity: 12,
    ages: "16+",
    schedule: [
      { day: 1, time: "07:30" },
      { day: 3, time: "12:15" },
      { day: 5, time: "18:00" },
    ],
    coach: "jo",
    image: board,
    alt: "A wooden training board with small resin holds",
    summary:
      "Fingers, pulling and antagonist work for climbers who want to keep climbing for decades.",
    body: [
      "Run by a physiotherapist, this is the class for anyone who has ever said 'my finger feels a bit funny'. Hangboard protocols, pulling, pushing and shoulder health.",
      "Scaled for every level: first-timers use the low board and bands.",
    ],
    learn: [
      "Safe hangboard progressions",
      "Pulling strength without the elbow pain",
      "Antagonist and shoulder work",
      "Planning strength around climbing days",
    ],
    plan: [
      { title: "Prep", text: "Wrist, finger and shoulder warm-up." },
      { title: "Main block", text: "Hangs or pulls, scaled to you." },
      { title: "Antagonists", text: "Push, rotate, stretch." },
    ],
    bring: ["Trainers for the floor work", "Water bottle"],
  },
  {
    id: "projecting-clinic",
    name: "Projecting Clinic",
    kind: "Drop-in",
    level: "Advanced",
    duration: "2 h",
    sessions: 1,
    price: 35,
    capacity: 6,
    ages: "16+",
    schedule: [{ day: 0, time: "17:00" }],
    coach: "noa",
    image: lookingUp,
    alt: "A climber in a harness looking up at a tall white wall covered in holds",
    summary:
      "Bring your red or black project. The head setter helps you break it down.",
    body: [
      "Six climbers, one setter, two hours. You pick the problem; Noa explains how it was meant to be climbed, and how you might climb it differently.",
      "Best for climbers working V5 and up on the current set.",
    ],
    learn: [
      "Breaking a problem into links",
      "Reading the setter's intention",
      "Rest and attempt pacing",
      "Logging beta that survives a week off",
    ],
    plan: [
      {
        title: "Show and tell",
        text: "Everyone shows their project and their high point.",
      },
      { title: "Work it", text: "Rotating coaching on each problem." },
      { title: "Plan", text: "A written plan for your next session." },
    ],
    bring: ["Your project in mind", "Brush and chalk"],
  },
  {
    id: "youth-taster",
    name: "Youth Taster",
    kind: "One-off",
    level: "Youth",
    duration: "60 min",
    sessions: 1,
    price: 30,
    capacity: 10,
    ages: "7–12",
    schedule: [
      { day: 6, time: "09:00" },
      { day: 3, time: "16:00" },
    ],
    coach: "sam",
    image: youth,
    alt: "A child in a harness reaching up a blue indoor climbing wall",
    summary:
      "An hour of games and first climbs for 7–12s. The usual first step into the youth squads.",
    body: [
      "Climbing games on Little Peaks and the low end of the slab, run by our youth coaches. Parents are welcome to watch from the café balcony.",
      "Kids who enjoy it can join a squad the following week; we'll suggest which one.",
    ],
    learn: [
      "Safe falling and landing",
      "Climbing games and traverses",
      "Their first yellow and green problems",
      "Which squad suits them next",
    ],
    plan: [
      { title: "Games", text: "Traverse tag and 'stick it' on Little Peaks." },
      { title: "Climbs", text: "Yellow and green problems with a coach." },
      { title: "Debrief", text: "Five minutes with parents on what's next." },
    ],
    bring: [
      "Comfortable clothes, no buttons or zips at the back",
      "A signed parental waiver (we'll send it)",
    ],
  },
];

export const levels: Level[] = [
  "Beginner",
  "Improver",
  "Advanced",
  "Youth",
  "All levels",
];

/* ------------------------------------------------------------ events */

export type EventKind =
  "Competition" | "Social" | "Clinic" | "Outdoor" | "Film";
export type EventItem = {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  start: string;
  end: string;
  price: number;
  capacity: number;
  taken: number;
  image: string;
  alt: string;
  summary: string;
  body: string[];
  schedule: { time: string; item: string }[];
  bring: string[];
  categories?: string[];
};

export const events: EventItem[] = [
  {
    id: "boulder-league-round-3",
    title: "Fall Boulder League · Round 3",
    kind: "Competition",
    date: "2026-10-29",
    start: "18:00",
    end: "22:00",
    price: 15,
    capacity: 90,
    taken: 71,
    image: greyBoulder,
    alt: "A climber stepping onto a large blue volume on a grey bouldering wall",
    summary:
      "Thirty problems on the Comp Wall and the Prow, four hours, scored on tops and zones.",
    body: [
      "The third of five league nights. Climb as many of the thirty problems as you can in four hours; your best twenty count. Open, masters and youth categories.",
      "You don't need to have done rounds one or two. Plenty of people come for one night just to climb something new.",
    ],
    schedule: [
      { time: "18:00", item: "Check-in and scorecards" },
      { time: "18:30", item: "Climbing opens" },
      { time: "21:30", item: "Scorecards in" },
      { time: "22:00", item: "Leaderboard and pizza" },
    ],
    bring: ["Shoes and chalk", "A pen for your scorecard"],
    categories: ["Open", "Masters 40+", "Youth 12–17"],
  },
  {
    id: "halloween-costume-climb",
    title: "Halloween Costume Climb",
    kind: "Social",
    date: "2026-10-31",
    start: "18:00",
    end: "21:00",
    price: 0,
    capacity: 150,
    taken: 64,
    image: pinkWall,
    alt: "A climber in a red top reaching across a pink and white wall",
    summary:
      "Climb in costume. Best costume that tops a blue wins a month's membership.",
    body: [
      "The whole gym, a ridiculous playlist and a costume contest judged at 20:30. Wear something you can actually climb in — capes are fine, stilts are not.",
      "Free for members, regular day-pass price for everyone else.",
    ],
    schedule: [
      { time: "18:00", item: "Doors and DJ" },
      { time: "19:00", item: "Spooky circuit opens on Little Peaks" },
      { time: "20:30", item: "Costume judging" },
    ],
    bring: ["A costume you can move in", "Your usual kit"],
  },
  {
    id: "fingerboard-clinic",
    title: "Fingerboard Clinic with Eli",
    kind: "Clinic",
    date: "2026-11-07",
    start: "10:00",
    end: "12:30",
    price: 40,
    capacity: 12,
    taken: 9,
    image: board,
    alt: "A wooden training board with small resin holds",
    summary:
      "How to start hangboarding without wrecking your fingers. Leave with a written eight-week plan.",
    body: [
      "Eli and physiotherapist Jo Marsh cover when you're ready to hangboard, which grips to train and how to progress safely.",
      "Two and a half hours: theory, testing, and a full session on the boards.",
    ],
    schedule: [
      { time: "10:00", item: "When and why to hang" },
      { time: "10:45", item: "Max-hang testing" },
      { time: "11:30", item: "Your first session" },
      { time: "12:15", item: "Plans handed out" },
    ],
    bring: ["Climbing shoes", "Notebook"],
  },
  {
    id: "setters-choice-night",
    title: "Setters' Choice Night",
    kind: "Social",
    date: "2026-11-10",
    start: "19:00",
    end: "22:00",
    price: 0,
    capacity: 120,
    taken: 38,
    image: holds,
    alt: "Close-up of yellow, blue and purple holds on a white volume",
    summary:
      "The Prow reopens after reset. The setters climb their new problems first, then it's yours.",
    body: [
      "Every reset has a story. Noa and the team walk through the new set on the Prow, demo their favourite problems, and tell you which one they think is sandbagged.",
      "Free to anyone with a day pass or membership.",
    ],
    schedule: [
      { time: "19:00", item: "Setters' walk-through" },
      { time: "19:45", item: "Demos" },
      { time: "20:15", item: "Open climbing on the new set" },
    ],
    bring: ["Questions for the setters"],
  },
  {
    id: "the-long-crimp-screening",
    title: "Film Night: The Long Crimp",
    kind: "Film",
    date: "2026-11-19",
    start: "19:30",
    end: "21:30",
    price: 12,
    capacity: 80,
    taken: 22,
    image: lookingUp,
    alt: "A climber in a harness looking up at a tall white wall",
    summary:
      "A screening of an independent climbing documentary on the café wall, with popcorn.",
    body: [
      "'The Long Crimp' follows three climbers through a winter of projecting one boulder in a quarry. Fifty-eight minutes, followed by a Q&A with the director over video.",
      "Ticket includes popcorn and one drink from the café.",
    ],
    schedule: [
      { time: "19:30", item: "Doors and popcorn" },
      { time: "20:00", item: "Screening" },
      { time: "21:00", item: "Q&A" },
    ],
    bring: ["Something warm — the café gets cold after 21:00"],
  },
  {
    id: "granite-hollow-trip",
    title: "Outdoor Trip: Granite Hollow",
    kind: "Outdoor",
    date: "2026-11-21",
    start: "07:30",
    end: "18:00",
    price: 85,
    capacity: 12,
    taken: 10,
    image: outdoor,
    alt: "A climber hanging from a steep limestone overhang above the sea",
    summary:
      "Your first day on real rock, with transport, crash pads and two guides.",
    body: [
      "A minibus day to the boulders at Granite Hollow, ninety minutes north. We bring the crash pads, brushes and lunch; you bring the psyche.",
      "Suitable for anyone climbing green or above indoors. Outdoor grades feel harder, and that's fine.",
    ],
    schedule: [
      { time: "07:30", item: "Minibus leaves Summit" },
      { time: "09:15", item: "Outdoor etiquette and first problems" },
      { time: "12:30", item: "Lunch at the boulders" },
      { time: "16:00", item: "Pack up, back by 18:00" },
    ],
    bring: [
      "Warm layers and waterproofs",
      "Shoes and chalk",
      "Sturdy footwear for the walk-in",
    ],
  },
  {
    id: "youth-regional-qualifier",
    title: "Youth Regional Qualifier",
    kind: "Competition",
    date: "2026-12-05",
    start: "08:30",
    end: "17:00",
    price: 25,
    capacity: 80,
    taken: 52,
    image: youth,
    alt: "A child in a harness climbing a blue wall",
    summary:
      "We host the regional youth bouldering qualifier. Spectators free all day.",
    body: [
      "Climbers aged 8–17 compete for places at the national youth series. Qualification rounds in the morning, finals on the Comp Wall from 15:00.",
      "The gym is closed to general climbing until 17:00. Spectators are welcome and the café is open.",
    ],
    schedule: [
      { time: "08:30", item: "Registration" },
      { time: "09:30", item: "Qualifiers, under-12s" },
      { time: "12:00", item: "Qualifiers, 12–17" },
      { time: "15:00", item: "Finals" },
    ],
    bring: ["Membership number of a regional club", "Parental consent form"],
    categories: ["Under 10", "Under 12", "Under 14", "Under 16", "Under 18"],
  },
];

export const eventKinds: EventKind[] = [
  "Competition",
  "Social",
  "Clinic",
  "Outdoor",
  "Film",
];

/* ------------------------------------------------------------ prices */

export const prices = {
  dayAdult: 24,
  dayYouth: 18,
  shoes: 6,
  chalk: 3,
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  /** Pay upfront for twelve months. */
  annual: number;
  who: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "off-peak",
    name: "Off-Peak",
    monthly: 69,
    annual: 690,
    who: "Shift workers, students with free mornings, early birds.",
    features: [
      "Weekdays before 16:00 and after 21:00",
      "All day at weekends after 17:00",
      "Rope hall with a belay card",
      "10% off classes",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    monthly: 92,
    annual: 920,
    who: "Climb whenever you like. Most of our members pick this.",
    features: [
      "Every opening hour, every day",
      "Rope hall with a belay card",
      "Free Movement Lab once a month",
      "2 guest passes a month",
      "15% off classes and shop",
    ],
    featured: true,
  },
  {
    id: "under-26",
    name: "Under 26",
    monthly: 72,
    annual: 720,
    who: "Unlimited climbing for anyone aged 18–25.",
    features: [
      "Every opening hour, every day",
      "Rope hall with a belay card",
      "1 guest pass a month",
      "10% off classes",
    ],
  },
  {
    id: "family",
    name: "Family",
    monthly: 189,
    annual: 1890,
    who: "Two adults and up to three kids under 16 at the same address.",
    features: [
      "Unlimited climbing for everyone listed",
      "Kids climb on Little Peaks with an adult",
      "10% off youth squads",
      "4 guest passes a month",
    ],
  },
];

export const passes = [
  {
    name: "Day pass",
    adult: 24,
    youth: 18,
    note: "All walls, all day. Youth is under 16.",
  },
  {
    name: "Off-peak day pass",
    adult: 19,
    youth: 14,
    note: "Weekdays before 16:00.",
  },
  {
    name: "5-visit card",
    adult: 112,
    youth: 84,
    note: "Shareable, valid for 12 months.",
  },
  {
    name: "10-visit card",
    adult: 210,
    youth: 160,
    note: "Shareable, valid for 12 months.",
  },
  {
    name: "Shoe hire",
    adult: 6,
    youth: 6,
    note: "Free on your first visit with First Moves.",
  },
];

export type Faq = { q: string; a: string };

export const membershipFaq: Faq[] = [
  {
    q: "Is there a joining fee?",
    a: "No. You pay the first month (or the year) when you join at the desk or online, and that's it.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes, for injury, travel or anything else: up to three months a year, in whole months, with a week's notice. Frozen months cost $5.",
  },
  {
    q: "How do I cancel?",
    a: "Give us one month's notice by email or at the desk. Annual memberships can be cancelled within 14 days for a full refund.",
  },
  {
    q: "Do guest passes roll over?",
    a: "No, they reset on the first of each month. Your guest still needs to sign the waiver and, if new, do the 15-minute induction.",
  },
  {
    q: "What counts as off-peak?",
    a: "Weekdays before 16:00 and after 21:00, and weekends after 17:00. Bank holidays count as weekends.",
  },
];

export const visitFaq: Faq[] = [
  {
    q: "I've never climbed. Can I just turn up?",
    a: "Yes. Every first-timer does a free 15-minute safety induction at the desk before climbing. If you'd like a coach, book First Moves instead.",
  },
  {
    q: "What should I wear?",
    a: "Anything you can stretch in. Climbing shoes are required on the walls — hire them at the desk for $6.",
  },
  {
    q: "How old do you have to be?",
    a: "Under 16s climb with a supervising adult unless they're in a youth squad. Under 18s need a parent or guardian to sign the waiver.",
  },
  {
    q: "Do I need a partner?",
    a: "Not for bouldering. For the rope hall, you can use the auto-belays alone or bring a partner with a belay card.",
  },
  {
    q: "Is there somewhere to leave my stuff?",
    a: "Free lockers (bring a coin or use the code locks), changing rooms with showers, and cubbies by the mats for water bottles.",
  },
  {
    q: "Is the building accessible?",
    a: "Step-free from the street, accessible changing room and toilet, and an adaptive climbing session on the first Sunday of every month.",
  },
];

/* ------------------------------------------------------------ youth */

export type Squad = {
  id: string;
  name: string;
  ages: string;
  when: string;
  fee: number;
  text: string;
};

export const squads: Squad[] = [
  {
    id: "mini",
    name: "Mini Crushers",
    ages: "6–9",
    when: "Saturdays 10:00–11:00",
    fee: 110,
    text: "Climbing games, falling practice and movement on Little Peaks. No experience needed.",
  },
  {
    id: "development",
    name: "Development Squad",
    ages: "10–13",
    when: "Tuesdays & Thursdays 16:30–18:00",
    fee: 210,
    text: "Technique, ropes basics and a first taste of friendly comps. Climbing green to blue.",
  },
  {
    id: "team",
    name: "Competition Team",
    ages: "12–18",
    when: "Mon, Wed & Fri 16:30–18:30",
    fee: 320,
    text: "Structured training for regional and national youth comps. By trial; climbing blue and above.",
  },
];

export const pathway = [
  {
    title: "Youth Taster",
    text: "One hour of games and first climbs. Book any Saturday or Wednesday.",
  },
  {
    title: "Mini Crushers or Development",
    text: "Weekly squad by age, starting the week after the taster.",
  },
  {
    title: "Team trial",
    text: "Coaches invite climbers ready for comps to a two-session trial each term.",
  },
  {
    title: "Competition Team",
    text: "Three sessions a week, a season of regional comps and a team hoodie.",
  },
];

export const results = [
  {
    event: "Regional Youth Series · Round 2",
    date: "Sept 2026",
    result: "Maya T. 1st, Under 14 · Leo K. 3rd, Under 12",
  },
  {
    event: "Summit Summer Slam",
    date: "Aug 2026",
    result: "Team 2nd overall of 9 clubs",
  },
  {
    event: "Regional Youth Series · Round 1",
    date: "June 2026",
    result: "Four finalists, two podiums",
  },
  {
    event: "National Youth Finals",
    date: "Apr 2026",
    result: "Ava R. 6th, Under 16 — our first national finalist",
  },
];

export const youthFaq: Faq[] = [
  {
    q: "Who looks after the kids?",
    a: "Every squad has a lead coach and an assistant, all background-checked and first-aid trained. Ratio is never above 1:6 for Mini Crushers.",
  },
  {
    q: "What if they miss a session?",
    a: "Make it up at any other squad session that term, or on a Saturday family climb.",
  },
  {
    q: "Are fees per term?",
    a: "Yes. A term is ten weeks; siblings get 10% off, and we offer funded places — ask at the desk, no questions.",
  },
];

/* ------------------------------------------------------------ home + about copy */

export const home = {
  title: "Climb something new this week.",
  lead: "Summit is a bouldering and rope gym on Foundry Street. Six walls, 22 rope lines, and one wall stripped and reset every Tuesday, so the whole gym turns over every six weeks.",
  firstVisit: {
    title: "Your first visit, in three steps",
    steps: [
      {
        title: "Book a pass or First Moves",
        text: "Turn up any time with a day pass, or book a coach-led intro if you'd like a hand.",
      },
      {
        title: "Induction at the desk",
        text: "Fifteen free minutes on falling, the mats and the colour circuits. Shoes are $6.",
      },
      {
        title: "Start on yellow",
        text: "Yellows are the easiest problems on every wall. Tick a few, then try a green.",
      },
    ],
  },
  quote: {
    text: "I came for one First Moves session two years ago. Now I plan my Tuesday around which wall is getting reset.",
    who: "Hana, member since 2024",
  },
  close: {
    title: "Chalk up.",
    text: "Day passes from $24, shoes $6, no partner needed. The yellow problems on the newest wall are waiting.",
  },
};

export const about = {
  title: "A tram shed full of plywood and good intentions.",
  lead: "Summit opened in 2019 in the old Foundry Street tram shed: 1,900 square metres, a roof high enough for ropes, and a floor that used to hold eleven trams.",
  story: [
    "We started Summit because the nearest gym was a forty-minute drive and always full. Three climbers, one bank loan, and a lot of weekends sanding plywood.",
    "Seven years later we have six bouldering walls, a rope hall, a café that does a serious flat white and a youth programme of ninety kids. We're still independently owned, and still sanding plywood.",
  ],
  setting: {
    title: "How we set",
    text: [
      "One wall every Tuesday. The setters strip it in the morning, wash every hold, and set around thirty new problems by 16:00. Six walls means every problem lives for six weeks, then goes.",
      "Every wall gets a full spread of the six colour circuits, from yellow to black, and every set gets forerun by at least two setters and one member from the Tuesday crew before it opens.",
    ],
  },
  values: [
    {
      title: "Fresh beats famous",
      text: "We'd rather reset on time than keep a classic up a week longer.",
    },
    {
      title: "Grades are a conversation",
      text: "If a green feels like a purple, tell the desk. We re-tag within a day.",
    },
    {
      title: "Everyone starts on yellow",
      text: "Including the setters, every time a new wall opens.",
    },
  ],
  facilities: [
    {
      name: "Six bouldering walls",
      text: "Up to 4.5 m, 45° roof to 80° slab, 40 cm matting throughout.",
    },
    {
      name: "Rope hall",
      text: "22 lines up to 12 m: 14 auto-belays, 8 lead and top-rope.",
    },
    {
      name: "Training area",
      text: "Two board walls, hangboards, rings, free weights.",
    },
    {
      name: "Yoga loft",
      text: "Mobility and yoga classes, free for members outside class times.",
    },
    {
      name: "Café",
      text: "Coffee, toasties and post-session cake, with a view of the Comp Wall.",
    },
    {
      name: "Shop",
      text: "Shoes, chalk, brushes and Summit hoodies at the desk.",
    },
  ],
};

export const visit = {
  title: "Hours, getting here, and your first visit.",
  lead: "Doors open at 07:00 on weekdays. Day passes are on the desk, or book ahead to guarantee your arrival slot at busy times.",
  transit: [
    {
      mode: "Tram",
      text: "Line 4 to Foundry Street, then two minutes' walk past the old depot gates.",
    },
    {
      mode: "Bike",
      text: "Covered racks for 40 bikes by the entrance, plus a pump and tools.",
    },
    {
      mode: "Car",
      text: "Free parking for 60 cars behind the building. Busy 17:30–19:30 on weekdays.",
    },
  ],
  rules: [
    "Shoes on the walls, never on the mats outside the climbing zone.",
    "One climber per problem; don't walk or sit under someone climbing.",
    "Climb down or jump from a low height. Never jump from the top of the wall.",
    "Brush the holds you chalked up. Leave it like you'd like to find it.",
    "Under 16s climb with an adult unless in a youth squad session.",
  ],
  /** Typical people on the floor by opening hour. */
  busyness: {
    weekday: [12, 18, 22, 16, 14, 20, 26, 18, 16, 28, 54, 78, 92, 84, 60, 30],
    weekend: [30, 46, 64, 80, 88, 86, 78, 70, 60, 52, 40, 24],
  },
};
