import portCranes from "./assets/port-cranes.jpg";
import containers from "./assets/containers.jpg";
import sleeper from "./assets/sleeper-corridor.jpg";
import pylons from "./assets/pylons.jpg";
import station from "./assets/station.jpg";
import bridgeSteel from "./assets/bridge-steel.jpg";
import tram from "./assets/tram.jpg";
import underbridge from "./assets/underbridge.jpg";
import craneStairs from "./assets/crane-stairs.jpg";
import desk from "./assets/desk.jpg";
import notebook from "./assets/writer-notebook.jpg";

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Dispatch",
  writer: "Ines Calder",
  tagline: "A Sunday letter on the machinery of ordinary life.",
  pitch:
    "Every Sunday at 7 a.m., one long letter about the ports, wires, rails and repair crews that keep a normal day running — reported on foot, written for people who notice things.",
  readers: "41,200",
  since: "March 2019",
  email: "ines@dispatch.example",
  sponsorEmail: "sponsors@dispatch.example",
  phone: "+1 555 0143 228",
  phoneHref: "tel:+15550143228",
  postal: ["Dispatch", "PO Box 1187", "Portland, ME 04104"],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Bluesky", href: "https://bsky.app/" },
    { label: "Mastodon", href: "https://joinmastodon.org/" },
  ],
};

export const nav = [
  { to: "/archive", label: "Archive" },
  { to: "/topics", label: "Topics" },
  { to: "/about", label: "About" },
  { to: "/sponsor", label: "Sponsor" },
];

export const footerColumns = [
  {
    title: "Read",
    links: [
      { to: "/", label: "Latest letter" },
      { to: "/archive", label: "Archive" },
      { to: "/topics", label: "Topics" },
    ],
  },
  {
    title: "Dispatch",
    links: [
      { to: "/about", label: "About the writer" },
      { to: "/subscribe", label: "Subscribe" },
      { to: "/sponsor", label: "Sponsor an issue" },
    ],
  },
];

/* ----------------------------------------------------------------- topics */

export type TopicId = "ports" | "rail" | "energy" | "upkeep" | "desk";

export type Topic = { id: TopicId; name: string; line: string; intro: string };

export const topics: Topic[] = [
  {
    id: "ports",
    name: "Ports & Freight",
    line: "Cranes, tides, boxes and the people who stack them.",
    intro:
      "Almost everything you own arrived by sea. These letters follow it ashore: the crane drivers, pilots, lashers and planners who turn a ship into a Tuesday delivery, and the tide tables that still decide when any of it can happen.",
  },
  {
    id: "rail",
    name: "Rail & Transit",
    line: "Timetables as promises, and the crews who keep them.",
    intro:
      "A timetable is a public promise printed in very small type. I ride the early trains, the sleepers and the trams nobody photographs, and ask the people running them what keeping that promise actually takes.",
  },
  {
    id: "energy",
    name: "Energy & Grid",
    line: "Where the hum in the wires comes from.",
    intro:
      "The grid is the largest machine most of us will ever touch, and we touch it by flicking a switch. These letters walk the lines — pylons, substations, control rooms — and try to make the invisible slightly less so.",
  },
  {
    id: "upkeep",
    name: "Upkeep",
    line: "Paint, rivets, manholes: the art of things not breaking.",
    intro:
      "Nobody cuts a ribbon for a repainted bridge. Upkeep is the quiet, permanent work of keeping built things standing, and it is where I have met the most patient people I know.",
  },
  {
    id: "desk",
    name: "The Desk",
    line: "How the letter gets made, and what I got wrong.",
    intro:
      "Notes from the other side of the letter: how I report, why I still draft on paper, and the yearly accounting of everything I had to correct.",
  },
];

/* ------------------------------------------------------------------ posts */

export type Block =
  | { type: "p"; text: string; note?: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; src: string; alt: string; caption: string };

export type Post = {
  slug: string;
  kind: "letter" | "field-note";
  number: number;
  date: string;
  dateline: string;
  title: string;
  dek: string;
  topic: TopicId;
  image?: { src: string; alt: string; credit: string; ratio: string };
  body: Block[];
};

/** Field notes are for paying readers; this many blocks stay readable before the gate. */
export const previewBlocks = 3;

