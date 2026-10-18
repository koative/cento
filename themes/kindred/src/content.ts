import milo from "./assets/milo.jpg";
import peanut from "./assets/peanut.jpg";
import clover from "./assets/clover.jpg";
import biscuit from "./assets/biscuit.jpg";
import pip from "./assets/pip.jpg";
import duchess from "./assets/duchess.jpg";
import rufus from "./assets/rufus.jpg";
import juniper from "./assets/juniper.jpg";
import atlas from "./assets/atlas.jpg";
import mabel from "./assets/mabel.jpg";
import pebble from "./assets/pebble.jpg";
import domino from "./assets/domino.jpg";
import honey from "./assets/honey.jpg";
import toast from "./assets/toast.jpg";
import litter from "./assets/litter.jpg";
import adopter from "./assets/adopter.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Kindred",
  sector: "Animal shelter & adoption centre",
  tagline: "Somebody here has been waiting for you.",
  email: "hello@kindred.example",
  adoptEmail: "adopt@kindred.example",
  phone: "+1 555 0143",
  phoneHref: "tel:+15550143",
  address: ["48 Orchard Road", "Millbrook, OR 97000"],
  charity: "Kindred Animal Shelter is a fictional nonprofit, est. 1987.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/animals", label: "Animals" },
  { to: "/match", label: "Match quiz" },
  { to: "/adopt", label: "Adopt" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/about", label: "About" },
];

export const sitemap = [
  {
    title: "Adopt",
    links: [
      { to: "/animals", label: "Adoptable animals" },
      { to: "/match", label: "Matching quiz" },
      { to: "/adopt", label: "How adoption works" },
      { to: "/apply", label: "Adoption application" },
    ],
  },
  {
    title: "Help out",
    links: [
      { to: "/volunteer", label: "Volunteer & foster" },
      { to: "/donate", label: "Donate" },
      { to: "/about", label: "About & visiting" },
    ],
  },
];

/** Sunday-first. null = closed. */
export type Hours = [string, string] | null;
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const hours: Hours[] = [
  ["11:00", "16:00"],
  null,
  ["12:00", "18:00"],
  ["12:00", "18:00"],
  ["12:00", "19:30"],
  ["12:00", "18:00"],
  ["10:00", "17:00"],
];

/* ------------------------------------------------------------ animals */

export type Species = "dog" | "cat" | "rabbit";
/** yes = tested and happy, ask = untested or depends, no = needs a home without them */
export type Fit = "yes" | "ask" | "no";
/** Shelter collar tags: green = first-timer friendly, amber = some experience, orange = experienced home. */
export type Tag = "green" | "amber" | "orange";
export type Level = 1 | 2 | 3;

export type Animal = {
  id: string;
  name: string;
  species: Species;
  breed: string;
  sex: "Female" | "Male";
  ageMonths: number;
  weightLb: number;
  size: "Small" | "Medium" | "Large";
  colour: string;
  kennel: string;
  daysHere: number;
  tag: Tag;
  energy: Level;
  affection: Level;
  /** How well they cope alone: 1 = needs company most of the day, 3 = fine for a work day. */
  independence: Level;
  apartmentOk: boolean;
  goodWith: { kids: Fit; dogs: Fit; cats: Fit };
  line: string;
  story: string[];
  loves: string[];
  notKeen: string[];
  idealHome: string;
  medical: string[];
  photo: string;
  alt: string;
  /** object-position for crops */
  focus?: string;
};

export const speciesLabel: Record<Species, { one: string; many: string }> = {
  dog: { one: "Dog", many: "Dogs" },
  cat: { one: "Cat", many: "Cats" },
  rabbit: { one: "Rabbit", many: "Rabbits" },
};

export const tags: Record<Tag, { label: string; note: string }> = {
  green: {
    label: "Green tag",
    note: "Settled and straightforward — a good first match.",
  },
  amber: {
    label: "Amber tag",
    note: "Lovely, with one or two habits that suit someone with some pet experience.",
  },
  orange: {
    label: "Orange tag",
    note: "Needs an experienced, adults-only home and a few visits before going home.",
  },
};

