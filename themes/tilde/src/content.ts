/* Every word and number on the site lives here. Tilde Ekvall and everyone quoted are fictional. */

export const brand = {
  name: "Tilde",
  person: "Tilde Ekvall",
  handle: "tilde",
  sector: "Developer portfolio",
  role: "Independent software engineer",
  city: "Gothenburg, Sweden",
  hours: "Mon–Thu, 09:00–17:00 CET",
  email: "hello@tilde.example",
  phone: "+1 555 0167",
  phoneHref: "tel:+15550167",
  status: "Booking engagements from January 2027",
  tagline: "I build the slow, careful parts of fast software.",
  /** Highlighted in the hero like a search match. */
  taglineMark: "careful",
  intro:
    "Independent engineer in Gothenburg. For eleven years I have worked on the parts of products nobody sees until they break: sync engines, storage, query performance and the tools other developers use every day.",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "Mastodon", href: "https://joinmastodon.org/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
  { to: "/uses", label: "Uses" },
  { to: "/resume", label: "Résumé" },
  { to: "/about", label: "About" },
  { to: "/now", label: "Now" },
];

/* ---------- Projects ---------- */

export type ProjectKind = "Open source" | "Client" | "Tool";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  year: number;
  role: string;
  client?: string;
  duration: string;
  language: string;
  stack: string[];
  stars?: number;
  featured?: boolean;
  summary: string;
  intro: string;
  flow: { label: string; note: string }[];
  problem: string[];
  approach: string[];
  result: string[];
  facts: [string, string][];
  bench?: {
    title: string;
    unit: string;
    rows: { label: string; before: number; after: number }[];
  };
  code: { file: string; body: string };
  quote?: { text: string; name: string; title: string };
};

