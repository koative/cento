import hero from "./assets/hero.jpg";
import women from "./assets/women.jpg";
import womenRun from "./assets/women-run.jpg";
import womenBall from "./assets/women-ball.jpg";
import youth from "./assets/youth.jpg";
import girls from "./assets/girls.jpg";
import camp from "./assets/camp.jpg";
import keeper from "./assets/keeper.jpg";
import corner from "./assets/corner.jpg";
import flag from "./assets/flag.jpg";
import mist from "./assets/mist.jpg";
import clubhouse from "./assets/clubhouse.jpg";
import ground from "./assets/ground.jpg";
import chalk from "./assets/chalk.jpg";

export type Photo = { src: string; alt: string; w: number; h: number };

export const photos = {
  hero: {
    src: hero,
    alt: "Two under-16 players chase the ball across a sunlit pitch during a league match",
    w: 1800,
    h: 1200,
  },
  women: {
    src: women,
    alt: "A forward in a white kit dribbles past a defender in red",
    w: 1280,
    h: 853,
  },
  womenRun: {
    src: womenRun,
    alt: "A midfielder sprints back into position in front of the goal",
    w: 1280,
    h: 853,
  },
  womenBall: {
    src: womenBall,
    alt: "A player in white turns with the ball on the touchline",
    w: 1280,
    h: 853,
  },
  youth: {
    src: youth,
    alt: "Two teenage boys contest the ball on a grass pitch",
    w: 1280,
    h: 1024,
  },
  girls: {
    src: girls,
    alt: "Young girls in bibs chase a ball across a park pitch",
    w: 1024,
    h: 683,
  },
  camp: {
    src: camp,
    alt: "A boy dribbles through a line of training cones at a summer camp",
    w: 600,
    h: 516,
  },
  keeper: {
    src: keeper,
    alt: "Goalkeeper gloves resting on the grass beside an orange marker cone",
    w: 1000,
    h: 866,
  },
  corner: {
    src: corner,
    alt: "A red and white corner flag casting a long shadow over fresh white lines",
    w: 1280,
    h: 720,
  },
  flag: {
    src: flag,
    alt: "A faded red corner flag on a park pitch, trees behind",
    w: 640,
    h: 800,
  },
  mist: {
    src: mist,
    alt: "Early mist over an empty training pitch with wooden benches",
    w: 1280,
    h: 853,
  },
  clubhouse: {
    src: clubhouse,
    alt: "The clubhouse and changing rooms beside the main pitch rail",
    w: 1280,
    h: 964,
  },
  ground: {
    src: ground,
    alt: "The full-size pitch on The Common under a clear winter sky",
    w: 1280,
    h: 960,
  },
  chalk: {
    src: chalk,
    alt: "A chalked corner arc on worn grass",
    w: 1000,
    h: 800,
  },
} satisfies Record<string, Photo>;

/** The demo's fixed "today": fixtures before it are results, after it are upcoming. */
export const clubToday = "2026-10-15";
/** FA age groups are set by a player's age on 31 August at the start of the season. */
export const ageCutoff = "2026-08-31";
export const season = "2026/27";

export const brand = {
  name: "Field United",
  full: "Field United Community Football Club",
  founded: 1952,
  town: "Millbrook",
  ground: "The Common",
  address: ["The Common", "Ashby Lane", "Millbrook MB4 2QT"],
  email: "hello@fieldunited.example",
  welfareEmail: "welfare@fieldunited.example",
  phone: "+44 1632 960412",
  phoneLabel: "01632 960412",
  motto: "Our game. Our ground. Our people.",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/teams", label: "Teams" },
  { to: "/fixtures", label: "Fixtures & results" },
  { to: "/coaching", label: "Coaching" },
  { to: "/news", label: "News" },
  { to: "/about", label: "The club" },
];

/* ---------------------------------------------------------------- teams */

export type Pos = "GK" | "DF" | "MF" | "FW";
export type Player = {
  n: number;
  name: string;
  pos: Pos;
  apps: number;
  goals: number;
  since: number;
};
type Row = [
  n: number,
  pos: Pos,
  name: string,
  apps: number,
  goals: number,
  since: number,
];
const squad = (rows: Row[]): Player[] =>
  rows.map(([n, pos, name, apps, goals, since]) => ({
    n,
    pos,
    name,
    apps,
    goals,
    since,
  }));

export type Group = "Senior" | "Junior" | "Mini" | "Walking";
export type Who = "Men" | "Women" | "Boys" | "Girls" | "Mixed";
export type Format = 11 | 9 | 7 | 6 | 5;
export type Coach = { name: string; role: string; badge: string };
export type Session = { day: Day; start: string; end: string; where: string };
export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Team = {
  slug: string;
  name: string;
  short: string;
  group: Group;
  who: Who;
  minAge: number;
  maxAge: number;
  ages: string;
  format: Format;
  formations: string[];
  league: string;
  matchday: string;
  pitch: string;
  /** Results are recorded with scores (FA guidance: no published scores or tables below Under-12). */
  scores: boolean;
  plan: PlanId;
  lede: string;
  about: string[];
  photo: Photo;
  training: Session[];
  coaches: Coach[];
  captain: number;
  /** Shirt numbers of the starting line-up: keeper first, then each line back to front, left to right. */
  xi: number[];
  squad: Player[];
};

export const formations: Record<Format, string[]> = {
  11: ["4-4-2", "4-3-3", "3-5-2", "4-2-3-1"],
  9: ["3-3-2", "3-2-3", "2-4-2"],
  7: ["2-3-1", "3-2-1", "2-1-2-1"],
  6: ["2-2-1", "3-1-1", "2-1-2"],
  5: ["2-1-1", "1-2-1", "2-2"],
};

