import crowd from "./assets/crowd.jpg";
import bass from "./assets/bass.jpg";
import pedalboard from "./assets/pedalboard.jpg";
import drumsLive from "./assets/drums-live.jpg";
import drums from "./assets/drums.jpg";
import rehearsal from "./assets/rehearsal.jpg";
import stageFloor from "./assets/stage-floor.jpg";
import soundcheck from "./assets/soundcheck.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Riff",
  tagline: "Loud-quiet rock from a Baltimore basement",
  hometown: "Baltimore, MD",
  email: "hello@riff.example",
  phone: "+1 555 0148 220",
  label: "Parlour Tapes",
};

export const nav = [
  { to: "/tour", label: "Tour" },
  { to: "/music", label: "Music" },
  { to: "/videos", label: "Videos" },
  { to: "/merch", label: "Merch" },
  { to: "/press", label: "Press" },
  { to: "/about", label: "About" },
];

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
  { name: "Bandcamp", href: "https://bandcamp.com/" },
];

export const streaming = [
  { name: "Bandcamp", href: "https://bandcamp.com/" },
  { name: "Spotify", href: "https://open.spotify.com/" },
  { name: "Apple Music", href: "https://music.apple.com/" },
  { name: "YouTube Music", href: "https://music.youtube.com/" },
];

export type Photo = { src: string; alt: string; credit: string };

export const photos = {
  crowd: {
    src: crowd,
    alt: "Hands raised in a packed room, stage lights burning through the haze",
    credit: "Arkady Lifshits, CC0",
  },
  bass: {
    src: bass,
    alt: "A bass player in the dark, headstock lit by a single spot",
    credit: "Nicola Gypsicola, CC0",
  },
  pedalboard: {
    src: pedalboard,
    alt: "Boots on a pedalboard, cables running across a black stage floor",
    credit: "Shixart1985, CC BY 2.0",
  },
  drumsLive: {
    src: drumsLive,
    alt: "A drum kit on stage between songs, cymbals catching the light",
    credit: "Shixart1985, CC BY 2.0",
  },
  drums: {
    src: drums,
    alt: "Close-up of worn tom heads and cymbals in a rehearsal room",
    credit: "Shixart1985, CC BY 2.0",
  },
  rehearsal: {
    src: rehearsal,
    alt: "A low basement rehearsal room with a drum kit, amps and a flag on the wall",
    credit: "Gerold Schneider, CC BY 2.0",
  },
  stageFloor: {
    src: stageFloor,
    alt: "Pedals and tangled cables taped down on a wooden stage",
    credit: "Nenad Stojkovic, CC BY 2.0",
  },
  soundcheck: {
    src: soundcheck,
    alt: "An empty stage at soundcheck: drum kit, mic stands and wedges waiting",
    credit: "Kuba Bożanowski, CC BY 2.0",
  },
} satisfies Record<string, Photo>;

/* ------------------------------------------------------------ music */

export type Motif = "ceiling" | "wire" | "lot" | "rings" | "static" | "dawn";
export type Track = {
  title: string;
  /** full length in seconds */
  length: number;
  bpm: number;
  /** semitone root for the synthesised preview sketch (0 = A) */
  root: number;
  /** optional URL of a real preview file; without it the player synthesises a sketch */
  audio?: string;
};
export type ReleaseKind = "Album" | "EP" | "Single" | "Live";
export type Release = {
  slug: string;
  title: string;
  kind: ReleaseKind;
  date: string;
  catalog: string;
  cover: { motif: Motif; ground: "red" | "ink" | "paper" };
  blurb: string;
  notes: string[];
  recorded: string;
  credits: [string, string][];
  tracks: Track[];
  /** merch ids for physical formats */
  formats: string[];
};

