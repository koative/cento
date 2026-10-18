import crowd from "./assets/crowd.jpg";
import warehouse from "./assets/warehouse.jpg";
import bunker from "./assets/bunker.jpg";
import glasshouse from "./assets/glasshouse.jpg";
import lights from "./assets/lights.jpg";
import redroom from "./assets/redroom.jpg";
import camping from "./assets/camping.jpg";
import confetti from "./assets/confetti.jpg";
import hands from "./assets/hands.jpg";
import dj from "./assets/dj.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Pulse",
  edition: "Vol. 07",
  year: 2027,
  dates: "17—19 July 2027",
  place: "The Waterworks, Berlin",
  tagline: "Three days, four stages, no off switch.",
  email: "hello@pulse.example",
  press: "press@pulse.example",
  phone: "+1 555 0147 2027",
  phoneHref: "tel:+155501472027",
  address: ["The Waterworks", "Uferweg 7", "10317 Berlin"],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "SoundCloud", href: "https://soundcloud.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/lineup", label: "Lineup" },
  { to: "/timetable", label: "Timetable" },
  { to: "/venue", label: "Venue" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
];

export const images = { lights, bunker, camping, confetti, hands, dj };

/* ------------------------------------------------------------ days & stages */

export type DayId = "fri" | "sat" | "sun";
export type StageId = "open-air" | "turbine" | "pumphouse" | "glasshouse";

export const days: {
  id: DayId;
  short: string;
  label: string;
  long: string;
  hours: string;
}[] = [
  {
    id: "fri",
    short: "Fri",
    label: "Fri 17",
    long: "Friday 17 July",
    hours: "16:00 — 06:00",
  },
  {
    id: "sat",
    short: "Sat",
    label: "Sat 18",
    long: "Saturday 18 July",
    hours: "15:00 — 08:00",
  },
  {
    id: "sun",
    short: "Sun",
    label: "Sun 19",
    long: "Sunday 19 July",
    hours: "13:00 — 23:00",
  },
];

export type Stage = {
  id: StageId;
  name: string;
  character: string;
  text: string;
  capacity: string;
  hours: Record<DayId, string | null>;
  image: string;
  alt: string;
};

export const stages: Stage[] = [
  {
    id: "open-air",
    name: "Open Air",
    character: "The river field. Sunset sets, big rigs, everybody.",
    text: "A sloped meadow running down to the Spree, with the main rig facing west so the sun drops behind the crowd. Daylight house, live headliners and the Sunday closing all happen here. Curfew is 23:00 sharp; the field empties into the halls.",
    capacity: "9,000",
    hours: { fri: "16:00 — 23:00", sat: "15:00 — 23:00", sun: "14:00 — 22:00" },
    image: crowd,
    alt: "A crowd on an open field facing a stage that blazes amber through smoke at night",
  },
  {
    id: "turbine",
    name: "Turbine",
    character: "The old turbine hall. Concrete, steel, ten hours of techno.",
    text: "Forty metres of brick and crane rails where the pumps used to run. A twelve-stack Funktion rig, no screens, one strip of light bars along the roof truss. The longest sets of the weekend live here, and Saturday does not finish until breakfast.",
    capacity: "3,200",
    hours: { fri: "20:00 — 06:00", sat: "21:00 — 08:00", sun: "16:00 — 23:00" },
    image: warehouse,
    alt: "Rows of white light bars on the ceiling of a dark concrete hall full of dancers",
  },
  {
    id: "pumphouse",
    name: "Pumphouse",
    character: "Below ground. Four hundred people, one red bulb.",
    text: "The basement pump room, reached by a single staircase from the courtyard. Low ceiling, close sound, and the strangest bookings on the bill: acid, bass, jungle and the live modular sets we cannot place anywhere else. One in, one out after midnight.",
    capacity: "400",
    hours: { fri: "23:00 — 03:00", sat: "00:00 — 04:00", sun: null },
    image: redroom,
    alt: "Silhouetted dancers in a low room washed in red light, neon tubes behind them",
  },
  {
    id: "glasshouse",
    name: "Glasshouse",
    character: "The old greenhouse. Daylight, ambient, live instruments.",
    text: "A Victorian-style glasshouse on the east lawn, restored by the city in 2021 and lent to us for three afternoons. Ambient, downtempo and live sets at a volume you can talk over. Bring a blanket; there are cushions for the first two hundred.",
    capacity: "600",
    hours: { fri: "17:00 — 21:00", sat: "16:00 — 20:00", sun: "13:00 — 17:00" },
    image: glasshouse,
    alt: "Inside a long glasshouse: white steel glazing bars over planted rock beds and a pale stone path",
  },
];

/** Minutes on foot between stages, from the venue map. */
export const walkMinutes: Record<StageId, Record<StageId, number>> = {
  "open-air": { "open-air": 0, turbine: 6, pumphouse: 7, glasshouse: 9 },
  turbine: { "open-air": 6, turbine: 0, pumphouse: 2, glasshouse: 5 },
  pumphouse: { "open-air": 7, turbine: 2, pumphouse: 0, glasshouse: 6 },
  glasshouse: { "open-air": 9, turbine: 5, pumphouse: 6, glasshouse: 0 },
};