export const teams: Team[] = [
  {
    slug: "first-team",
    name: "Men's First Team",
    short: "First Team",
    group: "Senior",
    who: "Men",
    minAge: 16,
    maxAge: 99,
    ages: "16 and over",
    format: 11,
    formations: formations[11],
    league: "Millbrook & District League, Premier Division",
    matchday: "Saturdays, 15:00 (14:00 from November)",
    pitch: "Pitch 1",
    scores: true,
    plan: "senior",
    lede: "Saturday football on Pitch 1, a back four that has kept the same captain for twelve seasons, and a striker who still celebrates like it's his first.",
    about: [
      "The First Team finished fourth last season, their best league finish since the clubhouse went up in 1987. Manager Wes Agyeman runs a short-passing side that trains on Tuesdays and Thursdays under the new Pitch 2 lights.",
      "There's no closed shop. Every pre-season starts with open trials, and the Reserves are the first stop for anyone who wants to push for a shirt.",
    ],
    photo: photos.corner,
    training: [
      { day: "Tue", start: "19:30", end: "21:00", where: "Pitch 2 (floodlit)" },
      { day: "Thu", start: "19:30", end: "21:00", where: "Pitch 2 (floodlit)" },
    ],
    coaches: [
      { name: "Wes Agyeman", role: "Manager", badge: "UEFA B Licence" },
      { name: "Gary Rudd", role: "Assistant manager", badge: "FA Level 2" },
      { name: "Nadia Corr", role: "Physio", badge: "HCPC registered" },
    ],
    captain: 4,
    xi: [1, 3, 4, 5, 2, 11, 8, 16, 7, 9, 10],
    squad: squad([
      [1, "GK", "Danny Okafor", 112, 0, 2018],
      [13, "GK", "Lewis Barrow", 9, 0, 2025],
      [2, "DF", "Sam Whitlock", 87, 3, 2019],
      [3, "DF", "Kofi Mensah", 64, 2, 2021],
      [4, "DF", "Callum Reid", 203, 14, 2014],
      [5, "DF", "Josh Pereira", 41, 1, 2023],
      [6, "DF", "Harvey Coles", 22, 0, 2025],
      [7, "MF", "Theo Marsh", 95, 21, 2019],
      [8, "MF", "Rhys Adebayo", 120, 17, 2017],
      [10, "MF", "Jamie Fenn", 58, 26, 2022],
      [11, "MF", "Arun Gill", 33, 6, 2024],
      [14, "MF", "Ollie Stratton", 18, 2, 2025],
      [16, "MF", "Marcus Bell", 140, 9, 2016],
      [9, "FW", "Kieran Lowe", 76, 48, 2020],
      [17, "FW", "Tobi Akande", 12, 5, 2026],
      [19, "FW", "Ben Hargreaves", 29, 8, 2024],
    ]),
  },
  {
    slug: "women",
    name: "Women's First Team",
    short: "Women",
    group: "Senior",
    who: "Women",
    minAge: 16,
    maxAge: 99,
    ages: "16 and over",
    format: 11,
    formations: formations[11],
    league: "Downshire Women's League, Division One",
    matchday: "Sundays, 14:00",
    pitch: "Pitch 1",
    scores: true,
    plan: "senior",
    lede: "Started in 2014 with nine players and borrowed shirts. Now second in Division One and through to the County Cup second round.",
    about: [
      "Sophie Kerr has captained the side since its first league season. Head coach Dee Holloway took over in 2023 and moved training to Monday and Wednesday nights so it never clashes with the men's squad for the floodlights.",
      "New players are welcome at any point in the season, whether you played at school or never at all. Wednesday's session always starts with a twenty-minute technical warm-up open to beginners.",
    ],
    photo: photos.women,
    training: [
      { day: "Mon", start: "19:30", end: "21:00", where: "Pitch 2 (floodlit)" },
      { day: "Wed", start: "19:30", end: "21:00", where: "Pitch 2 (floodlit)" },
    ],
    coaches: [
      { name: "Dee Holloway", role: "Head coach", badge: "UEFA C Licence" },
      { name: "Ama Boateng", role: "Assistant coach", badge: "FA Level 1" },
      { name: "Nadia Corr", role: "Physio", badge: "HCPC registered" },
    ],
    captain: 5,
    xi: [1, 3, 5, 2, 6, 4, 8, 7, 11, 9, 10],
    squad: squad([
      [1, "GK", "Ellie Hartnell", 58, 0, 2021],
      [21, "GK", "Maya Stone", 6, 0, 2026],
      [2, "DF", "Grace Ndiaye", 44, 1, 2022],
      [3, "DF", "Hannah Pryce", 71, 4, 2020],
      [5, "DF", "Sophie Kerr", 96, 7, 2018],
      [6, "DF", "Lucy Tran", 30, 0, 2024],
      [12, "DF", "Amira Haddad", 15, 1, 2025],
      [4, "MF", "Jess Mallory", 66, 11, 2020],
      [7, "MF", "Chloe Fairbairn", 52, 19, 2021],
      [8, "MF", "Niamh O'Rourke", 81, 9, 2019],
      [11, "MF", "Priya Sandhu", 27, 6, 2024],
      [14, "MF", "Beth Lawless", 12, 1, 2025],
      [9, "FW", "Tash Ogunleye", 49, 37, 2022],
      [10, "FW", "Rosa Delgado", 63, 28, 2020],
      [17, "FW", "Imogen Cray", 19, 4, 2025],
      [18, "FW", "Zainab Musa", 8, 3, 2026],
    ]),
  },
  {
    slug: "reserves",
    name: "Men's Reserves",
    short: "Reserves",
    group: "Senior",
    who: "Men",
    minAge: 16,
    maxAge: 99,
    ages: "16 and over",
    format: 11,
    formations: formations[11],
    league: "Millbrook & District League, Division Two",
    matchday: "Saturdays, 15:00 (14:00 from November)",
    pitch: "Pitch 2",
    scores: true,
    plan: "senior",
    lede: "Half returning thirty-somethings, half sixteen-year-olds stepping up from the Under-16s. Everyone gets minutes.",
    about: [
      "The Reserves exist so that nobody who turns up to train goes a month without a game. Stuart Lamb picks the side on Thursday nights and rotates fairly: if you trained, you'll play.",
      "Players move between the Reserves and the First Team all season. Three of this year's First Team squad came up this way.",
    ],
    photo: photos.ground,
    training: [
      { day: "Thu", start: "19:30", end: "21:00", where: "Pitch 2 (floodlit)" },
    ],
    coaches: [
      { name: "Stuart Lamb", role: "Player-manager", badge: "FA Level 1" },
      { name: "Gary Rudd", role: "Coach", badge: "FA Level 2" },
    ],
    captain: 4,
    xi: [1, 2, 4, 5, 3, 7, 6, 8, 10, 9, 14],
    squad: squad([
      [1, "GK", "Phil Garner", 44, 0, 2020],
      [2, "DF", "Aaron Kelso", 31, 0, 2023],
      [3, "DF", "Dev Patel", 52, 2, 2021],
      [4, "DF", "Stuart Lamb", 166, 6, 2012],
      [5, "DF", "Mo Rahman", 23, 1, 2024],
      [12, "DF", "Nathan Boyce", 9, 0, 2026],
      [6, "MF", "Gareth Pope", 88, 7, 2017],
      [7, "MF", "Luca Bianchi", 40, 9, 2022],
      [8, "MF", "Ethan Cole", 14, 1, 2026],
      [10, "MF", "Jordan Wray", 35, 11, 2023],
      [11, "MF", "Charlie Dunn", 19, 3, 2025],
      [9, "FW", "Femi Adeyemi", 47, 22, 2021],
      [14, "FW", "Ryan Tolley", 28, 8, 2024],
      [15, "FW", "Will Ashdown", 11, 4, 2026],
    ]),
  },
  {
    slug: "under-16",
    name: "Under-16 Boys",
    short: "Under-16s",
    group: "Junior",
    who: "Boys",
    minAge: 14,
    maxAge: 15,
    ages: "14 and 15",
    format: 11,
    formations: formations[11],
    league: "Downshire Youth League, Under-16 Division A",
    matchday: "Sundays, 10:30",
    pitch: "Pitch 2",
    scores: true,
    plan: "junior",
    lede: "The last junior year before the step up. Full-size pitch, full-size goals, and a squad that has stayed together since Under-9s.",
    about: [
      "Coaches Femi Adeyemi and Jo Pike run the Under-16s as a bridge into senior football: players train once a month with the Reserves and are invited to pre-season with the First Team.",
      "We publish first names and initials only for players under 18.",
    ],
    photo: photos.youth,
    training: [
      { day: "Wed", start: "18:00", end: "19:30", where: "Pitch 2 (floodlit)" },
    ],
    coaches: [
      { name: "Femi Adeyemi", role: "Head coach", badge: "FA Level 2" },
      {
        name: "Jo Pike",
        role: "Assistant coach",
        badge: "FA Introduction to Coaching",
      },
    ],
    captain: 6,
    xi: [1, 3, 4, 5, 2, 11, 6, 8, 7, 9, 10],
    squad: squad([
      [1, "GK", "Oscar H.", 18, 0, 2018],
      [2, "DF", "Leo M.", 17, 1, 2019],
      [3, "DF", "Isaac B.", 18, 0, 2017],
      [4, "DF", "Rory P.", 16, 2, 2019],
      [5, "DF", "Dylan K.", 15, 0, 2021],
      [12, "DF", "Noah S.", 9, 0, 2024],
      [6, "MF", "Kai W.", 18, 4, 2017],
      [7, "MF", "Zak A.", 17, 6, 2018],
      [8, "MF", "Freddie T.", 16, 3, 2020],
      [10, "MF", "Musa D.", 14, 7, 2022],
      [11, "MF", "Alfie R.", 13, 1, 2023],
      [15, "MF", "Toby G.", 7, 0, 2025],
      [9, "FW", "Jayden O.", 18, 14, 2018],
      [14, "FW", "Ibrahim C.", 10, 3, 2024],
    ]),
  },
  {
    slug: "under-14-girls",
    name: "Under-14 Girls",
    short: "Under-14 Girls",
    group: "Junior",
    who: "Girls",
    minAge: 11,
    maxAge: 13,
    ages: "11 to 13",
    format: 9,
    formations: formations[9],
    league: "Downshire Girls' League, Under-14 Division",
    matchday: "Sundays, 10:00",
    pitch: "Pitch 3",
    scores: true,
    plan: "junior",
    lede: "Nine-a-side, played fast. Half of this squad started at First Touch Fridays; the other half brought their friends.",
    about: [
      "Coach Ama Boateng also plays for the Women's First Team, and the squad watches the women's home games as a group once a month, with a tea-hut voucher each.",
      "We publish first names and initials only for players under 18.",
    ],
    photo: photos.womenBall,
    training: [{ day: "Tue", start: "18:00", end: "19:15", where: "Pitch 3" }],
    coaches: [
      { name: "Ama Boateng", role: "Head coach", badge: "FA Level 1" },
      {
        name: "Kerry Nwosu",
        role: "Team manager",
        badge: "FA Safeguarding Children",
      },
    ],
    captain: 6,
    xi: [1, 2, 4, 3, 5, 6, 7, 9, 10],
    squad: squad([
      [1, "GK", "Ava P.", 9, 0, 2022],
      [2, "DF", "Mia R.", 9, 0, 2022],
      [3, "DF", "Ruby K.", 8, 1, 2023],
      [4, "DF", "Isla M.", 9, 0, 2021],
      [11, "DF", "Sienna B.", 5, 0, 2025],
      [5, "MF", "Layla H.", 9, 3, 2022],
      [6, "MF", "Esme T.", 9, 2, 2021],
      [7, "MF", "Freya D.", 8, 4, 2023],
      [8, "MF", "Holly W.", 6, 1, 2024],
      [9, "FW", "Nia A.", 9, 7, 2022],
      [10, "FW", "Poppy L.", 7, 5, 2023],
      [12, "FW", "Zara Q.", 4, 1, 2026],
    ]),
  },
  {
    slug: "under-11",
    name: "Under-11 Mixed",
    short: "Under-11s",
    group: "Junior",
    who: "Mixed",
    minAge: 9,
    maxAge: 10,
    ages: "9 and 10",
    format: 7,
    formations: formations[7],
    league: "Millbrook Junior League (no tables)",
    matchday: "Saturdays, 09:30",
    pitch: "Pitch 3",
    scores: false,
    plan: "junior",
    lede: "Seven-a-side on a pitch the right size for nine-year-old legs. Equal minutes, rotating keepers and no published scores.",
    about: [
      "FA rules mean there are no league tables below Under-12, and we go a step further: we don't publish scores either. Coaches report on what the team tried, not what the scoreboard said.",
      "Every player takes a turn in goal across the season and everyone plays at least half of every match.",
    ],
    photo: photos.girls,
    training: [{ day: "Thu", start: "17:30", end: "18:30", where: "Pitch 3" }],
    coaches: [
      { name: "Raj Varma", role: "Head coach", badge: "FA Playmaker" },
      {
        name: "Lisa Grant",
        role: "Assistant coach",
        badge: "FA Introduction to Coaching",
      },
    ],
    captain: 4,
    xi: [1, 2, 9, 4, 5, 6, 7],
    squad: squad([
      [1, "GK", "Elliot F.", 6, 0, 2023],
      [2, "DF", "Maisie J.", 6, 0, 2022],
      [3, "DF", "Arlo N.", 5, 0, 2024],
      [9, "DF", "Hana Y.", 6, 0, 2023],
      [4, "MF", "Yusuf B.", 6, 0, 2022],
      [5, "MF", "Daisy C.", 6, 0, 2022],
      [6, "MF", "Finn O.", 5, 0, 2023],
      [10, "MF", "Jack E.", 4, 0, 2025],
      [7, "FW", "Lola G.", 6, 0, 2022],
      [8, "FW", "Reuben S.", 5, 0, 2024],
    ]),
  },
  {
    slug: "mini-kickers",
    name: "Mini Kickers",
    short: "Mini Kickers",
    group: "Mini",
    who: "Mixed",
    minAge: 4,
    maxAge: 8,
    ages: "4 to 8",
    format: 5,
    formations: formations[5],
    league: "Millbrook Mini Festivals (no scores)",
    matchday: "Saturdays, 09:00",
    pitch: "Small-sided area",
    scores: false,
    plan: "mini",
    lede: "Saturday mornings, small goals, lots of touches. Parents on the touchline, squash and orange slices at half-time.",
    about: [
      "Mini Kickers is where most of our players start. Sessions are games-based: no queues, no laps, a ball for every child. Once a month we travel to a mini festival with three or four other clubs.",
      "Your first two sessions are free and you don't need boots. Trainers and shin pads are fine; we have spare pads in the clubhouse.",
    ],
    photo: photos.camp,
    training: [
      { day: "Sat", start: "09:00", end: "10:00", where: "Small-sided area" },
    ],
    coaches: [
      { name: "Hollie Marsh", role: "Lead coach", badge: "FA Playmaker" },
      { name: "Dan Price", role: "Coach", badge: "FA Playmaker" },
    ],
    captain: 3,
    xi: [1, 2, 3, 4, 5],
    squad: squad([
      [1, "GK", "Ezra T.", 4, 0, 2025],
      [2, "DF", "Matilda R.", 4, 0, 2025],
      [3, "DF", "Sonny W.", 4, 0, 2024],
      [4, "MF", "Ivy C.", 3, 0, 2025],
      [5, "FW", "Albie K.", 4, 0, 2025],
      [6, "MF", "Rosie D.", 3, 0, 2026],
      [7, "FW", "Otis M.", 2, 0, 2026],
      [8, "DF", "Nell A.", 2, 0, 2026],
    ]),
  },
  {
    slug: "walking-football",
    name: "Walking Football",
    short: "Walking Football",
    group: "Walking",
    who: "Mixed",
    minAge: 50,
    maxAge: 99,
    ages: "50 and over",
    format: 6,
    formations: formations[6],
    league: "Friendlies & the Downshire Walking Football Festival",
    matchday: "Wednesday friendlies, 11:00",
    pitch: "Pitch 3",
    scores: true,
    plan: "walking",
    lede: "Six-a-side, no running, no contact, ball below head height. The most competitive hour of the week, followed by the best biscuits.",
    about: [
      "Walking football started at Field United in 2021 with six people and a borrowed bag of balls. Five years on there are thirty-one regulars, aged 51 to 83.",
      "If you have a heart condition or a recent injury, talk to us first. Coach Graham Pike is a qualified first-aider and the session pace is set by whoever needs it slowest.",
    ],
    photo: photos.mist,
    training: [
      { day: "Wed", start: "10:00", end: "11:00", where: "Pitch 3" },
      { day: "Fri", start: "10:00", end: "11:00", where: "Pitch 3" },
    ],
    coaches: [
      {
        name: "Graham Pike",
        role: "Organiser & coach",
        badge: "FA Walking Football Leader",
      },
    ],
    captain: 6,
    xi: [1, 2, 3, 6, 7, 9],
    squad: squad([
      [1, "GK", "Brian Moss", 61, 0, 2021],
      [2, "DF", "Keith Allard", 58, 4, 2021],
      [3, "DF", "Jean Paxton", 44, 2, 2022],
      [4, "DF", "Desmond Rowe", 39, 1, 2022],
      [5, "MF", "Lorraine Fitch", 33, 6, 2023],
      [6, "MF", "Graham Pike", 64, 9, 2021],
      [7, "MF", "Sunil Varma", 40, 12, 2022],
      [8, "MF", "Pauline Hurst", 27, 3, 2024],
      [9, "FW", "Terry Odell", 60, 31, 2021],
      [10, "FW", "Viv Marsh", 18, 5, 2025],
    ]),
  },
];

