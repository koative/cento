import hero from "./assets/hero.jpg";
import calmCat from "./assets/calm-cat.jpg";
import runningDogs from "./assets/running-dogs.jpg";
import highFive from "./assets/high-five.jpg";
import puppy from "./assets/puppy.jpg";
import kitten from "./assets/kitten.jpg";
import tabby from "./assets/tabby.jpg";
import surgery from "./assets/surgery.jpg";
import laser from "./assets/laser.jpg";
import schnauzer from "./assets/schnauzer.jpg";
import rabbit from "./assets/rabbit.jpg";
import hamster from "./assets/hamster.jpg";
import catDog from "./assets/cat-dog.jpg";
import seaDog from "./assets/sea-dog.jpg";
import beagle from "./assets/beagle.jpg";
import frenchie from "./assets/frenchie.jpg";
import tuxedoCat from "./assets/tuxedo-cat.jpg";
import spaniel from "./assets/spaniel.jpg";
import samoyed from "./assets/samoyed.jpg";
import aussie from "./assets/aussie.jpg";

export type Species = "dog" | "cat" | "rabbit";
export type Img = { src: string; alt: string; w: number; h: number };

export const speciesLabel: Record<Species, string> = {
  dog: "Dogs",
  cat: "Cats",
  rabbit: "Rabbits & small pets",
};

export const brand = {
  name: "Whisker",
  legal: "Whisker Veterinary Clinic",
  tagline: "Unhurried vet care for dogs, cats and rabbits on Alder Street.",
  phone: "+1 555 0148",
  phoneHref: "tel:+15550148",
  emergencyPhone: "+1 555 0199",
  emergencyHref: "tel:+15550199",
  email: "hello@whisker.example",
  address: ["214 Alder Street", "Fernhill, OR 97000"],
  founded: 2009,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/vets", label: "Vets" },
  { to: "/plans", label: "Health plans" },
  { to: "/planner", label: "Care planner" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
];

/** Opening hours by weekday (0 = Sunday), 24h "HH:MM". null = closed. */
export const hours: ({ open: string; close: string } | null)[] = [
  null,
  { open: "08:00", close: "19:00" },
  { open: "08:00", close: "19:00" },
  { open: "08:00", close: "19:00" },
  { open: "08:00", close: "20:00" },
  { open: "08:00", close: "19:00" },
  { open: "09:00", close: "14:00" },
];

export const afterHours = {
  name: "Fernhill Animal Emergency",
  address: "88 Quarry Road, Fernhill — 9 minutes by car from us",
  note: "Our own vets answer the emergency line while we are open. After hours the same number rings straight through to Fernhill Animal Emergency, the 24-hour hospital we share records with, so they see your pet's history before you arrive.",
};

/* ───────────── Home ───────────── */

export const home = {
  hero: {
    title: "Calm, unhurried vet care for dogs, cats and rabbits.",
    lede: "Twenty-minute appointments as standard, a separate cat waiting room, and the same vet each time if you want one. Four vets and two nurses on Alder Street, open six days.",
    image: {
      src: hero,
      alt: "A tabby cat sits on a steel exam table, held gently by a vet, looking straight at the camera",
      w: 711,
      h: 1023,
    } as Img,
    card: {
      pet: "Fennel",
      species: "Cat, 6 yrs",
      seen: "Dr. Okafor",
      note: "Weight steady at 4.6 kg. Booster given. Next check in 12 months.",
    },
  },
  calm: {
    title: "A visit your pet doesn't dread",
    body: "Most of what makes a vet visit stressful is the waiting room and the rush. We spend our time and our floor plan on removing both.",
    image: {
      src: calmCat,
      alt: "A vet crouches beside a relaxed tabby cat in a sunlit consult room, stroking its cheek",
      w: 1800,
      h: 1200,
    } as Img,
    points: [
      {
        title: "Cats never wait next to dogs",
        text: "A separate cat entrance and waiting room, with covered shelves for carriers.",
      },
      {
        title: "Twenty minutes, not ten",
        text: "Enough time to examine on the floor, talk it through and answer the second question.",
      },
      {
        title: "Treats, towels and pheromones",
        text: "Lick mats, warmed towels and calming diffusers in every consult room.",
      },
    ],
  },
  notes: [
    {
      quote:
        "Rufus used to have to be carried in. Now he pulls me through the door because Mei keeps the good biscuits.",
      name: "Grace L.",
      pet: "Rufus, 9, Labrador",
    },
    {
      quote:
        "Dr. Okafor talked us through Mabel's kidney results with a printout and a pencil. No rush, no jargon.",
      name: "Owen T.",
      pet: "Mabel, 15, domestic shorthair",
    },
    {
      quote:
        "Finally a clinic that knows rabbits. Clover's teeth are sorted and I understand what to watch for.",
      name: "Priya K.",
      pet: "Clover, 4, Netherland dwarf",
    },
  ],
  close: {
    title: "Book a visit in about two minutes.",
    body: "Pick a reason, a vet and a time that suits you. We'll confirm by text and send a reminder the day before.",
    image: {
      src: runningDogs,
      alt: "A corgi and a terrier run side by side down a dusty path in evening light",
      w: 1800,
      h: 1202,
    } as Img,
  },
};

/* ───────────── Services ───────────── */

export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  species: Species[];
  from: number;
  image: Img;
  extra?: Img;
  visits: { name: string; duration: string; price: number }[];
  steps: { title: string; text: string }[];
  prep: string[];
  faqs: { q: string; a: string }[];
  vets: string[];
  reason: string;
};

