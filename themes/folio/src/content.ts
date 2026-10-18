import visitor from "./assets/visitor.jpg";
import galleryThree from "./assets/gallery-three.jpg";
import doorway from "./assets/doorway.jpg";
import skylight from "./assets/skylight.jpg";
import facade from "./assets/facade.jpg";
import atrium from "./assets/atrium.jpg";
import studio from "./assets/studio.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Folio",
  sector: "Contemporary art gallery",
  tagline: "Three rooms, eight artists, every price on the wall label.",
  email: "hello@folio.example",
  salesEmail: "sales@folio.example",
  pressEmail: "press@folio.example",
  phone: "+1 555 0147",
  phoneHref: "tel:+15550147",
  street: "41 Tanner Street",
  city: "Brooklyn, NY 11231",
  founded: 2016,
};

export const nav = [
  { to: "/exhibitions", label: "Exhibitions" },
  { to: "/artists", label: "Artists" },
  { to: "/viewing-room", label: "Viewing room" },
  { to: "/visit", label: "Visit" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Programme",
    links: [
      { to: "/exhibitions", label: "Exhibitions" },
      { to: "/artists", label: "Artists" },
      { to: "/viewing-room", label: "Viewing room" },
    ],
  },
  {
    title: "Gallery",
    links: [
      { to: "/visit", label: "Visit & hours" },
      { to: "/about", label: "About & team" },
      { to: "/enquire", label: "Enquire" },
    ],
  },
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "Editions & books" },
      { to: "/bag", label: "Your bag" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Vimeo", href: "https://vimeo.com/" },
];

export const images = {
  visitor,
  galleryThree,
  doorway,
  skylight,
  facade,
  atrium,
  studio,
};

/* --------------------------------------------------------------- artworks */

/** Each artist's practice is drawn by one composition kind (see components/Artwork.tsx). */
export type ArtKind =
  | "field"
  | "grid"
  | "forms"
  | "stripes"
  | "arcs"
  | "fold"
  | "weave"
  | "horizon";
/** colors[0] is the ground; seed varies the composition within the artist's language. */
export type Art = { kind: ArtKind; colors: string[]; seed: number };

export type Status = "available" | "reserved" | "sold";

export type Work = {
  id: string;
  artist: string;
  title: string;
  year: number;
  medium: string;
  /** Centimetres. */
  w: number;
  h: number;
  edition?: string;
  /** USD; null means price on request. */
  price: number | null;
  status: Status;
  art: Art;
  note: string;
  viewingRoom?: boolean;
};

export type Artist = {
  slug: string;
  name: string;
  born: string;
  based: string;
  practice: string;
  statement: string;
  bio: string[];
  cv: { year: number; title: string; venue: string }[];
};

