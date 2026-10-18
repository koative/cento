import wall from "./assets/wall.jpg";
import leather from "./assets/leather.jpg";
import armchair from "./assets/armchair.jpg";
import rooms from "./assets/rooms.jpg";
import windowImg from "./assets/window.jpg";
import stairs from "./assets/stairs.jpg";

export const images = {
  wall,
  leather,
  armchair,
  rooms,
  window: windowImg,
  stairs,
};

export const brand = {
  name: "Index",
  sector: "Independent bookstore",
  tagline: "Three rooms of books, chosen by people who read them.",
  email: "hello@index.example",
  phone: "+1 555 0143",
  phoneHref: "tel:+15550143",
  address: "14 Quarry Lane, Halden",
  founded: 1987,
  announcement:
    "Free bike delivery in Halden over $35 · Special orders usually in 2–3 days",
};

export const nav = [
  { to: "/books", label: "Catalogue" },
  { to: "/staff-picks", label: "Staff picks" },
  { to: "/events", label: "Events" },
  { to: "/book-club", label: "Book club" },
  { to: "/about", label: "The shop" },
];

export const footerColumns = [
  {
    title: "Browse",
    links: [
      { to: "/books", label: "The catalogue" },
      { to: "/staff-picks", label: "Staff picks" },
      { to: "/books/the-salt-orchard", label: "This month's club read" },
      { to: "/cart", label: "Your bag" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Gather",
    links: [
      { to: "/events", label: "Events & readings" },
      { to: "/book-club", label: "The Index Club" },
      { to: "/events/ada-hart-in-conversation", label: "Next author evening" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/about", label: "Our story & rooms" },
      { to: "/", label: "Home" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Bluesky", href: "https://bsky.app/" },
];

/* ───────────── Booksellers ───────────── */

export type Bookseller = {
  id: string;
  name: string;
  role: string;
  room: string;
  reads: string;
  bio: string;
};

export const booksellers: Bookseller[] = [
  {
    id: "hollis",
    name: "Hollis Grant",
    role: "Owner since 2009",
    room: "Room One · Fiction & translation",
    reads: "Long novels, short winters, anything translated from Portuguese.",
    bio: "Hollis started on Saturdays at sixteen, sweeping the stairs for book tokens, and bought the shop from its founder twenty years later. Still writes every shelf card by hand.",
  },
  {
    id: "priya",
    name: "Priya Raman",
    role: "Poetry & essays buyer",
    room: "Room Two · Poetry, essays, art",
    reads:
      "Slim collections, notebooks of other people, essays that argue with themselves.",
    bio: "Priya runs the poetry shelf as if it were a small press: twenty titles at a time, each one argued for. She also hosts the second-Tuesday open mic.",
  },
  {
    id: "dot",
    name: "Dot Fairley",
    role: "Events & local history",
    room: "Room Three · History & nature",
    reads:
      "Field guides, canal histories, letters, anything with a fold-out map.",
    bio: "Dot books the authors, sets out the folding chairs and knows which floorboard creaks during a reading. Thirty years in the Halden archive before that.",
  },
  {
    id: "wen",
    name: "Wen Ashby",
    role: "Children's room",
    room: "Under the stairs · Children's",
    reads:
      "Picture books that adults steal, chapter books for reluctant readers.",
    bio: "Wen reads aloud at Saturday story hour and keeps a list of every child who asked for a book we didn't have, then gets it in.",
  },
];

/* ───────────── Books ───────────── */

export type FormatId = "paperback" | "hardback" | "signed";
export type Format = {
  id: FormatId;
  label: string;
  price: number;
  stock: number;
};
export type Motif =
  | "window"
  | "rings"
  | "bands"
  | "sun"
  | "field"
  | "dots"
  | "arch"
  | "wave"
  | "initial";
export type Cover = { bg: string; ink: string; accent: string; motif: Motif };
export type Section =
  "Fiction" | "Essays" | "Poetry" | "History" | "Nature" | "Children's";

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  translator?: string;
  section: Section;
  formats: Format[];
  published: string; // YYYY-MM
  pages: number;
  publisher: string;
  shelf: string;
  size: string;
  cover: Cover;
  blurb: string[];
  firstLine: string;
  tracings: string[];
  pick?: { by: string; note: string };
  featured: number; // lower = nearer the front table
};

export const sections: Section[] = [
  "Fiction",
  "Essays",
  "Poetry",
  "History",
  "Nature",
  "Children's",
];

export const sectionRoom: Record<Section, string> = {
  Fiction: "Room One",
  Essays: "Room Two",
  Poetry: "Room Two",
  History: "Room Three",
  Nature: "Room Three",
  "Children's": "Under the stairs",
};

export const formatLabels: Record<FormatId, string> = {
  paperback: "Paperback",
  hardback: "Hardback",
  signed: "Signed hardback",
};

export const books: Book[] = [
  {
    slug: "the-salt-orchard",
    title: "The Salt Orchard",
    author: "Ines Varga",
    section: "Fiction",
    formats: [
      { id: "hardback", label: "Hardback", price: 28, stock: 9 },
      { id: "paperback", label: "Paperback", price: 18, stock: 14 },
      { id: "signed", label: "Signed hardback", price: 32, stock: 3 },
    ],
    published: "2026-09",
    pages: 384,
    publisher: "Marram Books",
    shelf: "FIC VAR",
    size: "15.6 × 23.4 cm",
    cover: { bg: "#7a2e2a", ink: "#f3e9d2", accent: "#e0a25a", motif: "rings" },
    blurb: [
      "Three sisters inherit an apple orchard on a headland where the sea wind leaves salt on every leaf. One wants to sell, one wants to stay, and one has already started grafting trees that should not survive there.",
      "Varga writes about land and family with the patience of someone who has pruned a tree in February. A novel that takes its time and then, in its last forty pages, takes your breath.",
    ],
    firstLine:
      "The year the sea came into the lower field, our mother stopped counting the trees and started naming them.",
    tracings: [
      "Orchards — Fiction",
      "Sisters — Fiction",
      "Coastal towns — Fiction",
    ],
    pick: {
      by: "hollis",
      note: "I read it in two sittings and then made everyone in the shop read the chapter about the frost. Our October club book for a reason.",
    },
    featured: 1,
  },
  {
    slug: "small-weathers",
    title: "A Field Guide to Small Weathers",
    author: "Oren Hale",
    section: "Nature",
    formats: [
      { id: "hardback", label: "Hardback", price: 30, stock: 6 },
      { id: "paperback", label: "Paperback", price: 19, stock: 11 },
    ],
    published: "2026-08",
    pages: 256,
    publisher: "Lowfield Press",
    shelf: "NAT HAL",
    size: "13.5 × 21.6 cm",
    cover: { bg: "#9fae8c", ink: "#1f3328", accent: "#f3e9d2", motif: "wave" },
    blurb: [
      "Fog that sits in one valley and not the next. The warm pocket behind a garden wall. The wind that only blows down one street. Hale spent four years recording the weather of places smaller than a forecast can see.",
      "Part almanac, part meditation, with hand-drawn diagrams of every microclimate he found within a mile of his front door.",
    ],
    firstLine:
      "There is a fog that lives in the dip by the bus shelter, and it has never once been forecast.",
    tracings: [
      "Microclimatology — Popular works",
      "Weather — Observations",
      "Walking — Essays",
    ],
    pick: {
      by: "dot",
      note: "The chapter on the warm wall is the best thing I have read about a garden in years. Buy two, you will want to lend one.",
    },
    featured: 2,
  },
  {
    slug: "almost-somewhere",
    title: "Almost, Somewhere",
    author: "Iris Cole",
    section: "Fiction",
    formats: [
      { id: "paperback", label: "Paperback", price: 17, stock: 18 },
      { id: "hardback", label: "Hardback", price: 26, stock: 4 },
    ],
    published: "2025-04",
    pages: 292,
    publisher: "Juniper & Vane",
    shelf: "FIC COL",
    size: "12.9 × 19.8 cm",
    cover: {
      bg: "#d9a497",
      ink: "#3b1f22",
      accent: "#7a2e2a",
      motif: "window",
    },
    blurb: [
      "Two strangers, a cancelled train and a town neither of them meant to visit. Over one long weekend they try on the lives they might have had, and find out which ones still fit.",
      "Our best-selling paperback two years running, mostly because Hollis will not stop handing it to people.",
    ],
    firstLine:
      "The announcement said the 18:12 would not be continuing, which was also true of Nell.",
    tracings: [
      "Strangers — Fiction",
      "Railway travel — Fiction",
      "Second chances — Fiction",
    ],
    featured: 6,
  },
  {
    slug: "the-attention-year",
    title: "The Attention Year",
    subtitle: "Essays on looking closer",
    author: "Ada Hart",
    section: "Essays",
    formats: [
      { id: "hardback", label: "Hardback", price: 24, stock: 7 },
      { id: "signed", label: "Signed hardback", price: 28, stock: 5 },
    ],
    published: "2026-10",
    pages: 208,
    publisher: "Sixpenny Editions",
    shelf: "ESS HAR",
    size: "13.5 × 20.0 cm",
    cover: { bg: "#22324a", ink: "#ece2c6", accent: "#e8d48b", motif: "dots" },
    blurb: [
      "For a year Ada Hart set herself one small thing to notice each week: the geometry of a pavement, the handwriting on market signs, the way a library goes quiet at four o'clock.",
      "Fifty-two short essays that add up to a case for attention as a daily practice, and against the idea that you have to go anywhere to see something new.",
    ],
    firstLine:
      "In the first week I looked at puddles, which is to say I looked at the sky from underneath.",
    tracings: [
      "Attention — Essays",
      "Everyday life — Essays",
      "Cities — Essays",
    ],
    pick: {
      by: "priya",
      note: "One essay a night, like a vitamin. Ada reads here on 6 November and signed every copy we have.",
    },
    featured: 3,
  },
  {
    slug: "hands-at-work",
    title: "Hands at Work",
    subtitle: "Conversations with makers",
    author: "Leo Mercer",
    section: "Essays",
    formats: [
      { id: "hardback", label: "Hardback", price: 34, stock: 5 },
      { id: "paperback", label: "Paperback", price: 22, stock: 8 },
    ],
    published: "2025-11",
    pages: 320,
    publisher: "Lowfield Press",
    shelf: "ART MER",
    size: "17.0 × 24.0 cm",
    cover: { bg: "#c8962e", ink: "#2a1d16", accent: "#f3e9d2", motif: "arch" },
    blurb: [
      "A potter, a sign-writer, a bookbinder, a wheelwright and nineteen others talk about how they learned, what their hands know that they cannot explain, and what they would tell an apprentice.",
      "Illustrated with Mercer's own pencil studies of each workshop.",
    ],
    firstLine:
      "The bookbinder would not talk until the glue was set, and the glue took forty minutes.",
    tracings: [
      "Craftsmanship — Interviews",
      "Artisans — Interviews",
      "Handicraft — Philosophy",
    ],
    featured: 9,
  },
  {
    slug: "lamps-for-ninety-coasts",
    title: "Lamps for Ninety Coasts",
    author: "Nell Aster",
    section: "Poetry",
    formats: [{ id: "paperback", label: "Paperback", price: 15, stock: 10 }],
    published: "2026-06",
    pages: 96,
    publisher: "Marram Books",
    shelf: "POE AST",
    size: "13.0 × 19.8 cm",
    cover: { bg: "#ece2c6", ink: "#22324a", accent: "#b8432a", motif: "sun" },
    blurb: [
      "Ninety short poems, one for each lighthouse Nell Aster visited on a slow circuit of the coast. Some are four lines long. One is a list of keepers' names. All of them are about keeping a light on for someone you will never meet.",
    ],
    firstLine:
      "Somebody climbed these stairs at dusk / for a hundred years / so that I could be bored on a ferry.",
    tracings: ["Lighthouses — Poetry", "Coasts — Poetry"],
    pick: {
      by: "priya",
      note: "The best first collection on the shelf this year. Read the keepers' poem out loud, ideally to someone else.",
    },
    featured: 4,
  },
  {
    slug: "ledger-of-the-lost-canal",
    title: "Ledger of the Lost Canal",
    subtitle: "A history of the Halden Cut",
    author: "Ruth Calder",
    section: "History",
    formats: [
      { id: "hardback", label: "Hardback", price: 32, stock: 6 },
      { id: "paperback", label: "Paperback", price: 21, stock: 9 },
    ],
    published: "2024-03",
    pages: 412,
    publisher: "Quarry Lane Press",
    shelf: "HIS CAL",
    size: "15.6 × 23.4 cm",
    cover: { bg: "#2f5d5a", ink: "#f3e9d2", accent: "#e0a25a", motif: "bands" },
    blurb: [
      "For sixty years a canal ran through the middle of Halden, and now almost nobody knows where. Ruth Calder found the toll-keeper's ledgers in a solicitor's attic and rebuilt the life of the Cut barge by barge.",
      "With fold-out maps, so you can walk the old towpath, which now runs straight past our front door.",
    ],
    firstLine:
      "Tuesday the fourth: two barges of slate, one of apples, and a man who would not give his name.",
    tracings: [
      "Canals — History",
      "Halden — History",
      "Inland navigation — Records",
    ],
    pick: {
      by: "dot",
      note: "Local history that reads like a mystery. The fold-out map is how I found the old lock under the car park.",
    },
    featured: 8,
  },
  {
    slug: "otto-and-the-lantern-library",
    title: "Otto and the Lantern Library",
    author: "Bea Moreno",
    section: "Children's",
    formats: [
      { id: "hardback", label: "Hardback", price: 16, stock: 12 },
      { id: "paperback", label: "Paperback", price: 9, stock: 20 },
    ],
    published: "2026-09",
    pages: 40,
    publisher: "Juniper & Vane",
    shelf: "CHI MOR",
    size: "25.0 × 25.0 cm",
    cover: {
      bg: "#e8d48b",
      ink: "#22324a",
      accent: "#d9692f",
      motif: "window",
    },
    blurb: [
      "Every night after closing, the books in Otto's town library light up from inside, and only Otto knows. When the library is threatened with closure, he has to find a way to show everybody else.",
      "For ages four to seven, and for anyone who has ever been in a library after dark.",
    ],
    firstLine:
      "Otto was the last one out of the library every evening, because Otto was very slow at choosing.",
    tracings: [
      "Libraries — Juvenile fiction",
      "Light — Juvenile fiction",
      "Picture books",
    ],
    pick: {
      by: "wen",
      note: "We read this at story hour and three children asked if our shop lights up at night. (It does, a bit.)",
    },
    featured: 5,
  },
  {
    slug: "the-house-at-kesra-bay",
    title: "The House at Kesra Bay",
    author: "Lúcia Teixeira",
    translator: "Daniel Rook",
    section: "Fiction",
    formats: [
      { id: "paperback", label: "Paperback", price: 19, stock: 7 },
      { id: "hardback", label: "Hardback", price: 27, stock: 3 },
    ],
    published: "2025-09",
    pages: 336,
    publisher: "Sixpenny Editions",
    shelf: "FIC TEI",
    size: "13.5 × 21.6 cm",
    cover: { bg: "#4b2c3f", ink: "#f0d9c4", accent: "#d9a497", motif: "arch" },
    blurb: [
      "A summer house on a bay, opened once a year by a family who no longer like each other very much. Over four decades of summers, Teixeira shows the house changing hands, rooms and loyalties.",
      "Translated from the Portuguese with real grace. The book Hollis has pressed on more customers than any other in the last two years.",
    ],
    firstLine:
      "The key was always under the third tile from the gate, and the gate was always stiff.",
    tracings: [
      "Families — Fiction",
      "Summer homes — Fiction",
      "Portuguese fiction — Translations into English",
    ],
    pick: {
      by: "hollis",
      note: "If you liked big quiet family novels and haven't read this, I am almost cross with you. Start it on a Friday.",
    },
    featured: 7,
  },
  {
    slug: "underfoot",
    title: "Underfoot",
    subtitle: "A year with moss",
    author: "June Adebayo",
    section: "Nature",
    formats: [{ id: "hardback", label: "Hardback", price: 25, stock: 8 }],
    published: "2026-03",
    pages: 224,
    publisher: "Marram Books",
    shelf: "NAT ADE",
    size: "14.0 × 21.6 cm",
    cover: { bg: "#4f5d3a", ink: "#ece2c6", accent: "#c8d18f", motif: "field" },
    blurb: [
      "June Adebayo got down on her knees with a hand lens and stayed there for a year. The result is a book about the smallest forests on earth, growing on roofs, walls and the north side of everything.",
    ],
    firstLine:
      "Put your face close to a wall in November and you will find it is already spring for somebody.",
    tracings: ["Mosses — Popular works", "Natural history — Essays"],
    featured: 11,
  },
  {
    slug: "rooms-we-keep",
    title: "Rooms We Keep",
    author: "Noah Field",
    section: "Essays",
    formats: [
      { id: "paperback", label: "Paperback", price: 18, stock: 9 },
      { id: "hardback", label: "Hardback", price: 29, stock: 2 },
    ],
    published: "2024-10",
    pages: 248,
    publisher: "Juniper & Vane",
    shelf: "ESS FIE",
    size: "13.5 × 21.6 cm",
    cover: {
      bg: "#5b6770",
      ink: "#f3e9d2",
      accent: "#e8d48b",
      motif: "window",
    },
    blurb: [
      "A grandmother's kitchen, a bedsit with one window, a hospital family room, a shed. Noah Field writes about the rooms that held him and the light that came through them at different times of year.",
    ],
    firstLine:
      "The kitchen faced east, so breakfast was always lit and supper was always lamp.",
    tracings: [
      "Dwellings — Essays",
      "Memory — Essays",
      "Light in architecture",
    ],
    featured: 12,
  },
  {
    slug: "weather-for-two-voices",
    title: "Weather for Two Voices",
    author: "Elias North",
    section: "Poetry",
    formats: [
      { id: "paperback", label: "Paperback", price: 14, stock: 6 },
      { id: "signed", label: "Signed paperback", price: 18, stock: 4 },
    ],
    published: "2025-02",
    pages: 80,
    publisher: "Quarry Lane Press",
    shelf: "POE NOR",
    size: "13.0 × 19.8 cm",
    cover: {
      bg: "#b8432a",
      ink: "#fbf3e2",
      accent: "#2a1d16",
      motif: "initial",
    },
    blurb: [
      "Poems written to be read aloud by two people, one taking the left column and one the right. Elias North wrote them with his sister over a winter of letters, and they work best across a kitchen table.",
    ],
    firstLine: "You say rain. / I say it is only the gutter remembering.",
    tracings: ["Dialogue poetry", "Siblings — Poetry"],
    featured: 13,
  },
  {
    slug: "the-night-printers",
    title: "The Night Printers",
    author: "Harriet Voss",
    section: "History",
    formats: [
      { id: "hardback", label: "Hardback", price: 30, stock: 4 },
      { id: "paperback", label: "Paperback", price: 20, stock: 10 },
    ],
    published: "2025-06",
    pages: 368,
    publisher: "Lowfield Press",
    shelf: "HIS VOS",
    size: "15.6 × 23.4 cm",
    cover: { bg: "#2a1d16", ink: "#ece2c6", accent: "#d9692f", motif: "bands" },
    blurb: [
      "Before the morning paper there was the night shift: compositors, ink boys, proofreaders who read every word backwards. Harriet Voss tells the story of one regional press over a century of nights.",
    ],
    firstLine:
      "At eleven the building changed hands, from the people who wrote the news to the people who made it real.",
    tracings: [
      "Printing — History",
      "Newspapers — History",
      "Night work — Social aspects",
    ],
    pick: {
      by: "dot",
      note: "As someone who spent years in an archive, I wept at the proofreaders' chapter. Ink under the fingernails on every page.",
    },
    featured: 10,
  },
  {
    slug: "pip-counts-the-rain",
    title: "Pip Counts the Rain",
    author: "Sol Alvarez",
    section: "Children's",
    formats: [{ id: "hardback", label: "Hardback", price: 14, stock: 15 }],
    published: "2026-05",
    pages: 32,
    publisher: "Juniper & Vane",
    shelf: "CHI ALV",
    size: "22.0 × 26.0 cm",
    cover: { bg: "#2f5d5a", ink: "#fbf3e2", accent: "#e8d48b", motif: "dots" },
    blurb: [
      "Pip cannot go out to play, so Pip decides to count the rain instead: one drop on the window, two on the cat, three in the gutter… A counting book for ages two to five with a very satisfying puddle at the end.",
    ],
    firstLine: "One drop on the window. Pip saw it first.",
    tracings: ["Counting — Juvenile literature", "Rain — Juvenile fiction"],
    featured: 14,
  },
  {
    slug: "tidewater-hymn",
    title: "Tidewater Hymn",
    author: "Rose Bennett",
    section: "Fiction",
    formats: [
      { id: "hardback", label: "Hardback", price: 27, stock: 5 },
      { id: "paperback", label: "Paperback", price: 18, stock: 12 },
    ],
    published: "2026-07",
    pages: 304,
    publisher: "Marram Books",
    shelf: "FIC BEN",
    size: "15.3 × 23.4 cm",
    cover: { bg: "#22324a", ink: "#f0d9c4", accent: "#9fae8c", motif: "wave" },
    blurb: [
      "A choir in a drowned village sings once a year from boats above the old church. This year the choirmaster has gone missing, and her daughter has six weeks to learn every part.",
    ],
    firstLine:
      "Low tide gave us the steeple for two hours, and we were expected to be grateful.",
    tracings: [
      "Choirs (Music) — Fiction",
      "Mothers and daughters — Fiction",
      "Flooding — Fiction",
    ],
    featured: 15,
  },
  {
    slug: "thirty-trees-on-quarry-lane",
    title: "Thirty Trees on Quarry Lane",
    author: "Marcus Penhale",
    section: "Nature",
    formats: [
      { id: "paperback", label: "Paperback", price: 16, stock: 22 },
      { id: "signed", label: "Signed paperback", price: 18, stock: 8 },
    ],
    published: "2025-10",
    pages: 176,
    publisher: "Quarry Lane Press",
    shelf: "NAT PEN",
    size: "14.0 × 20.0 cm",
    cover: { bg: "#ece2c6", ink: "#4f5d3a", accent: "#b8432a", motif: "field" },
    blurb: [
      "Our street has thirty trees and Marcus Penhale, who lives four doors down, wrote a short life of each of them: who planted it, what it has survived and what lives in it now.",
      "Our most local book, printed two streets away. Signed copies only from us.",
    ],
    firstLine:
      "The lime outside number nine is older than the houses, and behaves like it.",
    tracings: ["Street trees — Halden", "Urban ecology — Popular works"],
    featured: 16,
  },
];

export const bookBySlug = (slug: string) => books.find((b) => b.slug === slug);
export const fromPrice = (b: Book) =>
  Math.min(...b.formats.map((f) => f.price));
export const pickBooks = (slugs: string[]) =>
  slugs.map(bookBySlug).filter((b): b is Book => !!b);

/* ───────────── Home ───────────── */

export const home = {
  heading: "A bookshop with three rooms and strong opinions",
  lede: "Since 1987 we have filled a crooked house on Quarry Lane with new books we would press into your hands. Browse the catalogue, order for collection or bike delivery, or come and sit in the green chair.",
  frontTable: [
    "the-salt-orchard",
    "the-attention-year",
    "otto-and-the-lantern-library",
  ],
  newArrivals: [
    "small-weathers",
    "the-attention-year",
    "lamps-for-ninety-coasts",
    "otto-and-the-lantern-library",
    "tidewater-hymn",
    "underfoot",
  ],
  drawer: {
    heading: "Pull out a drawer",
    text: "The shop still keeps its 1987 card catalogue by the till. Every book we stock gets a card, typed and filed by subject. Choose a drawer and leaf through.",
  },
  quote: {
    text: "We don't stock everything. We stock what we'd stay late to talk to you about.",
    by: "Hollis Grant, owner",
  },
  specialOrder: {
    heading: "Anything in print, ordered in",
    text: "Not on our shelves? We order any book in print from our wholesalers, usually in two to three days, at the cover price. Email the title or bring a scrap of paper with it written down.",
  },
};

/* ───────────── Events ───────────── */

export type EventType =
  "Author evening" | "Book club" | "Workshop" | "Children's";
export type ShopEvent = {
  slug: string;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  start: string;
  end: string;
  room: string;
  price: number;
  seats: number;
  taken: number;
  host: string;
  book?: string;
  summary: string;
  body: string[];
};

export const eventTypes: EventType[] = [
  "Author evening",
  "Book club",
  "Workshop",
  "Children's",
];

export const events: ShopEvent[] = [
  {
    slug: "salt-orchard-club",
    title: "The Index Club: The Salt Orchard",
    type: "Book club",
    date: "2026-10-27",
    start: "19:00",
    end: "20:30",
    room: "Room Three",
    price: 0,
    seats: 24,
    taken: 19,
    host: "Hollis Grant",
    book: "the-salt-orchard",
    summary:
      "October's club meeting. Bring your copy, your strongest opinion about the middle sister, and a mug if you like.",
    body: [
      "We meet on the last Tuesday of the month in Room Three, among the history shelves, with tea, apple cake and about twenty readers. Hollis keeps the conversation moving and makes sure the quiet people get the last word.",
      "Club members have a seat held automatically. Everyone else is welcome while chairs last; reserve one below.",
    ],
  },
  {
    slug: "ada-hart-in-conversation",
    title: "Ada Hart in conversation",
    type: "Author evening",
    date: "2026-11-06",
    start: "19:00",
    end: "20:15",
    room: "Room One",
    price: 5,
    seats: 60,
    taken: 41,
    host: "Priya Raman",
    book: "the-attention-year",
    summary:
      "Ada Hart reads from The Attention Year and talks with Priya about noticing, notebooks and the four o'clock library hush.",
    body: [
      "A reading of three essays, a conversation, questions from the floor, then signing at the till. The $5 ticket comes off the price of the book if you buy it on the night.",
      "Room One is step-free from the street. Doors open at 18:30 and the reading starts promptly, because Ada has a train.",
    ],
  },
  {
    slug: "story-hour-lanterns",
    title: "Saturday story hour: lanterns",
    type: "Children's",
    date: "2026-11-14",
    start: "10:30",
    end: "11:15",
    room: "Under the stairs",
    price: 0,
    seats: 20,
    taken: 8,
    host: "Wen Ashby",
    book: "otto-and-the-lantern-library",
    summary:
      "Wen reads Otto and the Lantern Library, then everyone makes a paper lantern to take home. Ages three to seven.",
    body: [
      "Grown-ups stay with their children; there are cushions for small people and two chairs for large ones. Paper, glue and battery tea-lights provided.",
    ],
  },
  {
    slug: "letterpress-bookplates",
    title: "Letterpress bookplates",
    type: "Workshop",
    date: "2026-11-21",
    start: "14:00",
    end: "16:30",
    room: "Room Three",
    price: 35,
    seats: 10,
    taken: 7,
    host: "Quarry Lane Press",
    summary:
      "Set your name in metal type and print twenty-five bookplates on Quarry Lane Press's travelling proofing press.",
    body: [
      "No experience needed. You will learn to set, lock up and print a simple design, and leave with twenty-five bookplates and inky fingers. Aprons provided; wear something you don't mind about.",
      "The fee covers paper, ink and tea. Ten places only, because there is only one press.",
    ],
  },
  {
    slug: "canal-walk-ruth-calder",
    title: "Walking the lost canal with Ruth Calder",
    type: "Author evening",
    date: "2026-12-03",
    start: "18:00",
    end: "19:30",
    room: "Meet at the shop door",
    price: 8,
    seats: 25,
    taken: 12,
    host: "Dot Fairley",
    book: "ledger-of-the-lost-canal",
    summary:
      "A lantern-lit walk along the old route of the Halden Cut with its historian, ending back here for mulled cider and signing.",
    body: [
      "About two miles on pavements, flat apart from one bridge. Bring a torch if you have one; we bring the lanterns.",
      "If it rains heavily, Ruth gives the talk in Room One instead with the original ledgers on the table.",
    ],
  },
  {
    slug: "poetry-open-mic-december",
    title: "Second Tuesday open mic",
    type: "Workshop",
    date: "2026-12-08",
    start: "19:30",
    end: "21:00",
    room: "Room Two",
    price: 0,
    seats: 35,
    taken: 14,
    host: "Priya Raman",
    summary:
      "Five minutes each, your own poems or someone else's. December theme, loosely: lights in windows.",
    body: [
      "Sign up on the night or reserve a reading slot below. Listeners are just as welcome as readers, and somebody always reads Nell Aster's keepers' poem.",
    ],
  },
];

export const eventBySlug = (slug: string) =>
  events.find((e) => e.slug === slug);

/* ───────────── Book club ───────────── */

export const club = {
  heading: "The Index Club",
  lede: "One novel a month, chosen by Hollis, wrapped in brown paper and waiting for you on the first Saturday. Then twenty-odd of us meet on the last Tuesday to argue about it.",
  current: "the-salt-orchard",
  steps: [
    {
      title: "We choose",
      text: "Hollis reads around forty new novels a month and picks the one we will still be talking about in a year.",
    },
    {
      title: "You collect or we post",
      text: "Your parcel is ready on the first Saturday, with a shelf card and a few questions tucked inside.",
    },
    {
      title: "We meet",
      text: "Last Tuesday of the month, 7pm in Room Three. Members have a seat held; tea and cake on us.",
    },
  ],
  plans: [
    { months: 3, label: "3 months", perMonth: 19 },
    { months: 6, label: "6 months", perMonth: 17 },
    { months: 12, label: "12 months", perMonth: 15 },
  ],
  hardbackExtra: 8,
  meetings: [
    { date: "2026-10-27", book: "the-salt-orchard" },
    { date: "2026-11-24", book: "tidewater-hymn" },
    { date: "2026-12-29", book: "the-house-at-kesra-bay" },
  ],
  past: [
    "almost-somewhere",
    "the-house-at-kesra-bay",
    "tidewater-hymn",
    "rooms-we-keep",
  ],
  faq: [
    {
      q: "Can I skip a month?",
      a: "Yes. Tell us by the 20th and we'll hold that month's book back and add a month to the end of your membership.",
    },
    {
      q: "What if I already own the book?",
      a: "Swap it for any novel of the same price or less, on the shelf or ordered in. Just bring the parcel back unopened.",
    },
    {
      q: "Can I give a membership as a gift?",
      a: "Yes. Add it to your bag and leave a note at checkout; we'll send a card to the recipient with the first parcel date.",
    },
    {
      q: "Do I have to come to the meetings?",
      a: "Not at all. About half our members never come and tell us they read the questions in the bath, which also counts.",
    },
  ],
};

/* ───────────── The shop ───────────── */

export const about = {
  heading: "A crooked house full of books",
  lede: "Index opened in 1987 in a former draper's on Quarry Lane, with one room, four shelves and a typewriter for the catalogue cards. It now fills three floors, the stairs and the cupboard under them.",
  story: [
    {
      year: "1987",
      text: "Margaret Ellis opens Index with 1,200 books and a card catalogue bought from the closing county library.",
    },
    {
      year: "1996",
      text: "The upstairs flat becomes Room Two, for poetry and essays. The stairs are never clear again.",
    },
    {
      year: "2009",
      text: "Hollis Grant, a Saturday assistant since 1994, buys the shop when Margaret retires to the coast.",
    },
    {
      year: "2014",
      text: "Room Three opens in the old stockroom, with folding chairs for readings and the first book club.",
    },
    {
      year: "2020",
      text: "Bike delivery begins during the long closure. Dot rides it; she has not stopped.",
    },
    {
      year: "2026",
      text: "Still independent, still typing cards. Around 9,000 titles in stock and about 40 events a year.",
    },
  ],
  rooms: [
    {
      name: "Room One",
      text: "Fiction and translation at street level, the front table of new books and the till where the catalogue lives.",
      image: wall,
      alt: "A full wall of bookshelves in warm lamplight, every shelf packed with spines",
    },
    {
      name: "Room Two",
      text: "Up the first flight: poetry, essays, art and design, and the green armchair nobody is allowed to buy.",
      image: armchair,
      alt: "A patterned armchair piled with books beside crowded shelves in a small room",
    },
    {
      name: "Room Three",
      text: "History, nature and local writing, plus the folding chairs we set out for readings and the club.",
      image: rooms,
      alt: "View through a narrow doorway into further rooms lined with bookshelves",
    },
  ],
  services: [
    {
      title: "Special orders",
      text: "Any book in print, usually in 2–3 days, at cover price. No deposit.",
    },
    {
      title: "School & library accounts",
      text: "Termly invoicing and 10% off for Halden schools, reading groups and libraries.",
    },
    {
      title: "Gift wrapping",
      text: "Brown paper and string, free at the till, with a shelf card if you ask nicely.",
    },
  ],
  access:
    "Room One is step-free from the street, with a ramp at the side door on request. Rooms Two and Three are up a flight of stairs; we will happily bring books down to you.",
};

export const hours = [
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: 9, close: 19 },
  { day: "Wednesday", open: 9, close: 19 },
  { day: "Thursday", open: 9, close: 21 },
  { day: "Friday", open: 9, close: 19 },
  { day: "Saturday", open: 9, close: 19 },
  { day: "Sunday", open: 11, close: 17 },
] as const;

/* ───────────── Checkout ───────────── */

export const checkout = {
  freeDeliveryOver: 35,
  methods: [
    {
      id: "collect",
      label: "Collect from the shop",
      note: "Ready within two hours during opening times",
      price: 0,
    },
    {
      id: "bike",
      label: "Bike delivery in Halden",
      note: "Next day, by Dot. Free over $35",
      price: 4,
    },
    {
      id: "post",
      label: "Tracked post",
      note: "2–4 working days, anywhere in the country",
      price: 6.5,
    },
  ],
  giftWrap: 3,
};