export const animals: Animal[] = [
  {
    id: "milo",
    name: "Milo",
    species: "dog",
    breed: "Golden retriever mix",
    sex: "Male",
    ageMonths: 11,
    weightLb: 52,
    size: "Large",
    colour: "Cream",
    kennel: "D-03",
    daysHere: 9,
    tag: "amber",
    energy: 3,
    affection: 3,
    independence: 1,
    apartmentOk: false,
    goodWith: { kids: "yes", dogs: "yes", cats: "ask" },
    line: "Brings you a gift every time you walk in. Usually a tulip.",
    story: [
      "Milo came in with his littermate in early autumn after his family moved overseas. His brother went home within a week; Milo is still waiting, mostly because he hasn't learned to stop carrying things around long enough to look serious in photos.",
      "He knows sit, down and a wobbly stay. He is gentle with small children and happiest when he's allowed to follow you from room to room. Leash manners are a work in progress — he pulls toward every other dog because he assumes they all want to be friends.",
    ],
    loves: [
      "Retrieving anything, including flowers",
      "Other young dogs",
      "A paddling pool in summer",
    ],
    notKeen: ["Being left alone for long stretches", "The vacuum cleaner"],
    idealHome:
      "An active household with a fenced yard and someone home for most of the day, ready to keep going with puppy classes. Dog-savvy cats might be fine after a supervised meet.",
    medical: [
      "Vaccinated (DHPP, rabies)",
      "Microchipped",
      "Neutered",
      "Flea & worm treated",
    ],
    photo: milo,
    alt: "A young cream golden retriever mix sitting on a garden path with a yellow tulip in his mouth",
    focus: "50% 30%",
  },
  {
    id: "peanut",
    name: "Peanut",
    species: "dog",
    breed: "Shih tzu–poodle mix",
    sex: "Female",
    ageMonths: 26,
    weightLb: 11,
    size: "Small",
    colour: "Apricot",
    kennel: "D-11",
    daysHere: 21,
    tag: "green",
    energy: 2,
    affection: 3,
    independence: 2,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "yes", cats: "yes" },
    line: "Arrived with her own banana pyjamas. Wears them with pride.",
    story: [
      "Peanut was handed in by an elderly owner who moved into assisted living and couldn't take her along. She arrived with a small suitcase: a blanket, a squeaky carrot and a set of pyjamas that, we were told, she sleeps in every night.",
      "She is calm, house-trained and walks nicely on a harness. She'll sit on whichever lap is nearest and has been the shelter's unofficial greeter in reception for three weeks now.",
    ],
    loves: ["Laps", "Short walks with lots of sniffing", "Her squeaky carrot"],
    notKeen: ["Cold rain", "Being picked up by strangers"],
    idealHome:
      "Almost anywhere. An apartment is fine. She'd suit a first-time adopter, a retired couple or a family with gentle kids.",
    medical: [
      "Vaccinated",
      "Microchipped",
      "Spayed",
      "Groomed every 6–8 weeks",
    ],
    photo: peanut,
    alt: "A small apricot shih tzu mix in blue banana-print pyjamas sitting against a yellow backdrop",
    focus: "50% 35%",
  },
  {
    id: "clover",
    name: "Clover",
    species: "cat",
    breed: "Domestic shorthair",
    sex: "Female",
    ageMonths: 27,
    weightLb: 9,
    size: "Small",
    colour: "Black & white",
    kennel: "C-02",
    daysHere: 33,
    tag: "green",
    energy: 2,
    affection: 2,
    independence: 3,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "ask", cats: "yes" },
    line: "Small cat. Very big opinions about window seats.",
    story: [
      "Clover was found living under a porch with a collar but no chip. Nobody came forward, and after a month with us she has firmly decided she lives here now — on the highest shelf in Cat Room 2, supervising.",
      "She is affectionate on her own schedule: she'll come to you for a chin scratch, then go back to her post. She uses the litter tray perfectly and is relaxed around the other cats.",
    ],
    loves: ["Sunny windows", "Feather wands", "Watching birds"],
    notKeen: ["Being carried", "Loud, busy rooms"],
    idealHome:
      "A calm home with a window and a cat tree. She's fine on her own during a work day.",
    medical: [
      "Vaccinated (FVRCP)",
      "Microchipped",
      "Spayed",
      "FIV/FeLV negative",
    ],
    photo: clover,
    alt: "A black and white cat with green eyes resting her paws on a bamboo rail in front of a green wall",
  },
  {
    id: "biscuit",
    name: "Biscuit",
    species: "dog",
    breed: "Corgi mix",
    sex: "Male",
    ageMonths: 50,
    weightLb: 28,
    size: "Medium",
    colour: "Red & white",
    kennel: "D-07",
    daysHere: 47,
    tag: "green",
    energy: 2,
    affection: 3,
    independence: 2,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "yes", cats: "no" },
    line: "Permanent grin. Excellent at sitting for treats, and only for treats.",
    story: [
      "Biscuit's family had a new baby and a second dog who never quite got along with him. He's not difficult — just a dog who likes to be the dog. With us he's been a model kennel neighbour.",
      "He walks well, knows a handful of tricks and is completely food-motivated, which makes training easy. He chases cats, so he needs a cat-free home.",
    ],
    loves: ["Cheese", "Belly rubs", "Long, slow sniff walks"],
    notKeen: ["Cats", "Stairs — his legs are very short"],
    idealHome:
      "A cat-free home, apartment or house, with people who'll keep an eye on his waistline.",
    medical: [
      "Vaccinated",
      "Microchipped",
      "Neutered",
      "On a weight-management diet",
    ],
    photo: biscuit,
    alt: "A smiling red and white corgi mix with his tongue out against a pale studio background",
  },
  {
    id: "pip",
    name: "Pip",
    species: "dog",
    breed: "Wire-haired terrier mix",
    sex: "Male",
    ageMonths: 74,
    weightLb: 19,
    size: "Small",
    colour: "White & tan",
    kennel: "D-14",
    daysHere: 88,
    tag: "amber",
    energy: 3,
    affection: 2,
    independence: 2,
    apartmentOk: false,
    goodWith: { kids: "ask", dogs: "ask", cats: "no" },
    line: "Small, scruffy, and a gifted escape artist. Fences: tall, please.",
    story: [
      "Pip was a stray who was picked up three times in two weeks — from three different neighbourhoods. He isn't running away from anyone; he just wants to know what's on the other side of everything.",
      "Indoors he's a cuddly, scruffy little man who sleeps on his back. He needs a properly fenced yard, a nose-work toy or two, and someone patient about introductions to other dogs.",
    ],
    loves: ["Digging", "Puzzle feeders", "Afternoon naps in the sun"],
    notKeen: ["Cats and squirrels (for opposite reasons)", "Being brushed"],
    idealHome:
      "A house with a secure, 5-foot fence and older children (8+) or adults. Some terrier experience helps.",
    medical: [
      "Vaccinated",
      "Microchipped",
      "Neutered",
      "Mild skin allergy, managed with diet",
    ],
    photo: pip,
    alt: "A scruffy white and tan wire-haired terrier mix looking up to the side against a pale background",
  },
  {
    id: "duchess",
    name: "Duchess",
    species: "dog",
    breed: "Yorkshire terrier",
    sex: "Female",
    ageMonths: 122,
    weightLb: 7,
    size: "Small",
    colour: "Black & tan",
    kennel: "D-01",
    daysHere: 126,
    tag: "green",
    energy: 1,
    affection: 3,
    independence: 2,
    apartmentOk: true,
    goodWith: { kids: "ask", dogs: "yes", cats: "yes" },
    line: "Ten years old, seven pounds, and the dignity of a much larger dog.",
    story: [
      "Duchess has been with us longer than anyone. She came in needing eleven teeth removed; the surgery went well, and she now eats soft food with tremendous enthusiasm.",
      "She is quiet, house-trained and content with two short walks a day. Senior dogs get overlooked, which is a shame — she's the easiest dog in the building.",
    ],
    loves: ["Blankets", "Warm laps", "Being told she's beautiful"],
    notKeen: ["Toddlers", "Long walks"],
    idealHome:
      "A quiet home with adults or older kids. Our senior fee is $50 and we cover her first year of dental checks.",
    medical: [
      "Vaccinated",
      "Microchipped",
      "Spayed",
      "Dental surgery done; soft-food diet",
    ],
    photo: duchess,
    alt: "A long-haired black and tan Yorkshire terrier looking straight at the camera",
  },
  {
    id: "rufus",
    name: "Rufus",
    species: "dog",
    breed: "Griffon–basset mix",
    sex: "Male",
    ageMonths: 86,
    weightLb: 44,
    size: "Medium",
    colour: "Tricolour",
    kennel: "D-09",
    daysHere: 71,
    tag: "green",
    energy: 1,
    affection: 3,
    independence: 3,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "yes", cats: "ask" },
    line: "Nose first, everything else eventually. A professional at slow walks.",
    story: [
      "Rufus was surrendered when his owner's landlord changed the pet policy. He'd lived with three children and a spaniel and took all of it in his very long stride.",
      "He's a gentle, sleepy hound who could spend an hour on one patch of grass. He'll bay once when the doorbell rings, then go back to bed.",
    ],
    loves: ["Sniffing everything", "Kids who share snacks", "The couch"],
    notKeen: ["Hurrying", "Baths"],
    idealHome:
      "Families, retirees, first-timers. He's fine for a work day as long as he gets a long sniff walk.",
    medical: ["Vaccinated", "Microchipped", "Neutered", "Ears cleaned weekly"],
    photo: rufus,
    alt: "A shaggy tricolour griffon basset mix with long ears and a soft grey beard",
  },
  {
    id: "juniper",
    name: "Juniper",
    species: "dog",
    breed: "Jack Russell mix",
    sex: "Female",
    ageMonths: 38,
    weightLb: 16,
    size: "Small",
    colour: "White & brown",
    kennel: "D-05",
    daysHere: 39,
    tag: "amber",
    energy: 3,
    affection: 3,
    independence: 2,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "no", cats: "no" },
    line: "Ball first, questions later. Wants to be your one and only.",
    story: [
      "Juniper lived with another female terrier, and the two of them eventually decided that the house wasn't big enough. She's wonderful with people of every size — she just wants to be the only animal.",
      "She'll fetch until your arm gives out and then curl up against your leg for the evening. She does well in agility taster sessions and learns fast.",
    ],
    loves: ["Tennis balls", "Agility tunnels", "Kids who throw things"],
    notKeen: ["Other dogs on walks", "Cats"],
    idealHome:
      "An only-pet home with an active person or family. An apartment is fine with two good outings a day.",
    medical: ["Vaccinated", "Microchipped", "Spayed"],
    photo: juniper,
    alt: "A white Jack Russell mix with a brown ear grinning with her tongue out",
  },
  {
    id: "atlas",
    name: "Atlas",
    species: "dog",
    breed: "German shepherd mix",
    sex: "Male",
    ageMonths: 62,
    weightLb: 78,
    size: "Large",
    colour: "Sable",
    kennel: "D-16",
    daysHere: 104,
    tag: "orange",
    energy: 3,
    affection: 2,
    independence: 3,
    apartmentOk: false,
    goodWith: { kids: "no", dogs: "ask", cats: "no" },
    line: "Clever, loyal, a little worried about strangers. Worth every visit.",
    story: [
      "Atlas came to us from a home where he spent most of his time on a chain. He's done remarkable work with our behaviour team: he now walks calmly past the kennel row and offers a paw to the people he knows.",
      "New people make him nervous at first. Adopters meet him three times at the shelter before he goes home, and we'll stay in touch with a trainer for the first two months.",
    ],
    loves: ["Training sessions", "Frisbee", "His favourite volunteer, Dana"],
    notKeen: ["Sudden movements", "Strangers at the door"],
    idealHome:
      "An adults-only home with large-breed experience, a fenced yard and time for a gradual introduction. No cats.",
    medical: ["Vaccinated", "Microchipped", "Neutered", "Hip X-rays clear"],
    photo: atlas,
    alt: "A sable German shepherd mix sitting in dappled forest light with his mouth open",
  },
  {
    id: "mabel",
    name: "Mabel",
    species: "cat",
    breed: "Domestic shorthair",
    sex: "Female",
    ageMonths: 98,
    weightLb: 11,
    size: "Medium",
    colour: "Black",
    kennel: "C-07",
    daysHere: 96,
    tag: "green",
    energy: 1,
    affection: 3,
    independence: 3,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "yes", cats: "ask" },
    line: "A sleek black cat with a loud purr and no superstitions.",
    story: [
      "Black cats wait longest in shelters, and Mabel is no exception — three months and counting. She lived with a golden retriever for six years and thinks dogs are basically large, warm cushions.",
      "She is a lap cat in the evenings and a sunbeam cat in the afternoons. Easy, healthy and very talkative at breakfast time.",
    ],
    loves: ["Scratching posts", "Laps after dinner", "Friendly dogs"],
    notKeen: ["Pushy young cats", "Closed doors"],
    idealHome:
      "Any calm home — first-timers welcome. She'd be a lovely companion for someone who works from home.",
    medical: [
      "Vaccinated (FVRCP)",
      "Microchipped",
      "Spayed",
      "Senior bloodwork normal",
    ],
    photo: mabel,
    alt: "A sleek black cat with yellow eyes lying on a grey scratching post",
  },
  {
    id: "pebble",
    name: "Pebble",
    species: "cat",
    breed: "Domestic shorthair",
    sex: "Male",
    ageMonths: 3,
    weightLb: 3,
    size: "Small",
    colour: "Grey tabby",
    kennel: "C-11",
    daysHere: 12,
    tag: "green",
    energy: 3,
    affection: 2,
    independence: 1,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "ask", cats: "yes" },
    line: "Twelve weeks old and fully committed to attacking your shoelaces.",
    story: [
      "Pebble was born in one of our foster homes in July — one of a litter of five. His siblings have all gone home; he's the shy one, which in kitten terms means he waits two minutes before climbing you.",
      "Kittens do best in pairs. If you don't already have a young cat at home, we'll suggest adopting him with Domino, who he plays with every day.",
    ],
    loves: ["String", "Climbing curtains", "Domino"],
    notKeen: ["Being alone", "The carrier"],
    idealHome:
      "A home with another young cat, or with Domino. Someone around for much of the day.",
    medical: [
      "First vaccines done",
      "Microchipped",
      "Neuter booked at 4 months (included)",
    ],
    photo: pebble,
    alt: "A small grey tabby kitten with blue eyes sitting on a carpet",
  },
  {
    id: "domino",
    name: "Domino",
    species: "cat",
    breed: "Domestic shorthair",
    sex: "Female",
    ageMonths: 4,
    weightLb: 4,
    size: "Small",
    colour: "Black & white",
    kennel: "C-12",
    daysHere: 15,
    tag: "green",
    energy: 3,
    affection: 3,
    independence: 1,
    apartmentOk: true,
    goodWith: { kids: "yes", dogs: "yes", cats: "yes" },
    line: "Plays like it's a professional sport. Purrs like a small engine.",
    story: [
      "Domino arrived from a farm where the barn cat had one more litter than anyone was ready for. She was bottle-raised by a foster family for her first six weeks, so she is completely unafraid of people, dogs and vacuum cleaners.",
      "She's the boss of the kitten room and the first to the door when someone comes in. She and Pebble would make an excellent pair.",
    ],
    loves: ["Feather wands", "Pebble", "Climbing your shoulder"],
    notKeen: ["Nothing has been identified yet"],
    idealHome:
      "Busy households welcome. Best with another young cat or adopted alongside Pebble.",
    medical: ["Vaccinated (first two rounds)", "Microchipped", "Spayed"],
    photo: domino,
    alt: "A black and white kitten stretching upward to play with a toy on a carpet",
  },
  {
    id: "honey",
    name: "Honey",
    species: "rabbit",
    breed: "Holland lop",
    sex: "Female",
    ageMonths: 24,
    weightLb: 4,
    size: "Small",
    colour: "Fawn",
    kennel: "R-02",
    daysHere: 58,
    tag: "green",
    energy: 2,
    affection: 2,
    independence: 3,
    apartmentOk: true,
    goodWith: { kids: "ask", dogs: "ask", cats: "ask" },
    line: "Ears down, nose busy. Does a full binky when the greens arrive.",
    story: [
      "Honey was an Easter gift that didn't work out — the most common story we hear about rabbits. She's litter-trained, curious and has learned to come when she hears a salad bag rustle.",
      "Rabbits aren't starter pets for small children: they dislike being lifted and need room to run. Honey will reward a patient person who sits on the floor and lets her come to them.",
    ],
    loves: ["Romaine and cilantro", "Cardboard tunnels", "Morning zoomies"],
    notKeen: ["Being picked up", "Loud dogs"],
    idealHome:
      "An indoor home with a pen of at least 4 × 8 feet and adults or older children.",
    medical: ["RHDV2 vaccinated", "Spayed", "Nails trimmed monthly"],
    photo: honey,
    alt: "A fawn Holland lop rabbit with long drooping ears sitting on green grass",
  },
  {
    id: "toast",
    name: "Toast",
    species: "rabbit",
    breed: "Mini lop",
    sex: "Male",
    ageMonths: 37,
    weightLb: 5,
    size: "Small",
    colour: "Chestnut",
    kennel: "R-04",
    daysHere: 64,
    tag: "amber",
    energy: 2,
    affection: 2,
    independence: 3,
    apartmentOk: true,
    goodWith: { kids: "no", dogs: "no", cats: "ask" },
    line: "Tolerated the sweater for exactly one photo. Do not ask again.",
    story: [
      "Toast came from a hoarding case with twenty-two other rabbits. He's healthy now, but still wary of hands that come from above, so he needs someone patient who'll let trust build at his pace.",
      "Once he knows you, he's a gentle little companion who flops on his side next to you while you read. A volunteer knitted him a sweater; it's in the photo; it's the only time he wore it.",
    ],
    loves: ["Hay mountains", "Quiet evenings", "Gentle nose rubs"],
    notKeen: ["Children's quick movements", "Dogs"],
    idealHome:
      "A quiet adult home, ideally with rabbit experience. Could bond with a calm female rabbit later.",
    medical: ["RHDV2 vaccinated", "Neutered", "Dental check every 6 months"],
    photo: toast,
    alt: "A chestnut mini lop rabbit wearing a small grey knitted sweater on a red brick floor",
  },
];

