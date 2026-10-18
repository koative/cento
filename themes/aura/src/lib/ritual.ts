import {
  products,
  type Focus,
  type Product,
  type Skin,
  type Step,
  type Time,
} from "../content";

export type RitualInput = {
  time: Time;
  skin: Skin;
  focus: Focus;
  minutes: number;
};
export type RitualStep = { step: Step; product: Product; options: Product[] };

/** Which steps fit into the time on offer, in application order (thinnest to thickest). */
export const PLAN: Record<Time, Record<number, Step[]>> = {
  am: {
    2: ["cleanse", "protect"],
    5: ["cleanse", "serum", "moisturise", "protect"],
    10: ["cleanse", "tone", "serum", "moisturise", "protect"],
  },
  pm: {
    2: ["cleanse", "moisturise"],
    5: ["cleanse", "serum", "moisturise"],
    10: ["cleanse", "tone", "serum", "oil", "moisturise"],
  },
};

/** Products that suit the skin and time, best focus match first. A step with no suitable product is left out. */
export function buildRitual(
  { time, skin, focus, minutes }: RitualInput,
  swaps: Partial<Record<Step, string>>,
): RitualStep[] {
  return PLAN[time][minutes].flatMap((step) => {
    const options = products
      .filter(
        (p) =>
          p.step === step && p.time.includes(time) && p.skin.includes(skin),
      )
      .sort(
        (a, b) =>
          Number(b.focus.includes(focus)) - Number(a.focus.includes(focus)) ||
          a.rank - b.rank,
      );
    if (!options.length) return [];
    const product = options.find((p) => p.id === swaps[step]) ?? options[0];
    return [{ step, product, options }];
  });
}

/** Whole ritual time in seconds: each product's application plus its settling pause. */
export const ritualSeconds = (ritual: RitualStep[]) =>
  ritual.reduce((s, r) => s + r.product.seconds, 0);