export const posts: Post[] = [
  {
    slug: "the-crane-that-waits-for-the-tide",
    kind: "letter",
    number: 341,
    date: "2026-10-18",
    dateline: "Lyttelton",
    title: "The crane that waits for the tide",
    dek: "A ship-to-shore crane can lift forty tonnes in ninety seconds. Most of its shift is spent waiting for water.",
    topic: "ports",
    image: {
      src: portCranes,
      alt: "Two green ship-to-shore container cranes on a quay beside a stacked container ship, brown hills behind",
      credit: "Bernard Spragg, CC0",
      ratio: "1024 / 643",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — I spent Thursday in a crane cab forty-two metres above the harbour, and the most important instrument in it was not the joystick. It was a laminated tide table, curling at one corner, taped to the window at eye level.",
      },
      {
        type: "p",
        text: "Rāwiri, who has driven cranes on this quay for nineteen years, tapped it before he said hello. The ship we were due to work, a 4,000-box feeder, could only berth in the two hours either side of high water. Miss that window and nobody lifts anything until the next one, twelve and a half hours later.",
        note: "Semi-diurnal tides: two highs and two lows a day, each cycle roughly 12 hours 25 minutes. The window drifts about 50 minutes later every day, which is why crane rosters here are written a fortnight at a time.",
      },
      { type: "h2", text: "Ninety seconds, then an hour" },
      {
        type: "p",
        text: "When the ship arrives, the crane is astonishing. The spreader drops, locks onto a box with a clunk you feel in your teeth, and the container is on a truck chassis in a minute and a half. Rāwiri moved thirty-one boxes an hour while telling me about his daughter's netball team.",
      },
      {
        type: "p",
        text: "Then the hatch covers need lifting, the lashing gang needs to clear a bay, a reefer box needs its power cable unplugged, and the crane waits. Across a full shift, he estimated, the spreader is actually moving for about forty percent of the time. The rest is coordination — radios, hand signals, a planner in a portacabin redrawing the stow plan as the ship settles.",
      },
      {
        type: "quote",
        text: "People think the job is lifting. The job is waiting properly, so that when it's time to lift, nobody is in the way.",
        cite: "Rāwiri, crane driver",
      },
      {
        type: "p",
        text: "I keep coming back to that phrase, waiting properly. It describes most of the infrastructure I write about: long stretches of readiness, punctuated by short bursts that only look easy because of the readiness.",
      },
      { type: "h2", text: "What I'm reading" },
      {
        type: "list",
        items: [
          "A 1964 harbour board report on the first container trials here, found in the port's lunchroom bookshelf.",
          "The pilots' handbook for the inner harbour, which describes the channel with the tenderness of a love letter.",
          "Your replies to last week's letter about sleeper trains. Seventy-three of you have slept in a corridor. I'm sorry.",
        ],
      },
      {
        type: "p",
        text: "Next Sunday: the people who decide which container goes on top. Until then, look at the tide table of the nearest harbour to you. Somewhere, a crane is waiting properly.",
      },
    ],
  },
  {
    slug: "how-a-container-finds-its-stack",
    kind: "field-note",
    number: 118,
    date: "2026-10-14",
    dateline: "Lyttelton",
    title: "How a container finds its stack",
    dek: "The yard planner's puzzle: every box in the right place, in the right order, before the ship even arrives.",
    topic: "ports",
    image: {
      src: containers,
      alt: "Container stacks in green, red, orange and teal on a paved yard under a blue sky",
      credit: "freestocks.org, CC0",
      ratio: "1024 / 683",
    },
    body: [
      {
        type: "p",
        text: "A Field Note for paying readers, from the portacabin I mentioned on Sunday. Mereana plans the yard: roughly 6,000 container slots on a strip of reclaimed land, and a ship due every thirty hours.",
      },
      {
        type: "p",
        text: "Her rule is simple to say and brutal to follow: the box that leaves first must be on top. Every time a straddle carrier has to lift one container off another to reach it — a 'reshuffle' — the port loses about four minutes and burns diesel for nothing.",
        note: "The port's own target is fewer than 0.3 reshuffles per box moved. In the week I visited, they averaged 0.41, mostly because one ship arrived out of order.",
      },
      {
        type: "p",
        text: "So she stacks by destination, then by weight, then by the order the ship's stow plan wants them. Heavy boxes go low in the ship, so they must come out of the yard first, so they must be on top in the yard. Everything is upside down from where it will end up.",
      },
      { type: "h2", text: "The screen and the window" },
      {
        type: "p",
        text: "She has software that proposes a plan. She also has a window that looks onto the yard, and she trusts the window more. The software does not know that row F floods in a southerly, or that one straddle carrier's hydraulics have been sulking since August.",
      },
      {
        type: "quote",
        text: "The system is right about the boxes. I'm right about the yard.",
        cite: "Mereana, yard planner",
      },
      {
        type: "p",
        text: "I left with a photocopy of her hand-drawn yard map, annotated in three colours of biro, and a strong suspicion that half the world's freight depends on drawings like it.",
      },
    ],
  },
  {
    slug: "a-night-on-the-sleeper",
    kind: "letter",
    number: 340,
    date: "2026-10-11",
    dateline: "Inverness to London",
    title: "A night on the sleeper, measured in doors",
    dek: "Eleven hours, 568 miles and one attendant who knows the sound of every cabin door on the train.",
    topic: "rail",
    image: {
      src: sleeper,
      alt: "Narrow sleeper-train corridor lit warm yellow, cabin doors on one side and windows on the other",
      credit: "Alex Liivet, CC0",
      ratio: "1350 / 1800",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — the corridor of a sleeper train is barely wider than my shoulders, and between Inverness and London I watched one man walk it twenty-two times. Callum is the attendant for coaches F through J. He does not need cabin numbers; he knows which door is which by the sound of its latch.",
      },
      {
        type: "p",
        text: "His night starts at 19:30 with bedding, water bottles and a clipboard of breakfast orders. It ends at 07:45 at Euston, when he walks the corridor knocking on doors with a rhythm he swears is gentler for the people who asked to be woken last.",
      },
      { type: "h2", text: "The quiet engineering of sleep" },
      {
        type: "p",
        text: "Sleeping on a train is an engineering problem disguised as hospitality. The track has to be smooth enough; the couplings have to be taut enough that the coaches don't jolt when the train brakes; the timetable has to be slow enough to arrive at a civilised hour rather than at 4 a.m.",
        note: "The train is deliberately held at several stations overnight. It could reach London two hours earlier — nobody wants it to.",
      },
      {
        type: "p",
        text: "That last point delighted me. The sleeper is one of the few trains in the country scheduled to go slower than it can. Its punctuality is measured not in minutes saved, but in whether you slept through Crewe.",
      },
      {
        type: "quote",
        text: "If they don't notice me, I've done it right. If they don't notice the train, the driver's done it right.",
        cite: "Callum, sleeper attendant",
      },
      {
        type: "p",
        text: "I did not sleep through Crewe. I lay awake listening to doors, trying to hear what he heard. Next time, I'll bring earplugs and trust the professionals.",
      },
    ],
  },
  {
    slug: "what-the-pylons-are-saying",
    kind: "letter",
    number: 339,
    date: "2026-10-04",
    dateline: "Somerset Levels",
    title: "What the pylons are saying",
    dek: "That hum on a damp morning is the sound of electricity leaking into the air. A line engineer explains why it's fine.",
    topic: "energy",
    image: {
      src: pylons,
      alt: "Lattice electricity pylons crossing a frosted field into fog, wires fading into the grey sky",
      credit: "allispossible.org.uk, CC BY 2.0",
      ratio: "1800 / 1350",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — stand under a 400-kilovolt line on a foggy morning and it crackles, a sound like bacon in a distant pan. For years I assumed it meant something was wrong. Priya, who inspects transmission lines for a living, laughed at me for a full ten seconds.",
      },
      {
        type: "p",
        text: "It's called corona discharge. At very high voltages, the air right around the conductor ionises, especially when it's wet. A little energy escapes as sound, a faint violet glow you can see on very dark nights, and a whiff of ozone.",
        note: "Engineers bundle conductors in twos, threes or fours partly to reduce corona: spreading the same current over more surface lowers the electric field at any one point.",
      },
      { type: "h2", text: "Walking the line" },
      {
        type: "p",
        text: "Priya's patch is about 140 kilometres of line. She walks or drives parts of it every week, binoculars round her neck, looking for cracked insulators, birds' nests on crossarms, and trees that have grown politely towards the wires since spring.",
      },
      {
        type: "p",
        text: "Drones help now. But she still climbs, harnessed, when a drone photo shows something she wants to touch. 'Steel tells you things through your hands,' she said, and then apologised for sounding like a fridge magnet.",
      },
      {
        type: "quote",
        text: "The hum means the line is alive. Silence on a foggy morning — that's when I'd start worrying.",
        cite: "Priya, transmission line inspector",
      },
      {
        type: "p",
        text: "I've listened differently since. The pylons near my house hum in a slightly higher key than the ones by the river. Priya says that's probably the voltage. I prefer to think they have accents.",
      },
    ],
  },
  {
    slug: "the-0641-is-a-promise",
    kind: "field-note",
    number: 117,
    date: "2026-09-30",
    dateline: "Perth",
    title: "The 06:41 is a promise kept 312 times a year",
    dek: "Inside the control room that decides, every morning, whether the first train of the day leaves on time.",
    topic: "rail",
    image: {
      src: station,
      alt: "Wide view of a modern station concourse under a steel roof, trains waiting at numbered platforms below",
      credit: "Abesty, CC0",
      ratio: "1800 / 1013",
    },
    body: [
      {
        type: "p",
        text: "For paying readers, a follow-up to a question many of you asked after the sleeper letter: who actually decides that a train is ready to leave? I spent a morning in a network control room to find out.",
      },
      {
        type: "p",
        text: "The first departure on the line I watched is the 06:41. It runs Monday to Saturday, 312 times a year, and the controllers treat it like a reputation. If the first train is late, every train after it inherits the delay.",
        note: "Controllers call this 'reactionary delay'. On a busy suburban line, one late first train can add up to 40 minutes of lost time across the morning peak.",
      },
      {
        type: "p",
        text: "At 05:50 the driver signs on. At 06:05 the train is prepared: brakes tested, doors cycled, cab radio checked against the control room. At 06:30 the signaller sets the route. At 06:41, if everything has gone right, the doors close and nothing interesting happens at all.",
      },
      { type: "h2", text: "When something goes wrong" },
      {
        type: "p",
        text: "On my morning, a door on the third car refused to lock. The controller had ninety seconds to decide: hold the train, swap the unit, or run it with one door isolated and a staff member posted beside it. She chose the last, and the 06:41 left at 06:43.",
      },
      {
        type: "p",
        text: "Two minutes late. In the log it is a failure. In the room, people clapped.",
      },
    ],
  },
  {
    slug: "who-paints-the-bridge",
    kind: "letter",
    number: 338,
    date: "2026-09-27",
    dateline: "Boston",
    title: "Who paints the bridge",
    dek: "A bridge painter's year: four coats, one colour, and a structure that is never, technically, finished.",
    topic: "upkeep",
    image: {
      src: bridgeSteel,
      alt: "Underside of a road bridge seen from below: sea-green painted steel beams and gusset plates",
      credit: "MassDOT, public domain",
      ratio: "1024 / 768",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — there's a myth about a famous bridge that is painted continuously, end to end, so that by the time the crew finishes they must start again. Dana, who has painted steel bridges for twenty-six years, says the myth is wrong in the details and right in spirit.",
      },
      {
        type: "p",
        text: "Paint on steel is not decoration. It is the only thing between the bridge and rust. A modern coating system is three or four layers — a zinc-rich primer, an intermediate coat, a topcoat that resists sunlight — and it can last twenty-five years if the surface was prepared properly. Most of the job is preparation.",
        note: "Blast cleaning to bare metal, then priming within hours before flash rust appears. Dana's crew measures surface profile with a gauge the size of a coin.",
      },
      { type: "h2", text: "The colour is a decision" },
      {
        type: "p",
        text: "The green under the bridge in this week's photograph wasn't chosen by an artist. It was chosen by a committee in 1987, approved by a state agency, matched against a numbered paint standard, and reordered faithfully ever since. Dana carries a fan deck with the official chip in it, worn soft at the edges.",
      },
      {
        type: "quote",
        text: "You don't get to see it finished. You get to see the bit you did hold up through a winter. That's the reward.",
        cite: "Dana, bridge painter",
      },
      {
        type: "p",
        text: "I asked what she thinks about when she drives over a bridge her crew has painted. 'The underside,' she said, without hesitation. 'Nobody looks at the underside. That's where it rusts first.'",
      },
    ],
  },
  {
    slug: "the-tram-that-outlived-its-overpass",
    kind: "letter",
    number: 337,
    date: "2026-09-20",
    dateline: "On the 11 line",
    title: "The tram that outlived its overpass",
    dek: "A forty-year-old tram, a road bridge built over its route, and the strange dignity of infrastructure that refuses to leave.",
    topic: "rail",
    image: {
      src: tram,
      alt: "A cream and orange tram running on street tracks beneath a concrete road overpass",
      credit: "Artyom Svetlov, CC BY 4.0",
      ratio: "1800 / 1350",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — the tram on the 11 line runs under a six-lane overpass that was built, in the 1980s, explicitly to replace it. The overpass was supposed to carry buses. The tram was supposed to be retired. Forty years later, the tram is still running, and the overpass mostly carries lorries.",
      },
      {
        type: "p",
        text: "I rode it end to end with Olga, a depot fitter who has kept trams like this one moving since before the overpass opened. She calls them 'the old ladies', with the exact tone people use for difficult, beloved relatives.",
      },
      { type: "h2", text: "Why it stayed" },
      {
        type: "p",
        text: "The reasons are boring and that is the point. The track was already paid for. The depot was already there. The tram carries more people per driver than any bus. And every time a replacement plan reached a budget meeting, someone asked who would pay to dig the rails up.",
        note: "Removing street track can cost more per kilometre than maintaining it for a decade. Many 'temporary' tram lines survive on that arithmetic alone.",
      },
      {
        type: "p",
        text: "Infrastructure has inertia. We usually talk about that as a problem — the old thing that won't go away. On the 11 line it looks more like loyalty.",
      },
      {
        type: "quote",
        text: "Every new mayor has a plan to get rid of her. Every new mayor rides her to the depot for the photograph.",
        cite: "Olga, depot fitter",
      },
    ],
  },
  {
    slug: "a-second-city-under-the-bridge",
    kind: "letter",
    number: 336,
    date: "2026-09-13",
    dateline: "James River",
    title: "A second city under the bridge",
    dek: "The underslung walkways, inspection gantries and pigeon kingdoms that live beneath every big bridge.",
    topic: "upkeep",
    image: {
      src: underbridge,
      alt: "Black-and-white photograph of a narrow pedestrian walkway hung beneath the deck of a large concrete bridge",
      credit: "David Haas, HAER, public domain",
      ratio: "1728 / 1386",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — this week's photograph is of a walkway that hangs beneath a highway bridge. Above it, traffic. Below it, a river. Inside it, a quiet, echoing corridor that most people crossing the bridge will never know is there.",
      },
      {
        type: "p",
        text: "Big bridges are full of these hidden spaces: inspection gantries that roll along rails under the deck, box girders you can walk through upright, ladders inside towers. They exist because a bridge has to be touched, regularly, by someone with a torch and a notebook.",
      },
      {
        type: "figure",
        src: craneStairs,
        alt: "Blue steel stairways zigzagging up the leg of a port crane against a deep blue sky",
        caption:
          "Not a bridge, but the same idea: the stairs built into a crane leg so that a person can reach every part of it.",
      },
      { type: "h2", text: "Designed to be visited" },
      {
        type: "p",
        text: "Older bridges were often designed without much thought for inspection, and engineers now rope down them like climbers. Newer ones are designed to be visited: handrails, lighting, drainage, even little shelves for clipboards.",
        note: "Most jurisdictions require a hands-on inspection of major bridges every two years, plus underwater inspections of the piers every five.",
      },
      {
        type: "p",
        text: "I find these spaces moving. They are architecture for an audience of one: the inspector who walks through every couple of years and checks that nothing has changed. Most of the time, nothing has. That is the point.",
      },
    ],
  },
  {
    slug: "stairs-to-the-cab",
    kind: "field-note",
    number: 116,
    date: "2026-09-09",
    dateline: "Mombasa",
    title: "Stairs to the cab: a crane driver's commute",
    dek: "Two hundred and eight steps, a lift that works on Tuesdays, and the view at the top.",
    topic: "ports",
    image: {
      src: craneStairs,
      alt: "Blue steel stairways zigzagging up the leg of a port crane against a deep blue sky",
      credit: "Ministry of East African Affairs, public domain",
      ratio: "1 / 1",
    },
    body: [
      {
        type: "p",
        text: "A short Field Note for paying readers. Before you can lift a container, you have to reach the cab, and on an older ship-to-shore crane that means stairs: flight after flight zigzagging up one leg, then a walk along the boom.",
      },
      {
        type: "p",
        text: "Amani counted them for me: 208 steps. The crane has a lift, which works — in his words — 'on Tuesdays and when the inspector visits'. He climbs at the start of every shift and does not come down for lunch.",
        note: "Newer cranes increasingly use remote operation from a ground-level office. Amani has tried it and says it is 'like driving a car by phone'.",
      },
      {
        type: "p",
        text: "At the top, he sits in a glass-floored cab and looks straight down between his feet at the deck of a ship. He says the glass floor took a month to get used to. Now he finds offices with carpet slightly disorienting.",
      },
      { type: "h2", text: "The view" },
      {
        type: "p",
        text: "I asked what he looks at when there's nothing to lift. The weather coming in, he said. The dhows going out. And once, unforgettably, a whale shark in the channel, which stopped the whole port for twenty minutes while everyone with a radio told everyone else.",
      },
    ],
  },
  {
    slug: "why-i-still-draft-on-a-typewriter",
    kind: "letter",
    number: 335,
    date: "2026-09-06",
    dateline: "The desk",
    title: "Why I still draft on a typewriter",
    dek: "Not nostalgia. A machine with no delete key forces you to decide what the sentence is before you write it.",
    topic: "desk",
    image: {
      src: desk,
      alt: "A teal portable typewriter on a dark wooden desk beside a stack of notebooks",
      credit: "suzyhazelwood, CC0",
      ratio: "1024 / 576",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — many of you have asked about the photo on the About page, so here is the confession: the first draft of every Sunday letter is typed on a 1971 portable typewriter, on the kitchen table, on Friday night.",
      },
      {
        type: "p",
        text: "It isn't nostalgia, or not only. A typewriter has no delete key, no tabs, no notifications. It makes deleting expensive, which makes me think before I type. I write fewer, longer sentences on it, and fewer of them start with 'So'.",
      },
      { type: "h2", text: "The process, start to finish" },
      {
        type: "list",
        items: [
          "Monday to Wednesday: reporting. Notebooks, recordings, photographs, a lot of standing around in hi-vis.",
          "Thursday: I read my notes and write the letter's last line first, by hand.",
          "Friday night: typewriter draft, start to finish, no stopping.",
          "Saturday: the draft is retyped into the computer, edited hard, fact-checked against recordings.",
          "Sunday, 07:00: it goes out, to all 41,200 of you, in your own time zone.",
        ],
      },
      {
        type: "p",
        text: "The retyping step matters most. Copying a draft by hand is the closest thing I have to an editor: every weak sentence becomes obvious when you have to type it twice.",
        note: "The typewriter is an Olympia Traveller de Luxe, bought for $40 at a church sale in 2018. Its 'e' sticks. I've grown to like it.",
      },
      {
        type: "p",
        text: "Your methods are welcome, as always — reply to this letter. I read every reply, though it sometimes takes me a fortnight.",
      },
    ],
  },
  {
    slug: "the-substation-at-the-end-of-my-street",
    kind: "letter",
    number: 328,
    date: "2026-07-19",
    dateline: "Portland",
    title: "The substation at the end of my street",
    dek: "A fenced yard of grey boxes that I walked past for six years before I asked what it did.",
    topic: "energy",
    body: [
      {
        type: "p",
        text: "Dear reader — at the end of my street there is a fenced yard of grey metal boxes, a few porcelain insulators, a sign with a lightning bolt, and a gate that is always locked. For six years I walked my dog past it and never wondered. This summer I finally emailed the utility.",
      },
      {
        type: "p",
        text: "It's a distribution substation. Electricity arrives at 69,000 volts on the line along the railway, and the big transformer in the middle steps it down to 12,470 volts, which then runs along the poles on my street to smaller transformers, which step it down again to the 240 volts in my kitchen.",
        note: "Some of you outside North America will recognise different numbers: 11 kV, 33 kV, 230 V. The principle — step down, step down again — is the same everywhere.",
      },
      { type: "h2", text: "The most important box" },
      {
        type: "p",
        text: "Mark, the engineer who let me inside the fence, pointed at a modest cabinet in the corner and said it was the most important thing in the yard. It holds the protection relays: the devices that detect a fault and trip a breaker in a fraction of a second, before a short circuit becomes a fire.",
      },
      {
        type: "p",
        text: "Our whole neighbourhood's safety, he said, rests on that cabinet being boring. It gets tested on schedule, logged, and left alone. In twelve years it has tripped for real eight times, each time for under a tenth of a second.",
      },
      {
        type: "p",
        text: "I walk the dog past it differently now. Not with awe exactly. More like the nod you give a neighbour who once helped you jump-start your car.",
      },
    ],
  },
  {
    slug: "the-manhole-cover-census",
    kind: "letter",
    number: 325,
    date: "2026-06-28",
    dateline: "Portland",
    title: "The manhole cover census",
    dek: "I counted every iron cover within a mile of my house. There are 412, and they tell the city's history in cast iron.",
    topic: "upkeep",
    body: [
      {
        type: "p",
        text: "Dear reader — over four Saturday mornings in June, I walked every street within a mile of my house and photographed every manhole cover. There are 412. My neighbours now believe, correctly, that I am unwell.",
      },
      {
        type: "p",
        text: "But the covers are a map. Each one names its owner — water, sewer, telecoms, the old gas company that hasn't existed since 1958 — and many carry a foundry mark and a year. Read them in order and you can watch the neighbourhood being built, pipe by pipe.",
      },
      { type: "h2", text: "What the census found" },
      {
        type: "list",
        items: [
          "The oldest cover is from 1911, on the corner by the bakery, cast for a sewer district that merged into the city in 1934.",
          "Telecoms covers multiplied in three waves: copper in the 1960s, cable TV in the 1980s, fibre in the last decade.",
          "Sixty-one covers are stamped with a gas company that no longer exists. The pipes beneath them are still in use.",
          "Four covers rock when you step on them. I reported all four. Two have been fixed.",
        ],
      },
      {
        type: "p",
        text: "Covers are made of cast iron because it is heavy, cheap and hard to steal. They're round because a round cover cannot fall through its own hole, which you may already know from a famous job-interview question. The foundry worker I spoke to finds that question very tiresome.",
        note: "Not all covers are round. Square and rectangular covers are common for shallow utility boxes, where nobody could fall far even if the lid did.",
      },
      {
        type: "p",
        text: "If you run your own census, send me the oldest cover you find. The current record among readers is 1887, from Glasgow.",
      },
    ],
  },
  {
    slug: "everything-i-got-wrong-in-2025",
    kind: "letter",
    number: 309,
    date: "2025-12-28",
    dateline: "The desk",
    title: "Everything I got wrong in 2025",
    dek: "The annual corrections letter: nine errors, two of them embarrassing, all of them fixed in the archive.",
    topic: "desk",
    image: {
      src: notebook,
      alt: "A hand writing with a pen in an open notebook on a desk by a window",
      credit: "Shixart1985, CC BY 2.0",
      ratio: "1800 / 1200",
    },
    body: [
      {
        type: "p",
        text: "Dear reader — every year, the last Sunday letter lists the mistakes. You found most of them; I found the rest while rereading the year with a red pen and a strong coffee. Each one has been corrected in the archive with a note at the bottom of the original letter.",
      },
      { type: "h2", text: "The corrections" },
      {
        type: "list",
        items: [
          "No. 271: a ship's draught is measured to the keel, not to the propeller. Thank you to the four marine engineers who wrote in within the hour.",
          "No. 279: the dam I described generates 340 megawatts, not 3,400. I added a zero. The zero has been removed.",
          "No. 284: I called a signal box 'unmanned'. It is staffed, around the clock, by a signaller named Bev, who was not pleased.",
          "No. 290: wrong year for the first container crane in the port: 1971, not 1969.",
          "No. 296: a misspelled name, for which I've apologised to Mr Ó Briain directly.",
        ],
      },
      {
        type: "p",
        text: "The other four were small — a wrong date, a unit, a caption — and are listed at the bottom of each letter. I keep this tally because a newsletter has no editor but its readers, and you deserve to see the work being checked.",
        note: "The total over seven years is 58 corrections across 309 letters. My goal is not zero; it's that every one is fixed within a week of being reported.",
      },
      {
        type: "p",
        text: "Thank you for reading closely. It's the best thing anyone can do for a writer, and it's made Dispatch better every single year.",
      },
    ],
  },
];

