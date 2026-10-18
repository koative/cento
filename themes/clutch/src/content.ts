import hero from "./assets/hero.jpg";
import squad from "./assets/squad.jpg";
import house from "./assets/house.jpg";
import controller from "./assets/controller.jpg";
import keyboard from "./assets/keyboard.jpg";
import mat from "./assets/mat.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Clutch",
  tag: "CLT",
  city: "Rotterdam",
  founded: 2019,
  email: "hello@clutch.example",
  partnersEmail: "partners@clutch.example",
  pressEmail: "press@clutch.example",
  phone: "+1 555 0196 2019",
  address: ["Clutch House", "Brede Hilledijk 96", "3072 Rotterdam"],
  socials: [
    { label: "Twitch", href: "https://www.twitch.tv/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Discord", href: "https://discord.com/" },
  ],
};

export const nav = [
  { to: "/teams", label: "Teams" },
  { to: "/matches", label: "Matches" },
  { to: "/news", label: "News" },
  { to: "/shop", label: "Shop" },
  { to: "/partners", label: "Partners" },
  { to: "/club", label: "Club" },
];

export const images = { hero, squad, house, controller, keyboard, mat };

/* ───────────────────────── Divisions ───────────────────────── */

export type DivisionId = "fault-line" | "ascendancy" | "iron-verdict";

export type Division = {
  id: DivisionId;
  game: string;
  genre: string;
  league: string;
  standing: string;
  coach: { name: string; handle: string; note: string };
  blurb: string;
  /** What the "pool" list on a player page is called in this game. */
  poolLabel: string;
};

export const divisions: Division[] = [
  {
    id: "fault-line",
    game: "Fault Line",
    genre: "5v5 tactical shooter",
    league: "Northern Circuit · Autumn Split 2026",
    standing: "2nd of 8 · 9–3",
    coach: {
      name: "Marit Vos",
      handle: "Daybreak",
      note: "Head coach since 2023. Ex-pro, ex-analyst, keeps a paper notebook of every opponent's pistol rounds.",
    },
    blurb:
      "The flagship. Five players who built their reputation in rounds nobody else wanted to play: down a player, short on money, a timer running out.",
    poolLabel: "Agent pool",
  },
  {
    id: "ascendancy",
    game: "Ascendancy",
    genre: "5v5 arena strategy",
    league: "Ascendancy Premier EU · Split 3",
    standing: "4th of 10 · 6–4",
    coach: {
      name: "Jonas Okafor",
      handle: "Ledger",
      note: "Joined from the academy staff in 2025. Runs scrims like a chess club: review first, play second.",
    },
    blurb:
      "A young lineup with a slow, vision-heavy style that wins late. Three of the five came through the Clutch academy.",
    poolLabel: "Hero pool",
  },
  {
    id: "iron-verdict",
    game: "Iron Verdict",
    genre: "1v1 fighting game",
    league: "Verdict World Tour 2026",
    standing: "Two players in the global top 32",
    coach: {
      name: "Sami Haddad",
      handle: "Framedata",
      note: "Part coach, part training partner. Has labbed every punish in the game at least twice.",
    },
    blurb:
      "Two solo players, one practice room. They travel to opens across Europe and come home with brackets full of notes.",
    poolLabel: "Characters",
  },
];

/* ───────────────────────── Players ───────────────────────── */

export type Crosshair = {
  color: string;
  length: number;
  gap: number;
  thickness: number;
  dot: boolean;
};

export type Player = {
  id: string;
  handle: string;
  name: string;
  country: string;
  countryCode: string;
  division: DivisionId;
  role: string;
  number: number;
  joined: string;
  age: number;
  quote: string;
  bio: string[];
  stats: { label: string; value: string }[];
  pool: string[];
  setup: { label: string; value: string }[];
  crosshair?: Crosshair;
  career: { years: string; team: string; note: string }[];
};

