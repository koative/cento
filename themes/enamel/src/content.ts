import surgery from "./assets/surgery.jpg";
import handpieces from "./assets/handpieces.jpg";
import overhead from "./assets/overhead.jpg";
import redChair from "./assets/red-chair.jpg";
import instruments from "./assets/instruments.jpg";
import model from "./assets/model.jpg";
import toothbrush from "./assets/toothbrush.jpg";
import panoramic from "./assets/panoramic.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Enamel",
  sector: "Dental clinic",
  tagline: "Careful dentistry, priced before we pick up a drill.",
  phone: "+1 555 014 2280",
  emergencyPhone: "+1 555 014 2299",
  email: "hello@enamel.example",
  address: ["48 Halden Street, Suite 2", "Northvale, OR 97230"],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { to: "/treatments", label: "Treatments" },
  { to: "/dentists", label: "Dentists" },
  { to: "/prices", label: "Prices" },
  { to: "/new-patients", label: "New patients" },
  { to: "/visit", label: "Visit" },
];

export const images = {
  surgery,
  handpieces,
  overhead,
  redChair,
  instruments,
  model,
  toothbrush,
  panoramic,
};

/* ------------------------------------------------------------ hours (Sunday first) */

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
  null,
  ["08:00", "19:00"],
  ["08:00", "19:00"],
  ["08:00", "19:00"],
  ["08:00", "19:00"],
  ["08:00", "16:00"],
  ["09:00", "14:00"],
];

/* ------------------------------------------------------------ treatments */

export type Category =
  | "Preventive"
  | "Restorative"
  | "Cosmetic"
  | "Orthodontic"
  | "Surgical"
  | "Urgent"
  | "Children";
export const categories: Category[] = [
  "Preventive",
  "Restorative",
  "Cosmetic",
  "Orthodontic",
  "Surgical",
  "Urgent",
  "Children",
];

/** Which layer of the tooth the treatment works on — drives the cross-section diagram. */
export type Layer =
  "surface" | "crown" | "pulp" | "root" | "gum" | "whole" | "bite";

