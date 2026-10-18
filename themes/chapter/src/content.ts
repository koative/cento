import walk from "./assets/walk.jpg";
import books from "./assets/books.jpg";
import night from "./assets/night.jpg";
import fieldStation from "./assets/field-station.jpg";
import kitchen from "./assets/kitchen.jpg";
import score from "./assets/score.jpg";
import studio from "./assets/studio.jpg";
import archiveMics from "./assets/archive-mics.jpg";
import fieldRecording from "./assets/field-recording.jpg";
import landscape from "./assets/landscape.jpg";
import hostLena from "./assets/host-lena.jpg";
import hostTheo from "./assets/host-theo.jpg";
import hostIris from "./assets/host-iris.jpg";
import hostNoor from "./assets/host-noor.jpg";
import hostMarco from "./assets/host-marco.jpg";
import hostRosa from "./assets/host-rosa.jpg";
import hostSol from "./assets/host-sol.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Chapter",
  sector: "Podcast network",
  tagline: "Conversations that take their time.",
  email: "hello@chapter.example",
  partnersEmail: "partners@chapter.example",
  pitchEmail: "pitches@chapter.example",
  phone: "+1 555 0136 2208",
  address: ["Chapter Audio", "41 Wren Street, Studio 3", "Portland, OR 97214"],
  studioHours: "Studio open Monday to Thursday, 10:00–18:00",
  feedBase: "https://feeds.chapter.example/",
};

