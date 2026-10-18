import nadia from "./assets/nadia-haddad.jpg";
import ruth from "./assets/ruth-calloway.jpg";
import arjun from "./assets/arjun-mehta.jpg";
import marcus from "./assets/marcus-bell.jpg";
import tomas from "./assets/tomas-varga.jpg";
import dana from "./assets/dana-ruiz.jpg";
import clinicianPhone from "./assets/clinician-phone.jpg";
import patientLaptop from "./assets/patient-laptop.jpg";
import family from "./assets/family.jpg";
import bloodPressure from "./assets/blood-pressure.jpg";
import pharmacist from "./assets/pharmacist.jpg";
import hands from "./assets/hands.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Vital",
  tagline:
    "A licensed clinician on your phone, usually within fifteen minutes.",
  email: "care@vital.example",
  phone: "+1 555 0134 284",
  phoneHref: "tel:+15550134284",
  hours: "Clinicians online 7 am – 11 pm, every day, in your time zone",
  address: "Vital Health PC · 410 Larkin Street, Suite 6 · Portland, OR 97205",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/conditions", label: "Conditions" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/clinicians", label: "Clinicians" },
  { to: "/app", label: "App" },
];

export const footerColumns = [
  {
    title: "Care",
    links: [
      { to: "/check-in", label: "Start a check-in" },
      { to: "/conditions", label: "Conditions we treat" },
      { to: "/how-it-works", label: "How it works" },
      { to: "/pricing", label: "Pricing & insurance" },
    ],
  },
  {
    title: "Vital",
    links: [
      { to: "/clinicians", label: "Our clinicians" },
      { to: "/app", label: "The Vital app" },
      { to: "/about", label: "About & standards" },
    ],
  },
];

export const newsletter = {
  title: "The seasonal note",
  text: "Four emails a year from our medical director: what is going around, and when to stay home.",
};

/** Video clinic hours, local time, 24h. */
export const clinicHours = { open: 7, close: 23 };

/** Typical video wait in minutes by hour of the day (sample data driving the live board). */
export const waitByHour: Record<number, number> = {
  7: 9,
  8: 17,
  9: 19,
  10: 14,
  11: 11,
  12: 13,
  13: 10,
  14: 8,
  15: 9,
  16: 12,
  17: 15,
  18: 18,
  19: 16,
  20: 13,
  21: 10,
  22: 6,
};

/* ------------------------------------------------------------ conditions */

export type VisitType = "video" | "message" | "scheduled";

export const visitTypes: Record<
  VisitType,
  { label: string; short: string; text: string }
> = {
  video: {
    label: "Video visit",
    short: "Video",
    text: "Face to face with a clinician, usually within 15 minutes.",
  },
  message: {
    label: "Message visit",
    short: "Message",
    text: "Answer questions, add photos, get a written plan within the hour.",
  },
  scheduled: {
    label: "Scheduled visit",
    short: "Scheduled",
    text: "Book a time with the same clinician for follow-ups and ongoing care.",
  },
};

export const categories = [
  "Everyday illness",
  "Urinary & sexual health",
  "Skin",
  "Mental health",
  "Ongoing care",
  "Kids",
] as const;
export type Category = (typeof categories)[number];

export type Condition = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  symptoms: string[];
  weTreat: string[];
  goInPerson: string[];
  visit: string[];
  treatments: string[];
  price: number;
  visitTypes: VisitType[];
  minutes: number;
  /** Severity at or above which the check-in recommends an in-person visit. */
  inPersonAt: number;
  faq: { q: string; a: string }[];
};

