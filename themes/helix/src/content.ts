/* All copy and data for Helix. Rebranding the template means editing this file. */
import fridge from "./assets/fridge.jpg";
import chip from "./assets/chip.jpg";
import lab from "./assets/lab.jpg";
import wiring from "./assets/wiring.jpg";
import wafer from "./assets/wafer.jpg";
import electronics from "./assets/electronics.jpg";

export const images = { fridge, chip, lab, wiring, wafer, electronics };

export const imageAlt: Record<keyof typeof images, string> = {
  fridge:
    "An open dilution refrigerator: braided copper heat links and steel tubes above gold-plated cold stages",
  chip: "A four-panel superconducting qubit chip in a gold carrier, clamped to a steel sample mount",
  lab: "A dilution refrigerator insert with gold stages hanging from its blue support frame in a bright lab",
  wiring:
    "Rows of gold SMA connectors and looped semi-rigid coaxial lines inside a cryostat",
  wafer:
    "Close-up of a patterned wafer, its dies shimmering red, green and violet",
  electronics:
    "An oscilloscope screen tracing a triangle wave above a square wave",
};

export const brand = {
  name: "Helix",
  legal: "Helix Quantum Systems, Inc.",
  sector: "Quantum computing",
  tagline:
    "Superconducting quantum processors, held at nine millikelvin and open for work.",
  email: "hello@helix.example",
  access: "access@helix.example",
  careers: "careers@helix.example",
  press: "press@helix.example",
  phone: "+1 555 018 4470",
  address: [
    "Helix Quantum Systems",
    "48 Tremont Works, Bay 3",
    "Boulder, CO 80301",
  ],
  gallery: "https://koative.github.io/cento/",
};