export type Treatment = {
  slug: string;
  name: string;
  category: Category;
  layer: Layer;
  short: string;
  summary: string;
  minutes: number;
  visits: string;
  price: number;
  priceTo?: number;
  unit: string;
  comfort: string;
  image?: string;
  imageAlt?: string;
  steps: { title: string; body: string }[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
  dentists: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "check-up",
    name: "Check-up & clean",
    category: "Preventive",
    layer: "whole",
    short: "Exam, x-rays when due, scale and polish in one unhurried visit.",
    summary:
      "Forty-five minutes with a dentist and a hygienist in the same room. We look at every tooth, your gums, your bite and the soft tissue of your mouth, take x-rays only when they're due, and finish with a scale and polish. You leave with a written note of what we saw and when we'd like to see you again.",
    minutes: 45,
    visits: "1 visit",
    price: 145,
    unit: "per visit",
    comfort:
      "No numbing needed. Tell us if your gums are sensitive and we'll switch to a gentler scaler.",
    image: surgery,
    imageAlt:
      "A quiet treatment room with a reclined grey dental chair under an overhead lamp",
    steps: [
      {
        title: "History",
        body: "Five minutes on medication, allergies and anything that's been bothering you since last time.",
      },
      {
        title: "Exam",
        body: "Every surface charted on screen, gum pockets measured, a cancer screen of cheeks, tongue and palate.",
      },
      {
        title: "X-rays",
        body: "Two small bitewings every 18 months, a panoramic every five years — only if they're due.",
      },
      {
        title: "Scale & polish",
        body: "Ultrasonic scaling above and below the gumline, then a fluoride polish.",
      },
      {
        title: "Your note",
        body: "A plain-language summary emailed the same afternoon, with prices for anything we'd suggest.",
      },
    ],
    aftercare: [
      "Eat and drink straight away.",
      "Gums can feel tender for a day after a deep scale — rinse with warm salt water.",
      "We'll email a recall reminder five months from today.",
    ],
    faqs: [
      {
        q: "How often should I come?",
        a: "Most adults every six months. If your gums are healthy and you've had no new decay for two years, we'll happily stretch it to nine or twelve.",
      },
      {
        q: "Is the x-ray safe?",
        a: "A bitewing pair is roughly the dose of a short flight. We use digital sensors and skip them entirely when they aren't due.",
      },
    ],
    dentists: ["mira-okafor", "ana-sousa", "celia-marchetti"],
  },
  {
    slug: "hygienist",
    name: "Hygienist session",
    category: "Preventive",
    layer: "gum",
    short:
      "A deeper clean for gums that bleed, plus a coaching session on brushing and floss.",
    summary:
      "Forty minutes with our hygienist for gums that bleed when you brush, tartar that builds quickly, or braces and implants that need extra care. We stain-test your teeth so you can see what the brush is missing, then fix it together.",
    minutes: 40,
    visits: "1 visit",
    price: 110,
    unit: "per visit",
    comfort:
      "Numbing gel on request for sensitive areas. Most people need nothing.",
    image: toothbrush,
    imageAlt:
      "A yellow toothbrush loaded with striped toothpaste on a white surface",
    steps: [
      {
        title: "Gum check",
        body: "Six measurements per tooth to see where pockets have deepened.",
      },
      {
        title: "Disclosing",
        body: "A harmless dye shows plaque in pink so you can see the spots your brush skips.",
      },
      {
        title: "Deep clean",
        body: "Ultrasonic and hand scaling, then air polishing for coffee and tea stains.",
      },
      {
        title: "Coaching",
        body: "Ten minutes on brush angle, interdental brush sizes and a routine you'll actually keep.",
      },
    ],
    aftercare: [
      "Avoid coffee, tea and red wine for two hours after air polishing.",
      "Use the interdental brush sizes we give you every night.",
    ],
    faqs: [
      {
        q: "Do I need a check-up first?",
        a: "Not if you've seen a dentist in the last 12 months. Otherwise we'll book a check-up and hygienist visit back to back.",
      },
      {
        q: "My gums bleed — is that normal?",
        a: "Common, but not normal. It's usually gingivitis, and it usually settles within two weeks of better cleaning.",
      },
    ],
    dentists: ["ana-sousa"],
  },
  {
    slug: "white-fillings",
    name: "White fillings",
    category: "Restorative",
    layer: "crown",
    short: "Tooth-coloured composite for cavities, matched to your shade.",
    summary:
      "We remove the decay, shape the cavity as small as possible and rebuild it in layers of composite resin matched to the shade of the surrounding tooth. Most fillings take one visit; you can eat as soon as the numbness wears off.",
    minutes: 45,
    visits: "1 visit",
    price: 160,
    priceTo: 290,
    unit: "per tooth",
    comfort:
      "Local anaesthetic, applied after a numbing gel. Lips stay numb for about two hours.",
    steps: [
      {
        title: "Numb",
        body: "Gel first, then a slow anaesthetic. We wait until you confirm it's numb.",
      },
      {
        title: "Clean out",
        body: "Decay removed, healthy tooth left alone wherever possible.",
      },
      {
        title: "Layer",
        body: "Composite placed in thin layers and hardened with a blue light, two seconds a layer.",
      },
      {
        title: "Shape & bite",
        body: "Polished, then checked against your bite with paper so nothing feels high.",
      },
    ],
    aftercare: [
      "Wait until the numbness wears off before eating hot food.",
      "Mild sensitivity to cold for a week is normal; longer than two weeks, call us.",
    ],
    faqs: [
      {
        q: "Can you replace my old silver fillings?",
        a: "Yes, but only when they're failing. Removing a sound amalgam filling takes away healthy tooth too, so we'll tell you honestly whether it's worth it.",
      },
      {
        q: "How long do they last?",
        a: "Typically 7–10 years, longer on front teeth and small fillings.",
      },
    ],
    dentists: ["mira-okafor", "celia-marchetti"],
  },
  {
    slug: "root-canal",
    name: "Root canal treatment",
    category: "Restorative",
    layer: "pulp",
    short:
      "Saves an infected tooth by cleaning and sealing the canals inside it.",
    summary:
      "When the nerve inside a tooth is inflamed or infected, a root canal treatment cleans the canals under a microscope, disinfects them and seals them from the tip of the root up. It's the treatment people dread most and the one that most often ends the pain — it feels much like a long filling.",
    minutes: 90,
    visits: "1–2 visits",
    price: 890,
    priceTo: 1250,
    unit: "per tooth",
    comfort:
      "Full local anaesthetic, rubber dam, and a pause every 15 minutes. Headphones offered.",
    image: panoramic,
    imageAlt:
      "A panoramic dental x-ray showing both jaws and the roots of every tooth",
    steps: [
      {
        title: "Diagnose",
        body: "A cold test and a fresh x-ray confirm which tooth and how many canals.",
      },
      {
        title: "Clean",
        body: "Under a microscope, the canals are opened, shaped and rinsed with disinfectant.",
      },
      {
        title: "Seal",
        body: "Canals filled with a rubber-like material and sealed to the root tip.",
      },
      {
        title: "Protect",
        body: "A filling closes the top; back teeth usually need a crown a few weeks later.",
      },
    ],
    aftercare: [
      "Expect the tooth to ache when you bite for 3–5 days; ibuprofen helps.",
      "Chew on the other side until the permanent filling or crown is in.",
    ],
    faqs: [
      {
        q: "Does it hurt?",
        a: "The infection hurts; the treatment shouldn't. If you feel anything sharp, raise your hand and we stop and top up the anaesthetic.",
      },
      {
        q: "Wouldn't removing the tooth be cheaper?",
        a: "On the day, yes. Replacing it later with an implant costs about three times as much, so we'll show you both prices side by side.",
      },
    ],
    dentists: ["tomas-lindqvist"],
  },
  {
    slug: "crowns",
    name: "Ceramic crowns",
    category: "Restorative",
    layer: "crown",
    short:
      "A full ceramic cap for cracked, heavily filled or root-treated teeth.",
    summary:
      "A crown covers a weakened tooth completely, holding it together the way a ring holds a barrel. We scan your tooth instead of taking a gooey impression, and the ceramic is milled by a lab six blocks away so the shade can be checked in person.",
    minutes: 75,
    visits: "2 visits",
    price: 1150,
    unit: "per tooth",
    comfort:
      "Local anaesthetic for the preparation visit; the fitting visit usually needs none.",
    image: model,
    imageAlt:
      "A stone model of a lower jaw on a lab articulator, used to check how crowns meet the bite",
    steps: [
      {
        title: "Prepare",
        body: "The tooth is shaped and scanned; you leave with a temporary crown.",
      },
      {
        title: "Lab",
        body: "Our partner lab mills the ceramic and hand-glazes it to your shade over 10 working days.",
      },
      {
        title: "Fit",
        body: "Temporary off, crown tried in, bite checked, then bonded in place.",
      },
    ],
    aftercare: [
      "Avoid sticky sweets on the temporary.",
      "Floss by sliding the thread out sideways, not pulling it up.",
    ],
    faqs: [
      {
        q: "Will it look fake?",
        a: "Not if the shade is right. You can visit the lab before the glaze is fired to approve it.",
      },
      {
        q: "How long does a crown last?",
        a: "Ten to fifteen years is typical. A night guard helps if you grind.",
      },
    ],
    dentists: ["mira-okafor", "jonah-feld"],
  },
  {
    slug: "implants",
    name: "Dental implants",
    category: "Surgical",
    layer: "root",
    short: "A titanium root and a ceramic crown to replace a missing tooth.",
    summary:
      "An implant replaces the root of a missing tooth with a small titanium post that the bone grows around. After it settles, we fit a ceramic crown on top. The price below includes the planning scan, the implant, the abutment and the crown.",
    minutes: 90,
    visits: "3–4 visits over 3–6 months",
    price: 3400,
    unit: "per tooth, crown included",
    comfort:
      "Local anaesthetic. Most people describe it as easier than having the tooth out.",
    image: instruments,
    imageAlt:
      "Dental handpieces hanging from a unit with an instrument tray on a blue paper liner",
    steps: [
      {
        title: "Plan",
        body: "A 3D scan shows bone height and nerve position. You see the plan on screen.",
      },
      {
        title: "Place",
        body: "The implant is placed in about 40 minutes; a few stitches close the gum.",
      },
      {
        title: "Heal",
        body: "Three months for the bone to bond. A temporary tooth fills the gap at the front.",
      },
      {
        title: "Crown",
        body: "The crown is scanned, milled and screwed into place.",
      },
    ],
    aftercare: [
      "Soft food and no hot drinks for 24 hours.",
      "Rinse gently with salt water from the second day.",
      "Stitches dissolve in 10 days.",
    ],
    faqs: [
      {
        q: "Am I too old for an implant?",
        a: "Age isn't the limit — bone and health are. We've placed implants for patients in their nineties.",
      },
      {
        q: "Is there a payment plan?",
        a: "Yes. Implants can be spread over 12 months at 0% once the plan is agreed.",
      },
    ],
    dentists: ["jonah-feld"],
  },
  {
    slug: "clear-aligners",
    name: "Clear aligners",
    category: "Orthodontic",
    layer: "bite",
    short:
      "Removable trays that straighten teeth a fraction of a millimetre at a time.",
    summary:
      "A series of thin, clear trays, each worn for one to two weeks, that move your teeth in planned steps. You'll see a simulation of the finished smile before you commit, and every six weeks Dr. Raman checks progress in person — not over an app.",
    minutes: 60,
    visits: "Check-ins every 6 weeks",
    price: 3900,
    priceTo: 5600,
    unit: "per course",
    comfort:
      "Each new tray feels tight for a day or two. No anaesthetic needed.",
    image: overhead,
    imageAlt:
      "A dental chair photographed from directly above, with instruments resting beside it",
    steps: [
      {
        title: "Scan & simulate",
        body: "An intraoral scan and a simulation of every stage, so you can see the end result.",
      },
      {
        title: "Attachments",
        body: "Small tooth-coloured bumps bonded to some teeth so the trays can grip.",
      },
      {
        title: "Wear",
        body: "Trays in 22 hours a day, out only to eat and brush.",
      },
      {
        title: "Retain",
        body: "Retainers at night, for life — included in the price.",
      },
    ],
    aftercare: [
      "Brush before putting trays back in.",
      "Drink only water with the trays in.",
    ],
    faqs: [
      {
        q: "How long does it take?",
        a: "Six months for small crowding at the front; up to eighteen for bite correction.",
      },
      {
        q: "Can I do it without in-person visits?",
        a: "We don't offer that. Teeth move through bone, and someone qualified should look at them as they do.",
      },
    ],
    dentists: ["priya-raman"],
  },
  {
    slug: "whitening",
    name: "Teeth whitening",
    category: "Cosmetic",
    layer: "surface",
    short: "Custom trays and gel for home, or one in-chair session.",
    summary:
      "Professional whitening lifts stains from inside the enamel rather than scrubbing the surface. Home trays are gentler and last longer; the in-chair session is faster. Either way we check your teeth first, because whitening doesn't change the colour of fillings or crowns.",
    minutes: 60,
    visits: "1–2 visits",
    price: 395,
    priceTo: 650,
    unit: "home trays / in-chair",
    comfort:
      "Some sensitivity for a day or two. Desensitising gel is included.",
    image: handpieces,
    imageAlt:
      "Dental handpieces in their holders beside a reclined chair in a bright room",
    steps: [
      {
        title: "Shade check",
        body: "We record your starting shade and photograph it.",
      },
      {
        title: "Trays or session",
        body: "Home: trays made in a week, 14 nights of gel. In-chair: 60 minutes under a light.",
      },
      {
        title: "Review",
        body: "A shade check two weeks later, and a top-up syringe for next year.",
      },
    ],
    aftercare: [
      "Skip coffee, tea, red wine and curry for 48 hours.",
      "Use the desensitising gel if cold drinks sting.",
    ],
    faqs: [
      {
        q: "How white will they get?",
        a: "Usually four to eight shades lighter. We'll show you a realistic target on the shade guide before you start.",
      },
      {
        q: "Is it bad for enamel?",
        a: "Not at professional concentrations under supervision. Supermarket strips with acidic gels are a different story.",
      },
    ],
    dentists: ["mira-okafor", "priya-raman"],
  },
  {
    slug: "bonding",
    name: "Composite bonding",
    category: "Cosmetic",
    layer: "surface",
    short:
      "Resin sculpted onto chipped edges, small gaps or uneven teeth — no drilling.",
    summary:
      "Bonding repairs chips and closes small gaps by sculpting tooth-coloured resin directly onto the tooth. It's additive: we rarely remove any enamel, so it can be polished, repaired or taken off later.",
    minutes: 60,
    visits: "1 visit",
    price: 240,
    unit: "per tooth",
    comfort: "Usually no anaesthetic at all.",
    steps: [
      {
        title: "Shade",
        body: "We match two or three shades — edges are more translucent than the middle.",
      },
      {
        title: "Sculpt",
        body: "Resin built up freehand and hardened layer by layer.",
      },
      {
        title: "Polish",
        body: "Shaped and polished to a natural lustre that reflects light like enamel.",
      },
    ],
    aftercare: [
      "Don't bite nails, pens or thread with bonded edges.",
      "A polish at each check-up keeps the shine.",
    ],
    faqs: [
      {
        q: "How long does bonding last?",
        a: "Five to seven years before it needs a re-polish or repair, often longer.",
      },
    ],
    dentists: ["priya-raman", "mira-okafor"],
  },
  {
    slug: "wisdom-teeth",
    name: "Wisdom tooth removal",
    category: "Surgical",
    layer: "root",
    short:
      "Removal of impacted or troublesome wisdom teeth, with a clear recovery plan.",
    summary:
      "We only remove wisdom teeth that are causing trouble or clearly will. Dr. Feld plans from a 3D scan so he knows exactly where the nerve lies before he starts, and you go home with a printed recovery plan and his mobile number for the first night.",
    minutes: 60,
    visits: "1 visit + review",
    price: 280,
    priceTo: 650,
    unit: "per tooth",
    comfort:
      "Local anaesthetic; sedation available by referral for anxious patients.",
    steps: [
      { title: "Scan", body: "A 3D scan maps the roots and the nerve." },
      {
        title: "Remove",
        body: "Simple teeth in 15 minutes; impacted teeth may need a small incision.",
      },
      { title: "Review", body: "A free check one week later." },
    ],
    aftercare: [
      "Bite on gauze for 30 minutes.",
      "No smoking, straws or spitting for 48 hours.",
      "Soft, cool food for three days.",
    ],
    faqs: [
      {
        q: "Do all four need to come out?",
        a: "Rarely. Many people keep healthy wisdom teeth for life.",
      },
    ],
    dentists: ["jonah-feld"],
  },
  {
    slug: "night-guards",
    name: "Night guards",
    category: "Preventive",
    layer: "bite",
    short:
      "A custom guard for grinding and clenching that protects teeth and jaw.",
    summary:
      "If you wake with a tight jaw, headaches or flattened edges on your teeth, you're likely grinding at night. A thin, hard guard made from a scan of your teeth takes the load so your enamel doesn't.",
    minutes: 30,
    visits: "2 short visits",
    price: 420,
    unit: "per guard",
    comfort: "Nothing to numb — just a scan and a fitting.",
    steps: [
      { title: "Scan", body: "Both arches scanned and your bite recorded." },
      {
        title: "Fit",
        body: "Guard fitted and adjusted so your jaw rests evenly.",
      },
    ],
    aftercare: [
      "Rinse in cool water every morning and let it air-dry in its case.",
    ],
    faqs: [
      {
        q: "Can I use a sports-shop guard instead?",
        a: "Soft boil-and-bite guards can make clenching worse. A hard, flat custom guard lets the jaw relax.",
      },
    ],
    dentists: ["mira-okafor", "tomas-lindqvist"],
  },
  {
    slug: "children",
    name: "Children's check-ups",
    category: "Children",
    layer: "whole",
    short:
      "A gentle first visit from the first tooth, and sealants for the back teeth later.",
    summary:
      "Dr. Marchetti sees children from their first tooth. Early visits are mostly about getting comfortable: riding the chair up and down, counting teeth with a mirror, and giving parents plain advice on bottles, snacks and brushing. Under-fives are seen free when a parent has a check-up the same day.",
    minutes: 30,
    visits: "Every 6 months",
    price: 65,
    unit: "per visit · free under 5 with a parent",
    comfort:
      "No needles at routine visits. We go at your child's pace, even if that means two visits.",
    image: redChair,
    imageAlt: "A bright red dental chair in a sunlit room with cream cabinets",
    steps: [
      {
        title: "Meet",
        body: "Your child sits on your lap or rides the chair on their own.",
      },
      {
        title: "Count",
        body: "A look at every tooth with a mirror they're allowed to hold.",
      },
      {
        title: "Protect",
        body: "Fluoride varnish, and fissure sealants once the back teeth arrive.",
      },
    ],
    aftercare: ["No food for 30 minutes after fluoride varnish."],
    faqs: [
      {
        q: "When should the first visit be?",
        a: "By their first birthday, or when the first tooth shows — whichever comes first.",
      },
      {
        q: "Can siblings come in together?",
        a: "Yes. We book back-to-back slots so the whole family is done in one trip.",
      },
    ],
    dentists: ["celia-marchetti"],
  },
  {
    slug: "emergency",
    name: "Emergency appointment",
    category: "Urgent",
    layer: "pulp",
    short:
      "Same-day slots for toothache, swelling, broken teeth and lost crowns.",
    summary:
      "We hold four emergency slots every weekday morning and two on Saturdays, released at 8:00. The fee covers the exam, any x-rays and the first step to get you out of pain; we'll quote anything further before we start.",
    minutes: 30,
    visits: "Same day",
    price: 120,
    unit: "per visit",
    comfort:
      "Pain relief first, decisions second. Nothing gets done without a price.",
    steps: [
      {
        title: "Call at 8:00",
        body: "Or book the earliest slot online — emergency slots show first.",
      },
      {
        title: "Relieve",
        body: "We find the cause and stop the pain: a dressing, drainage or a temporary filling.",
      },
      {
        title: "Plan",
        body: "A written quote for the permanent fix, booked when it suits you.",
      },
    ],
    aftercare: [
      "Take the painkillers we recommend on schedule, not when the pain returns.",
    ],
    faqs: [
      {
        q: "What if it's after hours?",
        a: `Call the emergency line on +1 555 014 2299 — a dentist on the rota calls back within 30 minutes until 22:00.`,
      },
      {
        q: "When should I go to hospital instead?",
        a: "If swelling is spreading to your eye or neck, or you struggle to swallow or breathe, go to the emergency room straight away.",
      },
    ],
    dentists: ["mira-okafor", "tomas-lindqvist", "jonah-feld"],
  },
];