/* --------------------------------------------------------------- sponsor */

export const issueSponsor = {
  name: "Halyard Field Notebooks",
  text: "Waterproof notebooks for people who take notes in the rain. Dispatch readers get 15% off with code SUNDAY.",
};

/* -------------------------------------------------------------- readers */

export const readerNotes = [
  {
    quote:
      "The only email I print out. My father and I read it separately and then argue about it on the phone.",
    who: "Hana, civil engineer, Osaka",
  },
  {
    quote:
      "I've driven past the same substation for twenty years. Now I wave at it. Thanks, I think.",
    who: "Teodor, bus driver, Gdańsk",
  },
  {
    quote:
      "Dispatch makes me feel like the world is held together by people who care, which on most Sundays I need to hear.",
    who: "Lou, nurse, Halifax",
  },
];

/* ---------------------------------------------------------------- home */

export const home = {
  ritualTitle: "What arrives, and when",
  ritual: [
    {
      day: "Sunday, 7:00",
      name: "The Sunday Letter",
      text: "One long, reported letter. Free, always, for everyone.",
    },
    {
      day: "Wednesday",
      name: "Field Notes",
      text: "Shorter dispatches from the reporting: the people, maps and numbers that didn't fit.",
    },
    {
      day: "First Friday",
      name: "The Audio Edition",
      text: "I read the month's letters aloud, with the sound of the places recorded on site.",
    },
    {
      day: "Each season",
      name: "The Almanac",
      text: "A printed, posted collection of the season's letters, for patrons.",
    },
  ],
  closeTitle: "Sundays, 7\u00a0a.m., your\u00a0time.",
  closeText:
    "One letter a week, free forever. No tracking pixels, no growth hacks, and an unsubscribe link that works the first time.",
};