export const groups: { id: Group; label: string; note: string }[] = [
  {
    id: "Senior",
    label: "Senior",
    note: "16 and over, Saturday and Sunday leagues",
  },
  { id: "Junior", label: "Junior", note: "Ages 9 to 15, weekend leagues" },
  { id: "Mini", label: "Mini Kickers", note: "Ages 4 to 8, Saturday mornings" },
  {
    id: "Walking",
    label: "Walking Football",
    note: "50 and over, weekday mornings",
  },
];

/* ------------------------------------------------------------- fixtures */

export type Fixture = {
  id: string;
  team: string;
  date: string;
  ko: string;
  opp: string;
  home: boolean;
  comp: string;
  /** [us, them]; omitted for upcoming games and for age groups that don't record scores. */
  score?: [number, number];
  report?: string;
};

const fx = (
  team: string,
  date: string,
  ko: string,
  opp: string,
  home: boolean,
  comp: string,
  score?: [number, number],
  report?: string,
): Fixture => ({
  id: `${team}-${date}`,
  team,
  date,
  ko,
  opp,
  home,
  comp,
  score,
  report,
});

const prem = "League";
export const fixtures: Fixture[] = [
  fx("first-team", "2026-09-05", "15:00", "Pelham Park", true, prem, [2, 1]),
  fx(
    "first-team",
    "2026-09-12",
    "15:00",
    "Whitlow United",
    false,
    prem,
    [0, 0],
  ),
  fx(
    "first-team",
    "2026-09-19",
    "15:00",
    "Brindle Vale",
    true,
    "County Saturday Cup R1",
    [4, 2],
  ),
  fx(
    "first-team",
    "2026-09-26",
    "15:00",
    "Hatherley Town",
    false,
    prem,
    [1, 3],
  ),
  fx("first-team", "2026-10-03", "15:00", "Fenwick Albion", true, prem, [3, 1]),
  fx(
    "first-team",
    "2026-10-10",
    "15:00",
    "Kingsmere Wanderers",
    false,
    prem,
    [2, 2],
    "two-all-at-kingsmere",
  ),
  fx("first-team", "2026-10-17", "15:00", "Eastside Rovers", true, prem),
  fx("first-team", "2026-10-24", "15:00", "Sedgecombe", false, prem),
  fx(
    "first-team",
    "2026-10-31",
    "14:30",
    "Tannery Lane",
    true,
    "County Saturday Cup R2",
  ),
  fx("first-team", "2026-11-07", "14:00", "Oak Athletic", true, prem),
  fx("women", "2026-09-13", "14:00", "Copse Lane", false, prem, [2, 2]),
  fx("women", "2026-09-20", "14:00", "Ashgrove", true, prem, [3, 0]),
  fx("women", "2026-09-27", "14:00", "Redcastle Sports", false, prem, [1, 2]),
  fx("women", "2026-10-04", "14:00", "North End", true, prem, [4, 1]),
  fx(
    "women",
    "2026-10-11",
    "14:00",
    "Sedgecombe Women",
    true,
    "County Women's Cup R1",
    [3, 1],
    "women-cup-sedgecombe",
  ),
  fx("women", "2026-10-18", "14:00", "Pelham Park", false, prem),
  fx("women", "2026-10-25", "14:00", "Kingsmere Wanderers", true, prem),
  fx("women", "2026-11-08", "13:00", "Ashgrove", false, prem),
  fx(
    "reserves",
    "2026-09-12",
    "15:00",
    "Hatherley Town Reserves",
    true,
    prem,
    [1, 0],
  ),
  fx(
    "reserves",
    "2026-09-26",
    "15:00",
    "Whitlow United Reserves",
    true,
    prem,
    [2, 4],
  ),
  fx(
    "reserves",
    "2026-10-10",
    "15:00",
    "Fenwick Albion Reserves",
    false,
    prem,
    [3, 3],
  ),
  fx(
    "reserves",
    "2026-10-17",
    "15:00",
    "Eastside Rovers Reserves",
    false,
    prem,
  ),
  fx("reserves", "2026-10-31", "14:30", "Brindle Vale Reserves", false, prem),
  fx("under-16", "2026-09-20", "10:30", "Oak Athletic U16", true, prem, [5, 2]),
  fx(
    "under-16",
    "2026-10-04",
    "10:30",
    "Tannery Lane U16",
    false,
    prem,
    [1, 1],
  ),
  fx("under-16", "2026-10-11", "10:30", "Copse Lane U16", true, prem, [0, 2]),
  fx("under-16", "2026-10-18", "10:30", "Redcastle Sports U16", false, prem),
  fx("under-16", "2026-11-01", "10:30", "Ashgrove U16", true, prem),
  fx(
    "under-14-girls",
    "2026-09-27",
    "10:00",
    "Pelham Park Girls",
    true,
    prem,
    [2, 3],
  ),
  fx(
    "under-14-girls",
    "2026-10-11",
    "10:00",
    "Hatherley Girls",
    false,
    prem,
    [4, 0],
  ),
  fx("under-14-girls", "2026-10-18", "10:00", "Brindle Vale Girls", true, prem),
  fx("under-14-girls", "2026-11-01", "10:00", "Sedgecombe Girls", false, prem),
  fx("under-11", "2026-09-26", "09:30", "Fenwick Albion U11", false, prem),
  fx("under-11", "2026-10-10", "09:30", "Kingsmere U11", true, prem),
  fx("under-11", "2026-10-17", "09:30", "Whitlow United U11", true, prem),
  fx("under-11", "2026-10-31", "09:30", "Oak Athletic U11", false, prem),
  fx(
    "mini-kickers",
    "2026-10-10",
    "09:00",
    "Pelham Park Mini Festival",
    false,
    "Festival",
  ),
  fx(
    "mini-kickers",
    "2026-10-24",
    "09:00",
    "Field United Mini Festival",
    true,
    "Festival",
  ),
  fx(
    "walking-football",
    "2026-10-07",
    "11:00",
    "Sedgecombe Strollers",
    true,
    "Friendly",
    [4, 4],
  ),
  fx(
    "walking-football",
    "2026-10-21",
    "11:00",
    "Oakhurst Walking FC",
    false,
    "Friendly",
  ),
  fx(
    "walking-football",
    "2026-11-04",
    "11:00",
    "Downshire Festival",
    false,
    "Festival",
  ),
];