/* ------------------------------------------------------------ dentists */

export type Dentist = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  since: number;
  days: number[];
  languages: string[];
  focus: string;
  bio: string[];
  quote: string;
  outside: string;
};

export const dentists: Dentist[] = [
  {
    slug: "mira-okafor",
    name: "Dr. Mira Okafor",
    role: "General dentist · Clinical lead",
    credentials: "DDS, Oregon Health & Science University",
    since: 2014,
    days: [1, 2, 4, 5],
    languages: ["English", "Igbo"],
    focus:
      "Check-ups, fillings, crowns and the anxious patients other clinics gave up on.",
    bio: [
      "Mira opened Enamel in 2014 after eight years in community clinics, where she learned to explain a treatment plan in two minutes and a price in one sentence.",
      "She still does most of the clinic's first visits, because she thinks the first hour sets the tone for the next ten years.",
    ],
    quote:
      "If I can't show you the problem on the screen, I'm not going to treat it.",
    outside: "Restores mid-century radios, badly.",
  },
  {
    slug: "tomas-lindqvist",
    name: "Dr. Tomas Lindqvist",
    role: "Endodontist",
    credentials: "DDS, MS Endodontics, University of Washington",
    since: 2017,
    days: [1, 3, 4],
    languages: ["English", "Swedish"],
    focus:
      "Root canals under the microscope, cracked teeth and stubborn toothache.",
    bio: [
      "Tomas does nothing but the inside of teeth. He works under a surgical microscope for every root canal and records the canals so you can see them afterwards.",
      "Other dentists in Northvale refer their hardest cases to him; he'd rather you came to him before it got that far.",
    ],
    quote:
      "Most people's worst root canal story is about the toothache before it.",
    outside: "Cross-country skis every weekend the pass is open.",
  },
  {
    slug: "priya-raman",
    name: "Dr. Priya Raman",
    role: "Orthodontist",
    credentials: "DMD, Certificate in Orthodontics, Boston",
    since: 2019,
    days: [2, 3, 6],
    languages: ["English", "Tamil", "Spanish"],
    focus:
      "Clear aligners for adults, bonding and whitening to finish the job.",
    bio: [
      "Priya treats adults who were told as teenagers that braces weren't worth it. She plans every aligner course herself and sees each patient in person every six weeks.",
      "She'll also tell you when a little bonding would get you 90% of the way for a tenth of the price.",
    ],
    quote: "A straighter smile is the goal; the trays are just the commute.",
    outside: "Sings alto in the Northvale community choir.",
  },
  {
    slug: "jonah-feld",
    name: "Dr. Jonah Feld",
    role: "Oral surgeon",
    credentials: "DDS, Oral & Maxillofacial Surgery residency, Portland",
    since: 2016,
    days: [2, 4, 5],
    languages: ["English", "Hebrew"],
    focus: "Implants, wisdom teeth and extractions planned from a 3D scan.",
    bio: [
      "Jonah plans every implant and wisdom tooth on a 3D scan before he picks up an instrument, and walks you through the plan on screen.",
      "His patients go home with his mobile number for the first night. Very few use it, which is the point.",
    ],
    quote:
      "Surgery is mostly planning. The part in the chair should be the boring bit.",
    outside: "Bakes rye bread from a starter older than the clinic.",
  },
  {
    slug: "celia-marchetti",
    name: "Dr. Celia Marchetti",
    role: "Family & paediatric dentist",
    credentials: "DDS, Certificate in Paediatric Dentistry",
    since: 2020,
    days: [1, 3, 5, 6],
    languages: ["English", "Italian"],
    focus:
      "Children from the first tooth, teenagers, and the parents who bring them.",
    bio: [
      "Celia sees children from their first tooth and has a policy that no child leaves the first visit having had anything done they didn't agree to.",
      "Saturday mornings are hers, so school days stay school days.",
    ],
    quote: "A good first visit is worth more than a perfect clean.",
    outside: "Coaches under-9s football and loses most weeks.",
  },
  {
    slug: "ana-sousa",
    name: "Ana Sousa",
    role: "Dental hygienist",
    credentials: "RDH, Portland Community College",
    since: 2015,
    days: [1, 2, 3, 4, 6],
    languages: ["English", "Portuguese"],
    focus: "Gum health, deep cleans and brushing routines that stick.",
    bio: [
      "Ana has been cleaning teeth at Enamel since the second year. She keeps notes on every patient's routine and remembers which ones skipped the floss.",
      "Her gum-health programme has taken more than 400 patients from bleeding gums to healthy pockets.",
    ],
    quote:
      "I'm not here to tell you off. I'm here to find the two teeth your brush is missing.",
    outside: "Runs the clinic's Thursday book swap.",
  },
];