/* ------------------------------------------------------------ artists */

export type Format = "DJ set" | "Live" | "Hybrid" | "B2B";

export type Artist = {
  slug: string;
  name: string;
  origin: string;
  genre: string;
  format: Format;
  /** 1 = headline, 2 = main, 3 = support — sets the poster size. */
  billing: 1 | 2 | 3;
  day: DayId;
  stage: StageId;
  start: string;
  end: string;
  bio: string[];
  moods: string[];
  releases: { title: string; label: string; year: number }[];
};

export const artists: Artist[] = [
  {
    slug: "mira-nova",
    name: "Mira Nova",
    origin: "Lisbon",
    genre: "Melodic techno",
    format: "Live",
    billing: 1,
    day: "fri",
    stage: "open-air",
    start: "20:30",
    end: "23:00",
    bio: [
      "Mira Nova builds her live show from three synths, a drum machine she bought broken in 2016 and a habit of letting a chord ride for four minutes longer than anyone expects. The result is techno that feels like weather: slow pressure, then a front coming through.",
      "Her Friday set closes the Open Air field on the first night of Vol. 07, timed so the last track lands as the sky over the Spree goes fully dark.",
    ],
    moods: ["Euphoric", "Slow build", "Sunset"],
    releases: [
      { title: "Low Tide Choir", label: "Maré Records", year: 2026 },
      { title: "Second Light EP", label: "Maré Records", year: 2024 },
    ],
  },
  {
    slug: "no-signal",
    name: "Nø Signal",
    origin: "Oslo",
    genre: "Industrial techno",
    format: "DJ set",
    billing: 1,
    day: "fri",
    stage: "turbine",
    start: "23:00",
    end: "02:00",
    bio: [
      "Three hours, one record bag, no rewinds. Nø Signal plays the hard, metallic end of techno with a patience that makes the drops feel earned — long blends, rolling kicks, then a breakdown that sounds like the hall itself is shifting.",
      "This is the Turbine's opening headline slot and the set we built Friday around.",
    ],
    moods: ["Relentless", "Metallic", "Peak time"],
    releases: [
      { title: "Fjord Pressure", label: "Kald Tape", year: 2026 },
      { title: "Signal Loss 03", label: "Kald Tape", year: 2025 },
    ],
  },
  {
    slug: "low-orbit-choir",
    name: "Low Orbit Choir",
    origin: "Berlin",
    genre: "Kraut electronics",
    format: "Live",
    billing: 1,
    day: "sat",
    stage: "open-air",
    start: "20:00",
    end: "21:30",
    bio: [
      "A five-piece from Neukölln with two drummers, a bass VI, a wall of tape echoes and a singer who mostly uses her voice as another oscillator. Their songs are motorik grooves that refuse to end, and their gigs regularly overrun because nobody on stage wants to stop.",
      "Saturday's sunset slot is the band's first hometown festival show — and the reason the Open Air rig gets two extra delay towers this year.",
    ],
    moods: ["Hypnotic", "Live band", "Hometown"],
    releases: [
      { title: "Weightless Parade", label: "Kanalstraße", year: 2026 },
      { title: "Orbit Tapes Vol. 2", label: "Kanalstraße", year: 2023 },
    ],
  },
  {
    slug: "last-frequency",
    name: "Last Frequency",
    origin: "Tbilisi",
    genre: "Hard techno",
    format: "DJ set",
    billing: 1,
    day: "sat",
    stage: "turbine",
    start: "02:00",
    end: "05:00",
    bio: [
      "Last Frequency came up through the Tbilisi warehouse scene and plays like it: fast, physical, and unexpectedly funny, with left-turns into rave stabs and old electro when the room least expects it.",
      "The 02:00 slot on Saturday is the heaviest hour of the festival. Earplugs are free at every bar.",
    ],
    moods: ["Fast", "Physical", "After dark"],
    releases: [
      { title: "Rustaveli Run", label: "Mtkvari Sound", year: 2026 },
      { title: "Night Bus 47", label: "Mtkvari Sound", year: 2024 },
    ],
  },
  {
    slug: "sora-veil",
    name: "Sora Veil",
    origin: "Seoul",
    genre: "Dream trance",
    format: "Live",
    billing: 1,
    day: "sun",
    stage: "open-air",
    start: "17:00",
    end: "19:00",
    bio: [
      "Sora Veil's records sound like trance heard through a wall at 6 a.m. — the melody intact, the aggression filtered out. Live, she plays keys and sings over pads that swell for minutes at a time while the kick holds steady underneath.",
      "Sunday late afternoon, when the field is full of people who have not slept properly since Thursday, is exactly where this belongs.",
    ],
    moods: ["Weightless", "Vocal", "Golden hour"],
    releases: [
      { title: "Paper Moon Radio", label: "Hanok Audio", year: 2026 },
      { title: "Veil", label: "Hanok Audio", year: 2024 },
    ],
  },
  {
    slug: "rue-morgan",
    name: "Rue Morgan",
    origin: "Paris",
    genre: "Disco & edits",
    format: "DJ set",
    billing: 1,
    day: "sun",
    stage: "open-air",
    start: "19:00",
    end: "22:00",
    bio: [
      "Rue Morgan has closed more festivals than anyone on this bill and treats it as a craft: the last three hours are a slow walk from Italo and boogie through French house to the kind of piano record that makes strangers hug.",
      "The final set of Pulse Vol. 07. The field lights go up at 22:00 and the last track is always a secret.",
    ],
    moods: ["Joyful", "Singalong", "Closing"],
    releases: [
      { title: "Edits Pour Danser 4", label: "Bel Étage", year: 2026 },
      { title: "Canal Saint-Martin", label: "Bel Étage", year: 2023 },
    ],
  },
  {
    slug: "sine-and-salt",
    name: "Sine & Salt",
    origin: "Lagos",
    genre: "Afro house",
    format: "B2B",
    billing: 2,
    day: "fri",
    stage: "open-air",
    start: "18:00",
    end: "20:30",
    bio: [
      "Two producers, one shared hard drive and a decade of Sunday parties in Lekki. Sine & Salt play percussion-heavy afro house with live talking drum laid over the top, and they read a daytime crowd better than almost anyone.",
    ],
    moods: ["Percussive", "Warm", "Daylight"],
    releases: [
      { title: "Third Mainland", label: "Èkó Grooves", year: 2026 },
      { title: "Salt Water", label: "Èkó Grooves", year: 2024 },
    ],
  },
  {
    slug: "hollow-coast",
    name: "Hollow Coast",
    origin: "Melbourne",
    genre: "Balearic",
    format: "DJ set",
    billing: 3,
    day: "fri",
    stage: "open-air",
    start: "16:00",
    end: "18:00",
    bio: [
      "Hollow Coast opens the field on Friday with guitars, dub basslines and records that never quite reach 115 BPM. The perfect first two hours: get a drink, find your people, sit on the slope.",
    ],
    moods: ["Easy", "Sunlit", "Opener"],
    releases: [{ title: "St Kilda Pier", label: "Long Swell", year: 2025 }],
  },
  {
    slug: "pell-and-moss",
    name: "Pell & Moss",
    origin: "Leipzig",
    genre: "Minimal",
    format: "B2B",
    billing: 2,
    day: "fri",
    stage: "turbine",
    start: "20:00",
    end: "23:00",
    bio: [
      "Pell & Moss have played back-to-back every month for nine years at a club in Leipzig that holds 180 people. Their minimal is clicky, swung and dry, and they open the Turbine like it is still that room.",
    ],
    moods: ["Groovy", "Dry", "Warm-up"],
    releases: [{ title: "Plagwitz Loops", label: "Westwerk", year: 2025 }],
  },
  {
    slug: "grit-garden",
    name: "Grit Garden",
    origin: "Glasgow",
    genre: "Hardgroove",
    format: "DJ set",
    billing: 2,
    day: "fri",
    stage: "turbine",
    start: "02:00",
    end: "06:00",
    bio: [
      "Four hours to close the first night. Grit Garden plays the loopy, tracky, percussion-led hardgroove of the late nineties alongside new records that sound exactly as rough. Expect the lights to come up on a hall that refuses to leave.",
    ],
    moods: ["Loopy", "Rough", "Closing"],
    releases: [{ title: "Barras Dawn", label: "Clydebuilt", year: 2026 }],
  },
  {
    slug: "acid-bloom",
    name: "Acid Bloom",
    origin: "Leeds",
    genre: "Acid house",
    format: "Live",
    billing: 2,
    day: "fri",
    stage: "pumphouse",
    start: "23:00",
    end: "01:00",
    bio: [
      "Two 303 clones, one 909, no laptop. Acid Bloom jams every set from scratch and has never played the same track twice. In a 400-capacity basement this is as close to 1989 as you will get.",
    ],
    moods: ["Squelchy", "Improvised", "Sweaty"],
    releases: [
      { title: "Chapeltown Acid", label: "Northern Wire", year: 2025 },
    ],
  },
  {
    slug: "ines-wexler",
    name: "Ines Wexler",
    origin: "Vienna",
    genre: "Modular live",
    format: "Live",
    billing: 3,
    day: "fri",
    stage: "pumphouse",
    start: "01:00",
    end: "03:00",
    bio: [
      "A trained percussionist who swapped drums for patch cables. Ines Wexler's modular sets drift between broken techno and pure texture, and she performs them facing the crowd so you can watch every cable move.",
    ],
    moods: ["Experimental", "Textural", "Late"],
    releases: [{ title: "Patch Notes", label: "Gürtel Editions", year: 2026 }],
  },
  {
    slug: "dusk-theory",
    name: "Dusk Theory",
    origin: "Berlin",
    genre: "Downtempo",
    format: "Live",
    billing: 3,
    day: "fri",
    stage: "glasshouse",
    start: "17:00",
    end: "19:00",
    bio: [
      "Cello, field recordings from the Tempelhof runways and a drum machine set to half time. Dusk Theory opens the Glasshouse with music for lying on the floor and watching the light change through the panes.",
    ],
    moods: ["Calm", "Cinematic", "Afternoon"],
    releases: [{ title: "Runway Hymns", label: "Stille Post", year: 2026 }],
  },
  {
    slug: "yuna-hayashi",
    name: "Yuna Hayashi",
    origin: "Osaka",
    genre: "Ambient",
    format: "Live",
    billing: 2,
    day: "fri",
    stage: "glasshouse",
    start: "19:00",
    end: "21:00",
    bio: [
      "Yuna Hayashi composes for small rooms, temples and, once, an empty swimming pool. Her live set layers processed piano over slow, sub-heavy drones, and the Glasshouse at sunset is the closest thing we have to any of those.",
    ],
    moods: ["Meditative", "Piano", "Sunset"],
    releases: [{ title: "Water Clock", label: "Kaze Disc", year: 2025 }],
  },
  {
    slug: "ada-mensah",
    name: "Ada Mensah",
    origin: "Accra",
    genre: "Amapiano & house",
    format: "DJ set",
    billing: 2,
    day: "sat",
    stage: "open-air",
    start: "15:00",
    end: "17:00",
    bio: [
      "Log drums, jazzy keys and a mic she uses exactly twice a set. Ada Mensah's Saturday opener is built for the moment the field fills up and the first proper dancing of the day begins.",
    ],
    moods: ["Bouncy", "Sunny", "Opener"],
    releases: [{ title: "Osu Sundays", label: "Gold Coast Wax", year: 2026 }],
  },
  {
    slug: "tamsin-okoro",
    name: "Tamsin Okoro",
    origin: "London",
    genre: "UK garage",
    format: "DJ set",
    billing: 2,
    day: "sat",
    stage: "open-air",
    start: "17:00",
    end: "19:00",
    bio: [
      "Two-step, speed garage, bassline and the occasional grime instrumental. Tamsin Okoro's sets are quick-mixed and full of rewinds she earns rather than asks for.",
    ],
    moods: ["Swung", "Bassy", "Playful"],
    releases: [{ title: "Peckham Rye", label: "Southside Dubs", year: 2025 }],
  },
  {
    slug: "halden-and-roe",
    name: "Halden & Roe",
    origin: "Copenhagen",
    genre: "Deep house",
    format: "B2B",
    billing: 2,
    day: "sat",
    stage: "open-air",
    start: "21:30",
    end: "23:00",
    bio: [
      "Halden & Roe take the field from Low Orbit Choir's last echo to curfew with deep, vocal house that keeps everyone outside until the lights go up.",
    ],
    moods: ["Deep", "Vocal", "Night"],
    releases: [{ title: "Nørrebro Nights", label: "Havn", year: 2026 }],
  },
  {
    slug: "circuit-break",
    name: "Circuit Break",
    origin: "Detroit",
    genre: "Electro",
    format: "Hybrid",
    billing: 2,
    day: "sat",
    stage: "turbine",
    start: "21:00",
    end: "23:30",
    bio: [
      "Circuit Break plays electro the way it was meant to be heard — on a huge system, in the dark, with robotic vocals cutting across the room. Half records, half live drum machine.",
    ],
    moods: ["Robotic", "Funky", "Warm-up"],
    releases: [
      {
        title: "Woodward Avenue Transmissions",
        label: "Motor Grid",
        year: 2025,
      },
    ],
  },
  {
    slug: "motion-blur",
    name: "Motion Blur",
    origin: "Brussels",
    genre: "EBM & new beat",
    format: "DJ set",
    billing: 2,
    day: "sat",
    stage: "turbine",
    start: "23:30",
    end: "02:00",
    bio: [
      "Slow, heavy, Belgian. Motion Blur digs out EBM and new beat records at 110 BPM and slowly pushes them faster until the Turbine is ready for Last Frequency.",
    ],
    moods: ["Dark", "Driving", "Body music"],
    releases: [{ title: "Anvers Express", label: "Zuidstation", year: 2026 }],
  },
  {
    slug: "wren-callaway",
    name: "Wren Callaway",
    origin: "Chicago",
    genre: "Chicago house",
    format: "DJ set",
    billing: 2,
    day: "sat",
    stage: "turbine",
    start: "05:00",
    end: "08:00",
    bio: [
      "The breakfast set. Wren Callaway closes Saturday with jacking house, gospel samples and three decks running at once. The turbine-hall doors open onto the river at 06:00 and nobody minds the daylight.",
    ],
    moods: ["Jacking", "Gospel", "Sunrise"],
    releases: [
      { title: "South Side Sermon", label: "Lakefront Trax", year: 2026 },
    ],
  },
  {
    slug: "kestrel",
    name: "Kestrel",
    origin: "Bristol",
    genre: "Jungle",
    format: "DJ set",
    billing: 3,
    day: "sat",
    stage: "pumphouse",
    start: "00:00",
    end: "02:00",
    bio: [
      "Amen breaks, rolling subs and a record box full of white labels from her own studio. Kestrel turns the Pumphouse into the fastest room on site for two hours.",
    ],
    moods: ["Fast", "Breakbeat", "Sub-heavy"],
    releases: [
      { title: "Stokes Croft Dubplates", label: "Avon Pressure", year: 2025 },
    ],
  },
  {
    slug: "velvet-static",
    name: "Velvet Static",
    origin: "Manchester",
    genre: "Breaks & electro",
    format: "DJ set",
    billing: 2,
    day: "sat",
    stage: "pumphouse",
    start: "02:00",
    end: "04:00",
    bio: [
      "Velvet Static mixes broken beat, electro and bass in a style that sounds chaotic and never is. A regular at the Pumphouse since Vol. 03 and the reason many people found it.",
    ],
    moods: ["Broken", "Bass", "Basement"],
    releases: [{ title: "Ancoats Static", label: "Red Brick Wax", year: 2026 }],
  },
  {
    slug: "okra-tapes",
    name: "Okra Tapes",
    origin: "Lyon",
    genre: "Lo-fi house",
    format: "Live",
    billing: 3,
    day: "sat",
    stage: "glasshouse",
    start: "16:00",
    end: "18:00",
    bio: [
      "Dusty, saturated house played from a four-track and a sampler. Okra Tapes makes the Glasshouse feel like someone's living room in the best way.",
    ],
    moods: ["Dusty", "Cosy", "Afternoon"],
    releases: [
      { title: "Croix-Rousse Cassette", label: "Presqu'île", year: 2025 },
    ],
  },
  {
    slug: "blackwater-unit",
    name: "Blackwater Unit",
    origin: "Belfast",
    genre: "Dub",
    format: "Hybrid",
    billing: 3,
    day: "sat",
    stage: "glasshouse",
    start: "18:00",
    end: "20:00",
    bio: [
      "A sound-system crew with a live mixing desk. Blackwater Unit dub out their own productions in real time, and yes, they bring their own speaker stack for the Glasshouse.",
    ],
    moods: ["Heavy", "Spacious", "Sound system"],
    releases: [{ title: "Lagan Echo", label: "Unit Sound", year: 2026 }],
  },
  {
    slug: "teo-lindqvist",
    name: "Teo Lindqvist",
    origin: "Gothenburg",
    genre: "Progressive",
    format: "DJ set",
    billing: 3,
    day: "sun",
    stage: "open-air",
    start: "14:00",
    end: "16:30",
    bio: [
      "Long, layered progressive house that takes its time. Teo Lindqvist opens the final day with a set that starts at 112 BPM and quietly ends somewhere much higher.",
    ],
    moods: ["Layered", "Patient", "Opener"],
    releases: [{ title: "Haga Lights", label: "Västkust", year: 2025 }],
  },
  {
    slug: "deep-current",
    name: "Deep Current",
    origin: "Rotterdam",
    genre: "Dub techno",
    format: "DJ set",
    billing: 3,
    day: "sun",
    stage: "turbine",
    start: "16:00",
    end: "18:00",
    bio: [
      "Chords smeared into fog, kicks you feel more than hear. Deep Current reopens the Turbine on Sunday for anyone who wants their techno slower and deeper.",
    ],
    moods: ["Foggy", "Deep", "Afternoon"],
    releases: [{ title: "Maas Delay", label: "Kade Records", year: 2026 }],
  },
  {
    slug: "ana-vrba",
    name: "Ana Vrba",
    origin: "Prague",
    genre: "Trance",
    format: "DJ set",
    billing: 2,
    day: "sun",
    stage: "turbine",
    start: "18:00",
    end: "20:30",
    bio: [
      "Ana Vrba plays the 1990s trance records your older cousin taped off the radio, next to new ones that are just as unashamed. Hands in the air is the point.",
    ],
    moods: ["Uplifting", "Nostalgic", "Hands up"],
    releases: [{ title: "Vltava Rising", label: "Most Records", year: 2026 }],
  },
  {
    slug: "nadia-ferro",
    name: "Nadia Ferro",
    origin: "Milan",
    genre: "Italo & cosmic",
    format: "DJ set",
    billing: 2,
    day: "sun",
    stage: "turbine",
    start: "20:30",
    end: "23:00",
    bio: [
      "Italo disco, cosmic and slow electronic records from the Adriatic coast. Nadia Ferro closes the Turbine for the year with arpeggios and a mirror ball we hang only once.",
    ],
    moods: ["Cosmic", "Sparkly", "Closing"],
    releases: [
      { title: "Riviera Notturna", label: "Navigli Disco", year: 2025 },
    ],
  },
  {
    slug: "marguerite-lund",
    name: "Marguerite Lund",
    origin: "Stockholm",
    genre: "Ambient piano",
    format: "Live",
    billing: 3,
    day: "sun",
    stage: "glasshouse",
    start: "13:00",
    end: "14:30",
    bio: [
      "A grand piano wheeled into the Glasshouse, two tape loops and an hour and a half of quiet. Marguerite Lund's Sunday set is the softest landing of the weekend.",
    ],
    moods: ["Quiet", "Acoustic", "Morning after"],
    releases: [{ title: "Söder Mornings", label: "Snö", year: 2026 }],
  },
  {
    slug: "paloma-brisa",
    name: "Paloma Brisa",
    origin: "Mexico City",
    genre: "Latin club",
    format: "DJ set",
    billing: 3,
    day: "sun",
    stage: "glasshouse",
    start: "15:00",
    end: "17:00",
    bio: [
      "Cumbia edits, dembow-house and tribal guarachero at a volume the Glasshouse can take. Paloma Brisa turns Sunday afternoon into the party nobody planned for.",
    ],
    moods: ["Tropical", "Bouncy", "Surprise"],
    releases: [{ title: "Roma Norte", label: "Brisa Discos", year: 2026 }],
  },
];