export type TableRow = {
  club: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  pts: number;
};
type T = [
  club: string,
  p: number,
  w: number,
  d: number,
  l: number,
  gf: number,
  ga: number,
];
const table = (rows: T[]): TableRow[] =>
  rows.map(([club, p, w, d, l, gf, ga]) => ({
    club,
    p,
    w,
    d,
    l,
    gf,
    ga,
    pts: w * 3 + d,
  }));

export const tables: Record<string, { league: string; rows: TableRow[] }> = {
  "first-team": {
    league: "Millbrook & District League, Premier Division",
    rows: table([
      ["Hatherley Town", 5, 4, 1, 0, 12, 4],
      ["Kingsmere Wanderers", 5, 3, 2, 0, 11, 6],
      ["Field United", 5, 2, 2, 1, 8, 7],
      ["Eastside Rovers", 5, 2, 1, 2, 9, 8],
      ["Sedgecombe", 5, 2, 1, 2, 7, 8],
      ["Whitlow United", 5, 1, 3, 1, 5, 5],
      ["Oak Athletic", 4, 1, 2, 1, 6, 6],
      ["Pelham Park", 5, 1, 1, 3, 6, 9],
      ["Fenwick Albion", 5, 1, 0, 4, 5, 11],
      ["Tannery Lane", 4, 0, 1, 3, 3, 10],
    ]),
  },
  women: {
    league: "Downshire Women's League, Division One",
    rows: table([
      ["Redcastle Sports", 4, 4, 0, 0, 13, 3],
      ["Field United", 4, 2, 1, 1, 10, 5],
      ["Pelham Park", 4, 2, 1, 1, 7, 5],
      ["Copse Lane", 4, 1, 2, 1, 6, 6],
      ["Kingsmere Wanderers", 4, 1, 1, 2, 5, 7],
      ["North End", 4, 1, 1, 2, 6, 9],
      ["Ashgrove", 4, 1, 0, 3, 3, 9],
      ["Sedgecombe", 4, 0, 2, 2, 4, 10],
    ]),
  },
};

