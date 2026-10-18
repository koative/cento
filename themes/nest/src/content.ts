import hero from "./assets/hero.jpg";
import toddlerCamera from "./assets/toddler-camera.jpg";
import paint from "./assets/paint.jpg";
import artTable from "./assets/art-table.jpg";
import drawing from "./assets/drawing.jpg";
import circle from "./assets/circle.jpg";
import parachute from "./assets/parachute.jpg";
import nap from "./assets/nap.jpg";
import eating from "./assets/eating.jpg";
import walker from "./assets/walker.jpg";
import rings from "./assets/rings.jpg";
import backpacks from "./assets/backpacks.jpg";
import laughing from "./assets/laughing.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  hero: {
    src: hero,
    alt: "Four children in muddy rain boots standing in a row on a wooden bridge, holding hands",
    w: 1800,
    h: 1200,
  },
  parachute: {
    src: parachute,
    alt: "Children and an educator lifting a rainbow play parachute on a grassy field",
    w: 1200,
    h: 800,
  },
  nap: {
    src: nap,
    alt: "A baby asleep under a soft white blanket",
    w: 1200,
    h: 800,
  },
  eating: {
    src: eating,
    alt: "A baby with blue eyes chewing on a wooden block",
    w: 1200,
    h: 960,
  },
  walker: {
    src: walker,
    alt: "A toddler in a yellow raincoat and small backpack walking across a field",
    w: 800,
    h: 1200,
  },
  rings: {
    src: rings,
    alt: "A wooden stacking-ring toy in bright colors on a white table",
    w: 1200,
    h: 800,
  },
  backpacks: {
    src: backpacks,
    alt: "A line of young children with backpacks and sun hats walking together",
    w: 1200,
    h: 1075,
  },
  laughing: {
    src: laughing,
    alt: "Three small children sitting on a doorstep, laughing together",
    w: 800,
    h: 1200,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Nest",
  sector: "Childcare & nursery",
  tagline: "Big days for small people, on Linden Row.",
  description:
    "An independent nursery, preschool and after-school club for children from 3 months to 8 years: six rooms by age, a garden we use in every weather, and meals cooked here each morning.",
  address: ["14 Linden Row", "Elmbridge Park, OR 97201"],
  phone: "+1 555 0142 880",
  phoneHref: "tel:+15550142880",
  email: "hello@nest.example",
  hours: "Mon–Fri, 7:45 am – 6:00 pm",
  openWeeks: 50,
  founded: 2011,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { to: "/rooms", label: "Rooms" },
  { to: "/day", label: "A day at Nest" },
  { to: "/fees", label: "Fees" },
  { to: "/parents", label: "Parent info" },
  { to: "/team", label: "Team" },
  { to: "/about", label: "About" },
];

/* Rooms ------------------------------------------------------------------ */

/** A bookable block of the day; spans are [start, end] in decimal hours (7.75 = 7:45). */
export type Session = {
  id: string;
  label: string;
  spans: [number, number][];
  price: number;
};

export type Room = {
  id: string;
  name: string;
  ages: string;
  stage: "Infants" | "Toddlers" | "Twos" | "Preschool" | "School age";
  minMonths: number;
  maxMonths: number;
  color: string;
  image: Img;
  summary: string;
  intro: string[];
  ratio: string;
  places: number;
  sessions: Session[];
  /** Weekly pre-K credit hours averaged over the open year, if the room qualifies. */
  creditHours?: number;
  focus: { title: string; text: string }[];
  week: { day: string; text: string }[];
  bring: string[];
  leadId: string;
  dayId: string;
};

const nurseryDay = (
  morning: number,
  afternoon: number,
  full: number,
): Session[] => [
  { id: "morning", label: "Morning", spans: [[7.75, 13]], price: morning },
  { id: "afternoon", label: "Afternoon", spans: [[13, 18]], price: afternoon },
  { id: "full", label: "Full day", spans: [[7.75, 18]], price: full },
];

