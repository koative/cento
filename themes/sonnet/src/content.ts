import frenchCafe from "./assets/french-cafe.jpg";
import italianStreet from "./assets/italian-street.jpg";
import spanishWindow from "./assets/spanish-window.jpg";
import portugueseTram from "./assets/portuguese-tram.jpg";
import germanCafe from "./assets/german-cafe.jpg";
import japaneseStreet from "./assets/japanese-street.jpg";
import classroom from "./assets/classroom.jpg";
import notebook from "./assets/notebook.jpg";
import onlineDesk from "./assets/online-desk.jpg";

export type LangId =
  "french" | "italian" | "spanish" | "portuguese" | "german" | "japanese";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type Format = "Evening" | "Morning" | "Intensive" | "Online" | "Weekend";
export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Sonnet",
  sector: "Language school",
  tagline: "Small classes, real conversation, from the first evening.",
  email: "hello@sonnet.example",
  phone: "+1 555 0159",
  phoneHref: "tel:+15550159",
  address: "22 Calder Street, Northgate",
  addressNote: "Second floor, above the old bindery. Lift from the courtyard.",
};

export const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/timetable", label: "Timetable" },
  { to: "/level-test", label: "Level test" },
  { to: "/teachers", label: "Teachers" },
  { to: "/fees", label: "Fees & terms" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Learn",
    links: [
      { to: "/courses", label: "All courses" },
      { to: "/timetable", label: "Weekly timetable" },
      { to: "/level-test", label: "Free level test" },
      { to: "/fees", label: "Fees & term dates" },
    ],
  },
  {
    title: "School",
    links: [
      { to: "/teachers", label: "Our teachers" },
      { to: "/about", label: "About Sonnet" },
      { to: "/enrol", label: "Enrol" },
      { to: "/", label: "Home" },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export const hours = [
  { days: "Monday – Thursday", time: "07:30 – 21:00" },
  { days: "Friday", time: "09:00 – 17:00" },
  { days: "Saturday", time: "09:30 – 13:30" },
  { days: "Sunday", time: "Closed" },
];

export const images = {
  classroom: {
    src: classroom,
    alt: "Four students around a table covered in notebooks and coloured pens, mid-discussion",
    w: 960,
    h: 640,
  },
  notebook: {
    src: notebook,
    alt: "An open spiral notebook filled with handwritten sentences, a black pen resting across the page",
    w: 1600,
    h: 901,
  },
  online: {
    src: onlineDesk,
    alt: "Hands writing in a small notebook beside an open laptop on a wooden desk",
    w: 1024,
    h: 683,
  },
} satisfies Record<string, Img>;

export type Language = {
  id: LangId;
  name: string;
  native: string;
  code: string;
  color: string;
  hello: string;
  helloScript?: string;
  pron: string;
  phrase: string;
  translation: string;
  room: string;
  blurb: string;
  image: Img;
};

export const languages: Language[] = [
  {
    id: "french",
    name: "French",
    native: "Français",
    code: "fr",
    color: "#34508a",
    hello: "Bonjour.",
    pron: "bɔ̃.ʒuʁ",
    phrase: "On commence par un mot, on reste pour la conversation.",
    translation: "You come for a word and stay for the conversation.",
    room: "Room Verlaine",
    blurb:
      "Our oldest department: evening groups from first words to a Saturday table for confident speakers.",
    image: {
      src: frenchCafe,
      alt: "A café terrace with wicker chairs and round marble tables under a striped awning",
      w: 1024,
      h: 768,
    },
  },
  {
    id: "italian",
    name: "Italian",
    native: "Italiano",
    code: "it",
    color: "#3f7353",
    hello: "Ciao.",
    pron: "ˈtʃa.o",
    phrase: "Un caffè e due chiacchiere.",
    translation: "A coffee and a bit of a chat.",
    room: "Room Montale",
    blurb:
      "For the second trip, the in-laws and the novel you have been meaning to read in the original.",
    image: {
      src: italianStreet,
      alt: "A white Fiat 500 parked on a cobbled street outside a trattoria with umbrellas",
      w: 1023,
      h: 577,
    },
  },
  {
    id: "spanish",
    name: "Spanish",
    native: "Español",
    code: "es",
    color: "#94560f",
    hello: "Hola.",
    pron: "ˈo.la",
    phrase: "Hablando se entiende la gente.",
    translation: "People understand each other by talking.",
    room: "Room Machado",
    blurb:
      "Our busiest language: lunch-hour classes online, evening groups and a two-week intensive every month.",
    image: {
      src: spanishWindow,
      alt: "An ochre wall in late afternoon light with a barred window, a vine and an old street lamp",
      w: 1062,
      h: 1600,
    },
  },
  {
    id: "portuguese",
    name: "Portuguese",
    native: "Português",
    code: "pt",
    color: "#1d6470",
    hello: "Olá.",
    pron: "ɔˈla",
    phrase: "Devagar se vai ao longe.",
    translation: "Slowly, you go a long way.",
    room: "Room Pessoa",
    blurb:
      "European Portuguese, taught from Lisbon outwards, with Brazilian variants pointed out as they come.",
    image: {
      src: portugueseTram,
      alt: "A yellow funicular tram climbing a steep Lisbon street lined with pastel houses",
      w: 1024,
      h: 683,
    },
  },
  {
    id: "german",
    name: "German",
    native: "Deutsch",
    code: "de",
    color: "#55506a",
    hello: "Hallo.",
    pron: "haˈloː",
    phrase: "Übung macht den Meister.",
    translation: "Practice makes the master.",
    room: "Room Rilke",
    blurb:
      "Early-morning groups for people who use German at work, and a steady A1 for everyone else.",
    image: {
      src: germanCafe,
      alt: "A Berlin street café with white umbrellas and tables on a broad tree-lined pavement",
      w: 1600,
      h: 1022,
    },
  },
  {
    id: "japanese",
    name: "Japanese",
    native: "日本語",
    code: "ja",
    color: "#8e3550",
    hello: "Konnichiwa.",
    helloScript: "こんにちは",
    pron: "kon.ni.tɕi.wa",
    phrase: "継続は力なり。",
    translation: "Keeping at it is its own strength.",
    room: "Room Bashō",
    blurb:
      "Saturday mornings: kana in the first month, then the Japanese you need in shops, stations and kitchens.",
    image: {
      src: japaneseStreet,
      alt: "A narrow Kyoto shopping street after rain, shopfronts with lanterns and hanging signs",
      w: 1024,
      h: 768,
    },
  },
];

export type Session = { day: number; start: string; end: string };

export type Course = {
  id: string;
  lang: LangId;
  title: string;
  levels: Level[];
  format: Format;
  sessions: Session[];
  weeks: number;
  start: string;
  price: number;
  groupMax: number;
  seatsLeft: number;
  room: string;
  teacher: string;
  summary: string;
  description: string;
  outcomes: string[];
  syllabus: { weeks: string; title: string; text: string }[];
  phrase: { text: string; translation: string };
  materials: string;
};

export const courses: Course[] = [
  {
    id: "french-first-words",
    lang: "french",
    title: "French from the first word",
    levels: ["A1"],
    format: "Evening",
    sessions: [
      { day: 1, start: "18:30", end: "20:00" },
      { day: 3, start: "18:30", end: "20:00" },
    ],
    weeks: 10,
    start: "2026-11-10",
    price: 420,
    groupMax: 8,
    seatsLeft: 3,
    room: "Room Verlaine",
    teacher: "elodie",
    summary:
      "Two evenings a week for true beginners. You will order, introduce yourself and ask the way by week three.",
    description:
      "No textbook drills in the first hour: you start by saying who you are and asking the person next to you the same. Grammar arrives when you need it, written on the board by the sentence that called for it. By the last evening you will hold a ten-minute conversation about your week, your town and what you would like to eat.",
    outcomes: [
      "Introduce yourself and others, and ask the questions people actually ask",
      "Order food and drink, ask for the bill and deal with what comes back",
      "Talk about your day and your week in the present and near future",
      "Follow slow, clear French about familiar things",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "Bonjour, et vous ?",
        text: "Greetings, names, where you live, numbers to 100, the alphabet for spelling your surname on the phone.",
      },
      {
        weeks: "Weeks 3–4",
        title: "Au café",
        text: "Ordering, prices, preferences with aimer and préférer, polite forms and the all-purpose je voudrais.",
      },
      {
        weeks: "Weeks 5–6",
        title: "En ville",
        text: "Directions, transport, opening hours, prepositions of place and the verb aller.",
      },
      {
        weeks: "Weeks 7–8",
        title: "Ma semaine",
        text: "Routines, reflexive verbs, telling the time and making plans with le futur proche.",
      },
      {
        weeks: "Weeks 9–10",
        title: "On se parle",
        text: "Longer conversations, a short dinner-party role play and a relaxed spoken review with Élodie.",
      },
    ],
    phrase: {
      text: "Je voudrais un café, s'il vous plaît.",
      translation: "I'd like a coffee, please.",
    },
    materials: "Course workbook and audio included",
  },
  {
    id: "french-conversation-table",
    lang: "french",
    title: "The Saturday French table",
    levels: ["B1", "B2"],
    format: "Weekend",
    sessions: [{ day: 5, start: "10:00", end: "12:00" }],
    weeks: 8,
    start: "2026-11-14",
    price: 360,
    groupMax: 10,
    seatsLeft: 5,
    room: "Room Verlaine",
    teacher: "elodie",
    summary:
      "Two hours of talk around one table, built on a short article or radio clip sent on Thursday.",
    description:
      "For speakers who understand far more than they say. Each week Élodie sends a short piece on Thursday: a column, a podcast clip, a recipe with a story. On Saturday the table talks it through, then takes it somewhere else. Corrections are written on cards and handed over at the end, so nobody is stopped mid-sentence.",
    outcomes: [
      "Hold your own in a fast, overlapping conversation",
      "Disagree politely, change your mind and tell a story with a point",
      "Widen everyday vocabulary beyond the textbook",
      "Hear the difference between written and spoken French",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "La ville",
        text: "Neighbourhoods, rents, bakeries that close in August. Opinions with il me semble que and à mon avis.",
      },
      {
        weeks: "Weeks 3–4",
        title: "À table",
        text: "Food writing and regional cooking. Describing taste, the partitive and the art of complaining nicely.",
      },
      {
        weeks: "Weeks 5–6",
        title: "Le travail",
        text: "Work, strikes, the four-day week. Hypotheses with si and the conditional.",
      },
      {
        weeks: "Weeks 7–8",
        title: "Les histoires",
        text: "Short stories and anecdotes. Past tenses in conversation and the pleasure of a good digression.",
      },
    ],
    phrase: {
      text: "Ça dépend de ce qu'on entend par là.",
      translation: "It depends what we mean by that.",
    },
    materials: "Weekly reading or audio sent by email",
  },
  {
    id: "italian-second-trip",
    lang: "italian",
    title: "Italian for the second trip",
    levels: ["A2"],
    format: "Evening",
    sessions: [
      { day: 0, start: "18:30", end: "20:00" },
      { day: 2, start: "18:30", end: "20:00" },
    ],
    weeks: 10,
    start: "2026-11-09",
    price: 420,
    groupMax: 8,
    seatsLeft: 2,
    room: "Room Montale",
    teacher: "giulia",
    summary:
      "You can order and say thank you. Now talk to the people serving you, the neighbours and the family.",
    description:
      "Built for people who have been once, picked up the basics and want the next trip to be different. Giulia works through the past tenses with stories you bring from your own travels, then moves into the future and the conditional so you can plan, book and change plans in Italian.",
    outcomes: [
      "Tell a story about something that happened, with passato prossimo and imperfetto",
      "Book, rearrange and complain about rooms, trains and tables",
      "Talk about family, work and home with confidence",
      "Understand the gist of local radio and menus that are not translated",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "Com'è andata?",
        text: "The passato prossimo with essere and avere, and your own travel stories.",
      },
      {
        weeks: "Weeks 3–4",
        title: "Quando ero piccolo",
        text: "The imperfetto, childhood, places that have changed.",
      },
      {
        weeks: "Weeks 5–6",
        title: "Prenotare",
        text: "Phone calls, booking and changing plans, the future tense.",
      },
      {
        weeks: "Weeks 7–8",
        title: "In famiglia",
        text: "Possessives, describing people, the conditional for polite requests.",
      },
      {
        weeks: "Weeks 9–10",
        title: "Al mercato",
        text: "Pronouns lo, la, ne at the market stall, then a role-played Sunday lunch.",
      },
    ],
    phrase: {
      text: "Ci siamo già stati, ma questa volta parliamo.",
      translation: "We've been before, but this time we're talking.",
    },
    materials: "Course workbook and audio included",
  },
  {
    id: "italian-reading-circle",
    lang: "italian",
    title: "Reading Italian: short fiction circle",
    levels: ["C1"],
    format: "Evening",
    sessions: [{ day: 3, start: "19:00", end: "20:30" }],
    weeks: 8,
    start: "2026-11-12",
    price: 380,
    groupMax: 8,
    seatsLeft: 4,
    room: "Room Montale",
    teacher: "giulia",
    summary:
      "One short story a week, read at home and taken apart together. For advanced readers and talkers.",
    description:
      "Eight stories across a century of Italian writing, chosen for voice rather than difficulty. You read at home with Giulia's glossary, then spend the evening on what the story is doing and how it does it: register, dialect, the subjunctive used for effect. Discussion is in Italian throughout.",
    outcomes: [
      "Read literary Italian at length without reaching for a dictionary every line",
      "Discuss style, tone and register with precise vocabulary",
      "Recognise regional and historical forms in written Italian",
      "Write a short, considered response to a text",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "Racconti di città",
        text: "Two urban stories. Narrative tenses including the passato remoto.",
      },
      {
        weeks: "Weeks 3–4",
        title: "Il dialetto in pagina",
        text: "Stories that let dialect in. How writers mark speech and place.",
      },
      {
        weeks: "Weeks 5–6",
        title: "Brevissimi",
        text: "Very short fiction, ellipsis and what is left unsaid.",
      },
      {
        weeks: "Weeks 7–8",
        title: "Scrivere una risposta",
        text: "Your own short response piece, read aloud and discussed at the last session.",
      },
    ],
    phrase: {
      text: "Non è quello che dice, è come lo dice.",
      translation: "It's not what she says, it's how she says it.",
    },
    materials: "Story pack and glossary included",
  },
  {
    id: "spanish-intensive",
    lang: "spanish",
    title: "Spanish intensive fortnight",
    levels: ["B1"],
    format: "Intensive",
    sessions: [
      { day: 0, start: "09:30", end: "12:30" },
      { day: 1, start: "09:30", end: "12:30" },
      { day: 2, start: "09:30", end: "12:30" },
      { day: 3, start: "09:30", end: "12:30" },
      { day: 4, start: "09:30", end: "12:30" },
    ],
    weeks: 2,
    start: "2026-11-16",
    price: 640,
    groupMax: 6,
    seatsLeft: 1,
    room: "Room Machado",
    teacher: "mateo",
    summary:
      "Fifteen mornings' worth of Spanish in two weeks. Small group, big jump, homework every night.",
    description:
      "Thirty hours in ten mornings for intermediate speakers who want to break through a plateau before a move, a posting or a long trip. Mornings mix grammar clinics with real tasks: a phone call to book a flat, a debate, a short presentation. Expect an hour of homework a night and a noticeably quicker tongue by the second Friday.",
    outcomes: [
      "Switch confidently between past tenses when telling a story",
      "Use the present subjunctive for wishes, doubts and advice",
      "Handle practical calls and meetings without rehearsing first",
      "Give a short presentation and answer questions on it",
    ],
    syllabus: [
      {
        weeks: "Days 1–3",
        title: "Contar historias",
        text: "Preterite against imperfect, connectors, telling a story with a beginning and a punchline.",
      },
      {
        weeks: "Days 4–6",
        title: "Ojalá",
        text: "The present subjunctive for wishes, advice and doubts, with real-life requests.",
      },
      {
        weeks: "Days 7–8",
        title: "Al teléfono",
        text: "Calls, voicemails and meetings. Formal and informal registers.",
      },
      {
        weeks: "Days 9–10",
        title: "Presentar",
        text: "Prepare and give a five-minute talk on a subject you choose. Feedback session with Mateo.",
      },
    ],
    phrase: {
      text: "Ojalá hubiera empezado antes.",
      translation: "I wish I'd started sooner.",
    },
    materials: "Course pack and daily exercises included",
  },
  {
    id: "spanish-lunch-online",
    lang: "spanish",
    title: "Spanish online, lunch hour",
    levels: ["A1", "A2"],
    format: "Online",
    sessions: [
      { day: 1, start: "12:15", end: "13:15" },
      { day: 3, start: "12:15", end: "13:15" },
    ],
    weeks: 12,
    start: "2026-11-10",
    price: 360,
    groupMax: 6,
    seatsLeft: 4,
    room: "Online (video)",
    teacher: "lucia",
    summary:
      "Two lunch hours a week from your desk. Cameras on, six people at most, no slides.",
    description:
      "For people whose evenings are spoken for. Lucía runs each hour like a small in-person class: everyone speaks in the first five minutes, pairs go into breakout rooms, and every lesson ends with three sentences you can use that day. A shared notebook keeps vocabulary in one place across the term.",
    outcomes: [
      "Introduce yourself, your work and your plans",
      "Shop, order and get around in the present tense",
      "Talk about recent events with the perfect tense",
      "Keep a shared vocabulary notebook you will actually reuse",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–3",
        title: "¿Quién eres?",
        text: "Introductions, ser and estar, nationalities and jobs.",
      },
      {
        weeks: "Weeks 4–6",
        title: "Mi día",
        text: "Routines, regular and irregular present verbs, times and days.",
      },
      {
        weeks: "Weeks 7–9",
        title: "De compras",
        text: "Shopping, sizes, prices, gustar and the demonstratives.",
      },
      {
        weeks: "Weeks 10–12",
        title: "¿Qué has hecho hoy?",
        text: "The perfect tense, short anecdotes and a final group conversation.",
      },
    ],
    phrase: {
      text: "Hoy he aprendido tres palabras nuevas.",
      translation: "Today I've learned three new words.",
    },
    materials: "Shared online notebook and audio included",
  },
  {
    id: "portuguese-lisbon-first",
    lang: "portuguese",
    title: "Portuguese, Lisbon first",
    levels: ["A1"],
    format: "Evening",
    sessions: [{ day: 2, start: "18:30", end: "20:30" }],
    weeks: 10,
    start: "2026-11-11",
    price: 390,
    groupMax: 8,
    seatsLeft: 6,
    room: "Room Pessoa",
    teacher: "ines",
    summary:
      "One long evening a week of European Portuguese, with the swallowed vowels taken seriously from day one.",
    description:
      "Portuguese looks friendly on the page and then disappears when spoken. Inês starts with listening: how Lisboetas actually sound, which vowels vanish and why. From there you build the everyday language of cafés, trams and neighbours, with Brazilian forms pointed out so nothing surprises you later.",
    outcomes: [
      "Understand everyday spoken European Portuguese at a slow pace",
      "Introduce yourself, order and ask for help",
      "Use ser, estar and ficar without hesitating",
      "Know the main differences from Brazilian Portuguese",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "Ouvir primeiro",
        text: "Sounds, reduced vowels, greetings and introductions.",
      },
      {
        weeks: "Weeks 3–4",
        title: "Na pastelaria",
        text: "Ordering, numbers, quantities and the famous bica.",
      },
      {
        weeks: "Weeks 5–6",
        title: "Pela cidade",
        text: "Trams, directions, ser, estar and ficar.",
      },
      {
        weeks: "Weeks 7–8",
        title: "A minha casa",
        text: "Homes, families and describing people.",
      },
      {
        weeks: "Weeks 9–10",
        title: "Fim de semana",
        text: "Plans and invitations, and a short evening at a Portuguese table.",
      },
    ],
    phrase: {
      text: "Uma bica e um pastel de nata, se faz favor.",
      translation: "An espresso and a custard tart, please.",
    },
    materials: "Course workbook and audio included",
  },
  {
    id: "german-for-work",
    lang: "german",
    title: "German for work, before work",
    levels: ["B1", "B2"],
    format: "Morning",
    sessions: [
      { day: 1, start: "07:45", end: "09:00" },
      { day: 3, start: "07:45", end: "09:00" },
    ],
    weeks: 10,
    start: "2026-11-10",
    price: 480,
    groupMax: 8,
    seatsLeft: 3,
    room: "Room Rilke",
    teacher: "jonas",
    summary:
      "Early-morning German for meetings, emails and small talk at the coffee machine. Coffee provided.",
    description:
      "A group for people who already use German at work and want to stop translating in their heads. Jonas brings real-looking emails, meeting agendas and phone scenarios; you bring the situations that trip you up. Mornings are short and focused, and you will leave in time to be at your desk by half past nine.",
    outcomes: [
      "Write clear, correctly formal emails without a template",
      "Lead and take part in meetings, including disagreeing",
      "Handle phone and video calls with confidence",
      "Make small talk that does not feel like an exercise",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "Schreiben",
        text: "Email register, Konjunktiv II for polite requests, sentence order in subordinate clauses.",
      },
      {
        weeks: "Weeks 3–4",
        title: "Besprechungen",
        text: "Agendas, opinions, interrupting politely and summarising.",
      },
      {
        weeks: "Weeks 5–6",
        title: "Am Telefon",
        text: "Calls, voicemail, spelling and numbers at speed.",
      },
      {
        weeks: "Weeks 7–8",
        title: "Präsentieren",
        text: "Short presentations, passive voice and handling questions.",
      },
      {
        weeks: "Weeks 9–10",
        title: "Smalltalk",
        text: "The coffee machine, the lift and the Christmas party, plus a review.",
      },
    ],
    phrase: {
      text: "Könnten wir den Termin auf Donnerstag verschieben?",
      translation: "Could we move the meeting to Thursday?",
    },
    materials: "Workbook and email templates included",
  },
  {
    id: "japanese-foundations",
    lang: "japanese",
    title: "Japanese foundations: kana to kitchen talk",
    levels: ["A1"],
    format: "Weekend",
    sessions: [{ day: 5, start: "10:00", end: "12:30" }],
    weeks: 12,
    start: "2026-11-14",
    price: 520,
    groupMax: 8,
    seatsLeft: 2,
    room: "Room Bashō",
    teacher: "haruka",
    summary:
      "Saturday mornings. Hiragana and katakana in a month, then the Japanese of shops, stations and kitchens.",
    description:
      "Haruka teaches both writing systems in the first four weeks with short daily practice you can do on the bus. From week five you put them to work on menus, signs and train timetables, building the polite everyday Japanese that gets you through a day in Kyoto. Week twelve ends with a cooking class in the school kitchen, conducted in Japanese.",
    outcomes: [
      "Read and write hiragana and katakana",
      "Recognise around eighty common kanji on signs and menus",
      "Introduce yourself and make polite requests with desu and masu",
      "Shop, order and ask for directions",
    ],
    syllabus: [
      {
        weeks: "Weeks 1–2",
        title: "ひらがな",
        text: "Hiragana in sound groups, greetings and self-introduction.",
      },
      {
        weeks: "Weeks 3–4",
        title: "カタカナ",
        text: "Katakana through loanwords on real menus, numbers and prices.",
      },
      {
        weeks: "Weeks 5–7",
        title: "駅で",
        text: "Stations, directions, time and the particles に, で and へ.",
      },
      {
        weeks: "Weeks 8–10",
        title: "お店で",
        text: "Shops, counters, polite requests and the te-form.",
      },
      {
        weeks: "Weeks 11–12",
        title: "台所で",
        text: "Kitchen words, instructions and a cooking session in Japanese.",
      },
    ],
    phrase: { text: "これをください。", translation: "This one, please." },
    materials: "Kana workbook and flashcards included",
  },
];