export const services: Service[] = [
  {
    slug: "wellness-and-vaccines",
    name: "Wellness exams & vaccines",
    short:
      "A nose-to-tail check every year, boosters planned around your pet's actual lifestyle.",
    intro:
      "Once a year we go over everything: teeth, ears, eyes, joints, heart, skin, weight and behaviour. We only give the vaccines your pet needs for how they live — a city indoor cat does not need what a farm dog does — and we write every dose into their record card.",
    species: ["dog", "cat", "rabbit"],
    from: 68,
    image: {
      src: puppy,
      alt: "A sleepy French bulldog puppy cradled in the crook of its owner's knitted sleeve",
      w: 1024,
      h: 683,
    },
    visits: [
      { name: "Annual wellness exam", duration: "20 min", price: 68 },
      { name: "Exam with core booster", duration: "20 min", price: 112 },
      { name: "Rabies vaccine (3-year)", duration: "add-on", price: 32 },
      { name: "Lepto / kennel cough booster", duration: "add-on", price: 38 },
      {
        name: "Rabbit RHD2 & myxomatosis combined",
        duration: "20 min",
        price: 84,
      },
    ],
    steps: [
      {
        title: "Weigh-in and history",
        text: "A nurse weighs your pet on the floor scale and asks what's changed since last year: appetite, thirst, energy, mobility.",
      },
      {
        title: "Nose-to-tail exam",
        text: "Your vet examines on the floor or the table — whichever your pet prefers — and talks you through every finding as they go.",
      },
      {
        title: "Vaccines that fit",
        text: "We check the record card and give only what's due. Lifestyle changed? So does the schedule.",
      },
      {
        title: "Plan for the year",
        text: "You leave with a printed summary, next due dates and a reminder set by text or email.",
      },
    ],
    prep: [
      "Bring any old vaccine records if this is your first visit.",
      "Note any changes in eating, drinking or toilet habits.",
      "Cats travel best in a carrier covered with a towel.",
    ],
    faqs: [
      {
        q: "Does my indoor cat really need vaccines?",
        a: "Usually yes for the core vaccine against cat flu and enteritis, since the viruses travel in on shoes. Indoor cats rarely need feline leukaemia boosters; we'll decide together.",
      },
      {
        q: "Can I do the exam without vaccines?",
        a: "Of course. Many older pets get titre tests instead of automatic boosters. We'll explain the options.",
      },
    ],
    vets: ["ines-marlow", "hana-okafor", "rowan-pike"],
    reason: "wellness",
  },
  {
    slug: "puppy-and-kitten",
    name: "Puppy & kitten start",
    short:
      "A course of three visits covering vaccines, worming, microchip and the first big questions.",
    intro:
      "The first four months set up a whole life. Our start course bundles the vaccine visits with time for the things new owners actually ask about — biting, litter, sleep, food, insurance — and a nurse session on handling so future visits stay easy.",
    species: ["dog", "cat"],
    from: 189,
    image: {
      src: kitten,
      alt: "A tiny spotted kitten held in a vet's gloved hand, peering over the fingers",
      w: 1024,
      h: 680,
    },
    visits: [
      {
        name: "Start course (3 vet visits + nurse session)",
        duration: "8–16 weeks",
        price: 189,
      },
      { name: "Single puppy or kitten exam", duration: "30 min", price: 72 },
      {
        name: "Microchip, implanted and registered",
        duration: "add-on",
        price: 45,
      },
      {
        name: "Handling & socialisation nurse visit",
        duration: "30 min",
        price: 0,
      },
    ],
    steps: [
      {
        title: "First vaccine at 8–9 weeks",
        text: "Full exam, first core vaccine, worming and flea advice. We give you a printed record card to bring each time.",
      },
      {
        title: "Second vaccine at 12 weeks",
        text: "Booster plus leptospirosis for puppies or leukaemia for kittens who'll go outdoors. Microchip if you'd like it.",
      },
      {
        title: "Final vaccine at 16 weeks",
        text: "The last puppy shot and rabies. We talk neutering timing and set up the first annual reminder.",
      },
      {
        title: "Handling session with a nurse",
        text: "A free half hour of treats, paw holding and ear checks so the clinic becomes a good place.",
      },
    ],
    prep: [
      "Bring a stool sample in a clean bag for the first visit.",
      "Bring the breeder or shelter paperwork.",
      "Arrive a little hungry — we use a lot of treats.",
    ],
    faqs: [
      {
        q: "When can my puppy go out for walks?",
        a: "One week after the 16-week vaccine. Before then, carry them around the block — socialising early matters more than people think.",
      },
      {
        q: "Is the nurse session really free?",
        a: "Yes. It saves everyone time on every future visit.",
      },
    ],
    vets: ["ines-marlow", "mei-lindqvist"],
    reason: "puppy",
  },
  {
    slug: "dental-care",
    name: "Dental care",
    short:
      "Checks, digital dental x-rays, cleaning under anaesthetic and extractions when needed.",
    intro:
      "Most dogs and cats over three have some dental disease, and most hide the pain well. Our dental suite has digital dental x-ray, so we can see the roots under the gum line — the part that actually hurts — before deciding on any extraction.",
    species: ["dog", "cat", "rabbit"],
    from: 55,
    image: {
      src: tabby,
      alt: "A green-eyed tabby cat gazes upward against a bright blue sky",
      w: 1400,
      h: 1400,
    },
    visits: [
      { name: "Dental check", duration: "20 min", price: 55 },
      {
        name: "Scale & polish under anaesthetic, with x-rays",
        duration: "day visit",
        price: 420,
      },
      { name: "Simple extraction (each)", duration: "add-on", price: 65 },
      {
        name: "Rabbit tooth burr under sedation",
        duration: "day visit",
        price: 180,
      },
    ],
    steps: [
      {
        title: "Awake check and estimate",
        text: "We look at every tooth we can, grade the gums, and give you a written estimate with a range, not a surprise.",
      },
      {
        title: "Pre-anaesthetic bloods",
        text: "A quick in-house blood test the morning of the procedure, so the anaesthetic is tailored to your pet.",
      },
      {
        title: "Full-mouth x-ray and clean",
        text: "A nurse monitors throughout while the vet charts, x-rays and cleans each tooth above and below the gum line.",
      },
      {
        title: "Home the same afternoon",
        text: "We call when they're awake, then go over the dental chart with you at pick-up, including the photos.",
      },
    ],
    prep: [
      "No food after 10 pm the night before; water is fine.",
      "Drop-off between 8:00 and 8:30 am.",
      "Rabbits should not be fasted — bring their usual hay.",
    ],
    faqs: [
      {
        q: "Can you clean teeth without anaesthetic?",
        a: "Not properly. Anaesthesia-free cleaning only polishes the visible crown and can hide disease below the gum.",
      },
      {
        q: "How do I know if my pet has tooth pain?",
        a: "Chewing on one side, dropping food, pawing at the mouth, bad breath or simply being grumpier. Many show no signs at all.",
      },
    ],
    vets: ["tomas-reyes", "rowan-pike"],
    reason: "dental",
  },
  {
    slug: "surgery",
    name: "Surgery & neutering",
    short:
      "Routine and soft-tissue surgery with dedicated anaesthesia monitoring and pain relief.",
    intro:
      "Every surgical patient has a nurse whose only job is the anaesthetic: warmed fluids, heart and oxygen monitors, and a written pain plan that goes home with you. Neutering, lump removals, wound repairs and abdominal surgery are all done in-house.",
    species: ["dog", "cat", "rabbit"],
    from: 180,
    image: {
      src: surgery,
      alt: "A bright, tidy surgical suite with an operating table, anaesthesia machine and overhead lights",
      w: 1024,
      h: 683,
    },
    visits: [
      { name: "Cat neuter (male / female)", duration: "day visit", price: 180 },
      { name: "Dog neuter (under 20 kg)", duration: "day visit", price: 340 },
      { name: "Rabbit neuter", duration: "day visit", price: 210 },
      {
        name: "Lump removal with lab analysis",
        duration: "day visit",
        price: 390,
      },
      { name: "Surgery consultation", duration: "20 min", price: 60 },
    ],
    steps: [
      {
        title: "Consult and written estimate",
        text: "We examine, explain the procedure and its risks, and give you a written estimate before booking.",
      },
      {
        title: "Admit and bloods",
        text: "Morning drop-off, a pre-anaesthetic blood test, and a cosy kennel lined with a blanket from home.",
      },
      {
        title: "Surgery with a dedicated nurse",
        text: "Monitored anaesthesia, local blocks and long-acting pain relief, then recovery under heat pads.",
      },
      {
        title: "Free post-op checks",
        text: "A text update when they wake and free wound checks at 3 and 10 days.",
      },
    ],
    prep: [
      "No food after 10 pm the night before; water until morning.",
      "Bring a blanket or T-shirt that smells of home.",
      "Plan a quiet evening — they'll be sleepy.",
    ],
    faqs: [
      {
        q: "When should I neuter?",
        a: "Cats from 4 months. For dogs it depends on breed and size — large breeds often benefit from waiting. We'll recommend a timing for yours.",
      },
      {
        q: "Will they need a cone?",
        a: "Usually a soft recovery suit or a soft cone for 10 days. We'll fit it before you go.",
      },
    ],
    vets: ["ines-marlow", "tomas-reyes"],
    reason: "surgery",
  },
  {
    slug: "pain-and-rehab",
    name: "Pain relief & rehab",
    short:
      "Arthritis management, laser therapy and guided physio after surgery or injury.",
    intro:
      "Slowing down is not just old age. Our rehab clinic combines pain medication, therapeutic laser and a home exercise plan, with progress measured on the same mobility chart at each visit so you can see what's working.",
    species: ["dog", "cat"],
    from: 55,
    image: {
      src: laser,
      alt: "Two vet staff in protective glasses apply therapeutic laser to a fluffy grey cat on a table",
      w: 894,
      h: 1024,
    },
    visits: [
      { name: "Mobility assessment", duration: "40 min", price: 98 },
      { name: "Laser therapy session", duration: "15 min", price: 55 },
      { name: "Laser course (6 sessions)", duration: "3 weeks", price: 290 },
      {
        name: "Monthly arthritis injection",
        duration: "nurse visit",
        price: 74,
      },
    ],
    steps: [
      {
        title: "Mobility assessment",
        text: "We watch your pet walk, sit and turn, score each joint and agree on goals you can check at home.",
      },
      {
        title: "Pain plan",
        text: "Medication where it helps, with blood monitoring for long-term use.",
      },
      {
        title: "Laser and physio",
        text: "Short, painless laser sessions — most pets fall asleep — plus exercises you'll practise with a nurse.",
      },
      {
        title: "Re-score every three weeks",
        text: "The same chart each time, so changes are measured rather than guessed.",
      },
    ],
    prep: [
      "Film a short clip of your pet on stairs or jumping at home.",
      "Bring a list of current medicines and supplements.",
    ],
    faqs: [
      {
        q: "Does laser therapy hurt?",
        a: "No. It feels like gentle warmth. Everyone in the room wears glasses, including some patients.",
      },
      {
        q: "Can cats really get arthritis?",
        a: "Most cats over 12 do. They stop jumping up rather than limping, so it's easy to miss.",
      },
    ],
    vets: ["sam-adeyemi", "hana-okafor"],
    reason: "rehab",
  },
  {
    slug: "senior-care",
    name: "Senior pet clinic",
    short:
      "Six-monthly screens for pets over eight: bloods, blood pressure, weight and comfort.",
    intro:
      "Older pets change quickly, and the early signs of kidney, thyroid and heart disease are quiet ones. Our senior screen catches them while they're still easy to manage, and we keep the visit gentle: floor exams, padded mats and no rushing.",
    species: ["dog", "cat"],
    from: 145,
    image: {
      src: schnauzer,
      alt: "A grey miniature schnauzer wearing round spectacles sits against a white backdrop",
      w: 933,
      h: 1400,
    },
    visits: [
      {
        name: "Senior screen (exam, bloods, urine, blood pressure)",
        duration: "40 min",
        price: 145,
      },
      { name: "Blood pressure check", duration: "nurse visit", price: 30 },
      { name: "Quality-of-life consultation", duration: "40 min", price: 85 },
    ],
    steps: [
      {
        title: "Comfort first",
        text: "A quiet room, a padded mat, and as much of the exam as possible done where your pet is lying.",
      },
      {
        title: "Bloods and urine",
        text: "Run in our in-house lab — results before you leave for most tests.",
      },
      {
        title: "Blood pressure",
        text: "Measured with a tail or leg cuff after ten minutes of settling, so the reading means something.",
      },
      {
        title: "A written trend",
        text: "We chart each result against last time, so you can see slow change at a glance.",
      },
    ],
    prep: [
      "Fast for 6 hours if you can (water is fine).",
      "Bring a fresh urine sample if you can catch one.",
    ],
    faqs: [
      {
        q: "When is my pet a senior?",
        a: "From about 8 for most dogs, 6 for giant breeds, and 10 for cats.",
      },
      {
        q: "What is a quality-of-life consultation?",
        a: "Unhurried time to talk through comfort, pain and the hard decisions, with no examination fee if you'd rather just talk.",
      },
    ],
    vets: ["hana-okafor", "ines-marlow"],
    reason: "senior",
  },
  {
    slug: "rabbits-and-small-pets",
    name: "Rabbits & small pets",
    short:
      "Rabbit-savvy vets for teeth, gut stasis, vaccines and neutering — plus guinea pigs and rats.",
    intro:
      "Rabbits are prey animals who hide illness until it's serious, and their teeth and guts need someone who sees them every week. Dr. Pike runs our rabbit and small-pet list, with a quiet ward away from dogs and cats and hay always in stock.",
    species: ["rabbit"],
    from: 62,
    image: {
      src: rabbit,
      alt: "A white and fawn lop-eared rabbit sits in short green grass",
      w: 1075,
      h: 1400,
    },
    extra: {
      src: hamster,
      alt: "A golden hamster sits up on a white surface, holding its front paws together",
      w: 1000,
      h: 662,
    },
    visits: [
      { name: "Rabbit or guinea pig exam", duration: "20 min", price: 62 },
      {
        name: "Rabbit RHD2 & myxomatosis vaccine",
        duration: "20 min",
        price: 84,
      },
      { name: "Gut stasis same-day assessment", duration: "30 min", price: 96 },
      {
        name: "Small mammal nail & teeth check",
        duration: "nurse visit",
        price: 22,
      },
    ],
    steps: [
      {
        title: "Quiet arrival",
        text: "Rabbits wait in our cat room or in the car if they prefer; we'll fetch you.",
      },
      {
        title: "Teeth with an otoscope",
        text: "We check the back teeth, where spurs form, at every visit.",
      },
      {
        title: "Gut and diet review",
        text: "Weight, body condition and droppings, plus a frank chat about hay versus pellets.",
      },
      {
        title: "A plan you can follow",
        text: "Printed diet and handling notes, and our same-day promise for gut stasis.",
      },
    ],
    prep: [
      "Bring a pair if they're bonded — they fret apart.",
      "Pack hay and their usual greens.",
      "Don't fast rabbits before any procedure.",
    ],
    faqs: [
      {
        q: "My rabbit hasn't eaten for 8 hours — is that urgent?",
        a: "Yes. Call us straight away. Gut stasis is an emergency in rabbits and we see it the same day.",
      },
      {
        q: "Do you see reptiles or birds?",
        a: "Not at the moment. We'll refer you to an exotics specialist and share your pet's records.",
      },
    ],
    vets: ["rowan-pike"],
    reason: "rabbit",
  },
  {
    slug: "behaviour",
    name: "Behaviour & calm visits",
    short:
      "Help for fear, aggression and anxiety — and happy visits that make the clinic boring.",
    intro:
      "A pet that's frightened of the vet gets examined less, and that costs them. Our head nurse runs behaviour consults and free happy visits, and every vet here plans appointments around your pet's stress level, not the clock.",
    species: ["dog", "cat"],
    from: 0,
    image: {
      src: catDog,
      alt: "A tabby cat and a black-and-white puppy lie side by side in the grass",
      w: 1600,
      h: 1067,
    },
    visits: [
      {
        name: "Happy visit (treats, scale, leave)",
        duration: "10 min",
        price: 0,
      },
      { name: "Behaviour consultation", duration: "60 min", price: 120 },
      { name: "Follow-up call", duration: "20 min", price: 35 },
      {
        name: "Pre-visit calming medication plan",
        duration: "add-on",
        price: 18,
      },
    ],
    steps: [
      {
        title: "History at home",
        text: "A questionnaire and a couple of videos before you come, so we don't need to trigger the behaviour to see it.",
      },
      {
        title: "The consultation",
        text: "An hour in a quiet room, mostly talking, with your pet free to explore or hide.",
      },
      {
        title: "A written plan",
        text: "Small, specific steps, sometimes medication, never punishment.",
      },
      {
        title: "Check-ins",
        text: "Follow-up calls at two and six weeks to adjust the plan.",
      },
    ],
    prep: [
      "Bring high-value treats your pet loves.",
      "Come hungry — they, not you.",
    ],
    faqs: [
      {
        q: "My dog has to be muzzled at the vet. Will you judge?",
        a: "Never. Muzzle training is good care. We'll often suggest it.",
      },
      {
        q: "What's a happy visit?",
        a: "Pop in during opening hours, step on the scale, get fussed and fed, and go home. No needles, no charge.",
      },
    ],
    vets: ["mei-lindqvist", "ines-marlow"],
    reason: "behaviour",
  },
  {
    slug: "microchips-and-travel",
    name: "Microchips & travel papers",
    short:
      "Microchipping, international health certificates and pre-travel rabies titres.",
    intro:
      "Moving abroad or heading on a road trip? We handle the paperwork side of travel: microchips, rabies titres, official health certificates and the deadlines that catch people out. Start at least four months before an international move.",
    species: ["dog", "cat"],
    from: 45,
    image: {
      src: seaDog,
      alt: "A ginger retriever runs out of the sea surf toward the camera at sunset",
      w: 935,
      h: 1400,
    },
    visits: [
      {
        name: "Microchip, implanted and registered",
        duration: "nurse visit",
        price: 45,
      },
      { name: "Domestic health certificate", duration: "20 min", price: 95 },
      {
        name: "International health certificate",
        duration: "40 min",
        price: 210,
      },
      { name: "Rabies titre blood test", duration: "nurse visit", price: 140 },
    ],
    steps: [
      {
        title: "Planning call",
        text: "Tell us the destination and date; we draw up a dated checklist from the destination's rules.",
      },
      {
        title: "Microchip and rabies",
        text: "The chip goes in first, then the rabies vaccine — order matters for most countries.",
      },
      {
        title: "Titre and waiting period",
        text: "If needed, a blood test sent to an approved lab, then the mandatory wait.",
      },
      {
        title: "Certificate",
        text: "A signed certificate within the window your destination requires.",
      },
    ],
    prep: [
      "Bring flight details and any import forms.",
      "Check your pet's microchip still reads — we scan for free any time.",
    ],
    faqs: [
      {
        q: "How early should I start for international travel?",
        a: "Four to six months for most destinations that require a rabies titre.",
      },
      {
        q: "Can you scan a stray I found?",
        a: "Yes, any time we're open, free of charge.",
      },
    ],
    vets: ["tomas-reyes", "sam-adeyemi"],
    reason: "nurse",
  },
];