export const rooms: Room[] = [
  {
    id: "wrens",
    name: "Wrens",
    ages: "3–12 months",
    stage: "Infants",
    minMonths: 3,
    maxMonths: 12,
    color: "#eeb49b",
    image: {
      src: eating,
      alt: "A baby with blue eyes chewing on a wooden block",
      w: 1200,
      h: 960,
    },
    summary:
      "A calm, carpeted room with a sleep nook, where babies keep their own rhythm for feeds and naps.",
    intro: [
      "The Wrens room is the quietest corner of the house: low light, soft rugs, a separate sleep room with nine cots, and a kitchen hatch so bottles are warmed a few steps away.",
      "Nobody here runs to a timetable. We follow the routine you already have at home, and we write every feed, nap and diaper change into Nest Notes so you can see the day as it happens.",
    ],
    ratio: "1 adult : 3 babies",
    places: 9,
    sessions: nurseryDay(58, 54, 96),
    focus: [
      {
        title: "Feeling safe",
        text: "One key person learns your baby's cues before anything else happens.",
      },
      {
        title: "Tummy time & reaching",
        text: "Treasure baskets of wood, metal and fabric to grasp, mouth and compare.",
      },
      {
        title: "First sounds",
        text: "Naming, singing and back-and-forth babble all day long.",
      },
    ],
    week: [
      { day: "Mon", text: "Treasure baskets and mirror play" },
      { day: "Tue", text: "Buggy walk to the duck pond" },
      { day: "Wed", text: "Baby massage and rhyme time" },
      { day: "Thu", text: "Water trays and warm sand" },
      { day: "Fri", text: "Garden blankets, whatever the weather" },
    ],
    bring: [
      "Formula or expressed milk, labeled",
      "Two spare outfits",
      "A comforter from home",
      "Any creams you use",
    ],
    leadId: "priya-shah",
    dayId: "babies",
  },
  {
    id: "robins",
    name: "Robins",
    ages: "12–24 months",
    stage: "Toddlers",
    minMonths: 12,
    maxMonths: 24,
    color: "#e8c766",
    image: {
      src: toddlerCamera,
      alt: "A toddler peering through a purple toy camera in a bright playroom",
      w: 1200,
      h: 828,
    },
    summary:
      "For new walkers: low shelves, ramps and steps to climb, and a garden door that is open most of the day.",
    intro: [
      "Robins are on the move, so the room moves with them: a wooden climbing frame, a ramp to the garden and shelves at toddler height so they choose what to play with.",
      "First words arrive fast at this age. We sing, sign and read constantly, and we keep the groups small so every child gets listened to.",
    ],
    ratio: "1 adult : 4 toddlers",
    places: 12,
    sessions: nurseryDay(54, 50, 92),
    focus: [
      {
        title: "Walking & climbing",
        text: "Steps, slopes and soft blocks indoors; logs and grass outside.",
      },
      {
        title: "Words & signs",
        text: "Simple signing alongside speech so feelings can be shown before they can be said.",
      },
      {
        title: "Feeding themselves",
        text: "Spoons, open cups and plenty of patience at the table.",
      },
    ],
    week: [
      { day: "Mon", text: "Music with shakers and drums" },
      { day: "Tue", text: "Messy tray: oats, pasta, water" },
      { day: "Wed", text: "Garden digging with Ben" },
      { day: "Thu", text: "Library bag swap" },
      { day: "Fri", text: "Puddle walk in boots" },
    ],
    bring: [
      "Rain boots that stay here",
      "Spare clothes and socks",
      "Diapers and wipes",
      "A comforter for nap time",
    ],
    leadId: "tom-lindqvist",
    dayId: "babies",
  },
  {
    id: "finches",
    name: "Finches",
    ages: "2–3 years",
    stage: "Twos",
    minMonths: 24,
    maxMonths: 36,
    color: "#a3c98a",
    image: {
      src: paint,
      alt: "A child's hand adding bright paint to a big, messy painting on a table",
      w: 1200,
      h: 797,
    },
    summary:
      "Big feelings, big mess, big progress: painting, potty learning and the first real friendships.",
    intro: [
      "Twos want to do everything themselves, so the Finches room is set up for that: a child-height sink, a snack table they serve themselves at, and paint out every single day.",
      "This is also the year of potty learning. We go at your child's pace, in step with what you're doing at home, and nobody is ever rushed.",
    ],
    ratio: "1 adult : 5 children",
    places: 15,
    sessions: nurseryDay(52, 48, 88),
    focus: [
      {
        title: "Doing it myself",
        text: "Coats, shoes, pouring water, washing hands: small jobs, big pride.",
      },
      {
        title: "Making friends",
        text: "Turn-taking games and small groups of four with the same grown-up.",
      },
      {
        title: "Potty learning",
        text: "Led by your child's readiness, with daily notes so home and Nest stay in step.",
      },
    ],
    week: [
      { day: "Mon", text: "Painting at the big easel" },
      { day: "Tue", text: "Planting in the raised beds" },
      { day: "Wed", text: "Movement and parachute games" },
      { day: "Thu", text: "Baking with Rosa" },
      { day: "Fri", text: "Forest walk with Ben" },
    ],
    bring: [
      "Spare clothes (three sets while potty learning)",
      "Rain boots and a sun hat",
      "A small family photo for our wall",
    ],
    leadId: "grace-mbeki",
    dayId: "toddlers",
  },
  {
    id: "larks",
    name: "Larks",
    ages: "3–4 years",
    stage: "Preschool",
    minMonths: 36,
    maxMonths: 48,
    color: "#a8cbe6",
    image: {
      src: artTable,
      alt: "Children's hands painting stones on a wooden table scattered with markers and watercolors",
      w: 1200,
      h: 800,
    },
    summary:
      "Long projects that follow the children's questions, a workshop bench, and the garden as a second classroom.",
    intro: [
      "Larks spend weeks on one idea when it grabs them. This term it's birds: building a bird hide in the garden, counting visitors to the feeder and painting what they see.",
      "We keep the room open-ended on purpose: clay, blocks, a real woodwork bench with small tools, and a book corner the children re-arrange themselves.",
    ],
    ratio: "1 adult : 8 children",
    places: 16,
    sessions: nurseryDay(47, 44, 80),
    focus: [
      {
        title: "Long projects",
        text: "One big question a term, chosen with the children.",
      },
      {
        title: "Early mark-making",
        text: "Drawing, painting and the first letters of their own name.",
      },
      {
        title: "Playing together",
        text: "Making up rules, solving squabbles, sharing the best spade.",
      },
    ],
    week: [
      { day: "Mon", text: "Project morning: the bird hide" },
      { day: "Tue", text: "Woodwork bench" },
      { day: "Wed", text: "Clay and natural art" },
      { day: "Thu", text: "Music with a visiting violinist" },
      { day: "Fri", text: "Forest Friday at Elmbridge Woods" },
    ],
    bring: [
      "Waterproof trousers for Forest Friday",
      "A named water bottle",
      "Spare clothes",
    ],
    leadId: "elena-rossi",
    dayId: "preschool",
  },
  {
    id: "owls",
    name: "Owls",
    ages: "4–5 years · Pre-K",
    stage: "Preschool",
    minMonths: 48,
    maxMonths: 60,
    color: "#c1aedf",
    image: {
      src: drawing,
      alt: "Preschool children drawing and writing around a shared table",
      w: 1200,
      h: 798,
    },
    summary:
      "Our pre-K year: playful phonics and numbers, more independence, and visits to the schools our Owls move on to.",
    intro: [
      "Owls are getting ready for school without being made to sit still all day. Phonics and number games are short and playful; the rest of the morning is still projects, building and garden time.",
      "In the summer term we visit Elmbridge Elementary and St Anne's together, practice packing a lunch bag, and send a written handover to every child's new teacher.",
    ],
    ratio: "1 adult : 8 children",
    places: 16,
    sessions: nurseryDay(47, 44, 80),
    creditHours: 10.8,
    focus: [
      {
        title: "Sounds & letters",
        text: "Ten-minute phonics games, every day, in groups of four.",
      },
      {
        title: "Counting in real life",
        text: "Snack shopping lists, measuring the sunflowers, sharing out the grapes.",
      },
      {
        title: "School readiness",
        text: "Lunch boxes, changing for PE, putting a hand up, asking for help.",
      },
    ],
    week: [
      { day: "Mon", text: "Phonics games and story writing" },
      { day: "Tue", text: "Number trail in the garden" },
      { day: "Wed", text: "Cooking: the class snack shop" },
      { day: "Thu", text: "PE in the church hall" },
      { day: "Fri", text: "Forest Friday at Elmbridge Woods" },
    ],
    bring: [
      "A book bag (we send one home each week)",
      "PE shoes on Thursdays",
      "Waterproofs for Fridays",
    ],
    leadId: "sam-whitaker",
    dayId: "preschool",
  },
  {
    id: "swifts",
    name: "Swifts",
    ages: "5–8 years · Before & after school",
    stage: "School age",
    minMonths: 60,
    maxMonths: 96,
    color: "#f2bf6e",
    image: {
      src: circle,
      alt: "School-age children sitting on a classroom rug, arms raised, listening to a teacher reading",
      w: 1200,
      h: 998,
    },
    summary:
      "Breakfast club, a walking bus to and from two local schools, and a proper snack before homework or the garden.",
    intro: [
      "Swifts is for Nest graduates and their friends: we walk to Elmbridge Elementary and St Anne's each morning and collect from both at 3:15 pm.",
      "After school there's a hot snack, a quiet homework nook for those who want it, and a different club each day for those who don't. Holiday club runs every school break.",
    ],
    ratio: "1 adult : 10 children",
    places: 20,
    sessions: [
      {
        id: "breakfast",
        label: "Breakfast club",
        spans: [[7.5, 8.75]],
        price: 11,
      },
      { id: "after", label: "After school", spans: [[15.25, 18]], price: 24 },
      {
        id: "both",
        label: "Both",
        spans: [
          [7.5, 8.75],
          [15.25, 18],
        ],
        price: 32,
      },
    ],
    focus: [
      {
        title: "Unwinding",
        text: "Food first, then a choice: rest, read, run around.",
      },
      {
        title: "Homework help",
        text: "A quiet table with a grown-up nearby, never compulsory.",
      },
      {
        title: "Clubs",
        text: "Cooking, soccer, art, building and Friday film night.",
      },
    ],
    week: [
      { day: "Mon", text: "Cooking club with Rosa" },
      { day: "Tue", text: "Soccer on the green" },
      { day: "Wed", text: "Art: printmaking and collage" },
      { day: "Thu", text: "Construction challenge" },
      { day: "Fri", text: "Film night and popcorn" },
    ],
    bring: [
      "A labeled water bottle",
      "Clothes for the garden",
      "Reading book if homework is due",
    ],
    leadId: "jo-park",
    dayId: "swifts",
  },
];

