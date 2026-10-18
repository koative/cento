import roomSrc from "./assets/room.jpg";
import bartenderSrc from "./assets/bartender.jpg";
import loungeSrc from "./assets/lounge.jpg";
import oldFashionedSrc from "./assets/old-fashioned.jpg";
import negroniSrc from "./assets/negroni.jpg";
import negroniPourSrc from "./assets/negroni-pour.jpg";
import espressoSrc from "./assets/espresso-martini.jpg";
import crateSrc from "./assets/crate.jpg";
import selectorSrc from "./assets/selector.jpg";
import amplifierSrc from "./assets/amplifier.jpg";
import singerSrc from "./assets/singer.jpg";
import strainSrc from "./assets/strain.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const images = {
  room: {
    src: roomSrc,
    alt: "The long bar after dark: backlit shelves of bottles, pendant bulbs and a bartender at work",
    w: 1600,
    h: 1067,
  },
  bartender: {
    src: bartenderSrc,
    alt: "A bartender sets down glasses along a crowded, lamplit counter",
    w: 1400,
    h: 788,
  },
  lounge: {
    src: loungeSrc,
    alt: "The back room: cream armchairs, a leather banquette and framed photographs on walnut walls",
    w: 1400,
    h: 934,
  },
  oldFashioned: {
    src: oldFashionedSrc,
    alt: "A stirred brown drink over ice, lit from below by a candle on the bar",
    w: 1131,
    h: 1400,
  },
  negroni: {
    src: negroniSrc,
    alt: "A ruby-red stirred drink with an orange slice on a dark wooden table",
    w: 1400,
    h: 933,
  },
  negroniPour: {
    src: negroniPourSrc,
    alt: "Sparkling wine poured into a cut-glass tumbler of red bitter aperitivo",
    w: 1400,
    h: 933,
  },
  espresso: {
    src: espressoSrc,
    alt: "Two coupes of foamy coffee cocktail with three beans on top, on a dark bar",
    w: 1050,
    h: 1400,
  },
  crate: {
    src: crateSrc,
    alt: "Rows of well-thumbed record sleeves packed tight in wooden crates",
    w: 1400,
    h: 929,
  },
  selector: {
    src: selectorSrc,
    alt: "A selector pulls a record from a shelf, a turntable waiting beside him",
    w: 1400,
    h: 931,
  },
  amplifier: {
    src: amplifierSrc,
    alt: "A valve amplifier on a walnut base, its glass tubes glowing inside a wire cage",
    w: 1100,
    h: 825,
  },
  singer: {
    src: singerSrc,
    alt: "A singer in a dark dress at the microphone, a music stand in front of her",
    w: 1400,
    h: 1050,
  },
  strain: {
    src: strainSrc,
    alt: "A bartender double-strains a shaken drink into a chilled glass",
    w: 900,
    h: 600,
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ brand */

export const brand = {
  name: "Nocturne",
  sector: "Cocktail & listening bar",
  tagline: "Stay for another side.",
  intro:
    "A cocktail and listening bar in a Vesterbro basement. Records play in full sides on a hand-built system, drinks are stirred to match, and the room is kept quiet enough to hear both.",
  street: "Istedgade 61, basement",
  city: "1650 Copenhagen V",
  directions:
    "Down the brass-railed steps between the bakery and the bike shop. Look for the small lit moon.",
  email: "hello@nocturne.example",
  hireEmail: "hire@nocturne.example",
  phone: "+45 55 50 19 33",
  phoneHref: "tel:+4555501933",
  founded: 2019,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Mixcloud", href: "https://www.mixcloud.com/" },
  ],
};

/** Sunday-first opening hours; null = closed. Closing past midnight is written as the next day's time. */
export type Hours = [open: string, close: string] | null;
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const hours: Hours[] = [
  ["17:00", "23:30"],
  null,
  null,
  ["18:00", "00:30"],
  ["18:00", "00:30"],
  ["18:00", "02:00"],
  ["18:00", "02:00"],
];

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/menu", label: "Drinks" },
  { to: "/records", label: "Record of the night" },
  { to: "/events", label: "Events" },
  { to: "/private-hire", label: "Private hire" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "The bar",
    links: [
      { to: "/menu", label: "Drinks menu" },
      { to: "/menu/side-b", label: "Side B, our signature" },
      { to: "/records", label: "Record of the night" },
      { to: "/about", label: "The room & the system" },
    ],
  },
  {
    title: "Plan a night",
    links: [
      { to: "/reservations", label: "Book a table" },
      { to: "/events", label: "Events" },
      { to: "/private-hire", label: "Private hire" },
    ],
  },
];

export const newsletter = {
  title: "The Sunday slip",
  text: "One short email each Sunday: the week's selectors, album nights and the record that closed Saturday.",
};

/* ------------------------------------------------------------------ home */

export const home = {
  heroLine:
    "Cocktails, records played in full, and a room that lets you hear them.",
  rules:
    "Records play in full sides. Talk at the volume of the music. Phones face down, glasses up.",
  rulesNote:
    "Nothing strict, just how the room works best. Half the seats are kept for walk-ins every night, and the bar counter is always first come, first served.",
  drinksTitle: "A short menu, stirred to the music",
  drinksText:
    "Seven signatures that change with the season, the classics done carefully, and a low-and-no list we are proud of. Every drink comes with a record to listen to it by.",
  recordTitle: "We write down every record we play",
  recordText:
    "Each night the selector logs every side on a paper slip by the turntable. The next morning it goes up here. Drag through the evening and see what the room was hearing.",
  systemTitle: "Built to be listened to",
  systemText:
    "The sound is the reason the bar exists. Horn loudspeakers built in a Jutland workshop, valve amplifiers warming up from five o'clock, and two turntables that never play anything but vinyl.",
  eventsTitle: "Coming up",
  hireTitle: "The whole room, for your night",
  hireText:
    "Birthdays, launches, a long dinner for the team, or a record club that has outgrown someone's living room. Take the back room for fourteen or the whole bar for sixty.",
  quote: {
    text: "I came in for one drink and stayed for both sides of a record I'd never heard of. Then I asked what it was, and they wrote it on my receipt.",
    by: "Mette, a Thursday regular",
  },
  closeTitle: "There is a seat for you here",
  closeText:
    "Book a table online, or come down the steps and take your chances at the bar.",
};

export const system: { part: string; detail: string }[] = [
  {
    part: "Loudspeakers",
    detail:
      "A pair of front-loaded horn cabinets in oiled ash, 15-inch bass drivers, built to order in Aarhus.",
  },
  {
    part: "Amplification",
    detail:
      "Two single-ended 300B valve amplifiers, 8 watts a side, which is plenty for a room this size.",
  },
  {
    part: "Turntables",
    detail:
      "Two idler-drive decks with moving-coil cartridges, set into a walnut desk at the end of the bar.",
  },
  {
    part: "Mixer",
    detail:
      "A rotary mixer with no EQ beyond bass and treble; the records are trusted to sound as they were cut.",
  },
  {
    part: "The shelf",
    detail:
      "About 2,400 LPs behind the desk, mostly jazz, soul, ambient, Brazilian and Japanese pressings.",
  },
];

