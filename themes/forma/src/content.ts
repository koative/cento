import duneHouse from "./assets/dune-house.jpg";
import timberCeiling from "./assets/timber-ceiling.jpg";
import slatHall from "./assets/slat-hall.jpg";
import shadowHouse from "./assets/shadow-house.jpg";
import shadowDoor from "./assets/shadow-door.jpg";
import archiveTower from "./assets/archive-tower.jpg";
import archiveDetail from "./assets/archive-detail.jpg";
import hillsideSteps from "./assets/hillside-steps.jpg";
import galleryRamp from "./assets/gallery-ramp.jpg";
import galleryWindow from "./assets/gallery-window.jpg";
import housingFacade from "./assets/housing-facade.jpg";
import housingStair from "./assets/housing-stair.jpg";
import towerRetrofit from "./assets/tower-retrofit.jpg";
import towerCanopy from "./assets/tower-canopy.jpg";
import schoolStair from "./assets/school-stair.jpg";
import schoolLanding from "./assets/school-landing.jpg";
import studioRoom from "./assets/studio.jpg";
import drawings from "./assets/drawings.jpg";
import cabinWindow from "./assets/cabin-window.jpg";
import brickWindow from "./assets/brick-window.jpg";
import sunlitStair from "./assets/sunlit-stair.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

const img = (src: string, alt: string, w = 1600, h = 1067): Img => ({
  src,
  alt,
  w,
  h,
});

export const brand = {
  name: "Forma",
  legal: "Forma Arkitekter ApS",
  sector: "Architecture studio",
  line: "Architecture built around the light.",
  email: "hello@forma.example",
  press: "press@forma.example",
  jobs: "jobs@forma.example",
  phone: "+1 555 0142 2011",
  phoneHref: "tel:+15550142011",
  address: ["Pakhus 4, Sølvgade 112", "1307 Copenhagen K", "Denmark"],
  hours: "Monday to Friday, 8.30–17.30",
  founded: 2011,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};

export const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/studio", label: "Studio" },
  { to: "/process", label: "Process" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

/* ------------------------------------------------------------------ projects */

export const projectTypes = [
  "Homes",
  "Housing",
  "Learning",
  "Culture",
  "Landscape",
  "Retrofit",
] as const;
export type ProjectType = (typeof projectTypes)[number];
export type Status = "Built" | "On site" | "In design";

/** A simplified south-facing section, in metres, used by the light study. */
export type Section = {
  label: string;
  depth: number;
  ceiling: number;
  sill: number;
  head: number;
  overhang: number;
};

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  place: string;
  country: string;
  lat: number;
  year: number;
  status: Status;
  area: number;
  client: string;
  engineer: string;
  team: string[];
  summary: string;
  intro: string;
  chapters: { title: string; body: string[] }[];
  materials: { name: string; spec: string }[];
  quote?: { text: string; by: string };
  cover: Img;
  gallery: Img[];
  section: Section;
};