/* ------------------------------------------------------------ membership */

export type PlanId = "senior" | "junior" | "mini" | "walking" | "social";
export type Plan = {
  id: PlanId;
  name: string;
  who: string;
  season: number;
  monthly: number;
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "senior",
    name: "Senior player",
    who: "Men's, Women's and Reserves squads, 16+",
    season: 190,
    monthly: 19,
    includes: [
      "Two floodlit sessions a week",
      "League and cup registration",
      "Home kit loaned for the season",
      "£5 match fee on game days",
    ],
  },
  {
    id: "junior",
    name: "Junior player",
    who: "Under-11 to Under-16",
    season: 135,
    monthly: 13.5,
    includes: [
      "One coached session a week",
      "League registration and referees",
      "Training top to keep",
      "No match fees",
    ],
  },
  {
    id: "mini",
    name: "Mini Kickers",
    who: "Ages 4 to 8",
    season: 60,
    monthly: 6,
    includes: [
      "Saturday morning sessions",
      "Monthly mini festivals",
      "Field United T-shirt",
      "First two sessions free",
    ],
  },
  {
    id: "walking",
    name: "Walking football",
    who: "50 and over",
    season: 45,
    monthly: 4.5,
    includes: [
      "Wednesday and Friday mornings",
      "Friendlies and the county festival",
      "Tea and biscuits after",
    ],
  },
  {
    id: "social",
    name: "Supporter",
    who: "Parents, friends, former players",
    season: 25,
    monthly: 2.5,
    includes: [
      "A vote at the AGM",
      "10% off at the clubhouse bar",
      "The Monday Sheet by email",
      "Members' end-of-season do",
    ],
  },
];

