import heroPiano from "./assets/hero-piano.jpg";
import piano from "./assets/piano.jpg";
import violin from "./assets/violin.jpg";
import cello from "./assets/cello.jpg";
import guitar from "./assets/guitar.jpg";
import band from "./assets/band.jpg";
import voice from "./assets/voice.jpg";
import clarinet from "./assets/clarinet.jpg";
import earlyYears from "./assets/early-years.jpg";
import ensemble from "./assets/ensemble.jpg";
import musicianship from "./assets/musicianship.jpg";
import recitalHall from "./assets/recital-hall.jpg";
import practiceRoom from "./assets/practice-room.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  hero: {
    src: heroPiano,
    alt: "A young student plays a grand piano in a bright teaching room, eyes on her hands.",
    w: 1600,
    h: 1066,
  },
  recitalHall: {
    src: recitalHall,
    alt: "The Long Room before a recital: a grand piano on a wooden stage, rows of empty seats.",
    w: 1600,
    h: 1200,
  },
  practiceRoom: {
    src: practiceRoom,
    alt: "A teaching room set for a violin lesson: a music stand, a row of chairs and an open violin case.",
    w: 1600,
    h: 1200,
  },
  ensemble: {
    src: ensemble,
    alt: "A Saturday ensemble rehearsal: strings, singers and a conductor in a stone-walled hall.",
    w: 1300,
    h: 975,
  },
} satisfies Record<string, Img>;