export const pricing = {
  siblingDiscount: 0.1,
  hourlyCreditRate: 7.8,
  holidayDay: 62,
  registration: 75,
  deposit: "two weeks of fees, returned in your final invoice",
  notes: [
    {
      title: "What's included",
      text: "Meals, snacks, diapers, wipes and sunscreen are included in every session.",
    },
    {
      title: "How we bill",
      text: "Monthly in advance: your weekly total × 50 open weeks ÷ 12, invoiced through Nest Notes.",
    },
    {
      title: "Changing days",
      text: "We need one month's notice to change days or leave. Extra sessions can be booked a day ahead if there's space.",
    },
  ],
};

/* A day at Nest ------------------------------------------------------------ */

export type Moment = {
  time: string;
  title: string;
  text: string;
  diary?: string;
};
export type DayPlan = {
  id: string;
  label: string;
  rooms: string;
  image: Img;
  moments: Moment[];
};

export const days: DayPlan[] = [
  {
    id: "babies",
    label: "Babies",
    rooms: "Wrens & Robins",
    image: images.nap,
    moments: [
      {
        time: "07:45",
        title: "Doors open, slow hellos",
        text: "A handover with your key person: how they slept, when they last fed, anything new.",
        diary: "Arrival note",
      },
      {
        time: "08:30",
        title: "Floor play & treasure baskets",
        text: "Wood, metal and fabric to grasp, mouth and compare; mirrors for the very little.",
      },
      {
        time: "09:30",
        title: "Morning nap, on their own clock",
        text: "Cots in the quiet room, checked every ten minutes and logged.",
        diary: "Sleep start and end",
      },
      {
        time: "10:30",
        title: "Garden or buggy walk",
        text: "Blankets on the grass or a loop past the duck pond.",
      },
      {
        time: "11:30",
        title: "Lunch from Rosa's kitchen",
        text: "Purées for new eaters, soft finger food for the rest, all cooked here this morning.",
        diary: "What and how much they ate",
      },
      {
        time: "12:30",
        title: "Long sleep",
        text: "Lights down, white noise on, comforters from home.",
      },
      {
        time: "14:30",
        title: "Songs & messy play",
        text: "Warm water trays, cornflour, rhymes with actions.",
      },
      {
        time: "15:30",
        title: "Tea",
        text: "A light meal: toast fingers, fruit, yogurt.",
        diary: "Tea",
      },
      {
        time: "16:15",
        title: "Stories & cuddles",
        text: "Board books in the reading nook while the room winds down.",
      },
      {
        time: "17:00",
        title: "Pickup & handover",
        text: "Your key person talks you through the day. Every feed, nap and diaper is already in Nest Notes.",
        diary: "Daily summary",
      },
    ],
  },
  {
    id: "toddlers",
    label: "Twos",
    rooms: "Finches",
    image: images.walker,
    moments: [
      {
        time: "07:45",
        title: "Breakfast for early birds",
        text: "Porridge, toast and fruit at the little tables.",
      },
      {
        time: "09:00",
        title: "Morning circle",
        text: "Hello song, who's here today, and a look at the weather out of the window.",
      },
      {
        time: "09:30",
        title: "Free flow, inside and out",
        text: "The garden door opens and children choose: painting, sand, bikes, the mud kitchen.",
      },
      {
        time: "10:30",
        title: "Snack table",
        text: "Children pour their own water and serve their own fruit.",
        diary: "Snack",
      },
      {
        time: "11:00",
        title: "Small-group time",
        text: "Four children, one grown-up: planting, baking, or a story with props.",
      },
      {
        time: "11:45",
        title: "Lunch together",
        text: "Everyone at the table, grown-ups too.",
        diary: "Lunch",
      },
      {
        time: "12:30",
        title: "Nap or quiet time",
        text: "Mats for sleepers, quiet books for those who've stopped napping.",
        diary: "Sleep",
      },
      {
        time: "14:30",
        title: "Garden again",
        text: "Water play in summer, leaf piles in autumn, boots in all seasons.",
      },
      {
        time: "15:30",
        title: "Tea",
        text: "A warm, light meal before the long afternoon stretch.",
        diary: "Tea",
      },
      {
        time: "16:00",
        title: "Music & stories",
        text: "Shakers, drums, and the same favorite book for the fifth time.",
      },
      {
        time: "17:00",
        title: "Pickup",
        text: "A quick chat and a photo or two in Nest Notes.",
        diary: "Daily summary",
      },
    ],
  },
  {
    id: "preschool",
    label: "Preschool",
    rooms: "Larks & Owls",
    image: images.parachute,
    moments: [
      {
        time: "07:45",
        title: "Arrive and settle",
        text: "Breakfast, a puzzle, a chat with friends while everyone arrives.",
      },
      {
        time: "08:45",
        title: "Morning meeting",
        text: "The children plan the day on the big board: who's at the woodwork bench, who's watering.",
      },
      {
        time: "09:15",
        title: "Project time",
        text: "This term: building a bird hide and counting visitors to the feeder.",
      },
      {
        time: "10:30",
        title: "Outdoors",
        text: "The garden every day; Elmbridge Woods every Friday.",
      },
      {
        time: "11:45",
        title: "Family-style lunch",
        text: "Children serve themselves from shared bowls and clear their plates.",
        diary: "Lunch",
      },
      {
        time: "12:30",
        title: "Rest & audiobooks",
        text: "Twenty quiet minutes on cushions; sleepers can sleep longer.",
      },
      {
        time: "13:15",
        title: "Sounds & numbers",
        text: "Ten-minute phonics and counting games in groups of four.",
      },
      {
        time: "14:00",
        title: "Afternoon workshops",
        text: "Clay, music, cooking or the woodwork bench, rotating through the week.",
      },
      {
        time: "15:30",
        title: "Tea",
        text: "Something warm, often baked by the children themselves.",
        diary: "Tea",
      },
      {
        time: "16:15",
        title: "Garden games",
        text: "Parachute, hide and seek, the bikes.",
      },
      {
        time: "17:00",
        title: "Pickup",
        text: "Today's project photos are already in Nest Notes.",
        diary: "Daily summary",
      },
    ],
  },
  {
    id: "swifts",
    label: "After school",
    rooms: "Swifts",
    image: images.backpacks,
    moments: [
      {
        time: "07:30",
        title: "Breakfast club",
        text: "Cereal, toast, fruit, and a calm start.",
      },
      {
        time: "08:30",
        title: "Walking bus to school",
        text: "High-vis vests on, two adults, to Elmbridge Elementary and St Anne's.",
      },
      {
        time: "15:15",
        title: "School pickup",
        text: "We collect from both school gates and walk back together.",
      },
      {
        time: "15:40",
        title: "Hot snack",
        text: "Pasta, soup or toasties, cooked by Rosa.",
      },
      {
        time: "16:00",
        title: "Homework nook or garden",
        text: "A quiet table with a grown-up nearby, or straight out to run around.",
      },
      {
        time: "16:45",
        title: "Club of the day",
        text: "Cooking, soccer, art, construction or Friday film night.",
      },
      {
        time: "17:30",
        title: "Pickup",
        text: "Collect from the side gate until 6:00 pm.",
      },
    ],
  },
];