/* ------------------------------------------------------------------ drinks */

export type DrinkCategory = "signature" | "classic" | "low" | "highball";
export type Glass = "rocks" | "coupe" | "nick" | "highball";

export const menuPage = {
  intro:
    "Seventeen drinks, each with a record to listen to it by. Prices in Danish kroner; every cocktail can be made low or without alcohol, just ask.",
  poursText:
    "Three centilitres, neat or with a cube. Ask for a half pour if you're comparing.",
  snacksText:
    "Small plates from a very small kitchen, served until an hour before close.",
};

export const drinkCategories: {
  id: DrinkCategory;
  label: string;
  text: string;
}[] = [
  {
    id: "signature",
    label: "Signatures",
    text: "Our own drinks. They change with the season, about four times a year.",
  },
  {
    id: "classic",
    label: "Classics",
    text: "The canon, made the way we like it. Ask and we'll make it your way.",
  },
  {
    id: "low",
    label: "Low & no",
    text: "Built with the same care, for the second half of a long evening.",
  },
  {
    id: "highball",
    label: "Highballs",
    text: "Long, very cold, very clear. Hand-cut ice and soda from the tap.",
  },
];

export type Drink = {
  id: string;
  name: string;
  category: DrinkCategory;
  base: string;
  price: number;
  abv: number;
  notes: string;
  description: string;
  spec: { amount: string; item: string }[];
  method: string;
  glass: Glass;
  ice: string;
  garnish: string;
  taste: string[];
  color: string;
  listen: { album: string; why: string };
  image?: Img;
};