export const brand = {
  name: "Score",
  full: "Score Music School",
  sector: "Music school",
  tagline: "Lessons for every age, one teacher at a time.",
  email: "hello@score.example",
  jobs: "jobs@score.example",
  phone: "+1 555 014 2760",
  phoneHref: "tel:+15550142760",
  address: ["418 Alder Street", "Larkhill"],
  hours: [
    { days: "Monday – Friday", time: "2:30 pm – 9:00 pm" },
    { days: "Saturday", time: "9:00 am – 5:00 pm" },
    { days: "Sunday", time: "Closed, except recital days" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { to: "/programmes", label: "Programmes" },
  { to: "/teachers", label: "Teachers" },
  { to: "/recitals", label: "Recitals" },
  { to: "/practice", label: "Practice room" },
  { to: "/fees", label: "Fees" },
  { to: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Learn",
    links: [
      { to: "/programmes", label: "All programmes" },
      { to: "/programmes/piano", label: "Piano" },
      { to: "/programmes/violin", label: "Violin" },
      { to: "/programmes/music-garden", label: "Music Garden, ages 3–6" },
      { to: "/trial", label: "Book a trial lesson" },
    ],
  },
  {
    title: "School",
    links: [
      { to: "/teachers", label: "Teachers" },
      { to: "/recitals", label: "Recitals & concerts" },
      { to: "/about", label: "About Score" },
      { to: "/fees", label: "Fees & terms" },
    ],
  },
  {
    title: "Students",
    links: [
      { to: "/practice", label: "Practice room" },
      { to: "/fees", label: "Instrument hire" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "Recital notices",
  text: "One short email before each concert: the date, the programme, who's playing. About six a year.",
};

/* ------------------------------------------------------------ programmes */

export type Family =
  | "Keys"
  | "Strings"
  | "Guitar"
  | "Voice"
  | "Woodwind"
  | "Groups"
  | "Musicianship";
export const families: Family[] = [
  "Keys",
  "Strings",
  "Guitar",
  "Voice",
  "Woodwind",
  "Groups",
  "Musicianship",
];

export type Programme = {
  slug: string;
  name: string;
  family: Family;
  format: "Private" | "Group";
  minAge: number;
  maxAge?: number;
  /** Lower-case name used inside sentences: "Book a free piano trial". */
  short: string;
  ages: string;
  image: Img;
  summary: string;
  intro: string[];
  lengths: number[];
  /** Group programmes: weekly class length in minutes, class size and price per session. */
  group?: { minutes: number; size: string; perSession: number };
  stages: { name: string; text: string }[];
  bring: string;
  hire?: string;
  repertoire: string[];
  related: string[];
};

export const programmes: Programme[] = [
  {
    slug: "piano",
    name: "Piano",
    short: "piano",
    family: "Keys",
    format: "Private",
    minAge: 5,
    ages: "5 to adult",
    image: {
      src: piano,
      alt: "A child at an upright piano reads from an open book of music, seen from behind.",
      w: 1600,
      h: 1066,
    },
    summary:
      "Reading, technique and real pieces from the first week, on our grand and upright pianos.",
    intro: [
      "Most of our students start here, and plenty never leave. Piano teaches you to read two lines at once, to hear harmony under a tune and to listen to your own sound — which is why it sits underneath everything else we teach.",
      "Lessons happen in rooms with acoustic pianos, not keyboards. Beginners learn to read from the first lesson and play a full piece by the third. Older students choose between a classical path with optional graded exams and a lead-sheet path that ends in accompanying, improvising and playing with the band.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "First pieces",
        text: "Five-finger positions, reading in both clefs, steady pulse. Six to ten short pieces by the end of the first term.",
      },
      {
        name: "Two hands together",
        text: "Scales and arpeggios, pedalling, playing from simple classical and folk repertoire. Grades 1–2 for those who want them.",
      },
      {
        name: "Your own repertoire",
        text: "Bach minuets to Bartók, chord charts and accompanying. Students start picking their own pieces with their teacher.",
      },
      {
        name: "Performing pianist",
        text: "Grades 5–8, diploma preparation or a jazz and lead-sheet route. Regular solo spots in the Long Room.",
      },
    ],
    bring:
      "A piano or 88-key weighted keyboard at home. Practice rooms are free to book on weekday afternoons if you don't have one yet.",
    repertoire: [
      "J. S. Bach — Minuet in G, BWV Anh. 114",
      "Robert Schumann — The Wild Horseman, Op. 68 No. 8",
      "Béla Bartók — Mikrokosmos, Book 2",
      "Florence Price — Ticklin' Toes",
    ],
    related: ["musicianship", "voice", "chamber"],
  },
  {
    slug: "violin",
    name: "Violin & viola",
    short: "violin",
    family: "Strings",
    format: "Private",
    minAge: 5,
    ages: "5 to adult",
    image: {
      src: violin,
      alt: "A violinist plays outdoors at dusk, bow on the strings, eyes lowered.",
      w: 1400,
      h: 933,
    },
    summary:
      "Posture and a good sound first, then reading and ensemble playing from the second year.",
    intro: [
      "The violin is slow to start and quick to reward. The first months are about holding the instrument and the bow so that the sound is warm instead of scratchy — after that, progress comes fast.",
      "Younger students begin on fractional-size instruments from our library and learn their first tunes by ear before reading. From the second year every string student plays in a Saturday ensemble, and violists are always in demand.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "Bow and posture",
        text: "Open strings, a straight bow and the first finger patterns. Learning tunes by ear, with a parent in the lesson for under-eights.",
      },
      {
        name: "Reading and shifting",
        text: "Reading in first position, scales in two octaves, simple duets. Joining the Saturday Training Strings.",
      },
      {
        name: "Third position and vibrato",
        text: "Shifting, vibrato and baroque concertos. Grades 3–5 for those who want them; a seat in the Chamber Strings.",
      },
      {
        name: "Advanced strings",
        text: "Sonatas, concertos, orchestral excerpts and chamber music coached by faculty.",
      },
    ],
    bring:
      "An instrument in the right size — we measure you at the trial lesson.",
    hire: "Fractional and full-size violins and violas from $22 a month, with free size swaps as children grow.",
    repertoire: [
      "Shinichi Suzuki — Twinkle Variations",
      "Antonio Vivaldi — Concerto in A minor, RV 356",
      "Oskar Rieding — Concerto in B minor, Op. 35",
      "Traditional — Shetland reels in two parts",
    ],
    related: ["cello", "chamber", "musicianship"],
  },
  {
    slug: "cello",
    name: "Cello & double bass",
    short: "cello",
    family: "Strings",
    format: "Private",
    minAge: 6,
    ages: "6 to adult",
    image: {
      src: cello,
      alt: "A young cellist plays on a street corner beside her music stand and open cello case.",
      w: 900,
      h: 1600,
    },
    summary:
      "The instrument everyone wants to sit next to — warm, low and always needed in an ensemble.",
    intro: [
      "Cello is forgiving to start: you sit, the instrument rests on the floor and the first notes sound good almost at once. That makes it a quiet favourite for adults who always meant to learn something.",
      "We teach cello and double bass from age six on quarter- and half-size instruments. Bass students also learn pizzicato walking lines, so they can join the band programme as well as the strings.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "A good open sound",
        text: "Seating, bow hold and the four open strings. First tunes on the D and A strings.",
      },
      {
        name: "First position",
        text: "Reading in bass clef, extensions and simple pieces with piano accompaniment.",
      },
      {
        name: "Thumb position ahead",
        text: "Shifting up the neck, vibrato, sonatas by Marcello and Vivaldi. A seat in the Chamber Strings.",
      },
      {
        name: "Solo and chamber",
        text: "Bach suites, romantic sonatas and quartet playing coached by faculty.",
      },
    ],
    bring:
      "An instrument in the right size and a rock stop for wooden floors. We'll measure you at the trial.",
    hire: "Cellos from $34 a month and double basses from $42, including a soft case and bow.",
    repertoire: [
      "J. S. Bach — Suite No. 1, Prelude",
      "Benedetto Marcello — Sonata in E minor",
      "Camille Saint-Saëns — The Swan",
      "Traditional — Ashokan-style slow air",
    ],
    related: ["violin", "chamber", "band"],
  },
  {
    slug: "guitar",
    name: "Classical & acoustic guitar",
    short: "guitar",
    family: "Guitar",
    format: "Private",
    minAge: 7,
    ages: "7 to adult",
    image: {
      src: guitar,
      alt: "A student in a pink hoodie strums an acoustic guitar during a lesson.",
      w: 1600,
      h: 1066,
    },
    summary:
      "Nylon or steel strings, notation or chord charts — fingerpicking and song accompaniment from week one.",
    intro: [
      "Guitar is the instrument people most often bring to a trial lesson already half-taught by video. We start where you are: fix the habits that hurt, then build reading, fingerstyle and a repertoire you actually want to play.",
      "Children start on nylon-string guitars in three-quarter size. Adults choose between a classical path in notation and an acoustic path in chords, tab and fingerstyle arrangements. Both finish in the same place: playing comfortably for other people.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "Chords and pulse",
        text: "Six open chords, simple strumming and first melodies on the top three strings.",
      },
      {
        name: "Fingerstyle",
        text: "Thumb independence, arpeggio patterns, reading in first position or from tab.",
      },
      {
        name: "Up the neck",
        text: "Barre chords, position playing, Tárrega studies or fingerstyle arrangements of songs.",
      },
      {
        name: "Concert guitarist",
        text: "Sor, Villa-Lobos and Barrios, or full song arrangements. Guitar ensemble and recital solos.",
      },
    ],
    bring:
      "A guitar that suits your hands — we'll check yours at the trial or lend one for the lesson.",
    hire: "Three-quarter and full-size nylon-string guitars from $16 a month.",
    repertoire: [
      "Fernando Sor — Study in B minor, Op. 35 No. 22",
      "Francisco Tárrega — Lágrima",
      "Heitor Villa-Lobos — Prelude No. 1",
      "Traditional — Greensleeves, fingerstyle setting",
    ],
    related: ["band", "voice", "musicianship"],
  },
  {
    slug: "band",
    name: "Electric guitar, bass & drums",
    short: "rock and pop",
    family: "Guitar",
    format: "Private",
    minAge: 9,
    ages: "9 to adult",
    image: {
      src: band,
      alt: "A guitar teacher bends over a Stratocaster to show a young student a chord shape.",
      w: 1600,
      h: 1065,
    },
    summary:
      "Private lessons plus a Friday band slot in the basement studio, with a gig at the end of each term.",
    intro: [
      "Rock, funk, soul and indie are taught with the same care as anything else here: timing, tone, reading charts and listening to the people around you. The difference is volume, and a basement studio that can take it.",
      "Every electric guitar, bass and drum student is placed in a band after their first term. Bands rehearse on Friday evenings with a coach and play the Open Stage at the end of term.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "Riffs and grooves",
        text: "Power chords, basic grooves on kit, root-note bass lines and playing to a click.",
      },
      {
        name: "In the band",
        text: "Chord charts, song forms, Friday rehearsals with a coach and a first Open Stage set.",
      },
      {
        name: "Your own sound",
        text: "Scales for soloing, fills, effects and gear, learning songs by ear. Rock grades if wanted.",
      },
      {
        name: "Writing and recording",
        text: "Arranging, writing original songs and recording a three-track EP in the studio.",
      },
    ],
    bring:
      "Your instrument and headphones. Drummers practise on a pad at home; kits are in the studio.",
    hire: "Practice amps and electronic drum kits from $20 a month.",
    repertoire: [
      "Bill Withers-style soul groove in A minor",
      "Twelve-bar blues in E with turnaround",
      "Funk sixteenths on one chord",
      "An original song per band each term",
    ],
    related: ["guitar", "voice", "cello"],
  },
  {
    slug: "voice",
    name: "Voice",
    short: "singing",
    family: "Voice",
    format: "Private",
    minAge: 9,
    ages: "9 to adult",
    image: {
      src: voice,
      alt: "A large choir rehearses in a round stone hall, singers gathered in a wide circle.",
      w: 1200,
      h: 900,
    },
    summary:
      "Healthy technique for classical, musical theatre and pop singers, with a choir that meets on Wednesdays.",
    intro: [
      "Singing lessons begin with breathing and posture and quickly move to songs, because a voice is trained by using it well. We teach classical, musical theatre and contemporary styles, and we care more about a free sound than a big one.",
      "Teenage voices are changing voices, and we teach them carefully. All voice students are welcome in the Wednesday Chorus, which sings at every recital.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "Breath and resonance",
        text: "Breathing, posture and easy onset. Short songs in a comfortable range.",
      },
      {
        name: "Range and reading",
        text: "Extending range safely, sight-singing and first duets. Joining the Wednesday Chorus.",
      },
      {
        name: "Style and story",
        text: "Art song, musical theatre or contemporary repertoire; diction in English, Italian and German.",
      },
      {
        name: "Performer",
        text: "Audition preparation, full recital programmes and solo spots with the Chorus.",
      },
    ],
    bring:
      "Water, and a song you love — sing it at your trial lesson, or just hum it.",
    repertoire: [
      "Henry Purcell — Music for a While",
      "Gabriel Fauré — Après un rêve",
      "Richard Rodgers — Something Good",
      "Traditional — The Water Is Wide",
    ],
    related: ["piano", "musicianship", "chamber"],
  },
  {
    slug: "clarinet",
    name: "Clarinet, flute & saxophone",
    short: "woodwind",
    family: "Woodwind",
    format: "Private",
    minAge: 8,
    ages: "8 to adult",
    image: {
      src: clarinet,
      alt: "A clarinettist in a flat cap plays with his eyes half closed.",
      w: 1066,
      h: 1600,
    },
    summary:
      "Air, tone and tuning first; then the wind band, the jazz trio or the chamber group — your choice.",
    intro: [
      "Woodwind players learn to control air before anything else, so the first lessons can feel more like singing than fingering. By the end of the first term, students play tunes in an octave and a half and read simple parts.",
      "Clarinet and flute students can start at eight; saxophone from ten. All woodwind players join either the Saturday Wind Band or the Thursday jazz trio once they can read a part.",
    ],
    lengths: [30, 45, 60],
    stages: [
      {
        name: "A steady tone",
        text: "Embouchure, breathing and the first five notes. Reading simple tunes.",
      },
      {
        name: "Over the break",
        text: "Crossing registers, articulation and scales. A chair in the Saturday Wind Band.",
      },
      {
        name: "Colour and agility",
        text: "Dynamics, tuning, faster passagework and the first sonatas or jazz standards.",
      },
      {
        name: "Soloist",
        text: "Concertos, chamber music and improvisation for saxophonists; grades 6–8 if wanted.",
      },
    ],
    bring:
      "Your instrument, three reeds (for clarinet and saxophone) and a cleaning swab.",
    hire: "Clarinets and flutes from $18 a month; alto saxophones from $28.",
    repertoire: [
      "Carl Baermann — Exercises, Op. 63",
      "Gabriel Fauré — Sicilienne",
      "Gerald Finzi — Five Bagatelles",
      "Duke Ellington-style ballad in E♭",
    ],
    related: ["chamber", "musicianship", "band"],
  },
  {
    slug: "music-garden",
    name: "Music Garden",
    short: "Music Garden",
    family: "Groups",
    format: "Group",
    minAge: 3,
    maxAge: 6,
    ages: "3 to 6",
    image: {
      src: earlyYears,
      alt: "A teacher leads a circle of young children playing ukuleles and singing.",
      w: 1600,
      h: 1062,
    },
    summary:
      "Singing, movement, percussion and ukulele for small children, with a grown-up in the room for the under-fives.",
    intro: [
      "Music Garden is where the youngest students learn to keep a beat, sing in tune and listen to each other — skills that make every later instrument easier. Classes are small, loud in the right places and very quiet in others.",
      "Children aged three and four come with a grown-up. Fives and sixes come on their own and start on ukulele and tuned percussion, and many move into piano or violin lessons the following year.",
    ],
    lengths: [],
    group: { minutes: 40, size: "up to 8 children", perSession: 16 },
    stages: [
      {
        name: "Sprouts (3–4)",
        text: "Songs, rhymes and movement with a grown-up. Steady beat, loud and soft, high and low.",
      },
      {
        name: "Seedlings (4–5)",
        text: "Tuned percussion, simple rhythms with names, singing in small groups.",
      },
      {
        name: "Saplings (5–6)",
        text: "Ukulele, first notation with colours and shapes, singing in two parts.",
      },
      {
        name: "Ready to choose",
        text: "A free taster lesson on piano, violin or cello in the last term.",
      },
    ],
    bring:
      "Socks with grips and a water bottle. Ukuleles and instruments are provided.",
    repertoire: [
      "The Garden Gate (a welcome song we wrote)",
      "Traditional — Frère Jacques in a round",
      "Hot Cross Buns on three ukulele strings",
      "A movement piece to Saint-Saëns's Aquarium",
    ],
    related: ["piano", "violin", "musicianship"],
  },
  {
    slug: "chamber",
    name: "Ensembles & chamber music",
    short: "chamber music",
    family: "Groups",
    format: "Group",
    minAge: 9,
    ages: "9 to adult",
    image: {
      src: ensemble,
      alt: "A mixed ensemble of strings and singers rehearses with a conductor in a stone-walled hall.",
      w: 1300,
      h: 975,
    },
    summary:
      "Training Strings, Chamber Strings, Wind Band, Chorus and coached trios — open to any Score student.",
    intro: [
      "Practising alone teaches you an instrument. Playing with others teaches you music. Every ensemble here rehearses weekly with a faculty coach and performs at least once a term.",
      "Placement is by a short, friendly hearing in the first week of term. Students from other teachers are welcome in the ensembles too, space allowing.",
    ],
    lengths: [],
    group: { minutes: 75, size: "4 to 30 players", perSession: 12 },
    stages: [
      {
        name: "Training Strings & Wind Band",
        text: "Saturday mornings. Simple arrangements, counting rests and watching a conductor.",
      },
      {
        name: "Chorus",
        text: "Wednesday evenings, ages 9 and up. Two- and three-part repertoire, sung at every recital.",
      },
      {
        name: "Chamber Strings",
        text: "Saturday afternoons. Baroque and classical string orchestra repertoire, led from the front desk.",
      },
      {
        name: "Coached chamber groups",
        text: "Trios and quartets of advanced students, coached fortnightly by faculty.",
      },
    ],
    bring:
      "Your instrument, a pencil and a folder for parts. Music stands are provided.",
    repertoire: [
      "Arcangelo Corelli — Concerto Grosso Op. 6 No. 8",
      "Gustav Holst — St Paul's Suite",
      "Joseph Haydn — String Quartet Op. 33 No. 2",
      "Traditional — Shenandoah, arr. for chorus and strings",
    ],
    related: ["violin", "cello", "clarinet"],
  },
  {
    slug: "musicianship",
    name: "Musicianship & theory",
    short: "musicianship",
    family: "Musicianship",
    format: "Group",
    minAge: 8,
    ages: "8 to adult",
    image: {
      src: musicianship,
      alt: "A steel tuning fork lies across a page of printed music.",
      w: 1600,
      h: 1066,
    },
    summary:
      "Aural, theory and composition in small classes — the part of music that makes everything else make sense.",
    intro: [
      "Musicianship classes teach the ears and the pencil: hearing intervals and chords, writing rhythms down, understanding why a cadence feels finished. Students who take it alongside lessons learn new pieces noticeably faster.",
      "Classes are grouped by level, not age, so a curious adult can sit beside a sharp twelve-year-old. The top class writes and hears a short piece performed by faculty at the end of the year.",
    ],
    lengths: [],
    group: { minutes: 50, size: "up to 10 students", perSession: 15 },
    stages: [
      {
        name: "Pulse and pitch",
        text: "Rhythm names, the major scale, singing back short phrases.",
      },
      {
        name: "Intervals and keys",
        text: "Key signatures, intervals by ear, two-part dictation.",
      },
      {
        name: "Harmony",
        text: "Chords, cadences and four-part writing; Grade 5 theory if wanted.",
      },
      {
        name: "Composition",
        text: "Writing for real instruments, with a faculty reading of each student's piece.",
      },
    ],
    bring:
      "A pencil, an eraser and manuscript paper (we sell pads at the desk for $3).",
    repertoire: [
      "Dictation from Bach chorales",
      "Clapping and singing rhythms in 6/8",
      "Harmonising folk melodies",
      "A two-minute piece for string trio",
    ],
    related: ["piano", "voice", "chamber"],
  },
];