/* ------------------------------------------------------------ adoption */

export const fees = [
  { label: "Puppy (under 1 year)", species: "dog", maxMonths: 12, price: 250 },
  { label: "Adult dog", species: "dog", maxMonths: 96, price: 175 },
  {
    label: "Senior dog (8 years +)",
    species: "dog",
    maxMonths: Infinity,
    price: 50,
  },
  { label: "Kitten (under 1 year)", species: "cat", maxMonths: 12, price: 125 },
  { label: "Adult cat", species: "cat", maxMonths: 96, price: 95 },
  {
    label: "Senior cat (8 years +)",
    species: "cat",
    maxMonths: Infinity,
    price: 40,
  },
  { label: "Rabbit", species: "rabbit", maxMonths: Infinity, price: 60 },
] as const;

export const included = [
  "Vaccinations up to date for their age",
  "Microchip, registered to you on the day",
  "Spay or neuter (or a voucher if they're too young)",
  "A free health check at a partner vet within 30 days",
  "Four weeks of pet insurance, activated at pick-up",
  "A starter bag of the food they've been eating here",
];

export const steps = [
  {
    title: "Meet",
    time: "Any open day",
    text: "Browse online, then come and say hello. A staff member will introduce you and answer the awkward questions — the ones about shedding, barking and 3 am.",
  },
  {
    title: "Apply",
    time: "About 15 minutes",
    text: "Fill in the application online or at reception. Tell us about your home and routine; there are no trick questions and no wrong answers.",
  },
  {
    title: "Chat",
    time: "Within 2 days",
    text: "An adoption counsellor calls to talk it through. For dogs we do a short video walk-round of your home and yard instead of a formal inspection.",
  },
  {
    title: "Go home",
    time: "Usually within a week",
    text: "Pay the fee, sign the papers, pick a collar. We'll call at 3 days and 3 weeks to see how everyone is settling in.",
  },
];