export const projects: Project[] = [
  {
    slug: "loam",
    name: "loam",
    kind: "Open source",
    year: 2026,
    role: "Author and maintainer",
    duration: "2024 – ongoing",
    language: "Rust",
    stack: ["Rust", "WebAssembly", "TypeScript", "SQLite"],
    stars: 4180,
    featured: true,
    summary:
      "A sync engine for local-first apps that stores its history in SQLite instead of memory.",
    intro:
      "loam lets a web or desktop app keep its data on the device, edit it offline and merge with other devices later. It compiles to WebAssembly, persists every change to SQLite and ships as an 84 kB npm package.",
    flow: [
      { label: "App write", note: "plain SQL insert" },
      { label: "Change log", note: "row-level ops in SQLite" },
      { label: "Merge", note: "per-column last-writer-wins" },
      { label: "Relay", note: "dumb WebSocket fan-out" },
      { label: "Peers", note: "apply + rebase" },
    ],
    problem: [
      "Most CRDT libraries keep the whole document history in memory. That is fine for a shared text field and painful for an app with 200,000 rows: start-up time grows with the history, and a phone tab gets killed before it finishes loading.",
      "The teams I talked to did not want a new database. They wanted the SQLite they already had to keep working, with sync added underneath.",
    ],
    approach: [
      "loam records changes at the row and column level in a side table, using hybrid logical clocks so ordering survives clock skew between devices. Merging is per column, last writer wins, with an escape hatch for counters and ordered lists.",
      "Nothing about the merge needs the full history in memory. Compaction runs in the background and keeps only what an offline peer could still need, based on the oldest acknowledged clock from each device.",
      "The relay server is deliberately boring: it stores encrypted change batches and forwards them. Any WebSocket host works, and the reference relay is 300 lines of Rust.",
    ],
    result: [
      "Start-up time no longer depends on history length. A 200,000-row workspace opens in under half a second on a mid-range Android phone, down from eleven seconds with the in-memory library it replaced.",
      "loam is used in production by four teams I know of, including a field inspection app that works for days without a signal.",
    ],
    facts: [
      ["Package size", "84 kB gzipped (WASM + JS)"],
      ["Test suite", "1,900 property tests, fuzzed merges"],
      ["Licence", "Apache-2.0"],
      ["Releases", "23 since v0.1"],
    ],
    bench: {
      title: "Cold open, 200k-row workspace",
      unit: "ms",
      rows: [
        { label: "Pixel 6a", before: 11200, after: 420 },
        { label: "iPhone 12", before: 6400, after: 260 },
        { label: "M2 laptop", before: 2100, after: 90 },
      ],
    },
    code: {
      file: "examples/notes.ts",
      body: `import { open } from "loam";

const db = await open("notes.db", { relay: "wss://relay.example/notes" });

// Ordinary SQL. loam records the change underneath.
await db.exec("insert into notes (id, body) values (?, ?)", [id, body]);

// Fires for local and remote changes alike.
db.watch("select * from notes order by updated desc", render);`,
    },
    quote: {
      text: "We deleted our own sync layer, about nine thousand lines of it, and the app got faster on the first day.",
      name: "Ines Albrecht",
      title: "Lead engineer, Fernweh Inspections",
    },
  },
  {
    slug: "nordvik-scanner",
    name: "Nordvik boarding scanner",
    kind: "Client",
    year: 2025,
    role: "Lead engineer, team of three",
    client: "Nordvik Ferries",
    duration: "5 months",
    language: "TypeScript",
    stack: ["TypeScript", "React", "IndexedDB", "Service Worker", "Go"],
    featured: true,
    summary:
      "An offline-first ticket scanner for ferry crews who lose signal halfway across the fjord.",
    intro:
      "Nordvik runs eleven ferry routes on the west coast. Crews scan tickets on handheld devices at the ramp, and signal drops out at four of the piers. I led the rebuild of the scanning app as an installable web app that never waits for the network.",
    flow: [
      { label: "Ticket sold", note: "booking system" },
      { label: "Manifest sync", note: "nightly + hourly deltas" },
      { label: "Handheld", note: "IndexedDB, 40k tickets" },
      { label: "Scan", note: "local check, 30 ms" },
      { label: "Upload", note: "queued until signal" },
    ],
    problem: [
      "The old app called the booking API for every scan. On a bad pier a scan took six to fifteen seconds, queues reached the car deck, and crews switched to reading tickets by eye.",
      "Double-boarding mattered too: the same ticket must not board twice on two ramps of the same departure, even if both devices are offline.",
    ],
    approach: [
      "Each handheld keeps the manifest for its routes in IndexedDB and receives hourly deltas. Scans are validated locally against the manifest and queued for upload.",
      "Departures with two ramps elect one device as the authority over a local Bluetooth link; the other device asks it before accepting a ticket. If both are cut off, the second scan of a ticket is flagged on screen instead of silently accepted.",
      "We wrote a small Go service that compacts the day's manifest into a 600 kB binary file so a full refresh fits through a weak connection.",
    ],
    result: [
      "Median scan time went from 4.2 seconds to 30 milliseconds. Boarding a full sailing takes nine minutes less, which gave Nordvik back two departures a day on its busiest route.",
      "The app has run through two winters without a single forced fallback to paper.",
    ],
    facts: [
      ["Devices", "140 handhelds on 11 routes"],
      ["Offline window", "Up to 72 hours"],
      ["Manifest refresh", "600 kB binary, hourly deltas"],
      ["Paper fallbacks", "0 since launch"],
    ],
    bench: {
      title: "Median time per scan",
      unit: "ms",
      rows: [
        { label: "Good signal", before: 1900, after: 30 },
        { label: "Weak signal", before: 4200, after: 30 },
        { label: "No signal", before: 15000, after: 30 },
      ],
    },
    code: {
      file: "scanner/validate.ts",
      body: `export function validate(ticket: Ticket, departure: Departure): Verdict {
  const entry = manifest.get(ticket.id);
  if (!entry) return { ok: false, reason: "not-on-manifest" };
  if (entry.departure !== departure.id) return { ok: false, reason: "wrong-sailing" };
  // Boarded on another ramp while we were both offline: flag, never block.
  if (entry.boardedAt) return { ok: true, flag: "possible-duplicate" };
  return { ok: true };
}`,
    },
    quote: {
      text: "The crews stopped talking about the scanner. That was the goal, and it took about a week.",
      name: "Henrik Saelid",
      title: "Head of operations, Nordvik Ferries",
    },
  },
  {
    slug: "lintel",
    name: "lintel",
    kind: "Tool",
    year: 2025,
    role: "Author",
    duration: "2023 – ongoing",
    language: "Go",
    stack: ["Go", "PostgreSQL", "GitHub Actions"],
    stars: 2310,
    featured: true,
    summary:
      "A linter that reads your SQL migrations and tells you which ones will lock production.",
    intro:
      "lintel parses Postgres migrations, works out which locks each statement takes and for how long, and fails the build when a migration would block reads or writes on a busy table. It came out of a postmortem I would rather not repeat.",
    flow: [
      { label: "Migration", note: ".sql or ORM output" },
      { label: "Parser", note: "Postgres grammar" },
      { label: "Lock model", note: "per statement, per version" },
      { label: "Table stats", note: "optional row counts" },
      { label: "Report", note: "CI comment + exit code" },
    ],
    problem: [
      "Adding a column with a default, creating an index without CONCURRENTLY, or adding a foreign key can each take a lock that stops every query on a table. On a small table nobody notices. On a table with 80 million rows it is an outage.",
      "Code review rarely catches it, because the dangerous version and the safe version look almost the same.",
    ],
    approach: [
      "lintel uses the real Postgres grammar, then maps each statement to the lock it takes on each supported Postgres version, from 12 to 17. Behaviour changed between versions, so the rules are versioned too.",
      "If you give it read-only access to production statistics, it weighs each finding by table size and write rate, so a risky statement on a lookup table is a note, not a failure.",
      "Every rule links to a short explanation with the safe rewrite, because a linter that only says no gets disabled.",
    ],
    result: [
      "lintel runs in CI for about 600 public repositories. Its rule pages are the most-read part of this site.",
      "At Fieldnote Health it caught three locking migrations in its first month, one of them on the patient records table.",
    ],
    facts: [
      ["Rules", "41, versioned for Postgres 12–17"],
      ["Speed", "2,000 migrations in 0.8 s"],
      ["Install", "Single static binary or Action"],
      ["Licence", "MIT"],
    ],
    code: {
      file: "migrations/0042_add_status.sql",
      body: `-- lintel: L012 blocking-index on "orders" (82M rows, 340 writes/s)
--   CREATE INDEX takes a SHARE lock; writes wait until it finishes.
--   Safe rewrite: CREATE INDEX CONCURRENTLY, outside a transaction.
create index orders_status_idx on orders (status);`,
    },
  },
  {
    slug: "fieldnote-search",
    name: "Fieldnote record search",
    kind: "Client",
    year: 2024,
    role: "Performance consultant",
    client: "Fieldnote Health",
    duration: "7 weeks",
    language: "SQL",
    stack: ["PostgreSQL", "Ruby on Rails", "pg_trgm", "OpenTelemetry"],
    summary:
      "Patient search in a clinic records system, taken from 1.8 seconds to 140 milliseconds at p95.",
    intro:
      "Fieldnote makes the records system used by 300 small clinics. Front-desk staff search for patients dozens of times an hour, and the search had become slow enough that people kept paper lists. They brought me in for seven weeks to fix it without a rewrite.",
    flow: [
      { label: "Search box", note: "debounced, 3+ chars" },
      { label: "Rails", note: "one query, no N+1" },
      { label: "Trigram index", note: "per clinic, partial" },
      { label: "Rank", note: "recent visits first" },
      { label: "Result", note: "20 rows, 140 ms p95" },
    ],
    problem: [
      "Search ran an ILIKE across four columns of a 9-million-row table, then loaded each patient's last appointment one query at a time. The plan changed depending on which clinic searched, and the worst clinics waited almost two seconds.",
    ],
    approach: [
      "I started by measuring: tracing every search for a week and reading the slowest plans with the team, out loud, until everyone could say why each was slow.",
      "The fix was three small changes: a generated search column with a trigram index partitioned by clinic, a lateral join for the last appointment, and ranking by visit recency in the same query.",
      "We shipped behind a flag to five clinics, compared latency and result quality, then rolled out over two weeks.",
    ],
    result: [
      "p95 search time dropped from 1,800 to 140 milliseconds, and the database CPU at peak fell by a third. The team now runs the same plan-reading session for every slow endpoint.",
    ],
    facts: [
      ["Rows searched", "9.1 million patients"],
      ["Queries per search", "21 → 1"],
      ["Peak DB CPU", "−34%"],
      ["Rewrite needed", "None"],
    ],
    bench: {
      title: "Patient search latency",
      unit: "ms",
      rows: [
        { label: "p50", before: 620, after: 38 },
        { label: "p95", before: 1800, after: 140 },
        { label: "p99", before: 3900, after: 260 },
      ],
    },
    code: {
      file: "db/migrate/20240611_patient_search.rb",
      body: `add_column :patients, :search, :virtual, type: :text, stored: true,
  as: "lower(given_name || ' ' || family_name || ' ' || coalesce(phone, ''))"

# One partial index per large clinic keeps plans stable across tenants.
execute <<~SQL
  create index concurrently patients_search_trgm
    on patients using gin (search gin_trgm_ops);
SQL`,
    },
    quote: {
      text: "Tilde made us read our own query plans until we understood them. The speed-up was the smaller gift.",
      name: "Mariam Okafor",
      title: "CTO, Fieldnote Health",
    },
  },
  {
    slug: "kestrel",
    name: "kestrel",
    kind: "Open source",
    year: 2023,
    role: "Co-author",
    duration: "2022 – 2024",
    language: "Rust",
    stack: ["Rust", "no_std", "ARM Cortex-M", "LZ4"],
    stars: 1240,
    summary:
      "An embedded time-series store for sensors that write every second and sync once a day.",
    intro:
      "kestrel is a small append-only store for microcontrollers with flash memory. It started as a weekend project with a friend who builds soil sensors and now runs on a few thousand devices in fields and greenhouses.",
    flow: [
      { label: "Sensor", note: "1 reading / s" },
      { label: "Ring buffer", note: "RAM, 4 kB" },
      { label: "Block", note: "delta + LZ4, 512 B" },
      { label: "Flash", note: "wear-levelled pages" },
      { label: "Daily sync", note: "LoRa or cellular" },
    ],
    problem: [
      "Cheap flash wears out if you write the same page over and over, and sensors that log every second write a lot. The existing options were either too large for a microcontroller with 64 kB of RAM or lost data on power cuts.",
    ],
    approach: [
      "Readings are delta-encoded and compressed in 512-byte blocks, then written to flash in a rotating order so no page is written much more often than the others.",
      "Each block carries a checksum and a sequence number. After a power cut, kestrel scans forward from the last good block, so the worst case is losing the readings still in RAM.",
    ],
    result: [
      "A year of one-second readings fits in 2 MB of flash, and the projected flash lifetime is over twelve years at that rate.",
    ],
    facts: [
      ["RAM footprint", "6 kB"],
      ["Compression", "11× on typical sensor data"],
      ["Power-cut loss", "≤ 4 seconds of readings"],
      ["Licence", "MIT / Apache-2.0"],
    ],
    code: {
      file: "src/block.rs",
      body: `pub fn push(&mut self, t: u32, value: i32) -> Result<(), Full> {
    let dt = t.wrapping_sub(self.last_t);
    let dv = value.wrapping_sub(self.last_v);
    self.buf.write_varint(zigzag(dt as i32))?;
    self.buf.write_varint(zigzag(dv))?;
    (self.last_t, self.last_v) = (t, value);
    Ok(())
}`,
    },
  },
  {
    slug: "tern",
    name: "tern",
    kind: "Tool",
    year: 2022,
    role: "Author",
    duration: "2022",
    language: "Go",
    stack: ["Go", "SVG", "PTY"],
    stars: 890,
    summary:
      "Records a terminal session and renders it as a small, accessible animated SVG.",
    intro:
      "tern records what happens in your terminal and turns it into an SVG you can drop into a README or a blog post. The text stays text, so readers can select and copy it, and screen readers can read it.",
    flow: [
      { label: "Shell", note: "spawned in a PTY" },
      { label: "Recorder", note: "bytes + timestamps" },
      { label: "Emulator", note: "VT100 state" },
      { label: "Frames", note: "diffed screens" },
      { label: "SVG", note: "CSS keyframes" },
    ],
    problem: [
      "Terminal GIFs are large, blurry and impossible to copy from. Video embeds need a player and a third-party host. I wanted something that works on any static page, including this one.",
    ],
    approach: [
      "tern runs your shell in a pseudo-terminal, keeps a VT100 screen model in memory, and writes only the lines that change between frames. Timing is expressed as CSS keyframes, so the SVG animates without JavaScript.",
      "Idle gaps longer than two seconds are shortened, and a static final frame is used when the reader prefers reduced motion.",
    ],
    result: [
      "A typical 30-second recording is about 40 kB, smaller than the first frame of the equivalent GIF.",
    ],
    facts: [
      ["Typical file", "40 kB for 30 s"],
      ["Runtime JS", "None"],
      ["Reduced motion", "Static last frame"],
      ["Licence", "MIT"],
    ],
    code: {
      file: "README.md",
      body: `$ tern rec demo.svg -- cargo test
recording… press ctrl-d to stop
saved demo.svg (38.4 kB, 212 frames, 27.1 s)`,
    },
  },
];

