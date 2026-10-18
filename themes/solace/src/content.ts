import hero from "./assets/hero.jpg";
import wellChild from "./assets/well-child.jpg";
import vaccinations from "./assets/vaccinations.jpg";
import sameDay from "./assets/same-day.jpg";
import longTerm from "./assets/long-term.jpg";
import newParents from "./assets/new-parents.jpg";
import mentalHealth from "./assets/mental-health.jpg";
import healthyAgeing from "./assets/healthy-ageing.jpg";
import checkUps from "./assets/check-ups.jpg";
import prescriptions from "./assets/prescriptions.jpg";
import family from "./assets/family.jpg";
import together from "./assets/together.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Solace",
  full: "Solace Family Health",
  sector: "Family health clinic",
  tagline: "Family medicine with room to talk, from newborns to grandparents.",
  city: "Alder Bay",
  phone: "+1 555 014 2010",
  phoneHref: "tel:+15550142010",
  nurseLine: "+1 555 014 2099",
  nurseLineHref: "tel:+15550142099",
  email: "hello@solace.example",
  careersEmail: "careers@solace.example",
  utility: "Same-day appointments open at 7:30 am every weekday",
  emergency:
    "Chest pain, trouble breathing or a serious injury? Call 911 now — don’t book online.",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/clinicians", label: "Clinicians" },
  { to: "/patients", label: "Patient info" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
];

export const images = { hero, family, together, prescriptions };

/* -------------------------------------------------------------- locations */

/** [open, close] in minutes after midnight, indexed Sunday (0) … Saturday (6); null = closed. */
export type Hours = ([number, number] | null)[];

export type Location = {
  slug: string;
  name: string;
  street: string;
  area: string;
  phone: string;
  phoneHref: string;
  hours: Hours;
  note: string;
  getting: string;
  access: string;
  extras: string[];
  /** Position on the authored map (viewBox 0 0 640 420). */
  pin: [number, number];
};

const h = (time: string) => {
  const [hh, mm] = time.split(":").map(Number);
  return hh * 60 + mm;
};

export const locations: Location[] = [
  {
    slug: "harbourside",
    name: "Harbourside",
    street: "14 Harbour Row",
    area: "Alder Bay, AB 40211",
    phone: "+1 555 014 2010",
    phoneHref: "tel:+15550142010",
    hours: [
      null,
      [h("7:30"), h("19:00")],
      [h("7:30"), h("19:00")],
      [h("7:30"), h("19:00")],
      [h("7:30"), h("19:00")],
      [h("7:30"), h("19:00")],
      [h("9:00"), h("13:00")],
    ],
    note: "Our first clinic, in the old Harbour Row bakery. Blood draws, the Saturday morning clinic and the nurse team are based here.",
    getting:
      "Bus 4 and 11 stop outside. Free 90-minute parking behind the building on Cooper Lane.",
    access:
      "Step-free entrance, lift to the first floor, a quiet room off reception and an accessible changing table.",
    extras: [
      "Blood tests 7:30–10:00 am",
      "Saturday clinic",
      "Pharmacy next door",
    ],
    pin: [208, 268],
  },
  {
    slug: "northfield",
    name: "Northfield",
    street: "220 Orchard Avenue",
    area: "Alder Bay, AB 40214",
    phone: "+1 555 014 2030",
    phoneHref: "tel:+15550142030",
    hours: [
      null,
      [h("8:00"), h("18:00")],
      [h("8:00"), h("18:00")],
      [h("8:00"), h("18:00")],
      [h("8:00"), h("18:00")],
      [h("8:00"), h("18:00")],
      null,
    ],
    note: "Our children’s and family clinic, with a separate waiting room for babies and a garden for the restless.",
    getting:
      "Five minutes from Northfield school. Bus 7 to Orchard & Pine. Twelve parking spaces, two for parents with buggies.",
    access:
      "All on one floor. Changing and feeding room, buggy parking inside the door.",
    extras: [
      "Baby clinic Tuesday mornings",
      "School vaccine catch-ups",
      "Feeding room",
    ],
    pin: [438, 92],
  },
  {
    slug: "linden",
    name: "Linden Street",
    street: "61 Linden Street, Suite 2",
    area: "Alder Bay, AB 40218",
    phone: "+1 555 014 2050",
    phoneHref: "tel:+15550142050",
    hours: [
      null,
      [h("8:30"), h("17:00")],
      [h("8:30"), h("17:00")],
      [h("12:00"), h("20:00")],
      [h("8:30"), h("17:00")],
      [h("8:30"), h("14:00")],
      null,
    ],
    note: "A smaller clinic above the library, with a late Wednesday clinic for people who can’t leave work in the day.",
    getting:
      "Linden Street station is two minutes away. Paid parking in the library garage; we validate one hour.",
    access:
      "Lift from the library lobby. Hearing loop at reception. Counselling rooms are soundproofed.",
    extras: [
      "Late clinic Wednesdays until 8 pm",
      "Counselling rooms",
      "Hearing loop",
    ],
    pin: [522, 300],
  },
];

