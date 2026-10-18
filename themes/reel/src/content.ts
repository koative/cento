import ghostDiver from "./assets/ghost-diver.jpg";
import ghostCrab from "./assets/ghost-crab.jpg";
import ghostDeck from "./assets/ghost-deck.jpg";
import soilFarmer from "./assets/soil-farmer.jpg";
import soilHarvest from "./assets/soil-harvest.jpg";
import soilHands from "./assets/soil-hands.jpg";
import pastureFlock from "./assets/pasture-flock.jpg";
import pasturePlain from "./assets/pasture-plain.jpg";
import deepCrew from "./assets/deep-crew.jpg";
import deepCanyon from "./assets/deep-canyon.jpg";
import fieldRecordist from "./assets/field-recordist.jpg";
import fieldRiver from "./assets/field-river.jpg";
import setCamera from "./assets/set-camera.jpg";
import editFlatbed from "./assets/edit-flatbed.jpg";
import edit1985 from "./assets/edit-1985.jpg";
import seatsImg from "./assets/seats.jpg";
import archiveImg from "./assets/archive.jpg";
import screenTwo from "./assets/screen-two.jpg";
import projectorImg from "./assets/projector.jpg";
import lastTrain from "./assets/last-train.jpg";

/* ------------------------------------------------------------ types */

export type Img = { src: string; alt: string; w: number; h: number };
export type Link = { to: string; label: string };

export type Status =
  "Released" | "In post-production" | "In production" | "In development";
export type Subject = "Environment" | "Land & labour" | "Science" | "Culture";

/** One shot of a trailer: a still, a slow move across it (x %, y %, scale), and an optional subtitle line. */
export type Shot = {
  img: Img;
  dur: number;
  from: [number, number, number];
  to: [number, number, number];
  line?: string;
  who?: string;
};

export type Film = {
  slug: string;
  title: string;
  year: number;
  runtime: number;
  form: "Feature" | "Short";
  status: Status;
  subject: Subject;
  logline: string;
  synopsis: string[];
  statement: string;
  director: string;
  location: string;
  format: string;
  language: string;
  release: string;
  still: Img;
  stills: Img[];
  credits: { role: string; name: string }[];
  festivals: string[];
  press?: { quote: string; source: string };
  trailer: Shot[];
};

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Reel",
  tagline: "Documentaries made slowly, with the people in them.",
  email: "hello@reel.example",
  pressEmail: "press@reel.example",
  distributionEmail: "screenings@reel.example",
  phone: "+1 555 0142 880",
  phoneHref: "tel:+15550142880",
  address: ["Unit 4, Ropewalk Yard", "Bristol BS1 6XN"],
  hours: "Studio open Mon–Thu, 10am – 6pm",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "Letterboxd", href: "https://letterboxd.com/" },
  ],
};

export const nav: Link[] = [
  { to: "/films", label: "Films" },
  { to: "/screenings", label: "Screenings" },
  { to: "/services", label: "Services" },
  { to: "/studio", label: "Studio" },
  { to: "/contact", label: "Contact" },
];

export const headerCta: Link = {
  to: "/contact?type=screening",
  label: "Host a screening",
};

/* ------------------------------------------------------------ images */

export const img = {
  setCamera: {
    src: setCamera,
    alt: "A cinema camera on a tripod and dolly beside a forest track, monitor and lens case on a cart",
    w: 1800,
    h: 1200,
  },
  editFlatbed: {
    src: editFlatbed,
    alt: "Close-up of a flatbed editing table, its viewing screen lit and film plates loaded",
    w: 1800,
    h: 1350,
  },
  edit1985: {
    src: edit1985,
    alt: "An editor at a flatbed editing table in 1985, reels and splicing tape around her",
    w: 1800,
    h: 1226,
  },
  seats: {
    src: seatsImg,
    alt: "Rows of red cinema seats in a darkened auditorium, wall lamps glowing",
    w: 1800,
    h: 1200,
  },
  deepCrew: {
    src: deepCrew,
    alt: "A film crew with camera and boom recording volunteers kneeling over a dig site in the desert",
    w: 1800,
    h: 1013,
  },
} satisfies Record<string, Img>;

const s = (src: string, alt: string, w: number, h: number): Img => ({
  src,
  alt,
  w,
  h,
});