export type Teacher = {
  id: string;
  name: string;
  pron: string;
  langs: LangId[];
  role: string;
  from: string;
  since: number;
  bio: string;
  word: { term: string; gloss: string };
};

export const teachers: Teacher[] = [
  {
    id: "ruth",
    name: "Ruth Abernathy",
    pron: "ruːθ ˈæb.ər.næθ.i",
    langs: ["spanish", "french"],
    role: "Founder and director of studies",
    from: "Northgate, after years in Valencia and Lyon",
    since: 2009,
    bio: "Ruth opened Sonnet with two rooms and a kettle after a decade teaching English abroad. She still takes the first lesson of every new A1 group, so she can tell them what to expect and that mistakes are the point.",
    word: {
      term: "sobremesa",
      gloss: "the time spent talking at the table after a meal is finished",
    },
  },
  {
    id: "elodie",
    name: "Élodie Marchand",
    pron: "e.lɔ.di maʁ.ʃɑ̃",
    langs: ["french"],
    role: "Head of French",
    from: "Lyon",
    since: 2011,
    bio: "Élodie trained as an actor before she trained as a teacher, which explains the role plays. She runs both the beginners' evenings and the Saturday table, and keeps a box of index cards for every student's favourite mistakes.",
    word: {
      term: "dépaysement",
      gloss: "the slightly giddy feeling of being out of your own country",
    },
  },
  {
    id: "giulia",
    name: "Giulia Ferrante",
    pron: "ˈdʒuː.lja ferˈran.te",
    langs: ["italian"],
    role: "Head of Italian",
    from: "Bologna",
    since: 2014,
    bio: "Giulia has a doctorate in twentieth-century Italian fiction and a firm belief that grammar is easier with a story attached. She chooses every text in the reading circle and will happily argue about any of them.",
    word: {
      term: "abbiocco",
      gloss: "the drowsiness that arrives after a big lunch",
    },
  },
  {
    id: "mateo",
    name: "Mateo Alvar",
    pron: "maˈte.o alˈβaɾ",
    langs: ["spanish"],
    role: "Spanish intensives",
    from: "Seville",
    since: 2016,
    bio: "Mateo ran a language exchange in a Seville bar for six years before coming north. His intensives are fast, loud and carefully planned, and he answers homework emails before breakfast.",
    word: {
      term: "madrugada",
      gloss: "the small hours, between midnight and dawn",
    },
  },
  {
    id: "lucia",
    name: "Lucía Ortega",
    pron: "luˈθi.a oɾˈte.ɣa",
    langs: ["spanish"],
    role: "Online Spanish",
    from: "Madrid",
    since: 2019,
    bio: "Lucía designed Sonnet's online classes during a winter when nobody could meet in person, and kept them because they worked. She is strict about cameras on and generous with breakout-room time.",
    word: {
      term: "estrenar",
      gloss: "to wear or use something for the very first time",
    },
  },
  {
    id: "ines",
    name: "Inês Valadares",
    pron: "iˈneʃ vɐ.lɐˈða.ɾɨʃ",
    langs: ["portuguese"],
    role: "Portuguese",
    from: "Lisbon",
    since: 2018,
    bio: "Inês is a translator by day and teaches one long evening a week. She starts every course with listening because, as she puts it, Portuguese is the language you can read and still not understand.",
    word: {
      term: "saudade",
      gloss: "a longing for something or someone that may not come back",
    },
  },
  {
    id: "jonas",
    name: "Jonas Kessler",
    pron: "ˈjoː.nas ˈkɛs.lɐ",
    langs: ["german"],
    role: "German",
    from: "Leipzig",
    since: 2015,
    bio: "Jonas spent eight years in corporate training before moving to Sonnet's early mornings. He writes all the course emails himself, each one a little more badly formatted than the last, so you can practise fixing them.",
    word: {
      term: "Feierabend",
      gloss: "the moment the working day ends and the evening begins",
    },
  },
  {
    id: "haruka",
    name: "Haruka Mori",
    pron: "ha.ɾɯ.ka mo.ɾi",
    langs: ["japanese"],
    role: "Japanese",
    from: "Kyoto",
    since: 2020,
    bio: "Haruka grew up above her parents' restaurant and teaches Japanese the way she learned to cook: little and often. Her Saturday group finishes every term in the school kitchen.",
    word: {
      term: "木漏れ日 (komorebi)",
      gloss: "sunlight filtering through the leaves of trees",
    },
  },
];

