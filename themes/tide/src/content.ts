import heroSea from "./assets/hero-sea.jpg";
import haul from "./assets/haul.jpg";
import sorted from "./assets/sorted.jpg";
import shoreline from "./assets/shoreline.jpg";
import bucketBrigade from "./assets/bucket-brigade.jpg";
import oysterReef from "./assets/oyster-reef.jpg";
import shellBags from "./assets/shell-bags.jpg";
import kelp from "./assets/kelp.jpg";
import reefDiver from "./assets/reef-diver.jpg";
import turtle from "./assets/turtle.jpg";
import surveyBoat from "./assets/survey-boat.jpg";
import eelgrass from "./assets/eelgrass.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Tide",
  sector: "Ocean conservation charity",
  tagline: "We look after the coast between the tides.",
  email: "hello@tide.example",
  volunteerEmail: "crew@tide.example",
  phone: "+44 1632 960 418",
  phoneHref: "tel:+441632960418",
  address: ["The Net Loft, 4 Quay Lane", "Merrow MR4 2TD"],
  hours: "Office open Tue–Fri, 09:30–16:30",
  founded: 2009,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Mastodon", href: "https://joinmastodon.org/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/programmes", label: "Programmes" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/impact", label: "Impact" },
  { to: "/about", label: "About" },
];

export type Image = { src: string; alt: string; w: number; h: number };

const img = (src: string, alt: string, w: number, h: number): Image => ({
  src,
  alt,
  w,
  h,
});

export const images = {
  hero: img(
    heroSea,
    "A low swell rolling towards the camera under a pale dawn sky.",
    1800,
    1200,
  ),
  haul: img(
    haul,
    "Four volunteers heave a white sack of netting and rope over a sea wall.",
    1024,
    683,
  ),
  sorted: img(
    sorted,
    "A crate of beach debris: bottle caps, a jerrycan, cutlery, net floats and fishing line.",
    1024,
    683,
  ),
  shoreline: img(
    shoreline,
    "Two volunteers with litter pickers work a wide sandy beach at low water.",
    1024,
    941,
  ),
  bucketBrigade: img(
    bucketBrigade,
    "A long human chain passes bags of shell across a tidal flat.",
    960,
    720,
  ),
  oysterReef: img(
    oysterReef,
    "A young oyster bed showing through shallow water, marked with survey poles, eelgrass in the foreground.",
    1024,
    768,
  ),
  shellBags: img(
    shellBags,
    "Schoolchildren in gloves fill mesh bags with recycled oyster shell.",
    1024,
    768,
  ),
  kelp: img(
    kelp,
    "Golden kelp fronds rising through clear green-blue water.",
    1800,
    1350,
  ),
  reefDiver: img(
    reefDiver,
    "A survey diver kneels on the seabed recording growth beside a sea fan.",
    1024,
    671,
  ),
  turtle: img(
    turtle,
    "A loggerhead turtle swimming in open blue water.",
    1024,
    683,
  ),
  surveyBoat: img(
    surveyBoat,
    "Half-underwater view of an orange survey boat with two crew on deck.",
    1024,
    683,
  ),
  eelgrass: img(
    eelgrass,
    "Botanical plate of eelgrass, Zostera marina, showing ribbon leaves, root and seed.",
    683,
    1024,
  ),
};

/* ------------------------------------------------------------------ sites (tide parameters) */

export type Site = {
  id: string;
  name: string;
  coast: string;
  /** Spring tidal range in metres. */
  range: number;
  /** Metres of beach between the high-water mark and low water. */
  foreshore: number;
  position: string;
  meet: string;
  access: string;
};

export const sites: Site[] = [
  {
    id: "merrow-bay",
    name: "Merrow Bay",
    coast: "South coast",
    range: 4.2,
    foreshore: 140,
    position: "50°13′N 4°47′W",
    meet: "The slipway by the lifeboat station",
    access: "Pay-and-display car park, step-free ramp to the sand",
  },
  {
    id: "holloway-sands",
    name: "Holloway Sands",
    coast: "North coast",
    range: 6.1,
    foreshore: 320,
    position: "50°33′N 4°56′W",
    meet: "Beach café terrace, north end of the promenade",
    access: "Bus 54 stops at the top of the dunes; boardwalk to the beach",
  },
  {
    id: "wrayburn-estuary",
    name: "Wrayburn Estuary",
    coast: "Estuary",
    range: 5.0,
    foreshore: 210,
    position: "50°21′N 4°09′W",
    meet: "Gate 3 of the old boatyard, Ferry Road",
    access:
      "Mud flats: wellies essential, no step-free access to the lower shore",
  },
  {
    id: "carrick-flats",
    name: "Carrick Flats",
    coast: "Estuary",
    range: 4.8,
    foreshore: 260,
    position: "50°09′N 5°03′W",
    meet: "Hide car park off the coast road",
    access: "Firm sand path to the hide; flats are soft beyond the posts",
  },
  {
    id: "skerrow-head",
    name: "Skerrow Head",
    coast: "Rocky shore",
    range: 3.6,
    foreshore: 90,
    position: "50°03′N 5°17′W",
    meet: "Harbour wall steps, below the coastguard hut",
    access: "Uneven rock and weed; sturdy footwear and three points of contact",
  },
];

/* ------------------------------------------------------------------ programmes */

export type Theme = "Clean" | "Restore" | "Survey" | "Teach";

export type Programme = {
  slug: string;
  name: string;
  theme: Theme;
  region: string;
  since: number;
  summary: string;
  lede: string;
  image: Image;
  gallery: Image[];
  body: string[];
  steps: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  sites: string[];
  lead: string;
  quote: { text: string; by: string };
};