const ghost = {
  diver: s(
    ghostDiver,
    "A diver in a red mask surfaces beside an orange marker buoy in open water",
    1024,
    652,
  ),
  crab: s(
    ghostCrab,
    "A crab caught in a tangle of blue and green nylon net hauled up from a wreck",
    1024,
    768,
  ),
  deck: s(
    ghostDeck,
    "Divers in drysuits sit kitted up on the deck of a dive boat, cylinders racked behind them",
    1024,
    652,
  ),
};
const soil = {
  farmer: s(
    soilFarmer,
    "A farmer in a cap leans on a rusted gate at the edge of a green field",
    1024,
    678,
  ),
  harvest: s(
    soilHarvest,
    "A wooden bushel basket full of freshly dug sweet potatoes on the soil",
    1024,
    850,
  ),
  hands: s(
    soilHands,
    "Two people's hands resting on their knees during a conversation at a market stall",
    1024,
    683,
  ),
};
const pasture = {
  flock: s(
    pastureFlock,
    "A young boy with a stick drives a flock of black and white sheep across a stony track",
    1024,
    680,
  ),
  plain: s(
    pasturePlain,
    "A bare plain of grey gravel under a low cloud ceiling, mountains on the horizon",
    1600,
    900,
  ),
};
const deep = {
  crew: img.deepCrew,
  canyon: s(
    deepCanyon,
    "Red sandstone buttes and boulders across a high desert plateau under scattered cloud",
    1800,
    1106,
  ),
};
const field = {
  recordist: s(
    fieldRecordist,
    "A sound recordist in headphones crouches by a road barrier, adjusting a recorder",
    1800,
    1200,
  ),
  river: s(
    fieldRiver,
    "A fast river running through a pine-lined gorge, rocks in the foreground",
    1800,
    1199,
  ),
};
const house = {
  archive: s(
    archiveImg,
    "A black and white photograph of a vast 1930s auditorium, balconies and rows of seats facing the screen",
    1300,
    988,
  ),
  screen: s(
    screenTwo,
    "A small black and white cinema seen from the balcony, a blank screen and curtains at the far end",
    1800,
    1296,
  ),
  projector: s(
    projectorImg,
    "A heavy grey 35 mm projector in a projection booth, film cans stacked beneath it",
    1500,
    1125,
  ),
  seats: img.seats,
};
const freight = {
  yard: s(
    lastTrain,
    "A station at night from above, empty platforms and rails lit by a line of lamps",
    1600,
    1200,
  ),
};

/* ------------------------------------------------------------ films */

export const subjects: Subject[] = [
  "Environment",
  "Land & labour",
  "Science",
  "Culture",
];
export const statuses: Status[] = [
  "Released",
  "In post-production",
  "In production",
  "In development",
];