export const testimonials = [
  {
    quote:
      "I had done three apps and two years of evening classes and still froze when anyone spoke to me. Ten weeks at Élodie's table and I argued with a plumber in Lyon. I won.",
    name: "Maggie Rhee",
    course: "The Saturday French table",
  },
  {
    quote:
      "The intensive was the hardest fortnight of my year and the most useful. I started a job in Valencia a month later and nobody switched to English.",
    name: "Daniel Okafor",
    course: "Spanish intensive fortnight",
  },
  {
    quote:
      "Haruka's kitchen session at the end of term is the best thing I have done in this city. I can now order, read the menu and apologise for spilling the miso.",
    name: "Priya Natarajan",
    course: "Japanese foundations",
  },
];

export const home = {
  title: "Learn the language you will actually speak.",
  lead: "Sonnet is a small language school on Calder Street. Six languages, groups of eight at most, and a teacher who has you talking in the first ten minutes.",
  method: {
    title: "Speak first. The grammar follows the sentence.",
    paragraphs: [
      "Every class opens with conversation, not with a list. When a sentence needs a tense you have not met, the tense goes on the board beside it. You learn it because you just needed it.",
      "Groups stay at eight or fewer, so everyone speaks for a real share of the evening. Corrections come on index cards at the end, so nobody is stopped mid-thought.",
      "And when the term is over, you have something to show for it: a conversation you could not have had ten weeks earlier.",
    ],
    parallel: [
      {
        text: "On apprend une langue en la parlant, mal d'abord.",
        translation: "You learn a language by speaking it, badly at first.",
      },
      {
        text: "Sbagliando s'impara.",
        translation: "Getting it wrong is how you learn.",
      },
      {
        text: "Se hace camino al andar.",
        translation: "The path is made by walking it.",
      },
    ],
  },
  close: {
    title: "The winter term starts on 9 November.",
    text: "Places are held in the order enrolments arrive. Not sure where to start? The level test takes ten minutes and tells you which group to join.",
  },
};

