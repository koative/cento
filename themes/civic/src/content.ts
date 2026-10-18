import hallPhoto from "./assets/city-hall.jpg";
import chamber from "./assets/chamber.jpg";
import paving from "./assets/paving.jpg";
import paver from "./assets/paver.jpg";
import library from "./assets/library.jpg";
import pool from "./assets/pool.jpg";
import snowplow from "./assets/snowplow.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  cityHall: {
    src: hallPhoto,
    alt: "A domed civic building behind a lawn of flower beds",
    w: 1024,
    h: 768,
  },
  chamber: {
    src: chamber,
    alt: "The council chamber: wooden desks in a horseshoe around a carpet woven with a street map",
    w: 1280,
    h: 720,
  },
  paving: {
    src: paving,
    alt: "A road crew in high-visibility vests raking fresh asphalt",
    w: 1024,
    h: 683,
  },
  paver: {
    src: paver,
    alt: "A paving machine laying asphalt while a worker levels the edge",
    w: 1024,
    h: 683,
  },
  library: {
    src: library,
    alt: "Library shelves, reading chairs and a study table",
    w: 1024,
    h: 768,
  },
  pool: {
    src: pool,
    alt: "An outdoor public pool beside a park lawn and swings",
    w: 1280,
    h: 960,
  },
  snowplow: {
    src: snowplow,
    alt: "A tractor with a snow blower clearing a path through deep snow",
    w: 1280,
    h: 853,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Commonwell",
  full: "City of Commonwell",
  sector: "City government services",
  tagline: "Your city, one search away.",
  official: "Official website of the City of Commonwell",
  address: ["City Hall, 200 Market Street", "Commonwell, OR 97999"],
  phone: "+1 555 014 0311",
  tel: "tel:+15550140311",
  email: "hello@commonwell.example",
  // Day 0 = Sunday. Minutes since midnight.
  hours: [
    null,
    [510, 1020],
    [510, 1020],
    [510, 1020],
    [510, 1140],
    [510, 1020],
    null,
  ] as ([number, number] | null)[],
  hoursText: [
    "Monday–Wednesday 8:30 am – 5:00 pm",
    "Thursday 8:30 am – 7:00 pm",
    "Friday 8:30 am – 5:00 pm",
    "Closed weekends and city holidays",
  ],
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/council", label: "Council & meetings" },
  { to: "/news", label: "News" },
  { to: "/alerts", label: "Alerts" },
  { to: "/city-hall", label: "City Hall" },
];

/* ───────────── Map of the city (authored geometry, viewBox 0 0 960 600) ───────────── */

export const map = {
  width: 960,
  height: 600,
  streets: [
    { name: "Station St", y: 80 },
    { name: "Orchard St", y: 180 },
    { name: "Market St", y: 280 },
    { name: "Mill St", y: 380 },
    { name: "Harbor St", y: 470 },
  ],
  avenues: [
    { name: "1st Ave", x: 100 },
    { name: "2nd Ave", x: 252 },
    { name: "3rd Ave", x: 404 },
    { name: "4th Ave", x: 556 },
    { name: "5th Ave", x: 708 },
    { name: "6th Ave", x: 860 },
  ],
  park: { name: "Fairmount Park", x: 262, y: 190, w: 132, h: 80 },
  river: "Tilly River",
  landmarks: [
    { name: "City Hall", x: 580, y: 256 },
    { name: "Library", x: 428, y: 356 },
  ],
  wardSplit: { x: 480, y: 280 },
};

export type WardId = 1 | 2 | 3 | 4;

export const wards: Record<
  WardId,
  { trashDay: number; recyclingWeek: "even" | "odd"; polling: string }
> = {
  1: {
    trashDay: 1,
    recyclingWeek: "even",
    polling: "Northgate Community Hall, 14 Station St",
  },
  2: {
    trashDay: 2,
    recyclingWeek: "odd",
    polling: "Eastside Fire Station 3, 610 Orchard St",
  },
  3: {
    trashDay: 3,
    recyclingWeek: "even",
    polling: "Commonwell Public Library, 220 Mill St",
  },
  4: {
    trashDay: 4,
    recyclingWeek: "odd",
    polling: "Harbor Street Senior Center, 905 Harbor St",
  },
};

/* ───────────── Services ───────────── */

export const categories = [
  "Home & waste",
  "Streets & parking",
  "Parks & community",
  "Permits & business",
  "Taxes & records",
] as const;
export type Category = (typeof categories)[number];

export type Service = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  intro: string;
  online: boolean;
  fee: string;
  time: string;
  dept: string;
  phone: string;
  needs: string[];
  steps: { title: string; body: string }[];
  fees: { item: string; price: string }[];
  faqs: { q: string; a: string }[];
  action: { label: string; to: string };
  related: string[];
  image?: Img;
  tool?: "bin-day";
  updated: string;
};