export const films: Film[] = [
  {
    slug: "ghost-gear",
    title: "Ghost Gear",
    year: 2025,
    runtime: 88,
    form: "Feature",
    status: "Released",
    subject: "Environment",
    logline:
      "Three winters with the volunteer divers who cut lost fishing nets off the wrecks of the North Sea, one bag at a time.",
    synopsis: [
      "Somewhere under the water off the Berwickshire coast there are more than four hundred kilometres of abandoned net, still fishing. Every weekend from October to March a group of twelve volunteer divers goes down to cut it free: a plumber, a retired GP, a twenty-two-year-old marine biology student, a father and son who barely speak on the boat.",
      "Ghost Gear follows them for three seasons, through cancelled dives and swollen seas, through the arguments about whether any of it matters, and through the morning they bring up a net with a grey seal still alive inside it.",
      "Filmed on the boat, on the quay and at depth with a two-person underwater unit, it is a film about what a small group of people decide to be responsible for.",
    ],
    statement:
      "I wanted to make a film about care that never got sentimental about it. These divers are funny, stubborn and often cold. The nets do not care that they are there. That gap is the film.",
    director: "Mairi Lennox",
    location: "Berwickshire & Cornwall, UK",
    format: "4K · 1.85:1 · 5.1",
    language: "English",
    release: "UK cinemas from 14 November 2025, touring through spring 2027",
    still: ghost.diver,
    stills: [ghost.diver, ghost.deck, ghost.crab],
    credits: [
      { role: "Director", name: "Mairi Lennox" },
      { role: "Producer", name: "Tomás Okafor-Reyes" },
      { role: "Cinematography", name: "Dev Raman" },
      { role: "Underwater camera", name: "Freya Tolland" },
      { role: "Editor", name: "Ines Calder" },
      { role: "Sound", name: "Hollis Brand" },
      { role: "Music", name: "The Saltmarsh Quartet" },
    ],
    festivals: [
      "Saltire Documentary Festival 2025 — Grand Jury nominee",
      "North Sea Docs, Aberdeen 2025",
      "Øresund Nonfiction Days 2025 — Audience Award",
      "Riverside Documentary Week 2025",
    ],
    press: {
      quote:
        "You come up from it the way the divers do: slowly, a little stunned, grateful for air.",
      source: "The Northern Review",
    },
    trailer: [
      {
        img: ghost.deck,
        dur: 6,
        from: [4, 0, 1.12],
        to: [-3, 2, 1.04],
        who: "Skipper",
        line: "Ten minutes. If the swell's up we go home.",
      },
      {
        img: ghost.diver,
        dur: 7,
        from: [0, 3, 1.04],
        to: [2, -2, 1.16],
        line: "There's four hundred kilometres of it down there. Nobody's coming for it.",
      },
      {
        img: ghost.crab,
        dur: 7,
        from: [0, 0, 1.25],
        to: [0, 0, 1.05],
        line: "Everything that goes in there stays in there. It just keeps fishing.",
      },
      {
        img: ghost.deck,
        dur: 6,
        from: [-5, -2, 1.22],
        to: [2, 1, 1.1],
        who: "Ruth, retired GP",
        line: "You cut, you bag, you lift. And then you do it again.",
      },
      {
        img: ghost.diver,
        dur: 7,
        from: [-3, -2, 1.25],
        to: [0, 0, 1.06],
        who: "Callum, 22",
        line: "My mates think I'm mad. Most Saturdays I agree with them.",
      },
    ],
  },
  {
    slug: "what-the-soil-keeps",
    title: "What the Soil Keeps",
    year: 2026,
    runtime: 74,
    form: "Feature",
    status: "In post-production",
    subject: "Land & labour",
    logline:
      "A year on a forty-acre market farm, as a father prepares to hand it to the daughter who left.",
    synopsis: [
      "Warren Pike has grown vegetables on the same forty acres for thirty-one years. His daughter Jess left for the city at eighteen and came back at thirty-four with a business plan, a partner and no patience for the way things have always been done.",
      "Across one growing year — from seed potatoes in March to the last sweet potatoes in November — the film watches them work out who the farm belongs to, alongside the seasonal crew who make the harvest possible and are rarely asked what they think.",
    ],
    statement:
      "Farming films are usually about loss. This one is about handing something over while you are both still alive to argue about it.",
    director: "Ana Lucía Brett",
    location: "Somerset Levels, UK",
    format: "4K · 1.85:1 · 5.1",
    language: "English, Polish, Romanian",
    release: "Picture lock December 2026 · festival premiere spring 2027",
    still: soil.farmer,
    stills: [soil.farmer, soil.harvest, soil.hands],
    credits: [
      { role: "Director", name: "Ana Lucía Brett" },
      { role: "Producer", name: "Tomás Okafor-Reyes" },
      { role: "Cinematography", name: "Dev Raman" },
      { role: "Editor", name: "Ines Calder" },
      { role: "Sound", name: "Hollis Brand" },
    ],
    festivals: ["Øresund Nonfiction Days 2026 — work-in-progress selection"],
    trailer: [
      {
        img: soil.farmer,
        dur: 7,
        from: [4, 0, 1.15],
        to: [-2, 0, 1.04],
        who: "Warren",
        line: "Thirty-one years. I know where every stone in that field is.",
      },
      {
        img: soil.hands,
        dur: 6,
        from: [0, 0, 1.2],
        to: [0, 0, 1.06],
        who: "Jess",
        line: "You know where the stones are. You don't know what it costs.",
      },
      {
        img: soil.harvest,
        dur: 7,
        from: [0, -3, 1.06],
        to: [0, 3, 1.18],
        line: "A teaser cut. The finished film arrives in 2027.",
      },
      { img: soil.farmer, dur: 6, from: [-4, 2, 1.25], to: [0, 0, 1.1] },
    ],
  },
  {
    slug: "deep-time",
    title: "Deep Time",
    year: 2024,
    runtime: 96,
    form: "Feature",
    status: "Released",
    subject: "Science",
    logline:
      "A volunteer fossil dig on a desert plateau, where a season's work can come down to a single afternoon.",
    synopsis: [
      "Every May a palaeontologist with a grant that barely covers the fuel drives twenty volunteers into the high desert to dig. Some are students. Most are retired. One is a fourteen-year-old who wrote her a letter.",
      "Deep Time stays with the crew for a full field season: the heat, the sieving, the long silences, the arguments about a jawbone that may or may not be what they hope. It is a film about patience, and about how strange and moving it is to hold something that has waited seventy-five million years for you.",
    ],
    statement:
      "We shot almost everything at the speed of the dig. If the crew spent four hours on a square metre, so did we. The film earns its one big moment because it never pretends there are others.",
    director: "Mairi Lennox",
    location: "High desert plateau, Utah, US",
    format: "4K · 2.39:1 · 5.1",
    language: "English",
    release: "Streaming worldwide and available for community licence",
    still: deep.crew,
    stills: [deep.crew, deep.canyon],
    credits: [
      { role: "Director", name: "Mairi Lennox" },
      { role: "Producer", name: "Saoirse Nwachukwu" },
      { role: "Cinematography", name: "Dev Raman" },
      { role: "Editor", name: "Ines Calder" },
      { role: "Sound", name: "Hollis Brand" },
      { role: "Archive producer", name: "Pieter Hals" },
    ],
    festivals: [
      "Great Lakes Documentary Festival 2024 — Special Jury Mention",
      "Elbe Nonfiction Week 2024",
      "Saltire Documentary Festival 2024",
    ],
    press: {
      quote:
        "A film with the nerve to be slow, and the reward of a final ten minutes you will not forget.",
      source: "Field & Frame",
    },
    trailer: [
      {
        img: deep.canyon,
        dur: 7,
        from: [-5, 0, 1.15],
        to: [5, 0, 1.15],
        line: "Seventy-five million years ago, this was a coastline.",
      },
      {
        img: deep.crew,
        dur: 7,
        from: [3, 2, 1.18],
        to: [-2, 0, 1.05],
        who: "Dr Lena Harrow",
        line: "We have six weeks and a sieve. That's the whole budget.",
      },
      {
        img: deep.canyon,
        dur: 6,
        from: [0, 4, 1.3],
        to: [0, -2, 1.12],
        who: "Iris, 14",
        line: "I wrote to her. I didn't think she'd write back.",
      },
      {
        img: deep.crew,
        dur: 7,
        from: [-6, 0, 1.35],
        to: [-2, 2, 1.2],
        line: "Don't touch it. Nobody breathe on it.",
      },
    ],
  },
  {
    slug: "the-picture-house",
    title: "The Picture House",
    year: 2023,
    runtime: 62,
    form: "Feature",
    status: "Released",
    subject: "Culture",
    logline:
      "The last year of a 1936 single-screen cinema, told by its projectionist, its regulars and ninety years of its archive.",
    synopsis: [
      "The Regal opened in 1936 with seventeen hundred seats. By the time we arrived it had two hundred and forty, a projectionist who had worked there since 1979, and a closing date.",
      "Built from twelve months in the booth and the auditorium and from the cinema's own archive of programmes, letters and home movies, The Picture House is a film about what a room full of strangers in the dark is for.",
    ],
    statement:
      "Everyone in this film is trying to keep something going a bit longer. So were we. We screened the finished film in the Regal on its last night.",
    director: "Pieter Hals",
    location: "Lancashire, UK",
    format: "2K and archive 16 mm · 1.66:1 · stereo",
    language: "English",
    release: "Educational and community licences available",
    still: house.archive,
    stills: [house.archive, house.projector, house.screen, house.seats],
    credits: [
      { role: "Director", name: "Pieter Hals" },
      { role: "Producer", name: "Saoirse Nwachukwu" },
      { role: "Cinematography", name: "Dev Raman" },
      { role: "Editor", name: "Ines Calder" },
      { role: "Archive", name: "The Regal Trust" },
    ],
    festivals: [
      "Clydeside Film Festival 2023",
      "Lumen Archive Festival 2023 — Documents section",
      "Pennine Film Week 2023",
    ],
    press: {
      quote: "A love letter that refuses to be only that.",
      source: "Picturegoer Quarterly",
    },
    trailer: [
      {
        img: house.archive,
        dur: 7,
        from: [0, 4, 1.05],
        to: [0, -2, 1.18],
        line: "Seventeen hundred seats. Opening night, 1936.",
      },
      {
        img: house.projector,
        dur: 6,
        from: [3, 0, 1.2],
        to: [-2, 0, 1.06],
        who: "Frank, projectionist",
        line: "I came for the summer in 1979. Never left.",
      },
      {
        img: house.screen,
        dur: 6,
        from: [0, 0, 1.04],
        to: [0, 0, 1.2],
        who: "A regular",
        line: "My mum met my dad in row K.",
      },
      {
        img: house.seats,
        dur: 7,
        from: [-4, 0, 1.15],
        to: [3, 0, 1.08],
        line: "Last show. Saturday. Everyone's welcome.",
      },
    ],
  },
  {
    slug: "winter-pasture",
    title: "Winter Pasture",
    year: 2024,
    runtime: 31,
    form: "Short",
    status: "Released",
    subject: "Land & labour",
    logline:
      "A nine-year-old's first winter bringing his family's flock down from the high ground.",
    synopsis: [
      "Every November Aziz's family moves four hundred sheep and goats from the summer pastures to the valley. This year, for the first time, he walks the whole way.",
      "Shot over eleven days with a crew of two, Winter Pasture is a short film told almost entirely without dialogue, from the height of a nine-year-old.",
    ],
    statement:
      "We put the camera at his eye level and kept it there. Everything big in the film is big because it was big to him.",
    director: "Dev Raman",
    location: "Central Asian highlands",
    format: "4K · 1.85:1 · stereo",
    language: "Kyrgyz, with English subtitles",
    release:
      "Online on the studio's channel and available for educational licence",
    still: pasture.flock,
    stills: [pasture.flock, pasture.plain],
    credits: [
      { role: "Director & camera", name: "Dev Raman" },
      { role: "Producer", name: "Tomás Okafor-Reyes" },
      { role: "Editor", name: "Ines Calder" },
      { role: "Sound", name: "Hollis Brand" },
    ],
    festivals: [
      "Harbour Lights Short Film Festival 2024 — Best Documentary Short",
      "Brief Encounters Shorts 2024",
      "Northern Lights Shorts 2025",
    ],
    trailer: [
      {
        img: pasture.plain,
        dur: 7,
        from: [-4, 0, 1.12],
        to: [4, 0, 1.12],
        line: "Eleven days. Four hundred animals. One boy.",
      },
      {
        img: pasture.flock,
        dur: 7,
        from: [4, 2, 1.2],
        to: [-2, 0, 1.05],
        who: "Aziz",
        line: "My father says the sheep know the way. I don't think they do.",
      },
      { img: pasture.plain, dur: 6, from: [0, -3, 1.3], to: [0, 2, 1.1] },
    ],
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    year: 2027,
    runtime: 80,
    form: "Feature",
    status: "In production",
    subject: "Environment",
    logline:
      "A sound recordist spends a year capturing a river valley before a reservoir drowns it.",
    synopsis: [
      "When the water authority confirmed the valley would be flooded in 2028, sound recordist June Okoro moved into a caravan at the head of it with eleven microphones and a promise to herself: record everything, from the dawn chorus to the last tractor.",
      "Field Notes is being shot alongside her across four seasons. The film's soundtrack will be built entirely from her recordings.",
    ],
    statement:
      "Most films about a place being lost are made afterwards. We are trying to make one while it is still there, and to let the sound lead the picture.",
    director: "Hollis Brand",
    location: "Upper Teme valley, UK",
    format: "4K · 1.85:1 · Dolby Atmos",
    language: "English",
    release: "Shooting through autumn 2026 · release 2027",
    still: field.recordist,
    stills: [field.recordist, field.river],
    credits: [
      { role: "Director", name: "Hollis Brand" },
      { role: "Producer", name: "Saoirse Nwachukwu" },
      { role: "Cinematography", name: "Dev Raman" },
    ],
    festivals: ["Development support, Northern Documentary Fund 2025"],
    trailer: [
      {
        img: field.river,
        dur: 7,
        from: [0, 0, 1.06],
        to: [0, 0, 1.2],
        line: "Listen to it while you can.",
      },
      {
        img: field.recordist,
        dur: 7,
        from: [-3, 2, 1.2],
        to: [2, 0, 1.06],
        who: "June Okoro",
        line: "Eleven microphones. One year. Then it's under forty metres of water.",
      },
      { img: field.river, dur: 6, from: [5, -2, 1.25], to: [-3, 2, 1.15] },
    ],
  },
  {
    slug: "night-freight",
    title: "Night Freight",
    year: 2028,
    runtime: 90,
    form: "Feature",
    status: "In development",
    subject: "Land & labour",
    logline:
      "The people who move a country's goods while it sleeps: one winter on the overnight rail freight shift.",
    synopsis: [
      "Between 10pm and 6am the rail network belongs to freight: aggregates, containers, fuel, post. Night Freight will follow a driver, a shunter and a signaller through one winter of overnight shifts on a single line.",
      "We are in research and access, and looking for a co-production partner.",
    ],
    statement:
      "The night shift is where a lot of the country's work happens and almost none of its stories. We want to change the proportion.",
    director: "Ana Lucía Brett",
    location: "Northern England",
    format: "To be confirmed",
    language: "English",
    release: "Seeking co-production partners for 2027 shoot",
    still: freight.yard,
    stills: [freight.yard],
    credits: [
      { role: "Director", name: "Ana Lucía Brett" },
      { role: "Producer", name: "Tomás Okafor-Reyes" },
    ],
    festivals: [],
    trailer: [
      {
        img: freight.yard,
        dur: 7,
        from: [-4, 3, 1.25],
        to: [3, -2, 1.08],
        line: "A proof-of-concept teaser from our research shoot.",
      },
      {
        img: freight.yard,
        dur: 7,
        from: [4, -2, 1.4],
        to: [0, 0, 1.15],
        who: "Signaller",
        line: "From ten till six the line is ours. Nobody sees us.",
      },
    ],
  },
];