export const conditions: Condition[] = [
  {
    slug: "cold-flu-covid",
    name: "Cold, flu & COVID-19",
    category: "Everyday illness",
    summary:
      "Fever, aches, cough and that wrung-out feeling. We work out which virus it probably is, whether antivirals are worth it, and write the work note.",
    symptoms: [
      "Fever or chills",
      "Cough",
      "Body aches",
      "Sore throat",
      "Runny or stuffy nose",
      "Fatigue",
    ],
    weTreat: [
      "Flu within 48 hours of the first symptom, when antivirals help most",
      "COVID-19, including a home-test review and treatment eligibility",
      "Lingering coughs and post-viral fatigue",
      "Work and school notes",
    ],
    goInPerson: [
      "You are short of breath at rest or your lips look blue",
      "A fever above 103 °F that will not come down",
      "Confusion, or you are hard to wake",
      "Chest pain or pressure",
    ],
    visit: [
      "Tell us when it started and what you have tried",
      "Share a home-test photo if you have one",
      "Your clinician checks breathing and hydration on video",
      "Leave with a plan, a prescription if needed and a note",
    ],
    treatments: [
      "Oseltamivir for flu (within 48 h)",
      "Nirmatrelvir–ritonavir for eligible COVID-19 cases",
      "Benzonatate for cough",
      "Symptom plan with dosing for over-the-counter relief",
    ],
    price: 59,
    visitTypes: ["video", "message"],
    minutes: 12,
    inPersonAt: 9,
    faq: [
      {
        q: "Do I need a test first?",
        a: "No. A home test helps, and you can add a photo of it, but your clinician can still assess you without one.",
      },
      {
        q: "Can you prescribe Tamiflu?",
        a: "Yes, when it is likely to help — mostly within 48 hours of symptoms starting or for people at higher risk.",
      },
    ],
  },
  {
    slug: "sore-throat",
    name: "Sore throat & strep",
    category: "Everyday illness",
    summary:
      "Most sore throats are viral and pass in a week. We score yours on video, order a rapid strep test nearby when it is warranted, and treat the bacterial ones properly.",
    symptoms: [
      "Pain when swallowing",
      "Swollen glands",
      "White patches on tonsils",
      "Fever",
      "Hoarse voice",
    ],
    weTreat: [
      "Viral sore throat",
      "Strep throat after a positive test",
      "Tonsillitis",
      "Laryngitis and lost voice",
    ],
    goInPerson: [
      "You cannot swallow your own saliva or are drooling",
      "Your voice sounds muffled, like a hot potato",
      "Swelling on one side of the neck",
      "Trouble opening your mouth",
    ],
    visit: [
      "Hold your phone light to your throat when asked",
      "We score symptoms with the Centor criteria",
      "A rapid strep test at a partner pharmacy if the score calls for one",
      "Antibiotics sent the same day if the test is positive",
    ],
    treatments: [
      "Amoxicillin or penicillin V for confirmed strep",
      "Azithromycin for penicillin allergy",
      "Throat comfort plan",
    ],
    price: 59,
    visitTypes: ["video"],
    minutes: 10,
    inPersonAt: 8,
    faq: [
      {
        q: "Will I get antibiotics?",
        a: "Only if it is bacterial. Antibiotics do nothing for viral sore throats and carry real side effects, so we test first when it is unclear.",
      },
      {
        q: "Where is the strep test done?",
        a: "At one of 9,000 partner pharmacies. Results come back to your clinician within the hour.",
      },
    ],
  },
  {
    slug: "sinus-infection",
    name: "Sinus infection",
    category: "Everyday illness",
    summary:
      "Facial pressure, thick mucus and a headache that gets worse when you bend over. We tell viral from bacterial by the calendar and the pattern, not by guesswork.",
    symptoms: [
      "Pressure behind eyes or cheeks",
      "Thick yellow or green mucus",
      "Blocked nose",
      "Headache",
      "Tooth ache in the upper jaw",
    ],
    weTreat: [
      "Acute sinusitis",
      "Symptoms lasting more than 10 days",
      "Sinus flare-ups with allergies",
      "Double-worsening after a cold",
    ],
    goInPerson: [
      "Swelling or redness around one eye",
      "Changes in your vision",
      "A severe headache with a stiff neck",
      "High fever with confusion",
    ],
    visit: [
      "Map where the pressure sits",
      "Count the days since it started",
      "Decide on antibiotics or a 7-day wait-and-see plan",
      "Follow-up message included",
    ],
    treatments: [
      "Saline irrigation and steroid nasal spray",
      "Amoxicillin–clavulanate when bacterial is likely",
      "Delayed prescription you fill only if needed",
    ],
    price: 59,
    visitTypes: ["video", "message"],
    minutes: 11,
    inPersonAt: 9,
    faq: [
      {
        q: "What is a delayed prescription?",
        a: "We send it to your pharmacy but ask you to fill it only if you are not improving by a set date. Most people never need it.",
      },
    ],
  },
  {
    slug: "pink-eye",
    name: "Pink eye",
    category: "Everyday illness",
    summary:
      "Red, gritty, crusted-shut-in-the-morning eyes. A clear photo is usually all it takes to tell bacterial from viral or allergic.",
    symptoms: [
      "Red or pink eye",
      "Crusting on lashes",
      "Watery or sticky discharge",
      "Itching",
      "Gritty feeling",
    ],
    weTreat: [
      "Bacterial conjunctivitis",
      "Viral conjunctivitis",
      "Allergic conjunctivitis",
      "Daycare return notes for kids",
    ],
    goInPerson: [
      "Real eye pain rather than irritation",
      "Blurred vision that does not clear when you blink",
      "Sensitivity to light",
      "You wear contacts and it is getting worse",
    ],
    visit: [
      "Take two photos in daylight",
      "Answer five short questions",
      "Get drops or an allergy plan",
      "Contact lens advice if you wear them",
    ],
    treatments: [
      "Antibiotic eye drops for bacterial cases",
      "Antihistamine drops for allergic cases",
      "Cool compress and hygiene plan",
    ],
    price: 49,
    visitTypes: ["message", "video"],
    minutes: 8,
    inPersonAt: 7,
    faq: [
      {
        q: "Can my child go back to daycare?",
        a: "Usually 24 hours after starting antibiotic drops. We write the return note in the same visit.",
      },
    ],
  },
  {
    slug: "uti",
    name: "Urinary tract infection",
    category: "Urinary & sexual health",
    summary:
      "Burning, urgency and going every ten minutes. Uncomplicated UTIs are one of the things telehealth does best — most people have antibiotics at the pharmacy within the hour.",
    symptoms: [
      "Burning when you pee",
      "Needing to go often",
      "Cloudy or strong-smelling urine",
      "Pressure low in the belly",
    ],
    weTreat: [
      "Uncomplicated bladder infections",
      "Recurring UTIs with a standing plan",
      "UTI symptoms after sex",
      "Prevention advice",
    ],
    goInPerson: [
      "Fever, chills or pain in your back or side",
      "Vomiting and cannot keep fluids down",
      "Blood clots in your urine",
      "You are pregnant and have a fever",
    ],
    visit: [
      "A message visit is usually enough",
      "Answer questions about symptoms and history",
      "Prescription sent to your pharmacy",
      "Check in at 48 hours if it is not easing",
    ],
    treatments: [
      "Nitrofurantoin",
      "Trimethoprim–sulfamethoxazole",
      "Phenazopyridine for short-term relief",
    ],
    price: 39,
    visitTypes: ["message", "video"],
    minutes: 6,
    inPersonAt: 8,
    faq: [
      {
        q: "Do I need a urine test?",
        a: "Not for a typical first or occasional UTI in an adult woman. We order one at a partner lab if anything is unusual or it keeps coming back.",
      },
      {
        q: "Can men be treated?",
        a: "Yes, by video. UTIs in men are treated as complicated, so the plan usually includes a urine culture.",
      },
    ],
  },
  {
    slug: "birth-control",
    name: "Birth control",
    category: "Urinary & sexual health",
    summary:
      "Start, switch or refill the pill, patch or ring without a waiting room. Delivered in discreet packaging, refilled automatically.",
    symptoms: [
      "Starting contraception",
      "Switching methods",
      "Side effects on your current method",
      "Emergency contraception",
    ],
    weTreat: [
      "Combined pill and progestin-only pill",
      "Patch and vaginal ring",
      "Emergency contraception",
      "Referrals for IUDs and implants",
    ],
    goInPerson: [
      "Sudden severe headache with vision changes",
      "Leg pain or swelling in one calf",
      "Chest pain or shortness of breath",
      "You may be pregnant and have one-sided pelvic pain",
    ],
    visit: [
      "Health history and your blood pressure reading",
      "Talk through options with a clinician",
      "Prescription for 12 months",
      "Free method switch in the first 3 months",
    ],
    treatments: [
      "Combined oral contraceptives",
      "Norethindrone (progestin-only)",
      "Etonogestrel ring",
      "Ulipristal for emergency contraception",
    ],
    price: 39,
    visitTypes: ["message", "video", "scheduled"],
    minutes: 9,
    inPersonAt: 7,
    faq: [
      {
        q: "Do I need a recent blood pressure?",
        a: "Yes, for combined methods. A pharmacy cuff or home monitor reading from the last six months is fine.",
      },
    ],
  },
  {
    slug: "acne",
    name: "Acne",
    category: "Skin",
    summary:
      "From the odd breakout to the scarring kind. A dermatology-trained clinician reviews your photos and builds a plan you refine together over twelve weeks.",
    symptoms: [
      "Blackheads and whiteheads",
      "Red bumps",
      "Painful cysts",
      "Marks or scarring",
      "Breakouts around your period",
    ],
    weTreat: [
      "Mild to moderate acne",
      "Hormonal acne",
      "Acne marks and texture",
      "Adult-onset acne",
    ],
    goInPerson: [
      "Deep, draining nodules with fever",
      "Rapidly spreading rash with blisters",
      "You want isotretinoin, which needs monthly labs in person",
    ],
    visit: [
      "Three photos: front and both sides",
      "Tell us what you have tried",
      "Get a prescription routine",
      "Photo check-ins at 6 and 12 weeks",
    ],
    treatments: [
      "Topical tretinoin or adapalene",
      "Benzoyl peroxide washes",
      "Doxycycline for inflamed acne",
      "Spironolactone for hormonal acne",
    ],
    price: 49,
    visitTypes: ["message", "scheduled"],
    minutes: 0,
    inPersonAt: 10,
    faq: [
      {
        q: "How long until it works?",
        a: "Eight to twelve weeks for most routines. The 6-week photo check-in is where we adjust strength or add a step.",
      },
    ],
  },
  {
    slug: "eczema-rashes",
    name: "Eczema & rashes",
    category: "Skin",
    summary:
      "Dry, itchy, angry patches, hives after a new detergent, a rash you cannot name. Photos plus a short history solve most of them.",
    symptoms: [
      "Itchy dry patches",
      "Raised welts or hives",
      "Red rash",
      "Cracked or weeping skin",
      "Ring-shaped patches",
    ],
    weTreat: [
      "Eczema flares",
      "Contact dermatitis",
      "Hives",
      "Ringworm and other fungal rashes",
      "Insect bite reactions",
    ],
    goInPerson: [
      "Swelling of the lips, tongue or throat",
      "A rash that looks like bruises and does not fade when pressed",
      "Blisters across a large area",
      "Rash with high fever",
    ],
    visit: [
      "Photos in natural light with a coin for scale",
      "Questions about triggers",
      "Treatment plan with a flare schedule",
      "Message your clinician if it changes",
    ],
    treatments: [
      "Topical steroids matched to body area",
      "Non-steroid creams for face and folds",
      "Antifungal creams",
      "Non-drowsy antihistamines",
    ],
    price: 49,
    visitTypes: ["message", "video"],
    minutes: 0,
    inPersonAt: 9,
    faq: [
      {
        q: "Why the coin?",
        a: "It shows size and colour accurately. Phone cameras flatten redness, so a known object keeps the photo honest.",
      },
    ],
  },
  {
    slug: "anxiety-low-mood",
    name: "Anxiety & low mood",
    category: "Mental health",
    summary:
      "Worry that will not switch off, sleep that has gone, days that feel heavy. Start with a 40-minute first visit; continue with the same clinician every two to four weeks.",
    symptoms: [
      "Constant worry",
      "Trouble sleeping",
      "Low mood most days",
      "Losing interest in things",
      "Racing heart or panic",
    ],
    weTreat: [
      "Generalised anxiety",
      "Depression",
      "Panic attacks",
      "Stress and burnout",
      "Medication management",
    ],
    goInPerson: [
      "You are thinking about ending your life — call or text 988 now",
      "You have a plan or the means to hurt yourself or someone else",
      "You are hearing or seeing things others do not",
    ],
    visit: [
      "A scheduled 40-minute first visit on video",
      "Standard questionnaires so we can track change",
      "A plan: therapy, medication or both",
      "Follow-ups with the same clinician",
    ],
    treatments: [
      "Cognitive behavioural therapy sessions",
      "Sertraline, escitalopram and other SSRIs",
      "Bupropion",
      "Sleep and routine plan",
    ],
    price: 99,
    visitTypes: ["scheduled", "video"],
    minutes: 40,
    inPersonAt: 11,
    faq: [
      {
        q: "Do you prescribe benzodiazepines or stimulants?",
        a: "No. Vital does not prescribe controlled substances. If you take them, we coordinate with your current prescriber.",
      },
      {
        q: "Is this therapy?",
        a: "It can be. Our licensed therapists offer weekly 50-minute sessions; our clinicians handle medication. Many people see both.",
      },
    ],
  },
  {
    slug: "high-blood-pressure",
    name: "High blood pressure",
    category: "Ongoing care",
    summary:
      "Readings from your home cuff go straight to your chart. A clinician adjusts your plan monthly until you are steady, then every quarter.",
    symptoms: [
      "High readings at home or the pharmacy",
      "Running out of a current prescription",
      "Side effects from blood pressure pills",
      "A new diagnosis",
    ],
    weTreat: [
      "Stage 1 and 2 hypertension",
      "Medication refills and adjustments",
      "Home-monitoring plans",
      "Lab orders for kidney function",
    ],
    goInPerson: [
      "A reading above 180/120 with headache, chest pain or confusion",
      "Sudden weakness or numbness on one side",
      "Slurred speech or a drooping face — call 911",
    ],
    visit: [
      "Share two weeks of home readings",
      "Medication review and labs ordered nearby",
      "A target and a plan",
      "Monthly check-ins until steady",
    ],
    treatments: [
      "Lisinopril and losartan",
      "Amlodipine",
      "Hydrochlorothiazide",
      "A salt and activity plan you will actually keep",
    ],
    price: 79,
    visitTypes: ["scheduled", "message"],
    minutes: 25,
    inPersonAt: 9,
    faq: [
      {
        q: "Which cuff should I use?",
        a: "Any validated upper-arm cuff. Members on Vital Plus can get one shipped at cost, and it syncs with the app.",
      },
    ],
  },
  {
    slug: "ear-pain-kids",
    name: "Ear pain in kids",
    category: "Kids",
    summary:
      "The 2 am ear tug. Our pediatric-trained clinicians see children from age one, with a parent on the call, and know when an ear needs an otoscope in person.",
    symptoms: [
      "Pulling at the ear",
      "Crying when lying down",
      "Fever",
      "Fluid from the ear",
      "Trouble hearing",
    ],
    weTreat: [
      "Middle ear infection",
      "Swimmer's ear",
      "Ear pain after a cold",
      "Pain and fever plans",
    ],
    goInPerson: [
      "Swelling or redness behind the ear",
      "Stiff neck or unusual sleepiness",
      "Children under one year with fever",
      "Fever above 104 °F",
    ],
    visit: [
      "A parent or guardian joins the video",
      "We look at the outer ear and how your child moves",
      "Pain plan with weight-based dosing",
      "Antibiotics when the pattern points to bacteria",
    ],
    treatments: [
      "Weight-based ibuprofen or acetaminophen plan",
      "Amoxicillin when indicated",
      "Antibiotic ear drops for swimmer's ear",
    ],
    price: 59,
    visitTypes: ["video"],
    minutes: 12,
    inPersonAt: 8,
    faq: [
      {
        q: "Can you see inside the ear on video?",
        a: "Not without a smartphone otoscope, which we can ship to Plus members. Without one we work from history and symptoms, and refer when unsure.",
      },
    ],
  },
];