/* Team -------------------------------------------------------------------- */

export type PegSymbol =
  | "sun"
  | "leaf"
  | "moon"
  | "snail"
  | "flower"
  | "star"
  | "feather"
  | "fish"
  | "apple"
  | "tree";

export type Person = {
  id: string;
  name: string;
  role: string;
  roomId?: string;
  leadership?: boolean;
  since: number;
  qualification: string;
  symbol: PegSymbol;
  color: string;
  bio: string;
  askMe: string;
};

export const team: Person[] = [
  {
    id: "maya-okafor",
    leadership: true,
    name: "Maya Okafor",
    role: "Founder & manager",
    since: 2011,
    qualification: "MA Early Childhood Education",
    symbol: "sun",
    color: "#9fd3c7",
    bio: "Maya opened Nest in the old Linden Row bakery after ten years teaching kindergarten. She still does Monday breakfast club and every first tour of the week.",
    askMe: "How settling in really works",
  },
  {
    id: "daniel-reyes",
    leadership: true,
    name: "Daniel Reyes",
    role: "Deputy manager & inclusion lead",
    since: 2014,
    qualification:
      "BA Child Development, special educational needs certificate",
    symbol: "leaf",
    color: "#f3a9b6",
    bio: "Daniel makes sure every child can join in fully, working with families, speech therapists and local services when a child needs a little more.",
    askMe: "Support plans and additional needs",
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    role: "Wrens room lead",
    roomId: "wrens",
    since: 2016,
    qualification: "Infant & toddler care credential, pediatric first aid",
    symbol: "moon",
    color: "#eeb49b",
    bio: "Priya knows every baby's nap signs by the end of their first week, and keeps the Wrens room the calmest place in the building.",
    askMe: "Bottles, naps and first separations",
  },
  {
    id: "tom-lindqvist",
    name: "Tom Lindqvist",
    role: "Robins room lead",
    roomId: "robins",
    since: 2019,
    qualification: "Early childhood associate degree, baby signing instructor",
    symbol: "snail",
    color: "#e8c766",
    bio: "Tom teaches the Robins their first signs and plays guitar at hello time. Ask any one-year-old here about 'the boat song'.",
    askMe: "Signing with toddlers",
  },
  {
    id: "grace-mbeki",
    name: "Grace Mbeki",
    role: "Finches room lead",
    roomId: "finches",
    since: 2017,
    qualification: "BA Early Years, Montessori diploma",
    symbol: "flower",
    color: "#a3c98a",
    bio: "Grace runs the messiest room in the house on purpose. She's guided more than a hundred twos through potty learning without a sticker chart.",
    askMe: "Potty learning at their pace",
  },
  {
    id: "elena-rossi",
    name: "Elena Rossi",
    role: "Larks room lead",
    roomId: "larks",
    since: 2018,
    qualification: "Reggio Emilia study program, BA Fine Art",
    symbol: "star",
    color: "#a8cbe6",
    bio: "Elena trained as a painter before she trained as a teacher, and the Larks' long projects are her doing. This term: the bird hide.",
    askMe: "Following children's questions",
  },
  {
    id: "sam-whitaker",
    name: "Sam Whitaker",
    role: "Owls room lead & pre-K teacher",
    roomId: "owls",
    since: 2015,
    qualification: "State teaching license (Pre-K–3)",
    symbol: "feather",
    color: "#c1aedf",
    bio: "Sam keeps phonics short and funny and writes every Owl's school handover letter himself, all sixteen of them.",
    askMe: "What 'school ready' actually means",
  },
  {
    id: "jo-park",
    name: "Jo Park",
    role: "Swifts club lead",
    roomId: "swifts",
    since: 2020,
    qualification: "School-age care certificate, youth soccer coach",
    symbol: "fish",
    color: "#f2bf6e",
    bio: "Jo leads the walking bus in every weather and referees Tuesday soccer with suspicious fairness.",
    askMe: "Holiday club weeks",
  },
  {
    id: "ben-carter",
    name: "Ben Carter",
    role: "Outdoor & forest lead",
    since: 2016,
    qualification: "Forest school leader, outdoor first aid",
    symbol: "tree",
    color: "#8fbf86",
    bio: "Ben looks after the garden, the raised beds and Forest Fridays, and has strong opinions about which puddles are best.",
    askMe: "Kitting out for outdoor days",
  },
  {
    id: "rosa-alvarez",
    name: "Rosa Alvarez",
    role: "Cook",
    since: 2012,
    qualification: "Culinary diploma, allergen management certificate",
    symbol: "apple",
    color: "#f0a68a",
    bio: "Rosa cooks breakfast, lunch and tea from scratch every day and keeps a recipe card for every child's favorite.",
    askMe: "Allergies and fussy eaters",
  },
];