/* ───────────── Vets ───────────── */

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Vet = {
  slug: string;
  name: string;
  short: string;
  role: string;
  credentials: string;
  since: number;
  interests: string[];
  species: Species[];
  days: Day[];
  languages: string[];
  bio: string[];
  pet: { name: string; about: string; image: Img };
  quote: string;
  bookable: boolean;
};

export const vets: Vet[] = [
  {
    slug: "ines-marlow",
    name: "Dr. Ines Marlow",
    short: "Dr. Marlow",
    role: "Founder & veterinarian",
    credentials: "DVM, Oregon State, 2001",
    since: 2009,
    interests: [
      "General practice",
      "Soft-tissue surgery",
      "Puppy & kitten care",
    ],
    species: ["dog", "cat"],
    days: ["Mon", "Tue", "Thu", "Fri"],
    languages: ["English", "Portuguese"],
    bio: [
      "Ines opened Whisker in 2009 in a former bakery on Alder Street, after eight years in a busy hospital where appointments ran ten minutes. The twenty-minute standard was her first rule.",
      "She does most of our soft-tissue surgery and still sees a full list of first-time puppy and kitten owners, because she likes to meet patients at the start.",
    ],
    pet: {
      name: "Pickle",
      about: "Beagle, 11. Has eaten a sock twice.",
      image: {
        src: beagle,
        alt: "A grinning beagle with its tongue out, photographed outdoors",
        w: 1000,
        h: 750,
      },
    },
    quote:
      "If an owner leaves with a question they didn't get to ask, the appointment was too short.",
    bookable: true,
  },
  {
    slug: "tomas-reyes",
    name: "Dr. Tomás Reyes",
    short: "Dr. Reyes",
    role: "Veterinarian, dentistry & anaesthesia",
    credentials:
      "DVM, UC Davis, 2012 · Advanced certificate in veterinary dentistry",
    since: 2015,
    interests: [
      "Dentistry & oral surgery",
      "Anaesthesia",
      "Travel certificates",
    ],
    species: ["dog", "cat", "rabbit"],
    days: ["Mon", "Wed", "Thu", "Sat"],
    languages: ["English", "Spanish"],
    bio: [
      "Tomás set up our dental suite and digital dental x-ray, and leads the anaesthesia protocols used across the clinic.",
      "He signs most of our international travel certificates and keeps a running spreadsheet of every country's import rules, which he will show you whether you ask or not.",
    ],
    pet: {
      name: "Mochi",
      about: "French bulldog, 4. Snores in every language.",
      image: {
        src: frenchie,
        alt: "A fawn French bulldog in a yellow hoodie looks over its shoulder against a blue wall",
        w: 800,
        h: 1000,
      },
    },
    quote:
      "You can't treat what you can't see. Dental x-rays changed half of my treatment plans.",
    bookable: true,
  },
  {
    slug: "hana-okafor",
    name: "Dr. Hana Okafor",
    short: "Dr. Okafor",
    role: "Veterinarian, feline & senior medicine",
    credentials: "BVSc, University of Bristol, 2010",
    since: 2016,
    interests: ["Feline medicine", "Senior & kidney care", "Pain management"],
    species: ["cat", "dog"],
    days: ["Tue", "Wed", "Fri", "Sat"],
    languages: ["English", "Igbo"],
    bio: [
      "Hana designed our cat-only waiting room and runs the senior clinic, where most of her patients are cats over twelve with kidneys to keep an eye on.",
      "She is known for drawing results on paper during consults and sending owners home with the drawing.",
    ],
    pet: {
      name: "Domino",
      about: "Tuxedo cat, 14. Kidneys stable, opinions strong.",
      image: {
        src: tuxedoCat,
        alt: "A black-and-white tuxedo cat peers over a wooden ledge against a green wall",
        w: 1000,
        h: 688,
      },
    },
    quote: "Cats tell you everything if you give them ten quiet minutes first.",
    bookable: true,
  },
  {
    slug: "rowan-pike",
    name: "Dr. Rowan Pike",
    short: "Dr. Pike",
    role: "Veterinarian, rabbits & small pets",
    credentials: "DVM, Cornell, 2017 · Rabbit medicine and surgery certificate",
    since: 2019,
    interests: ["Rabbit medicine", "Guinea pigs & rats", "Dental burring"],
    species: ["rabbit", "dog", "cat"],
    days: ["Mon", "Tue", "Wed", "Thu"],
    languages: ["English"],
    bio: [
      "Rowan joined to build our rabbit and small-pet service and now sees around forty rabbits a week, from routine vaccines to gut stasis at 6 pm on a Thursday.",
      "Rowan teaches a free rabbit-care evening for new owners every spring.",
    ],
    pet: {
      name: "Juno",
      about: "Cocker spaniel, 3. Lives with two rabbits, outranks neither.",
      image: {
        src: spaniel,
        alt: "A blonde cocker spaniel lies on its back in the grass, ears flopped out, grinning",
        w: 750,
        h: 1000,
      },
    },
    quote:
      "Rabbits hide pain because they're prey. Our job is to notice the small things.",
    bookable: true,
  },
  {
    slug: "mei-lindqvist",
    name: "Mei Lindqvist",
    short: "Mei",
    role: "Head nurse, behaviour",
    credentials: "RVT · Certified in low-stress handling",
    since: 2011,
    interests: ["Behaviour consults", "Happy visits", "Puppy handling"],
    species: ["dog", "cat"],
    days: ["Mon", "Tue", "Wed", "Fri", "Sat"],
    languages: ["English", "Swedish", "Mandarin"],
    bio: [
      "Mei has run the nursing team since 2011 and is the reason we have a treat budget. She leads behaviour consultations and every free happy visit.",
      "Ask her about muzzle training. Make time.",
    ],
    pet: {
      name: "Bear",
      about: "Samoyed, 7. Sheds a second Samoyed every spring.",
      image: {
        src: samoyed,
        alt: "A fluffy white Samoyed sits smiling against a pink backdrop scattered with confetti",
        w: 667,
        h: 1000,
      },
    },
    quote: "A boring vet visit is a successful vet visit.",
    bookable: false,
  },
  {
    slug: "sam-adeyemi",
    name: "Sam Adeyemi",
    short: "Sam",
    role: "Nurse, rehab & weight clinic",
    credentials: "RVT · Canine rehabilitation assistant",
    since: 2020,
    interests: ["Laser therapy", "Weight clinics", "Microchipping"],
    species: ["dog", "cat"],
    days: ["Tue", "Thu", "Fri", "Sat"],
    languages: ["English", "Yoruba"],
    bio: [
      "Sam runs our weight and rehab clinics, including the laser sessions most patients sleep through.",
      "Sam keeps the mobility charts and will text you a photo of your dog's progress line.",
    ],
    pet: {
      name: "Kite",
      about: "Australian shepherd, 5. Needs a job, has several.",
      image: {
        src: aussie,
        alt: "A brown-and-white Australian shepherd grins on a sandy beach",
        w: 1000,
        h: 667,
      },
    },
    quote:
      "Small, regular wins. A dog who can do stairs again is the whole point.",
    bookable: false,
  },
];