export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/systems", label: "Systems" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/research", label: "Research" },
  { to: "/pricing", label: "Pricing" },
  { to: "/team", label: "Team" },
  { to: "/careers", label: "Careers" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Hardware",
    links: [
      { to: "/systems", label: "All systems" },
      { to: "/systems/moraine-108", label: "Moraine 108" },
      { to: "/systems/tarn-l4", label: "Tarn L4" },
      { to: "/roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Access",
    links: [
      { to: "/pricing", label: "Cloud pricing" },
      { to: "/access", label: "Request access" },
      { to: "/research", label: "Papers library" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/team", label: "Team & story" },
      { to: "/careers", label: "Careers" },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ---------- Systems ---------- */

export type Access = "Cloud" | "On-premises" | "Preview";

export type System = {
  slug: string;
  name: string;
  qubits: number;
  /** Physical lattice, rows × cols, nearest-neighbour couplers. */
  rows: number;
  cols: number;
  access: Access;
  status: string;
  released: string;
  line: string;
  summary: string;
  topology: string;
  /** Median calibration values. */
  t1: number;
  t2: number;
  f1q: number;
  f2q: number;
  readout: number;
  gate2ns: number;
  layersPerSecond: number;
  baseTempMK: number;
  /** Qubits parked out of the calibration (index into the lattice). */
  parked: number[];
  shotMicros: number;
  ratePerSecond: number | null;
  site: string;
  photo: keyof typeof images;
  highlights: string[];
  bestFor: string[];
};

export const systems: System[] = [
  {
    slug: "moraine-108",
    name: "Moraine 108",
    qubits: 108,
    rows: 9,
    cols: 12,
    access: "Cloud",
    status: "Generally available",
    released: "June 2025",
    line: "Our flagship: 108 fixed-frequency transmons with tunable couplers.",
    summary:
      "Moraine is the processor most of our users run on. Every qubit talks to up to four neighbours through a tunable coupler, which lets us switch interactions fully off between gates and keep crosstalk below the noise floor of the readout chain. It is recalibrated every six hours and its full calibration record is public.",
    topology: "Square lattice, tunable couplers",
    t1: 214,
    t2: 168,
    f1q: 99.97,
    f2q: 99.71,
    readout: 99.12,
    gate2ns: 64,
    layersPerSecond: 7400,
    baseTempMK: 9,
    parked: [17, 66],
    shotMicros: 180,
    ratePerSecond: 1.6,
    site: "Boulder lab, cryostat B2",
    photo: "fridge",
    highlights: [
      "99.71% median two-qubit fidelity across 195 couplers",
      "Mid-circuit measurement and reset in 420 ns",
      "Pulse-level control on Team and Dedicated plans",
    ],
    bestFor: [
      "Error-mitigated simulation of spin models",
      "Variational chemistry at 40–80 qubits",
      "Benchmarking and device physics",
    ],
  },
  {
    slug: "serac-48",
    name: "Serac 48",
    qubits: 48,
    rows: 6,
    cols: 8,
    access: "Cloud",
    status: "Generally available",
    released: "May 2024",
    line: "The workhorse for research groups: short queues and steady numbers.",
    summary:
      "Serac was the first Helix chip with tunable couplers and it remains the most booked system on the cloud. Its queue rarely passes ten minutes, which makes it the right place to iterate on a circuit before spending time on Moraine.",
    topology: "Square lattice, tunable couplers",
    t1: 176,
    t2: 131,
    f1q: 99.95,
    f2q: 99.52,
    readout: 98.86,
    gate2ns: 72,
    layersPerSecond: 6100,
    baseTempMK: 10,
    parked: [29],
    shotMicros: 200,
    ratePerSecond: 1.1,
    site: "Boulder lab, cryostat B1",
    photo: "wiring",
    highlights: [
      "Median queue under ten minutes",
      "99.52% median two-qubit fidelity",
      "Same instruction set as Moraine",
    ],
    bestFor: [
      "Coursework and thesis projects",
      "Algorithm prototyping",
      "Noise characterisation",
    ],
  },
  {
    slug: "firn-24",
    name: "Firn 24",
    qubits: 24,
    rows: 4,
    cols: 6,
    access: "Cloud",
    status: "Generally available",
    released: "March 2023",
    line: "Free to start on. Ten QPU minutes a month on the Open plan.",
    summary:
      "Firn is our first cloud processor and the one every new account lands on. It uses fixed couplers, so two-qubit gates are slower, but it is stable, well documented and free for small workloads. Many of the circuits in our papers were first run here.",
    topology: "Square lattice, fixed couplers",
    t1: 118,
    t2: 84,
    f1q: 99.92,
    f2q: 99.08,
    readout: 98.4,
    gate2ns: 240,
    layersPerSecond: 3200,
    baseTempMK: 11,
    parked: [],
    shotMicros: 260,
    ratePerSecond: 0.45,
    site: "Boulder lab, cryostat A3",
    photo: "chip",
    highlights: [
      "Open plan includes 10 QPU minutes a month",
      "Fixed couplers, stable week to week",
      "Full pulse schedules published",
    ],
    bestFor: [
      "Learning and teaching",
      "First runs of new circuits",
      "Reproducing published results",
    ],
  },
  {
    slug: "rime-8",
    name: "Rime 8",
    qubits: 8,
    rows: 2,
    cols: 4,
    access: "On-premises",
    status: "Shipping",
    released: "September 2022",
    line: "A complete eight-qubit system for your own lab: fridge, chip and control rack.",
    summary:
      "Rime is the system we install in university and national laboratories. It arrives as a dry dilution refrigerator, a packaged eight-qubit chip, room-temperature control electronics and a two-week commissioning visit from our hardware team. Students get direct access to every layer of the stack.",
    topology: "2 × 4 lattice, fixed couplers",
    t1: 96,
    t2: 70,
    f1q: 99.9,
    f2q: 98.9,
    readout: 98.1,
    gate2ns: 260,
    layersPerSecond: 1900,
    baseTempMK: 12,
    parked: [],
    shotMicros: 300,
    ratePerSecond: null,
    site: "Installed at 11 partner laboratories",
    photo: "lab",
    highlights: [
      "Commissioned on site in two weeks",
      "Open control firmware and schematics",
      "Single 32 A three-phase supply",
    ],
    bestFor: [
      "Teaching laboratories",
      "Control-electronics research",
      "Sovereign on-site compute",
    ],
  },
  {
    slug: "tarn-l4",
    name: "Tarn L4",
    qubits: 72,
    rows: 6,
    cols: 12,
    access: "Preview",
    status: "Early access",
    released: "Preview since August 2026",
    line: "72 physical qubits encoding four logical qubits, decoded in real time.",
    summary:
      "Tarn is our error-correction testbed. Four distance-3 surface-code patches share one chip, with syndrome data streamed to an FPGA decoder that returns corrections inside the 1.1 µs cycle. Early-access users run logical circuits directly; the physical layer is visible for study.",
    topology: "Four surface-code patches, distance 3",
    t1: 228,
    t2: 182,
    f1q: 99.97,
    f2q: 99.76,
    readout: 99.3,
    gate2ns: 60,
    layersPerSecond: 900,
    baseTempMK: 8,
    parked: [],
    shotMicros: 1100,
    ratePerSecond: 2.4,
    site: "Boulder lab, cryostat C1",
    photo: "electronics",
    highlights: [
      "Logical error per cycle 0.19%",
      "Real-time decoding inside 1.1 µs",
      "Logical CNOT by lattice surgery",
    ],
    bestFor: [
      "Fault-tolerance research",
      "Decoder development",
      "Logical-level algorithm tests",
    ],
  },
  {
    slug: "cirque-256",
    name: "Cirque 256",
    qubits: 256,
    rows: 16,
    cols: 16,
    access: "Preview",
    status: "Commissioning",
    released: "Cloud access planned for Q2 2027",
    line: "Two 128-qubit modules joined by a cryogenic microwave link.",
    summary:
      "Cirque is the first Helix system built from modules. Two 128-qubit chips sit in neighbouring fridges joined by a superconducting coaxial link, so a logical register can span both. The numbers below are from the current commissioning run and will move before launch.",
    topology: "Two 8 × 16 modules, linked",
    t1: 192,
    t2: 150,
    f1q: 99.96,
    f2q: 99.6,
    readout: 99.0,
    gate2ns: 68,
    layersPerSecond: 5200,
    baseTempMK: 9,
    parked: [40, 131, 203],
    shotMicros: 190,
    ratePerSecond: null,
    site: "Boulder lab, cryostats D1 + D2",
    photo: "wafer",
    highlights: [
      "Inter-module link fidelity 98.2%",
      "Commissioning data published monthly",
      "Reserved for design partners until launch",
    ],
    bestFor: [
      "Modular architecture studies",
      "Large-register simulation",
      "Design-partner programmes",
    ],
  },
];

/* ---------- Home ---------- */

export const home = {
  title: "Helix — Superconducting quantum computers",
  heroTitle: "Quantum processors, held at nine millikelvin and open for work.",
  heroLead:
    "Helix designs, fabricates and operates superconducting quantum computers. Run circuits on Moraine 108 from the cloud today, or install a complete system in your own laboratory.",
  status: {
    system: "Moraine 108",
    state: "Online",
    queue: "14 jobs queued",
    calibrated: "Calibrated 02:40 UTC",
    temp: "9.1 mK",
  },
  stages: [
    { temp: "300 K", label: "Room-temperature flange, vacuum feedthroughs" },
    { temp: "50 K", label: "First pulse-tube stage, radiation shield" },
    { temp: "4 K", label: "Second stage, HEMT amplifiers" },
    { temp: "800 mK", label: "Still plate, helium-3 evaporation" },
    { temp: "100 mK", label: "Cold plate, attenuators and filters" },
    { temp: "9 mK", label: "Mixing chamber, Moraine 108 processor" },
  ],
  fleetTitle: "The fleet",
  fleetLead:
    "Six processors, one instruction set. Medians from this morning's calibration.",
  composerTitle: "Compose a circuit, watch the state",
  composerLead:
    "Place gates on three qubits and the simulator beside the circuit updates the state vector as you go. The same circuit, exported, runs unchanged on Firn 24 under the Open plan.",
  pipelineTitle: "From a line of code to a measured qubit",
  pipeline: [
    {
      step: "Compile",
      text: "The Helix SDK maps your circuit onto the chip lattice and routes two-qubit gates along live couplers.",
    },
    {
      step: "Schedule",
      text: "Gates become microwave pulses with nanosecond timing, shaped against this morning's calibration.",
    },
    {
      step: "Drive",
      text: "Room-temperature electronics synthesise the pulses and send them 1.8 metres down attenuated coax.",
    },
    {
      step: "Measure",
      text: "Readout resonators answer through a quantum-limited amplifier; results return in milliseconds.",
    },
  ],
  photoTitle: "Down the fridge",
  photoCaption:
    "Inside cryostat B2 with the shields removed. Each stage is colder than the one above it; the processor hangs at the bottom, below nine millikelvin.",
  wiringCaption:
    "Semi-rigid coax on the cold plate. Every qubit needs its own drive and readout lines, looped to absorb thermal contraction on cooldown.",
  chipCaption:
    "A four-module test chip in its gold carrier, before it is sealed into a sample holder and lowered into the mixing chamber.",
  researchTitle: "Recent papers",
  roadmapTitle: "Where the hardware is going",
  quote: {
    text: "We had a spin-chain simulation that stalled at forty qubits everywhere else. On Moraine the error bars finally got smaller than the effect we were looking for.",
    name: "Dr. Imke Vasquez-Lund",
    role: "Group leader, Condensed Matter Theory, Northfield Institute",
  },
  pricingTitle: "Ten free QPU minutes, every month",
  pricingLead:
    "Every account starts on the Open plan with Firn 24. Research and Team plans add Moraine, Serac, priority queues and pulse-level control.",
  closeTitle: "Bring us your hardest circuit.",
  closeLead:
    "Access requests are read by a physicist, not a form robot. Most are answered within two working days.",
};

/* ---------- Roadmap ---------- */

export type Milestone = {
  year: number;
  title: string;
  state: "Done" | "In progress" | "Planned";
  metric: string;
  items: string[];
};

export const roadmap = {
  title: "Roadmap",
  heading: "From eight noisy qubits to one hundred logical ones.",
  lead: "We publish our roadmap with the numbers attached, and we mark each milestone done only when the data behind it is in a paper or the public calibration record.",
  milestones: [
    {
      year: 2021,
      title: "First coherent transmon",
      state: "Done",
      metric: "T1 = 41 µs",
      items: [
        "Company founded by four former cryogenic-device researchers",
        "First qubit measured in a borrowed dilution refrigerator",
      ],
    },
    {
      year: 2022,
      title: "Rime 8 ships",
      state: "Done",
      metric: "98.9% two-qubit fidelity",
      items: [
        "Eight-qubit system installed at three university labs",
        "In-house niobium-on-sapphire fabrication line",
      ],
    },
    {
      year: 2023,
      title: "Firn 24 on the cloud",
      state: "Done",
      metric: "3,200 layers / s",
      items: [
        "Helix SDK 1.0 released under Apache 2.0",
        "Open plan launches with free monthly QPU minutes",
      ],
    },
    {
      year: 2024,
      title: "Tunable couplers",
      state: "Done",
      metric: "99.52% two-qubit fidelity",
      items: [
        "Serac 48 replaces fixed couplers with tunable ones",
        "Public calibration record updated every six hours",
      ],
    },
    {
      year: 2025,
      title: "Moraine 108",
      state: "Done",
      metric: "99.71% two-qubit fidelity",
      items: [
        "Flagship 108-qubit processor generally available",
        "Pulse-level access and mid-circuit measurement",
      ],
    },
    {
      year: 2026,
      title: "Logical qubits below threshold",
      state: "In progress",
      metric: "0.19% logical error / cycle",
      items: [
        "Tarn L4 preview: four distance-3 logical qubits",
        "FPGA decoder inside the 1.1 µs cycle",
        "Distance-5 patch demonstration due Q4",
      ],
    },
    {
      year: 2027,
      title: "Modular systems",
      state: "Planned",
      metric: "256 qubits, 2 modules",
      items: [
        "Cirque 256 joins two fridges with a cryogenic link",
        "Logical register spanning both modules",
      ],
    },
    {
      year: 2028,
      title: "Thirty-two logical qubits",
      state: "Planned",
      metric: "10⁻⁶ logical error target",
      items: [
        "Distance-7 surface code across four modules",
        "Logical gate set including magic-state injection",
      ],
    },
    {
      year: 2029,
      title: "Glacier",
      state: "Planned",
      metric: "100 logical qubits",
      items: [
        "First fault-tolerant Helix system",
        "Workloads beyond classical simulation in chemistry and materials",
      ],
    },
  ] satisfies Milestone[],
  principles: [
    {
      title: "Numbers, not adjectives",
      text: "Every milestone carries a measurable target. If we miss it, the roadmap says so in the next revision.",
    },
    {
      title: "Published before promoted",
      text: "A result reaches this page only after the paper or the calibration data behind it is public.",
    },
    {
      title: "Same instruction set throughout",
      text: "Code written for Firn 24 in 2023 runs on Tarn L4 today. We do not make users port twice.",
    },
  ],
  revision: "Revision 7 · published 1 October 2026",
};

/* ---------- Pricing ---------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  minutes: string;
  line: string;
  systems: string;
  features: string[];
  cta: string;
};

export const pricing = {
  title: "Cloud pricing",
  heading: "Pay for QPU time, not for seats.",
  lead: "Plans include monthly QPU time on the systems listed. Beyond that you pay on demand by the QPU-second, billed to the second, at the rates below. Prices in US dollars, excluding tax.",
  plans: [
    {
      id: "open",
      name: "Open",
      monthly: 0,
      annual: 0,
      minutes: "10 QPU minutes / month",
      line: "For learning, teaching and first experiments.",
      systems: "Firn 24 and simulators",
      features: [
        "Community queue",
        "Helix SDK and composer",
        "Public calibration data",
        "Forum support",
      ],
      cta: "Start free",
    },
    {
      id: "research",
      name: "Research",
      monthly: 1450,
      annual: 1190,
      minutes: "4 QPU hours / month",
      line: "For research groups running real experiments.",
      systems: "Firn 24, Serac 48, Moraine 108",
      features: [
        "Priority queue",
        "Mid-circuit measurement",
        "Up to 8 seats",
        "Email support, next working day",
      ],
      cta: "Request Research",
    },
    {
      id: "team",
      name: "Team",
      monthly: 6800,
      annual: 5600,
      minutes: "25 QPU hours / month",
      line: "For companies with a quantum programme.",
      systems: "All cloud systems, Tarn L4 preview",
      features: [
        "Reserved 2-hour window each week",
        "Pulse-level control",
        "Unlimited seats, SSO",
        "Named application scientist",
      ],
      cta: "Request Team",
    },
    {
      id: "dedicated",
      name: "Dedicated",
      monthly: null,
      annual: null,
      minutes: "Whole-system reservations",
      line: "Reserved hardware, or a Rime 8 in your own lab.",
      systems: "Any system, including on-premises",
      features: [
        "Reserved days or weeks of system time",
        "On-premises installation",
        "Custom calibration targets",
        "Joint research agreements",
      ],
      cta: "Talk to us",
    },
  ] satisfies Plan[],
  annualNote: "Annual billing, paid upfront. Saves about 18%.",
  faq: [
    {
      q: "What counts as QPU time?",
      a: "Only the time the processor spends executing your shots, including measurement and reset. Compilation, queueing and data transfer are free.",
    },
    {
      q: "What happens when I run out of included minutes?",
      a: "Jobs keep running at the on-demand rate for that system, unless you set a spending cap in the console, in which case new jobs wait until the next month.",
    },
    {
      q: "Do unused minutes roll over?",
      a: "On annual plans, up to one month of unused QPU time rolls into the next month. Monthly plans reset on the billing date.",
    },
    {
      q: "Can students and teachers get more free time?",
      a: "Yes. Courses can apply for a free classroom allocation of up to 20 QPU hours per term. Use the access form and choose Teaching.",
    },
    {
      q: "Is my circuit data private?",
      a: "Circuits and results are encrypted at rest, kept for 30 days unless you pin them, and never used to train anything. Calibration data is public; your workloads are not.",
    },
  ],
};

/* ---------- Research ---------- */

export type Topic =
  "Error correction" | "Hardware" | "Control" | "Benchmarking" | "Algorithms";

export type Paper = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  /** ISO date of publication. */
  date: string;
  report: string;
  topic: Topic;
  pages: number;
  abstract: string;
  findings: string[];
  figure: {
    caption: string;
    x: string;
    y: string;
    /** Each series is a list of [x, y] points; the second series is optional. */
    series: { label: string; points: [number, number][] }[];
  };
  systems: string[];
};

export const research = {
  title: "Research",
  heading: "Papers library",
  lead: "Everything we learn about the hardware is published here, with data and analysis code. Helix researchers wrote or co-wrote each of these papers; preprints are free to read.",
  topics: [
    "Error correction",
    "Hardware",
    "Control",
    "Benchmarking",
    "Algorithms",
  ] satisfies Topic[],
};

export const papers: Paper[] = [
  {
    slug: "logical-memory-below-threshold",
    title:
      "Logical memory below threshold in four parallel distance-3 surface codes",
    authors: [
      "A. Okonkwo",
      "R. Lindqvist",
      "M. Tanaka-Byrne",
      "S. Ferreira",
      "Helix Quantum Team",
    ],
    venue: "Quantum Systems Review",
    date: "2026-09-02",
    report: "HX-2026-014",
    topic: "Error correction",
    pages: 18,
    abstract:
      "We operate four distance-3 surface-code patches in parallel on a 72-qubit superconducting processor and observe a logical error per cycle of 0.19(2)%, a factor of 2.3 below the best physical qubit on the same chip. Syndrome data are decoded in real time on an FPGA with a median latency of 640 ns, inside the 1.1 µs error-correction cycle. We characterise leakage, correlated errors from cosmic-ray events and the effect of decoder latency on logical lifetime.",
    findings: [
      "Logical error per cycle 0.19(2)%, 2.3× below the best physical qubit",
      "Real-time decoding with 640 ns median latency",
      "Leakage-removal pulses cut correlated errors by 41%",
    ],
    figure: {
      caption:
        "Logical fidelity against number of error-correction cycles for the logical patch and the best physical qubit.",
      x: "QEC cycles",
      y: "Fidelity",
      series: [
        {
          label: "Logical qubit",
          points: [
            [0, 1],
            [10, 0.981],
            [20, 0.963],
            [30, 0.945],
            [40, 0.928],
            [50, 0.911],
            [60, 0.894],
          ],
        },
        {
          label: "Best physical",
          points: [
            [0, 1],
            [10, 0.957],
            [20, 0.916],
            [30, 0.877],
            [40, 0.84],
            [50, 0.804],
            [60, 0.77],
          ],
        },
      ],
    },
    systems: ["tarn-l4"],
  },
  {
    slug: "tunable-coupler-crosstalk",
    title:
      "Suppressing residual ZZ crosstalk with flux-tunable couplers at scale",
    authors: ["M. Tanaka-Byrne", "J. Aldana", "K. Mwangi", "A. Okonkwo"],
    venue: "Journal of Applied Quantum Engineering",
    date: "2025-04-14",
    report: "HX-2025-006",
    topic: "Hardware",
    pages: 12,
    abstract:
      "Residual ZZ interaction between idle neighbours limits the fidelity of parallel gates on fixed-coupler processors. We report a coupler design and bias procedure that reduces median residual ZZ across 195 couplers on a 108-qubit device to 3.1 kHz, enabling simultaneous two-qubit gates with a median error of 0.29%. We describe the calibration loop used in production.",
    findings: [
      "Median residual ZZ of 3.1 kHz over 195 couplers",
      "Parallel two-qubit gate error 0.29%",
      "Coupler bias recalibrated automatically every six hours",
    ],
    figure: {
      caption:
        "Residual ZZ coupling against coupler flux bias for a representative pair; the idle point sits at the minimum.",
      x: "Coupler bias (mΦ₀)",
      y: "ZZ (kHz)",
      series: [
        {
          label: "Pair Q41–Q42",
          points: [
            [0, 210],
            [50, 140],
            [100, 80],
            [150, 34],
            [200, 6],
            [250, 3],
            [300, 18],
            [350, 60],
            [400, 120],
          ],
        },
      ],
    },
    systems: ["moraine-108", "serac-48"],
  },
  {
    slug: "cosmic-ray-bursts",
    title:
      "Correlated error bursts from ionising radiation in a shielded dilution refrigerator",
    authors: ["S. Ferreira", "L. Haddad", "R. Lindqvist"],
    venue: "Cryogenic Devices Letters",
    date: "2025-10-30",
    report: "HX-2025-019",
    topic: "Hardware",
    pages: 9,
    abstract:
      "We record 41 days of continuous parity measurements on a 48-qubit processor and identify 312 correlated error bursts consistent with ionising-radiation impacts. Adding phonon-trapping copper islands to the substrate reduces burst footprint by a factor of four. We estimate the residual burst rate's impact on a distance-7 surface code.",
    findings: [
      "312 bursts in 41 days, one every 3.2 hours",
      "Phonon traps shrink burst footprint 4×",
      "Residual impact on distance-7 code estimated at 4 × 10⁻⁸ per cycle",
    ],
    figure: {
      caption:
        "Fraction of qubits flipped against time after an impact, with and without phonon-trapping islands.",
      x: "Time after impact (ms)",
      y: "Qubits affected (%)",
      series: [
        {
          label: "Unmitigated",
          points: [
            [0, 62],
            [5, 48],
            [10, 35],
            [15, 24],
            [20, 16],
            [25, 10],
            [30, 6],
          ],
        },
        {
          label: "Phonon traps",
          points: [
            [0, 15],
            [5, 9],
            [10, 5],
            [15, 3],
            [20, 2],
            [25, 1],
            [30, 0.5],
          ],
        },
      ],
    },
    systems: ["serac-48"],
  },
  {
    slug: "drag-pulse-leakage",
    title: "Leakage-aware DRAG pulses for 18 ns single-qubit gates",
    authors: ["K. Mwangi", "P. Oyelaran", "J. Aldana"],
    venue: "Journal of Applied Quantum Engineering",
    date: "2024-11-08",
    report: "HX-2024-021",
    topic: "Control",
    pages: 11,
    abstract:
      "Shorter single-qubit gates reduce decoherence but increase leakage to the second excited state. We derive a two-parameter DRAG correction calibrated with a closed-loop optimiser and demonstrate 18 ns gates with average error 2.6 × 10⁻⁴ and leakage below 10⁻⁵ per gate on a fixed-frequency transmon.",
    findings: [
      "18 ns single-qubit gates at 2.6 × 10⁻⁴ error",
      "Leakage below 10⁻⁵ per gate",
      "Closed-loop calibration converges in 90 seconds",
    ],
    figure: {
      caption:
        "Gate error against gate duration for standard Gaussian and leakage-aware DRAG pulses.",
      x: "Gate duration (ns)",
      y: "Error (×10⁻⁴)",
      series: [
        {
          label: "Gaussian",
          points: [
            [12, 31],
            [16, 18],
            [20, 10],
            [24, 6.8],
            [28, 5.4],
            [32, 5.1],
          ],
        },
        {
          label: "Leakage-aware DRAG",
          points: [
            [12, 7.4],
            [16, 3.1],
            [20, 2.5],
            [24, 2.6],
            [28, 2.9],
            [32, 3.3],
          ],
        },
      ],
    },
    systems: ["firn-24", "serac-48"],
  },
  {
    slug: "layer-fidelity-benchmark",
    title: "Layer fidelity: a scalable benchmark for whole-chip performance",
    authors: ["R. Lindqvist", "E. Brandt-Cole", "A. Okonkwo"],
    venue: "Quantum Systems Review",
    date: "2024-06-19",
    report: "HX-2024-011",
    topic: "Benchmarking",
    pages: 14,
    abstract:
      "Per-gate fidelities hide how a processor behaves when every qubit is busy. We define layer fidelity, the probability that a full layer of parallel gates across the chip executes without error, and measure it efficiently with randomised layer sequences. On a 48-qubit device we report a 100-qubit-equivalent layer fidelity of 0.71 and show it predicts circuit success better than averaged two-qubit error.",
    findings: [
      "Layer fidelity measured with 40 random sequences",
      "Predicts circuit success within 3%",
      "Benchmark code released under Apache 2.0",
    ],
    figure: {
      caption:
        "Measured against predicted circuit success probability for 120 random circuits.",
      x: "Predicted success",
      y: "Measured success",
      series: [
        {
          label: "Random circuits",
          points: [
            [0.2, 0.21],
            [0.3, 0.28],
            [0.4, 0.41],
            [0.5, 0.48],
            [0.6, 0.62],
            [0.7, 0.69],
            [0.8, 0.81],
            [0.9, 0.88],
          ],
        },
      ],
    },
    systems: ["serac-48"],
  },
  {
    slug: "kagome-spin-dynamics",
    title: "Error-mitigated dynamics of a 96-site kagome Heisenberg model",
    authors: [
      "I. Vasquez-Lund",
      "T. Achterberg",
      "E. Brandt-Cole",
      "Helix Quantum Team",
    ],
    venue: "Computational Physics Letters",
    date: "2026-05-12",
    report: "HX-2026-008",
    topic: "Algorithms",
    pages: 16,
    abstract:
      "We simulate quench dynamics of a frustrated Heisenberg model on a 96-site kagome lattice using 96 qubits and up to 60 Trotter layers on a superconducting processor. Combining probabilistic error amplification with symmetry verification, we recover spin correlations that agree with tensor-network results where those converge and extend beyond the time where they do not.",
    findings: [
      "96 qubits, 60 Trotter layers, 4,800 two-qubit gates",
      "Agreement with tensor networks to 2% at early times",
      "Correlations resolved past the classical convergence limit",
    ],
    figure: {
      caption:
        "Nearest-neighbour spin correlation against evolution time: error-mitigated hardware data and the tensor-network reference.",
      x: "Time (J⁻¹)",
      y: "⟨SᵢSⱼ⟩",
      series: [
        {
          label: "Moraine 108, mitigated",
          points: [
            [0, 0.25],
            [0.5, 0.12],
            [1, -0.04],
            [1.5, -0.11],
            [2, -0.13],
            [2.5, -0.12],
            [3, -0.1],
          ],
        },
        {
          label: "Tensor network",
          points: [
            [0, 0.25],
            [0.5, 0.118],
            [1, -0.042],
            [1.5, -0.108],
          ],
        },
      ],
    },
    systems: ["moraine-108"],
  },
  {
    slug: "fpga-union-find-decoder",
    title: "A union-find decoder in 640 nanoseconds",
    authors: ["L. Haddad", "P. Oyelaran", "S. Ferreira"],
    venue: "Transactions on Quantum Engineering Systems",
    date: "2026-01-21",
    report: "HX-2026-002",
    topic: "Error correction",
    pages: 10,
    abstract:
      "Real-time error correction needs a decoder faster than the syndrome cycle. We implement a pipelined union-find decoder on a mid-range FPGA that decodes distance-3 and distance-5 surface codes with median latencies of 640 ns and 910 ns, with logical accuracy within 4% of minimum-weight perfect matching.",
    findings: [
      "Median latency 640 ns at distance 3, 910 ns at distance 5",
      "Within 4% of matching-decoder accuracy",
      "Fits in 38% of the FPGA's logic",
    ],
    figure: {
      caption:
        "Decoder latency distribution at distance 3 and distance 5 over one million syndrome rounds.",
      x: "Latency (ns)",
      y: "Rounds (%)",
      series: [
        {
          label: "Distance 3",
          points: [
            [400, 1],
            [500, 9],
            [600, 31],
            [700, 38],
            [800, 15],
            [900, 5],
            [1000, 1],
          ],
        },
        {
          label: "Distance 5",
          points: [
            [600, 1],
            [700, 6],
            [800, 21],
            [900, 36],
            [1000, 25],
            [1100, 9],
            [1200, 2],
          ],
        },
      ],
    },
    systems: ["tarn-l4"],
  },
  {
    slug: "sapphire-loss-tangent",
    title:
      "Two-level-system loss in niobium-on-sapphire resonators after anneal",
    authors: ["J. Aldana", "N. Petrosyan", "M. Tanaka-Byrne"],
    venue: "Cryogenic Devices Letters",
    date: "2023-08-03",
    report: "HX-2023-009",
    topic: "Hardware",
    pages: 8,
    abstract:
      "Dielectric loss from two-level systems at material interfaces sets the coherence limit of our transmons. We measure internal quality factors of 84 coplanar resonators across six annealing recipes and find that a 1,200 °C sapphire anneal before deposition raises median single-photon Q from 1.1 million to 3.4 million.",
    findings: [
      "Median single-photon Q raised from 1.1 M to 3.4 M",
      "84 resonators across six recipes",
      "Recipe now standard on every Helix wafer",
    ],
    figure: {
      caption:
        "Internal quality factor against mean photon number for annealed and untreated substrates.",
      x: "Photon number (log₁₀)",
      y: "Qᵢ (millions)",
      series: [
        {
          label: "Annealed",
          points: [
            [0, 3.4],
            [1, 3.9],
            [2, 4.8],
            [3, 6.1],
            [4, 7.6],
            [5, 8.4],
          ],
        },
        {
          label: "Untreated",
          points: [
            [0, 1.1],
            [1, 1.4],
            [2, 2.1],
            [3, 3.2],
            [4, 4.6],
            [5, 5.5],
          ],
        },
      ],
    },
    systems: ["firn-24", "moraine-108"],
  },
];

/* ---------- Team ---------- */

export type Person = {
  name: string;
  role: string;
  group: string;
  bio: string;
  initials: string;
};

export const team = {
  title: "Team",
  heading: "Forty-one people and eleven dilution refrigerators.",
  lead: "Helix began in 2021 when four researchers who had spent a decade building qubits in university basements decided the hardware deserved a company that would publish everything it learned. We are still mostly physicists and engineers, and we still run every system ourselves.",
  story: [
    "The first Helix qubit was measured in a borrowed refrigerator on a Sunday night in March 2021. It lived for 41 microseconds, which was not remarkable, but the four of us measuring it had already decided what kind of company we wanted: one that fabricates its own chips, operates its own systems and publishes its calibration data every day.",
    "Five years later we run six processors from one lab in Boulder, ship complete systems to eleven partner laboratories and publish around eight papers a year. The calibration record has been public since the day Firn 24 went online.",
  ],
  groups: [
    "Leadership",
    "Hardware",
    "Theory & error correction",
    "Software & cloud",
  ],
  people: [
    {
      name: "Amara Okonkwo",
      initials: "AO",
      role: "Co-founder, Chief Executive",
      group: "Leadership",
      bio: "Built her first transmon as a doctoral student and has led the logical-qubit programme since 2024.",
    },
    {
      name: "Rasmus Lindqvist",
      initials: "RL",
      role: "Co-founder, Chief Scientist",
      group: "Leadership",
      bio: "Benchmarking and error-correction theorist; author of the layer-fidelity benchmark.",
    },
    {
      name: "Mei Tanaka-Byrne",
      initials: "MT",
      role: "Co-founder, Head of Hardware",
      group: "Leadership",
      bio: "Designs every Helix chip. Holds strong views on coupler geometry and sapphire suppliers.",
    },
    {
      name: "Sofia Ferreira",
      initials: "SF",
      role: "Co-founder, Head of Operations",
      group: "Leadership",
      bio: "Keeps eleven refrigerators cold and the calibration record honest.",
    },
    {
      name: "Julián Aldana",
      initials: "JA",
      role: "Fabrication Lead",
      group: "Hardware",
      bio: "Runs the niobium-on-sapphire line, from anneal to dicing.",
    },
    {
      name: "Nare Petrosyan",
      initials: "NP",
      role: "Materials Scientist",
      group: "Hardware",
      bio: "Chases two-level-system defects through every interface on the wafer.",
    },
    {
      name: "Kip Mwangi",
      initials: "KM",
      role: "Control Systems Lead",
      group: "Hardware",
      bio: "Owns the pulse stack, from waveform synthesis to cryogenic attenuators.",
    },
    {
      name: "Layla Haddad",
      initials: "LH",
      role: "Decoder Engineer",
      group: "Theory & error correction",
      bio: "Put a union-find decoder on an FPGA and got it under 640 nanoseconds.",
    },
    {
      name: "Elias Brandt-Cole",
      initials: "EB",
      role: "Application Scientist",
      group: "Theory & error correction",
      bio: "Works with Team-plan customers on simulation and chemistry workloads.",
    },
    {
      name: "Priya Oyelaran",
      initials: "PO",
      role: "Head of Software",
      group: "Software & cloud",
      bio: "Leads the SDK, compiler and the cloud scheduler.",
    },
    {
      name: "Tomás Achterberg",
      initials: "TA",
      role: "Developer Relations",
      group: "Software & cloud",
      bio: "Writes the tutorials and answers the forum, usually before breakfast.",
    },
  ] satisfies Person[],
  facts: [
    { label: "Founded", value: "March 2021, Boulder" },
    { label: "Lab", value: "2,400 m², 11 cryostats" },
    { label: "Fab", value: "Class 100 cleanroom, 100 mm wafers" },
    { label: "Funding", value: "Series B, 2025" },
  ],
};

/* ---------- Careers ---------- */

export type Opening = {
  slug: string;
  title: string;
  group: string;
  location: string;
  type: string;
  summary: string;
  duties: string[];
  needs: string[];
};

export const careers = {
  title: "Careers",
  heading: "Help us build the cold part of the future.",
  lead: "We hire physicists, engineers and software people who like to see their work measured. Salaries are published with every role, and everyone holds equity.",
  perks: [
    "Salary band published on every role",
    "Equity for every employee, ten-year exercise window",
    "Four-day lab weeks during fridge warm-ups, which is less often than you think",
    "Conference and publication budget of $6,000 a year",
    "Relocation support to Boulder, including visa sponsorship",
    "Full health, dental and vision cover for you and dependants",
  ],
  process: [
    {
      step: "Introduction call",
      text: "Thirty minutes with the hiring manager about the role and your work.",
    },
    {
      step: "Technical conversation",
      text: "A discussion of something you built or measured. No whiteboard puzzles.",
    },
    {
      step: "Lab day",
      text: "Meet the team, see the fridges and work through a real problem with us.",
    },
    {
      step: "Offer",
      text: "Within five working days of the lab day, with salary, equity and start date in writing.",
    },
  ],
  openings: [
    {
      slug: "cryogenic-engineer",
      title: "Cryogenic Systems Engineer",
      group: "Hardware",
      location: "Boulder, on site",
      type: "Full time · $142,000–$176,000",
      summary:
        "Own the reliability of our dilution refrigerators, from pulse tubes to mixing-chamber thermometry.",
      duties: [
        "Run cooldowns and warm-ups across eleven cryostats",
        "Design wiring upgrades for the 256-qubit module",
        "Track and reduce unplanned downtime",
      ],
      needs: [
        "Hands-on experience with dilution refrigerators",
        "Comfort with vacuum, helium handling and thermometry",
        "A habit of writing things down",
      ],
    },
    {
      slug: "device-physicist",
      title: "Superconducting Device Physicist",
      group: "Hardware",
      location: "Boulder, on site",
      type: "Full time · $150,000–$190,000",
      summary:
        "Characterise new chip designs and turn what you learn into the next tape-out.",
      duties: [
        "Measure coherence, coupling and loss on new devices",
        "Work with fabrication on process changes",
        "Publish results with the team",
      ],
      needs: [
        "PhD in physics or equivalent experience",
        "Experience measuring superconducting circuits",
        "Python for data analysis",
      ],
    },
    {
      slug: "fpga-engineer",
      title: "FPGA Engineer, Real-time Decoding",
      group: "Theory & error correction",
      location: "Boulder or remote (US)",
      type: "Full time · $155,000–$195,000",
      summary:
        "Make error-correction decoders faster than the cycle they run inside.",
      duties: [
        "Extend the union-find decoder to distance 7",
        "Integrate decoders with the control stack",
        "Profile latency to the nanosecond",
      ],
      needs: [
        "Production experience with Verilog or VHDL",
        "Low-latency pipeline design",
        "Curiosity about error correction; we teach the rest",
      ],
    },
    {
      slug: "qec-theorist",
      title: "Quantum Error Correction Researcher",
      group: "Theory & error correction",
      location: "Boulder or remote (US/EU)",
      type: "Full time · $160,000–$205,000",
      summary: "Design the codes and logical operations Glacier will run.",
      duties: [
        "Study lattice surgery and magic-state schemes on our hardware",
        "Model correlated noise from measured data",
        "Co-author papers with the hardware team",
      ],
      needs: [
        "Publication record in quantum error correction",
        "Comfort with real device noise, not only ideal models",
        "Strong numerical skills",
      ],
    },
    {
      slug: "compiler-engineer",
      title: "Compiler Engineer",
      group: "Software & cloud",
      location: "Remote (US/EU)",
      type: "Full time · $145,000–$185,000",
      summary:
        "Map circuits onto live lattices, routing around parked qubits in milliseconds.",
      duties: [
        "Improve routing and gate scheduling in the Helix compiler",
        "Use calibration data to pick the best qubits per job",
        "Keep compile times under 200 ms",
      ],
      needs: [
        "Experience with compilers or combinatorial optimisation",
        "Rust or C++ and Python",
        "Quantum background welcome, not required",
      ],
    },
    {
      slug: "developer-advocate",
      title: "Developer Advocate",
      group: "Software & cloud",
      location: "Remote (US/EU)",
      type: "Full time · $118,000–$148,000",
      summary:
        "Teach researchers and students to get real results from real hardware.",
      duties: [
        "Write tutorials and run workshops",
        "Answer forum questions and turn them into docs",
        "Represent users in product planning",
      ],
      needs: [
        "Experience writing technical tutorials",
        "Working knowledge of quantum circuits",
        "Patience with first-time questions",
      ],
    },
  ] satisfies Opening[],
};

/* ---------- Request access ---------- */

export const access = {
  title: "Request access",
  heading: "Request access",
  lead: "Tell us what you want to run. A Helix physicist reads every request and replies within two working days with an account, a plan recommendation or a few questions.",
  roles: [
    "Researcher or faculty",
    "Student",
    "Engineer in industry",
    "Teacher",
    "Other",
  ],
  uses: [
    "Research",
    "Teaching",
    "Industry evaluation",
    "Error-correction study",
    "On-premises system",
  ],
  expect: [
    {
      title: "Within two working days",
      text: "A reply from a physicist on our access team, not an automated sequence.",
    },
    {
      title: "An Open account at once",
      text: "Every approved request gets Firn 24 and 10 QPU minutes immediately while we set up anything larger.",
    },
    {
      title: "A plan that fits",
      text: "We recommend the smallest plan that covers your workload, and say so if Open is enough.",
    },
  ],
};

export const notFound = {
  title: "Page not found",
  heading: "This page decohered.",
  lead: "The address does not match any page on the site. It may have moved when we reorganised the papers library.",
};
