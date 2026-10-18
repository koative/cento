import heroSrc from "./assets/hero.jpg";
import venueSrc from "./assets/venue.jpg";
import audienceSrc from "./assets/audience.jpg";
import workshopSrc from "./assets/workshop.jpg";
import partySrc from "./assets/party.jpg";
import dinnerSrc from "./assets/dinner.jpg";
import studioSrc from "./assets/studio.jpg";
import ed2022 from "./assets/edition-2022.jpg";
import ed2023 from "./assets/edition-2023.jpg";
import ed2024 from "./assets/edition-2024.jpg";
import ed2025 from "./assets/edition-2025.jpg";
import ed2026 from "./assets/edition-2026.jpg";
import marenHolt from "./assets/maren-holt.jpg";
import gideonAshby from "./assets/gideon-ashby.jpg";
import leilaFarahani from "./assets/leila-farahani.jpg";
import tomasArce from "./assets/tomas-arce.jpg";
import kaiDelmont from "./assets/kai-delmont.jpg";
import rubenAchterberg from "./assets/ruben-achterberg.jpg";
import adaezeNwosu from "./assets/adaeze-nwosu.jpg";
import yukiMoreau from "./assets/yuki-moreau.jpg";
import finnLarkspur from "./assets/finn-larkspur.jpg";
import oleBrandvik from "./assets/ole-brandvik.jpg";
import noorHaddad from "./assets/noor-haddad.jpg";
import claraWeiss from "./assets/clara-weiss.jpg";
import inesVandersteen from "./assets/ines-vandersteen.jpg";
import jorisMulder from "./assets/joris-mulder.jpg";
import theoBrask from "./assets/theo-brask.jpg";
import lotteKramer from "./assets/lotte-kramer.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Prism",
  edition: "Prism 2027",
  theme: "Split light",
  sector: "Design conference",
  tagline: "Three days in a tram depot full of light, taking design apart.",
  dates: "12–14 May 2027",
  city: "Rotterdam",
  venue: "Lichthal",
  address: "Lichthal, Remisestraat 11, 3024 Rotterdam, Netherlands",
  email: "hello@prism.example",
  partnersEmail: "partners@prism.example",
  phone: "+1 555 0118 270",
  phoneHref: "tel:+15550118270",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/speakers", label: "Speakers" },
  { to: "/agenda", label: "Agenda" },
  { to: "/tickets", label: "Tickets" },
  { to: "/venue", label: "Venue" },
  { to: "/editions", label: "Past editions" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Programme",
    links: [
      { to: "/speakers", label: "Speakers" },
      { to: "/agenda", label: "Agenda builder" },
      { to: "/editions", label: "Past editions" },
      { to: "/editions/2026", label: "Prism 2026 recap" },
    ],
  },
  {
    title: "Attend",
    links: [
      { to: "/tickets", label: "Tickets" },
      { to: "/register", label: "Register" },
      { to: "/venue", label: "Venue & travel" },
    ],
  },
  {
    title: "Prism",
    links: [
      { to: "/about", label: "About & FAQ" },
      { to: "/sponsors", label: "Partner with us" },
    ],
  },
];

export const newsletter = {
  title: "Programme letters",
  text: "One email when a speaker is announced, one when the agenda goes live, one when early-bird ends. Nothing else.",
};

/* ----------------------------------------------------------------- images */

export type Img = { src: string; alt: string; w: number; h: number };

export const images: Record<
  "hero" | "venue" | "audience" | "workshop" | "party" | "dinner" | "studio",
  Img
> = {
  hero: {
    src: heroSrc,
    alt: "A speaker on a dark stage in front of a huge screen showing interface sketches, the audience in silhouette",
    w: 1800,
    h: 1286,
  },
  venue: {
    src: venueSrc,
    alt: "A full hall under a steel roof with tall arched windows, the audience facing a projection screen",
    w: 1800,
    h: 1200,
  },
  audience: {
    src: audienceSrc,
    alt: "Rows of attendees in the dark under a ceiling of perforated acoustic panels",
    w: 1800,
    h: 1200,
  },
  workshop: {
    src: workshopSrc,
    alt: "Five people in armchairs talking in a bright room with sticky notes on the wall",
    w: 1800,
    h: 1199,
  },
  party: {
    src: partySrc,
    alt: "Confetti falling through blue and pink stage light over a dancing crowd",
    w: 1800,
    h: 1201,
  },
  dinner: {
    src: dinnerSrc,
    alt: "A long shared table crowded with people talking over dinner",
    w: 1800,
    h: 1199,
  },
  studio: {
    src: studioSrc,
    alt: "Hands resting on notebooks along a wooden workshop table",
    w: 1800,
    h: 1199,
  },
};

/* ----------------------------------------------------------------- tracks */

export type TrackId = "type" | "interface" | "systems" | "space" | "practice";

export type Track = { id: TrackId; name: string; short: string; text: string };

/** Ordered like the spectrum: red → violet. Colours live in styles.css as --t-<id>. */
export const tracks: Track[] = [
  {
    id: "type",
    name: "Type & Image",
    short: "Type",
    text: "Letters, posters, pictures and the people who draw them by hand and by axis.",
  },
  {
    id: "interface",
    name: "Interface",
    short: "Interface",
    text: "Screens that behave: motion, prototyping, and software that admits what it doesn't know.",
  },
  {
    id: "systems",
    name: "Systems",
    short: "Systems",
    text: "Tokens, libraries, languages and governance — design that has to survive a reorg.",
  },
  {
    id: "space",
    name: "Space & Object",
    short: "Space",
    text: "Wayfinding, exhibitions and things you can hold, repair and walk around.",
  },
  {
    id: "practice",
    name: "Practice",
    short: "Practice",
    text: "Pricing, studios, careers and the business of staying good at this for decades.",
  },
];

export const trackById = Object.fromEntries(
  tracks.map((t) => [t.id, t]),
) as Record<TrackId, Track>;

/* ------------------------------------------------------------------ rooms */

export type RoomId =
  "main" | "glass" | "loft-a" | "loft-b" | "courtyard" | "foyer" | "city";

export type Room = {
  id: RoomId;
  name: string;
  capacity: string;
  text: string;
  access: string;
};

