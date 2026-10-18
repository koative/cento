import window from "./assets/window.jpg";
import architecture from "./assets/architecture.jpg";
import allotment from "./assets/allotment.jpg";
import allotmentAutumn from "./assets/allotment-autumn.jpg";
import printshop from "./assets/printshop.jpg";
import saltpans from "./assets/saltpans.jpg";
import terraces from "./assets/terraces.jpg";
import crossing from "./assets/crossing.jpg";
import shelves from "./assets/shelves.jpg";
import newsprint from "./assets/newsprint.jpg";
import storm from "./assets/storm.jpg";
import readingRoom from "./assets/reading-room.jpg";

export const brand = {
  name: "Monograph",
  sector: "Independent magazine",
  tagline: "A quarterly of slow attention. One word, four times a year.",
  email: "letters@monograph.example",
  subscriptionsEmail: "subscriptions@monograph.example",
  phone: "+1 555 0114",
  phoneHref: "tel:+15550114",
  address: "Unit 4, Ropewalk Yard, 18 Tanner Street",
  hours: "Office open Tuesday to Friday, 10:00–16:00",
  instagram: "https://www.instagram.com/",
};

export const nav = [
  { to: "/issues/31", label: "This issue" },
  { to: "/issues", label: "Issues" },
  { to: "/stories", label: "Stories" },
  { to: "/contributors", label: "Contributors" },
  { to: "/about", label: "About" },
];

/* ——— Sections ——— */

export type SectionSlug =
  "essays" | "reportage" | "conversations" | "fiction" | "portfolio";

export type Section = {
  slug: SectionSlug;
  name: string;
  single: string;
  description: string;
  note: string;
};

export const sections: Section[] = [
  {
    slug: "essays",
    name: "Essays",
    single: "Essay",
    description:
      "Long, first-person thinking about ordinary things: porches, notebooks, bookshops, the weather.",
    note: "We look for essays that change their mind at least once. Pitch a question, not a conclusion.",
  },
  {
    slug: "reportage",
    name: "Reportage",
    single: "Reportage",
    description:
      "A reporter stays somewhere for a week or more and writes down what the work looks like from inside.",
    note: "Every reportage piece involves at least five days on location. We pay travel on top of the fee.",
  },
  {
    slug: "conversations",
    name: "Conversations",
    single: "Conversation",
    description:
      "One maker, one interviewer, one long afternoon. Edited for length, never for the voice.",
    note: "Conversations are recorded in person, transcribed in full and sent back to the subject before print.",
  },
  {
    slug: "fiction",
    name: "Fiction",
    single: "Fiction",
    description:
      "One short story per issue, commissioned around the issue’s word and set in the real world.",
    note: "We read unsolicited fiction in January and July. Under 4,000 words, please.",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    single: "Portfolio",
    description:
      "A photographer spends a season with a single subject. Printed full-bleed on uncoated stock.",
    note: "Portfolios run across twenty pages in print. Online we show a selection with the photographer’s notes.",
  },
];

/* ——— Contributors ——— */

export type Contributor = {
  slug: string;
  name: string;
  role: string;
  based: string;
  since: number;
  short: string;
  bio: string[];
  elsewhere: string;
};

export const contributors: Contributor[] = [
  {
    slug: "elena-moss",
    name: "Elena Moss",
    role: "Writer",
    based: "Lives in Porto",
    since: 12,
    short: "writes about buildings and the people who wait inside them.",
    bio: [
      "Elena Moss trained as an architect and practised for nine years before she admitted that she preferred describing buildings to drawing them. She writes about doorways, stairwells, waiting rooms and the other spaces architecture forgets to photograph.",
      "She has written an essay for every Monograph issue since No. 12, which makes her our longest-running contributor after the editor.",
    ],
    elsewhere:
      "Her first book, Rooms Before Rooms, is published next spring by Lantern Press.",
  },
  {
    slug: "theo-wells",
    name: "Theo Wells",
    role: "Editor-at-large",
    based: "Lives in Bristol",
    since: 1,
    short:
      "has interviewed sixty-odd makers for these pages and still prefers a notebook to a recorder.",
    bio: [
      "Theo Wells co-founded Monograph with Hanna Lowe in 2018 and edited the first eight issues before handing over the desk to write more. He conducts most of our Conversations and writes the occasional essay when an issue word gets under his skin.",
      "Before Monograph he spent a decade as a sub-editor on a regional newspaper, where he learned that every sentence can lose four words.",
    ],
    elsewhere:
      "He teaches an evening class in interviewing at the Harbourside Adult College.",
  },
  {
    slug: "mara-ellis",
    name: "Mara Ellis",
    role: "Reporter",
    based: "Lives in Galway",
    since: 9,
    short:
      "reports on work that happens slowly: salt, bookselling, mending, rope.",
    bio: [
      "Mara Ellis is a reporter who will stay a week where most would stay an afternoon. Her pieces for Monograph have taken her to salt fields, bookshops, a rope works and a cooperage that makes forty barrels a year.",
      "She writes in longhand first and types it up at night, which she says is the only edit she trusts.",
    ],
    elsewhere: "Her radio series on endangered trades is in its third season.",
  },
  {
    slug: "ines-varga",
    name: "Ines Varga",
    role: "Photographer",
    based: "Lives in Leeds",
    since: 17,
    short:
      "photographs one subject for a whole season and asks permission plot by plot.",
    bio: [
      "Ines Varga makes long photographic studies of shared places: allotments, laundrettes, swimming baths, bus depots at five in the morning. She works with one camera and one lens per project and returns to the same spot every week.",
      "Since No. 22 she has also been Monograph’s photography editor, which mostly means persuading other photographers to slow down.",
    ],
    elsewhere:
      "Her book Common Ground collects five years of allotment pictures.",
  },
  {
    slug: "callum-reyes",
    name: "Callum Reyes",
    role: "Reporter",
    based: "Lives in Liverpool",
    since: 24,
    short:
      "rides night buses, night ferries and night trains, and writes down what people say on them.",
    bio: [
      "Callum Reyes covers the shifts most of us sleep through. He began writing for Monograph with a piece on the cleaners of a city-centre theatre and has since reported on bakers, locksmiths, ferry crews and a lighthouse relief boat.",
      "He has a rule of never interviewing anyone in the first two nights. He just turns up, and helps.",
    ],
    elsewhere: "He is working on a book about the economy of the small hours.",
  },
  {
    slug: "sana-okafor",
    name: "Sana Okafor",
    role: "Fiction writer",
    based: "Lives in Aberdeen",
    since: 20,
    short: "writes short stories in the form of lists, logbooks and forms.",
    bio: [
      "Sana Okafor writes short fiction disguised as other documents: inventories, logbooks, recipes, a lost-property register. Her stories have appeared in Monograph since No. 20 and in several anthologies of new writing.",
      "She works as a ward clerk three days a week and writes on the other four.",
    ],
    elsewhere: "Her first collection, Item, is out now from Tidewater Books.",
  },
];