export const flagship = films[0];

/* ------------------------------------------------------------ team */

export type Person = {
  name: string;
  role: string;
  bio: string;
  films: string[];
};

export const team: Person[] = [
  {
    name: "Mairi Lennox",
    role: "Founder · Director",
    bio: "Started Reel in 2014 after ten years cutting news packages. Directs one feature every three years, on purpose.",
    films: ["ghost-gear", "deep-time"],
  },
  {
    name: "Tomás Okafor-Reyes",
    role: "Producer · Managing director",
    bio: "Runs the money, the contracts and the calendar. Before Reel he produced factual series for public broadcasters.",
    films: [
      "ghost-gear",
      "what-the-soil-keeps",
      "winter-pasture",
      "night-freight",
    ],
  },
  {
    name: "Saoirse Nwachukwu",
    role: "Producer · Impact & distribution",
    bio: "Builds the tours, the community licences and the classroom packs that keep our films working after release.",
    films: ["deep-time", "the-picture-house", "field-notes"],
  },
  {
    name: "Ines Calder",
    role: "Editor",
    bio: "Has cut every Reel feature. Works on a long table with index cards before she touches the timeline.",
    films: ["ghost-gear", "deep-time", "the-picture-house"],
  },
  {
    name: "Dev Raman",
    role: "Cinematographer · Director",
    bio: "Shoots handheld, close and low. Directed Winter Pasture with a crew of two and a borrowed donkey.",
    films: ["winter-pasture", "ghost-gear", "deep-time"],
  },
  {
    name: "Hollis Brand",
    role: "Sound · Director",
    bio: "Location sound and mix on every film since 2016. Now directing Field Notes, a film built from sound first.",
    films: ["field-notes"],
  },
  {
    name: "Pieter Hals",
    role: "Archive producer · Director",
    bio: "Finds, licenses and restores archive. Directed The Picture House from a cinema's own boxes of paper.",
    films: ["the-picture-house"],
  },
  {
    name: "Ana Lucía Brett",
    role: "Director · Development",
    bio: "Leads development and our slate of new ideas. Directing What the Soil Keeps and Night Freight.",
    films: ["what-the-soil-keeps", "night-freight"],
  },
];

