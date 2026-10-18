import quietBetween from "./assets/film-quiet-between.jpg";
import lightGoes from "./assets/film-light-goes.jpg";
import harbourWall from "./assets/film-harbour-wall.jpg";
import kafe from "./assets/film-kafe.jpg";
import lastTrain from "./assets/film-last-train.jpg";
import snowline from "./assets/film-snowline.jpg";
import typhoon from "./assets/film-typhoon.jpg";
import redEarth from "./assets/film-red-earth.jpg";
import fogLine from "./assets/film-fog-line.jpg";
import auditorium from "./assets/auditorium.jpg";
import projector from "./assets/projector.jpg";
import screenTwo from "./assets/screen-two.jpg";
import archive from "./assets/archive.jpg";
import bar from "./assets/bar.jpg";
import booth from "./assets/booth.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  auditorium: {
    src: auditorium,
    alt: "Screen One from the back row: red seats sloping down to a lit, empty screen",
    w: 1600,
    h: 1200,
  },
  projector: {
    src: projector,
    alt: "A grey 35mm projector in the projection box, its lamphouse and controls up close",
    w: 1500,
    h: 1125,
  },
  screenTwo: {
    src: screenTwo,
    alt: "Screen Two seen from the balcony: raked rows of seats facing a small white screen",
    w: 1800,
    h: 1296,
  },
  archive: {
    src: archive,
    alt: "Black-and-white photograph of a grand auditorium with a balcony and striped ceiling lights",
    w: 1300,
    h: 988,
  },
  bar: {
    src: bar,
    alt: "Guests leaning on the bar counter while two bartenders serve under hanging bulbs",
    w: 1350,
    h: 760,
  },
  booth: {
    src: booth,
    alt: "A red-and-gold ticket booth between two glass entrance doors",
    w: 1500,
    h: 1125,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Aperture",
  sector: "Independent cinema",
  tagline: "Two screens, one bar, and the lights go down on time.",
  street: "41 Tanner Street",
  town: "Harbourside HB1 4TS",
  email: "hello@aperture.example",
  hireEmail: "hire@aperture.example",
  phone: "+44 20 7946 0412",
  phoneHref: "tel:+442079460412",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Letterboxd", href: "https://letterboxd.com/" },
    { label: "Bluesky", href: "https://bsky.app/" },
  ],
};

export const nav = [
  { to: "/whats-on", label: "What's on" },
  { to: "/events", label: "Events" },
  { to: "/membership", label: "Membership" },
  { to: "/hire", label: "Venue hire" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Programme",
    links: [
      { to: "/whats-on", label: "What's on" },
      { to: "/events", label: "Events & Q&As" },
      { to: "/book", label: "Book tickets" },
    ],
  },
  {
    title: "Aperture",
    links: [
      { to: "/membership", label: "Membership" },
      { to: "/hire", label: "Venue hire" },
      { to: "/visit", label: "Visit & access" },
      { to: "/about", label: "About us" },
    ],
  },
];

export const newsletter = {
  title: "The Tuesday sheet",
  text: "Next week's programme, one email, every Tuesday at noon. Members hear about Q&As first.",
};

/* ------------------------------------------------------------------ screens */

export type ScreenId = 1 | 2;

export type Screen = {
  id: ScreenId;
  name: string;
  /** Row letters front → back. Cinemas skip I. */
  rows: string[];
  perRow: number;
  /** A gangway follows these seat numbers. */
  aisles: number[];
  /** Wheelchair spaces, e.g. "G1". */
  access: string[];
  /** Metres: screen width, front row to screen, row to row. */
  screenWidth: number;
  firstRow: number;
  rowPitch: number;
  specs: string[];
};

export const screens: Record<ScreenId, Screen> = {
  1: {
    id: 1,
    name: "Screen One",
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    perRow: 14,
    aisles: [3, 11],
    access: ["G1", "G14"],
    screenWidth: 11,
    firstRow: 4.6,
    rowPitch: 1.05,
    specs: [
      "140 seats, two wheelchair spaces",
      "11 m screen",
      "35mm, 70mm and 4K digital",
      "7.1 surround, hearing loop",
    ],
  },
  2: {
    id: 2,
    name: "Screen Two",
    rows: ["A", "B", "C", "D", "E", "F", "G"],
    perRow: 10,
    aisles: [5],
    access: ["A1", "A10"],
    screenWidth: 5.6,
    firstRow: 3.2,
    rowPitch: 0.95,
    specs: [
      "70 seats, two wheelchair spaces",
      "5.6 m screen",
      "35mm, 16mm and 2K digital",
      "5.1 sound, hearing loop",
    ],
  },
};