/* ---------- Writing ---------- */

export type Block =
  | { h: string }
  | { p: string }
  | { code: string; file?: string }
  | { list: string[] }
  | { quote: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "your-sync-engine-is-a-database",
    title: "Your sync engine is a database now",
    date: "2026-09-14",
    tags: ["local-first", "databases"],
    summary:
      "Once you sync data between devices, you have built a distributed database. It is better to admit that early and borrow the database's habits.",
    body: [
      {
        p: "Every team that adds offline support to an app goes through the same three stages. First, a cache. Then a queue of pending writes. Then, a few months later, someone files a bug about two devices that disagree, and the team discovers it has built a distributed database without any of the tools databases come with.",
      },
      {
        p: "I do not think that is a failure. It is a sign that the problem was always a database problem, and that the useful move is to borrow the habits databases already have.",
      },
      { h: "Habit one: write down what a change is" },
      {
        p: "A database has a log, and every entry in it means exactly one thing. Most homegrown sync layers send whole objects, which makes it impossible to tell whether a field changed or was just carried along. Record the smallest change you can: this column, of this row, set to this value, at this clock.",
      },
      {
        code: `type Change = {
  table: string;
  row: string;
  column: string;
  value: unknown;
  clock: HybridClock; // wall time + counter + device id
};`,
        file: "change.ts",
      },
      { h: "Habit two: decide what wins before you need to" },
      {
        p: "Conflicts are not edge cases in an offline app; they are a Tuesday. Pick a rule per column. Last writer wins is the right answer for most fields, and the wrong answer for counters, lists and anything involving money. Make the exceptions explicit and testable.",
      },
      { h: "Habit three: compact, but only what nobody needs" },
      {
        p: "Logs grow forever unless you trim them. The safe trimming point is the oldest change any known device has not yet acknowledged. Track that per device, and let devices that have been gone for months re-sync from a snapshot instead of holding everyone's history hostage.",
      },
      {
        list: [
          "Keep a clock per device, not per user.",
          "Store acknowledgements, not just changes.",
          "Give every change a stable id so retries are harmless.",
        ],
      },
      {
        p: "None of this needs a new framework. It needs the willingness to call the thing what it is. Once a team says \u201cwe have a database\u201d out loud, the right questions start to come by themselves.",
      },
    ],
  },
  {
    slug: "eleven-minutes",
    title: "The migration that locked production for eleven minutes",
    date: "2026-06-02",
    tags: ["postgres", "postmortem"],
    summary:
      "A blameless write-up of one bad deploy, the lock queue behind it, and the linter that came out of it.",
    body: [
      {
        p: "At 14:06 on a Thursday, a deploy added an index to the orders table. At 14:17 the index finished and the site came back. In between, every checkout request waited, timed out, and was retried by clients that did not know better.",
      },
      { h: "What happened" },
      {
        p: "The migration ran CREATE INDEX without CONCURRENTLY. That statement takes a SHARE lock, which allows reads but blocks writes. On a quiet table it takes a second. On an 80-million-row table with steady writes, it took eleven minutes.",
      },
      {
        p: "Worse, the waiting writers queued behind the index build, and some reads queued behind them, because Postgres grants locks in order. A statement that should only have blocked writes ended up blocking almost everything.",
      },
      {
        code: `-- What shipped
create index orders_customer_idx on orders (customer_id);

-- What should have shipped
create index concurrently orders_customer_idx on orders (customer_id);`,
        file: "0042_orders_customer.sql",
      },
      { h: "Why review did not catch it" },
      {
        p: "The safe version and the dangerous version differ by one word. Two experienced engineers approved the change. Nobody did anything wrong by the standards we had; the standards were the problem.",
      },
      { h: "What we changed" },
      {
        list: [
          "Every migration sets lock_timeout to five seconds, so a blocked migration fails instead of queueing the world.",
          "Migrations on tables above a million rows need a second reviewer from the platform team.",
          "A linter reads every migration in CI and explains the lock it takes. That linter became lintel.",
        ],
      },
      {
        quote:
          "A safety rule that depends on someone remembering one keyword is not a rule. It is a hope.",
      },
      {
        p: "We have not had a locking incident since. The linter has flagged twenty-six migrations in that codebase, and every one was rewritten in under ten minutes.",
      },
    ],
  },
  {
    slug: "reading-query-plans-out-loud",
    title: "Reading query plans out loud",
    date: "2026-03-19",
    tags: ["postgres", "performance"],
    summary:
      "The most effective performance practice I know costs nothing: a team, a slow query and EXPLAIN, read aloud line by line.",
    body: [
      {
        p: "When I start a performance engagement, I ask for one hour a week with the whole team and a projector. We pick the slowest query from the past week and read its plan out loud, from the innermost node outwards, until everyone in the room can explain why it is slow.",
      },
      {
        p: "It sounds like a beginner exercise. It is the opposite. The people who think they understand plans learn the most, because saying it aloud exposes the steps they were skipping.",
      },
      { h: "How a session runs" },
      {
        list: [
          "Run EXPLAIN (ANALYZE, BUFFERS) on a copy of production, never on a laptop.",
          "Read the deepest node first and say how many rows it expected and how many it got.",
          "Stop at the first estimate that is off by ten times or more. That is usually the story.",
          "Write the fix as a hypothesis, then measure it in the next session.",
        ],
      },
      {
        code: `Nested Loop  (rows=12 actual rows=48210)
  ->  Index Scan using patients_clinic_idx on patients
        (rows=12 actual rows=48210)
        Index Cond: (clinic_id = 311)`,
        file: "plan.txt",
      },
      {
        p: "In this plan the planner expected twelve patients and found forty-eight thousand. Everything above it was chosen for the wrong size of problem. The fix was better statistics on one column, not a new index.",
      },
      { h: "Why it lasts" },
      {
        p: "A consultant who fixes queries leaves a faster system. A team that can read plans keeps it fast. I would rather leave the second thing behind.",
      },
    ],
  },
  {
    slug: "a-small-case-for-boring-crdts",
    title: "A small case for boring CRDTs",
    date: "2025-11-07",
    tags: ["local-first", "design"],
    summary:
      "Clever merge algorithms make good papers. Most apps need per-column last-writer-wins and a few honest exceptions.",
    body: [
      {
        p: "Conflict-free replicated data types have a reputation for being hard, mostly because the interesting ones are. Collaborative text editing, ordered lists with concurrent moves, nested trees: these are genuinely difficult and the research is beautiful.",
      },
      {
        p: "Most apps, though, are forms. A task has a title, a due date, an assignee and a status. Two people editing the same task offline rarely edit the same field, and when they do, the later edit winning is what they expect.",
      },
      { h: "The boring default" },
      {
        p: "Per-column last-writer-wins, with a hybrid logical clock for ordering, handles the overwhelming majority of fields in every app I have worked on. It is easy to explain to product managers, easy to test and cheap to store.",
      },
      {
        code: `function merge(a: Cell, b: Cell): Cell {
  return compare(a.clock, b.clock) >= 0 ? a : b;
}`,
        file: "merge.ts",
      },
      { h: "The honest exceptions" },
      {
        list: [
          "Counters: store increments per device and sum them.",
          "Ordered lists: use fractional indexes and accept the occasional tie-break.",
          "Long text: reach for a real sequence CRDT, and only there.",
        ],
      },
      {
        p: "Start boring and add complexity where users can feel the difference. It is the same advice as everywhere else in software, and it holds here too.",
      },
    ],
  },
  {
    slug: "what-i-keep-in-config",
    title: "What I keep in ~/.config",
    date: "2025-08-21",
    tags: ["tooling"],
    summary:
      "Fifteen years of dotfiles, cut down to the four files I would rewrite first on a new machine.",
    body: [
      {
        p: "My dotfiles repository is fifteen years old and had grown to around four thousand lines before I deleted most of it last winter. What survived is short enough to read in one sitting, which turns out to be the main feature.",
      },
      { h: "The rule I use now" },
      {
        p: "If I cannot remember why a line is there, it goes. If I miss it within a month, it comes back with a comment explaining why. After six months, the comments are the most useful part of the repository.",
      },
      {
        code: `# Show the branch, but only when I am in a repository.
# Anything more and I stop reading the prompt.
setopt prompt_subst
PROMPT='%F{blue}%~%f \${vcs_info_msg_0_}%# '`,
        file: ".zshrc",
      },
      { h: "The four files" },
      {
        list: [
          ".zshrc: a prompt, history settings and eleven aliases.",
          "init.lua: a Neovim config under two hundred lines.",
          ".gitconfig: mostly aliases for the log views I use daily.",
          "ghostty/config: font, theme, and nothing else.",
        ],
      },
      {
        p: "The full versions are on the uses page, in a browser you can click through.",
      },
    ],
  },
  {
    slug: "pricing-yourself",
    title: "Pricing yourself as an independent engineer",
    date: "2025-04-10",
    tags: ["independent"],
    summary:
      "Day rates, minimum engagements and why I stopped quoting fixed prices for open-ended work.",
    body: [
      {
        p: "When I left full-time work in 2023, the hardest question was not finding clients. It was saying a number out loud. This is what I charge, how I arrived at it, and the mistakes I made along the way.",
      },
      { h: "Day rate, not hourly" },
      {
        p: "I charge per day because my best work happens in long, uninterrupted stretches, and hourly billing rewards the opposite. A day is six focused hours plus the thinking that happens on walks.",
      },
      { h: "A minimum of four weeks" },
      {
        p: "Most of my work starts with a week of reading code and measuring. Shorter engagements spend all their time in that phase and leave before anything ships. Four weeks is the shortest window where I can reliably hand over something better.",
      },
      { h: "Fixed prices only for fixed problems" },
      {
        p: "I quote a fixed price when the outcome is clear and measurable, like bringing an endpoint under a latency target. For open-ended work, a fixed price is a bet on information neither side has yet.",
      },
      {
        list: [
          "Publish your rate. It filters out the wrong conversations early.",
          "Leave a week a month unbooked for maintenance and open source.",
          "Raise prices for new clients, not existing ones.",
        ],
      },
    ],
  },
  {
    slug: "benchmarks-are-a-conversation",
    title: "Benchmarks are a conversation, not a scoreboard",
    date: "2025-01-28",
    tags: ["performance", "design"],
    summary:
      "How I publish performance numbers for my own projects, and why every chart on this site says what machine it ran on.",
    body: [
      {
        p: "Benchmarks invite comparison, and comparison invites cheating, usually unintentional. The fix is not to stop publishing numbers. It is to publish enough context that a reader can disagree with them.",
      },
      { h: "What every number needs" },
      {
        list: [
          "The machine, the operating system and the runtime version.",
          "The dataset, ideally downloadable.",
          "The median and a high percentile, not the best run.",
          "The script that produced it, in the repository.",
        ],
      },
      {
        p: "Every chart in my case studies follows those rules, which is why they look modest. A real workload on a mid-range phone rarely produces a headline, and that is fine.",
      },
      {
        quote:
          "If a benchmark cannot be reproduced, it is marketing with a y-axis.",
      },
    ],
  },
];