export const artists: Artist[] = [
  {
    slug: "ines-calder",
    name: "Ines Calder",
    born: "b. 1979, Lisbon",
    based: "Lives and works in New York",
    practice: "Colour-field painting, oil on linen",
    statement: "I paint the weather of a room, not the room.",
    bio: [
      "Ines Calder builds her paintings from thin veils of oil, sometimes thirty layers deep, until a band of colour seems to sit just in front of the linen rather than on it. The edges stay soft on purpose: she sands each layer back by hand so nothing in the picture is ever quite settled.",
      "Calder trained as a conservator before she painted full time, and the patience shows. A large canvas takes her five to seven months. She has shown with Folio since the gallery opened in 2016.",
    ],
    cv: [
      { year: 2026, title: "Weather Inside", venue: "Folio, Brooklyn" },
      {
        year: 2024,
        title: "Interior Seasons",
        venue: "Kunsthalle Oster, Bremen",
      },
      { year: 2022, title: "Low Light", venue: "Folio, Brooklyn" },
      { year: 2019, title: "A Room Facing North", venue: "Casa Vela, Porto" },
    ],
  },
  {
    slug: "tomas-ruiz-hale",
    name: "Tomás Ruiz-Hale",
    born: "b. 1986, Mexico City",
    based: "Lives and works in Mexico City and Brooklyn",
    practice: "Graphite and gouache grids on paper and panel",
    statement: "A grid is a calendar you can see all at once.",
    bio: [
      "Tomás Ruiz-Hale draws grids by hand, one ruled line per hour of work, and fills single cells to mark what happened in them: a phone call, a rainstorm, a day his daughter stayed home sick. The drawings read as abstraction from across the room and as diaries up close.",
      "His Ledger series began in 2023 and now runs to more than forty sheets. He joined Folio in 2021.",
    ],
    cv: [
      { year: 2026, title: "Ledger", venue: "Folio, Brooklyn" },
      {
        year: 2025,
        title: "Paper Weather (group)",
        venue: "Museo Taller Norte, Monterrey",
      },
      { year: 2023, title: "Hours Kept", venue: "Folio, Brooklyn" },
    ],
  },
  {
    slug: "mara-ellis",
    name: "Mara Ellis",
    born: "b. 1991, Leeds",
    based: "Lives and works in Glasgow",
    practice: "Screenprints and acrylic on aluminium",
    statement: "Every shape has to earn its weight against the others.",
    bio: [
      "Mara Ellis makes compositions of three or four flat forms that look as if they might tip at any moment and never do. She cuts her stencils by hand and prints in small editions in her own studio, then scales the strongest arrangements up onto aluminium panels painted in up to twelve coats.",
      "Her editions have been part of Folio's print programme since 2019; her first solo exhibition with the gallery, An Exercise in Balance, opened in January 2026.",
    ],
    cv: [
      { year: 2026, title: "Small Hours (group)", venue: "Folio, Brooklyn" },
      { year: 2026, title: "An Exercise in Balance", venue: "Folio, Brooklyn" },
      { year: 2024, title: "Counterweights", venue: "Tramway Annexe, Glasgow" },
    ],
  },
  {
    slug: "yuki-arendt",
    name: "Yuki Arendt",
    born: "b. 1983, Osaka",
    based: "Lives and works in Berlin",
    practice: "Acrylic band paintings",
    statement: "The interval matters more than the colour.",
    bio: [
      "Yuki Arendt paints bands of flat acrylic whose widths follow measurements she takes of daylight moving across her studio floor. Each painting is a record of one day's light, translated into a rhythm of stripes you can feel before you can count.",
      "Arendt's Measured Light was Folio's best-attended exhibition of 2026. She has worked with the gallery since 2020.",
    ],
    cv: [
      { year: 2026, title: "Measured Light", venue: "Folio, Brooklyn" },
      { year: 2025, title: "Interval", venue: "Galerie Feld, Berlin" },
      { year: 2021, title: "Daylight Studies", venue: "Folio, Brooklyn" },
    ],
  },
  {
    slug: "lior-basso",
    name: "Lior Basso",
    born: "b. 1975, Haifa",
    based: "Lives and works in Rotterdam",
    practice: "Vitreous enamel on steel",
    statement: "Fire decides the last ten percent.",
    bio: [
      "Lior Basso fires powdered glass onto steel sheet at 820°C, building concentric arcs one colour and one firing at a time. A panel goes into the kiln up to fourteen times; any one of those firings can crack it. The surviving works have a depth and gloss no paint can match.",
      "Basso has exhibited with Folio since 2018. Quarter Turn, his third solo exhibition here, opens in January 2027.",
    ],
    cv: [
      { year: 2027, title: "Quarter Turn", venue: "Folio, Brooklyn" },
      { year: 2024, title: "Kiln Hours", venue: "Het Glashuis, Rotterdam" },
      { year: 2021, title: "Arc", venue: "Folio, Brooklyn" },
    ],
  },
  {
    slug: "noa-finch",
    name: "Noa Finch",
    born: "b. 1994, Auckland",
    based: "Lives and works in Brooklyn",
    practice: "Pigment on folded paper",
    statement: "The fold is the drawing; the colour just finds it.",
    bio: [
      "Noa Finch folds heavy cotton paper along a single diagonal, then washes pigment across it so colour pools into the crease. Unfolded and flattened, each sheet keeps the memory of its fold as a ridge of light and a seam of deeper colour.",
      "Finch is the youngest artist on Folio's roster. Her debut, Creases, sold out in its first week in 2025.",
    ],
    cv: [
      { year: 2026, title: "Small Hours (group)", venue: "Folio, Brooklyn" },
      { year: 2025, title: "Creases", venue: "Folio, Brooklyn" },
      {
        year: 2023,
        title: "New Paper (group)",
        venue: "Artspace Tāmaki, Auckland",
      },
    ],
  },
  {
    slug: "adaeze-okon",
    name: "Adaeze Okon",
    born: "b. 1988, Lagos",
    based: "Lives and works in London and Lagos",
    practice: "Woven cotton tape and acrylic",
    statement: "Cloth remembers every hand that pulled it.",
    bio: [
      "Adaeze Okon weaves painted cotton tape on a floor loom she built from the frame of her grandmother's market stall. The interlacing is strict, over and under, but the colours shift as she repaints the tape mid-weave, so pattern and accident share the same surface.",
      "Okon joined Folio in 2024. Warp and Weft, her first solo exhibition in the United States, opens on 20 November 2026.",
    ],
    cv: [
      { year: 2026, title: "Warp and Weft", venue: "Folio, Brooklyn" },
      { year: 2025, title: "Selvedge", venue: "Iwalewa Rooms, Lagos" },
      {
        year: 2023,
        title: "Common Thread (group)",
        venue: "South Bank Textile Hall, London",
      },
    ],
  },
  {
    slug: "henrik-vass",
    name: "Henrik Vass",
    born: "b. 1968, Bergen",
    based: "Lives and works in Bergen",
    practice: "Oil on gessoed board",
    statement: "Paint the line where the weather changes its mind.",
    bio: [
      "Henrik Vass paints the same stretch of Norwegian coastline from memory, reduced to two fields and a horizon. The boards are small and the surfaces dense; up close you find the brushwork of sleet, fog and a single break of light.",
      "Vass is the longest-standing artist on Folio's roster and has shown with the gallery five times.",
    ],
    cv: [
      { year: 2026, title: "Grey Coast", venue: "Folio, Brooklyn" },
      { year: 2023, title: "Weather Line", venue: "Kode Annex, Bergen" },
      { year: 2020, title: "Sound", venue: "Folio, Brooklyn" },
    ],
  },
];