export const redFlags = [
  { id: "chest", label: "Chest pain, pressure or tightness" },
  { id: "breath", label: "Trouble breathing, or lips turning blue" },
  { id: "stroke", label: "Face drooping, arm weakness or slurred speech" },
  { id: "bleeding", label: "Bleeding that will not stop" },
  { id: "confusion", label: "Sudden confusion or fainting" },
  { id: "harm", label: "Thoughts of hurting yourself or someone else" },
];

/* ------------------------------------------------------------ clinicians */

export type Clinician = {
  slug: string;
  name: string;
  credentials: string;
  role: string;
  photo: string;
  focus: string;
  states: string[];
  languages: string[];
  since: number;
  bio: string;
  approach: string;
  training: string[];
  conditions: string[];
  slots: { day: string; times: string[] }[];
};

export const clinicians: Clinician[] = [
  {
    slug: "nadia-haddad",
    name: "Nadia Haddad",
    credentials: "FNP-C",
    role: "Family nurse practitioner",
    photo: nadia,
    focus: "50% 22%",
    states: ["OR", "WA", "CA", "NV", "AZ"],
    languages: ["English", "Arabic", "French"],
    since: 2019,
    bio: "Nadia spent eight years on the night shift of a Tucson urgent care before joining Vital. She sees most of our evening video visits and has a knack for kids who do not want to open their mouths.",
    approach:
      "Most people already know their body is off. My job is to figure out how off, and to be honest about it.",
    training: [
      "MSN, Family Nurse Practitioner — University of Arizona",
      "BSN — Northern Arizona University",
      "Board certified, AANP",
    ],
    conditions: ["cold-flu-covid", "sore-throat", "ear-pain-kids", "pink-eye"],
    slots: [
      { day: "Today", times: ["6:40 pm", "7:20 pm", "9:00 pm"] },
      { day: "Tomorrow", times: ["5:00 pm", "8:15 pm"] },
    ],
  },
  {
    slug: "ruth-calloway",
    name: "Dr. Ruth Calloway",
    credentials: "MD",
    role: "Medical director · Family medicine",
    photo: ruth,
    focus: "42% 30%",
    states: ["OR", "WA", "ID", "MT", "CO", "UT"],
    languages: ["English"],
    since: 2017,
    bio: "Ruth practised rural family medicine in eastern Oregon for fifteen years, where the nearest specialist was a three-hour drive. She founded Vital's clinical protocols and still keeps two clinic days a week.",
    approach:
      "Telehealth is only safe if we are quick to say: this one needs hands, go in. That sentence is part of the service.",
    training: [
      "MD — Oregon Health & Science University",
      "Residency, Family Medicine — Providence Portland",
      "Board certified, ABFM",
    ],
    conditions: [
      "high-blood-pressure",
      "cold-flu-covid",
      "sinus-infection",
      "uti",
    ],
    slots: [
      { day: "Thursday", times: ["8:00 am", "9:30 am"] },
      { day: "Friday", times: ["10:10 am"] },
    ],
  },
  {
    slug: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    credentials: "MD",
    role: "Internal medicine",
    photo: arjun,
    focus: "54% 30%",
    states: ["NY", "NJ", "PA", "MA", "CT", "IL"],
    languages: ["English", "Hindi", "Gujarati"],
    since: 2020,
    bio: "Arjun runs Vital's ongoing-care programme: blood pressure, cholesterol, pre-diabetes. He reads home-monitor data the way other people read the weather.",
    approach:
      "A good plan is the one you can follow on a Tuesday when you are tired. We design for that Tuesday.",
    training: [
      "MD — Rutgers New Jersey Medical School",
      "Residency, Internal Medicine — Mount Sinai Morningside",
      "Board certified, ABIM",
    ],
    conditions: ["high-blood-pressure", "sinus-infection", "uti"],
    slots: [
      { day: "Today", times: ["7:00 pm"] },
      { day: "Wednesday", times: ["12:30 pm", "1:10 pm", "4:40 pm"] },
    ],
  },
  {
    slug: "marcus-bell",
    name: "Marcus Bell",
    credentials: "PA-C",
    role: "Physician assistant · Urgent care",
    photo: marcus,
    focus: "50% 25%",
    states: ["TX", "OK", "LA", "GA", "FL"],
    languages: ["English", "Spanish"],
    since: 2021,
    bio: "Marcus came to Vital from a Houston emergency department, which is why he is the one who writes our red-flag questions. He sees urgent-care visits across the South.",
    approach:
      "I would rather send ten people to the ER who turn out fine than miss the one who was not.",
    training: [
      "MPAS — Baylor College of Medicine",
      "BS Biology — Texas Southern University",
      "Certified, NCCPA",
    ],
    conditions: ["uti", "cold-flu-covid", "sore-throat", "eczema-rashes"],
    slots: [
      { day: "Today", times: ["6:15 pm", "8:45 pm", "10:20 pm"] },
      { day: "Tomorrow", times: ["7:30 am"] },
    ],
  },
  {
    slug: "tomas-varga",
    name: "Dr. Tomás Varga",
    credentials: "MD",
    role: "Dermatology",
    photo: tomas,
    focus: "48% 30%",
    states: ["CA", "OR", "WA", "CO", "NY"],
    languages: ["English", "Spanish", "Hungarian"],
    since: 2022,
    bio: "Tomás leads skin care at Vital and reviews every acne plan in its twelfth week. He built the photo guide that tells you where to stand relative to a window.",
    approach:
      "Skin changes slowly. Photos are how we prove to you that it is changing.",
    training: [
      "MD — UCSF School of Medicine",
      "Residency, Dermatology — University of Washington",
      "Board certified, ABD",
    ],
    conditions: ["acne", "eczema-rashes", "pink-eye"],
    slots: [{ day: "Monday", times: ["9:00 am", "11:40 am", "2:20 pm"] }],
  },
  {
    slug: "dana-ruiz",
    name: "Dana Ruiz",
    credentials: "LCSW",
    role: "Licensed therapist",
    photo: dana,
    focus: "50% 28%",
    states: ["CA", "AZ", "NM", "TX"],
    languages: ["English", "Spanish"],
    since: 2018,
    bio: "Dana has worked with adults through anxiety, grief and burnout for twelve years, first in a community clinic in Albuquerque and now on video. She offers evening sessions for people who cannot take time off.",
    approach: "Therapy should fit into a life, not wait for one to calm down.",
    training: [
      "MSW — University of New Mexico",
      "Certified in Cognitive Behavioural Therapy — Beck Institute",
      "Licensed clinical social worker",
    ],
    conditions: ["anxiety-low-mood"],
    slots: [
      { day: "Tuesday", times: ["6:00 pm", "7:00 pm"] },
      { day: "Thursday", times: ["8:00 pm"] },
    ],
  },
];