/* ------------------------------------------------------------ tooth map (signature) */

export type ConcernId =
  "pain" | "broken" | "missing" | "stained" | "crooked" | "checkup";

export type Concern = {
  id: ConcernId;
  label: string;
  hint: string;
  /** "mark" teeth are charted in red (needs attention), "note" in blue (cosmetic / planned). */
  ink: "mark" | "note";
  treatment: string;
  /** Per-tooth estimate when the treatment is priced per tooth; otherwise charged once. */
  perTooth: boolean;
  advice: string;
};

export const concerns: Concern[] = [
  {
    id: "pain",
    label: "Aches or throbs",
    hint: "Toothache, pain on biting, a tooth that wakes you up",
    ink: "mark",
    treatment: "emergency",
    perTooth: false,
    advice:
      "Book the earliest emergency slot. If it keeps you awake, a root canal may follow — we'll quote it before we start.",
  },
  {
    id: "broken",
    label: "Chipped or broken",
    hint: "A lost filling, a cracked cusp, a sharp edge",
    ink: "mark",
    treatment: "white-fillings",
    perTooth: true,
    advice:
      "Most chips are fixed with a filling in one visit. Large breaks on back teeth may need a crown.",
  },
  {
    id: "missing",
    label: "Missing",
    hint: "A gap you'd like filled",
    ink: "mark",
    treatment: "implants",
    perTooth: true,
    advice:
      "An implant replaces the root and the crown. We'll also show you a bridge and its price at your consultation.",
  },
  {
    id: "stained",
    label: "Stained or dull",
    hint: "Coffee, tea, age — or one darker tooth",
    ink: "note",
    treatment: "whitening",
    perTooth: false,
    advice:
      "Whitening lifts the whole smile. A single dark tooth may need bonding or a check that the nerve is healthy.",
  },
  {
    id: "crooked",
    label: "Crooked or gappy",
    hint: "Crowding, gaps, teeth that overlap",
    ink: "note",
    treatment: "clear-aligners",
    perTooth: false,
    advice:
      "A few front teeth often take six months of aligners; small gaps can sometimes be closed with bonding instead.",
  },
  {
    id: "checkup",
    label: "Just check it",
    hint: "Something feels different but doesn't hurt",
    ink: "note",
    treatment: "check-up",
    perTooth: false,
    advice:
      "A check-up covers every tooth, so we'll look closely at the ones you marked.",
  },
];