/* ------------------------------------------------------------------ films */

export type Format = "35mm" | "70mm" | "Digital";
export type Strand = "New release" | "Night Shift";
export type ShowNote =
  "Q&A" | "Introduced" | "Captioned" | "Parent & baby" | "Relaxed";

/** day: 0 = today, 1 = tomorrow … 6. */
export type Showing = {
  day: number;
  time: string;
  note?: ShowNote;
  soldOut?: true;
};

export type Film = {
  slug: string;
  title: string;
  original?: string;
  year: number;
  director: string;
  country: string;
  language: string;
  runtime: number;
  cert: "U" | "PG" | "12A" | "15" | "18";
  format: Format;
  screen: ScreenId;
  strand: Strand;
  logline: string;
  synopsis: string[];
  note: { text: string; by: string };
  cast: string[];
  image: Img;
  showings: Showing[];
};

const still = (src: string, alt: string, w: number, h: number): Img => ({
  src,
  alt,
  w,
  h,
});

export const films: Film[] = [
  {
    slug: "the-quiet-between",
    title: "The Quiet Between",
    year: 2026,
    director: "Ellis North",
    country: "United Kingdom",
    language: "English",
    runtime: 108,
    cert: "15",
    format: "Digital",
    screen: 1,
    strand: "New release",
    logline:
      "Two estranged sisters drive their father's van the length of the country in a single night.",
    synopsis: [
      "Ruth has not spoken to her younger sister in six years. Then their father dies in a seaside town neither of them has visited, leaving a van, a debt, and a request to be buried in the hills where he was born — by dawn on Sunday.",
      "Ellis North shot the film over nineteen nights on the A-roads between the coast and the border, with real lay-bys, real petrol stations and a cast who barely left the cab. It is funny, then furious, then very quiet. Stay for the last shot.",
    ],
    note: {
      text: "The best British film of the year takes place almost entirely inside a Transit van after midnight, and you will not want it to end. We booked it the week we saw it.",
      by: "Priya Lal, head of programme",
    },
    cast: ["Hannah Moye", "Della Okafor", "Tom Graves"],
    image: still(
      quietBetween,
      "A dark country road at dusk, telegraph poles against a deep blue sky and one distant pair of headlights",
      1800,
      1122,
    ),
    showings: [
      { day: 0, time: "18:00" },
      { day: 0, time: "20:45" },
      { day: 1, time: "20:45" },
      { day: 2, time: "18:15", note: "Q&A" },
      { day: 3, time: "20:45" },
      { day: 5, time: "15:30" },
      { day: 6, time: "20:45" },
    ],
  },
  {
    slug: "where-the-light-goes",
    title: "Where the Light Goes",
    year: 2026,
    director: "Alma Reed",
    country: "United Kingdom",
    language: "English",
    runtime: 94,
    cert: "12A",
    format: "Digital",
    screen: 2,
    strand: "New release",
    logline:
      "A year in a cliff-top village that loses a metre of land to the sea every winter.",
    synopsis: [
      "Alma Reed lived in Skelby for a full year while the last eleven houses on Cliff Row waited to be demolished. Her film follows the postmistress, the coastguard and a twelve-year-old who maps the erosion with a tape measure every Sunday.",
      "There is no narration and no score, only wind, gulls and the people who stayed. It is the most patient documentary we have shown in years, and the most generous.",
    ],
    note: {
      text: "Bring someone who grew up by the sea. They will be quiet on the way home.",
      by: "Owen Barr, programmer",
    },
    cast: ["Documentary"],
    image: still(
      lightGoes,
      "A grey sea seen through dark pines from a rocky headland under heavy cloud",
      1600,
      1069,
    ),
    showings: [
      { day: 0, time: "14:15" },
      { day: 0, time: "18:30" },
      { day: 2, time: "16:00" },
      { day: 3, time: "19:00", note: "Captioned" },
      { day: 5, time: "13:00" },
      { day: 6, time: "18:45" },
    ],
  },
  {
    slug: "the-harbour-wall",
    title: "The Harbour Wall",
    original: "Le Môle",
    year: 2025,
    director: "Margaux Delaunay",
    country: "France",
    language: "French with English subtitles",
    runtime: 121,
    cert: "15",
    format: "Digital",
    screen: 1,
    strand: "New release",
    logline:
      "A lighthouse keeper's last winter, and the storm that refuses to wait for her retirement.",
    synopsis: [
      "Odile has kept the light at the end of the Port-Vert harbour wall for thirty-one years. The light is being automated in March. In January the worst storm in a century arrives, and with it a fishing boat that should never have left port.",
      "Delaunay films weather the way other directors film faces. Seen on our eleven-metre screen with the sound up, the second hour is close to physical.",
    ],
    note: {
      text: "This is why Screen One exists. Sit in row F, dead centre, and let it hit you.",
      by: "Priya Lal, head of programme",
    },
    cast: ["Isabelle Ferrand", "Yanis Belkacem", "Corinne Abadie"],
    image: still(
      harbourWall,
      "Lightning forks over a dark sea above a long pier and a small green harbour light",
      1800,
      1012,
    ),
    showings: [
      { day: 0, time: "15:00" },
      { day: 1, time: "17:45" },
      { day: 3, time: "17:45" },
      { day: 4, time: "20:30" },
      { day: 6, time: "17:30" },
    ],
  },
  {
    slug: "kafe-lindqvist",
    title: "Kafé Lindqvist",
    year: 2025,
    director: "Sune Hald",
    country: "Denmark",
    language: "Danish with English subtitles",
    runtime: 99,
    cert: "12A",
    format: "Digital",
    screen: 2,
    strand: "New release",
    logline:
      "A corner café, a rainy October, and a widower who refuses to sell.",
    synopsis: [
      "Bent Lindqvist has run the café on the corner of Ravnsgade for forty years, and he is not interested in the developer's very generous offer, or the developer's very charming daughter, who has started coming in every morning.",
      "A warm, dry comedy that knows exactly how long to hold a silence. The regulars are played by the actual regulars of a Copenhagen café, which explains the timing.",
    ],
    note: {
      text: "The film we recommend when someone asks for 'something nice'. It is nice. It is also very sharp.",
      by: "Owen Barr, programmer",
    },
    cast: ["Henning Dahl", "Sofie Krag", "Mads Iversen"],
    image: still(
      kafe,
      "A café on a rainy street corner at dusk, its red sign glowing above the awning",
      1500,
      1000,
    ),
    showings: [
      { day: 0, time: "16:30" },
      { day: 0, time: "21:00" },
      { day: 1, time: "19:15" },
      { day: 3, time: "11:00", note: "Parent & baby" },
      { day: 4, time: "18:30" },
      { day: 6, time: "16:00" },
    ],
  },
  {
    slug: "last-train-to-velde",
    title: "The Last Train to Velde",
    original: "Der letzte Zug nach Velde",
    year: 1971,
    director: "Hanne Lorentz",
    country: "West Germany",
    language: "German with English subtitles",
    runtime: 112,
    cert: "PG",
    format: "35mm",
    screen: 1,
    strand: "Night Shift",
    logline:
      "A station master, a snowed-in platform and eleven passengers who all missed the same train.",
    synopsis: [
      "When the 23:40 to Velde is cancelled by snow, eleven strangers spend the night in a provincial waiting room. By morning one of them is gone, and the station master has to decide what he saw.",
      "Hanne Lorentz's chamber thriller was a flop in 1971 and a cult object ever since. We are showing an original print from a German state archive, with all its scratches and none of its lost reel.",
    ],
    note: {
      text: "Print condition: good, slight fading in reel three. That is part of the pleasure.",
      by: "Jonah Weller, chief projectionist",
    },
    cast: ["Klaus Brenner", "Ilse Marten", "Rolf Hagedorn"],
    image: still(
      lastTrain,
      "A snowy railway station at night, empty platforms lit by a row of lamps",
      1600,
      1200,
    ),
    showings: [
      { day: 1, time: "14:30" },
      { day: 4, time: "17:30" },
      { day: 5, time: "20:30" },
    ],
  },
  {
    slug: "snowline",
    title: "Snowline",
    original: "Snežna meja",
    year: 2026,
    director: "Nika Zorman",
    country: "Slovenia",
    language: "Slovenian with English subtitles",
    runtime: 104,
    cert: "12A",
    format: "Digital",
    screen: 1,
    strand: "New release",
    logline:
      "A mountain rescue team, a missing skier and eight hours until the forecast closes the pass.",
    synopsis: [
      "Maja has led the Pokrovec rescue team for one season. When a skier vanishes above the tree line at dusk, the helicopter is grounded and the only way up is on foot, through the forest, in the dark.",
      "Shot on location at minus eighteen, Snowline is a procedural with no wasted movement. Its night photography, lit almost entirely by headtorches, is extraordinary on a big screen.",
    ],
    note: {
      text: "A proper edge-of-the-seat film that also happens to be beautiful. Rare combination.",
      by: "Owen Barr, programmer",
    },
    cast: ["Ana Kosmač", "Luka Vidmar", "Petra Zupan"],
    image: still(
      snowline,
      "A snow-covered forest road under a starry winter sky",
      1500,
      886,
    ),
    showings: [
      { day: 0, time: "12:30" },
      { day: 2, time: "21:00" },
      { day: 4, time: "14:00", note: "Captioned" },
      { day: 5, time: "18:00" },
      { day: 6, time: "13:00" },
    ],
  },
  {
    slug: "typhoon-hours",
    title: "Typhoon Hours",
    original: "風球時間",
    year: 1994,
    director: "Lam Chi-wai",
    country: "Hong Kong",
    language: "Cantonese with English subtitles",
    runtime: 98,
    cert: "15",
    format: "35mm",
    screen: 2,
    strand: "Night Shift",
    logline:
      "Signal No. 8 is hoisted, the city shuts down, and a night-shift taxi driver keeps working.",
    synopsis: [
      "Over one storm-bound night, Ah Keung drives a pregnant woman, a drunk triad accountant, two runaway schoolboys and a man carrying a fish tank across a flooding city. None of them are going where they say.",
      "Lam's neon-soaked second feature has been unavailable in the UK for twenty years. Our print is a 2019 lab restoration struck on 35mm, and it looks as wet as the night it was shot.",
    ],
    note: {
      text: "The Night Shift season exists so we could show this one film. Everything else is an excuse.",
      by: "Priya Lal, head of programme",
    },
    cast: ["Chan Wing-on", "Cheung Mei-ling", "Wong Hoi"],
    image: still(
      typhoon,
      "A city street at night after heavy rain, neon signs reflected in the wet road",
      1500,
      1125,
    ),
    showings: [
      { day: 1, time: "21:30" },
      { day: 2, time: "20:30", soldOut: true },
      { day: 4, time: "21:15" },
      { day: 5, time: "21:00" },
    ],
  },
  {
    slug: "red-earth-blue-hour",
    title: "Red Earth, Blue Hour",
    year: 2025,
    director: "Joaquín Ferro",
    country: "Argentina / Spain",
    language: "Spanish and English with English subtitles",
    runtime: 141,
    cert: "12A",
    format: "70mm",
    screen: 1,
    strand: "New release",
    logline:
      "A surveyor, a dying cattle station and a boundary line that nobody wants drawn.",
    synopsis: [
      "In 1931 a young English surveyor is sent to fix the border between two estancias in the high desert. Both families want the waterhole. Both are prepared to wait him out.",
      "Shot on 65mm negative and shown here as a 70mm print, Ferro's western is built for a screen like ours. It is long, slow and enormous, and the last twenty minutes earn every one of the first hundred and twenty.",
    ],
    note: {
      text: "One of only four 70mm prints in the country. Ours runs on the 1962 projector we spent three winters restoring.",
      by: "Jonah Weller, chief projectionist",
    },
    cast: ["Lucía Arce", "Callum Stride", "Ernesto Vidal"],
    image: still(
      redEarth,
      "Red desert hills at dusk under a wide blue and violet sky",
      1800,
      1200,
    ),
    showings: [
      { day: 2, time: "13:30" },
      { day: 5, time: "11:30", note: "Introduced" },
      { day: 6, time: "14:15" },
    ],
  },
  {
    slug: "the-fog-line",
    title: "The Fog Line",
    year: 1983,
    director: "Peter Ashdown",
    country: "United Kingdom",
    language: "English",
    runtime: 89,
    cert: "18",
    format: "35mm",
    screen: 1,
    strand: "Night Shift",
    logline:
      "A Pennine bypass, a fog that rolls in every night at eleven, and the road crew who stop going home.",
    synopsis: [
      "Ashdown's only feature was shot for almost nothing on a half-built road outside Holmbridge, using the actual site floodlights and the actual site crew. It was cut by the censor, then forgotten, then rediscovered on VHS by a generation who could not quite believe it.",
      "We are showing the uncut 35mm print, at the hour it was meant for. Late shows start at 23:00; the bar stays open until the credits finish.",
    ],
    note: {
      text: "Not gory. Much worse: patient. Do not sit alone in row K.",
      by: "Priya Lal, head of programme",
    },
    cast: ["Gary Holt", "Brenda Shaw", "Ian Platt"],
    image: still(
      fogLine,
      "Bare trees in thick fog, lit yellow from behind by floodlights beside a wet road",
      1400,
      948,
    ),
    showings: [
      { day: 1, time: "23:00", note: "Introduced" },
      { day: 4, time: "23:15" },
      { day: 5, time: "23:15" },
    ],
  },
];