export const works: Work[] = [
  // Ines Calder
  {
    id: "low-tide-room",
    artist: "ines-calder",
    title: "Low Tide Room",
    year: 2026,
    medium: "Oil on linen",
    w: 122,
    h: 152,
    price: 38000,
    status: "available",
    art: { kind: "field", colors: ["#2f3a4a", "#c96f4a", "#e3c9a1"], seed: 3 },
    note: "Two bands, one warm and one pale, sit over a slate ground that Calder laid down in twenty-two thin coats. The lower edge was sanded back after every layer, so it seems to breathe.",
    viewingRoom: true,
  },
  {
    id: "held-breath",
    artist: "ines-calder",
    title: "Held Breath",
    year: 2026,
    medium: "Oil on linen",
    w: 152,
    h: 183,
    price: 46000,
    status: "reserved",
    art: { kind: "field", colors: ["#7d2a22", "#d8803e", "#3b1c1a"], seed: 8 },
    note: "The largest painting in Weather Inside and the one Calder worked on longest: seven months, thirty-one layers. The dark band was added last, in a single afternoon.",
    viewingRoom: true,
  },
  {
    id: "afternoon-sill",
    artist: "ines-calder",
    title: "Afternoon Sill",
    year: 2025,
    medium: "Oil on linen",
    w: 61,
    h: 76,
    price: 18500,
    status: "available",
    art: { kind: "field", colors: ["#e7dcc4", "#9fb3b0", "#d2a25a"], seed: 5 },
    note: "A small, high-key painting made at the window of Calder's Lisbon studio during a summer residency. Ideal for a domestic wall.",
    viewingRoom: true,
  },
  {
    id: "weather-inside-iv",
    artist: "ines-calder",
    title: "Weather Inside IV",
    year: 2026,
    medium: "Oil on linen",
    w: 168,
    h: 198,
    price: 52000,
    status: "sold",
    art: { kind: "field", colors: ["#1f2a2c", "#4e6b66", "#b8c4b2"], seed: 11 },
    note: "Acquired by a private collection in Lisbon during the exhibition preview.",
  },
  // Tomás Ruiz-Hale
  {
    id: "ledger-14",
    artist: "tomas-ruiz-hale",
    title: "Ledger 14",
    year: 2026,
    medium: "Graphite and gouache on paper",
    w: 56,
    h: 76,
    price: 9800,
    status: "available",
    art: { kind: "grid", colors: ["#f1ede3", "#6a665f", "#2b4f8a"], seed: 14 },
    note: "Fourteen weeks in March to June 2026, one cell per hour of studio time. The blue cells are the hours it rained.",
    viewingRoom: true,
  },
  {
    id: "ledger-19",
    artist: "tomas-ruiz-hale",
    title: "Ledger 19",
    year: 2026,
    medium: "Graphite and gouache on paper",
    w: 56,
    h: 76,
    price: 9800,
    status: "sold",
    art: { kind: "grid", colors: ["#f1ede3", "#6a665f", "#b23a2a"], seed: 19 },
    note: "Red marks the days the artist did not draw at all. Acquired by a museum collection.",
  },
  {
    id: "tally-for-a-year",
    artist: "tomas-ruiz-hale",
    title: "Tally for a Year",
    year: 2025,
    medium: "Graphite on gessoed panel",
    w: 122,
    h: 122,
    price: 24000,
    status: "available",
    art: { kind: "grid", colors: ["#ebe7dd", "#55524c", "#161513"], seed: 27 },
    note: "A full year in 365 cells, ruled across eleven weeks. The darkest cells were drawn over so many times that the graphite turned to a mirror.",
    viewingRoom: true,
  },
  // Mara Ellis
  {
    id: "an-exercise-in-balance",
    artist: "mara-ellis",
    title: "An Exercise in Balance",
    year: 2025,
    medium: "Acrylic on aluminium",
    w: 70,
    h: 90,
    price: 14500,
    status: "available",
    art: {
      kind: "forms",
      colors: ["#efe6d4", "#d94d31", "#161513", "#d2b349"],
      seed: 2,
    },
    note: "The title work of Ellis's 2026 solo exhibition: a red disc held in place by a black bar no wider than a finger.",
    viewingRoom: true,
  },
  {
    id: "pivot",
    artist: "mara-ellis",
    title: "Pivot",
    year: 2026,
    medium: "Acrylic on aluminium",
    w: 90,
    h: 120,
    price: 19000,
    status: "available",
    art: {
      kind: "forms",
      colors: ["#e6ebec", "#314daf", "#e09a3a", "#161513"],
      seed: 7,
    },
    note: "Twelve coats of hand-brushed acrylic, each sanded flat. The blue is mixed to match the enamel of a Glasgow tenement door.",
    viewingRoom: true,
  },
  {
    id: "small-hours-3",
    artist: "mara-ellis",
    title: "Small Hours, 3",
    year: 2026,
    medium: "Seven-colour screenprint on Somerset Satin",
    w: 40,
    h: 50,
    edition: "Edition of 30",
    price: 1200,
    status: "available",
    art: {
      kind: "forms",
      colors: ["#f2ede3", "#78875a", "#d94d31", "#161513"],
      seed: 13,
    },
    note: "Printed by the artist in the Folio Print Room during the opening week of Small Hours.",
  },
  // Yuki Arendt
  {
    id: "measured-light-7",
    artist: "yuki-arendt",
    title: "Measured Light 7",
    year: 2026,
    medium: "Acrylic on canvas",
    w: 120,
    h: 160,
    price: 27000,
    status: "available",
    art: {
      kind: "stripes",
      colors: ["#f0ead8", "#e2b43c", "#d96a3a", "#6b8fb5", "#24324d"],
      seed: 7,
    },
    note: "The light of 7 March 2026, from 7:40 to 18:05. The widest band is the hour after lunch, when the sun crosses the floor fastest.",
    viewingRoom: true,
  },
  {
    id: "noon-register",
    artist: "yuki-arendt",
    title: "Noon Register",
    year: 2025,
    medium: "Acrylic on canvas",
    w: 200,
    h: 100,
    price: 32000,
    status: "sold",
    art: {
      kind: "stripes",
      colors: ["#efe9dc", "#a9b8a0", "#dc8f5a", "#2c3a35"],
      seed: 21,
    },
    note: "A horizontal register of the midday hour across a full month. Acquired by a private collection in Seoul.",
  },
  {
    id: "pale-interval",
    artist: "yuki-arendt",
    title: "Pale Interval",
    year: 2026,
    medium: "Gouache on paper",
    w: 38,
    h: 56,
    price: 4800,
    status: "available",
    art: {
      kind: "stripes",
      colors: ["#f4efe4", "#d8c9a8", "#b8c7cf", "#e4b9a0"],
      seed: 4,
    },
    note: "A study for Measured Light, shown in Small Hours. The quietest work in the room.",
    viewingRoom: true,
  },
  // Lior Basso
  {
    id: "quarter-turn-ii",
    artist: "lior-basso",
    title: "Quarter Turn II",
    year: 2026,
    medium: "Vitreous enamel on steel",
    w: 100,
    h: 100,
    price: 22000,
    status: "available",
    art: {
      kind: "arcs",
      colors: ["#e9e4d8", "#1d4e6e", "#c9452f", "#e8b84a"],
      seed: 2,
    },
    note: "Eleven firings. A preview of Basso's January exhibition, offered ahead of the opening.",
    viewingRoom: true,
  },
  {
    id: "meridian",
    artist: "lior-basso",
    title: "Meridian",
    year: 2025,
    medium: "Vitreous enamel on steel",
    w: 110,
    h: 150,
    price: null,
    status: "available",
    art: {
      kind: "arcs",
      colors: ["#13161a", "#e6dfcf", "#7c8d6a", "#b34a2c"],
      seed: 9,
    },
    note: "The only work in the series that survived all fourteen firings. Price on request; a condition report is available.",
    viewingRoom: true,
  },
  // Noa Finch
  {
    id: "crease-11",
    artist: "noa-finch",
    title: "Crease 11",
    year: 2025,
    medium: "Pigment on folded cotton paper",
    w: 50,
    h: 70,
    price: 5200,
    status: "available",
    art: { kind: "fold", colors: ["#f3eee4", "#2f5b8a", "#9fb6cf"], seed: 11 },
    note: "Indigo pooled along a single diagonal fold. Framed float-mounted in white oak so the ridge of the fold catches the light.",
    viewingRoom: true,
  },
  {
    id: "crease-14",
    artist: "noa-finch",
    title: "Crease 14",
    year: 2026,
    medium: "Pigment on folded cotton paper",
    w: 50,
    h: 70,
    price: 5200,
    status: "reserved",
    art: { kind: "fold", colors: ["#f2ebe0", "#b3502f", "#e2a98e"], seed: 14 },
    note: "Iron oxide on a double fold. Reserved during the Small Hours preview.",
  },
  {
    id: "valley-fold",
    artist: "noa-finch",
    title: "Valley Fold",
    year: 2026,
    medium: "Pigment on folded cotton paper",
    w: 80,
    h: 110,
    price: 8600,
    status: "available",
    art: { kind: "fold", colors: ["#eee9df", "#4c6b4f", "#a9bea2"], seed: 6 },
    note: "Finch's largest sheet to date, folded on the gallery floor because it would not fit on her studio table.",
    viewingRoom: true,
  },
  // Adaeze Okon
  {
    id: "warp-study-4",
    artist: "adaeze-okon",
    title: "Warp Study 4",
    year: 2026,
    medium: "Woven cotton tape and acrylic",
    w: 110,
    h: 140,
    price: 21000,
    status: "available",
    art: {
      kind: "weave",
      colors: ["#efe7d6", "#c2462e", "#1f3b5b", "#e3a83b"],
      seed: 4,
    },
    note: "A first look at Warp and Weft, which opens on 20 November. Collectors may reserve ahead of the opening.",
    viewingRoom: true,
  },
  {
    id: "market-day",
    artist: "adaeze-okon",
    title: "Market Day",
    year: 2025,
    medium: "Woven cotton tape and acrylic",
    w: 150,
    h: 180,
    price: null,
    status: "reserved",
    art: {
      kind: "weave",
      colors: ["#f1e6cf", "#2c6b4f", "#d9772f", "#5a2d4a"],
      seed: 12,
    },
    note: "Woven on the loom built from the artist's grandmother's market stall. Price on request.",
  },
  // Henrik Vass
  {
    id: "grey-coast-2",
    artist: "henrik-vass",
    title: "Grey Coast 2",
    year: 2026,
    medium: "Oil on gessoed board",
    w: 60,
    h: 40,
    price: 8500,
    status: "sold",
    art: {
      kind: "horizon",
      colors: ["#c9ccc8", "#5e6866", "#efe9dc"],
      seed: 2,
    },
    note: "Sold on the opening night of Grey Coast.",
  },
  {
    id: "north-light",
    artist: "henrik-vass",
    title: "North Light",
    year: 2026,
    medium: "Oil on gessoed board",
    w: 90,
    h: 60,
    price: 12500,
    status: "available",
    art: {
      kind: "horizon",
      colors: ["#d7dbd6", "#2f4148", "#f3e7c4"],
      seed: 5,
    },
    note: "A low band of sea under a high white sky, with one seam of light where the fog lifts.",
    viewingRoom: true,
  },
  {
    id: "sound-at-dusk",
    artist: "henrik-vass",
    title: "Sound at Dusk",
    year: 2025,
    medium: "Oil on gessoed board",
    w: 40,
    h: 30,
    price: 6200,
    status: "available",
    art: {
      kind: "horizon",
      colors: ["#b9a7a0", "#3a3a48", "#e6c7a6"],
      seed: 9,
    },
    note: "The smallest work on offer, and one of Vass's favourites: the colour of the sound twenty minutes after sunset.",
    viewingRoom: true,
  },
];