/* ——— Articles ——— */

export type Block =
  | { type: "p"; text: string; note?: string }
  | { type: "q"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string };

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  section: SectionSlug;
  author: string;
  credit?: string;
  issue: number;
  page: number;
  published: string;
  image?: { src: string; alt: string; caption: string };
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "the-long-threshold",
    title: "The long threshold",
    standfirst:
      "Porches, vestibules, the bench by the door: on the small rooms that let a body arrive before the mind catches up.",
    section: "essays",
    author: "elena-moss",
    issue: 31,
    page: 12,
    published: "2026-09-17",
    image: {
      src: window,
      alt: "A dormer window set into a wall of grey timber shingles, half in shadow",
      caption:
        "A window in a keeper’s cottage, where the wall is thick enough to sit in.",
    },
    body: [
      {
        type: "p",
        text: "My grandmother’s house had a porch no deeper than a coat. It was enclosed in rippled glass, it held a boot rack and a geranium that never flowered, and nobody would have called it a room. Yet everyone who visited stopped there. You knocked the rain off your shoulders, you heard the kitchen radio through the second door, and in those four or five seconds you changed from someone outside into someone who had arrived.",
      },
      {
        type: "p",
        text: "Architects have a dry word for this: transition space. The phrase makes it sound like a corridor, a place to be got through. But the best thresholds are not efficient at all. They are deliberately a little too long. They hold you for a beat, the way a good host holds the door, and the delay is the whole point.",
        note: "The Japanese genkan does this work formally: a step down, a change of floor, a place for shoes. The step is rarely more than fifteen centimetres, which turns out to be enough.",
      },
      { type: "h", text: "What a door cannot do" },
      {
        type: "p",
        text: "A door is binary. It is open or it is shut, and either way it is over in a second. A threshold is a gradient. Light changes across it, sound softens, the floor turns from stone to timber. In a well-made library you can feel the street fall away over three or four metres of entrance hall, long before the reading room asks you to lower your voice.",
      },
      {
        type: "figure",
        src: architecture,
        alt: "A white tiled museum building cantilevered over a glass entrance hall under a pale sky",
        caption:
          "Glass, then shade, then stone: an entrance that takes its time.",
      },
      {
        type: "p",
        text: "We have been designing these spaces out for decades. The apartment door opens straight onto the sofa; the office lobby is a turnstile; the shop entrance is a sensor that slides aside before you have decided to go in. All of this is sold as convenience, and some of it is. But something goes missing when there is nowhere to stand between one condition and the next.",
      },
      {
        type: "p",
        text: "Part of the loss is practical. A vestibule is where wet coats and post and muddy boots are meant to stop. Without one, the weather walks straight into the living room and the house has to absorb it. But most of the loss is harder to price. A threshold is the one place in a building where you are allowed to be neither in nor out, and a surprising amount of ordinary life happens in that condition: the last word with a guest, the cigarette you said you had given up, the phone call that should not be overheard.",
      },
      {
        type: "p",
        text: "Planners talk about dwell time when they want people to linger in a shopping centre and spend. I mean something closer to the opposite. A good threshold does not try to keep you. It lets you go at your own speed, in either direction, and it does not mind if you stand there for a while doing nothing.",
      },
      {
        type: "quote",
        text: "The best thresholds are deliberately a little too long.",
      },
      {
        type: "p",
        text: "Hospitals know this, in their better moments. So do bathhouses, chapels and the old cinemas with their carpeted foyers. Each of them puts a room before the room, so that you can put something down: an umbrella, a bad morning, the noise of the bus. The space asks nothing of you. It simply makes a pause available, and most of us take it.",
      },
      { type: "h", text: "The keeper’s cottage" },
      {
        type: "p",
        text: "The best one I know is on a headland in the north, in a lighthouse keeper’s cottage that is now let to walkers by the week. The walls are nearly a metre thick, and the builders, who knew what the wind would do, set every window deep into them. The result is a ledge at each window wide enough to sit on with your knees drawn up. It is not a room and not quite furniture. It is a threshold turned sideways: half in the house and half in the weather, with a pane of glass between.",
      },
      {
        type: "p",
        text: "I spent four days there in March, mostly on those ledges. I read, I watched the ferry go out and come back, and I noticed that nobody in the cottage ever sat on the sofa. We sat at the edges, where the light came in and the cold came through the glass, and we talked more than we would have in the middle of a room. A keeper’s family would have done the same, waiting for weather, keeping one eye on the sea.",
      },
      {
        type: "p",
        text: "When I came home I measured my own windowsills. They are eleven centimetres deep. You can put a mug on them, or a plant. You cannot put yourself on them, and I had never noticed that until I had spent four days somewhere that let me.",
      },
      {
        type: "p",
        text: "I have started to notice the thresholds I make for myself without meaning to. The three minutes on the step outside the flat before I find my keys. The walk round the block after a difficult phone call. The bench at the station where I sit even when the train is already waiting. They are not wasted. They are the porch I no longer have.",
        note: "A reader wrote to us after an early draft appeared in the Sunday letter to say that she keeps a folding chair in the boot of her car for exactly this reason. We have not stopped thinking about it.",
      },
      {
        type: "p",
        text: "If there is an argument here, it is a modest one. When we design a building, or a day, we could leave a little more room at the edges. Not a grand gesture: a bench near the entrance, a window low enough to sit beside, a corridor that turns once before it arrives. Enough to let a life slow down on its way in.",
      },
    ],
  },
  {
    slug: "the-compositors-hands",
    title: "The compositor’s hands",
    standfirst:
      "Agnes Rook has set type by hand for forty-one years. She talks to Theo Wells about lead, patience and why a printed page should never be perfect.",
    section: "conversations",
    author: "theo-wells",
    issue: 31,
    page: 40,
    published: "2026-09-17",
    image: {
      src: printshop,
      alt: "Three printers in aprons standing beside an iron hand press and a treadle platen in an old print shop",
      caption:
        "An old hospital print shop. Rook’s own workshop, she says, looks almost exactly like this, minus the moustaches.",
    },
    body: [
      {
        type: "p",
        text: "Rook’s workshop sits behind a bicycle repairer at the end of a mews. There are two presses, a guillotine older than the building and seventy-odd cases of metal type, most of them bought at the closing-down sales of other print shops. She was proofing a wedding invitation when I arrived and finished it before she said hello.",
      },
      { type: "q", text: "How did you start?" },
      {
        type: "p",
        text: "By accident, like everyone. I was sixteen and needed a Saturday job. The printer on our high street needed someone to sweep up, and after a month he let me distribute type, which means putting the letters back in the case after a job. You learn the case that way, by putting it away. By the end of the summer I could find a lowercase e with my eyes shut.",
      },
      { type: "q", text: "Is that still how you work?" },
      {
        type: "p",
        text: "Mostly. Your hands learn the case and your head is free to think about the page. People imagine letterpress is slow because the setting is slow, and it is, a line a minute on a good day. But the real time goes into looking. Is the word space too wide? Does the capital need to sit a hair to the left? You can’t fix that afterwards in a menu. You fix it with a bit of thin brass and a lot of squinting.",
        note: "A hair space in metal type is a sliver of brass or copper, often under half a point thick. Rook keeps hers in a tobacco tin labelled ‘patience’.",
      },
      { type: "q", text: "Why does it matter, when almost nobody notices?" },
      {
        type: "p",
        text: "Because somebody does notice, eventually, even if they can’t say why. A page that has been looked after has a kind of calm to it. I don’t want it perfect. Perfect is what a machine does. I want it considered, and I want you to be able to feel the pressure of the letters with your thumb.",
      },
      {
        type: "quote",
        text: "Perfect is what a machine does. I want it considered.",
      },
      { type: "q", text: "What are you setting now?" },
      {
        type: "p",
        text: "A book of poems, sixty-four pages, an edition of two hundred. I’ve been at it since March. The poet keeps sending changes, which is fine, it’s her book. But every change means taking a line apart and building it again, so I have asked her, nicely, to stop being so good at revising.",
      },
      { type: "q", text: "Will anyone take over the workshop?" },
      {
        type: "p",
        text: "There are two apprentices now, which is two more than I expected. They’re quicker than I was. They also photograph everything they print, which I find very strange. In my day you had the proof, and if you lost it, well, you remembered to be more careful next time.",
        note: "Both apprentices joined through the Guild of Hand Printers’ bursary, which pays a living wage for two years of training.",
      },
    ],
  },
  {
    slug: "allotments-in-october",
    title: "Allotments in October",
    standfirst:
      "Twelve plots, one month, the last of the beans. Ines Varga spent the autumn on two city allotment sites, photographing what people grow when nobody is paying them to.",
    section: "portfolio",
    author: "ines-varga",
    credit: "Photographs and notes by Ines Varga",
    issue: 31,
    page: 64,
    published: "2026-09-17",
    image: {
      src: allotment,
      alt: "Allotment plots with raised beds, bean rows and green sheds under tall pine trees",
      caption:
        "Raised beds by the links, cleared for garlic. Half the plots on this site have a six-year waiting list.",
    },
    body: [
      {
        type: "p",
        text: "The allotment year does not end so much as thin out. By October the sweet peas are brown string, the courgettes have given up their last absurd marrow and the sheds begin to fill with things that will be sorted in spring. It is the season I chose to photograph, because it is when you can finally see the shape of the work.",
      },
      {
        type: "p",
        text: "I worked on two sites, one beside a golf links on the coast and one squeezed between a railway line and a row of terraced houses. I went every Saturday morning with one camera and one lens, and I asked permission plot by plot. Most people said yes. A few asked to be left out of the frame but not out of the project, so some of these pictures are of absence: a fork left upright in a bed, a kettle on a shelf, a chair turned to face the sun.",
        note: "The waiting-list figure comes from the site committee’s own register, which they showed me in September. The oldest name on it was added in 2019.",
      },
      {
        type: "figure",
        src: allotmentAutumn,
        alt: "Allotment sheds and greenhouses among autumn trees turning orange and brown",
        caption:
          "The railway site in late October. The trees turn a fortnight before the beds are cleared.",
      },
      { type: "quote", text: "You can finally see the shape of the work." },
      {
        type: "p",
        text: "What I wanted to show is not the romance of growing your own, which these pictures mostly decline. It is the patience. Someone has built a cold frame out of four old sash windows. Someone has labelled every row in careful capitals on lolly sticks. Someone, every week, leaves a bag of windfall apples by the gate with a note that says help yourself, they’re sharp.",
      },
      {
        type: "p",
        text: "The plot holders rarely talked to me about vegetables. They talked about the hour before work, the neighbour who had shown them how to stake tomatoes, the year the site flooded and everyone dug drainage trenches together in the rain. An allotment, it turns out, is less a garden than a long conversation conducted in soil.",
      },
    ],
  },
  {
    slug: "white-gold-at-dusk",
    title: "White gold at dusk",
    standfirst:
      "On the coastal salt fields, the harvest starts when the heat goes out of the day. Mara Ellis spent a week raking with the families who still work the pans by hand.",
    section: "reportage",
    author: "mara-ellis",
    issue: 30,
    page: 22,
    published: "2026-06-18",
    image: {
      src: saltpans,
      alt: "Salt workers raking white cones of salt in shallow pans that reflect an orange evening sky",
      caption:
        "Raking begins at around five in the afternoon, when the brine has thickened and the wind has dropped.",
    },
    body: [
      {
        type: "p",
        text: "The first thing you learn on a salt field is to wait. At noon the pans are a mirror too bright to look at, and nobody is out on them. The water in each shallow square has been evaporating for days, thickening from seawater to brine to something closer to syrup, and the crust only forms properly as the air cools. So the workers sit in the shade of a tin roof, drink tea and watch the light.",
      },
      {
        type: "p",
        text: "The family I worked with have kept their fourteen pans for three generations. The grandfather still checks the brine with his tongue; his granddaughter uses a hydrometer and then checks it with her tongue anyway, to be sure. When the moment comes, which seems to be a matter of feel rather than of clock, everyone takes up a long wooden rake and walks out barefoot onto the clay.",
        note: "A hydrometer measures density. Salt begins to crystallise once brine reaches roughly 25 degrees Baumé, about seven times the salinity of the open sea.",
      },
      { type: "h", text: "The weight of a day" },
      {
        type: "p",
        text: "Raking is slower than it looks and harder than it looks. You draw the crust towards you in long, flat strokes, careful not to bring up the mud beneath, and pile the wet salt into small cones along the edge of the pan. The cones drain overnight. In the morning they are carried in baskets to a long white heap by the road, and the heap is the year’s income.",
      },
      { type: "quote", text: "The heap by the road is the year’s income." },
      {
        type: "figure",
        src: terraces,
        alt: "Hundreds of small white salt terraces stepping down a steep red mountainside",
        caption:
          "Terraced salt pans in the mountains, fed by a single saline spring. The method is different; the waiting is the same.",
      },
      {
        type: "p",
        text: "A good evening yields perhaps forty kilos a pan. A bad one, after an unseasonal shower, yields nothing at all and means draining, refilling and losing a week. Industrial producers a few kilometres along the coast harvest with machines and sell for a fraction of the price. The families survive by selling to restaurants and shops that will pay for flakes that taste, as one chef put it to me, like the sea has been edited.",
      },
      {
        type: "p",
        text: "On my last evening the wind turned and the work stopped early. We sat on upturned crates while the sun went down behind the pans, the cones glowing pink and then grey. Nobody was in a hurry. Tomorrow there would be more brine, more crust, more waiting. That, the grandfather said, is the whole of the job: knowing that the sea will do most of it, if you let it.",
      },
    ],
  },
  {
    slug: "in-praise-of-the-unfinished",
    title: "In praise of the unfinished",
    standfirst:
      "The sketch, the fragment, the work left on the bench. A case for leaving a little room.",
    section: "essays",
    author: "theo-wells",
    issue: 30,
    page: 58,
    published: "2026-06-18",
    body: [
      {
        type: "p",
        text: "In a museum I used to visit as a student there was a room of unfinished portraits. Faces painted with great care sat on bodies that were only a few lines of chalk, and hands trailed off into bare canvas. It was the emptiest room in the building and, for me, the most crowded. Every picture seemed to be still happening.",
      },
      {
        type: "p",
        text: "An unfinished thing asks something of its audience. We follow a line beyond the edge of the paper, we hear the last note of a melody that was never written, we imagine the room the architect meant to build. We become collaborators, which is a kind of compliment.",
        note: "Several of those portraits were left unfinished because the sitter died, or the money ran out, or the painter simply lost interest. The museum’s labels are admirably frank about which.",
      },
      {
        type: "p",
        text: "Finished work, by contrast, can be oddly sealed. It has answered its questions before we arrive. That is often a virtue, and nobody wants a bridge that has been left open-ended. But in the arts, and in writing especially, there is a temptation to tidy everything, to close every door, until the reader has nothing left to do but agree.",
      },
      { type: "h", text: "The notebook and the exhibition" },
      {
        type: "p",
        text: "I have come to trust notebooks more than exhibitions. A notebook holds the wrong turns, the reconsidered choices, the sudden change of direction that made the final work possible. It shows thinking as it actually happens, which is sideways, and in fits.",
      },
      { type: "quote", text: "Every picture seemed to be still happening." },
      {
        type: "p",
        text: "This is not an argument for carelessness. The best unfinished work is unfinished on purpose, or at least unfinished with grace: the maker stopped at the point where more would have been less. Knowing where that point is may be the hardest skill there is.",
      },
      {
        type: "p",
        text: "So this is a small plea, from one editor to anyone who makes things. Leave a little room. Let the last paragraph open rather than close. Trust the person on the other side of the page to carry the thought a step further than you did. They usually will.",
      },
    ],
  },
  {
    slug: "the-last-crossing",
    title: "The last crossing of the night",
    standfirst:
      "The 00:40 ferry carries eleven passengers, four cars and a crew who know every one of them. Callum Reyes rode it for a week of night shifts.",
    section: "reportage",
    author: "callum-reyes",
    issue: 29,
    page: 30,
    published: "2026-03-19",
    image: {
      src: crossing,
      alt: "A wide river at dusk under a deep blue sky, a city skyline and pier lights on the far bank",
      caption:
        "The far bank an hour before the last sailing. By midnight only the pier lights remain.",
    },
    body: [
      {
        type: "p",
        text: "There are two ferries on this river during the day, crossing every twenty minutes, packed with commuters and school groups and people with bicycles. After eleven at night there is one, and after midnight it runs only once more. The 00:40 is the last boat. If you miss it, the bridge is nine miles upstream and the taxis are not keen.",
      },
      {
        type: "p",
        text: "The crew of the last boat are four: a master, a mate, a deckhand and an engineer who rarely comes up from below. They have worked nights together for six years. They drink the same coffee from the same flask, and they know the regulars by their cars, their dogs and their moods.",
      },
      {
        type: "p",
        text: "That’s the nurse, the deckhand told me on my first night, nodding at a woman asleep in a small hatchback. She’ll want waking at the other side. And that’s Dennis. Don’t ask Dennis about the football.",
      },
      { type: "h", text: "Eleven minutes" },
      {
        type: "p",
        text: "The crossing takes eleven minutes. The river at night is darker than you expect, and much louder: the engine, the slap of the water, the gulls that follow the boat in hope of chips nobody is eating. The passengers mostly stay in their cars. A few stand at the rail. On my third night a man in a suit stood beside me the whole way and said, at the far side, every night I promise myself I’ll stop working this late, and walked off before I could answer.",
      },
      {
        type: "quote",
        text: "Every night I promise myself I’ll stop working this late.",
      },
      {
        type: "p",
        text: "Night shifts change what a job is for. During the day the ferry is transport. At night it is something closer to a waiting room, or a confession box: a short span of time in which nothing is expected of anyone. The crew understand this and protect it. They make no announcements after midnight. They keep the cabin lights low.",
        note: "The operator’s timetable lists the 00:40 as subject to demand. In six years it has never been cancelled for lack of passengers.",
      },
      {
        type: "p",
        text: "At 00:51 the ramp comes down and the cars drive off into the dark one by one. The nurse is woken, gently. The crew tie up, check the moorings and pour the last of the coffee. Then they sit in the wheelhouse for ten minutes, not saying very much, before they go home to sleep while everyone else gets up.",
      },
    ],
  },
  {
    slug: "a-room-of-borrowed-lives",
    title: "A room of borrowed lives",
    standfirst:
      "Inside the independent bookshops that become a neighbourhood’s living room, and the people who keep the lights on.",
    section: "essays",
    author: "mara-ellis",
    issue: 28,
    page: 18,
    published: "2025-12-11",
    image: {
      src: shelves,
      alt: "Floor-to-ceiling wooden shelves packed with old hardback books in warm lamplight",
      caption:
        "The back room of a secondhand shop, arranged by the owner’s sense of what belongs together.",
    },
    body: [
      {
        type: "p",
        text: "The best bookshops are maps drawn by people. Every shelf is a suggestion, every unexpected pairing the start of a conversation. You come in looking for a title and leave with a question instead, and usually a different book.",
      },
      {
        type: "p",
        text: "I spent last winter visiting nine independent shops in small towns and city side streets, the kind with a bell on the door and a cat that may or may not belong to anybody. I wanted to know why people go to them when the same books are cheaper elsewhere and arrive on the doorstep the next morning.",
      },
      {
        type: "p",
        text: "The answer, almost everywhere, was that people do not go for the books. They go for the room. One shop kept a kettle and a tin of biscuits on the counter for anyone who wanted them. Another ran a reading group for people who had stopped reading and wanted to start again. A third had an armchair by the window that, the owner said, belongs to whoever needs it most that afternoon.",
      },
      {
        type: "quote",
        text: "The armchair belongs to whoever needs it most that afternoon.",
      },
      {
        type: "figure",
        src: newsprint,
        alt: "A wall lined with yellowed old newspaper pages, lit from a window on the right",
        caption:
          "Newspaper used as wall lining in an old reading room, uncovered during repairs. One owner keeps a framed piece above her till.",
      },
      { type: "h", text: "Rent and other plots" },
      {
        type: "p",
        text: "None of this pays the rent, and the owners are frank about the arithmetic. Most make a living rather than a profit. Several have second jobs. One told me she had worked out that the shop earned her, in a good year, about the same hourly rate as her teenage paper round.",
      },
      {
        type: "p",
        text: "And yet they stay open, because the room matters to someone. To the boy who reads graphic novels on the floor every Thursday after school. To the widower who orders one detective novel a week and stays an hour to talk about the last one. To a visitor like me, who arrived to ask questions and was sent away with a book of poems I had never heard of and have not stopped reading since.",
        note: "The book was a slim collection from a small press, printed in an edition of three hundred. The shop had two copies. It now has one.",
      },
      {
        type: "p",
        text: "To spend an hour among books is to practise a useful kind of wandering. The shop offers something a search field cannot: the possibility of finding what you did not know to ask for.",
      },
    ],
  },
  {
    slug: "the-keepers-inventory",
    title: "The keeper’s inventory",
    standfirst:
      "A short story. On the last night before the light is automated, a keeper counts what will be left behind.",
    section: "fiction",
    author: "sana-okafor",
    issue: 27,
    page: 88,
    published: "2025-09-18",
    image: {
      src: storm,
      alt: "Grey winter waves breaking white below a distant lighthouse on a headland in rain",
      caption: "A winter swell below the headland light.",
    },
    body: [
      {
        type: "p",
        text: "Item: one lamp, first-order, nine feet tall, polished every morning for twenty-two years. It will go on turning without me. The engineers say it will not notice the difference, and I suppose they are right; it never once said thank you.",
      },
      {
        type: "p",
        text: "Item: one logbook, current, and forty-three logbooks, past. Wind direction, wind force, visibility, vessels sighted. On the second of February nine years ago I wrote nothing, and then beneath it, nothing all day, which is the only time I let the book know how I felt.",
      },
      {
        type: "p",
        text: "Item: one kettle. Item: one chair, the good one, by the east window where the light comes in at seven in winter. Item: a jar of buttons, origin unknown, left by the keeper before me, whom I never met but whose handwriting I know better than my sister’s.",
      },
      { type: "quote", text: "It never once said thank you." },
      {
        type: "p",
        text: "Item: the weather. This is not mine to leave, but I will list it anyway. Fog on the shoals in April. The long grey swell before a southerly. The evenings in August when the sea goes flat and pink and the whole island seems to hold its breath. A storm in my first winter that took the boathouse door and left the boat.",
      },
      {
        type: "p",
        text: "Item: one radio, which will stay, and the voices on it, which will not. Every evening at eight I spoke to the keeper on the next headland, and every evening for eleven years she asked me what I was having for supper. She was automated in the spring. I still eat at eight.",
      },
      {
        type: "p",
        text: "Item: the light itself. You cannot inventory it. You can only report that it went round, all night, every night, and that out there somebody saw it, turned a little to the north and got home.",
      },
      {
        type: "p",
        text: "Item: me. One keeper, aged sixty-one, in reasonable health. Leaving on the ten o’clock boat. Taking the kettle.",
      },
    ],
  },
];