/* ------------------------------------------------------------ teachers */

/** Teaching hours per weekday (1 = Monday … 6 = Saturday), 24h "HH:MM". */
export type Hours = Partial<Record<1 | 2 | 3 | 4 | 5 | 6, [string, string]>>;

export type Teacher = {
  slug: string;
  name: string;
  role: string;
  programmes: string[];
  since: number;
  training: string;
  short: string;
  bio: string[];
  onTheStand: string[];
  quote: string;
  hours: Hours;
  room: string;
};

export const teachers: Teacher[] = [
  {
    slug: "ines-halloran",
    name: "Ines Halloran",
    role: "Head of Keys",
    programmes: ["piano", "musicianship"],
    since: 2006,
    training:
      "Piano performance, Larkhill Conservatory; piano pedagogy diploma",
    short:
      "Teaches beginners and diploma students with the same patience, and asks every student to sing the phrase first.",
    bio: [
      "Ines grew up above her mother's piano repair workshop and has taught at Score for almost twenty years. She runs the keys department, plans the student recitals and still keeps three Saturday-morning beginners because, she says, they keep her honest.",
      "Her lessons begin with listening: she plays, you sing it back, then you play it. Her students win fewer competitions than they could, and almost none of them stop playing.",
    ],
    onTheStand: [
      "Schumann — Kinderszenen",
      "Florence Price — Fantasie Nègre No. 1",
      "Haydn — Sonata in C, Hob. XVI:35",
    ],
    quote: "A ten-minute practice you look forward to beats an hour you dread.",
    hours: {
      1: ["15:00", "19:30"],
      3: ["15:00", "20:00"],
      4: ["15:30", "19:00"],
      6: ["09:00", "12:30"],
    },
    room: "Room 2",
  },
  {
    slug: "theo-marchetti",
    name: "Theo Marchetti",
    role: "Piano and jazz piano",
    programmes: ["piano", "band"],
    since: 2015,
    training: "Jazz studies, Eastbridge College of Music",
    short:
      "Classical training, a jazz habit and a weakness for teaching adults who think it's too late.",
    bio: [
      "Theo teaches piano along two routes — classical and lead-sheet — and moves students between them freely. He coaches two of the Friday bands and plays keys in a nine-piece soul group on weekends.",
      "Around half of his students are adults, several of them past sixty. His lessons are full of questions, and he answers most of them at the piano.",
    ],
    onTheStand: [
      "Bill Evans-style voicings on Autumn Leaves",
      "Debussy — Children's Corner",
      "Mary Lou Williams — Zodiac Suite, Aries",
    ],
    quote:
      "Nobody is too old to start. Some people are just too busy — that we can work with.",
    hours: {
      2: ["16:00", "21:00"],
      4: ["16:00", "21:00"],
      5: ["16:00", "20:00"],
    },
    room: "Room 4",
  },
  {
    slug: "adaeze-okafor",
    name: "Adaeze Okafor",
    role: "Head of Strings",
    programmes: ["violin", "chamber"],
    since: 2011,
    training: "Violin, Royal Northern-trained; Suzuki teacher training, Book 6",
    short:
      "Starts five-year-olds on the violin and conducts the Chamber Strings on Saturday afternoons.",
    bio: [
      "Adaeze plays second violin in the Larkhill Philharmonic and has led the strings department since 2014. She built the instrument library from twelve violins to more than a hundred, mostly by asking politely.",
      "Her youngest students learn by ear first, with a parent in the lesson. Her oldest students lead the Chamber Strings and coach the Training Strings themselves.",
    ],
    onTheStand: [
      "Vivaldi — The Four Seasons, Winter",
      "Grażyna Bacewicz — Sonata No. 4",
      "Mozart — Sinfonia Concertante, K. 364",
    ],
    quote:
      "The bow arm is the voice. We spend a long time on it, and it's worth it.",
    hours: {
      1: ["15:00", "19:00"],
      2: ["15:00", "19:00"],
      3: ["15:30", "18:30"],
      6: ["09:00", "13:00"],
    },
    room: "Room 6",
  },
  {
    slug: "lukas-brenner",
    name: "Lukas Brenner",
    role: "Cello and double bass",
    programmes: ["cello", "chamber"],
    since: 2018,
    training: "Cello, Hochschule-trained; baroque cello with the Alder Consort",
    short:
      "Cellist, bass player and the reason so many adults at Score have finally started an instrument.",
    bio: [
      "Lukas plays modern and baroque cello and doubles on bass in a tango quintet. At Score he teaches cello and bass from age six, and coaches the trios and quartets.",
      "He likes students to play duets with him from the very first lesson, on the grounds that a bass line is more fun with a tune on top.",
    ],
    onTheStand: [
      "Bach — Suite No. 3 in C",
      "Piazzolla — Le Grand Tango",
      "Fauré — Élégie",
    ],
    quote:
      "Sit well and breathe. Most cello problems are solved before you touch the bow.",
    hours: {
      2: ["15:00", "20:00"],
      4: ["15:00", "20:00"],
      6: ["10:00", "15:00"],
    },
    room: "Room 7",
  },
  {
    slug: "mireille-duval",
    name: "Mireille Duval",
    role: "Head of Voice, Chorus director",
    programmes: ["voice", "chamber"],
    since: 2009,
    training:
      "Vocal performance, Conservatoire de Lyon; voice pedagogy certificate",
    short:
      "Mezzo-soprano who teaches classical, musical theatre and pop singers to look after their voices.",
    bio: [
      "Mireille sang opera for a decade before joining Score, and she runs the Wednesday Chorus with a mixture of strictness and jokes that its members describe as 'French'.",
      "She works with changing teenage voices often and carefully, and with adults who were told as children that they couldn't sing. Most of them can.",
    ],
    onTheStand: [
      "Fauré — Les Berceaux",
      "Purcell — When I Am Laid in Earth",
      "Sondheim — Not While I'm Around",
    ],
    quote:
      "Your voice is the only instrument you can't put back in its case, so we treat it kindly.",
    hours: {
      1: ["16:00", "20:30"],
      3: ["16:00", "21:00"],
      5: ["15:30", "19:30"],
    },
    room: "Room 1",
  },
  {
    slug: "sam-whitlock",
    name: "Sam Whitlock",
    role: "Classical and acoustic guitar",
    programmes: ["guitar"],
    since: 2016,
    training: "Classical guitar, Larkhill Conservatory",
    short:
      "Fixes the habits that hurt, then teaches fingerstyle as if every student were going to play at a wedding.",
    bio: [
      "Sam teaches classical guitar in notation and acoustic guitar from chord charts, and switches between them inside a single lesson if that's what the student needs.",
      "He runs the Guitar Orchestra — eighteen players from age ten to seventy — and arranges most of its music himself.",
    ],
    onTheStand: [
      "Barrios — La Catedral",
      "Tárrega — Recuerdos de la Alhambra",
      "His own arrangement of Blackbird-style fingerpicking",
    ],
    quote:
      "If it hurts, we change it. Guitar should feel easy before it sounds hard.",
    hours: {
      1: ["15:30", "20:00"],
      2: ["15:30", "20:00"],
      5: ["15:00", "19:00"],
      6: ["09:30", "13:30"],
    },
    room: "Room 5",
  },
  {
    slug: "jonah-reyes",
    name: "Jonah Reyes",
    role: "Electric guitar, bass and band coach",
    programmes: ["band", "guitar"],
    since: 2019,
    training: "Contemporary music performance, Eastbridge College of Music",
    short:
      "Session guitarist who runs the Friday bands and gets every one of them on stage by the end of term.",
    bio: [
      "Jonah has played on more records than he can list and toured with three bands you might have heard on the radio. He teaches electric guitar and bass, and coaches the Friday bands in the basement studio.",
      "His students learn to read charts and play to a click, and they learn that the best guitar part is often the one you leave out.",
    ],
    onTheStand: [
      "Cory Wong-style rhythm guitar etudes",
      "Motown bass lines, one a week",
      "A three-song set for the next Open Stage",
    ],
    quote: "Timing first, tone second, speed somewhere much later.",
    hours: {
      3: ["16:00", "21:00"],
      4: ["16:00", "21:00"],
      5: ["16:00", "21:00"],
    },
    room: "Studio B",
  },
  {
    slug: "priya-raman",
    name: "Priya Raman",
    role: "Woodwind",
    programmes: ["clarinet", "chamber"],
    since: 2013,
    training: "Clarinet, Larkhill Conservatory; jazz saxophone, private study",
    short:
      "Clarinettist and saxophonist who conducts the Saturday Wind Band and coaches the Thursday jazz trio.",
    bio: [
      "Priya teaches clarinet, flute and saxophone, conducts the Wind Band and coaches the jazz trio, which has a waiting list and a very strong opinion about Thelonious Monk.",
      "Her lessons start with long notes and tuning, every time. Her students' parents say they can tell the difference from the next room.",
    ],
    onTheStand: [
      "Brahms — Clarinet Sonata in F minor",
      "Poulenc — Sonata for Clarinet",
      "Benny Golson-style blues heads",
    ],
    quote: "Air is the instrument. The clarinet is just the shape we give it.",
    hours: {
      2: ["15:30", "19:30"],
      4: ["15:30", "19:30"],
      6: ["09:00", "12:00"],
    },
    room: "Room 3",
  },
  {
    slug: "hattie-lund",
    name: "Hattie Lund",
    role: "Early years, Music Garden",
    programmes: ["music-garden"],
    since: 2017,
    training: "Early childhood music education, Kodály certificate",
    short:
      "Leads every Music Garden class and knows each child's favourite song by the second week.",
    bio: [
      "Hattie trained as a primary teacher, then spent four summers studying Kodály method before starting Music Garden at Score in 2017. It now runs eleven classes a week.",
      "Her classes are built around singing, because she believes a child who can sing a tune in tune can learn any instrument they choose next.",
    ],
    onTheStand: [
      "Kodály — 333 Elementary Exercises",
      "Folk songs from twelve countries",
      "The Garden Gate, which she wrote",
    ],
    quote:
      "Small children don't need to sit still to learn music. They need to move, and then to listen.",
    hours: {
      1: ["15:30", "17:30"],
      2: ["15:30", "17:30"],
      3: ["15:30", "17:30"],
      6: ["09:00", "12:00"],
    },
    room: "The Garden Room",
  },
  {
    slug: "oren-castellano",
    name: "Oren Castellano",
    role: "Director, musicianship and composition",
    programmes: ["musicianship", "piano"],
    since: 2004,
    training:
      "Composition, Larkhill Conservatory; doctorate in music education",
    short:
      "Runs the school, teaches the top musicianship class and writes a new piece for the students every year.",
    bio: [
      "Oren has directed Score since 2012 and taught here for longer. He teaches musicianship and composition, and a handful of piano students he refuses to give up.",
      "Each spring he writes a short piece for whichever combination of students is around — last year a quartet for two violins, ukulele and tuba.",
    ],
    onTheStand: [
      "His Spring Piece for unusual quartet",
      "Bach chorales for dictation",
      "Messiaen — Quartet for the End of Time, slowly",
    ],
    quote:
      "Theory is not a set of rules. It's a description of what composers liked.",
    hours: {
      2: ["16:30", "19:30"],
      4: ["16:30", "19:30"],
      6: ["13:00", "16:00"],
    },
    room: "Room 8",
  },
];