/* ------------------------------------------------------------ prices & plans */

export const plan = {
  name: "Enamel Plan",
  monthly: 29,
  yearly: 312,
  childMonthly: 12,
  discount: 0.15,
  includes: [
    "Two check-ups and two hygienist visits a year",
    "X-rays whenever they're due",
    "15% off every other treatment",
    "One emergency appointment a year at no charge",
    "Worldwide dental accident cover up to $1,500",
  ],
  terms:
    "Monthly plans can be cancelled with one month's notice after the first three months. Yearly plans are paid upfront and are not refundable after the first visit.",
};

export const paymentNotes = [
  {
    title: "Price before treatment",
    body: "You get a written estimate before anything beyond the exam. If the plan changes in the chair, we stop and ask.",
  },
  {
    title: "Insurance",
    body: "We're in network with most PPO plans and file the claim for you. We'll tell you what your plan is likely to pay before the visit.",
  },
  {
    title: "Spread the cost",
    body: "Treatment over $600 can be paid over 3, 6 or 12 months at 0%, subject to a simple affordability check.",
  },
];

/* ------------------------------------------------------------ new patients */

export const firstVisit = [
  {
    at: "0 min",
    title: "Arrive",
    body: "Ten minutes early is plenty. Tea, water and the Wi-Fi password are at the desk.",
  },
  {
    at: "5 min",
    title: "History",
    body: "We go through your health form together, in a room, not across the counter.",
  },
  {
    at: "15 min",
    title: "X-rays & photos",
    body: "Only what's needed, shown on the ceiling screen as soon as they're taken.",
  },
  {
    at: "25 min",
    title: "Exam",
    body: "Every tooth charted out loud, so you hear what we see.",
  },
  {
    at: "40 min",
    title: "The plan",
    body: "Options ranked by urgency, each with a price. No decisions needed today.",
  },
];