export const promises = [
  {
    title: "The forever-return promise",
    text: "If life changes, at any point in their life, they can come back to Kindred. No judgement, no fee.",
  },
  {
    title: "Renters welcome",
    text: "We'll help you check your lease and can provide a pet reference letter for your landlord.",
  },
  {
    title: "First-time adopters welcome",
    text: "Every green-tag animal is suited to someone who has never had a pet. Our free Thursday class covers the first month.",
  },
];

export const faq = [
  {
    q: "Can I reserve an animal over the phone?",
    a: "We don't hold animals without an application, because it isn't fair to the next family. Once your application is in, the animal is marked as pending and nobody else can apply.",
  },
  {
    q: "Do I need to bring my current dog to meet them?",
    a: "Yes — for any dog adoption into a home with another dog, we arrange a meet on neutral ground in our yard. It takes about 30 minutes and is the best predictor we know of.",
  },
  {
    q: "Is there an age requirement?",
    a: "The adopter needs to be 21 or over and to show photo ID. Everyone who lives in the home should meet the animal at least once.",
  },
  {
    q: "What if I live in an apartment?",
    a: "Plenty of our animals are happy in apartments; it's marked on every profile. We'll ask about stairs, lifts and how close the nearest green space is.",
  },
  {
    q: "Why is the senior fee so low?",
    a: "Older animals wait the longest. Their fee is subsidised by our Grey Muzzle Fund, which also covers their first year of check-ups.",
  },
  {
    q: "Can I adopt as a gift for someone else?",
    a: "Not directly — the person who'll live with the animal should meet them and apply. You can buy an adoption gift card that covers the fee.",
  },
];