export const strands: { name: Strand; text: string }[] = [
  {
    name: "New release",
    text: "First-run films, mostly independent, often subtitled.",
  },
  {
    name: "Night Shift",
    text: "Our autumn season of films set after dark, all on 35mm.",
  },
];

export const season = {
  name: "Night Shift",
  title: "Night Shift: films after dark",
  dates: "Every weekend until 30 November",
  intro:
    "Taxi drivers, station masters and road crews: our autumn season is about the people who work while the rest of us sleep. Every film is shown on 35mm, most of them late, and the bar stays open until the credits finish.",
};

/* ------------------------------------------------------------------ tickets */

export type TicketId = "standard" | "concession" | "under16" | "member";

export const ticketTypes: {
  id: TicketId;
  label: string;
  note: string;
  price: number;
}[] = [
  { id: "standard", label: "Standard", note: "", price: 13.5 },
  {
    id: "concession",
    label: "Concession",
    note: "Students, over-65s, jobseekers, carers",
    price: 10.5,
  },
  {
    id: "under16",
    label: "Under 16",
    note: "Accompanied, where the certificate allows",
    price: 8,
  },
  { id: "member", label: "Member", note: "Card checked at the door", price: 9 },
];

export const pricing = {
  tuesdayPrice: 8,
  tuesdayLine: "Cheap Tuesdays: every ticket £8, every screening.",
  bookingFee: "No booking fees. Ever.",
  maxSeats: 8,
};