export const releases: Release[] = [
  {
    slug: "low-ceiling",
    title: "Low Ceiling",
    kind: "Album",
    date: "2026-09-11",
    catalog: "PT-041",
    cover: { motif: "ceiling", ground: "red" },
    blurb:
      "Ten songs written under a seven-foot basement ceiling and recorded live to tape in four days. The loudest record we've made, and somehow the quietest.",
    notes: [
      "We wrote Low Ceiling in the room under Dario's grandmother's laundromat, the same room the band started in. The ceiling is seven feet and two inches. Nell can touch it flat-handed without standing on her toes. You learn to play differently in a room like that: the cymbals come back at you, the bass sits in your chest, and every song has to earn its loud part.",
      "We tracked it live at Fallow Sound in Hampden, all four of us facing each other, no click, no headphones for the drums. The vocals are mostly first or second takes. When something went wrong we kept it if it felt like the room.",
    ],
    recorded: "Fallow Sound, Hampden, Baltimore · March 2026",
    credits: [
      ["Produced by", "Riff & Odile Marchetti"],
      ["Engineered by", "Odile Marchetti"],
      ["Mixed by", "Sam Petrakis"],
      ["Mastered by", "Leah Dunmore at Stillwater Mastering"],
      ["Cover", "Screenprint by June Calloway"],
    ],
    tracks: [
      { title: "Copper Wire", length: 221, bpm: 132, root: 7 },
      { title: "Low Ceiling", length: 252, bpm: 96, root: 2 },
      { title: "Basement Weather", length: 208, bpm: 140, root: 0 },
      { title: "Nine Volt", length: 174, bpm: 156, root: 5 },
      {
        title: "The Long Way Round the Beltway",
        length: 307,
        bpm: 84,
        root: 10,
      },
      { title: "Heat Lamp", length: 219, bpm: 118, root: 3 },
      { title: "Saint of the Night Bus", length: 241, bpm: 104, root: 8 },
      { title: "Ten Thousand Folding Chairs", length: 196, bpm: 124, root: 7 },
      { title: "Feedback, Mostly", length: 167, bpm: 148, root: 0 },
      { title: "House Lights", length: 362, bpm: 72, root: 2 },
    ],
    formats: ["low-ceiling-lp", "low-ceiling-cassette"],
  },
  {
    slug: "copper-wire",
    title: "Copper Wire",
    kind: "Single",
    date: "2026-07-17",
    catalog: "PT-039",
    cover: { motif: "wire", ground: "ink" },
    blurb:
      "The first song from Low Ceiling, plus the rehearsal-room take we almost released instead.",
    notes: [
      "Copper Wire started as a two-chord thing Tomasz played at every soundcheck on the last tour until the rest of us gave in. The B-side is the version we cut on a phone in the basement the night we finished writing it — the one where June's snare buzzes because the dryer upstairs was running.",
    ],
    recorded: "Fallow Sound & the basement, Baltimore · 2026",
    credits: [
      ["Produced by", "Riff & Odile Marchetti"],
      ["Mixed by", "Sam Petrakis"],
    ],
    tracks: [
      { title: "Copper Wire", length: 221, bpm: 132, root: 7 },
      { title: "Copper Wire (Basement Take)", length: 238, bpm: 128, root: 7 },
    ],
    formats: [],
  },
  {
    slug: "live-at-the-grain-exchange",
    title: "Live at the Grain Exchange",
    kind: "Live",
    date: "2024-11-08",
    catalog: "PT-030",
    cover: { motif: "rings", ground: "paper" },
    blurb:
      "The last night of the Parking Lot Hymns tour, at home, recorded off the desk and two room mics hung from the balcony.",
    notes: [
      "Eleven hundred people in a room built to weigh grain. We didn't plan to release it. Then the desk recording came back and you could hear the whole room singing the second verse of Fluorescent, and that was that.",
    ],
    recorded: "The Grain Exchange, Baltimore · 19 December 2023",
    credits: [
      ["Recorded by", "Marcus Bell"],
      ["Mixed by", "Odile Marchetti"],
      ["Photography", "Priya Anand"],
    ],
    tracks: [
      { title: "Fluorescent (Live)", length: 236, bpm: 136, root: 4 },
      { title: "Parking Lot Hymn No. 2 (Live)", length: 284, bpm: 92, root: 9 },
      { title: "Static Season (Live)", length: 251, bpm: 120, root: 0 },
      { title: "Tollbooth (Live)", length: 203, bpm: 150, root: 5 },
      { title: "Last Bus to Dundalk (Live)", length: 318, bpm: 88, root: 2 },
      { title: "Overpass (Live)", length: 412, bpm: 76, root: 7 },
    ],
    formats: [],
  },
  {
    slug: "parking-lot-hymns",
    title: "Parking Lot Hymns",
    kind: "Album",
    date: "2023-04-14",
    catalog: "PT-022",
    cover: { motif: "lot", ground: "paper" },
    blurb:
      "Our first full-length: songs about the hour after a show when everyone's loading out and nobody wants to go home yet.",
    notes: [
      "Most of these were written in the van between the Static Season dates, on a nylon-string guitar with a broken G tuner. We recorded it in a converted church in Frederick over two cold weeks, and the reverb you hear on the slow songs is the actual room.",
    ],
    recorded: "St. Brendan's Hall, Frederick, MD · January 2023",
    credits: [
      ["Produced by", "Hal Okoro"],
      ["Engineered by", "Hal Okoro & Wen Li"],
      ["Mastered by", "Leah Dunmore"],
    ],
    tracks: [
      { title: "Fluorescent", length: 228, bpm: 136, root: 4 },
      { title: "Tollbooth", length: 191, bpm: 152, root: 5 },
      { title: "Parking Lot Hymn No. 1", length: 146, bpm: 70, root: 9 },
      { title: "Overpass", length: 389, bpm: 76, root: 7 },
      { title: "Two Jackets", length: 214, bpm: 112, root: 0 },
      { title: "Last Bus to Dundalk", length: 296, bpm: 88, root: 2 },
      { title: "Parking Lot Hymn No. 2", length: 271, bpm: 92, root: 9 },
      { title: "Cheap Seats", length: 182, bpm: 144, root: 3 },
      { title: "Monday Load-In", length: 233, bpm: 108, root: 10 },
      { title: "Every Room We Played", length: 247, bpm: 98, root: 5 },
      { title: "Parking Lot Hymn No. 3", length: 315, bpm: 66, root: 9 },
    ],
    formats: ["parking-lot-hymns-lp"],
  },
  {
    slug: "static-season",
    title: "Static Season",
    kind: "EP",
    date: "2021-03-05",
    catalog: "PT-011",
    cover: { motif: "static", ground: "ink" },
    blurb:
      "Five songs recorded in the winter nobody could play shows. Our first record for Parlour Tapes.",
    notes: [
      "We made this one in shifts, one or two of us in the basement at a time, passing hard drives through the laundromat's back door. It's the most layered thing we've done — partly because nobody was there to tell anyone to stop.",
    ],
    recorded: "The basement, Highlandtown · Winter 2020",
    credits: [
      ["Produced by", "Riff"],
      ["Mixed by", "Sam Petrakis"],
    ],
    tracks: [
      { title: "Static Season", length: 243, bpm: 120, root: 0 },
      { title: "Weather Radio", length: 198, bpm: 132, root: 7 },
      { title: "Window Unit", length: 226, bpm: 100, root: 3 },
      { title: "Snow Day Setlist", length: 175, bpm: 146, root: 5 },
      { title: "Hold Music", length: 301, bpm: 80, root: 10 },
    ],
    formats: ["static-season-cd"],
  },
  {
    slug: "first-light-demos",
    title: "First Light Demos",
    kind: "EP",
    date: "2019-06-21",
    catalog: "Self-released",
    cover: { motif: "dawn", ground: "paper" },
    blurb:
      "Four songs on a borrowed four-track. Two hundred cassettes, hand-numbered, sold out of a backpack.",
    notes: [
      "This is what we sounded like eight months in. We still play Laundromat Song most nights, usually faster than this.",
    ],
    recorded: "The basement, Highlandtown · Spring 2019",
    credits: [["Recorded by", "Dario Benn"]],
    tracks: [
      { title: "Laundromat Song", length: 187, bpm: 138, root: 2 },
      { title: "Eastern Avenue", length: 212, bpm: 116, root: 7 },
      { title: "First Light", length: 254, bpm: 90, root: 0 },
      { title: "Spin Cycle", length: 161, bpm: 160, root: 5 },
    ],
    formats: [],
  },
];