/* ——— Issues ——— */

export type Stock = "In stock" | "Last copies" | "Sold out";

export type Issue = {
  no: number;
  word: string;
  season: string;
  published: string;
  color: string;
  ink: string;
  image: string;
  pages: number;
  price: number;
  stock: Stock;
  summary: string;
  letter: string[];
  contents: {
    page: number;
    title: string;
    by: string;
    section: SectionSlug;
    slug?: string;
    dek?: string;
  }[];
};

export const issues: Issue[] = [
  {
    no: 31,
    word: "Thresholds",
    season: "Autumn 2026",
    published: "2026-09-17",
    color: "#c58b3c",
    ink: "#1c1a16",
    image: window,
    pages: 176,
    price: 22,
    stock: "In stock",
    summary:
      "Porches, locksmiths, a hand compositor and the last month of the allotment year: an issue about the places in between.",
    letter: [
      "Every issue of Monograph starts with a single word pinned above the desk. This autumn it was thresholds, and for three months we found them everywhere: in a printer’s spacing tin, at the gate of a city allotment, in the hour a locksmith spends deciding whether to open a door at all.",
      "What these pieces share is a respect for the in-between, the moment before something begins. It seemed the right word for an issue that arrives as the evenings draw in. Read it slowly. Leave it on the stairs. Come back to it.",
    ],
    contents: [
      {
        page: 12,
        title: "The long threshold",
        by: "elena-moss",
        section: "essays",
        slug: "the-long-threshold",
      },
      {
        page: 26,
        title: "Doors we were told not to open",
        by: "callum-reyes",
        section: "reportage",
        dek: "A week on call with the locksmiths of the old town, who open about forty doors a night and refuse roughly one.",
      },
      {
        page: 40,
        title: "The compositor’s hands",
        by: "theo-wells",
        section: "conversations",
        slug: "the-compositors-hands",
      },
      {
        page: 64,
        title: "Allotments in October",
        by: "ines-varga",
        section: "portfolio",
        slug: "allotments-in-october",
      },
      {
        page: 88,
        title: "Border towns",
        by: "mara-ellis",
        section: "reportage",
        dek: "Two towns, one river, a footbridge that was closed for nine years. What the people on either side kept for each other.",
      },
      {
        page: 112,
        title: "The waiting room",
        by: "sana-okafor",
        section: "fiction",
      },
      {
        page: 134,
        title: "A short history of the doorstep",
        by: "theo-wells",
        section: "essays",
      },
    ],
  },
  {
    no: 30,
    word: "Salt",
    season: "Summer 2026",
    published: "2026-06-18",
    color: "#46697a",
    ink: "#f4efe3",
    image: saltpans,
    pages: 168,
    price: 22,
    stock: "Last copies",
    summary:
      "Salt fields at dusk, a pickler’s cellar, unfinished portraits and a short story written in brine.",
    letter: [
      "Salt is the oldest preservative we have and, it turns out, one of the oldest jobs. This issue follows it from the coastal pans where it is still raked by hand to the cellars where it keeps a winter’s vegetables alive.",
      "It is also an issue about what we keep and what we let go: the unfinished painting, the tide line, the taste of the sea edited down to a flake.",
    ],
    contents: [
      { page: 8, title: "Brine", by: "sana-okafor", section: "fiction" },
      {
        page: 22,
        title: "White gold at dusk",
        by: "mara-ellis",
        section: "reportage",
        slug: "white-gold-at-dusk",
      },
      {
        page: 36,
        title: "Tears, sweat, the sea",
        by: "elena-moss",
        section: "essays",
      },
      {
        page: 58,
        title: "In praise of the unfinished",
        by: "theo-wells",
        section: "essays",
        slug: "in-praise-of-the-unfinished",
      },
      {
        page: 74,
        title: "The pickler",
        by: "theo-wells",
        section: "conversations",
      },
      { page: 96, title: "Shorelines", by: "ines-varga", section: "portfolio" },
      {
        page: 130,
        title: "What the tide leaves",
        by: "callum-reyes",
        section: "reportage",
      },
    ],
  },
  {
    no: 29,
    word: "Night Work",
    season: "Spring 2026",
    published: "2026-03-19",
    color: "#252b3d",
    ink: "#efe7d6",
    image: crossing,
    pages: 160,
    price: 22,
    stock: "Last copies",
    summary:
      "The last ferry, the bakers’ hours, a night nurse and a photographer who only works under sodium light.",
    letter: [
      "A city at night is a different city, kept running by people most of us never meet. For this issue our contributors stayed up with them: on the last ferry, in a bakery at three in the morning, on a hospital ward between the drug rounds.",
      "We printed it on a slightly warmer paper than usual, because you are likely to read some of it late, under a lamp.",
    ],
    contents: [
      {
        page: 10,
        title: "The bakers’ hours",
        by: "mara-ellis",
        section: "reportage",
      },
      {
        page: 30,
        title: "The last crossing of the night",
        by: "callum-reyes",
        section: "reportage",
        slug: "the-last-crossing",
      },
      { page: 48, title: "Lamplight", by: "elena-moss", section: "essays" },
      {
        page: 70,
        title: "Notes from a night nurse",
        by: "theo-wells",
        section: "conversations",
      },
      { page: 94, title: "Sodium", by: "ines-varga", section: "portfolio" },
      {
        page: 122,
        title: "The insomniac’s atlas",
        by: "sana-okafor",
        section: "fiction",
      },
    ],
  },
  {
    no: 28,
    word: "Borrowed Rooms",
    season: "Winter 2025",
    published: "2025-12-11",
    color: "#8c2b1f",
    ink: "#f4efe3",
    image: shelves,
    pages: 160,
    price: 22,
    stock: "Sold out",
    summary:
      "Bookshops as living rooms, the lives of house-sitters, and a sublet story told in notes left on a fridge.",
    letter: [
      "Most of us live, at least for a while, in rooms that belong to someone else. This issue is about those rooms: the sublet, the house-sit, the bookshop armchair, the archive reading room where you sign in and sign out.",
      "Print copies sold out in January. Every story is in the online archive for subscribers.",
    ],
    contents: [
      { page: 8, title: "Sublet", by: "sana-okafor", section: "fiction" },
      {
        page: 18,
        title: "A room of borrowed lives",
        by: "mara-ellis",
        section: "essays",
        slug: "a-room-of-borrowed-lives",
      },
      {
        page: 40,
        title: "The house-sitters",
        by: "callum-reyes",
        section: "reportage",
      },
      {
        page: 66,
        title: "Interiors, unpeopled",
        by: "ines-varga",
        section: "portfolio",
      },
      { page: 92, title: "Guest", by: "elena-moss", section: "essays" },
      {
        page: 120,
        title: "The archivist",
        by: "theo-wells",
        section: "conversations",
      },
    ],
  },
  {
    no: 27,
    word: "Weather",
    season: "Autumn 2025",
    published: "2025-09-18",
    color: "#6d7653",
    ink: "#f4efe3",
    image: storm,
    pages: 152,
    price: 22,
    stock: "Sold out",
    summary:
      "A lighthouse keeper’s last night, ninety days of rain and a forecaster who still reads the clouds by eye.",
    letter: [
      "We talk about the weather because it is the one thing we all share. This issue goes a little further than small talk: to a headland the night before its light is automated, a valley after ninety days of rain, a forecaster who keeps a barometer in her kitchen.",
      "Print copies sold out in November. The keeper’s story is free to read online.",
    ],
    contents: [
      { page: 10, title: "Forecast", by: "theo-wells", section: "essays" },
      {
        page: 30,
        title: "Ninety days of rain",
        by: "mara-ellis",
        section: "reportage",
      },
      {
        page: 54,
        title: "Cloud atlas of a small town",
        by: "ines-varga",
        section: "portfolio",
      },
      {
        page: 76,
        title: "The meteorologist",
        by: "elena-moss",
        section: "conversations",
      },
      {
        page: 88,
        title: "The keeper’s inventory",
        by: "sana-okafor",
        section: "fiction",
        slug: "the-keepers-inventory",
      },
    ],
  },
];