export const themes: { id: Theme; blurb: string }[] = [
  {
    id: "Clean",
    blurb: "Taking rubbish off the shore before the next tide takes it back.",
  },
  {
    id: "Restore",
    blurb: "Putting habitats back: seagrass, native oyster, saltmarsh.",
  },
  {
    id: "Survey",
    blurb: "Counting what is there, so decisions rest on evidence.",
  },
  {
    id: "Teach",
    blurb: "Bringing schools and new volunteers down to the water.",
  },
];

export const programmes: Programme[] = [
  {
    slug: "low-water-cleans",
    name: "Low-water cleans",
    theme: "Clean",
    region: "Five beaches, south and north coasts",
    since: 2009,
    summary:
      "Monthly beach cleans timed to the bottom of the tide, when the most shore is open.",
    lede: "The strandline is where the sea leaves its rubbish, but the lower shore is where it hides. We schedule every clean around low water so crews can reach the rocks, gullies and sand that are underwater most of the day.",
    image: images.shoreline,
    gallery: [images.haul, images.sorted],
    body: [
      "A clean starts ninety minutes before low water. A crew leader walks the beach first, marks hazards with orange flags and splits the shore into zones. Volunteers work the lower shore while the tide is still falling and move up to the strandline as it turns.",
      "Every bag is weighed on the slipway and a sample is sorted into the Strandline Survey categories. That data goes into our annual report and into the national marine litter database, so a Saturday morning on the beach also counts as evidence.",
      "Kit is provided: gloves, pickers, buckets, bags and hi-vis. Most cleans finish with tea from the flask and a look at the oddest find of the day.",
    ],
    steps: [
      {
        title: "Brief at the slipway",
        text: "Safety talk, tide times, zones and the signal to come up the beach.",
      },
      {
        title: "Work the lower shore",
        text: "Ninety minutes on the falling tide, furthest from the high-water mark first.",
      },
      {
        title: "Sweep the strandline",
        text: "As the tide turns, everyone moves up to the weed line and the dunes.",
      },
      {
        title: "Weigh and sort",
        text: "Bags weighed, one in ten sorted for the survey, recycling split out.",
      },
    ],
    facts: [
      { label: "Beaches", value: "5 adopted" },
      { label: "Cleans in 2025", value: "64" },
      { label: "Removed in 2025", value: "7,980 kg" },
      { label: "Typical crew", value: "18–35 people" },
      { label: "Minimum age", value: "8, with an adult" },
      { label: "Kit", value: "Provided" },
    ],
    sites: ["merrow-bay", "holloway-sands", "skerrow-head"],
    lead: "Josie Hale",
    quote: {
      text: "Low water doubles what we can reach. The worst of it is always just below where the tourists stop walking.",
      by: "Josie Hale, Cleans coordinator",
    },
  },
  {
    slug: "seagrass-meadows",
    name: "Seagrass meadows",
    theme: "Restore",
    region: "Merrow Bay",
    since: 2017,
    summary:
      "Replanting eelgrass in Merrow Bay, one hessian seed bag at a time.",
    lede: "Merrow Bay lost nine tenths of its eelgrass to moorings and dredging in the 1980s. Seagrass holds the seabed together, shelters young fish and stores carbon in its roots. We collect seed from the surviving beds and plant it back.",
    image: images.eelgrass,
    gallery: [images.oysterReef, images.hero],
    body: [
      "In late summer, snorkel teams harvest flowering shoots from the healthy meadow off Pellow Point. The shoots ripen in tanks at our net loft until the seed drops, then volunteers pack it into biodegradable hessian bags with sand.",
      "Planting happens on the lowest spring tides of autumn, when the bed is just a few centimetres under water. Each bag is pushed into the sediment on a measured grid and logged with GPS so the survey team can find it again in spring.",
      "We have replaced 21,000 square metres since 2017, alongside a voluntary no-anchor zone agreed with the harbour authority and local sailing clubs.",
    ],
    steps: [
      {
        title: "Harvest",
        text: "August snorkel teams collect flowering shoots from donor beds under licence.",
      },
      {
        title: "Ripen and bag",
        text: "Seed ripens in our tanks; volunteers pack 200 seeds into each hessian bag.",
      },
      {
        title: "Plant on springs",
        text: "Bags placed on a one-metre grid on the lowest October tides.",
      },
      {
        title: "Survey in spring",
        text: "Quadrat counts each April record shoot density and spread.",
      },
    ],
    facts: [
      { label: "Area planted", value: "21,000 m²" },
      { label: "Seed bags in 2025", value: "6,400" },
      { label: "Shoot survival", value: "38% at year one" },
      { label: "No-anchor zone", value: "0.6 km²" },
      { label: "Minimum age", value: "12 for planting days" },
      { label: "Licence", value: "Harvest under marine licence" },
    ],
    sites: ["merrow-bay"],
    lead: "Dr Ana Ferreira",
    quote: {
      text: "Seagrass is slow. You plant on a cold October morning and find out if it worked when the April survey comes back.",
      by: "Dr Ana Ferreira, Restoration lead",
    },
  },
  {
    slug: "native-oyster-reefs",
    name: "Native oyster reefs",
    theme: "Restore",
    region: "Wrayburn Estuary",
    since: 2019,
    summary:
      "Rebuilding native oyster beds in the Wrayburn with recycled shell and nursery spat.",
    lede: "The Wrayburn once supported a native oyster fishery of forty boats. Disease and overfishing left almost nothing. A single healthy oyster filters up to 200 litres of water a day; a reef gives crabs, fish and sponges somewhere to live.",
    image: images.bucketBrigade,
    gallery: [images.oysterReef, images.shellBags],
    body: [
      "Restaurants along the coast save their shell for us. It is cured in the open air for six months, bagged in mesh by volunteers and laid on the estuary bed at low water to make a hard base the young oysters can settle on.",
      "Nursery cages under the boatyard pontoon raise juvenile native oysters each summer. When they reach thumbnail size they are spread onto the shell reefs by hand on the lowest tides.",
      "Reef building days are muddy, physical and often the most fun we have all year. Bucket chains move a tonne of shell across the flats in under an hour.",
    ],
    steps: [
      {
        title: "Collect shell",
        text: "Twelve partner restaurants set aside shell, collected weekly.",
      },
      {
        title: "Cure and bag",
        text: "Six months in the open, then into 10 kg mesh bags.",
      },
      {
        title: "Build the base",
        text: "Bucket chains lay shell bags on marked plots at low water.",
      },
      {
        title: "Seed and monitor",
        text: "Nursery oysters spread on top; survival counted every quarter.",
      },
    ],
    facts: [
      { label: "Reef plots", value: "14" },
      { label: "Shell recycled", value: "62 tonnes" },
      { label: "Oysters seeded", value: "118,000" },
      { label: "Live density", value: "41 per m²" },
      { label: "Footwear", value: "Wellies or wading boots" },
      { label: "Minimum age", value: "14 with an adult" },
    ],
    sites: ["wrayburn-estuary", "carrick-flats"],
    lead: "Tomasz Wilk",
    quote: {
      text: "The first year we found crabs living in the bags we knew it was working, before a single oyster had grown.",
      by: "Tomasz Wilk, Estuary officer",
    },
  },
  {
    slug: "kelp-watch",
    name: "Kelp Watch",
    theme: "Survey",
    region: "Skerrow Head",
    since: 2015,
    summary:
      "Volunteer divers mapping the kelp forest off Skerrow Head, transect by transect.",
    lede: "Kelp forests are the most productive habitat on our coast and among the least watched. Our dive teams swim fixed transects every summer, counting stipes, measuring canopy and recording the urchins that graze it bare.",
    image: images.kelp,
    gallery: [images.reefDiver, images.surveyBoat],
    body: [
      "Kelp Watch runs from May to September from our survey RIB, Sea Holly. Pairs of qualified divers follow weighted lines laid on the seabed and record kelp density in one-metre quadrats every five metres.",
      "Snorkellers and shore volunteers are just as important: they log canopy cover from the surface at low water and sort the photo-quadrats afterwards in the net loft.",
      "Ten years of data now show the forest edge moving shoreward at the warmest sites. Our transects are shared with two universities and the regional fisheries authority.",
    ],
    steps: [
      {
        title: "Train",
        text: "Spring course in survey methods and species ID, dive or snorkel route.",
      },
      {
        title: "Swim transects",
        text: "Fixed lines, quadrats every five metres, photos of each one.",
      },
      {
        title: "Log from shore",
        text: "Canopy counts at low water from three fixed viewpoints.",
      },
      {
        title: "Analyse",
        text: "Photo sorting evenings each winter feed the annual dataset.",
      },
    ],
    facts: [
      { label: "Transects", value: "22 fixed lines" },
      { label: "Survey season", value: "May–September" },
      { label: "Divers", value: "46 qualified volunteers" },
      { label: "Data since", value: "2015" },
      { label: "Diver level", value: "Sport Diver or equivalent" },
      { label: "Shore role", value: "No diving needed" },
    ],
    sites: ["skerrow-head"],
    lead: "Rhiannon Price",
    quote: {
      text: "A transect is boring on purpose. Same line, same depth, every year. That is how you see a forest move.",
      by: "Rhiannon Price, Survey manager",
    },
  },
  {
    slug: "strandline-survey",
    name: "Strandline Survey",
    theme: "Survey",
    region: "All sites",
    since: 2011,
    summary:
      "A hundred metres of beach, every item counted, four times a year.",
    lede: "Weight tells you how much; counts tell you what and from where. Each quarter our survey teams walk the same 100-metre stretch on every adopted beach and record every item in 112 categories.",
    image: images.sorted,
    gallery: [images.haul, images.shoreline],
    body: [
      "Surveys follow the national method so our numbers sit alongside thousands of other beaches. Teams of six take a measured section from the water's edge to the back of the beach and count everything over half a centimetre.",
      "The survey is how we know that wet wipes fell by a third after the 2023 sewage overflow campaign, and that fishing gear is now the heaviest single category on the north coast.",
      "No experience needed. Count sheets have pictures, and a crew leader checks anything odd.",
    ],
    steps: [
      {
        title: "Mark the section",
        text: "Tape out 100 m from fixed posts, water's edge to the dune foot.",
      },
      {
        title: "Walk in lines",
        text: "Six people abreast, two passes, every item over 0.5 cm.",
      },
      {
        title: "Count by category",
        text: "112 categories on a picture sheet; odd finds photographed.",
      },
      {
        title: "Submit",
        text: "Results checked and sent to the national database the same day.",
      },
    ],
    facts: [
      { label: "Surveys a year", value: "20" },
      { label: "Categories", value: "112" },
      { label: "Items logged in 2025", value: "41,860" },
      { label: "Data shared with", value: "National marine litter database" },
      { label: "Duration", value: "Two hours" },
      { label: "Minimum age", value: "10, with an adult" },
    ],
    sites: ["holloway-sands", "merrow-bay", "carrick-flats"],
    lead: "Josie Hale",
    quote: {
      text: "Counting every cotton bud stick feels mad until it ends up in a parliamentary briefing.",
      by: "Femi Adeyemi, Survey volunteer since 2016",
    },
  },
  {
    slug: "strandings-network",
    name: "Strandings network",
    theme: "Survey",
    region: "Whole coast, on call",
    since: 2013,
    summary:
      "Trained responders for stranded seals, dolphins and the occasional turtle.",
    lede: "When a live animal strands, the first hour matters. Our on-call responders reach most of the coast within forty minutes, keep people and dogs back, assess the animal and work with the vets to refloat or rescue it.",
    image: images.turtle,
    gallery: [images.surveyBoat, images.hero],
    body: [
      "Responders complete a one-day course in marine mammal first aid and join a rota. Calls come through our hotline, staffed around the clock by volunteers from home.",
      "Dead strandings matter too. Measurements, photos and samples go to the national strandings programme, which tracks bycatch, disease and pollutants in marine mammals.",
      "Last year the network attended 132 strandings, including two loggerhead turtles carried north on unusual autumn currents.",
    ],
    steps: [
      {
        title: "Train",
        text: "One-day marine mammal medic course, then two shadow call-outs.",
      },
      {
        title: "Join the rota",
        text: "Pick the weekends and evenings you can be on call.",
      },
      {
        title: "Respond",
        text: "Secure the scene, assess the animal, call the vet team.",
      },
      {
        title: "Record",
        text: "Photos and measurements logged for the national programme.",
      },
    ],
    facts: [
      { label: "Call-outs in 2025", value: "132" },
      { label: "Live animals refloated", value: "27" },
      { label: "Responders", value: "64 on the rota" },
      { label: "Median response", value: "38 minutes" },
      { label: "Course", value: "One day, £45, bursaries available" },
      { label: "Minimum age", value: "18" },
    ],
    sites: ["holloway-sands", "skerrow-head", "merrow-bay"],
    lead: "Dr Ana Ferreira",
    quote: {
      text: "Most of the job is crowd control and a wet towel. The rest is knowing when to wait for the tide.",
      by: "Callum Reid, Responder",
    },
  },
  {
    slug: "shore-school",
    name: "Shore School",
    theme: "Teach",
    region: "Primary schools on the coast",
    since: 2014,
    summary:
      "Free rockpool, survey and restoration days for primary schools within ten miles of the sea.",
    lede: "One in four children in Merrow have never been to the beach with their school. Shore School brings whole classes down to the water at low tide for a day of rockpooling, surveying and hands-on restoration work.",
    image: images.shellBags,
    gallery: [images.bucketBrigade, images.shoreline],
    body: [
      "Each visit is built around the curriculum: habitats and food chains for Year 4, materials and pollution for Year 5. Teachers get a pre-visit pack and a follow-up lesson the class can run back in school.",
      "The favourite job is shell bagging for the oyster reefs. Children leave knowing that something they made is on the seabed of the Wrayburn.",
      "Visits are free for schools, funded by monthly donors. Coaches are paid for where cost would stop a school coming.",
    ],
    steps: [
      {
        title: "Book a tide",
        text: "Teachers choose from low-water dates in the school term.",
      },
      {
        title: "Prepare",
        text: "Pre-visit lesson pack and a risk assessment ready to sign.",
      },
      {
        title: "Shore day",
        text: "Rockpooling, a mini survey and a restoration task.",
      },
      {
        title: "Back in class",
        text: "Follow-up lesson using the data the class collected.",
      },
    ],
    facts: [
      { label: "Pupils in 2025", value: "3,140" },
      { label: "Schools", value: "38" },
      { label: "Cost to schools", value: "Free" },
      { label: "Coach fund", value: "£8,600 in 2025" },
      { label: "Ages", value: "7–11" },
      { label: "Volunteers", value: "DBS-checked helpers" },
    ],
    sites: ["merrow-bay", "carrick-flats"],
    lead: "Priya Nair",
    quote: {
      text: "They come back to school with wet socks and a crab drawing, and they never drop a crisp packet again.",
      by: "Year 5 teacher, Fore Street Primary",
    },
  },
];