/* ------------------------------------------------------------- clinicians */

export type Clinician = {
  slug: string;
  name: string;
  short: string;
  initials: string;
  role: string;
  credentials: string;
  pronouns: string;
  languages: string[];
  accepting: boolean;
  /** Working weekdays (1 = Monday … 6 = Saturday) per location slug. */
  schedule: Record<string, number[]>;
  interests: string[];
  bio: string[];
  quote: string;
  since: number;
};

export const clinicians: Clinician[] = [
  {
    slug: "amara-osei",
    name: "Dr Amara Osei",
    short: "Dr Osei",
    initials: "AO",
    role: "Family physician",
    credentials: "MD, Board-certified in family medicine",
    pronouns: "she/her",
    languages: ["English", "Twi"],
    accepting: false,
    schedule: { harbourside: [1, 2, 4], linden: [3] },
    interests: [
      "Diabetes and blood pressure",
      "Preventive care",
      "Men’s health",
    ],
    bio: [
      "Amara co-founded Solace in 2009 after a decade in hospital medicine, where she rarely saw the same patient twice. She wanted the opposite: a practice where the doctor knows the family, the history and the dog’s name.",
      "Her days are mostly long-term conditions — diabetes, blood pressure, cholesterol — and the slow, practical work of making a plan someone can actually keep. She runs the Wednesday late clinic at Linden Street.",
    ],
    quote:
      "Most of medicine is listening long enough to hear the real question.",
    since: 2009,
  },
  {
    slug: "hannah-lindqvist",
    name: "Dr Hannah Lindqvist",
    short: "Dr Lindqvist",
    initials: "HL",
    role: "Family physician",
    credentials: "MD, Board-certified in family medicine",
    pronouns: "she/her",
    languages: ["English", "Swedish"],
    accepting: true,
    schedule: { harbourside: [1, 3, 5], northfield: [2] },
    interests: [
      "Women’s health",
      "Pregnancy care",
      "Contraception and menopause",
    ],
    bio: [
      "Hannah is Solace’s other co-founder. She trained in Uppsala and Seattle and brought home a habit of plain speaking and very good coffee.",
      "She looks after women through every stage — contraception, pregnancy alongside our midwife, and the menopause conversations too many people are told to just put up with.",
    ],
    quote: "You should leave a visit knowing exactly what happens next.",
    since: 2009,
  },
  {
    slug: "tomas-reyes",
    name: "Dr Tomás Reyes",
    short: "Dr Reyes",
    initials: "TR",
    role: "Family physician",
    credentials: "MD, Fellowship in geriatric medicine",
    pronouns: "he/him",
    languages: ["English", "Spanish"],
    accepting: true,
    schedule: { linden: [1, 2, 4, 5], harbourside: [6] },
    interests: [
      "Healthy ageing",
      "Sports and joint injuries",
      "Memory concerns",
    ],
    bio: [
      "Tomás grew up two streets from Linden Street and came back after training to look after the neighbourhood he knows. He leads our healthy ageing work and runs the Saturday clinic at Harbourside.",
      "Ask him about running knees, falls prevention or what to do about a parent who has started forgetting things. He makes home visits for patients who can no longer get to us.",
    ],
    quote: "Getting older isn’t a diagnosis. It’s a reason to plan well.",
    since: 2016,
  },
  {
    slug: "mei-tanaka",
    name: "Dr Mei Tanaka",
    short: "Dr Tanaka",
    initials: "MT",
    role: "Family physician, children’s lead",
    credentials: "MD, Board-certified in family medicine",
    pronouns: "she/her",
    languages: ["English", "Japanese"],
    accepting: true,
    schedule: { northfield: [1, 3, 5], harbourside: [2] },
    interests: [
      "Children and teenagers",
      "Asthma and eczema",
      "Feeding and sleep",
    ],
    bio: [
      "Mei leads children’s care at Northfield. She has two of her own and a high tolerance for crying in the waiting room.",
      "Her clinics cover everything from a first fever to teenage acne and asthma plans for school. She keeps a drawer of stickers and is not above bribery.",
    ],
    quote:
      "Parents are the experts on their child. My job is to take that seriously.",
    since: 2014,
  },
  {
    slug: "noor-haddad",
    name: "Noor Haddad",
    short: "Noor",
    initials: "NH",
    role: "Paediatric nurse practitioner",
    credentials: "RN, MSN, Certified paediatric nurse practitioner",
    pronouns: "she/her",
    languages: ["English", "Arabic"],
    accepting: true,
    schedule: { northfield: [1, 2, 3, 4] },
    interests: [
      "Newborn and well-child checks",
      "Childhood vaccinations",
      "Growth and development",
    ],
    bio: [
      "Noor runs our well-child programme, from the first newborn visit at five days old to the sports physical at sixteen. She can examine, diagnose and prescribe, and she does most of our children’s vaccinations.",
      "Tuesday mornings she hosts the Northfield baby clinic: weigh-ins, feeding questions, and a room full of parents who are just as tired as you.",
    ],
    quote:
      "A good check-up should feel like a conversation, not an inspection.",
    since: 2015,
  },
  {
    slug: "grace-whitfield",
    name: "Grace Whitfield",
    short: "Grace",
    initials: "GW",
    role: "Certified nurse-midwife",
    credentials: "RN, CNM",
    pronouns: "she/her",
    languages: ["English"],
    accepting: true,
    schedule: { harbourside: [2, 4], northfield: [3] },
    interests: ["Pregnancy care", "Postnatal visits", "Feeding support"],
    bio: [
      "Grace has been a midwife for nineteen years, the last six at Solace. She sees you through pregnancy check-ups alongside Dr Lindqvist and visits after the birth.",
      "She also runs the six-week postnatal visit — for the parent, not just the baby — because that appointment is too often skipped.",
    ],
    quote: "The six-week check is for you, too. Book it.",
    since: 2019,
  },
  {
    slug: "samuel-adeyemi",
    name: "Samuel Adeyemi",
    short: "Samuel",
    initials: "SA",
    role: "Counsellor",
    credentials: "LCSW, Licensed clinical social worker",
    pronouns: "he/him",
    languages: ["English", "Yoruba"],
    accepting: true,
    schedule: { linden: [1, 3, 4], harbourside: [5] },
    interests: ["Anxiety and low mood", "Grief", "Parents under strain"],
    bio: [
      "Samuel joined in 2018, when we decided counselling belonged in the same building as the rest of your care. He sees adults and teenagers for short courses of talking therapy.",
      "Your doctor can refer you, or you can book directly. Most people come for six to eight sessions; some come for one good conversation.",
    ],
    quote:
      "You don’t need to be in crisis to deserve an hour of someone’s attention.",
    since: 2018,
  },
  {
    slug: "ruth-castellano",
    name: "Ruth Castellano",
    short: "Ruth",
    initials: "RC",
    role: "Practice nurse",
    credentials: "RN, Diabetes educator",
    pronouns: "she/her",
    languages: ["English", "Spanish", "Italian"],
    accepting: true,
    schedule: { harbourside: [1, 2, 3, 4, 5] },
    interests: ["Diabetes reviews", "Travel and adult vaccines", "Wound care"],
    bio: [
      "Ruth is the person most patients see more often than their doctor. She runs diabetes and blood-pressure reviews, adult and travel vaccines, dressings, and the 7:30 am blood-test queue.",
      "If you have a question and don’t know who to ask, ask Ruth.",
    ],
    quote: "Small checks, done regularly, beat big fixes done late.",
    since: 2011,
  },
];