export const players: Player[] = [
  {
    id: "vexa",
    handle: "Vexa",
    name: "Lotte Brandsma",
    country: "Netherlands",
    countryCode: "NL",
    division: "fault-line",
    role: "Entry duelist",
    number: 7,
    joined: "January 2024",
    age: 22,
    quote:
      "If I'm last alive, I stop thinking about the score. I only think about the next corner.",
    bio: [
      "Vexa grew up four tram stops from Clutch House and played her first LAN in the café that later became our training floor. She signed in 2024 after two seasons topping the Northern Circuit's first-blood charts with a team that couldn't afford to travel.",
      "She takes the first duel of most rounds, which means she also loses more of them than anyone on the roster. What makes her rare is what happens when the round goes wrong: her 1vX conversion rate is the best in the league this split.",
    ],
    stats: [
      { label: "Rating", value: "1.21" },
      { label: "Avg. combat score", value: "264" },
      { label: "K / D", value: "1.18" },
      { label: "First kills per round", value: "0.21" },
      { label: "Clutches won", value: "14 / 31" },
      { label: "Headshot %", value: "29%" },
    ],
    pool: ["Kestrel", "Ember", "Moth"],
    setup: [
      { label: "DPI", value: "800" },
      { label: "Sensitivity", value: "0.31" },
      { label: "eDPI", value: "248" },
      { label: "Mouse", value: "Kestrel Talon Air, 58 g" },
      { label: "Monitor", value: "24.5″ · 360 Hz" },
    ],
    crosshair: {
      color: "#ff5a1f",
      length: 4,
      gap: 2,
      thickness: 2,
      dot: false,
    },
    career: [
      {
        years: "2024–",
        team: "Clutch",
        note: "Northern Circuit runner-up, Spring 2025",
      },
      {
        years: "2022–2023",
        team: "Polder Five",
        note: "Northern Circuit Challengers, first-blood leader two splits running",
      },
      {
        years: "2021",
        team: "Café Katendrecht LAN team",
        note: "Where it started",
      },
    ],
  },
  {
    id: "patch",
    handle: "Patch",
    name: "Idris Mensah",
    country: "United Kingdom",
    countryCode: "GB",
    division: "fault-line",
    role: "In-game leader",
    number: 1,
    joined: "March 2023",
    age: 27,
    quote: "A good call is one everyone can execute while scared.",
    bio: [
      "Patch is the voice in the headset. He calls the mid-round adjustments, the economy and, when it goes quiet in a tight overtime, the jokes. Before esports he spent three years as a lifeguard in Brighton, which he says is the same job with more chlorine.",
      "His numbers are modest by design: he plays the support role in most compositions so the four players around him can take the space he finds. The team's win rate on maps he picks this split is 78%.",
    ],
    stats: [
      { label: "Rating", value: "0.98" },
      { label: "Avg. combat score", value: "198" },
      { label: "K / D", value: "0.94" },
      { label: "Assists per round", value: "0.46" },
      { label: "Map-pick win rate", value: "78%" },
      { label: "Clutches won", value: "6 / 22" },
    ],
    pool: ["Lattice", "Mirror", "Kestrel"],
    setup: [
      { label: "DPI", value: "400" },
      { label: "Sensitivity", value: "0.52" },
      { label: "eDPI", value: "208" },
      { label: "Mouse", value: "Kestrel Talon, 63 g" },
      { label: "Monitor", value: "24.5″ · 240 Hz" },
    ],
    crosshair: { color: "#ffffff", length: 5, gap: 3, thickness: 1, dot: true },
    career: [
      { years: "2023–", team: "Clutch", note: "Captain since 2024" },
      {
        years: "2020–2022",
        team: "Southpier",
        note: "UK national champions 2022",
      },
    ],
  },
  {
    id: "okami",
    handle: "Okami",
    name: "Kenji Arai",
    country: "Japan",
    countryCode: "JP",
    division: "fault-line",
    role: "Controller",
    number: 22,
    joined: "August 2024",
    age: 24,
    quote: "Smokes are a conversation. You tell them where they can't look.",
    bio: [
      "Okami moved from Osaka to Rotterdam in 2024 with one suitcase and a binder of smoke line-ups for every map in the pool. He is the team's most consistent performer in the second half of maps, when opponents have stopped respecting utility.",
      "Off the server he runs the Clutch House Thursday coaching nights for the community and is slowly teaching the entire staff to cook proper curry.",
    ],
    stats: [
      { label: "Rating", value: "1.04" },
      { label: "Avg. combat score", value: "211" },
      { label: "K / D", value: "1.02" },
      { label: "Utility damage per round", value: "14.8" },
      { label: "Clutches won", value: "8 / 25" },
      { label: "Headshot %", value: "24%" },
    ],
    pool: ["Haze", "Lattice", "Vigil"],
    setup: [
      { label: "DPI", value: "1600" },
      { label: "Sensitivity", value: "0.18" },
      { label: "eDPI", value: "288" },
      { label: "Mouse", value: "Kestrel Vane, 61 g" },
      { label: "Monitor", value: "24.5″ · 360 Hz" },
    ],
    crosshair: {
      color: "#7cc4ff",
      length: 3,
      gap: 1,
      thickness: 2,
      dot: false,
    },
    career: [
      { years: "2024–", team: "Clutch", note: "Moved to Europe to join" },
      {
        years: "2021–2024",
        team: "Kansai Wave",
        note: "Two Japan League finals",
      },
    ],
  },
  {
    id: "rune",
    handle: "Rune",
    name: "Emil Sørvik",
    country: "Norway",
    countryCode: "NO",
    division: "fault-line",
    role: "Initiator",
    number: 11,
    joined: "January 2025",
    age: 20,
    quote: "I flash for Vexa like it's my own peek. Sometimes it is.",
    bio: [
      "The youngest player on the Fault Line roster, Rune arrived from the Clutch academy after an open qualifier run that ended with him top-fragging against three professional teams in a row.",
      "His job is information: drones, flashes and the first read of where the defence is stacked. Analysts have noticed his habit of taking second contact himself when the entry is traded — it has quietly become one of the team's best patterns.",
    ],
    stats: [
      { label: "Rating", value: "1.09" },
      { label: "Avg. combat score", value: "226" },
      { label: "K / D", value: "1.07" },
      { label: "Flash assists per map", value: "5.2" },
      { label: "Clutches won", value: "5 / 19" },
      { label: "Headshot %", value: "27%" },
    ],
    pool: ["Moth", "Sounder", "Ember"],
    setup: [
      { label: "DPI", value: "800" },
      { label: "Sensitivity", value: "0.28" },
      { label: "eDPI", value: "224" },
      { label: "Mouse", value: "Kestrel Talon Air, 58 g" },
      { label: "Monitor", value: "24.5″ · 360 Hz" },
    ],
    crosshair: {
      color: "#d7ff3a",
      length: 4,
      gap: 2,
      thickness: 2,
      dot: false,
    },
    career: [
      { years: "2025–", team: "Clutch", note: "Promoted from academy" },
      {
        years: "2024",
        team: "Clutch Academy",
        note: "Open qualifier semi-final",
      },
    ],
  },
  {
    id: "hollow",
    handle: "Hollow",
    name: "Tomás Reyes",
    country: "Spain",
    countryCode: "ES",
    division: "fault-line",
    role: "Sentinel",
    number: 4,
    joined: "June 2023",
    age: 26,
    quote: "Anchor means you're alone a lot. I like the quiet.",
    bio: [
      "Hollow holds a site on his own while the rest of the team rotates away from it, which suits a player who spent his early career on teams that could never afford a fifth. He is the reason opponents rarely win a fast execute on Clutch's B sites.",
      "He finished the Tidewater overtime against Hexa Club with a 1v3 retake and a defuse with 0.4 seconds left, which is now on a T-shirt.",
    ],
    stats: [
      { label: "Rating", value: "1.11" },
      { label: "Avg. combat score", value: "219" },
      { label: "K / D", value: "1.13" },
      { label: "Multi-kill rounds", value: "18%" },
      { label: "Clutches won", value: "11 / 27" },
      { label: "Headshot %", value: "31%" },
    ],
    pool: ["Vigil", "Warden", "Haze"],
    setup: [
      { label: "DPI", value: "800" },
      { label: "Sensitivity", value: "0.35" },
      { label: "eDPI", value: "280" },
      { label: "Mouse", value: "Kestrel Vane, 61 g" },
      { label: "Monitor", value: "24.5″ · 240 Hz" },
    ],
    crosshair: { color: "#00e5c7", length: 2, gap: 2, thickness: 2, dot: true },
    career: [
      {
        years: "2023–",
        team: "Clutch",
        note: "Northern Circuit All-Pro, Spring 2025",
      },
      {
        years: "2019–2023",
        team: "Mesa Roja",
        note: "Iberian League champion 2022",
      },
    ],
  },
  {
    id: "kairo",
    handle: "Kairo",
    name: "Daniel Kowalczyk",
    country: "Poland",
    countryCode: "PL",
    division: "ascendancy",
    role: "Top lane",
    number: 9,
    joined: "November 2024",
    age: 23,
    quote: "Top lane is an island. I bring a book.",
    bio: [
      "Kairo plays the lane the rest of the map forgets about, and he likes it that way. His tank picks give Clutch the patience their late-game style depends on.",
      "He is the only player on the Ascendancy roster who did not come through the academy; we signed him from a second-division Polish team after he solo-killed our academy top laner six times in one scrim block.",
    ],
    stats: [
      { label: "KDA", value: "3.4" },
      { label: "CS per minute", value: "8.6" },
      { label: "Kill participation", value: "61%" },
      { label: "Damage taken share", value: "29%" },
      { label: "Solo kills", value: "11" },
      { label: "Games played", value: "10" },
    ],
    pool: ["Bastion Rook", "Thorne", "Old Marrowgate"],
    setup: [
      { label: "Mouse", value: "Kestrel Vane, 61 g" },
      { label: "Keyboard", value: "Kestrel Strata TKL" },
      { label: "Camera", value: "Locked, edge-pan off" },
    ],
    career: [
      { years: "2024–", team: "Clutch", note: "Premier EU debut" },
      {
        years: "2022–2024",
        team: "Wisła Gaming",
        note: "Polish Division 2 champion",
      },
    ],
  },
  {
    id: "mossy",
    handle: "Mossy",
    name: "Freya Lindqvist",
    country: "Sweden",
    countryCode: "SE",
    division: "ascendancy",
    role: "Jungle",
    number: 14,
    joined: "January 2025",
    age: 19,
    quote: "I'm everywhere you didn't put a ward.",
    bio: [
      "Mossy leads the league in objective control at nineteen. She plays the map as a set of timers and is usually first to the river when a dragon is about to spawn.",
      "She came up through the Clutch academy and still streams academy review sessions on Sunday mornings.",
    ],
    stats: [
      { label: "KDA", value: "4.1" },
      { label: "Objective control", value: "68%" },
      { label: "Kill participation", value: "74%" },
      { label: "Vision score per min", value: "1.9" },
      { label: "First blood rate", value: "40%" },
      { label: "Games played", value: "10" },
    ],
    pool: ["Nettle", "Ise the Warden", "Hound of Ash"],
    setup: [
      { label: "Mouse", value: "Kestrel Talon, 63 g" },
      { label: "Keyboard", value: "Kestrel Strata 65%" },
      { label: "Camera", value: "Semi-locked" },
    ],
    career: [
      { years: "2025–", team: "Clutch", note: "Promoted from academy" },
      {
        years: "2023–2024",
        team: "Clutch Academy",
        note: "Academy league MVP",
      },
    ],
  },
  {
    id: "sable",
    handle: "Sable",
    name: "Amara Okoye",
    country: "Belgium",
    countryCode: "BE",
    division: "ascendancy",
    role: "Mid lane",
    number: 3,
    joined: "March 2024",
    age: 21,
    quote: "Late game is where the patient people get paid.",
    bio: [
      "Sable is the carry in Clutch's late-game plan: scaling mages that look harmless at fifteen minutes and decide the game at thirty-five. Three of the team's six wins this split ended with her on more than 40% of the team's damage.",
      "She studies replays with the sound off and the minimap enlarged, and she will tell you about it.",
    ],
    stats: [
      { label: "KDA", value: "5.2" },
      { label: "Damage share", value: "31%" },
      { label: "CS per minute", value: "9.1" },
      { label: "Kill participation", value: "69%" },
      { label: "Player of the game", value: "4×" },
      { label: "Games played", value: "10" },
    ],
    pool: ["Veyra", "The Lamplighter", "Quill"],
    setup: [
      { label: "Mouse", value: "Kestrel Talon Air, 58 g" },
      { label: "Keyboard", value: "Kestrel Strata TKL" },
      { label: "Camera", value: "Unlocked" },
    ],
    career: [
      {
        years: "2024–",
        team: "Clutch",
        note: "Premier EU Rookie of the Split, Split 1 2025",
      },
      {
        years: "2023",
        team: "Clutch Academy",
        note: "Academy league finalist",
      },
    ],
  },
  {
    id: "tidal",
    handle: "Tidal",
    name: "Noah Bergstra",
    country: "Netherlands",
    countryCode: "NL",
    division: "ascendancy",
    role: "Bot lane carry",
    number: 17,
    joined: "January 2025",
    age: 20,
    quote: "Give me twenty minutes and a support who trusts me.",
    bio: [
      "Tidal is a Rotterdam kid who used to queue in the Clutch House café between school and dinner. He plays the hyper-carries that need protecting and repays it in teamfights.",
      "His lane partnership with Pip is the oldest on the roster: they have played together since academy try-outs in 2023.",
    ],
    stats: [
      { label: "KDA", value: "4.6" },
      { label: "CS per minute", value: "9.8" },
      { label: "Damage share", value: "28%" },
      { label: "Deaths per game", value: "1.9" },
      { label: "Gold diff at 15", value: "+340" },
      { label: "Games played", value: "10" },
    ],
    pool: ["Arrowmaker", "Sister Kesh", "Drift"],
    setup: [
      { label: "Mouse", value: "Kestrel Vane, 61 g" },
      { label: "Keyboard", value: "Kestrel Strata 65%" },
      { label: "Camera", value: "Locked" },
    ],
    career: [
      { years: "2025–", team: "Clutch", note: "Promoted from academy" },
      {
        years: "2023–2024",
        team: "Clutch Academy",
        note: "Academy league champion",
      },
    ],
  },
  {
    id: "pip",
    handle: "Pip",
    name: "Lucas Moreau",
    country: "France",
    countryCode: "FR",
    division: "ascendancy",
    role: "Support",
    number: 5,
    joined: "January 2025",
    age: 21,
    quote: "My best games, you don't notice me. That's the point.",
    bio: [
      "Pip keeps Tidal alive and the map lit. He leads the league in wards placed and is the calmest voice on comms when a fight goes sideways.",
      "He studied graphic design before going pro and drew the first sketch of the 2026 home jersey pattern on a napkin.",
    ],
    stats: [
      { label: "KDA", value: "4.9" },
      { label: "Vision score per min", value: "3.2" },
      { label: "Kill participation", value: "77%" },
      { label: "Wards per game", value: "41" },
      { label: "Saves per game", value: "2.3" },
      { label: "Games played", value: "10" },
    ],
    pool: ["Mender Oon", "Lantern Kit", "Cassia"],
    setup: [
      { label: "Mouse", value: "Kestrel Talon, 63 g" },
      { label: "Keyboard", value: "Kestrel Strata TKL" },
      { label: "Camera", value: "Unlocked" },
    ],
    career: [
      { years: "2025–", team: "Clutch", note: "Promoted from academy" },
      {
        years: "2023–2024",
        team: "Clutch Academy",
        note: "Academy league champion",
      },
    ],
  },
  {
    id: "gale",
    handle: "Gale",
    name: "Rafael Pinto",
    country: "Portugal",
    countryCode: "PT",
    division: "iron-verdict",
    role: "Rushdown",
    number: 21,
    joined: "May 2025",
    age: 25,
    quote: "Fighting games are honest. Nobody else to blame.",
    bio: [
      "Gale won Verdict Open Lisbon in October in front of a home crowd, coming back from 0–2 in the grand final. He plays pressure characters and believes defence is something that happens to other people.",
      "He coaches a free Tuesday beginners' class at Clutch House and keeps an arcade stick at the front desk for anyone who wants to try.",
    ],
    stats: [
      { label: "Set record 2026", value: "41–12" },
      { label: "Game win rate", value: "68%" },
      { label: "World Tour points", value: "1,840" },
      { label: "Best 2026 placing", value: "1st · Verdict Open Lisbon" },
    ],
    pool: ["Kade", "Sorrow", "Big Tamsin"],
    setup: [
      { label: "Controller", value: "Leverless, custom layout" },
      { label: "Input delay", value: "Monitor 1 frame" },
    ],
    career: [
      {
        years: "2025–",
        team: "Clutch",
        note: "First Clutch fighting-game signing",
      },
      {
        years: "2019–2025",
        team: "Independent",
        note: "Iberian ranking #1, 2024",
      },
    ],
  },
  {
    id: "marrow",
    handle: "Marrow",
    name: "Hana Novak",
    country: "Czechia",
    countryCode: "CZ",
    division: "iron-verdict",
    role: "Zoner",
    number: 13,
    joined: "May 2025",
    age: 28,
    quote: "I would like you to stay over there, please.",
    bio: [
      "Marrow is the patient half of Clutch's fighting-game room: projectile characters, long-range buttons and a habit of reading jump-ins two seconds before they happen.",
      "She has finished top 8 at five of the last six European majors and writes the team's character-matchup sheets that Gale pretends not to read.",
    ],
    stats: [
      { label: "Set record 2026", value: "37–14" },
      { label: "Game win rate", value: "63%" },
      { label: "World Tour points", value: "1,520" },
      { label: "Best 2026 placing", value: "3rd · Iron Cup Paris" },
    ],
    pool: ["Oriel", "Sorrow", "Weathervane"],
    setup: [
      { label: "Controller", value: "Arcade stick, square gate" },
      { label: "Input delay", value: "Monitor 1 frame" },
    ],
    career: [
      { years: "2025–", team: "Clutch", note: "Signed alongside Gale" },
      {
        years: "2017–2025",
        team: "Independent",
        note: "Czech national champion four times",
      },
    ],
  },
];