/* -------------------------------------------------------------- about */

export const about = {
  title: "I write about the things that keep working.",
  lede: "I'm Ines Calder. For seven years I've spent most weeks standing next to people who maintain the world — crane drivers, line inspectors, bridge painters, signallers — and writing it up for you on Sunday.",
  portrait: {
    src: notebook,
    alt: "A hand writing with a pen in an open notebook on a desk by a window",
    credit: "Shixart1985, CC BY 2.0",
  },
  bio: [
    "Before Dispatch I was a city reporter for eleven years, covering council meetings, budget fights and the occasional collapsed road. The best stories were never in the meetings. They were with the crew who arrived afterwards to fix the road.",
    "In March 2019 I started a letter for forty friends about the people who keep things running. It grew, mostly by being forwarded. Today it reaches 41,200 readers in 96 countries, and it is paid for by about 2,900 of them.",
    "I live in Portland, Maine, with a dog named Ballast and a typewriter with a sticky 'e'. I travel about one week in four, always by train when I can.",
  ],
  timeline: [
    {
      year: "2019",
      text: "First letter, to 40 friends: the night shift at a water treatment plant.",
    },
    {
      year: "2020",
      text: "Field Notes begin, for readers who wanted the reporting behind the letter.",
    },
    {
      year: "2022",
      text: "Dispatch becomes reader-supported. I leave the newsroom to write it full time.",
    },
    { year: "2024", text: "The first printed Almanac ships to 600 patrons." },
    { year: "2026", text: "Letter No. 341. Still on Sundays, still at 7 a.m." },
  ],
  principlesTitle: "How Dispatch works",
  principles: [
    {
      name: "Independent",
      text: "Readers pay for Dispatch. Sponsors buy a clearly marked slot and never see a letter before you do.",
    },
    {
      name: "Reported",
      text: "Every letter starts with a visit. If I haven't stood there, I say so.",
    },
    {
      name: "Corrected",
      text: "Errors are fixed within a week, noted at the bottom of the letter, and tallied every December.",
    },
    {
      name: "Private",
      text: "No tracking pixels, no link tracking, no selling or sharing your address. Ever.",
    },
  ],
};