/* ───────────── Plans ───────────── */

export type Plan = {
  id: string;
  name: string;
  forWho: string;
  /** Monthly price for a cat; dogs and rabbits use the multipliers below. */
  base: number;
  includes: string[];
  featured?: boolean;
};

export const planMultiplier: Record<string, number> = {
  cat: 1,
  rabbit: 0.85,
  "dog-small": 1.1,
  "dog-medium": 1.25,
  "dog-large": 1.45,
};

export const planPets = [
  { id: "cat", label: "Cat" },
  { id: "rabbit", label: "Rabbit" },
  { id: "dog-small", label: "Dog under 10 kg" },
  { id: "dog-medium", label: "Dog 10–25 kg" },
  { id: "dog-large", label: "Dog over 25 kg" },
];

export const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    forWho: "Puppies & kittens, first year",
    base: 24,
    includes: [
      "Full start course: 3 vaccine visits",
      "Microchip, implanted and registered",
      "Flea, tick & worming for 12 months",
      "Neutering at 15% off",
      "Unlimited nurse visits",
    ],
  },
  {
    id: "everyday",
    name: "Everyday",
    forWho: "Adult pets, 1–8 years",
    base: 21,
    featured: true,
    includes: [
      "Two wellness exams a year",
      "All core boosters",
      "Flea, tick & worming for 12 months",
      "Annual dental check",
      "10% off everything else",
      "Unlimited nurse visits",
    ],
  },
  {
    id: "senior",
    name: "Senior",
    forWho: "Pets over 8 (cats over 10)",
    base: 34,
    includes: [
      "Two senior screens a year with bloods",
      "Quarterly blood pressure checks",
      "All core boosters",
      "Flea, tick & worming for 12 months",
      "15% off medication",
      "Unlimited nurse visits",
    ],
  },
];