export const feeNotes = [
  "Siblings: 20% off the second and every further junior or mini membership.",
  "Monthly plans run September to June, ten payments.",
  "The Hardship Fund covers fees and boots for any player who needs it. Ask the treasurer in confidence; nobody else is told.",
];

export const joinFaq = [
  {
    q: "Do I need to have played before?",
    a: "No. Every team has players who started late, and both Wednesday's women's session and Tuesday's adult returners hour open with a beginners' warm-up.",
  },
  {
    q: "Can my child try a session before we pay?",
    a: "Yes. The first two sessions for any junior or mini player are free. Send the form and the coach will message you with a time to come down.",
  },
  {
    q: "What does a new player need to bring?",
    a: "Shin pads, a water bottle and boots or trainers depending on the weather. Juniors are given a training top in their first month; spares of everything live in the clubhouse.",
  },
  {
    q: "How do age groups work?",
    a: "By the player's age on 31 August at the start of the season, as set by the FA. A child who is 10 on 31 August plays Under-11 for the whole season, even if they turn 11 in October.",
  },
  {
    q: "Who checks the coaches?",
    a: "Every coach and team manager holds an enhanced DBS check, an in-date FA Safeguarding Children certificate and first-aid training. Our welfare officer, Claire Benn, is the person to contact about any concern.",
  },
  {
    q: "Is there a waiting list?",
    a: "Only for Under-13 boys at the moment, while we find a second coach. Everyone else can start this month.",
  },
];

/* --------------------------------------------------------------- coaching */

export const coachingIntro = {
  title: "Coached by people who stay",
  lede: "Thirty-four volunteer coaches, all FA-qualified, all DBS-checked, most of them former or current players. The club pays for every course.",
};

export type Programme = {
  id: string;
  name: string;
  who: string;
  when: string;
  price: string;
  body: string;
  photo: Photo;
};
export const programmes: Programme[] = [
  {
    id: "half-term-camp",
    name: "October half-term camp",
    who: "Ages 6 to 12, any ability",
    when: "Mon 26 – Wed 28 October, 09:30–15:00",
    price: "£20 a day, £50 for all three",
    body: "Three days of games-based football on Pitches 2 and 3, a mini-World Cup on the Wednesday afternoon and a packed lunch break in the clubhouse if it rains.",
    photo: photos.camp,
  },
  {
    id: "goalkeeper-academy",
    name: "Goalkeeper academy",
    who: "Ages 9 to 16",
    when: "Thursdays 18:00–19:00",
    price: "£5 a session, free for club members",
    body: "Handling, footwork and the decisions nobody coaches until it's too late. Run by Danny Okafor, our First Team keeper, with a ball machine paid for by the 2025 quiz night.",
    photo: photos.keeper,
  },
  {
    id: "first-touch-fridays",
    name: "First Touch Fridays",
    who: "Girls aged 5 to 11, no experience",
    when: "Fridays 17:00–18:00",
    price: "Free",
    body: "A relaxed hour for girls who've never played in a team. No sign-up needed for the first visit: just come to the clubhouse door at five to five.",
    photo: photos.girls,
  },
  {
    id: "back-in-boots",
    name: "Back in boots",
    who: "Adults 18+, returning or brand new",
    when: "Tuesdays 18:30–19:30",
    price: "£4 on the night",
    body: "Small-sided games for adults who stopped playing at school, or who never started. Mixed, friendly, and nobody keeps score until the last ten minutes.",
    photo: photos.flag,
  },
];