/* ------------------------------------------------------------ pricing */

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  visit: number;
  message: number;
  people: string;
  pitch: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "visit",
    name: "Pay per visit",
    monthly: 0,
    yearly: 0,
    visit: 59,
    message: 39,
    people: "Just you",
    pitch: "For the once-a-year sinus infection.",
    features: [
      "Video visits from $59",
      "Message visits from $39",
      "Prescriptions to any pharmacy",
      "Follow-up messages for 7 days",
    ],
  },
  {
    id: "plus",
    name: "Vital Plus",
    monthly: 15,
    yearly: 144,
    visit: 25,
    message: 0,
    people: "One adult",
    pitch: "For ongoing care and the people who get every bug going.",
    features: [
      "Video visits at $25",
      "Unlimited message visits",
      "Choose a regular clinician",
      "Home blood-pressure cuff at cost",
      "Lab orders at member pricing",
    ],
    featured: true,
  },
  {
    id: "family",
    name: "Vital Family",
    monthly: 29,
    yearly: 276,
    visit: 25,
    message: 0,
    people: "Up to 6 people",
    pitch: "For households with small kids and a 2 am ear tug.",
    features: [
      "Everything in Plus, for everyone",
      "Pediatric visits from age one",
      "One account, separate charts",
      "Smartphone otoscope shipped free",
    ],
  },
];