/* ------------------------------------------------------------------ events */

export type EventKind =
  "Q&A" | "Introduced" | "Tour" | "Bar" | "Access" | "Shorts";

export type CinemaEvent = {
  id: string;
  title: string;
  kind: EventKind;
  day: number;
  time: string;
  place: string;
  price: string;
  text: string;
  /** Linked film; the event is a screening when a showing matches day + time. */
  film?: string;
};

export const events: CinemaEvent[] = [
  {
    id: "quiet-between-qa",
    title: "The Quiet Between + Q&A with Ellis North",
    kind: "Q&A",
    day: 2,
    time: "18:15",
    place: "Screen One",
    price: "Standard ticket prices",
    text: "The director and her editor, Sam Achebe, talk about shooting nineteen nights in a moving van, chaired by our head of programme. Around forty minutes after the film.",
    film: "the-quiet-between",
  },
  {
    id: "fog-line-intro",
    title: "Night Shift opens: The Fog Line on 35mm",
    kind: "Introduced",
    day: 1,
    time: "23:00",
    place: "Screen One",
    price: "Standard ticket prices",
    text: "Priya Lal introduces the season and the uncut print. Free hot chocolate with every late-show ticket, because it will be cold when you leave.",
    film: "the-fog-line",
  },
  {
    id: "projection-tour",
    title: "Up in the box: projection tour",
    kind: "Tour",
    day: 3,
    time: "17:00",
    place: "Projection box",
    price: "Free, eight places",
    text: "Jonah Weller shows you the two 35mm machines, the restored 70mm projector and how a print is made up on the platter. Steep stairs; ask at the box office for places.",
  },
  {
    id: "parent-baby",
    title: "Parent & baby: Kafé Lindqvist",
    kind: "Access",
    day: 3,
    time: "11:00",
    place: "Screen Two",
    price: "Standard ticket prices, babies free",
    text: "Lights half up, sound a little lower, space for buggies at the front and nobody minds the noise. For grown-ups with babies under eighteen months.",
    film: "kafe-lindqvist",
  },
  {
    id: "quiz",
    title: "The Aperture film quiz",
    kind: "Bar",
    day: 4,
    time: "19:30",
    place: "The Bar",
    price: "£2 a player, for the Harbourside food bank",
    text: "Six rounds, one picture round, one music round and an impossible question about running times. Teams of up to five; just turn up.",
  },
  {
    id: "seventy-mm",
    title: "Why 70mm? Red Earth, Blue Hour introduced",
    kind: "Introduced",
    day: 5,
    time: "11:30",
    place: "Screen One",
    price: "Standard ticket prices",
    text: "A fifteen-minute talk on large-format film before the screening, with a strip of 65mm negative passed round the room.",
    film: "red-earth-blue-hour",
  },
  {
    id: "captioned-snowline",
    title: "Captioned screening: Snowline",
    kind: "Access",
    day: 4,
    time: "14:00",
    place: "Screen One",
    price: "Standard ticket prices",
    text: "Full English captions including sound description. Step-free to every seat in the first five rows.",
    film: "snowline",
  },
  {
    id: "open-screen",
    title: "Open Screen: Harbourside shorts",
    kind: "Shorts",
    day: 6,
    time: "19:00",
    place: "Screen Two",
    price: "£5 on the door",
    text: "Ten short films by local makers, five minutes each, chosen from 112 entries. The filmmakers are in the room and the bar is open after.",
  },
];