export const projects: Project[] = [
  {
    slug: "dune-house",
    name: "Dune House",
    type: "Homes",
    place: "Hvidbjerg",
    country: "Denmark",
    lat: 56.9,
    year: 2023,
    status: "Built",
    area: 186,
    client: "Private client",
    engineer: "Holm & Vestergaard",
    team: ["Ida Mørch", "Malthe Rask", "Elin Strand"],
    summary:
      "A shingled summer house that became a year-round home, set low behind the first dune line.",
    intro:
      "The family wanted a house they could stay in after September. We kept the footprint of the 1960s cabin it replaces, lifted the living floor a metre above the marram grass and wrapped everything in untreated larch shingles that will silver within three winters.",
    chapters: [
      {
        title: "The site",
        body: [
          "The plot sits on the lee side of a dune ridge, eighty metres from the water. Wind arrives from the west four days in five, so the house turns a closed shoulder to it and opens fully to the south and east, where a sheltered deck catches the morning.",
          "Planning allowed a ridge height of 6.5 metres. We used it for a single long roof that drops to 2.4 metres on the dune side, so from the beach the house reads as one more grey shape in the grass.",
        ],
      },
      {
        title: "The idea",
        body: [
          "Everything happens in one room, 19 metres long, divided by two timber cores that hold the bathroom, the stair and the stove. The southern glazing is set back under a 1.1 metre overhang: in June the floor stays in shade at noon, in January low sun runs the full depth of the room.",
          "Bedrooms are small and lined in oiled pine, like cabins on a boat. The children chose the round window above their bunks.",
        ],
      },
      {
        title: "Making it",
        body: [
          "A local carpenter laid 14,000 shingles by hand over one winter. The frame is prefabricated spruce on screw piles, which meant no concrete foundations in the dune and a site that recovered within one growing season.",
        ],
      },
    ],
    materials: [
      {
        name: "Cladding",
        spec: "Split larch shingles, untreated, triple lapped",
      },
      {
        name: "Frame",
        spec: "Prefabricated spruce cassettes on steel screw piles",
      },
      {
        name: "Ceilings",
        spec: "Oiled pine boards, 21 mm, laid diagonally in the living room",
      },
      { name: "Floors", spec: "Douglas fir, soap finish" },
      { name: "Insulation", spec: "Wood fibre, 300 mm in roof" },
    ],
    quote: {
      text: "We came for the summer and forgot to leave. In November the light goes all the way to the kitchen wall.",
      by: "The client, two winters in",
    },
    cover: img(
      duneHouse,
      "A two-storey house clad in grey timber shingles, with a deep balcony facing low evening sun above beach grass",
    ),
    gallery: [
      img(
        timberCeiling,
        "A timber ceiling of narrow boards laid in triangular panels, each panel running in a different direction",
        1400,
        933,
      ),
    ],
    section: {
      label: "Living room, south facade",
      depth: 7.2,
      ceiling: 3.2,
      sill: 0,
      head: 2.7,
      overhang: 1.1,
    },
  },
  {
    slug: "slat-hall",
    name: "Slat Hall",
    type: "Culture",
    place: "Nørrebro, Copenhagen",
    country: "Denmark",
    lat: 55.7,
    year: 2024,
    status: "Built",
    area: 640,
    client: "Nørrebro Folkekøkken association",
    engineer: "Søndergaard Structures",
    team: ["Jonas Elvestad", "Amira Haddad", "Malthe Rask", "Lea Bjerre"],
    summary:
      "A community dining hall for 220 people behind a screen of oak slats that draws stripes across the room.",
    intro:
      "Every evening the association serves a two-course dinner for 45 kroner to whoever turns up. Their old hall was a basement. The new one is a single tall room on a corner plot, faced with a louvred oak screen that keeps the low western sun off the tables and turns it into a pattern instead.",
    chapters: [
      {
        title: "The brief",
        body: [
          "Seat 220 at long tables, clear them in ten minutes for a dance, and cost no more to heat than the basement did. The association also asked for a kitchen you can see into, because the cooks are volunteers and they wanted to be part of the room.",
        ],
      },
      {
        title: "The screen",
        body: [
          "The slats are 45 by 145 mm oak, spaced at 90 mm and angled 30 degrees off the facade. We tested the spacing on a 1:10 model under a heliodon for two weeks; at that angle direct sun never falls on a diner's face between April and September, but the room still reads the time of day.",
          "Behind the slats sits a triple-glazed wall with opening panels at the top and bottom. On summer evenings the hall ventilates itself.",
        ],
      },
    ],
    materials: [
      { name: "Screen", spec: "European oak slats, 45 × 145 mm, untreated" },
      { name: "Structure", spec: "Glulam portal frames at 4.8 m centres" },
      { name: "Floor", spec: "Polished concrete with recycled aggregate" },
      { name: "Acoustic lining", spec: "Wood-wool panels, natural grey" },
    ],
    quote: {
      text: "People stay longer now. We had to buy more chairs and a second dishwasher.",
      by: "Rikke Lund, chair of the association",
    },
    cover: img(
      slatHall,
      "A hall with stacked metal chairs, striped by bands of sunlight falling through a slatted wall",
    ),
    gallery: [],
    section: {
      label: "Dining hall, west screen",
      depth: 12,
      ceiling: 6.2,
      sill: 0,
      head: 5.6,
      overhang: 0.3,
    },
  },
  {
    slug: "courtyard-house",
    name: "Courtyard House",
    type: "Homes",
    place: "Aarhus",
    country: "Denmark",
    lat: 56.15,
    year: 2022,
    status: "Built",
    area: 214,
    client: "Private client",
    engineer: "Holm & Vestergaard",
    team: ["Ida Mørch", "Sanne Kooijman", "Elin Strand"],
    summary:
      "A house of board-marked concrete walls around a planted court, in a terrace of 1930s brick villas.",
    intro:
      "The plot was the garden of a corner villa: deep, narrow and overlooked on three sides. We turned the house inwards. Four concrete walls step down the slope and hold two courts, so every room looks into planting rather than at the neighbours.",
    chapters: [
      {
        title: "Walls first",
        body: [
          "The walls were cast in rough-sawn spruce shuttering that we later reused as the garden fence. They carry the roof, store the day's heat and give the house its single material voice inside and out.",
          "Openings are few and deliberate. A slot in the stair wall throws a vertical blade of light that crosses the hall between nine and eleven each morning.",
        ],
      },
      {
        title: "Living with it",
        body: [
          "The courts are planted with birch, ferns and moss that needed no irrigation after the first summer. Underfloor heating runs from an air-to-water heat pump, and the concrete mass means it barely switches on between April and October.",
        ],
      },
    ],
    materials: [
      {
        name: "Walls",
        spec: "Board-marked in-situ concrete, 30% GGBS cement replacement",
      },
      { name: "Roof", spec: "Sedum on CLT deck" },
      { name: "Windows", spec: "Oak frames, triple glazed" },
      { name: "Floors", spec: "Ground and polished screed" },
    ],
    cover: img(
      shadowHouse,
      "A pale concrete wall with a tall, sharp shadow falling across it, beside a dark doorway",
    ),
    gallery: [
      img(
        shadowDoor,
        "A dark corridor with two arched pools of light falling on horizontal boarded walls",
      ),
    ],
    section: {
      label: "Hall and court, south wall",
      depth: 6.4,
      ceiling: 2.9,
      sill: 0.4,
      head: 2.5,
      overhang: 0.6,
    },
  },
  {
    slug: "harbour-archive",
    name: "Harbour Archive",
    type: "Culture",
    place: "Esbjerg",
    country: "Denmark",
    lat: 55.47,
    year: 2025,
    status: "Built",
    area: 2150,
    client: "Municipality of Esbjerg",
    engineer: "Søndergaard Structures",
    team: [
      "Jonas Elvestad",
      "Sanne Kooijman",
      "Amira Haddad",
      "Oskar Lind",
      "Lea Bjerre",
    ],
    summary:
      "A sand-coloured concrete tower holding the town's maritime records, lit by three round openings.",
    intro:
      "Paper needs darkness and a steady 16 degrees. Readers need daylight. The archive solves both by stacking the stores in a thick-walled tower and putting the reading room at the top, where three round lights cut through 600 mm of concrete.",
    chapters: [
      {
        title: "A tower on the quay",
        body: [
          "The harbour front is horizontal: sheds, cranes, ferries. A 28 metre tower gives the archive an address and a lookout. The concrete is pigmented with local sand so it sits close to the colour of the old warehouses in summer.",
        ],
      },
      {
        title: "Passive conditions",
        body: [
          "The stores need no active cooling. Mass walls, small openings and a buffer corridor around each floor keep temperature drift under one degree a day. The building uses about a third of the energy the archive's previous rented shed did.",
          "In the reading room, the three lights are placed so a sun patch crosses each reading table once a day, never resting long enough to damage a document.",
        ],
      },
    ],
    materials: [
      {
        name: "Structure",
        spec: "Pigmented in-situ concrete, 600 mm external walls",
      },
      { name: "Lining", spec: "Lime-washed brick in the stair" },
      {
        name: "Reading tables",
        spec: "Solid ash, made by the municipal workshop",
      },
      { name: "Glazing", spec: "Laminated, UV-filtering, fixed" },
    ],
    quote: {
      text: "It is the first building in town where we did not have to argue about the air conditioning.",
      by: "Hanne Vestby, city archivist",
    },
    cover: img(
      archiveTower,
      "A sand-coloured concrete tower against a pale sky, with three small round windows and a band of bronze panels",
    ),
    gallery: [
      img(
        archiveDetail,
        "Looking up a tall concrete wall with regular tie-holes against a clear blue sky",
      ),
    ],
    section: {
      label: "Reading room, round lights",
      depth: 9,
      ceiling: 4.2,
      sill: 2.4,
      head: 3.4,
      overhang: 0.6,
    },
  },
  {
    slug: "ravine-steps",
    name: "Ravine Steps",
    type: "Landscape",
    place: "Bergen",
    country: "Norway",
    lat: 60.39,
    year: 2021,
    status: "Built",
    area: 3800,
    client: "Bergen Kommune, Urban Environment Agency",
    engineer: "Fjell Geoteknikk",
    team: ["Jonas Elvestad", "Oskar Lind", "Nora Aas"],
    summary:
      "A public stair of folded concrete walls that climbs a ravine and doubles as an amphitheatre.",
    intro:
      "A shortcut through a wooded ravine had been trodden by commuters for decades and was closed after a landslip. The competition asked for a safe route. We proposed a room in the landscape: walls that retain the slope, steps wide enough to sit on, and a slow ramp for bikes and buggies that switches back beside them.",
    chapters: [
      {
        title: "Folded walls",
        body: [
          "The retaining walls fold to follow the contours, so their height never exceeds 2.1 metres and the ravine still reads as a ravine. The faces are bush-hammered to show the local gneiss aggregate.",
          "Drainage runs in a visible channel down the east side; after heavy rain it becomes a small waterfall, which is now the most photographed thing in the district.",
        ],
      },
    ],
    materials: [
      {
        name: "Walls",
        spec: "In-situ concrete with local gneiss aggregate, bush-hammered",
      },
      { name: "Steps", spec: "Precast units, 420 mm treads, 150 mm risers" },
      { name: "Handrails", spec: "Galvanised steel with oak caps" },
      { name: "Planting", spec: "Native rowan, birch and fern, 1,900 plants" },
    ],
    cover: img(
      hillsideSteps,
      "A long flight of outdoor steps between angled concrete retaining walls, climbing towards trees and a blue sky",
      1600,
      1200,
    ),
    gallery: [],
    section: {
      label: "Upper landing, under the wall",
      depth: 5,
      ceiling: 2.1,
      sill: 0,
      head: 2.1,
      overhang: 0,
    },
  },
  {
    slug: "lindholm-kunsthal",
    name: "Lindholm Kunsthal",
    type: "Culture",
    place: "Malmö",
    country: "Sweden",
    lat: 55.6,
    year: 2026,
    status: "On site",
    area: 1480,
    client: "Lindholm Art Foundation",
    engineer: "Bergqvist Ingenjörer",
    team: ["Ida Mørch", "Amira Haddad", "Oskar Lind", "Elin Strand"],
    summary:
      "A white ramped extension to a 1912 water works, joining three new galleries to the old pump hall.",
    intro:
      "The foundation inherited a listed pump hall with no level access and no climate control. Rather than alter it, we built a new wing alongside and joined the two with a ramp that winds up through a top-lit void, so visitors move between old and new at the speed of walking.",
    chapters: [
      {
        title: "The ramp",
        body: [
          "The ramp rises at 1:20 over 54 metres, gentle enough to need no landings and to feel like part of the galleries rather than circulation. A continuous rooflight follows it, so the light changes as you climb.",
        ],
      },
      {
        title: "Status",
        body: [
          "The structure topped out in August 2026. Opening is planned for spring 2027 with a survey of Scanian textile art.",
        ],
      },
    ],
    materials: [
      { name: "Walls", spec: "White pigmented concrete, smooth formwork" },
      { name: "Rooflights", spec: "Diffusing glass with motorised blinds" },
      { name: "Floors", spec: "Oak end-grain blocks in galleries" },
    ],
    cover: img(
      galleryRamp,
      "A curving white ramp beneath a long rooflight, descending between tall smooth walls",
      1200,
      1600,
    ),
    gallery: [
      img(
        galleryWindow,
        "A small figure seen through a curved opening in a large white wall",
        1600,
        1060,
      ),
    ],
    section: {
      label: "Gallery 2, clerestory",
      depth: 10,
      ceiling: 5.5,
      sill: 3.8,
      head: 5.1,
      overhang: 0.4,
    },
  },
  {
    slug: "kvarter-orsted",
    name: "Kvarter Ørsted",
    type: "Housing",
    place: "Valby, Copenhagen",
    country: "Denmark",
    lat: 55.66,
    year: 2025,
    status: "Built",
    area: 6900,
    client: "Bolig Valby cooperative",
    engineer: "Søndergaard Structures",
    team: [
      "Jonas Elvestad",
      "Sanne Kooijman",
      "Lea Bjerre",
      "Nora Aas",
      "Malthe Rask",
    ],
    summary:
      "Sixty-four cooperative homes in two white blocks, every flat dual-aspect with a recessed loggia.",
    intro:
      "The cooperative's members had one rule for us: no flat with windows on only one side. Every one of the 64 homes runs through the block, with a recessed loggia on the south and a kitchen window to the shared garden on the north.",
    chapters: [
      {
        title: "Plan",
        body: [
          "Stairs serve two flats per landing, so there are no corridors and every front door gets daylight. Flats range from 48 m² studios to 112 m² family homes with a room that can be split in two later.",
          "The loggias are recessed 1.8 metres, deep enough for a table for four and deep enough to shade the living room glazing in high summer.",
        ],
      },
      {
        title: "Shared ground",
        body: [
          "Instead of private gardens, the ground floor holds a laundry, a workshop, a guest room members can book and a bike hall for 180 bikes. The courtyard is planted with fruit trees chosen by the members at a tasting.",
        ],
      },
    ],
    materials: [
      {
        name: "Facade",
        spec: "White glazed fibre-cement panels on timber battens",
      },
      { name: "Structure", spec: "CLT floors on concrete cores" },
      { name: "Windows", spec: "Aluminium-clad timber, triple glazed" },
      { name: "Stairs", spec: "Precast terrazzo, white aggregate" },
    ],
    quote: {
      text: "My daughter can see me from the garden while I cook. That was the whole point.",
      by: "Member, flat 2.14",
    },
    cover: img(
      housingFacade,
      "A white residential block with ribbon windows and deep recessed balconies against a clear sky",
    ),
    gallery: [
      img(
        housingStair,
        "A bright white stairwell seen from above, with landings stepping around a perforated wall",
      ),
    ],
    section: {
      label: "Living room behind loggia",
      depth: 6.8,
      ceiling: 2.6,
      sill: 0,
      head: 2.4,
      overhang: 1.8,
    },
  },
  {
    slug: "tower-seven",
    name: "Tower Seven Retrofit",
    type: "Retrofit",
    place: "Rotterdam",
    country: "Netherlands",
    lat: 51.92,
    year: 2024,
    status: "Built",
    area: 9200,
    client: "Woonstad Noord housing association",
    engineer: "Van Dijk Constructie",
    team: ["Sanne Kooijman", "Oskar Lind", "Nora Aas"],
    summary:
      "A 1968 concrete slab block kept, insulated and given new balconies instead of being demolished.",
    intro:
      "The association had budgeted for demolition. Our carbon study showed that keeping the frame saved roughly 4,100 tonnes of CO₂ against a new build of the same size. We stripped the block back to its concrete, wrapped it in a new insulated skin and hung a column of balconies on the south face.",
    chapters: [
      {
        title: "Keep, then improve",
        body: [
          "Residents stayed in their homes for all but nine days of the works. New windows went in from the outside, floor by floor, and the old single-glazed loggias became part of the living rooms.",
          "Heating demand fell from 168 to 41 kWh/m² a year. The entrance gained a new concrete canopy cast from the same mix as the original frame.",
        ],
      },
    ],
    materials: [
      { name: "Frame", spec: "Existing 1968 in-situ concrete, repaired" },
      { name: "Skin", spec: "Mineral wool, 200 mm, under lime render" },
      { name: "Balconies", spec: "Precast concrete, thermally broken" },
      { name: "Canopy", spec: "In-situ concrete, matched aggregate" },
    ],
    quote: {
      text: "They told us the building was finished. It turned out only the windows were.",
      by: "Resident since 1987",
    },
    cover: img(
      towerRetrofit,
      "A rough concrete apartment tower with stacked balconies and narrow vertical windows",
      1121,
      1600,
    ),
    gallery: [
      img(
        towerCanopy,
        "A thin curved concrete canopy on slim round columns in front of a tiled entrance",
      ),
    ],
    section: {
      label: "Former loggia, new glazing",
      depth: 7.5,
      ceiling: 2.55,
      sill: 0.9,
      head: 2.35,
      overhang: 1.2,
    },
  },
  {
    slug: "fjordskolen",
    name: "Fjordskolen",
    type: "Learning",
    place: "Roskilde",
    country: "Denmark",
    lat: 55.64,
    year: 2023,
    status: "Built",
    area: 4600,
    client: "Roskilde Municipality",
    engineer: "Holm & Vestergaard",
    team: [
      "Ida Mørch",
      "Jonas Elvestad",
      "Amira Haddad",
      "Malthe Rask",
      "Elin Strand",
    ],
    summary:
      "A primary school for 420 children organised around a timber stair hall where the whole school can sit.",
    intro:
      "The school's heart is a stair. Wide timber steps rise through three floors, lined in larch, and serve as assembly hall, reading room and the place where everyone waits out the rain at lunch.",
    chapters: [
      {
        title: "Classrooms",
        body: [
          "Every classroom has windows on two sides and opens onto a shared learning street. Ceilings are 3.4 metres high so daylight reaches the back row; the rooms are rarely lit artificially before November.",
        ],
      },
      {
        title: "Built with the children",
        body: [
          "Pupils from the old school drew the patterns on the stair balustrade, which a local workshop cut from offcuts of the larch lining. Their names are on the underside of the top step.",
        ],
      },
    ],
    materials: [
      { name: "Stair hall", spec: "Larch lining, oiled; CLT treads" },
      { name: "Structure", spec: "CLT on glulam frame, concrete basement" },
      { name: "Facade", spec: "Hand-made brick, Flemish bond" },
      { name: "Acoustics", spec: "Perforated birch ceilings" },
    ],
    cover: img(
      schoolStair,
      "A stair hall with a large diagonal panel of orange timber boarding set into a grey concrete structure",
      1600,
      1225,
    ),
    gallery: [
      img(
        schoolLanding,
        "A broad concrete stair rising past a perforated grey wall marked with a level number",
      ),
    ],
    section: {
      label: "Classroom, south windows",
      depth: 8,
      ceiling: 3.4,
      sill: 0.8,
      head: 3.1,
      overhang: 0.9,
    },
  },
];