/* ------------------------------------------------------------ matching quiz */

export type QuizQuestion = {
  id: "species" | "home" | "pace" | "alone" | "kids" | "pets" | "experience";
  question: string;
  help: string;
  options: { value: string; label: string; detail: string }[];
};

export const quiz: QuizQuestion[] = [
  {
    id: "species",
    question: "Who are you hoping to meet?",
    help: "Open to anyone gets you the widest list.",
    options: [
      { value: "dog", label: "A dog", detail: "Walks, games, a shadow" },
      { value: "cat", label: "A cat", detail: "Independent company" },
      {
        value: "rabbit",
        label: "A rabbit",
        detail: "Quiet, curious, floor-level",
      },
      { value: "any", label: "Open to anyone", detail: "Show me everybody" },
    ],
  },
  {
    id: "home",
    question: "Where would they live?",
    help: "We'll flag animals who really need outdoor space.",
    options: [
      {
        value: "apartment",
        label: "An apartment",
        detail: "No private outdoor space",
      },
      {
        value: "house",
        label: "A house, small yard",
        detail: "Some outdoor space",
      },
      {
        value: "yard",
        label: "A house with a fenced yard",
        detail: "Secure garden or yard",
      },
    ],
  },
  {
    id: "pace",
    question: "What does a good weekend look like?",
    help: "Be honest — a mismatch here is the main reason adoptions don't work out.",
    options: [
      { value: "1", label: "Couch, films, a short stroll", detail: "Low-key" },
      { value: "2", label: "A long walk and a café", detail: "Steady" },
      { value: "3", label: "Trails, fetch, out all day", detail: "Full tilt" },
    ],
  },
  {
    id: "alone",
    question: "On a usual weekday, how long is the home empty?",
    help: "Some animals cope with a work day; others really don't.",
    options: [
      { value: "1", label: "Hardly ever", detail: "Someone's usually home" },
      { value: "2", label: "Up to 4 hours", detail: "Part-time or hybrid" },
      { value: "3", label: "6 hours or more", detail: "Out at work" },
    ],
  },
  {
    id: "kids",
    question: "Are there children in the home?",
    help: "Including ones who visit often.",
    options: [
      { value: "none", label: "No children", detail: "Adults only" },
      { value: "older", label: "Children 8 and over", detail: "" },
      { value: "young", label: "Children under 8", detail: "" },
    ],
  },
  {
    id: "pets",
    question: "Any other animals at home?",
    help: "We'll always arrange a supervised introduction.",
    options: [
      { value: "none", label: "No other pets", detail: "" },
      { value: "dog", label: "A dog", detail: "" },
      { value: "cat", label: "A cat", detail: "" },
      { value: "both", label: "Dogs and cats", detail: "" },
    ],
  },
  {
    id: "experience",
    question: "Have you lived with a pet before?",
    help: "Our collar tags are matched to experience, not to how much you care.",
    options: [
      { value: "1", label: "This would be my first", detail: "Green tags" },
      {
        value: "2",
        label: "Yes, a pet or two",
        detail: "Green and amber tags",
      },
      { value: "3", label: "Lots, including tricky ones", detail: "All tags" },
    ],
  },
];