/* ------------------------------------------------------------ exhibitions */

export type ExhibitionStatus = "current" | "upcoming" | "past";

export type Exhibition = {
  slug: string;
  title: string;
  artists: string[];
  space: string;
  /** ISO dates. */
  opens: string;
  closes: string;
  status: ExhibitionStatus;
  summary: string;
  text: string[];
  works: string[];
  view?: { src: string; alt: string };
};

export const exhibitions: Exhibition[] = [
  {
    slug: "weather-inside",
    title: "Weather Inside",
    artists: ["ines-calder"],
    space: "Gallery 1",
    opens: "2026-09-11",
    closes: "2026-11-07",
    status: "current",
    summary:
      "Eight new paintings that hold the light of a room the way a room holds weather.",
    text: [
      "Ines Calder's fourth exhibition with Folio brings together eight paintings made over two years in her New York studio. Each began as a note on the light in a particular room at a particular hour; each ended, months later, as a few soft bands of colour suspended over a dark ground.",
      "The paintings are hung low and wide apart in Gallery 1, with a single bench at the centre of the room. Calder asked for the ceiling lights to be dimmed by a third, so the canvases give off more light than they receive.",
      "A 128-page catalogue with an essay by the critic Rosa Imbert is available in the shop.",
    ],
    works: [
      "held-breath",
      "low-tide-room",
      "weather-inside-iv",
      "afternoon-sill",
    ],
    view: {
      src: galleryThree,
      alt: "Gallery 1, an empty white room with a tall doorway and a large painted numeral 3 on the far wall",
    },
  },
  {
    slug: "ledger",
    title: "Ledger",
    artists: ["tomas-ruiz-hale"],
    space: "Gallery 2",
    opens: "2026-09-11",
    closes: "2026-11-07",
    status: "current",
    summary: "Forty-one hand-ruled grids, each one a diary kept in graphite.",
    text: [
      "For three years Tomás Ruiz-Hale has kept a diary in grids: one ruled line for every hour spent in the studio, one filled cell for anything that interrupted the work. Ledger shows the series complete for the first time, forty-one sheets hung edge to edge around Gallery 2.",
      "Read from the doorway, the room is a single grey field broken by a few colours. Read from a step away, it is a record of rain, illness, a move between two cities and the birth of a daughter.",
    ],
    works: ["ledger-14", "ledger-19", "tally-for-a-year"],
    view: {
      src: visitor,
      alt: "A visitor with a backpack stands in front of a grid of small framed works on a white wall",
    },
  },
  {
    slug: "small-hours",
    title: "Small Hours: works on paper",
    artists: ["mara-ellis", "yuki-arendt", "noa-finch", "tomas-ruiz-hale"],
    space: "Print Room",
    opens: "2026-10-02",
    closes: "2026-11-22",
    status: "current",
    summary:
      "Four artists, thirty sheets of paper and a working screenprint press in the room.",
    text: [
      "Small Hours gathers drawings, studies and prints by four Folio artists, all made at night or very early in the morning. The Print Room's press stays in use throughout the exhibition: on Thursday evenings Mara Ellis prints a new edition in front of visitors.",
      "Works on paper are the most direct way into an artist's thinking and the most affordable way to start a collection. Every work in the room is priced under $10,000.",
    ],
    works: [
      "pale-interval",
      "crease-11",
      "crease-14",
      "small-hours-3",
      "ledger-14",
    ],
    view: {
      src: doorway,
      alt: "Double doors standing open between two white rooms with pale wooden floors",
    },
  },
  {
    slug: "warp-and-weft",
    title: "Warp and Weft",
    artists: ["adaeze-okon"],
    space: "Gallery 1",
    opens: "2026-11-20",
    closes: "2027-01-16",
    status: "upcoming",
    summary:
      "Adaeze Okon's first solo exhibition in the United States: eleven woven paintings.",
    text: [
      "Adaeze Okon weaves painted cotton tape on a loom built from the frame of her grandmother's market stall in Lagos. Warp and Weft shows eleven new works alongside the loom itself, installed in the centre of Gallery 1.",
      "The opening reception is on Thursday 19 November from 18:00 to 20:00. All are welcome; no booking needed.",
    ],
    works: ["warp-study-4", "market-day"],
  },
  {
    slug: "quarter-turn",
    title: "Quarter Turn",
    artists: ["lior-basso"],
    space: "Gallery 2",
    opens: "2027-01-28",
    closes: "2027-03-13",
    status: "upcoming",
    summary:
      "Vitreous enamel arcs fired up to fourteen times, from a series that broke more often than it survived.",
    text: [
      "Lior Basso's third exhibition with Folio presents the survivors of a two-year series of enamel panels. Of thirty-two begun, nine made it through the kiln intact. Basso will show the nine alongside fragments of the panels that cracked.",
    ],
    works: ["quarter-turn-ii", "meridian"],
  },
  {
    slug: "grey-coast",
    title: "Grey Coast",
    artists: ["henrik-vass"],
    space: "Gallery 1",
    opens: "2026-05-15",
    closes: "2026-07-25",
    status: "past",
    summary:
      "Twenty-two small paintings of one Norwegian coastline, made from memory.",
    text: [
      "Henrik Vass has painted the same nine kilometres of coast near Bergen for thirty years, always from memory and always on small boards. Grey Coast hung twenty-two of them at eye level in a single line around Gallery 1, like a horizon running round the room.",
    ],
    works: ["grey-coast-2", "north-light", "sound-at-dusk"],
    view: {
      src: skylight,
      alt: "A curved concrete passage lit from a long skylight above",
    },
  },
  {
    slug: "measured-light",
    title: "Measured Light",
    artists: ["yuki-arendt"],
    space: "Gallery 1 and Gallery 2",
    opens: "2026-03-06",
    closes: "2026-04-25",
    status: "past",
    summary:
      "Band paintings that transcribe a single day of daylight into colour and interval.",
    text: [
      "Yuki Arendt measured the sunlight crossing her Berlin studio floor every ten minutes for a year, then chose twelve days to paint. Measured Light filled both main galleries and drew more visitors than any Folio exhibition to date.",
    ],
    works: ["measured-light-7", "noon-register"],
    view: {
      src: atrium,
      alt: "Looking down into a busy gallery atrium with visitors crossing a pale stone floor",
    },
  },
  {
    slug: "an-exercise-in-balance",
    title: "An Exercise in Balance",
    artists: ["mara-ellis"],
    space: "Gallery 2",
    opens: "2026-01-09",
    closes: "2026-02-21",
    status: "past",
    summary:
      "Mara Ellis's first solo exhibition with Folio: paintings on aluminium and the editions that led to them.",
    text: [
      "An Exercise in Balance placed Mara Ellis's large aluminium paintings beside the small screenprints where each composition was first tested. Visitors could follow a form from a 30-centimetre print to a 120-centimetre panel and see what changed when it grew.",
    ],
    works: ["an-exercise-in-balance", "pivot"],
  },
  {
    slug: "creases",
    title: "Creases",
    artists: ["noa-finch"],
    space: "Print Room",
    opens: "2025-10-17",
    closes: "2025-12-06",
    status: "past",
    summary:
      "Noa Finch's debut: folded sheets of cotton paper washed with a single pigment each.",
    text: [
      "Creases introduced Noa Finch with fourteen works on folded paper, each washed in a single pigment that gathers in the crease. The exhibition sold out in its first week, and Finch joined the gallery's roster the following spring.",
    ],
    works: ["crease-11", "valley-fold"],
  },
];