/* ------------------------------------------------------------------ studio */

export const team = [
  {
    name: "Ida Mørch",
    role: "Founding partner",
    since: 2011,
    note: "Trained in Aarhus and Porto. Leads homes and learning.",
  },
  {
    name: "Jonas Elvestad",
    role: "Partner",
    since: 2013,
    note: "Landscape architect turned architect. Leads public work.",
  },
  {
    name: "Sanne Kooijman",
    role: "Associate",
    since: 2016,
    note: "Runs our retrofit practice and the Rotterdam desk.",
  },
  {
    name: "Amira Haddad",
    role: "Associate",
    since: 2017,
    note: "Cultural buildings, models and anything with a heliodon.",
  },
  {
    name: "Oskar Lind",
    role: "Project architect",
    since: 2019,
    note: "Technical design and site. Has the steadiest hand at 1:5.",
  },
  {
    name: "Lea Bjerre",
    role: "Project architect",
    since: 2020,
    note: "Housing and cooperative clients.",
  },
  {
    name: "Malthe Rask",
    role: "Architect",
    since: 2021,
    note: "Timber detailing and carpentry liaison.",
  },
  {
    name: "Elin Strand",
    role: "Architect",
    since: 2022,
    note: "Interiors, furniture and colour.",
  },
  {
    name: "Nora Aas",
    role: "Landscape architect",
    since: 2022,
    note: "Planting plans and public realm.",
  },
  {
    name: "Theo Winther",
    role: "Studio manager",
    since: 2014,
    note: "Fees, contracts and the coffee machine.",
  },
];