/* ------------------------------------------------------------ services */

export type Service = {
  id: string;
  name: string;
  summary: string;
  includes: string[];
  timeline: string;
  from: string;
  /** Which enquiry type the contact form opens with. */
  enquiry: "commission" | "coproduction" | "screening" | "other";
};

export const services: Service[] = [
  {
    id: "commission",
    enquiry: "commission",
    name: "Commissioned documentaries",
    summary:
      "Feature and short documentaries for broadcasters, foundations and charities who want a film with editorial independence, not a campaign video.",
    includes: [
      "Research, access and contributor agreements",
      "Full crew: camera, sound, producer",
      "Edit, grade, mix and deliverables to broadcast spec",
      "Festival strategy for the first year",
    ],
    timeline: "Shorts 4–8 months · features 18–36 months",
    from: "Shorts from £28,000 · features from £180,000",
  },
  {
    id: "coproduction",
    enquiry: "coproduction",
    name: "Co-production",
    summary:
      "We bring the story, the access and the crew; partners bring finance, territory or a broadcaster. We co-produce two films a year at most.",
    includes: [
      "Shared development and pitch materials",
      "Split delivery by territory",
      "Joint festival and sales strategy",
    ],
    timeline: "Agreed per project",
    from: "Budget shares by negotiation",
  },
  {
    id: "impact",
    enquiry: "screening",
    name: "Impact & screening tours",
    summary:
      "Turning a finished documentary into a year of conversations: community screenings, Q&As, education packs and policy briefings.",
    includes: [
      "Tour booking and venue packs",
      "Discussion guides and classroom resources",
      "Speaker and contributor travel",
      "Audience surveys and an impact report",
    ],
    timeline: "6–18 months after release",
    from: "From £14,000",
  },
  {
    id: "archive",
    enquiry: "other",
    name: "Archive research & clearance",
    summary:
      "Finding the footage, photographs and paper your film needs, then licensing and restoring it properly.",
    includes: [
      "Archive searches across national and regional collections",
      "Rights clearance and licence negotiation",
      "Scanning and restoration of film and paper",
    ],
    timeline: "From two weeks",
    from: "£650 per day",
  },
  {
    id: "post",
    enquiry: "other",
    name: "Edit & finishing",
    summary:
      "Our two edit suites, colour room and mix stage, with or without our editors and sound team.",
    includes: [
      "Offline edit suite with editor",
      "Colour grade and online",
      "5.1 and stereo mix",
      "Subtitles, captions and audio description",
    ],
    timeline: "Booked by the week",
    from: "Suite with editor £780 per day",
  },
];