/* ------------------------------------------------------------ recitals */

export type Recital = {
  id: string;
  title: string;
  kind:
    | "Student recital"
    | "Faculty concert"
    | "Open Stage"
    | "Ensembles"
    | "Family concert";
  /** Days from today, so the season always looks current in the demo. */
  inDays: number;
  time: string;
  venue: string;
  entry: string;
  description: string;
  programme: { piece: string; composer: string; performers: string }[];
};

export const venues = {
  longRoom: "The Long Room, 418 Alder Street",
  stBrendan: "St Brendan's Hall, 22 Quay Road",
  studio: "Studio B (basement), 418 Alder Street",
};

export const recitals: Recital[] = [
  {
    id: "autumn-keys",
    title: "Autumn Keys",
    kind: "Student recital",
    inDays: 6,
    time: "16:00",
    venue: venues.longRoom,
    entry: "Free · no ticket needed",
    description:
      "Eleven piano students, from second-term beginners to diploma candidates, play the pieces they've been working on since September. Fifty minutes, no interval, tea afterwards.",
    programme: [
      {
        piece: "Minuet in G, BWV Anh. 114",
        composer: "J. S. Bach",
        performers: "Maya T., age 8",
      },
      {
        piece: "The Wild Horseman, Op. 68 No. 8",
        composer: "Robert Schumann",
        performers: "Leo F., age 10",
      },
      {
        piece: "Ticklin' Toes",
        composer: "Florence Price",
        performers: "Ada W., age 11",
      },
      {
        piece: "Mikrokosmos No. 81, Wandering",
        composer: "Béla Bartók",
        performers: "Daniel K., started at 61",
      },
      {
        piece: "Arabesque No. 1",
        composer: "Claude Debussy",
        performers: "Sophie R., age 15",
      },
      {
        piece: "Sonata in C, Hob. XVI:35, first movement",
        composer: "Joseph Haydn",
        performers: "Tomás E., age 17",
      },
    ],
  },
  {
    id: "chorus-and-strings",
    title: "Chorus & Strings",
    kind: "Ensembles",
    inDays: 20,
    time: "18:30",
    venue: venues.stBrendan,
    entry: "$12 · students and under-18s free",
    description:
      "The Wednesday Chorus and the Chamber Strings share a stage for the first time this season, ending with a new arrangement of Shenandoah for both groups.",
    programme: [
      {
        piece: "St Paul's Suite, Jig",
        composer: "Gustav Holst",
        performers: "Chamber Strings, cond. Adaeze Okafor",
      },
      {
        piece: "Ave Verum Corpus",
        composer: "W. A. Mozart",
        performers: "Wednesday Chorus, cond. Mireille Duval",
      },
      {
        piece: "Concerto Grosso Op. 6 No. 8, Pastorale",
        composer: "Arcangelo Corelli",
        performers: "Chamber Strings",
      },
      {
        piece: "Shenandoah, arr. O. Castellano",
        composer: "Traditional",
        performers: "Chorus and Strings together",
      },
    ],
  },
  {
    id: "open-stage-november",
    title: "Open Stage",
    kind: "Open Stage",
    inDays: 34,
    time: "19:30",
    venue: venues.studio,
    entry: "Free · standing, ear plugs at the door",
    description:
      "The Friday bands play their end-of-term sets in the basement studio. Five bands, three originals, one drum solo we have agreed to keep under ninety seconds.",
    programme: [
      {
        piece: "Twelve-bar in E (set opener)",
        composer: "Arr. the band",
        performers: "Low Tide — Sam, Ivy, Kofi, Ren",
      },
      {
        piece: "Glasshouse (original)",
        composer: "Ivy M.",
        performers: "Low Tide",
      },
      {
        piece: "Funk on one chord",
        composer: "Arr. J. Reyes",
        performers: "The Tuesday Kids",
      },
      {
        piece: "Lighthouse (original)",
        composer: "Band Seven",
        performers: "Band Seven",
      },
    ],
  },
  {
    id: "faculty-winter",
    title: "Faculty in Winter",
    kind: "Faculty concert",
    inDays: 52,
    time: "19:00",
    venue: venues.longRoom,
    entry: "$18 · proceeds to the bursary fund",
    description:
      "Once a year the teachers take the stage. This winter: Brahms for clarinet and piano, Piazzolla for cello and bass, and Oren Castellano's new Spring Piece, previewed in December.",
    programme: [
      {
        piece: "Clarinet Sonata in F minor, Op. 120 No. 1",
        composer: "Johannes Brahms",
        performers: "Priya Raman, Ines Halloran",
      },
      {
        piece: "Les Berceaux",
        composer: "Gabriel Fauré",
        performers: "Mireille Duval, Theo Marchetti",
      },
      {
        piece: "Le Grand Tango",
        composer: "Astor Piazzolla",
        performers: "Lukas Brenner, Theo Marchetti",
      },
      {
        piece: "Spring Piece (preview)",
        composer: "Oren Castellano",
        performers: "Adaeze Okafor, Sam Whitlock and friends",
      },
    ],
  },
  {
    id: "garden-sing-along",
    title: "Music Garden Sing-Along",
    kind: "Family concert",
    inDays: 66,
    time: "10:30",
    venue: venues.longRoom,
    entry: "Free · families welcome, buggies by the door",
    description:
      "Thirty minutes of singing, ukuleles and loud-and-soft games led by Hattie Lund and the Saplings class. Everybody joins in, including grandparents.",
    programme: [
      {
        piece: "The Garden Gate",
        composer: "Hattie Lund",
        performers: "Everyone",
      },
      {
        piece: "Frère Jacques, in a round",
        composer: "Traditional",
        performers: "Saplings and audience",
      },
      {
        piece: "Hot Cross Buns, three strings",
        composer: "Traditional",
        performers: "Saplings ukuleles",
      },
    ],
  },
  {
    id: "summer-strings",
    title: "Summer Strings",
    kind: "Student recital",
    inDays: -24,
    time: "15:00",
    venue: venues.longRoom,
    entry: "Free",
    description:
      "The last recital of the summer session: violin, viola and cello students playing solo and in duets with their teachers.",
    programme: [
      {
        piece: "Twinkle Variations",
        composer: "Shinichi Suzuki",
        performers: "Five Training Strings players, ages 6–8",
      },
      {
        piece: "Concerto in A minor, RV 356, first movement",
        composer: "Antonio Vivaldi",
        performers: "Hana O., age 12",
      },
      {
        piece: "The Swan",
        composer: "Camille Saint-Saëns",
        performers: "Ellis A., age 9, cello",
      },
      {
        piece: "Sonata in E minor",
        composer: "Benedetto Marcello",
        performers: "Ruth P., adult student, cello",
      },
    ],
  },
  {
    id: "guitar-orchestra",
    title: "Guitar Orchestra",
    kind: "Ensembles",
    inDays: -47,
    time: "18:00",
    venue: venues.stBrendan,
    entry: "$8",
    description:
      "Eighteen guitarists, ages ten to seventy, in Sam Whitlock's arrangements of Spanish, Brazilian and English music.",
    programme: [
      {
        piece: "Lágrima, arr. for guitar orchestra",
        composer: "Francisco Tárrega",
        performers: "Guitar Orchestra",
      },
      {
        piece: "Prelude No. 1",
        composer: "Heitor Villa-Lobos",
        performers: "Nadia B., age 16, solo",
      },
      {
        piece: "Greensleeves",
        composer: "Traditional, arr. S. Whitlock",
        performers: "Guitar Orchestra",
      },
    ],
  },
];