/* ------------------------------------------------------------ tour */

export type Region = "North America" | "UK & Europe";
export type TicketStatus = "on-sale" | "low" | "sold-out";
export type Show = {
  id: string;
  date: string;
  city: string;
  country: string;
  region: Region;
  venue: string;
  address: string;
  capacity: number;
  support: string;
  doors: string;
  onstage: string;
  ages: string;
  status: TicketStatus;
  ga: number;
  note?: string;
  /** set only for shows that have been played */
  setlist?: string[];
};

export const ticketTiers = [
  {
    id: "ga",
    name: "General admission",
    detail: "Standing, first come first served",
    extra: 0,
  },
  {
    id: "early",
    name: "Early entry + screenprint",
    detail: "In 30 minutes before doors, signed 18×24 tour print",
    extra: 28,
  },
];

const releaseSet = [
  "Copper Wire",
  "Nine Volt",
  "Fluorescent",
  "Low Ceiling",
  "Basement Weather",
  "Heat Lamp",
  "Tollbooth",
  "Saint of the Night Bus",
  "Overpass",
  "Ten Thousand Folding Chairs",
  "Laundromat Song",
  "Feedback, Mostly",
  "House Lights",
];

export const shows: Show[] = [
  {
    id: "2026-09-12-baltimore",
    date: "2026-09-12",
    city: "Baltimore, MD",
    country: "USA",
    region: "North America",
    venue: "The Grain Exchange",
    address: "1400 Key Hwy, Baltimore, MD",
    capacity: 1100,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:15",
    ages: "All ages",
    status: "sold-out",
    ga: 30,
    note: "Low Ceiling release show",
    setlist: releaseSet,
  },
  {
    id: "2026-09-26-washington",
    date: "2026-09-26",
    city: "Washington, DC",
    country: "USA",
    region: "North America",
    venue: "Ninth Street Social",
    address: "1811 9th St NW, Washington, DC",
    capacity: 650,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:00",
    ages: "18+",
    status: "sold-out",
    ga: 32,
    setlist: [
      "Nine Volt",
      "Copper Wire",
      "Fluorescent",
      "Heat Lamp",
      "Low Ceiling",
      "Two Jackets",
      "Basement Weather",
      "Overpass",
      "Saint of the Night Bus",
      "Tollbooth",
      "House Lights",
    ],
  },
  {
    id: "2026-10-03-richmond",
    date: "2026-10-03",
    city: "Richmond, VA",
    country: "USA",
    region: "North America",
    venue: "The Canal Room",
    address: "301 Virginia St, Richmond, VA",
    capacity: 480,
    support: "Owen Marrow",
    doors: "19:30",
    onstage: "21:30",
    ages: "All ages",
    status: "sold-out",
    ga: 28,
    setlist: [
      "Copper Wire",
      "Fluorescent",
      "Low Ceiling",
      "Window Unit",
      "Heat Lamp",
      "Basement Weather",
      "Overpass",
      "Feedback, Mostly",
      "Laundromat Song",
      "House Lights",
    ],
  },
  {
    id: "2026-10-10-pittsburgh",
    date: "2026-10-10",
    city: "Pittsburgh, PA",
    country: "USA",
    region: "North America",
    venue: "Allegheny Works",
    address: "2200 Smallman St, Pittsburgh, PA",
    capacity: 700,
    support: "Owen Marrow",
    doors: "19:00",
    onstage: "21:00",
    ages: "All ages",
    status: "sold-out",
    ga: 30,
    setlist: [
      "Nine Volt",
      "Copper Wire",
      "Tollbooth",
      "Low Ceiling",
      "Saint of the Night Bus",
      "Heat Lamp",
      "Last Bus to Dundalk",
      "Basement Weather",
      "Overpass",
      "House Lights",
    ],
  },
  {
    id: "2026-10-24-philadelphia",
    date: "2026-10-24",
    city: "Philadelphia, PA",
    country: "USA",
    region: "North America",
    venue: "The Lantern Room",
    address: "1026 Frankford Ave, Philadelphia, PA",
    capacity: 800,
    support: "Owen Marrow",
    doors: "19:00",
    onstage: "21:15",
    ages: "All ages",
    status: "on-sale",
    ga: 32,
  },
  {
    id: "2026-10-25-brooklyn",
    date: "2026-10-25",
    city: "Brooklyn, NY",
    country: "USA",
    region: "North America",
    venue: "Halsey Street Ballroom",
    address: "88 Halsey St, Brooklyn, NY",
    capacity: 1200,
    support: "Owen Marrow",
    doors: "19:00",
    onstage: "21:30",
    ages: "16+",
    status: "low",
    ga: 35,
  },
  {
    id: "2026-10-27-boston",
    date: "2026-10-27",
    city: "Boston, MA",
    country: "USA",
    region: "North America",
    venue: "The Pressing Plant",
    address: "15 Lansdowne St, Boston, MA",
    capacity: 900,
    support: "Glass Pony",
    doors: "19:00",
    onstage: "21:00",
    ages: "18+",
    status: "on-sale",
    ga: 32,
  },
  {
    id: "2026-10-29-montreal",
    date: "2026-10-29",
    city: "Montréal, QC",
    country: "Canada",
    region: "North America",
    venue: "Salle Ste-Catherine",
    address: "4848 Rue Sainte-Catherine E, Montréal",
    capacity: 750,
    support: "Glass Pony",
    doors: "19:30",
    onstage: "21:30",
    ages: "All ages",
    status: "on-sale",
    ga: 30,
  },
  {
    id: "2026-10-31-toronto",
    date: "2026-10-31",
    city: "Toronto, ON",
    country: "Canada",
    region: "North America",
    venue: "Dundas Foundry",
    address: "1200 Dundas St W, Toronto",
    capacity: 600,
    support: "Glass Pony",
    doors: "20:00",
    onstage: "22:00",
    ages: "19+",
    status: "sold-out",
    ga: 30,
    note: "Halloween show — costumes encouraged, covers set",
  },
  {
    id: "2026-11-02-chicago",
    date: "2026-11-02",
    city: "Chicago, IL",
    country: "USA",
    region: "North America",
    venue: "Cinder Hall",
    address: "2450 N Milwaukee Ave, Chicago, IL",
    capacity: 1100,
    support: "Glass Pony",
    doors: "19:00",
    onstage: "21:00",
    ages: "18+",
    status: "on-sale",
    ga: 34,
  },
  {
    id: "2026-11-04-minneapolis",
    date: "2026-11-04",
    city: "Minneapolis, MN",
    country: "USA",
    region: "North America",
    venue: "Riverside Union",
    address: "701 1st Ave N, Minneapolis, MN",
    capacity: 850,
    support: "Glass Pony",
    doors: "19:00",
    onstage: "21:00",
    ages: "All ages",
    status: "low",
    ga: 30,
  },
  {
    id: "2026-11-07-denver",
    date: "2026-11-07",
    city: "Denver, CO",
    country: "USA",
    region: "North America",
    venue: "Larimer Union Hall",
    address: "2637 Larimer St, Denver, CO",
    capacity: 1000,
    support: "The Halfmoons",
    doors: "19:00",
    onstage: "21:00",
    ages: "16+",
    status: "on-sale",
    ga: 32,
  },
  {
    id: "2026-11-10-seattle",
    date: "2026-11-10",
    city: "Seattle, WA",
    country: "USA",
    region: "North America",
    venue: "The Tidewater",
    address: "925 E Pike St, Seattle, WA",
    capacity: 800,
    support: "The Halfmoons",
    doors: "19:30",
    onstage: "21:30",
    ages: "21+",
    status: "on-sale",
    ga: 33,
  },
  {
    id: "2026-11-12-portland",
    date: "2026-11-12",
    city: "Portland, OR",
    country: "USA",
    region: "North America",
    venue: "Holladay Theatre",
    address: "1300 NE Holladay St, Portland, OR",
    capacity: 950,
    support: "The Halfmoons",
    doors: "19:00",
    onstage: "21:00",
    ages: "All ages",
    status: "on-sale",
    ga: 31,
  },
  {
    id: "2026-11-14-los-angeles",
    date: "2026-11-14",
    city: "Los Angeles, CA",
    country: "USA",
    region: "North America",
    venue: "The Echo Ward",
    address: "1822 Sunset Blvd, Los Angeles, CA",
    capacity: 750,
    support: "The Halfmoons",
    doors: "19:00",
    onstage: "21:15",
    ages: "18+",
    status: "sold-out",
    ga: 35,
  },
  {
    id: "2026-11-28-london",
    date: "2026-11-28",
    city: "London",
    country: "UK",
    region: "UK & Europe",
    venue: "Mare Street Assembly",
    address: "270 Mare St, London E8",
    capacity: 1000,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:00",
    ages: "14+",
    status: "low",
    ga: 30,
    note: "First UK headline show",
  },
  {
    id: "2026-11-30-manchester",
    date: "2026-11-30",
    city: "Manchester",
    country: "UK",
    region: "UK & Europe",
    venue: "Ancoats Mill",
    address: "Redhill St, Manchester M4",
    capacity: 600,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:00",
    ages: "14+",
    status: "on-sale",
    ga: 27,
  },
  {
    id: "2026-12-02-glasgow",
    date: "2026-12-02",
    city: "Glasgow",
    country: "UK",
    region: "UK & Europe",
    venue: "Saltmarket Hall",
    address: "60 Saltmarket, Glasgow G1",
    capacity: 550,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:00",
    ages: "14+",
    status: "on-sale",
    ga: 27,
  },
  {
    id: "2026-12-04-amsterdam",
    date: "2026-12-04",
    city: "Amsterdam",
    country: "Netherlands",
    region: "UK & Europe",
    venue: "De Kantine",
    address: "Oostelijke Handelskade 12, Amsterdam",
    capacity: 700,
    support: "Pale Sister",
    doors: "19:30",
    onstage: "21:15",
    ages: "All ages",
    status: "on-sale",
    ga: 29,
  },
  {
    id: "2026-12-05-berlin",
    date: "2026-12-05",
    city: "Berlin",
    country: "Germany",
    region: "UK & Europe",
    venue: "Kesselhaus Nord",
    address: "Schönhauser Allee 36, Berlin",
    capacity: 900,
    support: "Pale Sister",
    doors: "19:00",
    onstage: "21:00",
    ages: "All ages",
    status: "on-sale",
    ga: 29,
  },
  {
    id: "2026-12-07-paris",
    date: "2026-12-07",
    city: "Paris",
    country: "France",
    region: "UK & Europe",
    venue: "La Fonderie",
    address: "24 Rue de la Fonderie, Paris 11e",
    capacity: 650,
    support: "Pale Sister",
    doors: "19:30",
    onstage: "21:00",
    ages: "All ages",
    status: "low",
    ga: 30,
  },
  {
    id: "2026-12-19-baltimore",
    date: "2026-12-19",
    city: "Baltimore, MD",
    country: "USA",
    region: "North America",
    venue: "The Grain Exchange",
    address: "1400 Key Hwy, Baltimore, MD",
    capacity: 1100,
    support: "Pale Sister & Owen Marrow",
    doors: "18:30",
    onstage: "21:00",
    ages: "All ages",
    status: "on-sale",
    ga: 30,
    note: "Homecoming show — every ticket includes a download of the night's recording",
  },
];