export const principles = [
  {
    title: "Draw the light first",
    body: "Before we draw a wall we draw where the sun falls on the site through a day and a year. Rooms are placed in the light they need: kitchens in the morning, workrooms in steady north light, living rooms where the evening reaches.",
  },
  {
    title: "Keep what is there",
    body: "The greenest building is usually the one already standing. We start every brief by asking what can stay: a frame, a wall, a tree, a habit of use. Since 2019 more than half our floor area has been retrofit.",
  },
  {
    title: "Fewer materials, used fully",
    body: "A building in three materials can be detailed well. We choose them for how they age, and we would rather show a joint honestly than hide it behind a trim.",
  },
];

export const awards = [
  { year: 2025, prize: "Kattegat Building Prize", project: "Harbour Archive" },
  {
    year: 2025,
    prize: "Northern Housing Review, best cooperative scheme",
    project: "Kvarter Ørsted",
  },
  {
    year: 2024,
    prize: "Nordic Timber Award, public buildings",
    project: "Slat Hall",
  },
  {
    year: 2024,
    prize: "Europa Retrofit Index, shortlist",
    project: "Tower Seven Retrofit",
  },
  { year: 2023, prize: "Danish Schools Design Medal", project: "Fjordskolen" },
  {
    year: 2022,
    prize: "Brick & Mortar Society, house of the year",
    project: "Courtyard House",
  },
  {
    year: 2021,
    prize: "Bergen open competition, first prize",
    project: "Ravine Steps",
  },
];