export const recitalNotes = {
  intro:
    "Every student who wants to perform gets a spot each term, and nobody has to. Recitals are short, friendly and free unless they raise money for the bursary fund.",
  howToPlay: [
    "Tell your teacher four weeks before a recital — they'll decide together with you whether the piece is ready.",
    "Every performer gets a ten-minute rehearsal on the stage piano or in the hall the week before.",
    "Bring two guests or twenty. Seats in the Long Room are first come, first served; St Brendan's has plenty.",
  ],
};

/* ------------------------------------------------------------ fees */

export const fees = {
  termWeeks: 12,
  terms:
    "Three 12-week terms a year, from September, January and April, plus an optional six-week summer session. Join any week — the first term is charged pro rata.",
  private: [
    { minutes: 30, perLesson: 38, note: "Most beginners and under-tens" },
    {
      minutes: 45,
      perLesson: 54,
      note: "From about Grade 3, or adults who like time to talk",
    },
    { minutes: 60, perLesson: 70, note: "Advanced students and exam years" },
  ],
  hire: [
    { item: "Violin or viola, any size", price: 22 },
    { item: "Cello, any size", price: 34 },
    { item: "Double bass", price: 42 },
    { item: "Nylon-string guitar", price: 16 },
    { item: "Clarinet or flute", price: 18 },
    { item: "Alto saxophone", price: 28 },
    { item: "Practice amp or electronic drum kit", price: 20 },
  ],
  extras: [
    { item: "Trial lesson, 30 minutes", price: "Free" },
    { item: "Ensembles, with private lessons at Score", price: "Included" },
    {
      item: "Practice-room booking, weekday afternoons",
      price: "Free for students",
    },
    { item: "Exam entry and accompanist", price: "At cost, from $60" },
  ],
  discounts: [
    "Siblings: 10% off the second and every further child's lessons.",
    "Two lessons a week, or a lesson plus Musicianship: 10% off the second.",
    "Bursaries: about one student in five learns here on a full or part bursary, funded by the Faculty in Winter concert and our donors. Ask in confidence at the desk or by email.",
  ],
};

