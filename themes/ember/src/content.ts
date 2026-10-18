import heroOven from "./assets/hero-oven.jpg";
import ovenFire from "./assets/oven-fire.jpg";
import pizzaiolo from "./assets/pizzaiolo.jpg";
import firewood from "./assets/firewood.jpg";
import pizzaGreen from "./assets/pizza-green.jpg";
import pizzaSalami from "./assets/pizza-salami.jpg";
import pizzaWhite from "./assets/pizza-white.jpg";
import burrata from "./assets/burrata.jpg";
import focaccia from "./assets/focaccia.jpg";
import tiramisu from "./assets/tiramisu.jpg";
import pappardelle from "./assets/pappardelle.jpg";
import sole from "./assets/sole.jpg";
import chicken from "./assets/chicken.jpg";
import shakshuka from "./assets/shakshuka.jpg";
import benedict from "./assets/benedict.jpg";
import pancakes from "./assets/pancakes.jpg";
import eggsToast from "./assets/eggs-toast.jpg";
import spritz from "./assets/spritz.jpg";
import wineCandle from "./assets/wine-candle.jpg";
import diningRoom from "./assets/dining-room.jpg";

/* ------------------------------------------------------------ types */

export type Photo = { src: string; alt: string; w: number; h: number };
export type ServiceId = "dinner" | "brunch" | "drinks";
export type Diet = "V" | "VG" | "GF";
/** How a dish counts when the table planner suggests a balanced order. */
export type Course =
  "start" | "small" | "oven" | "large" | "side" | "sweet" | "drink";

export type Dish = {
  id: string;
  service: ServiceId;
  section: string;
  course: Course;
  name: string;
  price: number;
  desc: string;
  diet: Diet[];
  contains: string[];
  photo?: Photo;
  /** Longer kitchen notes for the dish page. */
  notes?: string[];
  from?: string;
  pairsWith?: string;
};

export type Service = {
  id: ServiceId;
  name: string;
  title: string;
  intro: string;
  when: string;
  sections: { title: string; note?: string }[];
};

/** [open, close] in 24h "HH:MM". */
export type Window = [string, string];
export type Day = {
  day: string;
  short: string;
  brunch?: Window;
  dinner?: Window;
};

export type Event = {
  id: string;
  title: string;
  kind: "Supper club" | "Class" | "Tasting" | "Music";
  date: string;
  start: string;
  end: string;
  price: number;
  seats: number;
  left: number;
  summary: string;
  body: string[];
  running: { time: string; what: string }[];
  photo: Photo;
};

export type Space = {
  id: string;
  name: string;
  seated: number;
  standing?: number;
  minSpend: number;
  desc: string;
};

export type SetMenu = {
  id: string;
  name: string;
  price: number;
  for: string;
  courses: string[];
};
export type Person = { name: string; role: string; bio: string };

/* ------------------------------------------------------------ brand */

export const brand = {
  name: "Ember",
  tagline:
    "A wood-fired kitchen on Alder Street. Supper six nights, brunch at weekends.",
  street: "214 Alder Street",
  area: "Northside",
  postcode: "NS 4021",
  phone: "+1 555 014 2271",
  phoneHref: "tel:+15550142271",
  email: "hello@ember.example",
  eventsEmail: "tables@ember.example",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  currency: "USD",
};