export const rateCard: { item: string; unit: string; price: number }[] = [
  { item: "Edit suite with editor", unit: "day", price: 780 },
  { item: "Edit suite, dry hire", unit: "day", price: 240 },
  { item: "Colour grade with colourist", unit: "day", price: 950 },
  { item: "Mix stage with re-recording mixer", unit: "day", price: 880 },
  { item: "Archive researcher", unit: "day", price: 650 },
  { item: "Two-person shoot crew with kit", unit: "day", price: 1450 },
];

export const process: { step: string; time: string; text: string }[] = [
  {
    step: "Research & access",
    time: "3–9 months",
    text: "We spend time with people before we film them. Nobody is recorded until they understand what the film is and what it is not.",
  },
  {
    step: "Shoot",
    time: "40–120 days over one to three years",
    text: "Small crews, long stretches, the same faces. We go back until the camera is the least interesting thing in the room.",
  },
  {
    step: "Edit",
    time: "6–10 months",
    text: "Story finds its shape on the index-card table, then on the timeline. Contributors see a cut before picture lock and can ask us to change anything that is factually wrong or unsafe.",
  },
  {
    step: "Finishing",
    time: "6–10 weeks",
    text: "Grade, mix, captions and audio description in-house, delivered to broadcast and cinema specifications.",
  },
  {
    step: "Release & impact",
    time: "12–24 months",
    text: "Festivals first, then cinemas, broadcast and the screening tour. We take the film back to the place it came from before anywhere else.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "Do you accept pitches from outside the studio?",
    a: "Yes, twice a year — in February and September. Send a one-page treatment and, if you have it, five minutes of footage through the contact form. We read everything and reply within six weeks.",
  },
  {
    q: "Do contributors see the film before it is released?",
    a: "Always. Every contributor sees the film before picture lock and before anyone else outside the studio. They can ask us to change anything factually wrong or anything that would put them at risk.",
  },
  {
    q: "Do you pay people who appear in your films?",
    a: "We pay for people's time when filming takes them away from work, and cover travel and expenses for screenings and Q&As. We do not pay for stories.",
  },
  {
    q: "Can we show one of your films in a classroom?",
    a: "Yes. An educational licence covers a whole school or university department for a year, and comes with a discussion guide. See screenings for the licence options.",
  },
  {
    q: "What does a community screening cost?",
    a: "A community licence for up to 100 seats is £95, including the poster pack and a discussion guide. Registered charities and groups showing for free can ask for a waiver.",
  },
  {
    q: "Do you work outside the UK?",
    a: "Regularly. Deep Time and Winter Pasture were shot abroad with local fixers and co-producers, who are credited and paid at UK rates.",
  },
];

