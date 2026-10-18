/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Arcade",
  sector: "Indie game studio",
  tagline: "Little games. Big feelings. Finished with love.",
  email: "hello@arcade.example",
  pressEmail: "press@arcade.example",
  jobsEmail: "jobs@arcade.example",
  phone: "+1 555 0142 778",
  phoneHref: "tel:+15550142778",
  address: ["Arcade Games Co.", "48 Mill Row, Floor 3", "Halden, HL4 2BW"],
  founded: 2019,
  social: [
    { label: "Discord", href: "https://discord.com/" },
    { label: "Bluesky", href: "https://bsky.app/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "itch.io", href: "https://itch.io/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/games", label: "Games" },
  { to: "/devlog", label: "Devlog" },
  { to: "/studio", label: "Studio" },
  { to: "/press", label: "Press kit" },
  { to: "/jobs", label: "Jobs" },
];

export const newsletter = {
  title: "Join the playtest list",
  text: "One email when there is something to play early: builds, beta keys, the odd prototype. Roughly six a year.",
};

/* ------------------------------------------------------------------ games */

/** Colours for a game's pixel art: sky top → horizon, two terrain layers, ground, the hero sprite and one accent. */
export type Palette = {
  sky: string;
  sky2: string;
  far: string;
  near: string;
  ground: string;
  hero: string;
  heroDark: string;
  accent: string;
  ink: string;
  light: string;
};

export type SceneKind =
  "hills" | "space" | "sea" | "deep" | "city" | "cards" | "sky";
export type GameStatus = "out" | "soon" | "free";
export type Platform = "PC" | "Mac" | "Switch" | "PS5" | "Browser";

export type Game = {
  slug: string;
  name: string;
  tagline: string;
  genre: string;
  status: GameStatus;
  /** ISO date of release, or the first day of the announced window. */
  date: string;
  /** What players see: "March 2025", "Spring 2027". */
  when: string;
  platforms: Platform[];
  /** USD; null = free or price not announced. */
  price: number | null;
  players: string;
  playtime: string;
  scene: SceneKind;
  palette: Palette;
  summary: string;
  about: string[];
  features: { title: string; text: string }[];
  specs: [string, string][];
  quotes: { text: string; source: string }[];
  awards: string[];
  store: { label: string; href: string }[];
  /** Which in-browser demo the game page embeds. */
  demo?: "blob-hop" | "pair-up";
  shots: { seed: number; caption: string }[];
};

export const games: Game[] = [
  {
    slug: "blob-hop",
    name: "Blob Hop",
    tagline: "No arms. No plan. Unreasonable amounts of optimism.",
    genre: "Arcade platformer",
    status: "out",
    date: "2025-03-13",
    when: "March 2025",
    platforms: ["PC", "Mac", "Switch"],
    price: 12.99,
    players: "1–2, couch co-op",
    playtime: "5 hours, plus endless mode",
    scene: "hills",
    palette: {
      sky: "#5fb8f0",
      sky2: "#d9f1ff",
      far: "#9fd690",
      near: "#4caa60",
      ground: "#7a4f35",
      hero: "#ff7aa8",
      heroDark: "#d14f84",
      accent: "#e8443a",
      ink: "#1d1631",
      light: "#fffaf0",
    },
    summary:
      "A one-button platformer about a very small, very round blob who has decided, against all advice, to see the whole valley.",
    about: [
      "Blob Hop is the game we wanted to play on the train: one button, a run that lasts about a minute, and the feeling that you were getting better every single time. Press to hop, hold to float a little higher, and let go before the bees notice you.",
      "The story mode crosses eight hand-built regions of the Mellow Valley, from the thistle meadows to the windy tops of Mount Wobble, with a postcard at the end of each one. Endless mode keeps the valley going for as long as your thumb does.",
      "Every level can be played with a friend on one screen. The second blob is a little bouncier, which is either a gift or a curse depending on who you ask.",
    ],
    features: [
      {
        title: "One button, real depth",
        text: "Tap, hold and release timing is the whole game. Speedrunners have found eleven distinct jump heights.",
      },
      {
        title: "Assist mode from day one",
        text: "Slow the valley to 70%, add a safety bounce, or skip a level. No penalties, no judgement, no achievements locked.",
      },
      {
        title: "Couch co-op",
        text: "A second player can drop in on any level with a second controller or half a keyboard.",
      },
      {
        title: "Endless valley",
        text: "A daily seeded run with a shared leaderboard, and a calmer seed for people who just want to hop.",
      },
    ],
    specs: [
      ["Engine", "Godot 4"],
      ["Input", "Controller, keyboard, touch (Switch handheld)"],
      [
        "Languages",
        "English, French, German, Spanish, Japanese, Brazilian Portuguese",
      ],
      ["Size", "410 MB"],
      ["Rating", "Everyone"],
    ],
    quotes: [
      {
        text: "The best single button in games this year.",
        source: "The Save Point",
      },
      {
        text: "I lost a whole Sunday to a blob with no arms, and I would do it again.",
        source: "Couch Co-op Quarterly",
      },
    ],
    awards: [
      "Best Debut Mechanic — Halden Indie Showcase 2025",
      "Accessibility Honourable Mention — Pixel Weekly Awards 2025",
    ],
    store: [
      { label: "Buy on Steam", href: "https://store.steampowered.com/" },
      { label: "Nintendo eShop", href: "https://www.nintendo.com/" },
    ],
    demo: "blob-hop",
    shots: [
      {
        seed: 11,
        caption:
          "Thistle Meadow, region one. The bees are friendly until they aren't.",
      },
      { seed: 27, caption: "Couch co-op on the Lowland Bridge." },
      { seed: 43, caption: "Endless mode, daily seed, a very good run." },
      { seed: 58, caption: "The postcard screen at the end of Mount Wobble." },
    ],
  },
  {
    slug: "orbital-delivery",
    name: "Orbital Delivery",
    tagline:
      "The smallest courier in the universe. The most unreasonable route.",
    genre: "Gravity puzzle",
    status: "soon",
    date: "2027-04-01",
    when: "Spring 2027",
    platforms: ["PC", "Mac", "Switch"],
    price: null,
    players: "1",
    playtime: "8–10 hours",
    scene: "space",
    palette: {
      sky: "#110c2c",
      sky2: "#2a1c62",
      far: "#ff9f5a",
      near: "#5ad1c4",
      ground: "#3b2d7a",
      hero: "#f4f1ff",
      heroDark: "#9a94c4",
      accent: "#ff5a3c",
      ink: "#0b0820",
      light: "#fff7e0",
    },
    summary:
      "Plot routes between tiny planets with one tank of fuel and a lot of gravity. Every parcel has an address, and every address is somewhere silly.",
    about: [
      "You are Pim, the only courier licensed to deliver in the Brim, a loose cluster of planets so small you can walk around them in a minute. There are no roads. There is only gravity, a slingshot, and a fuel gauge that never quite reaches full.",
      "Each delivery is a puzzle you solve by drawing a path: lean on a planet's pull to curve around it, burn fuel to correct, and arrive with the parcel upright. Late in the game, parcels start to have opinions about the route.",
      "Orbital Delivery is in production now. We share the messy middle in the devlog, and playtest builds go to the playtest list first.",
    ],
    features: [
      {
        title: "Draw, then fly",
        text: "Plan a trajectory with the ghost line, commit, and watch it play out. Rewind any time.",
      },
      {
        title: "Forty planets with their own gravity",
        text: "Dense ones, fluffy ones, a planet that spins the wrong way and is very proud of it.",
      },
      {
        title: "The parcel cares",
        text: "Fragile, perishable, sleepy, magnetic: cargo rules turn a solved route into a new puzzle.",
      },
      {
        title: "A post office to run",
        text: "Between shifts, decorate Pim's depot and read the letters people send back.",
      },
    ],
    specs: [
      ["Engine", "Godot 4"],
      ["Input", "Controller, mouse, touch (Switch handheld)"],
      ["Languages", "At launch: English, French, German, Spanish, Japanese"],
      ["Status", "In production, playtests from winter 2026"],
      ["Rating", "Pending"],
    ],
    quotes: [
      {
        text: "Fifteen minutes with the prototype and I was drawing orbits on a napkin.",
        source: "Indie Shelf",
      },
    ],
    awards: ["Official selection — Next Fest Halden 2026"],
    store: [
      { label: "Wishlist on Steam", href: "https://store.steampowered.com/" },
    ],
    shots: [
      {
        seed: 5,
        caption: "A slingshot around Doughnut, the planet with a hole in it.",
      },
      {
        seed: 19,
        caption: "Ghost line planning on the third route of the Brim.",
      },
      { seed: 33, caption: "Late delivery. The parcel is not impressed." },
    ],
  },
  {
    slug: "lantern-keeper",
    name: "Lantern Keeper",
    tagline: "Keep the light on. Keep the kettle warm.",
    genre: "Cozy management sim",
    status: "out",
    date: "2023-10-19",
    when: "October 2023",
    platforms: ["PC", "Mac", "Switch", "PS5"],
    price: 16.99,
    players: "1",
    playtime: "15–20 hours",
    scene: "sea",
    palette: {
      sky: "#ff9466",
      sky2: "#ffd9a0",
      far: "#7a6293",
      near: "#3d3360",
      ground: "#24305e",
      hero: "#e8443a",
      heroDark: "#a82e2b",
      accent: "#ffd54a",
      ink: "#1a1530",
      light: "#fff3dc",
    },
    summary:
      "Run a lighthouse on a stubborn little island for one year. Trim wicks, log ships, bake for the fog days and keep everyone home safe.",
    about: [
      "Lantern Keeper is about doing small jobs well. You inherit the light on Gull Rock from your aunt Margit, along with her logbook, her cat and her opinions about how bread should be made.",
      "Days have a rhythm: climb, trim, wind, polish, log. Weather changes the rhythm. Fog means the horn, storms mean the long night, and the supply boat only comes when the sea allows it.",
      "There are no fail states. Ships that pass in the dark will remember you, and some of them will come back with stories and seeds and, once, a very confused goat.",
    ],
    features: [
      {
        title: "A full year on the rock",
        text: "Fifty-two weeks of tides, seasons and weather, generated fresh each new keeper.",
      },
      {
        title: "The logbook",
        text: "Everything you do is written into a logbook you can read back, share, or print.",
      },
      {
        title: "Bake for the fog",
        text: "A small, honest baking system: flour, water, time, and Margit's notes in the margins.",
      },
      {
        title: "Gentle by design",
        text: "Nothing is lost forever. Missed a ship? It sends a postcard and tries again next week.",
      },
    ],
    specs: [
      ["Engine", "Godot 3, ported to 4 for PS5"],
      ["Input", "Controller, keyboard and mouse"],
      [
        "Languages",
        "English, French, German, Spanish, Italian, Japanese, Korean, Simplified Chinese",
      ],
      ["Size", "1.2 GB"],
      ["Rating", "Everyone"],
    ],
    quotes: [
      {
        text: "A game about maintenance that somehow feels like a hug.",
        source: "Pixel Weekly",
      },
      {
        text: "The logbook system is quietly the best writing tool in any sim I have played.",
        source: "The Save Point",
      },
    ],
    awards: [
      "Players' Choice — Cozy Games Fair 2023",
      "Best Audio — Halden Indie Showcase 2024",
    ],
    store: [
      { label: "Buy on Steam", href: "https://store.steampowered.com/" },
      { label: "Nintendo eShop", href: "https://www.nintendo.com/" },
      { label: "PlayStation Store", href: "https://store.playstation.com/" },
    ],
    shots: [
      {
        seed: 7,
        caption: "Gull Rock at dusk, lamp lit, supply boat late again.",
      },
      {
        seed: 21,
        caption:
          "Autumn swell. Margit's logbook says to expect the horn tonight.",
      },
      { seed: 36, caption: "The long night of the February storm." },
    ],
  },
  {
    slug: "tiny-tide",
    name: "Tiny Tide",
    tagline: "Every cast is a new pond.",
    genre: "Fishing roguelite",
    status: "out",
    date: "2022-11-03",
    when: "November 2022",
    platforms: ["PC", "Switch"],
    price: 9.99,
    players: "1",
    playtime: "10 hours, endlessly replayable",
    scene: "deep",
    palette: {
      sky: "#58c9cc",
      sky2: "#0e4a6e",
      far: "#2a8a84",
      near: "#17605f",
      ground: "#d9b77c",
      hero: "#ffb23f",
      heroDark: "#e0761f",
      accent: "#ff6f61",
      ink: "#0a2233",
      light: "#effcff",
    },
    summary:
      "Drop a line into a pond that rearranges itself every time. Catch the fish, trade for better lures, and try to reach the bottom before your line runs out.",
    about: [
      "Tiny Tide began as a game jam entry called 'One More Cast' and refused to stop growing. Each dive drops you into a freshly generated pond, deeper and stranger than the last.",
      "There are 140 fish, every one with a name, a mood and a favourite lure. Some only come out at night. One only comes out if you have been kind to the snail.",
      "Runs last ten to fifteen minutes. Between them, the bait shop on the jetty sells upgrades for shells, and the shopkeeper keeps a running commentary on your technique.",
    ],
    features: [
      {
        title: "140 named fish",
        text: "Each with its own behaviour, habitat and a short entry in the field guide.",
      },
      {
        title: "Ponds that reshuffle",
        text: "Seeded layouts mean no two runs share a pond, unless you want to share a seed with a friend.",
      },
      {
        title: "Lures with personality",
        text: "Thirty lures that change how the line moves, sinks and wiggles.",
      },
      {
        title: "Photo mode",
        text: "Freeze the pond and frame your catch. The fish are told in advance.",
      },
    ],
    specs: [
      ["Engine", "Godot 3"],
      ["Input", "Controller, keyboard and mouse"],
      ["Languages", "English, French, German, Spanish, Japanese"],
      ["Size", "290 MB"],
      ["Rating", "Everyone"],
    ],
    quotes: [
      {
        text: "The rare roguelite that makes losing feel like a nice afternoon.",
        source: "Indie Shelf",
      },
    ],
    awards: ["Best Game Jam Graduate — Pixel Weekly Awards 2022"],
    store: [
      { label: "Buy on Steam", href: "https://store.steampowered.com/" },
      { label: "Nintendo eShop", href: "https://www.nintendo.com/" },
    ],
    shots: [
      { seed: 3, caption: "The reed shallows, first pond of every run." },
      {
        seed: 17,
        caption: "Thirty metres down. Something big is curious about the lure.",
      },
      {
        seed: 29,
        caption: "The field guide fills up one named fish at a time.",
      },
    ],
  },
  {
    slug: "night-shift",
    name: "Night Shift at the Wash-o-Mat",
    tagline:
      "Somebody keeps leaving one sock behind. Every night. In machine six.",
    genre: "Narrative mystery",
    status: "out",
    date: "2021-06-24",
    when: "June 2021",
    platforms: ["PC", "Mac"],
    price: 7.99,
    players: "1",
    playtime: "3 hours",
    scene: "city",
    palette: {
      sky: "#131331",
      sky2: "#2c2a5a",
      far: "#22214a",
      near: "#34315f",
      ground: "#1b1a35",
      hero: "#8be3d0",
      heroDark: "#4fa99a",
      accent: "#ffd166",
      ink: "#0b0a1c",
      light: "#f6f1ff",
    },
    summary:
      "A short mystery set over seven night shifts at an all-night laundromat, told through the people who come in after midnight.",
    about: [
      "You work nights at the Wash-o-Mat on Corder Street. The regulars come in with their laundry and their worries, and you have nothing but time, a mop and a vending machine that only takes exact change.",
      "Talk, listen, fold. Every conversation leaves a little clue. By the seventh night you will know who leaves the sock, why it's always machine six, and what the cat has to do with any of it.",
      "Night Shift was our second game and our first with writing at its heart. It's short on purpose: a single evening, ideally with the lights off.",
    ],
    features: [
      {
        title: "Seven nights, seven regulars",
        text: "Each with a full story arc that changes depending on what you notice.",
      },
      {
        title: "Folding as dialogue",
        text: "How carefully you fold someone's laundry quietly changes how they talk to you.",
      },
      {
        title: "A real ending",
        text: "Four endings, none of them bad, all of them earned.",
      },
      {
        title: "Lo-fi soundtrack",
        text: "Twenty tracks by the studio, built around the hum of the dryers.",
      },
    ],
    specs: [
      ["Engine", "Custom, on top of LÖVE"],
      ["Input", "Keyboard and mouse, controller"],
      ["Languages", "English, French, Spanish"],
      ["Size", "180 MB"],
      ["Rating", "Teen (mild language)"],
    ],
    quotes: [
      {
        text: "Three hours, one laundromat, and the warmest cast of strangers in years.",
        source: "Couch Co-op Quarterly",
      },
    ],
    awards: ["Narrative Award — Halden Indie Showcase 2021"],
    store: [{ label: "Buy on Steam", href: "https://store.steampowered.com/" }],
    shots: [
      {
        seed: 9,
        caption: "Corder Street, 2:14 am. Machine six is spinning on its own.",
      },
      { seed: 24, caption: "The regulars' corner under the flickering sign." },
      { seed: 41, caption: "Night five. The cat knows something." },
    ],
  },
  {
    slug: "pair-up",
    name: "Pair Up!",
    tagline: "A tiny game for a happy brain.",
    genre: "Memory",
    status: "free",
    date: "2020-02-08",
    when: "February 2020",
    platforms: ["Browser"],
    price: null,
    players: "1",
    playtime: "1 minute a round",
    scene: "cards",
    palette: {
      sky: "#6848bd",
      sky2: "#8a6be0",
      far: "#edc6e6",
      near: "#faf2de",
      ground: "#4a2f99",
      hero: "#e98c5d",
      heroDark: "#c4683c",
      accent: "#ffcf3d",
      ink: "#22164d",
      light: "#fffaf0",
    },
    summary:
      "Our very first game, made in a weekend: twelve cards, six pairs, and one question. How few moves can you do it in?",
    about: [
      "Pair Up! was a 48-hour jam game, made on a borrowed laptop in Juno's kitchen. It has outlived three of our computers and still gets played more than anything else we've made.",
      "The rules haven't changed: flip two cards, keep them if they match, remember them if they don't. The faces are characters from our other games, so it doubles as a very short tour of the studio.",
      "It's free, it runs in your browser, and it's right here on this page.",
    ],
    features: [
      {
        title: "Twelve cards, six pairs",
        text: "A round takes about a minute. Your best takes considerably longer.",
      },
      {
        title: "Keyboard friendly",
        text: "Tab to a card, then Enter or Space to flip it. Every card announces itself to screen readers.",
      },
      {
        title: "Studio cameos",
        text: "Blob, Pim's courier ship, a Tiny Tide fish and more turn up on the cards.",
      },
      {
        title: "No account, no ads",
        text: "It's a memory game. It doesn't need to know anything about you.",
      },
    ],
    specs: [
      ["Engine", "React, in your browser"],
      ["Input", "Mouse, touch, keyboard"],
      ["Languages", "English"],
      ["Size", "Smaller than this page"],
      ["Rating", "Everyone"],
    ],
    quotes: [
      {
        text: "Still the best minute you can spend on a studio website.",
        source: "Pixel Weekly",
      },
    ],
    awards: ["Top 10 — Halden Weekend Jam 2020"],
    store: [{ label: "Pair Up! on itch.io", href: "https://itch.io/" }],
    demo: "pair-up",
    shots: [
      { seed: 2, caption: "A fresh deal. Six pairs hiding somewhere." },
      { seed: 14, caption: "Two flipped, two to go." },
      { seed: 31, caption: "Nearly there. Concentrate." },
    ],
  },
  {
    slug: "kite-season",
    name: "Kite Season",
    tagline: "Fly a kite over a town that keeps changing the wind.",
    genre: "Game jam prototype",
    status: "free",
    date: "2024-07-21",
    when: "July 2024",
    platforms: ["PC", "Mac", "Browser"],
    price: null,
    players: "1",
    playtime: "20 minutes",
    scene: "sky",
    palette: {
      sky: "#3a9cff",
      sky2: "#c4e8ff",
      far: "#a8dba0",
      near: "#6cbf6a",
      ground: "#4c9a52",
      hero: "#ff5a5f",
      heroDark: "#c23b44",
      accent: "#ffd23f",
      ink: "#1d1631",
      light: "#ffffff",
    },
    summary:
      "A summer jam game about keeping a kite up for one long afternoon. Read the wind, dodge the bunting, and land it before dinner.",
    about: [
      "Every July the studio stops for a week and makes something small. In 2024 the theme was 'tension' and we took it literally: a kite string, a gusty hill, and the constant decision to let out line or reel it in.",
      "Kite Season is unfinished on purpose. It's a prototype, it has rough edges, and it's free. A few of its wind ideas found their way into Orbital Delivery's gravity.",
    ],
    features: [
      {
        title: "One string, two hands",
        text: "Let out line and reel in with separate inputs. It sounds simple. It is not.",
      },
      {
        title: "Wind you can read",
        text: "Flags, smoke and laundry lines show the gusts coming before they arrive.",
      },
      {
        title: "Made in a week",
        text: "Source project included for anyone who wants to see how a jam game holds together.",
      },
    ],
    specs: [
      ["Engine", "Godot 4"],
      ["Input", "Keyboard, controller, mouse"],
      ["Languages", "English"],
      ["Size", "60 MB"],
      ["Rating", "Everyone"],
    ],
    quotes: [
      {
        text: "A jam game with better wind physics than most finished games.",
        source: "Indie Shelf",
      },
    ],
    awards: ["Most Relaxing — Summer Jam Week 2024"],
    store: [{ label: "Free on itch.io", href: "https://itch.io/" }],
    shots: [
      { seed: 4, caption: "Over the allotments with the wind behind you." },
      { seed: 16, caption: "Bunting season. Mind the string." },
      {
        seed: 38,
        caption: "Late afternoon, three kites, one tangle waiting to happen.",
      },
    ],
  },
];

export const statusLabel: Record<GameStatus, string> = {
  out: "Out now",
  soon: "In production",
  free: "Free",
};

/* ------------------------------------------------------------------ home */

export const home = {
  title: "Little games. Big feelings.",
  lede: "Arcade is a nine-person studio in an old button factory in Halden. We make short, kind, very replayable games, and we finish them. Our latest, Blob Hop, is out now, and you can play it right here.",
  featured: "blob-hop",
  shelf: {
    title: "The shelf",
    text: "Seven games since 2019: four in shops, two free, one on the workbench.",
  },
  play: {
    title: "Insert coin. Or don't, it's free.",
    text: "This is the first region of Blob Hop, running in your browser. Press Space, tap the screen, or use the buttons. Hold to hop higher.",
  },
  next: {
    slug: "orbital-delivery",
    title: "Next on the workbench",
    text: "Orbital Delivery is our biggest game yet and our first puzzle game: draw a route between tiny planets, lean on their gravity, and get the parcel there upright. Playtests start this winter for the playtest list.",
  },
  quote: {
    text: "Arcade make the kind of games you finish on a Sunday and think about on Monday.",
    source: "The Save Point, studio profile, 2025",
  },
  studio: {
    title: "Nine people, one old button factory",
    text: "We work four-day weeks on the third floor at Mill Row, with a shared kitchen, a lot of plants and one rule: no crunch. Small team, small games, finished.",
  },
  jobs: {
    title: "We're hiring for Orbital Delivery",
    text: "Four roles open, remote or in the studio. Salaries are on every listing.",
  },
  close: {
    title: "One more go?",
    text: "Blob is waiting at the bottom of Thistle Meadow. Your best score is saved on this device.",
  },
};

/* ------------------------------------------------------------------ studio */

export type HairStyle = "short" | "long" | "bun" | "cap" | "curly";
export type Person = {
  name: string;
  role: string;
  bio: string;
  hair: string;
  skin: string;
  shirt: string;
  style: HairStyle;
};

export const team: Person[] = [
  {
    name: "Juno Okafor",
    role: "Co-founder, creative director",
    bio: "Made Pair Up! on a borrowed laptop. Still designs every first level.",
    hair: "#1d1631",
    skin: "#8a5a3c",
    shirt: "#ff7aa8",
    style: "curly",
  },
  {
    name: "Mats Lindqvist",
    role: "Co-founder, technical director",
    bio: "Writes the tools. Owns three mechanical keyboards and no opinions about them, he says.",
    hair: "#e4c27a",
    skin: "#f1c9a8",
    shirt: "#5b3fd1",
    style: "short",
  },
  {
    name: "Priya Raman",
    role: "Lead artist",
    bio: "Draws every planet in Orbital Delivery on a sixteen-pixel budget.",
    hair: "#2a1a14",
    skin: "#b07850",
    shirt: "#ffcf3d",
    style: "long",
  },
  {
    name: "Theo Vasquez",
    role: "Gameplay programmer",
    bio: "Tuned Blob's jump for nine months. Will show you the curve.",
    hair: "#3b2418",
    skin: "#c48a62",
    shirt: "#4caa60",
    style: "cap",
  },
  {
    name: "Ada Brennan",
    role: "Producer",
    bio: "Keeps the four-day week honest and the release dates real.",
    hair: "#b8452a",
    skin: "#f3d2b8",
    shirt: "#58c9cc",
    style: "bun",
  },
  {
    name: "Kiko Sato",
    role: "Level designer",
    bio: "Builds puzzles on graph paper first. Has a drawer of rejected planets.",
    hair: "#141414",
    skin: "#e8c39e",
    shirt: "#ff9466",
    style: "short",
  },
  {
    name: "Rosa Mendel",
    role: "Community and marketing",
    bio: "Runs the Discord, the playtests and the studio's one good camera.",
    hair: "#6b3f2a",
    skin: "#d9a982",
    shirt: "#e8443a",
    style: "long",
  },
  {
    name: "Bram de Wit",
    role: "Engine and ports",
    bio: "Got Lantern Keeper onto a handheld in eleven weeks. Hasn't slept since, allegedly.",
    hair: "#9a9a9a",
    skin: "#f0c8a6",
    shirt: "#3d3360",
    style: "curly",
  },
  {
    name: "Noor Haddad",
    role: "Writer and narrative designer",
    bio: "Wrote every regular at the Wash-o-Mat and every letter Pim receives.",
    hair: "#24160f",
    skin: "#c9946c",
    shirt: "#8be3d0",
    style: "bun",
  },
];

export const studio = {
  title: "A small studio that finishes things",
  lede: "Arcade started in 2019 as two friends and a game jam. Seven games later we are nine people, still independent, still making games that fit in an evening and stay with you for longer.",
  story: [
    "Juno and Mats met at a Halden game jam in 2019, lost, and made Pair Up! the weekend after out of spite. It got played four hundred thousand times in a month, which felt like a sign.",
    "Since then we've stayed deliberately small. Every game is built by the whole team, every game ships with an assist mode, and every game is finished before we start the next one. We'd rather make one good small thing than three promising large ones.",
    "We're self-funded from our own sales. That means no publisher deadlines, a four-day week, and the occasional month where everyone eats a lot of soup.",
  ],
  principles: [
    {
      title: "Finish small games",
      text: "Scope is a design tool. If it doesn't fit in a year, it doesn't fit.",
    },
    {
      title: "No crunch, ever",
      text: "Four-day weeks, no overtime, no exceptions before a launch. Dates move instead.",
    },
    {
      title: "Assist mode on day one",
      text: "Every game can be slowed, simplified or skipped. Play is for everyone.",
    },
    {
      title: "Pay people fairly, in public",
      text: "Every job listing has a salary range. Every role at the same level earns the same.",
    },
  ],
  timeline: [
    {
      year: "2019",
      text: "Studio founded after the Halden Weekend Jam. Two people, one kitchen table.",
    },
    {
      year: "2020",
      text: "Pair Up! released free in the browser.",
      game: "pair-up",
    },
    {
      year: "2021",
      text: "Night Shift at the Wash-o-Mat. First game with a price tag, first game with a cat.",
      game: "night-shift",
    },
    {
      year: "2022",
      text: "Tiny Tide grows from a jam game into a full roguelite. Team of five.",
      game: "tiny-tide",
    },
    {
      year: "2023",
      text: "Lantern Keeper launches on four platforms. We move into Mill Row.",
      game: "lantern-keeper",
    },
    {
      year: "2024",
      text: "Kite Season made in a jam week. Four-day week becomes permanent.",
      game: "kite-season",
    },
    {
      year: "2025",
      text: "Blob Hop, our biggest launch so far. Team of nine.",
      game: "blob-hop",
    },
    {
      year: "2027",
      text: "Orbital Delivery, spring. Wishlists open now.",
      game: "orbital-delivery",
    },
  ] as { year: string; text: string; game?: string }[],
  visit: {
    title: "Come say hello",
    text: "We open the studio on the first Friday of every month for playtests, tea and an honest look at whatever we're stuck on. Book a spot through the playtest list.",
  },
};

/* ------------------------------------------------------------------ devlog */

export type PostTag = "Design" | "Art" | "Tech" | "Studio" | "Release";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string; by: string }
  | { kind: "shot"; game: string; seed: number; caption: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: PostTag;
  game?: string;
  author: string;
  minutes: number;
  excerpt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "the-fuel-tank-is-the-level-designer",
    title: "The fuel tank is the level designer",
    date: "2026-09-24",
    tag: "Design",
    game: "orbital-delivery",
    author: "Kiko Sato",
    minutes: 7,
    excerpt:
      "We spent a year building levels for Orbital Delivery. Then we deleted most of them and let one number do the work instead.",
    body: [
      {
        kind: "p",
        text: "For most of last year, every Orbital Delivery level was hand-placed: planets, their masses, the start point, the drop point. We had about ninety of them. Playtesters liked maybe twenty.",
      },
      {
        kind: "p",
        text: "The twenty they liked had one thing in common. They didn't need a clever planet layout. They needed the fuel tank to be exactly too small for the obvious route.",
      },
      { kind: "h", text: "One number, a lot of puzzles" },
      {
        kind: "p",
        text: "Fuel is the only resource Pim has. When the tank is generous, every level is a straight line with a wobble in it. When it's tight, you start looking at planets as tools: a slingshot here, a slow drift there, a long loop round the dense one that costs nothing but time.",
      },
      {
        kind: "shot",
        game: "orbital-delivery",
        seed: 19,
        caption:
          "The same three planets. With a full tank this route is a straight line; at 40% it becomes a figure of eight.",
      },
      {
        kind: "p",
        text: "So we flipped our process. Kiko now builds a layout, solves it with the shortest fuel route she can find, and sets the tank to that number plus a sliver. If the sliver is too big, the level gets lazy. If there's no sliver at all, it gets mean.",
      },
      { kind: "h", text: "What we cut" },
      {
        kind: "list",
        items: [
          "Seventy levels that were only interesting because of their layout.",
          "Moving planets, which looked great and played like a coin toss.",
          "A fuel pickup that solved every problem it was meant to create.",
        ],
      },
      {
        kind: "quote",
        text: "If a level needs a tutorial, the tank is probably the wrong size.",
        by: "Kiko's sticky note, still on the monitor",
      },
      {
        kind: "p",
        text: "We're at sixty levels now, every one built around a tank. The first public playtest goes out to the playtest list this winter, and we'd love to hear where it feels mean.",
      },
    ],
  },
  {
    slug: "drawing-planets-on-a-sixteen-pixel-budget",
    title: "Drawing planets on a sixteen-pixel budget",
    date: "2026-08-12",
    tag: "Art",
    game: "orbital-delivery",
    author: "Priya Raman",
    minutes: 6,
    excerpt:
      "Forty planets, each one recognisable at sixteen pixels across. Here's the rulebook we wrote to make that possible.",
    body: [
      {
        kind: "p",
        text: "Orbital Delivery zooms out a lot. When you're planning a route the whole map is on screen, and a planet can end up sixteen pixels wide. It still has to tell you how heavy it is, which way it spins, and whether it's the one with the post office.",
      },
      { kind: "h", text: "The rulebook" },
      {
        kind: "list",
        items: [
          "Mass is value: denser planets are darker, always, on every palette.",
          "Spin is a single highlight pixel that travels round the rim.",
          "Every planet gets one silhouette feature: a ring, a bite, a hat, a hole.",
          "No outlines thinner than one screen pixel at the furthest zoom.",
        ],
      },
      {
        kind: "shot",
        game: "orbital-delivery",
        seed: 5,
        caption:
          "Doughnut, Pebble and Old Heavy at planning zoom. You can read the mass before you read the names.",
      },
      {
        kind: "p",
        text: "The silhouette rule was the big one. Early planets were all circles with texture, and from far away they were all just circles. Giving each one a single shape idea made them nameable, and players started saying things like 'go round the one with the hat' without us prompting them.",
      },
      {
        kind: "quote",
        text: "If you can't name it from across the room, it's not finished.",
        by: "Priya",
      },
      {
        kind: "p",
        text: "We'll share the full palette sheet with the press kit at launch. Until then, there's a work-in-progress version pinned in the Discord.",
      },
    ],
  },
  {
    slug: "blob-hop-1-3-patch-notes",
    title:
      "Blob Hop 1.3: couch co-op everywhere, assist presets and forty new levels",
    date: "2026-06-30",
    tag: "Release",
    game: "blob-hop",
    author: "Theo Vasquez",
    minutes: 4,
    excerpt:
      "Our biggest free update yet. Co-op works on every level, assist mode gets presets, and the Windy Tops region arrives with forty new levels.",
    body: [
      {
        kind: "p",
        text: "Version 1.3 is live on Steam and Switch today. It's free for everyone who owns Blob Hop, and it's the update most of you asked for in the survey.",
      },
      { kind: "h", text: "New" },
      {
        kind: "list",
        items: [
          "Windy Tops: a ninth region with forty levels and a new gust mechanic.",
          "Couch co-op on every level, including the postcard bosses.",
          "Assist presets: Gentle, Relaxed and Classic, plus every individual toggle as before.",
          "Daily seed history, so you can replay the last seven days.",
        ],
      },
      { kind: "h", text: "Fixed" },
      {
        kind: "list",
        items: [
          "The second blob no longer gets stuck in the Lowland Bridge railings.",
          "Bees now respect assist slow-down properly.",
          "Switch handheld: touch input no longer double-hops on the first tap.",
          "Corrected the German postcard text for Mount Wobble. Sorry, Wobbelberg.",
        ],
      },
      {
        kind: "shot",
        game: "blob-hop",
        seed: 58,
        caption:
          "Windy Tops at sunset. The gusts push both blobs, which is exactly as chaotic as it sounds.",
      },
      {
        kind: "p",
        text: "Thank you to everyone in the playtest list who tried 1.3 early. Forty-one of the fixes above came from your reports.",
      },
    ],
  },
  {
    slug: "zero-crunch-the-spreadsheet",
    title: "We shipped with zero crunch. Here's the spreadsheet.",
    date: "2026-05-08",
    tag: "Studio",
    author: "Ada Brennan",
    minutes: 8,
    excerpt:
      "Blob Hop launched without a single overtime hour. It wasn't luck. It was a spreadsheet, two moved dates and one cut region.",
    body: [
      {
        kind: "p",
        text: "People keep asking how a nine-person studio shipped a game on three platforms without crunch. The honest answer is boring: we decided in advance that the date would move before the hours did, and we kept a spreadsheet that made it obvious when that was about to happen.",
      },
      { kind: "h", text: "How the sheet works" },
      {
        kind: "list",
        items: [
          "Every task gets an estimate in days, made by the person doing it.",
          "Every week, we compare done work to estimated work and update a single number: projected launch.",
          "If projected launch slides past the planned date by two weeks, we cut or we move. That's the whole rule.",
        ],
      },
      {
        kind: "p",
        text: "Over Blob Hop's development the date moved twice, by a total of seven weeks. We cut one region, the Fizzy Caves, which came back later as free content. Nobody worked a fifth day.",
      },
      {
        kind: "quote",
        text: "A date is a guess. Hours are people.",
        by: "Written on the kitchen whiteboard in 2022 and never wiped off",
      },
      { kind: "h", text: "What it cost us" },
      {
        kind: "p",
        text: "Moving dates is not free. We missed a showcase slot and a seasonal sale. We think the trade was worth it, and our sales since launch suggest players didn't mind waiting. We're sharing the template on the press page for any studio that wants it.",
      },
    ],
  },
  {
    slug: "porting-lantern-keeper-in-eleven-weeks",
    title: "Porting Lantern Keeper to a handheld in eleven weeks",
    date: "2026-03-19",
    tag: "Tech",
    game: "lantern-keeper",
    author: "Bram de Wit",
    minutes: 9,
    excerpt:
      "A Godot 3 game, a 4 GB memory budget and a deadline. What we changed, what we didn't, and the fog shader that nearly ended it.",
    body: [
      {
        kind: "p",
        text: "Lantern Keeper was built for desktops with plenty of memory and no particular hurry. Getting it running at a steady 60 on a handheld meant touching almost every system once, and a few of them three times.",
      },
      { kind: "h", text: "The big three" },
      {
        kind: "list",
        items: [
          "Texture atlases rebuilt per season instead of all at once, halving memory at load.",
          "The logbook moved from live text rendering to cached pages.",
          "Sea simulation dropped from 128 to 48 columns, which nobody has noticed.",
        ],
      },
      {
        kind: "shot",
        game: "lantern-keeper",
        seed: 36,
        caption:
          "The February storm on handheld. The rain is now drawn in one pass instead of four.",
      },
      { kind: "h", text: "The fog shader" },
      {
        kind: "p",
        text: "Fog is a mechanic in Lantern Keeper, not decoration, so we couldn't just turn it down. The original shader sampled the scene nine times per pixel. The handheld version samples twice and fakes the rest with a pre-blurred copy of the horizon, updated every fourth frame. Side by side, only Priya can tell.",
      },
      {
        kind: "p",
        text: "The port shipped in week eleven. Bram took week twelve off, and has asked that we stop calling it 'the fog incident'.",
      },
    ],
  },
  {
    slug: "why-blob-has-no-arms",
    title: "Why Blob has no arms",
    date: "2026-01-27",
    tag: "Design",
    game: "blob-hop",
    author: "Juno Okafor",
    minutes: 5,
    excerpt:
      "Arms mean grabbing, grabbing means a second button, and a second button would have made a completely different game.",
    body: [
      {
        kind: "p",
        text: "In the first prototype, Blob had little arms. They were very cute. They could grab ledges, and the moment they could grab ledges, we needed a grab button.",
      },
      {
        kind: "p",
        text: "A second button changed everything. Levels got taller, timing got fussier, and the game stopped being something you could play with one thumb on a train. We took the arms off in week three and never looked back.",
      },
      { kind: "h", text: "One button, three verbs" },
      {
        kind: "list",
        items: [
          "Tap: a short hop that clears thistles.",
          "Hold: a floaty hop that reaches berries and, sometimes, bees.",
          "Release early: a quick drop, the move speedrunners live on.",
        ],
      },
      {
        kind: "shot",
        game: "blob-hop",
        seed: 11,
        caption:
          "Thistle Meadow was built entirely around the difference between a tap and a hold.",
      },
      {
        kind: "quote",
        text: "Every verb we removed made the remaining one more interesting.",
        by: "Juno",
      },
      {
        kind: "p",
        text: "You can try all three right now on the Play page. The demo there is the real first region, physics and all.",
      },
    ],
  },
  {
    slug: "every-fish-has-a-name",
    title: "Every fish in Tiny Tide has a name, and other database confessions",
    date: "2025-11-14",
    tag: "Tech",
    game: "tiny-tide",
    author: "Mats Lindqvist",
    minutes: 6,
    excerpt:
      "140 fish, one spreadsheet, and the build step that turns Noor's field notes into game data without anyone touching a line of code.",
    body: [
      {
        kind: "p",
        text: "Tiny Tide has 140 fish. Each has a name, a mood, a habitat depth range, a favourite lure, a time of day and a short field guide entry written by Noor. That's a lot of data for a team of five, and in 2022 we were a team of five.",
      },
      { kind: "h", text: "The spreadsheet is the source of truth" },
      {
        kind: "p",
        text: "All fish live in one shared spreadsheet. A small build step exports it, validates it, and generates the game's data files. If Noor renames a fish, the next build has the new name. Nobody opens the engine.",
      },
      {
        kind: "list",
        items: [
          "Depth ranges are checked against the pond generator so no fish is impossible to catch.",
          "Every lure must be the favourite of at least two fish.",
          "Field guide entries longer than 240 characters fail the build. Noor hates this rule.",
        ],
      },
      {
        kind: "shot",
        game: "tiny-tide",
        seed: 29,
        caption:
          "The field guide, generated from the same spreadsheet the designers edit.",
      },
      {
        kind: "p",
        text: "We've used the same pipeline for every game since. Orbital Delivery's planets are in a spreadsheet right now, and yes, they all have names too.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ jobs */

export type Job = {
  slug: string;
  title: string;
  team: string;
  type: string;
  location: string;
  salary: string;
  summary: string;
  about: string[];
  doing: string[];
  have: string[];
  nice: string[];
};

export const jobs: Job[] = [
  {
    slug: "gameplay-programmer",
    title: "Gameplay Programmer",
    team: "Orbital Delivery",
    type: "Full-time, 4-day week",
    location: "Remote (UTC−5 to UTC+3) or Halden studio",
    salary: "$92,000 – $110,000",
    summary:
      "Own the trajectory planner and the feel of flight in Orbital Delivery.",
    about: [
      "Orbital Delivery lives or dies on how good it feels to draw a route and watch it play out. You'll own that loop: the ghost-line planner, the physics that follows it, and the tiny moments of feedback that make a perfect slingshot feel perfect.",
      "You'll work most closely with Theo (gameplay) and Kiko (levels), and report to Mats.",
    ],
    doing: [
      "Build and tune the trajectory planner and rewind system in Godot 4.",
      "Prototype cargo rules with the level designer, then make the good ones solid.",
      "Profile and keep the game at a steady 60 on Switch.",
      "Pair with the artist on effects that explain the physics.",
    ],
    have: [
      "Shipped at least one game, commercial or not, that you can show us.",
      "Comfortable in GDScript or C#, and with the vector maths that orbits need.",
      "A habit of making small, testable changes and writing down why.",
    ],
    nice: [
      "Experience with Godot 4 specifically.",
      "You've built level editors or debug tools that other people used.",
    ],
  },
  {
    slug: "environment-pixel-artist",
    title: "Environment Pixel Artist",
    team: "Orbital Delivery",
    type: "Full-time, 4-day week",
    location: "Remote (UTC−5 to UTC+3) or Halden studio",
    salary: "$78,000 – $94,000",
    summary:
      "Paint the Brim: planets, depots, backgrounds and the space between them.",
    about: [
      "Priya has written the rulebook for Orbital Delivery's planets. We need someone to help fill the universe: backgrounds that read at every zoom, depot interiors full of small stories, and seasonal variations for the post office.",
      "You'll work closely with Priya and the level designers, with a lot of room to propose your own ideas.",
    ],
    doing: [
      "Create planet sets and background layers within the established palette rules.",
      "Design and paint depot interiors and decoration items.",
      "Animate small environmental loops: spinning rims, drifting debris, blinking beacons.",
      "Give and receive art critique in our Thursday art review.",
    ],
    have: [
      "A portfolio of pixel art environments, personal work welcome.",
      "Strong sense of value and silhouette at small sizes.",
      "Comfortable with Aseprite or a similar tool.",
    ],
    nice: [
      "Experience exporting assets into Godot or another engine.",
      "Animation experience beyond loops.",
    ],
  },
  {
    slug: "qa-and-community-lead",
    title: "QA & Community Lead",
    team: "Studio",
    type: "Full-time, 4-day week",
    location: "Halden studio, two days a week minimum",
    salary: "$70,000 – $82,000",
    summary:
      "Run our playtests and our Discord, and turn player reports into fixes.",
    about: [
      "Our playtest list is one of the best things we have. Forty-one of Blob Hop 1.3's fixes came from it. We need someone to run it properly: recruit testers, write test plans, triage reports, and close the loop with players when things get fixed.",
      "You'll share community duties with Rosa and sit in on every sprint review.",
    ],
    doing: [
      "Plan and run monthly playtests, remote and in the studio.",
      "Triage bug reports from players and the team into clear, reproducible tickets.",
      "Moderate the Discord with Rosa and keep its tone kind.",
      "Write patch notes that humans want to read.",
    ],
    have: [
      "Experience testing games or software, formally or as a dedicated community member.",
      "Clear writing and patience with very long bug threads.",
      "Comfortable saying 'I don't know yet, I'll find out'.",
    ],
    nice: [
      "Experience with console certification checklists.",
      "A second language from our localisation list.",
    ],
  },
  {
    slug: "composer-sound-designer",
    title: "Composer & Sound Designer",
    team: "Orbital Delivery",
    type: "Contract, 9 months, part-time",
    location: "Remote",
    salary: "$6,500 per month, 3 days a week",
    summary:
      "Write the soundtrack for a quiet, funny game about delivering parcels in space.",
    about: [
      "Orbital Delivery needs music that loops for a long time without getting tiring, reacts to how a route is going, and has a sense of humour. We're imagining small instruments and a lot of space between notes, but we'd love to hear your take.",
      "You'll own the score and the sound effects, working with Juno and the programming team on the adaptive music system.",
    ],
    doing: [
      "Compose around 60 minutes of adaptive music across five planet regions.",
      "Design sound effects for flight, cargo and the post office.",
      "Work with programmers to implement layered, state-driven music.",
    ],
    have: [
      "A body of work, ideally including at least one game soundtrack.",
      "Experience writing loops that hold up over long play sessions.",
      "Your own setup, and ownership of the score under a buy-out licence we'll discuss openly.",
    ],
    nice: ["Experience with FMOD or Godot's audio buses.", "Foley recording."],
  },
];

export const hiring = {
  title: "Make small games with us",
  lede: "We're nine people making Orbital Delivery, and we're hiring four more. Every listing has its salary range, every role gets a four-day week, and every applicant gets a reply.",
  perks: [
    "Four-day week, 32 hours, full salary.",
    "30 days' holiday plus public holidays, and the studio closes between Christmas and New Year.",
    "Revenue share: 15% of every game's profit is split equally across the team.",
    "$1,500 a year for games, books, courses and conference tickets.",
    "Remote setup budget of $2,000, or a desk with a window at Mill Row.",
    "Parental leave at full pay for six months, for every parent.",
  ],
  process: [
    {
      title: "Apply",
      text: "A short form and your work. No cover letter theatre, just tell us what you'd like to make.",
    },
    {
      title: "First chat",
      text: "Thirty minutes with Ada and the team lead. We'll answer your questions too.",
    },
    {
      title: "Paid task",
      text: "A small task, capped at four hours and paid at $60 an hour, or a walk-through of something you've already made.",
    },
    {
      title: "Meet the team",
      text: "An hour with two or three people you'd work with. Then a decision within a week.",
    },
  ],
};

/* ------------------------------------------------------------------ press */

export const press = {
  title: "Press kit",
  lede: "Everything you need to write about Arcade and our games: facts, logos, screenshots, quotes and review keys. Use any of it freely in coverage.",
  facts: [
    ["Studio", "Arcade Games Co."],
    ["Founded", "2019, Halden"],
    ["Team", "9 people"],
    ["Funding", "Self-funded, independent"],
    ["Engine", "Godot (mostly)"],
    ["Games", "7 released or announced"],
    ["Press contact", "Rosa Mendel"],
  ] as [string, string][],
  boilerplate:
    "Arcade is an independent game studio of nine people based in Halden. Founded in 2019, the studio makes short, kind, highly replayable games including Blob Hop (2025), Lantern Keeper (2023) and Tiny Tide (2022). Every Arcade game ships with an assist mode, and the studio works a four-day week with no crunch. Its next game, Orbital Delivery, launches in spring 2027.",
  keys: {
    title: "Request a review key",
    text: "Keys are available for every released game, and preview builds of Orbital Delivery go to outlets from winter 2026. Creators and streamers of every size are welcome.",
  },
};