/* ───────────────────────── Opponents & matches ───────────────────────── */

export const opponents: Record<
  string,
  { name: string; tag: string; city: string }
> = {
  varg: { name: "Varg Esports", tag: "VRG", city: "Oslo" },
  hexa: { name: "Hexa Club", tag: "HEX", city: "Lyon" },
  riptide: { name: "Riptide Gaming", tag: "RPT", city: "Cork" },
  corvid: { name: "Corvid", tag: "CRV", city: "Berlin" },
  northbound: { name: "Northbound", tag: "NBD", city: "Helsinki" },
  kilowatt: { name: "Kilowatt", tag: "KWT", city: "Copenhagen" },
  monolith: { name: "Monolith", tag: "MNL", city: "Warsaw" },
};

export type Moment = { round: number; text: string };

/**
 * A game inside a series. Fault Line maps carry a round "tape": one letter per round,
 * uppercase = Clutch won it, lowercase = the opponent did. E elimination, P spike
 * detonated, D spike defused, T time ran out. The map score is derived from the tape.
 */
export type Game = { name: string; detail?: string } & (
  { tape: string; moments: Moment[] } | { us: number; them: number }
);

export type Match = {
  id: string;
  date: string;
  division: DivisionId;
  opponent: keyof typeof opponents;
  event: string;
  stage: string;
  format: string;
  venue: string;
  /** Lineup that played (player ids). */
  lineup: string[];
  games?: Game[];
  recap?: string;
  /** Upcoming matches only: what to know before it starts. */
  preview?: string;
  mvp?: string;
};