/* Food -------------------------------------------------------------------- */

export const menu = {
  week: "Week 2 of our autumn menu",
  meals: ["Breakfast", "Lunch", "Tea"] as const,
  days: [
    {
      day: "Monday",
      items: [
        "Oat porridge, pear",
        "Chicken & sweet potato stew, brown rice",
        "Cheese scones, cucumber sticks",
      ],
    },
    {
      day: "Tuesday",
      items: [
        "Wholegrain toast, banana",
        "Red lentil dal, flatbread, yogurt",
        "Pea & mint soup, bread fingers",
      ],
    },
    {
      day: "Wednesday",
      items: [
        "Yogurt, berries, granola",
        "Fish pie with leeks, green beans",
        "Pasta salad, cherry tomatoes",
      ],
    },
    {
      day: "Thursday",
      items: [
        "Scrambled egg, toast",
        "Bean chili, rice, avocado",
        "Homemade pizza fingers, apple",
      ],
    },
    {
      day: "Friday",
      items: [
        "Overnight oats, apple",
        "Roast vegetable lasagne, salad",
        "Crumpets, cream cheese, grapes",
      ],
    },
  ],
  note: "Every dish has a vegetarian version; allergy and cultural diets are cooked separately, not adapted at the table.",
};

/* Parent info ------------------------------------------------------------- */