export const comfortMenu = [
  {
    title: "A stop signal",
    body: "Raise your left hand and everything stops — no questions asked, as often as you need.",
  },
  {
    title: "Headphones & ceiling screens",
    body: "Bring your own playlist or choose a show; we'll talk to you through the music.",
  },
  {
    title: "Numbing gel first",
    body: "Every injection starts with a topical gel and a slow, computer-paced anaesthetic.",
  },
  {
    title: "Weighted blanket",
    body: "Ask for it at the desk. Most patients who try it ask again.",
  },
  {
    title: "Longer appointments",
    body: "Tell us you're nervous when you book and we'll add fifteen minutes at no charge.",
  },
  {
    title: "Sedation by referral",
    body: "For major work, we partner with an anaesthetist who visits the clinic on Wednesdays.",
  },
];

export const bring = [
  "Photo ID and your insurance card, if you have one",
  "A list of medicines you take, including inhalers and supplements",
  "Previous x-rays if they're under two years old — or your old clinic's name and we'll request them",
  "Glasses, if you need them to read the plan",
];

export const policies = [
  {
    title: "Cancelling",
    body: "Please give us 24 hours. The first late cancellation is free; after that we charge $40, which goes to the Northvale school dental programme.",
  },
  {
    title: "Running late",
    body: "We'll still see you if more than half your slot remains. Otherwise we'll rebook you without a fee.",
  },
  {
    title: "Paying",
    body: "Card, phone or insurance on the day. We don't take deposits for routine visits.",
  },
];