/* ------------------------------------------------------------------ membership */

export type Tier = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  pitch: string;
  perks: string[];
};

export const tiers: Tier[] = [
  {
    id: "friend",
    name: "Friend",
    monthly: 5,
    yearly: 50,
    pitch: "For one or two films a month.",
    perks: [
      "£9 tickets for you, every screening",
      "10% off at the bar",
      "The printed programme, posted monthly",
    ],
  },
  {
    id: "regular",
    name: "Regular",
    monthly: 11,
    yearly: 110,
    pitch: "For the people we see every week.",
    perks: [
      "Everything in Friend",
      "One free ticket every month",
      "Book 48 hours before everyone else",
      "Bring a friend at the member price",
    ],
  },
  {
    id: "patron",
    name: "Patron",
    monthly: 35,
    yearly: 350,
    pitch: "For the people who keep the lights on.",
    perks: [
      "Everything in Regular",
      "Two free tickets every month",
      "Your name on a seat plate in Screen One",
      "The annual Patrons' screening, chosen by you",
    ],
  },
];

export const membership = {
  title: "Join Aperture",
  intro:
    "Membership pays for the 35mm prints, the projection team and the films nobody else will book. In return, your tickets get cheaper, your seat gets better and your name goes on the list.",
  under26:
    "Under 26? Friend membership is free. Bring ID to the box office or join below and we will check it at your first visit.",
  faq: [
    {
      q: "When does my membership start?",
      a: "The moment you join. You will get a member number by email straight away; your card follows in the post within a week, but the number works at the box office and online immediately.",
    },
    {
      q: "Can I use member prices for other people?",
      a: "Friend prices are for you. Regular and Patron members can buy one extra ticket at the member price for every screening.",
    },
    {
      q: "Do free tickets roll over?",
      a: "Up to three months. After that they expire, so use them on something you would never have risked.",
    },
    {
      q: "How do I cancel?",
      a: "Email hello@aperture.example or tell the box office. Monthly memberships stop at the end of the month; yearly ones are refunded for the unused months.",
    },
  ],
};