/** The homecoming show the home page closes on. */
export const homecomingId = "2026-12-19-baltimore";

/* ------------------------------------------------------------ videos */

export type VideoKind = "Music video" | "Live session" | "Tour diary";
export type Video = {
  id: string;
  title: string;
  kind: VideoKind;
  date: string;
  length: string;
  director: string;
  location: string;
  photo: Photo;
  release?: string;
  blurb: string;
};

export const videos: Video[] = [
  {
    id: "copper-wire",
    title: "Copper Wire",
    kind: "Music video",
    date: "2026-07-17",
    length: "3:44",
    director: "Mara Feld",
    location: "Highlandtown, Baltimore",
    photo: photos.pedalboard,
    release: "copper-wire",
    blurb:
      "One continuous shot down a six-hundred-foot extension cord, from the laundromat outlet to the stage at the Grain Exchange.",
  },
  {
    id: "low-ceiling",
    title: "Low Ceiling",
    kind: "Music video",
    date: "2026-09-11",
    length: "4:15",
    director: "Ines Okonjo",
    location: "The basement",
    photo: photos.rehearsal,
    release: "low-ceiling",
    blurb:
      "Filmed in the room the record was written in, with the camera bolted to the ceiling for the whole song.",
  },
  {
    id: "nine-volt-session",
    title: "Nine Volt — basement session",
    kind: "Live session",
    date: "2026-09-25",
    length: "3:02",
    director: "June Calloway",
    location: "The basement",
    photo: photos.drums,
    release: "low-ceiling",
    blurb: "Four mics, one take, the dryer upstairs left running on purpose.",
  },
  {
    id: "house-lights-live",
    title: "House Lights — live at the Grain Exchange",
    kind: "Live session",
    date: "2026-10-02",
    length: "6:31",
    director: "Priya Anand",
    location: "The Grain Exchange, Baltimore",
    photo: photos.crowd,
    release: "low-ceiling",
    blurb:
      "The closing song from the release show, filmed from the balcony while eleven hundred people stopped talking.",
  },
  {
    id: "basement-weather-session",
    title: "Basement Weather — one take",
    kind: "Live session",
    date: "2026-08-14",
    length: "3:31",
    director: "Ines Okonjo",
    location: "Fallow Sound, Hampden",
    photo: photos.bass,
    release: "low-ceiling",
    blurb:
      "Tracked for the album, filmed for us. Tomasz's bass amp is in the bathroom for isolation.",
  },
  {
    id: "diary-4200-miles",
    title: "Tour diary: 4,200 miles in a white van",
    kind: "Tour diary",
    date: "2026-10-12",
    length: "12:48",
    director: "Dario Benn",
    location: "I-81, I-70 and a lot of gas stations",
    photo: photos.soundcheck,
    blurb:
      "The first leg of the Low Ceiling tour: four cities, one blown tire, three soundchecks, a lot of diner coffee.",
  },
  {
    id: "diary-making-low-ceiling",
    title: "Making Low Ceiling",
    kind: "Tour diary",
    date: "2026-08-28",
    length: "18:20",
    director: "Mara Feld",
    location: "Fallow Sound, Hampden",
    photo: photos.stageFloor,
    release: "low-ceiling",
    blurb:
      "Four days, one room, no click track. A short film about recording a record live to tape.",
  },
];