export const drinks: Drink[] = [
  {
    id: "side-b",
    name: "Side B",
    category: "signature",
    base: "Whiskey",
    price: 145,
    abv: 31,
    notes: "Rye, walnut, oloroso, orange bitters",
    description:
      "The drink the bar was named around. A rye old fashioned that has been left to think: oloroso sherry for depth, a little walnut liqueur, orange bitters, stirred long over a single block of ice. It gets better as the record does.",
    spec: [
      { amount: "50 ml", item: "Rye whiskey, 100 proof" },
      { amount: "10 ml", item: "Oloroso sherry" },
      { amount: "5 ml", item: "Walnut liqueur" },
      { amount: "5 ml", item: "Demerara syrup" },
      { amount: "2 dashes", item: "Orange bitters" },
    ],
    method: "Stirred for 40 seconds, strained over a hand-cut block.",
    glass: "rocks",
    ice: "Single clear block",
    garnish: "Expressed orange, discarded",
    taste: ["Spirit-forward", "Stirred", "Nutty"],
    color: "#9b4d1e",
    listen: {
      album: "low-light",
      why: "Slow brushes and a bass that takes its time, like the drink.",
    },
    image: images.oldFashioned,
  },
  {
    id: "needle-drop",
    name: "Needle Drop",
    category: "signature",
    base: "Aquavit",
    price: 140,
    abv: 26,
    notes: "Aquavit, red bitter, cacao-nib vermouth",
    description:
      "A Copenhagen negroni. Caraway aquavit stands in for gin, the vermouth spends a week on roasted cacao nibs, and the bitter is a red aperitivo from Piedmont. Dry, a little savoury, very easy to order twice.",
    spec: [
      { amount: "30 ml", item: "Caraway aquavit" },
      { amount: "25 ml", item: "Red bitter aperitivo" },
      { amount: "25 ml", item: "Sweet vermouth, cacao-nib infused" },
    ],
    method: "Stirred, strained over a large cube.",
    glass: "rocks",
    ice: "Large cube",
    garnish: "Orange half-wheel",
    taste: ["Bitter", "Stirred", "Herbal"],
    color: "#a8232a",
    listen: {
      album: "night-ferry",
      why: "Sharp horns, a dry wit, and a rhythm section you can lean on.",
    },
    image: images.negroni,
  },
  {
    id: "dust-jacket",
    name: "Dust Jacket",
    category: "signature",
    base: "Rum",
    price: 135,
    abv: 18,
    notes: "Aged rum, espresso, Pedro Ximénez",
    description:
      "Our late-night coffee drink, and the reason the espresso machine stays on until close. Aged rum, a ristretto pulled to order, Pedro Ximénez sherry instead of sugar. Shaken hard for a fine, lasting foam.",
    spec: [
      { amount: "40 ml", item: "Aged Barbados rum" },
      { amount: "30 ml", item: "Ristretto, pulled to order" },
      { amount: "15 ml", item: "Pedro Ximénez sherry" },
      { amount: "5 ml", item: "Coffee liqueur" },
    ],
    method: "Shaken hard with ice, double strained.",
    glass: "coupe",
    ice: "Served up",
    garnish: "Three coffee beans",
    taste: ["Rich", "Shaken", "Coffee"],
    color: "#3b2418",
    listen: {
      album: "paper-moons",
      why: "Warm, round and awake at one in the morning.",
    },
    image: images.espresso,
  },
  {
    id: "liner-notes",
    name: "Liner Notes",
    category: "signature",
    base: "Mezcal",
    price: 140,
    abv: 17,
    notes: "Mezcal, yellow chartreuse, pineapple, lime",
    description:
      "Smoke, honeyed herbs and a bright edge of lime. A sour that reads like the small print on the back of a sleeve: dense, a little nerdy, and more interesting the closer you look.",
    spec: [
      { amount: "40 ml", item: "Espadín mezcal" },
      { amount: "15 ml", item: "Yellow chartreuse" },
      { amount: "20 ml", item: "Pineapple juice, fresh" },
      { amount: "20 ml", item: "Lime juice" },
      { amount: "5 ml", item: "Agave syrup" },
    ],
    method: "Shaken, double strained into a chilled glass.",
    glass: "nick",
    ice: "Served up",
    garnish: "Pineapple leaf",
    taste: ["Smoky", "Shaken", "Sour"],
    color: "#d9b44a",
    listen: {
      album: "slow-orbit",
      why: "Electric piano and congas, smoke and sunlight together.",
    },
    image: images.strain,
  },
  {
    id: "deep-cut",
    name: "Deep Cut",
    category: "signature",
    base: "Brandy",
    price: 145,
    abv: 27,
    notes: "Cognac, Danish blackcurrant, dry vermouth, salt",
    description:
      "Cognac and dry vermouth with a spoon of blackcurrant liqueur made on Lolland and the smallest pinch of salt. Dark fruit without sweetness. For the person at the bar who asks what you're playing.",
    spec: [
      { amount: "45 ml", item: "VSOP cognac" },
      { amount: "20 ml", item: "Dry vermouth" },
      { amount: "7.5 ml", item: "Blackcurrant liqueur" },
      { amount: "1 pinch", item: "Saline" },
    ],
    method: "Stirred, served up.",
    glass: "nick",
    ice: "Served up",
    garnish: "None",
    taste: ["Spirit-forward", "Stirred", "Dark fruit"],
    color: "#4d1628",
    listen: {
      album: "between-stations",
      why: "Long tones and space between them, best heard late.",
    },
  },
  {
    id: "inner-groove",
    name: "Inner Groove",
    category: "signature",
    base: "Gin",
    price: 135,
    abv: 15,
    notes: "Gin, sea buckthorn, elderflower, egg white",
    description:
      "Sea buckthorn picked on the north coast of Zealand, tart and orange, softened with our own elderflower cordial and a silky egg-white foam. Bright enough to start an evening, gentle enough to end one.",
    spec: [
      { amount: "45 ml", item: "London dry gin" },
      { amount: "20 ml", item: "Sea buckthorn purée" },
      { amount: "15 ml", item: "Elderflower cordial" },
      { amount: "15 ml", item: "Lemon juice" },
      { amount: "1", item: "Egg white (aquafaba on request)" },
    ],
    method: "Dry shaken, then shaken with ice, double strained.",
    glass: "coupe",
    ice: "Served up",
    garnish: "Dried elderflower",
    taste: ["Bright", "Shaken", "Sour"],
    color: "#e58a2e",
    listen: {
      album: "harbour-lights",
      why: "Bossa rhythms with a Nordic chill, sunny but never hot.",
    },
  },
  {
    id: "quiet-storm",
    name: "Quiet Storm",
    category: "signature",
    base: "Rum",
    price: 130,
    abv: 12,
    notes: "Dark rum, smoked black tea, ginger, lime",
    description:
      "A long, dark highball with a slow build. Jamaican rum, lapsang souchong cold-brewed overnight, fresh ginger and lime, topped with soda. Smoky first, then spice, then you've finished it.",
    spec: [
      { amount: "40 ml", item: "Jamaican dark rum" },
      { amount: "40 ml", item: "Lapsang souchong, cold brewed" },
      { amount: "15 ml", item: "Fresh ginger syrup" },
      { amount: "15 ml", item: "Lime juice" },
      { amount: "Top", item: "Soda" },
    ],
    method: "Built over ice, a short stir.",
    glass: "highball",
    ice: "Collins spear",
    garnish: "Candied ginger",
    taste: ["Smoky", "Long", "Spiced"],
    color: "#6b3a1c",
    listen: {
      album: "velvet-hours",
      why: "Slow-burning soul, built up one layer at a time.",
    },
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    category: "classic",
    base: "Whiskey",
    price: 125,
    abv: 32,
    notes: "Bourbon, demerara, Angostura, orange",
    description:
      "Bourbon, a little demerara, Angostura and orange oil. We stir it properly and serve it over a single clear block, which is the whole secret.",
    spec: [
      { amount: "60 ml", item: "Bourbon" },
      { amount: "7.5 ml", item: "Demerara syrup" },
      { amount: "3 dashes", item: "Angostura bitters" },
    ],
    method: "Stirred over a block.",
    glass: "rocks",
    ice: "Single clear block",
    garnish: "Orange twist",
    taste: ["Spirit-forward", "Stirred", "Classic"],
    color: "#a85a1f",
    listen: {
      album: "low-light",
      why: "The classic order deserves the classic quartet.",
    },
  },
  {
    id: "negroni",
    name: "Negroni",
    category: "classic",
    base: "Gin",
    price: 125,
    abv: 24,
    notes: "Gin, red bitter, sweet vermouth",
    description:
      "Equal parts, built in the glass over a large cube. Ask for it sbagliato and we'll swap the gin for a dry Franciacorta.",
    spec: [
      { amount: "30 ml", item: "London dry gin" },
      { amount: "30 ml", item: "Red bitter aperitivo" },
      { amount: "30 ml", item: "Sweet vermouth" },
    ],
    method: "Built and stirred in the glass.",
    glass: "rocks",
    ice: "Large cube",
    garnish: "Orange slice",
    taste: ["Bitter", "Stirred", "Classic"],
    color: "#b3262c",
    listen: {
      album: "night-ferry",
      why: "Three parts in perfect balance, like a sextet that knows when to sit out.",
    },
    image: images.negroniPour,
  },
  {
    id: "martini",
    name: "Martini",
    category: "classic",
    base: "Gin",
    price: 130,
    abv: 30,
    notes: "Gin or vodka, dry vermouth, twist or olive",
    description:
      "Kept in the freezer, stirred to order, poured into a glass that has been waiting at minus eighteen. Tell us how dry, and twist or olive. We'll leave the sidecar on ice beside it.",
    spec: [
      { amount: "60 ml", item: "London dry gin or vodka" },
      { amount: "10 ml", item: "Dry vermouth" },
      { amount: "1 dash", item: "Orange bitters" },
    ],
    method: "Stirred, served up with a sidecar on ice.",
    glass: "nick",
    ice: "Served up",
    garnish: "Lemon twist or Castelvetrano olive",
    taste: ["Spirit-forward", "Stirred", "Dry"],
    color: "#dfe3cf",
    listen: {
      album: "soft-corners",
      why: "Clean lines, cold piano, no wasted notes.",
    },
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    category: "classic",
    base: "Rum",
    price: 115,
    abv: 20,
    notes: "White rum, lime, sugar",
    description:
      "The bartender's handshake. Three ingredients, shaken very cold, nothing to hide behind.",
    spec: [
      { amount: "50 ml", item: "Lightly aged white rum" },
      { amount: "25 ml", item: "Lime juice" },
      { amount: "15 ml", item: "Rich simple syrup" },
    ],
    method: "Shaken hard, fine strained.",
    glass: "coupe",
    ice: "Served up",
    garnish: "None",
    taste: ["Bright", "Shaken", "Sour"],
    color: "#e8e2b8",
    listen: {
      album: "harbour-lights",
      why: "Short, bright and over before you're ready.",
    },
  },
  {
    id: "manhattan",
    name: "Manhattan",
    category: "classic",
    base: "Whiskey",
    price: 130,
    abv: 30,
    notes: "Rye, sweet vermouth, Angostura",
    description:
      "Rye and a rich Italian vermouth, stirred and served up with a brandied cherry we make in batches each autumn.",
    spec: [
      { amount: "50 ml", item: "Rye whiskey" },
      { amount: "25 ml", item: "Sweet vermouth" },
      { amount: "2 dashes", item: "Angostura bitters" },
    ],
    method: "Stirred, served up.",
    glass: "coupe",
    ice: "Served up",
    garnish: "House brandied cherry",
    taste: ["Spirit-forward", "Stirred", "Classic"],
    color: "#7a2a1c",
    listen: {
      album: "night-ferry",
      why: "Midnight in a port city, all brass and wet streets.",
    },
  },
  {
    id: "interlude",
    name: "Interlude",
    category: "low",
    base: "Alcohol-free",
    price: 85,
    abv: 0,
    notes: "Roasted pear, smoked tea, verjus, soda",
    description:
      "No alcohol, no compromise. Pears roasted in the oven until they caramelise, a little smoked tea for grip, verjus for acidity, lengthened with soda. Served with the same ceremony as everything else.",
    spec: [
      { amount: "50 ml", item: "Roasted pear syrup" },
      { amount: "30 ml", item: "Smoked black tea" },
      { amount: "15 ml", item: "Verjus" },
      { amount: "Top", item: "Soda" },
    ],
    method: "Built over ice.",
    glass: "highball",
    ice: "Collins spear",
    garnish: "Pear fan",
    taste: ["Alcohol-free", "Long", "Smoky"],
    color: "#c9a25a",
    listen: {
      album: "between-stations",
      why: "A pause between sides, all atmosphere.",
    },
  },
  {
    id: "run-out-groove",
    name: "Run-out Groove",
    category: "low",
    base: "Fortified wine",
    price: 95,
    abv: 7,
    notes: "Dry vermouth, fino, tonic, grapefruit",
    description:
      "A spritz for people who don't want a spritz. Dry vermouth and fino sherry, Indian tonic and a long grapefruit peel. Low enough for a third round.",
    spec: [
      { amount: "40 ml", item: "Dry vermouth" },
      { amount: "20 ml", item: "Fino sherry" },
      { amount: "Top", item: "Indian tonic" },
    ],
    method: "Built over ice, gently.",
    glass: "highball",
    ice: "Cubes",
    garnish: "Grapefruit peel",
    taste: ["Low ABV", "Long", "Bitter"],
    color: "#efe2a9",
    listen: { album: "soft-corners", why: "Easy, light, and gone too soon." },
  },
  {
    id: "soft-spoken",
    name: "Soft Spoken",
    category: "low",
    base: "Alcohol-free",
    price: 80,
    abv: 0,
    notes: "Rhubarb shrub, elderflower, lemon, soda",
    description:
      "Rhubarb from a farm outside Roskilde, pickled into a shrub with cider vinegar, met with elderflower and soda. Tart, floral and very pink.",
    spec: [
      { amount: "40 ml", item: "Rhubarb shrub" },
      { amount: "15 ml", item: "Elderflower cordial" },
      { amount: "10 ml", item: "Lemon juice" },
      { amount: "Top", item: "Soda" },
    ],
    method: "Built over ice.",
    glass: "highball",
    ice: "Cubes",
    garnish: "Rhubarb ribbon",
    taste: ["Alcohol-free", "Long", "Tart"],
    color: "#e06f86",
    listen: {
      album: "paper-moons",
      why: "A gentle, sweet-voiced record for a gentle drink.",
    },
  },
  {
    id: "long-play",
    name: "The Long Play",
    category: "highball",
    base: "Whiskey",
    price: 115,
    abv: 10,
    notes: "Blended whisky, very cold soda, lemon oil",
    description:
      "Whisky and soda, made with the kind of attention usually saved for martinis. The glass is frozen, the soda is carbonated hard, and the ice is cut by hand into a single spear.",
    spec: [
      { amount: "45 ml", item: "Blended malt whisky" },
      { amount: "120 ml", item: "Soda, very cold" },
    ],
    method: "Built and stirred thirteen and a half times.",
    glass: "highball",
    ice: "Hand-cut spear",
    garnish: "Lemon oil",
    taste: ["Long", "Dry", "Sparkling"],
    color: "#e2c27a",
    listen: {
      album: "velvet-hours",
      why: "It lasts a whole side, if you let it.",
    },
  },
  {
    id: "copenhagen-highball",
    name: "Vesterbro Highball",
    category: "highball",
    base: "Aquavit",
    price: 110,
    abv: 11,
    notes: "Dill aquavit, cucumber, tonic",
    description:
      "Our neighbourhood in a glass. Dill aquavit, a little pressed cucumber and a dry tonic. Herbal, cold, and good with the smoked trout.",
    spec: [
      { amount: "40 ml", item: "Dill aquavit" },
      { amount: "20 ml", item: "Pressed cucumber" },
      { amount: "Top", item: "Dry tonic" },
    ],
    method: "Built over ice.",
    glass: "highball",
    ice: "Cubes",
    garnish: "Dill sprig",
    taste: ["Herbal", "Long", "Dry"],
    color: "#cfe0b8",
    listen: {
      album: "harbour-lights",
      why: "Breezy and green, like Saturday at the harbour baths.",
    },
  },
];