/* ---------- Home ---------- */

export const practices = [
  {
    name: "Sync & storage",
    text: "Offline-first apps, local-first data models, replication between devices and servers, and the migrations that keep them honest.",
    typical: "Typical engagement: 8–16 weeks, embedded with your team.",
  },
  {
    name: "Performance",
    text: "Slow queries, slow pages, slow builds. I measure first, explain what I find to the whole team, and fix it in small, reversible steps.",
    typical: "Typical engagement: 4–8 weeks, fixed latency targets.",
  },
  {
    name: "Developer tooling",
    text: "Linters, CLIs, CI checks and internal libraries that make the safe path the easy path for everyone else on the team.",
    typical: "Typical engagement: 4–6 weeks, ends with a handover.",
  },
];

export const testimonial = {
  text: "Tilde is the person you want in the room when the problem is real and the deadline is not imaginary. She explained our own system to us better than we could, then made it fast.",
  name: "Mariam Okafor",
  title: "CTO, Fieldnote Health",
};

export const log = [
  {
    hash: "a41f9c2",
    date: "2026-10-09",
    text: "Released loam 0.14: background compaction no longer pauses writes.",
    to: "/projects/loam",
  },
  {
    hash: "7be03d1",
    date: "2026-09-14",
    text: "Wrote “Your sync engine is a database now”.",
    to: "/writing/your-sync-engine-is-a-database",
  },
  {
    hash: "e0c2a77",
    date: "2026-09-05",
    text: "Spoke at Local-First Days in Utrecht about compaction in practice.",
    to: "/about",
  },
  {
    hash: "3d9918b",
    date: "2026-08-22",
    text: "Wrapped a six-week performance engagement with a payroll company.",
    to: "/projects",
  },
  {
    hash: "c58e410",
    date: "2026-07-30",
    text: "lintel 2.0: rules are now versioned for Postgres 12 to 17.",
    to: "/projects/lintel",
  },
];