/* ---------------------------------------------------------- subscribe */

export type TierId = "free" | "reader" | "patron";
export type DeliveryKind =
  "letter" | "field-note" | "audio" | "almanac" | "call";

export type Tier = {
  id: TierId;
  name: string;
  monthly: number;
  yearly: number;
  line: string;
  perks: string[];
  receives: DeliveryKind[];
};

export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    line: "The Sunday Letter, every week, forever.",
    perks: [
      "The Sunday Letter at 7 a.m. your time",
      "The full archive of free letters",
      "Reply to any letter — I read them all",
    ],
    receives: ["letter"],
  },
  {
    id: "reader",
    name: "Reader",
    monthly: 8,
    yearly: 80,
    line: "Everything I report, as I report it.",
    perks: [
      "Everything in Free",
      "Field Notes every Wednesday",
      "The monthly Audio Edition",
      "The complete archive, Field Notes included",
    ],
    receives: ["letter", "field-note", "audio"],
  },
  {
    id: "patron",
    name: "Patron",
    monthly: 20,
    yearly: 200,
    line: "Keep Dispatch independent, and get it on paper.",
    perks: [
      "Everything in Reader",
      "The printed Almanac, posted each season",
      "A monthly call: ask me anything about the reporting",
      "Your name in the Almanac's colophon",
    ],
    receives: ["letter", "field-note", "audio", "almanac", "call"],
  },
];