export const services: Service[] = [
  {
    slug: "bin-collection",
    name: "Trash & recycling collection",
    category: "Home & waste",
    summary:
      "Your weekly collection day, what goes in which cart, and what to do when a pickup is missed.",
    intro:
      "Trash is collected every week on your ward's day. Recycling (blue cart) and yard waste (green cart) alternate weeks. Put carts at the curb by 7:00 am with lids closed and handles facing the house.",
    online: true,
    fee: "Included in your utility bill",
    time: "Weekly",
    dept: "Public Works — Solid Waste",
    phone: "+1 555 014 0420",
    needs: ["Your street address", "Your cart colors (gray, blue, green)"],
    steps: [
      {
        title: "Find your day",
        body: "Enter your address below. Your ward sets your weekday and whether this week is recycling or yard waste.",
      },
      {
        title: "Sort it",
        body: "Blue: clean paper, cardboard, cans, plastic bottles and tubs. Green: leaves, grass, branches under 4 inches. Gray: everything else.",
      },
      {
        title: "Curb by 7:00 am",
        body: "Leave 3 feet between carts and keep them clear of parked cars and mailboxes.",
      },
      {
        title: "Missed?",
        body: "If your street was collected but your cart was not, report it by noon the next working day.",
      },
    ],
    fees: [
      { item: "Standard 64-gallon trash cart", price: "Included" },
      { item: "Extra 96-gallon cart", price: "$6.50 / month" },
      { item: "Replacement cart (damaged by crew)", price: "Free" },
    ],
    faqs: [
      {
        q: "Do holidays move my collection?",
        a: "Yes. In a week with a city holiday on or before your day, collection runs one day late. Holiday changes are posted on the Alerts page.",
      },
      {
        q: "Can I put plastic bags in the blue cart?",
        a: "No. Bags tangle the sorting machines. Return them to grocery store drop-offs.",
      },
    ],
    action: { label: "Report a missed collection", to: "/report?type=missed" },
    related: ["bulky-pickup", "snow-winter", "property-tax"],
    tool: "bin-day",
    updated: "Oct 2, 2026",
  },
  {
    slug: "bulky-pickup",
    name: "Bulky item pickup",
    category: "Home & waste",
    summary:
      "Book a curbside pickup for furniture, mattresses and appliances too big for your cart.",
    intro:
      "Bulky items are collected on Fridays by appointment. Each booking covers up to three items. Appliances containing refrigerant need a certified removal tag, which the crew attaches at pickup.",
    online: false,
    fee: "$25 for up to 3 items",
    time: "Next available Friday",
    dept: "Public Works — Solid Waste",
    phone: "+1 555 014 0420",
    needs: [
      "A list of items",
      "Your address and a phone number",
      "Payment card for the $25 fee",
    ],
    steps: [
      {
        title: "Call to book",
        body: "Book by Wednesday noon for that Friday. We will read back your items and the address.",
      },
      {
        title: "Place items out",
        body: "Put items at the curb after 6:00 pm Thursday, not blocking the sidewalk.",
      },
      {
        title: "Crew collects",
        body: "Collection happens between 7:00 am and 3:00 pm Friday.",
      },
    ],
    fees: [
      { item: "Up to 3 items", price: "$25" },
      { item: "Each extra item", price: "$10" },
      { item: "Refrigerant appliance tag", price: "$15" },
    ],
    faqs: [
      {
        q: "Do you take construction debris?",
        a: "No. Drywall, concrete and roofing go to the Transfer Station on Harbor Street, open Saturdays 8 am – 2 pm.",
      },
      {
        q: "Is there a free pickup week?",
        a: "Yes, the first full week of May. Dates are announced in April on the News page.",
      },
    ],
    action: { label: "Call to book a pickup", to: "tel:+15550140420" },
    related: ["bin-collection", "property-tax"],
    updated: "Sep 18, 2026",
  },
  {
    slug: "potholes",
    name: "Potholes & street repair",
    category: "Streets & parking",
    summary:
      "Report a pothole, cracked pavement or a sunken utility cover, then track it until it is filled.",
    intro:
      "The Streets Division fills reported potholes within five working days, faster on main routes. Bigger failures — sinkholes, broken curbs, failed patches — are inspected first and scheduled into resurfacing.",
    online: true,
    fee: "Free",
    time: "Within 5 working days",
    dept: "Public Works — Streets Division",
    phone: "+1 555 014 0430",
    needs: [
      "Where it is (a pin on the map or the nearest address)",
      "Roughly how big it is",
      "A photo if you can take one safely",
    ],
    steps: [
      {
        title: "Drop a pin",
        body: "Place the pin on the map. We show reports already open nearby so you can add to one instead of filing twice.",
      },
      {
        title: "Get a reference",
        body: "You receive a CW reference number straight away. Keep it to track progress.",
      },
      {
        title: "Inspection and repair",
        body: "A crew inspects within two working days and fills the hole, or marks it for resurfacing.",
      },
    ],
    fees: [{ item: "Reporting and repair", price: "Free" }],
    faqs: [
      {
        q: "A pothole damaged my car. Can I claim?",
        a: "Claims go to the City Clerk within 60 days of the incident. Include photos, the location and repair receipts.",
      },
      {
        q: "Is it dangerous right now?",
        a: "If a hole is deep enough to cause a crash, call 911 first, then report it here.",
      },
    ],
    action: { label: "Report a pothole", to: "/report?type=pothole" },
    related: ["streetlights", "snow-winter", "parking-permits"],
    image: images.paving,
    updated: "Oct 14, 2026",
  },
  {
    slug: "streetlights",
    name: "Streetlights",
    category: "Streets & parking",
    summary:
      "Report a dark, flickering or day-burning streetlight. Most are fixed within a week.",
    intro:
      "Commonwell maintains 3,100 streetlights, now almost all LED. Each pole carries a small numbered tag; quoting it speeds the repair, but a pin on the map works too.",
    online: true,
    fee: "Free",
    time: "Within 7 working days",
    dept: "Public Works — Electrical",
    phone: "+1 555 014 0435",
    needs: [
      "The pole location or tag number",
      "Whether it is out, flickering or on in daylight",
    ],
    steps: [
      {
        title: "Report the light",
        body: "Pin the pole on the map and choose what is wrong.",
      },
      {
        title: "Night survey",
        body: "Electricians check reported lights on their Tuesday night route.",
      },
      {
        title: "Repair",
        body: "Simple lamp failures are fixed the same night; damaged poles need a part and a second visit.",
      },
    ],
    fees: [{ item: "Reporting and repair", price: "Free" }],
    faqs: [
      {
        q: "Who fixes the lights on Harbor Street?",
        a: "Harbor Street lights belong to the Port Authority. We forward those reports to them the same day.",
      },
      {
        q: "Can I ask for a new streetlight?",
        a: "Yes. New lights are requested through your ward councillor and reviewed each spring.",
      },
    ],
    action: { label: "Report a streetlight", to: "/report?type=streetlight" },
    related: ["potholes", "snow-winter"],
    updated: "Aug 30, 2026",
  },
  {
    slug: "parking-permits",
    name: "Residential parking permits",
    category: "Streets & parking",
    summary:
      "Permits for streets in a residential parking zone, plus guest passes for visitors.",
    intro:
      "Six zones near downtown limit non-resident parking to two hours. Residents with a permit can park without limit in their zone. Permits run from 1 January to 31 December.",
    online: false,
    fee: "$40 per vehicle per year",
    time: "Same day at the counter",
    dept: "Finance — Parking Office",
    phone: "+1 555 014 0450",
    needs: [
      "Vehicle registration at your Commonwell address",
      "A utility bill or lease from the last 60 days",
      "Driver's license",
    ],
    steps: [
      {
        title: "Check your zone",
        body: "Zones A–F are signed at each block. If your block has no sign, it is not in a zone.",
      },
      {
        title: "Visit the Parking Office",
        body: "Bring your documents to City Hall, first floor, any weekday.",
      },
      {
        title: "Display the permit",
        body: "Hang the permit from the rear-view mirror. Guest passes go on the dashboard.",
      },
    ],
    fees: [
      { item: "Resident permit, first vehicle", price: "$40 / year" },
      { item: "Each additional vehicle", price: "$60 / year" },
      { item: "Guest pass book (20 days)", price: "$15" },
    ],
    faqs: [
      {
        q: "Is there a discount for seniors?",
        a: "Residents aged 65 and over pay $20 for their first permit.",
      },
      {
        q: "Is Orchard Street becoming a zone?",
        a: "Council votes on Ordinance 26-14 on October 28. See the meeting page for the proposal.",
      },
    ],
    action: { label: "Visit the Parking Office", to: "/city-hall" },
    related: ["potholes", "business-licence"],
    updated: "Oct 9, 2026",
  },
  {
    slug: "snow-winter",
    name: "Snow & winter roads",
    category: "Streets & parking",
    summary:
      "Plowing priorities, snow emergency parking rules and how to sign up for snow alerts.",
    intro:
      "When 2 inches or more is forecast, the city declares a snow emergency. Snow routes are plowed first and must be clear of parked cars; residential streets follow within 24 hours of the snow stopping.",
    online: true,
    fee: "Free",
    time: "Snow routes first, then residential within 24 hours",
    dept: "Public Works — Streets Division",
    phone: "+1 555 014 0430",
    needs: ["A phone number or email for snow alerts"],
    steps: [
      {
        title: "Sign up for snow alerts",
        body: "We text and email the moment a snow emergency is declared and when it ends.",
      },
      {
        title: "Move off snow routes",
        body: "Market Street, 3rd Avenue and Station Street are snow routes. Cars left there are towed to the Harbor lot.",
      },
      {
        title: "Clear your sidewalk",
        body: "Property owners have until noon the day after snow stops to clear a 36-inch path.",
      },
    ],
    fees: [
      { item: "Tow from a snow route", price: "$95" },
      { item: "Sidewalk not cleared (after notice)", price: "$50" },
      { item: "Free sand for sidewalks (bring a bucket)", price: "Free" },
    ],
    faqs: [
      {
        q: "The plow blocked my driveway. Can you clear it?",
        a: "Plows have to push snow to the side of the road. Crews cannot clear private driveways, but residents aged 70+ can join the volunteer Snow Buddies list.",
      },
      {
        q: "Where can I get sand?",
        a: "Self-serve sand bins sit at Northgate Community Hall and the Mill Street fire station all winter.",
      },
    ],
    action: { label: "Sign up for snow alerts", to: "/alerts" },
    related: ["potholes", "bin-collection", "streetlights"],
    image: images.snowplow,
    updated: "Oct 9, 2026",
  },
  {
    slug: "parks-pools",
    name: "Parks, pools & shelters",
    category: "Parks & community",
    summary:
      "Opening hours for 14 parks and two outdoor pools, and how to reserve a picnic shelter.",
    intro:
      "Parks are open from 6:00 am to 10:00 pm. Fairmount Park and Riverside pools open from Memorial Day to Labor Day. Picnic shelters can be reserved for groups of up to 60.",
    online: true,
    fee: "Shelters from $35",
    time: "Reservations confirmed within 2 working days",
    dept: "Parks & Recreation",
    phone: "+1 555 014 0460",
    needs: [
      "Date and approximate group size",
      "A contact name and phone number",
    ],
    steps: [
      {
        title: "Pick a shelter",
        body: "Fairmount Park has two shelters (40 and 60 people); Riverside has one (30).",
      },
      {
        title: "Request your date",
        body: "Call or email Parks & Recreation. Weekend dates go fast from April.",
      },
      {
        title: "Pay and confirm",
        body: "Pay within 5 days of the confirmation email to hold the booking.",
      },
    ],
    fees: [
      { item: "Shelter, half day, residents", price: "$35" },
      { item: "Shelter, full day, residents", price: "$60" },
      { item: "Pool day pass, adult / child", price: "$4 / $2" },
      { item: "Pool season pass, household", price: "$95" },
    ],
    faqs: [
      {
        q: "Are dogs allowed in parks?",
        a: "Yes, on a leash. The fenced off-leash area is at the east end of Fairmount Park.",
      },
      {
        q: "Can I hold a party with a bounce house?",
        a: "Yes, at the Fairmount shelters only, with a $25 inflatable permit.",
      },
    ],
    action: {
      label: "Email Parks & Recreation",
      to: "mailto:parks@commonwell.example",
    },
    related: ["library-card", "snow-winter"],
    image: images.pool,
    updated: "Oct 2, 2026",
  },
  {
    slug: "library-card",
    name: "Library card",
    category: "Parks & community",
    summary:
      "Free for everyone who lives, works or studies in Commonwell — books, e-books, study rooms and the tool library.",
    intro:
      "A Commonwell library card lets you borrow up to 40 items, download e-books and audiobooks, book a study room and, from this fall, borrow from the tool library at the Mill Street branch.",
    online: true,
    fee: "Free",
    time: "Instant digital card; plastic card at any desk",
    dept: "Commonwell Public Library",
    phone: "+1 555 014 0470",
    needs: ["Photo ID", "Proof of a Commonwell address, workplace or school"],
    steps: [
      {
        title: "Sign up at the desk",
        body: "Bring ID and proof of address to the Mill Street library or the Northgate branch.",
      },
      {
        title: "Get your PIN",
        body: "Staff set a 4-digit PIN for the catalog, e-books and study room bookings.",
      },
      {
        title: "Borrow",
        body: "Loans last 3 weeks, tools 1 week. Renew twice online unless someone is waiting.",
      },
    ],
    fees: [
      { item: "Card for residents and workers", price: "Free" },
      { item: "Replacement card", price: "$2" },
      { item: "Late returns", price: "No fines" },
    ],
    faqs: [
      {
        q: "Can children have their own card?",
        a: "Yes, from birth, with a parent or guardian signing for them.",
      },
      {
        q: "What is in the tool library?",
        a: "Drills, ladders, a carpet cleaner, pressure washer, sewing machines and 200 more items.",
      },
    ],
    action: {
      label: "Email the library",
      to: "mailto:library@commonwell.example",
    },
    related: ["parks-pools", "voter-registration"],
    image: images.library,
    updated: "Sep 18, 2026",
  },
  {
    slug: "building-permits",
    name: "Building permits",
    category: "Permits & business",
    summary:
      "When you need a permit for decks, fences, sheds, re-roofing and remodels, and how to apply.",
    intro:
      "You need a building permit for structural work, new decks over 30 inches high, fences over 7 feet, sheds over 200 square feet, re-roofing and most electrical or plumbing changes. Painting, flooring and cabinets do not need one.",
    online: false,
    fee: "From $85",
    time: "Simple permits in 5 working days; plan review 3–4 weeks",
    dept: "Planning & Building",
    phone: "+1 555 014 0480",
    needs: [
      "A site plan showing the work and property lines",
      "Drawings with dimensions",
      "Contractor license number, if you are hiring one",
    ],
    steps: [
      {
        title: "Check if you need one",
        body: "Call the permit counter or visit on Tuesday or Thursday mornings for a free 15-minute check.",
      },
      {
        title: "Submit plans",
        body: "Bring two printed sets or email PDFs. We review for zoning first, then building code.",
      },
      {
        title: "Pay and post",
        body: "Pay the fee, then post the permit card where it can be seen from the street.",
      },
      {
        title: "Book inspections",
        body: "Call by 3:00 pm for a next-day inspection at each stage listed on your permit.",
      },
    ],
    fees: [
      { item: "Fence or shed", price: "$85" },
      { item: "Deck", price: "$150" },
      { item: "Re-roof (residential)", price: "$120" },
      { item: "Remodel, per $1,000 of project value", price: "$11" },
    ],
    faqs: [
      {
        q: "Can I do the work myself?",
        a: "Yes, on your own home. Electrical work beyond replacing fixtures needs a licensed electrician.",
      },
      {
        q: "What if I built without a permit?",
        a: "Apply now for an after-the-fact permit. The fee doubles, and an inspector may ask to open walls.",
      },
    ],
    action: { label: "Visit the permit counter", to: "/city-hall" },
    related: ["business-licence", "property-tax"],
    updated: "Sep 25, 2026",
  },
  {
    slug: "business-licence",
    name: "Business license",
    category: "Permits & business",
    summary:
      "Every business operating in Commonwell, including home-based ones, needs a yearly license.",
    intro:
      "Business licenses run from July 1 to June 30. Home businesses with no customer visits and no employees qualify for the simplified home occupation license.",
    online: false,
    fee: "$50–$250 per year",
    time: "Issued within 10 working days",
    dept: "Finance — Licensing",
    phone: "+1 555 014 0450",
    needs: [
      "State business registration number",
      "Business address and owner contact",
      "Number of employees",
    ],
    steps: [
      {
        title: "Choose a license type",
        body: "Home occupation, standard commercial, or food & alcohol (needs a health inspection).",
      },
      {
        title: "Apply at City Hall",
        body: "Licensing is on the first floor beside the Parking Office.",
      },
      {
        title: "Zoning check",
        body: "Planning confirms your use is allowed at your address.",
      },
    ],
    fees: [
      { item: "Home occupation", price: "$50 / year" },
      { item: "Standard, up to 10 employees", price: "$120 / year" },
      { item: "Standard, 11 or more employees", price: "$250 / year" },
    ],
    faqs: [
      {
        q: "I sell at the farmers market. Do I need one?",
        a: "No. The market holds a single license covering all stallholders.",
      },
      {
        q: "When do renewals go out?",
        a: "Renewal notices are mailed in May, and are due by June 30.",
      },
    ],
    action: {
      label: "Email Licensing",
      to: "mailto:licensing@commonwell.example",
    },
    related: ["building-permits", "parking-permits"],
    updated: "Jul 1, 2026",
  },
  {
    slug: "property-tax",
    name: "Property tax",
    category: "Taxes & records",
    summary:
      "Due dates, how your bill is worked out, payment plans and the senior deferral program.",
    intro:
      "Property tax bills are mailed in October and can be paid in full by November 15 or in three installments: November 15, February 15 and May 15. Paying in full by November 15 earns a 3% discount.",
    online: true,
    fee: "Based on assessed value",
    time: "Bills mailed each October",
    dept: "Finance — Tax Office",
    phone: "+1 555 014 0440",
    needs: [
      "Your parcel number (top right of the bill)",
      "Bank account or card for payment",
    ],
    steps: [
      {
        title: "Check your bill",
        body: "The bill shows your assessed value, the levy rate for each district and the amount due.",
      },
      {
        title: "Pay",
        body: "Pay by mail, at the Tax Office counter, or set up automatic installments.",
      },
      {
        title: "Need more time?",
        body: "Residents over 62 or on disability benefits can defer taxes until the home is sold.",
      },
    ],
    fees: [
      { item: "Pay in full by November 15", price: "3% discount" },
      { item: "Late installment", price: "1% per month" },
      { item: "Returned payment", price: "$25" },
    ],
    faqs: [
      {
        q: "I think my assessment is wrong.",
        a: "Appeals go to the County Board of Property Tax Appeals by December 31. The Tax Office can help you prepare one.",
      },
      {
        q: "Where does my tax go?",
        a: "See City Hall for how each $100 of city property tax is spent.",
      },
    ],
    action: { label: "Call the Tax Office", to: "tel:+15550140440" },
    related: ["voter-registration", "bin-collection"],
    updated: "Oct 1, 2026",
  },
  {
    slug: "voter-registration",
    name: "Voting & elections",
    category: "Taxes & records",
    summary:
      "Register to vote, find your polling place and see what is on the ballot this November.",
    intro:
      "The general election is on Tuesday, November 3, 2026. Ballots are mailed to every registered voter by October 16. Drop boxes stay open until 8:00 pm on election day.",
    online: true,
    fee: "Free",
    time: "Register by October 13 to receive a ballot by mail",
    dept: "City Clerk — Elections",
    phone: "+1 555 014 0410",
    needs: [
      "Driver's license, state ID or the last 4 digits of your Social Security number",
    ],
    steps: [
      {
        title: "Check your registration",
        body: "Call the Clerk or visit City Hall to confirm your address on the roll.",
      },
      {
        title: "Vote by mail or drop box",
        body: "Drop boxes are at City Hall, the Mill Street library and Northgate Community Hall.",
      },
      {
        title: "Or vote in person",
        body: "Each ward has a polling place for voters who need assistance or a replacement ballot.",
      },
    ],
    fees: [{ item: "Registering and voting", price: "Free" }],
    faqs: [
      {
        q: "Which ward am I in?",
        a: "Use the address lookup on the home page; it shows your ward, councillor and polling place.",
      },
      {
        q: "Can I register on election day?",
        a: "Yes, in person at City Hall until 8:00 pm, with ID and proof of address.",
      },
    ],
    action: { label: "Find your councillor", to: "/council" },
    related: ["property-tax", "library-card"],
    updated: "Sep 25, 2026",
  },
];

