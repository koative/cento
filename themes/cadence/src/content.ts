import hollisRye from "./assets/hollis-rye.jpg";
import northfold from "./assets/northfold.jpg";
import tamber from "./assets/tamber.jpg";
import greenway from "./assets/greenway.jpg";
import commonGround from "./assets/common-ground.jpg";
import oakline from "./assets/oakline.jpg";
import spokeChain from "./assets/spoke-chain.jpg";
import interviewPhoto from "./assets/interview.jpg";

/* ───────────────────────── Brand & navigation ───────────────────────── */

export const brand = {
  name: "Cadence",
  tagline: "Hire good people with a steady beat.",
  email: "hello@cadence.example",
  phone: "+1 555 0142 880",
  address: [
    "Cadence Software, Inc.",
    "210 Mercer Lane, Suite 4",
    "Portland, OR 97209",
  ],
  gallery: "https://koative.github.io/cento/",
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/product", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/customers", label: "Customers" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "Company" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "Tour the product" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
      { to: "/app", label: "Live demo workspace" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/customers", label: "Customer stories" },
      { to: "/about", label: "About Cadence" },
      { to: "/demo", label: "Book a walkthrough" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ───────────────────────── Hiring vocabulary ───────────────────────── */

export type Stage =
  "applied" | "screen" | "interview" | "final" | "offer" | "hired";

export const stages: { id: Stage; label: string; promise: string }[] = [
  {
    id: "applied",
    label: "Applied",
    promise:
      "Every applicant gets a human acknowledgement within one working day.",
  },
  {
    id: "screen",
    label: "Screen",
    promise:
      "A 30-minute intro call with the recruiter, booked from a shared calendar link.",
  },
  {
    id: "interview",
    label: "Interview",
    promise:
      "Structured conversations from one interview kit, scored before anyone compares notes.",
  },
  {
    id: "final",
    label: "Final",
    promise:
      "The hiring manager decides with every scorecard in, not with whoever spoke last.",
  },
  {
    id: "offer",
    label: "Offer",
    promise:
      "Offer drafted from the approved band, sent the same week as the decision.",
  },
  {
    id: "hired",
    label: "Hired",
    promise:
      "Start date confirmed, the rest of the pipeline thanked personally and closed.",
  },
];

export type Competency = {
  id: string;
  label: string;
  question: string;
  probe: string;
  rubric: [string, string, string, string];
};

export const competencies: Competency[] = [
  {
    id: "craft",
    label: "Craft",
    question:
      "Walk us through a piece of work you are proud of. What did you decide, and what did you leave out?",
    probe: "Which decision would you make differently today?",
    rubric: [
      "Describes the result, not the decisions behind it.",
      "Explains choices but leans on others' judgement.",
      "Clear trade-offs, owns the quality bar.",
      "Raises the bar: names alternatives and why they lost.",
    ],
  },
  {
    id: "problem",
    label: "Problem solving",
    question:
      "Here is a messy problem from our real backlog. How would you get from here to a first useful step?",
    probe: "What would you need to know before committing?",
    rubric: [
      "Jumps to a solution without framing the problem.",
      "Frames the problem, struggles to narrow it.",
      "Breaks it down, picks a sensible first step.",
      "Reframes the problem and finds the cheaper path.",
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration",
    question:
      "Tell us about a time you disagreed with a teammate on something that mattered. What happened next?",
    probe: "What did the other person think of how it went?",
    rubric: [
      "Disagreement framed as the other person's fault.",
      "Resolved, but only by escalation or giving in.",
      "Sought the other view and found common ground.",
      "Turned the disagreement into a better shared outcome.",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    question:
      "Explain something from your field to us as if we joined the team yesterday.",
    probe: "How would you write that down for someone who missed this call?",
    rubric: [
      "Hard to follow, heavy on jargon.",
      "Accurate but needs prompting to land.",
      "Clear, structured, checks for understanding.",
      "Memorable and precise; adapts to the listener.",
    ],
  },
  {
    id: "customer",
    label: "Customer focus",
    question:
      "A regular customer is upset about something that is not technically our fault. Talk us through your reply.",
    probe: "What would you change so it does not happen again?",
    rubric: [
      "Defends the policy before hearing the customer.",
      "Polite, but solves only the immediate ask.",
      "Solves the problem and the feeling behind it.",
      "Fixes the cause and closes the loop with the customer.",
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    question:
      "Describe a time you had to get a group moving without being their manager.",
    probe: "Who did not come along, and why?",
    rubric: [
      "Relies on title or on doing it alone.",
      "Gets agreement but loses momentum.",
      "Sets direction others follow willingly.",
      "Grows other people while getting the result.",
    ],
  },
  {
    id: "ownership",
    label: "Ownership",
    question:
      "Tell us about something that went wrong on your watch. What did you do in the first 24 hours?",
    probe: "What did you change afterwards?",
    rubric: [
      "Story centres on who was to blame.",
      "Fixed the symptom, moved on.",
      "Owned the fix and the follow-up.",
      "Changed the system so it could not recur.",
    ],
  },
  {
    id: "learning",
    label: "Learning",
    question:
      "What is something you were wrong about in the last year, and how did you find out?",
    probe: "How do you look for feedback now?",
    rubric: [
      "Struggles to name a real example.",
      "Names one, little change since.",
      "Clear example with a concrete change.",
      "Actively designs ways to be proven wrong early.",
    ],
  },
];

export type LoopStep = {
  id: string;
  name: string;
  minutes: number;
  interviewers: number;
  covers: string[];
};

/** The interview steps the loop composer can schedule. Intro and decision always run. */
export const loopSteps: LoopStep[] = [
  { id: "intro", name: "Intro call", minutes: 30, interviewers: 1, covers: [] },
  {
    id: "sample",
    name: "Work sample review",
    minutes: 60,
    interviewers: 2,
    covers: ["craft"],
  },
  {
    id: "problem",
    name: "Problem-solving session",
    minutes: 60,
    interviewers: 2,
    covers: ["problem"],
  },
  {
    id: "team",
    name: "Team conversation",
    minutes: 45,
    interviewers: 2,
    covers: ["collaboration", "communication"],
  },
  {
    id: "customer",
    name: "Customer scenario",
    minutes: 45,
    interviewers: 1,
    covers: ["customer"],
  },
  {
    id: "manager",
    name: "Hiring manager interview",
    minutes: 45,
    interviewers: 1,
    covers: ["leadership", "ownership", "learning"],
  },
  {
    id: "decision",
    name: "Decision meeting",
    minutes: 30,
    interviewers: 3,
    covers: [],
  },
];

export type Pace = { id: string; label: string; gap: number; note: string };

export const paces: Pace[] = [
  {
    id: "brisk",
    label: "Brisk",
    gap: 1,
    note: "One step a day. Best for roles where candidates have other offers.",
  },
  {
    id: "steady",
    label: "Steady",
    gap: 2,
    note: "A rest day between steps. Our default and the most common choice.",
  },
  {
    id: "unhurried",
    label: "Unhurried",
    gap: 4,
    note: "Room for take-home work and part-time interviewers.",
  },
];

export const composer = {
  title: "Compose the interview loop before you post the job.",
  body: "Pick the role and what it really needs. Cadence builds the loop, schedules it at your pace and shows what it costs the candidate and your team, before anyone writes a question.",
  roles: [
    {
      id: "designer",
      label: "Product designer",
      competencies: ["craft", "collaboration", "communication", "customer"],
    },
    {
      id: "engineer",
      label: "Backend engineer",
      competencies: ["problem", "craft", "collaboration", "ownership"],
    },
    {
      id: "shift",
      label: "Bakery shift lead",
      competencies: ["customer", "leadership", "ownership"],
    },
    {
      id: "nurse",
      label: "Clinic nurse",
      competencies: ["customer", "communication", "collaboration", "learning"],
    },
    {
      id: "account",
      label: "Account manager",
      competencies: ["customer", "communication", "ownership", "problem"],
    },
  ],
};

/* ───────────────────────── Customers ───────────────────────── */

export type Story = {
  slug: string;
  company: string;
  industry: "Hospitality" | "Healthcare" | "Manufacturing" | "Retail";
  size: string;
  location: string;
  since: string;
  image: string;
  imageAlt: string;
  summary: string;
  headline: string;
  quote: { text: string; by: string; role: string };
  facts: { label: string; value: string }[];
  challenge: string[];
  approach: string[];
  practices: string[];
  outcome: string[];
  loop: { role: string; steps: string[]; pace: string };
};

export const stories: Story[] = [
  {
    slug: "hollis-and-rye",
    company: "Hollis & Rye",
    industry: "Hospitality",
    size: "14 bakeries, 310 staff",
    location: "Seattle, WA",
    since: "2024",
    image: hollisRye,
    imageAlt:
      "A baker in a white cap slides a long peel of loaves into a deck oven.",
    summary:
      "A bakery group that hires 90 people a year, mostly for 4 a.m. shifts, with no recruiter on staff.",
    headline:
      "Hollis & Rye fills a 4 a.m. shift in nine days, without a recruiter.",
    quote: {
      text: "Our head bakers used to interview on a flour sack between batches. Now they have a kit on their phone, the same five questions as everyone else, and a decision by Friday.",
      by: "Marisol Okafor",
      role: "Operations director, Hollis & Rye",
    },
    facts: [
      { label: "Days to offer", value: "9, down from 23" },
      { label: "Applicants who heard back", value: "Every one" },
      { label: "Interviewers trained", value: "41 head bakers" },
    ],
    challenge: [
      "Hollis & Rye opens a new bakery every year and loses a few early-shift bakers every season. Hiring ran through a shared inbox and a whiteboard in the Ballard production kitchen.",
      "Good applicants took other jobs while their CV sat unread for a week, and every head baker interviewed in their own way, which made comparing two people for the same shift close to impossible.",
    ],
    approach: [
      "The operations team set up one Cadence pipeline per bakery and one shared interview kit for every shift lead and baker role. Head bakers interview on their phones, score on the spot, and cannot see each other's notes until they have submitted their own.",
    ],
    practices: [
      "Two-step loop: a 20-minute call, then a paid trial shift",
      "Automatic thank-you note within one working day of applying",
      "Kits written once by the head baker team, used in all 14 bakeries",
    ],
    outcome: [
      "Time from application to offer fell from 23 days to 9. The ops team now spends its Friday afternoons on decisions instead of chasing feedback, and the trial-shift pass rate has become a number they actually track.",
    ],
    loop: {
      role: "Bakery shift lead",
      steps: ["intro", "customer", "manager", "decision"],
      pace: "brisk",
    },
  },
  {
    slug: "northfold-health",
    company: "Northfold Health",
    industry: "Healthcare",
    size: "6 clinics, 220 staff",
    location: "Duluth, MN",
    since: "2023",
    image: northfold,
    imageAlt:
      "Two clinicians at a small desk go through medication packaging with a colleague.",
    summary:
      "Community clinics competing with hospital systems for nurses, using speed and warmth as the edge.",
    headline: "Northfold Health hires nurses the week they apply.",
    quote: {
      text: "We cannot outbid the hospital. We can call back the same afternoon, make an offer in a week and treat people like neighbours. Cadence makes that the default instead of a heroic effort.",
      by: "Dr. Anneli Strand",
      role: "Chief nursing officer, Northfold Health",
    },
    facts: [
      { label: "Median days to offer", value: "6" },
      { label: "Offer acceptance", value: "88%, up from 61%" },
      { label: "Clinics on one pipeline", value: "All six" },
    ],
    challenge: [
      "Nurse applicants in northern Minnesota have their pick of employers. Northfold's offers were competitive, but its process took three weeks and involved four separate spreadsheets.",
    ],
    approach: [
      "Northfold moved every clinical role into Cadence with a single loop: intro call, a scenario-based conversation with a senior nurse, and a short meeting with the clinic lead. Interview slots are offered from each clinic's shared calendar, so candidates book themselves.",
      "Credential checks run in parallel with the interviews instead of after them, with a checklist attached to the Offer stage.",
    ],
    practices: [
      "Candidates self-book interviews from real clinic calendars",
      "Credential checklist attached to the Offer stage",
      "Scenario questions written by senior nurses, reviewed yearly",
    ],
    outcome: [
      "Median time to offer is now six days. Offer acceptance rose from 61% to 88%, and exit surveys mention the interview experience as a reason people said yes.",
    ],
    loop: {
      role: "Clinic nurse",
      steps: ["intro", "customer", "team", "decision"],
      pace: "brisk",
    },
  },
  {
    slug: "tamber-instruments",
    company: "Tamber Instruments",
    industry: "Manufacturing",
    size: "140 staff",
    location: "Boulder, CO",
    since: "2025",
    image: tamber,
    imageAlt:
      "An engineer adjusts a precision instrument inside a laboratory test rig.",
    summary:
      "A scientific instrument maker that needed engineers to stop interviewing on instinct.",
    headline:
      "Tamber Instruments replaced the gut feeling with a rubric engineers trust.",
    quote: {
      text: "Our best engineers hated interviewing because it felt like guessing. The rubric gave them something to disagree about that was not each other.",
      by: "Jonah Feld",
      role: "VP Engineering, Tamber Instruments",
    },
    facts: [
      { label: "Hires in the first year", value: "31 engineers" },
      { label: "Scorecards in before debrief", value: "97%" },
      { label: "Regretted hires", value: "None to date" },
    ],
    challenge: [
      "Tamber builds optical test rigs for research labs. Its hiring loops were inherited team by team and varied wildly: some candidates met eleven people, some met two.",
    ],
    approach: [
      "Engineering leads wrote four competencies with clear rubrics, then built one loop per discipline in the loop composer. The decision meeting only opens once every scorecard is submitted.",
    ],
    practices: [
      "Four competencies, one rubric, every engineering role",
      "Work sample reviewed by two engineers independently",
      "Decision meeting locked until all scorecards are in",
    ],
    outcome: [
      "Tamber hired 31 engineers in its first year on Cadence. Interviewers now submit 97% of scorecards before the debrief, and loops shrank from an average of seven conversations to four.",
    ],
    loop: {
      role: "Optical engineer",
      steps: ["intro", "sample", "problem", "team", "decision"],
      pace: "steady",
    },
  },
  {
    slug: "greenway-garden-centres",
    company: "Greenway Garden Centres",
    industry: "Retail",
    size: "5 centres, 180 staff + 120 seasonal",
    location: "Portland, ME",
    since: "2024",
    image: greenway,
    imageAlt:
      "Baskets of pink and purple petunias hang in rows from the roof of a long greenhouse.",
    summary:
      "A garden centre chain that hires 120 seasonal staff in six weeks every spring.",
    headline: "Greenway hires its whole spring season in six weeks.",
    quote: {
      text: "Spring used to be a stack of paper applications and a lot of apologising. Now we reopen last year's pipeline, invite back the people we loved, and start from there.",
      by: "Tomasz Brenner",
      role: "People lead, Greenway Garden Centres",
    },
    facts: [
      { label: "Seasonal hires per spring", value: "120" },
      { label: "Returning seasonal staff", value: "46%" },
      { label: "Hiring window", value: "6 weeks" },
    ],
    challenge: [
      "Greenway's seasonal rush starts in March. Store managers were hiring alone, on paper, while also unloading 40 pallets of compost a day.",
    ],
    approach: [
      "Each centre runs a seasonal pipeline that is archived, not deleted, in July. Next spring the team reopens it and invites last year's best seasonal staff back with one message.",
    ],
    practices: [
      "Seasonal pipelines archived and reopened each spring",
      "Group intro sessions for up to 12 applicants at once",
      "Mobile-first application with three questions, no CV required",
    ],
    outcome: [
      "Nearly half of each spring's seasonal staff are now returning faces, and store managers spend about a third of the time on hiring they did before.",
    ],
    loop: {
      role: "Seasonal plant care",
      steps: ["intro", "customer", "decision"],
      pace: "brisk",
    },
  },
  {
    slug: "common-ground-coffee",
    company: "Common Ground Coffee",
    industry: "Hospitality",
    size: "8 cafés, 96 staff",
    location: "Tucson, AZ",
    since: "2025",
    image: commonGround,
    imageAlt:
      "A barista draws a fine pattern into the milk foam of a cappuccino with a wooden pick.",
    summary:
      "A café group that wanted every applicant, hired or not, to leave as a regular.",
    headline:
      "Common Ground turns the applicants it cannot hire into regulars.",
    quote: {
      text: "Half our applicants are customers. Ghosting them is like ghosting a regular. With Cadence every single one hears from a real person, and they keep coming in.",
      by: "Ray Delgado",
      role: "Co-founder, Common Ground Coffee",
    },
    facts: [
      { label: "Applicants who heard back", value: "100%" },
      { label: "Days to offer", value: "7" },
      { label: "Candidate survey score", value: "4.8 out of 5" },
    ],
    challenge: [
      "Common Ground gets around 60 applications for every barista opening, many from people who already drink their coffee. Most were never answered.",
    ],
    approach: [
      "The team wrote warm, specific message templates for every stage, including the no. Rejections go out with a free-drink code and the honest reason the team chose someone else.",
    ],
    practices: [
      "Stage-specific message templates, written in the café's own voice",
      "Short bar trial instead of a second interview",
      "Candidate experience survey after every closed role",
    ],
    outcome: [
      "Every applicant now hears back within five working days. The candidate survey averages 4.8 out of 5, including from people who were not hired.",
    ],
    loop: {
      role: "Barista",
      steps: ["intro", "customer", "decision"],
      pace: "brisk",
    },
  },
  {
    slug: "oakline-furniture",
    company: "Oakline Furniture Works",
    industry: "Manufacturing",
    size: "62 staff",
    location: "Asheville, NC",
    since: "2023",
    image: oakline,
    imageAlt:
      "A furniture maker smooths an oak board with an orbital sander on a stack of planks.",
    summary:
      "A furniture workshop that hires makers by their hands, not their CVs.",
    headline: "Oakline hires makers by the work on the bench.",
    quote: {
      text: "A CV tells me nothing about a dovetail. Cadence lets us run a paid bench day as a proper stage, scored the same way for everyone.",
      by: "Hannah Whitlow",
      role: "Workshop manager, Oakline Furniture Works",
    },
    facts: [
      { label: "Makers hired since 2023", value: "18" },
      { label: "Still with Oakline", value: "17" },
      { label: "Bench day pass rate", value: "41%" },
    ],
    challenge: [
      "Oakline's best makers often came from unusual paths: boat building, set design, a decade of weekend woodworking. CV screening filtered most of them out.",
    ],
    approach: [
      "Oakline dropped the CV requirement and replaced the first interview with photos of past work. The work sample review is a paid bench day, scored against a four-level rubric for craft and care.",
    ],
    practices: [
      "Portfolio photos instead of CVs",
      "Paid bench day as the work sample stage",
      "Two makers score each bench day independently",
    ],
    outcome: [
      "Seventeen of the eighteen makers hired since 2023 are still with Oakline. The workshop manager calls it the first hiring process the makers themselves believe in.",
    ],
    loop: {
      role: "Furniture maker",
      steps: ["intro", "sample", "manager", "decision"],
      pace: "unhurried",
    },
  },
  {
    slug: "spoke-and-chain",
    company: "Spoke & Chain",
    industry: "Retail",
    size: "3 shops, 34 staff",
    location: "Minneapolis, MN",
    since: "2026",
    image: spokeChain,
    imageAlt:
      "Mechanics and customers work on bicycles in a busy repair shop lined with red and blue parts bins.",
    summary:
      "A cooperative bike shop that hires as a group and needed every member's voice counted fairly.",
    headline:
      "Spoke & Chain hires as a cooperative and still decides in a week.",
    quote: {
      text: "Everyone gets a vote here. Before Cadence that meant a 40-message thread. Now it means scorecards, a short meeting, and a decision we all stand behind.",
      by: "Lucía Park",
      role: "Member-owner, Spoke & Chain",
    },
    facts: [
      { label: "Members who score each hire", value: "Up to 6" },
      { label: "Days to decision", value: "7" },
      { label: "Hires this year", value: "9 mechanics" },
    ],
    challenge: [
      "As a worker cooperative, Spoke & Chain lets every member weigh in on new hires. The result was long threads, loud voices and slow decisions.",
    ],
    approach: [
      "Members now score candidates independently in the interview kit. Scores stay hidden until the decision meeting, where the group discusses the spread, not the loudest opinion.",
    ],
    practices: [
      "Hidden scores until every member submits",
      "Repair task as the work sample stage",
      "Decision meeting capped at 30 minutes",
    ],
    outcome: [
      "Decisions now land within a week of the final conversation, and new members say the process showed them how the co-op actually works.",
    ],
    loop: {
      role: "Bike mechanic",
      steps: ["intro", "sample", "team", "decision"],
      pace: "steady",
    },
  },
];

export const industries = [
  "Hospitality",
  "Healthcare",
  "Manufacturing",
  "Retail",
] as const;

/* ───────────────────────── Pages ───────────────────────── */

export const home = {
  title: "Cadence — Hiring & applicant tracking software",
  hero: {
    title: "Good people, hired at a steady beat.",
    lede: "Cadence is the applicant tracking system for teams that hire a few people a month and want each of them to feel considered. One pipeline per role, structured interview kits, fair scorecards, and a candidate who always knows what happens next.",
    note: "Free for your first open role. No card needed.",
  },
  pipeline: {
    title: "Six stages. Six promises to the candidate.",
    body: "Every role in Cadence moves through the same honest stages. Each one carries a promise, and Cadence reminds the right person before a promise is broken.",
  },
  kits: {
    title: "Interview kits that make every conversation comparable.",
    body: "A kit holds the questions, follow-up probes and a four-level rubric for each competency. Interviewers score on their own before they see anyone else's notes, so the decision rests on evidence instead of the loudest voice in the room.",
    points: [
      "Questions written once, asked the same way to every candidate",
      "Rubric levels described in plain words, not 1 to 5 stars",
      "Scores hidden until every interviewer has submitted",
      "Works on a phone between shifts, not only at a desk",
    ],
  },
  messages: {
    title: "Nobody waits in silence.",
    body: "Cadence writes the follow-up for you at every stage and nudges you before the promise runs out. You still press send, in your own words.",
    timeline: [
      {
        when: "Mon 09:12",
        who: "Cadence → Morgan",
        text: "Thanks for applying to North Studio, Morgan. Priya will read your portfolio by Wednesday.",
      },
      {
        when: "Tue 16:40",
        who: "Priya → Morgan",
        text: "Loved the field-notes project. Could you do a 30-minute call on Thursday? Pick any slot that suits.",
      },
      {
        when: "Thu 10:30",
        who: "Calendar",
        text: "Intro call booked with Priya Raman. Video link and agenda sent to both of you.",
      },
      {
        when: "Fri 15:05",
        who: "Priya → Morgan",
        text: "You are through to the portfolio review. Elena and Sam will join; here is exactly what to expect.",
      },
    ],
  },
  fair: {
    title: "Fair by default, not by training day.",
    body: "Bias rarely comes from bad intent. It comes from inconsistent questions, unwritten criteria and first impressions. Cadence closes those gaps in the product itself.",
    items: [
      {
        title: "Anonymous first review",
        text: "Names, photos and schools hidden while you screen, revealed when you move someone forward.",
      },
      {
        title: "Same questions, same order",
        text: "Every candidate for a role meets the same kit. Interviewers can add probes, not swap questions.",
      },
      {
        title: "Independent scoring",
        text: "Scorecards lock before the debrief, so the first opinion in the room does not become everyone's.",
      },
      {
        title: "Criteria before candidates",
        text: "Competencies are chosen when the role opens, before anyone has a favourite.",
      },
      {
        title: "Pass-through by stage",
        text: "See where people drop out, per stage and source, without collecting what you should not.",
      },
      {
        title: "Deletion on schedule",
        text: "Candidate data is deleted after the retention period you set. Candidates can ask for it sooner.",
      },
    ],
  },
  storiesTitle: "Hiring at bakeries, clinics and workshops.",
  pricingTeaser: {
    title: "Interviewers are always free.",
    body: "You pay for open roles, not for the people who help you fill them. Free for one role, $149 a month for a team hiring up to ten roles at once.",
  },
  close: {
    title:
      "Open your first role tonight. Make an offer by the end of the month.",
    body: "Set up a pipeline in fifteen minutes, or poke around a workspace that is already full of candidates.",
  },
};

export const product = {
  title: "Product",
  hero: {
    title: "Everything a small hiring team does, in the order they do it.",
    lede: "Cadence follows a role from the first conversation about it to the start date of the person who fills it. Six modules, one workspace, no add-ons to buy later.",
  },
  modules: [
    {
      id: "jobs",
      name: "Jobs",
      title: "Open a role with the criteria already written.",
      body: "Start from the loop composer: pick competencies, choose a pace, set the salary band and approvers. The job post, interview kit and stage promises are drafted from the same choices, so nothing contradicts anything else.",
      points: [
        "Salary band shown on every post",
        "Approval before the post goes live",
        "Careers page included, on your own domain",
      ],
    },
    {
      id: "pipeline",
      name: "Pipeline",
      title: "One board per role. Everyone where they belong.",
      body: "Move candidates with a drag or two keystrokes. Cadence tracks how long each person has waited at a stage and flags the ones close to a broken promise.",
      points: [
        "Keyboard moves: ] forward, [ back",
        "Waiting-time flags per stage",
        "Bulk thank-you notes when a role closes",
      ],
    },
    {
      id: "kits",
      name: "Interview kits",
      title: "The same questions for everyone, with room for follow-ups.",
      body: "Kits hold questions, probes and a described rubric per competency. Interviewers open them on any device, take notes inline and score before they leave the room.",
      points: [
        "Four-level rubric in plain language",
        "Notes and scores in one view",
        "Kits versioned, with change notes",
      ],
    },
    {
      id: "scorecards",
      name: "Scorecards & decisions",
      title: "Decide on evidence, then talk about it.",
      body: "Scores stay hidden until every interviewer has submitted. The decision meeting opens with the spread of scores per competency, so the conversation starts where people actually disagree.",
      points: [
        "Hidden scores until all are in",
        "Spread view per competency",
        "Decision recorded with a reason",
      ],
    },
    {
      id: "messages",
      name: "Candidate messages",
      title: "Drafted for you, sent by you.",
      body: "Message templates for every stage, including a respectful no. Cadence drafts the next message when someone moves, and reminds you before a stage promise runs out.",
      points: [
        "Templates in your own voice",
        "Self-booking links from real calendars",
        "Reply tracking without a separate inbox",
      ],
    },
    {
      id: "reports",
      name: "Reports",
      title: "Numbers you can act on by Friday.",
      body: "Time to offer, pass-through by stage and source, and promises kept. No vanity dashboards: each report ends with the candidates or roles that need attention.",
      points: [
        "Time to offer per role",
        "Pass-through per stage and source",
        "Weekly digest by email",
      ],
    },
  ],
  integrations: {
    title: "Fits around the tools you already use.",
    body: "Cadence connects to the systems small teams actually run. Every connection is optional and can be switched off in settings.",
    groups: [
      {
        name: "Calendars",
        items:
          "Two-way calendar sync, shared interview calendars, room booking",
      },
      {
        name: "Video calls",
        items:
          "Meeting links created per interview, added to the invite automatically",
      },
      {
        name: "Job boards",
        items: "One-click posting to the main boards and local job sites",
      },
      {
        name: "HR systems",
        items: "New hires sent to your HR system with start date and salary",
      },
      {
        name: "Chat",
        items:
          "Scorecard reminders and new-applicant alerts in your team channels",
      },
      {
        name: "E-signature",
        items: "Offer letters signed inside Cadence, stored with the candidate",
      },
    ],
  },
  security: {
    title: "Candidate data, handled like it belongs to the candidate.",
    points: [
      "Data hosted in the US or EU, your choice at sign-up",
      "Encryption in transit and at rest",
      "Retention periods per country, with automatic deletion",
      "Single sign-on and audit log on the Scale plan",
    ],
  },
  close: {
    title: "Try every module in a workspace that is already full.",
    body: "Eighteen candidates, six roles and a day of interviews, ready to click through. Nothing you do there leaves your browser.",
  },
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  roles: string;
  blurb: string;
  features: string[];
  cta: { label: string; to: string };
};

export const pricing = {
  title: "Pricing",
  hero: {
    title: "Pay for open roles. Never for interviewers.",
    lede: "Every plan includes unlimited candidates and unlimited interviewers. You choose how many roles you hire for at once.",
  },
  plans: [
    {
      id: "solo",
      name: "Solo",
      monthly: 0,
      yearly: 0,
      roles: "1 open role",
      blurb: "For a founder hiring the first few people.",
      features: [
        "Pipeline and interview kits",
        "Careers page",
        "Candidate message templates",
        "Email support",
      ],
      cta: { label: "Start free", to: "/signin" },
    },
    {
      id: "team",
      name: "Team",
      monthly: 149,
      yearly: 119,
      roles: "Up to 10 open roles",
      blurb: "For teams hiring steadily through the year.",
      features: [
        "Everything in Solo",
        "Loop composer and kit library",
        "Calendar self-booking",
        "Reports and weekly digest",
        "Chat support, same day",
      ],
      cta: { label: "Try Team for 30 days", to: "/signin" },
    },
    {
      id: "scale",
      name: "Scale",
      monthly: 389,
      yearly: 311,
      roles: "Unlimited open roles",
      blurb: "For multi-site teams and regulated hiring.",
      features: [
        "Everything in Team",
        "Approvals and salary bands",
        "Single sign-on and audit log",
        "Data residency in the EU",
        "Named onboarding partner",
      ],
      cta: { label: "Book a walkthrough", to: "/demo" },
    },
  ] satisfies Plan[],
  featured: "team",
  compare: {
    columns: ["Solo", "Team", "Scale"],
    rows: [
      { label: "Open roles at once", values: ["1", "10", "Unlimited"] },
      {
        label: "Candidates and interviewers",
        values: ["Unlimited", "Unlimited", "Unlimited"],
      },
      { label: "Interview kits", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Loop composer", values: [false, true, true] },
      { label: "Calendar self-booking", values: [false, true, true] },
      { label: "Anonymous first review", values: [true, true, true] },
      { label: "Reports", values: ["Basic", "Full", "Full + export"] },
      { label: "Approvals and salary bands", values: [false, false, true] },
      { label: "Single sign-on and audit log", values: [false, false, true] },
      {
        label: "Support",
        values: ["Email", "Chat, same day", "Named partner"],
      },
    ] as { label: string; values: (string | boolean)[] }[],
  },
  faqs: [
    {
      q: "What counts as an open role?",
      a: "A job that is published or accepting candidates. Drafts, paused and closed roles are free, so you can keep last year's pipelines around and reopen them later.",
    },
    {
      q: "Do interviewers need a paid seat?",
      a: "No. Invite as many interviewers, hiring managers and approvers as you like on every plan. They only see the roles they are part of.",
    },
    {
      q: "What happens if I go over my role limit?",
      a: "Nothing breaks. We let you know, and you can pause a role or move up a plan. We never charge for overages without asking.",
    },
    {
      q: "Can I import candidates from my current tool?",
      a: "Yes. Upload a spreadsheet export, or on Team and Scale we will run the import with you during onboarding at no extra cost.",
    },
    {
      q: "Is there a discount for nonprofits?",
      a: "Registered nonprofits and schools get 40% off Team and Scale. Write to us from your organisation's email and we will set it up.",
    },
    {
      q: "How does yearly billing work?",
      a: "Yearly plans are billed once, up front, at about 20% less than paying monthly. You can switch between monthly and yearly at renewal.",
    },
  ],
  close: {
    title: "Not sure which plan fits?",
    body: "Tell us how many roles you usually have open. We will recommend the smallest plan that works and set it up with you.",
    email: "sales@cadence.example",
  },
};

export const customersPage = {
  title: "Customers",
  hero: {
    title: "Teams who hire with care, in their own words.",
    lede: "Bakeries, clinics, workshops and shops. Most have no recruiter and hire between ten and a hundred people a year.",
  },
  close: {
    title: "Your story could start with one role.",
    body: "Every team on these pages started on the free plan with a single opening. Yours can be live tonight.",
  },
};

export type Release = {
  version: string;
  date: string;
  title: string;
  kind: "New" | "Improved" | "Fixed";
  notes: string[];
};

export const changelog = {
  title: "Changelog",
  hero: {
    title: "What changed, and why.",
    lede: "We ship small improvements every week and write them down here in plain words.",
  },
  releases: [
    {
      version: "4.12",
      date: "2026-10-13",
      title: "Kits on the lock screen",
      kind: "New",
      notes: [
        "Interviewers get a notification ten minutes before an interview that opens the kit directly.",
        "Scores entered offline sync as soon as the phone reconnects.",
      ],
    },
    {
      version: "4.11",
      date: "2026-10-01",
      title: "Stage promises you can edit",
      kind: "Improved",
      notes: [
        "Each stage's promise and reminder window can now be changed per role.",
        "Reminders respect each interviewer's working hours and time zone.",
      ],
    },
    {
      version: "4.10",
      date: "2026-09-17",
      title: "Decision meeting view",
      kind: "New",
      notes: [
        "A new view for the decision meeting shows the spread of scores per competency.",
        "Decisions are saved with a reason that is visible on the candidate's timeline.",
      ],
    },
    {
      version: "4.9.2",
      date: "2026-09-04",
      title: "Calendar sync fixes",
      kind: "Fixed",
      notes: [
        "Interviews moved in the calendar now update in Cadence within a minute.",
        "Fixed a time zone issue for interviews booked across midnight UTC.",
      ],
    },
    {
      version: "4.9",
      date: "2026-08-20",
      title: "Seasonal pipelines",
      kind: "New",
      notes: [
        "Archive a role at the end of a season and reopen it next year with past candidates intact.",
        "Invite back previous candidates with one message.",
      ],
    },
    {
      version: "4.8",
      date: "2026-08-06",
      title: "Faster candidate search",
      kind: "Improved",
      notes: [
        "Search now covers notes and scorecards, not only names and emails.",
        "Results appear as you type, even in workspaces with 50,000 candidates.",
      ],
    },
    {
      version: "4.7.1",
      date: "2026-07-23",
      title: "Accessibility pass on the careers page",
      kind: "Fixed",
      notes: [
        "Every application form field now has a visible label and clear error messages.",
        "The careers page passes WCAG 2.2 AA contrast with every built-in theme.",
      ],
    },
    {
      version: "4.7",
      date: "2026-07-09",
      title: "Anonymous first review",
      kind: "New",
      notes: [
        "Hide names, photos and schools while screening. Revealed when you move a candidate forward.",
        "Available on every plan, switched on by default for new roles.",
      ],
    },
  ] satisfies Release[],
};

export const about = {
  title: "Company",
  hero: {
    title:
      "We build hiring software for the people doing the hiring on top of their real job.",
    lede: "Cadence started in 2021 in a Portland bakery's back office, where the owner was hiring twelve people out of a shared inbox. Most of our customers still look like that: busy, careful, and without a recruiter.",
  },
  photo: interviewPhoto,
  photoAlt:
    "Three colleagues at a wooden table review application papers from a red folder.",
  story: [
    "Our founders, Priya Raman and Theo Lindqvist, met while hiring for a 30-person design studio. They tried four applicant tracking systems in two years; each was built for a recruiting department of twenty and asked them to become one.",
    "So they built the tool they wanted: one board per role, interview kits a shift manager can use on a phone, and a firm opinion that every applicant deserves an answer. Today Cadence is used by 1,400 small teams, and we are 26 people working from Portland, Lisbon and wherever our team members call home.",
  ],
  principles: [
    {
      title: "Every candidate hears back",
      text: "If a feature makes it easier to ignore people, we do not build it.",
    },
    {
      title: "Evidence before opinion",
      text: "We design for decisions you could explain to the candidate you did not hire.",
    },
    {
      title: "Small teams are not small customers",
      text: "A bakery hiring twelve people deserves the same care as a company hiring twelve hundred.",
    },
    {
      title: "Calm software",
      text: "No streaks, no badges, no red dots for things that can wait until Monday.",
    },
  ],
  team: [
    { name: "Priya Raman", role: "Co-founder, CEO", place: "Portland" },
    { name: "Theo Lindqvist", role: "Co-founder, product", place: "Lisbon" },
    { name: "Ama Owusu", role: "Head of engineering", place: "Portland" },
    { name: "Daniel Sato", role: "Design lead", place: "Vancouver" },
    { name: "Inês Carvalho", role: "Customer success", place: "Lisbon" },
    {
      name: "Rafael Moreno",
      role: "Engineer, scheduling",
      place: "Mexico City",
    },
    { name: "Grace Whitfield", role: "Hiring research", place: "Edinburgh" },
    { name: "Kofi Mensah", role: "Engineer, integrations", place: "Accra" },
  ],
  principlesTitle: "What we will and will not build",
  teamTitle: "Some of the people behind Cadence",
  careers: {
    title: "We hire the way we tell you to.",
    body: "Our own roles run through Cadence with the same kits, promises and decision meetings. We are not hiring right now, but we read every note sent to the address below.",
    email: "jobs@cadence.example",
  },
};

export const demo = {
  title: "Book a walkthrough",
  hero: {
    title: "See your own hiring in Cadence, in thirty minutes.",
    lede: "Tell us a little about how you hire today. A product specialist will set up a workspace with one of your real roles and walk through it with you.",
  },
  agendaTitle: "What the thirty minutes cover",
  agenda: [
    { time: "0–5 min", text: "How you hire today and where it hurts" },
    { time: "5–20 min", text: "Your role, loop and interview kit, built live" },
    { time: "20–30 min", text: "Pricing, migration and your questions" },
  ],
  sizes: [
    "1–10 people",
    "11–50 people",
    "51–200 people",
    "201–500 people",
    "500+ people",
  ],
  roles: ["1–5 roles", "6–20 roles", "21–50 roles", "More than 50 roles"],
};

export const signin = {
  title: "Sign in",
  heading: "Welcome back to your pipelines.",
  headingUp: "Open your first role in fifteen minutes.",
};

export const notFound = {
  title: "Page not found",
  heading: "This page is not in the pipeline.",
  body: "The link may be old, or the page may have moved. Here are the places most people are looking for.",
};

/* ───────────────────────── App demo ───────────────────────── */

export const today = "2026-10-19";

export const app = {
  workspace: "North Studio",
  plan: "Team plan · 4 of 10 roles open",
  user: {
    name: "Priya Raman",
    initials: "PR",
    email: "priya@northstudio.example",
    role: "Head of People",
  },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/jobs", label: "Jobs" },
    { to: "/app/candidates", label: "Candidates" },
    { to: "/app/kit", label: "Interview kit" },
  ],
};

export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  status: "Open" | "Paused" | "Draft";
  opened: string;
  manager: string;
  salary: string;
  competencies: string[];
  pace: string;
};

export const jobs: Job[] = [
  {
    id: "product-designer",
    title: "Product designer",
    team: "Design",
    location: "Remote, US & Canada",
    status: "Open",
    opened: "2026-09-08",
    manager: "Elena Ward",
    salary: "$118k–$136k",
    competencies: ["craft", "collaboration", "communication", "customer"],
    pace: "steady",
  },
  {
    id: "frontend-engineer",
    title: "Frontend engineer",
    team: "Engineering",
    location: "Portland or remote",
    status: "Open",
    opened: "2026-09-01",
    manager: "Sam Okafor",
    salary: "$128k–$150k",
    competencies: ["problem", "craft", "collaboration", "ownership"],
    pace: "steady",
  },
  {
    id: "support-lead",
    title: "Customer support lead",
    team: "Operations",
    location: "Portland",
    status: "Open",
    opened: "2026-09-22",
    manager: "Dana Whit",
    salary: "$84k–$96k",
    competencies: ["customer", "leadership", "communication", "ownership"],
    pace: "brisk",
  },
  {
    id: "data-analyst",
    title: "Data analyst",
    team: "Finance",
    location: "Remote, US",
    status: "Open",
    opened: "2026-10-02",
    manager: "Ivo Brandt",
    salary: "$96k–$112k",
    competencies: ["problem", "communication", "ownership", "learning"],
    pace: "steady",
  },
  {
    id: "ops-coordinator",
    title: "Operations coordinator",
    team: "Operations",
    location: "Portland",
    status: "Paused",
    opened: "2026-08-18",
    manager: "Dana Whit",
    salary: "$62k–$70k",
    competencies: ["ownership", "communication", "customer"],
    pace: "brisk",
  },
  {
    id: "finance-lead",
    title: "Head of finance",
    team: "Finance",
    location: "Portland",
    status: "Draft",
    opened: "2026-10-16",
    manager: "Priya Raman",
    salary: "$150k–$172k",
    competencies: ["leadership", "problem", "communication", "ownership"],
    pace: "unhurried",
  },
];

export type Scorecard = {
  by: string;
  step: string;
  ratings: Record<string, number>;
  recommendation: Recommendation;
  note: string;
};

export const recommendations = [
  "Strong no",
  "No",
  "Yes",
  "Strong yes",
] as const;
export type Recommendation = (typeof recommendations)[number];

export type Candidate = {
  id: string;
  name: string;
  jobId: string;
  stage: Stage;
  applied: string;
  since: string;
  source: "Referral" | "Careers page" | "Job board" | "Sourced";
  location: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  experience: { role: string; org: string; years: string }[];
  next?: { when: string; step: string; with: string };
  scorecards: Scorecard[];
};

const c = (
  x: Omit<Candidate, "email" | "phone" | "scorecards"> &
    Partial<Pick<Candidate, "scorecards">>,
  n: number,
): Candidate => ({
  scorecards: [],
  email: `${x.id.replace("-", ".")}@mail.example`,
  phone: `+1 555 01${String(n).padStart(2, "0")} ${300 + n * 7}`,
  ...x,
});

export const candidates: Candidate[] = [
  c(
    {
      id: "morgan-lee",
      name: "Morgan Lee",
      jobId: "product-designer",
      stage: "interview",
      applied: "2026-09-21",
      since: "2026-10-09",
      source: "Careers page",
      location: "Tacoma, WA",
      headline: "Product designer, tools for small teams",
      summary:
        "Systems thinker with a thoughtful portfolio of internal tools for field teams. Strong on research synthesis; less shipped consumer work.",
      experience: [
        {
          role: "Senior product designer",
          org: "Fieldnote Labs",
          years: "2022–now",
        },
        { role: "Product designer", org: "Harbor Transit", years: "2019–2022" },
      ],
      next: {
        when: "Today, 10:30",
        step: "Work sample review",
        with: "Elena Ward, Sam Okafor",
      },
      scorecards: [
        {
          by: "Priya Raman",
          step: "Intro call",
          ratings: { communication: 4, collaboration: 3 },
          recommendation: "Strong yes",
          note: "Clear, warm, asked the best question of the week about how we run critiques.",
        },
      ],
    },
    1,
  ),
  c(
    {
      id: "taylor-brooks",
      name: "Taylor Brooks",
      jobId: "frontend-engineer",
      stage: "final",
      applied: "2026-09-04",
      since: "2026-10-14",
      source: "Referral",
      location: "Portland, OR",
      headline: "Frontend engineer, accessibility specialist",
      summary:
        "Builds expressive interfaces with a strong accessibility practice. Referred by Ama on the platform team.",
      experience: [
        {
          role: "Frontend engineer",
          org: "Lumen Library Co-op",
          years: "2021–now",
        },
        { role: "Web developer", org: "Freelance", years: "2018–2021" },
      ],
      next: {
        when: "Wed, 14:00",
        step: "Decision meeting",
        with: "Sam Okafor, Priya Raman",
      },
      scorecards: [
        {
          by: "Sam Okafor",
          step: "Problem-solving session",
          ratings: { problem: 4, ownership: 3 },
          recommendation: "Strong yes",
          note: "Took the flaky table bug apart calmly and found the real cause in twenty minutes.",
        },
        {
          by: "Rafael Moreno",
          step: "Work sample review",
          ratings: { craft: 3, collaboration: 3 },
          recommendation: "Yes",
          note: "Clean code, thoughtful focus handling. Would like more testing depth.",
        },
      ],
    },
    2,
  ),
  c(
    {
      id: "alex-rivera",
      name: "Alex Rivera",
      jobId: "product-designer",
      stage: "screen",
      applied: "2026-10-06",
      since: "2026-10-12",
      source: "Job board",
      location: "Boise, ID",
      headline: "Editorial designer moving into product",
      summary:
        "A visual storyteller moving from editorial into digital products. Portfolio shows strong type and layout, early product thinking.",
      experience: [
        { role: "Art director", org: "Basin Weekly", years: "2020–now" },
        { role: "Designer", org: "Cedar Press", years: "2017–2020" },
      ],
      next: { when: "Today, 13:00", step: "Intro call", with: "Priya Raman" },
    },
    3,
  ),
  c(
    {
      id: "jamie-park",
      name: "Jamie Park",
      jobId: "frontend-engineer",
      stage: "interview",
      applied: "2026-09-15",
      since: "2026-10-07",
      source: "Careers page",
      location: "Remote, Denver",
      headline: "Performance-minded frontend engineer",
      summary:
        "Enjoys performance work and turning complex systems into clear experiences. Shipped a design system used by 40 engineers.",
      experience: [
        { role: "Senior engineer", org: "Quarry Maps", years: "2020–now" },
      ],
      next: {
        when: "Today, 15:30",
        step: "Problem-solving session",
        with: "Sam Okafor, Kofi Mensah",
      },
      scorecards: [
        {
          by: "Priya Raman",
          step: "Intro call",
          ratings: { communication: 3 },
          recommendation: "Yes",
          note: "Thoughtful, a bit reserved. Strong motivation for the role.",
        },
      ],
    },
    4,
  ),
  c(
    {
      id: "noor-haddad",
      name: "Noor Haddad",
      jobId: "support-lead",
      stage: "offer",
      applied: "2026-09-23",
      since: "2026-10-16",
      source: "Referral",
      location: "Portland, OR",
      headline: "Support team lead, 8 years in SaaS support",
      summary:
        "Built a 12-person support team from scratch; brings a calm, written-first approach to escalations.",
      experience: [
        { role: "Support manager", org: "Tilework", years: "2021–now" },
        {
          role: "Support specialist",
          org: "Parcel & Post",
          years: "2017–2021",
        },
      ],
      scorecards: [
        {
          by: "Dana Whit",
          step: "Hiring manager interview",
          ratings: { leadership: 4, ownership: 4 },
          recommendation: "Strong yes",
          note: "Best answer to the outage scenario I have heard. Hire.",
        },
        {
          by: "Inês Carvalho",
          step: "Customer scenario",
          ratings: { customer: 4, communication: 3 },
          recommendation: "Strong yes",
          note: "Wrote a reply I would send as-is.",
        },
      ],
    },
    5,
  ),
  c(
    {
      id: "sofia-lindgren",
      name: "Sofia Lindgren",
      jobId: "data-analyst",
      stage: "applied",
      applied: "2026-10-17",
      since: "2026-10-17",
      source: "Job board",
      location: "Madison, WI",
      headline: "Analyst, retail forecasting",
      summary:
        "Three years of demand forecasting for a grocery chain. SQL and Python; keen to work closer to finance.",
      experience: [
        {
          role: "Forecasting analyst",
          org: "Northern Grocers",
          years: "2023–now",
        },
      ],
    },
    6,
  ),
  c(
    {
      id: "kwame-asante",
      name: "Kwame Asante",
      jobId: "data-analyst",
      stage: "screen",
      applied: "2026-10-08",
      since: "2026-10-13",
      source: "Sourced",
      location: "Atlanta, GA",
      headline: "Data analyst, nonprofit finance",
      summary:
        "Builds budget models for a national food bank network. Strong at explaining numbers to non-finance people.",
      experience: [
        { role: "Data analyst", org: "Feeding Forward", years: "2022–now" },
      ],
      next: { when: "Tue, 11:00", step: "Intro call", with: "Ivo Brandt" },
    },
    7,
  ),
  c(
    {
      id: "elif-demir",
      name: "Elif Demir",
      jobId: "product-designer",
      stage: "applied",
      applied: "2026-10-18",
      since: "2026-10-18",
      source: "Careers page",
      location: "Remote, Toronto",
      headline: "Product designer, healthcare",
      summary:
        "Designed patient intake flows for a clinic network. Portfolio includes careful accessibility work.",
      experience: [
        {
          role: "Product designer",
          org: "Wellspring Clinics",
          years: "2021–now",
        },
      ],
    },
    8,
  ),
  c(
    {
      id: "ben-cho",
      name: "Ben Cho",
      jobId: "frontend-engineer",
      stage: "applied",
      applied: "2026-10-15",
      since: "2026-10-15",
      source: "Job board",
      location: "Seattle, WA",
      headline: "Full-stack developer",
      summary:
        "Generalist with four years on a booking platform. Interested in focusing on frontend craft.",
      experience: [
        {
          role: "Software developer",
          org: "Tidewater Bookings",
          years: "2022–now",
        },
      ],
    },
    9,
  ),
  c(
    {
      id: "maya-thompson",
      name: "Maya Thompson",
      jobId: "support-lead",
      stage: "interview",
      applied: "2026-09-25",
      since: "2026-10-08",
      source: "Careers page",
      location: "Salem, OR",
      headline: "Customer experience lead, hospitality",
      summary:
        "Ran guest relations for a hotel group; strong on tone, newer to software support tooling.",
      experience: [
        {
          role: "Guest relations lead",
          org: "Riverstone Hotels",
          years: "2019–now",
        },
      ],
      next: {
        when: "Today, 16:30",
        step: "Customer scenario",
        with: "Inês Carvalho",
      },
    },
    10,
  ),
  c(
    {
      id: "luca-romano",
      name: "Luca Romano",
      jobId: "frontend-engineer",
      stage: "screen",
      applied: "2026-10-03",
      since: "2026-10-10",
      source: "Referral",
      location: "Remote, Austin",
      headline: "Frontend engineer, design systems",
      summary:
        "Maintains an open-source date picker; strong opinions about keyboard navigation.",
      experience: [
        { role: "Frontend engineer", org: "Sundial Health", years: "2021–now" },
      ],
      next: { when: "Thu, 09:30", step: "Intro call", with: "Priya Raman" },
    },
    11,
  ),
  c(
    {
      id: "hana-kobayashi",
      name: "Hana Kobayashi",
      jobId: "product-designer",
      stage: "final",
      applied: "2026-09-10",
      since: "2026-10-15",
      source: "Sourced",
      location: "Remote, Vancouver",
      headline: "Senior product designer, B2B",
      summary:
        "Ten years in B2B products; led a redesign of a scheduling tool used by 3,000 clinics.",
      experience: [
        { role: "Principal designer", org: "Slotwise", years: "2019–now" },
        { role: "Product designer", org: "Orchard HR", years: "2015–2019" },
      ],
      next: {
        when: "Thu, 15:00",
        step: "Decision meeting",
        with: "Elena Ward, Priya Raman",
      },
      scorecards: [
        {
          by: "Elena Ward",
          step: "Work sample review",
          ratings: { craft: 4, customer: 3 },
          recommendation: "Strong yes",
          note: "Exceptional critique of her own work. Knew exactly what she would cut.",
        },
        {
          by: "Daniel Sato",
          step: "Team conversation",
          ratings: { collaboration: 3, communication: 4 },
          recommendation: "Yes",
          note: "Great listener. Slight worry about pace after a large org.",
        },
      ],
    },
    12,
  ),
  c(
    {
      id: "omar-said",
      name: "Omar Said",
      jobId: "data-analyst",
      stage: "applied",
      applied: "2026-10-16",
      since: "2026-10-16",
      source: "Careers page",
      location: "Chicago, IL",
      headline: "Junior analyst, economics graduate",
      summary:
        "Recent graduate with an internship in municipal budgeting. Clear writing sample.",
      experience: [
        { role: "Budget intern", org: "City of Evanston", years: "2025" },
      ],
    },
    13,
  ),
  c(
    {
      id: "grace-oyelaran",
      name: "Grace Oyelaran",
      jobId: "support-lead",
      stage: "screen",
      applied: "2026-10-05",
      since: "2026-10-11",
      source: "Job board",
      location: "Portland, OR",
      headline: "Support supervisor, fintech",
      summary:
        "Leads a night-shift support team for a payments startup. Interested in a calmer product.",
      experience: [
        { role: "Support supervisor", org: "Payloop", years: "2022–now" },
      ],
      next: { when: "Tue, 15:00", step: "Intro call", with: "Dana Whit" },
    },
    14,
  ),
  c(
    {
      id: "ruth-fischer",
      name: "Ruth Fischer",
      jobId: "ops-coordinator",
      stage: "screen",
      applied: "2026-08-24",
      since: "2026-09-02",
      source: "Careers page",
      location: "Portland, OR",
      headline: "Office manager, architecture studio",
      summary:
        "Keeps a 25-person studio running; on hold while the role is paused.",
      experience: [
        {
          role: "Office manager",
          org: "Linework Architects",
          years: "2020–now",
        },
      ],
    },
    15,
  ),
  c(
    {
      id: "diego-alvarez",
      name: "Diego Alvarez",
      jobId: "frontend-engineer",
      stage: "hired",
      applied: "2026-08-11",
      since: "2026-10-02",
      source: "Referral",
      location: "Portland, OR",
      headline: "Frontend engineer",
      summary:
        "Joined the platform team on October 12. Hired from the August loop.",
      experience: [
        {
          role: "Frontend engineer",
          org: "Bramble Studio",
          years: "2020–2026",
        },
      ],
      scorecards: [
        {
          by: "Sam Okafor",
          step: "Problem-solving session",
          ratings: { problem: 4, ownership: 4 },
          recommendation: "Strong yes",
          note: "Clear thinker, great pair.",
        },
      ],
    },
    16,
  ),
  c(
    {
      id: "nina-petrova",
      name: "Nina Petrova",
      jobId: "product-designer",
      stage: "interview",
      applied: "2026-09-18",
      since: "2026-10-12",
      source: "Referral",
      location: "Remote, Montreal",
      headline: "Interaction designer, mobile",
      summary:
        "Mobile interaction specialist; portfolio heavy on motion and prototyping.",
      experience: [
        { role: "Interaction designer", org: "Kitebird", years: "2021–now" },
      ],
      next: {
        when: "Tue, 10:00",
        step: "Team conversation",
        with: "Daniel Sato, Rafael Moreno",
      },
    },
    17,
  ),
  c(
    {
      id: "samir-patel",
      name: "Samir Patel",
      jobId: "data-analyst",
      stage: "interview",
      applied: "2026-10-03",
      since: "2026-10-15",
      source: "Referral",
      location: "Remote, Phoenix",
      headline: "Senior analyst, SaaS finance",
      summary:
        "Built the revenue model at a 200-person software company. Referred by Ivo.",
      experience: [
        {
          role: "Senior financial analyst",
          org: "Cobalt Cloud",
          years: "2020–now",
        },
      ],
      next: {
        when: "Wed, 11:00",
        step: "Problem-solving session",
        with: "Ivo Brandt, Grace Whitfield",
      },
    },
    18,
  ),
];

export const weeklyApplicants = [
  { week: "Aug 3", count: 18 },
  { week: "Aug 10", count: 22 },
  { week: "Aug 17", count: 19 },
  { week: "Aug 24", count: 27 },
  { week: "Aug 31", count: 34 },
  { week: "Sep 7", count: 41 },
  { week: "Sep 14", count: 38 },
  { week: "Sep 21", count: 45 },
  { week: "Sep 28", count: 36 },
  { week: "Oct 5", count: 42 },
  { week: "Oct 12", count: 39 },
  { week: "Oct 19", count: 14 },
];

export const kitPage = {
  title: "Interview kit",
  intro:
    "Pick an interview from your schedule to open its kit. Scores stay hidden from other interviewers until everyone has submitted.",
};