/* ------------------------------------------------------------ tickets */

export type Ticket = {
  id: string;
  name: string;
  price: number;
  valid: string;
  includes: string[];
  /** Set on single-day tickets; they are listed in their own group. */
  day?: DayId;
  limited?: string;
};

export const ticketPhases = [
  { name: "Early bird", status: "Sold out", sold: 1 },
  { name: "Tier 2", status: "On sale now", sold: 0.64 },
  { name: "Final tier", status: "From 1 May", sold: 0 },
];

export const tickets: Ticket[] = [
  {
    id: "weekend",
    name: "Weekend",
    price: 189,
    valid: "Fri 17 — Sun 19 July",
    includes: [
      "All four stages, all three days",
      "Re-entry any time",
      "Free shuttle from S Ostkreuz",
    ],
  },
  {
    id: "weekend-camping",
    name: "Weekend + Camping",
    price: 249,
    valid: "Thu 16 — Mon 20 July",
    includes: [
      "Everything in Weekend",
      "Riverside camp pitch, Thu 14:00 to Mon 12:00",
      "Hot showers and phone charging",
    ],
    limited: "2,400 pitches",
  },
  {
    id: "weekend-plus",
    name: "Weekend Plus",
    price: 299,
    valid: "Fri 17 — Sun 19 July",
    includes: [
      "Everything in Weekend",
      "Fast-lane entry at Gate A",
      "Glasshouse roof terrace and quiet bar",
      "Locker for three days",
    ],
    limited: "600 wristbands",
  },
  {
    id: "fri",
    name: "Friday",
    price: 79,
    valid: "Fri 17 July, 16:00 — 06:00",
    includes: ["All stages that day"],
    day: "fri",
  },
  {
    id: "sat",
    name: "Saturday",
    price: 89,
    valid: "Sat 18 July, 15:00 — 08:00",
    includes: ["All stages that day"],
    day: "sat",
  },
  {
    id: "sun",
    name: "Sunday",
    price: 69,
    valid: "Sun 19 July, 13:00 — 23:00",
    includes: ["All stages that day"],
    day: "sun",
  },
];