export const pours: { name: string; detail: string; price: number }[] = [
  {
    name: "Speyside single malt, 12 years",
    detail: "Honeyed, gentle, sherry-finished",
    price: 95,
  },
  {
    name: "Islay single malt, 10 years",
    detail: "Peat smoke, iodine, sea spray",
    price: 110,
  },
  {
    name: "Japanese blended whisky",
    detail: "Light, orchard fruit, white pepper",
    price: 105,
  },
  {
    name: "Kentucky straight rye",
    detail: "Spice, toffee, a long dry finish",
    price: 90,
  },
  {
    name: "Barbados rum, 8 years",
    detail: "Banana bread, vanilla, oak",
    price: 95,
  },
  { name: "Armagnac, 2004", detail: "Prune, leather, walnut", price: 140 },
  {
    name: "Danish aquavit, cask aged",
    detail: "Caraway, dill, sweet spice",
    price: 75,
  },
  {
    name: "Espadín mezcal",
    detail: "Green agave, smoke, citrus pith",
    price: 100,
  },
];

export const snacks: { name: string; detail: string; price: number }[] = [
  {
    name: "Marinated olives",
    detail: "Castelvetrano and Kalamata, orange zest, fennel seed",
    price: 45,
  },
  { name: "Smoked almonds", detail: "Salted, still warm", price: 40 },
  { name: "Rye sourdough", detail: "Cultured butter, flaky salt", price: 55 },
  {
    name: "Smoked trout",
    detail: "On rye crispbread, horseradish cream, dill",
    price: 95,
  },
  { name: "Aged Comté", detail: "Quince paste, oat crackers", price: 85 },
  {
    name: "Dark chocolate",
    detail: "Seventy percent, sea salt, a little olive oil",
    price: 50,
  },
];

/* ------------------------------------------------------------------ records */

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  label: string;
  color: string;
  sides: [number, number];
};