/* ------------------------------------------------------------ merch */

export type MerchKind =
  | "lp"
  | "cassette"
  | "cd"
  | "tee"
  | "longsleeve"
  | "hoodie"
  | "tote"
  | "poster"
  | "picks";
export type Category = "Records" | "Apparel" | "Prints & bits";
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  art: {
    kind: MerchKind;
    garment?: "black" | "bone" | "red";
    release?: string;
  };
  blurb: string;
  details: string[];
  variant?: {
    label: string;
    options: { name: string; extra?: number; soldOut?: boolean }[];
  };
  badge?: string;
};

const sizes = {
  label: "Size",
  options: ["S", "M", "L", "XL", "XXL"].map((name) => ({ name })),
};

export const products: Product[] = [
  {
    id: "low-ceiling-lp",
    name: "Low Ceiling — LP",
    category: "Records",
    price: 28,
    art: { kind: "lp", release: "low-ceiling" },
    badge: "New",
    blurb:
      "The new record on 12-inch vinyl, cut at half speed from the analog tapes. Gatefold sleeve with the full lyrics and a fold-out of June's screenprint.",
    details: [
      "12-inch, 33⅓ rpm, gatefold",
      "Includes download code",
      "Printed lyric insert",
      "Ships from Baltimore within 3 working days",
    ],
    variant: {
      label: "Edition",
      options: [
        { name: "Black, 140g" },
        { name: "Oxblood, 180g", extra: 6 },
        { name: "Signed test pressing", extra: 32, soldOut: true },
      ],
    },
  },
  {
    id: "fall-tour-tee",
    name: "Fall ’26 tour tee",
    category: "Apparel",
    price: 32,
    art: { kind: "tee", garment: "bone" },
    badge: "Tour",
    blurb:
      "Show-bill print on the front, every date of the Low Ceiling tour down the back. Printed two-colour by hand at Ink Lot, Remington.",
    details: [
      "Heavyweight 6.5 oz cotton",
      "Water-based inks",
      "Boxy fit — size down for regular",
      "Bone white",
    ],
    variant: sizes,
  },
  {
    id: "ceiling-tee",
    name: "Low Ceiling tee",
    category: "Apparel",
    price: 30,
    art: { kind: "tee", garment: "black", release: "low-ceiling" },
    blurb:
      "The album cover, one-colour red on black. The shirt we wear on stage because it hides sweat.",
    details: [
      "Heavyweight 6.5 oz cotton",
      "Water-based red ink",
      "Regular fit",
      "Black",
    ],
    variant: sizes,
  },
  {
    id: "grain-exchange-hoodie",
    name: "Grain Exchange hoodie",
    category: "Apparel",
    price: 58,
    art: { kind: "hoodie", garment: "red" },
    blurb:
      "Heavy pullover with the live record's rings printed on the back. Warm enough for a load-out in December.",
    details: [
      "13 oz brushed fleece",
      "Kangaroo pocket, no drawcords",
      "Pre-shrunk",
      "Brick red",
    ],
    variant: sizes,
  },
  {
    id: "setlist-longsleeve",
    name: "Setlist longsleeve",
    category: "Apparel",
    price: 38,
    art: { kind: "longsleeve", garment: "black" },
    blurb:
      "The handwritten setlist from the release show, taped-down corners and all, printed down the left arm.",
    details: [
      "Midweight 5.5 oz cotton",
      "Ribbed cuffs",
      "Regular fit",
      "Black",
    ],
    variant: sizes,
  },
  {
    id: "low-ceiling-cassette",
    name: "Low Ceiling — cassette",
    category: "Records",
    price: 12,
    art: { kind: "cassette", release: "low-ceiling" },
    blurb:
      "Red shell, pad-printed, chrome tape. Dubbed in real time in Baltimore, so every copy sounds a little like ours.",
    details: [
      "Type II chrome tape",
      "J-card with lyrics",
      "Includes download code",
      "Edition of 300",
    ],
  },
  {
    id: "parking-lot-hymns-lp",
    name: "Parking Lot Hymns — LP",
    category: "Records",
    price: 26,
    art: { kind: "lp", release: "parking-lot-hymns" },
    blurb:
      "Third pressing of our first album, back in the sleeve with the painted parking lines.",
    details: [
      "12-inch, 33⅓ rpm",
      "Includes download code",
      "Printed inner sleeve",
    ],
    variant: {
      label: "Edition",
      options: [
        { name: "Black, 140g" },
        { name: "Clear smoke, 140g", extra: 4 },
      ],
    },
  },
  {
    id: "static-season-cd",
    name: "Static Season — CD",
    category: "Records",
    price: 10,
    art: { kind: "cd", release: "static-season" },
    blurb:
      "The winter EP in a recycled card wallet. Five songs, twenty-two minutes.",
    details: ["Card wallet, no plastic", "Includes download code"],
  },
  {
    id: "tour-screenprint",
    name: "Fall tour screenprint",
    category: "Prints & bits",
    price: 25,
    art: { kind: "poster" },
    blurb:
      "18 × 24 inch show bill, two inks on French Paper speckletone. Hand-pulled in an edition of 150.",
    details: [
      "18 × 24 in",
      "Two-colour screenprint",
      "Numbered, edition of 150",
      "Ships rolled in a tube",
    ],
    variant: {
      label: "Edition",
      options: [
        { name: "Unsigned" },
        { name: "Signed by the band", extra: 10 },
      ],
    },
  },
  {
    id: "setlist-tote",
    name: "Setlist tote",
    category: "Prints & bits",
    price: 18,
    art: { kind: "tote" },
    blurb:
      "Canvas tote big enough for twelve records. We know because we checked.",
    details: ["12 oz natural canvas", "Fits 12 LPs", "Long handles"],
  },
  {
    id: "pick-tin",
    name: "Pick tin",
    category: "Prints & bits",
    price: 8,
    art: { kind: "picks" },
    blurb:
      "Six medium picks — the ones Nell and Dario actually use — in a printed tin.",
    details: ["6 × 0.73 mm picks", "Printed steel tin", "Fits a jacket pocket"],
  },
];