/* --------------------------------------------------------------- services */

export type Audience = "Children" | "Adults" | "Everyone";

export type Service = {
  slug: string;
  name: string;
  short: string;
  audience: Audience;
  ages: string;
  minutes: number;
  image: string;
  alt: string;
  lede: string;
  includes: string[];
  steps: { title: string; text: string }[];
  bring: string[];
  selfPay: number;
  insured: string;
  locations: string[];
  clinicians: string[];
  faqs: { q: string; a: string }[];
  /** How many clinic days ahead it can be booked online (default 12). */
  bookAhead?: number;
};

export const services: Service[] = [
  {
    slug: "well-child",
    name: "Well-child checks",
    short: "Growth, development and vaccines from five days old to eighteen.",
    audience: "Children",
    ages: "Newborn to 18",
    minutes: 30,
    image: wellChild,
    alt: "A clinician listens to a baby’s chest with a stethoscope on an examination table",
    lede: "Regular check-ups on a schedule that follows your child: six in the first year, then yearly. We measure, we examine, and we leave time for the questions you wrote on your phone at 3 am.",
    includes: [
      "Height, weight and head growth plotted on their chart",
      "A full physical examination",
      "Development, speech and hearing questions for their age",
      "Vaccines due at this visit, given in the same appointment",
      "Feeding, sleep and behaviour — whatever is on your mind",
    ],
    steps: [
      {
        title: "Before",
        text: "We text a short questionnaire two days ahead. It takes five minutes and saves fifteen in the room.",
      },
      {
        title: "Measuring",
        text: "A nurse weighs and measures, then you meet Noor or Dr Tanaka in a room with toys and a lower exam table.",
      },
      {
        title: "Talking",
        text: "Examination, your questions, and anything we have noticed. Vaccines come last so the visit ends with a sticker.",
      },
      {
        title: "After",
        text: "A written summary in your inbox the same day, and the next check booked before you leave.",
      },
    ],
    bring: [
      "Your child’s vaccination record",
      "Any questions, written down",
      "A favourite toy for the exam table",
    ],
    selfPay: 95,
    insured: "Covered in full by most plans as preventive care",
    locations: ["northfield", "harbourside"],
    clinicians: ["noor-haddad", "mei-tanaka", "hannah-lindqvist"],
    faqs: [
      {
        q: "How often should my child come in?",
        a: "At 5 days, 2 weeks, 2, 4, 6, 9 and 12 months, then 15 and 18 months, then once a year. We send a reminder when each one is due.",
      },
      {
        q: "Can both parents come?",
        a: "Yes — and siblings. The Northfield rooms are big enough for a buggy and a bored older brother.",
      },
      {
        q: "Do you do sports and camp forms?",
        a: "Yes. Bring the form to their yearly check and we’ll complete it there at no extra charge.",
      },
    ],
  },
  {
    slug: "vaccinations",
    name: "Vaccinations",
    short: "Childhood schedule, school catch-ups, flu, shingles and travel.",
    audience: "Everyone",
    ages: "All ages",
    minutes: 15,
    image: vaccinations,
    alt: "A young girl sits on an exam table while a nurse puts a bandage on her arm after a vaccine",
    lede: "Quick, gentle and on time. We keep everyone’s record in one place, remind you when the next dose is due, and give flu shots without an appointment every October and November.",
    includes: [
      "The full childhood schedule, with catch-up plans if you have moved or missed doses",
      "School-entry and college vaccines",
      "Flu, COVID-19, shingles, pneumonia and whooping cough for adults",
      "Travel vaccines and malaria advice — book six weeks before you fly",
    ],
    steps: [
      {
        title: "Check",
        text: "We look at your record and confirm what’s due. Bring the old one if you were vaccinated elsewhere.",
      },
      {
        title: "Explain",
        text: "What it protects against, what side effects to expect, and a chance to ask anything.",
      },
      {
        title: "Vaccinate",
        text: "Done in under a minute. Children can sit on a parent’s lap.",
      },
      {
        title: "Wait",
        text: "Fifteen minutes in the waiting room, then you’re free. The record updates the same day.",
      },
    ],
    bring: [
      "Any previous vaccination records",
      "Travel dates and destinations for travel vaccines",
      "A short-sleeved top",
    ],
    selfPay: 25,
    insured:
      "Routine vaccines covered by most plans; travel vaccines usually self-pay",
    locations: ["harbourside", "northfield", "linden"],
    clinicians: ["noor-haddad", "ruth-castellano", "mei-tanaka"],
    faqs: [
      {
        q: "Do I need an appointment for a flu shot?",
        a: "Not in October and November. Walk in to any clinic during opening hours. The rest of the year, book a 15-minute visit.",
      },
      {
        q: "How much do travel vaccines cost?",
        a: "The visit is $25 plus the vaccine itself, from $45 for typhoid to $165 for rabies. We give you a written quote before anything is given.",
      },
      {
        q: "My child is scared of needles. Can you help?",
        a: "Tell us when you book. We can use numbing cream, give you a quiet room and schedule the last appointment before lunch when it’s calm.",
      },
    ],
  },
  {
    slug: "same-day",
    bookAhead: 2,
    name: "Same-day sick visits",
    short:
      "Fevers, coughs, rashes, sprains — seen today, by a doctor who can see your notes.",
    audience: "Everyone",
    ages: "All ages",
    minutes: 15,
    image: sameDay,
    alt: "A doctor holds a stethoscope to a child’s back during an examination",
    lede: "When something can’t wait for next week. Same-day slots open at 7:30 am every weekday, by phone and online. Children under two are always seen the same day.",
    includes: [
      "Infections, fevers, coughs and ear pain",
      "Rashes, bites and minor burns",
      "Sprains, strains and back pain",
      "Urine infections and stomach bugs",
      "Prescriptions sent to your pharmacy before you get home",
    ],
    steps: [
      {
        title: "Book",
        text: "Online or by phone from 7:30 am. Tell us briefly what’s wrong so we can give you the right length of visit.",
      },
      {
        title: "Triage",
        text: "If it sounds urgent, a nurse calls you back within 30 minutes and may ask you to come straight in.",
      },
      {
        title: "Visit",
        text: "Fifteen minutes with a doctor who can read your record — not a stranger in a walk-in centre.",
      },
      {
        title: "Follow-up",
        text: "If you’re not better when we said you would be, call and we’ll see you again.",
      },
    ],
    bring: [
      "A list of medicines you take",
      "Your temperature readings, if you’ve taken them",
    ],
    selfPay: 85,
    insured: "Standard office visit copay applies",
    locations: ["harbourside", "northfield", "linden"],
    clinicians: ["amara-osei", "hannah-lindqvist", "tomas-reyes", "mei-tanaka"],
    faqs: [
      {
        q: "What if there are no slots left?",
        a: "Call us anyway. The nurse line triages every call, and no child under two is turned away.",
      },
      {
        q: "Is this urgent care?",
        a: "No. For chest pain, trouble breathing, a head injury with confusion or heavy bleeding, call 911 or go to the emergency department.",
      },
    ],
  },
  {
    slug: "long-term",
    name: "Long-term conditions",
    short:
      "Diabetes, asthma, blood pressure and thyroid, managed with a named team.",
    audience: "Adults",
    ages: "16 and over",
    minutes: 30,
    image: longTerm,
    alt: "A nurse in blue scrubs fits a blood-pressure cuff to an older man’s arm",
    lede: "One doctor and one nurse who know your condition, a plan written in plain English, and reviews booked before you need to remember them.",
    includes: [
      "Type 1 and type 2 diabetes, including insulin starts",
      "Asthma and COPD, with inhaler technique checks",
      "High blood pressure and cholesterol",
      "Thyroid conditions",
      "Blood tests drawn on site and reviewed with you",
    ],
    steps: [
      {
        title: "Bloods first",
        text: "We book a blood test a week before your review so the results are ready when you come in.",
      },
      {
        title: "Nurse review",
        text: "Ruth checks blood pressure, feet, weight and inhaler technique and goes through your readings.",
      },
      {
        title: "Doctor review",
        text: "Your doctor adjusts medicines, explains the results and agrees one or two goals with you.",
      },
      {
        title: "Your plan",
        text: "A one-page plan to keep on the fridge, and the next review already in the diary.",
      },
    ],
    bring: [
      "Your home readings or glucose meter",
      "All your medicines, in their boxes",
      "Your inhaler, if you use one",
    ],
    selfPay: 120,
    insured: "Covered by most plans; review visits may carry a copay",
    locations: ["harbourside", "linden"],
    clinicians: ["amara-osei", "tomas-reyes", "ruth-castellano"],
    faqs: [
      {
        q: "How often will I be seen?",
        a: "Usually every three to six months, depending on how settled things are. Between visits, message the nurse team with readings.",
      },
      {
        q: "Can I get my prescriptions for longer?",
        a: "Once your condition is stable we can prescribe for up to three months at a time.",
      },
    ],
  },
  {
    slug: "pregnancy",
    name: "Pregnancy & new parents",
    short:
      "Antenatal care with our midwife, then a postnatal visit for you, not just the baby.",
    audience: "Everyone",
    ages: "Expecting and new parents",
    minutes: 40,
    image: newParents,
    alt: "A mother holds her baby while a nurse prepares to give a vaccine",
    lede: "Care through pregnancy with Grace, our nurse-midwife, and Dr Lindqvist, shared with the hospital where you’ll give birth. After the birth, we look after all of you.",
    includes: [
      "Booking visit with dating and screening tests",
      "Regular antenatal checks until 36 weeks",
      "Feeding support before and after the birth",
      "Newborn check at five days",
      "Six-week postnatal visit for the birthing parent",
    ],
    steps: [
      {
        title: "First visit",
        text: "Around eight weeks: your history, blood tests, and a plan for scans and checks.",
      },
      {
        title: "Check-ups",
        text: "Every four weeks, then every two from 28 weeks. Partners welcome at every one.",
      },
      {
        title: "Handover",
        text: "At 36 weeks we share your notes with the hospital and help you write your birth preferences.",
      },
      {
        title: "Coming home",
        text: "Grace calls in the first week. You and the baby come in at five days and six weeks.",
      },
    ],
    bring: [
      "Your due date or last period date",
      "Any hospital letters",
      "Questions — every one of them",
    ],
    selfPay: 140,
    insured: "Antenatal and postnatal care covered by most plans",
    locations: ["harbourside", "northfield"],
    clinicians: ["grace-whitfield", "hannah-lindqvist"],
    faqs: [
      {
        q: "Do you deliver babies?",
        a: "No — births happen at Alder Bay General or the Westshore Birth Centre. We look after you before and after, and share notes with them.",
      },
      {
        q: "When should I book the first visit?",
        a: "As soon as you know you’re pregnant. We’ll fit you in within two weeks.",
      },
    ],
  },
  {
    slug: "mental-health",
    name: "Mental health & counselling",
    short:
      "Talking therapy and medication reviews, in the same building as your doctor.",
    audience: "Everyone",
    ages: "12 and over",
    minutes: 50,
    image: mentalHealth,
    alt: "A counsellor with a notebook talks with a young woman in a bright consulting room",
    lede: "Short courses of counselling with Samuel, and doctors who take low mood and anxiety as seriously as a broken wrist. No referral needed.",
    includes: [
      "Anxiety, low mood and stress",
      "Grief and bereavement",
      "Sleep problems",
      "Support for parents and carers under strain",
      "Medication reviews with your doctor",
    ],
    steps: [
      {
        title: "First session",
        text: "Fifty minutes to talk about what’s going on and what you want to be different.",
      },
      {
        title: "A plan",
        text: "Usually six to eight weekly sessions. Some people need fewer; we’ll be honest if you need more specialised help.",
      },
      {
        title: "Joined-up care",
        text: "With your permission, Samuel and your doctor talk, so you don’t have to tell your story twice.",
      },
    ],
    bring: ["Nothing at all", "A list of any medicines you take"],
    selfPay: 110,
    insured: "Covered by most plans under behavioural health benefits",
    locations: ["linden", "harbourside"],
    clinicians: ["samuel-adeyemi", "amara-osei"],
    faqs: [
      {
        q: "Can teenagers book on their own?",
        a: "From 14, yes. We encourage involving a parent, but we respect a young person’s confidentiality.",
      },
      {
        q: "What if I’m in crisis?",
        a: "Call or text 988, the Suicide & Crisis Lifeline, at any time. If you are in danger, call 911.",
      },
    ],
  },
  {
    slug: "healthy-ageing",
    name: "Healthy ageing",
    short:
      "Medication reviews, memory, falls and home visits for patients over 65.",
    audience: "Adults",
    ages: "65 and over",
    minutes: 40,
    image: healthyAgeing,
    alt: "A smiling older woman receives a vaccine from a nurse",
    lede: "Longer visits, fewer pills where possible, and home visits when getting to the clinic gets hard. Bring a family member if it helps.",
    includes: [
      "Annual 40-minute review of every medicine you take",
      "Memory and mood assessments",
      "Falls risk, balance and bone health",
      "Shingles, pneumonia and flu vaccines",
      "Home visits for patients who are housebound",
    ],
    steps: [
      {
        title: "Review",
        text: "Dr Reyes or Ruth goes through each medicine with you: still needed, still the right dose?",
      },
      {
        title: "Checks",
        text: "Blood pressure lying and standing, balance, eyesight and hearing questions.",
      },
      {
        title: "Plan",
        text: "A written plan for you and, if you like, your family — including who to call when things change.",
      },
    ],
    bring: [
      "Every medicine you take, including vitamins and creams",
      "Your glasses and hearing aids",
      "A family member or friend, if you like",
    ],
    selfPay: 140,
    insured: "Covered by senior plans and most private plans",
    locations: ["linden", "harbourside"],
    clinicians: ["tomas-reyes", "ruth-castellano"],
    faqs: [
      {
        q: "Can my daughter book for me?",
        a: "Yes. Fill in a consent form once, and a named family member can book, ask about results and order prescriptions for you.",
      },
      {
        q: "Do you really do home visits?",
        a: "Yes, for patients who can’t get to the clinic. Call to arrange — they’re not bookable online.",
      },
    ],
  },
  {
    slug: "check-ups",
    name: "Annual check-ups",
    short:
      "A yearly physical with screening tests matched to your age and history.",
    audience: "Adults",
    ages: "18 and over",
    minutes: 30,
    image: checkUps,
    alt: "Close-up of a clinician pumping a blood-pressure cuff on a patient’s arm",
    lede: "Thirty minutes, once a year, to catch the quiet things early: blood pressure, cholesterol, cancer screening and the questions you never get round to asking.",
    includes: [
      "Blood pressure, weight and a physical examination",
      "Cholesterol, blood sugar and other tests by age",
      "Cervical, breast, bowel and prostate screening when due",
      "Vaccine review",
      "Time for anything else on your mind",
    ],
    steps: [
      {
        title: "Bloods",
        text: "A fasting blood test the week before, at Harbourside between 7:30 and 10:00 am.",
      },
      {
        title: "Physical",
        text: "Examination, your history, and the screening you’re due for.",
      },
      {
        title: "Summary",
        text: "Results explained in a message within five working days, and your next check pencilled in.",
      },
    ],
    bring: [
      "Family history, if you know it",
      "Dates of your last screening tests",
      "A list of questions",
    ],
    selfPay: 165,
    insured: "Covered in full by most plans as preventive care",
    locations: ["harbourside", "northfield", "linden"],
    clinicians: ["amara-osei", "hannah-lindqvist", "tomas-reyes"],
    faqs: [
      {
        q: "Do I need to fast?",
        a: "For the blood test, yes — water only after midnight. Not for the check-up itself.",
      },
      {
        q: "Can I bring up a separate problem?",
        a: "Yes. If it needs more time we’ll book a follow-up rather than rush it.",
      },
    ],
  },
];