export const press = [
  {
    outlet: "Arkitekten Kvartal",
    title: "Forma and the patience of shingles",
    year: 2024,
  },
  {
    outlet: "Northern Building Review",
    title: "Sixty-four homes, no corridors",
    year: 2025,
  },
  {
    outlet: "Material Matters",
    title: "Why Tower Seven was never demolished",
    year: 2024,
  },
  { outlet: "Kunst & Rum", title: "A ramp as a gallery", year: 2026 },
];

export const studio = {
  intro:
    "Forma is a studio of eight architects, a landscape architect and a studio manager, working from a former grain store on Sølvgade. We have completed 41 buildings since 2011, from summer houses to a 28 metre archive, and we still build a physical model of every one.",
  room: img(
    studioRoom,
    "A bright studio room with tall black-framed windows, white walls and pendant lamps",
  ),
  roomCaption:
    "The studio, second floor of Pakhus 4. Models live on the long shelf by the window.",
  careers:
    "We hire twice a year, in February and August. Send a short letter and ten pages of work, drawings over renders. We reply to everyone.",
};

/* ------------------------------------------------------------------ process */

export const stages = [
  {
    name: "Brief & site",
    weeks: "2–4 weeks",
    share: 5,
    summary:
      "We walk the site with you at least twice, at different times of day, and write the brief together.",
    outputs: [
      "Measured survey and site photographs",
      "Sun and wind study",
      "Written brief with budget and programme",
    ],
  },
  {
    name: "Concept",
    weeks: "6–8 weeks",
    share: 15,
    summary:
      "Three genuinely different options, each with a model at 1:200, so you can choose between ideas rather than details.",
    outputs: [
      "Three options with models",
      "Light studies for key rooms",
      "Early cost check with a quantity surveyor",
    ],
  },
  {
    name: "Developed design",
    weeks: "8–12 weeks",
    share: 20,
    summary:
      "The chosen option becomes a building. We fix plans, sections and materials and prepare the planning application.",
    outputs: [
      "Planning drawings and statement",
      "Material samples board",
      "Engineer and consultant appointments",
    ],
  },
  {
    name: "Technical design",
    weeks: "10–16 weeks",
    share: 30,
    summary:
      "Every junction drawn at 1:20 or 1:5. This is where the quality of a building is decided, so it gets the most time.",
    outputs: [
      "Construction drawings and specification",
      "Tender package",
      "Contractor shortlist and interviews",
    ],
  },
  {
    name: "On site",
    weeks: "Length of the build",
    share: 25,
    summary:
      "We visit weekly, answer the contractor's questions within two working days and inspect every stage before it is covered up.",
    outputs: [
      "Weekly site reports with photographs",
      "Cost and change control",
      "Practical completion inspection",
    ],
  },
  {
    name: "Aftercare",
    weeks: "12 months",
    share: 5,
    summary:
      "A year after you move in we come back, measure how the building performs and fix what needs fixing.",
    outputs: [
      "Defects list and follow-up",
      "Energy and comfort readings",
      "One-year visit and a written review",
    ],
  },
];