/* ------------------------------------------------------------ band & press */

export const members = [
  {
    name: "Nell Okafor",
    role: "Vocals, guitar",
    since: 2016,
    photo: photos.pedalboard,
    bio: "Writes most of the words, all of them on receipts. Grew up singing in a Pentecostal choir in Edmondson Village and still sings like the back row needs to hear.",
    gear: "1972 Telecaster Thinline, a borrowed Twin Reverb, one fuzz pedal",
  },
  {
    name: "Dario Benn",
    role: "Guitar, keys",
    since: 2016,
    photo: photos.stageFloor,
    bio: "Third-generation laundromat kid; the band rehearses under his family's business. Drives the van, fixes the van, films the tour diaries.",
    gear: "Jazzmaster with a tremolo he won't stop using, Wurlitzer 200A",
  },
  {
    name: "Tomasz Wray",
    role: "Bass",
    since: 2017,
    photo: photos.bass,
    bio: "Joined after answering a flyer that said ‘bass player, must own car’. Did not own a car. Writes the riffs everyone else ends up humming.",
    gear: "Precision bass, flatwounds, a 1979 Ampeg he carries himself",
  },
  {
    name: "June Calloway",
    role: "Drums",
    since: 2016,
    photo: photos.drums,
    bio: "Prints every poster and record sleeve on a screen press in her kitchen. Plays the drums like she's mad at them, then apologises.",
    gear: "1960s Ludwig kit, a snare older than the band",
  },
];