export const settling = [
  {
    title: "Home visit",
    text: "Your key person comes to you for an hour, meets your child on home ground, and learns the routines that matter.",
  },
  {
    title: "Two stay-and-play sessions",
    text: "You and your child spend an hour in the room together. You stay; they explore.",
  },
  {
    title: "A short morning on their own",
    text: "You leave for an hour, staying close by. We call you if they need you.",
  },
  {
    title: "First full session",
    text: "A morning or afternoon on their own, with photos sent to Nest Notes as it goes.",
  },
  {
    title: "Six-week check-in",
    text: "A sit-down chat with the key person about how it's going, for you as well as them.",
  },
];

export const packList = [
  "Two full changes of clothes, labeled",
  "Rain boots and a waterproof jacket (they live here)",
  "A sun hat from April to September",
  "A comforter or toy for nap time",
  "Formula or expressed milk for babies",
  "Any medicine with a signed form",
];

export const policies = [
  {
    title: "Sickness",
    text: "Children with a temperature over 100.4°F, or after sickness or diarrhea, stay home for 48 hours. We call you if your child becomes unwell here.",
  },
  {
    title: "Medicines",
    text: "We give prescribed medicine with a signed form and the original pharmacy label, and record every dose in Nest Notes.",
  },
  {
    title: "Allergies",
    text: "Rosa cooks allergy meals separately with their own colored plates. Nest is nut-free throughout.",
  },
  {
    title: "Pickup",
    text: "Only adults on your pickup list, with a password for anyone new. Late pickup after 6:05 pm is charged at $1 a minute.",
  },
  {
    title: "Safeguarding",
    text: "Every adult is background-checked, trained each year, and never alone with a child out of sight of a colleague.",
  },
  {
    title: "Weather",
    text: "We go out in every weather that's safe. On days over 86°F we stay in the shade and move outdoor play to the morning.",
  },
];