export const levelInfo: Record<Level, { name: string; can: string }> = {
  A1: {
    name: "Beginner",
    can: "You can introduce yourself, ask simple questions and understand slow, clear speech about familiar things.",
  },
  A2: {
    name: "Elementary",
    can: "You can handle routine exchanges, talk about your background and describe recent events in simple terms.",
  },
  B1: {
    name: "Intermediate",
    can: "You can deal with most situations while travelling, tell a story and give reasons for your opinions.",
  },
  B2: {
    name: "Upper intermediate",
    can: "You can talk fluently with native speakers, follow complex arguments and explain a viewpoint in detail.",
  },
  C1: {
    name: "Advanced",
    can: "You can express yourself spontaneously and precisely, and use the language flexibly for work and study.",
  },
};

export type Question = {
  level: Level;
  prompt: string;
  gloss: string;
  options: string[];
  answer: number;
};

/** Written placement tests. The blank in each prompt is "___". The correct option is `answer`. */
export const levelTests: Partial<Record<LangId, Question[]>> = {
  french: [
    {
      level: "A1",
      prompt: "Je ___ Marie, et toi ?",
      gloss: "I'm Marie, and you?",
      options: ["suis", "es", "est"],
      answer: 0,
    },
    {
      level: "A1",
      prompt: "Nous ___ au cinéma ce soir.",
      gloss: "We're going to the cinema tonight.",
      options: ["allez", "allons", "vont"],
      answer: 1,
    },
    {
      level: "A2",
      prompt: "Hier, j'___ un croissant au café.",
      gloss: "Yesterday I ate a croissant at the café.",
      options: ["mange", "mangerai", "ai mangé"],
      answer: 2,
    },
    {
      level: "A2",
      prompt: "Du pain ? Oui, il y ___ a encore.",
      gloss: "Bread? Yes, there's still some.",
      options: ["en", "le", "lui"],
      answer: 0,
    },
    {
      level: "B1",
      prompt: "Quand j'étais petit, je ___ à la mer tous les étés.",
      gloss: "When I was small, I went to the seaside every summer.",
      options: ["suis allé", "allais", "irai"],
      answer: 1,
    },
    {
      level: "B1",
      prompt: "Il faut que tu ___ avant midi.",
      gloss: "You need to come before noon.",
      options: ["viens", "viendras", "viennes"],
      answer: 2,
    },
    {
      level: "B2",
      prompt: "Si j'avais su, je ___ plus tôt.",
      gloss: "If I'd known, I would have come earlier.",
      options: ["serais venu", "viendrais", "suis venu"],
      answer: 0,
    },
    {
      level: "C1",
      prompt: "C'est le meilleur livre que j'___ jamais lu.",
      gloss: "It's the best book I've ever read.",
      options: ["avais", "aie", "aurai"],
      answer: 1,
    },
  ],
  spanish: [
    {
      level: "A1",
      prompt: "Yo ___ de Chile.",
      gloss: "I'm from Chile.",
      options: ["estoy", "soy", "es"],
      answer: 1,
    },
    {
      level: "A1",
      prompt: "¿Dónde ___ el baño, por favor?",
      gloss: "Where is the bathroom, please?",
      options: ["está", "es", "hay"],
      answer: 0,
    },
    {
      level: "A2",
      prompt: "Ayer ___ al mercado con mi hermana.",
      gloss: "Yesterday I went to the market with my sister.",
      options: ["iba", "voy", "fui"],
      answer: 2,
    },
    {
      level: "A2",
      prompt: "Me ___ mucho las aceitunas.",
      gloss: "I really like olives.",
      options: ["gustan", "gusta", "gusto"],
      answer: 0,
    },
    {
      level: "B1",
      prompt: "Cuando era niño, ___ en un pueblo pequeño.",
      gloss: "When I was a child, I lived in a small village.",
      options: ["viví", "vivía", "viviré"],
      answer: 1,
    },
    {
      level: "B1",
      prompt: "Espero que ___ buen tiempo el sábado.",
      gloss: "I hope the weather's good on Saturday.",
      options: ["hace", "hará", "haga"],
      answer: 2,
    },
    {
      level: "B2",
      prompt: "Si ___ más tiempo, aprendería portugués.",
      gloss: "If I had more time, I'd learn Portuguese.",
      options: ["tuviera", "tengo", "tendría"],
      answer: 0,
    },
    {
      level: "C1",
      prompt: "No creo que lo ___ hecho a propósito.",
      gloss: "I don't think she did it on purpose.",
      options: ["ha", "haya", "había"],
      answer: 1,
    },
  ],
  italian: [
    {
      level: "A1",
      prompt: "Io ___ Marco, piacere.",
      gloss: "I'm Marco, nice to meet you.",
      options: ["mi chiamo", "ti chiami", "si chiama"],
      answer: 0,
    },
    {
      level: "A1",
      prompt: "Vorrei ___ caffè, per favore.",
      gloss: "I'd like a coffee, please.",
      options: ["una", "un", "uno"],
      answer: 1,
    },
    {
      level: "A2",
      prompt: "Ieri ___ andati al mare.",
      gloss: "Yesterday we went to the seaside.",
      options: ["abbiamo", "eravamo", "siamo"],
      answer: 2,
    },
    {
      level: "A2",
      prompt: "Domani ___ la nonna.",
      gloss: "Tomorrow I'll see Grandma.",
      options: ["vedrò", "vedevo", "ho visto"],
      answer: 0,
    },
    {
      level: "B1",
      prompt: "Il libro? ___ ho già letto.",
      gloss: "The book? I've already read it.",
      options: ["Gli", "L'", "Ne"],
      answer: 1,
    },
    {
      level: "B1",
      prompt: "Penso che Luca ___ ragione.",
      gloss: "I think Luca is right.",
      options: ["ha", "avrà", "abbia"],
      answer: 2,
    },
    {
      level: "B2",
      prompt: "Se ___ prima, avremmo preso il treno.",
      gloss: "If we'd left earlier, we would have caught the train.",
      options: ["fossimo partiti", "siamo partiti", "partivamo"],
      answer: 0,
    },
    {
      level: "C1",
      prompt: "Te lo presto, ___ tu me lo restituisca entro venerdì.",
      gloss: "I'll lend it to you, provided you give it back by Friday.",
      options: ["perché", "purché", "benché"],
      answer: 1,
    },
  ],
  german: [
    {
      level: "A1",
      prompt: "Ich ___ aus Hamburg.",
      gloss: "I'm from Hamburg.",
      options: ["kommst", "komme", "kommt"],
      answer: 1,
    },
    {
      level: "A1",
      prompt: "Das ist ___ Bruder.",
      gloss: "This is my brother.",
      options: ["mein", "meine", "meinen"],
      answer: 0,
    },
    {
      level: "A2",
      prompt: "Gestern ___ ich ins Kino gegangen.",
      gloss: "Yesterday I went to the cinema.",
      options: ["habe", "war", "bin"],
      answer: 2,
    },
    {
      level: "A2",
      prompt: "Ich gebe ___ Mann das Buch.",
      gloss: "I'm giving the man the book.",
      options: ["dem", "den", "der"],
      answer: 0,
    },
    {
      level: "B1",
      prompt: "Ich weiß nicht, ob er morgen ___.",
      gloss: "I don't know if he's coming tomorrow.",
      options: ["kommen", "kommt", "gekommen"],
      answer: 1,
    },
    {
      level: "B1",
      prompt: "Das ist die Frau, ___ ich geholfen habe.",
      gloss: "That's the woman I helped.",
      options: ["die", "den", "der"],
      answer: 2,
    },
    {
      level: "B2",
      prompt: "Wenn ich mehr Zeit ___, würde ich Japanisch lernen.",
      gloss: "If I had more time, I'd learn Japanese.",
      options: ["hätte", "habe", "hatte"],
      answer: 0,
    },
    {
      level: "C1",
      prompt: "Er tat so, als ___ er nichts gehört.",
      gloss: "He acted as if he hadn't heard anything.",
      options: ["hat", "hätte", "habe"],
      answer: 1,
    },
  ],
};