/** All artists and records are invented for this template. Sides are in minutes. */
export const albums: Album[] = [
  {
    id: "low-light",
    title: "Low Light, Long Night",
    artist: "Ansel Holm Quartet",
    year: 1961,
    genre: "Hard bop",
    label: "Kastrup",
    color: "#b64d2d",
    sides: [21, 19],
  },
  {
    id: "soft-corners",
    title: "Soft Corners",
    artist: "Yuna Quartet",
    year: 1978,
    genre: "Piano jazz",
    label: "Moonsheet",
    color: "#758676",
    sides: [18, 20],
  },
  {
    id: "between-stations",
    title: "Between Stations",
    artist: "Milo Reed",
    year: 1982,
    genre: "Ambient",
    label: "Grey Line",
    color: "#b1a16a",
    sides: [23, 22],
  },
  {
    id: "night-ferry",
    title: "Night Ferry to Malmö",
    artist: "Kaspar Wendt Sextet",
    year: 1963,
    genre: "Modal jazz",
    label: "Kastrup",
    color: "#2f4d6b",
    sides: [20, 21],
  },
  {
    id: "harbour-lights",
    title: "Harbour Lights at Four",
    artist: "Birgit Lund Trio",
    year: 1968,
    genre: "Bossa nova",
    label: "Solskin",
    color: "#d7a33b",
    sides: [17, 16],
  },
  {
    id: "slow-orbit",
    title: "Slow Orbit",
    artist: "Marcel Okafor",
    year: 1974,
    genre: "Jazz funk",
    label: "Equator",
    color: "#c2552c",
    sides: [19, 21],
  },
  {
    id: "velvet-hours",
    title: "Velvet Hours",
    artist: "The Moss Street Ensemble",
    year: 1971,
    genre: "Soul",
    label: "Cellar Door",
    color: "#6d2f4a",
    sides: [18, 17],
  },
  {
    id: "paper-moons",
    title: "Paper Moons",
    artist: "Ida Sørhus",
    year: 1979,
    genre: "Vocal jazz",
    label: "Moonsheet",
    color: "#d9c8a0",
    sides: [20, 19],
  },
  {
    id: "after-rain",
    title: "After the Rain Stops",
    artist: "The Quiet Hours",
    year: 1964,
    genre: "Cool jazz",
    label: "Kastrup",
    color: "#8a5a3c",
    sides: [19, 18],
  },
  {
    id: "glass-city",
    title: "Glass City Sunday",
    artist: "Hiro Tanabe",
    year: 1983,
    genre: "City pop",
    label: "Neon Tide",
    color: "#e07a8f",
    sides: [21, 20],
  },
  {
    id: "tidewater",
    title: "Tidewater",
    artist: "Lena Okoye",
    year: 1976,
    genre: "Spiritual jazz",
    label: "Equator",
    color: "#3e6b5a",
    sides: [22, 24],
  },
  {
    id: "small-hours",
    title: "The Small Hours Suite",
    artist: "Oskar Vahl",
    year: 1958,
    genre: "Ballads",
    label: "Kastrup",
    color: "#a7856a",
    sides: [17, 18],
  },
  {
    id: "copper-wire",
    title: "Copper Wire",
    artist: "Nadia Ferro",
    year: 1985,
    genre: "Synth ambient",
    label: "Grey Line",
    color: "#c47a3a",
    sides: [24, 23],
  },
  {
    id: "samba-north",
    title: "Samba do Norte",
    artist: "Teodoro Viana",
    year: 1972,
    genre: "MPB",
    label: "Solskin",
    color: "#e3b84e",
    sides: [18, 19],
  },
  {
    id: "blue-hour",
    title: "Blue Hour Variations",
    artist: "Ruth Anand",
    year: 1969,
    genre: "Third stream",
    label: "Moonsheet",
    color: "#4a5f8c",
    sides: [20, 22],
  },
  {
    id: "warm-static",
    title: "Warm Static",
    artist: "Felix Aune",
    year: 1997,
    genre: "Downtempo",
    label: "Cellar Door",
    color: "#8c6b4f",
    sides: [22, 21],
  },
];

export type Play = [album: string, side: "A" | "B"];
export type Night = {
  id: string;
  date: string;
  selector: string;
  title: string;
  note: string;
  start: string;
  plays: Play[];
};

export const nights: Night[] = [
  {
    id: "2026-10-17",
    date: "2026-10-17",
    selector: "Freja Lindqvist",
    title: "Saturday, both sides",
    note: "A full house by nine, so I kept it warm and moving: Kastrup hard bop early, a long Brazilian stretch when the booths got loud, and Ida Sørhus to send everyone home. Someone asked for Slow Orbit three times. They got it once.",
    start: "18:00",
    plays: [
      ["small-hours", "A"],
      ["small-hours", "B"],
      ["low-light", "A"],
      ["low-light", "B"],
      ["harbour-lights", "A"],
      ["samba-north", "A"],
      ["samba-north", "B"],
      ["harbour-lights", "B"],
      ["slow-orbit", "A"],
      ["slow-orbit", "B"],
      ["night-ferry", "A"],
      ["velvet-hours", "A"],
      ["velvet-hours", "B"],
      ["glass-city", "A"],
      ["tidewater", "A"],
      ["blue-hour", "B"],
      ["after-rain", "A"],
      ["between-stations", "A"],
      ["paper-moons", "A"],
      ["paper-moons", "B"],
    ],
  },
  {
    id: "2026-10-16",
    date: "2026-10-16",
    selector: "Aiko Mori",
    title: "City pop after dark",
    note: "Guest night. I brought a crate of Tokyo records from the early eighties and mixed them with the house's soul shelf. The room danced in their seats around eleven, which I'll take as a win in a listening bar.",
    start: "18:00",
    plays: [
      ["warm-static", "A"],
      ["copper-wire", "A"],
      ["glass-city", "A"],
      ["glass-city", "B"],
      ["velvet-hours", "A"],
      ["slow-orbit", "A"],
      ["samba-north", "B"],
      ["velvet-hours", "B"],
      ["glass-city", "A"],
      ["slow-orbit", "B"],
      ["harbour-lights", "A"],
      ["tidewater", "B"],
      ["copper-wire", "B"],
      ["warm-static", "B"],
      ["between-stations", "B"],
      ["paper-moons", "B"],
    ],
  },
  {
    id: "2026-10-15",
    date: "2026-10-15",
    selector: "Jonas Brandt",
    title: "Rain on Istedgade",
    note: "Wet Thursday, quiet room. Ballads and brushes until ten, then a long ambient stretch while the last tables lingered. Between Stations played start to finish and nobody spoke for the whole of side B.",
    start: "18:00",
    plays: [
      ["after-rain", "A"],
      ["after-rain", "B"],
      ["soft-corners", "A"],
      ["soft-corners", "B"],
      ["small-hours", "A"],
      ["blue-hour", "A"],
      ["blue-hour", "B"],
      ["paper-moons", "A"],
      ["night-ferry", "B"],
      ["between-stations", "A"],
      ["between-stations", "B"],
      ["copper-wire", "A"],
      ["warm-static", "A"],
      ["small-hours", "B"],
    ],
  },
  {
    id: "2026-10-11",
    date: "2026-10-11",
    selector: "Freja Lindqvist",
    title: "Sunday crate night",
    note: "Bring-a-record Sunday. Eleven guests brought one side each and told us why. My favourite: a nurse who brought Tidewater because it got her through her first year of night shifts.",
    start: "17:00",
    plays: [
      ["harbour-lights", "A"],
      ["tidewater", "A"],
      ["glass-city", "B"],
      ["low-light", "A"],
      ["paper-moons", "A"],
      ["samba-north", "A"],
      ["blue-hour", "A"],
      ["velvet-hours", "B"],
      ["copper-wire", "A"],
      ["soft-corners", "B"],
      ["after-rain", "B"],
      ["between-stations", "B"],
    ],
  },
  {
    id: "2026-10-10",
    date: "2026-10-10",
    selector: "Tobias Kjær",
    title: "Brass and wet streets",
    note: "A night of sextets and big rooms. Night Ferry twice because we had two birthdays who both asked for it. The horns were singing by midnight; I may have nudged the volume.",
    start: "18:00",
    plays: [
      ["small-hours", "A"],
      ["night-ferry", "A"],
      ["night-ferry", "B"],
      ["low-light", "B"],
      ["blue-hour", "A"],
      ["tidewater", "A"],
      ["tidewater", "B"],
      ["slow-orbit", "A"],
      ["samba-north", "A"],
      ["velvet-hours", "A"],
      ["night-ferry", "A"],
      ["glass-city", "B"],
      ["low-light", "A"],
      ["after-rain", "B"],
      ["warm-static", "A"],
      ["between-stations", "A"],
      ["paper-moons", "B"],
    ],
  },
  {
    id: "2026-10-09",
    date: "2026-10-09",
    selector: "Jonas Brandt",
    title: "Friday slow burn",
    note: "Started sparse and let it build: piano first, then soul, then the Okafor record at full tilt around eleven. Closed on Copper Wire, which sounds like the room emptying.",
    start: "18:00",
    plays: [
      ["soft-corners", "A"],
      ["soft-corners", "B"],
      ["after-rain", "A"],
      ["paper-moons", "A"],
      ["velvet-hours", "A"],
      ["velvet-hours", "B"],
      ["harbour-lights", "B"],
      ["slow-orbit", "A"],
      ["slow-orbit", "B"],
      ["glass-city", "A"],
      ["samba-north", "B"],
      ["tidewater", "A"],
      ["blue-hour", "B"],
      ["warm-static", "B"],
      ["copper-wire", "A"],
      ["copper-wire", "B"],
    ],
  },
];