export const deliveryKinds: Record<
  DeliveryKind,
  { name: string; from: string; time: string }
> = {
  letter: { name: "Sunday Letter", from: "Ines at Dispatch", time: "07:00" },
  "field-note": {
    name: "Field Note",
    from: "Dispatch Field Notes",
    time: "07:00",
  },
  audio: { name: "Audio Edition", from: "Dispatch Audio", time: "12:00" },
  almanac: {
    name: "The Almanac ships",
    from: "Dispatch Post Room",
    time: "09:00",
  },
  call: { name: "Patron call", from: "Ines at Dispatch", time: "18:00" },
};

/** Upcoming subject lines, in send order, used by the delivery calendar. */
export const upcoming: Record<
  DeliveryKind,
  { subject: string; preview: string }[]
> = {
  letter: [
    {
      subject: "No. 342 — The people who decide which box goes on top",
      preview: "Dear reader — Mereana has a window, a biro and 6,000 slots…",
    },
    {
      subject: "No. 343 — A lighthouse keeper with no lighthouse",
      preview:
        "Dear reader — the light was automated in 1989. He still climbs it…",
    },
    {
      subject: "No. 344 — The snowplough route is a love letter",
      preview: "Dear reader — at 3 a.m., the city is redrawn in salt…",
    },
    {
      subject: "No. 345 — Inside a water tower, in the dark",
      preview: "Dear reader — it's quieter than you'd think, and colder…",
    },
    {
      subject: "No. 346 — The last switchboard on the island",
      preview: "Dear reader — Maureen has connected calls since 1979…",
    },
  ],
  "field-note": [
    {
      subject: "Field Note 119 — A tide table, annotated",
      preview: "The laminated sheet from the crane cab, decoded line by line…",
    },
    {
      subject: "Field Note 120 — Lighthouse logbooks, 1952–1989",
      preview: "Forty years of weather in one man's handwriting…",
    },
    {
      subject: "Field Note 121 — The salt barn's ledger",
      preview: "How many tonnes a night of freezing rain costs, exactly…",
    },
    {
      subject: "Field Note 122 — Valve keys and the people who carry them",
      preview: "Every water main has a key, and somebody has it on a hook…",
    },
    {
      subject: "Field Note 123 — Switchboard cords, measured",
      preview: "The jack field, photographed and labelled…",
    },
  ],
  audio: [
    {
      subject: "The Audio Edition — four letters, read aloud",
      preview: "Recorded with the harbour, the train and the hum of the wires…",
    },
  ],
  almanac: [
    {
      subject: "Your Autumn Almanac is in the post",
      preview:
        "Twelve letters, printed on uncoated stock, with a fold-out tide chart…",
    },
  ],
  call: [
    {
      subject: "Tonight: the patron call (link inside)",
      preview:
        "Bring questions about the cranes. Or the dog. Both are welcome…",
    },
  ],
};