export const addOns = [
  {
    id: "locker",
    name: "Locker, all weekend",
    price: 18,
    text: "Phone-charging locker by the Kantine. Fits a backpack.",
  },
  {
    id: "parking",
    name: "Car park pass",
    price: 25,
    text: "One car, three days, Lot P2. 12 minutes on foot to Gate A.",
  },
  {
    id: "cup",
    name: "Pulse steel cup",
    price: 12,
    text: "Skip the deposit queue. Yours to keep.",
  },
];

export const maxTickets = 6;

export const ticketNotes = [
  "Tickets are personal: each wristband is printed with a name, and you can change it free until 1 July.",
  "Pay in full, or in three equal monthly instalments with no fee.",
  "Pulse is 18+. Bring photo ID that matches the name on your ticket.",
  "Can't come? Resell at face value through your account until 10 July.",
];

/* ------------------------------------------------------------ venue */

export type Place = {
  id: string;
  name: string;
  kind: "Stage" | "Gate" | "Care" | "Food" | "Camp" | "Transport";
  /** Position on the 1000 × 640 site map. */
  x: number;
  y: number;
  text: string;
  stage?: StageId;
};

export const places: Place[] = [
  {
    id: "open-air",
    name: "Open Air",
    kind: "Stage",
    x: 360,
    y: 405,
    stage: "open-air",
    text: "Main field on the riverbank. Viewing platform with step-free ramp on the left side of the sound desk.",
  },
  {
    id: "turbine",
    name: "Turbine",
    kind: "Stage",
    x: 610,
    y: 250,
    stage: "turbine",
    text: "The turbine hall. Entrances on both long sides; the river doors open at 06:00 on Saturday.",
  },
  {
    id: "pumphouse",
    name: "Pumphouse",
    kind: "Stage",
    x: 720,
    y: 330,
    stage: "pumphouse",
    text: "Basement under the courtyard. Staircase only; one in, one out after midnight. Closed Sunday.",
  },
  {
    id: "glasshouse",
    name: "Glasshouse",
    kind: "Stage",
    x: 850,
    y: 170,
    stage: "glasshouse",
    text: "Restored greenhouse on the east lawn. Seated and floor space; step-free entrance on the north side.",
  },
  {
    id: "gate-a",
    name: "Gate A",
    kind: "Gate",
    x: 470,
    y: 70,
    text: "Main entrance from Uferweg. Wristband exchange, fast lane and the box office for day tickets.",
  },
  {
    id: "gate-b",
    name: "Gate B · Camping",
    kind: "Gate",
    x: 110,
    y: 160,
    text: "Between the campsite and the festival. Open Thursday 14:00 to Monday 12:00.",
  },
  {
    id: "camp",
    name: "Riverside Camp",
    kind: "Camp",
    x: 120,
    y: 290,
    text: "2,400 marked pitches, quiet zone in the north-west corner, showers and phone charging at the camp hub.",
  },
  {
    id: "kantine",
    name: "Kantine",
    kind: "Food",
    x: 470,
    y: 300,
    text: "Twelve food stalls, the main bar and free water refill. All vegetarian; half of it vegan.",
  },
  {
    id: "care",
    name: "Care Point",
    kind: "Care",
    x: 540,
    y: 160,
    text: "First aid, welfare, free earplugs, sunscreen and a quiet room. Staffed every hour the site is open.",
  },
  {
    id: "shuttle",
    name: "Shuttle stop",
    kind: "Transport",
    x: 330,
    y: 40,
    text: "Free shuttle to S Ostkreuz every 10 minutes from 15:00, every 20 minutes through the night.",
  },
];