export const compareRows: {
  label: string;
  values: [string, string, string];
}[] = [
  { label: "Video visit", values: ["$59", "$25", "$25"] },
  { label: "Message visit", values: ["$39", "Included", "Included"] },
  { label: "Mental health first visit", values: ["$99", "$69", "$69"] },
  { label: "Follow-up messages", values: ["7 days", "Unlimited", "Unlimited"] },
  { label: "Regular clinician", values: ["—", "Yes", "Yes"] },
  { label: "Kids from age one", values: ["$59 per visit", "—", "Included"] },
];

export const insurers = [
  "Harborview Health Plan",
  "Meridel Mutual",
  "Prairie Shield",
  "Ironwood Care",
  "Lakeshore Benefits",
  "Sunward HMO",
  "Cascadia Employers Trust",
  "Tri-County Medicaid",
];

export const pricingFaq = [
  {
    q: "Do you take insurance?",
    a: "Yes, for video and scheduled visits with the plans listed. We show your copay before the visit starts; if your plan says no, we switch you to the self-pay price instead of surprising you later.",
  },
  {
    q: "Can I use an HSA or FSA card?",
    a: "Yes. Visits and memberships are eligible medical expenses. Download itemised receipts from the app.",
  },
  {
    q: "What if Vital cannot treat me?",
    a: "If the clinician refers you to in-person care within the first ten minutes, the visit is free.",
  },
  {
    q: "Can I cancel a membership?",
    a: "Any time, in two taps. Monthly plans stop at the end of the month; yearly plans refund the unused months.",
  },
];