/* ------------------------------------------------------------------ hire */

export type Space = {
  id: string;
  name: string;
  capacity: string;
  guests: number;
  image: Img;
  text: string;
  rates: { slot: string; price: number }[];
};

export const spaces: Space[] = [
  {
    id: "screen-one",
    name: "Screen One",
    capacity: "140 seated",
    guests: 140,
    image: images.auditorium,
    text: "Our big room: an 11-metre screen, 35mm and 70mm projection, 4K digital and 7.1 surround. Premieres, company screenings and conferences that would rather be in a cinema than a hotel.",
    rates: [
      { slot: "Morning (09:00–12:30)", price: 650 },
      { slot: "Afternoon (13:00–16:30)", price: 750 },
      { slot: "Full day (09:00–16:30)", price: 1250 },
    ],
  },
  {
    id: "screen-two",
    name: "Screen Two",
    capacity: "70 seated",
    guests: 70,
    image: images.screenTwo,
    text: "The original 1938 balcony, rebuilt as a raked seventy-seat room. Birthday screenings, crew and cast viewings, and the best room in town for a talk with slides.",
    rates: [
      { slot: "Morning (09:00–12:30)", price: 320 },
      { slot: "Afternoon (13:00–16:30)", price: 380 },
      { slot: "Full day (09:00–16:30)", price: 620 },
    ],
  },
  {
    id: "the-bar",
    name: "The Bar",
    capacity: "80 standing, 40 seated",
    guests: 80,
    image: images.bar,
    text: "A long zinc bar, a projector on the back wall and a kitchen that does very good toasties. Hire it before a screening, after one, or on its own for a party.",
    rates: [
      { slot: "Daytime (10:00–17:00)", price: 280 },
      { slot: "Evening (18:00–23:30)", price: 450 },
      { slot: "Full day (10:00–23:30)", price: 650 },
    ],
  },
];