export const levelTest = {
  title: "Find your level in ten minutes.",
  lead: "Eight sentences, each with a gap. They start easy and get harder. Pick the word that fits, or say you are not sure: guessing only puts you in the wrong group.",
  spokenOnly:
    "Portuguese and Japanese placements are a fifteen-minute call with Inês or Haruka. Choose a course and add a note when you enrol.",
};

export const homeSample = {
  lang: "spanish" as LangId,
  question: 1,
  why: "Location takes estar, even for things that never move, like a bathroom.",
};

export const fees = {
  title: "Fees, terms and the small print.",
  lead: "Course prices include materials. Pay in full or in two instalments, and switch groups free of charge in the first two weeks if the level is wrong.",
  plans: [
    {
      name: "Single course",
      term: 360,
      year: 980,
      unit: "from",
      text: "One group course for one term. Prices vary with hours; each course page shows its own.",
      includes: [
        "All materials and audio",
        "Free group switch in weeks 1–2",
        "End-of-term spoken review",
      ],
    },
    {
      name: "Two-course pass",
      term: 720,
      year: 1900,
      unit: "",
      text: "Any two group courses in the same term. Popular with people who take a weekday group and the Saturday table.",
      includes: [
        "Two group courses of your choice",
        "Priority booking for the next term",
        "One free one-to-one hour per term",
      ],
    },
    {
      name: "One-to-one",
      term: 620,
      year: 1680,
      unit: "",
      text: "Ten private hours per term with the teacher of your choice, at times you agree between you, in person or online.",
      includes: [
        "Ten 60-minute lessons per term",
        "A plan written for your goal",
        "Reschedule with 24 hours' notice",
      ],
    },
  ],
  terms: [
    {
      name: "Winter term",
      dates: "9 November 2026 – 12 February 2027",
      note: "No classes 21 December – 3 January",
    },
    {
      name: "Spring term",
      dates: "1 March – 4 June 2027",
      note: "No classes in the week of 12 April",
    },
    {
      name: "Summer intensives",
      dates: "21 June – 13 August 2027",
      note: "Two-week blocks in every language",
    },
  ],
  discounts: [
    { name: "Students and over-65s", value: "10% off any group course" },
    {
      name: "Bring a friend",
      value: "$40 off for each of you when you enrol together",
    },
    {
      name: "Returning students",
      value: "$30 off when you book the next term before the last week",
    },
  ],
  faq: [
    {
      q: "What if I am in the wrong group?",
      a: "Tell your teacher or the office in the first two weeks and we will move you to the right level, free of charge, as long as there is a place. If there is not, we refund the difference or hold your fee for the next term.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes, in full up to seven days before your course starts. After that we can transfer your fee to another course or term, but not refund it, because your place was held for you.",
    },
    {
      q: "I miss a class. What happens?",
      a: "Your teacher sends the notes and homework after each session. Evening group students can also sit in on the parallel group in the same language once per term.",
    },
    {
      q: "Do I need to buy books?",
      a: "No. Every course includes its workbook, audio or reading pack. Bring a notebook you like writing in.",
    },
    {
      q: "Do you issue certificates?",
      a: "Every student who attends at least eight in ten sessions receives a Sonnet certificate stating the course, hours and level. We also prepare students for official exams on request.",
    },
    {
      q: "Can my employer pay?",
      a: "Yes. Choose 'Invoice my employer' when you enrol and add the billing contact. We invoice within two working days.",
    },
  ],
};