export const matches: Match[] = [
  {
    id: "2026-10-24-varg",
    date: "2026-10-24T19:00",
    division: "fault-line",
    opponent: "varg",
    event: "Northern Circuit",
    stage: "Week 7",
    format: "Best of 3",
    venue: "Home · screened at Clutch House",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    preview:
      "First against second. Varg beat us 2–1 in the spring final and have not dropped a map since week three. Their Gantry is the best in the league; expect Patch to ban it and pick Tidewater, where we are 6–0 this year.",
  },
  {
    id: "2026-10-25-northbound",
    date: "2026-10-25T18:00",
    division: "ascendancy",
    opponent: "northbound",
    event: "Ascendancy Premier EU",
    stage: "Week 7",
    format: "Best of 1",
    venue: "Online · Premier studio, Cologne",
    lineup: ["kairo", "mossy", "sable", "tidal", "pip"],
    preview:
      "Northbound play the fastest early game in the league. If Mossy can trade objectives evenly to twenty minutes, Sable's scaling should take over. A win puts us level on points with third place.",
  },
  {
    id: "2026-10-31-monolith",
    date: "2026-10-31T16:00",
    division: "fault-line",
    opponent: "monolith",
    event: "Northern Circuit",
    stage: "Week 8",
    format: "Best of 3",
    venue: "Away · Monolith Arena, Warsaw",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    preview:
      "Our only regular-season trip abroad. Monolith sit sixth and need the win to make playoffs, so expect aggressive pistol rounds and a lot of Saltworks.",
  },
  {
    id: "2026-11-01-corvid",
    date: "2026-11-01T17:00",
    division: "ascendancy",
    opponent: "corvid",
    event: "Ascendancy Premier EU",
    stage: "Week 8",
    format: "Best of 1",
    venue: "Online · Premier studio, Cologne",
    lineup: ["kairo", "mossy", "sable", "tidal", "pip"],
    preview:
      "Corvid lead the league. They beat us in 41 minutes last split; Tidal says this one will be shorter.",
  },
  {
    id: "2026-10-17-hexa-club",
    date: "2026-10-17T19:00",
    division: "fault-line",
    opponent: "hexa",
    event: "Northern Circuit",
    stage: "Week 6",
    format: "Best of 3",
    venue: "Home · Clutch House",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    mvp: "hollow",
    recap:
      "Down 8–12 on the deciding map, one round from losing the series, Clutch won six rounds in a row. Vexa held a 1v2 against the clock, Okami's smokes dragged it to overtime and Hollow finished it with a 1v3 retake on A.",
    games: [
      {
        name: "Saltworks",
        detail: "Hexa pick",
        tape: "deEEEdeTtTeeEEeEePTDDT",
        moments: [
          {
            round: 3,
            text: "Rune's double on the force buy breaks Hexa's opening rhythm.",
          },
          { round: 13, text: "Second-half pistol won to make it 6–7." },
          {
            round: 19,
            text: "Clutch lead for the first time since round five, and never give it back.",
          },
          {
            round: 22,
            text: "Hexa never get the spike down. Map one to Clutch, 13–9.",
          },
        ],
      },
      {
        name: "Gantry",
        detail: "Clutch pick",
        tape: "TDEetePeeEdEdeEEpeEpEpe",
        moments: [
          {
            round: 7,
            text: "Patch's double fake to B pulls three defenders; Okami plants A unopposed.",
          },
          {
            round: 23,
            text: "Hexa close Gantry out with a full-buy retake. 1–1.",
          },
        ],
      },
      {
        name: "Tidewater",
        detail: "Decider",
        tape: "eEEepEpEEPPeeeeEeeedTEEEED",
        moments: [
          {
            round: 10,
            text: "Rune's flash read on Lower Dock stretches a four-round run to 6–4.",
          },
          {
            round: 15,
            text: "Four rounds lost in a row across the half. Hexa lead 8–7.",
          },
          {
            round: 20,
            text: "Hexa defuse with two seconds left and reach map point at 8–12.",
          },
          {
            round: 21,
            text: "Vexa alone against two, spike never planted. The clock runs out on Hexa.",
          },
          {
            round: 24,
            text: "Okami's smoke line onto Crane forces overtime at 12–12.",
          },
          {
            round: 26,
            text: "Hollow 1v3 on the A retake, defuse with 0.4 s left. Series to Clutch.",
          },
        ],
      },
    ],
  },
  {
    id: "2026-10-11-kilowatt",
    date: "2026-10-11T18:00",
    division: "ascendancy",
    opponent: "kilowatt",
    event: "Ascendancy Premier EU",
    stage: "Week 6",
    format: "Best of 1",
    venue: "Online · Premier studio, Cologne",
    lineup: ["kairo", "mossy", "sable", "tidal", "pip"],
    mvp: "sable",
    recap:
      "A textbook late game. Kilowatt led by 4,000 gold at twenty minutes; Sable's first full item came online at twenty-eight and Clutch won the next three fights without losing a player.",
    games: [
      { name: "Game 1", detail: "Blue side · 36:12 · kills", us: 24, them: 13 },
    ],
  },
  {
    id: "2026-10-10-corvid",
    date: "2026-10-10T19:00",
    division: "fault-line",
    opponent: "corvid",
    event: "Northern Circuit",
    stage: "Week 5",
    format: "Best of 3",
    venue: "Away · Corvid studio, Berlin",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    mvp: "vexa",
    recap:
      "Two overtime-length maps, zero maps won. Corvid's defence on Quayside forced Clutch into slow defaults and the eco management never recovered. Vexa's 31 kills on map two were the bright spot.",
    games: [
      {
        name: "Quayside",
        detail: "Corvid pick",
        tape: "EeTDEeedeDePPpEedEeEppEe",
        moments: [
          {
            round: 12,
            text: "Okami plants under a full smoke wall to level the half at 6–6.",
          },
          {
            round: 24,
            text: "Map lost 11–13 after Clutch pulled back to 11–12.",
          },
        ],
      },
      {
        name: "Foundry",
        detail: "Clutch pick",
        tape: "pddEeEEEEpeeEeEpeDPeDdEEEpee",
        moments: [
          {
            round: 9,
            text: "Four rounds in a row from 1–4 down. Clutch lead 5–4.",
          },
          {
            round: 25,
            text: "Vexa's quad on the overtime pistol puts Clutch at map point.",
          },
          {
            round: 28,
            text: "Corvid win three straight to close out the series.",
          },
        ],
      },
    ],
  },
  {
    id: "2026-10-04-verdict-open",
    date: "2026-10-04T21:30",
    division: "iron-verdict",
    opponent: "monolith",
    event: "Verdict Open Lisbon",
    stage: "Grand final",
    format: "First to 3, bracket reset",
    venue: "Pavilhão Ribeira, Lisbon",
    lineup: ["gale"],
    mvp: "gale",
    recap:
      "Gale came through the losers bracket, reset the grand final against Monolith's Kuro and won the second set 3–2 after trailing 0–2. The Lisbon crowd did the rest.",
    games: [
      { name: "Set 1", detail: "Bracket reset forced", us: 3, them: 1 },
      { name: "Set 2", detail: "Gale from 0–2 down", us: 3, them: 2 },
    ],
  },
  {
    id: "2026-10-04-varg",
    date: "2026-10-04T17:00",
    division: "ascendancy",
    opponent: "varg",
    event: "Ascendancy Premier EU",
    stage: "Week 5",
    format: "Best of 1",
    venue: "Online · Premier studio, Cologne",
    lineup: ["kairo", "mossy", "sable", "tidal", "pip"],
    mvp: "mossy",
    recap:
      "Varg punished a slow first dragon and snowballed from there. Mossy's early invade was the only lead Clutch held.",
    games: [
      { name: "Game 1", detail: "Red side · 27:48 · kills", us: 9, them: 17 },
    ],
  },
  {
    id: "2026-10-03-riptide",
    date: "2026-10-03T19:00",
    division: "fault-line",
    opponent: "riptide",
    event: "Northern Circuit",
    stage: "Week 4",
    format: "Best of 3",
    venue: "Home · Clutch House",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    mvp: "okami",
    recap:
      "The cleanest series of the split: 26 rounds won to 13, no overtime, and Okami's utility damage was the highest of any player this season.",
    games: [
      {
        name: "Tidewater",
        detail: "Clutch pick",
        tape: "EEPEPEEpEtpEEEeEeE",
        moments: [
          {
            round: 7,
            text: "Seven rounds to none before Riptide get on the board.",
          },
        ],
      },
      {
        name: "Lockhaven",
        detail: "Riptide pick",
        tape: "EEdEETdEDEePDedePEedP",
        moments: [
          {
            round: 21,
            text: "Vexa's plant survives a three-man retake and closes the series.",
          },
        ],
      },
    ],
  },
  {
    id: "2026-09-27-monolith",
    date: "2026-09-27T18:00",
    division: "ascendancy",
    opponent: "monolith",
    event: "Ascendancy Premier EU",
    stage: "Week 4",
    format: "Best of 1",
    venue: "Online · Premier studio, Cologne",
    lineup: ["kairo", "mossy", "sable", "tidal", "pip"],
    mvp: "kairo",
    recap:
      "Kairo's teleport flank at thirty-one minutes caught four Monolith players in the river and ended the game a minute later.",
    games: [
      { name: "Game 1", detail: "Blue side · 32:30 · kills", us: 19, them: 11 },
    ],
  },
  {
    id: "2026-09-26-northbound",
    date: "2026-09-26T19:00",
    division: "fault-line",
    opponent: "northbound",
    event: "Northern Circuit",
    stage: "Week 3",
    format: "Best of 3",
    venue: "Away · Northbound Hall, Helsinki",
    lineup: ["patch", "vexa", "okami", "rune", "hollow"],
    mvp: "rune",
    recap:
      "A three-map win on the road. Rune's 1.38 rating across the series is his career best.",
    games: [
      {
        name: "Saltworks",
        detail: "Northbound pick",
        tape: "EPEDEEPDEdpTeePdePeP",
        moments: [
          {
            round: 1,
            text: "Pistol round won; Clutch lead from the first round to the last.",
          },
        ],
      },
      {
        name: "Gantry",
        detail: "Clutch pick",
        tape: "EPppPeppePPPpPEeeEeeed",
        moments: [
          {
            round: 22,
            text: "Northbound's defence holds Clutch to three second-half rounds. 1–1.",
          },
        ],
      },
      {
        name: "Lockhaven",
        detail: "Decider",
        tape: "EEDtedEpEEDpppDEeDdDpED",
        moments: [
          { round: 23, text: "Rune's last-round double wins the series." },
        ],
      },
    ],
  },
];