export const faqs = [
  {
    q: "Do we need an instrument before the trial lesson?",
    a: "No. We'll have one ready for the lesson and measure younger students for the right size. If you decide to continue, you can hire from our library by the month and buy later — or never.",
  },
  {
    q: "What age is right to start?",
    a: "Music Garden starts at three. Piano and violin usually from five, cello from six, guitar from seven, woodwind from eight and voice from about nine. Adults start any time; a good third of our students are over eighteen.",
  },
  {
    q: "How much practice is expected?",
    a: "For beginners, ten to fifteen minutes on five days a week is plenty. Short and regular beats long and rare. Your teacher writes a plan in the notebook after every lesson.",
  },
  {
    q: "What happens if we miss a lesson?",
    a: "Tell us 24 hours ahead and we'll offer a make-up slot in the same term. Teachers' absences are always made up or refunded.",
  },
  {
    q: "Are exams compulsory?",
    a: "No. About a third of students take graded exams. They're useful for some people and pointless for others, and your teacher will help you decide.",
  },
  {
    q: "Can parents sit in on lessons?",
    a: "For under-eights we ask a grown-up to stay, at least for the first term. For older students, ask the teacher — most like a parent to sit in once a term.",
  },
  {
    q: "How do we stop?",
    a: "Give notice by half-term and we won't charge for the following term. No forms, no fees.",
  },
];