export const currentIssue = issues[0];
export const nextIssue = {
  no: 32,
  word: "Mending",
  season: "Winter 2026",
  ships: "10 December",
};

/* ——— Subscribe ——— */

export type PlanId = "print" | "digital" | "gift" | "single";

export type Plan = {
  id: PlanId;
  name: string;
  blurb: string;
  perks: string[];
  price: { 1: number; 2: number };
  ships: boolean;
};

export const plans: Plan[] = [
  {
    id: "print",
    name: "Print + digital",
    blurb: "Four printed issues a year, posted the week they come off press.",
    perks: [
      "176 pages on uncoated paper",
      "Free postage, sent in a card mailer",
      "Full online archive back to No. 1",
    ],
    price: { 1: 78, 2: 140 },
    ships: true,
  },
  {
    id: "digital",
    name: "Digital",
    blurb: "Every story online the morning the issue publishes.",
    perks: [
      "The reader with lamplight mode",
      "Full online archive back to No. 1",
      "The Sunday letter, with early pieces",
    ],
    price: { 1: 36, 2: 64 },
    ships: false,
  },
  {
    id: "gift",
    name: "Gift",
    blurb:
      "Print sent to someone else, starting with a letterpress card in their name.",
    perks: [
      "Card set by hand and posted first",
      "Choose the date it arrives",
      "Print and archive for the recipient",
    ],
    price: { 1: 84, 2: 150 },
    ships: true,
  },
];