export const standings = {
  title: "Northern Circuit · Autumn Split 2026",
  note: "Top six qualify for the December playoffs in Rotterdam.",
  rows: [
    { team: "Varg Esports", tag: "VRG", w: 10, l: 2, maps: "+14" },
    { team: "Clutch", tag: "CLT", w: 9, l: 3, maps: "+9", us: true },
    { team: "Corvid", tag: "CRV", w: 8, l: 4, maps: "+7" },
    { team: "Hexa Club", tag: "HEX", w: 7, l: 5, maps: "+3" },
    { team: "Northbound", tag: "NBD", w: 5, l: 7, maps: "−2" },
    { team: "Monolith", tag: "MNL", w: 4, l: 8, maps: "−6" },
    { team: "Riptide Gaming", tag: "RPT", w: 3, l: 9, maps: "−11" },
    { team: "Saltmarsh", tag: "SLT", w: 2, l: 10, maps: "−14" },
  ],
};

/* ───────────────────────── News ───────────────────────── */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Results" | "Roster" | "Club" | "Partners" | "Shop";
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "six-rounds-in-a-row",
    title: "Six rounds in a row: how Clutch came back on Tidewater",
    dek: "One round from losing the series to Hexa Club, the Fault Line team won the next six. The players walk us through it.",
    category: "Results",
    date: "2026-10-18",
    author: "Maud de Wit",
    image: squad,
    imageAlt:
      "Players in headsets lean towards their screens at a row of match desks.",
    body: [
      {
        type: "p",
        text: "At 8–12 on Tidewater, Hexa Club needed one round. They had the money, the man advantage after the first contact and a spike in hand. What they did not have was time, because Vexa had decided she was not going to let them plant.",
      },
      {
        type: "quote",
        text: "I couldn't see the score from where I was, honestly. I only knew there were two of them and the clock was on my side.",
        cite: "Vexa",
      },
      { type: "h2", text: "Round 21: the clock" },
      {
        type: "p",
        text: "With her team dead around her, Vexa repositioned three times in forty seconds, never letting either attacker get a clean line to the site. The round ended with the spike still in Hexa's hands and the timer at zero. It is the first time-out round Clutch have won on Tidewater this year.",
      },
      { type: "h2", text: "Rounds 22 to 24: Okami's smokes" },
      {
        type: "p",
        text: "The comeback that followed was built on utility. Coach Marit 'Daybreak' Vos had flagged in preparation that Hexa rotate through Crane when pressured. Okami spent the next three rounds closing that rotation with a smoke line he had practised exactly once, in a scrim two weeks earlier.",
      },
      {
        type: "quote",
        text: "We drew it on the whiteboard in the timeout. He said 'I think I know it'. That was the whole conversation.",
        cite: "Marit 'Daybreak' Vos, head coach",
      },
      { type: "h2", text: "Round 26: Hollow" },
      {
        type: "p",
        text: "Overtime ended where Clutch's best rounds always end: with Hollow alone on a site. Three Hexa players, the spike planted on A and a retake that needed every second. The defuse finished with 0.4 seconds on the timer. You can scrub every round of the series on the match page.",
      },
      {
        type: "p",
        text: "Clutch are second in the Northern Circuit at 9–3 and play league leaders Varg Esports at home on Saturday 24 October. Clutch House doors open at 17:30.",
      },
    ],
  },
  {
    slug: "gale-wins-verdict-open-lisbon",
    title: "Gale wins Verdict Open Lisbon from the losers bracket",
    dek: "Our first fighting-game title, won the hard way: two grand-final sets and a 0–2 hole in the second.",
    category: "Results",
    date: "2026-10-05",
    author: "Maud de Wit",
    image: controller,
    imageAlt: "A game controller on a dark desk, its light bar glowing orange.",
    body: [
      {
        type: "p",
        text: "Gale lost his second-round winners match on Saturday and then won eleven sets in a row. The last two were against Monolith's Kuro, the tournament's top seed, in front of a Lisbon crowd that had adopted him by the quarter-finals.",
      },
      {
        type: "p",
        text: "Down 0–2 in the final set, he switched to his secondary character for the first time all weekend. Kuro did not take another game.",
      },
      {
        type: "quote",
        text: "Marrow told me in the break that I was too predictable. I was too predictable. So I stopped.",
        cite: "Gale",
      },
      {
        type: "p",
        text: "The win moves Gale to 14th in the Verdict World Tour standings, inside the cut for the season finals in February.",
      },
    ],
  },
  {
    slug: "the-2026-kit",
    title: "The 2026 kit: a harbour, a scoreboard and a napkin",
    dek: "Pip sketched the pattern. The harbour gave us the colours. Here is how the new home and away jerseys came together.",
    category: "Shop",
    date: "2026-09-12",
    author: "Ines Bakker",
    image: keyboard,
    imageAlt:
      "A mechanical keyboard glowing in the dark, keys lit from beneath.",
    body: [
      {
        type: "p",
        text: "The 2026 home jersey started as a doodle on a café napkin: Pip, our support player and a former design student, drew the round-by-round strip from a Northern Circuit broadcast and turned it into a pattern.",
      },
      { type: "h2", text: "The chevrons are real rounds" },
      {
        type: "p",
        text: "Every chevron on the chest is a round from our 2025 spring final run, in order: orange for rounds we won, dark for rounds we lost. If you know the series, you can read it.",
      },
      {
        type: "p",
        text: "The away jersey flips the palette to harbour-crane white, after the cranes you can see from the Clutch House roof.",
      },
      {
        type: "quote",
        text: "I wanted a shirt that a fan could explain to a stranger at a bus stop.",
        cite: "Pip",
      },
      {
        type: "p",
        text: "Both jerseys are made from recycled polyester and can be printed with any handle up to twelve characters. They are in the shop now and ship from Rotterdam.",
      },
    ],
  },
  {
    slug: "rune-extends-to-2028",
    title: "Rune signs through 2028",
    dek: "The academy graduate extends his contract by two years.",
    category: "Roster",
    date: "2026-09-02",
    author: "Clutch staff",
    image: hero,
    imageAlt:
      "A player in a headset leans into a monitor lit orange in a dark room.",
    body: [
      {
        type: "p",
        text: "Emil 'Rune' Sørvik has signed a contract extension that keeps him at Clutch until the end of the 2028 season. Rune joined the academy in 2024 and was promoted to the Fault Line roster in January 2025.",
      },
      {
        type: "quote",
        text: "This is the team that gave me a chance when I was a kid with a good aim and no idea how to play the game. I want to win the Circuit here.",
        cite: "Rune",
      },
      {
        type: "p",
        text: "As with every Clutch contract, the extension includes a fixed weekly practice cap, access to our sports psychologist and a guaranteed education budget.",
      },
    ],
  },
  {
    slug: "kestrel-renews",
    title: "Kestrel renews as peripherals partner",
    dek: "Three more years of mice, keyboards and a co-designed desk mat.",
    category: "Partners",
    date: "2026-08-20",
    author: "Clutch staff",
    image: mat,
    imageAlt:
      "A game controller resting on a desk mat with an orange glowing edge.",
    body: [
      {
        type: "p",
        text: "Kestrel Peripherals, our partner since 2021, have renewed through 2029. Every Clutch player across all three divisions uses Kestrel equipment, chosen by the players themselves from the full range.",
      },
      {
        type: "p",
        text: "The renewal includes the Tidewater desk mat, co-designed with Okami and printed with the map's callouts, and a new coaching series at Clutch House for players under eighteen.",
      },
      {
        type: "quote",
        text: "They let our players pick their own gear and they listen when we say a mouse is wrong. That's the partnership.",
        cite: "Joost Verhagen, Clutch general manager",
      },
    ],
  },
  {
    slug: "player-welfare-charter",
    title: "Our player welfare charter, published in full",
    dek: "Practice caps, rest days and mental health support, written down so you can hold us to it.",
    category: "Club",
    date: "2026-07-14",
    author: "Joost Verhagen",
    image: house,
    imageAlt:
      "An audience in a dark hall watches a match on a large projection screen.",
    body: [
      {
        type: "p",
        text: "Esports careers are short and the hours can be brutal. We think the best players are the ones who are still playing at thirty, so this year we wrote down what every Clutch player is entitled to.",
      },
      { type: "h2", text: "What the charter guarantees" },
      {
        type: "p",
        text: "A maximum of 40 hours of structured practice per week. Two full days off, with no scrims and no media. A sports psychologist available to every player and coach. An education budget of €2,000 per year. A physio check every month.",
      },
      {
        type: "p",
        text: "The charter is reviewed every January by the players' council, which has one representative from each division.",
      },
    ],
  },
  {
    slug: "academy-tryouts-2027",
    title: "Academy tryouts for 2027 are open",
    dek: "Two Fault Line spots and one Ascendancy spot. Sign-ups close 30 November.",
    category: "Club",
    date: "2026-10-01",
    author: "Clutch staff",
    image: squad,
    imageAlt:
      "Players in headsets lean towards their screens at a row of practice desks.",
    body: [
      {
        type: "p",
        text: "The Clutch academy is looking for three players for 2027: two for Fault Line and one jungler for Ascendancy. Five of our current professional players came through the academy.",
      },
      {
        type: "p",
        text: "You need to be sixteen or older on 1 January 2027 and able to train from Clutch House at least three evenings a week. Players under eighteen need a parent or guardian's consent.",
      },
      {
        type: "p",
        text: "Send your handle, rank history and two VODs to academy@clutch.example. We reply to everyone.",
      },
    ],
  },
];