/* ------------------------------------------------------------ screenings */

export type ScreeningKind = "Premiere" | "Q&A" | "Festival" | "Community";
export type Screening = {
  id: string;
  date: string;
  time: string;
  film: string;
  city: string;
  venue: string;
  kind: ScreeningKind;
  note: string;
  tickets: "On sale" | "Free entry" | "Sold out" | "Few left";
};

export const screenings: Screening[] = [
  {
    id: "s1",
    date: "2026-10-24",
    time: "19:30",
    film: "ghost-gear",
    city: "Bristol",
    venue: "The Ropewalk Picturehouse",
    kind: "Q&A",
    note: "With director Mairi Lennox and two of the divers",
    tickets: "Sold out",
  },
  {
    id: "s2",
    date: "2026-10-29",
    time: "18:45",
    film: "deep-time",
    city: "Edinburgh",
    venue: "Calton Street Film Club",
    kind: "Community",
    note: "Hosted by the Lothian Geological Society",
    tickets: "Free entry",
  },
  {
    id: "s3",
    date: "2026-11-02",
    time: "20:00",
    film: "ghost-gear",
    city: "Plymouth",
    venue: "Barbican Quay Arts Centre",
    kind: "Q&A",
    note: "With producer Tomás Okafor-Reyes",
    tickets: "Few left",
  },
  {
    id: "s4",
    date: "2026-11-08",
    time: "14:00",
    film: "the-picture-house",
    city: "Preston",
    venue: "St John's Hall",
    kind: "Community",
    note: "Matinee with tea, hosted by a cinema heritage group",
    tickets: "Free entry",
  },
  {
    id: "s5",
    date: "2026-11-13",
    time: "21:15",
    film: "what-the-soil-keeps",
    city: "Copenhagen",
    venue: "Øresund Festival Cinema 3",
    kind: "Premiere",
    note: "Work-in-progress screening for industry and press",
    tickets: "On sale",
  },
  {
    id: "s6",
    date: "2026-11-19",
    time: "19:00",
    film: "ghost-gear",
    city: "Eyemouth",
    venue: "Harbour Community Hall",
    kind: "Community",
    note: "Hometown screening with the dive team",
    tickets: "Free entry",
  },
  {
    id: "s7",
    date: "2026-11-27",
    time: "18:30",
    film: "winter-pasture",
    city: "London",
    venue: "The Long Room, Wharf Arts Centre",
    kind: "Festival",
    note: "Short film programme: Coming of Age",
    tickets: "On sale",
  },
  {
    id: "s8",
    date: "2026-12-04",
    time: "19:30",
    film: "deep-time",
    city: "Manchester",
    venue: "The Mill Cinema, Screen 4",
    kind: "Q&A",
    note: "With editor Ines Calder",
    tickets: "On sale",
  },
  {
    id: "s9",
    date: "2026-12-11",
    time: "19:00",
    film: "the-picture-house",
    city: "Glasgow",
    venue: "The Kelvin Hall Cinema Club",
    kind: "Q&A",
    note: "With director Pieter Hals and the Regal's projectionist",
    tickets: "Few left",
  },
  {
    id: "s10",
    date: "2027-01-22",
    time: "20:00",
    film: "ghost-gear",
    city: "Falmouth",
    venue: "The Quay Institute",
    kind: "Q&A",
    note: "Followed by a talk on marine litter",
    tickets: "On sale",
  },
  {
    id: "s11",
    date: "2027-02-05",
    time: "19:30",
    film: "deep-time",
    city: "Cardiff",
    venue: "Castle Arcade Cinema",
    kind: "Community",
    note: "Hosted by a university outreach programme",
    tickets: "Free entry",
  },
  {
    id: "s12",
    date: "2027-03-12",
    time: "18:00",
    film: "what-the-soil-keeps",
    city: "Sheffield",
    venue: "Saltire Documentary Festival",
    kind: "Festival",
    note: "UK premiere, subject to selection",
    tickets: "On sale",
  },
];

export const licences: {
  name: string;
  who: string;
  price: string;
  includes: string;
}[] = [
  {
    name: "Community",
    who: "Clubs, societies, libraries and village halls, up to 100 seats",
    price: "£95",
    includes: "One screening, poster pack, discussion guide",
  },
  {
    name: "Education",
    who: "A whole school, college or university department for 12 months",
    price: "£150",
    includes: "Unlimited classroom screenings, teaching notes",
  },
  {
    name: "Cinema",
    who: "Independent cinemas and touring circuits",
    price: "Box-office split",
    includes: "DCP, trailer, press kit and filmmaker Q&A on request",
  },
  {
    name: "Festival",
    who: "Film festivals and conferences",
    price: "On request",
    includes: "Screening copy, captions, guest liaison",
  },
];

/* ------------------------------------------------------------ page copy */

