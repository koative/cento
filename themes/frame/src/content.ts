/* Every word, number and image of the Frame site lives here. Rebranding means editing this file. */

const images = import.meta.glob<string>("./assets/*.jpg", {
  eager: true,
  import: "default",
});

export const brand = {
  name: "Frame",
  sector: "Photographer portfolio",
  photographer: "Noor Halvorsen",
  email: "hello@frame.example",
  phone: "+1 555 0143 2208",
  phoneHref: "tel:+155501432208",
  studio: ["Studio 4, 118 Commercial Street", "Portland, Maine 04101"],
  visits: "Studio visits by appointment, Tuesday to Friday, 10 a.m. to 5 p.m.",
  reply: "I answer every enquiry myself, usually within two working days.",
  booking: "Booking commissions for January to April 2027",
  instagram: "https://www.instagram.com/",
  vimeo: "https://vimeo.com/",
};

export const nav = [
  { to: "/series", label: "Series" },
  { to: "/commissions", label: "Commissions" },
  { to: "/prints", label: "Prints" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export type Subject =
  "Landscape" | "City" | "Portrait" | "Coast" | "Architecture" | "Interiors";
export const subjects: Subject[] = [
  "Landscape",
  "City",
  "Portrait",
  "Coast",
  "Architecture",
  "Interiors",
];

export type Frame = {
  id: string;
  src: string;
  w: number;
  h: number;
  title: string;
  alt: string;
  place: string;
  date: string;
  /** Roll and frame number, as written on the contact sheet. */
  code: string;
};

export type Series = {
  slug: string;
  title: string;
  subject: Subject;
  years: string;
  place: string;
  format: string;
  summary: string;
  essay: string[];
  shown: string[];
  frames: Frame[];
};

const f = (
  id: string,
  w: number,
  h: number,
  title: string,
  alt: string,
  place: string,
  date: string,
  code: string,
): Frame => ({
  id,
  src: images[`./assets/${id}.jpg`],
  w,
  h,
  title,
  alt,
  place,
  date,
  code,
});

export const series: Series[] = [
  {
    slug: "where-the-earth-exhales",
    title: "Where the earth exhales",
    subject: "Landscape",
    years: "2024–2026",
    place: "Iceland, Alberta and the Dolomites",
    format: "6×7 colour negative, hand-printed",
    summary:
      "Three winters of walking into weather. Fog banks on Snæfellsnes, cloud sitting on Castle Mountain, ridgelines that are there at noon and gone by four.",
    essay: [
      "I started this series after a commission in Reykjavík ended a day early and the forecast said nothing but fog. I drove north anyway. By the time I reached Kirkjufell the mountain had been swallowed to the waist, and a single walker was crossing the moor below it as if nothing unusual were happening.",
      "Since then I have gone back to weather on purpose. The pictures are made slowly, on a tripod, often after an hour of waiting for the cloud to settle on a shape. Most rolls come home with one frame worth printing. I have stopped thinking of that as waste.",
      "The landscape here is never the subject on its own. It is the moment the air becomes visible: the breath of a place, which is where the title comes from.",
    ],
    shown: [
      "Book: Where the Earth Exhales, Pinewood Press, 2025, 96 pages",
      "Exhibited: Casco Photographic Society, Portland, spring 2025",
    ],
    frames: [
      f(
        "earth-1",
        1800,
        1350,
        "Kirkjufell, the fog arriving",
        "A low bank of fog swallows a mountain above a dark moor; a lone walker and a waterfall are tiny at the bottom edge.",
        "Snæfellsnes, Iceland",
        "March 2025",
        "R3 · 11",
      ),
      f(
        "earth-2",
        1800,
        1200,
        "Castle Mountain, a wall of weather",
        "A sheer grey rock face dissolving into thick white fog.",
        "Banff, Alberta",
        "October 2024",
        "R7 · 4",
      ),
      f(
        "earth-3",
        1800,
        1197,
        "The ridge, gone by four",
        "A green forested ridge with cloud pouring over its crest.",
        "Val di Funes, Dolomites",
        "June 2025",
        "R12 · 9",
      ),
      f(
        "earth-4",
        1800,
        1350,
        "First snow in the pines",
        "Snow-dusted conifers on a steep slope, half hidden in falling mist.",
        "Val di Funes, Dolomites",
        "November 2025",
        "R15 · 2",
      ),
      f(
        "earth-5",
        1800,
        1103,
        "Inversion, morning",
        "A sea of fog filling a valley below a snowy slope with a few bare trees.",
        "Seiser Alm, Dolomites",
        "January 2026",
        "R18 · 7",
      ),
    ],
  },
  {
    slug: "after-the-last-train",
    title: "After the last train",
    subject: "City",
    years: "2025",
    place: "Four cities, between midnight and five",
    format: "Full-frame digital, available light only",
    summary:
      "What a city does in the hours it thinks no one is looking: food carts, cleaners, taxis, one lit floor in a dark tower.",
    essay: [
      "Every city has a gap between its last train and its first. I spent most of 2025 working in that gap, walking from midnight until the trains started again, never using a flash and never asking anyone to move.",
      "The rule was simple: if I would not have been there anyway, I could not take the picture. So these are corners I passed on the way home, bridges I crossed, a food cart I ate at three nights in a row before I photographed it.",
    ],
    shown: [
      "Published: Stillwater Journal, issue 31, eight-page portfolio",
      "Selected for the Lowlight Night Photography Annual 2026",
    ],
    frames: [
      f(
        "train-1",
        1800,
        1440,
        "Window shopping, 1:10 a.m.",
        "A man seen from behind, silhouetted against bright shop windows and green neon.",
        "Side street off the market",
        "February 2025",
        "D2 · 0412",
      ),
      f(
        "train-2",
        1800,
        1200,
        "The last cart on the corner",
        "People queue at a brightly lit food cart on a dark street corner.",
        "Midtown, after the bars close",
        "April 2025",
        "D4 · 1180",
      ),
      f(
        "train-3",
        1800,
        1198,
        "Taxis, from the footbridge",
        "Yellow taxis and buses streaming along a wide avenue at night, seen from above.",
        "Crossing the ring road",
        "May 2025",
        "D5 · 0077",
      ),
      f(
        "train-4",
        1800,
        1013,
        "Somebody is still working",
        "A glass office tower at night, rows of windows lit pink and blue.",
        "Financial district",
        "August 2025",
        "D8 · 0931",
      ),
      f(
        "train-5",
        1500,
        1000,
        "Underpass, long exposure",
        "Light trails of traffic running through a sunken road between tall buildings.",
        "Under the station approach",
        "November 2025",
        "D11 · 0302",
      ),
    ],
  },
  {
    slug: "sitters",
    title: "Sitters",
    subject: "Portrait",
    years: "2023–2026",
    place: "Studio and sitters’ homes",
    format: "6×7 black-and-white and colour negative",
    summary:
      "People I asked to sit still for one minute longer than they wanted to. Friends, neighbours, a few strangers, and nobody famous.",
    essay: [
      "A portrait sitting with me takes about two hours, and almost all of it is conversation. The camera comes out late. By then most people have forgotten the reason they came and started telling me about something else entirely, which is when their face changes.",
      "Sitters is an open series. I add four or five people a year. Every sitter gets a fibre print of the frame we choose together, and nothing is published without their yes.",
    ],
    shown: [
      "Shortlisted: Lowlight Portrait Prize 2024",
      "Exhibited: Halden Gallery, Portland, 2024",
    ],
    frames: [
      f(
        "sitters-1",
        1800,
        1200,
        "Amara, Tuesday evening",
        "Black-and-white portrait of a woman in a turtleneck and coat, city lights blurred behind her.",
        "Congress Street, Portland",
        "October 2023",
        "R2 · 6",
      ),
      f(
        "sitters-2",
        1200,
        1800,
        "Lena, after the show",
        "Black-and-white portrait of a young woman with glitter on her cheek, one hand raised near her face.",
        "Backstage, State Theatre",
        "March 2024",
        "R5 · 10",
      ),
      f(
        "sitters-3",
        1800,
        1200,
        "Hanne, through the hedge",
        "Black-and-white portrait of a woman half hidden behind dark leaves.",
        "Her garden, Cape Elizabeth",
        "July 2024",
        "R9 · 3",
      ),
      f(
        "sitters-4",
        1280,
        1707,
        "Mira, floating",
        "A woman floats on her back in very dark water, seen from directly above.",
        "Sebago Lake",
        "August 2024",
        "R10 · 1",
      ),
      f(
        "sitters-5",
        1200,
        1800,
        "Mr. Lin, at home",
        "An older man in a white cap sits on a wooden floor beside a turquoise door.",
        "His front room",
        "May 2025",
        "R14 · 8",
      ),
      f(
        "sitters-6",
        1200,
        1800,
        "Priya, on the studio floor",
        "A woman with dark curly hair and a fur collar lies on her back, looking up at the camera.",
        "Frame studio",
        "February 2026",
        "R19 · 5",
      ),
    ],
  },
  {
    slug: "low-season",
    title: "Low season",
    subject: "Coast",
    years: "2024",
    place: "The Atlantic coast, October to March",
    format: "6×7 colour negative",
    summary:
      "Beaches in the weeks after everyone leaves: closed lifeguard towers, dune paths with nobody on them, piers that belong to the gulls again.",
    essay: [
      "Every October the coast I grew up on gives itself back. The car parks empty, the towers are boarded and the light drops low enough to put long shadows on the sand by mid-afternoon.",
      "Low season is a winter of Sunday drives, one roll per beach. It opens as a solo show at Harbour Light Gallery in November.",
    ],
    shown: [
      "Solo exhibition: Harbour Light Gallery, 14 November 2026 – 10 January 2027",
    ],
    frames: [
      f(
        "low-1",
        1800,
        1350,
        "Walkers, first week of October",
        "A pale, hazy beach with scattered walkers and a sea stack in the distance.",
        "Hendricks Head",
        "October 2024",
        "R21 · 2",
      ),
      f(
        "low-2",
        1800,
        1195,
        "The path down from the dunes",
        "A sandy path between dune grass and a weathered wooden fence.",
        "Popham Beach",
        "October 2024",
        "R21 · 9",
      ),
      f(
        "low-3",
        1800,
        1200,
        "Tower 7, closed for the season",
        "A blue lifeguard tower on an empty beach in low evening sun.",
        "Old Orchard",
        "November 2024",
        "R23 · 4",
      ),
      f(
        "low-4",
        1800,
        1045,
        "The pier, Sunday",
        "A long pier stretching out to sea, with a few people walking on the beach below.",
        "Old Orchard",
        "November 2024",
        "R23 · 11",
      ),
      f(
        "low-5",
        1800,
        1200,
        "Mooring rope",
        "A hand resting on thick hanging ropes that frame a view of the beach.",
        "Higgins Beach",
        "January 2025",
        "R26 · 6",
      ),
      f(
        "low-6",
        1800,
        1202,
        "Dusk, north shore",
        "A dark coastline curving away under an orange and blue dusk sky.",
        "Two Lights",
        "March 2025",
        "R28 · 12",
      ),
    ],
  },
  {
    slug: "concrete-hours",
    title: "Concrete hours",
    subject: "Architecture",
    years: "2025",
    place: "Buildings I was hired to photograph",
    format: "4×5 sheet film and digital",
    summary:
      "I went back to buildings from my commissions, on my own time and without a brief, when nobody was inside and the light was doing something the client never saw.",
    essay: [
      "An architecture commission asks for the building as designed: verticals corrected, the sky behaving and every room explained. I love that work, and it leaves a lot of good pictures on the floor.",
      "Concrete hours is what I collected on the way out. Stairwells from below, a façade at the wrong time of day, a cantilever in a sky that would have been rejected in the edit.",
    ],
    shown: ["Published: Foyer Annual 2025, architecture portfolio"],
    frames: [
      f(
        "concrete-1",
        1200,
        1800,
        "Light slot, 11:40",
        "A narrow shaft of daylight cutting between two raw concrete walls.",
        "Chapel extension",
        "February 2025",
        "S4 · 2",
      ),
      f(
        "concrete-2",
        1200,
        1800,
        "Gallery void",
        "A white interior void crossed by dark angled beams below a skylight.",
        "Museum annex",
        "March 2025",
        "S6 · 1",
      ),
      f(
        "concrete-3",
        1200,
        1800,
        "Stairwell, looking up",
        "A circular stairwell seen from below, rings of railing around a bright opening.",
        "Car park, level minus two",
        "April 2025",
        "S7 · 5",
      ),
      f(
        "concrete-4",
        1800,
        1200,
        "Façade, woven steel",
        "A sweeping perforated metal façade curving overhead, in black and white.",
        "Exhibition hall",
        "June 2025",
        "D3 · 0440",
      ),
      f(
        "concrete-5",
        1800,
        1200,
        "Cantilever",
        "The sharp tiled corner of a building projecting into a pale blue sky.",
        "Library extension",
        "August 2025",
        "S11 · 3",
      ),
      f(
        "concrete-6",
        1280,
        1642,
        "Night tiles",
        "Dark curved wall tiles meeting a black sky in a soft diagonal.",
        "Concert hall",
        "October 2025",
        "D7 · 1201",
      ),
    ],
  },
  {
    slug: "rooms-at-rest",
    title: "Rooms at rest",
    subject: "Interiors",
    years: "2026",
    place: "Apartments and workplaces between owners",
    format: "6×7 colour negative, tripod, available light",
    summary:
      "Rooms photographed in the days after one life moves out and before the next moves in, when the furniture is waiting and the light has the place to itself.",
    essay: [
      "Estate agents and interior designers hire me to make rooms look lived in. This series is the opposite assignment, given to myself: rooms in the pause between people.",
      "No styling, no extra lamps. I arrive in the morning, find the window that is doing the work and wait for the light to cross whatever was left behind.",
    ],
    shown: ["Work in progress, shown in the studio by appointment"],
    frames: [
      f(
        "rooms-1",
        1800,
        1201,
        "Butterfly chair, west light",
        "A leather butterfly chair before tall windows hung with sheer curtains.",
        "Loft, Fore Street",
        "January 2026",
        "R30 · 4",
      ),
      f(
        "rooms-2",
        1800,
        1193,
        "Long table, noon",
        "A wooden table and benches in a sunlit room, hard shadows across the floor.",
        "Former print works",
        "February 2026",
        "R31 · 8",
      ),
      f(
        "rooms-3",
        1800,
        1200,
        "Window in a dark room",
        "A single four-pane window glowing in a black wall, trees beyond the glass.",
        "Cabin, Bethel",
        "March 2026",
        "R33 · 1",
      ),
      f(
        "rooms-4",
        1800,
        1200,
        "Yellow chair, panelled room",
        "A yellow chair, a snake plant and a small brass table in a wood-panelled room.",
        "Apartment, West End",
        "May 2026",
        "R35 · 10",
      ),
      f(
        "rooms-5",
        1800,
        1201,
        "Kitchen, empty",
        "A wooden dining table with white chairs in a bright, empty room.",
        "Apartment, Munjoy Hill",
        "July 2026",
        "R37 · 6",
      ),
    ],
  },
];

export const allFrames = series.flatMap((s) =>
  s.frames.map((frame) => ({ ...frame, series: s })),
);
export const findFrame = (id: string) => allFrames.find((fr) => fr.id === id);

export const studioImage = {
  src: images["./assets/studio.jpg"],
  w: 1800,
  h: 1193,
  alt: "Noor Halvorsen bent over a camera on a tripod in a bright white studio with arched windows.",
};

/* ---------- Prints ---------- */

export type SizeId = "s" | "m" | "l";
export type FramingId = "none" | "oak" | "black";

export const sizes: {
  id: SizeId;
  label: string;
  long: number;
  short: number;
}[] = [
  { id: "s", label: "Small", long: 18, short: 12 },
  { id: "m", label: "Medium", long: 30, short: 20 },
  { id: "l", label: "Large", long: 45, short: 30 },
];

export const framings: {
  id: FramingId;
  label: string;
  note: string;
  colour: string;
  add: Record<SizeId, number>;
}[] = [
  {
    id: "none",
    label: "Unframed",
    note: "Rolled in an archival tube",
    colour: "transparent",
    add: { s: 0, m: 0, l: 0 },
  },
  {
    id: "oak",
    label: "White oak",
    note: "Solid oak, museum glass, 3 in mat",
    colour: "#b8946a",
    add: { s: 190, m: 290, l: 480 },
  },
  {
    id: "black",
    label: "Black ash",
    note: "Stained ash, museum glass, 3 in mat",
    colour: "#22201c",
    add: { s: 190, m: 290, l: 480 },
  },
];

export type Print = {
  id: string;
  frameId: string;
  process: string;
  edition: number;
  sold: number;
  prices: Record<SizeId, number>;
  note: string;
};

export const prints: Print[] = [
  {
    id: "kirkjufell-fog",
    frameId: "earth-1",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 25,
    sold: 17,
    prices: { s: 320, m: 640, l: 1250 },
    note: "The picture that started the series. The walker is three millimetres tall in the small size; people find him anyway.",
  },
  {
    id: "first-snow",
    frameId: "earth-4",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 25,
    sold: 9,
    prices: { s: 320, m: 640, l: 1250 },
    note: "Printed slightly cool and very soft in the shadows, so the mist reads as air rather than grey.",
  },
  {
    id: "mira-floating",
    frameId: "sitters-4",
    process: "Silver gelatin, hand-printed on fibre paper",
    edition: 15,
    sold: 12,
    prices: { s: 420, m: 820, l: 1600 },
    note: "Hand-printed in my darkroom, so no two are quite alike. Mira signs the back of every print alongside me.",
  },
  {
    id: "dune-path",
    frameId: "low-2",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 30,
    sold: 6,
    prices: { s: 280, m: 560, l: 1100 },
    note: "The quietest picture in Low season and the one I hang at home.",
  },
  {
    id: "dusk-north-shore",
    frameId: "low-6",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 30,
    sold: 21,
    prices: { s: 280, m: 560, l: 1100 },
    note: "Five minutes after sunset in March. The orange holds best in the medium and large sizes.",
  },
  {
    id: "stairwell",
    frameId: "concrete-3",
    process: "Silver gelatin, hand-printed on fibre paper",
    edition: 20,
    sold: 4,
    prices: { s: 380, m: 760, l: 1450 },
    note: "Made from a 4×5 sheet negative; the detail in the railings holds up at any size.",
  },
  {
    id: "butterfly-chair",
    frameId: "rooms-1",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 25,
    sold: 11,
    prices: { s: 300, m: 600, l: 1180 },
    note: "The first frame of Rooms at rest, released while the series is still being made.",
  },
  {
    id: "taxis-footbridge",
    frameId: "train-3",
    process: "Archival pigment print on 310 gsm cotton rag",
    edition: 20,
    sold: 20,
    prices: { s: 300, m: 600, l: 1180 },
    note: "This edition is complete. Leave your email on the contact page to hear about the next night picture.",
  },
];

export const printFacts = [
  {
    term: "Editions",
    detail:
      "Every image is a single numbered edition shared across sizes. When it is gone it is not reprinted.",
  },
  {
    term: "Signing",
    detail:
      "Signed, titled and numbered in pencil on the back, with a certificate carrying the negative number.",
  },
  {
    term: "Printing",
    detail:
      "Colour work is printed with a Portland lab I have used for ten years. Black-and-white is printed by me.",
  },
  {
    term: "Shipping",
    detail:
      "Rolled prints ship in 5 working days, framed in 3 weeks. Flat rate $30 rolled, $90 framed, anywhere in the US.",
  },
];

export const shipping = { rolled: 30, framed: 90 };

/* ---------- Commissions ---------- */

export const commissions = {
  intro:
    "I take on around twenty commissions a year for editors, architects and a small number of brands whose work I believe in. Every job is shot by me, with one assistant, and edited by me.",
  disciplines: [
    {
      id: "editorial",
      name: "Editorial portraiture",
      body: "Profiles, features and covers for magazines and books. Mostly on location, in the sitter’s own place, with time built in to talk before the camera comes out.",
      includes: [
        "Two hours with the sitter",
        "Up to 12 retouched selects",
        "Editorial usage included",
      ],
      rate: "From $2,400 a day",
      image: "sitters-1",
    },
    {
      id: "architecture",
      name: "Architecture & interiors",
      body: "Completed buildings and interiors for architects, designers and developers, on digital or 4×5 film. I scout every site before the shoot day and plan around the sun.",
      includes: [
        "Site visit and sun study",
        "Perspective-corrected finals",
        "Award and press usage",
      ],
      rate: "From $3,200 a day",
      image: "concrete-1",
    },
    {
      id: "brand",
      name: "Brand & campaign",
      body: "A few campaigns a year for companies that make things slowly too: furniture, outerwear, ferries, hotels. Treated like a series, not a shot list.",
      includes: [
        "Written treatment and casting",
        "Location and crew management",
        "Usage quoted per channel",
      ],
      rate: "Quoted per project",
      image: "rooms-4",
    },
  ],
  process: [
    {
      title: "A call",
      body: "Thirty minutes about the story, the place and the deadline. I will tell you honestly if I am the wrong photographer for it.",
      time: "Within the week",
    },
    {
      title: "A written treatment",
      body: "A one-page plan with references from my own archive, a schedule and a fixed quote. Nothing is booked until you have approved it.",
      time: "3–5 days",
    },
    {
      title: "The shoot",
      body: "One or more days on location with an assistant. Film or digital as the job needs; you see a contact sheet the same evening.",
      time: "Agreed date",
    },
    {
      title: "Edit and delivery",
      body: "You mark your selects on the sheet, I retouch and deliver full-resolution files with a usage licence.",
      time: "10 working days",
    },
  ],
  rates: [
    { item: "Half day, up to 4 hours on site", price: "$1,500" },
    { item: "Full day, up to 10 hours on site", price: "$2,400" },
    { item: "Architecture day, including site visit", price: "$3,200" },
    { item: "Travel day outside Maine", price: "$650" },
    { item: "Additional retouched image", price: "$90" },
    { item: "Web and social usage, 12 months", price: "+35% of fee" },
    { item: "Print advertising and outdoor", price: "Quoted" },
  ],
  clients: [
    "Stillwater Journal",
    "Saltmarsh Quarterly",
    "Foyer Annual",
    "Brecken & Hale Architects",
    "Arlo Outerwear",
    "Northlight Ferries",
    "Ostra Hotels",
    "Pinewood Press",
    "The Long Table",
    "Casco Bay Design Review",
  ],
  testimonials: [
    {
      quote:
        "Noor sent us a contact sheet at ten at night with three frames circled in red. All three ran. I have never had a shoot day that easy.",
      name: "Hollis Grant",
      role: "Photo editor, Stillwater Journal",
    },
    {
      quote:
        "She walked the building with us twice before the shoot and found a stairwell we had stopped seeing. It became the cover of our monograph.",
      name: "Ines Brecken",
      role: "Partner, Brecken & Hale Architects",
    },
  ],
  faq: [
    {
      q: "Do you travel?",
      a: "Yes. About a third of my commissions are outside Maine. Travel days are charged at $650 plus expenses at cost; I book economy and stay somewhere sensible.",
    },
    {
      q: "Film or digital?",
      a: "Whichever suits the job. Editorial and campaign work is usually digital for speed; architecture is often shot on 4×5 film. Film adds processing and scanning at cost, about $45 a roll.",
    },
    {
      q: "Who owns the pictures?",
      a: "I keep the copyright and you receive a licence for the uses we agree in the treatment. Extending usage later is simple and quoted at the same rates.",
    },
    {
      q: "How far ahead should I book?",
      a: "Four to six weeks for most jobs. I keep one day a fortnight open for editorial work on short notice, so it is always worth asking.",
    },
    {
      q: "Can I see more of a series before booking?",
      a: "Of course. Mark the frames you like in any series viewer and send them with your enquiry; I will reply with related work from the archive.",
    },
  ],
};

/* ---------- About ---------- */

export const about = {
  lede: "I make photographs slowly, mostly on film, and mostly of things that are about to change: weather, cities at night, rooms between owners, the face of someone who has just stopped performing for the camera.",
  bio: [
    "I grew up on the Maine coast and learned to print in my school’s darkroom, which was a converted supply cupboard with a red bulb and no ventilation. I studied architecture for two years before admitting that what I loved about buildings was the way light moved through them.",
    "Since 2012 I have worked as a photographer for magazines, architects and a few brands, and in between I make long series of my own. Frame is the studio that holds both: a top-floor room on Commercial Street with north light, a darkroom and a long table for laying out contact sheets.",
    "Commissions pay for the series, and the series make me better at commissions. I have never found a reason to separate them.",
  ],
  principles: [
    {
      title: "Fewer, better frames",
      body: "I shoot less than most photographers and edit harder. A client gets twelve pictures that work instead of two hundred that nearly do.",
    },
    {
      title: "The sitter says yes",
      body: "No portrait from a personal series is published or sold without the sitter’s written consent, and every sitter gets a print.",
    },
    {
      title: "Prints that outlast us",
      body: "Archival paper and pigment, fibre-based silver prints, honest edition sizes, and no reprints once an edition closes.",
    },
  ],
  cv: [
    {
      heading: "Exhibitions",
      items: [
        {
          year: "2026",
          text: "Low season, solo, Harbour Light Gallery, Portland (from 14 November)",
        },
        {
          year: "2025",
          text: "Where the earth exhales, solo, Casco Photographic Society",
        },
        {
          year: "2024",
          text: "Sitters, two-person show with Elsa Varga, Halden Gallery",
        },
        {
          year: "2022",
          text: "New England Light, group show, Ridgeway Arts Center",
        },
      ],
    },
    {
      heading: "Books and publications",
      items: [
        {
          year: "2025",
          text: "Where the Earth Exhales, Pinewood Press, 96 pages",
        },
        {
          year: "2025",
          text: "After the last train, eight-page portfolio, Stillwater Journal 31",
        },
        { year: "2025", text: "Concrete hours, Foyer Annual" },
      ],
    },
    {
      heading: "Recognition",
      items: [
        { year: "2026", text: "Selected, Lowlight Night Photography Annual" },
        { year: "2024", text: "Shortlisted, Lowlight Portrait Prize" },
        { year: "2019", text: "Residency, Northern Isles Artist Retreat" },
      ],
    },
  ],
  kit: [
    "A 6×7 rangefinder for series work",
    "A 4×5 field camera for architecture",
    "A full-frame digital body and three prime lenses for commissions",
    "A darkroom enlarger older than I am",
  ],
};

/* ---------- Home ---------- */

export const home = {
  title: "Noor Halvorsen makes photographs slowly.",
  lede: "Frame is her studio in Portland, Maine: six long-form series, commissions for editors and architects, and editioned prints made to last.",
  statement:
    "A good picture is mostly waiting. You find the place, you understand the light, and then you stand there long enough for something to happen that you could not have planned.",
  featured: "low-season",
  heroOrder: [
    "earth-1",
    "train-1",
    "sitters-4",
    "low-3",
    "concrete-3",
    "rooms-1",
  ],
};

export const events = [
  {
    date: "14 Nov 2026 – 10 Jan 2027",
    title: "Low season",
    detail:
      "Solo exhibition, Harbour Light Gallery, 42 Wharf Street, Portland. Opening Friday 13 November, 6–9 p.m.",
    to: "/series/low-season",
  },
  {
    date: "5–6 Dec 2026",
    title: "Open studio and print sale",
    detail:
      "The studio is open both days from 11 a.m. to 5 p.m. Work prints and the last copies of the book.",
    to: "/prints",
  },
  {
    date: "22 Jan 2027",
    title: "Talk: printing in the dark",
    detail:
      "An evening on fibre printing at the Casco Photographic Society. Free, booking recommended.",
    to: "/about",
  },
];

export const footer = {
  letter:
    "The studio letter, four times a year: new series, print releases and open-studio dates. Nothing else.",
};