/* ------------------------------------------------------------ pages */

export const home = {
  title: "Your first lesson is closer than you think.",
  lede: "Score is a music school on Alder Street in Larkhill. Ten teachers, ten programmes and eleven teaching rooms, for students from three to eighty-something. Your first half hour is free.",
  firstLesson: [
    {
      title: "Book",
      text: "Pick a programme and a time that suits you. Most weeks we have trial slots every weekday afternoon and on Saturday morning.",
    },
    {
      title: "Meet",
      text: "Thirty minutes with a teacher. Try the instrument, play something you know or nothing at all. No preparation, no audition.",
    },
    {
      title: "Plan",
      text: "The teacher writes a short plan: lesson length, a first piece, whether to hire an instrument. You take it home and think.",
    },
    {
      title: "Begin",
      text: "Weekly lessons start the following week, with the same teacher, at the same time, for as long as it works.",
    },
  ],
  practice: {
    title: "Go on. Play something.",
    text: "Tap the keys, or use your keyboard from A to ; — every note is engraved on the staff as you play it. The full practice room has a metronome and tuning notes too.",
  },
  ensemble: {
    title: "Practise alone. Play together.",
    text: "Every student can join an ensemble once they can read a part: Training Strings and Wind Band on Saturday mornings, the Chorus on Wednesdays, Friday bands in the basement. It's where most of our students find out why they practise.",
  },
  voices: [
    {
      quote:
        "Ellis was six and had never touched a cello. Two years on he played The Swan in the Long Room, and asked afterwards when he could do it again.",
      who: "Ruth A., parent",
      detail: "Ellis, 9, cello with Lukas Brenner",
    },
    {
      quote:
        "I started piano at sixty-one after forty years of meaning to. Theo never once made me feel like the oldest person in the building — which I was, most Tuesdays.",
      who: "Daniel K., adult student",
      detail: "Piano, third year",
    },
  ],
  fees: "Private lessons from $38 for thirty minutes, paid by the term or in three monthly instalments. Ensembles are free for students who take lessons here, and about one student in five learns on a bursary.",
  close: {
    title: "Thirty minutes, on us.",
    text: "Book a free trial lesson with the teacher you'd actually have. If it isn't right, you've lost half an hour and gained a story.",
  },
};