export const hire = {
  title: "Hire the cinema",
  intro:
    "Both screens and the bar are available by day, and often by night. Every booking includes a projectionist, an usher, and as many tech checks as you need beforehand.",
  includes: [
    "A projectionist for the whole booking",
    "DCP, 35mm, laptop or Blu-ray playback",
    "Two radio mics and a lectern",
    "Front-of-house staff and ushers",
    "Your title on the outside listings board",
  ],
  uses: [
    {
      title: "Premieres and cast screenings",
      text: "Red carpet optional; a proper print check is not. We host around thirty premieres a year for independent producers.",
    },
    {
      title: "Company screenings and talks",
      text: "A morning keynote in Screen One, lunch in the bar, a film in the afternoon. Delegates remember a cinema.",
    },
    {
      title: "Birthdays and private screenings",
      text: "Screen Two with your film of choice, popcorn in the room, cake in the bar. From £320.",
    },
  ],
  catering: [
    { item: "Popcorn and soft drinks, per guest", price: 4.5 },
    { item: "Bar toasties and sides, per guest", price: 9 },
    { item: "Drinks reception, two glasses each", price: 12 },
  ],
};

/* ------------------------------------------------------------------ visit */

export const hours = [
  {
    label: "Box office",
    value:
      "From 30 minutes before the first screening until the last one starts",
  },
  {
    label: "The Bar",
    value: "Mon–Thu 12:00–23:00 · Fri–Sat 12:00–01:00 · Sun 12:00–22:30",
  },
  { label: "Box office phone", value: "Daily 11:00–20:00" },
];

export const visit = {
  title: "Visit Aperture",
  intro:
    "We are halfway down Tanner Street, under the vertical sign, opposite the old customs house. Doors open thirty minutes before every screening.",
  directions: [
    {
      mode: "On foot",
      text: "Six minutes from Harbourside station: turn left out of the main entrance and follow the quay until the customs house.",
    },
    {
      mode: "By bus",
      text: "Routes 12 and 47 stop at Tanner Street, right outside. The night bus N12 runs every twenty minutes after the late shows.",
    },
    {
      mode: "By bike",
      text: "Twenty covered stands in the yard behind the bar, entrance on Rope Walk.",
    },
    {
      mode: "By car",
      text: "We have no car park. The Quayside multi-storey is four minutes away and charges £4 after 18:00.",
    },
  ],
  access: [
    "Step-free entrance on Tanner Street with an automatic door",
    "Lift to every floor, including the Screen Two balcony",
    "Two wheelchair spaces in each screen, bookable online",
    "Infrared hearing loop in both screens; headsets from the box office",
    "Captioned and audio-described screenings every week",
    "Relaxed screenings on the first Sunday of each month",
    "Accessible toilets on the ground floor and first floor",
    "Free carer tickets: just add a note when you book",
  ],
  faq: [
    {
      q: "Can I bring food and drink into the screens?",
      a: "Anything from our bar, yes, including beer and wine in proper glasses. We ask you not to bring hot food from outside; it is a small room and everybody can smell it.",
    },
    {
      q: "How long are the adverts and trailers?",
      a: "There are no adverts. We show two trailers, chosen by the programme team, and the film starts no more than six minutes after the listed time.",
    },
    {
      q: "What if I am late?",
      a: "Ushers will seat you quietly with a torch. After the film has run for twenty minutes, we may hold you at the back until a natural break.",
    },
    {
      q: "Can I swap or refund my tickets?",
      a: "Swap to another screening up to an hour before your film, for free. Refunds are given as credit for twelve months, or in full if we cancel.",
    },
    {
      q: "Are films subtitled?",
      a: "Every film not in English is shown with English subtitles. Captioned screenings of English-language films are marked in the listings.",
    },
  ],
};