export const rooms: Room[] = [
  {
    id: "main",
    name: "Main Hall",
    capacity: "900 seats",
    text: "The old tram shed under fourteen arched windows. Every talk here is captioned live and recorded.",
    access:
      "Step-free from the foyer. Wheelchair spaces in rows A and M, hearing loop in the first ten rows.",
  },
  {
    id: "glass",
    name: "Glass Room",
    capacity: "220 seats",
    text: "The former paint shop with a glass roof. Second stage for talks and conversations.",
    access:
      "Step-free. Hearing loop throughout. Gets bright at midday — sunglasses aren't rude here.",
  },
  {
    id: "loft-a",
    name: "Workshop Loft A",
    capacity: "30 places",
    text: "Mezzanine studio with drawing tables, a riso printer and a long pin wall.",
    access: "Lift from the foyer. Height-adjustable tables on request.",
  },
  {
    id: "loft-b",
    name: "Workshop Loft B",
    capacity: "30 places",
    text: "Mezzanine studio set up for laptops: big screens, power at every seat.",
    access: "Lift from the foyer. Height-adjustable tables on request.",
  },
  {
    id: "courtyard",
    name: "Courtyard",
    capacity: "Open",
    text: "Coffee bar, lunch counters and the bike racks. Covered if it rains, and it will.",
    access:
      "Level paving throughout. Seating with backs and arms along the east wall.",
  },
  {
    id: "foyer",
    name: "Foyer",
    capacity: "Open",
    text: "Registration, cloakroom, the conference bookshop and the quiet room behind the blue door.",
    access:
      "Main entrance is step-free with automatic doors. Accessible toilets on both sides.",
  },
  {
    id: "city",
    name: "Off-site",
    capacity: "Varies",
    text: "Walks and studio visits start at the courtyard gate with a volunteer in a Prism jacket.",
    access:
      "Each walk lists its distance and terrain; tell us what you need and we'll arrange transport.",
  },
];

export const roomById = Object.fromEntries(
  rooms.map((r) => [r.id, r]),
) as Record<RoomId, Room>;

/* --------------------------------------------------------------- speakers */

export type Speaker = {
  slug: string;
  name: string;
  role: string;
  org: string;
  city: string;
  track: TrackId;
  photo: string;
  short: string;
  bio: string[];
  quote: string;
  topics: string[];
  pastEdition?: number;
};

export const speakers: Speaker[] = [
  {
    slug: "maren-holt",
    name: "Maren Holt",
    role: "Type designer",
    org: "Holt Letters",
    city: "Bergen",
    track: "type",
    photo: marenHolt,
    short:
      "Draws variable typefaces for newspapers and road signs, and argues that both are the same job.",
    bio: [
      "Maren Holt runs Holt Letters, a three-person foundry in a former net loft in Bergen. Her families set two Nordic dailies, a regional transit network and, briefly, a chocolate bar she would rather not discuss.",
      "Before the foundry she spent six years drawing Cyrillic and Greek extensions for other people's typefaces, which she calls the best apprenticeship nobody applies for. She teaches type design one week a year and spends the rest of it saying no to logotypes.",
    ],
    quote:
      "A typeface is a slow argument. You make it once and lose it a million times a day.",
    topics: ["Variable fonts", "Newspaper typography", "Multi-script design"],
    pastEdition: 2024,
  },
  {
    slug: "gideon-ashby",
    name: "Gideon Ashby",
    role: "Wayfinding designer",
    org: "Formerly head of design, Nordline Rail",
    city: "Leeds",
    track: "space",
    photo: gideonAshby,
    short:
      "Forty years of arrows, platforms and the signs nobody notices until they're wrong.",
    bio: [
      "Gideon Ashby designed the signage for 212 railway stations, three airports and one maze. He led the design team at Nordline Rail for eighteen years and retired, unconvincingly, in 2025.",
      "He keeps an archive of every sign he got wrong, photographed in situ, and has agreed to show some of it on the Main Hall screen. This is our closing keynote and we are a little nervous.",
    ],
    quote: "If somebody has to read your sign twice, you've made them late.",
    topics: ["Wayfinding", "Public signage", "Design leadership"],
  },
  {
    slug: "leila-farahani",
    name: "Leila Farahani",
    role: "Interface designer",
    org: "Studio Quarto",
    city: "Lisbon",
    track: "interface",
    photo: leilaFarahani,
    short:
      "Designs interfaces for medical and legal software that tell you plainly how sure they are.",
    bio: [
      "Leila Farahani is an independent interface designer who works almost exclusively on software where a wrong answer has consequences: triage tools, legal research, insurance claims.",
      "Her practice, Studio Quarto, is two people and a cat. She writes a quarterly letter on uncertainty in interfaces that is read, by her own count, by four hundred people and one regulator.",
    ],
    quote: "The most honest thing an interface can say is ‘probably’.",
    topics: ["Uncertainty", "Critical software", "Interaction design"],
  },
  {
    slug: "tomas-arce",
    name: "Tomás Arce",
    role: "Design engineer",
    org: "Fieldnote Maps",
    city: "Valencia",
    track: "interface",
    photo: tomasArce,
    short:
      "Prototypes with real data instead of lorem ipsum, and thinks you should too.",
    bio: [
      "Tomás Arce builds the prototypes at Fieldnote, an outdoor mapping app used by hikers who would rather not be rescued. He works in code from the first day and in Figma only when someone insists.",
      "He started in cartography, drawing contour lines by hand for a regional survey office, and still carries a pencil sharpener on a lanyard.",
    ],
    quote:
      "Your prototype looks perfect because it's lying to you about the data.",
    topics: ["Prototyping", "Design engineering", "Maps"],
  },
  {
    slug: "kai-delmont",
    name: "Kai Delmont",
    role: "Creative director",
    org: "Delmont & Ray",
    city: "Antwerp",
    track: "practice",
    photo: kaiDelmont,
    short:
      "Runs a twelve-person brand studio and is unusually open about what it charges.",
    bio: [
      "Kai Delmont co-founded Delmont & Ray in 2014 with a borrowed printer and one client who paid in bicycle parts. The studio now works with cultural institutions and a few brave manufacturers.",
      "Kai publishes the studio's annual numbers — revenue, day rates, what went wrong — on a single printed sheet. People pin it up in other studios. Some of them are competitors.",
    ],
    quote: "Brand is what's left when the budget runs out.",
    topics: ["Studio business", "Brand identity", "Pricing"],
    pastEdition: 2023,
  },
  {
    slug: "ruben-achterberg",
    name: "Ruben Achterberg",
    role: "Exhibition designer",
    org: "Achterberg Ruimte",
    city: "Rotterdam",
    track: "space",
    photo: rubenAchterberg,
    short: "Builds museum rooms that you can read like a book, in any order.",
    bio: [
      "Ruben Achterberg designs exhibitions for natural history and maritime museums across the Low Countries. His rooms are known for wall texts short enough to finish and objects hung at a child's eye height.",
      "He grew up four streets from Lichthal and remembers the trams going in for repair. He will lead the Rotterdam Zuid wayfinding walk on workshop day.",
    ],
    quote:
      "A visitor gives you about nine seconds per object. Spend them well.",
    topics: ["Exhibition design", "Museum graphics", "Spatial narrative"],
  },
  {
    slug: "adaeze-nwosu",
    name: "Adaeze Nwosu",
    role: "Design systems lead",
    org: "Halcyon Public Media",
    city: "London",
    track: "systems",
    photo: adaezeNwosu,
    short:
      "Keeps one design system working across 41 languages, 9 scripts and a very old set-top box.",
    bio: [
      "Adaeze Nwosu leads the design system at Halcyon Public Media, a broadcaster whose apps run on phones, televisions, radios with screens and a set-top box that still has a following.",
      "She started the system with a spreadsheet and a team of two. It now has a governance board, a public changelog and a rule that every component is tested in Amharic first.",
    ],
    quote:
      "A system is a set of promises. Only make the ones you can keep in Amharic.",
    topics: ["Design systems", "Localisation", "Governance"],
  },
  {
    slug: "yuki-moreau",
    name: "Yuki Moreau",
    role: "Motion designer",
    org: "Independent",
    city: "Montréal",
    track: "interface",
    photo: yukiMoreau,
    short:
      "Treats easing curves as a matter of character, and can prove it with a stopwatch.",
    bio: [
      "Yuki Moreau animates interfaces for operating systems, banking apps and one well-known weather service. Before that, eleven years of title sequences for documentaries.",
      "Her workshop on motion with intent sold out in 2026 within a day, so we gave it a bigger room. Bring a laptop and a stubborn opinion about bounce.",
    ],
    quote: "Easing is a point of view. Linear motion has none.",
    topics: ["Motion design", "Interaction", "Prototyping"],
    pastEdition: 2026,
  },
  {
    slug: "finn-larkspur",
    name: "Finn Larkspur",
    role: "Poster artist & printer",
    org: "Larkspur Press",
    city: "Glasgow",
    track: "type",
    photo: finnLarkspur,
    short:
      "Has printed eleven thousand gig posters in two colours on a risograph called Doris.",
    bio: [
      "Finn Larkspur runs Larkspur Press from a railway arch in Glasgow, printing posters for venues, unions and a surprising number of choirs. Everything is two colours because Doris has two drums.",
      "Finn's posters are in three museum collections and on a great many pub toilet doors, which Finn considers the more important exhibition.",
    ],
    quote:
      "Two colours is not a limitation. It's a decision someone made for you, and it was right.",
    topics: ["Risograph", "Poster design", "Lettering"],
  },
  {
    slug: "ole-brandvik",
    name: "Ole Brandvik",
    role: "Industrial designer",
    org: "Brandvik Objects",
    city: "Oslo",
    track: "space",
    photo: oleBrandvik,
    short:
      "Designs furniture and kitchen tools that ship with a repair manual and spare screws.",
    bio: [
      "Ole Brandvik's studio designs chairs, lamps and kitchen tools for small manufacturers in Norway and Portugal. Every product ships with a printed repair manual and an exploded drawing.",
      "He spent his twenties fixing outboard motors, which he says taught him more about design than school did.",
    ],
    quote: "If it can't be opened, it was never really yours.",
    topics: ["Product design", "Repairability", "Manufacturing"],
  },
  {
    slug: "noor-haddad",
    name: "Noor Haddad",
    role: "Accessibility researcher",
    org: "Open Access Lab",
    city: "Amman",
    track: "systems",
    photo: noorHaddad,
    short:
      "Researches how people with low vision actually use the interfaces we test on ourselves.",
    bio: [
      "Noor Haddad runs research at Open Access Lab, a nonprofit that studies how disabled people use public services online. She has sat beside more than six hundred participants and taken notes by hand at every session.",
      "Her team's contrast and target-size findings are now in three national design standards. She would like them in yours.",
    ],
    quote:
      "Accessible isn't a feature you add. It's the version of the product that works.",
    topics: ["Accessibility", "User research", "Public services"],
  },
  {
    slug: "clara-weiss",
    name: "Clara Weiss",
    role: "Studio founder",
    org: "Weiss Atelier",
    city: "Vienna",
    track: "practice",
    photo: claraWeiss,
    short:
      "Has kept her studio at exactly eight people for fifteen years, on purpose.",
    bio: [
      "Clara Weiss founded Weiss Atelier in 2012 and has refused to grow it past eight people ever since. The studio designs books, identities and the occasional opera poster.",
      "She mentors young studio founders through a programme she started with four other Viennese studios, and runs the pricing workshop at Prism for the second year running.",
    ],
    quote:
      "Growth is a choice. So is staying small, and nobody tells you that.",
    topics: ["Running a studio", "Pricing", "Book design"],
    pastEdition: 2025,
  },
];