export const about = {
  title: "A house full of pianos since 1994.",
  lede: "Score began in a closed piano showroom on Alder Street, with four teachers and two pianos nobody wanted to move. Thirty-two years later, we still haven't moved them.",
  story: [
    "The pianist Marguerite Avery opened Score in 1994 with a simple idea she'd taken from her own teacher: one student, one teacher, for years, and a recital every term so that the music goes somewhere. The showroom had good light, thick walls and a long back room with a raised floor that had once displayed grand pianos. It became the Long Room, and every recital since has happened in it or started there.",
    "We have grown slowly on purpose. Today ten teachers and around three hundred and ten students share eleven teaching rooms, a basement studio, a Garden Room for the youngest children and an instrument library of more than a hundred and forty violins, cellos, guitars and clarinets for hire.",
    "Score is an independent, not-for-profit school. Fees pay the teachers and the building; concerts and donations pay for bursaries, which today cover lessons for about one student in five.",
  ],
  principles: [
    {
      title: "One teacher, for years",
      text: "Students stay with the same teacher across terms unless they choose to change. Progress in music is a long conversation.",
    },
    {
      title: "Everyone may perform; nobody must",
      text: "Recital spots are offered every term. Stage fright is normal, and sitting one out is too.",
    },
    {
      title: "Exams are a tool, not the point",
      text: "About a third of our students take graded exams. The rest are learning just as seriously.",
    },
    {
      title: "Short, daily practice",
      text: "Ten good minutes beats an anxious hour. Every lesson ends with a written plan for the week.",
    },
  ],
  building: [
    {
      name: "The Long Room",
      text: "Eighty seats, a seven-foot grand from 1962 and the best acoustic on Alder Street.",
    },
    {
      name: "Eleven teaching rooms",
      text: "Each with an acoustic piano, music stands and a door that actually closes.",
    },
    {
      name: "Studio B",
      text: "A basement band room with a drum kit, amps and a recording desk.",
    },
    {
      name: "The Garden Room",
      text: "A sprung floor, tuned percussion and a window onto the yard, for Music Garden.",
    },
  ],
  careers:
    "We hire teachers in August and January. If you teach an instrument we offer — or one we don't yet — write to us with a short recording and what you like to teach.",
};

export const practice = {
  title: "The practice room",
  lede: "Three tools our teachers use in lessons, here for the days between: a keyboard that writes down what you play, a metronome and tuning notes for strings and guitar.",
  tips: [
    {
      title: "Start slow",
      text: "Set the metronome to a tempo where you make no mistakes, then raise it by four beats a day.",
    },
    {
      title: "Tune every time",
      text: "Thirty seconds with a reference note saves your ears a week of learning wrong intervals.",
    },
    {
      title: "Write it down",
      text: "Play a phrase you're working on and look at it on the staff. Seeing the shape of a tune helps you remember it.",
    },
  ],
};

export const trial = {
  title: "Book a free trial lesson",
  lede: "Thirty minutes with the teacher you'd actually have, in the room you'd actually use. Choose a programme and a time, and tell us a little about who's learning.",
  promises: [
    "No preparation and no audition.",
    "We'll have an instrument ready in the right size.",
    "For under-eights, a grown-up stays in the lesson.",
  ],
};