export const planCompare = [
  { item: "Wellness exams", values: ["3 visits", "2 a year", "2 a year"] },
  { item: "Core vaccines", values: [true, true, true] },
  { item: "Parasite prevention", values: [true, true, true] },
  { item: "In-house blood tests", values: [false, false, "2 a year"] },
  { item: "Dental check", values: [false, true, true] },
  {
    item: "Discount on other care",
    values: ["15% neutering", "10%", "15% medication"],
  },
  { item: "Nurse visits", values: ["Unlimited", "Unlimited", "Unlimited"] },
];

export const planFaqs = [
  {
    q: "Is a health plan the same as insurance?",
    a: "No. A plan spreads the cost of routine care you know your pet needs. Insurance covers the unexpected. Most of our clients have both.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time after the first 12 months. Within the first year we only charge the difference between what you've paid and the full price of care already received.",
  },
  {
    q: "What does yearly billing save?",
    a: "Paying for the year up front costs the same as 11 monthly payments, so one month is on us.",
  },
  {
    q: "My pet has an existing condition. Can they join?",
    a: "Yes. Plans cover routine care, so existing conditions make no difference to eligibility or price.",
  },
];

/* ───────────── Booking ───────────── */

export const appointmentTypes = [
  { id: "wellness", name: "Wellness exam & vaccines", minutes: 20, price: 68 },
  {
    id: "sick",
    name: "Sick or injured pet (not urgent)",
    minutes: 20,
    price: 78,
  },
  { id: "puppy", name: "Puppy or kitten visit", minutes: 30, price: 72 },
  { id: "dental", name: "Dental check", minutes: 20, price: 55 },
  { id: "senior", name: "Senior screen", minutes: 40, price: 145 },
  { id: "rabbit", name: "Rabbit or small pet exam", minutes: 20, price: 62 },
  { id: "rehab", name: "Mobility assessment", minutes: 40, price: 98 },
  { id: "behaviour", name: "Behaviour consultation", minutes: 60, price: 120 },
  { id: "surgery", name: "Surgery consultation", minutes: 20, price: 60 },
  {
    id: "nurse",
    name: "Nurse clinic: nails, weight, microchip",
    minutes: 15,
    price: 28,
  },
];