export const steps = [
  {
    title: "A 30-minute call",
    text: "You describe the problem; I ask a lot of questions. If I am not the right person, I will say so and suggest someone who is.",
    length: "Free",
  },
  {
    title: "A written proposal",
    text: "Within three working days: what I think is wrong, how I would find out for sure, what I would change, and a price.",
    length: "3 days",
  },
  {
    title: "Weekly demos",
    text: "Every Thursday you see working software or measured results, never just a status update. Plans change in the open.",
    length: "4–16 weeks",
  },
  {
    title: "A real handover",
    text: "Documentation in your repository, a recorded walkthrough and two weeks of questions answered after we finish.",
    length: "2 weeks",
  },
];

export type Month = {
  month: string;
  state: "booked" | "partial" | "open";
  note: string;
};

export const calendar: Month[] = [
  { month: "2026-11", state: "booked", note: "Sync engagement" },
  { month: "2026-12", state: "booked", note: "Sync engagement" },
  { month: "2027-01", state: "partial", note: "From 18 January" },
  { month: "2027-02", state: "open", note: "Open" },
  { month: "2027-03", state: "open", note: "Open" },
  { month: "2027-04", state: "partial", note: "Two weeks free" },
  { month: "2027-05", state: "open", note: "Open" },
  { month: "2027-06", state: "open", note: "Open" },
];