export const subscribe = {
  title: "Choose how Dispatch arrives",
  lede: "The Sunday Letter is free and always will be. Paying readers fund the reporting trips, and get the notebook behind every letter.",
  calendarTitle: "Your month of Dispatch",
  calendarText:
    "Pick a plan and see exactly what lands in your inbox next month. Select a day to preview the email.",
  next: [
    "Confirm your address with one click in the email that arrives first.",
    "A welcome letter from me follows the same day, with five favourites from the archive.",
    "Your first Sunday Letter lands at 7:00, your time.",
  ],
  faq: [
    {
      q: "Will the Sunday Letter ever go behind a paywall?",
      a: "No. The Sunday Letter has been free since 2019 and stays free. Paying readers fund it for everyone.",
    },
    {
      q: "When exactly does it arrive?",
      a: "Sunday at 7:00 in your own time zone, set automatically from the first letter you open. You can change it in your preferences.",
    },
    {
      q: "Can I switch plans or cancel?",
      a: "Any time, from the link at the bottom of every email. Yearly plans are refunded pro rata for unused months.",
    },
    {
      q: "Do you offer student or hardship rates?",
      a: "Yes — reply to any letter and I'll set you up as a Reader for whatever you can afford, including nothing.",
    },
    {
      q: "Can I give Dispatch as a gift?",
      a: "Yes. Choose Reader or Patron yearly and add the recipient's address at checkout; they'll get a note from me on the date you pick.",
    },
    {
      q: "What do you do with my email address?",
      a: "Send you Dispatch. That's all. No tracking pixels, no link tracking, and it is never sold or shared.",
    },
  ],
};