export const coachPathway = [
  {
    step: "Help out",
    text: "Join a Saturday Mini Kickers session as a helper. No qualification needed, just a basic DBS check that the club arranges.",
  },
  {
    step: "Introduction to Coaching",
    text: "The FA's free online course. Takes about three hours and covers how to plan a session for any age.",
  },
  {
    step: "FA Playmaker / Level 1",
    text: "Your first badge. The club pays the fee and pairs you with a mentor coach for your first season.",
  },
  {
    step: "UEFA C and beyond",
    text: "For coaches who want to run a team. The club funds one UEFA C place every year, chosen at the AGM.",
  },
];

export const safeguarding = {
  officer: "Claire Benn",
  text: "Every adult working with children at Field United holds an enhanced DBS check and an in-date FA Safeguarding Children certificate. Concerns go to our welfare officer, never just a coach.",
};

/* ------------------------------------------------------------------ news */

export type Category = "Match report" | "Club" | "Juniors" | "Community";
export type Article = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  team?: string;
  author: string;
  standfirst: string;
  photo: Photo;
  body: string[];
};

export const articles = (
  [
    {
      slug: "women-cup-sedgecombe",
      title:
        "Women into the County Cup second round after a cold Sunday at The Common",
      date: "2026-10-12",
      category: "Match report",
      team: "women",
      author: "Dee Holloway",
      standfirst:
        "Field United 3, Sedgecombe Women 1. Tash Ogunleye scored twice, Sophie Kerr headed the other and the tea hut ran out of soup by half-time.",
      photo: photos.womenRun,
      body: [
        "We knew Sedgecombe would sit deep and they did, for forty minutes. The breakthrough came from the move we've been drilling on Wednesday nights: Niamh switched the ball to Priya on the left, Priya drove to the byline and Tash was there at the near post.",
        "Sedgecombe equalised just after the break with a free kick that Ellie had no chance with. For ten minutes it was the kind of game cups are lost in. Then Sophie met a Chloe Fairbairn corner, the same way she has since 2018, and the bench stopped worrying.",
        "Tash's second, a low finish after a long ball from Hannah Pryce, made the last quarter of an hour a pleasure to watch. The draw for the second round is on Thursday; we'd like a home tie and a bit more sun.",
        "Thanks to the 70-odd people who stood on the rail in that wind, and to the Under-14 Girls who led the teams out.",
      ],
    },
    {
      slug: "pitch-2-floodlights",
      title: "Floodlights on Pitch 2 from November, thanks to 214 donors",
      date: "2026-10-08",
      category: "Club",
      author: "Margaret Oduya, Chair",
      standfirst:
        "Eighteen months of quiz nights, a sponsored walk to the coast and a grant from the county football foundation have paid for six LED masts.",
      photo: photos.ground,
      body: [
        "The lights go on for the first time on Monday 2 November for the women's session. From then on every senior team can train after dark on grass rather than squeezing into the five-a-side cage.",
        "The total cost was £48,600. The football foundation grant covered £30,000; the rest came from 214 people, the biggest single donation being £2,500 from the Over-50s walking group, who would like it known they will never use the lights.",
        "The masts are LED and on a timer, so they switch off at 21:15 sharp. We promised the houses on Ashby Lane that, and we'll keep it.",
        "Every donor's name goes on the board by the clubhouse door this winter. Thank you, all of you.",
      ],
    },
    {
      slug: "half-term-camp-2026",
      title: "October half-term camp: three days, ages 6 to 12, £20 a day",
      date: "2026-10-05",
      category: "Juniors",
      author: "Hollie Marsh",
      standfirst:
        "Monday 26 to Wednesday 28 October on Pitches 2 and 3. Members and non-members welcome, any ability.",
      photo: photos.camp,
      body: [
        "Camp runs 09:30 to 15:00 each day with a one-hour lunch break in the clubhouse. Bring a packed lunch, a water bottle and clothes for whatever the weather decides to do.",
        "Each day mixes technical stations in the morning with matches in the afternoon. Wednesday afternoon is the mini-World Cup, with each group drawing a country and making a flag at lunchtime.",
        "Places are capped at 48 so every group has a ratio of one coach to eight children. Use the join form and choose 'Half-term camp' in the notes, or email the coaching inbox.",
      ],
    },
    {
      slug: "walking-football-five",
      title: "Walking football turns five, and still nobody runs",
      date: "2026-09-30",
      category: "Community",
      team: "walking-football",
      author: "Graham Pike",
      standfirst:
        "Six people and a bag of borrowed balls in 2021. Thirty-one regulars now, the oldest of them 83.",
      photo: photos.mist,
      body: [
        "The first session had six players, two of whom were my brothers-in-law under protest. We played three-a-side across half of Pitch 3 and argued about whether a jog counts as running. It does.",
        "What I didn't expect was how much of it happens after the hour. The tea afterwards takes longer than the football, and at least four friendships in the group now involve holidays.",
        "If you're over 50 and wondering whether it's for you, come on a Wednesday at ten. Wear trainers. Tell the person in the orange bib you're new; that's usually me.",
      ],
    },
    {
      slug: "two-all-at-kingsmere",
      title: "Two-all at Kingsmere: a point we'll take",
      date: "2026-10-11",
      category: "Match report",
      team: "first-team",
      author: "Wes Agyeman",
      standfirst:
        "Kingsmere Wanderers 2, Field United 2. Kieran Lowe's 48th goal for the club and a late Jamie Fenn equaliser away at the league's second-best side.",
      photo: photos.chalk,
      body: [
        "Kingsmere are unbeaten for a reason. They pressed us high for the first twenty minutes and scored twice from turnovers in our own half. That's on me; we didn't adjust quickly enough.",
        "Moving Marcus Bell deeper at half-time gave us an extra pass out of the back and the game changed. Kieran pulled one back from Rhys Adebayo's cross on 58 minutes, and Jamie bent in the equaliser from the edge of the box with four minutes left.",
        "Eastside Rovers at home on Saturday, 15:00. The last time they came to The Common it finished 4–3. Come and stand on the rail.",
      ],
    },
    {
      slug: "agm-2026",
      title: "AGM 2026: new committee, fees frozen, a second Under-13 team",
      date: "2026-09-21",
      category: "Club",
      author: "Tom Avery, Secretary",
      standfirst:
        "Fifty-eight members came to the clubhouse on a Monday night. Here is what was decided.",
      photo: photos.clubhouse,
      body: [
        "Fees are frozen for a second season. The treasurer's report showed a small surplus from the bar and the summer tournament, and the committee agreed to hold prices rather than build reserves.",
        "Priya Nandra was elected treasurer after Ken Ellery stepped down after nineteen years. Ken was given life membership and a framed shirt with the number 19 on the back.",
        "Members voted to start an Under-13 Boys team as soon as a second coach is found. Twelve boys are on the waiting list; if you could help, the coaching pathway starts with an hour on a Saturday morning.",
        "Minutes are pinned up in the clubhouse and available from the secretary on request.",
      ],
    },
    {
      slug: "pat-tea-hut",
      title: "Meet Pat, forty years behind the tea hut hatch",
      date: "2026-09-14",
      category: "Community",
      author: "Tom Avery",
      standfirst:
        "Pat Keane has served roughly 60,000 cups of tea at The Common. She has seen three clubhouses, two pitch drainages and one streaker.",
      photo: photos.clubhouse,
      body: [
        "Pat started helping in 1986 when her son joined the Under-10s. He stopped playing in 1999. She didn't stop making tea.",
        "The menu has barely changed: tea, coffee, squash, Bovril, and bacon rolls before Saturday games. The one change she allowed was oat milk in 2022, which she still calls 'the fancy one'.",
        "Asked for her best moment, Pat picked the women's first ever league win in 2015. 'Nine of them, and they won 2–1. I gave them all a free Bovril.'",
      ],
    },
  ] satisfies Article[]
).sort((a, b) => b.date.localeCompare(a.date)) as Article[];