export const fees = {
  intro:
    "We charge a percentage of construction cost, fixed at the end of the concept stage so you know the figure before the larger stages begin.",
  image: img(
    drawings,
    "Architectural drawings and a protractor spread across a desk",
  ),
  bands: [
    { label: "Houses and extensions", range: "11–14%" },
    { label: "Housing and schools", range: "7–9%" },
    { label: "Cultural and public buildings", range: "8–11%" },
    { label: "Retrofit studies", range: "Fixed fee from €18,000" },
  ],
};

export const faqs = [
  {
    q: "What is the smallest project you take on?",
    a: "A new house or a substantial extension, usually from around 120 m² or €600,000 of construction. For smaller work we will gladly recommend a younger practice we trust.",
  },
  {
    q: "Do you work outside Denmark?",
    a: "Yes. About a third of our work is in Sweden, Norway and the Netherlands, where we partner with a local architect of record for permits and site inspection.",
  },
  {
    q: "Can you help us find a site?",
    a: "We can review a site before you buy it. A half-day appraisal covers planning constraints, sun and access and costs a fixed €1,200, deducted from our fee if you go ahead.",
  },
  {
    q: "How do you keep a project on budget?",
    a: "An independent quantity surveyor prices the design at the end of concept, developed and technical stages. If a number drifts we change the design, not the quality of the details.",
  },
  {
    q: "Do you enter competitions?",
    a: "Two or three a year, mostly open public competitions for landscape and civic buildings. Ravine Steps and Harbour Archive both began as competition wins.",
  },
  {
    q: "Who will we actually work with?",
    a: "A partner leads every project from first meeting to the one-year visit, with a project architect who stays with you through site. You will not be handed down a ladder.",
  },
];

/* ------------------------------------------------------------------ journal */

export const postCategories = [
  "Essay",
  "Site notes",
  "Material",
  "Studio",
] as const;
export type PostCategory = (typeof postCategories)[number];
export type Block =
  { p: string } | { h: string } | { quote: string; by?: string };

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  author: string;
  excerpt: string;
  image: Img;
  body: Block[];
  project?: string;
};