export const speakerBySlug = Object.fromEntries(
  speakers.map((s) => [s.slug, s]),
) as Record<string, Speaker>;

/* ----------------------------------------------------------------- agenda */

export const days = [
  {
    label: "Wednesday",
    short: "Wed",
    date: "12 May",
    iso: "2027-05-12",
    theme: "Workshop day",
  },
  {
    label: "Thursday",
    short: "Thu",
    date: "13 May",
    iso: "2027-05-13",
    theme: "Talks, day one",
  },
  {
    label: "Friday",
    short: "Fri",
    date: "14 May",
    iso: "2027-05-14",
    theme: "Talks, day two",
  },
] as const;

export type Format =
  "Talk" | "Keynote" | "Workshop" | "Conversation" | "Walk" | "Programme";

export type Session = {
  id: string;
  day: 0 | 1 | 2;
  start: string;
  end: string;
  room: RoomId;
  /** null = shared moments everyone attends (doors, lunch, parties); not addable. */
  track: TrackId | null;
  format: Format;
  title: string;
  speakers: string[];
  text: string;
  /** Workshops and walks: seats per session; they need the Full Spectrum pass. */
  seats?: number;
};

export const sessions: Session[] = [
  // ---------------------------------------------------------------- Wednesday
  {
    id: "w-doors",
    day: 0,
    start: "08:30",
    end: "09:30",
    room: "foyer",
    track: null,
    format: "Programme",
    title: "Registration & coffee",
    speakers: [],
    text: "Pick up your badge and lanyard in the foyer. The coffee bar opens at 08:15 for the impatient.",
  },
  {
    id: "w-variable-axis",
    day: 0,
    start: "09:30",
    end: "12:30",
    room: "loft-a",
    track: "type",
    format: "Workshop",
    title: "Drawing a variable axis",
    speakers: ["maren-holt"],
    text: "Draw two masters of a single letter by hand, digitise them and interpolate between them. You leave with a working weight axis and a new respect for the letter g.",
    seats: 24,
  },
  {
    id: "w-real-data",
    day: 0,
    start: "09:30",
    end: "12:30",
    room: "loft-b",
    track: "interface",
    format: "Workshop",
    title: "Prototyping with real data",
    speakers: ["tomas-arce"],
    text: "Swap the placeholder content in your prototype for a messy real dataset and watch the design break in instructive ways. Bring a laptop and a prototype you're proud of.",
    seats: 28,
  },
  {
    id: "w-token-audit",
    day: 0,
    start: "09:30",
    end: "12:30",
    room: "glass",
    track: "systems",
    format: "Workshop",
    title: "A token audit in one morning",
    speakers: ["adaeze-nwosu"],
    text: "A structured method for auditing colour, type and spacing tokens across products, using Halcyon's real (anonymised) spreadsheets.",
    seats: 30,
  },
  {
    id: "w-walk",
    day: 0,
    start: "10:00",
    end: "12:30",
    room: "city",
    track: "space",
    format: "Walk",
    title: "Wayfinding walk: Rotterdam Zuid",
    speakers: ["ruben-achterberg"],
    text: "Four kilometres of signs, from the tram stop to the river. Ruben stops at every bad one. Comfortable shoes; it's mostly flat.",
    seats: 20,
  },
  {
    id: "w-lunch",
    day: 0,
    start: "12:30",
    end: "13:30",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Lunch in the courtyard",
    speakers: [],
    text: "Three counters, all vegetarian, one fully vegan. Tell us about allergies when you register.",
  },
  {
    id: "w-riso",
    day: 0,
    start: "14:00",
    end: "17:00",
    room: "loft-a",
    track: "type",
    format: "Workshop",
    title: "Two-colour posters in an afternoon",
    speakers: ["finn-larkspur"],
    text: "Design and print a two-colour risograph poster on Doris, who is coming over from Glasgow in a van. Everyone leaves with an edition of twenty.",
    seats: 18,
  },
  {
    id: "w-motion",
    day: 0,
    start: "14:00",
    end: "17:00",
    room: "loft-b",
    track: "interface",
    format: "Workshop",
    title: "Motion with intent",
    speakers: ["yuki-moreau"],
    text: "Retime the transitions of a real app with nothing but a stopwatch and an easing editor, then defend every curve to the person next to you.",
    seats: 30,
  },
  {
    id: "w-pricing",
    day: 0,
    start: "14:00",
    end: "17:00",
    room: "glass",
    track: "practice",
    format: "Workshop",
    title: "Pricing the work",
    speakers: ["clara-weiss", "kai-delmont"],
    text: "Build a day rate from your actual costs, then practise saying it out loud. Clara and Kai bring their own studio numbers; you can keep yours private.",
    seats: 30,
  },
  {
    id: "w-repair",
    day: 0,
    start: "14:00",
    end: "16:30",
    room: "city",
    track: "space",
    format: "Walk",
    title: "Studio visit: a repair workshop",
    speakers: ["ole-brandvik"],
    text: "A short tram ride to a Zuid repair café where Ole takes apart three of his own products and two of somebody else's.",
    seats: 16,
  },
  {
    id: "w-opening",
    day: 0,
    start: "19:00",
    end: "22:00",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Opening night on the courtyard",
    speakers: [],
    text: "Drinks, a harbour band and the first look at this year's printed programme. Open to every pass holder.",
  },
  // ---------------------------------------------------------------- Thursday
  {
    id: "t-doors",
    day: 1,
    start: "08:30",
    end: "09:30",
    room: "foyer",
    track: null,
    format: "Programme",
    title: "Doors & coffee",
    speakers: [],
    text: "Badges for anyone who missed Wednesday, plus the bookshop's first restock.",
  },
  {
    id: "t-opening",
    day: 1,
    start: "09:30",
    end: "10:00",
    room: "main",
    track: null,
    format: "Programme",
    title: "Opening: Split light",
    speakers: [],
    text: "Ines and Joris on why this year's theme is about taking design apart to see what it's made of.",
  },
  {
    id: "t-holt",
    day: 1,
    start: "10:00",
    end: "10:40",
    room: "main",
    track: "type",
    format: "Talk",
    title: "A typeface is a slow argument",
    speakers: ["maren-holt"],
    text: "What a newspaper face and a road sign have in common, told through ten years of complaints from readers and drivers.",
  },
  {
    id: "t-haddad",
    day: 1,
    start: "10:00",
    end: "10:40",
    room: "glass",
    track: "systems",
    format: "Talk",
    title: "The version that works",
    speakers: ["noor-haddad"],
    text: "Findings from six hundred sessions with low-vision users, and the three rules in your design system that are quietly failing them.",
  },
  {
    id: "t-farahani",
    day: 1,
    start: "10:50",
    end: "11:30",
    room: "main",
    track: "interface",
    format: "Talk",
    title: "Interfaces that say ‘probably’",
    speakers: ["leila-farahani"],
    text: "How to design confidence levels, missing data and honest uncertainty into software people make serious decisions with.",
  },
  {
    id: "t-delmont",
    day: 1,
    start: "10:50",
    end: "11:30",
    room: "glass",
    track: "practice",
    format: "Talk",
    title: "Our numbers, on one sheet",
    speakers: ["kai-delmont"],
    text: "Ten years of a studio's revenue, rates and mistakes, printed on one page and walked through line by line.",
  },
  {
    id: "t-break-1",
    day: 1,
    start: "11:30",
    end: "12:00",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Coffee break",
    speakers: [],
    text: "Coffee, pastries and the bookshop signing table.",
  },
  {
    id: "t-achterberg",
    day: 1,
    start: "12:00",
    end: "12:40",
    room: "main",
    track: "space",
    format: "Talk",
    title: "Rooms that read",
    speakers: ["ruben-achterberg"],
    text: "Designing exhibitions that make sense in any order, for visitors who will absolutely ignore your intended route.",
  },
  {
    id: "t-larkspur",
    day: 1,
    start: "12:00",
    end: "12:40",
    room: "glass",
    track: "type",
    format: "Talk",
    title: "Eleven thousand posters, two drums",
    speakers: ["finn-larkspur"],
    text: "A decade of gig posters printed on one risograph, and what two colours teach you about everything else.",
  },
  {
    id: "t-lunch",
    day: 1,
    start: "12:40",
    end: "14:00",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Lunch",
    speakers: [],
    text: "Lunch counters in the courtyard; the quiet room is open behind the blue door.",
  },
  {
    id: "t-nwosu",
    day: 1,
    start: "14:00",
    end: "14:40",
    room: "main",
    track: "systems",
    format: "Talk",
    title: "A system for 41 languages",
    speakers: ["adaeze-nwosu"],
    text: "How a public broadcaster's design system learned to start with its hardest script and its oldest set-top box.",
  },
  {
    id: "t-arce",
    day: 1,
    start: "14:00",
    end: "14:40",
    room: "glass",
    track: "interface",
    format: "Talk",
    title: "Your prototype is lying",
    speakers: ["tomas-arce"],
    text: "Why placeholder content produces confident, wrong designs, and how a mapping team switched to real data from the first sketch.",
  },
  {
    id: "t-craft",
    day: 1,
    start: "14:50",
    end: "15:50",
    room: "main",
    track: "practice",
    format: "Conversation",
    title: "Craft at scale, or not at all",
    speakers: ["adaeze-nwosu", "clara-weiss"],
    text: "A design systems lead at a broadcaster and a studio that won't grow past eight argue about whether craft survives headcount.",
  },
  {
    id: "t-break-2",
    day: 1,
    start: "15:50",
    end: "16:30",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Afternoon break",
    speakers: [],
    text: "Ice cream from the courtyard counter, which is a Prism tradition we cannot afford to stop.",
  },
  {
    id: "t-moreau",
    day: 1,
    start: "16:30",
    end: "17:10",
    room: "main",
    track: "interface",
    format: "Talk",
    title: "Easing is a point of view",
    speakers: ["yuki-moreau"],
    text: "Timing, character and restraint in interface motion, with a live retiming of an app you probably have on your phone.",
  },
  {
    id: "t-brandvik",
    day: 1,
    start: "16:30",
    end: "17:10",
    room: "glass",
    track: "space",
    format: "Talk",
    title: "Objects with a repair manual",
    speakers: ["ole-brandvik"],
    text: "Designing furniture and tools to be opened, mended and handed down — and convincing a factory to print the manual.",
  },
  {
    id: "t-dinner",
    day: 1,
    start: "19:30",
    end: "22:30",
    room: "main",
    track: null,
    format: "Programme",
    title: "Long-table dinner",
    speakers: [],
    text: "One table the length of the Main Hall. Included with the Full Spectrum pass; seats for others while they last.",
  },
  // ---------------------------------------------------------------- Friday
  {
    id: "f-doors",
    day: 2,
    start: "09:00",
    end: "09:30",
    room: "foyer",
    track: null,
    format: "Programme",
    title: "Doors & coffee",
    speakers: [],
    text: "A slower start. Strong coffee.",
  },
  {
    id: "f-weiss",
    day: 2,
    start: "09:30",
    end: "10:10",
    room: "main",
    track: "practice",
    format: "Talk",
    title: "The studio of eight, forever",
    speakers: ["clara-weiss"],
    text: "Fifteen years of refusing to grow: the clients turned down, the rates raised, and the work it made possible.",
  },
  {
    id: "f-farahani",
    day: 2,
    start: "09:30",
    end: "10:10",
    room: "glass",
    track: "interface",
    format: "Conversation",
    title: "Designing for the second opinion",
    speakers: ["leila-farahani", "noor-haddad"],
    text: "Two designers of serious software on research, trust and the screens people read when they're frightened.",
  },
  {
    id: "f-holt-larkspur",
    day: 2,
    start: "10:20",
    end: "11:00",
    room: "main",
    track: "type",
    format: "Conversation",
    title: "Letters by hand, letters by axis",
    speakers: ["maren-holt", "finn-larkspur"],
    text: "A type designer and a poster printer trade their favourite mistakes and one shared hatred of default kerning.",
  },
  {
    id: "f-arce",
    day: 2,
    start: "10:20",
    end: "11:00",
    room: "glass",
    track: "interface",
    format: "Talk",
    title: "Maps that know where you are not",
    speakers: ["tomas-arce"],
    text: "Designing for missing signal, stale tiles and hikers who trust a blue dot more than the mountain.",
  },
  {
    id: "f-break",
    day: 2,
    start: "11:00",
    end: "11:30",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Coffee break",
    speakers: [],
    text: "Last chance for the bookshop before the queue for the closing keynote.",
  },
  {
    id: "f-nwosu",
    day: 2,
    start: "11:30",
    end: "12:10",
    room: "glass",
    track: "systems",
    format: "Talk",
    title: "Governance without a committee",
    speakers: ["adaeze-nwosu"],
    text: "The changelog, the review rota and the one rule that kept a system honest through three reorganisations.",
  },
  {
    id: "f-delmont",
    day: 2,
    start: "11:30",
    end: "12:10",
    room: "main",
    track: "practice",
    format: "Talk",
    title: "Brand is what's left",
    speakers: ["kai-delmont"],
    text: "Identity work for clients with no money, from a studio that accepted bicycle parts as payment exactly once.",
  },
  {
    id: "f-lunch",
    day: 2,
    start: "12:10",
    end: "13:30",
    room: "courtyard",
    track: null,
    format: "Programme",
    title: "Lunch",
    speakers: [],
    text: "Courtyard lunch and the Prism 2028 venue reveal on the courtyard screen at 13:00.",
  },
  {
    id: "f-haddad",
    day: 2,
    start: "13:30",
    end: "14:10",
    room: "main",
    track: "systems",
    format: "Talk",
    title: "Contrast is policy",
    speakers: ["noor-haddad"],
    text: "How research on contrast and target size became national standards, and how to get your findings into one.",
  },
  {
    id: "f-achterberg",
    day: 2,
    start: "13:30",
    end: "14:10",
    room: "glass",
    track: "space",
    format: "Talk",
    title: "Nine seconds per object",
    speakers: ["ruben-achterberg"],
    text: "Writing and placing museum labels for the time people actually give them.",
  },
  {
    id: "f-brandvik",
    day: 2,
    start: "14:20",
    end: "15:00",
    room: "glass",
    track: "space",
    format: "Conversation",
    title: "Made to be opened",
    speakers: ["ole-brandvik", "tomas-arce"],
    text: "An industrial designer and a design engineer on whether software can be repairable, and what an exploded drawing of an app looks like.",
  },
  {
    id: "f-moreau",
    day: 2,
    start: "14:20",
    end: "15:00",
    room: "main",
    track: "interface",
    format: "Talk",
    title: "Title sequences, then buttons",
    speakers: ["yuki-moreau"],
    text: "What eleven years of documentary titles taught a motion designer about a loading spinner.",
  },
  {
    id: "f-ashby",
    day: 2,
    start: "15:30",
    end: "16:30",
    room: "main",
    track: "space",
    format: "Keynote",
    title: "Forty years of arrows",
    speakers: ["gideon-ashby"],
    text: "The closing keynote: every sign Gideon got wrong in four decades of railway wayfinding, photographed where it still hangs.",
  },
  {
    id: "f-close",
    day: 2,
    start: "16:30",
    end: "17:00",
    room: "main",
    track: null,
    format: "Programme",
    title: "Closing & thanks",
    speakers: [],
    text: "The volunteers come on stage. Bring your loudest applause.",
  },
  {
    id: "f-party",
    day: 2,
    start: "20:00",
    end: "01:00",
    room: "main",
    track: null,
    format: "Programme",
    title: "Afterlight party",
    speakers: [],
    text: "The Main Hall turns into a dance floor. DJs from three Rotterdam record shops; every pass holder is in.",
  },
];

