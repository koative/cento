import hero from "./assets/hero.jpg";
import renters from "./assets/renters.jpg";
import homeowners from "./assets/homeowners.jpg";
import condo from "./assets/condo.jpg";
import landlord from "./assets/landlord.jpg";
import seasonal from "./assets/seasonal.jpg";
import student from "./assets/student.jpg";
import valuables from "./assets/valuables.jpg";
import water from "./assets/water.jpg";
import kitchen from "./assets/kitchen.jpg";
import street from "./assets/street.jpg";
import porch from "./assets/porch.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Vault",
  legal: "Vault Mutual Insurance Company",
  sector: "Home & renters insurance",
  tagline: "Cover for the home you actually live in.",
  email: "hello@vault.example",
  claimsEmail: "claims@vault.example",
  phone: "+1 555 014 7700",
  phoneHref: "tel:+15550147700",
  claimsPhone: "+1 555 014 7999",
  claimsPhoneHref: "tel:+15550147999",
  address: ["88 Cooper Street, Floor 3", "Ashby, OH 43215"],
  hours:
    "Policy desk Mon–Fri 8am–8pm, Sat 9am–2pm ET. Claims line open 24 hours.",
  licence: "Licensed in 31 states. NAIC no. 00000 (sample).",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/cover", label: "Cover" },
  { to: "/claims", label: "Claims" },
  { to: "/help", label: "Help centre" },
  { to: "/about", label: "About" },
];

/* ───────────────────────── Cover (products) ───────────────────────── */

export type Audience = "rent" | "own" | "let" | "add-on";

export const audiences: { id: Audience; label: string }[] = [
  { id: "rent", label: "I rent" },
  { id: "own", label: "I own" },
  { id: "let", label: "I let it out" },
  { id: "add-on", label: "Add-ons" },
];

/** One line of a policy schedule: the US form letters (A–F) carry real meaning, so they stay. */
export type ScheduleLine = {
  code: string;
  title: string;
  limit: string;
  plain: string;
};

export type Cover = {
  slug: string;
  name: string;
  audience: Audience;
  /** Lowest sample monthly premium, USD. */
  from: number;
  image: string;
  alt: string;
  summary: string;
  intro: string;
  who: string[];
  schedule: ScheduleLine[];
  notCovered: string[];
  story: { title: string; body: string; paid: number; days: number };
  addOns: string[];
  faq: { q: string; a: string }[];
  /** Quotable on its own (add-ons are chosen inside another quote). */
  quotable: boolean;
};