export const nav = [
  { to: "/menu/dinner", label: "Menus" },
  { to: "/events", label: "Events" },
  { to: "/private-dining", label: "Private dining" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
];

export const footerColumns = [
  {
    title: "Eat & drink",
    links: [
      { to: "/menu/dinner", label: "Dinner" },
      { to: "/menu/brunch", label: "Weekend brunch" },
      { to: "/menu/drinks", label: "Drinks" },
    ],
  },
  {
    title: "Book",
    links: [
      { to: "/reservations", label: "Reservations" },
      { to: "/private-dining", label: "Private dining" },
      { to: "/events", label: "Events" },
    ],
  },
  {
    title: "Ember",
    links: [
      { to: "/about", label: "Our story" },
      { to: "/visit", label: "Hours & directions" },
      { to: "/", label: "Home" },
    ],
  },
];

export const newsletter = {
  title: "The Sunday letter",
  text: "One short email a week: what the farm sent, which fish came in, and the supper clubs before they fill.",
};

/** Sunday-first, so week[date.getDay()] is today. */
export const week: Day[] = [
  {
    day: "Sunday",
    short: "Sun",
    brunch: ["10:00", "15:00"],
    dinner: ["17:30", "21:30"],
  },
  { day: "Monday", short: "Mon" },
  { day: "Tuesday", short: "Tue", dinner: ["17:30", "22:00"] },
  { day: "Wednesday", short: "Wed", dinner: ["17:30", "22:00"] },
  { day: "Thursday", short: "Thu", dinner: ["17:30", "22:00"] },
  { day: "Friday", short: "Fri", dinner: ["17:30", "23:00"] },
  {
    day: "Saturday",
    short: "Sat",
    brunch: ["10:00", "15:00"],
    dinner: ["17:30", "23:00"],
  },
];

/* ------------------------------------------------------------ menus */

export const services: Service[] = [
  {
    id: "dinner",
    name: "Dinner",
    title: "Dinner from the fire",
    intro:
      "Everything on the dinner menu passes through one oak-fired oven. Order a few small plates, a pie or two and something bigger to share; plates arrive when they are ready, not all at once.",
    when: "Tuesday to Sunday from 5:30 pm",
    sections: [
      { title: "To start", note: "While you decide." },
      {
        title: "Small plates",
        note: "Two or three per couple is about right.",
      },
      {
        title: "From the oven",
        note: "Twelve-inch pies, 72-hour dough, 90 seconds at 850°F.",
      },
      { title: "Bigger plates", note: "Made to share between two." },
      { title: "On the side" },
      { title: "Sweet" },
    ],
  },
  {
    id: "brunch",
    name: "Brunch",
    title: "Weekend brunch",
    intro:
      "Saturdays and Sundays the oven is lit at seven, so the bread is warm and the shakshuka has a crust. Tables for brunch are held for 90 minutes; walk-ins welcome at the counter.",
    when: "Saturday and Sunday, 10 am to 3 pm",
    sections: [
      { title: "Something small", note: "From the pastry bench." },
      { title: "Eggs & plates" },
      { title: "From the oven" },
      { title: "On the side" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    title: "Drinks & the bar",
    intro:
      "A short list we drink ourselves: low-intervention wine by the glass, three cocktails that suit a wood fire, beer from two streets away and proper alcohol-free options.",
    when: "Bar opens 5 pm, Tuesday to Sunday",
    sections: [
      { title: "Cocktails" },
      {
        title: "Wine by the glass",
        note: "Bottles from $42 — ask for the list.",
      },
      { title: "Beer & cider" },
      { title: "Without alcohol" },
    ],
  },
];

const p = (src: string, alt: string, w: number, h: number): Photo => ({
  src,
  alt,
  w,
  h,
});

export const photos = {
  hero: p(
    heroOven,
    "A blistered pizza resting on the oven floor in front of glowing oak embers",
    1600,
    725,
  ),
  fire: p(
    ovenFire,
    "Flames curling across the dome of the brick oven before service",
    1600,
    1066,
  ),
  pizzaiolo: p(
    pizzaiolo,
    "A cook in a white cap sliding a pizza into the brick oven on a long peel",
    1400,
    1196,
  ),
  firewood: p(
    firewood,
    "Split oak logs stacked and drying for the oven",
    1400,
    932,
  ),
  dining: p(
    diningRoom,
    "Plates, glasses and candles along a busy dinner table",
    1600,
    1066,
  ),
  burrata: p(
    burrata,
    "Burrata on peas and pea shoots with a spoon of herb oil",
    1400,
    1400,
  ),
};

export const dishes: Dish[] = [
  /* dinner · to start */
  {
    id: "house-focaccia",
    service: "dinner",
    section: "To start",
    course: "start",
    name: "House focaccia",
    price: 7,
    desc: "Baked at four, torn at the table. Ligurian olive oil and flaked salt.",
    diet: ["V", "VG"],
    contains: ["Gluten"],
    photo: p(
      focaccia,
      "Thick squares of golden focaccia piled in a bread basket",
      1400,
      1050,
    ),
    notes: [
      "The dough is mixed at nine in the morning with a spoon of yesterday's batch, folded four times and left in the walk-in until three. It goes into the oven while it is still climbing towards full heat, which is why the base is crisp and the top stays soft.",
      "We pour a little more oil than seems polite. Ask for another basket — it is on the house for a second round.",
    ],
    from: "Flour from Stonecross Mill, olive oil from a cooperative near Imperia.",
    pairsWith: "vermentino",
  },
  {
    id: "warm-olives",
    service: "dinner",
    section: "To start",
    course: "start",
    name: "Warm olives",
    price: 6,
    desc: "Castelvetrano and Kalamata, orange peel, fennel seed, warmed at the oven mouth.",
    diet: ["V", "VG", "GF"],
    contains: [],
    pairsWith: "ember-spritz",
  },
  {
    id: "anchovy-toast",
    service: "dinner",
    section: "To start",
    course: "start",
    name: "Anchovy butter toast",
    price: 9,
    desc: "Cantabrian anchovies, cultured butter and pickled shallot on oven toast.",
    diet: [],
    contains: ["Fish", "Dairy", "Gluten"],
    pairsWith: "vermentino",
  },
  /* dinner · small plates */
  {
    id: "burrata",
    service: "dinner",
    section: "Small plates",
    course: "small",
    name: "Burrata & the season",
    price: 16,
    desc: "Peas, mint and broad beans in spring; tomatoes and basil oil by July. Ask what the farm sent.",
    diet: ["V", "GF"],
    contains: ["Dairy"],
    photo: p(
      burrata,
      "A round of burrata on bright peas and shoots, topped with green herb oil",
      1400,
      1400,
    ),
    notes: [
      "Coldwater Dairy makes our burrata on Tuesday and Friday mornings and it is on the plate by the evening. We never hold it past the next day; when it is gone, it is gone.",
      "What sits under it changes with Fernhill Farm's Monday text. This week: sweet peas, pea shoots and a herb oil made from the tops we would otherwise compost.",
    ],
    from: "Burrata from Coldwater Dairy, vegetables from Fernhill Farm.",
    pairsWith: "vermentino",
  },
  {
    id: "crispy-potatoes",
    service: "dinner",
    section: "Small plates",
    course: "small",
    name: "Crispy little potatoes",
    price: 9,
    desc: "Twice-cooked, rosemary salt and roasted garlic aioli.",
    diet: ["V", "GF"],
    contains: ["Egg"],
    pairsWith: "alder-pils",
  },
  {
    id: "hispi-cabbage",
    service: "dinner",
    section: "Small plates",
    course: "small",
    name: "Charred hispi cabbage",
    price: 13,
    desc: "Blistered at the oven mouth, anchovy and brown butter, toasted breadcrumbs.",
    diet: [],
    contains: ["Fish", "Dairy", "Gluten"],
    pairsWith: "ribolla",
  },
  {
    id: "ember-beets",
    service: "dinner",
    section: "Small plates",
    course: "small",
    name: "Ember-roasted beets",
    price: 12,
    desc: "Buried in the coals overnight, labneh, toasted walnut and dill.",
    diet: ["V", "GF"],
    contains: ["Dairy", "Nuts"],
    pairsWith: "ribolla",
  },
  {
    id: "oven-squid",
    service: "dinner",
    section: "Small plates",
    course: "small",
    name: "Oven squid",
    price: 15,
    desc: "Chilli, lemon, parsley and a frankly irresponsible amount of garlic.",
    diet: ["GF"],
    contains: ["Molluscs"],
    pairsWith: "vermentino",
  },
  /* dinner · oven */
  {
    id: "margherita",
    service: "dinner",
    section: "From the oven",
    course: "oven",
    name: "The good margherita",
    price: 17,
    desc: "San Marzano tomato, fior di latte, basil and a ribbon of olive oil.",
    diet: ["V"],
    contains: ["Gluten", "Dairy"],
    notes: [
      "The pie we judge every new cook by. Tomatoes crushed by hand, mozzarella torn rather than sliced, basil on before the oven and again after.",
    ],
    pairsWith: "nero-davola",
  },
  {
    id: "hot-honey-salami",
    service: "dinner",
    section: "From the oven",
    course: "oven",
    name: "Hot honey & salami",
    price: 22,
    desc: "Spicy salami, smoked mozzarella, wildflower honey with Calabrian chilli, basil.",
    diet: [],
    contains: ["Gluten", "Dairy"],
    photo: p(
      pizzaSalami,
      "A charred pizza of curled salami cups and basil being finished by hand",
      1600,
      635,
    ),
    notes: [
      "Our most ordered pie, and the one regulars swear they are not going to order this time. The salami cups in the heat and holds its oil; the honey goes on after, so it stays bright instead of burning.",
      "We infuse the honey with dried Calabrian chilli for a week. Ask for an extra pot if you are a crust person.",
    ],
    from: "Salami from Halvorsen's on Pike Lane, honey from hives at Fernhill Farm.",
    pairsWith: "nero-davola",
  },
  {
    id: "a-little-green",
    service: "dinner",
    section: "From the oven",
    course: "oven",
    name: "A little green",
    price: 20,
    desc: "Basil and pumpkin-seed pesto, courgette, ricotta, lemon zest and torn mint.",
    diet: ["V"],
    contains: ["Gluten", "Dairy"],
    photo: p(
      pizzaGreen,
      "Hands scattering herbs over a pesto and ricotta pizza before it goes in the oven",
      1600,
      1013,
    ),
    notes: [
      "Our pesto uses pumpkin seeds instead of pine nuts, so the pie is nut-free. The courgette is shaved raw and only meets the heat for the last thirty seconds.",
    ],
    from: "Ricotta from Coldwater Dairy, courgettes and herbs from Fernhill Farm.",
    pairsWith: "vermentino",
  },
  {
    id: "white-pie",
    service: "dinner",
    section: "From the oven",
    course: "oven",
    name: "White pie",
    price: 21,
    desc: "Fior di latte, taleggio, roasted cherry tomatoes, rosemary and garlic oil.",
    diet: ["V"],
    contains: ["Gluten", "Dairy"],
    photo: p(
      pizzaWhite,
      "A cheese-laden white pizza cut into slices beside rosemary and cherry tomatoes",
      1400,
      932,
    ),
    notes: [
      "No tomato sauce, so the dough and the cheese do the talking. Taleggio melts into the crumb and the rosemary crisps on the oven floor.",
    ],
    pairsWith: "ribolla",
  },
  {
    id: "mushrooms-after-dark",
    service: "dinner",
    section: "From the oven",
    course: "oven",
    name: "Mushrooms after dark",
    price: 21,
    desc: "Oven-roasted mushrooms, fontina, thyme, black pepper and a soft egg yolk.",
    diet: ["V"],
    contains: ["Gluten", "Dairy", "Egg"],
    pairsWith: "nero-davola",
  },
  /* dinner · bigger plates */
  {
    id: "whole-lemon-sole",
    service: "dinner",
    section: "Bigger plates",
    course: "large",
    name: "Whole lemon sole",
    price: 34,
    desc: "Roasted on the bone in the oven, brown butter, capers, samphire and lemon.",
    diet: ["GF"],
    contains: ["Fish", "Dairy"],
    photo: p(
      sole,
      "A whole roasted lemon sole under samphire and brown butter, with a wedge of lemon",
      1300,
      975,
    ),
    notes: [
      "Pier 9 call us at six each morning with what the boats landed; if lemon sole is not good that day, the plate becomes whatever flat fish is. It goes into a cast-iron pan near the fire for about eight minutes.",
      "We fillet it at the table if you would like — just ask. Otherwise, the bones lift away in one piece.",
    ],
    from: "Day-boat fish from Pier 9 Fishmongers.",
    pairsWith: "vermentino",
  },
  {
    id: "half-chicken",
    service: "dinner",
    section: "Bigger plates",
    course: "large",
    name: "Half a chicken from the fire",
    price: 29,
    desc: "Brined for a day, roasted over oak; ember-roasted sweet potato and salsa verde.",
    diet: ["GF"],
    contains: ["Fish"],
    photo: p(
      chicken,
      "A roasted chicken leg with charred sweet potato and greens on a white plate",
      1400,
      1050,
    ),
    notes: [
      "A slow-grown bird from Fernhill, brined overnight with bay and lemon, then hung by the oven for a crackling skin. The salsa verde carries a little anchovy, which is why fish appears in the allergens.",
    ],
    from: "Chicken and sweet potatoes from Fernhill Farm.",
    pairsWith: "nero-davola",
  },
  {
    id: "pappardelle",
    service: "dinner",
    section: "Bigger plates",
    course: "large",
    name: "Pappardelle, slow lamb ragù",
    price: 26,
    desc: "Hand-cut ribbons, lamb shoulder braised in the cooling oven overnight, pecorino.",
    diet: [],
    contains: ["Gluten", "Egg", "Dairy", "Celery"],
    photo: p(
      pappardelle,
      "A shallow white bowl of ribbon pasta with a meaty ragù and parsley",
      1600,
      1068,
    ),
    notes: [
      "When service ends the oven is still around 400°F. The lamb goes in a covered pot and comes out at breakfast, falling apart. That leftover heat is free, so this is the best-value plate we make.",
    ],
    from: "Lamb from Greyhill Farm, eggs from Fernhill.",
    pairsWith: "nero-davola",
  },
  /* dinner · sides */
  {
    id: "green-salad",
    service: "dinner",
    section: "On the side",
    course: "side",
    name: "Big green salad",
    price: 9,
    desc: "Little gem, soft herbs and a sharp lemon dressing.",
    diet: ["V", "VG", "GF"],
    contains: [],
  },
  {
    id: "oven-beans",
    service: "dinner",
    section: "On the side",
    course: "side",
    name: "Oven beans",
    price: 8,
    desc: "Cannellini, tomato and sage, baked until the top catches.",
    diet: ["V", "VG", "GF"],
    contains: [],
  },
  /* dinner · sweet */
  {
    id: "tiramisu",
    service: "dinner",
    section: "Sweet",
    course: "sweet",
    name: "One more tiramisu",
    price: 10,
    desc: "Espresso-soaked savoiardi, mascarpone, bitter cocoa. Two spoons?",
    diet: ["V"],
    contains: ["Gluten", "Dairy", "Egg"],
    photo: p(
      tiramisu,
      "A generous slab of tiramisu dusted with cocoa on a plate on a marble table",
      1400,
      1054,
    ),
    notes: [
      "Made each morning by Theo in a deep tray and cut at service. We use a dark-roast espresso from Lantern Coffee two doors down and a splash of marsala.",
    ],
    pairsWith: "garden-martini",
  },
  {
    id: "olive-oil-cake",
    service: "dinner",
    section: "Sweet",
    course: "sweet",
    name: "Olive oil cake",
    price: 10,
    desc: "Citrus curd, cultured cream and a pinch of sea salt.",
    diet: ["V"],
    contains: ["Gluten", "Dairy", "Egg"],
  },
  {
    id: "affogato",
    service: "dinner",
    section: "Sweet",
    course: "sweet",
    name: "Affogato",
    price: 7,
    desc: "Vanilla gelato drowned in a shot of espresso.",
    diet: ["V", "GF"],
    contains: ["Dairy", "Egg"],
  },
  /* brunch */
  {
    id: "cinnamon-knots",
    service: "brunch",
    section: "Something small",
    course: "start",
    name: "Cinnamon knots",
    price: 5,
    desc: "Laminated focaccia dough, brown sugar and cardamom, baked at the oven's edge.",
    diet: ["V"],
    contains: ["Gluten", "Dairy"],
  },
  {
    id: "oven-granola",
    service: "brunch",
    section: "Something small",
    course: "small",
    name: "Oven granola",
    price: 10,
    desc: "Oats and seeds toasted in the cooling oven, thick yoghurt, poached rhubarb.",
    diet: ["V"],
    contains: ["Dairy", "Gluten", "Sesame"],
  },
  {
    id: "oven-shakshuka",
    service: "brunch",
    section: "Eggs & plates",
    course: "large",
    name: "Oven shakshuka",
    price: 17,
    desc: "Three eggs baked in spiced tomato and peppers, feta, coriander, grilled bread.",
    diet: ["V"],
    contains: ["Egg", "Dairy", "Gluten"],
    photo: p(
      shakshuka,
      "A cast-iron pan of baked eggs in red pepper sauce beside a slice of bread",
      1400,
      929,
    ),
    notes: [
      "The pan goes straight onto the oven floor, so the sauce bubbles around the edges and the whites set from below. Ask for it hot and we add a spoon of harissa from the pass.",
    ],
    pairsWith: "rhubarb-soda",
  },
  {
    id: "eggs-benedict",
    service: "brunch",
    section: "Eggs & plates",
    course: "large",
    name: "Eggs Benedict",
    price: 18,
    desc: "Oven muffins, pulled ham hock, two poached eggs, brown-butter hollandaise.",
    diet: [],
    contains: ["Egg", "Dairy", "Gluten"],
    photo: p(
      benedict,
      "Two eggs Benedict with glossy hollandaise beside dressed leaves and a glass of juice",
      1400,
      932,
    ),
    pairsWith: "ember-spritz",
  },
  {
    id: "eggs-in-purgatory",
    service: "brunch",
    section: "Eggs & plates",
    course: "large",
    name: "Eggs in purgatory on sourdough",
    price: 16,
    desc: "Soft-poached eggs on charred sourdough with chilli tomato and parsley.",
    diet: ["V"],
    contains: ["Egg", "Gluten"],
    photo: p(
      eggsToast,
      "Poached eggs on toasted sourdough in a pool of chilli tomato sauce",
      1400,
      1054,
    ),
    pairsWith: "rhubarb-soda",
  },
  {
    id: "pancake-stack",
    service: "brunch",
    section: "Eggs & plates",
    course: "large",
    name: "Buttermilk pancake stack",
    price: 14,
    desc: "Brown butter, whipped ricotta, seasonal fruit and dark maple.",
    diet: ["V"],
    contains: ["Gluten", "Dairy", "Egg"],
    photo: p(
      pancakes,
      "A tall stack of thin buttermilk pancakes held on a plate",
      1050,
      1400,
    ),
  },
  {
    id: "morning-pie",
    service: "brunch",
    section: "From the oven",
    course: "oven",
    name: "The morning pie",
    price: 19,
    desc: "Smoked bacon, crisp potato, fontina and an egg cracked in at the oven mouth.",
    diet: [],
    contains: ["Gluten", "Dairy", "Egg"],
  },
  {
    id: "thick-bacon",
    service: "brunch",
    section: "On the side",
    course: "side",
    name: "Thick-cut bacon",
    price: 6,
    desc: "Two rashers, dry-cured and smoked by Halvorsen's.",
    diet: ["GF"],
    contains: [],
  },
  {
    id: "brunch-potatoes",
    service: "brunch",
    section: "On the side",
    course: "side",
    name: "Crispy potatoes",
    price: 7,
    desc: "Rosemary salt and a spoon of aioli.",
    diet: ["V", "GF"],
    contains: ["Egg"],
  },
  /* drinks */
  {
    id: "ember-spritz",
    service: "drinks",
    section: "Cocktails",
    course: "drink",
    name: "Ember spritz",
    price: 13,
    desc: "Bitter orange aperitivo, blood orange, prosecco and soda over a big cube.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
    photo: p(
      spritz,
      "A pink-orange spritz in a stemmed glass with a slice of orange on the bar",
      1400,
      1076,
    ),
    notes: [
      "Built in the glass so the bubbles survive. We cut our aperitivo with a little blood orange juice in winter and pink grapefruit in summer.",
    ],
  },
  {
    id: "smoked-negroni",
    service: "drinks",
    section: "Cocktails",
    course: "drink",
    name: "Oven-smoked negroni",
    price: 15,
    desc: "Gin, sweet vermouth and bitter, in a glass rinsed with oak smoke from the oven.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
  },
  {
    id: "garden-martini",
    service: "drinks",
    section: "Cocktails",
    course: "drink",
    name: "Garden martini",
    price: 14,
    desc: "Vodka shaken with Fernhill's cucumber, dill and a drop of brine.",
    diet: ["VG", "GF"],
    contains: [],
  },
  {
    id: "nero-davola",
    service: "drinks",
    section: "Wine by the glass",
    course: "drink",
    name: "Nero d'Avola, Sicily",
    price: 12,
    desc: "Dark cherry and a little smoke. Our house red, poured a touch cool.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
    photo: p(
      wineCandle,
      "A glass of red wine on a candlelit table",
      1066,
      1600,
    ),
    notes: [
      "From a family estate on the south coast, farmed organically and fermented with wild yeast. It drinks beautifully a degree or two below room temperature, so that is how we serve it.",
    ],
  },
  {
    id: "vermentino",
    service: "drinks",
    section: "Wine by the glass",
    course: "drink",
    name: "Vermentino, Liguria",
    price: 12,
    desc: "Salty, lemony and herbal. Made for anything from the sea.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
  },
  {
    id: "ribolla",
    service: "drinks",
    section: "Wine by the glass",
    course: "drink",
    name: "Ribolla Gialla, skin contact",
    price: 14,
    desc: "An amber wine with apricot, black tea and grip.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
  },
  {
    id: "alder-pils",
    service: "drinks",
    section: "Beer & cider",
    course: "drink",
    name: "Alder Street pils",
    price: 8,
    desc: "Brewed for us by Northside Brewing, two streets away. Crisp and bitter.",
    diet: ["VG"],
    contains: ["Gluten"],
  },
  {
    id: "dry-cider",
    service: "drinks",
    section: "Beer & cider",
    course: "drink",
    name: "Bone-dry apple cider",
    price: 9,
    desc: "Wild-fermented from orchard windfalls.",
    diet: ["VG", "GF"],
    contains: ["Sulphites"],
  },
  {
    id: "rhubarb-soda",
    service: "drinks",
    section: "Without alcohol",
    course: "drink",
    name: "Rhubarb & ginger soda",
    price: 6,
    desc: "House cordial, fresh ginger, sparkling water.",
    diet: ["VG", "GF"],
    contains: [],
  },
  {
    id: "zero-spritz",
    service: "drinks",
    section: "Without alcohol",
    course: "drink",
    name: "Bitter citrus spritz, 0%",
    price: 9,
    desc: "Alcohol-free aperitivo, grapefruit and tonic. All of the bitterness, none of the morning.",
    diet: ["VG", "GF"],
    contains: [],
  },
];

export const dietLabels: Record<Diet, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
};

export const courseLabels: Record<Course, string> = {
  start: "Starters",
  small: "Small plates",
  oven: "Pies from the oven",
  large: "Bigger plates",
  side: "Sides",
  sweet: "Sweet",
  drink: "Drinks",
};

export const allergyNote =
  "Tell your server about any allergy before ordering. Our kitchen handles nuts, gluten and shellfish, so we cannot promise any dish is free of traces.";

/* ------------------------------------------------------------ home */

export const home = {
  title: "Wood-fired, every night on Alder Street.",
  lede: "Ember is a forty-seat neighbourhood restaurant built around one oak-fired oven. Blistered pies, things from the coals, natural wine, and a table that always has room for one more.",
  tonight: ["hot-honey-salami", "burrata", "whole-lemon-sole", "tiramisu"],
  oven: {
    title: "One oven does almost everything.",
    body: [
      "The oven was built by hand from Neapolitan brick in the spring we opened. It is lit at two each afternoon with kiln-dried oak and beech, and by six the floor sits at 850°F.",
      "Pies take ninety seconds. The fish goes in a cast-iron pan near the flame. When service ends, the falling heat braises tomorrow's lamb and toasts the morning granola. Nothing about that fire is wasted.",
    ],
  },
  spotlight: {
    dish: "whole-lemon-sole",
    title: "The fish goes in whole.",
    body: "Pier 9 calls at six with what the boats landed. By seven it is on the bone, in a hot iron pan, at the back of the oven. Brown butter, capers, samphire. Share it, or don't.",
  },
  planner: {
    title: "Plan the table before you sit down.",
    body: "Tell us how many of you are coming and add dishes from any menu. The table planner suggests a balanced spread, keeps a running total per head, and can travel with your booking so the kitchen knows what to fire first.",
  },
  privateDining: {
    title: "The Larder table, for twelve.",
    body: "A long oak table behind the pass, closest to the fire. Birthdays, rehearsal dinners, the team you actually like. Set feasts from $68 a head.",
  },
  regulars: [
    {
      quote:
        "We come every second Thursday. They know I'll order the beets and they still let me pretend to read the menu.",
      who: "Hana, two blocks away",
    },
    {
      quote:
        "The hot honey pie is a problem in my life. A delicious problem with a crust that crackles.",
      who: "Omar, Tuesday regular",
    },
    {
      quote:
        "Brought my parents for their fortieth in the Larder. Dev had a bottle from their wedding year waiting.",
      who: "Lucía, booked the Larder",
    },
  ],
  close: {
    title: "Pull up a chair.",
    body: "Tables open thirty days ahead at noon. We keep the counter by the oven for walk-ins every night.",
  },
};

/* ------------------------------------------------------------ events */

export const events: Event[] = [
  {
    id: "whole-fish-supper",
    title: "Whole-fish supper",
    kind: "Supper club",
    date: "2026-10-29",
    start: "19:00",
    end: "22:00",
    price: 75,
    seats: 24,
    left: 6,
    summary:
      "Five courses built around one big catch from Pier 9, cooked whole in the oven and carved at the long table.",
    body: [
      "Once a month we close the dining room to walk-ins and cook a single menu for one long table. This October it is the sea: whatever the day boats bring in on Thursday morning, roasted whole and served family-style.",
      "Expect crudo to start, a fish-bone broth, a whole roasted turbot or bass with brown butter and fire-charred greens, and a lemon olive oil cake to finish. A wine pairing from Dev is available on the night for $38.",
    ],
    running: [
      { time: "7:00 pm", what: "Spritz and oysters at the bar" },
      { time: "7:30 pm", what: "Seated at the long table; crudo and broth" },
      { time: "8:30 pm", what: "The whole fish comes out of the oven" },
      { time: "9:30 pm", what: "Cake, coffee, and a little amaro" },
    ],
    photo: p(
      sole,
      "A whole roasted flat fish under samphire and brown butter",
      1300,
      975,
    ),
  },
  {
    id: "pizza-school",
    title: "Pizza school: dough to oven",
    kind: "Class",
    date: "2026-11-07",
    start: "14:00",
    end: "17:00",
    price: 65,
    seats: 10,
    left: 3,
    summary:
      "Three hours with Ines at the pizza bench. Mix, stretch and fire your own pies, and take home a ball of our dough.",
    body: [
      "Ines Calloway runs our oven and has stretched somewhere north of eighty thousand pies. She will take ten of you through the whole life of the dough: mixing, folding, the 72-hour cold rise, and the stretch that keeps the air in the crust.",
      "Everyone launches three pies into the oven themselves. Lunch is what you make, with a glass of something. Aprons and recipe cards provided; wear closed shoes.",
    ],
    running: [
      { time: "2:00 pm", what: "Coffee, then flour and water" },
      { time: "2:45 pm", what: "Shaping and stretching at the bench" },
      { time: "3:30 pm", what: "Your turn at the oven" },
      { time: "4:15 pm", what: "Eat what you made" },
    ],
    photo: p(
      pizzaGreen,
      "Hands scattering herbs over a pesto pizza on the bench",
      1600,
      1013,
    ),
  },
  {
    id: "skin-contact-night",
    title: "Skin contact: an orange wine night",
    kind: "Tasting",
    date: "2026-11-11",
    start: "18:30",
    end: "20:30",
    price: 45,
    seats: 20,
    left: 11,
    summary:
      "Six amber wines from four countries, poured by Dev, with small plates from the oven between glasses.",
    body: [
      "Orange wine is white wine made like red: the grapes sit on their skins, which gives colour, texture and a little tannin. It is also the best thing to drink with a wood oven.",
      "Dev will pour six of his favourites, from a Georgian qvevri wine to a light Slovenian ribolla, and explain why each tastes the way it does. Small plates between pours are included.",
    ],
    running: [
      { time: "6:30 pm", what: "First pour and focaccia" },
      { time: "7:00 pm", what: "Four wines, four small plates" },
      { time: "8:00 pm", what: "The last two glasses, and questions" },
    ],
    photo: p(
      wineCandle,
      "A glass of wine glowing on a candlelit table",
      1066,
      1600,
    ),
  },
  {
    id: "kettle-trio-brunch",
    title: "Sunday brunch with the Kettle Trio",
    kind: "Music",
    date: "2026-11-15",
    start: "11:00",
    end: "14:00",
    price: 0,
    seats: 40,
    left: 14,
    summary:
      "Brushed drums, double bass and a very small piano by the window. No ticket — just book a brunch table.",
    body: [
      "The Kettle Trio play standards and the odd surprise across three easy sets. There is no cover charge and the menu is our usual weekend brunch.",
      "Tables near the band go first, so book ahead if you care where you sit. Holding seats here reserves a brunch table for your party.",
    ],
    running: [
      { time: "11:00 am", what: "First set" },
      { time: "12:00 pm", what: "Second set" },
      { time: "1:00 pm", what: "Last set and requests" },
    ],
    photo: p(
      shakshuka,
      "A cast-iron pan of baked eggs on a dark table",
      1400,
      929,
    ),
  },
  {
    id: "harvest-table",
    title: "The harvest table with Fernhill Farm",
    kind: "Supper club",
    date: "2026-11-22",
    start: "18:00",
    end: "21:30",
    price: 85,
    seats: 24,
    left: 0,
    summary:
      "Our yearly thank-you to the farm that grows half our menu. Six courses from the last of the autumn beds.",
    body: [
      "Fernhill Farm's Ruth and Sam join us for a long-table supper cooked entirely from what is left in their fields in late November: squashes, chicories, roots and the first of the winter brassicas.",
      "Ruth will talk a little between courses about what a year on a small farm actually looks like. This one sells out every year; join the waiting list and we will write if seats open up.",
    ],
    running: [
      { time: "6:00 pm", what: "Cider from the farm's own orchard" },
      { time: "6:30 pm", what: "Six courses at the long table" },
      { time: "9:00 pm", what: "Pie, cheese and a few words from the farm" },
    ],
    photo: p(burrata, "Burrata on peas and shoots from the farm", 1400, 1400),
  },
  {
    id: "seven-fishes",
    title: "Feast of the seven fishes",
    kind: "Supper club",
    date: "2026-12-17",
    start: "19:00",
    end: "22:30",
    price: 95,
    seats: 36,
    left: 22,
    summary:
      "Our winter tradition: seven seafood courses, three nights before the holiday rush, for the whole dining room.",
    body: [
      "Fried smelts, clams in the oven, salt cod on toast, squid ink pappardelle and a whole baked bream are all on the way to the seventh fish. We take over the whole restaurant and sit everyone at shared tables.",
      "Vegetarian guests are welcome with a parallel menu from the garden; let us know when you book.",
    ],
    running: [
      { time: "7:00 pm", what: "Prosecco and fried smelts" },
      { time: "7:30 pm", what: "Courses one to four" },
      { time: "9:00 pm", what: "The whole bream, then dessert" },
    ],
    photo: p(
      pappardelle,
      "A bowl of ribbon pasta on a dark wooden table",
      1600,
      1068,
    ),
  },
];

export const eventsPage = {
  title: "Supper clubs, classes & long tables",
  intro:
    "A few times a month the oven does something other than dinner. Seats are limited and held for 48 hours while you pay at the door, so hold yours here first.",
};

/* ------------------------------------------------------------ private dining */

export const privateDining = {
  title: "Private dining at Ember",
  intro:
    "From twelve friends around the Larder table to sixty for a party that takes over the whole house, we cook a feast from the fire and look after the rest.",
  spaces: [
    {
      id: "larder",
      name: "The Larder table",
      seated: 12,
      minSpend: 900,
      desc: "One long oak table behind the pass, between the oven and the walk-in. Semi-private: you hear the kitchen, nobody hears you.",
    },
    {
      id: "front-room",
      name: "The front room",
      seated: 28,
      standing: 40,
      minSpend: 2400,
      desc: "The window half of the dining room behind a linen curtain, with its own entrance from Alder Street. Our pick for rehearsal dinners.",
    },
    {
      id: "whole-house",
      name: "The whole house",
      seated: 48,
      standing: 70,
      minSpend: 5200,
      desc: "Everything, including the bar and the counter seats around the oven. Sunday and Monday evenings only.",
    },
  ] satisfies Space[],
  menus: [
    {
      id: "feast",
      name: "Feast from the fire",
      price: 68,
      for: "Our most-booked menu",
      courses: [
        "Focaccia and warm olives",
        "Three small plates for the table",
        "Two pies from the oven",
        "Half chickens and the day's fish",
        "Tiramisu and olive oil cake",
      ],
    },
    {
      id: "long-table",
      name: "The long table",
      price: 85,
      for: "Celebrations and milestones",
      courses: [
        "Oysters and spritz on arrival",
        "Burrata and the season",
        "Pappardelle, slow lamb ragù",
        "Whole roasted fish, carved at the table",
        "A cake of your choosing from Theo",
      ],
    },
    {
      id: "brunch-party",
      name: "Brunch party",
      price: 42,
      for: "Saturday or Sunday, 10 am – 1 pm",
      courses: [
        "Cinnamon knots and granola",
        "Shakshuka pans for the table",
        "The morning pie",
        "Pancake stacks to finish",
      ],
    },
  ] satisfies SetMenu[],
  policies: [
    "A deposit of 20% holds your date; it comes off the final bill.",
    "Final numbers seven days ahead; we charge for confirmed guests.",
    "A 12.5% service charge is added for parties of eight or more and goes to the whole team.",
    "Bring your own cake for a $3 plating fee, or let Theo make one.",
  ],
};

/* ------------------------------------------------------------ about */

export const about = {
  title: "A small restaurant with one big fire.",
  intro:
    "Ember opened in a former bicycle repair shop on Alder Street in 2019. Marisol had cooked in other people's kitchens for fifteen years; Dev had poured wine in most of them. They wanted somewhere their own street would come on a Tuesday.",
  story: [
    "The first thing built was the oven. A mason from the old country spent eleven days laying its dome by hand while the rest of the room was still bare concrete, and everything else on the menu followed from what that oven does well.",
    "We buy from people we can visit. Half of what you eat grows at Fernhill Farm, forty minutes north. The dairy is eighteen miles away. The fish comes from Pier 9, who have been in the same shed on the harbour since 1978. The wood is cut from managed woodland and dried for two years before it ever reaches the fire.",
    "We pay our team a living wage, close on Mondays so everyone gets a proper weekend, and share every cent of service charge across the kitchen and the floor.",
  ],
  team: [
    {
      name: "Marisol Vance",
      role: "Chef & co-owner",
      bio: "Cooked through restaurants in three cities before deciding the best kitchen is one where you can see the guests. Runs the pass most nights.",
    },
    {
      name: "Dev Ashworth",
      role: "Co-owner & wine",
      bio: "Builds the wine list around small growers who farm without shortcuts. Will happily find you a bottle under $50.",
    },
    {
      name: "Ines Calloway",
      role: "Head of the oven",
      bio: "Manages the fire from two o'clock until the last pie. Teaches pizza school once a month.",
    },
    {
      name: "Theo Park",
      role: "Pastry",
      bio: "Makes the tiramisu every morning and any cake you can describe to him in one sentence.",
    },
  ] satisfies Person[],
  suppliers: [
    {
      name: "Fernhill Farm",
      what: "Vegetables, herbs, chicken, eggs and honey",
      where: "40 minutes north",
    },
    {
      name: "Coldwater Dairy",
      what: "Burrata, ricotta and cultured butter",
      where: "18 miles",
    },
    {
      name: "Pier 9 Fishmongers",
      what: "Day-boat fish and shellfish",
      where: "The harbour",
    },
    {
      name: "Stonecross Mill",
      what: "Stone-ground flour for every dough",
      where: "Upriver",
    },
    {
      name: "Holloway Woodland",
      what: "Kiln-dried oak and beech for the oven",
      where: "Managed coppice",
    },
    {
      name: "Northside Brewing",
      what: "Our house pils",
      where: "Two streets away",
    },
  ],
};

/* ------------------------------------------------------------ visit */

export const visit = {
  title: "Find us on Alder Street",
  intro:
    "On the corner of Alder Street and Wren Lane, opposite the library. Look for the smoke.",
  directions: [
    {
      how: "Bus",
      detail:
        "Routes 12 and 40 stop at Alder & Wren, thirty seconds from the door.",
    },
    {
      how: "Train",
      detail:
        "Northside station is an eight-minute walk south along Wren Lane.",
    },
    {
      how: "Bike",
      detail:
        "Six racks outside, and we never mind a bike in the hallway when it rains.",
    },
    {
      how: "Car",
      detail:
        "Metered street parking after 6 pm is free; the library lot opens to the public in the evening.",
    },
  ],
  access:
    "Step-free entrance on Wren Lane, an accessible restroom on the ground floor, and high chairs for little ones. Counter seats are bar height; tell us if you need a table instead.",
  faq: [
    {
      q: "Do you take walk-ins?",
      a: "Yes. We hold the eight counter seats around the oven and two terrace tables for walk-ins every night, first come, first served.",
    },
    {
      q: "Can you handle allergies and dietary needs?",
      a: "Most of the menu is marked vegetarian, vegan or gluten-free, and the kitchen can adapt a lot more. Tell us when you book and again when you order. We cook with nuts, gluten and shellfish, so we cannot promise there are no traces.",
    },
    {
      q: "What's your cancellation policy?",
      a: "Cancel or change up to 24 hours ahead at no cost. For later cancellations or no-shows on groups of five or more, we charge $20 a head.",
    },
    {
      q: "Are children welcome?",
      a: "Always. There is a half-size margherita on request, high chairs, and crayons that are surprisingly hard to steal.",
    },
    {
      q: "Can I bring my dog?",
      a: "On the terrace, yes, and there is a water bowl by the door. Inside, only assistance dogs.",
    },
    {
      q: "Do you sell gift cards?",
      a: "We do, in any amount from $25, at the bar or by email. They never expire.",
    },
    {
      q: "Is there corkage?",
      a: "$25 per bottle, waived on Tuesdays. We just ask that it isn't something already on our list.",
    },
  ],
};

/* ------------------------------------------------------------ reservations */

export const reservations = {
  title: "Book a table",
  intro:
    "Tables open thirty days ahead at noon. We hold them for fifteen minutes past your time; after that the counter usually gets them.",
  seating: [
    { id: "dining", label: "Dining room", hint: "Tables for two to eight" },
    {
      id: "counter",
      label: "Counter by the oven",
      hint: "Watch the pies go in; up to three guests",
    },
    {
      id: "terrace",
      label: "Terrace",
      hint: "Heated and covered, dogs welcome",
    },
  ],
  occasions: [
    "No occasion",
    "Birthday",
    "Anniversary",
    "Date night",
    "Business",
    "Celebration",
  ],
  maxParty: 8,
};