/* ───────────── Emergency ───────────── */

export const emergency = {
  title: "If it can't wait, call before you drive.",
  lede: "Phone first, even while you're getting in the car. We'll tell you whether to come to us or straight to the 24-hour hospital, and get the room ready.",
  now: [
    "Struggling to breathe, blue or pale gums",
    "A swollen, hard belly with retching that brings nothing up",
    "A male cat straining in the litter tray with little or no urine",
    "A seizure lasting more than 3 minutes, or several in a row",
    "Hit by a car or fallen from a height, even if they seem fine",
    "Eaten something toxic — see the list below",
    "Collapse, or unable to stand",
    "A rabbit that hasn't eaten or passed droppings for 8 hours",
  ],
  today: [
    "Vomiting or diarrhoea more than twice in a day",
    "Limping that doesn't ease after rest",
    "Eye that is squinting, cloudy or watering",
    "Not eating for 24 hours (dogs and cats)",
    "A wound that's deep or won't stop oozing",
  ],
  steps: [
    {
      title: "Call us",
      text: "Ring the emergency line. Tell us the species, weight and what happened. Keep the phone on — we may call back with instructions.",
    },
    {
      title: "Keep them still and warm",
      text: "Slide a towel or board underneath to lift an injured pet. Cover with a blanket unless they're overheated.",
    },
    {
      title: "Bring the evidence",
      text: "Packaging, plant cutting or a photo of what they ate. Note the time it happened.",
    },
    {
      title: "Drive steady",
      text: "Ask someone to sit with your pet if you can. Never give human painkillers on the way.",
    },
  ],
  toxins: [
    {
      item: "Chocolate (dark and baking especially)",
      who: "Dogs",
      urgency: "Call now",
    },
    { item: "Grapes, raisins, currants", who: "Dogs", urgency: "Call now" },
    {
      item: "Xylitol (sugar-free gum, some peanut butter)",
      who: "Dogs",
      urgency: "Call now",
    },
    {
      item: "Lilies — any part, even pollen or vase water",
      who: "Cats",
      urgency: "Call now",
    },
    {
      item: "Ibuprofen, naproxen, paracetamol",
      who: "Dogs & cats",
      urgency: "Call now",
    },
    { item: "Rat and mouse bait", who: "All pets", urgency: "Call now" },
    {
      item: "Antifreeze (sweet-tasting)",
      who: "All pets",
      urgency: "Call now",
    },
    {
      item: "Permethrin dog flea treatments",
      who: "Cats",
      urgency: "Call now",
    },
    {
      item: "Onions, garlic, chives",
      who: "Dogs & cats",
      urgency: "Call today",
    },
  ],
  fees: [
    { item: "Urgent same-day appointment, during opening hours", price: 98 },
    { item: "Emergency consultation, during opening hours", price: 145 },
    {
      item: "After-hours exam at Fernhill Animal Emergency (their fee)",
      price: 210,
    },
  ],
};