export const home = {
  title: "Documentaries that stay in the room",
  intro:
    "Reel is an independent documentary company in Bristol. We make one or two films a year, spend years with the people in them, and take every film back to where it was made.",
  nowShowing: {
    heading: "Ghost Gear is on tour",
    text: "Our 2025 feature is travelling to harbour towns, art centres and festival screens through spring 2027. Most dates include a Q&A with the film's divers.",
  },
  slate: {
    heading: "The slate",
    text: "Seven films: four out in the world, three on the way.",
  },
  board: {
    heading: "On the production board",
    text: "Where each film in progress actually is this month.",
    stages: ["Development", "Production", "Post-production", "Release"],
  },
  approach: {
    heading: "Slow access. Shared cuts. Home screenings first.",
    paragraphs: [
      "We do not parachute in. A Reel film usually begins with a year of visits before the camera comes out, and the crew stays small enough to fit in a kitchen.",
      "Everyone who appears in one of our films sees it before it is locked. And the first public screening is always in the place where it was made — the harbour hall, the village cinema, the dig-site campsite.",
    ],
  },
  services: {
    heading: "Work with the studio",
    text: "We take on a few commissions and co-productions each year, run screening tours for other filmmakers and hire out our edit, grade and mix rooms.",
  },
  festivalsHeading: "Where the films have played",
  close: {
    heading: "Bring a film to your town",
    text: "A community licence starts at £95 and comes with posters, a discussion guide and, often, someone from the film.",
  },
};

export const studio = {
  title: "The studio",
  intro:
    "Eight people, two edit suites, a mix room and a long table covered in index cards, above a former rope works by Bristol's harbour.",
  story: [
    "Mairi Lennox started Reel in 2014 with a second-hand camera, a grant for a short film about a lifeboat crew and a rule she still keeps: never make a film about people you would not want to watch it with.",
    "Ten years on we are eight people and a wider family of freelancers, fixers and co-producers. We have made seven feature documentaries and eleven shorts, shot on four continents, and have never had a film that only played in cities.",
    "We stay small deliberately. One or two films in production at a time means every film gets the same editor, the same sound recordist and the same stubbornness.",
  ],
  principles: [
    {
      title: "Contributors see it first",
      text: "Every person in a Reel film sees the cut before picture lock, and can flag anything factually wrong or unsafe.",
    },
    {
      title: "Pay people properly",
      text: "Fixers, translators and local crew are credited and paid at UK rates, wherever we film.",
    },
    {
      title: "Go back",
      text: "The first public screening happens where the film was made, with the people in it in the front row.",
    },
    {
      title: "Stay independent",
      text: "We take commissions, not instructions. Funders do not get editorial approval.",
    },
  ],
  teamHeading: "The people",
  roomsHeading: "The rooms",
  rooms:
    "Two offline edit suites, a calibrated colour room and a 5.1 mix stage, all available to hire when our own films are not in them.",
};

export const contact = {
  title: "Contact the studio",
  intro:
    "Commissions, co-productions, screening requests, press and festival enquiries all start here. A producer reads every message and replies within three working days.",
  types: [
    { id: "commission", label: "Commission a film" },
    { id: "coproduction", label: "Co-production" },
    { id: "screening", label: "Host a screening" },
    { id: "press", label: "Press & festivals" },
    { id: "other", label: "Something else" },
  ],
  budgets: [
    "Under £30,000",
    "£30,000 – £100,000",
    "£100,000 – £300,000",
    "£300,000 and above",
    "Not decided yet",
  ],
  success: "Thank you. A producer will reply within three working days.",
};

export const screeningsPage = {
  title: "Screenings",
  intro:
    "Where to see our films in a room with other people. Ticketing is handled by each venue; free community screenings are first come, first seated.",
  hostHeading: "Host a screening",
  hostText:
    "Village halls, schools, festivals, union branches and independent cinemas all show our films. Pick a licence, tell us the date and we send the screening copy, posters and a discussion guide.",
};

export const servicesPage = {
  title: "Services",
  intro:
    "Alongside our own slate we make commissioned films, co-produce with partners, run screening tours and hire out our finishing rooms.",
  processHeading: "How a film gets made here",
  rateHeading: "Rate card",
  rateNote:
    "Day rates exclude VAT. Long bookings and charities get a better rate — ask.",
  faqHeading: "Questions we get asked",
};

export const filmsPage = {
  title: "Films",
  intro:
    "Every film the studio has made or is making. Released films can be screened by communities, schools and cinemas; films in progress are open to partners.",
};

export const footer = {
  columns: [
    {
      title: "Films",
      links: films
        .slice(0, 5)
        .map((f) => ({ to: `/films/${f.slug}`, label: f.title }))
        .concat({ to: "/films", label: "All films" }),
    },
    {
      title: "Studio",
      links: [
        { to: "/screenings", label: "Screenings" },
        { to: "/services", label: "Services" },
        { to: "/studio", label: "Studio & team" },
        { to: "/contact", label: "Contact" },
      ],
    },
  ] as { title: string; links: Link[] }[],
  newsletter: {
    title: "The screening sheet",
    text: "One email a month: new dates, new films, the occasional open call for pitches.",
  },
};