export const about = {
  title: "A small school that talks a lot.",
  lead: "Sonnet opened in 2009 in two rooms above a bookbindery on Calder Street. It still lives there, in six rooms named after poets, with a kitchen, a lending shelf and a lift that works most days.",
  story: [
    "Ruth Abernathy came home after ten years teaching abroad, convinced that adults learn languages the way they learned their first: by needing to say something. She opened with one Spanish group and one French group, eight chairs each, and a rule that every class starts with talk.",
    "The name came from the first room. The bindery had left a shelf of unsold poetry, and the first thing anyone read aloud in it was a sonnet: fourteen lines, a fixed form, and inside it, room for anything. That is roughly how we think about a lesson.",
    "Today Sonnet teaches six languages to around three hundred adults a term. The groups are still eight at most, and the first ten minutes are still talk.",
  ],
  principles: [
    {
      title: "Eight chairs",
      text: "No group is ever larger than eight. In a ninety-minute class that means everyone speaks for a real share of the evening.",
    },
    {
      title: "Talk before rules",
      text: "Grammar arrives when a sentence needs it. It is written on the board beside the sentence, not before it.",
    },
    {
      title: "Corrections on cards",
      text: "Teachers note mistakes on index cards and hand them over at the end, so nobody is interrupted mid-thought.",
    },
    {
      title: "Native, trained, paid properly",
      text: "Every teacher speaks the language natively, holds a teaching qualification and is on a salaried contract.",
    },
  ],
  rooms: [
    {
      name: "Verlaine",
      lang: "french" as LangId,
      text: "The big front room with the bay window and the long table.",
    },
    {
      name: "Montale",
      lang: "italian" as LangId,
      text: "Corner room, morning light, a shelf of Italian paperbacks.",
    },
    {
      name: "Machado",
      lang: "spanish" as LangId,
      text: "Our busiest room: intensives in the morning, groups at night.",
    },
    {
      name: "Pessoa",
      lang: "portuguese" as LangId,
      text: "Small and quiet at the back, over the courtyard.",
    },
    {
      name: "Rilke",
      lang: "german" as LangId,
      text: "Where the coffee is on at 07:30 for the early group.",
    },
    {
      name: "Bashō",
      lang: "japanese" as LangId,
      text: "Next to the kitchen, for reasons that become clear in week twelve.",
    },
  ],
};