/* ------------------------------------------------------------ home */

export const home = {
  title: "Somebody here has been waiting for you.",
  intro:
    "Kindred is Millbrook's independent adoption shelter. Dogs, cats and rabbits live here between homes — walked, fed, fussed over and introduced, one honest conversation at a time.",
  heroAnimal: "milo",
  waitingTitle: "Waiting the longest",
  waitingText:
    "Seniors, black cats and nervous big dogs stay with us the longest. Not because anything's wrong — just because people walk past them.",
  matchTitle: "Not sure who? Seven questions, honest answers.",
  matchText:
    "Our matching quiz uses the same notes our adoption counsellors use: energy, time alone, children, other pets and experience. It won't pick for you, but it will tell you who to meet first.",
  matchSample: {
    species: "any",
    home: "apartment",
    pace: "2",
    alone: "2",
    kids: "older",
    pets: "none",
    experience: "1",
  },
  matchSampleLabel:
    "A first-time adopter in an apartment, with a 9-year-old and a taste for long walks",
  stepsTitle: "From hello to home in about a week",
  story: {
    quote:
      "I went in for a puppy and came home with a nine-year-old who'd been there four months. She's asleep on my feet as I write this.",
    name: "Ruth Ellery",
    detail: "Adopted Rosie, 9, in March",
    photo: adopter,
    alt: "A smiling older woman in a pink cardigan holding a small white and brown terrier",
  },
  foster: {
    title: "Kitten season needs spare rooms.",
    text: "From April to October, litters arrive faster than we can house them. A foster home with a spare bathroom and two hours a day turns a crowded intake week into five kittens ready for adoption.",
    photo: litter,
    alt: "Three young kittens, two tabby and white and one calico, standing together on straw",
  },
  donateTitle: "What a gift does here",
  closeTitle: "Come say hello this weekend.",
  closeText:
    "No appointment needed to visit. Bring everyone who'll live with your new animal, and a little patience.",
};

