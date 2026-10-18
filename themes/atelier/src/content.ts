import critWall from "./assets/crit-wall.jpg";
import riso from "./assets/riso.jpg";
import desk from "./assets/desk.jpg";
import letterpress from "./assets/letterpress.jpg";
import pencils from "./assets/pencils.jpg";
import meetingRoom from "./assets/meeting-room.jpg";
import loft from "./assets/loft.jpg";
import brainstorm from "./assets/brainstorm.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Atelier",
  sector: "Creative agency",
  tagline: "Good ideas. Strange shapes.",
  summary:
    "An independent brand and digital studio in Philadelphia. Twelve people, one long table, no account managers.",
  email: "hello@atelier.example",
  briefEmail: "brief@atelier.example",
  jobsEmail: "jobs@atelier.example",
  pressEmail: "press@atelier.example",
  phone: "+1 555 014 2207",
  phoneHref: "tel:+15550142207",
  address: ["1218 Frankford Avenue, 3rd floor", "Philadelphia, PA 19125"],
  hours: [
    { days: "Monday – Thursday", time: "9:30 am – 6:00 pm" },
    { days: "Friday", time: "9:30 am – 4:00 pm, crit at 3" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "Are.na", href: "https://www.are.na/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/studio", label: "Studio" },
  { to: "/careers", label: "Careers" },
];

/* ------------------------------------------------------------ services */

export type ServiceId =
  "identity" | "digital" | "packaging" | "wayfinding" | "motion" | "campaign";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  summary: string;
  deliverables: string[];
  weeks: [number, number];
  from: number;
  roles: string[];
};

export const services: Service[] = [
  {
    id: "identity",
    name: "Brand identity",
    short: "Identity",
    summary:
      "Names, marks, type, colour and the rules that hold them together, built to survive a junior designer on a deadline.",
    deliverables: [
      "Positioning and brand strategy",
      "Naming and verbal identity",
      "Logo and mark systems",
      "Custom or licensed typography",
      "Colour, image and illustration direction",
      "Web-based brand guidelines",
    ],
    weeks: [8, 14],
    from: 45000,
    roles: ["Design director", "Strategist", "Designer"],
  },
  {
    id: "digital",
    name: "Websites & digital products",
    short: "Digital",
    summary:
      "Sites and small products that load fast, read well and are designed and built by the same four people.",
    deliverables: [
      "Content structure and UX",
      "Design systems in Figma",
      "Front-end build in React or Astro",
      "CMS setup and editor training",
      "Accessibility to WCAG 2.2 AA",
      "Launch plus 90 days of care",
    ],
    weeks: [10, 20],
    from: 60000,
    roles: ["Design engineer", "Designer", "Producer"],
  },
  {
    id: "packaging",
    name: "Packaging",
    short: "Packaging",
    summary:
      "Boxes, cans, labels and the shelf they live on. We do our own press checks and we bring the ruler.",
    deliverables: [
      "Structure and dieline development",
      "Range architecture",
      "Print and finish specification",
      "Press checks on site",
      "Retail and e-commerce assets",
    ],
    weeks: [8, 12],
    from: 35000,
    roles: ["Packaging designer", "Production lead"],
  },
  {
    id: "wayfinding",
    name: "Wayfinding & spaces",
    short: "Wayfinding",
    summary:
      "Signs people actually read, for buildings, campuses and transit. Drawn to the millimetre, tested on strangers.",
    deliverables: [
      "Signage audit and strategy",
      "Pictogram sets",
      "Sign family design and technical drawings",
      "Fabricator tendering",
      "Install supervision",
    ],
    weeks: [12, 24],
    from: 50000,
    roles: ["Design director", "Wayfinding designer", "Producer"],
  },
  {
    id: "motion",
    name: "Motion & sound",
    short: "Motion",
    summary:
      "How a brand moves and what it sounds like: idents, title sequences, interface motion and sonic logos.",
    deliverables: [
      "Motion principles",
      "Animated marks and idents",
      "Title sequences",
      "Social templates in After Effects and Lottie",
      "Sonic logo with partner composers",
    ],
    weeks: [6, 10],
    from: 25000,
    roles: ["Motion director", "Animator"],
  },
  {
    id: "campaign",
    name: "Campaigns & launch",
    short: "Campaign",
    summary:
      "One clear idea, then the posters, films, social and launch events that carry it into the street.",
    deliverables: [
      "Campaign platform and idea",
      "Copywriting",
      "Out-of-home and print",
      "Social and paid assets",
      "Launch events",
    ],
    weeks: [6, 12],
    from: 30000,
    roles: ["Creative director", "Writer", "Designer"],
  },
];

export const serviceById = (id: ServiceId) =>
  services.find((s) => s.id === id)!;

/* ------------------------------------------------------------ work */

export type MarkKind =
  | "asterisk"
  | "discs"
  | "wave"
  | "sun"
  | "petals"
  | "tide"
  | "orbit"
  | "moon"
  | "ring";
export type ArtKind =
  "poster" | "cards" | "screen" | "phone" | "pack" | "sign" | "spec" | "frames";
export type CoverLayout = "stack" | "tilt" | "center" | "split";

export type Palette = {
  bg: string;
  ink: string;
  accent: string;
  paper: string;
};

export type Case = {
  slug: string;
  client: string;
  headline: string;
  sector: string;
  location: string;
  year: number;
  disciplines: ServiceId[];
  summary: string;
  intro: string;
  brief: string[];
  approach: { title: string; text: string }[];
  outcome: string[];
  facts: { label: string; value: string }[];
  quote: { text: string; name: string; role: string };
  team: string[];
  palette: Palette;
  word: string;
  line: string;
  labels: [string, string, string];
  mark: MarkKind;
  layout: CoverLayout;
  gallery: { kind: ArtKind; caption: string }[];
};