/* ------------------------------------------------------------------ about */

export const about = {
  title: "A cinema since 1938",
  intro:
    "Aperture is a two-screen independent cinema owned by 2,140 members and run by nineteen staff. We show new independent and international films, repertory seasons on 35mm and 70mm, and as many Q&As as we can talk directors into.",
  story: [
    "The building opened in 1938 as the Tanner Street Electric, a single 900-seat auditorium for the dock workers of Harbourside. It survived the war, lost its balcony to a fire in 1961 and closed in 1979, when the docks did.",
    "For twenty-four years it was a carpet warehouse. In 2003 a group of film society members raised £410,000 in community shares to buy it, and spent the next three years rebuilding the auditorium themselves at weekends.",
    "Today the old stalls are Screen One, the rebuilt balcony is Screen Two, and the carpet showroom is the bar. We still keep the 1938 brass letters for the listings board.",
  ],
  timeline: [
    { year: "1938", text: "The Tanner Street Electric opens with 900 seats." },
    { year: "1961", text: "A projection-room fire destroys the balcony." },
    { year: "1979", text: "The cinema closes with the docks." },
    {
      year: "2003",
      text: "Members buy the building with a community share offer.",
    },
    { year: "2006", text: "Reopens as Aperture, with one screen and a bar." },
    { year: "2014", text: "Screen Two opens in the rebuilt balcony." },
    { year: "2025", text: "Our restored 70mm projector runs its first print." },
  ],
  principles: [
    {
      title: "No adverts",
      text: "Two trailers, chosen by us, and then the film. You paid to see a film.",
    },
    {
      title: "Lights down on time",
      text: "The listed time is when the trailers start. The film is never more than six minutes behind.",
    },
    {
      title: "Film where it matters",
      text: "We run 35mm and 70mm when a print exists and the film was made for it.",
    },
    {
      title: "Fair prices",
      text: "No booking fees, £8 Tuesdays and free Friend membership for anyone under 26.",
    },
  ],
  team: [
    {
      name: "Priya Lal",
      role: "Head of programme",
      text: "Books every film we show and introduces most of the Night Shift late shows.",
    },
    {
      name: "Owen Barr",
      role: "Programmer",
      text: "Documentaries, shorts and the Open Screen night. Former film society secretary.",
    },
    {
      name: "Jonah Weller",
      role: "Chief projectionist",
      text: "Twenty-two years in the box. Restored the 70mm projector over three winters.",
    },
    {
      name: "Marta Kowal",
      role: "General manager",
      text: "Runs the building, the budget and the venue hire diary.",
    },
    {
      name: "Dele Adeyemi",
      role: "Bar & kitchen",
      text: "Responsible for the toasties, the beer list and the hot chocolate at late shows.",
    },
    {
      name: "Ruth Ingram",
      role: "Learning & access",
      text: "Schools programme, relaxed screenings and our captioning work.",
    },
  ],
};

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Pictures worth going out for",
  intro:
    "Aperture is a two-screen independent cinema on Tanner Street: new films from everywhere, restorations on 35mm and 70mm, and a bar that stays open after the credits.",
  featured: "the-harbour-wall",
  manifesto: "No adverts. Two trailers. Lights down on time.",
  manifestoText:
    "We have been saying it since 2006 and we still mean it. You came to see a film; we will show it to you, properly projected, at the time we said.",
  seatTitle: "Pick the seat, not just the time",
  seatText:
    "Every seat in both screens is on the map when you book. Tap one and we will show you how much of your view the screen will fill from there, because row F in Screen One is not the same film as row A.",
  membershipTitle: "£9 tickets, every film, all year",
  hireTitle: "Your film on our screen",
  hireText:
    "Premieres, company mornings, birthday screenings in the balcony. Both screens and the bar are for hire, with a projectionist included.",
};
