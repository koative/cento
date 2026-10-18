import signing from "./assets/signing.jpg";
import family from "./assets/family.jpg";
import columns from "./assets/columns.jpg";
import library from "./assets/library.jpg";
import estate from "./assets/estate.jpg";
import towers from "./assets/towers.jpg";
import consultation from "./assets/consultation.jpg";
import ledger from "./assets/ledger.jpg";
import keys from "./assets/keys.jpg";
import office from "./assets/office.jpg";
import drafting from "./assets/drafting.jpg";
import p1 from "./assets/people/p1.jpg";
import p2 from "./assets/people/p2.jpg";
import p3 from "./assets/people/p3.jpg";
import p4 from "./assets/people/p4.jpg";
import p5 from "./assets/people/p5.jpg";
import p6 from "./assets/people/p6.jpg";
import p7 from "./assets/people/p7.jpg";
import p8 from "./assets/people/p8.jpg";

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Counsel",
  legalName: "Counsel Partners LLP",
  sector: "Law firm",
  email: "hello@counsel.example",
  phone: "+1 555 014 0220",
  urgentPhone: "+1 555 014 0299",
  hours: "Monday to Friday, 8:30 am – 6:00 pm",
  founded: 1989,
  disclaimer:
    "Counsel Partners LLP is a fictional firm. Nothing on this site is legal advice, and reading it does not create an attorney–client relationship.",
};

export const nav = [
  { to: "/practice", label: "Practice areas" },
  { to: "/people", label: "People" },
  { to: "/insights", label: "Insights" },
  { to: "/firm", label: "The firm" },
  { to: "/fees", label: "Fees" },
];

export const images = { signing };

/* ───────────────────────── Practice areas ───────────────────────── */

export type Audience = "business" | "individual";

export type Area = {
  slug: string;
  name: string;
  audience: Audience[];
  short: string;
  intro: string[];
  image: string;
  imageAlt: string;
  lead: string;
  services: { name: string; text: string }[];
  matters: string[];
  fees: string;
  faqs: { q: string; a: string }[];
};