export const audiences: ("All" | Audience)[] = [
  "All",
  "Children",
  "Adults",
  "Everyone",
];

/* ------------------------------------------------------------ home + misc */

export const home = {
  title: "Good care, with room to breathe.",
  lede: "Solace is a family practice in Alder Bay. Three neighbourhood clinics, eight clinicians who know your name, and appointments long enough to say what you came to say.",
  heroAlt:
    "A father holds his baby daughter while a doctor smiles and examines her",
  sameDay: {
    title: "Feeling unwell today?",
    text: "Same-day appointments open at 7:30 am, online and by phone. Children under two are always seen the same day.",
  },
  firstVisit: [
    {
      title: "Register",
      text: "Ten minutes online or at reception. We request your old records for you.",
    },
    {
      title: "Meet your doctor",
      text: "A 30-minute introductory visit with the clinician you chose — or the one we suggest.",
    },
    {
      title: "Make a plan",
      text: "Screening, vaccines and repeat prescriptions, sorted in one go.",
    },
    {
      title: "Stay in touch",
      text: "Reminders when things are due, and the same faces every time you come back.",
    },
  ],
  voices: [
    {
      quote:
        "Dr Tanaka has seen my son through croup, a broken arm and his first shave. She still asks about his drumming.",
      name: "Lucía M.",
      detail: "Patient family since 2014",
    },
    {
      quote:
        "I came in for a cough and Ruth caught my blood pressure. Two years on, I take one small pill and walk to work.",
      name: "Derek A.",
      detail: "Harbourside",
    },
    {
      quote:
        "The late Wednesday clinic is the only reason I go to the doctor at all.",
      name: "Priya S.",
      detail: "Linden Street",
    },
  ],
  closing: {
    title: "Come and meet us.",
    text: "New patients are welcome at all three clinics. Book a 30-minute introductory visit, or call and we’ll help you choose a clinician.",
  },
};