export const sessionsBySpeaker = (slug: string) =>
  sessions.filter((s) => s.speakers.includes(slug));

/* ---------------------------------------------------------------- tickets */

export type PassId = "full" | "conference" | "day" | "student" | "online";

export type Pass = {
  id: PassId;
  name: string;
  price: number;
  earlyPrice: number;
  text: string;
  includes: string[];
  note?: string;
  featured?: boolean;
};

export const tickets = {
  earlyBirdEnds: "31 January 2027",
  teamSize: 5,
  teamDiscount: 0.15,
  currency: "EUR",
};

export const passes: Pass[] = [
  {
    id: "full",
    name: "Full Spectrum",
    price: 890,
    earlyPrice: 760,
    text: "All three days, one workshop or walk of your choice, and the long-table dinner.",
    includes: [
      "Workshop day, Wednesday",
      "Both talk days",
      "One workshop or walk seat",
      "Long-table dinner, Thursday",
      "Opening night & Afterlight party",
      "Recordings for a year",
    ],
    featured: true,
  },
  {
    id: "conference",
    name: "Conference",
    price: 640,
    earlyPrice: 540,
    text: "Both talk days in the Main Hall and Glass Room, plus both parties.",
    includes: [
      "Both talk days",
      "Opening night & Afterlight party",
      "Lunch and coffee all day",
      "Recordings for a year",
    ],
  },
  {
    id: "day",
    name: "Day pass",
    price: 340,
    earlyPrice: 290,
    text: "Thursday or Friday — choose the day when you register.",
    includes: [
      "One talk day",
      "Lunch and coffee",
      "That evening's party",
      "Recordings of your day",
    ],
  },
  {
    id: "student",
    name: "Student",
    price: 160,
    earlyPrice: 140,
    text: "The Conference pass for full-time students. 120 available.",
    includes: ["Both talk days", "Both parties", "Recordings for a year"],
    note: "Bring a valid student card to registration.",
  },
  {
    id: "online",
    name: "Online",
    price: 90,
    earlyPrice: 90,
    text: "Live stream of the Main Hall with captions, and every recording afterwards.",
    includes: [
      "Main Hall live stream",
      "Glass Room recordings within 48 hours",
      "Recordings for a year",
    ],
  },
];