/* ---------- Uses ---------- */

export const usesIntro =
  "The tools I use every day, updated when something changes. Nothing here is sponsored, and most of it is older than you would expect.";

export const uses = [
  {
    group: "Desk",
    items: [
      {
        name: "14-inch laptop, 32 GB",
        note: "Four years old and still fast enough to compile Rust while running two Postgres instances.",
      },
      {
        name: "27-inch 4K monitor",
        note: "Scaled to 1440p. Text is the only thing I look at all day, so it should be sharp.",
      },
      {
        name: "Split keyboard, 42 keys",
        note: "Brown switches, a custom layout with symbols on the home row. Took a month to learn.",
      },
      {
        name: "Trackball",
        note: "Moved from a mouse after a wrist injury in 2019. Never went back.",
      },
      {
        name: "Standing desk, oak top",
        note: "Up in the morning, down after lunch. Not a lifestyle, just my back.",
      },
    ],
  },
  {
    group: "Software",
    items: [
      {
        name: "Neovim",
        note: "With a deliberately short config. Language servers for Rust, Go, TypeScript and SQL.",
      },
      {
        name: "Ghostty",
        note: "The terminal. Fast, native, and the config file is six lines.",
      },
      {
        name: "zsh + tmux",
        note: "One tmux session per client, so switching contexts means switching windows, not machines.",
      },
      {
        name: "Postgres.app",
        note: "Every major version from 12 to 17 side by side, for testing lintel rules.",
      },
      {
        name: "Plain-text notes",
        note: "A folder of Markdown files, synced with git. Search is ripgrep.",
      },
    ],
  },
  {
    group: "Away from the desk",
    items: [
      {
        name: "A5 dot-grid notebook",
        note: "Every engagement starts with a page of boxes and arrows before any code.",
      },
      {
        name: "Noise-cancelling headphones",
        note: "For trains and open-plan client offices.",
      },
      {
        name: "A bicycle",
        note: "Most of my debugging happens on the ride home along the river.",
      },
    ],
  },
];