export type Faq = { q: string; a: string };
export const newPatientFaqs: Faq[] = [
  {
    q: "Are you accepting new patients?",
    a: "Yes, adults and children. Most new patients are seen within eight working days; emergencies the same day.",
  },
  {
    q: "I haven't been to a dentist in years. Will I be told off?",
    a: "No. Around a third of our new patients haven't been in five years or more. We start with what's comfortable and what's urgent.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral needed for anything we do, including implants and root canals.",
  },
  {
    q: "Can I book for my whole family at once?",
    a: "Yes — book the first person online, then add the others in the notes and we'll line up back-to-back slots.",
  },
  {
    q: "Is the building accessible?",
    a: "Step-free from the street, a lift to the second floor, a hearing loop at reception and a chair that lowers to wheelchair height.",
  },
  {
    q: "How do I transfer my records?",
    a: "Give us your previous clinic's name on the health form and we'll request your x-rays and notes for you.",
  },
];

/* ------------------------------------------------------------ voices */

export const notes = [
  {
    quote:
      "I hadn't been in eleven years. Dr. Okafor showed me every photo, priced every option, and let me choose the order. I've now been back four times — voluntarily.",
    name: "Rafael M.",
    context: "New patient, 2025",
  },
  {
    quote:
      "Root canal with Dr. Lindqvist: I watched a documentary on the ceiling, raised my hand twice, and it was done before the second episode.",
    name: "Hannah T.",
    context: "Root canal treatment",
  },
  {
    quote:
      "My daughter asked when she can go back to 'the red chair lady'. That's Dr. Marchetti, and that's the whole review.",
    name: "Owen K.",
    context: "Children's check-ups",
  },
];

