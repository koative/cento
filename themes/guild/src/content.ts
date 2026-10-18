import ines from "./assets/ines.jpg";
import tomasz from "./assets/tomasz.jpg";
import malik from "./assets/malik.jpg";
import hanna from "./assets/hanna.jpg";
import rafael from "./assets/rafael.jpg";
import adaeze from "./assets/adaeze.jpg";
import mai from "./assets/mai.jpg";
import jonah from "./assets/jonah.jpg";
import dev from "./assets/dev.jpg";
import gustav from "./assets/gustav.jpg";
import clara from "./assets/clara.jpg";
import elena from "./assets/elena.jpg";
import sofia from "./assets/team-sofia.jpg";
import marcus from "./assets/team-marcus.jpg";
import owen from "./assets/team-owen.jpg";
import bench from "./assets/bench.jpg";
import table from "./assets/table.jpg";
import board from "./assets/board.jpg";
import pen from "./assets/pen.jpg";
import pyle from "./assets/pyle.jpg";

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Guild",
  tagline: "Independent talent, vouched for by the people who know the work.",
  email: "hello@guild.example",
  phone: "+1 555 0184",
  phoneHref: "tel:+15550184",
  address: "Rua das Flores 41, 1200-194 Lisbon",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
};

export const nav = [
  { to: "/talent", label: "Browse talent" },
  { to: "/crafts", label: "Crafts" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Hire",
    links: [
      { to: "/talent", label: "Browse talent" },
      { to: "/crafts", label: "All crafts" },
      { to: "/post", label: "Post a project" },
      { to: "/bench", label: "Your bench" },
    ],
  },
  {
    title: "Guild",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/pricing", label: "Pricing & fees" },
      { to: "/about", label: "About & charter" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signup", label: "Join the guild" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

export const newsletter = {
  title: "The Rate Letter",
  text: "Once a month: published day rates by craft, what clients are commissioning, and one long interview with a member.",
};

/* ------------------------------------------------------------ crafts */

export type Craft = {
  slug: string;
  name: string;
  short: string;
  description: string;
  /** Median published day rate across members, USD. */
  median: number;
  commissions: string[];
  skills: string[];
  brief: string;
};

export const crafts: Craft[] = [
  {
    slug: "brand-identity",
    name: "Brand & identity",
    short:
      "Names, marks, type systems and the guidelines that keep them whole.",
    description:
      "Identity work done by people who have shipped it before: naming, wordmarks and symbols, typography, colour, and guidelines a team can actually follow after the designer has gone.",
    median: 780,
    commissions: [
      "Full identity for a seed-stage company",
      "Wordmark refresh with type pairing",
      "Packaging system for a product line",
      "Guidelines rebuilt as a living site",
    ],
    skills: [
      "Logo design",
      "Naming",
      "Typography",
      "Brand guidelines",
      "Packaging",
    ],
    brief:
      "Most identity commissions run 4–8 weeks across three milestones: direction, refinement, delivery.",
  },
  {
    slug: "product-design",
    name: "Product design",
    short:
      "Research, flows and interface design for software people use daily.",
    description:
      "Designers who can sit with your users on Monday and hand engineering a component spec on Friday. Interviews, journey maps, interaction design, design systems and usability testing.",
    median: 720,
    commissions: [
      "Onboarding redesign with usability rounds",
      "Design system audit and rebuild",
      "Mobile app from zero to TestFlight",
      "Research sprint before a pivot",
    ],
    skills: [
      "UX research",
      "Interaction design",
      "Design systems",
      "Figma",
      "Prototyping",
    ],
    brief:
      "Product engagements usually start as a two-week discovery milestone before a longer build phase.",
  },
  {
    slug: "web-development",
    name: "Web development",
    short: "Front ends, back ends and the unglamorous plumbing between them.",
    description:
      "Engineers who write the code you will still be able to read next year. Marketing sites, web apps, APIs, migrations, performance work and accessibility fixes, front to back.",
    median: 840,
    commissions: [
      "Marketing site on a headless CMS",
      "Rails upgrade across two major versions",
      "Checkout performance overhaul",
      "Accessibility remediation to WCAG 2.2 AA",
    ],
    skills: [
      "React",
      "TypeScript",
      "Ruby on Rails",
      "Postgres",
      "Accessibility",
    ],
    brief:
      "Development work is often booked as a retainer of 2–4 days a week rather than a fixed scope.",
  },
  {
    slug: "mobile-development",
    name: "Mobile development",
    short: "Native and cross-platform apps, from first build to store review.",
    description:
      "iOS, Android and cross-platform engineers who know the review guidelines by heart. New apps, rescues of old ones, offline sync, payments and release pipelines.",
    median: 860,
    commissions: [
      "SwiftUI rewrite of a legacy app",
      "Offline-first field data app",
      "In-app subscriptions and paywall tests",
      "Flutter app for iOS and Android",
    ],
    skills: ["Swift", "SwiftUI", "Kotlin", "Flutter", "App Store review"],
    brief:
      "Expect a fixed-scope first release, then a lighter maintenance retainer.",
  },
  {
    slug: "illustration",
    name: "Illustration",
    short:
      "Editorial, product and brand illustration with a hand you can recognise.",
    description:
      "Illustrators with a point of view: editorial spots, campaign artwork, product illustration systems, icon families and murals. Licensing terms are agreed up front, in writing.",
    median: 560,
    commissions: [
      "Spot illustrations for a product launch",
      "Icon family of 120 glyphs",
      "Book cover and chapter openers",
      "Annual report illustration set",
    ],
    skills: [
      "Editorial illustration",
      "Icon design",
      "Procreate",
      "Print production",
      "Licensing",
    ],
    brief:
      "Illustration is priced per piece or per set; usage rights are listed in every contract.",
  },
  {
    slug: "motion-video",
    name: "Motion & video",
    short:
      "Explainers, product films, title sequences and interface animation.",
    description:
      "Animators and editors who storyboard before they keyframe. Product explainers, social cut-downs, Lottie interface motion, title sequences and documentary edits.",
    median: 690,
    commissions: [
      "90-second product explainer",
      "Launch film with three social cut-downs",
      "Lottie animation set for an app",
      "Conference title sequence",
    ],
    skills: [
      "After Effects",
      "Cinema 4D",
      "Lottie",
      "Storyboarding",
      "Premiere Pro",
    ],
    brief:
      "Motion projects are milestoned around storyboard, animatic and final render.",
  },
  {
    slug: "copy-content",
    name: "Copy & content",
    short:
      "Writing that sounds like you on a good day, in every place it appears.",
    description:
      "Writers and editors for product interfaces, websites, documentation, long-form articles and voice guidelines. Every writer in this craft has edited someone else’s work professionally.",
    median: 520,
    commissions: [
      "Website rewrite in a new voice",
      "UX copy audit across an app",
      "Voice and tone guidelines",
      "Six-part long-form article series",
    ],
    skills: [
      "UX writing",
      "Editing",
      "Content strategy",
      "Technical writing",
      "Voice guidelines",
    ],
    brief:
      "Content work is usually priced per deliverable with two rounds of revision included.",
  },
  {
    slug: "data-analytics",
    name: "Data & analytics",
    short: "Tracking plans, dashboards and analysis that ends in a decision.",
    description:
      "Analysts and data engineers who start with the question, not the chart. Event tracking plans, warehouse modelling, dashboards, experiment analysis and forecasting.",
    median: 810,
    commissions: [
      "Tracking plan and implementation audit",
      "dbt models for a new warehouse",
      "Pricing experiment analysis",
      "Board-ready metrics dashboard",
    ],
    skills: ["SQL", "dbt", "Python", "Experiment design", "Looker"],
    brief:
      "Analytics work often begins with a one-week audit milestone before anything is built.",
  },
];

/* ------------------------------------------------------------ talent */

export type Availability = "now" | "soon" | "booked";

export type Commission = {
  title: string;
  client: string;
  year: number;
  weeks: number;
  note: string;
};
export type Review = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

export type Talent = {
  id: string;
  name: string;
  photo: string;
  craft: string;
  title: string;
  location: string;
  /** UTC offset in hours for the member's working day. */
  tz: number;
  /** Local working hours, 24h clock, [start, end). */
  hours: [number, number];
  /** Published day rate, USD. */
  rate: number;
  availability: Availability;
  availabilityNote: string;
  /** Days a week they can take on. */
  days: number;
  rating: number;
  reviews: number;
  completed: number;
  since: number;
  register: number;
  vouchedBy: [string, string];
  skills: string[];
  languages: string[];
  summary: string;
  bio: string[];
  commissions: Commission[];
  testimonials: Review[];
};

export const talent: Talent[] = [
  {
    id: "ines-duarte",
    name: "Inês Duarte",
    photo: ines,
    craft: "brand-identity",
    title: "Identity designer for food and hospitality brands",
    location: "Lisbon, Portugal",
    tz: 1,
    hours: [9, 17],
    rate: 820,
    availability: "now",
    availabilityNote: "Taking projects from this week",
    days: 4,
    rating: 4.9,
    reviews: 41,
    completed: 58,
    since: 2019,
    register: 112,
    vouchedBy: ["gustav-brenner", "rafael-ortega"],
    skills: [
      "Logo design",
      "Packaging",
      "Typography",
      "Brand guidelines",
      "Art direction",
    ],
    languages: ["Portuguese", "English", "Spanish"],
    summary:
      "Twelve years of identities for restaurants, bakeries and natural-wine bars, from napkin sketch to the printed menu.",
    bio: [
      "I spent eight years at a Lisbon branding studio before going independent in 2019. Most of my clients are small food businesses that need an identity to work just as hard on a paper bag as on Instagram.",
      "I work in three milestones: a direction round with two routes, a refinement round on the chosen one, and a delivery round with files, guidelines and a print check at the supplier. I do not do unlimited revisions; I do listen carefully the first time.",
    ],
    commissions: [
      {
        title: "Identity and packaging for a sourdough bakery",
        client: "Forno Alto",
        year: 2026,
        weeks: 7,
        note: "Wordmark, bag system, price cards and a stamp for wholesale boxes.",
      },
      {
        title: "Rebrand for a natural-wine bar group",
        client: "Casa Pétala",
        year: 2025,
        weeks: 9,
        note: "Three venues, one system: signage, menus, labels for the house wine.",
      },
      {
        title: "Menu typography system",
        client: "Tasca do Largo",
        year: 2025,
        weeks: 3,
        note: "A menu template the kitchen can edit daily without breaking it.",
      },
      {
        title: "Coffee subscription box",
        client: "Grão Coffee",
        year: 2024,
        weeks: 5,
        note: "Box, inserts and a postcard series for twelve monthly origins.",
      },
    ],
    testimonials: [
      {
        quote:
          "She asked about our ovens before she asked about our colours. The identity feels like it was always ours.",
        name: "Rui Matos",
        role: "Owner, Forno Alto",
        project: "Bakery identity",
      },
      {
        quote:
          "Three venues with three personalities, and Inês found the thread that ties them without flattening any of them.",
        name: "Beatriz Lobo",
        role: "Operations, Casa Pétala",
        project: "Bar group rebrand",
      },
    ],
  },
  {
    id: "tomasz-wierzba",
    name: "Tomasz Wierzba",
    photo: tomasz,
    craft: "web-development",
    title: "Front-end engineer, React and design systems",
    location: "Kraków, Poland",
    tz: 1,
    hours: [8, 16],
    rate: 880,
    availability: "soon",
    availabilityNote: "Free from November 10",
    days: 3,
    rating: 5.0,
    reviews: 27,
    completed: 34,
    since: 2020,
    register: 187,
    vouchedBy: ["clara-moreau", "dev-raman"],
    skills: [
      "React",
      "TypeScript",
      "Design systems",
      "Storybook",
      "Accessibility",
    ],
    languages: ["Polish", "English", "German"],
    summary:
      "Builds the component libraries that design teams hand off to and engineering teams actually adopt.",
    bio: [
      "I have built design-system component libraries for four product companies, and the part I care about most is adoption: docs, codemods and the patient work of migrating real screens.",
      "I prefer retainers of two to three days a week over fixed scopes. That pace leaves room for code review, pairing with your team and the occasional unglamorous migration that makes everything after it faster.",
    ],
    commissions: [
      {
        title: "Component library rebuild",
        client: "Parcelwise",
        year: 2026,
        weeks: 16,
        note: "62 components, Storybook docs and a codemod that migrated 400 files.",
      },
      {
        title: "Accessibility remediation",
        client: "Kestrel Bank",
        year: 2025,
        weeks: 8,
        note: "Audit and fixes to WCAG 2.2 AA across onboarding and payments.",
      },
      {
        title: "Marketing site on a headless CMS",
        client: "Northvale Studio",
        year: 2025,
        weeks: 6,
        note: "Static build, editorial preview and a 98 Lighthouse score held in CI.",
      },
    ],
    testimonials: [
      {
        quote:
          "Tomasz left us with a library our own engineers kept extending after he finished. That is the whole point, and it rarely happens.",
        name: "Ada Brennan",
        role: "Head of Design, Parcelwise",
        project: "Component library",
      },
      {
        quote:
          "Clear weekly notes, no surprises, and the audit report read like it was written for humans.",
        name: "Pieter de Wit",
        role: "Engineering Manager, Kestrel Bank",
        project: "Accessibility remediation",
      },
    ],
  },
  {
    id: "malik-osei",
    name: "Malik Osei",
    photo: malik,
    craft: "product-design",
    title: "Product designer for fintech and marketplaces",
    location: "Accra, Ghana",
    tz: 0,
    hours: [9, 18],
    rate: 760,
    availability: "now",
    availabilityNote: "Two days a week open now",
    days: 2,
    rating: 4.9,
    reviews: 33,
    completed: 45,
    since: 2019,
    register: 98,
    vouchedBy: ["adaeze-nwosu", "clara-moreau"],
    skills: [
      "Interaction design",
      "UX research",
      "Figma",
      "Prototyping",
      "Payments flows",
    ],
    languages: ["English", "Twi", "French"],
    summary:
      "Designs money-moving products: onboarding, KYC, payouts and the error states nobody else wants to own.",
    bio: [
      "I design flows where a confusing screen costs someone real money. That means a lot of time on edge cases, failure states and the copy beside a button.",
      "I run research myself, prototype in Figma, and stay in the room for implementation reviews. I have worked with teams across West Africa, Europe and North America, usually overlapping with London mornings.",
    ],
    commissions: [
      {
        title: "KYC onboarding redesign",
        client: "Sendwell Wallet",
        year: 2026,
        weeks: 10,
        note: "Completion rate up from 61% to 79% across three usability rounds.",
      },
      {
        title: "Seller payouts dashboard",
        client: "Makerbay",
        year: 2025,
        weeks: 12,
        note: "Payout schedules, holds and disputes in one screen sellers understood first time.",
      },
      {
        title: "Mobile money top-up flow",
        client: "Tro Tro Pay",
        year: 2024,
        weeks: 6,
        note: "Designed for low-bandwidth networks and feature-phone fallbacks.",
      },
    ],
    testimonials: [
      {
        quote:
          "Malik designed the failure screens first. Our support tickets about top-ups dropped by half.",
        name: "Efua Mensah",
        role: "Product Lead, Tro Tro Pay",
        project: "Top-up flow",
      },
      {
        quote:
          "The calmest person in every review. He brings evidence, not opinions.",
        name: "Jon Albers",
        role: "CPO, Makerbay",
        project: "Payouts dashboard",
      },
    ],
  },
  {
    id: "hanna-lindqvist",
    name: "Hanna Lindqvist",
    photo: hanna,
    craft: "copy-content",
    title: "UX writer and editor for software products",
    location: "Gothenburg, Sweden",
    tz: 1,
    hours: [8, 16],
    rate: 560,
    availability: "now",
    availabilityNote: "Available for audits this month",
    days: 3,
    rating: 4.8,
    reviews: 38,
    completed: 61,
    since: 2020,
    register: 164,
    vouchedBy: ["ines-duarte", "malik-osei"],
    skills: [
      "UX writing",
      "Voice guidelines",
      "Editing",
      "Content audits",
      "Localisation prep",
    ],
    languages: ["Swedish", "English"],
    summary:
      "Rewrites interfaces so buttons say what they do and errors say how to fix them.",
    bio: [
      "I was an editor at a Swedish daily before I moved into product writing. The habits carried over: short sentences, active verbs, and reading everything aloud before it ships.",
      "My usual engagement is a content audit of one product area, a voice guide written from what I found, and a round of rewrites your team can review in context.",
    ],
    commissions: [
      {
        title: "UX copy audit across a scheduling app",
        client: "Slotwise",
        year: 2026,
        weeks: 4,
        note: "1,240 strings reviewed, 380 rewritten, a glossary of 46 terms.",
      },
      {
        title: "Voice and tone guidelines",
        client: "Fjord Insurance",
        year: 2025,
        weeks: 5,
        note: "Guidelines with before/after pairs for claims, renewals and complaints.",
      },
      {
        title: "Help centre restructure",
        client: "Linnea Health",
        year: 2024,
        weeks: 7,
        note: "Merged 210 articles into 96 and wrote the search synonyms.",
      },
    ],
    testimonials: [
      {
        quote:
          "Our error messages used to apologise. Now they help. Hanna changed how our engineers write strings.",
        name: "Oskar Berg",
        role: "Engineering Lead, Slotwise",
        project: "Copy audit",
      },
      {
        quote:
          "The voice guide is the one document everybody on the team actually opens.",
        name: "Maja Holm",
        role: "Brand Manager, Fjord Insurance",
        project: "Voice guidelines",
      },
    ],
  },
  {
    id: "rafael-ortega",
    name: "Rafael Ortega",
    photo: rafael,
    craft: "illustration",
    title: "Editorial illustrator, ink and flat colour",
    location: "Mexico City, Mexico",
    tz: -6,
    hours: [10, 18],
    rate: 540,
    availability: "soon",
    availabilityNote: "Booking from December 1",
    days: 3,
    rating: 4.9,
    reviews: 52,
    completed: 88,
    since: 2018,
    register: 41,
    vouchedBy: ["mai-takeda-brook", "gustav-brenner"],
    skills: [
      "Editorial illustration",
      "Book covers",
      "Icon families",
      "Print production",
      "Licensing",
    ],
    languages: ["Spanish", "English"],
    summary:
      "Brush-ink drawings with flat colour for magazines, book covers and product launches.",
    bio: [
      "I draw everything with a brush first, scan it, and colour it flat. Clients come to me for that hand, so I keep it consistent across a set rather than chasing a new style each year.",
      "Licensing is in every quote: where the work will appear, for how long, and what it costs to extend. Nobody likes that conversation after the fact.",
    ],
    commissions: [
      {
        title: "Book cover and twelve chapter openers",
        client: "Atlas Minor Press",
        year: 2026,
        weeks: 6,
        note: "Hardback cover with a two-colour foil plate and matching openers.",
      },
      {
        title: "Spot illustrations for a product launch",
        client: "Orchard Notes",
        year: 2025,
        weeks: 4,
        note: "Eighteen spots used across site, app empty states and the launch email.",
      },
      {
        title: "Monthly editorial column",
        client: "The Long Table",
        year: 2024,
        weeks: 52,
        note: "One illustration a month for a food-politics column, two years running.",
      },
    ],
    testimonials: [
      {
        quote:
          "Rafael’s sketches arrived a day early and the final art was better than the sketches, which is rarer than you would think.",
        name: "Lena Ross",
        role: "Art Director, Atlas Minor Press",
        project: "Book cover",
      },
      {
        quote:
          "Licensing was clear from the quote onwards. Our lawyers had nothing to do.",
        name: "Theo Grant",
        role: "Founder, Orchard Notes",
        project: "Launch spots",
      },
    ],
  },
  {
    id: "adaeze-nwosu",
    name: "Adaeze Nwosu",
    photo: adaeze,
    craft: "data-analytics",
    title: "Analytics engineer, dbt and experiment design",
    location: "Lagos, Nigeria",
    tz: 1,
    hours: [9, 17],
    rate: 840,
    availability: "now",
    availabilityNote: "Open for a new retainer",
    days: 3,
    rating: 5.0,
    reviews: 19,
    completed: 23,
    since: 2021,
    register: 233,
    vouchedBy: ["malik-osei", "dev-raman"],
    skills: ["SQL", "dbt", "Python", "Experiment design", "Tracking plans"],
    languages: ["English", "Igbo", "Yoruba"],
    summary:
      "Turns a messy warehouse into models people trust, then helps them ask better questions of it.",
    bio: [
      "I start every engagement with a one-week audit: what is tracked, what is modelled, and which numbers the leadership team quietly distrusts. Then we fix those first.",
      "I have set up dbt projects for six companies and analysed experiments for many more. I write down every metric definition, because the argument about what ‘active’ means should happen once.",
    ],
    commissions: [
      {
        title: "dbt project for a new warehouse",
        client: "Basket & Barrow",
        year: 2026,
        weeks: 10,
        note: "84 models, tests on every primary key, docs site the finance team uses.",
      },
      {
        title: "Pricing experiment analysis",
        client: "Learnloop",
        year: 2025,
        weeks: 3,
        note: "Found the novelty effect hiding a 4% revenue drop; the test was re-run.",
      },
      {
        title: "Tracking plan and audit",
        client: "Ridgeway Outdoor",
        year: 2025,
        weeks: 4,
        note: "Cut 212 events to 64 with a naming convention engineers kept.",
      },
    ],
    testimonials: [
      {
        quote:
          "The first metrics review where nobody argued about the numbers. That is Adaeze’s doing.",
        name: "Sam Okafor",
        role: "COO, Basket & Barrow",
        project: "dbt project",
      },
      {
        quote:
          "She told us our winning test was not a win. Saved us a very expensive quarter.",
        name: "Ingrid Vos",
        role: "Growth Lead, Learnloop",
        project: "Experiment analysis",
      },
    ],
  },
  {
    id: "mai-takeda-brook",
    name: "Mai Takeda-Brook",
    photo: mai,
    craft: "motion-video",
    title: "Motion designer for product films and interface animation",
    location: "Vancouver, Canada",
    tz: -7,
    hours: [9, 17],
    rate: 720,
    availability: "now",
    availabilityNote: "One slot open in November",
    days: 4,
    rating: 4.9,
    reviews: 29,
    completed: 40,
    since: 2020,
    register: 176,
    vouchedBy: ["rafael-ortega", "jonah-feld"],
    skills: [
      "After Effects",
      "Lottie",
      "Storyboarding",
      "Cinema 4D",
      "Sound sync",
    ],
    languages: ["English", "Japanese"],
    summary:
      "Explainers and launch films that show the product working instead of floating around it.",
    bio: [
      "Most product films I see are abstract shapes and upbeat music. I prefer to show the real interface doing the real job, edited tightly and timed to the voiceover.",
      "Every project goes storyboard, animatic, final render, with a sign-off at each stage. I also deliver Lottie files for in-app motion so the film and the product move the same way.",
    ],
    commissions: [
      {
        title: "Launch film and social cut-downs",
        client: "Tessellate",
        year: 2026,
        weeks: 5,
        note: "A 75-second film plus 15s, 9:16 and square cut-downs.",
      },
      {
        title: "Lottie animation set",
        client: "Plantcare",
        year: 2025,
        weeks: 4,
        note: "Twenty-two interface animations under 40 KB each.",
      },
      {
        title: "Conference title sequence",
        client: "Northern Type Days",
        year: 2024,
        weeks: 3,
        note: "Kinetic type opener projected on a 14-metre screen.",
      },
    ],
    testimonials: [
      {
        quote:
          "Mai’s animatic was so clear that the final render had zero surprises. We shipped a day early.",
        name: "Paul Ferreira",
        role: "Marketing Director, Tessellate",
        project: "Launch film",
      },
      {
        quote:
          "The animations made the app feel twice as considered for a fraction of the weight.",
        name: "Nora Kim",
        role: "Design Lead, Plantcare",
        project: "Lottie set",
      },
    ],
  },
  {
    id: "jonah-feld",
    name: "Jonah Feld",
    photo: jonah,
    craft: "mobile-development",
    title: "iOS engineer, SwiftUI and offline sync",
    location: "Brooklyn, United States",
    tz: -4,
    hours: [10, 18],
    rate: 920,
    availability: "booked",
    availabilityNote: "Booked until January",
    days: 0,
    rating: 4.9,
    reviews: 24,
    completed: 31,
    since: 2020,
    register: 151,
    vouchedBy: ["elena-petrov", "tomasz-wierzba"],
    skills: [
      "Swift",
      "SwiftUI",
      "Core Data",
      "Offline sync",
      "App Store review",
    ],
    languages: ["English", "Hebrew"],
    summary:
      "Ships iOS apps that keep working on the subway, in a basement, or at a festival with no signal.",
    bio: [
      "Offline-first is my speciality: apps for field teams, events and anywhere else the network cannot be trusted. Sync conflicts are a design problem as much as an engineering one, so I like working closely with your designer.",
      "I take one client at a time and usually book a quarter ahead. If I am full, I will happily recommend another member I have vouched for.",
    ],
    commissions: [
      {
        title: "Offline-first field inspection app",
        client: "Cobalt Utilities",
        year: 2026,
        weeks: 14,
        note: "Works for a full shift offline; syncs 3,000 records in under a minute.",
      },
      {
        title: "SwiftUI rewrite",
        client: "Gather Events",
        year: 2025,
        weeks: 12,
        note: "UIKit app migrated screen by screen without a feature freeze.",
      },
      {
        title: "Subscriptions and paywall tests",
        client: "Quietly",
        year: 2024,
        weeks: 5,
        note: "StoreKit 2 migration and three paywall variants behind flags.",
      },
    ],
    testimonials: [
      {
        quote:
          "Our inspectors stopped carrying paper backups after the second week. That is the review.",
        name: "Marta Ruiz",
        role: "Field Operations, Cobalt Utilities",
        project: "Inspection app",
      },
      {
        quote:
          "He rewrote the app while we kept shipping features. I still do not fully understand how.",
        name: "Cole Avery",
        role: "CTO, Gather Events",
        project: "SwiftUI rewrite",
      },
    ],
  },
  {
    id: "dev-raman",
    name: "Dev Raman",
    photo: dev,
    craft: "web-development",
    title: "Back-end engineer, Rails and Postgres",
    location: "Toronto, Canada",
    tz: -4,
    hours: [9, 17],
    rate: 900,
    availability: "now",
    availabilityNote: "Two days a week from now",
    days: 2,
    rating: 4.8,
    reviews: 36,
    completed: 47,
    since: 2018,
    register: 37,
    vouchedBy: ["tomasz-wierzba", "adaeze-nwosu"],
    skills: [
      "Ruby on Rails",
      "Postgres",
      "Background jobs",
      "Upgrades",
      "Performance",
    ],
    languages: ["English", "Tamil", "Hindi"],
    summary:
      "Upgrades old Rails apps, speeds up slow queries, and leaves the test suite greener than he found it.",
    bio: [
      "I have been writing Rails since version 2. Much of my work now is upgrades and performance: taking a decade-old app to the current version without a rewrite, and finding the three queries responsible for most of the slowness.",
      "I write a short plan before touching anything, keep pull requests small, and pair with your engineers so the knowledge stays when I leave.",
    ],
    commissions: [
      {
        title: "Rails 6.1 to 8.0 upgrade",
        client: "Ledgerline",
        year: 2026,
        weeks: 11,
        note: "Two major versions, zero downtime, 1,900 deprecation warnings cleared.",
      },
      {
        title: "Checkout performance overhaul",
        client: "Brightcart",
        year: 2025,
        weeks: 5,
        note: "p95 checkout time from 2.8s to 640ms by fixing four queries and a cache.",
      },
      {
        title: "Background job migration",
        client: "Pantryful",
        year: 2024,
        weeks: 6,
        note: "Moved 70 job classes to Solid Queue with dashboards and retries.",
      },
    ],
    testimonials: [
      {
        quote:
          "Dev’s upgrade plan fit on one page and he stuck to it. Our team learned more in eleven weeks than in a year.",
        name: "Rhea Kapoor",
        role: "VP Engineering, Ledgerline",
        project: "Rails upgrade",
      },
      {
        quote:
          "We thought we needed a rewrite. We needed four indexes and someone patient.",
        name: "Luis Gómez",
        role: "Founder, Brightcart",
        project: "Checkout performance",
      },
    ],
  },
  {
    id: "gustav-brenner",
    name: "Gustav Brenner",
    photo: gustav,
    craft: "brand-identity",
    title: "Type designer and wordmark specialist",
    location: "Berlin, Germany",
    tz: 1,
    hours: [10, 18],
    rate: 950,
    availability: "soon",
    availabilityNote: "Free from November 17",
    days: 3,
    rating: 5.0,
    reviews: 22,
    completed: 30,
    since: 2018,
    register: 12,
    vouchedBy: ["dev-raman", "malik-osei"],
    skills: [
      "Wordmarks",
      "Custom type",
      "Type pairing",
      "Variable fonts",
      "Lettering",
    ],
    languages: ["German", "English"],
    summary:
      "Drawn-from-scratch wordmarks and custom typefaces, delivered as properly engineered font files.",
    bio: [
      "I draw letters. Usually a wordmark, sometimes a full custom typeface with a variable weight axis, hinting and a licence your whole company can use without counting seats.",
      "One of the founding members of Guild. I review identity applications and have vouched for more members than anyone, which I take as a responsibility rather than a statistic.",
    ],
    commissions: [
      {
        title: "Custom variable typeface",
        client: "Halden Transit",
        year: 2026,
        weeks: 14,
        note: "Wayfinding face with a weight axis tuned for backlit signs.",
      },
      {
        title: "Wordmark redraw",
        client: "Ostwind Coffee",
        year: 2025,
        weeks: 3,
        note: "Redrew a hand-lettered mark so it survives embroidery and favicon sizes.",
      },
      {
        title: "Type pairing and system",
        client: "Paperplane Books",
        year: 2024,
        weeks: 4,
        note: "Text and display faces selected and licensed for a new imprint.",
      },
    ],
    testimonials: [
      {
        quote:
          "The typeface reads at forty metres in the rain. Gustav tested it at the actual station at night.",
        name: "Johanna Kerr",
        role: "Design Manager, Halden Transit",
        project: "Custom typeface",
      },
      {
        quote:
          "Our mark finally looks right on a coffee cup and a phone. It took him three weeks and it took us ten years to admit we needed it.",
        name: "Felix Stoll",
        role: "Co-founder, Ostwind Coffee",
        project: "Wordmark redraw",
      },
    ],
  },
  {
    id: "clara-moreau",
    name: "Clara Moreau",
    photo: clara,
    craft: "product-design",
    title: "UX researcher and design-systems lead",
    location: "Montréal, Canada",
    tz: -4,
    hours: [9, 17],
    rate: 780,
    availability: "now",
    availabilityNote: "Discovery sprints open now",
    days: 4,
    rating: 4.9,
    reviews: 31,
    completed: 39,
    since: 2019,
    register: 103,
    vouchedBy: ["malik-osei", "hanna-lindqvist"],
    skills: [
      "UX research",
      "Design systems",
      "Usability testing",
      "Service design",
      "Workshop facilitation",
    ],
    languages: ["French", "English"],
    summary:
      "Two-week discovery sprints that end with a decision, and design systems that survive their first year.",
    bio: [
      "I run discovery sprints for teams who are about to spend a lot of money on a guess. Two weeks of interviews, a synthesis wall and a readout that ends with a recommendation, not a menu of options.",
      "I also lead design-system work, mostly the governance side: contribution models, naming, and the review rituals that stop a system from fragmenting.",
    ],
    commissions: [
      {
        title: "Discovery sprint before a pivot",
        client: "Hearthstone Care",
        year: 2026,
        weeks: 2,
        note: "Eighteen interviews; the team dropped one product line and doubled another.",
      },
      {
        title: "Design system governance",
        client: "Tidewater Group",
        year: 2025,
        weeks: 10,
        note: "Contribution model and review ritual for five product teams.",
      },
      {
        title: "Usability rounds for onboarding",
        client: "Mapleleaf Credit",
        year: 2024,
        weeks: 6,
        note: "Three rounds, 24 participants, onboarding time halved.",
      },
    ],
    testimonials: [
      {
        quote: "Clara’s readout ended a six-month argument in one afternoon.",
        name: "Grace Liu",
        role: "CEO, Hearthstone Care",
        project: "Discovery sprint",
      },
      {
        quote:
          "Five teams, one system, and for the first time people ask before they fork a component.",
        name: "Martin Roy",
        role: "Design Director, Tidewater Group",
        project: "Governance",
      },
    ],
  },
  {
    id: "elena-petrov",
    name: "Elena Petrov",
    photo: elena,
    craft: "mobile-development",
    title: "Flutter and Kotlin engineer for cross-platform apps",
    location: "Sofia, Bulgaria",
    tz: 2,
    hours: [9, 17],
    rate: 780,
    availability: "now",
    availabilityNote: "Taking a new build now",
    days: 5,
    rating: 4.8,
    reviews: 26,
    completed: 35,
    since: 2021,
    register: 241,
    vouchedBy: ["jonah-feld", "tomasz-wierzba"],
    skills: ["Flutter", "Kotlin", "Firebase", "CI/CD", "Play Store release"],
    languages: ["Bulgarian", "English", "Russian"],
    summary:
      "One codebase, two stores, and a release pipeline that ships on Thursdays without drama.",
    bio: [
      "I build Flutter apps for teams who need iOS and Android without two separate teams, and drop into Kotlin when a platform feature needs native code.",
      "Release engineering is the part clients notice last and value most: automated builds, staged rollouts, crash reporting and a changelog the store reviewers like.",
    ],
    commissions: [
      {
        title: "Flutter app for iOS and Android",
        client: "Rideshare Collective",
        year: 2026,
        weeks: 13,
        note: "Booking, payments and live tracking; 4.8 stars in both stores.",
      },
      {
        title: "Release pipeline",
        client: "Moodboard Health",
        year: 2025,
        weeks: 4,
        note: "Weekly staged rollouts with automatic halt on crash spikes.",
      },
      {
        title: "Native Kotlin widgets",
        client: "Brightday Weather",
        year: 2024,
        weeks: 3,
        note: "Home-screen widgets in Jetpack Glance alongside the Flutter app.",
      },
    ],
    testimonials: [
      {
        quote:
          "We shipped to both stores on the same day, which our last agency said was impossible.",
        name: "Daniel Ilie",
        role: "Founder, Rideshare Collective",
        project: "Flutter app",
      },
      {
        quote:
          "Elena automated the release so well that our Thursday ship became boring. Boring is perfect.",
        name: "Petra Novak",
        role: "Head of Product, Moodboard Health",
        project: "Release pipeline",
      },
    ],
  },
];

export const findTalent = (id: string) => talent.find((t) => t.id === id);
export const findCraft = (slug: string) => crafts.find((c) => c.slug === slug);

/* ------------------------------------------------------------ home */

export const home = {
  headline: "Hire independents who sign their work.",
  lede: "Guild is a marketplace of 1,840 freelance designers, engineers, writers and analysts. Every member was vouched for by two others, every day rate is published, and nobody bids against anybody.",
  searchHint: "Try “identity”, “Rails”, “Flutter” or a name",
  popular: ["Brand identity", "React", "UX research", "Illustration"],
  register: {
    title: "On the register this week",
    text: "Members who opened their calendars in the last seven days. Rates are what you pay per day; nobody adjusts them for you.",
  },
  method: {
    title: "No pitches, no bidding wars",
    text: "Marketplaces that make freelancers bid teach them to underquote and over-promise. Guild publishes rates instead, so the conversation starts with the work.",
    steps: [
      {
        title: "Describe the work",
        text: "Post a project in plain words: what you need, roughly when, and the budget you have. Posting is free.",
      },
      {
        title: "Invite a shortlist",
        text: "Browse members, add up to six to your bench, and send them the brief. Most reply within a working day.",
      },
      {
        title: "Agree milestones",
        text: "Split the work into two to five milestones. You fund the first; the member starts.",
      },
      {
        title: "Approve and release",
        text: "Approve each milestone when it is delivered. The money reaches the member within three business days.",
      },
    ],
  },
  escrow: {
    title: "Money held in the open",
    text: "Each milestone is funded before work starts and released when you approve it. If you disagree on a delivery, a member of the Guild review panel from the same craft reads both sides and decides within five working days.",
    example: {
      project: "Identity for a sourdough bakery",
      member: "Inês Duarte",
      milestones: [
        { name: "Direction: two routes", amount: 1640, status: "Released" },
        {
          name: "Refinement of chosen route",
          amount: 2460,
          status: "Released",
        },
        {
          name: "Files, guidelines, print check",
          amount: 1640,
          status: "Funded",
        },
      ],
    },
  },
  benchTeaser: {
    title: "Build a crew across time zones",
    text: "Add members to your bench and see, hour by hour, when your crew is awake together. Set your own working day and the overlap redraws, along with the weekly cost at their published rates.",
  },
  commissionsTitle: "Recently closed on Guild",
  commissions: [
    {
      project: "Offline field inspection app",
      craft: "Mobile development",
      weeks: 14,
      value: 51520,
    },
    {
      project: "Wayfinding typeface for a transit authority",
      craft: "Brand & identity",
      weeks: 14,
      value: 39900,
    },
    {
      project: "dbt models for a grocery warehouse",
      craft: "Data & analytics",
      weeks: 10,
      value: 25200,
    },
    {
      project: "KYC onboarding redesign",
      craft: "Product design",
      weeks: 10,
      value: 22800,
    },
    {
      project: "Launch film and three cut-downs",
      craft: "Motion & video",
      weeks: 5,
      value: 10800,
    },
    {
      project: "UX copy audit for a scheduling app",
      craft: "Copy & content",
      weeks: 4,
      value: 6720,
    },
  ],
  quote: {
    text: "We hired four members in a year and never once had to haggle. The rate was on the profile, the work was on the profile, and the people who vouched for them were on the profile too.",
    name: "Grace Liu",
    role: "CEO, Hearthstone Care",
  },
  members: {
    title: "For freelancers: keep the work, keep the rate",
    text: "Guild takes 8% of what you invoice, drops to 5% after your first $20,000 with a client, and pays out three business days after approval. You set your day rate. We never discount it.",
    points: [
      "Two vouches from existing members and a portfolio review to join",
      "Your published rate, never undercut by a bid",
      "Disputes read by a member of your own craft",
      "Paid in USD, EUR or GBP to 46 countries",
    ],
    image: bench,
    imageAlt:
      "A freelancer’s desk from above: laptop, notebook, two pens, a coffee and a magnifying glass on dark wood.",
  },
  close: {
    title: "Tell us what you are making.",
    text: "Post a project in about five minutes. It costs nothing to post and nothing to invite a shortlist.",
  },
};

/* ------------------------------------------------------------ how it works */

export const howItWorks = {
  title: "How Guild works",
  lede: "Two sides of the same table. Clients bring the work, members bring the craft, and Guild keeps the money and the record honest in between.",
  image: board,
  imageAlt:
    "A hand pinning a card to a project planning wall covered in printed screens and arrows.",
  tracks: {
    hire: {
      label: "I’m hiring",
      steps: [
        {
          title: "Post a project",
          text: "Write the brief in your own words. Say what you need, when, and the budget range. You can attach references and invite people you already found.",
        },
        {
          title: "Shortlist on your bench",
          text: "Add up to six members. Your bench shows their rates, availability and when your working days overlap.",
        },
        {
          title: "Talk, then agree milestones",
          text: "Members reply with questions or a proposal. When you choose someone, you agree two to five milestones with a date and a price for each.",
        },
        {
          title: "Fund one milestone at a time",
          text: "Only the current milestone is held. Card, bank transfer or invoice on Studio and Workshop plans.",
        },
        {
          title: "Approve and release",
          text: "Approve the delivery and the payment is released. Leave a review that stays on the member’s register entry for good.",
        },
      ],
    },
    work: {
      label: "I’m freelancing",
      steps: [
        {
          title: "Get two vouches",
          text: "Ask two existing members who know your work to vouch for you. No members yet? Our craft reviewers can stand in for one.",
        },
        {
          title: "Portfolio review",
          text: "A reviewer from your craft looks at three pieces of work and talks to you for half an hour. About 1 in 3 applicants are admitted.",
        },
        {
          title: "Publish your rate",
          text: "Set a day rate and the days a week you can take. Change them whenever you like; the change applies to new projects.",
        },
        {
          title: "Reply to invitations",
          text: "Clients invite you from their bench. Reply with questions or a proposal. Decline politely in one click when it is not right.",
        },
        {
          title: "Deliver and get paid",
          text: "Each approved milestone pays out within three business days, minus the Guild fee. No minimum balance, no withdrawal fees.",
        },
      ],
    },
  },
  vouching: {
    title: "Why vouching works",
    text: "A vouch is public and permanent. When a member vouches for someone, both names appear on the register entry, and a pattern of poor reviews reflects on both. Members vouch carefully, and the register stays good.",
  },
  protections: [
    {
      title: "Milestone escrow",
      text: "Funds are held by our payments partner, not by Guild, and released only on approval or by panel decision.",
    },
    {
      title: "Craft review panel",
      text: "Disputes are read by a member from the same craft who has never worked with either party. Decision within five working days.",
    },
    {
      title: "Kill fee by default",
      text: "If a client cancels mid-milestone, the member keeps 50% of that milestone. It is written into every contract.",
    },
    {
      title: "Work you own",
      text: "Intellectual property transfers to the client when each milestone is paid, unless the contract says otherwise.",
    },
  ],
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Is it really free to post a project?",
    a: "Yes. Posting, inviting members and messaging are free. You pay the client fee only on milestones you fund: 5% on the Open plan, less on Studio and Workshop.",
  },
  {
    q: "Can I negotiate a member’s day rate?",
    a: "You can discuss scope, days and milestones as much as you like. The day rate itself is published and members keep it consistent for everyone, which is the point.",
  },
  {
    q: "What if I am unhappy with a delivery?",
    a: "Ask for the revisions agreed in the milestone first. If you still disagree, open a review; a panel member from the same craft reads the brief, the delivery and both accounts, and decides within five working days.",
  },
  {
    q: "Do members work on site?",
    a: "Most work remotely. About a fifth list cities where they are happy to come in for workshops; travel is quoted separately in the milestone.",
  },
  {
    q: "How do members get paid?",
    a: "Approved milestones pay out within three business days to a bank account in 46 countries, in USD, EUR or GBP. There are no withdrawal fees.",
  },
  {
    q: "Can I hire someone full-time after a project?",
    a: "Yes, after six months of working together on Guild, with no conversion fee. Before six months, the conversion fee is one month of their day rate.",
  },
];

/* ------------------------------------------------------------ pricing */

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  /** Per month when billed yearly. */
  yearly: number;
  fee: number;
  text: string;
  features: string[];
  cta: string;
};

export const pricing = {
  title: "Fees you can say out loud",
  lede: "One fee for clients, one for members, both printed here. No bidding credits, no connects, no featured-listing upsells.",
  clientPlans: [
    {
      id: "open",
      name: "Open",
      monthly: 0,
      yearly: 0,
      fee: 5,
      text: "For founders and small teams hiring a few times a year.",
      features: [
        "Unlimited projects and invitations",
        "Bench with time-zone overlap",
        "Milestone escrow by card or bank transfer",
        "Review panel on every contract",
      ],
      cta: "Post a project",
    },
    {
      id: "studio",
      name: "Studio",
      monthly: 59,
      yearly: 49,
      fee: 3,
      text: "For teams that keep two or three members on retainer.",
      features: [
        "Everything in Open",
        "Five seats with shared benches",
        "Monthly consolidated invoice",
        "Retainer contracts with rollover days",
        "Priority replies from the Guild desk",
      ],
      cta: "Start Studio",
    },
    {
      id: "workshop",
      name: "Workshop",
      monthly: 249,
      yearly: 209,
      fee: 2,
      text: "For companies running a standing bench of independents.",
      features: [
        "Everything in Studio",
        "Unlimited seats and SSO",
        "Invoice terms up to net 45",
        "Your own contract templates",
        "Named account partner",
      ],
      cta: "Talk to us",
    },
  ] satisfies Plan[],
  memberFees: {
    title: "For members",
    text: "Membership is free. Guild takes a share of each approved milestone, and the share drops once you have built a relationship with a client.",
    tiers: [
      { label: "First $20,000 with a client", fee: 8 },
      { label: "After $20,000 with that client", fee: 5 },
    ],
  },
  calculator: {
    title: "What everyone actually pays",
    text: "Move the slider to a project value. The figures update for each client plan, and the member line shows what lands in their account.",
  },
};

/* ------------------------------------------------------------ post a project */

export const post = {
  title: "Post a project",
  lede: "Five minutes, plain words. Members read every brief themselves, so write it the way you would explain it over coffee.",
  aside: {
    title: "What happens next",
    points: [
      "Your brief goes to the members you invite, and to nobody else unless you make it public.",
      "Most members reply within one working day with questions or a proposal.",
      "You fund nothing until you agree milestones with someone.",
    ],
  },
  budgets: [
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $40,000",
    "Over $40,000",
    "Day-rate retainer",
  ],
  timelines: ["Within 2 weeks", "Within a month", "In 1–3 months", "Flexible"],
  image: pen,
  imageAlt: "A fountain pen writing a line of cursive on ruled paper.",
};

/* ------------------------------------------------------------ about */

export const about = {
  title: "A guild, in the old sense",
  lede: "Medieval guilds set standards, vouched for their members and kept prices fair. We borrowed the parts that worked and left the rest in the fourteenth century.",
  image: pyle,
  imageAlt:
    "A tall wooden illustrator’s drawing desk with a slanted top, displayed in a gallery.",
  imageCaption:
    "An illustrator’s drawing desk from around 1900. The tools change; the craft is the same.",
  story: [
    "Guild started in 2019 in a shared studio in Lisbon. Three freelancers, a type designer, a product designer and a back-end engineer, were tired of marketplaces that made them bid against strangers for work they were obviously right for.",
    "So they wrote a short charter, invited forty people whose work they knew, and asked each of them to vouch for two more. The register passed a thousand members in 2023. It is still invitation by vouch, still reviewed by craft, and still run by people who freelance.",
  ],
  charter: {
    title: "The charter",
    articles: [
      {
        title: "Rates are published",
        text: "Every member shows their day rate. Clients see the price before the conversation, and nobody is asked to undercut a colleague.",
      },
      {
        title: "Members vouch for members",
        text: "Two existing members put their names to every new one. Vouches are public and permanent.",
      },
      {
        title: "Work is paid on time",
        text: "Approved milestones pay out within three business days. If a payment is late because of us, we add 2% to it.",
      },
      {
        title: "Disputes are read by peers",
        text: "A member from the same craft decides, not a support script.",
      },
      {
        title: "Fees never rise mid-contract",
        text: "Any change to fees applies only to contracts signed after it is announced, with sixty days’ notice.",
      },
    ],
  },
  team: {
    title: "The people at the desk",
    text: "Guild has a staff of fourteen, split between Lisbon and Toronto. Six of us still take freelance work on the side, through Guild, at our published rates.",
    people: [
      {
        name: "Sofia Marques",
        role: "Co-founder, product",
        photo: sofia,
        note: "Product designer; still takes one client a year.",
      },
      {
        name: "Gustav Brenner",
        role: "Co-founder, craft reviews",
        photo: gustav,
        note: "Type designer; register No. 12.",
      },
      {
        name: "Marcus Hale",
        role: "Co-founder, engineering",
        photo: marcus,
        note: "Back-end engineer; built the escrow ledger.",
      },
      {
        name: "Owen Fitzgerald",
        role: "Head of the Guild desk",
        photo: owen,
        note: "Answers the phone; reads every dispute.",
      },
    ],
  },
  offices: [
    {
      city: "Lisbon",
      address: "Rua das Flores 41, 1200-194 Lisbon",
      hours: "Mon–Fri, 9:00–18:00 WET",
    },
    {
      city: "Toronto",
      address: "180 Queen Street West, Suite 4, Toronto ON",
      hours: "Mon–Fri, 9:00–18:00 ET",
    },
  ],
  community: {
    image: table,
    imageAlt:
      "Three people laughing around a wooden table with laptops and notebooks.",
    title: "Member evenings",
    text: "On the first Thursday of each month, members meet in Lisbon, Toronto and online for crits, rate talk and dinner. Clients are welcome at the open sessions in March and October.",
  },
};

/* ------------------------------------------------------------ sign up */

export const signup = {
  title: "Join Guild",
  lede: "Clients can start hiring today. Freelancers start an application that ends with a portfolio review.",
  hire: [
    "Post projects and invite members for free",
    "Build benches and compare time zones",
    "Pay by milestone, held in escrow",
  ],
  work: [
    "Two vouches and a portfolio review",
    "Publish your own day rate",
    "Paid within three business days of approval",
  ],
};

/* ------------------------------------------------------------ time zones */

export const zones = [
  { label: "San Francisco", offset: -7 },
  { label: "Mexico City", offset: -6 },
  { label: "New York", offset: -4 },
  { label: "London", offset: 1 },
  { label: "Lisbon", offset: 1 },
  { label: "Berlin", offset: 2 },
  { label: "Lagos", offset: 1 },
  { label: "Nairobi", offset: 3 },
  { label: "Dubai", offset: 4 },
  { label: "Singapore", offset: 8 },
  { label: "Sydney", offset: 11 },
];