export const recordsPage = {
  intro:
    "Every side we play goes on a paper slip by the turntable: the time the needle dropped, the record, the side. In the morning the slip is typed up here. Scrub through the evening to hear the night in order, or open an older slip from the archive.",
  archiveTitle: "Older slips",
  ritualTitle: "How the slip works",
  ritual: [
    {
      term: "Full sides only",
      text: "Once the needle drops, the side plays to the end. No skipping, no fading out.",
    },
    {
      term: "Ask, don't request",
      text: "Curious what's playing? Ask at the desk and we'll write it on your receipt.",
    },
    {
      term: "Two-minute gaps",
      text: "The selector takes a breath between sides to clean the next record and pick what follows.",
    },
  ],
};

/* ------------------------------------------------------------------ events */

export type EventKind = "Album night" | "Guest selector" | "Live" | "Tasting";

export type BarEvent = {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  doors: string;
  start: string;
  end: string;
  price: number;
  includes: string;
  capacity: number;
  taken: number;
  host: string;
  image: Img;
  summary: string;
  body: string[];
  programme: { time: string; item: string }[];
};

export const eventKinds: EventKind[] = [
  "Album night",
  "Guest selector",
  "Live",
  "Tasting",
];

export const eventsPage = {
  intro:
    "Album nights played start to finish, guest selectors, the occasional live trio and small tastings at the counter. Most nights need no ticket at all; just come down.",
  weekTitle: "An ordinary week",
  weekText:
    "No ticket, no booking needed. This is what you'll find most weeks when there's nothing on the list.",
  week: [
    {
      day: "Wednesday",
      what: "Album nights, twice a month. Otherwise house records, quiet room.",
    },
    {
      day: "Thursday",
      what: "Jonas on the desk: ballads, ambient, piano. The quietest night of the week.",
    },
    {
      day: "Friday",
      what: "Guest selectors from Copenhagen and further afield, roughly every other week.",
    },
    {
      day: "Saturday",
      what: "Freja on the desk from six until two. Busiest night; book or come early.",
    },
    {
      day: "Sunday",
      what: "Early doors at five. Crate night on the last Sunday, tastings in the afternoon.",
    },
  ],
};