export const gettingThere = [
  {
    title: "S-Bahn",
    text: "S3 or S5 to Rummelsburg, then 8 minutes on foot along Uferweg. Trains run all night at weekends.",
  },
  {
    title: "Shuttle",
    text: "Free buses from S Ostkreuz, Rudolfplatz side, every 10 minutes from 15:00 and every 20 minutes overnight.",
  },
  {
    title: "Bike",
    text: "2,000 staffed bike spaces at Gate A. Free, with a numbered tag; open until the site closes.",
  },
  {
    title: "Car",
    text: "Lot P2 only, with a pass booked in advance. We would rather you didn't — the S-Bahn is quicker.",
  },
];

export const accessInfo = [
  "Step-free routes connect every stage except the Pumphouse; the map marks each ramp.",
  "Raised viewing platforms at Open Air and Turbine, bookable with your ticket.",
  "Free companion ticket for anyone with a support need — email us before 1 July.",
  "Quiet room at the Care Point, open whenever the site is open.",
];

/* ------------------------------------------------------------ FAQ */

export const faqs: { topic: string; q: string; a: string }[] = [
  {
    topic: "Tickets",
    q: "When does the final tier go on sale?",
    a: "The final tier opens on 1 May at 12:00 CET, or earlier if Tier 2 sells out. Prices rise by €30 for weekend tickets and €10 for day tickets.",
  },
  {
    topic: "Tickets",
    q: "Can I pay in instalments?",
    a: "Yes. Choose 'three instalments' at checkout and we take a third today, a third in 30 days and the rest in 60 days. There is no fee and no credit check.",
  },
  {
    topic: "Tickets",
    q: "Can I change the name on my ticket?",
    a: "Free of charge until 1 July from your account. After that, name changes cost €10 and close on 10 July, when wristbands are printed.",
  },
  {
    topic: "Tickets",
    q: "I can't come any more. Can I get a refund?",
    a: "We don't refund, but you can resell at face value on our resale page until 10 July. The buyer pays you; we just change the name.",
  },
  {
    topic: "Entry",
    q: "Is Pulse 18+?",
    a: "Yes, every day and every stage. Bring a passport, national ID card or driving licence that matches the name on your wristband.",
  },
  {
    topic: "Entry",
    q: "What can't I bring in?",
    a: "Glass, aerosols, gas canisters, professional cameras, drones and anything sold or handed out commercially. Sealed water bottles up to 1 litre are welcome.",
  },
  {
    topic: "Entry",
    q: "Is there re-entry?",
    a: "Yes, all weekend. Your wristband is scanned on the way out and back in, so you can go home to sleep on Friday and come back on Saturday.",
  },
  {
    topic: "On site",
    q: "Is it cashless?",
    a: "Fully. Every bar and stall takes cards and phones. If you only have cash, the top-up desk at the Kantine loads a prepaid card and refunds the balance until 31 July.",
  },
  {
    topic: "On site",
    q: "Is drinking water free?",
    a: "Always. There are refill points at every stage, at the Kantine and at the Care Point. Bring an empty bottle or buy a Pulse steel cup.",
  },
  {
    topic: "On site",
    q: "Can I take photos?",
    a: "Phones, yes. The Turbine and Pumphouse are phone-light rooms: stickers go over your camera at the door, and we ask you to keep them there.",
  },
  {
    topic: "Camping",
    q: "When can I arrive at the campsite?",
    a: "Gate B opens on Thursday 16 July at 14:00 and the campsite closes on Monday 20 July at 12:00. Your pitch is marked with your order number.",
  },
  {
    topic: "Camping",
    q: "Can I bring a campervan?",
    a: "Not this year. The riverside field is a protected meadow and we can only use it for tents.",
  },
  {
    topic: "Care",
    q: "What happens at the Care Point?",
    a: "First aid, welfare support, a quiet room, free earplugs and sunscreen. The team is made up of trained medics and volunteers, and nobody there will judge you.",
  },
  {
    topic: "Care",
    q: "How do I report harassment?",
    a: "Tell any staff member in a purple shirt, go to the Care Point or text the Care line on +1 555 0147 3000. We will act on every report, and you never have to give your name.",
  },
  {
    topic: "Access",
    q: "Is the site wheelchair accessible?",
    a: "Every stage except the Pumphouse has a step-free route and a raised viewing platform. Accessible toilets are at every stage and the Kantine, and companion tickets are free.",
  },
];