/* ------------------------------------------------------------ donate */

export const donate = {
  intro:
    "We get no city funding. Everything — the food, the surgeries, the heating in the kennel block — comes from adoption fees and from people like you.",
  amounts: [15, 35, 75, 150],
  impact: [
    {
      min: 0,
      text: "keeps the lights and heating on in one kennel for a week",
    },
    {
      min: 15,
      text: "feeds a cat for two weeks, including the fancy wet food",
    },
    { min: 35, text: "covers a new arrival's vaccines and microchip" },
    { min: 75, text: "pays for a full day of our behaviour trainer's time" },
    { min: 150, text: "funds a spay or neuter surgery, start to finish" },
    {
      min: 400,
      text: "covers a senior dental like Duchess's, anaesthetic included",
    },
  ],
  funds: [
    { value: "general", label: "Where it's needed most" },
    { value: "medical", label: "Medical fund" },
    { value: "grey-muzzle", label: "Grey Muzzle Fund (seniors)" },
    { value: "kitten-season", label: "Kitten season" },
  ],
  split: [
    { label: "Veterinary care", pct: 42, tone: "accent" },
    { label: "Food & bedding", pct: 24, tone: "marigold" },
    { label: "Staff & training", pct: 22, tone: "forest" },
    { label: "Building & running costs", pct: 12, tone: "ink" },
  ],
  wishlist: [
    "Unscented clumping cat litter",
    "Kong toys (medium and large)",
    "Timothy hay — the long-strand kind",
    "Old towels and fleece blankets (no duvets)",
    "Puppy training pads",
    "Gift cards for the hardware store, for repairs",
  ],
  sponsor:
    "Sponsor a kennel for $40 a month and your name goes on the door — plus a monthly update from whoever's living behind it.",
};

/* ------------------------------------------------------------ volunteer */

