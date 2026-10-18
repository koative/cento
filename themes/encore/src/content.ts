import space from "./assets/space.jpg";
import minutes from "./assets/minutes.jpg";
import snowQueen from "./assets/snow-queen.jpg";
import seagull from "./assets/seagull.jpg";
import belvedere from "./assets/belvedere.jpg";
import tidewater from "./assets/tidewater.jpg";
import camille from "./assets/camille.jpg";
import measure from "./assets/measure.jpg";
import larkhill from "./assets/larkhill.jpg";
import larkhillParlour from "./assets/larkhill-parlour.jpg";
import youthCompany from "./assets/youth-company.jpg";
import youthRehearsal from "./assets/youth-rehearsal.jpg";
import house from "./assets/house.jpg";
import curtain from "./assets/curtain.jpg";
import aisle from "./assets/aisle.jpg";
import curtainCall from "./assets/curtain-call.jpg";
import workshop from "./assets/workshop.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Encore",
  full: "Encore Theatre",
  tagline:
    "A playhouse on Lantern Street. Eight productions, one house, every seat a view.",
  address: ["410 Lantern Street", "Port Ellery, ME 04110"],
  email: "boxoffice@encore.example",
  learningEmail: "learning@encore.example",
  phone: "(555) 013-4270",
  phoneHref: "tel:+15550134270",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  season: "2026–27",
};