/* ───────────── Report an issue ───────────── */

export const issueTypes = [
  { id: "pothole", label: "Pothole", dept: "Streets Division", days: 5 },
  { id: "streetlight", label: "Streetlight out", dept: "Electrical", days: 7 },
  { id: "missed", label: "Missed collection", dept: "Solid Waste", days: 2 },
  { id: "graffiti", label: "Graffiti", dept: "Parks & Recreation", days: 3 },
  {
    id: "tree",
    label: "Fallen tree or branch",
    dept: "Urban Forestry",
    days: 2,
  },
  {
    id: "drain",
    label: "Blocked storm drain",
    dept: "Streets Division",
    days: 4,
  },
  { id: "sign", label: "Damaged sign", dept: "Traffic Operations", days: 10 },
  {
    id: "other",
    label: "Something else",
    dept: "City Hall service desk",
    days: 10,
  },
] as const;
export type IssueType = (typeof issueTypes)[number]["id"];

export const stages = ["Received", "Assigned", "Scheduled", "Fixed"] as const;

export type Report = {
  ref: string;
  type: IssueType;
  x: number;
  y: number;
  filed: string;
  stage: number;
  note: string;
  neighbours: number;
};

export const sampleReports: Report[] = [
  {
    ref: "CW-24817",
    type: "pothole",
    x: 330,
    y: 380,
    filed: "2026-10-15",
    stage: 2,
    note: "Crew booked for Tuesday morning.",
    neighbours: 4,
  },
  {
    ref: "CW-24809",
    type: "streetlight",
    x: 708,
    y: 140,
    filed: "2026-10-14",
    stage: 1,
    note: "On the Tuesday night electrical route.",
    neighbours: 1,
  },
  {
    ref: "CW-24790",
    type: "drain",
    x: 556,
    y: 455,
    filed: "2026-10-12",
    stage: 3,
    note: "Leaves cleared from the grate.",
    neighbours: 2,
  },
  {
    ref: "CW-24775",
    type: "graffiti",
    x: 290,
    y: 205,
    filed: "2026-10-10",
    stage: 3,
    note: "Removed from the Fairmount shelter wall.",
    neighbours: 0,
  },
  {
    ref: "CW-24822",
    type: "sign",
    x: 404,
    y: 110,
    filed: "2026-10-16",
    stage: 0,
    note: "Waiting for inspection.",
    neighbours: 0,
  },
  {
    ref: "CW-24801",
    type: "tree",
    x: 820,
    y: 330,
    filed: "2026-10-13",
    stage: 3,
    note: "Branch removed and chipped.",
    neighbours: 3,
  },
  {
    ref: "CW-24828",
    type: "pothole",
    x: 160,
    y: 280,
    filed: "2026-10-17",
    stage: 0,
    note: "Waiting for inspection.",
    neighbours: 1,
  },
];