/* ------------------------------------------------------------ about */

export const about = {
  lede: "Enamel is a six-chair clinic on the second floor of the old Halden Street post office. We opened in 2014 with one chair and one rule: you see the problem, then you see the price, then you decide.",
  story: [
    "Dr. Mira Okafor spent eight years in community clinics before opening Enamel. What she noticed most was not decay but fear — and that most of it came from not knowing what was happening or what it would cost.",
    "So the clinic is built around showing. Every room has a ceiling screen for x-rays and photos. Every plan is printed with prices. Every appointment starts with a conversation in a chair that's sitting up, not lying back.",
    "Twelve years later there are five dentists, a hygienist, four nurses and a front desk that knows most patients by name. The rule hasn't changed.",
  ],
  principles: [
    {
      title: "Show, then treat",
      body: "Nothing is drilled, filled or removed until you've seen why on the screen.",
    },
    {
      title: "Price on paper",
      body: "Every option in your plan has a printed price. If it changes mid-treatment, we stop and ask.",
    },
    {
      title: "Keep teeth",
      body: "We'd rather save a tooth with a root canal than replace it — and we'll show you both prices to compare.",
    },
    {
      title: "Time is care",
      body: "Check-ups are 45 minutes, not 15. Nervous patients get 15 more, free.",
    },
  ],
  rooms: [
    {
      image: surgery,
      alt: "Treatment room two: a grey chair, lamp and cabinets in clean white light",
      caption:
        "Room two, where most first visits happen. North light, ceiling screen, window that opens.",
    },
    {
      image: redChair,
      alt: "The children's room with a red chair and cream cabinets",
      caption:
        "The children's room. The red chair goes up and down as many times as needed.",
    },
    {
      image: instruments,
      alt: "Handpieces and an instrument tray laid out for the next patient",
      caption:
        "Every instrument is sterilised, sealed and dated in the room behind reception.",
    },
  ],
  sterilisation:
    "Instruments are cleaned, steam-sterilised at 134 °C and sealed in dated pouches that are opened in front of you. Water lines are flushed and tested weekly.",
};

/* ------------------------------------------------------------ visit */

export const visit = {
  lede: "Second floor of the old post office on Halden Street, across from the library. Step-free entrance on the Larch Street side.",
  getting: [
    {
      title: "Tram",
      body: "Lines 4 and 9 to Halden & Larch, then a one-minute walk.",
    },
    { title: "Bike", body: "Six covered racks by the Larch Street door." },
    {
      title: "Car",
      body: "The Library garage on Ninth is two minutes away. We validate 90 minutes at reception.",
    },
  ],
  access: [
    "Step-free entrance and lift to the second floor",
    "Hearing loop at reception and in room one",
    "A treatment chair that lowers to wheelchair transfer height",
    "Quiet waiting room on request — just tell the desk",
  ],
  emergency:
    "Four emergency slots every weekday at 8:00 and two on Saturdays. After hours, the emergency line connects to the dentist on call until 22:00.",
};

export const footerNote =
  "Nothing on this site is sent anywhere — forms and bookings are a demonstration that stays in your browser.";
