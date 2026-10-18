import redCurry from "./assets/red-curry.jpg";
import pestoFarfalle from "./assets/pesto-farfalle.jpg";
import mushroomPappardelle from "./assets/mushroom-pappardelle.jpg";
import peanutNoodles from "./assets/peanut-noodles.jpg";
import misoRamen from "./assets/miso-ramen.jpg";
import harvestSalad from "./assets/harvest-salad.jpg";
import shakshukaImg from "./assets/shakshuka.jpg";
import squashSoup from "./assets/squash-soup.jpg";
import paellaImg from "./assets/paella.jpg";
import hummusBowl from "./assets/hummus-bowl.jpg";
import gochujangChicken from "./assets/gochujang-chicken.jpg";
import steakImg from "./assets/steak.jpg";
import board from "./assets/board.jpg";
import ingredients from "./assets/ingredients.jpg";
import basket from "./assets/basket.jpg";
import cook from "./assets/cook.jpg";
import table from "./assets/table.jpg";
import market from "./assets/market.jpg";
import eggs from "./assets/eggs.jpg";
import herbs from "./assets/herbs.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

export const brand = {
  name: "Pantry",
  sector: "Meal kit subscription",
  tagline: "Everything for dinner except the salt.",
  email: "hello@pantry.example",
  phone: "+1 555 014 2290",
  phoneHref: "tel:+15550142290",
  hours: ["Mon–Fri 8 am – 8 pm", "Sat 9 am – 2 pm", "Eastern time"],
  address: ["Pantry Kitchen", "41 Foundry Street", "Providence, RI 02903"],
  region:
    "We deliver to every ZIP code in New England, New York and New Jersey.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { to: "/menu", label: "This week’s menu" },
  { to: "/plans", label: "Plans" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/gift-cards", label: "Gift cards" },
  { to: "/about", label: "Our kitchen" },
];

/* ---------- Pricing ---------- */

export type People = 2 | 4;

/** Price per serving by household size, for 2–6 recipes a week (index 0 = 2 recipes). */
export const pricing: Record<People, number[]> = {
  2: [12.49, 11.29, 10.49, 9.99, 9.49],
  4: [10.99, 9.99, 9.29, 8.99, 8.79],
};
export const minMeals = 2;
export const maxMeals = 6;
export const deliveryFee = 7.99;
export const freeDeliveryFrom = 4;
export const deliveryDays = ["Mon", "Tue", "Wed", "Thu"] as const;
export type DeliveryDay = (typeof deliveryDays)[number];

/* ---------- Recipes ---------- */

export type Tag = "veggie" | "vegan" | "family" | "spicy";

export const tagLabels: Record<Tag, string> = {
  veggie: "Vegetarian",
  vegan: "Vegan",
  family: "Family favourite",
  spicy: "Spicy",
};

/** Amounts are for two servings; four servings double them. */
export type Ingredient = [name: string, amount: number, unit: string];

export type Recipe = {
  slug: string;
  no: number;
  name: string;
  with: string;
  image: Img;
  chef: string;
  minutes: number;
  difficulty: "Easy" | "Medium";
  tags: Tag[];
  loved: number;
  premium?: number;
  blurb: string;
  note: string;
  swaps: { id: string; label: string; extra: number }[];
  bag: Ingredient[];
  pantry: string[];
  steps: { title: string; body: string }[];
  nutrition: {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
    salt: number;
  };
  allergens: string[];
};

const img = (src: string, alt: string, w: number, h: number): Img => ({
  src,
  alt,
  w,
  h,
});

export const recipes: Recipe[] = [
  {
    slug: "red-curry-squash",
    no: 1,
    name: "Red curry with squash & Thai basil",
    with: "coconut, lime leaf and jasmine rice",
    image: img(
      redCurry,
      "Red curry in a white bowl with basil leaves and dried chillies scattered on a dark board",
      1400,
      933,
    ),
    chef: "Priya Raman",
    minutes: 35,
    difficulty: "Easy",
    tags: ["veggie", "spicy"],
    loved: 96,
    blurb:
      "A proper Thai red curry built on our own paste, simmered with butternut squash until it melts into the coconut. Crispy tofu goes in at the end so it stays crisp.",
    note: "Taste before the fish-free sauce goes in. Squash varies in sweetness week to week, and the curry should land salty, sour and hot in that order.",
    swaps: [
      { id: "tofu", label: "Crispy tofu", extra: 0 },
      { id: "chicken", label: "Chicken thigh", extra: 0 },
      { id: "prawns", label: "King prawns", extra: 2.5 },
    ],
    bag: [
      ["Butternut squash, peeled and cubed", 300, "g"],
      ["Firm tofu", 200, "g"],
      ["Red curry paste", 2, "tbsp"],
      ["Coconut milk", 1, "can"],
      ["Jasmine rice", 150, "g"],
      ["Makrut lime leaves", 3, ""],
      ["Thai basil", 1, "bunch"],
      ["Lime", 1, ""],
    ],
    pantry: ["Neutral oil", "Salt", "Sugar"],
    steps: [
      {
        title: "Start the rice",
        body: "Rinse the rice twice, then simmer with 300 ml water and a pinch of salt, lid on, for 12 minutes. Leave it covered off the heat.",
      },
      {
        title: "Crisp the tofu",
        body: "Pat the tofu dry and cut into 2 cm cubes. Fry in a tablespoon of oil over medium-high heat until golden on most sides, 8 minutes. Set aside.",
      },
      {
        title: "Build the curry",
        body: "Fry the paste in the same pan for a minute until it smells toasty. Add the coconut milk, squash, torn lime leaves and 100 ml water. Simmer for 15 minutes until the squash is soft.",
      },
      {
        title: "Finish and serve",
        body: "Stir in the tofu, a squeeze of lime and a pinch of sugar. Taste for salt. Spoon over the rice and tear the basil on top.",
      },
    ],
    nutrition: {
      kcal: 690,
      protein: 22,
      carbs: 74,
      fat: 34,
      fibre: 7,
      salt: 2.1,
    },
    allergens: ["Soy"],
  },
  {
    slug: "pistachio-pesto-farfalle",
    no: 2,
    name: "Pistachio pesto farfalle",
    with: "blistered tomatoes and lemony rocket",
    image: img(
      pestoFarfalle,
      "Farfalle tossed in green pesto with halved cherry tomatoes and rocket on a white plate",
      1400,
      934,
    ),
    chef: "Tomás Lindqvist",
    minutes: 20,
    difficulty: "Easy",
    tags: ["veggie", "family"],
    loved: 94,
    blurb:
      "Our pesto swaps pine nuts for pistachios, which makes it sweeter and greener. The tomatoes get five hot minutes in the pan so they burst into the sauce.",
    note: "Save a mug of pasta water before you drain. It is the difference between pesto that clings and pesto that sits in a puddle.",
    swaps: [
      { id: "classic", label: "As written", extra: 0 },
      { id: "burrata", label: "Add burrata", extra: 2 },
      { id: "chicken", label: "Add chicken breast", extra: 1.5 },
    ],
    bag: [
      ["Farfalle", 200, "g"],
      ["Pistachio pesto", 90, "g"],
      ["Cherry tomatoes", 200, "g"],
      ["Rocket", 40, "g"],
      ["Lemon", 1, ""],
      ["Parmesan, grated", 30, "g"],
    ],
    pantry: ["Olive oil", "Salt", "Black pepper"],
    steps: [
      {
        title: "Boil the pasta",
        body: "Cook the farfalle in plenty of well-salted water for 10 minutes. Scoop out a mug of the water, then drain.",
      },
      {
        title: "Blister the tomatoes",
        body: "While the pasta cooks, heat a tablespoon of oil in a wide pan until shimmering. Add the tomatoes and leave them alone for 3 minutes, then shake until they split.",
      },
      {
        title: "Bring it together",
        body: "Take the pan off the heat. Add the pasta, pesto and a splash of pasta water, and toss until glossy. Add more water a spoon at a time if it looks tight.",
      },
      {
        title: "Dress the rocket",
        body: "Toss the rocket with lemon juice, a little oil and pepper. Pile it on the pasta and finish with the parmesan.",
      },
    ],
    nutrition: {
      kcal: 640,
      protein: 21,
      carbs: 78,
      fat: 27,
      fibre: 6,
      salt: 1.4,
    },
    allergens: ["Gluten", "Milk", "Tree nuts"],
  },
  {
    slug: "mushroom-pappardelle",
    no: 3,
    name: "Mushroom pappardelle with sage brown butter",
    with: "chestnut mushrooms and aged parmesan",
    image: img(
      mushroomPappardelle,
      "Wide ribbons of pappardelle with sautéed mushrooms and crisp sage leaves on a white plate",
      1400,
      1023,
    ),
    chef: "Marisol Okafor",
    minutes: 30,
    difficulty: "Medium",
    tags: ["veggie"],
    loved: 97,
    blurb:
      "Fresh egg pappardelle from a pasta maker in Federal Hill, with mushrooms fried hard until the edges catch. The sage crisps in butter that is cooked just past golden.",
    note: "Do not crowd the mushrooms. Two batches take four extra minutes and give you browned edges instead of grey, steamed slices.",
    swaps: [
      { id: "classic", label: "As written", extra: 0 },
      { id: "sausage", label: "Add Italian sausage", extra: 1.5 },
    ],
    bag: [
      ["Fresh egg pappardelle", 250, "g"],
      ["Chestnut mushrooms", 250, "g"],
      ["Shallot", 1, ""],
      ["Garlic", 2, "cloves"],
      ["Sage", 1, "bunch"],
      ["Parmesan, grated", 40, "g"],
    ],
    pantry: ["Butter", "Olive oil", "Salt", "Black pepper"],
    steps: [
      {
        title: "Fry the mushrooms",
        body: "Slice the mushrooms thickly. Fry in oil over high heat in two batches, 4 minutes each, without stirring too often. Season and tip onto a plate.",
      },
      {
        title: "Soften the aromatics",
        body: "Lower the heat. Add the shallot and garlic, finely sliced, with a knob of butter and cook for 3 minutes until soft.",
      },
      {
        title: "Brown the butter",
        body: "Add 40 g butter and the sage leaves. Let it foam and turn nut-brown, 2–3 minutes, then take it straight off the heat.",
      },
      {
        title: "Toss and serve",
        body: "Boil the pappardelle for 3 minutes. Lift it into the pan with a splash of its water, add the mushrooms and half the parmesan, and toss. Finish with the rest.",
      },
    ],
    nutrition: {
      kcal: 720,
      protein: 26,
      carbs: 72,
      fat: 36,
      fibre: 5,
      salt: 1.6,
    },
    allergens: ["Gluten", "Egg", "Milk"],
  },
  {
    slug: "tamarind-peanut-noodles",
    no: 4,
    name: "Tamarind peanut noodles",
    with: "bean sprouts, chives and lime",
    image: img(
      peanutNoodles,
      "Rice noodles with bean sprouts and chives on a wooden board beside limes, chillies and red onion",
      1100,
      733,
    ),
    chef: "Dev Castellano",
    minutes: 20,
    difficulty: "Easy",
    tags: ["vegan", "veggie", "spicy"],
    loved: 92,
    blurb:
      "Sour, sweet and nutty, in the time it takes rice noodles to soak. The sauce is tamarind, peanut butter and a spoon of chilli crisp, so it is fast but not flat.",
    note: "The noodles keep cooking in the hot pan. Pull them from the soak while they still have a little bite.",
    swaps: [
      { id: "tofu", label: "Smoked tofu", extra: 0 },
      { id: "shrimp", label: "Shrimp", extra: 2 },
    ],
    bag: [
      ["Flat rice noodles", 180, "g"],
      ["Smoked tofu", 180, "g"],
      ["Tamarind–peanut sauce", 100, "g"],
      ["Bean sprouts", 100, "g"],
      ["Garlic chives", 1, "bunch"],
      ["Roasted peanuts", 30, "g"],
      ["Chilli crisp", 1, "tbsp"],
      ["Lime", 1, ""],
    ],
    pantry: ["Neutral oil", "Salt"],
    steps: [
      {
        title: "Soak the noodles",
        body: "Cover the noodles with just-boiled water and leave for 6 minutes. Drain and rinse under cold water.",
      },
      {
        title: "Sear the tofu",
        body: "Cut the tofu into batons and fry in a tablespoon of oil over high heat until browned, about 4 minutes.",
      },
      {
        title: "Toss in the sauce",
        body: "Add the noodles, sauce and 3 tablespoons water. Toss over the heat for 2 minutes, then add the sprouts and chives cut into 3 cm lengths.",
      },
      {
        title: "Finish",
        body: "Pile into bowls with chopped peanuts, chilli crisp and lime wedges on the side.",
      },
    ],
    nutrition: {
      kcal: 610,
      protein: 24,
      carbs: 76,
      fat: 22,
      fibre: 6,
      salt: 2.3,
    },
    allergens: ["Peanuts", "Soy"],
  },
  {
    slug: "white-miso-ramen",
    no: 5,
    name: "White miso ramen",
    with: "soft egg, bok choy and chilli oil",
    image: img(
      misoRamen,
      "Bowl of ramen with a halved soft egg, bok choy and chilli oil, red chopsticks resting on the rim",
      1200,
      1200,
    ),
    chef: "Priya Raman",
    minutes: 35,
    difficulty: "Medium",
    tags: ["spicy"],
    loved: 95,
    blurb:
      "A weeknight broth that tastes like it took all day: chicken stock whisked with white miso, sesame and a little garlic, poured over springy noodles and slices of seared pork belly.",
    note: "Six and a half minutes for the eggs, then straight into cold water. Peel them under the tap and the shells slide off.",
    swaps: [
      { id: "pork", label: "Pork belly", extra: 0 },
      { id: "shiitake", label: "Roast shiitake (vegetarian broth)", extra: 0 },
    ],
    bag: [
      ["Fresh ramen noodles", 2, "nests"],
      ["Pork belly slices", 200, "g"],
      ["White miso", 3, "tbsp"],
      ["Chicken stock concentrate", 1, "pot"],
      ["Baby bok choy", 2, ""],
      ["Free-range eggs", 2, ""],
      ["Spring onions", 2, ""],
      ["Chilli oil", 1, "tbsp"],
    ],
    pantry: ["Neutral oil", "Sesame oil"],
    steps: [
      {
        title: "Cook the eggs",
        body: "Lower the eggs into boiling water for 6½ minutes, then into a bowl of cold water. Peel and halve.",
      },
      {
        title: "Sear the pork",
        body: "Fry the pork belly in a dry pan over medium-high heat for 3 minutes a side until the fat is crisp. Slice.",
      },
      {
        title: "Make the broth",
        body: "Bring 800 ml water and the stock to a simmer. Whisk the miso with a ladle of broth in a mug, then stir it back in. Do not let it boil again.",
      },
      {
        title: "Build the bowls",
        body: "Blanch the noodles and halved bok choy for 2 minutes. Divide into bowls, pour over the broth, and top with pork, egg, spring onion and chilli oil.",
      },
    ],
    nutrition: {
      kcal: 680,
      protein: 34,
      carbs: 58,
      fat: 33,
      fibre: 4,
      salt: 3.4,
    },
    allergens: ["Gluten", "Egg", "Soy", "Sesame"],
  },
  {
    slug: "warm-harvest-salad",
    no: 6,
    name: "Warm harvest salad with jammy eggs",
    with: "roast carrots, farro and tahini",
    image: img(
      harvestSalad,
      "Salad of greens, sliced carrots, halved eggs and tomatoes in a white bowl on a wooden table",
      1400,
      933,
    ),
    chef: "Tomás Lindqvist",
    minutes: 25,
    difficulty: "Easy",
    tags: ["veggie"],
    loved: 90,
    blurb:
      "A salad that is actually dinner. Farro for chew, carrots roasted with cumin until they are sweet at the edges, and a tahini dressing loose enough to pour.",
    note: "Dress the farro while it is warm. It drinks up the dressing in a way cold grains never will.",
    swaps: [
      { id: "eggs", label: "Jammy eggs", extra: 0 },
      { id: "halloumi", label: "Grilled halloumi", extra: 1.5 },
    ],
    bag: [
      ["Pearled farro", 120, "g"],
      ["Carrots", 3, ""],
      ["Free-range eggs", 4, ""],
      ["Mixed leaves", 80, "g"],
      ["Cherry tomatoes", 120, "g"],
      ["Tahini dressing", 60, "ml"],
      ["Ground cumin", 1, "tsp"],
    ],
    pantry: ["Olive oil", "Salt", "Black pepper"],
    steps: [
      {
        title: "Roast the carrots",
        body: "Heat the oven to 425°F. Halve the carrots lengthways, toss with oil, cumin and salt, and roast for 20 minutes.",
      },
      {
        title: "Simmer the farro",
        body: "Boil the farro in salted water for 18 minutes until tender with a little chew. Drain and dress with half the tahini while warm.",
      },
      {
        title: "Cook the eggs",
        body: "Boil the eggs for 7 minutes, cool in cold water, peel and halve.",
      },
      {
        title: "Assemble",
        body: "Layer leaves, farro, carrots and halved tomatoes. Top with eggs and spoon over the remaining dressing.",
      },
    ],
    nutrition: {
      kcal: 540,
      protein: 22,
      carbs: 54,
      fat: 26,
      fibre: 10,
      salt: 1.2,
    },
    allergens: ["Gluten", "Egg", "Sesame"],
  },
  {
    slug: "harissa-shakshuka",
    no: 7,
    name: "Harissa shakshuka",
    with: "feta, coriander and toasted sourdough",
    image: img(
      shakshukaImg,
      "Shakshuka in a black cast-iron pan with four eggs, beside sourdough and a fork on a dark table",
      1400,
      929,
    ),
    chef: "Marisol Okafor",
    minutes: 25,
    difficulty: "Easy",
    tags: ["veggie", "spicy"],
    loved: 93,
    blurb:
      "Eggs poached in a pepper and tomato sauce warmed with rose harissa. It is breakfast in Tunis and dinner at ours, with sourdough from Seven Stars Bakery for dragging through the pan.",
    note: "Make wells with the back of a spoon and crack the eggs into them, then cover the pan. The lid sets the whites before the yolks firm up.",
    swaps: [
      { id: "classic", label: "As written", extra: 0 },
      { id: "merguez", label: "Add merguez sausage", extra: 1.75 },
    ],
    bag: [
      ["Red pepper", 1, ""],
      ["Red onion", 1, ""],
      ["Chopped tomatoes", 1, "can"],
      ["Rose harissa", 1, "tbsp"],
      ["Free-range eggs", 4, ""],
      ["Feta", 60, "g"],
      ["Coriander", 1, "bunch"],
      ["Sourdough", 4, "slices"],
    ],
    pantry: ["Olive oil", "Salt"],
    steps: [
      {
        title: "Soften the vegetables",
        body: "Slice the pepper and onion thinly and cook in 2 tablespoons oil over medium heat for 8 minutes until soft and sweet.",
      },
      {
        title: "Make the sauce",
        body: "Stir in the harissa for 30 seconds, then the tomatoes and a pinch of salt. Simmer for 6 minutes until thickened.",
      },
      {
        title: "Poach the eggs",
        body: "Make four wells, crack in the eggs, cover and cook on low for 5–6 minutes until the whites are set.",
      },
      {
        title: "Serve",
        body: "Crumble over the feta and coriander. Toast the sourdough and bring the pan to the table.",
      },
    ],
    nutrition: {
      kcal: 580,
      protein: 27,
      carbs: 52,
      fat: 28,
      fibre: 7,
      salt: 2.4,
    },
    allergens: ["Gluten", "Egg", "Milk"],
  },
  {
    slug: "roast-squash-soup",
    no: 8,
    name: "Roast squash soup with brown-butter seeds",
    with: "sage, crème fraîche and grilled cheese soldiers",
    image: img(
      squashSoup,
      "Bowl of bright orange squash soup topped with seeds and cream, a spoon and bay leaf beside it",
      933,
      1400,
    ),
    chef: "Dev Castellano",
    minutes: 40,
    difficulty: "Easy",
    tags: ["veggie", "family"],
    loved: 91,
    blurb:
      "Kabocha squash from Hollow Oak Farm, roasted whole so the flesh goes fudgy, then blended smooth. The grilled cheese soldiers are the reason children ask for it.",
    note: "Roast the squash skin-on and scoop it out afterwards. It saves ten minutes of peeling and the soup tastes deeper.",
    swaps: [{ id: "classic", label: "As written", extra: 0 }],
    bag: [
      ["Kabocha squash", 1, "small"],
      ["Yellow onion", 1, ""],
      ["Vegetable stock concentrate", 1, "pot"],
      ["Pumpkin seeds", 30, "g"],
      ["Sage", 1, "bunch"],
      ["Crème fraîche", 60, "g"],
      ["Sandwich loaf", 4, "slices"],
      ["Aged cheddar", 80, "g"],
    ],
    pantry: ["Butter", "Olive oil", "Salt"],
    steps: [
      {
        title: "Roast the squash",
        body: "Heat the oven to 425°F. Halve the squash, scoop the seeds, oil and salt the cut sides and roast face down for 30 minutes.",
      },
      {
        title: "Start the base",
        body: "Meanwhile soften the chopped onion in butter for 10 minutes. Add the stock and 600 ml water.",
      },
      {
        title: "Blend",
        body: "Scoop the squash into the pot, simmer 5 minutes, then blend until smooth. Loosen with water if needed and season.",
      },
      {
        title: "Seeds and soldiers",
        body: "Toast the seeds and sage in butter until it browns. Make grilled cheese, cut into fingers, and serve with the soup, crème fraîche and seeds.",
      },
    ],
    nutrition: {
      kcal: 620,
      protein: 20,
      carbs: 62,
      fat: 33,
      fibre: 9,
      salt: 2.0,
    },
    allergens: ["Gluten", "Milk"],
  },
  {
    slug: "prawn-chorizo-paella",
    no: 9,
    name: "Weeknight prawn & chorizo paella",
    with: "smoked paprika, peas and lemon",
    image: img(
      paellaImg,
      "Paella with prawns, chorizo, peppers and parsley in a dark pan",
      1200,
      813,
    ),
    chef: "Marisol Okafor",
    minutes: 40,
    difficulty: "Medium",
    tags: ["family"],
    loved: 95,
    premium: 2.5,
    blurb:
      "Bomba rice, saffron and sweet paprika, with chorizo for smoke and wild Gulf prawns pushed in for the last few minutes. Leave the pan alone at the end and you get the socarrat.",
    note: "Stop stirring once the stock goes in. Listen for a faint crackle in the last two minutes; that is the crust forming.",
    swaps: [
      { id: "prawn", label: "Prawn & chorizo", extra: 0 },
      { id: "chicken", label: "Chicken & chorizo", extra: 0 },
    ],
    bag: [
      ["Bomba rice", 160, "g"],
      ["Wild Gulf prawns", 200, "g"],
      ["Cooking chorizo", 100, "g"],
      ["Red pepper", 1, ""],
      ["Saffron", 1, "pinch"],
      ["Smoked paprika", 1, "tsp"],
      ["Chicken stock concentrate", 1, "pot"],
      ["Frozen peas", 80, "g"],
      ["Lemon", 1, ""],
    ],
    pantry: ["Olive oil", "Salt"],
    steps: [
      {
        title: "Render the chorizo",
        body: "Slice the chorizo and fry in a wide pan with a little oil for 3 minutes until it releases its red fat. Add the sliced pepper for 4 minutes.",
      },
      {
        title: "Toast the rice",
        body: "Stir in the rice and paprika until every grain is coated. Pour in 550 ml hot water with the stock and saffron.",
      },
      {
        title: "Leave it alone",
        body: "Simmer uncovered for 15 minutes without stirring. Scatter over the peas and press in the prawns.",
      },
      {
        title: "Crust and rest",
        body: "Turn the heat up for 2 minutes until it crackles, then rest under a tea towel for 5. Serve with lemon wedges.",
      },
    ],
    nutrition: {
      kcal: 760,
      protein: 38,
      carbs: 82,
      fat: 28,
      fibre: 5,
      salt: 2.8,
    },
    allergens: ["Crustaceans"],
  },
  {
    slug: "loaded-hummus-bowl",
    no: 10,
    name: "Loaded hummus bowl",
    with: "crispy chickpeas, pickled onion and warm pita",
    image: img(
      hummusBowl,
      "Hummus bowl topped with pomegranate, herbs and vegetables, seen from above on a dark table",
      933,
      1400,
    ),
    chef: "Priya Raman",
    minutes: 20,
    difficulty: "Easy",
    tags: ["vegan", "veggie"],
    loved: 89,
    blurb:
      "Silky hummus spread wide and piled with chickpeas roasted until they crunch, quick-pickled onion, pomegranate and herbs. Pita warmed straight on the burner.",
    note: "The pickled onion takes ten minutes in lime and salt. Do it first and it is ready by the time everything else is.",
    swaps: [
      { id: "classic", label: "As written", extra: 0 },
      { id: "lamb", label: "Add spiced lamb", extra: 2.25 },
    ],
    bag: [
      ["Hummus", 200, "g"],
      ["Chickpeas", 1, "can"],
      ["Red onion", 1, ""],
      ["Pomegranate seeds", 60, "g"],
      ["Persian cucumber", 2, ""],
      ["Parsley and mint", 1, "bunch"],
      ["Za’atar", 1, "tbsp"],
      ["Pita breads", 4, ""],
    ],
    pantry: ["Olive oil", "Salt", "Lime or vinegar"],
    steps: [
      {
        title: "Pickle the onion",
        body: "Slice the onion as thinly as you can and scrunch with a pinch of salt and lime juice or vinegar. Set aside.",
      },
      {
        title: "Crisp the chickpeas",
        body: "Drain and dry the chickpeas, then fry in 2 tablespoons oil with the za’atar over medium-high heat for 8 minutes until crunchy.",
      },
      {
        title: "Chop the salad",
        body: "Dice the cucumber and roughly chop the herbs.",
      },
      {
        title: "Build the bowls",
        body: "Swoosh the hummus across two plates. Top with chickpeas, cucumber, onion, pomegranate and herbs, and warm the pitas over a flame.",
      },
    ],
    nutrition: {
      kcal: 590,
      protein: 21,
      carbs: 72,
      fat: 24,
      fibre: 15,
      salt: 1.9,
    },
    allergens: ["Gluten", "Sesame"],
  },
  {
    slug: "sticky-gochujang-chicken",
    no: 11,
    name: "Sticky gochujang chicken thighs",
    with: "sesame rice and smashed cucumber",
    image: img(
      gochujangChicken,
      "Plate of charred, glazed chicken thighs being carried to the table",
      1400,
      1066,
    ),
    chef: "Dev Castellano",
    minutes: 30,
    difficulty: "Easy",
    tags: ["spicy", "family"],
    loved: 98,
    blurb:
      "The most re-ordered recipe we have ever run. Boneless thighs go under a hot grill with a gochujang, honey and garlic glaze until it blisters and catches.",
    note: "Glaze twice, once at the start and again for the last three minutes. The second coat is the sticky one.",
    swaps: [
      { id: "chicken", label: "Chicken thigh", extra: 0 },
      { id: "double", label: "Double chicken", extra: 2 },
      { id: "tofu", label: "Firm tofu", extra: 0 },
    ],
    bag: [
      ["Boneless chicken thighs", 320, "g"],
      ["Gochujang glaze", 70, "g"],
      ["Sushi rice", 150, "g"],
      ["Persian cucumbers", 2, ""],
      ["Rice vinegar", 1, "tbsp"],
      ["Toasted sesame seeds", 1, "tbsp"],
      ["Spring onions", 2, ""],
    ],
    pantry: ["Neutral oil", "Salt", "Sugar"],
    steps: [
      {
        title: "Cook the rice",
        body: "Rinse the rice, then simmer with 300 ml water for 12 minutes, lid on. Rest for 10 minutes off the heat.",
      },
      {
        title: "Glaze and grill",
        body: "Heat the broiler to high. Toss the chicken with half the glaze and a little oil and broil for 8 minutes a side.",
      },
      {
        title: "Smash the cucumbers",
        body: "Bash the cucumbers with a rolling pin, break into chunks, and dress with vinegar, a pinch of sugar and salt.",
      },
      {
        title: "Second coat",
        body: "Brush on the rest of the glaze and broil 3 more minutes until it blisters. Slice and serve on the rice with sesame and spring onion.",
      },
    ],
    nutrition: {
      kcal: 710,
      protein: 41,
      carbs: 80,
      fat: 22,
      fibre: 3,
      salt: 2.6,
    },
    allergens: ["Gluten", "Soy", "Sesame"],
  },
  {
    slug: "steak-salsa-verde",
    no: 12,
    name: "Seared steak with salsa verde",
    with: "honey-roast carrots and crushed potatoes",
    image: img(
      steakImg,
      "Sliced seared steak with roasted carrots and herbs on a white plate, a second plate behind",
      1400,
      933,
    ),
    chef: "Tomás Lindqvist",
    minutes: 35,
    difficulty: "Medium",
    tags: [],
    loved: 97,
    premium: 4,
    blurb:
      "Grass-fed bavette from Stonewall Ridge, seared hard and rested properly, with a sharp green salsa verde to cut through it. Our Friday-night recipe.",
    note: "Rest the steak for as long as you cooked it. Slice across the grain or it will be chewy no matter how well you seared it.",
    swaps: [
      { id: "bavette", label: "Bavette steak", extra: 0 },
      { id: "ribeye", label: "Upgrade to ribeye", extra: 4 },
    ],
    bag: [
      ["Grass-fed bavette", 340, "g"],
      ["Baby potatoes", 400, "g"],
      ["Carrots with tops", 1, "bunch"],
      ["Wildflower honey", 1, "tbsp"],
      ["Salsa verde", 60, "g"],
      ["Lemon", 1, ""],
    ],
    pantry: ["Olive oil", "Butter", "Salt", "Black pepper"],
    steps: [
      {
        title: "Roast the vegetables",
        body: "Heat the oven to 425°F. Boil the potatoes for 12 minutes, drain, crush on a tray and roast with oil alongside the carrots for 20 minutes. Drizzle the carrots with honey for the last 5.",
      },
      {
        title: "Season the steak",
        body: "Pat the steak dry and season generously on both sides with salt and pepper.",
      },
      {
        title: "Sear and baste",
        body: "Sear in a very hot pan for 3 minutes a side, adding butter for the last minute and spooning it over. Rest for 6 minutes.",
      },
      {
        title: "Slice and serve",
        body: "Slice against the grain and serve with the vegetables, salsa verde and a squeeze of lemon.",
      },
    ],
    nutrition: {
      kcal: 780,
      protein: 48,
      carbs: 54,
      fat: 40,
      fibre: 7,
      salt: 1.8,
    },
    allergens: ["Milk", "Mustard"],
  },
];

/** Menu filters; each one is a test over a recipe. */
export const filters: {
  id: string;
  label: string;
  test: (r: Recipe) => boolean;
}[] = [
  { id: "veggie", label: "Vegetarian", test: (r) => r.tags.includes("veggie") },
  { id: "vegan", label: "Vegan", test: (r) => r.tags.includes("vegan") },
  { id: "quick", label: "Under 30 min", test: (r) => r.minutes < 30 },
  {
    id: "family",
    label: "Family favourite",
    test: (r) => r.tags.includes("family"),
  },
  { id: "spicy", label: "Spicy", test: (r) => r.tags.includes("spicy") },
  { id: "light", label: "Under 650 kcal", test: (r) => r.nutrition.kcal < 650 },
  { id: "premium", label: "Premium", test: (r) => !!r.premium },
];

export const sorts = [
  { id: "menu", label: "Menu order" },
  { id: "quick", label: "Quickest first" },
  { id: "light", label: "Lightest first" },
  { id: "loved", label: "Most loved" },
] as const;
export type SortId = (typeof sorts)[number]["id"];

/* ---------- Pages ---------- */

export const home = {
  title: "Pick your dinners. We bring everything but the salt.",
  lead: "Twelve new recipes every week, each one measured out into its own numbered bag with a recipe card. Choose two to six, skip any week, cancel in two clicks.",
  heroCards: [
    "sticky-gochujang-chicken",
    "pistachio-pesto-farfalle",
    "red-curry-squash",
  ],
  menuTitle: "On the menu",
  week: {
    title: "How a Pantry week runs",
    lead: "The same rhythm every week, so you always know when to choose and when the doorbell goes.",
    days: [
      {
        day: "Wed",
        title: "Choices close",
        body: "Pick, swap or skip until 11:59 pm. After that we order exactly what you chose.",
      },
      {
        day: "Thu",
        title: "We buy",
        body: "Orders go to our farms and fishmongers. Nothing is bought on spec.",
      },
      {
        day: "Fri",
        title: "Portioning",
        body: "Every ingredient is weighed into a bag stamped with its recipe number.",
      },
      {
        day: "Sat",
        title: "Packing",
        body: "Bags, cards and ice packs go into the box in the order you will need them.",
      },
      {
        day: "Sun",
        title: "Next menu",
        body: "The following week’s twelve recipes go live at noon.",
      },
      {
        day: "Mon–Thu",
        title: "Your doorbell",
        body: "Delivered on the day you chose, between 8 am and 8 pm. Cold for 48 hours.",
      },
    ],
  },
  bag: {
    title: "One bag per recipe. Nothing to measure.",
    body: "Open the box and every recipe is its own numbered bag, with the card on top. The salt, oil and butter come from your cupboard; everything else comes from us, weighed to the gram.",
    recipe: "pistachio-pesto-farfalle",
    image: img(
      board,
      "Ingredients laid out on a wooden chopping board: avocado, eggs, mushrooms, tomatoes, spinach and spring onions",
      1200,
      1200,
    ),
  },
  quote: {
    text: "I used to stand in the supermarket at six o’clock with no idea what we were having. Now the bags are in the fridge with numbers on, and my nine-year-old reads the card out to me.",
    name: "Dana Whitcomb",
    detail: "Cooking for four in Worcester, MA · since 2023",
  },
  quotes: [
    {
      text: "The gochujang chicken has been in our box eleven weeks running. Nobody has complained.",
      name: "Luis & Mae",
      detail: "Plan for 2, Brooklyn",
    },
    {
      text: "Skipping a week takes one tap. I have tested this more often than I would like to admit.",
      name: "Hannah O.",
      detail: "Plan for 2, Portland, ME",
    },
  ],
  farms: {
    title: "Who grew it, and how far it came",
    body: "We buy from the same growers every season and pay them before the produce ships. The recipe card names the farm.",
    image: img(
      market,
      "Market produce in crates: limes, beans, garlic, shallots and red onions",
      1400,
      933,
    ),
  },
  gift: {
    title: "Give someone a week off from deciding",
    body: "Pantry gift cards come in any amount from $25 and arrive by email on the day you pick. They never expire.",
  },
  faqTitle: "Before you sign up",
  close: {
    title: "Next week’s menu is open",
    body: "Choose before Wednesday at 11:59 pm and your first box arrives the following week.",
    image: img(
      table,
      "Friends sharing a table set with bread, salads and bowls of food",
      1400,
      933,
    ),
  },
};

export const farms = [
  {
    name: "Hollow Oak Farm",
    place: "Little Compton, RI",
    supplies: "Squash, carrots, potatoes",
    since: 2020,
  },
  {
    name: "Stonewall Ridge",
    place: "Hardwick, MA",
    supplies: "Grass-fed beef",
    since: 2021,
  },
  {
    name: "Saltmarsh Eggs",
    place: "Westport, MA",
    supplies: "Free-range eggs",
    since: 2020,
  },
  {
    name: "Two Rivers Greens",
    place: "Hadley, MA",
    supplies: "Salad leaves, herbs, bok choy",
    since: 2022,
  },
  {
    name: "Federal Hill Pasta Co.",
    place: "Providence, RI",
    supplies: "Fresh egg pasta",
    since: 2020,
  },
  {
    name: "Seven Stars Bakery",
    place: "Providence, RI",
    supplies: "Sourdough, pita, sandwich loaves",
    since: 2021,
  },
];

export const faqs = [
  {
    q: "When do I need to choose my recipes?",
    a: "By Wednesday at 11:59 pm Eastern for delivery the following Monday to Thursday. If you do not choose, we pick from your preferences so you never get an empty box.",
  },
  {
    q: "How do I skip a week or cancel?",
    a: "From your account, tap Skip next to any upcoming week, as many weeks ahead as you like. Cancelling is one button and a confirmation, with no phone call and no fee, as long as you do it before that week’s cutoff.",
  },
  {
    q: "How long does the box stay cold?",
    a: "Our insulated liners and ice packs keep everything below 41°F for 48 hours after delivery, so it is fine on the doorstep until you get home.",
  },
  {
    q: "Can I cook for one?",
    a: "Plans start at two servings. Plenty of people cook for one and keep the second portion for lunch; every recipe card says how to store it.",
  },
  {
    q: "What about allergies?",
    a: "Every recipe lists its allergens, and you can filter the menu. Our kitchen handles all 14 major allergens, so we cannot guarantee a recipe is free from traces.",
  },
  {
    q: "Can I recycle the packaging?",
    a: "The box, the paper bags and the recipe cards go in household recycling. The liner is wool-paper and compostable, and the ice packs can be drained and the film recycled with plastic bags.",
  },
  {
    q: "Where do you deliver?",
    a: "Every ZIP code in Connecticut, Maine, Massachusetts, New Hampshire, New Jersey, New York, Rhode Island and Vermont.",
  },
  {
    q: "Do I need any special equipment?",
    a: "A large pan, a pot, a baking tray and a sharp knife cover every recipe on the menu. If a recipe needs a blender, the card says so on the front.",
  },
];

export const plans = {
  title: "Build your box",
  lead: "Choose how many people and how many dinners. We fill the box with recipes that match your tastes; swap any of them before you continue.",
  prefsHint:
    "We use these to fill your box and to choose for you in weeks you forget.",
  includes: [
    "A new menu of twelve recipes every week",
    "Every ingredient pre-measured into numbered bags",
    "Printed recipe cards with the farm named on each",
    "Insulated, recyclable packaging",
    "Skip, pause or cancel before any Wednesday cutoff",
  ],
};

export const how = {
  title: "How Pantry works",
  lead: "Four steps, the same every week. You choose, we buy only what you chose, and a cold box turns up on your doorstep with dinner in numbered bags.",
  steps: [
    {
      title: "Choose by Wednesday",
      body: "Pick two to six recipes from the week’s twelve, for two or four people. Change your mind as often as you like until 11:59 pm on Wednesday.",
      image: img(
        herbs,
        "Fresh herbs, turmeric and a wooden spoon on a chopping board",
        1400,
        933,
      ),
    },
    {
      title: "We buy and portion",
      body: "On Thursday we order exactly what has been chosen from our farms. On Friday every ingredient is weighed into a paper bag stamped with its recipe number.",
      image: img(
        basket,
        "Wooden crate of freshly harvested carrots, beetroot and radishes on weathered boards",
        1400,
        933,
      ),
    },
    {
      title: "A cold box arrives",
      body: "Your box comes on the day you picked, Monday to Thursday, between 8 am and 8 pm. Wool-paper liners and ice packs keep it cold for 48 hours.",
      image: img(
        eggs,
        "Brown eggs in a wooden bowl on a grey linen cloth",
        1400,
        933,
      ),
    },
    {
      title: "Cook in about 30 minutes",
      body: "Take a bag, follow the card. Recipes are tested by three home cooks before they reach the menu, and none of them needs more than one pan and one pot.",
      image: img(
        cook,
        "Hands slicing spring onions into thin strips on a bamboo chopping board",
        1400,
        933,
      ),
    },
  ],
  layers: [
    { label: "Recipe cards", body: "On top, in menu order." },
    { label: "Dry bags", body: "Numbered paper bags, one per recipe." },
    {
      label: "Wool-paper liner",
      body: "Compostable insulation on all six sides.",
    },
    { label: "Ice packs", body: "Drain-and-recycle, 48 hours of cold." },
    {
      label: "Protein tray",
      body: "Meat and fish at the bottom, coldest spot.",
    },
  ],
  delivery: [
    ["Choices close", "Wednesday, 11:59 pm Eastern"],
    ["Delivery days", "Monday to Thursday, the week after you choose"],
    [
      "Delivery window",
      "8 am – 8 pm, with a text when the driver is 30 minutes away",
    ],
    ["Delivery fee", "$7.99 a box; free with four or more recipes"],
    ["Where", "CT, MA, ME, NH, NJ, NY, RI, VT"],
  ] as [string, string][],
  policies: [
    {
      title: "Skip",
      body: "Skip any week up to eight weeks ahead. Skipped weeks cost nothing.",
    },
    {
      title: "Pause",
      body: "Pause for up to three months and we will email you a week before you restart.",
    },
    {
      title: "Cancel",
      body: "One button and a confirmation. No calls, no questionnaires, no fee.",
    },
  ],
};

export const gifts = {
  title: "Give dinner",
  lead: "A Pantry gift card covers recipes, delivery and anything else in the box. Pick an amount and a design, write a note, and we email it on the day you choose.",
  amounts: [50, 80, 120, 200],
  min: 25,
  max: 500,
  designs: [
    { id: "tomato", label: "Tomato" },
    { id: "herb", label: "Herb garden" },
    { id: "kraft", label: "Kraft box" },
  ],
  notes: [
    {
      title: "Arrives by email",
      body: "On the date you choose, with your message and a link to redeem.",
    },
    {
      title: "Never expires",
      body: "The balance stays on their account until it is spent, box by box.",
    },
    {
      title: "No subscription needed",
      body: "They can use it for a single box and stop there.",
    },
  ],
};

export const about = {
  title: "We test every recipe in a home kitchen first",
  lead: "Pantry started in 2019 in a church-hall kitchen in Providence, packing forty boxes a week for neighbours. We now pack about nine thousand, and we still cook every recipe on a domestic stove before it goes on the menu.",
  image: img(
    cook,
    "Hands slicing spring onions into thin strips on a bamboo chopping board",
    1400,
    933,
  ),
  story: [
    "Marisol Okafor ran a supper club out of her apartment and kept getting the same message: can you just send me the ingredients? In the autumn of 2019 she did, for forty households, out of the kitchen at Grace Memorial Church on Broad Street.",
    "The rules from that first winter still hold. Every bag is weighed. Every card names the farm. No recipe uses more than one pan and one pot, and none reaches the menu until three people who are not chefs have cooked it at home without calling us.",
    "Today the kitchen is a converted foundry on the Woonasquatucket River, and the boxes go to eight states. The menu is still written by four people around one table on a Monday.",
  ],
  rules: [
    {
      title: "One pan, one pot",
      body: "If a recipe needs more, it is a weekend recipe, and we do not do weekend recipes.",
    },
    {
      title: "Three home cooks",
      body: "Every recipe is cooked by three testers at home, on ordinary stoves, before it is published.",
    },
    {
      title: "Weighed, not estimated",
      body: "Every ingredient goes into its bag on a scale, so there is nothing left over to waste.",
    },
    {
      title: "Name the farm",
      body: "If we bought it from a grower, their name is on the card.",
    },
  ],
  team: [
    {
      name: "Marisol Okafor",
      role: "Founder & head of recipes",
      bio: "Ran the supper club that started it all. Writes the menu and has the final say on salt.",
    },
    {
      name: "Tomás Lindqvist",
      role: "Recipe developer",
      bio: "Twelve years on restaurant lines in Boston. Responsible for the pasta and anything with a pan sauce.",
    },
    {
      name: "Priya Raman",
      role: "Recipe developer",
      bio: "Grew up between Chennai and Edison, NJ. Makes every curry paste in our kitchen from scratch.",
    },
    {
      name: "Dev Castellano",
      role: "Test kitchen lead",
      bio: "Runs the panel of home testers and rewrites any step that gets misread twice.",
    },
  ],
  timeline: [
    {
      year: "2019",
      text: "Forty boxes a week from a church-hall kitchen on Broad Street.",
    },
    {
      year: "2020",
      text: "First farm contracts: Hollow Oak, Saltmarsh Eggs and Federal Hill Pasta.",
    },
    {
      year: "2022",
      text: "Moved into the old Atlantic Foundry building. Plastic-free liners.",
    },
    {
      year: "2024",
      text: "Delivery opens in New York and New Jersey. Four-person plans launch.",
    },
    {
      year: "2026",
      text: "Nine thousand boxes a week, still written around one table.",
    },
  ],
  farmImage: img(
    ingredients,
    "Potatoes, garlic, coriander and star anise on a wooden table",
    1400,
    933,
  ),
};

export const checkoutCopy = {
  note: "This is a demo: nothing is sent and no card is charged.",
};

export const footer = {
  newsletter: {
    title: "Next week’s menu, every Sunday",
    body: "Twelve recipes and one cooking tip, sent at noon. No offers you did not ask for.",
  },
  columns: [
    {
      title: "Cook",
      links: [
        { to: "/menu", label: "This week’s menu" },
        { to: "/plans", label: "Plans & prices" },
        { to: "/gift-cards", label: "Gift cards" },
      ],
    },
    {
      title: "Pantry",
      links: [
        { to: "/how-it-works", label: "How it works" },
        { to: "/about", label: "Our kitchen" },
        { to: "/box", label: "Your box" },
        { to: "/checkout", label: "Checkout" },
      ],
    },
  ],
};