export const events: BarEvent[] = [
  {
    id: "low-light-both-sides",
    title: "Low Light, Long Night, start to finish",
    kind: "Album night",
    date: "2026-10-21",
    doors: "19:00",
    start: "19:30",
    end: "21:00",
    price: 120,
    includes: "Includes a Side B on arrival",
    capacity: 38,
    taken: 31,
    host: "Freja Lindqvist",
    image: images.crate,
    summary:
      "The 1961 Kastrup pressing played in full, both sides, lights down, no talking. Then the bar opens up again.",
    body: [
      "Album nights are the bar at its most itself. We seat everyone facing the horns, dim the room, and play one record from the first groove to the last. Freja introduces it for five minutes: who played, where it was cut, why it still matters. Then nobody says anything for forty.",
      "Low Light, Long Night was recorded in one evening in a Copenhagen studio with the snow coming down outside. It is the record the bar plays most, and the one the first Side B was built around. Come and hear it the way it was meant to be heard.",
    ],
    programme: [
      { time: "19:00", item: "Doors, a Side B in your hand" },
      { time: "19:30", item: "Introduction by Freja" },
      { time: "19:40", item: "Side A, lights down" },
      { time: "20:05", item: "Five minutes to turn it over" },
      { time: "20:10", item: "Side B" },
      { time: "20:35", item: "The bar opens as usual" },
    ],
  },
  {
    id: "aiko-mori-city-pop",
    title: "Aiko Mori: City pop after dark, part two",
    kind: "Guest selector",
    date: "2026-10-23",
    doors: "18:00",
    start: "20:00",
    end: "02:00",
    price: 0,
    includes: "Free with a table booking or at the bar",
    capacity: 60,
    taken: 44,
    host: "Aiko Mori",
    image: images.selector,
    summary:
      "Last week's guest comes back with a second crate of early-eighties Tokyo records and the house soul shelf.",
    body: [
      "Aiko Mori runs a record shop in Aarhus and has been buying Japanese pressings since her first trip to Osaka in 2008. Her first night at Nocturne filled the room and the slip, so we asked her back before she'd even packed up.",
      "Expect synths and slap bass, sunny vocal harmonies, the odd jazz-funk deep cut, and the soul records she pulled from our own shelf last time. Booking is not required, but tables go fast on Fridays.",
    ],
    programme: [
      { time: "18:00", item: "House records with Jonas" },
      { time: "20:00", item: "Aiko Mori takes the desk" },
      { time: "23:30", item: "The late set: deep cuts and slow jams" },
      { time: "02:00", item: "Last side" },
    ],
  },
  {
    id: "crate-night-october",
    title: "Sunday crate night: bring one record",
    kind: "Guest selector",
    date: "2026-10-25",
    doors: "17:00",
    start: "18:00",
    end: "23:00",
    price: 0,
    includes: "Free; bring a record, get a Soft Spoken",
    capacity: 38,
    taken: 19,
    host: "Freja Lindqvist",
    image: images.crate,
    summary:
      "Bring one record that matters to you. Tell the room why in a minute or less, then we play a side of it.",
    body: [
      "Once a month we hand the desk to the room. Bring one LP, any genre, in playable condition. Sign up at the bar when you arrive, tell us the story in a minute or less, and Freja plays the side you choose.",
      "We clean every record before it goes on and we handle it the way we'd want ours handled. Your record never leaves the desk without you.",
    ],
    programme: [
      { time: "17:00", item: "Doors and sign-up sheet" },
      { time: "18:00", item: "First guest record" },
      { time: "22:30", item: "Last guest record" },
    ],
  },
  {
    id: "ida-sorhus-live",
    title: "Ida Sørhus sings late-night standards",
    kind: "Live",
    date: "2026-10-29",
    doors: "19:00",
    start: "20:30",
    end: "22:30",
    price: 250,
    includes: "Seated show, two sets",
    capacity: 38,
    taken: 38,
    host: "Ida Sørhus with piano and double bass",
    image: images.singer,
    summary:
      "A rare live night: voice, piano and bass, unamplified, in two short sets. The room seats thirty-eight.",
    body: [
      "Twice a year we move the armchairs, tune the house upright and let a band play the room. Ida Sørhus has been singing in Copenhagen basements for thirty years, and Paper Moons is one of the most-played records on our slip.",
      "The trio plays without amplification, so the room is seated and quiet. Two sets of about forty minutes, standards and a few of Ida's own songs, with the bar serving between sets only.",
    ],
    programme: [
      { time: "19:00", item: "Doors and drinks" },
      { time: "20:30", item: "First set" },
      { time: "21:10", item: "Interval, the bar is open" },
      { time: "21:40", item: "Second set" },
      { time: "22:30", item: "House records until close" },
    ],
  },
  {
    id: "agave-and-ambient",
    title: "Agave and ambient: a mezcal tasting",
    kind: "Tasting",
    date: "2026-11-01",
    doors: "16:30",
    start: "17:00",
    end: "19:00",
    price: 395,
    includes: "Five mezcals, snacks, a Liner Notes to finish",
    capacity: 16,
    taken: 9,
    host: "Malou Hedegaard, head bartender",
    image: images.bartender,
    summary:
      "Five mezcals from five agaves, each paired with a side of slow ambient. Sixteen seats at the bar counter.",
    body: [
      "Malou pours five mezcals side by side, from a bright espadín to a wild tepeztate, and talks through how each was roasted, crushed and distilled. Each glass is paired with one side of a record chosen to match its weight.",
      "It is a tasting for the curious, not the expert. You'll leave knowing why mezcal tastes of smoke, and with a Liner Notes to finish.",
    ],
    programme: [
      { time: "16:30", item: "Arrive, water and smoked almonds" },
      { time: "17:00", item: "Espadín and Tobalá" },
      { time: "17:45", item: "Cuishe and Tepeztate" },
      { time: "18:30", item: "A pechuga, then a Liner Notes" },
    ],
  },
  {
    id: "paper-moons-at-47",
    title: "Paper Moons, played in full",
    kind: "Album night",
    date: "2026-11-04",
    doors: "19:00",
    start: "19:30",
    end: "21:00",
    price: 120,
    includes: "Includes a Dust Jacket on arrival",
    capacity: 38,
    taken: 12,
    host: "Jonas Brandt",
    image: images.espresso,
    summary:
      "Ida Sørhus's 1979 record in full, the week after she plays the room. Jonas has the original Moonsheet pressing.",
    body: [
      "Paper Moons is the record we close on more than any other: warm, unhurried, a little bit sad. Jonas tells the story of the session and the strange cover photograph, then it plays from start to finish.",
      "If you saw Ida live the week before, this is the record most of her set came from. If you didn't, this is the next best thing.",
    ],
    programme: [
      { time: "19:00", item: "Doors, a Dust Jacket in your hand" },
      { time: "19:30", item: "Introduction by Jonas" },
      { time: "19:40", item: "Side A" },
      { time: "20:10", item: "Side B" },
      { time: "20:35", item: "The bar opens as usual" },
    ],
  },
  {
    id: "valves-explained",
    title: "The listening session: how valves sound",
    kind: "Tasting",
    date: "2026-11-08",
    doors: "14:30",
    start: "15:00",
    end: "16:30",
    price: 150,
    includes: "Coffee or a Run-out Groove, and a look behind the desk",
    capacity: 20,
    taken: 6,
    host: "Tobias Kjær, who looks after the system",
    image: images.amplifier,
    summary:
      "A Sunday afternoon behind the desk: the same record through solid-state and valve amplifiers, and why we chose the latter.",
    body: [
      "Tobias built half of our system and maintains all of it. On a quiet Sunday afternoon he opens the cabinets, explains how a horn loudspeaker works, and plays the same side through two different amplifiers so you can hear the difference for yourself.",
      "No audio knowledge needed. Bring a question, or a record you know well, and hear it on the system.",
    ],
    programme: [
      { time: "15:00", item: "The system, piece by piece" },
      { time: "15:40", item: "Blind comparison: two amplifiers, one record" },
      { time: "16:10", item: "Your records, your questions" },
    ],
  },
  {
    id: "new-years-long-play",
    title: "New Year's Eve: the long play",
    kind: "Live",
    date: "2026-12-31",
    doors: "20:00",
    start: "20:30",
    end: "03:00",
    price: 950,
    includes: "Three drinks, snacks all night, a glass at midnight",
    capacity: 60,
    taken: 27,
    host: "The whole Nocturne team",
    image: images.room,
    summary:
      "The longest night of our year: a live trio until eleven, then the house selectors play us across midnight.",
    body: [
      "We open the whole bar, the back room included, for one long evening. The Birgit Lund Trio plays bossa and ballads until eleven, then Freja and Jonas take over the desk and play the year out side by side.",
      "Your ticket covers three drinks from the full menu, snacks from the kitchen all night and a glass of grower champagne at midnight. After that the bar is open as usual until three.",
    ],
    programme: [
      { time: "20:00", item: "Doors and a welcome drink" },
      { time: "20:30", item: "Birgit Lund Trio, two sets" },
      { time: "23:00", item: "Freja and Jonas on the desk" },
      { time: "00:00", item: "Midnight, a glass on us" },
      { time: "03:00", item: "Last side" },
    ],
  },
];

/* ------------------------------------------------------------------ reservations */

export type Zone = {
  id: string;
  label: string;
  text: string;
  seats: string;
  max: number;
};

export const zones: Zone[] = [
  {
    id: "counter",
    label: "Bar counter",
    text: "Watch the drinks being made and chat with the bartenders.",
    seats: "10 stools",
    max: 3,
  },
  {
    id: "listening",
    label: "Listening row",
    text: "Armchairs facing the horns. The best sound in the room, conversation kept low.",
    seats: "12 armchairs",
    max: 4,
  },
  {
    id: "booth",
    label: "Booth",
    text: "Leather booths along the back wall, for groups who want to talk a little more.",
    seats: "3 booths",
    max: 6,
  },
];

export const reservations = {
  intro:
    "Tables are held for two hours. We keep half the room for walk-ins every night, so if the evening you want looks full, come down anyway.",
  policies: [
    {
      term: "Table times",
      text: "Two hours from your booking, three on Sundays. If nobody needs the seat after you, stay.",
    },
    {
      term: "Running late",
      text: "We hold the table for fifteen minutes. Call us and we'll hold it a little longer.",
    },
    {
      term: "Larger groups",
      text: "We book up to six online. For seven or more, the back room is the better fit.",
    },
    {
      term: "Cancelling",
      text: "Free up to 4 pm on the day. After that, please call so we can offer the seat to someone on the steps.",
    },
  ],
};

/* ------------------------------------------------------------------ private hire */