/* ───────────────────────── Shop ───────────────────────── */

export type ArtKind = "jersey" | "hoodie" | "tee" | "cap" | "mat" | "scarf";

export type Product = {
  id: string;
  name: string;
  price: number;
  kind: ArtKind;
  /** Garment base and print colours for the authored artwork. */
  colors: { base: string; print: string };
  sizes: string[];
  /** Jerseys can carry a printed handle on the back. */
  nameplate?: { price: number; max: number };
  blurb: string;
  details: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "home-jersey-2026",
    name: "2026 Home Jersey",
    price: 69,
    kind: "jersey",
    colors: { base: "#161a22", print: "#ff5a1f" },
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    nameplate: { price: 12, max: 12 },
    blurb:
      "The jersey the team wears on stage. The chevrons on the chest are every round of our 2025 spring final run.",
    details: [
      "100% recycled polyester, 150 g/m²",
      "Athletic cut — size up for a looser fit",
      "Sublimated print, won't crack or peel",
      "Name printed in Rotterdam within 3 working days",
    ],
    badge: "Worn on stage",
  },
  {
    id: "away-jersey-2026",
    name: "2026 Away Jersey",
    price: 69,
    kind: "jersey",
    colors: { base: "#ecebe4", print: "#161a22" },
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    nameplate: { price: 12, max: 12 },
    blurb:
      "Harbour-crane white with night-blue rounds. Worn at away matches and LAN finals.",
    details: [
      "100% recycled polyester, 150 g/m²",
      "Athletic cut — size up for a looser fit",
      "Sublimated print, won't crack or peel",
      "Name printed in Rotterdam within 3 working days",
    ],
  },
  {
    id: "last-round-hoodie",
    name: "Last Round Hoodie",
    price: 75,
    kind: "hoodie",
    colors: { base: "#232a36", print: "#ff5a1f" },
    sizes: ["S", "M", "L", "XL", "XXL"],
    blurb:
      "Heavyweight hoodie with the round-strip printed down the left sleeve. Warm enough for a cold stage.",
    details: [
      "80% organic cotton, 20% recycled polyester, 420 g/m²",
      "Relaxed fit",
      "Screen-printed sleeve and back",
      "Made in Portugal",
    ],
  },
  {
    id: "zero-point-four-tee",
    name: "0.4 Seconds Tee",
    price: 32,
    kind: "tee",
    colors: { base: "#ecebe4", print: "#ff5a1f" },
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    blurb:
      "Hollow's defuse against Hexa Club, recorded for posterity. 0.4 on the front, the round tape on the back.",
    details: [
      "100% organic cotton, 180 g/m²",
      "Regular fit",
      "Water-based screen print",
      "Made in Portugal",
    ],
    badge: "New",
  },
  {
    id: "clutch-cap",
    name: "Six-Panel Cap",
    price: 29,
    kind: "cap",
    colors: { base: "#161a22", print: "#ff5a1f" },
    sizes: ["One size"],
    blurb:
      "Unstructured cap with the Clutch chevron embroidered on the front and the club year on the strap.",
    details: [
      "100% cotton twill",
      "Adjustable metal buckle",
      "Embroidered front and side",
    ],
  },
  {
    id: "tidewater-desk-mat",
    name: "Tidewater Desk Mat",
    price: 39,
    kind: "mat",
    colors: { base: "#0f1218", print: "#7cc4ff" },
    sizes: ["XL · 900 × 400 mm", "L · 450 × 400 mm"],
    blurb:
      "Co-designed with Okami and Kestrel. The Tidewater map in callout lines, on the same cloth surface the team plays on.",
    details: [
      "Kestrel Control cloth surface",
      "4 mm natural rubber base",
      "Stitched edges",
      "Printed with the official callouts",
    ],
  },
  {
    id: "matchday-scarf",
    name: "Matchday Scarf",
    price: 25,
    kind: "scarf",
    colors: { base: "#ff5a1f", print: "#161a22" },
    sizes: ["One size"],
    blurb:
      "Knitted jacquard scarf for Clutch House match nights. It gets loud in there; it also gets cold on the walk home.",
    details: ["100% acrylic double-knit", "140 × 18 cm", "Fringed ends"],
  },
];