/* ------------------------------------------------------------ sponsor */

export type Placement = {
  id: string;
  name: string;
  price: number;
  text: string;
};

export const sponsor = {
  title: "Sponsor a Sunday",
  lede: "One sponsor per letter, one short note in my own words, read by people who build, run and repair things for a living.",
  audience: [
    ["Subscribers", "41,200 in 96 countries"],
    ["Average opens", "58% of the list, each Sunday"],
    [
      "Readers by work",
      "Engineering 31%, public sector 18%, transport & logistics 14%, design 9%",
    ],
    ["Paying readers", "2,900, who read every issue end to end"],
    ["Sends", "Sunday 07:00 local time, 46 letters a year"],
  ] as [string, string][],
  placements: [
    {
      id: "letter",
      name: "Letter sponsor",
      price: 1400,
      text: "The single sponsor slot in a Sunday Letter, written by me from your brief, placed after the opening section.",
    },
    {
      id: "field-note",
      name: "Field Notes sponsor",
      price: 600,
      text: "The sponsor line in a Wednesday Field Note, sent to paying readers only.",
    },
    {
      id: "classified",
      name: "Classified",
      price: 180,
      text: "Two lines in the classifieds at the foot of a letter. Good for jobs, events and small makers.",
    },
  ] as Placement[],
  /** Next Sundays: true = already booked. */
  slots: [
    { date: "2026-10-25", booked: true },
    { date: "2026-11-01", booked: false },
    { date: "2026-11-08", booked: true },
    { date: "2026-11-15", booked: false },
    { date: "2026-11-22", booked: false },
    { date: "2026-11-29", booked: true },
    { date: "2026-12-06", booked: false },
    { date: "2026-12-13", booked: false },
  ],
  bundleFrom: 3,
  bundleDiscount: 0.1,
  policy: [
    "I write every sponsor note myself, and I only write about things I have tried.",
    "No gambling, crypto, weapons, fossil-fuel extraction or political campaigns.",
    "Sponsors never see a letter in advance and never influence what I report.",
    "Every sponsored slot is clearly labelled. Readers can always tell.",
  ],
  past: [
    "Halyard Field Notebooks",
    "Northbound Rail Holidays",
    "Ferrule & Pike Tools",
    "Tidewater Maps",
    "The Bridgekeepers' Trust",
    "Low Gear Press",
  ],
};