/* ───────────── Alerts ───────────── */

export type Alert = {
  id: string;
  level: "Urgent" | "Advisory" | "Notice";
  topic: "Water" | "Roads" | "Waste" | "Parks" | "Weather";
  title: string;
  body: string;
  area: string;
  since: string;
  until: string;
};

export const alertTopics: Alert["topic"][] = [
  "Water",
  "Roads",
  "Waste",
  "Parks",
  "Weather",
];

export const alerts: Alert[] = [
  {
    id: "boil-water-harbor",
    level: "Urgent",
    topic: "Water",
    title: "Boil-water advisory on Harbor Street, 1st to 3rd Avenue",
    body: "A water main break on Harbor Street lowered pressure overnight. Boil tap water for one minute before drinking, cooking or brushing teeth. Bottled water is available at the Harbor Street Senior Center until 8:00 pm.",
    area: "Ward 3",
    since: "Oct 17, 6:40 am",
    until: "Two clean water samples, expected Oct 19",
  },
  {
    id: "market-closure",
    level: "Advisory",
    topic: "Roads",
    title: "Market Street closed between 3rd and 4th Avenue",
    body: "Water main replacement. Detour via Mill Street. Businesses on the block stay open with sidewalk access; the bus stop moves to 4th Avenue.",
    area: "Downtown",
    since: "Oct 20, 7:00 am",
    until: "Oct 24, 6:00 pm",
  },
  {
    id: "orchard-paving",
    level: "Advisory",
    topic: "Roads",
    title: "Night paving on Orchard Street, 4th to 6th Avenue",
    body: "One lane open with flaggers from 8:00 pm to 5:00 am. No parking on either side from 6:00 pm; cars left there will be moved around the corner.",
    area: "Ward 2",
    since: "Oct 21",
    until: "Oct 23",
  },
  {
    id: "leaf-collection",
    level: "Notice",
    topic: "Waste",
    title: "Curbside leaf collection starts October 27",
    body: "Rake leaves into a row on the street edge, not into bike lanes or over storm drains. Crews pass each street twice before December 12.",
    area: "Citywide",
    since: "Oct 27",
    until: "Dec 12",
  },
  {
    id: "holiday-collection",
    level: "Notice",
    topic: "Waste",
    title: "Collection one day late in the week of November 11",
    body: "City offices close for Veterans Day. Monday collections move to Tuesday, Tuesday to Wednesday, and so on through Friday.",
    area: "Citywide",
    since: "Nov 11",
    until: "Nov 14",
  },
  {
    id: "pools-closed",
    level: "Notice",
    topic: "Parks",
    title: "Outdoor pools closed for the season",
    body: "Fairmount and Riverside pools are drained for winter. The splash pad at Riverside reopens in May.",
    area: "Fairmount Park, Riverside",
    since: "Sep 8",
    until: "May 2027",
  },
  {
    id: "frost",
    level: "Notice",
    topic: "Weather",
    title: "First frost expected this week",
    body: "Overnight lows near 30°F from Wednesday. Disconnect garden hoses and cover outdoor faucets to protect your water service line.",
    area: "Citywide",
    since: "Oct 21",
    until: "Oct 25",
  },
];