export const faqTopics = [
  "All",
  "Tickets",
  "Entry",
  "On site",
  "Camping",
  "Care",
  "Access",
] as const;

/* ------------------------------------------------------------ about */

export const about = {
  intro:
    "Pulse started in 2019 as a one-night party in the pump room of a decommissioned waterworks on the Spree, with 380 tickets and a sound system borrowed from three different clubs. Eight years later it is three days, four stages and thirty artists — and it is still run by the same six people who swept that basement.",
  principles: [
    {
      title: "Half the bill, every year",
      text: "Every lineup since 2022 has been at least 50% women and non-binary artists, across every stage and every billing line.",
    },
    {
      title: "Same fee, same rider",
      text: "Support acts are paid within a fixed band of the headliners' fee per hour, and everyone gets the same backstage, the same food and the same hotel.",
    },
    {
      title: "Nothing single-use",
      text: "Steel cups, refill water, reusable plates at every stall and a diesel-free power grid fed by the waterworks' own solar roof.",
    },
    {
      title: "Care is part of the lineup",
      text: "Our Care team is booked before the artists are. Forty trained volunteers per shift, a quiet room and a promise to act on every report.",
    },
  ],
  editions: [
    {
      year: "2019",
      title: "Vol. 01",
      text: "One night in the Pumphouse. 380 tickets, gone in four days.",
    },
    {
      year: "2022",
      title: "Vol. 02",
      text: "Back after two lost summers. The Turbine opens for the first time.",
    },
    {
      year: "2023",
      title: "Vol. 03",
      text: "Two days. The river field becomes the Open Air stage.",
    },
    {
      year: "2024",
      title: "Vol. 04",
      text: "Camping arrives, with 800 pitches on the riverside meadow.",
    },
    {
      year: "2025",
      title: "Vol. 05",
      text: "Three days. The city restores the Glasshouse and lends it to us.",
    },
    {
      year: "2026",
      title: "Vol. 06",
      text: "Solar roof switched on. First edition with no diesel generators.",
    },
    {
      year: "2027",
      title: "Vol. 07",
      text: "Thirty artists, four stages, 14,000 people a day.",
    },
  ],
  team: [
    {
      name: "Lena Brandt",
      role: "Co-founder, programming",
      text: "Books every artist on the bill and still plays the Pumphouse warm-up under a different name.",
    },
    {
      name: "Jonas Achterberg",
      role: "Co-founder, production",
      text: "Built the first Turbine rig from borrowed speakers. Now runs a crew of 140.",
    },
    {
      name: "Selin Kaya",
      role: "Head of Care",
      text: "Trained as a nurse, runs the Care team and has final say over anything that affects safety.",
    },
    {
      name: "Marcus Oyelaran",
      role: "Site and sustainability",
      text: "Designs the site plan every spring and fought for the solar roof for three years.",
    },
    {
      name: "Hanne Vik",
      role: "Tickets and guest services",
      text: "Answers the email you send at 02:00 on a Tuesday. Usually by 09:00.",
    },
    {
      name: "Theo Marchetti",
      role: "Visual identity",
      text: "Draws the poster, the wristbands and every sign on site by hand first.",
    },
  ],
};