/* ───────────── Visit ───────────── */

export const visit = {
  title: "Visiting the clinic",
  lede: "We're a converted 1920s bakery on Alder Street, with free parking behind the building and separate front doors for cats and dogs.",
  firstVisit: [
    "Previous vaccine records or the name of your old clinic — we'll request the history for you",
    "Any medicines or food your pet is on, or a photo of the label",
    "Dogs on a short lead; cats and rabbits in a secure carrier",
    "A stool sample for puppies, kittens and tummy troubles",
  ],
  getting: [
    {
      title: "By car",
      text: "Free parking for 14 cars behind the clinic, entered from Birch Lane. Two bays are reserved for urgent cases.",
    },
    {
      title: "By bus",
      text: "Lines 6 and 14 stop at Alder & 3rd, a two-minute walk. Pets in carriers ride free.",
    },
    {
      title: "On foot",
      text: "The dog door faces Alder Street. The cat door is around the corner on Birch Lane, with a quieter path.",
    },
  ],
  policies: [
    {
      title: "Payment",
      text: "Card, cash or tap at the end of each visit. For procedures over $500, we take a 30% deposit at admission. Health-plan members pay nothing for included care.",
    },
    {
      title: "Insurance",
      text: "We'll send claim forms directly to most pet insurers. You pay us and the insurer reimburses you.",
    },
    {
      title: "Cancellations",
      text: "Cancel or move a booking up to 24 hours ahead at no charge. Late cancellations of surgery slots carry a $40 fee.",
    },
    {
      title: "Prescriptions",
      text: "Repeat prescriptions are ready within one working day of your request. Written prescriptions cost $18.",
    },
  ],
  faqs: [
    {
      q: "Are you taking new clients?",
      a: "Yes — for dogs, cats, rabbits, guinea pigs and pet rats. Book a first visit online or call us.",
    },
    {
      q: "Can I stay with my pet during the exam?",
      a: "Always, for consultations. For blood tests and x-rays we'll ask; many pets are calmer with you there.",
    },
    {
      q: "Do you make house calls?",
      a: "For euthanasia and for very anxious or immobile pets within Fernhill, yes. Call to arrange.",
    },
    {
      q: "Is there step-free access?",
      a: "Both entrances are step-free, and the lift scale in Consult 1 takes giant breeds without lifting.",
    },
  ],
};