export const nav = [
  { to: "/shows", label: "Shows" },
  { to: "/episodes", label: "Episodes" },
  { to: "/hosts", label: "Hosts" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/advertise", label: "Advertise" },
  { to: "/about", label: "About" },
];

export const platforms = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
  { label: "Spotify", href: "https://open.spotify.com/" },
  { label: "Pocket Casts", href: "https://pocketcasts.com/" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Bluesky", href: "https://bsky.app/" },
];

/* ------------------------------------------------------------------ shows */

export type Genre =
  "Place" | "Books" | "Society" | "Science" | "Food" | "Music";
export const genres: Genre[] = [
  "Place",
  "Books",
  "Society",
  "Science",
  "Food",
  "Music",
];

export type Motif =
  "contours" | "drafts" | "clock" | "crosshair" | "plates" | "staves";

export type Show = {
  slug: string;
  title: string;
  /** Lines of the title as set on the square cover art. */
  coverLines: string[];
  cover: { bg: string; fg: string; mark: string; motif: Motif };
  tagline: string;
  genre: Genre;
  hosts: string[];
  cadence: string;
  since: number;
  archive: number;
  about: string[];
  photo: { src: string; alt: string; caption: string };
  /** Average downloads per episode in the first 30 days (demo figures). */
  downloads: number;
  listenThrough: number;
  audience: string;
};

export const shows: Show[] = [
  {
    slug: "the-long-walk",
    title: "The Long Walk",
    coverLines: ["The", "Long", "Walk"],
    cover: { bg: "#3f5e33", fg: "#f1ece1", mark: "#d0a83f", motif: "contours" },
    tagline: "One guest, one route, no destination.",
    genre: "Place",
    hosts: ["lena-moss"],
    cadence: "Every other Tuesday",
    since: 2021,
    archive: 112,
    about: [
      "Lena Moss walks a route chosen by her guest — a ridge they climbed as a teenager, a canal towpath, the forty minutes between a flat and an office — and records the whole way. The conversation follows the ground: it slows on hills, drifts at junctions, stops when something is worth stopping for.",
      "Nothing is recorded in a studio. You will hear wind on the microphone, a dog two fields away, a gate that needs oil. We leave them in, because they are part of the walk.",
    ],
    photo: {
      src: walk,
      alt: "Two walkers with packs crossing a grassy ridge above a wide valley",
      caption: "Season five was recorded entirely above the tree line.",
    },
    downloads: 64000,
    listenThrough: 0.81,
    audience: "Walkers, slow travellers, people who listen with one earbud out",
  },
  {
    slug: "second-draft",
    title: "Second Draft",
    coverLines: ["Second", "Draft"],
    cover: { bg: "#1c2b55", fg: "#f1ece1", mark: "#e0663f", motif: "drafts" },
    tagline: "Writers on the book they nearly abandoned.",
    genre: "Books",
    hosts: ["theo-park"],
    cadence: "Weekly, on Thursdays",
    since: 2019,
    archive: 236,
    about: [
      "Every writer has a manuscript that almost went in the drawer for good. Theo Park asks them about that one: the chapter they rewrote eleven times, the editor who said no, the morning they decided to keep going.",
      "Second Draft is the oldest show on the network and the reason Chapter exists. It is less about craft tips than about stubbornness, and about the people who keep a book alive when its author cannot.",
    ],
    photo: {
      src: books,
      alt: "A stack of hardback books on a white window ledge in daylight",
      caption:
        "Theo keeps every book a guest has mentioned on the studio sill.",
    },
    downloads: 41000,
    listenThrough: 0.77,
    audience: "Readers, writers, book clubs and the people who run bookshops",
  },
  {
    slug: "small-hours",
    title: "Small Hours",
    coverLines: ["Small", "Hours"],
    cover: { bg: "#121a35", fg: "#e8a23b", mark: "#f1ece1", motif: "clock" },
    tagline: "Conversations with people who work while the city sleeps.",
    genre: "Society",
    hosts: ["iris-bell"],
    cadence: "Every other Friday, at midnight",
    since: 2022,
    archive: 74,
    about: [
      "Night nurses, bakers, freight drivers, the woman who reads the shipping forecast. Iris Bell meets them on shift, between two and five in the morning, and asks what the city looks like from the other side of the clock.",
      "Episodes go out at midnight on Fridays because that is when most of our guests are on their break. A lot of listeners hear it in the cab of a truck, which feels right.",
    ],
    photo: {
      src: night,
      alt: "A city at night seen from above, with traffic streaking through a lit interchange",
      caption: "Recorded on shift, between two and five in the morning.",
    },
    downloads: 38000,
    listenThrough: 0.84,
    audience: "Shift workers, insomniacs, long-distance drivers",
  },
  {
    slug: "field-station",
    title: "Field Station",
    coverLines: ["Field", "Station"],
    cover: {
      bg: "#d0a83f",
      fg: "#1c2b55",
      mark: "#a8361a",
      motif: "crosshair",
    },
    tagline: "Science from the places it actually happens.",
    genre: "Science",
    hosts: ["noor-haddad"],
    cadence: "Monthly, first Monday",
    since: 2023,
    archive: 31,
    about: [
      "Noor Haddad travels to research stations — a hut on a glacier, a moth trap in a back garden, a seabird colony on a rock — and spends a few days with the people counting, measuring and waiting.",
      "Each episode is built around one measurement and what it took to make it. No lab coats, very little jargon, a great deal of weather.",
    ],
    photo: {
      src: fieldStation,
      alt: "A small recording team with a boom microphone on a rocky mountain ridge",
      caption:
        "Noor's kit for a field week weighs eleven kilos, tent included.",
    },
    downloads: 29000,
    listenThrough: 0.79,
    audience: "Curious generalists, students, teachers, amateur naturalists",
  },
  {
    slug: "table-for-two",
    title: "Table for Two",
    coverLines: ["Table", "for Two"],
    cover: { bg: "#a8361a", fg: "#f1ece1", mark: "#e8a23b", motif: "plates" },
    tagline: "Two cooks, one dish, and whoever taught it to them.",
    genre: "Food",
    hosts: ["marco-vela", "rosa-delgado"],
    cadence: "Weekly, on Mondays",
    since: 2020,
    archive: 188,
    about: [
      "Marco Vela and Rosa Delgado cook one dish with a guest, in the guest's own kitchen, and talk about the person who first made it for them. Recipes are written up in the notes; arguments about salt are not.",
      "It is a food show where the food is mostly an excuse. The dishes are good, though. Rosa tests every recipe twice before it goes in the notes.",
    ],
    photo: {
      src: kitchen,
      alt: "A wooden kitchen table set with a mortar and pestle, cast-iron pans, herbs and spices",
      caption: "Every recipe in the notes is tested twice in Rosa's kitchen.",
    },
    downloads: 52000,
    listenThrough: 0.74,
    audience: "Home cooks, families, people who listen while they cook",
  },
  {
    slug: "open-score",
    title: "Open Score",
    coverLines: ["Open", "Score"],
    cover: { bg: "#e7e0d0", fg: "#1c2b55", mark: "#a8361a", motif: "staves" },
    tagline: "One piece of music, taken apart and put back together.",
    genre: "Music",
    hosts: ["sol-arden"],
    cadence: "Every other Wednesday",
    since: 2022,
    archive: 58,
    about: [
      "Sol Arden sits down with one musician and one piece — a cello suite, a session drum part, a four-bar theme that took a year — and goes through it bar by bar, with the instrument in the room.",
      "You do not need to read music. You need about forty minutes and decent headphones; the episodes are mixed for them.",
    ],
    photo: {
      src: score,
      alt: "An open music score propped on a piano, keys softly lit",
      caption:
        "Mixed for headphones, recorded with the instrument in the room.",
    },
    downloads: 22000,
    listenThrough: 0.86,
    audience: "Musicians, students, people who hum along to film scores",
  },
];

/* --------------------------------------------------------------- episodes */

export type Chapter = { start: number; title: string; note: string };
export type Guest = { name: string; role: string };

export type Episode = {
  id: string;
  show: string;
  season: number;
  number: number;
  title: string;
  date: string;
  duration: number;
  summary: string;
  guests: Guest[];
  quote: { text: string; at: number };
  chapters: Chapter[];
  notes: string[];
};

/** "17:40" → 1060 seconds. */
function ts(t: string) {
  const [m, s] = t.split(":").map(Number);
  return m * 60 + s;
}

type Raw = Omit<Episode, "duration" | "chapters" | "quote"> & {
  duration: string;
  quote: [string, string];
  chapters: [string, string, string][];
};

const raw: Raw[] = [
  {
    id: "the-art-of-paying-attention",
    show: "the-long-walk",
    season: 5,
    number: 14,
    title: "The art of paying attention",
    date: "2026-10-13",
    duration: "42:18",
    summary:
      "A field recordist takes Lena up a ridge he has walked forty times, and explains why he stopped carrying a camera. A conversation about noticing, and about describing a place without owning it.",
    guests: [{ name: "Hal Brennan", role: "Field recordist" }],
    quote: [
      "The camera made me look for the picture. The microphone made me wait for it.",
      "17:52",
    ],
    chapters: [
      [
        "0:00",
        "Setting off at the trailhead",
        "Hal explains the route: four miles, one ridge, the same creek crossed three times.",
      ],
      [
        "6:10",
        "Why he stopped carrying a camera",
        "Twelve years of photographs he never looked at, and the trip that changed it.",
      ],
      [
        "17:40",
        "The same creek in four seasons",
        "Lena listens to his recordings of one bend in the water, January to October.",
      ],
      [
        "29:05",
        "The notebook without a plan",
        "What goes in it, what doesn't, and why he never rereads it.",
      ],
      [
        "37:30",
        "What the ridge sounds like at noon",
        "Two minutes of near-silence at the top. We left all of it in.",
      ],
    ],
    notes: [
      "Hal's creek recordings are part of a fictional sound archive we invented for this demo; the practice he describes is real enough to try. Spend ten minutes somewhere familiar, without your phone, and write down three things you had not noticed before.",
    ],
  },
  {
    id: "a-room-of-our-making",
    show: "second-draft",
    season: 8,
    number: 31,
    title: "A room of our making",
    date: "2026-10-15",
    duration: "36:40",
    summary:
      "Mara Lindqvist's second novel took nine years and three titles. She talks with Theo about the draft that was all furniture and no people, and about the chipped cup that finally saved it.",
    guests: [{ name: "Mara Lindqvist", role: "Novelist" }],
    quote: [
      "A room that photographs well and a room that holds a life are not the same room.",
      "12:15",
    ],
    chapters: [
      [
        "0:00",
        "Nine years, three titles",
        "How a book about a house became a book about the people who left it.",
      ],
      [
        "8:20",
        "The draft that was all furniture",
        "Mara reads two pages she cut, and explains why they had to go.",
      ],
      [
        "16:45",
        "A chipped cup",
        "The object that gave her the first real scene, in year six.",
      ],
      [
        "27:10",
        "Letting the editor win",
        "On the one note she fought, and the four she should not have.",
      ],
    ],
    notes: [
      "Mara's novel is fictional, as is everyone on this network. The question Theo closes with is real: what is the object in your house that would tell a stranger the most about you?",
    ],
  },
  {
    id: "learning-to-begin-again",
    show: "small-hours",
    season: 4,
    number: 9,
    title: "Learning to begin again",
    date: "2026-10-09",
    duration: "51:05",
    summary:
      "Pete Lam left a desk job at fifty-two to become a night baker. Iris joins him from 2 a.m. until the first loaves come out, and they talk about being bad at something in public.",
    guests: [{ name: "Pete Lam", role: "Night baker" }],
    quote: [
      "Starting over is not a failure. It is a practice, and I am still practising.",
      "33:20",
    ],
    chapters: [
      [
        "0:00",
        "Two in the morning, Alder Street",
        "The oven is already on. Pete has been up since half past eleven.",
      ],
      [
        "9:40",
        "The job he left",
        "Twenty-six years of spreadsheets and the Sunday he decided to stop.",
      ],
      [
        "21:15",
        "Being the oldest apprentice",
        "On taking instructions from a nineteen-year-old, and being grateful for it.",
      ],
      [
        "33:00",
        "Small rituals",
        "The playlist, the flask, the knock on the window from the street sweeper.",
      ],
      [
        "44:30",
        "First loaves out",
        "Iris gets the heel of the first sourdough. It is still too hot to eat.",
      ],
    ],
    notes: [
      "If you are thinking about a change of your own, Pete's advice is unglamorous: find the one person who will tell you, kindly, exactly what you did wrong.",
    ],
  },
  {
    id: "listening-to-a-glacier",
    show: "field-station",
    season: 3,
    number: 10,
    title: "Listening to a glacier",
    date: "2026-10-05",
    duration: "53:30",
    summary:
      "Glaciologist Elin Aske drops hydrophones into meltwater channels to hear ice move. Noor spends three days at her hut and learns to tell a creak from a calving.",
    guests: [{ name: "Dr. Elin Aske", role: "Glaciologist" }],
    quote: [
      "Ice is never quiet. We just were not listening at the right frequency.",
      "14:05",
    ],
    chapters: [
      [
        "0:00",
        "The hut at 1,900 metres",
        "Six bunks, one stove and a radio that works for an hour a day.",
      ],
      [
        "11:20",
        "Why listen to ice?",
        "How sound reveals movement that satellites only see weeks later.",
      ],
      [
        "24:00",
        "Lowering the hydrophone",
        "A slow, careful descent into a meltwater channel, recorded in full.",
      ],
      [
        "38:45",
        "A creak or a calving",
        "Elin plays Noor four sounds and asks her to guess.",
      ],
      [
        "48:10",
        "Leaving the ice",
        "What changes, year on year, when you come back to the same place.",
      ],
    ],
    notes: [
      "The hydrophone recordings in this episode are slowed down eight times so that the lowest sounds become audible. Listen on headphones if you can.",
    ],
  },
  {
    id: "grandmothers-soup-reconstructed",
    show: "table-for-two",
    season: 6,
    number: 22,
    title: "Grandmother's soup, reconstructed",
    date: "2026-10-12",
    duration: "38:12",
    summary:
      "Lucía Ferrer's grandmother never wrote down her bean soup. Lucía has spent four winters rebuilding it from memory, and Marco and Rosa help with attempt number thirty-one.",
    guests: [{ name: "Lucía Ferrer", role: "Pastry cook" }],
    quote: ["The recipe was never the beans. It was the waiting.", "26:40"],
    chapters: [
      [
        "0:00",
        "Attempt thirty-one",
        "Lucía lays out the beans, the ham bone and a notebook full of crossings-out.",
      ],
      [
        "7:50",
        "What she remembers",
        "The smell, the colour, the blue enamel pot. Not the quantities.",
      ],
      [
        "18:30",
        "Rosa's salt intervention",
        "A disagreement, settled by tasting.",
      ],
      [
        "26:00",
        "The waiting",
        "Three hours on the lowest heat, and why that turned out to be the secret.",
      ],
      [
        "33:40",
        "Close enough",
        "The verdict, and the recipe as it now stands.",
      ],
    ],
    notes: [
      "The full recipe — dried white beans, a smoked ham bone, bay, one onion and an unreasonable amount of patience — went out in Sunday's Margin, issue 214.",
    ],
  },
  {
    id: "four-bars-that-took-a-year",
    show: "open-score",
    season: 3,
    number: 7,
    title: "Four bars that took a year",
    date: "2026-10-07",
    duration: "44:02",
    summary:
      "Composer Yumi Tanabe wrote the four-bar theme of her first film score in a year of false starts. Sol plays every discarded version, and she explains what each one got wrong.",
    guests: [{ name: "Yumi Tanabe", role: "Film composer" }],
    quote: [
      "A theme has to survive being played badly by a school orchestra. That was my test.",
      "30:15",
    ],
    chapters: [
      [
        "0:00",
        "The brief: four bars",
        "A director who wanted something 'like a door left open'.",
      ],
      [
        "9:30",
        "Versions one to eleven",
        "Sol plays them back to back. Yumi winces at version six.",
      ],
      [
        "22:10",
        "The interval that fixed it",
        "Why a falling sixth sounded like a question.",
      ],
      [
        "30:00",
        "The school orchestra test",
        "Her rule for knowing a melody is finished.",
      ],
      [
        "38:20",
        "Hearing it in the cinema",
        "Opening night, row K, and the bar she would still change.",
      ],
    ],
    notes: [
      "The piano versions in this episode were recorded in the studio on Sol's upright, which is slightly out of tune on purpose.",
    ],
  },
  {
    id: "towpath-eleven-miles",
    show: "the-long-walk",
    season: 5,
    number: 13,
    title: "Towpath, eleven miles",
    date: "2026-09-29",
    duration: "48:26",
    summary:
      "Dana Whitlock has spent fifteen years restoring a canal nobody uses. Lena walks the full eleven miles with her, lock by lock, from the basin to the reservoir.",
    guests: [{ name: "Dana Whitlock", role: "Canal restorer" }],
    quote: [
      "Nobody needs a canal any more. That is exactly why it needs someone.",
      "21:30",
    ],
    chapters: [
      [
        "0:00",
        "The basin at seven",
        "Mist on the water and a heron that will follow them for two miles.",
      ],
      [
        "10:15",
        "Lock nine",
        "The gate Dana rebuilt by hand, and the winter it took.",
      ],
      [
        "21:00",
        "Who a canal is for",
        "On maintaining something that has no economic reason to exist.",
      ],
      [
        "33:40",
        "The volunteers",
        "Thursday mornings, a flask of tea, a skip full of shopping trolleys.",
      ],
      [
        "42:50",
        "The reservoir",
        "Eleven miles done. Lena's feet are not happy.",
      ],
    ],
    notes: [
      "The canal in this episode is a composite; the volunteer work parties are very much a real thing in most places that have a towpath.",
    ],
  },
  {
    id: "four-hundred-pages-in-a-drawer",
    show: "second-draft",
    season: 8,
    number: 30,
    title: "Four hundred pages in a drawer",
    date: "2026-10-08",
    duration: "44:15",
    summary:
      "Ade Coker wrote a memoir, put it in a drawer for seven years, and then rewrote it from the first line. He talks with Theo about what the drawer was for.",
    guests: [{ name: "Ade Coker", role: "Memoirist" }],
    quote: [
      "The drawer was not where the book died. It was where I grew up enough to finish it.",
      "19:05",
    ],
    chapters: [
      [
        "0:00",
        "The first version",
        "Written in eleven months, in a rush, mostly at night.",
      ],
      [
        "10:40",
        "Seven years in the drawer",
        "What he did instead, and why he never threw it out.",
      ],
      [
        "18:50",
        "Rewriting from line one",
        "Not editing — retyping every sentence and deciding again.",
      ],
      [
        "31:20",
        "His mother reads it",
        "The conversation he was dreading, and how it went.",
      ],
    ],
    notes: [
      "Theo's reading list from this episode, all fictional, is in the Margin archive under issue 212.",
    ],
  },
  {
    id: "the-last-train-driver",
    show: "small-hours",
    season: 4,
    number: 8,
    title: "The last train driver",
    date: "2026-09-25",
    duration: "46:20",
    summary:
      "Wanjiru Kamau drives the final service of the night on the city's oldest line. Iris rides in the cab from the depot to the end of the line and back.",
    guests: [{ name: "Wanjiru Kamau", role: "Train driver" }],
    quote: [
      "The last train is a different city. Everyone on it has a story about why they are late.",
      "15:40",
    ],
    chapters: [
      ["0:00", "Depot, 00:12", "Checks, signals, a thermos of rooibos."],
      [
        "8:30",
        "Passengers of the last train",
        "Nurses, cleaners, two students asleep on each other.",
      ],
      [
        "20:05",
        "Signals in the dark",
        "How she reads a tunnel she cannot see.",
      ],
      ["32:15", "End of the line", "Six minutes of quiet before the run back."],
      [
        "40:00",
        "Going home at dawn",
        "Her own commute, on someone else's train.",
      ],
    ],
    notes: [
      "Recorded with permission in a fictional transit system. Cab audio is lightly cleaned; the rails are not.",
    ],
  },
  {
    id: "the-moth-census",
    show: "field-station",
    season: 3,
    number: 9,
    title: "The moth census",
    date: "2026-09-07",
    duration: "40:45",
    summary:
      "Tomás Reyes runs a moth trap in his back garden every night from March to November, and sends the counts to a national survey. Noor sits up with him until dawn.",
    guests: [{ name: "Tomás Reyes", role: "Amateur entomologist" }],
    quote: [
      "Most of the science in this country is done by people in their pyjamas.",
      "6:20",
    ],
    chapters: [
      [
        "0:00",
        "Setting the trap",
        "A bulb, an egg box and a bucket. That is the whole kit.",
      ],
      [
        "9:15",
        "Why moths",
        "Two thousand species, and most of them are not brown.",
      ],
      [
        "20:30",
        "Counting at dawn",
        "Tomás identifies forty-one moths in under an hour.",
      ],
      [
        "33:10",
        "Where the numbers go",
        "How a back-garden count becomes a national trend.",
      ],
    ],
    notes: [
      "If you want to start your own moth trap, Tomás recommends an egg box, a white sheet and a field guide with good pictures.",
    ],
  },
  {
    id: "the-bread-that-ran-a-village",
    show: "table-for-two",
    season: 6,
    number: 21,
    title: "The bread that ran a village",
    date: "2026-10-05",
    duration: "42:30",
    summary:
      "Henrik Dahl's family oven baked for an entire valley for ninety years. He bakes the old rye with Marco and Rosa, and explains how one oven organised a village's week.",
    guests: [{ name: "Henrik Dahl", role: "Baker" }],
    quote: [
      "Whoever had the oven had the news. Bread was the excuse to come in.",
      "18:10",
    ],
    chapters: [
      ["0:00", "Firing the oven", "Birch logs at five in the morning."],
      [
        "8:45",
        "Baking day as a calendar",
        "Each farm had its hour; nobody needed a clock.",
      ],
      [
        "17:50",
        "The oven as a newsroom",
        "Gossip, weddings and one famous argument about a goat.",
      ],
      [
        "29:20",
        "The rye, step by step",
        "Rosa takes notes. Marco eats the dough.",
      ],
      [
        "37:30",
        "Keeping it going",
        "Why Henrik still bakes once a month for whoever turns up.",
      ],
    ],
    notes: [
      "The rye recipe is in the notes: coarse rye, a two-day sour, caraway, a long cool proof.",
    ],
  },
  {
    id: "playing-in-an-empty-hall",
    show: "open-score",
    season: 3,
    number: 6,
    title: "Playing in an empty hall",
    date: "2026-09-23",
    duration: "37:48",
    summary:
      "Cellist Anouk Visser records alone in a two-thousand-seat hall at night. Sol joins her for one suite, and they talk about playing for nobody.",
    guests: [{ name: "Anouk Visser", role: "Cellist" }],
    quote: [
      "An empty hall still answers you. It just answers more honestly.",
      "11:30",
    ],
    chapters: [
      [
        "0:00",
        "The hall at night",
        "Work lights only, and a stage that creaks.",
      ],
      [
        "7:20",
        "The prelude",
        "Anouk plays it straight through. Sol does not interrupt.",
      ],
      [
        "14:40",
        "Playing for nobody",
        "On the difference between practice and performance.",
      ],
      [
        "27:00",
        "The note she always rushes",
        "Bar thirty-eight, and why she has stopped fighting it.",
      ],
    ],
    notes: [
      "Mixed for headphones. The reverb is the hall's own; nothing was added.",
    ],
  },
  {
    id: "the-commute-as-a-walk",
    show: "the-long-walk",
    season: 5,
    number: 12,
    title: "The commute as a walk",
    date: "2026-09-15",
    duration: "39:10",
    summary:
      "Urban planner Ovie Mensah walks to work every day — forty minutes through three neighbourhoods. Lena tags along and asks what a city looks like at walking pace.",
    guests: [{ name: "Ovie Mensah", role: "Urban planner" }],
    quote: [
      "You cannot plan a street you have only seen through a windscreen.",
      "12:45",
    ],
    chapters: [
      [
        "0:00",
        "Front door, 8:05",
        "The route, the rules, the bakery he never skips.",
      ],
      [
        "11:30",
        "Seeing at walking pace",
        "Kerbs, benches, a crossing that takes too long.",
      ],
      [
        "22:40",
        "The neighbourhood seam",
        "Where one district ends and the next begins.",
      ],
      [
        "32:15",
        "Office door, 8:47",
        "What he would change, starting tomorrow.",
      ],
    ],
    notes: [
      "Try walking part of your own commute this week, and notice one thing on the route you have never seen.",
    ],
  },
  {
    id: "translating-the-untranslatable-joke",
    show: "second-draft",
    season: 8,
    number: 29,
    title: "Translating the untranslatable joke",
    date: "2026-10-01",
    duration: "41:05",
    summary:
      "Translator Inés Barral spent a summer on a single pun. She talks with Theo about the jokes that do not cross borders, and the ones that do with help.",
    guests: [{ name: "Inés Barral", role: "Literary translator" }],
    quote: [
      "A translated joke is a new joke that has to be just as funny for the same reason.",
      "9:50",
    ],
    chapters: [
      [
        "0:00",
        "One pun, one summer",
        "The line in chapter four that kept her up at night.",
      ],
      [
        "9:20",
        "What a joke is made of",
        "Timing, sound, surprise — and which survive the crossing.",
      ],
      [
        "21:00",
        "Eleven attempts",
        "Theo reads them all aloud. Two get a laugh.",
      ],
      [
        "32:30",
        "When to leave it alone",
        "On footnotes, and why she refuses to use them.",
      ],
    ],
    notes: [
      "The novel Inés translated is fictional; her eleven attempts are in Sunday's Margin.",
    ],
  },
  {
    id: "radio-for-the-night-shift",
    show: "small-hours",
    season: 4,
    number: 7,
    title: "Radio for the night shift",
    date: "2026-09-11",
    duration: "38:30",
    summary:
      "Bo Sandvik has presented the overnight show on a regional station for nineteen years. Iris sits in for the three o'clock hour and reads the messages from listeners.",
    guests: [{ name: "Bo Sandvik", role: "Overnight radio presenter" }],
    quote: [
      "At three in the morning you are not broadcasting. You are keeping someone company.",
      "8:15",
    ],
    chapters: [
      [
        "0:00",
        "Three o'clock news",
        "Bo reads the bulletin; Iris tries not to cough.",
      ],
      [
        "7:45",
        "Who is listening",
        "Bakers, carers, a lighthouse keeper, a man feeding a newborn.",
      ],
      [
        "19:20",
        "The message wall",
        "Nineteen years of notes from listeners, pinned up in the studio.",
      ],
      ["30:40", "Signing off", "How he chooses the last song of the night."],
    ],
    notes: [
      "Bo's last song of the night is always an instrumental. He says words are too much at that hour.",
    ],
  },
  {
    id: "counting-seabirds-from-a-rock",
    show: "field-station",
    season: 3,
    number: 8,
    title: "Counting seabirds from a rock",
    date: "2026-08-03",
    duration: "47:15",
    summary:
      "Priya Raman spends every June on a rock in the North Atlantic counting guillemots. Noor joins the count, and the weather does not cooperate.",
    guests: [{ name: "Priya Raman", role: "Seabird ecologist" }],
    quote: [
      "You do not count birds. You count the gaps where birds used to be.",
      "36:00",
    ],
    chapters: [
      [
        "0:00",
        "Landing on the rock",
        "A small boat, a big swell and a rope ladder.",
      ],
      [
        "12:00",
        "Methods with a clicker",
        "How you count fourteen thousand birds that will not stay still.",
      ],
      [
        "24:30",
        "Storm day",
        "Nobody counts anything. They play cards and talk about fish.",
      ],
      [
        "35:20",
        "The gaps",
        "What thirty years of counts say about the sea around them.",
      ],
    ],
    notes: [
      "The colony counts are fictional, but the method — photographs, grids, a clicker — is how seabird surveys are often done.",
    ],
  },
  {
    id: "feeding-a-crew-of-forty",
    show: "table-for-two",
    season: 6,
    number: 20,
    title: "Feeding a crew of forty",
    date: "2026-09-28",
    duration: "35:55",
    summary:
      "Simone Achebe caters film sets: forty people, one van, lunch at one o'clock sharp. Marco and Rosa help with the stew she has served on every shoot for a decade.",
    guests: [{ name: "Simone Achebe", role: "Location caterer" }],
    quote: ["A happy crew is a fed crew. A fed crew finishes on time.", "4:30"],
    chapters: [
      ["0:00", "The van at dawn", "Two burners, one fridge, forty portions."],
      [
        "9:10",
        "The stew that never changes",
        "Why consistency matters more than surprise on a long shoot.",
      ],
      ["20:00", "Feeding the difficult actor", "No names. Several stories."],
      [
        "29:30",
        "Lunch is called",
        "The rush, the queue, and the first compliment.",
      ],
    ],
    notes: [
      "Simone's stew scales from four to forty; the notes give both versions.",
    ],
  },
  {
    id: "the-session-drummers-notebook",
    show: "open-score",
    season: 3,
    number: 5,
    title: "The session drummer's notebook",
    date: "2026-09-09",
    duration: "41:20",
    summary:
      "Dez Okoro has played on four hundred records and written one note about each. Sol reads from the notebook, and Dez plays the parts he is proudest of.",
    guests: [{ name: "Dez Okoro", role: "Session drummer" }],
    quote: [
      "The best part I ever played is the one nobody notices. That is the job.",
      "25:10",
    ],
    chapters: [
      [
        "0:00",
        "Four hundred records",
        "One line about each, in pencil, since 1998.",
      ],
      [
        "11:15",
        "Playing what is not there",
        "The rests, the ghost notes, the fill he left out.",
      ],
      [
        "24:40",
        "Nobody notices",
        "On the invisible part that holds a song together.",
      ],
      [
        "33:50",
        "The last entry",
        "Last Tuesday, a record that is not out yet.",
      ],
    ],
    notes: [
      "The kit in this episode was close-miked and recorded in one room, the way Dez prefers.",
    ],
  },
];

export const episodes: Episode[] = raw
  .map((e) => ({
    ...e,
    duration: ts(e.duration),
    quote: { text: e.quote[0], at: ts(e.quote[1]) },
    chapters: e.chapters.map(([start, title, note]) => ({
      start: ts(start),
      title,
      note,
    })),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

/* ------------------------------------------------------------------ hosts */

export type Host = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  alt: string;
  short: string;
  bio: string[];
  basedIn: string;
  onHeadphones: string[];
  quote: string;
};

export const hosts: Host[] = [
  {
    slug: "lena-moss",
    name: "Lena Moss",
    role: "Host, The Long Walk",
    photo: hostLena,
    alt: "Lena Moss in a checked wool scarf, standing in front of autumn foliage",
    short:
      "Walks about forty miles a month with a microphone clipped to her collar.",
    bio: [
      "Lena started recording walks in 2018, on a borrowed recorder, to remember the routes her father took her on. The Long Walk grew out of those tapes and joined Chapter in 2021.",
      "Before podcasting she worked as a mapmaker for a county planning office, which explains why she can always tell you where north is.",
    ],
    basedIn: "Hood River",
    onHeadphones: [
      "Rain on a tin roof, recorded in 2019",
      "Old shipping forecasts",
      "A lot of choral music",
    ],
    quote:
      "Every route has a conversation in it. My job is to keep walking until we find it.",
  },
  {
    slug: "theo-park",
    name: "Theo Park",
    role: "Host, Second Draft · Co-founder",
    photo: hostTheo,
    alt: "Theo Park in glasses and an olive polo shirt against a grey backdrop",
    short:
      "Former bookseller, current reader of other people's abandoned manuscripts.",
    bio: [
      "Theo ran a secondhand bookshop for fourteen years before starting Second Draft from its back room in 2019. The shop closed; the show, and then the network, did not.",
      "He co-founded Chapter with Ruth Achterberg in 2020 and still edits every episode of Second Draft himself, on headphones he refuses to replace.",
    ],
    basedIn: "Portland",
    onHeadphones: [
      "Audiobooks read by their authors",
      "Late Beethoven quartets",
      "Cricket commentary, oddly",
    ],
    quote:
      "Nobody remembers the first draft. Everybody remembers the person who said: keep going.",
  },
  {
    slug: "iris-bell",
    name: "Iris Bell",
    role: "Host, Small Hours",
    photo: hostIris,
    alt: "Iris Bell with curly auburn hair, smiling over her shoulder at night",
    short: "Sleeps from 9 a.m. to 4 p.m. and does not apologise for it.",
    bio: [
      "Iris worked overnight shifts in a hospital pharmacy for six years and noticed that nobody ever asked night workers about their nights. Small Hours is her answer.",
      "She records on a pocket recorder and a single lavalier, because big microphones make people at work nervous.",
    ],
    basedIn: "Tacoma",
    onHeadphones: [
      "Overnight radio from three countries",
      "Ambient records with long titles",
      "Her guests' break-room playlists",
    ],
    quote:
      "The city at three in the morning is held together by people you never see.",
  },
  {
    slug: "noor-haddad",
    name: "Noor Haddad",
    role: "Host, Field Station",
    photo: hostNoor,
    alt: "Noor Haddad laughing in a denim jacket in a field of dry grass",
    short: "Trained as a hydrologist, now carries the tent and the recorder.",
    bio: [
      "Noor spent five years measuring rivers before deciding she was more interested in the people measuring them. She joined Chapter in 2023 to start Field Station.",
      "She is happiest somewhere without phone signal, and her producers have learned to plan for that.",
    ],
    basedIn: "Bozeman",
    onHeadphones: [
      "Bird calls, for practice",
      "Long science lectures at 1.5×",
      "Folk music from wherever she is",
    ],
    quote:
      "A measurement is a story about patience. I just ask who was patient.",
  },
  {
    slug: "marco-vela",
    name: "Marco Vela",
    role: "Co-host, Table for Two",
    photo: hostMarco,
    alt: "Marco Vela with arms crossed, smiling outdoors in warm evening light",
    short:
      "Line cook for a decade; will eat the dough before it becomes bread.",
    bio: [
      "Marco cooked on the line in three restaurants before a burn on his wrist sent him to the front of house, and then to radio. He met Rosa at a community kitchen in 2019.",
      "He handles the stories on Table for Two. Rosa handles the salt.",
    ],
    basedIn: "Portland",
    onHeadphones: [
      "Kitchen radio from wherever the guest is from",
      "Old cooking programmes",
      "Cumbia when he is washing up",
    ],
    quote: "Every recipe is somebody's way of saying they were here.",
  },
  {
    slug: "rosa-delgado",
    name: "Rosa Delgado",
    role: "Co-host, Table for Two",
    photo: hostRosa,
    alt: "Rosa Delgado with long dark curly hair in a grey knitted jumper",
    short:
      "Recipe tester and the reason the measurements in our notes are right.",
    bio: [
      "Rosa has tested recipes for cookbooks for twelve years and has opinions about every one of them. On Table for Two she makes sure the dish works, twice, before it goes in the notes.",
      "She is writing a book about the recipes people refuse to write down.",
    ],
    basedIn: "Vancouver, WA",
    onHeadphones: [
      "Interviews with grandmothers",
      "Opera, loudly",
      "Nothing at all while she is tasting",
    ],
    quote: "If it only works in my kitchen, it isn't a recipe yet.",
  },
  {
    slug: "sol-arden",
    name: "Sol Arden",
    role: "Host, Open Score",
    photo: hostSol,
    alt: "Sol Arden smiling on a city street with headphones around his neck",
    short:
      "Pianist, arranger and the person who always asks to hear it once more.",
    bio: [
      "Sol plays piano for theatre and arranges for small ensembles. He started Open Score to have an excuse to ask other musicians the questions he usually saves for the bar after the gig.",
      "He keeps an upright piano in the Chapter studio and tunes it slightly flat, which he says makes guests relax.",
    ],
    basedIn: "Seattle",
    onHeadphones: [
      "Session outtakes",
      "Choirs from anywhere",
      "The same three records, on repeat, for a month at a time",
    ],
    quote:
      "Every piece of music is a set of decisions. I want to hear the ones that nearly went the other way.",
  },
];

export const staff = [
  { name: "Ruth Achterberg", role: "Co-founder & executive editor" },
  { name: "Dami Oyelaran", role: "Head of audio" },
  { name: "Kit Hanley", role: "Producer, The Long Walk & Field Station" },
  { name: "Mina Sato", role: "Producer, Second Draft & Open Score" },
  { name: "Jonah Reyes-Kerr", role: "Producer, Small Hours & Table for Two" },
  { name: "Elsa Brandt", role: "Partnerships" },
];

/* --------------------------------------------------------------- home copy */

export const home = {
  title: "Conversations that take their time.",
  intro:
    "Chapter is an independent podcast network of six shows: long walks, abandoned manuscripts, night shifts, field science, family kitchens and music taken apart bar by bar. Every episode is divided into chapters, so you can start where the story does.",
  shelfTitle: "Six shows on the list",
  shelfIntro:
    "Each one has a host, an editor and a producer, and a reason to exist that is not the algorithm.",
  latestTitle: "New this fortnight",
  featureShow: "the-long-walk",
  featureTitle: "Recorded outside, with the weather left in",
  quoteEpisode: "the-art-of-paying-attention",
  makingTitle: "Made the way small presses make books",
  making: [
    {
      title: "Edited, not just cut",
      text: "Every show has an editor who listens to the whole raw tape. Episodes are shaped like essays: a beginning, a turn, an end.",
    },
    {
      title: "Chapters on every episode",
      text: "Each episode is marked into chapters with notes, so you can skip to the bit your friend told you about, or come back to it a year later.",
    },
    {
      title: "Ads read by people who mean them",
      text: "Hosts read every advertisement themselves, and only for things they would recommend over dinner. Never more than two breaks an episode.",
    },
  ],
  hostsTitle: "The voices",
  closeTitle: "Start anywhere. Every episode stands on its own.",
};

/* ------------------------------------------------------------- newsletter */

export const newsletter = {
  name: "The Margin",
  title: "The Margin, every Sunday",
  intro:
    "A short letter from the editors: what we recorded this week, what got cut, the recipes and reading lists from the episodes, and one thing worth listening to that is not ours.",
  promise:
    "Six minutes to read. No tracking pixels, no 'just checking in'. Unsubscribe from any issue in one click.",
  image: {
    src: landscape,
    alt: "Morning fog drifting over green rolling hills",
    caption: "Sunday mornings, mostly.",
  },
  lists: [
    {
      id: "margin",
      name: "The Margin",
      detail: "The Sunday letter from the editors",
    },
    {
      id: "episodes",
      name: "New episodes",
      detail: "A short note when a show you pick publishes",
    },
    {
      id: "live",
      name: "Live tapings",
      detail: "First notice of tickets for recordings with an audience",
    },
  ],
  sample: {
    issue: 214,
    date: "Sunday, October 11, 2026",
    greeting: "Dear listener,",
    body: [
      "Hal Brennan's creek recordings arrived on a memory card wrapped in a sandwich bag, which is how you know someone is serious. We listened to all four seasons of that one bend in the water on Tuesday afternoon, in the dark, and nobody spoke for a while.",
      "Elsewhere: Rosa has made Lucía's bean soup three more times since the recording and now says the secret is a spoon of vinegar at the end. Lucía disagrees. The recipe below is the compromise.",
    ],
    signoff: "Ruth, for everyone at Chapter",
  },
  archive: [
    {
      issue: 214,
      date: "2026-10-11",
      title: "A creek in four seasons",
      excerpt:
        "Hal's tapes, Lucía's soup, and a radio documentary about lighthouses that we cannot stop recommending.",
    },
    {
      issue: 213,
      date: "2026-10-04",
      title: "The drawer",
      excerpt:
        "Ade Coker on the seven years his memoir spent unread, plus Theo's list of books that were nearly abandoned.",
    },
    {
      issue: 212,
      date: "2026-09-27",
      title: "Eleven miles of towpath",
      excerpt:
        "Dana's lock gate, Lena's blisters, and what we learned recording next to running water.",
    },
    {
      issue: 211,
      date: "2026-09-20",
      title: "Bar thirty-eight",
      excerpt:
        "Anouk Visser's rushed note, the empty hall, and how Sol mixes for headphones.",
    },
  ],
};

/* -------------------------------------------------------------- advertise */

export const advertise = {
  title: "Advertise on Chapter",
  intro:
    "Our listeners finish episodes. They hear your message in the host's own voice, in the middle of a conversation they chose, without skipping. We keep it that way by saying no to most advertisers.",
  principles: [
    {
      title: "Host-read, always",
      text: "Hosts write and read every spot from your brief. No pre-recorded ads, no programmatic insertion.",
    },
    {
      title: "Two breaks at most",
      text: "One before the conversation, one in the middle. Never in the last ten minutes.",
    },
    {
      title: "Fit before fee",
      text: "Hosts may decline any brand they would not recommend to a friend. About a third of enquiries end there.",
    },
  ],
  formats: [
    {
      id: "midroll",
      name: "Mid-roll, host-read",
      cpm: 34,
      detail: "60–90 seconds at the natural turn of the conversation.",
    },
    {
      id: "preroll",
      name: "Pre-roll, host-read",
      cpm: 24,
      detail: "30 seconds before the episode begins.",
    },
    {
      id: "notes",
      name: "Notes & newsletter mention",
      cpm: 14,
      detail: "A line in the episode notes and in that Sunday's Margin.",
    },
  ],
  sponsorship:
    "Season sponsorships — one partner across a whole season of a show, credited in every episode and on the show page — start at $18,000. Ask us about them.",
  faq: [
    {
      q: "Can we write the script?",
      a: "You send a brief with the three things that matter most. The host writes the read in their own words and sends it to you for approval before recording.",
    },
    {
      q: "How are downloads counted?",
      a: "Downloads are counted in the first 30 days after release, using a measurement method that filters bots and duplicate requests. Figures on this page are demonstration numbers.",
    },
    {
      q: "Are there categories you do not accept?",
      a: "Gambling, payday lending, weight-loss products, political campaigns and anything a host would not use themselves. Small Hours also declines alcohol.",
    },
    {
      q: "What is the minimum booking?",
      a: "Four episodes on a single show, or $3,000 across the network. Season sponsorships are booked at least six weeks ahead.",
    },
  ],
};

/* ------------------------------------------------------------------ about */

export const about = {
  title: "A small press for listening",
  intro:
    "Chapter began in 2019 in the back room of a secondhand bookshop, as one show recorded on a borrowed microphone. It is now six shows, eleven people and a studio above a former print shop on Wren Street.",
  story: [
    "Theo Park started Second Draft because the writers who came into his shop kept telling better stories about their books than the books' jacket copy did. Ruth Achterberg, a radio documentary editor, heard episode nine and sent him a two-page memo about how to fix it. They founded Chapter a year later.",
    "We run the network the way a small press runs its list. Every show has an editor, every episode is shaped before it is published, and we would rather publish less than publish filler. We do not chase charts. We do read every listener email.",
  ],
  photos: [
    {
      src: studio,
      alt: "A round studio table with four microphones on boom arms and headphones",
      caption: "The Wren Street studio: one round table, four microphones.",
    },
    {
      src: archiveMics,
      alt: "Black-and-white photograph of two vintage broadcast microphones on a desk",
      caption: "The broadcasting tradition we borrow from.",
    },
    {
      src: fieldRecording,
      alt: "A recordist holding a microphone to a hiker resting against a weathered pine trunk",
      caption: "Most of our shows leave the studio.",
    },
  ],
  principles: [
    {
      title: "We edit",
      text: "A forty-minute episode usually begins as three hours of tape. The editor's job is to find the forty minutes that matter.",
    },
    {
      title: "We mark chapters",
      text: "Every episode is divided into chapters with written notes, because listening should be as easy to navigate as reading.",
    },
    {
      title: "We pay guests",
      text: "Every guest receives a fee for their time. Nobody should have to be on a podcast for exposure.",
    },
    {
      title: "We keep the archive",
      text: "Every episode we have ever published stays online, with its notes, for as long as the network exists.",
    },
  ],
  pitch:
    "We open for new show pitches twice a year. Send one paragraph about the show, one about why you should host it, and a ten-minute recording of anything at all.",
};