export type GalleryEvent = {
  id: string;
  date: string;
  time: string;
  kind: "Talk" | "Tour" | "Live printing" | "Reading" | "Opening";
  title: string;
  exhibition: string;
  detail: string;
};

export const events: GalleryEvent[] = [
  {
    id: "calder-conversation",
    date: "2026-10-22",
    time: "18:30",
    kind: "Talk",
    title: "Ines Calder in conversation with Rosa Imbert",
    exhibition: "weather-inside",
    detail: "Free, 60 seats. Doors at 18:00.",
  },
  {
    id: "slow-looking-ledger",
    date: "2026-10-25",
    time: "12:30",
    kind: "Tour",
    title: "Slow looking: forty minutes with one Ledger",
    exhibition: "ledger",
    detail: "Free, 12 places, meet at the front desk.",
  },
  {
    id: "print-night",
    date: "2026-10-29",
    time: "18:00",
    kind: "Live printing",
    title: "Mara Ellis prints Small Hours, 4",
    exhibition: "small-hours",
    detail: "Thursday late. Drop in until 20:00.",
  },
  {
    id: "ledger-read-aloud",
    date: "2026-11-05",
    time: "19:00",
    kind: "Reading",
    title: "Ledger, read aloud, with the poet Amaru Vance",
    exhibition: "ledger",
    detail: "Free, standing room. Last event before the show closes.",
  },
  {
    id: "okon-opening",
    date: "2026-11-19",
    time: "18:00",
    kind: "Opening",
    title: "Warp and Weft, opening reception",
    exhibition: "warp-and-weft",
    detail: "All welcome, no booking needed. Until 20:00.",
  },
  {
    id: "okon-talk",
    date: "2026-12-03",
    time: "18:30",
    kind: "Talk",
    title: "Adaeze Okon on cloth, colour and her grandmother's loom",
    exhibition: "warp-and-weft",
    detail: "Free, 60 seats. Doors at 18:00.",
  },
];