export const shipping = {
  flat: 6,
  freeOver: 80,
  note: "Ships from Rotterdam in 1–3 working days. Free returns within 30 days, except name-printed jerseys.",
};

/* ───────────────────────── Partners ───────────────────────── */

export const partners = [
  {
    name: "Kestrel Peripherals",
    role: "Peripherals partner",
    since: 2021,
    what: "Mice, keyboards and headsets for all three divisions, chosen by the players. Co-designed Tidewater desk mat.",
  },
  {
    name: "Kade Bank",
    role: "Principal partner",
    since: 2024,
    what: "Front-of-jersey partner and presenting partner of the Clutch House match nights.",
  },
  {
    name: "Fuse Hydration",
    role: "Hydration partner",
    since: 2025,
    what: "Sugar-free electrolyte drinks on stage and in the practice room. Sponsor of the welfare charter's physio programme.",
  },
  {
    name: "Veldt Mobile",
    role: "Connectivity partner",
    since: 2023,
    what: "Fibre and backup 5G at Clutch House, so practice never stops for a router.",
  },
  {
    name: "Ostra Seating",
    role: "Seating partner",
    since: 2026,
    what: "Chairs for the training floor and the stage, fitted to each player by a physiotherapist.",
  },
];

export const partnerFormats = [
  {
    title: "Jersey and stage",
    text: "Sleeve and chest positions on the 2026 kit, worn on stage, on stream and on every player photo of the season.",
  },
  {
    title: "Broadcast moments",
    text: "Presenting rights for the Clutch Moment of the Week: a two-minute breakdown of our best round, published every Monday.",
  },
  {
    title: "Clutch House nights",
    text: "Naming and activation at home match screenings: 220 seats, every week of the season, mostly 18–30 and mostly local.",
  },
  {
    title: "Community programmes",
    text: "The academy, the Thursday coaching nights and the Tuesday fighting-game class. Partners here fund the hours, not the logos.",
  },
];