export const dotfiles = [
  {
    path: "~/.zshrc",
    body: `# History: long, shared between tabs, no duplicates.
HISTSIZE=50000
SAVEHIST=50000
setopt share_history hist_ignore_all_dups

# Show the branch, but only inside a repository.
autoload -Uz vcs_info
precmd() { vcs_info }
zstyle ':vcs_info:git:*' formats '%b '
setopt prompt_subst
PROMPT='%F{blue}%~%f \${vcs_info_msg_0_}%# '

alias gs='git status -sb'
alias gl='git log --oneline --graph -20'
alias pg='psql -X -v ON_ERROR_STOP=1'
alias t='tmux new -A -s'`,
  },
  {
    path: "~/.config/nvim/init.lua",
    body: `vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.colorcolumn = "100"
vim.opt.undofile = true
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Leader is space. Everything else stays default.
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>f", "<cmd>Telescope find_files<cr>")
vim.keymap.set("n", "<leader>g", "<cmd>Telescope live_grep<cr>")
vim.keymap.set("n", "<leader>d", vim.diagnostic.open_float)

-- Format on save, but only for languages with a real formatter.
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = { "*.rs", "*.go", "*.ts", "*.tsx" },
  callback = function() vim.lsp.buf.format() end,
})`,
  },
  {
    path: "~/.gitconfig",
    body: `[user]
  name = Tilde Ekvall
  email = hello@tilde.example
[init]
  defaultBranch = main
[pull]
  rebase = true
[diff]
  algorithm = histogram
  colorMoved = default
[alias]
  last = log -1 --stat
  undo = reset --soft HEAD~1
  who = shortlog -sn --no-merges
  wip = !git add -A && git commit -m wip --no-verify`,
  },
  {
    path: "~/.config/ghostty/config",
    body: `font-family = DM Mono
font-size = 15
theme = light:paper,dark:ink
window-padding-x = 12
cursor-style = block
shell-integration = zsh`,
  },
];

/* ---------- Résumé ---------- */

export const resume = {
  summary:
    "Software engineer with eleven years of experience in data synchronisation, database performance and developer tooling. Independent since 2023; previously staff engineer on a collaborative mapping product used by 2 million people.",
  experience: [
    {
      hash: "f3a91e0",
      from: "2023-03",
      to: "present",
      title: "Independent software engineer",
      org: "Self-employed",
      place: "Gothenburg, remote",
      changes: [
        "Led the offline-first rebuild of Nordvik Ferries' boarding scanner; median scan time 4.2 s → 30 ms.",
        "Cut patient search p95 at Fieldnote Health from 1.8 s to 140 ms without a rewrite.",
        "Author of loam (4.2k stars) and lintel (2.3k stars).",
      ],
    },
    {
      hash: "9c0d27b",
      from: "2019-01",
      to: "2023-02",
      title: "Staff engineer, sync platform",
      org: "Pelagic",
      place: "Stockholm, hybrid",
      changes: [
        "Designed the offline sync protocol for a collaborative mapping app with 2M monthly users.",
        "Reduced sync bandwidth by 70% with column-level change tracking.",
        "Mentored nine engineers; ran the weekly query-plan reading group.",
      ],
    },
    {
      hash: "41be6c3",
      from: "2016-04",
      to: "2018-12",
      title: "Senior engineer, data platform",
      org: "Brightwater Systems",
      place: "Gothenburg",
      changes: [
        "Moved shipment tracking from nightly batch jobs to streaming updates in Postgres.",
        "Built the migration safety checks that later became lintel.",
      ],
    },
    {
      hash: "0e7742a",
      from: "2014-08",
      to: "2016-03",
      title: "Software engineer",
      org: "Kaffekod",
      place: "Gothenburg",
      changes: [
        "Shipped web and mobile apps for fourteen clients at a twelve-person agency.",
        "Introduced automated testing and continuous deployment across all projects.",
      ],
    },
  ],
  education: [
    {
      years: "2009 – 2014",
      title: "MSc Computer Science, distributed systems",
      org: "Västkust Institute of Technology",
    },
  ],
  skills: [
    { group: "Languages", items: ["Rust", "TypeScript", "Go", "SQL", "Ruby"] },
    {
      group: "Data",
      items: ["PostgreSQL", "SQLite", "IndexedDB", "CRDTs", "Replication"],
    },
    {
      group: "Practice",
      items: [
        "Performance profiling",
        "Observability",
        "Technical writing",
        "Mentoring",
      ],
    },
  ],
  talks: [
    {
      year: "2026",
      title: "Compaction in practice: keeping sync logs small",
      event: "Local-First Days, Utrecht",
    },
    {
      year: "2025",
      title: "Linting migrations before they lock you out",
      event: "Postgres Harbour Conf, Gothenburg",
    },
    {
      year: "2024",
      title: "Reading query plans out loud",
      event: "Nordic Systems Meetup, Oslo",
    },
  ],
  languages: [
    "Swedish (native)",
    "English (fluent)",
    "German (conversational)",
  ],
};