/* ------------------------------------------------------------------- shop */

export type ShopKind = "Editions" | "Books" | "Posters";

export type ShopItem = {
  id: string;
  kind: ShopKind;
  name: string;
  by: string;
  price: number;
  /** Centimetres for editions and posters; page count for books. */
  spec: string;
  details: string[];
  description: string;
  art: Art;
  /** Book covers: background colour of the cover board. */
  cover?: string;
  options: { label: string; add: number }[];
  added: string;
};

export const shop: ShopItem[] = [
  {
    id: "balance-edition",
    kind: "Editions",
    name: "Balance",
    by: "Mara Ellis",
    price: 420,
    spec: "60 × 45 cm",
    details: [
      "Seven-colour screenprint",
      "Somerset Satin 300 gsm",
      "Edition of 50, signed and numbered",
    ],
    description:
      "The composition that became An Exercise in Balance, printed by the artist in seven hand-mixed colours. Each sheet is signed and numbered in pencil.",
    art: {
      kind: "forms",
      colors: ["#efe6d4", "#d94d31", "#161513", "#d2b349"],
      seed: 2,
    },
    options: [
      { label: "Unframed", add: 0 },
      { label: "Framed in white oak", add: 220 },
    ],
    added: "2026-01-09",
  },
  {
    id: "interval-riso",
    kind: "Editions",
    name: "Interval",
    by: "Yuki Arendt",
    price: 140,
    spec: "42 × 30 cm",
    details: [
      "Four-colour risograph",
      "Munken Pure 170 gsm",
      "Edition of 100, signed",
    ],
    description:
      "A day of studio light translated into four risograph inks. Small enough for a shelf, careful enough for a wall.",
    art: {
      kind: "stripes",
      colors: ["#f4efe4", "#e2b43c", "#6b8fb5", "#d96a3a"],
      seed: 3,
    },
    options: [
      { label: "Unframed", add: 0 },
      { label: "Framed in white oak", add: 160 },
    ],
    added: "2026-03-06",
  },
  {
    id: "fold-study",
    kind: "Editions",
    name: "Fold Study",
    by: "Noa Finch",
    price: 380,
    spec: "50 × 35 cm",
    details: [
      "Pigment print, hand-folded",
      "Hahnemühle Photo Rag 308 gsm",
      "Edition of 40, signed and numbered",
    ],
    description:
      "Printed flat, then folded by the artist along the same diagonal as her unique works, so every sheet carries a real crease.",
    art: { kind: "fold", colors: ["#f3eee4", "#2f5b8a", "#9fb6cf"], seed: 4 },
    options: [
      { label: "Unframed", add: 0 },
      { label: "Float-framed in white oak", add: 240 },
    ],
    added: "2025-10-17",
  },
  {
    id: "dusk-sound",
    kind: "Editions",
    name: "Dusk, Sound",
    by: "Henrik Vass",
    price: 260,
    spec: "40 × 50 cm",
    details: [
      "Archival pigment print",
      "Hahnemühle William Turner 310 gsm",
      "Edition of 60, signed",
    ],
    description:
      "A faithful print of one of Vass's small boards, proofed eleven times until the grey of the sea matched the painting.",
    art: {
      kind: "horizon",
      colors: ["#b9a7a0", "#3a3a48", "#e6c7a6"],
      seed: 9,
    },
    options: [
      { label: "Unframed", add: 0 },
      { label: "Framed in white oak", add: 180 },
    ],
    added: "2026-05-15",
  },
  {
    id: "weather-inside-book",
    kind: "Books",
    name: "Weather Inside",
    by: "Ines Calder",
    price: 45,
    spec: "128 pages",
    details: [
      "Softcover with flaps, 24 × 30 cm",
      "Essay by Rosa Imbert",
      "Folio Editions, 2026",
    ],
    description:
      "The catalogue of Calder's current exhibition, with full-page plates of every painting and an essay on soft edges and slow light.",
    art: { kind: "field", colors: ["#2f3a4a", "#c96f4a", "#e3c9a1"], seed: 3 },
    cover: "#e3dccf",
    options: [
      { label: "Standard", add: 0 },
      { label: "Signed by the artist", add: 25 },
    ],
    added: "2026-09-11",
  },
  {
    id: "ledger-book",
    kind: "Books",
    name: "Ledger",
    by: "Tomás Ruiz-Hale",
    price: 38,
    spec: "96 pages",
    details: [
      "Swiss-bound softcover, 21 × 28 cm",
      "All 41 sheets reproduced at full page",
      "Folio Editions, 2026",
    ],
    description:
      "Every sheet from the Ledger series, with the artist's own key to what each colour records.",
    art: { kind: "grid", colors: ["#f1ede3", "#6a665f", "#2b4f8a"], seed: 14 },
    cover: "#d9dfe3",
    options: [{ label: "Standard", add: 0 }],
    added: "2026-09-11",
  },
  {
    id: "ten-years",
    kind: "Books",
    name: "Folio: Ten Years",
    by: "Folio Editions",
    price: 65,
    spec: "312 pages",
    details: [
      "Clothbound hardcover, 22 × 29 cm",
      "Every exhibition from 2016 to 2026",
      "Folio Editions, 2026",
    ],
    description:
      "Sixty exhibitions, eight artists and one building, with installation views, wall texts and a conversation between the gallery's founders.",
    art: {
      kind: "arcs",
      colors: ["#e9e4d8", "#1d4e6e", "#c9452f", "#e8b84a"],
      seed: 2,
    },
    cover: "#161513",
    options: [{ label: "Standard", add: 0 }],
    added: "2026-06-01",
  },
  {
    id: "small-hours-poster",
    kind: "Posters",
    name: "Small Hours poster",
    by: "Mara Ellis",
    price: 30,
    spec: "70 × 50 cm",
    details: [
      "Offset lithograph",
      "Arcoset 140 gsm",
      "Shipped rolled in a tube",
    ],
    description:
      "The exhibition poster for Small Hours, printed in three spot colours from Ellis's design.",
    art: {
      kind: "forms",
      colors: ["#f2ede3", "#78875a", "#d94d31", "#161513"],
      seed: 13,
    },
    options: [{ label: "Standard", add: 0 }],
    added: "2026-10-02",
  },
];