export const enrol = {
  title: "Enrol on a course.",
  lead: "Choose a course, tell us about yourself and how you would like to pay. We hold your place for 48 hours while we confirm by email.",
};

export const newsletter = {
  title: "A word a week.",
  text: "One untranslatable word every Friday, from one of our teachers, with how to say it and when to use it.",
};

export const notFound = {
  title: "That page is not in our dictionary.",
  text: "The link may be old, or the course may have finished. The current courses and the timetable are a good place to start again.",
};

export type Gloss = { word: string; pron: string; pos: string; def: string };

/** The dictionary entry set beside each page heading. */
export const glosses: Record<string, Gloss> = {
  courses: {
    word: "course",
    pron: "kɔːs",
    pos: "n.",
    def: "a set of lessons with a start, an end and, ideally, a conversation you could not have had before.",
  },
  timetable: {
    word: "timetable",
    pron: "ˈtaɪmˌteɪ.bəl",
    pos: "n.",
    def: "where and when every group meets, so you can see what fits before you choose.",
  },
  test: {
    word: "placement",
    pron: "ˈpleɪs.mənt",
    pos: "n.",
    def: "finding the group where you understand most of what is said and can just reach the rest.",
  },
  teachers: {
    word: "teacher",
    pron: "ˈtiː.tʃə",
    pos: "n.",
    def: "the person who gets you talking, and remembers which mistakes are yours.",
  },
  fees: {
    word: "term",
    pron: "tɜːm",
    pos: "n.",
    def: "one of three blocks of the school year, each between eight and fourteen weeks long.",
  },
  about: {
    word: "sonnet",
    pron: "ˈsɒn.ɪt",
    pos: "n.",
    def: "a poem of fourteen lines in a fixed form; from Italian sonetto, a little sound.",
  },
  enrol: {
    word: "enrol",
    pron: "ɪnˈrəʊl",
    pos: "v.",
    def: "to put your name down. Literally, to write it on the roll.",
  },
};