/* ---------- About & Now ---------- */

export const about = {
  lead: "I grew up in Gothenburg, started programming on a hand-me-down laptop at fourteen, and have spent most of my career on the layer between an app and its data.",
  body: [
    "My first job was at a small agency, building whatever clients needed that month. I learned to ship quickly there, and also learned how much of the slowness in software is accidental: a missing index, a chatty API, a sync layer nobody fully understood.",
    "At Brightwater and then Pelagic I worked on data platforms and sync, first as one of many engineers and later as the person others came to when two devices disagreed. I liked that work because it rewarded patience. The bugs were rare, real and always interesting.",
    "In 2023 I went independent so I could choose problems more carefully and spend part of every month on open source. I take three or four engagements a year, write about what I learn, and maintain the tools that came out of it.",
  ],
  principles: [
    {
      title: "Measure before opinions",
      text: "Every engagement starts with a week of tracing and reading code. My first guess is often wrong, and the numbers say so politely.",
    },
    {
      title: "Explain everything",
      text: "If I fix something your team cannot explain afterwards, I have left you with a new risk. I write and teach as I go.",
    },
    {
      title: "Small, reversible steps",
      text: "Behind flags, rolled out gradually, measured at each stage. Heroic rewrites make good stories and bad Tuesdays.",
    },
    {
      title: "Publish what I can",
      text: "Generic tools go open source; lessons become posts. Clients get the credit they want and the anonymity they ask for.",
    },
  ],
  facts: [
    ["Based in", "Gothenburg, Sweden (CET)"],
    ["Working hours", "Monday to Thursday; Fridays are for open source"],
    ["Languages", "Swedish, English, German"],
    ["Travel", "On site for kick-offs, by train where possible"],
  ] as [string, string][],
};

export const now = {
  updated: "2026-10-12",
  intro:
    "What I am focused on this month, in the spirit of the now pages people keep on their personal sites.",
  items: [
    {
      title: "Working",
      text: "Eight weeks into a sync engagement with a team building offline tools for electricians. Their data model is lovely; their conflict rules are getting there.",
    },
    {
      title: "Building",
      text: "loam 0.15, with streaming snapshots so a device that has been offline for a year can catch up without downloading the whole history.",
    },
    {
      title: "Writing",
      text: "A long post about hybrid logical clocks, with diagrams I keep redrawing. Probably November.",
    },
    {
      title: "Reading",
      text: "Designing Data-Intensive Applications again, slowly, with a pencil. A different book the third time.",
    },
    {
      title: "Not doing",
      text: "New conference talks until spring. I said yes to too many in 2026.",
    },
  ],
};

/* ---------- Contact ---------- */

export const contact = {
  lead: "Tell me about the problem, not the solution you have in mind. I reply to every message within two working days, usually with questions.",
  kinds: [
    "Contract engagement",
    "Performance review",
    "Advisory, a few hours a month",
    "Speaking or workshop",
    "Just saying hello",
  ],
  budgets: ["Under €10k", "€10–30k", "€30–60k", "Over €60k", "Not sure yet"],
  terms: [
    ["Rate", "From €1,150 per day"],
    ["Minimum", "Four weeks, or a fixed-price review"],
    ["Hours", "Mon–Thu, 09:00–17:00 CET"],
    ["Invoicing", "Monthly, 30 days, in EUR"],
  ] as [string, string][],
  faq: [
    {
      q: "Do you work with agencies?",
      a: "Yes, when I can talk directly with the engineers on the client side. I do not white-label work.",
    },
    {
      q: "Can you join our team full-time?",
      a: "Not at the moment. I am happy to help you hire for the role and to interview candidates with you.",
    },
    {
      q: "Do you sign NDAs?",
      a: "Yes, mutual ones. I will ask before mentioning any project publicly, and many of my clients stay anonymous.",
    },
    {
      q: "Will you work on something outside sync, storage and performance?",
      a: "Rarely. If it is close, tell me anyway. If it is not, I will point you to someone better suited.",
    },
  ],
};