/* ───────────── Council & meetings ───────────── */

export type Member = {
  id: string;
  name: string;
  role: string;
  ward?: WardId;
  since: number;
  committees: string[];
  hours: string;
  email: string;
  bio: string;
};

export const members: Member[] = [
  {
    id: "marsh",
    name: "Elena Marsh",
    role: "Mayor",
    since: 2022,
    committees: ["Chairs City Council", "Budget Committee"],
    hours: "Open office, first Monday of the month, 4–6 pm",
    email: "mayor@commonwell.example",
    bio: "A former high-school civics teacher, elected on a promise of fixing streets in the order they break, not the order people complain.",
  },
  {
    id: "reyes",
    name: "Tomás Reyes",
    role: "Councillor, Ward 1",
    ward: 1,
    since: 2020,
    committees: ["Public Works", "Planning Commission liaison"],
    hours: "Saturdays 10–11 am, Northgate Community Hall",
    email: "ward1@commonwell.example",
    bio: "Runs the Northgate hardware store and the city's volunteer Snow Buddies program.",
  },
  {
    id: "natarajan",
    name: "Priya Natarajan",
    role: "Councillor, Ward 2",
    ward: 2,
    since: 2024,
    committees: ["Budget Committee (chair)", "Library Board"],
    hours: "By appointment, City Hall room 204",
    email: "ward2@commonwell.example",
    bio: "A municipal finance analyst who publishes a plain-language summary of every budget amendment.",
  },
  {
    id: "pell",
    name: "Gordon Pell",
    role: "Councillor, Ward 3",
    ward: 3,
    since: 2016,
    committees: ["Public Safety", "Water & Sewer"],
    hours: "Second Tuesday, 6–7 pm, Mill Street library",
    email: "ward3@commonwell.example",
    bio: "A retired fire captain, now in his third term, and the council's longest-serving member.",
  },
  {
    id: "okafor",
    name: "Ruth Okafor",
    role: "Councillor, Ward 4",
    ward: 4,
    since: 2022,
    committees: ["Parks & Recreation Board", "Housing"],
    hours: "Thursdays 5–6 pm, Harbor Street Senior Center",
    email: "ward4@commonwell.example",
    bio: "A nurse at the regional hospital who led the campaign to keep the Riverside pool open.",
  },
  {
    id: "duarte",
    name: "Marisol Duarte",
    role: "Councillor, at large",
    since: 2024,
    committees: ["Housing (chair)", "Planning"],
    hours: "By appointment, City Hall room 204",
    email: "duarte@commonwell.example",
    bio: "An architect focused on accessory dwelling units and faster permits for small builders.",
  },
  {
    id: "whitcombe",
    name: "Ben Whitcombe",
    role: "Councillor, at large",
    since: 2018,
    committees: ["Public Works (chair)", "Transportation"],
    hours: "Fridays 8–9 am, Station Street café tables",
    email: "whitcombe@commonwell.example",
    bio: "Bikes to every meeting and has pushed for protected lanes on 3rd Avenue since 2018.",
  },
];