export const closures = [
  { when: "Thu 26 – Fri 27 Nov 2026", what: "Thanksgiving" },
  { when: "Thu 24 Dec 2026 – Fri 1 Jan 2027", what: "Winter closure" },
  { when: "Fri 12 Feb 2027", what: "Staff training day" },
  { when: "Mon 31 May 2027", what: "Memorial Day" },
  { when: "Mon 5 Jul 2027", what: "Independence Day (observed)" },
  { when: "Fri 27 Aug 2027", what: "Staff training day" },
];

export const faqs = [
  {
    q: "How long is the waiting list?",
    a: "It depends on the room and days. Wrens places usually go six to nine months ahead; Larks and Owls often have mid-year spaces. Book a tour and we'll tell you honestly what's free.",
  },
  {
    q: "Can we choose a mix of mornings and full days?",
    a: "Yes. Every day can be a morning, an afternoon or a full day, and the pattern can be different each day of the week. Use the fees calculator to see what a pattern costs.",
  },
  {
    q: "What happens if my child is off sick?",
    a: "Fees are still due for booked sessions, because staffing is planned around them. If your child is away for more than two weeks for medical reasons, talk to Maya about pausing fees.",
  },
  {
    q: "Do you take children with additional needs?",
    a: "Yes. Daniel, our inclusion lead, meets you before your child starts to plan support, and works with any therapists or services you already see.",
  },
  {
    q: "Do you use screens?",
    a: "No screens in the nursery rooms. Swifts have a Friday film night and occasional research on a shared tablet with a grown-up.",
  },
  {
    q: "What is Nest Notes?",
    a: "Our parent app. It shows your child's meals, sleeps, diaper changes and photos through the day, and is where we send invoices, newsletters and messages.",
  },
  {
    q: "Is there parking?",
    a: "There are four drop-off bays on Linden Row for ten-minute stops, and a covered bike and stroller shelter by the side gate.",
  },
  {
    q: "How do you handle biting and hitting?",
    a: "Calmly, and with the families involved. We comfort the child who's hurt first, help the other child find another way to say what they needed, and tell both families the same day.",
  },
];