export const hirePage = {
  intro:
    "Take the back room for a birthday, or the whole bar for a launch, a wedding after-party or a company night that people will actually remember. We'll bring the drinks, the records and the quiet.",
  packagesTitle: "Drinks packages",
  packagesText:
    "Priced per guest and counted towards your minimum spend. Every package can be made fully alcohol-free.",
  formTitle: "Tell us about your night",
  formText:
    "We reply within two working days with availability and a proposal. Nothing is booked until you confirm.",
};

export const spaces: {
  id: string;
  name: string;
  text: string;
  capacity: string;
  maxGuests: number;
  minSpend: number;
  image: Img;
}[] = [
  {
    id: "back-room",
    name: "The back room",
    text: "Four leather booths, a banquette and armchairs behind a velvet curtain, with its own speakers fed from the main desk. Ideal for birthdays, team drinks and record clubs.",
    capacity: "14 seated, 20 standing",
    maxGuests: 20,
    minSpend: 6500,
    image: images.lounge,
  },
  {
    id: "whole-bar",
    name: "The whole bar",
    text: "Everything: the counter, the listening row, the booths and the system. Bring your own selector, ask one of ours, or hand us a playlist of records and we'll pull them from the shelf.",
    capacity: "38 seated, 60 standing",
    maxGuests: 60,
    minSpend: 18000,
    image: images.room,
  },
];

export type HirePackage = {
  id: string;
  name: string;
  perHead: number;
  text: string;
  includes: string[];
};

export const hirePackages: HirePackage[] = [
  {
    id: "two-sides",
    name: "Two sides",
    perHead: 295,
    text: "Two drinks each from the full menu and a round of snacks for the table.",
    includes: [
      "Two cocktails or highballs each",
      "Olives, almonds and rye sourdough",
      "House records all night",
    ],
  },
  {
    id: "long-player",
    name: "Long player",
    perHead: 495,
    text: "Our most booked: three drinks, a proper spread and a selector for the night.",
    includes: [
      "A welcome drink plus three from the menu",
      "The full snack menu, for sharing",
      "A house selector on the desk",
    ],
  },
  {
    id: "box-set",
    name: "Box set",
    perHead: 795,
    text: "A signature drink created for your night, plus a printed slip of everything we played.",
    includes: [
      "A cocktail named and built for you",
      "Unlimited drinks for four hours",
      "Snacks and a cheese course",
      "A selector and your printed slip",
    ],
  },
];

export const hireFaq: { q: string; a: string }[] = [
  {
    q: "Can we bring our own selector?",
    a: "Yes. Our turntables play vinyl only, at 33 and 45. Tobias will meet your selector an hour before doors to show them the desk.",
  },
  {
    q: "Can we choose the records?",
    a: "Send us a list two weeks ahead and we'll pull what we have from the shelf. We own about 2,400 LPs and will tell you what's missing.",
  },
  {
    q: "Is food available?",
    a: "We serve our snack menu and can arrange a cheese course. For a full dinner we work with a restaurant two doors up that delivers to the back room.",
  },
  {
    q: "How far ahead should we book?",
    a: "Four to six weeks for Fridays and Saturdays, especially in December. Midweek can often be arranged within a few days.",
  },
  {
    q: "Is the bar accessible?",
    a: "The bar is down twelve steps with a handrail and there is no lift. We're sorry; tell us your needs and we'll do everything we can, including a nearby alternative.",
  },
];

/* ------------------------------------------------------------------ about */

export const about = {
  title: "A print shop, then a listening room",
  systemTitle: "The system",
  systemText:
    "Everything you hear passes through these five things, in this order.",
  teamTitle: "Behind the bar",
  teamText:
    "Five of us most nights, four of whom you'll meet. Ask any of them what's playing.",
  rulesTitle: "How the room works",
  rulesText:
    "Four house habits. Nobody will tell you off; they just make the night better for everyone.",
  faqTitle: "Good to know",
  lead: "Nocturne opened in the winter of 2019 in a Vesterbro basement that had been a print shop for forty years. We kept the ink-stained floor, the brass rail on the stairs and the habit of writing everything down.",
  story: [
    "Freja Lindqvist spent ten years behind hotel bars; Jonas Brandt spent the same ten years buying records he had nowhere to play. They met at a listening session in Tokyo, a twelve-seat room where the owner played one album a night and poured whisky with a jigger made of brass. They came home wanting that room, with better cocktails.",
    "The basement on Istedgade had low ceilings, thick walls and no windows, which is to say it was perfect. Tobias Kjær spent the first summer building the horn cabinets in the back room while the bar went in around him. We opened on the shortest day of the year with four drinks on the menu and one record on the platter.",
    "We are still small: thirty-eight seats, a counter of ten, five people behind the bar, and one rule we never break. Every side we play goes on the slip.",
  ],
  team: [
    {
      name: "Freja Lindqvist",
      role: "Co-founder, bar",
      text: "Built the first menu and still writes most of it. Plays Saturdays.",
      listening: "Low Light, Long Night",
    },
    {
      name: "Jonas Brandt",
      role: "Co-founder, records",
      text: "Keeps the shelf, buys every record himself, plays Thursdays and Fridays.",
      listening: "Between Stations",
    },
    {
      name: "Malou Hedegaard",
      role: "Head bartender",
      text: "Came from a mezcal bar in Oaxaca City. Runs the tastings and the prep kitchen.",
      listening: "Slow Orbit",
    },
    {
      name: "Tobias Kjær",
      role: "Sound and system",
      text: "Built the horns, rebuilds the amplifiers, plays the odd Saturday when he can be persuaded.",
      listening: "Night Ferry to Malmö",
    },
  ],
  rules: [
    {
      term: "Full sides",
      text: "Records play from the first groove to the last. We'd rather wait than skip.",
    },
    {
      term: "Volume",
      text: "Talk at the level of the music. If you can't hear the record, it's a sign to lean in.",
    },
    {
      term: "Phones",
      text: "Face down on the bar, please. Calls on the stairs. Photos without flash are fine.",
    },
    {
      term: "Questions",
      text: "Always welcome. Ask what's playing and we'll write it on your receipt.",
    },
  ],
  faq: [
    {
      q: "Do I need to book?",
      a: "No. Half the room, including the whole bar counter, is kept for walk-ins every night. Booking guarantees a seat in the listening row or a booth.",
    },
    {
      q: "Can I request a song?",
      a: "We don't take requests, but tell the selector what you like and you might hear it later. The slip is the only playlist.",
    },
    {
      q: "Is there a dress code?",
      a: "None. Come as you are. Leave the large umbrellas at the top of the stairs.",
    },
    {
      q: "Do you serve food?",
      a: "A short snack menu all night: olives, smoked trout, cheese, bread and chocolate. It's designed for drinking, not dinner.",
    },
    {
      q: "Are children allowed?",
      a: "Guests must be 18 or over. We check ID at the door after 21:00.",
    },
    {
      q: "Do you sell records?",
      a: "Not the ones on the shelf. Every few months we run a swap night with a local shop; sign up for the Sunday slip to hear about it.",
    },
  ],
};