/* ------------------------------------------------------------ how it works */

export const steps = [
  {
    time: "0:00",
    title: "Check in from wherever you are",
    text: "Five short screens: who it is for, what is going on, a safety screen, how bad and how long. No account until the end.",
  },
  {
    time: "0:04",
    title: "A clinician reads your slip",
    text: "Your answers arrive as one page. The first available clinician licensed in your state picks it up, or the one you asked for.",
  },
  {
    time: "0:12",
    title: "Talk it through on video or by message",
    text: "Most video visits last eight to twelve minutes. Message visits get a written plan, usually within the hour.",
  },
  {
    time: "0:30",
    title: "Pick up at your pharmacy",
    text: "Prescriptions go to any pharmacy you choose, or are delivered by our partner the next day. Your plan and notes stay in the app.",
  },
];

export const cannotDo = [
  "Emergencies — call 911",
  "Controlled substances, including opioids, benzodiazepines and stimulants",
  "Injuries that may need an X-ray or stitches",
  "Physical exams for sports, work or immigration",
  "Children under one year old",
];

export const howFaq = [
  {
    q: "What do I need for a video visit?",
    a: "A phone, tablet or computer with a camera, decent light and a few quiet minutes. The app works in any modern browser — no download required.",
  },
  {
    q: "Which states do you cover?",
    a: "Clinicians are licensed in 38 states and Washington, D.C. The check-in only shows clinicians licensed where you are physically located at the time of the visit.",
  },
  {
    q: "Who sees my records?",
    a: "Your clinician, our medical director for quality review, and anyone you choose to share them with. We never sell health data, and we never use it for advertising.",
  },
  {
    q: "Can I get labs or imaging?",
    a: "Labs, yes — at 2,300 partner sites, often the same day. Imaging needs an in-person referral, which we write and send.",
  },
];