export type AgendaItem = {
  title: string;
  kind:
    "Public comment" | "Consent" | "Public hearing" | "Action" | "Presentation";
  detail: string;
  outcome?: string;
};

export type Meeting = {
  id: string;
  body:
    | "City Council"
    | "Planning Commission"
    | "Budget Committee"
    | "Parks & Recreation Board";
  starts: string;
  minutes: number;
  room: string;
  upcoming: boolean;
  summary: string;
  agenda: AgendaItem[];
  documents: { name: string; pages: number }[];
};

export const meetings: Meeting[] = [
  {
    id: "council-2026-10-28",
    body: "City Council",
    starts: "2026-10-28T19:00",
    minutes: 150,
    room: "Council Chamber, City Hall, 2nd floor",
    upcoming: true,
    summary:
      "The first public hearing on the draft 2027 budget, and a vote on a new residential parking zone for Orchard Street.",
    agenda: [
      {
        title: "Public comment",
        kind: "Public comment",
        detail:
          "Up to 3 minutes per speaker on any topic not on tonight's agenda. Sign up at the door or by 4 pm the same day.",
      },
      {
        title: "Minutes of October 14",
        kind: "Consent",
        detail:
          "Approval of the minutes of the regular meeting of October 14, 2026.",
      },
      {
        title: "Leaf collection truck lease",
        kind: "Consent",
        detail:
          "A one-season lease for two additional leaf vacuum trucks, $184,000, from the Public Works equipment budget.",
      },
      {
        title: "Draft 2027 operating budget",
        kind: "Public hearing",
        detail:
          "Staff present the $62.4 million draft budget, including a 2.1% levy increase and four new Streets Division positions. Residents may speak for up to 3 minutes.",
      },
      {
        title: "Ordinance 26-14: Orchard Street parking zone",
        kind: "Action",
        detail:
          "Creates Zone G on Orchard Street between 2nd and 5th Avenue: 2-hour limit for non-residents, 8 am – 6 pm weekdays.",
      },
      {
        title: "Winter operations plan",
        kind: "Presentation",
        detail:
          "Public Works on snow routes, salt stock (2,800 tons) and the new text alert service.",
      },
    ],
    documents: [
      { name: "Agenda packet", pages: 86 },
      { name: "Draft 2027 budget summary", pages: 24 },
      { name: "Ordinance 26-14 with zone map", pages: 6 },
    ],
  },
  {
    id: "planning-2026-11-04",
    body: "Planning Commission",
    starts: "2026-11-04T18:30",
    minutes: 120,
    room: "Council Chamber, City Hall, 2nd floor",
    upcoming: true,
    summary:
      "A 38-home mixed-use building on Mill Street, and changes that would make backyard cottages easier to permit.",
    agenda: [
      {
        title: "Public comment",
        kind: "Public comment",
        detail: "General comment on planning matters not on the agenda.",
      },
      {
        title: "Site plan: 412 Mill Street",
        kind: "Public hearing",
        detail:
          "Four-story building, 38 apartments over ground-floor shops, 22 parking spaces and 60 bike spaces.",
      },
      {
        title: "Variance: 88 Orchard Street",
        kind: "Action",
        detail:
          "Request to reduce the side setback from 5 feet to 3 feet for a garage rebuild.",
      },
      {
        title: "Accessory dwelling units",
        kind: "Action",
        detail:
          "Recommendation to council: allow one backyard cottage on any residential lot, up to 800 square feet.",
      },
    ],
    documents: [
      { name: "Agenda packet", pages: 54 },
      { name: "412 Mill Street site plans", pages: 18 },
    ],
  },
  {
    id: "budget-2026-11-06",
    body: "Budget Committee",
    starts: "2026-11-06T17:30",
    minutes: 90,
    room: "Room 204, City Hall",
    upcoming: true,
    summary:
      "A working session on capital projects: the Station Street bridge, the library roof and fire engine replacement.",
    agenda: [
      {
        title: "Capital plan 2027–2031",
        kind: "Presentation",
        detail:
          "Finance presents the five-year capital plan and borrowing options.",
      },
      {
        title: "Library roof replacement",
        kind: "Action",
        detail:
          "Recommend funding the $1.1 million roof in 2027 rather than 2028.",
      },
      {
        title: "Public comment",
        kind: "Public comment",
        detail: "Comment on budget items only.",
      },
    ],
    documents: [{ name: "Capital plan draft", pages: 31 }],
  },
  {
    id: "council-2026-10-14",
    body: "City Council",
    starts: "2026-10-14T19:00",
    minutes: 135,
    room: "Council Chamber, City Hall, 2nd floor",
    upcoming: false,
    summary:
      "Council approved the Mill Street resurfacing close-out and agreed to publish the draft budget for six weeks of comment.",
    agenda: [
      {
        title: "Public comment",
        kind: "Public comment",
        detail:
          "Eleven speakers, mostly on the Orchard Street parking proposal.",
        outcome: "11 speakers",
      },
      {
        title: "Mill Street resurfacing close-out",
        kind: "Consent",
        detail:
          "Final payment to the contractor; the project finished $46,000 under budget.",
        outcome: "Approved 7–0",
      },
      {
        title: "Release of draft 2027 budget",
        kind: "Action",
        detail:
          "Publish the draft budget and open a comment period until November 6.",
        outcome: "Approved 6–1",
      },
      {
        title: "Ordinance 26-14 first reading",
        kind: "Action",
        detail: "First reading of the Orchard Street parking zone.",
        outcome: "Advanced to second reading 5–2",
      },
    ],
    documents: [
      { name: "Approved minutes", pages: 9 },
      { name: "Agenda packet", pages: 61 },
    ],
  },
  {
    id: "parks-2026-10-08",
    body: "Parks & Recreation Board",
    starts: "2026-10-08T18:00",
    minutes: 90,
    room: "Fairmount Park Lodge",
    upcoming: false,
    summary:
      "The board reviewed the pool season and recommended an off-leash area at the east end of Fairmount Park.",
    agenda: [
      {
        title: "Pool season report",
        kind: "Presentation",
        detail: "41,200 visits across both pools, the most since 2015.",
        outcome: "Received",
      },
      {
        title: "Fairmount off-leash area",
        kind: "Action",
        detail: "Fence a 1.2-acre area at the east end of the park.",
        outcome: "Recommended 5–0",
      },
    ],
    documents: [{ name: "Minutes", pages: 5 }],
  },
  {
    id: "council-2026-09-23",
    body: "City Council",
    starts: "2026-09-23T19:00",
    minutes: 120,
    room: "Council Chamber, City Hall, 2nd floor",
    upcoming: false,
    summary:
      "Council adopted the tool library partnership and heard the summer report on the 311 service desk.",
    agenda: [
      {
        title: "Tool library partnership",
        kind: "Action",
        detail:
          "Agreement with the Commonwell Makers Guild to stock and repair the tool library.",
        outcome: "Approved 7–0",
      },
      {
        title: "311 service desk summer report",
        kind: "Presentation",
        detail: "Median pothole repair time fell from 9 to 4 working days.",
        outcome: "Received",
      },
    ],
    documents: [{ name: "Approved minutes", pages: 7 }],
  },
];