/* ------------------------------------------------------------------ volunteer events */

export type EventKind =
  "Beach clean" | "Seagrass planting" | "Reef build" | "Survey" | "Training";

export type TideEvent = {
  id: string;
  title: string;
  kind: EventKind;
  programme: string;
  site: string;
  /** ISO date. */
  date: string;
  /** First high water of the day (local time); the work window is derived from it. */
  highWater: string;
  spots: number;
  taken: number;
  minAge: number;
  leader: string;
  summary: string;
  detail: string;
  bring: string[];
};

export const events: TideEvent[] = [
  {
    id: "merrow-autumn-clean",
    title: "Merrow Bay autumn clean",
    kind: "Beach clean",
    programme: "low-water-cleans",
    site: "merrow-bay",
    date: "2026-10-24",
    highWater: "04:42",
    spots: 40,
    taken: 27,
    minAge: 8,
    leader: "Josie Hale",
    summary:
      "After the equinox storms: rope, net and the summer's leftovers along the whole bay.",
    detail:
      "The first big clean after the autumn gales. Expect rope and net in the gullies under the west cliff and a lot of summer litter in the dune edge. Crews of six, one zone each, tea at the slipway after.",
    bring: [
      "Waterproof layers",
      "Sturdy shoes you can get wet",
      "Water bottle",
      "A reusable cup for tea",
    ],
  },
  {
    id: "seagrass-planting-october",
    title: "Seagrass planting on the springs",
    kind: "Seagrass planting",
    programme: "seagrass-meadows",
    site: "merrow-bay",
    date: "2026-10-27",
    highWater: "06:05",
    spots: 24,
    taken: 22,
    minAge: 12,
    leader: "Dr Ana Ferreira",
    summary:
      "The lowest tide of the autumn. Six thousand seeds go into the bay.",
    detail:
      "We plant hessian seed bags on a one-metre grid in ankle-deep water at the very bottom of a spring tide. Waders are provided for adults; bring wetsuit boots if you have them. The window is short and the tide does not wait.",
    bring: [
      "Warm layers and a hat",
      "Wetsuit boots if you have them",
      "A change of clothes",
      "Packed lunch",
    ],
  },
  {
    id: "holloway-strandline-survey",
    title: "Holloway Sands quarterly survey",
    kind: "Survey",
    programme: "strandline-survey",
    site: "holloway-sands",
    date: "2026-11-01",
    highWater: "05:20",
    spots: 12,
    taken: 5,
    minAge: 10,
    leader: "Josie Hale",
    summary:
      "One hundred metres, every item counted. Good for first-timers who like detail.",
    detail:
      "We tape out the survey section from the fixed posts and walk it in two passes, counting everything over half a centimetre into 112 categories. Count sheets have pictures. Clipboards, pencils and tea provided.",
    bring: [
      "Warm, windproof layers",
      "Gloves",
      "Reading glasses if you use them",
    ],
  },
  {
    id: "wrayburn-reef-build",
    title: "Wrayburn reef build: plot 15",
    kind: "Reef build",
    programme: "native-oyster-reefs",
    site: "wrayburn-estuary",
    date: "2026-11-07",
    highWater: "06:30",
    spots: 30,
    taken: 30,
    minAge: 14,
    leader: "Tomasz Wilk",
    summary:
      "A bucket chain across the mud to lay the base of our fifteenth reef plot.",
    detail:
      "Eighty bags of cured shell go down on plot 15 in a single tide. Heavy, muddy, sociable work. We hose everyone off at the boatyard afterwards and there is soup.",
    bring: [
      "Wellies or wading boots",
      "Old clothes",
      "Gloves (spares provided)",
      "A change of clothes",
    ],
  },
  {
    id: "skerrow-rockpool-clean",
    title: "Skerrow Head gully clean",
    kind: "Beach clean",
    programme: "low-water-cleans",
    site: "skerrow-head",
    date: "2026-11-14",
    highWater: "02:55",
    spots: 16,
    taken: 9,
    minAge: 14,
    leader: "Callum Reid",
    summary: "Fishing line and rope out of the rock gullies on a big low tide.",
    detail:
      "The gullies below the harbour wall catch rope, line and crab-pot fragments that never reach the sand. Rough ground and slippery weed: this one needs steady feet. Cutting tools and grab bags provided.",
    bring: ["Boots with good grip", "Waterproofs", "Gloves", "Water"],
  },
  {
    id: "strandings-medic-course",
    title: "Marine mammal medic course",
    kind: "Training",
    programme: "strandings-network",
    site: "holloway-sands",
    date: "2026-11-21",
    highWater: "07:10",
    spots: 20,
    taken: 13,
    minAge: 18,
    leader: "Dr Ana Ferreira",
    summary:
      "Classroom morning, beach practical at low water with an inflatable seal.",
    detail:
      "The course that puts you on the strandings rota. Morning theory in the beach café's upstairs room, then a practical on the sand at low water: assessment, first aid and a refloat with pontoons. £45 including lunch; bursaries on request.",
    bring: ["Clothes for kneeling on wet sand", "Wellies", "Notebook"],
  },
  {
    id: "carrick-flats-clean",
    title: "Carrick Flats saltmarsh clean",
    kind: "Beach clean",
    programme: "low-water-cleans",
    site: "carrick-flats",
    date: "2026-11-28",
    highWater: "05:48",
    spots: 25,
    taken: 6,
    minAge: 8,
    leader: "Priya Nair",
    summary:
      "Winter high tides push plastic deep into the marsh. We go in after it.",
    detail:
      "Saltmarsh traps light plastic in the cord grass where nobody sees it. We work along the creek edges from the hide path, carefully, so we do not trample the marsh. Good birdwatching on the way back.",
    bring: ["Wellies", "Binoculars if you have them", "Warm layers"],
  },
  {
    id: "holloway-boxing-day-clean",
    title: "Boxing Day clean",
    kind: "Beach clean",
    programme: "low-water-cleans",
    site: "holloway-sands",
    date: "2026-12-26",
    highWater: "06:20",
    spots: 60,
    taken: 31,
    minAge: 5,
    leader: "Josie Hale",
    summary:
      "Our biggest morning of the year. Bring the family; mince pies at the end.",
    detail:
      "A tradition since 2010. Family-friendly zones on the upper beach, adult crews on the lower shore. Mince pies, the oddest-find prize and the annual group photo on the dunes.",
    bring: ["Everyone in the house", "Waterproofs", "Wellies or old trainers"],
  },
  {
    id: "photo-quadrat-evening",
    title: "Kelp photo-quadrat sorting",
    kind: "Survey",
    programme: "kelp-watch",
    site: "skerrow-head",
    date: "2027-01-13",
    highWater: "04:15",
    spots: 14,
    taken: 4,
    minAge: 16,
    leader: "Rhiannon Price",
    summary:
      "Shore watch at low water, then a warm afternoon sorting last summer's photos.",
    detail:
      "Start with a canopy count from the harbour-wall viewpoint on the low tide, then head to the net loft to sort and score 2,400 photo-quadrats from the summer dives. Training on the day; laptops provided.",
    bring: ["Warm coat", "Your own laptop if you prefer it"],
  },
];