export const singleIssue = { postage: 4 };

export const subscribeFaq = [
  {
    q: "When will my first issue arrive?",
    a: "Print subscriptions start with the current issue if you join before the next one goes to press, and it ships within three working days. After that, each issue is posted the week it is printed: mid-March, June, September and December.",
  },
  {
    q: "Can I pause or cancel?",
    a: "Yes. You can pause for one issue at a time or cancel before your renewal date from your account page, and we refund any issues not yet posted. There is no cancellation fee.",
  },
  {
    q: "Do you post abroad?",
    a: "We post to most countries. Postage is included in every subscription, wherever you live, and single issues carry the same flat $4 postage at home or abroad. We cover the difference.",
  },
  {
    q: "What does the digital subscription include?",
    a: "Every story from every issue, the reader with text sizing and lamplight mode, side notes, and the Sunday letter. Portfolios are shown at full resolution.",
  },
  {
    q: "Do you offer student or low-income rates?",
    a: "Digital is free for students and anyone who tells us they cannot afford it, no questions asked. Write to the subscriptions desk and we will set you up the same week.",
  },
];

/* ——— Page introductions ——— */

export const pageCopy = {
  stories:
    "Every piece we have published online, from the current issue back to No. 27. Print-only pieces live in the issues themselves.",
  issues: `Four a year since spring 2018, each built around one word. No. ${nextIssue.no}, ${nextIssue.word}, goes to press in November and ships on ${nextIssue.ships}. Nos. 1–26 are out of print; every story from them is in the subscriber archive.`,
  subscribe:
    "Monograph is paid for by its readers, not advertisers. Pick print, digital or a gift, and the length; you can pause or cancel whenever you like.",
  contributors:
    "The writers and photographers who fill these pages, issue after issue. We would rather work with a few people for a long time than with many people once.",
  pitch: {
    title: "Write or photograph for Monograph",
    text: "We pay $0.80 a word and a $450 day rate, on acceptance. Read the guidelines before you pitch; we answer every message within three weeks.",
  },
};