/* ───────────── News ───────────── */

export type Article = {
  slug: string;
  title: string;
  date: string;
  topic: "Streets" | "Parks" | "Council" | "Community";
  dek: string;
  image: Img;
  from: string;
  body: string[];
  service?: string;
};

export const articles: Article[] = [
  {
    slug: "mill-street-resurfacing-done",
    title: "Mill Street resurfacing finishes two weeks early",
    date: "2026-10-14",
    topic: "Streets",
    dek: "1.4 miles of new pavement, 26 new curb ramps and a crosswalk at the library — and $46,000 left over.",
    image: images.paving,
    from: "Public Works",
    body: [
      "The Mill Street resurfacing project between 1st and 6th Avenue is complete, two weeks ahead of schedule. Crews milled and repaved 1.4 miles of road, rebuilt 26 curb ramps to current accessibility standards and added a raised crosswalk outside the Mill Street library.",
      "The project came in $46,000 under its $2.1 million budget. Council agreed on October 14 to return the balance to the street repair fund, where it will pay for roughly 400 pothole repairs next spring.",
      "Line painting finished on Monday night. If you notice a problem with the new surface — a sunken utility cover or a ramp that does not meet the crosswalk — report it with the issue type “Pothole” and mention Mill Street in the description.",
      "Next on the list: Station Street between 3rd and 5th Avenue, scheduled for spring 2027.",
    ],
    service: "potholes",
  },
  {
    slug: "snow-routes-november",
    title: "Winter snow routes take effect November 1",
    date: "2026-10-09",
    topic: "Streets",
    dek: "Three snow routes, a new text alert service and 2,800 tons of salt in the dome.",
    image: images.snowplow,
    from: "Public Works",
    body: [
      "From November 1, Market Street, 3rd Avenue and Station Street are signed snow routes. When the city declares a snow emergency, vehicles parked on them are towed so plows can clear curb to curb.",
      "New this winter: snow emergency alerts by text. Sign up on the Alerts page and choose “Weather”. You will get one message when an emergency starts and one when it ends.",
      "The salt dome on Harbor Street is full, with 2,800 tons — enough for an average winter and a half. Self-serve sand for sidewalks is available at Northgate Community Hall and the Mill Street fire station.",
    ],
    service: "snow-winter",
  },
  {
    slug: "pool-season-record",
    title: "Pools close after their busiest summer in a decade",
    date: "2026-10-02",
    topic: "Parks",
    dek: "41,200 visits to Fairmount and Riverside, and a waiting list for swim lessons that staff now want to clear.",
    image: images.pool,
    from: "Parks & Recreation",
    body: [
      "Fairmount and Riverside pools recorded 41,200 visits between Memorial Day and Labor Day, the highest since 2015. Twelve hot days in July accounted for nearly a third of the total.",
      "Swim lessons filled within two days of opening. Parks & Recreation will ask the Budget Committee for two more lifeguard-instructor positions so lessons can run on weekday evenings next summer.",
      "Both pools are now drained for winter. The Riverside splash pad reopens in May.",
    ],
    service: "parks-pools",
  },
  {
    slug: "draft-budget-2027",
    title: "Draft 2027 budget published — comment until November 6",
    date: "2026-09-25",
    topic: "Council",
    dek: "A $62.4 million plan with four new street crew positions and a 2.1% levy increase. Here is how to have your say.",
    image: images.chamber,
    from: "City Manager's Office",
    body: [
      "The draft 2027 operating budget is now public. It totals $62.4 million, up 3.4% from this year, mostly because of wages, health insurance and the cost of asphalt.",
      "The draft adds four positions to the Streets Division so that pothole repairs can stay under five working days through winter. It also funds evening opening at the Northgate library branch on Thursdays.",
      "For a home assessed at the city median of $318,000, the proposed levy adds about $41 a year.",
      "You can comment in person at the City Council public hearing on October 28, in writing to the City Clerk, or at the Budget Committee session on November 6.",
    ],
  },
  {
    slug: "tool-library-opens",
    title: "Your library card now borrows drills and ladders",
    date: "2026-09-18",
    topic: "Community",
    dek: "The tool library opens at the Mill Street branch with 220 items, stocked and repaired by local volunteers.",
    image: images.library,
    from: "Commonwell Public Library",
    body: [
      "Any Commonwell library card can now borrow from the tool library on the lower floor of the Mill Street branch. Loans last one week, with one renewal.",
      "The 220 items range from cordless drills and stepladders to a carpet cleaner, a pressure washer and six sewing machines. Members of the Commonwell Makers Guild check and repair returns every Saturday morning.",
      "Donations of working tools are welcome at the library desk on Saturdays.",
    ],
    service: "library-card",
  },
  {
    slug: "station-street-night-paving",
    title: "Night paving on Station Street, 1st to 3rd Avenue",
    date: "2026-09-10",
    topic: "Streets",
    dek: "Crews worked overnight from September 21 to October 9 to keep daytime traffic moving near the train station.",
    image: images.paver,
    from: "Public Works",
    body: [
      "Station Street between 1st and 3rd Avenue was repaved at night from September 21 to October 9. Working overnight kept the street open for morning commuters and the station drop-off.",
      "Residents on the block received door-hanger notices a week in advance. Thank you for your patience with the noise.",
      "If a new manhole cover or curb is uneven, please report it so the contractor fixes it under warranty.",
    ],
    service: "potholes",
  },
];