/* ------------------------------------------------------------------ impact reports */

export type Report = {
  year: number;
  title: string;
  published: string;
  summary: string;
  letter: string[];
  signedBy: string;
  kg: number;
  volunteers: number;
  hours: number;
  events: number;
  seagrass: number;
  oysters: number;
  pupils: number;
  composition: { category: string; share: number }[];
  topItems: { item: string; count: number }[];
  money: { income: number; spend: { label: string; amount: number }[] };
  highlights: { title: string; text: string }[];
};

export const reports: Report[] = [
  {
    year: 2025,
    title: "The year the meadow came back",
    published: "2026-04-14",
    summary:
      "Record seagrass survival, a fifteenth reef plot approved, and nearly eight tonnes off our beaches. Fishing gear became the heaviest category we collect.",
    letter: [
      "In April our survey divers found eelgrass shoots in plots we planted in 2022 that had been bare for two seasons. Thirty-eight per cent survival is not a headline number anywhere else. Here, after eight years of trying, it felt like one.",
      "The beaches told a harder story. Fishing gear is now the heaviest thing we take off the north coast, most of it rope and net lost in winter storms. We started talks with the harbour's fishing co-operative about a gear amnesty and recycling skip on the quay, and will report on it next year.",
      "None of it happens without 1,860 people who gave a morning, a tide, or a monthly donation. Thank you.",
    ],
    signedBy: "Morwenna Treloar, Director",
    kg: 7980,
    volunteers: 1860,
    hours: 14200,
    events: 112,
    seagrass: 4300,
    oysters: 31000,
    pupils: 3140,
    composition: [
      { category: "Plastic fragments", share: 29 },
      { category: "Fishing gear & rope", share: 24 },
      { category: "Food & drink packaging", share: 17 },
      { category: "Glass & metal", share: 9 },
      { category: "Sanitary & wet wipes", share: 7 },
      { category: "Polystyrene", share: 6 },
      { category: "Other", share: 8 },
    ],
    topItems: [
      { item: "Plastic pieces 0.5–2.5 cm", count: 9820 },
      { item: "String and cord under 1 cm", count: 4310 },
      { item: "Crisp and sweet packets", count: 2960 },
      { item: "Bottle caps and lids", count: 2470 },
      { item: "Polystyrene pieces", count: 2215 },
      { item: "Cigarette stubs", count: 1980 },
      { item: "Fishing line", count: 1440 },
      { item: "Cotton bud sticks", count: 1105 },
      { item: "Wet wipes", count: 890 },
      { item: "Drinks bottles", count: 760 },
    ],
    money: {
      income: 702000,
      spend: [
        { label: "Programmes on the shore", amount: 512000 },
        { label: "Schools and training", amount: 74000 },
        { label: "Fundraising", amount: 61000 },
        { label: "Running the charity", amount: 37000 },
      ],
    },
    highlights: [
      {
        title: "Seagrass survival up to 38%",
        text: "Up from 21% in 2024, after switching to deeper planting on the lowest springs.",
      },
      {
        title: "Plot 15 approved",
        text: "Marine licence granted for a fifteenth oyster reef plot in the Wrayburn.",
      },
      {
        title: "132 strandings attended",
        text: "Including two loggerhead turtles, both taken into care.",
      },
    ],
  },
  {
    year: 2024,
    title: "Counting what the storms brought",
    published: "2025-04-09",
    summary:
      "Three named storms in eight weeks filled the strandlines. Volunteers removed more than ever, and the survey showed wet wipes falling for the first time.",
    letter: [
      "Storm after storm through the winter meant our cleans were bigger and heavier than any year before. Crews took 8.4 tonnes off five beaches, much of it in January and February.",
      "The Strandline Survey gave us one piece of good news: wet wipes down by a third on Merrow Bay after the overflow campaign. Data collected on cold mornings made that argument.",
    ],
    signedBy: "Morwenna Treloar, Director",
    kg: 8420,
    volunteers: 1710,
    hours: 13100,
    events: 104,
    seagrass: 3900,
    oysters: 26000,
    pupils: 2890,
    composition: [
      { category: "Plastic fragments", share: 31 },
      { category: "Fishing gear & rope", share: 21 },
      { category: "Food & drink packaging", share: 18 },
      { category: "Glass & metal", share: 8 },
      { category: "Sanitary & wet wipes", share: 8 },
      { category: "Polystyrene", share: 7 },
      { category: "Other", share: 7 },
    ],
    topItems: [
      { item: "Plastic pieces 0.5–2.5 cm", count: 10640 },
      { item: "String and cord under 1 cm", count: 3980 },
      { item: "Crisp and sweet packets", count: 3120 },
      { item: "Polystyrene pieces", count: 2610 },
      { item: "Bottle caps and lids", count: 2380 },
      { item: "Cigarette stubs", count: 2050 },
      { item: "Wet wipes", count: 1340 },
      { item: "Fishing line", count: 1290 },
      { item: "Cotton bud sticks", count: 1220 },
      { item: "Drinks bottles", count: 810 },
    ],
    money: {
      income: 612000,
      spend: [
        { label: "Programmes on the shore", amount: 448000 },
        { label: "Schools and training", amount: 69000 },
        { label: "Fundraising", amount: 58000 },
        { label: "Running the charity", amount: 35000 },
      ],
    },
    highlights: [
      {
        title: "8.4 tonnes removed",
        text: "Our heaviest year, driven by three winter storms.",
      },
      {
        title: "Wet wipes down 33%",
        text: "On Merrow Bay, after the sewage overflow campaign.",
      },
      {
        title: "Kelp Watch turns ten",
        text: "A decade of transects shared with two universities.",
      },
    ],
  },
  {
    year: 2023,
    title: "Reefs, wipes and a second boat",
    published: "2024-04-17",
    summary:
      "Survey RIB Sea Holly joined the fleet, oyster plots doubled to ten, and our overflow campaign took survey data to Parliament.",
    letter: [
      "A legacy gift let us buy Sea Holly, a survey boat that means Kelp Watch no longer waits for borrowed time on someone else's RIB.",
      "In the Wrayburn, ten oyster plots now hold live oysters at densities we did not expect to see for another five years.",
    ],
    signedBy: "Morwenna Treloar, Director",
    kg: 6910,
    volunteers: 1520,
    hours: 11800,
    events: 96,
    seagrass: 3600,
    oysters: 24000,
    pupils: 2540,
    composition: [
      { category: "Plastic fragments", share: 32 },
      { category: "Fishing gear & rope", share: 19 },
      { category: "Food & drink packaging", share: 19 },
      { category: "Glass & metal", share: 8 },
      { category: "Sanitary & wet wipes", share: 11 },
      { category: "Polystyrene", share: 6 },
      { category: "Other", share: 5 },
    ],
    topItems: [
      { item: "Plastic pieces 0.5–2.5 cm", count: 9410 },
      { item: "Crisp and sweet packets", count: 3290 },
      { item: "String and cord under 1 cm", count: 3150 },
      { item: "Wet wipes", count: 2010 },
      { item: "Bottle caps and lids", count: 2240 },
      { item: "Cigarette stubs", count: 2120 },
      { item: "Polystyrene pieces", count: 1890 },
      { item: "Cotton bud sticks", count: 1460 },
      { item: "Fishing line", count: 1010 },
      { item: "Drinks bottles", count: 870 },
    ],
    money: {
      income: 701000,
      spend: [
        { label: "Programmes on the shore", amount: 391000 },
        { label: "Survey boat (one-off)", amount: 148000 },
        { label: "Schools and training", amount: 61000 },
        { label: "Fundraising", amount: 52000 },
        { label: "Running the charity", amount: 33000 },
      ],
    },
    highlights: [
      {
        title: "Sea Holly launched",
        text: "Our own survey RIB, funded by a legacy gift.",
      },
      {
        title: "Ten live reef plots",
        text: "Oyster density ahead of the five-year target.",
      },
      {
        title: "Evidence in Parliament",
        text: "Survey data cited in a select committee briefing on overflows.",
      },
    ],
  },
  {
    year: 2022,
    title: "Back on the beach",
    published: "2023-04-12",
    summary:
      "The first full season since the pandemic. Volunteer numbers recovered and Shore School passed two thousand pupils.",
    letter: [
      "It was good to be busy again. Cleans returned to full crews, and Shore School ran every week of the summer term.",
    ],
    signedBy: "Morwenna Treloar, Director",
    kg: 6120,
    volunteers: 1290,
    hours: 9900,
    events: 84,
    seagrass: 3100,
    oysters: 19000,
    pupils: 2080,
    composition: [
      { category: "Plastic fragments", share: 33 },
      { category: "Fishing gear & rope", share: 18 },
      { category: "Food & drink packaging", share: 20 },
      { category: "Glass & metal", share: 8 },
      { category: "Sanitary & wet wipes", share: 10 },
      { category: "Polystyrene", share: 6 },
      { category: "Other", share: 5 },
    ],
    topItems: [
      { item: "Plastic pieces 0.5–2.5 cm", count: 8820 },
      { item: "Crisp and sweet packets", count: 3410 },
      { item: "String and cord under 1 cm", count: 2960 },
      { item: "Cigarette stubs", count: 2380 },
      { item: "Bottle caps and lids", count: 2060 },
      { item: "Wet wipes", count: 1870 },
      { item: "Polystyrene pieces", count: 1720 },
      { item: "Cotton bud sticks", count: 1530 },
      { item: "Fishing line", count: 940 },
      { item: "Drinks bottles", count: 910 },
    ],
    money: {
      income: 538000,
      spend: [
        { label: "Programmes on the shore", amount: 371000 },
        { label: "Schools and training", amount: 54000 },
        { label: "Fundraising", amount: 49000 },
        { label: "Running the charity", amount: 31000 },
      ],
    },
    highlights: [
      {
        title: "Full crews again",
        text: "Average clean attendance back above 25.",
      },
      { title: "2,080 pupils", text: "Shore School's biggest year so far." },
    ],
  },
  {
    year: 2021,
    title: "Small crews, long tides",
    published: "2022-04-20",
    summary:
      "Cleans in groups of six, surveys by household, and the first oysters spread on the Wrayburn plots.",
    letter: [
      "We worked in sixes, booked by household, and still cleared more than five tonnes. The first nursery oysters went onto the reef plots in June.",
    ],
    signedBy: "Morwenna Treloar, Director",
    kg: 5240,
    volunteers: 940,
    hours: 7300,
    events: 71,
    seagrass: 2700,
    oysters: 18000,
    pupils: 1150,
    composition: [
      { category: "Plastic fragments", share: 34 },
      { category: "Fishing gear & rope", share: 17 },
      { category: "Food & drink packaging", share: 19 },
      { category: "Glass & metal", share: 8 },
      { category: "Sanitary & wet wipes", share: 12 },
      { category: "Polystyrene", share: 6 },
      { category: "Other", share: 4 },
    ],
    topItems: [
      { item: "Plastic pieces 0.5–2.5 cm", count: 7640 },
      { item: "Crisp and sweet packets", count: 2980 },
      { item: "String and cord under 1 cm", count: 2410 },
      { item: "Face masks", count: 2150 },
      { item: "Cigarette stubs", count: 2020 },
      { item: "Wet wipes", count: 1790 },
      { item: "Bottle caps and lids", count: 1660 },
      { item: "Cotton bud sticks", count: 1480 },
      { item: "Polystyrene pieces", count: 1390 },
      { item: "Fishing line", count: 720 },
    ],
    money: {
      income: 461000,
      spend: [
        { label: "Programmes on the shore", amount: 318000 },
        { label: "Schools and training", amount: 33000 },
        { label: "Fundraising", amount: 44000 },
        { label: "Running the charity", amount: 29000 },
      ],
    },
    highlights: [
      {
        title: "First oysters on the reef",
        text: "Nursery spat spread on four plots in June.",
      },
      {
        title: "Cleans in sixes",
        text: "Household bookings kept crews safe and busy.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ donate */

export type Frequency = "monthly" | "once";

export const giving: Record<Frequency, { amount: number; does: string }[]> = {
  monthly: [
    {
      amount: 5,
      does: "keeps one beach stocked with gloves and bags for a year",
    },
    { amount: 12, does: "plants 140 seagrass seed bags over a year" },
    { amount: 20, does: "brings a class of 30 to Shore School every term" },
    { amount: 40, does: "funds a strandings responder's training and kit" },
  ],
  once: [
    { amount: 15, does: "buys a set of litter pickers for a crew of six" },
    { amount: 35, does: "lays ten bags of oyster shell on the Wrayburn reef" },
    { amount: 75, does: "pays for one Kelp Watch survey dive" },
    { amount: 150, does: "covers a coach so a school can reach the shore" },
  ],
};

export const donateFaq: { q: string; a: string }[] = [
  {
    q: "What is Gift Aid?",
    a: "If you pay UK income or capital gains tax, the government adds 25p to every £1 you give, at no cost to you. You must have paid at least as much tax in the year as all charities will claim on your gifts.",
  },
  {
    q: "Can I change or cancel a monthly gift?",
    a: "Yes, any time, by email or phone. There is no minimum term and we will never ask you why.",
  },
  {
    q: "How much of my gift reaches the shore?",
    a: "In 2025, 86p of every £1 we spent went on programmes, schools and training. The rest paid for fundraising and running the charity. The full breakdown is in each impact report.",
  },
  {
    q: "Can I give in memory of someone?",
    a: "Yes. Tell us their name in the message field and we will add it to the plaque on the net loft wall and send you an acknowledgement card.",
  },
  {
    q: "Do you sell or swap supporter data?",
    a: "Never. We send a receipt and, if you ask for it, the monthly Tide Notes email. That is all.",
  },
];

/* ------------------------------------------------------------------ people & story */

export type Person = { name: string; role: string; bio: string };

export const team: Person[] = [
  {
    name: "Morwenna Treloar",
    role: "Director",
    bio: "Ran the first cleans from her car boot in 2009. Former harbour pilot, still on call for strandings.",
  },
  {
    name: "Dr Ana Ferreira",
    role: "Restoration lead",
    bio: "Seagrass ecologist. Spends more of October in waders than out of them.",
  },
  {
    name: "Tomasz Wilk",
    role: "Estuary officer",
    bio: "Twenty years in shellfish farming before the oysters needed rescuing instead of selling.",
  },
  {
    name: "Rhiannon Price",
    role: "Survey manager",
    bio: "Leads Kelp Watch and the photo-quadrat archive. Commercial diver turned data wrangler.",
  },
  {
    name: "Josie Hale",
    role: "Cleans coordinator",
    bio: "Plans every clean around the tide table and weighs every bag on the slipway.",
  },
  {
    name: "Priya Nair",
    role: "Schools and learning",
    bio: "Former primary teacher. Designs the Shore School lessons and the follow-up packs.",
  },
];

export const trustees: Person[] = [
  { name: "Gareth Bowden", role: "Chair", bio: "Retired fisheries scientist." },
  {
    name: "Leah Okafor",
    role: "Treasurer",
    bio: "Chartered accountant, charity sector.",
  },
  {
    name: "Sam Penrose",
    role: "Trustee",
    bio: "Skipper, Merrow fishing co-operative.",
  },
  {
    name: "Dr Hannah Moyle",
    role: "Trustee",
    bio: "Marine ecologist and long-time volunteer.",
  },
];

export const timeline: { year: number; text: string }[] = [
  {
    year: 2009,
    text: "Morwenna Treloar and eleven neighbours clean Merrow Bay on a Sunday low tide. Tide begins.",
  },
  {
    year: 2011,
    text: "First Strandline Survey. Data starts going to the national database.",
  },
  {
    year: 2013,
    text: "Strandings network founded after a pod of dolphins strands at Holloway.",
  },
  {
    year: 2014,
    text: "Shore School's first visit: 28 pupils, one rockpool, a lot of crabs.",
  },
  {
    year: 2015,
    text: "Kelp Watch lays its first transect lines off Skerrow Head.",
  },
  { year: 2017, text: "First seagrass seed bags planted in Merrow Bay." },
  {
    year: 2019,
    text: "Native oyster programme begins in the Wrayburn with recycled restaurant shell.",
  },
  {
    year: 2023,
    text: "Survey boat Sea Holly launched, funded by a legacy gift.",
  },
];

export const values: { title: string; text: string }[] = [
  {
    title: "Work with the tide",
    text: "Every event is planned around the water. It is safer, and it reaches more of the shore.",
  },
  {
    title: "Count everything",
    text: "Data turns a good morning into evidence. We publish ours every year, including the bad news.",
  },
  {
    title: "Put things back",
    text: "Cleaning stops the damage. Restoration repairs it. We do both.",
  },
  {
    title: "Open the shore",
    text: "Anyone can come: kit is provided, cleans are free and we pay for coaches when that is the barrier.",
  },
];

/* ------------------------------------------------------------------ home */

export const home = {
  title: "We look after the coast between the tides.",
  intro:
    "Tide is a coastal charity on five beaches and two estuaries. We clean at low water, replant seagrass and native oyster reefs, count what washes up, and publish every number.",
  statement: {
    text: "Most of what we pick up was dropped, lost or flushed within twenty miles of where we find it.",
    note: "Strandline Survey, 41,860 items traced to source by category, 2025.",
  },
  voices: [
    {
      quote:
        "I came for one Saturday in 2019. Now I plan my month around the tide table like everyone else here.",
      by: "Femi Adeyemi",
      role: "Survey volunteer",
    },
    {
      quote:
        "You hand a bag of shell down a line of forty people across the mud and you feel the reef being built.",
      by: "Callum Reid",
      role: "Strandings responder and reef builder",
    },
  ],
};

export const newsletter = {
  title: "Tide Notes",
  text: "The next month's cleans, worked out against the tide table, on the first of every month.",
};