export const shipping = { flat: 18, freeOver: 300 };

/* ------------------------------------------------------------- visit info */

/** 0 = Sunday. null = closed. Hours in 24h "HH:MM". */
export const hours: ({ open: string; close: string } | null)[] = [
  { open: "12:00", close: "17:00" },
  null,
  { open: "10:00", close: "18:00" },
  { open: "10:00", close: "18:00" },
  { open: "10:00", close: "20:00" },
  { open: "10:00", close: "18:00" },
  { open: "10:00", close: "18:00" },
];

export const visit = {
  intro:
    "Admission is always free. No ticket, no booking, no bag check for anything smaller than a carry-on.",
  gettingThere: [
    {
      title: "By subway",
      text: "F or G to Carroll Street, then nine minutes west along Tanner Street.",
    },
    {
      title: "By ferry",
      text: "Red Hook Landing is a six-minute walk. Ferries run every 30 minutes until 21:00.",
    },
    {
      title: "By bike",
      text: "Racks for twelve bikes outside the front door; a docking station on Pier Road.",
    },
  ],
  access: [
    "Step-free entrance on Tanner Street, with an automatic door.",
    "Lift to Gallery 2 and an accessible toilet on both floors.",
    "Folding stools and wheelchairs to borrow at the front desk.",
    "Large-print wall texts and checklists in every room.",
    "Assistance dogs are welcome. Quiet hour every Wednesday, 10:00 to 11:00.",
  ],
  spaces: [
    {
      name: "Gallery 1",
      text: "The former binding hall: 210 m², 4.6 m ceilings, north-light roof.",
    },
    {
      name: "Gallery 2",
      text: "Upstairs, 140 m², daylight from three tall windows on the east side.",
    },
    {
      name: "Print Room",
      text: "A working screenprint studio that doubles as our works-on-paper space.",
    },
  ],
  faq: [
    {
      q: "Is the gallery free?",
      a: "Yes, always. Talks and tours are free too; some have limited places, listed with each event.",
    },
    {
      q: "Can I take photographs?",
      a: "Yes, without flash. Please credit the artist if you post a work online.",
    },
    {
      q: "Can I buy the works on show?",
      a: "Most works are for sale and every price is on the checklist at the front desk and in the viewing room. Ask any member of staff, or send an enquiry and a director will reply within one working day.",
    },
    {
      q: "Do you offer group visits?",
      a: "We host school, university and private groups of up to 25 on weekday mornings before opening. Send an enquiry with your preferred dates.",
    },
    {
      q: "Is there a cloakroom?",
      a: "A free, staffed cloakroom by the front desk takes coats, bags and folding buggies.",
    },
  ],
};