/* Voices ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "Our daughter cried for the first three mornings and ran in on the fourth. Priya sent us a photo of her asleep on the rug at 9:40, and we both relaxed for the first time in a week.",
    who: "Hannah & Luis",
    detail: "Parents in Wrens and Finches",
  },
  {
    quote:
      "The Owls year was exactly what our son needed. He started kindergarten able to open his own lunch box and write his name, and still talking about the bird hide.",
    who: "Aisha K.",
    detail: "Owls parent, 2025",
  },
  {
    quote:
      "Swifts saved our working week. The walking bus is the most reliable thing in our lives.",
    who: "Mark O.",
    detail: "Swifts parent",
  },
];

/* About ------------------------------------------------------------------- */

export const story = {
  lead: "Nest opened in 2011 in a former bakery on Linden Row, with eleven children, one garden and a very large oven we turned into a reading nook.",
  paragraphs: [
    "Maya Okafor had taught kindergarten for ten years and wanted a place where the youngest children got the same care and curiosity as her school classes: unhurried days, real outdoor time and one grown-up who knows each child inside out.",
    "Fifteen years later we have six rooms, eighty-eight places and a team of twenty-four. We're still independent, still in the same building, and Rosa still bakes the bread.",
  ],
  principles: [
    {
      title: "Outside every day.",
      text: "The garden door is open most of the day, in every safe weather. Waterproofs are on us; puddles are encouraged.",
    },
    {
      title: "One key person.",
      text: "Every child has a named grown-up who settles them in, knows their cues and talks to you at pickup.",
    },
    {
      title: "Cooked here, this morning.",
      text: "Breakfast, lunch and tea from our own kitchen, with allergy meals made separately and labeled.",
    },
    {
      title: "Play is the curriculum.",
      text: "Projects follow the children's questions. Letters and numbers arrive inside play, not instead of it.",
    },
  ],
  building: [
    {
      title: "The house",
      text: "Two floors of the old bakery, with the baby rooms upstairs where it's quietest and the preschool rooms opening straight onto the garden.",
    },
    {
      title: "The garden",
      text: "A third of an acre: raised beds, a mud kitchen, a willow tunnel, a bike track and a covered deck for rainy-day painting.",
    },
    {
      title: "Elmbridge Woods",
      text: "Ten minutes' walk away, where Larks and Owls spend every Friday morning with Ben.",
    },
  ],
  timeline: [
    { year: "2011", text: "Nest opens with eleven children in one room." },
    { year: "2014", text: "The upstairs becomes the Wrens and Robins rooms." },
    { year: "2016", text: "Forest Fridays begin in Elmbridge Woods." },
    {
      year: "2019",
      text: "Swifts after-school club opens with a walking bus.",
    },
    {
      year: "2024",
      text: "The garden doubles in size; the bird hide project begins.",
    },
  ],
};

export const ratios = [
  { stage: "Infants (3–12 months)", ratio: "1 : 3", required: "1 : 4" },
  { stage: "Toddlers (12–24 months)", ratio: "1 : 4", required: "1 : 5" },
  { stage: "Twos (2–3 years)", ratio: "1 : 5", required: "1 : 6" },
  { stage: "Preschool (3–5 years)", ratio: "1 : 8", required: "1 : 10" },
  { stage: "School age (5–8 years)", ratio: "1 : 10", required: "1 : 15" },
];

/* Tours ------------------------------------------------------------------- */

export const tours = {
  /** Weekdays (0 = Sunday) on which tours run, and their start times. */
  weekdays: [2, 3, 4],
  times: ["9:30 am", "1:45 pm", "4:30 pm"],
  length: "45 minutes",
  intro:
    "Tours run on Tuesdays, Wednesdays and Thursdays, during a normal working day, so you see the rooms as they really are.",
  expect: [
    "A walk through every room and the garden with Maya or Daniel",
    "Time to sit in the room your child would join",
    "Honest answers on availability, fees and waiting lists",
    "Children welcome; strollers fit through every door",
  ],
};

export const homeSections = {
  roomsTitle: "Six rooms, one for every age",
  roomsText:
    "Children move up when they're ready, not on their birthday. Each room has its own lead, its own garden routine and its own color on the coat pegs.",
  dayTitle: "What actually happens all day",
  feesTitle: "Fees, worked out in a minute",
  feesText:
    "Pick a room and your days. Mornings, afternoons and full days can be mixed, and pre-K credit is taken off before you see the total.",
  menuTitle: "On the menu this week",
  teamTitle: "The grown-ups",
  teamText:
    "Twenty-four people work at Nest. Here are the ones you'll see at the door every morning.",
  closeTitle: "Come and see a normal Tuesday.",
};
