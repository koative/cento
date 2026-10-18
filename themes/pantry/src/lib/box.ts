import { useSyncExternalStore } from "react";
import {
  deliveryFee,
  freeDeliveryFrom,
  maxMeals,
  minMeals,
  pricing,
  recipes,
  type DeliveryDay,
  type People,
  type Recipe,
} from "../content";

export type RecipeLine = {
  key: string;
  kind: "recipe";
  slug: string;
  swap: string;
  qty: number;
};
export type GiftLine = {
  key: string;
  kind: "gift";
  amount: number;
  design: string;
  to: string;
  email: string;
  from: string;
  message: string;
  send: string;
  qty: number;
};
export type Line = RecipeLine | GiftLine;
export type Box = { people: People; day: DeliveryDay; lines: Line[] };

const STORAGE_KEY = "pantry-box";
const empty: Box = { people: 2, day: "Tue", lines: [] };
const listeners = new Set<() => void>();

function load(): Box {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Box) } : empty;
  } catch {
    return empty;
  }
}

let box = load();

function set(next: Box) {
  box = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the box still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useBox() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => box,
  );
}

export const recipeLines = (b: Box) =>
  b.lines.filter((l): l is RecipeLine => l.kind === "recipe");
export const giftLines = (b: Box) =>
  b.lines.filter((l): l is GiftLine => l.kind === "gift");
export const meals = (b: Box) => recipeLines(b).reduce((s, l) => s + l.qty, 0);
export const itemCount = (b: Box) => b.lines.reduce((s, l) => s + l.qty, 0);
export const findRecipe = (slug: string) =>
  recipes.find((r) => r.slug === slug);

export function setPlan(plan: Partial<Pick<Box, "people" | "day">>) {
  set({ ...box, ...plan });
}

/** Adds a recipe; returns false when the box already holds the maximum number of recipes. */
export function addRecipe(slug: string, swap: string, qty = 1) {
  if (meals(box) + qty > maxMeals) return false;
  const key = slug + "|" + swap;
  const found = box.lines.find((l) => l.key === key);
  set({
    ...box,
    lines: found
      ? box.lines.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
      : [...box.lines, { key, kind: "recipe", slug, swap, qty }],
  });
  return true;
}

/** Replaces every recipe in the box, keeping gift cards. */
export function fillBox(people: People, day: DeliveryDay, slugs: string[]) {
  const picked: RecipeLine[] = slugs.map((slug) => {
    const r = findRecipe(slug)!;
    return {
      key: slug + "|" + r.swaps[0].id,
      kind: "recipe",
      slug,
      swap: r.swaps[0].id,
      qty: 1,
    };
  });
  set({ people, day, lines: [...picked, ...giftLines(box)] });
}

export function addGift(gift: Omit<GiftLine, "key" | "kind">) {
  set({
    ...box,
    lines: [...box.lines, { ...gift, kind: "gift", key: "gift|" + Date.now() }],
  });
}

/** Sets a line's quantity (0 removes it); recipe quantities are capped by the box size. */
export function setQty(key: string, qty: number) {
  const line = box.lines.find((l) => l.key === key);
  if (!line) return;
  if (line.kind === "recipe")
    qty = Math.min(qty, maxMeals - meals(box) + line.qty);
  set({
    ...box,
    lines:
      qty < 1
        ? box.lines.filter((l) => l.key !== key)
        : box.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
  });
}

export function clearLines() {
  set({ ...box, lines: [] });
}

/* ---------- Prices ---------- */

/** Price per serving for a box with this many recipes (clamped to the plan range). */
export function perServing(people: People, count: number) {
  const n = Math.min(Math.max(count, minMeals), maxMeals);
  return pricing[people][n - minMeals];
}

export function swapOf(r: Recipe, swap: string) {
  return r.swaps.find((s) => s.id === swap) ?? r.swaps[0];
}

/** One recipe at this box size: (base + premium + swap extra) per serving × people. */
export function recipePrice(
  r: Recipe,
  swap: string,
  people: People,
  count: number,
) {
  return (
    (perServing(people, count) + (r.premium ?? 0) + swapOf(r, swap).extra) *
    people
  );
}

export function totals(b: Box) {
  const n = meals(b);
  const recipesTotal = recipeLines(b).reduce((s, l) => {
    const r = findRecipe(l.slug);
    return r ? s + recipePrice(r, l.swap, b.people, n) * l.qty : s;
  }, 0);
  const giftsTotal = giftLines(b).reduce((s, l) => s + l.amount * l.qty, 0);
  const delivery = n === 0 ? 0 : n >= freeDeliveryFrom ? 0 : deliveryFee;
  return {
    meals: n,
    recipesTotal,
    giftsTotal,
    delivery,
    total: recipesTotal + giftsTotal + delivery,
  };
}

export const money = (n: number) => "$" + n.toFixed(2);