export const timeline = [
  {
    year: "2016",
    text: "Nell, Dario and June start playing in the basement under the Benn family laundromat on Eastern Avenue.",
  },
  {
    year: "2017",
    text: "Tomasz answers a flyer in a Fells Point record shop. First show, in the laundromat itself, after closing.",
  },
  {
    year: "2019",
    text: "First Light Demos: four songs on a borrowed four-track, two hundred hand-numbered cassettes.",
  },
  {
    year: "2021",
    text: "Static Season, recorded in shifts during the winter of no shows. Parlour Tapes signs the band.",
  },
  {
    year: "2023",
    text: "Parking Lot Hymns comes out; 112 shows in a 2009 Ford van called the Laundromat.",
  },
  {
    year: "2024",
    text: "Live at the Grain Exchange, from the last night of the tour, at home.",
  },
  {
    year: "2026",
    text: "Low Ceiling. First headline tour of the UK and Europe.",
  },
];

export const principles = [
  {
    title: "All ages wherever we can",
    text: "Over half of this tour is all ages. Where a venue's license won't allow it, we play an early matinee the same day.",
  },
  {
    title: "One dollar a ticket",
    text: "One dollar from every ticket goes to the Small Rooms Fund, which helps independent venues fix their PA, roof or heating.",
  },
  {
    title: "Fair face value",
    text: "We set prices ourselves and cap resale through the official exchange at face value. If a show sells out, join the waitlist.",
  },
];