/* ——— Home ——— */

export const home = {
  title: "Thresholds",
  quote: {
    text: "Perfect is what a machine does. I want it considered, and I want you to be able to feel the pressure of the letters with your thumb.",
    who: "Agnes Rook, compositor",
    slug: "the-compositors-hands",
  },
  close: {
    title: "Four issues a year, on paper that takes ink well.",
    text: "Subscribe for print and the full archive, or read online from $36 a year. Every subscription pays contributors a fair rate and keeps the magazine free of advertising.",
  },
};

/* ——— About ——— */

export const about = {
  title: "A magazine that takes its time",
  intro:
    "Monograph is an independent quarterly founded in 2018 by Hanna Lowe and Theo Wells at a kitchen table above a print shop. Each issue is built around one word and printed on uncoated paper in an edition of 6,000. We carry no advertising. We are paid for by readers.",
  image: {
    src: readingRoom,
    alt: "A domed reading room seen from above, long desks radiating from a central counter",
  },
  principles: [
    {
      title: "One word per issue",
      text: "The word is chosen a year ahead and pinned above the desk. Every commission begins with it, and every piece is allowed to argue with it.",
    },
    {
      title: "Time on location",
      text: "Reporters stay at least five days. Photographers return every week for a season. We pay for the time, not just the words.",
    },
    {
      title: "Fair rates, paid on acceptance",
      text: "Writers are paid $0.80 a word and photographers a day rate of $450, within fourteen days of the piece being accepted, not printed.",
    },
    {
      title: "No advertising",
      text: "Monograph is paid for by 9,400 subscribers and around 140 independent shops. That is the whole business model, and we like it that way.",
    },
  ],
  masthead: [
    { role: "Editor", name: "Hanna Lowe" },
    { role: "Editor-at-large", name: "Theo Wells" },
    { role: "Managing editor", name: "June Okoro" },
    { role: "Art director", name: "Rafi Mendes" },
    { role: "Photography editor", name: "Ines Varga" },
    { role: "Sub-editor", name: "Pearl Hawthorne" },
    { role: "Subscriptions & stockists", name: "Aled Price" },
  ],
  submissions: [
    "We read pitches all year for Essays, Reportage and Conversations. Send three or four sentences on the idea, why you, and how long you would need on location, to the address below. We reply to every pitch within three weeks.",
    "Fiction is read twice a year, in January and July, for the issues of the following year. Stories should be under 4,000 words and unpublished.",
  ],
  stockists: [
    { name: "Paper Lantern Books", place: "Glasgow" },
    { name: "The Reading Room", place: "Bristol" },
    { name: "Harbour Street News", place: "Hobart" },
    { name: "Second Shelf", place: "Toronto" },
    { name: "Marginalia", place: "Porto" },
    { name: "Fold & Sons", place: "Melbourne" },
  ],
};

export const footer = {
  columns: [
    {
      title: "Read",
      links: [
        { to: "/issues/31", label: "This issue" },
        { to: "/issues", label: "All issues" },
        { to: "/stories", label: "All stories" },
        { to: "/contributors", label: "Contributors" },
      ],
    },
    {
      title: "Sections",
      links: sections.map((s) => ({
        to: "/sections/" + s.slug,
        label: s.name,
      })),
    },
    {
      title: "Magazine",
      links: [
        { to: "/subscribe", label: "Subscribe" },
        { to: "/subscribe?plan=gift", label: "Give a subscription" },
        { to: "/about", label: "About & masthead" },
        { to: "/about", label: "Submissions & stockists" },
      ],
    },
  ],
};

export const notFound = {
  title: "This page was cut at proof stage",
  text: "The story you were looking for has moved, or it was never in print. The current issue and the full archive are still where they should be.",
};