export const cases: Case[] = [
  {
    slug: "form-and-field",
    client: "Form & Field",
    headline: "A furniture brand that talks about rooms, not products.",
    sector: "Furniture & objects",
    location: "Portland, Oregon",
    year: 2026,
    disciplines: ["identity", "packaging"],
    summary:
      "Strategy, identity and flat-pack packaging for a direct-to-home furniture maker.",
    intro:
      "Form & Field makes solid ash and oak furniture in a converted mill outside Portland and sells it direct, flat-packed, to people furnishing their first real home. They had great chairs and a logo made in a weekend.",
    brief: [
      "The founders wanted to stop competing on price with the big flat-pack retailers and start competing on how a room feels after the box is gone.",
      "Everything had to work on a shipping carton as well as on a website, and survive being printed in one colour on brown board.",
    ],
    approach: [
      {
        title: "Three shapes, one table",
        text: "The mark is three stacked discs drawn from the cross-section of the brand's signature stool. It rotates and re-stacks across the system, the way the furniture does in a room.",
      },
      {
        title: "A carton you keep",
        text: "We redrew the shipping box as a printed floor plan: the inside lid shows where the piece might live, with a ruler along the edge for measuring your doorway before you commit.",
      },
      {
        title: "Words for rooms",
        text: "Product names moved from codes to places. The FF-204 became the Porch Chair. Catalogue copy now starts with the room and ends with the joinery.",
      },
    ],
    outcome: [
      "Launched across site, cartons and the Portland showroom in March 2026.",
      "The team now produces seasonal catalogues in-house from the template kit.",
      "Return rate on the Porch Chair fell from 9% to 4% after the doorway ruler went on the box.",
    ],
    facts: [
      { label: "Duration", value: "14 weeks" },
      { label: "Team", value: "5 people" },
      { label: "Deliverables", value: "Identity, packaging, catalogue kit" },
    ],
    quote: {
      text: "They spent the first week sitting in our chairs and asking what our customers do on Sunday mornings. Nobody had ever asked us that.",
      name: "Wren Halloway",
      role: "Co-founder, Form & Field",
    },
    team: [
      "Mara Okafor",
      "June Park",
      "Ines Duarte",
      "Priya Nair",
      "Hana Sato",
    ],
    palette: {
      bg: "#d9ded2",
      ink: "#2f3b30",
      accent: "#8e976a",
      paper: "#f4f3ec",
    },
    word: "FORM\n& FIELD",
    line: "Objects for the way you live.",
    labels: ["Porch Chair", "Mill Table", "Low Stool"],
    mark: "discs",
    layout: "stack",
    gallery: [
      {
        kind: "poster",
        caption:
          "Launch poster, screen-printed in two colours on recycled stock.",
      },
      {
        kind: "pack",
        caption:
          "The flat-pack carton, with the doorway ruler printed along the lid.",
      },
      { kind: "cards", caption: "Stationery printed on mill offcut board." },
      {
        kind: "spec",
        caption: "Palette taken from ash, moss and the mill floor.",
      },
    ],
  },
  {
    slug: "offbeat",
    client: "Offbeat",
    headline:
      "An editorial system with a pulse, for a magazine that refuses to sit still.",
    sector: "Independent culture magazine",
    location: "Chicago, Illinois",
    year: 2026,
    disciplines: ["digital", "identity"],
    summary:
      "A new identity and publishing platform for a reader-funded culture magazine.",
    intro:
      "Offbeat covers music, food and neighbourhood culture across Chicago's South and West Sides. Ten years in, it had 40,000 paying readers and a website held together by plug-ins.",
    brief: [
      "Rebuild the site so the four-person editorial team can publish a feature, a listing and a newsletter from one place in under ten minutes.",
      "Give the magazine a look as loud as its writing without making every page shout.",
    ],
    approach: [
      {
        title: "A wave, not a logo",
        text: "The mark is a single thick wave that stretches with the width of the page. On a phone it is a ripple; on a billboard it becomes a hill.",
      },
      {
        title: "Templates with tempo",
        text: "We designed six article rhythms, from a 300-word listing to a 6,000-word feature. Editors pick a tempo instead of fiddling with layouts.",
      },
      {
        title: "Built for slow connections",
        text: "The new site is static-first with a headless CMS. Pages weigh under 200 KB before images and work on the oldest phone in the newsroom.",
      },
    ],
    outcome: [
      "Average time to publish a feature dropped from 50 minutes to 8.",
      "Newsletter sign-ups from article pages tripled in the first quarter.",
      "Editors have shipped 212 articles on the new templates without a designer.",
    ],
    facts: [
      { label: "Duration", value: "18 weeks" },
      { label: "Team", value: "6 people" },
      { label: "Deliverables", value: "Identity, website, CMS, newsletter" },
    ],
    quote: {
      text: "Our writers stopped asking for a designer and started asking for longer deadlines. That's the best review I can give.",
      name: "Dolores Achterberg",
      role: "Editor-in-chief, Offbeat",
    },
    team: [
      "Theo Lindqvist",
      "Felix Braun",
      "Kit Morales",
      "Priya Nair",
      "Rosa Klein",
      "Olu Bankole",
    ],
    palette: {
      bg: "#fc6b49",
      ink: "#351c42",
      accent: "#d9b5ef",
      paper: "#fff3ea",
    },
    word: "OFF\nBEAT",
    line: "Culture doesn't walk in a straight line.",
    labels: ["Listen", "Eat", "Go out"],
    mark: "wave",
    layout: "tilt",
    gallery: [
      {
        kind: "screen",
        caption:
          "Homepage on a Thursday: the week's listings sit under the lead feature.",
      },
      {
        kind: "phone",
        caption: "Article tempo three, the long-read, on a small screen.",
      },
      {
        kind: "poster",
        caption: "Ten-year anniversary poster for the South Side launch party.",
      },
      {
        kind: "spec",
        caption: "Coral, ink and a lilac that only appears in pull quotes.",
      },
    ],
  },
  {
    slug: "good-things",
    client: "Good Things",
    headline:
      "Optimism, bottled: a sparkling juice that looks like a little yes.",
    sector: "Sparkling juice",
    location: "Austin, Texas",
    year: 2025,
    disciplines: ["packaging", "campaign"],
    summary:
      "Packaging range and launch campaign for a low-sugar sparkling juice.",
    intro:
      "Good Things makes sparkling juice with nothing added, sold in 12 oz cans through grocery chains across Texas. They were launching into a fridge already full of pastel cans with the same promise.",
    brief: [
      "Stand out in a crowded chiller from six feet away, and make the flavour legible before the brand name.",
      "Launch in Austin and Houston with a budget smaller than a single bus-shelter campaign from a big drinks company.",
    ],
    approach: [
      {
        title: "Flavour first",
        text: "Each can is one colour with the fruit set in huge type down the side. The brand lives in a small sun on the lid, which is what you see when you look down into a cooler.",
      },
      {
        title: "A campaign of small yeses",
        text: "Posters celebrated tiny wins: the parking space right outside, the green light all the way home. We printed 300 of them and pasted them ourselves.",
      },
    ],
    outcome: [
      "Stocked in 140 stores within six months of launch.",
      "The small-yes posters were photographed and shared by people we never paid.",
      "Range extended to four flavours on the same system without a redesign.",
    ],
    facts: [
      { label: "Duration", value: "10 weeks" },
      { label: "Team", value: "4 people" },
      { label: "Deliverables", value: "Cans, multipacks, launch campaign" },
    ],
    quote: {
      text: "The buyer at our biggest chain picked the can out of a fridge of forty and said, that one. That was the meeting.",
      name: "Tomás Reyes",
      role: "Founder, Good Things",
    },
    team: ["Mara Okafor", "Ines Duarte", "Kit Morales", "Hana Sato"],
    palette: {
      bg: "#f3cceb",
      ink: "#d8401d",
      accent: "#ffb83f",
      paper: "#fff7d6",
    },
    word: "GOOD\nTHINGS",
    line: "Orange & sunshine.",
    labels: ["Orange", "Grapefruit", "Lime"],
    mark: "sun",
    layout: "center",
    gallery: [
      {
        kind: "pack",
        caption:
          "The orange can, front and side. Flavour reads from six feet away.",
      },
      {
        kind: "poster",
        caption: "One of 300 small-yes posters pasted across East Austin.",
      },
      {
        kind: "phone",
        caption: "Store locator for the launch, built in a week.",
      },
      { kind: "spec", caption: "Four flavours, one system." },
    ],
  },
  {
    slug: "common-ground",
    client: "Common Ground",
    headline: "Identity and wayfinding for a makerspace where ideas take root.",
    sector: "Neighbourhood makerspace",
    location: "Baltimore, Maryland",
    year: 2025,
    disciplines: ["identity", "wayfinding"],
    summary:
      "A friendly identity and a full sign family for a three-floor community workshop.",
    intro:
      "Common Ground turned an empty tram depot into wood and metal shops, a ceramics room, a print studio and a café. Members ranged from retired machinists to fourteen-year-olds learning to solder.",
    brief: [
      "Create an identity that felt like it belonged to the neighbourhood, not to a developer.",
      "Make three floors of noisy, busy workshop space navigable for first-time visitors, wheelchair users and people who do not read English.",
    ],
    approach: [
      {
        title: "Four leaves",
        text: "The mark is four leaf shapes meeting at a point, a nod to the four founding workshops. Each workshop owns one leaf and one colour on its signs.",
      },
      {
        title: "Pictograms first",
        text: "We drew 46 pictograms with members, then tested every sign with people who had never been inside. Text follows the picture, in English and Spanish.",
      },
      {
        title: "Signs you can fix",
        text: "Directional signs are painted plywood on a steel rail. The members' woodshop can cut replacements when the layout changes.",
      },
    ],
    outcome: [
      "Opened in September 2025 with 600 founding members.",
      "First-visit wayfinding questions at the front desk dropped by more than half after the signs went in.",
      "The members' woodshop has since made 31 new signs from the drawings pack.",
    ],
    facts: [
      { label: "Duration", value: "22 weeks" },
      { label: "Team", value: "5 people" },
      { label: "Deliverables", value: "Identity, 46 pictograms, sign family" },
    ],
    quote: {
      text: "The signs look like they've always been here. Our members think we made them ourselves, and honestly, a few of them we did.",
      name: "Bea Okonjo",
      role: "Director, Common Ground",
    },
    team: [
      "June Park",
      "Theo Lindqvist",
      "Olu Bankole",
      "Rosa Klein",
      "Hana Sato",
    ],
    palette: {
      bg: "#dde69f",
      ink: "#164b37",
      accent: "#f08a4b",
      paper: "#f6f4e8",
    },
    word: "common\nground.",
    line: "A space for what's next.",
    labels: ["Woodshop", "Ceramics", "Print room"],
    mark: "petals",
    layout: "center",
    gallery: [
      {
        kind: "sign",
        caption:
          "Second-floor directional sign: painted plywood on a steel rail.",
      },
      {
        kind: "poster",
        caption: "Opening weekend poster, risograph in green and orange.",
      },
      { kind: "cards", caption: "Membership cards, one leaf per workshop." },
      {
        kind: "spec",
        caption: "One colour per workshop, all passing AA on the sign panels.",
      },
    ],
  },
  {
    slug: "tidewater",
    client: "Tidewater Ferry Co.",
    headline:
      "Every twenty minutes, both ways: a ferry line people can read from the dock.",
    sector: "Passenger ferries",
    location: "Norfolk, Virginia",
    year: 2024,
    disciplines: ["wayfinding", "identity", "digital"],
    summary:
      "Identity, terminal signage and a live departures site for a harbour ferry operator.",
    intro:
      "Tidewater runs four passenger ferries across the Elizabeth River, carrying 3,000 commuters on a weekday. Their timetable was a PDF and their signs were a mix of four previous logos.",
    brief: [
      "Unify five terminals, four boats and a website under one identity that works in fog, rain and low winter sun.",
      "Make the next departure the most visible thing on every surface.",
    ],
    approach: [
      {
        title: "The next boat, everywhere",
        text: "We built the system around one sentence: the next departure. It appears on terminal screens, on the website's first line and on the side of each boat as it docks.",
      },
      {
        title: "Navy and signal yellow",
        text: "The palette came from marine signal flags: a navy you can read in fog and a yellow that holds up in low sun. Every sign was tested at 30 metres.",
      },
      {
        title: "A departures site, not a website",
        text: "The new site opens on live departures for the terminal nearest you. Everything else, from fares to lost property, sits one tap below.",
      },
    ],
    outcome: [
      "Rolled out across five terminals and four boats in a single winter.",
      "The departures page now handles 70% of all site visits, most of them under ten seconds long.",
      "Ridership rose 12% in the following year; the operator credits a timetable change too, and so do we.",
    ],
    facts: [
      { label: "Duration", value: "24 weeks" },
      { label: "Team", value: "7 people" },
      { label: "Deliverables", value: "Identity, signage, departures site" },
    ],
    quote: {
      text: "A captain told me he could see the new terminal sign from the middle of the river. That had never happened before.",
      name: "Gus Pemberton",
      role: "Operations director, Tidewater Ferry Co.",
    },
    team: [
      "Theo Lindqvist",
      "June Park",
      "Felix Braun",
      "Olu Bankole",
      "Rosa Klein",
      "Kit Morales",
      "Hana Sato",
    ],
    palette: {
      bg: "#0e3b5c",
      ink: "#f4efe2",
      accent: "#ffb000",
      paper: "#e9eef2",
    },
    word: "TIDE\nWATER",
    line: "Every 20 minutes, both ways.",
    labels: ["Waterside", "Portside", "Harbor Park"],
    mark: "tide",
    layout: "split",
    gallery: [
      {
        kind: "sign",
        caption:
          "Terminal sign at Waterside, legible from the middle of the river.",
      },
      {
        kind: "phone",
        caption: "Live departures, opening on the terminal nearest you.",
      },
      {
        kind: "screen",
        caption: "Fares and passes, one tap below departures.",
      },
      {
        kind: "spec",
        caption: "Signal navy and signal yellow, tested at 30 metres.",
      },
    ],
  },
  {
    slug: "halden-observatory",
    client: "Halden Observatory",
    headline:
      "Look up on purpose: a public observatory, designed for the night shift.",
    sector: "Public observatory & planetarium",
    location: "Flagstaff, Arizona",
    year: 2025,
    disciplines: ["digital", "motion"],
    summary:
      "A dark-sky website, ticketing flow and dome-show titles for a public observatory.",
    intro:
      "Halden is a hilltop observatory with a 24-inch telescope, a 90-seat planetarium and very strict rules about light. Their old website was white and blinded visitors checking times in the car park.",
    brief: [
      "Design a site that is comfortable to use at night, outdoors, by people whose eyes are adjusting to the dark.",
      "Create titles and motion for the new planetarium season without breaking the dome's dark-adaptation rules.",
    ],
    approach: [
      {
        title: "Red-light mode",
        text: "The site follows the observatory's own rule: after sunset it switches to a red-on-black palette that protects night vision. Visitors asked for it to be on all the time.",
      },
      {
        title: "Tonight, first",
        text: "The homepage answers the only question people have in the car park: is the telescope open tonight, and what is up? Cloud cover comes from the observatory's own sky camera.",
      },
      {
        title: "Titles that orbit",
        text: "For the dome shows we animated the mark, a planet with a tilted ring, as a slow orbit that never gets brighter than the stars around it.",
      },
    ],
    outcome: [
      "Online ticket sales went from 30% to 81% of all visits.",
      "Telescope nights now sell out a week ahead instead of on the door.",
      "The red-light mode has been adopted as a standard by two other dark-sky parks.",
    ],
    facts: [
      { label: "Duration", value: "16 weeks" },
      { label: "Team", value: "5 people" },
      { label: "Deliverables", value: "Website, ticketing, dome titles" },
    ],
    quote: {
      text: "It's the first website I've seen that understands people are standing in the dark when they use it.",
      name: "Dr. Imogen Vance",
      role: "Director, Halden Observatory",
    },
    team: [
      "Felix Braun",
      "Sam Achebe",
      "Kit Morales",
      "Priya Nair",
      "Rosa Klein",
    ],
    palette: {
      bg: "#14122b",
      ink: "#ece6ff",
      accent: "#ff8a3d",
      paper: "#221f40",
    },
    word: "HALDEN",
    line: "Look up on purpose.",
    labels: ["Tonight", "Dome shows", "Telescope"],
    mark: "orbit",
    layout: "stack",
    gallery: [
      {
        kind: "screen",
        caption:
          "Tonight at Halden: telescope status, sky camera and the evening's planets.",
      },
      {
        kind: "frames",
        caption:
          "Dome-show title sequence, three frames from the twelve-second orbit.",
      },
      {
        kind: "phone",
        caption:
          "Ticketing in red-light mode, readable with dark-adapted eyes.",
      },
      {
        kind: "poster",
        caption: "Season poster for the planetarium's winter programme.",
      },
    ],
  },
  {
    slug: "night-shift-radio",
    client: "Night Shift Radio",
    headline:
      "On air after dark: a sound and motion identity for community radio.",
    sector: "Community radio",
    location: "Detroit, Michigan",
    year: 2024,
    disciplines: ["motion", "identity"],
    summary:
      "Identity, sonic logo and broadcast idents for a volunteer-run overnight radio station.",
    intro:
      "Night Shift broadcasts from 8 pm to 6 am, run by 60 volunteer DJs who mostly have day jobs. They had a frequency, a lot of records and no consistent way to say who they were.",
    brief: [
      "Give sixty DJs one identity they could all use without a designer, from show flyers to livestream overlays.",
      "Make the station recognisable in three seconds of audio.",
    ],
    approach: [
      {
        title: "A moon that waxes",
        text: "The mark is a crescent that fills as the night goes on. Each hour of the schedule has its own phase, so a flyer tells you when the show airs before you read it.",
      },
      {
        title: "Three seconds of sound",
        text: "With a local composer we recorded a sonic logo on the station's own turntables: a needle drop, a hum and a single low note.",
      },
      {
        title: "A kit for sixty people",
        text: "DJs build show flyers and stream overlays from templates that only let them change the words and the hour, so the station looks like itself every night.",
      },
    ],
    outcome: [
      "All 60 DJs moved onto the kit within a month.",
      "The sonic logo is now played at the top of every hour, and requested at parties.",
      "Livestream audience grew from 300 to 2,100 regular listeners in a year.",
    ],
    facts: [
      { label: "Duration", value: "9 weeks" },
      { label: "Team", value: "4 people" },
      { label: "Deliverables", value: "Identity, sonic logo, ident kit" },
    ],
    quote: {
      text: "People hum our sonic logo at us in the grocery store. We're a volunteer station. That doesn't happen.",
      name: "Marcus Delacroix",
      role: "Station manager, Night Shift Radio",
    },
    team: ["Sam Achebe", "Mara Okafor", "Olu Bankole", "Hana Sato"],
    palette: {
      bg: "#1d201b",
      ink: "#e9ff65",
      accent: "#fc6b49",
      paper: "#2c3029",
    },
    word: "NIGHT\nSHIFT",
    line: "On air after dark.",
    labels: ["8 pm", "Midnight", "4 am"],
    mark: "moon",
    layout: "tilt",
    gallery: [
      {
        kind: "frames",
        caption: "The waxing-moon ident, from 8 pm to 6 am in three frames.",
      },
      {
        kind: "poster",
        caption: "Show flyer built by a DJ from the kit in four minutes.",
      },
      {
        kind: "phone",
        caption: "Livestream player with the current hour's phase.",
      },
      {
        kind: "spec",
        caption: "Volt and ember on near-black, set for screens in dark rooms.",
      },
    ],
  },
  {
    slug: "ondine",
    client: "Ondine Swim Club",
    headline:
      "Cold water, warm people: bringing a 1930s lido back to its city.",
    sector: "Public lido & swim school",
    location: "Milwaukee, Wisconsin",
    year: 2023,
    disciplines: ["campaign", "identity"],
    summary:
      "Reopening campaign and identity for a restored open-air pool and swim school.",
    intro:
      "The Ondine lido closed in 1998 and was restored by a neighbourhood trust after a fifteen-year campaign. It needed 2,000 season members to break even in its first summer.",
    brief: [
      "Sell 2,000 memberships for a pool most of the city had never seen open.",
      "Honour the 1930s building without making it feel like a museum.",
    ],
    approach: [
      {
        title: "The ring",
        text: "We redrew the lifebuoy that hung by the original deep end as the club mark, with four segments that change colour for the four seasons of programming.",
      },
      {
        title: "Neighbours as models",
        text: "The campaign photographed regulars from the trust's fundraising years, from a 79-year-old who swam there as a girl to the kids who painted the hoardings.",
      },
    ],
    outcome: [
      "2,640 season memberships sold before opening day.",
      "The swim school waiting list hit 400 names in the first month.",
      "Posters from the campaign now hang in the café, framed by the trust.",
    ],
    facts: [
      { label: "Duration", value: "12 weeks" },
      { label: "Team", value: "5 people" },
      { label: "Deliverables", value: "Identity, campaign, membership site" },
    ],
    quote: {
      text: "We needed two thousand people to believe in a pool that had been closed for twenty-five years. They got us there in eleven weeks.",
      name: "Sunniva Brekke",
      role: "Chair, Ondine Lido Trust",
    },
    team: [
      "Mara Okafor",
      "Priya Nair",
      "June Park",
      "Kit Morales",
      "Rosa Klein",
    ],
    palette: {
      bg: "#2bb3c0",
      ink: "#0d2a3a",
      accent: "#fff2c9",
      paper: "#e7f6f6",
    },
    word: "ONDINE",
    line: "Cold water, warm people.",
    labels: ["Lanes", "Lessons", "Sauna"],
    mark: "ring",
    layout: "split",
    gallery: [
      {
        kind: "poster",
        caption: "Membership poster: season opens Memorial Day.",
      },
      {
        kind: "cards",
        caption: "Season passes with the ring in summer colours.",
      },
      {
        kind: "sign",
        caption: "Poolside sign at the deep end, where the original buoy hung.",
      },
      {
        kind: "screen",
        caption: "Membership site: one page, one price, one button.",
      },
    ],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);

/* ------------------------------------------------------------ studio */

export type Person = {
  name: string;
  role: string;
  since: number;
  note: string;
  mark: MarkKind;
  tone: "cobalt" | "citron" | "coral" | "sage" | "ink" | "lilac";
};

export const team: Person[] = [
  {
    name: "Mara Okafor",
    role: "Founder, creative director",
    since: 2013,
    note: "Still sets type by hand on Fridays.",
    mark: "asterisk",
    tone: "cobalt",
  },
  {
    name: "Theo Lindqvist",
    role: "Founder, strategy director",
    since: 2013,
    note: "Asks the question nobody wanted to answer.",
    mark: "tide",
    tone: "ink",
  },
  {
    name: "Ana Ruiz",
    role: "Managing director",
    since: 2016,
    note: "Reads every brief that comes in. Yes, every one.",
    mark: "sun",
    tone: "coral",
  },
  {
    name: "June Park",
    role: "Design director, identity",
    since: 2017,
    note: "Keeps a drawer of 400 paper samples.",
    mark: "petals",
    tone: "sage",
  },
  {
    name: "Felix Braun",
    role: "Lead design engineer",
    since: 2018,
    note: "Believes every website should work on a train.",
    mark: "orbit",
    tone: "citron",
  },
  {
    name: "Sam Achebe",
    role: "Motion director",
    since: 2019,
    note: "Makes the logos move and the room go quiet.",
    mark: "moon",
    tone: "ink",
  },
  {
    name: "Ines Duarte",
    role: "Senior designer, packaging",
    since: 2019,
    note: "Has opinions about cardboard grain direction.",
    mark: "discs",
    tone: "lilac",
  },
  {
    name: "Priya Nair",
    role: "Writer and strategist",
    since: 2020,
    note: "Cuts every headline in half, then in half again.",
    mark: "wave",
    tone: "coral",
  },
  {
    name: "Rosa Klein",
    role: "Studio producer",
    since: 2021,
    note: "Knows where every project is, and where you are.",
    mark: "ring",
    tone: "cobalt",
  },
  {
    name: "Kit Morales",
    role: "Designer",
    since: 2022,
    note: "Builds prototypes faster than we can brief them.",
    mark: "orbit",
    tone: "sage",
  },
  {
    name: "Olu Bankole",
    role: "Designer",
    since: 2023,
    note: "Draws pictograms in the margins of everything.",
    mark: "petals",
    tone: "citron",
  },
  {
    name: "Hana Sato",
    role: "Print room and production",
    since: 2021,
    note: "Runs the riso, the letterpress and the press checks.",
    mark: "discs",
    tone: "lilac",
  },
];

export const photos = {
  critWall: {
    src: critWall,
    alt: "Two designers studying printed layouts pinned to a white studio wall",
    w: 1600,
    h: 1187,
  },
  riso: {
    src: riso,
    alt: "A risograph print in pink, black and red held up in both hands",
    w: 1500,
    h: 1000,
  },
  desk: {
    src: desk,
    alt: "A drawing tablet on a stand at a desk by a bright window",
    w: 1800,
    h: 1200,
  },
  letterpress: {
    src: letterpress,
    alt: "A tray of worn metal letterpress type in a wooden case",
    w: 1600,
    h: 1066,
  },
  pencils: {
    src: pencils,
    alt: "A glass jar full of sharpened coloured pencils",
    w: 1600,
    h: 1071,
  },
  meetingRoom: {
    src: meetingRoom,
    alt: "A long table and dark chairs in a meeting room with a pale pink wall",
    w: 1600,
    h: 1066,
  },
  loft: {
    src: loft,
    alt: "A bright loft studio with tall windows and long white tables",
    w: 1800,
    h: 1187,
  },
  brainstorm: {
    src: brainstorm,
    alt: "Two people sketching notes on paper between their laptops",
    w: 1600,
    h: 1067,
  },
};

export type Photo = (typeof photos)[keyof typeof photos];

export const principles = [
  {
    title: "Small on purpose.",
    text: "Twelve people, no account managers. The person in the first meeting is the person who designs the thing.",
  },
  {
    title: "Paid, never free.",
    text: "We don't pitch speculative creative. We'd rather spend two paid weeks understanding the problem than two unpaid weeks guessing.",
  },
  {
    title: "Make it, then argue.",
    text: "We sketch in the first meeting and prototype in the first week. A rough thing on the wall beats a perfect deck.",
  },
  {
    title: "Leave it better.",
    text: "Every project ends with a kit your own team can use. If you need us forever, we did it wrong.",
  },
];

export const rituals = [
  {
    title: "Friday crit",
    text: "At three on Fridays the whole studio pins the week's work to the long wall and talks about it honestly. Clients are welcome.",
  },
  {
    title: "The print room",
    text: "A risograph, a tabletop letterpress and a guillotine. Most identities get printed here before they get printed anywhere else.",
  },
  {
    title: "Slow August",
    text: "The studio runs four-day weeks through August. Nobody has ever missed a deadline because of it.",
  },
];

export const recognition = [
  {
    year: 2026,
    award: "Ampersand Annual — Identity, Gold",
    project: "Form & Field",
  },
  {
    year: 2025,
    award: "Delaware Valley Design Prize — Wayfinding",
    project: "Common Ground",
  },
  {
    year: 2025,
    award: "Signal & Noise Motion Awards — Dome & Planetarium",
    project: "Halden Observatory",
  },
  {
    year: 2025,
    award: "The Packaging Index — Shortlist",
    project: "Good Things",
  },
  {
    year: 2024,
    award: "Civic Design Review — Transit, Honourable mention",
    project: "Tidewater Ferry Co.",
  },
  {
    year: 2024,
    award: "Signal & Noise Motion Awards — Sonic identity",
    project: "Night Shift Radio",
  },
];

export const clients = [
  "Form & Field",
  "Offbeat",
  "Good Things",
  "Common Ground",
  "Tidewater Ferry Co.",
  "Halden Observatory",
  "Night Shift Radio",
  "Ondine Swim Club",
  "Pell & Daughter",
  "Northline Credit Union",
  "Kestrel Books",
  "The Ward Theatre",
  "Fieldwork Coffee",
  "Brightwater Clinics",
];

/* ------------------------------------------------------------ process & engagements */

export const process = [
  {
    name: "Listen",
    weeks: "Weeks 1–2",
    text: "Interviews, a walk around your business, and a look at what your customers actually do. We finish with a one-page brief we both sign.",
  },
  {
    name: "Frame",
    weeks: "Weeks 2–4",
    text: "Three directions on the wall, each one rough and real enough to argue with. We pick one together in the room.",
  },
  {
    name: "Make",
    weeks: "Weeks 4–12",
    text: "The work, in fortnightly rounds. You see everything on the studio wall or on a shared board, never in a reveal.",
  },
  {
    name: "Launch & look after",
    weeks: "Launch + 90 days",
    text: "We ship it, train your team and stay on call for three months to fix what real life finds.",
  },
];

export const engagements = [
  {
    name: "Sprint",
    price: "From $18,000",
    length: "2 weeks",
    text: "A paid discovery or a single sharp deliverable: a naming round, a campaign idea, a prototype. Often how we start.",
    includes: [
      "Two workshops",
      "A one-page brief",
      "One deliverable, finished",
    ],
  },
  {
    name: "Project",
    price: "From $45,000",
    length: "8 – 24 weeks",
    text: "The full process from Listen to Launch, with a fixed fee, a fixed team and a fortnightly rhythm.",
    includes: [
      "Fixed fee, fixed team",
      "Fortnightly reviews",
      "90 days of care after launch",
    ],
  },
  {
    name: "Partnership",
    price: "From $14,000 / month",
    length: "6 months minimum",
    text: "A standing team of two to four for brands that ship constantly: seasonal ranges, campaigns, product.",
    includes: [
      "Dedicated core team",
      "Monthly planning",
      "Priority on studio time",
    ],
  },
];

export const faqs = [
  {
    q: "What's the smallest project you take on?",
    a: "Our two-week Sprint starts at $18,000. Most identity projects land between $45,000 and $120,000; websites usually between $60,000 and $180,000. We publish these numbers so nobody wastes a call.",
  },
  {
    q: "Do you pitch?",
    a: "Not with free creative. If you're comparing studios, we'll happily meet, show relevant work and write a proposal. If you want to see ideas before you commit, book a paid Sprint.",
  },
  {
    q: "Who will actually work on our project?",
    a: "The people named in the proposal. We don't have account managers or a bench of juniors behind the senior team; the design director in the first meeting is the one at the table every week.",
  },
  {
    q: "Do you work with clients outside Philadelphia?",
    a: "Most of our clients are elsewhere in the US. We travel for the Listen phase and key reviews, and run everything else on a shared board and a weekly call.",
  },
  {
    q: "Who owns the work?",
    a: "You do. On final payment we assign all rights in the delivered work, including source files. We ask to show it in our portfolio, and you can say no.",
  },
  {
    q: "Can you work with our in-house team?",
    a: "Often the best projects are exactly that. We'll plan who does what in the Listen phase and leave you with a kit your team can run.",
  },
];

/* ------------------------------------------------------------ careers */

export const perks = [
  {
    title: "Published salaries",
    text: "Every role lists its band. Everyone at the same level is paid within it.",
  },
  {
    title: "Slow August",
    text: "Four-day weeks every August, and the studio closes from December 22 to January 2.",
  },
  {
    title: "$2,500 to learn",
    text: "A yearly budget for courses, books, conferences or a week at a letterpress workshop.",
  },
  {
    title: "Health, fully covered",
    text: "Medical, dental and vision paid 100% for you and 80% for dependants.",
  },
  {
    title: "Studio three days",
    text: "Tuesday to Thursday at the long table; Monday and Friday morning wherever you work best.",
  },
  {
    title: "Your name on it",
    text: "Everyone who worked on a project is credited on the case study, interns included.",
  },
];

export type Role = {
  id: string;
  title: string;
  team: string;
  type: string;
  location: string;
  salary: string;
  posted: string;
  summary: string;
  about: string;
  doing: string[];
  bringing: string[];
  bonus: string[];
  question: string;
};

export const roles: Role[] = [
  {
    id: "senior-designer-identity",
    title: "Senior Designer, Identity",
    team: "Design",
    type: "Full-time",
    location: "Philadelphia, hybrid",
    salary: "$95,000 – $115,000",
    posted: "October 2026",
    summary:
      "Lead the design of two or three identity projects at a time, from first sketch to guidelines.",
    about:
      "You'll work alongside June Park on identities for clients like Form & Field and Common Ground: strategy-led, typographically serious and built to be used by people who aren't designers.",
    doing: [
      "Lead identity projects day to day, with a design director alongside you",
      "Present work directly to founders and leadership teams",
      "Build systems: type, colour, layout, motion principles and guidelines",
      "Mentor two designers and run a Friday crit once a month",
    ],
    bringing: [
      "Five or more years designing identities, at a studio or in-house",
      "A portfolio where we can see your thinking, not just the final applications",
      "Real typographic skill and an eye for detail at small sizes",
      "Comfort explaining design decisions to people who don't speak design",
    ],
    bonus: [
      "Experience with packaging or wayfinding",
      "Any time spent with a letterpress",
    ],
    question:
      "Tell us about an identity you made that changed after it met real life. What changed, and why?",
  },
  {
    id: "design-engineer",
    title: "Design Engineer",
    team: "Digital",
    type: "Full-time",
    location: "Philadelphia or remote, US Eastern time",
    salary: "$110,000 – $135,000",
    posted: "September 2026",
    summary:
      "Design and build fast, accessible websites in React and Astro with Felix and the digital team.",
    about:
      "Our digital team designs and builds in the same breath. You'll prototype in the browser from week one and ship production sites like Offbeat and Halden.",
    doing: [
      "Build production front ends in React, Astro and plain CSS",
      "Prototype interactions and motion while the design is still moving",
      "Own performance budgets and accessibility on every launch",
      "Set up CMSs and train client editors to use them",
    ],
    bringing: [
      "Three or more years shipping production front ends",
      "Strong CSS: layout, type, motion and the boring parts like print styles",
      "A working knowledge of WCAG and how to test with a screen reader",
      "Design sense, even if you wouldn't call yourself a designer",
    ],
    bonus: [
      "WebGL or canvas experience",
      "You've maintained an open-source project",
    ],
    question:
      "Send us a link to something you built where the details matter. Which detail are you proudest of?",
  },
  {
    id: "motion-designer",
    title: "Motion Designer",
    team: "Motion",
    type: "Full-time",
    location: "Philadelphia, hybrid",
    salary: "$85,000 – $100,000",
    posted: "September 2026",
    summary:
      "Make brands move: idents, title sequences, interface motion and social kits with Sam Achebe.",
    about:
      "Motion is part of every identity we make, not an add-on at the end. You'll work from the first sketches with the identity team and own the motion system through to launch.",
    doing: [
      "Design and animate marks, idents and title sequences",
      "Write motion principles that other designers can follow",
      "Build template kits in After Effects and Lottie for clients",
      "Collaborate with composers on sonic identities",
    ],
    bringing: [
      "Three or more years of motion design for brands or broadcast",
      "Strong After Effects skills and comfort with at least one 3D tool",
      "A reel that shows restraint as well as spectacle",
    ],
    bonus: ["Experience with Rive or interface motion", "Musical ear"],
    question:
      "Which three seconds of your reel are you proudest of, and what made them hard?",
  },
  {
    id: "studio-producer",
    title: "Studio Producer",
    team: "Operations",
    type: "Full-time",
    location: "Philadelphia, in studio",
    salary: "$80,000 – $95,000",
    posted: "August 2026",
    summary:
      "Keep four to six projects on time and on budget, and keep the studio a calm place to work.",
    about:
      "Producers at Atelier run projects, not people. You'll plan schedules, manage budgets and suppliers, and protect the team's time so the work can be good.",
    doing: [
      "Plan and run four to six projects at once with Rosa Klein",
      "Write project plans, budgets and change requests",
      "Manage printers, fabricators, developers and composers",
      "Run the fortnightly client review rhythm",
    ],
    bringing: [
      "Three or more years producing at a design or digital studio",
      "Calm under pressure and clear in writing",
      "Comfort with budgets, contracts and difficult conversations",
    ],
    bonus: ["Print or fabrication production experience"],
    question:
      "Tell us about a project that went sideways. What did you do in the first 24 hours?",
  },
  {
    id: "design-intern-2027",
    title: "Design Intern, Summer 2027",
    team: "Design",
    type: "10-week paid internship",
    location: "Philadelphia, in studio",
    salary: "$26 per hour",
    posted: "October 2026",
    summary:
      "Ten weeks on real client projects, with a mentor, a desk and your name on the case study.",
    about:
      "Two interns join us each summer from June 8 to August 14. You'll work on live projects, print in the print room and present at Friday crit from week two.",
    doing: [
      "Work on two live client projects with a senior designer",
      "Make something in the print room every week",
      "Present your work at Friday crit",
      "Lead a small self-initiated project to show at the end of summer",
    ],
    bringing: [
      "You're a student or recent graduate in graphic, communication or interaction design",
      "A portfolio of eight to twelve projects, including your process",
      "Curiosity, and the nerve to put rough work on a wall",
    ],
    bonus: ["You've made a zine, a typeface or a website from scratch"],
    question:
      "What's a piece of design out in the world, not by a famous designer, that you think is brilliant?",
  },
];

export const roleById = (id: string) => roles.find((r) => r.id === id);

export const hiringSteps = [
  {
    name: "Apply",
    text: "Portfolio and three short answers. A person reads every application within ten working days.",
  },
  {
    name: "First chat",
    text: "45 minutes on a video call with the hiring lead, mostly about your work.",
  },
  {
    name: "Paid task",
    text: "Half a day on a small, real-ish problem. We pay $400 whether or not you join us.",
  },
  {
    name: "Studio visit",
    text: "Meet the team, sit in on a Friday crit and ask us anything.",
  },
  {
    name: "Offer",
    text: "Within a week of your visit, with the salary from the published band.",
  },
];

/* ------------------------------------------------------------ brief builder */

export const briefOptions = {
  stage: [
    "Brand new",
    "Refresh what we have",
    "Launch something specific",
    "Not sure yet",
  ],
  budget: [
    { id: "under-50", label: "$25k – $50k", max: 50000 },
    { id: "50-100", label: "$50k – $100k", max: 100000 },
    { id: "100-200", label: "$100k – $200k", max: 200000 },
    { id: "200-plus", label: "$200k +", max: Infinity },
    { id: "unsure", label: "Help us decide", max: null },
  ],
  timing: ["Within 3 months", "3 – 6 months", "6 – 12 months", "No fixed date"],
  source: [
    "A friend or client",
    "Saw your work somewhere",
    "Search",
    "Instagram or LinkedIn",
    "Somewhere else",
  ],
};

/* ------------------------------------------------------------ page copy */

export const home = {
  title: "Atelier — Independent brand & digital studio",
  heroLines: ["Good ideas.", "Strange shapes."],
  lede: "Atelier is an independent brand and digital studio in Philadelphia. We make identities, websites, packaging and signs for companies that would rather be remembered than liked.",
  workTitle: "Selected work",
  servicesTitle: "What we make",
  studioTitle: [
    "Different backgrounds.",
    "One healthy obsession",
    "with what could be.",
  ],
  studioText: [
    "We bring strategy, identity and digital into the same room, then ask better questions until something interesting happens.",
    "From the first scribble to the final pixel we work closely, think openly and make things that feel unmistakably yours.",
  ],
  processTitle: "How a project runs",
  clientsTitle: "Some people we've made things with",
  careersTitle: "Come and work at the long table",
  closeTitle: ["Let's make", "a little noise."],
  closeText:
    "Tell us what you're making. The brief builder takes about five minutes and Ana replies to every one within two working days.",
  reel: ["offbeat", "good-things", "halden-observatory", "ondine"],
  featured: [
    "tidewater",
    "form-and-field",
    "common-ground",
    "night-shift-radio",
  ],
  quoteFrom: "halden-observatory",
};

export const workPage = {
  title: "Work",
  intro:
    "Eight recent projects across identity, digital, packaging, wayfinding, motion and campaigns. Each one is a real problem, a small team and a result we can measure.",
};

export const servicesPage = {
  title: "Six disciplines, one table.",
  intro:
    "Most projects need two or three of these. The same small team carries them all, so the website, the sign and the box all come from one idea.",
  engagementsTitle: "Ways to work with us",
  engagementsNote:
    "All fees in USD, before travel and third-party costs like printing or fabrication.",
  faqTitle: "Questions we get every week",
};

export const studioPage = {
  title: "A small studio with the door open.",
  intro:
    "Atelier started in 2013 when Mara Okafor and Theo Lindqvist left a big agency to work on fewer, better things. Thirteen years later we are twelve people on the third floor of an old hosiery mill in Fishtown, still at one long table.",
  story: [
    "We stayed small on purpose. Every client works with the people who make the work, and every project gets the whole studio's eyes at Friday crit.",
    "We say no to about two thirds of the briefs we receive. Not because they're small, but because we want to be the right studio for every yes.",
  ],
  principlesTitle: "What we believe, in four lines",
  teamTitle: "The people",
  spaceTitle: "The space",
  spaceText:
    "Three thousand square feet on the third floor: one long table, a print room, a quiet room and a wall for pinning things to. Visitors are welcome by appointment; bring good coffee or questions.",
  ritualsTitle: "Three habits we keep",
  recognitionTitle: "Recognition",
};

export const careersPage = {
  title: "Do the best work of your life. Then go home.",
  intro:
    "We hire rarely and keep people for a long time: the average Atelier designer has been here six years. Every role publishes its salary band, and every applicant hears back from a person.",
  perksTitle: "How we look after people",
  rolesTitle: "Open roles",
  processTitle: "How hiring works",
};

export const contactPage = {
  title: "Start a brief",
  intro:
    "Five minutes, six questions. The brief builds itself on the right as you go, and we'll use it to decide who should reply and what to bring to the first call.",
};

export const newsletter = {
  title: "The Pin-up",
  text: "Once a month: what's on our wall, what we're reading, and one thing we got wrong.",
};

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Work",
    links: [
      { to: "/work", label: "All work" },
      { to: "/work/tidewater", label: "Tidewater Ferry Co." },
      { to: "/work/offbeat", label: "Offbeat" },
      { to: "/work/halden-observatory", label: "Halden Observatory" },
    ],
  },
  {
    title: "Studio",
    links: [
      { to: "/services", label: "Services" },
      { to: "/studio", label: "Studio" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Start a brief" },
    ],
  },
];