export const covers: Cover[] = [
  {
    slug: "renters",
    name: "Renters",
    audience: "rent",
    from: 11,
    image: renters,
    alt: "A small rented living room with a red armchair, a grey sofa and a window onto the street",
    summary:
      "Your things, your liability and a place to stay if the apartment becomes unliveable.",
    intro:
      "Your landlord's policy covers the building. It does not cover your laptop, your sofa or the bill if your bath overflows into the flat below. Renters cover does, from about the price of two coffees a month.",
    who: [
      "Anyone renting an apartment, a house or a room on a lease",
      "Roommates — each person can hold their own policy for their own things",
      "People whose lease requires proof of liability cover",
    ],
    schedule: [
      {
        code: "C",
        title: "Personal property",
        limit: "$15,000 – $100,000",
        plain:
          "Everything you own in the home, paid at what it costs to buy new today.",
      },
      {
        code: "D",
        title: "Loss of use",
        limit: "30% of property limit",
        plain: "Hotel, meals and laundry while your place is being repaired.",
      },
      {
        code: "E",
        title: "Personal liability",
        limit: "$100,000 – $500,000",
        plain:
          "If you accidentally damage someone else's property or someone is hurt in your home.",
      },
      {
        code: "F",
        title: "Medical payments to others",
        limit: "$2,000",
        plain:
          "Small medical bills for a guest who is hurt, whoever was at fault.",
      },
    ],
    notCovered: [
      "The building itself — that sits with your landlord",
      "Flooding from outside, unless you add Flood & water backup",
      "Your roommate's belongings, unless they are named on the policy",
      "Wear and tear, pests and slow leaks left unreported",
    ],
    story: {
      title: "A burst pipe two floors up",
      body: "Ines came home to a soaked ceiling and a ruined sofa, rug and record player. We paid for a hotel the same night and replaced her things at new prices.",
      paid: 6840,
      days: 6,
    },
    addOns: ["valuables", "water"],
    faq: [
      {
        q: "My landlord has insurance. Do I still need this?",
        a: "Their policy repairs the building and pays them. It does not pay for anything you own, or for your hotel while the flat is repaired, or for damage you cause to someone else.",
      },
      {
        q: "Can I cover only part of my belongings?",
        a: "You choose the limit. Our contents counter helps you land on a realistic figure; most people underestimate by half.",
      },
      {
        q: "Does it cover my bike when I'm out?",
        a: "Yes. Personal property is covered anywhere in the world up to 10% of your limit, and bikes up to $1,500 each.",
      },
    ],
    quotable: true,
  },
  {
    slug: "homeowners",
    name: "Homeowners",
    audience: "own",
    from: 74,
    image: homeowners,
    alt: "A white clapboard house with a deep front porch, surrounded by autumn trees",
    summary:
      "The house, the garage, everything inside it and you, all on one schedule.",
    intro:
      "We rebuild your house at today's construction cost, not what you paid for it. The garage and fence are on the same policy, your belongings are paid at new prices, and your liability follows you off the property.",
    who: [
      "Owners who live in a detached or semi-detached house",
      "Households with a mortgage — we send proof of cover to your lender",
      "Owners of older homes; we inspect before we price, not after a claim",
    ],
    schedule: [
      {
        code: "A",
        title: "Dwelling",
        limit: "Rebuild cost, from $180,000",
        plain:
          "Rebuilding the house itself, including built-in fixtures and finishes.",
      },
      {
        code: "B",
        title: "Other structures",
        limit: "10% of dwelling",
        plain: "Garage, shed, fences and the driveway.",
      },
      {
        code: "C",
        title: "Personal property",
        limit: "50% of dwelling",
        plain: "Everything inside, replaced new.",
      },
      {
        code: "D",
        title: "Loss of use",
        limit: "20% of dwelling",
        plain: "Somewhere to live while the house is put right.",
      },
      {
        code: "E",
        title: "Personal liability",
        limit: "$300,000 – $1,000,000",
        plain: "Injuries and damage to others, at home or away.",
      },
      {
        code: "F",
        title: "Medical payments to others",
        limit: "$5,000",
        plain: "Minor injuries to visitors, no lawsuit required.",
      },
    ],
    notCovered: [
      "Earthquake and flood from outside, available as separate cover",
      "Gradual damage: rot, damp, subsidence that developed over years",
      "Business equipment over $2,500 used for a home business",
      "Vacancy over 60 days without telling us",
    ],
    story: {
      title: "Hail through the roof in April",
      body: "The Okafors lost forty shingles and a skylight. An adjuster was there in two days and the roofer was paid directly, less their $1,000 deductible.",
      paid: 14210,
      days: 12,
    },
    addOns: ["valuables", "water"],
    faq: [
      {
        q: "How do you work out the rebuild cost?",
        a: "From the floor area, build type and finishes, priced at current local labour and material costs. It is usually not the same as the sale price.",
      },
      {
        q: "What happens if building costs rise?",
        a: "Every Homeowners policy includes 25% extended replacement cost, so a sudden jump in prices after a disaster does not leave you short.",
      },
      {
        q: "Do you pay my mortgage lender?",
        a: "For large dwelling claims the cheque is made out to you and your lender together. That is standard and we handle the paperwork.",
      },
    ],
    quotable: true,
  },
  {
    slug: "condo",
    name: "Condo & co-op",
    audience: "own",
    from: 29,
    image: condo,
    alt: "A brick apartment building with stacked balconies under a clear sky",
    summary:
      "Walls-in cover for the unit you own, sized to your association's master policy.",
    intro:
      "Your HOA insures the building's shell. Everything from the drywall in is usually yours: the kitchen you renovated, the floors, the fixtures and the things you own. We read your association's master policy with you and fill the gap exactly.",
    who: [
      "Owners of a condominium or co-operative unit",
      "Owners who rent their unit out part of the year (tell us — it changes the liability)",
      "Anyone facing a loss assessment from their association",
    ],
    schedule: [
      {
        code: "A",
        title: "Unit improvements",
        limit: "$25,000 – $250,000",
        plain:
          "Interior walls, floors, cabinets and fixtures that the master policy leaves to you.",
      },
      {
        code: "C",
        title: "Personal property",
        limit: "$20,000 – $150,000",
        plain: "Your belongings, replaced new.",
      },
      {
        code: "D",
        title: "Loss of use",
        limit: "40% of property limit",
        plain: "Living costs if the unit cannot be lived in.",
      },
      {
        code: "E",
        title: "Personal liability",
        limit: "$300,000 – $500,000",
        plain: "Damage you cause to neighbours' units and injuries to others.",
      },
      {
        code: "—",
        title: "Loss assessment",
        limit: "$10,000",
        plain:
          "Your share when the association bills owners after a covered loss.",
      },
    ],
    notCovered: [
      "Anything the master policy already covers",
      "Common areas, unless you are assessed for them",
      "Short-term rental guests without the host endorsement",
    ],
    story: {
      title: "The dishwasher that leaked downstairs",
      body: "A failed hose damaged two units below Teo's. We repaired his floor, paid both neighbours and dealt with the association directly.",
      paid: 9325,
      days: 9,
    },
    addOns: ["valuables", "water"],
    faq: [
      {
        q: "What is 'walls-in' cover?",
        a: "Cover for the parts of your unit the association's policy doesn't reach. Ask your HOA for the master policy; we'll tell you where its line is drawn.",
      },
      {
        q: "What is a loss assessment?",
        a: "If the building suffers a loss the master policy doesn't fully pay, the association can bill each owner. We pay your share up to the limit.",
      },
    ],
    quotable: true,
  },
  {
    slug: "landlord",
    name: "Landlord",
    audience: "let",
    from: 58,
    image: landlord,
    alt: "A row of new two-storey houses with grey roofs and small front lawns",
    summary:
      "For homes you let out: the building, lost rent and your liability as owner.",
    intro:
      "When your tenant's home is damaged, you lose the building and the rent at the same time. Landlord cover rebuilds the property, pays the rent you would have collected while it is repaired, and protects you if a tenant or visitor is hurt.",
    who: [
      "Owners of one to four rental homes or units",
      "Accidental landlords letting a former home",
      "Long-term lets of six months or more (short-term lets need Seasonal)",
    ],
    schedule: [
      {
        code: "A",
        title: "Dwelling",
        limit: "Rebuild cost, from $150,000",
        plain: "The rental property itself.",
      },
      {
        code: "B",
        title: "Other structures",
        limit: "10% of dwelling",
        plain: "Garages, sheds and fences on the rental.",
      },
      {
        code: "C",
        title: "Landlord's contents",
        limit: "$5,000 – $25,000",
        plain: "Appliances, furniture and carpets you supply.",
      },
      {
        code: "D",
        title: "Fair rental value",
        limit: "Up to 12 months",
        plain: "The rent you lose while the home is uninhabitable.",
      },
      {
        code: "E",
        title: "Premises liability",
        limit: "$300,000 – $1,000,000",
        plain: "Injuries on the property you are found responsible for.",
      },
    ],
    notCovered: [
      "Your tenant's belongings — they need their own Renters policy",
      "Unpaid rent from a tenant who simply stops paying",
      "Damage caused deliberately by tenants, unless you add Tenant damage",
    ],
    story: {
      title: "A kitchen fire between tenants",
      body: "A grease fire closed Marguerite's duplex for eleven weeks. We rebuilt the kitchen and paid her the full rent for every week it stood empty.",
      paid: 31480,
      days: 18,
    },
    addOns: ["water"],
    faq: [
      {
        q: "Do my tenants need insurance too?",
        a: "Yes, for their own things and liability. Many landlords make it a lease condition; we offer tenants of our landlords 10% off Renters.",
      },
      {
        q: "Is a property between tenants covered?",
        a: "Yes, for up to 90 days of vacancy. Longer gaps are fine if you tell us in your account.",
      },
    ],
    quotable: true,
  },
  {
    slug: "seasonal",
    name: "Seasonal home",
    audience: "own",
    from: 46,
    image: seasonal,
    alt: "A timber cabin among pine trees at dusk with warm light in the windows",
    summary:
      "Cabins, lake houses and second homes that sit empty for weeks at a time.",
    intro:
      "A house nobody is in for a month is a different risk: a frozen pipe can run for days. Seasonal cover is priced for that, with freeze protection credits and cover for short-term guests if you rent it out on the side.",
    who: [
      "Owners of a second home used part of the year",
      "Cabins and lake houses with winterisation routines",
      "Owners who rent to guests for up to 90 nights a year",
    ],
    schedule: [
      {
        code: "A",
        title: "Dwelling",
        limit: "Rebuild cost, from $120,000",
        plain: "The second home itself.",
      },
      {
        code: "B",
        title: "Other structures",
        limit: "10% of dwelling",
        plain: "Boathouse, dock, sheds and fencing.",
      },
      {
        code: "C",
        title: "Personal property",
        limit: "$10,000 – $75,000",
        plain: "Furniture and belongings kept at the property.",
      },
      {
        code: "E",
        title: "Personal liability",
        limit: "$300,000 – $500,000",
        plain: "Including paying guests, with the host endorsement.",
      },
    ],
    notCovered: [
      "Freeze damage if heat was switched off with water left in the pipes",
      "Theft while unoccupied over 60 days without a monitored alarm",
      "Guest stays above 90 nights a year",
    ],
    story: {
      title: "A frozen line in February",
      body: "A neighbour spotted water under Ruth's cabin door. The water sensor credit she had claimed meant we already knew which valve to send the plumber to.",
      paid: 7920,
      days: 8,
    },
    addOns: ["water"],
    faq: [
      {
        q: "Do I need a water sensor?",
        a: "No, but a connected leak sensor and automatic shut-off lowers your premium by up to 12% and catches most losses early.",
      },
    ],
    quotable: true,
  },
  {
    slug: "student",
    name: "Student renters",
    audience: "rent",
    from: 7,
    image: student,
    alt: "A small pale blue sofa with cushions against a white wall in a student room",
    summary: "Laptop, bike and dorm-room liability, billed by the semester.",
    intro:
      "Most students carry their most valuable things in a backpack. Student renters cover follows them across campus, pays for a stolen laptop at new price and can be bought by a parent for a student who lives away.",
    who: [
      "Full-time students in dorms, shared houses or first apartments",
      "Parents buying cover for a student living away from home",
      "Students under 26 enrolled at an accredited school",
    ],
    schedule: [
      {
        code: "C",
        title: "Personal property",
        limit: "$5,000 – $20,000",
        plain:
          "Laptop, phone, bike, books and furniture, anywhere on or off campus.",
      },
      {
        code: "D",
        title: "Loss of use",
        limit: "$2,000",
        plain: "Temporary housing if the room is unliveable.",
      },
      {
        code: "E",
        title: "Personal liability",
        limit: "$100,000",
        plain: "Accidental damage to the dorm or someone else's things.",
      },
    ],
    notCovered: [
      "Phones dropped and cracked with no other cause (accidental damage is an add-on)",
      "Items left unattended in a public place",
      "Shared items owned by a roommate",
    ],
    story: {
      title: "A laptop lifted from the library",
      body: "Sam's laptop vanished during a twenty-minute break. With a campus police report filed, a new one was paid for within the week, less a $250 deductible.",
      paid: 1149,
      days: 4,
    },
    addOns: ["valuables"],
    faq: [
      {
        q: "Can I pay by semester?",
        a: "Yes. Student renters bills in two semester instalments or monthly — your choice at checkout.",
      },
      {
        q: "Am I covered on my parents' policy?",
        a: "Sometimes, at a reduced limit. Our help article walks through how to check before buying.",
      },
    ],
    quotable: true,
  },
  {
    slug: "valuables",
    name: "Valuables",
    audience: "add-on",
    from: 4,
    image: valuables,
    alt: "A pearl necklace laid in an open red jewellery box",
    summary:
      "Jewellery, watches, instruments and art listed by name, at their appraised value.",
    intro:
      "Standard policies cap jewellery theft at $1,500 in total. Valuables lists each piece separately at its appraised value, covers loss as well as theft — the ring down the drain counts — and has no deductible.",
    who: [
      "Engagement rings, watches and heirloom jewellery",
      "Instruments, cameras and collections",
      "Fine art and antiques with a recent appraisal",
    ],
    schedule: [
      {
        code: "—",
        title: "Scheduled item",
        limit: "Appraised value, each",
        plain: "Each piece named on the schedule with its value.",
      },
      {
        code: "—",
        title: "Mysterious disappearance",
        limit: "Included",
        plain: "Lost without knowing how? Still covered.",
      },
      {
        code: "—",
        title: "Deductible",
        limit: "$0",
        plain: "Nothing to pay towards a valuables claim.",
      },
    ],
    notCovered: [
      "Pieces without a receipt or appraisal less than five years old",
      "Gradual wear, such as worn prongs on a ring",
    ],
    story: {
      title: "An earring lost on a beach",
      body: "One of a pair of appraised diamond studs disappeared on holiday. We paid for a matched replacement through her own jeweller.",
      paid: 2650,
      days: 5,
    },
    addOns: [],
    faq: [
      {
        q: "How much does it cost?",
        a: "About $1–$2 a month for every $1,000 of appraised value, depending on the item type and your state.",
      },
    ],
    quotable: false,
  },
  {
    slug: "water",
    name: "Flood & water backup",
    audience: "add-on",
    from: 9,
    image: water,
    alt: "Raindrops running down a dark window pane",
    summary: "Sewer backup, sump pump failure and rising water from outside.",
    intro:
      "Most home policies cover a burst pipe but exclude water that comes up through the drains or in from the street. This add-on closes that gap, which in practice is where most uncovered water claims happen.",
    who: [
      "Homes with a basement or sump pump",
      "Ground-floor apartments and garden-level units",
      "Any home within a mile of a river, lake or coast",
    ],
    schedule: [
      {
        code: "—",
        title: "Water backup",
        limit: "$5,000 – $25,000",
        plain: "Sewer or drain backup and sump pump overflow.",
      },
      {
        code: "—",
        title: "Surface flood",
        limit: "$25,000 – $250,000",
        plain: "Rising water from outside, where your state permits.",
      },
      {
        code: "—",
        title: "Waiting period",
        limit: "14 days",
        plain: "Flood cover starts two weeks after purchase.",
      },
    ],
    notCovered: [
      "Flood losses inside the 14-day waiting period",
      "Outdoor property: landscaping, decks, pools",
    ],
    story: {
      title: "A storm drain that ran backwards",
      body: "Heavy rain pushed sewage into the Lindqvists' finished basement. Without this add-on the claim would have been refused outright.",
      paid: 18700,
      days: 15,
    },
    addOns: [],
    faq: [
      {
        q: "Is this the same as the federal flood programme?",
        a: "No. It is private cover with higher limits on belongings and no separate application. Your mortgage lender may still ask for a specific flood policy.",
      },
    ],
    quotable: false,
  },
];