export const quotes = [
  {
    text: "A record that sounds like a basement show with the windows open.",
    source: "The Overpass Review",
    on: "Low Ceiling",
  },
  {
    text: "Okafor sings like she's settling an argument with the PA — and winning.",
    source: "Signal Hill Weekly",
    on: "Low Ceiling",
  },
  {
    text: "The loudest quiet band in Baltimore.",
    source: "Lowlight Radio",
    on: "Live at the Grain Exchange",
  },
  {
    text: "House Lights is six minutes you'll want back immediately, just so you can spend them again.",
    source: "Dead Air Quarterly",
    on: "Low Ceiling",
  },
  {
    text: "They play every room like it's the last one before the van breaks down.",
    source: "Northeast Noise",
    on: "Parking Lot Hymns",
  },
];

export const press = {
  intro:
    "Bios, photos, quotes and the right people to ask. Everything here is cleared for editorial use with credit.",
  bioShort:
    "Riff are a four-piece rock band from Baltimore — Nell Okafor, Dario Benn, Tomasz Wray and June Calloway — who have rehearsed in the same basement under a laundromat since 2016. Their third record, Low Ceiling (Parlour Tapes, September 2026), was tracked live to tape in four days.",
  bioLong: [
    "Riff are a four-piece rock band from Baltimore: Nell Okafor (vocals, guitar), Dario Benn (guitar, keys), Tomasz Wray (bass) and June Calloway (drums). Since 2016 they have rehearsed in the basement under the Benn family's laundromat on Eastern Avenue, a room with a seven-foot ceiling that shapes the band's sound — songs that sit quiet and close until they can't anymore.",
    "After the self-released First Light Demos (2019) and the Static Season EP (2021), the band's debut album Parking Lot Hymns (2023) took them through 112 shows in a 2009 Ford van. Live at the Grain Exchange (2024) captured the last night of that run, at home, in front of eleven hundred people.",
    "Low Ceiling, released by Parlour Tapes on 11 September 2026, was produced with Odile Marchetti and recorded live to tape at Fallow Sound in Hampden in four days, without a click track. The band tours North America, the UK and Europe through December 2026, ending with a homecoming show at the Grain Exchange on 19 December.",
  ],
  facts: [
    ["Hometown", "Baltimore, Maryland"],
    ["Formed", "2016"],
    ["Label", "Parlour Tapes"],
    ["Latest release", "Low Ceiling (LP, 11 Sep 2026)"],
    ["Live line-up", "4 piece, no backing tracks"],
    ["Stage", "Minimum 6 × 4 m, 6 inputs on drums"],
  ] as [string, string][],
  contacts: [
    {
      role: "Press & interviews",
      name: "Fern Adeyemi, Lowercase PR",
      email: "press@riff.example",
    },
    {
      role: "Booking — North America",
      name: "Theo Lisk, Long Haul Agency",
      email: "booking@riff.example",
    },
    {
      role: "Booking — UK & Europe",
      name: "Saskia Brandt, Nordlicht Live",
      email: "europe@riff.example",
    },
    {
      role: "Label & licensing",
      name: "Parlour Tapes",
      email: "label@riff.example",
    },
  ],
  pressPhotos: [
    photos.crowd,
    photos.rehearsal,
    photos.pedalboard,
    photos.drumsLive,
  ],
};

/* ------------------------------------------------------------ home copy */

export const home = {
  heroLine:
    "The new record, out now on Parlour Tapes. On the road through December.",
  recordHeading: "Ten songs, one room, four days",
  bandHeading: "Same basement since 2016",
  bandText:
    "Riff rehearse under a laundromat on Eastern Avenue, in a room with a seven-foot ceiling and a dryer that runs through every take. That room is the band: songs that sit quiet and close until they can't anymore.",
  closeHeading: "Home for the holidays",
  closeText:
    "The last night of the tour, back where it started. Two support acts, the whole new record, and a recording of the night for everyone with a ticket.",
};

export const shipping = {
  freeOver: 75,
  methods: [
    {
      id: "standard",
      name: "Standard",
      detail: "5–8 working days, tracked in the US",
      price: 6,
    },
    { id: "express", name: "Express", detail: "2–3 working days", price: 14 },
    {
      id: "pickup",
      name: "Pick up at a show",
      detail: "Collect from the merch table on any remaining date",
      price: 0,
    },
  ],
};