export const ticketNotes = [
  {
    title: "Transfers",
    text: "Can't come? Transfer your pass to a colleague for free until 5 May 2027 from the link in your confirmation email.",
  },
  {
    title: "Refunds",
    text: "Full refund until 1 March 2027, 50% until 12 April 2027. After that, transfers only.",
  },
  {
    title: "Invoices",
    text: "Every order gets a VAT invoice in your company's name. Prices include 21% Dutch VAT.",
  },
  {
    title: "Scholarships",
    text: "Forty free Conference passes go to designers who couldn't otherwise attend. Applications open in January.",
  },
];

/* ---------------------------------------------------------------- editions */

export type Edition = {
  year: number;
  title: string;
  dates: string;
  venue: string;
  attendees: number;
  speakerCount: number;
  image: Img;
  summary: string;
  recap: string[];
  highlights: { title: string; speaker: string; note: string }[];
  quote: { text: string; by: string };
};

export const editions: Edition[] = [
  {
    year: 2026,
    title: "Afterimage",
    dates: "6–8 May 2026",
    venue: "Werkspoorhal, in the round",
    attendees: 1100,
    speakerCount: 34,
    image: {
      src: ed2026,
      alt: "A circular stage lit in blue in the middle of a packed, tiered hall",
      w: 1400,
      h: 933,
    },
    summary:
      "Our biggest year, on a stage in the round, about what designs leave behind once you've stopped looking.",
    recap: [
      "Afterimage put the stage in the middle of the Werkspoorhal and the audience on four sides, which meant every speaker had their back to somebody. Most of them turned it into a bit; one of them turned slowly for forty minutes like a lighthouse.",
      "The theme asked what remains of a design after use: the habit an interface leaves, the poster still on the wall ten years later, the sign people navigate by memory. The motion workshop sold out in a day and the bookshop sold out of everything by Friday lunch.",
    ],
    highlights: [
      {
        title: "Easing for people who hate easing",
        speaker: "Yuki Moreau",
        note: "Retimed a banking app live, to applause.",
      },
      {
        title: "The poster stays up",
        speaker: "Hana Whitlock",
        note: "Thirty years of a theatre's posters and what they did to its audience.",
      },
      {
        title: "Afterimage, afterword",
        speaker: "Bas Coenraads",
        note: "A closing keynote delivered entirely without slides.",
      },
    ],
    quote: {
      text: "I came for the talks and stayed for the long table. I now have three new clients and a godchild.",
      by: "Attendee, studio owner from Ghent",
    },
  },
  {
    year: 2025,
    title: "Slow",
    dates: "14–16 May 2025",
    venue: "Graansilo, Katendrecht",
    attendees: 820,
    speakerCount: 28,
    image: {
      src: ed2025,
      alt: "A wide hall bathed in blue light, with a crowd facing a distant stage",
      w: 1400,
      h: 757,
    },
    summary:
      "A year about patience: long projects, slow tools and the design that only works after a decade.",
    recap: [
      "Slow took over a disused grain silo on Katendrecht, all concrete and echo, and asked speakers to talk about the longest thing they'd ever worked on. The answers ranged from a nine-year typeface to a forty-year signage system to a website one studio has rebuilt eleven times.",
      "We also slowed the schedule itself: fewer talks, longer breaks, and a rule that the coffee queue was part of the programme. The feedback form's most common answer was ‘more breaks’, which we have taken personally.",
    ],
    highlights: [
      {
        title: "Nine years, one family",
        speaker: "Teodor Ilić",
        note: "The making of a typeface for Serbian Cyrillic and Latin, sketch by sketch.",
      },
      {
        title: "Staying at eight",
        speaker: "Clara Weiss",
        note: "The first version of the talk she's bringing back, expanded, in 2027.",
      },
      {
        title: "Slow software",
        speaker: "Mira Castellanos",
        note: "On tools that reward patience instead of punishing it.",
      },
    ],
    quote: {
      text: "The only conference where the breaks were the best-designed part. I mean that kindly.",
      by: "Attendee, product designer from Hamburg",
    },
  },
  {
    year: 2024,
    title: "Signal to noise",
    dates: "15–17 May 2024",
    venue: "Odeon Zuid",
    attendees: 640,
    speakerCount: 24,
    image: {
      src: ed2024,
      alt: "A speaker gesturing to a packed, raked auditorium seen from behind",
      w: 1400,
      h: 933,
    },
    summary:
      "Our first year in a real auditorium, about clarity in an industry that produces too much.",
    recap: [
      "Signal to noise moved Prism into an old cinema in Zuid with raked seats and a projector booth our AV team adopted as an office. The talks were about restraint: fewer components, fewer weights, fewer words.",
      "It was the first year we captioned every talk live, the first with a quiet room, and the first time a speaker asked the audience to put their phones in a box. Everyone did.",
    ],
    highlights: [
      {
        title: "Two weights are enough",
        speaker: "Maren Holt",
        note: "A typeface talk that turned into a manifesto.",
      },
      {
        title: "Component graveyard",
        speaker: "Jonah Feld",
        note: "Deleting 70% of a design system and what broke.",
      },
      {
        title: "The phone box",
        speaker: "Rosa Varga",
        note: "Forty minutes of undivided attention, by force.",
      },
    ],
    quote: {
      text: "I deleted half my Figma library on the train home. It was the right call.",
      by: "Attendee, design systems lead from Utrecht",
    },
  },
  {
    year: 2023,
    title: "Grain",
    dates: "10–12 May 2023",
    venue: "Galerie Westzeedijk",
    attendees: 380,
    speakerCount: 18,
    image: {
      src: ed2023,
      alt: "Attendees in a tight circle talking under a wall hung with colourful prints",
      w: 1400,
      h: 933,
    },
    summary:
      "A gallery full of posters and prints, about texture, imperfection and things made by hand.",
    recap: [
      "Grain filled a contemporary gallery with work by every speaker, hung salon-style, and ran talks in the middle of it. People sat on the floor. Nobody complained about the floor.",
      "The year was about the handmade in a digital practice: riso, letterpress, hand-lettering and the imperfect edges that make work feel inhabited. It's the edition people still email us about.",
    ],
    highlights: [
      {
        title: "On the bicycle parts invoice",
        speaker: "Kai Delmont",
        note: "The founding story of a studio, told with the invoice.",
      },
      {
        title: "Letterpress for screens",
        speaker: "Agnes Moll",
        note: "What metal type taught one interface designer about spacing.",
      },
      {
        title: "Print it twice",
        speaker: "Sefa Mensah",
        note: "Misregistration as a design decision.",
      },
    ],
    quote: {
      text: "Sitting on a gallery floor listening to someone talk about ink was the best day of my year.",
      by: "Attendee, illustrator from Lille",
    },
  },
  {
    year: 2022,
    title: "First light",
    dates: "18–19 May 2022",
    venue: "Loods 7, Maashaven",
    attendees: 180,
    speakerCount: 12,
    image: {
      src: ed2022,
      alt: "A small crowd at tables in a white loft with a speaker under two screens",
      w: 1400,
      h: 933,
    },
    summary:
      "Two days, one warehouse loft and 180 people. The edition that started it.",
    recap: [
      "The first Prism was organised in nine weeks by two designers who were tired of conferences that felt like trade shows. It ran in a warehouse loft on the Maashaven with folding chairs, one projector and a coffee machine we borrowed from a friend.",
      "It sold out in eleven days. Twelve speakers, no sponsors on stage, a long lunch, and a closing party that ended when the neighbours asked it to. Most of what Prism still is was decided that week.",
    ],
    highlights: [
      {
        title: "Why we left the agency",
        speaker: "Ines Vandersteen",
        note: "The opening talk that turned into the conference's manifesto.",
      },
      {
        title: "Signs of the river",
        speaker: "Pieter Vos",
        note: "A walking tour of harbour signage, given indoors because of rain.",
      },
      {
        title: "The folding chair problem",
        speaker: "Lien Dekker",
        note: "An unplanned talk about seating, from the audience.",
      },
    ],
    quote: {
      text: "It felt like a party thrown by designers for designers, which is exactly what it was.",
      by: "Attendee, the first ticket we ever sold",
    },
  },
];