export const areas: Area[] = [
  {
    slug: "corporate",
    name: "Corporate & transactions",
    audience: ["business"],
    short:
      "Formations, financings, acquisitions and exits for owner-managed and venture-backed companies.",
    intro: [
      "Most of our corporate clients are companies with between five and five hundred employees, many of them owned by the people who run them. We act on the deals that define those businesses: the first outside investment, the acquisition of a competitor, the sale that funds a retirement.",
      "We draft for the dispute that might come later. That means warranties a buyer can actually rely on, earn-outs with arithmetic both sides agree on before closing, and shareholder agreements that say what happens when a founder leaves.",
    ],
    image: towers,
    imageAlt: "Glass office towers seen from street level against a pale sky",
    lead: "thomas-whitcombe",
    services: [
      {
        name: "Mergers & acquisitions",
        text: "Buy-side and sell-side work on share and asset deals, from letter of intent to post-closing adjustments.",
      },
      {
        name: "Venture & growth financing",
        text: "Priced rounds, convertible notes and SAFEs for companies and the investors who back them.",
      },
      {
        name: "Shareholder & operating agreements",
        text: "Drag and tag rights, vesting, deadlock and buy-sell provisions written for real succession.",
      },
      {
        name: "Commercial contracts",
        text: "Supply, distribution, licensing and services agreements, with a playbook your team can negotiate from.",
      },
      {
        name: "Governance & formation",
        text: "Entity choice, board procedure, annual compliance and the minute book you will need at diligence.",
      },
    ],
    matters: [
      "Advised the founding family on the $48 million sale of a regional cold-chain logistics group to a strategic buyer.",
      "Acted for a marine engineering company on its $6.5 million Series A, including a negotiated founder-vesting reset.",
      "Restructured the shareholder agreement of a 40-year-old manufacturer ahead of a second-generation buy-out.",
      "Negotiated a five-year exclusive distribution agreement for a seafood processor entering three new states.",
    ],
    fees: "Formations and governance work are fixed-fee. Transactions are quoted in phases with a cap for each phase, so you approve the cost of diligence before diligence begins.",
    faqs: [
      {
        q: "When should we bring you into a sale process?",
        a: "Before you sign a letter of intent. The price is rarely the term that moves afterwards; exclusivity, escrow and working-capital targets are, and those are set at the LOI stage.",
      },
      {
        q: "Do you act for investors as well as companies?",
        a: "Yes, but never on both sides of the same round. We run a conflict check on every party before we discuss terms.",
      },
      {
        q: "Can you review a contract our team has already negotiated?",
        a: "Yes. A pre-signature review of a standard commercial agreement is a fixed fee, returned within three business days.",
      },
    ],
  },
  {
    slug: "disputes",
    name: "Commercial disputes",
    audience: ["business"],
    short:
      "Contract, partnership and business-tort disputes, resolved by negotiation, arbitration or trial.",
    intro: [
      "Litigation is expensive and slow, and we say so on the first call. Most of the disputes we take on settle; the ones that settle well are the ones prepared as if they would go to trial.",
      "We act for claimants and defendants in state and federal courts and in arbitration. Every matter starts with a written early case assessment: what you can prove, what it will likely cost, and the range of outcomes we would expect.",
    ],
    image: columns,
    imageAlt:
      "Stone columns of a classical courthouse facade under a cloudy sky",
    lead: "elena-marquez-hale",
    services: [
      {
        name: "Contract & warranty claims",
        text: "Non-payment, defective performance and breach of warranty in supply, construction and services contracts.",
      },
      {
        name: "Partnership & shareholder disputes",
        text: "Deadlock, exclusion, valuation fights and breach of fiduciary duty between co-owners.",
      },
      {
        name: "Arbitration & mediation",
        text: "Representation in AAA and JAMS proceedings, and preparation for mediation that actually narrows the gap.",
      },
      {
        name: "Injunctions & urgent relief",
        text: "Temporary restraining orders to protect customers, data and confidential information within days.",
      },
      {
        name: "Debt recovery",
        text: "Demand letters, collection suits and judgment enforcement, priced so recovery stays worthwhile.",
      },
    ],
    matters: [
      "Obtained a $3.2 million arbitration award for a boatbuilder against a supplier of defective composite hulls.",
      "Defended a software reseller in a federal breach-of-contract suit, dismissed on summary judgment.",
      "Secured a temporary restraining order within 48 hours to stop a departing partner using a client list.",
      "Negotiated the buy-out of a deadlocked 50/50 brewery partnership without either side filing suit.",
    ],
    fees: "Early case assessment is a fixed fee. Litigation is billed hourly against a budget we update at each stage; for strong claims we will discuss partial contingency arrangements.",
    faqs: [
      {
        q: "We have just received a demand letter. What should we do first?",
        a: "Do not reply substantively, and do not delete anything: emails, texts and shared drives all count. Send us the letter and we will tell you within two business days what the deadline actually is.",
      },
      {
        q: "How long does a commercial case take?",
        a: "A contested state-court case typically runs 18 to 30 months to trial. Arbitration is usually faster, at nine to fifteen months. Most matters resolve well before either.",
      },
      {
        q: "Can we recover our legal fees if we win?",
        a: "Only where a contract or statute allows it. We check your contracts for a fee-shifting clause at the outset, because it changes the economics of the whole case.",
      },
    ],
  },
  {
    slug: "employment",
    name: "Employment",
    audience: ["business", "individual"],
    short:
      "Advice for employers on hiring, policy and terminations, and for senior employees on contracts and exits.",
    intro: [
      "We advise employers on the whole life of an employment relationship, and we advise senior employees when it ends. We never act for both sides of the same workplace.",
      "For employers, the work is mostly preventative: handbooks people read, restrictive covenants a court will enforce, and terminations documented well enough that the claim never arrives. For executives, it is about leverage and timing in a negotiation you will only have once.",
    ],
    image: consultation,
    imageAlt: "Colleagues around a wooden table taking notes during a meeting",
    lead: "jonah-reyes",
    services: [
      {
        name: "Contracts & handbooks",
        text: "Offer letters, executive agreements and policy handbooks compliant with state and federal law.",
      },
      {
        name: "Restrictive covenants",
        text: "Non-competes, non-solicits and confidentiality terms drafted, reviewed or challenged.",
      },
      {
        name: "Investigations",
        text: "Independent workplace investigations into harassment and misconduct complaints, with a written report.",
      },
      {
        name: "Terminations & severance",
        text: "Reductions in force, separation agreements and the negotiation of executive exit packages.",
      },
      {
        name: "Agency charges & claims",
        text: "Defence of discrimination, retaliation and wage claims before the state commission and in court.",
      },
    ],
    matters: [
      "Rewrote the handbook and covenant suite for a 300-employee healthcare group after the 2026 non-compete amendments.",
      "Negotiated an 18-month severance package and equity acceleration for a departing chief operating officer.",
      "Conducted an independent investigation into a senior-leadership complaint for a nonprofit board.",
      "Defended a restaurant group against a wage-and-hour class claim, settled at under a fifth of the demand.",
    ],
    fees: "Contract reviews and handbook packages are fixed-fee. Investigations are quoted on scope. Claims are billed hourly with a stage budget.",
    faqs: [
      {
        q: "I have been offered a severance agreement. Should I sign it?",
        a: "Not before you know what you are giving up. Most agreements include a release of claims and a review period; use it. We review severance agreements for a fixed fee.",
      },
      {
        q: "Is our non-compete enforceable?",
        a: "It depends on the employee's role, pay, geography and duration, and the 2026 amendments narrowed all four. Send us the clause and the employee's title for a fixed-fee opinion.",
      },
      {
        q: "Do you act for employees in discrimination claims?",
        a: "We advise senior employees on contracts and exits. For discrimination claims by employees we refer to trusted plaintiff-side firms, so we stay free to act for employers.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    audience: ["business", "individual"],
    short:
      "Purchases, leases, development and title for owners, tenants, lenders and families.",
    intro: [
      "We act on residential closings, commercial leases and small to mid-sized development projects across Maine and New Hampshire. Our real estate team is as comfortable with a family's first home as with a forty-unit mixed-use scheme.",
      "Property problems are usually title problems, survey problems or lease problems that someone noticed late. We read the title commitment, the survey and the lease before anyone signs, and we tell you plainly which issues matter.",
    ],
    image: keys,
    imageAlt: "A small model house beside a set of keys on a wooden table",
    lead: "claire-ashdown",
    services: [
      {
        name: "Residential closings",
        text: "Purchase and sale agreements, title review, closing and recording for buyers, sellers and lenders.",
      },
      {
        name: "Commercial leasing",
        text: "Office, retail and industrial leases for landlords and tenants, including renewals and assignments.",
      },
      {
        name: "Development & land use",
        text: "Acquisition, zoning, permitting and condominium documents for small and mid-sized projects.",
      },
      {
        name: "Title & boundary issues",
        text: "Quiet-title actions, easements, encroachments and boundary-line agreements between neighbours.",
      },
      {
        name: "Construction contracts",
        text: "Owner–contractor agreements, lien claims and defect disputes.",
      },
    ],
    matters: [
      "Closed the acquisition and financing of a 42-unit mixed-use waterfront building for a local developer.",
      "Negotiated a 15-year anchor lease for a grocery tenant, including a co-tenancy clause and fit-out allowance.",
      "Resolved a 60-year-old right-of-way dispute between three coastal property owners by recorded agreement.",
      "Acted on more than 140 residential closings in 2025, most within 30 days of signed agreement.",
    ],
    fees: "Residential closings and lease reviews are fixed-fee. Development work is billed hourly with a phase estimate.",
    faqs: [
      {
        q: "Do I need a lawyer to buy a house?",
        a: "Not legally, but your lender will require a closing agent and title insurance. We act as both, and we read the title commitment and survey on your behalf, not the lender's.",
      },
      {
        q: "How long does a commercial lease review take?",
        a: "We return a marked-up lease and an issues memo within five business days for most office and retail leases.",
      },
      {
        q: "Our neighbour's fence is on our land. What can we do?",
        a: "Start with a survey and a conversation. Many boundary issues end in a recorded agreement rather than a lawsuit, and we can draft it.",
      },
    ],
  },
  {
    slug: "private-client",
    name: "Wills, trusts & estates",
    audience: ["individual"],
    short:
      "Estate plans, trusts and probate for families, business owners and executors.",
    intro: [
      "An estate plan is a set of instructions for the worst week your family will have. We write them to be read in that week: short where they can be, specific where they must be.",
      "We also act for executors and trustees when someone has died, guiding them through probate, the inventory, creditor claims and distribution, and representing them if a will is challenged.",
    ],
    image: estate,
    imageAlt:
      "Leather-bound books and an open notebook with a fountain pen on a dark desk",
    lead: "nora-tierney",
    services: [
      {
        name: "Wills & estate plans",
        text: "Wills, powers of attorney and healthcare directives, reviewed with you in plain language.",
      },
      {
        name: "Revocable & irrevocable trusts",
        text: "Trusts for probate avoidance, minor children, blended families and beneficiaries with special needs.",
      },
      {
        name: "Business succession",
        text: "Buy-sell agreements and ownership transfers that keep a family company running.",
      },
      {
        name: "Probate & administration",
        text: "Guidance for personal representatives from appointment to final accounting.",
      },
      {
        name: "Contested estates",
        text: "Will contests, trustee disputes and claims of undue influence.",
      },
    ],
    matters: [
      "Designed a three-generation trust structure for a family-owned hardware chain with 11 stores.",
      "Administered a $14 million estate with assets in four states, closed within 13 months of appointment.",
      "Defended an executor against an undue-influence challenge, dismissed after a two-day hearing.",
      "Prepared supplemental needs trusts for two families of adult children with disabilities.",
    ],
    fees: "Wills and estate plans are fixed-fee packages. Estate administration is billed hourly, paid from the estate, with an estimate at appointment.",
    faqs: [
      {
        q: "What happens if I die without a will?",
        a: "State law decides who inherits, and a court appoints someone to manage the estate. For unmarried partners and stepchildren in particular, the result is often not what the person would have wanted.",
      },
      {
        q: "Do I need a trust or just a will?",
        a: "A will is enough for many people. A trust earns its cost when you own property in more than one state, have minor children, or want to control timing of inheritances.",
      },
      {
        q: "I have been named executor. What do I do first?",
        a: "Locate the original will, secure the house and valuables, and do not distribute anything yet. Then call us; there are deadlines that start from the date of appointment.",
      },
    ],
  },
  {
    slug: "family",
    name: "Family law",
    audience: ["individual"],
    short:
      "Divorce, parenting arrangements, support and prenuptial agreements, handled with discretion.",
    intro: [
      "Family matters are legal matters lived at home. We try to keep them out of court where we can, and we prepare carefully for court where we cannot.",
      "Our family team works with mediators, financial specialists and child-development professionals. We will tell you early whether your matter suits mediation, collaborative law or litigation, and what each will cost.",
    ],
    image: family,
    imageAlt: "A person signing a document at a desk, seen close up",
    lead: "nora-tierney",
    services: [
      {
        name: "Divorce & separation",
        text: "Contested and uncontested divorces, including division of businesses and retirement accounts.",
      },
      {
        name: "Parenting plans",
        text: "Custody schedules, relocation and modification, written around the children's actual weeks.",
      },
      {
        name: "Child & spousal support",
        text: "Calculations, negotiation and modification of support orders.",
      },
      {
        name: "Prenuptial agreements",
        text: "Pre- and post-marital agreements, negotiated respectfully and drafted to be enforced.",
      },
      {
        name: "Mediation support",
        text: "Advice before and between mediation sessions, and review of the final agreement.",
      },
    ],
    matters: [
      "Negotiated the division of a jointly owned veterinary practice without a contested hearing.",
      "Secured a court-approved relocation plan allowing a parent to move with two children for work.",
      "Drafted a prenuptial agreement protecting a family farm across three generations of ownership.",
      "Represented a parent in a contested custody modification after a change in the other parent's circumstances.",
    ],
    fees: "Uncontested divorces and prenuptial agreements are fixed-fee. Contested matters are billed hourly with a retainer and monthly statements.",
    faqs: [
      {
        q: "Will my divorce have to go to court?",
        a: "Every divorce needs a court order, but most never need a contested hearing. Around four in five of our divorces are resolved by agreement.",
      },
      {
        q: "Can we use the same lawyer?",
        a: "No. One lawyer cannot advise both spouses. We can act for one of you, and the other should take independent advice.",
      },
      {
        q: "How is a parenting schedule decided?",
        a: "By agreement where possible, and by the court applying a best-interests standard where not. We help you write a schedule that works on school days, not just on paper.",
      },
    ],
  },
  {
    slug: "intellectual-property",
    name: "Intellectual property & technology",
    audience: ["business"],
    short:
      "Trademarks, copyright, licensing, software agreements and data privacy for growing companies.",
    intro: [
      "Most of a modern company's value is in things you cannot touch: a brand, a codebase, a customer list. We help clients own those assets clearly, license them carefully and enforce them when someone takes them.",
      "We are not a patent prosecution firm. We focus on trademarks, copyright, trade secrets, technology contracts and privacy compliance, and we work with specialist patent counsel when a matter needs one.",
    ],
    image: drafting,
    imageAlt:
      "A clipboard with a blank application form beside a laptop on a marble desk",
    lead: "samuel-brandt",
    services: [
      {
        name: "Trademark clearance & filing",
        text: "Searches, USPTO applications, oppositions and portfolio management.",
      },
      {
        name: "Software & SaaS agreements",
        text: "Customer terms, SLAs, reseller and development agreements.",
      },
      {
        name: "IP ownership & assignment",
        text: "Contractor and employee assignments that make sure the company owns what it paid for.",
      },
      {
        name: "Privacy & data protection",
        text: "Privacy policies, data processing agreements and breach response planning.",
      },
      {
        name: "Enforcement",
        text: "Cease-and-desist letters, takedowns and infringement litigation.",
      },
    ],
    matters: [
      "Cleared and registered a national trademark portfolio for an outdoor apparel brand across 14 classes.",
      "Recovered ownership of a mobile app codebase from a former development agency without litigation.",
      "Prepared SaaS customer terms and a data processing agreement for a clinical-scheduling startup.",
      "Led breach response for a regional retailer, including notice to 9,000 customers and two regulators.",
    ],
    fees: "Trademark searches and filings are fixed-fee. Contract work is fixed-fee or capped. Enforcement is billed hourly.",
    faqs: [
      {
        q: "Do we own the code our contractor wrote?",
        a: "Not automatically. Without a written assignment, the contractor usually owns the copyright. We fix this with a short assignment agreement, ideally before the final invoice is paid.",
      },
      {
        q: "Should we register our trademark?",
        a: "If you sell across state lines and plan to keep the name, yes. A federal registration gives nationwide priority and makes enforcement far cheaper.",
      },
      {
        q: "Do you handle patents?",
        a: "We do not prosecute patents. We will coordinate with specialist patent counsel and handle the licensing and commercial side ourselves.",
      },
    ],
  },
  {
    slug: "restructuring",
    name: "Restructuring & insolvency",
    audience: ["business"],
    short:
      "Workouts, creditor rights and bankruptcy proceedings for companies, lenders and suppliers.",
    intro: [
      "Financial distress compresses months of decisions into weeks. We advise boards, owners, lenders and trade creditors on the choices available while there is still time to make them.",
      "Where a business can be saved, we help restructure its debt out of court. Where it cannot, we protect our clients' position in the bankruptcy or receivership that follows.",
    ],
    image: ledger,
    imageAlt: "Tax forms, receipts and a calculator spread across a white desk",
    lead: "martin-ferrell",
    services: [
      {
        name: "Out-of-court workouts",
        text: "Forbearance, amendment and debt-for-equity deals negotiated with lenders and landlords.",
      },
      {
        name: "Creditor representation",
        text: "Protecting suppliers and lenders in customer insolvencies, including preference defence.",
      },
      {
        name: "Chapter 11 & Subchapter V",
        text: "Small-business reorganisations that keep owners in control while the plan is confirmed.",
      },
      {
        name: "Distressed acquisitions",
        text: "Buying assets out of bankruptcy under section 363, free of existing liens.",
      },
      {
        name: "Director advice",
        text: "Duties of directors and officers when a company approaches insolvency.",
      },
    ],
    matters: [
      "Guided a 120-employee printing company through a Subchapter V reorganisation, confirmed in seven months.",
      "Defeated $1.1 million in preference claims against a fuel supplier in a customer's bankruptcy.",
      "Negotiated an 18-month forbearance for a hospitality group with three lenders and two landlords.",
      "Acted for the buyer of a bankrupt boatyard's assets in a court-approved 363 sale.",
    ],
    fees: "Workouts and bankruptcy work are billed hourly with weekly reporting. Preference defence is often offered on a capped or blended basis.",
    faqs: [
      {
        q: "Our biggest customer just filed for bankruptcy. What now?",
        a: "File a proof of claim before the bar date, check whether you can reclaim recently delivered goods, and keep every invoice and payment record. Payments received in the last 90 days may be challenged later.",
      },
      {
        q: "Does filing Chapter 11 mean losing the business?",
        a: "No. Under Subchapter V in particular, owners usually keep control and their equity, provided the plan pays creditors what they would otherwise receive.",
      },
      {
        q: "When should directors take advice?",
        a: "As soon as there is a realistic chance the company cannot pay its debts as they fall due. Directors' duties begin to shift towards creditors around that point.",
      },
    ],
  },
];

/* ───────────────────────── People ───────────────────────── */

export type Person = {
  slug: string;
  name: string;
  role: "Managing partner" | "Partner" | "Counsel" | "Senior associate";
  areas: string[];
  office: "Portland" | "Boston";
  email: string;
  phone: string;
  image: string;
  imagePosition?: string;
  admitted: string[];
  education: string[];
  languages: string[];
  bio: string[];
  matters: string[];
};

export const people: Person[] = [
  {
    slug: "thomas-whitcombe",
    name: "Thomas Whitcombe",
    role: "Managing partner",
    areas: ["corporate", "real-estate"],
    office: "Portland",
    email: "t.whitcombe@counsel.example",
    phone: "+1 555 014 0231",
    image: p1,
    admitted: [
      "Maine, 1991",
      "New Hampshire, 1994",
      "U.S. District Court, District of Maine",
    ],
    education: [
      "J.D., University of Maine School of Law (fictional record)",
      "B.A., History, Bowdoin College (fictional record)",
    ],
    languages: ["English", "French"],
    bio: [
      "Thomas joined the firm as its second associate in 1991 and has led it since 2012. His practice centres on the sale and acquisition of owner-managed businesses, particularly in marine, logistics and food production.",
      "Clients describe him as the lawyer who reads the schedules. He believes most post-closing disputes are drafted, not discovered, and he spends a disproportionate amount of each deal on the working-capital and indemnity mechanics.",
      "Outside the office he chairs the board of a coastal land trust and still sails the boat his grandfather built.",
    ],
    matters: [
      "Sale of a regional cold-chain logistics group to a strategic buyer ($48 million).",
      "Management buy-out of a precision machining company by its second generation.",
      "Acquisition of three competing seafood processors in a single 14-month programme.",
    ],
  },
  {
    slug: "elena-marquez-hale",
    name: "Elena Marquez-Hale",
    role: "Partner",
    areas: ["disputes", "employment"],
    office: "Boston",
    email: "e.marquezhale@counsel.example",
    phone: "+1 555 014 0247",
    image: p2,
    admitted: [
      "Massachusetts, 2004",
      "Maine, 2009",
      "U.S. Court of Appeals, First Circuit",
    ],
    education: [
      "J.D., Boston University School of Law (fictional record)",
      "B.A., Economics, Tufts University (fictional record)",
    ],
    languages: ["English", "Spanish"],
    bio: [
      "Elena leads the firm's disputes practice and its Boston office. She tries commercial cases in state and federal court and sits regularly as counsel in AAA arbitrations.",
      "Before joining Counsel in 2014 she spent nine years at a large Boston litigation boutique. She brought with her a habit of writing a one-page case theory on day one and revising it every time the facts move.",
      "Elena teaches trial advocacy one evening a week and mentors the firm's junior litigators.",
    ],
    matters: [
      "$3.2 million arbitration award for a boatbuilder against a composite-hull supplier.",
      "Temporary restraining order within 48 hours protecting a client list from a departing partner.",
      "Summary judgment for a software reseller in a federal breach-of-contract action.",
    ],
  },
  {
    slug: "martin-ferrell",
    name: "Martin Ferrell",
    role: "Partner",
    areas: ["restructuring", "disputes"],
    office: "Portland",
    email: "m.ferrell@counsel.example",
    phone: "+1 555 014 0238",
    image: p3,
    admitted: ["Maine, 2006", "U.S. Bankruptcy Court, District of Maine"],
    education: [
      "J.D., Suffolk University Law School (fictional record)",
      "B.S., Accounting, University of Southern Maine (fictional record)",
    ],
    languages: ["English"],
    bio: [
      "Martin advises companies, lenders and trade creditors when a business is in financial difficulty. A former auditor, he reads a cash-flow forecast before he reads a loan agreement.",
      "He has guided more than thirty small businesses through Subchapter V reorganisations since the procedure was introduced, and regularly defends suppliers against preference claims in customers' bankruptcies.",
    ],
    matters: [
      "Subchapter V reorganisation of a 120-employee printing company, confirmed in seven months.",
      "Defence of $1.1 million in preference claims for a regional fuel supplier.",
      "Buyer's counsel in a court-approved 363 sale of a bankrupt boatyard's assets.",
    ],
  },
  {
    slug: "claire-ashdown",
    name: "Claire Ashdown",
    role: "Partner",
    areas: ["real-estate"],
    office: "Portland",
    email: "c.ashdown@counsel.example",
    phone: "+1 555 014 0252",
    image: p4,
    admitted: ["Maine, 2013", "New Hampshire, 2015"],
    education: [
      "J.D., Vermont Law School (fictional record)",
      "B.A., Environmental Studies, Colby College (fictional record)",
    ],
    languages: ["English", "Portuguese"],
    bio: [
      "Claire leads the real estate team, acting on commercial leases, development projects and the steady flow of residential closings that keeps the team close to the local market.",
      "She has a particular interest in coastal property: rights of way, shorefront access and the boundary questions that come with land surveyed two centuries ago.",
    ],
    matters: [
      "Acquisition and financing of a 42-unit mixed-use waterfront building.",
      "15-year anchor lease for a grocery tenant with co-tenancy protections.",
      "Recorded right-of-way agreement ending a 60-year dispute between three coastal owners.",
    ],
  },
  {
    slug: "jonah-reyes",
    name: "Jonah Reyes",
    role: "Partner",
    areas: ["employment"],
    office: "Boston",
    email: "j.reyes@counsel.example",
    phone: "+1 555 014 0264",
    image: p5,
    imagePosition: "50% 35%",
    admitted: ["Massachusetts, 2010", "Maine, 2018"],
    education: [
      "J.D., Northeastern University School of Law (fictional record)",
      "B.A., Political Science, College of the Holy Cross (fictional record)",
    ],
    languages: ["English", "Spanish"],
    bio: [
      "Jonah advises employers across New England on hiring, policy, investigations and terminations, and represents senior executives negotiating their exits.",
      "He spent the first years of his career at a state labour agency, which he says taught him how claims are actually assessed on the other side of the desk.",
    ],
    matters: [
      "Handbook and covenant overhaul for a 300-employee healthcare group after the 2026 amendments.",
      "18-month severance and equity acceleration for a departing chief operating officer.",
      "Independent investigation into a senior-leadership complaint for a nonprofit board.",
    ],
  },
  {
    slug: "nora-tierney",
    name: "Nora Tierney",
    role: "Partner",
    areas: ["private-client", "family"],
    office: "Portland",
    email: "n.tierney@counsel.example",
    phone: "+1 555 014 0276",
    image: p8,
    admitted: ["Maine, 2012"],
    education: [
      "J.D., University of Maine School of Law (fictional record)",
      "LL.M., Taxation, Boston University (fictional record)",
    ],
    languages: ["English", "Irish"],
    bio: [
      "Nora leads the private client and family practices. She designs estate plans for families and business owners and acts for executors and trustees once those plans take effect.",
      "Her tax background shapes how she drafts, but her clients mostly remember that she explained the plan to their adult children before anyone needed it.",
    ],
    matters: [
      "Three-generation trust structure for a family-owned chain of 11 hardware stores.",
      "Administration of a $14 million estate with assets in four states.",
      "Successful defence of an executor against an undue-influence challenge.",
    ],
  },
  {
    slug: "samuel-brandt",
    name: "Samuel Brandt",
    role: "Counsel",
    areas: ["intellectual-property", "corporate"],
    office: "Boston",
    email: "s.brandt@counsel.example",
    phone: "+1 555 014 0281",
    image: p7,
    admitted: [
      "Massachusetts, 2011",
      "U.S. Patent and Trademark Office (trademark practice)",
    ],
    education: [
      "J.D., Boston College Law School (fictional record)",
      "B.S., Computer Science, Worcester Polytechnic Institute (fictional record)",
    ],
    languages: ["English", "German"],
    bio: [
      "Samuel advises technology and consumer-brand companies on trademarks, software agreements, IP ownership and privacy. He wrote software for six years before law school and still reads the code repository before the contract.",
      "He is the firm's first call when a client discovers that a contractor, a former co-founder or an agency owns something it thought it had paid for.",
    ],
    matters: [
      "National trademark portfolio for an outdoor apparel brand across 14 classes.",
      "Recovery of a mobile-app codebase from a former development agency without litigation.",
      "Breach response for a regional retailer, including notice to 9,000 customers.",
    ],
  },
  {
    slug: "hannah-lowell",
    name: "Hannah Lowell",
    role: "Senior associate",
    areas: ["family", "employment"],
    office: "Portland",
    email: "h.lowell@counsel.example",
    phone: "+1 555 014 0289",
    image: p6,
    admitted: ["Maine, 2018"],
    education: [
      "J.D., University of Maine School of Law (fictional record)",
      "B.A., Psychology, University of Vermont (fictional record)",
    ],
    languages: ["English", "American Sign Language"],
    bio: [
      "Hannah acts in divorce, parenting and support matters, and assists the employment team on investigations and separation agreements.",
      "She is a trained family mediator and believes most parenting plans fail on Tuesdays, not at holidays, so she drafts them around school pick-ups and work rotas.",
    ],
    matters: [
      "Court-approved relocation plan allowing a parent to move with two children for work.",
      "Division of a jointly owned veterinary practice without a contested hearing.",
      "Investigation support in a workplace complaint for a 90-employee manufacturer.",
    ],
  },
];

/* ───────────────────────── Insights ───────────────────────── */

export type Insight = {
  slug: string;
  title: string;
  type: "Briefing" | "Analysis" | "Guide";
  area: string;
  author: string;
  date: string;
  minutes: number;
  standfirst: string;
  keyPoints: string[];
  sections: { heading: string; paras: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "non-competes-after-the-2026-amendments",
    title:
      "Non-competes after the 2026 amendments: what employers should change now",
    type: "Briefing",
    area: "employment",
    author: "jonah-reyes",
    date: "2026-10-06",
    minutes: 6,
    standfirst:
      "The amendments narrow who can be bound, for how long and for what pay. Agreements signed before January remain in force, but new hires and promotions need new paper.",
    keyPoints: [
      "Non-competes now apply only to employees earning above the statutory threshold.",
      "The maximum restricted period falls from 24 to 12 months for most roles.",
      "Employers must give three business days' notice before the agreement is signed.",
    ],
    sections: [
      {
        heading: "What changed",
        paras: [
          "From January 1, 2027, a non-compete agreement is unenforceable against an employee whose annual earnings fall below the statutory threshold, adjusted each year by the state. The amendments also cap the restricted period at twelve months for most roles and require notice of the agreement before an offer is accepted.",
          "Non-solicitation and confidentiality clauses are untouched. In practice, many employers will find that a well-drafted non-solicit protects what they actually care about.",
        ],
      },
      {
        heading: "Who is affected",
        paras: [
          "Any employer that hires, promotes or renews contracts after January 1. Existing agreements are not retroactively void, but courts are likely to read the new policy into their assessment of what is reasonable.",
          "Employees on the threshold line are the difficult case. Where pay includes commission or bonus, the calculation should be documented at signing.",
        ],
      },
      {
        heading: "What to do this quarter",
        paras: [
          "Audit which roles truly need a non-compete. For most sales and technical roles, a twelve-month customer non-solicit and a strong confidentiality clause will be easier to enforce.",
          "Update offer-letter templates and onboarding timelines so the three-day notice period is built in, and keep a record of when each agreement was delivered.",
        ],
      },
    ],
  },
  {
    slug: "earn-outs-that-survive-the-closing-dinner",
    title: "Earn-outs that survive the closing dinner",
    type: "Analysis",
    area: "corporate",
    author: "thomas-whitcombe",
    date: "2026-09-22",
    minutes: 9,
    standfirst:
      "An earn-out bridges a gap in price by deferring it. Too often it defers the argument as well. Four drafting habits that keep both sides speaking two years later.",
    keyPoints: [
      "Define the metric with a worked example attached to the agreement.",
      "Say who controls the business decisions that move the metric.",
      "Agree an expert-determination route before anyone needs it.",
    ],
    sections: [
      {
        heading: "Write the arithmetic down",
        paras: [
          "Most earn-out disputes are accounting disputes. Attach a worked example calculated on last year's numbers to the purchase agreement, and say expressly that it is illustrative of the method. If the parties cannot agree on last year, they will not agree on next year.",
          "Specify the accounting principles, the treatment of one-off costs and whether group overhead is allocated. Revenue earn-outs are simpler than EBITDA earn-outs for exactly this reason.",
        ],
      },
      {
        heading: "Decide who steers",
        paras: [
          "A seller who stays on will want protection against the buyer moving customers or cutting the budget. A buyer will want freedom to integrate. Neither position is unreasonable, so the agreement should name the specific actions that need the seller's consent during the earn-out period.",
        ],
      },
      {
        heading: "Plan for disagreement",
        paras: [
          "An expert-determination clause sends accounting disputes to an independent accountant rather than to court. It is quicker and cheaper, provided the clause limits the expert to the numbers and leaves legal questions to the courts.",
          "Finally, decide what happens on a change of control. If the buyer sells the business within the earn-out period, the seller should usually be paid out at a pre-agreed figure.",
        ],
      },
    ],
  },
  {
    slug: "eleven-clauses-to-read-twice-in-a-commercial-lease",
    title: "Before you sign a commercial lease: eleven clauses to read twice",
    type: "Guide",
    area: "real-estate",
    author: "claire-ashdown",
    date: "2026-09-08",
    minutes: 8,
    standfirst:
      "A lease is often a business's largest commitment after payroll. These are the clauses we mark up most often, and the questions to ask before you reach them.",
    keyPoints: [
      "Know your real occupancy cost, not just base rent.",
      "Personal guarantees can and should be capped.",
      "Assignment rights decide whether you can sell your business.",
    ],
    sections: [
      {
        heading: "The money clauses",
        paras: [
          "Base rent is the number on the term sheet. Operating expenses, taxes, insurance and management fees are the numbers that arrive later. Ask for the last three years of operating-expense reconciliations and a cap on annual increases in controllable costs.",
          "Check how rent escalates, whether there is a free-rent period during fit-out, and who pays for repairs to building systems serving only your space.",
        ],
      },
      {
        heading: "The exit clauses",
        paras: [
          "If you may ever sell your business, the assignment clause matters more than the rent. Landlords will usually allow assignment to a buyer of the whole business with reasonable consent; get that in writing now.",
          "A personal guarantee should reduce over time or cap at a number of months' rent. A good-guy guarantee, ending once you hand back the keys and pay to date, is common in our market.",
        ],
      },
      {
        heading: "The clauses nobody reads",
        paras: [
          "Relocation rights, radius restrictions, co-tenancy, holdover rent and the restoration obligation at lease end each cost tenants real money every year. Read them before you fall in love with the space.",
        ],
      },
    ],
  },
  {
    slug: "preserving-evidence-the-day-a-dispute-begins",
    title: "Preserving evidence the day a dispute begins",
    type: "Guide",
    area: "disputes",
    author: "elena-marquez-hale",
    date: "2026-08-25",
    minutes: 7,
    standfirst:
      "Cases are lost on the documents nobody kept. A short checklist for the first week after you receive a demand letter or decide to send one.",
    keyPoints: [
      "The duty to preserve starts when litigation is reasonably anticipated.",
      "Automatic deletion policies must be suspended for relevant accounts.",
      "Messaging apps and personal phones are within scope.",
    ],
    sections: [
      {
        heading: "When the duty begins",
        paras: [
          "You must preserve relevant evidence once litigation is reasonably anticipated, which is often well before a complaint is filed. A demand letter, a threat in an email or an internal decision to sue will usually be enough.",
          "Courts can sanction parties who lose evidence after that point, from fines to an instruction that the jury may assume the missing evidence was unfavourable.",
        ],
      },
      {
        heading: "What to do in the first week",
        paras: [
          "Issue a written litigation hold to every person likely to hold relevant material, including former employees' accounts still on your systems. Suspend auto-delete on email and chat retention for those accounts.",
          "Identify where the evidence lives: shared drives, accounting systems, text messages and messaging apps. Do not collect it yourself; forensic collection preserves metadata that a forwarded email loses.",
        ],
      },
      {
        heading: "What not to do",
        paras: [
          "Do not write internal emails speculating about the dispute; they are likely discoverable. Route analysis through counsel so that privilege applies, and keep business communications factual.",
        ],
      },
    ],
  },
  {
    slug: "revocable-trusts-are-not-a-tax-plan",
    title: "Revocable trusts are not a tax plan",
    type: "Analysis",
    area: "private-client",
    author: "nora-tierney",
    date: "2026-08-11",
    minutes: 6,
    standfirst:
      "A revocable trust avoids probate and keeps your affairs private. It does not, on its own, reduce estate tax. What it does well, and where clients expect too much.",
    keyPoints: [
      "Assets in a revocable trust are still part of your taxable estate.",
      "The trust only works for assets actually retitled into it.",
      "Its real strengths are privacy, continuity and multi-state property.",
    ],
    sections: [
      {
        heading: "What a revocable trust does",
        paras: [
          "While you are alive and well, nothing much changes: you are the trustee and the beneficiary. If you become incapacitated, your successor trustee steps in without a court guardianship. When you die, the trustee distributes the assets without probate.",
          "That continuity matters most for people who own real estate in more than one state, or who would rather their estate's details were not filed in a public court record.",
        ],
      },
      {
        heading: "What it does not do",
        paras: [
          "Because you can revoke the trust, the law treats the assets as yours. They are counted in your estate for estate-tax purposes and remain reachable by your creditors.",
          "Tax planning for larger estates uses irrevocable structures, lifetime gifts and the marital deduction. A revocable trust is often the container those plans pour into, but it is not the plan.",
        ],
      },
      {
        heading: "The step most people miss",
        paras: [
          "A trust controls only what it owns. After signing, deeds must be recorded, accounts retitled and beneficiary designations updated. We send every client a funding checklist and check it with them six weeks later.",
        ],
      },
    ],
  },
  {
    slug: "who-owns-the-code-your-contractor-wrote",
    title: "Who owns the code your contractor wrote?",
    type: "Briefing",
    area: "intellectual-property",
    author: "samuel-brandt",
    date: "2026-07-28",
    minutes: 5,
    standfirst:
      "Paying for software does not make you its owner. Without a written assignment, the copyright usually stays with whoever wrote it, which surprises founders at the worst possible moment.",
    keyPoints: [
      "Contractors own the copyright in their work unless they assign it in writing.",
      "Work-made-for-hire rarely applies to software contractors.",
      "Fix it before a financing or sale, when buyers will check.",
    ],
    sections: [
      {
        heading: "The default rule",
        paras: [
          "Copyright belongs to the author. For employees acting within their job, the employer is the author. For independent contractors, the contractor is, unless a signed written agreement assigns the rights to you.",
          "The work-made-for-hire doctrine covers only nine narrow categories of commissioned work, and most software does not fit any of them.",
        ],
      },
      {
        heading: "Why it matters now",
        paras: [
          "Investors and acquirers ask for a schedule of everyone who has contributed code and a copy of each assignment. A missing assignment can delay a closing or reduce the price.",
          "Open-source components raise a separate question: the licence terms of each library travel with your product. Keep an inventory.",
        ],
      },
      {
        heading: "The fix",
        paras: [
          "A short confirmatory assignment, signed now and covering past work, solves most problems. Contractors will usually sign it with their final invoice. If they will not, talk to us before you make the final payment.",
        ],
      },
    ],
  },
  {
    slug: "early-warning-signs-in-a-customers-insolvency",
    title: "Early warning signs in a customer's insolvency",
    type: "Briefing",
    area: "restructuring",
    author: "martin-ferrell",
    date: "2026-07-14",
    minutes: 6,
    standfirst:
      "Slow payments, shorter orders and a new chief financial officer rarely arrive by coincidence. What trade creditors can do while a customer is still trading.",
    keyPoints: [
      "Payments received in the 90 days before bankruptcy can be clawed back.",
      "Goods delivered in the last 20 days may give an administrative claim.",
      "Tighter credit terms now are cheaper than a preference suit later.",
    ],
    sections: [
      {
        heading: "Signals worth acting on",
        paras: [
          "Payments that slip from 30 to 60 days, requests to restructure terms, partial payments without explanation and sudden management changes are the common pattern. None is conclusive; together they are worth a call.",
        ],
      },
      {
        heading: "Protecting your position",
        paras: [
          "Move to shorter terms, cash in advance or a letter of credit while you still have leverage. Consider a security interest for larger balances, properly perfected by filing.",
          "Keep careful records of each delivery and each payment. If the customer later files for bankruptcy, the ordinary-course and new-value defences to a preference claim depend on that history.",
        ],
      },
      {
        heading: "If the customer files",
        paras: [
          "Note the bar date and file a proof of claim. Assert any reclamation rights immediately, and claim administrative priority for goods delivered in the 20 days before the filing.",
        ],
      },
    ],
  },
  {
    slug: "parenting-schedules-that-hold-up-in-practice",
    title: "Parenting schedules that hold up in practice",
    type: "Guide",
    area: "family",
    author: "hannah-lowell",
    date: "2026-06-30",
    minutes: 7,
    standfirst:
      "A parenting plan is judged on ordinary weeks, not holidays. How we draft schedules that survive school runs, shift work and the first new partner.",
    keyPoints: [
      "Start from the children's week, then fit the adults around it.",
      "Name the exchange time and place, not just the day.",
      "Build in a review point before the next school transition.",
    ],
    sections: [
      {
        heading: "Begin with the calendar",
        paras: [
          "Write down a real fortnight: school hours, activities, each parent's work pattern and travel time between homes. A schedule that looks fair on paper but needs a 6 am handover on a school day will break within a month.",
        ],
      },
      {
        heading: "Be specific about exchanges",
        paras: [
          "Most conflict happens at handovers. Name the time, the place and who drives. School is often the best exchange point because it avoids the parents meeting at all.",
          "Agree how changes are requested, in writing and with how much notice. A shared calendar app helps, but the plan should say which record wins.",
        ],
      },
      {
        heading: "Plan for change",
        paras: [
          "Children's needs at seven are not their needs at thirteen. Include a review point before middle school, and a process for modification that starts with mediation rather than a court motion.",
        ],
      },
    ],
  },
];

/* ───────────────────────── Limitation periods (signature) ───────────────────────── */

export type Limitation = {
  id: string;
  label: string;
  area: string;
  amount: number;
  unit: "days" | "months" | "years";
  from: string;
  note: string;
};

export const limitations: Limitation[] = [
  {
    id: "contract",
    label: "Breach of a written contract",
    area: "disputes",
    amount: 6,
    unit: "years",
    from: "the breach",
    note: "Some contracts shorten this period; check for a limitations clause.",
  },
  {
    id: "warranty",
    label: "Warranty claim after a business sale",
    area: "corporate",
    amount: 18,
    unit: "months",
    from: "closing",
    note: "Survival periods are set by the purchase agreement; 18 months is common, not universal.",
  },
  {
    id: "discrimination",
    label: "Discrimination charge with the state commission",
    area: "employment",
    amount: 300,
    unit: "days",
    from: "the last discriminatory act",
    note: "A charge must usually be filed before any lawsuit.",
  },
  {
    id: "wages",
    label: "Unpaid wages or overtime",
    area: "employment",
    amount: 2,
    unit: "years",
    from: "the missed payment",
    note: "Each pay period can start its own clock.",
  },
  {
    id: "defect",
    label: "Construction defect claim",
    area: "real-estate",
    amount: 6,
    unit: "years",
    from: "substantial completion",
    note: "A separate repose period may bar claims regardless of discovery.",
  },
  {
    id: "will",
    label: "Challenging a will after probate",
    area: "private-client",
    amount: 4,
    unit: "months",
    from: "the probate notice",
    note: "Very short, and courts rarely extend it.",
  },
  {
    id: "creditor",
    label: "Creditor claim against an estate",
    area: "private-client",
    amount: 9,
    unit: "months",
    from: "death",
    note: "A published notice to creditors can shorten this to four months.",
  },
  {
    id: "appeal",
    label: "Appealing a family court order",
    area: "family",
    amount: 21,
    unit: "days",
    from: "entry of the order",
    note: "Post-judgment motions may pause the clock; ask us the same week.",
  },
  {
    id: "copyright",
    label: "Copyright infringement",
    area: "intellectual-property",
    amount: 3,
    unit: "years",
    from: "the infringement",
    note: "Each new infringing act may start a new period.",
  },
  {
    id: "preference",
    label: "Preference claim by a bankruptcy trustee",
    area: "restructuring",
    amount: 2,
    unit: "years",
    from: "the bankruptcy petition",
    note: "This is the trustee's deadline to sue you, not yours.",
  },
];

/* ───────────────────────── Home & firm ───────────────────────── */

export const home = {
  title:
    "Clear counsel for the decisions that define a business, a family, a life’s work.",
  lede: "Counsel Partners is a 38-lawyer firm in Portland and Boston. We act for owner-managed companies, families and the people who lead them, on transactions, disputes and the plans that outlast both.",
  promise:
    "We reply to every enquiry within one business day, and quote before we start.",
  audiences: [
    {
      id: "business" as Audience,
      heading: "For businesses",
      text: "Founders, boards and finance teams, from the first financing to the final sale.",
    },
    {
      id: "individual" as Audience,
      heading: "For individuals & families",
      text: "Homes, estates, employment and family matters, handled in plain language.",
    },
  ],
  process: [
    {
      title: "Enquiry",
      text: "Tell us who is involved and what has happened. A lawyer reads every enquiry, usually the same day.",
    },
    {
      title: "Conflict check",
      text: "Before we discuss details we confirm we act for no one on the other side. This takes under a day.",
    },
    {
      title: "First consultation",
      text: "Thirty minutes, free, by phone or in person. You leave with our view of the issue and the next step.",
    },
    {
      title: "Engagement letter",
      text: "Scope, team and a written fee quote. Nothing is billed until you have signed it.",
    },
  ],
  testimonials: [
    {
      quote:
        "They told us in the first meeting which of our six worries mattered and which did not. They were right about all six.",
      who: "Founder, marine engineering company",
    },
    {
      quote:
        "Nora walked my brothers and me through Dad’s plan years before we needed it. When the time came, there were no surprises.",
      who: "Executor, family estate",
    },
    {
      quote: "The quote was a fixed number. The invoice was the same number.",
      who: "Chief financial officer, regional retailer",
    },
  ],
};

export const firm = {
  title: "A firm small enough to know your name, and to stay on your matter.",
  intro: [
    "Counsel Partners was founded in 1989 by two lawyers who left a large Boston firm to open an office above a ship chandler on Portland’s waterfront. They wanted to practise the kind of law their own families had needed and could not easily find: careful, candid and priced in advance.",
    "Thirty-seven years later we are 38 lawyers and 26 staff across two offices. The partners still answer their own phones, and the lawyer who meets you is the lawyer who does the work.",
  ],
  principles: [
    {
      title: "Plain answers",
      text: "We tell you what we think will happen, in writing, before you spend money finding out.",
    },
    {
      title: "Price before work",
      text: "Every engagement letter carries a fee quote or a stage budget. If it will change, we tell you first.",
    },
    {
      title: "The same lawyer",
      text: "Your matter has a named partner and a named associate from the first call to the final invoice.",
    },
    {
      title: "Done quietly",
      text: "We do not publicise client names without permission, and we never comment on live matters.",
    },
  ],
  timeline: [
    {
      year: "1989",
      text: "Founded on Commercial Street, Portland, by Ruth Calder and Edward Pike.",
    },
    {
      year: "1996",
      text: "First private client and family lawyers join; the firm moves to Chancery Row.",
    },
    {
      year: "2008",
      text: "Boston office opens on Lantern Wharf to serve clients across Massachusetts.",
    },
    {
      year: "2016",
      text: "The Thursday Clinic begins: free advice for tenants and small nonprofits.",
    },
    {
      year: "2024",
      text: "Fixed-fee schedules published for every routine matter we handle.",
    },
  ],
  probono:
    "Every lawyer at Counsel gives at least 50 hours a year to pro bono work. Most of it runs through the Thursday Clinic, a walk-in session at our Portland office for tenants facing eviction and small nonprofits that cannot afford a lawyer. In 2025 the clinic saw 412 people.",
};

export const offices = [
  {
    city: "Portland" as const,
    address: ["40 Chancery Row, Fourth Floor", "Portland, ME 04101"],
    phone: "+1 555 014 0220",
    hours: "Mon–Fri 8:30 am – 6:00 pm",
    note: "Thursday Clinic, 4:00 – 7:00 pm, walk-in.",
    image: office,
    imageAlt:
      "A bright meeting room with a long table and floor-to-ceiling windows",
  },
  {
    city: "Boston" as const,
    address: ["12 Lantern Wharf, Suite 600", "Boston, MA 02110"],
    phone: "+1 555 014 0240",
    hours: "Mon–Fri 8:30 am – 6:00 pm",
    note: "Visitor parking on Lantern Wharf; validate at reception.",
    image: library,
    imageAlt:
      "A long library hall lined with dark wooden bookcases and marble busts",
  },
];

/* ───────────────────────── Fees ───────────────────────── */

export const fees = {
  title: "What it costs, before it costs anything.",
  intro:
    "Most of what we do for individuals, and much of what we do for businesses, is priced as a fixed fee. Where a matter cannot be fixed, we bill by the hour against a written budget and tell you before we approach it.",
  bases: [
    {
      name: "Fixed fee",
      text: "One price for a defined piece of work, agreed in the engagement letter. Filing fees and recording costs are listed separately.",
    },
    {
      name: "Stage budget",
      text: "For transactions and disputes: a budget for each stage, approved before the stage begins. We report against it every month.",
    },
    {
      name: "Hourly",
      text: "Billed in six-minute increments at the rates below, reviewed every January. You receive a detailed statement each month.",
    },
  ],
  rates: [
    { role: "Managing partner", rate: 560 },
    { role: "Partner", rate: 495 },
    { role: "Counsel", rate: 430 },
    { role: "Senior associate", rate: 365 },
    { role: "Associate", rate: 295 },
    { role: "Paralegal", rate: 165 },
  ],
  fixed: [
    {
      audience: "individual" as Audience,
      area: "private-client",
      name: "Will, powers of attorney and healthcare directive",
      price: 950,
      per: "per person",
    },
    {
      audience: "individual" as Audience,
      area: "private-client",
      name: "Estate plan with revocable trust",
      price: 3200,
      per: "per couple",
    },
    {
      audience: "individual" as Audience,
      area: "real-estate",
      name: "Residential purchase closing",
      price: 1450,
      per: "plus title insurance",
    },
    {
      audience: "individual" as Audience,
      area: "family",
      name: "Uncontested divorce with agreed parenting plan",
      price: 3800,
      per: "per client",
    },
    {
      audience: "individual" as Audience,
      area: "family",
      name: "Prenuptial agreement",
      price: 2900,
      per: "per client",
    },
    {
      audience: "individual" as Audience,
      area: "employment",
      name: "Severance agreement review and advice",
      price: 850,
      per: "per agreement",
    },
    {
      audience: "business" as Audience,
      area: "corporate",
      name: "LLC formation with operating agreement",
      price: 1600,
      per: "single class of members",
    },
    {
      audience: "business" as Audience,
      area: "corporate",
      name: "Commercial contract review",
      price: 900,
      per: "up to 25 pages",
    },
    {
      audience: "business" as Audience,
      area: "real-estate",
      name: "Commercial lease review with issues memo",
      price: 2400,
      per: "office or retail",
    },
    {
      audience: "business" as Audience,
      area: "employment",
      name: "Employee handbook, up to 100 employees",
      price: 4500,
      per: "one state",
    },
    {
      audience: "business" as Audience,
      area: "intellectual-property",
      name: "Trademark search and federal application",
      price: 1850,
      per: "one class, plus USPTO fee",
    },
    {
      audience: "business" as Audience,
      area: "disputes",
      name: "Early case assessment",
      price: 2750,
      per: "written memo and call",
    },
  ],
  faqs: [
    {
      q: "Is the first consultation really free?",
      a: "Yes. The first thirty minutes, by phone or in person, carry no charge and no obligation. If we need longer to give you a view, we will say so and quote for it.",
    },
    {
      q: "Do you ask for a retainer?",
      a: "For hourly matters, usually yes: a deposit held in our client trust account and applied to the final invoice. Fixed-fee work is billed half on engagement and half on completion.",
    },
    {
      q: "What is not included in a fixed fee?",
      a: "Third-party costs such as court filing fees, recording fees, title insurance and courier charges. These are listed in the engagement letter and passed on at cost.",
    },
    {
      q: "What if the matter turns out to be bigger than expected?",
      a: "We stop and tell you before doing work outside the agreed scope, with a revised quote. You decide whether to proceed.",
    },
    {
      q: "Do you offer payment plans?",
      a: "For individuals, yes: fixed fees above $1,500 can be spread across up to six monthly payments with no interest.",
    },
  ],
};

/* ───────────────────────── Footer ───────────────────────── */

export const footer = {
  columns: [
    {
      heading: "Practice",
      links: areas
        .slice(0, 5)
        .map((a) => ({ to: `/practice/${a.slug}`, label: a.name }))
        .concat([{ to: "/practice", label: "All practice areas" }]),
    },
    {
      heading: "Firm",
      links: [
        { to: "/people", label: "People" },
        { to: "/firm", label: "About the firm" },
        { to: "/fees", label: "Fees & engagement" },
        { to: "/insights", label: "Insights" },
        { to: "/enquiry", label: "Make an enquiry" },
      ],
    },
  ],
  social: [
    { href: "https://www.linkedin.com/", label: "LinkedIn" },
    { href: "https://x.com/", label: "X" },
  ],
};