/* ------------------------------------------------------------ home + editorial */

export const home = {
  title: "A clinician on your phone in about fifteen minutes.",
  lede: "Vital treats everyday illness, skin, mental health and ongoing conditions by video and message. Board-certified clinicians, honest prices, and a clear answer when you need to go in person.",
  stance: {
    title: "We will tell you when Vital is the wrong place.",
    text: "About one visit in nine ends with a clinician sending someone to urgent care or the ER. Those visits are free. A telehealth service that never says “go in” is not being careful.",
  },
  sceneTitle: "Seen from the sofa, the car park, the night shift.",
  sceneText:
    "Most of our visits happen before work, in a lunch break, or after the kids are asleep. Clinicians work from quiet rooms across the country; you work from wherever you are when it starts to hurt.",
  close: {
    title: "Feeling rough? Start a check-in.",
    text: "It takes about four minutes. You only pay once a clinician accepts your visit.",
  },
};

export const notes = [
  {
    quote:
      "Woke up at 5 with a burning UTI and had antibiotics from the 24-hour pharmacy before my train.",
    who: "Priya, 34",
    condition: "uti",
  },
  {
    quote:
      "Marcus asked one question about my breathing, then told me to go to the ER. He was right. I am glad he did not try to be clever on video.",
    who: "Daniel, 52",
    condition: "cold-flu-covid",
  },
  {
    quote:
      "Twelve weeks of photos in the app is the first time I could actually see my skin getting better.",
    who: "Leah, 23",
    condition: "acne",
  },
];