/* ---------------------------------------------------------------- sponsors */

export type Package = {
  id: string;
  name: string;
  price: number;
  available: string;
  text: string;
  includes: string[];
};

export const sponsorPackages: Package[] = [
  {
    id: "light",
    name: "Light partner",
    price: 24000,
    available: "2 of 2 available",
    text: "Your name on the year's printed programme and a studio session you host on workshop day.",
    includes: [
      "Hosted workshop or walk on Wednesday",
      "Name on the programme cover and lanyards",
      "8 Full Spectrum passes",
      "A table at the long-table dinner",
      "Booth in the foyer, 4 × 2 m",
    ],
  },
  {
    id: "spectrum",
    name: "Spectrum partner",
    price: 12000,
    available: "3 of 5 available",
    text: "Support one of the five tracks and introduce its first talk each day.",
    includes: [
      "Track introduction, 2 minutes, no pitch",
      "Name on that track's signage",
      "4 Conference passes",
      "Booth in the courtyard, 3 × 2 m",
    ],
  },
  {
    id: "studio",
    name: "Studio host",
    price: 6000,
    available: "6 of 8 available",
    text: "Open your studio for an evening visit during Prism week, or sponsor one of the breaks.",
    includes: [
      "Listed studio visit or named break",
      "2 Conference passes",
      "Logo on the website partners page",
    ],
  },
  {
    id: "scholarship",
    name: "Scholarship patron",
    price: 2500,
    available: "Unlimited",
    text: "Fund five scholarship passes for designers who couldn't otherwise attend. Every euro goes to the pass, travel or the hotel.",
    includes: [
      "Five funded scholarship places",
      "Thanked by name at the opening",
      "1 Conference pass",
    ],
  },
];