export const coverBySlug = (slug: string) =>
  covers.find((c) => c.slug === slug);

/* ───────────────────────── Quote rates (illustrative) ───────────────────────── */

export type QuoteKind =
  "renters" | "homeowners" | "condo" | "landlord" | "seasonal" | "student";

/** Monthly base, $ per $1,000 of contents, and rebuild cost per sq ft (0 when the home itself isn't insured). */
export const rates: Record<
  QuoteKind,
  {
    base: number;
    perThousand: number;
    perSqFt: number;
    defaultContents: number;
  }
> = {
  renters: { base: 6, perThousand: 0.24, perSqFt: 0, defaultContents: 25000 },
  homeowners: {
    base: 24,
    perThousand: 0.31,
    perSqFt: 185,
    defaultContents: 60000,
  },
  condo: { base: 12, perThousand: 0.28, perSqFt: 60, defaultContents: 40000 },
  landlord: {
    base: 20,
    perThousand: 0.22,
    perSqFt: 165,
    defaultContents: 10000,
  },
  seasonal: {
    base: 14,
    perThousand: 0.35,
    perSqFt: 170,
    defaultContents: 20000,
  },
  student: { base: 4, perThousand: 0.3, perSqFt: 0, defaultContents: 8000 },
};

/** Monthly premium per $1,000 of rebuild cost. */
export const dwellingRate = 0.17;