export const patients = {
  title: "Patient information",
  lede: "Everything you need before, during and after a visit — registering, fees, prescriptions, results and what to do out of hours.",
  register: [
    {
      title: "Check we cover your address",
      text: "We accept patients living anywhere in Alder Bay and the Westshore towns.",
    },
    {
      title: "Fill in the registration form",
      text: "Online, or on paper at any reception. One form per family member.",
    },
    {
      title: "Sign the records release",
      text: "We’ll request your notes from your previous doctor — it takes about three weeks.",
    },
    {
      title: "Book an introductory visit",
      text: "Thirty minutes to meet your clinician, review medicines and catch up on screening.",
    },
  ],
  bring: [
    "Photo ID for adults",
    "Your insurance card, front and back",
    "Every medicine you take, or a photo of the labels",
    "Vaccination records for children",
    "Your previous doctor’s name and phone number",
  ],
  plans: [
    "Bayline Health Plan",
    "Evergreen Mutual",
    "Coastal Care Alliance",
    "Westshore Community Cover",
    "Harbor State Family Plan",
    "Meridian Health Partners",
  ],
  fees: [
    { item: "Same-day sick visit (15 min)", price: 85 },
    { item: "Standard visit (30 min)", price: 120 },
    { item: "Well-child check", price: 95 },
    { item: "Annual check-up", price: 165 },
    { item: "Counselling session (50 min)", price: 110 },
    { item: "Vaccine visit, plus vaccine cost", price: 25 },
    { item: "Forms and letters", price: 30 },
  ],
  feesNote:
    "Self-pay prices for patients without insurance. A sliding scale reduces fees by up to 60% based on household income — ask at reception; nobody is turned away for inability to pay.",
  topics: [
    {
      title: "Repeat prescriptions",
      text: "Request repeats by phone or at reception, at least two working days before you run out. We send them to the pharmacy you choose. Stable long-term medicines can be prescribed for up to three months.",
    },
    {
      title: "Test results",
      text: "Most blood results come back within three working days. Your clinician sends a message explaining every result — normal ones too. If something needs action, we call you.",
    },
    {
      title: "Out of hours",
      text: "Our nurse line is answered 24 hours a day, every day, by Solace nurses who can see your record. Evenings and weekends they can arrange a visit at the Alder Bay out-of-hours centre.",
    },
    {
      title: "Interpreters",
      text: "Free professional interpreters in person or by phone, in any language. Tell us when you book. Our clinicians between them also speak Spanish, Arabic, Japanese, Swedish, Italian, Twi and Yoruba.",
    },
  ],
  policies: [
    {
      title: "Cancelling",
      text: "Please give us 24 hours’ notice so someone else can have the slot. We never charge for a first missed appointment.",
    },
    {
      title: "Running late",
      text: "If you’ll be more than 10 minutes late, call us. We will always try to see you, but may need to rebook.",
    },
    {
      title: "Privacy",
      text: "Your record is seen only by the people caring for you. You can ask for a copy at any time, free of charge.",
    },
    {
      title: "Feedback",
      text: "Tell us what went well and what didn’t — the practice manager reads every message and replies within a week.",
    },
  ],
  faqs: [
    {
      q: "Can I choose my doctor?",
      a: "Yes. Pick anyone accepting new patients when you register. You can change at any time, no explanation needed.",
    },
    {
      q: "Do you see patients without insurance?",
      a: "Yes. Self-pay prices are listed on this page, and our sliding scale reduces them by up to 60% depending on household income.",
    },
    {
      q: "How do I get a sick note for work or school?",
      a: "Ask during your visit. If you weren’t seen, call and a clinician will decide whether one can be written; there’s no charge for school notes.",
    },
    {
      q: "Can I bring my children to my own appointment?",
      a: "Of course. Northfield and Harbourside have play corners, and staff will happily keep an eye on a sleeping baby.",
    },
    {
      q: "How long are appointments?",
      a: "Fifteen minutes for a same-day problem, thirty for most others, forty for pregnancy and healthy ageing, fifty for counselling. We’d rather run on time than rush you.",
    },
    {
      q: "What happens if I need a specialist?",
      a: "We refer you, send your notes ahead and stay involved. When the specialist writes back, we explain the letter to you.",
    },
  ],
};