export const partners = [
  {
    name: "Ferro Paper",
    tier: "Light partner",
    text: "Paper mill in Twente. Prints the programme on an uncoated stock named after the conference.",
  },
  {
    name: "Nimbus Type",
    tier: "Spectrum · Type & Image",
    text: "Independent type foundry. Hosts the type track introductions.",
  },
  {
    name: "Kade & Co.",
    tier: "Spectrum · Space & Object",
    text: "Furniture makers from Rotterdam who build the stage every year.",
  },
  {
    name: "Brightloom",
    tier: "Spectrum · Interface",
    text: "Prototyping software for teams that ship to hardware.",
  },
  {
    name: "Ostra Inks",
    tier: "Studio host",
    text: "Riso ink supplier. Doris's favourite.",
  },
  {
    name: "Lumo Displays",
    tier: "Studio host",
    text: "Lends the screens in the Glass Room and takes them back very carefully.",
  },
];

export const audience = [
  { label: "Product & interface", share: 34 },
  { label: "Brand & graphic", share: 26 },
  { label: "Type & editorial", share: 14 },
  { label: "Spatial & industrial", share: 12 },
  { label: "Studio leads & founders", share: 14 },
];

/* ------------------------------------------------------------------ venue */

export const venue = {
  intro:
    "Lichthal was built in 1911 to repair Rotterdam's trams. It has fourteen arched windows on the south side, a steel roof that rings when it rains, and, from May 2027, a design conference.",
  history: [
    "The depot closed in 1987 and spent thirty years as a bus garage, a film set and, for one summer, an indoor skate park. It reopened as an events hall in 2024 after a restoration that kept the tram rails in the floor — mind them in heels.",
    "We chose it for the light. Between ten and two on a clear May day the Main Hall needs no stage lighting at all, which is either a coincidence or the best argument for this year's theme.",
  ],
  travel: [
    {
      title: "By train",
      text: "Rotterdam Centraal is 2 hours from Paris, 2½ from Brussels by fast train and 25 minutes from Schiphol airport. From Centraal, tram 20 to Remiseplein takes 14 minutes.",
    },
    {
      title: "By bike",
      text: "Covered racks for 400 bikes in the courtyard. Rental bikes from the station cost about €12 a day; it's an easy 15-minute ride along the river.",
    },
    {
      title: "By car",
      text: "Please don't, unless you need to. Six accessible parking bays at the Remisestraat entrance can be reserved when you register.",
    },
  ],
  hotels: [
    {
      name: "Hotel Kade",
      walk: "6 min walk",
      rate: 149,
      code: "PRISM27",
      text: "Eighty rooms on the water, with breakfast from 06:30 for early workshops.",
    },
    {
      name: "Maas Lodge",
      walk: "12 min walk",
      rate: 118,
      code: "PRISM27",
      text: "Small, quiet rooms in a former harbour office. Speakers stay here.",
    },
    {
      name: "Tramyard Rooms",
      walk: "4 min walk",
      rate: 64,
      code: "PRISMSTUDENT",
      text: "Private rooms and dorms. Student pass holders get the lowest rate.",
    },
  ],
  access: [
    "Step-free throughout, with lifts to the workshop lofts.",
    "Live captions on the Main Hall and Glass Room screens; hearing loops in both.",
    "A quiet room behind the blue door in the foyer, open all three days.",
    "All-gender and accessible toilets on both sides of the hall.",
    "Free companion passes for anyone who needs a personal assistant.",
  ],
};