export const nav = [
  { to: "/season", label: "Season" },
  { to: "/membership", label: "Membership" },
  { to: "/learning", label: "Learning" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "On stage",
    links: [
      { to: "/season", label: "The 2026–27 season" },
      { to: "/season/the-space-between-the-words", label: "Now playing" },
      { to: "/book/the-space-between-the-words", label: "Book seats" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { to: "/membership", label: "Membership" },
      { to: "/learning", label: "Learning & youth company" },
    ],
  },
  {
    title: "The theatre",
    links: [
      { to: "/visit", label: "Plan your visit" },
      { to: "/about", label: "About Encore" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "The Thursday call sheet",
  text: "One email a week: what's opening, which performances are nearly full, and the occasional rehearsal-room photo.",
};

/* ------------------------------------------------------------ productions */

export type Stage = "Mainstage" | "Studio";
export type Genre = "Drama" | "Comedy" | "Musical" | "Family" | "Classic";
export type AccessKind =
  "Captioned" | "Audio-described" | "ASL-interpreted" | "Relaxed";
export type Zone = "premium" | "standard" | "value" | "partial" | "wheelchair";

export type Production = {
  slug: string;
  title: string;
  credit: string;
  stage: Stage;
  genre: Genre;
  label?: string;
  opens: string; // ISO date
  closes: string;
  runningTime: string;
  age: string;
  prices: Partial<Record<Zone, number>>;
  image: Img;
  gallery: Img[];
  logline: string;
  synopsis: string[];
  cast: { name: string; role: string }[];
  creatives: { name: string; role: string }[];
  guidance: string;
  access: { date: string; time: string; kind: AccessKind }[];
  quotes: { text: string; source: string }[];
};

const img = (src: string, alt: string, w: number, h: number): Img => ({
  src,
  alt,
  w,
  h,
});

export const productions: Production[] = [
  {
    slug: "the-space-between-the-words",
    title: "The Space Between the Words",
    credit: "A new play by Ada Vale · Directed by Rowan Ellis",
    stage: "Mainstage",
    genre: "Drama",
    label: "World premiere",
    opens: "2026-10-09",
    closes: "2026-11-08",
    runningTime: "2 hrs 15 min, including one interval",
    age: "Recommended 12+",
    prices: {
      premium: 89,
      standard: 64,
      value: 39,
      partial: 25,
      wheelchair: 39,
    },
    image: img(
      space,
      "Three figures stand in a lit blue box room while a fourth sits alone in a pool of light downstage",
      1024,
      681,
    ),
    gallery: [],
    logline:
      "Three siblings, one long dinner, and the sentence nobody has said out loud in twenty years.",
    synopsis: [
      "The Hale house has been on the market for a year. When Nell, Tomas and the youngest, Bea, come back to clear it, they agree on one rule: nobody mentions the night their father left the porch light on and didn't come home.",
      "Over a dinner that runs longer than any of them planned, the rule bends, then breaks. Ada Vale's first play for the Mainstage is funny, exact and unsentimental about the things families keep in the walls — and what it costs to finally take them down.",
    ],
    cast: [
      { name: "Marisol Grant", role: "Nell Hale" },
      { name: "Owen Achterberg", role: "Tomas Hale" },
      { name: "Lily Chen-Moreau", role: "Bea Hale" },
      { name: "Gideon Ashe", role: "Their father" },
      { name: "Ruth Okonjo", role: "The estate agent" },
    ],
    creatives: [
      { name: "Ada Vale", role: "Writer" },
      { name: "Rowan Ellis", role: "Director" },
      { name: "Tamsin Reyes", role: "Set & costume" },
      { name: "Kofi Brandt", role: "Lighting" },
      { name: "Elin Marsh", role: "Sound & composition" },
    ],
    guidance:
      "Contains strong language, references to the death of a parent, and a scene of sudden full blackout. Haze is used throughout Act Two.",
    access: [
      { date: "2026-10-24", time: "14:00", kind: "Captioned" },
      { date: "2026-10-29", time: "19:30", kind: "Audio-described" },
      { date: "2026-11-01", time: "14:00", kind: "ASL-interpreted" },
      { date: "2026-11-04", time: "19:30", kind: "Relaxed" },
    ],
    quotes: [
      {
        text: "Vale writes silence the way other playwrights write speeches.",
        source: "Port Ellery Courier",
      },
      {
        text: "The second act dinner is the best twenty minutes on any stage in the state this year.",
        source: "Harbor Arts Weekly",
      },
    ],
  },
  {
    slug: "minutes-of-the-last-meeting",
    title: "Minutes of the Last Meeting",
    credit: "A comedy by Theo Marsh · Directed by Jonah Pell",
    stage: "Studio",
    genre: "Comedy",
    opens: "2026-10-22",
    closes: "2026-11-22",
    runningTime: "1 hr 40 min, no interval",
    age: "Recommended 14+",
    prices: { standard: 42, value: 32 },
    image: img(
      minutes,
      "An empty stage set of a pale panelled office with a desk, two chairs and hanging lamps",
      1024,
      681,
    ),
    gallery: [],
    logline:
      "The Port Ellery parking committee has ninety minutes to agree on one bollard. It does not go well.",
    synopsis: [
      "Five volunteers, one agenda item, and a hall booked until nine. Theo Marsh's comedy takes the most local meeting imaginable and lets it escalate — through procedural motions, a stolen gavel and a very long amendment — into something close to a revolution.",
      "Played in the round in the Studio, so wherever you sit you're in the public gallery.",
    ],
    cast: [
      { name: "Hattie Lowe", role: "Chair" },
      { name: "Marcus Ide", role: "Treasurer" },
      { name: "Bryony Fell", role: "Minute-taker" },
      { name: "Sol Avraham", role: "Member for Quay Ward" },
      { name: "Dee Kincaid", role: "Member of the public" },
    ],
    creatives: [
      { name: "Theo Marsh", role: "Writer" },
      { name: "Jonah Pell", role: "Director" },
      { name: "Wren Abara", role: "Designer" },
      { name: "Kofi Brandt", role: "Lighting" },
    ],
    guidance: "Contains mild language and one very loud gavel.",
    access: [
      { date: "2026-11-07", time: "14:00", kind: "Captioned" },
      { date: "2026-11-12", time: "19:30", kind: "Relaxed" },
    ],
    quotes: [
      {
        text: "I have never laughed so hard at a quorum.",
        source: "Stagehand Review",
      },
    ],
  },
  {
    slug: "the-snow-queen",
    title: "The Snow Queen",
    credit:
      "Adapted from Hans Christian Andersen by Mira Osei · Directed by Jonah Pell",
    stage: "Mainstage",
    genre: "Family",
    label: "Holiday show",
    opens: "2026-11-27",
    closes: "2027-01-03",
    runningTime: "2 hrs, including one interval",
    age: "For everyone 6+",
    prices: {
      premium: 69,
      standard: 49,
      value: 29,
      partial: 19,
      wheelchair: 29,
    },
    image: img(
      snowQueen,
      "An audience waits before a theatre curtain lit with blue snowflake projections",
      1024,
      683,
    ),
    gallery: [
      img(
        curtain,
        "A lit stage curtain glowing amber in a dark auditorium",
        1024,
        703,
      ),
    ],
    logline:
      "Gerda walks to the top of the world to bring her best friend home. Bring a scarf.",
    synopsis: [
      "When a splinter of a magic mirror lodges in Kai's eye, he follows the Snow Queen north and forgets everything he loved. Gerda goes after him — past a talking river, a robber girl with a reindeer, and the longest winter anyone can remember.",
      "Our holiday show returns with live music from a four-piece band, a forty-foot sledge chase and real snow over the front rows. Under-16s pay $20 for every performance.",
    ],
    cast: [
      { name: "Ayo Fairweather", role: "Gerda" },
      { name: "Finn Castellano", role: "Kai" },
      { name: "Delphine Rourke", role: "The Snow Queen" },
      { name: "Maya Strand", role: "The Robber Girl" },
      { name: "Toby Okafor", role: "Bae the reindeer" },
    ],
    creatives: [
      { name: "Mira Osei", role: "Adaptation" },
      { name: "Jonah Pell", role: "Director" },
      { name: "Imani Fosse", role: "Music" },
      { name: "Tamsin Reyes", role: "Set & costume" },
      { name: "Leo Varga", role: "Puppetry" },
    ],
    guidance:
      "Some mildly scary moments with the Snow Queen's wolves, snow effects over rows A–C, and theatrical haze.",
    access: [
      { date: "2026-12-05", time: "14:00", kind: "Relaxed" },
      { date: "2026-12-12", time: "14:00", kind: "Captioned" },
      { date: "2026-12-13", time: "14:00", kind: "ASL-interpreted" },
      { date: "2026-12-19", time: "14:00", kind: "Audio-described" },
    ],
    quotes: [
      {
        text: "Funny, frightening and stuffed with snow. Our nine-year-old critic wants to go back.",
        source: "Port Ellery Courier",
      },
    ],
  },
  {
    slug: "the-seagull",
    title: "The Seagull",
    credit:
      "By Anton Chekhov · In a new version by Lena Brandt · Directed by Rowan Ellis",
    stage: "Studio",
    genre: "Classic",
    opens: "2027-01-14",
    closes: "2027-02-14",
    runningTime: "2 hrs 30 min, including one interval",
    age: "Recommended 12+",
    prices: { standard: 46, value: 34 },
    image: img(
      seagull,
      "Five actors in period costume gathered on a draped platform before a painted backdrop",
      1600,
      1130,
    ),
    gallery: [],
    logline:
      "A lake, a summer, a play within the play — and four people who each want a different life.",
    synopsis: [
      "Konstantin stages his strange new play by the lake; his mother, the famous actress Arkadina, laughs through it. From that one evening, Chekhov spins a comedy about art, ambition and unrequited love that still lands like news.",
      "Lena Brandt's new version is lean and conversational, staged a metre from the front row in the Studio.",
    ],
    cast: [
      { name: "Vera Lindqvist", role: "Arkadina" },
      { name: "Jamie Corcoran", role: "Konstantin" },
      { name: "Noor Haddad", role: "Nina" },
      { name: "Paul Ferrante", role: "Trigorin" },
      { name: "Sasha Mbeki", role: "Masha" },
    ],
    creatives: [
      { name: "Lena Brandt", role: "Version" },
      { name: "Rowan Ellis", role: "Director" },
      { name: "Wren Abara", role: "Designer" },
      { name: "Elin Marsh", role: "Sound" },
    ],
    guidance:
      "Contains a gunshot sound effect, references to suicide, and smoking of herbal cigarettes.",
    access: [
      { date: "2027-01-23", time: "14:00", kind: "Captioned" },
      { date: "2027-02-04", time: "19:30", kind: "Audio-described" },
    ],
    quotes: [],
  },
  {
    slug: "midnight-at-the-belvedere",
    title: "Midnight at the Belvedere",
    credit:
      "Book & lyrics by Cal Rourke · Music by Imani Fosse · Directed by Priya Desai",
    stage: "Mainstage",
    genre: "Musical",
    label: "New musical",
    opens: "2027-01-29",
    closes: "2027-03-14",
    runningTime: "2 hrs 40 min, including one interval",
    age: "Recommended 10+",
    prices: {
      premium: 98,
      standard: 72,
      value: 44,
      partial: 29,
      wheelchair: 44,
    },
    image: img(
      belvedere,
      "A large ensemble in evening dress and bright gowns fills a gilded stage under red drapes",
      1024,
      768,
    ),
    gallery: [
      img(
        curtainCall,
        "A row of costumed performers takes a bow across a wide stage",
        1023,
        412,
      ),
    ],
    logline:
      "New Year's Eve, 1929. The band is booked, the champagne is borrowed, and the hotel is already sold.",
    synopsis: [
      "The Belvedere's last night under its founding family: a ballroom full of guests who don't know the bank has called in the loan, and a night manager who has until midnight to save it — or at least make sure everybody dances.",
      "A brand-new musical with a fourteen-piece band in the pit, eighteen songs and a tap number on a revolving staircase.",
    ],
    cast: [
      { name: "Celeste Navarro", role: "Lou Bellamy, night manager" },
      { name: "Augustin Pryce", role: "Felix Hartigan" },
      { name: "June Adeyemi", role: "Dottie Marsh" },
      { name: "Harlan Voss", role: "The banker" },
      { name: "Ensemble of 14", role: "Guests, staff and the band" },
    ],
    creatives: [
      { name: "Cal Rourke", role: "Book & lyrics" },
      { name: "Imani Fosse", role: "Music & orchestrations" },
      { name: "Priya Desai", role: "Director" },
      { name: "Dante Hollis", role: "Choreography" },
      { name: "Tamsin Reyes", role: "Set & costume" },
    ],
    guidance:
      "Contains period depictions of drinking, flashing lights in the finale, and a loud pyrotechnic at midnight.",
    access: [
      { date: "2027-02-13", time: "14:00", kind: "Captioned" },
      { date: "2027-02-20", time: "14:00", kind: "Audio-described" },
      { date: "2027-02-27", time: "14:00", kind: "ASL-interpreted" },
    ],
    quotes: [],
  },
  {
    slug: "tidewater",
    title: "Tidewater",
    credit: "Devised by the Encore Youth Company · Directed by Dele Okafor",
    stage: "Studio",
    genre: "Drama",
    label: "Youth company",
    opens: "2027-02-25",
    closes: "2027-03-06",
    runningTime: "1 hr 15 min, no interval",
    age: "For everyone 10+",
    prices: { standard: 18, value: 12 },
    image: img(
      tidewater,
      "A young actor in a fur hat and army jacket looks upward, mid-scene, outdoors",
      1024,
      731,
    ),
    gallery: [
      img(
        youthCompany,
        "Two young performers in costume face each other during an outdoor rehearsal",
        1024,
        732,
      ),
      img(
        youthRehearsal,
        "Young company members in costume wait with their scripts between scenes",
        1024,
        731,
      ),
    ],
    logline:
      "Twenty-two young people, sixteen to nineteen, on the year the harbour froze and the town had to decide who it was.",
    synopsis: [
      "Built over eight months of workshops with the Encore Youth Company, Tidewater stitches together interviews with Port Ellery's oldest residents and the company's own stories into one winter on the waterfront.",
      "Every ticket is under $20, and every performance is followed by a short talk with the company.",
    ],
    cast: [
      { name: "The Encore Youth Company", role: "22 performers aged 16–19" },
    ],
    creatives: [
      { name: "Dele Okafor", role: "Director" },
      { name: "Wren Abara", role: "Designer" },
      { name: "Elin Marsh", role: "Sound" },
    ],
    guidance: "Contains descriptions of a storm and of loss at sea.",
    access: [{ date: "2027-03-04", time: "19:30", kind: "Relaxed" }],
    quotes: [],
  },
  {
    slug: "camille",
    title: "Camille",
    credit:
      "After Alexandre Dumas fils · Adapted by Ines Carvalho · Directed by Rowan Ellis",
    stage: "Mainstage",
    genre: "Classic",
    opens: "2027-03-26",
    closes: "2027-04-25",
    runningTime: "2 hrs 10 min, including one interval",
    age: "Recommended 14+",
    prices: {
      premium: 84,
      standard: 62,
      value: 36,
      partial: 24,
      wheelchair: 36,
    },
    image: img(
      camille,
      "A woman in a dark gown reclines on a red chaise while a figure in white lies on the floor of a black stage",
      1024,
      544,
    ),
    gallery: [],
    logline:
      "Paris, a red chaise, and a love affair that the whole city is betting against.",
    synopsis: [
      "Marguerite is the most talked-about woman in Paris, and the most unwell. Armand is twenty-four and sure of everything. Ines Carvalho strips Dumas's novel back to its two lovers, a chaise and a live string quartet, and lets the city close in around them.",
    ],
    cast: [
      { name: "Elodie Saint-Clair", role: "Marguerite Gautier" },
      { name: "Rafael Okoro", role: "Armand Duval" },
      { name: "Gideon Ashe", role: "Georges Duval" },
      { name: "The Lantern Quartet", role: "Live strings" },
    ],
    creatives: [
      { name: "Ines Carvalho", role: "Adaptation" },
      { name: "Rowan Ellis", role: "Director" },
      { name: "Kofi Brandt", role: "Lighting" },
      { name: "Tamsin Reyes", role: "Set & costume" },
    ],
    guidance:
      "Contains depictions of terminal illness, sexual references and strobe lighting in Act One.",
    access: [
      { date: "2027-04-10", time: "14:00", kind: "Captioned" },
      { date: "2027-04-15", time: "19:30", kind: "Audio-described" },
    ],
    quotes: [],
  },
  {
    slug: "measure-for-measure",
    title: "Measure for Measure",
    credit: "By William Shakespeare · Directed by Priya Desai",
    stage: "Mainstage",
    genre: "Classic",
    opens: "2027-05-07",
    closes: "2027-06-13",
    runningTime: "2 hrs 50 min, including one interval",
    age: "Recommended 14+",
    prices: {
      premium: 79,
      standard: 58,
      value: 32,
      partial: 22,
      wheelchair: 32,
    },
    image: img(
      measure,
      "Two actors in crimson doublets face off on a bare grey stage",
      1024,
      768,
    ),
    gallery: [],
    logline:
      "The Duke leaves town. His deputy cleans up the city. Then he meets Isabella.",
    synopsis: [
      "Shakespeare's darkest comedy about power and hypocrisy, played in Renaissance crimson on a stage of bare concrete. Angelo enforces the letter of the law until a novice nun asks him for mercy — and he names his price.",
    ],
    cast: [
      { name: "Noor Haddad", role: "Isabella" },
      { name: "Augustin Pryce", role: "Angelo" },
      { name: "Paul Ferrante", role: "The Duke" },
      { name: "Bryony Fell", role: "Mariana" },
      { name: "Marcus Ide", role: "Lucio" },
    ],
    creatives: [
      { name: "Priya Desai", role: "Director" },
      { name: "Tamsin Reyes", role: "Set & costume" },
      { name: "Kofi Brandt", role: "Lighting" },
      { name: "Mark Delaney", role: "Fight direction" },
    ],
    guidance:
      "Contains themes of sexual coercion, threatened execution and staged violence.",
    access: [
      { date: "2027-05-22", time: "14:00", kind: "Captioned" },
      { date: "2027-05-27", time: "19:30", kind: "Audio-described" },
      { date: "2027-06-05", time: "14:00", kind: "ASL-interpreted" },
    ],
    quotes: [],
  },
  {
    slug: "a-summer-at-larkhill",
    title: "A Summer at Larkhill",
    credit: "A new play by Harriet Quinn · Directed by Jonah Pell",
    stage: "Mainstage",
    genre: "Drama",
    label: "World premiere",
    opens: "2027-06-25",
    closes: "2027-07-25",
    runningTime: "2 hrs 20 min, including one interval",
    age: "Recommended 12+",
    prices: {
      premium: 82,
      standard: 60,
      value: 34,
      partial: 22,
      wheelchair: 34,
    },
    image: img(
      larkhill,
      "A sunlit garden terrace set with wicker chairs, a rug and cypress trees on a painted backdrop",
      1023,
      841,
    ),
    gallery: [
      img(
        larkhillParlour,
        "A woman in a white embroidered robe and a man in black on a wicker parlour set",
        1024,
        768,
      ),
    ],
    logline:
      "One terrace, one heatwave, and the summer a family finally sold the garden.",
    synopsis: [
      "Larkhill has hosted the Pemberton summers for sixty years. This one is the last. Harriet Quinn's warm, sharp new play plays out across a single August on the terrace, as three generations decide what to keep and what to let the developers have.",
    ],
    cast: [
      { name: "Vera Lindqvist", role: "Grace Pemberton" },
      { name: "Harlan Voss", role: "Edwin Pemberton" },
      { name: "Celeste Navarro", role: "Rosa" },
      { name: "Finn Castellano", role: "Kit" },
    ],
    creatives: [
      { name: "Harriet Quinn", role: "Writer" },
      { name: "Jonah Pell", role: "Director" },
      { name: "Wren Abara", role: "Designer" },
      { name: "Elin Marsh", role: "Sound" },
    ],
    guidance: "Contains mild language and references to dementia.",
    access: [
      { date: "2027-07-10", time: "14:00", kind: "Captioned" },
      { date: "2027-07-15", time: "19:30", kind: "Audio-described" },
    ],
    quotes: [],
  },
];

export const genres: Genre[] = [
  "Drama",
  "Comedy",
  "Musical",
  "Family",
  "Classic",
];

export const accessNotes: Record<AccessKind, string> = {
  Captioned: "Live captions on screens either side of the stage.",
  "Audio-described":
    "Live description through headsets, with a touch tour at 6:00 pm (or 12:30 pm for matinees).",
  "ASL-interpreted":
    "An ASL interpreter on stage left; best seen from orchestra rows C–H, seats 1–8.",
  Relaxed:
    "House lights stay low, loud effects are softened, and you are free to move or make noise.",
};

/* ------------------------------------------------------------ the house */

export type Row = { label: string; seats: number; zone: Zone };
export type Section = {
  name: string;
  rows: Row[];
  partialEnds?: number;
  wheelchair?: string[];
};

const rows = (labels: string[], seats: number[], zone: Zone): Row[] =>
  labels.map((label, i) => ({
    label,
    seats: seats[i] ?? seats[seats.length - 1],
    zone,
  }));

export const layouts: Record<Stage, Section[]> = {
  Mainstage: [
    {
      name: "Orchestra",
      rows: [
        ...rows(["A", "B"], [12, 14], "standard"),
        ...rows(
          ["C", "D", "E", "F", "G", "H"],
          [14, 16, 16, 16, 18, 18],
          "premium",
        ),
        ...rows(["J", "K"], [18], "standard"),
      ],
      wheelchair: ["K1", "K2", "K17", "K18"],
    },
    {
      name: "Mezzanine",
      rows: [
        ...rows(["AA", "BB"], [18, 20], "standard"),
        ...rows(["CC", "DD"], [20], "value"),
      ],
      partialEnds: 2,
    },
  ],
  Studio: [
    {
      name: "Studio",
      rows: [
        ...rows(["A", "B", "C", "D"], [12, 14, 14, 14], "standard"),
        ...rows(["E", "F", "G"], [14], "value"),
      ],
      wheelchair: ["G1", "G14"],
    },
  ],
};

export const zoneNames: Record<Zone, string> = {
  premium: "Premium",
  standard: "Standard",
  value: "Value",
  partial: "Partial view",
  wheelchair: "Wheelchair space",
};

export const ticketTypes = [
  { id: "full", label: "Full price" },
  { id: "under30", label: "Under 30 — $30" },
  { id: "member", label: "Member — 15% off" },
] as const;

export const maxSeats = 8;

/* ------------------------------------------------------------ membership */

export type Tier = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  line: string;
  benefits: string[];
};

export const tiers: Tier[] = [
  {
    id: "encore-30",
    name: "Encore 30",
    monthly: 0,
    yearly: 0,
    line: "Free for anyone aged 16–29.",
    benefits: [
      "$30 tickets to any seat, any night",
      "Two tickets per production",
      "Text alerts for returns",
    ],
  },
  {
    id: "friend",
    name: "Friend",
    monthly: 8,
    yearly: 84,
    line: "For people who come to most of the season.",
    benefits: [
      "Priority booking one week ahead",
      "10% off every ticket",
      "No booking fees",
      "Free exchanges up to 48 hours before",
    ],
  },
  {
    id: "inner-circle",
    name: "Inner Circle",
    monthly: 20,
    yearly: 210,
    line: "Closer to the work, earlier than anyone.",
    benefits: [
      "Priority booking two weeks ahead",
      "15% off every ticket",
      "Two open rehearsal visits a season",
      "Members' bar on the mezzanine",
    ],
  },
  {
    id: "patron",
    name: "Patron",
    monthly: 85,
    yearly: 900,
    line: "Keeps new plays on our stage.",
    benefits: [
      "Priority booking three weeks ahead",
      "House seats held until 24 hours before",
      "Opening-night invitations",
      "Your name in every programme",
    ],
  },
];

export const benefitTable: { benefit: string; values: (string | boolean)[] }[] =
  [
    {
      benefit: "Priority booking",
      values: ["—", "1 week", "2 weeks", "3 weeks"],
    },
    {
      benefit: "Ticket discount",
      values: ["$30 any seat", "10%", "15%", "15%"],
    },
    { benefit: "Booking fees waived", values: [true, true, true, true] },
    { benefit: "Free ticket exchanges", values: [false, true, true, true] },
    {
      benefit: "Open rehearsal visits",
      values: [false, false, "2 a season", "4 a season"],
    },
    { benefit: "Members' bar", values: [false, false, true, true] },
    {
      benefit: "Opening-night invitations",
      values: [false, false, false, true],
    },
    { benefit: "Backstage tour", values: [false, false, true, true] },
  ];

export const membershipFaq = [
  {
    q: "When does priority booking open?",
    a: "Each season goes on sale to Patrons first, then Inner Circle, then Friends, a week apart. We email you the morning your window opens.",
  },
  {
    q: "Can I share my discount?",
    a: "Yes — your discount covers up to four tickets per performance, so bring whoever you like.",
  },
  {
    q: "Is membership tax-deductible?",
    a: "Encore Theatre is a fictional nonprofit for this template. A real theatre would explain the deductible portion of each tier here.",
  },
  {
    q: "How do I cancel?",
    a: "Monthly memberships can be cancelled at any time from your account or by calling the box office. Yearly memberships run to their renewal date.",
  },
];

/* ------------------------------------------------------------ learning */

export type Audience = "Young people" | "Schools" | "Adults";

export type Programme = {
  id: string;
  title: string;
  audience: Audience;
  ages: string;
  when: string;
  price: string;
  text: string;
};

export const audiences: Audience[] = ["Young people", "Schools", "Adults"];

export const programmes: Programme[] = [
  {
    id: "juniors",
    title: "Encore Juniors",
    audience: "Young people",
    ages: "8–11",
    when: "Saturdays, 10:00 am – 12:00 pm",
    price: "$180 a term · bursaries available",
    text: "Games, stories and a short sharing for families at the end of each term. No experience needed.",
  },
  {
    id: "company",
    title: "Encore Company",
    audience: "Young people",
    ages: "12–15",
    when: "Tuesdays, 5:00 – 7:00 pm",
    price: "$195 a term · bursaries available",
    text: "Scene work, devising and voice, with a full Studio production every spring.",
  },
  {
    id: "youth-company",
    title: "Encore Youth Company",
    audience: "Young people",
    ages: "16–19",
    when: "Thursdays, 6:00 – 8:30 pm",
    price: "Free · by workshop audition in September",
    text: "Our flagship company. This season they make Tidewater for the Studio, with professional designers.",
  },
  {
    id: "matinees",
    title: "Schools matinees",
    audience: "Schools",
    ages: "Grades 4–12",
    when: "Selected Wednesdays, 11:00 am",
    price: "$12 per student · teachers free",
    text: "Daytime performances of the season with a cast Q&A and a free teacher resource pack.",
  },
  {
    id: "workshops",
    title: "In-school workshops",
    audience: "Schools",
    ages: "Grades 3–12",
    when: "Term-time, booked by the half-day",
    price: "$340 per half-day",
    text: "Two of our teaching artists come to you to work on a set text, a production, or devising from scratch.",
  },
  {
    id: "teachers",
    title: "Teachers' evenings",
    audience: "Schools",
    ages: "Educators",
    when: "One Monday per production, 5:30 pm",
    price: "Free, with a free ticket",
    text: "A first look at the production with the director, plus practical exercises to take back to class.",
  },
  {
    id: "beginners",
    title: "Acting for beginners",
    audience: "Adults",
    ages: "18+",
    when: "Mondays, 7:00 – 9:00 pm · 8 weeks",
    price: "$240",
    text: "For anyone who has always wanted to try. Ends with an informal sharing on the Studio stage.",
  },
  {
    id: "playwriting",
    title: "Playwriting lab",
    audience: "Adults",
    ages: "18+",
    when: "Wednesdays, 6:30 – 9:00 pm · 10 weeks",
    price: "$290",
    text: "Write a short play from first idea to read-through, led by our literary manager Ines Carvalho.",
  },
  {
    id: "late-shift",
    title: "The Late Shift",
    audience: "Adults",
    ages: "60+",
    when: "Fridays, 2:00 – 4:00 pm",
    price: "$60 a term",
    text: "Our company for over-60s: scene study, play-reading and a show in the foyer each summer.",
  },
];

/* ------------------------------------------------------------ visit */

export type Hours = [string, string] | null;
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Box office, Sunday first. */
export const boxOfficeHours: Hours[] = [
  ["12:00", "14:30"],
  null,
  ["12:00", "20:00"],
  ["12:00", "20:00"],
  ["12:00", "20:00"],
  ["12:00", "20:00"],
  ["11:00", "20:00"],
];

export const gettingHere = [
  {
    title: "By bus",
    text: "Routes 4 and 11 stop at Lantern & Pier, 90 seconds from the doors.",
  },
  {
    title: "By train",
    text: "Port Ellery Union is a 12-minute walk along the waterfront. After evening shows, the 10:42 pm and 11:15 pm trains run north.",
  },
  {
    title: "By car",
    text: "Harbor Street Garage (24 hours) is 200 yards away. Show your ticket for a flat $9 evening rate.",
  },
  {
    title: "By bike",
    text: "Covered racks for 30 bikes beside the stage door on Rope Walk.",
  },
];

export const accessFeatures = [
  "Step-free entry from Lantern Street, with an elevator to every level",
  "Four wheelchair spaces in the orchestra, two in the Studio, each with a companion seat",
  "Hearing loop in both auditoriums and at the box office",
  "Captioned, audio-described, ASL-interpreted and relaxed performances of every production",
  "A free companion ticket for anyone who needs one to attend",
  "Quiet room off the foyer, open from doors until the final bow",
];

export const barMenu = [
  { item: "Lantern Street lager", price: 8 },
  { item: "House red or white, glass", price: 11 },
  { item: "Interval espresso martini", price: 15 },
  { item: "Hot cider (winter)", price: 7 },
  { item: "Smoked trout rillettes, rye toast", price: 13 },
  { item: "Chocolate pot, salted caramel", price: 9 },
];

export const visitFaq = [
  {
    q: "When should I arrive?",
    a: "Doors open 45 minutes before curtain and the bar opens at the same time. Pre-order interval drinks and they'll be waiting on a numbered shelf.",
  },
  {
    q: "What if I'm late?",
    a: "Our ushers will seat you at a suitable break. For some productions that is the interval, so we'll find you a seat at the back of the mezzanine in the meantime.",
  },
  {
    q: "Can I bring children?",
    a: "Every child needs their own ticket, and each production has an age recommendation on its page. Booster cushions are free from the cloakroom.",
  },
  {
    q: "Can I exchange my tickets?",
    a: "Members exchange free up to 48 hours before. Everyone else can exchange for a $4 fee per ticket, subject to availability.",
  },
  {
    q: "Is there a cloakroom?",
    a: "Yes, free, on the ground floor. Large bags and suitcases cannot be taken into the auditorium.",
  },
];

export const seatingGuide = [
  {
    section: "Orchestra A–B",
    text: "Very close. Great for the Studio-like intimacy of a play, a slight look up at the stage.",
  },
  {
    section: "Orchestra C–H",
    text: "Our premium rows: eye-level with the stage and the full width of the set.",
  },
  {
    section: "Orchestra J–K",
    text: "Under the mezzanine overhang. Good value, slightly muffled for musicals.",
  },
  {
    section: "Mezzanine AA–BB",
    text: "Looking down on the whole picture — the best seats for big ensemble numbers.",
  },
  {
    section: "Mezzanine CC–DD",
    text: "Our value seats. The outer two seats in each row lose a slice of the stage to the proscenium.",
  },
];

/* ------------------------------------------------------------ about */

export const story = [
  "Encore Theatre opened in 1911 as the Lantern Street Opera House, a 600-seat playhouse built by the town's net-makers' guild with money raised one penny a week. It ran melodrama, vaudeville and touring opera until 1958, when it became a cinema and then, for a while, a carpet warehouse.",
  "In 1987 a company of eleven actors took on the lease for a dollar a year and called it Encore. They reopened with Twelfth Night, staged in the half-gutted shell by candle-lantern. Today we are a nonprofit producing theatre with two stages, a youth company of eighty, and an ensemble of artists who return season after season.",
  "We make new plays and reimagined classics for Port Ellery and everyone who visits it. Around a third of our seats every season sell for $30 or less.",
];

export const timeline = [
  {
    year: "1911",
    text: "The Lantern Street Opera House opens with a touring production of The Bohemian Girl.",
  },
  {
    year: "1958",
    text: "The theatre becomes the Lantern Cinema. The orchestra pit is boarded over.",
  },
  {
    year: "1987",
    text: "A company of eleven reopens the building as Encore Theatre.",
  },
  {
    year: "2004",
    text: "The plaster ceiling and the mezzanine are restored; the pit is reopened.",
  },
  { year: "2019", text: "The 98-seat Studio opens in the old scenery dock." },
  {
    year: "2026",
    text: "Our first season with eight productions and a full youth company show.",
  },
];

export const people = [
  {
    name: "Rowan Ellis",
    role: "Artistic Director",
    bio: "Has directed 22 productions at Encore, including this season's opener.",
  },
  {
    name: "Priya Halloran",
    role: "Executive Director",
    bio: "Joined from a touring company in 2018; runs the building, the budget and the box office.",
  },
  {
    name: "Jonah Pell",
    role: "Associate Director",
    bio: "Directs our holiday show every year and teaches the Monday beginners.",
  },
  {
    name: "Dele Okafor",
    role: "Head of Learning",
    bio: "Built the Youth Company from twelve members to eighty.",
  },
  {
    name: "Ines Carvalho",
    role: "Literary Manager",
    bio: "Reads every script sent to us — roughly 600 a year — and runs the playwriting lab.",
  },
  {
    name: "Sam Whitlock",
    role: "Head of Production",
    bio: "Twenty-five years backstage on Lantern Street, and keeper of the revolve.",
  },
];

export const supporters = [
  "The Harbor Light Foundation",
  "Port Ellery Arts Council",
  "The Pemberton Family Trust",
  "Northshore Credit Union",
  "The Ropewalk Playwrights' Fund",
  "Our 2,400 members",
];

/* ------------------------------------------------------------ images not tied to productions */

export const images = {
  house: img(
    house,
    "A grand auditorium of red seats under an ornate painted ceiling and chandelier",
    1024,
    680,
  ),
  curtain: img(
    curtain,
    "A lit stage curtain glowing amber above a dark, waiting audience",
    1024,
    703,
  ),
  aisle: img(
    aisle,
    "A lit aisle of steps running up between rows of red theatre seats in darkness",
    1024,
    683,
  ),
  curtainCall: img(
    curtainCall,
    "A row of costumed performers takes a bow across a wide stage",
    1023,
    412,
  ),
  workshop: img(
    workshop,
    "A director in a red sweater gestures upward while talking with an older actor in a rehearsal room",
    1600,
    1071,
  ),
  youthCompany: img(
    youthCompany,
    "Two young performers in costume face each other during an outdoor rehearsal",
    1024,
    732,
  ),
  youthRehearsal: img(
    youthRehearsal,
    "Young company members in costume wait with their scripts between scenes",
    1024,
    731,
  ),
};