export const posts: Post[] = [
  {
    slug: "drawing-at-one-to-twenty",
    title: "Why we draw every project at 1:20 before 1:100",
    category: "Essay",
    date: "2026-09-24",
    author: "Ida Mørch",
    excerpt:
      "A window sill tells you more about a building than its site plan. So we start there.",
    image: img(
      drawings,
      "Architectural drawings and a protractor spread across a desk",
    ),
    body: [
      {
        p: "Most studios work from the outside in: site plan, massing, plans, and only months later the details. We do it the other way round for one week at the start of every project. Before the concept is fixed, someone draws a window, a threshold and a roof edge at 1:20.",
      },
      {
        p: "It sounds backwards. It is the fastest way we know to find out what kind of building we are making. A sill that has to shed driving rain on a dune is a different object from a sill in a city courtyard, and it pulls the whole facade with it.",
      },
      { h: "What the detail decides" },
      {
        p: "A 1:20 section through a wall settles thickness, which settles the depth of the window reveal, which decides how light enters the room. Three decisions that a 1:100 plan makes by accident, we make on purpose.",
      },
      {
        quote:
          "The detail is not the end of the design. It is the first honest drawing.",
        by: "Ida Mørch",
      },
      {
        p: "We pin these early drawings on the wall above the model table and leave them there until the building is finished. They are rarely right. They are always useful.",
      },
      { h: "Three drawings, one week" },
      {
        p: "The week has a fixed shape. On Monday the project architect draws the sill. On Wednesday a second person draws the threshold without looking at the sill. On Friday we pin both up next to the roof edge and argue. The arguments are short, because the drawings are specific: a 30 mm drip either works in a westerly or it does not.",
      },
      {
        p: "What comes out is a vocabulary. Dune House ended up with a sill that sheds water a hand's width clear of the shingles, and that single decision set the overhang, the eaves line and the way the house meets the grass. Fjordskolen's threshold had to take a wheelchair, a pram and a class of thirty in wet boots, so it became a 1:40 ramp in brick that runs the length of the entrance hall.",
      },
      { h: "What it costs, and what it saves" },
      {
        p: "A week of detail drawings at the start costs a client about 2 per cent of our fee. It regularly saves far more at tender, because contractors price what they can see. A drawn junction is a fixed price; an undrawn one is a provisional sum and a conversation on site.",
      },
      {
        p: "It also makes us better listeners. A client who cannot read a site plan can read a 1:20 section of their own window, with the depth of the sill where they will put a cup of coffee. That is usually the moment a brief starts to sound like a person rather than a programme.",
      },
    ],
  },
  {
    slug: "a-winter-at-dune-house",
    title: "Site notes: a winter at Dune House",
    category: "Site notes",
    date: "2026-06-11",
    author: "Malthe Rask",
    excerpt:
      "Fourteen thousand shingles, one carpenter and the shortest days of the year.",
    project: "dune-house",
    image: img(
      cabinWindow,
      "A small four-pane cabin window glowing with daylight in a dark timber wall",
    ),
    body: [
      {
        p: "Jens started shingling on the first of December. By the solstice he had finished the north wall and had a system: three courses before coffee, four after, never in rain above a drizzle.",
      },
      {
        p: "I drove up every Thursday. We would stand on the scaffold at two in the afternoon, watching the sun skim the dune, and check the laps by feel because by three it was too dark to see them.",
      },
      { h: "What we changed" },
      {
        p: "The drawings showed a straight eaves line. Jens suggested letting the bottom course kick out by 20 mm to throw water clear of the sill plate. It is the kind of thing you cannot draw until someone has held the shingle.",
      },
      {
        quote:
          "Drawings are a promise. Site is where you find out what you promised.",
        by: "Jens, carpenter",
      },
      {
        p: "The house was weathertight on the eighth of March. The client's first message from the finished living room was a photograph of the low sun reaching the kitchen wall.",
      },
      { h: "Weather, light and the crew" },
      {
        p: "The site diary for that winter is mostly weather. Eleven days lost to wind above 15 m/s, four to frost, two to a delivery of shingles cut to the wrong length. Jens kept a thermos of coffee on the scaffold and a radio tuned to the shipping forecast, which he trusted more than the app on his phone.",
      },
      {
        p: "In January the sun cleared the dune for less than seven hours. We had placed the living room so that at the solstice the low sun crosses the whole floor and reaches the back wall at noon, and the half-finished room proved it: on the first clear day the light came through the unglazed openings and lay all the way across the subfloor.",
      },
      {
        p: "We photographed it every Thursday at the same hour. Those photographs became the light study on this site, checked against the model, and they still hang above Jens's workbench.",
      },
      { h: "Handover" },
      {
        p: "There was no ribbon. The family arrived with a van, a dog and a box of their own groceries, and Jens showed them how to replace a shingle, because in sixty years someone will have to.",
      },
    ],
  },
  {
    slug: "brick-is-a-slow-material",
    title: "Brick is a slow material, and that is the point",
    category: "Material",
    date: "2026-03-02",
    author: "Elin Strand",
    excerpt:
      "On Flemish bond, lime mortar and walls you can take apart in a hundred years.",
    project: "fjordskolen",
    image: img(
      brickWindow,
      "A dark timber-framed window set into an old red brick wall",
    ),
    body: [
      {
        p: "A brick is the size of a hand for a reason. It is laid one at a time by someone who can see the whole wall, and that rhythm shows in the finished building in a way no panel system can imitate.",
      },
      {
        p: "At Fjordskolen we used a hand-made brick from a works on Funen, laid in Flemish bond with lime mortar. Lime is softer than the brick, so in a century the wall can be taken down and every brick cleaned and laid again.",
      },
      { h: "The cost question" },
      {
        p: "Brick is not cheap. But a brick facade needs nothing for sixty years, and the school's maintenance budget can go on books instead of cladding repairs.",
      },
      {
        p: "We are now testing reclaimed brick for a housing project in Valby, sourced from a demolished dairy two kilometres away.",
      },
      { h: "Laying it" },
      {
        p: "Lime mortar sets slowly, which means bricklayers cannot race. Our crew of six laid around 600 bricks each a day, against perhaps 900 in cement, and covered every finished course with hessian against rain and frost. The site manager called it bricklaying at walking pace. The wall is straighter for it.",
      },
      {
        p: "Flemish bond alternates headers and stretchers in every course, so the short ends of the bricks run through the wall and tie it together. It is a structural pattern before it is a decorative one, and on a long school facade it gives the wall a quiet texture that changes with the angle of the sun.",
      },
      { h: "Ageing well" },
      {
        p: "Three years on, the brick at Fjordskolen has started to collect a faint green on the north side and a darker tone around the downpipes. We consider both part of the building. A material that records the weather is a material people learn to read.",
      },
      {
        p: "The Valby test is our next step: if reclaimed brick from two kilometres away can pass the same frost tests as new brick from Funen, the cheapest brick on a project may soon also be the one with the smallest footprint.",
      },
    ],
  },
  {
    slug: "the-carbon-case-for-keeping",
    title: "Keeping Tower Seven: the carbon case for not demolishing",
    category: "Essay",
    date: "2025-11-18",
    author: "Sanne Kooijman",
    excerpt:
      "4,100 tonnes of CO₂ is a number. A resident who never had to move is the argument.",
    project: "tower-seven",
    image: img(
      towerCanopy,
      "A thin curved concrete canopy on slim round columns in front of a tiled entrance",
    ),
    body: [
      {
        p: "When we were first asked to look at Tower Seven, the brief was for a replacement scheme. The block had damp, cold bridges at every balcony and a reputation that was worse than the building.",
      },
      {
        p: "We spent six weeks on a carbon study instead. Demolition and a new building of the same size would have emitted roughly 4,100 tonnes of CO₂ before anyone moved in. Keeping the frame and rebuilding the skin emitted about a fifth of that.",
      },
      { h: "What the numbers did not say" },
      {
        p: "The more persuasive figure was 212: the number of households who could stay in their homes. Several had lived there since the 1970s.",
      },
      {
        quote: "We did not save a building. We saved a street.",
        by: "Sanne Kooijman",
      },
      {
        p: "Retrofit is now more than half of our work by floor area. It is harder than new build, slower to draw and impossible to fully predict. We would not go back.",
      },
      { h: "How the work was done" },
      {
        p: "Residents stayed in their flats throughout. The new facade was hung from the outside, two floors at a time, from a scaffold that moved up the building over fourteen months. Each household lost the use of its balcony for six weeks and gained a glazed winter garden in exchange.",
      },
      {
        p: "The cold bridges at the old balconies were cut away and replaced with independent steel frames on new foundations, so the winter gardens stand beside the building rather than on it. Heating demand fell by 61 per cent in the first full year, measured, not modelled.",
      },
      { h: "What we would tell another client" },
      {
        p: "Start with a measured survey and a carbon count before anyone draws a new building. Ask the residents what works, because they always know. And budget for surprises in the frame; we found three in Tower Seven, none of them fatal.",
      },
      {
        p: "The next tower on the street is now being studied the same way. That may be the result we are proudest of.",
      },
    ],
  },
  {
    slug: "what-a-staircase-owes-a-school",
    title: "What a staircase owes a school",
    category: "Essay",
    date: "2025-08-29",
    author: "Jonas Elvestad",
    excerpt:
      "Corridors move children. Stairs, if they are wide enough, let them stop.",
    project: "fjordskolen",
    image: img(
      schoolLanding,
      "A broad concrete stair rising past a perforated grey wall marked with a level number",
    ),
    body: [
      {
        p: "The first thing the head teacher at Fjordskolen told us was that the old school had no place where all 420 children could be together. Assemblies happened in the gym, three year groups at a time.",
      },
      {
        p: "We did not have the budget for a hall. We did have a stair that needed to exist anyway, so we made it 6 metres wide and gave it treads 420 mm deep, enough to sit on.",
      },
      { h: "A room that is also a route" },
      {
        p: "On a normal day the stair is circulation, reading corner and lunch spot. Twice a term it seats the whole school for a concert. The larch lining softens the acoustics enough for a recorder solo to carry.",
      },
      {
        p: "If we built the school again, we would make the stair wider still.",
      },
      { h: "Getting the numbers right" },
      {
        p: "Sitting stairs have to satisfy two sets of rules at once. As an escape route they need a handrail within reach and a riser no higher than 180 mm. As seating they need a tread deep enough for a child to sit with a bag behind them. We solved both by alternating: every third step is a 420 mm seat, the two between are standard steps, and the handrail runs down a 1.2 metre walking lane on one side.",
      },
      {
        p: "The larch boards on the walls are slatted with felt behind them, which takes the edge off two hundred children talking at once. The underside of the stair is a library alcove. Nothing about it was on the original schedule of accommodation.",
      },
      { h: "After the first year" },
      {
        p: "We returned for the one-year visit expecting complaints about noise. Instead, the teachers asked for power sockets on the landings, because the stair had become the favourite place to work on laptops. We added six.",
      },
      {
        p: "The stair is now where the school photograph is taken each June. That was never in the brief either.",
      },
    ],
  },
  {
    slug: "thursday-drawing-evenings",
    title: "Open studio: Thursday drawing evenings",
    category: "Studio",
    date: "2025-05-07",
    author: "Theo Winther",
    excerpt:
      "Once a month we clear the model table and invite anyone who wants to draw.",
    image: img(
      sunlitStair,
      "A dark stairwell leading up towards sunlit glass doors",
    ),
    body: [
      {
        p: "On the first Thursday of each month, from six until nine, the studio is open to anyone who wants to draw: students, neighbours, clients, retired engineers. We provide paper, pencils, a building to draw and a pot of soup.",
      },
      {
        p: "Each evening has a subject. Last month it was the stair in our own building, drawn in section. In June we will be on the quay drawing the cranes.",
      },
      { h: "Coming along" },
      {
        p: "There is no fee and no booking. If you want to be sure of a seat, send a line to the studio email and we will save you one.",
      },
      { h: "What people draw" },
      {
        p: "Some evenings are full of architecture students practising sections. Others are mostly neighbours who have not drawn since school and want an excuse. One retired harbour engineer has come to every session since 2022 and draws only the cranes, from memory, with the correct number of rivets.",
      },
      {
        p: "Somebody from the studio always draws too, usually whoever is stuck on a project. A loose hour on someone else's subject is often what unsticks it.",
      },
      { h: "Upcoming subjects" },
      {
        p: "The autumn programme covers the grain-store roof trusses above our heads, the Sølvgade facades at dusk, and, in December, the models on the long shelf, drawn in the low winter light from the window.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ pages */

export const home = {
  title: "Built around the light.",
  lead: "Forma is an architecture studio in Copenhagen. We design homes, housing, schools and cultural buildings in timber, brick and concrete, placing every room where the sun will find it.",
  featured: ["dune-house", "harbour-archive", "kvarter-orsted"],
  selected: [
    "slat-hall",
    "lindholm-kunsthal",
    "courtyard-house",
    "fjordskolen",
  ],
  question: {
    title: "Good spaces begin with better questions.",
    asks: [
      "How does this room feel at seven on a January morning?",
      "Where will people gather without being told to?",
      "What on this site is worth keeping?",
    ],
    body: "We spend longer than most studios on the brief and the site, because the answers to these questions are cheaper to find on paper than in concrete.",
  },
  study: {
    title: "Move the sun through a room.",
    body: "Every project starts with a light study like this one. Drag the time of day and change the season to see how far direct sun reaches into the living room of Dune House, 56.9° north.",
    project: "dune-house",
  },
  typologies:
    "We work across six kinds of building. Some years it is mostly houses, some years it is a school.",
  studioTitle: "A studio of ten, since 2011",
  close: {
    title: "Tell us about the site.",
    body: "A first conversation is free and usually takes place where you want to build. Bring photographs, a rough budget and the questions you have not answered yet.",
  },
};

export const contact = {
  title: "Start a project.",
  lead: "Tell us where, what and roughly when. A partner reads every enquiry and replies within three working days, usually to suggest a visit to the site.",
  next: [
    "We reply within three working days with a few questions or a time to talk.",
    "A first site visit with a partner, free within Zealand and southern Sweden.",
    "A short written proposal: scope, team, fee and programme.",
  ],
  budgets: [
    "Under €600k",
    "€600k – €1.5m",
    "€1.5m – €5m",
    "Over €5m",
    "Not sure yet",
  ],
  starts: [
    "Within 6 months",
    "6–12 months",
    "Over a year",
    "Exploring for now",
  ],
};

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