/* ------------------------------------------------------------------ about */

export const about = {
  intro:
    "Prism is an independent design conference in Rotterdam, run by a team of four and a hundred volunteers. No sponsors on stage, no product launches, no panels of five.",
  story: [
    "Ines Vandersteen and Joris Mulder met at an agency where they made pitch decks for other people's conferences. In 2022 they left, borrowed a warehouse loft on the Maashaven and invited twelve designers they admired to talk about their work honestly. A hundred and eighty people came.",
    "Five editions later Prism is bigger and the rules are the same. Speakers are paid, and paid the same. Every talk is captioned. Partners support the event but never speak from the stage. And the programme is built around five tracks, because design is one discipline seen through many surfaces — which is, more or less, what a prism does.",
  ],
  principles: [
    {
      title: "Everyone is paid the same",
      text: "Every speaker gets the same fee, the same hotel and the same travel budget, keynote or not.",
    },
    {
      title: "No pitches from the stage",
      text: "Partners keep the lights on. They introduce tracks; they don't sell from the stage.",
    },
    {
      title: "Half the stage, half the time",
      text: "At least half our speakers are women or non-binary, every year since the first.",
    },
    {
      title: "Built to be accessible",
      text: "Captions, quiet room, step-free venue, companion passes. Not extras: the baseline.",
    },
  ],
  team: [
    {
      name: "Ines Vandersteen",
      role: "Co-founder, programme",
      photo: inesVandersteen,
      text: "Chooses the speakers and the theme, then spends a year talking to them.",
    },
    {
      name: "Joris Mulder",
      role: "Co-founder, production",
      photo: jorisMulder,
      text: "Venue, stage, sound and the 400-metre cable run nobody else wants to think about.",
    },
    {
      name: "Theo Brask",
      role: "Partnerships",
      photo: theoBrask,
      text: "Finds the companies that fund Prism and keeps them off the stage.",
    },
    {
      name: "Lotte Kramer",
      role: "Community & access",
      photo: lotteKramer,
      text: "Scholarships, volunteers, captions and the quiet room.",
    },
  ],
  conduct:
    "Prism is for everyone who works in or around design. Harassment of any kind isn't tolerated, on site or online. Our code of conduct team wears orange lanyards and can be reached any time during the event at +1 555 0118 271.",
};

export const faqs = [
  {
    q: "Will talks be recorded?",
    a: "Every Main Hall and Glass Room session is recorded and captioned. Pass holders get the recordings for a year; workshops and walks are not recorded.",
  },
  {
    q: "Do I need a Full Spectrum pass for a workshop?",
    a: "Yes. Workshops and walks are part of the Full Spectrum pass, which includes one seat. Pick yours in the agenda builder and confirm it when you register.",
  },
  {
    q: "Can I switch between rooms during talks?",
    a: "Of course — that's what the agenda builder is for. Talks in the two rooms start together, so you'll never walk into the middle of one.",
  },
  {
    q: "Is there a student discount?",
    a: "The Student pass is the full Conference pass at €140 early-bird. Bring a valid student card to registration.",
  },
  {
    q: "Can I get a visa invitation letter?",
    a: "Yes. Register first, then reply to your confirmation email with your passport name and number, and we'll send a signed letter within three working days.",
  },
  {
    q: "What's the food like?",
    a: "Vegetarian throughout, with a fully vegan counter. Tell us about allergies when you register and we'll label your lunch.",
  },
  {
    q: "Is Prism family-friendly?",
    a: "Children under 12 come free with a parent on talk days, and there's a parents' room next to the quiet room.",
  },
];

/* -------------------------------------------------------------- home copy */

export const home = {
  lede: "Twenty-two talks and conversations, six workshops and two walks across five tracks — from type design to wayfinding — in a restored 1911 tram depot on the Maas.",
  themeTitle: "Split light",
  themeText: [
    "A prism takes something that looks simple and shows you what it's made of. That's the brief we gave every speaker for 2027: take one piece of work apart in front of the room.",
    "Maren Holt splits a letter into its axes. Gideon Ashby splits forty years of signs into the ones that worked and the ones that didn't. Clara Weiss splits a studio's year into its invoices. Five tracks, one discipline, seen from five sides.",
  ],
  closeTitle: "See you under the arches",
  closeText:
    "Early-bird prices end 31 January 2027. The Full Spectrum pass sold out three weeks before Prism 2026.",
};
