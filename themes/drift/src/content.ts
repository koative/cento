import barrel from "./assets/barrel.jpg";
import bay from "./assets/bay.jpg";
import campLife from "./assets/camp-life.jpg";
import coachInes from "./assets/coach-ines.jpg";
import coachMara from "./assets/coach-mara.jpg";
import coachOwen from "./assets/coach-owen.jpg";
import coachSofia from "./assets/coach-sofia.jpg";
import coachTomas from "./assets/coach-tomas.jpg";
import fins from "./assets/fins.jpg";
import groms from "./assets/groms.jpg";
import hut from "./assets/hut.jpg";
import lessonGroup from "./assets/lesson-group.jpg";
import lineup from "./assets/lineup.jpg";
import longboard from "./assets/longboard.jpg";
import point from "./assets/point.jpg";
import rental from "./assets/rental.jpg";
import sunset from "./assets/sunset.jpg";
import turn from "./assets/turn.jpg";
import van from "./assets/van.jpg";
import walk from "./assets/walk.jpg";
import whitewater from "./assets/whitewater.jpg";
import yoga from "./assets/yoga.jpg";

export type Img = {
  src: string;
  alt: string;
  w: number;
  h: number;
  pos?: string;
};
const img = (
  src: string,
  w: number,
  h: number,
  alt: string,
  pos?: string,
): Img => ({ src, w, h, alt, pos });

/* ------------------------------------------------------------------ images */

export const images = {
  lessonGroup: img(
    lessonGroup,
    1024,
    684,
    "A lesson group in wetsuits wading out with soft-top boards under their arms",
  ),
  whitewater: img(
    whitewater,
    1024,
    619,
    "Beginners on bright foam boards riding whitewater in the shallows",
  ),
  turn: img(
    turn,
    1024,
    728,
    "A surfer crouched low through a turn on a green, feathering wave",
  ),
  barrel: img(
    barrel,
    1600,
    1067,
    "A surfer tucked inside a turquoise barrel, spray flying off the lip",
  ),
  hut: img(
    hut,
    1024,
    703,
    "The stone-and-shingle beach hut with a painted surf lessons board out front",
  ),
  bay: img(
    bay,
    1023,
    768,
    "A wide sandy bay at mid tide, dozens of surfers spread through the whitewater",
  ),
  campLife: img(
    campLife,
    1024,
    706,
    "Two surfers in wetsuits laughing on the deck steps after a session",
  ),
  lineup: img(
    lineup,
    1023,
    681,
    "Surfers sitting and paddling in the line-up beneath dry coastal hills",
  ),
  point: img(
    point,
    1023,
    681,
    "A crowded point line-up with a surfer catching a small right in front of beach houses",
  ),
  fins: img(
    fins,
    960,
    640,
    "Close-up of a surfboard's three fins on the sand at sunset",
    "50% 60%",
  ),
  rental: img(
    rental,
    1024,
    682,
    "Rows of rental longboards stacked on the sand under beach umbrellas",
  ),
  groms: img(
    groms,
    1023,
    705,
    "Young surfers with red boards gathering on a sandy cove between rock shelves",
  ),
  longboard: img(
    longboard,
    1800,
    1200,
    "A yellow longboard standing upright in the sand in front of soft morning surf",
  ),
  sunset: img(
    sunset,
    1800,
    1196,
    "A surfer silhouetted against a low orange sun, board under one arm",
  ),
  van: img(
    van,
    1200,
    1800,
    "An orange camper van with boards on the roof rack, reflected in a wet car park",
  ),
  walk: img(
    walk,
    1800,
    1200,
    "Two friends walking down a pale beach towards the surf with boards under their arms",
    "50% 70%",
  ),
  yoga: img(
    yoga,
    1800,
    1135,
    "A woman holding a low lunge on a yoga mat against a pink dusk sky over the water",
  ),
};

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Drift",
  sector: "Surf school & camps",
  tagline: "Surf lessons and camps timed to the tide, not the clock.",
  place: "Gull Point Beach, Alder Cove",
  address: [
    "The Hut, Gull Point Beach",
    "1 Shoreline Road",
    "Alder Cove, CA 93999",
  ],
  phone: "+1 555 018 2240",
  phoneHref: "tel:+15550182240",
  email: "hello@drift.example",
  hours:
    "Hut open daily 7:00 am – 6:00 pm, March to November; weekends only in winter.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Strava", href: "https://www.strava.com/" },
  ],
};