/* ───────────── City Hall ───────────── */

export const departments = [
  {
    name: "Public Works",
    does: "Streets, snow, trash and recycling, streetlights, storm drains",
    phone: "+1 555 014 0420",
    email: "publicworks@commonwell.example",
  },
  {
    name: "Parks & Recreation",
    does: "14 parks, two pools, shelters, youth sports, urban forestry",
    phone: "+1 555 014 0460",
    email: "parks@commonwell.example",
  },
  {
    name: "Planning & Building",
    does: "Permits, inspections, zoning, the comprehensive plan",
    phone: "+1 555 014 0480",
    email: "permits@commonwell.example",
  },
  {
    name: "Finance",
    does: "Property tax, utility billing, parking permits, business licenses",
    phone: "+1 555 014 0440",
    email: "finance@commonwell.example",
  },
  {
    name: "City Clerk",
    does: "Council agendas and minutes, public records, elections, claims",
    phone: "+1 555 014 0410",
    email: "clerk@commonwell.example",
  },
  {
    name: "Public Library",
    does: "Mill Street and Northgate branches, tool library, study rooms",
    phone: "+1 555 014 0470",
    email: "library@commonwell.example",
  },
];

export const budget = {
  total: "$62.4 million",
  year: 2027,
  split: [
    { label: "Police & fire", amount: 38 },
    { label: "Streets, snow & public works", amount: 21 },
    { label: "Parks, pools & library", amount: 14 },
    { label: "Debt on past projects", amount: 10 },
    { label: "Administration & IT", amount: 9 },
    { label: "Planning & housing", amount: 8 },
  ],
};

export const cityHall = {
  welcome: [
    "Most of what a city does is quiet: water that runs clean, streets that get plowed, a library that is open when you need it. This website is built for the moments when something is not quiet — a pothole, a missed pickup, a question you need answered before the counter closes.",
    "Every report you file here goes to the crew that fixes it, and you can follow it until it is done. If we get something wrong, tell us; that is what council meetings and my open office hours are for.",
  ],
  signedBy: "Elena Marsh, Mayor",
  howItWorks: [
    {
      title: "Mayor and council",
      body: "Seven elected members: a mayor, four ward councillors and two at-large councillors. Each serves a four-year term, staggered so that half the council is elected every two years.",
    },
    {
      title: "City Manager",
      body: "The council hires a professional City Manager who runs day-to-day operations and about 340 city staff.",
    },
    {
      title: "Boards and commissions",
      body: "Volunteer residents sit on nine boards, from Planning to the Library Board. Openings are posted each January.",
    },
  ],
};

export const homeCopy = {
  title: "What do you need from the city today?",
  lede: "Search 12 services, report a problem on the street, or check your trash day — all in one place, on any phone.",
  popular: [
    "Trash day",
    "Pothole",
    "Parking permit",
    "Property tax",
    "Library card",
    "Building permit",
  ],
  reportTitle: "Seen something that needs fixing?",
  reportBody:
    "Drop a pin, pick what is wrong and get a reference number on the spot. The report goes straight to the crew that fixes it, and you can follow it from Received to Fixed.",
  close: {
    title: "Still can't find it? Ask a person.",
    body: "The City Hall service desk answers the phone and the counter during opening hours. Most questions are sorted in one call.",
  },
};

export const footer = {
  newsletter: {
    title: "Commonwell Weekly",
    body: "One email every Friday: road works, meetings and what changed this week.",
  },
};