export const volunteer = {
  intro:
    "Around 140 volunteers keep Kindred running. Most give one shift a week. Nobody needs experience, but everybody does a two-hour orientation first.",
  roles: [
    {
      id: "dog-walker",
      title: "Dog walker",
      what: "Walks and yard play with two or three dogs per shift, plus notes for the behaviour team.",
      commitment: "2 hours a week",
      age: "18+",
    },
    {
      id: "cat-socialiser",
      title: "Cat socialiser",
      what: "Quiet time in the cat rooms: brushing, play and helping shy cats get used to hands.",
      commitment: "2 hours a week",
      age: "14+ with an adult",
    },
    {
      id: "foster",
      title: "Foster carer",
      what: "Look after kittens, recovering surgery patients or stressed animals at home. We supply everything.",
      commitment: "2–8 weeks at a time",
      age: "21+",
    },
    {
      id: "kennel-crew",
      title: "Kennel crew",
      what: "Laundry, dishes, food prep, cleaning. Unglamorous, essential, oddly satisfying.",
      commitment: "3 hours a week",
      age: "16+",
    },
    {
      id: "adoption-host",
      title: "Adoption day host",
      what: "Welcome visitors on Saturdays, introduce animals and keep the meet-and-greet rooms moving.",
      commitment: "Two Saturdays a month",
      age: "18+",
    },
    {
      id: "driver",
      title: "Transport driver",
      what: "Drive animals to vet appointments and transfers from partner shelters. Own car and clean licence.",
      commitment: "On call, roughly monthly",
      age: "21+",
    },
  ],
  orientations: [
    { date: "Sat 7 November", time: "10 am – 12 pm" },
    { date: "Wed 18 November", time: "6 pm – 8 pm" },
    { date: "Sat 5 December", time: "10 am – 12 pm" },
    { date: "Wed 16 December", time: "6 pm – 8 pm" },
  ],
  availability: [
    "Weekday mornings",
    "Weekday afternoons",
    "Weekday evenings",
    "Saturdays",
    "Sundays",
  ],
  fosterText:
    "Fostering is the single most useful thing you can do for us. Each foster home frees a kennel, and animals recover and relax faster in a real house. We provide food, litter, crates, vet care and a 24-hour phone line.",
};

/* ------------------------------------------------------------ about */

export const about = {
  intro:
    "Kindred started in 1987 in Margaret Oyelaran's barn on the edge of Millbrook, with six dogs and a donated chest freezer. It's grown a bit since.",
  story: [
    "Margaret was a school nurse who couldn't drive past a stray. By 1990 the barn had a waiting list and a volunteer rota pinned to the door; by 1998 the town had given us the old feed store on Orchard Road, which is still home today.",
    "We're an open-admission shelter: if an animal from Millbrook County needs us, we make room. That's why fostering and fast, honest matching matter so much — every animal who goes home well makes space for the next one.",
    "Last year 1,148 animals came through our doors and 1,093 went home or back to their families. We'd like those two numbers to be the same.",
  ],
  milestones: [
    { year: "1987", text: "Six dogs, one barn, one chest freezer." },
    { year: "1998", text: "Moved into the old feed store on Orchard Road." },
    {
      year: "2009",
      text: "Opened the cat rooms and the first foster network.",
    },
    {
      year: "2016",
      text: "Added an on-site clinic for spay and neuter surgery.",
    },
    {
      year: "2023",
      text: "Rebuilt the kennel block with quiet, sound-damped runs.",
    },
  ],
  building: [
    {
      title: "The kennel block",
      text: "32 runs with heated floors, sound damping and an outdoor yard each.",
    },
    {
      title: "Two cat rooms",
      text: "Free-roaming rooms for social cats, and quiet condos for new arrivals.",
    },
    {
      title: "The rabbit barn",
      text: "Indoor pens with daily run time on a grass paddock.",
    },
    {
      title: "Meet-and-greet rooms",
      text: "Three sofas, three doors, no kennel noise. Where most matches happen.",
    },
  ],
  team: [
    {
      name: "Dana Whitfield",
      role: "Shelter director",
      note: "Adopted Atlas's predecessor in the long-stay kennel, a shepherd called Bear.",
    },
    {
      name: "Dr. Imani Castell",
      role: "Shelter veterinarian",
      note: "Has done more than 9,000 spays. Still names every patient.",
    },
    {
      name: "Luis Moreno",
      role: "Behaviour & training lead",
      note: "The reason Atlas now offers his paw.",
    },
    {
      name: "Priya Nandakumar",
      role: "Adoption counsellor",
      note: "Runs the Thursday first-time adopter class.",
    },
    {
      name: "Tom Halvorsen",
      role: "Foster coordinator",
      note: "Has fostered 212 kittens. Has kept two.",
    },
    {
      name: "Grace Abiodun",
      role: "Volunteer manager",
      note: "Started as a Saturday dog walker in 2011.",
    },
  ],
  visitNotes: [
    "No appointment needed to browse; meet-and-greets run on a first-come basis.",
    "Free parking behind the building, and a bus stop (Route 4, Orchard & 9th) at the gate.",
    "Children are welcome with an adult. Please leave your own dog at home unless we've arranged a meet.",
  ],
};

/* ------------------------------------------------------------ footer */

export const footer = {
  newsletterTitle: "Kennel notes",
  newsletterText:
    "One email a month: new arrivals, who went home, and what we're short of.",
};