export const nav = [
  { to: "/lessons", label: "Lessons" },
  { to: "/camps", label: "Camps" },
  { to: "/forecast", label: "Surf report" },
  { to: "/coaches", label: "Coaches" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

/* ------------------------------------------------------------------ lessons */

export type LevelId = "first-wave" | "find-your-line" | "go-deeper";

export type Lesson = {
  id: string;
  name: string;
  who: string;
  level: LevelId | null;
  duration: string;
  ratio: string;
  price: number;
  priceNote: string;
  summary: string;
  learn: string[];
  image: Img;
  packs: boolean;
};

export const lessons: Lesson[] = [
  {
    id: "first-wave",
    name: "First Wave",
    who: "Never surfed, or not for years",
    level: "first-wave",
    duration: "2 hours",
    ratio: "6 surfers per coach",
    price: 85,
    priceNote: "per person",
    summary:
      "Twenty minutes on the sand learning the pop-up and how to read a rip, then the rest in waist-deep whitewater with a coach beside you. Most people stand on their first or second lesson.",
    learn: [
      "Board handling and carrying in a shore break",
      "Spotting rips and choosing where to paddle out",
      "Paddling, the pop-up and riding whitewater straight to shore",
    ],
    image: images.whitewater,
    packs: true,
  },
  {
    id: "find-your-line",
    name: "Find Your Line",
    who: "You stand in whitewater and want green waves",
    level: "find-your-line",
    duration: "2.5 hours",
    ratio: "5 surfers per coach",
    price: 95,
    priceNote: "per person",
    summary:
      "We move out past the foam to the inside sandbar. You learn to duck under sets, sit in the line-up, pick an unbroken wave and angle along it instead of riding straight in.",
    learn: [
      "Paddling out through sets, turtle rolls and timing",
      "Line-up etiquette and the right of way",
      "Angled take-offs and riding along the face",
    ],
    image: images.walk,
    packs: true,
  },
  {
    id: "go-deeper",
    name: "Go Deeper",
    who: "Confident on green waves, ready to turn",
    level: "go-deeper",
    duration: "2.5 hours",
    ratio: "4 surfers per coach",
    price: 120,
    priceNote: "per person",
    summary:
      "Small-group coaching at the Jetty or the Reef, wherever the forecast is best. A coach films from the water and you review the footage over coffee at the hut.",
    learn: [
      "Wave selection and positioning at the peak",
      "Bottom turns, top turns and generating speed",
      "Filmed session with a frame-by-frame review",
    ],
    image: images.turn,
    packs: true,
  },
  {
    id: "private",
    name: "Private Session",
    who: "Any level, one to three surfers",
    level: null,
    duration: "1.5 hours",
    ratio: "Your own coach",
    price: 180,
    priceNote: "for one, +$60 per extra surfer",
    summary:
      "One coach, your goals, your pace. Good for nervous starters, families learning together or surfers stuck on one particular thing.",
    learn: [
      "A plan built around one or two clear goals",
      "Spot chosen on the morning from the forecast",
      "Notes and clips sent to you afterwards",
    ],
    image: images.fins,
    packs: false,
  },
  {
    id: "groms",
    name: "Groms Club",
    who: "Kids aged 7 to 13, Saturdays",
    level: "first-wave",
    duration: "1.5 hours",
    ratio: "4 kids per coach",
    price: 65,
    priceNote: "per child",
    summary:
      "Saturday mornings in the shallow end of Gull Point with two coaches in the water. Ocean safety first, then games, then waves. Parents watch from the deck with a coffee.",
    learn: [
      "Ocean safety: flags, rips and calling for help",
      "Paddling games and balance drills",
      "Standing up and steering on whitewater",
    ],
    image: images.groms,
    packs: true,
  },
];

export const packs = [
  { id: "single", label: "Single lesson", count: 1, discount: 0 },
  { id: "three", label: "3-lesson pack", count: 3, discount: 0.1 },
  { id: "five", label: "5-lesson pack", count: 5, discount: 0.18 },
] as const;

export const lessonTimes = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const hire = [
  { item: "Soft-top board and wetsuit", lesson: "Included", day: "$45 / day" },
  {
    item: "Hard board (8′ – 9′6″ mid-length or longboard)",
    lesson: "+ $10",
    day: "$40 / day",
  },
  { item: "Wetsuit, 4/3 mm with boots", lesson: "Included", day: "$20 / day" },
  { item: "Locker and hot shower at the hut", lesson: "Included", day: "$6" },
  { item: "Video review clips", lesson: "Go Deeper only", day: "$30" },
];

/* ------------------------------------------------------------------ coaches */

export type Coach = {
  id: string;
  name: string;
  role: string;
  since: number;
  from: string;
  image: Img;
  short: string;
  bio: string[];
  certs: string[];
  board: string;
  spot: string;
  quote: string;
  teaches: string[];
};

export const coaches: Coach[] = [
  {
    id: "ines-calder",
    name: "Inês Calder",
    role: "Founder and head coach",
    since: 2004,
    from: "Grew up two streets from Gull Point",
    image: img(
      coachInes,
      504,
      681,
      "Inês, smiling, holding a surfboard flat on her head",
      "50% 30%",
    ),
    short:
      "Started Drift from the boot of a car in 2012 and still teaches every First Wave on Sunday mornings.",
    bio: [
      "Inês learned on a borrowed foam board at Gull Point and spent her twenties coaching in Portugal, Morocco and Baja before coming home to open Drift with four boards and a gazebo.",
      "She writes every coach's training plan, reads the dawn forecast each morning and still gets in the water for the Sunday First Wave, which she calls the best two hours of her week.",
    ],
    certs: [
      "ISA Level 2 Surf Coach",
      "Surf Lifesaving Instructor",
      "Wilderness First Responder",
    ],
    board: "9′2″ single-fin log",
    spot: "Gull Point on a small, glassy evening",
    quote:
      "Nobody remembers their first ride as a good wave. They remember someone shouting their name from the water.",
    teaches: ["first-wave", "private", "first-wave-week", "salt-and-stretch"],
  },
  {
    id: "tomas-reyes",
    name: "Tomás Reyes",
    role: "Camp lead, Baja and Costa Rica",
    since: 1998,
    from: "Ensenada, Baja California",
    image: img(
      coachTomas,
      510,
      440,
      "Tomás in a black wetsuit, pushing back his curly hair after a session",
      "50% 35%",
    ),
    short:
      "Twenty-five years on point breaks. Runs our trips south and the video sessions that go with them.",
    bio: [
      "Tomás has surfed the Baja points since he was eleven and guided surf trips along that coast for fifteen years before joining Drift to run the camps.",
      "He is the one with the waterproof camera, and the one who will make you watch your bottom turn six times in slow motion until you see it.",
    ],
    certs: [
      "ISA Level 2 Surf Coach",
      "Open-water lifeguard",
      "Wilderness First Aid",
    ],
    board: "6′10″ twin-fin fish",
    spot: "Any long right point with nobody on it",
    quote:
      "A point break is a classroom that keeps handing you the same question until you get it right.",
    teaches: [
      "go-deeper",
      "baja-point-camp",
      "costa-rica-winter",
      "central-coast-road-trip",
    ],
  },
  {
    id: "owen-marsh",
    name: "Owen Marsh",
    role: "Coach, Find Your Line",
    since: 2010,
    from: "Moved west from the Great Lakes",
    image: img(
      coachOwen,
      480,
      380,
      "Owen grinning on a bright beach, the shore break behind him",
      "50% 30%",
    ),
    short:
      "Learned as an adult at 24, which is exactly why he is so good at getting adults past the whitewater.",
    bio: [
      "Owen took his first lesson at Drift in 2013 after a decade of lake surfing in winter storms. Two years later he was coaching here.",
      "He leads most Find Your Line sessions and the Weekend Reset, and has a theory about paddling technique that he will explain to anyone who stands still long enough.",
    ],
    certs: ["ISA Level 1 Surf Coach", "Surf Lifesaving Instructor"],
    board: "8′0″ mid-length egg",
    spot: "The Jetty on a dropping tide",
    quote:
      "Most people who think they can't surf actually just can't paddle yet. Paddling we can fix by Thursday.",
    teaches: ["find-your-line", "weekend-reset", "central-coast-road-trip"],
  },
  {
    id: "mara-lindqvist",
    name: "Mara Lindqvist",
    role: "Coach and yoga teacher",
    since: 2011,
    from: "Gothenburg, by way of Lisbon",
    image: img(
      coachMara,
      500,
      681,
      "Mara walking up the beach with a blue board balanced on her head",
      "50% 25%",
    ),
    short:
      "Runs Salt & Stretch and the mobility sessions on every camp. Gentle in the water, strict about hip mobility.",
    bio: [
      "Mara surfed cold Swedish storm swell for years before moving south, training as a yoga teacher in Lisbon and coaching at a surf house in Ericeira.",
      "At Drift she leads Salt & Stretch and teaches the evening mobility classes on every camp, built specifically around paddling shoulders and stiff pop-ups.",
    ],
    certs: [
      "ISA Level 1 Surf Coach",
      "200-hour Yoga Teacher",
      "Open-water lifeguard",
    ],
    board: "9′0″ noserider",
    spot: "Gull Point at dawn before the wind",
    quote: "Your pop-up is a hip problem pretending to be a balance problem.",
    teaches: ["first-wave", "salt-and-stretch", "first-wave-week"],
  },
  {
    id: "sofia-banks",
    name: "Sofia Banks",
    role: "Groms Club and youth coach",
    since: 2015,
    from: "Alder Cove local",
    image: img(
      coachSofia,
      550,
      641,
      "Sofia sitting on the rocks in her wetsuit beside her board bag",
      "45% 30%",
    ),
    short:
      "Former Groms Club kid, now runs it. Junior lifeguard trainer and keeper of the snack bag.",
    bio: [
      "Sofia joined Groms Club at nine. At nineteen she came back as a coach, and now runs the Saturday club and the summer day camp.",
      "She trains the junior lifeguard squad on Wednesdays and has a whistle code for everything, which the kids learn faster than the pop-up.",
    ],
    certs: [
      "ISA Level 1 Surf Coach",
      "Junior Lifeguard Trainer",
      "Pediatric First Aid",
    ],
    board: "7′6″ soft-top, honestly",
    spot: "The shallow corner by the rocks",
    quote:
      "If they're laughing they're learning. If they're quiet I want to know why.",
    teaches: ["groms", "groms-day-camp"],
  },
];

/* ------------------------------------------------------------------ camps */

export type CampLevel =
  "Beginner" | "Intermediate" | "Advanced" | "All levels" | "Kids";

export type Camp = {
  id: string;
  name: string;
  place: string;
  region: string;
  level: CampLevel;
  levelNote: string;
  nights: number;
  length: string;
  price: number;
  groupSize: number;
  summary: string;
  intro: string;
  highlights: string[];
  days: { title: string; text: string }[];
  included: string[];
  excluded: string[];
  stay: { name: string; text: string };
  departures: { date: string; spots: number }[];
  coaches: string[];
  image: Img;
  gallery: Img[];
};

export const camps: Camp[] = [
  {
    id: "first-wave-week",
    name: "First Wave Week",
    place: "Gull Point, Alder Cove",
    region: "Alder Cove",
    level: "Beginner",
    levelNote: "Never surfed or only a lesson or two",
    nights: 6,
    length: "7 days, 6 nights",
    price: 1290,
    groupSize: 10,
    summary:
      "Ten lessons in six days at our home beach, a room at the Shoreline House and a coach who knows your name by Monday lunch.",
    intro:
      "The fastest way to learn is to surf twice a day and sleep near the water. First Wave Week builds from the sand to green waves in steps, with sessions timed to the tide every morning and afternoon.",
    highlights: [
      "Two lessons a day, timed to the tide",
      "Filmed session and review on day five",
      "Evening mobility with Mara",
      "Breakfast and dinner at the house",
    ],
    days: [
      {
        title: "Arrive and settle",
        text: "Check in from 3 pm, fit your wetsuit at the hut and a short evening session in the whitewater if the tide allows. Welcome dinner.",
      },
      {
        title: "Sand and foam",
        text: "Ocean safety, the pop-up drilled on the sand, then two whitewater sessions. Most of the group stands today.",
      },
      {
        title: "Steering",
        text: "Angling on whitewater, catching waves yourself without a push. Afternoon theory: reading a forecast.",
      },
      {
        title: "Beyond the foam",
        text: "First paddle out to the inside bar on the low tide. Line-up etiquette on the beach first.",
      },
      {
        title: "Film day",
        text: "Morning session filmed from the water, footage reviewed together after lunch. Free afternoon.",
      },
      {
        title: "Green waves",
        text: "Your first unbroken waves at the Jetty if conditions suit, or a long session at Gull Point.",
      },
      {
        title: "Last dawn patrol",
        text: "An early session, breakfast on the deck, check-out by 11 am.",
      },
    ],
    included: [
      "10 coached lessons",
      "6 nights' shared or private room",
      "Breakfast and dinner daily",
      "Board and wetsuit for the week",
      "Filmed session and review",
      "Evening mobility classes",
    ],
    excluded: ["Travel to Alder Cove", "Lunches", "Travel insurance"],
    stay: {
      name: "The Shoreline House",
      text: "A four-bedroom timber house two minutes' walk from the hut, with an outdoor shower, a board rack and a deck facing the bay. Twin rooms shared with one other camper; private rooms +$240.",
    },
    departures: [
      { date: "2026-11-08", spots: 3 },
      { date: "2027-04-11", spots: 8 },
      { date: "2027-05-16", spots: 0 },
      { date: "2027-06-13", spots: 6 },
      { date: "2027-09-12", spots: 10 },
    ],
    coaches: ["ines-calder", "mara-lindqvist"],
    image: images.whitewater,
    gallery: [images.bay, images.hut, images.campLife],
  },
  {
    id: "weekend-reset",
    name: "Weekend Reset",
    place: "Gull Point, Alder Cove",
    region: "Alder Cove",
    level: "All levels",
    levelNote: "Groups split by level each session",
    nights: 2,
    length: "Friday to Sunday, 2 nights",
    price: 540,
    groupSize: 12,
    summary:
      "Friday night to Sunday lunch: four sessions, two slow breakfasts, a bonfire and no phone signal worth mentioning.",
    intro:
      "A weekend for people who need the ocean more than another plan. We split the group by level each session, so friends who surf differently can come together.",
    highlights: [
      "Four coached sessions",
      "Groups split by level",
      "Saturday beach bonfire",
      "Sunday brunch at the hut",
    ],
    days: [
      {
        title: "Friday evening",
        text: "Arrive by 6 pm, fit your gear, a sunset session for anyone keen and dinner at the house.",
      },
      {
        title: "Saturday",
        text: "Dawn session, big breakfast, afternoon session on the incoming tide, bonfire on the beach.",
      },
      {
        title: "Sunday",
        text: "Last session, brunch at the hut and a short video review before you drive home.",
      },
    ],
    included: [
      "4 coached sessions",
      "2 nights at the Shoreline House",
      "Two breakfasts, Friday dinner, Sunday brunch",
      "Board and wetsuit",
    ],
    excluded: ["Saturday dinner (bonfire food at cost)", "Travel"],
    stay: {
      name: "The Shoreline House",
      text: "Shared twin rooms two minutes from the hut, with a deck, outdoor shower and a big kitchen table.",
    },
    departures: [
      { date: "2026-10-30", spots: 2 },
      { date: "2026-11-20", spots: 9 },
      { date: "2027-03-19", spots: 12 },
      { date: "2027-04-23", spots: 7 },
    ],
    coaches: ["owen-marsh", "ines-calder"],
    image: images.walk,
    gallery: [images.longboard, images.campLife, images.sunset],
  },
  {
    id: "baja-point-camp",
    name: "Baja Point Camp",
    place: "Northern Baja, Mexico",
    region: "Mexico",
    level: "Intermediate",
    levelNote: "Comfortable paddling out and riding green waves",
    nights: 7,
    length: "8 days, 7 nights",
    price: 1680,
    groupSize: 8,
    summary:
      "A week on a long, forgiving right-hand point with Tomás, a camera in the water every day and tacos you will think about for months.",
    intro:
      "Points are the best classroom there is: the wave breaks in the same place, the same way, over and over. We stay at a family-run camp right on the point and surf it every tide that works.",
    highlights: [
      "Surf a long right point twice a day",
      "Daily filming and evening review",
      "Max 8 surfers, 2 coaches",
      "Pick-up from San Diego",
    ],
    days: [
      {
        title: "Border run",
        text: "Morning pick-up in San Diego, four hours south, afternoon check-in and a first look at the point.",
      },
      {
        title: "Learning the point",
        text: "Where to sit, how the sets swing, where the channel is. Two sessions, both filmed.",
      },
      {
        title: "Speed and trim",
        text: "Using the length of the wave: high line, trim, reading sections ahead.",
      },
      {
        title: "Bottom turns",
        text: "Footage from day two side by side with today. A slow afternoon if the wind comes up.",
      },
      {
        title: "Explore",
        text: "A day trip to a second break up the coast if the swell is right, or a rest day in the hammocks.",
      },
      {
        title: "Top turns",
        text: "Two sessions working on the top of the wave, coached from the channel.",
      },
      {
        title: "Free surf",
        text: "Surf as much as you like with coaches in the water, final review and camp dinner.",
      },
      {
        title: "Home",
        text: "Sunrise session for the keen, then the drive back to San Diego by mid-afternoon.",
      },
    ],
    included: [
      "Transport from and to San Diego",
      "7 nights at the point camp",
      "All meals",
      "Daily filmed coaching and reviews",
      "Board choice from our quiver",
    ],
    excluded: [
      "Flights to San Diego",
      "Passport and travel insurance",
      "Drinks",
    ],
    stay: {
      name: "Campo La Punta",
      text: "Simple cabins with two beds, a shared palapa kitchen and the point thirty steps from your door. Hot showers, patchy Wi-Fi, excellent hammocks.",
    },
    departures: [
      { date: "2027-03-06", spots: 4 },
      { date: "2027-04-03", spots: 8 },
      { date: "2027-10-02", spots: 8 },
    ],
    coaches: ["tomas-reyes"],
    image: images.lineup,
    gallery: [images.point, images.turn, images.sunset],
  },
  {
    id: "salt-and-stretch",
    name: "Salt & Stretch",
    place: "Gull Point, Alder Cove",
    region: "Alder Cove",
    level: "All levels",
    levelNote: "Women's week, first-timers very welcome",
    nights: 5,
    length: "6 days, 5 nights",
    price: 1180,
    groupSize: 10,
    summary:
      "A women's week of morning surf lessons and sunset yoga, coached by Inês and Mara, with long lunches in between.",
    intro:
      "Salt & Stretch pairs a surf lesson every morning with yoga every evening, and leaves the middle of the day for sleeping, reading or a second session if you want one.",
    highlights: [
      "Daily surf lesson at your level",
      "Sunset yoga on the deck",
      "Women-only group and coaches",
      "Massage session included",
    ],
    days: [
      {
        title: "Arrive",
        text: "Check in from 2 pm, gear fitting and a gentle opening yoga class.",
      },
      {
        title: "Days two to five",
        text: "Surf lesson after breakfast, free afternoon, yoga as the sun drops. One afternoon is a 60-minute massage at the house.",
      },
      {
        title: "Last morning",
        text: "Final session, brunch and goodbyes by noon.",
      },
    ],
    included: [
      "5 surf lessons",
      "5 yoga and mobility classes",
      "60-minute massage",
      "5 nights at the Shoreline House",
      "Breakfast, lunch and dinner",
    ],
    excluded: ["Travel", "Extra massages"],
    stay: {
      name: "The Shoreline House",
      text: "The whole house is reserved for the group. Twin rooms; private rooms +$200 if available.",
    },
    departures: [
      { date: "2027-05-02", spots: 5 },
      { date: "2027-08-22", spots: 10 },
    ],
    coaches: ["mara-lindqvist", "ines-calder"],
    image: images.yoga,
    gallery: [images.longboard, images.whitewater, images.hut],
  },
  {
    id: "groms-day-camp",
    name: "Groms Summer Day Camp",
    place: "Gull Point, Alder Cove",
    region: "Alder Cove",
    level: "Kids",
    levelNote: "Ages 8 to 14, must be able to swim 50 m",
    nights: 0,
    length: "5 days, 9 am to 3 pm",
    price: 420,
    groupSize: 16,
    summary:
      "Monday to Friday at the beach: surfing, junior lifeguard skills, rock-pool walks and a Friday mini contest for the parents.",
    intro:
      "Our day camp is run by Sofia and coaches who grew up in Groms Club. Four kids per coach in the water, lunch on the deck, and everyone home tired by 3:15.",
    highlights: [
      "4 kids per coach in the water",
      "Junior lifeguard skills",
      "Friday mini contest",
      "Lunch and snacks provided",
    ],
    days: [
      {
        title: "Monday",
        text: "Ocean safety, flags and rips, first waves in the shallow corner.",
      },
      {
        title: "Tuesday",
        text: "Paddling games, standing up, rock-pool walk at low tide.",
      },
      {
        title: "Wednesday",
        text: "Rescue skills with the junior lifeguard squad, longer surf session.",
      },
      {
        title: "Thursday",
        text: "Steering and angling, beach clean-up and a talk on tides.",
      },
      {
        title: "Friday",
        text: "Mini contest with certificates for everyone, parents welcome from 1 pm.",
      },
    ],
    included: [
      "5 days of coaching",
      "Board, wetsuit and rash vest",
      "Lunch and two snacks daily",
      "Camp T-shirt and certificate",
    ],
    excluded: ["Transport to the beach"],
    stay: {
      name: "No overnight stay",
      text: "Drop-off at the hut from 8:45 am, pick-up by 3:15 pm. Early drop-off from 8 am on request.",
    },
    departures: [
      { date: "2027-06-21", spots: 6 },
      { date: "2027-07-05", spots: 0 },
      { date: "2027-07-19", spots: 11 },
      { date: "2027-08-02", spots: 16 },
    ],
    coaches: ["sofia-banks"],
    image: images.groms,
    gallery: [images.bay, images.whitewater, images.hut],
  },
  {
    id: "central-coast-road-trip",
    name: "Central Coast Road Trip",
    place: "Alder Cove to Big Sur",
    region: "California",
    level: "Intermediate",
    levelNote: "Paddling out and riding green waves on your own",
    nights: 5,
    length: "6 days, 5 nights",
    price: 1240,
    groupSize: 6,
    summary:
      "Six surfers, two vans and whichever breaks the forecast picks each morning between Alder Cove and Big Sur.",
    intro:
      "No fixed itinerary: Owen and Tomás read the charts each evening and pick the next day's break. You learn to do the same, which is half the point.",
    highlights: [
      "A new break most days",
      "Forecast-reading workshop",
      "Camping and one night in a cabin",
      "Max 6 surfers",
    ],
    days: [
      {
        title: "Load the vans",
        text: "Meet at the hut at 8 am, boards on the roof, first session wherever the morning looks best.",
      },
      {
        title: "Reading charts",
        text: "Evening workshop on swell direction, period and wind. You choose day three's break.",
      },
      {
        title: "Your call",
        text: "Surf the break the group picked, and find out whether you were right.",
      },
      {
        title: "The long drive",
        text: "Two sessions on the way north, campfire dinner at the cabin.",
      },
      {
        title: "Big Sur",
        text: "A cold, beautiful reef break and a hot spring in the afternoon.",
      },
      {
        title: "Home",
        text: "One last session on the drive back, at the hut by 6 pm.",
      },
    ],
    included: [
      "Van transport for six days",
      "Camping gear and one cabin night",
      "All meals",
      "Coaching and filming",
      "Board choice from our quiver",
    ],
    excluded: ["Sleeping bag (hire $15)", "Park entry fees"],
    stay: {
      name: "Campgrounds and a cabin",
      text: "Three nights in two-person tents at coastal campgrounds, one in a cabin with a wood stove, one back at Alder Cove.",
    },
    departures: [
      { date: "2026-11-15", spots: 1 },
      { date: "2027-05-09", spots: 6 },
      { date: "2027-09-19", spots: 6 },
    ],
    coaches: ["owen-marsh", "tomas-reyes"],
    image: images.van,
    gallery: [images.point, images.lineup, images.fins],
  },
  {
    id: "costa-rica-winter",
    name: "Winter Swell, Costa Rica",
    place: "Guanacaste, Costa Rica",
    region: "Costa Rica",
    level: "Beginner",
    levelNote: "Beginners to early intermediates",
    nights: 8,
    length: "9 days, 8 nights",
    price: 1990,
    groupSize: 10,
    summary:
      "Board shorts in January: warm water, consistent beach breaks and eight nights in a jungle lodge five minutes from the sand.",
    intro:
      "When Gull Point is cold and grey, we take a group to Guanacaste. Warm water means long sessions, and long sessions mean fast progress.",
    highlights: [
      "Water at 82 °F",
      "Two sessions a day",
      "Jungle lodge with pool",
      "Optional river and zip-line day",
    ],
    days: [
      {
        title: "Arrive in Liberia",
        text: "Airport pick-up, 90 minutes to the lodge, welcome dinner.",
      },
      {
        title: "Days two to four",
        text: "Morning and afternoon lessons at the beach break, siesta in between.",
      },
      {
        title: "Day off",
        text: "River trip, zip lines or a hammock. Your call.",
      },
      {
        title: "Days six to eight",
        text: "Filmed sessions, a trip to a second beach and a final free-surf afternoon.",
      },
      {
        title: "Fly home",
        text: "Sunrise session and the transfer back to Liberia.",
      },
    ],
    included: [
      "12 coached sessions",
      "8 nights at the lodge",
      "Breakfast and dinner",
      "Airport transfers",
      "Boards and rash vests",
    ],
    excluded: ["Flights to Liberia", "Lunches", "Day-off activities"],
    stay: {
      name: "Casa Almendro",
      text: "A small lodge in the trees with eight rooms, a pool and a cook who makes the best gallo pinto on the coast.",
    },
    departures: [
      { date: "2027-01-16", spots: 4 },
      { date: "2027-02-13", spots: 10 },
    ],
    coaches: ["tomas-reyes", "ines-calder"],
    image: images.sunset,
    gallery: [images.barrel, images.longboard, images.campLife],
  },
];

/* ------------------------------------------------------------------ forecast spots */

export type Spot = {
  id: string;
  name: string;
  kind: string;
  bestFor: LevelId;
  size: number;
  bestTide: string;
  text: string;
};

export const spots: Spot[] = [
  {
    id: "gull-point",
    name: "Gull Point",
    kind: "Sandy beach break, faces west",
    bestFor: "first-wave",
    size: 0.8,
    bestTide: "Mid to high",
    text: "Our home beach. A wide, shallow bay with lifeguards from May to September and gentle whitewater on the inside. Where every First Wave lesson happens.",
  },
  {
    id: "the-jetty",
    name: "The Jetty",
    kind: "Sandbar peaks beside the harbour wall",
    bestFor: "find-your-line",
    size: 1,
    bestTide: "Low, pushing",
    text: "The sandbar by the harbour wall makes short lefts and rights that are easy to paddle into. The wall blocks the north wind, so it stays clean when Gull Point is messy.",
  },
  {
    id: "alder-reef",
    name: "Alder Reef",
    kind: "Flat rock reef, right-hander",
    bestFor: "go-deeper",
    size: 1.35,
    bestTide: "Mid, falling",
    text: "A long right over flat rock at the south end of the cove. It needs more swell to wake up and rewards good positioning. Go Deeper sessions only.",
  },
];

/* ------------------------------------------------------------------ pages */

export const home = {
  title: "Learn to surf where the waves are kind.",
  lede: "Drift is a surf school on Gull Point Beach. Small groups, patient coaches, and lessons timed to the tide each morning so you paddle out when the water is at its friendliest.",
  method: {
    heading: "Sand, foam, then green water",
    text: "Every surfer goes through the same three stages. We never rush the order, and we never hold you back once you are ready.",
    steps: [
      {
        title: "On the sand",
        text: "Board handling, the pop-up drilled until it is boring, and how to spot a rip from the beach.",
      },
      {
        title: "In the foam",
        text: "Waist-deep whitewater with a coach beside you. You stand, steer, fall, and stand again.",
      },
      {
        title: "Out the back",
        text: "Paddling past the break, sitting in the line-up and riding unbroken waves along the face.",
      },
    ],
  },
  quote: {
    text: "I'd tried twice on holiday and spent both lessons being pushed into waves by someone shouting. Owen spent twenty minutes on my paddling and by Thursday I was catching my own.",
    who: "Priya N., First Wave Week, May",
  },
  day: [
    {
      time: "06:30",
      text: "Dawn check from the deck. Coaches read the swell, wind and tide and set the day's times.",
    },
    { time: "07:30", text: "First session, while the wind is still offshore." },
    {
      time: "10:00",
      text: "Breakfast on the deck: eggs, fruit, too much coffee.",
    },
    { time: "13:00", text: "Theory on the sand, or a nap. Both count." },
    { time: "15:30", text: "Second session on the incoming tide." },
    {
      time: "18:00",
      text: "Mobility class, hot showers, footage on the big screen.",
    },
    { time: "19:30", text: "Dinner at the long table. Bed early, by choice." },
  ],
  close: {
    title: "Your first wave is one booking away.",
    text: "Pick a lesson and a morning. We text you the evening before with the final time, once we've seen the forecast.",
  },
};

export const about = {
  title: "A surf school that waits for the right tide.",
  lede: "Drift started in 2012 with four foam boards, a gazebo and Inês Calder's conviction that most bad first lessons happen at the wrong time of day.",
  story: [
    "Most surf schools run lessons on the hour, every hour, whatever the ocean is doing. Gull Point is a different beach at low tide than at high, and a different beach again once the afternoon wind comes up. Inês knew that teaching into the wrong conditions was the reason so many people gave up after one go.",
    "So Drift has never had a fixed timetable. Every evening a coach reads the forecast, every morning we check it from the deck, and lesson times move to wherever the water is kindest. You get a text the night before. It is more work for us and it is the whole idea.",
    "We now have five coaches, a stone hut on the beach, a house up the road for camp weeks, and trips south to Baja and Costa Rica when the home break goes quiet. We still teach every First Wave at Gull Point.",
  ],
  safety: [
    {
      title: "Small groups, always",
      text: "Never more than six surfers per coach, four for Go Deeper and Groms. Every coach is in the water, not on the beach with a whistle.",
    },
    {
      title: "Qualified, every one",
      text: "All coaches hold an ISA coaching certificate and a current surf lifesaving or open-water lifeguard qualification, renewed each spring.",
    },
    {
      title: "We cancel when it's wrong",
      text: "If the surf is unsafe or the wind ruins it, we move your lesson or refund it in full. That happens about one morning in ten.",
    },
    {
      title: "Kit that fits",
      text: "4/3 mm wetsuits with boots in cool months, soft-top boards sized to you, and helmets for groms on the reef side.",
    },
  ],
  care: {
    title: "Looking after the bay",
    text: "We run a beach clean every first Sunday, our wetsuits are recycled into yoga mats when they're done, and 1% of every booking goes to the Alder Cove dune restoration group.",
  },
};

export type FaqGroup = { title: string; items: { q: string; a: string }[] };

export const faqs: FaqGroup[] = [
  {
    title: "Lessons",
    items: [
      {
        q: "I've never surfed. Which lesson do I book?",
        a: "First Wave. It starts on the sand and stays in waist-deep whitewater. If you've had a few lessons and can stand up, try Find Your Line.",
      },
      {
        q: "How fit do I need to be?",
        a: "If you can walk up a flight of stairs and swim a length, you can learn. Paddling is the hard part; it gets easier by the third lesson.",
      },
      {
        q: "When do lessons start?",
        a: "Times move with the tide and wind. You choose a preferred time when booking, and we text you the confirmed time by 7 pm the evening before, usually within an hour of what you chose.",
      },
      {
        q: "Can kids join adult lessons?",
        a: "From age 12 with a parent in the same lesson. Younger children have Groms Club on Saturdays and the summer day camp.",
      },
    ],
  },
  {
    title: "Camps",
    items: [
      {
        q: "Can I come alone?",
        a: "Most people do. Rooms are shared with one other camper of the same gender unless you book a private room.",
      },
      {
        q: "What level do I need for Baja or the road trip?",
        a: "You should be able to paddle out through small surf on your own and ride unbroken waves. If you're unsure, book a Find Your Line lesson first and ask your coach.",
      },
      {
        q: "Do you cater for allergies and diets?",
        a: "Yes. Tell us when booking and we'll plan for it. Vegetarian and vegan food is standard at every camp.",
      },
    ],
  },
  {
    title: "Safety",
    items: [
      {
        q: "Do I need to be a strong swimmer?",
        a: "You need to be comfortable in water out of your depth and able to swim 50 metres. We ask you to confirm this when you book.",
      },
      {
        q: "What happens if the surf is too big?",
        a: "We move the lesson to a sheltered spot, change the time, or cancel and refund. A coach makes the call at the dawn check.",
      },
      {
        q: "Are there sharks?",
        a: "Very rarely. We follow the county's beach advisories and will not run lessons when one is in place.",
      },
    ],
  },
  {
    title: "Booking and payment",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Lessons: free cancellation up to 24 hours before. Camps: 30% deposit, refundable until 60 days before departure; after that we'll move you to another date.",
      },
      {
        q: "Do lesson packs expire?",
        a: "Packs are valid for 12 months and can be shared between people in the same household.",
      },
      {
        q: "Do you sell gift cards?",
        a: "Yes, for any lesson or camp, by email or printed at the hut. Ask us at hello@drift.example.",
      },
    ],
  },
];

export const bring = [
  "Swimsuit to wear under the wetsuit",
  "Towel and a warm layer for afterwards",
  "Water bottle (we refill at the hut)",
  "Reef-safe sunscreen",
  "Hair tie, and contact lenses rather than glasses",
];