/* ───────────── About ───────────── */

export const about = {
  title: "A small clinic that knows your pet's name before you say it.",
  lede: "Whisker opened in 2009 in a former bakery on Alder Street with one vet, one nurse and a secondhand x-ray machine. We've grown to six clinicians and kept the things that made it work.",
  image: {
    src: highFive,
    alt: "A person's hand meets a tabby cat's raised paw in a high five on a sofa",
    w: 683,
    h: 1024,
  } as Img,
  timeline: [
    {
      year: "2009",
      text: "Dr. Ines Marlow opens Whisker in the old Hoffmann bakery. The bread ovens become the dental suite later.",
    },
    {
      year: "2011",
      text: "Mei Lindqvist joins and starts free happy visits. The treat budget triples.",
    },
    {
      year: "2016",
      text: "The cat-only entrance and waiting room open on Birch Lane.",
    },
    {
      year: "2019",
      text: "Rabbit and small-pet service launches with Dr. Rowan Pike.",
    },
    {
      year: "2023",
      text: "In-house lab and digital dental x-ray. Most results now arrive before you leave.",
    },
    { year: "2026", text: "Health plans reach 1,200 Fernhill pets." },
  ],
  principles: [
    {
      title: "Twenty minutes as standard",
      text: "Longer consults mean fewer missed things, fewer repeat visits and calmer pets.",
    },
    {
      title: "Written estimates, always",
      text: "A range in writing before any procedure, and a call before we go over it.",
    },
    {
      title: "The same vet, if you want",
      text: "We book continuity by default: your pet's usual vet unless you ask otherwise.",
    },
    {
      title: "We refer when we should",
      text: "To specialists, to the 24-hour hospital, or to a second opinion — and we send the full record.",
    },
  ],
  facilities: [
    "Separate cat and dog entrances and waiting rooms",
    "Three consult rooms with floor mats and lift-table scale",
    "In-house laboratory for bloods, urine and cytology",
    "Digital x-ray, dental x-ray and ultrasound",
    "Surgical suite with dedicated anaesthesia monitoring",
    "Quiet ward for cats and rabbits, away from dogs",
  ],
  community:
    "We vaccinate and neuter for the Fernhill Cat Rescue at cost every second Saturday, and run a free rabbit-care evening each spring.",
};

/* ───────────── Care planner ───────────── */

export const planner = {
  title: "When is your pet due?",
  lede: "Tell us who they are and when they were born. We'll draw up their vaccine and check-up card for the next two years, the same way we fill in the paper one at the front desk.",
  notes: [
    {
      title: "Why the dates differ",
      text: "Schedules follow common North American guidance. Your vet may move dates for travel, boarding, lifestyle or health — the card is a guide, not a prescription.",
    },
    {
      title: "Stamped means given",
      text: "Tick off what's already been done and we'll stamp it. Your card stays on this device only.",
    },
    {
      title: "Missed one?",
      text: "A late booster is rarely a problem if it's caught within a few months. Book a wellness visit and we'll get back on track.",
    },
  ],
};

export const newsletter = {
  title: "The seasonal note",
  body: "Four short emails a year: tick season, holiday hazards, fireworks, and what's new at the clinic.",
};