export const liabilityOptions = [
  { value: 100000, monthly: 0 },
  { value: 300000, monthly: 3 },
  { value: 500000, monthly: 6 },
];

export const deductibleOptions = [
  { value: 500, factor: 1.12 },
  { value: 1000, factor: 1 },
  { value: 2500, factor: 0.86 },
];

export const quoteAddOns = [
  {
    id: "water",
    label: "Flood & water backup",
    monthly: 9,
    note: "Sewer backup, sump overflow, rising water",
  },
  {
    id: "valuables",
    label: "Valuables",
    monthly: 5,
    note: "Up to $5,000 of named jewellery or instruments, no deductible",
  },
  {
    id: "identity",
    label: "Identity restoration",
    monthly: 2,
    note: "A case manager and up to $25,000 of costs",
  },
];

export const annualDiscount = 0.08;

/* ───────────────────────── Contents counter ───────────────────────── */

export type Room = {
  id: string;
  name: string;
  items: { id: string; label: string; each: number; typical: number }[];
};

/** Typical new-replacement prices, USD. Used by the contents counter. */
export const rooms: Room[] = [
  {
    id: "living",
    name: "Living room",
    items: [
      { id: "sofa", label: "Sofa", each: 1400, typical: 1 },
      { id: "tv", label: "TV & speakers", each: 1100, typical: 1 },
      { id: "books", label: "Shelf of books & records", each: 450, typical: 2 },
      { id: "rug", label: "Rug", each: 380, typical: 1 },
      { id: "plants", label: "Lamps, plants & art", each: 260, typical: 3 },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    items: [
      { id: "bed", label: "Bed & mattress", each: 1600, typical: 1 },
      { id: "clothes", label: "Rail of clothes", each: 1800, typical: 2 },
      { id: "shoes", label: "Pairs of shoes", each: 110, typical: 8 },
      { id: "drawers", label: "Chest of drawers", each: 520, typical: 1 },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    items: [
      { id: "cookware", label: "Pots, pans & knives", each: 650, typical: 1 },
      { id: "small", label: "Small appliances", each: 180, typical: 4 },
      { id: "table", label: "Table & chairs", each: 900, typical: 1 },
      { id: "pantry", label: "Dishes & glassware", each: 420, typical: 1 },
    ],
  },
  {
    id: "work",
    name: "Desk & tech",
    items: [
      { id: "laptop", label: "Laptops & tablets", each: 1300, typical: 1 },
      { id: "phone", label: "Phones", each: 900, typical: 1 },
      { id: "camera", label: "Cameras & consoles", each: 550, typical: 1 },
      { id: "bike", label: "Bikes", each: 900, typical: 1 },
    ],
  },
];

export const contentsCopy = {
  title: "What would it cost to buy everything again?",
  text: "Count the room you are sitting in. Most renters guess $5,000; counted item by item, a one-bedroom usually comes to three times that at new prices.",
  note: "Replacement prices are typical new prices in our claims data (sample figures).",
};

/* ───────────────────────── Home ───────────────────────── */

export const home = {
  hero: {
    title: "Cover for the home you actually live in.",
    text: "Renters, homeowners and landlord insurance written in plain English, priced in four minutes and paid out by people who pick up the phone.",
    image: hero,
    alt: "A bright rented apartment with a grey sofa, shelves of books and hanging plants",
    sample: {
      label: "Sample schedule · Renters",
      lines: [
        { code: "C", title: "Personal property", value: "$30,000" },
        { code: "D", title: "Loss of use", value: "$9,000" },
        { code: "E", title: "Personal liability", value: "$300,000" },
        { code: "", title: "Deductible", value: "$500" },
      ],
      premium: 17,
    },
  },
  finePrint: {
    title: "Read the fine print with us",
    text: "Every clause in a Vault policy has a plain-English line beside it, in the policy itself, not in a brochure. Here is the one people ask about most.",
    clauses: [
      {
        ref: "Section I, Peril 7",
        legal:
          "Sudden and accidental discharge or overflow of water or steam from within a plumbing, heating, air conditioning or automatic fire protective sprinkler system, or from within a household appliance.",
        plain:
          "A pipe bursts, the washing machine hose splits or the water heater gives way: covered.",
      },
      {
        ref: "Section I, Exclusion 3",
        legal:
          "We do not insure for loss caused by constant or repeated seepage or leakage of water over a period of 14 or more days.",
        plain:
          "A drip under the sink that you could have noticed over weeks: not covered. Tell us about leaks early.",
      },
      {
        ref: "Section I, Exclusion 4",
        legal:
          "Water or water-borne material which backs up through sewers or drains, or which overflows or is discharged from a sump.",
        plain:
          "Water coming up from the drains is excluded — unless you add Flood & water backup for about $9 a month.",
      },
    ],
  },
  claimSteps: [
    {
      title: "Tell us the same day",
      text: "Call, or start a claim in your account. A named handler calls you back within two hours.",
    },
    {
      title: "Keep it safe",
      text: "Stop the water, board the window, photograph everything. We pay for emergency repairs up front.",
    },
    {
      title: "We come to you",
      text: "An adjuster visits within three working days, or reviews a video walk-through the same week.",
    },
    {
      title: "Paid in days",
      text: "Most claims under $10,000 are paid within seven days of the visit, straight to your account.",
    },
  ],
  pledge:
    "Last year we paid 94% of home claims in full, and the median contents claim in nine days. When we say no, we say why in writing and tell you how to appeal.",
  close: {
    title: "Four minutes to a real price.",
    text: "No phone call, no email until you ask for one. Change anything later from your account.",
  },
};

export const stories = [
  {
    name: "Ines R.",
    place: "Columbus, OH",
    cover: "Renters",
    quote:
      "I filed from the hotel lobby at midnight. By breakfast someone called me by name and had already booked the room for another week.",
  },
  {
    name: "Daniel & Ama O.",
    place: "Lexington, KY",
    cover: "Homeowners",
    quote:
      "The adjuster explained the deductible before I had to ask, and the roofer had his money before he'd packed up the ladder.",
  },
  {
    name: "Marguerite L.",
    place: "Pittsburgh, PA",
    cover: "Landlord",
    quote:
      "Eleven weeks of rent, paid every Friday like the tenant was still there. That's what kept the mortgage paid.",
  },
];

/** Where $100 of premium went last year (sample figures). */
export const premiumSplit = [
  { label: "Claims paid to members", value: 71 },
  { label: "Claims handling & adjusters", value: 9 },
  { label: "Reinsurance for catastrophes", value: 8 },
  { label: "Running Vault", value: 7 },
  { label: "Returned to members as dividend", value: 5 },
];

/* ───────────────────────── Claims ───────────────────────── */

export type Incident = {
  id: string;
  label: string;
  now: string[];
  soon: string[];
  photograph: string[];
  typical: string;
  covered: string;
};

export const incidents: Incident[] = [
  {
    id: "water",
    label: "Water leak",
    now: [
      "Turn off the main water valve — usually where the supply enters the house, or under the kitchen sink in apartments.",
      "Switch off electricity to wet rooms at the breaker if it is safe to reach.",
      "Move belongings out of the water and lift furniture onto blocks or foil.",
    ],
    soon: [
      "Call a plumber to stop the leak. Keep the invoice; we reimburse emergency repairs.",
      "Tell your landlord or building manager if you rent or live in a condo.",
      "Run fans and open windows. Mould starts within 48 hours.",
    ],
    photograph: [
      "The source of the leak",
      "Ceilings, walls and floors that got wet",
      "Each damaged item before you throw it away",
    ],
    typical:
      "Handler call within 2 hours · adjuster within 3 days · paid in 7–12 days",
    covered:
      "Sudden leaks and bursts are covered. Slow leaks over 14 days and water backing up from drains are not, unless you have Flood & water backup.",
  },
  {
    id: "theft",
    label: "Theft or break-in",
    now: [
      "Leave the property if you think someone may still be inside, and call 911.",
      "Don't tidy up — the police may want to see the scene as it is.",
    ],
    soon: [
      "Get a police report number. We need it for every theft claim.",
      "Make the home secure: we pay for a locksmith or emergency glazing.",
      "Cancel stolen cards and lock stolen phones and laptops remotely.",
    ],
    photograph: [
      "Forced doors, windows and locks",
      "Empty spaces where things were",
      "Receipts, boxes or photos of stolen items",
    ],
    typical:
      "Handler call within 2 hours · no visit needed under $5,000 · paid in 5–9 days",
    covered:
      "Theft from your home and from anywhere in the world is covered. Items left unattended in public places, and jewellery over $1,500 without Valuables, are limited.",
  },
  {
    id: "fire",
    label: "Fire or smoke",
    now: [
      "Get everyone out and call 911. Don't go back in for belongings.",
      "Once the fire service has left, don't re-enter until they say it is safe.",
    ],
    soon: [
      "Call our claims line: we can book a hotel for you the same night.",
      "Ask the fire department for an incident report.",
      "Don't start cleaning smoke damage yourself; specialist cleaning is covered.",
    ],
    photograph: [
      "Every room, damaged or not",
      "Smoke staining on walls and ceilings",
      "Damaged items in place",
    ],
    typical:
      "Emergency housing same day · adjuster within 48 hours · advance payment on request",
    covered:
      "Fire, smoke and the water used to put a fire out are all covered, along with your living costs while you are out of the home.",
  },
  {
    id: "storm",
    label: "Storm or hail",
    now: [
      "Stay inside and away from windows until the storm has passed.",
      "Keep clear of fallen power lines and report them to your utility.",
    ],
    soon: [
      "Cover holes in the roof or windows with tarps or boards if it is safe to.",
      "Beware of door-to-door contractors after storms. You choose your contractor, not them.",
      "Keep receipts for tarps, boards and tree removal.",
    ],
    photograph: [
      "The roof from the ground, every side",
      "Fallen trees and what they hit",
      "Hail stones next to a coin for scale",
    ],
    typical:
      "Adjuster within 5 days after major storms · roofer paid directly · 10–20 days",
    covered:
      "Wind, hail, lightning and falling trees that hit the house or garage are covered. Trees that fall without hitting anything are covered for removal up to $1,000.",
  },
  {
    id: "injury",
    label: "Someone was hurt",
    now: [
      "Make sure they get medical help. Call 911 for anything serious.",
      "Don't admit fault or offer to pay — just be kind and practical.",
    ],
    soon: [
      "Write down what happened, when, and who saw it, while you remember.",
      "Pass any letters from them, their insurer or a lawyer to us unopened if you prefer.",
    ],
    photograph: ["Where it happened", "The step, rug or hazard involved"],
    typical:
      "Handler call within 4 hours · we deal with the other party · timeline varies",
    covered:
      "Medical payments to others pays small bills whoever was at fault. Personal liability defends you and pays if you are found responsible.",
  },
  {
    id: "lost",
    label: "Lost or broken valuables",
    now: [
      "Retrace your steps and report the loss to the venue, transport company or police.",
    ],
    soon: [
      "Find the appraisal, receipt or a photo of the item being worn.",
      "If it broke, keep every piece — jewellers can often tell how it happened.",
    ],
    photograph: ["Any broken pieces", "The empty setting or box"],
    typical:
      "No visit needed · replacement through your own jeweller · 5–10 days",
    covered:
      "Items listed on Valuables are covered for loss with no deductible. Unlisted jewellery is covered for theft only, up to $1,500 in total.",
  },
];

export const claimsPage = {
  title: "Making a claim",
  text: "Something has gone wrong at home. Here's what to do in the next hour, the next two days, and what happens after that. You can call us at any point — the line never closes.",
  image: street,
  imageAlt: "A brick house with a blue roof beside a rain-wet road at dawn",
  promise: [
    {
      title: "A named handler",
      text: "One person owns your claim from first call to payment. You get their direct line.",
    },
    {
      title: "Emergency money up front",
      text: "Hotels, plumbers and board-up services are paid while the claim is still open.",
    },
    {
      title: "Reasons in writing",
      text: "If any part of a claim is declined, you get the exact policy wording and how to appeal.",
    },
    {
      title: "Your contractor, your choice",
      text: "Use our approved repairers for a lifetime workmanship guarantee, or your own.",
    },
  ],
  process: [
    {
      title: "Report",
      text: "By phone or in your account. You'll need your policy number and a rough account of what happened.",
      time: "Day 0",
    },
    {
      title: "Handler call",
      text: "Your named handler confirms what's covered, arranges emergency help and explains your deductible.",
      time: "Within 2 hours",
    },
    {
      title: "Assessment",
      text: "An adjuster visits, or you send a guided video walk-through from your phone.",
      time: "Days 1–3",
    },
    {
      title: "Offer",
      text: "A written settlement showing every item and line of the policy it is paid under.",
      time: "Days 3–7",
    },
    {
      title: "Payment",
      text: "Paid by bank transfer the day you accept. Repairs can be paid straight to the contractor.",
      time: "Same day",
    },
  ],
};

/* ───────────────────────── Help centre ───────────────────────── */

export const helpCategories = [
  { id: "policy", label: "Your policy" },
  { id: "billing", label: "Billing & payments" },
  { id: "claims", label: "Claims" },
  { id: "changes", label: "Moving & changes" },
] as const;

export type HelpCategory = (typeof helpCategories)[number]["id"];

export type Article = {
  slug: string;
  category: HelpCategory;
  title: string;
  summary: string;
  updated: string;
  body: { heading?: string; text: string; list?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "replacement-cost-vs-actual-cash-value",
    category: "policy",
    title: "Replacement cost vs. actual cash value",
    summary:
      "Why a five-year-old sofa is paid at the price of a new one with Vault.",
    updated: "2026-09-02",
    body: [
      {
        text: "Insurers pay for belongings in one of two ways. Actual cash value pays what the item was worth on the day it was lost — new price minus depreciation. Replacement cost pays what it costs to buy the same thing new today.",
      },
      {
        heading: "What Vault does",
        text: "Every Vault Renters, Homeowners and Condo policy pays replacement cost for personal property. There is no depreciation deduction and no holdback until you buy the replacement.",
      },
      {
        heading: "An example",
        text: "A five-year-old sofa that cost $1,200 might have an actual cash value of $500. On a Vault policy we pay what a comparable sofa costs now — say $1,400 — less your deductible.",
        list: [
          "Actual cash value: $500 − $500 deductible = $0",
          "Replacement cost: $1,400 − $500 deductible = $900",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-deductible",
    category: "policy",
    title: "Choosing a deductible",
    summary: "How the amount you pay towards a claim changes your premium.",
    updated: "2026-08-14",
    body: [
      {
        text: "Your deductible is the part of each claim you pay yourself. A higher deductible lowers your premium because you take on the small losses.",
      },
      {
        heading: "A rule of thumb",
        text: "Pick the largest amount you could pay tomorrow without borrowing. For most renters that is $500; for most homeowners $1,000.",
        list: [
          "$500 — premium about 12% higher than $1,000",
          "$1,000 — our standard",
          "$2,500 — premium about 14% lower than $1,000",
        ],
      },
      {
        heading: "When you pay nothing",
        text: "Valuables claims and liability claims have no deductible.",
      },
    ],
  },
  {
    slug: "paying-monthly-or-annually",
    category: "billing",
    title: "Paying monthly or annually",
    summary: "Annual payment saves 8%, and you can switch at renewal.",
    updated: "2026-07-30",
    body: [
      {
        text: "You can pay your premium in twelve monthly instalments by card or bank transfer, or once a year. Paying annually costs 8% less because it saves us collection costs.",
      },
      {
        heading: "Switching",
        text: "Change how you pay at any renewal from Billing in your account. Mid-term switches are possible too; we refund or bill the difference to the day.",
      },
    ],
  },
  {
    slug: "missed-payment",
    category: "billing",
    title: "If you miss a payment",
    summary: "You have a 15-day grace period before anything changes.",
    updated: "2026-06-11",
    body: [
      {
        text: "If a monthly payment fails we email you and retry three days later. Your cover stays in force throughout a 15-day grace period.",
      },
      {
        heading: "If you're struggling",
        text: "Call the policy desk before the grace period ends. We can move your payment date, spread an amount over two months or lower your cover temporarily.",
      },
    ],
  },
  {
    slug: "what-to-expect-from-an-adjuster",
    category: "claims",
    title: "What to expect from an adjuster visit",
    summary: "Who comes, how long it takes and what to have ready.",
    updated: "2026-09-18",
    body: [
      {
        text: "An adjuster is a Vault employee or appointed specialist who inspects the damage and works out what the policy pays. Most visits take under an hour.",
      },
      {
        heading: "Have ready",
        text: "It speeds things up if you can show:",
        list: [
          "Photos taken before you cleaned up",
          "Invoices for emergency repairs",
          "Receipts, bank statements or photos for damaged items",
          "The damaged items themselves, if you still have them",
        ],
      },
      {
        heading: "Video assessments",
        text: "For contents claims under $10,000 you can choose a guided video call instead. You walk the adjuster through the home on your phone.",
      },
    ],
  },
  {
    slug: "claim-declined-appeal",
    category: "claims",
    title: "If a claim is declined",
    summary: "How to ask for a second review and what happens next.",
    updated: "2026-05-02",
    body: [
      {
        text: "Every refusal comes in writing with the policy wording it relies on. If you disagree, reply to that letter or call your handler and ask for a second review.",
      },
      {
        heading: "Second review",
        text: "A senior claims manager who was not involved in the original decision looks again within 10 working days.",
      },
      {
        heading: "Beyond Vault",
        text: "If you are still unhappy you can complain to your state's insurance department. We include their details in every final letter.",
      },
    ],
  },
  {
    slug: "moving-house",
    category: "changes",
    title: "Moving house",
    summary:
      "Your cover moves with you, and covers both homes during the move.",
    updated: "2026-09-25",
    body: [
      {
        text: "Tell us your new address and moving date in your account. Your belongings are covered at both addresses for 30 days, and in the moving truck.",
      },
      {
        heading: "Price changes",
        text: "Your premium may go up or down depending on the new area. We show the new price before you confirm, and refund or bill the difference to the day.",
      },
      {
        heading: "Renters becoming owners",
        text: "We can switch a Renters policy to Homeowners without a gap, keeping your claims-free years.",
      },
    ],
  },
  {
    slug: "adding-a-roommate",
    category: "changes",
    title: "Adding a roommate or partner",
    summary: "When to add someone, and when they need their own policy.",
    updated: "2026-04-19",
    body: [
      {
        text: "Anyone you are married to or in a registered partnership with is covered automatically. Other people you live with are not.",
      },
      {
        heading: "Two choices",
        text: "You can name a roommate on your policy, sharing the limit and the claims record, or they can hold their own Renters policy.",
        list: [
          "Named roommate: one bill, shared limit, shared claims history",
          "Separate policy: separate limits and records — usually better",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const helpPage = {
  title: "How can we help?",
  text: "Answers to the questions members ask most. Can't find it? The policy desk is a real person, usually within two minutes.",
  faq: [
    {
      q: "How quickly does cover start?",
      a: "From midnight on the start date you choose, as soon as the first payment goes through. Flood cover has a 14-day waiting period.",
    },
    {
      q: "Can I cancel at any time?",
      a: "Yes. Cancel from your account or by phone; we refund unused premium to the day with no fee.",
    },
    {
      q: "Will one claim make my price go up?",
      a: "A single claim under $5,000 does not change your renewal price. Larger or repeated claims may.",
    },
    {
      q: "Do you check my credit?",
      a: "Where state law allows, we use an insurance score at quote time. It is a soft check and doesn't affect your credit file.",
    },
    {
      q: "Is Vault a real insurer?",
      a: "No — Vault is a fictional brand in a website template. Nothing here is an offer of insurance.",
    },
  ],
};

/* ───────────────────────── About ───────────────────────── */

export const about = {
  title: "Owned by the people it insures.",
  text: "Vault is a mutual. There are no shareholders: the policyholders own the company, and what is left after claims and costs comes back to them.",
  image: kitchen,
  imageAlt:
    "A couple cooking together in a bright home kitchen with red pots on the hob",
  secondImage: porch,
  secondAlt:
    "A grey clapboard house with a white wraparound porch on a green lawn",
  story: [
    "Vault began in 2009 when forty tenants in a single Ashby apartment block couldn't find anyone willing to insure their belongings for less than $40 a month. They pooled their premiums, hired a retired adjuster, and wrote a twelve-page policy anyone could read in one sitting.",
    "That policy is still the spine of every one we write. We now insure 410,000 homes across 31 states, but we have kept the parts that mattered to the first forty: one named person per claim, prices that don't punish a single bad year, and wording you can read at the kitchen table.",
  ],
  milestones: [
    { year: "2009", text: "Forty tenants found the Ashby Renters' Mutual." },
    {
      year: "2012",
      text: "First Homeowners policy, and the plain-English column in every clause.",
    },
    { year: "2016", text: "Renamed Vault. Claims line goes 24 hours." },
    {
      year: "2020",
      text: "Video assessments for contents claims under $10,000.",
    },
    { year: "2024", text: "First member dividend: $5 of every $100 returned." },
    { year: "2026", text: "Licensed in 31 states; 410,000 homes insured." },
  ],
  people: [
    {
      name: "Harriet Vance",
      role: "Chief executive",
      bio: "Spent fourteen years as a claims adjuster before she ran anything. Still takes one claims shift a month.",
    },
    {
      name: "Tomas Ekwueme",
      role: "Head of claims",
      bio: "Built the named-handler model. Measures his team on how many members call back, not how fast they hang up.",
    },
    {
      name: "Lucía Barros",
      role: "Chief underwriter",
      bio: "Rewrote the policy wording in 2012 and has edited every clause since, with a stopwatch for reading time.",
    },
    {
      name: "Wen Okoro",
      role: "Member board chair",
      bio: "A Renters member since 2011, elected by policyholders to chair the board in 2023.",
    },
  ],
  principles: [
    {
      title: "Plain words are part of the product",
      text: "If a clause can't be explained in one sentence, we rewrite the clause.",
    },
    {
      title: "Price for the home, not the person's past",
      text: "One small claim never changes a renewal price.",
    },
    {
      title: "Pay first, argue later",
      text: "Emergency costs are paid while the claim is open, not after it closes.",
    },
  ],
};

/* ───────────────────────── Footer & forms ───────────────────────── */

export const footerColumns = [
  {
    title: "Cover",
    links: [
      { to: "/cover", label: "All cover" },
      { to: "/cover/renters", label: "Renters" },
      { to: "/cover/homeowners", label: "Homeowners" },
      { to: "/cover/condo", label: "Condo & co-op" },
      { to: "/cover/landlord", label: "Landlord" },
    ],
  },
  {
    title: "Members",
    links: [
      { to: "/quote", label: "Get a quote" },
      { to: "/claims", label: "Make a claim" },
      { to: "/help", label: "Help centre" },
      { to: "/help/moving-house", label: "Moving house" },
    ],
  },
  {
    title: "Vault",
    links: [
      { to: "/about", label: "About the mutual" },
      { to: "/cover/valuables", label: "Valuables" },
      { to: "/cover/water", label: "Flood & water backup" },
    ],
  },
];

export const newsletter = {
  title: "The seasonal checklist",
  text: "Four emails a year: what to check before winter, storm season, holidays and spring. Nothing else.",
};

export const quotePage = {
  title: "Get a quote",
  text: "Four short steps. Your schedule builds itself on the right as you go, and the price is the price — no call needed.",
};
