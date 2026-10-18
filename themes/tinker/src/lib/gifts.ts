import { products, type Interest, type Product } from "../content";

export type GiftQuery = {
  age: number;
  loves: Interest[];
  budget: number | null;
};
export type GiftMatch = { product: Product; hits: Interest[] };

/** Toys that suit the age and budget, the ones matching most interests first, then by shelf pick order. */
export function findGifts({ age, loves, budget }: GiftQuery): GiftMatch[] {
  return products
    .filter(
      (p) =>
        p.ageMin <= age &&
        age <= p.ageMax &&
        (budget === null || p.price <= budget),
    )
    .map((product) => ({
      product,
      hits: product.interests.filter((i) => loves.includes(i)),
    }))
    .sort(
      (a, b) =>
        b.hits.length - a.hits.length || a.product.pick - b.product.pick,
    );
}