/* ------------------------------------------------------------ home */

export const home = {
  intro:
    "Thirty artists across a riverside meadow, a turbine hall, a basement pump room and a glass greenhouse. Every stage has its own hours and its own mood, and nothing clashes with the S-Bahn home.",
  manifesto: ["Come as you are.", "Leave a little different."],
  manifestoText:
    "No VIP fence in front of the stage, no phones in the Turbine, no single-use anything. Just good sound, a Care team that is always on, and the river at sunrise.",
  care: [
    {
      title: "Care Point",
      text: "First aid, welfare and a quiet room, open every hour the site is open.",
    },
    {
      title: "Phone-light rooms",
      text: "Stickers over your camera in the Turbine and Pumphouse. Look up instead.",
    },
    {
      title: "Free water, everywhere",
      text: "Refill points at every stage and a steel cup system instead of plastic.",
    },
  ],
};

export const newsletter = {
  title: "First to know",
  text: "Lineup drops, final-tier warnings and set times, a few emails a year.",
};

export const footerColumns = [
  {
    title: "Festival",
    links: [
      { to: "/lineup", label: "Lineup" },
      { to: "/timetable", label: "Timetable builder" },
      { to: "/venue", label: "Venue & map" },
    ],
  },
  {
    title: "Tickets",
    links: [
      { to: "/tickets", label: "Ticket tiers" },
      { to: "/tickets/checkout", label: "Checkout" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Pulse",
    links: [
      { to: "/about", label: "About" },
      { to: "/", label: "Home" },
    ],
  },
];