export const about = {
  title: "A practice built around time.",
  lede: "Solace started with one idea: that a family doctor should have time to know your family. Seventeen years on, we still book appointments long enough to listen.",
  story: [
    "In 2009 Dr Amara Osei and Dr Hannah Lindqvist rented the old Harbour Row bakery, painted it themselves, and opened with two consulting rooms and one receptionist. The ovens went; the bread shelves became the waiting-room bookcase, and they are still there.",
    "They had both worked in places where visits were seven minutes long and patients were a list. Solace was the opposite bet: fewer patients per clinician, longer visits, and the same faces every time. It costs us more. It is also why most of our families stay for decades.",
    "Today we are eight clinicians and a team of fourteen across three clinics, looking after a little over 9,000 people in Alder Bay — newborns, grandparents, and everyone in between.",
  ],
  principles: [
    {
      title: "Time is the treatment.",
      text: "Thirty-minute visits as standard. Fifteen only for a single, simple problem.",
    },
    {
      title: "Same faces.",
      text: "You choose a clinician and you keep them. If they’re away, their partner already knows you.",
    },
    {
      title: "Plain words.",
      text: "Every visit ends with a written summary you can understand without a dictionary.",
    },
    {
      title: "Nobody turned away.",
      text: "Sliding-scale fees and free interpreters, because good care shouldn’t depend on income or language.",
    },
  ],
  timeline: [
    { year: "2009", text: "Harbourside opens in the old Harbour Row bakery." },
    {
      year: "2011",
      text: "Ruth Castellano joins and starts the nurse-led diabetes clinic.",
    },
    {
      year: "2014",
      text: "Northfield opens as our children’s and family clinic.",
    },
    { year: "2018", text: "Counselling moves in-house with Samuel Adeyemi." },
    {
      year: "2019",
      text: "Grace Whitfield brings midwife-led pregnancy care.",
    },
    {
      year: "2021",
      text: "Linden Street opens above the library, with a late Wednesday clinic.",
    },
  ],
  careers: {
    title: "Work with us",
    text: "We’re hiring a part-time practice nurse for Northfield, three days a week. Thirty-minute appointments, a team that eats lunch together, and no seven-minute anything.",
  },
};