/* -------------------------------------------------------------- about */

export const about = {
  title: "A gallery in a bookbindery",
  lede: "Folio opened in 2016 in a former bookbinding works on Tanner Street. We represent eight living artists and show them slowly: five or six exhibitions a year, each given eight weeks or more.",
  story: [
    "The building was a bindery for sixty years, and we kept what it taught us: good things take long, careful work, and the people who do it deserve to be named. The binding hall became Gallery 1; the paper store upstairs became Gallery 2; the guillotine room is now the Print Room, where our artists make editions in public.",
    "We publish every price. Each work in the gallery and in the viewing room shows what it costs, because collecting should not begin with a question you are embarrassed to ask. Artists receive sixty percent of every sale and a production fee for every exhibition, sold or not.",
    "We also publish books. Folio Editions has produced twenty-three catalogues and artist books, all designed in house and printed within 200 miles of the gallery.",
  ],
  principles: [
    {
      title: "Prices on the label",
      text: "Every available work is priced in the gallery and online. Works marked price on request are the exception, and we say why.",
    },
    {
      title: "Paid to exhibit",
      text: "Artists receive a production fee of $4,000 to $12,000 per solo exhibition, independent of sales.",
    },
    {
      title: "Long shows",
      text: "Eight weeks minimum, so people can come back, and so can the artist.",
    },
  ],
  team: [
    {
      name: "Clara Weiss",
      role: "Founder and director",
      email: "clara@folio.example",
    },
    {
      name: "Owen Achterberg",
      role: "Senior director, sales",
      email: "sales@folio.example",
    },
    {
      name: "Priya Raman",
      role: "Registrar and collections",
      email: "registrar@folio.example",
    },
    {
      name: "Jonah Lisle",
      role: "Exhibitions and installation",
      email: "install@folio.example",
    },
    {
      name: "Mei Okada",
      role: "Viewing room and editions",
      email: "editions@folio.example",
    },
    {
      name: "Sol Rivas",
      role: "Press and public programmes",
      email: "press@folio.example",
    },
  ],
};

/* --------------------------------------------------------------- home copy */

export const home = {
  close: {
    title: "See a work in person before you decide",
    text: "Book a private viewing and we will hang the works on your list in the Print Room, with the lights set the way you will live with them. Weekdays before opening, or Thursday evenings after close.",
  },
};

/* ------------------------------------------------------------------ helpers */

export const artistBySlug = (slug: string) =>
  artists.find((a) => a.slug === slug);
export const workById = (id: string) => works.find((w) => w.id === id);
export const exhibitionBySlug = (slug: string) =>
  exhibitions.find((e) => e.slug === slug);