export const audience = {
  note: "Illustrative season figures for this demo.",
  rows: [
    { label: "Average live viewers, Fault Line home matches", value: "38,000" },
    { label: "Clutch House match-night attendance", value: "190 of 220 seats" },
    { label: "Followers across platforms", value: "640,000" },
    { label: "Audience aged 18–30", value: "71%" },
    { label: "Audience based in the Benelux", value: "34%" },
  ],
};

/* ───────────────────────── Club ───────────────────────── */

export const timeline = [
  {
    year: "2019",
    text: "Five friends from a Katendrecht LAN café enter the Northern Circuit open qualifier under the name Clutch. They lose in round two.",
  },
  {
    year: "2021",
    text: "First professional contracts and the first partner, Kestrel. The team trains from a rented office above a bike shop.",
  },
  {
    year: "2023",
    text: "Patch and Hollow join. The Fault Line team qualifies for the Circuit's top division.",
  },
  {
    year: "2024",
    text: "Clutch House opens in a converted harbour warehouse: training floor, academy room and a 220-seat screening hall.",
  },
  {
    year: "2025",
    text: "Ascendancy and Iron Verdict divisions launch. Spring final runner-up in the Northern Circuit.",
  },
  {
    year: "2026",
    text: "Player welfare charter published. Gale wins Verdict Open Lisbon, our first title outside Fault Line.",
  },
];

export const staff = [
  { name: "Joost Verhagen", role: "General manager" },
  { name: "Marit 'Daybreak' Vos", role: "Head coach, Fault Line" },
  { name: "Jonas 'Ledger' Okafor", role: "Head coach, Ascendancy" },
  { name: "Sami 'Framedata' Haddad", role: "Coach, Iron Verdict" },
  { name: "Dr. Elif Şahin", role: "Sports psychologist" },
  { name: "Ines Bakker", role: "Creative director" },
  { name: "Maud de Wit", role: "Head of content" },
  { name: "Ruben Hoekstra", role: "Academy lead" },
];

export const clutchHouse = {
  hours: [
    { day: "Match nights", time: "Doors 90 minutes before first game" },
    { day: "Café & shop, Tue–Sat", time: "12:00–20:00" },
    {
      day: "Community nights",
      time: "Tue fighting games · Thu Fault Line, 19:00",
    },
  ],
  text: "Clutch House is a converted harbour warehouse on the Katendrecht peninsula. The team trains upstairs; downstairs is a 220-seat screening hall, a café and the shop. Home matches are screened free for members and €8 at the door for everyone else.",
};

export const charter = [
  "No more than 40 hours of structured practice a week",
  "Two full days off, every week of the season",
  "A sports psychologist available to every player and coach",
  "€2,000 a year education budget, per player",
  "Monthly physio check and an ergonomic seat fitting",
];

export const home = {
  title: "Clutch plays for the last round.",
  intro:
    "Esports club from Rotterdam with teams in Fault Line, Ascendancy and Iron Verdict. Follow the matches, meet the players, wear the kit — or come and watch with us at Clutch House.",
  houseTitle: "Every home match, on a very big screen.",
  close: "Saturday is first against second.",
};