export const categories: Category[] = [
  "Match report",
  "Club",
  "Juniors",
  "Community",
];

/* ------------------------------------------------------------------ club */

export const history = [
  {
    year: 1952,
    text: "Founded by workers from the Ashby Lane brickworks, playing on The Common in borrowed shirts.",
  },
  {
    year: 1974,
    text: "First league title: Millbrook & District Division One, won on the last day at Pelham Park.",
  },
  {
    year: 1987,
    text: "The clubhouse opens, built over two summers by members. The tea hut moves indoors.",
  },
  {
    year: 2003,
    text: "Junior section starts with an Under-9 team and a single coach.",
  },
  {
    year: 2014,
    text: "Women's team founded. Nine players, borrowed shirts again.",
  },
  { year: 2021, text: "Walking football begins on Wednesday mornings." },
  { year: 2026, text: "LED floodlights on Pitch 2, paid for by 214 donors." },
];

export const committee = [
  { name: "Margaret Oduya", role: "Chair", since: 2019 },
  { name: "Tom Avery", role: "Club secretary", since: 2016 },
  { name: "Priya Nandra", role: "Treasurer", since: 2026 },
  { name: "Claire Benn", role: "Welfare officer", since: 2020 },
  { name: "Ray Hollis", role: "Fixtures secretary", since: 2011 },
  { name: "Dennis Kerr", role: "Groundsman", since: 1998 },
];

export const facilities = [
  {
    id: "p1",
    name: "Pitch 1",
    text: "Full-size grass, the match pitch. Rail all the way round.",
  },
  {
    id: "p2",
    name: "Pitch 2",
    text: "Full-size grass, six LED floodlight masts from November 2026.",
  },
  {
    id: "p3",
    name: "Pitch 3",
    text: "9v9 and 7v7 markings; walking football on weekday mornings.",
  },
  {
    id: "mini",
    name: "Small-sided area",
    text: "Four mini pitches with pop-up goals for Mini Kickers.",
  },
  {
    id: "club",
    name: "Clubhouse",
    text: "Four changing rooms, bar, kitchen and the tea hut hatch.",
  },
  {
    id: "park",
    name: "Car park",
    text: "60 spaces, free. Overflow on Ashby Lane on festival days.",
  },
];

export const clubhouseHours = [
  { days: "Mon – Thu", hours: "18:00 – 22:30" },
  { days: "Friday", hours: "17:00 – 23:00" },
  { days: "Saturday", hours: "08:30 – 23:00" },
  { days: "Sunday", hours: "09:00 – 18:00" },
];

export const home = {
  title: brand.motto,
  lede: "Field United is Millbrook's community football club: eight teams from Mini Kickers to Walking Football, all playing on The Common since 1952. Everyone is welcome to play, coach, help or just stand on the rail.",
  pathwayTitle: "A team for every age, from four to eighty-three",
  pathwayLede:
    "Most of our players start at Mini Kickers and never quite leave. Pick your age to find your team.",
  coachingTitle: "Training this week",
  communityQuote: {
    text: "I came for my son's first session in 1986. He stopped playing in 1999. I'm still here every Saturday because this is where everybody is.",
    who: "Pat Keane, tea hut",
  },
  closeTitle: "Your first two sessions are on us",
  closeLede:
    "Juniors and minis train free for two weeks. Adults can come to any open session before deciding. Fees from £4.50 a month, and nobody misses out because of cost.",
};