export const scenes = {
  clinicianPhone,
  patientLaptop,
  family,
  bloodPressure,
  pharmacist,
  hands,
};

export const app = {
  title: "Your chart, your visits, your pharmacy, in one pocket.",
  lede: "The Vital app is where your check-ins, visit notes, prescriptions and home readings live. It works on iPhone, Android and any browser, and it opens to the thing you need right now.",
  features: [
    {
      title: "Live wait, honestly shown",
      text: "The home screen shows the real queue for your state, updated every minute, before you start.",
    },
    {
      title: "Visit notes in plain English",
      text: "After every visit: what you have, what to take, what to watch for, and the date to message back.",
    },
    {
      title: "Prescription tracking",
      text: "See when your pharmacy receives, fills and readies your prescription. Switch pharmacy in one tap.",
    },
    {
      title: "Home readings",
      text: "Blood pressure cuffs and scales sync over Bluetooth. Your clinician sees the trend, not just the last number.",
    },
    {
      title: "One account for the household",
      text: "Switch between family members' charts. Kids' charts move to them at 18.",
    },
    {
      title: "Face ID and passcode lock",
      text: "Health data is encrypted on the device and in transit. Nothing is shown in notifications.",
    },
  ],
};

export const about = {
  title: "Started by a rural family doctor who was tired of three-hour drives.",
  lede: "Vital began in 2017 as Dr. Ruth Calloway's video clinic for patients in eastern Oregon. It now has 140 clinicians licensed in 38 states, and the same rule: if it needs hands, we say so.",
  story: [
    "In Baker County, the nearest dermatologist was 130 miles away and the urgent care closed at six. Ruth started taking video calls on Tuesday evenings for patients who could not make the drive. Within a year the evening list was longer than the clinic day.",
    "Vital Health PC was formed in 2019 as a physician-owned practice, which it still is. Clinical decisions are made by clinicians; the company that builds the app works for the practice, not the other way round.",
    "We grew slowly on purpose. Every new state means new licences, new pharmacy partners, new lab sites and a local referral list for the visits we cannot finish.",
  ],
  standards: [
    {
      title: "Board-certified, licensed where you are",
      text: "Every clinician is board certified and licensed in the state you are in during the visit. We check licences monthly against state boards.",
    },
    {
      title: "Evidence-based prescribing",
      text: "Antibiotics only when they will help. Our antibiotic rate for sore throats is reviewed every quarter against national guidelines.",
    },
    {
      title: "No controlled substances",
      text: "We do not prescribe opioids, benzodiazepines or stimulants on Vital. It keeps our incentives clean.",
    },
    {
      title: "Free when we refer you out",
      text: "If a clinician sends you in person in the first ten minutes, you are not charged.",
    },
    {
      title: "Your data is yours",
      text: "HIPAA-compliant, encrypted, never sold, never used for advertising. Export your full chart any time.",
    },
  ],
  leadership: [
    { name: "Dr. Ruth Calloway", role: "Founder & medical director" },
    { name: "Owen Takahashi", role: "Chief executive, Vital Technologies" },
    { name: "Dr. Simone Adeyemi", role: "Director of quality & safety" },
    { name: "Grace Lindqvist", role: "Head of patient support" },
  ],
};

export const homeFaq = [howFaq[0], pricingFaq[0], howFaq[2]];

/** States where the sample clinicians hold licences (used by the check-in). */
export const states: Record<string, string> = {
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  FL: "Florida",
  GA: "Georgia",
  ID: "Idaho",
  IL: "Illinois",
  LA: "Louisiana",
  MA: "Massachusetts",
  MT: "Montana",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  TX: "Texas",
  UT: "Utah",
  WA: "Washington",
};

export const durations = [
  "Since today",
  "1–3 days",
  "4–7 days",
  "1–2 weeks",
  "Longer than 2 weeks",
];

export const severityWords: [number, string][] = [
  [3, "Mild — annoying, but I am getting on with my day"],
  [6, "Moderate — it is getting in the way"],
  [8, "Severe — hard to do anything else"],
  [10, "The worst I have ever felt"],
];

export const whileYouWait = [
  "Find a quiet spot with light in front of you, not behind.",
  "Have your pharmacy's name and any medicine bottles nearby.",
  "Keep this tab open — the call starts here when your clinician is ready.",
];
